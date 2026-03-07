/* MarineIQ — RAG Engine: PDF chunking, embedding, IndexedDB vector store, retrieval
   Deps: config.js, ai-providers.js (detectProvider, AI_PROVIDERS) */

/* ═══════════════════════════════════════════════════════════════
   1. INDEXEDDB VECTOR STORE
   ═══════════════════════════════════════════════════════════════ */
const RAG = {
  db:       null,
  DB_NAME:  'MarineIQ_RAG',
  DB_VER:   1,
  STORE:    'chunks',
  META:     'documents',
  ready:    false,
  docs:     [],        // cached doc metadata
  embedDim: 768,       // Gemini text-embedding-004 dimension
};

function ragOpenDB() {
  return new Promise(function(resolve, reject) {
    if (RAG.db) { resolve(RAG.db); return; }
    const req = indexedDB.open(RAG.DB_NAME, RAG.DB_VER);
    req.onupgradeneeded = function(e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(RAG.STORE)) {
        const store = db.createObjectStore(RAG.STORE, { keyPath: 'id', autoIncrement: true });
        store.createIndex('docId', 'docId', { unique: false });
      }
      if (!db.objectStoreNames.contains(RAG.META)) {
        db.createObjectStore(RAG.META, { keyPath: 'id' });
      }
    };
    req.onsuccess = function(e) {
      RAG.db = e.target.result;
      RAG.ready = true;
      resolve(RAG.db);
    };
    req.onerror = function() { reject(req.error); };
  });
}

function ragTx(storeName, mode) {
  return RAG.db.transaction(storeName, mode).objectStore(storeName);
}

function ragReq(req) {
  return new Promise(function(resolve, reject) {
    req.onsuccess = function() { resolve(req.result); };
    req.onerror   = function() { reject(req.error); };
  });
}

/* ═══════════════════════════════════════════════════════════════
   2. TEXT CHUNKING — overlap for context continuity
   ═══════════════════════════════════════════════════════════════ */
function ragChunkText(text, chunkSize, overlap) {
  chunkSize = chunkSize || 500;
  overlap   = overlap   || 100;
  const words  = text.split(/\s+/);
  const chunks = [];
  let i = 0;
  while (i < words.length) {
    const end   = Math.min(i + chunkSize, words.length);
    const chunk = words.slice(i, end).join(' ');
    if (chunk.trim().length > 20) {
      chunks.push(chunk);
    }
    i += chunkSize - overlap;
  }
  return chunks;
}

/* ═══════════════════════════════════════════════════════════════
   3. EMBEDDING — provider-aware
   Use Gemini embedding API (free), or fallback to TF-IDF
   ═══════════════════════════════════════════════════════════════ */

/* 3a. Gemini embedding (free: 1500 req/day, 100 texts per batch) */
async function ragEmbedGemini(texts, apiKey) {
  const batchSize = 80;
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:batchEmbedContents?key=' + apiKey;
    const requests = batch.map(function(t) {
      return {
        model: 'models/text-embedding-004',
        content: { parts: [{ text: t.slice(0, 2048) }] },
        taskType: 'RETRIEVAL_DOCUMENT'
      };
    });

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests: requests })
    });

    if (!res.ok) {
      const err = await res.json().catch(function() { return {}; });
      throw new Error('Embedding failed: ' + (err.error?.message || res.status));
    }

    const data = await res.json();
    const embeddings = data.embeddings.map(function(e) { return e.values; });
    allEmbeddings.push.apply(allEmbeddings, embeddings);
  }

  return allEmbeddings;
}

/* 3b. Embed query (single text, RETRIEVAL_QUERY task) */
async function ragEmbedQuery(text, apiKey) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=' + apiKey;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/text-embedding-004',
      content: { parts: [{ text: text.slice(0, 2048) }] },
      taskType: 'RETRIEVAL_QUERY'
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(function() { return {}; });
    throw new Error('Query embed failed: ' + (err.error?.message || res.status));
  }

  const data = await res.json();
  return data.embedding.values;
}

/* 3c. TF-IDF fallback (no API needed, lower quality) */
function ragTFIDF(texts) {
  // Build vocabulary
  const df   = {};
  const docs = texts.map(function(t) {
    const words = t.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(function(w) { return w.length > 2; });
    const tf = {};
    words.forEach(function(w) { tf[w] = (tf[w] || 0) + 1; });
    Object.keys(tf).forEach(function(w) { df[w] = (df[w] || 0) + 1; });
    return { tf: tf, len: words.length };
  });

  const vocab = Object.keys(df).sort();
  const N     = texts.length;
  const dim   = Math.min(vocab.length, 512);
  // Take top-512 terms by document frequency
  const topTerms = vocab.map(function(w) { return { w: w, df: df[w] }; })
    .sort(function(a, b) { return b.df - a.df; })
    .slice(0, dim)
    .map(function(e) { return e.w; });

  return docs.map(function(d) {
    const vec = new Float32Array(dim);
    topTerms.forEach(function(w, i) {
      var tf  = (d.tf[w] || 0) / (d.len || 1);
      var idf = Math.log(N / (1 + (df[w] || 0)));
      vec[i]  = tf * idf;
    });
    return Array.from(vec);
  });
}

/* 3d. Auto-select embedding method */
async function ragEmbed(texts) {
  // Try Gemini first (needs a Gemini API key)
  let geminiKey = null;

  // Check if current key is Gemini
  if (APP.apiKey && APP.apiKey.startsWith('AIza')) {
    geminiKey = APP.apiKey;
  }
  // Check localStorage for a saved Gemini key
  if (!geminiKey) {
    geminiKey = localStorage.getItem('miq_gemini_embed_key') || '';
    if (geminiKey && !geminiKey.startsWith('AIza')) geminiKey = null;
  }

  if (geminiKey) {
    try {
      return { method: 'gemini', vectors: await ragEmbedGemini(texts, geminiKey) };
    } catch (e) {
      console.warn('Gemini embedding failed, falling back to TF-IDF:', e.message);
    }
  }

  // Fallback: TF-IDF (works offline, no API key needed)
  return { method: 'tfidf', vectors: ragTFIDF(texts) };
}

/* ═══════════════════════════════════════════════════════════════
   4. COSINE SIMILARITY
   ═══════════════════════════════════════════════════════════════ */
function ragCosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom > 0 ? dot / denom : 0;
}

/* ═══════════════════════════════════════════════════════════════
   5. INGEST PDF — parse, chunk, embed, store
   ═══════════════════════════════════════════════════════════════ */
async function ragIngestDocument(docId, docName, fullText, onProgress) {
  await ragOpenDB();
  if (!onProgress) onProgress = function() {};

  onProgress('Chunking text…', 10);
  const chunks = ragChunkText(fullText, 400, 80);
  if (!chunks.length) throw new Error('No usable text extracted from document');

  onProgress('Computing embeddings (' + chunks.length + ' chunks)…', 30);
  const { method, vectors } = await ragEmbed(chunks);

  onProgress('Storing in knowledge base…', 70);

  // Clear old chunks for this docId
  await ragDeleteDoc(docId);

  // Store chunks + vectors
  const store = ragTx(RAG.STORE, 'readwrite');
  for (let i = 0; i < chunks.length; i++) {
    store.add({
      docId:     docId,
      docName:   docName,
      chunkIdx:  i,
      text:      chunks[i],
      vector:    vectors[i],
      method:    method,
      createdAt: Date.now()
    });
  }

  // Store document metadata
  const meta = ragTx(RAG.META, 'readwrite');
  await ragReq(meta.put({
    id:         docId,
    name:       docName,
    chunkCount: chunks.length,
    method:     method,
    textLen:    fullText.length,
    createdAt:  Date.now()
  }));

  onProgress('Done! ' + chunks.length + ' chunks indexed via ' + method, 100);
  await ragLoadDocs();
  return { chunks: chunks.length, method: method };
}

/* ═══════════════════════════════════════════════════════════════
   6. RETRIEVE — find top-K relevant chunks for a query
   ═══════════════════════════════════════════════════════════════ */
async function ragRetrieve(query, topK) {
  topK = topK || 5;
  await ragOpenDB();

  // Get all chunks
  const store  = ragTx(RAG.STORE, 'readonly');
  const chunks = await ragReq(store.getAll());
  if (!chunks.length) return [];

  // Check if chunks use Gemini embeddings
  const method = chunks[0].method;

  let queryVec;
  if (method === 'gemini') {
    let geminiKey = null;
    if (APP.apiKey && APP.apiKey.startsWith('AIza')) geminiKey = APP.apiKey;
    if (!geminiKey) geminiKey = localStorage.getItem('miq_gemini_embed_key');
    if (!geminiKey) {
      // Fall back to keyword search
      return ragKeywordSearch(query, chunks, topK);
    }
    queryVec = await ragEmbedQuery(query, geminiKey);
  } else {
    // TF-IDF: embed the query using the same vocabulary
    // For simplicity, do keyword search instead
    return ragKeywordSearch(query, chunks, topK);
  }

  // Score by cosine similarity
  const scored = chunks.map(function(c) {
    return { chunk: c, score: ragCosine(queryVec, c.vector) };
  });

  scored.sort(function(a, b) { return b.score - a.score; });
  return scored.slice(0, topK).filter(function(s) { return s.score > 0.3; });
}

/* Keyword fallback search */
function ragKeywordSearch(query, chunks, topK) {
  const qWords = query.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(function(w) { return w.length > 2; });
  if (!qWords.length) return [];

  const scored = chunks.map(function(c) {
    const hay = c.text.toLowerCase();
    let score = 0;
    qWords.forEach(function(w) {
      const count = (hay.split(w).length - 1);
      score += count;
    });
    return { chunk: c, score: score };
  });

  scored.sort(function(a, b) { return b.score - a.score; });
  return scored.slice(0, topK).filter(function(s) { return s.score > 0; });
}

/* ═══════════════════════════════════════════════════════════════
   7. BUILD RAG CONTEXT — for injection into system prompt
   ═══════════════════════════════════════════════════════════════ */
async function buildRAGContext(query) {
  if (!RAG.ready && !RAG.db) {
    try { await ragOpenDB(); } catch(e) { return ''; }
  }

  try {
    const results = await ragRetrieve(query, 5);
    if (!results.length) return '';

    let ctx = '\n\n════════════════════════════════════════\n';
    ctx += 'UPLOADED DOCUMENT REFERENCES (RAG retrieval)\n';
    ctx += '════════════════════════════════════════\n';
    ctx += 'INSTRUCTION: The following passages were retrieved from the user\'s uploaded PDF documents.\n';
    ctx += 'Use these passages as PRIMARY source material for your answer.\n';
    ctx += '1. Quote or reference specific passages when relevant.\n';
    ctx += '2. Cite the document name and passage number.\n';
    ctx += '3. If passages contain formulas, reproduce them accurately.\n';
    ctx += '4. If passages conflict with your knowledge, prefer the passage and note the discrepancy.\n';
    ctx += '5. After using passage content, supplement with your own knowledge if needed.\n\n';

    results.forEach(function(r, i) {
      ctx += '[Passage ' + (i + 1) + ' from "' + r.chunk.docName + '"]\n';
      ctx += r.chunk.text + '\n\n';
    });

    ctx += '--- End Document Passages ---\n';
    return ctx;
  } catch (e) {
    console.warn('RAG retrieval error:', e);
    return '';
  }
}

/* ═══════════════════════════════════════════════════════════════
   8. DOCUMENT MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */
async function ragLoadDocs() {
  await ragOpenDB();
  const store = ragTx(RAG.META, 'readonly');
  RAG.docs = await ragReq(store.getAll());
  return RAG.docs;
}

async function ragDeleteDoc(docId) {
  await ragOpenDB();
  // Delete chunks
  const store = ragTx(RAG.STORE, 'readwrite');
  const idx   = store.index('docId');
  const keys  = await ragReq(idx.getAllKeys(docId));
  for (const key of keys) {
    store.delete(key);
  }
  // Delete metadata
  const meta = ragTx(RAG.META, 'readwrite');
  await ragReq(meta.delete(docId));
  await ragLoadDocs();
}

async function ragDeleteAll() {
  await ragOpenDB();
  const store = ragTx(RAG.STORE, 'readwrite');
  await ragReq(store.clear());
  const meta = ragTx(RAG.META, 'readwrite');
  await ragReq(meta.clear());
  RAG.docs = [];
}

async function ragGetStats() {
  await ragOpenDB();
  const docs   = await ragLoadDocs();
  const store  = ragTx(RAG.STORE, 'readonly');
  const count  = await ragReq(store.count());
  return {
    documents:  docs.length,
    chunks:     count,
    docs:       docs
  };
}

/* Initialize DB on load */
ragOpenDB().catch(function(e) { console.warn('RAG DB init:', e); });
