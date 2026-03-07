/* MarineIQ — Topic Knowledge Patches
   Additional TOPIC_KNOWLEDGE entries and APP state extensions
   Requires: topic-knowledge.js loaded first
   DO NOT add logic here — data only */

/* ══ MISSING KB ENTRIES ══ */
/* ═══════════════════════════════════════════════════════════════════════
   MISSING KNOWLEDGE BASE — 4 entries
   ═══════════════════════════════════════════════════════════════════════ */
Object.assign(TOPIC_KNOWLEDGE, {

cl3_gzcurve: {
  formulas: [
    { label: 'GZ (Righting Lever)', eq: 'GZ = GM·sinθ  (for small angles θ < 15°)', note: 'At large angles use actual GZ curve from inclining experiment or hydrostatic tables. Source: D.J.Eyres Ch.6' },
    { label: 'IMO Stability Criteria', eq: 'GZ_max ≥ 0.20 m at θ ≥ 30° | Area 0–30° ≥ 0.055 m·rad | Area 0–40° ≥ 0.090 m·rad', note: 'IMO Resolution A.749(18). Plus: GM₀ ≥ 0.15 m. These are minimum — NOT targets.' },
    { label: 'Dynamical Stability', eq: 'Dynamical stability = Area under GZ curve (m·rad) from 0 to θ', note: 'Represents work done to heel vessel. Source: Reed\'s Vol.2 Ship Stability' },
    { label: 'Angle of Vanishing Stability', eq: 'AVS = angle where GZ curve returns to zero after maximum', note: 'Ship capsizes if heeled beyond AVS. Good ship: AVS > 60°. Measure from GZ curve.' }
  ],
  videos: [
    { title: 'GZ Curve Explained — Ship Stability', channel: 'Mariner\'s Academy', url: 'https://www.youtube.com/results?search_query=GZ+curve+ship+stability+explained' },
    { title: 'IMO Stability Criteria Walkthrough', channel: 'Naval Architecture Basics', url: 'https://www.youtube.com/results?search_query=IMO+stability+criteria+GZ+curve' }
  ],
  flashcards: [
    { q: 'What are the three IMO GZ curve criteria from A.749(18)?', a: '1) GZ_max ≥ 0.20 m at θ ≥ 30°. 2) Area under curve 0–30° ≥ 0.055 m·rad. 3) Area 0–40° ≥ 0.090 m·rad. Additionally GM₀ ≥ 0.15 m. All four must be satisfied simultaneously. Source: IMO Resolution A.749(18) — Intact Stability Code.' },
    { q: 'What is the angle of vanishing stability (AVS) and why is it important?', a: 'AVS is the angle at which the GZ curve returns to zero after the peak — beyond this the ship capsizes. A well-designed vessel should have AVS > 60°. On the GZ curve it appears as the second zero crossing. Source: D.J.Eyres, Ship Stability 6th Ed., Ch.7.' },
    { q: 'How does free surface effect (FSE) alter the GZ curve?', a: 'FSE reduces effective GM by GGm = (ρ_liq × i_fs)/(Δ). This shifts the entire GZ curve downward, reduces GZ_max, and reduces AVS. The effect is proportional to the CUBE of tank breadth. Divide tanks longitudinally to reduce FSE. Source: Reed\'s Vol.2.' }
  ]
},

cl3_refrigsys: {
  formulas: [
    { label: 'Refrigeration COP', eq: 'COP_R = Q_L / W_in = (h₁ - h₄) / (h₂ - h₁)', note: 'h₁ = enthalpy at compressor suction; h₂ = after compression; h₄ = after expansion valve. Source: Reed\'s Vol.3 Ch.4' },
    { label: 'Refrigerant Effect', eq: 'RE = h₁ - h₄  (kJ/kg)', note: 'Heat absorbed per kg of refrigerant in evaporator. Higher RE → more efficient system.' },
    { label: 'Compressor Discharge Temp', eq: 'T₂ = T₁ × (P₂/P₁)^((γ-1)/γ)  (isentropic)', note: 'Actual temp higher due to inefficiency. Excessive temp → oil carbonisation in compressor.' },
    { label: 'Superheat & Subcooling', eq: 'Superheat (suction) = 5–10°C above evaporating temp | Subcooling = 3–5°C below condensing temp', note: 'Superheat protects compressor from liquid slugging. Subcooling increases RE and prevents flash gas at expansion.' }
  ],
  videos: [
    { title: 'Marine Refrigeration Plant — Full System Walk-around', channel: 'Marine Engineering Academy', url: 'https://www.youtube.com/results?search_query=marine+refrigeration+system+walkthrough' },
    { title: 'Refrigerant Comparisons R134a vs R404A vs CO2', channel: 'Refrigeration Mentor', url: 'https://www.youtube.com/results?search_query=marine+refrigerant+R134a+R404A+CO2+comparison' }
  ],
  flashcards: [
    { q: 'What is superheat at suction and why is it critical?', a: 'Superheat is the temperature rise of refrigerant vapour above its saturation temperature at suction pressure. Maintained at 5–10°C. Purpose: ensures no liquid refrigerant enters compressor (liquid slugging destroys valves and bearings). Set by expansion valve adjustment. Source: Reed\'s Vol.3 Marine Refrigeration.' },
    { q: 'Compare R-134a, R-404A, NH₃ and CO₂ as ship refrigerants.', a: 'R-134a: GWP 1430, non-toxic, HFC being phased — cargo reefers. R-404A: GWP 3922, being replaced. NH₃ (R-717): GWP 0, toxic at 25 ppm TWA, excellent COP — large cargo vessels. CO₂ (R-744): GWP 1, non-toxic, transcritical cycle above 31°C, growing use. Source: IMO F-Gas regulations; Reed\'s Vol.3.' },
    { q: 'What causes high discharge temperature in a refrigeration compressor?', a: 'Causes: 1) High suction superheat (too much), 2) High compression ratio (low suction / high discharge pressure), 3) Insufficient cooling water to intercooler, 4) High ambient temperature, 5) Wrong refrigerant charge. Effect: oil carbonisation, valve failure, reduced compressor life. Source: Refrigeration Troubleshooting — Reed\'s Vol.3.' }
  ]
},

cl4_indicator: {
  formulas: [
    { label: 'Mean Effective Pressure (MEP)', eq: 'MEP = Area of indicator card / (Length of card × Spring scale)', note: 'Unit: bar. Area by planimeter or mid-ordinate rule. Source: Reed\'s Vol.12 Ch.3' },
    { label: 'Indicated Horsepower (IHP)', eq: 'IHP = (Pm × L × A × N) / 60,000  kW\nPm = MEP (kN/m²) | L = stroke (m) | A = bore area (m²) | N = power strokes/min', note: 'For 2-stroke: N = RPM. For 4-stroke: N = RPM/2. Source: Reed\'s Vol.1 Ch.8' },
    { label: 'Diagram Factor', eq: 'Diagram Factor = Actual MEP / Theoretical MEP  (typically 0.85–0.90)', note: 'Accounts for valve timing losses, heat loss, friction. Used to estimate actual from theoretical IHP.' },
    { label: 'Power Balance', eq: 'BHP = IHP × η_mech\nη_mech typically 85–92% for large 2-stroke diesel', note: 'BHP measured by torsionmeter or fuel consumption. IHP from indicator cards.' }
  ],
  videos: [
    { title: 'Indicator Diagrams — Full Explanation & Fault Reading', channel: 'Marine Diesel Engines', url: 'https://www.youtube.com/results?search_query=indicator+diagram+marine+diesel+fault+reading' },
    { title: 'How to Take Indicator Cards on Ship', channel: 'Chief Engineer Academy', url: 'https://www.youtube.com/results?search_query=how+to+take+indicator+cards+ship+engine' }
  ],
  flashcards: [
    { q: 'What is the difference between a power card and a draw card?', a: 'Power card (full spring): taken at full engine speed with a stiff spring — shows actual combustion pressures. Used to calculate MEP and IHP. Draw card (light spring): taken with soft spring while slowly turning engine — shows valve timing, port opening/closing timing. Used to check valve timing and diagnose valve faults. Source: Reed\'s Vol.12 Instrumentation.' },
    { q: 'How do you identify a leaky exhaust valve from an indicator card?', a: 'Leaky exhaust valve shows: 1) Loss of pressure near TDC on compression stroke (pressure leaks through valve early), 2) Low maximum pressure (Pmax), 3) Curve drops sharply after TDC. Other faults: Late fuel injection = Pmax occurs after TDC. Broken piston ring = compression pressure low. Source: MAN B&W Engine Diagnostics Manual.' },
    { q: 'How is MEP calculated from an indicator card using the mid-ordinate method?', a: 'Draw equally-spaced vertical lines across the card. Measure height of each ordinate. Average the heights. Divide average height by spring number (bar/mm) to get MEP in bar. Formula: MEP = (Sum of ordinates / Number of ordinates) / Spring number. Alternatively use planimeter to find card area then divide by length × spring. Source: Reed\'s Vol.1.' }
  ]
},

cl4_pumpcurves: {
  formulas: [
    { label: 'Affinity Laws — Speed Change', eq: 'Q₂/Q₁ = N₂/N₁  |  H₂/H₁ = (N₂/N₁)²  |  P₂/P₁ = (N₂/N₁)³', note: 'Reduce speed 20% → flow drops 20%, head drops 36%, power drops 49%. Source: Reed\'s Vol.6 Hydraulics' },
    { label: 'System Curve', eq: 'H_system = H_static + k·Q²', note: 'H_static = static head (fixed). k·Q² = friction losses (variable). Operating point = intersection of pump curve and system curve.' },
    { label: 'Pumps in Series', eq: 'Q_total = Q (same) | H_total = H₁ + H₂', note: 'Series pumps: add heads at same flow. Use when high head needed. Risk: overpressure second pump.' },
    { label: 'Pumps in Parallel', eq: 'Q_total = Q₁ + Q₂ (at same H) | H_total = H (same)', note: 'Parallel pumps: add flows at same head. Use when high flow needed. Operating point shifts right on system curve.' }
  ],
  videos: [
    { title: 'Pump Characteristic Curves Explained', channel: 'The Engineering Mindset', url: 'https://www.youtube.com/results?search_query=pump+characteristic+curves+explained+centrifugal' },
    { title: 'Series vs Parallel Pumps — Marine Application', channel: 'Marine Engineering Simplified', url: 'https://www.youtube.com/results?search_query=pumps+series+parallel+marine+engineering' }
  ],
  flashcards: [
    { q: 'If a centrifugal pump speed is reduced from 1800 to 1440 RPM (20% reduction), what happens to power?', a: 'Using Affinity Law: P₂/P₁ = (N₂/N₁)³ = (1440/1800)³ = (0.8)³ = 0.512. Power reduces to 51.2% of original — nearly halved. This is why VFDs (Variable Frequency Drives) give enormous energy savings. Even a 20% speed reduction saves ~49% power. Source: Reed\'s Vol.6 Ch.5.' },
    { q: 'What is the operating point of a centrifugal pump and how does it change with a more resistive system?', a: 'Operating point is where pump H-Q curve intersects system curve (H = H_static + kQ²). If system resistance increases (valve partly closed, longer pipe), the system curve steepens — operating point moves left (lower flow, higher head). If resistance decreases, operating point moves right (higher flow, lower head, risk of motor overload). Source: Reed\'s Vol.6.' },
    { q: 'Why would two pumps be connected in parallel rather than series on a ship?', a: 'Parallel connection when HIGH FLOW is needed at moderate head — e.g. ballast pumps, bilge pumps. Both pumps deliver into common header; total flow ≈ doubled at same head. Series connection when HIGH HEAD is needed — e.g. boiler feed pumps against high pressure. Important: in parallel, each pump must have a NRV to prevent backflow through the idle pump. Source: Reed\'s Vol.6.' }
  ]
}

}); // end Object.assign

/* ── Add diagram mappings for the 4 new entries ── */
Object.assign(TOPIC_DIAGRAMS, {
  cl3_gzcurve:    ['gz_curve'],
  cl3_refrigsys:  ['refrig_cycle'],
  cl4_indicator:  ['indicator_diagram', 'two_stroke_engine'],
  cl4_pumpcurves: ['pump_curve'],
});


/* ══ MEGA UPGRADE — Year Syllabus · Sidebar · Dashboard · Search · Nav ══ */
/* ═══════════════════════════════════════════════════════════════════════
   MEGA UPGRADE PATCH
   • Year-wise MMD syllabus
   • Rich sidebar (bookmarks, recent, progress, difficulty, est. time)
   • Home dashboard (streak, stats, continue card, progress)
   • Global topic search
   • Next/Prev topic navigation
   • Topic completion + tab memory
   • Dark/light mode
   • Oral question bank additions
   ═══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════════
   1. EXTENDED APP STATE
   ══════════════════════════════════════════════════════════════════ */
Object.assign(APP, {
  bookmarks:    JSON.parse(localStorage.getItem('miq_bookmarks')    || '[]'),
  recentTopics: JSON.parse(localStorage.getItem('miq_recent')       || '[]'),
  streak:       JSON.parse(localStorage.getItem('miq_streak')       || '{"count":0,"last":""}'),
  stats:        JSON.parse(localStorage.getItem('miq_stats')        || '{"fcFlipped":0,"quizTaken":0,"aiAsked":0}'),
  tabMemory:    JSON.parse(localStorage.getItem('miq_tabmemory')    || '{}'),
  lightMode:    localStorage.getItem('miq_lightmode') === 'true',
  lastLevel:    localStorage.getItem('miq_lastlevel')  || null,
  lastTopic:    localStorage.getItem('miq_lasttopic')  || null,
});

