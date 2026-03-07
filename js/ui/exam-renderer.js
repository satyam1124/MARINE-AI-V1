/* MarineIQ — Exam answer renderer + legacy quiz v1
   Deps: config.js, utils.js */

function renderExamAnswer(rawText) {
  const lines = rawText.split('\n');
  let html = '', inSteps = false;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { if (inSteps) { html += '</div>'; inSteps = false; } continue; }

    if (/^FORMULA:/i.test(line)) {
      if (inSteps) { html += '</div>'; inSteps = false; }
      html += `<div class="ans-formula"><div class="ans-formula-label">Formula</div>${inlineFormat(line.replace(/^FORMULA:\s*/i,''))}</div>`;
    } else if (/^EXAM TIP:/i.test(line)) {
      if (inSteps) { html += '</div>'; inSteps = false; }
      html += `<div class="ans-exam"><div class="ans-exam-title">📝 EXAM TIP</div>${inlineFormat(line.replace(/^EXAM TIP:\s*/i,''))}</div>`;
    } else if (/^(TRAP|COMMON MISTAKE|AVOID):/i.test(line)) {
      if (inSteps) { html += '</div>'; inSteps = false; }
      html += `<div class="exam-trap-block"><div class="exam-trap-title">⚠ EXAM TRAP</div>${inlineFormat(line.replace(/^[^:]+:\s*/,''))}</div>`;
    } else if (/^(NOTE|WARNING|SOURCE):/i.test(line)) {
      if (inSteps) { html += '</div>'; inSteps = false; }
      html += `<div class="ans-note">${inlineFormat(line)}</div>`;
    } else if (/^#{1,3}\s|^\*\*[^*]+\*\*\s*$/.test(line) || /^\d+\.\s+\*\*/.test(line)) {
      if (inSteps) { html += '</div>'; inSteps = false; }
      const label = line.replace(/^#+\s*/,'').replace(/\*\*/g,'').replace(/^\d+\.\s*/,'');
      html += `<div class="exam-section-head">${label}</div>`;
    } else if (/^\d+[\.\)]\s/.test(line)) {
      if (!inSteps) { html += '<div class="exam-steps">'; inSteps = true; }
      html += `<div class="exam-step-block">${inlineFormat(line)}</div>`;
    } else {
      if (inSteps) { html += '</div>'; inSteps = false; }
      html += `<p>${inlineFormat(line)}</p>`;
    }
  }
  if (inSteps) html += '</div>';
  return html;
}

function inlineFormat(text) {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`]+)`/g,'<code>$1</code>');
}

/* Override renderAnswerBody to use exam formatter when exam mode on */
const _renderAnswerBody0 = renderAnswerBody;
renderAnswerBody = function(text) {
  return APP.examMode ? renderExamAnswer(text) : _renderAnswerBody0(text);
};

/* Override doAsk to tag answer card with exam-active class */
const _doAsk0 = doAsk;
doAsk = async function() {
  const card = document.getElementById('answerCard');
  if (card) {
    card.classList.toggle('exam-active', !!APP.examMode);
  }
  return _doAsk0();
};

/* ═══════════════════════════════════════════════════════════════════════
   FIX 8: QUIZ — robust JSON parsing, explanations, retry wrong
   ═══════════════════════════════════════════════════════════════════════ */
APP.quizWrong = [];

/* Fully replace quizGenerate */
quizGenerate = async function() {
  if (!APP.apiKey) { openApiModal(); return; }

  const topicId  = APP.currentTopic || 'marine_general';
  const kb       = TOPIC_KNOWLEDGE[topicId] || {};
  const lvlLabel = APP.currentLevel?.fullTitle || 'marine engineering';
  const context  = (kb.flashcards || []).slice(0, 2).map(f => f.q).join(' | ');

  const qEl   = document.getElementById('quizQ');
  const optsEl = document.getElementById('quizOpts');
  const resEl  = document.getElementById('quizResult');

  if (qEl)    qEl.textContent  = '⏳ Generating 5 questions…';
  if (optsEl) optsEl.innerHTML = '';
  if (resEl)  resEl.textContent = '';
  APP.quizScore = { c: 0, t: 0 };
  APP.quizWrong = [];
  updateQuizScore();

  const systemMsg = `You are a marine engineering exam question generator for ${lvlLabel} level.
Generate EXACTLY 5 multiple-choice questions. Context: ${context.slice(0,200)}
IMPORTANT: Return ONLY a valid JSON array. No markdown, no backticks, no explanation.
Format: [{"q":"question text","opts":["A. option","B. option","C. option","D. option"],"ans":0,"exp":"short explanation why ans is correct"}]
"ans" is 0-based index (0=A, 1=B, 2=C, 3=D).
Questions must be accurate per Reed's Marine Engineering and IMO regulations.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': APP.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model:      MODELS.fast.id,
        max_tokens: 1200,
        system:     systemMsg,
        messages:   [{ role: 'user', content: `Generate quiz for: ${topicId}` }]
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${res.status}`);
    }

    const data = await res.json();
    let raw = (data.content?.[0]?.text || '').trim();
    // Strip markdown fences
    raw = raw.replace(/^```(?:json)?\s*/,'').replace(/\s*```$/,'').trim();
    // Extract JSON array
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('Response was not a JSON array');

    APP.quizData  = JSON.parse(match[0]);
    APP.quizIndex = 0;
    renderQuizQ();

  } catch (err) {
    // Fallback: build quiz from flashcards
    const cards = kb.flashcards || [];
    if (cards.length >= 2) {
      APP.quizData = cards.slice(0, Math.min(5, cards.length)).map(c => ({
        q:    c.q,
        opts: [
          'A. ' + c.a.split('.')[0].slice(0, 70),
          'B. This statement is incorrect for this topic.',
          'C. The opposite of the correct answer applies here.',
          'D. None of the above statements are accurate.'
        ],
        ans: 0,
        exp: c.a.slice(0, 160)
      }));
      APP.quizData  = APP.quizData.sort(() => Math.random() - 0.5);
      APP.quizIndex = 0;
      renderQuizQ();
      if (qEl) qEl.insertAdjacentHTML('beforebegin',
        '<div style="color:#f59e0b;font-size:0.75rem;margin-bottom:8px">⚠ AI quiz unavailable — using flashcard-based questions</div>');
    } else {
      if (qEl) qEl.textContent = `Quiz error: ${err.message}. Check your API key in settings.`;
    }
  }
};

function renderQuizQ() {
  if (!APP.quizData || !APP.quizData.length) return;

  if (APP.quizIndex >= APP.quizData.length) {
    // Finished — show summary
    const pct = APP.quizScore.t > 0
      ? Math.round((APP.quizScore.c / APP.quizScore.t) * 100) : 0;
    const qEl   = document.getElementById('quizQ');
    const optsEl = document.getElementById('quizOpts');
    const resEl  = document.getElementById('quizResult');

    if (qEl)    qEl.textContent  = `✅ Quiz complete!  Score: ${APP.quizScore.c} / ${APP.quizScore.t}  (${pct}%)`;
    if (optsEl) optsEl.innerHTML = pct >= 80
      ? '<div style="color:#86efac;padding:8px 0;font-size:0.88rem">🎉 Excellent! You\'re ready for this topic.</div>'
      : '<div style="color:#fca5a5;padding:8px 0;font-size:0.88rem">📚 Review flashcards and try again.</div>';
    if (resEl) {
      resEl.innerHTML = APP.quizWrong.length
        ? `<span style="color:var(--tx3);font-size:0.78rem">${APP.quizWrong.length} wrong answer(s) to review.</span>
           <button class="action-btn" style="margin-left:8px" onclick="retryWrong()">↺ Retry Wrong</button>`
        : '';
    }
    return;
  }

  const q     = APP.quizData[APP.quizIndex];
  const qEl   = document.getElementById('quizQ');
  const optsEl = document.getElementById('quizOpts');
  const resEl  = document.getElementById('quizResult');

  if (qEl) qEl.textContent = `Q${APP.quizIndex + 1} / ${APP.quizData.length}: ${q.q}`;
  if (optsEl) optsEl.innerHTML = (q.opts || []).map((o, i) =>
    `<button class="quiz-opt" onclick="answerQuiz(${i},${q.ans},'${escJ(q.exp || '')}')">${esc(o)}</button>`
  ).join('');
  if (resEl) resEl.innerHTML = '';
}

function answerQuiz(sel, correct, exp) {
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(o => { o.disabled = true; o.style.pointerEvents = 'none'; });
  if (opts[correct]) opts[correct].classList.add('correct');
  if (sel !== correct && opts[sel]) {
    opts[sel].classList.add('wrong');
    if (APP.quizData[APP.quizIndex]) APP.quizWrong.push(APP.quizData[APP.quizIndex]);
  }
  APP.quizScore.t++;
  if (sel === correct) APP.quizScore.c++;
  updateQuizScore();

  const resEl = document.getElementById('quizResult');
  if (resEl) {
    const expTxt = exp ? `<span style="color:var(--tx3);font-size:0.78rem"> — ${esc(exp.slice(0,140))}</span>` : '';
    resEl.innerHTML = sel === correct
      ? `<span style="color:#86efac">✓ Correct!</span>${expTxt}`
      : `<span style="color:#fca5a5">✗ Incorrect.</span>${expTxt}`;
  }
}

function retryWrong() {
  if (!APP.quizWrong.length) return;
  APP.quizData  = [...APP.quizWrong];
  APP.quizIndex = 0;
  APP.quizWrong = [];
  APP.quizScore = { c: 0, t: 0 };
  updateQuizScore();
  renderQuizQ();
}

/* Override quizNext to use our renderQuizQ */
quizNext = function() {
  APP.quizIndex++;
  renderQuizQ();
};

/* ── deepBtn visibility: hide when already in deep mode ── */
const _setAnswerBadges0 = setAnswerBadges;
setAnswerBadges = function(modelLabel, modelCls, timeStr, examFlag) {
  _setAnswerBadges0(modelLabel, modelCls, timeStr, examFlag);
  const btn = document.getElementById('deepBtn');
  if (btn) btn.style.display = APP.currentModel !== 'deep' ? 'inline-flex' : 'none';
};


