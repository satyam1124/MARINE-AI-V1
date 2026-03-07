/* MarineIQ — PDF Upload UI: drag-drop, file management panel, status indicators
   Deps: config.js, utils.js, rag-engine.js, pdf-parser.js */

/* ═══════════════════════════════════════════════════════════════
   1. PDF UPLOAD PANEL — toggle, drag-drop, file list
   ═══════════════════════════════════════════════════════════════ */

function togglePdfPanel() {
  const panel = document.getElementById('pdfPanel');
  if (!panel) return;
  const visible = panel.style.display !== 'none';
  panel.style.display = visible ? 'none' : '';
  if (!visible) refreshPdfList();
}

function closePdfPanel() {
  const panel = document.getElementById('pdfPanel');
  if (panel) panel.style.display = 'none';
}

/* ═══════════════════════════════════════════════════════════════
   2. FILE UPLOAD HANDLING
   ═══════════════════════════════════════════════════════════════ */
function handlePdfSelect(e) {
  const files = e.target.files || e.dataTransfer?.files;
  if (!files || !files.length) return;
  // Process files sequentially
  Array.from(files).reduce(function(prev, file) {
    return prev.then(function() { return processOnePdf(file); });
  }, Promise.resolve());
}

async function processOnePdf(file) {
  const statusEl  = document.getElementById('pdfStatus');
  const progressEl = document.getElementById('pdfProgress');
  const barEl     = document.getElementById('pdfProgressBar');

  if (!file.name.toLowerCase().endsWith('.pdf')) {
    if (statusEl) statusEl.innerHTML = '<span class="pdf-error">⚠ Only PDF files are supported</span>';
    return;
  }

  if (progressEl) progressEl.style.display = '';
  if (statusEl)   statusEl.textContent = 'Starting…';

  try {
    const result = await pdfIngestFile(file, function(msg, pct) {
      if (statusEl)  statusEl.textContent = msg;
      if (barEl)     barEl.style.width = pct + '%';
    });

    if (statusEl) statusEl.innerHTML =
      '<span class="pdf-success">✓ ' + esc(result.name) + ' indexed — ' +
      result.pages + ' pages, ' + result.chunks + ' chunks (' + result.method + ')</span>';

    refreshPdfList();
    updatePdfBadge();

  } catch (err) {
    if (statusEl) statusEl.innerHTML = '<span class="pdf-error">⚠ ' + esc(err.message) + '</span>';
  }

  // Reset file input
  const input = document.getElementById('pdfFileInput');
  if (input) input.value = '';

  // Hide progress after delay
  setTimeout(function() {
    if (progressEl) progressEl.style.display = 'none';
    if (barEl) barEl.style.width = '0%';
  }, 2000);
}

/* ═══════════════════════════════════════════════════════════════
   3. DRAG & DROP
   ═══════════════════════════════════════════════════════════════ */
function initPdfDragDrop() {
  const dropZone = document.getElementById('pdfDropZone');
  if (!dropZone) return;

  ['dragenter', 'dragover'].forEach(function(evt) {
    dropZone.addEventListener(evt, function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('pdf-drop-active');
    });
  });

  ['dragleave', 'drop'].forEach(function(evt) {
    dropZone.addEventListener(evt, function(e) {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('pdf-drop-active');
    });
  });

  dropZone.addEventListener('drop', function(e) {
    handlePdfSelect(e);
  });
}

/* ═══════════════════════════════════════════════════════════════
   4. DOCUMENT LIST MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */
async function refreshPdfList() {
  const listEl = document.getElementById('pdfDocList');
  if (!listEl) return;

  try {
    const stats = await ragGetStats();

    if (!stats.documents) {
      listEl.innerHTML = '<div class="pdf-empty">No documents uploaded yet</div>';
      return;
    }

    listEl.innerHTML = stats.docs.map(function(doc) {
      const date = new Date(doc.createdAt).toLocaleDateString();
      const size = doc.textLen > 1000000
        ? (doc.textLen / 1000000).toFixed(1) + 'M chars'
        : Math.round(doc.textLen / 1000) + 'K chars';
      return '<div class="pdf-doc-item">' +
        '<div class="pdf-doc-info">' +
          '<div class="pdf-doc-name">📄 ' + esc(doc.name) + '</div>' +
          '<div class="pdf-doc-meta">' + doc.chunkCount + ' chunks · ' + size + ' · ' + doc.method + ' · ' + date + '</div>' +
        '</div>' +
        '<button class="pdf-doc-del" onclick="deletePdfDoc(\'' + esc(doc.id) + '\')" title="Remove document">✕</button>' +
      '</div>';
    }).join('');

    // Summary
    listEl.insertAdjacentHTML('beforeend',
      '<div class="pdf-doc-summary">' + stats.documents + ' document(s) · ' + stats.chunks + ' chunks indexed</div>');

  } catch (e) {
    listEl.innerHTML = '<div class="pdf-error">Error loading documents: ' + esc(e.message) + '</div>';
  }
}

async function deletePdfDoc(docId) {
  try {
    await ragDeleteDoc(docId);
    refreshPdfList();
    updatePdfBadge();
  } catch (e) {
    console.error('Delete failed:', e);
  }
}

async function deleteAllPdfs() {
  try {
    await ragDeleteAll();
    refreshPdfList();
    updatePdfBadge();
    var statusEl = document.getElementById('pdfStatus');
    if (statusEl) statusEl.innerHTML = '<span class="pdf-success">All documents cleared</span>';
  } catch (e) {
    console.error('Clear all failed:', e);
  }
}

/* ═══════════════════════════════════════════════════════════════
   5. BADGE — shows doc count next to upload button
   ═══════════════════════════════════════════════════════════════ */
async function updatePdfBadge() {
  const badge = document.getElementById('pdfBadge');
  if (!badge) return;
  try {
    const stats = await ragGetStats();
    if (stats.documents > 0) {
      badge.textContent = stats.documents;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  } catch (e) {
    badge.style.display = 'none';
  }
}

/* ═══════════════════════════════════════════════════════════════
   6. GEMINI EMBEDDING KEY MODAL
   ═══════════════════════════════════════════════════════════════ */
function showEmbedKeyInput() {
  const el = document.getElementById('pdfEmbedKeyRow');
  if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
}

function saveEmbedKey() {
  const input = document.getElementById('pdfEmbedKeyInput');
  if (!input) return;
  const key = input.value.trim();
  if (key && key.startsWith('AIza')) {
    localStorage.setItem('miq_gemini_embed_key', key);
    var statusEl = document.getElementById('pdfStatus');
    if (statusEl) statusEl.innerHTML = '<span class="pdf-success">✓ Gemini embedding key saved</span>';
  } else {
    var statusEl2 = document.getElementById('pdfStatus');
    if (statusEl2) statusEl2.innerHTML = '<span class="pdf-error">⚠ Invalid key — must start with AIza…</span>';
  }
}

/* ═══════════════════════════════════════════════════════════════
   7. INIT on load
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {
  initPdfDragDrop();
  updatePdfBadge();
});
