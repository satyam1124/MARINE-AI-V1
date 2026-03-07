/* MarineIQ — Animated SVG Diagrams + Topic Diagram Assignments
   DIAGRAMS: SVG strings keyed by diagram ID
   TOPIC_DIAGRAMS: maps topicId → diagram IDs
   getDiagramsForTopic(): single lookup function
   DO NOT add logic here */

const DIAGRAMS = {

  /* 2-stroke engine cross-section with animated piston */
  two_stroke_engine: `
  <svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
    <defs>
      <marker id="a1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0L6,3L0,6Z" fill="#38bdf8"/>
      </marker>
      <linearGradient id="liner_g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#1e3a5f"/>
        <stop offset="100%" stop-color="#0e2440"/>
      </linearGradient>
      <linearGradient id="piston_g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3b82f6"/>
        <stop offset="100%" stop-color="#1d4ed8"/>
      </linearGradient>
    </defs>
    <style>
      .piston-anim { animation: pistonMove 2s ease-in-out infinite; }
      @keyframes pistonMove {
        0%,100%  { transform: translateY(0px); }
        45%      { transform: translateY(54px); }
        50%      { transform: translateY(56px); }
        55%      { transform: translateY(54px); }
      }
      .exhvalve-anim { animation: exhValve 2s ease-in-out infinite; }
      @keyframes exhValve {
        0%,35%   { transform: translateY(0px); }
        40%,55%  { transform: translateY(6px); }
        65%,100% { transform: translateY(0px); }
      }
      .combustion-flash { animation: comFlash 2s ease-in-out infinite; }
      @keyframes comFlash {
        0%,85%,100% { opacity: 0; }
        90%,95%     { opacity: 0.9; }
      }
      .scav-arrow { animation: scavArrow 2s ease-in-out infinite; }
      @keyframes scavArrow {
        0%,30%    { opacity: 0; transform: translateY(0px); }
        40%,55%   { opacity: 1; transform: translateY(-8px); }
        70%,100%  { opacity: 0; transform: translateY(-12px); }
      }
      .exh-arrow { animation: exhArrow 2s ease-in-out infinite; }
      @keyframes exhArrow {
        0%,35%    { opacity: 0; transform: translateY(0px); }
        45%,55%   { opacity: 1; transform: translateY(-10px); }
        65%,100%  { opacity: 0; transform: translateY(-15px); }
      }
    </style>
    <!-- Cylinder liner walls -->
    <rect x="90" y="20" width="10" height="130" fill="url(#liner_g)" stroke="#1e3a5f"/>
    <rect x="180" y="20" width="10" height="130" fill="url(#liner_g)" stroke="#1e3a5f"/>
    <!-- Cylinder head -->
    <rect x="90" y="10" width="100" height="12" fill="#1e3a5f" stroke="#2d5a8f"/>
    <!-- Label: TDC -->
    <text x="78" y="26" fill="#3d6a8a" font-size="6.5" font-family="monospace">TDC</text>
    <text x="78" y="90" fill="#3d6a8a" font-size="6.5" font-family="monospace">BDC</text>
    <!-- Exhaust valve (animated) -->
    <g class="exhvalve-anim">
      <rect x="122" y="18" width="16" height="6" rx="2" fill="#f59e0b" stroke="#b45309"/>
      <line x1="130" y1="10" x2="130" y2="18" stroke="#f59e0b" stroke-width="2"/>
    </g>
    <!-- Label exhaust valve -->
    <text x="142" y="16" fill="#f59e0b" font-size="6" font-family="monospace">Exh.V</text>
    <!-- Combustion flash -->
    <ellipse class="combustion-flash" cx="140" cy="38" rx="18" ry="8" fill="#ef4444" opacity="0"/>
    <!-- Piston assembly (animated) -->
    <g class="piston-anim">
      <!-- Piston crown -->
      <rect x="91" y="60" width="98" height="18" rx="2" fill="url(#piston_g)" stroke="#60a5fa"/>
      <!-- Piston rings (3) -->
      <rect x="91" y="62" width="98" height="2" fill="#93c5fd"/>
      <rect x="91" y="67" width="98" height="2" fill="#93c5fd"/>
      <rect x="91" y="72" width="98" height="2" fill="#93c5fd"/>
      <!-- Skirt -->
      <rect x="100" y="78" width="80" height="20" fill="#1e40af" stroke="#3b82f6"/>
      <!-- Connecting rod stub -->
      <rect x="136" y="98" width="8" height="18" fill="#1e3a5f" stroke="#2563eb"/>
    </g>
    <!-- Scavenge ports (left wall) -->
    <rect x="88" y="100" width="4" height="20" fill="#0ea5e9" rx="1"/>
    <text x="55" y="108" fill="#0ea5e9" font-size="5.5" font-family="monospace">Scav.</text>
    <text x="55" y="115" fill="#0ea5e9" font-size="5.5" font-family="monospace">Air</text>
    <!-- Scav air arrows -->
    <g class="scav-arrow">
      <line x1="88" y1="115" x2="100" y2="115" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#a1)"/>
      <line x1="88" y1="108" x2="100" y2="108" stroke="#38bdf8" stroke-width="1.5" marker-end="url(#a1)"/>
    </g>
    <!-- Exhaust arrow going up -->
    <g class="exh-arrow">
      <line x1="130" y1="28" x2="130" y2="6" stroke="#ef4444" stroke-width="1.5" marker-end="url(#a1)"/>
    </g>
    <!-- Exhaust label -->
    <text x="138" y="6" fill="#ef4444" font-size="5.5" font-family="monospace">Exh.Gas</text>
    <!-- Crankshaft (bottom) -->
    <circle cx="140" cy="165" r="15" fill="none" stroke="#1e3a5f" stroke-width="3"/>
    <circle cx="140" cy="165" r="4" fill="#3b82f6"/>
    <!-- Process labels -->
    <text x="196" y="45" fill="#22c55e" font-size="5.5" font-family="monospace">COMBUSTION</text>
    <text x="196" y="80" fill="#60a5fa" font-size="5.5" font-family="monospace">EXPANSION</text>
    <text x="55" y="145" fill="#f59e0b" font-size="5.5" font-family="monospace">COMPRESSION</text>
  </svg>`,

  /* GZ Stability Curve with animated ship heel */
  gz_curve: `
  <svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
    <defs>
      <marker id="ax" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0L7,3.5L0,7Z" fill="#3d6a8a"/>
      </marker>
    </defs>
    <style>
      .gz-path { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawGZ 3s ease forwards; }
      @keyframes drawGZ { to { stroke-dashoffset: 0; } }
      .ship-heel { animation: heelShip 3s ease-in-out infinite 1s; transform-origin: 76px 95px; }
      @keyframes heelShip {
        0%,100%  { transform: rotate(0deg); }
        40%,60%  { transform: rotate(25deg); }
      }
    </style>
    <!-- Axes -->
    <line x1="30" y1="140" x2="260" y2="140" stroke="#1e3a5f" stroke-width="1.5" marker-end="url(#ax)"/>
    <line x1="30" y1="140" x2="30" y2="10" stroke="#1e3a5f" stroke-width="1.5" marker-end="url(#ax)"/>
    <text x="262" y="143" fill="#3d6a8a" font-size="7" font-family="monospace">θ°</text>
    <text x="18" y="10" fill="#3d6a8a" font-size="7" font-family="monospace">GZ</text>
    <!-- Zero reference -->
    <line x1="30" y1="140" x2="255" y2="140" stroke="#1e3050" stroke-dasharray="3,3"/>
    <!-- Angle markers -->
    <line x1="80" y1="137" x2="80" y2="143" stroke="#1e3a5f"/>
    <line x1="130" y1="137" x2="130" y2="143" stroke="#1e3a5f"/>
    <line x1="170" y1="137" x2="170" y2="143" stroke="#1e3a5f"/>
    <line x1="220" y1="137" x2="220" y2="143" stroke="#1e3a5f"/>
    <text x="74" y="153" fill="#3d6a8a" font-size="7" font-family="monospace">30°</text>
    <text x="124" y="153" fill="#3d6a8a" font-size="7" font-family="monospace">45°</text>
    <text x="164" y="153" fill="#3d6a8a" font-size="7" font-family="monospace">60°</text>
    <text x="214" y="153" fill="#3d6a8a" font-size="7" font-family="monospace">90°</text>
    <!-- GZ area fill (0-30°) -->
    <path d="M30,140 Q55,90 80,65 L80,140 Z" fill="rgba(34,197,94,0.08)"/>
    <!-- GZ curve animated draw -->
    <path class="gz-path" d="M30,140 Q50,85 80,60 Q110,42 135,38 Q165,40 190,65 Q215,90 235,120 Q248,135 255,140"
          stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Max GZ marker -->
    <circle cx="135" cy="38" r="3.5" fill="#22c55e" opacity="0.9">
      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
    </circle>
    <line x1="135" y1="38" x2="135" y2="140" stroke="#22c55e" stroke-dasharray="3,3" stroke-width="1"/>
    <text x="138" y="35" fill="#22c55e" font-size="6" font-family="monospace">GZ_max ≥ 0.20m</text>
    <!-- Angle of max GZ label -->
    <text x="120" y="153" fill="#22c55e" font-size="5.5" font-family="monospace">≥30°</text>
    <!-- GM tangent line -->
    <line x1="30" y1="140" x2="78" y2="80" stroke="#f59e0b" stroke-dasharray="4,2" stroke-width="1.5"/>
    <text x="45" y="100" fill="#f59e0b" font-size="6" font-family="monospace">GM slope</text>
    <!-- Area labels -->
    <text x="42" y="108" fill="#22c55e" font-size="5.5" font-family="monospace">≥0.055</text>
    <text x="42" y="115" fill="#22c55e" font-size="5.5" font-family="monospace">m·rad</text>
    <!-- Vanishing stability -->
    <circle cx="255" cy="140" r="3" fill="#ef4444"/>
    <text x="230" y="133" fill="#ef4444" font-size="5.5" font-family="monospace">Vanish</text>
    <!-- Mini ship diagram heeling -->
    <g class="ship-heel">
      <path d="M60,95 Q76,82 92,95 L88,100 Q76,96 64,100 Z" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1"/>
      <rect x="73" y="86" width="6" height="10" fill="#60a5fa"/>
    </g>
    <line x1="30" y1="95" x2="110" y2="95" stroke="#1e3050" stroke-dasharray="2,4" stroke-width="1"/>
    <text x="8" y="99" fill="#3d6a8a" font-size="5.5" font-family="monospace">WL</text>
    <!-- IMO criteria text -->
    <text x="142" y="160" fill="#3d6a8a" font-size="5.5" font-family="monospace">IMO Res. A.749(18) Intact Stability</text>
  </svg>`,

  /* Refrigeration Cycle with animated flow */
  refrig_cycle: `
  <svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
    <defs>
      <marker id="rf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0L6,3L0,6Z" fill="#38bdf8"/>
      </marker>
      <marker id="rh" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0L6,3L0,6Z" fill="#ef4444"/>
      </marker>
    </defs>
    <style>
      .dot-cold { animation: moveCold 3s linear infinite; }
      .dot-hot  { animation: moveHot 3s linear infinite; }
      @keyframes moveCold {
        0%   { offset-distance: 0%; }
        100% { offset-distance: 100%; }
      }
    </style>
    <!-- Compressor -->
    <rect x="115" y="70" width="50" height="40" rx="6" fill="#0e1d35" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="125" y="87" fill="#38bdf8" font-size="7.5" font-family="monospace" font-weight="bold">COMP</text>
    <text x="120" y="100" fill="#7aaccf" font-size="5.5" font-family="monospace">↑ Pressure</text>
    <!-- Condenser -->
    <rect x="180" y="20" width="75" height="30" rx="5" fill="#0e1d35" stroke="#ef4444" stroke-width="1.5"/>
    <text x="195" y="34" fill="#ef4444" font-size="7.5" font-family="monospace" font-weight="bold">COND</text>
    <text x="185" y="44" fill="#7aaccf" font-size="5.5" font-family="monospace">Heat rejected →</text>
    <!-- Expansion valve -->
    <rect x="180" y="130" width="75" height="30" rx="5" fill="#0e1d35" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="190" y="144" fill="#f59e0b" font-size="7.5" font-family="monospace" font-weight="bold">EXP.V</text>
    <text x="183" y="155" fill="#7aaccf" font-size="5.5" font-family="monospace">↓ Pressure</text>
    <!-- Evaporator -->
    <rect x="20" y="70" width="75" height="40" rx="5" fill="#0e1d35" stroke="#22c55e" stroke-width="1.5"/>
    <text x="28" y="87" fill="#22c55e" font-size="7.5" font-family="monospace" font-weight="bold">EVAP</text>
    <text x="22" y="100" fill="#7aaccf" font-size="5.5" font-family="monospace">← Heat absorbed</text>
    <!-- Flow pipes with animated dots -->
    <!-- 1→2: Evap outlet to Compressor (superheated vapour) - cold blue -->
    <path d="M95,90 L115,90" stroke="#38bdf8" stroke-width="1.8" fill="none" marker-end="url(#rf)">
      <animate attributeName="stroke-dasharray" values="0,60;60,0" dur="1.5s" repeatCount="indefinite"/>
    </path>
    <!-- 2→3: Comp to Condenser (hot gas) - hot red -->
    <path d="M140,70 L140,35 Q140,20 165,20 L180,20" stroke="#ef4444" stroke-width="1.8" fill="none" marker-end="url(#rh)">
      <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
    </path>
    <!-- 3→4: Cond to Exp valve (subcooled liquid) - warm orange -->
    <path d="M255,50 L255,130" stroke="#f59e0b" stroke-width="1.8" fill="none" marker-end="url(#rf)">
      <animate attributeName="stroke-dasharray" values="0,80;80,0" dur="1.5s" repeatCount="indefinite" begin="1s"/>
    </path>
    <!-- 4→1: Exp valve to Evap (wet mixture) - cool green -->
    <path d="M180,145 L95,145 Q95,140 95,110" stroke="#22c55e" stroke-width="1.8" fill="none" marker-end="url(#rf)">
      <animate attributeName="stroke-dasharray" values="0,120;120,0" dur="1.5s" repeatCount="indefinite" begin="1.5s"/>
    </path>
    <!-- State labels -->
    <text x="97" y="88" fill="#38bdf8" font-size="7" font-family="monospace">1</text>
    <text x="160" y="15" fill="#ef4444" font-size="7" font-family="monospace">2 Hot gas</text>
    <text x="257" y="90" fill="#f59e0b" font-size="7" font-family="monospace">3</text>
    <text x="120" y="158" fill="#22c55e" font-size="7" font-family="monospace">4 Wet mix</text>
    <!-- Heat arrows -->
    <text x="235" y="18" fill="#ef4444" font-size="6" font-family="monospace">Q_cond→</text>
    <text x="22" y="65" fill="#22c55e" font-size="6" font-family="monospace">←Q_evap</text>
    <!-- COP label -->
    <text x="110" y="165" fill="#3d6a8a" font-size="6" font-family="monospace">COP = Q_evap / W_comp</text>
  </svg>`,

  /* PV Indicator Diagram — 2-stroke diesel */
  indicator_diagram: `
  <svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
    <defs>
      <marker id="ai" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0L6,3L0,6Z" fill="#3d6a8a"/>
      </marker>
    </defs>
    <style>
      .pv-draw { stroke-dasharray: 500; stroke-dashoffset: 500; animation: drawPV 4s ease forwards 0.5s; }
      @keyframes drawPV { to { stroke-dashoffset: 0; } }
    </style>
    <text x="55" y="14" fill="#3d6a8a" font-size="7" font-family="monospace">INDICATOR DIAGRAM — 2-STROKE DIESEL</text>
    <!-- Axes -->
    <line x1="35" y1="150" x2="255" y2="150" stroke="#1e3a5f" stroke-width="1.5" marker-end="url(#ai)"/>
    <line x1="35" y1="150" x2="35" y2="15" stroke="#1e3a5f" stroke-width="1.5" marker-end="url(#ai)"/>
    <text x="257" y="153" fill="#3d6a8a" font-size="7" font-family="monospace">V →</text>
    <text x="20" y="14" fill="#3d6a8a" font-size="7" font-family="monospace">P</text>
    <!-- TDC/BDC markers -->
    <line x1="55" y1="147" x2="55" y2="153" stroke="#1e3a5f"/>
    <line x1="230" y1="147" x2="230" y2="153" stroke="#1e3a5f"/>
    <text x="47" y="162" fill="#3d6a8a" font-size="6.5" font-family="monospace">TDC</text>
    <text x="220" y="162" fill="#3d6a8a" font-size="6.5" font-family="monospace">BDC</text>
    <!-- PV area fill -->
    <path d="M55,145 Q55,100 55,40 L100,28 Q130,26 140,26 L180,40 Q220,80 230,145 Z" fill="rgba(14,165,233,0.05)"/>
    <!-- Power Card (full spring) animated -->
    <path class="pv-draw" d="M55,145 Q54,90 55,40 L100,28 Q125,26 142,26 L185,40 Q220,75 230,145"
          stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Atmospheric line -->
    <line x1="35" y1="145" x2="250" y2="145" stroke="#1e3050" stroke-dasharray="3,3"/>
    <!-- Key points labels -->
    <text x="56" y="38" fill="#38bdf8" font-size="6.5" font-family="monospace">1 (Ignition)</text>
    <text x="145" y="22" fill="#22c55e" font-size="6.5" font-family="monospace">Peak P</text>
    <circle cx="142" cy="26" r="3" fill="#22c55e"><animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/></circle>
    <text x="225" y="132" fill="#f59e0b" font-size="6.5" font-family="monospace">3</text>
    <text x="15" y="148" fill="#a78bfa" font-size="6.5" font-family="monospace">4</text>
    <!-- Process labels -->
    <text x="14" y="90" fill="#38bdf8" font-size="6" transform="rotate(-90,14,90)">Compression</text>
    <text x="155" y="40" fill="#ef4444" font-size="6">Combustion</text>
    <text x="192" y="100" fill="#f59e0b" font-size="6" transform="rotate(15,192,100)">Expansion</text>
    <!-- MEP arrow -->
    <rect x="60" y="100" width="165" height="2" fill="none" stroke="#a78bfa" stroke-dasharray="4,2"/>
    <text x="90" y="98" fill="#a78bfa" font-size="6" font-family="monospace">MEP (Mean Effective Pressure)</text>
    <!-- Spring constant label -->
    <text x="110" y="170" fill="#3d6a8a" font-size="6" font-family="monospace">IHP = (MEP × L × A × N) / 60,000 kW</text>
  </svg>`,

  /* Centrifugal Pump H-Q Curve */
  pump_curve: `
  <svg viewBox="0 0 280 180" style="background:#060d1c;display:block;">
    <defs>
      <marker id="ap" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0L6,3L0,6Z" fill="#3d6a8a"/>
      </marker>
    </defs>
    <style>
      .hq-draw { stroke-dasharray: 350; stroke-dashoffset: 350; animation: drawHQ 3s ease forwards 0.3s; }
      .sys-draw { stroke-dasharray: 280; stroke-dashoffset: 280; animation: drawHQ 3s ease forwards 0.8s; }
      .eff-draw  { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawHQ 3s ease forwards 1.2s; }
      @keyframes drawHQ { to { stroke-dashoffset: 0; } }
      .duty-pulse { animation: dutyPulse 1.5s ease-in-out infinite 3s; }
      @keyframes dutyPulse { 0%,100%{r:4;} 50%{r:7;} }
    </style>
    <text x="60" y="13" fill="#3d6a8a" font-size="7" font-family="monospace">CENTRIFUGAL PUMP — H-Q CHARACTERISTICS</text>
    <!-- Axes -->
    <line x1="35" y1="140" x2="250" y2="140" stroke="#1e3a5f" stroke-width="1.5" marker-end="url(#ap)"/>
    <line x1="35" y1="140" x2="35" y2="18" stroke="#1e3a5f" stroke-width="1.5" marker-end="url(#ap)"/>
    <text x="252" y="143" fill="#3d6a8a" font-size="7" font-family="monospace">Q</text>
    <text x="18" y="18" fill="#3d6a8a" font-size="7" font-family="monospace">H</text>
    <!-- H-Q pump curve (drooping) -->
    <path class="hq-draw" d="M38,28 Q80,30 120,50 Q160,75 200,120 Q220,135 240,140"
          stroke="#38bdf8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <!-- System curve (parabolic) -->
    <path class="sys-draw" d="M38,140 Q100,130 150,95 Q200,55 235,30"
          stroke="#22c55e" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-dasharray="6,3"/>
    <!-- Efficiency curve (bell) -->
    <path class="eff-draw" d="M38,140 Q80,115 120,90 Q155,75 170,78 Q190,85 220,115 Q235,130 245,140"
          stroke="#f59e0b" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.7"/>
    <!-- Duty point intersection -->
    <circle class="duty-pulse" cx="138" cy="72" r="4" fill="#ef4444" opacity="0.9"/>
    <line x1="138" y1="72" x2="138" y2="140" stroke="#ef4444" stroke-dasharray="3,3"/>
    <line x1="35" y1="72" x2="138" y2="72" stroke="#ef4444" stroke-dasharray="3,3"/>
    <text x="140" y="69" fill="#ef4444" font-size="6.5" font-family="monospace">Duty Point</text>
    <!-- Labels -->
    <text x="40" y="45" fill="#38bdf8" font-size="6.5" font-family="monospace">H-Q (Pump)</text>
    <text x="195" y="42" fill="#22c55e" font-size="6.5" font-family="monospace">System curve</text>
    <text x="170" y="72" fill="#f59e0b" font-size="6" font-family="monospace">η (%)</text>
    <!-- Surge zone -->
    <rect x="35" y="18" width="50" height="125" fill="rgba(239,68,68,0.04)" stroke="none"/>
    <text x="38" y="30" fill="#ef4444" font-size="5.5" font-family="monospace">Surge</text>
    <text x="38" y="38" fill="#ef4444" font-size="5.5" font-family="monospace">zone</text>
    <!-- NPSH note -->
    <text x="40" y="167" fill="#3d6a8a" font-size="5.5" font-family="monospace">NPSHa > NPSHr = no cavitation. Source: Reed's Vol.6</text>
  </svg>`

};

/* ── DIAGRAM ASSIGNMENT PER TOPIC ── */
const TOPIC_DIAGRAMS = {
  cl4_2stroke:   ['two_stroke_engine', 'indicator_diagram'],
  cl4_indicator: ['indicator_diagram', 'two_stroke_engine'],
  cl4_turbo:     ['indicator_diagram'],
  cl4_pumps:     ['pump_curve'],
  cl4_pumpcurves:['pump_curve'],
  cl3_transverse:['gz_curve'],
  cl3_gzcurve:   ['gz_curve'],
  cl3_refrig:    ['refrig_cycle'],
  cl3_refrigsys: ['refrig_cycle'],
};

function getDiagramsForTopic(topicId) {
  const keys = TOPIC_DIAGRAMS[topicId] || ['two_stroke_engine'];
  return keys.map(k => DIAGRAMS[k]).filter(Boolean);
}
