/* MarineIQ — Subtopic Content Loader: loads chapter content with tabs
   Deps: config.js, topic-knowledge.js (TOPIC_KNOWLEDGE) */

function loadSubtopicContent(parentId, subtopicId, title, desc){
  /* Set current virtual topic for quiz + AI context */
  APP.currentTopic    = parentId;          // keep parent KB for formulas/flashcards
  APP._subtopicId    = subtopicId;
  APP._subtopicTitle = title;

  /* Update title in the topic zone header */
  const titleEl = document.querySelector('.tz-intro-title');
  if(titleEl) titleEl.textContent = title;

  /* Update quiz label */
  const ql = document.getElementById('quizTopic'); if(ql) ql.textContent = title;

  /* Clear search input — set helpful placeholder */
  const inp = document.getElementById('searchInput');
  if(inp){ inp.value = ''; inp.placeholder = `Ask AI about "${title}"…`; }

  /* Filter formulas to subtopic-relevant ones */
  const kb = (typeof TOPIC_KNOWLEDGE !== 'undefined') && TOPIC_KNOWLEDGE[parentId];
  if(kb){
    /* Show all formulas from parent (they're all relevant) */
    if(typeof loadFormulas === 'function') loadFormulas(kb.formulas || []);
    /* Show flashcards */
    if(typeof loadFlashcards === 'function') loadFlashcards(kb.flashcards || []);
    /* Switch to Formulas tab to show content immediately */
    const fmlTab = document.querySelector('.mm-tab[onclick*="formulas"]');
    if(fmlTab) fmlTab.click();
  }

  /* Show subtopic info banner */
  const tzz = document.getElementById('topicZone');
  if(tzz){
    let banner = document.getElementById('stopic-banner');
    if(!banner){
      banner = document.createElement('div');
      banner.id = 'stopic-banner';
      const tabs = tzz.querySelector('.mm-tabs');
      if(tabs) tabs.before(banner); else tzz.appendChild(banner);
    }
    banner.style.cssText = 'margin:10px 0 8px;padding:11px 14px;background:rgba(212,160,23,.07);border:1px solid rgba(212,160,23,.2);border-radius:10px;font-size:.81rem;color:var(--tx2);line-height:1.6;';
    banner.innerHTML = `<strong style="color:var(--tx)">📖 ${esc(title)}</strong><br>${esc(desc)}<br><span style="font-size:.72rem;color:var(--tx3)">Use the AI search below · Ask quiz questions · Study formulas above</span>`;
  }

  /* Scroll to the topic content */
  const tz = document.getElementById('topicZone');
  if(tz) setTimeout(() => tz.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
}

/* ══════════════════════════════════════════════════════════
   5. YEAR SYLLABUS — subject rows become clickable study links
   ══════════════════════════════════════════════════════════ */
(function patchYearSyllabus(){
  /* Map subject names → topic IDs */
  const SUBJ_MAP = {
    'Engineering Mathematics I':'bt_maths1','Engineering Mathematics II':'bt_maths2',
    'Engineering Physics':'bt_physics','Engineering Chemistry':'bt_chem',
    'Engineering Drawing & CAD':'bt_draw','Basic Electrical Engineering':'bt_elec1',
    'Engineering Workshop I':'bt_workshop1','Engineering Workshop II':'bt_workshop2',
    'Engineering Mechanics':'bt_mech','Engineering Thermodynamics I':'bt_thermo1',
    'Engineering Thermodynamics II':'bt_thermo2','Fluid Mechanics I':'bt_fluid1',
    'Fluid Mechanics II':'bt_fluid2','Electrical Engineering II':'bt_elec2',
    'Electrical Engineering III':'bt_elec3','Naval Architecture I':'bt_naval1',
    'Strength of Materials':'bt_strength','Programming & Computers':'bt_prog',
    'Marine Diesel Engine I':'bt_diesel1','Marine Diesel Engine II':'bt_diesel2',
    'Auxiliary Machinery I':'bt_aux','Auxiliary Machinery II':'bt_aux2',
    'Refrigeration & Air Conditioning':'bt_refrig','Automatic Control':'bt_control',
    'Propulsion Engineering':'bt_propulsion','High Voltage Engineering':'bt_hv',
    'Marine Environment Protection':'bt_env','Non-Destructive Testing':'bt_ndt',
    'Ship Casualty Investigation':'bt_casualty','Marine Engineering Management':'bt_mgmt',
  };

  /* Use event delegation on document — fires regardless of when year cards are rendered */
  document.addEventListener('click', function(e){
    const row = e.target.closest('.subject-row');
    if(!row) return;

    /* Add study badge on first click so user knows it's interactive */
    if(!row.dataset.studyPatched){
      row.dataset.studyPatched = '1';
      row.style.cursor = 'pointer';
      const nameEl = row.querySelector('.subject-name');
      if(nameEl && !nameEl.querySelector('.study-badge')){
        const badge = document.createElement('span');
        badge.className = 'study-badge';
        badge.textContent = '→ Study';
        badge.style.cssText = 'font-size:.6rem;color:var(--ac);margin-left:6px;font-family:"JetBrains Mono",monospace;font-weight:700;';
        nameEl.appendChild(badge);
      }
    }

    /* Find topic ID */
    const nameEl = row.querySelector('.subject-name');
    if(!nameEl) return;
    const rawName = nameEl.childNodes[0]?.textContent?.trim() || nameEl.textContent.replace('→ Study','').trim();
    const tid = SUBJ_MAP[rawName];
    if(!tid) return;

    /* Navigate to that topic */
    e.stopPropagation(); /* don't toggle year card */
    const lvl = APP.currentLevel;
    if(!lvl) return;

    /* Find title/desc from level topics */
    let topicTitle = rawName, topicDesc = '', topicIcon = '📖';
    if(lvl.sections){
      for(const [, topics] of Object.entries(lvl.sections)){
        const t = topics.find(t => t.id === tid);
        if(t){ topicTitle = t.title; topicDesc = t.desc || ''; topicIcon = t.icon || '📖'; break; }
      }
    }
    selectTopic(tid, topicTitle, topicDesc, topicIcon, 'B.Tech Syllabus');
  });

  /* Style all subject-rows as clickable from the start */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .subject-row { cursor:pointer!important; transition:background .12s,border-color .12s; }
    .subject-row:hover { background:rgba(212,160,23,.06)!important; border-color:rgba(212,160,23,.25)!important; }
    .subject-row:hover .subject-name { color:var(--ac)!important; }
    body.light-mode .subject-row:hover { background:rgba(176,125,10,.05)!important; }
  `;
  document.head.appendChild(styleEl);
})();

/* ══════════════════════════════════════════════════════════
   6. SIDEBAR: ensure topic zone scrolls into view after select
   ══════════════════════════════════════════════════════════ */
(function(){
  /* The mobile sidebar close is already in the v10 chain (selectTopic at 305942).
     We only need to ensure topic zone is scrolled into view on mobile. */
  const _o = selectTopic;
  selectTopic = function(...a){
    _o(...a);
    if(window.innerWidth <= 900){
      setTimeout(() => {
        const tz = document.getElementById('topicZone');
        if(tz) tz.scrollIntoView({ behavior:'smooth', block:'start' });
      }, 250);
    }
  };
})();

/* ══════════════════════════════════════════════════════════
   7. DEEP RESEARCH — extended comprehensive response
   ══════════════════════════════════════════════════════════ */
(function improveDeepResearch(){
  const _origBSP = buildSystemPrompt;
  buildSystemPrompt = function(mode){
    const base = _origBSP(mode);
    if(mode !== 'deep') return base;
    // Replace the deep instruction with genuinely comprehensive one
    return base.replace(
      /Give a comprehensive.*relevant authority\./,
      `Give a TEXTBOOK-QUALITY, COMPREHENSIVE answer structured as follows. Minimum 800 words.

STRUCTURE:
## 1. Definition & Overview
One precise paragraph defining the topic with all technical terms.

## 2. Fundamental Principles
Detailed engineering principles. Explain WHY things happen, not just WHAT.

## 3. Mathematical Analysis
ALL relevant formulas with:
  - Full notation (each symbol defined with units)
  - Derivation or origin (which law/principle)
  - Worked numerical example with realistic marine engineering values
  - Typical ranges for marine applications

## 4. Construction & Operation (if applicable)
Component-by-component description. How it works step by step.

## 5. Performance, Efficiency & Adjustments
What affects performance. How to optimise. What the parameters indicate.

## 6. Fault Diagnosis & Troubleshooting
At least 4 fault scenarios: symptom → likely cause → corrective action → prevention.
Format as: "SYMPTOM: X | CAUSE: Y | ACTION: Z"

## 7. IMO/MARPOL/STCW Regulations
Cite specific regulation numbers, year, limits, and compliance requirements.

## 8. MMD Oral Examination Questions (5–8 questions)
Questions an examiner would ask. Include correct answer for each.

## 9. Common Mistakes & Exam Traps
What candidates get wrong. What examiners watch for.

## 10. Sources
Reed's Vol. X Ch.X, Pounder's Ed.X Ch.X, IMO Resolution/Circular number.

Use **bold** for all technical terms on first use. Use proper engineering notation.`
    );
  };
})();

/* ══════════════════════════════════════════════════════════
   8. QUIZ FROM SEARCH / TOPIC QUIZ BUTTON
   ══════════════════════════════════════════════════════════ */
(function addSearchQuiz(){
  // Add "Quiz on this topic" button to answer card actions
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(function(){
      const ansActions = document.querySelector('.ans-actions');
      if(!ansActions || ansActions.dataset.sqPatched) return;
      ansActions.dataset.sqPatched = '1';
      const sqBtn = document.createElement('button');
      sqBtn.className = 'action-btn';
      sqBtn.id = 'btnQuizOnTopic';
      sqBtn.innerHTML = '🎯 Quiz this';
      sqBtn.title = 'Generate quiz questions based on the topic you just researched';
      sqBtn.onclick = function(){
        const lastQ = APP.lastQuery || '';
        if(!lastQ){ alert('Ask a question first, then quiz on it.'); return; }
        openSearchQuizModal(lastQ);
      };
      ansActions.insertBefore(sqBtn, ansActions.firstChild);
    }, 1000);
  });
})();

function openSearchQuizModal(topic){
  const overlay = document.getElementById('apiOverlay');
  if(!overlay) return;
  /* Temporarily show a quiz-gen overlay */
  const box = overlay.querySelector('.modal-box');
  if(!box) return;
  const orig = box.innerHTML;
  box.innerHTML = `
    <div class="modal-title">🎯 Quiz: "${topic.slice(0,60)}…"</div>
    <p style="font-size:.82rem;color:var(--tx2);margin:8px 0 16px;line-height:1.6;">
      Generate quiz questions based on your last search topic.<br>
      <strong>Difficulty:</strong>
    </p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
      ${['Easy','Medium','Hard','Mixed'].map(d=>`<button class="modal-cancel" style="flex:1;min-height:44px;font-weight:700;" onclick="launchSearchQuiz('${topic.replace(/'/g,"\\'")}','${d.toLowerCase()}');closeApiModal();"> ${d}</button>`).join('')}
    </div>
    <button class="modal-cancel" onclick="document.querySelector('#apiOverlay .modal-box').innerHTML=arguments[0]" style="width:100%;min-height:40px;" 
      data-orig="${encodeURIComponent(orig)}">✕ Cancel</button>`;
  // Fix cancel button to restore original
  const cancelBtn = box.querySelector('button[data-orig]');
  cancelBtn.onclick = function(){ box.innerHTML = decodeURIComponent(this.dataset.orig); };
  overlay.classList.add('open');
}

async function launchSearchQuiz(topic, difficulty){
  if(!APP.apiKey){ openApiModal(); return; }
  // Set up quiz with topic-based prompt
  QUIZ.difficulty = difficulty;
  QUIZ.count = 10;
  QUIZ._topicId = 'search_'+Date.now();
  QUIZ._topicTitle = topic;

  // Navigate to quiz panel
  const mmTabs = document.querySelectorAll('.mm-tab');
  mmTabs.forEach(t => { if(t.textContent.includes('Quiz')) t.click(); });

  setTimeout(async () => {
    const { system:sysMsg, user:userMsg } = buildAdvQuizPrompt('general', topic, 'marine engineering candidate', difficulty, 10);
    document.getElementById('qv2Setup').style.display = 'none';
    document.getElementById('qv2Loading').style.display = '';
    QUIZ.generating = true; QUIZ.data=[]; QUIZ.index=0; QUIZ.score=0; QUIZ.wrong=[];

    const pid = detectProvider(APP.apiKey);
    try {
      let raw = '';
      if(pid === 'groq'){
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions',{
          method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+APP.apiKey},
          body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:4096,temperature:0.72,
            messages:[{role:'system',content:sysMsg},{role:'user',content:userMsg}]})
        });
        const d = await res.json();
        raw = d.choices?.[0]?.message?.content || '';
      } else if(pid === 'gemini'){
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APP.apiKey}`;
        const res = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({contents:[{parts:[{text:sysMsg+'\n\n'+userMsg}]}],generationConfig:{maxOutputTokens:4096,temperature:0.72}})});
        const d = await res.json();
        raw = d.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } else if(pid === 'openrouter'){
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions',{
          method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+APP.apiKey,'HTTP-Referer':'https://marineiq.study'},
          body:JSON.stringify({model:'meta-llama/llama-3.1-8b-instruct:free',max_tokens:4096,temperature:0.72,
            messages:[{role:'system',content:sysMsg},{role:'user',content:userMsg}]})
        });
        const d = await res.json();
        raw = d.choices?.[0]?.message?.content || '';
      } else {
        // Anthropic
        const res = await fetch('https://api.anthropic.com/v1/messages',{
          method:'POST', headers:{'Content-Type':'application/json','x-api-key':APP.apiKey,
            'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
          body:JSON.stringify({model:(typeof AI_PROVIDERS!=='undefined'&&AI_PROVIDERS.anthropic?.models?.fast)||'claude-haiku-4-5-20251001',
            max_tokens:4096,system:sysMsg,messages:[{role:'user',content:userMsg}]})
        });
        const d = await res.json();
        raw = d.content?.[0]?.text || '';
      }
      const s=raw.indexOf('['),e=raw.lastIndexOf(']');
      if(s<0||e<0) throw new Error('No JSON');
      QUIZ.data = JSON.parse(raw.slice(s,e+1)).filter(q=>q.q&&Array.isArray(q.opts)&&q.opts.length===4&&typeof q.ans==='number');
      QUIZ.generating = false;
      document.getElementById('qv2Loading').style.display = 'none';
      document.getElementById('qv2Question').style.display = '';
      if(typeof renderQuizQ === 'function') renderQuizQ();
    } catch(err){
      QUIZ.generating = false;
      document.getElementById('qv2Loading').style.display = 'none';
      document.getElementById('qv2Setup').style.display = '';
      const n=document.getElementById('qv2SetupNote'); if(n) n.textContent='Error: '+err.message;
    }
  }, 300);
}

/* ══════════════════════════════════════════════════════════
   9. VIDEO AVAILABILITY — filter out known unavailable IDs
      + search-based fallback
   ══════════════════════════════════════════════════════════ */
(function improveVideoCards(){
  // Patch loadVideos to add YouTube search fallback
  const _origLV = loadVideos;
  loadVideos = function(videos){
    // Keep videos with valid 11-char IDs OR with a direct url property
    const valid = (videos||[]).filter(v => (v.id && v.id.length === 11 && /^[A-Za-z0-9_-]+$/.test(v.id)) || v.url);
    _origLV(valid);
    // Add "Search YouTube" fallback link
    const grid = document.getElementById('videoGrid');
    if(!grid) return;
    const topicTitle = document.querySelector('.tz-intro-title')?.textContent || APP.currentTopic || '';
    const searchLink = document.createElement('div');
    searchLink.style.cssText = 'grid-column:1/-1;padding:12px 4px 0;';
    searchLink.innerHTML = `<a href="https://www.youtube.com/results?search_query=${encodeURIComponent(topicTitle+' marine engineering explained')}" target="_blank" rel="noopener noreferrer" style="font-size:.74rem;color:var(--ac);text-decoration:none;display:inline-flex;align-items:center;gap:5px;border:1px solid rgba(212,160,23,.3);padding:6px 14px;border-radius:20px;transition:all .14s;" onmouseover="this.style.background='rgba(212,160,23,.07)'" onmouseout="this.style.background=''">🔍 Search more videos on YouTube →</a>`;
    grid.appendChild(searchLink);
  };
})();

/* ══════════════════════════════════════════════════════════
   10. DIAGRAM — add "Change Topic" / regenerate option
   ══════════════════════════════════════════════════════════ */
(function addDiagramChangeTopic(){
  // Patch renderGeneratedSVG to add a "Custom Topic" input to the footer
  const _origRGS = typeof renderGeneratedSVG === 'function' ? renderGeneratedSVG : null;
  if(!_origRGS) return;
  renderGeneratedSVG = function(svgStr, topicId, topicTitle, containerEl){
    _origRGS(svgStr, topicId, topicTitle, containerEl);
    // Add custom topic input after the footer
    const footer = containerEl.querySelector('.ai-diag-footer');
    if(!footer || footer.dataset.ctPatch) return;
    footer.dataset.ctPatch='1';
    const inp = document.createElement('div');
    inp.style.cssText='padding:8px 14px;border-top:1px solid var(--b0);display:flex;gap:7px;flex-wrap:wrap;';
    inp.innerHTML=`
      <input id="diagCustomTopic" placeholder="Enter any topic to diagram…" 
        style="flex:1;min-width:140px;padding:7px 10px;border-radius:8px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx);font-size:.8rem;outline:none;"
        onkeydown="if(event.key==='Enter') generateCustomDiagram()" />
      <button onclick="generateCustomDiagram()" style="padding:7px 14px;border-radius:8px;background:var(--ac);color:#fff;border:none;cursor:pointer;font-size:.76rem;font-weight:700;white-space:nowrap;min-height:36px;">⚡ Generate</button>`;
    footer.after(inp);
  };
})();

function generateCustomDiagram(){
  const inp = document.getElementById('diagCustomTopic');
  if(!inp || !inp.value.trim()) return;
  const customTopic = inp.value.trim();
  inp.value = '';
  // Find the AI diag container
  const wrap = document.querySelector('.ai-diag-wrap');
  if(!wrap || typeof generateAIDiagram !== 'function') return;
  generateAIDiagram(customTopic, customTopic, document.querySelector('.tz-intro-title')?.textContent||'', wrap);
}

/* ══════════════════════════════════════════════════════════
   11. MORE ACCURATE FORMULAS — fix + extend key topics
   ══════════════════════════════════════════════════════════ */
(function fixAndExtendFormulas(){
  if(typeof TOPIC_KNOWLEDGE === 'undefined') return;

  /* ── Patch cl4_2stroke IHP + add more formulas ── */
  const tk2s = TOPIC_KNOWLEDGE.cl4_2stroke;
  if(tk2s && tk2s.formulas){
    // Fix IHP
    const ihp = tk2s.formulas.find(f=>f.label&&f.label.includes('Indicated'));
    if(ihp){
      ihp.eq   = 'IHP [kW] = (Pm [bar] × L [m] × A [m²] × N [rpm] × k) ÷ 0.6';
      ihp.note = 'Pm=mean effective pressure(bar), L=stroke(m), A=piston area=π×(D/2)²(m²), N=rev/min, k=cylinders. Derivation: Pm×10⁵ Pa × L×A = work per stroke; ×N/60 = W per s = Watts; ÷1000 = kW; 10⁵/60000=5/3, so ÷0.6. Worked example: Pm=18 bar, L=2.4m, D=0.8m → A=0.503m², N=100rpm, k=6 → IHP=18×2.4×0.503×100×6÷0.6 = 21,730 kW. Source: Reed\'s Vol.8 Ch.2';
    }
    // Add missing useful formulas
    const exists = new Set(tk2s.formulas.map(f=>f.label));
    const extra = [
      { label:'Stroke-Bore Ratio',         eq:'S/B = stroke / bore',        note:'Modern 2-stroke: S/B = 3.0-4.2. MAN B&W S80ME-C has S/B=4.23.' },
      { label:'Scavenge Efficiency',        eq:'η_sc = air retained / swept volume', note:'Uniflow: 0.8-0.9. Loop scavenge: 0.7-0.8. Source: Reed\'s Vol.8' },
      { label:'Compression Ratio (2-str)', eq:'r_c = V_total / V_clearance',  note:'Typical 14-18:1. Source: Reed\'s Vol.8' },
      { label:'Thermal Efficiency',         eq:'η_th = W_net / Q_in = 1 - Q_out/Q_in', note:'Higher compression ratio and combustion temperature improve η_th.' },
      { label:'GZ (Righting Lever)',        eq:'GZ = GM × sin θ  (approx. for small θ)', note:'Static stability. Maximum GZ at ~30-40° for well-designed vessels.' },
      { label:'BM (Metacentric Radius)',    eq:'BM = I_WP / V', note:'I_WP=second moment of waterplane area, V=underwater volume.' },
      { label:'Free Surface Correction',   eq:"GG₁ = (i × ρ_liquid) / (V × ρ_ship)", note:'i=second moment of free surface area. Reduces effective GM.' },
      { label:'Period of Roll',             eq:'T = 2π × k / √(g × GM)', note:'k=radius of gyration ≈ 0.38B. Longer period = more comfortable rolling.' },
      { label:'Affinity Law — Flow',        eq:'Q₂/Q₁ = N₂/N₁', note:'For centrifugal pumps/fans. Flow proportional to speed.' },
      { label:'Affinity Law — Head',        eq:'H₂/H₁ = (N₂/N₁)²', note:'Head proportional to speed squared.' },
      { label:'Affinity Law — Power',       eq:'P₂/P₁ = (N₂/N₁)³', note:'Power proportional to speed cubed. 20% speed reduction = 49% power saving.' },
      { label:'NPSH Available',             eq:'NPSHa = (P_suction − P_vapour) / (ρ × g)', note:'Must exceed NPSHr to prevent cavitation.' },
      { label:'Hydraulic Power',            eq:'P = ρ × g × Q × H   [W]', note:'ρ=density, Q=flow rate, H=head. Pump efficiency = P_hydraulic/P_shaft.' },
      { label:'COP',                        eq:'COP = Q_L / W_comp', note:'Coefficient of Performance. Refrigerating effect divided by compressor work.' },
      { label:'Refrigerating Effect',       eq:'RE = h₁ − h₄   [kJ/kg]', note:'Enthalpy difference: evaporator outlet minus expansion valve outlet.' },
      { label:'Compressor Work',            eq:'W = h₂ − h₁   [kJ/kg]', note:'h₂=compressor discharge enthalpy, h₁=suction enthalpy.' },
    ]
    extra.forEach(f=>{ if(!exists.has(f.label)) tk2s.formulas.push(f); });
  }

  /* ── Patch cl3_gzcurve formulas ── */
  const tkgz = TOPIC_KNOWLEDGE.cl3_gzcurve;
  if(tkgz && tkgz.formulas){
    const exists = new Set(tkgz.formulas.map(f=>f.label));
    const extra = [
      { label:"GM (Metacentric Height)",    eq:"GM = KB + BM − KG   [m]",    note:'KB=keel-to-centre-of-buoyancy(m), BM=BM=I/V metacentric radius(m), KG=keel-to-centre-of-gravity(m). Minimum GM for cargo ships ≥ 0.15m (IMO A.749). Source: D.J.Eyres Ship Stability Ch.5' },
      { label:"BM (Metacentric Radius)",    eq:"BM = I_WP / V   [m]",         note:'I_WP=second moment of waterplane area about centreline(m⁴), V=volume of displacement(m³). BM = transverse metacentric radius for small angles. Source: Reed\'s Vol.2' },
      { label:"Free Surface Correction",   eq:"GG₁ = (i × ρ_liquid) / (V × ρ_ship)",  note:'i=second moment of free surface area(m⁴), ρ_liquid=liquid density(t/m³), V=displacement volume(m³), ρ_ship=ship density. Reduces effective GM. Tanks <97% or >3% full. Source: Reed\'s Vol.2 Ch.9' },
      { label:"Period of Roll",             eq:"T = 2π × k / √(g × GM)   [s]", note:'T=period(s), k=radius of gyration≈0.35×B for ships, g=9.81m/s², GM=metacentric height(m). Tender ship → long period → comfortable. Stiff → short → uncomfortable. Source: Reed\'s Vol.2' },
    ];
    extra.forEach(f=>{ if(!exists.has(f.label)) tkgz.formulas.push(f); });
  }

  /* ── Patch cl4_pumps ── */
  const tkp = TOPIC_KNOWLEDGE.cl4_pumps;
  if(tkp && tkp.formulas){
    const exists = new Set(tkp.formulas.map(f=>f.label));
    const extra = [
      { label:"Affinity Law — Flow",        eq:"Q₂/Q₁ = N₂/N₁",              note:'Flow (Q) proportional to speed (N). Double the speed → double the flow. Source: Reed\'s Vol.5' },
      { label:"Affinity Law — Head",        eq:"H₂/H₁ = (N₂/N₁)²",           note:'Head (H) proportional to speed². Double speed → 4× head. Source: Reed\'s Vol.5' },
      { label:"Affinity Law — Power",       eq:"P₂/P₁ = (N₂/N₁)³",           note:'Power proportional to speed³. Double speed → 8× power. Critical for frequency-drive energy savings. Source: Reed\'s Vol.5' },
      { label:"NPSH Available",             eq:"NPSHa = (P_suction − P_vapour) / (ρ × g)  [m]", note:'P_suction=absolute suction pressure(Pa), P_vapour=vapour pressure at operating temp(Pa), ρ=fluid density, g=9.81. Must exceed NPSHr by ≥ 0.5m safety margin.' },
      { label:"Pump Hydraulic Power",       eq:"P_hydraulic = ρ × g × Q × H   [W]",  note:'ρ=density(kg/m³), g=9.81m/s², Q=flow(m³/s), H=head(m). Shaft power = P_hydraulic / η_pump. Source: Reed\'s Vol.5' },
    ];
    extra.forEach(f=>{ if(!exists.has(f.label)) tkp.formulas.push(f); });
  }
})();

/* ══════════════════════════════════════════════════════════
   12. MOBILE UI OVERHAUL — topbar, sidebar, accessibility
   ══════════════════════════════════════════════════════════ */
(function mobileUIFix(){
  const s = document.createElement('style');
  s.id = 'mobile-v13';
  s.textContent = `

/* ── TOPBAR: fix half-cut on mobile ── */
@media (max-width: 768px) {
  :root { --top: 56px !important; }

  .topbar {
    padding: 0 8px !important;
    gap: 6px !important;
    height: var(--top) !important;
    overflow: hidden !important;
  }

  /* Logo compact */
  .logo { font-size: .82rem !important; gap: 4px !important; min-width: 0 !important; }
  .logo-anchor { font-size: .95rem !important; }

  /* Breadcrumb — hide on very small */
  .breadcrumb { display: none !important; }

  /* Topbar actions — right-align, icon-only on mobile */
  .topbar-actions {
    display: flex !important;
    align-items: center !important;
    gap: 4px !important;
    flex-shrink: 0 !important;
    margin-left: auto !important;
  }

  /* Each button — icon only, rounded, minimum tap target */
  .tbtn {
    padding: 0 !important;
    width: 38px !important;
    height: 38px !important;
    border-radius: 10px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 0 !important; /* hide text label */
    overflow: hidden !important;
    flex-shrink: 0 !important;
  }
  .tbtn .tbtn-icon { font-size: 1.1rem !important; margin: 0 !important; display: block !important; }
  .tbtn .tbtn-label { display: none !important; }

  /* Mode toggle — compact */
  .mode-toggle { width: 40px !important; height: 22px !important; flex-shrink: 0 !important; }
  .mode-toggle-knob { width: 16px !important; height: 16px !important; top: 2px !important; }
  body.light-mode .mode-toggle-knob { transform: translateX(18px) !important; }

  /* Streak badge — hide on smallest screens to save space */
  .streak-badge { display: none !important; }

  /* Hamburger menu button — make larger */
  #btnMenu {
    width: 42px !important; height: 42px !important;
    font-size: 1.3rem !important; border-radius: 10px !important;
    flex-shrink: 0 !important;
  }

  /* Main content offset */
  .app-layout { padding-top: var(--top) !important; }

  /* Fix sidebar width */
  .sidebar { width: 88vw !important; max-width: 340px !important; }
}

/* ── Very small phones (iPhone SE, 375px) ── */
@media (max-width: 390px) {
  .tbtn { width: 34px !important; height: 34px !important; }
  .tbtn .tbtn-icon { font-size: 1rem !important; }
  .mode-toggle { width: 36px !important; }
  .logo { font-size: .75rem !important; }
}

/* ── LIGHT MODE MOBILE: better contrast ── */
@media (max-width: 768px) {
  body.light-mode .topbar {
    background: white !important;
    border-bottom: 1px solid var(--b0) !important;
    box-shadow: 0 1px 12px rgba(13,30,53,.1) !important;
  }
  body.light-mode .tbtn {
    background: var(--bg2) !important;
    border-color: var(--b1) !important;
    color: var(--tx2) !important;
  }
  body.light-mode .logo { color: var(--tx) !important; }

  /* Main panels mobile padding fix */
  .level-page, .home-screen { padding: 16px 14px 100px !important; }
  .tz-header { padding: 14px 14px 10px !important; }
  .mm-tabs { padding: 3px !important; margin: 0 !important; }
  .mm-panel { padding: 12px 10px !important; }

  /* Search row — wrap buttons below the search input on narrow */
  .search-row { flex-wrap: wrap !important; gap: 6px !important; }
  .search-wrap { flex: 1 1 100% !important; min-width: 0 !important; }

  /* Quiz options more readable on mobile */
  .qv2-opt { padding: 12px 14px !important; font-size: .83rem !important; min-height: 52px !important; }
  .qv2-q-text { font-size: .9rem !important; line-height: 1.55 !important; }

  /* Formula cards on mobile */
  .fv3-eq { font-size: .78rem !important; padding: 9px 10px !important; }
  .fv3-vrow { font-size: .72rem !important; }

  /* Better answer card on mobile */
  .ans-body { font-size: .86rem !important; line-height: 1.8 !important; }
  .ans-header { padding: 10px 12px !important; }
  .ans-actions { padding: 8px 10px !important; gap: 6px !important; flex-wrap: wrap !important; }
  .action-btn { font-size: .66rem !important; padding: 6px 10px !important; min-height: 36px !important; }

  /* Video cards full width */
  .yt-card-v2 { width: 100% !important; }

  /* Input/search bigger tap targets */
  .search-input { min-height: 48px !important; font-size: 16px !important; }
  .ask-btn { min-height: 48px !important; }

  /* Diagram grid single col */
  .diag-grid { grid-template-columns: 1fr !important; }
}

/* ── FIX: sidebar topic list readable in light mode mobile ── */
body.light-mode .sb-topic { color: var(--tx2) !important; min-height: 44px !important; }
body.light-mode .sb-topic.active { background: rgba(176,125,10,.08) !important; border-left-color: var(--ac) !important; color: var(--tx) !important; }
body.light-mode .sb-rank-title { color: var(--tx) !important; }
body.light-mode .sb-rank-label { color: var(--tx3) !important; }

/* ── FIX: topbar exam mode active button ── */
#btnExam.on .tbtn-icon::after { content: ''; }
body.light-mode #btnExam.on { background: rgba(220,38,38,.1) !important; border-color: #dc2626 !important; }

/* ── Notes pip in light mode ── */
body.light-mode .notes-count-pip { background: #dc2626 !important; color: white !important; }

/* ── Bottom FAB: ensure above mobile nav ── */
#fabAsk { bottom: calc(16px + env(safe-area-inset-bottom, 0px)) !important; }

/* ── Scroll indicators for horizontal tabs on mobile ── */
.mm-tabs { -webkit-overflow-scrolling: touch !important; scroll-snap-type: x mandatory !important; }
.mm-tab { scroll-snap-align: start !important; }

  `;
  document.head.appendChild(s);
})();

/* ══════════════════════════════════════════════════════════
   13. ADDITIONAL TOPIC FORMULAS — more accuracy
   ══════════════════════════════════════════════════════════ */
(function addMoreFormulas(){
  if(typeof TOPIC_KNOWLEDGE === 'undefined') return;
  
  // cl3_refrig — add proper refrigeration cycle formulas
  if(TOPIC_KNOWLEDGE.cl3_refrig){
    const exists = new Set((TOPIC_KNOWLEDGE.cl3_refrig.formulas||[]).map(f=>f.label));
    [
      { label:"Coefficient of Performance", eq:"COP = Q_L / W_comp = Q_L / (Q_H − Q_L)", note:'Q_L=heat removed from cold space(kJ/kg), W_comp=compressor work(kJ/kg), Q_H=heat rejected to condenser. Typical ship reefer COP=2–4. Source: Reed\'s Vol.4 Ch.12' },
      { label:"Refrigerating Effect",        eq:"RE = h₁ − h₄   [kJ/kg]",                 note:'h₁=enthalpy at compressor inlet(kJ/kg), h₄=enthalpy after expansion valve(kJ/kg). Higher RE → more efficient system. Source: Reed\'s Vol.4' },
      { label:"Compressor Work (Refrign)",   eq:"W = h₂ − h₁   [kJ/kg]",                  note:'h₂=enthalpy after isentropic compression, h₁=enthalpy at suction. Actual work > ideal due to isentropic efficiency η_is=0.75–0.85. Source: Reed\'s Vol.4' },
    ].forEach(f=>{ if(!exists.has(f.label)) TOPIC_KNOWLEDGE.cl3_refrig.formulas.push(f); });
  }

  // cl4_turbo — add missing turbocharger formulas
  if(TOPIC_KNOWLEDGE.cl4_turbo){
    const exists = new Set((TOPIC_KNOWLEDGE.cl4_turbo.formulas||[]).map(f=>f.label));
    [
      { label:"Isentropic Temperature Rise", eq:"T₂s/T₁ = (P₂/P₁)^((γ−1)/γ)",          note:'T in Kelvin, P=absolute pressure(bar), γ=ratio of specific heats (1.4 for air). T₂s=ideal outlet temp. Actual T₂=T₁+(T₂s−T₁)/η_is. Source: ABB Turbocharging Manual' },
      { label:"Turbocharger Power Balance",  eq:"W_turbine = W_compressor + W_mechanical", note:'Energy from exhaust gas (turbine) = energy to compress scavenge air (compressor) + bearing/seal losses. Basis of all TC matching calculations. Source: Reed\'s Vol.8 Ch.5' },
      { label:"Mass Flow Through TC",        eq:"ṁ_exhaust = ṁ_air + ṁ_fuel",             note:'ṁ=mass flow rate(kg/s). Conservation of mass through turbocharger. ṁ_exhaust slightly > ṁ_air due to fuel added in cylinder.' },
    ].forEach(f=>{ if(!exists.has(f.label)) TOPIC_KNOWLEDGE.cl4_turbo.formulas.push(f); });
  }

  // ce_sfoc — SFOC calculation with full worked example
  if(TOPIC_KNOWLEDGE.ce_sfoc || TOPIC_KNOWLEDGE.cl4_2stroke){
    const tk = TOPIC_KNOWLEDGE.ce_sfoc || TOPIC_KNOWLEDGE.cl4_2stroke;
    if(tk.formulas){
      const exists = new Set(tk.formulas.map(f=>f.label));
      if(!exists.has('SFOC from Logbook Data')){
        tk.formulas.push({ label:"SFOC from Logbook Data", eq:"SFOC [g/kWh] = (Fuel cons. [tonnes/day] × 10⁶) / (Power [kW] × 24)", note:'Convert tonnes/day: ×1000kg/t ×1000g/kg = ×10⁶. Example: 50 t/day, 15,000 kW → SFOC = (50×10⁶)/(15000×24) = 138.9 g/kWh. ME-C targets: 155–175 g/kWh at MCR. Source: MAN B&W Project Guide G95ME-C' });
      }
    }
  }
})();

console.log('%cMarineIQ v13 — Mega patch loaded. All issues addressed.', 'color:#f59e0b;font-weight:bold');




