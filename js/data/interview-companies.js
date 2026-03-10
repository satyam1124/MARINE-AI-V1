/* MarineIQ — Interview & CBT Preparation: Company Profiles (Enriched)
   17 shipping companies with CBT formats, interview patterns, question banks,
   and deep company knowledge (history, innovations, fleet details, motto)
   DO NOT add logic here — data only */

const INTERVIEW_COMPANIES = {

  anglo: {
    id: 'anglo', name: 'Anglo Eastern Ship Management', shortName: 'Anglo Eastern',
    icon: '<img src="https://www.google.com/s2/favicons?domain=angloeastern.com&sz=128" class="company-logo-img" alt="angloeastern">', color: '#1e40af', hq: 'Hong Kong', fleetSize: '600+ vessels',
    vesselTypes: ['Bulk Carriers', 'Tankers', 'Container Ships', 'Gas Carriers', 'Offshore'],
    difficulty: 8, website: 'https://www.angloeastern.com',
    companyKnowledge: {
      founded: 1974, motto: 'Safe, Efficient and Reliable Ship Management',
      history: 'Founded in 1974 in Hong Kong. Grew from a small ship management firm to one of the world\'s largest independent ship managers. Now manages 600+ vessels across all major vessel types. Has its own Maritime Academy (AEMA) in Mumbai and Karjat.',
      keyFacts: ['One of the top 3 largest independent ship managers globally','Operates Anglo Eastern Maritime Academy (AEMA) — one of the best training facilities in India','Manages vessels for 100+ shipowners worldwide','Strong focus on digitalization with in-house Fleet Management System','ISO 9001, ISO 14001, ISO 45001 certified'],
      innovation: 'Pioneered digital fleet management systems. Uses AI-based predictive maintenance across fleet. Developed proprietary e-learning platform for crew training. Early adopter of remote engine performance monitoring.',
      sustainability: 'Committed to IMO 2050 decarbonization targets. Implementing energy-efficient hull coatings, LED lighting upgrades, and waste heat recovery systems. Active fleet optimization program reducing fuel consumption.',
      impressInterviewer: ['Mention AEMA and their comprehensive training programs','Know that they are one of the largest independent (non-state) ship managers','Discuss their digital fleet management initiatives','Reference their safety record and zero-incident goals']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via Anglo Eastern careers portal' },
      { stage: 'Written Test (2 hrs)', desc: 'Engineering, English, Aptitude, Spatial Relations, GK' },
      { stage: 'Psychometric Test (1 hr)', desc: '240 questions — personality & aptitude' },
      { stage: 'Personal Interview', desc: 'Technical + personal (Mumbai/Delhi)' },
      { stage: 'Medical Examination', desc: 'Standard pre-sea medical fitness' },
      { stage: 'Joining', desc: 'Placement via AEMA or DG-approved institute' }
    ],
    cbtFormat: { duration: 120, totalQuestions: 100, sections: [
      { name: 'Engineering Knowledge', questions: 30, weight: 30 },
      { name: 'English Language', questions: 20, weight: 20 },
      { name: 'Mechanical Aptitude', questions: 20, weight: 20 },
      { name: 'Spatial Relations', questions: 15, weight: 15 },
      { name: 'General Knowledge', questions: 15, weight: 15 }
    ], negativeMarking: false, passingScore: 60, psychometric: { questions: 240, duration: 60 } },
    interviewStyle: { type: 'Technical + Personal', rounds: ['Personal Background', 'Technical Engineering', 'Situational'], difficulty: 'Rigorous',
      tips: ['Be thorough with VCRS cycle and refrigerants','Expect cross-questions on diesel engine valve timing','Know your physics fundamentals (classes 9-12)','Prepare neat diagrams for 2-stroke and 4-stroke engines'] },
    questionBank: [
      { q: 'Explain the VCRS cycle with a diagram.', type: 'technical', topic: 'Refrigeration' },
      { q: 'What are the main parts of a 4-stroke diesel engine?', type: 'technical', topic: 'Diesel Engines' },
      { q: 'Draw the valve timing diagram of a 4-stroke engine.', type: 'technical', topic: 'Diesel Engines' },
      { q: 'Classify different types of pumps used on ships.', type: 'technical', topic: 'Pumps' },
      { q: 'Difference between centrifugal and PD pump?', type: 'technical', topic: 'Pumps' },
      { q: 'Name common marine refrigerants. What is R-134a?', type: 'technical', topic: 'Refrigeration' },
      { q: 'What is moment of inertia? Give examples.', type: 'technical', topic: 'Physics' },
      { q: 'Explain Newton\'s three laws with examples.', type: 'technical', topic: 'Physics' },
      { q: 'How does a fresh water generator work?', type: 'technical', topic: 'Aux Machinery' },
      { q: 'Why do you want to join the Merchant Navy?', type: 'personal', topic: 'Motivation' }
    ]
  },

  msc: {
    id: 'msc', name: 'MSC Ship Management', shortName: 'MSC',
    icon: '<img src="https://www.google.com/s2/favicons?domain=msc.com&sz=128" class="company-logo-img" alt="msc">', color: '#ca8a04', hq: 'Geneva, Switzerland', fleetSize: '800+ vessels',
    vesselTypes: ['Container Ships', 'Cruise Ships', 'Tankers', 'Bulk Carriers'],
    difficulty: 7, website: 'https://www.msc.com',
    companyKnowledge: {
      founded: 1970, motto: 'We Move the World',
      history: 'Founded by Captain Gianluigi Aponte in 1970 with a single vessel. Grew into the world\'s largest container shipping line surpassing Maersk in January 2022. Family-owned private company. MSC Cruises is the 3rd largest cruise line globally.',
      keyFacts: ['World\'s #1 container shipping line (surpassed Maersk in 2022)','Family-owned and privately held — Captain Aponte still involved','Operates MSC Cruises — 3rd largest cruise company','Over 800 vessels, 675+ container ships','Serves 520+ ports in 155 countries'],
      innovation: 'Investing heavily in dual-fuel LNG-powered mega container ships. Building methanol-ready newbuilds. Uses digital twin technology for fleet optimization. Pioneered the concept of 23,000+ TEU Ultra Large Container Vessels.',
      sustainability: 'Net-zero by 2050 target. Collaborating with Shell for zero-emission fuels. Investing $1B+ in green technologies. Testing wind-assisted propulsion and biofuel blends.',
      impressInterviewer: ['Know they surpassed Maersk as #1 container line in 2022','Mention Captain Gianluigi Aponte as founder','Reference their investment in LNG and methanol-ready vessels','Discuss the family-owned nature — unique for a company this size']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply through MSC portal' },
      { stage: 'Online Written Exam', desc: 'AI-proctored (camera required)' },
      { stage: 'IMU CET Score', desc: 'Valid IMU CET rank required' },
      { stage: 'Medical Test', desc: 'Standard pre-sea medical' },
      { stage: 'Physical Interview', desc: 'Technical + personal assessment' },
      { stage: 'Joining', desc: 'Placement on MSC-managed vessels' }
    ],
    cbtFormat: { duration: 90, totalQuestions: 80, sections: [
      { name: 'Marine Machinery', questions: 25, weight: 30 },
      { name: 'Safety & Regulations', questions: 20, weight: 25 },
      { name: 'Navigation Basics', questions: 15, weight: 20 },
      { name: 'English & Aptitude', questions: 20, weight: 25 }
    ], negativeMarking: false, passingScore: 60, proctored: true },
    interviewStyle: { type: 'Technical + Personal', rounds: ['Self Introduction', 'Technical Questions', 'Situational'], difficulty: 'Moderate-Hard',
      tips: ['Know alternator paralleling conditions','Prepare purifier gravity disc selection','Study MARPOL annexes thoroughly','Explain lifeboat launching procedure'] },
    questionBank: [
      { q: 'How does an alternator work? Paralleling conditions?', type: 'technical', topic: 'Electrical' },
      { q: 'Working of a centrifugal purifier. Gravity disc selection?', type: 'technical', topic: 'Purifiers' },
      { q: 'What is MARPOL? Name all 6 annexes.', type: 'technical', topic: 'Regulations' },
      { q: 'Describe lifeboat launching procedure.', type: 'technical', topic: 'Safety' },
      { q: 'What is a mooring winch? Types?', type: 'technical', topic: 'Deck Machinery' },
      { q: 'Fire extinguisher types on a ship?', type: 'technical', topic: 'Fire Safety' },
      { q: 'Why MSC? What do you know about this company?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  maersk: {
    id: 'maersk', name: 'A.P. Moller-Maersk', shortName: 'Maersk',
    icon: '<img src="https://www.google.com/s2/favicons?domain=maersk.com&sz=128" class="company-logo-img" alt="maersk">', color: '#0ea5e9', hq: 'Copenhagen, Denmark', fleetSize: '700+ vessels',
    vesselTypes: ['Container Ships', 'Tankers', 'Supply Vessels', 'Tugboats'],
    difficulty: 9, website: 'https://www.maersk.com',
    companyKnowledge: {
      founded: 1904, motto: 'Constant Care — take care of today, actively prepare for tomorrow',
      history: 'Founded in 1904 by A.P. Møller and his father in Svendborg, Denmark. The seven-pointed star logo represents navigation by the stars. Was the world\'s #1 container line from 1996-2022. Acquired Hamburg Süd in 2017. Now transforming into an integrated logistics company.',
      keyFacts: ['Founded 1904 — over 120 years of maritime heritage','The white star on blue background is one of the most recognized maritime logos','5 core values: Constant Care, Humbleness, Uprightness, Our Employees, Our Name','Transforming from a shipping company to end-to-end logistics integrator','Ordered world\'s first methanol-powered container ships (2021)'],
      innovation: 'World\'s first company to order methanol-powered container vessels. Investing in green methanol production. Developing carbon capture technology. Using AI for predictive analytics in supply chains. Pioneer in remote container management (RCM).',
      sustainability: 'Industry\'s most ambitious target: net-zero by 2040 (10 years before IMO). Already operating methanol-powered vessels. Invested in green e-methanol production facilities. Carbon intensity reduced 45% since 2007.',
      impressInterviewer: ['Know their 5 core values by heart — especially Constant Care','Mention the methanol-powered container ship order (world first)','Reference their transformation from shipping to integrated logistics','Discuss the 7-pointed star logo history and its meaning']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply through Maersk careers portal' },
      { stage: 'PLI Test', desc: '50 MCQs in 12 minutes (speed + accuracy)' },
      { stage: 'Online Assessments', desc: 'Numerical, verbal, situational, abstract, personality' },
      { stage: 'Interview', desc: 'Competency-based behavioral' },
      { stage: 'Assessment Center', desc: 'Group exercises, presentations, simulations' },
      { stage: 'Medical & Joining', desc: 'Medical fitness followed by placement' }
    ],
    cbtFormat: { duration: 12, totalQuestions: 50, sections: [
      { name: 'PLI (Speed & Accuracy)', questions: 50, weight: 100 }
    ], negativeMarking: false, passingScore: 70, additionalTests: ['Numerical Reasoning', 'Verbal Reasoning', 'Situational Judgment', 'Abstract Reasoning'] },
    interviewStyle: { type: 'Competency-Based Behavioral', rounds: ['Personal Assessment', 'Competency Interview', 'Values Alignment'], difficulty: 'Hard (Assessment Center)',
      tips: ['Use STAR method (Situation, Task, Action, Result)','Know Maersk\'s values: Constant Care, Humbleness, Uprightness, Our Employees, Our Name','Prepare examples demonstrating leadership','Speed is critical in PLI — practice timed tests'] },
    questionBank: [
      { q: 'Tell me about a time you showed leadership in a challenge.', type: 'behavioral', topic: 'Leadership' },
      { q: 'Describe a quick decision you made under pressure.', type: 'behavioral', topic: 'Decision Making' },
      { q: 'What are Maersk\'s core values? How do they align with yours?', type: 'personal', topic: 'Company Knowledge' },
      { q: 'How would you handle a senior colleague making an unsafe decision?', type: 'situational', topic: 'Safety Culture' },
      { q: 'What motivates you to work at sea for extended periods?', type: 'personal', topic: 'Motivation' }
    ]
  },

  bsm: {
    id: 'bsm', name: 'Bernhard Schulte Shipmanagement', shortName: 'BSM',
    icon: '<img src="https://www.google.com/s2/favicons?domain=bs-shipmanagement.com&sz=128" class="company-logo-img" alt="bs-shipmanagement">', color: '#16a34a', hq: 'Hamburg / Singapore', fleetSize: '600+ vessels',
    vesselTypes: ['Container Ships', 'Bulk Carriers', 'Tankers', 'LNG Carriers', 'Cruise Ships'],
    difficulty: 6, website: 'https://www.bs-shipmanagement.com',
    companyKnowledge: {
      founded: 1883, motto: 'Excellence in Ship Management',
      history: 'Part of the Schulte Group, founded in 1883 by Bernhard Schulte in Papenburg, Germany. Over 140 years of maritime heritage. One of the top 3 third-party ship managers globally. The Schulte family remains deeply involved in the business.',
      keyFacts: ['Over 140 years of maritime tradition (since 1883)','Top 3 global third-party ship managers','Part of the Schulte Group which also includes Hanseatic Tankers and MPC Capital','Fast career progression — known for quick crew rotation','Operates BSM Maritime Academy in the Philippines'],
      innovation: 'Developed MariApps — in-house fleet management technology. Uses digital monitoring for real-time vessel performance. Invested in autonomous shipping research. Early implementer of ECDIS across fleet.',
      sustainability: 'Fleet optimization for fuel efficiency. SOx scrubber installations across fleet. Ballast water management system compliance ahead of schedule. Shore power connectivity on container vessels.',
      impressInterviewer: ['Know the Schulte Group history since 1883','Mention MariApps — their proprietary digital platform','Reference their fast crew rotation and career progression','Discuss their diverse fleet including LNG and cruise ships']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via BSM portal' },
      { stage: 'Written Test (60 min)', desc: '60 MCQs — English, Technical, Reasoning. No negative marking' },
      { stage: 'Personal Interview', desc: 'Personal + Technical with cross-questions' },
      { stage: 'Medical Examination', desc: 'Standard pre-sea medical' },
      { stage: 'Joining', desc: 'Fast turnaround placement' }
    ],
    cbtFormat: { duration: 60, totalQuestions: 60, sections: [
      { name: 'English Language', questions: 15, weight: 25 },
      { name: 'Technical Knowledge', questions: 30, weight: 50 },
      { name: 'Reasoning & Aptitude', questions: 15, weight: 25 }
    ], negativeMarking: false, passingScore: 55 },
    interviewStyle: { type: 'Personal + Technical', rounds: ['Self Introduction', 'Technical Deep-dive', 'Situational'], difficulty: 'Moderate',
      tips: ['Focus on aux machinery — boilers, compressors, purifiers','Be ready for cross-questions','Know turning gear purpose and safety interlocks','Prepare boiler water testing questions'] },
    questionBank: [
      { q: 'Explain the working of a 2-stage air compressor.', type: 'technical', topic: 'Compressors' },
      { q: 'What is boiler water test? Parameters checked?', type: 'technical', topic: 'Boilers' },
      { q: 'Purpose of turning gear? Safety interlocks?', type: 'technical', topic: 'Main Engine' },
      { q: 'Working principle of a turbocharger.', type: 'technical', topic: 'Turbochargers' },
      { q: 'Function of oily water separator? Discharge limit?', type: 'technical', topic: 'MARPOL' },
      { q: 'Why do you want to join the Merchant Navy?', type: 'personal', topic: 'Motivation' }
    ]
  },

  synergy: {
    id: 'synergy', name: 'Synergy Marine Group', shortName: 'Synergy',
    icon: '<img src="https://www.google.com/s2/favicons?domain=synergymarinegroup.com&sz=128" class="company-logo-img" alt="synergymarinegroup">', color: '#dc2626', hq: 'Singapore', fleetSize: '400+ vessels',
    vesselTypes: ['Bulk Carriers', 'Tankers', 'Container Ships', 'Gas Carriers'],
    difficulty: 7, website: 'https://www.synergymarinegroup.com',
    companyKnowledge: {
      founded: 2006, motto: 'Setting a New Standard in Ship Management',
      history: 'Founded in 2006 in Singapore by Captain Rajesh Unni. One of the fastest-growing ship managers in the world. Grew from 0 to 400+ vessels in under 20 years. Operates Synergy Maritime Training Institute.',
      keyFacts: ['One of the fastest-growing ship managers ever','Founded by Captain Rajesh Unni — a marine industry visionary','Operates its own training institute — Synergy Maritime Training Institute','Strong Indian presence with Mumbai office for crewing','Known for competitive CET exam with negative marking'],
      innovation: 'SynergyOne digital platform for fleet management. AI-based energy optimization. Drone inspections for tank surveys. Digital twin technology for engine rooms.',
      sustainability: 'Fleet carbon intensity benchmarking. Energy-efficient vessel operations. Methanol and LNG fuel research. Active participation in Singapore Maritime Green Initiative.',
      impressInterviewer: ['Know founder Captain Rajesh Unni','Mention their rapid growth story (0 to 400+ in ~18 years)','Reference SynergyOne digital platform','Discuss their training institute and knowledge-sharing culture']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via Synergy portal' },
      { stage: 'CET Exam (3 hrs)', desc: '200 MCQs — Physics, Chemistry, Math, English, Aptitude. -0.25 negative marking' },
      { stage: 'IMU CET Score', desc: 'Must qualify IMUCET' },
      { stage: 'Technical Interview', desc: 'Heavy on thermodynamics' },
      { stage: 'Medical Test', desc: 'Standard pre-sea medical' },
      { stage: 'Joining', desc: 'Via Synergy Maritime Training Institute' }
    ],
    cbtFormat: { duration: 180, totalQuestions: 200, sections: [
      { name: 'Physics', questions: 50, weight: 25 },
      { name: 'Chemistry', questions: 30, weight: 15 },
      { name: 'Mathematics', questions: 40, weight: 20 },
      { name: 'English', questions: 40, weight: 20 },
      { name: 'Aptitude & Reasoning', questions: 40, weight: 20 }
    ], negativeMarking: true, negativeMarkValue: 0.25, passingScore: 50 },
    interviewStyle: { type: 'Technical Heavy', rounds: ['Personal Background', 'Technical (Thermodynamics)', 'Practical Knowledge'], difficulty: 'Hard',
      tips: ['Master Archimedes\' principle and buoyancy','Know Pascal\'s law and Bernoulli\'s principle','Cooling water treatment chemicals','Turbocharger components thoroughly'] },
    questionBank: [
      { q: 'State Archimedes\' principle. Ship application?', type: 'technical', topic: 'Physics' },
      { q: 'What is Pascal\'s law? Ship applications?', type: 'technical', topic: 'Physics' },
      { q: 'Explain Bernoulli\'s principle with example.', type: 'technical', topic: 'Fluid Mechanics' },
      { q: 'Cooling water treatment chemicals? Why?', type: 'technical', topic: 'Water Treatment' },
      { q: 'Turbocharger components and working?', type: 'technical', topic: 'Turbochargers' },
      { q: 'What do you know about Synergy Marine?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  vships: {
    id: 'vships', name: 'V.Ships / V.Group', shortName: 'V.Ships',
    icon: '<img src="https://www.google.com/s2/favicons?domain=vgrouplimited.com&sz=128" class="company-logo-img" alt="vgrouplimited">', color: '#7c3aed', hq: 'Monaco', fleetSize: '1000+ vessels',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Offshore', 'Cruise'],
    difficulty: 7, website: 'https://www.vgrouplimited.com',
    companyKnowledge: {
      founded: 1984, motto: 'Mastering the Maritime Challenges of Tomorrow',
      history: 'Founded in 1984 in Monaco. Grew to become the world\'s largest independent ship manager by fleet size (1000+ vessels). Rebranded as V.Group in 2017. Provides full range of maritime services including ship management, marine services, and shore-based solutions.',
      keyFacts: ['World\'s largest independent ship manager by fleet count (1000+)','Headquartered in Monaco — global tax-efficient maritime hub','Strong emphasis on English proficiency — Marlins test is mandatory','ASK Technical Test requires 80% — high technical bar','Employs 45,000+ seafarers and 3,000+ shore staff'],
      innovation: 'Developed V.Insights data analytics platform. Uses IoT sensors for real-time machinery monitoring. Cloud-based fleet performance management. Pioneered standardized technical management across diverse fleet types.',
      sustainability: 'EU MRV and IMO DCS compliance. Energy efficiency programs across fleet. Ballast water management ahead of schedule. Carbon footprint reduction through voyage optimization.',
      impressInterviewer: ['Know they are the largest independent ship manager','Mention V.Group rebrand and full-service maritime approach','Reference V.Insights analytics platform','Highlight willingness to pass Marlins English test']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via V.Group portal' },
      { stage: 'Online Test (12 min)', desc: '50 MCQs — Aptitude, English, Series, Picture Reasoning' },
      { stage: 'APRO + Marlins Tests', desc: 'Aptitude/reasoning + Test of Spoken English' },
      { stage: 'Interview Panel', desc: 'Ship knowledge, sea routes' },
      { stage: 'ASK Technical Test', desc: '64 Qs, must score 80%' },
      { stage: 'Medical & Joining', desc: 'Medical clearance and sponsorship' }
    ],
    cbtFormat: { duration: 12, totalQuestions: 50, sections: [
      { name: 'Aptitude', questions: 15, weight: 30 },
      { name: 'English', questions: 15, weight: 30 },
      { name: 'Series Completion', questions: 10, weight: 20 },
      { name: 'Picture Reasoning', questions: 10, weight: 20 }
    ], negativeMarking: false, passingScore: 60, additionalTests: ['ASK Test (64 Qs, 80% pass)', 'Marlins English', 'APRO Test'] },
    interviewStyle: { type: 'Knowledge-Based', rounds: ['English Proficiency', 'Ship Knowledge', 'Sea Routes'], difficulty: 'Moderate-Hard',
      tips: ['English proficiency is CRITICAL','Know major sea routes and trading areas','Marlins test is pass/fail','ASK Test needs 80% — study thoroughly'] },
    questionBank: [
      { q: 'Major sea routes between Asia and Europe?', type: 'technical', topic: 'Sea Routes' },
      { q: 'What is ISM Code? Name 12 elements.', type: 'technical', topic: 'Regulations' },
      { q: 'What is ISPS Code? 3 security levels?', type: 'technical', topic: 'Security' },
      { q: 'Enclosed space entry procedures?', type: 'technical', topic: 'Safety' },
      { q: 'How do you maintain English proficiency?', type: 'personal', topic: 'Communication' }
    ]
  },

  thome: {
    id: 'thome', name: 'Thome Fleet Management', shortName: 'Thome',
    icon: '<img src="https://www.google.com/s2/favicons?domain=osmthome.com&sz=128" class="company-logo-img" alt="osmthome">', color: '#92400e', hq: 'Singapore', fleetSize: '300+ vessels',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Gas Carriers'],
    difficulty: 6, website: 'https://www.thome.com.sg',
    companyKnowledge: {
      founded: 1963, motto: 'Trusted Maritime Partner',
      history: 'Founded in 1963 in Norway by the Thome family. Relocated HQ to Singapore in 1988. Merged with OSM Maritime Group in 2022 to form OSM Thome — one of the largest ship managers globally. Known for short waiting periods and good salaries.',
      keyFacts: ['Over 60 years of maritime heritage (since 1963)','Merged with OSM Maritime in 2022 to form OSM Thome','One of the world\'s largest crew providers','Known for short waiting periods for experienced crew','Offices in Mumbai and Delhi for Indian crew operations'],
      innovation: 'Digital technical management systems. Predictive maintenance using BigData. Fleet performance monitoring dashboards. Remote survey capabilities.',
      sustainability: 'Fleet carbon footprint monitoring. Energy-efficient vessel operations. Ballast water treatment systems. Compliance with all IMO 2020 sulphur regulations.',
      impressInterviewer: ['Know the OSM Thome merger story','Mention their Norwegian roots and Singapore HQ','Reference their reputation for short waiting periods','Discuss their crew-centric approach and welfare focus']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via Thome portal' },
      { stage: 'Written Exam', desc: 'Engineering + English + Aptitude' },
      { stage: 'Psychometric Test', desc: 'Personality and aptitude' },
      { stage: 'Interview', desc: 'General + Technical' },
      { stage: 'Medical & Joining', desc: 'Short waiting periods for experienced' }
    ],
    cbtFormat: { duration: 60, totalQuestions: 50, sections: [
      { name: 'Engineering Knowledge', questions: 25, weight: 50 },
      { name: 'English Language', questions: 15, weight: 30 },
      { name: 'Aptitude', questions: 10, weight: 20 }
    ], negativeMarking: false, passingScore: 55 },
    interviewStyle: { type: 'General + Technical', rounds: ['Personal Background', 'Technical Assessment', 'Company Fit'], difficulty: 'Moderate',
      tips: ['Be clear about 2-stroke vs 4-stroke differences','Know pump types and applications','Draw FW generator diagram from memory','Good communication skills valued'] },
    questionBank: [
      { q: '2-stroke vs 4-stroke engine differences?', type: 'technical', topic: 'Diesel Engines' },
      { q: 'Types of pumps and applications?', type: 'technical', topic: 'Pumps' },
      { q: 'Draw and explain FW generator diagram.', type: 'technical', topic: 'FWG' },
      { q: 'How does turbocharger improve efficiency?', type: 'technical', topic: 'Turbochargers' },
      { q: 'What do you know about Thome/OSM Thome?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  wallem: {
    id: 'wallem', name: 'Wallem Group', shortName: 'Wallem',
    icon: '<img src="https://www.google.com/s2/favicons?domain=wallem.com&sz=128" class="company-logo-img" alt="wallem">', color: '#475569', hq: 'Hong Kong', fleetSize: '200+ vessels',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Gas Carriers'],
    difficulty: 8, website: 'https://www.wallem.com',
    companyKnowledge: {
      founded: 1903, motto: 'Reliable Maritime Solutions Since 1903',
      history: 'Founded in 1903 by G.H. Wallem in Bergen, Norway. One of the oldest ship management companies in the world. Moved to Hong Kong in the 1960s. Now owned by Japan\'s MOL Group. Known for premium employer status and comprehensive interview process.',
      keyFacts: ['Over 120 years of maritime heritage (since 1903)','Now owned by MOL (Mitsui O.S.K. Lines)','Known for very thorough interview process (difficulty 8/10)','Provides US visa support for crew on US-trading vessels','ISF Mumbai administers their written CBT test'],
      innovation: 'Integrated digital fleet management. AI-based maintenance scheduling. Remote engine diagnostics. ECDIS proficiency training programs.',
      sustainability: 'Fleet energy performance monitoring. Hull and propeller performance optimization. SEEMP compliance. Sulphur cap compliance across fleet.',
      impressInterviewer: ['Know their 120+ year history from Norway to Hong Kong','Mention MOL Group ownership','Reference their US visa support policies','Discuss their reputation as premium employer with high standards']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Submit via Wallem careers' },
      { stage: 'ISF Written Test', desc: 'Physics, Math, English, Logic, EQ' },
      { stage: 'Psychometric & Aptitude', desc: 'Personality assessment' },
      { stage: 'Personal Interview', desc: 'Comprehensive — fire safety, LSA, ECDIS' },
      { stage: 'Medical + Eyesight', desc: 'MMD medical + eyesight test' },
      { stage: 'Joining', desc: 'Sponsorship with berth assurance' }
    ],
    cbtFormat: { duration: 90, totalQuestions: 80, sections: [
      { name: 'Physics', questions: 20, weight: 25 },
      { name: 'Mathematics', questions: 20, weight: 25 },
      { name: 'English Language', questions: 15, weight: 18 },
      { name: 'Logical Reasoning', questions: 15, weight: 18 },
      { name: 'Emotional Quotient', questions: 10, weight: 14 }
    ], negativeMarking: false, passingScore: 60 },
    interviewStyle: { type: 'Comprehensive', rounds: ['Personal', 'Technical Deep-dive', 'Safety & Regulations', 'Situational'], difficulty: 'Very Hard (8/10)',
      tips: ['Know fire safety equipment in detail','LSA regulations thoroughly','Ship construction and stability','ECDIS knowledge is tested'] },
    questionBank: [
      { q: 'Fire extinguisher types and color coding?', type: 'technical', topic: 'Fire Safety' },
      { q: 'SOLAS requirements for lifeboat equipment?', type: 'technical', topic: 'LSA' },
      { q: 'Ship\'s double bottom construction?', type: 'technical', topic: 'Ship Construction' },
      { q: 'What is ECDIS? Advantages over paper charts?', type: 'technical', topic: 'Navigation' },
      { q: 'What do you know about Wallem Group?', type: 'personal', topic: 'Company Knowledge' }
    ]
  }
};
