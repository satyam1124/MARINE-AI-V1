/* MarineIQ — Utility Functions
   API modal, DOM helpers, answer rendering, KaTeX
   Deps: config.js (APP) */

function openApiModal()  { document.getElementById('apiOverlay').classList.add('open'); }
function closeApiModal() { document.getElementById('apiOverlay').classList.remove('open'); }
function saveApiKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (key) {
    APP.apiKey = key;
    localStorage.setItem('marineiq_apikey', key);
  }
  closeApiModal();
}

/* ─────────── ANSWER ACTIONS ─────────── */
function copyAnswer() {
  navigator.clipboard.writeText(APP.lastAnswer.replace(/<[^>]+>/g, ''));
  const btn = document.querySelector('.action-btn.primary');
  btn.textContent = '✓ Copied!';
  setTimeout(() => btn.textContent = '⎘ Copy', 2000);
}

function clearAnswer() {
  hideEl('answerCard');
  hideEl('errorEl');
  document.getElementById('ansBody').innerHTML = '';
  APP.lastAnswer = '';
}

function retryDeep() {
  if (!APP.lastQuery) return;
  selectModel('deep');
  document.getElementById('searchInput').value = APP.lastQuery;
  doAsk();
}

/* ─────────── UI HELPERS ─────────── */
function showEl(id)  { document.getElementById(id).classList.add('show'); }
function hideEl(id)  { document.getElementById(id).classList.remove('show'); }

function setAnswerBadges(modelLabel, modelCls, timeStr, examFlag) {
  const badges = document.getElementById('ansBadges');
  badges.innerHTML = `
    <span class="abadge ${modelCls}">${modelLabel}</span>
    ${examFlag ? '<span class="abadge abadge-exam">📝 EXAM MODE</span>' : ''}
    ${timeStr ? `<span class="abadge abadge-time">${timeStr}</span>` : ''}`;
}

function esc(s = '') {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escJ(s = '') {
  return String(s).replace(/'/g,'&#39;').replace(/"/g,'&quot;');
}

/* ─────────── ANSWER BODY RENDERER ─────────── */

function renderAnswerBody(rawText) {
  // Escape HTML but preserve KaTeX delimiters intact
  let text = rawText
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // Markdown formatting
  text = text
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`([^`\n]+)`/g,'<code>$1</code>');

  // Regulation highlights
  text = text.replace(/(MARPOL|SOLAS|STCW|ISM Code|MLC|IGF Code|IACS|BWM Convention)([^&lt;\n]{0,80})/g,
    '<span class="ans-reg" style="display:inline">$1$2</span>');

  // FORMULA: prefix → KaTeX display block
  text = text.replace(/FORMULA:\s*(.+?)(?=\n|$)/g, function(_, eq){
    const raw = eq.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    try {
      const rendered = (typeof katex !== 'undefined')
        ? katex.renderToString(raw, {throwOnError:false, displayMode:true})
        : '<span class="ans-formula-text">'+eq+'</span>';
      return '<div class="ans-formula"><div class="ans-formula-label">Formula</div>'+rendered+'</div>';
    } catch(e) {
      return '<div class="ans-formula"><div class="ans-formula-label">Formula</div>'+eq+'</div>';
    }
  });

  // Inline $...$ rendering after formula blocks (KaTeX auto-render will handle $$)
  // Source citation pills  
  text = text.replace(/\(Source:\s*([^)]+)\)/g,
    '<span class="ref-source-pill">📖 $1</span>');

  // Page citation from reference books
  text = text.replace(/\(([A-Za-z\s]+),\s*p[p]?\.\s*([\d\-]+)\)/g,
    '<span class="ref-source-pill">📖 $1 p.$2</span>');

  // NOTE / WARNING / CAUTION blocks
  text = text.replace(/(?:NOTE|WARNING|CAUTION):\s*(.+)/g,
    '<div class="ans-note">⚠ $1</div>');

  // EXAM TIP
  text = text.replace(/EXAM TIP:\s*(.+)/g,
    '<div class="ans-exam"><div class="ans-exam-title">📝 EXAM TIP</div>$1</div>');

  // SOURCE badge
  text = text.replace(/📚\s*BOOK SOURCE:\s*(.+)/g,
    '<div class="ans-book-src">📚 $1</div>');

  // Headers (## or ### style)
  text = text
    .replace(/^###\s*(.+)$/mg, '<h4 class="ans-h4">$1</h4>')
    .replace(/^##\s*(.+)$/mg,  '<h3 class="ans-h3">$1</h3>');

  // Numbered lists
  text = text.replace(/((?:^\d+\..+\n?)+)/gm, function(block){
    const items = block.trim().split('\n').map(l => '<li>'+l.replace(/^\d+\.\s*/,'')+'</li>').join('');
    return '<ol class="ans-ol">'+items+'</ol>';
  });

  // Bullet lists
  text = text.replace(/((?:^[\•\-\♦]\s*.+\n?)+)/gm, function(block){
    const items = block.trim().split('\n').map(l => '<li>'+l.replace(/^[\•\-\♦]\s*/,'')+'</li>').join('');
    return '<ul class="ans-ul">'+items+'</ul>';
  });

  // Paragraphs
  text = text
    .replace(/\n\n+/g,'</p><p>')
    .replace(/\n/g,'<br/>')
    .replace(/^(.)/,'<p>$1')
    .replace(/(.)$/,'$1</p>');

  return text;
}

/* Render KaTeX in a container after it's added to DOM */
function renderKaTeX(el) {
  if (typeof renderMathInElement === 'function') {
    renderMathInElement(el, {
      delimiters: [
        {left:'$$', right:'$$', display:true},
        {left:'$',  right:'$',  display:false},
        {left:'\\(', right:'\\)', display:false},
        {left:'\\[', right:'\\]', display:true}
      ],
      throwOnError: false
    });
  }
}
