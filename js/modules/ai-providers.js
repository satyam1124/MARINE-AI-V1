/* MarineIQ — Multi-Provider AI Engine (Gemini, Groq, OpenRouter, Anthropic)
   Free-tier providers with auto-fallback
   Deps: config.js, utils.js */


/* ═══════════════════════════════════════════════════════════════════════
   FREE AI ENGINE — Multi-Provider (Gemini / Groq / OpenRouter / Anthropic)
   ═══════════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════════
   FREE AI ENGINE — Multi-Provider with Auto-Fallback
   Priority: Google Gemini → Groq → OpenRouter → Anthropic
   All providers have free tiers requiring NO credit card
   ═══════════════════════════════════════════════════════════════════════ */

/* ── PROVIDER REGISTRY ── */
const AI_PROVIDERS = {
  gemini: {
    name:     'Google Gemini',
    label:    'GEMINI',
    badge:    '#4285f4',
    keyHint:  'AIza…',
    keyTest:  k => k.startsWith('AIza'),
    getKey:   'https://aistudio.google.com',
    models: {
      fast: 'gemini-1.5-flash',
      bal:  'gemini-1.5-flash',
      deep: 'gemini-1.5-pro',
      live: 'gemini-1.5-flash'
    },
    free: '15 req/min · 1,500 req/day · 1M tokens/day · Free',
    call: callGemini
  },
  groq: {
    name:     'Groq (Llama)',
    label:    'GROQ',
    badge:    '#f55036',
    keyHint:  'gsk_…',
    keyTest:  k => k.startsWith('gsk_'),
    getKey:   'https://console.groq.com',
    models: {
      fast: 'llama-3.1-8b-instant',
      bal:  'llama-3.3-70b-versatile',
      deep: 'llama-3.3-70b-versatile',
      live: 'llama-3.3-70b-versatile'
    },
    modelFallbacks: ['llama-3.3-70b-versatile','llama-3.1-70b-versatile','llama3-70b-8192','llama3-8b-8192'],
    free: 'Truly free · No quota issues · No credit card · ~14,400 req/day',
    call: callGroq
  },
  openrouter: {
    name:     'OpenRouter',
    label:    'OR-FREE',
    badge:    '#7c3aed',
    keyHint:  'sk-or-…',
    keyTest:  k => k.startsWith('sk-or-'),
    getKey:   'https://openrouter.ai',
    models: {
      fast: 'meta-llama/llama-3.2-3b-instruct:free',
      bal:  'meta-llama/llama-3.1-8b-instruct:free',
      deep: 'google/gemma-3-12b-it:free',
      live: 'meta-llama/llama-3.1-8b-instruct:free'
    },
    free: 'Free models always available · No credit card',
    call: callOpenRouter
  },
  anthropic: {
    name:     'Anthropic Claude',
    label:    'CLAUDE',
    badge:    '#d97706',
    keyHint:  'sk-ant-…',
    keyTest:  k => k.startsWith('sk-ant-') || k.startsWith('sk-'),
    getKey:   'https://console.anthropic.com',
    models: {
      fast: 'claude-haiku-4-5-20251001',
      bal:  'claude-sonnet-4-20250514',
      deep: 'claude-sonnet-4-20250514',
      live: 'claude-sonnet-4-20250514'
    },
    free: 'Paid — needs credits at console.anthropic.com',
    call: callAnthropic
  }
};

/* Detect provider from key */
function detectProvider(key) {
  if (!key) return null;
  for (const [id, p] of Object.entries(AI_PROVIDERS)) {
    if (p.keyTest(key)) return id;
  }
  // Default to gemini if key looks generic
  return 'gemini';
}

/* Current active provider */
function getProvider() {
  const pid = detectProvider(APP.apiKey);
  return pid ? AI_PROVIDERS[pid] : null;
}

/* ═══════════════════════════════════════════════════════════════════════
   PROVIDER CALL FUNCTIONS
   ═══════════════════════════════════════════════════════════════════════ */

/* ── GOOGLE GEMINI ── */
async function callGemini(q, mode, systemPrompt, onChunk, onDone, onError) {
  const provider = AI_PROVIDERS.gemini;
  const model    = provider.models[mode] || provider.models.bal;
  const maxOut   = { fast: 800, bal: 1600, deep: 3500, live: 1600 }[mode] || 1600;
  const url      = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${APP.apiKey}`;
  const body = {
    contents: [{ role: 'user', parts: [{ text: systemPrompt + '\n\n---\n\n' + q }] }],
    generationConfig: {
      maxOutputTokens: maxOut,
      temperature:     mode === 'deep' ? 0.3 : 0.5,
    }
  };

  if (APP._ragFromPDF || APP._refBookSource) {
    body.generationConfig.temperature = 0;
  }

  try {
    const res = await fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.error?.message || `HTTP ${res.status}`;
      if (msg.includes('API_KEY_INVALID') || res.status === 400) {
        throw new Error('Invalid Gemini API key. Get a free key at aistudio.google.com');
      }
      throw new Error(`Gemini: ${msg}`);
    }

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let   buf     = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const raw = line.slice(5).trim();
        if (raw === '[DONE]') break;
        try {
          const j    = JSON.parse(raw);
          const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (text) onChunk(text);
        } catch {}
      }
    }
    onDone();
  } catch (e) {
    onError(e);
  }
}

/* ── GROQ (OpenAI-compatible) ── */
async function callGroq(q, mode, systemPrompt, onChunk, onDone, onError) {
  const provider = AI_PROVIDERS.groq;
  const model    = provider.models[mode] || provider.models.bal;
  const maxOut   = { fast: 800, bal: 1600, deep: 3500, live: 1600 }[mode] || 1600;
  const body = {
    model,
    max_tokens: maxOut,
    stream:     true,
    temperature: mode === 'deep' ? 0.3 : 0.6,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: q }
    ]
  };

  if (APP._ragFromPDF || APP._refBookSource) {
    body.temperature = 0;
  }

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${APP.apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.error?.message || `HTTP ${res.status}`;
      if (res.status === 401) throw new Error('Invalid Groq API key. Get free key at console.groq.com');
      if (res.status === 429) throw new Error('Groq rate limit — wait 60 seconds and try again');
      throw new Error(`Groq: ${msg}`);
    }

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let   buf     = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const raw = line.slice(5).trim();
        if (raw === '[DONE]') { onDone(); return; }
        try {
          const j    = JSON.parse(raw);
          const text = j.choices?.[0]?.delta?.content || '';
          if (text) onChunk(text);
        } catch {}
      }
    }
    onDone();
  } catch (e) {
    onError(e);
  }
}

/* ── OPENROUTER ── */
async function callOpenRouter(q, mode, systemPrompt, onChunk, onDone, onError) {
  const provider = AI_PROVIDERS.openrouter;
  const model    = provider.models[mode] || provider.models.bal;
  const maxOut   = { fast: 600, bal: 1400, deep: 2500, live: 1400 }[mode] || 1400;
  const body = {
    model,
    max_tokens: maxOut,
    stream:     true,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: q }
    ]
  };

  if (APP._ragFromPDF || APP._refBookSource) {
    body.temperature = 0;
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${APP.apiKey}`,
        'HTTP-Referer':  'https://marineiq.study',
        'X-Title':       'MarineIQ Pro'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`OpenRouter: ${err.error?.message || `HTTP ${res.status}`}`);
    }

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let   buf     = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const raw = line.slice(5).trim();
        if (raw === '[DONE]') { onDone(); return; }
        try {
          const j    = JSON.parse(raw);
          const text = j.choices?.[0]?.delta?.content || '';
          if (text) onChunk(text);
        } catch {}
      }
    }
    onDone();
  } catch (e) {
    onError(e);
  }
}

/* ── ANTHROPIC (kept as fallback for users who already have credits) ── */
async function callAnthropic(q, mode, onChunk, onDone, onError) {
  const maxTokens = { fast: 700, bal: 1400, deep: 3000, live: 1400 }[mode] || 1400;
  const body = {
    model:      MODELS[mode]?.id || 'claude-haiku-4-5-20251001',
    max_tokens: maxTokens,
    stream:     true,
    system:     buildSystemPrompt(mode, q),
    messages:   [{ role: 'user', content: q }]
  };

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'x-api-key':     APP.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
        'accept': 'text/event-stream'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.error?.message || `HTTP ${res.status}`;
      if (msg.includes('credit') || msg.includes('balance')) {
        throw new Error('Anthropic credit balance too low. Switch to a free provider (Gemini/Groq) in the API settings.');
      }
      throw new Error(msg);
    }

    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let   buf     = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const raw = line.slice(5).trim();
        try {
          const j = JSON.parse(raw);
          if (j.type === 'content_block_delta') onChunk(j.delta?.text || '');
          if (j.type === 'message_stop') { onDone(); return; }
        } catch {}
      }
    }
    onDone();
  } catch (e) {
    onError(e);
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   NEW UNIFIED askStream — routes to correct provider
   ═══════════════════════════════════════════════════════════════════════ */
askStream = async function(q, mode, t0) {
  const provider = getProvider();
  if (!provider) {
    openApiModal();
    throw new Error('No API key set');
  }

  // FORCE EVALUATE SYSTEM PROMPT ONCE
  // This generates the context, and importantly, sets APP._refBookSource BEFORE we read it below.
  const finalSysPrompt = typeof buildSystemPrompt === 'function' ? buildSystemPrompt(mode, q) : '';

  return new Promise((resolve, reject) => {
    const ansBody = document.getElementById('ansBody');
    let   full    = '';
    let   settled = false;

    // Show answer card immediately (streaming)
    clearTimer();
    hideEl('thinkingEl');
    document.getElementById('ansQuery').textContent = q;
    setAnswerBadges(provider.label, 'abadge-bal', '', APP.examMode);
    
    // RENDER RAG / BOOK SOURCES AS CHIPS IN THE UI
    const srcBar = document.getElementById('ansSources');
    let hasSources = false;
    let html = '';
    
    if (APP._ragFromPDF && APP._ragSources && APP._ragSources.length) {
      hasSources = true;
      APP._ragSources.forEach(doc => {
        html += `<span class="src-chip" style="cursor:help" title="Extracted from your uploaded PDF">📄 ${esc(doc)}</span>`;
      });
    }
    
    if (APP._refBookSource) {
      hasSources = true;
      html += `<span class="src-chip" style="cursor:help" title="Extracted from built-in Reference Library">📚 ${esc(APP._refBookSource.source)}</span>`;
    }

    if (hasSources) {
      srcBar.innerHTML = html;
      srcBar.style.display = 'block';
      srcBar.style.setProperty('display', 'block', 'important');
    } else {
      srcBar.style.display = 'none';
    }

    const deepBtn = document.getElementById('deepBtn');
    if (deepBtn) deepBtn.style.display = mode !== 'deep' ? 'inline-flex' : 'none';
    
    showEl('answerCard');
    ansBody.innerHTML = '<span class="stream-cursor">▌</span>';

    const tStart = Date.now();

    function onChunk(text) {
      full += text;
      ansBody.innerHTML = renderAnswerBody(full) + '<span class="stream-cursor">▌</span>';
      // Auto-scroll if user is near bottom
      const main = document.getElementById('mainEl');
      if (main && main.scrollHeight - main.scrollTop - main.clientHeight < 200) {
        main.scrollTop = main.scrollHeight;
      }
    }

    function onDone() {
      if (settled) return;
      settled = true;
      APP.lastAnswer = full;
      ansBody.innerHTML = renderAnswerBody(full);
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1) + 's';
      setAnswerBadges(provider.label, 'abadge-bal', elapsed, APP.examMode);
      resolve();
    }

    function onError(e) {
      if (settled) return;
      settled = true;
      reject(e);
    }

    provider.call(q, mode, finalSysPrompt, onChunk, onDone, onError);
  });
};
/* ── askLive: use provider's best model with web context note ── */
askLive = async function(q, t0) {
  // For free providers, we add a web-search instruction to the prompt
  // and use the best available model
  const augmented = `[LIVE RESEARCH MODE] The user wants current/latest information.
Use your most up-to-date training knowledge. If you know of recent regulatory changes 
(CII ratings, EEXI, alternative fuels), include them.
Question: ${q}`;
  return askStream(augmented, 'bal', t0);
};

/* ═══════════════════════════════════════════════════════════════════════
   QUIZ — updated to use free providers (non-streaming, JSON mode)
   ═══════════════════════════════════════════════════════════════════════ */
quizGenerate = async function() {
  if (!APP.apiKey) { openApiModal(); return; }
  const provider = getProvider();
  if (!provider) { openApiModal(); return; }

  const topicId  = APP.currentTopic || 'marine_general';
  const kb       = TOPIC_KNOWLEDGE[topicId] || {};
  const lvlLabel = APP.currentLevel?.fullTitle || 'marine engineering';
  const context  = (kb.flashcards || []).slice(0, 2).map(f => f.q).join(' | ');

  const qEl    = document.getElementById('quizQ');
  const optsEl = document.getElementById('quizOpts');
  const resEl  = document.getElementById('quizResult');

  if (qEl)    qEl.textContent   = `⏳ Generating questions via ${provider.name}…`;
  if (optsEl) optsEl.innerHTML  = '';
  if (resEl)  resEl.textContent = '';
  APP.quizScore = { c: 0, t: 0 };
  APP.quizWrong = APP.quizWrong || [];
  APP.quizWrong = [];
  updateQuizScore();

  const systemMsg = `You generate marine engineering multiple-choice exam questions for ${lvlLabel} level.
Context: ${context.slice(0, 200)}
Return ONLY a JSON array — no markdown, no backticks, no explanation before or after.
Format exactly: [{"q":"question","opts":["A. text","B. text","C. text","D. text"],"ans":0,"exp":"why correct"}]
"ans" is 0-based index. Generate exactly 5 questions. Be factually accurate per Reed's/IMO/STCW.`;

  try {
    let raw = '';

    // Use non-streaming for quiz (easier JSON parsing)
    if (detectProvider(APP.apiKey) === 'gemini') {
      const model = AI_PROVIDERS.gemini.models.fast;
      const url   = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${APP.apiKey}`;
      const res   = await fetch(url, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: systemMsg + '\n\nTopic: ' + topicId }] }],
          generationConfig: { maxOutputTokens: 1200, temperature: 0.3 }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `Gemini HTTP ${res.status}`);
      raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    } else if (detectProvider(APP.apiKey) === 'groq') {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${APP.apiKey}` },
        body: JSON.stringify({
          model: AI_PROVIDERS.groq.models.fast,
          max_tokens: 1200, temperature: 0.3, stream: false,
          messages: [{ role: 'system', content: systemMsg }, { role: 'user', content: `Topic: ${topicId}` }]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `Groq HTTP ${res.status}`);
      raw = data.choices?.[0]?.message?.content || '';

    } else if (detectProvider(APP.apiKey) === 'openrouter') {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${APP.apiKey}`, 'HTTP-Referer': 'https://marineiq.study' },
        body: JSON.stringify({
          model: AI_PROVIDERS.openrouter.models.fast,
          max_tokens: 1200, temperature: 0.3, stream: false,
          messages: [{ role: 'system', content: systemMsg }, { role: 'user', content: `Topic: ${topicId}` }]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `OpenRouter HTTP ${res.status}`);
      raw = data.choices?.[0]?.message?.content || '';

    } else {
      // Anthropic
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': APP.apiKey,
          'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({
          model: MODELS.fast.id, max_tokens: 1200,
          system: systemMsg, messages: [{ role: 'user', content: `Topic: ${topicId}` }]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || `Anthropic HTTP ${res.status}`);
      raw = data.content?.[0]?.text || '';
    }

    // Parse JSON from response
    raw = raw.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'').trim();
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('Response was not a valid JSON array');

    APP.quizData  = JSON.parse(match[0]);
    APP.quizIndex = 0;
    renderQuizQ();

  } catch (err) {
    // Fallback to flashcard-based quiz
    const cards = (kb.flashcards || []);
    if (cards.length >= 2) {
      APP.quizData = cards.slice(0, Math.min(5, cards.length)).map(c => ({
        q: c.q,
        opts: [
          'A. ' + c.a.split(/[.;]/)[0].slice(0, 70),
          'B. The opposite principle applies in this situation.',
          'C. This only applies to 4-stroke engines, not 2-stroke.',
          'D. None of the above are correct for this scenario.'
        ],
        ans: 0,
        exp: c.a.slice(0, 180)
      }));
      APP.quizIndex = 0;
      renderQuizQ();
      if (qEl) {
        const warn = document.createElement('div');
        warn.style.cssText = 'color:#f59e0b;font-size:0.75rem;margin-bottom:8px;padding:6px 0;border-bottom:1px solid var(--b0)';
        warn.textContent   = `⚠ AI quiz unavailable (${err.message.slice(0,60)}) — using flashcard questions instead`;
        qEl.parentNode.insertBefore(warn, qEl);
      }
    } else {
      if (qEl) qEl.textContent = `Quiz error: ${err.message}. Please check your API key.`;
    }
  }
};

/* ═══════════════════════════════════════════════════════════════════════
   NEW API KEY MODAL — provider selector + setup guides
   ═══════════════════════════════════════════════════════════════════════ */
(function rebuildApiModal() {
  const overlay = document.getElementById('apiOverlay');
  if (!overlay) return;

  // Inject CSS for new modal
  const style = document.createElement('style');
  style.textContent = `
.provider-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 14px 0;
}
.provider-card {
  border: 1.5px solid var(--b1); border-radius: 10px; padding: 11px 12px;
  cursor: pointer; transition: all 0.18s; background: var(--bg2);
  text-align: left;
}
.provider-card:hover   { border-color: var(--ac); background: var(--bg3); }
.provider-card.selected{ border-color: var(--ac); background: rgba(14,165,233,0.08); }
.provider-card .pc-name{ font-family:'JetBrains Mono',monospace; font-size:0.72rem; font-weight:700; color:var(--tx); margin-bottom:3px; }
.provider-card .pc-free{ font-size:0.65rem; color:#22c55e; }
.provider-card .pc-paid{ font-size:0.65rem; color:#f59e0b; }
.setup-guide {
  background: var(--bg2); border: 1px solid var(--b1); border-radius: 8px;
  padding: 11px 13px; margin: 10px 0; font-size: 0.78rem; line-height:1.7;
}
.setup-guide a { color: var(--acL); text-decoration: none; }
.setup-guide a:hover { text-decoration: underline; }
.setup-step {
  display: flex; gap: 9px; align-items: flex-start; margin: 5px 0;
}
.step-num {
  flex-shrink:0; width:20px; height:20px; border-radius:50%;
  background:var(--ac); color:#fff; font-size:0.65rem; font-weight:700;
  display:flex; align-items:center; justify-content:center; margin-top:2px;
}
.detected-badge {
  display:inline-block; padding:3px 8px; border-radius:20px;
  font-family:'JetBrains Mono',monospace; font-size:0.6rem; font-weight:700;
  margin-left:8px; vertical-align:middle;
}
@media(max-width:480px){ .provider-grid{ grid-template-columns:1fr; } }
  `;
  document.head.appendChild(style);

  // Provider guide content
  const guides = {
    gemini: `
      <div style="padding:9px 12px;background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:8px;margin-bottom:10px;font-size:0.75rem;color:#fbbf24;line-height:1.6">
        ⚠ <strong>Important:</strong> Gemini quota is per <strong>Google account</strong>, not per API key.<br>
        Creating a new key from the same Gmail gives the same quota. If you hit limits, use Groq instead.
      </div>
      <div class="setup-step"><div class="step-num">1</div><div>Go to <a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a> — sign in with a Google account</div></div>
      <div class="setup-step"><div class="step-num">2</div><div>Click <strong>"Get API Key"</strong> → <strong>"Create API key"</strong></div></div>
      <div class="setup-step"><div class="step-num">3</div><div>Copy the key (starts with <code>AIza</code>) and paste below</div></div>
      <div style="margin-top:8px;color:#f59e0b;font-size:0.72rem">⚠ Free quota resets daily at midnight Pacific. New accounts may have lower initial quota.</div>`,
    groq: `
      <div style="padding:9px 12px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:8px;margin-bottom:10px;font-size:0.75rem;color:#86efac;line-height:1.6">
        ✅ <strong>Best choice</strong> — Each Gmail/email creates a completely separate account with its own free quota. No account-level sharing.
      </div>
      <div class="setup-step"><div class="step-num">1</div><div>Go to <a href="https://console.groq.com" target="_blank">console.groq.com</a> — sign up free (email or Google)</div></div>
      <div class="setup-step"><div class="step-num">2</div><div>Go to <strong>API Keys</strong> in the left menu → <strong>Create API Key</strong></div></div>
      <div class="setup-step"><div class="step-num">3</div><div>Copy the key (starts with <code>gsk_</code>) and paste below</div></div>
      <div style="margin-top:8px;color:#22c55e;font-size:0.72rem">✅ Free forever · No credit card · Uses Llama 3.3 70B · ~14,400 req/day · Resets daily</div>`,
    openrouter: `
      <div class="setup-step"><div class="step-num">1</div><div>Go to <a href="https://openrouter.ai" target="_blank">openrouter.ai</a> — sign up free</div></div>
      <div class="setup-step"><div class="step-num">2</div><div>Go to <strong>Keys</strong> → <strong>Create Key</strong></div></div>
      <div class="setup-step"><div class="step-num">3</div><div>Copy the key (starts with <code>sk-or-</code>) and paste below</div></div>
      <div style="margin-top:8px;color:#22c55e;font-size:0.72rem">✅ Free models available · Multiple AI providers · No credit card needed</div>`,
    anthropic: `
      <div class="setup-step"><div class="step-num">1</div><div>Go to <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a></div></div>
      <div class="setup-step"><div class="step-num">2</div><div>Add billing details and purchase minimum <strong>$5 credits</strong></div></div>
      <div class="setup-step"><div class="step-num">3</div><div>Go to API Keys → Create Key (starts with <code>sk-ant-</code>)</div></div>
      <div style="margin-top:8px;color:#f59e0b;font-size:0.72rem">⚠ Paid — but excellent quality. $5 lasts months for personal study.</div>`
  };

  overlay.innerHTML = `
<div class="modal-box" style="max-width:500px;width:92vw;">
  <div class="modal-title" style="margin-bottom:4px">🔑 Choose AI Provider</div>
  <p style="color:var(--tx3);font-size:0.78rem;margin:0 0 4px">⚡ <strong style="color:#22c55e">Groq is recommended</strong> — truly free, no quota, works instantly. Gemini quota is per Google account, not per key.</p>

  <div class="provider-grid" id="providerGrid">
    <div class="provider-card selected" data-pid="groq" onclick="selectProvider('groq')">
      <div class="pc-name">⚡ Groq (Llama 3)</div>
      <div class="pc-free">✅ FREE — No limits</div>
      <div style="font-size:0.6rem;color:#22c55e;margin-top:2px">⭐ Best for India</div>
    </div>
    <div class="provider-card" data-pid="gemini" onclick="selectProvider('gemini')">
      <div class="pc-name">🌐 Google Gemini</div>
      <div class="pc-free">⚠ Quota per account</div>
      <div style="font-size:0.6rem;color:#f59e0b;margin-top:2px">May hit limits</div>
    </div>
    <div class="provider-card" data-pid="openrouter" onclick="selectProvider('openrouter')">
      <div class="pc-name">🔀 OpenRouter</div>
      <div class="pc-free">✅ FREE models</div>
      <div style="font-size:0.6rem;color:var(--tx3);margin-top:2px">Free fallback</div>
    </div>
    <div class="provider-card" data-pid="anthropic" onclick="selectProvider('anthropic')">
      <div class="pc-name">🤖 Anthropic Claude</div>
      <div class="pc-paid">⚠ Paid — needs credits</div>
      <div style="font-size:0.6rem;color:var(--tx3);margin-top:2px">Existing users</div>
    </div>
  </div>

  <div class="setup-guide" id="setupGuide">${guides.groq}</div>

  <label class="modal-label" style="margin-top:10px">Paste your API Key</label>
  <input class="modal-input" type="password" id="apiKeyInput" placeholder="gsk_… (Groq key) or AIza… (Gemini)"/>
  <div id="keyDetectedBadge" style="min-height:20px;margin:4px 0;font-size:0.72rem;color:var(--tx3)"></div>

  <div class="modal-actions">
    <button class="modal-cancel" onclick="closeApiModal()">Cancel</button>
    <button class="modal-save"   onclick="saveApiKeyNew()">Save &amp; Start Learning →</button>
  </div>
</div>`;

  // Store guides reference
  overlay._guides = guides;
})();

/* ── Provider selection in modal ── */
window.selectProvider = function(pid) {
  const overlay = document.getElementById('apiOverlay');
  if (!overlay?._guides) return;

  document.querySelectorAll('.provider-card').forEach(c => {
    c.classList.toggle('selected', c.dataset.pid === pid);
  });

  const guide = document.getElementById('setupGuide');
  if (guide) guide.innerHTML = overlay._guides[pid] || '';

  const inp = document.getElementById('apiKeyInput');
  if (inp) {
    const p = AI_PROVIDERS[pid];
    inp.placeholder = p?.keyHint || 'Paste API key…';
    inp.value       = '';
  }

  const badge = document.getElementById('keyDetectedBadge');
  if (badge) badge.innerHTML = '';
};

/* ── Live key detection as user types ── */
document.addEventListener('input', e => {
  if (e.target.id !== 'apiKeyInput') return;
  const val   = e.target.value.trim();
  const badge = document.getElementById('keyDetectedBadge');
  if (!badge) return;
  if (!val) { badge.innerHTML = ''; return; }
  const pid = detectProvider(val);
  if (pid) {
    const p = AI_PROVIDERS[pid];
    badge.innerHTML = `<span style="color:#22c55e">✓ Detected: ${p.name}</span>`;
    // Auto-select matching provider card
    document.querySelectorAll('.provider-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.pid === pid);
    });
  } else {
    badge.innerHTML = '<span style="color:#f59e0b">⚠ Key format not recognised — check provider</span>';
  }
});

/* ── Save API key (new modal) ── */
window.saveApiKeyNew = function() {
  const key = document.getElementById('apiKeyInput')?.value.trim();
  if (!key) {
    const badge = document.getElementById('keyDetectedBadge');
    if (badge) badge.innerHTML = '<span style="color:#ef4444">Please enter a key first</span>';
    return;
  }
  APP.apiKey = key;
  localStorage.setItem('marineiq_apikey', key);

  // Update topbar indicator
  const pid = detectProvider(key);
  if (pid) {
    const p   = AI_PROVIDERS[pid];
    let ind   = document.getElementById('providerIndicator');
    if (!ind) {
      ind    = document.createElement('div');
      ind.id = 'providerIndicator';
      ind.style.cssText = 'font-family:JetBrains Mono,monospace;font-size:0.58rem;color:#22c55e;padding:3px 8px;border:1px solid rgba(34,197,94,0.3);border-radius:20px;white-space:nowrap;flex-shrink:0';
      const tbActions = document.querySelector('.topbar-actions');
      if (tbActions) tbActions.insertBefore(ind, tbActions.firstChild);
    }
    ind.textContent = `✓ ${p.label}`;
  }

  closeApiModal();
};

/* Keep old saveApiKey working for any existing calls */
window.saveApiKey = window.saveApiKeyNew;

/* ── On load: show provider indicator if key exists ── */
document.addEventListener('DOMContentLoaded', () => {
  if (!APP.apiKey) return;
  const pid = detectProvider(APP.apiKey);
  if (!pid) return;
  const p   = AI_PROVIDERS[pid];
  setTimeout(() => {
    let ind = document.getElementById('providerIndicator');
    if (!ind) {
      ind = document.createElement('div');
      ind.id = 'providerIndicator';
      ind.style.cssText = 'font-family:JetBrains Mono,monospace;font-size:0.58rem;color:#22c55e;padding:3px 8px;border:1px solid rgba(34,197,94,0.3);border-radius:20px;white-space:nowrap;flex-shrink:0';
      const tbActions = document.querySelector('.topbar-actions');
      if (tbActions) tbActions.insertBefore(ind, tbActions.firstChild);
    }
    ind.textContent = `✓ ${p.label}`;
    // Update API input placeholder
    const inp = document.getElementById('apiKeyInput');
    if (inp) inp.placeholder = `${p.name} key saved ✓`;
  }, 300);
});


