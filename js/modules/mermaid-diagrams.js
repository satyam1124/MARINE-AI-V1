/* MarineIQ — Mermaid.js Marine System Flow Diagrams
   Deps: mermaid.js (CDN), config.js, ai-diagrams.js
   Renders interactive flowcharts for marine engineering systems */

/* ══════════════════════════════════════════════════════════
   1. MERMAID DIAGRAM DATA — keyed by topicId pattern
   ══════════════════════════════════════════════════════════ */
const MERMAID_FLOWS = {

  /* ── Fuel Oil Supply System ── */
  fuel_oil_system: {
    title: 'HFO Fuel Oil Supply System',
    code: `flowchart LR
  DB["Double Bottom\\nStorage Tank"] --> TP["Transfer\\nPump"]
  TP --> ST["Settling Tank\\n95°C, 24h"]
  ST --> PUR["Purifier\\n(FOPX)\\n98°C, 7000 RPM"]
  PUR --> DT["Day Tank\\nService"]
  DT --> BP["Booster\\nPump\\n8 bar"]
  BP --> HT["Heater\\n135-150°C"]
  HT --> VT["Viscotherm\\n12-15 cSt"]
  VT --> FI["Fuel Injectors\\n(Common Rail)\\n600-1000 bar"]
  FI --> ME["Main Engine\\nMAN B&W"]
  ST -.-> |"Sludge"| SL["Sludge Tank"]
  PUR -.-> |"Sludge"| SL

  style DB fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style ST fill:#091629,stroke:#f97316,color:#e8f4ff
  style PUR fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style DT fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style HT fill:#091629,stroke:#ef4444,color:#e8f4ff
  style ME fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style FI fill:#091629,stroke:#22c55e,color:#e8f4ff
  style VT fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style BP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style TP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style SL fill:#1a0a0a,stroke:#ef4444,color:#f87171`
  },

  /* ── Jacket Cooling Water System ── */
  cooling_water: {
    title: 'Jacket Cooling Water (JCW) System',
    code: `flowchart TD
  ME["Main Engine\\nJacket"] --> |"85-90°C"| EXP["Expansion\\nTank"]
  ME --> JWP["JCW Pump\\n3.5 bar"]
  JWP --> COOL["Central\\nCooler\\n(Plate HE)"]
  COOL --> |"75-80°C"| ME
  COOL --> |"LT Side"| SWP["Sea Water\\nPump"]
  SWP --> SEA["Seawater\\nOverboard"]
  ME --> |"Heat"| FWG["Fresh Water\\nGenerator\\n40-45°C vacuum"]
  EXP --> |"Makeup"| JWP
  JWP --> |"Branch"| TC["Turbocharger\\nCooling"]

  style ME fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style COOL fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style JWP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style FWG fill:#091629,stroke:#22c55e,color:#e8f4ff
  style SWP fill:#091629,stroke:#0ea5e9,color:#e8f4ff
  style SEA fill:#091629,stroke:#0ea5e9,color:#e8f4ff
  style EXP fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style TC fill:#091629,stroke:#a78bfa,color:#e8f4ff`
  },

  /* ── Starting Air System ── */
  starting_air: {
    title: 'Starting Air System — 2-Stage Compressed',
    code: `flowchart LR
  ATM["Atmosphere\\nFilter"] --> LP["LP Cylinder\\nStage 1"]
  LP --> IC["Intercooler\\n+ Moisture\\nSeparator"]
  IC --> HP["HP Cylinder\\nStage 2"]
  HP --> AC["Aftercooler\\n+ Drain"]
  AC --> RV1["Air Receiver #1\\n25-30 bar"]
  AC --> RV2["Air Receiver #2\\n25-30 bar"]
  RV1 --> SD["Starting Air\\nDistributor"]
  RV2 --> SD
  SD --> SV["Starting\\nValves\\n(per cyl)"]
  SV --> ME["Main Engine\\nCylinders"]
  RV1 --> |"Branch"| CTRL["Control Air\\n7 bar (reduced)"]
  RV1 --> |"Branch"| EMG["Emergency\\nGenerator Start"]

  style LP fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style HP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style IC fill:#091629,stroke:#22c55e,color:#e8f4ff
  style AC fill:#091629,stroke:#22c55e,color:#e8f4ff
  style RV1 fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style RV2 fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style ME fill:#0d2038,stroke:#ef4444,color:#e8f4ff
  style SD fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style SV fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style CTRL fill:#091629,stroke:#facc15,color:#e8f4ff
  style EMG fill:#091629,stroke:#ef4444,color:#e8f4ff
  style ATM fill:#091629,stroke:#94a3b8,color:#e8f4ff`
  },

  /* ── Lubrication Oil System ── */
  lube_oil_system: {
    title: 'Main Engine Lubrication Oil System',
    code: `flowchart TD
  SUMP["Sump Tank"] --> MLP["Main Lube\\nPump\\n4-5 bar"]
  MLP --> FLT["Auto\\nFilter\\n25μm"]
  FLT --> CLR["Lube Oil\\nCooler\\n45°C"]
  CLR --> MB["Main\\nBearings"]
  CLR --> XH["Crosshead\\nBearings"]
  CLR --> CR["Crankpin\\nBearings"]
  MB --> SUMP
  XH --> SUMP
  CR --> SUMP
  SUMP --> PUR["LO Purifier\\n(continuous)"]
  PUR --> SUMP
  CLR --> |"Separate"| CYL["Cylinder\\nLubricator\\n0.8-1.5 g/kWh"]
  CYL --> |"Total loss"| DRAIN["Scavenge\\nDrain Tank"]

  style SUMP fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style MLP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style FLT fill:#091629,stroke:#22c55e,color:#e8f4ff
  style CLR fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style MB fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style XH fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style CR fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style PUR fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style CYL fill:#091629,stroke:#ef4444,color:#e8f4ff
  style DRAIN fill:#1a0a0a,stroke:#ef4444,color:#f87171`
  },

  /* ── Electrical Power Distribution ── */
  electrical_distribution: {
    title: 'Ship Electrical Power Distribution',
    code: `flowchart TD
  DG1["Diesel\\nGenerator #1\\n440V 60Hz"] --> MSB["Main\\nSwitchboard\\n(MSB)"]
  DG2["Diesel\\nGenerator #2"] --> MSB
  DG3["Diesel\\nGenerator #3"] --> MSB
  SHP["Shore\\nPower"] -.-> MSB
  MSB --> BT["Bus-Tie\\nBreaker"]
  MSB --> |"440V"| MCC["Motor Control\\nCentre"]
  MCC --> PUMP["Pumps\\n& Motors"]
  MSB --> |"440V"| TFR["Step-Down\\nTransformer\\n440→220V"]
  TFR --> LDB["Lighting\\nDist. Board"]
  LDB --> LT["Lighting\\n+ 220V Outlets"]
  MSB --> |"Pref. Trip"| PT["Preferential\\nTrip System"]
  PT --> |"Never trip"| ESS["Essential:\\nSteering, Nav,\\nFire Pump"]
  MSB --> ESB["Emergency\\nSwitchboard"]
  EMG["Emergency\\nGenerator\\n(auto ≤45s)"] --> ESB

  style DG1 fill:#091629,stroke:#facc15,color:#e8f4ff
  style DG2 fill:#091629,stroke:#facc15,color:#e8f4ff
  style DG3 fill:#091629,stroke:#facc15,color:#e8f4ff
  style MSB fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style MCC fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style TFR fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style LDB fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style ESB fill:#091629,stroke:#ef4444,color:#e8f4ff
  style EMG fill:#091629,stroke:#ef4444,color:#e8f4ff
  style PT fill:#091629,stroke:#f97316,color:#e8f4ff
  style ESS fill:#091629,stroke:#22c55e,color:#e8f4ff
  style SHP fill:#091629,stroke:#94a3b8,color:#94a3b8`
  },

  /* ── Bilge / OWS System ── */
  bilge_ows: {
    title: 'Bilge System & Oily Water Separator',
    code: `flowchart LR
  BW["Bilge Wells\\n(ER, Holds)"] --> BP["Bilge\\nPump"]
  BP --> OWS["Oily Water\\nSeparator\\n(≤15ppm)"]
  OWS --> OCM["Oil Content\\nMonitor\\n15ppm alarm"]
  OCM --> |"≤15ppm"| OB["Overboard\\n(not in SA)"]
  OCM --> |">15ppm"| BT["Bilge\\nHolding Tank"]
  BT --> |"Recirculate"| OWS
  BT --> |"Shore"| SHR["Shore\\nReception"]
  OWS -.-> |"Oil"| SOT["Sludge Oil\\nTank"]
  SOT --> INC["Incinerator\\n(if fitted)"]

  style BW fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style BP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style OWS fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style OCM fill:#091629,stroke:#22c55e,color:#e8f4ff
  style OB fill:#091629,stroke:#22c55e,color:#e8f4ff
  style BT fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style SHR fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style SOT fill:#1a0a0a,stroke:#ef4444,color:#f87171
  style INC fill:#091629,stroke:#ef4444,color:#e8f4ff`
  },

  /* ── Sewage Treatment Plant ── */
  sewage_system: {
    title: 'Sewage Treatment Plant — MARPOL Annex IV',
    code: `flowchart LR
  TOI["Accommodation\\nToilets & Drains"] --> CT["Collection\\nTank"]
  CT --> STP["Sewage\\nTreatment\\nPlant"]
  STP --> |"Biological"| AER["Aeration\\nChamber"]
  AER --> SET["Settling\\nChamber"]
  SET --> CHL["Chlorination\\n(if req'd)"]
  CHL --> |"Treated\\n>3nm"| OB["Overboard"]
  SET --> |"Sludge"| SL["Sludge Tank\\n→ Shore"]
  CT --> |"Untreated\\n>12nm"| OB2["Overboard\\n(comminuted)"]

  style TOI fill:#091629,stroke:#94a3b8,color:#e8f4ff
  style CT fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style STP fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style AER fill:#091629,stroke:#22c55e,color:#e8f4ff
  style SET fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style CHL fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style OB fill:#091629,stroke:#22c55e,color:#e8f4ff
  style SL fill:#1a0a0a,stroke:#ef4444,color:#f87171
  style OB2 fill:#091629,stroke:#f59e0b,color:#e8f4ff`
  },

  /* ── Ballast Water Management ── */
  ballast_water: {
    title: 'Ballast Water Management System — IMO BWM Convention',
    code: `flowchart LR
  SEA["Sea\\nChest"] --> BP["Ballast\\nPump"]
  BP --> BWM["BWM Treatment\\n(UV / Electrolysis)"]
  BWM --> |"D-2 Standard"| BT["Ballast\\nTanks"]
  BT --> |"Deballast"| BWM2["Treatment\\n(if D-2)"]
  BWM2 --> OB["Overboard"]
  BT --> |"Sediment"| SED["Sediment\\nRemoval"]

  style SEA fill:#091629,stroke:#0ea5e9,color:#e8f4ff
  style BP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style BWM fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style BT fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style BWM2 fill:#091629,stroke:#22c55e,color:#e8f4ff
  style OB fill:#091629,stroke:#22c55e,color:#e8f4ff
  style SED fill:#091629,stroke:#f59e0b,color:#e8f4ff`
  },

  /* ── Refrigeration System ── */
  refrigeration: {
    title: 'Marine Refrigeration — Vapour Compression Cycle',
    code: `flowchart LR
  COMP["Compressor\\n↑ Pressure\\n↑ Temperature"] --> |"Hot gas\\n60-80°C"| COND["Condenser\\n(SW cooled)\\nHeat rejected"]
  COND --> |"Sub-cooled\\nliquid"| REC["Receiver\\nTank"]
  REC --> EXP["Expansion\\nValve\\n↓ Pressure"]
  EXP --> |"Wet mixture\\n-25°C"| EVAP["Evaporator\\n(Cargo hold\\ncoils)"]
  EVAP --> |"Superheated\\nvapour"| COMP
  COND -.-> |"Heat"| SW["Seawater\\nOverboard"]

  style COMP fill:#091629,stroke:#ef4444,color:#e8f4ff
  style COND fill:#091629,stroke:#f97316,color:#e8f4ff
  style REC fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style EXP fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style EVAP fill:#091629,stroke:#22c55e,color:#e8f4ff
  style SW fill:#091629,stroke:#0ea5e9,color:#e8f4ff`
  },

  /* ── Fire Fighting System ── */
  fire_fighting: {
    title: 'Ship Fire Fighting System — SOLAS Ch.II-2',
    code: `flowchart TD
  SB["Sea Chest\\n(below WL)"] --> FP1["Fire Pump #1\\n(ER)"]
  SB --> FP2["Fire Pump #2\\n(ER)"]
  SB --> EFP["Emergency\\nFire Pump\\n(outside ER)"]
  FP1 --> FM["Fire Main\\n(ring main)"]
  FP2 --> FM
  EFP --> FM
  FM --> HYD["Hydrants\\n+ Hose Reels"]
  FM --> SPR["Sprinkler\\nSystem\\n(accommodation)"]
  CO2["CO₂ System\\n(ER fixed)"] --> |"20s warning"| ER["Engine Room"]
  FO["Foam System\\n(fuel areas)"] --> FUEL["Fuel Tank\\nDeck"]

  style FP1 fill:#091629,stroke:#ef4444,color:#e8f4ff
  style FP2 fill:#091629,stroke:#ef4444,color:#e8f4ff
  style EFP fill:#091629,stroke:#f97316,color:#e8f4ff
  style FM fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style HYD fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style SPR fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style CO2 fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style ER fill:#091629,stroke:#94a3b8,color:#e8f4ff
  style FO fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style FUEL fill:#091629,stroke:#94a3b8,color:#e8f4ff
  style SB fill:#091629,stroke:#0ea5e9,color:#e8f4ff`
  },

  /* ── Steam Plant / Boiler System ── */
  steam_plant: {
    title: 'Auxiliary Boiler & Steam Distribution',
    code: `flowchart LR
  FW["Feed Water\\nTank"] --> FWP["Feed\\nPump"]
  FWP --> EC["Economiser\\n(exhaust gas)"]
  EC --> BLR["Aux Boiler\\n7-17 bar\\npH 10.5-11.5"]
  BLR --> |"Steam"| HDR["Steam\\nHeader"]
  HDR --> HT["Fuel Oil\\nHeaters"]
  HDR --> PUR["Purifier\\nHeating"]
  HDR --> HW["Hot Water\\n(accomm)"]
  HDR --> TK["Tank\\nHeating Coils"]
  HDR --> |"Condensate"| CT["Cascade\\nTank"]
  CT --> FW
  BLR --> |"Blowdown"| BD["Blowdown\\nTank"]

  style FW fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style FWP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style EC fill:#091629,stroke:#f97316,color:#e8f4ff
  style BLR fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style HDR fill:#091629,stroke:#ef4444,color:#e8f4ff
  style HT fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style PUR fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style CT fill:#091629,stroke:#22c55e,color:#e8f4ff
  style BD fill:#1a0a0a,stroke:#ef4444,color:#f87171
  style HW fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style TK fill:#091629,stroke:#f59e0b,color:#e8f4ff`
  },

  /* ── Steering Gear System ── */
  steering_gear: {
    title: 'Electro-Hydraulic Steering Gear — SOLAS',
    code: `flowchart LR
  BR["Bridge\\nHelm"] --> NFU["NFU/Follow-up\\nControl"]
  NFU --> PMP["Hydraulic\\nPump Unit\\n(2 independent)"]
  PMP --> RAM["Hydraulic\\nRam Cylinders"]
  RAM --> TLR["Tiller\\nArm"]
  TLR --> RUD["Rudder\\n(±35°)"]
  NFU --> |"Feedback"| FBK["Rudder Angle\\nIndicator"]
  PMP --> |"Oil"| TNK["Oil Tank\\n+ Filter"]
  TNK --> PMP
  PMP --> |"Relief"| RV["Relief\\nValve"]

  style BR fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style NFU fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style PMP fill:#091629,stroke:#facc15,color:#e8f4ff
  style RAM fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style TLR fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style RUD fill:#091629,stroke:#22c55e,color:#e8f4ff
  style FBK fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style TNK fill:#091629,stroke:#94a3b8,color:#e8f4ff
  style RV fill:#091629,stroke:#ef4444,color:#e8f4ff`
  },

  /* ── Fresh Water Generator ── */
  fresh_water_gen: {
    title: 'Fresh Water Generator — Vacuum Evaporation',
    code: `flowchart LR
  JCW["Jacket\\nCooling Water\\n85-90°C"] --> EVAP["Evaporator\\nShell\\n(vacuum 0.9 bar)"]
  SW["Sea Water\\nFeed"] --> EVAP
  EVAP --> |"Steam\\n40-45°C"| DEM["Demister\\n(droplet sep)"]
  DEM --> COND["Condenser"]
  SW2["Sea Water\\n(cooling)"] --> COND
  COND --> |"Fresh Water"| SAL["Salinometer\\n≤10 ppm"]
  SAL --> |"Pass"| FWT["Fresh Water\\nTank"]
  SAL --> |"Fail (>10ppm)"| EVAP
  EVAP --> |"Brine"| EP["Ejector\\nPump"]
  EP --> OB["Overboard"]

  style JCW fill:#091629,stroke:#ef4444,color:#e8f4ff
  style EVAP fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style DEM fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style COND fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style SAL fill:#091629,stroke:#22c55e,color:#e8f4ff
  style FWT fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style SW fill:#091629,stroke:#0ea5e9,color:#e8f4ff
  style SW2 fill:#091629,stroke:#0ea5e9,color:#e8f4ff
  style EP fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style OB fill:#091629,stroke:#94a3b8,color:#e8f4ff`
  },

  /* ── Purifier Separation ── */
  purifier_system: {
    title: 'HFO Purifier System — Alfa Laval FOPX',
    code: `flowchart TD
  ST["Settling\\nTank\\n95°C"] --> FP["Feed\\nPump"]
  FP --> PH["Pre-Heater\\n98°C"]
  PH --> PUR["Disc Stack\\nCentrifuge\\n7000 RPM"]
  PUR --> |"Clean Oil"| DT["Day Service\\nTank"]
  PUR --> |"Sludge"| SL["Sludge Tank"]
  PUR --> |"Water"| WT["Waste Oil\\nTank"]
  DT --> ME["Main Engine"]
  PH --> |"Steam"| STM["Aux Boiler"]
  PUR --> |"Gravity Disc"| GD["Selected by\\ndensity/temp"]

  style ST fill:#091629,stroke:#f97316,color:#e8f4ff
  style FP fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style PH fill:#091629,stroke:#ef4444,color:#e8f4ff
  style PUR fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style DT fill:#091629,stroke:#22c55e,color:#e8f4ff
  style SL fill:#1a0a0a,stroke:#ef4444,color:#f87171
  style WT fill:#091629,stroke:#f59e0b,color:#e8f4ff
  style ME fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style STM fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style GD fill:#091629,stroke:#facc15,color:#e8f4ff`
  },

  /* ── Air Conditioning System ── */
  air_conditioning: {
    title: 'Ship Air Conditioning — Accommodation HVAC',
    code: `flowchart LR
  AHU["Air Handling\\nUnit"] --> |"Chilled Air"| DUCT["Supply\\nDucts"]
  DUCT --> CAB["Cabins\\n& Mess"]
  DUCT --> BR["Bridge"]
  DUCT --> ECR["ECR"]
  CAB --> RET["Return Air\\nDucts"]
  RET --> AHU
  CU["Chiller Unit\\n(Compressor)"] --> |"Chilled Water\\n5-7°C"| CC["Cooling Coil\\n(in AHU)"]
  CC --> AHU
  CU --> |"Heat"| COND["Condenser\\n(SW cooled)"]
  AHU --> |"Fresh Air\\nMakeup"| FA["Intake\\n(deck level)"]

  style AHU fill:#0d2038,stroke:#d4a017,color:#d4a017,stroke-width:2px
  style DUCT fill:#091629,stroke:#38bdf8,color:#e8f4ff
  style CAB fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style BR fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style ECR fill:#091629,stroke:#60a5fa,color:#e8f4ff
  style RET fill:#091629,stroke:#94a3b8,color:#e8f4ff
  style CU fill:#091629,stroke:#a78bfa,color:#e8f4ff
  style CC fill:#091629,stroke:#22c55e,color:#e8f4ff
  style COND fill:#091629,stroke:#f97316,color:#e8f4ff
  style FA fill:#091629,stroke:#22c55e,color:#e8f4ff`
  }
};

/* ══════════════════════════════════════════════════════════
   2. TOPIC → MERMAID FLOW MAPPING
   ══════════════════════════════════════════════════════════ */
const TOPIC_MERMAID = {
  // Class IV topics
  cl4_fuelsys:    'fuel_oil_system',
  cl4_lubesys:    'lube_oil_system',
  cl4_aircomp:    'starting_air',
  cl4_pumps:      'cooling_water',
  cl4_purifier:   'purifier_system',
  cl4_heatex:     'cooling_water',
  cl4_fwg:        'fresh_water_gen',
  cl4_ows:        'bilge_ows',
  cl4_generators: 'electrical_distribution',
  cl4_motors:     'electrical_distribution',
  cl4_protection: 'electrical_distribution',
  // BTech topics
  bt_diesel1:     'fuel_oil_system',
  bt_aux:         'starting_air',
  bt_elec2:       'electrical_distribution',
  bt_elec3:       'electrical_distribution',
  bt_refrig:      'refrigeration',
  bt_fluid2:      'cooling_water',
  bt_naval1:      'steering_gear',
  bt_mep:         'bilge_ows',
  // Class II/III topics
  cl3_refrigsys:  'refrigeration',
  cl3_refrig:     'refrigeration',
  cl3_boilers:    'steam_plant',
  cl3_boilerwater:'steam_plant',
  cl3_steamplant: 'steam_plant',
  cl3_marpol:     'bilge_ows',
  cl3_bwm:        'ballast_water',
  cl3_solas:      'fire_fighting',
  // Safety topics (cadet)
  cd_fire:        'fire_fighting',
  cd_fire_prev:   'fire_fighting',
  cd_pst:         'fire_fighting',
};

/* ══════════════════════════════════════════════════════════
   3. MERMAID RENDERER
   ══════════════════════════════════════════════════════════ */
let _mermaidCounter = 0;

async function renderMermaidFlow(flowKey, container) {
  if (typeof mermaid === 'undefined' || !mermaid) {
    container.innerHTML = '<div class="mmd-unavail">Mermaid.js not loaded — check internet connection</div>';
    return;
  }
  var flow = MERMAID_FLOWS[flowKey];
  if (!flow) return;

  var id = 'mmd_' + (++_mermaidCounter);
  container.innerHTML = '<div class="mmd-loading"><div class="mmd-spinner"></div>Rendering flow diagram…</div>';

  try {
    var result = await mermaid.render(id, flow.code);
    container.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.className = 'mmd-result';
    wrap.innerHTML =
      '<div class="mmd-title-bar">' +
        '<span class="mmd-title-icon">🔀</span>' +
        '<span class="mmd-title-text">' + flow.title + '</span>' +
        '<span class="mmd-title-badge">FLOW DIAGRAM</span>' +
      '</div>' +
      '<div class="mmd-svg-wrap" data-flow="' + flowKey + '">' + result.svg + '</div>' +
      '<div class="mmd-footer">' +
        '<span class="mmd-footer-label">Interactive System Flow · Tap/pinch to zoom</span>' +
        '<button class="mmd-zoom-btn" onclick="zoomMermaid(this)" title="Full screen">⤢ Zoom</button>' +
      '</div>';
    container.appendChild(wrap);
  } catch (e) {
    container.innerHTML = '<div class="mmd-error">⚠ Diagram render error: ' + e.message + '</div>';
  }
}

function zoomMermaid(btn) {
  var wrap = btn.closest('.mmd-result');
  if (!wrap) return;
  var svgWrap = wrap.querySelector('.mmd-svg-wrap');
  if (!svgWrap) return;
  var overlay = document.createElement('div');
  overlay.className = 'mmd-overlay';
  overlay.innerHTML =
    '<div class="mmd-overlay-inner">' +
      '<div class="mmd-overlay-header">' +
        '<span>' + (wrap.querySelector('.mmd-title-text')?.textContent || 'System Flow') + '</span>' +
        '<button onclick="this.closest(\'.mmd-overlay\').remove()" class="mmd-overlay-close">✕</button>' +
      '</div>' +
      '<div class="mmd-overlay-body">' + svgWrap.innerHTML + '</div>' +
    '</div>';
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

/* ══════════════════════════════════════════════════════════
   4. INJECT INTO DIAGRAM PANEL — add flow diagram after static diagrams
   ══════════════════════════════════════════════════════════ */
(function patchLoadDiagramsForMermaid() {
  var _orig = loadDiagrams;
  loadDiagrams = function(topicId) {
    _orig(topicId);

    var flowKey = TOPIC_MERMAID[topicId];
    if (!flowKey || !MERMAID_FLOWS[flowKey]) return;

    var grid = document.getElementById('diagGrid');
    if (!grid) return;

    var wrap = document.createElement('div');
    wrap.className = 'mmd-wrap';
    grid.appendChild(wrap);
    renderMermaidFlow(flowKey, wrap);
  };
})();

/* ══════════════════════════════════════════════════════════
   5. CSS — Mermaid diagram styling
   ══════════════════════════════════════════════════════════ */
(function injectMermaidCSS() {
  var s = document.createElement('style');
  s.id = 'mmd-css';
  s.textContent = '\
/* ── Mermaid wrapper ── */\
.mmd-wrap {\
  grid-column: 1 / -1;\
  border-radius: 14px; overflow: hidden;\
  border: 1px solid var(--b1);\
  background: var(--bg1);\
  margin-top: 8px;\
}\
/* ── Title bar ── */\
.mmd-title-bar {\
  display: flex; align-items: center; gap: 8px;\
  padding: 10px 14px;\
  background: linear-gradient(135deg, #0d2038, #091629);\
  border-bottom: 1px solid var(--b0);\
}\
.mmd-title-icon { font-size: 1rem; }\
.mmd-title-text {\
  font-family: "JetBrains Mono", monospace; font-size: 0.72rem;\
  font-weight: 700; color: var(--tx); flex: 1;\
  text-transform: uppercase; letter-spacing: 0.05em;\
}\
.mmd-title-badge {\
  font-family: "JetBrains Mono", monospace; font-size: 0.55rem;\
  padding: 2px 8px; border-radius: 20px; letter-spacing: 0.08em;\
  border: 1px solid rgba(96,165,250,0.3);\
  color: #60a5fa;\
  background: rgba(96,165,250,0.08);\
}\
/* ── SVG container ── */\
.mmd-svg-wrap {\
  width: 100%; overflow-x: auto; overflow-y: hidden;\
  -webkit-overflow-scrolling: touch;\
  padding: 16px 12px;\
  background: #030b14;\
}\
.mmd-svg-wrap svg {\
  display: block !important; min-width: 500px;\
  width: 100% !important; height: auto !important;\
  max-height: 400px;\
}\
/* ── Footer ── */\
.mmd-footer {\
  display: flex; align-items: center; justify-content: space-between;\
  padding: 8px 14px; background: var(--bg2);\
  border-top: 1px solid var(--b0);\
}\
.mmd-footer-label {\
  font-family: "JetBrains Mono", monospace; font-size: 0.58rem;\
  color: var(--tx3); text-transform: uppercase; letter-spacing: 0.06em;\
}\
.mmd-zoom-btn {\
  padding: 4px 10px; border-radius: 6px; border: 1px solid var(--b1);\
  background: var(--bg3); color: var(--tx3); cursor: pointer;\
  font-size: 0.65rem; font-family: "JetBrains Mono", monospace;\
  transition: all 0.12s;\
}\
.mmd-zoom-btn:hover { border-color: var(--ac); color: var(--acL); }\
/* ── Loading ── */\
.mmd-loading {\
  display: flex; flex-direction: column; align-items: center;\
  padding: 28px; gap: 10px; color: var(--tx3); font-size: 0.78rem;\
}\
.mmd-spinner {\
  width: 28px; height: 28px; border-radius: 50%;\
  border: 3px solid var(--b1); border-top-color: #60a5fa;\
  animation: mmdSpin 0.8s linear infinite;\
}\
@keyframes mmdSpin { to { transform: rotate(360deg); } }\
/* ── Error ── */\
.mmd-error {\
  padding: 20px; text-align: center;\
  color: #f87171; font-size: 0.78rem;\
}\
.mmd-unavail {\
  padding: 20px; text-align: center;\
  color: var(--tx3); font-size: 0.78rem;\
}\
/* ── Zoom overlay ── */\
.mmd-overlay {\
  position: fixed; inset: 0; z-index: 500;\
  background: rgba(0,0,0,0.92);\
  display: flex; align-items: center; justify-content: center;\
  padding: 16px; cursor: zoom-out;\
}\
.mmd-overlay-inner {\
  max-width: 960px; width: 100%;\
  background: var(--bg1); border-radius: 16px;\
  overflow: hidden; border: 1px solid var(--b1);\
  cursor: default;\
}\
.mmd-overlay-header {\
  padding: 10px 16px;\
  display: flex; justify-content: space-between; align-items: center;\
  border-bottom: 1px solid var(--b0);\
  font-size: 0.75rem; color: var(--tx2);\
}\
.mmd-overlay-close {\
  background: none; border: none; color: var(--tx3);\
  cursor: pointer; font-size: 1.1rem;\
}\
.mmd-overlay-body {\
  padding: 16px; overflow-x: auto;\
  -webkit-overflow-scrolling: touch;\
}\
.mmd-overlay-body svg {\
  width: 100% !important; height: auto !important;\
  min-width: 600px; display: block !important;\
}\
/* ── Mobile ── */\
@media (max-width: 768px) {\
  .mmd-svg-wrap { padding: 10px 6px; }\
  .mmd-svg-wrap svg { min-width: 400px; max-height: 300px; }\
  .mmd-title-bar { padding: 8px 10px; }\
  .mmd-footer { padding: 6px 10px; }\
  .mmd-zoom-btn { padding: 6px 10px; min-height: 34px; }\
  .mmd-overlay-body svg { min-width: 400px; }\
}\
  ';
  document.head.appendChild(s);
})();

console.log('%cMarineIQ — Mermaid Flow Diagrams: ' + Object.keys(MERMAID_FLOWS).length + ' systems loaded', 'color:#60a5fa;font-weight:bold');
