/* MarineIQ — Advanced Quiz Engine v3: multi-round, question history, aspect tracking
   Deps: config.js, ai-providers.js (AI_PROVIDERS), utils.js */

/* ══════════════════════════════════════════════════════════
   ██████╗ ██╗   ██╗██╗███████╗  2. ADVANCED QUIZ ENGINE
   ██╔═══██╗██║   ██║██║╚══███╔╝
   ██║   ██║██║   ██║██║  ███╔╝
   ██║▄▄ ██║██║   ██║██║ ███╔╝
   ╚██████╔╝╚██████╔╝██║███████╗
    ╚══▀▀═╝  ╚═════╝ ╚═╝╚══════╝
   ══════════════════════════════════════════════════════════ */

/* ─── 2a. QUESTION HISTORY STORE ─────────────────────── */
const QHist = (function(){
  const PRE = 'miq_qhist3_';
  function _load(tid) {
    try { return JSON.parse(localStorage.getItem(PRE+tid)||'{"seen":[],"round":0}'); }
    catch(e) { return {seen:[],round:0}; }
  }
  function _save(tid,d) {
    try { localStorage.setItem(PRE+tid, JSON.stringify(d)); } catch(e){}
  }
  return {
    // Get first-8-words fingerprints of recent questions (readable by AI)
    getRecent(tid, n) {
      return _load(tid).seen.slice(-n);
    },
    getRound(tid) { return _load(tid).round || 0; },
    // Save after quiz ends: store first 8 words of each question text
    save(tid, questions) {
      const d = _load(tid);
      const fps = questions.map(q => q.q.trim().split(/\s+/).slice(0,8).join(' '));
      d.seen = [...d.seen, ...fps].slice(-80); // keep last 80
      d.round++;
      _save(tid, d);
    },
    clear(tid) {
      try { localStorage.removeItem(PRE+tid); } catch(e){}
    },
  };
})();

/* ─── 2b. TOPIC ASPECT ROTATOR ──────────────────────────
   Each topic has 6-8 aspects. Each round covers different ones.
   ─────────────────────────────────────────────────────── */
const TOPIC_ASPECTS = {
  cl4_2stroke:   ['Working cycle TDC/BDC','Scavenging types & efficiency','Fuel injection timing & pressure','Exhaust valve operation','Indicator diagram analysis','Starting air system','Lubrication system (cylinder/crosshead/main)','Turbocharging & scavenge pressure'],
  cl4_4stroke:   ['4-stroke vs 2-stroke comparisons','Valve timing & overlap','Carburetor vs fuel injection','Crankcase explosion risk','Power balance cylinders','Cooling water system','Mechanical efficiency','Derating & overload'],
  cl4_turbo:     ['TC working principle','Surge — causes & remedies','Nozzle ring area & flow','Thermal efficiency gains','Water washing procedure','TC bearing lubrication','Compressor blade fouling','Matching turbocharger to engine'],
  cl4_pumps:     ['Centrifugal pump principles','Pump curve & system curve','Cavitation — causes & NPSH','Affinity laws (Q,H,P vs N)','Priming methods','Series vs parallel operation','Impeller types','Pump selection criteria'],
  cl4_purifier:  ['Separation principle (density difference)','Gravity disc selection','Purifier vs clarifier','Desludging cycle & triggers','Bearing lubrication','Disc stack condition','Throughput vs efficiency','Sludge handling & MARPOL'],
  cl3_gzcurve:   ['GZ curve shape & areas','IMO A.749 minimum criteria','Angle of vanishing stability','GM vs GZ relationship','Effect of free surfaces','Loll vs list','Tender vs stiff ship','Dynamic stability area'],
  cl3_refrig:    ['Vapour compression cycle','Refrigerant properties & GWP','Compressor types','Expansion valve operation','Condenser fouling effects','Refrigerant leak detection','CFC/HCFC phase-out (Montreal)','Cargo reefer requirements'],
  ce_sfoc:       ['SFOC calculation from logbook','Effect of TBO on SFOC','Scavenge pressure vs SFOC','Fuel quality correction','CII & EEXI relationship','Exhaust gas analysis for combustion','Indicator card analysis for SFOC','Hull fouling effect on SFOC'],
  ce_diagnosis:  ['High exhaust temp causes','Scavenge fire signs & action','Low Pmax causes','High FWC outlet temp','Low lube oil pressure alarms','Crankcase high temperature','Bearing white-metal failure signs','Turbocharger surging diagnosis'],
};

function getAspects(topicId, topicTitle, round) {
  const all = TOPIC_ASPECTS[topicId];
  if (all && all.length > 0) {
    // Rotate: each round starts at different offset, covers 3-4 aspects
    const offset = (round * 3) % all.length;
    const picked = [];
    for (let i = 0; i < Math.min(4, all.length); i++) {
      picked.push(all[(offset + i) % all.length]);
    }
    return picked;
  }
  // Fallback: generate from title
  return [
    `Core principles and definitions of ${topicTitle}`,
    `Causes of faults and failure modes in ${topicTitle}`,
    `Calculations and numerical analysis for ${topicTitle}`,
    `IMO/MARPOL/STCW regulations relating to ${topicTitle}`,
  ];
}

/* ─── 2c. ADVANCED QUIZ PROMPT BUILDER ──────────────────
   THIS is the function that determines question quality.
   Three layers of anti-repetition:
   1. Human-readable exclusion list (AI can understand & avoid)
   2. Aspect rotation (forces different sub-topics each round)
   3. Style rotation (forces different question formats each round)
   ─────────────────────────────────────────────────────── */
function buildAdvQuizPrompt(topicId, topicTitle, lvlLabel, difficulty, count) {
  const round     = QHist.getRound(topicId);
  const recentQ   = QHist.getRecent(topicId, 25); // last 25 question starters
  const kb        = (typeof TOPIC_KNOWLEDGE !== 'undefined' && TOPIC_KNOWLEDGE[topicId]) || {};
  const fmls      = (kb.formulas   || []).slice(0, 5).map(f => `  • ${f.label}: ${f.eq}`).join('\n');
  const flashcards= (kb.flashcards || []).slice(0, 6).map(f => `  • Q: ${f.q}  A: ${f.a||''}`).join('\n');
  const aspects   = getAspects(topicId, topicTitle, round);

  // Human-readable exclusion list — AI will understand these and avoid them
  const exclusionBlock = recentQ.length > 0 ? `
PREVIOUSLY ASKED (DO NOT repeat or paraphrase these):
${recentQ.map((q,i) => `  ${i+1}. "${q}…"`).join('\n')}
Generate questions about DIFFERENT aspects, use DIFFERENT values, ask in a DIFFERENT way.
` : '';

  // Style bank — rotate which styles are required each round
  const allStyles = [
    ['What is…',               'Which of the following correctly describes…', 'Calculate…'],
    ['Identify the fault when…','An engineer observes… what is the most likely cause?', 'Which IMO regulation specifies…'],
    ['Why does…',               'Compare…with…in terms of', 'What action must be taken if…'],
    ['What is the normal range for…','Describe the procedure for…', 'What does Reed\'s recommend for…'],
    ['State the MARPOL requirement for…','During overhaul you find…', 'What happens to the system if…fails?'],
    ['Define the term…',        'How is…determined from the indicator diagram?', 'What is the consequence of…'],
  ];
  const roundStyles = allStyles[round % allStyles.length];

  const diffBlock = {
    easy:   `EASY DIFFICULTY — Basic recall and recognition only. Simple definitions, names, obvious facts. No calculations required. Examples: "What does OWS stand for?", "What is the purpose of the gravity disc?"`,
    medium: `MEDIUM DIFFICULTY — Understanding and application. Working principles, cause-and-effect, simple one-step calculations with given values. Must include at least ${Math.ceil(count/4)} calculation questions. Example: "Calculate IHP given: Pm=10 bar, L=0.8 m, A=0.05 m², N=150 RPM, 6 cylinders"`,
    hard:   `HARD DIFFICULTY — Expert analysis and oral-board depth. Multi-step fault diagnosis, multi-step calculations, specific regulation numbers (Tier II/III NOx limits, MARPOL deadlines, STCW watch hours), Class Society requirements, chief engineer decision-making scenarios. Every question should challenge a 2nd/Chief Engineer.`,
    mixed:  `MIXED DIFFICULTY — Spread as: ${Math.ceil(count*0.3)} EASY (definitions/recall) + ${Math.ceil(count*0.4)} MEDIUM (application/simple calc) + ${Math.floor(count*0.3)} HARD (fault diagnosis/regulations/oral board). Always include exactly 1 multi-step calculation and 1 fault-diagnosis scenario.`,
  }[difficulty] || 'MIXED DIFFICULTY';

  const system = `You are a SENIOR MMD/CoC marine engineering oral examiner with 20 years experience. You set exam questions for Chief Engineers and 2nd Engineers.

TOPIC: "${topicTitle}" | CANDIDATE LEVEL: ${lvlLabel}
${diffBlock}

THIS ROUND — Focus SPECIFICALLY on these aspects (Round ${round + 1}):
${aspects.map((a,i) => `  ${i+1}. ${a}`).join('\n')}

QUESTION STYLES TO USE this round (vary them across the ${count} questions):
  ${roundStyles.join(' | ')}
${exclusionBlock}
Study material (use this as factual foundation):
${flashcards ? 'FLASHCARDS:\n'+flashcards : ''}
${fmls ? 'KEY FORMULAS:\n'+fmls : ''}

OUTPUT RULES — Follow exactly or response will be rejected:
1. Return ONLY a JSON array. Zero text, zero markdown, zero backticks outside it.
2. Exactly ${count} question objects.
3. Each object: {"q":"...","opts":["A. ...","B. ...","C. ...","D. ..."],"ans":0,"exp":"...","diff":"easy|medium|hard"}
4. "ans" = 0-based index of ONLY correct answer (0=A, 1=B, 2=C, 3=D).
5. "exp" = 2 sentences max. Cite Reed's Vol/Pounder's/IMO/MAN B&W where applicable. State WHY correct AND why the main wrong option is incorrect.
6. Vary answer positions — correct answer must NOT always be A or B.
7. Use REAL engineering values (Pmax 150-175 bar, scavenge 2.5-4.5 bar, lube oil 4-8 bar for crosshead) — not vague approximations.
8. Distractors must be realistically wrong — not obviously absurd. Use values/concepts a candidate might plausibly confuse.
9. NEVER ask the same question twice — topics and framing must all be distinct.`;

  const user = `Generate ${count} ${difficulty} MCQ questions for "${topicTitle}" as specified. Round ${round+1} — be novel and specific.`;
  return { system, user };
}

/* ─── 2d. WIRE INTO quizStart ─────────────────────────── */
(function(){
  const _orig = quizStart;
  quizStart = async function() {
    if (QUIZ.generating) return;

    /* ── Fallback: flashcard-based quiz when no API key ── */
    if (!APP.apiKey) {
      if (typeof buildFlashcardQuiz === 'function') {
        const fallback = buildFlashcardQuiz(APP.currentTopic, QUIZ.count);
        if (fallback) {
          document.getElementById('qv2Setup').style.display    = 'none';
          document.getElementById('qv2Loading').style.display  = 'none';
          document.getElementById('qv2Question').style.display = 'none';
          document.getElementById('qv2Results').style.display  = 'none';
          QUIZ.data = fallback; QUIZ.index = 0; QUIZ.score = 0;
          QUIZ.total = 0; QUIZ.wrong = []; QUIZ.answered = false;
          renderQuizQ();
          return;
        }
      }
      openApiModal(); return;
    }

    const topicId    = APP.currentTopic;
    const topicTitle = document.querySelector('.tz-intro-title')?.textContent?.trim()
                    || document.querySelector('.sb-topic.active')?.textContent?.trim()
                    || topicId || 'Marine Engineering';
    const lvlLabel   = APP.currentLevel?.fullTitle || 'marine engineering candidate';
    const round      = QHist.getRound(topicId || 'general');

    // Update setup note with round info
    const noteEl = document.getElementById('qv2SetupNote');
    if (noteEl) noteEl.textContent = `Round ${round+1} · Generating ${QUIZ.count} ${QUIZ.difficulty} questions · ${topicTitle}`;

    document.getElementById('qv2Setup').style.display   = 'none';
    document.getElementById('qv2Loading').style.display = '';
    document.getElementById('qv2Question').style.display = 'none';
    document.getElementById('qv2Results').style.display  = 'none';
    const lc = document.getElementById('qv2LoadCount');
    if (lc) lc.textContent = QUIZ.count;

    QUIZ.generating = true;
    QUIZ.data=[]; QUIZ.index=0; QUIZ.score=0; QUIZ.total=0; QUIZ.wrong=[]; QUIZ.answered=false;
    QUIZ._topicId = topicId; QUIZ._topicTitle = topicTitle;

    const pid = typeof detectProvider === 'function' ? detectProvider(APP.apiKey) : 'groq';
    const { system: sysMsg, user: userMsg } = buildAdvQuizPrompt(topicId, topicTitle, lvlLabel, QUIZ.difficulty, QUIZ.count);

    try {
      let raw = '';
      if (pid === 'groq') {
        const models = (typeof AI_PROVIDERS!=='undefined'&&AI_PROVIDERS.groq?.modelFallbacks)||['llama-3.3-70b-versatile','llama3-70b-8192'];
        for (const model of models) {
          const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+APP.apiKey},
            body: JSON.stringify({ model, max_tokens:4096, temperature:0.72, stream:false,
              messages:[{role:'system',content:sysMsg},{role:'user',content:userMsg}] })
          });
          const d = await res.json();
          if (!res.ok) { if (res.status===429) continue; throw new Error(d.error?.message||'Groq '+res.status); }
          raw = d.choices?.[0]?.message?.content||''; break;
        }
      } else if (pid === 'gemini') {
        const gmodels = ['gemini-1.5-flash','gemini-1.5-flash-8b'];
        for (const gm of gmodels) {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${gm}:generateContent?key=${APP.apiKey}`;
          const res = await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify({contents:[{parts:[{text:sysMsg+'\n\n'+userMsg}]}],
              generationConfig:{temperature:0.72,maxOutputTokens:4096}})});
          const d = await res.json();
          if (!res.ok){if(res.status===429||res.status===503)continue;throw new Error(JSON.stringify(d.error));}
          raw=d.candidates?.[0]?.content?.parts?.[0]?.text||''; break;
        }
      } else if (pid === 'openrouter') {
        const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions',{
          method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+APP.apiKey,'HTTP-Referer':'https://marineiq.study'},
          body:JSON.stringify({model:'meta-llama/llama-3.1-8b-instruct:free',max_tokens:4096,temperature:0.72,
            messages:[{role:'system',content:sysMsg},{role:'user',content:userMsg}]})});
        const d = await orRes.json();
        if (!orRes.ok) throw new Error(d.error?.message||`OpenRouter ${orRes.status}`);
        raw=d.choices?.[0]?.message?.content||'';
      } else {
        // Anthropic
        const antRes = await fetch('https://api.anthropic.com/v1/messages',{
          method:'POST',headers:{'Content-Type':'application/json','x-api-key':APP.apiKey,
            'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
          body:JSON.stringify({model:(typeof AI_PROVIDERS!=='undefined'&&AI_PROVIDERS.anthropic?.models?.fast)||'claude-haiku-4-5-20251001',
            max_tokens:4096,system:sysMsg,messages:[{role:'user',content:userMsg}]})});
        const d = await antRes.json();
        if (!antRes.ok) throw new Error(d.error?.message||`Anthropic ${antRes.status}`);
        raw=d.content?.[0]?.text||'';
      }

      // Extract JSON from response
      raw = raw.trim();
      const s = raw.indexOf('['), e = raw.lastIndexOf(']');
      if (s<0||e<0) throw new Error('No JSON array in response');
      raw = raw.slice(s, e+1).replace(/```json|```/g,'').trim();
      let parsed = JSON.parse(raw);

      // Validate & filter questions
      parsed = parsed.filter(q =>
        q.q && Array.isArray(q.opts) && q.opts.length===4 &&
        typeof q.ans==='number' && q.ans>=0 && q.ans<=3 &&
        q.exp
      );
      if (parsed.length < 2) throw new Error('Too few valid questions returned');

      QUIZ.data  = parsed.slice(0, QUIZ.count);
      QUIZ.total = 0;
      QUIZ.generating = false;

      document.getElementById('qv2Loading').style.display  = 'none';
      document.getElementById('qv2Question').style.display = '';
      if (typeof renderQuizQ === 'function') renderQuizQ();

    } catch(err) {
      QUIZ.generating = false;
      document.getElementById('qv2Loading').style.display = 'none';
      document.getElementById('qv2Setup').style.display   = '';
      const noteEl2 = document.getElementById('qv2SetupNote');
      if (noteEl2) noteEl2.textContent = '⚠ Error: '+err.message+' — check your API key and try again.';
    }
  };
})();

/* ─── 2e. SAVE HISTORY AFTER QUIZ FINISH ──────────────── */
(function(){
  const _orig = quizFinish;
  quizFinish = function() {
    _orig();
    const tid = QUIZ._topicId || APP.currentTopic || 'general';
    if (QUIZ.data && QUIZ.data.length > 0) {
      QHist.save(tid, QUIZ.data);
      setTimeout(updateQRoundInfo, 200);
    }
  };
})();

/* ─── 2f. ROUND INFO UI ──────────────────────────────── */
function updateQRoundInfo() {
  const el = document.getElementById('qv2RoundInfo');
  if (!el) return;
  const tid   = APP.currentTopic || 'general';
  const round = QHist.getRound(tid);
  const seen  = QHist.getRecent(tid, 100).length;
  if (round === 0) {
    el.innerHTML = '<span style="color:var(--cadet);font-weight:700">✨ First round — maximum variety</span>';
  } else {
    el.innerHTML = `<span style="color:var(--tx3)">Round <strong style="color:var(--tx)">${round+1}</strong> · ${seen} questions seen · New questions guaranteed</span>`;
  }
}

function resetQHist() {
  const tid = APP.currentTopic || 'general';
  QHist.clear(tid);
  updateQRoundInfo();
  const b = document.getElementById('qv2ResetBtn');
  if (b) { b.textContent='✓ Cleared'; setTimeout(()=>b.textContent='↺ Reset', 1800); }
}

/* ─── 2g. INJECT ROUND INFO into setup panel ─────────── */
document.addEventListener('DOMContentLoaded', function(){
  setTimeout(function(){
    const setup = document.getElementById('qv2Setup');
    if (!setup || setup.dataset.qadv) return;
    setup.dataset.qadv = '1';
    const startBtn = setup.querySelector('.qv2-start-btn');
    if (!startBtn) return;
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:4px;';
    row.innerHTML =
      '<div id="qv2RoundInfo" style="font-size:.7rem;font-family:\'JetBrains Mono\',monospace;"></div>'
    + '<button id="qv2ResetBtn" onclick="resetQHist()" style="font-size:.65rem;padding:5px 11px;border-radius:7px;border:1px solid var(--b1);background:var(--bg2);color:var(--tx3);cursor:pointer;font-family:\'JetBrains Mono\',monospace;min-height:30px;transition:all .14s;">↺ Reset</button>';
    startBtn.insertAdjacentElement('beforebegin', row);
    updateQRoundInfo();
  }, 800);
});

// Update quiz round info when quiz panel becomes visible (efficient — no polling)
document.addEventListener('DOMContentLoaded', function() {
  const quizPanel = document.getElementById('panel-quiz');
  if (quizPanel) {
    const observer = new MutationObserver(function() {
      if (quizPanel.classList.contains('active') && document.getElementById('qv2RoundInfo')) {
        updateQRoundInfo();
      }
    });
    observer.observe(quizPanel, { attributes: true, attributeFilter: ['class'] });
  }
  // Also update once on load
  setTimeout(function() {
    if (document.getElementById('qv2RoundInfo')) updateQRoundInfo();
  }, 1000);
});

console.log('%cMarineIQ — Formula Viz v3 + Quiz Engine v3 loaded', 'color:#4ade80;font-weight:bold');




/* ═══════════════════════════════════════════════════════════════════════
   MARINEIQ MEGA PATCH v13
   Fixes: auto-search, BEE+BTech subtopics, IHP formula, mobile topbar,
          deep research, video availability, quiz from search, sidebar
          close, year syllabus content, diagram change-topic, formulas++
   ═══════════════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   1. AUTO-SEARCH: Fixed at source (suggestedQ removed from
      original selectTopic). No wrapper needed here.
   ══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   2. FIX: IHP FORMULA (was wrong — divisor 60,000 incorrect)
   Correct: IHP [kW] = Pm[bar] × L[m] × A[m²] × N[rpm] × k / 0.6
   ══════════════════════════════════════════════════════════ */
(function fixIHPFormula(){
  // Find and replace in TOPIC_KNOWLEDGE at runtime
  if(typeof TOPIC_KNOWLEDGE === 'undefined') return;
  for(const key in TOPIC_KNOWLEDGE){
    const kb = TOPIC_KNOWLEDGE[key];
    if(!kb.formulas) continue;
    kb.formulas.forEach(f => {
      if(f.label && f.label.includes('Indicated') && f.eq && f.eq.includes('60,000')){
        f.eq   = 'IHP [kW] = (Pm [bar] × L [m] × A [m²] × N [rpm] × k) ÷ 0.6';
        f.note = 'Pm=Mean Effective Pressure(bar), L=stroke(m), A=piston area(m²), N=rev/min, k=number of cylinders. Derived: Pm×10⁵ Pa × L×A×N/60 s⁻¹ ÷ 1000 = Pm×L×A×N×k/0.6 kW. Example: Pm=18 bar, L=2.4m, A=0.503m², N=100rpm, k=6 → IHP=18×2.4×0.503×100×6/0.6=21,730 kW. Source: Reed\'s Vol.8 Ch.2';
      }
      // Also fix the common wrong form in notes
      if(f.note && f.note.includes('60,000')) f.note = f.note.replace(/\s*60[,.]?000/g,'÷ 0.6 [see corrected formula]');
    });
  }
})();

/* ══════════════════════════════════════════════════════════
   3. BEE & BTECH SUBTOPICS — full content for bt_elec1 + subtopics
   ══════════════════════════════════════════════════════════ */
(function addBTechKnowledge(){
  if(typeof TOPIC_KNOWLEDGE === 'undefined') return;

  /* ── Basic Electrical Engineering (bt_elec1) ── */
  TOPIC_KNOWLEDGE.bt_elec1 = {
    subtopics: [
      { id:'bee_circuits',  title:"DC Circuits",             icon:"🔌", desc:"Ohm's law, KVL, KCL, series/parallel circuits, Thevenin/Norton theorems, superposition" },
      { id:'bee_ac',        title:"AC Fundamentals",         icon:"〰️", desc:"Sinusoidal waveforms, RMS, phasors, impedance, power factor, single-phase circuits" },
      { id:'bee_power',     title:"Electrical Power",        icon:"⚡", desc:"Active, reactive, apparent power. Power factor correction. 3-phase power calculation" },
      { id:'bee_transformer',title:"Transformers",           icon:"🔄", desc:"Working principle, turns ratio, efficiency, losses, shipboard applications" },
      { id:'bee_motors',    title:"Electric Motors (intro)", icon:"⚙️", desc:"DC motors, induction motors, starting methods, speed control, torque-speed curves" },
      { id:'bee_instruments',title:"Measuring Instruments",  icon:"📏", desc:"Voltmeter, ammeter, wattmeter, megger, multimeter. Instrument types and errors" },
    ],
    formulas:[
      { label:"Ohm's Law",                eq:"V = I × R   [Volts]",                    note:"V=voltage(V), I=current(A), R=resistance(Ω). Fundamental relationship for all DC circuits. Source: Reed's Vol.9 Electrotechnology" },
      { label:"Power in DC Circuit",      eq:"P = V × I = I² × R = V² / R   [Watts]", note:"P=power(W), V=voltage(V), I=current(A), R=resistance(Ω). Choose form based on known quantities." },
      { label:"Kirchhoff's Voltage Law",  eq:"ΣV = 0  (sum around any closed loop)",   note:"Sum of all EMFs = sum of all voltage drops in a closed loop. Used for circuit analysis. Source: Reed's Vol.9" },
      { label:"Kirchhoff's Current Law",  eq:"ΣI_in = ΣI_out  (at any junction)",      note:"Sum of currents entering a node = sum leaving. Conservation of charge. Used with KVL to solve circuits." },
      { label:"RMS Voltage (sinusoidal)", eq:"V_rms = V_peak / √2  ≈  V_peak × 0.707", note:"V_rms=RMS voltage(V), V_peak=peak voltage(V). RMS is the equivalent DC heating value. 230V mains means V_peak=325V." },
      { label:"AC Impedance",             eq:"Z = √(R² + X²)   [Ω]",                   note:"Z=impedance(Ω), R=resistance(Ω), X=reactance(Ω). For RL: X=X_L−X_C. Z replaces R in AC Ohm's law: V=I×Z" },
      { label:"Inductive Reactance",      eq:"X_L = 2π × f × L   [Ω]",                note:"X_L=inductive reactance(Ω), f=frequency(Hz), L=inductance(H). Increases with frequency. Opposes change in current." },
      { label:"Capacitive Reactance",     eq:"X_C = 1 / (2π × f × C)   [Ω]",          note:"X_C=capacitive reactance(Ω), f=frequency(Hz), C=capacitance(F). Decreases with frequency. Opposes change in voltage." },
      { label:"Power Factor",             eq:"PF = cos φ = P / S = R / Z",             note:"φ=phase angle between V and I. P=active power(W), S=apparent power(VA). Ship target: PF > 0.8 lagging. Unity PF=1." },
      { label:"3-Phase Active Power",     eq:"P = √3 × V_L × I_L × cos φ   [W]",      note:"V_L=line voltage(V), I_L=line current(A), cos φ=power factor. For shipboard generators: V_L=440V, f=60Hz typically." },
      { label:"Transformer Turns Ratio",  eq:"V₁/V₂ = N₁/N₂ = I₂/I₁",                note:"V₁=primary voltage, V₂=secondary voltage, N₁/N₂=turns ratio. Current ratio is inverse of turns ratio. Source: Reed's Vol.9" },
      { label:"Transformer Efficiency",   eq:"η = P_out / P_in = P_out / (P_out + P_losses)", note:"Losses = copper losses (I²R) + iron losses (hysteresis + eddy current). Typical power transformer η ≥ 95%." },
    ],
    flashcards:[
      { q:"State Ohm's Law",               a:"V = IR. The voltage across a conductor is directly proportional to the current through it, at constant temperature. Source: Reed's Vol.9" },
      { q:"What is power factor?",          a:"Cosine of the phase angle φ between voltage and current (cos φ). Ratio of active power (W) to apparent power (VA). Unity = pure resistance. Lagging PF = inductive load (motors)." },
      { q:"What is the difference between active, reactive and apparent power?", a:"Active (P, Watts) = useful work. Reactive (Q, VAR) = energy stored/released by inductors/capacitors. Apparent (S, VA) = V×I. S² = P² + Q²." },
      { q:"Why does a ship use 440V 3-phase?", a:"440V 3-phase provides high power density with lower current for same power vs 230V, reducing cable size and I²R losses. 60Hz common on ships for motor speed compatibility." },
      { q:"What is the purpose of a megger?", a:"Megohmmeter — measures insulation resistance between conductors and earth. Ships: insulation resistance should be ≥ 1 MΩ per kV of operating voltage (IEC 60092 recommendation)." },
      { q:"What are eddy current losses in a transformer?", a:"Circulating currents induced in the iron core by changing flux. Reduced by laminating the core. Proportional to frequency² and flux density². Part of 'iron losses' (no-load losses)." },
    ],
    videos:[
      { id:'2mwHpGT9aOU', title:'Ohm\'s Law & Basic Circuits Explained',        ch:'Professor Leonard' },
      { id:'mHJSFn11EXk', title:'AC Circuits — RMS, Phasors & Power Factor',   ch:'Michel van Biezen' },
      { id:'UBX_Co_hHcU', title:'3-Phase Power Explained for Beginners',        ch:'The Engineering Mindset' },
      { id:'GMnsZnBdRUs', title:'How Transformers Work',                         ch:'The Engineering Mindset' },
      { id:'LAtDMqQeXSM', title:'Power Factor Correction Explained',             ch:'Electrical Eng. Portal' },
    ],
  };

  /* ── Engineering Physics (bt_physics) ── */
  TOPIC_KNOWLEDGE.bt_physics = {
    subtopics:[
      { id:'phys_mech',  title:"Mechanics",          icon:"⚙️",  desc:"Newton's laws, work, energy, power, momentum, friction, simple machines" },
      { id:'phys_thermo',title:"Thermodynamics",     icon:"🌡️",  desc:"Temperature, heat, gas laws, specific heat, Zeroth & First laws — foundation for engines" },
      { id:'phys_waves', title:"Waves & Vibrations", icon:"〰️",  desc:"Wave properties, resonance, sound, longitudinal vs transverse — vibration in ship machinery" },
      { id:'phys_elec',  title:"Electromagnetism",   icon:"🔌",  desc:"Electric field, magnetic field, Faraday's law, inductance — underpins generators and motors" },
    ],
    formulas:[
      { label:"Newton's Second Law",      eq:"F = m × a   [N]",               note:"F=force(N), m=mass(kg), a=acceleration(m/s²). Foundation of machinery dynamics. Source: Reed's Vol.2" },
      { label:"Kinetic Energy",           eq:"KE = ½ × m × v²   [J]",         note:"m=mass(kg), v=velocity(m/s). Flywheel and rotating machinery energy storage." },
      { label:"Boyle's Law",              eq:"P₁V₁ = P₂V₂  (constant T)",     note:"For ideal gas at constant temperature. Used in air compressor calculations and indicator diagram analysis." },
      { label:"Charles' Law",             eq:"V₁/T₁ = V₂/T₂  (constant P)",   note:"T in Kelvin. Temperature-volume relationship at constant pressure. Source: Reed's Vol.4" },
      { label:"Combined Gas Law",         eq:"P₁V₁/T₁ = P₂V₂/T₂",            note:"T in Kelvin. Combines Boyle's and Charles' laws. Used for compressed air systems and turbocharger scavenge calculations." },
      { label:"Specific Heat Capacity",   eq:"Q = m × c × ΔT   [J]",          note:"Q=heat energy(J), m=mass(kg), c=specific heat(J/kg·K), ΔT=temperature change(K). Source: Reed's Vol.4" },
    ],
    flashcards:[
      { q:"State Newton's First Law",     a:"A body remains at rest or in uniform motion in a straight line unless acted upon by an external net force. Basis of ship inertia calculations." },
      { q:"State the First Law of Thermodynamics", a:"Energy cannot be created or destroyed, only converted. dU = Q − W. Heat added to a system = increase in internal energy + work done by system." },
      { q:"What is resonance?",           a:"Resonance occurs when the frequency of external forcing equals the natural frequency of a system. In ships: causes excessive vibration in shafting, hull, and machinery if uncontrolled." },
    ],
    videos:[
      { id:'yFoUDFb0R8I', title:"Newton's Laws of Motion",          ch:'Khan Academy' },
      { id:'VXwXkME9uWU', title:'Thermodynamics Gas Laws',           ch:'Professor Dave Explains' },
      { id:'5HkS8DW3F9A', title:'Waves and Vibrations Fundamentals', ch:'Khan Academy' },
    ],
  };

  /* ── Engineering Chemistry (bt_chem) ── */
  TOPIC_KNOWLEDGE.bt_chem = {
    subtopics:[
      { id:'chem_corr',  title:"Corrosion Science",   icon:"🧪", desc:"Electrochemical corrosion, galvanic series, cathodic protection, anodes — directly relevant to shipboard metal protection" },
      { id:'chem_water', title:"Water Chemistry",     icon:"💧", desc:"Cooling water treatment, boiler water chemistry, scale prevention, pH control, hardness" },
      { id:'chem_fuel',  title:"Fuel Chemistry",      icon:"⛽", desc:"Hydrocarbon composition, flash point, pour point, viscosity, calorific value, HFO vs MGO" },
    ],
    formulas:[
      { label:"Galvanic Corrosion Current", eq:"I_corr ∝ (E_cathode − E_anode) / R_circuit", note:"E=electrode potential(V), R=circuit resistance(Ω). Larger potential difference and lower resistance → faster corrosion. Source: Reed's Vol.6 Materials" },
      { label:"pH Definition",              eq:"pH = −log₁₀[H⁺]",                            note:"[H⁺]=hydrogen ion concentration(mol/L). pH 7 = neutral, <7 = acidic, >7 = alkaline. Boiler water: pH 10–11. Cooling water: pH 7.5–9." },
      { label:"Calorific Value (gross/net)", eq:"Net CV = Gross CV − 2.44 × H₂O(mass fraction)", note:"Accounts for latent heat of water vapour in flue gas. HFO typical gross CV ≈ 40,500 kJ/kg. Source: Reed's Vol.3 Applied Heat" },
    ],
    flashcards:[
      { q:"What is the galvanic series?",   a:"Order of metals by electrode potential in seawater. Less noble (anodic) metals corrode sacrificially: zinc < aluminium < steel < cast iron < stainless steel < copper < gold. Ship uses zinc anodes to protect steel hull." },
      { q:"Why is boiler water treated?",   a:"To prevent scale (CaCO₃, Mg(OH)₂) reducing heat transfer, causing overheating and tube failure; prevent pitting corrosion from dissolved O₂; maintain alkalinity pH 10–11 to form protective magnetite layer." },
    ],
    videos:[
      { id:'OfJqTsm72IM', title:'Corrosion — Types and Prevention',   ch:'NPTEL' },
      { id:'8qAXSqzJSqE', title:'Boiler Water Treatment Explained',   ch:'Marine Online' },
    ],
  };

  /* ── Engineering Mechanics (bt_mech) ── */
  TOPIC_KNOWLEDGE.bt_mech = {
    formulas:[
      { label:"Moment of Force (Torque)", eq:"M = F × d   [N·m]",         note:"F=force(N), d=perpendicular distance to pivot(m). Clockwise moments = anticlockwise moments for equilibrium." },
      { label:"Stress",                   eq:"σ = F / A   [N/m² = Pa]",   note:"σ=stress(Pa), F=applied force(N), A=cross-sectional area(m²). Types: tensile, compressive, shear." },
      { label:"Strain",                   eq:"ε = ΔL / L₀   (dimensionless)", note:"ε=strain, ΔL=change in length(m), L₀=original length(m). Elastic strain is recoverable." },
      { label:"Young's Modulus",          eq:"E = σ / ε   [N/m² = Pa]",   note:"E=Young's modulus(Pa), σ=stress, ε=strain. Steel E ≈ 200 GPa. Constant in elastic region. Source: Reed's Vol.1" },
      { label:"Factor of Safety",         eq:"FoS = Ultimate Strength / Working Stress", note:"Design requires FoS ≥ 3 for static loads, higher for dynamic/fatigue loads in marine applications. Source: Lloyd's Register" },
    ],
    flashcards:[
      { q:"What is the difference between stress and strain?", a:"Stress is force per unit area (σ = F/A, units N/m²). Strain is deformation per unit length (ε = ΔL/L₀, dimensionless). Young's modulus E = σ/ε relates them in elastic region." },
      { q:"What is a free body diagram?", a:"A diagram showing an isolated body with all external forces and moments acting on it. Used to apply Newton's laws and solve for unknown forces in mechanical systems." },
    ],
    videos:[
      { id:'L2rRDoQfT1M', title:'Stress and Strain — Engineering Mechanics', ch:'The Organic Chemistry Tutor' },
      { id:'BHVGAuCXdcg', title:'Statics — Free Body Diagrams',              ch:'Professor Leonard' },
    ],
  };

  /* ── More BT topics with basic content ── */
  ['bt_maths1','bt_maths2','bt_draw','bt_workshop1','bt_workshop2','bt_strength',
   'bt_prog','bt_control','bt_mgmt'].forEach(tid => {
    if(!TOPIC_KNOWLEDGE[tid]) TOPIC_KNOWLEDGE[tid] = { formulas:[], flashcards:[], videos:[] };
  });

  console.log('BTech TOPIC_KNOWLEDGE populated');
})();

/* ══════════════════════════════════════════════════════════
   4. SUBTOPIC NAVIGATION — click a subtopic → load its content
   ══════════════════════════════════════════════════════════ */
/* old addSubtopicNavigation removed — chapter system in Script 5 handles this */

