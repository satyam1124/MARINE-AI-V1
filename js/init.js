/* MarineIQ — App Bootstrap
   Final file loaded. Wires all modules together.
   DOMContentLoaded: API modal, rank grid, search index, ref badge.
   ═══════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // API modal is now triggered only on-demand by AI features
  buildRankGrid();
  if (typeof updateNotesPip === 'function') updateNotesPip();
  if (typeof renderNotesList === 'function') renderNotesList();
  // Restore saved reference book selection
  setTimeout(function(){ if(typeof updateRefBadge==='function') updateRefBadge(); }, 100);
  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') doAsk();
  });
  document.getElementById('apiOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget && APP.apiKey) closeApiModal();
  });
});

/* ═══════════════════════════════════════════════════════════════════════
   ZONE 6A: HOME SCREEN — CAREER LADDER BUILDER
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Wire up global keyboard shortcut for search (/) ── */
/* ── Defined in modules/search.js ── */

/* ── Final boot: build search index (rank grid already built above) ── */
document.addEventListener('DOMContentLoaded', () => {
  // Build global search index
  if (typeof buildTopicsIndex === 'function') buildTopicsIndex();
});
