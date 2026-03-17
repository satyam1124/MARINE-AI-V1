/* MarineIQ — Knowledge Engine: Query categorization, source routing, response post-processing
   Deps: config.js, maritime-regulations.js (optional), source-integrator.js (optional)
   Additive — does NOT modify existing ai-engine.js
   ═══════════════════════════════════════════════════════════════════════ */

const MarineKnowledgeEngine = (function () {

  /* ═══════════════════════════════════════
     CATEGORY KEYWORDS — for routing queries
     ═══════════════════════════════════════ */
  const CATEGORY_KEYWORDS = {
    navigation:    ['colreg', 'collision', 'navigation', 'steering', 'rules of the road', 'buoy',
                    'light', 'day signal', 'sound signal', 'radar plotting', 'ecdis', 'ais',
                    'passage plan', 'watchkeeping', 'lookout', 'safe speed', 'narrow channel',
                    'traffic separation', 'overtaking', 'head-on', 'crossing', 'give-way', 'stand-on'],
    safety:        ['solas', 'life saving', 'lifeboat', 'liferaft', 'fire', 'ism', 'safety',
                    'abandon ship', 'muster', 'drill', 'ppe', 'risk assessment', 'enclosed space',
                    'permit to work', 'hot work', 'isps', 'security'],
    pollution:     ['marpol', 'pollution', 'oil record book', 'garbage', 'sewage', 'ballast water',
                    'emission', 'eca', 'seca', 'annex', 'ows', 'oily water separator', 'ocm',
                    'special area', 'nox', 'sox', 'sulphur', 'scrubber'],
    cargo:         ['cargo', 'loading', 'stability', 'trim', 'imsbc', 'imdg', 'dangerous goods',
                    'container', 'tanker', 'bulk', 'ullage', 'inerting', 'cow', 'venting',
                    'fumigation', 'lashing', 'securing'],
    engine:        ['engine', 'fuel', 'lub oil', 'purifier', 'boiler', 'turbocharger', 'scavenge',
                    'piston', 'cylinder', 'auxiliary', 'governor', 'crankshaft', 'camshaft',
                    'bearing', 'sfoc', 'starting air', 'main engine', 'generator', 'compressor'],
    electrical:    ['gmdss', 'radar', 'ais', 'ecdis', 'vdr', 'epirb', 'sart', 'vhf', 'inmarsat',
                    'navtex', 'generator', 'alternator', 'motor', 'transformer', 'circuit breaker',
                    'insulation', 'megger', 'earth fault', 'avr', 'frequency', 'synchronizing',
                    'preferential trip'],
    cbt:           ['cbt', 'exam', 'test', 'question', 'practice', 'mock', 'quiz', 'marlins',
                    'ces', 'seagull', 'meo', 'oral', 'written paper'],
    meteorology:   ['weather', 'tropical', 'cyclone', 'storm', 'wave', 'tide', 'current',
                    'beaufort', 'barometer', 'isobar', 'routing', 'monsoon'],
    medical:       ['first aid', 'medical', 'injury', 'hypothermia', 'drowning', 'cpr',
                    'defibrillator', 'medicine chest', 'burn', 'fracture', 'shock'],
    certificates:  ['certificate', 'stcw', 'coc', 'cop', 'endorsement', 'flag state', 'manning',
                    'dg shipping', 'mmd', 'rest hours', 'work hours'],
    stability:     ['stability', 'metacentric', 'gm', 'gz', 'righting lever', 'inclining',
                    'free surface', 'loll', 'heel', 'list', 'trim', 'displacement', 'buoyancy',
                    'nam', 'naval architecture', 'hydrostatics'],
    refrigeration: ['refrigeration', 'refrigerant', 'r134a', 'r717', 'ammonia', 'compressor',
                    'condenser', 'evaporator', 'expansion valve', 'cop', 'provision cooling',
                    'reefer'],
    welding:       ['welding', 'mma', 'mig', 'tig', 'arc', 'electrode', 'weld defect',
                    'ndt', 'ultrasonic', 'radiographic', 'dye penetrant', 'magnetic particle'],
    career:        ['salary', 'rank', 'promotion', 'company', 'interview', 'resume', 'career',
                    'shipping company', 'joining']
  };

  /* ═══════════════════════════════════════
     SAFETY-CRITICAL TERMS — trigger disclaimer
     ═══════════════════════════════════════ */
  const SAFETY_TERMS = [
    'emergency', 'fire', 'abandon', 'man overboard', 'mob', 'flooding', 'collision',
    'grounding', 'first aid', 'medical', 'distress', 'mayday', 'sos', 'pan pan',
    'enclosed space', 'death', 'fatal', 'explosion', 'toxic', 'poison', 'rescue',
    'cpr', 'defibrillator', 'hypothermia', 'drowning', 'asphyxiation'
  ];

  /* ═══════════════════════════════════════
     categorizeQuery — detect topic categories
     ═══════════════════════════════════════ */
  function categorizeQuery(query) {
    const q = query.toLowerCase();
    const categories = [];

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      if (keywords.some(function (kw) { return q.indexOf(kw) !== -1; })) {
        categories.push(category);
      }
    }

    return categories.length > 0 ? categories : ['general'];
  }

  /* ═══════════════════════════════════════
     isSafetyCritical — check if query involves safety
     ═══════════════════════════════════════ */
  function isSafetyCritical(query) {
    const q = query.toLowerCase();
    return SAFETY_TERMS.some(function (term) { return q.indexOf(term) !== -1; });
  }

  /* ═══════════════════════════════════════
     getRelevantSources — return matching sources from integrator
     ═══════════════════════════════════════ */
  function getRelevantSources(categories) {
    if (typeof window.sourceIntegrator !== 'undefined' &&
        typeof window.sourceIntegrator.getRelevantSources === 'function') {
      return window.sourceIntegrator.getRelevantSources(categories);
    }
    return [];
  }

  /* ═══════════════════════════════════════
     getRegulationContext — pull structured data for context
     ═══════════════════════════════════════ */
  function getRegulationContext(categories) {
    if (typeof MARITIME_REGS === 'undefined') return '';

    let ctx = '';

    if (categories.indexOf('safety') !== -1 && MARITIME_REGS.solas) {
      const ch3 = MARITIME_REGS.solas.chapters['III'];
      if (ch3 && ch3.keyRegs) {
        ctx += '\n[REGULATION CONTEXT — SOLAS Ch III]\n';
        Object.entries(ch3.keyRegs).forEach(function([reg, data]) {
          if (data.summary) ctx += `Reg ${reg} (${data.title}): ${data.summary}\n`;
        });
      }
    }

    if (categories.indexOf('pollution') !== -1 && MARITIME_REGS.marpol) {
      const a1 = MARITIME_REGS.marpol.annexes.I;
      const a6 = MARITIME_REGS.marpol.annexes.VI;
      if (a1) {
        ctx += '\n[REGULATION CONTEXT — MARPOL Annex I]\n';
        ctx += `Outside Special Area: ${a1.discharge.outsideSpecialArea.machinerySpace}\n`;
        ctx += `Inside Special Area: ${a1.discharge.insideSpecialArea.cargoTanker}\n`;
      }
      if (a6 && a6.sulphur) {
        ctx += '\n[REGULATION CONTEXT — MARPOL Annex VI]\n';
        ctx += `Global sulphur limit: ${a6.sulphur.global.limit} (since ${a6.sulphur.global.effectiveDate})\n`;
        ctx += `ECA sulphur limit: ${a6.sulphur.ECA.limit}\n`;
      }
    }

    if (categories.indexOf('navigation') !== -1 && MARITIME_REGS.colreg) {
      ctx += '\n[REGULATION CONTEXT — COLREG]\n';
      const rules = MARITIME_REGS.colreg.rules;
      // Include most relevant rules as context
      [5, 7, 8, 13, 14, 15, 18, 19].forEach(function(r) {
        if (rules[r]) ctx += `Rule ${r} (${rules[r].title}): ${rules[r].summary}\n`;
      });
    }

    if (categories.indexOf('certificates') !== -1 && MARITIME_REGS.stcw) {
      ctx += '\n[REGULATION CONTEXT — STCW]\n';
      ctx += `Rest hours: ${MARITIME_REGS.stcw.restHours.minimum}\n`;
      ctx += `Max work: ${MARITIME_REGS.stcw.restHours.maximum}\n`;
      ctx += `BAC limit: ${MARITIME_REGS.stcw.restHours.BAC}\n`;
    }

    return ctx;
  }

  /* ═══════════════════════════════════════
     enhanceQuery — add context hints based on categories
     ═══════════════════════════════════════ */
  function enhanceQuery(query) {
    const categories = categorizeQuery(query);
    const sources = getRelevantSources(categories);
    const safetyCritical = isSafetyCritical(query);

    return {
      originalQuery: query,
      categories: categories,
      relevantSources: sources,
      requiresDisclaimer: safetyCritical,
      regulationContext: getRegulationContext(categories)
    };
  }

  /* ═══════════════════════════════════════
     formatSourceCitations — build source citation string
     ═══════════════════════════════════════ */
  function formatSourceCitations(sources) {
    if (!sources || sources.length === 0) return '';

    var topSources = sources
      .sort(function (a, b) { return (b.reliability || 0) - (a.reliability || 0); })
      .slice(0, 4);

    var citation = '\n\n---\n📚 **Knowledge sources**: ';
    citation += topSources.map(function (s) {
      return (s.icon || '📖') + ' ' + s.name;
    }).join(' · ');

    return citation;
  }

  /* ═══════════════════════════════════════
     postProcessResponse — append citations and disclaimers
     ═══════════════════════════════════════ */
  function postProcessResponse(response, queryData) {
    var processed = response;

    // Append source citations
    if (queryData.relevantSources && queryData.relevantSources.length > 0) {
      processed += formatSourceCitations(queryData.relevantSources);
    }

    // Append safety disclaimer
    if (queryData.requiresDisclaimer) {
      processed += '\n\n> ⚠️ **Safety Disclaimer**: This information is for educational purposes. ' +
        'Always follow your vessel\'s specific procedures, SMS, and the Master\'s instructions ' +
        'in actual emergency situations. Verify with official sources.';
    }

    return processed;
  }

  /* ═══════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════ */
  return {
    categorizeQuery: categorizeQuery,
    isSafetyCritical: isSafetyCritical,
    getRelevantSources: getRelevantSources,
    getRegulationContext: getRegulationContext,
    enhanceQuery: enhanceQuery,
    postProcessResponse: postProcessResponse,
    formatSourceCitations: formatSourceCitations
  };

})();

/* Make globally accessible */
if (typeof window !== 'undefined') window.knowledgeEngine = MarineKnowledgeEngine;
