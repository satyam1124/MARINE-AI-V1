/* MarineIQ — Dynamic AI Topic Content Generator
   Auto-generates formulas, flashcards & video searches for empty topics
   Deps: config.js (APP, APP.apiKey), ai-providers.js, topic-panel.js */

/* ══════════════════════════════════════════════════════════
   1. CONSTANTS & CACHE
   ══════════════════════════════════════════════════════════ */
const DYN_CACHE_PREFIX = 'miq_dyntopic_';
const DYN_GENERATION_LOCK = {};

/* ══════════════════════════════════════════════════════════
   2. AI PROMPT — generates structured JSON content
   ══════════════════════════════════════════════════════════ */
function buildTopicGenPrompt(topicTitle, levelTitle, topicDesc) {
  return `You are a marine engineering education content generator. Generate study material for the topic "${topicTitle}" at the "${levelTitle}" level.

CONTEXT: ${topicDesc || topicTitle}

OUTPUT FORMAT — Return ONLY valid JSON, no explanation, no markdown fences:
{
  "formulas": [
    { "label": "Formula Name", "eq": "equation string with symbols", "note": "Source: textbook reference. Typical values and context." }
  ],
  "flashcards": [
    { "q": "Detailed exam-style question", "a": "Comprehensive answer with values, sources, and marine context (150-300 words)" }
  ],
  "videoSearches": [
    { "title": "Descriptive video title", "channel": "Expected channel name" }
  ]
}

REQUIREMENTS:
- Generate exactly 4-6 formulas with real engineering values and textbook sources (Reed's, Pounder's, MAN B&W, IMO)
- Generate exactly 5-8 flashcards with MMD oral exam-level Q&A. Answers must be detailed (150-300 words each) citing specific standards, regulations, or textbooks. Write answers as if a Chief Engineer is explaining to a cadet.
- Generate exactly 3-4 video search suggestions relevant to the topic
- Use actual marine engineering values, pressures, temperatures, dimensions
- Reference real standards: SOLAS, MARPOL, STCW, IMO resolutions, class society rules
- All equations should use standard engineering notation
- Flashcard questions should cover: theory, working principle, safety, maintenance, troubleshooting, and regulations

Return ONLY the JSON object. First character must be { and last must be }`;
}

/* ══════════════════════════════════════════════════════════
   3. CACHE OPERATIONS
   ══════════════════════════════════════════════════════════ */
function getDynCache(topicId) {
  try {
    var raw = localStorage.getItem(DYN_CACHE_PREFIX + topicId);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function setDynCache(topicId, data) {
  try {
    data._ts = Date.now();
    localStorage.setItem(DYN_CACHE_PREFIX + topicId, JSON.stringify(data));
  } catch (e) {}
}

/* ══════════════════════════════════════════════════════════
   4. CHECK IF TOPIC HAS CONTENT
   ══════════════════════════════════════════════════════════ */
function topicHasContent(topicId) {
  var kb = (typeof TOPIC_KNOWLEDGE !== 'undefined') ? TOPIC_KNOWLEDGE[topicId] : null;
  if (!kb) return false;
  var hasFormulas = kb.formulas && kb.formulas.length > 0;
  var hasFlash = kb.flashcards && kb.flashcards.length > 0;
  var hasVids = kb.videos && kb.videos.length > 0;
  return hasFormulas || hasFlash || hasVids;
}

/* ══════════════════════════════════════════════════════════
   5. SHIMMER / LOADING UI
   ══════════════════════════════════════════════════════════ */
function showTopicShimmer() {
  // Formula shimmer
  var fGrid = document.getElementById('formulaGrid');
  if (fGrid) {
    fGrid.innerHTML =
      '<div class="dyn-shimmer-wrap">' +
        '<div class="dyn-shimmer-badge">⚡ GENERATING WITH AI</div>' +
        '<div class="dyn-shimmer-card"></div>' +
        '<div class="dyn-shimmer-card" style="animation-delay:0.15s"></div>' +
        '<div class="dyn-shimmer-card" style="animation-delay:0.3s"></div>' +
      '</div>';
  }
  // Flashcard shimmer
  var fcWrap = document.getElementById('flashcardArea');
  if (fcWrap) {
    fcWrap.innerHTML =
      '<div class="dyn-shimmer-wrap">' +
        '<div class="dyn-shimmer-badge">⚡ GENERATING WITH AI</div>' +
        '<div class="dyn-shimmer-card dyn-shimmer-lg"></div>' +
      '</div>';
  }
  // Video shimmer
  var vGrid = document.getElementById('videoGrid');
  if (vGrid) {
    vGrid.innerHTML =
      '<div class="dyn-shimmer-wrap">' +
        '<div class="dyn-shimmer-badge">⚡ GENERATING WITH AI</div>' +
        '<div class="dyn-shimmer-card dyn-shimmer-vid"></div>' +
        '<div class="dyn-shimmer-card dyn-shimmer-vid" style="animation-delay:0.15s"></div>' +
      '</div>';
  }

  // Make all tabs visible during generation
  document.querySelectorAll('.mm-tab').forEach(function(tab) {
    tab.style.display = '';
  });
}

/* ══════════════════════════════════════════════════════════
   6. RENDER GENERATED CONTENT
   ══════════════════════════════════════════════════════════ */
function applyGeneratedContent(topicId, data) {
  // Inject into TOPIC_KNOWLEDGE
  if (typeof TOPIC_KNOWLEDGE !== 'undefined') {
    if (!TOPIC_KNOWLEDGE[topicId]) TOPIC_KNOWLEDGE[topicId] = {};
    if (data.formulas) TOPIC_KNOWLEDGE[topicId].formulas = data.formulas;
    if (data.flashcards) TOPIC_KNOWLEDGE[topicId].flashcards = data.flashcards;
    if (data.videoSearches) {
      // Convert video searches to YouTube search URLs
      TOPIC_KNOWLEDGE[topicId].videos = data.videoSearches.map(function(v) {
        return {
          title: v.title,
          ch: v.channel || 'YouTube',
          url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(v.title + ' marine engineering')
        };
      });
    }
  }

  // Re-render tabs
  var kb = TOPIC_KNOWLEDGE[topicId] || {};
  if (typeof loadFormulas === 'function') loadFormulas(kb.formulas || []);
  if (typeof loadFlashcards === 'function') loadFlashcards(kb.flashcards || []);

  // Custom video render for search-based videos
  var vGrid = document.getElementById('videoGrid');
  if (vGrid && kb.videos && kb.videos.length > 0) {
    vGrid.innerHTML = kb.videos.map(function(v) {
      return '<a class="yt-card" href="' + (v.url || '#') + '" target="_blank" rel="noopener noreferrer">' +
        '<div class="yt-thumb">' +
          '<div class="yt-fallback-thumb">🔍</div>' +
          '<div class="yt-overlay"><div class="yt-play">▶</div></div>' +
        '</div>' +
        '<div class="yt-info">' +
          '<div class="yt-title">' + (typeof esc === 'function' ? esc(v.title) : v.title) + '</div>' +
          '<div class="yt-channel">📺 ' + (typeof esc === 'function' ? esc(v.ch) : v.ch) + '</div>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  // Add AI-generated badges to tabs
  document.querySelectorAll('.mm-tab').forEach(function(tab) {
    var panel = tab.getAttribute('data-panel');
    if (panel === 'formulas' || panel === 'flashcards' || panel === 'videos') {
      if (!tab.querySelector('.dyn-badge')) {
        var badge = document.createElement('span');
        badge.className = 'dyn-badge';
        badge.textContent = '⚡';
        badge.title = 'AI-Generated content';
        tab.appendChild(badge);
      }
    }
    tab.style.display = '';
  });

  // Add regenerate button
  var fGrid = document.getElementById('formulaGrid');
  if (fGrid && !fGrid.querySelector('.dyn-regen-btn')) {
    var regenWrap = document.createElement('div');
    regenWrap.style.cssText = 'grid-column:1/-1;text-align:center;padding:8px 0;';
    regenWrap.innerHTML = '<button class="dyn-regen-btn" onclick="regenTopicContent(\'' + topicId.replace(/'/g, "\\'") + '\')" style="' +
      'padding:6px 14px;border-radius:8px;border:1px solid rgba(212,160,23,0.25);' +
      'background:transparent;color:#d4a017;cursor:pointer;font-size:0.6rem;' +
      'font-family:JetBrains Mono,monospace;">🔄 Regenerate with AI</button>';
    fGrid.appendChild(regenWrap);
  }
}

// Regenerate function — clears cache and re-runs
window.regenTopicContent = function(topicId) {
  // Clear cache
  try { localStorage.removeItem(DYN_CACHE_PREFIX + topicId); } catch(e) {}
  delete DYN_GENERATION_LOCK[topicId];
  // Find topic info from the current view
  var title = document.querySelector('.tz-intro-title')?.textContent || topicId;
  var levelTitle = APP.currentLevel ? (APP.currentLevel.fullTitle || APP.currentLevel.title || '') : '';
  var desc = document.querySelector('.tz-intro-desc')?.textContent || '';
  generateTopicContent(topicId, title, levelTitle, desc);
};

/* ══════════════════════════════════════════════════════════
   7. AI GENERATION — calls Groq/Gemini
   ══════════════════════════════════════════════════════════ */
async function generateTopicContent(topicId, topicTitle, levelTitle, topicDesc) {
  // Prevent double generation
  if (DYN_GENERATION_LOCK[topicId]) return;
  DYN_GENERATION_LOCK[topicId] = true;

  // Check cache first
  var cached = getDynCache(topicId);
  if (cached) {
    applyGeneratedContent(topicId, cached);
    DYN_GENERATION_LOCK[topicId] = false;
    return;
  }

  // Need API key
  if (!APP.apiKey) {
    showManualGenerateButton(topicId, topicTitle, levelTitle, topicDesc);
    DYN_GENERATION_LOCK[topicId] = false;
    return;
  }

  showTopicShimmer();

  var prompt = buildTopicGenPrompt(topicTitle, levelTitle, topicDesc);
  var fullText = '';

  try {
    // Try Groq first (fastest)
    var provider = APP.provider || 'gemini';
    var apiKey = APP.apiKey;

    if (provider === 'groq' || APP.groqKey) {
      var groqKey = APP.groqKey || apiKey;
      var res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + groqKey },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 3000,
          temperature: 0.3
        })
      });
      if (res.ok) {
        var j = await res.json();
        fullText = j.choices?.[0]?.message?.content || '';
      }
    }

    // Fallback to Gemini
    if (!fullText && apiKey) {
      var model = 'gemini-1.5-flash';
      var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
      var res2 = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 3000, temperature: 0.3 }
        })
      });
      if (res2.ok) {
        var j2 = await res2.json();
        fullText = j2.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }
    }

    if (!fullText) throw new Error('No response from AI');

    // Parse JSON from response
    var data = parseAIJson(fullText);
    if (!data || (!data.formulas && !data.flashcards)) {
      throw new Error('Invalid AI response format');
    }

    // Cache and apply
    setDynCache(topicId, data);
    applyGeneratedContent(topicId, data);

  } catch (e) {
    console.warn('Dynamic topic generation failed:', e.message);
    showManualGenerateButton(topicId, topicTitle, levelTitle, topicDesc);
  }

  DYN_GENERATION_LOCK[topicId] = false;
}

/* ══════════════════════════════════════════════════════════
   8. JSON PARSER — robust extraction from AI output
   ══════════════════════════════════════════════════════════ */
function parseAIJson(text) {
  text = text.trim();
  // Strip markdown fences
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  // Find JSON object
  var start = text.indexOf('{');
  var end = text.lastIndexOf('}');
  if (start === -1 || end === -1) return null;
  var jsonStr = text.slice(start, end + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // Try fixing common issues
    try {
      jsonStr = jsonStr.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
      return JSON.parse(jsonStr);
    } catch (e2) {
      return null;
    }
  }
}

/* ══════════════════════════════════════════════════════════
   9. MANUAL GENERATE BUTTON — fallback when no API key
   ══════════════════════════════════════════════════════════ */
function showManualGenerateButton(topicId, topicTitle, levelTitle, topicDesc) {
  var panels = ['formulaGrid', 'flashcardArea', 'videoGrid'];
  panels.forEach(function(id) {
    var el = document.getElementById(id);
    if (el && (!el.children.length || el.querySelector('.dyn-shimmer-wrap'))) {
      el.innerHTML =
        '<div class="dyn-gen-prompt">' +
          '<div class="dyn-gen-icon">⚡</div>' +
          '<div class="dyn-gen-text">No pre-written content for this topic</div>' +
          '<button class="dyn-gen-btn" onclick="onManualGenerate(\'' +
            topicId.replace(/'/g, "\\'") + '\',\'' +
            (topicTitle || '').replace(/'/g, "\\'") + '\',\'' +
            (levelTitle || '').replace(/'/g, "\\'") + '\',\'' +
            (topicDesc || '').replace(/'/g, "\\'") + '\')">' +
            (APP.apiKey ? '⚡ Generate with AI' : '🔑 Set API Key to Generate') +
          '</button>' +
        '</div>';
    }
  });
}

function onManualGenerate(topicId, topicTitle, levelTitle, topicDesc) {
  if (!APP.apiKey) {
    if (typeof openApiModal === 'function') openApiModal();
    return;
  }
  generateTopicContent(topicId, topicTitle, levelTitle, topicDesc);
}

/* ══════════════════════════════════════════════════════════
   10. SEARCH BAR → DYNAMIC GENERATION BRIDGE
   ══════════════════════════════════════════════════════════ */
window.generateSearchTopic = function(query) {
  // Close search overlay
  if (typeof closeGlobalSearch === 'function') closeGlobalSearch();

  // Create a synthetic topic ID
  var topicId = 'dyn_' + query.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').slice(0, 30);

  // Navigate to an appropriate level if one isn't selected
  var levelTitle = '';
  if (APP.currentLevel) {
    levelTitle = APP.currentLevel.fullTitle || APP.currentLevel.title || '';
  } else {
    // Default to MEO Class IV context
    levelTitle = 'MEO Class IV';
    if (typeof enterLevel === 'function') enterLevel('cl4');
  }

  // Show the topic view
  if (typeof selectTopic === 'function') {
    selectTopic(topicId, query, 'AI-generated study material for: ' + query, '⚡', 'AI Generated');
  }

  // Trigger generation (small delay to let UI render)
  setTimeout(function() {
    generateTopicContent(topicId, query, levelTitle, query);
  }, 400);
};

/* ══════════════════════════════════════════════════════════
   11. PATCH selectTopic — trigger generation for empty topics
   ══════════════════════════════════════════════════════════ */
(function patchSelectTopicForDynamic() {
  var _orig = selectTopic;
  selectTopic = function(topicId, title, desc, icon, sectionName) {
    _orig(topicId, title, desc, icon, sectionName);

    // Check if this topic has real content
    if (!topicHasContent(topicId)) {
      var levelTitle = APP.currentLevel ? (APP.currentLevel.fullTitle || APP.currentLevel.title || '') : '';

      // Check localStorage cache first (instant)
      var cached = getDynCache(topicId);
      if (cached) {
        applyGeneratedContent(topicId, cached);
        return;
      }

      // Auto-generate if API key available
      if (APP.apiKey) {
        generateTopicContent(topicId, title, levelTitle, desc);
      } else {
        showManualGenerateButton(topicId, title, levelTitle, desc);
      }
    }
  };
})();

/* ══════════════════════════════════════════════════════════
   11. CSS — shimmer, badges, generate button
   ══════════════════════════════════════════════════════════ */
(function injectDynCSS() {
  var s = document.createElement('style');
  s.id = 'dyn-topics-css';
  s.textContent = '\
/* ── Shimmer loading ── */\
.dyn-shimmer-wrap { padding: 16px; }\
.dyn-shimmer-badge {\
  font-family: "JetBrains Mono", monospace; font-size: 0.6rem;\
  color: #d4a017; text-transform: uppercase; letter-spacing: 0.1em;\
  margin-bottom: 12px; display: flex; align-items: center; gap: 6px;\
}\
.dyn-shimmer-card {\
  height: 60px; border-radius: 10px; margin-bottom: 10px;\
  background: linear-gradient(90deg, var(--bg2) 25%, var(--bg3) 50%, var(--bg2) 75%);\
  background-size: 200% 100%;\
  animation: dynShimmer 1.5s ease infinite;\
}\
.dyn-shimmer-lg { height: 120px; }\
.dyn-shimmer-vid { height: 80px; }\
@keyframes dynShimmer {\
  0% { background-position: 200% 0; }\
  100% { background-position: -200% 0; }\
}\
/* ── AI badge on tabs ── */\
.dyn-badge {\
  font-size: 0.5rem; margin-left: 4px;\
  vertical-align: super; opacity: 0.7;\
}\
/* ── Manual generate button ── */\
.dyn-gen-prompt {\
  display: flex; flex-direction: column; align-items: center;\
  padding: 32px 16px; gap: 10px;\
}\
.dyn-gen-icon { font-size: 2rem; opacity: 0.5; }\
.dyn-gen-text {\
  font-size: 0.78rem; color: var(--tx3);\
  text-align: center;\
}\
.dyn-gen-btn {\
  padding: 10px 20px; border-radius: 10px;\
  border: 1px solid rgba(212,160,23,0.4);\
  background: rgba(212,160,23,0.08);\
  color: #d4a017; cursor: pointer;\
  font-family: "JetBrains Mono", monospace;\
  font-size: 0.72rem; font-weight: 600;\
  transition: all 0.15s;\
}\
.dyn-gen-btn:hover {\
  background: rgba(212,160,23,0.15);\
  border-color: #d4a017;\
  transform: translateY(-1px);\
}\
  ';
  document.head.appendChild(s);
})();

console.log('%cMarineIQ — Dynamic AI Topics: active', 'color:#d4a017;font-weight:bold');
