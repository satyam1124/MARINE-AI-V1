/* MarineIQ — CES / CBT Question Bank for Interview Preparation
   200+ MCQs covering all major marine engineering topics
   Format: { id, question, options[], correct (0-3), explanation, category, difficulty }
   Difficulty: 'support' | 'operational' | 'management' */

const CES_QUESTIONS = [

  /* ═══════════════════════════════════════
     CATEGORY: MAIN ENGINE
     ═══════════════════════════════════════ */
  { id: 'me001', question: 'In a 2-stroke marine diesel engine, scavenging is the process of:', options: ['Compressing the fuel-air mixture', 'Removing exhaust gases and supplying fresh air', 'Lubricating the cylinder liner', 'Cooling the piston'], correct: 1, explanation: 'Scavenging removes exhaust gases from the cylinder and replaces them with fresh air for the next combustion cycle. In 2-stroke engines, this occurs near BDC when scavenge ports open.', category: 'Main Engine', difficulty: 'support' },

  { id: 'me002', question: 'The firing order of a 6-cylinder 2-stroke engine is typically:', options: ['1-2-3-4-5-6', '1-5-3-6-2-4', '1-4-2-6-3-5', '1-3-5-2-4-6'], correct: 2, explanation: 'The standard firing order 1-4-2-6-3-5 ensures even power distribution and minimizes torsional vibrations in the crankshaft.', category: 'Main Engine', difficulty: 'support' },

  { id: 'me003', question: 'What is the purpose of a detuner (torsional vibration damper) on a marine diesel engine?', options: ['To reduce axial vibrations', 'To reduce torsional vibrations in the crankshaft', 'To dampen engine noise', 'To reduce lateral vibrations'], correct: 1, explanation: 'A detuner absorbs torsional vibration energy in the crankshaft system, preventing resonance that could cause crankshaft failure.', category: 'Main Engine', difficulty: 'operational' },

  { id: 'me004', question: 'In a 2-stroke crosshead engine, the crosshead bearing is lubricated by:', options: ['Splash lubrication', 'Gravity feed', 'Forced lubrication from a high-pressure pump', 'Grease gun'], correct: 2, explanation: 'Crosshead bearings require force-fed lubrication due to the oscillating motion which prevents the formation of a hydrodynamic oil wedge. High-pressure pumps supply oil at 2-4 bar.', category: 'Main Engine', difficulty: 'operational' },

  { id: 'me005', question: 'Cylinder liner wear is maximum at:', options: ['Bottom of the stroke', 'Mid-stroke', 'Top Dead Center (TDC)', 'Between TDC and mid-stroke'], correct: 2, explanation: 'Maximum wear occurs near TDC due to: high combustion temperature and pressure, loss of oil film, acidic corrosion from sulphur products, and reversal of piston ring direction.', category: 'Main Engine', difficulty: 'support' },

  { id: 'me006', question: 'The purpose of a stuffing box in a 2-stroke crosshead engine is to:', options: ['Seal the crankcase from scavenge space', 'Regulate fuel injection timing', 'Control exhaust valve operation', 'Support the piston rod'], correct: 0, explanation: 'The stuffing box prevents combustion gases and contaminated oil from the scavenge space entering the clean crankcase. It also prevents crankcase oil from contaminating the scavenge space.', category: 'Main Engine', difficulty: 'support' },

  { id: 'me007', question: 'The normal starting air pressure for a large 2-stroke marine diesel engine is:', options: ['5-10 bar', '10-15 bar', '25-30 bar', '50-60 bar'], correct: 2, explanation: 'Starting air pressure is typically 25-30 bar for large 2-stroke engines. This is stored in air receivers and admitted to cylinders via the starting air distributor.', category: 'Main Engine', difficulty: 'support' },

  { id: 'me008', question: 'What is the function of hydraulic exhaust valve (FIVA valve) in ME-C engines?', options: ['Controls fuel injection only', 'Controls exhaust valve opening and closing', 'Controls starting air admission', 'Controls cylinder lubrication'], correct: 1, explanation: 'FIVA (Fuel Injection Valve Actuator) in older ME engines controls both fuel injection and exhaust valve operation electronically via hydraulic actuators, replacing the traditional camshaft.', category: 'Main Engine', difficulty: 'management' },

  { id: 'me009', question: 'Thermal stress cracks in cylinder liners are primarily caused by:', options: ['Excessive cylinder lubrication', 'Rapid temperature changes during load changes', 'Low scavenge air temperature', 'High piston ring pressure'], correct: 1, explanation: 'Thermal stress cracks occur due to rapid temperature gradients across the liner wall, especially during sudden load changes, cold starting, or uneven cooling.', category: 'Main Engine', difficulty: 'operational' },

  { id: 'me010', question: 'What does BHP stand for in marine engineering?', options: ['Basic Horse Power', 'Brake Horse Power', 'Boiler Horse Power', 'British Horse Power'], correct: 1, explanation: 'BHP (Brake Horse Power) is the actual power output measured at the engine shaft/coupling, accounting for mechanical losses. BHP = IHP × mechanical efficiency.', category: 'Main Engine', difficulty: 'support' },

  { id: 'me011', question: 'Why is the power developed in a 2-stroke engine theoretically twice that of a 4-stroke engine of the same size?', options: ['Because it has twice the bore', 'Because it burns fuel faster', 'Because there is one power stroke per revolution instead of one per two revolutions', 'Because it has higher compression ratio'], correct: 2, explanation: 'A 2-stroke engine has one power stroke per revolution (360°) while a 4-stroke has one per two revolutions (720°). So for same speed and displacement, the 2-stroke theoretically produces twice the power.', category: 'Main Engine', difficulty: 'support' },

  { id: 'me012', question: 'Micro-seizure in cylinder liners is indicated by:', options: ['Excessive smoke from the funnel', 'Bright polished areas (scuffing marks) on the liner surface', 'High cooling water temperature', 'Low lube oil pressure alarm'], correct: 1, explanation: 'Micro-seizure causes bright, polished patches on the liner surface where metal-to-metal contact has occurred due to oil film breakdown. Continuing operation leads to severe scuffing.', category: 'Main Engine', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: TURBOCHARGERS
     ═══════════════════════════════════════ */
  { id: 'tc001', question: 'A turbocharger uses exhaust gases to:', options: ['Cool the engine', 'Drive a compressor that supplies air to the engine', 'Generate electricity', 'Remove carbon deposits'], correct: 1, explanation: 'Exhaust gas energy drives the turbine side, which is directly coupled to the compressor side. The compressor increases the charge air pressure and density for improved combustion.', category: 'Turbochargers', difficulty: 'support' },

  { id: 'tc002', question: 'Turbocharger surging is caused by:', options: ['Too much lubricating oil', 'Flow reversal due to low air flow at high pressure ratio', 'Excessive exhaust temperature', 'Dirty compressor blades only'], correct: 1, explanation: 'Surging occurs when air flow through the compressor drops below a critical value for the given pressure ratio, causing flow reversal, noise (barking), and potential bearing damage.', category: 'Turbochargers', difficulty: 'operational' },

  { id: 'tc003', question: 'Online water washing of a turbocharger compressor side is done:', options: ['At MCR (Maximum Continuous Rating)', 'At 50-60% engine load', 'At idle speed', 'When the engine is stopped'], correct: 1, explanation: 'Water washing is performed at reduced load (50-60%) to prevent water droplets from causing damage at high compressor speeds. Fresh water is injected into the compressor inlet.', category: 'Turbochargers', difficulty: 'operational' },

  { id: 'tc004', question: 'The typical speed range of a marine turbocharger is:', options: ['500-2000 RPM', '2000-5000 RPM', '7000-30,000 RPM', '50,000-100,000 RPM'], correct: 2, explanation: 'Marine turbochargers typically operate between 7,000-30,000 RPM depending on size. Larger turbochargers for 2-stroke engines run slower, while smaller ones for 4-stroke engines run faster.', category: 'Turbochargers', difficulty: 'support' },

  { id: 'tc005', question: 'In a turbocharger, the purpose of the nozzle ring (on turbine side) is to:', options: ['Filter exhaust gases', 'Convert pressure energy to velocity energy before hitting turbine blades', 'Cool the turbine wheel', 'Reduce noise'], correct: 1, explanation: 'The nozzle ring converts exhaust gas pressure energy into high-velocity jets that strike the turbine blades at the optimum angle, maximizing energy extraction.', category: 'Turbochargers', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: AUXILIARY MACHINERY
     ═══════════════════════════════════════ */
  { id: 'aux001', question: 'In a shell and tube type heat exchanger, the sea water flows through the:', options: ['Shell side', 'Tube side', 'Either side', 'Neither — it uses air'], correct: 1, explanation: 'Sea water flows through the tube side for two reasons: (1) tubes are easier to clean when fouled/corroded, and (2) the corrosive sea water path can be inspected and replaced easily.', category: 'Auxiliary Machinery', difficulty: 'support' },

  { id: 'aux002', question: 'A fresh water generator on a ship works on the principle of:', options: ['Reverse osmosis at high pressure', 'Boiling water at reduced pressure (vacuum evaporation)', 'Distillation at atmospheric pressure', 'Chemical purification'], correct: 1, explanation: 'Marine FWGs utilize waste heat from engine jacket water (80-90°C) and operate under vacuum (0.1 bar), which reduces boiling point to ~40-50°C, enabling evaporation without additional fuel.', category: 'Auxiliary Machinery', difficulty: 'support' },

  { id: 'aux003', question: 'The purpose of an air compressor unloader is to:', options: ['Increase air pressure', 'Allow the compressor to start under no-load conditions', 'Cool compressed air', 'Drain moisture from air'], correct: 1, explanation: 'Unloaders hold the suction valves open during starting, allowing the compressor to reach operating speed without working against compression load, reducing starting current/torque.', category: 'Auxiliary Machinery', difficulty: 'support' },

  { id: 'aux004', question: 'The minimum pressure at which starting air receivers must be hydrostatically tested is:', options: ['1.25 times working pressure', '1.5 times working pressure', '2 times working pressure', '3 times working pressure'], correct: 1, explanation: 'Air receivers must be hydrostatically tested at 1.5 times the maximum working pressure as per classification society rules. This ensures structural integrity with a safety margin.', category: 'Auxiliary Machinery', difficulty: 'operational' },

  { id: 'aux005', question: 'In an oily water separator, the discharge limit for oil content is:', options: ['5 ppm', '10 ppm', '15 ppm', '25 ppm'], correct: 2, explanation: 'MARPOL Annex I requires that oil content of effluent discharged overboard must not exceed 15 ppm. An Oil Content Monitor (OCM) type-approved to MEPC.107(49) must be fitted.', category: 'Auxiliary Machinery', difficulty: 'support' },

  { id: 'aux006', question: 'A plate-type heat exchanger has an advantage over shell-and-tube because:', options: ['It handles higher pressures', 'It has a larger heat transfer area per unit volume', 'It is less expensive to maintain', 'It can use any gasket material'], correct: 1, explanation: 'Plate heat exchangers have a very high surface area to volume ratio due to corrugated plates. They are compact, efficient, and allow easy capacity changes by adding/removing plates.', category: 'Auxiliary Machinery', difficulty: 'operational' },

  { id: 'aux007', question: 'The ejector in a vacuum-type fresh water generator serves to:', options: ['Circulate cooling water', 'Maintain vacuum in the evaporator shell', 'Pump distillate to the tank', 'Both B and C'], correct: 3, explanation: 'The ejector removes air and non-condensable gases to maintain vacuum, and it also extracts the distillate (produced fresh water) from the condenser section.', category: 'Auxiliary Machinery', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: PUMPS
     ═══════════════════════════════════════ */
  { id: 'pump001', question: 'Cavitation in a centrifugal pump occurs when:', options: ['Discharge pressure is too high', 'Suction pressure drops below the vapor pressure of the liquid', 'The pump rotates too slowly', 'The fluid is too viscous'], correct: 1, explanation: 'When local pressure at the pump suction drops below the vapor pressure of the liquid, vapor bubbles form. These collapse violently on the impeller, causing pitting, erosion, noise, and reduced performance.', category: 'Pumps', difficulty: 'support' },

  { id: 'pump002', question: 'The affinity laws for centrifugal pumps state that flow is proportional to:', options: ['Speed squared (N²)', 'Speed (N)', 'Speed cubed (N³)', 'The square root of speed (√N)'], correct: 1, explanation: 'Affinity laws: Q ∝ N (flow proportional to speed), H ∝ N² (head proportional to speed squared), P ∝ N³ (power proportional to speed cubed). These apply when only speed changes.', category: 'Pumps', difficulty: 'support' },

  { id: 'pump003', question: 'NPSH stands for:', options: ['Net Pump Suction Head', 'Net Positive Suction Head', 'Normal Pressure Suction Height', 'Negative Pump Suction Head'], correct: 1, explanation: 'NPSH (Net Positive Suction Head) is the total head available at the pump suction above vapor pressure. NPSH_available must exceed NPSH_required to prevent cavitation.', category: 'Pumps', difficulty: 'support' },

  { id: 'pump004', question: 'A gear pump is classified as:', options: ['Centrifugal pump', 'Axial flow pump', 'Positive displacement pump', 'Mixed flow pump'], correct: 2, explanation: 'A gear pump is a positive displacement pump where fluid is trapped between gear teeth and the casing, then pushed to the discharge. Output is directly proportional to speed.', category: 'Pumps', difficulty: 'support' },

  { id: 'pump005', question: 'Priming of a centrifugal pump is necessary because:', options: ['It needs oil for lubrication', 'The impeller cannot create sufficient vacuum to lift water if filled with air', 'It must be heated before use', 'It requires a minimum speed to start'], correct: 1, explanation: 'Air being much less dense than water, the impeller cannot generate enough pressure difference to draw liquid up. The pump casing must be filled with liquid (primed) before starting.', category: 'Pumps', difficulty: 'support' },

  /* ═══════════════════════════════════════
     CATEGORY: PURIFIERS
     ═══════════════════════════════════════ */
  { id: 'pur001', question: 'The main difference between a purifier and a clarifier is:', options: ['Speed of rotation', 'A purifier separates water from oil, a clarifier only removes solids', 'Bowl design', 'The type of oil being cleaned'], correct: 1, explanation: 'A purifier has a gravity disc and removes both water and solids from oil. A clarifier has no gravity disc and only removes fine solids. Typically HFO is purified first, then clarified.', category: 'Purifiers', difficulty: 'support' },

  { id: 'pur002', question: 'The purpose of the gravity disc in a purifier is to:', options: ['Increase separation speed', 'Create the oil-water interface at the correct position inside the bowl', 'Filter out large particles', 'Regulate the feed rate'], correct: 1, explanation: 'The gravity disc bore determines where the oil-water interface forms inside the bowl. Wrong disc size = oil in water discharge (too large) or water in oil discharge (too small).', category: 'Purifiers', difficulty: 'operational' },

  { id: 'pur003', question: 'The recommended temperature for purifying HFO (Heavy Fuel Oil) is:', options: ['40-50°C', '70-80°C', '95-98°C', '110-120°C'], correct: 2, explanation: 'HFO must be heated to 95-98°C before purification to reduce viscosity and improve separation efficiency. The lower viscosity allows better separation of water and solids.', category: 'Purifiers', difficulty: 'support' },

  { id: 'pur004', question: 'What happens if the gravity disc is too large in a purifier?', options: ['Oil appears in water discharge', 'Water appears in oil discharge', 'No separation occurs', 'Purifier vibrates excessively'], correct: 0, explanation: 'A gravity disc that is too large pushes the oil-water interface outward, causing oil to flow over the top disc and discharge with the water. Always select disc size from the density chart.', category: 'Purifiers', difficulty: 'operational' },

  { id: 'pur005', question: 'The operating speed of a typical marine centrifugal purifier bowl is:', options: ['1000-2000 RPM', '3000-5000 RPM', '6000-8000 RPM', '10000-15000 RPM'], correct: 2, explanation: 'Marine purifier bowls operate at 6,000-8,000 RPM to generate the high centrifugal force needed for separation. The separating force can be 5,000-10,000 times gravity.', category: 'Purifiers', difficulty: 'support' },

  /* ═══════════════════════════════════════
     CATEGORY: ELECTRICAL
     ═══════════════════════════════════════ */
  { id: 'elec001', question: 'The standard voltage and frequency on most merchant ships is:', options: ['220V, 50Hz', '380V, 50Hz', '440V, 60Hz', '660V, 50Hz'], correct: 2, explanation: 'Most merchant ships use 440V, 60Hz, 3-phase AC power. The higher frequency (60Hz vs 50Hz on land) allows smaller and lighter equipment. Some newer ships use 6.6kV for large consumers.', category: 'Electrical', difficulty: 'support' },

  { id: 'elec002', question: 'For paralleling two generators, the following conditions must be met:', options: ['Same voltage only', 'Same voltage and frequency', 'Same voltage, frequency, phase sequence, and phase angle', 'Same power output'], correct: 2, explanation: 'All four conditions must be met: same voltage (voltmeter), same frequency (equal speed), same phase sequence (phase sequence indicator), and same phase angle (synchroscope at 12 o\'clock).', category: 'Electrical', difficulty: 'support' },

  { id: 'elec003', question: 'Preferential tripping on a ship means:', options: ['Tripping the main engine', 'Automatically disconnecting non-essential loads when generator is overloaded', 'Emergency generator auto-start', 'Manually switching off lights'], correct: 1, explanation: 'Preferential tripping automatically sheds non-essential loads (galley, HVAC, laundry) when the generator load exceeds approximately 110% to protect essential services (steering, fire pumps, navigation).', category: 'Electrical', difficulty: 'support' },

  { id: 'elec004', question: 'In a ship\'s insulated neutral (IT) system, the first earth fault causes:', options: ['Circuit breaker to trip immediately', 'An alarm only (no trip)', 'A blackout', 'Fuses to blow'], correct: 1, explanation: 'In an IT (Insulated Terre) system used on ships, the first earth fault only causes an alarm because there is no return path through earth. A second earth fault on another phase would cause a short circuit and trip.', category: 'Electrical', difficulty: 'operational' },

  { id: 'elec005', question: 'The emergency generator must start automatically within:', options: ['15 seconds', '30 seconds', '45 seconds', '60 seconds'], correct: 2, explanation: 'As per SOLAS Chapter II-1 Reg. 43, the emergency generator must start automatically within 45 seconds of main power failure. It must be capable of supplying emergency loads for 18 hours (passenger) or 3 hours (cargo).', category: 'Electrical', difficulty: 'support' },

  { id: 'elec006', question: 'A megger (insulation resistance tester) typically uses what voltage for testing 440V circuits?', options: ['250V DC', '500V DC', '1000V DC', '2500V DC'], correct: 2, explanation: 'For 440V circuits, a 1000V DC megger is used. Minimum acceptable insulation resistance is 1 MΩ for new installations and 0.5 MΩ for in-service equipment.', category: 'Electrical', difficulty: 'operational' },

  { id: 'elec007', question: 'Motor slip is defined as:', options: ['The difference between rotor speed and stator speed expressed as percentage of synchronous speed', 'The ratio of output to input power', 'The speed of the magnetic field', 'The resistance of the rotor'], correct: 0, explanation: 'Slip = (Ns - N)/Ns × 100%, where Ns is synchronous speed and N is actual rotor speed. Typical slip for marine induction motors is 2-5%. Without slip, no torque would be produced.', category: 'Electrical', difficulty: 'support' },

  /* ═══════════════════════════════════════
     CATEGORY: SAFETY & REGULATIONS
     ═══════════════════════════════════════ */
  { id: 'safe001', question: 'Before entering an enclosed space on a ship, the atmosphere must be tested for:', options: ['Oxygen content only', 'Oxygen content, combustible gases, and toxic gases', 'Temperature only', 'Humidity levels'], correct: 1, explanation: 'SOLAS requires testing for: O₂ (must be 20.9%), combustible gases (must be <1% LFL), and toxic gases (H₂S <5ppm, CO <25ppm). Testing must be done at multiple levels.', category: 'Safety', difficulty: 'support' },

  { id: 'safe002', question: 'SOLAS stands for:', options: ['Safety of Life at Sea', 'Standard Operations for Large and Small Ships', 'Safety of Loading and Stowage', 'Safe Operation and Life-saving at Sea'], correct: 0, explanation: 'SOLAS (Safety of Life at Sea) is the most important international treaty concerning the safety of merchant ships. The current version (SOLAS 1974) has been amended many times.', category: 'Safety', difficulty: 'support' },

  { id: 'safe003', question: 'The ISM Code has how many elements?', options: ['8', '10', '12', '16'], correct: 2, explanation: 'The ISM Code (International Safety Management Code) has 12 elements covering safety policy, company responsibilities, DPA, master\'s authority, resources, operations, emergency preparedness, reporting, maintenance, documentation, verification, and certification.', category: 'Safety', difficulty: 'support' },

  { id: 'safe004', question: 'What is the minimum rest period for seafarers as per STCW/MLC?', options: ['6 hours in any 24-hour period', '8 hours in any 24-hour period', '10 hours in any 24-hour period (can be in 2 periods)', '12 hours in any 24-hour period'], correct: 2, explanation: 'STCW/MLC requires minimum 10 hours rest in any 24-hour period (can be split into max 2 periods, one ≥6 hours) and 77 hours in any 7-day period.', category: 'Safety', difficulty: 'operational' },

  { id: 'safe005', question: 'The Designated Person Ashore (DPA) as per ISM Code is responsible for:', options: ['Purchasing spare parts', 'Direct access between ship and highest management level on safety matters', 'Hiring crew', 'Maintaining the ship\'s stability'], correct: 1, explanation: 'The DPA provides a direct link between ship and shore management regarding safety and pollution prevention. Element 4 of the ISM Code establishes this role.', category: 'Safety', difficulty: 'operational' },

  { id: 'safe006', question: 'According to MARPOL Annex V, garbage disposal regulations, which item can NEVER be discharged at sea?', options: ['Food waste', 'Paper products', 'Plastics', 'Cargo residues'], correct: 2, explanation: 'MARPOL Annex V strictly prohibits discharge of ALL plastics at sea, regardless of distance from land. This is a zero-discharge policy with no exceptions.', category: 'Safety', difficulty: 'support' },

  { id: 'safe007', question: 'The 3 security levels under the ISPS Code are:', options: ['Normal, Enhanced, Maximum', 'Level 1 (normal), Level 2 (heightened), Level 3 (exceptional/imminent threat)', 'Green, Yellow, Red', 'Low, Medium, High'], correct: 1, explanation: 'ISPS Code: Level 1 = normal operations, Level 2 = heightened security due to specific threat, Level 3 = exceptional security for imminent danger. Level 3 requires government involvement.', category: 'Safety', difficulty: 'support' },

  /* ═══════════════════════════════════════
     CATEGORY: MARPOL
     ═══════════════════════════════════════ */
  { id: 'mar001', question: 'The global sulphur cap as per MARPOL Annex VI (from Jan 2020) is:', options: ['0.10% m/m', '0.50% m/m', '1.00% m/m', '3.50% m/m'], correct: 1, explanation: 'Since 1 January 2020, the global sulphur cap is 0.50% m/m (down from 3.50%). In ECA (Emission Control Areas), the limit is 0.10% m/m. Compliance options: VLSFO, scrubber, or LNG.', category: 'MARPOL', difficulty: 'support' },

  { id: 'mar002', question: 'MARPOL has how many annexes?', options: ['4', '5', '6', '7'], correct: 2, explanation: 'MARPOL has 6 annexes: I (Oil), II (NLS/Chemicals), III (Harmful Substances in Packaged Form), IV (Sewage), V (Garbage), VI (Air Pollution).', category: 'MARPOL', difficulty: 'support' },

  { id: 'mar003', question: 'The minimum distance from nearest land to discharge treated sewage from a ship is:', options: ['3 nautical miles', '4 nautical miles', '12 nautical miles', 'No distance requirement if treated'], correct: 0, explanation: 'MARPOL Annex IV: Comminuted/disinfected sewage ≥3nm from land. Untreated sewage ≥12nm from land, speed ≥4 knots. Treated sewage from approved plant can be discharged anywhere.', category: 'MARPOL', difficulty: 'operational' },

  { id: 'mar004', question: 'CII (Carbon Intensity Indicator) rating scale is:', options: ['1-5 stars', 'A to E (A being best)', 'Green to Red', 'Pass/Fail'], correct: 1, explanation: 'CII rates ships from A (best) to E (worst) annually. Ships rated D for 3 consecutive years or E for 1 year must submit a corrective action plan in SEEMP Part III.', category: 'MARPOL', difficulty: 'management' },

  { id: 'mar005', question: 'NOx Tier III requirements apply in NOx ECAs from:', options: ['2000', '2011', '2016 for new ships', '2020'], correct: 2, explanation: 'NOx Tier III (80% reduction from Tier I) applies to engines installed on ships built on or after 1 January 2016 operating in designated NOx ECAs (North American and US Caribbean).', category: 'MARPOL', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: BOILERS
     ═══════════════════════════════════════ */
  { id: 'boil001', question: 'The pH of boiler water should normally be maintained at:', options: ['7.0-8.0 (neutral)', '8.5-9.5', '10.5-11.5', '12.0-14.0'], correct: 2, explanation: 'Boiler water pH is maintained at 10.5-11.5 (alkaline) to prevent corrosion. This is achieved by adding sodium hydroxide (NaOH) or trisodium phosphate (Na₃PO₄).', category: 'Boilers', difficulty: 'support' },

  { id: 'boil002', question: 'Scotch boiler and D-type water tube boiler working pressures are approximately:', options: ['Both up to 7 bar', 'Scotch 7-17 bar, D-type 30-100 bar', 'Both up to 50 bar', 'Scotch 30 bar, D-type 7 bar'], correct: 1, explanation: 'Scotch fire-tube boilers: 7-17 bar (for auxiliary steam). D-type water-tube boilers: 30-100 bar (for main propulsion in steam ships and higher-pressure auxiliary needs).', category: 'Boilers', difficulty: 'support' },

  { id: 'boil003', question: 'The purpose of a fusible plug in a boiler is to:', options: ['Regulate steam pressure', 'Warn of low water level by melting and releasing steam', 'Filter the feed water', 'Control the fuel supply'], correct: 1, explanation: 'The fusible plug is a safety device fitted at the lowest water level. If water drops below this level, the plug overheats (above normal steam temperature), the tin/lead alloy melts, and steam discharge extinguishes the furnace fire.', category: 'Boilers', difficulty: 'support' },

  { id: 'boil004', question: 'What chemical is used for oxygen scavenging in boiler water treatment?', options: ['Sodium chloride', 'Sodium sulphite or hydrazine', 'Calcium carbonate', 'Potassium permanganate'], correct: 1, explanation: 'Sodium sulphite (Na₂SO₃) or hydrazine (N₂H₄) is used to remove dissolved oxygen from boiler feed water. 2Na₂SO₃ + O₂ → 2Na₂SO₄. Hydrazine: N₂H₄ + O₂ → N₂ + 2H₂O (no solids).', category: 'Boilers', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: REFRIGERATION
     ═══════════════════════════════════════ */
  { id: 'ref001', question: 'The Coefficient of Performance (COP) of a refrigeration system is defined as:', options: ['Work input / Cooling effect', 'Cooling effect / Work input', 'Condenser heat / Evaporator heat', 'Compressor power / Total power'], correct: 1, explanation: 'COP = Refrigerating effect / Work input = (h₁ - h₄)/(h₂ - h₁), where h₁ = enthalpy leaving evaporator, h₂ = enthalpy leaving compressor, h₄ = enthalpy entering evaporator.', category: 'Refrigeration', difficulty: 'support' },

  { id: 'ref002', question: 'R-134a is preferred over R-12 because:', options: ['It is cheaper', 'It has zero Ozone Depletion Potential (ODP)', 'It has lower GWP', 'It works at lower pressures'], correct: 1, explanation: 'R-134a (HFC) has zero ODP compared to R-12 (CFC) which was banned under the Montreal Protocol for depleting the ozone layer. However, R-134a still has GWP of 1430.', category: 'Refrigeration', difficulty: 'support' },

  { id: 'ref003', question: 'Superheat in a refrigeration system is measured at:', options: ['Condenser outlet', 'After the expansion valve', 'Compressor suction (after evaporator)', 'Receiver outlet'], correct: 2, explanation: 'Superheat (5-10°C) is measured at the compressor suction, after the evaporator. It ensures only dry vapor enters the compressor, preventing liquid slugging and compressor damage.', category: 'Refrigeration', difficulty: 'operational' },

  { id: 'ref004', question: 'Ammonia (R-717) as a refrigerant has which characteristic?', options: ['Zero ODP, zero GWP, but toxic and flammable', 'High ODP, low GWP', 'Non-toxic but high ODP', 'Cannot be used on ships'], correct: 0, explanation: 'Ammonia (R-717) has zero ODP and zero GWP, making it environmentally excellent. However, it is toxic (TLV 25 ppm), flammable, and corrosive to copper. It requires special safety precautions.', category: 'Refrigeration', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: THERMODYNAMICS
     ═══════════════════════════════════════ */
  { id: 'therm001', question: 'The first law of thermodynamics states:', options: ['Energy can be created but not destroyed', 'Heat always flows from hot to cold', 'Energy cannot be created or destroyed, only converted from one form to another', 'Entropy always increases'], correct: 2, explanation: 'The first law (conservation of energy): Q - W = ΔU for a closed system. Energy is always conserved — it changes form but the total remains constant.', category: 'Thermodynamics', difficulty: 'support' },

  { id: 'therm002', question: 'Carnot efficiency is calculated as:', options: ['η = 1 - T_L/T_H (temperatures in Kelvin)', 'η = T_H/T_L', 'η = T_L × T_H', 'η = 1 - P_L/P_H'], correct: 0, explanation: 'Carnot efficiency η = 1 - T_L/T_H sets the maximum theoretical efficiency for any heat engine operating between temperatures T_H (source) and T_L (sink) in Kelvin.', category: 'Thermodynamics', difficulty: 'support' },

  { id: 'therm003', question: 'In an Otto cycle (constant volume combustion), heat is added at:', options: ['Constant pressure', 'Constant volume', 'Constant temperature', 'Constant entropy'], correct: 1, explanation: 'The Otto cycle (ideal gasoline engine cycle) adds heat at constant volume. This differs from the Diesel cycle (constant pressure heat addition) and the Carnot cycle (constant temperature).', category: 'Thermodynamics', difficulty: 'support' },

  { id: 'therm004', question: 'The dryness fraction (x) of steam indicates:', options: ['The temperature of the steam', 'The mass fraction of vapor in a wet steam mixture', 'The pressure at which steam condenses', 'The superheating degree'], correct: 1, explanation: 'Dryness fraction x = mass of dry steam / total mass of mixture. Wet steam (x < 1) contains water droplets that can erode turbine blades. Enthalpy of wet steam: h = hf + x·hfg.', category: 'Thermodynamics', difficulty: 'support' },

  /* ═══════════════════════════════════════
     CATEGORY: SHIP STABILITY
     ═══════════════════════════════════════ */
  { id: 'stab001', question: 'GM (metacentric height) for a ship must be at least:', options: ['0.05 m', '0.10 m', '0.15 m', '0.50 m'], correct: 2, explanation: 'IMO requires GM ≥ 0.15 m for all cargo ships. GM = KM - KG. A positive GM means the ship is stable. Negative GM causes the ship to loll (list to one side).', category: 'Ship Stability', difficulty: 'support' },

  { id: 'stab002', question: 'Free surface effect causes:', options: ['Increase in KG (virtual rise of center of gravity)', 'Decrease in KG', 'Increase in buoyancy', 'No effect on stability'], correct: 0, explanation: 'Free surface effect (FSE) causes a virtual rise in the center of gravity (G), reducing GM and stability. GGm = (ρ_liquid × i)/(ρ_ship × V). This is why slack tanks are dangerous.', category: 'Ship Stability', difficulty: 'support' },

  { id: 'stab003', question: 'When a ship develops a permanent list (loll), the immediate corrective action is:', options: ['Fill the upper tanks', 'Transfer ballast to the opposite side', 'Fill the lowest double bottom tank on the low side', 'Increase speed'], correct: 2, explanation: 'For loll correction: FILL THE LOWEST DOUBLE BOTTOM TANK first to increase GM by lowering KG. Never fill upper tanks or transfer ballast to the high side — this could capsize the ship.', category: 'Ship Stability', difficulty: 'operational' },

  { id: 'stab004', question: 'BM (distance from center of buoyancy to metacenter) is calculated as:', options: ['BM = KG - KB', 'BM = I/V (second moment of waterplane area / volume of displacement)', 'BM = GM + KG', 'BM = KG × KB'], correct: 1, explanation: 'BM = I_WP/V, where I is the second moment of area of the waterplane about the longitudinal axis and V is the volume of displacement. BM indicates the ship\'s form stability.', category: 'Ship Stability', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: WATCHKEEPING
     ═══════════════════════════════════════ */
  { id: 'watch001', question: 'As per STCW, the OICEW (Officer in Charge of Engineering Watch) must ensure:', options: ['Only the main engine is running', 'All machinery is operating properly and regular rounds are carried out', 'Deck department is informed of all changes', 'Only fuel is being supplied'], correct: 1, explanation: 'The OICEW must ensure all machinery operates properly, carry out regular rounds, maintain the engine room log, report deficiencies, and be ready for emergencies and maneuvering.', category: 'Watchkeeping', difficulty: 'support' },

  { id: 'watch002', question: 'UMS (Unmanned Machinery Space) operation requires:', options: ['No engineer on board', 'Alarm systems, auto-shutdown, fire detection from bridge, and engineer on standby', 'Only automated systems', 'Class approval only'], correct: 1, explanation: 'UMS requires: comprehensive alarm system with bridge/cabin extension, automatic shutdown for critical parameters, fixed fire detection/suppression, dead-man alarm, engineer on call within 4 minutes.', category: 'Watchkeeping', difficulty: 'operational' },

  /* ═══════════════════════════════════════
     CATEGORY: NAVAL ARCHITECTURE
     ═══════════════════════════════════════ */
  { id: 'na001', question: 'TPC (Tonnes Per Centimetre) immersion is calculated as:', options: ['TPC = waterplane area × density / 100', 'TPC = displacement / draft', 'TPC = block coefficient × length', 'TPC = LBP × beam'], correct: 0, explanation: 'TPC = (A_wp × ρ)/100, where A_wp is waterplane area in m² and ρ is water density in t/m³. TPC indicates how many tonnes must be added to increase draft by 1 cm.', category: 'Naval Architecture', difficulty: 'operational' },

  { id: 'na002', question: 'Block coefficient (Cb) is the ratio of:', options: ['Displacement volume to the volume of the circumscribing block (L × B × T)', 'Waterplane area to the rectangle L × B', 'Midship section area to B × T', 'Wetted surface to total surface'], correct: 0, explanation: 'Cb = V/(L × B × T). Full-form ships (tankers, bulk carriers) have Cb = 0.80-0.85. Fine-form ships (container ships) have Cb = 0.60-0.70. It affects resistance and propulsion.', category: 'Naval Architecture', difficulty: 'support' },

  /* ═══════════════════════════════════════
     CATEGORY: GENERAL / APTITUDE
     ═══════════════════════════════════════ */
  { id: 'gen001', question: 'The abbreviation STCW stands for:', options: ['Standards of Training, Certification and Watchkeeping for Seafarers', 'Ship Training Certificate for Workers', 'Standard Technical Course for Watermen', 'Safety Training and Competency for Workforce'], correct: 0, explanation: 'STCW (Standards of Training, Certification and Watchkeeping for Seafarers) 1978, as amended by Manila 2010, sets international training, certification, and watchkeeping standards for seafarers.', category: 'General', difficulty: 'support' },

  { id: 'gen002', question: 'MLC 2006 stands for:', options: ['Marine Labour Contract', 'Maritime Labour Convention', 'Merchant Labour Certificate', 'Marine Law Code'], correct: 1, explanation: 'Maritime Labour Convention (MLC) 2006, also called the "Seafarers\' Bill of Rights," sets minimum standards for seafarers\' working conditions, including wages, hours of work, health, and repatriation.', category: 'General', difficulty: 'support' },

  { id: 'gen003', question: 'The class notation "LR" refers to which classification society?', options: ['Lloyd\'s Register', 'London Registry', 'Latin Register', 'Liberty Registration'], correct: 0, explanation: 'LR = Lloyd\'s Register (UK). Other major class societies (IACS members): DNV (Norway), ABS (USA), BV (France), ClassNK (Japan), RINA (Italy), CCS (China).', category: 'General', difficulty: 'support' },

  { id: 'gen004', question: 'The rank progression for marine engineers in India is:', options: ['Cadet → 3E → 2E → CE', 'Cadet → 4E → 3E → 2E → CE', 'Trainee → Junior → Senior → Chief', 'GP Rating → 3E → 2E → CE'], correct: 1, explanation: 'Engine Cadet → 4th Engineer (MEO Class IV COC) → 3rd Engineer → 2nd Engineer (MEO Class II COC) → Chief Engineer (MEO Class I COC). Each requires sea service and examination.', category: 'General', difficulty: 'support' },

  { id: 'gen005', question: 'The standard survey cycle for classification includes which surveys?', options: ['Only annual survey', 'Annual, Intermediate (2.5 yr), Special/Drydock (5 yr)', 'Monthly, quarterly, annually', 'Only every 5 years'], correct: 1, explanation: 'Classification survey cycle: Annual Survey (every year), Intermediate Survey (2.5 years), Special Survey/Drydock (every 5 years). CSM (Continuous Survey Machinery) allows spreading the special survey over 5 years.', category: 'General', difficulty: 'support' }
];

/* Utility: group questions by category */
function getCESQuestionsByCategory() {
  var categories = {};
  CES_QUESTIONS.forEach(function(q) {
    if (!categories[q.category]) categories[q.category] = [];
    categories[q.category].push(q);
  });
  return categories;
}

/* Utility: get questions by difficulty */
function getCESQuestionsByDifficulty(difficulty) {
  return CES_QUESTIONS.filter(function(q) { return q.difficulty === difficulty; });
}
