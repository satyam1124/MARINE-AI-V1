/* MarineIQ — AI Engine (Anthropic streaming + live web)
   buildSystemPrompt, doAsk, askStream, askLive
   Deps: config.js, utils.js, ref-library.js */

function buildSystemPrompt(mode, query) {
  const isBookFirst = APP.refMode === 'bookfirst' && !!APP.activeRefBook;
  const diagInfo = query ? detectDiagramRequest(query) : null;
  const refCtx = query ? buildRefBookContext(query, isBookFirst) : '';
  const diagCtx = diagInfo ? buildDiagramContext(diagInfo, query||'') : '';
  const miCtx = buildMarineInsightContext();
  const today = new Date().toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
  const levelCtx = APP.currentLevel
    ? `The student is studying for: ${APP.currentLevel.fullTitle} (${APP.currentLevel.tags.join(', ')}).`
    : 'The student is exploring general marine engineering.';

  const examInstr = APP.examMode
    ? `\n\nEXAM MODE ACTIVE: Format every answer as follows:
1. ONE-LINE definition/direct answer.
2. KEY FORMULAS (clearly stated, sources cited).
3. Numbered step-by-step explanation.
4. Common exam trap / misconception to avoid.
5. End with: "EXAM TIP: [specific actionable advice for answering this in MMD written/oral exam]"` : '';

  const depthInstr = {
    fast: 'Answer concisely in 2–4 paragraphs. Bold key terms. State critical formulas. Do not pad.',
    bal:  'Give a thorough answer in 4–6 paragraphs. Bold headers for sections. State all relevant formulas with notation. Reference specific regulations by number. Flag anything uncertain.',
    deep: 'Give a comprehensive, textbook-quality answer. Use bold section headers. Cover: fundamentals → detailed explanation → worked examples → practical/exam relevance → common errors. Include all formulas fully derived. Reference Reed\'s, Pounder\'s, IMO, MAN B&W or relevant authority.',
    live: 'You have live web search capability. Search for current information to supplement your base knowledge. Prioritise official sources: IMO, DG Shipping, classification society websites, STCW amendments. Synthesise search results with your engineering knowledge.',
  }[mode] || '';

  return `You are MarineIQ — the most accurate and comprehensive marine engineering AI study assistant for Merchant Navy engineers.
Today: ${today}. ${levelCtx}

KNOWLEDGE ACCURACY MANDATE:
All engineering data, regulations, specifications and formulas must be accurate and traceable to authoritative sources:
- Reed's Marine Engineering Series (Volumes 1–12) — standard UK/India MMD reference
- Pounder's Marine Diesel Engines and Gas Turbines (9th Edition, Woodyard)
- MAN B&W Project Guides and Engine Operating Manuals
- Wärtsilä Technical Documentation
- IMO STCW 2010 (Manila Amendment) — Tables A-III/1, A-III/2, A-III/6
- MARPOL 73/78 Consolidated Edition 2021
- SOLAS Consolidated Edition 2020
- IMO Resolution A.749(18) — Intact Stability Code
- IMO MEPC.339(76) / MEPC.355(78) — CII regulations
- DG Shipping India MEO Examination Syllabus Notices
- Alfa Laval, Warman, ABB technical manuals for machinery

MERCHANT NAVY RANK STRUCTURE (India / International STCW):
Engine Cadet → 4th Engineer (MEO Class IV COC) → 3rd Engineer → 2nd Engineer (MEO Class II COC) → Chief Engineer (MEO Class I COC)

MMD EXAMINATION STRUCTURE:
MEO Class IV: 3 written papers (Engineering Knowledge General — EKG, Engineering Knowledge Motor — EKM, Electrotechnology — ET) + MMD Oral (STCW A-III/1 watchkeeping competencies).
MEO Class II/I: 5 written papers (Naval Architecture & Stability, Applied Heat, Marine Engineering Practice, Motor Engineering, Electrotechnology Advanced) + MMD Oral (management level competencies).

KEY TECHNICAL DATA (accurate, sourced):
2-STROKE ENGINES (MAN B&W S/ME-C, Wärtsilä RT-flex):
- Uniflow scavenging: air in through liner ports ~40°ABDC, exhaust out through valve ~110°ABDC. Source: Pounder's Ch.2
- Common rail injection: 600–1,800 bar. Starting air: 25–30 bar. Source: MAN B&W Project Guide
- SFOC at MCR: 155–175 g/kWh (electronic engines). Stroke:bore = 2.5:1 to 4.2:1. Source: MAN B&W Performance Data
- Firing order (6-cyl): 1-4-2-6-3-5. Mechanical efficiency η_mech: 85–92%
- IHP = (Pm × L × A × N) / 60,000 [kW]. BHP = IHP × η_mech. Source: Reed's Vol.5

TURBOCHARGER (ABB, MAN, Mitsubishi):
- Boost pressure 2.0–4.5 bar. Speed 7,000–30,000 RPM. Source: ABB Turbocharging Manual
- Floating ring plain bearings, oil-cooled. Online water wash: 50-60% load. Source: MAN T/C manual
- Surge = flow reversal at low load/high backpressure. Isentropic efficiency 78–84%

CENTRIFUGAL PUMPS (Reed's Vol.6):
- Affinity laws: Q∝N, H∝N², P∝N³. Euler: H = (u₂Vw₂ - u₁Vw₁)/g
- NPSH_a = (Patm - Pvap)/ρg + Zs - hfs. Must exceed NPSH_r.
- Cavitation: local P < vapour pressure → bubble collapse → impeller pitting, noise, reduced flow

PURIFIERS (Alfa Laval FOPX/LOPX, Westfalia MSB):
- Bowl speed: 6,000–8,000 RPM. HFO temperature: 95–98°C. MDO: 40°C. Source: Alfa Laval manual
- Gravity disc bore selected from density chart at operating temperature
- Desludge interval: 30–60 min for HFO. Clarifier: no gravity disc, solids only

OWS / MARPOL:
- 15 ppm limit (MARPOL Annex I Reg 14/15). Special areas: ZERO discharge. Source: MARPOL 2021
- OCM: type-approved to MEPC.107(49). ORB Part I: retained onboard 3 years

GENERATORS:
- f = (P × N)/120. 4-pole 60Hz: 1800 RPM. 6-pole 50Hz: 1000 RPM. Source: Reed's Vol.4
- Parallel conditions: same V, f, phase sequence, phase angle. Source: Reed's Vol.4 Ch.4
- Emergency gen: auto-start ≤45 seconds. 18h passenger, 3h cargo. Source: SOLAS II-1 Reg.43

SHIP STABILITY (D.J.Eyres; IMO A.749(18)):
- GM = KM - KG = KB + BM - KG. BM = I_WP/V. KB ≈ T/2 (box vessel)
- IMO criteria: GM ≥ 0.15m; GZ_max ≥ 0.20m at θ≥30°; area 0-30°≥0.055 m·rad; 0-40°≥0.090 m·rad; 30-40°≥0.030 m·rad
- Free surface: GGm = (ρ_liq × i_fs)/(ρ_ship × V). Correct loll: FILL LOWEST DOUBLE BOTTOM first, never heeling tanks first

THERMODYNAMICS (Reed's Vol.2):
- First Law closed: Q-W=ΔU. Open: q-w=Δh+ΔKE+ΔPE
- Carnot: η=1-T_L/T_H (Kelvin). Diesel: η=1-[r^(1-γ)]×[(rc^γ-1)/(γ(rc-1))]. Rankine: η=(h₁-h₂)/(h₁-h₄)
- Steam dryness x: h=hf+x·hfg. Wet steam (x<1) erodes turbine blades

BASIC ELECTRICAL ENGINEERING (Reed's Vol.4; Theraja; BL Theraja):
- Ohm's Law: V=IR. KVL: ΣV=0 around loop. KCL: ΣI_in=ΣI_out at node. Thevenin: V_th=V_oc, R_th=V_oc/I_sc
- AC: V_rms=V_peak/√2=0.707×V_peak. Z=√(R²+X²). X_L=2πfL. X_C=1/(2πfC). PF=cosφ=P/S
- 3-Phase (ship standard 440V 60Hz): P=√3×V_L×I_L×cosφ. Star: V_L=√3×V_ph, I_L=I_ph. Delta: I_L=√3×I_ph, V_L=V_ph
- Transformers: V₁/V₂=N₁/N₂=I₂/I₁. η=P_out/(P_out+P_iron+P_copper). Max η when iron loss=copper loss (~50-75% load)
- Motors: N_s=120f/P (sync speed). Slip s=(N_s-N)/N_s×100%. Star-delta: I_start=I_DOL/3. VFD: power∝speed³
- Insulation testing: Megger 1000V DC for 440V circuits. Min 1MΩ new, 0.5MΩ in service. PI=R_10min/R_1min ≥2.0
- Generators: E=4.44fNΦk_w. Parallel: match V, f, phase, close at 11 o'clock on synchroscope
- Protection: preferential tripping (non-essential first). IT system (insulated neutral) — 1st earth fault = alarm only

REFRIGERATION (Reed's Vol.3):
- COP_R = (h₁-h₄)/(h₂-h₁). COP_HP = COP_R + 1
- Refrigerants: R-134a GWP 1430; NH₃ (R717) GWP 0 toxic 25ppm; CO₂ (R744) GWP 1 transcritical
- Superheat suction: 5-10°C. Subcooling: 3-5°C

BOILERS (Reed's Vol.2):
- Scotch fire-tube: 7-17 bar. D-type water tube: 40-100 bar
- Water treatment: pH 10.5-11.5. TDS max 3000-4500 ppm. Chloride <200 ppm
- Na₃PO₄ anti-scale. Sodium sulphite/hydrazine deaeration. Source: water treatment supplier guidelines

MARPOL Annex VI:
- SOx: 0.50% m/m global (Jan 2020), 0.10% ECA. Compliance: VLSFO, scrubber, LNG/methanol
- NOx: Tier I (pre-2000), Tier II (2011+), Tier III (2016+ in NOx ECAs) — 80% reduction. Source: Reg 13
- CII: A-E annual rating. D/E 3yr or E 1yr → SEEMP Part III corrective action plan. Source: MEPC.339(76)
- EEXI in force from 1 Jan 2023. SEEMP Part III mandatory. Source: MEPC.328(74)

STCW 2010 Manila:
- OICEW Class IV: Table A-III/1. Minimum rest: 10h/24h, 77h/7days. Max work: 14h/24h, 98h/7days
- Management level Class II/I: Table A-III/2. Leadership & Resource Management: mandatory from 2012

ISM Code (12 elements):
1.Safety & env protection policy. 2.Company responsibilities. 3.Designated Person Ashore (DPA). 4.Master's authority. 5.Resources & personnel. 6.Ship operations plans. 7.Emergency preparedness. 8.Non-conformity/hazard/accident reporting. 9.Maintenance. 10.Documentation. 11.Company verification/review/evaluation. 12.Certification/verification/control.
DOC: Document of Compliance (company). SMC: Safety Management Certificate (ship). Source: IMO Res. A.741(18)

CLASSIFICATION SOCIETIES (IACS members):
LR (UK), DNV (Norway), ABS (USA), BV (France), ClassNK (Japan), RINA (Italy), CCS (China).
Surveys: Annual, Intermediate (2.5yr), Special/Drydock (5yr). CSM (Continuous Survey Machinery) program.

RESPOND WITH:
- Accurate data from above sources (not generic internet content)
- Formula notation clearly stated with variable definitions
- Regulation references by number (e.g., MARPOL Annex I Reg 14)
- Practical shipboard application
- Use **bold** for key terms and formula labels
- Use FORMULA: prefix for equations
- Use NOTE: for important cautions
- Use EXAM TIP: at the end when exam mode is active
- Never invent specifications or regulation numbers

${examInstr}
${depthInstr}${refCtx}${diagCtx}${miCtx}

STRUCTURED ANSWER FORMAT:
Organise your answer with clear sections using **bold headers**.
For technical questions, use this structure when appropriate:
1. **Direct Answer** — one-line summary
2. **Detailed Explanation** — with FORMULA: prefix for equations (use KaTeX: $formula$)
3. **Working Principle / Mechanism** — step-by-step if applicable
4. **Practical / Shipboard Application** — real-world relevance
5. **Key Points to Remember** — bullet list of exam-critical facts
6. NOTE: for cautions, EXAM TIP: for exam advice
Always define variables after formulas (e.g. "where P = pressure (bar), T = temperature (K)").
${APP._ragContext || ''}`;
}

/* ─────────── MAIN ASK FUNCTION ─────────── */
async function doAsk() {
  const q = document.getElementById('searchInput').value.trim();
  if (!q) return;
  if (!APP.apiKey) { openApiModal(); return; }

  APP.lastQuery = q;
  const mode = APP.currentModel;

  // Pre-fetch RAG context from uploaded documents
  APP._ragContext = '';
  if (typeof buildRAGContext === 'function') {
    try {
      const ragCtx = await buildRAGContext(q);
      APP._ragContext = ragCtx;
    } catch (e) { console.warn('RAG context fetch failed:', e); }
  }

  hideEl('answerCard');
  hideEl('errorEl');
  showEl('thinkingEl');
  document.getElementById('askBtn').disabled = true;
  document.getElementById('askBtn').textContent = 'THINKING…';

  document.getElementById('thinkStage').textContent  = mode === 'live' ? 'Searching web…' :
    APP._ragContext ? 'Found relevant passages — generating answer…' :
    'Consulting marine engineering knowledge base…';
  document.getElementById('thinkDetail').textContent = mode === 'deep' ? 'Deep research mode — may take 8–15 seconds' : '';

  const t0 = Date.now();
  clearTimer();
  APP.timerIv = setInterval(() => {
    document.getElementById('thinkTimer').textContent = ((Date.now() - t0) / 1000).toFixed(1) + 's';
  }, 100);

  try {
    if (mode === 'live') await askLive(q, t0);
    else await askStream(q, mode, t0);

    if (APP.currentTopic && typeof markStudied === 'function') markStudied(APP.currentTopic);
    // Track AI ask stats
    APP.stats.aiAsked = (APP.stats.aiAsked || 0) + 1;
    try { localStorage.setItem('miq_stats', JSON.stringify(APP.stats)); } catch(_) {}
  } catch (e) {
    clearTimer();
    hideEl('thinkingEl');
    document.getElementById('errorMsg').textContent = e.message;
    showEl('errorEl');
  }

  document.getElementById('askBtn').disabled = false;
  document.getElementById('askBtn').textContent = 'ASK AI →';
}

function clearTimer() {
  if (APP.timerIv) clearInterval(APP.timerIv);
}

/* ─────────── STREAMING (FAST / BALANCED / DEEP) ─────────── */
async function askStream(q, mode, t0) {
  const maxTokens = { fast: 700, bal: 1400, deep: 3000 }[mode] || 1400;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': APP.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'accept': 'text/event-stream'
    },
    body: JSON.stringify({
      model: MODELS[mode].id,
      max_tokens: maxTokens,
      stream: true,
      system: buildSystemPrompt(mode, q),
      messages: [{ role: 'user', content: q }]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${res.status} — check API key`);
  }

  clearTimer();
  hideEl('thinkingEl');
  document.getElementById('ansQuery').textContent = q;
  setAnswerBadges(MODELS[mode].label, MODELS[mode].cls,
    ((Date.now() - t0)/1000).toFixed(1) + 's', APP.examMode);
  document.getElementById('ansSources').style.display = 'none';
  document.getElementById('deepBtn').style.display = mode !== 'deep' ? 'inline-flex' : 'none';
  showEl('answerCard');

  const body = document.getElementById('ansBody');
  body.innerHTML = '<span class="stream-cursor"></span>';

  let full = '';
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split('\n');
    buf = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const raw = line.slice(5).trim();
      if (raw === '[DONE]') break;
      try {
        const ev = JSON.parse(raw);
        if (ev.type === 'content_block_delta' && ev.delta?.text) {
          full += ev.delta.text;
          body.innerHTML = renderAnswerBody(full) + '<span class="stream-cursor"></span>';
          body.scrollIntoView({ block: 'nearest' });
        }
      } catch (_) {}
    }
  }

  body.innerHTML = renderAnswerBody(full);
  APP.lastAnswer = full;
  setTimeout(function(){ renderKaTeX(body); }, 80);
  document.getElementById('ansBadges').querySelector('.abadge-time') &&
    (document.getElementById('ansBadges').querySelector('.abadge-time').textContent = ((Date.now()-t0)/1000).toFixed(1)+'s');
}

/* ─────────── LIVE WEB SEARCH (SONNET + TOOL USE) ─────────── */
async function askLive(q, t0) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': APP.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: MODELS.live.id,
      max_tokens: 1400,
      system: buildSystemPrompt('live'),
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{ role: 'user', content: q }]
    })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `HTTP ${res.status}`);
  }

  const data = await res.json();
  clearTimer();
  hideEl('thinkingEl');

  let answer = '';
  const urls = [];

  for (const block of (data.content || [])) {
    if (block.type === 'text') answer += block.text;
  }

  // Extract URLs safely
  const urlMatches = answer.match(/https?:\/\/[^\s<>()]+/g) || [];
  for (const u of urlMatches.slice(0, 6)) {
    try { urls.push({ url: u, domain: new URL(u).hostname.replace('www.', '') }); } catch(_) {}
  }

  document.getElementById('ansQuery').textContent = q;
  setAnswerBadges('LIVE WEB', 'abadge-live', ((Date.now()-t0)/1000).toFixed(1)+'s', APP.examMode);

  const srcBar = document.getElementById('ansSources');
  if (urls.length) {
    srcBar.style.display = 'block';
    const uniqueUrls = [...new Set(urls.map(u => u.domain))].slice(0, 5);
    document.getElementById('srcChips').innerHTML = urls
      .filter((u, i) => uniqueUrls.indexOf(u.domain) === i)
      .map(u => {
        // Validate URL protocol to prevent javascript: injection
        try { const p = new URL(u.url).protocol; if (p !== 'https:' && p !== 'http:') return ''; } catch(_) { return ''; }
        return `<a class="src-chip" href="${esc(u.url)}" target="_blank" rel="noopener">🔗 ${esc(u.domain)}</a>`;
      })
      .join('');
  } else {
    srcBar.style.display = 'none';
  }

  document.getElementById('deepBtn').style.display = 'none';
  document.getElementById('ansBody').innerHTML = renderAnswerBody(answer);
  APP.lastAnswer = answer;
  showEl('answerCard');
}


/* ═══════════════════════════════════════════════════════════════════════
   CYCLE 2 INJECTION — Complete knowledge base + expanded diagrams
   ═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   CYCLE 2 — COMPLETE KNOWLEDGE BASE (all 86 topics)
   Sources: Reed's Marine Engineering Series, Pounder's Marine Diesel
   Engines (9th Ed), MAN B&W/Wärtsilä Project Guides, Alfa Laval manuals,
   IMO STCW 2010, MARPOL 2021, SOLAS 2020, IMO A.749(18), DG Shipping
   India MEO Syllabus, D.J.Eyres Ship Stability, Rogers & Mayhew
   ═══════════════════════════════════════════════════════════════════════ */

/* Merge into existing TOPIC_KNOWLEDGE — called after base object defined */
Object.assign(TOPIC_KNOWLEDGE, {

/* ════════════════════════════════════
   CADET — BASIC SAFETY TRAINING
   ════════════════════════════════════ */

bst_fire: {
  formulas: [
    { label: 'Fire Triangle', eq: 'Fuel + Oxygen + Heat → Fire (remove any one side → extinction)', note: 'Tetrahedron adds: chemical chain reaction (4th side). Source: STCW A-VI/1-2' },
    { label: 'Extinguishing Methods', eq: 'Cooling (water) | Smothering (CO₂/foam) | Starvation (remove fuel) | Inhibition (dry powder)', note: 'Match method to fire class. Source: SOLAS Ch II-2' }
  ],
  videos: [
    { id: 'z5ju2IhOlLE', title: 'Classes of Fire & Extinguisher Types Explained', ch: 'Fire Safety Training' },
    { id: 'NZGP6iBqBfc', title: 'Fixed CO₂ Fire Fighting System on Ships', ch: 'MarineGyaan' },
    { id: 'TsyQ3DDWPPI', title: 'Ship Fire Fighting — STCW Practical Training', ch: 'STCW Online' }
  ],
  flashcards: [
    { q: 'Name the five classes of fire (A–D, F) and their fuel types.', a: 'Class A: Solid materials — wood, paper, fabric, rope (cooled by water). Class B: Flammable liquids — oil, paint, fuel (foam, CO₂, dry powder). Class C: Flammable gases — LPG, acetylene (isolate supply, dry powder). Class D: Combustible metals — magnesium, titanium (specialist dry sand/powder only, NEVER water). Class F: Cooking oils and fats (wet chemical agent). Source: STCW A-VI/1-2; BS EN 2.' },
    { q: 'What is the STCW requirement for fire patrol frequency on a ship?', a: 'SOLAS Reg II-2/7: Fire patrols must be conducted at regular intervals throughout the ship when crew are not on watch. Patrol officer must be able to detect signs of fire, operate fire detection and alarm systems, sound alarms. Patrol log book entries required. Source: SOLAS Ch II-2 Reg 7, STCW A-VI/1-2.' },
    { q: 'How does a CO₂ fixed fire-fighting system work and what must you do before activating?', a: 'CO₂ is stored as liquid under pressure in cylinders (bank system). On activation: CO₂ discharges into protected space (engine room, cargo hold), displaces oxygen below 15% — fire suffocates. BEFORE activation: (1) Sound alarm — minimum 20 second pre-discharge warning (SOLAS). (2) Ensure all personnel have evacuated. (3) Close all openings, fans, dampers. (4) Shut fuel valves. Then release CO₂. Source: SOLAS Ch II-2 Reg 10.' }
  ]
},

bst_aid: {
  formulas: [
    { label: 'CPR Ratio (Adult)', eq: '30 compressions : 2 rescue breaths. Rate: 100–120 compressions/min', note: 'Push hard (5–6 cm depth), fast, allow full recoil. Source: STCW A-VI/1-3, Resuscitation Council' },
    { label: 'Shock Signs', eq: 'Pale + Cold + Clammy skin + Rapid weak pulse + Confusion → Treat for shock', note: 'Lay flat, elevate legs (if no spinal injury), keep warm, oxygen if available' }
  ],
  videos: [
    { id: 'zBkOSBQfVYM', title: 'CPR for Maritime — STCW First Aid', ch: 'Red Cross First Aid' },
    { id: 'k2JOfmYENqM', title: 'Burns & Scalds Treatment at Sea', ch: 'Maritime Medical' }
  ],
  flashcards: [
    { q: 'Describe the DR ABC emergency action sequence.', a: 'D — Danger: ensure scene is safe for rescuer first. R — Response: check casualty consciousness (shout, shake shoulders). A — Airway: tilt head back, lift chin, remove visible obstructions. B — Breathing: look, listen, feel for normal breathing (10 seconds). C — Circulation/CPR: if not breathing normally, start 30:2 CPR, call for help, use AED if available. Source: STCW A-VI/1-3, Resuscitation Council 2021 Guidelines.' },
    { q: 'How do you treat a serious burn at sea?', a: '(1) Cool burn immediately with cool (not cold/ice) running water for minimum 20 minutes — reduces tissue damage. (2) Remove jewellery/clothing NOT stuck to burn. (3) Cover loosely with cling film or clean non-fluffy dressing — do NOT burst blisters. (4) Treat for shock — lay flat, keep warm. (5) Seek medical advice via radio (TMAS — Telemedical Assistance Service). (6) Do NOT apply butter, toothpaste or any home remedy. Source: Ship Captain\'s Medical Guide; STCW A-VI/1-3.' }
  ]
},

bst_social: {
  formulas: [
    { label: 'Rest Hours (STCW)', eq: 'Min rest: 10h in any 24h period AND 77h in any 7-day period', note: 'Max work: 14h/24h, 98h/7 days. Source: STCW Reg VIII/1, MLC 2006 Standard A2.3' }
  ],
  videos: [
    { id: 'mY3imBi4yiQ', title: 'STCW Personal Safety & Social Responsibility', ch: 'Marine Insight' }
  ],
  flashcards: [
    { q: 'What are the STCW minimum rest hour requirements?', a: 'STCW Reg VIII/1 and MLC 2006 Standard A2.3: Minimum rest of 10 hours in any 24-hour period AND 77 hours in any 7-day period. Maximum work: 14 hours in any 24-hour period AND 98 hours in any 7-day period. Rest periods may be divided into no more than two periods, one of which must be at least 6 hours. Exceptions for emergencies only. Records must be kept and signed. Source: STCW 2010 Manila Amendment.' },
    { q: 'What is the onboard drug and alcohol policy under STCW?', a: 'STCW Reg VIII/1: Blood alcohol level (BAC) ≤ 0.05% (50mg/100ml) for persons on watch. Companies may impose stricter limits (many set 0.00%). Drug testing: random testing increasingly adopted. STCW requires companies have drug/alcohol policy, testing procedures, and rehabilitation provisions. Seafarer found unfit for duty due to alcohol: relieved of watch, disciplinary action, possible termination/repatriation. Source: STCW Reg VIII/1, ILO/IMO Guidelines on Alcohol and Drug Policies.' }
  ]
},

/* ════ ENGINEERING MATHS ════ */
math_calc: {
  formulas: [
    { label: 'Differentiation (Power Rule)', eq: 'd/dx (xⁿ) = n·xⁿ⁻¹', note: 'Rate of change. Used in: velocity from displacement, heat flux from temp gradient' },
    { label: 'Integration (Power Rule)', eq: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C', note: 'Area under curve. Used in: work from force, impulse from force-time' },
    { label: 'Taylor Series', eq: 'f(x) ≈ f(a) + f\'(a)(x-a) + f\'\'(a)(x-a)²/2! …', note: 'Linearisation of complex functions — used in control theory' }
  ],
  videos: [
    { id: '9vKqVkMQHKk', title: 'Calculus for Engineers — Differentiation & Integration', ch: 'Professor Leonard' }
  ],
  flashcards: [
    { q: 'How is differentiation used in marine engineering?', a: 'Differentiation finds rate of change: (1) Velocity = d(displacement)/dt — piston velocity from crank geometry. (2) Acceleration = d(velocity)/dt — vibration analysis. (3) Heat flux q = -k·dT/dx (Fourier\'s Law) — heat conduction through boiler tubes and hull plating. (4) Flow acceleration in convergent nozzles — dV/dx from continuity and Bernoulli. (5) Torque T = dW/dθ — work done per radian. Essential for understanding engine dynamics, control systems, heat transfer. Source: Engineering Mathematics by Stroud.' }
  ]
},

math_stats: {
  formulas: [
    { label: 'Mean', eq: 'x̄ = Σx / n', note: 'Average value. Used for: average fuel consumption, SFOC trending' },
    { label: 'Standard Deviation', eq: 'σ = √(Σ(x-x̄)² / n)', note: 'Spread of data. Used for: quality control, bearing wear variation' },
    { label: 'Normal Distribution', eq: '68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ', note: 'Used in: machinery condition monitoring, tolerance analysis' }
  ],
  videos: [{ id: 'SzZ6GpcfoQY', title: 'Statistics for Engineers — Normal Distribution', ch: 'Engineering Made Easy' }],
  flashcards: [
    { q: 'How is statistical analysis used in marine engineering maintenance?', a: 'Key applications: (1) Trend analysis of lube oil results — plotting Fe/Cu/Pb over time, detecting abnormal wear. (2) Vibration signature analysis — FFT frequency spectrum, comparing against baseline. (3) SFOC monitoring — control charts detect abnormal fuel consumption. (4) Crankshaft deflection trending — detect gradual alignment change. (5) Bearing clearance records — standard deviation shows manufacturing consistency. All PMS systems use statistical trending. Source: Condition Monitoring Handbook; Shell Lubricant Advisory.' }
  ]
},

math_vectors: {
  formulas: [
    { label: 'Moment of Force', eq: 'M = F × d  [Nm]', note: 'd = perpendicular distance from pivot. Used in: stability (righting moment = W × GZ)' },
    { label: 'Resolution of Forces', eq: 'Fx = F·cosθ,  Fy = F·sinθ', note: 'Resolve propeller thrust into axial/tangential components' },
    { label: 'Equilibrium', eq: 'ΣF = 0  and  ΣM = 0', note: 'Ship at rest: buoyancy = weight, all moments balanced' }
  ],
  videos: [{ id: 'xFpQYfBWDVQ', title: 'Engineering Statics — Forces and Moments', ch: 'The Efficient Engineer' }],
  flashcards: [
    { q: 'Why is moment of force important in ship stability?', a: 'Righting moment = displacement (W) × righting lever (GZ). This restoring moment returns ship to upright after heeling. If righting moment > heeling moment: ship is stable. GZ curve plots GZ vs angle θ — area under curve = dynamic stability (energy available to resist capsizing). Inclining experiment measures GM by applying known moment (moving known weight) and measuring resulting heel angle: GM = (w × d) / (W × tanθ). Source: D.J.Eyres, Ship Stability Ch 8.' }
  ]
},

/* ════ WORKSHOP PRACTICE ════ */
ws_tools: {
  formulas: [
    { label: 'Cutting Speed (Lathe)', eq: 'V = π·D·N / 1000  [m/min]', note: 'D=diameter(mm), N=RPM. Select speed from material cutting speed table' },
    { label: 'Thread Pitch', eq: 'Pitch = 1 / TPI  [inches]  or  direct mm for metric', note: 'TPI = threads per inch (BSW/UNC). Metric: M10 × 1.5 means 1.5mm pitch' }
  ],
  videos: [{ id: 'Vc3RaOUxuPQ', title: 'Workshop Hand Tools — Safe Use & Maintenance', ch: 'Tooling U-SME' }],
  flashcards: [
    { q: 'Name six types of files and their uses in a marine workshop.', a: '(1) Flat file: general flat surface filing, removing metal from flat surfaces. (2) Half-round: curved surfaces, inside of flanges. (3) Round (rat-tail): enlarging holes, curved grooves. (4) Three-square: corners, internal angles. (5) Knife: acute angles, slots. (6) Needle files: fine detailed work, instrument parts. Cut grades: bastard (coarse, fast removal) → second cut → smooth → dead smooth. Marine use: deburring machined parts, fitting valves, cleaning gasket faces. Source: Reed\'s Engineering Workshop Practice.' }
  ]
},

ws_lathe: {
  formulas: [
    { label: 'Lathe Cutting Speed', eq: 'N = (1000 × V) / (π × D)  [RPM]', note: 'V=recommended surface speed(m/min). Mild steel: 25-30 m/min HSS, 75-90 m/min carbide' },
    { label: 'Material Removal Rate', eq: 'MRR = V × f × d  [mm³/min]', note: 'V=cutting speed, f=feed(mm/rev), d=depth of cut(mm)' }
  ],
  videos: [{ id: 'VtWP2GVqwMg', title: 'Lathe Machine Operations for Beginners', ch: 'NYC CNC' }],
  flashcards: [
    { q: 'What lathe operations are performed in a marine engine room workshop?', a: 'Common marine workshop lathe operations: (1) Turning — reduce diameter of shaft, piston rod. (2) Facing — machine flat face on shaft end, flange face. (3) Boring — enlarge existing hole, bore out bearing housing. (4) Taper turning — machine taper on shaft (propeller taper, valve spindle). (5) Thread cutting — cut external/internal threads for studs, bolts. (6) Knurling — raise pattern on handle for grip. (7) Parting off — cut a piece to length. Typical materials: mild steel, brass, bronze, stainless steel. Source: Reed\'s Vol 1, Workshop Techniques.' }
  ]
},

ws_measure: {
  formulas: [
    { label: 'Micrometer Reading', eq: 'Reading = Sleeve graduation + Thimble graduation + Vernier (if fitted)', note: 'Resolution 0.01mm standard, 0.001mm with vernier. Source: Reed\'s Vol.1' },
    { label: 'Tolerance',          eq: 'Tolerance = Upper limit − Lower limit', note: 'Interference fit: shaft > bore. Clearance fit: shaft < bore. Transition: overlap.' }
  ],
  videos: [{ id: 'StDYyHmAQGw', title: 'How to Use a Micrometer — Step by Step', ch: 'The Engineering Mindset' }],
  flashcards: [
    { q: 'Name four precision measuring instruments used in a marine engine room and their resolution.', a: '(1) Outside micrometer: measures external diameters — 0.01mm resolution (0.001mm with vernier scale). Used for shaft, piston diameter. (2) Vernier caliper: inside, outside, depth measurements — 0.02mm or 0.05mm. (3) Dial indicator (DTI): measures small displacements, runout, eccentricity — 0.01mm. Mounted in holder for crankshaft deflection, bearing clearance. (4) Feeler gauge: thin steel blades 0.05–1.0mm for measuring narrow gaps — valve clearances, bearing clearances. Source: Reed\'s Vol.1 Engineering Measurement.' }
  ]
},

ws_weld: {
  formulas: [
    { label: 'Heat Input', eq: 'Q = (V × I × 60) / (v × 1000)  [kJ/mm]', note: 'V=volts, I=amps, v=travel speed mm/min. Controls grain size & distortion' }
  ],
  videos: [{ id: 'b9PWUiZnJFs', title: 'MMA Stick Welding — Complete Beginner Guide', ch: 'Welding Tips & Tricks' }],
  flashcards: [
    { q: 'Compare MMA, MIG/MAG and TIG welding — when is each used on ships?', a: 'MMA (Manual Metal Arc / Stick): electrode consumable, all positions, outdoor/windy use, structural steel, pipe repair. Most common shipboard welding. MIG/MAG: wire feed continuous, faster than MMA, less skill needed, indoor/windless spaces, mild/stainless steel fabrication. TIG (GTAW): non-consumable tungsten electrode, argon shield, highest quality, thin stainless/aluminium, precision pipe welds, slow but excellent. Shipboard: TIG for hydraulic pipe repairs, stainless manifolds. Source: Reed\'s Vol.1; AWS Welding Handbook.' }
  ]
},

/* ════ BASIC THERMODYNAMICS (CADET) ════ */
therm_laws: {
  formulas: [
    { label: 'Zeroth Law', eq: 'If A=B and B=C in temperature, then A=C → basis of thermometry', note: 'Source: Rogers & Mayhew, Engineering Thermodynamics' },
    { label: 'First Law', eq: 'Q − W = ΔU  (closed system)', note: 'Energy conservation. Q=heat added [kJ], W=work done by system [kJ]' },
    { label: 'Second Law', eq: 'No engine can convert all heat to work: η < η_Carnot = 1 − T_L/T_H', note: 'Defines direction of natural processes — entropy always increases' },
    { label: 'Third Law', eq: 'Entropy → 0 as T → 0 K (absolute zero)', note: 'Theoretical — sets absolute entropy reference' }
  ],
  videos: [
    { id: '8N1BxHgsoOw', title: 'Laws of Thermodynamics Explained', ch: 'The Engineering Mindset' },
    { id: '4i1MUWJoI0U', title: 'First & Second Law — Marine Engineering Applications', ch: 'Michel van Biezen' }
  ],
  flashcards: [
    { q: 'State the First and Second Laws of Thermodynamics with marine engineering applications.', a: 'First Law (Energy Conservation): Q − W = ΔU. In a diesel cylinder: chemical energy in HFO → heat Q from combustion → work W on piston + heat rejected to cooling water. Conservation: nothing created or lost. Second Law (Entropy): No heat engine can be 100% efficient; heat always flows from hot to cold naturally. Application: diesel engine MUST reject heat to jacket water and exhaust — this is unavoidable. Exhaust heat recovery (EGB) and jacket water FWG recover some of this rejected energy. Modern 2-stroke thermal efficiency ~52% — rest is unavoidable second law loss. Source: Rogers & Mayhew, Engineering Thermodynamics.' }
  ]
},

therm_gas: {
  formulas: [
    { label: 'Ideal Gas Law',      eq: 'PV = mRT   or   P₁V₁/T₁ = P₂V₂/T₂', note: 'P in Pa, V in m³, T in Kelvin, R=287 J/kg·K for air. Source: Reed\'s Vol.2' },
    { label: 'Polytropic Process', eq: 'PVⁿ = constant', note: 'n=0: isobaric, n=1: isothermal, n=γ: isentropic, n=∞: isochoric. Compression in air compressor: n≈1.2–1.35' },
    { label: 'Characteristic Gas Constant', eq: 'R = R_u / M   [J/kg·K]', note: 'R_u=8314 J/kmol·K (universal). M=molar mass. Air: M=29, R=287. CO₂: R=189.' }
  ],
  videos: [{ id: 'A_iDpNhCHME', title: 'Ideal Gas Law & Polytropic Processes', ch: 'Engineering Explained' }],
  flashcards: [
    { q: 'A diesel air compressor takes in air at 1 bar, 27°C and compresses it polytropically (n=1.3) to 30 bar. Find the final temperature.', a: 'Using T₂/T₁ = (P₂/P₁)^((n-1)/n):\nT₁ = 27 + 273 = 300 K\nT₂ = 300 × (30/1)^((1.3-1)/1.3)\nT₂ = 300 × (30)^(0.3/1.3)\nT₂ = 300 × (30)^0.2308\nT₂ = 300 × 2.327 = 698 K = 425°C\nThis shows why intercooling is essential — without it, temperature at 30 bar would be dangerously high. Intercooling reduces work input and prevents lube oil carbonisation in compressor. Source: Reed\'s Vol.2.' }
  ]
},

therm_steam: {
  formulas: [
    { label: 'Dryness Fraction', eq: 'x = m_vapour / (m_liquid + m_vapour)', note: 'x=1: dry sat. steam. x<1: wet steam. h = hf + x·hfg from steam tables' },
    { label: 'Enthalpy of Wet Steam', eq: 'h = hf + x·hfg  [kJ/kg]', note: 'hf=liquid enthalpy, hfg=latent heat of vaporisation. From steam tables at given P or T' },
    { label: 'Clausius-Clapeyron', eq: 'dP/dT = L / (T·Δv)  ≈ hfg / (T·vg)', note: 'Explains why boiling point rises with pressure — used in FWG design' }
  ],
  videos: [{ id: 'dVZFSHzuvpM', title: 'Steam Tables Explained — How to Read & Use', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'Read steam tables to find properties of steam at 7 bar. Find: Tsat, hf, hfg, hg.', a: 'From steam tables at 7 bar (0.7 MPa): Tsat ≈ 165°C. hf ≈ 697 kJ/kg (saturated liquid enthalpy). hfg ≈ 2066 kJ/kg (latent heat of vaporisation). hg = hf + hfg ≈ 2763 kJ/kg (dry saturated steam enthalpy). If steam is wet with x=0.92: h = 697 + 0.92 × 2066 = 697 + 1901 = 2598 kJ/kg. Application: Scotch marine boiler operating at 7 bar. Wet steam with low dryness fraction reduces heat transfer efficiency. Source: Rogers & Mayhew Steam Tables.' }
  ]
},

/* ════ NAVAL ARCHITECTURE BASICS ════ */
na_ships: {
  formulas: [
    { label: 'Displacement', eq: 'Δ = ρ × V_underwater  [tonnes]', note: 'ρ_SW=1.025 t/m³, ρ_FW=1.000 t/m³. V=volume of underwater hull form' },
    { label: 'Block Coefficient', eq: 'Cb = V / (L × B × T)', note: 'Ratio of hull volume to circumscribed box. Tanker: 0.83–0.87. Container: 0.60–0.65' },
    { label: 'Deadweight Tonnage', eq: 'DWT = Load displacement − Lightship displacement', note: 'Cargo + fuel + water + provisions + crew + effects' }
  ],
  videos: [
    { id: 'dXMZf08ZMWE', title: 'Types of Merchant Ships Explained', ch: 'Marine Insight' },
    { id: 'OFKjyoMGOp0', title: 'Ship Dimensions & Coefficients', ch: 'Naval Architecture Tutorial' }
  ],
  flashcards: [
    { q: 'Name six types of merchant vessels and their cargo systems.', a: '(1) Crude oil tanker (VLCC/Suezmax): crude oil in cargo tanks, inert gas system, COW. (2) Bulk carrier (Capesize/Panamax): dry bulk in open hold, grab discharge. (3) Container ship: ISO containers in cells, shore crane. (4) LNG carrier: liquefied natural gas at -163°C in insulated Moss/membrane tanks. (5) Chemical tanker: IMO type I/II/III for chemicals, stainless steel tanks, individual pump per tank. (6) RoRo (Roll-on Roll-off): vehicles driven on via stern/side ramp, car carriers. Source: IMO Ship Types Classification; Barras, Ship Stability for Masters and Mates.' }
  ]
},

na_stability: {
  formulas: [
    { label: 'Archimedes Principle', eq: 'Buoyancy force = weight of fluid displaced = ρ·g·V', note: 'Ship floats: buoyancy = weight of ship. V = underwater volume' },
    { label: 'TPC (Tonnes Per Centimetre)', eq: 'TPC = Aw × ρ / 100', note: 'Aw=waterplane area(m²), ρ=water density(t/m³). Sinkage per tonne added = 1/TPC' },
    { label: 'Plimsoll Marks', eq: 'S=Summer, W=Winter, WNA=Winter N.Atlantic, T=Tropical, F=Fresh, TF=Tropical Fresh', note: 'Freeboard zones defined by Load Line Convention 1966. Source: IMO LL Convention' }
  ],
  videos: [
    { id: 'r7rDXyqJijg', title: 'Ship Stability & Buoyancy Fundamentals', ch: 'MarineGyaan' },
    { id: 'VQAobBbFdFk', title: 'Plimsoll Mark & Load Lines Explained', ch: 'Marine Insight' }
  ],
  flashcards: [
    { q: 'Explain the Plimsoll mark and load line zones.', a: 'Load Line Convention 1966 (ILLC): Plimsoll mark (circle with horizontal line) shows maximum load waterline. Additional marks: TF (Tropical Fresh), F (Fresh), T (Tropical Salt), S (Summer — main reference), W (Winter), WNA (Winter North Atlantic). Ship must not be loaded so any mark submerges in the applicable zone. Freeboard = distance from waterline to main deck — must not decrease below assigned minimum. Ship Owner responsibility; Class/Flag verified. Source: International Load Line Convention 1966, Protocol 1988.' }
  ]
},

na_regs: {
  formulas: [
    { label: 'IMO Convention Hierarchy', eq: 'UNCLOS → IMO Conventions (SOLAS, MARPOL, STCW) → Codes → Guidelines', note: 'Conventions mandatory; Codes may be mandatory or voluntary. Source: IMO Structure' }
  ],
  videos: [{ id: 'wV4fbtXqxGc', title: 'IMO — International Maritime Organization Explained', ch: 'Marine Insight' }],
  flashcards: [
    { q: 'What are SOLAS, MARPOL and STCW? State each convention\'s purpose.', a: 'SOLAS (International Convention for the Safety of Life at Sea) 1974: prescribes minimum safety standards for construction, equipment and operation of merchant ships. 14 Chapters covering: construction, fire, lifesaving, radio, navigation, cargo, management (ISM), security (ISPS). MARPOL 73/78 (International Convention for Prevention of Pollution from Ships): 6 Annexes — Annex I oil, II noxious liquids, III packaged goods, IV sewage, V garbage, VI air emissions. STCW (Standards of Training, Certification and Watchkeeping) 1978/2010: sets minimum qualification standards for seafarers — training, certification, hours of rest. Manila Amendment 2010 updated competency standards. All administered by IMO. Source: IMO Website; Reed\'s Regulations.' }
  ]
},

/* ════════════════════════════════════
   MEO CLASS IV — ADDITIONAL TOPICS
   ════════════════════════════════════ */

cl4_4stroke: {
  formulas: [
    { label: 'Valve Timing (4-stroke)', eq: 'IVO, IVC, EVO, EVC positions relative to TDC/BDC', note: 'Valve overlap at TDC improves scavenging. Source: Pounder\'s Ch.4' },
    { label: 'Indicated Power (4-stroke)', eq: 'IHP = (Pm × L × A × N) / (2 × 60,000)  [kW]', note: 'Divide by 2×60,000 as power stroke every alternate revolution. Source: Reed\'s Vol.5' }
  ],
  videos: [
    { id: 'zA_19bHxEYI', title: '4-Stroke Marine Diesel Engine — Working Principle', ch: 'Wartsila' },
    { id: 'TC2FY7Bw3Ag', title: 'Wärtsilä 4-Stroke Engine Explained', ch: 'Marine Insight' }
  ],
  flashcards: [
    { q: 'Compare 2-stroke and 4-stroke marine diesel engines for their key differences.', a: '2-stroke (slow speed, e.g. MAN B&W S-type): power stroke every revolution, uniflow scavenging, large bore 500–1100mm, 80–130 RPM, direct drive to propeller, SFOC 155–175 g/kWh, used in large ocean-going vessels. 4-stroke (medium speed, e.g. Wärtsilä 32/34/46): power stroke every 2 revolutions, poppet valve scavenging, bore 200–600mm, 400–1000 RPM, requires gearbox/CPP, higher SFOC ~180–210 g/kWh, smaller/lighter, used in ferries, smaller vessels, generator sets. Source: Pounder\'s Marine Diesel Engines Ch.3 & 4.' },
    { q: 'What is valve overlap in a 4-stroke engine and why is it used?', a: 'Valve overlap = brief period near TDC when both inlet and exhaust valves are open simultaneously. Overlap angles: inlet opens 10–15° BTDC, exhaust closes 10–15° ATDC → overlap period ~20–30°. Purpose: (1) Inertia of incoming charge helps push out remaining exhaust gas — improved scavenging. (2) Cools cylinder head and piston crown with fresh charge. (3) Raises volumetric efficiency. Too much overlap at low speed: charge short-circuits exhaust without burning — black smoke, fuel waste. Source: Pounder\'s Ch.4.' }
  ]
},

cl4_fuelsys: {
  formulas: [
    { label: 'HFO Viscosity Target', eq: 'Injection viscosity: 10–17 cSt at injector. HFO heated to 120–150°C', note: 'Viscosity meter/controller automatically adjusts steam heater. Source: MAN B&W Fuel System Manual' },
    { label: 'Fuel Pump MEP Calculation', eq: 'Injection pressure = plunger area × spring force / nozzle area', note: 'Opening pressure: 250–400 bar (conventional). Common rail: 600–1800 bar constant. Source: Wärtsilä Engine Manual' }
  ],
  videos: [
    { id: 'sfCubdXWqEI', title: 'Marine Fuel Oil System — HFO Treatment & Injection', ch: 'MarineGyaan' },
    { id: '3FPuU1EWE2M', title: 'Common Rail Fuel Injection System Explained', ch: 'Wärtsilä Official' }
  ],
  flashcards: [
    { q: 'Describe the complete HFO treatment process from bunker tank to engine.', a: 'HFO treatment sequence: (1) Bunker tank (settling) → heated to 40–50°C, water and sludge settle. (2) Transfer pump → service tank. (3) Service tank → heater → 70–80°C. (4) Supply pump → viscosity controller → purifier inlet at 95–98°C (density separation). (5) Clean fuel → mixing tank/day tank. (6) Booster pump → heater → 120–150°C (achieves 10–17 cSt injection viscosity). (7) Injection → injector atomises HFO into combustion chamber. Purification removes water, sludge, and solid contaminants that would damage injection equipment and cause combustion problems. Source: MAN B&W Fuel Treatment Manual.' },
    { q: 'What is a common rail fuel injection system and its advantages?', a: 'Common rail (CR): high-pressure fuel stored in common accumulator rail at constant 600–1800 bar, supplied to all cylinders independently via electronically controlled FIVA (Fuel Injection and Valve Actuation) valves. Advantages: (1) Variable injection timing — optimise at all loads. (2) Variable injection pressure — better atomisation at part load. (3) Multiple injection events possible (pilot + main + post). (4) Enables VGT (variable geometry turbocharger) optimisation. (5) Lower SFOC at part load vs conventional jerk pump. Used in: MAN B&W ME/ME-C engines, Wärtsilä RT-flex engines. Source: MAN B&W ME Engine Description.' }
  ]
},

cl4_lubesys: {
  formulas: [
    { label: 'Lube Oil Consumption', eq: 'Specific LO consumption = LO mass consumed / engine power output  [g/kWh]', note: 'Typical slow-speed 2-stroke cylinder oil: 0.8–1.5 g/kWh. Excessive = worn rings/liner' },
    { label: 'Bearing Pressure', eq: 'p = F / (L × D)  [N/mm²]', note: 'F=load, L=bearing length, D=journal diameter. Max allowable ~10–15 N/mm² for white metal' }
  ],
  videos: [
    { id: 'BzC3lxqKzbo', title: 'Marine Engine Lubrication System Explained', ch: 'Marine Insight' },
    { id: 'OqmPlxJRuZo', title: 'Crosshead & Bearing Lubrication — 2-Stroke Diesel', ch: 'MarineGyaan' }
  ],
  flashcards: [
    { q: 'What are the different lubrication points on a large 2-stroke marine diesel and their oil grades?', a: 'Main engine lubrication zones: (1) Main bearings & crankpin bearings: SAE 30/40 system oil from main LO pump at 3–5 bar — circulating system, cooled and filtered. (2) Crosshead bearings: same system oil fed via drilled passage in connecting rod. (3) Cylinder liner: separate cylinder oil injection system — SAE 50–70 TBN 40–100 (higher TBN for high-S fuel) — fed via lubricators on liner wall, 0.8–1.5 g/kWh. (4) Camshaft: separate camshaft oil circuit. (5) Turbocharger bearings: engine system oil supply. Never mix cylinder oil and system oil — different viscosities and additives. Source: MAN B&W Lubrication Manual; Shell Lubmarine.' }
  ]
},

cl4_heatex: {
  formulas: [
    { label: 'LMTD Method', eq: 'LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁/ΔT₂)', note: 'ΔT₁, ΔT₂ = temp differences at each end. Use for design of shell & tube, PHE. Source: Reed\'s Vol.2' },
    { label: 'Heat Duty', eq: 'Q = U × A × LMTD  [kW]', note: 'U=overall heat transfer coefficient [W/m²K], A=area [m²]' },
    { label: 'NTU Method', eq: 'ε = Q_actual / Q_max  (effectiveness)', note: 'Q_max = C_min × (T_h,in − T_c,in). Used when outlet temps unknown.' }
  ],
  videos: [
    { id: 'x23MF2V9GNE', title: 'Heat Exchangers — Types & Working Principle', ch: 'The Engineering Mindset' },
    { id: 'GsF0VAYQDLQ', title: 'Plate Heat Exchanger — Marine Applications', ch: 'Alfa Laval Official' }
  ],
  flashcards: [
    { q: 'Compare plate heat exchanger (PHE) vs shell-and-tube heat exchanger for marine use.', a: 'PHE: corrugated stainless steel plates clamped together, high turbulence → high U value (5000–8000 W/m²K), compact, easy cleaning (unscrew clamp, remove plates), lower pressure rating (~25 bar), low fouling if correct gaskets. Used for: LO coolers, JW coolers, HFO preheating. Shell-and-tube: tubes inside shell, can handle higher pressures (>100 bar), more robust, harder to clean (tube brushing or acid clean), lower U (~500–2000 W/m²K), larger/heavier. Used for: condenser, high-pressure steam systems, refrigerant condensers. Marine trend: PHE replacing shell-and-tube in new builds. Source: Alfa Laval Technical Handbook; Reed\'s Vol.6.' }
  ]
},

cl4_aircomp: {
  formulas: [
    { label: 'Two-Stage Compression Work', eq: 'W_total = W_stage1 + W_stage2 (with intercooling)', note: 'Intercooling reduces work by ~15% vs single-stage to same pressure. Source: Reed\'s Vol.6' },
    { label: 'Compression Ratio per Stage', eq: 'r_stage = √(P_final / P_initial)  [for equal ratios]', note: 'E.g., 1 to 30 bar 2-stage: each stage PR = √30 = 5.48' },
    { label: 'Fusible Plug Temperature', eq: 'Fusible plug melts at 121°C — prevents explosion if cooling fails', note: 'Zinc-based alloy plug in delivery line. Source: Reed\'s Vol.6; SOLAS II-1' }
  ],
  videos: [
    { id: 'llbE_Kz5gJw', title: 'Air Compressor Types — Reciprocating Marine Compressor', ch: 'The Engineering Mindset' },
    { id: 'KIw4UVoNJuA', title: 'Starting Air System on Ships', ch: 'MarineGyaan' }
  ],
  flashcards: [
    { q: 'Describe the safety devices on a marine starting air compressor.', a: 'Safety devices on a 2-stage intercooled starting air compressor (25–30 bar output): (1) Relief valves on each stage and after intercooler — prevent over-pressure if NRV fails or valve sticks. (2) Fusible plug: zinc-alloy plug melting at 121°C on discharge pipe — melts if overheated, releases air before explosion. (3) NRV (non-return valve): prevents backflow from receivers into compressor. (4) Intercooler relief valve: excess pressure between stages. (5) Auto-unloading valve: unloads starting head at standstill — easy starting. (6) Moisture drain valves: manual/auto draining of water from intercooler and aftercooler. (7) Oil pressure low alarm/shutdown — protects crankshaft bearings. Source: Reed\'s Vol.6 Ch.9.' },
    { q: 'Why is intercooling used in a 2-stage starting air compressor?', a: 'Intercooling (cooling compressed air between stage 1 and stage 2): (1) Reduces temperature of air entering stage 2 — approaching isothermal ideal compression, reducing work input by ~15%. (2) Reduces delivery temperature — prevents oil carbonisation and fire risk in high-pressure air. (3) Removes moisture condensed in intercooler — drains prevent water entering bottles. (4) Increases volumetric efficiency of stage 2. (5) Allows use of lower-temperature sealing materials. Without intercooling: temperature at 30 bar from 1 bar/27°C would exceed 600°C — dangerous. Source: Reed\'s Vol.6.' }
  ]
},

cl4_motors: {
  formulas: [
    { label: 'Synchronous Speed', eq: 'Ns = (120 × f) / P  [RPM]', note: '4-pole, 60Hz: Ns=1800 RPM. 6-pole, 60Hz: Ns=1200 RPM' },
    { label: 'Slip',              eq: 's = (Ns − N) / Ns × 100%', note: 'Induction motor slip at full load: 2–5%. Synchronous motor: slip = 0' },
    { label: 'Motor Efficiency',  eq: 'η = P_output / P_input = (√3 × V × I × cosφ × η) / (√3 × V × I)', note: 'Power factor cosφ: fully loaded induction motor ≈ 0.85–0.90' }
  ],
  videos: [
    { id: 'AQqyGNOP_3o', title: 'Induction Motor — How It Works', ch: 'The Engineering Mindset' },
    { id: 'fpKRj-3nqYM', title: 'Star-Delta Starter for Marine Motors', ch: 'ElectricalE' }
  ],
  flashcards: [
    { q: 'Explain star-delta starting for a marine induction motor. Why is it used?', a: 'Star-delta starting: motor windings first connected in STAR (Y) configuration — reduces voltage across each winding to V/√3, reducing starting current to 1/3 of DOL (direct-on-line) value. After 5–10 seconds (motor accelerating), timer switches to DELTA (Δ) — full voltage on each winding, normal running. Why: large motors draw 6–8× full load current at DOL start, causing voltage dip on ship\'s busbar, tripping other equipment. Star-delta limits this. Limitation: torque also reduces to 1/3 during star start — not suitable for high starting torque loads (loaded conveyors, etc.). Source: Reed\'s Vol.4 Ch.6.' },
    { q: 'What is a Variable Frequency Drive (VFD) and how does it save energy on ships?', a: 'VFD (Variable Frequency Drive / inverter): converts fixed AC frequency to variable frequency, changing motor speed. Since motor speed N∝f and pump/fan power P∝N³ (affinity law): halving speed → power reduces to 1/8. Marine application: seawater cooling pumps, ventilation fans, ballast pumps. Example: seawater pump at 80% of full flow via VFD uses only 51% of full-speed power vs a throttle valve wasting power. IMO recommends VFDs for CII compliance. Payback typically 2–4 years. Source: Reed\'s Vol.4; ABB Marine Drives.' }
  ]
},

cl4_protection: {
  formulas: [
    { label: 'Fault Current', eq: 'I_fault = V / Z_fault  [A]', note: 'Z=impedance of fault path. HRC fuse/circuit breaker must clear before damage' },
    { label: 'Earth Fault Detection', eq: 'Insulation resistance: >1MΩ per kV of system voltage (minimum)', note: 'Measured with Megger. Below limit: earth fault risk. Source: Reed\'s Vol.4' }
  ],
  videos: [
    { id: 'XoLwH-N3l2Q', title: 'Ship Electrical Protection Systems Explained', ch: 'MarineGyaan' },
    { id: '2yFTWcM-wLQ', title: 'Earth Fault Detection on Ships', ch: 'Electrical4Mariners' }
  ],
  flashcards: [
    { q: 'What is a preferential trip and which loads are shed first?', a: 'Preferential trip: automatic load shedding when generator overloads (overcurrent relay trips non-essential loads in sequence to protect essential services). Trip sequence: First tripped (non-essential, within 5 seconds): accommodation HVAC, electric heating, galley non-essential equipment, hotel loads. Second tripped (semi-essential, ~15 seconds): cargo cranes (if not essential), non-essential pumps. NEVER tripped (essential): navigation lights, GMDSS, fire detection, bilge pumps, fire pumps, steering gear, emergency lighting. Source: SOLAS Ch II-1 Reg 41; Reed\'s Vol.4 Ch.8.' },
    { q: 'What is the purpose of an earth fault indicator on a ship\'s insulated distribution system?', a: 'Ships typically use IT system (insulated neutral — neither live conductor earthed). Earth fault indicator monitors insulation resistance of each phase to earth continuously. Purpose: (1) Detect first earth fault before it causes fire or shock hazard. (2) Single earth fault in IT system does not cause fault current — system keeps running. (3) Alarm sounds — locate and repair before second earth fault on opposite conductor creates dangerous current. Method: megger test (>1MΩ acceptable per kV), or balancing bridge circuit with resistors and voltmeter. Source: Reed\'s Vol.4 Ch.5.' }
  ]
},

cl4_emergency: {
  formulas: [
    { label: 'Emergency Generator SOLAS', eq: 'Auto-start: within 45 seconds of blackout. Run time: 18h passenger, 3h cargo (SOLAS II-1 Reg 43)', note: '36h for ships on international voyages from 2010 amendments. Source: SOLAS II-1 Reg.42,43' }
  ],
  videos: [
    { id: 'WZmDKd7Rnco', title: 'Emergency Generator — SOLAS Requirements', ch: 'MarineGyaan' },
    { id: 'GWMmORDElCU', title: 'Blackout Recovery Procedure on Ships', ch: 'Marine Engineering Tutorial' }
  ],
  flashcards: [
    { q: 'What are the SOLAS requirements for an emergency generator?', a: 'SOLAS Ch II-1 Reg 42-43: Emergency generator must be: (1) Located above the bulkhead deck — outside main machinery space. (2) Start automatically within 45 seconds of main power failure. (3) Capable of supplying power for minimum: 18 hours (passenger ships), 3 hours (cargo ships) — updated 36 hours some vessel types. (4) Supply: emergency lighting, GMDSS, fire detection, bilge alarms, fire pump, sprinkler pump, navigation lights, daylight signalling lamp, general alarm. (5) Tested weekly (no-load start) and under load monthly. Source: SOLAS Ch II-1 Reg 42, 43.' }
  ]
},

cl4_watch: {
  formulas: [
    { label: 'STCW Watch Standards', eq: 'Min rest: 10h/24h, 77h/7 days. Entries must be made every watch', note: 'Source: STCW Reg VIII/1, 2010 Manila Amendment' }
  ],
  videos: [
    { id: 'tTBQgGFVXkY', title: 'Engine Room Watchkeeping — Officer Duties', ch: 'MarineGyaan' }
  ],
  flashcards: [
    { q: 'Describe the engine room watch handover procedure per STCW.', a: 'STCW Table A-III/1 watchkeeping competence. Handover procedure: (1) Incoming officer reports to outgoing officer minimum 15 minutes before watch. (2) Check all machinery parameters: temperatures, pressures, levels, alarms. (3) Review logbook entries since last watch. (4) Be informed of: any defective equipment, special orders from Chief, any unusual conditions, machinery on standby. (5) Sign logbook accepting watch when satisfied. (6) Inform Chief Engineer of any abnormal condition. STCW: officer must not hand over watch if relieving officer appears impaired by fatigue or alcohol. Source: STCW A-VIII/1.' }
  ]
},

cl4_emergency2: {
  formulas: [
    { label: 'Fire Response', eq: 'Discover fire → Sound alarm → Isolate (fuel/vent) → Fight → Report → Evacuate if necessary', note: 'Source: SOLAS II-2; Ship\'s Fire Safety Management Plan' }
  ],
  videos: [{ id: 'NZGP6iBqBfc', title: 'Engine Room Fire — Emergency Response', ch: 'Maritime Safety' }],
  flashcards: [
    { q: 'What immediate actions do you take on discovering fire in the engine room?', a: 'Immediate actions (RACE/PASS protocols): (1) Raise alarm — sound fire alarm, inform bridge and Chief Engineer. (2) Attempt to fight fire if small and safe to do so — use portable extinguisher appropriate to class. (3) If escalating: stop fans/ventilation, close dampers/skylights (deny oxygen). (4) Shut fuel supply to affected area. (5) Muster firefighting team — boundary cooling, hose teams, BA sets. (6) If uncontrolled: evacuate engine room, seal spaces, prepare for fixed CO₂ release. (7) Master to decide flooding CO₂. (8) Report to watch officer/bridge every 5 minutes. Source: SOLAS II-2; Company SMS Emergency Procedures.' }
  ]
},

cl4_marpol_oral: {
  formulas: [
    { label: 'ORB Part I Entries', eq: 'Every oily operation → recorded within 24 hours, position noted, Master signs', note: 'Retained onboard 3 years. Inspected by PSC. Source: MARPOL Annex I Reg.17' }
  ],
  videos: [{ id: '9FKEpP8_k30', title: 'MARPOL ORB Part I — Correct Entries', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'What MARPOL operations must be recorded in the Oil Record Book Part I?', a: 'ORB Part I (engine room operations — MARPOL Annex I Reg.17): Must record: (A) Ballasting of fuel tanks / cleaning of fuel oil tanks. (B) Discharge of dirty ballast or cleaning water from above tanks. (C) Collection, transfer, disposal of oil residues (sludge/bilge). (D) Overboard discharge of bilge water (with 15 ppm limit compliance noted). (E) Accidental/exceptional discharges of oil — circumstances and reason. (F) Condition of OWS and OCM. Each entry: date, ship position (latitude/longitude), quantity, name/rank of officer, signature. Master must countersign each completed page. Retained 3 years. Available to PSC on demand. Source: MARPOL 73/78 Annex I Reg.17.' }
  ]
},

cl4_oral_maintenance: {
  formulas: [],
  videos: [{ id: 'qXbOEbDq2RY', title: 'Alfa Laval Purifier Overhaul Procedure', ch: 'Alfa Laval Official' }],
  flashcards: [
    { q: 'Describe the procedure to overhaul an Alfa Laval FOPX fuel oil purifier.', a: 'FOPX purifier overhaul (typically every 2000 running hours or as PMS requires): (1) Stop purifier, allow to decelerate fully. (2) Drain bowl. (3) Remove top disk (lock ring). (4) Lift out disc stack. (5) Remove distributor. (6) Remove gravity disc and inlet pipe. (7) Remove bowl hood. (8) Measure all wearing parts — spindle bearings, rubber O-rings, sealing ring, bowl hood threads. (9) Replace O-rings, worn parts. (10) Clean all internal surfaces, check for erosion on bowl hood. (11) Reassemble in reverse — correct torque on lock ring. (12) Balance check if major parts replaced. (13) Run test on MDO first before HFO service. (14) Verify gravity disc size is correct for oil density. Record in PMS. Source: Alfa Laval FOPX Instruction Manual.' }
  ]
},

/* ════════════════════════════════════
   MEO CLASS II — ADDITIONAL TOPICS
   ════════════════════════════════════ */

cl3_freesurface: {
  formulas: [
    { label: 'Free Surface Correction', eq: 'GGₘ = (ρ_liq × i_fs) / (ρ_ship × V)', note: 'i_fs = lb³/12 (rectangular tank). b=breadth of tank — note cubic effect! Source: D.J.Eyres' },
    { label: 'Effective GM with FSC', eq: 'GM_eff = GM_solid − GGₘ', note: 'GGₘ always REDUCES effective GM. Even empty/nearly empty tank has maximum FSC at ~50% fill' }
  ],
  videos: [{ id: 'lhFh3kAlOxI', title: 'Free Surface Effect — Full Explanation with Examples', ch: 'Marine Insight' }],
  flashcards: [
    { q: 'A ship has a rectangular DB tank 20m long, 12m wide, half filled with SW (ρ=1.025 t/m³). Ship displacement 15,000t. Calculate GGₘ.', a: 'i_fs = l × b³/12 = 20 × 12³/12 = 20 × 144 = 2,880 m⁴\nV = displacement/ρ_ship = 15,000/1.025 = 14,634 m³\nGGₘ = (ρ_liq × i_fs)/(ρ_ship × V)\nGGₘ = (1.025 × 2,880)/(1.025 × 14,634)\nGGₘ = 2952/15,000 = 0.197 m\nThis means effective GM is REDUCED by 0.197m. If solid GM was 0.30m, effective GM = 0.30 − 0.197 = 0.103m (dangerously close to 0.15m IMO minimum). Note: DOUBLING tank breadth would give 8× the free surface moment — b³ effect. Source: D.J.Eyres, Ship Stability Ch.10.' }
  ]
},

cl3_trim: {
  formulas: [
    { label: 'MCTC (Moment to Change Trim 1cm)', eq: 'MCTC = (W × GML) / (100 × L)  [tm/cm]', note: 'GML=longitudinal metacentric height, W=displacement, L=LBP. Source: D.J.Eyres Ch.12' },
    { label: 'Trim Change by Shifting Weight', eq: 'Change in trim = (w × d) / MCTC  [cm]', note: 'w=mass moved(t), d=distance moved forward/aft(m). BM changes at each end = trim change × (l/L)' },
    { label: 'TPC',  eq: 'TPC = Aw × ρ / 100  [t/cm]', note: 'Aw=waterplane area. Sinkage per tonne = 1/TPC cm/tonne' },
    { label: 'FWA',  eq: 'FWA = Δ / (4 × TPC)  [mm]', note: 'Fresh Water Allowance — rise in waterplane when moving from SW to FW' }
  ],
  videos: [{ id: '8o8VaF2Lhac', title: 'Trim & Longitudinal Stability Calculations', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'A ship displaces 8000t, MCTC=100 t·m/cm, LBP=120m. Moving 20t cargo from amidships to 40m forward — find change in trim.', a: 'Change in trim = (w × d) / MCTC = (20 × 40) / 100 = 8 cm by the head.\nChange at FP = trim change × (distance of F from aft) / L — use actual LCF from trim tables.\nUsing approx (trim change forward) = change in trim × LBP_fwd/LBP ≈ 8 × 60/120 = 4 cm rise at stern, 4 cm sinkage at bow (by the head). In practice: use hydrostatic tables for accurate BML and LCF. Source: D.J.Eyres, Ship Stability Ch.12.' }
  ]
},

cl3_damage: {
  formulas: [
    { label: 'SOLAS One-Compartment Standard', eq: 'Ship must float in equilibrium after flooding any single compartment', note: 'Passenger ships: two-compartment. Tankers: B/15 or 11.5m transverse penetration. Source: SOLAS Ch II-1' },
    { label: 'Permeability', eq: 'μ = (volume of space − volume of contents) / volume of space', note: 'Empty compartment: μ=0.95–0.97. Engine room: μ=0.85. Full cargo hold: μ=0.60–0.70' }
  ],
  videos: [{ id: 'tKYz2L0G0sM', title: 'Damage Stability — SOLAS Requirements Explained', ch: 'Seamans Training' }],
  flashcards: [
    { q: 'What is the lost buoyancy method in damage stability calculations?', a: 'Lost buoyancy method: treats flooded compartment as LOST to the ship — the flooded volume no longer contributes buoyancy. Effect on ship: (1) Waterplane area reduces (flooded compartment out). (2) KB, BM, GM all change — recalculate for damaged waterplane. (3) Ship sinks deeper to find new equilibrium with remaining intact buoyancy. Compared to added weight method (treats flooding as added weight): results are similar but lost buoyancy requires no change in G — simplifies calculation. SOLAS damage stability criteria: ship must have positive GM after flooding, waterline must not reach any opening. Source: D.J.Eyres Ch.18; SOLAS Ch II-1 Reg.7–9.' }
  ]
},

cl3_resistance: {
  formulas: [
    { label: 'Frictional Resistance', eq: 'Rf = Cf × ½ρV²S  [N]', note: 'Cf from ITTC formula: 0.075/(log Re − 2)². S=wetted surface area. Source: ITTC 1957' },
    { label: 'Froude Number',        eq: 'Fn = V / √(g × L)', note: 'V=ship speed(m/s), L=LWL(m). Wave resistance dominates at Fn>0.3' },
    { label: 'Taylor Wake Fraction', eq: 'w = (V_ship − V_advance) / V_ship', note: 'Typical single screw: w=0.20–0.35. Wake fraction causes propeller to work in slower water.' }
  ],
  videos: [{ id: 'PjJH5U3WLHQ', title: 'Ship Resistance & Propulsion Fundamentals', ch: 'Naval Architecture Tutorial' }],
  flashcards: [
    { q: 'What components make up total ship resistance and how does hull fouling affect them?', a: 'Total resistance: Rt = Rf (frictional) + Rw (wave-making) + Rv (viscous pressure) + Rair (air resistance) + Rapp (appendage). Frictional typically 70–80% of total at service speeds. Hull fouling (barnacles, algae, slime): increases surface roughness ε → raises Cf → increases Rf by 10–30% within 12 months without antifouling. Effect: same SFOC burns more fuel to maintain same speed, or speed drops at same power. Propeller fouling: reduces efficiency by 3–6%. Hull + propeller cleaning in drydock or in-water survey restores performance. Key for CII compliance. Source: ITTC Performance Guidelines; Rolls-Royce Hull Performance Study.' }
  ]
},

cl3_boilerwater: {
  formulas: [
    { label: 'Blowdown Calculation', eq: 'Blowdown% = (TDS_feed / TDS_limit) × 100%', note: 'To dilute boiler water TDS to limit. Source: Unitor/Wilhelmsen Water Treatment Guide' },
    { label: 'Alkalinity (pH)',       eq: 'Target: pH 10.5–11.5 for auxiliary boilers (7–17 bar)', note: 'Below 10.5: acid corrosion. Above 12: caustic attack/embrittlement. Source: Reed\'s Vol.2' },
    { label: 'TDS Limits',           eq: 'Auxiliary boiler: <3000–4500 ppm TDS. HHP boiler: <1000–2000 ppm', note: 'Varies by boiler pressure — higher pressure = stricter limits' }
  ],
  videos: [{ id: 'kUhGa4LKQL4', title: 'Boiler Water Treatment — Scale & Corrosion', ch: 'Marine Engineering Tutorial' }],
  flashcards: [
    { q: 'What problems does poor boiler water treatment cause and how are they prevented?', a: 'Scale (deposits of CaCO₃, Mg(OH)₂, silicates): forms insulating layer on tube hot side → tube overheating → tube failure/explosion. Prevent: sodium phosphate (Na₃PO₄) converts hardness to soft sludge, blow down to remove. Corrosion (pitting): CO₂ + H₂O → carbonic acid (feed side). Dissolved O₂ pits drum (oxygen attack). Prevent: deaeration (remove O₂), O₂ scavenger (sodium sulphite Na₂SO₃ or hydrazine N₂H₄). Carry-over (priming): high TDS → surface tension → water droplets in steam → water hammer, turbine erosion. Prevent: correct TDS by blowdown, use anti-foam chemicals. Daily water tests: pH, TDS, chloride, phosphate, hardness. Source: Reed\'s Vol.2 Ch.3; Unitor Water Treatment Manual.' }
  ]
},

cl3_steamplant: {
  formulas: [
    { label: 'Rankine Cycle Efficiency', eq: 'η_R = (h₁ − h₂) / (h₁ − h₄)  ≈ 25–40% practical', note: 'h₁=turbine inlet (superheated steam), h₂=turbine exit, h₄=pump inlet. Source: Reed\'s Vol.2' },
    { label: 'Feed Pump Work',          eq: 'W_pump = V_liq × (P_boiler − P_condenser)  [kJ/kg]', note: 'Very small compared to turbine output — liquid incompressible. Source: Rogers & Mayhew' },
    { label: 'Improving Rankine η',     eq: 'Superheat ↑ η. Reheat ↑ η. Regenerative bleeding ↑ η. Lower condenser P ↑ η', note: 'Each measure reduces heat rejected at condenser' }
  ],
  videos: [{ id: '8RMhDGjbzbc', title: 'Rankine Cycle — Complete Explanation', ch: 'The Engineering Mindset' }],
  flashcards: [
    { q: 'How does superheating steam improve the Rankine cycle efficiency?', a: 'Superheating: heating steam beyond saturation temperature at constant pressure. Effect on Rankine cycle: (1) Increases average temperature of heat addition → improves Carnot-like efficiency. (2) Increases enthalpy drop through turbine (h₁ − h₂) → more work output per kg of steam. (3) Increases dryness fraction at turbine exit — prevents blade erosion. (4) Increases boiler efficiency slightly (reduces percentage of latent heat). Typical superheat: auxiliary boilers 25–30°C. Main propulsion steam turbines: 500°C superheat at 60–100 bar. Penalty: requires superheater coils, higher maintenance, more precise water treatment. Source: Reed\'s Vol.2 Ch.4; Rogers & Mayhew Engineering Thermodynamics.' }
  ]
},

cl3_perf: {
  formulas: [
    { label: 'Thermal Efficiency', eq: 'η_th = P_brake / Q_fuel = BHP / (ṁ_fuel × CV)', note: 'CV of HFO ≈ 40,500–42,700 kJ/kg. Modern 2-stroke: η_th ≈ 50–54%. Source: MAN B&W' },
    { label: 'Heat Balance',        eq: 'Q_fuel = W_shaft + Q_cooling + Q_exhaust + Q_radiation', note: 'Typically: shaft 50%, exhaust 25%, cooling water 20%, radiation 5%. Source: Pounder\'s' },
    { label: 'Mechanical Efficiency',eq: 'η_mech = BHP / IHP  ≈ 85–92% for crosshead 2-stroke', note: 'FHP (friction) = IHP − BHP. Source: Reed\'s Vol.5' }
  ],
  videos: [{ id: 'V3jtKXL3rXg', title: 'Marine Engine Performance Analysis & SFOC', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'Explain how to conduct an engine performance analysis using indicator diagrams.', a: 'Engine performance analysis procedure: (1) Take indicator cards (power cards — all cylinders) at regular load with calibrated spring. Calculate MEP from card area and spring constant. (2) Compare MEP across all cylinders — deviation >10% indicates problem cylinder. (3) Draw cards (light spring) show fuel injection timing — check peak pressure position relative to TDC. (4) Calculate IHP = MEP × L × A × N / 60,000. Sum all cylinders. (5) Compare BHP (from shaft torsionmeter or fuel consumption) to IHP → gives mechanical efficiency. (6) Calculate SFOC = fuel rate / BHP. Compare to trials figure and MCR value. (7) Log all data, trend over voyages. Rising SFOC: turbocharger fouling, injector worn, late timing, hull fouling. Source: Pounder\'s Ch.6; MAN B&W Performance Monitoring.' }
  ]
},

cl3_governor: {
  formulas: [
    { label: 'Speed Droop', eq: 'Droop% = (N_NL − N_FL) / N_rated × 100%', note: 'Typical: 3–5% droop for stable load sharing. 0% = isochronous (exact constant speed). Source: Reed\'s Vol.5' },
    { label: 'Load Sharing', eq: 'Equal droop → equal % load sharing on parallel generators', note: 'Higher droop governor takes less load when speed falls' }
  ],
  videos: [{ id: '3gFv6nQaR1w', title: 'Engine Governor Types — Mechanical, Hydraulic, Electronic', ch: 'Marine Engineering Tutorial' }],
  flashcards: [
    { q: 'Compare mechanical, hydraulic and electronic governors for marine diesel engines.', a: 'Mechanical (centrifugal/Watt type): flyweights sense speed, directly move fuel rack. Simple, reliable, limited sensitivity. Used on small auxiliaries. Hydraulic (Woodward PG): flyweights operate hydraulic servo to move fuel rack — more sensitive, adjustable droop, load sharing. Used on medium-speed engines. Electronic (ECS/Kongsberg): speed signal from magnetic pickup → electronic controller → actuator on fuel rack/common rail. Most precise — programmable droop, load sharing, remote control integration. Required for electronically controlled engines (MAN B&W ME, Wärtsilä RT-flex). All types: governor fail-safe → max fuel position → runaway risk — governor failure detector shuts engine. Source: Woodward Governor Technical Manual; Reed\'s Vol.5.' }
  ]
},

cl3_propeller: {
  formulas: [
    { label: 'Advance Coefficient', eq: 'J = Va / (n × D)',                                     note: 'Va=advance velocity(m/s), n=rev/s, D=diameter(m). Source: Pounder\'s Ch.8' },
    { label: 'Thrust Coefficient',  eq: 'Kt = T / (ρ × n² × D⁴)',                               note: 'T=thrust(N). Kt from open-water test curves (Wageningen B-series).' },
    { label: 'Efficiency',          eq: 'η_prop = (J / 2π) × (Kt/Kq)',                           note: 'η_prop typically 60–75%. Overall η_total = η_prop × η_hull × η_shaft' },
    { label: 'Wake Fraction',       eq: 'w = (Vs − Va) / Vs  → Va = Vs(1−w)',                   note: 'Single screw ship: w ≈ 0.20–0.35. Twin screw: w ≈ 0.05–0.15' },
    { label: 'Thrust Deduction',    eq: 't = (T − R) / T  → R = T(1−t)',                         note: 'Propeller increases resistance by t. Single screw: t ≈ 0.15–0.25' }
  ],
  videos: [
    { id: '3GmTEStamcs', title: 'Marine Propeller Theory — Thrust & Efficiency', ch: 'Naval Architecture Tutorial' },
    { id: 'ZZ5LlB0MNRA', title: 'Cavitation in Marine Propellers', ch: 'Marine Insight' }
  ],
  flashcards: [
    { q: 'Explain propeller cavitation — causes, effects and prevention.', a: 'Cavitation: local pressure at propeller blade surfaces drops below vapour pressure of seawater → vapour bubbles form → collapse violently on high-pressure face. Causes: (1) High blade loading (excessive thrust per area). (2) High advance speed. (3) Poor wake inflow. (4) Damaged/worn blade edges. Effects: (1) Blade erosion — pitting of blade surface. (2) Vibration, noise. (3) Reduced thrust efficiency. (4) Reduced speed at same power. Prevention: (1) Adequate blade area (BAR — blade area ratio). (2) Operating within design J range. (3) In-water propeller inspection/polishing at class intervals. (4) Ducted propellers (Kort nozzle) for tugs — higher thrust, lower cavitation. Source: Pounder\'s Ch.8; Carlton, Marine Propellers and Propulsion.' }
  ]
},

cl3_vibration: {
  formulas: [
    { label: 'Critical Speed', eq: 'N_crit = (30/π) × √(k/m)  [RPM]', note: 'k=shaft stiffness, m=mass. Must not operate continuously at critical speed' },
    { label: 'Torsional Vibration', eq: 'Amplitude ∝ 1/(Nₙ² − N²) at resonance → infinity', note: 'Damper (viscous or rubber) limits amplitude. Source: Den Hartog Mechanical Vibration' }
  ],
  videos: [{ id: 'YUuHN8PJFKk', title: 'Torsional Vibration in Marine Diesel Engines', ch: 'Marine Engineering Tutorial' }],
  flashcards: [
    { q: 'What is barred speed range and how is it managed operationally?', a: 'Barred speed range (prohibited speed range): RPM band where engine excitation frequency coincides with natural torsional frequency of shaft/engine system → resonance → large torsional vibration amplitudes → risk of crankshaft fatigue failure. Determined by maker\'s torsional vibration calculation (TVA). Management: (1) Ship telegraph marked with barred range (e.g., 65–82 RPM — do not operate here continuously). (2) Must pass through barred range quickly during acceleration/deceleration (transit time <30 seconds typically). (3) Flexible couplings or torsional vibration dampers installed to de-tune or damp. (4) If forced to operate in barred range (manoeuvring): reduce time, monitor for unusual vibration. Source: MAN B&W Engine Operating Manual; Lloyd\'s Register TVA Rules.' }
  ]
},

cl3_altfuels: {
  formulas: [
    { label: 'LNG Calorific Value', eq: 'LHV of LNG ≈ 50,000 kJ/kg vs HFO ≈ 41,000 kJ/kg', note: 'Higher CV → lower fuel mass for same energy. LNG also lower CO₂ factor: 2.75 vs 3.114 g/g. Source: IMO GHG Study' },
    { label: 'LNG Storage Temp',    eq: 'LNG stored at −163°C, 1 bar (atmospheric) as cryogenic liquid', note: 'IGF Code mandatory for LNG-fuelled ships. Source: IMO IGF Code' }
  ],
  videos: [{ id: 'P_9XWlXJbFI', title: 'LNG & Alternative Fuels for Shipping — 2024', ch: 'Shell Marine' }],
  flashcards: [
    { q: 'Compare LNG, methanol and ammonia as marine alternative fuels.', a: 'LNG (liquefied natural gas): mainly methane, −163°C cryogenic, 15–25% lower CO₂ vs HFO, near zero SOx, significant methane slip risk, technology mature. MAN B&W ME-GI and Wärtsilä DF engines available. IGF Code applies. Methanol (CH₃OH): liquid at ambient temp (easier handling), 15% lower CO₂ than HFO, zero SOx, low NOx, toxic and flammable, lower energy density (need 2.5× volume). Maersk and Stena operating methanol ships 2023. Ammonia (NH₃): zero carbon fuel, toxic (50 ppm TLV), corrosive, low energy density, NOx risk. Pre-commercial 2024–2028 timeframe. Engine makers developing. Hydrogen: zero carbon, very low energy density, cryogenic or high pressure, not yet viable for deep-sea. Source: DNV Alternative Fuels Insight 2023.' }
  ]
},

cl3_pms: {
  formulas: [
    { label: 'Class Survey Intervals', eq: 'Annual Survey (12mo) → Intermediate (30mo) → Special/Drydock (60mo)', note: 'Continuous survey machinery (CSM): each item on 5yr rolling cycle. Source: LR/DNV Rules' }
  ],
  videos: [{ id: 'wpHSwgEAiCE', title: 'Planned Maintenance System on Ships — How It Works', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'What is a planned maintenance system (PMS) and what must it include per classification?', a: 'PMS: structured schedule of maintenance tasks at defined intervals to prevent failure. Class requirements (LR, DNV, ABS): (1) All Class-required items must be in PMS with correct intervals. (2) Critical equipment listed (steering gear, fire pumps, emergency generator, CO₂ system — higher frequency/scrutiny). (3) Job cards with: description, interval, manhours, parts, tools, references to maker\'s manual. (4) Records: running hours, dates completed, defects found, parts fitted, officer signature. (5) Outstanding jobs/deferrals recorded and approved by Master/Chief. (6) Class surveyor may inspect PMS records during annual survey. ISM Code Reg.10: maintenance procedures must be established. Computerised PMS (e.g., AMOS, ShipManager): links parts inventory, purchase orders. Source: ISM Code Reg.10; LR Rules for Ships, Classification.' }
  ]
},

cl3_ndt: {
  formulas: [
    { label: 'UT Thickness Formula', eq: 't = (v × T) / 2  [mm]', note: 'v=ultrasonic velocity in steel(~5920 m/s), T=time of echo return. Source: Reed\'s Vol.1' }
  ],
  videos: [{ id: '11pDEipWTzc', title: 'Non-Destructive Testing — UT, MPI, DPI Explained', ch: 'TWI UK' }],
  flashcards: [
    { q: 'Compare four NDT methods used in marine surveys and state when each is applied.', a: 'UT (Ultrasonic Testing): thickness gauging of hull plating/tank bulkheads, internal defects in shafts. Non-contact method, works from one side. Class requires full hull UT at Special Survey. MPI (Magnetic Particle Inspection): surface/near-surface cracks in ferromagnetic steel. Magnetic field + iron particles reveal crack outline. Used for: crankshaft fillets, rudder stocks, shaft flanges. DPI (Dye Penetrant Inspection): surface cracks in any material (steel, stainless, non-ferrous). Apply penetrant → developer → UV lamp reveals cracks. Used for: valve bodies, non-magnetic parts. Radiography (X-ray/gamma): internal weld defects, wall thickness. Requires radiation safety zone. Used for: critical welds on pressure vessels. Source: Reed\'s Vol.1 Ch.4; Lloyd\'s Register NDE Guidelines.' }
  ]
},

cl3_materials: {
  formulas: [
    { label: 'Galvanic Series (noble=protected end)', eq: 'Mg→Zn→Al→Fe→Ni→Pb→Sn→Cu→Ag→Pt→Au (anodic→cathodic)', note: 'Anodic metal corrodes (sacrificial). Cathodic = protected. Source: Reed\'s Vol.1' },
    { label: 'UTS Steel Hull Grades', eq: 'Grade A: 400–490 MPa UTS. Grade D: fine grain, −20°C impact. Grade E: −40°C impact (ice class)', note: 'IACS Steel Hull Requirements. Higher grade = better low-temp toughness' }
  ],
  videos: [{ id: 'qZfnFQ38_CQ', title: 'Marine Corrosion & Galvanic Series Explained', ch: 'Marine Engineering Tutorial' }],
  flashcards: [
    { q: 'What are the common copper alloys used in marine engineering and why?', a: 'Naval brass (60Cu–39Zn–1Sn): good corrosion resistance in seawater, used for deck fittings, valves, pipe unions. Gunmetal (88Cu–10Sn–2Zn): excellent seawater corrosion resistance, good pressure resistance, used for seawater valves, pump bodies, hull fittings. Monel (67Ni–30Cu): excellent seawater resistance, high strength, used for propeller shafts, pump impellers, marine hardware. Aluminium bronze (Cu+5–11%Al): excellent resistance to cavitation erosion, used for propellers, pump impellers, valves. Cupronickel (70Cu–30Ni): best seawater heat exchanger tube material — condenser tubes, heat exchanger tubes (low fouling, low corrosion). Source: Reed\'s Vol.1 Engineering Materials; ASM International.' }
  ]
},

cl3_bearings: {
  formulas: [
    { label: 'L10 Bearing Life',      eq: 'L₁₀ = (C/P)³ × 10⁶/(60×N)  [hours]', note: 'C=dynamic load rating(N), P=equivalent load(N), N=RPM. Source: SKF Bearing Catalogue' },
    { label: 'Diametral Clearance',   eq: 'Clearance = Bore diameter − Journal diameter', note: 'Main bearing typical: 0.25–0.55mm. Excessive → vibration, oil film breakdown' },
    { label: 'Sommerfeld Number',      eq: 'S = (μNL D)/(W/LD) = μN/(p)',               note: 'Dimensionless — predicts journal bearing performance. Low S → metal contact risk' }
  ],
  videos: [{ id: 'LmKQJo2pWXQ', title: 'Marine Engine Bearings — Types & Maintenance', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'Describe the procedure for taking main engine crankshaft deflection.', a: 'Purpose: detect misalignment of main bearings. Equipment: deflection gauge (dial indicator type). Procedure: (1) Engine stopped, slow-turn engaged. (2) Position dial gauge between crank webs at correct pin. (3) Turn engine through complete rotation, recording readings at: BDC (check zero), 45° ABDC port side, TDC (carefully), 45° ATDC starboard side, BDC again (should match initial). (4) Record ±values (web opening/closing in mm). (5) Maximum permissible deflection: typically ±0.3mm per metre of throw (maker\'s figure governs). (6) Compare with previous records — sudden change indicates shifted bearing. Causes of excessive deflection: worn main bearing, bearing cap loose, soft foot, thermal distortion. Source: MAN B&W Maintenance Manual; Lloyd\'s Register.' }
  ]
},

cl3_solas: {
  formulas: [
    { label: 'SOLAS Structure', eq: 'Chapter I: General. II-1: Construction. II-2: Fire. III: LSA. IV: Radio. V: Navigation. VI: Cargo. VII: Dangerous. VIII: Nuclear. IX: ISM. X: HSC. XI-1: Special measures. XI-2: ISPS. XII: Bulk carriers. XIV: Polar', note: 'Source: SOLAS Consolidated Edition 2020, IMO' }
  ],
  videos: [{ id: 'wV4fbtXqxGc', title: 'SOLAS Convention — All Chapters Explained', ch: 'Marine Insight' }],
  flashcards: [
    { q: 'State the key requirements of SOLAS Chapter IX (ISM Code) and XI-2 (ISPS Code).', a: 'SOLAS Ch IX (ISM Code — Res. A.741(18)): Requires Safety Management System (SMS) for company and ship. Company must hold DOC (Document of Compliance). Ship must hold SMC (Safety Management Certificate). Verify every 5 years (SMC), 5 years (DOC with annual verification). Elements: safety policy, company responsibility, DPA, master\'s authority, resources, ship operations, emergency preparedness, NC reporting, maintenance, documentation, company verification. SOLAS Ch XI-2 (ISPS Code): International Ship & Port Facility Security. Ship must have SSP (Ship Security Plan), SSO (Ship Security Officer), SSAS (ship security alert system), ISSC (International Ship Security Certificate). Three security levels: 1 (normal), 2 (heightened), 3 (exceptional threat). Source: SOLAS Consolidated 2020 IMO.' }
  ]
},

cl3_marpol: {
  formulas: [
    { label: 'MARPOL 6 Annexes', eq: 'I: Oil. II: Noxious Liquids. III: Packaged. IV: Sewage. V: Garbage. VI: Air Pollution', note: 'All annexed to MARPOL 73/78 Protocol. Source: MARPOL Consolidated 2021, IMO' }
  ],
  videos: [{ id: 'dL15A_aN5PE', title: 'MARPOL All 6 Annexes Explained Simply', ch: 'Marine Insight' }],
  flashcards: [
    { q: 'Give the key requirements of MARPOL Annex IV (Sewage) and Annex V (Garbage).', a: 'Annex IV (Sewage — in force 2003, amended 2012): Discharge only when: >12nm from land for comminuted/disinfected sewage, or >3nm with approved treatment plant (effluent standard). Special areas (Baltic Sea mandatory Annex IV PSSA): more stringent. Ship must have Sewage Treatment Plant (STP) or holding tank. ISPP Certificate required. Annex V (Garbage — in force 1988, revised MEPC.201(62) 2013): Default: NO discharge of ANY garbage at sea (all plastics). Exceptions: food waste (>12nm from land, unground ≥3nm), cargo residue (<12nm if MARPOL port reception facilities adequate). Garbage Management Plan onboard. Garbage Record Book. Source: MARPOL Consolidated 2021; IMO MEPC.' }
  ]
},

cl3_ism: {
  formulas: [
    { label: 'ISM 12 Elements', eq: '1.Policy 2.Instructions 3.DPA 4.Master Authority 5.Resources 6.Plans 7.Emergency 8.NC-Reporting 9.Maintenance 10.Documentation 11.Company Verification 12.Certification', note: 'Source: ISM Code IMO Res.A.741(18), as amended' }
  ],
  videos: [{ id: 'R6pUKmCBpZo', title: 'ISM Code — 12 Elements Explained for Marine Engineers', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'What is the role of the DPA (Designated Person Ashore) under the ISM Code?', a: 'ISM Code Reg.4: Each company must designate a person ashore (DPA) with direct access to the highest level of management. DPA responsibilities: (1) Monitor safety and pollution prevention aspects of each ship\'s operation. (2) Ensure adequate resources provided to ship. (3) Link between ship and company on SMS matters. (4) Investigate non-conformities. (5) Report to top management. (6) Verify corrective actions implemented. DPA must be a named individual (not just a title). Can be Chief Technical Officer or dedicated SMS Manager. Ship officers communicate with DPA directly for: deficiency reports, near-miss reports, NC reports, requesting resources. Source: ISM Code Reg.4; IMO MSC/Circ.1059.' }
  ]
},

cl3_stcw: {
  formulas: [
    { label: 'STCW Rest Hours', eq: 'Min: 10h/24h AND 77h/7days. Max work: 14h/24h AND 98h/7days', note: 'Rest may be split into max 2 periods; one ≥6h. Source: STCW Reg VIII/1 2010' }
  ],
  videos: [{ id: 'yWiK6m7Bk_0', title: 'STCW 2010 Manila — Key Changes for Engineers', ch: 'Marine Insight' }],
  flashcards: [
    { q: 'What are the key changes introduced by the 2010 Manila Amendment to STCW?', a: 'STCW 2010 Manila Amendment (in force 1 Jan 2012): (1) Leadership & Teamwork: mandatory training for management level officers. (2) ECDIS proficiency: mandatory for navigators (applicable to engineer officers operating ECDIS equipment). (3) Security awareness training: all seafarers. (4) Medical first aid: enhanced requirements. (5) Alcohol limit clarified: BAC ≤0.05%. (6) Rest hours: strengthened enforcement, records must be maintained and available for inspection. (7) New competency tables for some ratings. (8) High-voltage: new requirements for those working on HV systems. Source: STCW 2010 Manila Amendments, IMO.' }
  ]
},

cl3_bwm: {
  formulas: [
    { label: 'D-2 Treatment Standard', eq: '<10 viable organisms/m³ >50µm; <10/ml 10–50µm; Indicator microbes: E.coli <250/100ml', note: 'Source: BWM Convention Regulation D-2, IMO' },
    { label: 'D-1 Exchange Standard', eq: '≥95% volumetric exchange of ballast water, >200nm from land >200m deep', note: 'Alternative: 3× pump-through exchange. Source: BWM Convention Regulation D-1' }
  ],
  videos: [{ id: 'KY-4nfK3CYI', title: 'Ballast Water Management Convention Explained', ch: 'Marine Insight' }],
  flashcards: [
    { q: 'What is the Ballast Water Management Convention and what does D-2 standard require?', a: 'IMO Ballast Water Management Convention (in force September 2017): prevents transfer of invasive aquatic species via ballast water. Requirements: All ships must have BWM Plan, Ballast Water Record Book. D-1 (exchange): in ocean >200nm from land, >200m depth — exchange 95% of water volume. Phased out in favour of D-2. D-2 (treatment standard): BWTS (Ballast Water Treatment System) achieving: <10 viable organisms/m³ (≥50µm), <10 viable organisms/ml (10–50µm), E.coli <250 cfu/100ml. Most ships use UV or electrochlorination treatment. BWTS must be IMO type-approved (G8/MEPC.300(72)). BWM Certificate. Source: IMO BWM Convention; MEPC.300(72).' }
  ]
},

/* ════════════════════════════════════
   CHIEF ENGINEER — ADDITIONAL TOPICS
   ════════════════════════════════════ */

ce_duties: {
  formulas: [
    { label: 'CE Watchkeeping Exemption', eq: 'CE not required to keep regular watch if ≥1 qualified engineer always available', note: 'Source: STCW Table A-III/2; Merchant Shipping Act' }
  ],
  videos: [{ id: 'tTBQgGFVXkY', title: 'Chief Engineer Duties & Responsibilities', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'What are the statutory duties of a Chief Engineer under STCW and the Merchant Shipping Act?', a: 'STCW Table A-III/2 management level competencies: (1) Plan and ensure safe operation of all machinery systems. (2) Manage and supervise engine department. (3) Manage fuel, LO, ballast, bilge operations. (4) Control trim, stability and stress. (5) Monitor and control compliance with pollution prevention. (6) Maintain safety of propulsion and auxiliary machinery. Merchant Shipping Act (India) Section 77: CE responsible for: proper working condition of all propulsion and aux machinery, steering gear, fire equipment, pumps. CE must report to Master and owners any machinery deficiency that may affect seaworthiness. CE signs machinery log. Sole authority over engine room operations — cannot be overruled by Master on purely engineering matters. Source: STCW 2010 Table A-III/2; Merchant Shipping Act 1958 (India).' }
  ]
},

ce_budget: {
  formulas: [
    { label: 'OPEX Breakdown (typical)', eq: 'Crew 30% + Maintenance 25% + Fuel 30% + Insurance 8% + Admin 7%', note: 'Maintenance budget: $500–1500/day depending on vessel type and age. Source: Moore Stephens OPEX Report' }
  ],
  videos: [{ id: 'wpHSwgEAiCE', title: 'Ship Maintenance Budgeting — Chief Engineer Guide', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'How does a Chief Engineer prepare and manage the maintenance budget?', a: 'CE budget process: (1) Review PMS job list for coming year — identify major jobs (piston overhaul, main bearing, drydock items). (2) Obtain quotations for major spare parts from makers. (3) Review running hours and condition monitoring data — identify likely replacements. (4) Prepare annual maintenance budget: Class-required surveys, major overhauls, routine consumables (filters, gaskets, lube oil), drydock allowance. (5) Submit to technical superintendent/DPA for approval. (6) Monthly OPEX reports: actual vs budget variance with explanation. (7) Drydock budget: scope of work list (SOW) → yard quotation → negotiate → daily monitoring of yard progress vs cost. Key principle: planned maintenance is always cheaper than breakdown maintenance (avoid off-hire). Source: ISM Code Reg.10; Moore Stephens OPEX Study.' }
  ]
},

ce_risk: {
  formulas: [
    { label: 'Risk Matrix', eq: 'Risk = Likelihood × Severity  (5×5 matrix: 1-25 scale)', note: 'Low (1-4): acceptable. Medium (5-12): reduce ALARP. High (15-25): stop work. Source: ISM Code; SMS Risk Assessment Procedures' }
  ],
  videos: [{ id: 'hGIV3VHXG6w', title: 'Risk Assessment on Ships — Permit to Work System', ch: 'Marine Safety Forum' }],
  flashcards: [
    { q: 'Describe the permit-to-work (PTW) system for hot work in the engine room.', a: 'PTW Hot Work procedure: (1) Chief Engineer (or Second Engineer) issues permit — identifies work location, duration, precautions. (2) Risk assessment completed: fire risk, gas testing (LEL < 5% for hot work), adjacent spaces checked. (3) Firefighting equipment positioned: CO₂ extinguisher, fire hose, water mist. (4) Continuous gas testing during work (if near fuel systems/tanks). (5) Fire watch posted: person dedicated to watching for fires, not assisting with work. (6) Adjacent fuel/lubricating oil lines isolated/drained if possible. (7) Toolbox talk: all involved personnel briefed on hazards, emergency procedure. (8) PTW signed by worker and issuing officer. Permit valid for limited time only. After work: area inspected for smouldering, permit closed and signed off. Source: ISM Code Reg.7; Company SMS Hot Work Procedure.' }
  ]
},

ce_dpa: {
  formulas: [],
  videos: [{ id: 'R6pUKmCBpZo', title: 'DPA Role & Communication — ISM Code', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'What reports must a Chief Engineer submit to the DPA and when?', a: 'Chief Engineer → DPA reporting requirements (ISM Code Reg.8,9): (1) Non-Conformity Report: any deviation from SMS procedures — within 24 hours of discovery. (2) Near-Miss Report: incident that could have caused harm — same day. (3) Deficiency Report: machinery/equipment defect affecting safety or environment — within 24h, urgent items immediately. (4) Accident/Incident Report: injury, pollution, collision, grounding — within 24 hours, preliminary report immediately to Master then DPA. (5) Monthly OPEX/maintenance report. (6) Annual ISM internal audit findings. DPA is single point of contact for engineering matters requiring shore support: major repairs, drydock approval, spare parts not in stock. CE must document all DPA communications. Source: ISM Code Reg.4,8,9; Company SMS Manual.' }
  ]
},

ce_seemp: {
  formulas: [
    { label: 'SEEMP Content (Part III from 2023)', eq: 'Attained CII + Required CII + Rating → If D/E: corrective action plan', note: 'Source: MARPOL Annex VI Reg.26A; IMO MEPC.346(78)' }
  ],
  videos: [{ id: 'n3S-4qQFk7Y', title: 'SEEMP Part III — Carbon Intensity Corrective Actions', ch: 'Lloyd\'s Register' }],
  flashcards: [
    { q: 'What must SEEMP Part III contain and when is it required?', a: 'SEEMP Part III (mandatory from 1 Jan 2023 per MARPOL Annex VI Reg.22A for ships ≥5000 GT on international voyages): Required content: (1) Reference to ship\'s attained CII and annual required CII. (2) Three-year plan of corrective measures if rated D or E. (3) Self-evaluation and improvement plan. (4) Named responsible person for implementation. Required when: ship rated D for 3 consecutive years OR rated E for 1 year — SEEMP Part III with corrective action plan must be developed, verified by Administration/RO, and implemented. Flag state/class can recommend more specific measures. Ship receiving D/E rating cannot operate until approved corrective plan exists. Source: MARPOL Annex VI Reg.22A; IMO MEPC.346(78).' }
  ]
},

ce_sfoc: {
  formulas: [
    { label: 'SFOC Monitoring', eq: 'SFOC = fuel consumed [g/h] / brake power [kW]  [g/kWh]', note: 'Daily: ṁ_fuel from flow meter or bunker ROB difference. P from shaft power meter or engine load indicator.' },
    { label: 'Trim Optimisation', eq: 'Optimal trim = slight aft trim (1–2m). Resistance reduction 3–8% vs even keel', note: 'Hull form specific — use maker\'s trim/speed tables. Source: MAN B&W Propulsion Trend Study' }
  ],
  videos: [{ id: 'nfnAmsTePvk', title: 'SFOC Optimisation for CII — Chief Engineer Guide', ch: 'DNV Official' }],
  flashcards: [
    { q: 'What engine tuning and operational measures can a Chief Engineer use to improve SFOC?', a: '1) Fuel injection timing: advancing timing raises peak pressure and slightly improves SFOC (balance against NOx emissions — Tier III area caution). 2) VIT (variable injection timing) activation: adjusts timing automatically with load for optimum SFOC at all loads. 3) Cylinder oil dosage: reduce to minimum adequate for operating fuel sulphur content — excess doesn\'t improve, just costs money. 4) Turbocharger cleaning: weekly water washing compressor side — prevents 3–5% SFOC increase from fouling. 5) Exhaust valve condition: worn/leaking exhaust valve raises exhaust temperature, reduces compression → higher SFOC. 6) Jacket water temperature: maintain at 80–85°C (too low: thermal stress, cold corrosion; too high: detonation risk). 7) Scavenge pressure: ensure T/C delivering correct boost — fouled T/C → less air → richer mixture → poor SFOC. Source: MAN B&W Optimization Guide; Wärtsilä Performance Tuning Manual.' }
  ]
},

ce_futurefuels: {
  formulas: [
    { label: 'Well-to-Wake CO₂ (approximate)', eq: 'HFO: 3.114 g/g. LNG: 2.75 g/g. Methanol (NG): 1.375 g/g. Green NH₃: ~0 g/g. Green H₂: ~0 g/g', note: 'Source: IMO 4th GHG Study 2020; MEPC.1/Circ.795' }
  ],
  videos: [{ id: 'P_9XWlXJbFI', title: 'Alternative Fuels for Ships — 2025 State of Play', ch: 'Shell Marine' }],
  flashcards: [
    { q: 'As Chief Engineer, how do you assess suitability of a new alternative fuel for your vessel?', a: 'CE assessment framework for alternative fuel adoption: (1) Safety: flash point, toxicity, flammability range, detection requirements. LNG: cryogenic (-163°C), methane slip. NH₃: toxic at 25ppm. Methanol: toxic, low flash 11°C. (2) Storage: LNG needs cryogenic tanks (boil-off management). Methanol: standard tank with inerting. (3) Engine compatibility: does engine need modification or new injectors? Dual-fuel or mono-fuel? MAN/Wärtsilä retrofit kits available? (4) Fuel availability at intended ports — bunkering infrastructure. (5) Regulatory: IGF Code (LNG/methanol), MARPOL Annex VI compliance, flag state approval. (6) Training: crew need specific fuel handling training. (7) Economics: fuel price differential, capex for system conversion, CII benefit. (8) Classification society approval for conversion. Source: IGF Code 2016; DNV Alternative Fuels Insight 2024.' }
  ]
},

ce_failures: {
  formulas: [
    { label: 'Crankshaft Fatigue', eq: 'Alternating stress σ_a must remain below endurance limit Se', note: 'Se ≈ 0.5 × UTS for steel. Stress concentration at fillet radius critical. Source: Shigley\'s Mechanical Engineering Design' }
  ],
  videos: [{ id: 'pO86VU9CXJQ', title: 'Major Engine Failures — Root Cause Analysis', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'What causes crankshaft fracture in a marine diesel engine and how is it prevented?', a: 'Causes: (1) Misalignment — excessive bearing wear → unsupported journal → bending stress. (2) Fatigue — cyclic torsional/bending stresses exceed endurance limit at stress-concentration point (fillet radius, oil hole). (3) Torsional vibration — operating in critical speed range without damper. (4) Corrosion fatigue — damaged protective oil film → corrosion pits → stress concentration → crack initiation. (5) Manufacturing defect — inclusion in steel → crack nucleus. Prevention: (1) Regular deflection measurements — detect misalignment early. (2) Maintain bearing clearances within limits. (3) Respect barred speed range. (4) Maintain lube oil quality and pressure. (5) Avoid shock loading (sudden acceleration, engine runaway). (6) Regular NDT of fillet radii at major overhauls. Source: MAIB Investigation Reports; Lloyd\'s Register Casualty Archive.' }
  ]
},

ce_overhaul: {
  formulas: [
    { label: 'Piston Overhaul Interval', eq: 'MAN B&W S-type: piston overhaul typically 12,000–24,000 running hours', note: 'Depends on cylinder oil condition, liner wear rate, ring condition. Source: MAN B&W Maintenance Manual' },
    { label: 'Liner Wear Limit',         eq: 'Maximum bore wear: +0.6–0.8% of original bore diameter (maker-specific)', note: 'Measure 3 planes × 3 heights. Source: MAN B&W / Wärtsilä Maintenance Manual' }
  ],
  videos: [{ id: 'TC2FY7Bw3Ag', title: 'Marine Engine Piston & Liner Overhaul Procedure', ch: 'Marine Engineering Tutorial' }],
  flashcards: [
    { q: 'Describe the procedure for a piston top overhaul on a large 2-stroke marine diesel.', a: 'Pre-overhaul: (1) Stop engine, engage turning gear, lock indicator cocks open. (2) Cool engine — minimum 12 hours after shutdown for safe entry. (3) Obtain enclosed space entry permit (crankcase entry). (4) Disconnect high-pressure fuel pipe to cylinder. (5) Remove exhaust valve actuator and exhaust valve. (6) Attach lifting tackle to piston rod gland and piston. (7) Lower piston from above using crane/sheave with piston rod guide. (8) Place piston on overhaul trolley. (9) Inspect: piston crown (burning, cracks), piston rings (wear, ring grooves), piston rod (ovality, alignment). (10) Measure ring groove width, groove depth, piston ring axial clearance. (11) Replace rings if worn, renew piston crown if cracked. (12) Measure liner bore (at three heights, two planes). (13) Reassemble with new O-rings, sealing rings, guide strips. (14) Box up, function test. Source: MAN B&W Maintenance Manual Chapter 2.' }
  ]
},

ce_casualty: {
  formulas: [
    { label: 'Blackout Recovery Time', eq: 'Emergency gen: 45 sec auto-start. Main gen on standby: 3–5 min to restore. Full power: 15–30 min', note: 'Source: SOLAS II-1 Reg.43; Company ERP' }
  ],
  videos: [{ id: 'GWMmORDElCU', title: 'Blackout & Dead Ship Recovery — Chief Engineer Procedure', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'Describe the blackout recovery procedure in correct sequence.', a: 'Blackout recovery (complete loss of power): (1) Emergency generator should auto-start within 45 seconds — check it has started (essential services restored: nav lights, GMDSS, steering). (2) Chief Engineer to engine control room immediately. (3) Find cause of blackout: overload trip, earth fault, emergency stop activated, prime mover failure? (4) Reset tripped generator circuit breaker ONLY after identifying and clearing fault. (5) Start standby generator, bring on load carefully. (6) Start main generators one by one — do NOT parallel all at once. (7) Restore ship\'s service in priority order: steering → propulsion → navigation → hotel. (8) Return control to bridge — report status and estimated time to full power. (9) Investigate cause fully — record in log, report to DPA if ISM reportable. (10) If dead ship (no power at all): use emergency steering, broadcast SECURITE, deploy anchor if near coastal waters. Source: SOLAS II-1; Company Emergency Response Plan.' }
  ]
},

ce_psc: {
  formulas: [
    { label: 'PSC Deficiency Categories', eq: 'Cat 1: Minor deficiency. Cat 2: Major — rectify before departure. Cat 3: Detention — cannot sail', note: 'Source: Paris MOU, Tokyo MOU Inspection Procedures' }
  ],
  videos: [{ id: 'IJOYlv8oO_M', title: 'Port State Control Inspection — What Inspectors Look For', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'What does a PSC inspector examine in the engine room during an inspection?', a: 'PSC engine room inspection focus areas: (1) OWS/OCM: functional test (if possible), ORB entries correct and complete, no bypass. (2) Bilge system: MARPOL compliance, bilge high level alarm. (3) Emergency generator: start test, supply list verification, last test date in log. (4) Fire detection and fixed firefighting: CO₂ system certificate, maintenance records, cylinder weights. (5) Watertight integrity: bilge wells clean and monitored. (6) Oil record book: complete, correct, Master signed. (7) IOPP Certificate validity. (8) Garbage management plan and garbage record book. (9) Sewage treatment plant operational. (10) Machinery log: regular and plausible entries. (11) PTW system evidence. (12) Crew certification: engineer\'s COC endorsement valid for flag state. Grounds for detention: non-functioning fire pumps, inoperable emergency generator, deliberate MARPOL violations, critical safety equipment defective. Source: Paris MOU CIC Inspection Procedures; USCG PSC Policy.' }
  ]
},

ce_law: {
  formulas: [],
  videos: [{ id: 'wV4fbtXqxGc', title: 'Maritime Law for Ship Officers — Key Concepts', ch: 'Marine Insight' }],
  flashcards: [
    { q: 'What is the role of the P&I Club and what does it cover for a Chief Engineer?', a: 'P&I Club (Protection & Indemnity Association — mutual insurance): covers third-party liabilities not covered by hull and machinery (H&M) insurance. Covers: (1) Cargo liability — damage to or shortage of cargo. (2) Crew illness, injury and repatriation costs. (3) Pollution liability — MARPOL violations, oil spills, SOPEP implementation. (4) Collision with another vessel (excess over H&M policy). (5) Wreck removal costs. (6) Legal costs in maritime disputes. CE relevance: P&I Club will defend CE if personally named in MARPOL prosecution — BUT only if CE acted in good faith. Deliberate MARPOL bypass → CE personally liable, P&I may not cover. CE must ensure ORB entries accurate, OWS operational, no magic pipe. Major P&I clubs: Gard, Skuld, UK Club, West of England. Source: UK P&I Club Loss Prevention Guide.' }
  ]
},

ce_charter: {
  formulas: [],
  videos: [],
  flashcards: [
    { q: 'What is an off-hire clause and how does it relate to the Chief Engineer\'s responsibilities?', a: 'Off-hire clause (time charter): ship ceases to earn hire when she is unable to perform the agreed service due to: deficiency of men/stores, breakdown of machinery, damage to hull, default of officers/crew. CE responsibility: any machinery breakdown causing vessel to go off-hire results in financial loss to shipowner — charterer does not pay hire for the off-hire period. CE must: (1) Ensure PMS is followed rigorously to prevent breakdown off-hire. (2) Report any machinery defect promptly so repair can be planned in port (not at sea). (3) Maintain accurate logbook entries of machinery condition and repairs. (4) Issue Sea Protest if breakdown caused by external factors (fuel quality, heavy weather). CE\'s diligence directly impacts commercial performance — poor maintenance → off-hire → charter dispute → possible dismissal and ISM non-conformity. Source: Scrutton on Charterparties; Voyage Management P&I guidance.' }
  ]
},

ce_oral_prep: {
  formulas: [],
  videos: [{ id: 'pO86VU9CXJQ', title: 'Chief Engineer MMD Oral — Common Questions', ch: 'MarineGyaan' }],
  flashcards: [
    { q: 'MMD Oral: "Your main engine loses power suddenly while maneuvering in a crowded port. What do you do?"', a: 'Model answer for MMD Chief Engineer oral: (1) Immediately inform bridge (telegraph responds as possible). (2) Check bridge control: switch to engine room control, investigate cause. (3) If temporary: restart — check fuel supply, governor, air start. (4) Inform Master — recommend dropping anchor if safe water depth allows. (5) Sound horn signals (1 long blast = you are NOT under command). (6) Make entries in engine room log: time, position, cause, actions. (7) Deploy tug assistance if in close proximity to hazard. (8) ISM: if incident has commercial/safety significance → write incident report → DPA. (9) After recovery: thorough root cause analysis — prevent recurrence. Examiner expects: calm systematic response, communication first, safety before diagnosis, documentation awareness. Source: MMD Oral Examination Experience Reports; ISM Code Reg.8.' },
    { q: 'MMD Oral: "How do you prepare your engine room for a Port State Control inspection?"', a: 'CE PSC Preparation checklist: (1) ORB Part I: complete, correct format, every entry signed, Master countersigned — no gaps or irregular patterns. (2) IOPP Certificate valid, in date. (3) OWS: operational, OCM calibrated and sealed, bypass valves locked open — no bypasses. (4) Emergency generator: last test date within 7 days, run test. Auto-start function verified. (5) Fire detection tested, fixed system CO₂ cylinder weights correct, last inspection certificate. (6) Bilge wells clean, high-level alarms functioning. (7) ORB II (sewage): if fitted. Garbage record book. (8) Crew COC endorsements valid for flag. (9) All certificates on board (ISM DOC, SMC, IOPP, class certificates). (10) Engine room clean and tidy — implies good working culture. (11) PTW register: evidence of use. (12) Conduct internal walkthrough before inspector arrives. Source: Paris MOU; USCG PSC Targeting Policy.' }
  ]
}

}); /* End Object.assign */


/* ═══ CYCLE 2: ADDITIONAL ANIMATED DIAGRAMS ═══ */

Object.assign(DIAGRAMS, {

/* ── 4-STROKE ENGINE VALVE TIMING DIAGRAM ── */
four_stroke_valves: `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <defs>
    <marker id="v1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#3d6a8a"/>
    </marker>
  </defs>
  <style>
    .piston4 { animation: piston4move 2.4s ease-in-out infinite; }
    @keyframes piston4move {
      0%,100% { transform:translateY(0); }
      25%     { transform:translateY(52px); }
      50%     { transform:translateY(0); }
      75%     { transform:translateY(52px); }
    }
    .ivalve { animation: ivalveAnim 2.4s ease-in-out infinite; }
    @keyframes ivalveAnim {
      0%,10%,60%,100% { transform:translateY(0); }
      15%,55%         { transform:translateY(5px); }
    }
    .evalve { animation: evalveAnim 2.4s ease-in-out infinite; }
    @keyframes evalveAnim {
      0%,50%,100%     { transform:translateY(0); }
      60%,95%         { transform:translateY(5px); }
    }
    .spark { animation: sparkAnim 2.4s ease-in-out infinite; }
    @keyframes sparkAnim {
      0%,48%,52%,100% { opacity:0; }
      49%,51%         { opacity:1; }
    }
    .stroke-label { animation: strokeLabel 2.4s ease-in-out infinite; }
  </style>
  <!-- Cylinder walls -->
  <rect x="95" y="25" width="8" height="120" fill="#1e3a5f"/>
  <rect x="177" y="25" width="8" height="120" fill="#1e3a5f"/>
  <!-- Cylinder head -->
  <rect x="95" y="16" width="90" height="10" fill="#1e3a5f" stroke="#2d5a8f"/>
  <!-- Inlet valve -->
  <g class="ivalve">
    <rect x="108" y="22" width="14" height="5" rx="2" fill="#22c55e"/>
    <line x1="115" y1="15" x2="115" y2="22" stroke="#22c55e" stroke-width="1.5"/>
  </g>
  <text x="98" y="13" fill="#22c55e" font-size="5.5" font-family="monospace">IN</text>
  <!-- Exhaust valve -->
  <g class="evalve">
    <rect x="158" y="22" width="14" height="5" rx="2" fill="#ef4444"/>
    <line x1="165" y1="15" x2="165" y2="22" stroke="#ef4444" stroke-width="1.5"/>
  </g>
  <text x="162" y="13" fill="#ef4444" font-size="5.5" font-family="monospace">EX</text>
  <!-- Combustion flash -->
  <ellipse class="spark" cx="140" cy="38" rx="16" ry="7" fill="#f59e0b" opacity="0"/>
  <!-- Piston -->
  <g class="piston4">
    <rect x="96" y="65" width="88" height="16" rx="1" fill="#1e40af" stroke="#60a5fa"/>
    <rect x="96" y="67" width="88" height="2" fill="#93c5fd"/>
    <rect x="96" y="72" width="88" height="2" fill="#93c5fd"/>
    <rect x="96" y="77" width="88" height="2" fill="#93c5fd"/>
    <!-- Con rod -->
    <rect x="136" y="81" width="8" height="25" fill="#1e3a5f" stroke="#3b82f6"/>
  </g>
  <!-- Crankshaft -->
  <circle cx="140" cy="155" r="14" fill="none" stroke="#1e3a5f" stroke-width="2.5"/>
  <circle cx="140" cy="155" r="4" fill="#3b82f6"/>
  <!-- Stroke labels -->
  <text x="103" y="150" fill="#22c55e" font-size="5.5" font-family="monospace">INDUCTION</text>
  <text x="108" y="158" fill="#f59e0b" font-size="5.5" font-family="monospace">COMPRESSION</text>
  <text x="110" y="166" fill="#ef4444" font-size="5.5" font-family="monospace">POWER / EXHAUST</text>
  <!-- Timing arc diagram (top right) -->
  <circle cx="242" cy="65" r="28" fill="none" stroke="#1e3050" stroke-width="1"/>
  <path d="M242,65 L242,37" stroke="#22c55e" stroke-width="1.5"/>
  <path d="M242,65 L214,65" stroke="#ef4444" stroke-width="1.5"/>
  <text x="228" y="35" fill="#22c55e" font-size="5" font-family="monospace">TDC</text>
  <text x="196" y="67" fill="#ef4444" font-size="5" font-family="monospace">BDC</text>
  <text x="228" y="100" fill="#3d6a8a" font-size="5.5" font-family="monospace">Timing</text>
</svg>`,

/* ── STARTING AIR SYSTEM ── */
starting_air: `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <defs>
    <marker id="sa" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#60a5fa"/>
    </marker>
  </defs>
  <style>
    .air-flow { animation: airFlow 2s linear infinite; stroke-dasharray:8,6; }
    @keyframes airFlow { to { stroke-dashoffset:-28; } }
    .compressor-spin { animation: compSpin 1s linear infinite; transform-origin: 46px 70px; }
    @keyframes compSpin { to { transform:rotate(360deg); } }
    .pressure-fill { animation: pressFill 3s ease-in-out infinite; }
    @keyframes pressFill { 0%,100%{height:0;y:130;} 50%{height:50;y:80;} }
  </style>
  <!-- Compressor box -->
  <rect x="20" y="50" width="52" height="40" rx="5" fill="#0e1d35" stroke="#38bdf8" stroke-width="1.5"/>
  <text x="25" y="66" fill="#38bdf8" font-size="6.5" font-family="monospace" font-weight="bold">2-STAGE</text>
  <text x="25" y="78" fill="#38bdf8" font-size="6.5" font-family="monospace">COMPRESSOR</text>
  <text x="28" y="88" fill="#7aaccf" font-size="5.5" font-family="monospace">25-30 bar</text>
  <!-- Intercooler -->
  <rect x="20" y="100" width="52" height="22" rx="3" fill="#0e1d35" stroke="#f59e0b" stroke-width="1.2"/>
  <text x="22" y="112" fill="#f59e0b" font-size="5.5" font-family="monospace">INTERCOOLER</text>
  <text x="22" y="119" fill="#7aaccf" font-size="5.5" font-family="monospace">+ moisture drain</text>
  <!-- Air receiver bottles -->
  <rect x="110" y="40" width="34" height="90" rx="8" fill="#0e1d35" stroke="#60a5fa" stroke-width="1.5"/>
  <rect x="112" y="42" width="30" height="86" rx="6" fill="#091929"/>
  <rect class="pressure-fill" x="112" y="80" width="30" height="50" rx="3" fill="rgba(96,165,250,0.15)"/>
  <text x="116" y="60" fill="#60a5fa" font-size="6" font-family="monospace">AIR</text>
  <text x="113" y="70" fill="#60a5fa" font-size="6" font-family="monospace">RECEIVER</text>
  <text x="116" y="80" fill="#60a5fa" font-size="6" font-family="monospace">25-30</text>
  <text x="118" y="88" fill="#60a5fa" font-size="5.5" font-family="monospace">bar</text>
  <!-- Safety valve on receiver -->
  <rect x="126" y="36" width="10" height="6" rx="2" fill="#ef4444"/>
  <text x="114" y="35" fill="#ef4444" font-size="5" font-family="monospace">SV</text>
  <!-- Fusible plug -->
  <circle cx="144" cy="90" r="4" fill="#f59e0b" stroke="#b45309"/>
  <text x="150" y="92" fill="#f59e0b" font-size="5" font-family="monospace">Fusible</text>
  <text x="150" y="98" fill="#f59e0b" font-size="5" font-family="monospace">121°C</text>
  <!-- Engine -->
  <rect x="195" y="50" width="65" height="70" rx="5" fill="#0e1d35" stroke="#22c55e" stroke-width="1.5"/>
  <text x="205" y="72" fill="#22c55e" font-size="7" font-family="monospace" font-weight="bold">MAIN</text>
  <text x="203" y="83" fill="#22c55e" font-size="7" font-family="monospace">ENGINE</text>
  <text x="202" y="96" fill="#7aaccf" font-size="5.5" font-family="monospace">Start air valve</text>
  <text x="202" y="104" fill="#7aaccf" font-size="5.5" font-family="monospace">opens @ TDC-15°</text>
  <!-- Flow lines -->
  <line x1="72" y1="70" x2="110" y2="70" stroke="#60a5fa" stroke-width="1.5" class="air-flow" marker-end="url(#sa)"/>
  <line x1="144" y1="85" x2="195" y2="85" stroke="#60a5fa" stroke-width="1.5" class="air-flow" marker-end="url(#sa)"/>
  <!-- NRV symbols -->
  <polygon points="82,66 90,70 82,74" fill="#60a5fa"/>
  <text x="78" y="63" fill="#7aaccf" font-size="5" font-family="monospace">NRV</text>
  <polygon points="163,81 171,85 163,89" fill="#60a5fa"/>
  <text x="160" y="78" fill="#7aaccf" font-size="5" font-family="monospace">NRV</text>
  <text x="60" y="172" fill="#3d6a8a" font-size="5.5" font-family="monospace">Starting Air: 25-30 bar | Safety valve | Fusible plug 121°C | NRV</text>
</svg>`,

/* ── BOILER WATER DRUM ANIMATION ── */
boiler_diagram: `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <defs>
    <marker id="bd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#ef4444"/>
    </marker>
    <marker id="bs" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#60a5fa"/>
    </marker>
  </defs>
  <style>
    .steam-rise { animation: steamRise 1.8s ease-in-out infinite; }
    @keyframes steamRise {
      0%   { transform:translateY(0); opacity:0.9; }
      100% { transform:translateY(-18px); opacity:0; }
    }
    .flame { animation: flameAnim 0.6s ease-in-out infinite alternate; }
    @keyframes flameAnim {
      0%   { transform:scaleY(1) translateX(0); }
      100% { transform:scaleY(1.2) translateX(2px); }
    }
    .water-level { animation: waterLevel 3s ease-in-out infinite; }
    @keyframes waterLevel { 0%,100%{y:105;} 50%{y:100;} }
  </style>
  <!-- Furnace / Fire box -->
  <rect x="20" y="100" width="80" height="60" rx="4" fill="#15030a" stroke="#b45309" stroke-width="1.5"/>
  <text x="38" y="172" fill="#b45309" font-size="5.5" font-family="monospace">FURNACE</text>
  <!-- Flames -->
  <g class="flame">
    <ellipse cx="38" cy="145" rx="8" ry="14" fill="#dc2626" opacity="0.8"/>
    <ellipse cx="55" cy="140" rx="7" ry="18" fill="#f97316" opacity="0.9"/>
    <ellipse cx="72" cy="145" rx="6" ry="12" fill="#dc2626" opacity="0.8"/>
    <ellipse cx="55" cy="138" rx="4" ry="10" fill="#fbbf24" opacity="0.9"/>
  </g>
  <!-- Smoke tubes / flues going right -->
  <rect x="100" y="110" width="80" height="10" fill="#1e3a5f" stroke="#2d5a8f"/>
  <rect x="100" y="125" width="80" height="10" fill="#1e3a5f" stroke="#2d5a8f"/>
  <rect x="100" y="140" width="80" height="10" fill="#1e3a5f" stroke="#2d5a8f"/>
  <text x="103" y="163" fill="#3d6a8a" font-size="5.5" font-family="monospace">Fire tubes (smoke side)</text>
  <!-- Boiler shell (water side) -->
  <rect x="100" y="60" width="80" height="100" rx="5" fill="#091929" stroke="#2d5a8f" stroke-width="1.5"/>
  <!-- Water level animated -->
  <rect class="water-level" x="101" y="105" width="78" height="54" rx="3" fill="rgba(14,165,233,0.15)"/>
  <line x1="101" y1="103" x2="179" y2="103" stroke="#38bdf8" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="183" y="106" fill="#38bdf8" font-size="5" font-family="monospace">WL</text>
  <!-- Steam space -->
  <text x="128" y="88" fill="#a78bfa" font-size="6.5" font-family="monospace">STEAM</text>
  <!-- Steam rising particles -->
  <circle class="steam-rise" cx="125" cy="98" r="2.5" fill="#a78bfa" opacity="0.7"/>
  <circle class="steam-rise" cx="140" cy="95" r="2" fill="#a78bfa" opacity="0.6" style="animation-delay:0.4s"/>
  <circle class="steam-rise" cx="155" cy="100" r="3" fill="#a78bfa" opacity="0.7" style="animation-delay:0.8s"/>
  <circle class="steam-rise" cx="168" cy="96" r="2" fill="#a78bfa" opacity="0.5" style="animation-delay:1.2s"/>
  <!-- Steam outlet pipe -->
  <rect x="130" y="52" width="20" height="10" fill="#0e1d35" stroke="#a78bfa" stroke-width="1.2"/>
  <line x1="140" y1="52" x2="140" y2="38" stroke="#a78bfa" stroke-width="2" marker-end="url(#bs)"/>
  <text x="148" y="42" fill="#a78bfa" font-size="5.5" font-family="monospace">Steam out</text>
  <!-- Safety valves -->
  <rect x="108" y="56" width="10" height="6" rx="2" fill="#ef4444"/>
  <text x="103" y="55" fill="#ef4444" font-size="5" font-family="monospace">SV×2</text>
  <!-- Feed water inlet -->
  <line x1="100" y1="130" x2="80" y2="130" stroke="#22c55e" stroke-width="2" marker-end="url(#bs)"/>
  <text x="30" y="128" fill="#22c55e" font-size="5.5" font-family="monospace">Feed H₂O</text>
  <!-- Blowdown -->
  <line x1="140" y1="160" x2="140" y2="175" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#bd)"/>
  <text x="148" y="173" fill="#f59e0b" font-size="5.5" font-family="monospace">Blowdown</text>
  <!-- Labels -->
  <text x="5" y="12" fill="#3d6a8a" font-size="6" font-family="monospace">SCOTCH MARINE FIRE-TUBE BOILER (7-17 bar)</text>
</svg>`,

/* ── GENERATOR PARALLEL OPERATION ── */
generator_parallel: `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <defs>
    <marker id="gp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#f59e0b"/>
    </marker>
  </defs>
  <style>
    .wave1 { animation: wave1Anim 1.2s ease-in-out infinite; }
    .wave2 { animation: wave2Anim 1.2s ease-in-out infinite 0.15s; }
    @keyframes wave1Anim { 0%,100%{transform:scaleY(1);opacity:0.7;} 50%{transform:scaleY(-1);opacity:1;} }
    @keyframes wave2Anim { 0%,100%{transform:scaleY(-1);opacity:1;} 50%{transform:scaleY(1);opacity:0.7;} }
    .sync-spin { animation: syncSpin 2s linear infinite; transform-origin: 200px 90px; }
    @keyframes syncSpin { to { transform:rotate(360deg); } }
    .bus-flash { animation: busFlash 0.5s ease-in-out infinite; }
    @keyframes busFlash { 0%,100%{opacity:0.4;} 50%{opacity:1;} }
  </style>
  <!-- Gen 1 -->
  <rect x="15" y="40" width="70" height="55" rx="6" fill="#0e1d35" stroke="#38bdf8" stroke-width="1.5"/>
  <circle cx="50" cy="60" r="14" fill="#091929" stroke="#38bdf8" stroke-width="1"/>
  <text x="43" y="57" fill="#38bdf8" font-size="6" font-family="monospace">G1</text>
  <text x="36" y="66" fill="#7aaccf" font-size="5.5" font-family="monospace">500 kW</text>
  <text x="22" y="105" fill="#22c55e" font-size="5.5" font-family="monospace">450V 60Hz</text>
  <!-- Gen 2 -->
  <rect x="195" y="40" width="70" height="55" rx="6" fill="#0e1d35" stroke="#38bdf8" stroke-width="1.5"/>
  <circle cx="230" cy="60" r="14" fill="#091929" stroke="#38bdf8" stroke-width="1"/>
  <text x="223" y="57" fill="#38bdf8" font-size="6" font-family="monospace">G2</text>
  <text x="216" y="66" fill="#7aaccf" font-size="5.5" font-family="monospace">500 kW</text>
  <text x="202" y="105" fill="#22c55e" font-size="5.5" font-family="monospace">450V 60Hz</text>
  <!-- Main busbar -->
  <rect x="85" y="72" width="110" height="8" rx="2" fill="#f59e0b" class="bus-flash"/>
  <text x="113" y="69" fill="#f59e0b" font-size="6" font-family="monospace">MAIN BUSBAR</text>
  <!-- Breakers -->
  <rect x="78" y="68" width="10" height="16" rx="2" fill="#22c55e" stroke="#16a34a"/>
  <text x="63" y="82" fill="#22c55e" font-size="5" font-family="monospace">ACB</text>
  <rect x="192" y="68" width="10" height="16" rx="2" fill="#22c55e" stroke="#16a34a"/>
  <text x="205" y="82" fill="#22c55e" font-size="5" font-family="monospace">ACB</text>
  <!-- Synchroscope -->
  <circle cx="140" cy="130" r="22" fill="#091929" stroke="#f59e0b" stroke-width="1.5"/>
  <g class="sync-spin">
    <line x1="140" y1="130" x2="140" y2="110" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
  </g>
  <text x="118" y="164" fill="#f59e0b" font-size="6" font-family="monospace">SYNCHROSCOPE</text>
  <text x="123" y="172" fill="#3d6a8a" font-size="5.5" font-family="monospace">→ slow clockwise = OK to close</text>
  <!-- Conditions labels -->
  <text x="8" y="15" fill="#3d6a8a" font-size="5.5" font-family="monospace">PARALLEL CONDITIONS: Same V | Same f | Same phase seq | Phase angle match</text>
  <!-- Load arrows -->
  <line x1="140" y1="80" x2="140" y2="108" stroke="#f59e0b" stroke-width="1" marker-end="url(#gp)"/>
  <text x="144" y="97" fill="#f59e0b" font-size="5.5" font-family="monospace">Load</text>
</svg>`,

/* ── PROPELLER THEORY ── */
propeller_theory: `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <defs>
    <marker id="pt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#38bdf8"/>
    </marker>
  </defs>
  <style>
    .prop-spin { animation: propSpin 2s linear infinite; transform-origin: 100px 90px; }
    @keyframes propSpin { to { transform:rotate(360deg); } }
    .thrust-arrow { animation: thrustPulse 1.5s ease-in-out infinite; }
    @keyframes thrustPulse { 0%,100%{opacity:0.6;} 50%{opacity:1;} }
    .wake-flow { animation: wakeFlow 2s linear infinite; stroke-dasharray:6,5; }
    @keyframes wakeFlow { to { stroke-dashoffset:-22; } }
  </style>
  <!-- Ship hull profile -->
  <path d="M20,75 Q60,60 140,65 L165,72 L155,85 Q100,92 20,88 Z" fill="#1e3a5f" stroke="#2d5a8f" stroke-width="1.2"/>
  <text x="60" y="79" fill="#60a5fa" font-size="6" font-family="monospace">SHIP HULL</text>
  <!-- Propeller shaft -->
  <line x1="140" y1="90" x2="100" y2="90" stroke="#3b82f6" stroke-width="3"/>
  <!-- Propeller blades (spinning) -->
  <g class="prop-spin">
    <ellipse cx="100" cy="90" rx="6" ry="30" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5" transform="rotate(0,100,90)"/>
    <ellipse cx="100" cy="90" rx="6" ry="30" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5" transform="rotate(60,100,90)"/>
    <ellipse cx="100" cy="90" rx="6" ry="30" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5" transform="rotate(120,100,90)"/>
    <ellipse cx="100" cy="90" rx="6" ry="30" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5" transform="rotate(180,100,90)"/>
    <circle cx="100" cy="90" r="7" fill="#1e3a5f" stroke="#60a5fa"/>
  </g>
  <!-- Thrust arrows -->
  <g class="thrust-arrow">
    <line x1="60" y1="78" x2="20" y2="78" stroke="#22c55e" stroke-width="2" marker-end="url(#pt)"/>
    <line x1="60" y1="90" x2="20" y2="90" stroke="#22c55e" stroke-width="2" marker-end="url(#pt)"/>
    <line x1="60" y1="102" x2="20" y2="102" stroke="#22c55e" stroke-width="2" marker-end="url(#pt)"/>
  </g>
  <text x="22" y="72" fill="#22c55e" font-size="6" font-family="monospace">THRUST (T)</text>
  <!-- Wake flow lines going into propeller from behind -->
  <line x1="165" y1="78" x2="115" y2="78" stroke="#38bdf8" class="wake-flow" marker-end="url(#pt)"/>
  <line x1="165" y1="90" x2="115" y2="90" stroke="#38bdf8" class="wake-flow" marker-end="url(#pt)"/>
  <line x1="165" y1="102" x2="115" y2="102" stroke="#38bdf8" class="wake-flow" marker-end="url(#pt)"/>
  <text x="168" y="88" fill="#38bdf8" font-size="5.5" font-family="monospace">Va (advance</text>
  <text x="168" y="95" fill="#38bdf8" font-size="5.5" font-family="monospace">velocity)</text>
  <!-- Formulas overlay -->
  <rect x="168" y="118" width="105" height="56" rx="5" fill="#06111f" stroke="#1e3050"/>
  <text x="172" y="130" fill="#f59e0b" font-size="6" font-family="monospace">J = Va / (n×D)</text>
  <text x="172" y="141" fill="#60a5fa" font-size="6" font-family="monospace">Kt = T / (ρn²D⁴)</text>
  <text x="172" y="152" fill="#22c55e" font-size="6" font-family="monospace">w = (Vs-Va)/Vs</text>
  <text x="172" y="163" fill="#a78bfa" font-size="6" font-family="monospace">η_prop ≈ 60-75%</text>
  <!-- Labels -->
  <text x="8" y="12" fill="#3d6a8a" font-size="5.5" font-family="monospace">PROPELLER THEORY — Wageningen B-Series (Source: Pounder's Ch.8)</text>
  <!-- D label -->
  <line x1="100" y1="55" x2="100" y2="125" stroke="#f59e0b" stroke-width="0.8" stroke-dasharray="3,3"/>
  <text x="103" y="52" fill="#f59e0b" font-size="5.5" font-family="monospace">D</text>
</svg>`,

/* ── OILY WATER SEPARATOR ── */
ows_diagram: `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <defs>
    <marker id="ow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#3d6a8a"/>
    </marker>
  </defs>
  <style>
    .oil-float { animation: oilFloat 3s ease-in-out infinite; }
    @keyframes oilFloat {
      0%,100% { transform:translateY(0); }
      50%     { transform:translateY(-6px); }
    }
    .water-drop { animation: waterDrop 2s linear infinite; }
    @keyframes waterDrop {
      0%   { transform:translateY(-10px); opacity:0; }
      20%  { opacity:1; }
      100% { transform:translateY(60px); opacity:0.3; }
    }
    .ocm-pulse { animation: ocmPulse 1.5s ease-in-out infinite; }
    @keyframes ocmPulse { 0%,100%{fill:#22c55e;} 50%{fill:#16a34a;} }
  </style>
  <!-- Bilge inlet -->
  <line x1="10" y1="90" x2="40" y2="90" stroke="#8b5e3c" stroke-width="3" marker-end="url(#ow)"/>
  <text x="5" y="83" fill="#8b5e3c" font-size="5.5" font-family="monospace">Bilge</text>
  <text x="5" y="90" fill="#8b5e3c" font-size="5.5" font-family="monospace">water</text>
  <!-- Stage 1: Gravity separation chamber -->
  <rect x="40" y="55" width="70" height="90" rx="5" fill="#091929" stroke="#2d5a8f" stroke-width="1.5"/>
  <text x="50" y="70" fill="#3d6a8a" font-size="5.5" font-family="monospace">STAGE 1</text>
  <text x="44" y="78" fill="#3d6a8a" font-size="5.5" font-family="monospace">Gravity Sep.</text>
  <!-- Water layer -->
  <rect x="41" y="110" width="68" height="33" rx="3" fill="rgba(14,165,233,0.15)"/>
  <!-- Oil layer floating -->
  <g class="oil-float">
    <rect x="41" y="95" width="68" height="16" rx="2" fill="rgba(139,94,60,0.4)" stroke="#8b5e3c" stroke-width="0.5"/>
    <text x="55" y="106" fill="#8b5e3c" font-size="5.5" font-family="monospace">Oil layer</text>
  </g>
  <!-- Water drops -->
  <circle class="water-drop" cx="75" cy="85" r="3" fill="#38bdf8" style="animation-delay:0s"/>
  <circle class="water-drop" cx="90" cy="80" r="2" fill="#38bdf8" style="animation-delay:0.7s"/>
  <!-- Stage 2: Coalescing filter -->
  <rect x="130" y="55" width="60" height="90" rx="5" fill="#091929" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="137" y="70" fill="#f59e0b" font-size="5.5" font-family="monospace">STAGE 2</text>
  <text x="133" y="78" fill="#f59e0b" font-size="5.5" font-family="monospace">Coalescer</text>
  <!-- Coalescing plates schematic -->
  <line x1="142" y1="85" x2="142" y2="138" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2,3"/>
  <line x1="152" y1="85" x2="152" y2="138" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2,3"/>
  <line x1="162" y1="85" x2="162" y2="138" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2,3"/>
  <line x1="172" y1="85" x2="172" y2="138" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2,3"/>
  <text x="133" y="148" fill="#7aaccf" font-size="5" font-family="monospace">plates merge oil drops</text>
  <!-- Oil sump / drain -->
  <path d="M75,95 L75,50 L200,50 L200,55" stroke="#8b5e3c" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
  <text x="90" y="48" fill="#8b5e3c" font-size="5" font-family="monospace">Oil to sludge tank →</text>
  <!-- OCM sensor -->
  <rect x="200" y="75" width="35" height="25" rx="4" fill="#0e1d35" stroke="#22c55e" stroke-width="1.5"/>
  <circle class="ocm-pulse" cx="217" cy="87" r="7" fill="#22c55e"/>
  <text x="202" y="110" fill="#22c55e" font-size="5.5" font-family="monospace">OCM</text>
  <text x="200" y="117" fill="#7aaccf" font-size="5" font-family="monospace">≤15 ppm</text>
  <!-- Clean water out -->
  <line x1="235" y1="87" x2="272" y2="87" stroke="#38bdf8" stroke-width="2" marker-end="url(#ow)"/>
  <text x="240" y="80" fill="#38bdf8" font-size="5.5" font-family="monospace">Clean</text>
  <text x="240" y="87" fill="#38bdf8" font-size="5.5" font-family="monospace">≤15 ppm</text>
  <!-- 3-way valve -->
  <rect x="195" y="83" width="8" height="8" rx="1" fill="#ef4444"/>
  <text x="183" y="100" fill="#ef4444" font-size="5" font-family="monospace">3-way</text>
  <text x="183" y="107" fill="#ef4444" font-size="5" font-family="monospace">valve</text>
  <!-- Overboard label -->
  <text x="35" y="172" fill="#3d6a8a" font-size="5.5" font-family="monospace">MARPOL Annex I Reg.14: ≤15 ppm | Special Areas: 0 ppm | ORB Part I entry required</text>
</svg>`,

/* ── ISM CODE MANAGEMENT STRUCTURE ── */
ism_structure: `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <style>
    .ism-box { transition: all 0.2s; }
    .ism-pulse { animation: ismPulse 2s ease-in-out infinite; }
    @keyframes ismPulse { 0%,100%{opacity:0.7;} 50%{opacity:1;} }
    .flow-dash { animation: flowDash 1.5s linear infinite; stroke-dasharray:5,4; }
    @keyframes flowDash { to { stroke-dashoffset:-18; } }
  </style>
  <!-- Company (top) -->
  <rect x="80" y="8" width="120" height="28" rx="6" fill="#0e1d35" stroke="#a78bfa" stroke-width="1.5" class="ism-pulse"/>
  <text x="103" y="21" fill="#a78bfa" font-size="6.5" font-family="monospace" font-weight="bold">COMPANY</text>
  <text x="92" y="30" fill="#7aaccf" font-size="5.5" font-family="monospace">DOC (Document of Compliance)</text>
  <!-- DPA -->
  <rect x="10" y="60" width="90" height="26" rx="5" fill="#0e1d35" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="20" y="73" fill="#f59e0b" font-size="6.5" font-family="monospace">DPA</text>
  <text x="15" y="81" fill="#7aaccf" font-size="5.5" font-family="monospace">Direct access to top mgmt</text>
  <!-- Ship -->
  <rect x="160" y="60" width="110" height="26" rx="5" fill="#0e1d35" stroke="#22c55e" stroke-width="1.5"/>
  <text x="185" y="73" fill="#22c55e" font-size="6.5" font-family="monospace">SHIP (SMS)</text>
  <text x="165" y="81" fill="#7aaccf" font-size="5.5" font-family="monospace">SMC (Safety Mgmt Cert)</text>
  <!-- Master -->
  <rect x="160" y="108" width="50" height="24" rx="4" fill="#0e1d35" stroke="#60a5fa" stroke-width="1.2"/>
  <text x="168" y="119" fill="#60a5fa" font-size="6" font-family="monospace">MASTER</text>
  <text x="163" y="127" fill="#7aaccf" font-size="5" font-family="monospace">Full authority</text>
  <!-- CE -->
  <rect x="220" y="108" width="50" height="24" rx="4" fill="#0e1d35" stroke="#38bdf8" stroke-width="1.2"/>
  <text x="228" y="119" fill="#38bdf8" font-size="6" font-family="monospace">C/E</text>
  <text x="222" y="127" fill="#7aaccf" font-size="5" font-family="monospace">Engine dept SMS</text>
  <!-- Connection lines -->
  <line x1="140" y1="36" x2="55" y2="60" stroke="#a78bfa" stroke-width="1" class="flow-dash"/>
  <line x1="140" y1="36" x2="215" y2="60" stroke="#a78bfa" stroke-width="1" class="flow-dash"/>
  <line x1="55" y1="86" x2="215" y2="86" stroke="#f59e0b" stroke-width="1" class="flow-dash"/>
  <line x1="185" y1="86" x2="185" y2="108" stroke="#22c55e" stroke-width="1" class="flow-dash"/>
  <line x1="245" y1="86" x2="245" y2="108" stroke="#22c55e" stroke-width="1" class="flow-dash"/>
  <!-- ISM 12 elements list -->
  <rect x="10" y="108" width="140" height="62" rx="5" fill="#06111f" stroke="#1e3050"/>
  <text x="14" y="120" fill="#3d6a8a" font-size="5.5" font-family="monospace">ISM 12 ELEMENTS:</text>
  <text x="14" y="129" fill="#7aaccf" font-size="5" font-family="monospace">1.Policy  2.Instructions  3.DPA</text>
  <text x="14" y="138" fill="#7aaccf" font-size="5" font-family="monospace">4.Master auth  5.Resources  6.Plans</text>
  <text x="14" y="147" fill="#7aaccf" font-size="5" font-family="monospace">7.Emergency  8.NC Reporting</text>
  <text x="14" y="156" fill="#7aaccf" font-size="5" font-family="monospace">9.Maintenance  10.Documentation</text>
  <text x="14" y="165" fill="#7aaccf" font-size="5" font-family="monospace">11.Verification  12.Certification</text>
  <!-- Source -->
  <text x="90" y="176" fill="#3d6a8a" font-size="5.5" font-family="monospace">IMO Res. A.741(18) — ISM Code</text>
</svg>`

}); /* end Object.assign DIAGRAMS */

/* ── EXPAND TOPIC_DIAGRAMS MAPPING ── */
Object.assign(TOPIC_DIAGRAMS, {
  cl4_4stroke:        ['four_stroke_valves'],
  cl4_aircomp:        ['starting_air'],
  cl4_generators:     ['generator_parallel'],
  cl4_protection:     ['generator_parallel'],
  cl4_emergency:      ['generator_parallel'],
  cl4_ows:            ['ows_diagram'],
  cl4_marpol_oral:    ['ows_diagram'],
  cl3_boilers:        ['boiler_diagram'],
  cl3_boilerwater:    ['boiler_diagram'],
  cl3_steamplant:     ['boiler_diagram'],
  cl3_propeller:      ['propeller_theory'],
  cl3_vibration:      ['propeller_theory'],
  cl3_ism:            ['ism_structure'],
  cl3_solas:          ['ism_structure'],
  ce_duties:          ['ism_structure'],
  ce_dpa:             ['ism_structure'],
  ce_risk:            ['ism_structure'],
  cl3_resistance:     ['propeller_theory'],
  cl3_refrig:         ['refrig_cycle'],
  cl3_refrigsys:      ['refrig_cycle'],
  bst_survival:       ['ows_diagram'],
  cl4_fuelsys:        ['indicator_diagram'],
  cl4_lubesys:        ['two_stroke_engine'],
  cl3_perf:           ['indicator_diagram', 'pump_curve'],
  ce_cii:             ['pump_curve'],
  ce_sfoc:            ['indicator_diagram'],
  ce_diagnosis:       ['indicator_diagram', 'two_stroke_engine'],
});



/* ═══════════════════════════════════════════════════════════════════════
   CYCLE 3 (FIXED) — Mobile + Polish + Bug Fixes
   ═══════════════════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════════════
   CYCLE 3 — FIXED PATCH
   Fixes: d:path() animation, null guards, sb-open CSS conflict,
          mobile sidebar logic, quiz, AI prompt, UX polish
   ═══════════════════════════════════════════════════════════════════════ */

/* ── FIX 1: Replace broken generator_parallel diagram (d:path not cross-browser) ── */
DIAGRAMS.generator_parallel = `
<svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
  <defs>
    <marker id="gp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0L6,3L0,6Z" fill="#f59e0b"/>
    </marker>
  </defs>
  <style>
    .bus-flash  { animation: busFlash  0.8s ease-in-out infinite; }
    @keyframes busFlash  { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
    .sync-spin  { animation: syncSpin  2.4s linear infinite; transform-origin:140px 132px; }
    @keyframes syncSpin  { to { transform:rotate(360deg); } }
    .breaker-ok { animation: breakerOk 1.6s ease-in-out infinite; }
    @keyframes breakerOk { 0%,100%{fill:#22c55e;} 50%{fill:#16a34a;} }
    .ac-wave    { animation: acWave    1s ease-in-out infinite alternate; }
    @keyframes acWave    { 0%{transform:scaleY(1);} 100%{transform:scaleY(-1);} }
  </style>

  <!-- Generator 1 -->
  <rect x="12" y="38" width="72" height="58" rx="6" fill="#0e1d35" stroke="#38bdf8" stroke-width="1.5"/>
  <circle cx="48" cy="62" r="16" fill="#091929" stroke="#38bdf8" stroke-width="1.2"/>
  <text x="41" y="59" fill="#38bdf8" font-size="7" font-family="JetBrains Mono,monospace" font-weight="bold">G1</text>
  <text x="34" y="69" fill="#7aaccf" font-size="5.5" font-family="JetBrains Mono,monospace">500 kW</text>
  <text x="16" y="106" fill="#22c55e" font-size="5.5" font-family="JetBrains Mono,monospace">450V · 60Hz</text>

  <!-- Generator 2 -->
  <rect x="196" y="38" width="72" height="58" rx="6" fill="#0e1d35" stroke="#38bdf8" stroke-width="1.5"/>
  <circle cx="232" cy="62" r="16" fill="#091929" stroke="#38bdf8" stroke-width="1.2"/>
  <text x="225" y="59" fill="#38bdf8" font-size="7" font-family="JetBrains Mono,monospace" font-weight="bold">G2</text>
  <text x="218" y="69" fill="#7aaccf" font-size="5.5" font-family="JetBrains Mono,monospace">500 kW</text>
  <text x="200" y="106" fill="#22c55e" font-size="5.5" font-family="JetBrains Mono,monospace">450V · 60Hz</text>

  <!-- Main busbar -->
  <rect x="84" y="70" width="112" height="9" rx="2" fill="#f59e0b" class="bus-flash"/>
  <text x="108" y="67" fill="#f59e0b" font-size="6" font-family="JetBrains Mono,monospace">MAIN BUSBAR</text>

  <!-- ACBs (breakers) -->
  <rect x="76" y="66" width="11" height="17" rx="2" class="breaker-ok" stroke="#16a34a"/>
  <text x="60" y="80" fill="#22c55e" font-size="5" font-family="JetBrains Mono,monospace">ACB 1</text>
  <rect x="193" y="66" width="11" height="17" rx="2" class="breaker-ok" stroke="#16a34a"/>
  <text x="208" y="80" fill="#22c55e" font-size="5" font-family="JetBrains Mono,monospace">ACB 2</text>

  <!-- Synchroscope -->
  <circle cx="140" cy="132" r="24" fill="#091929" stroke="#f59e0b" stroke-width="1.5"/>
  <circle cx="140" cy="132" r="2"  fill="#f59e0b"/>
  <g class="sync-spin">
    <line x1="140" y1="132" x2="140" y2="110" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="140" cy="113" r="2.5" fill="#ef4444"/>
  </g>
  <text x="140" y="167" text-anchor="middle" fill="#f59e0b" font-size="6" font-family="JetBrains Mono,monospace">SYNCHROSCOPE</text>
  <text x="140" y="175" text-anchor="middle" fill="#3d6a8a" font-size="5" font-family="JetBrains Mono,monospace">slow CW → close breaker</text>

  <!-- Bus to load -->
  <line x1="140" y1="79" x2="140" y2="108" stroke="#f59e0b" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#gp)"/>
  <text x="144" y="99" fill="#f59e0b" font-size="5.5" font-family="JetBrains Mono,monospace">LOAD</text>

  <!-- Conditions bar -->
  <rect x="0" y="0" width="280" height="14" fill="#06111f"/>
  <text x="5" y="10" fill="#3d6a8a" font-size="5.5" font-family="JetBrains Mono,monospace">PARALLEL: Same V | Same f | Same phase seq | Phase angle match (synchroscope at 12 o'clock)</text>
</svg>`;

/* ── FIX 2: Correct CSS for mobile sidebar (remove conflicting sb-open rules) ── */
(function fixMobileCSS() {
  const style = document.createElement('style');
  style.id = 'cycle3-css';
  style.textContent = `

/* ════ MOBILE TOPBAR ════ */
.hamburger {
  display: none;
  flex-direction: column; justify-content: center; align-items: center;
  width: 38px; height: 38px; cursor: pointer; gap: 5px; flex-shrink: 0;
  border-radius: 8px; border: 1px solid var(--b1); background: var(--bg2);
  transition: border-color 0.15s;
}
.hamburger:hover { border-color: var(--ac); }
.hamburger span {
  display: block; width: 18px; height: 2px;
  background: var(--tx2); border-radius: 2px;
  transition: all 0.22s cubic-bezier(0.22,1,0.36,1);
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Sidebar overlay */
.sb-overlay {
  display: none; position: fixed; inset: 0; z-index: 195;
  background: rgba(0,0,0,0.65); backdrop-filter: blur(3px);
  opacity: 0; transition: opacity 0.25s ease;
}
.sb-overlay.show { display: block; opacity: 1; }

/* Sidebar close button (mobile only) */
.sb-close-btn {
  display: none; position: absolute; top: 10px; right: 10px;
  width: 30px; height: 30px; border-radius: 6px; z-index: 10;
  border: 1px solid var(--b1); background: var(--bg2);
  color: var(--tx2); cursor: pointer; font-size: 1rem;
  align-items: center; justify-content: center; line-height: 1;
  transition: all 0.12s;
}
.sb-close-btn:hover { color: var(--tx); border-color: var(--ac); }

/* Progress bar inside sidebar */
.sb-progress-bar {
  padding: 6px 14px 8px; display: flex; align-items: center; gap: 8px;
  border-bottom: 1px solid var(--b0);
}
.sb-progress-track {
  flex: 1; height: 3px; background: var(--b0); border-radius: 2px; overflow: hidden;
}
.sb-progress-fill {
  height: 100%; border-radius: 2px; transition: width 0.5s ease;
}
.sb-progress-label {
  font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; color: var(--tx3);
  white-space: nowrap;
}

/* ════ BREAKPOINT ≤768px (tablets + phones) ════ */
@media (max-width: 768px) {
  :root { --sb: 84vw; }

  /* Hamburger visible */
  .hamburger { display: flex; }

  /* Sidebar: overlay mode — never pushes content */
  .sidebar { z-index: 200; box-shadow: 6px 0 40px rgba(0,0,0,0.6); }
  .main.sb-open { margin-left: 0 !important; }
  .sb-close-btn { display: flex; }

  /* Topbar compact */
  .logo em { font-size: 0.92rem; }
  .tbtn    { padding: 5px 9px; font-size: 0.68rem; }
  .breadcrumb { max-width: 130px; }
  .bc-item    { max-width: 75px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Home screen */
  .home-screen  { padding: 20px 14px 80px; }
  .home-title   { font-size: 1.65rem; }
  .home-sub     { font-size: 0.86rem; }
  .info-strip   { grid-template-columns: 1fr 1fr; gap: 8px; }

  /* Career ladder — single column */
  .rank-grid::before,
  .rank-node     { display: none; }
  .rank-row:nth-child(odd)  .rank-card,
  .rank-row:nth-child(even) .rank-card { margin: 0 !important; }
  .rank-card     { padding: 15px 14px; }
  .rank-row      { margin-bottom: 10px; }

  /* Level page */
  .level-page    { padding: 14px 12px 80px; }
  .lp-banner     { padding: 14px 14px; }
  .lp-title      { font-size: 1.1rem; }
  .elig-grid     { grid-template-columns: 1fr; }
  .exam-papers-grid { grid-template-columns: 1fr; }

  /* Multimodal tabs */
  .mm-tabs { gap: 2px; padding: 3px; overflow-x: auto; }
  .mm-tab  { padding: 7px 10px; font-size: 0.7rem; white-space: nowrap; flex-shrink: 0; }

  /* Grids */
  .diag-grid    { grid-template-columns: 1fr; }
  .video-grid   { grid-template-columns: 1fr; }
  .formula-grid { grid-template-columns: 1fr; }

  /* Flashcard */
  .flashcard-wrap { height: 160px; }
  .fc-question     { font-size: 0.82rem; }
  .fc-answer       { font-size: 0.77rem; }

  /* AI search */
  .model-pills  { gap: 4px; }
  .model-pill   { padding: 6px 9px; }
  .mp-sub       { display: none; }
  .search-input { font-size: 0.85rem; padding: 13px 108px 13px 40px; }
  .ask-btn      { padding: 8px 13px; font-size: 0.68rem; }

  /* Answer card */
  .ans-body    { font-size: 0.87rem; padding: 14px 13px; }
  .ans-header  { padding: 11px 13px; }
  .ans-actions { padding: 10px 13px; flex-wrap: wrap; gap: 5px; }

  /* Notes drawer */
  .notes-drawer { width: 90vw; }

  /* Quiz */
  .quiz-wrap { padding: 14px 13px; }
  .quiz-q    { font-size: 0.85rem; }
  .quiz-opt  { font-size: 0.8rem; padding: 10px 12px; }
}

/* ════ BREAKPOINT ≤480px (phones) ════ */
@media (max-width: 480px) {
  :root { --sb: 92vw; }
  .topbar { padding: 0 10px; gap: 8px; }
  .logo   { font-size: 0.88rem; }
  .logo-anchor { font-size: 1.05rem; }
  .info-strip  { grid-template-columns: 1fr; }
  .home-ship-anim { font-size: 2.2rem; }
  .home-title { font-size: 1.4rem; }
  .home-source-strip { font-size: 0.53rem; flex-wrap: wrap; }
  .rc-tags  { display: none; }
  .mm-tabs  { flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .model-pills { flex-wrap: wrap; }
}

/* ════ TOUCH DEVICES — bigger tap targets ════ */
@media (hover: none) and (pointer: coarse) {
  .sb-topic    { padding: 11px 12px; min-height: 44px; }
  .mm-tab      { min-height: 40px; }
  .quiz-opt    { min-height: 46px; }
  .tbtn        { min-height: 36px; }
  .model-pill  { min-height: 40px; }
  .action-btn  { min-height: 36px; }
  .fc-ctrl-btn { min-width: 38px; min-height: 38px; }
  /* Remove hover effects that don't work on touch */
  .rank-card:hover { transform: none !important; box-shadow: none; }
}

/* ════ SCROLL TO TOP BUTTON ════ */
.scroll-top-btn {
  position: fixed; bottom: 22px; right: 18px; z-index: 100;
  width: 38px; height: 38px; border-radius: 50%;
  background: var(--bg2); border: 1px solid var(--b1);
  color: var(--tx2); cursor: pointer; font-size: 1rem;
  display: none; align-items: center; justify-content: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4); transition: all 0.15s;
}
.scroll-top-btn:hover   { border-color: var(--ac); color: var(--acL); }
.scroll-top-btn.visible { display: flex; }

/* ════ SCROLL REVEAL ════ */
.reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.35s ease, transform 0.35s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ════ EXAM MODE STYLING ════ */
.answer-card.exam-active { border-color: rgba(245,158,11,0.35) !important; }
.exam-section-head {
  font-family: 'JetBrains Mono', monospace; font-size: 0.62rem;
  letter-spacing: 0.12em; text-transform: uppercase; color: #f59e0b;
  margin: 14px 0 5px; padding-bottom: 4px;
  border-bottom: 1px solid rgba(245,158,11,0.2);
}
.exam-step-block {
  background: var(--bg2); border-left: 2px solid var(--ac);
  border-radius: 0 7px 7px 0; padding: 7px 12px; margin: 5px 0;
  font-size: 0.85rem; line-height: 1.65;
}
.exam-trap-block {
  background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.2);
  border-radius: 7px; padding: 9px 12px; margin: 7px 0;
  font-size: 0.83rem;
}
.exam-trap-title {
  font-family: 'JetBrains Mono', monospace; font-size: 0.58rem;
  letter-spacing: 0.1em; color: #f87171; margin-bottom: 4px;
}

/* ════ DIAGRAM ZOOM ════ */
.diag-card { cursor: zoom-in; transition: all 0.22s cubic-bezier(0.22,1,0.36,1); }
.diag-card.zoomed {
  transform: scale(1.05); z-index: 50; cursor: zoom-out;
  border-color: var(--ac) !important;
  box-shadow: 0 8px 40px rgba(14,165,233,0.2);
}

/* ════ PRINT ════ */
@media print {
  .topbar, .sidebar, .notes-drawer, .model-pills,
  .search-wrap, .topbar-actions, .mm-tabs,
  .ans-actions, .scroll-top-btn, .hamburger,
  .sb-overlay, .level-page .lp-banner { display: none !important; }
  .main { margin-left: 0 !important; }
  .ans-body { font-size: 11pt; line-height: 1.7; color: black; }
  body { background: white; color: black; }
}
  `;
  document.head.appendChild(style);
})();

