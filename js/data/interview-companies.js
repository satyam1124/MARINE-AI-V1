/* MarineIQ — Interview & CBT Preparation: Company Profiles (Enriched)
   17 shipping companies with CBT formats, interview patterns, question banks,
   and deep company knowledge (history, innovations, fleet details, motto)
   DO NOT add logic here — data only */

const INTERVIEW_COMPANIES = {

  anglo: {
    id: 'anglo', name: 'Anglo Eastern Ship Management', shortName: 'Anglo Eastern',
    icon: '<img src="css/img/anglo-logo.png" class="company-logo-img" style="background:white;padding:4px;border-radius:8px;object-fit:contain" alt="anglo-eastern">', color: '#10b981', hq: 'Hong Kong', fleetSize: '700+ vessels, 4.4M TEU capacity',
    vesselTypes: ['Bulk Carriers', 'Tankers', 'Container Ships', 'Gas Carriers', 'Offshore'],
    difficulty: 8, website: 'https://www.angloeastern.com',
    companyKnowledge: {
      founded: 1974, motto: 'Shaping a Better Maritime Future',
      history: 'Incorporated in Hong Kong in August 1974. Grew through key mergers — Denholm Ship Management (2001) and Univan Ship Management (2015) — to become one of the world\'s top 3 independent ship managers with 700+ vessels. Acquired SeaQuest Marine (2022) for newbuilding capabilities and CMI Leisure for cruise management. Acquired Euronav Ship Management Hellas (2024) expanding into Greece. Owns Anglo-Eastern Maritime Academy (AEMA) in Karjat, India (founded 2009) and Anglo-Eastern Maritime Training Centre (AEMTC) in Mumbai (founded 2000). Operates the Fleet Performance Centre (AEFPC) for data-driven safety and performance. First ammonia-fuelled ship training completed. First LNG dual-fuel bulk carrier under management (MV Ubuntu Empathy, 190K dwt, 35% lower carbon). 150+ Starlink installations deployed across fleet.',
      keyFacts: ['One of the top 3 largest independent ship managers globally — 700+ vessels','Owns AEMA (Karjat) for pre-sea training + AEMTC (Mumbai) for post-sea courses','Values: Having the courage to do what is right, Progressively setting the standard, Nurturing our people and communities','my.angloeastern client portal provides real-time fleet transparency to shipowners','Fleet Performance Centre (AEFPC) uses data analytics for safety and efficiency','Acquired Euronav Ship Management Hellas (2024) — expanding into Greece','Deployed 150+ Starlink installations for crew connectivity','First vessel fully manned by AEMA officers (Jul 2024)'],
      innovation: 'Pioneered dual-fuel LNG vessel management (first LNG bulk carrier MV Ubuntu Empathy with 35% reduced carbon). Preparing for first ammonia-fuelled ship management. my.angloeastern client portal for real-time fleet transparency. Fleet Performance Centre (AEFPC) leverages big data for safety and performance optimization. Deployed Starlink connectivity across 150+ vessels. Sea Sourcing procurement JV with Seaspan for vendor negotiation scale.',
      sustainability: 'Published ESG Report 2024: Shaping a Sustainable Maritime Future. Joined Maritime Just Transition Task Force (established at COP26) for equitable green transition. Managing dual-fuel LNG vessels with 35% lower carbon footprint. Preparing for ammonia-fuelled ship operations. Active decarbonization strategy through SAPS (carbon regulation into commercial advantage).',
      impressInterviewer: ['Know their 3 core values: Courage to do what is right, Progressively setting the standard, Nurturing people and communities','Mention MV Ubuntu Empathy — first LNG dual-fuel bulk carrier (190K dwt, 35% less carbon)','Reference AEMA (Karjat) and AEMTC (Mumbai) as world-class training centres','Discuss the my.angloeastern client portal and Fleet Performance Centre','Mention the 2024 Euronav acquisition expanding into Greece','Know that Peter Cremers led the 1998 management buyout and Bjorn Hojgaard is CEO'],
      officialLinks: { main: 'https://www.angloeastern.com', careers: 'https://www.angloeastern.com/careers/', training: 'https://www.angloeastern.com/maritime-training/' },
      subsidiaries: [
        { name: 'Anglo-Eastern Maritime Academy (AEMA)', location: 'Karjat, India', role: 'Pre-sea training institute (est. 2009)', website: 'https://www.angloeastern.com/maritime-training/' },
        { name: 'Anglo-Eastern Maritime Training Centre (AEMTC)', location: 'Mumbai, India', role: 'Post-sea training and courses (est. 2000)' },
        { name: 'Anglo-Eastern Fleet Performance Centre (AEFPC)', location: 'Hong Kong', role: 'Data-driven fleet safety and performance optimization (est. 2021)' },
        { name: 'Anglo-Eastern Technical Services (AETS)', location: 'Hong Kong', role: 'Newbuilding supervision and project management' },
        { name: 'Sea Sourcing', location: 'Joint Venture with Seaspan', role: 'Procurement JV for vendor negotiations' },
        { name: 'Indian Ship Staff Suppliers Company (ISSC)', location: 'Mumbai, India', role: 'Crew management and supply' }
      ],
      namedVessels: [
        { name: 'MV Ubuntu Empathy', type: 'Capesize LNG dual-fuel bulk carrier', highlight: 'First LNG dual-fuel bulk carrier under management, 190K dwt, 35% reduced carbon' },
        { name: 'MV Ubuntu Humanity', type: 'Capesize LNG dual-fuel bulk carrier', highlight: 'Twin of Ubuntu Empathy, 190K dwt' },
        { name: 'MT Seaways Spirit', type: 'Tanker', highlight: 'Featured vessel — proactive safety culture example' }
      ]
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
      impressInterviewer: ['Know they surpassed Maersk as #1 container line in 2022','Mention Captain Gianluigi Aponte as founder','Reference their investment in LNG and methanol-ready vessels','Discuss the family-owned nature — unique for a company this size'],
      officialLinks: { main: 'https://www.msc.com', cruises: 'https://www.msccruises.com', cargo: 'https://www.msc.com/en' },
      namedVessels: [
        { name: 'MSC Irina', type: '24,346 TEU Ultra Large Container Ship', highlight: 'One of the world\'s largest container ships' },
        { name: 'MSC World Europa', type: 'LNG-powered cruise ship', highlight: 'First LNG-powered cruise ship by MSC Cruises' }
      ]
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
      founded: 1904, motto: 'Constant Care — take care of today, actively prepare for tomorrow. Mission: Improving Life for All by Integrating the World',
      history: 'Founded in 1928 by A.P. Møller in Svendborg, Denmark (A.P. Møller founded the company, though the Maersk name dates to 1904 with his father). Started with just 6 ships. By WWII had 46 vessels, reduced to 7 after the war, rebuilt to pre-war size by 1953. First container ship in 1973. Became world\'s #1 container line in 1993 — held until MSC surpassed in Jan 2022. Now #2 with 740 vessels and 4.4M TEU capacity. Acquired Hamburg Süd (2017). Ordered world\'s first methanol-powered container ships (2021). Formed Gemini Cooperation with Hapag-Lloyd (Feb 2025) — 340 ships, 3.7M TEU. Investing $10-11B in fleet renewal 2024-2025. 25% of fleet will be dual-fuel by 2030.',
      keyFacts: ['5 core values: Constant Care, Humbleness, Uprightness, Our Employees, Our Name','Vision: Global Integrator — seamless end-to-end logistics','World\'s 2nd largest container line — 740 vessels, 4.4M TEU (Feb 2025)','Gemini Cooperation with Hapag-Lloyd (Feb 2025) — 340 ships, 3.7M TEU combined','First company to order methanol-powered container ships (2021)','Carbon intensity reduced 45% since 2007 — net-zero target 2040 (10 years before IMO)','$10-11B fleet renewal investment 2024-2025, 25% dual-fuel by 2030','The white seven-pointed star logo represents navigation by the stars'],
      innovation: 'World\'s first company to order methanol-powered container vessels. Investing in green methanol production. Developing carbon capture technology. Using AI for predictive analytics in supply chains. Pioneer in remote container management (RCM).',
      sustainability: 'Industry\'s most ambitious target: net-zero by 2040 (10 years before IMO). Already operating methanol-powered vessels. Invested in green e-methanol production facilities. Carbon intensity reduced 45% since 2007.',
      impressInterviewer: ['Know their 5 core values by heart — especially Constant Care','Mention the methanol-powered container ship order (world first)','Reference their transformation from shipping to integrated logistics','Discuss the 7-pointed star logo history and its meaning'],
      officialLinks: { main: 'https://www.maersk.com', careers: 'https://www.maersk.com/careers', sustainability: 'https://www.maersk.com/sustainability' },
      namedVessels: [
        { name: 'Laura Maersk', type: 'Methanol dual-fuel container ship', highlight: 'World\'s first methanol-powered container ship (2023)' },
        { name: 'Emma Maersk', type: 'E-class container ship', highlight: 'World\'s largest container ship when launched (2006), 15,550 TEU' },
        { name: 'Triple E Class', type: 'Ultra Large Container Ships', highlight: 'Maersk Triple E — 18,270 TEU, energy efficient design (2013-)' }
      ]
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
    icon: '<img src="https://www.google.com/s2/favicons?domain=bs-shipmanagement.com&sz=128" class="company-logo-img" alt="bs-shipmanagement">', color: '#16a34a', hq: 'Hamburg / Singapore', fleetSize: '670+ vessels',
    vesselTypes: ['Container Ships', 'Bulk Carriers', 'Tankers', 'LNG Carriers', 'Cruise Ships'],
    difficulty: 6, website: 'https://www.bs-shipmanagement.com',
    companyKnowledge: {
      founded: 1883, motto: 'Leading Maritime Solutions',
      history: 'Part of the Schulte Group, a family-owned business founded in 1883 in Papenburg, Germany — over 140 years and 5 generations of the Schulte family. BSM was formed in 2008 by merging four companies: Hanseatic Shipping (1972, Limassol), Dorchester Atlantic Marine (1978), Eurasia Group (1981), and Vorsetzen (1999). The Schulte Group owns 90 vessels and manages 670+. Fleet includes 170+ bulk carriers, 130+ containers, 100+ gas carriers (over half LNG). Delivered the world\'s largest LNG bunker supply vessel MV Kairos in 2018.',
      keyFacts: ['140+ years, 5 generations of Schulte family leadership','Values: Independence, Fairness, Entrepreneurship, Responsibility, Employees','Family culture — fostering just culture where blame is not assigned','670+ vessels managed: 170+ bulkers, 130+ containers, 100+ gas carriers','Delivered world\'s largest LNG bunker vessel MV Kairos (2018)','30 LNG dual-fuel ships managed, with more in pipeline','Operates BSM Maritime Academy in the Philippines'],
      innovation: 'Developed MariApps — proprietary digital fleet management platform. Real-time vessel performance monitoring. Leading in LNG carrier management (50+ LNG carriers). Owns and operates world\'s largest LNG bunker vessel MV Kairos. Early implementer of ECDIS. Digital innovation through the Schulte Group\'s tech investments.',
      sustainability: 'Commitment to responsible growth and positive environmental impact. Integrated sustainable practices and digital innovation. LNG as transition fuel — managing 30 dual-fuel ships plus 2 LNG bunker vessels. Long-term perspective for sustainable continuation of the company. Health, safety, diversity, equity, inclusion, and human rights prioritized.',
      impressInterviewer: ['Know the 5 values: Independence, Fairness, Entrepreneurship, Responsibility, Employees','Mention 140+ years across 5 generations of the Schulte family','Reference MV Kairos — world\'s largest LNG bunker vessel they delivered','Know BSM formed from 4 merged companies (Hanseatic, Dorchester, Eurasia, Vorsetzen)','Discuss their LNG expertise — 50+ LNG carriers managed','Mention the just culture approach — no blame culture'],
      officialLinks: { main: 'https://www.bs-shipmanagement.com', group: 'https://www.schultegroup.com', careers: 'https://www.bs-shipmanagement.com/en/careers' },
      subsidiaries: [
        { name: 'Schulte Group', location: 'Hamburg, Germany', role: 'Parent company — 140+ years, family-owned shipping group' },
        { name: 'BSM Maritime Academy', location: 'Philippines', role: 'Training center for Filipino seafarers' },
        { name: 'MariApps Marine Solutions', location: 'India', role: 'In-house digital platform development (Fleet Management)' },
        { name: 'Hanseatic Tankers', location: 'Part of Schulte Group', role: 'Tanker pool and commercial management' }
      ],
      namedVessels: [
        { name: 'MV Kairos', type: 'LNG bunker supply vessel', highlight: 'World\'s largest LNG bunker supply vessel (delivered 2018)' }
      ]
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
    icon: '<img src="https://www.google.com/s2/favicons?domain=synergymarinegroup.com&sz=128" class="company-logo-img" alt="synergymarinegroup">', color: '#dc2626', hq: 'Singapore', fleetSize: '700+ vessels',
    vesselTypes: ['Tankers (329)', 'Bulk Carriers (290)', 'Container Vessels (43)', 'LPG Carriers (46)', 'Offshore Vessels (35)', 'LNG Carriers (6)'],
    difficulty: 7, website: 'https://www.synergymarinegroup.com',
    companyKnowledge: {
      founded: 2006, motto: 'Delivering the Future of Ship Management — Responsibly, Digitally, Globally',
      history: 'Founded in 2006 in Singapore by Captain Rajesh Unni and Capt. Sanjay Iqbal. Grew from 0 to 700+ vessels in under 20 years — making it the fastest-growing ship manager ever. Now manages 750+ vessels with 29,000+ seafarers across 31 offices in 15 countries. A trusted lifecycle custodian of maritime assets, combining engineering excellence with operational discipline. Services include Ship Management, Offshore Services, Dual-Fuel Vessel Management, Newbuilding Supervision, and Crew Management.',
      keyFacts: ['Fastest-growing ship manager: 0 to 750+ vessels in ~19 years','29,000+ seafarers employed across 31 offices in 15 countries','Fleet breakdown: 329 Tankers, 290 Bulk Carriers, 43 Containers, 46 LPG, 35 Offshore, 6 LNG','Dual-Fuel vessel management specialist — manages LPG and LNG dual-fuel ships','Manages Jana Marine jack-up barges (offshore expansion)','Strong EU ETS compliance expertise — from compliance to confidence'],
      innovation: 'SynergyOne digital platform for fleet management and real-time monitoring. Leading in Dual-Fuel vessel management (LPG/LNG). Offshore expansion with jack-up barge management (Jana Marine). EU ETS compliance solutions and carbon credit management. Advanced crew training with Synergy Maritime Training Institute.',
      sustainability: 'EU ETS proactive compliance (2025: From Compliance to Confidence). Dual-fuel vessel management for reduced emissions. Energy-efficient operations across 750+ vessels. Active participation in Singapore Maritime Green Initiative. Carbon intensity benchmarking across entire managed fleet.',
      impressInterviewer: ['Know founder Captain Rajesh Unni and the remarkable growth story (0 to 750+ in ~19 years)','Quote the motto: Delivering the Future of Ship Management — Responsibly, Digitally, Globally','Mention 29,000+ seafarers across 31 offices in 15 countries','Reference Dual-Fuel vessel management as a speciality','Discuss EU ETS compliance expertise','Know the exact fleet breakdown: 329 Tankers, 290 Bulkers, 43 Containers, 46 LPG, 35 Offshore, 6 LNG'],
      officialLinks: { main: 'https://www.synergymarinegroup.com', about: 'https://www.synergymarinegroup.com/about/about-us/', services: 'https://www.synergymarinegroup.com/services/technical-management/' },
      subsidiaries: [
        { name: 'Synergy Marine Group', location: 'Singapore (HQ)', role: 'Global headquarters — technical and commercial management' },
        { name: 'Synergy Maritime Training Institute', location: 'India', role: 'Pre-sea and post-sea training for cadets and officers' },
        { name: 'Synergy Marine Pvt Ltd', location: 'Mumbai, India', role: 'Crew management and Indian operations' }
      ]
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
    icon: '<img src="https://www.google.com/s2/favicons?domain=vgrouplimited.com&sz=128" class="company-logo-img" alt="vgrouplimited">', color: '#7c3aed', hq: 'Monaco', fleetSize: '3,500+ vessels serviced',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Offshore', 'Cruise'],
    difficulty: 7, website: 'https://www.vgrouplimited.com',
    companyKnowledge: {
      founded: 1984, motto: 'We Care, We Challenge, We Collaborate, We are Consistent, We Commit',
      history: 'Founded in 1984 in Monaco with just 35 vessels. Celebrated 40th anniversary in October 2024 — now the world\'s largest ship management group servicing 3,500+ vessels with 44,000+ seafarers. Registered in Monaco, HQ in London, main ship management team in Glasgow with 18 offices worldwide. V.Ships Leisure manages 100+ cruise ships, ferries, and superyachts. Ownership changed in 2024 — acquired by STAR Capital consortium from Advent International. Acquired Belships\' fleet (34 modern bulkers) in 2023.',
      keyFacts: ['World\'s largest ship management group — 3,500+ vessels serviced','44,000+ seafarers employed globally across 18 offices','Values: Care, Challenge, Collaborate, Consistent, Commit','V.Ships Leisure manages 100+ cruise/ferry/yacht vessels separately','ShipSure 2.0 — cutting-edge marine digital platform for real-time fleet insights','Member of Maritime Anti-Corruption Network (MACN)','Innovation Centre in Mumbai for crew management technology','Fleet Cell of the Future prototype — remote monitoring and data analytics'],
      innovation: 'ShipSure 2.0 — cutting-edge marine digital platform for real-time, data-driven fleet operations. Fleet Cell of the Future — prototype using remote monitoring, data analytics, advanced communication. Innovation Centre in Mumbai for crew management tech. Participating in Maersk Mc-Kinney Møller Center for Zero Carbon Shipping. Exploring fuel cell technologies for deep-sea shipping (hybrid fuel cells + ICE). V.Ships Leisure pioneering dual-fuel cruise vessel technology. Port arrival optimization research (potential 25% emission reduction).',
      sustainability: 'Committed to decarbonizing deep-sea shipping. Reducing GHG through energy management. Minimizing waste, eliminating single-use plastics. Environmentally sound ship recycling. ESG Disclosure 2024 published. Port arrival optimization could reduce emissions by 25%. V.Ships Leisure supporting natural wind power for Orient Express sailing yachts.',
      impressInterviewer: ['Know the 5 values: Care, Challenge, Collaborate, Consistent, Commit','Mention they are world\'s largest — 3,500+ vessels, 44,000+ seafarers','Reference ShipSure 2.0 digital platform and Fleet Cell of the Future','Know about the V.Ships Leisure division — 100+ cruise/ferry/yacht vessels','Discuss their MACN membership and anti-corruption commitment','Mention 40th anniversary (2024) and STAR Capital ownership change'],
      officialLinks: { main: 'https://vgrouplimited.com', careers: 'https://vgrouplimited.com/careers/' },
      subsidiaries: [
        { name: 'V.Ships', location: 'Glasgow, Scotland', role: 'Core ship management operations — 18 offices worldwide' },
        { name: 'V.Ships Leisure', location: 'Monaco', role: 'Manages 100+ cruise ships, ferries, superyachts', website: 'https://vgrouplimited.com' },
        { name: 'V.Group Innovation Centre', location: 'Mumbai, India', role: 'Crew management technology and digital innovation' }
      ]
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
    id: 'thome', name: 'OSM Thome', shortName: 'OSM Thome',
    icon: '<img src="https://www.google.com/s2/favicons?domain=osmthome.com&sz=128" class="company-logo-img" alt="osmthome">', color: '#92400e', hq: 'Singapore', fleetSize: '1,000 vessels',
    vesselTypes: ['Tankers', 'Bulk Carriers', 'Container Ships', 'Gas Carriers'],
    difficulty: 6, website: 'https://osmthome.com',
    companyKnowledge: {
      founded: 1963, motto: 'It\'s All About People',
      history: 'Formed in 2023 through the merger of OSM Maritime Group (founded 1989 in Arendal, Norway by Bjørn Tore Larsen as Oriental Ship Management) and Thome Group (founded 1963 in Singapore). Merger approved May 2023, creating one of the world\'s largest ship managers. Manages ~1,000 ships total: 450 under full technical management, 550 under crew management. Fleet includes tankers, bulkers, containers, car carriers, cruise ships, and offshore. Acquired Klaveness Ship Management (Oct 2024, effective Jan 2025). Headquarters in Norway and Singapore.',
      keyFacts: ['4 Core Values: Safety, Transparency, Relationships, Innovation','Credo: It\'s All About People — emphasizing crew welfare','Combined heritage: OSM from Norway (1989) + Thome from Singapore (1963)','1,000 ships: 450 technical management + 550 crew management','Acquired Klaveness Ship Management (October 2024)','Diverse fleet: tankers, bulkers, containers, car carriers, cruise, offshore','EVIGO initiative — retrofitting vessels and piloting alternative fuels','Tech-forward leadership in digitalization and cyber security'],
      innovation: 'EVIGO initiative — vessel retrofitting and alternative fuel piloting for decarbonization. Advanced digitalization and cyber security focus. Tech-forward leadership combining Norwegian engineering with Singaporean operations excellence. Collaborative innovation approach to set new industry standards. Green shipping technology exploration.',
      sustainability: 'EVIGO program for decarbonization through retrofitting and alternative fuels. Zero-incident ambition driven by Safety as a core value. Transparency and accountability in all operations. Committed to sustainable, value-driven progress in maritime. Green shipping research and collaborative industry initiatives.',
      impressInterviewer: ['Know the 4 values: Safety, Transparency, Relationships, Innovation','Quote the credo: It\'s All About People','Know the merger story: OSM (Norway, 1989) + Thome (Singapore, 1963) merged in 2023','Mention the Klaveness Ship Management acquisition (Oct 2024)','Reference the EVIGO decarbonization initiative','Discuss their dual HQ model: Norwegian engineering + Singapore operations'],
      officialLinks: { main: 'https://osmthome.com', careers: 'https://osmthome.com/careers/' },
      subsidiaries: [
        { name: 'OSM Maritime Group', location: 'Arendal, Norway', role: 'Norwegian operations — engineering excellence (founded 1989)' },
        { name: 'Thome Group', location: 'Singapore', role: 'Singapore operations — Asia Pacific management (founded 1963)' },
        { name: 'Klaveness Ship Management', location: 'Norway', role: 'Acquired Oct 2024, integrated Jan 2025' },
        { name: 'OSM Thome India', location: 'Mumbai / Delhi', role: 'Indian crew operations and management' }
      ]
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
      founded: 1903, motto: 'Dedicated, Trusted Global Maritime Partner',
      history: 'Founded in Shanghai in 1903 — 123 years of maritime heritage. By 1908, became the world\'s first third-party ship manager, overseeing sisterships in the Chinese coastal coal trade. Expanded to Hong Kong, Japan, India, Singapore, Vietnam. In 2015, became the sole foreign company to fully own a Manning Agency in China, enabling direct recruitment of Chinese seafarers. Currently owned by the Wallem family — Tom Steckmest (founder\'s great-grandson) and Nigel Hill. Fleet experience spans tankers, bulk carriers, vehicle carriers, cruise ships, naval vessels, container ships, and heavy lift. Partnered with BYD for first fully-chartered PCTC vessel MV BYD Explorer No. 1 (2024).',
      keyFacts: ['World\'s first third-party ship manager (1908) — 123 years of heritage','Wallem family-owned: Tom Steckmest (great-grandson of founder) and Nigel Hill','Sole foreign shipping company to fully own a Manning Agency in China (2015)','Mission: Dedicated, trusted global maritime partner for safe, smart, sustainable operations','Partnered with BYD for MV BYD Explorer No. 1 — car carrier for Chinese automaker','Services: ship management, crew management, ship agency, commercial, vessel IT, lifeboat safety','Committed to just culture process prioritizing safety and compliance'],
      innovation: 'Pioneered third-party ship management concept (1908 — world first). Vessel IT services as dedicated vertical. Lifeboat safety and compliance services. First foreign company to establish full Manning Agency in China. Partnership with Chinese automaker BYD for PCTC vessel management (MV BYD Explorer No. 1).',
      sustainability: 'Committed to minimizing environmental impact of operations. Helping clients reduce their environmental footprint. Well-being, dignity, and human values of employees prioritized. Safe, smart, and sustainable operations as core mission. Supporting the green transition in maritime transport.',
      impressInterviewer: ['Know they are the world\'s FIRST third-party ship manager (1908)','Correct misconception: Wallem family-owned, NOT MOL-owned','Mention 123 years of heritage — founded in Shanghai, now HQ Hong Kong','Reference MV BYD Explorer No. 1 — BYD partnership','Know they are the sole foreign company with a full Manning Agency in China','Discuss their comprehensive services including unique lifeboat safety vertical'],
      officialLinks: { main: 'https://www.wallem.com', careers: 'https://www.wallem.com/careers' },
      subsidiaries: [
        { name: 'Wallem Ship Management', location: 'Hong Kong (HQ)', role: 'Core ship management — technical and crew services' },
        { name: 'Wallem Manning Agency (China)', location: 'China', role: 'Sole foreign company to fully own a Manning Agency in China (2015)' },
        { name: 'Wallem Commercial Services', location: 'Hong Kong', role: 'Ship agency, commercial management' },
        { name: 'Wallem India', location: 'India', role: 'Crew management and training' }
      ],
      namedVessels: [
        { name: 'MV BYD Explorer No. 1', type: 'PCTC (Pure Car Truck Carrier)', highlight: 'First fully chartered vessel for Chinese automaker BYD (2024)' }
      ]
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
