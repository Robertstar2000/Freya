# index.html

Complete source text.

````
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FREYA Revision 8 | 3D Mission Simulator</title>
<style>
:root{--bg:#0b1118;--panel:#121d28;--panel2:#172534;--line:#2d4456;--text:#e8efed;--muted:#adc0be;--gold:#e3bf7d;--teal:#82d8ca;--warn:#f5ce74;--bad:#ff9d9d;--ok:#9ee2b5;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;color:var(--text);background:var(--bg)}
*{box-sizing:border-box}body{margin:0;background:linear-gradient(180deg,#091018,#0c141b 34%,#101923)}a{color:inherit}
header{position:sticky;top:0;z-index:10;background:#0b1118ee;backdrop-filter:blur(10px);display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--line)}
header h1{margin:0;font-size:18px;letter-spacing:2px}header .sub{font-size:11px;color:var(--muted)}
.wrap{display:grid;grid-template-columns:360px minmax(0,1fr);gap:16px;max-width:1800px;margin:0 auto;padding:16px}
.sidebar{position:sticky;top:72px;align-self:start;max-height:calc(100vh - 88px);overflow:auto;background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:18px;padding:14px}
.main{display:grid;gap:16px}
.card{background:linear-gradient(180deg,var(--panel),var(--panel2));border:1px solid var(--line);border-radius:18px;padding:16px}
.group{margin-bottom:12px;border:1px solid #244052;border-radius:14px;padding:10px;background:#0d1822}
.group h3{margin:2px 0 10px;font-size:14px;color:#f0d39d} .group p{margin:6px 0 10px;font-size:12px;color:var(--muted)}
.ctrl{display:block;margin:10px 0}.ctrl .row{display:flex;justify-content:space-between;gap:12px;font-size:12px;color:#d8e7e5}.ctrl input,.ctrl select{width:100%;margin-top:6px}input[type=range]{accent-color:var(--teal)} select{background:#0f1b25;color:#f0f4f3;border:1px solid #3a5667;border-radius:8px;padding:8px}
.hero{display:grid;grid-template-columns:1.3fr .8fr;gap:16px}.hero p{line-height:1.7;color:#c5d1cf} .eyebrow{font-size:11px;letter-spacing:1.6px;color:var(--gold);text-transform:uppercase;font-weight:700}
.metrics{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}.metric{background:#0d1822;border:1px solid #29414f;border-radius:14px;padding:12px}.metric .k{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:var(--muted)}.metric .v{font-size:22px;color:#f5d79e;font-weight:700;margin-top:4px}
#vizCard svg{width:100%;height:auto;border-radius:16px;background:#0c1a27;border:1px solid #294150}
.controlsBar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px}.btn{background:#86d7c8;color:#0b1816;border:none;border-radius:10px;padding:10px 14px;font-weight:700;cursor:pointer}.btn.secondary{background:transparent;color:#edf5f3;border:1px solid #50707f}.btn.warn{background:#d8ab64;color:#16120b}
.timeline{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:center;margin-top:10px}
.panels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.panel{background:#0d1822;border:1px solid #29414f;border-radius:16px;padding:12px}.panel h3{margin:0 0 10px;font-size:16px}.formula{font-size:11px;color:var(--muted);border:1px solid #253b4a;border-radius:10px;padding:8px;background:#0a141d;margin-bottom:10px}.kv{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.kv div{background:#14232f;border:1px solid #2b4554;border-radius:10px;padding:8px}.kv small{display:block;color:var(--muted)}.kv b{font-size:18px;color:#f3d39c}
.tableWrap{overflow:auto} table{width:100%;border-collapse:collapse;font-size:12px;min-width:860px} th,td{padding:10px 8px;border-bottom:1px solid #29414f;text-align:left;vertical-align:top} th{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:var(--muted)}
.risks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.risk{background:#0d1822;border:1px solid #29414f;border-radius:14px;padding:12px}.badge{display:inline-block;border-radius:999px;padding:4px 8px;font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase}.ok{background:#183126;color:var(--ok)}.warn{background:#3b3017;color:var(--warn)}.bad{background:#3c2025;color:var(--bad)}
.small{font-size:12px;color:var(--muted)}
@media(max-width:1250px){.wrap{grid-template-columns:1fr}.sidebar{position:static;max-height:none}.metrics{grid-template-columns:repeat(3,minmax(0,1fr))}.hero,.panels,.risks{grid-template-columns:1fr}}
</style>
</head>
<body>
<header>
  <div><h1>FREYA REVISION 8</h1><div class="sub">Integrated ChatGPT Sites version · 3D visualization and live engineering controls</div></div>
  <div class="small">All controls are manually adjustable and linked to one shared mission model.</div>
</header>
<div class="wrap">
  <aside class="sidebar">
    <div class="group">
      <h3>How to use this page</h3>
      <p>This Sites-ready page exposes the active mission assumptions as manual controls. Play runs the mission in 0.5 s steps, updates the 3D-style visualization, populates the telemetry table, and recalculates all engineering panels from the same state vector.</p>
      <div class="controlsBar">
        <button class="btn" id="playBtn">Play mission</button>
        <button class="btn secondary" id="pauseBtn">Pause</button>
        <button class="btn secondary" id="stepBtn">+0.5 s</button>
        <button class="btn secondary" id="resetBtn">Reset</button>
      </div>
      <div class="timeline"><span class="small">Timeline</span><input id="timeline" type="range" min="0" max="240" step="0.5" value="0"><span id="timeReadout" class="small">0.0 s</span></div>
      <div class="timeline"><span class="small">Playback speed</span><input id="playSpeed" type="range" min="0.5" max="8" step="0.5" value="2"><span id="speedReadout" class="small">2.0×</span></div>
    </div>
    <div id="controlGroups"></div>
  </aside>
  <main class="main">
<section class="card"><a href="FREYA_Engineering_Study_Revision_8_Fully_Integrated.pdf">Download Revision 8 report (PDF)</a> · <a href="FREYA_Engineering_Study_Revision_8_Fully_Integrated.docx">Editable Word report</a> · <a href="https://freya-revision-4.abuzzpixie66.chatgpt.site/revision7.html">Revision 7 engineering studies</a> · <a href="https://freya-revision-4.abuzzpixie66.chatgpt.site/review.html">Retained evidence reader</a><p class="small">Preliminary concept visualization. The timeline is illustrative; penetration, impact spread, thermal and sterilization scores are simplified assumptions, not calibrated predictions or qualification results. Perspective graphics are not to scale.</p></section>
    <section class="card hero">
      <div>
        <div class="eyebrow">Landing + first engineering page</div>
        <h2 style="margin:8px 0 12px">FREYA mission simulator with 3D-style visualization</h2>
        <p>This version improves the realism of the mission view and keeps the visual state aligned with the active parameter set. Numeric displays for penetration depth, science package mass, impact spread, mission phase, impact velocity, power duration, and communications margin are shown live. Legacy Sites-study assumptions for geometry, tether, potting, thermal attenuation, communications, and planetary protection are now active controls rather than disconnected reference values.</p>
        <div class="small">Model boundary: this is a first-order engineering trade simulator. It is designed to expose sensitivity and blockers, not certify a flight-ready Mars penetrator mission.</div>
      </div>
      <div class="card" style="padding:12px;background:#0d1822">
        <div class="small">Current mission status summary</div>
        <div class="metrics" style="grid-template-columns:repeat(2,minmax(0,1fr));margin-top:8px">
          <div class="metric"><div class="k">Mission phase</div><div class="v" id="mPhase">Approach</div></div>
          <div class="metric"><div class="k">Probe spread</div><div class="v" id="mSpread">0 m</div></div>
          <div class="metric"><div class="k">Penetration depth</div><div class="v" id="mPen">0.00 m</div></div>
          <div class="metric"><div class="k">Science package mass</div><div class="v" id="mSciMass">0.00 kg</div></div>
          <div class="metric"><div class="k">Impact velocity</div><div class="v" id="mImpactV">0 m/s</div></div>
          <div class="metric"><div class="k">Power duration</div><div class="v" id="mPower">0 h</div></div>
        </div>
      </div>
    </section>

    <section class="card" id="vizCard">
      <div class="metrics" style="margin-bottom:12px">
        <div class="metric"><div class="k">Mission phase</div><div class="v" id="topPhase">Approach</div></div>
        <div class="metric"><div class="k">First release altitude</div><div class="v" id="topRelease">0 km</div></div>
        <div class="metric"><div class="k">Impact spread</div><div class="v" id="topSpread">0 m</div></div>
        <div class="metric"><div class="k">Science depth</div><div class="v" id="topScienceDepth">0.00 m</div></div>
        <div class="metric"><div class="k">Comms margin</div><div class="v" id="topComms">0 dB</div></div>
        <div class="metric"><div class="k">Planetary protection</div><div class="v" id="topPP">Open</div></div>
      </div>
      <div class="controlsBar" style="margin-bottom:10px"><button class="btn secondary" id="camAuto">Auto camera</button><button class="btn secondary" id="camWide">Full mission</button><button class="btn secondary" id="camClose">Release close-up</button><button class="btn warn" id="jumpRelease">Start at probe release</button><span class="small" id="cameraStatus">Camera: automatic</span></div>
      <svg id="scene" viewBox="0 0 1200 720" aria-label="3D style mission visualization">
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#08111f"/><stop offset="0.55" stop-color="#0e2135"/><stop offset="1" stop-color="#49332b"/></linearGradient>
          <radialGradient id="marsR" cx="38%" cy="35%"><stop offset="0" stop-color="#e0a17d"/><stop offset="0.58" stop-color="#bf735d"/><stop offset="1" stop-color="#6f3831"/></radialGradient>
          <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7c5645"/><stop offset="1" stop-color="#503127"/></linearGradient>
          <linearGradient id="shieldGrad" x1="0" x2="1"><stop offset="0" stop-color="#f4f1e9"/><stop offset="1" stop-color="#b4c7cb"/></linearGradient>
          <filter id="shadow"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity="0.4"/></filter>
        </defs>
        <rect width="1200" height="720" fill="url(#sky)"/>
        <g id="stars"></g>
        <g transform="translate(0,0)" opacity="0.95">
          <ellipse cx="845" cy="292" rx="255" ry="205" fill="none" stroke="#8eb3c7" stroke-width="2.5" stroke-dasharray="10 8"/>
          <ellipse cx="845" cy="292" rx="215" ry="172" fill="none" stroke="#54738a" stroke-width="1.3" opacity="0.5"/>
          <circle cx="845" cy="292" r="188" fill="url(#marsR)" stroke="#e0ab88" stroke-width="2.2" filter="url(#shadow)"/>
          <ellipse cx="805" cy="252" rx="95" ry="42" fill="#efc0a1" opacity="0.18"/>
          <ellipse cx="852" cy="312" rx="140" ry="120" fill="#88b6d2" opacity="0.06"/>
        </g>
        <path d="M0 554 C140 540 290 530 438 534 C622 539 760 565 1200 566 V720 H0 Z" fill="url(#ground)"/>
        <path d="M0 577 C184 562 376 563 544 575 C747 590 937 596 1200 590" fill="none" stroke="#8f6553" stroke-width="2" opacity="0.55"/>
        <g id="entryPath"><path d="M72 116 C258 106 422 118 606 202 C696 243 745 296 785 363" fill="none" stroke="#f2d7a2" stroke-width="3" stroke-dasharray="11 8"/></g>
        <g id="descentPath"><path d="M786 363 C776 402 754 454 718 515" fill="none" stroke="#ffc289" stroke-width="3" stroke-dasharray="8 6"/></g>
        <g id="carrier" transform="translate(112 118) rotate(10)">
          <g filter="url(#shadow)">
            <path d="M-32 -15 L20 -12 L30 0 L20 12 L-32 15 Z" fill="#dfe8e7"/>
            <path d="M-36 -17 L-36 17" stroke="#ffbf75" stroke-width="8"/>
            <rect x="-10" y="-9" width="20" height="18" fill="#7cd3c3" opacity="0.8" rx="2"/>
          </g>
        </g>
        <g id="heatPlume" opacity="0"><ellipse cx="118" cy="118" rx="65" ry="28" fill="#ff9b5d" opacity="0.45"/><ellipse cx="118" cy="118" rx="38" ry="16" fill="#ffe0a9" opacity="0.55"/></g>
        <g id="probeCloud"></g>
        <g id="subsurface" transform="translate(985 566)">
          <ellipse cx="0" cy="0" rx="68" ry="16" fill="#5a3d31" opacity="0.65"/>
          <path d="M0 -110 L30 -87 V20 H-30 V-87 Z" fill="#dce4e3" stroke="#13212b" stroke-width="1.5" filter="url(#shadow)"/>
          <path d="M-30 20 Q0 85 30 20" fill="#edf3f2" stroke="#d5e1df" stroke-width="1.2"/>
          <rect x="-9" y="-44" width="18" height="36" fill="#efc889" rx="2"/>
          <path id="tetherLine" d="M-30 -14 C-88 -54 -168 -76 -250 -78" fill="none" stroke="#e1b86e" stroke-width="2.2" stroke-dasharray="6 4"/>
          <g id="surfaceAntenna" transform="translate(-260,-82)">
            <path d="M0 0 L0 -36" stroke="#dbe8e5" stroke-width="3"/>
            <path d="M-12 -26 L0 -34 L12 -26" fill="none" stroke="#8bd4c8" stroke-width="2"/>
            <rect x="-10" y="0" width="20" height="8" fill="#dbe8e5" rx="2"/>
          </g>
        </g>
        <g font-size="15" fill="#eef4f1">
          <text x="68" y="98">Approach / orbit</text>
          <text x="394" y="122">Deorbit</text>
          <text x="654" y="255">Entry and heating</text>
          <text x="720" y="423">Release & descent</text>
          <text x="930" y="676">Penetration & science</text>
        </g>
      </svg>
      <div class="small" style="margin-top:8px">The visualization uses perspective, shading, and depth cues for readability. Motion and numeric displays are driven by the same current slider settings and 0.5 s mission-step model.</div>
    </section>

    <section class="card">
      <h2 style="margin-top:0">Assumption-specific engineering panels</h2>
      <div class="panels">
        <div class="panel"><h3>Heating</h3><div class="formula">q* ~ sqrt(rho) × (V/3500)^3 × sqrt(1.10/Dshield) × entry-angle factor</div><div class="kv"><div><small>Peak heat index</small><b id="heatIdx">0.00×</b></div><div><small>Integrated heat load</small><b id="heatLoad">0.00×</b></div><div><small>Ballistic coefficient</small><b id="ballistic">0</b></div><div><small>Thermal attenuation</small><b id="thermalAttn">0.00×</b></div></div></div>
        <div class="panel"><h3>g loads</h3><div class="formula">Entry and impact load screens are recomputed from entry state, drag, impact velocity, and stopping distance.</div><div class="kv"><div><small>Peak entry g</small><b id="entryG">0 g</b></div><div><small>Impact g</small><b id="impactG">0 g</b></div><div><small>Structure note</small><b id="structureNote">—</b></div><div><small>Electronics note</small><b id="electronicsNote">—</b></div></div></div>
        <div class="panel"><h3>Impact velocity</h3><div class="formula">Vimpact blends chute terminal velocity, residual horizontal energy, and available release altitude.</div><div class="kv"><div><small>Terminal V</small><b id="terminalV">0</b></div><div><small>Impact V</small><b id="impactV">0</b></div><div><small>Drogue force</small><b id="drogueForce">0</b></div><div><small>Probe spread</small><b id="panelSpread">0</b></div></div></div>
        <div class="panel"><h3>Penetration depth</h3><div class="formula">Depth ~ kinetic energy / (material resistance × frontal area × tilt penalty).</div><div class="kv"><div><small>Body depth</small><b id="bodyDepth">0</b></div><div><small>Science depth</small><b id="scienceDepth">0</b></div><div><small>Target depth</small><b id="targetDepth">0</b></div><div><small>Depth margin</small><b id="depthMargin">0</b></div></div></div>
        <div class="panel"><h3>Mass closure</h3><div class="formula">One shared mass ledger includes science, structure, potting, tether, parachute, battery, and carrier allowance.</div><div class="kv"><div><small>Probe closure</small><b id="probeClosure">0</b></div><div><small>Carrier allowance</small><b id="carrierAllowance">0</b></div><div><small>Internal cavity</small><b id="cavityVol">0</b></div><div><small>Science fit margin</small><b id="scienceFit">0</b></div></div></div>
        <div class="panel"><h3>Power & thermal</h3><div class="formula">Duration = usable battery energy / average load. Thermal screen uses insulation thickness and conductivity.</div><div class="kv"><div><small>Usable energy</small><b id="usableWh">0</b></div><div><small>Average load</small><b id="avgLoad">0</b></div><div><small>Power duration</small><b id="powerHours">0</b></div><div><small>Battery temperature screen</small><b id="tempScreen">—</b></div></div></div>
        <div class="panel"><h3>Comms & planetary protection</h3><div class="formula">Link margin uses a simplified UHF link budget. Sterility screen trades process choice, dose, and compatibility.</div><div class="kv"><div><small>Link margin</small><b id="linkMargin">0</b></div><div><small>Data/day</small><b id="dataPerDay">0</b></div><div><small>Sterility score</small><b id="sterilityScore">0</b></div><div><small>Compatibility score</small><b id="compatibilityScore">0</b></div></div></div>
      </div>
    </section>

    <section class="card">
      <h2 style="margin-top:0">Mission sequence computed from current settings</h2>
      <div class="tableWrap"><table><thead><tr><th>Phase</th><th>Sim time</th><th>Altitude / depth</th><th>Velocity</th><th>Key computed values</th><th>Implication</th></tr></thead><tbody id="phaseTable"></tbody></table></div>
    </section>

    <section class="card">
      <h2 style="margin-top:0">Live telemetry for the current mission run</h2>
      <div class="small">Telemetry rows below are generated from the mission currently being played. Reset clears the mission run and starts a new table.</div>
      <div class="tableWrap"><table><thead><tr><th>Time</th><th>Phase</th><th>Altitude / depth</th><th>Velocity</th><th>Heat ×</th><th>g</th><th>Pen depth</th><th>Battery Wh</th><th>Comms margin</th></tr></thead><tbody id="telemetryBody"></tbody></table></div>
    </section>

    <section class="card">
      <h2 style="margin-top:0">Automatic risk flags</h2>
      <div class="risks" id="riskGrid"></div>
    </section>
  </main>
</div>
<script>
const MODEL = {
  groups:[
    {title:'Entry, orbit, and vehicle', note:'These settings drive deorbit, entry heating, drag, and carrier allowance.', controls:[
      ['entryMass','Entry mass','kg',30,90,45,1],['probeCount','Probe count','',1,10,6,1],['penetratorMass','Penetrator mass','kg',2,8,4,0.1],['shieldDiameter','Heat-shield diameter','m',0.7,2.4,1.10,0.05],['interfaceVelocity','Interface velocity','m/s',2800,4200,3450,25],['entryAngle','Entry angle','deg',-20,-2,-13,0.5],['densityFactor','Atmospheric density factor','×',0.5,1.5,1.0,0.05],['entryCd','Entry drag coefficient','—',0.8,1.8,1.25,0.05],['orbitAltitude','Parking orbit altitude','km',150,500,250,10],['carrierMass','Carrier wet mass','kg',100,1000,450,25],['deorbitThrust','Deorbit thrust','N',10,1000,100,10],['specificImpulse','Specific impulse','s',160,340,220,5]
    ]},
    {title:'Probe geometry and structure', note:'These are the linked geometry, structure, tether, and potting assumptions.', controls:[
      ['penetratorDiameter','Penetrator diameter','mm',35,100,70,1],['penetratorLength','Penetrator body length','mm',160,650,380,10],['wallThickness','Wall thickness','mm',1,7,2.5,0.25],['noseAngle','Nose half-angle','deg',10,45,22,1],['scienceMass','Science package mass','kg',0.25,2.0,1.0,0.05],['scienceDensity','Science package density','kg/L',0.4,3.0,1.3,0.05],['structurePottingMass','Structure & potting allocation','kg',0.5,4.0,2.0,0.05],['pottingDensity','Potting density','kg/L',0.6,2.5,1.2,0.05],['pottingFill','Potting fill fraction','%',5,95,50,5],['tetherLength','Tether length','m',0,4,1.0,0.05],['tetherLinearMass','Tether mass','g/m',0,120,30,2],['inletSetback','Science inlet setback','m',0.05,0.6,0.25,0.01]
    ]},
    {title:'Release, descent, and impact', note:'These sliders drive the impact spread, final descent, and penetration results.', controls:[
      ['releaseAltitude','Release altitude','km AGL',2,16,10,0.5],['releaseGap','Release spacing','s',0.5,8.0,2.0,0.5],['chuteDiameter','Chute diameter','m',0.05,1.5,0.25,0.01],['chuteCd','Chute drag coefficient','—',0.8,1.6,1.2,0.05],['impactTilt','Impact tilt','deg',0,45,5,1],['targetDepth','Target penetration depth','m',0.25,2.0,0.75,0.05],['surfaceMaterial','Surface material','select',['dry','damp','ice'],null,'dry',1]
    ]},
    {title:'Power, thermal, and communications', note:'The older Sites studies for thermal attenuation, power, and comms are live linked here.', controls:[
      ['batteryMass','Battery / heaters / controller mass','kg',0.2,1.0,0.5,0.05],['batterySpecificEnergy','Battery specific energy','Wh/kg',120,320,220,5],['usableBatteryFraction','Usable battery fraction','%',40,95,70,1],['heaterLoad','Average heater load','W',1,40,8,1],['controllerLoad','Controller / comms load','W',0.5,12,3,0.5],['insulationThickness','Insulation thickness','mm',2,40,12,1],['insulationConductivity','Insulation conductivity','W/mK',0.015,0.20,0.04,0.005],['soilConductivity','Soil conductivity','W/mK',0.02,1.0,0.10,0.02],['thermalDiffusivity','Thermal diffusivity','mm²/s',0.02,0.80,0.12,0.02],['radioPower','Radio power','W',0.1,5.0,1.0,0.1],['antennaGain','Combined antenna gain','dBi',-15,15,0,1],['relayRange','Relay range','km',200,5000,1000,50],['dataRate','Data rate','kbps',0.1,50,1.0,0.1]
    ]},
    {title:'Planetary protection trade', note:'Process and dose are directly adjustable and linked to sterility and compatibility screens.', controls:[
      ['ppProcess','Process','select',['none','gamma','e-beam','dry heat','vhp'],null,'gamma',1],['irradiationDose','Irradiation dose','kGy',0,60,20,1],['bioburdenStart','Initial bioburden log10','log CFU',0,8,4,0.5],['assemblyCleanliness','Assembly cleanliness score','%',0,100,70,5]
    ]}
  ],
  materials:{dry:{name:'Dry competent sandstone',coeff:2.10e7},damp:{name:'Damp sandstone analog',coeff:1.45e7},ice:{name:'Solid ice',coeff:0.85e7}},
  ppFactors:{none:{sterile:0,compat:100},'gamma':{sterile:0.28,compat:1.0},'e-beam':{sterile:0.24,compat:0.95},'dry heat':{sterile:0.12,compat:0.85},'vhp':{sterile:0.10,compat:0.92}}
};
const state = {};
const refs = {};
const controlsContainer = document.getElementById('controlGroups');
function makeControl(ctrl){
  const [id,label,unit,a,b,def,step] = ctrl;
  const wrap = document.createElement('label'); wrap.className='ctrl';
  const row = document.createElement('div'); row.className='row';
  const left = document.createElement('span'); left.textContent = label; const right = document.createElement('b');
  row.append(left,right); wrap.append(row);
  let input;
  if(unit==='select'){
    input = document.createElement('select');
    a.forEach(v=>{ const opt=document.createElement('option'); opt.value=v; opt.textContent=(MODEL.materials[v]&&MODEL.materials[v].name) || ({none:'No sterilization',gamma:'Gamma irradiation','e-beam':'Electron beam','dry heat':'Dry heat','vhp':'Vapor hydrogen peroxide'}[v]||v); input.append(opt);});
    input.value = def; right.textContent = input.options[input.selectedIndex].textContent;
    input.oninput=()=>{state[id]=input.value; right.textContent=input.options[input.selectedIndex].textContent; recalcAll(true);} ;
  } else {
    input = document.createElement('input'); input.type='range'; input.min=a; input.max=b; input.step=step; input.value=def;
    right.textContent = `${def} ${unit}`;
    input.oninput=()=>{state[id]=Number(input.value); right.textContent = `${input.value} ${unit}`; recalcAll(true);} ;
  }
  refs[id]=input; state[id]=(unit==='select'?def:Number(def));
  wrap.append(input); return wrap;
}
MODEL.groups.forEach(g=>{
  const box=document.createElement('div'); box.className='group'; box.innerHTML=`<h3>${g.title}</h3><p>${g.note}</p>`;
  g.controls.forEach(c=>box.append(makeControl(c))); controlsContainer.append(box);
});
const starG = document.getElementById('stars'); for(let i=0;i<70;i++){ const c=document.createElementNS('http://www.w3.org/2000/svg','circle'); c.setAttribute('cx', (20+Math.random()*1160).toFixed(1)); c.setAttribute('cy',(20+Math.random()*240).toFixed(1)); c.setAttribute('r',(0.8+Math.random()*1.6).toFixed(1)); c.setAttribute('fill','#fff'); c.setAttribute('opacity',(0.35+Math.random()*0.55).toFixed(2)); starG.appendChild(c); }
let simTime=0, timer=null, telemetry=[], cameraMode='auto', cameraView=[0,0,1200,720];
function fmt(n,d=2){ return (Number.isFinite(n)?Number(n).toFixed(d):'—'); }
function phaseAt(t){ if(t<50) return 'Approach'; if(t<80) return 'Deorbit'; if(t<140) return 'Entry'; if(t<165) return 'Peak heating'; if(t<185) return 'Release'; if(t<225) return 'Drogue descent'; if(t<238) return 'Impact'; return 'Subsurface science'; }
function computeCurrent(){
  const s=state, gMars=3.71, rho=0.020*s.densityFactor;
  const shieldArea = Math.PI*(s.shieldDiameter/2)**2;
  const ballistic = s.entryMass/(Math.max(0.01,s.entryCd)*shieldArea);
  const angFactor = Math.pow(Math.sin(Math.abs(s.entryAngle)*Math.PI/180)/Math.sin(12*Math.PI/180),0.35);
  const heatIdx = Math.sqrt(s.densityFactor)*Math.pow(s.interfaceVelocity/3500,3)*Math.sqrt(1.10/s.shieldDiameter)*angFactor;
  const heatLoad = heatIdx*(1.15+0.35*(12/Math.abs(s.entryAngle)));
  const entryG = 4.8*s.densityFactor*Math.pow(s.interfaceVelocity/3450,1.85)*Math.pow(1.10/s.shieldDiameter,0.65)*Math.pow(45/s.entryMass,0.85)*angFactor;
  const chuteArea = Math.PI*(s.chuteDiameter/2)**2;
  const termV = Math.sqrt((2*s.penetratorMass*gMars)/(rho*Math.max(0.2,s.chuteCd)*Math.max(chuteArea,1e-6)));
  const residual = Math.max(0,(0.06*s.interfaceVelocity + 1.6*Math.abs(s.entryAngle) + 18));
  const impactV = Math.max(termV, termV + (residual-termV)*Math.exp(-s.releaseAltitude*1000/4200));
  const dragForce = 0.5*rho*Math.max(0.2,s.chuteCd)*chuteArea*impactV*impactV;
  const probeRadius = s.penetratorDiameter/2000;
  const frontalArea = Math.PI*probeRadius*probeRadius;
  const tiltPenalty = 1 + 0.018*s.impactTilt;
  const coeff = MODEL.materials[s.surfaceMaterial].coeff;
  const KE = 0.5*s.penetratorMass*impactV*impactV;
  const bodyDepth = KE/(coeff*frontalArea*tiltPenalty);
  const scienceDepth = Math.max(0, bodyDepth - s.inletSetback);
  const depthMargin = bodyDepth - s.targetDepth;
  const stopDistance = Math.max(0.05, Math.min(bodyDepth, Math.max(0.12,2.2*(s.penetratorDiameter/1000))));
  const impactG = impactV*impactV/(2*stopDistance*9.80665);
  const OD = s.penetratorDiameter/1000, ID=Math.max(0.005,(s.penetratorDiameter-2*s.wallThickness)/1000), L=s.penetratorLength/1000;
  const extVolume = Math.PI*(OD/2)*(OD/2)*L;
  const intVolume = Math.PI*(ID/2)*(ID/2)*L;
  const steelMass = Math.PI*((OD/2)*(OD/2)-(ID/2)*(ID/2))*L*7850;
  const scienceVolume = s.scienceMass/Math.max(0.2,s.scienceDensity)/1000;
  const pottingMass = Math.max(0,(intVolume - scienceVolume))*s.pottingFill/100*s.pottingDensity*1000;
  const tetherMass = s.tetherLength*s.tetherLinearMass/1000;
  const structureResidual = s.structurePottingMass - (steelMass + pottingMass + tetherMass);
  const parachuteMass = 0.5;
  const probeClosure = s.penetratorMass - (s.scienceMass + s.batteryMass + s.structurePottingMass + parachuteMass);
  const carrierAllowance = s.entryMass - s.probeCount*s.penetratorMass;
  const scienceFit = (intVolume - scienceVolume)*1000;
  const usableWh = s.batteryMass*s.batterySpecificEnergy*(s.usableBatteryFraction/100);
  const avgLoad = s.heaterLoad + s.controllerLoad + 1.5 + 2.5*s.scienceMass;
  const powerHours = usableWh/Math.max(0.2,avgLoad);
  const tau = Math.exp(-Math.max(0,s.insulationThickness)/(8+60*s.insulationConductivity));
  const tempPenalty = (s.soilConductivity/0.1) * (0.12/Math.max(0.01,s.thermalDiffusivity));
  const tempScreen = 1 - Math.min(0.95, tau*0.75*tempPenalty);
  const pathLoss = 32.44 + 20*Math.log10(400) + 20*Math.log10(s.relayRange);
  const rxLevel = 30 + 10*Math.log10(s.radioPower) + s.antennaGain - pathLoss;
  const noise = -174 + 10*Math.log10(s.dataRate*1000) + 6;
  const linkMargin = rxLevel - noise - 6;
  const dataPerDay = (s.dataRate*1000/8)*3600*24/1e6;
  const f = MODEL.ppFactors[s.ppProcess];
  const sterilityScore = Math.max(0, s.assemblyCleanliness/100 * (f.sterile*s.irradiationDose) - s.bioburdenStart);
  const compatibilityScore = Math.max(0, 100 - (s.irradiationDose*(1-f.compat))*2 - Math.max(0,s.irradiationDose-25)*0.8);
  const releaseHVel = (0.18*s.interfaceVelocity)*Math.exp(-s.releaseAltitude/16);
  const meanSpacing = s.releaseGap * releaseHVel * (0.10 + 0.06*Math.min(1.5,s.chuteDiameter)) * (1.10/Math.max(0.7,s.shieldDiameter));
  const totalSpread = Math.max(0, meanSpacing*(s.probeCount-1));
  const deorbitDV = 61.56*Math.sqrt(s.orbitAltitude/250);
  const propellant = s.carrierMass*(1-Math.exp(-deorbitDV/(s.specificImpulse*9.80665)));
  const burnTime = propellant*s.specificImpulse*9.80665/Math.max(1,s.deorbitThrust);
  return {ballistic,heatIdx,heatLoad,entryG,termV,impactV,dragForce,bodyDepth,scienceDepth,depthMargin,impactG,intVolume,scienceVolume,steelMass,pottingMass,tetherMass,structureResidual,probeClosure,carrierAllowance,scienceFit,usableWh,avgLoad,powerHours,tau,tempScreen,linkMargin,dataPerDay,sterilityScore,compatibilityScore,totalSpread,meanSpacing,deorbitDV,propellant,burnTime};
}
function stateAt(t,calc){
  const phase = phaseAt(t);
  let alt=0, depth=0, vel=0, heat=0, g=0;
  if(t<50){ alt = 250; vel = 3430; }
  else if(t<80){ alt = 250 - (t-50)*1.5; vel = 3430 - (calc.deorbitDV*(t-50)/30); }
  else if(t<140){ const p=(t-80)/60; alt = 125 - 117*p; vel = state.interfaceVelocity - (state.interfaceVelocity-420)*Math.pow(p,0.8); heat = calc.heatIdx*Math.sin(Math.min(1,p)*Math.PI); g = calc.entryG*Math.sin(Math.min(1,p)*Math.PI*0.85); }
  else if(t<165){ const p=(t-140)/25; alt = 8 - 4*p; vel = 420 - (420-160)*p; heat = calc.heatIdx*(1-p); g = calc.entryG*(1-p*0.6); }
  else if(t<185){ const p=(t-165)/20; alt = state.releaseAltitude - 2.2*p; vel = 160 - (160-calc.termV)*p; }
  else if(t<225){ const p=(t-185)/40; alt = Math.max(0.02, (state.releaseAltitude-2.2)*(1-p)); vel = calc.termV + (calc.impactV-calc.termV)*p; }
  else if(t<238){ const p=(t-225)/13; alt = Math.max(0, 0.02*(1-p)); vel = calc.impactV; g = calc.impactG*Math.pow(p,0.6); depth = calc.bodyDepth*p; }
  else { depth = calc.bodyDepth; alt = -depth; vel = 0; g = 0; }
  return {phase,alt,depth,vel,heat,g};
}
function applyCamera(){
  const zoom = cameraMode==='close' || (cameraMode==='auto' && simTime>=165);
  // Close-up keeps the probe stream and impact zone together in one frame.
  const target = zoom ? [575,335,625,360] : [0,0,1200,720];
  cameraView = cameraView.map((n,i)=>n+(target[i]-n)*0.22);
  document.getElementById('scene').setAttribute('viewBox',cameraView.map(n=>n.toFixed(2)).join(' '));
  document.getElementById('cameraStatus').textContent = 'Camera: '+(cameraMode==='auto'?(zoom?'automatic release close-up':'automatic wide view'):cameraMode==='close'?'release close-up':'full mission');
}
function updateVisualization(calc, st){
  applyCamera();
  document.getElementById('mPhase').textContent = st.phase;
  document.getElementById('mSpread').textContent = `${fmt(calc.totalSpread,0)} m`;
  document.getElementById('mPen').textContent = `${fmt(calc.bodyDepth,2)} m`;
  document.getElementById('mSciMass').textContent = `${fmt(state.scienceMass,2)} kg`;
  document.getElementById('mImpactV').textContent = `${fmt(calc.impactV,0)} m/s`;
  document.getElementById('mPower').textContent = `${fmt(calc.powerHours,1)} h`;
  document.getElementById('topPhase').textContent = st.phase;
  document.getElementById('topRelease').textContent = `${fmt(state.releaseAltitude,1)} km`;
  document.getElementById('topSpread').textContent = `${fmt(calc.totalSpread,0)} m`;
  document.getElementById('topScienceDepth').textContent = `${fmt(calc.scienceDepth,2)} m`;
  document.getElementById('topComms').textContent = `${fmt(calc.linkMargin,1)} dB`;
  document.getElementById('topPP').textContent = calc.sterilityScore>1 && calc.compatibilityScore>65 ? 'Screened' : 'Open';
  document.getElementById('heatIdx').textContent = `${fmt(calc.heatIdx,2)}×`;
  document.getElementById('heatLoad').textContent = `${fmt(calc.heatLoad,2)}×`;
  document.getElementById('ballistic').textContent = `${fmt(calc.ballistic,0)} kg/m²`;
  document.getElementById('thermalAttn').textContent = `${fmt(calc.tau,2)}×`;
  document.getElementById('entryG').textContent = `${fmt(calc.entryG,1)} g`;
  document.getElementById('impactG').textContent = `${fmt(calc.impactG,0)} g`;
  document.getElementById('structureNote').textContent = calc.impactG<2500?'Lower concept range':calc.impactG<10000?'High shock design':'Extreme shock';
  document.getElementById('electronicsNote').textContent = calc.impactG<5000?'Hardening required':calc.impactG<20000?'DS2-like regime':'Beyond typical screen';
  document.getElementById('terminalV').textContent = `${fmt(calc.termV,0)} m/s`;
  document.getElementById('impactV').textContent = `${fmt(calc.impactV,0)} m/s`;
  document.getElementById('drogueForce').textContent = `${fmt(calc.dragForce,0)} N`;
  document.getElementById('panelSpread').textContent = `${fmt(calc.meanSpacing,0)} m avg`;
  document.getElementById('bodyDepth').textContent = `${fmt(calc.bodyDepth,2)} m`;
  document.getElementById('scienceDepth').textContent = `${fmt(calc.scienceDepth,2)} m`;
  document.getElementById('targetDepth').textContent = `${fmt(state.targetDepth,2)} m`;
  document.getElementById('depthMargin').textContent = `${fmt(calc.depthMargin,2)} m`;
  document.getElementById('probeClosure').textContent = `${fmt(calc.probeClosure,2)} kg`;
  document.getElementById('carrierAllowance').textContent = `${fmt(calc.carrierAllowance,2)} kg`;
  document.getElementById('cavityVol').textContent = `${fmt(calc.intVolume*1000,2)} L`;
  document.getElementById('scienceFit').textContent = `${fmt(calc.scienceFit,2)} L`;
  document.getElementById('usableWh').textContent = `${fmt(calc.usableWh,0)} Wh`;
  document.getElementById('avgLoad').textContent = `${fmt(calc.avgLoad,1)} W`;
  document.getElementById('powerHours').textContent = `${fmt(calc.powerHours,1)} h`;
  document.getElementById('tempScreen').textContent = calc.tempScreen>0.55?'Strong attenuation':calc.tempScreen>0.25?'Moderate attenuation':'Weak attenuation';
  document.getElementById('linkMargin').textContent = `${fmt(calc.linkMargin,1)} dB`;
  document.getElementById('dataPerDay').textContent = `${fmt(calc.dataPerDay,2)} MB/day`;
  document.getElementById('sterilityScore').textContent = `${fmt(calc.sterilityScore,1)}`;
  document.getElementById('compatibilityScore').textContent = `${fmt(calc.compatibilityScore,0)}/100`;
  const craft=document.getElementById('carrier'); const plume=document.getElementById('heatPlume'); const cloud=document.getElementById('probeCloud');
  let x=112,y=118,rot=10,scale=1.0; const p=simTime/240;
  if(simTime<50){x=112 + simTime*5.2; y=118 + Math.sin(simTime/7)*5; rot=10;}
  else if(simTime<80){x=372 + (simTime-50)*4.2; y=126 + (simTime-50)*1.2; rot=16;}
  else if(simTime<140){ const q=(simTime-80)/60; x=498 + q*212; y=162 + q*188; rot=26+q*55; }
  else if(simTime<165){ const q=(simTime-140)/25; x=710 + q*48; y=350 + q*65; rot=82; }
  else if(simTime<185){ const q=(simTime-165)/20; x=758 - q*38; y=415 + q*36; rot=88; }
  else if(simTime<225){ const q=(simTime-185)/40; x=720 - q*30; y=451 + q*52; rot=90; }
  else { x=690; y=506; rot=90; }
  scale = Math.max(0.8, state.shieldDiameter/1.1);
  craft.setAttribute('transform',`translate(${x} ${y}) rotate(${rot}) scale(${scale})`);
  plume.setAttribute('opacity', (st.phase==='Entry'||st.phase==='Peak heating') ? Math.min(0.9, calc.heatIdx/1.4) : 0);
  plume.setAttribute('transform',`translate(${x-6} ${y}) rotate(${rot}) scale(${0.8+calc.heatIdx*0.35})`);
  cloud.innerHTML='';
  if(simTime>=165){
    const count = Math.round(state.probeCount);
    for(let i=0;i<count;i++){
      const g=document.createElementNS('http://www.w3.org/2000/svg','g');
      const localT = Math.max(0, simTime-(165+i*state.releaseGap));
      const dx = i*calc.meanSpacing*0.38;
      let px = 760 + dx*0.22, py = 430 + dx*0.03;
      if(localT>0){ const q=Math.min(1, localT/55); px += 30*q; py += 160*q; }
      if(simTime>225+i*0.4){ py = 548; }
      g.setAttribute('transform',`translate(${px} ${py}) scale(${Math.max(0.7,state.penetratorDiameter/70)})`);
      g.innerHTML = `<path d="M-18 -16 Q0 -${18+state.chuteDiameter*28} 18 -16" fill="none" stroke="#f9e2ae" stroke-width="2.6"/><path d="M-15 -16 L0 0 L15 -16" fill="none" stroke="#eef4f2" stroke-width="1.4"/><path d="M-7 0 L7 0 L7 30 L0 41 L-7 30 Z" fill="#dce7e4" stroke="#15242d" stroke-width="1"/>`;
      cloud.appendChild(g);
    }
  }
  document.getElementById('tetherLine').setAttribute('d',`M-30 -14 C-${40+state.tetherLength*25} -${34+state.tetherLength*16} -${132+state.tetherLength*28} -${58+state.tetherLength*12} -${220+state.tetherLength*30} -${68+state.tetherLength*10}`);
  document.getElementById('surfaceAntenna').setAttribute('transform',`translate(${-260-state.tetherLength*16},${-82-state.tetherLength*2}) scale(${1+state.antennaGain/60})`);
}
function buildPhaseTable(calc){
  const rows = [
    ['Approach / parking orbit','0–50 s',`${fmt(250,0)} km orbit`,`${fmt(3430,0)} m/s`,`Carrier ${fmt(state.carrierMass,0)} kg, entry stack ${fmt(state.entryMass,1)} kg`,`Parking orbit assumed before deorbit.`],
    ['Deorbit burn','50–80 s',`${fmt(state.orbitAltitude,0)}→${fmt(state.orbitAltitude-45,0)} km`,`Δv ${fmt(calc.deorbitDV,1)} m/s`,`Burn time ${fmt(calc.burnTime,1)} s, propellant ${fmt(calc.propellant,1)} kg`,`Higher orbit or lower Isp increases deorbit burden.`],
    ['Atmospheric interface','80 s',`125 km`,`${fmt(state.interfaceVelocity,0)} m/s`,`Heat index ${fmt(calc.heatIdx,2)}×, ballistic ${fmt(calc.ballistic,0)} kg/m²`,`Sets primary heating and deceleration environment.`],
    ['Peak heating','~110 s',`~60 km`,`${fmt(state.interfaceVelocity*0.65,0)} m/s`,`Integrated load ${fmt(calc.heatLoad,2)}×, entry g ${fmt(calc.entryG,1)} g`,`TPS and internal thermal attenuation are stressed here.`],
    ['First release','165 s',`${fmt(state.releaseAltitude,1)} km AGL`,`~160 m/s`,`Probe count ${Math.round(state.probeCount)}, release gap ${fmt(state.releaseGap,1)} s`,`Release altitude controls time available for drogue drag.`],
    ['Drogue descent','185–225 s',`Descending to ~0 km`,`Terminal ${fmt(calc.termV,0)} m/s`,`Drogue ${fmt(state.chuteDiameter,2)} m, force ${fmt(calc.dragForce,0)} N`,`Very small drogues create stability and deployment risk.`],
    ['Impact spread','~225 s',`Surface`,`${fmt(calc.impactV,0)} m/s`,`Mean spacing ${fmt(calc.meanSpacing,0)} m, total spread ${fmt(calc.totalSpread,0)} m`,`Affects surface coverage and communications geometry.`],
    ['Penetration','225–238 s',`${fmt(calc.bodyDepth,2)} m body depth`,`0–${fmt(calc.impactV,0)} m/s`,`Science depth ${fmt(calc.scienceDepth,2)} m, impact g ${fmt(calc.impactG,0)} g`,`Material choice strongly changes achieved depth.`],
    ['Subsurface operations','238–240 s',`${fmt(calc.scienceDepth,2)} m science depth`,`Static`,`Power ${fmt(calc.powerHours,1)} h, link margin ${fmt(calc.linkMargin,1)} dB`,`Duration and relay geometry determine science return.`]
  ];
  const tbody=document.getElementById('phaseTable'); tbody.innerHTML = rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('');
}
function buildRisks(calc){
  const items=[];
  if(calc.probeClosure < -0.05) items.push(['Open blocker','Probe mass over-allocated by '+fmt(-calc.probeClosure,2)+' kg','bad']); else items.push(['Probe mass closes','Probe closure '+fmt(calc.probeClosure,2)+' kg','ok']);
  if(calc.carrierAllowance < 21) items.push(['Carrier shortfall','Carrier allowance '+fmt(calc.carrierAllowance,2)+' kg < 21 kg benchmark','bad']); else items.push(['Carrier allowance screen','Carrier allowance '+fmt(calc.carrierAllowance,2)+' kg','ok']);
  if(calc.depthMargin < 0) items.push(['Penetration miss','Estimated depth '+fmt(calc.bodyDepth,2)+' m < target '+fmt(state.targetDepth,2)+' m','bad']); else items.push(['Penetration met','Depth margin '+fmt(calc.depthMargin,2)+' m','ok']);
  if(calc.linkMargin < 3) items.push(['Weak communications link','Margin '+fmt(calc.linkMargin,1)+' dB','warn']); else items.push(['Communications margin','Margin '+fmt(calc.linkMargin,1)+' dB','ok']);
  if(calc.compatibilityScore < 60) items.push(['Sterilization compatibility concern','Compatibility score '+fmt(calc.compatibilityScore,0)+'/100','warn']); else items.push(['Sterility trade status','Sterility score '+fmt(calc.sterilityScore,1),'ok']);
  if(calc.impactG > 20000) items.push(['Extreme impact load','Impact shock '+fmt(calc.impactG,0)+' g','bad']); else if(calc.impactG > 5000) items.push(['High shock regime','Impact shock '+fmt(calc.impactG,0)+' g','warn']); else items.push(['Impact load screen','Impact shock '+fmt(calc.impactG,0)+' g','ok']);
  const rg=document.getElementById('riskGrid'); rg.innerHTML = items.map(i=>`<div class="risk"><span class="badge ${i[2]}">${i[0]}</span><p style="margin:10px 0 0;color:#d8e4e2">${i[1]}</p></div>`).join('');
}
function batteryLeft(calc){ return Math.max(0, calc.usableWh - calc.avgLoad*(simTime/3600)); }
function refreshTelemetry(calc){
  const tbody=document.getElementById('telemetryBody');
  tbody.innerHTML = telemetry.map(row=>`<tr><td>${fmt(row.t,1)} s</td><td>${row.phase}</td><td>${row.alt>=0?fmt(row.alt,2)+' km':fmt(-row.alt,2)+' m depth'}</td><td>${fmt(row.vel,0)} m/s</td><td>${fmt(row.heat,2)}×</td><td>${fmt(row.g,1)} g</td><td>${fmt(row.depth,2)} m</td><td>${fmt(row.batt,1)} Wh</td><td>${fmt(row.link,1)} dB</td></tr>`).join('');
}
function recordTelemetry(calc){
  const st=stateAt(simTime, calc);
  telemetry.push({t:simTime, phase:st.phase, alt:st.phase==='Subsurface science'?-calc.scienceDepth:st.alt, vel:st.vel, heat:st.heat, g:st.g||((st.phase==='Impact')?calc.impactG:0), depth:st.phase==='Impact'||st.phase==='Subsurface science'?Math.min(calc.bodyDepth, st.depth || calc.bodyDepth):0, batt:batteryLeft(calc), link:calc.linkMargin});
  if(telemetry.length>120) telemetry.shift();
  refreshTelemetry(calc);
}
function recalcAll(updateTelemetry){
  const calc = computeCurrent();
  const st = stateAt(simTime, calc);
  updateVisualization(calc, st); buildPhaseTable(calc); buildRisks(calc);
  document.getElementById('timeReadout').textContent = `${fmt(simTime,1)} s`;
  document.getElementById('speedReadout').textContent = `${fmt(Number(document.getElementById('playSpeed').value),1)}×`;
  if(updateTelemetry){ telemetry=[]; recordTelemetry(calc); }
}
function playTick(){ const calc=computeCurrent(); simTime=Math.min(240, simTime+0.5); document.getElementById('timeline').value=simTime; recordTelemetry(calc); const st=stateAt(simTime, calc); updateVisualization(calc, st); document.getElementById('timeReadout').textContent = `${fmt(simTime,1)} s`; if(simTime>=240) pausePlay(); }
function pausePlay(){ if(timer){ clearInterval(timer); timer=null; } }
document.getElementById('camAuto').onclick=()=>{cameraMode='auto';recalcAll(false);};
document.getElementById('camWide').onclick=()=>{cameraMode='wide';recalcAll(false);};
document.getElementById('camClose').onclick=()=>{cameraMode='close';recalcAll(false);};
document.getElementById('jumpRelease').onclick=()=>{pausePlay();simTime=165;document.getElementById('timeline').value=165;telemetry=[];recalcAll(true);};
document.getElementById('playBtn').onclick=()=>{ pausePlay(); timer=setInterval(playTick, 120/Math.max(0.5,Number(document.getElementById('playSpeed').value))); };
document.getElementById('pauseBtn').onclick=()=>pausePlay();
document.getElementById('stepBtn').onclick=()=>{ pausePlay(); playTick(); };
document.getElementById('resetBtn').onclick=()=>{ pausePlay(); simTime=0; document.getElementById('timeline').value=0; telemetry=[]; recalcAll(true); };
document.getElementById('timeline').oninput=e=>{ pausePlay(); simTime=Number(e.target.value); telemetry=[]; const calc=computeCurrent(); for(let t=0;t<=simTime+1e-9;t+=0.5){ const save=simTime; simTime=Number(t.toFixed(1)); recordTelemetry(calc); simTime=save; } recalcAll(false); };
document.getElementById('playSpeed').oninput=()=>{ document.getElementById('speedReadout').textContent = `${fmt(Number(document.getElementById('playSpeed').value),1)}×`; if(timer){ document.getElementById('playBtn').onclick(); document.getElementById('playBtn').onclick(); } };
recalcAll(true);
</script>
</body></html>
````
