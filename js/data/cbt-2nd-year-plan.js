/* 2nd Year CBT Prep Plan — Full Data Extraction from my changes.md */

const CBT_2ND_YEAR_PLAN = {
  title: "COMPLETE CBT EXAM PREPARATION — B.Tech Marine Engineering 2nd Year",
  purpose: "This plan turns every student into a daily MCQ-solving machine who can crack any shipping company CBT — NYK, Synergy, MSC, Anglo Eastern, BSM, Fleet Management, Wilhelmsen, Thome, V.Ships, Executive Ship Management, Zodiac, Bernhard Schulte, and others — by building a layered knowledge base year over year.",
  description: "Daily MCQ-solving guide to crack shipping company CBTs (NYK, MOL, K-Line) with structured 4-week preparation plan.",
  companies: ["NYK Line (Nippon Yusen Kaisha)", "MOL (Mitsui O.S.K. Lines)", "K-Line", "Anglo Eastern (early recruitment)", "BSM (early recruitment)"],
  examPattern: {
    duration: "60–90 minutes",
    questions: "80–120 MCQs",
    negativeMarking: "Generally NO",
    difficulty: "Basic to Moderate",
    passPercentage: "60% minimum (company discretion)",
    sections: [
      { section: "English", questions: "25–30", time: "15–20 min", difficulty: "Basic" },
      { section: "Mathematics", questions: "20–25", time: "20–25 min", difficulty: "Basic-Med" },
      { section: "Physics", questions: "15–20", time: "15–20 min", difficulty: "Basic-Med" },
      { section: "General Aptitude", questions: "15–20", time: "15–20 min", difficulty: "Basic" },
      { section: "Basic Marine Awareness", questions: "5–10", time: "5–10 min", difficulty: "Basic" }
    ]
  },
  dailyTarget: {
    total: 1200,
    breakdown: [
      { session: "Morning (3 hours)", mcqs: 400 },
      { session: "Afternoon (3 hours)", mcqs: 400 },
      { session: "Evening (3 hours)", mcqs: 400 }
    ],
    blockStructure: "Timed Practice Blocks of 100 MCQs in 45 minutes + Review & Error Analysis: 15 minutes per block",
    sources: [
      { source: "Seagull Pattern Questions", count: 200, focus: "Company CBT simulation" },
      { source: "Sanfoundry", count: 200, focus: "Core engineering fundamentals" },
      { source: "Ship07 + MarineGyaan", count: 200, focus: "Marine-specific subjects" },
      { source: "USCGQ", count: 150, focus: "License-standard questions" },
      { source: "MCQ.MarineSite + MarineSite", count: 150, focus: "Mixed marine practice" },
      { source: "Marine Insight (converted)", count: 100, focus: "Concept-based application" },
      { source: "Scribd (past paper extraction)", count: 100, focus: "Company past paper patterns" },
      { source: "MarineBook", count: 100, focus: "Reference-based deep questions" }
    ]
  },
  subjects: [
    {
      title: "English", count: "25–30", time: "15–20 min", dailyMCQs: 250, difficulty: "Basic",
      note: "NYK focuses on BASICS — not advanced grammar. They test whether the cadet can understand simple English instructions aboard ship.",
      categories: [
        { name: "Vocabulary", daily: 60, subtopics: [
          { topic: "Synonyms", daily: 15, detail: "Words like abandon, hazard, ventilation, cargo, bulkhead, navigable, auxiliary, propulsion. Mix of general English + maritime vocabulary." },
          { topic: "Antonyms", daily: 15, detail: "ascend/descend, starboard/port, bow/stern, forward/aft, load/discharge" },
          { topic: "Fill in the blanks with correct word", daily: 15, detail: "Sentences about ship operations, weather, safety procedures. Example: \"The vessel _____ (anchored/parked) at the port.\"" },
          { topic: "Word meaning in context", daily: 15, detail: "Short paragraph about marine scenario → identify word meaning" }
        ]},
        { name: "Grammar", daily: 80, subtopics: [
          { topic: "Tenses", daily: 20, detail: "Simple present, past, future. Present/past continuous. Present/past perfect. Focus: Logbook entry style sentences." },
          { topic: "Subject-Verb Agreement", daily: 10, detail: "\"The crew (is/are) ready for departure.\" \"Neither the captain nor the officers (was/were) on the bridge.\"" },
          { topic: "Articles", daily: 10, detail: "\"_____ anchor was dropped at 1400 hours.\" \"There was _____ oil spill near the engine room.\"" },
          { topic: "Prepositions", daily: 15, detail: "Maritime prepositions: alongside the berth, into the tank, through the pipeline, across the channel" },
          { topic: "Active and Passive Voice", daily: 10, detail: "\"The cargo was loaded by the crane.\" \"The chief engineer inspected the main engine.\"" },
          { topic: "Direct and Indirect Speech", daily: 10, detail: "Radio communication conversion, Bridge order conversion" },
          { topic: "Error Spotting", daily: 5, detail: "Find grammatical error in a sentence about ship operations" }
        ]},
        { name: "Reading Comprehension", daily: 50, subtopics: [
          { topic: "Short Passage", daily: 10, detail: "2 passages × 5 questions. Topics: Safety onboard, pollution prevention, weather reports. Level: 100–150 words per passage." },
          { topic: "Medium Passage", daily: 16, detail: "2 passages × 8 questions. Topics: Marine accident case studies, port state control, SOLAS regulations summary. Level: 200–300 words." },
          { topic: "Sentence Rearrangement", daily: 12, detail: "Jumbled sentences about a marine procedure. Example: Steps for starting an emergency generator." },
          { topic: "Sentence Completion", daily: 12, detail: "\"Before entering an enclosed space, the officer must _____\"" }
        ]},
        { name: "Maritime English", daily: 60, subtopics: [
          { topic: "Standard Marine Communication Phrases (SMCP)", daily: 15, detail: "Mayday, Pan-Pan, Securité usage. Bridge-to-bridge communication. Engine room communication terminology." },
          { topic: "Ship Parts Terminology", daily: 15, detail: "Identify correct name: \"The vertical post at the bow = ?\" Match term to definition: Freeboard, Draft, Beam, LOA." },
          { topic: "Logbook English", daily: 15, detail: "Correct the logbook entry. Choose proper logbook phrasing." },
          { topic: "Safety Signage & Instruction English", daily: 15, detail: "Interpret safety signs. Emergency instruction comprehension. MSDS (Material Safety Data Sheet) reading." }
        ]}
      ]
    },
    {
      title: "Mathematics", count: "20–25", time: "20–25 min", dailyMCQs: 250, difficulty: "Basic-Med",
      note: "NYK tests applied mathematics — not pure theory. Focus on calculation speed and accuracy.",
      categories: [
        { name: "Arithmetic", daily: 80, subtopics: [
          { topic: "Number System", daily: 10, detail: "HCF, LCM. Prime factorization. Divisibility rules. Application: Gear ratios, RPM calculations." },
          { topic: "Percentage", daily: 15, detail: "Fuel consumption percentage change. Efficiency percentage of engines. \"If fuel consumption increases by 15% and the daily consumption was 25 MT, what is the new consumption?\"" },
          { topic: "Ratio and Proportion", daily: 15, detail: "Mixture problems (fuel oil blending). Gear ratios. Crew allocation ratios. \"Mix HFO and MDO in ratio 3:1. Total 200 MT. Find each.\"" },
          { topic: "Average", daily: 10, detail: "Average speed of vessel. Average fuel consumption over voyage. Weighted average." },
          { topic: "Profit and Loss", daily: 10, detail: "Charter rate calculations (basic). Bunker purchase economics." },
          { topic: "Simple and Compound Interest", daily: 10, detail: "Loan calculations. Depreciation of machinery." },
          { topic: "Time and Work", daily: 10, detail: "\"Pump A fills tank in 4 hours, Pump B in 6 hours. Together = ?\" Multiple pump/generator problems." }
        ]},
        { name: "Algebra", daily: 50, subtopics: [
          { topic: "Linear Equations", daily: 15, detail: "Solve for unknowns in engineering contexts. \"If 3x + 5 = 20, find x\" type and word problems." },
          { topic: "Quadratic Equations", daily: 10, detail: "Factorization method. Formula method. Application in projectile/flow problems." },
          { topic: "Simultaneous Equations", daily: 10, detail: "Two-variable problems. \"Ship A travels at x knots, Ship B at y knots...\"" },
          { topic: "Indices and Logarithms", daily: 10, detail: "Laws of indices. Basic logarithm calculations. Application in decibel, pH calculations." },
          { topic: "Polynomials", daily: 5, detail: "Basic operations, factor theorem." }
        ]},
        { name: "Geometry & Mensuration", daily: 60, subtopics: [
          { topic: "Areas", daily: 15, detail: "Rectangle, triangle, circle, trapezium. Application: Tank surface areas, plate areas." },
          { topic: "Volumes", daily: 15, detail: "Cylinder, cuboid, sphere, cone. Application: Tank capacities, cylinder volumes." },
          { topic: "Surface Areas", daily: 10, detail: "Total and curved surface areas. Application: Paint coverage calculations." },
          { topic: "Coordinate Geometry", daily: 10, detail: "Distance formula, midpoint. Basic plotting. Application: Position plotting basics." },
          { topic: "Trigonometry Basics", daily: 10, detail: "Sin, Cos, Tan values (standard angles). Right triangle problems. Application: Stability triangle, force resolution." }
        ]},
        { name: "Applied Mathematics", daily: 60, subtopics: [
          { topic: "Speed, Distance, Time", daily: 15, detail: "\"Vessel speed 12 knots, distance 360 NM, time = ?\" Relative speed problems. Current/tide effect on speed." },
          { topic: "Unit Conversion", daily: 15, detail: "NM to km, Metres to feet, Celsius to Fahrenheit, Bar to PSI, kW to HP, Tonnes to kg." },
          { topic: "Data Interpretation", daily: 15, detail: "Read graphs of engine performance. Table-based fuel consumption data. Bar charts of port statistics." },
          { topic: "Approximation", daily: 15, detail: "Quick mental math. Rounding and estimation. \"Approximate: 497 × 31 ÷ 52 = ?\"" }
        ]}
      ]
    },
    {
      title: "Physics", count: "15–20", time: "15–20 min", dailyMCQs: 250, difficulty: "Basic-Med",
      note: "Focus on practical physics applied to marine engineering — not theoretical derivations.",
      categories: [
        { name: "Mechanics", daily: 80, subtopics: [
          { topic: "Newton's Laws of Motion", daily: 15, detail: "Force, mass, acceleration problems. Application: Mooring force, propeller thrust. \"A 50,000 DWT ship accelerates at 0.01 m/s². Force = ?\"" },
          { topic: "Friction", daily: 10, detail: "Static vs kinetic friction. Coefficient of friction. Application: Bearing friction, brake systems." },
          { topic: "Work, Energy, Power", daily: 15, detail: "Work done by pumps, cranes. Potential and kinetic energy. Power of engines. Power = Work/Time calculations." },
          { topic: "Moments and Levers", daily: 10, detail: "Principle of moments. Simple machines. Application: Steering gear, valve operation." },
          { topic: "Pressure", daily: 15, detail: "Hydrostatic pressure. Atmospheric pressure. Gauge vs absolute pressure. Application: Tank pressures, depth pressure." },
          { topic: "Density and Buoyancy", daily: 15, detail: "Archimedes' principle. Floating and sinking conditions. Application: Ship flotation, load line concept." }
        ]},
        { name: "Heat & Thermodynamics", daily: 60, subtopics: [
          { topic: "Temperature and Heat", daily: 10, detail: "Specific heat capacity. Heat transfer calculations. Q = mcΔT problems." },
          { topic: "Modes of Heat Transfer", daily: 10, detail: "Conduction, convection, radiation. Application: Heat exchangers, boiler tubes, insulation." },
          { topic: "Laws of Thermodynamics", daily: 10, detail: "First law: Energy conservation. Second law: Heat flow direction, entropy concept. Application: Engine cycles." },
          { topic: "Gas Laws", daily: 15, detail: "Boyle's Law, Charles' Law, Combined Gas Law. Ideal Gas Equation PV = nRT. Application: Air compressor, gas bottles." },
          { topic: "Change of State", daily: 10, detail: "Latent heat of fusion, vaporization. Boiling, condensation. Application: Boiler operation, refrigeration." },
          { topic: "Thermal Expansion", daily: 5, detail: "Linear and volumetric expansion. Application: Pipeline expansion, expansion tanks." }
        ]},
        { name: "Waves, Optics & Sound", daily: 30, subtopics: [
          { topic: "Wave Properties", daily: 10, detail: "Wavelength, frequency, amplitude, speed. v = fλ calculations. Application: Radar, sonar." },
          { topic: "Sound", daily: 10, detail: "Speed of sound in different media. Echo and sonar principles. Decibel levels. Application: Echo sounder, fog signals." },
          { topic: "Light and Optics", daily: 10, detail: "Reflection, refraction. Mirror and lens basics. Application: Navigation lights, signal lamps." }
        ]},
        { name: "Electricity & Magnetism", daily: 80, subtopics: [
          { topic: "Current Electricity", daily: 20, detail: "Ohm's Law: V = IR. Series and parallel circuits. Resistance calculations. Power: P = VI = I²R = V²/R. Application: Ship electrical circuits." },
          { topic: "Electromagnetism", daily: 15, detail: "Magnetic field around conductor. Electromagnetic induction. Faraday's Law basic concept. Application: Generator principle, motor principle." },
          { topic: "Capacitance", daily: 10, detail: "Capacitor basics. Series and parallel capacitors. Energy stored in capacitor. Application: Power factor correction concept." },
          { topic: "AC Circuits Basics", daily: 15, detail: "AC vs DC. Frequency, time period. RMS values. Single phase vs three phase (basic concept). Application: Ship power supply 440V, 60Hz." },
          { topic: "Electrical Safety", daily: 10, detail: "Earthing/Grounding. Insulation resistance. Electric shock hazards. Application: Megger testing concept, earth fault." },
          { topic: "Semiconductors & Electronics Basics", daily: 10, detail: "Diode: Forward and reverse bias. LED concept. Transistor: Basic function (switch/amplifier). Application: Alarm circuits, sensor circuits." }
        ]}
      ]
    },
    {
      title: "General Aptitude", count: "15–20", time: "15–20 min", dailyMCQs: 250, difficulty: "Basic",
      categories: [
        { name: "Logical Reasoning", daily: 80, subtopics: [
          { topic: "Number Series", daily: 15, detail: "Find next number: 2, 6, 12, 20, 30, ? Marine context: RPM patterns, pressure readings." },
          { topic: "Alphabet/Letter Series", daily: 10, detail: "Pattern recognition in letter sequences." },
          { topic: "Coding-Decoding", daily: 15, detail: "\"If SHIP = TIJQ, then BOAT = ?\" Number coding systems." },
          { topic: "Analogy", daily: 15, detail: "\"Engine : Ship :: Heart : ?\" \"Captain : Bridge :: Chief Engineer : ?\"" },
          { topic: "Blood Relations", daily: 10, detail: "Family relationship puzzles." },
          { topic: "Direction Sense", daily: 15, detail: "\"Ship sails 10 NM North, then 5 NM East...\" Navigation direction problems. Application: Chart plotting basics." }
        ]},
        { name: "Quantitative Aptitude", daily: 80, subtopics: [
          { topic: "Number Problems", daily: 15, detail: "Odd one out, missing numbers. Divisibility, remainders." },
          { topic: "Age Problems", daily: 10, detail: "\"Captain is 3 times the cadet's age...\"" },
          { topic: "Pipe and Cistern / Tank Problems", daily: 15, detail: "\"Inlet valve fills in 5 hours, outlet empties in 8 hours...\" Directly applicable to marine pumping systems." },
          { topic: "Clock Problems", daily: 10, detail: "Angle between hands. Time calculation." },
          { topic: "Calendar Problems", daily: 5, detail: "Day of week calculations." },
          { topic: "Probability (Basic)", daily: 10, detail: "Simple probability. Coin, dice problems. Application: Risk assessment basics." },
          { topic: "Permutation & Combination (Basic)", daily: 15, detail: "Arrangement and selection. \"How many ways can 4 cadets be assigned to 4 watches?\"" }
        ]},
        { name: "Visual/Spatial Reasoning", daily: 50, subtopics: [
          { topic: "Figure Completion", daily: 15, detail: "Complete the pattern." },
          { topic: "Mirror Image", daily: 10, detail: "Find mirror image of figure/word." },
          { topic: "Paper Folding", daily: 10, detail: "Predict hole pattern after unfolding." },
          { topic: "Dice Problems", daily: 15, detail: "Opposite faces, adjacent faces. Application: 3D spatial thinking for machinery." }
        ]},
        { name: "General Awareness — Marine", daily: 40, subtopics: [
          { topic: "Parts of a Ship", daily: 10, detail: "Bow, stern, port, starboard, midship. Deck names, tank names. Engine room layout basics." },
          { topic: "Types of Ships", daily: 10, detail: "Bulk carrier, tanker, container ship, LNG, LPG, Ro-Ro. Basic features of each." },
          { topic: "Marine Environment", daily: 10, detail: "IMO basics. MARPOL awareness. SOLAS awareness (just names and purpose)." },
          { topic: "Current Maritime News", daily: 10, detail: "Major shipping company news. New regulations. Maritime disasters and lessons." }
        ]}
      ]
    },
    {
      title: "Basic Electrical & Electronics", count: "Dedicated", time: "Evening", dailyMCQs: 200, difficulty: "Basic-Med",
      note: "This is a DEDICATED section. These MCQs supplement the Physics electricity section.",
      categories: [
        { name: "DC Circuits", daily: 50, subtopics: [
          { topic: "Ohm's Law numerical problems", daily: 15 },
          { topic: "Kirchhoff's Current Law (KCL) basics", daily: 10 },
          { topic: "Kirchhoff's Voltage Law (KVL) basics", daily: 10 },
          { topic: "Wheatstone Bridge", daily: 5 },
          { topic: "Battery: Series and Parallel connection", daily: 5 },
          { topic: "Internal resistance of cell", daily: 5 }
        ]},
        { name: "AC Circuits", daily: 40, subtopics: [
          { topic: "AC waveform: Peak, RMS, Average values", daily: 10 },
          { topic: "Impedance concept: R, L, C in AC", daily: 10 },
          { topic: "Power Factor basics", daily: 10 },
          { topic: "Three-phase supply: Star and Delta basics", daily: 10 }
        ]},
        { name: "Electrical Machines", daily: 30, subtopics: [
          { topic: "DC Motor: Types, speed control basics", daily: 10 },
          { topic: "DC Generator: Working principle, types", daily: 10 },
          { topic: "Transformer: Turns ratio, step up/down", daily: 10 }
        ]},
        { name: "Electronics", daily: 40, subtopics: [
          { topic: "PN Junction Diode: V-I characteristics", daily: 10 },
          { topic: "Rectifier: Half wave, Full wave concept", daily: 10 },
          { topic: "Zener Diode: Voltage regulation", daily: 5 },
          { topic: "Transistor: NPN/PNP, CE/CB/CC basics", daily: 10 },
          { topic: "Logic Gates: AND, OR, NOT, NAND, NOR", daily: 5 }
        ]},
        { name: "Electrical Safety & Marine Application", daily: 20, subtopics: [
          { topic: "Earthing systems aboard ships", daily: 5 },
          { topic: "Insulation resistance testing", daily: 5 },
          { topic: "Circuit breakers vs fuses", daily: 5 },
          { topic: "Emergency power supply concept", daily: 5 }
        ]},
        { name: "Instruments & Measurements", daily: 20, subtopics: [
          { topic: "Ammeter, Voltmeter connection", daily: 5 },
          { topic: "Multimeter usage", daily: 5 },
          { topic: "Megger principle", daily: 5 },
          { topic: "Clamp meter basics", daily: 5 }
        ]}
      ]
    }
  ],
  dailySchedule: [
    { time: "06:00 – 06:30", task: "Wake up, quick revision of yesterday errors" },
    { time: "MORNING SESSION", task: "400 MCQs", isHeader: true },
    { time: "06:30 – 07:15", task: "English Block 1: 100 MCQs (Vocabulary+Grammar)", action: "english" },
    { time: "07:15 – 07:30", task: "Review & mark errors" },
    { time: "07:30 – 08:15", task: "Mathematics Block 1: 100 MCQs (Arithmetic)", action: "maths" },
    { time: "08:15 – 08:30", task: "Review & mark errors" },
    { time: "08:30 – 09:15", task: "Physics Block 1: 100 MCQs (Mechanics+Heat)", action: "physics" },
    { time: "09:15 – 09:30", task: "Review & mark errors" },
    { time: "09:30 – 10:15", task: "Aptitude Block 1: 100 MCQs (Reasoning)", action: "aptitude" },
    { time: "10:15 – 10:30", task: "Review & mark errors" },
    { time: "10:30 – 11:00", task: "BREAK" },
    { time: "AFTERNOON SESSION", task: "400 MCQs", isHeader: true },
    { time: "11:00 – 11:45", task: "English Block 2: 100 MCQs (Comprehension+SMCP)", action: "english" },
    { time: "11:45 – 12:00", task: "Review" },
    { time: "12:00 – 12:45", task: "Mathematics Block 2: 100 MCQs (Algebra+Geom)", action: "maths" },
    { time: "12:45 – 13:00", task: "Review" },
    { time: "13:00 – 14:00", task: "LUNCH BREAK" },
    { time: "14:00 – 14:45", task: "Physics Block 2: 100 MCQs (Elec+Waves)", action: "physics" },
    { time: "14:45 – 15:00", task: "Review" },
    { time: "15:00 – 15:45", task: "Aptitude Block 2: 100 MCQs (Quant+Visual)", action: "aptitude" },
    { time: "15:45 – 16:00", task: "Review" },
    { time: "16:00 – 16:30", task: "BREAK", isHeader: true },
    { time: "EVENING SESSION", task: "400 MCQs", isHeader: true },
    { time: "16:30 – 17:15", task: "Electrical & Electronics: 100 MCQs", action: "electrical" },
    { time: "17:15 – 17:30", task: "Review" },
    { time: "17:30 – 18:15", task: "Electrical & Electronics: 100 MCQs", action: "electrical" },
    { time: "18:15 – 18:30", task: "Review" },
    { time: "18:30 – 19:15", task: "Mixed CBT Simulation: 100 MCQs (all subjects)", action: "mixed" },
    { time: "19:15 – 19:30", task: "Review" },
    { time: "19:30 – 20:15", task: "Mixed CBT Simulation: 100 MCQs (timed exam)", action: "mixed" },
    { time: "20:15 – 20:30", task: "Review" },
    { time: "20:30 – 21:00", task: "DINNER" },
    { time: "21:00 – 22:00", task: "Error Log Analysis + Weak Area Identification" },
    { time: "22:00 – 22:30", task: "Next day topic preview" }
  ],
  weeklyPlan: [
    {
      week: "WEEK 1: FOUNDATION BUILDING",
      days: [
        { day: "Mon", english: "Tenses + Vocab", maths: "Numbers + HCF/LCM", physics: "Newton's Laws", aptitude: "Number Series", electrical: "Ohm's Law" },
        { day: "Tue", english: "Articles + Preps", maths: "Percentage", physics: "Friction + Work", aptitude: "Coding-Decoding", electrical: "KCL, KVL" },
        { day: "Wed", english: "Active/Passive", maths: "Ratio & Prop", physics: "Pressure+Density", aptitude: "Analogy", electrical: "Series-Parallel" },
        { day: "Thu", english: "Comprehension", maths: "Avg + SI/CI", physics: "Heat Transfer", aptitude: "Direction Sense", electrical: "AC Waveforms" },
        { day: "Fri", english: "SMCP", maths: "Time & Work", physics: "Gas Laws", aptitude: "Pipe & Cistern", electrical: "Transformers" },
        { day: "Sat", english: "Error Spotting", maths: "Speed-Dist-Time", physics: "Thermo Laws", aptitude: "Probability", electrical: "DC Motors" },
        { day: "Sun", english: "FULL MOCK TEST", maths: "1200 MCQs", physics: "Exam Conditions", aptitude: "-", electrical: "-" }
      ]
    },
    {
      week: "WEEK 2: STRENGTHENING",
      days: [
        { day: "Mon", english: "Syn/Antonyms", maths: "Linear Eq", physics: "Wave Properties", aptitude: "Blood Relations", electrical: "Diodes" },
        { day: "Tue", english: "Direct/Indirect", maths: "Quadratic Eq", physics: "Sound + Echo", aptitude: "Clock Problems", electrical: "Rectifiers" },
        { day: "Wed", english: "Logbook English", maths: "SimEq", physics: "Light + Optics", aptitude: "Calendar", electrical: "Transistor basics" },
        { day: "Thu", english: "Comprehension", maths: "Indices & Logs", physics: "Electromag", aptitude: "Visual Reasoning", electrical: "Logic Gates" },
        { day: "Fri", english: "Sentence Rearr", maths: "Trig Basics", physics: "Capacitance", aptitude: "Permut/Combin", electrical: "Megger" },
        { day: "Sat", english: "Mixed blank", maths: "Area & Volume", physics: "AC Circuits basic", aptitude: "Mixed reasoning", electrical: "Safety" },
        { day: "Sun", english: "FULL MOCK TEST", maths: "NYK CBT", physics: "Pattern", aptitude: "-", electrical: "-" }
      ]
    },
    {
      week: "WEEK 3: ACCELERATION",
      note: "Repeat Week 1 topics at HIGHER DIFFICULTY LEVEL. Increase speed: 100 MCQs in 40 minutes (instead of 45). Add cross-subject questions."
    },
    {
      week: "WEEK 4: MASTERY & SIMULATION",
      note: "Daily FULL Mock Tests in exact NYK CBT pattern. Identify weak areas. Targeted drilling. Speed optimization."
    }
  ]
};
