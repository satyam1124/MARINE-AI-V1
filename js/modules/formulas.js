/* MarineIQ — Formula Panel Loader
   Deps: config.js, topic-knowledge.js (TOPIC_KNOWLEDGE) */

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

