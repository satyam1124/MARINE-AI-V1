/* MarineIQ — Quiz Engine v2: AI MCQ, difficulty levels, retry, CSS injection
   Deps: config.js, utils.js, ai-engine.js, ai-providers.js */

function buildQuizPrompt(topicId, topicTitle, lvlLabel, difficulty, count) {
  const kb   = (typeof TOPIC_KNOWLEDGE !== 'undefined' && TOPIC_KNOWLEDGE[topicId]) || {};
  const fc   = (kb.flashcards || []).slice(0, 3).map(f => `Q: ${f.q}`).join('\n');
  const fmls = (kb.formulas   || []).slice(0, 2).map(f => `${f.label}: ${f.eq}`).join('\n');

  const diffInstructions = {
    easy:   `EASY level — recall and recognition questions. Ask about definitions, basic names, obvious facts. e.g. "What does OWS stand for?", "Which instrument measures cylinder pressure?". No calculations required.`,
    medium: `MEDIUM level — understanding and application questions. Ask about working principles, causes and effects, simple calculations using given values. e.g. "Why does turbocharger surge occur?", "Calculate MEP given Pm=10 bar, L=0.8m, A=0.05m², N=100 RPM."`,
    hard:   `HARD level — analysis and expert knowledge questions. Ask about fault diagnosis, complex interactions, multi-step calculations, oral board style questions, specific IMO regulation numbers, class society requirements. e.g. "High scavenge air temperature + low Pmax simultaneously indicates what fault?", "What is the MARPOL Annex VI NOx Tier III limit for engines <130 RPM?"`,
    mixed:  `Mix of difficulty: 30% EASY (recall), 40% MEDIUM (understanding/application), 30% HARD (analysis/diagnosis). Include at least one calculation question.`,
  };

  return {
    system: `You are a marine engineering examiner generating MMD/oral examination questions.
Topic: "${topicTitle}" | Level: ${lvlLabel} | Difficulty: ${difficulty.toUpperCase()}
${diffInstructions[difficulty] || diffInstructions.mixed}

Context from study material:
${fc || 'No flashcards — use authoritative marine engineering knowledge.'}
${fmls ? `Formulas: ${fmls}` : ''}

RULES:
- Return ONLY a valid JSON array. NO markdown. NO backticks. NO text before or after.
- Generate exactly ${count} questions.
- Every question must have exactly 4 options (A, B, C, D).
- "ans" is the 0-based index (0=A, 1=B, 2=C, 3=D) of the CORRECT answer.
- "exp" is a 1-2 sentence explanation of WHY that answer is correct, citing source if possible.
- Questions must be factually accurate — source from Reed's Marine Engineering Series, Pounder's, IMO, MARPOL, STCW, MAN B&W manuals.
- Do NOT repeat similar questions.
- Vary question style: What/Why/How/Calculate/Identify fault/Which regulation.

JSON format:
[{"q":"question text","opts":["A. option","B. option","C. option","D. option"],"ans":0,"exp":"explanation citing source"}]`,
    user: `Generate ${count} ${difficulty} difficulty marine engineering MCQs about: ${topicTitle} (${topicId}).`
  };
}

/* ══════════════════════════════════════════════════════════
   3. QUIZ PANEL HTML — replaces static HTML
   ══════════════════════════════════════════════════════════ */
function buildQuizPanelHTML() {
  return `
<div class="quiz-v2-wrap" id="quizV2Wrap">

  <!-- SETUP SCREEN -->
  <div class="qv2-setup" id="qv2Setup">
    <div class="qv2-setup-title">⚙️ Quiz Settings</div>

    <div class="qv2-setting-group">
      <div class="qv2-setting-label">Difficulty</div>
      <div class="qv2-chips" id="qv2Diff">
        <button class="qv2-chip"           data-val="easy"   onclick="setQuizDiff('easy',  this)">🟢 Easy</button>
        <button class="qv2-chip"           data-val="medium" onclick="setQuizDiff('medium',this)">🟡 Medium</button>
        <button class="qv2-chip"           data-val="hard"   onclick="setQuizDiff('hard',  this)">🔴 Hard</button>
        <button class="qv2-chip qv2-chip-active" data-val="mixed"  onclick="setQuizDiff('mixed', this)">🎯 Mixed</button>
      </div>
    </div>

    <div class="qv2-setting-group">
      <div class="qv2-setting-label">Questions per round</div>
      <div class="qv2-chips" id="qv2Count">
        <button class="qv2-chip"                data-val="5"  onclick="setQuizCount(5, this)">5</button>
        <button class="qv2-chip qv2-chip-active" data-val="10" onclick="setQuizCount(10,this)">10</button>
        <button class="qv2-chip"                data-val="15" onclick="setQuizCount(15,this)">15</button>
        <button class="qv2-chip"                data-val="20" onclick="setQuizCount(20,this)">20</button>
      </div>
    </div>

    <button class="qv2-start-btn" id="qv2StartBtn" onclick="quizStart()">
      ⚡ Start Quiz
    </button>
    <div class="qv2-setup-note" id="qv2SetupNote">Select a topic from the sidebar first, then start the quiz</div>
  </div>

  <!-- LOADING SCREEN -->
  <div class="qv2-loading" id="qv2Loading" style="display:none">
    <div class="qv2-spinner"></div>
    <div class="qv2-loading-label">Generating <span id="qv2LoadCount"></span> questions…</div>
    <div class="qv2-loading-sub">AI is crafting exam-quality questions</div>
  </div>

  <!-- QUESTION SCREEN -->
  <div class="qv2-question" id="qv2Question" style="display:none">
    <!-- Progress bar -->
    <div class="qv2-progress-wrap">
      <div class="qv2-progress-bar" id="qv2ProgressBar"></div>
    </div>
    <div class="qv2-progress-meta">
      <span class="qv2-diff-badge" id="qv2DiffBadge"></span>
      <span class="qv2-qnum" id="qv2Qnum">Q1 / 10</span>
      <span class="qv2-score-live" id="qv2ScoreLive">0 / 0</span>
    </div>

    <!-- Question text -->
    <div class="qv2-q-text" id="qv2QText"></div>

    <!-- Options -->
    <div class="qv2-opts" id="qv2Opts"></div>

    <!-- Explanation (shown after answer) -->
    <div class="qv2-explanation" id="qv2Explanation" style="display:none">
      <div class="qv2-exp-label">📖 Explanation</div>
      <div class="qv2-exp-text" id="qv2ExpText"></div>
    </div>

    <!-- Navigation -->
    <div class="qv2-nav">
      <button class="qv2-nav-btn qv2-nav-next" id="qv2NextBtn" onclick="quizNextQ()" style="display:none">
        Next Question →
      </button>
      <button class="qv2-nav-btn qv2-nav-finish" id="qv2FinishBtn" onclick="quizFinish()" style="display:none">
        See Results 🏁
      </button>
    </div>
  </div>

  <!-- RESULTS SCREEN -->
  <div class="qv2-results" id="qv2Results" style="display:none">
    <div class="qv2-results-grade" id="qv2Grade"></div>
    <div class="qv2-results-score" id="qv2ResultScore"></div>
    <div class="qv2-results-bar-wrap">
      <div class="qv2-results-bar" id="qv2ResultsBar"></div>
    </div>
    <div class="qv2-results-msg" id="qv2ResultsMsg"></div>

    <!-- Wrong answers review -->
    <div class="qv2-wrong-list" id="qv2WrongList"></div>

    <!-- Action buttons -->
    <div class="qv2-results-actions">
      <button class="qv2-start-btn" onclick="quizStart()">🔄 Retry Same Settings</button>
      <button class="qv2-nav-btn" onclick="quizRetryWrong()" id="qv2RetryWrongBtn">↺ Retry Wrong Only</button>
      <button class="qv2-nav-btn" onclick="showQuizSetup()">⚙️ Change Settings</button>
    </div>
  </div>

</div>`;
}

/* ══════════════════════════════════════════════════════════
   4. SETUP CONTROLS
   ══════════════════════════════════════════════════════════ */
function setQuizDiff(val, btn) {
  QUIZ.difficulty = val;
  document.querySelectorAll('#qv2Diff .qv2-chip').forEach(b => b.classList.remove('qv2-chip-active'));
  btn.classList.add('qv2-chip-active');
}

function setQuizCount(val, btn) {
  QUIZ.count = val;
  document.querySelectorAll('#qv2Count .qv2-chip').forEach(b => b.classList.remove('qv2-chip-active'));
  btn.classList.add('qv2-chip-active');
}

function showQuizSetup() {
  document.getElementById('qv2Setup').style.display    = '';
  document.getElementById('qv2Loading').style.display  = 'none';
  document.getElementById('qv2Question').style.display = 'none';
  document.getElementById('qv2Results').style.display  = 'none';
}

/* ══════════════════════════════════════════════════════════
   5. QUIZ START — generate questions via AI
   ══════════════════════════════════════════════════════════ */
async function quizStart() {
  if (QUIZ.generating) return;
  if (!APP.apiKey) { openApiModal(); return; }

  const topicId    = APP.currentTopic;
  const topicTitle = document.querySelector('#topicZone .tz-header .tz-intro-title')?.textContent
                  || document.querySelector('.sb-topic.active')?.textContent?.trim()
                  || topicId || 'Marine Engineering';
  const lvlLabel   = APP.currentLevel?.fullTitle || 'marine engineering';

  // Update note
  const note = document.getElementById('qv2SetupNote');
  if (note) note.textContent = `Generating ${QUIZ.count} ${QUIZ.difficulty} questions for: ${topicTitle}`;

  // Show loading
  document.getElementById('qv2Setup').style.display    = 'none';
  document.getElementById('qv2Loading').style.display  = '';
  document.getElementById('qv2Question').style.display = 'none';
  document.getElementById('qv2Results').style.display  = 'none';
  document.getElementById('qv2LoadCount').textContent  = QUIZ.count;

  QUIZ.generating = true;
  QUIZ.data       = [];
  QUIZ.index      = 0;
  QUIZ.score      = 0;
  QUIZ.total      = 0;
  QUIZ.wrong      = [];
  QUIZ.answered   = false;

  const pid = detectProvider(APP.apiKey);
  const { system: sysMsg, user: userMsg } = buildQuizPrompt(topicId, topicTitle, lvlLabel, QUIZ.difficulty, QUIZ.count);

  try {
    let raw = '';

    if (pid === 'groq') {
      const models = AI_PROVIDERS.groq.modelFallbacks || ['llama-3.3-70b-versatile','llama3-70b-8192'];
      for (const model of models) {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type':'application/json','Authorization':`Bearer ${APP.apiKey}` },
          body: JSON.stringify({ model, max_tokens:4000, temperature:0.4, stream:false,
            messages:[{role:'system',content:sysMsg},{role:'user',content:userMsg}] })
        });
        const data = await res.json();
        if (!res.ok) { if(res.status===429) continue; throw new Error(data.error?.message||`Groq ${res.status}`); }
        raw = data.choices?.[0]?.message?.content || ''; break;
      }

    } else if (pid === 'gemini') {
      const models = ['gemini-1.5-flash','gemini-1.5-flash-8b','gemini-1.0-pro'];
      for (const model of models) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${APP.apiKey}`;
        const res = await fetch(url, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body:JSON.stringify({ contents:[{role:'user',parts:[{text:sysMsg+'\n\n'+userMsg}]}],
            generationConfig:{maxOutputTokens:4000,temperature:0.4} })
        });
        const data = await res.json();
        if (!res.ok) { const m=data.error?.message||''; if(m.includes('quota')) continue; throw new Error(m||`Gemini ${res.status}`); }
        raw = data.candidates?.[0]?.content?.parts?.[0]?.text || ''; break;
      }

    } else if (pid === 'openrouter') {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${APP.apiKey}`,'HTTP-Referer':'https://marineiq.study'},
        body:JSON.stringify({ model:'meta-llama/llama-3.1-8b-instruct:free', max_tokens:4000, temperature:0.4, stream:false,
          messages:[{role:'system',content:sysMsg},{role:'user',content:userMsg}] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message||`OpenRouter ${res.status}`);
      raw = data.choices?.[0]?.message?.content || '';

    } else if (pid === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':APP.apiKey,
          'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
        body:JSON.stringify({ model: AI_PROVIDERS.anthropic.models.fast, max_tokens:4000,
          system:sysMsg, messages:[{role:'user',content:userMsg}] })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message||`Anthropic ${res.status}`);
      raw = data.content?.[0]?.text || '';
    }

    // Parse JSON — strip markdown fences
    raw = raw.replace(/^```(?:json)?\s*/im,'').replace(/\s*```$/m,'').trim();
    // Find JSON array in response
    const arrStart = raw.indexOf('[');
    const arrEnd   = raw.lastIndexOf(']');
    if (arrStart === -1 || arrEnd === -1) throw new Error('AI did not return valid JSON array');
    raw = raw.slice(arrStart, arrEnd + 1);

    QUIZ.data = JSON.parse(raw);
    if (!Array.isArray(QUIZ.data) || QUIZ.data.length === 0) throw new Error('No questions returned');

    // Validate and clean questions
    QUIZ.data = QUIZ.data.filter(q =>
      q.q && Array.isArray(q.opts) && q.opts.length === 4 &&
      typeof q.ans === 'number' && q.ans >= 0 && q.ans <= 3
    ).slice(0, QUIZ.count);

    if (QUIZ.data.length === 0) throw new Error('All questions failed validation');

    QUIZ.generating = false;
    renderQuizQ();

  } catch(e) {
    QUIZ.generating = false;
    document.getElementById('qv2Loading').style.display = 'none';
    document.getElementById('qv2Setup').style.display   = '';
    const note2 = document.getElementById('qv2SetupNote');
    if (note2) note2.innerHTML = `<span style="color:#f87171">⚠ ${esc(e.message)}</span><br><small>Check your API key and try again</small>`;
  }
}

/* ══════════════════════════════════════════════════════════
   6. RENDER QUESTION
   ══════════════════════════════════════════════════════════ */
function renderQuizQ() {
  const q    = QUIZ.data[QUIZ.index];
  const total = QUIZ.data.length;
  if (!q) { quizFinish(); return; }

  QUIZ.answered = false;

  // Switch to question screen
  document.getElementById('qv2Loading').style.display  = 'none';
  document.getElementById('qv2Setup').style.display    = 'none';
  document.getElementById('qv2Results').style.display  = 'none';
  document.getElementById('qv2Question').style.display = '';

  // Progress
  const pct = Math.round((QUIZ.index / total) * 100);
  document.getElementById('qv2ProgressBar').style.width = pct + '%';
  document.getElementById('qv2Qnum').textContent        = `Q${QUIZ.index + 1} / ${total}`;
  document.getElementById('qv2ScoreLive').textContent   = `${QUIZ.score} / ${QUIZ.total}`;

  // Difficulty badge
  const diffBadge = document.getElementById('qv2DiffBadge');
  const diffMap   = { easy:'🟢 Easy', medium:'🟡 Medium', hard:'🔴 Hard', mixed:'🎯 Mixed' };
  diffBadge.textContent = diffMap[QUIZ.difficulty] || '';

  // Question text
  document.getElementById('qv2QText').textContent = q.q;

  // Options — rebuilt fresh (clears pointer-events)
  const optsEl = document.getElementById('qv2Opts');
  optsEl.innerHTML = '';
  const letters = ['A','B','C','D'];
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className   = 'qv2-opt';
    btn.dataset.idx = i;
    // Option text — strip leading "A. " if AI already included it, then re-add
    const cleanOpt = opt.replace(/^[ABCD]\.\s*/,'');
    btn.innerHTML = `<span class="qv2-opt-letter">${letters[i]}</span><span class="qv2-opt-text">${esc(cleanOpt)}</span>`;
    btn.addEventListener('click', () => handleQuizAnswer(i, q.ans, q.exp || ''));
    optsEl.appendChild(btn);
  });

  // Hide explanation and nav
  document.getElementById('qv2Explanation').style.display = 'none';
  document.getElementById('qv2NextBtn').style.display     = 'none';
  document.getElementById('qv2FinishBtn').style.display   = 'none';
}

/* ══════════════════════════════════════════════════════════
   7. HANDLE ANSWER — the click fix
   Uses addEventListener (NOT onclick attr) — avoids pointer-events issues
   ══════════════════════════════════════════════════════════ */
function handleQuizAnswer(selected, correct, explanation) {
  if (QUIZ.answered) return; // guard: ignore double-tap
  QUIZ.answered = true;
  QUIZ.total++;

  const optsEl = document.getElementById('qv2Opts');
  const btns   = optsEl.querySelectorAll('.qv2-opt');

  // Disable all buttons via class (NOT pointer-events inline — that was the bug)
  btns.forEach(b => b.classList.add('qv2-opt-done'));

  // Mark correct + selected
  btns[correct].classList.add('qv2-opt-correct');
  if (selected !== correct) {
    btns[selected].classList.add('qv2-opt-wrong');
    QUIZ.wrong.push(QUIZ.index);
  } else {
    QUIZ.score++;
  }

  // Update live score
  document.getElementById('qv2ScoreLive').textContent = `${QUIZ.score} / ${QUIZ.total}`;

  // Show explanation
  if (explanation) {
    document.getElementById('qv2ExpText').textContent      = explanation;
    document.getElementById('qv2Explanation').style.display = '';
  }

  // Show next/finish button
  const isLast = QUIZ.index >= QUIZ.data.length - 1;
  document.getElementById('qv2NextBtn').style.display   = isLast ? 'none' : '';
  document.getElementById('qv2FinishBtn').style.display = isLast ? '' : 'none';
}

/* ══════════════════════════════════════════════════════════
   8. NAVIGATION
   ══════════════════════════════════════════════════════════ */
function quizNextQ() {
  QUIZ.index++;
  if (QUIZ.index >= QUIZ.data.length) { quizFinish(); return; }
  renderQuizQ();
}

function quizFinish() {
  const total = QUIZ.data.length;
  const pct   = total > 0 ? Math.round((QUIZ.score / total) * 100) : 0;

  // Grade
  let grade, gradeColor, msg;
  if      (pct >= 90) { grade='A+'; gradeColor='#34d399'; msg='Outstanding! Ready for the oral board.'; }
  else if (pct >= 75) { grade='A';  gradeColor='#60a5fa'; msg='Well done. Strong understanding of this topic.'; }
  else if (pct >= 60) { grade='B';  gradeColor='#d4a017'; msg='Good — review the explanations for missed questions.'; }
  else if (pct >= 45) { grade='C';  gradeColor='#f97316'; msg='Needs revision. Study the formulas and key points.'; }
  else                { grade='D';  gradeColor='#f87171'; msg='More study needed before the exam. Review all notes.'; }

  // Show results screen
  document.getElementById('qv2Question').style.display = 'none';
  document.getElementById('qv2Results').style.display  = '';

  document.getElementById('qv2Grade').innerHTML =
    `<span style="color:${gradeColor};font-size:3rem;font-weight:800">${grade}</span>`;
  document.getElementById('qv2ResultScore').textContent  = `${QUIZ.score} / ${total} correct  (${pct}%)`;
  document.getElementById('qv2ResultsBar').style.width   = pct + '%';
  document.getElementById('qv2ResultsBar').style.background = gradeColor;
  document.getElementById('qv2ResultsMsg').textContent   = msg;

  // Retry wrong button
  const retryBtn = document.getElementById('qv2RetryWrongBtn');
  if (retryBtn) retryBtn.style.display = QUIZ.wrong.length > 0 ? '' : 'none';

  // Wrong answers review
  const wrongList = document.getElementById('qv2WrongList');
  if (QUIZ.wrong.length > 0) {
    wrongList.innerHTML = `<div class="qv2-wrong-title">❌ Review missed questions (${QUIZ.wrong.length})</div>` +
      QUIZ.wrong.map(i => {
        const q = QUIZ.data[i];
        const letters = ['A','B','C','D'];
        return `<div class="qv2-wrong-item">
          <div class="qv2-wrong-q">${esc(q.q)}</div>
          <div class="qv2-wrong-ans">✅ Correct: <strong>${letters[q.ans]}. ${esc(q.opts[q.ans].replace(/^[ABCD]\.\s*/,''))}</strong></div>
          ${q.exp ? `<div class="qv2-wrong-exp">${esc(q.exp)}</div>` : ''}
        </div>`;
      }).join('');
  } else {
    wrongList.innerHTML = '<div class="qv2-wrong-title" style="color:var(--cadet)">🎉 Perfect score — no missed questions!</div>';
  }

  // Update legacy score display if it exists
  if (typeof updateQuizScore === 'function') {
    APP.quizScore = { c: QUIZ.score, t: total };
    updateQuizScore();
  }

  // Track quiz taken stat
  APP.stats = APP.stats || {};
  APP.stats.quizTaken = (APP.stats.quizTaken || 0) + 1;
  try { localStorage.setItem('miq_stats', JSON.stringify(APP.stats)); } catch(e) {}
}

function quizRetryWrong() {
  if (QUIZ.wrong.length === 0) return;
  // Build a new dataset from wrong answers only
  QUIZ.data  = QUIZ.wrong.map(i => QUIZ.data[i]);
  QUIZ.index = 0; QUIZ.score = 0; QUIZ.total = 0; QUIZ.wrong = []; QUIZ.answered = false;
  renderQuizQ();
}

/* ══════════════════════════════════════════════════════════
   9. INJECT NEW QUIZ HTML into the existing panel
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('panel-quiz');
  if (panel) {
    panel.innerHTML = buildQuizPanelHTML();
  }
});

/* ══════════════════════════════════════════════════════════
   10. CSS
   ══════════════════════════════════════════════════════════ */
(function injectQuizCSS() {
  const s = document.createElement('style');
  s.textContent = `

/* ── Quiz v2 Wrapper ── */
.quiz-v2-wrap {
  background: var(--bg1); border: 1px solid var(--b0);
  border-radius: 14px; overflow: hidden;
}

/* ── Setup Screen ── */
.qv2-setup {
  padding: 22px; display: flex; flex-direction: column; gap: 16px;
}
.qv2-setup-title {
  font-size: 0.9rem; font-weight: 700; color: var(--tx); margin-bottom: 2px;
}
.qv2-setting-group { display: flex; flex-direction: column; gap: 8px; }
.qv2-setting-label {
  font-size: 0.7rem; font-weight: 600; color: var(--tx3);
  text-transform: uppercase; letter-spacing: 0.08em;
  font-family: 'JetBrains Mono', monospace;
}
.qv2-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.qv2-chip {
  padding: 7px 16px; border-radius: 8px; border: 1px solid var(--b1);
  background: var(--bg2); color: var(--tx2); cursor: pointer;
  font-size: 0.78rem; font-weight: 500; transition: all 0.13s;
  min-height: 36px;
}
.qv2-chip:hover { border-color: var(--ac); color: var(--tx); }
.qv2-chip-active {
  border-color: var(--ac) !important; background: rgba(212,160,23,0.1) !important;
  color: var(--acL) !important; font-weight: 700 !important;
}
.qv2-start-btn {
  padding: 12px 24px; border-radius: 10px; border: none; cursor: pointer;
  background: linear-gradient(135deg, var(--ac), var(--acD));
  color: #020810; font-weight: 700; font-size: 0.9rem;
  transition: all 0.15s; align-self: flex-start; min-height: 44px;
}
.qv2-start-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(212,160,23,0.3); }
.qv2-start-btn:active { transform: none; }
.qv2-setup-note {
  font-size: 0.72rem; color: var(--tx3); line-height: 1.5;
}

/* ── Loading Screen ── */
.qv2-loading {
  padding: 40px; display: flex; flex-direction: column;
  align-items: center; gap: 12px; text-align: center;
}
.qv2-spinner {
  width: 38px; height: 38px; border-radius: 50%;
  border: 3px solid var(--b1); border-top-color: var(--ac);
  animation: qv2Spin 0.85s linear infinite;
}
@keyframes qv2Spin { to { transform: rotate(360deg); } }
.qv2-loading-label { font-size: 0.9rem; font-weight: 600; color: var(--tx); }
.qv2-loading-sub   { font-size: 0.75rem; color: var(--tx3); }

/* ── Question Screen ── */
.qv2-question { display: flex; flex-direction: column; }

.qv2-progress-wrap {
  height: 4px; background: var(--bg3); width: 100%;
}
.qv2-progress-bar {
  height: 100%; background: linear-gradient(90deg, var(--ac), var(--acL));
  transition: width 0.4s ease; border-radius: 0 2px 2px 0;
}
.qv2-progress-meta {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 16px 0; gap: 8px; flex-wrap: wrap;
}
.qv2-diff-badge {
  font-size: 0.68rem; font-weight: 600; padding: 3px 9px;
  border-radius: 20px; border: 1px solid var(--b1);
  background: var(--bg2); color: var(--tx2);
}
.qv2-qnum {
  font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--tx3);
}
.qv2-score-live {
  font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
  color: var(--acL); font-weight: 700;
}

.qv2-q-text {
  padding: 16px 18px 14px; font-size: 0.92rem; font-weight: 500;
  line-height: 1.65; color: var(--tx);
}

/* ── Options — THE CLICK FIX ── */
.qv2-opts {
  display: flex; flex-direction: column; gap: 8px;
  padding: 0 16px 14px;
}
.qv2-opt {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 12px 14px; border-radius: 10px; border: 1px solid var(--b1);
  background: var(--bg2); cursor: pointer; text-align: left;
  transition: border-color 0.12s, background 0.12s; width: 100%;
  /* NO pointer-events manipulation — use class instead */
  min-height: 48px; position: relative;
}
.qv2-opt:hover:not(.qv2-opt-done) {
  border-color: var(--ac); background: rgba(212,160,23,0.05);
}
/* Done state — disabled via CSS class, not inline style */
.qv2-opt.qv2-opt-done { cursor: default; }
.qv2-opt.qv2-opt-done:hover { border-color: var(--b1); background: var(--bg2); }
.qv2-opt.qv2-opt-correct { border-color: var(--cadet) !important; background: rgba(52,211,153,0.08) !important; }
.qv2-opt.qv2-opt-wrong   { border-color: #f87171 !important; background: rgba(248,113,113,0.07) !important; }
.qv2-opt.qv2-opt-correct .qv2-opt-letter { background: rgba(52,211,153,0.2); color: #34d399; border-color: #34d399; }
.qv2-opt.qv2-opt-wrong   .qv2-opt-letter { background: rgba(248,113,113,0.2); color: #f87171; border-color: #f87171; }

.qv2-opt-letter {
  min-width: 26px; height: 26px; border-radius: 6px;
  border: 1.5px solid var(--b2); display: flex; align-items: center;
  justify-content: center; font-size: 0.72rem; font-weight: 700;
  font-family: 'JetBrains Mono', monospace; color: var(--tx3);
  flex-shrink: 0; background: var(--bg3); transition: all 0.12s;
}
.qv2-opt-text {
  font-size: 0.84rem; line-height: 1.5; color: var(--tx2);
  transition: color 0.12s; padding-top: 2px;
}
.qv2-opt:hover:not(.qv2-opt-done) .qv2-opt-text   { color: var(--tx); }
.qv2-opt.qv2-opt-correct .qv2-opt-text { color: #86efac; }
.qv2-opt.qv2-opt-wrong   .qv2-opt-text { color: #fca5a5; }

/* ── Explanation ── */
.qv2-explanation {
  margin: 0 16px 12px; padding: 12px 14px;
  background: rgba(212,160,23,0.06); border: 1px solid rgba(212,160,23,0.2);
  border-radius: 10px;
}
.qv2-exp-label {
  font-size: 0.68rem; font-weight: 700; color: var(--ac);
  text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 5px;
}
.qv2-exp-text { font-size: 0.81rem; color: var(--tx2); line-height: 1.65; }

/* ── Navigation ── */
.qv2-nav { padding: 10px 16px 16px; display: flex; gap: 8px; }
.qv2-nav-btn {
  padding: 10px 20px; border-radius: 9px; border: 1px solid var(--b1);
  background: var(--bg3); color: var(--tx2); cursor: pointer;
  font-size: 0.82rem; font-weight: 600; transition: all 0.13s; min-height: 42px;
}
.qv2-nav-next { background: linear-gradient(135deg, var(--ac), var(--acD)); border: none; color: #020810; }
.qv2-nav-next:hover { box-shadow: 0 4px 16px rgba(212,160,23,0.3); transform: translateY(-1px); }
.qv2-nav-finish {
  background: linear-gradient(135deg, #34d399, #059669); border: none; color: #020810;
}

/* ── Results Screen ── */
.qv2-results {
  padding: 24px; display: flex; flex-direction: column;
  align-items: center; gap: 12px; text-align: center;
}
.qv2-results-grade  { line-height: 1; }
.qv2-results-score  { font-size: 1.1rem; font-weight: 700; color: var(--tx); }
.qv2-results-bar-wrap {
  width: 100%; max-width: 300px; height: 8px;
  background: var(--bg3); border-radius: 4px; overflow: hidden;
}
.qv2-results-bar {
  height: 100%; border-radius: 4px; transition: width 0.8s ease;
}
.qv2-results-msg  { font-size: 0.83rem; color: var(--tx2); }
.qv2-results-actions {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
  margin-top: 4px; width: 100%;
}

/* ── Wrong Review ── */
.qv2-wrong-list { width: 100%; text-align: left; }
.qv2-wrong-title {
  font-size: 0.75rem; font-weight: 700; color: var(--tx3);
  text-transform: uppercase; letter-spacing: 0.07em;
  margin-bottom: 10px; padding-bottom: 6px;
  border-bottom: 1px solid var(--b0);
}
.qv2-wrong-item {
  padding: 10px 12px; background: var(--bg2);
  border: 1px solid var(--b0); border-radius: 9px;
  margin-bottom: 7px;
}
.qv2-wrong-q   { font-size: 0.8rem; color: var(--tx); margin-bottom: 5px; line-height: 1.5; }
.qv2-wrong-ans { font-size: 0.76rem; color: #86efac; margin-bottom: 4px; }
.qv2-wrong-exp { font-size: 0.73rem; color: var(--tx3); line-height: 1.5; font-style: italic; }

/* ── Mobile ── */
@media (max-width: 768px) {
  .qv2-setup    { padding: 16px; gap: 14px; }
  .qv2-q-text   { padding: 14px 14px 10px; font-size: 0.87rem; }
  .qv2-opts     { padding: 0 12px 12px; gap: 7px; }
  .qv2-opt      { padding: 12px 12px; min-height: 52px; }
  .qv2-opt-text { font-size: 0.82rem; }
  .qv2-chips    { gap: 6px; }
  .qv2-chip     { padding: 8px 13px; min-height: 40px; font-size: 0.8rem; }
  .qv2-results  { padding: 18px 16px; }
  .qv2-results-actions .qv2-start-btn { align-self: stretch; }
  .qv2-nav      { padding: 8px 12px 14px; }
  .qv2-nav-btn  { min-height: 44px; }
  .qv2-explanation { margin: 0 12px 10px; }
}

/* ── Override old quiz CSS that may conflict ── */
#panel-quiz .quiz-wrap { display: none !important; }
  `;
  document.head.appendChild(s);
})();

console.log('%cMarineIQ Quiz v2 — levels + count selector + click fix + results screen', 'color:#d4a017;font-weight:bold');




/* ══ UI OVERHAUL v8 ══ */
/* ═══════════════════════════════════════════════════════════════════════
   UI OVERHAUL v8 — Complete Design Refresh
   • Comprehensive light mode (50+ overrides — every component)
   • Improved dark mode depth, shadows, hover states
   • Better typography hierarchy
   • Polished cards, tabs, sidebar, topbar
   • Smooth micro-interactions throughout
   ═══════════════════════════════════════════════════════════════════════ */

(function uiOverhaul() {
const s = document.createElement('style');
s.id = 'ui-overhaul-v8';
s.textContent = `

/* ══════════════════════════════════════════════════════════
   DARK MODE — Depth + Polish Improvements
   ══════════════════════════════════════════════════════════ */

/* Better base backgrounds */
body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

/* Topbar — refined */
.topbar {
  background: rgba(2,8,16,0.97) !important;
  border-bottom: 1px solid rgba(212,160,23,0.18) !important;
  box-shadow: 0 1px 20px rgba(0,0,0,0.4) !important;
}
.logo {
  font-weight: 800 !important; letter-spacing: -0.01em !important;
  font-size: 1.1rem !important;
}
.tbtn {
  border: 1px solid var(--b1) !important;
  border-radius: 8px !important;
  transition: all 0.15s ease !important;
  font-size: 0.62rem !important;
  letter-spacing: 0.04em !important;
  background: var(--bg2) !important;
}
.tbtn:hover {
  border-color: var(--ac) !important;
  color: var(--acL) !important;
  background: rgba(212,160,23,0.06) !important;
}

/* Sidebar — better hierarchy */
.sidebar {
  background: var(--bg) !important;
  border-right: 1px solid var(--b0) !important;
  box-shadow: 4px 0 24px rgba(0,0,0,0.3) !important;
}
.sb-section {
  font-size: 0.58rem !important;
  letter-spacing: 0.12em !important;
  color: var(--tx3) !important;
  padding: 14px 14px 5px !important;
  text-transform: uppercase !important;
}
.sb-topic {
  padding: 9px 14px !important;
  border-radius: 0 !important;
  border-left: 3px solid transparent !important;
  transition: all 0.12s !important;
  font-size: 0.8rem !important;
}
.sb-topic:hover:not(.active) {
  background: var(--bg2) !important;
  border-left-color: var(--b2) !important;
}
.sb-topic.active {
  background: rgba(212,160,23,0.07) !important;
  border-left-color: var(--ac) !important;
  color: var(--tx) !important;
}

/* ── Home screen cards — better depth ── */
.stat-card {
  background: var(--bg1) !important;
  border: 1px solid var(--b0) !important;
  border-radius: 14px !important;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease !important;
}
.stat-card:hover {
  border-color: var(--b1) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
}
.stat-num { font-size: 1.8rem !important; font-weight: 800 !important; }

.continue-card {
  border-radius: 14px !important;
  transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s !important;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2) !important;
}
.continue-card:hover { transform: translateY(-2px) !important; }

/* ── Rank cards — more depth ── */
.rank-card {
  border-radius: 16px !important;
  border: 1px solid var(--b1) !important;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25) !important;
}

/* ── Level page banner ── */
.lp-banner {
  box-shadow: 0 4px 32px rgba(0,0,0,0.3) !important;
}

/* ── Exam paper cards ── */
.ep-card {
  transition: border-color 0.15s, background 0.15s, transform 0.15s !important;
}
.ep-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0,0,0,0.25) !important;
}

/* ── Multimodal tabs ── */
.mm-tabs {
  background: var(--bg2) !important;
  border: 1px solid var(--b0) !important;
  border-radius: 12px !important;
  padding: 4px !important;
}
.mm-tab {
  border-radius: 9px !important;
  font-size: 0.74rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.02em !important;
  transition: all 0.14s !important;
}
.mm-tab.active {
  background: var(--bg4) !important;
  color: var(--acL) !important;
  box-shadow: 0 1px 6px rgba(0,0,0,0.3) !important;
}

/* ── AI answer card ── */
.answer-card {
  border-radius: 16px !important;
  border-color: var(--b0) !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2) !important;
}
.ans-body {
  font-size: 0.91rem !important;
  line-height: 1.9 !important;
}
.ans-body code {
  background: var(--bg3) !important;
  border: 1px solid var(--b1) !important;
  border-radius: 5px !important;
  padding: 1px 6px !important;
  font-size: 0.82em !important;
  color: var(--acL) !important;
}
.ans-formula {
  border-radius: 10px !important;
  margin: 10px 0 !important;
}

/* ── Formula cards ── */
.formula-card {
  border-radius: 12px !important;
  border: 1px solid var(--b0) !important;
  transition: border-color 0.14s, box-shadow 0.14s !important;
  background: var(--bg1) !important;
}
.formula-card:hover {
  border-color: rgba(212,160,23,0.3) !important;
  box-shadow: 0 4px 16px rgba(212,160,23,0.08) !important;
}

/* ── Flashcards ── */
.flashcard-wrap {
  border-radius: 16px !important;
  box-shadow: 0 8px 40px rgba(0,0,0,0.35) !important;
}

/* ── Video cards ── */
.yt-card {
  border-radius: 14px !important;
  transition: border-color 0.14s, transform 0.14s, box-shadow 0.14s !important;
}
.yt-card:hover {
  border-color: var(--b2) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(0,0,0,0.25) !important;
}

/* ── Diagram cards ── */
.diag-card {
  border-radius: 14px !important;
  transition: border-color 0.14s, box-shadow 0.14s !important;
}
.diag-card:hover {
  border-color: var(--b2) !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.25) !important;
}

/* ── Year syllabus cards ── */
.year-card {
  border-radius: 14px !important;
  transition: border-color 0.14s, box-shadow 0.14s !important;
}
.year-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important; }

/* ── Modal ── */
.modal-box {
  border-radius: 20px !important;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6) !important;
}

/* ── Search input ── */
.search-input {
  border-radius: 12px !important;
  font-size: 0.9rem !important;
}
.search-wrap { border-radius: 12px !important; }

/* ── Quiz options (dark) ── */
.qv2-opt {
  border-radius: 11px !important;
  transition: border-color 0.12s, background 0.12s, transform 0.08s !important;
}
.qv2-opt:hover:not(.qv2-opt-done) {
  transform: translateX(2px) !important;
}

/* ── Progress bars ── */
.qv2-progress-bar, .qv2-results-bar {
  border-radius: 4px !important;
  background: linear-gradient(90deg, var(--ac), var(--acL)) !important;
}

/* ══════════════════════════════════════════════════════════
   LIGHT MODE — Complete rebuild, every component
   Clean maritime paper aesthetic: warm whites, navy ink, gold accents
   ══════════════════════════════════════════════════════════ */

body.light-mode {
  /* ── Core palette ── */
  --bg:   #f4f7fb;   /* warm off-white page */
  --bg1:  #ffffff;   /* pure white cards */
  --bg2:  #f0f4f8;   /* subtle tinted surface */
  --bg3:  #e8edf5;   /* slightly deeper tint */
  --bg4:  #dde4ef;   /* deepest light bg */

  /* Borders — visible but gentle */
  --b0: #dde4ee;
  --b1: #c8d3e2;
  --b2: #aab8cc;

  /* Typography — deep navy ink */
  --tx:  #0d1e35;
  --tx2: #2c4a6a;
  --tx3: #6680a0;

  /* Accent — deep maritime gold (readable on light) */
  --ac:  #b07d0a;
  --acL: #c89010;
  --acD: #8a6008;

  /* Rank colors — kept vivid for contrast */
  --cadet: #16a34a;
  --c4:    #2563eb;
  --c3:    #d97706;
  --c2:    #db2777;
  --c1:    #7c3aed;
}

/* ── Body background ── */
body.light-mode { background: var(--bg) !important; }

/* ── Topbar ── */
body.light-mode .topbar {
  background: rgba(255,255,255,0.97) !important;
  border-bottom: 1px solid var(--b0) !important;
  box-shadow: 0 1px 16px rgba(13,30,53,0.08) !important;
}
body.light-mode .logo { color: var(--tx) !important; }
body.light-mode .logo em { color: var(--ac) !important; }
body.light-mode .logo-anchor { color: var(--ac) !important; }

/* ── Topbar buttons ── */
body.light-mode .tbtn {
  background: var(--bg2) !important;
  border-color: var(--b1) !important;
  color: var(--tx2) !important;
}
body.light-mode .tbtn:hover {
  background: white !important;
  border-color: var(--ac) !important;
  color: var(--ac) !important;
  box-shadow: 0 2px 8px rgba(176,125,10,0.15) !important;
}
body.light-mode .tbtn.on {
  background: rgba(176,125,10,0.1) !important;
  border-color: var(--ac) !important;
  color: var(--ac) !important;
}

/* Breadcrumb */
body.light-mode .breadcrumb { color: var(--tx3) !important; }
body.light-mode .bc-item { color: var(--tx3) !important; }
body.light-mode .bc-item.active { color: var(--tx) !important; }

/* Mode toggle */
body.light-mode .mode-toggle {
  background: var(--bg3) !important;
  border-color: var(--b1) !important;
}
body.light-mode .mode-toggle-knob {
  background: var(--ac) !important;
  transform: translateX(14px) !important;
}

/* Streak badge */
body.light-mode .streak-badge {
  background: rgba(176,125,10,0.08) !important;
  border-color: rgba(176,125,10,0.25) !important;
  color: var(--ac) !important;
}

/* ── Sidebar ── */
body.light-mode .sidebar {
  background: #ffffff !important;
  border-right: 1px solid var(--b0) !important;
  box-shadow: 4px 0 20px rgba(13,30,53,0.07) !important;
}
body.light-mode .sb-section { color: var(--tx3) !important; }
body.light-mode .sb-section-badge {
  background: var(--bg3) !important;
  color: var(--tx3) !important;
}
body.light-mode .sb-topic {
  color: var(--tx2) !important;
  border-left-color: transparent !important;
}
body.light-mode .sb-topic:hover:not(.active) {
  background: var(--bg2) !important;
  color: var(--tx) !important;
  border-left-color: var(--b1) !important;
}
body.light-mode .sb-topic.active {
  background: rgba(176,125,10,0.07) !important;
  border-left-color: var(--ac) !important;
  color: var(--tx) !important;
}
body.light-mode .sb-topic .sb-diff-dot { opacity: 0.85 !important; }
body.light-mode .sb-time-est,
body.light-mode .sb-paper-tag { color: var(--tx3) !important; }
body.light-mode .sb-bk-btn { color: var(--b2) !important; }
body.light-mode .sb-bk-btn.bookmarked { color: var(--ac) !important; }

/* Sidebar quick access */
body.light-mode .sb-quick-section { border-bottom-color: var(--b0) !important; }
body.light-mode .sb-recent-item {
  background: var(--bg2) !important;
  color: var(--tx2) !important;
  border-color: var(--b0) !important;
}
body.light-mode .sb-recent-item:hover { background: var(--bg3) !important; color: var(--tx) !important; }

/* Sidebar progress bar */
body.light-mode .sb-progress-bar { background: var(--bg2) !important; border-top-color: var(--b0) !important; }
body.light-mode .sb-prog-fill { background: var(--ac) !important; }
body.light-mode .sb-prog-label { color: var(--tx3) !important; }

/* ── Home screen ── */
body.light-mode .home-screen { background: transparent !important; }
body.light-mode .home-title { color: var(--tx) !important; }
body.light-mode .home-title em {
  background: linear-gradient(135deg, var(--ac), #2563eb);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
body.light-mode .home-sub { color: var(--tx2) !important; }
body.light-mode .home-source-strip { background: var(--bg2) !important; border-color: var(--b0) !important; color: var(--tx3) !important; }
body.light-mode .home-source-dot { background: var(--ac) !important; }

/* ── Stat cards ── */
body.light-mode .stat-card {
  background: #ffffff !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 12px rgba(13,30,53,0.07) !important;
}
body.light-mode .stat-card:hover {
  box-shadow: 0 6px 24px rgba(13,30,53,0.12) !important;
  border-color: var(--b1) !important;
}
body.light-mode .stat-num { color: var(--tx) !important; }
body.light-mode .stat-label { color: var(--tx3) !important; }

/* ── Continue card ── */
body.light-mode .continue-card {
  background: linear-gradient(135deg, #ffffff, var(--bg2)) !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 16px rgba(13,30,53,0.08) !important;
}
body.light-mode .continue-card:hover {
  border-color: var(--ac) !important;
  box-shadow: 0 6px 24px rgba(176,125,10,0.12) !important;
}
body.light-mode .continue-title { color: var(--tx) !important; }
body.light-mode .continue-meta  { color: var(--tx3) !important; }
body.light-mode .continue-play  {
  background: linear-gradient(135deg, var(--ac), var(--acD)) !important;
  color: white !important;
}

/* ── Home tabs ── */
body.light-mode .home-tab {
  color: var(--tx3) !important;
  border-color: var(--b0) !important;
  background: white !important;
}
body.light-mode .home-tab.active {
  color: var(--ac) !important;
  border-color: var(--ac) !important;
  background: rgba(176,125,10,0.06) !important;
}

/* ── Info cards ── */
body.light-mode .info-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 12px rgba(13,30,53,0.06) !important;
}
body.light-mode .ic-title { color: var(--tx) !important; }
body.light-mode .ic-text  { color: var(--tx2) !important; }

/* ── Rank cards ── */
body.light-mode .rank-card {
  background: linear-gradient(145deg, #ffffff, var(--bg2)) !important;
  border-color: var(--b0) !important;
  box-shadow: 0 4px 20px rgba(13,30,53,0.08) !important;
}
body.light-mode .rank-card:hover {
  box-shadow: 0 10px 36px rgba(13,30,53,0.14) !important;
}
body.light-mode .rc-number { color: var(--tx3) !important; }
body.light-mode .rc-sub    { color: var(--tx2) !important; }
body.light-mode .rc-elig-label { color: var(--tx3) !important; }

/* ── Level page ── */
body.light-mode .level-page { background: transparent !important; }
body.light-mode .lp-banner  { box-shadow: 0 4px 28px rgba(13,30,53,0.12) !important; }
body.light-mode .lp-stage   { opacity: 0.7 !important; }
body.light-mode .lp-desc    { opacity: 0.88 !important; }

body.light-mode .elig-item {
  background: white !important;
  border-color: var(--b0) !important;
  color: var(--tx2) !important;
  box-shadow: 0 1px 6px rgba(13,30,53,0.06) !important;
}
body.light-mode .ep-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 10px rgba(13,30,53,0.06) !important;
}
body.light-mode .ep-card:hover {
  box-shadow: 0 6px 20px rgba(13,30,53,0.1) !important;
}
body.light-mode .ep-label { color: var(--tx3) !important; }
body.light-mode .ep-title { color: var(--tx) !important; }
body.light-mode .ep-sub   { color: var(--tx2) !important; }

/* ── Multimodal tabs ── */
body.light-mode .mm-tabs {
  background: var(--bg2) !important;
  border-color: var(--b0) !important;
}
body.light-mode .mm-tab { color: var(--tx3) !important; }
body.light-mode .mm-tab:hover { color: var(--tx) !important; background: white !important; }
body.light-mode .mm-tab.active {
  background: white !important;
  color: var(--ac) !important;
  box-shadow: 0 1px 6px rgba(13,30,53,0.1) !important;
}

/* ── Topic zone header ── */
body.light-mode .tz-header { border-bottom-color: var(--b0) !important; }
body.light-mode .tz-complete-btn {
  border-color: var(--b1) !important;
  color: var(--tx3) !important;
  background: white !important;
}
body.light-mode .tz-complete-btn.studied {
  border-color: var(--cadet) !important;
  color: var(--cadet) !important;
  background: rgba(22,163,74,0.06) !important;
}

/* ── Topic intro card ── */
body.light-mode .tz-intro-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 12px rgba(13,30,53,0.06) !important;
}
body.light-mode .tz-intro-title { color: var(--tx) !important; }
body.light-mode .tz-intro-desc  { color: var(--tx2) !important; }
body.light-mode .tz-intro-hint  { color: var(--tx3) !important; }
body.light-mode .tz-intro-hint kbd {
  background: var(--bg3) !important;
  border-color: var(--b1) !important;
  color: var(--tx2) !important;
}

/* ── Diagram cards ── */
body.light-mode .diag-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 12px rgba(13,30,53,0.07) !important;
}
body.light-mode .diag-label {
  background: var(--bg2) !important;
  color: var(--tx3) !important;
  border-top-color: var(--b0) !important;
}
body.light-mode .ai-diag-wrap {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 12px rgba(13,30,53,0.07) !important;
}
body.light-mode .ai-diag-placeholder {
  background: linear-gradient(135deg, white, var(--bg2)) !important;
}
body.light-mode .adp-title { color: var(--tx) !important; }
body.light-mode .adp-text  { color: var(--tx2) !important; }
body.light-mode .ai-diag-footer {
  background: var(--bg2) !important;
  border-top-color: var(--b0) !important;
}
body.light-mode .ai-diag-label { color: var(--tx3) !important; }
body.light-mode .ai-diag-act {
  background: white !important;
  border-color: var(--b1) !important;
  color: var(--tx3) !important;
}
body.light-mode .ai-diag-act:hover { border-color: var(--ac) !important; color: var(--ac) !important; }

/* ── Video cards ── */
body.light-mode .yt-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 10px rgba(13,30,53,0.06) !important;
}
body.light-mode .yt-card:hover { box-shadow: 0 6px 20px rgba(13,30,53,0.1) !important; }
body.light-mode .yt-title   { color: var(--tx) !important; }
body.light-mode .yt-channel { color: var(--tx3) !important; }
body.light-mode .yt-thumb   { background: var(--bg3) !important; }
body.light-mode .yt-play    { background: #dc2626 !important; }

/* ── Formula cards ── */
body.light-mode .formula-card,
body.light-mode .fc-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 10px rgba(13,30,53,0.06) !important;
}
body.light-mode .formula-card:hover {
  border-color: rgba(176,125,10,0.3) !important;
  box-shadow: 0 6px 20px rgba(176,125,10,0.08) !important;
}
body.light-mode .fc-label  { color: var(--tx) !important; }
body.light-mode .fc-eq     { color: var(--ac) !important; }
body.light-mode .fc-note   { color: var(--tx3) !important; }

/* ── Flashcards ── */
body.light-mode .flashcard-wrap {
  box-shadow: 0 8px 40px rgba(13,30,53,0.15) !important;
}
body.light-mode .fc-front {
  background: white !important;
  border-color: var(--b0) !important;
  color: var(--tx) !important;
}
body.light-mode .fc-back {
  background: linear-gradient(135deg, #fffbf0, var(--bg2)) !important;
  border-color: rgba(176,125,10,0.2) !important;
  color: var(--tx) !important;
}
body.light-mode .fc-header {
  background: var(--bg2) !important;
  border-bottom-color: var(--b0) !important;
  color: var(--tx3) !important;
}
body.light-mode .fc-ctrl-btn {
  background: white !important;
  border-color: var(--b0) !important;
  color: var(--tx2) !important;
}
body.light-mode .fc-ctrl-btn:hover { border-color: var(--ac) !important; color: var(--ac) !important; }
body.light-mode .fc-question { color: var(--tx) !important; }
body.light-mode .fc-answer   { color: var(--tx2) !important; }
body.light-mode .fc-prog-label { color: var(--tx3) !important; }

/* ── AI Search section ── */
body.light-mode .ai-section { background: transparent !important; }
body.light-mode .model-pill {
  background: white !important;
  border-color: var(--b0) !important;
  color: var(--tx2) !important;
  box-shadow: 0 1px 4px rgba(13,30,53,0.06) !important;
}
body.light-mode .model-pill:hover { border-color: var(--b1) !important; }
body.light-mode .model-pill.active {
  border-color: var(--ac) !important;
  background: rgba(176,125,10,0.06) !important;
}
body.light-mode .model-pill.active .mp-name { color: var(--ac) !important; }
body.light-mode .mp-sub { color: var(--tx3) !important; }

body.light-mode .search-wrap {
  background: white !important;
  border-color: var(--b1) !important;
  box-shadow: 0 2px 12px rgba(13,30,53,0.08) !important;
}
body.light-mode .search-input {
  background: transparent !important;
  color: var(--tx) !important;
}
body.light-mode .search-input::placeholder { color: var(--tx3) !important; }
body.light-mode .search-input:focus {
  border-color: var(--ac) !important;
  box-shadow: 0 0 0 3px rgba(176,125,10,0.1) !important;
}

/* ── Answer card ── */
body.light-mode .answer-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 4px 24px rgba(13,30,53,0.1) !important;
}
body.light-mode .ans-header {
  background: var(--bg2) !important;
  border-bottom-color: var(--b0) !important;
}
body.light-mode .ans-query  { color: var(--tx2) !important; }
body.light-mode .ans-body   { color: var(--tx) !important; }
body.light-mode .ans-body code {
  background: var(--bg3) !important;
  border-color: var(--b1) !important;
  color: var(--ac) !important;
}
body.light-mode .ans-formula {
  background: rgba(176,125,10,0.05) !important;
  border-color: var(--b0) !important;
  border-left-color: var(--ac) !important;
}
body.light-mode .ans-formula-label { color: var(--ac) !important; }
body.light-mode .ans-note   { color: var(--tx3) !important; }
body.light-mode .ans-actions { border-top-color: var(--b0) !important; }
body.light-mode .action-btn { color: var(--tx3) !important; border-color: var(--b1) !important; }
body.light-mode .action-btn:hover { color: var(--tx) !important; border-color: var(--b2) !important; }
body.light-mode .action-btn.primary {
  background: linear-gradient(135deg, var(--ac), var(--acD)) !important;
  color: white !important;
  border-color: var(--ac) !important;
}

/* Error/thinking panels */
body.light-mode .thinking-wrap {
  background: var(--bg2) !important;
  border-color: var(--b0) !important;
}
body.light-mode .think-label { color: var(--tx2) !important; }
body.light-mode .think-detail { color: var(--tx3) !important; }
body.light-mode #errorEl {
  background: rgba(220,38,38,0.04) !important;
  border-color: rgba(220,38,38,0.2) !important;
}
body.light-mode #errorMsg { color: #991b1b !important; }

/* ── Quiz v2 ── */
body.light-mode .quiz-v2-wrap {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 16px rgba(13,30,53,0.08) !important;
}
body.light-mode .qv2-setup-title { color: var(--tx) !important; }
body.light-mode .qv2-setting-label { color: var(--tx3) !important; }
body.light-mode .qv2-chip {
  background: white !important;
  border-color: var(--b1) !important;
  color: var(--tx2) !important;
}
body.light-mode .qv2-chip:hover { border-color: var(--ac) !important; color: var(--ac) !important; }
body.light-mode .qv2-chip-active {
  border-color: var(--ac) !important;
  background: rgba(176,125,10,0.07) !important;
  color: var(--ac) !important;
}
body.light-mode .qv2-setup-note { color: var(--tx3) !important; }
body.light-mode .qv2-loading-label { color: var(--tx) !important; }
body.light-mode .qv2-loading-sub   { color: var(--tx3) !important; }
body.light-mode .qv2-q-text  { color: var(--tx) !important; }
body.light-mode .qv2-qnum    { color: var(--tx3) !important; }
body.light-mode .qv2-diff-badge { background: var(--bg2) !important; border-color: var(--b1) !important; color: var(--tx2) !important; }
body.light-mode .qv2-opt {
  background: var(--bg2) !important;
  border-color: var(--b0) !important;
}
body.light-mode .qv2-opt:hover:not(.qv2-opt-done) {
  background: white !important;
  border-color: var(--ac) !important;
  box-shadow: 0 2px 8px rgba(176,125,10,0.1) !important;
}
body.light-mode .qv2-opt-letter {
  background: white !important;
  border-color: var(--b1) !important;
  color: var(--tx3) !important;
}
body.light-mode .qv2-opt-text { color: var(--tx2) !important; }
body.light-mode .qv2-opt:hover:not(.qv2-opt-done) .qv2-opt-text { color: var(--tx) !important; }
body.light-mode .qv2-opt.qv2-opt-correct { background: rgba(22,163,74,0.07) !important; }
body.light-mode .qv2-opt.qv2-opt-wrong   { background: rgba(220,38,38,0.05) !important; }
body.light-mode .qv2-explanation {
  background: rgba(176,125,10,0.05) !important;
  border-color: rgba(176,125,10,0.2) !important;
}
body.light-mode .qv2-exp-label { color: var(--ac) !important; }
body.light-mode .qv2-exp-text  { color: var(--tx2) !important; }
body.light-mode .qv2-nav-btn { background: white !important; border-color: var(--b1) !important; color: var(--tx2) !important; }
body.light-mode .qv2-results { background: transparent !important; }
body.light-mode .qv2-results-score { color: var(--tx) !important; }
body.light-mode .qv2-results-bar-wrap { background: var(--bg3) !important; }
body.light-mode .qv2-results-msg { color: var(--tx2) !important; }
body.light-mode .qv2-wrong-title { color: var(--tx3) !important; border-bottom-color: var(--b0) !important; }
body.light-mode .qv2-wrong-item { background: var(--bg2) !important; border-color: var(--b0) !important; }
body.light-mode .qv2-wrong-q   { color: var(--tx) !important; }
body.light-mode .qv2-wrong-exp { color: var(--tx3) !important; }

/* ── Year syllabus ── */
body.light-mode .year-card {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 2px 12px rgba(13,30,53,0.07) !important;
}
body.light-mode .year-header { border-bottom-color: var(--b0) !important; }
body.light-mode .year-title  { color: var(--tx) !important; }
body.light-mode .year-sub    { color: var(--tx3) !important; }
body.light-mode .subject-row { border-bottom-color: var(--b0) !important; }
body.light-mode .subject-name { color: var(--tx) !important; }
body.light-mode .subject-code { color: var(--tx3) !important; }
body.light-mode .subject-tag  { background: var(--bg3) !important; border-color: var(--b1) !important; color: var(--tx3) !important; }
body.light-mode .year-milestone { background: rgba(22,163,74,0.06) !important; border-color: rgba(22,163,74,0.2) !important; color: #15803d !important; }
body.light-mode .year-exam-note { background: rgba(176,125,10,0.05) !important; border-color: rgba(176,125,10,0.2) !important; color: #92400e !important; }

/* ── Global search overlay ── */
body.light-mode .global-search-overlay { background: rgba(13,30,53,0.5) !important; backdrop-filter: blur(6px) !important; }
body.light-mode .gs-box {
  background: white !important;
  border-color: var(--b1) !important;
  box-shadow: 0 24px 60px rgba(13,30,53,0.2) !important;
}
body.light-mode .gs-input { background: white !important; color: var(--tx) !important; border-color: var(--b0) !important; }
body.light-mode .gs-input::placeholder { color: var(--tx3) !important; }
body.light-mode .gs-result { border-bottom-color: var(--b0) !important; }
body.light-mode .gs-result:hover,
body.light-mode .gs-result.selected { background: var(--bg2) !important; }
body.light-mode .gs-r-title { color: var(--tx) !important; }
body.light-mode .gs-r-sub   { color: var(--tx3) !important; }
body.light-mode .gs-r-diff  { opacity: 0.85 !important; }

/* ── Notes drawer ── */
body.light-mode .notes-drawer {
  background: white !important;
  border-left-color: var(--b0) !important;
  box-shadow: -8px 0 32px rgba(13,30,53,0.12) !important;
}
body.light-mode .nd-header { border-bottom-color: var(--b0) !important; color: var(--tx) !important; }
body.light-mode .nd-note   { background: var(--bg2) !important; border-color: var(--b0) !important; color: var(--tx2) !important; }
body.light-mode .nd-textarea {
  background: var(--bg2) !important;
  border-color: var(--b0) !important;
  color: var(--tx) !important;
}

/* ── Modal ── */
body.light-mode .modal-overlay { background: rgba(13,30,53,0.4) !important; }
body.light-mode .modal-box {
  background: white !important;
  border-color: var(--b0) !important;
  box-shadow: 0 24px 80px rgba(13,30,53,0.2) !important;
}
body.light-mode .modal-title  { color: var(--tx) !important; }
body.light-mode .provider-card { background: var(--bg2) !important; border-color: var(--b0) !important; }
body.light-mode .provider-card:hover { background: white !important; border-color: var(--ac) !important; }
body.light-mode .provider-card.selected { border-color: var(--ac) !important; background: rgba(176,125,10,0.06) !important; }
body.light-mode .pc-name { color: var(--tx) !important; }
body.light-mode .pc-free { color: var(--cadet) !important; }
body.light-mode .modal-input {
  background: var(--bg2) !important;
  border-color: var(--b1) !important;
  color: var(--tx) !important;
}
body.light-mode .modal-input:focus { border-color: var(--ac) !important; }
body.light-mode .modal-save {
  background: linear-gradient(135deg, var(--ac), var(--acD)) !important;
  color: white !important;
  border-color: var(--ac) !important;
}
body.light-mode .setup-step { color: var(--tx2) !important; }
body.light-mode .step-num { background: rgba(176,125,10,0.1) !important; color: var(--ac) !important; border-color: rgba(176,125,10,0.3) !important; }

/* ── Topic nav footer ── */
body.light-mode .topic-nav-footer { border-top-color: var(--b0) !important; background: var(--bg2) !important; }
body.light-mode .tnf-btn { background: white !important; border-color: var(--b0) !important; color: var(--tx2) !important; }
body.light-mode .tnf-btn:hover { border-color: var(--ac) !important; color: var(--ac) !important; }
body.light-mode .tnf-label { color: var(--tx3) !important; }
body.light-mode .tnf-title { color: var(--tx) !important; }

/* ── Scrollbar in light mode ── */
body.light-mode ::-webkit-scrollbar-track { background: var(--bg2); }
body.light-mode ::-webkit-scrollbar-thumb { background: var(--b1); }
body.light-mode ::-webkit-scrollbar-thumb:hover { background: var(--ac); }

/* ── Floating action button ── */
body.light-mode #fabAsk {
  box-shadow: 0 4px 20px rgba(176,125,10,0.3) !important;
}

/* ══════════════════════════════════════════════════════════
   TRANSITION — smooth between modes
   ══════════════════════════════════════════════════════════ */
body, .topbar, .sidebar, .rank-card, .stat-card, .answer-card,
.formula-card, .yt-card, .diag-card, .ep-card, .continue-card,
.year-card, .modal-box, .qv2-opt, .mm-tab, .sb-topic,
.search-wrap, .ai-diag-wrap, .flashcard-wrap, .quiz-v2-wrap {
  transition-property: background, border-color, color, box-shadow !important;
  transition-duration: 0.25s !important;
  transition-timing-function: ease !important;
}

/* ══════════════════════════════════════════════════════════
   BETTER LIGHT MODE TOGGLE BUTTON
   ══════════════════════════════════════════════════════════ */
.mode-toggle {
  width: 46px !important; height: 26px !important;
  border-radius: 13px !important;
  cursor: pointer !important;
  position: relative !important;
  background: var(--bg3) !important;
  border: 1px solid var(--b1) !important;
  transition: background 0.25s, border-color 0.25s !important;
  flex-shrink: 0 !important;
}
.mode-toggle-knob {
  width: 18px !important; height: 18px !important;
  border-radius: 50% !important;
  position: absolute !important;
  top: 3px !important; left: 3px !important;
  background: var(--tx3) !important;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), background 0.25s !important;
}
body.light-mode .mode-toggle {
  background: #e0f0ff !important;
  border-color: #acd3f0 !important;
}
body.light-mode .mode-toggle-knob {
  transform: translateX(20px) !important;
  background: #f59e0b !important;
}

/* ── Toggle icons via pseudo-elements ── */
.mode-toggle::before { content: '🌙'; position: absolute; right: 3px; top: 3px; font-size: 11px; line-height: 18px; pointer-events: none; }
body.light-mode .mode-toggle::before { content: '☀️'; left: 3px; right: auto; }

/* ══════════════════════════════════════════════════════════
   GLOBAL MICRO-IMPROVEMENTS
   ══════════════════════════════════════════════════════════ */

/* Better focus rings */
button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--ac) !important;
  outline-offset: 2px !important;
}

/* Smoother page transitions */
.home-screen, .level-page { animation-duration: 0.3s !important; }

/* Better text selection */
::selection { background: rgba(212,160,23,0.25); color: var(--tx); }
body.light-mode ::selection { background: rgba(176,125,10,0.2); }

/* Code blocks in answers */
.ans-body pre {
  background: var(--bg2) !important;
  border: 1px solid var(--b1) !important;
  border-radius: 10px !important;
  padding: 14px !important;
  overflow-x: auto !important;
  font-size: 0.82rem !important;
}
body.light-mode .ans-body pre { background: var(--bg2) !important; }

/* Better link styling in answers */
.ans-body a { color: var(--acL) !important; text-decoration: underline; text-underline-offset: 3px; }
body.light-mode .ans-body a { color: var(--ac) !important; }

/* ── Source strip improvement ── */
.home-source-strip {
  display: flex !important; align-items: center !important;
  gap: 8px !important; flex-wrap: wrap !important;
  justify-content: center !important;
  background: var(--bg2) !important;
  border: 1px solid var(--b0) !important;
  border-radius: 30px !important;
  padding: 6px 16px !important;
  font-size: 0.62rem !important;
  letter-spacing: 0.04em !important;
  width: fit-content !important;
  margin: 12px auto 0 !important;
}

`;
document.head.appendChild(s);
})();




/* ══ iOS MODAL FIX ══ */
/* ═══════════════════════════════════════════════════════════════════════
   iOS MODAL FIX — Keyboard push, viewport, safe area, Change API button
   ═══════════════════════════════════════════════════════════════════════ */

(function fixIOSModal() {
  const style = document.createElement('style');
  style.id = 'ios-modal-fix';
  style.textContent = `

/* ══ OVERLAY BASE — scrollable container ══ */
.overlay {
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
}

/* ══ DESKTOP: keep centered ══ */
@media (min-width: 600px) {
  .overlay.open {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .modal-box {
    max-height: 88vh !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
}

/* ══ MOBILE/iPHONE: scroll from top ══ */
@media (max-width: 599px) {
  .overlay {
    display: none;
    position: fixed !important;
    top: 0 !important; left: 0 !important;
    right: 0 !important; bottom: 0 !important;
    /* dvh = dynamic viewport height — shrinks when keyboard opens */
    min-height: 100dvh !important;
    min-height: 100vh !important; /* Safari <15 fallback */
    background: rgba(0,0,0,0.78) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    z-index: 500 !important;
    /* Scroll from top — no centering, content flows naturally */
    align-items: flex-start !important;
    justify-content: center !important;
    padding: 20px 14px !important;
    padding-top: max(20px, env(safe-area-inset-top, 20px)) !important;
    padding-bottom: max(20px, env(safe-area-inset-bottom, 20px)) !important;
    box-sizing: border-box !important;
  }
  .overlay.open {
    display: block !important; /* block not flex — full scroll */
  }

  .modal-box {
    width: 100% !important;
    max-width: 100% !important;
    max-height: none !important;        /* no height cap — overlay scrolls */
    overflow-y: visible !important;
    border-radius: 16px !important;
    padding: 20px 16px !important;
    margin: 0 auto 30px !important;
    box-sizing: border-box !important;
    /* Prevent box from being cut off */
    position: relative !important;
    z-index: 1 !important;
  }

  /* Provider grid — 2 columns max, squeeze on iPhone SE */
  .provider-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 7px !important;
    margin: 10px 0 !important;
  }
  @media (max-width: 380px) {
    .provider-grid { grid-template-columns: 1fr !important; }
  }
  .provider-card { padding: 9px 10px !important; border-radius: 9px !important; }
  .pc-name { font-size: 0.65rem !important; }
  .pc-free, .pc-paid { font-size: 0.58rem !important; }

  /* Setup guide — compact */
  .setup-guide { padding: 9px 11px !important; font-size: 0.75rem !important; margin: 8px 0 !important; line-height: 1.6 !important; }
  .setup-step { padding: 4px 0 !important; gap: 7px !important; align-items: flex-start !important; }
  .step-num { width: 20px !important; height: 20px !important; min-width: 20px !important; font-size: 0.62rem !important; flex-shrink: 0 !important; }

  /* ── API key input — CRITICAL: font-size 16px prevents iOS zoom ── */
  .modal-input {
    font-size: 16px !important;
    -webkit-text-size-adjust: none !important;
    padding: 14px 14px !important;
    border-radius: 10px !important;
    min-height: 50px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }

  /* ── Buttons — full width stacked, thumb-friendly ── */
  .modal-actions {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin-top: 14px !important;
    width: 100% !important;
  }
  .modal-save {
    order: 1 !important; /* Save first / on top */
    width: 100% !important;
    min-height: 52px !important;
    border-radius: 12px !important;
    font-size: 0.9rem !important;
    font-weight: 700 !important;
  }
  .modal-cancel {
    order: 2 !important; /* Cancel second / below */
    width: 100% !important;
    min-height: 44px !important;
    border-radius: 12px !important;
    font-size: 0.84rem !important;
  }

  /* Modal title compact */
  .modal-title { font-size: 0.92rem !important; margin-bottom: 3px !important; }

  /* Key detected badge */
  #keyDetectedBadge { font-size: 0.7rem !important; min-height: 14px !important; }

  /* Quota fix buttons — stacked */
  .quota-fix-btns {
    flex-direction: column !important;
    gap: 7px !important;
    width: 100% !important;
  }
  .quota-fix-btns button,
  .quota-fix-btns a {
    width: 100% !important;
    text-align: center !important;
    justify-content: center !important;
    min-height: 44px !important;
    border-radius: 9px !important;
    display: flex !important;
    align-items: center !important;
  }
}

/* ══ API SETTINGS BUTTON — more visible ══ */
#btnApiSettings {
  background: rgba(212,160,23,0.08) !important;
  border-color: rgba(212,160,23,0.25) !important;
  color: var(--acL) !important;
}
#btnApiSettings:hover {
  background: rgba(212,160,23,0.15) !important;
  border-color: var(--ac) !important;
}

/* Always show label on mobile for this button */
@media (max-width: 768px) {
  #btnApiSettings .tbtn-label { display: inline !important; }
}

/* ══ Light mode modal fixes ══ */
body.light-mode .overlay { background: rgba(13,30,53,0.5) !important; }
body.light-mode .modal-box { background: white !important; }

  `;
  document.head.appendChild(style);

  /* ══════════════════════════════════════════════════════════
     JS: visualViewport — scroll overlay when keyboard appears
     This is the only reliable iOS keyboard fix
     ══════════════════════════════════════════════════════════ */

  const isMobile = () => window.innerWidth < 600;

  function onViewportResize() {
    const overlay = document.getElementById('apiOverlay');
    if (!overlay || !overlay.classList.contains('open')) return;
    if (!isMobile()) return;

    // When keyboard opens, iOS shrinks window.innerHeight
    // We need to scroll the focused input into view inside the overlay
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
      setTimeout(() => {
        active.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // Use visualViewport API if available (modern iOS Safari 13+)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', onViewportResize);
    window.visualViewport.addEventListener('scroll', onViewportResize);
  }

  // Also listen for focus events on inputs inside the modal
  document.addEventListener('focusin', function(e) {
    if (!isMobile()) return;
    const overlay = document.getElementById('apiOverlay');
    if (!overlay || !overlay.classList.contains('open')) return;
    if (!overlay.contains(e.target)) return;

    // Small delay to let keyboard fully open
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 350);
  });

  /* ══════════════════════════════════════════════════════════
     CHANGE API — patch topbar API button to show current key
     ══════════════════════════════════════════════════════════ */

  function upgradeAPIButton() {
    // Find the ⚙ settings button and make it clearly a "Change API" button
    const tbActions = document.querySelector('.topbar-actions');
    if (!tbActions) return;

    // Find existing API button (has ⚙ icon)
    const existing = tbActions.querySelector('button[onclick="openApiModal()"], #btnApiSettings');
    if (!existing) return;

    existing.id = 'btnApiSettings';

    // Patch openApiModal to also scroll overlay to top on mobile
    const _origOpen = window.openApiModal;
    window.openApiModal = function() {
      _origOpen && _origOpen();
      if (isMobile()) {
        const overlay = document.getElementById('apiOverlay');
        if (overlay) {
          // Scroll to top of overlay
          overlay.scrollTop = 0;
          // Focus input after short delay
          setTimeout(() => {
            const inp = document.getElementById('apiKeyInput');
            if (inp) {
              // Don't auto-focus on iOS — prevents keyboard from immediately obscuring
              // User taps input themselves
            }
          }, 300);
        }
      }
      // Update button to show current state
      updateAPIBtnLabel();
    };

    updateAPIBtnLabel();
  }

  function updateAPIBtnLabel() {
    const btn = document.getElementById('btnApiSettings');
    if (!btn) return;

    const key = APP.apiKey || localStorage.getItem('marineiq_apikey') || '';
    const pid = key ? detectProvider(key) : null;
    const icons = { groq:'⚡', gemini:'🌐', openrouter:'🔀', anthropic:'🤖' };

    const iconEl  = btn.querySelector('.tbtn-icon');
    const labelEl = btn.querySelector('.tbtn-label');

    if (pid && icons[pid]) {
      if (iconEl)  iconEl.textContent  = icons[pid];
      if (labelEl) labelEl.textContent = 'API: ' + pid.charAt(0).toUpperCase() + pid.slice(1);
      btn.title = `API provider: ${pid}. Tap to change.`;
    } else {
      if (iconEl)  iconEl.textContent  = '⚙';
      if (labelEl) labelEl.textContent = 'Set API Key';
      btn.title = 'Set your AI API key';
      // No key — highlight the button
      btn.style.cssText = 'background:rgba(248,113,113,0.1)!important;border-color:rgba(248,113,113,0.4)!important;color:#fca5a5!important;';
    }
  }

  /* ══════════════════════════════════════════════════════════
     Patch saveApiKeyNew to update button label after save
     ══════════════════════════════════════════════════════════ */
  const _origSave = window.saveApiKeyNew;
  window.saveApiKeyNew = function() {
    _origSave && _origSave();
    setTimeout(updateAPIBtnLabel, 100);
  };
  const _origSave2 = window.saveApiKey;
  window.saveApiKey = function() {
    _origSave2 && _origSave2();
    setTimeout(updateAPIBtnLabel, 100);
  };

  /* ══════════════════════════════════════════════════════════
     Patch closeApiModal — restore scroll on iOS
     ══════════════════════════════════════════════════════════ */
  const _origClose = window.closeApiModal;
  window.closeApiModal = function() {
    _origClose && _origClose();
    // iOS: dismiss keyboard by blurring any focused input
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
    updateAPIBtnLabel();
  };

  /* ══════════════════════════════════════════════════════════
     Init after DOM ready
     ══════════════════════════════════════════════════════════ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', upgradeAPIButton);
  } else {
    // Already loaded — try now, retry after short delay in case patches run later
    upgradeAPIButton();
    setTimeout(upgradeAPIButton, 800);
  }

  console.log('%cMarineIQ — iOS modal fix active', 'color:#34d399');
})();

