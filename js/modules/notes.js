/* MarineIQ — Notes Module
   Deps: config.js (APP.notes), utils.js (esc) */

function toggleNotes() {
  document.getElementById('notesDrawer').classList.toggle('open');
}

function saveNote() {
  if (!APP.lastAnswer || !APP.lastQuery) return;
  const note = {
    id: Date.now(),
    q: APP.lastQuery,
    level: APP.currentLevel?.title || '',
    topic: APP.currentTopic || '',
    answer: APP.lastAnswer,
    ts: new Date().toLocaleDateString()
  };
  APP.notes = [note, ...APP.notes].slice(0, 50);
  try { localStorage.setItem('marineiq_notes', JSON.stringify(APP.notes)); } catch(_) {}
  updateNotesPip();
  renderNotesList();
  const btn = document.getElementById('saveNoteBtn');
  btn.textContent = '✓ Saved!';
  setTimeout(() => btn.textContent = '🔖 Save Note', 2000);
}

function updateNotesPip() {
  const pip = document.getElementById('notesPip');
  pip.style.display = APP.notes.length ? 'flex' : 'none';
  pip.textContent = APP.notes.length;
}

function renderNotesList() {
  const list = document.getElementById('notesList');
  if (!APP.notes.length) {
    list.innerHTML = '<div style="color:var(--tx3);font-size:0.8rem;padding:8px 0">No saved notes yet. Study a topic and save answers.</div>';
    return;
  }
  list.innerHTML = APP.notes.map(n => `
  <div class="note-item" onclick="loadNote(${n.id})">
    <button class="note-del" onclick="event.stopPropagation();deleteNote(${n.id})">✕</button>
    <div class="note-q">${esc(n.q.slice(0, 80))}${n.q.length > 80 ? '…' : ''}</div>
    <div class="note-prev">${esc((n.answer || '').replace(/<[^>]+>/g, '').slice(0, 100))}…</div>
    <div class="note-meta">${n.level} · ${n.ts}</div>
  </div>`).join('');
}

function loadNote(id) {
  const n = APP.notes.find(x => x.id === id);
  if (!n) return;
  APP.lastQuery  = n.q;
  APP.lastAnswer = n.answer;
  document.getElementById('ansQuery').textContent = n.q;
  document.getElementById('ansBody').innerHTML = renderAnswerBody(n.answer);
  setAnswerBadges('SAVED', 'abadge-bal', '', '');
  showEl('answerCard');
  document.getElementById('ansSources').style.display = 'none';
  toggleNotes();
}

function deleteNote(id) {
  APP.notes = APP.notes.filter(n => n.id !== id);
  localStorage.setItem('marineiq_notes', JSON.stringify(APP.notes));
  updateNotesPip();
  renderNotesList();
}
