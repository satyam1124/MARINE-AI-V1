/* MarineIQ — PDF Parser: Extract text from PDF files using PDF.js
   Deps: pdf.js (CDN), rag-engine.js */

/* ═══════════════════════════════════════════════════════════════
   PDF TEXT EXTRACTION using Mozilla PDF.js
   ═══════════════════════════════════════════════════════════════ */

async function pdfExtractText(file, onProgress) {
  if (!onProgress) onProgress = function() {};

  // Validate file
  if (!file || file.type !== 'application/pdf') {
    throw new Error('Please select a valid PDF file');
  }
  if (file.size > 100 * 1024 * 1024) {
    throw new Error('File too large (max 100 MB)');
  }

  onProgress('Reading file…', 5);
  const arrayBuffer = await file.arrayBuffer();

  // Ensure PDF.js is loaded
  if (typeof pdfjsLib === 'undefined') {
    throw new Error('PDF.js library not loaded. Check your internet connection.');
  }

  onProgress('Opening PDF…', 10);
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;

  let fullText = '';
  for (let i = 1; i <= totalPages; i++) {
    const pct = 10 + Math.round((i / totalPages) * 70);
    onProgress('Extracting page ' + i + ' / ' + totalPages + '…', pct);

    const page    = await pdf.getPage(i);
    const content = await page.getTextContent();

    // Reconstruct text preserving layout
    let lastY    = null;
    let lineText = '';
    const lines  = [];

    content.items.forEach(function(item) {
      const y = Math.round(item.transform[5]);
      if (lastY !== null && Math.abs(y - lastY) > 3) {
        if (lineText.trim()) lines.push(lineText.trim());
        lineText = '';
      }
      lineText += item.str + ' ';
      lastY = y;
    });
    if (lineText.trim()) lines.push(lineText.trim());

    /* Post-process lines for this page */
    const cleaned = [];
    for (let li = 0; li < lines.length; li++) {
      let line = lines[li];
      /* Merge hyphenated words across line breaks */
      if (line.endsWith('-') && li + 1 < lines.length) {
        line = line.slice(0, -1) + lines[li + 1];
        li++; /* skip next line since it's merged */
      }
      /* Skip likely headers/footers: very short lines that are just numbers */
      if (/^\s*\d{1,4}\s*$/.test(line)) continue;  /* page numbers */
      if (/^(chapter|page)\s+\d/i.test(line) && line.length < 30) continue; /* chapter headers */
      /* Normalize excessive whitespace */
      line = line.replace(/\s{3,}/g, '  ').trim();
      if (line.length > 0) cleaned.push(line);
    }

    if (cleaned.length) {
      fullText += '\n\n--- Page ' + i + ' ---\n' + cleaned.join('\n');
    }
  }

  onProgress('Text extraction complete', 85);
  return {
    text:  fullText.trim(),
    pages: totalPages,
    chars: fullText.length,
    name:  file.name
  };
}

/* ═══════════════════════════════════════════════════════════════
   FULL PIPELINE: PDF → Extract → Chunk → Embed → Store
   ═══════════════════════════════════════════════════════════════ */
async function pdfIngestFile(file, onProgress) {
  if (!onProgress) onProgress = function() {};

  // 1. Extract text
  const result = await pdfExtractText(file, function(msg, pct) {
    onProgress(msg, Math.round(pct * 0.5)); // 0-50% for extraction
  });

  if (result.text.length < 50) {
    throw new Error('PDF appears to be scanned/image-based. Only text PDFs are supported.');
  }

  // 2. Generate document ID from filename
  const docId = 'pdf_' + file.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40) + '_' + Date.now();

  // 3. Ingest into RAG
  const stats = await ragIngestDocument(docId, file.name, result.text, function(msg, pct) {
    onProgress(msg, 50 + Math.round(pct * 0.5)); // 50-100% for indexing
  });

  return {
    docId:    docId,
    name:     file.name,
    pages:    result.pages,
    chars:    result.chars,
    chunks:   stats.chunks,
    method:   stats.method
  };
}
