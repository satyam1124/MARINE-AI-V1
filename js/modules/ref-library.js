/* MarineIQ — Reference Library v2: Book-first RAG, Diagram Detection, Modal UI
   Deps: config.js, data/ref-books/*.js (REF_BOOKS) */





/* ══ MARINEIQ REFERENCE LIBRARY v2 ══ */
/* REF_BOOKS loaded from js/data/ref-books/index.js */

/* ═══════════════════════════════════════════════════════════════
   MARINEIQ REFERENCE LIBRARY v2 — Book-first RAG + Diagram Detection
   ═══════════════════════════════════════════════════════════════ */

/* ─── Client-side keyword search across book sections ─── */
function refBookSearch(query, bookId, topN) {
  topN = topN || 4;
  const book = REF_BOOKS[bookId];
  if (!book) return [];

  const stopWords = ['the','and','are','for','not','but','has','was','what','how','why','when','where','who','which','this','that','these','those','then','than','can','could','would','should', 'is', 'a', 'an', 'in', 'on', 'at', 'to', 'of', 'by', 'as'];
  const qWords = query.toLowerCase()
    .replace(/[^a-z0-9\s]/g,' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.includes(w));
    
  if (!qWords.length) return book.sections.slice(0, topN);

  const scored = book.sections.map(function(s) {
    const hay = (s.heading + ' ' + s.keywords.join(' ') + ' ' + s.text).toLowerCase();
    let score = 0;
    qWords.forEach(function(w) {
      if (hay.includes(w)) {
        const kw_bonus = s.keywords.includes(w) ? 5 : 1;
        score += (hay.split(w).length - 1) * kw_bonus;
      }
    });
    return Object.assign({}, s, { _score: score });
  });

  // Calculate the "perfect score" (if every word matched exactly once) to set a dynamic baseline
  const baseline = qWords.length;
  
  return scored
    .sort(function(a, b) { return b._score - a._score; })
    .slice(0, topN)
    .filter(function(s) { 
      // STRICT FILTER: The score must be high enough to prove this isn't a random 1-word match.
      // E.g. purely generic queries sharing 1 word won't hit a score of 8
      return s._score >= Math.max(8, baseline * 2); 
    });
}

/* ─── Build book-first system context ─── */
function buildRefBookContext(query, isBookFirst) {
  const bookId = APP.activeRefBook;
  if (!bookId) return null;
  const book = REF_BOOKS[bookId];
  const hits = refBookSearch(query, bookId, 4);
  if (!hits.length) {
    let emptyCtx = '\n\n════════════════════════════════════════\n';
    emptyCtx += 'PRIMARY REFERENCE: ' + book.name + '\n';
    emptyCtx += 'CRITICAL INSTRUCTION: The user asked a question, but NO relevant passages exist in the selected book.\n';
    emptyCtx += 'You are strictly forbidden from using your general knowledge to answer this.\n';
    emptyCtx += 'You MUST reply ONLY with: "I searched *' + book.shortName + '* but this topic is not covered in the indexed passages."\n';
    return { text: emptyCtx, source: book.shortName + ' (No matches found)', mode: isBookFirst ? 'Book First' : 'AI + Book' };
  }

  let ctx = '\n\n';
  if (isBookFirst) {
    ctx += '════════════════════════════════════════\n';
    ctx += 'PRIMARY REFERENCE: ' + book.name + '\n';
    ctx += 'Author: ' + book.author + '\n';
    ctx += '════════════════════════════════════════\n';
    ctx += 'INSTRUCTION: You are a strict data extraction system.\n';
    ctx += '1. You MUST answer the user\'s question USING ONLY the provided excerpts from this book.\n';
    ctx += '2. DO NOT use any outside marine engineering knowledge. DO NOT infer or guess.\n';
    ctx += '3. If the answer cannot be found in the exact text provided below, you MUST reply verbatim: "I cannot find the exact answer to this in the selected book."\n';
    ctx += '4. Quote the text directly where possible.\n';
  } else {
    ctx += '--- Reference: ' + book.name + ' ---\n';
  }

  hits.forEach(function(s) {
    ctx += '\n[' + book.shortName + ', pp.' + s.pages + ': ' + s.heading + ']\n';
    ctx += s.text + '\n';
  });

  ctx += '\n--- End Reference Passages ---\n';
  
  const hitPages = hits.map(h => h.pages).join(', ');
  const sourceLabel = book.shortName + ' (pp.' + hitPages + ')';
  
  return { text: ctx, source: sourceLabel, mode: isBookFirst ? 'Book First' : 'AI + Book' };
}

/* ─── Diagram detection: check if query is asking for a diagram ─── */
const DIAGRAM_PATTERNS = [
  /\b(draw|sketch|diagram|figure|show|illustrate|label)\b/i,
  /\b(cross.section|cross section|cross-section)\b/i,
  /\b(flow.?chart|flowchart|schematic|layout)\b/i,
  /\bwhat does.+look like\b/i,
];

const MARINE_DIAGRAM_PROMPTS = {
  'piston': 'Marine diesel engine piston cross-section showing: crown, piston rings (top compression, 2nd compression, oil scraper), skirt, pin boss, cooling oil passage. MAN B&W type.',
  'cylinder head': 'Marine diesel cylinder head cross-section: exhaust valve with cage and seat, fuel injector, starting air valve, indicator cock, cooling water passages.',
  'turbocharger': 'Marine turbocharger cross-section: turbine wheel, compressor wheel, floating ring bearings, oil inlet/outlet, gas inlet/outlet, air inlet/outlet.',
  'fuel injector': 'Marine fuel injector: nozzle holder body, needle valve, spring, fuel inlet, drain, multi-hole nozzle tip (5-9 holes, 0.3-0.5mm diameter).',
  'crosshead': 'Crosshead bearing assembly: crosshead pin, top slipper, guide shoe, cooling oil inlet through quill pipe, connecting rod top end, stuffing box.',
  'centrifugal pump': 'Centrifugal pump cross-section: impeller vanes, volute casing, wear rings, mechanical seal, shaft, inlet eye, discharge nozzle.',
  'purifier': 'Disc type centrifugal purifier/separator: bowl assembly, distributing cone, disc stack, gravity disc, interface control, sludge space, OS & SS outlets.',
  'indicator diagram': 'Marine engine P-V indicator diagram: compression curve 1-2, combustion (constant pressure) 2-3, expansion 3-4, exhaust blowdown 4-5. Power card vs draw card.',
  'boiler': 'Marine auxiliary boiler: furnace, flame tube, smoke tubes, steam drum, feed water inlet, steam outlet, safety valve, gauge glass, blow-down valve.',
  'heat exchanger': 'Plate type heat exchanger (PHE): alternating hot/cold fluid channels, gaskets, tightening bolts, inlet/outlet nozzles, turbulent flow pattern between plates.',
  'scavenge': 'Uniflow scavenging: scavenge ports at liner bottom (open at ~40° ABDC), exhaust valve at top, airflow direction from bottom to top, scavenge air receiver.',
  'refrigeration': 'Vapour compression refrigeration cycle: compressor (1→2), condenser (2→3), expansion valve (3→4), evaporator (4→1). P-h diagram with subcooling and superheat.',
  'steering gear': 'Electro-hydraulic steering gear: Rapson slide type, tiller, hydraulic rams, hunting gear, control valve, HP hydraulic pump, rudder stock.',
  'ows': 'Oily water separator (OWS): gravity stage 1 separation, coalescer stage 2, 15ppm bilge alarm/OCM, 3-way valve, ORB connection.',
  'crankshaft': 'Marine diesel crankshaft: main journals, crankpins, crank webs, balance weights, chain drive end, flywheel flange. Stress concentration areas marked.',
};

function detectDiagramRequest(query) {
  const qLow = query.toLowerCase();
  const isDiagram = DIAGRAM_PATTERNS.some(p => p.test(query));
  if (!isDiagram) return null;
  for (const [key, prompt] of Object.entries(MARINE_DIAGRAM_PROMPTS)) {
    if (qLow.includes(key)) return { key, prompt };
  }
  return { key: 'generic', prompt: null };
}

function buildDiagramContext(diagramInfo, query) {
  if (!diagramInfo || !diagramInfo.prompt) return '';
  return '\n\nDIAGRAM REQUEST DETECTED. Generate a LABELED ASCII/text diagram for: ' + query +
    '\nUse this as reference: ' + diagramInfo.prompt +
    '\nFormat: Create a clear ASCII art diagram with labels. Use | - / \\ + characters for the drawing. Label every major component. Then explain each labeled part below the diagram.';
}

/* ─── Marine Insight source context ─── */
function buildMarineInsightContext() {
  return '\n\nADDITIONAL SOURCE: marineinsight.com — a trusted maritime industry resource. ' +
    'If relevant, note that information can be cross-referenced at https://www.marineinsight.com. ' +
    'Prefer citing official IMO/MMD regulations over web sources for technical answers.';
}

/* ─── Modal UI ─── */
function openRefLibrary() {
  let modal = document.getElementById('refLibModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'refLibModal';
    modal.className = 'ref-lib-modal';
    modal.innerHTML = buildRefLibModalHTML();
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e){ if(e.target===modal) closeRefLibrary(); });
  }
  modal.style.display = 'flex';
  updateRefLibUI();
}

function closeRefLibrary() {
  const m = document.getElementById('refLibModal');
  if(m) m.style.display = 'none';
}

function buildRefLibModalHTML() {
  let h = '<div class="ref-lib-panel">';
  h += '<div class="ref-lib-header">';
  h += '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:22px">📚</span><div>';
  h += '<div>Reference Library</div>';
  h += '<div style="font-size:11px;font-weight:400;color:#94a3b8;margin-top:2px">Book-first answers with page citations</div>';
  h += '</div></div>';
  h += '<button class="ref-lib-close" onclick="closeRefLibrary()">&#x2715;</button></div>';

  h += '<div class="ref-lib-mode-row">';
  h += '<span style="font-size:12px;color:#94a3b8">Answer mode:</span>';
  h += '<label class="ref-toggle-label"><input type="radio" name="refMode" value="bookfirst" '+(APP.refMode==='bookfirst'?'checked':'')+' onchange="APP.refMode=\'bookfirst\';saveRefPrefs()"> <span>📖 Book First</span></label>';
  h += '<label class="ref-toggle-label"><input type="radio" name="refMode" value="supplement" '+(APP.refMode!=='bookfirst'?'checked':'')+' onchange="APP.refMode=\'supplement\';saveRefPrefs()"> <span>🤖 AI + Book</span></label>';
  h += '</div>';
  h += '<p style="font-size:12px;color:#64748b;padding:0 20px 10px;margin:0">📖 Book First: Answer comes directly from the selected book. AI only fills gaps not covered.<br>🤖 AI + Book: AI answers with the book as supplementary context.</p>';

  h += '<div class="ref-lib-books">';
  Object.values(REF_BOOKS).forEach(function(book){
    const isActive = APP.activeRefBook === book.id;
    h += '<div class="ref-book-card'+(isActive?' rbc-active':'')+'" id="rbc_'+book.id+'" onclick="selectRefBook(\''+book.id+'\')">';
    h += '<div class="rbc-icon" style="background:'+book.color+'22;border-color:'+book.color+'44">'+book.icon+'</div>';
    h += '<div class="rbc-info">';
    h += '<div class="rbc-title">'+book.name+'</div>';
    h += '<div class="rbc-author">'+book.author+'</div>';
    h += '<div class="rbc-stats"><span class="rbc-count">'+book.sections.length+' sections indexed</span>';
    h += '<span class="rbc-topics">'+book.topics.slice(0,4).join(' · ')+'</span></div>';
    h += '</div>';
    h += '<div class="rbc-check" id="rbcheck_'+book.id+'" style="display:'+(isActive?'flex':'none')+'">&#10003;</div>';
    h += '</div>';
  });
  h += '</div>';

  h += '<div class="ref-lib-actions">';
  h += '<button class="ref-clear-btn" onclick="selectRefBook(null)">&#128683; Clear Selection</button>';
  h += '<button class="ref-done-btn" onclick="closeRefLibrary()">Done</button>';
  h += '</div></div>';
  return h;
}

function selectRefBook(bookId) {
  APP.activeRefBook = bookId;
  saveRefPrefs();
  updateRefLibUI();
  updateRefBadge();
}

function saveRefPrefs() {
  try {
    localStorage.setItem('marineiq_refbook', APP.activeRefBook||'');
    localStorage.setItem('marineiq_refmode', APP.refMode||'bookfirst');
  } catch(e){}
}

function updateRefLibUI() {
  Object.keys(REF_BOOKS).forEach(function(id){
    const card = document.getElementById('rbc_'+id);
    const check = document.getElementById('rbcheck_'+id);
    if(card) card.classList.toggle('rbc-active', APP.activeRefBook===id);
    if(check) check.style.display = APP.activeRefBook===id ? 'flex' : 'none';
  });
}

function updateRefBadge() {
  const badge = document.getElementById('refBadge');
  if(!badge) return;
  if(APP.activeRefBook && REF_BOOKS[APP.activeRefBook]) {
    const book = REF_BOOKS[APP.activeRefBook];
    const mode = APP.refMode === 'bookfirst' ? '📖 BOOK FIRST' : '🤖 AI+BOOK';
    badge.innerHTML = book.icon + ' ' + book.shortName + ' <span style="opacity:.7;font-size:10px">' + mode + '</span>';
    badge.style.display = 'inline-flex';
    badge.style.borderColor = book.color + '80';
    badge.style.background = 'linear-gradient(135deg,'+book.color+'22,'+book.color+'11)';
  } else {
    badge.style.display = 'none';
  }
}



