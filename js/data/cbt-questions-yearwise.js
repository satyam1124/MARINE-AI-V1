/* MarineIQ — Year-Wise CBT Question Bank
   Questions categorized by B.Tech year level
   Year 1-2: Class 11/12th PCM, English, Aptitude (for NYK-style CBTs)
   Year 3-4: Marine Engineering, Advanced Systems
   Post-Training: Situational, Company-specific, MEP
   
   yearLevel: 1 | 2 | 3 | 4 | 5 (post-training)
   subject: 'maths' | 'physics' | 'chemistry' | 'english' | 'aptitude' | 'marine' | 'electrical' | 'safety'
*/

var CBT_QUESTIONS_YEARWISE = [

  /* ═══════════════════════════════════════════════
     YEAR 1 — Class 11th PCM Basics + English + Aptitude
     ═══════════════════════════════════════════════ */
  
  // ── MATHS (Class 11) ──
  { id: 'y1m001', question: 'If sin θ = 3/5, what is cos θ?', options: ['4/5', '3/4', '5/3', '5/4'], correct: 0, explanation: 'Using sin²θ + cos²θ = 1: (3/5)² + cos²θ = 1, cos²θ = 1 - 9/25 = 16/25, cos θ = 4/5.', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m002', question: 'The value of log₁₀(1000) is:', options: ['2', '3', '4', '10'], correct: 1, explanation: 'log₁₀(1000) = log₁₀(10³) = 3. Since 10³ = 1000.', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m003', question: 'In an arithmetic progression, if a = 5 and d = 3, the 10th term is:', options: ['30', '32', '35', '27'], correct: 1, explanation: 'aₙ = a + (n-1)d = 5 + 9×3 = 5 + 27 = 32.', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m004', question: 'The derivative of x³ with respect to x is:', options: ['x²', '2x²', '3x²', '3x³'], correct: 2, explanation: 'Power rule: d/dx(xⁿ) = n·xⁿ⁻¹. So d/dx(x³) = 3x².', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m005', question: 'The quadratic equation x² - 5x + 6 = 0 has roots:', options: ['2 and 3', '1 and 6', '-2 and -3', '3 and -2'], correct: 0, explanation: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3. Verify: 2×3 = 6 and 2+3 = 5 ✓', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m006', question: 'The area of a triangle with base 8 cm and height 5 cm is:', options: ['40 cm²', '20 cm²', '13 cm²', '26 cm²'], correct: 1, explanation: 'Area = ½ × base × height = ½ × 8 × 5 = 20 cm².', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m007', question: 'The value of tan 45° is:', options: ['0', '1', '√2', '1/√2'], correct: 1, explanation: 'tan 45° = sin 45°/cos 45° = (1/√2)/(1/√2) = 1. This is a standard trigonometric value.', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m008', question: 'Two matrices A and B can be multiplied (AB) only if:', options: ['Both are square matrices', 'Number of columns of A equals number of rows of B', 'Both have same dimensions', 'Number of rows of A equals number of columns of B'], correct: 1, explanation: 'Matrix multiplication AB is defined only when the number of columns of A equals the number of rows of B. If A is m×n and B is n×p, then AB is m×p.', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m009', question: 'The integral ∫2x dx equals:', options: ['x² + C', '2x² + C', 'x + C', '2 + C'], correct: 0, explanation: '∫2x dx = 2·(x²/2) + C = x² + C. Using the power rule of integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C.', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1m010', question: 'If the probability of an event is 0.3, the probability of its complement is:', options: ['0.3', '0.7', '0.03', '1.3'], correct: 1, explanation: 'P(complement) = 1 - P(event) = 1 - 0.3 = 0.7. The sum of probabilities of an event and its complement is always 1.', category: 'Mathematics', subject: 'maths', yearLevel: 1, difficulty: 'basic' },

  // ── PHYSICS (Class 11) ──
  { id: 'y1p001', question: 'Newton\'s second law of motion states that F equals:', options: ['m × v', 'm × a', 'm × g', 'm × s'], correct: 1, explanation: 'F = ma (Force equals mass times acceleration). This is the fundamental equation relating force, mass, and acceleration.', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p002', question: 'The SI unit of pressure is:', options: ['Newton', 'Pascal', 'Joule', 'Watt'], correct: 1, explanation: 'Pressure is measured in Pascals (Pa). 1 Pa = 1 N/m². Other common units: 1 atm = 101325 Pa, 1 bar = 100000 Pa.', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p003', question: 'A body at rest will remain at rest unless acted upon by an external force. This is:', options: ['Newton\'s 2nd Law', 'Newton\'s 1st Law (Inertia)', 'Newton\'s 3rd Law', 'Law of Conservation of Energy'], correct: 1, explanation: 'Newton\'s First Law (Law of Inertia): A body continues in its state of rest or uniform motion unless acted upon by an external unbalanced force.', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p004', question: 'The unit of work is the same as the unit of:', options: ['Force', 'Energy', 'Power', 'Momentum'], correct: 1, explanation: 'Work and energy are measured in Joules (J). W = F × d (Force × displacement). 1 J = 1 N·m.', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p005', question: 'For an ideal gas, PV = nRT is called:', options: ['Boyle\'s Law', 'Charles\'s Law', 'Ideal Gas Equation', 'Avogadro\'s Law'], correct: 2, explanation: 'PV = nRT is the Ideal Gas Equation combining Boyle\'s (P∝1/V), Charles\'s (V∝T), and Avogadro\'s (V∝n) laws. R = 8.314 J/(mol·K).', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p006', question: 'What is the acceleration due to gravity on Earth\'s surface?', options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '6.8 m/s²'], correct: 1, explanation: 'The standard acceleration due to gravity (g) on Earth\'s surface is approximately 9.8 m/s² (or 9.81 m/s² more precisely).', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p007', question: 'Archimedes\' principle states that the upthrust on a body immersed in a fluid equals:', options: ['Weight of the body', 'Weight of fluid displaced', 'Volume of fluid displaced', 'Density of the fluid'], correct: 1, explanation: 'Archimedes\' Principle: The buoyant force (upthrust) on a body equals the weight of fluid displaced. This is fundamental to ship buoyancy and stability.', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p008', question: 'The efficiency of a machine is given by:', options: ['Input / Output × 100', 'Output / Input × 100', 'Output - Input', 'Input × Output'], correct: 1, explanation: 'Efficiency (η) = (Output / Input) × 100%. No machine has 100% efficiency due to friction and other losses.', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p009', question: 'Conduction, convection, and radiation are modes of:', options: ['Electricity transmission', 'Heat transfer', 'Sound propagation', 'Light propagation'], correct: 1, explanation: 'Heat is transferred by: Conduction (through solids), Convection (through fluids/gases by circulation), Radiation (electromagnetic waves, no medium needed).', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1p010', question: 'One kilowatt-hour (kWh) is a unit of:', options: ['Power', 'Energy', 'Force', 'Current'], correct: 1, explanation: '1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J = 3.6 MJ. Despite containing "Watt" (power unit), kWh is energy (power × time).', category: 'Physics', subject: 'physics', yearLevel: 1, difficulty: 'basic' },

  // ── ENGLISH ──
  { id: 'y1e001', question: 'Choose the correct sentence:', options: ['He go to school daily.', 'He goes to school daily.', 'He going to school daily.', 'He gone to school daily.'], correct: 1, explanation: 'Third person singular (He/She/It) takes the "-s" form of the verb in simple present tense: He goes, She runs, It works.', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1e002', question: 'The synonym of "ENHANCE" is:', options: ['Reduce', 'Improve', 'Destroy', 'Ignore'], correct: 1, explanation: 'Enhance means to improve, increase, or intensify the quality or value of something. Synonym: Improve, Augment, Amplify.', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1e003', question: 'The antonym of "ABUNDANT" is:', options: ['Plentiful', 'Scarce', 'Surplus', 'Excessive'], correct: 1, explanation: 'Abundant means plentiful, existing in large quantities. Its opposite (antonym) is Scarce — insufficient, in short supply.', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1e004', question: '"He has been working ___ two hours." Fill in the blank:', options: ['since', 'for', 'from', 'before'], correct: 1, explanation: '"For" is used with a duration of time (two hours, three days). "Since" is used with a point in time (since Monday, since 2020).', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1e005', question: 'The passive voice of "The captain inspects the engine room" is:', options: ['The engine room is inspected by the captain.', 'The engine room inspected by the captain.', 'The engine room was inspecting by the captain.', 'The captain is inspected by the engine room.'], correct: 0, explanation: 'Active → Passive: Object becomes subject, verb changes to "is/are + past participle", and "by + agent" is added. The engine room is inspected by the captain.', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1e006', question: 'Identify the error: "Neither the captain nor the officers was present."', options: ['Neither', 'nor', 'was (should be were)', 'present'], correct: 2, explanation: 'With "neither...nor", the verb agrees with the nearer subject. "The officers" is plural, so the verb should be "were": "Neither the captain nor the officers were present."', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1e007', question: 'Choose the correctly spelled word:', options: ['Maintainence', 'Maintenance', 'Maintenence', 'Maintanance'], correct: 1, explanation: 'The correct spelling is MAINTENANCE. This is commonly misspelled in maritime documentation. Remember: maintain + ance.', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1e008', question: '"A stone\'s throw" means:', options: ['Very far', 'Very near', 'Very expensive', 'Very heavy'], correct: 1, explanation: '"A stone\'s throw" is an idiom meaning a very short distance. "The port is just a stone\'s throw from here" = it is very near.', category: 'English', subject: 'english', yearLevel: 1, difficulty: 'basic' },

  // ── APTITUDE / REASONING ──
  { id: 'y1a001', question: 'If a ship travels 120 nautical miles in 6 hours, its speed is:', options: ['15 knots', '20 knots', '25 knots', '30 knots'], correct: 1, explanation: 'Speed = Distance / Time = 120/6 = 20 knots. (1 knot = 1 nautical mile per hour)', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1a002', question: 'Complete the series: 2, 6, 18, 54, ___', options: ['108', '162', '72', '216'], correct: 1, explanation: 'Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162. This is a geometric progression with ratio 3.', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1a003', question: 'A tank can be filled by Pump A in 4 hours and Pump B in 6 hours. Together, how long?', options: ['2 hours', '2.4 hours', '5 hours', '10 hours'], correct: 1, explanation: 'Rate A = 1/4, Rate B = 1/6. Combined = 1/4 + 1/6 = 5/12. Time = 12/5 = 2.4 hours.', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1a004', question: 'What is 15% of 840?', options: ['112', '126', '134', '168'], correct: 1, explanation: '15% of 840 = 0.15 × 840 = 126. Quick method: 10% = 84, 5% = 42, total = 84+42 = 126.', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1a005', question: 'If the ratio of fuel consumed by Engine A to Engine B is 3:5, and total fuel is 640 liters, how much does Engine A consume?', options: ['200 L', '240 L', '300 L', '400 L'], correct: 1, explanation: 'Total parts = 3+5 = 8. Engine A = (3/8) × 640 = 240 liters.', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1a006', question: 'A, B, and C are three consecutive even numbers. If A + B + C = 78, find B:', options: ['24', '26', '28', '30'], correct: 1, explanation: 'Let A = x, B = x+2, C = x+4. x + x+2 + x+4 = 78 → 3x + 6 = 78 → 3x = 72 → x = 24. So B = 26.', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1a007', question: 'If today is Wednesday, what day will it be 45 days from now?', options: ['Monday', 'Tuesday', 'Wednesday', 'Saturday'], correct: 3, explanation: '45 ÷ 7 = 6 weeks + 3 days remainder. Counting 3 days from Wednesday: Thu, Fri, Saturday.', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  { id: 'y1a008', question: 'A engine part costs ₹500. After 20% discount, the price is:', options: ['₹350', '₹380', '₹400', '₹450'], correct: 2, explanation: 'Discount = 20% of 500 = ₹100. Price after discount = 500 - 100 = ₹400.', category: 'Aptitude', subject: 'aptitude', yearLevel: 1, difficulty: 'basic' },

  /* ═══════════════════════════════════════════════
     YEAR 2 — Class 12th Advanced PCM + Engineering Basics
     ═══════════════════════════════════════════════ */

  // ── MATHS (Class 12 / Engineering) ──
  { id: 'y2m001', question: 'The determinant of a 2×2 matrix |a b; c d| is:', options: ['a+d-b-c', 'ad - bc', 'ab - cd', 'ac - bd'], correct: 1, explanation: 'For a 2×2 matrix, det = ad - bc. This is fundamental for solving systems of linear equations using Cramer\'s rule.', category: 'Mathematics', subject: 'maths', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2m002', question: 'The Laplace transform of e^(at) is:', options: ['1/(s+a)', '1/(s-a)', 'a/(s²+a²)', 's/(s-a)'], correct: 1, explanation: 'L{e^(at)} = 1/(s-a) for s > a. Laplace transforms are essential in control systems and vibration analysis in marine engineering.', category: 'Mathematics', subject: 'maths', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2m003', question: 'The value of lim(x→0) sin(x)/x is:', options: ['0', '1', 'infinity', 'undefined'], correct: 1, explanation: 'This is a fundamental limit in calculus: lim(x→0) sin(x)/x = 1. It can be proved using the squeeze theorem or L\'Hôpital\'s rule.', category: 'Mathematics', subject: 'maths', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2m004', question: 'The order and degree of the differential equation d²y/dx² + 3(dy/dx)² = x is:', options: ['Order 2, Degree 1', 'Order 1, Degree 2', 'Order 2, Degree 2', 'Order 1, Degree 1'], correct: 0, explanation: 'Order = highest derivative = 2 (d²y/dx²). Degree = power of highest order derivative = 1. The (dy/dx)² term does not affect the degree since it\'s the first derivative.', category: 'Mathematics', subject: 'maths', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2m005', question: 'For a vector F = 3i + 4j, its magnitude |F| is:', options: ['7', '5', '12', '1'], correct: 1, explanation: '|F| = √(3² + 4²) = √(9 + 16) = √25 = 5. This is the Pythagorean theorem applied to vectors.', category: 'Mathematics', subject: 'maths', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2m006', question: 'The Fourier series can represent any periodic function as a sum of:', options: ['Polynomials', 'Exponentials', 'Sine and cosine functions', 'Logarithms'], correct: 2, explanation: 'Fourier series decomposes periodic functions into sum of sinusoidal harmonics: f(x) = a₀/2 + Σ(aₙcos(nωx) + bₙsin(nωx)). Used in vibration analysis.', category: 'Mathematics', subject: 'maths', yearLevel: 2, difficulty: 'intermediate' },

  // ── PHYSICS (Class 12 / Applied) ──
  { id: 'y2p001', question: 'Bernoulli\'s equation relates pressure, velocity, and:', options: ['Temperature', 'Elevation', 'Density', 'Viscosity'], correct: 1, explanation: 'Bernoulli\'s equation: P + ½ρv² + ρgh = constant. It relates pressure (P), kinetic energy (½ρv²), and potential energy (ρgh) along a streamline.', category: 'Physics', subject: 'physics', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2p002', question: 'Reynolds number distinguishes between:', options: ['Compressible and incompressible flow', 'Laminar and turbulent flow', 'Steady and unsteady flow', 'Subsonic and supersonic flow'], correct: 1, explanation: 'Reynolds number (Re = ρvD/μ) determines flow regime. Re < 2300: laminar flow, Re > 4000: turbulent flow. Critical in pipe design for ships.', category: 'Physics', subject: 'physics', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2p003', question: 'In the 2nd law of thermodynamics, entropy of an isolated system:', options: ['Decreases', 'Remains constant', 'Always increases', 'Never increases or remains same'], correct: 2, explanation: 'The entropy (measure of disorder) of an isolated system always increases over time. This explains why heat flows from hot to cold, and why perpetual motion machines are impossible.', category: 'Physics', subject: 'physics', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2p004', question: 'The dimension of kinematic viscosity (ν) is:', options: ['M/LT', 'L²/T', 'ML/T²', 'L/T²'], correct: 1, explanation: 'Kinematic viscosity ν = μ/ρ. Dimensions: (ML⁻¹T⁻¹)/(ML⁻³) = L²T⁻¹ = L²/T. SI unit: m²/s. Common unit: centistoke (cSt).', category: 'Physics', subject: 'physics', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2p005', question: 'Ohm\'s Law states that V equals:', options: ['IR', 'I/R', 'R/I', 'I²R'], correct: 0, explanation: 'V = IR (Voltage = Current × Resistance). This fundamental law of electricity is essential for understanding ship\'s electrical systems.', category: 'Physics', subject: 'physics', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2p006', question: 'Stress is defined as:', options: ['Force per unit volume', 'Force per unit area', 'Force per unit length', 'Force per unit mass'], correct: 1, explanation: 'Stress (σ) = F/A (Force per unit area). SI unit: Pascal (Pa) or N/m². Types: Tensile, Compressive, Shear stress.', category: 'Physics', subject: 'physics', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2p007', question: 'Young\'s Modulus (E) is the ratio of:', options: ['Shear stress to shear strain', 'Longitudinal stress to longitudinal strain', 'Volume stress to volume strain', 'Lateral strain to longitudinal strain'], correct: 1, explanation: 'Young\'s Modulus E = σ/ε = (Stress/Strain). It measures the stiffness of a material. Steel ≈ 200 GPa. Used extensively in ship structural design.', category: 'Physics', subject: 'physics', yearLevel: 2, difficulty: 'intermediate' },

  // ── APTITUDE (Year 2 level) ──
  { id: 'y2a001', question: 'A ship burns 45 tonnes of fuel per day. How much fuel is needed for a 12-day voyage with a 10% reserve?', options: ['540 tonnes', '594 tonnes', '495 tonnes', '648 tonnes'], correct: 1, explanation: 'Fuel needed = 45 × 12 = 540 tonnes. With 10% reserve = 540 + 54 = 594 tonnes.', category: 'Aptitude', subject: 'aptitude', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2a002', question: 'If the exchange rate is 1 USD = ₹83, how many USD will ₹41,500 fetch?', options: ['450', '500', '550', '600'], correct: 1, explanation: 'USD = 41500/83 = 500 USD.', category: 'Aptitude', subject: 'aptitude', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2a003', question: 'A pipe can fill a tank in 10 hrs. A leak drains it in 15 hrs. Time to fill with leak?', options: ['25 hrs', '30 hrs', '20 hrs', '6 hrs'], correct: 1, explanation: 'Net rate = 1/10 - 1/15 = (3-2)/30 = 1/30. Time = 30 hours.', category: 'Aptitude', subject: 'aptitude', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2a004', question: 'In a class of 40 students, 60% passed Maths and 75% passed Physics. What is the minimum percentage who passed both?', options: ['25%', '35%', '50%', '15%'], correct: 1, explanation: 'Minimum passing both = P(M) + P(P) - 100% = 60 + 75 - 100 = 35%.', category: 'Aptitude', subject: 'aptitude', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2a005', question: 'Looking at a mirror image, if a clock shows 3:30, the actual time is:', options: ['8:30', '9:30', '6:30', '3:30'], correct: 0, explanation: 'Mirror time = 12:00 - shown time = 12:00 - 3:30 = 8:30. (For times after 12, subtract from 12, for times before, add).', category: 'Aptitude', subject: 'aptitude', yearLevel: 2, difficulty: 'intermediate' },

  // ── ENGLISH (Year 2 level) ──
  { id: 'y2e001', question: '"Break down" in "The engine broke down at sea" means:', options: ['Was dismantled', 'Stopped working', 'Was very powerful', 'Slowed down'], correct: 1, explanation: '"Break down" is a phrasal verb meaning to stop functioning or working. Common in maritime: "The auxiliary engine broke down during the watch."', category: 'English', subject: 'english', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2e002', question: 'Choose the correct word: "The cargo must be ___ with care."', options: ['handled', 'handling', 'handle', 'handles'], correct: 0, explanation: 'After "must be" (passive voice with modal verb), the past participle is used: "must be handled". This is standard maritime English.', category: 'English', subject: 'english', yearLevel: 2, difficulty: 'intermediate' },

  { id: 'y2e003', question: '"Maritime" means related to:', options: ['Mountains', 'The sea', 'The air', 'Rivers only'], correct: 1, explanation: '"Maritime" derives from Latin "maritimus" meaning "of the sea". It relates to navigation, shipping, or living near the sea.', category: 'English', subject: 'english', yearLevel: 2, difficulty: 'intermediate' },

  /* ═══════════════════════════════════════════════
     YEAR 3 — Core Marine Engineering Fundamentals
     ═══════════════════════════════════════════════ */
  
  { id: 'y3me001', question: 'The difference between a 2-stroke and 4-stroke engine is:', options: ['Number of cylinders', 'One power stroke per revolution vs one per two revolutions', 'Fuel type used', 'Cooling system'], correct: 1, explanation: '2-stroke: 1 power stroke per revolution (360°). 4-stroke: 1 power stroke per 2 revolutions (720°). 2-stroke engines are used for main propulsion on ships.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me002', question: 'A centrifugal pump is started with discharge valve:', options: ['Fully open', 'Fully closed', 'Half open', 'Does not matter'], correct: 1, explanation: 'Centrifugal pumps are started with discharge valve closed to reduce starting current (motor draws least current at zero flow). The valve is gradually opened after start.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me003', question: 'What is the purpose of a jacket cooling water system on a marine engine?', options: ['To cool the fuel', 'To maintain cylinder and liner temperatures within safe limits', 'To cool the cargo', 'To reduce engine noise'], correct: 1, explanation: 'JCW system circulates treated freshwater through the engine jacket, cylinder heads and liners, maintaining metal temperatures within 80-90°C to prevent thermal stress and corrosion.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me004', question: 'The flash point of diesel oil (MDO) is approximately:', options: ['30°C', '43°C (minimum)', '66°C (minimum)', '100°C'], correct: 2, explanation: 'SOLAS requires minimum flash point of 60°C for fuel used on ships. MDO typically has a flash point of 66°C or higher. HFO flash point is typically >60°C.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me005', question: 'In a marine boiler, gauge glass shows:', options: ['Steam pressure', 'Water level', 'Temperature', 'Fuel level'], correct: 1, explanation: 'The gauge glass indicates water level in the boiler. It must be checked regularly. low water level can lead to overheating and explosion. Two gauge glasses are typically fitted.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me006', question: 'Positive displacement pumps include:', options: ['Centrifugal and axial', 'Gear, screw, and reciprocating', 'Only centrifugal', 'Jet pumps only'], correct: 1, explanation: 'Positive displacement pumps: gear, screw, vane, reciprocating, diaphragm. They deliver a fixed volume per revolution regardless of pressure.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me007', question: 'The purpose of a governor on a marine diesel engine is to:', options: ['Control fuel supply to maintain desired speed', 'Control cooling water temperature', 'Lubricate moving parts', 'Start the engine'], correct: 0, explanation: 'The governor controls fuel supply in response to load changes, maintaining the set speed. Types: mechanical (Woodward), electronic (digital).', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me008', question: 'A stern tube bearing on a ship is typically lubricated by:', options: ['Grease', 'Diesel oil', 'Sea water or oil', 'Air'], correct: 2, explanation: 'Stern tube bearings: oil-lubricated (modern, with seals) or sea-water-lubricated (with lignum vitae or composite material). Oil-lubricated versions require forward and aft seals to prevent leakage.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me009', question: 'MARPOL Annex I deals with:', options: ['Air pollution', 'Garbage', 'Oil pollution prevention', 'Sewage'], correct: 2, explanation: 'MARPOL Annex I: Prevention of pollution by oil. Covers OWS (15 ppm), SOPEP, ORB (Oil Record Book), equipment requirements for tankers and non-tankers.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  { id: 'y3me010', question: 'The air starting system of a marine diesel engine operates at approximately:', options: ['5-10 bar', '15-20 bar', '25-30 bar', '50-60 bar'], correct: 2, explanation: 'Starting air is stored at 25-30 bar in air receivers. Air starting valves on each cylinder admit compressed air in the correct firing order to turn the engine.', category: 'Marine Engineering', subject: 'marine', yearLevel: 3, difficulty: 'intermediate' },

  /* ═══════════════════════════════════════════════
     YEAR 4 — Advanced Marine Systems, Troubleshooting
     ═══════════════════════════════════════════════ */

  { id: 'y4me001', question: 'In an electronically controlled (ME) engine, the traditional camshaft is replaced by:', options: ['Belt drive', 'Hydraulic actuators controlled by ECU', 'Pneumatic cylinders', 'Direct mechanical linkages'], correct: 1, explanation: 'MAN ME engines use hydraulic cylinders (actuators) controlled by the Engine Control Unit (ECU) for fuel injection and exhaust valve operation, allowing variable injection timing and rate shaping.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  { id: 'y4me002', question: 'If the main engine exhaust temperature of one unit is significantly higher than others, the cause could be:', options: ['Good combustion in that unit', 'Faulty fuel injector, worn piston rings, or insufficient scavenge air', 'Excess cooling water', 'Normal operational variation'], correct: 1, explanation: 'High exhaust temp in one unit indicates: faulty injector (dripping/poor atomization), worn piston rings (blow-by), fouled turbocharger (reduced scavenge), or incorrect fuel timing.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  { id: 'y4me003', question: 'SEEMP Part III is related to:', options: ['Ship structural design', 'Carbon Intensity Indicator (CII) management plan', 'Crew training', 'Emergency procedures'], correct: 1, explanation: 'SEEMP (Ship Energy Efficiency Management Plan) Part III contains the ship\'s CII management plan, including targets, implementation, monitoring, and corrective actions for ships rated D or E.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  { id: 'y4me004', question: 'During dry-docking, which of the following is NOT typically inspected?', options: ['Hull plating', 'Propeller and rudder', 'Main engine bedplate', 'Sea valves and underwater fittings'], correct: 2, explanation: 'Main engine bedplate inspection is done in-situ during special surveys, not specifically during drydock. Drydock focuses on: hull plating, rudder, propeller, sea chests, sea valves, antifouling, anodes.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  { id: 'y4me005', question: 'A crankcase explosion is caused by:', options: ['Excess fuel in crankcase', 'Hot spot igniting oil mist in a specific hydrocarbon/air concentration', 'Water entering the crankcase', 'Bearing over-lubrication'], correct: 1, explanation: 'A hot spot (overheated bearing, piston) creates oil mist. If concentration reaches flammable range (LEL to UEL) and ignition source exists → explosion. Prevention: Oil Mist Detector (OMD), crankcase relief valves.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  { id: 'y4me006', question: 'What is the purpose of a bunkering check list?', options: ['For purchasing fuel', 'To ensure safe transfer of fuel oil and prevent spills', 'For engine performance monitoring', 'For crew payroll'], correct: 1, explanation: 'SOPEP bunkering checklist ensures: scuppers blocked, oil boom deployed, communication established, manifold vented, overflow tanks ready, responsible officer present, emergency stops tested.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  { id: 'y4me007', question: 'Condition Monitoring techniques for marine machinery include:', options: ['Vibration analysis, thermography, and oil analysis', 'Only visual inspection', 'Only running hours', 'Painting and cleaning'], correct: 0, explanation: 'Condition-based maintenance uses: vibration analysis (bearing conditions), thermography (hot spots), oil analysis (wear metals, viscosity), ultrasonic testing (thickness, leaks). This enables PMS optimization.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  { id: 'y4me008', question: 'EEXI (Energy Efficiency Existing Ship Index) came into force from:', options: ['1 January 2020', '1 January 2023', '1 June 2025', '1 January 2030'], correct: 1, explanation: 'EEXI came into force 1 January 2023 under revised MARPOL Annex VI. It requires existing ships to meet energy efficiency standards similar to EEDI for new ships.', category: 'Advanced Marine', subject: 'marine', yearLevel: 4, difficulty: 'advanced' },

  /* ═══════════════════════════════════════════════
     YEAR 5 (POST-TRAINING) — Situational, Experience-Based
     ═══════════════════════════════════════════════ */

  { id: 'y5sit001', question: 'While on watch, you notice the main engine lube oil pressure dropping gradually. Your immediate action is:', options: ['Inform the Chief Engineer and wait', 'Reduce engine speed, check filters/strainers, verify tank level, inform bridge', 'Stop the engine immediately', 'Increase lube oil temperature'], correct: 1, explanation: 'Immediate actions: 1) Reduce speed to reduce oil demand, 2) Check duplex filter (switch if blocked), 3) Verify sump tank level, 4) Inform bridge and Chief Engineer, 5) Check for visible leaks or abnormal temperatures.', category: 'Situational', subject: 'marine', yearLevel: 5, difficulty: 'advanced' },

  { id: 'y5sit002', question: 'During cargo operation, a bunker spill occurs from the manifold. Your FIRST priority is:', options: ['Complete the oil record book', 'Close the bunker valve immediately and stop transfer', 'Calculate the quantity spilled', 'Call classification society'], correct: 1, explanation: 'SOPEP protocol: 1) STOP TRANSFER immediately (close manifold valve), 2) Raise alarm, inform master, 3) Contain spill (scuppers already blocked per checklist), 4) Notify port authority, 5) Deploy absorbents, 6) Complete ORB entries.', category: 'Situational', subject: 'marine', yearLevel: 5, difficulty: 'advanced' },

  { id: 'y5sit003', question: 'If you discover a crewmember unconscious in an enclosed space, you should:', options: ['Enter immediately and pull them out', 'Sound alarm, do NOT enter without breathing apparatus, wait for rescue team', 'Lower a rope into the space', 'Call the coast guard first'], correct: 1, explanation: 'NEVER enter an enclosed space to rescue without: 1) Sounding the alarm, 2) Wearing SCBA/ELSA, 3) Having a rescue team with equipment ready, 4) Testing atmosphere. More rescuers die than the original victim.', category: 'Situational', subject: 'marine', yearLevel: 5, difficulty: 'advanced' },

  { id: 'y5sit004', question: 'During main engine operation, the turbocharger starts surging. You should:', options: ['Increase engine load', 'Reduce engine load, check scavenge air pressure, inspect air filters', 'Stop the engine immediately', 'Ignore it as normal'], correct: 1, explanation: 'Surging: 1) Reduce engine load to lower pressure ratio, 2) Check air filter differential pressure (clean if blocked), 3) Check scavenge air cooler (fouled?), 4) Plan compressor water wash at reduced load.', category: 'Situational', subject: 'marine', yearLevel: 5, difficulty: 'advanced' },

  { id: 'y5sit005', question: 'What entries must be made in the Oil Record Book Part I for machinery spaces?', options: ['Only bunkering operations', 'Ballasting/deballasting, sludge disposal, bunkering, OWS operations, and accidental/exceptional discharges', 'Only engine running hours', 'Crew overtime records'], correct: 1, explanation: 'ORB Part I records: ballasting/cleaning fuel tanks, sludge disposal (incineration/port reception), bunkering, OWS/filtering equipment discharge, accidental discharges, and condition of oil discharge monitoring equipment.', category: 'Situational', subject: 'marine', yearLevel: 5, difficulty: 'advanced' }
];

/* ─── Utility: Get questions by year level ─── */
function getCBTQuestionsByYear(yearLevel) {
  return CBT_QUESTIONS_YEARWISE.filter(function(q) { return q.yearLevel === yearLevel; });
}

/* ─── Utility: Get questions by year and subject ─── */
function getCBTQuestionsByYearAndSubject(yearLevel, subject) {
  return CBT_QUESTIONS_YEARWISE.filter(function(q) {
    return q.yearLevel === yearLevel && q.subject === subject;
  });
}

/* ─── Utility: Get questions for a year range (e.g., Year 1-2 cadets get Year 1+2 questions) ─── */
function getCBTQuestionsUpToYear(maxYear) {
  return CBT_QUESTIONS_YEARWISE.filter(function(q) { return q.yearLevel <= maxYear; });
}
