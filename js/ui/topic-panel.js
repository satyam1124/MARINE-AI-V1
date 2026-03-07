/* MarineIQ — Topic Panel: Selection, Diagrams, Videos, Formulas, Flashcards, Panel Switching
   Deps: config.js, topic-knowledge.js, diagrams.js */

function selectTopic(topicId, title, desc, icon, sectionName) {
  APP.currentTopic = topicId;

  // Update sidebar active state
  document.querySelectorAll('.sb-topic').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('sbt_' + topicId);
  if (btn) btn.classList.add('active');

  // Show topic zone
  showTopicZone();

  // Reset to first MM tab
  switchPanel('diagrams', document.querySelector('.mm-tab'));

  // Load multimodal content
  const kb = TOPIC_KNOWLEDGE[topicId] || {};
  loadDiagrams(topicId);
  loadVideos(kb.videos || []);
  loadFormulas(kb.formulas || []);
  loadFlashcards(kb.flashcards || []);

  // Breadcrumb
  setBreadcrumb([
    { label: 'HOME', action: 'goHome()' },
    { label: APP.currentLevel.title, action: `enterLevel('${APP.currentLevel.id}')` },
    { label: title.slice(0, 30) + (title.length > 30 ? '…' : ''), active: true }
  ]);

  // Pre-fill search with a suggested question (shorter) — user decides when to ask
  const levelLabel = APP.currentLevel.fullTitle;
  // Update quiz topic label
  document.getElementById('quizTopic').textContent = title;
}

function showTopicZone() {
  document.getElementById('topicZone').style.display = 'block';
}

/* ─────────── MULTIMODAL LOADERS ─────────── */
function loadDiagrams(topicId) {
  const svgArr = getDiagramsForTopic(topicId);
  document.getElementById('diagGrid').innerHTML = svgArr.length
    ? svgArr.map(svg => `<div class="diag-card"><div>${svg}</div><div class="diag-label">▶ ANIMATED TECHNICAL DIAGRAM — Click to zoom</div></div>`).join('')
    : `<div style="color:var(--tx3);padding:20px;font-size:0.82rem;">No specific diagram for this topic. Ask the AI below for a detailed explanation with formulas.</div>`;
}

function loadVideos(videos) {
  const grid = document.getElementById('videoGrid');
  if (!videos.length) {
    grid.innerHTML = `<div style="color:var(--tx3);padding:20px;font-size:0.82rem;">Use the search below to ask AI for video recommendations on this topic.</div>`;
    return;
  }
  grid.innerHTML = videos.map(v => {
    const thumbUrl = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;
    const ytUrl    = `https://www.youtube.com/watch?v=${v.id}`;
    return `
    <a class="yt-card" href="${ytUrl}" target="_blank" rel="noopener noreferrer">
      <div class="yt-thumb">
        <img src="${thumbUrl}" alt="${esc(v.title)}" loading="lazy"
             onerror="this.parentElement.innerHTML='<div class=yt-fallback-thumb>▶</div>'"/>
        <div class="yt-overlay"><div class="yt-play">▶</div></div>
      </div>
      <div class="yt-info">
        <div class="yt-title">${esc(v.title)}</div>
        <div class="yt-channel">📺 ${esc(v.ch)}</div>
      </div>
    </a>`;
  }).join('');
}

function loadFormulas(formulas) {
  document.getElementById('formulaGrid').innerHTML = formulas.length
    ? formulas.map(f => `
      <div class="fml-card">
        <div class="fml-label">${esc(f.label)}</div>
        <div class="fml-eq">${esc(f.eq)}</div>
        <div class="fml-note">${esc(f.note)}</div>
        ${f.source ? `<div class="fml-source">📚 ${esc(f.source)}</div>` : ''}
      </div>`).join('')
    : `<div style="color:var(--tx3);padding:20px;font-size:0.82rem;">Ask the AI below for formulas specific to this topic.</div>`;
}

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

/* ─────────── MM PANEL SWITCHER ─────────── */
function switchPanel(panelId, btn) {
  document.querySelectorAll('.mm-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mm-panel').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    const matchTab = document.querySelector(`.mm-tab[data-panel="${panelId}"]`);
    if (matchTab) matchTab.classList.add('active');
  }
  const panel = document.getElementById('panel-' + panelId);
  if (panel) panel.classList.add('active');
}

/* ─────────── QUIZ ─────────── */
