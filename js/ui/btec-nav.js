/* MarineIQ — BTech Chapter Navigation System
   Renders chapter indexes for all 49 BTech subjects
   Requires: TOPIC_KNOWLEDGE (data/topic-knowledge.js)
             BTEC chapter data (data/btec-chapters.js) loaded first
   ═══════════════════════════════════════════════════════════════════════════ */

(function BTechChapterSystem(){

/* ── CSS for the chapter index and subject header ── */
const CSS = `
/* Subject header bar shown when a BTech subject is selected */
.subj-header {
  display:flex; align-items:center; gap:12px;
  padding:14px 16px; margin-bottom:10px;
  background:linear-gradient(135deg,rgba(212,160,23,.1),rgba(212,160,23,.04));
  border:1px solid rgba(212,160,23,.2); border-radius:14px;
}
.subj-header-icon { font-size:2rem; flex-shrink:0; }
.subj-header-body { flex:1; min-width:0; }
.subj-header-title { font-size:1rem; font-weight:800; color:var(--tx); margin-bottom:2px; }
.subj-header-desc  { font-size:.73rem; color:var(--tx2); line-height:1.5; }
.subj-header-meta  { display:flex; gap:8px; margin-top:6px; flex-wrap:wrap; }
.subj-meta-tag     { font-size:.62rem; padding:2px 8px; border-radius:20px; border:1px solid rgba(212,160,23,.3); color:var(--ac); font-family:'JetBrains Mono',monospace; }

/* Quiz button on subject header */
.subj-quiz-btn {
  padding:8px 14px; border-radius:10px; border:none; cursor:pointer; font-size:.77rem; font-weight:700;
  background:rgba(212,160,23,.15); color:var(--ac); transition:all .15s; white-space:nowrap;
}
.subj-quiz-btn:hover { background:rgba(212,160,23,.3); transform:translateY(-1px); }

/* Chapter cards grid */
.chapter-index-label {
  font-family:'JetBrains Mono',monospace; font-size:.58rem; letter-spacing:.1em; text-transform:uppercase;
  color:var(--tx3); padding:12px 0 6px; font-weight:700;
}
.chapter-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:10px; padding-bottom:8px;
}
.chapter-card {
  background:var(--bg1); border:1px solid var(--b0); border-radius:12px;
  padding:13px 14px; cursor:pointer; transition:all .15s; position:relative;
}
.chapter-card:hover { border-color:var(--ac); box-shadow:0 4px 16px rgba(0,0,0,.2); transform:translateY(-2px); }
.chapter-card-num   { font-family:'JetBrains Mono',monospace; font-size:.58rem; color:var(--tx3); margin-bottom:3px; }
.chapter-card-icon  { font-size:1.5rem; margin-bottom:4px; }
.chapter-card-title { font-size:.82rem; font-weight:700; color:var(--tx); margin-bottom:4px; line-height:1.3; }
.chapter-card-desc  { font-size:.7rem; color:var(--tx2); line-height:1.5; }
.chapter-card-tags  { display:flex; flex-wrap:wrap; gap:4px; margin-top:7px; }
.chapter-card-tag   { font-size:.58rem; padding:1px 6px; background:rgba(212,160,23,.08); color:var(--ac); border-radius:20px; }
.chapter-card:hover .chapter-card-title { color:var(--ac); }

/* Chapter view active state */
.chapter-card.ch-active { border-color:var(--ac); background:rgba(212,160,23,.05); }

/* Chapter breadcrumb inside topicZone */
.chapter-crumb {
  display:flex; align-items:center; gap:8px; padding:8px 12px; margin-bottom:10px;
  background:rgba(212,160,23,.05); border-radius:10px; font-size:.75rem;
  border:1px solid rgba(212,160,23,.15);
}
.chapter-crumb-back { color:var(--ac); cursor:pointer; font-weight:700; text-decoration:underline; }
.chapter-crumb-sep  { color:var(--tx3); }
.chapter-crumb-cur  { color:var(--tx); font-weight:600; }

/* Chapter-specific content header */
.chapter-content-header {
  display:flex; align-items:flex-start; gap:12px; padding:12px 14px; margin-bottom:12px;
  background:rgba(212,160,23,.06); border:1px solid rgba(212,160,23,.18); border-radius:12px;
}
.ch-content-icon  { font-size:2rem; flex-shrink:0; }
.ch-content-title { font-size:.95rem; font-weight:800; color:var(--tx); margin-bottom:3px; }
.ch-content-desc  { font-size:.73rem; color:var(--tx2); line-height:1.55; }
.ch-quiz-btn {
  margin-left:auto; padding:7px 13px; border-radius:9px; border:none; cursor:pointer;
  background:rgba(212,160,23,.15); color:var(--ac); font-size:.73rem; font-weight:700; white-space:nowrap;
}
.ch-quiz-btn:hover { background:rgba(212,160,23,.28); }

body.light-mode .chapter-card  { background:white!important; }
body.light-mode .chapter-card:hover { box-shadow:0 4px 16px rgba(13,30,53,.1)!important; }
body.light-mode .subj-header   { background:linear-gradient(135deg,rgba(176,125,10,.07),rgba(176,125,10,.02))!important; }

@media(max-width:600px){
  .chapter-grid { grid-template-columns:1fr; gap:10px; }
  .subj-header  { flex-wrap:wrap; }
}
`;
const styleEl = document.createElement('style'); styleEl.textContent = CSS;
document.head.appendChild(styleEl);

/* ═══════════════════════════════════════════════════════════════════════════
   CHAPTER KNOWLEDGE BASE
   Format: each entry in subtopics[] now carries: formulas[], flashcards[], videos[]
   ═══════════════════════════════════════════════════════════════════════════ */

/* Helper: push subtopics into existing TK entry OR create new one */
/* Exposed globally so btec-chapters.js can call it */
window.setChapters = function setChapters(topicId, icon, subjTitle, subjDesc, semTag, chapters){
  if(typeof TOPIC_KNOWLEDGE === 'undefined') return;
  if(!TOPIC_KNOWLEDGE[topicId]) TOPIC_KNOWLEDGE[topicId] = { formulas:[], flashcards:[], videos:[] };
  const entry = TOPIC_KNOWLEDGE[topicId];
  entry._subjIcon  = icon;
  entry._subjTitle = subjTitle;
  entry._subjDesc  = subjDesc;
  entry._semTag    = semTag;
  entry.subtopics  = chapters;
  // Aggregate all chapter formulas, flashcards & videos to parent level
  const allFmls = [], allFlash = [], allVids = [];
  chapters.forEach(ch => {
    allFmls.push(...(ch.formulas||[]));
    allFlash.push(...(ch.flashcards||[]));
    allVids.push(...(ch.videos||[]));
    TOPIC_KNOWLEDGE[ch.id] = ch;
  });
  entry.formulas   = allFmls;
  entry.flashcards = allFlash;
  entry.videos     = allVids;
};

/* ─────────────────────────────────────────────────────────────────────────
   1. BASIC ELECTRICAL ENGINEERING (bt_elec1)
   ───────────────────────────────────────────────────────────────────────── */
  /* Chapter data is loaded by data/btec-chapters.js */

})(); /* end BTechChapterSystem */
