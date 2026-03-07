/* MarineIQ — Quiz Module (legacy)
   Deps: config.js, utils.js, ai-engine.js */

async function quizGenerate() {
  if (!APP.apiKey) { openApiModal(); return; }
  const topic = APP.currentTopic
    ? (APP.fcCards[0]?.q.split(' ').slice(0, 5).join(' ') || APP.currentTopic)
    : 'marine engineering fundamentals';
  const lvlLabel = APP.currentLevel?.fullTitle || 'marine engineering student';

  document.getElementById('quizQ').textContent = 'Generating quiz questions…';
  document.getElementById('quizOpts').innerHTML = '';
  document.getElementById('quizResult').textContent = '';
  APP.quizScore = { c: 0, t: 0 };
  updateQuizScore();

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
        model: MODELS.fast.id,
        max_tokens: 900,
        system: `Generate exactly 5 multiple-choice questions about marine engineering topic: "${topic}" at ${lvlLabel} level. 
Return ONLY a JSON array with no markdown, no explanation:
[{"q":"question text","opts":["A. option1","B. option2","C. option3","D. option4"],"ans":0}]
"ans" is the 0-based index of the correct answer. Base questions on authentic marine engineering knowledge from Reed's, Pounder's, STCW, MARPOL, IMO as appropriate.`,
        messages: [{ role: 'user', content: `Generate quiz on: ${topic}` }]
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);
    const text = (data.content[0]?.text || '').replace(/```json|```/g, '').trim();
    APP.quizData  = JSON.parse(text);
    APP.quizIndex = 0;
    renderQuizQuestion();
  } catch (e) {
    document.getElementById('quizQ').textContent = `Quiz error: ${e.message}`;
  }
}

function renderQuizQuestion() {
  if (!APP.quizData.length) return;
  const q = APP.quizData[APP.quizIndex];
  document.getElementById('quizQ').textContent = `Q${APP.quizIndex + 1}: ${q.q}`;
  document.getElementById('quizOpts').innerHTML = q.opts.map((o, i) =>
    `<button class="quiz-opt" onclick="checkAnswer(${i},${q.ans})">${o}</button>`
  ).join('');
  document.getElementById('quizResult').textContent = '';
}

function checkAnswer(sel, correct) {
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(o => o.style.pointerEvents = 'none');
  opts[correct].classList.add('correct');
  if (sel !== correct) opts[sel].classList.add('wrong');
  APP.quizScore.t++;
  if (sel === correct) {
    APP.quizScore.c++;
    document.getElementById('quizResult').innerHTML = '<span style="color:#86efac">✓ Correct!</span>';
  } else {
    document.getElementById('quizResult').innerHTML = `<span style="color:#fca5a5">✗ Incorrect. Correct answer: ${String.fromCharCode(65 + correct)}</span>`;
  }
  updateQuizScore();
}

function quizNext() {
  APP.quizIndex = (APP.quizIndex + 1) % (APP.quizData.length || 1);
  if (APP.quizIndex === 0) quizGenerate();
  else renderQuizQuestion();
}

function updateQuizScore() {
  document.getElementById('quizScore').textContent = `${APP.quizScore.c}/${APP.quizScore.t}`;
}

function openQuiz() {
  switchPanel('quiz', null);
  if (APP.currentTopic) showTopicZone();
}

