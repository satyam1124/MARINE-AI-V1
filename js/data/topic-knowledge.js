/* MarineIQ — Per-Topic Knowledge Base
   Each entry: formulas, flashcards, videos per topic ID
   Loaded by: topic-panel.js, ai-engine.js
   DO NOT add logic here — data only */

const TOPIC_KNOWLEDGE = {

  /* ── BASIC SAFETY ── */
  bst_survival: {
    formulas: [
      { label: 'Time of Immersion Survival',  eq: 'Core temperature drops ~2°C per hour in 15°C water', note: 'Use survival suit to extend survival time 4–8×. Source: STCW A-VI/1-1' },
      { label: 'EPIRB Registration',          eq: 'MMSI: 9 digit Maritime Mobile Service Identity', note: 'First 3 digits = country MID. 406 MHz COSPAS-SARSAT. SOLAS Ch IV Reg 7' }
    ],
    videos: [
      { id: 'TpNpgvxPLvg', title: 'Immersion Suit Donning Procedure (60 seconds)',        ch: 'Norwegian Rescue' },
      { id: 'JA_PJlXFB5c', title: 'Life Raft Inflation & Boarding at Sea',               ch: 'RINA Safety' },
      { id: 'GKJa0NxL6Hs', title: 'EPIRB & SART — How They Work', ch: 'SeaSafetyGroup' }
    ],
    flashcards: [
      { q: 'What is the SOLAS requirement for an EPIRB on cargo ships?', a: 'SOLAS Ch IV Reg 7: At least 1 float-free 406 MHz satellite EPIRB on each side of bridge for ships ≥300 GT on international voyages. Must be registered with flag state, MMSI programmed, battery expiry checked annually.' },
      { q: 'Name 4 types of distress signal and their uses.', a: '1) Parachute rocket flare — visible 40nm in clear weather, burns 40+ sec at 300m altitude. 2) Hand flare — close range, burns 60 sec. 3) Orange smoke — daytime only, attracts SAR aircraft. 4) EPIRB/SART — electronic, for GMDSS/radar detection by SAR. Source: SOLAS Ch III Reg 6.' },
      { q: 'What is HELP position and why is it used in cold water?', a: 'Heat Escape Lessening Posture — knees drawn to chest, arms tight to body, protecting groin/armpits/neck. Reduces body heat loss by ~50% compared to swimming. Extends survival time significantly in cold water (STCW A-VI/1).' },
      { q: 'What checks should you perform on a lifeboat weekly?', a: 'SOLAS weekly: visual check of condition, engine start (3 min or until warm), lights operational, compressed air pressure, fuel level. Monthly: full operation test. Annual: serviced by approved service station. Source: SOLAS Ch III Reg 20.' }
    ]
  },

  /* ── 2-STROKE ENGINE ── */
  cl4_2stroke: {
    formulas: [
      { label: 'Indicated Horse Power (IHP)',  eq: 'IHP = (Pm × L × A × n) / 60,000   [kW]',           note: 'Pm=MEP(bar), L=stroke(m), A=piston area(m²), n=rev/min (×cyl count for total). Source: Reed\'s Vol.5' },
      { label: 'Mean Effective Pressure',      eq: 'MEP = (Card area × Spring rate) / Card length',      note: 'From indicator diagram. Spring rate in bar/mm. Typical MCR MEP: 18–22 bar' },
      { label: 'Shaft Horsepower / BHP',       eq: 'BHP = IHP − FHP   (BHP = IHP × η_mech)',            note: 'FHP = friction. η_mech typically 85–92% for crosshead 2-stroke' },
      { label: 'Specific Fuel Oil Consumption',eq: 'SFOC = (ṁ_fuel [kg/h] × 1000) / P_shaft [kW]  [g/kWh]', note: 'Modern ME-C/GI series: ~155–175 g/kWh at MCR. Source: MAN B&W Project Guide' },
      { label: 'Stroke-to-Bore Ratio',         eq: 'S/B ratio = stroke / bore diameter',               note: 'Modern long-stroke 2-stroke: 3.0:1 to 4.2:1 (e.g., S80ME-C: 3,380/800 = 4.23:1)' }
    ],
    videos: [
      { id: 'HQnBPR9jl4k', title: 'How a 2-Stroke Marine Diesel Engine Works',      ch: 'Wartsila' },
      { id: 'aUgEiqd2dXM', title: 'MAN B&W Two-Stroke Marine Engine Animation',     ch: 'MAN Energy Solutions' },
      { id: 'TC2FY7Bw3Ag', title: 'Uniflow Scavenging Explained in Detail',         ch: 'Marine Insight' }
    ],
    flashcards: [
      { q: 'Explain uniflow scavenging in a 2-stroke marine diesel engine.', a: 'Charge air enters through ports near BDC (bottom of liner), exits through the exhaust valve at top of cylinder head. Air travels in one direction — bottom to top — same direction as upward piston travel. Results in: better cylinder gas exchange, less short-circuiting, better cylinder cooling, lower scavenge pressure required. Used in all modern MAN B&W and Wärtsilä RT-flex engines. Source: Pounder\'s Ch 2.' },
      { q: 'What is the firing order of a 6-cylinder 2-stroke engine and why?', a: 'Standard: 1-4-2-6-3-5. In a 2-stroke each cylinder fires every 360° crank rotation (one firing per revolution). The firing order ensures equal angular spacing between firings (60° between each in a 6-cylinder) for balanced torque output and reduced vibration. Source: MAN B&W Engine Builder.' },
      { q: 'What is SFOC, give a typical value and explain what affects it.', a: 'Specific Fuel Oil Consumption — grams of fuel per kWh of shaft power. Modern MAN B&W S/ME-C9 at 100% MCR: ~165 g/kWh. Affected by: (1) Load — best SFOC at 75–85% MCR. (2) Injection timing — early injection raises peak pressure, slightly better SFOC. (3) Turbocharger condition — fouled T/C increases SFOC 3–5%. (4) Fuel quality — lower calorific value HFO. Source: MAN B&W Performance Data Sheet.' },
      { q: 'What does a "late injection" fault show on an indicator diagram?', a: 'Late fuel injection: (1) Power card shows delayed, lower, rounded pressure peak — occurs ATDC instead of at TDC. (2) Lower MEP → reduced power on that cylinder. (3) High exhaust temperature — combustion continues into expansion stroke. (4) Draw card shows late pressure rise after TDC marker. Cause: worn fuel pump plunger/barrel, incorrect timing setting, blocked injector spray holes, VIT setting. Source: Pounder\'s Ch 6.' },
      { q: 'Why is starting air pressure set at 25–30 bar?', a: '25–30 bar is sufficient to overcome compression pressure (~40–50 bar at cranking speed is needed) and rotate engine to minimum firing speed (~40–60 RPM for fuel injection to be effective). Higher pressure wastes energy and requires heavier pipework; lower pressure may fail to start against back-pressure in port. Source: Reed\'s Vol.5, Chapter: Engine Starting Systems.' }
    ]
  },

  /* ── TURBOCHARGER ── */
  cl4_turbo: {
    formulas: [
      { label: 'Pressure Ratio (Turbocharger)', eq: 'PR = P_boost / P_atm (absolute)',          note: 'Typical modern marine T/C: PR = 3.5–4.5. Source: ABB Turbocharging Technical Manual' },
      { label: 'Isentropic Efficiency',          eq: 'η_is = (T₂s − T₁) / (T₂act − T₁)',      note: 'T in Kelvin. Typical compressor η_is = 78–84%' },
      { label: 'Temperature Rise (Compressor)',  eq: 'T₂ = T₁ × (1 + (PR^((γ-1)/γ) − 1)/η_c)',note: 'γ=1.4 for air. T in Kelvin. Shows benefit of intercooling.' }
    ],
    videos: [
      { id: 'VZMg7n8Y0MM', title: 'Marine Turbocharger — How It Works',            ch: 'ABB Turbocharging' },
      { id: 'v_aAIfB3Rcs', title: 'Turbocharger Surging — Causes & Effects',       ch: 'Marine Online' },
      { id: 'p7xV5I-VwxI', title: 'Turbocharger Water Washing Procedure',          ch: 'MAN Diesel & Turbo' }
    ],
    flashcards: [
      { q: 'What is turbocharger surging? State causes and symptoms.', a: 'Surge = cyclical flow reversal in centrifugal compressor when operating left of surge line on compressor map. Causes: (1) Low engine load / low exhaust gas energy. (2) Fouled/restricted turbine nozzle ring. (3) Excessive back pressure on air side. (4) Sudden large load reduction. Symptoms: loud banging/pulsating noise from compressor, fluctuating boost pressure, black exhaust smoke, engine speed instability. Source: ABB Technical Manual.' },
      { q: 'Describe the two T/C cleaning methods — when and why?', a: '1) Online water washing (compressor side): Engine at 50–60% load, distilled water injected into compressor inlet. Dissolves salt deposits, removes fouling. Do weekly or as needed. 2) Offline grit blasting (turbine side): Engine stopped, walnut shells or cornstarch grit blown through turbine. Removes hard carbonaceous deposits from nozzle ring and rotor blades. Cannot do online due to high temperatures. Source: MAN B&W Engine Operating Manual.' },
      { q: 'What type of bearings do marine turbochargers use?', a: 'Floating ring plain (sleeve) bearings — self-adjusting rings float between shaft and housing, creating two oil films. Lubricated by main engine lube oil system at 3–5 bar. High-speed T/Cs (>20,000 RPM) may use ball/roller bearings. Key maintenance: check LO pressure/temperature, clean oil strainer, replace at class interval. Source: Pounder\'s Ch 5.' }
    ]
  },

  /* ── PUMPS ── */
  cl4_pumps: {
    formulas: [
      { label: 'Euler Pump Equation',  eq: 'Hth = (u₂Vw₂ − u₁Vw₁) / g   [m]',         note: 'u=blade tip velocity, Vw=whirl velocity component. Source: Reed\'s Vol.6 Ch 2' },
      { label: 'Affinity Law — Flow',  eq: 'Q₁/Q₂ = N₁/N₂',                            note: 'Flow proportional to speed' },
      { label: 'Affinity Law — Head',  eq: 'H₁/H₂ = (N₁/N₂)²',                         note: 'Head proportional to speed squared' },
      { label: 'Affinity Law — Power', eq: 'P₁/P₂ = (N₁/N₂)³',                         note: 'Power proportional to cube of speed — VFD saves huge energy!' },
      { label: 'NPSH Available',       eq: 'NPSHa = (Patm − Pv)/ρg + Zs − hfs  [m]',   note: 'Must exceed NPSHr by safety margin. Pv=vapour pressure at operating temp' }
    ],
    videos: [
      { id: 'GBEVFVJuJAc', title: 'Centrifugal Pump — Working Principle Animation',  ch: 'The Engineering Mindset' },
      { id: 'gKBVFdBbN3k', title: 'Pump Curves & System Curves Explained',           ch: 'Pump Engineering' },
      { id: 'TSHCqSRbXKQ', title: 'Cavitation in Pumps — Causes & Effects',         ch: 'KSB Group' }
    ],
    flashcards: [
      { q: 'Explain cavitation in a centrifugal pump and how to prevent it.', a: 'Cavitation occurs when local pressure at impeller eye drops below vapour pressure of liquid, forming vapour bubbles. Bubbles collapse violently on high-pressure side, causing pitting/erosion of impeller, noise (rattling, like gravel), vibration, reduced flow and head. Prevention: (1) Maintain adequate NPSHa > NPSHr + 0.5m margin. (2) Never throttle pump suction valve. (3) Reduce suction lift height. (4) Cool the liquid. (5) Increase impeller eye size (larger pump). Source: Reed\'s Vol.6.' },
      { q: 'State the three affinity laws and their engineering significance.', a: 'For a centrifugal pump at constant impeller diameter: Q∝N (flow). H∝N² (head). P∝N³ (shaft power). Significance: Halving pump speed (with VFD) → halves flow, quarters head, reduces power to 1/8. In marine practice: seawater cooling pump VFD running at 70% rated speed → power consumption drops to 34% of full speed. Massive energy and CII improvement. Source: Reed\'s Vol.6 / ISO 9906.' },
      { q: 'When do you run two identical pumps in parallel vs series?', a: 'Parallel: both pumps feed same discharge header at same head. Result: flow approximately doubles, same head. Use when: high flow needed against moderate system resistance (ballast system with multiple valves open). Series: first pump discharges into second pump\'s suction. Result: head doubles, same flow. Use when: high head needed at lower flow (fuel booster pump before injection, or fire pump delivering to upper decks). Source: Reed\'s Vol.6 Ch 3.' }
    ]
  },

  /* ── PURIFIER ── */
  cl4_purifier: {
    formulas: [
      { label: 'Centrifugal Separation Force', eq: 'F_centrifugal = m × ω² × r',               note: 'ω=angular velocity (rad/s), r=radius (m). At 7000 RPM: ~8000×g separation force' },
      { label: 'Stokes\' Law (Separation)',      eq: 'v = d²(ρ₁-ρ₂)ω²r / (18μ)',              note: 'd=particle diameter, μ=dynamic viscosity. Smaller Δρ needs higher ω or longer time' },
      { label: 'Density @ Operating Temp',       eq: 'ρ_oil ≈ ρ₁₅ − α(T−15)  [kg/m³]',       note: 'α≈0.7 kg/m³/°C for HFO. Critical for gravity disc selection' }
    ],
    videos: [
      { id: 'qXbOEbDq2RY', title: 'Alfa Laval FOPX Purifier — Working Principle',    ch: 'Alfa Laval Official' },
      { id: 'j9aM_kMmOkQ', title: 'Gravity Disc Selection for HFO Purifier',          ch: 'MarineGyaan' },
      { id: 'Pz3fDZ1QXLM', title: 'Purifier Overhaul Step by Step',                  ch: 'Marine Engineering Tutorial' }
    ],
    flashcards: [
      { q: 'What is the function of the gravity disc and how is the correct size selected?', a: 'Gravity disc controls position of oil/water interface (neutral zone) inside the rotating bowl. Bore diameter determines interface radius. Selection: use maker\'s gravity disc chart based on density difference (ρ_water − ρ_oil at operating temperature). Too small bore → interface moves inward → water contaminates clean oil. Too large bore → interface moves outward → oil exits with sludge (waste). Change disc when switching between different fuel oil densities. Source: Alfa Laval FOPX Instruction Manual.' },
      { q: 'Why is HFO purified at 95–98°C?', a: '(1) Reduces kinematic viscosity of HFO from ~380 cSt at 50°C to ~15–20 cSt at 98°C — oil flows freely through bowl. (2) Increases density difference between oil and water → better separation efficiency (Stokes\' Law). (3) Reduces surface tension at oil/water interface. CAUTION: do not exceed 98°C — risk of steam flashing in bowl, violent desludge. MDO/MGO purified at 40°C. Source: Alfa Laval FOPX Instruction Manual.' },
      { q: 'What is the difference between a purifier and a clarifier?', a: 'Purifier: separates water AND solids from oil. Has gravity disc fitted, water seal maintained. Three outlets: clean oil (top), water (disc), sludge (periodic). Used for HFO/MDO fuel treatment. Clarifier: no gravity disc, no water outlet. Only removes solid particles from oil that is already water-free. One clean oil outlet, sludge discharge periodic. Used as second stage lube oil cleaning after purifier. Source: Alfa Laval Technical Documentation.' }
    ]
  },

  /* ── FRESH WATER GENERATOR ── */
  cl4_fwg: {
    formulas: [
      { label: 'Production Rate',       eq: 'P = Q_heat / (L_vap × ρ_fw)  [m³/day]',           note: 'Q_heat from jacket water; L_vap≈2,400 kJ/kg at 45°C. Source: Wartsila FWG Manual' },
      { label: 'Salinometer Limit',     eq: 'Conductivity ≤ 30 µS/cm ≈ ≤10 ppm NaCl',          note: 'WHO drinking water guideline. SOLAS drinking water standard' },
      { label: 'Vacuum Pressure',       eq: 'Pabs = 0.05–0.10 bar → Tboil = 32–45°C',          note: 'Sea water boils at reduced temp under vacuum — uses jacket water waste heat' }
    ],
    videos: [
      { id: 'yC9GEr3tCaQ', title: 'Fresh Water Generator — How It Works (Vacuum Type)', ch: 'The Engineering Mindset' },
      { id: '8TZEM0T2BoY', title: 'Alfa Laval JWP Fresh Water Generator Explained',     ch: 'Alfa Laval Official' }
    ],
    flashcards: [
      { q: 'Why is a fresh water generator never operated in port and within 20 nm of land?', a: 'MARPOL Annex IV and port health authority regulations prohibit production within 20 nm of land due to risk of microbiological contamination (E.coli, Vibrio cholerae etc.) from coastal pollution. Jacket water heat quality may also be insufficient at low port loads. Restart only when >20 nm from nearest land in open ocean. Source: WHO Guidelines for Drinking-water Quality at Sea; MARPOL Annex IV.' },
      { q: 'What is the maximum allowable salinity in produced fresh water and why?', a: 'Maximum 10 ppm (parts per million) NaCl measured by salinometer/conductivity meter (≤30 µS/cm). Above this: not fit for human consumption, and may cause boiler scale in auxiliary boilers. If salinity rises: reduce FWG load, check condenser/evaporator condition, check brine level. Source: SOLAS Reg III/35, WHO Drinking Water Standards.' }
    ]
  },

  /* ── OWS ── */
  cl4_ows: {
    formulas: [
      { label: 'MARPOL Annex I Limit',   eq: 'Oil content ≤ 15 ppm in effluent discharged at sea',    note: '0 ppm in Special Areas (Baltic, Mediterranean, etc.). Source: MARPOL Annex I Reg 14/15' },
      { label: 'Gravity Separation',     eq: 'Rise velocity v = d²(ρw−ρo)g / (18μ)',                 note: 'Stokes\' Law — larger oil droplets separate faster. Primary stage only.' }
    ],
    videos: [
      { id: 'TqwSfMmD3pY', title: 'Oily Water Separator — Working Principle',        ch: 'Marine Insight' },
      { id: '9FKEpP8_k30', title: 'MARPOL ORB Part I — Correct Entries',            ch: 'MarineGyaan' }
    ],
    flashcards: [
      { q: 'What is the MARPOL Annex I discharge standard for machinery space bilge water?', a: '15 ppm oil content limit when discharging at sea outside special areas. Ship must be: (1) NOT in a special area. (2) Not less than 12 nm from nearest land. (3) Underway. (4) OCM in operation showing ≤15 ppm. (5) Overboard discharge valve must not bypass OCM. In special areas (Baltic, Mediterranean, Black Sea, etc.): 0 ppm (no discharge). ORB Part I entries mandatory. Source: MARPOL 73/78 Annex I, Regulation 14, 15.' },
      { q: 'What must be recorded in the Oil Record Book Part I and when?', a: 'Every oily operation must be recorded within 24 hours: (A) Ballasting/cleaning of fuel tanks, (B) Discharge of dirty ballast, (C) Collection/disposal of oil residues (sludge), (D) Overboard discharge of bilge water (with 15 ppm certificate reading), (E) Accidental/exceptional discharge. Each entry: date, time, ship position (lat/long), amount, signature of officer in charge and Master. Retained onboard 3 years. Subject to PSC inspection. Source: MARPOL Annex I Reg 17.' }
    ]
  },

  /* ── THERMODYNAMICS ── */
  cl4_thermo: {
    formulas: [
      { label: 'First Law — Closed System',    eq: 'Q − W = ΔU   [kJ]',                              note: 'Q=heat added, W=work done by system, ΔU=internal energy change. Source: Rogers & Mayhew' },
      { label: 'First Law — Steady Flow',      eq: 'q − w = Δh + ΔKE + ΔPE   [kJ/kg]',              note: 'h=specific enthalpy — applies to turbines, compressors, nozzles' },
      { label: 'Carnot Efficiency',            eq: 'η_Carnot = 1 − T_L/T_H   (T in Kelvin)',         note: 'Theoretical MAXIMUM — no real engine can exceed this' },
      { label: 'Diesel Cycle Efficiency',      eq: 'η_D = 1 − [r^(1−γ)] × [(rc^γ−1)/(γ(rc−1))]',   note: 'r=compression ratio, rc=cutoff ratio, γ=1.4 for air. Source: Reed\'s Vol.2' },
      { label: 'Rankine Cycle Efficiency',     eq: 'η_R = (h₁ − h₂) / (h₁ − h₄)',                   note: 'h=enthalpy at cycle states from steam tables. Superheat improves η.' }
    ],
    videos: [
      { id: '8N1BxHgsoOw', title: 'Laws of Thermodynamics — Complete Engineering Guide', ch: 'The Engineering Mindset' },
      { id: '4i1MUWJoI0U', title: 'Diesel Cycle PV & TS Diagrams — Worked Examples',    ch: 'Michel van Biezen' },
      { id: 'dVZFSHzuvpM', title: 'Steam Tables — How to Read for Marine Engineers',   ch: 'MarineGyaan' }
    ],
    flashcards: [
      { q: 'State the First Law of Thermodynamics for a closed system with an engineering example.', a: 'Q − W = ΔU: energy entering a closed system as heat minus work done by system equals change in internal energy. Marine example: combustion in diesel cylinder — heat Q released by burning HFO, work W done on piston → hot exhaust gases expelled (ΔU reduced). First Law confirms: improving fuel combustion (↑Q) or reducing friction (↓losses) improves net work W. Source: Rogers & Mayhew, Engineering Thermodynamics.' },
      { q: 'Why can no marine diesel engine reach Carnot efficiency?', a: 'Carnot η = 1 − T_cold/T_hot (Kelvin). Carnot is theoretical maximum for reversible cycles only. Real engines: (1) Combustion is irreversible — entropy generated. (2) Friction losses in bearings/pistons. (3) Heat losses to cylinder walls and cooling water. (4) Incomplete combustion. (5) Gas leakage past rings. Typical thermal efficiency of modern 2-stroke: 52–54% (best in class). Carnot theoretical maximum with same temperatures would be ~65–70%. Source: Pounder\'s Ch 1.' },
      { q: 'Explain dryness fraction of steam and its importance.', a: 'Dryness fraction x = mass of dry saturated vapour / total mass of wet mixture. x=0: saturated water. x=1: dry saturated steam. x=0.95: 95% vapour, 5% water droplets. Use in steam tables: h = hf + x·hfg. Importance: wet steam (low x) erodes turbine blades by droplet impingement, reduces efficiency, causes water hammer in pipes. Maintain x≥0.95 — achieved by superheating steam or adequate steam drum separation. Source: Reed\'s Vol.2 Ch 5.' }
    ]
  },

  /* ── BERNOULLI / FLUID MECHANICS ── */
  cl4_bernoulli: {
    formulas: [
      { label: 'Bernoulli\'s Equation',   eq: 'P₁/ρg + V₁²/2g + Z₁ = P₂/ρg + V₂²/2g + Z₂ + hL   [m]', note: 'Total head conserved for steady, incompressible, inviscid flow along streamline. Source: Reed\'s Vol.6' },
      { label: 'Continuity Equation',     eq: 'ρ₁A₁V₁ = ρ₂A₂V₂  → A₁V₁ = A₂V₂ (incompressible)',       note: 'Mass conservation. Velocity increases where area decreases.' },
      { label: 'Reynolds Number',         eq: 'Re = ρVD/μ = VD/ν',                                         note: '<2100 laminar, >4000 turbulent, 2100–4000 transitional' },
      { label: 'Darcy-Weisbach',          eq: 'hf = f × (L/D) × V²/(2g)   [m]',                           note: 'f from Moody chart based on Re and ε/D (relative roughness)' },
      { label: 'Venturi Meter Flow',      eq: 'Q = Cd × A₂ × √(2g × Δh / (1−(A₂/A₁)²))',                note: 'Cd≈0.97–0.99 for venturi. Δh = differential head' }
    ],
    videos: [
      { id: 'TcMgkU3pFBY', title: 'Bernoulli\'s Principle Explained with Real Examples', ch: 'The Engineering Mindset' },
      { id: 'O1hMFPHkCfw', title: 'Reynolds Number — Laminar vs Turbulent Flow',        ch: 'Practical Engineering' },
      { id: 'N-PbFkV28vI', title: 'Venturi Meter & Pitot Tube — Marine Applications',   ch: 'LearnEngineering' }
    ],
    flashcards: [
      { q: 'State Bernoulli\'s equation and its practical assumptions.', a: 'P/ρg + V²/2g + Z = constant along a streamline. Assumptions: (1) Steady flow (not time-varying). (2) Incompressible fluid (ρ = constant). (3) Inviscid (no friction — ideal). (4) Flow along a single streamline. Marine applications: Venturi flowmeter on fuel oil line, pitot tube for sea speed log, ejector pump principle, nozzle design. For real flows with losses: add head loss term hL. Source: Reed\'s Vol.6 Ch 1.' },
      { q: 'What does Reynolds number tell you about pipe flow? Give values.', a: 'Re = ρVD/μ — ratio of inertial to viscous forces. Re < 2100: laminar flow (smooth, layered, low friction). Re > 4000: turbulent flow (chaotic mixing, higher friction factor). 2100–4000: transitional (unstable). Marine significance: most ship piping runs turbulent at operational velocities. Use Moody chart to find friction factor f for Darcy-Weisbach head loss calculation. High viscosity HFO → lower Re, more laminar → different pressure drops in fuel system. Source: Reed\'s Vol.6.' }
    ]
  },

  /* ── GENERATORS ── */
  cl4_generators: {
    formulas: [
      { label: 'Synchronous Speed',        eq: 'Ns = (120 × f) / P   [RPM]',                   note: 'f=frequency (Hz), P=number of poles. 4-pole at 60Hz: Ns=1800 RPM' },
      { label: 'Frequency',                eq: 'f = (P × N) / 120   [Hz]',                      note: 'N=actual RPM. Marine standard: 60 Hz (most) or 50 Hz depending on flag/flag state' },
      { label: 'Percentage Regulation',    eq: '%VR = (V_NL − V_FL) / V_FL × 100%',            note: 'Good AVR keeps %VR <2–3%. No-load to full-load voltage change' }
    ],
    videos: [
      { id: 'AQqyGNOP_3o', title: 'Marine Generator — Synchronous Alternator Theory',  ch: 'The Engineering Mindset' },
      { id: 'HPMqwbZvHPM', title: 'Paralleling Marine Generators — Step by Step',      ch: 'MarineGyaan' },
      { id: 'XoLwH-N3l2Q', title: 'AVR — Automatic Voltage Regulator Explained',      ch: 'Electrical4U' }
    ],
    flashcards: [
      { q: 'State the conditions required to parallel two marine generators.', a: 'Five conditions must be met SIMULTANEOUSLY: (1) Same voltage (within 1–2%). (2) Same frequency (within 0.1–0.2 Hz). (3) Same phase sequence (L1-L2-L3 order). (4) Same phase angle (waveforms in phase — synchroscope at 12 o\'clock position). (5) Incoming machine slightly faster than bus (synchroscope rotating slowly clockwise). Source: Reed\'s Vol.4 Ch 4. Failure to meet conditions causes synchronising torque surge that can damage generator windings or circuit breaker.' },
      { q: 'What is the function of the AVR and governor in a marine generator?', a: 'AVR (Automatic Voltage Regulator): maintains constant terminal voltage by varying excitation current to rotor field winding. More excitation → stronger magnetic field → higher voltage. Also controls reactive (kVAR) load sharing between parallel generators. Governor: maintains constant speed (frequency) by varying fuel injection to prime mover. Controls active (kW) load sharing. Without AVR: voltage droops under load. Without governor: frequency droops under load. Source: Reed\'s Vol.4 Ch 2.' },
      { q: 'What is a preferential trip and which loads are tripped first?', a: 'Preferential trip is an automatic protection system that sheds non-essential loads in sequence when generator overloads (overcurrent condition). Trip sequence: (1) Non-essential loads (accommodation lighting, galley heaters, air conditioning) tripped first within 5–10 seconds. (2) If overload continues: semi-essential loads (cargo cranes, certain auxiliaries) tripped. Essential loads NEVER tripped: navigation lights, fire pump, bilge pump, emergency lighting, communication equipment, steering gear. Source: Reed\'s Vol.4 Ch 8.' }
    ]
  },

  /* ── STABILITY ── */
  cl3_transverse: {
    formulas: [
      { label: 'Metacentric Height GM',    eq: 'GM = KM − KG = KB + BM − KG   [m]',                    note: 'GM > 0 = stable. GM < 0 = unstable (loll). Source: IMO Res. A.749(18)' },
      { label: 'BM (metacentric radius)',  eq: 'BM = I_WP / V',                                          note: 'I_WP = second moment of waterplane area [m⁴], V = displacement volume [m³]' },
      { label: 'KB approximation',         eq: 'KB ≈ T/2  (for wall-sided box vessel)',                  note: 'T = mean draught. For ship forms KB ≈ 0.52T to 0.58T. Source: Barras.' },
      { label: 'Free Surface Correction',  eq: 'GGₘ = (ρ_liq × i_fs) / (ρ_ship × V)',                   note: 'i_fs = l × b³/12 for rectangular tank. Source: D J Eyres, Ship Stability' },
      { label: 'IMO Min. Stability',       eq: 'GM_min ≥ 0.15 m; GZ_max ≥ 0.20 m at θ ≥ 30°',         note: 'Area 0-30° ≥ 0.055 m·rad; 0-40° ≥ 0.090 m·rad. Source: IMO Res A.749(18)' },
      { label: 'Angle of Loll',            eq: 'tan(φ_loll) = √(−2GM / BM)  [negative GM vessel]',      note: 'Correct loll by filling lowest double bottom tanks — NEVER heeling tanks first!' }
    ],
    videos: [
      { id: 'r7rDXyqJijg', title: 'Ship Stability — GM and Metacentric Height Explained', ch: 'MarineGyaan' },
      { id: 'eaEExKHtS9U', title: 'GZ Curve and IMO Stability Criteria',                  ch: 'Seamans Training Channel' },
      { id: 'lhFh3kAlOxI', title: 'Free Surface Effect — Animation & Examples',           ch: 'Marine Insight' }
    ],
    flashcards: [
      { q: 'Define KB, KG, KM, BM and GM with units and relationships.', a: 'K = keel (baseline reference). B = centre of buoyancy (centroid of underwater volume). G = centre of gravity (centroid of all masses). M = transverse metacentre. Relationships: KM = KB + BM. GM = KM − KG. Units: all in metres from keel. BM = I_WP/V (m⁴/m³ = m). GM is the single most critical stability parameter — positive for stable ship. Source: D J Eyres, Ship Stability for Masters & Mates, 6th Ed.' },
      { q: 'State the IMO intact stability criteria from Resolution A.749(18).', a: 'Six criteria all must be met: (1) Area under GZ curve 0°–30° ≥ 0.055 m·rad. (2) Area 0°–40° ≥ 0.090 m·rad. (3) Area 30°–40° ≥ 0.030 m·rad. (4) Maximum GZ ≥ 0.20 m occurring at angle ≥ 30°. (5) Angle of maximum GZ ≥ 25°. (6) Initial GM₀ ≥ 0.15 m. ALL six criteria are mandatory — failure of any one renders ship unstable by IMO standards. Source: IMO Resolution A.749(18) Chapter 3.1.' },
      { q: 'What is free surface effect and how is it minimised?', a: 'When a tank is partially filled, the free liquid surface shifts as ship heels, raising the virtual centre of gravity G. Reduction in effective GM = GGₘ = (ρ_liq × i_fs)/(ρ_ship × V). i_fs = l×b³/12 — proportional to breadth CUBED, so wide tanks are worst. Minimisation: (1) Fill tanks completely or empty them. (2) Use centreline longitudinal divisions (halves b, reduces i_fs by factor of 4). (3) Use divided tanks. (4) Transfer between tanks carefully noting GM loss. Source: D J Eyres, Ship Stability Ch 10.' },
      { q: 'A ship develops a list and then a positive angle of loll — what is happening and how do you correct it?', a: 'Angle of loll = ship with negative GM heeling to angle φ where righting moment = 0. At φ_loll the ship is in unstable equilibrium — any disturbance → capsize. CORRECT IN SEQUENCE: (1) Lower G as far as possible — fill lowest double bottom tanks with ballast water FIRST (lowers G, increases GM positive). (2) DO NOT fill heeling tanks on low side first — may make list worse initially or cause sudden capsize. (3) Once GM is positive, vessel self-rights. (4) Then redistribute ballast symmetrically. Source: D J Eyres, Ship Stability Ch 11.' }
    ]
  },

  /* ── REFRIGERATION ── */
  cl3_refrig: {
    formulas: [
      { label: 'COP (Refrigeration)',      eq: 'COP_R = Q_evap / W_comp = (h₁ − h₄) / (h₂ − h₁)',    note: 'State 1=compressor suction, 2=discharge, 3=condenser outlet, 4=evaporator inlet. Source: Reed\'s Vol.3' },
      { label: 'COP (Heat Pump)',          eq: 'COP_HP = Q_cond / W_comp = COP_R + 1',                 note: 'Always greater than 1' },
      { label: 'Refrigerating Effect',     eq: 'RE = h₁ − h₄   [kJ/kg]',                              note: 'Heat absorbed per kg refrigerant in evaporator' },
      { label: 'Mass Flow Rate',           eq: 'ṁ = Q_refrig / RE   [kg/s]',                           note: 'Q_refrig = required cooling capacity [kW]' }
    ],
    videos: [
      { id: 'B4MkF_rWCCE', title: 'Vapour Compression Refrigeration Cycle — Full Explanation', ch: 'The Engineering Mindset' },
      { id: 'KHXFkNREgbY', title: 'Marine Cargo Refrigeration — Reefer Ship Systems',          ch: 'Marine Insight' },
      { id: 'yzORkfpHAtk', title: 'Pressure-Enthalpy (P-h) Diagram for Refrigeration',         ch: 'Engineering Explained' }
    ],
    flashcards: [
      { q: 'Describe the four processes of the vapour compression refrigeration cycle.', a: '1→2 Compression: superheated vapour compressed by compressor — temperature and pressure rise (ideally isentropic). 2→3 Condensation: hot high-pressure vapour rejects heat in condenser, becomes subcooled liquid — constant pressure. 3→4 Expansion: liquid throttled through expansion valve, pressure and temperature drop, wet vapour produced — constant enthalpy (isenthalpic). 4→1 Evaporation: wet vapour absorbs heat from cargo/space in evaporator, becomes superheated vapour — constant pressure. Source: Reed\'s Vol.3 Ch 1.' },
      { q: 'What is superheat at compressor suction and why is it necessary?', a: 'Superheat = temperature excess above saturation temperature at compressor suction pressure. Set at 5–10°C (measured by thermometer on suction line compared with saturation temperature from pressure reading). Necessary: (1) Ensures NO liquid refrigerant enters compressor — liquid is incompressible, would cause hydraulic shock, valve breakage, connecting rod damage. (2) Improves volumetric efficiency slightly. Set by superheat adjustment on expansion valve (needle valve or thermostatic element). Source: Reed\'s Vol.3 Ch 2.' },
      { q: 'Compare R-134a, Ammonia (R-717) and CO₂ (R-744) for marine use.', a: 'R-134a (HFC): GWP 1430, ODP 0, non-toxic, non-flammable. Used in AC and provisions stores. Phase-down under Kigali Amendment. R-717 Ammonia: GWP 0, ODP 0, excellent COP (best of all refrigerants), toxic (25 ppm TWA-IDLH), flammable. Used in large cargo reefer systems, fish carriers. Requires gas detection, self-contained spaces, strict maintenance. R-744 CO₂: GWP 1, ODP 0, non-toxic, non-flammable, high working pressure (100+ bar), transcritical cycle. Growing use in cascade systems. Source: Reed\'s Vol.3 Ch 1, IMO Circular on HFCs.' }
    ]
  },

  /* ── BOILERS ── */
  cl3_boilers: {
    formulas: [
      { label: 'Boiler Efficiency',        eq: 'η = (m_s × (h_s − h_fw)) / (m_f × CV) × 100%',         note: 'h_s=steam enthalpy, h_fw=feedwater enthalpy, CV=calorific value fuel. Source: Reed\'s Vol.2' },
      { label: 'Working Pressure Limits',  eq: 'Safety valve 1: set at working pressure; SV 2: ≤5% higher', note: 'Two safety valves required. Source: Lloyd\'s Register Rules for Ships, SOLAS Ch II-1' }
    ],
    videos: [
      { id: 'VmGMEKIK2NU', title: 'Marine Boiler Types — Scotch & Water Tube Explained', ch: 'MarineGyaan' },
      { id: 'kUhGa4LKQL4', title: 'Boiler Water Treatment — Scale and Corrosion',        ch: 'Marine Engineering Tutorial' }
    ],
    flashcards: [
      { q: 'Compare Scotch marine boiler and D-type water tube boiler.', a: 'Scotch Marine (fire-tube): gas flows through tubes, water outside. Pressure 7–17 bar, large water content (slow to respond), robust, hard to clean inside tubes, used for auxiliary steam (heating, deck machinery). D-type water tube: water in tubes, hot gases outside. Pressure 40–100 bar, faster steam raising, used for propulsion steam in steam ships and FPSO. More complex, needs better water treatment. Source: Reed\'s Vol.2 Ch 1.' },
      { q: 'What is boiler water treatment and what are the target parameters?', a: 'Treatment to prevent: (1) Scale — deposits of CaCO₃, MgCO₃ on heating surfaces → overheating → tube failure. Chemical: Na₃PO₄ reacts with hardness to form non-adherent sludge blown down. (2) Corrosion — acid conditions, dissolved O₂. Treat with NaOH (pH 10.5–11.5), oxygen scavengers (Na₂SO₃ or hydrazine). (3) Foaming/priming — high TDS causes foam → water carryover. Max TDS 3000–4500 ppm; blowdown to control. Targets: pH 10.5–11.5, TDS <3000–4500 ppm, Chloride <200 ppm. Source: Reed\'s Vol.2 Ch 3, water treatment supplier guidelines.' }
    ]
  },

  /* ── MARPOL ANNEX VI ── */
  cl3_annex6: {
    formulas: [
      { label: 'SOx Global Limit (2020)',   eq: 'S content ≤ 0.50% m/m (Jan 1, 2020)',             note: 'IMO 2020 — MARPOL Annex VI Reg 14.1. ECA limit: ≤0.10% m/m (Reg 14.4)' },
      { label: 'CII Formula',               eq: 'CII = ΣCO₂ emissions [g] / (Capacity × Σdistance [nm])', note: 'Annual. Source: MARPOL Annex VI Reg 28, IMO MEPC.339(76)' },
      { label: 'EEDI Formula (simplified)',  eq: 'EEDI = (P_ME × SFC_ME × CF) / (DWT × V_ref)',    note: 'g CO₂/(tonne·nm). CF=CO₂ conversion factor per fuel type. Source: MARPOL Annex VI Reg 22' }
    ],
    videos: [
      { id: 'nfnAmsTePvk', title: 'MARPOL Annex VI — SOx, NOx, CII Explained',    ch: 'DNV Official' },
      { id: 'MqWEUQyTQpU', title: 'CII Rating — Carbon Intensity Indicator Guide', ch: 'Lloyd\'s Register' },
      { id: 'P_9XWlXJbFI', title: 'Alternative Fuels for Shipping 2024–2030',      ch: 'Shell Marine Products' }
    ],
    flashcards: [
      { q: 'What is the global sulphur cap and how can ships comply?', a: 'Since 1 January 2020 (IMO 2020): maximum 0.50% m/m sulphur in fuel globally (MARPOL Annex VI Reg 14). In SOx ECAs (Baltic Sea, North Sea, North American ECA, USCG Caribbean ECA): 0.10% m/m since 2015. Compliance options: (1) Switch to Very Low Sulphur Fuel Oil (VLSFO, ≤0.50%S). (2) Use LNG or methanol. (3) Install open-loop or closed-loop exhaust gas scrubber (EGCS) — allows burning HFO if scrubber meets washwater/SO₂ standards. Source: MARPOL Annex VI Reg 14, IMO MEPC.1/Circ.898.' },
      { q: 'Explain the CII (Carbon Intensity Indicator) rating system.', a: 'MARPOL Annex VI Reg 28 (in force 1 Nov 2022): Annual CII rating for ships ≥5000 GT on international voyages. CII = total CO₂ emitted (g) / (transport capacity × distance nautical miles). Rated A to E against annual required reference value (varies by ship type and size). A = ≥15% better than required. D or E: acceptable once, but D for 3 years or E triggers mandatory corrective action plan in SEEMP Part III. Source: IMO MEPC.339(76), MEPC.355(78).' },
      { q: 'What are the NOx emission tiers under MARPOL Annex VI?', a: 'Tier I: pre-2000 engines installed before 1 Jan 2000. Limit: 17 g/kWh at n<130 RPM. Tier II: installed 2011+. ~80% of Tier I levels. Tier III: installed 2016+ operating in NOx ECAs (North Sea, Baltic Sea from 2021; North American ECA). 80% reduction from Tier I — requires SCR (selective catalytic reduction) or EGR (exhaust gas recirculation). Source: MARPOL Annex VI Reg 13, IMO MEPC.176(58), MEPC.251(66).' }
    ]
  },

  /* ── CHIEF ENGINEER FAULT DIAGNOSIS ── */
  ce_diagnosis: {
    formulas: [
      { label: 'Crankshaft Deflection Limit',  eq: 'Max acceptable ≈ 0.3 mm per metre of throw length',    note: 'Take readings at 5 positions: BDC, 45° ABDC, TDC, 45° ATDC, BDC. Trend monthly. Source: MAN B&W Engine Builder, class rules.' },
      { label: 'Main Bearing Clearance',        eq: 'Diametral clearance = bore diameter − journal diameter', note: 'Typical: 0.25–0.55 mm. Excessive → knocking, LO pressure drop. Source: engine TM.' },
      { label: 'TBN Depletion Rate',            eq: 'TBN consumed ∝ sulphur content of fuel × cylinder oil consumption', note: 'Target TBN for VLSFO: 40–70. For HFO: 70–100. Source: Shell Lubmarine.' }
    ],
    videos: [
      { id: 'pO86VU9CXJQ', title: 'Marine Engine Fault Diagnosis — Chief Engineer Level', ch: 'MarineGyaan' },
      { id: '2w_4LQdHeTM', title: 'Crankshaft Deflection — Measurement & Interpretation', ch: 'Marine Engineering Tutorial' },
      { id: 'WDQ7rjv4FaA', title: 'Lube Oil Analysis for Marine Engineers',               ch: 'Chevron Marine Lubricants' }
    ],
    flashcards: [
      { q: 'What does elevated iron (Fe) in cylinder oil analysis indicate? What action is taken?', a: 'Elevated Fe = wear debris from cylinder liner bore (cast iron). Sudden spike = active abnormal wear — scuffing or scoring of liner. Gradual increase = normal wear rate trending upward (monitor). Actions: (1) Compare against baseline and previous results. (2) Check cylinder oil feed rate and TBN. (3) Inspect liner at next available port — bore gauge measurements. (4) Review fuel sulphur content change (affects TBN consumption). (5) Increase cylinder oil dosage temporarily. Source: Chevron Taro Marine Lubricants Advisory.' },
      { q: 'Describe the procedure for measuring crankshaft deflection.', a: 'Purpose: detect misalignment of main bearings, bending of crankshaft. Procedure: (1) Use deflection gauge (dial indicator type, range ±0.5mm). (2) Position gauge between crank web faces at journal. (3) Turn engine through 360° taking readings at: BDC, 45° ABDC (port side), TDC, 45° ATDC (starboard side), BDC again (check reading should equal first). (4) Record ± values (opening/closing of web). (5) Compare with maker\'s limit (typically ±0.3mm per metre of throw). (6) Repeat after each major repair. Trend over time — sudden change indicates shifted bearing. Source: MAN B&W Engine Operating Manual.' },
      { q: 'What does blow-past on a 2-stroke diesel indicate and how is it diagnosed?', a: 'Blow-past = combustion gases escaping past piston rings into scavenge space. Indicators: (1) Scavenge space temperature high on that unit (pyrometer check). (2) Black carbon deposits on scavenge port covers — visible on inspection. (3) Crankcase pressure higher than normal (crankcase vent float). (4) Cylinder lube oil condition — contaminated, dark, acidic. (5) Piston cooling temperature rise on that unit. Confirm by indicator diagram (low, rounded power card). Cause: worn/broken piston rings, scuffed liner, ring stuck in groove. Action: check at next planned piston overhaul. Source: Pounder\'s Ch 6.' }
    ]
  },

  /* ── CII / DECARBONISATION ── */
  ce_cii: {
    formulas: [
      { label: 'Attained CII',              eq: 'CII_attained = (FC × CF) / (DWT × Dist)',          note: 'FC=fuel consumption [g], CF=CO₂ emission factor, Dist=nm sailed. Source: MEPC.339(76)' },
      { label: 'Annual Required CII',        eq: 'CII_req = CII_ref × (1 − reduction factor)',       note: '2023: ref×0.95; 2024: ×0.93; 2025: ×0.91; 2026: ×0.89. Source: MARPOL Annex VI Reg 28' },
      { label: 'CO₂ Emission Factor',        eq: 'CF_HFO=3.114; CF_MDO=3.206; CF_LNG=2.750 [g CO₂/g fuel]', note: 'Source: IMO MEPC.1/Circ.795 Annex, 4th IMO GHG Study 2020' }
    ],
    videos: [
      { id: 'nfnAmsTePvk', title: 'CII Rating System Explained by DNV',               ch: 'DNV Official' },
      { id: 'n3S-4qQFk7Y', title: 'How Ships Can Improve Their CII Rating',           ch: 'Lloyd\'s Register' },
      { id: 'P_9XWlXJbFI', title: 'Future Fuels: LNG, Ammonia, Methanol for Shipping', ch: 'Shell Marine' }
    ],
    flashcards: [
      { q: 'What is CII and how does the A–E rating system work?', a: 'Carbon Intensity Indicator (MARPOL Annex VI Reg 28, MEPC.339(76)): measures CO₂ emitted per unit transport work. CII = total CO₂ (grams) ÷ (capacity × distance nm). Annual rating vs required CII for ship type/size: A (superior, >15% better than required), B (minor superior), C (moderate, within ±15%), D (minor inferior), E (inferior, >15% worse). D for 3 consecutive years or E for 1 year: mandatory SEEMP Part III corrective action plan. From 2026 enhanced enforcement expected. Source: MARPOL Annex VI Reg 28; IMO MEPC.355(78).' },
      { q: 'What practical measures can a Chief Engineer implement to improve CII?', a: '1) Slow steaming / speed optimisation — most effective single measure. 2) Trim optimisation — forward trim reduces resistance by 3–8% depending on hull form. 3) Hull and propeller cleaning — fouled hull increases fuel by 10–20%; propeller polishing saves 3–6%. 4) Waste heat recovery — exhaust gas economiser for steam or power turbine. 5) Engine tuning — injection timing, turbocharger cleaning to reduce SFOC. 6) Fuel switching — LNG, methanol lower CF factors. 7) Shore power (cold ironing) in port — zero CII impact while in port. 8) Voyage planning — optimal route, weather routing. Source: IMO SEEMP guidelines; MAN B&W ME-GI engine paper.' }
    ]
  }

};


/* ═══════════════════════════════════════════════════════════════════════
   ZONE 5: ANIMATED SVG DIAGRAMS
   Pure CSS-animated technical diagrams for visual learning
   ═══════════════════════════════════════════════════════════════════════ */
