/* MarineIQ — AI SVG Diagram Generator: Generate, cache, zoom, download
   Deps: config.js, ai-engine.js (buildSystemPrompt) */

function getDiagramPrompt(topicId, topicTitle, levelTitle) {
  if (DIAGRAM_PROMPTS[topicId]) return DIAGRAM_PROMPTS[topicId];
  // Generic prompt based on topic title
  return `Technical marine engineering diagram of: "${topicTitle}" for ${levelTitle} level.
Show the main components, connections, and flow paths. Label all parts with real engineering values and specifications. This is for MMD examination study.`;
}

/* ══════════════════════════════════════════════════════════
   3. SVG GENERATION VIA AI API
   ══════════════════════════════════════════════════════════ */
const SVG_CACHE = {}; // sessionStorage-backed cache

function svgCacheKey(topicId) { return `miq_svg_${topicId}`; }

function getSVGFromCache(topicId) {
  if (SVG_CACHE[topicId]) return SVG_CACHE[topicId];
  try {
    const stored = sessionStorage.getItem(svgCacheKey(topicId));
    if (stored) { SVG_CACHE[topicId] = stored; return stored; }
  } catch(e) {}
  return null;
}

function saveSVGToCache(topicId, svg) {
  SVG_CACHE[topicId] = svg;
  try { sessionStorage.setItem(svgCacheKey(topicId), svg); } catch(e) {}
}

function sanitizeSVG(raw) {
  // Extract just the SVG element — remove anything before/after
  raw = raw.trim();
  // Strip markdown fences
  raw = raw.replace(/^```(?:svg|xml)?\s*/i, '').replace(/\s*```$/i, '');
  raw = raw.trim();
  // Find SVG start and end
  const svgStart = raw.indexOf('<svg');
  const svgEnd   = raw.lastIndexOf('</svg>');
  if (svgStart === -1 || svgEnd === -1) return null;
  let svg = raw.slice(svgStart, svgEnd + 6);
  // Remove any <script> tags for safety
  svg = svg.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Remove <foreignObject> elements (can embed arbitrary HTML)
  svg = svg.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '');
  // Remove all event handler attributes (onclick, onload, onerror, etc.)
  svg = svg.replace(/\s+on\w+\s*=\s*["'][^"']*["']/gi, '');
  // Remove javascript: URIs
  svg = svg.replace(/href\s*=\s*["']\s*javascript:[^"']*["']/gi, '');
  // Remove any external URL references (security)
  svg = svg.replace(/xlink:href\s*=\s*["']https?:[^"']+["']/gi, '');
  svg = svg.replace(/href\s*=\s*["']https?:[^"']+["']/gi, '');
  // Ensure viewBox is present
  if (!svg.includes('viewBox')) {
    svg = svg.replace('<svg', '<svg viewBox="0 0 520 340"');
  }
  // Ensure width 100%
  if (!svg.includes('width="100%')) {
    svg = svg.replace(/width="[^"]*"/, 'width="100%"');
  }
  return svg;
}

async function generateAIDiagram(topicId, topicTitle, levelTitle, containerEl) {
  if (!APP.apiKey) {
    containerEl.innerHTML = `<div class="ai-diag-placeholder">
      <div class="adp-icon">🔑</div>
      <div class="adp-text">Set up your API key to generate AI diagrams</div>
      <button class="adp-btn" onclick="openApiModal()">Add API Key</button>
    </div>`;
    return;
  }

  // Show loading state
  containerEl.innerHTML = `<div class="ai-diag-generating">
    <div class="adg-spinner"></div>
    <div class="adg-label">Generating diagram for <strong>${esc(topicTitle)}</strong>…</div>
    <div class="adg-sub">AI is drawing the technical schematic</div>
  </div>`;

  const prompt = getDiagramPrompt(topicId, topicTitle, levelTitle);
  const pid    = detectProvider(APP.apiKey);

  try {
    let rawSVG = '';

    if (pid === 'groq') {
      // Groq: non-streaming for SVG (easier to parse complete output)
      const models = ['llama-3.3-70b-versatile', 'llama3-70b-8192'];
      let success = false;
      for (const model of models) {
        try {
          const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${APP.apiKey}` },
            body: JSON.stringify({
              model, stream: false, temperature: 0.3, max_tokens: 3000,
              messages: [
                { role: 'system', content: SVG_SYSTEM_PROMPT },
                { role: 'user',   content: prompt }
              ]
            })
          });
          const data = await res.json();
          if (!res.ok) { const msg=data.error?.message||`HTTP ${res.status}`; if(res.status===429) continue; throw new Error(msg); }
          rawSVG  = data.choices?.[0]?.message?.content || '';
          success = true;
          break;
        } catch(e) { if(!e.message.includes('429')) throw e; }
      }
      if (!success) throw new Error('Groq rate limit — try again in a moment');

    } else if (pid === 'gemini') {
      const models = ['gemini-1.5-flash', 'gemini-1.5-flash-8b'];
      let success = false;
      for (const model of models) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${APP.apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: SVG_SYSTEM_PROMPT + '\n\nDraw: ' + prompt }] }],
              generationConfig: { maxOutputTokens: 3000, temperature: 0.3 }
            })
          });
          const data = await res.json();
          if (!res.ok) { const msg=data.error?.message||`HTTP ${res.status}`; if(msg.includes('quota')) continue; throw new Error(msg); }
          rawSVG  = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          success = true;
          break;
        } catch(e) { if(e.message.includes('quota')) continue; throw e; }
      }
      if (!success) throw new Error('Gemini quota exceeded — switch to Groq');

    } else if (pid === 'openrouter') {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type':'application/json','Authorization':`Bearer ${APP.apiKey}`,'HTTP-Referer':'https://marineiq.study' },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct:free',
          stream: false, temperature: 0.3, max_tokens: 3000,
          messages: [{ role:'system', content:SVG_SYSTEM_PROMPT },{ role:'user', content:prompt }]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `OpenRouter HTTP ${res.status}`);
      rawSVG = data.choices?.[0]?.message?.content || '';

    } else {
      throw new Error('Unknown provider — please set your API key');
    }

    const svg = sanitizeSVG(rawSVG);
    if (!svg) throw new Error('AI returned invalid SVG — try regenerating');

    saveSVGToCache(topicId, svg);
    renderGeneratedSVG(svg, topicId, topicTitle, containerEl);

  } catch(e) {
    const isQuota = /quota|rate.?limit|429|exceeded/i.test(e.message);
    containerEl.innerHTML = `<div class="ai-diag-error">
      <div class="ade-icon">⚠</div>
      <div class="ade-msg">${esc(e.message)}</div>
      <div class="ade-actions">
        <button class="adp-btn" onclick="generateAIDiagram('${esc(topicId)}','${esc(topicTitle)}','${esc(levelTitle)}',this.closest('.ai-diag-error').parentElement)">🔄 Retry</button>
        ${isQuota ? `<button class="adp-btn adp-btn-alt" onclick="openApiModal()">Switch Provider</button>` : ''}
      </div>
    </div>`;
  }
}

function renderGeneratedSVG(svg, topicId, topicTitle, containerEl) {
  containerEl.innerHTML = `
    <div class="ai-diag-result">
      <div class="ai-diag-svg-wrap" id="aisvg_${topicId}">${svg}</div>
      <div class="ai-diag-footer">
        <span class="ai-diag-label">🤖 AI-Generated Diagram · ${esc(topicTitle)}</span>
        <div class="ai-diag-actions">
          <button class="ai-diag-act" onclick="zoomAIDiagram('${esc(topicId)}')" title="Zoom">⤢ Zoom</button>
          <button class="ai-diag-act" onclick="downloadSVG('${esc(topicId)}','${esc(topicTitle)}')" title="Download SVG">⬇ SVG</button>
          <button class="ai-diag-act ai-diag-regen" onclick="regenDiagram('${esc(topicId)}','${esc(topicTitle)}')" title="Regenerate">↺ Regenerate</button>
        </div>
      </div>
    </div>`;
}

function regenDiagram(topicId, topicTitle) {
  // Clear cache and regenerate
  delete SVG_CACHE[topicId];
  try { sessionStorage.removeItem(svgCacheKey(topicId)); } catch(e) {}
  const lvlTitle = APP.currentLevel?.fullTitle || 'marine engineering';
  const container = document.querySelector(`#aisvg_${topicId}`)?.closest('.ai-diag-wrap');
  if (container) generateAIDiagram(topicId, topicTitle, lvlTitle, container);
}

function zoomAIDiagram(topicId) {
  const svgEl = document.querySelector(`#aisvg_${topicId} svg`);
  if (!svgEl) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out;';
  overlay.innerHTML = `<div style="max-width:900px;width:100%;background:var(--bg1);border-radius:16px;overflow:hidden;border:1px solid var(--b1);">
    <div style="padding:10px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--b0);font-size:0.75rem;color:var(--tx3);">
      <span>AI-Generated Diagram</span>
      <button onclick="this.closest('[style*=fixed]').remove()" style="background:none;border:none;color:var(--tx3);cursor:pointer;font-size:1.1rem;">✕</button>
    </div>
    <div style="padding:16px;">${svgEl.outerHTML}</div>
  </div>`;
  overlay.addEventListener('click', e => { if(e.target===overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function downloadSVG(topicId, topicTitle) {
  const svg = getSVGFromCache(topicId);
  if (!svg) return;
  const blob = new Blob([svg], {type:'image/svg+xml'});
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `marineiq_${topicId}_diagram.svg`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ══════════════════════════════════════════════════════════
   4. INJECT AI DIAGRAM BUTTON INTO DIAGRAM PANEL
   ══════════════════════════════════════════════════════════ */
(function patchLoadDiagrams() {
  const _orig = loadDiagrams;
  loadDiagrams = function(topicId) {
    // Load static diagrams first (existing behaviour)
    _orig(topicId);

    const grid = document.getElementById('diagGrid');
    if (!grid) return;

    const topicTitle = APP.currentTopic ? (document.querySelector('.tz-header .tz-intro-title')?.textContent || topicId) : topicId;

    // Check cache first — show immediately without button
    const cached = getSVGFromCache(topicId);
    if (cached) {
      const wrap = document.createElement('div');
      wrap.className = 'ai-diag-wrap';
      renderGeneratedSVG(cached, topicId, topicTitle, wrap);
      grid.appendChild(wrap);
      return;
    }

    // Add "Generate AI Diagram" card
    const wrap = document.createElement('div');
    wrap.className = 'ai-diag-wrap';
    wrap.innerHTML = `<div class="ai-diag-placeholder">
      <div class="adp-icon">✨</div>
      <div class="adp-title">AI Diagram Generator</div>
      <div class="adp-text">Generate a custom technical diagram for this topic using AI</div>
      <button class="adp-btn" id="genDiagBtn_${topicId}" onclick="
        const lvl='${esc(APP.currentLevel?.fullTitle||'marine engineering')}';
        const title=document.querySelector('#topicZone .tz-header div>div:first-child')?.textContent||'${esc(topicId)}';
        generateAIDiagram('${topicId}',title,lvl,this.closest('.ai-diag-wrap'))
      ">⚡ Generate Diagram</button>
      <div class="adp-note">Uses your free Groq / Gemini API key</div>
    </div>`;
    grid.appendChild(wrap);
  };
})();

/* Also patch selectTopic override to pass correct title to diagram generator */
(function patchSelectTopicForDiag() {
  const _st = selectTopic;
  selectTopic = function(topicId, title, desc, icon, sectionName) {
    _st(topicId, title, desc, icon, sectionName);
    // Re-run loadDiagrams with title context available
    // (title now accessible via closure)
    const wrap = document.querySelector('.ai-diag-wrap');
    const btn  = document.getElementById(`genDiagBtn_${topicId}`);
    if (btn) {
      const lvl = APP.currentLevel?.fullTitle || 'marine engineering';
      btn.onclick = () => generateAIDiagram(topicId, title, lvl, wrap);
    }
  };
})();

/* ══════════════════════════════════════════════════════════
   5. CSS — diagram panel styles
   ══════════════════════════════════════════════════════════ */
(function injectDiagCSS() {
  const s = document.createElement('style');
  s.textContent = `

/* ── AI Diagram Wrapper ── */
.ai-diag-wrap {
  grid-column: 1 / -1; /* full width */
  border-radius: 14px; overflow: hidden;
  border: 1px solid var(--b1);
  background: var(--bg1);
}

/* ── Placeholder (before generation) ── */
.ai-diag-placeholder {
  display: flex; flex-direction: column; align-items: center;
  padding: 28px 20px; text-align: center; gap: 8px;
  background: linear-gradient(135deg, var(--bg1), var(--bg2));
}
.adp-icon  { font-size: 2rem; }
.adp-title { font-size: 0.9rem; font-weight: 700; color: var(--tx); }
.adp-text  { font-size: 0.78rem; color: var(--tx3); max-width: 320px; line-height: 1.5; }
.adp-note  { font-size: 0.65rem; color: var(--tx3); font-family: 'JetBrains Mono', monospace; }
.adp-btn {
  padding: 9px 22px; border-radius: 9px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--ac), var(--acD));
  color: #020810; font-weight: 700; font-size: 0.82rem;
  transition: all 0.15s; margin-top: 4px;
}
.adp-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212,160,23,0.3); }
.adp-btn:active { transform: none; }
.adp-btn-alt {
  background: var(--bg3); color: var(--tx2);
  border: 1px solid var(--b1);
}

/* ── Generating state ── */
.ai-diag-generating {
  display: flex; flex-direction: column; align-items: center;
  padding: 32px 20px; gap: 12px; text-align: center;
}
.adg-spinner {
  width: 36px; height: 36px; border-radius: 50%;
  border: 3px solid var(--b1); border-top-color: var(--ac);
  animation: adgSpin 0.9s linear infinite;
}
@keyframes adgSpin { to { transform: rotate(360deg); } }
.adg-label { font-size: 0.87rem; font-weight: 600; color: var(--tx); }
.adg-sub   { font-size: 0.72rem; color: var(--tx3); }

/* ── Error state ── */
.ai-diag-error {
  display: flex; flex-direction: column; align-items: center;
  padding: 24px 20px; gap: 10px; text-align: center;
}
.ade-icon { font-size: 1.5rem; }
.ade-msg  { font-size: 0.78rem; color: #f87171; max-width: 360px; line-height: 1.5; }
.ade-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 4px; }

/* ── Result ── */
.ai-diag-result { display: flex; flex-direction: column; }
.ai-diag-svg-wrap {
  width: 100%; overflow: hidden;
  background: #030b14; min-height: 200px;
  display: flex; align-items: center; justify-content: center;
}
.ai-diag-svg-wrap svg {
  width: 100% !important; height: auto !important;
  min-height: 200px; max-height: 380px;
  display: block !important;
}
.ai-diag-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; background: var(--bg2);
  border-top: 1px solid var(--b0); flex-wrap: wrap; gap: 8px;
}
.ai-diag-label {
  font-family: 'JetBrains Mono', monospace; font-size: 0.6rem;
  color: var(--tx3); text-transform: uppercase; letter-spacing: 0.07em;
}
.ai-diag-actions { display: flex; gap: 6px; flex-wrap: wrap; }
.ai-diag-act {
  padding: 4px 10px; border-radius: 6px; border: 1px solid var(--b1);
  background: var(--bg3); color: var(--tx3); cursor: pointer;
  font-size: 0.65rem; font-family: 'JetBrains Mono', monospace;
  transition: all 0.12s; white-space: nowrap;
}
.ai-diag-act:hover { border-color: var(--ac); color: var(--acL); }
.ai-diag-regen:hover { border-color: #60a5fa; color: #60a5fa; }

/* ── Mobile ── */
@media (max-width: 768px) {
  .ai-diag-placeholder { padding: 20px 14px; }
  .adp-btn { padding: 10px 20px; min-height: 44px; }
  .ai-diag-svg-wrap svg { max-height: 280px; }
  .ai-diag-footer { padding: 6px 10px; }
  .ai-diag-act { padding: 5px 9px; min-height: 34px; }
}
  `;
  document.head.appendChild(s);
})();

console.log('%cMarineIQ — AI Diagram Generator active. 120+ topic prompts loaded.', 'color:#d4a017;font-weight:bold');




/* ══ QUIZ SYSTEM v2 ══ */
/* ═══════════════════════════════════════════════════════════════════════
   QUIZ SYSTEM v2 — Complete Rebuild
   Fixes: click not working, difficulty levels, question count selector,
          explanations, progress bar, results screen, better AI prompts
   ═══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   1. QUIZ STATE
   ══════════════════════════════════════════════════════════ */
const QUIZ = {
  data:       [],      // array of question objects
  index:      0,       // current question index
  score:      0,       // correct answers
  total:      0,       // questions answered
  wrong:      [],      // wrong answer indices for review
  answered:   false,   // has current Q been answered?
  difficulty: 'mixed', // easy | medium | hard | mixed
  count:      10,      // questions per round: 5 | 10 | 15 | 20
  generating: false,   // lock to prevent double-generate
};

/* ══════════════════════════════════════════════════════════
   2. DIFFICULTY-AWARE PROMPT BUILDER
   ══════════════════════════════════════════════════════════ */
