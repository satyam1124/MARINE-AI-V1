/* MarineIQ — Source Integrator: Maritime knowledge source registry with reliability ratings
   Provides source panel UI rendering and category-based source lookup
   Deps: config.js (APP state)
   ═══════════════════════════════════════════════════════════════════════ */

const MarineSourceIntegrator = (function () {

  /* ═══════════════════════════════════════
     SOURCE REGISTRY
     ═══════════════════════════════════════ */
  const SOURCES = [
    // ── OFFICIAL / REGULATORY ──
    {
      id: 'imo-official', name: 'IMO Conventions', icon: '🏛️',
      type: 'official', reliability: 1.0,
      url: 'https://www.imo.org',
      covers: ['SOLAS', 'MARPOL', 'STCW', 'COLREG', 'ISM', 'ISPS', 'MLC', 'BWM Convention'],
      description: 'International Maritime Organization — official conventions, resolutions and circulars'
    },
    {
      id: 'dg-shipping', name: 'DG Shipping India', icon: '🇮🇳',
      type: 'official', reliability: 1.0,
      url: 'https://www.dgshipping.gov.in',
      covers: ['MEO exams', 'CDC', 'COC endorsement', 'Indian flag state', 'circulars'],
      description: 'Directorate General of Shipping — Indian maritime authority'
    },

    // ── CLASSIFICATION SOCIETIES ──
    {
      id: 'dnv', name: 'DNV Maritime', icon: '🔍',
      type: 'classification', reliability: 0.95,
      url: 'https://www.dnv.com/maritime',
      covers: ['class rules', 'type approval', 'advisory', 'digital class', 'surveys'],
      description: 'Norwegian classification society — rules, guidelines, advisory'
    },
    {
      id: 'lloyds-register', name: "Lloyd's Register", icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      type: 'classification', reliability: 0.95,
      url: 'https://www.lr.org',
      covers: ['classification rules', 'ship data', 'safety compliance', 'type approval'],
      description: 'UK-based classification society — oldest maritime classification'
    },
    {
      id: 'indian-register', name: 'Indian Register of Shipping', icon: '🇮🇳',
      type: 'classification', reliability: 0.90,
      url: 'https://www.irclass.org',
      covers: ['IRS class rules', 'Indian flag', 'statutory surveys'],
      description: 'Indian classification society — IACS member'
    },

    // ── EDUCATIONAL ──
    {
      id: 'marine-insight', name: 'Marine Insight', icon: '📰',
      type: 'educational', reliability: 0.85,
      url: 'https://www.marineinsight.com',
      covers: ['general maritime', 'technical articles', 'career guidance', 'regulations explained'],
      description: 'Comprehensive maritime educational articles and guides'
    },
    {
      id: 'maritime-page', name: 'The Maritime Page', icon: '📖',
      type: 'educational', reliability: 0.80,
      url: 'https://themaritimepage.com',
      covers: ['maritime education', 'exam preparation', 'career guidance'],
      description: 'Maritime educational content and exam resources'
    },
    {
      id: 'myseatime', name: 'MySeatime', icon: '⏱️',
      type: 'educational', reliability: 0.80,
      url: 'https://www.myseatime.com',
      covers: ['career guidance', 'exam preparation', 'sea time tracking', 'merchant navy life'],
      description: 'Indian maritime career guidance and exam prep'
    },
    {
      id: 'brighthub', name: 'Bright Hub Engineering', icon: '🔧',
      type: 'educational', reliability: 0.75,
      url: 'https://www.brighthubengineering.com',
      covers: ['marine engines', 'machinery', 'technical explanations'],
      description: 'Engineering articles covering marine machinery and systems'
    },

    // ── REFERENCE TEXTBOOKS ──
    {
      id: 'reeds-series', name: "Reed's Marine Engineering", icon: '📕',
      type: 'textbook', reliability: 0.95,
      covers: ['thermodynamics', 'mechanics', 'electrotechnology', 'motor engineering', 'general engineering'],
      description: "Reed's Marine Engineering Series Volumes 1-12 — standard MMD exam reference"
    },
    {
      id: 'pounders', name: "Pounder's Marine Diesel Engines", icon: '📗',
      type: 'textbook', reliability: 0.95,
      covers: ['2-stroke engines', '4-stroke engines', 'turbocharging', 'fuel systems', 'engine design'],
      description: "Pounder's Marine Diesel Engines and Gas Turbines (9th Ed) — Woodyard"
    },
    {
      id: 'dj-eyres', name: 'Ship Construction (D.J. Eyres)', icon: '📘',
      type: 'textbook', reliability: 0.90,
      covers: ['ship construction', 'stability', 'naval architecture', 'hull design'],
      description: 'Ship Construction — Eyres — standard naval architecture reference'
    },

    // ── CBT PREPARATION ──
    {
      id: 'marlins-test', name: 'Marlins English Test', icon: '🎯',
      type: 'cbt-prep', reliability: 0.90,
      url: 'https://www.marlins.co.uk',
      covers: ['Marlins English Test', 'online assessment', 'maritime English'],
      description: 'Industry-standard maritime English proficiency test'
    },
    {
      id: 'seagull-cbt', name: 'Seagull Maritime CBT', icon: '🦅',
      type: 'cbt-prep', reliability: 0.90,
      url: 'https://www.seagull.no',
      covers: ['CES tests', 'competency assessment', 'maritime CBT'],
      description: 'Computer-based competency testing for maritime professionals'
    },
    {
      id: 'ocean-learning', name: 'Ocean Learning Platform', icon: '🌊',
      type: 'cbt-prep', reliability: 0.85,
      url: 'https://www.oceanlearningplatform.com',
      covers: ['STCW courses', 'online maritime training', 'e-learning'],
      description: 'Online maritime training and STCW courses'
    },

    // ── P&I AND INSURANCE ──
    {
      id: 'gard-pi', name: 'Gard P&I Club', icon: '🛡️',
      type: 'insurance', reliability: 0.90,
      url: 'https://www.gard.no',
      covers: ['loss prevention', 'claims', 'safety circulars', 'crew matters'],
      description: 'P&I club — loss prevention bulletins and safety guidance'
    },
    {
      id: 'skuld', name: 'Skuld P&I', icon: '🛡️',
      type: 'insurance', reliability: 0.90,
      url: 'https://www.skuld.com',
      covers: ['insight articles', 'loss prevention', 'cargo claims'],
      description: 'P&I club — insight articles and loss prevention'
    },

    // ── INDUSTRY ORGANIZATIONS ──
    {
      id: 'bimco', name: 'BIMCO', icon: '🚢',
      type: 'industry', reliability: 0.95,
      url: 'https://www.bimco.org',
      covers: ['charter parties', 'contracts', 'shipping regulations', 'market analysis'],
      description: 'Largest international shipping association — contracts, forms, clauses'
    },

    // ── VIDEO RESOURCES ──
    {
      id: 'youtube-maritime', name: 'Maritime YouTube', icon: '🎥',
      type: 'video', reliability: 0.70,
      covers: ['visual learning', 'engine operations', 'accident analysis', 'tutorials'],
      description: 'Chief MAKOi, MarineGyaan, Casualty Corner, Engineering Mindset'
    },

    // ── COMMUNITIES ──
    {
      id: 'gcaptain', name: 'gCaptain', icon: '💬',
      type: 'community', reliability: 0.60,
      url: 'https://gcaptain.com',
      covers: ['maritime news', 'forum discussions', 'industry opinions'],
      description: 'Maritime news and professional forums'
    }
  ];

  /* ═══════════════════════════════════════
     Lookup methods
     ═══════════════════════════════════════ */
  function getAllSources() {
    return SOURCES.slice(); // Return a copy
  }

  function getSourcesByType(type) {
    return SOURCES.filter(function (s) { return s.type === type; });
  }

  function getRelevantSources(categories) {
    return SOURCES.filter(function (source) {
      if (!source.covers) return false;
      return categories.some(function (cat) {
        return source.covers.some(function (cover) {
          return cover.toLowerCase().indexOf(cat.toLowerCase()) !== -1;
        });
      });
    }).sort(function (a, b) { return b.reliability - a.reliability; });
  }

  function getSourceCount() {
    return SOURCES.length;
  }

  /* ═══════════════════════════════════════
     UI: Render knowledge source panel
     ═══════════════════════════════════════ */
  const TYPE_LABELS = {
    official:       '🏛️ Official / Regulatory',
    classification: '🔍 Classification Societies',
    educational:    '📖 Educational',
    textbook:       '📚 Reference Textbooks',
    'cbt-prep':     '📝 CBT Preparation',
    insurance:      '🛡️ P&I Clubs',
    industry:       '🚢 Industry Organizations',
    video:          '🎥 Video Resources',
    community:      '💬 Communities & Forums'
  };

  function renderSourcePanel() {
    var panelContent = document.getElementById('knowledgeSourceList');
    if (!panelContent) return;

    // Group by type
    var grouped = {};
    SOURCES.forEach(function (s) {
      if (!grouped[s.type]) grouped[s.type] = [];
      grouped[s.type].push(s);
    });

    var html = '';
    Object.entries(grouped).forEach(function (entry) {
      var type = entry[0];
      var sources = entry[1];
      var label = TYPE_LABELS[type] || type;

      html += '<div class="ks-group">';
      html += '<div class="ks-group-title">' + label + '</div>';

      sources.forEach(function (s) {
        var stars = Math.round(s.reliability * 5);
        var starsHtml = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
        var urlHtml = s.url
          ? '<a href="' + s.url + '" target="_blank" rel="noopener" class="ks-link">↗</a>'
          : '';

        html += '<div class="ks-item">';
        html += '  <span class="ks-icon">' + s.icon + '</span>';
        html += '  <div class="ks-info">';
        html += '    <div class="ks-name">' + s.name + ' ' + urlHtml + '</div>';
        html += '    <div class="ks-desc">' + (s.description || '') + '</div>';
        html += '    <div class="ks-reliability">' + starsHtml + '</div>';
        html += '  </div>';
        html += '</div>';
      });

      html += '</div>';
    });

    panelContent.innerHTML = html;
  }

  /* ═══════════════════════════════════════
     UI: Toggle panel
     ═══════════════════════════════════════ */
  function togglePanel() {
    var panel = document.getElementById('knowledgeSourcePanel');
    if (!panel) return;
    var isOpen = panel.classList.contains('open');
    if (!isOpen) {
      renderSourcePanel();
    }
    panel.classList.toggle('open');
  }

  function closePanel() {
    var panel = document.getElementById('knowledgeSourcePanel');
    if (panel) panel.classList.remove('open');
  }

  /* ═══════════════════════════════════════
     PUBLIC API
     ═══════════════════════════════════════ */
  return {
    getAllSources: getAllSources,
    getSourcesByType: getSourcesByType,
    getRelevantSources: getRelevantSources,
    getSourceCount: getSourceCount,
    renderSourcePanel: renderSourcePanel,
    togglePanel: togglePanel,
    closePanel: closePanel
  };

})();

/* Make globally accessible */
if (typeof window !== 'undefined') window.sourceIntegrator = MarineSourceIntegrator;
