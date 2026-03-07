/* MarineIQ — Flashcard Module
   Deps: config.js (APP.fcCards, APP.fcIndex) */

function loadFlashcards(cards) {
  APP.fcCards  = [...cards];
  APP.fcIndex  = 0;
  if (APP.fcCards.length) renderFlashcard();
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
function fcNav(dir)  { APP.fcIndex = (APP.fcIndex + dir + APP.fcCards.length) % APP.fcCards.length; renderFlashcard(); }
function fcShuffle() { APP.fcCards.sort(() => Math.random() - 0.5); APP.fcIndex = 0; renderFlashcard(); }

