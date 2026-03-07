/* MarineIQ — Flashcard Module
   Deps: config.js (APP.fcCards, APP.fcIndex) */

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
    if (q) q.textContent = 'No flashcards for this topic';
    if (a) a.textContent = '';
    if (c) c.textContent = '0 / 0';
  }
}

function renderFlashcard() {
  const c = APP.fcCards[APP.fcIndex];
  if (!c) return;
  document.getElementById('fcQ').textContent = c.q;
  document.getElementById('fcA').textContent = c.a;
  document.getElementById('fcCounter').textContent = `${APP.fcIndex + 1} / ${APP.fcCards.length}`;
  document.getElementById('flashcardWrap').classList.remove('flipped');
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

