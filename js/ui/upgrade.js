/* MarineIQ — Home Screen Upgrade: Stats, Streaks, Year Syllabus, Light Mode
   Deps: config.js, career-levels.js (CAREER_LEVELS) */

function saveState(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}


/* ══════════════════════════════════════════════════════════════════
   3. TOPIC METADATA (difficulty, est. study time, category)
   ══════════════════════════════════════════════════════════════════ */
const TOPIC_META = {
  // Cadet
  bst_survival:{ diff:'Easy',   time:20, paper:'STCW BST'   },
  bst_fire:    { diff:'Easy',   time:20, paper:'STCW BST'   },
  bst_aid:     { diff:'Easy',   time:15, paper:'STCW BST'   },
  bst_social:  { diff:'Easy',   time:10, paper:'STCW BST'   },
  math_calc:   { diff:'Hard',   time:45, paper:'EKG Paper 1' },
  math_stats:  { diff:'Medium', time:30, paper:'EKG Paper 1' },
  math_vectors:{ diff:'Medium', time:30, paper:'EKG Paper 1' },
  ws_tools:    { diff:'Easy',   time:20, paper:'EKG Paper 1' },
  ws_lathe:    { diff:'Medium', time:25, paper:'EKG Paper 1' },
  ws_measure:  { diff:'Easy',   time:15, paper:'EKG Paper 1' },
  ws_weld:     { diff:'Medium', time:25, paper:'EKG Paper 1' },
  therm_laws:  { diff:'Medium', time:35, paper:'EKG Paper 1' },
  therm_gas:   { diff:'Hard',   time:40, paper:'EKG Paper 1' },
  therm_steam: { diff:'Hard',   time:40, paper:'EKG Paper 1' },
  na_ships:    { diff:'Easy',   time:20, paper:'NA Paper 1'  },
  na_stability:{ diff:'Medium', time:30, paper:'NA Paper 1'  },
  na_regs:     { diff:'Easy',   time:20, paper:'MEP Paper 3' },
  // Class IV
  cl4_2stroke: { diff:'Hard',   time:60, paper:'EKM Paper 2' },
  cl4_4stroke: { diff:'Hard',   time:45, paper:'EKM Paper 2' },
  cl4_turbo:   { diff:'Hard',   time:40, paper:'EKM Paper 2' },
  cl4_indicator:{ diff:'Hard',  time:50, paper:'EKM Paper 2' },
  cl4_fuelsys: { diff:'Medium', time:35, paper:'EKM Paper 2' },
  cl4_lubesys: { diff:'Medium', time:30, paper:'EKM Paper 2' },
  cl4_pumps:   { diff:'Hard',   time:50, paper:'EKG Paper 1' },
  cl4_purifier:{ diff:'Medium', time:35, paper:'EKM Paper 2' },
  cl4_heatex:  { diff:'Hard',   time:40, paper:'EKG Paper 1' },
  cl4_fwg:     { diff:'Medium', time:25, paper:'EKM Paper 2' },
  cl4_aircomp: { diff:'Medium', time:30, paper:'EKM Paper 2' },
  cl4_ows:     { diff:'Medium', time:25, paper:'MEP Paper 3' },
  cl4_thermo:  { diff:'Hard',   time:50, paper:'EKG Paper 1' },
  cl4_bernoulli:{ diff:'Hard',  time:45, paper:'EKG Paper 1' },
  cl4_pumpcurves:{ diff:'Hard', time:45, paper:'EKG Paper 1' },
  cl4_generators:{ diff:'Medium',time:35,paper:'ET Paper 3'  },
  cl4_motors:  { diff:'Medium', time:35, paper:'ET Paper 3'  },
  cl4_protection:{ diff:'Hard', time:40, paper:'ET Paper 3'  },
  cl4_emergency:{ diff:'Easy',  time:20, paper:'ET Paper 3'  },
  cl4_watch:   { diff:'Easy',   time:20, paper:'ORAL'        },
  cl4_marpol_oral:{ diff:'Medium',time:30,paper:'ORAL'       },
  // Class II
  cl3_transverse:{ diff:'Hard', time:55, paper:'NA Paper 1'  },
  cl3_gzcurve:  { diff:'Hard',  time:50, paper:'NA Paper 1'  },
  cl3_freesurface:{ diff:'Hard',time:50, paper:'NA Paper 1'  },
  cl3_trim:    { diff:'Hard',   time:45, paper:'NA Paper 1'  },
  cl3_damage:  { diff:'Medium', time:35, paper:'NA Paper 1'  },
  cl3_resistance:{ diff:'Hard', time:45, paper:'NA Paper 1'  },
  cl3_refrig:  { diff:'Hard',   time:50, paper:'AH Paper 2'  },
  cl3_refrigsys:{ diff:'Hard',  time:45, paper:'AH Paper 2'  },
  cl3_boilers: { diff:'Medium', time:40, paper:'AH Paper 2'  },
  cl3_boilerwater:{ diff:'Medium',time:30,paper:'AH Paper 2' },
  cl3_steamplant:{ diff:'Hard', time:50, paper:'AH Paper 2'  },
  cl3_perf:    { diff:'Hard',   time:55, paper:'MOT Paper 4' },
  cl3_governor:{ diff:'Medium', time:30, paper:'MOT Paper 4' },
  cl3_propeller:{ diff:'Hard',  time:50, paper:'MOT Paper 4' },
  cl3_vibration:{ diff:'Hard',  time:40, paper:'MOT Paper 4' },
  cl3_altfuels:{ diff:'Medium', time:30, paper:'MEP Paper 3' },
  cl3_pms:     { diff:'Easy',   time:20, paper:'MEP Paper 3' },
  cl3_ndt:     { diff:'Medium', time:30, paper:'EKG Paper 1' },
  cl3_materials:{ diff:'Medium',time:30, paper:'EKG Paper 1' },
  cl3_bearings:{ diff:'Medium', time:30, paper:'MOT Paper 4' },
  cl3_solas:   { diff:'Medium', time:35, paper:'MEP Paper 3' },
  cl3_marpol:  { diff:'Medium', time:35, paper:'MEP Paper 3' },
  cl3_annex6:  { diff:'Hard',   time:40, paper:'MEP Paper 3' },
  cl3_ism:     { diff:'Medium', time:30, paper:'MEP Paper 3' },
  cl3_stcw:    { diff:'Easy',   time:20, paper:'MEP Paper 3' },
  cl3_bwm:     { diff:'Medium', time:25, paper:'MEP Paper 3' },
  // Chief
  ce_duties:   { diff:'Medium', time:30, paper:'ORAL'        },
  ce_budget:   { diff:'Medium', time:25, paper:'CE ORAL'     },
  ce_risk:     { diff:'Medium', time:25, paper:'CE ORAL'     },
  ce_dpa:      { diff:'Easy',   time:20, paper:'CE ORAL'     },
  ce_cii:      { diff:'Hard',   time:45, paper:'CE Paper'    },
  ce_seemp:    { diff:'Hard',   time:40, paper:'CE Paper'    },
  ce_sfoc:     { diff:'Hard',   time:45, paper:'CE Paper'    },
  ce_futurefuels:{ diff:'Medium',time:30,paper:'CE Paper'    },
  ce_diagnosis:{ diff:'Hard',   time:50, paper:'CE ORAL'     },
  ce_failures: { diff:'Hard',   time:45, paper:'CE ORAL'     },
  ce_overhaul: { diff:'Hard',   time:50, paper:'CE ORAL'     },
  ce_casualty: { diff:'Hard',   time:45, paper:'CE ORAL'     },
  ce_psc:      { diff:'Medium', time:30, paper:'CE ORAL'     },
  ce_law:      { diff:'Medium', time:25, paper:'CE ORAL'     },
  ce_charter:  { diff:'Easy',   time:20, paper:'CE ORAL'     },
  ce_oral_prep:{ diff:'Hard',   time:60, paper:'CE ORAL'     },
};

const DIFF_COLOR = { Easy:'#22c55e', Medium:'#f59e0b', Hard:'#ef4444' };
const DIFF_ICON  = { Easy:'🟢', Medium:'🟡', Hard:'🔴' };

/* ══════════════════════════════════════════════════════════════════
   4. INJECT STYLES
   ══════════════════════════════════════════════════════════════════ */
(function injectUpgradeCSS() {
  const s = document.createElement('style');
  s.textContent = `

/* ── STATS DASHBOARD ── */
.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;
}
.stat-card {
  background: var(--bg1); border: 1px solid var(--b0); border-radius: 12px;
  padding: 14px 16px; text-align: center; transition: border-color 0.15s;
}
.stat-card:hover { border-color: var(--b2); }
.stat-num  { font-size: 1.5rem; font-weight: 800; font-family: 'Syne', sans-serif; color: var(--tx); line-height: 1; }
.stat-lbl  { font-size: 0.62rem; color: var(--tx3); font-family: 'JetBrains Mono', monospace; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
.stat-icon { font-size: 1.1rem; margin-bottom: 4px; }

/* ── CONTINUE CARD ── */
.continue-card {
  background: linear-gradient(135deg, var(--bg1), var(--bg2));
  border: 1px solid var(--b1); border-radius: 14px;
  padding: 16px 20px; margin-bottom: 20px; cursor: pointer;
  display: flex; align-items: center; gap: 16px; transition: all 0.2s;
}
.continue-card:hover { border-color: var(--ac); transform: translateY(-1px); }
.continue-play {
  width: 42px; height: 42px; border-radius: 50%; background: var(--ac);
  display: flex; align-items: center; justify-content: center; font-size: 1rem;
  flex-shrink: 0; box-shadow: 0 0 20px rgba(14,165,233,0.3);
}
.continue-info { flex: 1; min-width: 0; }
.continue-label { font-size: 0.6rem; color: var(--tx3); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: 0.1em; }
.continue-title { font-size: 0.92rem; font-weight: 700; color: var(--tx); margin: 2px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.continue-sub   { font-size: 0.72rem; color: var(--tx3); }

/* ── ENHANCED SIDEBAR ── */
.sb-section-label {
  display: flex; align-items: center; justify-content: space-between;
}
.sb-section-count {
  font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--tx3);
  background: var(--bg3); padding: 2px 6px; border-radius: 10px;
}
.sb-topic-meta {
  display: flex; align-items: center; gap: 5px; margin-top: 3px;
}
.sb-diff-dot {
  width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
}
.sb-time-est { font-size: 0.58rem; color: var(--tx3); }
.sb-paper-tag { font-size: 0.58rem; color: var(--tx3); }
.sb-bk-btn {
  margin-left: auto; background: none; border: none; cursor: pointer;
  font-size: 0.75rem; opacity: 0.4; padding: 2px 4px; border-radius: 4px;
  transition: opacity 0.15s; flex-shrink: 0; color: var(--tx2);
}
.sb-bk-btn:hover { opacity: 1; }
.sb-bk-btn.bookmarked { opacity: 1; color: #f59e0b; }

/* Sidebar quick sections */
.sb-quick-section {
  padding: 10px 14px; border-bottom: 1px solid var(--b0);
}
.sb-quick-title {
  font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--tx3);
  text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 7px;
}
.sb-recent-item {
  display: flex; align-items: center; gap: 8px; padding: 6px 8px;
  border-radius: 8px; cursor: pointer; transition: background 0.12s;
  font-size: 0.78rem; color: var(--tx2);
}
.sb-recent-item:hover { background: var(--bg2); color: var(--tx); }
.sb-recent-icon { font-size: 0.85rem; flex-shrink: 0; }

/* Rank card progress ring */
.rc-progress { margin-top: 10px; }
.rc-prog-bar { height: 3px; background: var(--b0); border-radius: 2px; overflow: hidden; }
.rc-prog-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
.rc-prog-label { font-size: 0.62rem; color: var(--tx3); margin-top: 4px; font-family: 'JetBrains Mono', monospace; }

/* Topic zone header with completion */
.tz-header {
  display: flex; align-items: center; gap: 10px; padding: 14px 0 10px;
  border-bottom: 1px solid var(--b0); margin-bottom: 14px;
}
.tz-complete-btn {
  margin-left: auto; display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 8px; font-size: 0.72rem; font-weight: 600;
  font-family: 'JetBrains Mono', monospace; cursor: pointer; transition: all 0.15s;
  border: 1px solid var(--b1); background: var(--bg2); color: var(--tx3);
  white-space: nowrap; flex-shrink: 0;
}
.tz-complete-btn.done { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.4); color: #22c55e; }
.tz-topic-diff { font-size: 0.65rem; padding: 2px 8px; border-radius: 10px; font-family: 'JetBrains Mono', monospace; }
.tz-topic-time { font-size: 0.65rem; color: var(--tx3); }
.tz-nav { display: flex; gap: 6px; margin-left: auto; }
.tz-nav-btn {
  padding: 5px 10px; border: 1px solid var(--b1); border-radius: 7px;
  background: var(--bg2); color: var(--tx3); cursor: pointer; font-size: 0.75rem;
  transition: all 0.12s; white-space: nowrap;
}
.tz-nav-btn:hover { border-color: var(--ac); color: var(--tx); }
.tz-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }

/* Global search overlay */
.global-search-overlay {
  position: fixed; inset: 0; z-index: 400; background: rgba(0,0,0,0.7);
  backdrop-filter: blur(8px); display: none; align-items: flex-start;
  justify-content: center; padding-top: 80px;
}
.global-search-overlay.open { display: flex; }
.gs-box {
  width: min(560px, 92vw); background: var(--bg1); border: 1px solid var(--b1);
  border-radius: 16px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.6);
}
.gs-input-wrap {
  display: flex; align-items: center; gap: 10px; padding: 14px 16px;
  border-bottom: 1px solid var(--b0);
}
.gs-input {
  flex: 1; background: transparent; border: none; outline: none;
  font-size: 1rem; color: var(--tx) !important; font-family: 'DM Sans', sans-serif;
  opacity: 1; -webkit-text-fill-color: var(--tx); -webkit-appearance: none; border-radius: 0;
}
.gs-input::placeholder { color: var(--tx3); }
.gs-results { max-height: 380px; overflow-y: auto; }
.gs-result {
  display: flex; align-items: center; gap: 12px; padding: 11px 16px;
  cursor: pointer; transition: background 0.1s; border-bottom: 1px solid var(--b0);
}
.gs-result:hover, .gs-result.selected { background: var(--bg2); }
.gs-result:last-child { border-bottom: none; }
.gs-r-icon { font-size: 1.1rem; flex-shrink: 0; }
.gs-r-title { font-size: 0.87rem; font-weight: 600; color: var(--tx); }
.gs-r-sub   { font-size: 0.7rem; color: var(--tx3); margin-top: 1px; }
.gs-r-badge { margin-left: auto; font-size: 0.6rem; padding: 2px 7px; border-radius: 10px; font-family: 'JetBrains Mono', monospace; flex-shrink: 0; white-space: nowrap; }
.gs-empty   { padding: 28px; text-align: center; color: var(--tx3); font-size: 0.85rem; }
.gs-shortcut { padding: 8px 16px; font-size: 0.65rem; color: var(--tx3); font-family: 'JetBrains Mono', monospace; border-top: 1px solid var(--b0); display: flex; gap: 14px; }
.gs-key { background: var(--bg2); padding: 1px 5px; border-radius: 4px; border: 1px solid var(--b1); }

/* Dark/light mode toggle */
.mode-toggle {
  width: 32px; height: 18px; border-radius: 9px; border: 1px solid var(--b1);
  background: var(--bg2); cursor: pointer; position: relative; flex-shrink: 0;
  transition: background 0.2s;
}
.mode-toggle-knob {
  position: absolute; top: 2px; left: 2px; width: 12px; height: 12px;
  border-radius: 50%; background: var(--tx3); transition: transform 0.2s;
}
body.light-mode .mode-toggle { background: #e0f2fe; border-color: #bae6fd; }
body.light-mode .mode-toggle-knob { transform: translateX(14px); background: #0ea5e9; }

/* Light mode vars */
body.light-mode {
  --bg:  #f0f6ff; --bg1: #ffffff; --bg2: #f8faff; --bg3: #eef3ff;
  --b0:  #d4e2f0; --b1:  #b8ccde; --b2:  #9ab4c9;
  --tx:  #0d2038; --tx2: #2d5070; --tx3: #5a7a95;
  --ac:  #0284c7; --acL: #0369a1;
}
body.light-mode .topbar { background: rgba(240,246,255,0.96); }
body.light-mode .sidebar { border-right-color: var(--b0); }

/* Streak badge */
.streak-badge {
  display: flex; align-items: center; gap: 5px; padding: 4px 10px;
  border: 1px solid rgba(245,158,11,0.3); background: rgba(245,158,11,0.08);
  border-radius: 20px; font-size: 0.65rem; font-family: 'JetBrains Mono', monospace;
  color: #f59e0b; flex-shrink: 0;
}

/* Next/prev nav at bottom of topic zone */
.topic-nav-footer {
  display: flex; gap: 10px; padding: 16px 0 4px;
  border-top: 1px solid var(--b0); margin-top: 16px;
}
.tnf-btn {
  flex: 1; padding: 11px 14px; border-radius: 10px; border: 1px solid var(--b1);
  background: var(--bg2); cursor: pointer; font-size: 0.8rem; color: var(--tx2);
  transition: all 0.15s; text-align: left;
}
.tnf-btn:hover { border-color: var(--ac); color: var(--tx); }
.tnf-btn.next  { text-align: right; }
.tnf-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.tnf-label { font-size: 0.6rem; color: var(--tx3); font-family: 'JetBrains Mono', monospace; display: block; margin-bottom: 2px; }
.tnf-title { font-weight: 600; }

@media (max-width: 768px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
  .home-tabs { overflow-x: auto; }
}
@media (max-width: 480px) {
  .stats-row { grid-template-columns: 1fr 1fr; gap: 7px; }
  .stat-num  { font-size: 1.2rem; }
  .year-header { padding: 12px 14px; }
  .year-body   { padding: 0 14px 12px; }
}
  `;
  document.head.appendChild(s);
})();

/* ══════════════════════════════════════════════════════════════════
   5. INJECT GLOBAL SEARCH + DARK MODE TOGGLE INTO TOPBAR
   ══════════════════════════════════════════════════════════════════ */
