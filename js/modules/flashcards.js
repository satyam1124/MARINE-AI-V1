/* MarineIQ — Flashcard Module
   Deps: config.js (APP.fcCards, APP.fcIndex), utils.js (esc, renderKaTeX) */

/* Safe flashcard content renderer — preserves Unicode math symbols,
   converts **bold** and `code`, then runs KaTeX for $...$ math */
function renderFCContent(raw) {
  if (!raw) return '';
  let s = String(raw);
  // 1. HTML-escape for XSS safety
  s = s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // 2. Markdown-style bold and inline code
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`\n]+)`/g, '<code style="background:rgba(212,160,23,.1);padding:1px 5px;border-radius:4px;font-size:.9em;">$1</code>');
  // 3. Line breaks
  s = s.replace(/\n/g, '<br/>');
  return s;
}

function loadFlashcards(cards) {
  APP.fcCards  = [...cards];
  APP.fcIndex  = 0;
  if (APP.fcCards.length) {
    renderFlashcard();
  } else {
    // Clear stale flashcard display when topic has no cards
    const q = document.getElementById('fcQ');
    const a = document.getElementById('fcA');
    const c = document.getElementById('fcCounter');
    if (q) q.innerHTML = '<span style="color:var(--tx3)">No flashcards for this topic</span>';
    if (a) a.innerHTML = '';
    if (c) c.textContent = '0 / 0';
  }
}

function renderFlashcard() {
  const c = APP.fcCards[APP.fcIndex];
  if (!c) return;
  const qEl = document.getElementById('fcQ');
  const aEl = document.getElementById('fcA');
  qEl.innerHTML = renderFCContent(c.q);
  aEl.innerHTML = renderFCContent(c.a);
  document.getElementById('fcCounter').textContent = `${APP.fcIndex + 1} / ${APP.fcCards.length}`;
  document.getElementById('flashcardWrap').classList.remove('flipped');
  // Render KaTeX math expressions ($...$) if available
  if (typeof renderKaTeX === 'function') {
    renderKaTeX(qEl);
    renderKaTeX(aEl);
  }
}

function fcFlip()    { document.getElementById('flashcardWrap').classList.toggle('flipped'); }
function fcNav(dir)  {
  if (!APP.fcCards.length) return;
  APP.fcIndex = (APP.fcIndex + dir + APP.fcCards.length) % APP.fcCards.length;
  renderFlashcard();
}
function fcShuffle() {
  // Fisher-Yates shuffle (unbiased)
  const arr = APP.fcCards;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  APP.fcIndex = 0;
  renderFlashcard();
}
