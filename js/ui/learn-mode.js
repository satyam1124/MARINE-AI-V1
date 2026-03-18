/* ═══════════════════════════════════════════════════════════════════
   LEARN MODE — Chapter-wise immersive learning view
   MarineIQ · Ganpat University B.Tech Marine Engineering
   ═══════════════════════════════════════════════════════════════════ */

/* ── State ── */
const LEARN = {
  parentId: null,
  chapterId: null,
  chapterIdx: 0,
  activeTab: 'summary',
  completedChapters: JSON.parse(localStorage.getItem('miq_learn_done') || '{}'),
};

/* ── Save chapter completion ── */
function saveLearnProgress() {
  localStorage.setItem('miq_learn_done', JSON.stringify(LEARN.completedChapters));
}

/* ══════════════════════════════════════════════════════════════════
   RENDER LEARN VIEW — entry point
   ══════════════════════════════════════════════════════════════════ */
function renderLearnView(parentId, subtopicId, title, desc) {
  const entry = TOPIC_KNOWLEDGE[parentId];
  if (!entry?.subtopics?.length) return false; // no chapters

  const chapter = entry.subtopics.find(s => s.id === subtopicId);
  if (!chapter) return false;

  const chapterIdx = entry.subtopics.indexOf(chapter);

  /* Update state */
  LEARN.parentId   = parentId;
  LEARN.chapterId  = subtopicId;
  LEARN.chapterIdx = chapterIdx;
  LEARN.activeTab  = 'summary';

  /* APP context for AI / quiz */
  APP.currentTopic    = parentId;
  APP._subtopicId     = subtopicId;
  APP._subtopicTitle  = title;

  const tz = document.getElementById('topicZone');
  if (!tz) return false;

  /* Clean existing content */
  tz.querySelectorAll('.tz-header,.stopic-grid-wrap,.subj-header,.chapter-crumb,.chapter-content-header,#stopic-banner,.topic-nav-footer,.learn-view').forEach(el => el.remove());

  /* Hide static mm-section instead of removing it */
  const mm = tz.querySelector('.mm-section');
  if (mm) mm.style.display = 'none';

  /* Build semester & subject breadcrumb */
  const subjTitle = entry._subjTitle || parentId;
  const semTag    = entry._semTag || '';
  const meta      = TOPIC_META[parentId] || {};
  const diff      = chapter.difficulty || meta.diff || 'Medium';
  const diffClass = diff.toLowerCase();
  const time      = chapter.time || meta.time || 30;
  const totalTopics = chapter.tags?.length || (chapter.formulas?.length ? Math.min(chapter.formulas.length, 8) : 5);
  const isDone    = !!LEARN.completedChapters[subtopicId];

  const view = document.createElement('div');
  view.className = 'learn-view';
  view.innerHTML = `
    <!-- ═══ MAIN CONTENT ═══ -->
    <div class="learn-main" id="learnMain">

      <!-- Breadcrumb -->
      <div class="learn-crumb">
        <span class="learn-crumb-link" style="color:var(--ac);font-weight:700;" onclick="selectTopic('${parentId}','${subjTitle.replace(/'/g,"\\\\'")}', '','📖','B.Tech')">← Back to Chapters</span>
        <span class="learn-crumb-sep" style="margin:0 8px;color:rgba(212,160,23,0.3);">|</span>
        <span class="learn-crumb-link" onclick="selectTopic('${parentId}','${subjTitle.replace(/'/g,"\\\\'")}', '','📖','B.Tech')">${esc(semTag || 'B.Tech')}</span>
        <span class="learn-crumb-sep">→</span>
        <span class="learn-crumb-link" onclick="selectTopic('${parentId}','${subjTitle.replace(/'/g,"\\\\'")}', '','📖','B.Tech')">${esc(subjTitle)}</span>
        <span class="learn-crumb-sep">→</span>
        <span class="learn-crumb-cur">Ch ${chapterIdx + 1}: ${esc(title)}</span>
      </div>

      <!-- Banner -->
      <div class="learn-banner">
        <div style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px">
            <h2 class="learn-title">Chapter ${chapterIdx + 1}: ${esc(title)}</h2>
            <div class="learn-meta">
              <span class="learn-meta-item">⏱ ${time} min</span>
              <span class="learn-meta-item">📖 ${totalTopics} topics</span>
              <span class="learn-meta-diff ${diffClass}">● ${esc(diff)}</span>
            </div>
          </div>
          <button class="learn-complete-btn${isDone ? ' done' : ''}" id="learnCompleteBtn"
                  onclick="toggleLearnComplete('${subtopicId}')">
            ${isDone ? '✅ Complete' : '○ Mark Complete'}
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="learn-tabs" id="learnTabs">
        <button class="learn-tab active" data-tab="summary" onclick="switchLearnTab('summary',this)">Summary</button>
        <button class="learn-tab" data-tab="keypoints" onclick="switchLearnTab('keypoints',this)">Key Points</button>
        <button class="learn-tab" data-tab="formulas" onclick="switchLearnTab('formulas',this)">Σ Formulas</button>
        <button class="learn-tab" data-tab="flashcards" onclick="switchLearnTab('flashcards',this)">⚡ Flashcards</button>
        <button class="learn-tab" data-tab="quiz" onclick="switchLearnTab('quiz',this)">🎯 Quiz</button>
      </div>

      <!-- Panels -->
      <div class="learn-panel active" id="learnPanel-summary">${buildSummaryPanel(chapter, entry, title)}</div>
      <div class="learn-panel" id="learnPanel-keypoints">${buildKeyPointsPanel(chapter, title)}</div>
      <div class="learn-panel" id="learnPanel-formulas">${buildFormulasPanel(chapter, entry)}</div>
      <div class="learn-panel" id="learnPanel-flashcards">${buildFlashcardsPanel(chapter, entry)}</div>
      <div class="learn-panel" id="learnPanel-quiz">${buildQuizPanel(parentId, subtopicId, title)}</div>

      <!-- Next/Prev Navigation -->
      ${buildNavFooter(entry, chapterIdx, parentId)}
    </div>

    <!-- ═══ SIDEBAR ═══ -->
    <div class="learn-sidebar" id="learnSidebar">
      <!-- AI Assistant -->
      <div class="learn-ai-box">
        <div class="learn-ai-label">AI ASSISTANT</div>
        <div class="learn-ai-input-wrap">
          <input class="learn-ai-input" id="learnAiInput"
                 placeholder="Ask about ${title.substring(0, 25)}…"
                 onkeydown="if(event.key==='Enter') learnAiAsk()" />
          <button class="learn-ai-send" onclick="learnAiAsk()" title="Ask AI">➤</button>
        </div>
      </div>

      <!-- Progress -->
      ${buildProgressSection(entry)}

      <!-- Chapters -->
      <div class="learn-ch-label">CHAPTERS</div>
      <ul class="learn-ch-list">
        ${entry.subtopics.map((ch, i) => {
          const isActive = ch.id === subtopicId;
          const isCompleted = !!LEARN.completedChapters[ch.id];
          return `<li class="learn-ch-item${isActive?' active':''}${isCompleted?' completed':''}"
                     onclick="renderLearnView('${parentId}','${ch.id}','${(ch.title||'').replace(/'/g,"\\'")}','${(ch.desc||'').replace(/'/g,"\\'").replace(/"/g, '&quot;')}')">
            <span class="learn-ch-num">${isCompleted ? '✓' : (i+1)}</span>
            <span class="learn-ch-title">${esc(ch.title)}</span>
          </li>`;
        }).join('')}
      </ul>
    </div>
  `;

  tz.appendChild(view);
  tz.style.display = '';

  /* Scroll to top */
  setTimeout(() => {
    const main = document.getElementById('learnMain');
    if (main) main.scrollTop = 0;
    tz.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);

  return true;
}

/* ══════════════════════════════════════════════════════════════════
   TAB SWITCHING
   ══════════════════════════════════════════════════════════════════ */
function switchLearnTab(tab, btn) {
  LEARN.activeTab = tab;
  /* Update tab buttons */
  document.querySelectorAll('#learnTabs .learn-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  /* Update panels */
  document.querySelectorAll('.learn-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('learnPanel-' + tab);
  if (panel) panel.classList.add('active');
}

/* ══════════════════════════════════════════════════════════════════
   PANEL BUILDERS
   ══════════════════════════════════════════════════════════════════ */

/* ── Summary ── */
function buildSummaryPanel(chapter, entry, title) {
  /* If rich summary is provided, use it directly */
  if (chapter.summary) {
    return `<div class="learn-summary">${chapter.summary}</div>`;
  }

  /* Auto-generate from available data */
  let html = '<div class="learn-summary">';
  html += `<p>${esc(chapter.desc || title)}</p>`;

  /* Build from tags */
  if (chapter.tags?.length) {
    html += `<h3>Topics Covered</h3><p>This chapter covers the following key areas: <strong>${chapter.tags.join('</strong>, <strong>')}</strong>.</p>`;
  }

  /* Build from formulas */
  if (chapter.formulas?.length) {
    html += `<h3>Core Engineering Principles</h3>`;
    chapter.formulas.forEach(f => {
      html += `<p><strong>${esc(f.label)}</strong>: The fundamental relationship is expressed as <code style="background:rgba(0,229,255,.06);padding:2px 8px;border-radius:4px;color:var(--ac);font-family:'JetBrains Mono',monospace;font-size:.82em">${esc(f.eq)}</code>`;
      if (f.note) html += ` — ${esc(f.note)}`;
      html += `</p>`;
    });
  }

  /* Build from flashcards as Q&A study points */
  if (chapter.flashcards?.length) {
    html += `<h3>Important Study Points</h3>`;
    chapter.flashcards.slice(0, 3).forEach(fc => {
      html += `<div class="learn-callout oral">
        <span class="learn-callout-label">📝 Study Question</span>
        <strong>${esc(fc.q)}</strong>
        <p style="margin:6px 0 0;color:var(--tx2)">${esc(fc.a)}</p>
      </div>`;
    });
  }

  /* Real-world application callout */
  html += `<div class="learn-callout example">
    <span class="learn-callout-label">🚢 Marine Application</span>
    This knowledge is directly applicable in marine engineering contexts. Understanding <strong>${esc(title)}</strong> is essential for marine engineers at all levels, from engine room watch-keeping to chief engineer competency examinations.
  </div>`;

  html += '</div>';
  return html;
}

/* ── Key Points ── */
function buildKeyPointsPanel(chapter, title) {
  /* If rich keyPoints are provided */
  if (chapter.keyPoints?.length) {
    return `<ul class="learn-keypoints">${chapter.keyPoints.map(kp =>
      `<li class="learn-keypoint">
        <span class="learn-keypoint-icon">${kp.icon || '•'}</span>
        <div class="learn-keypoint-text">${kp.text}</div>
      </li>`
    ).join('')}</ul>`;
  }

  /* Auto-generate from data */
  let items = [];

  /* From tags */
  if (chapter.tags?.length) {
    chapter.tags.forEach(tag => {
      items.push({ icon: '📌', text: `<strong>${esc(tag)}</strong> — Master this concept for comprehensive understanding of ${esc(title)}.` });
    });
  }

  /* From formulas */
  if (chapter.formulas?.length) {
    items.push({ icon: 'Σ', text: `<strong>${chapter.formulas.length} key formula${chapter.formulas.length > 1 ? 's' : ''}</strong> to memorize — practice numerical problems for exam readiness.` });
  }

  /* From flashcards */
  if (chapter.flashcards?.length) {
    items.push({ icon: '⚡', text: `<strong>${chapter.flashcards.length} flashcard${chapter.flashcards.length > 1 ? 's' : ''}</strong> covering essential Q&A for oral examinations and viva.` });
  }

  /* From videos */
  if (chapter.videos?.length) {
    items.push({ icon: '▶️', text: `<strong>${chapter.videos.length} video reference${chapter.videos.length > 1 ? 's' : ''}</strong> for visual understanding — watch to strengthen conceptual clarity.` });
  }

  /* Standard study tips */
  items.push({ icon: '🎯', text: 'Complete the quiz after studying to test retention. Aim for <strong>80%+ accuracy</strong> before moving to the next chapter.' });
  items.push({ icon: '📋', text: 'Use the <strong>AI Assistant</strong> in the sidebar to ask doubts. Try questions like <em>"Explain with a worked example"</em> or <em>"What are the oral exam questions on this?"</em>' });

  return `<ul class="learn-keypoints">${items.map(kp =>
    `<li class="learn-keypoint">
      <span class="learn-keypoint-icon">${kp.icon}</span>
      <div class="learn-keypoint-text">${kp.text}</div>
    </li>`
  ).join('')}</ul>`;
}

/* ── Formulas ── */
function buildFormulasPanel(chapter, entry) {
  const formulas = chapter.formulas || entry.formulas || [];
  if (!formulas.length) return '<div style="text-align:center;padding:40px 20px;color:var(--tx3)"><p>No formulas available for this chapter.</p><p style="font-size:.75rem">Use the AI Assistant to ask for relevant formulas.</p></div>';

  return `<div class="learn-formula-grid">${formulas.map(f =>
    `<div class="learn-formula-card">
      <div class="learn-formula-label">${esc(f.label)}</div>
      <div class="learn-formula-eq">${esc(f.eq)}</div>
      ${f.note ? `<div class="learn-formula-note">${esc(f.note)}</div>` : ''}
    </div>`
  ).join('')}</div>`;
}

/* ── Flashcards ── */
function buildFlashcardsPanel(chapter, entry) {
  const cards = chapter.flashcards || entry.flashcards || [];
  if (!cards.length) return '<div style="text-align:center;padding:40px 20px;color:var(--tx3)"><p>No flashcards available for this chapter.</p><p style="font-size:.75rem">Use the AI Assistant to generate practice questions.</p></div>';

  return `<div class="learn-fc-grid">${cards.map((fc, i) =>
    `<div class="learn-fc-card" onclick="this.classList.toggle('flipped')">
      <div class="learn-fc-q">
        <div class="learn-fc-q-label">Question ${i + 1}</div>
        ${esc(fc.q)}
        <div class="learn-fc-hint">tap to reveal answer</div>
      </div>
      <div class="learn-fc-a">
        <div class="learn-fc-a-label">Answer</div>
        ${esc(fc.a)}
      </div>
    </div>`
  ).join('')}</div>`;
}

/* ── Quiz ── */
function buildQuizPanel(parentId, subtopicId, title) {
  return `<div style="text-align:center;padding:30px 20px;">
    <div style="font-size:2.5rem;margin-bottom:12px">🎯</div>
    <h3 style="font-family:'Syne',sans-serif;color:var(--tx);margin:0 0 8px">Quiz — ${esc(title)}</h3>
    <p style="font-size:.82rem;color:var(--tx3);margin:0 0 20px;line-height:1.6">
      Test your understanding of this chapter with MCQ questions.<br>
      10 questions · Timed · Instant feedback
    </p>
    <button onclick="launchChapterQuiz('${parentId}','${subtopicId}','${title.replace(/'/g,"\\'")}')"
            style="padding:12px 28px;border-radius:12px;background:var(--ac);color:#0a0e17;border:none;
                   font-size:.88rem;font-weight:700;cursor:pointer;font-family:'DM Sans',sans-serif;
                   transition:all .2s;">
      ⚡ Start Chapter Quiz
    </button>
    <p style="font-size:.68rem;color:var(--tx3);margin-top:12px">AI-powered with API key · Flashcard-based without</p>
  </div>`;
}

/* ── Nav footer ── */
function buildNavFooter(entry, idx, parentId) {
  const prev = idx > 0 ? entry.subtopics[idx - 1] : null;
  const next = idx < entry.subtopics.length - 1 ? entry.subtopics[idx + 1] : null;

  let html = '<div class="learn-nav-footer">';

  if (prev) {
    html += `<button class="learn-nav-btn" onclick="renderLearnView('${parentId}','${prev.id}','${(prev.title||'').replace(/'/g,"\\'")}','${(prev.desc||'').replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
      ← ${esc(prev.title).substring(0, 25)}${prev.title.length > 25 ? '…' : ''}
    </button>`;
  } else {
    html += `<button class="learn-nav-btn" disabled>← Previous</button>`;
  }

  if (next) {
    html += `<button class="learn-nav-btn primary" onclick="renderLearnView('${parentId}','${next.id}','${(next.title||'').replace(/'/g,"\\'")}','${(next.desc||'').replace(/'/g,"\\'").replace(/"/g,'&quot;')}')">
      ${esc(next.title).substring(0, 25)}${next.title.length > 25 ? '…' : ''} →
    </button>`;
  } else {
    html += `<button class="learn-nav-btn primary" onclick="selectTopic('${parentId}','${(entry._subjTitle||'').replace(/'/g,"\\'")}','','📖','B.Tech')">
      ✅ Back to Subject
    </button>`;
  }

  html += '</div>';
  return html;
}

/* ── Progress section ── */
function buildProgressSection(entry) {
  const total = entry.subtopics.length;
  const done = entry.subtopics.filter(ch => LEARN.completedChapters[ch.id]).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return `
    <div class="learn-progress-text">${done} / ${total} chapters completed</div>
    <div class="learn-progress-bar">
      <div class="learn-progress-fill" style="width:${pct}%"></div>
    </div>
  `;
}

/* ══════════════════════════════════════════════════════════════════
   COMPLETION TOGGLE
   ══════════════════════════════════════════════════════════════════ */
function toggleLearnComplete(chapterId) {
  if (LEARN.completedChapters[chapterId]) {
    delete LEARN.completedChapters[chapterId];
  } else {
    LEARN.completedChapters[chapterId] = Date.now();
  }
  saveLearnProgress();

  /* Update button */
  const btn = document.getElementById('learnCompleteBtn');
  if (btn) {
    const done = !!LEARN.completedChapters[chapterId];
    btn.className = 'learn-complete-btn' + (done ? ' done' : '');
    btn.innerHTML = done ? '✅ Complete' : '○ Mark Complete';
  }

  /* Update sidebar chapter list */
  document.querySelectorAll('.learn-ch-item').forEach(li => {
    const chId = li.getAttribute('onclick')?.match(/'([^']+)'/g)?.[1]?.replace(/'/g,'');
    if (chId && LEARN.completedChapters[chId]) {
      li.classList.add('completed');
      const num = li.querySelector('.learn-ch-num');
      if (num) num.textContent = '✓';
    }
  });

  /* Update progress bar */
  const entry = TOPIC_KNOWLEDGE[LEARN.parentId];
  if (entry) {
    const total = entry.subtopics.length;
    const done = entry.subtopics.filter(ch => LEARN.completedChapters[ch.id]).length;
    const pct = Math.round((done / total) * 100);
    const fill = document.querySelector('.learn-progress-fill');
    const text = document.querySelector('.learn-progress-text');
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = `${done} / ${total} chapters completed`;
  }
}

/* ══════════════════════════════════════════════════════════════════
   AI ASSISTANT
   ══════════════════════════════════════════════════════════════════ */
function learnAiAsk() {
  const inp = document.getElementById('learnAiInput');
  if (!inp || !inp.value.trim()) return;
  const query = inp.value.trim();
  inp.value = '';

  /* Use existing search system */
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = query;
    /* Trigger the existing AI search */
    const askBtn = document.querySelector('.ask-btn');
    if (askBtn) askBtn.click();
    /* Switch to diagrams/answer panel */
    const mmTab = document.querySelector('.mm-tab[data-panel="diagrams"]');
    if (mmTab) mmTab.click();
  }
}

/* ══════════════════════════════════════════════════════════════════
   OVERRIDE loadSubtopicContent TO USE LEARN MODE
   ══════════════════════════════════════════════════════════════════ */
(function patchLoadSubtopicContent() {
  const _prevLoad = window.loadSubtopicContent;
  window.loadSubtopicContent = function(parentId, subtopicId, title, desc) {
    /* Try learn mode first */
    const didRender = renderLearnView(parentId, subtopicId, title, desc);
    if (didRender) {
      /* Also set AI / quiz context via original function side effects */
      APP.currentTopic    = parentId;
      APP._subtopicId     = subtopicId;
      APP._subtopicTitle  = title;
      const ql = document.getElementById('quizTopic');
      if (ql) ql.textContent = title;
      const inp = document.getElementById('searchInput');
      if (inp) { inp.value = ''; inp.placeholder = `Ask AI about "${title}"…`; }
      return;
    }
    /* Fallback to original behavior */
    if (_prevLoad) _prevLoad(parentId, subtopicId, title, desc);
  };
})();

console.log('%c[LearnMode] Chapter-wise learning view loaded', 'color:#00e5ff;font-weight:bold');
