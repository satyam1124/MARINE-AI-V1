/* MarineIQ — Formula Visualizer v3: parse, render, filter, copy with color coding
   Deps: config.js, utils.js (esc) */

/* Math-safe HTML escaper: prevents XSS but preserves Unicode math symbols
   (subscripts ₀₁₂₃ₛₜ, superscripts ²³, Greek ηρλωαβγ, operators ≤≥≈×÷±→) */
function escMath(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  // Note: does NOT escape single quotes or Unicode — preserves ₀₁₂ η ρ ² ³ ≤ ≥ etc.
}

/* ─── 1a. VARIABLE PARSER ─────────────────────────────── */
function fmlParseVars(note) {
  const out = []; if (!note) return out;
  const seen = new Set();
  // Strip source citations from end
  const clean = note
    .replace(/\.?\s*Source:.*$/i, '')
    .replace(/\.?\s*Reed['\\]?s?.*$/i, '')
    .replace(/\.?\s*MAN B&W.*$/i, '')
    .replace(/\.?\s*Pounder['\\]?s?.*$/i, '');
  // Match: SYM = desc or SYM=desc, optional (unit) or [unit]
  const pat = /(?<![A-Za-z0-9_])([A-Za-zΔηρλωαβγΩΣμẇṁ_][A-Za-z0-9_₀₁₂₃₄ₛₜ']{0,6})\s*[=:]\s*([^,;=\n<>]{2,45}?)(?:\s*[(\[]([^)\]]{1,14})[)\]])?(?=\s*[,;\n.]|$)/g;
  let m;
  while ((m = pat.exec(clean)) !== null) {
    const sym = m[1].trim();
    let desc   = m[2].trim().replace(/[.,]+$/, '');
    const unit = (m[3] || '').trim();
    if (seen.has(sym) || sym.length > 8) continue;
    if (/^[_\d]/.test(sym)) continue;
    if (/^(source|note|from|see|use|the|and|for|at|in|of|per)$/i.test(sym)) continue;
    if (/^[\d.–~−]/.test(desc)) continue; // typical value, not definition
    if (desc.length < 2 || desc.length > 50) continue;
    seen.add(sym);
    out.push({ sym, desc, unit });
  }
  return out;
}

/* ─── 1b. SMART EQUATION COLORIZER ──────────────────────
   Idea: everything left of the FIRST = is the "result" (teal)
         everything right is the "expression" — color sub-elements
   ─────────────────────────────────────────────────────── */
function fmlColorEq(eq) {
  // HTML-escape first
  let s = eq.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // Split at first = to get LHS and RHS
  const eqIdx = s.search(/\s[=≈]\s/);
  let lhs = '', rhs = s, unit = '';

  // Extract trailing unit [kW] or (g/kWh)
  const unitM = s.match(/\s*[[(]([^\])\n]{1,16})[\])]\s*$/);
  if (unitM) { unit = unitM[0]; s = s.slice(0, -unit.length); rhs = s; }

  if (eqIdx > 0) {
    lhs = s.slice(0, eqIdx);
    rhs = s.slice(eqIdx + 1); // includes the operator
  }

  /* Token-safe colorizer: replaces text tokens with HTML spans
     Uses a placeholder approach to prevent already-inserted HTML
     from being mangled by subsequent regex passes */
  function colorRHS(t) {
    const tags = [];
    let safe = t;

    // Phase 1: apply regexes in order, each time protecting previous spans
    function applyAndProtect(regex, replacement) {
      safe = safe.replace(regex, function() {
        const result = replacement.apply(null, arguments);
        const placeholder = '\x00' + tags.length + '\x00';
        tags.push(result);
        return placeholder;
      });
    }

    // Greek letters
    applyAndProtect(/(η|ρ|α|β|γ|λ|ω|Δ|μ|σ|π|Ω|Σ)/g, (m, g) => '<b class="fceq-gr">' + g + '</b>');
    // Subscripted symbols: P_shaft, T₁
    applyAndProtect(/([A-Za-z])\s*_\s*([A-Za-z0-9]+)/g, (m, v, sub) => '<span class="fceq-v">' + v + '</span><sub class="fceq-sub">' + sub + '</sub>');
    // Numbers with units
    applyAndProtect(/(\d+\.?\d*)\s*(bar|kPa|MPa|kW|rpm|°C|K|m³|m²|m\/s|m|kg|g\/kWh|ppm|%)/g, (m, n, u) => '<span class="fceq-n">' + n + '</span><span class="fceq-u"> ' + u + '</span>');
    // Pure numbers (only match if NOT inside a placeholder)
    applyAndProtect(/\b(\d+\.?\d*)\b/g, (m, n) => '<span class="fceq-n">' + n + '</span>');
    // Operators
    applyAndProtect(/([=≈≥≤×÷±→])/g, (m, op) => '<span class="fceq-op">' + op + '</span>');
    // Remaining capital variable tokens (1-2 char)
    applyAndProtect(/\b([A-Z][A-Z0-9]?)\b/g, (m, v) => '<span class="fceq-v">' + v + '</span>');

    // Phase 2: restore all placeholders
    let result = safe;
    for (let i = tags.length - 1; i >= 0; i--) {
      result = result.replace('\x00' + i + '\x00', tags[i]);
    }
    return result;
  }

  const lhsHTML = lhs
    ? '<span class="fceq-lhs">' + lhs.trim() + '</span><span class="fceq-op"> = </span>'
    : '';
  const rhsHTML = colorRHS(rhs.replace(/^\s*[=≈]\s*/, ''));
  const unitHTML = unit
    ? '<span class="fceq-unit">' + unit.trim() + '</span>'
    : '';

  return lhsHTML + rhsHTML + unitHTML;
}

/* ─── 1c. CATEGORY CLASSIFIER ───────────────────────────
   Returns { icon, label, color } for a formula
   ─────────────────────────────────────────────────────── */
function fmlCategory(label, eq) {
  const t = (label + ' ' + eq).toLowerCase();
  if (/power|ihp|bhp|bhp|sfoc|mep|indicator/.test(t))  return { i:'⚡', l:'Power',       c:'#f97316' };
  if (/pump|flow|head|cavit|npsh|affin|bernoulli/.test(t)) return { i:'💧', l:'Fluid',    c:'#38bdf8' };
  if (/heat|temp|boil|evap|steam|enthal|latent/.test(t))   return { i:'🔥', l:'Heat',     c:'#fb923c' };
  if (/stability|gz|gm|bm|freeboard|metacen/.test(t))      return { i:'⚓', l:'Stability',c:'#a78bfa' };
  if (/electric|volt|amp|resist|power factor/.test(t))     return { i:'⚡', l:'Electrical',c:'#facc15' };
  if (/turbo|compress|scaveng|pressure ratio|isentr/.test(t)) return { i:'🌀', l:'TC/Air', c:'#4ade80' };
  if (/purif|viscosity|density|separat/.test(t))           return { i:'⚗',  l:'Fluid Props',c:'#c084fc' };
  if (/marpol|nox|sox|cii|seemp|annex/.test(t))            return { i:'📋', l:'Regulation',c:'#60a5fa' };
  if (/fuel|sfoc|injection|timing|combustion/.test(t))     return { i:'🔥', l:'Combustion',c:'#f59e0b' };
  if (/shaft|torque|speed|propul|thrust/.test(t))          return { i:'🔩', l:'Propulsion',c:'#34d399' };
  return { i:'Σ',   l:'General',    c:'#94a3b8' };
}

/* ─── 1d. MAIN RENDER ────────────────────────────────── */
loadFormulas = function(formulas) {
  const grid = document.getElementById('formulaGrid');
  if (!grid) return;

  if (!formulas || !formulas.length) {
    grid.innerHTML = `
      <div class="fv3-empty">
        <div class="fv3-empty-sym">Σ</div>
        <div class="fv3-empty-title">No formulas for this topic</div>
        <div class="fv3-empty-sub">Ask the AI below for detailed formulas and derivations</div>
      </div>`;
    return;
  }

  grid._fmls = formulas;
  grid.innerHTML = `
    <div class="fv3-bar">
      <input class="fv3-search" id="fv3Q" placeholder="🔍  Filter formulas…"
        oninput="fv3Filter()" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"/>
      <span class="fv3-total" id="fv3Total">${formulas.length} formulas</span>
    </div>
    <div class="fv3-grid" id="fv3Grid"></div>`;

  fv3Render(formulas, document.getElementById('fv3Grid'));
};

function fv3Render(fmls, container) {
  if (!container) return;
  container.innerHTML = fmls.map((f, i) => {
    const cat   = fmlCategory(f.label, f.eq);
    const vars  = fmlParseVars(f.note || '');
    const eqH   = fmlColorEq(f.eq);
    const id    = 'fv3c_' + i;
    const unit  = (f.eq.match(/\[([^\]]+)\]\s*$/) || f.eq.match(/\(([^)]{1,12})\)\s*$/) || [])[1] || '';
    // Clean note: strip source, strip var definitions (they're in table)
    const noteClean = (f.note || '')
      .replace(/\.?\s*Source:.*$/i,'').replace(/\.?\s*Reed['\\].*$/i,'')
      .replace(/\b[A-Z_]{1,5}=[^,\n]+,?/g,'').replace(/,\s*$/, '').trim();
    const hasVars = vars.length > 0;
    const showNote = !hasVars && noteClean.length > 4;

    return `
<div class="fv3-card" id="${id}" style="--cat:${cat.c}">
  <div class="fv3-stripe"></div>
  <div class="fv3-inner">

    <div class="fv3-top">
      <div class="fv3-meta">
        <span class="fv3-catbadge">${cat.i} ${cat.l}</span>
        ${unit ? `<span class="fv3-unit">${escMath(unit)}</span>` : ''}
      </div>
      <button class="fv3-copy" title="Copy formula" onclick="fv3Copy(this,'${f.eq.replace(/'/g,"\\'").replace(/\\/g,'\\\\')}')">⎘</button>
    </div>

    <div class="fv3-label">${escMath(f.label)}</div>

    <div class="fv3-eq">${eqH}</div>

    ${hasVars ? `
    <div class="fv3-vars" id="${id}_v">
      <div class="fv3-vars-title">Variables</div>
      ${vars.map(v=>`
        <div class="fv3-vrow">
          <code class="fv3-vsym">${escMath(v.sym)}</code>
          <span class="fv3-vdesc">${escMath(v.desc)}</span>
          ${v.unit?`<span class="fv3-vunit">${escMath(v.unit)}</span>`:''}
        </div>`).join('')}
    </div>` : ''}

    ${showNote ? `<div class="fv3-note">${escMath(noteClean)}</div>` : ''}

    ${f.source ? `<div class="fv3-src">📚 ${escMath(f.source)}</div>` : ''}

  </div>
</div>`;
  }).join('');
}

function fv3Filter() {
  const grid = document.getElementById('formulaGrid');
  const q = (document.getElementById('fv3Q')?.value || '').toLowerCase().trim();
  const all = grid?._fmls;
  if (!all) return;
  const fil = q ? all.filter(f => (f.label+' '+f.eq+' '+(f.note||'')).toLowerCase().includes(q)) : all;
  document.getElementById('fv3Total').textContent = q ? `${fil.length} / ${all.length}` : `${all.length} formulas`;
  fv3Render(fil, document.getElementById('fv3Grid'));
}

function fv3Copy(btn, eq) {
  const ok = () => { btn.textContent='✓'; btn.style.color='#34d399'; setTimeout(()=>{btn.textContent='⎘';btn.style.color='';},1600); };
  if (navigator.clipboard) { navigator.clipboard.writeText(eq).then(ok).catch(ok); return; }
  const ta = Object.assign(document.createElement('textarea'),{value:eq});
  ta.style.cssText='position:fixed;opacity:0';
  document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch(e){} document.body.removeChild(ta); ok();
}

/* ─── 1e. FORMULA CSS ────────────────────────────────── */
(function(){
  const s = document.createElement('style');
  s.id='fv3-css';
  s.textContent = `
/* ── layout ── */
.formula-grid { display:flex!important; flex-direction:column!important; gap:0!important; }
.fv3-bar { display:flex; align-items:center; gap:10px; margin-bottom:14px; flex-wrap:wrap; }
.fv3-search {
  flex:1; min-width:160px; padding:10px 14px; border-radius:10px;
  border:1px solid var(--b1); background:var(--bg2); color:var(--tx);
  font-size:16px; outline:none;
  transition:border-color .15s, box-shadow .15s;
}
.fv3-search:focus { border-color:var(--ac); box-shadow:0 0 0 3px rgba(212,160,23,.12); }
.fv3-total { font-family:'JetBrains Mono',monospace; font-size:.62rem; color:var(--tx3); white-space:nowrap; }
.fv3-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); gap:12px; }

/* ── card ── */
.fv3-card {
  display:flex; border-radius:14px; overflow:hidden;
  background:var(--bg1); border:1px solid var(--b0);
  transition:border-color .15s,box-shadow .15s,transform .15s;
}
.fv3-card:hover {
  border-color:var(--cat,var(--b2));
  box-shadow:0 6px 24px rgba(0,0,0,.22);
  transform:translateY(-2px);
}
.fv3-stripe { width:4px; flex-shrink:0; background:var(--cat,#94a3b8); }
.fv3-inner  { padding:14px 16px; flex:1; min-width:0; display:flex; flex-direction:column; gap:8px; }

/* ── card top row ── */
.fv3-top { display:flex; align-items:center; justify-content:space-between; gap:6px; }
.fv3-meta { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.fv3-catbadge {
  font-size:.6rem; font-family:'JetBrains Mono',monospace; font-weight:700;
  padding:2px 8px; border-radius:20px; letter-spacing:.04em;
  border:1px solid var(--cat,#94a3b8);
  color:var(--cat,var(--tx3));
  background:color-mix(in srgb,var(--cat,#94a3b8) 10%,transparent);
}
.fv3-unit {
  font-size:.62rem; font-family:'JetBrains Mono',monospace; font-weight:700;
  padding:2px 8px; border-radius:20px;
  background:rgba(212,160,23,.1); border:1px solid rgba(212,160,23,.28);
  color:var(--acL);
}
.fv3-copy {
  background:none; border:1px solid var(--b1); border-radius:6px;
  color:var(--tx3); cursor:pointer; font-size:.85rem;
  width:28px; height:28px; display:flex; align-items:center; justify-content:center;
  transition:all .12s; flex-shrink:0; padding:0;
}
.fv3-copy:hover { border-color:var(--ac); color:var(--ac); }

/* ── label ── */
.fv3-label {
  font-family:'JetBrains Mono',monospace; font-size:.6rem;
  letter-spacing:.09em; text-transform:uppercase; color:var(--tx3);
  font-weight:600; line-height:1.4;
}

/* ── equation box ── */
.fv3-eq {
  background:var(--bg2); border:1px solid var(--b0); border-radius:8px;
  padding:11px 13px; font-family:'JetBrains Mono',monospace;
  font-size:.9rem; line-height:1.7; word-break:break-word;
  color:var(--tx);
}
/* Equation color tokens */
.fceq-lhs { color:#67e8f9; font-weight:700; }   /* result symbol — teal */
.fceq-v   { color:#93c5fd; font-weight:600; }   /* variable — blue */
.fceq-gr  { color:#fb923c; font-weight:700; }   /* greek — orange */
.fceq-n   { color:#86efac; }                    /* number — green */
.fceq-u   { color:#d4a017; font-size:.78em; }   /* unit — gold */
.fceq-op  { color:var(--tx3); }
.fceq-sub { color:#94a3b8; font-size:.7em; }
.fceq-unit{ color:#d4a017; font-size:.82em; margin-left:4px; }

/* ── variable table ── */
.fv3-vars { display:flex; flex-direction:column; gap:4px; }
.fv3-vars-title {
  font-family:'JetBrains Mono',monospace; font-size:.55rem;
  letter-spacing:.1em; color:var(--tx3); text-transform:uppercase; margin-bottom:2px;
}
.fv3-vrow { display:flex; align-items:baseline; gap:8px; font-size:.76rem; line-height:1.55; }
.fv3-vsym {
  font-family:'JetBrains Mono',monospace; font-size:.8rem;
  color:#93c5fd; font-weight:700; min-width:28px; text-align:right;
  background:rgba(147,197,253,.08); border-radius:4px; padding:1px 6px; flex-shrink:0;
}
.fv3-vdesc { color:var(--tx2); flex:1; }
.fv3-vunit {
  font-family:'JetBrains Mono',monospace; font-size:.62rem;
  color:var(--acL); background:rgba(212,160,23,.08);
  border:1px solid rgba(212,160,23,.22); border-radius:4px; padding:1px 5px; flex-shrink:0;
}

/* ── note & source ── */
.fv3-note { font-size:.75rem; color:var(--tx2); line-height:1.55; padding-top:2px; }
.fv3-src  { font-size:.6rem; color:var(--tx3); font-style:italic; border-top:1px solid var(--b0); padding-top:6px; margin-top:2px; }

/* ── empty ── */
.fv3-empty { padding:36px 20px; text-align:center; border:1px dashed var(--b1); border-radius:14px; background:var(--bg2); }
.fv3-empty-sym   { font-size:2.4rem; color:var(--tx3); margin-bottom:8px; font-family:'JetBrains Mono',monospace; }
.fv3-empty-title { font-size:.86rem; font-weight:700; color:var(--tx); margin-bottom:4px; }
.fv3-empty-sub   { font-size:.74rem; color:var(--tx3); }

/* ══ LIGHT MODE ══ */
body.light-mode .fv3-search { background:white!important; border-color:var(--b1)!important; color:var(--tx)!important; }
body.light-mode .fv3-card   { background:white!important; border-color:var(--b0)!important; }
body.light-mode .fv3-card:hover { box-shadow:0 6px 24px rgba(13,30,53,.1)!important; }
body.light-mode .fv3-eq     { background:var(--bg2)!important; border-color:var(--b0)!important; color:var(--tx)!important; }
body.light-mode .fceq-lhs  { color:#0369a1!important; }
body.light-mode .fceq-v    { color:#1d4ed8!important; }
body.light-mode .fceq-gr   { color:#c2410c!important; }
body.light-mode .fceq-n    { color:#15803d!important; }
body.light-mode .fceq-u    { color:#92400e!important; }
body.light-mode .fceq-unit { color:#92400e!important; }
body.light-mode .fv3-vsym  { color:#1d4ed8!important; background:rgba(29,78,216,.06)!important; }
body.light-mode .fv3-vdesc { color:var(--tx2)!important; }
body.light-mode .fv3-vunit { color:var(--ac)!important; background:rgba(176,125,10,.06)!important; border-color:rgba(176,125,10,.2)!important; }
body.light-mode .fv3-note  { color:var(--tx2)!important; }
body.light-mode .fv3-src   { color:var(--tx3)!important; border-top-color:var(--b0)!important; }
body.light-mode .fv3-total { color:var(--tx3)!important; }
body.light-mode .fv3-copy  { border-color:var(--b1)!important; color:var(--tx3)!important; }
body.light-mode .fv3-copy:hover { border-color:var(--ac)!important; color:var(--ac)!important; }
body.light-mode .fv3-empty { background:var(--bg2)!important; border-color:var(--b1)!important; }

/* mobile */
@media(max-width:768px){
  .fv3-grid { grid-template-columns:1fr!important; }
  .fv3-eq   { font-size:.82rem!important; }
}
  `;
  document.head.appendChild(s);
})();

