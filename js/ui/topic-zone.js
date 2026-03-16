/* MarineIQ — Topic Zone: Header injection, Navigation, Completion tracking
   Deps: config.js, utils.js */

/* ══════════════════════════════════════════════════════════════════
   9. TOPIC ZONE HEADER — completion, diff badge, next/prev nav
   ══════════════════════════════════════════════════════════════════ */
const _selectTopic1 = selectTopic;
selectTopic = function(topicId, title, desc, icon, sectionName) {
  _selectTopic1(topicId, title, desc, icon, sectionName);

  // Track recent + last topic
  APP.recentTopics = [topicId, ...APP.recentTopics.filter(id => id !== topicId)].slice(0, 10);
  APP.lastTopic    = topicId;
  APP.lastLevel    = APP.currentLevel?.id || null;
  saveState('miq_recent',     APP.recentTopics);
  localStorage.setItem('miq_lasttopic', topicId);
  localStorage.setItem('miq_lastlevel', APP.lastLevel || '');

  // Inject topic header
  injectTopicZoneHeader(topicId, title, icon);
  // Restore tab memory
  const lastTab = APP.tabMemory[topicId];
  if (lastTab) {
    const tabBtn = document.querySelector(`.mm-tab[data-panel="${lastTab}"]`);
    if (tabBtn) switchPanel(lastTab, tabBtn);
  }
  // Inject footer nav
  injectTopicNav(topicId);
};

function injectTopicZoneHeader(topicId, title, icon) {
  const tz = document.getElementById('topicZone');
  if (!tz) return;
  const existing = tz.querySelector('.tz-header');
  if (existing) existing.remove();

  const meta  = TOPIC_META[topicId] || {};
  const done  = !!APP.studied[topicId];

  const header = document.createElement('div');
  header.className = 'tz-header';
  header.innerHTML = `
    <span style="font-size:1.4rem">${icon}</span>
    <div>
      <div style="font-size:0.95rem;font-weight:700;color:var(--tx)">${esc(title)}</div>
      <div style="font-size:0.65rem;color:var(--tx3)">${meta.paper || ''}</div>
    </div>
    ${meta.diff ? `<span class="tz-topic-diff" style="background:${DIFF_COLOR[meta.diff]}15;color:${DIFF_COLOR[meta.diff]};border:1px solid ${DIFF_COLOR[meta.diff]}40">${meta.diff}</span>` : ''}
    ${meta.time ? `<span class="tz-topic-time">⏱ ${meta.time}m</span>` : ''}
    <button class="tz-complete-btn${done ? ' done' : ''}" id="tzCompleteBtn" onclick="toggleTopicComplete('${topicId}')">
      ${done ? '✅ Studied' : '○ Mark Done'}
    </button>`;
  tz.insertBefore(header, tz.firstChild);
}

function toggleTopicComplete(topicId) {
  if (APP.studied[topicId]) {
    delete APP.studied[topicId];
  } else {
    APP.studied[topicId] = 1;
  }
  saveState('marineiq_studied', APP.studied);
  const btn = document.getElementById('tzCompleteBtn');
  if (btn) {
    btn.classList.toggle('done', !!APP.studied[topicId]);
    btn.innerHTML = APP.studied[topicId] ? '✅ Studied' : '○ Mark Done';
  }
  updateProgressBar();
  upgradeRankCards();
}

function injectTopicNav(topicId) {
  const tz = document.getElementById('topicZone');
  if (!tz) return;
  const existing = tz.querySelector('.topic-nav-footer');
  if (existing) existing.remove();

  const lvl      = APP.currentLevel;
  if (!lvl) return;
  const allTopics = Object.values(lvl.sections).flat();
  const idx       = allTopics.findIndex(t => t.id === topicId);
  const prev      = allTopics[idx - 1];
  const next      = allTopics[idx + 1];

  const footer = document.createElement('div');
  footer.className = 'topic-nav-footer';
  footer.innerHTML = `
    <button class="tnf-btn prev" ${!prev ? 'disabled' : `onclick="selectTopic('${prev.id}','${esc(prev.title)}','${esc(prev.desc)}','${prev.icon}','')"`}>
      <span class="tnf-label">← Previous</span>
      <span class="tnf-title">${prev ? prev.icon + ' ' + esc(prev.title) : '—'}</span>
    </button>
    <button class="tnf-btn next" ${!next ? 'disabled' : `onclick="selectTopic('${next.id}','${esc(next.title)}','${esc(next.desc)}','${next.icon}','')"`}>
      <span class="tnf-label">Next →</span>
      <span class="tnf-title">${next ? esc(next.title) + ' ' + next.icon : '—'}</span>
    </button>`;
  tz.appendChild(footer);
}

/* Remember active tab per topic */
const _switchPanel0 = switchPanel;
switchPanel = function(panelId, btn) {
  _switchPanel0(panelId, btn);
  if (APP.currentTopic) {
    APP.tabMemory[APP.currentTopic] = panelId;
    saveState('miq_tabmemory', APP.tabMemory);
  }
};

/* ══════════════════════════════════════════════════════════════════
   10. STAT TRACKING
   ══════════════════════════════════════════════════════════════════ */
const _fcFlip0 = fcFlip;
fcFlip = function() {
  _fcFlip0();
  APP.stats.fcFlipped = (APP.stats.fcFlipped || 0) + 1;
  saveState('miq_stats', APP.stats);
};

const _doAsk1 = doAsk;
doAsk = async function() {
  APP.stats.aiAsked = (APP.stats.aiAsked || 0) + 1;
  saveState('miq_stats', APP.stats);
  return _doAsk1();
};

const _renderQuizQ0 = renderQuizQ;
renderQuizQ = function() {
  _renderQuizQ0();
  if (APP.quizIndex === 0) {
    APP.stats.quizTaken = (APP.stats.quizTaken || 0) + 1;
    saveState('miq_stats', APP.stats);
  }
};



/* ══ B.TECH MARINE + COLOR OVERHAUL + MOBILE FIX ══ */
/* ═══════════════════════════════════════════════════════════════════════
   v4.1 UPGRADE: B.Tech Marine Syllabus + Color Refresh + Mobile Overhaul
   ═══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   1. COMPONENT STYLE OVERRIDES — variables are now in variables.css
   ══════════════════════════════════════════════════════════════ */
(function applyNewColors() {
  const s = document.createElement('style');
  s.id = 'color-override';
  s.textContent = `
/* ── NOTE: CSS variables (:root) are centralized in variables.css ── */

/* ── Topbar: deep navy with gold accent line ── */
.topbar {
  background: rgba(2,8,16,0.97) !important;
  border-bottom: 2px solid rgba(212,160,23,0.25) !important;
}

/* ── Logo gold accent ── */
.logo em { color: var(--acL) !important; }
.logo-anchor { color: var(--acL) !important; }

/* ── Rank cards: gradient glow borders ── */
.rank-card {
  background: linear-gradient(145deg, var(--bg1), var(--bg2)) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease !important;
}
.rank-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,0.5) !important;
}

/* ── Home title gradient ── */
.home-title em {
  background: linear-gradient(135deg, var(--acL), #60a5fa);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Multimodal tabs — pill style ── */
.mm-tabs {
  background: var(--bg2) !important;
  border: 1px solid var(--b1) !important;
  border-radius: 12px !important;
  padding: 4px !important;
  gap: 2px !important;
}
.mm-tab {
  border-radius: 9px !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
}
.mm-tab.active {
  background: var(--bg4) !important;
  color: var(--acL) !important;
  border: 1px solid var(--b2) !important;
}

/* ── Answer card accent ── */
.answer-card {
  border-color: rgba(212,160,23,0.15) !important;
}
.ans-formula {
  background: rgba(212,160,23,0.06) !important;
  border-left-color: var(--ac) !important;
}
.ans-formula-label {
  color: var(--ac) !important;
}

/* ── Flashcard gold flip ── */
.fc-front { border-bottom: 2px solid rgba(212,160,23,0.3) !important; }

/* ── Quiz options ── */
.quiz-opt {
  border: 1px solid var(--b1) !important;
  background: var(--bg2) !important;
  transition: all 0.15s !important;
}
.quiz-opt:hover:not(:disabled) {
  border-color: var(--ac) !important;
  background: rgba(212,160,23,0.06) !important;
  color: var(--tx) !important;
}
.quiz-opt.correct { background: rgba(52,211,153,0.12) !important; border-color: #34d399 !important; color: #34d399 !important; }
.quiz-opt.wrong   { background: rgba(248,113,113,0.1)  !important; border-color: #f87171 !important; color: #f87171 !important; }

/* ── Primary button ── */
.action-btn.primary, .modal-save, .ask-btn {
  background: linear-gradient(135deg, var(--ac), var(--acD)) !important;
  border-color: var(--ac) !important;
  color: #020810 !important;
  font-weight: 700 !important;
}
.action-btn.primary:hover, .modal-save:hover, .ask-btn:hover {
  background: linear-gradient(135deg, var(--acL), var(--ac)) !important;
  box-shadow: 0 4px 20px rgba(212,160,23,0.3) !important;
}

/* ── Model pills ── */
.model-pill.active {
  border-color: var(--ac) !important;
  background: rgba(212,160,23,0.1) !important;
}
.model-pill.active .mp-name { color: var(--acL) !important; }

/* ── Sidebar active topic ── */
.sb-topic.active {
  background: rgba(212,160,23,0.08) !important;
  border-left: 3px solid var(--ac) !important;
  color: var(--tx) !important;
}
.sb-topic:hover:not(.active) { background: var(--bg3) !important; }

/* ── Search input ── */
.search-input:focus {
  border-color: var(--ac) !important;
  box-shadow: 0 0 0 3px rgba(212,160,23,0.1) !important;
}

/* ── Global search ── */
.gs-result.selected { background: rgba(212,160,23,0.08) !important; }

/* ── Streak badge gold ── */
.streak-badge { color: var(--acL) !important; border-color: rgba(212,160,23,0.4) !important; background: rgba(212,160,23,0.08) !important; }

/* ── Continue card ── */
.continue-card:hover { border-color: var(--ac) !important; box-shadow: 0 4px 24px rgba(212,160,23,0.15) !important; }
.continue-play { background: linear-gradient(135deg, var(--ac), var(--acD)) !important; color: #020810 !important; }

/* ── Year card headers ── */
.year-card:hover { border-color: var(--b2) !important; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--b2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--ac); }

/* ══ MOBILE FULL OVERHAUL ══ */

/* Topbar mobile */
@media (max-width: 768px) {
  :root { --top: 52px; --sb: 86vw; }
  .topbar { padding: 0 12px !important; gap: 8px !important; }
  .logo   { font-size: 1rem !important; }
  .logo em { font-size: inherit !important; }

  /* Hide text labels on small buttons, keep icons */
  #btnExam .tbtn-label, #btnQuiz .tbtn-label { display: none; }
  .tbtn { padding: 6px 8px !important; font-size: 0.65rem !important; min-height: 36px !important; }

  /* Breadcrumb shorter */
  .breadcrumb { max-width: 100px !important; font-size: 0.58rem !important; }

  /* Home screen */
  .home-screen { padding: 18px 12px 90px !important; }
  .home-title  { font-size: 1.6rem !important; line-height: 1.15 !important; }
  .home-sub    { font-size: 0.83rem !important; }
  .home-ship-anim { font-size: 2.2rem !important; }

  /* Stats row — 2×2 grid */
  .stats-row { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
  .stat-num  { font-size: 1.4rem !important; }
  .stat-card { padding: 10px 12px !important; }

  /* Continue card */
  .continue-card { padding: 12px 14px !important; gap: 12px !important; }
  .continue-title { font-size: 0.85rem !important; }

  /* Home tabs */
  .home-tabs { flex-wrap: nowrap !important; overflow-x: auto !important; width: 100% !important; }
  .home-tab  { font-size: 0.72rem !important; padding: 7px 14px !important; white-space: nowrap !important; }

  /* Rank cards — single column NO zigzag */
  .rank-grid::before, .rank-node { display: none !important; }
  .rank-row { margin-bottom: 10px !important; }
  .rank-row:nth-child(odd)  .rank-card,
  .rank-row:nth-child(even) .rank-card { margin: 0 !important; }
  .rank-card { padding: 16px 16px !important; border-radius: 14px !important; }
  .rc-icon   { font-size: 1.6rem !important; }
  .rc-title  { font-size: 1rem !important; }
  .rc-sub    { font-size: 0.76rem !important; -webkit-line-clamp: 2 !important; }
  .rc-tags   { flex-wrap: wrap !important; gap: 4px !important; }
  .rc-tag    { font-size: 0.6rem !important; padding: 2px 7px !important; }

  /* Info strip — 1 col */
  .info-strip { grid-template-columns: 1fr !important; gap: 8px !important; }
  .info-card  { padding: 12px !important; }
  .ic-title   { font-size: 0.88rem !important; }

  /* Level page */
  .level-page  { padding: 12px 12px 90px !important; }
  .lp-banner   { padding: 16px 16px !important; border-radius: 14px !important; }
  .lp-title    { font-size: 1.05rem !important; }
  .lp-desc     { font-size: 0.78rem !important; }
  .lp-stage    { font-size: 0.6rem !important; }
  .elig-grid   { grid-template-columns: 1fr !important; gap: 8px !important; }
  .elig-item   { padding: 8px 10px !important; font-size: 0.78rem !important; }
  .exam-papers-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
  .ep-card     { padding: 10px 12px !important; }
  .ep-label    { font-size: 0.58rem !important; }
  .ep-title    { font-size: 0.84rem !important; }

  /* Multimodal tabs — horizontal scroll */
  .mm-section  { padding: 0 !important; }
  .mm-tabs     { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important;
                 scrollbar-width: none !important; flex-wrap: nowrap !important; }
  .mm-tabs::-webkit-scrollbar { display: none !important; }
  .mm-tab      { padding: 7px 12px !important; font-size: 0.72rem !important;
                 white-space: nowrap !important; flex-shrink: 0 !important; min-height: 38px !important; }

  /* Topic zone header */
  .tz-header { flex-wrap: wrap !important; gap: 6px !important; }
  .tz-complete-btn { font-size: 0.65rem !important; padding: 5px 10px !important; }
  .tz-nav { display: none !important; } /* hide desktop nav on mobile — use footer nav */

  /* Diagrams */
  .diag-grid    { grid-template-columns: 1fr !important; gap: 10px !important; }
  .diag-card    { border-radius: 12px !important; }
  .diag-label   { font-size: 0.65rem !important; padding: 6px !important; }

  /* Video grid */
  .video-grid   { grid-template-columns: 1fr !important; }
  .yt-card      { padding: 12px !important; }

  /* Formula grid */
  .formula-grid { grid-template-columns: 1fr !important; }
  .formula-card { padding: 12px !important; }
  .fc-eq        { font-size: 0.8rem !important; }

  /* Flashcard */
  .flashcard-zone { padding: 0 !important; }
  .flashcard-wrap { height: 165px !important; border-radius: 14px !important; }
  .fc-question    { font-size: 0.84rem !important; padding: 16px !important; }
  .fc-answer      { font-size: 0.78rem !important; padding: 16px !important; }
  .fc-header      { padding: 10px 14px !important; flex-wrap: wrap !important; gap: 6px !important; }
  .fc-ctrl-btn    { min-width: 40px !important; min-height: 40px !important; }

  /* Quiz */
  .quiz-wrap  { padding: 14px 12px !important; }
  .quiz-q     { font-size: 0.85rem !important; margin-bottom: 12px !important; }
  .quiz-opts  { gap: 7px !important; }
  .quiz-opt   { font-size: 0.8rem !important; padding: 12px 13px !important;
                min-height: 48px !important; border-radius: 10px !important; }
  .quiz-actions { gap: 6px !important; flex-wrap: wrap !important; }
  .quiz-result  { font-size: 0.8rem !important; margin-top: 8px !important; }

  /* AI search area */
  .search-area  { padding: 14px 12px !important; }
  .model-pills  { gap: 5px !important; overflow-x: auto !important; flex-wrap: nowrap !important;
                  scrollbar-width: none !important; padding-bottom: 2px !important; }
  .model-pills::-webkit-scrollbar { display: none !important; }
  .model-pill   { flex-shrink: 0 !important; padding: 7px 11px !important; }
  .mp-name      { font-size: 0.62rem !important; }
  .mp-sub       { display: none !important; }
  .search-wrap  { border-radius: 12px !important; flex: 1 1 100% !important; min-width: 0 !important; }
  .search-input { font-size: 0.88rem !important; padding: 14px 16px 14px 42px !important;
                   -webkit-text-fill-color: var(--tx) !important; opacity: 1 !important; }
  .search-row   { flex-wrap: wrap !important; gap: 6px !important; }
  .ask-btn      { padding: 9px 14px !important; font-size: 0.72rem !important; }

  /* Answer card */
  .answer-card  { margin-top: 12px !important; border-radius: 14px !important; }
  .ans-header   { padding: 12px 14px !important; }
  .ans-query    { font-size: 0.82rem !important; }
  .ans-body     { font-size: 0.87rem !important; padding: 14px 14px !important; line-height: 1.7 !important; }
  .ans-actions  { padding: 10px 14px !important; flex-wrap: wrap !important; gap: 6px !important; }
  .ans-formula  { padding: 10px 12px !important; font-size: 0.82rem !important; }
  .ans-note     { font-size: 0.8rem !important; }

  /* Notes drawer */
  .notes-drawer { width: 92vw !important; }

  /* Progress bar */
  .sb-progress-bar { padding: 5px 12px 6px !important; }

  /* Sidebar quick access */
  .sb-quick-section { padding: 8px 12px !important; }
  .sb-recent-item   { font-size: 0.76rem !important; padding: 5px 8px !important; min-height: 36px !important; }

  /* Topic nav footer */
  .topic-nav-footer { gap: 8px !important; }
  .tnf-btn  { padding: 10px 12px !important; font-size: 0.76rem !important; }
  .tnf-label { font-size: 0.58rem !important; }

  /* Year syllabus */
  .year-header  { padding: 12px 14px !important; gap: 10px !important; }
  .year-body    { padding: 0 14px 12px !important; }
  .year-title   { font-size: 0.88rem !important; }
  .year-sub     { font-size: 0.68rem !important; }
  .subject-row  { flex-wrap: wrap !important; gap: 8px !important; }
  .subject-code { font-size: 0.58rem !important; }
  .subject-name { font-size: 0.8rem !important; }

  /* Global search */
  .global-search-overlay { padding-top: 60px !important; align-items: flex-start !important; }
  .gs-box    { width: 96vw !important; border-radius: 14px !important; }
  .gs-input  { font-size: 0.95rem !important; }
  .gs-result { padding: 10px 14px !important; }
  .gs-r-title { font-size: 0.83rem !important; }

  /* Provider modal */
  .provider-grid { grid-template-columns: 1fr 1fr !important; }
  .modal-box     { padding: 20px 16px !important; }
}

/* ── 480px phones ── */
@media (max-width: 480px) {
  :root { --sb: 94vw; }
  .home-title      { font-size: 1.4rem !important; }
  .stats-row       { gap: 6px !important; }
  .stat-num        { font-size: 1.2rem !important; }
  .stat-card       { padding: 9px 10px !important; }
  .stat-icon       { font-size: 0.9rem !important; }
  .home-source-strip { font-size: 0.52rem !important; flex-wrap: wrap !important; gap: 4px !important; }
  .lp-title        { font-size: 0.95rem !important; }
  .provider-grid   { grid-template-columns: 1fr !important; }
  .tbtn span:not(.tbtn-icon) { display: none !important; }
  .ans-body code   { font-size: 0.72rem !important; }
  .tnf-title       { font-size: 0.76rem !important; }
}

/* ── Touch improvements ── */
@media (hover: none) and (pointer: coarse) {
  .rank-card:hover { transform: none !important; box-shadow: none !important; }
  .quiz-opt     { min-height: 52px !important; }
  .sb-topic     { min-height: 48px !important; }
  .mm-tab       { min-height: 40px !important; }
  .tbtn         { min-height: 40px !important; }
  .fc-ctrl-btn  { min-height: 44px !important; min-width: 44px !important; }
}

/* ── Light mode override with gold accents ── */
body.light-mode {
  --bg:  #f5f8ff; --bg1: #ffffff; --bg2: #f0f4ff; --bg3: #e8eeff;
  --b0:  #d0ddf0; --b1:  #b8cce0; --b2:  #9ab4cc;
  --tx:  #0d1e35; --tx2: #2d5070; --tx3: #5a7a95;
  --ac:  #b8860b; --acL: #d4a017; --acD: #8b6400;
}
body.light-mode .topbar { background: rgba(245,248,255,0.97) !important; }
body.light-mode .sidebar { background: #fafcff !important; border-right-color: var(--b0) !important; }
body.light-mode .rank-card { background: linear-gradient(145deg,#fff,#f8faff) !important; }
  `;
  document.head.appendChild(s);
})();

/* ══════════════════════════════════════════════════════════════
   2. B.TECH MARINE ENGINEERING — FULL 4-YEAR CURRICULUM
   Aligned with Ganpat University syllabus structure
   ══════════════════════════════════════════════════════════════ */
const BTECH_SYLLABUS = {
  id:        'btech',
  rankColor: '#38bdf8',
  icon:      '🎓',
  stageNum:  'B.TECH',
  title:     'B.Tech Marine Engineering',
  fullTitle: 'Bachelor of Technology — Marine Engineering (4 Years)',
  subtitle:  'Full undergraduate degree — Ganpat University — all 8 semesters with subjects, practicals and lab work',
  tags:      ['4 Year Degree', 'Ganpat University', 'STCW Compliant', '8 Semesters'],
  eligibility: [],
  examPapers: [],
  sections: {
    'Semester 1 — Foundation': [
      { icon: '📐', id: 'bt_maths1',     title: 'Mathematics – I (MR)',                         desc: 'Indeterminate forms, sequences & series, matrices & linear algebra, differential calculus, integral calculus, vector calculus intro' },
      { icon: '⚗️', id: 'bt_physics',    title: 'Physics (MR)',                                  desc: 'Wave optics, laser & fibre optics, quantum mechanics, solid state physics, semiconductor physics, electromagnetism' },
      { icon: '📝', id: 'bt_commskills', title: 'Communication Skills (MR)',                    desc: 'Fundamentals of communication, technical writing, grammar & vocabulary, presentation skills, group discussion & interview, comprehension' },
      { icon: '✏️', id: 'bt_draw',       title: 'Engineering Graphics (MR)',                     desc: 'Drawing instruments & lettering, geometric constructions, projections of points & lines, projections of planes & solids, sections, isometric & orthographic projections' },
      { icon: '🔨', id: 'bt_workshop1',  title: 'Workshop Practice (MR)',                       desc: 'Fitting shop, welding shop, carpentry shop, sheet metal shop, smithy shop, machine shop' },
      { icon: '🏗️', id: 'bt_civil',      title: 'Elements of Civil Engineering (MR)',            desc: 'Surveying, building materials, construction practices, water supply & sanitation, environmental engineering basics, transportation engineering intro' },
    ],
    'Semester 2 — Engineering Fundamentals': [
      { icon: '📊', id: 'bt_maths2',     title: 'Mathematics – II (MR)',                        desc: 'Ordinary differential equations, higher-order linear ODE, Laplace transforms, Fourier series, partial differential equations, complex variables intro' },
      { icon: '🔌', id: 'bt_elec1',      title: 'Basic Electrical Engineering (MR)',             desc: 'DC circuits, AC fundamentals, single-phase AC circuits, three-phase AC circuits, transformers, electrical machines intro, electrical safety & earthing' },
      { icon: '🖥️', id: 'bt_prog',       title: 'Programming for Problem Solving (MR)',         desc: 'Introduction to programming, C fundamentals, control structures, arrays & strings, functions, pointers, structures & unions, file handling' },
      { icon: '🔧', id: 'bt_mechengg',   title: 'Elements of Mechanical Engineering (MR)',      desc: 'Thermodynamic concepts, second law & entropy, IC engines, boilers & steam generators, power transmission elements, material science basics' },
      { icon: '⚙️', id: 'bt_mech',       title: 'Engineering Mechanics (MR)',                    desc: 'Force systems, equilibrium, friction, centroid & moment of inertia, kinematics, kinetics, virtual work' },
      { icon: '✏️', id: 'bt_cad',        title: 'Computer Aided Drawing (MR)',                  desc: 'AutoCAD fundamentals, 2D drafting commands, dimensioning, layers, blocks, plotting, introduction to 3D modeling for engineering applications' },
      { icon: '🔩', id: 'bt_workshop2',  title: 'Workshop Technology & Practice – II (MR)',     desc: 'Advanced fitting, pipe fitting, welding practice (MMA, MIG, TIG), precision measurement, marine fitting operations' },
      { icon: '⚓', id: 'bt_seamanship', title: 'Seamanship & Survival at Sea (MR)',            desc: 'Ship terminology, rope work & splicing, anchoring & mooring, lifeboat & life raft operation, personal survival techniques, distress signals, STCW basic safety' },
    ],
    'Semester 3 — Marine Core': [
      { icon: '🚢', id: 'bt_shipconstruct', title: 'Ship Structure & Construction (MR)',        desc: 'Ship structural members, framing systems (transverse, longitudinal, combined), shell plating, double bottom, watertight subdivision, bulkheads, welded joints, fore & aft construction, ship surveys' },
      { icon: '🌡️', id: 'bt_thermo2',    title: 'Applied Thermodynamics (MR)',                  desc: 'Thermodynamic systems & properties, first law applications (SFEE), second law & availability, properties of pure substances, thermodynamic cycles (Rankine, Brayton), heat transfer (conduction, convection, radiation), heat exchangers' },
      { icon: '⚡', id: 'bt_metec1',     title: 'Marine Electro Technology – I (MR)',           desc: 'DC machines (generators & motors), construction, EMF equation, characteristics, speed control, starters, braking, applications in marine systems' },
      { icon: '🔬', id: 'bt_strength',   title: 'Strength of Material (MR)',                    desc: 'Simple stresses & strains, compound stresses, shear force & bending moment diagrams, bending stresses, shear stresses in beams, deflection of beams, torsion, columns & struts, thin & thick cylinders' },
      { icon: '⚙️', id: 'bt_diesel1',    title: 'Marine Internal Combustion Engine – I (MR)',   desc: 'Introduction to marine diesels, engine construction (bedplate, A-frame, entablature), running gear, fuel injection, starting & reversing, scavenging & supercharging, engine timing, lubrication, cooling' },
      { icon: '📋', id: 'bt_gp1',        title: 'General Performance – I (MR)',                 desc: 'Workshop practice, engine room familiarization, safety procedures, tool identification, basic machinery operation, logbook entries, watch-keeping introduction' },
    ],
    'Semester 4 — Marine Systems': [
      { icon: '⚡', id: 'bt_metec2',     title: 'Marine Electro Technology – II (MR)',          desc: 'Transformers (advanced), three-phase induction motors, synchronous machines, single-phase motors, marine electrical systems (440V/6.6kV), emergency generator, shore connection' },
      { icon: '📡', id: 'bt_basicelec',  title: 'Basic Electronics (MR)',                       desc: 'Semiconductor devices (diodes, BJT, FET, MOSFET), rectifiers & power supplies, amplifiers, digital electronics (logic gates, flip-flops, counters), sensors & transducers' },
      { icon: '🔩', id: 'bt_materials',  title: 'Engineering Materials (MR)',                   desc: 'Crystal structure & imperfections, phase diagrams, heat treatment, ferrous & non-ferrous alloys, corrosion in marine environment, marine-grade materials, NDT, welding metallurgy' },
      { icon: '📈', id: 'bt_mathsmarine',title: 'Mathematics for Marine Engineering (MR)',      desc: 'Numerical methods (bisection, Newton-Raphson), interpolation, numerical differentiation & integration, numerical solution of ODE, probability & distributions, statistics & regression' },
      { icon: '⚙️', id: 'bt_tom',        title: 'Theory of Machines (MR)',                      desc: 'Mechanisms & linkages, velocity & acceleration analysis, cams & followers, gears & gear trains, governors, flywheel & turning moment, balancing, vibrations' },
      { icon: '💧', id: 'bt_fluid1',     title: 'Fluid Mechanics & Hydraulics (MR)',            desc: 'Fluid properties, fluid statics, fluid kinematics, Bernoulli\'s equation, viscous flow, boundary layer theory, dimensional analysis, flow through pipes, hydraulic machines (pumps, turbines)' },
      { icon: '🔄', id: 'bt_aux',        title: 'Marine Auxiliary Machines – I (MR)',            desc: 'Fuel oil systems, lubricating oil systems, fresh water generation, compressed air systems, steering gear, deck machinery, sewage treatment, oily water separator' },
      { icon: '📋', id: 'bt_gp2',        title: 'General Performance – II (MR)',                desc: 'Engine room watch-keeping practice, machinery operation drills, safety equipment familiarization, maintenance procedures, practical assessments' },
    ],
    'Semester 5 — Advanced Marine I': [
      { icon: '🔥', id: 'bt_firecontrol',title: 'Ship Fire Prevention & Control (MR)',          desc: 'Fire science & classification, fire detection systems, fixed fire-fighting systems (CO₂, foam, water mist), portable equipment, structural fire protection, LSA, emergency procedures, ISM code' },
      { icon: '🔩', id: 'bt_machdesign', title: 'Machine Design and Drawing (MR)',              desc: 'Design philosophy, design of shafts, keys & couplings, bolted joints, welded joints, spring design, bearing selection, gear design, marine component drawing' },
      { icon: '⚙️', id: 'bt_diesel2',    title: 'Marine Internal Combustion Engine – II (MR)',  desc: 'Engine performance parameters, indicator diagrams, combustion, turbocharger, engine governors, exhaust gas economizer, engine maintenance & troubleshooting, crankcase safety, emission control' },
      { icon: '📳', id: 'bt_vibration',  title: 'Dynamics of Vibration (MR)',                   desc: 'Free, forced, damped vibrations, natural frequency, resonance, critical speed, torsional vibration, vibration measurement & analysis, vibration isolation, shipboard vibration' },
      { icon: '⚓', id: 'bt_naval1',     title: 'Naval Architecture (MR)',                      desc: 'Ship dimensions & form, displacement & tonnage, Simpson\'s rules, hydrostatic curves, transverse stability, GZ curves, trim, inclining experiment, intact & damage stability, ship resistance' },
      { icon: '📡', id: 'bt_electronics',title: 'Electronics (MR)',                              desc: 'Semiconductor devices (advanced), rectifiers & power supplies, amplifiers & op-amps, digital electronics (counters, registers, A/D & D/A), communication systems, GMDSS, radar & ECDIS' },
      { icon: '📋', id: 'bt_gp3',        title: 'General Performance – III (MR)',               desc: 'Advanced engine room operations, fault diagnosis exercises, emergency drills, practical assessments, watch-keeping competency evaluation' },
    ],
    'Semester 6 — Advanced Marine II': [
      { icon: '❄️', id: 'bt_refrig',     title: 'Refrigeration & Air Conditioning (MR)',        desc: 'Vapour compression cycle, P-h diagram, COP, refrigerants (R134a, NH₃, CO₂), marine provision & cargo refrigeration, compressors, HVAC systems, troubleshooting' },
      { icon: '🔧', id: 'bt_aux2',       title: 'Marine Auxiliary Machines – II (MR)',           desc: 'Heat exchangers, purifiers & clarifiers, marine governors & actuators, bow thrusters, propeller & shafting, stern tube & bearings, ship piping systems, incinerators, exhaust gas scrubbers' },
      { icon: '⚡', id: 'bt_metec3',     title: 'Marine Electro Technology – III (MR)',         desc: 'Ship electrical power plant, switchboard & distribution, generator paralleling, protection devices, motor control (DOL, star-delta, VFD), emergency power, high voltage systems, electrical surveys' },
      { icon: '🔥', id: 'bt_boilers',    title: 'Marine Boilers (MR)',                          desc: 'Steam generation, fire-tube & water-tube boilers, boiler mountings & accessories, boiler water treatment, combustion, boiler operation & safety, maintenance, inert gas systems' },
      { icon: '✏️', id: 'bt_medraw',     title: 'Marine Engineering Drawing (MR)',              desc: 'Drawing standards, engine component drawing, valve drawings, piping diagrams & schematics, boiler & heat exchanger drawings, pump drawings, CAD application' },
      { icon: '🌍', id: 'bt_imo',        title: 'IMO & Conventions (MR)',                       desc: 'IMO structure, SOLAS convention, MARPOL Annex I-VI, STCW convention, MLC 2006, ISPS code, ISM code, ballast water management convention, anti-fouling convention, ship recycling' },
    ],
    'Semester 7 — Practical Training': [
      { icon: '🔧', id: 'bt_shipyard',   title: 'Workshop/Ship In-Campus/Shipyard Training (MR)', desc: 'Shipyard familiarization, hull repair & maintenance, pipe fitting & fabrication, valve overhaul, machinery alignment, welding practice, dry docking procedures, ship repair planning' },
      { icon: '🚢', id: 'bt_ers',        title: 'Engine Room Simulator Training (MR)',          desc: 'Plant familiarization, main engine operation, auxiliary systems operation, generator operations (paralleling, load sharing), emergency scenarios (blackout, fire, flooding), watch-keeping, bunkering simulation' },
    ],
    'Semester 8 — Final Year': [
      { icon: '🛡️', id: 'bt_shipsafety', title: 'Ship Safety & Environment Protection (MR)',  desc: 'SOLAS requirements, MARPOL compliance, shipboard safety management, pollution prevention, ballast water management, emission control (SOx, NOx, CII/EEXI), environmental auditing' },
      { icon: '🎛️', id: 'bt_automation', title: 'Marine Automation & Control (MR)',             desc: 'Control system fundamentals, P/PI/PD/PID controllers, stability analysis, marine instrumentation, pneumatic & hydraulic control, UMS concept, PLC & SCADA, alarm & monitoring systems' },
      { icon: '📊', id: 'bt_management', title: 'Principle of Management (MR)',                 desc: 'Management principles, planning & organizing, leadership & motivation, HR management, financial management, quality management, project management, maritime business operations' },
      { icon: '⚙️', id: 'bt_machsysdesign', title: 'Marine Machinery System & Design (MR)',   desc: 'Propulsion system design, shafting & transmission, propeller theory & design, reduction gearbox, ship resistance, power plant selection, machinery arrangement, vibration analysis for marine systems' },
      { icon: '📝', id: 'bt_project',    title: 'Project Work & Seminar (MR)',                  desc: 'Research methodology, literature review, project execution (marine engine optimization, alternative fuels, CFD analysis, emission reduction, automation, energy efficiency), report writing, presentation' },
      { icon: '📜', id: 'bt_shipopslog', title: 'Ship Operation & Logistics (MR)',              desc: 'Maritime law, ISM/ISPS implementation, MLC 2006, cargo operations, bunkering, planned maintenance system, commercial operations (charter parties, freight), dry dock management, port state control' },
      { icon: '📡', id: 'bt_advelectronics', title: 'Advanced Electronics & Communications (MR)', desc: 'Power electronics (thyristors, IGBT), rectifiers & inverters, VFD, shaft generators, dynamic positioning, electric propulsion systems, GMDSS advanced, condition monitoring' },
      { icon: '⛽', id: 'bt_altfuels',   title: 'Latest Marine Engines & Alternative Fuels (MR)', desc: 'Modern electronically controlled engines (MAN ME, Wärtsilä X), LNG dual-fuel, methanol, ammonia, hydrogen fuel cells, battery-hybrid systems, wind-assisted propulsion, IMO decarbonisation targets' },
    ],
  }
};

/* ── Knowledge base entries for B.Tech topics ── */
Object.assign(TOPIC_KNOWLEDGE, {

bt_maths1: {
  formulas: [
    { label: 'Taylor Series',      eq: 'f(x) = f(a) + f\'(a)(x-a) + f\'\'(a)(x-a)²/2! + …', note: 'Used in numerical methods and linearisation of non-linear engine parameters. Source: Engineering Maths — B.S. Grewal' },
    { label: 'Integration by Parts', eq: '∫u·dv = u·v − ∫v·du', note: 'Applied to work done by varying forces in thermodynamic cycles' },
    { label: 'Partial Differentiation', eq: 'dz = (∂z/∂x)dx + (∂z/∂y)dy', note: 'Used in thermodynamic relationships — Maxwell equations, Clausius-Clapeyron' },
  ],
  videos: [
    { title: 'Engineering Maths for Marine Engineers', channel: 'Dr Naresh Dagadkhair', url: 'https://www.youtube.com/results?search_query=engineering+mathematics+marine+engineering+sem1' },
  ],
  flashcards: [
    { q: 'What is the physical meaning of a derivative in marine engineering context?', a: 'A derivative represents the rate of change. In marine engineering: dP/dt = rate of pressure change in a cylinder (important for indicator diagrams); dT/dt = rate of temperature change (heat transfer); dN/dt = rate of speed change (governor response). Understanding derivatives helps interpret performance monitoring trends.' },
    { q: 'How is integration applied to thermodynamic work calculations?', a: 'Work done by a gas in a piston-cylinder: W = ∫P·dV (area under P-V curve on indicator diagram). For a polytropic process PVⁿ = C: W = (P₁V₁ - P₂V₂)/(n-1). This is exactly what the indicator diagram area represents — the actual work output per cycle. Source: Engineering Thermodynamics — Rogers & Mayhew.' },
  ]
},

bt_physics: {
  formulas: [
    { label: 'Heat Transfer — Conduction', eq: 'Q = kA(T₁-T₂)/L  (Fourier\'s Law)', note: 'k = thermal conductivity (W/mK). Applied to boiler tube walls, heat exchangers, cylinder liners. Source: Engineering Physics — R.K. Rajput' },
    { label: 'Thermal Expansion',          eq: 'ΔL = L₀·α·ΔT', note: 'α = coefficient of linear expansion. Critical for clearances in pistons, bearings, shafting at operating temperature vs cold.' },
  ],
  videos: [
    { title: 'Engineering Physics — Heat & Thermodynamics', channel: 'NPTEL', url: 'https://www.youtube.com/results?search_query=NPTEL+engineering+physics+heat+thermodynamics' },
  ],
  flashcards: [
    { q: 'Why is thermal expansion important for marine engine clearances?', a: 'Engine components expand significantly when hot. Piston-to-liner clearance (cold): ~0.3–0.6mm. If clearance is too small when cold, the piston seizes when hot. If too large, blow-by occurs. Piston crowns run at 300–400°C, liners at 150–200°C. Correct cold clearances are specified in maker\'s manual and must be verified during overhaul.' },
  ]
},

bt_chem: {
  formulas: [
    { label: 'Corrosion Rate',   eq: 'CR (mm/year) = (Weight loss × K) / (Density × Area × Time)', note: 'K = 8.76×10⁴ for mm/year. Marine structures corrode 0.1–0.3 mm/year — requires cathodic protection or coatings.' },
    { label: 'pH Scale',         eq: 'pH = -log₁₀[H⁺] | pH 7 neutral | >7 alkaline | <7 acidic', note: 'Boiler water: pH 10.5–11.5 (alkaline) prevents corrosion. Cylinder liner wash water: slightly alkaline to neutralise acid from combustion.' },
  ],
  videos: [
    { title: 'Corrosion in Marine Structures', channel: 'Corrosion Doctors', url: 'https://www.youtube.com/results?search_query=marine+corrosion+types+prevention+galvanic' },
  ],
  flashcards: [
    { q: 'What is galvanic corrosion and how is it prevented on ships?', a: 'Galvanic corrosion occurs when two dissimilar metals are in electrical contact in an electrolyte (seawater). Less noble metal (anode) corrodes: Zinc → Iron → Copper → Gold (galvanic series). Prevention: 1) Use same metals together. 2) Isolating flanges/sleeves. 3) Sacrificial anodes (zinc/aluminium) — more active metal corrodes instead. 4) Impressed current cathodic protection (ICCP) on hull. Source: Engineering Chemistry — Jain & Jain.' },
  ]
},

bt_thermo1: {
  formulas: [
    { label: 'First Law (Closed System)', eq: 'Q - W = ΔU  (kJ) | Q = heat added | W = work done | ΔU = internal energy change', note: 'Foundation of all power plant analysis. Source: Engineering Thermodynamics — Rogers & Mayhew' },
    { label: 'Carnot Efficiency',         eq: 'η_Carnot = 1 - T_L/T_H  (temperatures in Kelvin)', note: 'Maximum possible efficiency. Diesel engine: T_H ≈ 1800K, T_L ≈ 400K → η = 78%. Actual only 50–54% due to irreversibilities.' },
    { label: 'Clausius Inequality',       eq: '∮(δQ/T) ≤ 0  | = 0 reversible | < 0 irreversible', note: 'Basis of entropy — entropy always increases in real processes. Used to evaluate refrigeration cycle efficiency.' },
  ],
  videos: [
    { title: 'Laws of Thermodynamics — Full Lecture', channel: 'NPTEL IIT Bombay', url: 'https://www.youtube.com/results?search_query=NPTEL+engineering+thermodynamics+laws+cycles' },
  ],
  flashcards: [
    { q: 'State and apply the First Law of Thermodynamics to a marine diesel engine cylinder.', a: 'First Law: Q - W = ΔU. For one engine cycle (closed system — gas in cylinder): Q_in (from combustion) - W_out (piston work) = ΔU (change in internal energy of gas). On a per-unit-mass basis: q - w = Δu. In marine context: heat released by fuel = work to piston + heat rejected (to cooling water + exhaust). Only ~50% of fuel heat becomes shaft work; rest is rejected. Source: Rogers & Mayhew, Engineering Thermodynamics 4th Ed.' },
  ]
},

bt_fluid1: {
  formulas: [
    { label: 'Bernoulli Equation', eq: 'P/ρg + v²/2g + z = constant  (along a streamline)', note: 'Applied to venturi meters, orifice plates, pitot tubes on ships. Source: Fluid Mechanics — R.K. Bansal' },
    { label: 'Continuity Equation', eq: 'A₁v₁ = A₂v₂  (incompressible flow)', note: 'Flow rate Q = Av is constant. Used for pipe sizing and pump selection.' },
    { label: 'Reynolds Number',    eq: 'Re = ρvD/μ = vD/ν | Re < 2000: laminar | Re > 4000: turbulent', note: 'Turbulent flow gives better heat transfer in coolers but higher pipe friction losses.' },
  ],
  videos: [
    { title: 'Bernoulli Equation — Applications', channel: 'The Engineering Mindset', url: 'https://www.youtube.com/results?search_query=bernoulli+equation+applications+engineering' },
  ],
  flashcards: [
    { q: 'How is Bernoulli\'s equation applied to a venturi meter on a ship?', a: 'Venturi meter uses Bernoulli to measure flow. As fluid enters the narrow throat, velocity increases and pressure drops. Flow rate: Q = Cd × A₂ × √(2g×Δh / (1-(D₂/D₁)⁴)). On ships, venturi meters measure cooling water flow, fuel oil flow. Cd (discharge coefficient) ≈ 0.97–0.99. Source: Fluid Mechanics — R.K. Bansal Ch.6.' },
  ]
},

bt_naval1: {
  formulas: [
    { label: 'Displacement',     eq: 'Δ = ρ × ∇  (tonnes) | ∇ = volume of displacement (m³)', note: 'Seawater density ρ = 1.025 t/m³. Freshwater ρ = 1.000 t/m³.' },
    { label: 'Block Coefficient', eq: 'Cb = ∇ / (L × B × T) | Tankers: 0.80–0.85 | Container: 0.60–0.65', note: 'Higher Cb = fuller hull = more cargo but more resistance. Source: D.J.Eyres Ship Stability Ch.1' },
    { label: 'TPC',              eq: 'TPC = Aw × ρ / 100  (tonnes per cm immersion)', note: 'Aw = waterplane area in m². Used to calculate sinkage when loading/discharging cargo.' },
  ],
  videos: [
    { title: 'Naval Architecture Basics — Ship Terminology', channel: 'Reeds Maritime Academy', url: 'https://www.youtube.com/results?search_query=naval+architecture+basics+ship+stability+beginners' },
  ],
  flashcards: [
    { q: 'What is block coefficient (Cb) and why does it matter for ship design?', a: 'Cb = volume of displacement / (L × B × T). Represents how "block-like" the hull is. High Cb (tankers ~0.85): more cargo capacity but high resistance, lower speed. Low Cb (container ships ~0.60): faster but less capacity per metre. Ship designers balance Cb against speed requirements and fuel economy. Source: D.J.Eyres, Ship Stability for Masters & Mates 6th Ed.' },
  ]
},

bt_diesel1: {
  formulas: [
    { label: '2-Stroke IHP',    eq: 'IHP = (Pm × L × A × N) / 60,000  kW | N = RPM (every rev is a power stroke)', note: 'Source: Reed\'s Vol.1 Ch.8' },
    { label: '4-Stroke IHP',    eq: 'IHP = (Pm × L × A × N/2) / 60,000  kW | N/2 because power stroke every 2 revs', note: 'Divide by 2 for 4-stroke — common exam mistake.' },
    { label: 'Compression Ratio', eq: 'r = (V_clearance + V_swept) / V_clearance | Diesel: 14–22:1', note: 'Higher compression → higher Pmax → better efficiency. Diesel needs ≥14:1 for reliable auto-ignition.' },
  ],
  videos: [
    { title: '2-Stroke vs 4-Stroke Marine Diesel Explained', channel: 'Dieselpro', url: 'https://www.youtube.com/results?search_query=2+stroke+vs+4+stroke+marine+diesel+engine+explained' },
  ],
  flashcards: [
    { q: 'Explain why a 2-stroke diesel engine fires every revolution but a 4-stroke fires every other revolution.', a: '2-stroke: One cycle (induction → compression → power → exhaust) is completed in ONE revolution (360°). Scavenging (gas exchange) happens at BDC using ports and blower — no separate induction or exhaust strokes needed. 4-stroke: Four distinct strokes over TWO revolutions (720°): 1) Induction, 2) Compression, 3) Power, 4) Exhaust. Each stroke = 180°. Benefit of 2-stroke: theoretically twice the power for same cylinder — hence used in large slow-speed main engines. Source: Reed\'s Vol.1 Marine Diesel Engines.' },
  ]
},

bt_elec2: {
  formulas: [
    { label: 'Synchronous Speed',  eq: 'Ns = (120 × f) / P  RPM | f = frequency (Hz) | P = number of poles', note: '4-pole, 60Hz: Ns = 1800 RPM. 4-pole, 50Hz: Ns = 1500 RPM. Source: Reed\'s Vol.4 Electrotechnology' },
    { label: 'Three-Phase Power',  eq: 'P = √3 × VL × IL × cos φ  (watts) | VL = line voltage | IL = line current', note: 'Ships use 440V or 690V three-phase. cos φ (power factor) typically 0.8–0.9 for ship loads.' },
    { label: 'Transformer EMF',    eq: 'V₁/V₂ = N₁/N₂ = I₂/I₁', note: 'Turns ratio determines voltage transformation. Auto-transformers used for motor starting on small ships.' },
  ],
  videos: [
    { title: 'Marine Electrical Systems — 3-Phase Generation', channel: 'Marine Electrical Academy', url: 'https://www.youtube.com/results?search_query=marine+electrical+three+phase+generator+ship' },
  ],
  flashcards: [
    { q: 'Why do ships use three-phase AC power rather than single-phase or DC?', a: '3-phase AC advantages: 1) Constant power delivery (no pulsation unlike single-phase). 2) More efficient motor starting (self-rotating field). 3) Transmission is more economical (3 wires for 3× power of single-phase). 4) 3-phase induction motors are simpler (no brushes). 5) Can derive single-phase from 3-phase for lighting. Most ship generators: 440V or 690V, 60Hz or 50Hz, 3-phase, 4-wire. Source: Reed\'s Vol.4 Ch.3.' },
  ]
},

bt_control: {
  formulas: [
    { label: 'PID Controller',   eq: 'u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt', note: 'Kp = proportional | Ki = integral | Kd = derivative gain. Used in governor, temperature, pressure controllers.' },
    { label: 'Transfer Function', eq: 'G(s) = Output(s)/Input(s)  (Laplace domain)', note: 'Used to analyse control loop stability. Stability: all poles in left-half s-plane.' },
  ],
  videos: [
    { title: 'Marine Automation Systems — UMS Operation', channel: 'Marine Automation', url: 'https://www.youtube.com/results?search_query=marine+automation+UMS+unmanned+machinery+space' },
  ],
  flashcards: [
    { q: 'What does UMS (Unmanned Machinery Space) mean and what systems make it possible?', a: 'UMS means the engine room operates unattended at night (typically 2200–0600). Systems required: 1) Automated alarm system — all critical parameters monitored with alarms to officer\'s cabin. 2) Automatic slowdown/shutdown for critical faults. 3) Remote-start emergency fire pump. 4) Automatic bilge alarm. 5) CO₂ system with 20-second delay warning before release. Class society rules (Lloyd\'s, DNV, BV) define UMS requirements. SOLAS Ch.II-1 Part E covers periodically unattended machinery spaces.' },
  ]
},

bt_mep: {
  formulas: [
    { label: 'MARPOL Annex I Limit', eq: 'OWS discharge ≤ 15 ppm | Special Areas ≤ 0 ppm | ORB retention: 3 years', note: 'MARPOL 73/78 Annex I Reg.14. ORB = Oil Record Book. Source: IMO MARPOL Consolidated 2021' },
    { label: 'SOx Emission Limit',   eq: 'Fuel sulphur ≤ 0.50% m/m global (2020) | ≤ 0.10% m/m in ECAs', note: 'MARPOL Annex VI Reg.14. Compliance: VLSFO, scrubber (EGC), or LNG fuel.' },
    { label: 'CII Formula',          eq: 'CII = (FC × CF) / (Capacity × Distance)  gCO₂/(capacity·nm)', note: 'FC = fuel consumption. CF = 3.114 for HFO. Rated A–E annually. Source: IMO MEPC.339(76).' },
  ],
  videos: [
    { title: 'MARPOL Annexes Explained — All 6', channel: 'Maritime Training', url: 'https://www.youtube.com/results?search_query=MARPOL+all+6+annexes+explained+marine+engineering' },
    { title: 'ISM Code — 12 Elements Explained', channel: 'Chief Engineer Academy', url: 'https://www.youtube.com/results?search_query=ISM+code+12+elements+explained+ship' },
  ],
  flashcards: [
    { q: 'What are the 6 MARPOL Annexes and what does each cover?', a: 'Annex I: Oil (≤15ppm OWS). Annex II: Noxious Liquid Substances in bulk (chemical tankers). Annex III: Harmful Substances in Packaged Form (cargo containers). Annex IV: Sewage (≥3nm from land with approved treatment plant). Annex V: Garbage (plastics NEVER overboard). Annex VI: Air Pollution (SOx, NOx, ODS, VOC, energy efficiency — CII, EEXI). Source: IMO MARPOL Consolidated Edition 2021.' },
    { q: 'Name the 12 elements of the ISM Code.', a: '1.General, 2.Safety & Environmental Policy, 3.Company Responsibilities & Authority, 4.Designated Person Ashore (DPA), 5.Master\'s Responsibility & Authority, 6.Resources & Personnel, 7.Development of Plans for Shipboard Operations, 8.Emergency Preparedness, 9.Reports & Analysis of Non-Conformities, Accidents & Hazardous Occurrences, 10.Maintenance of Ship & Equipment, 11.Documentation, 12.Company Verification, Review & Evaluation. Source: ISM Code — IMO Resolution A.741(18).' },
  ]
},

bt_env: {
  formulas: [
    { label: 'EEXI',  eq: 'EEXI = (P_ME × CF_ME × SFC_ME) / (fi × Capacity × Vref)  gCO₂/(t·nm)', note: 'fi = correction factor. Required EEXI must be < Reference line value. In force 1 Jan 2023. Source: MEPC.355(78)' },
    { label: 'CII',   eq: 'Annual CII = Total CO₂ (tonnes) / (DWT × nm sailed) × 10⁶  gCO₂/(DWT·nm)', note: 'A=excellent, B=minor superior, C=moderate, D=minor inferior, E=inferior. D for 3yr or E for 1yr → corrective action plan.' },
    { label: 'Carbon Intensity Factors', eq: 'HFO: 3.114 | LNG: 2.750 | Methanol: 1.375 | Ammonia: 0 (direct) | H₂: 0  g CO₂/g fuel', note: 'Source: IMO MEPC.364(79). Well-to-wake values differ — LNG may have methane slip.' },
  ],
  videos: [
    { title: 'CII Rating Explained — Carbon Intensity Indicator', channel: 'DNV Maritime', url: 'https://www.youtube.com/results?search_query=CII+carbon+intensity+indicator+ship+explained' },
    { title: 'Alternative Fuels for Ships — LNG Methanol Ammonia', channel: 'Lloyd\'s Register', url: 'https://www.youtube.com/results?search_query=alternative+fuels+LNG+methanol+ammonia+shipping' },
  ],
  flashcards: [
    { q: 'What is EEXI and when did it come into force?', a: 'EEXI (Energy Efficiency Existing Ship Index) is a one-time technical measure for existing ships ≥400 GT. It sets a required energy efficiency level based on ship type and size. Ships must achieve EEXI ≤ required value (typically 80–100% of reference line). Came into force 1 January 2023. Compliance methods: Engine Power Limitation (EPL/SHaPoLi), shaft generator removal, technical upgrades. Source: IMO MEPC.355(78).' },
    { q: 'Compare LNG, methanol and ammonia as future marine fuels.', a: 'LNG: well-proven, 20–25% CO₂ reduction, requires cryogenic storage (-163°C), methane slip issue, IGF Code compliance. Methanol: liquid at ambient temp (easier storage), ~10% CO₂ reduction (grey), near-zero if green, toxic, lower energy density. Ammonia: zero carbon if green, toxic (TLV 25ppm), no carbon in combustion, NOx challenge, requires IGC Code modifications. All require new bunkering infrastructure. Source: IMO, DNV Alternative Fuels Insight 2024.' },
  ]
},

bt_project: {
  formulas: [
    { label: 'Research Methodology', eq: 'Problem Statement → Literature Review → Hypothesis → Methodology → Results → Analysis → Conclusion', note: 'Standard academic research structure. Ganpat University project guidelines.' },
  ],
  videos: [
    { title: 'How to Write a Marine Engineering Research Paper', channel: 'Research Methods', url: 'https://www.youtube.com/results?search_query=marine+engineering+research+project+dissertation+writing' },
  ],
  flashcards: [
    { q: 'What makes a good B.Tech marine engineering research project topic?', a: 'Good topics: 1) Current industry problem (CII compliance, alternative fuels, predictive maintenance). 2) Measurable outcome (fuel savings %, emission reduction). 3) Practical shipboard relevance. 4) Available data/literature. Examples: "Analysis of SFOC improvement through turbocharger cleaning frequency optimisation", "Comparative study of LNG vs methanol for a Panamax bulk carrier", "Condition-based maintenance vs time-based maintenance for centrifugal pumps". Must have original analysis, not just a literature review.' },
  ]
},

});

/* ── TOPIC_META for B.Tech topics (Ganpat University — Official Website) ── */
Object.assign(TOPIC_META, {
  // Semester 1
  bt_maths1:     { diff:'Medium', time:45, paper:'Sem 1' },
  bt_physics:    { diff:'Medium', time:40, paper:'Sem 1' },
  bt_commskills: { diff:'Easy',   time:25, paper:'Sem 1' },
  bt_draw:       { diff:'Easy',   time:30, paper:'Sem 1' },
  bt_workshop1:  { diff:'Easy',   time:25, paper:'Sem 1 Practical' },
  bt_civil:      { diff:'Medium', time:35, paper:'Sem 1' },
  // Semester 2
  bt_maths2:     { diff:'Hard',   time:50, paper:'Sem 2' },
  bt_elec1:      { diff:'Medium', time:40, paper:'Sem 2' },
  bt_prog:       { diff:'Medium', time:35, paper:'Sem 2' },
  bt_mechengg:   { diff:'Medium', time:40, paper:'Sem 2' },
  bt_mech:       { diff:'Medium', time:40, paper:'Sem 2' },
  bt_cad:        { diff:'Easy',   time:30, paper:'Sem 2 Practical' },
  bt_workshop2:  { diff:'Easy',   time:25, paper:'Sem 2 Practical' },
  bt_seamanship: { diff:'Medium', time:35, paper:'Sem 2' },
  // Semester 3
  bt_shipconstruct:{ diff:'Hard', time:50, paper:'Sem 3' },
  bt_thermo2:    { diff:'Hard',   time:55, paper:'Sem 3' },
  bt_metec1:     { diff:'Medium', time:45, paper:'Sem 3' },
  bt_strength:   { diff:'Hard',   time:50, paper:'Sem 3' },
  bt_diesel1:    { diff:'Hard',   time:60, paper:'Sem 3' },
  bt_gp1:        { diff:'Easy',   time:25, paper:'Sem 3 Practical' },
  // Semester 4
  bt_metec2:     { diff:'Hard',   time:50, paper:'Sem 4' },
  bt_basicelec:  { diff:'Medium', time:40, paper:'Sem 4' },
  bt_materials:  { diff:'Medium', time:35, paper:'Sem 4' },
  bt_mathsmarine:{ diff:'Hard',   time:50, paper:'Sem 4' },
  bt_tom:        { diff:'Hard',   time:50, paper:'Sem 4' },
  bt_fluid1:     { diff:'Hard',   time:45, paper:'Sem 4' },
  bt_aux:        { diff:'Medium', time:45, paper:'Sem 4' },
  bt_gp2:        { diff:'Easy',   time:25, paper:'Sem 4 Practical' },
  // Semester 5
  bt_firecontrol:{ diff:'Medium', time:40, paper:'Sem 5' },
  bt_machdesign: { diff:'Hard',   time:55, paper:'Sem 5' },
  bt_diesel2:    { diff:'Hard',   time:60, paper:'Sem 5' },
  bt_vibration:  { diff:'Hard',   time:50, paper:'Sem 5' },
  bt_naval1:     { diff:'Medium', time:40, paper:'Sem 5' },
  bt_electronics:{ diff:'Hard',   time:50, paper:'Sem 5' },
  bt_gp3:        { diff:'Easy',   time:25, paper:'Sem 5 Practical' },
  // Semester 6
  bt_refrig:     { diff:'Hard',   time:50, paper:'Sem 6' },
  bt_aux2:       { diff:'Medium', time:45, paper:'Sem 6' },
  bt_metec3:     { diff:'Hard',   time:50, paper:'Sem 6' },
  bt_boilers:    { diff:'Hard',   time:55, paper:'Sem 6' },
  bt_medraw:     { diff:'Easy',   time:30, paper:'Sem 6 Practical' },
  bt_imo:        { diff:'Medium', time:40, paper:'Sem 6' },
  // Semester 7
  bt_shipyard:   { diff:'Medium', time:40, paper:'Sem 7 Practical' },
  bt_ers:        { diff:'Medium', time:40, paper:'Sem 7 Practical' },
  // Semester 8
  bt_shipsafety: { diff:'Medium', time:45, paper:'Sem 8' },
  bt_automation: { diff:'Hard',   time:55, paper:'Sem 8' },
  bt_management: { diff:'Easy',   time:30, paper:'Sem 8' },
  bt_machsysdesign:{ diff:'Hard', time:55, paper:'Sem 8' },
  bt_project:    { diff:'Hard',   time:120,paper:'Sem 8 Project' },
  bt_shipopslog: { diff:'Medium', time:40, paper:'Sem 8' },
  bt_advelectronics:{ diff:'Hard',time:50, paper:'Sem 8' },
  bt_altfuels:   { diff:'Medium', time:45, paper:'Sem 8' },
});

/* ── Inject B.Tech into CAREER_LEVELS ── */
(function injectBTech() {
  // Only inject if not already there
  if (CAREER_LEVELS.find(l => l.id === 'btech')) return;
  // Add as second item (after cadet, before class4)
  CAREER_LEVELS.splice(1, 0, BTECH_SYLLABUS);
})();

/* ── Rebuild home rank grid after injection ── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (typeof buildRankGrid === 'function') buildRankGrid();
    if (typeof upgradeRankCards === 'function') upgradeRankCards();
  }, 100);
});

/* ══════════════════════════════════════════════════════════════
   3. ENHANCED TOPBAR — icon-only buttons with tooltips on mobile
   ══════════════════════════════════════════════════════════════ */
(function upgradeTopbar() {
  // Add btn labels as data attrs for tooltip-only mode
  document.querySelectorAll('.tbtn').forEach(btn => {
    const text = btn.textContent.trim();
    btn.title = btn.title || text;
    // Wrap text nodes in a span for show/hide
    btn.childNodes.forEach(n => {
      if (n.nodeType === 3 && n.textContent.trim()) {
        const sp = document.createElement('span');
        sp.className = 'tbtn-label';
        sp.textContent = n.textContent;
        btn.replaceChild(sp, n);
      }
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   4. FLOATING ACTION BUTTON (mobile quick-ask)
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const fab = document.createElement('button');
  fab.id        = 'fabAsk';
  fab.innerHTML = '🤖';
  fab.title     = 'Quick AI Ask';
  fab.style.cssText = `
    position:fixed; bottom:72px; right:18px; z-index:150;
    width:52px; height:52px; border-radius:50%;
    background:linear-gradient(135deg,#d4a017,#a07810);
    border:none; font-size:1.4rem; cursor:pointer; display:none;
    box-shadow:0 4px 20px rgba(212,160,23,0.4);
    align-items:center; justify-content:center;
    transition:all 0.2s; color:#020810;
  `;
  fab.addEventListener('click', () => {
    const inp = document.getElementById('searchInput');
    if (inp) {
      inp.scrollIntoView({ behavior:'smooth', block:'center' });
      setTimeout(() => inp.focus(), 400);
    }
  });
  document.body.appendChild(fab);

  // Show FAB only on mobile when in level page
  function updateFab() {
    const isMobile  = window.innerWidth <= 768;
    const inLevel   = APP.currentLevel !== null;
    fab.style.display = (isMobile && inLevel) ? 'flex' : 'none';
  }

  // Override enterLevel and goHome to update fab
  const _el = enterLevel;
  enterLevel = function(id) { _el(id); updateFab(); };
  const _gh  = goHome;
  goHome     = function()   { _gh();  updateFab(); };

  window.addEventListener('resize', updateFab, { passive:true });
  updateFab();
});

/* ══════════════════════════════════════════════════════════════
   5. IMPROVED HOME HERO TEXT
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.home-title');
  if (title) {
    title.innerHTML = 'The Complete<br/><em>Marine Engineering</em><br/>Study Platform';
  }
  const sub = document.querySelector('.home-sub');
  if (sub) {
    sub.textContent = 'B.Tech Marine Engineering · Engine Cadet · MEO Class IV → Chief Engineer — every semester, every exam, every oral question. Free with Gemini AI.';
  }
  // Update info card for BTech
  const infoCards = document.querySelectorAll('.info-card');
  if (infoCards[0]) {
    infoCards[0].querySelector('.ic-title').textContent = '6 Study Paths';
    infoCards[0].querySelector('.ic-text').textContent  = 'B.Tech 4-Year Degree + Engine Cadet + MEO Class IV + Class II/I + Chief Engineer — complete coverage from Year 1 to senior rank.';
  }
});



/* ══ QUOTA FIX v2 ══ */
/* ═══════════════════════════════════════════════════════════════════════
   QUOTA FIX v2: Groq default + Gemini model fallbacks + error UX
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Fix Gemini to use 1.5-flash with model-level fallback chain ── */
AI_PROVIDERS.gemini.models = {
  fast: 'gemini-1.5-flash',
  bal:  'gemini-1.5-flash',
  deep: 'gemini-1.5-pro',
  live: 'gemini-1.5-flash'
};

const GEMINI_MODEL_FALLBACKS = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.0-pro',
];

/* ── Rewrite callGemini with per-model fallback ── */
callGemini = async function(q, mode, onChunk, onDone, onError) {
  const maxOut = { fast:800, bal:1600, deep:3000, live:1600 }[mode] || 1600;
  const systemPrompt = buildSystemPrompt(mode);
  const modelsToTry  = mode === 'deep'
    ? ['gemini-1.5-pro','gemini-1.5-flash']
    : GEMINI_MODEL_FALLBACKS;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${APP.apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role:'user', parts:[{ text: systemPrompt+'\n\n---\n\n'+q }] }],
          generationConfig: { maxOutputTokens: maxOut, temperature: mode==='deep'?0.3:0.5 }
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({}));
        const msg = err.error?.message || `HTTP ${res.status}`;
        if (res.status===401 || msg.includes('API_KEY_INVALID'))
          throw new Error('Invalid Gemini API key. Get a free key at aistudio.google.com');
        if (msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED') || res.status===429)
          continue; // try next model
        throw new Error(`Gemini (${model}): ${msg}`);
      }

      AI_PROVIDERS.gemini._activeModel = model;
      const reader=res.body.getReader(), decoder=new TextDecoder();
      let buf='';
      while(true){
        const {done,value}=await reader.read();
        if(done) break;
        buf+=decoder.decode(value,{stream:true});
        const lines=buf.split('\n'); buf=lines.pop();
        for(const line of lines){
          if(!line.startsWith('data:')) continue;
          const raw=line.slice(5).trim();
          try{ const j=JSON.parse(raw); const t=j.candidates?.[0]?.content?.parts?.[0]?.text||''; if(t) onChunk(t); }catch{}
        }
      }
      onDone(); return;
    } catch(e) {
      if(e.message.includes('quota')||e.message.includes('RESOURCE_EXHAUSTED')) continue;
      onError(e); return;
    }
  }

  onError(new Error(
    'Gemini quota exhausted on all models for today.\n\n' +
    '✅ Fix: Switch to Groq — it\'s free with no account-level quota.\n' +
    'Get a key at console.groq.com (takes 30 seconds)'
  ));
};

/* ── Override doAsk for better quota error UX ── */
const _doAsk_qf = doAsk;
doAsk = async function() {
  const q = document.getElementById('searchInput')?.value?.trim();
  if (!q) return;
  if (!APP.apiKey) { openApiModal(); return; }

  APP.lastQuery = q;
  const mode = APP.currentModel;

  hideEl('answerCard'); hideEl('errorEl'); showEl('thinkingEl');
  const btn = document.getElementById('askBtn');
  if (btn) { btn.disabled=true; btn.textContent='THINKING…'; }
  document.getElementById('thinkStage').textContent = 'Consulting knowledge base…';
  document.getElementById('thinkDetail').textContent = mode==='deep' ? 'Deep mode — 8–15 seconds' : '';

  const t0 = Date.now();
  APP.timerIv = setInterval(()=>{
    const el=document.getElementById('thinkTimer');
    if(el) el.textContent=((Date.now()-t0)/1000).toFixed(1)+'s';
  },100);

  try {
    if (mode==='live') await askLive(q,t0);
    else await askStream(q,mode,t0);
    if (APP.currentTopic) markStudied(APP.currentTopic);
    APP.stats.aiAsked=(APP.stats.aiAsked||0)+1;
    try{ localStorage.setItem('miq_stats',JSON.stringify(APP.stats)); }catch(e){}
  } catch(e) {
    clearTimer(); hideEl('thinkingEl');
    const errMsg = document.getElementById('errorMsg');
    const errEl  = document.getElementById('errorEl');
    if (errMsg) errMsg.innerHTML = esc(e.message).replace(/\n/g,'<br>');

    const isQuota = /quota|exceeded|rate.?limit|RESOURCE_EXHAUSTED/i.test(e.message);
    if (errEl && isQuota) {
      const old = errEl.querySelector('.quota-fix-btns');
      if (old) old.remove();
      const div = document.createElement('div');
      div.className = 'quota-fix-btns';
      div.style.cssText = 'margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;';
      div.innerHTML = `
        <button onclick="openApiModal()" style="padding:8px 14px;border-radius:8px;border:1px solid rgba(52,211,153,0.4);background:rgba(52,211,153,0.08);color:#34d399;cursor:pointer;font-size:0.78rem;font-weight:600;">
          🔄 Switch to Groq (Free)
        </button>
        <a href="https://console.groq.com" target="_blank" style="padding:8px 14px;border-radius:8px;border:1px solid rgba(96,165,250,0.4);background:rgba(96,165,250,0.08);color:#60a5fa;font-size:0.78rem;font-weight:600;text-decoration:none;display:flex;align-items:center;">
          Get Groq Key →
        </a>`;
      errEl.appendChild(div);
    }
    showEl('errorEl');
  }
  if (btn) { btn.disabled=false; btn.textContent='ASK AI →'; }
};





/* ══════════════════════════════════════════════════════════════
   UX FIX PATCH — Clean user interactions
   ══════════════════════════════════════════════════════════════ */

/* ── Fix 3: Add "ASK THIS" hint when search is pre-filled by topic select ── */
(function addAskHintStyle() {
  const s = document.createElement('style');
  s.textContent = `
/* Subtle pulse on pre-filled search input to hint user can edit + ask */
.search-input[data-suggested="1"] {
  border-color: rgba(212,160,23,0.4) !important;
  box-shadow: 0 0 0 3px rgba(212,160,23,0.08) !important;
}
/* Ask button pulse animation when question is ready */
@keyframes askPulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(212,160,23,0.4); }
  50%      { box-shadow: 0 0 0 6px rgba(212,160,23,0); }
}
.ask-btn.suggest-ready {
  animation: askPulse 1.8s ease 3;
}
/* Topic zone intro card — shows before any AI ask */
.tz-intro-card {
  background: var(--bg2); border: 1px solid var(--b1);
  border-radius: 12px; padding: 14px 16px; margin-bottom: 14px;
  display: flex; align-items: flex-start; gap: 12px;
}
.tz-intro-icon { font-size: 1.8rem; flex-shrink:0; }
.tz-intro-body { flex:1; }
.tz-intro-title { font-size: 0.9rem; font-weight: 700; color: var(--tx); margin-bottom: 4px; }
.tz-intro-desc  { font-size: 0.78rem; color: var(--tx2); line-height: 1.6; }
.tz-intro-hint  {
  margin-top: 10px; font-size: 0.72rem; color: var(--tx3);
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
}
.tz-intro-hint kbd {
  background: var(--bg3); border: 1px solid var(--b1); border-radius: 5px;
  padding: 2px 7px; font-size: 0.65rem; color: var(--tx2);
  font-family: 'JetBrains Mono', monospace;
}
  `;
  document.head.appendChild(s);
})();

/* ── Fix 4: Show topic intro card instead of blank AI panel ── */
(function patchSelectTopicForIntro() {
  const _st = selectTopic;
  selectTopic = function(topicId, title, desc, icon, sectionName) {
    _st(topicId, title, desc, icon, sectionName);

    // Clear previous answer so user sees topic content, not stale AI response
    const ansCard = document.getElementById('answerCard');
    const errEl   = document.getElementById('errorEl');
    if (ansCard) ansCard.classList.remove('show');
    if (errEl)   errEl.classList.remove('show');

    // Show intro card in answer zone above tabs
    const tz = document.getElementById('topicZone');
    if (!tz) return;
    const existingIntro = tz.querySelector('.tz-intro-card');
    if (existingIntro) existingIntro.remove();

    const meta = (typeof TOPIC_META !== 'undefined' && TOPIC_META[topicId]) || {};

    const intro = document.createElement('div');
    intro.className = 'tz-intro-card';
    intro.innerHTML = `
      <div class="tz-intro-icon">${icon}</div>
      <div class="tz-intro-body">
        <div class="tz-intro-title">${esc(title)}</div>
        <div class="tz-intro-desc">${esc(desc)}</div>
        <div class="tz-intro-hint">
          ${meta.paper ? `<span>📋 ${esc(meta.paper)}</span>` : ''}
          ${meta.time  ? `<span>⏱ ~${meta.time} min study</span>` : ''}
          <span>Use the tabs above to study, then ask AI below when ready</span>
          <kbd>Enter ↵</kbd>
        </div>
      </div>`;

    // Insert after .tz-header if it exists, else at top
    const header = tz.querySelector('.tz-header');
    if (header) header.after(intro);
    else tz.insertBefore(intro, tz.firstChild);

    // Remove intro when user starts typing or asks
    const inp = document.getElementById('searchInput');
    if (inp) {
      const removeIntro = () => { intro.style.opacity='0'; intro.style.transition='opacity 0.3s'; setTimeout(()=>intro.remove(),300); };
      inp.addEventListener('focus', removeIntro, { once: true });
    }

    // Pulse ask button to hint
    const btn = document.getElementById('askBtn');
    if (btn) {
      btn.classList.add('suggest-ready');
      setTimeout(() => btn.classList.remove('suggest-ready'), 6000);
    }

    // Remove data-suggested on input so border clears when user edits
    if (inp) {
      inp.addEventListener('input', () => inp.removeAttribute('data-suggested'), { once: true });
    }
  };
})();

/* ── Fix 5: Clear stale answer when navigating to a different level ── */
(function patchEnterLevelClear() {
  const _el = enterLevel;
  enterLevel = function(id) {
    _el(id);
    // Clear AI panel — user is in a new context
    const ansCard = document.getElementById('answerCard');
    const errEl   = document.getElementById('errorEl');
    if (ansCard) ansCard.classList.remove('show');
    if (errEl)   errEl.classList.remove('show');
    const inp = document.getElementById('searchInput');
    if (inp) { inp.value = ''; inp.removeAttribute('data-suggested'); }
  };
})();

/* ── Fix 6: Don't auto-focus search on FAB tap — scroll only ── */
/* FAB already fixed in btech_upgrade.js to scroll + focus,
   but focus is only on explicit user tap so that's acceptable */

/* ── Fix 7: Prevent double-ask if user hits Enter quickly on pre-fill ── */
(function debounceAsk() {
  let _lastAsk = 0;
  const _da = doAsk;
  doAsk = function() {
    const now = Date.now();
    if (now - _lastAsk < 800) return; // 800ms debounce
    _lastAsk = now;
    return _da.apply(this, arguments);
  };
})();

console.log('%cMarineIQ UX Fix — auto-ask removed, intro cards active', 'color:#34d399');




/* ══ AI DIAGRAM GENERATOR ══ */
/* ═══════════════════════════════════════════════════════════════════════
   AI DIAGRAM GENERATOR
   • Generates SVG diagrams on demand via AI (Groq / Gemini)
   • Dark-themed, animated, technically accurate
   • Cached in sessionStorage — never regenerates same topic twice
   • Renders inline in the existing diagrams panel
   ═══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   1. SYSTEM PROMPT — precision SVG engineering diagrams
   ══════════════════════════════════════════════════════════ */
const SVG_SYSTEM_PROMPT = `You are a technical SVG diagram generator for marine engineering education.
Generate a SINGLE valid SVG diagram of the requested system.

OUTPUT RULES — CRITICAL:
- Output ONLY the SVG element. No explanation. No markdown. No backticks. No preamble.
- First character must be < and last character must be >
- Start: <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" style="background:#030b14;font-family:monospace;display:block;width:100%">
- End: </svg>
- Include a <style> tag inside SVG for @keyframes animations
- NO external URLs. NO JavaScript. NO <script> tags. ONLY inline SVG+CSS.

VISUAL STYLE:
- Background: #030b14
- Component boxes: fill="#091629" stroke="#1a3550" rx="4"
- Primary flow lines (liquid): stroke="#60a5fa" stroke-width="2" fill="none"  
- Hot/exhaust lines: stroke="#f97316" stroke-width="2" fill="none"
- Cooling water lines: stroke="#38bdf8" stroke-width="2" fill="none"
- Steam/gas lines: stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,3" fill="none"
- Electrical connections: stroke="#facc15" stroke-width="1.5" fill="none"
- Gold highlight/accent: #d4a017
- Title bar: rect fill="#0d2038" with text fill="#e8f4ff"
- Section labels: fill="#d4a017" font-size="8" font-weight="bold"
- Value annotations: fill="#e8f4ff" font-size="9"
- Component labels: fill="#8ab4d4" font-size="9"

REQUIRED ELEMENTS:
1. Title bar at top (y=0 to y=22): system name + key spec values
2. Arrow markers: define <marker id="arr"> for flow direction arrows
3. At least ONE CSS animation: flow pulse, rotation, or blink
4. Label EVERY component and flow line
5. Show actual technical values (pressures, temps, speeds, specs)
6. Max 70 SVG elements total — clean and readable

ANIMATION TEMPLATE (copy this into your <style>):
@keyframes flowPulse{0%{stroke-dashoffset:20}100%{stroke-dashoffset:0}}
@keyframes spin{from{transform-origin:50% 50%;transform:rotate(0deg)}to{transform-origin:50% 50%;transform:rotate(360deg)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
.flow{animation:flowPulse 1.5s linear infinite;stroke-dasharray:8,4}
.spin{animation:spin 3s linear infinite}
.blink{animation:blink 2s ease infinite}

ACCURACY: Use real marine engineering values from Reed's/MAN B&W/IMO standards.`;

/* ══════════════════════════════════════════════════════════
   2. TOPIC → DIAGRAM DESCRIPTION MAPPING
   What to draw for each topic category
   ══════════════════════════════════════════════════════════ */
const DIAGRAM_PROMPTS = {
  // 2-stroke engine
  cl4_2stroke:    'MAN B&W 2-stroke slow-speed diesel engine cross-section: cylinder liner, piston, crosshead, connecting rod, crankshaft, exhaust valve, scavenge ports, turbocharger connection. Label: Pmax 150-180 bar, TDC, BDC, stroke, bore.',
  cl4_4stroke:    'Wärtsilä 4-stroke medium-speed diesel engine cross-section: cylinder head with inlet/exhaust valves, piston, connecting rod, crankshaft, camshaft, push rod, rocker arm. Label valve overlap 20-30°CA, compression ratio 14-17:1.',
  cl4_turbo:      'Exhaust gas turbocharger system: turbine side (hot exhaust gas in, gas out), compressor side (air in, charged air to intercooler), floating ring bearings, oil supply/drain. Label: boost pressure 2.0-4.5 bar, turbine speed 8000-30000 RPM, exhaust temperature 350-400°C.',
  cl4_indicator:  'Diesel engine indicator diagram (P-V diagram): compression curve, fuel injection point, maximum pressure (Pmax), expansion curve, exhaust valve opening (EVO), scavenge port opening (SPO). Label MEP area, Pmax ~150 bar, compression ratio.',
  cl4_fuelsys:    'HFO fuel oil system: double-bottom storage tank → transfer pump → settling tank → purifier → day tank → booster pump → heater (135-150°C) → viscotherm → ME fuel injection. Label pressures and temperatures.',
  cl4_lubesys:    'Main engine lubrication system: sump → main lube pump → cooler → fine filter → main bearings → crosshead (separate) → cylinder lubricator → drain back. Label pressures: 4-5 bar main, 0.6-0.8 bar cylinder lube.',
  cl4_pumps:      'Centrifugal pump cross-section: impeller, volute casing, suction eye, discharge, shaft seal, bearing housing. Show flow direction with velocity triangles. Label: impeller diameter, RPM, head (H), flow (Q), NPSH.',
  cl4_purifier:   'Alfa Laval disc centrifuge purifier: feed inlet → distributor → disc stack → clean oil outlet → sludge ejection → bowl → gravity disc. Label: bowl speed 7000 RPM, HFO temperature 95-98°C, gravity disc selection.',
  cl4_heatex:     'Plate heat exchanger (PHE): alternating hot/cold flow channels through corrugated plates, inlet/outlet ports, carrying frame, tightening bolts. Show counter-flow arrangement. Label LMTD, fouling resistance, pressure drop.',
  cl4_fwg:        'Flash-type fresh water generator: jacket water inlet (88°C) → shell side → evaporator → demister → condenser → freshwater pump → salinometer (10ppm limit) → storage. Label vacuum 0.9 bar, evaporation temperature 40-45°C.',
  cl4_aircomp:    '2-stage air compressor: L.P. cylinder → intercooler → H.P. cylinder → aftercooler → moisture separator → starting air vessel 30 bar. Label safety valve, fusible plug 121°C, non-return valve, relief valve.',
  cl4_ows:        'Oily water separator (15ppm): bilge water inlet → gravity separator → coalescer plates → polishing unit → 15ppm OCM sensor → overboard/bilge tank. Label: MARPOL Annex I, ORB Part I entry, special area 0ppm.',
  cl4_thermo:     'Diesel cycle P-V diagram and corresponding T-s diagram side by side: processes 1-2 (isentropic compression), 2-3 (constant pressure heat addition), 3-4 (isentropic expansion), 4-1 (constant volume heat rejection). Label efficiency formula η=1-(1/r^(γ-1)).',
  cl4_bernoulli:  'Venturi meter flow measurement: inlet section (D1, V1, P1) → throat (D2, V2, P2) → recovery section. Show pressure tappings and manometer. Label Bernoulli equation, continuity equation, Cd=0.97.',
  cl4_generators: 'Ship AC generator (alternator): stator windings, rotor field winding, slip rings, brushes, exciter, automatic voltage regulator (AVR), governor. Label: 440V 3-phase 60Hz, power factor 0.8.',
  cl4_motors:     '3-phase induction motor: stator, rotor (squirrel cage), air gap, terminal box, star-delta starter connections. Label Ns=120f/P, slip, torque-speed curve.',
  cl4_protection: 'Electrical protection relay scheme: generator → bus bar → overcurrent relay (50/51) → earth fault relay (64) → preferential trip → preferential load shedding sequence. Label current transformer (CT), voltage transformer (VT).',
  cl4_watch:      'Engine room watch arrangement: UMS alarm panel → duty engineer cabin → bridge telegraph → ME control console → local control stand → bilge alarm → fire detection loop.',
  // Class II/III topics
  cl3_transverse:  'Ship transverse stability diagram: waterline, centre of buoyancy (B), centre of gravity (G), metacentre (M), metacentric height GM, righting lever GZ. Show heeled ship at 15° with all points labeled. Label: GZ=GM×sinθ, stability criteria.',
  cl3_gzcurve:     'GZ righting lever curve: x-axis heel angle 0-90°, y-axis GZ (metres). Show: initial slope=GM, maximum GZ (min 0.20m at ≥30°), angle of maximum GZ, angle of vanishing stability (AVS). Shade dynamical stability areas. Label IMO A.749(18) criteria.',
  cl3_freesurface: 'Free surface effect diagram: tank with partial fill showing liquid surface shifting when ship heels. Vector diagram showing G moving to G1, virtual GM reduction. Label: GGm = ρ×i/(Δ), i = breadth³×length/12.',
  cl3_trim:        'Ship trim calculation diagram: LBP, LCF position, added weight moment, trim formula. Side view showing trimming lever, BML, change in trim. Label: trim = moment/MCT, MCT = GML×Δ/(100×L).',
  cl3_damage:      'Damage stability: intact waterplane vs damaged waterplane, lost buoyancy method, floodable length curves. Show flooding through damage opening, heeling to equilibrium. Label SOLAS subdivision requirements.',
  cl3_resistance:  'Ship resistance components: hull moving through water showing frictional resistance (skin friction), wave making resistance, viscous pressure resistance. Speed-resistance curve with humps. Label total resistance RT = RF + RW + RAir.',
  cl3_refrig:      'Marine refrigeration vapour compression cycle: P-h diagram (Mollier) showing: 1-2 compression, 2-3 condensation, 3-4 expansion, 4-1 evaporation. Label: COP = RE/W_comp, superheat 5-10°C, subcooling 3-5°C.',
  cl3_refrigsys:   'Ship refrigeration plant circuit: compressor → condenser (seawater cooled) → receiver → expansion valve → evaporator (cargo hold coils) → back to compressor. Label pressures: suction 1-3 bar, discharge 8-15 bar, refrigerant R-404A.',
  cl3_boilers:     'Scotch marine boiler cross-section: furnace, fire tubes, steam space, water space, safety valves ×2, gauge glass, feed water inlet, blowdown valve, mountings. Label: working pressure 7-17 bar, temperature 180-210°C.',
  cl3_boilerwater: 'Boiler water treatment system: feed water → deaerator → dosing pump → economiser → boiler drum. Chemical treatment points: oxygen scavenger, phosphate, pH adjustment. Label: pH 10.5-11.5, TDS <3500ppm, hardness nil.',
  cl3_steamplant:  'Steam Rankine cycle: boiler → superheater → HP turbine → LP turbine → condenser → condensate pump → feed heater → deaerator → feed pump → back to boiler. Label T-s diagram beside it.',
  cl3_perf:        'Main engine performance monitoring: specific fuel oil consumption (SFOC) curve vs load %, power curve, Pmax vs load, exhaust temperatures per cylinder, turbocharger speed. Label SFOC 155-175 g/kWh at MCR.',
  cl3_governor:    'Mechanical-hydraulic governor (Woodward type): speed sensor flyweights → pilot valve → servo motor → fuel rack. Show feedback linkage. Label: droop 3-5%, isochronous mode, hunting.',
  cl3_propeller:   'Fixed pitch propeller (FPP): blade face, blade back, leading edge, trailing edge, boss/hub, pitch angle, rake, skew. Show advance velocity (VA), rotational velocity (2πnr), resultant. Label J=VA/(nD), KT, η_prop.',
  cl3_vibration:   'Engine torsional vibration system: crankshaft as multi-mass system, natural frequency calculation, barred speed range. Show vibration amplitude vs RPM curve with resonance peak. Label critical speed, barred range.',
  cl3_altfuels:    'Alternative marine fuels comparison: side-by-side energy density bars (HFO vs LNG vs Methanol vs Ammonia vs H2), CO2 emission factors, storage requirements (cryogenic tank for LNG at -163°C). Label IMO 2030/2050 targets.',
  cl3_pms:         'Planned maintenance system (PMS) cycle: Running hours counter → maintenance due → work order → execution → parts used → history → interval reset. Show integration with class society survey intervals.',
  cl3_ndt:         'NDT methods comparison: UT (ultrasonic) probe on plate with flaw echo, MPI (magnetic particle) with cracks revealed, DPI (dye penetrant) with penetrant and developer steps, radiography X-ray setup. Label applications per method.',
  cl3_materials:   'Material selection for marine environment: corrosion rate chart (mm/year) for: mild steel, stainless 316L, copper-nickel 90/10, aluminium bronze, titanium in seawater. Label galvanic series, cathodic protection.',
  cl3_bearings:    'Main engine bearing types: white metal (Babbitt) thin shell main bearing cross-section with oil film, oil groove, clearance. Label: oil film pressure distribution, min oil film thickness 5-25μm, bearing load.',
  cl3_solas:       'SOLAS fire protection zones: ship side-view showing A-class divisions (60-min fire rating), B-class (30-min), fire detection zones, CO2 room, fire pump connections, escape routes.',
  cl3_marpol:      'MARPOL Annex I oily water system: bilge well → bilge pump → OWS (15ppm) → overboard in open sea. Special area prohibition shown. ORB Part I entries. Label: OCM sensor, 3NM from land limit.',
  cl3_annex6:      'MARPOL Annex VI compliance: SOx emissions (0.5% global, 0.1% ECA) with VLSFO vs HFO comparison, NOx Tier I/II/III limits vs RPM curve, scrubber (EGC) open/closed loop diagram. Label IMO 2020.',
  cl3_ism:         'ISM Code structure: Company (SMS, DPA) → Master (authority, responsibility) → Shore → Ship. 12 elements shown as linked boxes. Audit cycle: internal audit → company audit → flag state verification.',
  cl3_stcw:        'STCW watch schedule: 24-hour circle showing: maximum work 14h/24h, minimum rest 10h/24h, minimum rest 77h/7 days. Two-split rest periods shown. Label: BAC ≤0.05%, Manila 2010 amendment.',
  cl3_bwm:         'Ballast water management system: ballast intake → BWM treatment unit (UV or electrolysis) → ballast tanks → discharge treatment → overboard. Label D-2 standard: <10 organisms/m³ >50μm.',
  // Chief engineer
  ce_cii:          'CII (Carbon Intensity Indicator) rating system: ship annual CO2 emissions / (Capacity × Distance) = attained CII vs required CII. Rating bands A-E shown as color spectrum. EEXI, SEEMP Part III links. Label formula and year-on-year tightening.',
  ce_seemp:        'SEEMP Part III CII management cycle: measure annual CII → compare to required → A/B/C/D/E rating → if D(3yr) or E(1yr) → corrective action plan → EEXI for existing ships. Show continuous improvement loop.',
  ce_sfoc:         'Specific fuel oil consumption (SFOC) optimization map: SFOC contour curves on power (kW) vs RPM chart. Show optimal SFOC region, slow steaming zone, engine load limits. Label g/kWh values 160-210.',
  ce_futurefuels:  'Future marine fuels energy pathway: Well-to-Wake CO2 comparison for HFO, LNG (grey/green), Methanol (grey/green), Ammonia (green), Hydrogen (green). Storage density comparison. Label 2030/2050 IMO targets.',
  ce_diagnosis:    'Engine fault diagnosis flowchart: symptom (high exhaust temp) → check (T/C fouling? Fuel timing? Scavenge air?) → test (indicator card, exhaust analysis) → corrective action. Systematic fishbone diagram.',
  ce_failures:     'Main engine failure modes: bearing failure (low oil pressure), piston seizure (overheating), crankshaft deflection (misalignment), liner wear (cavitation). Show cross-section with failure point highlighted.',
  ce_overhaul:     'Piston/liner/bearing overhaul sequence: plan → permit to work → cool down (8-12hr) → open crankcase → measure before (clearances, diameters) → remove → inspect/renew → reassemble → pressure test → trial run.',
  ce_casualty:     'Marine casualty investigation flowchart: incident → preserve evidence → notify → ISM non-conformance → root cause analysis (5-Why, Fishbone) → corrective action → MAIB/flag state report → lessons learned.',
  ce_psc:          'Port State Control inspection flow: arrival → PSC officer boards → document check (ISM, STCW, MARPOL certificates) → ship inspection → deficiency found → rectify or detain. Label common deficiency areas.',
  // BTech topics
  bt_diesel1:      '2-stroke vs 4-stroke working cycle comparison: two side-by-side diagrams. Left: 2-stroke showing scavenge/power in 360°. Right: 4-stroke showing 4 strokes over 720°. P-V diagrams below each. Label IHP formulas.',
  bt_thermo1:      'Thermodynamic cycles comparison: Carnot cycle (ideal), Otto cycle (petrol), Diesel cycle (marine diesel) on single T-s diagram. Label: η_Carnot=1-TL/TH, diesel efficiency formula, steam Rankine cycle overlay.',
  bt_fluid1:       'Venturi + orifice + pitot tube flow measurement: three instruments side by side. Each shows flow streamlines, pressure tappings, velocity profile. Label Bernoulli equation application to each.',
  bt_elec2:        '3-phase AC generator (alternator): delta vs star winding comparison, phasor diagram (VR, VY, VB at 120°), power formula P=√3×VL×IL×cosφ. Ship generator: 440V, 60Hz, 4-pole, 1800RPM.',
  bt_naval1:       'Ship hull cross-section with naval architecture terms: beam (B), draught (T), freeboard, waterplane, centre of buoyancy (B), metacentre (M), GM. Side view showing LBP, LWL, displacement volume. Label Cb formula.',
  bt_naval2:       'Ship stability — same as transverse stability diagram but showing: G above M (unstable), G below M (stable), angle of loll (G=M), free surface effect reducing GM. IMO A.749 criteria table.',
  bt_control:      'PID control loop for marine governor: setpoint (desired RPM) → error signal → PID controller (Kp, Ki, Kd blocks) → actuator (fuel rack) → engine (plant) → speed sensor → feedback → compare. Label transfer function G(s).',
  bt_strength:     'Shaft torsion and bending: propeller shaft as beam showing: weight of propeller (bending), torque from propeller (torsion), thrust. Bending moment diagram, shear force diagram, combined stress Mohr\'s circle.',
  bt_mep:          'MARPOL compliance overview: 6 Annexes shown as icons with key limits: I(15ppm), II(NLS), III(packaged), IV(sewage 3nm), V(plastics ban), VI(SOx 0.5%, NOx Tier III). ISM Code 12 elements beside it.',
  bt_env:          'Ship decarbonisation roadmap: 2020(IMO 2020 SOx), 2023(EEXI/CII), 2030(target), 2050(net zero). Bar chart showing CO2 reduction per fuel type. LNG, methanol, ammonia, hydrogen icons with readiness levels.',
};

/* ── Default prompt for topics not in the map ── */
