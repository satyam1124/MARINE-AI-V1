/* MarineIQ — Extended Company Profiles (Part 2)
   9 additional shipping companies
   Merged into INTERVIEW_COMPANIES at load time */

(function() {
  var ext = {

  shell: {
    id: 'shell', name: 'Shell International Shipping Services', shortName: 'Shell SISS',
    icon: '<img src="https://www.google.com/s2/favicons?domain=shell.com&sz=128" class="company-logo-img" alt="shell">', color: '#f59e0b', hq: 'London / The Hague', fleetSize: '2000+ daily vessels',
    vesselTypes: ['LNG Carriers', 'Oil Tankers', 'Chemical Tankers', 'FPSOs', 'FSRUs'],
    difficulty: 9, website: 'https://www.shell.com/business-customers/shipping',
    companyKnowledge: {
      founded: 1910, motto: 'Powering Progress — Shipping that Moves Energy',
      history: 'Shell\'s shipping history began in 1892 with the launch of the Murex — the first oil tanker to transit the Suez Canal for bulk oil transport. Built Victoria (1910) — world\'s first ocean-going diesel-powered ship. SISS technically manages crude oil tankers, oil product/chemical tankers, and one of the world\'s largest LNG fleets including Q-Max (266,000 cbm), Q-Flex, and M-Class carriers. Technically managed the world\'s first liquefied hydrogen carrier, Suiso Frontier. Has a 24-sister ship LNG fleet rejuvenation program (latest: Orion Hugo, August 2025). Named vessels after seashells since inception. World\'s largest charterer of oil tonnage. Offers Cadetships in Nautical Sciences and Marine Engineering (UK-based Foundation Degree fully sponsored).',
      keyFacts: ['World\'s largest charterer of oil tonnage','~25% of global LNG carriers linked to Shell','2000+ vessels associated with Shell operations daily','Built the Vulcanus — world\'s first diesel-powered ocean ship (1910)','Manages the Suiso Frontier — world\'s first liquefied hydrogen carrier','Shell Maritime Technologies is a dedicated R&D center','Over $1 billion annual R&D spend'],
      innovation: 'Pioneered the world\'s first ocean-going diesel ship (Vulcanus, 1910). Built Agnita — world\'s first purpose-built LPG carrier (1930). Manages Suiso Frontier — first liquefied hydrogen carrier. Developed JAWS (Just Add Water System) for draft/trim optimization — 50% CO2 reduction vs 2008 steam turbines. Dual-fuel X-DF engines on new LNG carriers.',
      sustainability: 'Net-zero by 2050. New LNG carriers are 35% more efficient than EEDI requirements. Air lubrication systems on vessels. Collaborating with MSC and MOL for zero-emission fuels. Shell Marine Sensor Service (SMSS) for real-time equipment monitoring.',
      impressInterviewer: ['Know about the Vulcanus — world\'s first diesel ocean vessel','Mention JAWS system for draft optimization','Reference their massive LNG fleet (25% of global)','Discuss the Suiso Frontier hydrogen carrier project','Know they are the world\'s largest oil tonnage charterer'],
      officialLinks: { main: 'https://www.shell.com', shipping: 'https://www.shell.com/business-customers/shipping', careers: 'https://www.shell.com/careers' },
      subsidiaries: [
        { name: 'Shell International Shipping Services (SISS)', location: 'London, UK', role: 'Core shipping management — LNG, crude oil, chemical tankers' },
        { name: 'Shell Maritime Technologies', location: 'The Hague, Netherlands', role: 'Dedicated maritime R&D centre — $1B+ annual R&D' },
        { name: 'Shell Cadetship Programme', location: 'UK', role: 'Nautical Sciences + Marine Engineering Foundation Degrees (fully sponsored)' }
      ],
      namedVessels: [
        { name: 'Murex', type: 'Oil tanker', highlight: 'First oil tanker to transit the Suez Canal for bulk oil transport (1892)' },
        { name: 'Vulcanus', type: 'Diesel-powered ship', highlight: 'World\'s first ocean-going diesel-powered vessel (1910)' },
        { name: 'Suiso Frontier', type: 'Liquefied hydrogen carrier', highlight: 'World\'s first liquefied hydrogen carrier — technically managed by Shell' },
        { name: 'Agnita', type: 'LPG carrier', highlight: 'World\'s first purpose-built LPG carrier (1930)' },
        { name: 'Orion Hugo', type: 'LNG carrier', highlight: 'Latest addition to 24-sister LNG fleet rejuvenation program (Aug 2025)' }
      ]
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
    ],
    campusRecruitmentSeason: 'UK Cadetship Cycle (Foundation Degree)',
    yearByYearGuide: {
      year1: { focus: 'Cognitive & Communication Skills', subjects: ['Numerical Reasoning (speed & accuracy)', 'Verbal Reasoning', 'Abstract Reasoning', 'English Communication', 'HSE Awareness basics'], tips: ['Shell uses cognitive ability tests - start speed training', 'Learn STAR method for behavioral questions from Year 1', 'Shell is EXTREMELY safety-conscious - understand HSE culture', 'Study the Murex (first oil tanker through Suez Canal, 1892)'] },
      year2: { focus: 'Technical Marine Foundations', subjects: ['Marine Engineering fundamentals', 'LNG carrier basics (containment systems)', 'Inert Gas Systems', 'Basic HSE protocols', 'Shell company knowledge'], tips: ['Shell manages 25% of global LNG carriers - know LNG basics', 'Understand Membrane vs Moss containment systems', 'Start studying HSE scenarios', 'Know about the Vulcanus - first diesel ocean vessel (1910)'] },
      year3: { focus: 'Assessment Day Preparation', subjects: ['Group exercises & presentations', 'Case study analysis', 'Technical marine assessments', 'Behavioral competency questions', 'Shell values alignment'], tips: ['Shell has Assessment Day with group activities and panel interview', 'Video interview is pre-recorded - practice speaking to camera', 'Know JAWS system (Just Add Water) for draft optimization', 'Understand dual-fuel X-DF engines on new LNG carriers'] },
      year4: { focus: 'Cadetship Application Mastery', subjects: ['Advanced LNG operations', 'Shell sustainability (net-zero 2050)', 'Suiso Frontier hydrogen carrier project', 'Emergency response procedures'], tips: ['Shell Cadetship is a Foundation Degree (fully sponsored)', 'Know the 24-sister LNG fleet rejuvenation program', 'Reference Orion Hugo (latest LNG carrier, Aug 2025)', 'Shell spends $1B+ on R&D annually - show you value innovation'] }
    },
    psychometricDetails: { testName: 'Shell Online Cognitive Assessment', duration: 90, totalQuestions: 60, format: 'Cognitive ability + Video Interview + Assessment Day', traits: ['Cognitive agility', 'Verbal communication', 'HSE mindset', 'Leadership', 'Shell values alignment'], tips: ['Cognitive test has numerical, verbal, and abstract sections', 'Video interview: rehearse STAR answers but be natural', 'Assessment Day includes group exercises - show leadership', 'Shell values: Honesty, Integrity, Respect for People', 'Practice Shell-specific online assessment tools'] },
    cbtDetails: { sampleTopics: ['LNG Containment Systems', 'Inert Gas System', 'HSE Scenarios', 'Shell Fleet History', 'JAWS System', 'Cargo Operations'], yearWiseTopics: { year1: ['Numerical Reasoning', 'Verbal Reasoning', 'Abstract Reasoning', 'English Communication'], year2: ['Marine Engineering', 'LNG fundamentals', 'Inert Gas Systems', 'HSE Protocols'], year3: ['Assessment Day prep', 'Group exercises', 'Case studies', 'Behavioral competencies'], year4: ['Advanced LNG ops', 'Shell sustainability', 'Hydrogen carriers', 'Emergency response'] }, commonMistakes: ['Not preparing for HSE-focused interview questions', 'Ignoring the video interview round', 'Not knowing Shell maritime innovations (Vulcanus, JAWS, Suiso Frontier)', 'Underestimating the Assessment Day group exercises'] }
  },

  torm: {
    id: 'torm', name: 'TORM A/S', shortName: 'Torm',
    icon: '<img src="https://www.google.com/s2/favicons?domain=torm.com&sz=128" class="company-logo-img" alt="torm">', color: '#0369a1', hq: 'Copenhagen, Denmark', fleetSize: '90+ product tankers',
    vesselTypes: ['Product Tankers (LR2, LR1, MR)'],
    difficulty: 6, website: 'https://www.torm.com',
    companyKnowledge: {
      founded: 1889, motto: 'Moving Energy Safely and Efficiently',
      history: 'Founded in 1889 by Ditlev Torm and Christian Schmiegelow in Copenhagen. Listed on Copenhagen Stock Exchange in 1905 — one of the oldest listed shipping companies. Also listed on NASDAQ New York. Pivoted from general cargo to product tankers in the 1970s. Divested last bulk carriers in 2015 to become pure product tanker operator. Acquired 24 product tankers from OMI Corporation (2007, with Teekay). Expanded to 96 vessels in 2024 ($340M acquisition of 8 MR vessels). World\'s third-largest product tanker operator behind Hafnia and Scorpio Tankers. Fleet ranges from LR2 (115,000 dwt) to MR (45,000 dwt). Average fleet age ~11.3 years; 85% equipped with scrubbers. Marine Engineering segment developing green marine equipment.',
      keyFacts: ['Founded 1889 — over 135 years of maritime history','3rd largest product tanker operator globally','~90 owned/operated vessels (LR2, LR1, MR classes)','Listed on Nasdaq Copenhagen and NASDAQ New York','First Danish shipping company to sign UN Global Compact','Specializes in refined oil products: gasoline, jet fuel, naphtha, diesel'],
      innovation: '"One Torm" integrated business model for operational efficiency. Ownership stake in ME Production (green marine equipment). Advanced hull designs for reduced fuel consumption. Member of Mærsk Mc-Kinney Møller Center for Zero Carbon Shipping.',
      sustainability: '40% carbon intensity reduction target by 2025 (achieved 39.6% by 2023). Zero CO2 fleet emissions by 2050. Wastewater treatment on older vessels. SASB and TCFD sustainability reporting.',
      impressInterviewer: ['Know they are the 3rd largest product tanker operator','Mention their 135+ year heritage since 1889','Reference the One Torm integrated business model','Discuss their near-achievement of 40% carbon reduction target'],
      officialLinks: { main: 'https://www.torm.com', careers: 'https://www.torm.com/careers' },
      subsidiaries: [
        { name: 'TORM A/S', location: 'Copenhagen, Denmark', role: 'Headquarters — product tanker operations' },
        { name: 'ME Production A/S', location: 'Denmark', role: 'Marine Engineering — green marine equipment development' },
        { name: 'TORM Foundation', location: 'Denmark', role: 'Supports maritime education in India and Philippines' }
      ]
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
    ],
    campusRecruitmentSeason: 'Sep-Nov (Copenhagen & India)',
    yearByYearGuide: {"year1":{"focus":"Maritime Basics & English","subjects":["Maritime Knowledge fundamentals","English Proficiency","Reasoning & Aptitude","Product tanker awareness","Safety basics"],"tips":["Torm is the 3rd largest product tanker operator - learn what product tankers carry","Focus on English - 30% weight in CBT","Know that Torm was founded in 1889 - 135+ years of history","Start learning difference between crude and product tankers"]},"year2":{"focus":"Product Tanker Operations","subjects":["Tank cleaning procedures","Cargo pump systems","Inert Gas Systems","Product types (gasoline, diesel, naphtha, jet fuel)","Tanker safety"],"tips":["Know the difference between wall wash and cargo sampling","Understand why tank cleaning is critical between different cargoes","Learn about LR2, LR1, MR tanker classes","Study the One Torm business model"]},"year3":{"focus":"Technical Interview Prep","subjects":["Advanced tanker operations","COW vs tank cleaning","ISM Code implementation","Gas-freeing procedures","MARPOL Annex I & II"],"tips":["Torm CBT: 50 Qs, 60 min, no negative marking - good success rate","Maritime Knowledge has 40% weight - focus there","Know about ME Production (green marine equipment subsidiary)","Prepare inert gas system questions - frequently asked"]},"year4":{"focus":"Company Mastery & Interview","subjects":["Torm sustainability (39.6% carbon reduction by 2023)","Product tanker market dynamics","TORM Foundation maritime education","Career path on product tankers"],"tips":["Reference the near-achievement of 40% carbon reduction target","Know they divested all bulk carriers in 2015 - pure product focus","Mention the TORM Foundation supporting maritime education in India","Listed on both Copenhagen and NASDAQ - dual listing"]}},
    psychometricDetails: {"testName":"Torm Basic Personality Assessment","duration":30,"totalQuestions":50,"format":"Personality questionnaire","traits":["Safety consciousness","Adaptability","Teamwork","Responsibility","Work ethic"],"tips":["Straightforward personality assessment","Show alignment with safety-first culture","Demonstrate willingness for long tanker voyages","Be honest - no trick questions"]},
    cbtDetails: {"sampleTopics":["Product Tanker Classes (LR2, LR1, MR)","Tank Cleaning","Inert Gas System","Cargo Pump System","COW vs Tank Cleaning"],"yearWiseTopics":{"year1":["Maritime basics","English proficiency","Reasoning","Product tanker awareness"],"year2":["Tank cleaning","Cargo pumps","IGS","Product types"],"year3":["Advanced tanker ops","COW","ISM Code","Gas-freeing"],"year4":["Sustainability","Market dynamics","Company deep-dive"]},"commonMistakes":["Not knowing what products are carried on product tankers","Confusing crude oil tanker ops with product tanker ops","Ignoring tank cleaning procedures","Not knowing Torm heritage (1889)"]}
  },

  scorpio: {
    id: 'scorpio', name: 'Scorpio Group', shortName: 'Scorpio',
    icon: '<img src="https://www.google.com/s2/favicons?domain=scorpiomarine.co.in&sz=128" class="company-logo-img" alt="scorpiogroup">', color: '#b91c1c', hq: 'Monaco', fleetSize: '90+ tankers',
    vesselTypes: ['Product Tankers (LR2, MR, Handymax)'],
    difficulty: 7, website: 'https://www.scorpiogroup.net',
    companyKnowledge: {
      founded: 1976, motto: 'Innovation, Sustainability, Excellence',
      history: 'Founded in 1976 by Glauco Lolli-Ghetti in New York, later relocated to Monaco. Now led by grandson Emanuele A. Lauro. Scorpio Tankers IPO\'d on NYSE in 2010. Scorpio Bulkers (2013) pivoted from dry bulk to offshore wind in 2020. Lolli-Ghetti commissioned double-hull ships 27 years before they became mandatory — a true environmental pioneer.',
      keyFacts: ['70+ years of combined industry experience','Founder Glauco Lolli-Ghetti was a double-hull pioneer (27 years before regulation)','~90 product tankers — one of the youngest fleets (avg age ~10 years)','Listed on NYSE (Scorpio Tankers: STNG)','Founding member of IMPA Maritime Environmental Footprint Initiative','Fleet 100% equipped with ballast water management systems','Near-100% reduction in single-use plastics on vessels (2023)'],
      innovation: 'FOWE™ fuel-saving devices installed fleet-wide. Nearly 90% fleet equipped with exhaust gas scrubbers. High-frequency real-time data collection for performance optimization. Pioneered the shift from dry bulk to offshore wind (Scorpio Bulkers → wind turbine installation).',
      sustainability: '40% carbon intensity reduction by 2030 target (30% achieved). 100% ballast water management systems. Near-zero single-use plastics. Proactive hull and engine maintenance for fuel efficiency. Support for Mercy Ships humanitarian initiative.',
      impressInterviewer: ['Mention founder\'s double-hull innovation 27 years before regulation','Know about FOWE™ fuel-saving technology','Reference their Mercy Ships humanitarian support','Discuss the Scorpio Bulkers to offshore wind pivot'],
      officialLinks: { main: 'https://www.scorpiogroup.net', india: 'https://www.scorpiomarine.co.in', tankers: 'https://www.scorpiotankers.com' },
      subsidiaries: [
        { name: 'Scorpio Group', location: 'Monaco (HQ)', role: 'Parent holding company — shipping and offshore' },
        { name: 'Scorpio Tankers Inc. (NYSE: STNG)', location: 'Monaco', role: 'Publicly traded product tanker company' },
        { name: 'Scorpio Marine Management (India) Pvt Ltd', location: 'Mumbai, India', role: 'Technical, crewing, and operational services (est. 2009)', website: 'https://www.scorpiomarine.co.in' },
        { name: 'Scorpio Ship Management SAM', location: 'Monaco', role: 'Global ship management since 1971' }
      ]
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
    ],
    campusRecruitmentSeason: 'Year-round (Monaco/India campus drives)',
    yearByYearGuide: {"year1":{"focus":"Tanker Basics & Safety","subjects":["Basic maritime knowledge","Tanker fleet awareness","English & communication","Safety fundamentals","General aptitude"],"tips":["Scorpio is one of largest tanker groups - learn their fleet split","Know Emanuele Lauro (CEO) and the Lolli-Ghetti family heritage","Basic fire safety on tankers is always tested","Start with pool concept understanding"]},"year2":{"focus":"Tanker Systems Knowledge","subjects":["Product tanker operations","Dry bulk carrier operations","Cargo handling systems","Pump room safety","Tank cleaning procedures"],"tips":["Scorpio has both tankers AND bulkers - know both segments","Scorpio Tankers: 100+ product/chemical tankers","Scorpio Bulkers renamed to Eneti (became wind farm vessel company)","Learn about cargo segregation on chemical tankers"]},"year3":{"focus":"Technical Deep-Dive","subjects":["Advanced tanker operations","Chemical tanker cargo systems","Environmental regulations for tankers","Inert gas and cargo protection","VPQ and cargo documentation"],"tips":["Scorpio operates from Monaco - know about the Monaco Maritime Cluster","Pool concept: Scorpio Tankers Pool and Handymax Tanker Pool","Know about eco-design vessels in their fleet","Safety and environmental compliance are key interview topics"]},"year4":{"focus":"Interview Readiness","subjects":["Company deep-dive: dual-structure (Tankers + Group)","Chartering and commercial operations","Market analysis for product tankers","Advanced safety management"],"tips":["Know the difference between Scorpio Group and Scorpio Tankers","Reference their eco-efficient vessel designs","Prepare for commercial awareness questions","Monaco-based but significant India operations"]}},
    psychometricDetails: {"testName":"Scorpio Basic Personality Assessment","duration":30,"totalQuestions":50,"format":"Personality and behavioral assessment","traits":["Safety mindset","Adaptability","Team orientation","Responsibility","Commercial awareness"],"tips":["Simple personality assessment","Show safety-first thinking","Demonstrate commercial awareness","Be authentic in responses"]},
    cbtDetails: {"sampleTopics":["Product Tanker Operations","Chemical Tanker Cargo Systems","Pump Room Safety","Tank Cleaning","Fire Safety on Tankers","Cargo Documentation"],"yearWiseTopics":{"year1":["Maritime basics","Tanker fleet awareness","English","Safety fundamentals"],"year2":["Product tanker ops","Bulk carrier ops","Cargo handling","Pump room safety"],"year3":["Chemical tanker systems","Environmental regulations","IGS","VPQ"],"year4":["Company knowledge","Chartering","Market analysis","Advanced safety"]},"commonMistakes":["Confusing Scorpio Tankers with Scorpio Group","Not knowing the pool concept","Ignoring chemical tanker operations","Not knowing Monaco as maritime hub"]}
  },

  kline: {
    id: 'kline', name: 'Kawasaki Kisen Kaisha', shortName: 'K-Line',
    icon: '<img src="https://www.google.com/s2/favicons?domain=kline.co.in&sz=128" class="company-logo-img" alt="kline">', color: '#dc2626', hq: 'Tokyo, Japan', fleetSize: '448 vessels',
    vesselTypes: ['Car Carriers', 'Bulk Carriers', 'LNG Carriers', 'Tankers'],
    difficulty: 7, website: 'https://www.kline.co.jp',
    companyKnowledge: {
      founded: 1919, motto: '"K" LINE Vision — Synergies for the Future',
      history: 'Established April 5, 1919 in Kobe, Japan from Kawasaki Heavy Industries\' shipping division. "K" comes from Kawasaki Kisen + Kawasaki Zosen + Kokusai Kisen (1921). Lost 56 vessels in WWII, rebuilt from just 12 ships. Deployed Japan\'s first Pure Car Carrier in 1970. Container operations merged into Ocean Network Express (ONE) in 2017.',
      keyFacts: ['Deployed Japan\'s first Pure Car Carrier (TOYOTA MARU No.10) in 1970','~448 vessels as of March 2025','Operates 50 LNG carriers','One of the "Big 3" Japanese shipping companies','Co-founder of ONE (Ocean Network Express) for container shipping','First Japanese company to establish intermodal Double-Stack Train transport (1986)','Transports 3+ million vehicles annually'],
      innovation: 'Japan\'s first PCC (1970). First Japanese Double-Stack Train intermodal transport (1986). Exploring Seawing automated kite systems for wind propulsion. LNG-fueled car carriers (Oceanus Highway, Tethys Highway). AI/IoT for vessel operations. Liquefied CO2 carrier design. CO2 capture demonstration plants.',
      sustainability: 'Environmental Vision 2050: net-zero GHG by 2050. "DRIVE GREEN NETWORK" environmental management system. Marine biofuel trials on bulk carriers. Getting to Zero Coalition member. Beach cleanups and plastic cap collection programs.',
      impressInterviewer: ['Know they are one of Japan\'s Big 3 shipping companies','Mention the first Pure Car Carrier (1970)','Reference ONE — the container shipping joint venture','Discuss Seawing kite technology and CO2 carrier concepts','Know the Environmental Vision 2050'],
      officialLinks: { main: 'https://www.kline.co.jp', india: 'https://www.kline.co.in', one: 'https://www.one-line.com' },
      subsidiaries: [
        { name: 'K Line Ship Management (Singapore)', location: 'Singapore', role: 'Ship management operations for Asia region' },
        { name: 'K Line (India) Pvt Ltd', location: 'India', role: 'Indian operations and crew management', website: 'https://www.kline.co.in' },
        { name: 'Ocean Network Express (ONE)', location: 'Singapore', role: 'Container shipping JV with MOL and NYK (est. 2017)', website: 'https://www.one-line.com' },
        { name: 'International Transportation Service', location: 'Long Beach, USA', role: 'Container terminal company (est. 1971)' }
      ],
      namedVessels: [
        { name: 'Toyota Maru No. 10', type: 'Pure Car Carrier', highlight: 'Japan\'s first pure car carrier (1970)' },
        { name: 'Oceanus Highway', type: 'LNG-fueled car carrier', highlight: 'Next-generation LNG-powered vehicle carrier' },
        { name: 'Tethys Highway', type: 'LNG-fueled car carrier', highlight: 'LNG dual-fuel car carrier for green transport' }
      ]
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
    ],
    campusRecruitmentSeason: 'Japanese hiring cycle (Oct-Mar)',
    yearByYearGuide: {"year1":{"focus":"Japanese Business Culture","subjects":["Basic maritime knowledge","English proficiency","Japanese business etiquette","Car carrier awareness","General ship knowledge"],"tips":["K-Line is part of ONE Alliance with NYK and MOL - know this","Study Japanese business culture: respect, punctuality, humility","K-Line specializes in car carriers - largest in the world","Know Century Ship Program and environmental initiatives"]},"year2":{"focus":"Car Carrier & Dry Bulk Knowledge","subjects":["PCTC/PCC vessel types","Car carrier lashing and securing","Dry bulk operations","LNG carrier basics","ONE Alliance operations"],"tips":["Know the difference between PCTC and PCC vessels","Vehicle lashing and securing is unique to car carriers","K-Line also operates LNG carriers and dry bulkers","Study the ONE Alliance structure: K-Line + NYK + MOL"]},"year3":{"focus":"Technical Mastery","subjects":["Advanced car carrier operations","Environmental regulations","LNG dual-fuel vessels","K-Line digital transformation","Safety management"],"tips":["K-Line CBT: 50 Qs, 60 min - moderate difficulty","Know about Corona Series VLCC and Century Ships","Understand car carrier ventilation systems","Study EEDI and energy efficiency requirements"]},"year4":{"focus":"Cultural Fit & Interview","subjects":["K-Line company deep-dive: 105+ year heritage","ONE Alliance commercial operations","Environmental Vision 2050","Career path in Japanese shipping"],"tips":["Reference the K Line red funnel mark","Know founder Kinjiro Hori and founding in 1919","Mention ONE Alliance contribution to container shipping","Show respect for Japanese corporate values"]}},
    psychometricDetails: {"testName":"K-Line Cultural Fit Assessment","duration":30,"totalQuestions":50,"format":"Cultural fit and personality assessment","traits":["Respectfulness","Teamwork","Attention to detail","Safety consciousness","Adaptability"],"tips":["Japanese companies value humility and team orientation","Show respect for hierarchy and seniority","Demonstrate attention to detail","Express genuine interest in Japanese maritime culture","Be punctual - Japanese culture values time"]},
    cbtDetails: {"sampleTopics":["Car Carrier Operations","PCTC vs PCC","Vehicle Lashing","LNG Operations","Dry Bulk Cargo","ONE Alliance"],"yearWiseTopics":{"year1":["Maritime basics","English","Japanese business culture","Car carrier awareness"],"year2":["PCTC/PCC vessels","Lashing & securing","Dry bulk ops","ONE Alliance"],"year3":["Advanced car carrier ops","Environmental regs","LNG dual-fuel","Digital transformation"],"year4":["Company deep-dive","ONE Alliance commercial","Environmental Vision 2050"]},"commonMistakes":["Not understanding Japanese business culture","Confusing K-Line with other ONE partners","Not knowing car carrier specific operations","Ignoring the ONE Alliance importance"]}
  },

  nyk: {
    id: 'nyk', name: 'Nippon Yusen Kabushiki Kaisha', shortName: 'NYK Line',
    icon: '<img src="https://www.google.com/s2/favicons?domain=nyk.com&sz=128" class="company-logo-img" alt="nyk">', color: '#1d4ed8', hq: 'Tokyo, Japan', fleetSize: '800+ vessels',
    vesselTypes: ['Car Carriers (RORO)', 'LNG Carriers', 'Bulk Carriers', 'Tankers', 'Container Ships', 'Cruise'],
    difficulty: 8, website: 'https://www.nyk.com',
    companyKnowledge: {
      founded: 1885, motto: 'Bringing Value to Life — Sustainable Solution Provider',
      history: 'Founded 1885 from merger of Mitsubishi Mail Steamship and Kyodo Unyu Kaisha, starting with 58 ships. First liner to US (1896) and Europe (1896). Lost 185 ships in WWII. Operated Japan\'s first container vessel Hakone Maru (1968). Co-founded ONE in 2018.',
      keyFacts: ['Founded 1885 — nearly 140 years of maritime history','World\'s largest RORO/car carrier operator (100+ PCCs/PCTCs)','800+ vessels in fleet','91 LNG carriers (expanding to 130 by 2028)','16% of global car transportation fleet capacity','Co-founder of ONE — world\'s 6th largest container line','Launched world\'s first LNG-fueled car carriers'],
      innovation: 'World\'s first LNG-fueled car carriers. DFFAS autonomous ship project. IoT/big data for remote monitoring and predictive maintenance. Ammonia-fuel ready LNG vessel designs. Digital twin technology for fleet management.',
      sustainability: '"Sail GREEN" project for vehicle logistics emissions. Net-zero GHG by 2050. LNG as bridge fuel strategy. Exploring methanol, biofuels, ammonia. Green ship recycling. Marine biodiversity conservation.',
      impressInterviewer: ['Know they are the world\'s #1 RORO operator','Mention DFFAS autonomous ship project','Reference their massive LNG carrier expansion plans','Discuss Sail GREEN sustainability project'],
      officialLinks: { main: 'https://www.nyk.com/english/', shipmanagement: 'https://www.nyksm.com.sg', careers: 'https://www.nyk.com/english/csr/' },
      subsidiaries: [
        { name: 'NYK Shipmanagement (NYKSM)', location: 'Singapore', role: 'In-house ship management — 125+ vessels technical management, 200+ crewing (est. 2001)', website: 'https://www.nyksm.com.sg' },
        { name: 'NYK-Fil Ship Management (NFSM)', location: 'Philippines', role: 'Filipino crew management operations' },
        { name: 'NYK Europe Ltd', location: 'London, UK', role: 'European logistics and shipping operations', website: 'https://www.nykeurope.com' },
        { name: 'Ocean Network Express (ONE)', location: 'Singapore', role: 'Container shipping JV with MOL and K-Line (est. 2017)', website: 'https://www.one-line.com' },
        { name: 'NYK Cruises / Asuka Cruise', location: 'Japan', role: 'Luxury cruise operations — Asuka II' }
      ],
      namedVessels: [
        { name: 'Sakigake', type: 'Ammonia-fueled tugboat', highlight: 'World\'s first commercial ammonia-fueled tugboat (completed Aug 2024)' },
        { name: 'Hakone Maru', type: 'Container ship', highlight: 'Japan\'s first full container vessel (1968)' },
        { name: 'Asuka II', type: 'Cruise ship', highlight: 'Japan\'s largest luxury cruise ship' },
        { name: 'Auriga Leader', type: 'Solar-powered car carrier', highlight: 'World\'s first partially solar-powered cargo ship (2008)' }
      ]
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
    ],
    campusRecruitmentSeason: 'Japanese hiring cycle (Oct-Mar)',
    yearByYearGuide: {"year1":{"focus":"Corporate Foundation","subjects":["Maritime fundamentals","English proficiency","Japanese corporate etiquette","LNG carrier basics","General ship knowledge"],"tips":["NYK is the largest in ONE Alliance by fleet contribution","Mitsubishi Group heritage - know the three-diamond logo","NYK Super Eco Ship 2050 concept - learn the vision","Founded in 1885 by Yataro Iwasaki (Mitsubishi)"]},"year2":{"focus":"LNG & Gas Carrier Knowledge","subjects":["LNG carrier containment (Moss, Membrane, SPB)","Gas cargo operations","Car carrier operations","Dry bulk carrier fundamentals","ONE Alliance logistics"],"tips":["NYK operates 85+ LNG carriers - largest fleet globally","Know SPB containment system (IHI self-supporting prismatic)","Study FSRU operations - floating regasification","NYK has the most diverse fleet types among Japanese shipping"]},"year3":{"focus":"Technical Depth","subjects":["Advanced LNG operations","Ship-to-ship transfer","FSRU/FPSO operations","Environmental regulations","Green ammonia fuel projects"],"tips":["NYK CBT: 60 Qs, 75 min - moderate to hard difficulty","Know about NYK IBIS (Intelligent Bridge Information System)","Study the Hisho Maru green ammonia project","Understand boil-off gas management on LNG carriers"]},"year4":{"focus":"Innovation & Interview Readiness","subjects":["NYK Super Eco Ship 2050","Autonomous vessel projects","Digital transformation (MTI)","Carbon neutral target by 2050","Company heritage"],"tips":["Reference the MTI (Monohakobi Technology Institute) R&D center","Know about autonomous navigation experiments","Mention NYK Super Eco Ship 2050 powered by renewable energy","Show respect for Mitsubishi-era heritage (140+ years)"]}},
    psychometricDetails: {"testName":"NYK Management Assessment","duration":45,"totalQuestions":60,"format":"Management potential and cultural fit assessment","traits":["Leadership potential","Team collaboration","Innovation mindset","Cultural sensitivity","Safety orientation"],"tips":["NYK values innovation - show tech-forward thinking","Demonstrate collaborative leadership style","Show interest in autonomous shipping and AI","Express genuine interest in Japanese work culture","Be humble but show initiative"]},
    cbtDetails: {"sampleTopics":["LNG Containment Systems (Moss, Membrane, SPB)","Gas Cargo Operations","Ship-to-Ship Transfer","FSRU Operations","Boil-Off Gas Management"],"yearWiseTopics":{"year1":["Maritime fundamentals","English","Japanese etiquette","LNG basics"],"year2":["LNG containment types","Gas cargo ops","Car carriers","Dry bulk"],"year3":["Advanced LNG","STS transfer","FSRU/FPSO","Environmental regs"],"year4":["NYK Super Eco Ship","Autonomous vessels","MTI","Carbon neutral"]},"commonMistakes":["Not knowing the 3 LNG containment types","Ignoring FSRU/FPSO operations","Not understanding boil-off gas management","Not mentioning NYK Super Eco Ship 2050 concept"]}
  },

  mol: {
    id: 'mol', name: 'Mitsui O.S.K. Lines', shortName: 'MOL',
    icon: '<img src="css/img/mol-logo.png" class="company-logo-img" style="background:white;padding:4px;border-radius:8px;object-fit:contain" alt="mol">', color: '#ea580c', hq: 'Tokyo, Japan', fleetSize: '800+ vessels',
    vesselTypes: ['Dry Bulk', 'LNG Carriers', 'Car Carriers', 'Tankers', 'Container Ships', 'Cruise', 'FPSOs'],
    difficulty: 8, website: 'https://www.mol.co.jp',
    companyKnowledge: {
      founded: 1884, motto: 'Blue Action 2035 — Ocean Transport, Social Infrastructure, and Clean Energy',
      history: 'Traces back to 1884 with Osaka Shosen Kaisha (OSK). Formed in 1964 from merger of OSK and Mitsui Steamship. World\'s largest dry bulker fleet operator. 105 LNG carriers (targeting 150 by 2030). Holds 31% stake in ONE. Operates MOL Cruises and MOL Sunflower ferries.',
      keyFacts: ['Founded 1884 — over 140 years old','World\'s largest dry bulker fleet','105 LNG carriers (aiming for 150 by 2030)','~110 car carriers (branded as ACE)','31% stake in ONE (container shipping JV)','Operates cruise ships and domestic ferries','Handles 8 million barrels crude oil daily'],
      innovation: 'Wind Challenger Project — rigid sails for wind-assisted propulsion. FOCUS system for fleet data analysis. AI-powered EV fire detection on car carriers. Doppler LiDAR for real-time wind measurement. Sustainable seafarer wellness programs.',
      sustainability: 'MOL Group Environmental Vision 2.2: net-zero by 2050. 45% GHG reduction per unit by 2035. Clean fuels: LNG, methanol, ammonia. Wind Challenger sails. FSRU and LNG social infrastructure development.',
      impressInterviewer: ['Know they have the world\'s largest dry bulker fleet','Mention the Wind Challenger rigid sail project','Reference FOCUS fleet analytics system','Discuss their 31% stake in ONE','Know Environmental Vision 2.2'],
      officialLinks: { main: 'https://www.mol.co.jp/en/', careers: 'https://www.mol.co.jp/en/career/', windchallenger: 'https://www.mol.co.jp/en/sustainability/environment/technology/windchallenger/' },
      subsidiaries: [
        { name: 'MOL Ship Management (Singapore)', location: 'Singapore', role: 'Technical ship management for Asia' },
        { name: 'MOL Drybulk Ltd', location: 'Tokyo', role: 'World\'s largest dry bulk fleet operations' },
        { name: 'MOL LNG Transport', location: 'Tokyo', role: '105 LNG carriers, targeting 150 by 2030' },
        { name: 'MOL ACE (Auto Carrier Express)', location: 'Tokyo', role: '110 car carriers — vehicle transport division' },
        { name: 'Ocean Network Express (ONE)', location: 'Singapore', role: 'Container JV — MOL holds 31% stake', website: 'https://www.one-line.com' },
        { name: 'MOL Sunflower Ltd', location: 'Japan', role: 'Domestic ferry operations' }
      ],
      namedVessels: [
        { name: 'Shofu Maru', type: 'Bulk carrier with Wind Challenger', highlight: 'First vessel equipped with Wind Challenger rigid sail system (2022)' },
        { name: 'Oppama Maru', type: 'Car carrier', highlight: 'Japan\'s first specialized car carrier (1965)' },
        { name: 'Wind Challenger LNG Carrier', type: 'LNG carrier', highlight: 'World\'s first LNG carrier with Wind Challenger sails (delivery 2026, agreement with Chevron)' }
      ]
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
    ],
    campusRecruitmentSeason: 'Japanese hiring cycle (Oct-Mar)',
    yearByYearGuide: {"year1":{"focus":"MOL Group Understanding","subjects":["Maritime basics","English proficiency","Japanese business culture","LNG carrier awareness","MOL Group structure"],"tips":["MOL contributed the most vessels to ONE Alliance","Hashimoto Junichiro is current president","MOL stands for Mitsui O.S.K. Lines (Mitsui heritage)","Study FOCUS system (Freight Optimization and Cost Understanding)"]},"year2":{"focus":"Diverse Fleet Knowledge","subjects":["LNG carrier operations","Car carrier operations (FLEXIE class)","Dry bulk operations","Offshore operations","Chemical tanker basics"],"tips":["MOL operates one of the most diverse fleets globally","Know the MOL FLEXIE class car carriers","Study MOL offshore business (drillships, FPSOs)","Learn about Wind Challenger project (rigid sail technology)"]},"year3":{"focus":"Technical Excellence","subjects":["Advanced LNG operations","Wind Challenger sail-assisted propulsion","Arctic LNG operations","ISHIN NEXT autonomous ship","Environmental regulations"],"tips":["MOL CBT: 60 Qs, 75 min - moderate difficulty","Wind Challenger is MOL signature innovation - know it well","ISHIN NEXT is their autonomous vessel concept","Study Arctic LNG shipping routes and challenges"]},"year4":{"focus":"Innovation & Company Mastery","subjects":["MOL Environmental Vision 2.2","Wind Challenger deployment status","ISHIN NEXT progress","MOL Group structure: 350+ subsidiaries","Career progression at MOL"],"tips":["Quote Environmental Vision 2.2 targets","Reference Wind Challenger on Shofu Maru (first deployment)","Know MOL has 350+ consolidated subsidiaries","FOCUS system shows commercial awareness - mention it"]}},
    psychometricDetails: {"testName":"MOL Cultural Assessment","duration":30,"totalQuestions":60,"format":"Cultural fit and behavioral assessment","traits":["Innovation drive","Environmental awareness","Team collaboration","Safety priority","Japanese work values"],"tips":["MOL values environmental innovation heavily","Show awareness of green shipping technologies","Demonstrate team-first mentality","Express interest in diverse vessel types","Be respectful of Japanese corporate hierarchy"]},
    cbtDetails: {"sampleTopics":["LNG Operations","Wind Challenger","Car Carrier Operations","Arctic Shipping","ISHIN NEXT","FOCUS System"],"yearWiseTopics":{"year1":["Maritime basics","English","Japanese culture","MOL Group structure"],"year2":["LNG carriers","Car carriers (FLEXIE)","Dry bulk","Offshore ops"],"year3":["Advanced LNG","Wind Challenger","Arctic LNG","ISHIN NEXT"],"year4":["Environmental Vision 2.2","Innovation portfolio","Company deep-dive"]},"commonMistakes":["Not knowing the Wind Challenger project","Confusing MOL with other ONE partners","Not understanding the FOCUS system","Ignoring MOL offshore business segment"]}
  },

  andromeda: {
    id: 'andromeda', name: 'International Andromeda Shipping', shortName: 'Andromeda',
    icon: '<img src="https://www.google.com/s2/favicons?domain=andromeda-shipping.com&sz=128" class="company-logo-img" alt="andromeda-shipping">', color: '#6366f1', hq: 'Monaco / Mumbai', fleetSize: '30+ tankers & FSOs',
    vesselTypes: ['Product Tankers', 'MR Tankers', 'LR2 Tankers', 'LPG Carriers', 'FSOs'],
    difficulty: 8, website: 'https://www.andromeda-shipping.com',
    companyKnowledge: {
      founded: 1992, motto: 'Safe, Efficient and Environmentally Responsible Tanker Operations',
      history: 'Founded in 1992. Started with first product tanker Blue Star (29,900 DWT). Ship management company established in Monaco in 1995. Diversified into FSO (Floating Storage & Offloading) market between 2000-2010. Expanded into bitumen business in 2024. Strong operational presence in Mumbai for crewing and quality management.',
      keyFacts: ['Founded 1992 — 30+ years in tanker operations','Fleet of 30+ tankers and FSOs (37,000 to 160,000 DWT)','HQ in Monaco, major crewing office in Mumbai','Specializes in oil/chemical tanker management','Interview difficulty rated 8/10 by candidates','Zero-incident target for oil spillage','New vessels being built regularly (2024 newbuilds)'],
      innovation: 'Modern fleet with vessels averaging under 10 years old. Advanced cargo management systems for chemical/oil products. FSO conversion and operation expertise. Digital vessel monitoring and performance tracking.',
      sustainability: 'Zero spillage policy. Modern young fleet with efficient engines. Ballast water treatment compliance. Energy-efficient hull designs on newbuilds.',
      impressInterviewer: ['Know their Monaco HQ + Mumbai operations model','Mention their FSO expertise','Reference the zero-incident/zero-spillage policy','Discuss their fleet expansion with newbuilds'],
      officialLinks: { main: 'https://www.andromeda-shipping.com', fleet: 'https://www.andromeda-shipping.com/our-ships/', careers: 'https://www.andromeda-shipping.com/careers/' },
      subsidiaries: [
        { name: 'International Andromeda Shipping SAM', location: 'Le Gildo Pastor Center, 7 Rue du Gabian, 98000 Monaco', role: 'Headquarters — commercial, technical, operational management' },
        { name: 'Andromeda Shipping (India) Pvt Ltd', location: '501 The Eagle\'s Flight, 263 Suren Road, Andheri East, Mumbai 400 093', role: 'Indian operations — crew management and quality control' }
      ]
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
    ],
    campusRecruitmentSeason: 'Year-round (Athens/India)',
    yearByYearGuide: {"year1":{"focus":"Greek Shipping Awareness","subjects":["Maritime basics","English proficiency","Greek shipping industry overview","Tanker basics","General aptitude"],"tips":["Andromeda is a Greek-Indian hybrid operation","Founded in Athens but significant India operations","Know what product and chemical tankers are","Start learning about tanker operations early"]},"year2":{"focus":"Tanker & Container Knowledge","subjects":["Product tanker operations","Container vessel operations","Dry bulk carrier basics","Safety management","ISM Code"],"tips":["Andromeda manages tankers, containers, and bulkers","Know ISM Code 12 elements","Study ISGOTT for tanker safety","Practice basic technical drawings"]},"year3":{"focus":"Technical Preparation","subjects":["Advanced tanker systems","Cargo handling safety","MARPOL compliance for tankers","Vetting inspections","Ship maintenance"],"tips":["Andromeda CBT: 50 Qs, 60 min - moderate difficulty","Vetting inspection procedures are important","Know CDI and SIRE inspection differences","Study cargo tank inspection requirements"]},"year4":{"focus":"Interview & Company Deep-Dive","subjects":["Company fleet details","Greek shipping heritage","Quality management systems","Career growth path","Industry trends"],"tips":["Show understanding of Greek shipping culture","Reference their quality management approach","Discuss your interest in international shipping","Prepare for practical scenario questions"]}},
    psychometricDetails: {"testName":"Andromeda Basic Personality Assessment","duration":25,"totalQuestions":40,"format":"Basic personality questionnaire","traits":["Adaptability","Safety consciousness","Team orientation","Reliability","Communication skills"],"tips":["Simple personality assessment","Be honest and consistent","Show adaptability to different cultures","Demonstrate safety-first thinking"]},
    cbtDetails: {"sampleTopics":["Product Tanker Operations","Container Vessel Operations","ISM Code","ISGOTT","Vetting Inspections","Cargo Tank Inspections"],"yearWiseTopics":{"year1":["Maritime basics","English","Greek shipping overview","Tanker basics"],"year2":["Product tanker ops","Container ops","Dry bulk","ISM Code"],"year3":["Advanced tanker systems","MARPOL compliance","Vetting inspections"],"year4":["Company deep-dive","Quality management","Industry trends"]},"commonMistakes":["Not knowing Greek shipping industry importance","Ignoring vetting inspection procedures","Not understanding CDI vs SIRE","Underestimating the interview difficulty"]}
  },

  eastaway: {
    id: 'eastaway', name: 'Eastaway Ship Management', shortName: 'Eastaway',
    icon: '<img src="https://www.google.com/s2/favicons?domain=eastaway.com&sz=128" class="company-logo-img" alt="eastaway">', color: '#059669', hq: 'Singapore / Mumbai', fleetSize: '50+ container ships',
    vesselTypes: ['Container Ships (700 TEU to 7000 TEU)'],
    difficulty: 6, website: 'https://www.eastaway.com',
    companyKnowledge: {
      founded: 2010, motto: 'Reliable Container Ship Management',
      history: 'Eastaway Ship Management Pte Ltd incorporated August 25, 2020 in Singapore at 11 Duxton Hill. Part of the X-Press Feeders Group — one of the world\'s largest independent container feeder operators. Over a decade of experience in ship ownership and technical management. Fleet of 60+ container vessels ranging from 700 TEU to 7,000 TEU. 29 newbuilds on order including 8 x 7,092 TEU, 8 x 1,264 TEU dual-fueled, and 6 x 1,250 TEU dual-fueled methanol vessels. Management offices in Singapore and Southampton. Purchased 8 x 1,170 TEU newbuilds (2021) and 4 x 7,000 TEU newbuilds. Fleet includes Baltic Fulmar, Alioth, Atlantis A, Baltic Petrel, Baltic Shearwater.',
      keyFacts: ['Specializes exclusively in container ships','50+ container ships (700 to 7000 TEU range)','Singapore HQ with Mumbai India operations','Young fleet — 46% of vessels are under 5 years old','Growing fleet with new builds under construction','Environmental compliance through Eastaway India partnership'],
      innovation: 'Modern fleet with latest engine technologies. Digital fleet monitoring. Energy-efficient container vessel designs. Standardized maintenance protocols across diverse TEU range.',
      sustainability: 'Young fleet with modern engines (lower emissions). Environmental compliance partnerships. Energy-efficient operations. Container optimization for fuel savings.',
      impressInterviewer: ['Know they specialize ONLY in container ships','Mention their young fleet age profile','Reference the Singapore-Mumbai operational model','Discuss container ship-specific challenges (parametric rolling, lashing)'],
      officialLinks: { main: 'https://eastaway.com', india: 'https://www.eastawayindia.com' },
      subsidiaries: [
        { name: 'Eastaway Ship Management Pte Ltd', location: '11 Duxton Hill, Singapore', role: 'Headquarters — ship ownership and technical management (est. 2020)' },
        { name: 'X-Press Feeders Group', location: 'Singapore', role: 'Parent group — world\'s largest independent container feeder operator' },
        { name: 'Eastaway India', location: 'Mumbai, India', role: 'Crew management and Indian operations', website: 'https://www.eastawayindia.com' },
        { name: 'Eastaway Ship Management (UK)', location: 'Southampton, UK', role: 'European management office' }
      ],
      namedVessels: [
        { name: 'Baltic Fulmar', type: '1,638 TEU container ship', highlight: 'Part of Baltic series feeder fleet' },
        { name: 'Baltic Petrel', type: '1,638 TEU container ship', highlight: 'Part of Baltic series feeder fleet' },
        { name: 'Methanol Dual-Fuel Newbuilds', type: '1,250 TEU container ships', highlight: '6 methanol dual-fuel vessels on order — pioneering green feeder shipping' }
      ]
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
    ],
    campusRecruitmentSeason: 'Year-round (India/Singapore)',
    yearByYearGuide: {"year1":{"focus":"Foundation & Industry Awareness","subjects":["Maritime basics","English proficiency","Container shipping basics","Safety fundamentals","General aptitude"],"tips":["Eastaway is part of Evergreen Group - know the parent company","Evergreen Marine is one of top 5 container lines globally","Start learning container operations: TEU, stacking, lashing","Focus on English - communication is valued"]},"year2":{"focus":"Container Operations","subjects":["Container ship operations","Container types (dry, reefer, tank)","Container stacking and lashing","Bay plans and stowage","Port operations"],"tips":["Know container types: 20ft, 40ft, 40ft HC, reefer, tank","Study bay plan reading and container stowage","Understand port operations: gantry cranes, RTGs","Learn about Evergreen S-type and L-type vessels"]},"year3":{"focus":"Technical Mastery","subjects":["Advanced container vessel systems","Stability on container ships","Parametric rolling prevention","Container securing systems","Evergreen fleet knowledge"],"tips":["Eastaway CBT: 50 Qs, 60 min - moderate difficulty","Container ship stability is critical - study GM, GZ","Know about parametric rolling on container ships","Study Evergreen mega container vessels (24000+ TEU)"]},"year4":{"focus":"Interview & Group Knowledge","subjects":["Evergreen Group structure","Container shipping market","OCEAN Alliance partnership","Green shipping initiatives","Career progression"],"tips":["Know Evergreen Group: marine, aviation, hotels, industrial","Reference OCEAN Alliance with COSCO and CMA CGM","Mention Ever Given Suez Canal incident - what you learned","Show awareness of green shipping and LNG-powered container vessels"]}},
    psychometricDetails: {"testName":"Eastaway Basic Personality Assessment","duration":25,"totalQuestions":40,"format":"Basic personality questionnaire","traits":["Reliability","Safety consciousness","Team orientation","Adaptability","Communication"],"tips":["Simple personality assessment","Be honest and straightforward","Show reliability and consistency","Demonstrate safety awareness"]},
    cbtDetails: {"sampleTopics":["Container Ship Operations","Container Types","Bay Plans","Container Lashing","Port Operations","Ship Stability"],"yearWiseTopics":{"year1":["Maritime basics","English","Container shipping basics","Safety fundamentals"],"year2":["Container types","Stacking & lashing","Bay plans","Port operations"],"year3":["Advanced container systems","Ship stability","Parametric rolling","Fleet knowledge"],"year4":["Evergreen Group","OCEAN Alliance","Green shipping","Market analysis"]},"commonMistakes":["Not knowing Eastaway belongs to Evergreen Group","Not understanding container stowage plans","Ignoring parametric rolling on container ships","Not knowing OCEAN Alliance structure"]}
  }

  };

  /* Merge into main object */
  Object.keys(ext).forEach(function(k) {
    INTERVIEW_COMPANIES[k] = ext[k];
  });
})();
