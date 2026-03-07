/* MarineIQ — Home Screen Upgrade: Stats, Streaks, Year Syllabus, Light Mode
   Deps: config.js, career-levels.js (CAREER_LEVELS) */

function saveState(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}

/* ══════════════════════════════════════════════════════════════════
   2. YEAR-WISE SYLLABUS DATA
   DG Shipping India MMD examination structure year-by-year
   ══════════════════════════════════════════════════════════════════ */
const YEAR_SYLLABUS = [
  {
    year: 'Year 1',
    label: 'Pre-Sea Training',
    color: '#22c55e',
    icon: '🎓',
    duration: '1 year (shore-based)',
    institution: 'IMU / T.S. Chanakya / MERI / Approved Institute',
    overview: 'Foundation year — engineering science, STCW basic safety, workshop skills, maritime familiarisation. No MMD exam yet.',
    subjects: [
      { code: 'ENG-101', name: 'Engineering Mathematics & Physics', topics: ['Calculus', 'Vectors & Mechanics', 'Thermodynamics basics', 'Heat transfer fundamentals'], hours: 120 },
      { code: 'ENG-102', name: 'Engineering Drawing & Workshop',    topics: ['Engineering drawing', 'Lathe & drilling operations', 'Fitting & assembly', 'Welding & NDT basics'], hours: 80 },
      { code: 'ENG-103', name: 'Applied Thermodynamics',           topics: ['Laws of thermodynamics', 'Gas laws', 'Steam properties', 'Basic cycles'], hours: 100 },
      { code: 'ENG-104', name: 'Electrical Engineering Basics',    topics: ['DC circuits', 'AC theory', 'Transformers basics', 'Motor principles'], hours: 90 },
      { code: 'STW-101', name: 'STCW Basic Safety Training (BST)', topics: ['Personal survival', 'Fire fighting', 'First aid', 'Personal safety'], hours: 40 },
      { code: 'STW-102', name: 'PSSR & PSCRB',                    topics: ['PSSR certificate', 'Proficiency in Survival Craft', 'Rescue boat', 'EPIRB/SART'], hours: 20 },
      { code: 'MAR-101', name: 'Maritime English',                 topics: ['SMCP', 'Log keeping', 'Technical writing', 'Oral communication'], hours: 60 },
      { code: 'MAR-102', name: 'Seamanship & Ship Knowledge',      topics: ['Ship types', 'Stability basics', 'Deck equipment', 'Safety systems'], hours: 60 },
    ],
    milestone: 'Complete pre-sea training + BST + sea service start',
    examNote: 'No MMD written exam — practical assessments only at institute level'
  },
  {
    year: 'Year 2',
    label: 'Engine Cadet at Sea',
    color: '#38bdf8',
    icon: '⚓',
    duration: '12 months sea service (minimum)',
    institution: 'Approved merchant vessel — engine department',
    overview: 'First sea phase as Engine Cadet / Junior Engineer (Trainee). Maintain watchkeeping record book. Complete shipboard training program (STP).',
    subjects: [
      { code: 'SEA-201', name: 'Engine Room Watchkeeping Practice',  topics: ['Watch handover procedure', 'Parameter rounds', 'Logbook entries', 'Alarm handling'], hours: 'Continuous' },
      { code: 'SEA-202', name: 'Main Engine Operation & Maintenance', topics: ['Starting procedure', 'Load changes', 'Piston/liner inspection', 'Fuel system'], hours: 'Continuous' },
      { code: 'SEA-203', name: 'Auxiliary Machinery',                topics: ['Purifier operation', 'FWG operation', 'Compressor maintenance', 'Pump maintenance'], hours: 'Continuous' },
      { code: 'SEA-204', name: 'Electrical Systems Onboard',         topics: ['Generator operation', 'Switchboard duties', 'Emergency generator', 'Motor starters'], hours: 'Continuous' },
      { code: 'SEA-205', name: 'MARPOL & Environmental Compliance',  topics: ['OWS operation', 'ORB entries', 'Garbage management', 'Sewage system'], hours: 'Continuous' },
      { code: 'SEA-206', name: 'Safety & Emergency Procedures',      topics: ['Fire muster', 'Abandon ship drill', 'PTW system', 'ISPS duties'], hours: 'Continuous' },
      { code: 'STP-201', name: 'Shipboard Training Programme (STP)', topics: ['Engine familiarisation', 'Machinery identification', 'Safe access', 'Tool inventory'], hours: '280 tasks' },
    ],
    milestone: '12 months sea service — eligible to sit MMD Class IV',
    examNote: 'Maintain MMD-approved record book. Get all signatures from Chief Engineer.'
  },
  {
    year: 'Year 3',
    label: 'MMD Class IV Preparation',
    color: '#60a5fa',
    icon: '⚙️',
    duration: '3–6 months (pre-exam prep + exam)',
    institution: 'Self-study + preparatory course + MMD examination',
    overview: 'Intensive exam preparation for Marine Engineer Officer Class IV COC (STCW A-III/1). Three written papers + oral at MMD office.',
    subjects: [
      { code: 'EKG-301', name: 'Engineering Knowledge — General (Paper 1)', topics: ['Applied mechanics & materials', 'Thermodynamics & heat transfer', 'Fluid mechanics & pumps', 'NDT methods', 'Workshop & measurement'], hours: 200, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'EKM-302', name: 'Engineering Knowledge — Motor (Paper 2)',   topics: ['2-stroke & 4-stroke diesel engines', 'Turbocharger', 'Fuel & lube oil systems', 'Auxiliary machinery', 'Refrigeration basics'], hours: 200, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'ET-303',  name: 'Electrotechnology (Paper 3)',               topics: ['AC/DC circuits', 'Three-phase systems', 'Motors & generators', 'Switchboard & protection', 'Power factor correction'], hours: 150, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'ORL-304', name: 'MMD Oral Examination — STCW A-III/1',      topics: ['Engine room watchkeeping', 'Emergency procedures', 'MARPOL compliance', 'Machinery fault diagnosis', 'ORB procedure'], hours: 60, exam: true, marks: 'Pass/Fail — examiner set' },
    ],
    milestone: 'MEO Class IV COC issued by DG Shipping — can sail as 4th/3rd Engineer',
    examNote: 'Pass all 3 written papers (60% each) + oral. Reappear allowed for failed subjects.'
  },
  {
    year: 'Year 4–5',
    label: 'Sea Service as 4th/3rd Engineer',
    color: '#f59e0b',
    icon: '🔧',
    duration: '24–36 months sea service post Class IV',
    institution: 'Approved vessels — progressively responsible roles',
    overview: 'Serve as 4th and 3rd Engineer. Accumulate sea service and management experience required for Class II. Maintain good standing COC.',
    subjects: [
      { code: 'SEA-401', name: 'Main Engine Management',          topics: ['Piston/liner/bearing overhaul', 'Fuel pump calibration', 'Indicator cards', 'Performance monitoring'], hours: 'Sea service' },
      { code: 'SEA-402', name: 'Boiler & Steam Plant',            topics: ['Aux boiler operation', 'Water treatment', 'Safety valve maintenance', 'Scotch boiler overhaul'], hours: 'Sea service' },
      { code: 'SEA-403', name: 'Naval Architecture (Self Study)',  topics: ['Stability calculations', 'GZ curves', 'Free surface effect', 'Trim calculations'], hours: 'Self study' },
      { code: 'SEA-404', name: 'Advanced Thermodynamics (Self)',   topics: ['Refrigeration plant', 'HVAC', 'Heat exchangers design', 'Applied cycles'], hours: 'Self study' },
      { code: 'SEA-405', name: 'ISM & Safety Management',         topics: ['SMS familiarisation', 'Risk assessment', 'PTW systems', 'Incident reporting'], hours: 'Sea service' },
    ],
    milestone: 'Complete 24 months post-Class IV + eligible for Class II exam',
    examNote: 'Start self-study for Class II while at sea — 5 written papers + oral is significantly harder.'
  },
  {
    year: 'Year 5–6',
    label: 'MMD Class II Preparation',
    color: '#f97316',
    icon: '📐',
    duration: '6–12 months intense preparation',
    institution: 'Self-study + preparatory college + MMD examination',
    overview: 'Marine Engineer Officer Class II COC (STCW A-III/2, Management Level). Five written papers + oral. Significantly more demanding than Class IV.',
    subjects: [
      { code: 'NA-501',  name: 'Naval Architecture — Paper 1',      topics: ['Ship stability (GZ curves, FSE)', 'Trim & list', 'Damage stability', 'Ship resistance', 'Dry dock', 'Load lines'], hours: 250, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'AH-502',  name: 'Applied Heat — Paper 2',            topics: ['Refrigeration plant', 'Boiler operation', 'Rankine cycle', 'Heat exchangers', 'Steam turbines', 'HVAC'], hours: 200, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'MEP-503', name: 'Marine Engineering Practice (MEP) — Paper 3', topics: ['MARPOL Annexes I–VI', 'ISM Code', 'SOLAS', 'STCW', 'ISM audits', 'PSC inspections', 'BWM Convention'], hours: 200, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'MOT-504', name: 'Motor Engineering — Paper 4',       topics: ['Main engine overhaul', 'Propeller theory', 'Governor systems', 'Vibration', 'Performance analysis', 'Alternative fuels'], hours: 250, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'ET2-505', name: 'Electrotechnology Advanced — Paper 5',topics: ['HV systems', 'VFDs', 'Automation', 'PLC systems', 'Alarm systems', 'Fault-finding advanced'], hours: 150, exam: true, marks: '100 marks, 3 hours, 60% pass' },
      { code: 'ORL-506', name: 'MMD Oral — STCW A-III/2 Management Level', topics: ['CE duties', 'Emergency management', 'ISM/MARPOL/SOLAS', 'Chief Engineer oral questions', 'Casualty investigation'], hours: 80, exam: true, marks: 'Pass/Fail — examiner set' },
    ],
    milestone: 'MEO Class II COC — can sail as 2nd Engineer on any ship',
    examNote: 'Prepare oral Q&A separately — examiners are very experienced. Practice answering aloud.'
  },
  {
    year: 'Year 7+',
    label: 'MEO Class I — Chief Engineer',
    color: '#a78bfa',
    icon: '⭐',
    duration: 'Additional sea service + exam',
    institution: 'Chief Engineer preparation + MMD',
    overview: 'Highest engineering certificate. Requires sea service as 2nd Engineer + Class I written papers + oral. Comprehensive management and technical mastery.',
    subjects: [
      { code: 'CE-601', name: 'Engine Room Management & Administration', topics: ['CE statutory duties', 'Budget management', 'Crew management', 'Company SMS', 'DPA interface'], hours: 200, exam: true },
      { code: 'CE-602', name: 'Energy Efficiency & Decarbonisation',      topics: ['CII calculations', 'EEXI compliance', 'SEEMP Part III', 'Alternative fuels (LNG/NH₃/MeOH)', 'Emission monitoring'], hours: 150, exam: true },
      { code: 'CE-603', name: 'Casualty Investigation & Emergency',       topics: ['Major machinery failures', 'Root cause analysis', 'Dead ship recovery', 'Grounding/collision response', 'PSC detention'], hours: 120, exam: true },
      { code: 'CE-604', name: 'Advanced Naval Architecture',               topics: ['Advanced stability', 'Hull stress monitoring', 'Docking & undocking', 'Damage control'], hours: 100, exam: true },
      { code: 'CE-605', name: 'MMD Oral — Chief Engineer Level',          topics: ['CE oral questions', 'System failures', 'Legal responsibilities', 'Environmental compliance', 'Port State Control'], hours: 100, exam: true },
    ],
    milestone: 'MEO Class I COC — Chief Engineer, unlimited trading area',
    examNote: 'Oral examination is the most challenging. Examiners expect deep practical experience AND regulatory knowledge.'
  }
];

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

/* ── HOME TABS (Career / Year Syllabus) ── */
.home-tabs {
  display: flex; gap: 6px; margin: 0 0 24px;
  background: var(--bg1); padding: 5px; border-radius: 12px;
  border: 1px solid var(--b0); width: fit-content; max-width: 100%;
}
.home-tab {
  padding: 8px 20px; border-radius: 8px; font-size: 0.78rem; font-weight: 600;
  font-family: 'JetBrains Mono', monospace; cursor: pointer; border: none;
  color: var(--tx3); background: transparent; transition: all 0.18s; white-space: nowrap;
}
.home-tab.active { background: var(--bg3); color: var(--tx); border: 1px solid var(--b1); }
.home-tab:hover:not(.active) { color: var(--tx2); }

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

/* ── YEAR SYLLABUS ── */
.year-grid { display: flex; flex-direction: column; gap: 14px; }
.year-card {
  background: var(--bg1); border: 1px solid var(--b0); border-radius: 14px;
  overflow: hidden; transition: border-color 0.2s;
}
.year-card:hover { border-color: var(--b2); }
.year-header {
  display: flex; align-items: center; gap: 14px; padding: 16px 20px;
  cursor: pointer; user-select: none;
}
.year-badge {
  flex-shrink: 0; padding: 4px 11px; border-radius: 20px; font-size: 0.65rem;
  font-family: 'JetBrains Mono', monospace; font-weight: 700; border: 1px solid;
}
.year-title { font-size: 0.95rem; font-weight: 700; color: var(--tx); }
.year-sub   { font-size: 0.72rem; color: var(--tx3); margin-top: 2px; }
.year-chevron { margin-left: auto; color: var(--tx3); font-size: 0.9rem; transition: transform 0.2s; }
.year-card.open .year-chevron { transform: rotate(90deg); }
.year-body {
  display: none; padding: 0 20px 16px;
  border-top: 1px solid var(--b0);
}
.year-card.open .year-body { display: block; }
.year-overview {
  font-size: 0.82rem; color: var(--tx2); padding: 12px 0 10px;
  border-bottom: 1px solid var(--b0); margin-bottom: 10px; line-height: 1.6;
}
.year-meta {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; font-size: 0.7rem;
}
.year-meta-tag {
  padding: 3px 10px; background: var(--bg2); border: 1px solid var(--b0);
  border-radius: 20px; color: var(--tx3);
}
.subject-list { display: flex; flex-direction: column; gap: 6px; }
.subject-row {
  display: flex; align-items: flex-start; gap: 12px; padding: 10px 12px;
  background: var(--bg2); border-radius: 10px; border: 1px solid var(--b0);
}
.subject-code {
  flex-shrink: 0; font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
  color: var(--tx3); padding: 2px 7px; background: var(--bg3); border-radius: 5px;
  border: 1px solid var(--b0); white-space: nowrap; margin-top: 1px;
}
.subject-name { font-size: 0.83rem; font-weight: 600; color: var(--tx); margin-bottom: 3px; }
.subject-topics { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
.subject-topic-tag {
  font-size: 0.6rem; padding: 2px 7px; background: var(--bg1); border: 1px solid var(--b0);
  border-radius: 20px; color: var(--tx3);
}
.subject-hours { font-size: 0.62rem; color: var(--tx3); margin-top: 3px; }
.exam-tag {
  flex-shrink: 0; font-size: 0.58rem; padding: 2px 7px; border-radius: 10px;
  background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3);
  color: #f59e0b; font-family: 'JetBrains Mono', monospace; font-weight: 700;
  white-space: nowrap; margin-top: 1px;
}
.year-milestone {
  margin-top: 12px; padding: 10px 14px;
  background: rgba(14,165,233,0.06); border: 1px solid rgba(14,165,233,0.2);
  border-radius: 10px; font-size: 0.78rem; color: var(--tx2); line-height: 1.5;
}
.year-milestone strong { color: var(--acL); }

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
  flex: 1; background: none; border: none; outline: none;
  font-size: 1rem; color: var(--tx); font-family: 'DM Sans', sans-serif;
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
