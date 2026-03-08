/* MarineIQ — Topic Panel: Selection, Diagrams, Videos, Formulas, Flashcards, Panel Switching
   Deps: config.js, topic-knowledge.js, diagrams.js */

function selectTopic(topicId, title, desc, icon, sectionName) {
  APP.currentTopic = topicId;

  // Clear AI conversation history when switching topics
  APP.chatHistory = [];

  // Update sidebar active state
  document.querySelectorAll('.sb-topic').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('sbt_' + topicId);
  if (btn) btn.classList.add('active');

  // Show topic zone
  showTopicZone();

  // ── Clear any stale chapter/subtopic UI from previous topic ──
  const tz = document.getElementById('topicZone');
  if (tz) {
    tz.querySelectorAll('.stopic-grid-wrap,.subj-header,.chapter-crumb,.chapter-content-header,.chapter-grid,.chapter-index-label,#stopic-banner,.tz-intro-card').forEach(el => el.remove());
  }

  // Load multimodal content
  const kb = TOPIC_KNOWLEDGE[topicId] || {};
  loadDiagrams(topicId);
  loadVideos(kb.videos || []);
  loadFormulas(kb.formulas || []);
  loadFlashcards(kb.flashcards || []);

  // ── Hide empty tabs, auto-select first with content ──
  const tabContentMap = {
    diagrams:   function() { const g = document.getElementById('diagGrid'); return g && g.children.length > 0 && !g.querySelector('.diag-card') === false; },
    videos:     function() { return (kb.videos || []).length > 0; },
    formulas:   function() { return (kb.formulas || []).length > 0; },
    flashcards: function() { return (kb.flashcards || []).length > 0; },
  };
  let firstVisible = null;
  document.querySelectorAll('.mm-tab').forEach(function(tab) {
    const panelId = tab.getAttribute('data-panel');
    if (!panelId || panelId === 'quiz') return; // quiz always visible
    const hasContent = tabContentMap[panelId] ? tabContentMap[panelId]() : true;
    tab.style.display = hasContent ? '' : 'none';
    if (hasContent && !firstVisible) firstVisible = panelId;
  });
  // Auto-select first visible tab
  switchPanel(firstVisible || 'diagrams', document.querySelector('.mm-tab[data-panel="' + (firstVisible || 'diagrams') + '"]'));

  // Breadcrumb
  setBreadcrumb([
    { label: 'HOME', action: 'goHome()' },
    { label: APP.currentLevel.title, action: `enterLevel('${APP.currentLevel.id}')` },
    { label: title.slice(0, 30) + (title.length > 30 ? '…' : ''), active: true }
  ]);

  // Pre-fill search with a suggested question (shorter) — user decides when to ask
  const levelLabel = APP.currentLevel.fullTitle;
  // Update quiz topic label (if quiz v2 setup note exists)
  const quizTopicEl = document.getElementById('quizTopic');
  if (quizTopicEl) quizTopicEl.textContent = title;
  const qv2Note = document.getElementById('qv2SetupNote');
  if (qv2Note) qv2Note.textContent = `Select difficulty and start the quiz for: ${title}`;
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

/* loadFormulas, loadFlashcards, renderFlashcard, fcFlip, fcNav, fcShuffle
   are defined in their respective modules (formulas-v3.js, flashcards.js).
   Do NOT redeclare them here — topic-panel.js loads after those modules. */

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
