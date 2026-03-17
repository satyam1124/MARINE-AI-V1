/* MarineIQ — Curated Maritime Regulations Data (Structured Offline Reference)
   Sources: IMO SOLAS 2020, MARPOL 2021, COLREG 1972 (amended), STCW 2010 Manila
   Used by: knowledge-engine.js for in-prompt context injection
   ═══════════════════════════════════════════════════════════════════════ */

const MARITIME_REGS = {

  /* ════════════════════════════════════════
     SOLAS — Safety of Life at Sea
     ════════════════════════════════════════ */
  solas: {
    fullTitle: 'International Convention for the Safety of Life at Sea, 1974 (as amended)',
    latestConsolidation: '2020 Edition',
    chapters: {
      'II-1': {
        title: 'Construction — Structure, subdivision, stability, machinery and electrical installations',
        keyRegs: {
          '43': {
            title: 'Emergency source of electrical power in cargo ships',
            summary: 'Emergency generator must auto-start within 45 seconds. Duration: 18h passenger ships, 3h cargo ships (as extended by fire pump duration).',
            source: 'SOLAS Ch II-1 Reg 43'
          },
          '26': {
            title: 'Main source of electrical power',
            summary: 'Sufficient electrical power for all services necessary for maintaining the ship in normal operational and habitable conditions, without recourse to emergency source.',
            source: 'SOLAS Ch II-1 Reg 26'
          }
        }
      },
      'II-2': {
        title: 'Fire Protection, Fire Detection and Fire Extinction',
        keyRegs: {
          '4': {
            title: 'Probability of ignition',
            summary: 'Measures to reduce probability of fire including control of flammable materials, ignition sources, and separation of living/working spaces from high-risk areas.',
            source: 'SOLAS Ch II-2 Reg 4'
          },
          '7': {
            title: 'Detection and alarm',
            summary: 'Fixed fire detection and alarm system required in all accommodation, service spaces, control stations, and machinery spaces. Smoke detectors in corridors.',
            source: 'SOLAS Ch II-2 Reg 7'
          },
          '10': {
            title: 'Fire fighting',
            summary: 'CO₂ fixed system for machinery spaces: pre-discharge alarm minimum 20 seconds. Water mist, foam, or equivalent also acceptable. Fire hoses at every hydrant.',
            source: 'SOLAS Ch II-2 Reg 10'
          }
        }
      },
      'III': {
        title: 'Life-Saving Appliances and Arrangements',
        keyRegs: {
          '19.3': {
            title: 'Life-saving appliance requirements',
            summary: 'Every passenger and cargo ship shall carry sufficient liferafts for 100% of persons on board.',
            lastAmended: 'MSC.404(96) — June 2016',
            effectiveDate: '2020-01-01',
            source: 'SOLAS Ch III Reg 19.3'
          },
          '31': {
            title: 'Drills',
            requirements: {
              abandonShip: 'Monthly, within 24 hours of leaving port if >25% crew change',
              fire: 'Monthly',
              frequency: 'Each crew member must participate in at least one drill per month'
            },
            source: 'SOLAS Ch III Reg 31'
          },
          '32': {
            title: 'On-board training and instructions',
            summary: 'Training manual in each crew mess room and recreation room. Must contain instructions on LSA and survival techniques.',
            source: 'SOLAS Ch III Reg 32'
          }
        }
      },
      'V': {
        title: 'Safety of Navigation',
        keyRegs: {
          '19': {
            title: 'Carriage requirements for shipborne navigational systems and equipment',
            summary: 'AIS mandatory ≥300 GT international, ≥500 GT domestic. ECDIS mandatory per SOLAS timeline. VDR ≥ 3000 GT.',
            source: 'SOLAS Ch V Reg 19'
          },
          '22': {
            title: 'Navigation bridge visibility',
            summary: 'From the conning position, view of sea surface ≤ 2 ship lengths or 500m (whichever less) forward. Blind sector ≤ 10° each, total ≤ 20°.',
            source: 'SOLAS Ch V Reg 22'
          }
        }
      },
      'IX': {
        title: 'Management for the Safe Operation of Ships (ISM Code)',
        keyElements: [
          '1. Safety & environmental protection policy',
          '2. Company responsibilities and authority',
          '3. Designated Person Ashore (DPA)',
          '4. Master\'s responsibility and authority',
          '5. Resources and personnel',
          '6. Shipboard operations',
          '7. Emergency preparedness',
          '8. Non-conformity, accidents, hazardous occurrences reporting',
          '9. Maintenance of the ship and equipment',
          '10. Documentation',
          '11. Company verification, review, and evaluation',
          '12. Certification, verification, and control'
        ],
        certificates: {
          DOC: 'Document of Compliance — company level',
          SMC: 'Safety Management Certificate — ship level'
        },
        source: 'IMO Resolution A.741(18) — ISM Code'
      }
    }
  },

  /* ════════════════════════════════════════
     MARPOL 73/78 — Marine Pollution Prevention
     ════════════════════════════════════════ */
  marpol: {
    fullTitle: 'International Convention for the Prevention of Pollution from Ships, 1973/78',
    latestConsolidation: '2021 Edition',
    annexes: {
      I: {
        title: 'Prevention of Pollution by Oil',
        specialAreas: ['Mediterranean', 'Baltic', 'Black Sea', 'Red Sea', 'Gulfs Area',
                       'Gulf of Aden', 'Antarctic', 'North West European Waters',
                       'Oman Sea of Arabia', 'Southern South African Waters'],
        discharge: {
          outsideSpecialArea: {
            machinerySpace: '15 ppm max, using OWS with 15ppm alarm and auto-stop',
            cargoTanker: '30L per NM, total < 1/30000 of cargo, >50NM from land, en route'
          },
          insideSpecialArea: {
            machinerySpace: '15 ppm max (same as outside)',
            cargoTanker: 'NO discharge allowed'
          }
        },
        records: {
          ORB_Part_I: 'Oil Record Book Part I — machinery space operations. Retained 3 years.',
          ORB_Part_II: 'Oil Record Book Part II — cargo/ballast operations (tankers only).',
          OCM: 'Oil Content Monitor — type-approved to MEPC.107(49)'
        },
        source: 'MARPOL Annex I Reg 14, 15, 34'
      },
      II: {
        title: 'Control of Pollution by Noxious Liquid Substances in Bulk',
        categories: 'X (major hazard), Y (hazard), Z (minor hazard), OS (no hazard)',
        requirement: 'Pre-wash mandatory for Cat X. Cargo Record Book required.',
        source: 'MARPOL Annex II'
      },
      III: {
        title: 'Prevention of Pollution by Harmful Substances in Packaged Form',
        requirement: 'IMDG Code compliance for dangerous goods in packages. Proper stowage, segregation, documentation.',
        source: 'MARPOL Annex III'
      },
      IV: {
        title: 'Prevention of Pollution by Sewage from Ships',
        discharge: '>3NM: comminuted and disinfected. >12NM: raw sewage (ship en route, moderate rate). Special areas: no discharge.',
        requirement: 'Holding tank or approved sewage treatment plant.',
        source: 'MARPOL Annex IV'
      },
      V: {
        title: 'Prevention of Pollution by Garbage from Ships',
        generalRule: 'NO discharge of garbage except food waste (>12NM, comminuted <25mm) and cargo residues (case-by-case)',
        specialAreas: 'More stringent — no food waste within 12NM',
        garbageManagement: 'Garbage Management Plan and Garbage Record Book required ≥100GT or 15+ crew',
        source: 'MARPOL Annex V (revised 2013)'
      },
      VI: {
        title: 'Prevention of Air Pollution from Ships',
        sulphur: {
          global: { limit: '0.50% m/m', effectiveDate: '2020-01-01' },
          ECA: { limit: '0.10% m/m', effectiveDate: '2015-01-01' },
          ecaAreas: ['Baltic Sea', 'North Sea', 'North American ECA', 'US Caribbean Sea ECA'],
          compliance: 'VLSFO, EGCS (scrubber), or alternative fuels (LNG, methanol)'
        },
        NOx: {
          tierI: 'Ships built 2000-2010: 17.0 g/kWh (at 130 rpm)',
          tierII: 'Ships built 2011+: 14.4 g/kWh (at 130 rpm)',
          tierIII: 'Ships built 2016+ in NECAs: 3.4 g/kWh (80% reduction). Requires SCR or EGR.',
          source: 'MARPOL Annex VI Reg 13'
        },
        energyEfficiency: {
          EEDI: 'Energy Efficiency Design Index — minimum efficiency for new ships',
          EEXI: 'Energy Efficiency Existing Ship Index — in force from 1 Jan 2023',
          CII: 'Carbon Intensity Indicator — A-E annual rating. D for 3 years or E for 1 year triggers corrective action plan.',
          SEEMP: 'Ship Energy Efficiency Management Plan Part III — mandatory from 2023',
          source: 'MEPC.328(76), MEPC.339(76), MEPC.355(78)'
        },
        source: 'MARPOL Annex VI'
      }
    }
  },

  /* ════════════════════════════════════════
     COLREG — Collision Regulations 1972
     ════════════════════════════════════════ */
  colreg: {
    fullTitle: 'Convention on the International Regulations for Preventing Collisions at Sea, 1972',
    rules: {
      5:  { title: 'Look-out', summary: 'Every vessel shall at all times maintain a proper look-out by sight and hearing as well as by all available means appropriate to the prevailing circumstances and conditions.' },
      6:  { title: 'Safe Speed', summary: 'Every vessel shall at all times proceed at a safe speed so that she can take proper and effective action to avoid collision and be stopped within a distance appropriate to the prevailing circumstances.', factors: ['visibility', 'traffic density', 'manoeuvrability', 'wind/sea/current', 'draught vs depth', 'background light at night'] },
      7:  { title: 'Risk of Collision', summary: 'Every vessel shall use all available means appropriate to determine if risk of collision exists. If there is any doubt, such risk shall be deemed to exist. Compass bearing not appreciably changing = risk exists.' },
      8:  { title: 'Action to Avoid Collision', summary: 'Any action shall be positive, made in ample time, and large enough to be readily apparent to another vessel observing visually or by radar. A succession of small alterations shall be avoided.' },
      9:  { title: 'Narrow Channels', summary: 'Vessels shall keep to the starboard side of a narrow channel. Vessels <20m or sailing vessels shall not impede vessels that can only navigate within the channel.' },
      10: { title: 'Traffic Separation Schemes', summary: 'Vessels using TSS shall proceed in the appropriate traffic lane in the general direction of traffic flow. Join/leave at termination or at as small an angle as practicable.' },
      12: { title: 'Sailing Vessels', summary: 'Wind on port side gives way to wind on starboard. Both same side: windward gives way. Port tack vessel unsure of windward side shall give way.' },
      13: { title: 'Overtaking', summary: 'Any vessel overtaking shall keep clear. Overtaking vessel: coming up more than 22.5° abaft the beam. Remains give-way until finally past and clear.' },
      14: { title: 'Head-on Situation', summary: 'When two power-driven vessels meet head-on or nearly so, each shall alter course to starboard so that each passes on the port side of the other.' },
      15: { title: 'Crossing Situation', summary: 'When two power-driven vessels are crossing, the vessel which has the other on her starboard side shall keep out of the way (and shall avoid crossing ahead).' },
      16: { title: 'Action by Give-way Vessel', summary: 'Shall, so far as possible, take early and substantial action to keep well clear.' },
      17: { title: 'Action by Stand-on Vessel', summary: 'Shall keep her course and speed. May take action when it becomes apparent that the give-way vessel is not taking appropriate action.' },
      18: { title: 'Responsibilities Between Vessels', summary: 'Hierarchy: NUC → RAM → Constrained by Draught → Fishing → Sailing → Power-driven. Each category gives way to those above.' },
      19: { title: 'Restricted Visibility', summary: 'Navigate at safe speed. Detect by radar alone: avoid alteration to port for vessel forward of beam (except overtaking). If close-quarters developing: reduce speed to bare minimum, take way off if necessary.' }
    },
    lights: {
      powerDriven: {
        underway: ['Masthead light(s)', 'Sidelights (red port, green starboard)', 'Stern light (white)'],
        over50m: 'Two masthead lights — forward one lower than after one',
        under50m: 'May carry only one masthead light'
      },
      sailingVessel: { underway: ['Sidelights', 'Stern light', 'Optional: red over green at masthead'] },
      NUC: 'Two all-round red lights vertically + sidelights and stern if making way',
      RAM: 'Red-white-red all-round lights vertically + normal lights if making way',
      aground: 'Two all-round red lights vertically + anchor lights',
      pilotVessel: 'White over red all-round at masthead + sidelights and stern when underway',
      trawler: 'Green over white all-round + sidelights and stern when making way',
      fishing: 'Red over white all-round + sidelights and stern when making way'
    }
  },

  /* ════════════════════════════════════════
     STCW 2010 Manila — Standards of Training
     ════════════════════════════════════════ */
  stcw: {
    fullTitle: 'International Convention on Standards of Training, Certification and Watchkeeping for Seafarers, 1978 (as amended in 2010 Manila)',
    restHours: {
      minimum: '10 hours in any 24-hour period AND 77 hours in any 7-day period',
      maximum: '14 hours work in any 24-hour period AND 98 hours in any 7-day period',
      division: 'Rest may be divided into no more than 2 periods, one of which must be ≥6 hours',
      exceptions: 'Emergency or drill situations only — must be compensated',
      BAC: 'Blood alcohol content must not exceed 0.05% (50mg/100ml) while on duty',
      source: 'STCW Reg VIII/1, MLC 2006 Standard A2.3'
    },
    engineeringCerts: {
      classIV: {
        table: 'A-III/1',
        title: 'Officer in Charge of an Engineering Watch (OICEW)',
        writtenPapers: ['EK-General', 'EK-Motor', 'Electrotechnology'],
        oral: 'MMD Oral — STCW A-III/1 competencies'
      },
      classII: {
        table: 'A-III/2',
        title: 'Chief Engineer / Second Engineer Officer',
        writtenPapers: ['Naval Architecture & Stability', 'Applied Heat', 'Marine Engineering Practice', 'Motor Engineering', 'Electrotechnology Advanced'],
        oral: 'MMD Oral — management level competencies'
      }
    },
    source: 'STCW 2010 Manila Amendment'
  },

  /* ════════════════════════════════════════
     Classification Societies (IACS)
     ════════════════════════════════════════ */
  classification: {
    IACSMembers: [
      { abbr: 'LR', name: 'Lloyd\'s Register', country: 'UK' },
      { abbr: 'DNV', name: 'Det Norske Veritas', country: 'Norway' },
      { abbr: 'ABS', name: 'American Bureau of Shipping', country: 'USA' },
      { abbr: 'BV', name: 'Bureau Veritas', country: 'France' },
      { abbr: 'ClassNK', name: 'Nippon Kaiji Kyokai', country: 'Japan' },
      { abbr: 'RINA', name: 'Registro Italiano Navale', country: 'Italy' },
      { abbr: 'CCS', name: 'China Classification Society', country: 'China' },
      { abbr: 'KR', name: 'Korean Register', country: 'South Korea' },
      { abbr: 'IRS', name: 'Indian Register of Shipping', country: 'India' }
    ],
    surveys: {
      annual: 'Every 12 months (±3 months window)',
      intermediate: 'Between 2nd and 3rd annual survey (2.5 year mark)',
      special: 'Every 5 years — drydock inspection, underwater hull survey',
      CSM: 'Continuous Survey Machinery — spread machinery survey items over 5-year cycle'
    }
  }
};

/* Make globally accessible */
if (typeof window !== 'undefined') window.MARITIME_REGS = MARITIME_REGS;
