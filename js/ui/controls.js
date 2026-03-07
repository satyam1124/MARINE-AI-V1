/* MarineIQ — App Controls: Model selection, Exam mode, Progress, Breadcrumb
   Deps: config.js (APP) */

function selectModel(model) {
  APP.currentModel = model;
  document.querySelectorAll('.model-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.model === model);
  });
}

/* ─────────── EXAM MODE ─────────── */
function toggleExamMode() {
  APP.examMode = !APP.examMode;
  document.getElementById('btnExam').classList.toggle('on', APP.examMode);
}

/* ─────────── STUDIED TRACKING ─────────── */
function markStudied(topicId) {
  APP.studied[topicId] = true;
  localStorage.setItem('marineiq_studied', JSON.stringify(APP.studied));
  const btn = document.getElementById('sbt_' + topicId);
  if (btn && !btn.querySelector('.sb-studied')) {
    const dot = document.createElement('span');
    dot.className = 'sb-studied';
    btn.appendChild(dot);
  }
}

/* ─────────── NAVIGATION ─────────── */
function goHome() {
  APP.currentLevel = null;
  APP.currentTopic = null;
  document.getElementById('homeScreen').style.display = 'block';
  document.getElementById('levelPage').classList.remove('visible');
  document.getElementById('sidebar').classList.remove('visible');
  document.getElementById('mainEl').classList.remove('sb-open');
  setBreadcrumb([{ label: 'HOME', active: true }]);
}

/* ─────────── BREADCRUMB ─────────── */
function setBreadcrumb(items) {
  const bc = document.getElementById('breadcrumb');
  bc.innerHTML = items.map((item, i) => {
    const sep = i > 0 ? '<span class="bc-sep">›</span>' : '';
    return `${sep}<span class="bc-item ${item.active ? 'active' : ''}" ${item.action ? `onclick="${item.action}"` : ''}>${esc(item.label)}</span>`;
  }).join('');
}

