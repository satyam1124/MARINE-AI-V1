/* MarineIQ — BTech Chapter Data (49 subjects)
   Pure data file: calls setChapters() for each BTech subject
   Requires: data/topic-knowledge.js and ui/btec-nav.js loaded first
   DO NOT add logic here — data only */

setChapters('bt_elec1','⚡','Basic Electrical Engineering',
  'Foundation electrical theory — DC, AC, machines, transformers, instruments — core for all marine electrical systems',
  'Sem 2', [

  { id:'bee_dc', icon:'🔌', title:'DC Circuits',
    tags:['Ohm\'s Law','KVL/KCL','Thevenin','Networks'],
    difficulty:'Medium', time:25,
    desc:"Ohm's law, Kirchhoff's laws, series/parallel networks, Thevenin's and Norton's theorems, superposition principle",
    summary:`
      <h3>Fundamentals of DC Circuit Analysis</h3>
      <p>A <strong>DC circuit</strong> carries current that flows in only one direction — from the higher potential terminal (positive) to the lower (negative) through the external circuit. All marine engineers must master DC circuit analysis because <strong>battery systems</strong>, <strong>emergency lighting</strong>, <strong>starter motors</strong>, and <strong>control circuits</strong> on board ships operate on DC.</p>

      <p>The foundation of all circuit analysis is <strong>Ohm's Law</strong>: <code>V = I × R</code>, where V is the voltage (volts), I is the current (amperes), and R is the resistance (ohms). This deceptively simple equation governs everything from calculating fuse ratings for a 24V navigation light circuit to sizing conductors for a 110V DC emergency switchboard.</p>

      <h3>Kirchhoff's Laws — The Two Pillars</h3>
      <p><strong>Kirchhoff's Voltage Law (KVL)</strong> states that the algebraic sum of all voltages around any closed loop equals zero: <code>ΣV = 0</code>. This is based on the conservation of energy — the energy gained by charges (from EMF sources) must equal the energy lost (across resistors).</p>
      <p><strong>Kirchhoff's Current Law (KCL)</strong> states that the sum of currents entering any junction equals the sum leaving: <code>ΣI_in = ΣI_out</code>. This is conservation of charge — no charge is created or destroyed at a junction.</p>

      <div class="learn-callout example">
        <span class="learn-callout-label">🚢 Real Example</span>
        On a typical cargo vessel's 24V DC emergency system, a parallel circuit feeds navigation lights (port, starboard, masthead, stern). If the total current drawn is 8.5A and one 2A masthead light fails open-circuit, KCL tells us the remaining branches will still carry their individual currents unchanged (6.5A total), because <strong>voltage across parallel branches is the same</strong>.
      </div>

      <h3>Network Theorems</h3>
      <p><strong>Thevenin's Theorem</strong> is the most powerful simplification tool: any linear two-terminal network can be replaced by a single voltage source V_th in series with a resistance R_th. To find V_th, measure the <strong>open-circuit voltage</strong> across the terminals. To find R_th, <strong>short all voltage sources</strong> (replace with short circuits) and <strong>open all current sources</strong>, then calculate the resistance seen from the terminals.</p>
      <p><strong>Norton's Theorem</strong> is the dual: same network becomes a current source I_N in parallel with R_N. The relationship is <code>I_N = V_th / R_th</code> and <code>R_N = R_th</code>.</p>
      <p>The <strong>Superposition Theorem</strong> applies to circuits with multiple sources: the response (current/voltage) due to multiple sources equals the sum of responses due to each source acting alone, with all other sources deactivated.</p>

      <div class="learn-callout warning">
        <span class="learn-callout-label">⚠️ Common Mistake</span>
        When applying superposition, students often forget that <em>deactivating a voltage source means short-circuiting it</em> (replacing with a wire), while <em>deactivating a current source means open-circuiting it</em> (removing the branch). Getting this backwards leads to completely wrong results.
      </div>

      <h3>Series vs Parallel — Key Differences</h3>
      <table class="learn-table">
        <tr><th>Property</th><th>Series</th><th>Parallel</th></tr>
        <tr><td>Current</td><td>Same through all (I₁ = I₂ = I₃)</td><td>Divides (I_total = I₁ + I₂ + I₃)</td></tr>
        <tr><td>Voltage</td><td>Divides (V_total = V₁ + V₂ + V₃)</td><td>Same across all (V₁ = V₂ = V₃)</td></tr>
        <tr><td>Resistance</td><td>R_T = R₁ + R₂ + R₃</td><td>1/R_T = 1/R₁ + 1/R₂ + 1/R₃</td></tr>
        <tr><td>If one element fails open</td><td>Entire circuit stops</td><td>Other branches continue</td></tr>
        <tr><td>Ship application</td><td>Christmas tree lights (old), battery banks</td><td>Lighting circuits, parallel generators</td></tr>
      </table>

      <h3>Power in DC Circuits</h3>
      <p>Electrical power has three equivalent forms: <code>P = V × I = I²R = V²/R</code> (all in watts). The <code>I²R</code> form is crucial for calculating <strong>conductor heating losses</strong> — this is why marine cable sizing standards (IEC 60092) mandate minimum cross-sections: thinner cables mean higher resistance, more I²R heating, and fire risk.</p>

      <div class="learn-callout oral">
        <span class="learn-callout-label">📝 MMD Oral Question</span>
        <strong>Q: A 220V DC motor draws 45A. The cable resistance from switchboard to motor is 0.15Ω total. Calculate the voltage at motor terminals and power lost in cables.</strong><br>
        A: Voltage drop = I × R_cable = 45 × 0.15 = 6.75V. Motor terminal voltage = 220 − 6.75 = <strong>213.25V</strong>. Cable power loss = I²R = 45² × 0.15 = <strong>303.75W</strong>. This is why cable runs should be as short as possible.
      </div>

      <div class="learn-callout tip">
        <span class="learn-callout-label">💡 Exam Tip</span>
        For competitive exams and oral boards, always write all three forms of the power equation. Examiners often test whether you know when to use which form — use <strong>P = V × I</strong> when both V and I are known, <strong>P = I²R</strong> when current and resistance are known (cable loss calculations), and <strong>P = V²/R</strong> when voltage and resistance are known (heater ratings).
      </div>
    `,
    keyPoints: [
      { icon: '⚡', text: '<strong>Ohm\'s Law (V = IR)</strong> — The most fundamental electrical equation. Use it to find any one quantity when the other two are known. All marine electrical troubleshooting starts here.' },
      { icon: '🔄', text: '<strong>KVL (ΣV = 0)</strong> — Sum of voltages around any closed loop is zero. Use for series circuits and mesh analysis. Based on conservation of energy.' },
      { icon: '🔗', text: '<strong>KCL (ΣI_in = ΣI_out)</strong> — Current entering a node equals current leaving. Use for parallel circuits and nodal analysis. Based on conservation of charge.' },
      { icon: '📐', text: '<strong>Series: R adds up, current is same.</strong> Parallel: 1/R adds up, voltage is same.</strong> Know this cold — it appears in every electrical exam paper.' },
      { icon: '🔧', text: '<strong>Thevenin\'s Theorem</strong> simplifies any complex network into V_th + R_th. Find V_th = open circuit voltage, R_th = resistance with sources killed. Essential for load analysis.' },
      { icon: '⚖️', text: '<strong>Superposition</strong> — Works only for linear circuits. Deactivate all sources except one, solve, repeat for each source, then algebraically sum all results.' },
      { icon: '🔥', text: '<strong>I²R losses</strong> cause cable heating. Marine cable sizing (IEC 60092) is based on minimizing these losses. Doubling current = 4× heat. Critical safety concept.' },
      { icon: '🚢', text: '<strong>Ship applications:</strong> 24V DC emergency systems, battery chargers, steering gear motor starters, solenoid valves, alarm circuits, UPS systems, control relays.' },
    ],
    formulas:[
      { label:"Ohm's Law",           eq:"V = I × R   [V]",                          note:"V=voltage(V), I=current(A), R=resistance(Ω). Foundation of all circuit analysis." },
      { label:"Series Resistance",   eq:"R_total = R₁ + R₂ + … + Rₙ",             note:"Current same through all. Voltage divides proportionally to resistance." },
      { label:"Parallel Resistance", eq:"1/R_T = 1/R₁ + 1/R₂ + … + 1/Rₙ",        note:"Voltage same across all. Current divides inversely to resistance." },
      { label:"Power in DC Circuit", eq:"P = V×I = I²R = V²/R   [W]",              note:"Use I²R when current known; V²/R when voltage known. Three equivalent forms." },
      { label:"Thevenin Voltage",    eq:"V_th = V_oc  (open circuit voltage)",      note:"Find V across terminals with load removed. Short all voltage sources for R_th." },
    ],
    flashcards:[
      { q:"State Kirchhoff's Voltage Law (KVL)", a:"The algebraic sum of all voltages around any closed loop equals zero: ΣV = 0. Voltage rises (EMFs) = voltage drops (resistors)." },
      { q:"State Kirchhoff's Current Law (KCL)", a:"The sum of currents entering any node equals the sum leaving: ΣI_in = ΣI_out. Conservation of electric charge." },
      { q:"What is Thevenin's Theorem used for?", a:"Any linear two-terminal network can be replaced by a single voltage source V_th in series with resistance R_th. Simplifies complex circuits." },
      { q:"Voltage divider rule for two series resistors", a:"V₁ = V_s × R₁/(R₁+R₂) and V₂ = V_s × R₂/(R₁+R₂). Voltage across each resistor is proportional to its resistance." },
    ],
    videos:[
      { id:'VV6tZ3Qlf_U', title:'KVL and KCL explained with examples',        ch:'The Organic Chemistry Tutor' },
      { id:'7vHh1sfZ5KE', title:'Thevenin\'s Theorem step by step',            ch:'Engineering Simplified' },
    ]
  },

  { id:'bee_ac', icon:'〰️', title:'AC Fundamentals',
    tags:['RMS','Phasors','Impedance','Power Factor'],
    desc:"Sinusoidal waveforms, RMS and peak values, phasor diagrams, impedance, reactance, power factor, single-phase circuit analysis",
    formulas:[
      { label:"RMS Voltage",        eq:"V_rms = V_peak / √2 = 0.707 × V_peak",   note:"RMS = equivalent DC heating value. 230V mains → V_peak = 325V" },
      { label:"Inductive Reactance",eq:"X_L = 2π f L   [Ω]",                     note:"X_L=inductive reactance(Ω), f=frequency(Hz), L=inductance(H). Increases with frequency." },
      { label:"Capacitive Reactance",eq:"X_C = 1 / (2π f C)   [Ω]",             note:"Decreases with frequency. At resonance X_L = X_C." },
      { label:"Impedance",          eq:"Z = √(R² + X²)   [Ω];  φ = arctan(X/R)", note:"Z=total opposition to AC. φ=phase angle. X = X_L − X_C (net reactance)." },
      { label:"AC Ohm's Law",       eq:"V = I × Z   [V];   I = V / Z   [A]",     note:"Z replaces R in AC circuits. Phase angle φ is between V and I." },
    ],
    flashcards:[
      { q:"What is power factor and why does it matter on ships?", a:"PF = cos φ = P/S. Ratio of useful (active) power to total (apparent) power. Low PF means generators carry more current than necessary → overheating, losses. Ships target PF > 0.8 lagging." },
      { q:"Difference between RMS and peak value?", a:"Peak is maximum instantaneous value. RMS (Root Mean Square) is the equivalent DC value that produces the same heating. V_rms = V_peak/√2. Instruments read RMS." },
      { q:"What happens at resonance in an AC circuit?", a:"X_L = X_C, so net reactance = 0. Impedance Z = R (minimum). Current is maximum and in phase with voltage. PF = 1.0." },
    ],
    videos:[
      { id:'mHJSFn11EXk', title:'AC Circuits — RMS, Phasors & Power Factor', ch:'Michel van Biezen' },
    ]
  },

  { id:'bee_3phase', icon:'🔺', title:'Three-Phase Systems',
    tags:['Star','Delta','Line Voltage','Phase Current'],
    desc:"3-phase generation, star and delta connections, line vs phase quantities, balanced 3-phase power — standard on all ships 440V/60Hz",
    formulas:[
      { label:"Star: Line Voltage",     eq:"V_L = √3 × V_ph = 1.732 × V_ph",      note:"Ship 440V line → V_ph = 254V per winding. N-E voltage = phase voltage." },
      { label:"Delta: Line Current",    eq:"I_L = √3 × I_ph",                       note:"In delta, phase current ≠ line current. No neutral point in delta." },
      { label:"3-Phase Active Power",   eq:"P = √3 × V_L × I_L × cos φ   [W]",     note:"Works for both star and delta. V_L=line voltage, I_L=line current, cosφ=PF." },
      { label:"3-Phase Apparent Power", eq:"S = √3 × V_L × I_L   [VA]",            note:"S=apparent power(VA), P=active power(W), Q=reactive power(VAr). S²=P²+Q²" },
    ],
    flashcards:[
      { q:"Why do ships use 440V 3-phase 60Hz?", a:"3-phase provides constant power (no pulsation), more efficient transmission, smaller conductors. 440V balances safety and equipment size. 60Hz: motors run faster (3600 rpm) → smaller, lighter for marine use." },
      { q:"In a star-connected generator, what is the neutral?", a:"The star point (centre connection of all 3 windings). Gives two voltage levels: 440V line-to-line and 254V line-to-neutral. Neutral earthed on ship for safety." },
    ],
    videos:[
      { id:'UBX_Co_hHcU', title:'3-Phase Power Explained for Beginners', ch:'The Engineering Mindset' },
    ]
  },

  { id:'bee_transformer', icon:'🔄', title:'Transformers',
    tags:['Turns Ratio','Efficiency','Losses','Shipboard'],
    desc:"Working principle, turns ratio, voltage/current transformation, efficiency, iron & copper losses, auto-transformers, shipboard applications",
    formulas:[
      { label:"Turns Ratio",         eq:"V₁/V₂ = N₁/N₂ = I₂/I₁ = a",            note:"a=turns ratio. Step-up: a<1 (N₂>N₁). Step-down: a>1. Ideal transformer: no losses." },
      { label:"Transformer Efficiency",eq:"η = P_out/P_in = P_out/(P_out+P_loss)",note:"Losses: Iron losses (hysteresis + eddy) + Copper losses (I²R in windings). Max efficiency at equal iron and copper losses." },
      { label:"Copper Loss",         eq:"P_Cu = I²R_total   [W]",                  note:"Varies with load current squared. R_total = R₁ + a²R₂ (referred to primary). Load-dependent." },
      { label:"Iron Loss",           eq:"P_Fe = P_hysteresis + P_eddy ≈ constant", note:"Core losses. Depends on flux (hence voltage & frequency), independent of load current. Minimise by laminating core." },
    ],
    flashcards:[
      { q:"What are the two types of transformer losses?", a:"1) Iron (core) losses: hysteresis (∝ flux density 1.6) + eddy current (∝ flux density²) — constant at given voltage & frequency. 2) Copper (winding) losses: I²R — varies with load² . To reduce eddy: laminate core." },
      { q:"What is an auto-transformer and where is it used on ships?", a:"Single winding — part is shared by both primary and secondary. More compact, cheaper but no electrical isolation. Used in motor starters (star-delta reduced voltage starting) and for 440V→110V tool supplies." },
      { q:"Why does transformer efficiency peak between 50-75% load?", a:"At full load, copper losses are maximum (I²R). At low load, iron losses dominate. Maximum efficiency where copper loss = iron loss — typically around 50-75% rated load." },
    ],
    videos:[
      { id:'GMnsZnBdRUs', title:'How Transformers Work', ch:'The Engineering Mindset' },
    ]
  },

  { id:'bee_motors', icon:'⚙️', title:'Electric Motors',
    tags:['Induction','DC Motors','Starting','Speed Control'],
    desc:"DC motors (shunt, series, compound), 3-phase induction motor principle, slip, torque-speed curves, starting methods, speed control",
    formulas:[
      { label:"Synchronous Speed",    eq:"N_s = 120 f / P   [rpm]",               note:"f=frequency(Hz), P=number of poles. 60Hz,4-pole → Ns=1800rpm. 60Hz,2-pole → Ns=3600rpm." },
      { label:"Slip",                 eq:"s = (N_s − N) / N_s × 100%",            note:"N=actual rotor speed. Induction motor always runs slower than Ns. Full load slip ≈ 3-8%." },
      { label:"Rotor Frequency",      eq:"f_rotor = s × f_supply",                note:"At standstill s=1 → rotor frequency = supply frequency. At synchronous speed s=0 → no rotor EMF." },
      { label:"Motor Efficiency",     eq:"η = P_shaft / P_input = P_out/(P_out+losses)", note:"Losses: core, copper (stator+rotor), friction, windage. Typical marine motors: 85-95%" },
    ],
    flashcards:[
      { q:"Why can't a 3-phase induction motor start at full voltage direct-on-line for large motors?", a:"High starting current (6-8× full load) causes voltage dip on the switchboard — trips protection and affects other consumers. Large motors use star-delta starter (reduces starting current to 1/3) or auto-transformer starter." },
      { q:"Difference between shunt and series DC motors?", a:"Shunt: field in parallel with armature — nearly constant speed, good speed regulation. Used for pumps, fans. Series: field in series — high starting torque, speed varies inversely with load. Used for cranes, winches. Never run series motor on no-load (runaway)." },
      { q:"What is plugging (braking) of an induction motor?", a:"Reversing two supply phases while motor is running — creates reverse rotating field, braking torque. Very effective but heavy current surge. Motor must be disconnected before it reverses." },
    ],
    videos:[
      { id:'AQqyGNOP_3o', title:'How 3-Phase Induction Motor Works', ch:'The Engineering Mindset' },
    ]
  },

  { id:'bee_instruments', icon:'📏', title:'Measuring Instruments',
    tags:['Megger','Insulation','Wattmeter','Errors'],
    desc:"Ammeter, voltmeter, wattmeter, energy meter, megger, power analyser — types, connections, errors, shipboard testing procedures",
    formulas:[
      { label:"Instrument Sensitivity", eq:"Sensitivity = 1/Full-scale deflection current   [Ω/V]", note:"High sensitivity = small current causes full deflection. High-sensitivity voltmeters have less loading effect on circuit." },
      { label:"Percentage Error",       eq:"% error = (measured − true)/true × 100",               note:"Positive = over-reading. Negative = under-reading. Calibration corrects systematic errors." },
      { label:"Megger Insulation Test",  eq:"Insulation R = V_test / I_leakage   [MΩ]",            note:"1000V test on 440V circuits. Minimum 1 MΩ for new equipment, 0.5 MΩ acceptable in service. Values < 0.1 MΩ = danger." },
    ],
    flashcards:[
      { q:"Why is an ammeter connected in series and a voltmeter in parallel?", a:"Ammeter: must carry the full circuit current to measure it — needs very low resistance so it doesn't alter the circuit. Voltmeter: must sense voltage without drawing significant current — needs very high resistance (ideally infinite) to avoid loading the circuit." },
      { q:"What is a megger and what does it measure?", a:"A megger (insulation resistance tester) measures the resistance of insulation in MΩ. Applies a high DC voltage (500V or 1000V). Low insulation resistance indicates moisture, damage or degradation. Read after 1 minute for the polarisation index test." },
      { q:"What is the polarisation index (PI)?", a:"PI = insulation resistance at 10 min ÷ insulation resistance at 1 min. PI > 2.0 = good insulation. PI < 1.0 = dangerous, contaminated insulation. Tells you if insulation absorbs the test voltage (good) or just leaks it (bad)." },
    ],
    videos:[
      { id:'LAtDMqQeXSM', title:'Power Factor Correction & Instruments', ch:'Electrical Eng. Portal' },
    ]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   2. MARINE DIESEL ENGINE I (bt_diesel1)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_diesel1','🔧','Marine Diesel Engine I',
  'Two-stroke and four-stroke diesel engines — components, systems, thermodynamic cycles, performance — foundation for MMD Class 4/3',
  'Sem 4', [

  { id:'d1_class', icon:'📋', title:'Engine Classification & Types',
    tags:['2-stroke','4-stroke','Types','Comparison'],
    desc:"Engine classification by cycle, cylinder arrangement, speed range, and application. 2-stroke vs 4-stroke comparison for main and auxiliary engines",
    formulas:[
      { label:"Stroke-Bore Ratio",   eq:"S/D ratio = Stroke / Bore",                 note:"Modern slow-speed 2-stroke: S/D = 2.5 to 4.0. 4-stroke medium-speed: S/D = 1.1 to 1.4. Long stroke → better combustion efficiency." },
      { label:"Piston Speed",        eq:"C_m = 2 × L × n / 60   [m/s]",             note:"L=stroke(m), n=rpm. Safe maximum ≈ 8-9 m/s. Higher piston speed → more wear. Slow-speed engines: 6-7 m/s." },
      { label:"Displacement Volume", eq:"V_s = (π/4) × D² × L × k   [m³]",          note:"D=bore(m), L=stroke(m), k=number of cylinders. Total swept volume, used in power calculations." },
    ],
    flashcards:[
      { q:"What are the main differences between 2-stroke and 4-stroke engines?", a:"2-stroke: power stroke every revolution, port/valve scavenging, simpler valvetrain, higher power density, CRANKCASE not used for lubrication (crosshead type). 4-stroke: power every 2 revolutions, better scavenging via valves, more fuel-efficient at part load, used for auxiliaries and medium-speed propulsion." },
      { q:"Why are slow-speed 2-stroke engines preferred for main propulsion?", a:"Direct coupling to propeller (no gearbox), long stroke → high thermal efficiency, handles heavy fuel directly, proven reliability for 100,000+ hours, 80-120 rpm ideal for propeller efficiency." },
      { q:"What is a crosshead engine?", a:"Separate crankcase and scavenging space connected by a piston rod passing through a stuffing box. Prevents crankcase contamination with combustion gases. Found on all large 2-stroke marine engines (MAN B&W, Wärtsilä RT-flex)." },
    ],
    videos:[
      { url:'https://www.youtube.com/results?search_query=How+Marine+Diesel+Engines+Work+2+stroke', title:'How Marine Diesel Engines Work (2-stroke)', ch:'Wartsila' },
      { url:'https://www.youtube.com/results?search_query=4+stroke+vs+2+stroke+engine+comparison', title:'4-stroke vs 2-stroke engine comparison',   ch:'The Engineering Mindset' },
    ]
  },

  { id:'d1_comp', icon:'🔩', title:'Engine Components',
    tags:['Cylinder','Piston','Crankshaft','Bearings','Liner'],
    desc:"Detailed study of all engine components: cylinder block, liner, piston assembly, connecting rod, crankshaft, camshaft, bearings, running clearances",
    formulas:[
      { label:"Running Clearance (Liner-Piston)", eq:"Clearance = D_liner − D_piston  [mm]",  note:"Typical: 0.5-1.2mm for 2-stroke. Too small → seizure risk. Too large → blow-by, power loss, oil consumption." },
      { label:"Bearing Projected Area",           eq:"A_proj = d × l   [mm²]",                 note:"d=journal diameter, l=bearing length. Bearing pressure = Force/A_proj. Max ≈ 7-10 MPa for main bearings." },
      { label:"Thermal Expansion",                eq:"ΔL = α × L × ΔT   [mm]",                note:"α=coefficient of thermal expansion (~12×10⁻⁶/°C for steel). Critical for clearance calculations and liner fit." },
    ],
    flashcards:[
      { q:"Why is the cylinder liner made of special cast iron and not mild steel?", a:"Cast iron (alloyed with Cr, Mo, Ni) provides: natural lubrication from graphite inclusions, hard wear-resistant surface, good heat dissipation, machinability. The bore must resist wear from piston rings under high pressure and temperature." },
      { q:"What is the purpose of the stuffing box in a 2-stroke engine?", a:"Seals the piston rod where it passes from the combustion space into the crosshead/crankcase area. Prevents combustion gases entering the crankcase and lubricating oil contaminating scavenge air. Fitted with segmental sealing rings." },
      { q:"What are 'lantern rings' on a stuffing box?", a:"Spacer rings with radial holes allowing oil or steam to enter for lubrication and sealing. Keep sealing rings lubricated. On crankcase side: oil. On combustion side: can be fitted with steam for positive sealing." },
      { q:"What materials are piston rings made from, and name 3 types?", a:"Grey cast iron, sometimes chrome-plated. Types: 1) Compression rings (seal combustion pressure), 2) Wiper/scraper rings (control oil film thickness), 3) Oil control rings (4-stroke only — return excess oil to sump)." },
    ],
    videos:[
      { url:'https://www.youtube.com/results?search_query=Marine+Diesel+Engine+Components+Explained', title:'Marine Diesel Engine Components Explained', ch:'MarineEngineering Pro' },
    ]
  },

  { id:'d1_fuel', icon:'⛽', title:'Fuel System',
    tags:['HFO','MDO','Injection','Viscosity','Purifier'],
    desc:"Fuel types (HFO, MDO, LNG), fuel treatment (settling, purification, heating), injection system (fuel pumps, injectors, timing), MARPOL sulphur limits",
    formulas:[
      { label:"SFOC (Specific Fuel Oil Consumption)", eq:"SFOC = (fuel consumed [g/hr]) / (power [kW])   [g/kWh]", note:"Typical 2-stroke main engine: 165-195 g/kWh on HFO. Best: ~155 g/kWh. Useful for comparing engine efficiency and calculating fuel costs." },
      { label:"Fuel Consumption Rate",                eq:"FC = SFOC × P / 1,000,000   [tonnes/hr]",              note:"P=power(kW). Example: 15,000 kW × 175 g/kWh = 2.625 t/hr. Daily = ×24 hours." },
      { label:"Viscosity Correction (Redwood)",       eq:"Viscosity ∝ 1/Temperature — use viscosity charts for blending", note:"HFO must be preheated to 120-140°C to reach injection viscosity of 10-15 cSt. Viscosity too high → poor atomisation. Too low → pump wear." },
    ],
    flashcards:[
      { q:"Why must HFO be heated before injection, and to what temperature?", a:"HFO at ambient is solid/semi-solid. Must be heated to ~120-140°C to reduce viscosity to 10-15 cSt (centistokes) for proper atomisation by injectors. Viscosity ∝ 1/temperature. Controlled by steam heater and viscotherm." },
      { q:"MARPOL Annex VI — current global sulphur limits (2020)", a:"Global limit (outside ECAs): 0.50% S (from 2020, down from 3.5%). ECA (Emission Control Areas — North Sea, Baltic, North America): 0.10% S. Ships comply by: low sulphur fuel (LSFO/MDO), scrubbers (exhaust gas cleaning systems), or LNG." },
      { q:"What is the purpose of a fuel injector test (pop test)?", a:"Tests: opening pressure (spray begins), quality of atomisation (fine mist, no dribble), pattern (conical, symmetrical). Opening pressure typically 250-350 bar. Low pressure: poor atomisation. Dribbling: carbon fouling. Tested on a pop tester." },
      { q:"Describe the fuel injection pump (Bosch type) operation", a:"Plunger in barrel driven by camshaft. Helical groove on plunger controls delivery: rotating plunger changes start/end of delivery. Delivery valve prevents dribble. Fuel quantity controlled by rotating rack → helix position → effective stroke." },
    ],
    videos:[
      { url:'https://www.youtube.com/results?search_query=Marine+Fuel+Injection+System+Explained', title:'Marine Fuel Injection System Explained', ch:'Learn Engineering' },
    ]
  },

  { id:'d1_lube', icon:'🛢️', title:'Lubrication System',
    tags:['Viscosity','SAE Grades','Cylinder Oil','Hydrodynamic'],
    desc:"Lubrication theory (hydrodynamic, boundary), lubricating oil properties, cylinder oil feed rate, crankcase oil system, oil purification, condition monitoring",
    formulas:[
      { label:"Cylinder Oil Feed Rate", eq:"Feed rate = LOR × stroke [mm] × bore [mm] × k [g/kWh]", note:"LOR=lube oil ratio (g/kWh per mm stroke per mm bore). Typical: 0.4-0.8 g/kWh for modern 2-stroke with sulphur neutralisation." },
      { label:"Oil Viscosity (dynamic)", eq:"τ = μ × (du/dy)   [Pa]",                                note:"τ=shear stress, μ=dynamic viscosity(Pa·s), du/dy=velocity gradient. Thin oil (low μ) → less friction but less film protection." },
      { label:"Sommerfeld Number",        eq:"S = (μ N / P) × (R/C)²",                               note:"μ=viscosity, N=speed, P=bearing pressure, R/C=radius to clearance ratio. S determines lubrication regime. Higher S = better hydrodynamic film." },
    ],
    flashcards:[
      { q:"What is hydrodynamic lubrication and why is it ideal?", a:"Shaft rotates and drags oil between shaft and bearing. Pressure builds in converging oil wedge, lifting shaft completely off bearing. Metal-to-metal contact avoided. Friction very low (μ ≈ 0.001-0.01). Called 'full film' lubrication. Requires adequate speed, viscosity, and load." },
      { q:"Why is cylinder oil different from crankcase oil?", a:"Cylinder oil: high alkalinity (TBN 70-100) to neutralise acidic combustion products from sulphur in fuel. Consumed — fed by dippers/quills. Crankcase oil: lower TBN (5-20), contains detergents, dispersants, anti-wear additives. Recirculated through purifier." },
      { q:"What is TBN (Total Base Number)?", a:"Measure of alkalinity reserve in oil (mg KOH/g oil). Fresh crankcase oil: TBN 5-20. Cylinder oil: TBN 70-100. TBN decreases as base depleted by acid. When TBN too low, acid corrosion occurs on liner surface. Monitored by oil lab analysis." },
    ],
    videos:[
      { url:'https://www.youtube.com/results?search_query=Marine+Engine+Lubrication+Explained', title:'Marine Engine Lubrication Explained', ch:'Dieselship' },
    ]
  },

  { id:'d1_cool', icon:'🌊', title:'Cooling System',
    tags:['FW Cooling','SW Cooling','HT/LT Loops','Heat Balance'],
    desc:"Fresh water and sea water cooling circuits, high-temperature and low-temperature loops, keel cooling, jacket water treatment, heat rejection, expansion tanks",
    formulas:[
      { label:"Heat Rejected (Cooling Water)", eq:"Q = ṁ × Cp × ΔT   [kW]",                note:"ṁ=flow rate(kg/s), Cp=4.186 kJ/kg·K for water, ΔT=temperature rise(K). Typically 25-35% of total fuel heat input is rejected to cooling water." },
      { label:"Engine Heat Balance",           eq:"Q_fuel = W_shaft + Q_exhaust + Q_coolant + Q_radiation", note:"Typical: shaft 46-50%, exhaust 25-30%, coolant 25-30%, radiation 2-3%. Values vary with load and engine type." },
      { label:"Pump Flow Rate",                eq:"ṁ = Q / (Cp × ΔT)   [kg/s]",            note:"Rearranged heat equation. Q=heat to be removed(kW), ΔT=allowed temperature rise. Larger ΔT → smaller pump needed." },
    ],
    flashcards:[
      { q:"Why use a two-circuit (HT/LT) cooling system on modern engines?", a:"HT loop (70-90°C): cools cylinders, cylinder heads. Maintains high enough temperature to prevent cold corrosion and water condensation. LT loop (25-45°C): cools scavenge air cooler, oil coolers, A/C plant. Allows charge air to be cooled to maximum density while controlling corrosion. Also enables waste heat recovery from HT loop to heat HFO or accommodation." },
      { q:"What additives are used in jacket cooling water?", a:"Corrosion inhibitors (nitrites, nitrates, molybdates) to prevent rust/pitting in cast iron/steel surfaces. Antifreeze (ethylene glycol) in cold climates. pH maintained 7-9. Regular sample analysis: pH, chlorides (contamination check), inhibitor concentration, hardness (scaling risk)." },
    ],
    videos:[
      { url:'https://www.youtube.com/results?search_query=Marine+Engine+Cooling+System', title:'Marine Engine Cooling System', ch:'Dieselship' },
    ]
  },

  { id:'d1_combustion', icon:'🔥', title:'Combustion & Indicator Diagrams',
    tags:['IHP','MEP','Heat Release','PV Diagram'],
    desc:"Diesel combustion stages, indicator diagrams (P-V and P-θ), indicated power, brake power, mechanical efficiency, heat release analysis",
    formulas:[
      { label:"Indicated Mean Effective Pressure", eq:"IMEP (Pm) = Work done per cycle / Swept volume   [bar]", note:"Obtained from area of indicator diagram. Typical 2-stroke: 18-24 bar. 4-stroke: 16-22 bar." },
      { label:"Indicated Power",  eq:"IHP [kW] = Pm [bar] × L [m] × A [m²] × N [rps] × k / 10", note:"Pm=IMEP(bar), L=stroke(m), A=piston area(m²), N=revs/sec, k=cylinders. Factor 10 converts bar·m³/s to kW (1 bar·m³/s = 100 kW)." },
      { label:"Brake Power",      eq:"BHP = 2π × N × T / 1000   [kW]",                            note:"N=rpm/60 (rev/s), T=torque(N·m). Measured at crankshaft — actual useful output. BHP < IHP by mechanical losses." },
      { label:"Mechanical Efficiency", eq:"η_mech = BHP / IHP × 100%",                            note:"Represents friction losses in engine. Typical: 88-94% for modern slow-speed engines. Decreases with wear." },
      { label:"Compression Ratio",    eq:"r_c = (V_s + V_c) / V_c = (V_BDC) / (V_TDC)",          note:"V_s=swept vol, V_c=clearance vol. Diesel: r_c = 14-22. Higher CR → better thermal efficiency but higher peak pressures." },
    ],
    flashcards:[
      { q:"Name the 4 stages of diesel combustion", a:"1) Ignition delay: fuel injected but not yet burning (0.001-0.003s) 2) Rapid (uncontrolled) combustion: fuel injected during delay burns suddenly → pressure rise 3) Controlled (diffusion) combustion: remaining fuel burns as injected → controls peak pressure 4) Afterburning: final combustion of residual fuel near TDC" },
      { q:"How is an indicator diagram taken and what does it show?", a:"Mechanical indicator or electronic pressure transducer records cylinder pressure vs crank angle. P-V diagram: area = work done per cycle → calculate IMEP and IHP. Shows combustion quality, injection timing, valve/port timing. Comparing diagrams across cylinders reveals uneven loading." },
    ],
    videos:[
      { url:'https://www.youtube.com/results?search_query=Indicator+Diagrams+and+Diesel+Combustion', title:'Indicator Diagrams and Diesel Combustion', ch:'MarineEngineering Pro' },
    ]
  },

  { id:'d1_tc', icon:'💨', title:'Turbocharging & Scavenging',
    tags:['Turbocharger','Scavenge','Air Ratio','Charge Air'],
    desc:"Exhaust gas turbocharging, scavenging types (uniflow, loop, cross), charge air coolers, air excess ratio, turbocharger performance matching",
    formulas:[
      { label:"Air Excess Ratio (λ)",      eq:"λ = actual air / stoichiometric air",               note:"λ=1: perfect combustion. λ<1: rich (black smoke). λ>1: lean (excess air). Marine diesels: λ = 2.0-2.5 at full load. Higher λ → cooler combustion, less NOx." },
      { label:"Scavenge Efficiency",        eq:"η_sc = fresh charge retained / total cylinder volume",note:"Perfect scavenging = 1.0. Uniflow scavenging (2-stroke): η_sc ≈ 0.85-0.95. Loop scavenging: ≈ 0.70-0.80." },
      { label:"Pressure Ratio (TC)",        eq:"P₂/P₁ = (T₂/T₁)^(γ/(γ-1))",                      note:"P₁=inlet pressure, P₂=delivery pressure. γ=1.4 for air. T₂s/T₁ = (P₂/P₁)^0.286 (isentropic). Actual: divide by isentropic efficiency (~0.75-0.80)." },
      { label:"Turbocharger Power Balance", eq:"Power turbine = Power compressor",                  note:"No external power input or output. W_turbine = ṁ_exhaust × Cp_exhaust × ΔT_turbine. W_comp = ṁ_air × Cp_air × ΔT_comp" },
    ],
    flashcards:[
      { q:"What is the purpose of the charge air cooler (CAC/scavenge cooler)?", a:"After turbocharger compressor heats air (raises temperature as well as pressure), CAC cools it with sea water. Cooling increases air density → more oxygen per m³ → more fuel can burn → higher power. Also reduces thermal load on piston crown and liner. Without CAC, boost pressure benefit is partly lost." },
      { q:"What are the types of scavenging in 2-stroke engines?", a:"1) Uniflow (MAN B&W): air enters through ports at bottom (piston-controlled), exhaust exits through valves at top — best efficiency, smooth flow. 2) Loop (older): air and exhaust use same valves/ports — air loops up then down — fair efficiency. 3) Cross: air and exhaust ports on opposite sides — poorest efficiency. Modern engines all use uniflow." },
    ],
    videos:[
      { id:'3gNEqrGEkVg', title:'Turbocharger Working Principle',           ch:'Learn Engineering' },
    ]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   3. AUXILIARY MACHINERY I (bt_aux)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_aux','⚓','Auxiliary Machinery I',
  'Pumps, heat exchangers, centrifugal separators, air compressors, steering gear — the support systems keeping the ship alive',
  'Sem 4', [

  { id:'aux_pumps', icon:'💧', title:'Centrifugal Pumps',
    tags:['Head','Flow','Affinity Laws','NPSH','Cavitation'],
    desc:"Centrifugal pump construction, characteristic curves, affinity laws, net positive suction head (NPSH), cavitation, pump selection and parallel/series operation",
    formulas:[
      { label:"Affinity Law 1 — Flow",     eq:"Q₂/Q₁ = N₂/N₁",                          note:"Flow proportional to speed. Double speed → double flow." },
      { label:"Affinity Law 2 — Head",     eq:"H₂/H₁ = (N₂/N₁)²",                       note:"Head proportional to speed². Double speed → 4× head." },
      { label:"Affinity Law 3 — Power",    eq:"P₂/P₁ = (N₂/N₁)³",                       note:"Power proportional to speed³. HUGE energy savings at reduced speed. 50% speed → 12.5% power!" },
      { label:"Hydraulic Power",           eq:"P = ρgQH / η_pump   [kW]",                note:"ρ=density(kg/m³), g=9.81m/s², Q=flow(m³/s), H=head(m), η=pump efficiency. Useful power = ρgQH." },
      { label:"NPSHa (Available NPSH)",    eq:"NPSHa = (P_s + ρgz_s − P_v) / (ρg)   [m]",note:"P_s=suction pressure, z_s=suction head, P_v=vapour pressure. Must exceed NPSHr (required) by ≥1m to avoid cavitation." },
    ],
    flashcards:[
      { q:"What is cavitation in a centrifugal pump and how does it damage it?", a:"If suction pressure drops below vapour pressure, liquid vaporises forming bubbles. Bubbles collapse violently near impeller causing micro-jets (4000 m/s) → erosion of impeller/casing. Symptoms: noise, vibration, loss of head, pitting. Prevent by ensuring NPSHa > NPSHr." },
      { q:"What happens when two identical pumps operate in parallel?", a:"Flow doubles at the same head (ideal). Actual: operating point moves up combined curve. Used when single pump can't deliver required flow. Each pump delivers equal flow at the same discharge head. Pumps must be identical to share load equally." },
    ],
    videos:[
      { id:'4pgPaaBzMrk', title:'Centrifugal Pump — Working Principle', ch:'Learn Engineering' },
    ]
  },

  { id:'aux_hx', icon:'🔄', title:'Heat Exchangers',
    tags:['Shell & Tube','Plate','LMTD','Effectiveness'],
    desc:"Shell-and-tube heat exchangers, plate heat exchangers, LMTD method, NTU-effectiveness method, fouling factors, marine cooling applications",
    formulas:[
      { label:"Heat Transfer Rate",   eq:"Q = U × A × LMTD   [kW]",                       note:"U=overall heat transfer coefficient(W/m²K), A=area(m²), LMTD=log mean temperature difference(K)" },
      { label:"LMTD (Counter-flow)",  eq:"LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁/ΔT₂)",            note:"ΔT₁,ΔT₂ = temperature differences at each end. Counter-flow always gives higher LMTD than parallel flow → more efficient." },
      { label:"Fouling Factor",       eq:"1/U_dirty = 1/U_clean + R_f",                   note:"R_f = fouling resistance. Scale/sludge reduces U. Plate exchangers need regular cleaning to maintain performance." },
    ],
    flashcards:[
      { q:"Advantages of plate heat exchanger over shell-and-tube on ships?", a:"Compact — 5× more surface area per volume. Easy cleaning — plates removable. Precise temperature control. Lower thermal mass. Disadvantage: limited to ~25 bar, <200°C. Cannot handle fouling fluids (risk of blocking narrow gaps). Used for: FW coolers, lube oil coolers, A/C condensers." },
      { q:"Why is counter-flow arrangement more efficient than parallel flow?", a:"In counter-flow, cold fluid enters where hot fluid exits — maximum temperature difference maintained throughout exchanger. LMTD is higher → more heat transferred for same area. In parallel flow, temperatures equalise quickly reducing driving force at exit." },
    ],
    videos:[{ id:'YYfhLwAkIV8', title:'Heat Exchanger Working Principle', ch:'Learn Engineering' }]
  },

  { id:'aux_sep', icon:'🌀', title:'Centrifugal Separators (Purifiers)',
    tags:['Purifier','Clarifier','Disc Stack','Sludge'],
    desc:"Fuel and lube oil purification — disc-stack centrifuge, purifier vs clarifier mode, gravity disc selection, desludging cycle, throughput vs efficiency",
    formulas:[
      { label:"Stokes Law (separation)",  eq:"v = d²(ρ_water − ρ_oil) × g / (18μ)   [m/s]", note:"v=terminal velocity of water droplet, d=droplet diameter, ρ=densities(kg/m³), μ=oil viscosity(Pa·s). Centrifuge replaces g with centrifugal acceleration (500-7000 × g)." },
      { label:"Centrifugal Acceleration", eq:"a = ω² × r = (2πN/60)² × r   [m/s²]",         note:"N=rpm, r=radius(m). At N=7000rpm, r=0.15m: a ≈ 55,000 m/s² (5600 × g). Tiny water droplets separated efficiently." },
    ],
    flashcards:[
      { q:"Difference between purifier and clarifier mode?", a:"Purifier: removes both water AND solids from oil. Requires sealing water to form liquid seal. Gravity disc selected to position oil-water interface at correct radius. Clarifier: removes only solids (when oil has no free water). No gravity disc — blanked off. Lube oil: usually clarifier. Fuel oil: purifier." },
      { q:"What is a gravity disc (dam ring) and how do you select correct size?", a:"Circular dam at top of disc stack — positions the oil-water interface inside the bowl. Too large disc (small diameter): interface moves inward → water carryover in oil outlet. Too small disc (large diameter): interface too far out → oil carryover in water outlet (loss of oil). Selected from chart using oil density and temperature." },
    ],
    videos:[{ id:'oEQiMK6qBns', title:'Centrifugal Separator Purifier Working', ch:'Dieselship' }]
  },

  { id:'aux_comp', icon:'🌬️', title:'Air Compressors',
    tags:['Starting Air','2-Stage','Inter-cooling','Safety Valve'],
    desc:"Starting air compressors — 2-stage reciprocating design, intercooling, moisture removal, safety devices, starting air pressure requirements and regulations",
    formulas:[
      { label:"Isothermal Work (compression)", eq:"W_iso = P₁V₁ × ln(P₂/P₁)   [J]",          note:"Best-case compression (constant temperature). More stages with intercooling → approaches isothermal → less work." },
      { label:"Temperature after Compression", eq:"T₂ = T₁ × (P₂/P₁)^((γ-1)/γ)",            note:"Single stage 1→30 bar: T₂ ≈ 293 × 30^0.286 ≈ 773K = 500°C! Two stages with intercooling cuts this drastically." },
      { label:"Volumetric Efficiency",          eq:"η_vol = 1 − r[(P₂/P₁)^(1/γ) − 1]",       note:"r=clearance ratio. High clearance volume → gas re-expands → reduced fresh air intake → lower efficiency." },
    ],
    flashcards:[
      { q:"Why use two-stage compression with intercooling?", a:"Single stage 1→30 bar produces ~500°C — dangerous (oil vapour ignition risk). Inter-stage cooling to ~40°C: reduces work input (approaching isothermal compression), removes condensed moisture, reduces final temperature (~90°C), safer and more efficient. Also allows smaller cylinders per stage." },
      { q:"What safety devices are fitted on a starting air compressor?", a:"1) High air temperature cutout (high temp after each stage) 2) High lubricating oil temperature/low pressure cutout 3) Safety relief valves on each stage (prevent overpressure) 4) Automatic moisture drain traps 5) Non-return valve on delivery (prevents air reversal) 6) Oil separator on delivery (prevents oily air entering starting system — fire risk)" },
    ],
    videos:[{ id:'XxDMCT5BRCA', title:'Reciprocating Air Compressor Explained', ch:'Learn Engineering' }]
  },

  { id:'aux_steer', icon:'🚢', title:'Steering Gear',
    tags:['Hydraulic','Ram Type','Rotary Vane','SOLAS Rules'],
    desc:"Hydraulic steering gear systems — ram type, rotary vane, electro-hydraulic, control systems, SOLAS requirements, emergency steering",
    formulas:[
      { label:"Hydraulic Force",     eq:"F = P × A   [N]",                                  note:"P=hydraulic pressure(Pa), A=piston area(m²). Steering gear torque = F × rudder arm length." },
      { label:"Time to Hard Over",   eq:"SOLAS: ≤28s for main steering, ≤60s for aux",     note:"Main steering: full rudder one side to 35° other side in ≤28 seconds. Auxiliary: 35° to 30° other side in ≤60s. At maximum designed speed." },
    ],
    flashcards:[
      { q:"SOLAS requirements for steering gear (main + auxiliary)", a:"Main: capable of putting rudder from 35° one side to 30° other side in ≤28s at max service speed. Auxiliary: independent of main, power-operated, capable of 35° to 30° in ≤60s, must be capable of being brought into use within 2 minutes." },
      { q:"Describe the 4-ram steering gear system", a:"Two pairs of hydraulic rams act on a tiller connected to rudder stock. Pump (main + standby) pressurises pairs of rams alternately to push tiller. Cross-connected — one pair pushes, other pulls. Hunter system uses gyro-stabilised autopilot. Advantages: no single point of failure, can operate with one pair of rams." },
    ],
    videos:[{ id:'qP8w3lZpSGw', title:'Ship Steering Gear System Explained', ch:'Wartsila' }]
  },

  { id:'aux_bilge', icon:'🚿', title:'Bilge & Ballast Systems',
    tags:['Bilge','Ballast','MARPOL Oily Water','15 ppm'],
    desc:"Bilge pumping systems, ballast water management, oily water separator (OWS), oil content monitor, MARPOL requirements — mandatory knowledge for deck/engine officers",
    formulas:[
      { label:"MARPOL 15 ppm Limit",  eq:"Oil content ≤ 15 ppm in discharged bilge water",  note:"Annex I, Regulation 14. Must use Oily Water Separator + oil content monitor. Log in ORB (Oil Record Book). Cannot discharge in Special Areas (0 ppm)." },
    ],
    flashcards:[
      { q:"Describe the Oily Water Separator (OWS) principle", a:"Stage 1 (gravity): coarse separation — oil (lighter) rises to top, water drawn off bottom. Stage 2 (coalescing plates/media): fine droplets coalesce on plates and rise. Oil content monitor continuously reads discharge — if >15 ppm, 3-way valve diverts flow back to bilge holding tank. Never bypass OWS — criminal offence under MARPOL." },
      { q:"What is recorded in the Oil Record Book (ORB) Part II?", a:"All ballasting/de-ballasting of fuel tanks, cleaning of fuel tanks, discharge of bilge water, accidental oil spills, transfer of oily residues to slop tanks, disposal of residues/slops to shore. Must be available for Port State inspection. Falsification = criminal offence." },
    ],
    videos:[{ id:'0K3sHQJwE0A', title:'Oily Water Separator MARPOL', ch:'Marine Engineers Education' }]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   4. APPLIED THERMODYNAMICS / THERMO II (bt_thermo2)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_thermo2','🌡️','Applied Thermodynamics',
  'Diesel & Rankine cycles, gas turbines, refrigeration cycles, psychrometrics — direct application to marine propulsion and hotel systems',
  'Sem 3', [

  { id:'th2_diesel', icon:'🔥', title:'Diesel Cycle Analysis',
    tags:['Air Standard','Efficiency','Cut-off','Compression'],
    desc:"Air-standard Diesel cycle, thermal efficiency, effect of compression ratio and cut-off ratio, comparison with Otto cycle, modifications for real engines",
    formulas:[
      { label:"Diesel Cycle Efficiency",   eq:"η_th = 1 − (1/r_c^(γ-1)) × [(r_cut^γ−1) / (γ(r_cut−1))]", note:"r_c=compression ratio, r_cut=cut-off ratio=(V₃/V₂), γ=1.4 for air. Higher r_c → higher efficiency. Higher r_cut → lower efficiency (more constant pressure burning)." },
      { label:"Heat Added (Diesel)",       eq:"Q_in = m × Cv × (T₃ − T₂)  [kJ]",              note:"Heat added at constant pressure in Diesel cycle. T₃ = T at end of combustion, T₂ = T after compression." },
      { label:"Thermal Efficiency (simple)", eq:"η_th = 1 − Q_rejected/Q_supplied",             note:"Universal definition. For Diesel cycle with r_c=16 → η_th ≈ 57%. Real engine ≈ 50% due to friction and irreversibilities." },
    ],
    flashcards:[
      { q:"How does increasing compression ratio affect Diesel cycle efficiency?", a:"η increases with compression ratio. r_c: 14→50%, 16→57%, 18→61%. Practical limit: higher CR → higher peak pressures → stronger (heavier) engine required. Also harder starting issues if too high. Modern large 2-stroke: r_c ≈ 14-18." },
    ],
    videos:[{ id:'9gryWX4EXaI', title:'Diesel Cycle Thermodynamic Analysis', ch:'Michel van Biezen' }]
  },

  { id:'th2_rankine', icon:'💧', title:'Rankine Cycle (Steam)',
    tags:['Boiler','Turbine','Condenser','Feedpump'],
    desc:"Ideal and actual Rankine cycle, steam power plant components, efficiency, superheat, reheat, feed heating — waste heat recovery boilers on modern ships",
    formulas:[
      { label:"Rankine Cycle Efficiency", eq:"η_Rankine = (h_turbine_in − h_turbine_out − W_pump) / (h_boiler_out − h_pump_out)", note:"h values from steam tables. W_pump usually small. η_Rankine typically 25-40%. Combined with diesel: waste heat recovery." },
      { label:"Turbine Work",             eq:"W_turbine = h₁ − h₂s [kJ/kg]",                  note:"h₁=turbine inlet enthalpy, h₂s=ideal exit enthalpy (isentropic). Actual: W_actual = η_is × W_turbine." },
      { label:"Boiler Heat Input",        eq:"Q_boiler = h_steam − h_feed   [kJ/kg]",          note:"h_steam = enthalpy at boiler exit (superheated steam). h_feed = enthalpy of feed water entering boiler." },
    ],
    flashcards:[
      { q:"What is waste heat recovery on a diesel ship and how does it work?", a:"Exhaust gas from main engine at ~300-400°C passes through exhaust gas economiser (waste heat boiler). Generates steam (typically 6-8 bar) for: fuel oil heating, accommodation heating, and steam turbine generator (power turbogenerator — generates extra electricity). Improves overall plant efficiency from ~50% to ~55%." },
    ],
    videos:[{ id:'tKoWkfNDaP4', title:'Rankine Cycle Explained with Steam Tables', ch:'Michel van Biezen' }]
  },

  { id:'th2_refrig', icon:'❄️', title:'Refrigeration Cycle',
    tags:['COP','Refrigerant','Compressor','Evaporator','R404A'],
    desc:"Vapour compression refrigeration cycle, COP, refrigerants (R404A, R134a, R22 phaseout), ship provisions refrigeration, air conditioning, cargo refrigeration",
    formulas:[
      { label:"COP (Coefficient of Performance)", eq:"COP = Q_evaporator / W_compressor = (h₁−h₄)/(h₂−h₁)", note:"h₁=compressor inlet, h₂=compressor outlet, h₄=expansion valve outlet. Higher COP = more cooling per unit work. Typical: 2.5-4.0 for ship systems." },
      { label:"Refrigerating Effect",             eq:"RE = h₁ − h₄   [kJ/kg]",                note:"h₁=evaporator outlet (superheated vapour), h₄=expansion valve outlet (wet mixture). Amount of heat absorbed per kg of refrigerant." },
      { label:"Compressor Work",                  eq:"W = h₂ − h₁   [kJ/kg]",                  note:"h₂=outlet (high pressure superheated), h₁=inlet (low pressure superheated). Must minimise for high COP." },
    ],
    flashcards:[
      { q:"Name the 4 main components of a vapour compression refrigeration cycle and what happens in each", a:"1) Compressor: low-pressure vapour → high-pressure superheated vapour (work input). 2) Condenser: rejects heat → vapour condenses to liquid (cooled by sea water/air). 3) Expansion valve (TX valve): high-pressure liquid → low-pressure wet mixture (pressure drops, temperature drops). 4) Evaporator: absorbs heat from cold space → liquid evaporates to vapour (refrigeration effect)." },
      { q:"Why are R22 and R12 being phased out on ships?", a:"R22 (HCFC) and R12 (CFC): contain chlorine → ozone-depleting substances (ODS). Montreal Protocol bans production/use. R12 banned since 1996. R22: phase-out complete in developed countries. Replacements: R134a (HFC, zero ODP), R404A (blend, low ODP), newer: R32, R1234yf (low GWP). Ships must retrofit or replace with compliant refrigerants." },
    ],
    videos:[{ id:'g-ObSAFPVz8', title:'Refrigeration Cycle on PH Diagram', ch:'Michel van Biezen' }]
  },

  { id:'th2_gas', icon:'✈️', title:'Gas Turbines',
    tags:['Brayton Cycle','Compressor','Combustor','Nozzle'],
    desc:"Open/closed Brayton cycle, gas turbine components, efficiency, specific work output, regeneration, intercooling — gas turbines in naval and fast ferry propulsion",
    formulas:[
      { label:"Brayton Cycle Efficiency",  eq:"η = 1 − T₁/T₂ = 1 − 1/(P₂/P₁)^((γ-1)/γ)",   note:"T₁=compressor inlet temp, T₂=compressor outlet temp. Higher pressure ratio → higher η. But T₃ (turbine inlet) limit ≈ 1200-1700°C due to materials." },
      { label:"Specific Work Output",      eq:"W_net = W_turbine − W_compressor = Cp(T₃−T₄) − Cp(T₂−T₁)", note:"Turbine work must greatly exceed compressor work for gas turbines to be useful. Typically 50% of turbine work goes back to compressor — back work ratio problem." },
    ],
    flashcards:[
      { q:"Why are gas turbines used in naval ships but rarely in merchant ships?", a:"Gas turbines: very high power-to-weight ratio (compact for warships), fast start-up, low crew, good partial-load response. Disadvantages for merchant: very high fuel consumption (thermal efficiency ≈ 30-35% vs diesel 50%), expensive maintenance, poor efficiency on heavy fuel. Some fast ferries and LNG carriers use combined diesel-gas (CODAG) arrangements." },
    ],
    videos:[{ id:'k9DkixMOC5s', title:'Gas Turbine Working Principle Brayton Cycle', ch:'Learn Engineering' }]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   5. FLUID MECHANICS & MACHINERY (bt_fluid1, bt_fluid2)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_fluid1','💧','Fluid Mechanics I',
  'Fluid statics and dynamics — pressure, flow, Bernoulli, pipe flow, boundary layer — fundamentals applied to all marine fluid systems',
  'Sem 2', [

  { id:'fl1_statics', icon:'📊', title:'Fluid Statics',
    tags:['Pressure','Buoyancy','Manometers','Dams'],
    desc:"Hydrostatic pressure, Pascal's law, pressure measurement, buoyancy and Archimedes' principle, forces on submerged surfaces",
    formulas:[
      { label:"Hydrostatic Pressure",  eq:"P = ρgh   [Pa]",                           note:"ρ=density(kg/m³), g=9.81m/s², h=depth(m). Every 10m depth ≈ 1 bar for seawater (ρ=1025 kg/m³)." },
      { label:"Buoyancy Force",        eq:"F_B = ρ_fluid × g × V_submerged   [N]",   note:"Archimedes: buoyancy = weight of fluid displaced. Ship floats when F_B = weight of ship." },
      { label:"Force on Submerged Plane", eq:"F = ρg × h̄ × A   [N]",               note:"h̄=depth of centroid of area, A=area of surface. Acts at centre of pressure (below centroid for vertical surfaces)." },
    ],
    flashcards:[
      { q:"State Archimedes' principle and how it applies to ship stability", a:"A body immersed in fluid experiences an upward buoyant force equal to the weight of fluid displaced. Ship floats when buoyancy = displacement weight. Adding weight sinks ship until new displaced volume balances. Damaged stability: flooding reduces reserve buoyancy." },
    ],
    videos:[{ id:'cDU6eCTFqJg', title:'Fluid Statics — Pressure and Buoyancy', ch:'Michel van Biezen' }]
  },

  { id:'fl1_bernoulli', icon:'🌊', title:'Bernoulli & Flow Equations',
    tags:['Bernoulli','Continuity','Venturi','Pitot'],
    desc:"Continuity equation, Bernoulli's equation, applications (Venturi meter, Pitot tube, orifice plate), flow measurement, velocity profiles",
    formulas:[
      { label:"Continuity Equation", eq:"A₁V₁ = A₂V₂   [m³/s]",                      note:"Conservation of mass for incompressible flow. Smaller area → higher velocity. Used in nozzles, venturis, pipe transitions." },
      { label:"Bernoulli Equation",  eq:"P + ½ρV² + ρgz = constant   [Pa]",           note:"Conservation of energy along streamline. Increased velocity → decreased pressure (lift, venturi). Assumes: steady, incompressible, inviscid, along streamline." },
      { label:"Venturi Meter Flow",  eq:"Q = C_d × A₂ × √[2(P₁−P₂)/(ρ(1−(A₂/A₁)²))]",note:"C_d=discharge coefficient (≈0.98). Measures flow by pressure difference at throat vs inlet." },
    ],
    flashcards:[
      { q:"Apply Bernoulli's principle to explain why a pump loses suction (cavitation)", a:"At pump impeller eye, velocity is maximum. By Bernoulli: high velocity → low pressure. If this falls below vapour pressure of liquid at that temperature, liquid flashes to vapour → cavitation bubbles → damage impeller. Prevent: keep suction head high (pump below tank), short suction pipe, large diameter pipe, cold fluid." },
    ],
    videos:[{ id:'7KJUYAmBIec', title:'Bernoulli Equation Applications', ch:'Michel van Biezen' }]
  },

  { id:'fl1_pipe', icon:'🔧', title:'Pipe Flow & Losses',
    tags:['Reynolds Number','Darcy','Friction','Minor Losses'],
    desc:"Laminar and turbulent flow, Reynolds number, Darcy-Weisbach equation, pipe friction factor (Moody chart), minor losses, equivalent pipe length, system curves",
    formulas:[
      { label:"Reynolds Number",     eq:"Re = ρVD/μ = VD/ν",                          note:"Re < 2100: laminar. Re > 4000: turbulent. V=velocity(m/s), D=diameter(m), ν=kinematic viscosity(m²/s)." },
      { label:"Darcy-Weisbach",      eq:"h_f = f × (L/D) × (V²/2g)   [m]",           note:"f=Darcy friction factor (from Moody chart), L=pipe length(m), D=diameter(m), V=velocity(m/s). Major pipe losses." },
      { label:"Minor Loss",          eq:"h_minor = K × V²/(2g)   [m]",                note:"K=loss coefficient (valve≈0.2-10, bend≈0.2-1.5, entrance≈0.5, exit≈1.0). Sum with major losses for total system head." },
    ],
    flashcards:[
      { q:"How do you use the Reynolds number to predict flow type?", a:"Re = ρVD/μ. Re < 2100: laminar (smooth, parallel streamlines, f = 64/Re). Re > 4000: turbulent (chaotic, f from Moody chart). 2100-4000: transition (unstable). Marine pipe systems at high velocity: usually turbulent. Critical for predicting pump head losses, flow rates." },
    ],
    videos:[{ id:'mODMpVioCLo', title:'Pipe Flow and Friction Factor', ch:'The Efficient Engineer' }]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   6. MARINE ELECTRICAL TECHNOLOGY I (bt_elec2)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_elec2','⚡','Marine Electrical Technology I',
  '3-phase generation, synchronous generators, parallel operation, motor starters, switchboard — shipboard power systems from generation to distribution',
  'Sem 3', [

  { id:'elec2_gen', icon:'🔋', title:'Synchronous Generators',
    tags:['Excitation','AVR','EMF','Synchronising'],
    desc:"Construction, EMF equation, excitation systems (AVR), voltage regulation, parallel operation, droop characteristics, synchronising procedure",
    formulas:[
      { label:"EMF Equation",        eq:"E = 4.44 × f × N × Φ × k_w   [V]",         note:"f=frequency(Hz), N=turns per phase, Φ=flux per pole(Wb), k_w=winding factor(≈0.95). Generated EMF proportional to speed and excitation." },
      { label:"Voltage Regulation",  eq:"VR = (E₀ − V_t) / V_t × 100%",             note:"E₀=no-load terminal voltage, V_t=full-load terminal voltage. Good generator: VR < 5%. High VR: voltage droops under load — AVR compensates." },
      { label:"Generator Frequency", eq:"f = P × N / 120   [Hz]",                    note:"P=poles, N=rpm. 4-pole, 1800rpm → 60Hz. 4-pole, 1500rpm → 50Hz. Marine: 60Hz standard." },
    ],
    flashcards:[
      { q:"Describe the procedure for paralleling a generator onto the switchboard", a:"Steps: 1) Bring incoming generator to correct voltage (adjust excitation) 2) Bring to correct frequency (adjust governor) 3) Check phase sequence (once, when first installed) 4) Use synchroscope — rotating toward 12 o'clock, close breaker at 11 o'clock position (just before 12) 5) Gradually load incoming generator, unload running generator. Dark lamp method: all lamps extinguished = correct conditions." },
    ],
    videos:[{ id:'9W0SiIxaVZ0', title:'Synchronous Generator Working Principle', ch:'The Engineering Mindset' }]
  },

  { id:'elec2_dist', icon:'🔌', title:'Power Distribution & Switchboards',
    tags:['Bus Bar','Circuit Breakers','Protection','Earthing'],
    desc:"Main switchboard, emergency switchboard, bus bars, circuit breakers (ACB, MCCB, MCB), protection relays (overcurrent, differential, earth fault), shore connection",
    formulas:[
      { label:"Short Circuit Current",  eq:"I_sc = V_n / Z_total   [A]",              note:"Z_total=source impedance + transformer + cable. Circuit breaker must interrupt this current. Higher I_sc → larger (more expensive) breakers required." },
      { label:"Cable Rating (simplified)",eq:"I_rated = P / (√3 × V_L × PF × η)",     note:"Derate for ambient temperature, grouping, installation method. Cable must not exceed rated temperature at max current." },
    ],
    flashcards:[
      { q:"What is the significance of insulated neutral (IT system) vs earthed neutral (TN system) on ships?", a:"Ships use insulated neutral (IT/unearthed): first earth fault does NOT cause trip or danger — just alarm. Second earth fault on a different phase = short circuit → fault. This prevents single fault from blacking out ship. Shore power: TN system. When connecting shore power, must check earthing compatibility and use isolating transformer or monitor for first earth fault." },
      { q:"What is preferential tripping?", a:"When generator is overloaded (excess current), preferential trips automatically disconnect non-essential loads in priority order: first galley equipment, then lighting circuits, then ventilation — before main breaker trips. Prevents total blackout. Essential services (navigation, steering, communication) never tripped." },
    ],
    videos:[{ id:'CmYs_3zJnKA', title:'Ship Electrical Distribution System', ch:'Dieselship' }]
  },

  { id:'elec2_starters', icon:'⚙️', title:'Motor Starters & Control',
    tags:['DOL','Star-Delta','Autotransformer','VFD'],
    desc:"Direct-on-line, star-delta, auto-transformer, soft starter, VFD (variable frequency drive) — selection criteria, wiring, control circuits, overload protection",
    formulas:[
      { label:"Star-Delta Starting Current", eq:"I_start(star) = I_start(DOL) / 3",   note:"Star-delta reduces starting current to 1/3 of DOL. But also reduces starting torque to 1/3 — adequate for pumps/fans (low starting torque requirement)." },
      { label:"VFD Energy Savings",           eq:"P_saved = P_rated × [1 − (N_reduced/N_rated)³]", note:"Affinity laws: power ∝ N³. Running pump at 80% speed → only 51% power. Running at 60% → only 22% power. Massive savings on ballast/FW pumps." },
    ],
    flashcards:[
      { q:"When would you choose a VFD (Variable Frequency Drive) over a star-delta starter?", a:"VFD: when variable speed control needed (ballast pumps, ventilation fans, cargo pumps — save huge energy at partial load). Soft start/stop (no current spike, no mechanical shock). Remote/automated control. Star-delta: simple, low cost, when constant speed is acceptable and starting torque not critical. VFD costs 3-5× more but pays back in energy savings within 2-3 years for large pumps." },
    ],
    videos:[{ id:'H_j7mhFxCKg', title:'Variable Frequency Drive Explained', ch:'The Engineering Mindset' }]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   7. REFRIGERATION & AIR CONDITIONING (bt_refrig)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_refrig','❄️','Refrigeration & Air Conditioning',
  'Vapour compression systems for provisions, air conditioning, cargo reefer — components, refrigerants, controls, troubleshooting',
  'Sem 5', [

  { id:'ref_cycle', icon:'🔄', title:'Vapour Compression System',
    tags:['P-H Diagram','Superheat','Subcooling','Refrigerants'],
    desc:"Complete refrigeration cycle on P-H (Mollier) diagram, superheat and subcooling effects, refrigerant properties, TXV operation",
    formulas:[
      { label:"COP of Refrigerator",   eq:"COP = RE / W_comp = (h₁−h₄)/(h₂−h₁)",   note:"h₁=evap outlet, h₂=comp outlet, h₄=expansion outlet. COP: provisions ≈ 2-3, cargo ≈ 1.5-2, A/C ≈ 3-4." },
      { label:"Refrigerating Capacity",eq:"Q_ref = ṁ × (h₁ − h₄)   [kW]",           note:"ṁ=mass flow rate(kg/s). Increasing ṁ by faster compressor or larger expansion → more cooling capacity." },
      { label:"Condenser Heat Rejection",eq:"Q_cond = ṁ × (h₂ − h₃)   [kW]",        note:"Always Q_cond = Q_evap + W_compressor. More heat rejected than absorbed. Condenser must be sized accordingly." },
    ],
    flashcards:[
      { q:"What is superheat and why is it important to control?", a:"Superheat: temperature of refrigerant vapour above its saturation temperature at that pressure. Maintained at compressor suction (typically 5-8°C superheat) to: ensure no liquid enters compressor (liquid slugging = compressor damage), provide enough vapour density for good volumetric efficiency. TXV (thermostatic expansion valve) controls superheat automatically." },
      { q:"What refrigerants replace R22 and what are their properties?", a:"R404A: HFC blend (R125/143a/134a), zero ODP, GWP=3922, used in provisions and cargo reefer (-40°C to +10°C range). R134a: HFC, zero ODP, GWP=1430, used in A/C and water chillers. R32: lower GWP=675, slightly flammable (A2L), good efficiency. Future: R1234yf/ze (GWP<1, near zero). Trend: natural refrigerants (CO₂, NH₃) for new builds." },
    ],
    videos:[{ id:'g-ObSAFPVz8', title:'Refrigeration Cycle P-H Diagram', ch:'Michel van Biezen' }]
  },

  { id:'ref_ac', icon:'🌡️', title:'Air Conditioning Systems',
    tags:['Psychrometrics','Cooling Load','AHU','Dehumidification'],
    desc:"Psychrometrics (dry bulb, wet bulb, humidity), cooling load calculation, air handling units, chilled water systems, shipboard A/C design",
    formulas:[
      { label:"Dry Bulb Temperature",   eq:"DBT = temperature of air (standard thermometer)",   note:"What we normally call 'temperature'. Controls human comfort (18-26°C comfort zone for accommodation)." },
      { label:"Relative Humidity",      eq:"RH = (P_water vapour / P_saturation) × 100%",       note:"50-60% RH comfortable. >70%: muggy, condensation risk on cold surfaces. <30%: dry, static electricity risk." },
      { label:"Sensible Heat",          eq:"Q_sensible = ṁ_air × Cp_air × ΔT_air   [kW]",      note:"Cp_air ≈ 1.0 kJ/kg·K. Sensible heat changes temperature. Latent heat changes moisture content (phase change of water vapour)." },
    ],
    flashcards:[
      { q:"What is the purpose of the air conditioning system on a ship?", a:"Maintain comfortable and safe environment for crew and passengers: temperature 18-26°C, humidity 50-60%, fresh air supply (dilute CO₂ and contaminants), positive pressure in accommodation (prevent gas/fume ingress from deck). SOLAS: must maintain specified conditions. Critical for crew fatigue, performance, safety." },
    ],
    videos:[{ id:'oFlJGXRyFiE', title:'Psychrometrics and Air Conditioning Basics', ch:'The Engineering Mindset' }]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   8. ENGINEERING THERMODYNAMICS I (bt_thermo1)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_thermo1','🔥','Engineering Thermodynamics I',
  'First and second laws of thermodynamics, gas laws, work and heat, entropy, thermodynamic processes and cycles — foundations for all heat engine analysis',
  'Sem 2', [

  { id:'th1_laws', icon:'⚖️', title:'Laws of Thermodynamics',
    tags:['First Law','Second Law','Entropy','Enthalpy'],
    desc:"Zeroth, first, and second laws. Internal energy, enthalpy, entropy. Work and heat as boundary phenomena. Irreversibility and availability.",
    formulas:[
      { label:"First Law (closed system)", eq:"Q − W = ΔU   [kJ]",                   note:"Q=heat added(+) or rejected(-), W=work done by system(+) or on system(-), ΔU=change in internal energy. Energy conservation." },
      { label:"First Law (open system)",   eq:"Q − W_s = Δh + ΔKE + ΔPE",           note:"W_s=shaft work, Δh=enthalpy change, ΔKE=kinetic energy change, ΔPE=potential energy change. For pumps, compressors, turbines." },
      { label:"Entropy Change",            eq:"dS = δQ_rev / T   [kJ/K]",            note:"Reversible process: dS = Q/T. Irreversible: dS > Q/T. For isolated system: ΔS ≥ 0 (second law — entropy never decreases)." },
      { label:"Enthalpy",                  eq:"H = U + PV   [kJ]",                    note:"State function. For constant pressure processes: Q = ΔH. For steam: h = u + Pv from steam tables." },
    ],
    flashcards:[
      { q:"What does the Second Law of Thermodynamics mean in practical terms?", a:"Heat naturally flows from hot to cold, never the reverse without work input. No heat engine can be 100% efficient. Every real process increases total entropy of universe. For marine engineers: can never extract all heat energy as work (hence always have cooling water and exhaust heat losses); refrigerators need work input; best possible efficiency = Carnot efficiency." },
      { q:"Explain Carnot efficiency and why it's important as a benchmark", a:"η_Carnot = 1 − T_cold/T_hot (absolute temperatures in Kelvin). Maximum possible efficiency between two temperature reservoirs. Real engines always less efficient. Marine diesel: T_hot≈1500K (peak combustion), T_cold≈300K (ambient) → Carnot max 80%. Actual diesel ≈50% due to irreversibilities. Sets the upper limit of thermal performance." },
    ],
    videos:[{ id:'JacLiMZRpWA', title:'Laws of Thermodynamics Explained', ch:'Domain of Science' }]
  },

  { id:'th1_gases', icon:'💨', title:'Gas Laws & Processes',
    tags:['Ideal Gas','Isothermal','Adiabatic','Polytropic'],
    desc:"Ideal gas equation, specific heats, polytropic processes (isothermal, isentropic, isochoric, isobaric), work and heat calculations for each process",
    formulas:[
      { label:"Ideal Gas Law",           eq:"PV = mRT   or   Pv = RT   [Pa·m³]",     note:"P=absolute pressure(Pa), V=volume(m³), m=mass(kg), R=specific gas constant, T=absolute temperature(K). Air: R=287 J/kg·K." },
      { label:"Polytropic Process",      eq:"PVⁿ = constant;  TV^(n-1) = const;  T/P^((n-1)/n) = const", note:"n=1: isothermal. n=γ: isentropic (adiabatic reversible). n=0: isobaric. n=∞: isochoric. γ for air = 1.4." },
      { label:"Work in Polytropic",      eq:"W = (P₂V₂ − P₁V₁) / (1 − n)   [J]",  note:"For n≠1. For n=1 (isothermal): W = P₁V₁ ln(V₂/V₁). For n=γ (isentropic), this is work in a compressor/turbine." },
    ],
    flashcards:[
      { q:"Describe what happens to temperature and pressure in an isentropic (adiabatic) compression", a:"Isentropic: no heat exchange, reversible. Both temperature AND pressure increase. T₂/T₁ = (P₂/P₁)^((γ-1)/γ). For air compressed from 1 to 10 bar: T₂/T₁ = 10^0.286 = 1.93. So from 300K → 579K (306°C). This is why compressors get hot and intercooling is needed for multi-stage compression." },
    ],
    videos:[{ url:'https://www.youtube.com/results?search_query=Ideal+Gas+Thermodynamic+Processes+The+Efficient+Engineer', title:'Ideal Gas Thermodynamic Processes', ch:'The Efficient Engineer' }]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   9. NAVAL ARCHITECTURE I (bt_naval1)
   ───────────────────────────────────────────────────────────────────────── */
setChapters('bt_naval1','⚓','Naval Architecture I',
  'Ship geometry, stability theory, buoyancy, displacement, deadweight — foundational theory for all ship operations',
  'Sem 3', [

  { id:'nav1_hydro', icon:'🚢', title:'Ship Hydrostatics',
    tags:['Displacement','TPC','FWA','Freeboard'],
    desc:"Ship form coefficients, displacement, tons per centimetre, freeboard and loadlines, fresh water allowance, deadweight calculation",
    formulas:[
      { label:"Block Coefficient",     eq:"C_B = Δ / (L × B × T × ρ)",               note:"Δ=volume displacement(m³), L=length, B=breadth, T=draught(m). Tankers: C_B=0.80-0.85. Container: C_B=0.60-0.65. Fast ships: C_B<0.60." },
      { label:"Tons Per Centimetre",   eq:"TPC = A_WP × ρ / 100   [t/cm]",           note:"A_WP=waterplane area(m²), ρ=water density(t/m³). Each centimetre sinkage/rise = TPC tonnes loaded/discharged. Used for cargo calculations." },
      { label:"Fresh Water Allowance", eq:"FWA = Δ / (4 × TPC)   [mm]",              note:"FWA = sinkage on going from salt to fresh water. δρ = 1025-1000 = 25 kg/m³. Ship sinks deeper in fresh water. FWA can be 150-300mm for large ships." },
    ],
    flashcards:[
      { q:"What is reserve buoyancy and why is it important?", a:"Reserve buoyancy = watertight volume above waterline (superstructure, freeboard deck, coamings). Provides additional buoyancy if water floods lower spaces. Lost when: flooding, excess loading, structural damage. SOLAS freeboard rules ensure minimum reserve buoyancy. Reserve buoyancy = (displacement at freeboard draught − actual displacement) / actual displacement × 100%." },
    ],
    videos:[{ id:'2tE4eM_LQIA', title:'Ship Hydrostatics and Stability Basics', ch:'Eyres Naval Architecture' }]
  },

  { id:'nav1_stab', icon:'📐', title:'Initial Stability',
    tags:['GM','Metacentre','GZ Curve','Righting Lever'],
    desc:"Metacentric height, transverse stability, righting levers, statical stability curve (GZ), effect of free surfaces, stability criteria",
    formulas:[
      { label:"Metacentric Height",     eq:"GM = KB + BM − KG   [m]",                note:"KB=keel to centre of buoyancy, BM=buoyancy to metacentre(=I_WP/V), KG=keel to centre of gravity. GM > 0 = stable." },
      { label:"BM (metacentric radius)",eq:"BM = I_WP / V   [m]",                    note:"I_WP=second moment of waterplane area about centreline, V=volume displacement. Wider ship → larger I_WP → larger BM → better stability." },
      { label:"GZ (righting lever)",    eq:"GZ = GM × sin θ  (for small angles, <10°)", note:"GZ=righting lever(m), θ=angle of heel. GZ curve gives stability at large angles. Positive GZ = restoring force." },
      { label:"Free Surface Correction",eq:"GG₁ = (i × ρ_L) / (V × ρ_S)   [m]",   note:"i=second moment of free surface, ρ_L=liquid density, V=displaced volume, ρ_S=ship displacement density. Reduces effective GM — dangerous!" },
    ],
    flashcards:[
      { q:"A ship has GM = 0.5m. What does this mean and is it adequate?", a:"GM=0.5m: ship is positively stable (upright if undisturbed, returns to upright after heeling). Minimum IMO intact stability: GM ≥ 0.15m and GZ ≥ 0.20m at 30°. However GM<0.15m: tender (slow, uncomfortable rolling). GM>1.0m: stiff (short, violent rolling — crew fatigue, cargo shifting). Optimal: 0.2-0.6m depending on ship type." },
      { q:"How does adding ballast water affect GM?", a:"Adding ballast in double bottom tanks: lowers KG (weight goes down) → GM increases. But: free surface of ballast water → free surface correction (reduces GM). And: extra weight increases displacement → KB rises slightly. Net effect depends on where ballast added. Filling tanks completely eliminates free surface correction." },
    ],
    videos:[{ id:'gPdq1oZ7wrg', title:'Ship Stability — Metacentric Height GM', ch:'Eyres' }]
  },
]);

/* ─────────────────────────────────────────────────────────────────────────
   10. Ensure all Ganpat University topic IDs have at least an empty stub
   ───────────────────────────────────────────────────────────────────────── */
[// Sem 1
 'bt_maths1','bt_physics','bt_commskills','bt_draw','bt_workshop1','bt_civil',
 // Sem 2
 'bt_maths2','bt_elec1','bt_prog','bt_mechengg','bt_mech','bt_cad','bt_workshop2','bt_seamanship',
 // Sem 3
 'bt_shipconstruct','bt_thermo2','bt_metec1','bt_strength','bt_diesel1','bt_gp1',
 // Sem 4
 'bt_metec2','bt_basicelec','bt_materials','bt_mathsmarine','bt_tom','bt_fluid1','bt_aux','bt_gp2',
 // Sem 5
 'bt_firecontrol','bt_machdesign','bt_diesel2','bt_vibration','bt_naval1','bt_electronics','bt_gp3',
 // Sem 6
 'bt_refrig','bt_aux2','bt_metec3','bt_boilers','bt_medraw','bt_imo',
 // Sem 7
 'bt_shipyard','bt_ers',
 // Sem 8
 'bt_shipsafety','bt_automation','bt_management','bt_machsysdesign','bt_project',
 'bt_shipopslog','bt_advelectronics','bt_altfuels'
].forEach(tid => {
  if(!TOPIC_KNOWLEDGE[tid]) TOPIC_KNOWLEDGE[tid] = { formulas:[], flashcards:[], videos:[] };
});

console.log('%c[v16] BTech Chapter System loaded — Ganpat University official syllabus', 'color:#4ade80;font-weight:bold');

/* ═══════════════════════════════════════════════════════════════════════════
   CHAPTER NAVIGATION — UI + SELECTTOPIC PATCH
   ═══════════════════════════════════════════════════════════════════════════ */

/* Store parent subject info for back-navigation */
const SUBJ_PARENT = {};  // subtopicId → parentId

/* Register parent relationships for all subjects */
Object.keys(TOPIC_KNOWLEDGE).forEach(tid => {
  const entry = TOPIC_KNOWLEDGE[tid];
  if(entry?.subtopics?.length){
    entry.subtopics.forEach(st => { SUBJ_PARENT[st.id] = tid; });
  }
});

/* ── loadSubtopicContent — FULL REWRITE ── */
window.loadSubtopicContent = function(parentId, subtopicId, title, desc){
  const entry   = TOPIC_KNOWLEDGE[parentId];
  const chapter = entry?.subtopics?.find(s => s.id === subtopicId);

  /* Decide what to load */
  const fmls   = chapter?.formulas   || entry?.formulas   || [];
  const flash  = chapter?.flashcards || entry?.flashcards || [];
  const vids   = chapter?.videos     || entry?.videos     || [];

  /* Load into tabs */
  if(typeof loadFormulas   === 'function') loadFormulas(fmls);
  if(typeof loadFlashcards === 'function') loadFlashcards(flash);
  if(typeof loadVideos     === 'function') loadVideos(vids);

  /* Set AI context */
  APP.currentTopic    = parentId;
  APP._subtopicId    = subtopicId;
  APP._subtopicTitle = title;
  const ql = document.getElementById('quizTopic'); if(ql) ql.textContent = title;

  /* Search input */
  const inp = document.getElementById('searchInput');
  if(inp){ inp.value = ''; inp.placeholder = `Ask AI about "${title}"…`; }

  /* Build chapter content header inside topicZone */
  const tz = document.getElementById('topicZone'); if(!tz) return;

  /* Remove old chapter header/banner */
  tz.querySelectorAll('.chapter-crumb,.chapter-content-header,#stopic-banner,.stopic-grid-wrap').forEach(el => el.remove());

  /* Back breadcrumb */
  const crumb = document.createElement('div');
  crumb.className = 'chapter-crumb';
  const subj = TOPIC_KNOWLEDGE[parentId];
  const subjTitle = subj?._subjTitle || parentId;
  crumb.innerHTML = `<span class="chapter-crumb-back" onclick="selectTopic('${parentId}','${subjTitle.replace(/'/g,"\\'")}','','📖','B.Tech')">← ${subjTitle}</span>
    <span class="chapter-crumb-sep">›</span>
    <span class="chapter-crumb-cur">${esc(title)}</span>`;

  /* Chapter content header */
  const hdr = document.createElement('div');
  hdr.className = 'chapter-content-header';
  hdr.innerHTML = `
    <div class="ch-content-icon">${chapter?.icon || '📖'}</div>
    <div style="flex:1;min-width:0">
      <div class="ch-content-title">${esc(title)}</div>
      <div class="ch-content-desc">${esc(desc)}</div>
      <div class="subj-header-meta" style="margin-top:6px">
        ${(chapter?.tags||[]).map(t=>`<span class="subj-meta-tag">${esc(t)}</span>`).join('')}
      </div>
    </div>
    <button class="ch-quiz-btn" onclick="launchChapterQuiz('${parentId}','${subtopicId}','${title.replace(/'/g,"\\'")}')">🎯 Quiz on this</button>
  `;

  /* Insert before the mm-tabs */
  const tabs = tz.querySelector('.mm-tabs');
  if(tabs){ tabs.before(crumb); crumb.after(hdr); }
  else { tz.insertBefore(hdr, tz.firstChild); tz.insertBefore(crumb, hdr); }

  /* Switch to Formulas tab if it has content, else Flashcards */
  if(fmls.length){
    const fmlTab = document.querySelector('.mm-tab[onclick*="formulas"]'); if(fmlTab) fmlTab.click();
  } else if(flash.length){
    const flTab = document.querySelector('.mm-tab[onclick*="flashcards"]'); if(flTab) flTab.click();
  }

  /* Scroll into view */
  setTimeout(() => tz.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
};

/* ── Show chapter index when a subject is selected ── */
const _prevST = selectTopic;
selectTopic = function(topicId, title, desc, icon, sectionName){
  _prevST(topicId, title, desc, icon, sectionName);

  const entry = TOPIC_KNOWLEDGE[topicId];
  if(!entry?.subtopics?.length) return;

  const tz = document.getElementById('topicZone'); if(!tz) return;

  /* Remove any existing chapter UI */
  tz.querySelectorAll('.stopic-grid-wrap,.subj-header,.chapter-crumb,.chapter-content-header,#stopic-banner').forEach(el=>el.remove());

  /* Subject header with quiz button */
  const sHdr = document.createElement('div');
  sHdr.className = 'subj-header stopic-grid-wrap';  // stopic-grid-wrap keeps compat
  sHdr.innerHTML = `
    <div class="subj-header-icon">${entry._subjIcon || icon || '📖'}</div>
    <div class="subj-header-body">
      <div class="subj-header-title">${esc(entry._subjTitle || title)}</div>
      <div class="subj-header-desc">${esc(entry._subjDesc  || desc)}</div>
      <div class="subj-header-meta">
        ${entry._semTag ? `<span class="subj-meta-tag">📅 ${esc(entry._semTag)}</span>` : ''}
        <span class="subj-meta-tag">📚 ${entry.subtopics.length} chapters</span>
        <span class="subj-meta-tag">Σ ${entry.formulas?.length||0} formulas</span>
      </div>
    </div>
    <button class="subj-quiz-btn" onclick="launchSubjectQuiz('${topicId}','${(entry._subjTitle||title).replace(/'/g,"\\'")}')">🎯 Subject Quiz</button>
  `;

  /* Chapter index grid */
  const gridWrap = document.createElement('div');
  gridWrap.innerHTML = `<div class="chapter-index-label">📚 Chapters — click to study</div>
    <div class="chapter-grid">
      ${entry.subtopics.map((ch,i)=>`
        <div class="chapter-card" onclick="loadSubtopicContent('${topicId}','${ch.id}','${(ch.title||'').replace(/'/g,"\\'")}','${(ch.desc||'').replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
          <div class="chapter-card-num">Ch ${i+1}</div>
          <div class="chapter-card-icon">${ch.icon||'📖'}</div>
          <div class="chapter-card-title">${esc(ch.title)}</div>
          <div class="chapter-card-desc">${esc(ch.desc||'')}</div>
          <div class="chapter-card-tags">
            ${(ch.tags||[]).slice(0,3).map(t=>`<span class="chapter-card-tag">${esc(t)}</span>`).join('')}
            ${(ch.formulas||[]).length ? `<span class="chapter-card-tag">Σ ${ch.formulas.length}</span>` : ''}
          </div>
        </div>`).join('')}
    </div>`;

  /* Insert before tabs */
  const tabs = tz.querySelector('.mm-tabs');
  if(tabs){ tabs.before(sHdr); sHdr.after(gridWrap); }
  else { tz.insertBefore(gridWrap, tz.firstChild); tz.insertBefore(sHdr, gridWrap); }
};

/* ── Quiz launchers ── */
window.launchChapterQuiz = function(parentId, chapterId, chapterTitle){
  const lvl = APP.currentLevel;
  const lvlLabel = lvl?.fullTitle || lvl?.title || 'B.Tech Marine Engineering';
  if(typeof buildAdvQuizPrompt !== 'function'){ alert('Quiz engine not ready'); return; }

  const entry   = TOPIC_KNOWLEDGE[parentId];
  const chapter = entry?.subtopics?.find(s => s.id === chapterId);

  // Build a synthetic topic knowledge entry for this chapter
  if(!TOPIC_KNOWLEDGE[chapterId]){
    TOPIC_KNOWLEDGE[chapterId] = {
      formulas:   chapter?.formulas   || [],
      flashcards: chapter?.flashcards || [],
      videos:     chapter?.videos     || [],
    };
  }

  const quizTab = document.querySelector('.mm-tab[onclick*="quiz"]');
  if(quizTab) quizTab.click();

  // Set quiz UI to this chapter
  const ql = document.getElementById('quizTopic'); if(ql) ql.textContent = chapterTitle;

  // Trigger quiz via the standard quiz panel
  const qBtn = document.getElementById('btnStartQuiz') || document.querySelector('[onclick*="startQuiz"]');
  if(qBtn){ APP.currentTopic = chapterId; qBtn.click(); }
  else {
    // Fallback: show modal
    if(typeof showQuizModal === 'function') showQuizModal(chapterId, chapterTitle, 'Medium', 10);
  }
};

window.launchSubjectQuiz = function(topicId, topicTitle){
  const quizTab = document.querySelector('.mm-tab[onclick*="quiz"]');
  if(quizTab) quizTab.click();
  const ql = document.getElementById('quizTopic'); if(ql) ql.textContent = topicTitle;
  APP.currentTopic = topicId;
  const qBtn = document.getElementById('btnStartQuiz') || document.querySelector('[onclick*="startQuiz"]');
  if(qBtn) qBtn.click();
};

/* ── Helper: esc function (safe HTML) — ensure available ── */
if(typeof window.esc !== 'function'){
  window.esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ═══════════════════════════════════════════════════════════════════════════
   REMAINING 39 BTech SUBJECTS — full chapter index
   ═══════════════════════════════════════════════════════════════════════════ */

setChapters('bt_maths1','📐','Engineering Mathematics I',
  'Matrices, differential & integral calculus, series, ODEs — prerequisite for all engineering subjects','Sem 1',[
  { id:'m1_matrices', icon:'🔢', title:'Matrices & Determinants',
    desc:'Matrix types, operations, determinants, inverse, Cramer\'s rule, eigenvalues, eigenvectors',
    formulas:[
      { label:"Determinant (2×2)", eq:"det(A) = ad − bc", note:'For A = [[a,b],[c,d]]. Used in Cramer\'s rule.' },
      { label:"Cramer\'s Rule", eq:'x = det(Aₓ)/det(A)', note:'Solves simultaneous linear equations. Aₓ is A with x-column replaced by constants.' },
      { label:"Eigenvalue Equation", eq:"det(A − λI) = 0", note:'λ are eigenvalues. Characteristic equation of matrix A.' },
    ],
    flashcards:[
      { q:'What is a singular matrix?', a:'A square matrix whose determinant = 0. It has no inverse.' },
      { q:'State Cayley-Hamilton theorem.', a:'Every square matrix satisfies its own characteristic equation.' },
    ]
  },
  { id:'m1_diff', icon:'📈', title:'Differential Calculus',
    desc:'Limits, derivatives, product/quotient/chain rules, maxima-minima, Taylor & Maclaurin series',
    formulas:[
      { label:"Chain Rule", eq:"dy/dx = (dy/du)·(du/dx)", note:'For composite functions y = f(u), u = g(x).' },
      { label:"Taylor Series", eq:"f(x) = f(a) + f\'(a)(x−a) + f\'\'(a)(x−a)²/2! + …", note:'Polynomial approximation around x=a. Maclaurin: a=0.' },
      { label:"L\'Hôpital\"s Rule", eq:'lim f/g = lim f\'/g\' (0/0 or ∞/∞ form)', note:'Differentiate numerator & denominator separately when direct substitution is indeterminate.' },
    ],
    flashcards:[
      { q:'Condition for a local maximum at x=c?', a:'f\'(c)=0 and f\'\'(c)<0.' },
      { q:'What is the Rolle\'s theorem condition?', a:'f(a)=f(b) → ∃c∈(a,b) where f\'(c)=0.' },
    ]
  },
  { id:'m1_int', icon:'∫', title:'Integral Calculus',
    desc:'Indefinite & definite integrals, integration by parts, reduction formulae, area & volume',
    formulas:[
      { label:"Integration by Parts", eq:"∫u dv = uv − ∫v du", note:'Choose u = LIATE order. Converts one integral to another.' },
      { label:"Definite Integral", eq:"∫ₐᵇ f(x)dx = F(b) − F(a)", note:'F is antiderivative of f. Area under curve from a to b.' },
      { label:"Volume of Revolution", eq:"V = π∫ₐᵇ [f(x)]² dx", note:'Revolving curve y=f(x) about x-axis.' },
    ],
    flashcards:[
      { q:'∫sin(x)dx = ?', a:'−cos(x) + C' },
      { q:'∫eˣdx = ?', a:'eˣ + C' },
    ]
  },
  { id:'m1_series', icon:'Σ', title:'Series & Sequences',
    desc:'Arithmetic, geometric, convergence tests, power series, Fourier series introduction',
    formulas:[
      { label:"Geometric Series Sum", eq:"S = a(1−rⁿ)/(1−r)  [|r|<1: S∞=a/(1−r)]", note:'a=first term, r=common ratio, n=terms.' },
      { label:"Binomial Theorem", eq:"(a+b)ⁿ = Σ C(n,r)·aⁿ⁻ʳ·bʳ", note:'Expands powers. C(n,r)=n!/(r!(n-r)!). Valid for all n if |b/a|<1.' },
    ],
    flashcards:[
      { q:'Condition for convergence of geometric series?', a:'|r| < 1' },
      { q:'What is a divergent series?', a:'A series whose partial sums approach infinity or oscillate — does not have a finite sum.' },
    ]
  },
  { id:'m1_partial', icon:'∂', title:'Partial Differentiation',
    desc:'Partial derivatives, total differential, Euler\'s theorem, Jacobians, maxima of functions of 2 variables',
    formulas:[
      { label:"Total Differential", eq:"dz = (∂z/∂x)dx + (∂z/∂y)dy", note:'z=f(x,y). Used for error analysis and approximations.' },
      { label:"Euler\'s Theorem", eq:'x·∂f/∂x + y·∂f/∂y = n·f', note:'For homogeneous function f of degree n.' },
    ],
    flashcards:[
      { q:'What does ∂f/∂x mean?', a:'Partial derivative of f with respect to x, treating all other variables as constants.' },
      { q:'Saddle point condition?', a:'∂²f/∂x²·∂²f/∂y² − (∂²f/∂x∂y)² < 0 at a stationary point.' },
    ]
  },
]);

setChapters('bt_maths2','📊','Engineering Mathematics II',
  'Vector calculus, complex numbers, ODE, Laplace transforms, Fourier series','Sem 2',[
  { id:'m2_ode', icon:'〰️', title:'Ordinary Differential Equations',
    desc:'1st order ODEs (separable, exact, linear), 2nd order with constant coefficients, particular integrals',
    formulas:[
      { label:"Linear ODE (1st order)", eq:"dy/dx + P(x)y = Q(x);  IF = e^∫P dx", note:'Integrating factor method. Solution: y·IF = ∫Q·IF dx.' },
      { label:"2nd Order ODE (homogeneous)", eq:"ay\'\'+by\'+cy=0;  try y=eˡˣ → aλ²+bλ+c=0", note:'Auxiliary equation gives λ. CF depends on real/complex/repeated roots.' },
    ],
    flashcards:[
      { q:'What is the particular integral?', a:'A specific solution of the non-homogeneous ODE, without arbitrary constants.' },
      { q:'Condition for exact ODE?', a:'M dx + N dy = 0 is exact if ∂M/∂y = ∂N/∂x.' },
    ]
  },
  { id:'m2_laplace', icon:'ℒ', title:'Laplace Transforms',
    desc:'Definition, standard transforms, inverse transform, convolution, solving ODEs with ICs',
    formulas:[
      { label:"Laplace Definition", eq:"ℒ{f(t)} = F(s) = ∫₀^∞ e^(−st) f(t) dt", note:'Transforms t-domain to s-domain. Used to solve ODEs algebraically.' },
      { label:"Key Transform Pairs", eq:"ℒ{eᵃᵗ}=1/(s−a); ℒ{sin ωt}=ω/(s²+ω²); ℒ{t}=1/s²", note:'Standard pairs. ℒ{f\'(t)}=sF(s)−f(0) for derivatives.' },
    ],
    flashcards:[
      { q:'Why use Laplace transforms for ODEs?', a:'They convert ODEs with initial conditions into algebraic equations in s-domain, easier to solve.' },
      { q:'ℒ{1} = ?', a:'1/s  (valid for s > 0)' },
    ]
  },
  { id:'m2_fourier', icon:'🌊', title:'Fourier Series',
    desc:'Periodic functions, Euler\'s formulae, half-range expansions, harmonic analysis',
    formulas:[
      { label:"Fourier Series", eq:"f(x) = a₀/2 + Σ[aₙcos(nπx/L) + bₙsin(nπx/L)]", note:'Periodic function expanded as sum of harmonics. L = half-period.' },
      { label:"Fourier Coefficients", eq:"aₙ = (1/L)∫₋ₗᴸ f(x)cos(nπx/L)dx;  bₙ = (1/L)∫₋ₗᴸ f(x)sin(nπx/L)dx", note:'a₀ = twice the average value of f(x) over the period.' },
    ],
    flashcards:[
      { q:'When does Fourier series contain only sine terms?', a:'When f(x) is an odd function: f(−x) = −f(x).' },
    ]
  },
  { id:'m2_complex', icon:'ℂ', title:'Complex Numbers & Functions',
    desc:'Argand plane, De Moivre\'s theorem, complex roots, analytic functions, Cauchy-Riemann',
    formulas:[
      { label:"Euler\'s Formula", eq:'e^(iθ) = cos θ + i sin θ', note:'Fundamental link between exponential and trigonometric functions.' },
      { label:"De Moivre\'s Theorem", eq:'(cos θ + i sin θ)ⁿ = cos nθ + i sin nθ', note:'Finding nth roots and powers of complex numbers.' },
    ],
    flashcards:[
      { q:'|z| for z = a+ib?', a:'|z| = √(a²+b²) — the modulus, distance from origin in Argand plane.' },
    ]
  },
  { id:'m2_vector', icon:'→', title:'Vector Calculus',
    desc:'Gradient, divergence, curl, line/surface/volume integrals, Green\'s/Stokes\'/Divergence theorems',
    formulas:[
      { label:"Gradient", eq:"∇f = (∂f/∂x)î + (∂f/∂y)ĵ + (∂f/∂z)k̂", note:'Points in direction of steepest ascent. |∇f| = rate of change.' },
      { label:"Divergence", eq:"∇·F = ∂Fₓ/∂x + ∂Fᵧ/∂y + ∂F_z/∂z", note:'Scalar. Positive = source, negative = sink.' },
      { label:"Curl", eq:"∇×F = |î ĵ k̂; ∂/∂x ∂/∂y ∂/∂z; Fₓ Fᵧ F_z|", note:'Measures rotation of vector field. Zero curl = irrotational.' },
    ],
    flashcards:[
      { q:'State Gauss\'s Divergence Theorem.', a:'∯ F·dA = ∭ ∇·F dV — surface integral of flux equals volume integral of divergence.' },
    ]
  },
]);

setChapters('bt_draw','📏','Engineering Drawing & CAD',
  'Orthographic & isometric projections, sectional views, AutoCAD, marine engineering drawings','Sem 1',[
  { id:'draw_ortho', icon:'📐', title:'Orthographic Projection',
    desc:'1st & 3rd angle projection, front/top/side views, dimensioning, tolerances, surface finish symbols',
    formulas:[],
    flashcards:[
      { q:'1st angle vs 3rd angle projection?', a:'1st angle: object between viewer and plane (Europe/India). 3rd angle: plane between viewer and object (USA/Japan).' },
      { q:'What is a section view?', a:'A view showing the internal features of an object as if it were cut by a plane.' },
    ]
  },
  { id:'draw_iso', icon:'📦', title:'Isometric & Pictorial Drawing',
    desc:'Isometric axes (30°), isometric circles (ellipses), oblique drawing, perspective view',
    formulas:[],
    flashcards:[
      { q:'Isometric axes angles?', a:'Three axes at 120° to each other; two at 30° to horizontal, one vertical.' },
    ]
  },
  { id:'draw_cad', icon:'💻', title:'AutoCAD & Computer Aided Drawing',
    desc:'2D drafting commands, layers, blocks, dimensions, plotting. Intro to 3D solid modelling.',
    formulas:[],
    flashcards:[
      { q:'What is a block in CAD?', a:'A named group of objects saved as a single entity for repeated use (e.g. valve symbol, bolt).' },
    ]
  },
  { id:'draw_marine', icon:'🚢', title:'Marine Engineering Drawings',
    desc:'P&ID diagrams, piping isometrics, shipyard drawings, weld symbols, bill of materials',
    formulas:[],
    flashcards:[
      { q:'What does P&ID stand for?', a:'Piping and Instrumentation Diagram — shows piping, instruments, and equipment in a process system.' },
    ]
  },
]);

setChapters('bt_workshop1','🔧','Engineering Workshop I',
  'Bench work, fitting, welding, basic machining, measurement instruments','Sem 1',[
  { id:'ws1_fitting', icon:'⚙️', title:'Fitting & Bench Work',
    desc:'Hand tools, chiselling, filing, drilling, tapping, reaming, dovetail joints, limits & fits',
    formulas:[
      { label:"Clearance Fit", eq:"Clearance = Hole size − Shaft size  (always positive)", note:'Shaft always smaller than hole. Used for bearings, bushes.' },
      { label:"Interference Fit", eq:"Interference = Shaft size − Hole size  (positive)", note:'Shaft larger than hole. Press-fit. High torque transmission.' },
    ],
    flashcards:[
      { q:'What is tolerance?', a:'Total permissible variation in a dimension = Upper Limit − Lower Limit.' },
      { q:'Purpose of reaming?', a:'To produce an accurately-sized and smooth hole after drilling.' },
    ]
  },
  { id:'ws1_welding', icon:'🔥', title:'Welding Basics',
    desc:'Arc welding (SMAW), MIG/MAG, TIG, types of joints, welding defects, safety, weld testing',
    formulas:[
      { label:"Heat Input", eq:"H = (V × I × 60) / (1000 × S)  kJ/mm", note:'V=voltage, I=current, S=travel speed(mm/min). Controls bead geometry and HAZ.' },
    ],
    flashcards:[
      { q:'What is undercutting in welding?', a:'A groove melted into the base metal at the weld toe, reducing cross-section. Caused by excessive current or wrong angle.' },
      { q:'Purpose of pre-heat in welding?', a:'Reduces cooling rate, prevents hydrogen cracking in high-carbon/alloy steels.' },
    ]
  },
  { id:'ws1_machining', icon:'🔩', title:'Basic Machining — Lathe & Drilling',
    desc:'Lathe operations (turning, facing, threading, parting), drill press, speeds & feeds',
    formulas:[
      { label:"Cutting Speed", eq:"N = (1000 × V) / (π × D)  rpm", note:'N=spindle speed, V=cutting speed(m/min), D=diameter(mm). Ensure correct speed for material.' },
      { label:"Material Removal Rate", eq:"MRR = D × f × v  mm³/min", note:'D=depth(mm), f=feed(mm/rev), v=cutting velocity(mm/min).' },
    ],
    flashcards:[
      { q:'What is the back rake angle?', a:'Angle of the cutting tool face from vertical. Positive rake reduces cutting force but weakens tool.' },
    ]
  },
  { id:'ws1_measurement', icon:'📏', title:'Measurement & Inspection',
    desc:'Vernier caliper, micrometer, dial gauge, slip gauges, profile projector, surface roughness',
    formulas:[
      { label:"Vernier Least Count", eq:"LC = (1 MSD) − (1 VSD) = S/n", note:'S=main scale pitch, n=number of vernier divisions. Typical: 0.02mm or 0.05mm.' },
    ],
    flashcards:[
      { q:'Least count of a micrometer?', a:'0.01 mm (standard) or 0.001 mm (vernier micrometer).' },
      { q:'Purpose of slip gauges?', a:'Precision end-standard gauge blocks used to calibrate other measuring tools.' },
    ]
  },
]);

setChapters('bt_mech','⚙️','Engineering Mechanics',
  'Statics, dynamics, stress, strain, beams — foundation for structural and machinery analysis','Sem 2',[
  { id:'mech_statics', icon:'⚖️', title:'Statics & Equilibrium',
    desc:'Forces, moments, couples, free body diagrams, conditions of equilibrium, truss analysis',
    formulas:[
      { label:"Equilibrium Conditions", eq:"ΣFₓ=0,  ΣFᵧ=0,  ΣM=0", note:'For static equilibrium: net force and net moment about any point must be zero.' },
      { label:"Lami\'s Theorem", eq:'F₁/sin α₁ = F₂/sin α₂ = F₃/sin α₃', note:'Three concurrent coplanar forces in equilibrium. α₁ = angle opposite to F₁.' },
    ],
    flashcards:[
      { q:'What is a couple?', a:'Two equal, opposite, parallel forces separated by a distance (moment arm). Net force=0, net moment≠0.' },
    ]
  },
  { id:'mech_dynamics', icon:'🏎️', title:'Dynamics — Kinematics & Kinetics',
    desc:'Linear motion (SUVAT), projectile, circular motion, Newton\'s laws, work-energy, impulse-momentum',
    formulas:[
      { label:"SUVAT Equations", eq:"v=u+at;  s=ut+½at²;  v²=u²+2as", note:'Uniform acceleration. u=initial, v=final, a=acceleration, s=displacement, t=time.' },
      { label:"Work-Energy Theorem", eq:"Net Work = ΔKE = ½mv² − ½mu²", note:'Work done by all forces = change in kinetic energy.' },
      { label:"Centripetal Acceleration", eq:"a = v²/r = ω²r", note:'Directed towards centre. v=speed, r=radius, ω=angular velocity.' },
    ],
    flashcards:[
      { q:'Impulse-momentum theorem?', a:'Impulse = F×t = Δp = m(v−u). Force × time = change in momentum.' },
    ]
  },
  { id:'mech_stress', icon:'💪', title:'Stress & Strain',
    desc:'Types of stress, Hooke\'s law, Poisson\'s ratio, thermal stress, shear stress, bulk modulus',
    formulas:[
      { label:"Direct Stress", eq:"σ = F/A   [Pa or N/mm²]", note:'F=force(N), A=cross-section area(mm²). Normal stress.' },
      { label:"Hooke\'s Law", eq:'E = σ/ε   →   ε = σ/E', note:'E=Young\'s modulus(GPa). ε=strain (dimensionless). Valid in elastic range.' },
      { label:"Poisson\'s Ratio", eq:'ν = −ε_lateral / ε_axial', note:'Ratio of transverse to axial strain. Steel ≈ 0.3, rubber ≈ 0.5.' },
      { label:"Thermal Stress", eq:"σ_T = E × α × ΔT", note:'α=coefficient of linear expansion. Occurs when thermal expansion is restrained.' },
    ],
    flashcards:[
      { q:'Factor of safety definition?', a:'FOS = Ultimate stress / Working stress. Typical marine structures: 3–4.' },
    ]
  },
  { id:'mech_beams', icon:'🏗️', title:'Shear Force & Bending Moment',
    desc:'Types of beams and loads, SF and BM diagrams, neutral axis, bending stress, deflection',
    formulas:[
      { label:"Bending Equation", eq:"M/I = σ/y = E/R", note:'M=bending moment, I=second moment of area, σ=bending stress at distance y from NA, E=Young\'s modulus, R=radius of curvature.' },
      { label:"Section Modulus", eq:"Z = I/y_max   →   σ_max = M/Z", note:'Z = I/c. Higher Z → lower bending stress for same moment.' },
    ],
    flashcards:[
      { q:'Where is bending stress maximum in a beam?', a:'At the extreme fibres (top and bottom), farthest from the neutral axis.' },
    ]
  },
]);

setChapters('bt_materials','🔬','Engineering Materials',
  'Properties and selection of metals, alloys, heat treatment, corrosion, non-metallic materials','Sem 3',[
  { id:'mat_metals', icon:'⚙️', title:'Metals & Alloys',
    desc:'Crystal structure, mechanical properties, iron-carbon diagram, steel grades, cast iron, aluminium, copper alloys',
    formulas:[
      { label:"Ultimate Tensile Strength", eq:"UTS = Maximum Load / Original Area  [MPa]", note:'Stress at fracture. Mild steel ≈ 400 MPa, high-tensile steel ≈ 700+ MPa.' },
      { label:"Hardness (Brinell)", eq:"BHN = Load / (Spherical indentation area)", note:'Higher BHN = harder material. Steel ≈ 120–700 BHN.' },
    ],
    flashcards:[
      { q:'What is martensite?', a:'A very hard, brittle phase of steel formed by rapid quenching. High hardness, low ductility.' },
      { q:'Why is cast iron brittle?', a:'High carbon content (2–4%) forms cementite/graphite flakes which act as stress concentrators.' },
    ]
  },
  { id:'mat_heat', icon:'🔥', title:'Heat Treatment',
    desc:'Annealing, normalising, hardening, tempering, case hardening (carburising, nitriding), TTT diagrams',
    formulas:[],
    flashcards:[
      { q:'Purpose of tempering after hardening?', a:'Reduce brittleness of hardened (martensitic) steel by reheating to 150–650°C, then cooling. Sacrifices some hardness for toughness.' },
      { q:'Difference: annealing vs normalising?', a:'Annealing: slow furnace cool → max softness. Normalising: air cool → slightly harder/stronger than annealed.' },
    ]
  },
  { id:'mat_corrosion', icon:'🌊', title:'Corrosion & Protection',
    desc:'Electrochemical corrosion, galvanic series, cathodic protection, coatings, inhibitors, marine corrosion',
    formulas:[
      { label:"Electrochemical Reaction", eq:"Anode: M → M²⁺ + 2e⁻ (oxidation)   Cathode: O₂+2H₂O+4e⁻ → 4OH⁻ (reduction)", note:'More noble metal = cathode (protected). Less noble = anode (corrodes).' },
    ],
    flashcards:[
      { q:'Galvanic corrosion condition?', a:'Two dissimilar metals in electrical contact in an electrolyte. The less noble metal becomes the anode and corrodes.' },
      { q:'How does cathodic protection work?', a:'Makes the structure the cathode by connecting to a sacrificial anode (zinc/magnesium) or impressed current.' },
    ]
  },
  { id:'mat_ndt', icon:'🔍', title:'Non-Destructive Testing',
    desc:'Visual inspection, dye-penetrant, magnetic particle, ultrasonic testing, radiography, eddy current',
    formulas:[],
    flashcards:[
      { q:'Which NDT method detects sub-surface defects in non-magnetic materials?', a:'Ultrasonic Testing (UT) — uses sound waves to detect internal flaws.' },
      { q:'Limitation of magnetic particle testing (MPI)?', a:'Only works on ferromagnetic materials (iron, steel). Cannot test aluminium, copper, or austenitic stainless steel.' },
    ]
  },
]);

setChapters('bt_workshop2','🛠️','Engineering Workshop II',
  'Advanced welding, pipe fitting, CNC, maintenance practices, hydraulic & pneumatic systems','Sem 3',[
  { id:'ws2_adv_weld', icon:'🔥', title:'Advanced Welding',
    desc:'GTAW/TIG, FCAW, submerged arc welding, welding procedures (WPS), welder qualification',
    formulas:[
      { label:"Weld Throat Size", eq:"Throat = 0.707 × Leg size  (for 45° fillet weld)", note:'Minimum strength cross-section of a fillet weld.' },
    ],
    flashcards:[
      { q:'What is PWHT?', a:'Post Weld Heat Treatment — stress-relief heat treatment after welding to reduce residual stresses.' },
      { q:'Purpose of back purging in TIG welding?', a:'Prevents oxidation of the weld root, essential for stainless steel and titanium.' },
    ]
  },
  { id:'ws2_pipe', icon:'🔩', title:'Pipe Fitting & Plumbing',
    desc:'Pipe materials, flanges, fittings, valves, threaded joints, hydraulic testing of piping systems',
    formulas:[
      { label:"Pipe Flow Velocity", eq:"v = Q / A = Q / (π D²/4)   [m/s]", note:'Q=flow rate(m³/s), D=internal diameter(m). Design velocity: sea water 1.5–2.5 m/s.' },
    ],
    flashcards:[
      { q:'What is a spectacle blank?', a:'A plate with a solid disc one side and a ring the other, used to positively isolate/blank a pipe when required.' },
    ]
  },
  { id:'ws2_cnc', icon:'💻', title:'CNC Machining',
    desc:'G-codes, M-codes, CNC turning & milling, tool offsets, work offsets, CAM introduction',
    formulas:[],
    flashcards:[
      { q:'What is G00 in CNC?', a:'Rapid positioning — moves the tool at maximum speed to a programmed position (no cutting).' },
      { q:'What does M03 command do?', a:'Spindle on clockwise (forward rotation).' },
    ]
  },
]);

setChapters('bt_strength','🏗️','Strength of Materials',
  'Advanced stress analysis, torsion, columns, thick cylinders, springs, pressure vessels','Sem 3',[
  { id:'str_torsion', icon:'🔄', title:'Torsion & Shafts',
    desc:'Shear stress in circular shafts, angle of twist, power transmission, composite shafts, keys & couplings',
    formulas:[
      { label:"Torsion Equation", eq:"T/J = τ/r = Gθ/L", note:'T=torque, J=polar second moment, τ=shear stress, r=radius, G=shear modulus, θ=angle of twist, L=length.' },
      { label:"Polar Second Moment — Solid Shaft", eq:"J = πD⁴/32", note:'D=diameter. For hollow shaft: J = π(D⁴−d⁴)/32.' },
      { label:"Power-Torque Relationship", eq:"P = 2πNT/60   [W]", note:'P=power(W), N=speed(rpm), T=torque(N·m). Used to size propulsion shafts.' },
    ],
    flashcards:[
      { q:'Why is hollow shaft more efficient than solid?', a:'Same torque with less material. Higher J/weight ratio since outer fibres carry most shear stress.' },
    ]
  },
  { id:'str_columns', icon:'⬆️', title:'Columns & Struts',
    desc:'Euler\'s formula, slenderness ratio, effective length, Rankine\'s formula, eccentrically loaded columns',
    formulas:[
      { label:"Euler\'s Crippling Load", eq:'P_cr = π²EI / (Le)²', note:'Le=effective length depends on end conditions. Fixed-fixed: Le=L/2.' },
      { label:"Slenderness Ratio", eq:"λ = Le/k   where k = √(I/A)", note:'k=radius of gyration. λ>80 = long column (Euler), λ<80 = short/medium (Rankine).' },
    ],
    flashcards:[
      { q:'Effective length for column fixed at both ends?', a:'Le = L/2. Most rigid condition — highest critical load.' },
    ]
  },
  { id:'str_thick', icon:'⭕', title:'Thick Cylinders & Pressure Vessels',
    desc:'Lame\'s equations, hoop/radial/longitudinal stress, compound cylinders, autofrettage',
    formulas:[
      { label:"Lame\'s Equations", eq:'σ_h = A + B/r²   (hoop);   σ_r = A − B/r²   (radial)', note:'A=(p_i r_i² − p_o r_o²)/(r_o²−r_i²). B=(p_i−p_o)r_i²r_o²/(r_o²−r_i²).' },
      { label:"Thin Cylinder Hoop Stress", eq:"σ_h = pd/(2t)   [MPa]", note:'Valid when d/t > 20. p=pressure, d=internal diameter, t=wall thickness.' },
    ],
    flashcards:[
      { q:'Where is hoop stress maximum in a thick cylinder under internal pressure?', a:'At the inner radius (r = r_i).' },
    ]
  },
  { id:'str_springs', icon:'🌀', title:'Springs & Energy Methods',
    desc:'Stiffness, deflection, close-coiled helical springs, leaf springs, strain energy, Castigliano\'s theorem',
    formulas:[
      { label:"Spring Stiffness", eq:"k = Gd⁴ / (8D³n)   [N/m]", note:'G=shear modulus, d=wire diameter, D=mean coil diameter, n=active coils.' },
      { label:"Spring Deflection under W", eq:"δ = 8WD³n / (Gd⁴)   =  W/k", note:'W=applied load. Springs in series: 1/k_eff=Σ1/kᵢ. Parallel: k_eff=Σkᵢ.' },
    ],
    flashcards:[
      { q:'Wahl\'s correction factor purpose?', a:'Corrects for curvature effect and direct shear in helical springs; actual stress = K_w × 8WD/(πd³).' },
    ]
  },
]);

setChapters('bt_prog','💻','Programming & Computers',
  'Python programming, algorithms, databases, version control, basic MATLAB','Sem 4',[
  { id:'prog_python', icon:'🐍', title:'Python Basics',
    desc:'Data types, operators, input/output, strings, lists, tuples, dictionaries, sets',
    formulas:[],
    flashcards:[
      { q:'Difference between list and tuple?', a:'List is mutable (can change). Tuple is immutable. Tuples are faster and used for fixed data.' },
      { q:'Python dictionary key rule?', a:'Keys must be immutable (strings, numbers, tuples). Values can be any type.' },
    ]
  },
  { id:'prog_control', icon:'🔀', title:'Control Structures & Functions',
    desc:'if/elif/else, for/while loops, break/continue, functions, recursion, lambda, decorators',
    formulas:[],
    flashcards:[
      { q:'What is recursion?', a:'A function calling itself. Must have a base case to terminate. Used for factorial, Fibonacci, tree traversal.' },
      { q:'Purpose of \'pass\' in Python?', a:'Null statement — does nothing. Used as placeholder in empty functions, classes or loops.' },
    ]
  },
  { id:'prog_oop', icon:'🧩', title:'OOP & Modules',
    desc:'Classes, objects, inheritance, polymorphism, encapsulation, standard library, file handling, numpy/pandas intro',
    formulas:[],
    flashcards:[
      { q:'What is polymorphism?', a:'Same interface (method name) works differently for different objects. E.g. len() works on strings, lists, dicts.' },
    ]
  },
  { id:'prog_db', icon:'🗄️', title:'Databases & SQL',
    desc:'Relational databases, SQL (SELECT/INSERT/UPDATE/DELETE), JOIN operations, normalisation, MongoDB intro',
    formulas:[],
    flashcards:[
      { q:'INNER JOIN vs LEFT JOIN?', a:'INNER JOIN: only matching rows. LEFT JOIN: all rows from left table + matching from right (NULLs for no match).' },
    ]
  },
]);

setChapters('bt_elec2','⚡','Electrical Engineering II',
  'Advanced AC circuits, 3-phase systems, electrical machines, switchgear, protection','Sem 4',[
  { id:'elec2_3phase', icon:'🔺', title:'3-Phase Systems',
    desc:'Generation, star/delta connections, balanced loads, power measurement, symmetrical components',
    formulas:[
      { label:"3-Phase Power", eq:"P = √3 × V_L × I_L × cos φ   [W]", note:'V_L=line voltage, I_L=line current, cos φ=power factor. Total three-phase active power.' },
      { label:"Star Connection", eq:"V_L = √3 × V_P;   I_L = I_P", note:'V_L=line, V_P=phase. Neutral conductor carries zero current for balanced load.' },
      { label:"Delta Connection", eq:"V_L = V_P;   I_L = √3 × I_P", note:'No neutral needed. Higher voltage available between lines.' },
    ],
    flashcards:[
      { q:'Why is 440V used on ships (not 240V or 110V)?', a:'440V reduces current for same power, allowing smaller cable sizes and switchgear. Reduces copper losses. Above 1000V requires extra safety precautions.' },
    ]
  },
  { id:'elec2_machines', icon:'🔄', title:'Electrical Machines',
    desc:'DC generators, DC motors (shunt/series/compound), induction motors, synchronous machines',
    formulas:[
      { label:"Back EMF of DC Motor", eq:"E_b = V − I_a × R_a", note:'V=supply voltage, I_a=armature current, R_a=armature resistance. Motor develops torque as long as E_b < V.' },
      { label:"Synchronous Speed", eq:"N_s = 120f/P   [rpm]", note:'f=frequency(Hz), P=number of poles. 50Hz, 4-pole: N_s=1500 rpm.' },
      { label:"Slip of Induction Motor", eq:"s = (N_s − N) / N_s", note:'N=actual speed. At full load, slip ≈ 3–5%. s=1 at standstill, s=0 at synchronous speed.' },
    ],
    flashcards:[
      { q:'Why does a DC series motor not run without load?', a:'At no load, very small current → very small back-EMF → speed increases dangerously (runaway). Always connected to load.' },
    ]
  },
  { id:'elec2_protection', icon:'🛡️', title:'Switchgear & Protection',
    desc:'ACBs, MCCBs, fuses, overcurrent/earth fault relays, differential protection, short-circuit calculations',
    formulas:[
      { label:"Short Circuit Current", eq:"I_sc = V / Z_total   [A]", note:'Z_total = total impedance of circuit including supply and cable. Used to rate switchgear.' },
    ],
    flashcards:[
      { q:'Discrimination in protection?', a:'The nearest upstream device should trip first (fastest response) without tripping the main breaker.' },
    ]
  },
  { id:'elec2_drives', icon:'⚙️', title:'Variable Speed Drives',
    desc:'Frequency converters (VFD/VSD), soft starters, energy saving, harmonics, EMI in ship systems',
    formulas:[
      { label:"VFD Output Frequency", eq:"f_out = N_required × P / 120", note:'To vary motor speed: change frequency. V/f ratio kept constant to maintain flux.' },
    ],
    flashcards:[
      { q:'Main advantage of VFD on pumps/fans?', a:'P ∝ N³ (affinity law) → 20% speed reduction = 49% power saving. Huge fuel economy.' },
    ]
  },
]);

setChapters('bt_fluid2','💧','Fluid Mechanics II',
  'Turbulent flow, boundary layer, compressible flow, hydraulic turbines and pumps','Sem 4',[
  { id:'fl2_turb', icon:'🌀', title:'Turbulent Flow & Boundary Layer',
    desc:'Reynolds number regimes, turbulent velocity profile, boundary layer growth, drag, friction factor',
    formulas:[
      { label:"Darcy-Weisbach Equation", eq:"h_f = f × (L/D) × (v²/2g)   [m]", note:'f=Darcy friction factor (Moody chart), L=pipe length, D=diameter, v=velocity. Most accurate pipe friction formula.' },
      { label:"Moody\'s Friction Factor (turbulent)", eq:'1/√f = −2 log(ε/(3.7D) + 2.51/(Re√f))', note:'Colebrook equation. ε=roughness, Re=Reynolds number. Solved iteratively or via Moody chart.' },
    ],
    flashcards:[
      { q:'Hydraulic diameter for non-circular ducts?', a:'D_h = 4A/P where A=cross-section area, P=wetted perimeter.' },
    ]
  },
  { id:'fl2_machines', icon:'⚙️', title:'Hydraulic Turbines & Pumps',
    desc:'Pelton, Francis, Kaplan turbines; centrifugal pump performance, specific speed, cavitation',
    formulas:[
      { label:"Specific Speed of Pump", eq:"N_s = N√Q / H^(3/4)", note:'N=speed(rpm), Q=flow(m³/s), H=head(m). Classifies pump type: low Ns=centrifugal, high Ns=axial.' },
      { label:"Euler\'s Turbine Equation", eq:'E = u₁V_{w1} − u₂V_{w2}   [J/kg]', note:'u=blade velocity, V_w=whirl component of absolute velocity. Work done per unit mass.' },
    ],
    flashcards:[
      { q:'What is cavitation in pumps?', a:'Formation and collapse of vapour bubbles when local pressure drops below vapour pressure. Causes noise, vibration, erosion of impeller.' },
    ]
  },
  { id:'fl2_compress', icon:'💨', title:'Compressible Flow',
    desc:'Mach number, isentropic flow, normal shocks, nozzle & diffuser design, choked flow',
    formulas:[
      { label:"Mach Number", eq:"Ma = v/a   where a = √(γRT)", note:'v=flow velocity, a=speed of sound, γ=1.4 for air, R=287 J/kgK, T=temperature(K).' },
      { label:"Isentropic Relations", eq:"T₀/T = 1 + (γ−1)/2 × Ma²", note:'T₀=stagnation temperature. Also: P₀/P = (T₀/T)^(γ/(γ−1)).' },
    ],
    flashcards:[
      { q:'What happens at Ma=1 (choked flow)?', a:'Maximum mass flow rate through the throat of a nozzle. Cannot be increased by further reducing downstream pressure.' },
    ]
  },
]);

setChapters('bt_naval2','⚓','Naval Architecture II',
  'Trim, advanced stability, damage stability, loading computers, sea loads','Sem 4',[
  { id:'nav2_trim', icon:'⚖️', title:'Trim & Longitudinal Stability',
    desc:'BML, GML, moment to change trim, trim corrections for loading/discharging, change of trim calculation',
    formulas:[
      { label:"BM_L (Longitudinal)", eq:"BM_L = I_L / V   ≈  L²/12d  (approx.)", note:'I_L=second moment of waterplane area about transverse axis, V=underwater volume, L=ship length, d=draft.' },
      { label:"Moment to Change Trim 1cm", eq:"MCT1cm = (GML × W) / (100 × L)   [tonne·m/cm]", note:'W=displacement, GML=longitudinal GM, L=LBP.' },
      { label:"Change of Trim", eq:"t = (w × d) / MCT1cm   [cm]", note:'w=mass(t), d=distance from CF(m), MCT1cm=moment to change trim 1cm.' },
    ],
    flashcards:[
      { q:'What is the centre of flotation (F)?', a:'The centroid of the waterplane area. When trimming, the ship rotates about this point.' },
    ]
  },
  { id:'nav2_damage', icon:'🚨', title:'Damage Stability',
    desc:'Permeability, lost buoyancy method, added weight method, SOLAS damage criteria, subdivision',
    formulas:[
      { label:"Lost Buoyancy Method", eq:"New KM = I_net / V_remaining + new_KB", note:'Remove damaged compartment from waterplane area and volume, recalculate B and M.' },
      { label:"Permeability (μ)", eq:"μ = Volume available for flooding / Total volume of compartment", note:'Cargo holds ≈ 0.6–0.95, machinery spaces ≈ 0.85, accommodation ≈ 0.95.' },
    ],
    flashcards:[
      { q:'SOLAS damage stability requirement (summary)?', a:'Vessel must survive flooding of specified compartments with positive GM, minimum freeboard, and no progressive flooding.' },
    ]
  },
  { id:'nav2_criteria', icon:'📋', title:'Intact Stability Criteria (IMO)',
    desc:'Area under GZ curve, GZ at 30°, initial GM, angle of vanishing stability, weather criterion',
    formulas:[
      { label:"Area Under GZ 0°–30°", eq:"≥ 0.055 m·rad  (IMO A.749)", note:'Minimum righting energy requirement. Checked against stability cross-curves or from inclining data.' },
      { label:"Area 0°–40° (or up to flooding)", eq:"≥ 0.09 m·rad", note:'IMO Res. A.749(18). GZ ≥ 0.20m at 30°. Max GZ at 25° or above.' },
    ],
    flashcards:[
      { q:'Minimum initial GM for general cargo vessel (IMO)?', a:'GM ≥ 0.15m. (Higher requirements for special ship types like RoRo, passenger vessels.)' },
    ]
  },
]);

setChapters('bt_seaman','⚓','Seamanship & STCW',
  'STCW conventions, fire fighting, survival techniques, first aid, watchkeeping duties','Sem 5',[
  { id:'sea_stcw', icon:'📋', title:'STCW Convention',
    desc:'STCW 1978 as amended, Manila Amendments 2010, certificates, rest hours, basic safety training',
    formulas:[],
    flashcards:[
      { q:'STCW minimum rest hours?', a:'10 hours in any 24-hour period; 77 hours in any 7-day period.' },
      { q:'BST certificate covers?', a:'4 elements: Personal Survival Techniques, Fire Prevention & Fighting, Elementary First Aid, Personal Safety & Social Responsibilities.' },
    ]
  },
  { id:'sea_fire', icon:'🔥', title:'Fire Fighting & Prevention',
    desc:'Fire triangle, classes of fire (A/B/C/D/F), fixed/portable extinguishing systems, fire drills, SOLAS requirements',
    formulas:[],
    flashcards:[
      { q:'Classes of fire and extinguishing agents?', a:'A (solids) water/foam; B (liquids) CO₂/dry powder/foam; C (gas) dry powder; D (metals) dry sand; F (cooking oil) wet chemical.' },
      { q:'CO₂ flooding system — when to enter space?', a:'Only after confirmed fresh air ventilation + oxygen level >20.9% + authorised permit to work.' },
    ]
  },
  { id:'sea_survival', icon:'🛟', title:'Survival at Sea',
    desc:'Lifeboats, liferafts, EPIRBs, SARTs, GMDSS, man overboard (MOB), immersion suit, distress signals',
    formulas:[],
    flashcards:[
      { q:'EPIRB transmission frequency?', a:'406 MHz (digital, satellite-monitored via Cospas-Sarsat). Also 121.5 MHz homing signal.' },
      { q:'Lifeboat capacity requirement (SOLAS)?', a:'Each side: capacity for all persons on board. Total: 2× POB at minimum. Must launch within 10 min.' },
    ]
  },
  { id:'sea_firstaid', icon:'🏥', title:'Medical First Aid',
    desc:'CPR, choking, fractures, burns, hypothermia, sea-sickness, medication, Medical First Aid Guide (MFAG)',
    formulas:[],
    flashcards:[
      { q:'CPR compression rate?', a:'100–120 compressions per minute. Depth: 5–6 cm. Ratio: 30 compressions : 2 breaths.' },
    ]
  },
]);

setChapters('bt_sea_er','🔧','Engine Room Watchkeeping',
  'Watch duties, rounds, log entries, alarms, machinery operation and emergency response','Sem 5',[
  { id:'er_watch', icon:'👁️', title:'Watchkeeping Duties & Responsibilities',
    desc:'STCW requirements for engine room watchkeeping, communication, handover, UMS procedures',
    formulas:[],
    flashcards:[
      { q:'Before taking over watch, engineer must?', a:'Check current status of all machinery, recent alarms, ongoing defects, standing orders, engineer-in-charge instruction.' },
      { q:'UMS — Unmanned Machinery Space rules?', a:'Periodic unmanned operation allowed with Class-approved alarm/monitoring system, defined rounds every 30 min minimum, immediate response capability.' },
    ]
  },
  { id:'er_logs', icon:'📓', title:'Engine Room Logs & Records',
    desc:'Official log book, ORB (oil record book), engine log, fuel consumption tracking, noon report',
    formulas:[
      { label:"SFOC Calculation", eq:"SFOC = (Fuel consumed [g/h]) / (Power output [kW])  g/kWh", note:'Specific Fuel Oil Consumption. Typical slow-speed diesel: 155–180 g/kWh.' },
    ],
    flashcards:[
      { q:'ORB Part I — what does it record?', a:'Oil Record Book Part I (engine room): fuel oil operations, bilge water disposal, sludge discharge, tank cleaning.' },
    ]
  },
  { id:'er_alarms', icon:'🚨', title:'Alarm Handling & Emergency Response',
    desc:'Alarm management, response priorities, flooding procedures, blackout recovery, main engine failure at sea',
    formulas:[],
    flashcards:[
      { q:'First action on engine room flooding?', a:'1. Alert bridge & chief engineer. 2. Identify/isolate source. 3. Start bilge pumps. 4. Activate emergency bilge suction if rapid flooding.' },
      { q:'Blackout — first priority?', a:'Restore power: start emergency generator, then bring main generators online. Maintain steering and navigation lights.' },
    ]
  },
]);

setChapters('bt_sea_main','⚙️','Main Engine Operation',
  'Main engine monitoring, performance, adjustments, fuel management, sea passage operations','Sem 5',[
  { id:'main_perf', icon:'📊', title:'Main Engine Performance',
    desc:'Power card, draw card, P-V diagrams, indicator diagrams, SFOC monitoring, power balance',
    formulas:[
      { label:"Mean Effective Pressure", eq:"IMEP = (Area of indicator diagram × spring value) / (Length of diagram)", note:'Indicated Mean Effective Pressure from P-V diagram. Units: bar.' },
      { label:"Indicated Horse Power", eq:"IHP = (IMEP × L × A × N × k) / 0.6   kW", note:'L=stroke(m), A=piston area(m²), N=rpm, k=number of cylinders, IMEP in bar.' },
    ],
    flashcards:[
      { q:'What does a high exhaust temperature on one cylinder indicate?', a:'Possible causes: late injection timing, faulty injector, incorrect air fuel ratio, scavenge fire, leaking exhaust valve.' },
    ]
  },
  { id:'main_fuel', icon:'⛽', title:'Fuel System Management',
    desc:'Fuel oil treatment (settling, purifying, heating), viscosity control, changeover procedures, bunker management',
    formulas:[
      { label:"Viscosity Blending", eq:"ln(v_blend) = x·ln(v₁) + (1−x)·ln(v₂)", note:'x=volume fraction of fuel 1. Used when blending HFO with distillate for correct viscosity.' },
    ],
    flashcards:[
      { q:'Why is HFO preheated before injection?', a:'To reduce viscosity to 12–15 cSt at injector for proper atomisation. Cold HFO is too viscous to spray correctly.' },
    ]
  },
]);

setChapters('bt_sea_safe','🛡️','Safety Management — ISM & SOLAS',
  'ISM Code, SMS, risk assessment, PTW, SOLAS requirements, accident investigation','Sem 5',[
  { id:'safe_ism', icon:'📋', title:'ISM Code & Safety Management System',
    desc:'ISM Code structure, SMS elements, DOC & SMC certificates, non-conformities, internal audits',
    formulas:[],
    flashcards:[
      { q:'What is a non-conformity under ISM?', a:'An observed situation where objective evidence indicates a requirement of the ISM Code is not fulfilled.' },
      { q:'ISM safety policy must include?', a:'Commitment to safety and environmental protection, provide resources, establish objectives, and be implemented at all levels.' },
    ]
  },
  { id:'safe_ptw', icon:'📝', title:'Permit to Work System',
    desc:'Hot work PTW, enclosed space entry PTW, working aloft, electrical isolation, LOTO (lockout/tagout)',
    formulas:[],
    flashcards:[
      { q:'Required gas tests before enclosed space entry?', a:'O₂ ≥ 20.9%, flammable gas < 1% LEL, toxic gases (H₂S < 10 ppm, CO < 25 ppm).' },
      { q:'LOTO purpose?', a:'Lockout/Tagout — ensures energy sources are isolated and equipment cannot be energised during maintenance.' },
    ]
  },
  { id:'safe_solas', icon:'🚢', title:'SOLAS Requirements',
    desc:'SOLAS chapters relevant to machinery, fire, lifesaving appliances, radio, survey requirements',
    formulas:[],
    flashcards:[
      { q:'SOLAS Chapter II-1 covers?', a:'Construction — subdivision and stability, machinery and electrical installations.' },
      { q:'SOLAS Chapter II-2 covers?', a:'Fire protection, fire detection, and fire extinction.' },
    ]
  },
]);

setChapters('bt_sea_marpol','🌊','MARPOL & Environment',
  'MARPOL Annexes I/II/IV/V/VI, ORB, Oil Pollution response, air emissions, garbage management','Sem 5',[
  { id:'marpol_ann1', icon:'🛢️', title:'MARPOL Annex I — Oil Pollution',
    desc:'Oil discharge criteria, ORB Part I/II, IOPP certificate, OWS 15ppm alarm, bilge management',
    formulas:[
      { label:"Max Instantaneous Oil Discharge Rate", eq:"< 30 litres/nautical mile (outside special areas)", note:'Also: total quantity < 1/30,000 of cargo for tankers. OWS must achieve 15 ppm effluent.' },
    ],
    flashcards:[
      { q:'MARPOL Annex I special areas?', a:'Mediterranean, Baltic, Black Sea, Red Sea, Gulf of Aden, Antarctic, NW European Waters — stricter or zero discharge.' },
    ]
  },
  { id:'marpol_ann6', icon:'💨', title:'MARPOL Annex VI — Air Pollution',
    desc:'SOx (SECA/global sulphur cap), NOx tiers, PM, CO₂/EEDI/CII/SEEMP, ozone depletion',
    formulas:[
      { label:"Global Sulphur Cap (2020)", eq:"Max fuel sulphur content: 0.50% m/m globally; 0.10% m/m in ECAs", note:'ECA = Emission Control Area (Baltic, North Sea, North America, US Caribbean).' },
      { label:"NOx Tier III (in ECAs)", eq:"Tier III NOx limit ≈ 3.4 × n^(−0.2) g/kWh  (n=rpm)", note:'80% reduction vs Tier I. Required for engines built after 2016 operating in ECAs.' },
    ],
    flashcards:[
      { q:'EEDI — what does it measure?', a:'Energy Efficiency Design Index — CO₂ emissions per tonne-mile. Lower is better. Required for new ships.' },
      { q:'SEEMP purpose?', a:'Ship Energy Efficiency Management Plan — operational plan to improve energy efficiency. Mandatory for all ships.' },
    ]
  },
  { id:'marpol_ann5', icon:'🗑️', title:'MARPOL Annex V — Garbage',
    desc:'Garbage management plan, garbage record book, disposal restrictions by area and garbage type',
    formulas:[],
    flashcards:[
      { q:'Where is ALL garbage discharge prohibited (Annex V)?', a:'In special areas AND in ports. Plastics are prohibited everywhere in the sea.' },
    ]
  },
  { id:'marpol_bwm', icon:'🧫', title:'Ballast Water Management',
    desc:'BWM Convention 2004 (in force 2017), D-1 exchange standard, D-2 treatment standard, BWMS',
    formulas:[],
    flashcards:[
      { q:'BWM D-2 standard requirements?', a:'< 10 viable organisms/m³ (>50μm); < 10 viable organisms per mL (10–50μm); indicator microbes below WHO thresholds.' },
    ]
  },
]);

setChapters('bt_sea_stp','🚢','Port State Control & Procedures',
  'PSC inspections, deficiencies, ISPS Code, port entry procedures, customs/immigration','Sem 5',[
  { id:'stp_psc', icon:'🔍', title:'Port State Control Inspections',
    desc:'PSC MOU regions, inspection types, priority areas, deficiencies, detention criteria, THETIS/PARIS/Tokyo MOU',
    formulas:[],
    flashcards:[
      { q:'Grounds for detention by PSC?', a:'Deficiencies that pose danger to safety, health or environment and cannot be rectified in port. Must remain until rectified.' },
      { q:'Paris MOU inspection areas?', a:'Certificates, crew welfare, fire safety, lifesaving appliances, ISM, ISPS, navigation, propulsion, pollution prevention.' },
    ]
  },
  { id:'stp_isps', icon:'🔐', title:'ISPS Code — Ship Security',
    desc:'Security levels 1/2/3, SSP, SSO duties, CSO, PFSO, Declaration of Security, security drills',
    formulas:[],
    flashcards:[
      { q:'ISPS Security Level 2 means?', a:'Heightened risk of security incident. Additional protective measures maintained for a period.' },
      { q:'SSO responsibilities?', a:'Ship Security Officer — implement SSP, conduct security drills, maintain security records, report threats to CSO.' },
    ]
  },
  { id:'stp_voyage', icon:'🗺️', title:'Voyage Planning',
    desc:'COLREGS, voyage plan stages (appraisal/planning/execution/monitoring), ECDIS, waypoints, TRS avoidance',
    formulas:[],
    flashcards:[
      { q:'4 stages of voyage planning (SOLAS V/34)?', a:'Appraisal → Planning → Execution → Monitoring.' },
    ]
  },
]);

setChapters('bt_diesel2','🔧','Marine Diesel Engine II',
  '4-stroke engines, advanced injection, governor, propulsion shafting, controllable pitch propellers','Sem 6',[
  { id:'d2_4stroke', icon:'⚙️', title:'4-Stroke Diesel Engines',
    desc:'Medium & high-speed diesel, valve timing, camshaft, A/E & genset engines, comparison with 2-stroke',
    formulas:[
      { label:"4-Stroke Power Calculation", eq:"P = (BMEP × L × A × N) / (2 × 0.6)   [kW]", note:'Divide by 2 because power stroke every 2 revolutions. BMEP in bar.' },
      { label:"Valve Timing (degrees)", eq:"IVO before TDC → IVC after BDC → EVO before BDC → EVC after TDC", note:'Overlap period (both valves open) typically 20–40° crank angle for scavenging.' },
    ],
    flashcards:[
      { q:'Why do 4-stroke engines have camshafts?', a:'To precisely time valve opening/closing and fuel injection relative to crankshaft position.' },
    ]
  },
  { id:'d2_governor', icon:'🎛️', title:'Governor & Fuel Control',
    desc:'Mechanical governor (Woodward), electronic governor, PLC control, speed droop, load sharing',
    formulas:[
      { label:"Speed Droop", eq:"Droop = (No-load speed − Full-load speed) / No-load speed × 100%", note:'Typical: 4–6%. Allows load sharing between parallel generators. Lower droop = more sensitive.' },
    ],
    flashcards:[
      { q:'Why is droop required for parallel generators?', a:'Ensures stable load sharing. If one generator had zero droop, it would take all the load.' },
    ]
  },
  { id:'d2_shafting', icon:'🔩', title:'Propulsion Shafting',
    desc:'Intermediate shafts, thrust block, stern tube, shaft seals, shaft alignment, critical speed',
    formulas:[
      { label:"Critical Speed", eq:"N_crit = (30/π) × √(g × Σ(WΔ²/EI))^(-½)   [rpm]", note:'Resonant speed of shaft. Must not operate within ±20% of critical speed.' },
      { label:"Thrust Bearing", eq:"P_thrust = T / A_projected   [MPa]", note:'T=propeller thrust, A=projected pad area. Usually 20–30% higher capacity than max propeller thrust.' },
    ],
    flashcards:[
      { q:'Purpose of the thrust block?', a:'Transmits propeller thrust to the ship\'s hull structure. Located close to engine to minimise shaft stress.' },
    ]
  },
]);

setChapters('bt_aux2','⚙️','Auxiliary Machinery II',
  'Steering gear, deck machinery, HVAC, bilge systems, ballast systems, crane & winch','Sem 6',[
  { id:'aux2_steering', icon:'🎯', title:'Steering Gear',
    desc:'Hydraulic steering gear (ram type, rotary vane), SOLAS requirements, changeover, emergency steering',
    formulas:[
      { label:"SOLAS Rudder Swing Time", eq:"35° one side → 35° other side in ≤ 28 seconds (main steering gear)", note:'At max continuous power (rated) ahead speed. Emergency: 15° each side in 60s at half speed.' },
    ],
    flashcards:[
      { q:'When must emergency steering drills be conducted?', a:'Every 3 months. Record in official log book. Include: communications, operation of local control, reprogramming.' },
      { q:'SOLAS steering gear pump requirements?', a:'At least 2 independent power units. Either capable of meeting SOLAS performance requirements.' },
    ]
  },
  { id:'aux2_deck', icon:'⛓️', title:'Deck Machinery',
    desc:'Windlasses, mooring winches, capstans, hatch covers, cargo gear SWL, wire ropes',
    formulas:[
      { label:"Safe Working Load (Wire Rope)", eq:"SWL = (d² × 8) / 10   tonnes  (approx.)", note:'d=diameter in mm. Actual SWL from manufacturer certificate. Factor of safety typically 5:1.' },
    ],
    flashcards:[
      { q:'When must wire rope be condemned?', a:'Visible broken wires > 10% of wires in one rope lay length, kinks/birdcaging, severe corrosion/wear reducing diameter >10%.' },
    ]
  },
  { id:'aux2_hvac', icon:'❄️', title:'HVAC Systems',
    desc:'Air handling units, psychrometrics, cooling loads, chilled water systems, accommodation air conditioning',
    formulas:[
      { label:"Sensible Heat Load", eq:"Q_s = ṁ_air × C_p × ΔT   [kW]", note:'ṁ=mass flow(kg/s), C_p=1.006 kJ/kgK for air, ΔT=temperature rise.' },
      { label:"Relative Humidity", eq:"RH = (p_v / p_sat) × 100%", note:'p_v=partial pressure of water vapour, p_sat=saturation pressure at same temperature.' },
    ],
    flashcards:[
      { q:'Dew point definition?', a:'Temperature at which air must be cooled (at constant pressure) for water vapour to condense. RH reaches 100% at dew point.' },
    ]
  },
]);

setChapters('bt_control','🎛️','Automatic Control Systems',
  'Control theory, PID controllers, sensors, pneumatic/hydraulic controls, PLCs, automation','Sem 6',[
  { id:'ctrl_theory', icon:'📈', title:'Control Theory Basics',
    desc:'Open/closed loop, transfer functions, Laplace in control, stability analysis, Bode plots, Nyquist',
    formulas:[
      { label:"Transfer Function", eq:"G(s) = Output(s) / Input(s)   (with zero initial conditions)", note:'Laplace domain ratio. Characterises system behaviour. Poles determine stability.' },
      { label:"PID Control Law", eq:"u(t) = K_p·e + K_i·∫e dt + K_d·(de/dt)", note:'e=error. K_p=proportional, K_i=integral (eliminates offset), K_d=derivative (reduces overshoot).' },
    ],
    flashcards:[
      { q:'Steady-state error with P-control only?', a:'Non-zero offset for step disturbances. Adding integral action eliminates steady-state error.' },
    ]
  },
  { id:'ctrl_sensors', icon:'📡', title:'Sensors & Transducers',
    desc:'Temperature (RTD, thermocouple), pressure (Bourdon, strain gauge), flow (turbine, ultrasonic), level',
    formulas:[
      { label:"RTD (Pt100)", eq:"R_T = R₀(1 + αT + βT²)", note:'R₀=100Ω at 0°C, α≈3.85×10⁻³/°C for platinum. Linear approximation: R_T ≈ 100(1+0.00385T).' },
    ],
    flashcards:[
      { q:'Thermocouple vs RTD — key difference?', a:'TC: wider range (-200 to +1750°C), faster response, needs cold junction compensation. RTD: more accurate, stable, narrower range.' },
    ]
  },
  { id:'ctrl_plc', icon:'💻', title:'PLCs & Automation',
    desc:'PLC structure (CPU/I/O), ladder logic, function blocks, SCADA, distributed control systems, automation philosophy',
    formulas:[],
    flashcards:[
      { q:'PLC scan cycle?', a:'Read inputs → Execute program → Update outputs → Housekeeping. Cycle time: 1–100ms depending on program size.' },
      { q:'Fail-safe principle?', a:'System defaults to safe state on power loss or failure. E.g. normally-open valve fails closed; alarm activates on circuit break.' },
    ]
  },
]);

setChapters('bt_propulsion','🚢','Propulsion Engineering',
  'Propeller theory, thrust, cavitation, CPP, azimuth thrusters, matching engine to propeller','Sem 6',[
  { id:'prop_theory', icon:'🌀', title:'Propeller Theory',
    desc:'Thrust, torque, efficiency, pitch, slip, wake fraction, thrust deduction factor, propeller curves',
    formulas:[
      { label:"Propulsive Efficiency", eq:"η_D = η_H × η_O × η_R", note:'Hull efficiency η_H=(1-t)/(1-w), open water efficiency η_O, relative rotative efficiency η_R≈1.' },
      { label:"Advance Coefficient", eq:"J = V_a / (n × D)", note:'V_a=speed of advance(m/s), n=rev/s, D=diameter(m). Used with Kt-Kq-J charts.' },
      { label:"Thrust Coefficient", eq:"K_T = T / (ρ n² D⁴)", note:'T=thrust(N), ρ=water density(kg/m³), n=rev/s, D=diameter(m).' },
    ],
    flashcards:[
      { q:'What is propeller slip?', a:'Difference between theoretical pitch distance and actual ship speed advance. Apparent slip includes wake.' },
    ]
  },
  { id:'prop_cavitation', icon:'💧', title:'Cavitation & Propeller Selection',
    desc:'Suction side cavitation, erosion, noise, bubble/cloud/sheet cavitation, NPSH-like criterion, KAMe series',
    formulas:[
      { label:"Cavitation Number", eq:"σ = (p₀ − p_v) / (½ρV²)", note:'p₀=ambient pressure, p_v=vapour pressure, V=local flow velocity. Cavitation when σ drops below critical value.' },
    ],
    flashcards:[
      { q:'What causes propeller erosion from cavitation?', a:'Bubble collapse near metal surface generates micro-jets (~500 m/s) and shock waves removing material.' },
    ]
  },
  { id:'prop_cpp', icon:'⚙️', title:'Controllable Pitch Propellers',
    desc:'CPP mechanism, pitch control actuator, combined diesel-electric, CRP drives, thruster systems',
    formulas:[],
    flashcards:[
      { q:'Main advantage of CPP over FPP?', a:'Engine can run at constant optimal RPM while ship speed varies. Better part-load efficiency, no reversing gear needed.' },
    ]
  },
]);

setChapters('bt_hv','⚡','High Voltage Engineering',
  'HV safety, HV switchgear, transformers, protection, earthing, shipboard HV systems','Sem 7',[
  { id:'hv_safety', icon:'⚠️', title:'HV Safety & Earthing',
    desc:'HV zones, safe distances, insulation testing, LOTO procedures for HV, protective equipment, earthing faults',
    formulas:[
      { label:"Insulation Resistance Test", eq:"IR at 1kV applied: ≥ 1MΩ/kV of system voltage (min)", note:'Measured with megger. Damp conditions reduce IR significantly. Polarisation index = IR(10min)/IR(1min) ≥ 1.5.' },
    ],
    flashcards:[
      { q:'Minimum approach distance for 6.6kV system?', a:'At least 300mm. Specific distances in Class/Flag state regulations. Always verify with documented risk assessment.' },
      { q:'Purpose of HV earthing switch?', a:'Connects HV busbar/cable to earth before work commences, discharging capacitive stored energy.' },
    ]
  },
  { id:'hv_switchgear', icon:'🔲', title:'HV Switchgear',
    desc:'Vacuum circuit breakers, SF6 gas breakers, bus section arrangements, interlocks, trip testing',
    formulas:[
      { label:"Short Circuit MVA", eq:"MVA_sc = √3 × V_L × I_sc / 10⁶", note:'V_L=line voltage(V), I_sc=fault current(A). Used to rate switchgear interrupting capacity.' },
    ],
    flashcards:[
      { q:'Why vacuum circuit breakers for shipboard HV?', a:'Compact, low maintenance, no SF6 gas environmental concerns, fast arc extinguishing in vacuum, suitable for frequent switching.' },
    ]
  },
  { id:'hv_protection', icon:'🛡️', title:'HV Protection Systems',
    desc:'Overcurrent relays (IDMT), differential protection, earth fault detection, distance protection, backup protection',
    formulas:[
      { label:"IDMT Operating Time", eq:"t = (TMS × 0.14) / ((I/I_s)^0.02 − 1)", note:'Standard inverse curve. TMS=time multiplier setting, I=fault current, I_s=pickup setting.' },
    ],
    flashcards:[
      { q:'Primary vs backup protection?', a:'Primary: fastest, closest to fault (e.g. differential). Backup: slower, further away, operates if primary fails.' },
    ]
  },
]);

setChapters('bt_mep','🌿','Marine Environmental Protection',
  'Pollution prevention regulations, clean shipping, energy efficiency, waste management at sea','Sem 7',[
  { id:'mep_regulations', icon:'📋', title:'IMO Environmental Regulations',
    desc:'MARPOL overview, STCW environmental awareness, OPRC Convention, AFS Convention, BWM Convention',
    formulas:[],
    flashcards:[
      { q:'AFS Convention (2001) purpose?', a:'Anti-Fouling Systems Convention. Prohibits organotin (TBT) compounds in anti-fouling paint. Ships must have hull coating certificate.' },
    ]
  },
  { id:'mep_energy', icon:'⚡', title:'Energy Efficiency & Carbon',
    desc:'EEDI, EEXI, CII, SEEMP Parts I/II/III, carbon intensity rating (A–E), corrective action plans',
    formulas:[
      { label:"CII Rating", eq:"CII = (CO₂ emissions per year) / (DWT × Distance)   [g CO₂/DWT·nm]", note:'Annual operational carbon intensity. A=best, E=worst. E-rating for 3 consecutive years → corrective action plan.' },
    ],
    flashcards:[
      { q:'EEXI vs CII?', a:'EEXI: technical energy efficiency index for existing ships (design-based, one-time compliance). CII: operational carbon intensity, reported annually.' },
    ]
  },
  { id:'mep_waste', icon:'♻️', title:'Waste & Garbage Management',
    desc:'Garbage management plan (GMP), garbage record book, types of waste, reception facilities, plastics',
    formulas:[],
    flashcards:[
      { q:'Can food waste be discharged at sea?', a:'Only if comminuted/ground, 25nm+ offshore, and not in special areas. Unprocessed food: 12nm+.' },
    ]
  },
]);

setChapters('bt_env','🌱','Environment & Safety Management',
  'Environmental management systems, ISO 14001, environmental risk, HSSEQ management on board','Sem 7',[
  { id:'env_ems', icon:'🌍', title:'Environmental Management Systems',
    desc:'ISO 14001 framework, environmental policy, aspect/impact register, objectives and targets, monitoring',
    formulas:[],
    flashcards:[
      { q:'Environmental aspect vs impact?', a:'Aspect: element of activity that can interact with the environment (e.g. diesel combustion). Impact: change to environment (e.g. SOx emissions, acid rain).' },
    ]
  },
  { id:'env_climate', icon:'🌡️', title:'Climate Change & Shipping',
    desc:'GHG emissions from shipping, IMO initial strategy (2050 targets), alternative fuels, LNG, ammonia, hydrogen',
    formulas:[
      { label:"CO₂ Emission Factor (HFO)", eq:"EF_CO₂ = 3.114 tonnes CO₂ per tonne HFO burned", note:'IPCC/IMO factor. MDO: 3.206 t/t, LNG: 2.75 t/t (based on carbon content).' },
    ],
    flashcards:[
      { q:'IMO 2050 GHG target?', a:'Net-zero GHG emissions from international shipping by or around 2050. Revised strategy (2023).' },
    ]
  },
]);

setChapters('bt_ndt','🔍','Non-Destructive Testing',
  'Visual, dye-penetrant, MPI, ultrasonic, radiographic, eddy current — theory and practical','Sem 7',[
  { id:'ndt_visual', icon:'👁️', title:'Visual & Dye Penetrant Testing',
    desc:'Direct and remote visual inspection, DPT (dye-penetrant) procedure, sensitivity, surface preparation',
    formulas:[],
    flashcards:[
      { q:'DPT procedure steps?', a:'1.Clean 2.Apply penetrant(dwell 10-15min) 3.Remove excess 4.Apply developer 5.Inspect under UV/white light 6.Post-clean.' },
    ]
  },
  { id:'ndt_ut', icon:'🔊', title:'Ultrasonic Testing',
    desc:'A-scan/B-scan, pulse-echo technique, probe types, coupling, flaw sizing, thickness measurement',
    formulas:[
      { label:"Pulse Travel Time", eq:"d = (v × t) / 2", note:'d=defect depth(m), v=velocity in material(m/s), t=travel time(s). Divide by 2 for pulse-echo (two-way travel).' },
    ],
    flashcards:[
      { q:'Speed of sound in steel (approx)?', a:'~5920 m/s (longitudinal waves), ~3250 m/s (shear waves). Used to calibrate UT equipment.' },
    ]
  },
  { id:'ndt_mpi', icon:'🧲', title:'Magnetic Particle & Radiography',
    desc:'MPI theory, DC vs AC, yoke/coil/prod methods, fluorescent particles, RT (X-ray & gamma), film interpretation',
    formulas:[],
    flashcards:[
      { q:'Why use AC for surface crack detection in MPI?', a:'AC creates skin effect — flux concentrated at surface. Better for fine surface cracks than DC which is better for sub-surface.' },
    ]
  },
]);

setChapters('bt_naval3','🚢','Naval Architecture III',
  'Ship resistance, propulsion coefficients, seakeeping, manoeuvring, structural analysis','Sem 7',[
  { id:'nav3_resist', icon:'🌊', title:'Ship Resistance',
    desc:'Frictional resistance (ITTC), wave-making, viscous pressure, appendage resistance, form factor',
    formulas:[
      { label:"Frictional Resistance (ITTC-57)", eq:"C_F = 0.075 / (log₁₀Re − 2)²", note:'Re=V·L/ν, L=waterline length, ν=kinematic viscosity. Baseline for towing tank extrapolation.' },
      { label:"Effective Power", eq:"P_E = R_T × V   [W]", note:'R_T=total resistance(N), V=ship speed(m/s). Useful power to overcome all resistance.' },
    ],
    flashcards:[
      { q:'Froude number significance?', a:'Fr=V/√(gL). Fr>0.5: wave-making resistance dominates. Fr<0.3: friction dominates. Ships typically operate at Fr=0.15–0.30.' },
    ]
  },
  { id:'nav3_seakeep', icon:'〰️', title:'Seakeeping',
    desc:'Ship motions in waves (6 DOF), natural periods, rolling in beam seas, parametric rolling, slamming',
    formulas:[
      { label:"Natural Roll Period", eq:"T_R = 2π × k / √(GM_T × g)", note:'k=radius of gyration ≈ 0.38B (ships). T_R in seconds. Synchronous rolling occurs when T_wave = T_R.' },
    ],
    flashcards:[
      { q:'How to avoid parametric rolling?', a:'Change course and/or speed to move away from resonant encounter frequency. Avoid quartering seas in rough weather with low GM.' },
    ]
  },
  { id:'nav3_manoeuvre', icon:'🎯', title:'Manoeuvring',
    desc:'Turning circle, tactical diameter, advance, transfer, stopping distances, IMO manoeuvring standards',
    formulas:[
      { label:"IMO Turning Ability", eq:"Tactical Diameter ≤ 5 × L (IMO A.751)", note:'At 35° rudder. Also: advance ≤ 4.5L at 90° change of heading.' },
    ],
    flashcards:[
      { q:'Stopping distance IMO requirement?', a:'Ship head-reach: ≤ 15 ship lengths from initial speed. Track reach recorded.' },
    ]
  },
]);

setChapters('bt_casualty','🚨','Ship Casualty Investigation',
  'IMO MSC Res., flag state investigation, accident sequence, human factors, near-miss reporting','Sem 7',[
  { id:'cas_process', icon:'📋', title:'Investigation Process & Regulations',
    desc:'IMO Res. MSC.255(84) — Casualty Investigation Code, flag state obligations, MAIIF, RAIB equivalent',
    formulas:[],
    flashcards:[
      { q:'Purpose of casualty investigation (IMO MSC.255)?', a:'To prevent recurrence by determining contributing factors and causal chains — NOT to apportion blame or determine liability.' },
      { q:'Definition of very serious marine casualty?', a:'Loss of ship, loss of life, or severe pollution.' },
    ]
  },
  { id:'cas_human', icon:'🧠', title:'Human Factors & Error Analysis',
    desc:'HFACS, Swiss cheese model, situational awareness, fatigue, bridge resource management, CRM',
    formulas:[],
    flashcards:[
      { q:'Swiss cheese model of accidents?', a:'Reason\'s model: multiple defensive barriers each with "holes" (failures). When holes align, accident trajectory passes through all — accident occurs.' },
    ]
  },
  { id:'cas_types', icon:'🔥', title:'Common Marine Casualties',
    desc:'Engine room fire, flooding, grounding, collision, cargo incidents, structural failure, machinery damage',
    formulas:[],
    flashcards:[
      { q:'Engine room fire — typical causes?', a:'Fuel oil spray onto hot surfaces (failed joints/connections), electrical fault, oily bilges, unattended maintenance (hot work).' },
    ]
  },
]);

setChapters('bt_mgmt','📊','Marine Engineering Management',
  'Leadership, MLC 2006, budgeting, procurement, maintenance management, port state, crew management','Sem 8',[
  { id:'mgmt_lead', icon:'👥', title:'Leadership & Team Management',
    desc:'Leadership styles, conflict resolution, effective communication, multicultural teams, coaching',
    formulas:[],
    flashcards:[
      { q:'Situational leadership concept?', a:'Effective leadership style depends on the readiness/competence of the follower. Adapt style from directing→coaching→supporting→delegating.' },
    ]
  },
  { id:'mgmt_mlc', icon:'📋', title:'MLC 2006 — Maritime Labour Convention',
    desc:'Seafarer rights: working hours, accommodation, food, medical care, repatriation, social security, SEA',
    formulas:[],
    flashcards:[
      { q:'MLC 2006 maximum work hours?', a:'Maximum 14 hours in any 24-hour period; maximum 72 hours in any 7-day period.' },
      { q:'What is a Seafarer Employment Agreement (SEA)?', a:'Written contract between seafarer and shipowner defining terms of service, wages, termination, repatriation rights.' },
    ]
  },
  { id:'mgmt_budget', icon:'💰', title:'Budget & Procurement',
    desc:'Opex/Capex budgeting, cost centres, competitive tendering, spare parts management, technical purchasing',
    formulas:[
      { label:"Running Cost Breakdown (typical)", eq:"Crew ≈ 40%, Maintenance ≈ 25%, Stores/spares ≈ 15%, Insurance ≈ 10%, Admin ≈ 10%", note:'Varies by ship type, age, flag. Use for budget estimation and cost control.' },
    ],
    flashcards:[
      { q:'Why is planned maintenance better than breakdown maintenance?', a:'Lower overall cost: reduces downtime, emergency repair expenses, off-hire penalties, class deficiencies, port detentions.' },
    ]
  },
]);

setChapters('bt_maint2','🔧','Condition Monitoring & Maintenance',
  'Vibration analysis, oil analysis, thermography, bearing diagnostics, reliability engineering','Sem 7',[
  { id:'maint2_vib', icon:'📊', title:'Vibration Analysis',
    desc:'Vibration signatures, accelerometers, FFT spectrum, bearing frequencies, unbalance, misalignment',
    formulas:[
      { label:"BPFO (Ball Pass Frequency Outer race)", eq:"BPFO = (n/2) × f_s × (1 − d/D × cos α)", note:'n=balls, f_s=shaft frequency, d=ball diameter, D=pitch diameter, α=contact angle. Bearing defect identification.' },
      { label:"Vibration Velocity (ISO 10816)", eq:"ISO class III general machinery: 2.8–7.1 mm/s RMS acceptable range", note:'ISO 10816-3: new install < 2.8 mm/s, alarm > 7.1 mm/s, trip > 11 mm/s.' },
    ],
    flashcards:[
      { q:'What does a large 1× component in FFT indicate?', a:'Unbalance — rotating mass eccentricity. Dominant at running speed frequency.' },
    ]
  },
  { id:'maint2_oil', icon:'🔬', title:'Oil Analysis',
    desc:'Wear particle analysis, viscosity checks, TAN/TBN, water contamination, spectrometric analysis',
    formulas:[
      { label:"TBN Test", eq:"TBN: mg KOH/g oil. New HFO cylinder oil ≈ 70 BN. Condemn when TBN < 25–30% of new value.", note:'TBN = Total Base Number. Indicates acid-neutralising capacity remaining.' },
    ],
    flashcards:[
      { q:'What do iron particles in engine oil indicate?', a:'Wear of ferrous components (cylinder liners, crankshaft, bearings). Rising trend indicates accelerating wear.' },
    ]
  },
  { id:'maint2_thermo', icon:'🌡️', title:'Thermography & Electrical Monitoring',
    desc:'IR thermography for electrical panels, bearings, refractory lining, steam traps, insulation defects',
    formulas:[],
    flashcards:[
      { q:'When to use thermographic survey on switchboard?', a:'Annually (minimum), and after any modifications, to detect loose connections, overloaded circuits, failing components.' },
    ]
  },
]);

setChapters('bt_altfuel2','🌿','Alternative Fuels',
  'LNG, LPG, methanol, hydrogen, ammonia as marine fuels — IGF Code, storage, safety','Sem 7',[
  { id:'alt_lng', icon:'🧊', title:'LNG as Marine Fuel',
    desc:'LNG properties, storage (type C/membrane tanks), BOG management, re-liquefaction, bunkering, IGF Code',
    formulas:[
      { label:"LNG Energy Density", eq:"LNG: ~23 MJ/L;  HFO: ~34 MJ/L", note:'LNG lower volumetric energy density → larger tanks needed for same range. Higher specific energy (50 vs 40 MJ/kg).' },
    ],
    flashcards:[
      { q:'Main advantage of LNG vs HFO?', a:'~20% less CO₂, ~90% less SOx, ~80% less NOx, ~35% less PM. Meets Tier III NOx in ECAs without SCR.' },
      { q:'BOG — what is it and how managed?', a:'Boil-Off Gas — natural evaporation from LNG storage. Can be used as fuel in dual-fuel engines or re-liquefied.' },
    ]
  },
  { id:'alt_ammonia', icon:'🧪', title:'Ammonia & Hydrogen as Fuels',
    desc:'Zero-carbon fuels, storage, combustion challenges, safety (toxicity, flammability), production, infrastructure',
    formulas:[
      { label:"Ammonia Energy", eq:"NH₃: ~12.7 MJ/L; no CO₂ when burned — N₂ + H₂O products", note:'Energy density ~⅓ of HFO. Toxic (TLV-TWA = 25 ppm). Challenging combustion (low flammability range).' },
    ],
    flashcards:[
      { q:'Why is green hydrogen/ammonia important?', a:'Zero carbon footprint when produced by electrolysis using renewable electricity. Key for IMO 2050 net-zero targets.' },
    ]
  },
  { id:'alt_methanol', icon:'⚗️', title:'Methanol & Biofuels',
    desc:'Methanol properties, dual-fuel engines, co-firing ratios, biodiesel blending, HVO, waste cooking oil',
    formulas:[],
    flashcards:[
      { q:'Key challenges of methanol as marine fuel?', a:'Lower energy density (requires 2× more volume than HFO), toxic, low flash point (11°C, requires enclosed handling), compatible materials.' },
    ]
  },
]);

setChapters('bt_digitech','💻','Digital Technologies in Marine Engineering',
  'ECDIS, AIS, VDR, integrated bridge, cybersecurity, Industry 4.0, digital twins','Sem 8',[
  { id:'dt_ecdis', icon:'🗺️', title:'ECDIS & Navigation Systems',
    desc:'ECDIS vs paper chart requirements, ENC, RCDS, route planning, alarms, GNSS integration, SOLAS V/18-19',
    formulas:[],
    flashcards:[
      { q:'ECDIS — when does it replace paper charts?', a:'When there are two independent ECDIS units with up-to-date ENCs AND a paper chart backup as Type Approved backup. Alternatively, carry paper charts as backup.' },
    ]
  },
  { id:'dt_cyber', icon:'🔐', title:'Cybersecurity',
    desc:'IMO MSC-FAL.1/Circ.3, cyber risk management in SMS, vulnerability assessment, incident response',
    formulas:[],
    flashcards:[
      { q:'IMO cyber risk management requirement?', a:'From 2021: cyber risk management integrated into Safety Management Systems under ISM Code. Annual DOC/SMC verification.' },
    ]
  },
  { id:'dt_industry4', icon:'🤖', title:'Industry 4.0 & Digital Twins',
    desc:'IoT sensors, predictive maintenance, condition monitoring systems, AI/ML applications, digital twin concept',
    formulas:[],
    flashcards:[
      { q:'What is a digital twin?', a:'A real-time digital replica of a physical asset (e.g. engine) that uses sensor data to monitor, simulate and predict performance and maintenance needs.' },
    ]
  },
]);

setChapters('bt_drydock','🏭','Drydocking & Ship Repair',
  'Drydocking procedures, classification surveys, underwater inspection, hull repairs, special survey','Sem 8',[
  { id:'dry_proc', icon:'🚢', title:'Drydocking Procedures',
    desc:'Pre-dry dock survey, block positioning, flooding & pumping sequence, stability during drydock, safety',
    formulas:[],
    flashcards:[
      { q:'What is the critical instant during drydocking?', a:'When the keel just touches the blocks — before the ship is fully supported. Transverse stability is critical. GM must be positive throughout.' },
    ]
  },
  { id:'dry_class', icon:'📋', title:'Classification Surveys',
    desc:'Class notations, survey schedules, continuous survey, docking surveys, special/renewal surveys, surveyors',
    formulas:[],
    flashcards:[
      { q:'What is a Special Survey (SS)?', a:'Comprehensive Class renewal survey carried out every 5 years. Covers hull, machinery, boilers, electrical systems. Renewes Class certificate.' },
    ]
  },
  { id:'dry_hull', icon:'🔧', title:'Hull Repairs & Coating',
    desc:'Plate renewals, grit blasting, paint systems, ultrasonic thickness gauging, weld repair, crack repair',
    formulas:[
      { label:"Corrosion Allowance", eq:"Minimum acceptable thickness = t_original × (1 − Corrosion_allowance)", note:'Class rules define maximum allowable diminution (typically 20% of original thickness for structural members).' },
    ],
    flashcards:[
      { q:'Grit blast standard for underwater coating?', a:'Sa 2½ (near-white metal blast) minimum. Roughness profile Ra 60–100 μm. Applied within 4 hours of blasting.' },
    ]
  },
]);

setChapters('bt_oral_prep','🎓','MMD Oral Exam Preparation',
  'Question bank for 2nd Eng / 1st Eng / Ch. Eng orals — systems, regulations, orals strategy','Sem 8',[
  { id:'oral_2nd', icon:'⭐', title:'Second Engineer Certificate of Competency',
    desc:'2/E MEO Class II written & oral — main engine, aux machinery, electrical, MARPOL, ISM, stability',
    formulas:[],
    flashcards:[
      { q:'What is flash point of HFO?', a:'Minimum 60°C (SOLAS requirement). Typical HFO: 65–100°C. Distillate: 60°C minimum. Below 60°C = flammable cargo class.' },
      { q:'How do you deal with a crankcase explosion?', a:'Emergency stop engine → DO NOT open crankcase for at least 20 minutes after stopping → ventilate with covers open → report to chief engineer → investigate cause (hot bearing, piston seizure).' },
      { q:'What causes a scavenge fire?', a:'Accumulation of oil/carbon deposits in scavenge space ignited by blowpast of hot gases. Signs: high scavenge temperature, smoke from drains, irregular running.' },
    ]
  },
  { id:'oral_chief', icon:'🌟', title:'Chief Engineer Certificate of Competency',
    desc:'Ch.E MEO Class I — advanced engineering, management, economic operation, Class & flag requirements',
    formulas:[],
    flashcards:[
      { q:'What is the Chief Engineer\'s duty regarding MARPOL?', a:'Responsible for ensuring ORB is accurately completed, OWS is operational and type-approved, no illegal overboard discharge, all crew are trained.' },
      { q:'How do you handle a crew member with fatigue concerns?', a:'Acknowledge complaint → review work/rest records → redistribute work → contact company for relief if necessary → document actions. MLC 2006 rest hour violation = PSC deficiency.' },
    ]
  },
]);

setChapters('bt_project','📝','Final Year Project',
  'Research methodology, technical writing, project management, presentation skills','Sem 8',[
  { id:'proj_method', icon:'🔬', title:'Research Methodology',
    desc:'Literature review, hypothesis formation, experimental design, data collection, statistical analysis',
    formulas:[
      { label:"Mean & Standard Deviation", eq:"x̄ = Σxᵢ/n;   σ = √[Σ(xᵢ−x̄)²/(n−1)]", note:'Descriptive statistics for experimental data. Report as x̄ ± σ.' },
    ],
    flashcards:[
      { q:'What is a null hypothesis?', a:'H₀: the default assumption that there is no significant effect or relationship. Rejected if test statistic is in the critical region.' },
    ]
  },
  { id:'proj_write', icon:'📄', title:'Technical Report Writing',
    desc:'IEEE/IME report structure, abstract, citations, figures/tables, appendices, peer review process',
    formulas:[],
    flashcards:[
      { q:'What goes in an abstract?', a:'Purpose/objective, methods used, key results/findings, main conclusions — all in ≤300 words. No references, no new information.' },
    ]
  },
  { id:'proj_present', icon:'🎤', title:'Presentation & Defence',
    desc:'Structuring a technical presentation, handling examiner questions, poster presentation, viva voce',
    formulas:[],
    flashcards:[
      { q:'Rule of thumb for presentation slides?', a:'One slide per minute. Use visuals over text. No more than 6 bullet points per slide. 24pt minimum font.' },
    ]
  },
]);

setChapters('bt_elective','🔭','Advanced Elective Topics',
  'Emerging topics: offshore, LNG, dynamic positioning, polar operations, autonomous vessels','Sem 8',[
  { id:'elec_offshore', icon:'⛽', title:'Offshore Engineering',
    desc:'FPSO systems, riser systems, dynamic positioning (DP), marine risers, subsea systems',
    formulas:[],
    flashcards:[
      { q:'What is DP (Dynamic Positioning)?', a:'System that automatically maintains a vessel\'s position using thrusters controlled by a DP computer using GPS/DGPS/acoustic/taut wire references.' },
    ]
  },
  { id:'elec_polar', icon:'🧊', title:'Polar Operations',
    desc:'Polar Code (in force 2017), ice classes, ice loads, low-temperature materials, polar safety management',
    formulas:[],
    flashcards:[
      { q:'Polar Code — key requirements?', a:'Two chapters: Safety (Part I-A) and Pollution Prevention (Part II-A). Certificate of Polar Ship (EPIRB, immersion suits for all, operational assessment).' },
    ]
  },
  { id:'elec_autonomous', icon:'🤖', title:'Autonomous & Remote Vessels',
    desc:'MASS (Maritime Autonomous Surface Ships), IMO MASS regulatory framework, cyber security, remote operations',
    formulas:[],
    flashcards:[
      { q:'IMO MASS degree of autonomy levels?', a:'Level 1: automated processes, seafarers on board. Level 2: remotely controlled with seafarers on board. Level 3: remotely controlled, no seafarers. Level 4: fully autonomous.' },
    ]
  },
]);

setChapters('bt_physics','⚗️','Engineering Physics',
  'Mechanics, waves, thermodynamics, optics, electromagnetism — scientific foundation','Sem 1',[
  { id:'phys_mech', icon:'⚙️', title:'Mechanics',
    desc:"Newton's laws, work, energy, power, momentum, friction, circular motion, simple harmonic motion",
    formulas:[
      { label:"Newton's Second Law", eq:'F = ma   [N]', note:'F=force(N), m=mass(kg), a=acceleration(m/s²). Net force = rate of change of momentum.' },
      { label:"Kinetic Energy", eq:"KE = ½mv²   [J]", note:'v=velocity(m/s). Work-energy theorem: Work done = ΔKE.' },
      { label:"SHM — Period", eq:"T = 2π√(m/k)  (spring);  T = 2π√(L/g)  (pendulum)", note:'SHM: restoring force ∝ displacement. Period independent of amplitude.' },
    ],
    flashcards:[
      { q:"Newton's third law statement?", a:'For every action there is an equal and opposite reaction. Forces act on different bodies.' },
    ]
  },
  { id:'phys_thermo', icon:'🌡️', title:'Thermodynamics Fundamentals',
    desc:'Temperature, heat, gas laws, specific heat, first law, heat transfer modes',
    formulas:[
      { label:"Ideal Gas Law", eq:"PV = nRT   or   PV = mRT", note:'P=pressure(Pa), V=volume(m³), T=temperature(K), R=287 J/kgK for air, R=8314/M J/kmolK.' },
      { label:"First Law of Thermodynamics", eq:"Q = ΔU + W   [J]", note:'Q=heat added, ΔU=change in internal energy, W=work done by system.' },
    ],
    flashcards:[
      { q:'Zeroth law of thermodynamics?', a:'If body A is in thermal equilibrium with B, and B with C, then A is in thermal equilibrium with C. Basis for temperature measurement.' },
    ]
  },
  { id:'phys_waves', icon:'〰️', title:'Waves & Optics',
    desc:'Wave properties, sound, light, reflection, refraction, diffraction, interference, fibre optics',
    formulas:[
      { label:"Wave Equation", eq:"v = f × λ", note:'v=wave velocity(m/s), f=frequency(Hz), λ=wavelength(m).' },
      { label:"Snell's Law", eq:'n₁ sin θ₁ = n₂ sin θ₂', note:'n=refractive index. Light bends toward normal when entering denser medium.' },
    ],
    flashcards:[
      { q:'What is resonance?', a:'When forced vibration frequency equals natural frequency of system. Amplitude becomes maximum. Can cause structural damage if uncontrolled.' },
    ]
  },
  { id:'phys_em', icon:'⚡', title:'Electromagnetism',
    desc:'Electric fields, magnetic fields, electromagnetic induction, Faraday/Lenz law, Maxwell equations intro',
    formulas:[
      { label:"Faraday's Law of Induction", eq:'EMF = −N × dΦ/dt   [V]', note:'N=number of turns, Φ=magnetic flux(Wb). Basis of all generators and transformers.' },
      { label:"Force on Current-Carrying Conductor", eq:"F = BIL sinθ   [N]", note:'B=flux density(T), I=current(A), L=length(m), θ=angle. Basis of electric motors.' },
    ],
    flashcards:[
      { q:"Lenz's law?", a:'The induced EMF opposes the change causing it. Conservation of energy — system resists change in flux.' },
    ]
  },
]);

setChapters('bt_chem','🧪','Engineering Chemistry',
  'Corrosion science, water treatment, fuel chemistry, polymers, industrial chemistry','Sem 1',[
  { id:'chem_corr', icon:'🌊', title:'Corrosion Science',
    desc:'Types of corrosion, galvanic cell, electrochemical series, cathodic protection, coatings, inhibitors',
    formulas:[
      { label:"Electrochemical Reaction", eq:"Anode: Fe → Fe²⁺ + 2e⁻   Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻", note:'Iron is the anode (corrodes) in seawater. Rate depends on dissolved O₂, temperature, salinity.' },
      { label:"Faraday's Law of Electrolysis", eq:'m = (M × I × t) / (n × F)', note:'m=mass dissolved(g), M=atomic mass, I=current(A), t=time(s), n=valence, F=96485 C/mol.' },
    ],
    flashcards:[
      { q:'Impressed Current Cathodic Protection (ICCP)?', a:'External DC current (from ship generator via reference electrodes) makes hull the cathode. More reliable than sacrificial anodes for large ships.' },
    ]
  },
  { id:'chem_water', icon:'💧', title:'Water Treatment',
    desc:'Feed water chemistry, scale/corrosion control, pH, oxygen scavenging, boiler water treatment, RO plant',
    formulas:[
      { label:"pH Definition", eq:"pH = −log[H⁺]   (neutral = 7, acidic < 7, alkaline > 7)", note:'Boiler feed water pH: 8.5–9.5. Cooling water pH: 7.5–8.5.' },
      { label:"Langelier Saturation Index", eq:"LSI = pH − pH_s   (LSI>0: scaling tendency, LSI<0: corrosive)", note:'pH_s = saturation pH based on Ca²⁺, alkalinity, TDS, temperature.' },
    ],
    flashcards:[
      { q:'Why is oxygen dangerous in boiler water?', a:'Dissolved O₂ causes pitting corrosion of boiler tubes. Removed by deaerator (thermal) and chemical scavengers (hydrazine/sodium sulphite).' },
    ]
  },
  { id:'chem_fuel', icon:'⛽', title:'Fuel Chemistry',
    desc:'Hydrocarbon chemistry, bunker fuel composition, combustion equations, calorific value, sulphur, CCAI',
    formulas:[
      { label:"Combustion of Carbon", eq:"C + O₂ → CO₂   (Complete);   2C + O₂ → 2CO   (Incomplete)", note:'Incomplete combustion wastes energy and produces CO, soot. Caused by insufficient air.' },
      { label:"Stoichiometric Air-Fuel Ratio", eq:"AFR_stoich ≈ 14.5 kg air / kg fuel (diesel)", note:'Actual AFR > stoichiometric for complete combustion. Excess air ≈ 10–20% for marine diesels.' },
      { label:"Calorific Value", eq:"HFO: ~40.5 MJ/kg (LCV);  MDO: ~42.7 MJ/kg;  LNG: ~50 MJ/kg (LCV)", note:'LCV = Lower Calorific Value (water in products remains as vapour). Used for fuel consumption calculations.' },
    ],
    flashcards:[
      { q:'CCAI — what does it indicate?', a:'Calculated Carbon Aromaticity Index — indicates ignition quality of HFO. CCAI < 840: good ignition. > 870: poor ignition (long ignition delay, rough running).' },
    ]
  },
]);

setChapters('bt_elec3','⚡','Electrical Engineering III',
  'Power electronics, drives, PLC automation, SCADA, electric propulsion, high-voltage systems','Sem 5',[
  { id:'elec3_power_e', icon:'🔌', title:'Power Electronics',
    desc:'Diodes, SCRs, thyristors, transistors (IGBT/MOSFET), rectifiers, inverters, choppers, converters',
    formulas:[
      { label:"Single-Phase Full-Wave Rectifier", eq:"V_dc = 2V_m / π   ≈ 0.637 V_m", note:'V_m = peak voltage. Ripple factor = 0.482. Used in battery chargers, excitation systems.' },
      { label:"IGBT Switching Loss", eq:"E_sw = ½ V_ce × I_c × (t_r + t_f) × f_sw", note:'V_ce=collector-emitter voltage, t_r/t_f=rise/fall time, f_sw=switching frequency. Limits VFD efficiency.' },
    ],
    flashcards:[
      { q:'Why IGBTs preferred over SCRs for VFDs?', a:'IGBTs can be turned ON and OFF by gate signal (fully controllable). SCRs require external commutation to turn off.' },
    ]
  },
  { id:'elec3_ep', icon:'🚢', title:'Electric Propulsion',
    desc:'Diesel-electric, pod drives, shaft generators, energy storage, fuel cells, hybrid systems, power management',
    formulas:[
      { label:"Propulsion Power Requirement", eq:"P_brake ≈ R_T × V / η_propulsive   [W]", note:'η_propulsive ≈ 0.6–0.7 for typical ships. Higher for electric propulsion (no gearbox losses).' },
    ],
    flashcards:[
      { q:'Advantage of electric propulsion for cruise ships?', a:'Flexible deck layout (no shaft line), better fuel efficiency at variable speeds (load follows need), lower noise and vibration, redundancy.' },
    ]
  },
  { id:'elec3_scada', icon:'🖥️', title:'SCADA & Integrated Automation',
    desc:'SCADA architecture, alarm management, historian, OPC protocols, integrated bridge/ER automation',
    formulas:[],
    flashcards:[
      { q:'SCADA stands for?', a:'Supervisory Control And Data Acquisition — monitors and controls industrial processes. In ships: engine monitoring, alarm systems, condition monitoring.' },
    ]
  },
]);

setChapters('bt_sea_maint','🔧','Ship Maintenance Planning',
  'Planned maintenance system (PMS), class surveys, condition monitoring, defect management','Sem 6',[
  { id:'maint_pms', icon:'📋', title:'Planned Maintenance System (PMS)',
    desc:'PMS structure, job cards, maintenance schedules (hours/calendar), history records, defect reporting',
    formulas:[],
    flashcards:[
      { q:'What is condition-based maintenance (CBM)?', a:'Maintenance based on actual equipment condition (via vibration/oil analysis/thermography) rather than fixed hours/calendar intervals.' },
      { q:'MAPOD — what is it?', a:'Maintenance, Administrative and Purchasing of Data — a common PMS software. Records maintenance history, spares, certificates, class items.' },
    ]
  },
  { id:'maint_class', icon:'📋', title:'Classification Surveys & Compliance',
    desc:'Continuous Survey Machinery (CSM), annual/intermediate/renewal surveys, condition monitoring alternatives',
    formulas:[],
    flashcards:[
      { q:'What is a Class Machinery Survey?', a:'Periodical inspection by Classification Society surveyor of main engine, aux machinery, electrical systems. Every 5 years for Special Survey.' },
      { q:'Continuous Survey Machinery (CSM)?', a:'Items are surveyed on a rolling 5-year cycle so that no major shutdown is required. Must be Class approved.' },
    ]
  },
  { id:'maint_defect', icon:'🔍', title:'Defect Management & Root Cause Analysis',
    desc:'Defect reporting, FRACAS, 5-Why analysis, fishbone diagram, corrective/preventive actions, NCR process',
    formulas:[],
    flashcards:[
      { q:'5-Why method purpose?', a:'Root cause analysis technique: repeatedly ask "why?" (typically 5 times) until the root cause of a defect/failure is identified.' },
    ]
  },
]);

/* ═══════════════════════════════════════════════════════════════════════════
   NEW GANPAT UNIVERSITY SUBJECTS — Chapter data
   ═══════════════════════════════════════════════════════════════════════════ */

setChapters('bt_mechengg','🔧','Basic Mechanical Engineering',
  'Thermodynamic concepts, IC engines, boilers, power transmission, material science','Sem 1',[
  { id:'me_thermo_concepts', icon:'🌡️', title:'Thermodynamic Concepts',
    desc:'System, boundary, surroundings, properties, state, process, cycle, zeroth law, first law, work & heat',
    formulas:[
      { label:'First Law (Closed)', eq:'Q − W = ΔU', note:'Energy conservation for closed systems' },
    ]
  },
  { id:'me_second_law', icon:'🔄', title:'Second Law & Entropy',
    desc:'Kelvin-Planck & Clausius statements, reversibility, Carnot cycle, entropy, T-s diagrams' },
  { id:'me_ic_engines', icon:'⚙️', title:'IC Engines',
    desc:'Otto & diesel cycles, 2-stroke vs 4-stroke, valve timing, performance parameters, IC engine components' },
  { id:'me_boilers', icon:'🔥', title:'Boilers & Steam Generators',
    desc:'Fire-tube & water-tube boilers, boiler mountings & accessories, draught, boiler efficiency' },
  { id:'me_power_trans', icon:'⚡', title:'Power Transmission Elements',
    desc:'Belts, chains, gears, clutches, brakes, dynamometers — mechanical power transfer systems' },
  { id:'me_materials', icon:'🔩', title:'Material Science Basics',
    desc:'Mechanical properties, stress-strain, hardness, impact, fatigue, creep, material testing' },
]);

setChapters('bt_envsc','🌍','Environmental Science & Sustainability',
  'Ecosystems, natural resources, biodiversity, pollution, marine environment','Sem 2',[
  { id:'env_ecosystems', icon:'🌿', title:'Ecosystems & Ecology',
    desc:'Types of ecosystems, food chains, energy flow, ecological pyramids, ecological succession' },
  { id:'env_resources', icon:'🌊', title:'Natural Resources',
    desc:'Renewable & non-renewable resources, water resources, mineral resources, forest resources' },
  { id:'env_biodiversity', icon:'🐟', title:'Biodiversity & Conservation',
    desc:'Levels of biodiversity, threats, conservation strategies, endangered species, marine biodiversity' },
  { id:'env_pollution', icon:'🏭', title:'Environmental Pollution',
    desc:'Air, water, soil, noise pollution — sources, effects, control measures, standards' },
  { id:'env_social', icon:'👥', title:'Social Issues & Marine Environment',
    desc:'Climate change, ozone depletion, acid rain, marine pollution, IMO environmental regulations' },
]);

setChapters('bt_commskills','📝','Communication Skills / Professional English',
  'Technical writing, grammar, presentation skills, group discussion, interview preparation','Sem 2',[
  { id:'comm_fundamentals', icon:'💬', title:'Fundamentals of Communication',
    desc:'Communication process, types, barriers, effective communication, verbal & non-verbal' },
  { id:'comm_writing', icon:'✍️', title:'Technical Writing',
    desc:'Report writing, letter writing, email etiquette, minutes of meeting, log book entries' },
  { id:'comm_grammar', icon:'📖', title:'Grammar & Vocabulary',
    desc:'Sentence structure, tenses, voice, common errors, technical vocabulary, maritime terminology' },
  { id:'comm_presentation', icon:'🎤', title:'Presentation & Public Speaking',
    desc:'Preparing presentations, visual aids, body language, overcoming stage fright, audience engagement' },
  { id:'comm_gd_interview', icon:'👔', title:'Group Discussion & Interview Skills',
    desc:'GD techniques, JAM sessions, mock interviews, HR questions, resume writing, professional etiquette' },
]);

setChapters('bt_marine_intro','⚓','Introduction to Marine Engineering',
  'History of shipping, ship terminology, marine engineering overview, classification societies, IMO','Sem 2',[
  { id:'mi_history', icon:'🚢', title:'History of Shipping & Navigation',
    desc:'Evolution of ships, sail to steam to diesel, major shipping routes, maritime milestones' },
  { id:'mi_terminology', icon:'📖', title:'Ship Terminology & Types',
    desc:'Hull, bow, stern, port, starboard, draft, freeboard, ship types — bulk carrier, tanker, container, LNG' },
  { id:'mi_overview', icon:'⚙️', title:'Marine Engineering Systems Overview',
    desc:'Main engine, auxiliary systems, electrical plant, deck machinery, steering gear — overview of shipboard engineering' },
  { id:'mi_class', icon:'🏛️', title:'Classification Societies & Surveys',
    desc:'IACS members (LR, DNV, ABS, BV, ClassNK), class surveys, statutory surveys, hull & machinery certificates' },
  { id:'mi_imo', icon:'🌍', title:'IMO & Maritime Regulations',
    desc:'IMO structure, SOLAS, MARPOL, STCW, MLC — international maritime regulatory framework' },
  { id:'mi_career', icon:'🎯', title:'Career in Marine Engineering',
    desc:'Ranks, promotions, COC exams, sea service requirements, shore-based careers, salary structure' },
]);

setChapters('bt_maths3','📈','Mathematics – III (Numerical Methods & Statistics)',
  'Numerical solutions, interpolation, differentiation, integration, probability, statistics','Sem 3',[
  { id:'m3_algebraic', icon:'🔢', title:'Numerical Solutions of Algebraic Equations',
    desc:'Bisection method, Newton-Raphson, Regula-Falsi, secant method, convergence criteria' },
  { id:'m3_interpolation', icon:'📊', title:'Interpolation',
    desc:'Newton forward/backward, Lagrange, divided differences, spline interpolation' },
  { id:'m3_numdiff', icon:'📈', title:'Numerical Differentiation & Integration',
    desc:'Finite differences, trapezoidal rule, Simpson\'s 1/3 & 3/8 rules, Gaussian quadrature' },
  { id:'m3_ode', icon:'🔁', title:'Numerical Solution of ODE',
    desc:'Euler method, modified Euler, Runge-Kutta (RK4), predictor-corrector methods' },
  { id:'m3_probability', icon:'🎲', title:'Probability & Distributions',
    desc:'Probability axioms, Bayes theorem, binomial, Poisson, normal distribution, central limit theorem' },
  { id:'m3_statistics', icon:'📉', title:'Statistics & Regression',
    desc:'Mean, median, mode, variance, correlation, regression analysis, curve fitting, least squares' },
]);

setChapters('bt_sem3lab','🧪','Semester 3 Laboratory & Workshop',
  'Thermodynamics lab, fluid mechanics lab, pipe fitting, valve assembly, marine fitting','Sem 3',[
  { id:'lab3_thermo', icon:'🌡️', title:'Thermodynamics Lab Experiments',
    desc:'Bomb calorimeter, boiler efficiency test, steam properties verification, heat transfer experiments' },
  { id:'lab3_fluid', icon:'💧', title:'Fluid Mechanics Lab',
    desc:'Bernoulli theorem verification, Reynolds number experiment, metacentric height, pipe friction' },
  { id:'lab3_workshop', icon:'🔧', title:'Marine Workshop Practices',
    desc:'Pipe fitting, valve assembly, gasket making, flange alignment, basic marine fitting operations' },
]);

setChapters('bt_boilers','🔥','Marine Boilers & Steam Engineering',
  'Steam generation, fire-tube & water-tube boilers, mountings, water treatment, combustion, IGS','Sem 4',[
  { id:'boil_steam_gen', icon:'💨', title:'Steam Generation Principles',
    desc:'Properties of steam, steam formation, superheated steam, dryness fraction, steam tables, T-s & h-s diagrams' },
  { id:'boil_firetube', icon:'🔥', title:'Fire-Tube Boilers',
    desc:'Scotch marine boiler, economic boiler, Cochran boiler, Lancashire boiler — construction, working, advantages' },
  { id:'boil_watertube', icon:'💧', title:'Water-Tube Boilers',
    desc:'D-type, header type, Babcock-Wilcox — construction, working, comparison with fire-tube, marine applications' },
  { id:'boil_mountings', icon:'🔧', title:'Boiler Mountings & Accessories',
    desc:'Safety valve, pressure gauge, water level indicator, feed check valve, blow down, fusible plug, economiser, superheater, air preheater' },
  { id:'boil_water_treat', icon:'🧪', title:'Boiler Water Treatment',
    desc:'Internal & external treatment, pH control, TDS, phosphate dosing, hydrazine, condensate polishing' },
  { id:'boil_combustion', icon:'🌡️', title:'Combustion & Fuel Systems',
    desc:'Combustion theory, air-fuel ratio, excess air, oil burners, atomisation, flame detection, combustion control' },
  { id:'boil_operation', icon:'⚙️', title:'Boiler Operation & Safety',
    desc:'Start-up, shut-down, blow-down, gauge glass maintenance, safety valves, boiler emergency procedures' },
  { id:'boil_maintenance', icon:'🔩', title:'Boiler Maintenance & Inspection',
    desc:'Tube cleaning, refractory repair, stay bolt inspection, hydraulic test, class survey requirements' },
  { id:'boil_igs', icon:'🛡️', title:'Inert Gas Systems (IGS)',
    desc:'Flue gas system, nitrogen generators, IG distribution, scrubber, deck seal, pressure/vacuum breaker' },
]);

setChapters('bt_thermo_app','🌡️','Applied Thermodynamics (Power Engineering)',
  'Steam nozzles, turbines, condensers, gas turbines, compressors, refrigeration, psychrometry','Sem 4',[
  { id:'tapp_nozzles', icon:'💨', title:'Steam Nozzles',
    desc:'Convergent & convergent-divergent nozzles, critical pressure ratio, nozzle efficiency, supersaturation' },
  { id:'tapp_turbines', icon:'⚙️', title:'Steam Turbines',
    desc:'Impulse & reaction turbines, velocity diagrams, De Laval, Parsons, compounding, governing, losses' },
  { id:'tapp_condensers', icon:'❄️', title:'Condensers & Cooling',
    desc:'Surface & jet condensers, condenser vacuum, cooling water systems, air ejectors, condensate extraction' },
  { id:'tapp_gas_turbines', icon:'🔥', title:'Gas Turbines',
    desc:'Open & closed cycles, Brayton cycle, regeneration, intercooling, reheat, marine gas turbine applications' },
  { id:'tapp_compressors_recip', icon:'💨', title:'Reciprocating Air Compressors',
    desc:'Single & multi-stage compression, volumetric efficiency, intercooling, indicator diagrams, clearance volume' },
  { id:'tapp_compressors_rotary', icon:'🔄', title:'Rotary Compressors',
    desc:'Centrifugal, axial, screw compressors, turbocharger compressor, surge, choking' },
  { id:'tapp_refrig', icon:'❄️', title:'Refrigeration Cycles',
    desc:'Vapour compression cycle, COP, refrigerants, components, marine provision & cargo refrigeration' },
  { id:'tapp_psychrometry', icon:'🌡️', title:'Psychrometry & Air Conditioning',
    desc:'Dry/wet bulb temperature, relative humidity, psychrometric chart, sensible & latent heat, HVAC on ships' },
]);

setChapters('bt_manuf','🔧','Manufacturing Processes & Marine Workshop Technology',
  'Casting, welding, forming, machining, CNC, fitting & piping, marine machine tools','Sem 4',[
  { id:'man_casting', icon:'🔥', title:'Casting Processes',
    desc:'Sand casting, die casting, centrifugal casting, investment casting, defects & inspection, marine castings' },
  { id:'man_welding', icon:'⚡', title:'Welding Technology',
    desc:'MMA, MIG, TIG, submerged arc, gas welding, welding defects, weld testing, welding on ships, IMO requirements' },
  { id:'man_forming', icon:'🔨', title:'Metal Forming Processes',
    desc:'Rolling, forging, extrusion, drawing, sheet metal operations, press work — ship manufacturing applications' },
  { id:'man_machining', icon:'⚙️', title:'Machining Processes',
    desc:'Turning, drilling, milling, grinding, boring, broaching — cutting parameters, tool materials, cutting fluids' },
  { id:'man_cnc', icon:'🖥️', title:'CNC Machining & Automation',
    desc:'CNC principles, G-codes, M-codes, CNC lathe & mill, CAM software, workshop automation' },
  { id:'man_piping', icon:'🔧', title:'Fitting & Piping on Ships',
    desc:'Pipe materials, pipe joining, flange types, gaskets, valves, pipe fabrication, pressure testing, marine pipe systems' },
]);

setChapters('bt_kinematics','⚙️','Mechanics of Machines / Kinematics & Dynamics',
  'Mechanisms, velocity & acceleration, cams, gears, governors, flywheel, balancing, vibrations','Sem 4',[
  { id:'kin_mechanisms', icon:'🔗', title:'Mechanisms & Linkages',
    desc:'Kinematic chains, four-bar mechanism, slider-crank, quick return, Grashof criterion, degree of freedom' },
  { id:'kin_vel_acc', icon:'📊', title:'Velocity & Acceleration Analysis',
    desc:'Graphical methods, velocity & acceleration diagrams, Coriolis acceleration, Kennedy theorem' },
  { id:'kin_cams', icon:'📐', title:'Cams & Followers',
    desc:'Cam types, follower types, cam profile construction, uniform velocity, SHM, uniform acceleration' },
  { id:'kin_gears', icon:'⚙️', title:'Gears & Gear Trains',
    desc:'Spur, helical, bevel gears, gear terminology, law of gearing, involute profile, epicyclic gear trains' },
  { id:'kin_governors', icon:'🎛️', title:'Governors',
    desc:'Watt, Porter, Proell, Hartnell governors, sensitiveness, stability, isochronism, hunting, marine engine governors' },
  { id:'kin_flywheel', icon:'🔄', title:'Flywheel & Turning Moment',
    desc:'Turning moment diagrams, fluctuation of energy, coefficient of fluctuation, flywheel design for engines' },
  { id:'kin_balancing', icon:'⚖️', title:'Balancing of Rotating & Reciprocating Parts',
    desc:'Static & dynamic balancing, balancing of single & multi-cylinder engines, secondary forces, crankshaft balancing' },
  { id:'kin_vibrations', icon:'📳', title:'Vibrations',
    desc:'Free, forced, damped vibrations, natural frequency, critical speed, vibration isolation, shipboard vibration analysis' },
]);

setChapters('bt_electronics','📡','Marine Electronics & Communication',
  'Semiconductor devices, digital electronics, sensors, communication systems, GMDSS','Sem 5',[
  { id:'elec_semiconductor', icon:'💡', title:'Semiconductor Devices',
    desc:'Diodes, transistors, FET, MOSFET, thyristors — characteristics, applications in marine electronics' },
  { id:'elec_rectifiers', icon:'⚡', title:'Rectifiers & Power Supplies',
    desc:'Half-wave, full-wave, bridge rectifiers, filters, voltage regulators, switched-mode power supplies' },
  { id:'elec_amplifiers', icon:'🔊', title:'Amplifiers & Op-Amps',
    desc:'Transistor amplifiers, operational amplifier basics, comparator, integrator, differentiator circuits' },
  { id:'elec_digital', icon:'🖥️', title:'Digital Electronics',
    desc:'Logic gates, Boolean algebra, combinational circuits, flip-flops, counters, shift registers, A/D & D/A converters' },
  { id:'elec_sensors', icon:'📡', title:'Sensors & Transducers',
    desc:'Temperature, pressure, flow, level, speed sensors — RTD, thermocouple, LVDT, strain gauge, proximity sensors' },
  { id:'elec_comms', icon:'📻', title:'Communication Systems & GMDSS',
    desc:'AM, FM, digital modulation, VHF, MF/HF, INMARSAT, GMDSS equipment, SART, EPIRB, DSC, NAVTEX' },
  { id:'elec_radar', icon:'📡', title:'Radar & ECDIS',
    desc:'Radar principles, marine radar, ARPA, AIS, ECDIS, navigational aids — electronic navigation systems' },
]);

setChapters('bt_medraw','✏️','Marine Engineering Drawing',
  'Drawing standards, engine components, valves, piping diagrams, boiler drawings, CAD','Sem 5',[
  { id:'med_standards', icon:'📏', title:'Drawing Standards & Conventions',
    desc:'BIS/ISO standards, line types, dimensioning, tolerances, surface finish symbols, marine drawing conventions' },
  { id:'med_engine', icon:'⚙️', title:'Engine Component Drawing',
    desc:'Piston, piston rod, crosshead, connecting rod, crankshaft, cylinder liner, cylinder head — detailed drawings' },
  { id:'med_valves', icon:'🔧', title:'Valve Drawings',
    desc:'Globe, gate, butterfly, ball, check, relief valves — sectional views, assembly drawings' },
  { id:'med_piping', icon:'🔩', title:'Piping Diagrams & Schematics',
    desc:'P&ID symbols, piping layouts, fuel oil system, cooling water system, bilge system — schematic drawing' },
  { id:'med_boiler', icon:'🔥', title:'Boiler & Heat Exchanger Drawings',
    desc:'Boiler section views, tube arrangement, safety valve, plate-type & shell-tube heat exchanger drawings' },
  { id:'med_cad', icon:'🖥️', title:'CAD Introduction',
    desc:'AutoCAD/SolidWorks basics, 2D drafting, 3D modelling introduction, marine engineering CAD applications' },
]);

setChapters('bt_elecpower','⚡','Marine Electrical Power Systems',
  'Ship power plant, switchboard, generator paralleling, protection, emergency power, HV','Sem 6',[
  { id:'ep_power_plant', icon:'🏭', title:'Ship Electrical Power Plant',
    desc:'Generator selection, power balance, load analysis, prime mover types, voltage & frequency selection, ship service generators' },
  { id:'ep_switchboard', icon:'🔌', title:'Switchboard & Distribution',
    desc:'Main switchboard construction, bus bars, circuit breakers, ACB, MCCB, fuses, distribution panels, shore connection' },
  { id:'ep_paralleling', icon:'🔄', title:'Generator Paralleling',
    desc:'Conditions for paralleling, synchroscope, auto-synchroniser, load sharing, droop control, preferential tripping, blackout recovery' },
  { id:'ep_protection', icon:'🛡️', title:'Protection Devices',
    desc:'Overcurrent, earth fault (insulation monitoring), short circuit, reverse power, under-voltage protection, selectivity, discrimination' },
  { id:'ep_motors', icon:'⚙️', title:'Motor Control & Starting',
    desc:'DOL, star-delta, auto-transformer, soft starter, VFD drives, motor protection, motor maintenance on ships' },
  { id:'ep_emergency', icon:'🆘', title:'Emergency Power Systems',
    desc:'Emergency generator, emergency switchboard, UPS, batteries, SOLAS requirements, automatic start, testing' },
  { id:'ep_lighting', icon:'💡', title:'Lighting & Battery Systems',
    desc:'Lighting types (LED, fluorescent, navigation lights), emergency lighting, battery charging, battery maintenance' },
  { id:'ep_hv', icon:'⚡', title:'High Voltage on Ships',
    desc:'3.3kV / 6.6kV / 11kV systems, HV switchgear, HV safety, electric propulsion power, shore power at HV' },
  { id:'ep_surveys', icon:'📋', title:'Electrical Surveys & Testing',
    desc:'Insulation resistance testing, continuity, earth fault finding, megger, PAT testing, class electrical survey' },
]);

setChapters('bt_safety','🛡️','Marine Safety & Fire Engineering',
  'SOLAS, fire science, detection, fire-fighting systems, LSA, emergency procedures, ISM','Sem 6',[
  { id:'sf_solas', icon:'📜', title:'SOLAS Convention Overview',
    desc:'SOLAS chapters, certificates, surveys, flag state & port state responsibilities, ISM integration' },
  { id:'sf_fire_science', icon:'🔥', title:'Fire Science & Classification',
    desc:'Fire triangle/tetrahedron, fire classes (A–F), heat transfer modes, fire behaviour, fire spread mechanisms' },
  { id:'sf_detection', icon:'📡', title:'Fire Detection Systems',
    desc:'Smoke detectors (ionisation, optical), heat detectors, flame detectors, fire alarm systems, zone monitoring' },
  { id:'sf_fixed', icon:'⚙️', title:'Fixed Fire-Fighting Systems',
    desc:'CO₂ system, water mist, foam systems (hi-expansion, lo-expansion), dry chemical, halon alternatives, sprinkler systems' },
  { id:'sf_portable', icon:'🧯', title:'Portable Fire-Fighting Equipment',
    desc:'Extinguisher types, fire hoses, nozzles, fire suits, SCBA, emergency escape breathing devices' },
  { id:'sf_structural', icon:'🏗️', title:'Structural Fire Protection',
    desc:'A-class, B-class divisions, fire zones, insulation, fire doors, fire dampers, smoke barriers, fire plans' },
  { id:'sf_lsa', icon:'🛟', title:'Life-Saving Appliances',
    desc:'Lifeboats, life rafts, rescue boats, life jackets, immersion suits, visual signals, SART, EPIRB, MOB systems' },
  { id:'sf_emergency', icon:'🆘', title:'Emergency Procedures',
    desc:'Fire drills, abandon ship, MOB, enclosed space entry, flooding, collision, grounding emergency response' },
  { id:'sf_ism', icon:'📋', title:'ISM Code & Safety Management',
    desc:'ISM 12 elements, DPA, safety management system, audits, DOC, SMC, non-conformity reporting, continuous improvement' },
]);

setChapters('bt_machdesign','🔩','Machine Design for Marine Application',
  'Design of shafts, keys, bolts, welds, springs, bearings, gears for marine components','Sem 6',[
  { id:'md_philosophy', icon:'📐', title:'Design Philosophy & Basics',
    desc:'Factor of safety, design stresses, material selection, standard specifications, marine design considerations' },
  { id:'md_shafts', icon:'⚙️', title:'Design of Shafts',
    desc:'Torsion, bending, combined loading, ASME shaft design formula, keyways, propeller shaft, intermediate shaft' },
  { id:'md_keys', icon:'🔑', title:'Design of Keys & Couplings',
    desc:'Key types, key design, flange coupling, flexible coupling, marine propulsion couplings' },
  { id:'md_bolts', icon:'🔩', title:'Design of Bolted Joints',
    desc:'Bolt strength, pre-load, gasket joints, cylinder head bolting, flange bolting, torque specifications' },
  { id:'md_welds', icon:'⚡', title:'Design of Welded Joints',
    desc:'Weld types, weld strength calculations, fillet & butt weld design, welded structures for marine use' },
  { id:'md_springs', icon:'🔄', title:'Spring Design',
    desc:'Helical springs, leaf springs, spring rate, Wahl factor, spring material, vibration isolation springs' },
  { id:'md_bearings', icon:'🔧', title:'Bearing Selection & Design',
    desc:'Journal bearings, ball/roller bearings, load capacity, life calculation, stern tube bearings, thrust bearings' },
  { id:'md_gears', icon:'⚙️', title:'Gear Design',
    desc:'Spur gear design, helical gear strength, Lewis equation, Buckingham equation, marine reduction gears' },
]);

setChapters('bt_pollution','🌍','Marine Pollution Prevention & Environmental Management',
  'MARPOL Annex I–VI, ballast water management, anti-fouling, ship recycling','Sem 7',[
  { id:'poll_overview', icon:'📜', title:'MARPOL Convention Overview',
    desc:'History, structure, 6 annexes, protocol, amendments, enforcement mechanisms, flag & port state role' },
  { id:'poll_annex1', icon:'🛢️', title:'MARPOL Annex I — Oil Pollution',
    desc:'OWS, oil content monitor, IOPP certificate, ORB, oil record keeping, special areas, SOPEP, crude oil washing' },
  { id:'poll_annex2', icon:'🧪', title:'MARPOL Annex II — Noxious Liquid Substances',
    desc:'NLS categories, P&A manual, pre-wash, cargo tank cleaning, discharge criteria, chemical tanker operations' },
  { id:'poll_annex3_5', icon:'📦', title:'MARPOL Annex III, IV & V',
    desc:'Harmful substances in packaged form, sewage treatment, garbage management, special areas, record keeping' },
  { id:'poll_annex6', icon:'💨', title:'MARPOL Annex VI — Air Pollution',
    desc:'SOx, NOx, ODS, VOC regulations, EEDI/EEXI/CII, SEEMP, tier requirements, compliance methods' },
  { id:'poll_ballast', icon:'🌊', title:'Ballast Water Management',
    desc:'BWM convention, D-1 & D-2 standards, BWTS types (UV, electrochlorination), testing, record keeping' },
  { id:'poll_antifouling', icon:'🚢', title:'Anti-Fouling & Ship Recycling',
    desc:'AFS convention, TBT ban, approved coatings, Hong Kong convention, ship recycling regulations, IHM' },
]);

setChapters('bt_advelec','⚡','Advanced Marine Electrical Systems',
  'Power electronics, VFD, electric propulsion, shaft generators, dynamic positioning, condition monitoring','Sem 7',[
  { id:'ael_power_elec', icon:'💡', title:'Power Electronics Fundamentals',
    desc:'Thyristor, IGBT, MOSFET, switching characteristics, heat sinks, power electronic circuits' },
  { id:'ael_rectifiers', icon:'🔌', title:'Rectifiers & Inverters',
    desc:'Controlled rectifiers, PWM inverters, harmonic filtering, UPS systems, regenerative drives' },
  { id:'ael_vfd', icon:'🎛️', title:'Variable Frequency Drives (VFD)',
    desc:'VFD principles, V/f control, vector control, VFD for pumps/fans/compressors, energy savings, harmonics' },
  { id:'ael_shaft', icon:'⚙️', title:'Shaft Generators & Motors',
    desc:'Shaft generator systems, power take-off, power take-in, frequency converters, hybrid operation' },
  { id:'ael_dp', icon:'📡', title:'Dynamic Positioning Systems',
    desc:'DP class 1/2/3, thruster systems, position reference systems, DP control, failure mode analysis' },
  { id:'ael_eprop', icon:'🚢', title:'Electric Propulsion Systems',
    desc:'Diesel-electric, LNG-electric, Azipod, podded propulsion, hybrid propulsion, battery systems' },
  { id:'ael_condition', icon:'📊', title:'Electrical Condition Monitoring',
    desc:'Motor current analysis, partial discharge testing, thermal imaging, online insulation monitoring' },
]);

setChapters('bt_shipops','📜','Ship Operation & Management',
  'Maritime law, ISM, ISPS, MLC, cargo ops, bunkering, PMS, commercial operations, dry dock','Sem 7',[
  { id:'sop_law', icon:'⚖️', title:'Maritime Law Basics',
    desc:'Admiralty law, flag state duties, port state control, maritime conventions, maritime claims, arrest of ships' },
  { id:'sop_ism', icon:'📋', title:'ISM Code Implementation',
    desc:'Safety management system, DPA role, internal audits, management reviews, non-conformity reporting' },
  { id:'sop_isps', icon:'🛡️', title:'ISPS Code & Security',
    desc:'Ship security assessment, SSP, SSAS, security levels, CSO/SSO roles, port facility security' },
  { id:'sop_mlc', icon:'👷', title:'Maritime Labour Convention (MLC) 2006',
    desc:'Seafarer rights, employment agreements, hours of rest, wages, accommodation, health & safety, complaints' },
  { id:'sop_cargo', icon:'📦', title:'Cargo Operations',
    desc:'Cargo types, loading/discharging, cargo securing manual, cargo documentation, dangerous goods (IMDG code)' },
  { id:'sop_bunker', icon:'⛽', title:'Bunkering Operations',
    desc:'Bunkering procedures, BDN, fuel sampling, quantity measurement, SOPEP, safety precautions, fuel changeover' },
  { id:'sop_pms', icon:'🔧', title:'Planned Maintenance System',
    desc:'PMS software (AMOS, MESPAS), class survey requirements, job planning, spare parts management, dry dock planning' },
  { id:'sop_commercial', icon:'💰', title:'Maritime Commercial Operations',
    desc:'Charter parties, freight rates, port charges, P&I clubs, H&M insurance, BIMCO clauses, lay time' },
  { id:'sop_drydock', icon:'🏭', title:'Dry Dock Management',
    desc:'Dry dock specification, repair list, class requirements, hull treatment, propeller inspection, sea trials' },
]);

setChapters('bt_elective1','🎓','Elective – I',
  'CFD for Marine Applications or Marine Refrigeration & HVAC','Sem 7',[
  { id:'el1_cfd_intro', icon:'💻', title:'CFD Introduction & Marine Applications',
    desc:'CFD fundamentals, meshing, boundary conditions, turbulence models, flow around hull forms, propeller analysis' },
  { id:'el1_refrig_hvac', icon:'❄️', title:'Marine Refrigeration & HVAC Systems',
    desc:'Provision plant, cargo refrigeration, CO₂ & NH₃ systems, HVAC design, air handling units, duct systems' },
]);

setChapters('bt_project1','📋','Project – I / Seminar / Industrial Training',
  'Seminar presentation, industrial training, project initiation','Sem 7',[
  { id:'p1_seminar', icon:'🎤', title:'Seminar & Technical Presentation',
    desc:'Topic selection, literature survey, presentation preparation, Q&A skills, technical report writing' },
  { id:'p1_industrial', icon:'🏭', title:'Industrial Training',
    desc:'Shipyard visit, shipping company visit, training diary, industrial exposure, practical observations' },
  { id:'p1_project_init', icon:'📝', title:'Project Initiation',
    desc:'Problem identification, literature review, methodology planning, project timeline, milestones' },
]);

setChapters('bt_ers','🚢','Marine Engine Room Simulator (ERS)',
  'Plant familiarization, ME operation, auxiliary systems, generator ops, emergency scenarios','Sem 8',[
  { id:'ers_familiarization', icon:'🖥️', title:'Plant Familiarization',
    desc:'Simulator layout, system identification, parameter reading, alarm systems, control stations' },
  { id:'ers_me_operation', icon:'⚙️', title:'Main Engine Operation',
    desc:'Pre-start checks, starting, manoeuvring, UMS mode, fuel changeover, load variations, shut-down' },
  { id:'ers_auxiliary', icon:'🔧', title:'Auxiliary Systems Operation',
    desc:'Boiler operation, purifier operation, FWG operation, compressor operation, cooling systems management' },
  { id:'ers_generator', icon:'⚡', title:'Generator Operations',
    desc:'Generator start-up, paralleling, load sharing, preferential tripping, blackout recovery, shore connection' },
  { id:'ers_emergency', icon:'🆘', title:'Emergency Scenarios',
    desc:'Blackout, fire, flooding, ME failure, steering failure, OWS malfunction — emergency response procedures' },
  { id:'ers_watchkeeping', icon:'📋', title:'Watch-Keeping Duties',
    desc:'Rounds, parameter logging, handover, communication with bridge, alarm response, rest hour compliance' },
]);

setChapters('bt_competency','📋','Marine Engineering Competency & Oral Preparation',
  'STCW competencies, MEO Class IV review, oral examination prep, practical assessments','Sem 8',[
  { id:'comp_stcw', icon:'📜', title:'STCW Convention & Competencies',
    desc:'STCW tables, competency standards, knowledge/understanding/proficiency requirements, certification' },
  { id:'comp_meo4', icon:'📝', title:'MEO Class IV Syllabus Review',
    desc:'EKG, EKM, Electrotechnology — complete syllabus review, important topics, exam pattern, marking scheme' },
  { id:'comp_oral', icon:'🎤', title:'Oral Examination Preparation',
    desc:'Common oral questions, examiner expectations, practical knowledge demonstration, confidence building' },
  { id:'comp_practical', icon:'🔧', title:'Practical Assessments',
    desc:'Workshop competencies, machinery identification, safety equipment demonstration, watchkeeping assessment' },
  { id:'comp_docs', icon:'📋', title:'Documentation & Certification',
    desc:'COC application, sea service certificates, medical fitness, STCW endorsements, CDC, passport requirements' },
]);

// ═══════════════════════════════════════════════════════════════════
//  NEW GANPAT UNIVERSITY OFFICIAL SUBJECTS — setChapters() calls
// ═══════════════════════════════════════════════════════════════════

/* ── Semester 1: Elements of Civil Engineering ── */
setChapters('bt_civil','🏗️','Elements of Civil Engineering',
  'Surveying, building materials, construction practices, water supply & sanitation','Sem 1',[
  { id:'civil_survey', icon:'📐', title:'Surveying & Measurement',
    desc:'Surveying instruments, leveling, contouring, chain surveying, plane table surveying, compass surveying' },
  { id:'civil_materials', icon:'🧱', title:'Building Materials',
    desc:'Cement (OPC, PPC), aggregates, concrete mix design, bricks, timber, steel, polymers, composite materials' },
  { id:'civil_construction', icon:'🏗️', title:'Construction Practices',
    desc:'Foundation types, masonry, RCC construction, formwork, curing, construction site management' },
  { id:'civil_water', icon:'💧', title:'Water Supply & Sanitation',
    desc:'Water treatment processes, distribution systems, sewage treatment, environmental engineering basics' },
  { id:'civil_transport', icon:'🛣️', title:'Transportation Engineering',
    desc:'Road geometry, pavement types, highway materials, traffic engineering basics, railway engineering intro' },
]);

/* ── Semester 2: Computer Aided Drawing ── */
setChapters('bt_cad','✏️','Computer Aided Drawing',
  'AutoCAD fundamentals, 2D drafting, dimensioning, layers, 3D modeling introduction','Sem 2',[
  { id:'cad_basics', icon:'🖥️', title:'AutoCAD Fundamentals',
    desc:'Interface, coordinate systems, drawing setup, basic drawing commands (line, circle, arc, rectangle)' },
  { id:'cad_2d', icon:'📐', title:'2D Drafting Commands',
    desc:'Edit commands (trim, extend, offset, mirror, array), polylines, hatching, block creation' },
  { id:'cad_dimension', icon:'📏', title:'Dimensioning & Annotation',
    desc:'Linear, angular, radial dimensions, dimension styles, text styles, tolerances, GD&T basics' },
  { id:'cad_3d', icon:'🔲', title:'Introduction to 3D Modeling',
    desc:'3D wireframe, surface modeling, solid modeling basics, extrude, revolve, Boolean operations' },
]);

/* ── Semester 2: Workshop Technology & Practice – II ── */
setChapters('bt_workshop2','🔩','Workshop Technology & Practice – II',
  'Advanced fitting, pipe fitting, welding practice, precision measurement','Sem 2',[
  { id:'ws2_fitting', icon:'🔧', title:'Advanced Fitting Operations',
    desc:'Precision fitting, assembly of components, use of jigs & fixtures, surface finishing techniques' },
  { id:'ws2_pipe', icon:'🔩', title:'Pipe Fitting & Fabrication',
    desc:'Marine pipe materials, flange types, gasket cutting, pipe bending, threading, pipe supports' },
  { id:'ws2_weld', icon:'🔥', title:'Welding Practice (MMA, MIG, TIG)',
    desc:'Arc welding parameters, MIG/MAG setup, TIG welding of stainless steel, weld defect identification' },
  { id:'ws2_measure', icon:'📏', title:'Precision Measurement',
    desc:'Micrometers, vernier calipers, dial indicators, bore gauges, surface roughness measurement' },
]);

/* ── Semester 2: Seamanship & Survival at Sea ── */
setChapters('bt_seamanship','⚓','Seamanship & Survival at Sea',
  'Ship terminology, rope work, survival techniques, STCW basic safety','Sem 2',[
  { id:'sea_terms', icon:'🚢', title:'Ship Terminology & Types',
    desc:'Bow, stern, port, starboard, draft, displacement, tonnage, freeboard, types of merchant ships' },
  { id:'sea_rope', icon:'🪢', title:'Rope Work & Splicing',
    desc:'Types of ropes (natural, synthetic), knots (bowline, clove hitch, reef), splicing, wire rope handling' },
  { id:'sea_anchor', icon:'⚓', title:'Anchoring & Mooring',
    desc:'Anchor types, anchoring procedures, mooring lines, SWL, winch operation, emergency release' },
  { id:'sea_survival', icon:'🛟', title:'Survival Techniques & LSA',
    desc:'Lifeboats, life rafts, immersion suits, EPIRB, SART, pyrotechnics, survival at sea procedures' },
  { id:'sea_stcw', icon:'📋', title:'STCW Basic Safety Training',
    desc:'BST components: fire fighting, personal survival, first aid, personal safety & social responsibility' },
]);

/* ── Semester 3: Ship Structure & Construction ── */
setChapters('bt_shipconstruct','🚢','Ship Structure & Construction',
  'Ship structural members, framing systems, welded joints, bulkheads, surveys','Sem 3',[
  { id:'sc_members', icon:'🔩', title:'Structural Members',
    desc:'Keel (flat plate, duct), frames, beams, stringers, girders, brackets, stiffeners, shell plating' },
  { id:'sc_framing', icon:'🏗️', title:'Framing Systems',
    desc:'Transverse framing, longitudinal framing, combined framing — advantages, applications, comparison' },
  { id:'sc_double', icon:'📦', title:'Double Bottom Construction',
    desc:'Cellular double bottom, solid floor, tank top, margin plate, manholes, uses for fuel/ballast/FW' },
  { id:'sc_bulkheads', icon:'🚪', title:'Bulkheads & Watertight Subdivision',
    desc:'Watertight, non-watertight, collision bulkheads, testing, corrugated vs flat, openings' },
  { id:'sc_welded', icon:'🔥', title:'Welded Joints & Connections',
    desc:'Butt welds, fillet welds, lap welds, welding symbols, distortion control, weld testing' },
  { id:'sc_fore_aft', icon:'🚢', title:'Fore & Aft End Construction',
    desc:'Fore peak, chain locker, bulbous bow, stern frame, rudder arrangement, propeller shaft' },
  { id:'sc_surveys', icon:'📋', title:'Ship Surveys & Classification',
    desc:'Class surveys (annual, intermediate, special), statutory surveys, dry docking surveys' },
]);

/* ── Semester 3: Marine Electro Technology – I ── */
setChapters('bt_metec1','⚡','Marine Electro Technology – I',
  'DC machines — generators & motors, EMF equation, characteristics, speed control','Sem 3',[
  { id:'met1_dc_gen', icon:'⚡', title:'DC Generators',
    desc:'Construction, EMF equation, armature reaction, commutation, characteristics (shunt, series, compound)' },
  { id:'met1_dc_motor', icon:'🔌', title:'DC Motors',
    desc:'Back-EMF, torque equation, speed-torque characteristics, starters (3-point, 4-point), braking' },
  { id:'met1_control', icon:'🎛️', title:'Speed Control of DC Motors',
    desc:'Field control, armature resistance, Ward-Leonard system, applications in marine winches & cranes' },
  { id:'met1_testing', icon:'📊', title:'Testing of DC Machines',
    desc:'Swinburne test, brake test, regenerative test, efficiency calculation, losses in DC machines' },
]);

/* ── Semester 3: General Performance – I ── */
setChapters('bt_gp1','📋','General Performance – I',
  'Workshop practice, engine room familiarization, safety procedures','Sem 3',[
  { id:'gp1_workshop', icon:'🔧', title:'Workshop Practice',
    desc:'Use of hand tools, power tools, drilling, grinding, basic machining operations in marine context' },
  { id:'gp1_er_famil', icon:'🚢', title:'Engine Room Familiarization',
    desc:'Engine room layout, piping colour codes, machinery identification, safety equipment locations' },
  { id:'gp1_safety', icon:'🛡️', title:'Safety Procedures',
    desc:'PPE usage, permit-to-work, lock-out/tag-out, confined space entry, fire extinguisher operation' },
]);

/* ── Semester 4: Marine Electro Technology – II ── */
setChapters('bt_metec2','⚡','Marine Electro Technology – II',
  'Transformers, induction motors, synchronous machines, marine electrical systems','Sem 4',[
  { id:'met2_transformer', icon:'🔌', title:'Transformers (Advanced)',
    desc:'Three-phase transformers, vector groups (Dyn11), parallel operation, cooling methods, on-load tap changer' },
  { id:'met2_induction', icon:'⚙️', title:'Three-Phase Induction Motors',
    desc:'Construction (squirrel cage, wound rotor), rotating magnetic field, slip, torque-speed, starting methods' },
  { id:'met2_sync', icon:'⚡', title:'Synchronous Machines',
    desc:'Alternator construction, EMF equation, voltage regulation, synchronization, parallel operation' },
  { id:'met2_marine', icon:'🚢', title:'Marine Electrical Systems',
    desc:'Shipboard 440V/6.6kV distribution, main & emergency switchboard, shore connection, insulation monitoring' },
]);

/* ── Semester 4: Basic Electronics ── */
setChapters('bt_basicelec','📡','Basic Electronics',
  'Semiconductor devices, rectifiers, amplifiers, digital electronics, sensors','Sem 4',[
  { id:'belec_semi', icon:'📡', title:'Semiconductor Devices',
    desc:'Diodes (p-n junction, Zener), BJT, FET, MOSFET — characteristics, biasing, applications' },
  { id:'belec_rect', icon:'⚡', title:'Rectifiers & Power Supplies',
    desc:'Half-wave, full-wave, bridge rectifiers, filters, voltage regulators (78xx), SMPS basics' },
  { id:'belec_amp', icon:'🔊', title:'Amplifiers',
    desc:'CE, CB, CC configurations, frequency response, operational amplifiers, feedback circuits' },
  { id:'belec_digital', icon:'💻', title:'Digital Electronics',
    desc:'Number systems, logic gates, Boolean algebra, K-maps, flip-flops, counters, registers' },
  { id:'belec_sensors', icon:'📡', title:'Sensors & Transducers',
    desc:'Temperature (RTD, thermocouple), pressure, level, flow sensors, signal conditioning' },
]);

/* ── Semester 4: Mathematics for Marine Engineering ── */
setChapters('bt_mathsmarine','📈','Mathematics for Marine Engineering',
  'Numerical methods, interpolation, numerical ODE, probability, statistics','Sem 4',[
  { id:'mm_numerical', icon:'🔢', title:'Numerical Methods',
    desc:'Bisection, Newton-Raphson, Regula Falsi, secant method — convergence, error analysis' },
  { id:'mm_interp', icon:'📈', title:'Interpolation',
    desc:'Newton forward/backward, Lagrange, divided differences — application to engineering data' },
  { id:'mm_integration', icon:'📊', title:'Numerical Integration & Differentiation',
    desc:'Trapezoidal rule, Simpson 1/3 & 3/8, Gaussian quadrature, numerical differentiation formulae' },
  { id:'mm_ode', icon:'📐', title:'Numerical Solution of ODE',
    desc:'Euler method, modified Euler, Runge-Kutta (4th order), predictor-corrector methods' },
  { id:'mm_prob', icon:'🎲', title:'Probability & Statistics',
    desc:'Probability axioms, Bayes theorem, binomial/Poisson/normal distributions, regression, curve fitting' },
]);

/* ── Semester 4: Theory of Machines ── */
setChapters('bt_tom','⚙️','Theory of Machines',
  'Mechanisms, velocity/acceleration analysis, cams, gears, governors, balancing','Sem 4',[
  { id:'tom_mech', icon:'🔗', title:'Mechanisms & Linkages',
    desc:'Links, kinematic pairs, chains, inversions (slider crank, double slider), Gruebler criterion' },
  { id:'tom_vel', icon:'📐', title:'Velocity & Acceleration Analysis',
    desc:'Instantaneous center method, Kennedy theorem, Klein construction, graphical & analytical methods' },
  { id:'tom_cams', icon:'🔄', title:'Cams & Followers',
    desc:'Cam types, follower types, displacement diagrams, cam profile construction, jump phenomenon' },
  { id:'tom_gears', icon:'⚙️', title:'Gears & Gear Trains',
    desc:'Terminology, law of gearing, involute profile, interference, gear trains (simple, compound, epicyclic)' },
  { id:'tom_gov', icon:'🎛️', title:'Governors & Flywheels',
    desc:'Watt, Porter, Proell, Hartnell governors, stability, sensitivity, flywheel turning moment diagrams' },
  { id:'tom_balance', icon:'⚖️', title:'Balancing',
    desc:'Balancing of rotating masses (single & multiple planes), reciprocating masses, V-engines' },
]);

/* ── Semester 4: General Performance – II ── */
setChapters('bt_gp2','📋','General Performance – II',
  'Engine room watch-keeping practice, machinery operation, maintenance procedures','Sem 4',[
  { id:'gp2_watch', icon:'👁️', title:'Watch-Keeping Practice',
    desc:'Engine room rounds, parameter monitoring, log entries, handover procedures, standing orders' },
  { id:'gp2_machinery', icon:'⚙️', title:'Machinery Operation Drills',
    desc:'Main engine preparation, starting, maneuvering, stopping; auxiliary machinery operation' },
  { id:'gp2_maint', icon:'🔧', title:'Maintenance Procedures',
    desc:'Planned maintenance tasks, gasket replacement, valve overhaul, filter cleaning, pump maintenance' },
]);

/* ── Semester 5: Ship Fire Prevention & Control ── */
setChapters('bt_firecontrol','🔥','Ship Fire Prevention & Control',
  'Fire science, detection, fixed fire-fighting, portable equipment, structural fire protection','Sem 5',[
  { id:'fc_science', icon:'🔥', title:'Fire Science & Classification',
    desc:'Fire triangle, classes of fire (A, B, C, D, E), fire spread mechanisms, flash point, ignition temperature' },
  { id:'fc_detect', icon:'📡', title:'Fire Detection Systems',
    desc:'Smoke detectors (ionization, photoelectric), heat detectors, flame detectors, manual call points' },
  { id:'fc_fixed', icon:'🧯', title:'Fixed Fire-Fighting Systems',
    desc:'CO₂ flooding, foam (high/low expansion), water mist, dry chemical, sprinkler systems, drencher' },
  { id:'fc_portable', icon:'🧯', title:'Portable Equipment',
    desc:'DCP, CO₂, foam extinguishers, fire hose, nozzles, EEBD, fire blankets' },
  { id:'fc_structural', icon:'🏗️', title:'Structural Fire Protection',
    desc:'A, B, C class divisions, fire zones, means of escape, ventilation fire dampers' },
  { id:'fc_lsa', icon:'🛟', title:'Life-Saving Appliances',
    desc:'Lifeboats (enclosed, free-fall), life rafts, rescue boats, life jackets, immersion suits' },
  { id:'fc_emergency', icon:'🚨', title:'Emergency Procedures',
    desc:'Fire drills, abandon ship, man overboard, enclosed space entry, hot work permits, ISM code' },
]);

/* ── Semester 5: Dynamics of Vibration ── */
setChapters('bt_vibration','📳','Dynamics of Vibration',
  'Free, forced, damped vibrations, resonance, torsional vibration, measurement','Sem 5',[
  { id:'vib_free', icon:'📳', title:'Free Vibration',
    desc:'Natural frequency, single DOF systems, springs in series/parallel, equivalent stiffness' },
  { id:'vib_damped', icon:'📉', title:'Damped Vibration',
    desc:'Viscous, Coulomb, structural damping, logarithmic decrement, critical damping, damping ratio' },
  { id:'vib_forced', icon:'📊', title:'Forced Vibration',
    desc:'Harmonic excitation, magnification factor, resonance, vibration isolation, transmissibility' },
  { id:'vib_torsional', icon:'🔄', title:'Torsional Vibration',
    desc:'Torsional natural frequency, critical speed, barred speed range, torsional dampers, shaft vibration' },
  { id:'vib_measure', icon:'📡', title:'Vibration Measurement & Analysis',
    desc:'Accelerometers, velocity transducers, proximity probes, FFT, spectrum analysis, orbit plots' },
]);

/* ── Semester 5: General Performance – III ── */
setChapters('bt_gp3','📋','General Performance – III',
  'Advanced engine room operations, fault diagnosis, emergency drills','Sem 5',[
  { id:'gp3_advanced', icon:'⚙️', title:'Advanced Engine Room Operations',
    desc:'Complex machinery operations, load-dependent operations, fuel changeover, boiler operation' },
  { id:'gp3_fault', icon:'🔍', title:'Fault Diagnosis Exercises',
    desc:'Troubleshooting scenarios, indicator diagram interpretation, alarm response, systematic fault finding' },
  { id:'gp3_emergency', icon:'🚨', title:'Emergency Drills',
    desc:'Blackout recovery, fire response, flooding, steering failure, man overboard, grounding response' },
]);

/* ── Semester 6: Refrigeration & Air Conditioning ── */
setChapters('bt_refrig','❄️','Refrigeration & Air Conditioning',
  'Vapour compression cycle, refrigerants, marine provision & cargo refrigeration, HVAC','Sem 6',[
  { id:'ref_vcr', icon:'❄️', title:'Vapour Compression Refrigeration',
    desc:'P-h diagram, COP calculation, superheat/subcooling, multi-stage compression, cascade systems' },
  { id:'ref_refrigerants', icon:'🧪', title:'Refrigerants',
    desc:'Classification, R134a, R404a, R407c, NH₃ (R717), CO₂ (R744), ODP, GWP, environmental regulations' },
  { id:'ref_compressor', icon:'⚙️', title:'Compressors',
    desc:'Reciprocating, screw, scroll, centrifugal compressors — construction, operation, capacity control' },
  { id:'ref_provision', icon:'🍖', title:'Provision Plant & Cargo Refrigeration',
    desc:'Chill & freeze rooms, defrosting, reefer containers, controlled atmosphere, temperature monitoring' },
  { id:'ref_hvac', icon:'🌬️', title:'Marine HVAC Systems',
    desc:'Comfort requirements, AHU, duct design, chilled water systems, fan coil units, psychrometric chart' },
  { id:'ref_trouble', icon:'🔧', title:'Troubleshooting',
    desc:'Fault diagnosis, charging, leak detection, compressor failure, abnormal pressures/temperatures' },
]);

/* ── Semester 6: Marine Electro Technology – III ── */
setChapters('bt_metec3','⚡','Marine Electro Technology – III',
  'Ship electrical power plant, switchboard, generator paralleling, motor control, HV systems','Sem 6',[
  { id:'met3_power', icon:'⚡', title:'Ship Electrical Power Plant',
    desc:'Main & emergency generators, generator sizing, power management system, load analysis' },
  { id:'met3_switchboard', icon:'🔌', title:'Switchboard & Distribution',
    desc:'Main switchboard, emergency switchboard, bus-bar arrangements, section boards, protection schemes' },
  { id:'met3_parallel', icon:'🔄', title:'Generator Paralleling',
    desc:'Synchronizing conditions, synchroscope, auto-synchronizer, load sharing (kW & kVAR), droop' },
  { id:'met3_motor', icon:'⚙️', title:'Motor Control',
    desc:'DOL, star-delta, auto-transformer, soft starter, VFD (variable frequency drive), motor protection' },
  { id:'met3_hv', icon:'⚡', title:'High Voltage Systems',
    desc:'Need for HV (6.6 kV) on ships, safety precautions, HV switchgear, insulation testing, dead-front' },
  { id:'met3_surveys', icon:'📋', title:'Electrical Surveys & Testing',
    desc:'Insulation resistance (Megger), earth fault finding, continuity testing, thermographic survey' },
]);

/* ── Semester 6: IMO & Conventions ── */
setChapters('bt_imo','🌍','IMO & Conventions',
  'IMO structure, SOLAS, MARPOL, STCW, MLC, ISM, ISPS, BWM','Sem 6',[
  { id:'imo_structure', icon:'🌐', title:'IMO Structure & Role',
    desc:'IMO organization, committees (MSC, MEPC), adoption of conventions, flag state implementation' },
  { id:'imo_solas', icon:'📜', title:'SOLAS Convention',
    desc:'Chapters I–XIV overview, construction, fire protection, LSA, navigation, ISM, ISPS — key regulations' },
  { id:'imo_marpol', icon:'🌊', title:'MARPOL 73/78 — All 6 Annexes',
    desc:'Annex I (oil), II (NLS), III (harmful packages), IV (sewage), V (garbage), VI (air pollution)' },
  { id:'imo_stcw', icon:'🎓', title:'STCW Convention',
    desc:'Training standards, competence tables, sea service requirements, COC, watch-keeping standards' },
  { id:'imo_mlc', icon:'👷', title:'MLC 2006 — Maritime Labour Convention',
    desc:'Employment agreements, hours of work/rest, accommodation, medical care, social security' },
  { id:'imo_ism', icon:'📋', title:'ISM Code',
    desc:'Safety management system, DPA, DOC, SMC, non-conformity reporting, internal/external audit' },
  { id:'imo_isps', icon:'🛡️', title:'ISPS Code',
    desc:'Ship security plan, SSO, CSO, PFSO, security levels, SSAS, port facility security' },
  { id:'imo_bwm', icon:'💧', title:'BWM Convention',
    desc:'D-1 exchange, D-2 treatment standard, BWTS type approval, BWM certificate, record book' },
]);

/* ── Semester 7: Workshop/Ship In-Campus/Shipyard Training ── */
setChapters('bt_shipyard','🔧','Workshop/Ship In-Campus/Shipyard Training',
  'Shipyard familiarization, hull repair, pipe fitting, dry docking procedures','Sem 7',[
  { id:'sy_famil', icon:'🏗️', title:'Shipyard Familiarization',
    desc:'Shipyard layout, workshops, dry dock types (graving, floating), slipway, ship repair processes' },
  { id:'sy_hull', icon:'🔩', title:'Hull Repair & Maintenance',
    desc:'Steel renewal, plate cropping, welding procedures, blasting & painting, thickness survey' },
  { id:'sy_pipe', icon:'🔧', title:'Pipe Fitting & Fabrication',
    desc:'Marine pipe standards, flanging, bending, threading, valve overhaul, pressure testing' },
  { id:'sy_alignment', icon:'📐', title:'Machinery Alignment',
    desc:'Shaft alignment (laser, dial indicator), coupling alignment, bearing clearances, chocking' },
  { id:'sy_drydock', icon:'🚢', title:'Dry Docking Procedures',
    desc:'Preparation, critical stability, docking plan, inspections, propeller/rudder clearances, undocking' },
]);

/* ── Semester 8: Ship Safety & Environment Protection ── */
setChapters('bt_shipsafety','🛡️','Ship Safety & Environment Protection',
  'SOLAS, MARPOL compliance, pollution prevention, emission control, environmental auditing','Sem 8',[
  { id:'ss_solas', icon:'📜', title:'SOLAS Safety Requirements',
    desc:'Construction, fire safety, LSA, machinery & electrical, navigation, ISM code implementation' },
  { id:'ss_marpol', icon:'🌊', title:'MARPOL Compliance',
    desc:'Operational compliance with all 6 annexes, record books, certificates, IOPP, IAPP' },
  { id:'ss_emission', icon:'💨', title:'Emission Control',
    desc:'SOx regulations (0.5%/0.1% ECA), NOx Tier I/II/III, EEDI, EEXI, CII A–E, SEEMP Part III' },
  { id:'ss_bwm', icon:'💧', title:'Ballast Water Management',
    desc:'D-1 & D-2 standards, treatment methods (UV, electrochlorination), BWM certificate' },
  { id:'ss_audit', icon:'📋', title:'Environmental Auditing',
    desc:'Internal/external audits, environmental management systems, port state control, deficiency reports' },
]);

/* ── Semester 8: Marine Automation & Control ── */
setChapters('bt_automation','🎛️','Marine Automation & Control',
  'Control fundamentals, PID controllers, PLC & SCADA, UMS, alarm systems','Sem 8',[
  { id:'ac_fund', icon:'📊', title:'Control System Fundamentals',
    desc:'Open/closed loop, transfer functions, block diagram, signal flow graph, time response' },
  { id:'ac_pid', icon:'🎛️', title:'PID Controllers',
    desc:'P, PI, PD, PID actions, tuning methods (Ziegler-Nichols), anti-windup, practical implementation' },
  { id:'ac_stability', icon:'📈', title:'Stability Analysis',
    desc:'Routh-Hurwitz criterion, root locus, Bode plot, Nyquist criterion, gain & phase margins' },
  { id:'ac_plc', icon:'💻', title:'PLC & SCADA',
    desc:'PLC architecture, ladder logic programming, SCADA overview, HMI, marine applications' },
  { id:'ac_ums', icon:'🚢', title:'UMS & Alarm Systems',
    desc:'Unmanned Machinery Space concept, alarm & monitoring, AMS, engine room automation' },
  { id:'ac_pneumatic', icon:'💨', title:'Pneumatic & Hydraulic Control',
    desc:'Pneumatic controllers (flapper-nozzle), I/P & P/I converters, hydraulic servo systems' },
]);

/* ── Semester 8: Principle of Management ── */
setChapters('bt_management','📊','Principle of Management',
  'Management principles, HR, financial, quality, project management','Sem 8',[
  { id:'mgmt_principles', icon:'📋', title:'Management Principles',
    desc:'Planning, organizing, staffing, directing, controlling — classical & modern management theories' },
  { id:'mgmt_hr', icon:'👥', title:'HR & Leadership',
    desc:'Recruitment, training, motivation theories (Maslow, Herzberg), team building, conflict resolution' },
  { id:'mgmt_finance', icon:'💰', title:'Financial Management',
    desc:'Budgeting, cost control, financial statements, investment analysis, maritime economics' },
  { id:'mgmt_quality', icon:'📊', title:'Quality Management',
    desc:'TQM, ISO 9001, Six Sigma, quality control tools, continuous improvement, maritime quality standards' },
  { id:'mgmt_project', icon:'📋', title:'Project Management',
    desc:'Project lifecycle, scheduling (Gantt, PERT/CPM), resource allocation, risk management' },
]);

/* ── Semester 8: Marine Machinery System & Design ── */
setChapters('bt_machsysdesign','⚙️','Marine Machinery System & Design',
  'Propulsion system design, shafting, propeller theory, power plant selection','Sem 8',[
  { id:'msd_propulsion', icon:'🚢', title:'Propulsion System Design',
    desc:'Ship resistance (frictional, wave-making, air), power requirement, selection of propulsion system' },
  { id:'msd_shafting', icon:'🔧', title:'Shafting & Transmission',
    desc:'Intermediate shaft, thrust block (Michell), shaft alignment, vibration, whirling speed' },
  { id:'msd_propeller', icon:'🌀', title:'Propeller Theory & Design',
    desc:'Momentum theory, blade element theory, advance coefficient, cavitation, propeller materials' },
  { id:'msd_gearbox', icon:'⚙️', title:'Reduction Gearbox',
    desc:'Gear types, gear arrangements, tooth stresses, lubrication, gearbox maintenance' },
  { id:'msd_machinery', icon:'🏗️', title:'Machinery Arrangement',
    desc:'Engine room layout, machinery foundation, vibration isolation, noise control, accessibility' },
]);

/* ── Semester 8: Ship Operation & Logistics ── */
setChapters('bt_shipopslog','📜','Ship Operation & Logistics',
  'Maritime law, ISM/ISPS, cargo operations, bunkering, PMS, commercial operations','Sem 8',[
  { id:'sol_law', icon:'⚖️', title:'Maritime Law',
    desc:'UNCLOS, flag state, port state, coastal state, PSC inspections, P&I clubs, liability' },
  { id:'sol_ism', icon:'📋', title:'ISM/ISPS Implementation',
    desc:'SMS structure, DPA responsibilities, security plans, drills, audits, non-conformity management' },
  { id:'sol_cargo', icon:'📦', title:'Cargo Operations',
    desc:'Loading/discharging, cargo planning, stability during operations, loadicator, cargo documentation' },
  { id:'sol_bunker', icon:'⛽', title:'Bunkering Operations',
    desc:'Bunkering procedures, safety checklist, sampling, quantity measurement, SOPEP' },
  { id:'sol_pms', icon:'🔧', title:'Planned Maintenance System',
    desc:'Class requirements, running hour & condition-based maintenance, CMMS software, documentation' },
  { id:'sol_commercial', icon:'📑', title:'Commercial Operations',
    desc:'Charter parties (voyage, time, bareboat), bill of lading, freight, demurrage, laytime, off-hire' },
]);

/* ── Semester 8: Advanced Electronics & Communications ── */
setChapters('bt_advelectronics','📡','Advanced Electronics & Communications',
  'Power electronics, rectifiers/inverters, VFD, electric propulsion, GMDSS advanced','Sem 8',[
  { id:'ae_power', icon:'⚡', title:'Power Electronics',
    desc:'Thyristors (SCR), triacs, power MOSFETs, IGBTs, triggering circuits, commutation' },
  { id:'ae_converters', icon:'🔌', title:'Rectifiers & Inverters',
    desc:'Controlled rectifiers, voltage source & current source inverters, PWM techniques' },
  { id:'ae_vfd', icon:'🎛️', title:'Variable Frequency Drives',
    desc:'V/f control, vector control, sensorless control — applications for pumps, fans, thrusters' },
  { id:'ae_propulsion', icon:'🚢', title:'Electric Propulsion Systems',
    desc:'Diesel-electric architecture, podded propulsion (Azipod), shaft generators (PTO/PTI)' },
  { id:'ae_dp', icon:'📡', title:'Dynamic Positioning',
    desc:'DP classes (DP1, DP2, DP3), thrusters, sensors, power management, redundancy' },
  { id:'ae_condmon', icon:'📊', title:'Condition Monitoring',
    desc:'Vibration analysis, thermography, oil analysis, trending, predictive maintenance' },
]);

/* ── Semester 8: Latest Marine Engines & Alternative Fuels ── */
setChapters('bt_altfuels','⛽','Latest Marine Engines & Alternative Fuels',
  'Modern ME engines, LNG dual-fuel, methanol, ammonia, hydrogen, wind-assisted propulsion','Sem 8',[
  { id:'af_modern', icon:'⚙️', title:'Modern Electronically Controlled Engines',
    desc:'MAN B&W ME series, Wärtsilä X-series — electronic fuel injection, exhaust valve, cylinder lubrication' },
  { id:'af_lng', icon:'⛽', title:'LNG as Marine Fuel',
    desc:'Dual-fuel engines, gas supply systems, bunkering infrastructure, methane slip, IGF Code' },
  { id:'af_methanol', icon:'🧪', title:'Methanol & Ammonia',
    desc:'Green methanol production, ammonia as fuel, safety concerns, engine modifications, toxicity' },
  { id:'af_hydrogen', icon:'💧', title:'Hydrogen & Fuel Cells',
    desc:'PEM fuel cells, SOFC, hydrogen storage (compressed, liquefied), pilot projects' },
  { id:'af_battery', icon:'🔋', title:'Battery & Hybrid Systems',
    desc:'Li-ion batteries, battery management systems, hybrid vessels, all-electric ferries' },
  { id:'af_wind', icon:'🌬️', title:'Wind-Assisted Propulsion',
    desc:'Rotor sails (Flettner), rigid wing sails, kites, DynaRig — fuel savings, operational considerations' },
  { id:'af_imo', icon:'🌍', title:'IMO Decarbonisation Strategy',
    desc:'2030/2050 targets, EEXI, CII ratings, market-based measures, carbon pricing, shore power' },
]);

