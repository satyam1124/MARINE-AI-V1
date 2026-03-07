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

/* ── Quiz v2 is now the active quiz system (quiz-v2.js + quiz-advanced.js).
   Legacy quiz overrides removed — they targeted destroyed HTML elements. ── */

/* ── deepBtn visibility: hide when already in deep mode ── */
const _setAnswerBadges0 = setAnswerBadges;
setAnswerBadges = function(modelLabel, modelCls, timeStr, examFlag) {
  _setAnswerBadges0(modelLabel, modelCls, timeStr, examFlag);
  const btn = document.getElementById('deepBtn');
  if (btn) btn.style.display = APP.currentModel !== 'deep' ? 'inline-flex' : 'none';
};


