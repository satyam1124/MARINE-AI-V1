/* MarineIQ — Career Levels & Curriculum Database
   Sources: DG Shipping India MEO Syllabus, STCW 2010, IMO Model Course 7.04
   DO NOT add logic here — data only */


/* ═══════════════════════════════════════════════════════════════════════
   ZONE 3: CAREER & CURRICULUM DATABASE
   Sources: DG Shipping India MEO Syllabus, STCW 2010 Manila Amendment,
            IMO Model Course 7.04, MMD India Examination Notices,
            Merchant Shipping Act 1958 (India), MCA UK Syllabi
   ═══════════════════════════════════════════════════════════════════════ */

const CAREER_LEVELS = [
{
  id: 'cadet',
  rankColor: '#22c55e',
  icon: '🎓',
  stageNum: 'STAGE 01',
  title: 'Engine Cadet',
  fullTitle: 'Engine Cadet / Engine Rating',
  subtitle: 'Pre-sea training — the foundation every engineer must build before watchkeeping',
  tags: ['Pre-Sea', 'GME Course', 'B.E. Marine', 'Diploma Marine', 'Basic STCW'],
  eligibility: [
    { icon: '📚', text: '<strong>10+2 PCM</strong> with minimum 60% (Physics, Chemistry, Mathematics)' },
    { icon: '🎂', text: '<strong>Age:</strong> 17–25 years (varies by institution and flag state)' },
    { icon: '🏥', text: '<strong>Medical:</strong> ENG1 / ML5 fitness certificate (DGMS standard, India)' },
    { icon: '🏫', text: '<strong>Institution:</strong> Approved maritime training institute — T.S.Chanakya, MERI, IMU, etc.' },
    { icon: '📋', text: '<strong>STCW Basic Safety:</strong> BST, PSSR, EFA, PSCRB before going to sea' },
    { icon: '⏱️', text: '<strong>Sea Training:</strong> 12 months approved sea service in engine department' }
  ],
  examPapers: [
    { label: 'STCW BASIC', title: 'Basic Safety Training (BST)', sub: 'Fire fighting, personal survival, first aid, personal safety & social responsibility' },
    { label: 'STCW PRO', title: 'Proficiency in Survival Craft & Rescue Boats', sub: 'Lifeboat, rescue boat operation; EPIRB, SART, pyrotechnics — STCW Reg VI/2' },
    { label: 'WORKSHOP', title: 'Engineering Workshop Practice', sub: 'Fitting, turning, welding, precision measurement — practical assessments' },
    { label: 'FAMILIARISATION', title: 'Engine Room Familiarisation', sub: 'Machinery identification, watch duties, logbook, safety systems onboard' }
  ],
  sections: {
    'STCW Basic Safety Training': [
      { icon: '🛟', id: 'bst_survival', title: 'Personal Survival Techniques', desc: 'Survival suits, EPIRB, SART, life rafts, distress signals — STCW Table A-VI/1-1' },
      { icon: '🔥', id: 'bst_fire',     title: 'Fire Prevention & Fighting',    desc: 'Fire triangle/tetrahedron, classes A–D, extinguisher types, fixed CO₂ system — STCW A-VI/1-2' },
      { icon: '⚕️', id: 'bst_aid',      title: 'Elementary First Aid',          desc: 'CPR, ABC airways, bleeding, fractures, burns, hypothermia, shock — STCW A-VI/1-3' },
      { icon: '⚓', id: 'bst_social',   title: 'Personal Safety & Social Responsibility', desc: 'Safe working at sea, risk assessment, drug/alcohol policy, communication — STCW A-VI/1-4' }
    ],
    'Engineering Mathematics': [
      { icon: '📐', id: 'math_calc',    title: 'Calculus for Engineers',         desc: 'Differentiation, integration, differential equations — applied to heat transfer and fluid flow' },
      { icon: '📊', id: 'math_stats',   title: 'Statistics & Probability',       desc: 'Normal distribution, error analysis, control charts — quality in manufacturing' },
      { icon: '🔢', id: 'math_vectors', title: 'Vectors, Mechanics & Statics',   desc: 'Force resolution, moments, free body diagrams, equilibrium conditions' }
    ],
    'Workshop Practice': [
      { icon: '🔧', id: 'ws_tools',    title: 'Hand Tools & Safe Use',          desc: 'Files, hacksaws, chisels, taps, dies — material removal and threading techniques' },
      { icon: '🏭', id: 'ws_lathe',    title: 'Lathe Machine Operations',       desc: 'Turning, facing, taper turning, drilling, knurling — speeds, feeds, cutting tools' },
      { icon: '📏', id: 'ws_measure',  title: 'Precision Measurement',          desc: 'Micrometer, vernier caliper, dial gauge, slip gauges — reading to 0.01mm accuracy' },
      { icon: '🔥', id: 'ws_weld',     title: 'Introduction to Welding',        desc: 'MMA, MIG/MAG, TIG welding fundamentals, joint types, welding symbols, safety' }
    ],
    'Basic Thermodynamics': [
      { icon: '🌡️', id: 'therm_laws',  title: 'Laws of Thermodynamics',         desc: 'Zeroth, First, Second, Third laws — applied examples in marine machinery' },
      { icon: '💨', id: 'therm_gas',   title: 'Properties of Gases',            desc: 'Ideal gas law (PV=mRT), gas constants, polytropic processes, compressors' },
      { icon: '💧', id: 'therm_steam', title: 'Properties of Steam',            desc: 'Saturation, dryness fraction x, steam tables, enthalpy, entropy — h-s diagram' }
    ],
    'Naval Architecture Introduction': [
      { icon: '🚢', id: 'na_ships',     title: 'Merchant Ship Types',            desc: 'Tankers, bulk carriers, container ships, LNG carriers, RoRo — general arrangement, cargo operations' },
      { icon: '⚖️', id: 'na_stability', title: 'Basic Stability',               desc: 'Buoyancy, Archimedes, centre of buoyancy B, metacentre M, Plimsoll mark, load line zones' },
      { icon: '📋', id: 'na_regs',      title: 'Maritime Regulations Overview', desc: 'IMO structure, SOLAS, MARPOL, STCW — purpose and hierarchy for cadets' }
    ]
  }
},
{
  id: 'class4',
  rankColor: '#60a5fa',
  icon: '⚙️',
  stageNum: 'STAGE 02',
  title: 'MEO Class IV',
  fullTitle: 'Marine Engineer Officer Class IV — Watchkeeping Certificate',
  subtitle: 'First Certificate of Competency — Officer in Charge of an Engineering Watch (OICEW) on vessels ≥750 kW',
  tags: ['COC Class IV', 'STCW A-III/1', 'OICEW 750kW+', 'MMD Written + Oral'],
  eligibility: [
    { icon: '⏱️', text: '<strong>Sea Service:</strong> Minimum 12 months approved sea service in engine department (post pre-sea training)' },
    { icon: '📋', text: '<strong>Watchkeeping Service:</strong> Must include approved watchkeeping duties logged in MMD approved record book' },
    { icon: '🏥', text: '<strong>Medical:</strong> Valid ENG1 or ML5 medical fitness certificate' },
    { icon: '📝', text: '<strong>Examination:</strong> 3 written papers + oral examination at Mercantile Marine Department (MMD)' },
    { icon: '🎓', text: '<strong>Qualification:</strong> GME / B.E. Marine Engineering / Diploma Marine Engineering from approved institution' },
    { icon: '🏛️', text: '<strong>Authority:</strong> Directorate General of Shipping, India (DGS) under Merchant Shipping Act 1958' }
  ],
  examPapers: [
    { label: 'WRITTEN PAPER 1', title: 'Engineering Knowledge — General (EKG)', sub: 'Applied mechanics, materials, workshop, thermodynamics, heat transfer, fluid mechanics' },
    { label: 'WRITTEN PAPER 2', title: 'Engineering Knowledge — Motor (EKM)',   sub: 'Marine diesel engines, auxiliary machinery, refrigeration, steering gear, propulsion systems' },
    { label: 'WRITTEN PAPER 3', title: 'Electrotechnology (ET)',                sub: 'AC/DC theory, motors, generators, switchboards, protection devices, electrical safety' },
    { label: 'ORAL EXAM',       title: 'MMD Oral Examination — STCW A-III/1',  sub: 'Watchkeeping, engine room operations, MARPOL compliance, emergency procedures, LSA/FFA' },
    { label: 'FUNCTION TEST',   title: 'STCW Function Assessment',              sub: 'Functions 4 (Marine Engineering), 5 (Electrical), 6 (Maintenance & Repair) — operational level' }
  ],
  sections: {
    'Marine Diesel Engines — Paper 2 (EKM)': [
      { icon: '⚙️', id: 'cl4_2stroke',   title: '2-Stroke Slow-Speed Diesel Engine',   desc: 'MAN B&W S/ME, Wärtsilä RT-flex — uniflow scavenging, fuel injection, exhaust valve, starting air' },
      { icon: '🔩', id: 'cl4_4stroke',   title: '4-Stroke Medium-Speed Diesel Engine',  desc: 'Wärtsilä 32/34/46, Bergen B/C/E — valve timing, camshaft, cylinder head, crank arrangement' },
      { icon: '💨', id: 'cl4_turbo',     title: 'Turbocharger Systems',                 desc: 'Exhaust-driven T/C — surging, fouling, ABB/MAN cleaning procedures, floating ring bearings' },
      { icon: '📊', id: 'cl4_indicator', title: 'Indicator Diagrams & Fault Diagnosis', desc: 'Power card (full spring), draw card (light spring) — MEP calculation, fault reading from PV card' },
      { icon: '⛽', id: 'cl4_fuelsys',   title: 'Fuel Oil Systems & Injection',         desc: 'HFO, MDO, VLSFO systems — common rail, FIVA valve, injector overhaul, fuel pump plunger' },
      { icon: '🔧', id: 'cl4_lubesys',   title: 'Lubrication Systems',                  desc: 'Crosshead, main bearing, camshaft lubrication — grades, pressures, oil analysis' }
    ],
    'Auxiliary Machinery — Paper 2 (EKM)': [
      { icon: '💧', id: 'cl4_pumps',     title: 'Centrifugal Pumps',                   desc: 'Euler equation, affinity laws, NPSH, cavitation, characteristic curves, series/parallel operation' },
      { icon: '🌀', id: 'cl4_purifier',  title: 'Purifiers & Centrifuges',             desc: 'Alfa Laval FOPX/LOPX, Westfalia — gravity disc selection, HFO 95–98°C, desludging cycle' },
      { icon: '🔄', id: 'cl4_heatex',    title: 'Heat Exchangers',                     desc: 'Plate type (PHE), shell-and-tube — LMTD, fouling resistance, cleaning, gasket renewal' },
      { icon: '💦', id: 'cl4_fwg',       title: 'Fresh Water Generator',               desc: 'Vacuum evaporation 35–45°C, jacket water heat source, production formula, 10 ppm salinometer limit' },
      { icon: '💨', id: 'cl4_aircomp',   title: 'Air Compressors',                     desc: '2-stage intercooled, 25–30 bar starting air — safety devices: fusible plug 121°C, relief valve, NRV' },
      { icon: '🪣', id: 'cl4_ows',       title: 'Oily Water Separator & MARPOL',       desc: '15 ppm MARPOL Annex I limit, OCM type-approval, ORB Part I entries, special area 0 ppm discharge' }
    ],
    'Thermodynamics & Fluid Mechanics — Paper 1 (EKG)': [
      { icon: '🌡️', id: 'cl4_thermo',       title: 'Laws of Thermodynamics (Applied)',     desc: 'First & second law applications, Carnot, Diesel cycle, Rankine cycle — with marine examples' },
      { icon: '💧', id: 'cl4_bernoulli',     title: 'Bernoulli\'s Equation & Pipe Flow',   desc: 'Venturi meter, pitot tube, orifice — Reynolds number, Darcy-Weisbach, Moody chart' },
      { icon: '🔁', id: 'cl4_pumpcurves',   title: 'Pump Theory & Characteristic Curves', desc: 'H-Q curve, system curve, duty point, VFD operation, pump selection — practical applications' }
    ],
    'Electrotechnology — Paper 3 (ET)': [
      { icon: '⚡', id: 'cl4_generators',  title: 'Marine Generators & Alternators',   desc: 'Synchronous alternator theory, AVR, parallel operation, synchroscope, load sharing — f=(PN)/120' },
      { icon: '🔌', id: 'cl4_motors',      title: 'Electric Motors & Starting',        desc: 'Squirrel cage induction motor, DOL starter, star-delta, VFD — motor protection, earthing' },
      { icon: '🛡️', id: 'cl4_protection',  title: 'Protection Devices & Switchboard',  desc: 'MCB, MCCB, preferential trip relays, earth fault detector — sequence of events on blackout' },
      { icon: '🔋', id: 'cl4_emergency',   title: 'Emergency Power & SOLAS',           desc: 'Emergency generator — auto-start within 45 sec (SOLAS Ch II-1), 18hr passenger/3hr cargo' }
    ],
    'Watchkeeping & Regulations — Oral': [
      { icon: '👁️', id: 'cl4_watch',      title: 'Engine Room Watchkeeping',          desc: 'STCW watch standards, handover procedure, standing orders, watch rounds, logbook entries' },
      { icon: '🔥', id: 'cl4_emergency2', title: 'Emergency Procedures — Oral Topics', desc: 'Fire in engine room, flooding, blackout — actions, reporting chain, emergency signals' },
      { icon: '📋', id: 'cl4_marpol_oral', title: 'MARPOL Compliance — Oral Topics',   desc: 'OWS 15 ppm, ORB Part I entries, oil spill procedure, garbage record book, ballast water' },
      { icon: '💬', id: 'cl4_oral_maintenance', title: 'Maintenance Q&A — Oral Topics', desc: 'Purifier overhaul, fuel pump overhaul, generator maintenance, steering gear test SOLAS' }
    ]
  }
},
{
  id: 'class3',
  rankColor: '#f59e0b',
  icon: '🔧',
  stageNum: 'STAGE 03',
  title: 'MEO Class II',
  fullTitle: 'Marine Engineer Officer Class II — Second Engineer Level',
  subtitle: 'Responsible for maintenance planning and operation of all shipboard machinery — direct deputy to Chief Engineer',
  tags: ['COC Class II', 'STCW A-III/2', 'Second Engineer', 'Management Level Approach'],
  eligibility: [
    { icon: '⏱️', text: '<strong>Sea Service:</strong> Minimum 36 months sea service in engine department; at least 12 months as OOW holding Class IV COC' },
    { icon: '📋', text: '<strong>Advanced Training:</strong> Ship simulator training, advanced firefighting, medical care or first aid onboard' },
    { icon: '🏥', text: '<strong>Medical:</strong> Valid ENG1/ML5 medical certificate' },
    { icon: '📝', text: '<strong>Examination:</strong> 5 written papers + oral at MMD — significantly more advanced than Class IV syllabus' },
    { icon: '⚖️', text: '<strong>Legal Basis:</strong> STCW Table A-III/2 (management level), Merchant Shipping Act 1958, DGS Circular 2 of 2010' },
    { icon: '🎓', text: '<strong>Leadership:</strong> Resource management and leadership training may be required depending on flag state' }
  ],
  examPapers: [
    { label: 'WRITTEN PAPER 1', title: 'Naval Architecture & Ship Stability', sub: 'Stability theory, GZ curve, IMO criteria, damage stability, trim, loadlines, resistance' },
    { label: 'WRITTEN PAPER 2', title: 'Applied Heat (Advanced Thermodynamics)', sub: 'Refrigeration, steam plant, boilers, heat exchangers, advanced thermodynamic cycles' },
    { label: 'WRITTEN PAPER 3', title: 'Marine Engineering Practice (MEP)', sub: 'Engine overhaul, maintenance planning, casualty procedures, propulsion systems, vibration' },
    { label: 'WRITTEN PAPER 4', title: 'Motor Engineering (Advanced ME)', sub: 'Advanced diesel systems, governors, control engineering, shaft systems, propeller theory' },
    { label: 'WRITTEN PAPER 5', title: 'Electrotechnology (Advanced ET)', sub: 'Advanced electrical machines, automation, PLCs, control systems, power electronics' },
    { label: 'ORAL EXAM',       title: 'MMD Oral — STCW Management Level', sub: 'Ship operations, resource management, casualty investigation, emergency response leadership' }
  ],
  sections: {
    'Naval Architecture & Ship Stability — Paper 1': [
      { icon: '⚖️', id: 'cl3_transverse',  title: 'Transverse Stability Theory',         desc: 'KB, KG, KM, BM, GM — full derivation from first principles, metacentre, IMO A.749 criteria' },
      { icon: '📊', id: 'cl3_gzcurve',      title: 'GZ Righting Lever Curve',             desc: 'Construction of GZ curve, IMO intact stability criteria, angle of loll, wall-sided formula' },
      { icon: '💧', id: 'cl3_freesurface',  title: 'Free Surface Effect',                 desc: 'Derivation GGₘ formula, effect on GM, tank filling strategies, centre-line divisions' },
      { icon: '🚢', id: 'cl3_trim',         title: 'Longitudinal Stability & Trim',       desc: 'BML, MCTC, TPC, FWA, DWA, shift of weight and addition of weight — trim calculations' },
      { icon: '🌊', id: 'cl3_damage',       title: 'Damage Stability',                    desc: 'SOLAS Reg II-1 one/two-compartment standard, permeability, lost buoyancy vs added weight' },
      { icon: '🔬', id: 'cl3_resistance',   title: 'Ship Resistance & Propulsive Efficiency', desc: 'Frictional (Froude/ITTC formula), wave-making, residuary resistance, form drag, wake fraction, thrust deduction' }
    ],
    'Refrigeration & Applied Heat — Paper 2': [
      { icon: '❄️', id: 'cl3_refrig',       title: 'Vapour Compression Refrigeration',    desc: 'P-h diagram, COP calculation, superheat/subcooling, refrigerants R134a, NH₃ (R717), CO₂ (R744)' },
      { icon: '🌡️', id: 'cl3_refrigsys',    title: 'Cargo Refrigeration Systems',         desc: 'Reefer ship systems, multi-temperature zones, controlled atmosphere, refrigerant charging' },
      { icon: '🔥', id: 'cl3_boilers',      title: 'Marine Boilers — Types & Operation',  desc: 'Scotch marine fire-tube, D-type water tube, exhaust gas boiler — construction, operation, SOLAS requirements' },
      { icon: '💧', id: 'cl3_boilerwater',  title: 'Boiler Water Treatment',              desc: 'Scale (CaCO₃, MgCO₃), corrosion, oxygen pitting — chemical dosing: Na₃PO₄, NaOH, hydrazine, TDS limits 3000–4500 ppm' },
      { icon: '♨️', id: 'cl3_steamplant',   title: 'Steam Plant & Rankine Cycle',         desc: 'Feed system, economiser, superheater, steam drum — improving Rankine efficiency with superheat and bleeding' }
    ],
    'Advanced Diesel & Propulsion — Paper 4': [
      { icon: '📈', id: 'cl3_perf',         title: 'Engine Performance Analysis',         desc: 'IHP, BHP, FHP, mechanical efficiency, SFOC, thermal efficiency, heat balance — actual worked calculations' },
      { icon: '⚙️', id: 'cl3_governor',     title: 'Governors & Fuel Regulation',         desc: 'Mechanical (Woodward), hydraulic, electronic governors — speed droop, isochronous, load sharing' },
      { icon: '🌀', id: 'cl3_propeller',    title: 'Propeller Theory',                    desc: 'Advance coefficient J, thrust coefficient Kt, torque Kq, Bp-δ diagram, cavitation number, optimum pitch' },
      { icon: '🌊', id: 'cl3_vibration',    title: 'Torsional & Axial Vibration',         desc: 'Critical speeds, barred speed range, vibration dampers, crankshaft deflection limits — MAN/Wärtsilä guidance' },
      { icon: '⛽', id: 'cl3_altfuels',     title: 'Alternative & Low-Carbon Fuels',      desc: 'LNG dual-fuel (MARPOL Annex VI, IGF Code), methanol, biofuels — properties, handling, FGSS system' }
    ],
    'Marine Engineering Practice — Paper 3': [
      { icon: '📋', id: 'cl3_pms',          title: 'Planned Maintenance System (PMS)',    desc: 'Classification society requirements, critical equipment list, maintenance intervals, deferrals, records' },
      { icon: '🔬', id: 'cl3_ndt',          title: 'Non-Destructive Testing (NDT)',       desc: 'UT thickness gauging, magnetic particle (MPI), dye penetrant (DPI), radiography — survey requirements' },
      { icon: '🧱', id: 'cl3_materials',    title: 'Marine Materials & Corrosion',        desc: 'IACS hull steel grades A/B/D/E, galvanic series, crevice corrosion, ICCP, zinc anodes, impressed current' },
      { icon: '⚙️', id: 'cl3_bearings',    title: 'Bearings, Shafts & Alignment',        desc: 'Journal bearing clearances, L₁₀ life, propeller shaft survey, stern tube seals, crankshaft deflection procedure' }
    ],
    'Regulations at Management Level': [
      { icon: '📜', id: 'cl3_solas',        title: 'SOLAS — All Chapters in Depth',       desc: 'Ch I–XIV complete: construction, fire, LSA, GMDSS, navigation, cargo, ISM, ISPS, polar — key regulation numbers' },
      { icon: '🌊', id: 'cl3_marpol',       title: 'MARPOL 73/78 — All 6 Annexes',       desc: 'Discharge criteria, certificates, record books, special areas — Annex I to VI — with latest 2021 amendments' },
      { icon: '💨', id: 'cl3_annex6',       title: 'MARPOL Annex VI — Air Pollution',     desc: 'SOx 0.5% global (Jan 2020), 0.1% ECA; NOx Tier I/II/III; EEDI, EEXI, CII A–E, SEEMP Part III from 2023' },
      { icon: '🏢', id: 'cl3_ism',          title: 'ISM Code — 12 Elements',              desc: 'Safety management system, DPA, DOC (company), SMC (ship), non-conformity reporting, internal/external audit' },
      { icon: '👷', id: 'cl3_stcw',         title: 'STCW 2010 Manila Amendments',         desc: 'Table A-III/2, minimum rest 10h/24h, 77h/7days; maximum work 14h/24h, 98h/7days; Manila: ECDIS, BRM, leadership' },
      { icon: '💧', id: 'cl3_bwm',          title: 'Ballast Water Management Convention',  desc: 'D-1 exchange (>200nm, >200m depth), D-2 treatment standard (BWTS type approval), BWM Certificate, record book' }
    ]
  }
},
{
  id: 'class1',
  rankColor: '#a78bfa',
  icon: '👨‍✈️',
  stageNum: 'STAGE 04',
  title: 'MEO Class I',
  fullTitle: 'Marine Engineer Officer Class I — Chief Engineer Officer Certificate of Competency',
  subtitle: 'The highest engineering qualification — full responsibility for all machinery, engine room management, energy efficiency and technical leadership',
  tags: ['COC Class I', 'Chief Engineer', 'STCW A-III/2 Senior', 'Management Level', 'IMO Decarbonisation'],
  eligibility: [
    { icon: '⏱️', text: '<strong>Sea Service:</strong> Minimum 36 months as Second/Chief Engineer holding Class II COC on vessels ≥3000 kW propulsion power' },
    { icon: '📋', text: '<strong>Management Training:</strong> Leadership & Resource Management (LRM) certificate, advanced firefighting, medical care onboard' },
    { icon: '🏥', text: '<strong>Medical:</strong> Valid ENG1/ML5 fitness certificate (renewed every 2 years)' },
    { icon: '📝', text: '<strong>Examination:</strong> Same 5 written papers as Class II (expected at higher analytical depth) + Chief Engineer Oral at MMD' },
    { icon: '🌐', text: '<strong>Current Knowledge:</strong> MARPOL Annex VI 2023 (CII/EEXI), IGF Code (LNG/alt fuels), PSC inspection experience' },
    { icon: '⚖️', text: '<strong>Authority:</strong> STCW Table A-III/2 (management level), DGS India, Merchant Shipping Act 1958 Section 76–80' }
  ],
  examPapers: [
    { label: 'ALL CLASS II PAPERS', title: 'Class II Written Papers (Advanced Depth)', sub: 'Same 5 subjects expected at Chief Engineer analytical and decision-making depth' },
    { label: 'CHIEF ORAL',          title: 'Chief Engineer MMD Oral Examination',      sub: 'Casualty management, ISM leadership, DPA communications, commercial operations, PSC' },
    { label: 'LEADERSHIP',          title: 'Leadership & Resource Management (LRM)',   sub: 'Bridge/engine resource management, crew management, fatigue awareness — STCW mandatory' },
    { label: 'ADVANCED FIRE',       title: 'Advanced Fire Fighting',                   sub: 'Incident command, team management, ship fire scenarios — STCW Reg VI/3' },
    { label: 'MEDICAL CARE',        title: 'Medical Care Onboard Ships',              sub: 'Required for Chief Engineers — serious medical emergencies, telemedicine, ISMC' }
  ],
  sections: {
    'Engine Room Management': [
      { icon: '👨‍✈️', id: 'ce_duties',      title: 'Chief Engineer Duties & Responsibilities', desc: 'STCW management level, standing orders, CE\'s daily duties, DPA interface, flag state/class communications' },
      { icon: '📊', id: 'ce_budget',       title: 'OPEX Budgeting & Maintenance Planning',   desc: 'Planned vs corrective maintenance costs, drydock budget preparation, spare parts inventory management' },
      { icon: '🔍', id: 'ce_risk',         title: 'Risk Assessment & HSEQ Systems',          desc: 'Risk matrices, permit-to-work (PTW), toolbox talks, near-miss reporting — ISM Element 7' },
      { icon: '📝', id: 'ce_dpa',          title: 'DPA Communications & Non-Conformity',     desc: 'Reporting to Designated Person Ashore, deficiency reports, non-conformity procedure, casualty reporting' }
    ],
    'Energy Efficiency & IMO Decarbonisation (2023+)': [
      { icon: '📈', id: 'ce_cii',          title: 'CII, EEXI & Annual Rating',               desc: 'Carbon Intensity Indicator A–E, EEXI for existing ships, attained vs required CII, corrective action plan' },
      { icon: '📋', id: 'ce_seemp',        title: 'SEEMP & Carbon Reduction Strategy',       desc: 'Ship Energy Efficiency Management Plan Part III — operational measures, voyage optimisation, fuel monitoring' },
      { icon: '⛽', id: 'ce_sfoc',         title: 'SFOC Optimisation & Fuel Management',     desc: 'Fuel consumption monitoring, trim/hull optimisation, injection timing, bunker quality management (ISO 8217)' },
      { icon: '🌱', id: 'ce_futurefuels',  title: 'Future Fuels — LNG, Methanol, Ammonia',  desc: 'IMO decarbonisation strategy (50% reduction by 2050), IGF Code, MARPOL VI — CE-level decision framework' }
    ],
    'Advanced Fault Diagnosis & Overhaul': [
      { icon: '🔬', id: 'ce_diagnosis',    title: 'Advanced Engine Fault Diagnosis',          desc: 'Indicator cards, lube oil spectrometric analysis, vibration signature, thermal imaging camera — CE-level' },
      { icon: '💥', id: 'ce_failures',     title: 'Catastrophic Failure Analysis',            desc: 'Crankshaft fracture, bearing seizure, piston burn-out, turbocharger surging/explosion — causes & prevention' },
      { icon: '🔧', id: 'ce_overhaul',    title: 'Major Overhaul Planning',                  desc: 'Piston/liner renewal, main bearing, crankshaft deflection taking, engine realignment procedure' },
      { icon: '⚠️', id: 'ce_casualty',    title: 'Machinery Casualty Management',           desc: 'Blackout recovery sequence, dead ship condition, emergency towing, MAIB reporting (UK) / DGSIS (India)' }
    ],
    'Port State Control & Commercial Operations': [
      { icon: '🌍', id: 'ce_psc',          title: 'Port State Control Inspections',          desc: 'PSC regimes (Paris MOU, Tokyo MOU, USCG), deficiency categories, detention grounds, pre-PSC checklist' },
      { icon: '⚖️', id: 'ce_law',          title: 'Maritime Law & CE Liability',             desc: 'P&I Club, collision liability, LLMC 1976/1996 Protocol, wreck removal convention, marine insurance' },
      { icon: '📑', id: 'ce_charter',      title: 'Charter Party & Off-hire Clauses',        desc: 'Time/voyage charter CE obligations, off-hire due to machinery breakdown, master/CE\'s commercial role' },
      { icon: '🎓', id: 'ce_oral_prep',    title: 'Chief Engineer Oral — Model Answers',     desc: 'Most common Chief Engineer MMD oral questions with model answers — covers all subject areas' }
    ]
  }
}
];


/* ═══════════════════════════════════════════════════════════════════════
   ZONE 4: TECHNICAL KNOWLEDGE BASE
   Sources: Reed's Marine Engineering Series (Vol 1-12), Pounder's Marine
   Diesel Engines (9th Ed), MAN B&W Project Guides, Alfa Laval manuals,
   IMO STCW 2010, MARPOL 2021 Consolidated, IMO Res A.749(18)
   ═══════════════════════════════════════════════════════════════════════ */
