/* MarineIQ — Sidebar: toggle, open, close, overlay
   Deps: config.js */

function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains('visible');
  isOpen ? closeSidebar() : openSidebar();
}

function openSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sbOverlay');
  const ham      = document.getElementById('hamburger');
  const mainEl   = document.getElementById('mainEl');
  if (!sidebar) return;

  sidebar.classList.add('visible');

  if (window.innerWidth <= 768) {
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (ham) ham.classList.add('open');
    if (mainEl) mainEl.classList.remove('sb-open'); // never push on mobile
  } else {
    if (mainEl) mainEl.classList.add('sb-open');
  }
}

function closeSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const overlay  = document.getElementById('sbOverlay');
  const ham      = document.getElementById('hamburger');
  const mainEl   = document.getElementById('mainEl');
  if (!sidebar) return;

  if (window.innerWidth <= 768) {
    sidebar.classList.remove('visible');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
    if (ham) ham.classList.remove('open');
  }
  // On desktop: sidebar stays open (only goHome closes it)
}

/* ── Override enterLevel to use new sidebar functions ── */
const _enterLevel0 = enterLevel;
enterLevel = function(levelId) {
  _enterLevel0(levelId);
  if (window.innerWidth <= 768) {
    // Mobile: sidebar was opened by enterLevel0 (adds 'visible' + sb-open)
    // We override to use overlay mode instead
    const overlay = document.getElementById('sbOverlay');
    const ham     = document.getElementById('hamburger');
    const mainEl  = document.getElementById('mainEl');
    if (overlay) overlay.classList.add('show');
    if (ham) ham.classList.add('open');
    if (mainEl) mainEl.classList.remove('sb-open'); // no push on mobile
    document.body.style.overflow = 'hidden';
  }
  updateProgressBar();
};

/* ── Override goHome to close sidebar cleanly ── */
const _goHome0 = goHome;
goHome = function() {
  _goHome0();
  const overlay = document.getElementById('sbOverlay');
  const ham     = document.getElementById('hamburger');
  if (overlay) overlay.classList.remove('show');
  if (ham) ham.classList.remove('open');
  document.body.style.overflow = '';
};

/* ── Override selectTopic: close sidebar on mobile, scroll to content ── */
const _selectTopic0 = selectTopic;
selectTopic = function(topicId, title, desc, icon, sectionName) {
  _selectTopic0(topicId, title, desc, icon, sectionName);
  if (window.innerWidth <= 768) {
    closeSidebar();
    setTimeout(() => {
      const tz = document.getElementById('topicZone');
      if (tz) tz.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 180);
  }
  updateProgressBar();
};

/* ═══════════════════════════════════════════════════════════════════════
   FIX 5: PROGRESS BAR — null-safe, uses data attribute not ID
   ═══════════════════════════════════════════════════════════════════════ */
function updateProgressBar() {
  if (!APP.currentLevel) return;
  const lvl       = APP.currentLevel;
  const allTopics = Object.values(lvl.sections).flat().map(t => t.id);
  const done      = allTopics.filter(id => APP.studied[id]).length;
  const total     = allTopics.length;
  const pct       = total ? Math.round((done / total) * 100) : 0;

  // Remove old bar
  const existing = document.querySelector('.sb-progress-bar');
  if (existing) existing.remove();

  const sbContent = document.getElementById('sidebarContent');
  if (!sbContent) return;

  const header = sbContent.querySelector('.sb-rank-header');
  if (!header) return;

  const bar = document.createElement('div');
  bar.className = 'sb-progress-bar';
  bar.innerHTML = `
    <div class="sb-progress-track">
      <div class="sb-progress-fill" style="width:${pct}%;background:${lvl.rankColor}"></div>
    </div>
    <span class="sb-progress-label">${done}/${total}</span>`;
  header.insertAdjacentElement('afterend', bar);
}

/* ── Override markStudied to refresh progress bar ── */
const _markStudied0 = markStudied;
markStudied = function(topicId) {
  _markStudied0(topicId);
  updateProgressBar();
};

/* ═══════════════════════════════════════════════════════════════════════
   FIX 6: ENHANCED AI SYSTEM PROMPT
   ═══════════════════════════════════════════════════════════════════════ */
buildSystemPrompt = function(mode) {
  const lvlCtx   = APP.currentLevel
    ? `Student rank: ${APP.currentLevel.fullTitle}.`
    : 'General marine engineering study.';
  const topicCtx = APP.currentTopic
    ? (() => {
        const kb = TOPIC_KNOWLEDGE[APP.currentTopic] || {};
        const fml = (kb.formulas || []).slice(0, 2).map(f => `${f.label}: ${f.eq}`).join('; ');
        return `Current topic: "${APP.currentTopic}". Key formulas: ${fml || 'see references'}.`;
      })()
    : '';

  const depthInstr = {
    fast: 'Answer concisely (3–5 paragraphs). Bold key terms. State critical formulas only.',
    bal:  'Answer thoroughly (5–7 paragraphs). Use **bold section headers**. State all formulas with variable definitions. Reference regulation numbers precisely.',
    deep: 'Give a comprehensive, textbook-quality answer: definition → theory → formulas → worked example → ship application → exam tips → common mistakes. Cite Reed\'s volume or Pounder\'s chapter where relevant.',
    live: 'Use web search to find the most current official data (IMO, MAN B&W, Wärtsilä, DNV, Lloyd\'s, DG Shipping). Combine search results with core engineering knowledge.'
  }[mode] || '';

  const examSection = APP.examMode ? `
══ EXAM MODE — MANDATORY STRUCTURE ══
Every answer must follow this exact order:
1. **DIRECT ANSWER:** One sentence definition or direct response.
2. **KEY FORMULAS:** All relevant formulas with every variable defined. Label each "FORMULA:".
3. **EXPLANATION:** Numbered step-by-step working.
4. **SOURCE:** Cite specific regulation (e.g. MARPOL Annex I Reg.14) or book (Reed's Vol.6 Ch.9).
5. **EXAM TIP:** What MMD examiners specifically look for on this topic (written or oral exam).
6. **TRAP:** The single most common student mistake on this topic.
` : '';

  return `You are MarineIQ — AI study assistant for Merchant Navy Marine Engineers.
${lvlCtx} ${topicCtx}

══ ACCURACY MANDATE ══
Only cite values you are certain of from these authoritative sources:
• Reed's Marine Engineering Series Vol.1–12
• Pounder's Marine Diesel Engines & Gas Turbines, 9th Ed.
• MAN B&W S/ME-C/ME-GI Engine Project Guides & Operation Manuals
• Wärtsilä RT-flex / DF Engine Technical Documentation
• ABB Turbocharging Technical Manual
• Alfa Laval FOPX/LOPX Separator Manuals
• IMO STCW 2010 Manila Amendments (Tables A-III/1, A-III/2, A-VIII/1)
• MARPOL 73/78 Consolidated 2021 (Annexes I–VI)
• SOLAS Consolidated 2020 (Chapters I–XIV)
• IMO Resolution A.741(18) — ISM Code
• IMO Resolution A.749(18) — Intact Stability Code
• IMO MEPC.339(76) — CII, MEPC.355(78) — EEXI
• IMO BWM Convention 2017 (D-1, D-2 standards)
• D.J. Eyres, Ship Stability for Masters & Mates, 6th Ed.
• DG Shipping India MEO Examination Syllabi
• Rogers & Mayhew, Engineering Thermodynamics

If unsure of a specific value, say "verify in maker's manual" rather than guess.

══ CAREER STRUCTURE (DG Shipping India) ══
Engine Cadet → 4th Engineer (MEO Class IV, STCW A-III/1, OICEW 750 kW+)
→ 3rd Engineer → 2nd Engineer (MEO Class II, STCW A-III/2, Management Level)
→ Chief Engineer (MEO Class I, STCW A-III/2 Senior)

MMD Examinations — Class IV written: EKG + EKM + ET + Oral
MMD Examinations — Class II/I written: Naval Arch + Applied Heat + MEP + Motor + ET + Oral

══ KEY VERIFIED DATA ══
2-STROKE SLOW-SPEED (MAN B&W S/ME-C, Wärtsilä RT-flex):
• Uniflow scavenging: ports ~140° ABDC | exhaust valve ~110° ATDC
• IHP = (Pm × L × A × N) / 60,000 kW | SFOC at MCR: 155–175 g/kWh
• η_thermal ≈ 50–54% | η_mech ≈ 85–92% | Starting air: 25–30 bar
• Common rail: 600–1800 bar | Firing order 6-cyl in-line: 1-4-2-6-3-5
• Cylinder oil: 0.8–1.5 g/kWh | TBN 40–100 depending on fuel sulphur

4-STROKE MEDIUM-SPEED (Wärtsilä 32/34/46, Bergen B/C):
• Power stroke every 2 revolutions | IHP ÷ 2 in formula
• Valve overlap: ~20–30° CA at TDC | SFOC: 180–210 g/kWh

TURBOCHARGER (ABB TPL/TPS, MAN NR/NA, Mitsubishi MET):
• Boost pressure: 2.0–4.5 bar absolute | Speed: 7,000–30,000 RPM
• η_isentropic compressor: 78–84% | Floating-ring plain bearings
• Surge line: compressor map left boundary — reduce load/open bypass
• Compressor water washing: 50–60% MCR load, distilled water only

CENTRIFUGAL PUMPS (Reed's Vol.6):
• Q∝N | H∝N² | P∝N³ (Affinity Laws)
• NPSHa > NPSHr (cavitation prevention)
• Cavitation: local P < P_vapour → bubble collapse → impeller pitting

PURIFIER (Alfa Laval FOPX/LOPX):
• HFO: 95–98°C | MDO: 40°C | Bowl speed: ~7,000 RPM
• Gravity disc: selected from density/temp chart
• OWS 15 ppm limit (MARPOL Annex I Reg.14) | OCM calibrated & sealed

BOILERS (Reed's Vol.2):
• Scotch marine fire-tube: 7–17 bar | D-type/water-tube: 40–100 bar
• pH: 10.5–11.5 | TDS: <3,000–4,500 ppm | Chloride: <200 ppm
• Anti-scale: Na₃PO₄ (trisodium phosphate) | O₂ scavenger: Na₂SO₃
• Two safety valves mandatory (SOLAS/Class); 2nd SV ≤5% above 1st

STABILITY (D.J. Eyres; IMO A.749(18)):
• GM = KB + BM − KG | BM = I_WP / V | GZ_max ≥ 0.20m at θ ≥ 30°
• IMO: GM ≥ 0.15m | Area 0–30° ≥ 0.055 m·rad | 0–40° ≥ 0.090 m·rad
• Free surface: GGm = (ρ_liq × lb³/12) / (ρ_ship × V) — cubic breadth!
• Angle of loll correction: fill LOWEST DB tanks first (never heeling tanks)

ELECTRICAL (Reed's Vol.4):
• Ns = (120×f)/P | 4-pole 60 Hz: 1,800 RPM | Parallel: match V, f, phase, angle
• Emergency generator: auto-start ≤45 sec (SOLAS II-1 Reg.43); 18h passenger / 3h cargo
• Preferential trip: shed non-essential first; NEVER trip nav lights, fire pumps, steering, GMDSS
• Insulation resistance: >1 MΩ per kV of system voltage

MARPOL (2021 Consolidated):
• Annex I: overboard ≤15 ppm (OWS+OCM); Special Areas 0 ppm; ORB Part I retained 3 years
• Annex VI: SOx ≤0.50% global (2020), ≤0.10% ECA | NOx Tier III: 80% reduction in ECAs
• CII: rated A–E annually; D (3 yr) or E (1 yr) → mandatory SEEMP Part III (MEPC.339(76))
• EEXI: in force 1 Jan 2023 | CF: HFO=3.114, LNG=2.750, methanol=1.375 g CO₂/g fuel

STCW 2010 Manila:
• Rest: ≥10h/24h AND ≥77h/7 days | Max work: ≤14h/24h AND ≤98h/7 days
• BAC ≤0.05% on watch | Leadership & teamwork mandatory for management level

AIR COMPRESSOR (Reed's Vol.6):
• 2-stage intercooled | 25–30 bar delivery | Fusible plug melts at 121°C
• NRV on each stage | Safety valve at max working pressure

PROPELLER (Pounder's Ch.8; Carlton):
• J = Va/(nD) | Kt = T/(ρn²D⁴) | η_prop ≈ 60–75%
• Wake fraction w ≈ 0.20–0.35 (single screw) | Thrust deduction t ≈ 0.15–0.25
• Cavitation: local P < P_vap → blade erosion; check BAR adequacy
• Barred speed range: transit through quickly (<30 s); torsional vibration resonance risk

══ FORMATTING ══
• Use **bold** for key terms, regulation numbers, formula labels
• Prefix equations with "FORMULA:" on own line
• Prefix cautions with "NOTE:" or "WARNING:"
• Keep answers accurate; cite source when values are regulation-specific
${examSection}
${depthInstr}`;
};

/* ═══════════════════════════════════════════════════════════════════════
   FIX 7: EXAM MODE ENHANCED FORMATTER
   ═══════════════════════════════════════════════════════════════════════ */
