/* MarineIQ — Interview & CBT Preparation: Company Profiles
   8 major shipping companies with CBT formats, interview patterns, and question banks
   DO NOT add logic here — data only */

const INTERVIEW_COMPANIES = {

  /* ═══════════════════════════════════════ */
  anglo: {
    id: 'anglo',
    name: 'Anglo Eastern Ship Management',
    shortName: 'Anglo Eastern',
    icon: '🔵',
    color: '#1e40af',
    hq: 'Hong Kong',
    fleetSize: '600+ vessels',
    vesselTypes: ['Bulk Carriers', 'Tankers', 'Container Ships', 'Gas Carriers', 'Offshore'],
    reputation: 'One of the largest independent ship managers globally. Known for rigorous selection.',
    difficulty: 8,
    website: 'https://www.angloeastern.com',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via Anglo Eastern careers portal' },
      { stage: 'Written Test (2 hrs)', desc: 'Engineering Knowledge, English, Mechanical Aptitude, Spatial Relations, GK' },
      { stage: 'Psychometric Test (1 hr)', desc: '240 questions — personality & aptitude assessment' },
      { stage: 'Personal Interview', desc: 'Technical + personal (Mumbai: 1 in-person + 1 online; Delhi: 1 interview)' },
      { stage: 'Medical Examination', desc: 'Standard pre-sea medical fitness' },
      { stage: 'Joining', desc: 'Placement at Anglo Eastern Maritime Academy or DG-approved institute' }
    ],

    cbtFormat: {
      duration: 120,
      totalQuestions: 100,
      sections: [
        { name: 'Engineering Knowledge', questions: 30, weight: 30 },
        { name: 'English Language', questions: 20, weight: 20 },
        { name: 'Mechanical Aptitude', questions: 20, weight: 20 },
        { name: 'Spatial Relations', questions: 15, weight: 15 },
        { name: 'General Knowledge', questions: 15, weight: 15 }
      ],
      negativeMarking: false,
      passingScore: 60,
      psychometric: { questions: 240, duration: 60 }
    },

    interviewStyle: {
      type: 'Technical + Personal',
      rounds: ['Personal Background', 'Technical Engineering', 'Situational'],
      difficulty: 'Rigorous',
      tips: [
        'Be thorough with VCRS cycle and refrigerants',
        'Expect cross-questions on diesel engine valve timing',
        'Know your physics fundamentals (classes 9-12)',
        'Prepare neat diagrams for 2-stroke and 4-stroke engines'
      ]
    },

    questionBank: [
      { q: 'Explain the Vapor Compression Refrigeration System (VCRS) cycle with a diagram.', type: 'technical', topic: 'Refrigeration' },
      { q: 'What are the main parts of a 4-stroke diesel engine? Explain the working principle.', type: 'technical', topic: 'Diesel Engines' },
      { q: 'Draw and explain the valve timing diagram of a 4-stroke engine.', type: 'technical', topic: 'Diesel Engines' },
      { q: 'Classify different types of pumps used on ships.', type: 'technical', topic: 'Pumps' },
      { q: 'What is the difference between a centrifugal pump and a positive displacement pump?', type: 'technical', topic: 'Pumps' },
      { q: 'Name common refrigerants used in marine refrigeration. What is R-134a?', type: 'technical', topic: 'Refrigeration' },
      { q: 'What is moment of inertia? Give examples.', type: 'technical', topic: 'Physics' },
      { q: 'Explain Newton\'s three laws of motion with examples.', type: 'technical', topic: 'Physics' },
      { q: 'What is a fresh water generator? How does it produce fresh water on a ship?', type: 'technical', topic: 'Aux Machinery' },
      { q: 'Why do you want to join the Merchant Navy?', type: 'personal', topic: 'Motivation' },
      { q: 'Tell me about yourself and your educational background.', type: 'personal', topic: 'Background' },
      { q: 'What are your strengths and weaknesses?', type: 'personal', topic: 'Self-assessment' }
    ]
  },

  /* ═══════════════════════════════════════ */
  msc: {
    id: 'msc',
    name: 'MSC Ship Management',
    shortName: 'MSC',
    icon: '🟡',
    color: '#ca8a04',
    hq: 'Geneva, Switzerland',
    fleetSize: '800+ vessels',
    vesselTypes: ['Container Ships', 'Cruise Ships', 'Tankers', 'Bulk Carriers'],
    reputation: 'World\'s largest container shipping line. Strong training program.',
    difficulty: 7,
    website: 'https://www.msc.com',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply through MSC Ship Management portal' },
      { stage: 'Online Written Exam', desc: 'AI-proctored (camera required). Marine machinery, navigation, safety' },
      { stage: 'IMU CET Score', desc: 'Valid IMU CET rank required' },
      { stage: 'Medical Test', desc: 'Standard pre-sea medical' },
      { stage: 'Physical Interview', desc: 'Technical + personal assessment' },
      { stage: 'Joining', desc: 'Placement on MSC-managed vessels' }
    ],

    cbtFormat: {
      duration: 90,
      totalQuestions: 80,
      sections: [
        { name: 'Marine Machinery', questions: 25, weight: 30 },
        { name: 'Safety & Regulations', questions: 20, weight: 25 },
        { name: 'Navigation Basics', questions: 15, weight: 20 },
        { name: 'English & Aptitude', questions: 20, weight: 25 }
      ],
      negativeMarking: false,
      passingScore: 60,
      proctored: true
    },

    interviewStyle: {
      type: 'Technical + Personal',
      rounds: ['Self Introduction', 'Technical Questions', 'Situational Assessment'],
      difficulty: 'Moderate-Hard',
      tips: [
        'Know alternator working principle and paralleling conditions',
        'Prepare for questions on purifier operation and gravity disc selection',
        'Study MARPOL annexes thoroughly',
        'Be ready to explain lifeboat launching procedure'
      ]
    },

    questionBank: [
      { q: 'How does an alternator work? What are the conditions for paralleling?', type: 'technical', topic: 'Electrical' },
      { q: 'Explain the working of a centrifugal purifier. How do you select a gravity disc?', type: 'technical', topic: 'Purifiers' },
      { q: 'What is MARPOL? Name all 6 annexes.', type: 'technical', topic: 'Regulations' },
      { q: 'Describe the procedure for launching a lifeboat.', type: 'technical', topic: 'Safety' },
      { q: 'What is a mooring winch? Explain the types.', type: 'technical', topic: 'Deck Machinery' },
      { q: 'Explain the Rules of the Road (COLREG) for crossing situations.', type: 'technical', topic: 'Navigation' },
      { q: 'What are the different types of fire extinguishers on a ship?', type: 'technical', topic: 'Fire Safety' },
      { q: 'Tell me about your family background.', type: 'personal', topic: 'Background' },
      { q: 'What is your academic percentage in 10th, 12th, and graduation?', type: 'personal', topic: 'Academics' },
      { q: 'Why MSC? What do you know about this company?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  /* ═══════════════════════════════════════ */
  maersk: {
    id: 'maersk',
    name: 'Maersk Line / A.P. Moller-Maersk',
    shortName: 'Maersk',
    icon: '⭐',
    color: '#0ea5e9',
    hq: 'Copenhagen, Denmark',
    fleetSize: '700+ vessels',
    vesselTypes: ['Container Ships', 'Tankers', 'Supply Vessels', 'Tugboats'],
    reputation: 'World\'s second-largest container line. Premium employer with excellent training.',
    difficulty: 9,
    website: 'https://www.maersk.com',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply through Maersk careers portal' },
      { stage: 'PLI Test', desc: 'Predictive Learning Indicator: 50 MCQs in 12 minutes (speed + accuracy)' },
      { stage: 'Online Assessments', desc: 'Numerical, verbal, situational judgment, abstract reasoning, personality' },
      { stage: 'Interview', desc: 'Competency-based behavioral interview' },
      { stage: 'Assessment Center', desc: 'Group exercises, presentations, simulations' },
      { stage: 'Medical & Joining', desc: 'Medical fitness followed by placement' }
    ],

    cbtFormat: {
      duration: 12,
      totalQuestions: 50,
      sections: [
        { name: 'PLI (Speed & Accuracy)', questions: 50, weight: 100 }
      ],
      negativeMarking: false,
      passingScore: 70,
      additionalTests: ['Numerical Reasoning', 'Verbal Reasoning', 'Situational Judgment', 'Abstract Reasoning']
    },

    interviewStyle: {
      type: 'Competency-Based Behavioral',
      rounds: ['Personal Assessment', 'Competency Interview', 'Values Alignment'],
      difficulty: 'Hard (Assessment Center)',
      tips: [
        'Use STAR method for behavioral questions (Situation, Task, Action, Result)',
        'Research Maersk\'s values: Constant Care, Humbleness, Uprightness, Our Employees, Our Name',
        'Prepare examples from past experiences demonstrating leadership',
        'Speed and accuracy are critical in PLI — practice timed tests'
      ]
    },

    questionBank: [
      { q: 'Tell me about a time you showed leadership in a challenging situation.', type: 'behavioral', topic: 'Leadership' },
      { q: 'Describe a situation where you had to make a quick decision under pressure.', type: 'behavioral', topic: 'Decision Making' },
      { q: 'How do you prioritize tasks when everything seems urgent?', type: 'behavioral', topic: 'Time Management' },
      { q: 'What are Maersk\'s core values? How do they align with yours?', type: 'personal', topic: 'Company Knowledge' },
      { q: 'Describe your experience with marine propulsion systems.', type: 'technical', topic: 'Propulsion' },
      { q: 'Tell me about a time you resolved a conflict in a team.', type: 'behavioral', topic: 'Teamwork' },
      { q: 'What do you know about Maersk\'s sustainability initiatives?', type: 'personal', topic: 'Company Knowledge' },
      { q: 'How would you handle a situation where a senior colleague made an unsafe decision?', type: 'situational', topic: 'Safety Culture' },
      { q: 'What motivates you to work at sea for extended periods?', type: 'personal', topic: 'Motivation' },
      { q: 'Explain how you would investigate an engine room incident.', type: 'technical', topic: 'Safety Management' }
    ]
  },

  /* ═══════════════════════════════════════ */
  bsm: {
    id: 'bsm',
    name: 'Bernhard Schulte Shipmanagement',
    shortName: 'BSM',
    icon: '🟢',
    color: '#16a34a',
    hq: 'Hamburg, Germany / Singapore',
    fleetSize: '600+ vessels',
    vesselTypes: ['Container Ships', 'Bulk Carriers', 'Tankers', 'LNG Carriers', 'Cruise Ships'],
    reputation: 'Top 3 global ship manager. Good training and fast career progression.',
    difficulty: 6,
    website: 'https://www.bs-shipmanagement.com',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via BSM portal' },
      { stage: 'Written Test (60 min)', desc: '60 MCQs — English, Technical, Reasoning. No negative marking' },
      { stage: 'Personal Interview', desc: 'Personal + Technical with cross-questions' },
      { stage: 'Medical Examination', desc: 'Standard pre-sea medical' },
      { stage: 'Joining', desc: 'Placement on BSM-managed vessels (often fast turnaround)' }
    ],

    cbtFormat: {
      duration: 60,
      totalQuestions: 60,
      sections: [
        { name: 'English Language', questions: 15, weight: 25 },
        { name: 'Technical Knowledge', questions: 30, weight: 50 },
        { name: 'Reasoning & Aptitude', questions: 15, weight: 25 }
      ],
      negativeMarking: false,
      passingScore: 55
    },

    interviewStyle: {
      type: 'Personal + Technical',
      rounds: ['Self Introduction', 'Technical Deep-dive', 'Situational'],
      difficulty: 'Moderate',
      tips: [
        'Focus on auxiliary machinery — boilers, compressors, purifiers',
        'Be ready for cross-questions on your answers',
        'Know turning gear purpose and safety interlocks',
        'Prepare for questions on boiler water testing'
      ]
    },

    questionBank: [
      { q: 'Explain the working of a 2-stage air compressor.', type: 'technical', topic: 'Compressors' },
      { q: 'What is a boiler water test? What parameters are checked?', type: 'technical', topic: 'Boilers' },
      { q: 'What is the purpose of turning gear? What safety interlocks are fitted?', type: 'technical', topic: 'Main Engine' },
      { q: 'Explain the working principle of a turbocharger.', type: 'technical', topic: 'Turbochargers' },
      { q: 'Describe the lubrication system of a marine diesel engine.', type: 'technical', topic: 'Lubrication' },
      { q: 'What are the types of electrical machines on a ship?', type: 'technical', topic: 'Electrical' },
      { q: 'What is the function of an oily water separator? What is the discharge limit?', type: 'technical', topic: 'MARPOL' },
      { q: 'Why do you want to join the Merchant Navy specifically?', type: 'personal', topic: 'Motivation' },
      { q: 'Tell me about a time you faced an emergency. How did you handle it?', type: 'situational', topic: 'Emergency' },
      { q: 'What are your hobbies? How do they help you at sea?', type: 'personal', topic: 'Personality' }
    ]
  },

  /* ═══════════════════════════════════════ */
  synergy: {
    id: 'synergy',
    name: 'Synergy Marine Group',
    shortName: 'Synergy',
    icon: '🔴',
    color: '#dc2626',
    hq: 'Singapore',
    fleetSize: '400+ vessels',
    vesselTypes: ['Bulk Carriers', 'Tankers', 'Container Ships', 'Gas Carriers'],
    reputation: 'Fast-growing ship manager. Own training institute. Strong Indian presence.',
    difficulty: 7,
    website: 'https://www.synergymarinegroup.com',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via Synergy portal' },
      { stage: 'CET Exam (3 hrs)', desc: '200 MCQs — Physics, Chemistry, Math, English, Aptitude. Negative marking (-0.25)' },
      { stage: 'IMU CET Score', desc: 'Must qualify IMUCET' },
      { stage: 'Technical Interview', desc: 'Heavy on thermodynamics and fluid mechanics' },
      { stage: 'Medical Test', desc: 'Standard pre-sea medical' },
      { stage: 'Joining', desc: 'Synergy Maritime Training Institute or DG-approved institute' }
    ],

    cbtFormat: {
      duration: 180,
      totalQuestions: 200,
      sections: [
        { name: 'Physics', questions: 50, weight: 25 },
        { name: 'Chemistry', questions: 30, weight: 15 },
        { name: 'Mathematics', questions: 40, weight: 20 },
        { name: 'English', questions: 40, weight: 20 },
        { name: 'Aptitude & Reasoning', questions: 40, weight: 20 }
      ],
      negativeMarking: true,
      negativeMarkValue: 0.25,
      passingScore: 50
    },

    interviewStyle: {
      type: 'Technical Heavy',
      rounds: ['Personal Background', 'Technical (Thermodynamics focus)', 'Practical Knowledge'],
      difficulty: 'Hard',
      tips: [
        'Master Archimedes\' principle and buoyancy concepts',
        'Be thorough with Pascal\'s law and Bernoulli\'s principle',
        'Know cooling water treatment chemicals and their purposes',
        'Prepare turbocharger components and working thoroughly'
      ]
    },

    questionBank: [
      { q: 'State and explain Archimedes\' principle. How is it applied on ships?', type: 'technical', topic: 'Physics' },
      { q: 'What is Pascal\'s law? Give its applications on a ship.', type: 'technical', topic: 'Physics' },
      { q: 'Explain Bernoulli\'s principle with a practical example.', type: 'technical', topic: 'Fluid Mechanics' },
      { q: 'What chemicals are used for cooling water treatment? Why?', type: 'technical', topic: 'Water Treatment' },
      { q: 'Name the major components of a turbocharger and explain its working.', type: 'technical', topic: 'Turbochargers' },
      { q: 'What are the different types of boiler mountings and fittings?', type: 'technical', topic: 'Boilers' },
      { q: 'Classify and explain the types of rudders used on ships.', type: 'technical', topic: 'Steering' },
      { q: 'What is the first law of thermodynamics? Give its applications.', type: 'technical', topic: 'Thermodynamics' },
      { q: 'Why did you choose marine engineering over other fields?', type: 'personal', topic: 'Motivation' },
      { q: 'What do you know about Synergy Marine Group?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  /* ═══════════════════════════════════════ */
  vships: {
    id: 'vships',
    name: 'V.Ships / V.Group',
    shortName: 'V.Ships',
    icon: '🟣',
    color: '#7c3aed',
    hq: 'Monaco',
    fleetSize: '1000+ vessels',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Offshore', 'Cruise'],
    reputation: 'Largest independent ship manager by fleet. Strong English requirement.',
    difficulty: 7,
    website: 'https://www.vgrouplimited.com',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via V.Group portal' },
      { stage: 'Online Test (12 min)', desc: '50 MCQs — Aptitude, English, Series, Picture Reasoning. No negative marking' },
      { stage: 'APRO Ability Test', desc: 'Proprietary aptitude/reasoning assessment' },
      { stage: 'Marlins English Test', desc: 'Online test + Test of Spoken English (TOSE)' },
      { stage: 'PI & PLI Tests', desc: 'Personality Inventory + Predictive Learning Indicator' },
      { stage: 'Interview Panel', desc: 'Offline interview — ship knowledge, sea routes' },
      { stage: 'ASK Technical Test', desc: '64 questions, must score 80%+. One re-test allowed' },
      { stage: 'Medical & Joining', desc: 'Medical clearance and sponsorship letter' }
    ],

    cbtFormat: {
      duration: 12,
      totalQuestions: 50,
      sections: [
        { name: 'Aptitude', questions: 15, weight: 30 },
        { name: 'English', questions: 15, weight: 30 },
        { name: 'Series Completion', questions: 10, weight: 20 },
        { name: 'Picture Reasoning', questions: 10, weight: 20 }
      ],
      negativeMarking: false,
      passingScore: 60,
      additionalTests: ['ASK Test (64 Qs, 80% pass)', 'Marlins English', 'APRO Test']
    },

    interviewStyle: {
      type: 'Knowledge-Based',
      rounds: ['English Proficiency Check', 'Ship Knowledge', 'Sea Routes & Trade'],
      difficulty: 'Moderate-Hard',
      tips: [
        'English proficiency is CRITICAL — practice spoken English',
        'Know major sea routes and trading areas',
        'Marlins test is pass/fail — Red/Amber/Green grading',
        'ASK Test needs 80% — study technical subjects thoroughly'
      ]
    },

    questionBank: [
      { q: 'Describe the major sea routes between Asia and Europe.', type: 'technical', topic: 'Sea Routes' },
      { q: 'What is the Suez Canal? What are the transit procedures?', type: 'technical', topic: 'Sea Routes' },
      { q: 'Explain the difference between a clarifier and a purifier.', type: 'technical', topic: 'Purifiers' },
      { q: 'What is the ISM Code? Name its 12 elements.', type: 'technical', topic: 'Regulations' },
      { q: 'Describe the engine room ventilation system.', type: 'technical', topic: 'Aux Machinery' },
      { q: 'What is ISPS Code? What are the 3 security levels?', type: 'technical', topic: 'Security' },
      { q: 'How does a fresh water generator work using the vacuum principle?', type: 'technical', topic: 'FWG' },
      { q: 'Explain enclosed space entry procedures.', type: 'technical', topic: 'Safety' },
      { q: 'What experience do you have with different nationalities?', type: 'personal', topic: 'Diversity' },
      { q: 'How do you maintain your English proficiency?', type: 'personal', topic: 'Communication' }
    ]
  },

  /* ═══════════════════════════════════════ */
  thome: {
    id: 'thome',
    name: 'Thome Fleet Management',
    shortName: 'Thome',
    icon: '🟤',
    color: '#92400e',
    hq: 'Singapore',
    fleetSize: '300+ vessels',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Gas Carriers'],
    reputation: 'One of the world\'s largest crew providers. Good salaries, short waiting periods.',
    difficulty: 6,
    website: 'https://www.thome.com.sg',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via Thome portal (Mumbai/Delhi office)' },
      { stage: 'Written Exam', desc: 'Engineering knowledge + English + aptitude' },
      { stage: 'Psychometric Test', desc: 'Personality and aptitude assessment' },
      { stage: 'Interview', desc: 'General + Technical questions' },
      { stage: 'Medical & Joining', desc: 'Short waiting periods for experienced personnel' }
    ],

    cbtFormat: {
      duration: 60,
      totalQuestions: 50,
      sections: [
        { name: 'Engineering Knowledge', questions: 25, weight: 50 },
        { name: 'English Language', questions: 15, weight: 30 },
        { name: 'Aptitude', questions: 10, weight: 20 }
      ],
      negativeMarking: false,
      passingScore: 55
    },

    interviewStyle: {
      type: 'General + Technical',
      rounds: ['Personal Background', 'Technical Assessment', 'Company Fit'],
      difficulty: 'Moderate',
      tips: [
        'Be clear about 2-stroke vs 4-stroke engine differences',
        'Know various pump types and their applications',
        'Be able to draw a FW generator diagram from memory',
        'Good communication skills are highly valued'
      ]
    },

    questionBank: [
      { q: 'Explain the differences between 2-stroke and 4-stroke marine diesel engines.', type: 'technical', topic: 'Diesel Engines' },
      { q: 'What are the different types of pumps? Give their applications.', type: 'technical', topic: 'Pumps' },
      { q: 'Draw and explain a fresh water generator diagram.', type: 'technical', topic: 'FWG' },
      { q: 'How does a turbocharger improve engine efficiency?', type: 'technical', topic: 'Turbochargers' },
      { q: 'What is scavenging? Explain the types.', type: 'technical', topic: 'Main Engine' },
      { q: 'What is the function of a governor on a diesel engine?', type: 'technical', topic: 'Engine Controls' },
      { q: 'Explain the working of a stern tube bearing.', type: 'technical', topic: 'Propeller Shaft' },
      { q: 'Why did you choose a career in the merchant navy?', type: 'personal', topic: 'Motivation' },
      { q: 'What kind of leadership style would you adopt on a ship?', type: 'personal', topic: 'Leadership' },
      { q: 'What do you know about Thome Fleet Management?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  /* ═══════════════════════════════════════ */
  wallem: {
    id: 'wallem',
    name: 'Wallem Group',
    shortName: 'Wallem',
    icon: '⚪',
    color: '#475569',
    hq: 'Hong Kong',
    fleetSize: '200+ vessels',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Gas Carriers'],
    reputation: 'Premium employer with high interview standards (8/10 difficulty). Good US visa support.',
    difficulty: 8,
    website: 'https://www.wallem.com',

    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via Wallem careers portal' },
      { stage: 'ISF Written Test (CBT)', desc: 'Administered by ISF Mumbai. Physics, Math, English, Logic, EQ' },
      { stage: 'Psychometric & Aptitude', desc: 'Personality and aptitude assessment' },
      { stage: 'Personal Interview', desc: 'Comprehensive — fire safety, LSA, ship construction, ECDIS' },
      { stage: 'Medical + Eyesight Test', desc: 'MMD medical + eyesight test' },
      { stage: 'Joining', desc: 'Sponsorship with berth assurance (subject to vacancies + US visa)' }
    ],

    cbtFormat: {
      duration: 90,
      totalQuestions: 80,
      sections: [
        { name: 'Physics', questions: 20, weight: 25 },
        { name: 'Mathematics', questions: 20, weight: 25 },
        { name: 'English Language', questions: 15, weight: 18 },
        { name: 'Logical Reasoning', questions: 15, weight: 18 },
        { name: 'Emotional Quotient', questions: 10, weight: 14 }
      ],
      negativeMarking: false,
      passingScore: 60
    },

    interviewStyle: {
      type: 'Comprehensive (All-round)',
      rounds: ['Personal Assessment', 'Technical Deep-dive', 'Safety & Regulations', 'Situational Judgment'],
      difficulty: 'Very Hard (8/10)',
      tips: [
        'Know fire safety equipment and procedures in detail',
        'Be thorough with LSA (Life Saving Appliances) regulations',
        'Prepare for ship construction and stability questions',
        'ECDIS knowledge is tested — know basic operations',
        'Expect the interview to last longer than most companies'
      ]
    },

    questionBank: [
      { q: 'Name all types of fire extinguishers on a ship and their color coding.', type: 'technical', topic: 'Fire Safety' },
      { q: 'What are the requirements for lifeboat equipment as per SOLAS?', type: 'technical', topic: 'LSA' },
      { q: 'Explain the construction of a ship\'s double bottom.', type: 'technical', topic: 'Ship Construction' },
      { q: 'What is ECDIS? What are its advantages over paper charts?', type: 'technical', topic: 'Navigation' },
      { q: 'Describe the enclosed space entry procedure step by step.', type: 'technical', topic: 'Safety' },
      { q: 'What is the cargo securing manual? When is it referred to?', type: 'technical', topic: 'Cargo' },
      { q: 'Explain the bridge watchkeeping procedures as per STCW.', type: 'technical', topic: 'Watchkeeping' },
      { q: 'What actions would you take if you discover a fire in the engine room?', type: 'situational', topic: 'Emergency' },
      { q: 'How would you handle a medical emergency at sea with no doctor onboard?', type: 'situational', topic: 'Emergency' },
      { q: 'What do you know about Wallem Group and its fleet?', type: 'personal', topic: 'Company Knowledge' }
    ]
  }
};
