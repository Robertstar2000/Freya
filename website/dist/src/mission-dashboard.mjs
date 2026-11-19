import {heatShieldInstrument,firingInstrument} from './thermal-propulsion-instruments.mjs?v=256072640f6f';
import {trajectoryConsole,orbitPath,gasInstrument} from './console-instruments.mjs?v=256072640f6f';
export const DASHBOARD_MARKUP=`<div class="md-heading"><div><span class="md-kicker">FREYA / FLIGHT DYNAMICS</span><h2>Mission control</h2></div><span id="mdStatus" class="md-status">SIMULATION • LOADING</span></div><div class="md-toolbar"><label>Vehicle configuration<select id="mdConfig"><option value="A">A · 2028 precursor</option><option value="B">B · 2031 science</option></select></label><button data-command="play">▶ Run</button><button data-command="pause">Ⅱ Pause</button><button data-command="step">Next event →</button><button data-command="reset">↺ Reset</button><label>Time compression<select id="mdSpeed"><option value="1">1×</option><option value="5">5×</option><option value="20">20×</option></select></label><a href="#flight-analysis">Flight inputs ↗</a></div><div class="md-panel"><div class="md-panel-title"><span>01 / TRAJECTORY CONTROL MONITOR</span><span id="mdClock">T + 0 s</span></div><div class="md-main"><div id="mdTrajectory"></div></div><div class="md-legend"><span>━ Computed trajectory</span><span class="md-red">◎ Current vehicle position</span><span>Mars frame · altitude exaggerated</span></div></div><div class="md-timeline"><label for="mdScrub">REVIEW TIMELINE <span id="mdPhase"></span></label><input id="mdScrub" type="range" min="0" max="100" value="0" step="0.1" aria-label="Mission control review timeline"></div><div class="md-panel md-telemetry"><div class="md-panel-title"><span>TELEMETRY CONTROL / SYNCHRONIZED MODEL</span><span>REV09</span></div><div id="mdReadouts" class="md-readout-strip"></div></div><div class="md-instrument-tools"><span>THERMAL / FIRING / GAS INVENTORY</span><button id="mdDetail" type="button" aria-pressed="false">Expand instruments</button></div><div class="md-instrument-scroll"><div class="md-panels"><div class="md-panel"><div class="md-panel-title">HEAT SHIELD / TEMPERATURE</div><div id="mdThermal"></div></div><div class="md-panel"><div class="md-panel-title">PROPULSION / FIRING</div><div id="mdFiring"></div></div><div class="md-panel"><div class="md-panel-title">TELEMETRY / COLD GAS</div><div id="mdGas"></div></div></div></div><div class="md-bottom-grid"><div><div class="md-panel-title">MISSION PHASE / REVIEW FOCUS</div><p id="mdEventDetail" class="md-event-detail"></p><details class="md-secondary"><summary id="mdWarningSummary">Flight trends, vehicle status and model warnings</summary><div id="mdVelocity"></div><div id="mdProbes"></div></details></div><div class="md-panel md-animation"><div class="md-panel-title">LIVE MISSION ANIMATION</div><div id="mdAnimation"></div><a href="#operations">Phase controls ↗</a></div></div><p id="mdLoadError" class="md-warning" hidden></p><noscript><p class="md-warning">Enable JavaScript to run live telemetry and playback.</p></noscript><p class="md-note">Calculated telemetry synchronized to the mission walkthrough. Long intervals are compressed by review phase. Preliminary engineering model; probe impact does not establish survival or science success.</p>`;
const n=(v,d=1)=>Number.isFinite(v)?v.toLocaleString(undefined,{maximumFractionDigits:d}):'—';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let root,signature='',series=[],orbitalPoints=[];
export function initDashboard(){
 root=document.getElementById('missionDashboard');
 const scene=document.getElementById('scene');
 root.innerHTML=DASHBOARD_MARKUP;
 if(scene){document.getElementById('mdAnimation').append(scene);scene.setAttribute('aria-label','Live mission phase animation synchronized with dashboard playback');}
 document.getElementById('mdDetail').onclick=e=>{const expanded=e.target.getAttribute('aria-pressed')!=='true';e.target.setAttribute('aria-pressed',String(expanded));e.target.textContent=expanded?'Fit instruments':'Expand instruments';root.classList.toggle('md-detail',expanded);};
 root.addEventListener('click',e=>{const b=e.target.closest('[data-command]');if(b)document.getElementById(b.dataset.command).click();});
 for(const [id,target] of [['mdConfig','config'],['mdSpeed','speed']])document.getElementById(id).onchange=e=>{const t=document.getElementById(target);t.value=e.target.value;t.dispatchEvent(new Event('change',{bubbles:true}));};
 document.getElementById('mdScrub').oninput=e=>{const t=document.getElementById('scrub');t.value=e.target.value;t.dispatchEvent(new Event('input',{bubbles:true}));};
}
export function dashboardSeries(f){
 if(!f?.burn)return [];
 const t=f.times??{burnStart:0,burnEnd:f.burn.duration,entryStart:f.burn.duration+(f.coast?.duration??0),descentStart:f.burn.duration+(f.coast?.duration??0)+(f.entry?.duration??0)},rows=[];
 for(const [data,start] of [[f.burn.rows,t.burnStart],[f.coast?.rows??[],t.burnEnd],[f.entry?.rows??[],t.entryStart],[f.descent?.rows??[],t.descentStart]])for(const r of data)rows.push({t:start+r.t-t.burnStart,alt:r.alt/1000,v:r.v});
 return rows;
}
export function dashboardChart(rows,key,{width=900,height=340,color='#82d9ed',cursor=null,label='Flight trajectory'}={}){
 if(!rows.length)return '<p class="md-empty">No complete flight solution available.</p>';
 const left=58,right=width-24,top=25,bottom=height-42,maxT=Math.max(1,...rows.map(r=>r.t)),maxV=Math.max(1,...rows.map(r=>r[key]).filter(Number.isFinite))*1.08;
 const x=t=>left+t/maxT*(right-left),y=v=>bottom-v/maxV*(bottom-top);
 let grid='';for(let i=0;i<=5;i++){const yy=top+(bottom-top)*i/5,xx=left+(right-left)*i/5;grid+=`<path class="md-grid" d="M${left} ${yy}H${right} M${xx} ${top}V${bottom}"/><text x="${left-9}" y="${yy+4}" text-anchor="end">${n(maxV*(1-i/5),0)}</text><text x="${xx}" y="${height-17}" text-anchor="middle">${n(maxT*i/5,0)}</text>`;}
 const stride=Math.max(1,Math.floor(rows.length/600)),sample=rows.filter((_,i)=>i%stride===0||i===rows.length-1),points=sample.filter(r=>Number.isFinite(r[key])).map(r=>`${x(r.t)},${y(r[key])}`).join(' ');
 let marker='';if(cursor){const r=cursor;if(Number.isFinite(r[key]))marker=`<path class="md-crosshair" d="M${x(Math.max(0,Math.min(maxT,r.t)))} ${top}V${bottom}"/><circle cx="${x(Math.max(0,Math.min(maxT,r.t)))}" cy="${y(r[key])}" r="10" fill="none" stroke="#ff5969" stroke-width="2"/><circle cx="${x(Math.max(0,Math.min(maxT,r.t)))}" cy="${y(r[key])}" r="4" fill="white"/>`;}
 return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${grid}<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke"/>${marker}<text x="${right}" y="${height-2}" text-anchor="end">ELAPSED SECONDS</text></svg>`;
}
export function renderDashboard({flight:f,telemetry:r,state,config,inputs,playing,speed}){
 if(!root)return;const put=(id,html)=>document.getElementById(id).innerHTML=html;
 document.getElementById('mdConfig').value=config;document.getElementById('mdSpeed').value=speed;
 document.getElementById('mdScrub').max=state.total;document.getElementById('mdScrub').value=state.time;
 document.getElementById('mdStatus').textContent=`SIMULATION • ${playing?'RUNNING':state.done?'COMPLETE':'PAUSED'}`;
 document.getElementById('mdPhase').textContent=state.event.label;
 document.getElementById('mdEventDetail').textContent=state.event.label+' · '+state.event.detail;
 document.getElementById('mdClock').textContent=r?`T + ${n(r.time,0)} s`:'NO FLIGHT SOLUTION';
 if(f!==signature){signature=f;series=dashboardSeries(f);orbitalPoints=orbitPath(f);}
 const cap=r?.capsule,active=cap?.status==='discarded'?r.carrier:cap;
 const cursor=r?{t:r.time-f.times.burnStart,alt:Number.isFinite(active.alt)?active.alt/1000:null,v:active.v}:null;
 put('mdTrajectory',trajectoryConsole(f,r,inputs,orbitalPoints));
 put('mdThermal',heatShieldInstrument(f,r?.time??0));
 put('mdGas',gasInstrument(f,r?.time??0));
 const metric=(label,value,unit)=>`<div class="md-metric"><span>${label}</span><b>${n(value)} <small>${unit}</small></b></div>`;
 put('mdReadouts',metric('INITIAL ORBIT',inputs.orbitKm,'km')+metric('ACTIVE ALTITUDE',active?.alt/1000,'km')+metric('ACTIVE VELOCITY',active?.v,'m/s')+metric('PROPER ACCELERATION',active?.loadG,'g₀')+metric('DELIVERED Δv',f?.burn?.idealDv,'m/s')+metric('WET MASS',inputs.wetKg,'kg')+metric('N₂ INITIAL',f?.gas?.initialKg*1000,'g')+metric('MOTOR IMPULSE',f?.burn?.impulse,'N·s')+`<small>${esc(cap?.status==='discarded'?'Carrier · ground-relative speed':'Capsule · inertial speed')}</small>`);
 put('mdVelocity',dashboardChart(series,'v',{width:430,height:240,cursor,label:'Calculated speed versus seconds since burn; capsule inertial, carrier ground relative'}));
 put('mdFiring',firingInstrument(f,r?.time??0));
 put('mdProbes',r?`<div class="md-entity"><span>CAPSULE</span><b>${esc(r.capsule.status)}</b></div><div class="md-entity"><span>CARRIER</span><b>${esc(r.carrier.status)}</b></div>`+r.probes.map(p=>`<div class="md-entity"><span>PROBE ${p.id}</span><b>${esc(p.status)}</b><span>${n(p.alt,0)} m</span></div>`).join(''):'<p class="md-empty">Adjust flight inputs to obtain a complete solution.</p>');
 document.getElementById('mdWarningSummary').textContent=`Flight trends / vehicle status · ${f?.warnings?.length??0} model warnings`;
 if(f?.warnings?.length)put('mdProbes',document.getElementById('mdProbes').innerHTML+`<div class="md-warning">${f.warnings.map(esc).join('<br>')}</div>`);
}
