/* MarineIQ — Extended Company Profiles (Part 2)
   9 additional shipping companies
   Merged into INTERVIEW_COMPANIES at load time */

(function() {
  var ext = {

  shell: {
    id: 'shell', name: 'Shell International Shipping Services', shortName: 'Shell SISS',
    icon: '<img src="https://logo.clearbit.com/shell.com" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/shell.com'">', color: '#f59e0b', hq: 'London / The Hague', fleetSize: '2000+ daily vessels',
    vesselTypes: ['LNG Carriers', 'Oil Tankers', 'Chemical Tankers', 'FPSOs', 'FSRUs'],
    difficulty: 9, website: 'https://www.shell.com/business-customers/shipping',
    companyKnowledge: {
      founded: 1910, motto: 'Powering Progress — Shipping that Moves Energy',
      history: 'Shell Shipping & Trading Company Ltd established in 1910. Shell pioneered the Vulcanus (1910) — world\'s first ocean-going motor ship with diesel propulsion. The original Murex tanker (1892) was the first to transit the Suez Canal. Named vessels after seashells since inception. World\'s largest charterer of oil tonnage.',
      keyFacts: ['World\'s largest charterer of oil tonnage','~25% of global LNG carriers linked to Shell','2000+ vessels associated with Shell operations daily','Built the Vulcanus — world\'s first diesel-powered ocean ship (1910)','Manages the Suiso Frontier — world\'s first liquefied hydrogen carrier','Shell Maritime Technologies is a dedicated R&D center','Over $1 billion annual R&D spend'],
      innovation: 'Pioneered the world\'s first ocean-going diesel ship (Vulcanus, 1910). Built Agnita — world\'s first purpose-built LPG carrier (1930). Manages Suiso Frontier — first liquefied hydrogen carrier. Developed JAWS (Just Add Water System) for draft/trim optimization — 50% CO2 reduction vs 2008 steam turbines. Dual-fuel X-DF engines on new LNG carriers.',
      sustainability: 'Net-zero by 2050. New LNG carriers are 35% more efficient than EEDI requirements. Air lubrication systems on vessels. Collaborating with MSC and MOL for zero-emission fuels. Shell Marine Sensor Service (SMSS) for real-time equipment monitoring.',
      impressInterviewer: ['Know about the Vulcanus — world\'s first diesel ocean vessel','Mention JAWS system for draft optimization','Reference their massive LNG fleet (25% of global)','Discuss the Suiso Frontier hydrogen carrier project','Know they are the world\'s largest oil tonnage charterer']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply through Shell careers — select Shipping/Maritime' },
      { stage: 'Online Assessment', desc: 'Cognitive ability, numerical, verbal reasoning' },
      { stage: 'Video Interview', desc: 'Pre-recorded behavioral questions' },
      { stage: 'Assessment Day', desc: 'Technical exercises, group activities, panel interview' },
      { stage: 'Medical & Joining', desc: 'Comprehensive medical, security clearance' }
    ],
    cbtFormat: { duration: 90, totalQuestions: 60, sections: [
      { name: 'Cognitive Ability', questions: 20, weight: 35 },
      { name: 'Technical Marine', questions: 25, weight: 40 },
      { name: 'English & Communication', questions: 15, weight: 25 }
    ], negativeMarking: false, passingScore: 70 },
    interviewStyle: { type: 'Competency + Technical', rounds: ['Behavioral (STAR)', 'Technical Marine', 'HSE Focus', 'Values Alignment'], difficulty: 'Very Hard',
      tips: ['Know Shell\'s maritime innovations (Vulcanus, JAWS, hydrogen)','Prepare HSE scenarios thoroughly — Shell is VERY safety-conscious','Use STAR method for behavioral questions','Understand LNG carrier operations and cargo systems'] },
    questionBank: [
      { q: 'What do you know about Shell\'s maritime history?', type: 'personal', topic: 'Company Knowledge' },
      { q: 'Explain the cargo containment systems for LNG carriers.', type: 'technical', topic: 'LNG' },
      { q: 'What is boil-off gas management in LNG carriers?', type: 'technical', topic: 'LNG' },
      { q: 'Describe an HSE incident you prevented or managed.', type: 'behavioral', topic: 'Safety' },
      { q: 'How does an FPSO work? What are its main systems?', type: 'technical', topic: 'Offshore' },
      { q: 'What is the difference between Moss and membrane LNG tanks?', type: 'technical', topic: 'LNG' }
    ]
  },

  torm: {
    id: 'torm', name: 'TORM A/S', shortName: 'Torm',
    icon: '<img src="https://logo.clearbit.com/torm.com" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/torm.com'">', color: '#0369a1', hq: 'Copenhagen, Denmark', fleetSize: '90+ product tankers',
    vesselTypes: ['Product Tankers (LR2, LR1, MR)'],
    difficulty: 6, website: 'https://www.torm.com',
    companyKnowledge: {
      founded: 1889, motto: 'Moving Energy Safely and Efficiently',
      history: 'Founded in 1889 by Ditlev Torm and Christian Schmiegelow. Listed on Copenhagen Stock Exchange in 1905. Shifted from general cargo to specialized product tankers in the late 1970s. Survived 2012-2015 financial restructuring. Today is the 3rd largest product tanker operator globally.',
      keyFacts: ['Founded 1889 — over 135 years of maritime history','3rd largest product tanker operator globally','~90 owned/operated vessels (LR2, LR1, MR classes)','Listed on Nasdaq Copenhagen and NASDAQ New York','First Danish shipping company to sign UN Global Compact','Specializes in refined oil products: gasoline, jet fuel, naphtha, diesel'],
      innovation: '"One Torm" integrated business model for operational efficiency. Ownership stake in ME Production (green marine equipment). Advanced hull designs for reduced fuel consumption. Member of Mærsk Mc-Kinney Møller Center for Zero Carbon Shipping.',
      sustainability: '40% carbon intensity reduction target by 2025 (achieved 39.6% by 2023). Zero CO2 fleet emissions by 2050. Wastewater treatment on older vessels. SASB and TCFD sustainability reporting.',
      impressInterviewer: ['Know they are the 3rd largest product tanker operator','Mention their 135+ year heritage since 1889','Reference the "One Torm" integrated business model','Discuss their near-achievement of 40% carbon reduction target']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via Torm careers page' },
      { stage: 'Written Aptitude Test', desc: 'Maritime knowledge, English, reasoning' },
      { stage: 'Technical Interview', desc: 'Product tanker operations, safety' },
      { stage: 'HR Interview', desc: 'Motivation, career goals, cultural fit' },
      { stage: 'Medical & Joining', desc: 'Standard medical, placement on product tanker' }
    ],
    cbtFormat: { duration: 60, totalQuestions: 50, sections: [
      { name: 'Maritime Knowledge', questions: 20, weight: 40 },
      { name: 'English Proficiency', questions: 15, weight: 30 },
      { name: 'Reasoning & Aptitude', questions: 15, weight: 30 }
    ], negativeMarking: false, passingScore: 60 },
    interviewStyle: { type: 'Technical + Personal', rounds: ['Self Introduction', 'Tanker Operations', 'Safety & ISM'], difficulty: 'Moderate',
      tips: ['Know product tanker cargo operations (loading/discharge)','Understand tank cleaning and gas-freeing procedures','Prepare for inert gas system questions','Study COW (Crude Oil Washing) vs tank cleaning'] },
    questionBank: [
      { q: 'What are the different product tanker classes?', type: 'technical', topic: 'Tanker Operations' },
      { q: 'Explain tank cleaning procedures on a product tanker.', type: 'technical', topic: 'Tanker Operations' },
      { q: 'What is an inert gas system? Purpose?', type: 'technical', topic: 'Safety' },
      { q: 'How does the cargo pump system work?', type: 'technical', topic: 'Cargo Systems' },
      { q: 'What attracts you to product tanker operations?', type: 'personal', topic: 'Motivation' }
    ]
  },

  scorpio: {
    id: 'scorpio', name: 'Scorpio Group', shortName: 'Scorpio',
    icon: '<img src="https://logo.clearbit.com/scorpiogroup.net" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/scorpiogroup.net'">', color: '#b91c1c', hq: 'Monaco', fleetSize: '90+ tankers',
    vesselTypes: ['Product Tankers (LR2, MR, Handymax)'],
    difficulty: 7, website: 'https://www.scorpiogroup.net',
    companyKnowledge: {
      founded: 1976, motto: 'Innovation, Sustainability, Excellence',
      history: 'Founded in 1976 by Glauco Lolli-Ghetti in New York, later relocated to Monaco. Now led by grandson Emanuele A. Lauro. Scorpio Tankers IPO\'d on NYSE in 2010. Scorpio Bulkers (2013) pivoted from dry bulk to offshore wind in 2020. Lolli-Ghetti commissioned double-hull ships 27 years before they became mandatory — a true environmental pioneer.',
      keyFacts: ['70+ years of combined industry experience','Founder Glauco Lolli-Ghetti was a double-hull pioneer (27 years before regulation)','~90 product tankers — one of the youngest fleets (avg age ~10 years)','Listed on NYSE (Scorpio Tankers: STNG)','Founding member of IMPA Maritime Environmental Footprint Initiative','Fleet 100% equipped with ballast water management systems','Near-100% reduction in single-use plastics on vessels (2023)'],
      innovation: 'FOWE™ fuel-saving devices installed fleet-wide. Nearly 90% fleet equipped with exhaust gas scrubbers. High-frequency real-time data collection for performance optimization. Pioneered the shift from dry bulk to offshore wind (Scorpio Bulkers → wind turbine installation).',
      sustainability: '40% carbon intensity reduction by 2030 target (30% achieved). 100% ballast water management systems. Near-zero single-use plastics. Proactive hull and engine maintenance for fuel efficiency. Support for Mercy Ships humanitarian initiative.',
      impressInterviewer: ['Mention founder\'s double-hull innovation 27 years before regulation','Know about FOWE™ fuel-saving technology','Reference their Mercy Ships humanitarian support','Discuss the Scorpio Bulkers to offshore wind pivot']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via Scorpio Group website' },
      { stage: 'Technical Assessment', desc: 'Tanker operations, machinery, safety' },
      { stage: 'Interview (Monaco/Mumbai)', desc: 'Technical + behavioral' },
      { stage: 'Medical & Joining', desc: 'Medical clearance, modern vessel placement' }
    ],
    cbtFormat: { duration: 60, totalQuestions: 50, sections: [
      { name: 'Tanker Operations', questions: 20, weight: 40 },
      { name: 'Engineering Knowledge', questions: 20, weight: 40 },
      { name: 'English & Safety', questions: 10, weight: 20 }
    ], negativeMarking: false, passingScore: 60 },
    interviewStyle: { type: 'Technical + Behavioral', rounds: ['Technical Marine', 'Safety Scenarios', 'Company Fit'], difficulty: 'Moderate-Hard',
      tips: ['Know product tanker operations in detail','Understand scrubber systems (Open/Closed loop)','Be aware of FOWE™ fuel-saving technology','Prepare for environmental/sustainability questions'] },
    questionBank: [
      { q: 'How does an exhaust gas scrubber work?', type: 'technical', topic: 'Environmental' },
      { q: 'Explain product tanker cargo segregation.', type: 'technical', topic: 'Cargo Operations' },
      { q: 'What is your understanding of BWMS?', type: 'technical', topic: 'Environmental' },
      { q: 'Why do you want to join Scorpio?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  kline: {
    id: 'kline', name: 'Kawasaki Kisen Kaisha', shortName: 'K-Line',
    icon: '<img src="https://logo.clearbit.com/kline.co.jp" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/kline.co.jp'">', color: '#dc2626', hq: 'Tokyo, Japan', fleetSize: '448 vessels',
    vesselTypes: ['Car Carriers', 'Bulk Carriers', 'LNG Carriers', 'Tankers'],
    difficulty: 7, website: 'https://www.kline.co.jp',
    companyKnowledge: {
      founded: 1919, motto: '"K" LINE Vision — Synergies for the Future',
      history: 'Established April 5, 1919 in Kobe, Japan from Kawasaki Heavy Industries\' shipping division. "K" comes from Kawasaki Kisen + Kawasaki Zosen + Kokusai Kisen (1921). Lost 56 vessels in WWII, rebuilt from just 12 ships. Deployed Japan\'s first Pure Car Carrier in 1970. Container operations merged into Ocean Network Express (ONE) in 2017.',
      keyFacts: ['Deployed Japan\'s first Pure Car Carrier (TOYOTA MARU No.10) in 1970','~448 vessels as of March 2025','Operates 50 LNG carriers','One of the "Big 3" Japanese shipping companies','Co-founder of ONE (Ocean Network Express) for container shipping','First Japanese company to establish intermodal Double-Stack Train transport (1986)','Transports 3+ million vehicles annually'],
      innovation: 'Japan\'s first PCC (1970). First Japanese Double-Stack Train intermodal transport (1986). Exploring Seawing automated kite systems for wind propulsion. LNG-fueled car carriers (Oceanus Highway, Tethys Highway). AI/IoT for vessel operations. Liquefied CO2 carrier design. CO2 capture demonstration plants.',
      sustainability: 'Environmental Vision 2050: net-zero GHG by 2050. "DRIVE GREEN NETWORK" environmental management system. Marine biofuel trials on bulk carriers. Getting to Zero Coalition member. Beach cleanups and plastic cap collection programs.',
      impressInterviewer: ['Know they are one of Japan\'s Big 3 shipping companies','Mention the first Pure Car Carrier (1970)','Reference ONE — the container shipping joint venture','Discuss Seawing kite technology and CO2 carrier concepts','Know the Environmental Vision 2050']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via K-Line global careers' },
      { stage: 'Written Assessment', desc: 'Technical, English, aptitude' },
      { stage: 'Technical Interview', desc: 'Engineering knowledge, car carrier operations' },
      { stage: 'HR Interview', desc: 'Values alignment, career goals' },
      { stage: 'Medical & Joining', desc: 'Medical clearance' }
    ],
    cbtFormat: { duration: 60, totalQuestions: 50, sections: [
      { name: 'Technical Knowledge', questions: 25, weight: 50 },
      { name: 'English', questions: 15, weight: 30 },
      { name: 'Aptitude', questions: 10, weight: 20 }
    ], negativeMarking: false, passingScore: 60 },
    interviewStyle: { type: 'Technical + Cultural Fit', rounds: ['Technical Marine', 'Japanese Work Culture', 'Career Goals'], difficulty: 'Moderate-Hard',
      tips: ['Understand car carrier operations and lashing','Know LNG carrier cargo systems','Respect Japanese work culture — punctuality, discipline','Prepare for questions on ISO/Class survey requirements'] },
    questionBank: [
      { q: 'How does a Pure Car Carrier differ from PCTC?', type: 'technical', topic: 'Car Carriers' },
      { q: 'What is boil-off gas in LNG carriers?', type: 'technical', topic: 'LNG' },
      { q: 'Explain car lashing systems and stability concerns.', type: 'technical', topic: 'Car Carriers' },
      { q: 'What is ONE? How is K-Line involved?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  nyk: {
    id: 'nyk', name: 'Nippon Yusen Kabushiki Kaisha', shortName: 'NYK Line',
    icon: '<img src="https://logo.clearbit.com/nyk.com" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/nyk.com'">', color: '#1d4ed8', hq: 'Tokyo, Japan', fleetSize: '800+ vessels',
    vesselTypes: ['Car Carriers (RORO)', 'LNG Carriers', 'Bulk Carriers', 'Tankers', 'Container Ships', 'Cruise'],
    difficulty: 8, website: 'https://www.nyk.com',
    companyKnowledge: {
      founded: 1885, motto: 'Bringing Value to Life — Sustainable Solution Provider',
      history: 'Founded 1885 from merger of Mitsubishi Mail Steamship and Kyodo Unyu Kaisha, starting with 58 ships. First liner to US (1896) and Europe (1896). Lost 185 ships in WWII. Operated Japan\'s first container vessel Hakone Maru (1968). Co-founded ONE in 2018.',
      keyFacts: ['Founded 1885 — nearly 140 years of maritime history','World\'s largest RORO/car carrier operator (100+ PCCs/PCTCs)','800+ vessels in fleet','91 LNG carriers (expanding to 130 by 2028)','16% of global car transportation fleet capacity','Co-founder of ONE — world\'s 6th largest container line','Launched world\'s first LNG-fueled car carriers'],
      innovation: 'World\'s first LNG-fueled car carriers. DFFAS autonomous ship project. IoT/big data for remote monitoring and predictive maintenance. Ammonia-fuel ready LNG vessel designs. Digital twin technology for fleet management.',
      sustainability: '"Sail GREEN" project for vehicle logistics emissions. Net-zero GHG by 2050. LNG as bridge fuel strategy. Exploring methanol, biofuels, ammonia. Green ship recycling. Marine biodiversity conservation.',
      impressInterviewer: ['Know they are the world\'s #1 RORO operator','Mention DFFAS autonomous ship project','Reference their massive LNG carrier expansion plans','Discuss Sail GREEN sustainability project']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via NYK careers' },
      { stage: 'Written Test', desc: 'Technical, English, logical reasoning' },
      { stage: 'Technical Interview', desc: 'RORO/cargo operations, engineering' },
      { stage: 'Management Interview', desc: 'Values, leadership, career vision' },
      { stage: 'Medical & Joining', desc: 'Medical clearance' }
    ],
    cbtFormat: { duration: 75, totalQuestions: 60, sections: [
      { name: 'Technical Marine', questions: 25, weight: 40 },
      { name: 'English', questions: 15, weight: 25 },
      { name: 'Logical Reasoning', questions: 10, weight: 15 },
      { name: 'General Knowledge', questions: 10, weight: 20 }
    ], negativeMarking: false, passingScore: 60 },
    interviewStyle: { type: 'Technical + Management', rounds: ['Self Introduction', 'Technical Deep-dive', 'Leadership & Values'], difficulty: 'Hard',
      tips: ['Know RORO operations — car lashing, ventilation, fire safety','Understand LNG cargo systems and boil-off management','Respect Japanese corporate etiquette','Prepare for questions on autonomous shipping'] },
    questionBank: [
      { q: 'What safety concerns are unique to car carriers?', type: 'technical', topic: 'Car Carriers' },
      { q: 'Explain ventilation requirements in vehicle decks.', type: 'technical', topic: 'Car Carriers' },
      { q: 'What is autonomous navigation? NYK\'s role?', type: 'technical', topic: 'Innovation' },
      { q: 'What do you know about NYK and ONE?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  mol: {
    id: 'mol', name: 'Mitsui O.S.K. Lines', shortName: 'MOL',
    icon: '<img src="https://logo.clearbit.com/mol.co.jp" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/mol.co.jp'">', color: '#ea580c', hq: 'Tokyo, Japan', fleetSize: '800+ vessels',
    vesselTypes: ['Dry Bulk', 'LNG Carriers', 'Car Carriers', 'Tankers', 'Container Ships', 'Cruise', 'FPSOs'],
    difficulty: 8, website: 'https://www.mol.co.jp',
    companyKnowledge: {
      founded: 1884, motto: 'Blue Action 2035 — Ocean Transport, Social Infrastructure, and Clean Energy',
      history: 'Traces back to 1884 with Osaka Shosen Kaisha (OSK). Formed in 1964 from merger of OSK and Mitsui Steamship. World\'s largest dry bulker fleet operator. 105 LNG carriers (targeting 150 by 2030). Holds 31% stake in ONE. Operates MOL Cruises and MOL Sunflower ferries.',
      keyFacts: ['Founded 1884 — over 140 years old','World\'s largest dry bulker fleet','105 LNG carriers (aiming for 150 by 2030)','~110 car carriers (branded as ACE)','31% stake in ONE (container shipping JV)','Operates cruise ships and domestic ferries','Handles 8 million barrels crude oil daily'],
      innovation: 'Wind Challenger Project — rigid sails for wind-assisted propulsion. FOCUS system for fleet data analysis. AI-powered EV fire detection on car carriers. Doppler LiDAR for real-time wind measurement. Sustainable seafarer wellness programs.',
      sustainability: 'MOL Group Environmental Vision 2.2: net-zero by 2050. 45% GHG reduction per unit by 2035. Clean fuels: LNG, methanol, ammonia. Wind Challenger sails. FSRU and LNG social infrastructure development.',
      impressInterviewer: ['Know they have the world\'s largest dry bulker fleet','Mention the Wind Challenger rigid sail project','Reference FOCUS fleet analytics system','Discuss their 31% stake in ONE','Know Environmental Vision 2.2']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via MOL careers' },
      { stage: 'Written Assessment', desc: 'Technical, English, aptitude, general maritime' },
      { stage: 'Technical Interview', desc: 'Bulk/tanker/LNG operations' },
      { stage: 'HR/Management Interview', desc: 'Cultural fit, career goals' },
      { stage: 'Medical & Joining', desc: 'Medical clearance, vessel assignment' }
    ],
    cbtFormat: { duration: 75, totalQuestions: 60, sections: [
      { name: 'Technical Marine', questions: 25, weight: 45 },
      { name: 'English', questions: 15, weight: 25 },
      { name: 'General Maritime', questions: 10, weight: 15 },
      { name: 'Aptitude', questions: 10, weight: 15 }
    ], negativeMarking: false, passingScore: 60 },
    interviewStyle: { type: 'Technical + Cultural', rounds: ['Technical Deep-dive', 'Safety/Environment', 'Japanese Work Values'], difficulty: 'Hard',
      tips: ['Know dry bulk cargo operations and stowage','Understand LNG carrier cargo systems','Be aware of Wind Challenger technology','Respect Japanese work ethic and team-first mentality'] },
    questionBank: [
      { q: 'What is the Wind Challenger project? How does it work?', type: 'technical', topic: 'Innovation' },
      { q: 'Explain bulk carrier hold preparation and cargo care.', type: 'technical', topic: 'Bulk Operations' },
      { q: 'What are the main risks in dry bulk cargo?', type: 'technical', topic: 'Cargo Safety' },
      { q: 'What is FOCUS system at MOL?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  andromeda: {
    id: 'andromeda', name: 'International Andromeda Shipping', shortName: 'Andromeda',
    icon: '<img src="https://logo.clearbit.com/andromeda-shipping.com" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/andromeda-shipping.com'">', color: '#6366f1', hq: 'Monaco / Mumbai', fleetSize: '30+ tankers & FSOs',
    vesselTypes: ['Product Tankers', 'MR Tankers', 'LR2 Tankers', 'LPG Carriers', 'FSOs'],
    difficulty: 8, website: 'https://www.andromeda-shipping.com',
    companyKnowledge: {
      founded: 1992, motto: 'Safe, Efficient and Environmentally Responsible Tanker Operations',
      history: 'Founded in 1992. Started with first product tanker Blue Star (29,900 DWT). Ship management company established in Monaco in 1995. Diversified into FSO (Floating Storage & Offloading) market between 2000-2010. Expanded into bitumen business in 2024. Strong operational presence in Mumbai for crewing and quality management.',
      keyFacts: ['Founded 1992 — 30+ years in tanker operations','Fleet of 30+ tankers and FSOs (37,000 to 160,000 DWT)','HQ in Monaco, major crewing office in Mumbai','Specializes in oil/chemical tanker management','Interview difficulty rated 8/10 by candidates','Zero-incident target for oil spillage','New vessels being built regularly (2024 newbuilds)'],
      innovation: 'Modern fleet with vessels averaging under 10 years old. Advanced cargo management systems for chemical/oil products. FSO conversion and operation expertise. Digital vessel monitoring and performance tracking.',
      sustainability: 'Zero spillage policy. Modern young fleet with efficient engines. Ballast water treatment compliance. Energy-efficient hull designs on newbuilds.',
      impressInterviewer: ['Know their Monaco HQ + Mumbai operations model','Mention their FSO expertise','Reference the zero-incident/zero-spillage policy','Discuss their fleet expansion with newbuilds']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via Andromeda portal or Mumbai office' },
      { stage: 'Written Assessment', desc: 'Tanker operations, engineering, English' },
      { stage: 'Technical Interview', desc: 'High difficulty (8/10) — deep tanker knowledge required' },
      { stage: 'Medical & Joining', desc: 'Medical clearance, tanker placement' }
    ],
    cbtFormat: { duration: 60, totalQuestions: 50, sections: [
      { name: 'Tanker Operations', questions: 20, weight: 40 },
      { name: 'Engineering', questions: 20, weight: 40 },
      { name: 'English & Safety', questions: 10, weight: 20 }
    ], negativeMarking: false, passingScore: 65 },
    interviewStyle: { type: 'Technical Heavy (Tanker-focused)', rounds: ['Self Introduction', 'Tanker Operations', 'Engineering Deep-dive', 'Safety & Emergency'], difficulty: 'Very Hard (8/10)',
      tips: ['Master tanker cargo operations — loading, discharge, tank cleaning','Know chemical tanker safety (IBC Code, MSDS)','Prepare for FSO-specific questions','Understand inert gas and COW systems thoroughly'] },
    questionBank: [
      { q: 'What is the IBC Code? When is it applicable?', type: 'technical', topic: 'Chemical Tankers' },
      { q: 'Explain Crude Oil Washing (COW) system.', type: 'technical', topic: 'Tanker Operations' },
      { q: 'What is an FSO? How does it differ from an FPSO?', type: 'technical', topic: 'Offshore' },
      { q: 'Describe inert gas system operation and safety.', type: 'technical', topic: 'Safety' },
      { q: 'What do you know about Andromeda Shipping?', type: 'personal', topic: 'Company Knowledge' }
    ]
  },

  eastaway: {
    id: 'eastaway', name: 'Eastaway Ship Management', shortName: 'Eastaway',
    icon: '<img src="https://logo.clearbit.com/eastaway.com" class="company-logo-img" onerror="this.onerror=null; this.src='https://icon.horse/icon/eastaway.com'">', color: '#059669', hq: 'Singapore / Mumbai', fleetSize: '50+ container ships',
    vesselTypes: ['Container Ships (700 TEU to 7000 TEU)'],
    difficulty: 6, website: 'https://www.eastaway.com',
    companyKnowledge: {
      founded: 2010, motto: 'Reliable Container Ship Management',
      history: 'Eastaway Pte. Ltd. established in Singapore with over a decade of ship ownership experience. Specializes exclusively in container vessel operations from 700 TEU feeder ships to 7000 TEU vessels. Eastaway (India) Private Limited handles crewing and technical support from Mumbai. Fleet includes many modern vessels (46% are 0-5 years old).',
      keyFacts: ['Specializes exclusively in container ships','50+ container ships (700 to 7000 TEU range)','Singapore HQ with Mumbai India operations','Young fleet — 46% of vessels are under 5 years old','Growing fleet with new builds under construction','Environmental compliance through Eastaway India partnership'],
      innovation: 'Modern fleet with latest engine technologies. Digital fleet monitoring. Energy-efficient container vessel designs. Standardized maintenance protocols across diverse TEU range.',
      sustainability: 'Young fleet with modern engines (lower emissions). Environmental compliance partnerships. Energy-efficient operations. Container optimization for fuel savings.',
      impressInterviewer: ['Know they specialize ONLY in container ships','Mention their young fleet age profile','Reference the Singapore-Mumbai operational model','Discuss container ship-specific challenges (parametric rolling, lashing)']
    },
    selectionProcess: [
      { stage: 'Online Application', desc: 'Apply via Eastaway portal or Mumbai office' },
      { stage: 'Written Test', desc: 'Container vessel operations, engineering, English' },
      { stage: 'Technical Interview', desc: 'Container ship-specific knowledge' },
      { stage: 'Medical & Joining', desc: 'Medical clearance, container ship placement' }
    ],
    cbtFormat: { duration: 60, totalQuestions: 50, sections: [
      { name: 'Container Ship Operations', questions: 15, weight: 30 },
      { name: 'Engineering Knowledge', questions: 20, weight: 40 },
      { name: 'English & Safety', questions: 15, weight: 30 }
    ], negativeMarking: false, passingScore: 55 },
    interviewStyle: { type: 'Technical (Container-focused)', rounds: ['Self Introduction', 'Container Operations', 'Engineering'], difficulty: 'Moderate',
      tips: ['Know container ship lashing and stowage systems','Understand reefer container monitoring','Prepare for parametric rolling scenarios','Know Bay Plan reading and container weight verification'] },
    questionBank: [
      { q: 'What is a Bay Plan? How do you read it?', type: 'technical', topic: 'Container Operations' },
      { q: 'Explain parametric rolling in container ships.', type: 'technical', topic: 'Stability' },
      { q: 'How do you monitor reefer containers?', type: 'technical', topic: 'Container Operations' },
      { q: 'VGM (Verified Gross Mass) — what is it and why?', type: 'technical', topic: 'Regulations' },
      { q: 'What do you know about Eastaway?', type: 'personal', topic: 'Company Knowledge' }
    ]
  }

  };

  /* Merge into main object */
  Object.keys(ext).forEach(function(k) {
    INTERVIEW_COMPANIES[k] = ext[k];
  });
})();
