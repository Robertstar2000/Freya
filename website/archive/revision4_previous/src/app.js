import {DEFAULTS,MATERIALS,simulateMission,shieldTrade,atmosphere} from './physics.js';
import {ORBIT_DEFAULTS,deorbit,orbitTrade,burnHistory,thermalAssessment,payloadShock,TPS,RISK_REGISTER,PENETRATOR_ALLOCATION,PLANETARY_PROTECTION_GATES} from './engineering.js';
const $=id=>document.getElementById(id),p={...DEFAULTS};let run=null,trade=[],now=0,playing=false,lastFrame=null,toastTimer;
const controls=[
 ['Vehicle & entry',[
  ['totalMass','Capsule wet entry mass',35,75,1,'kg',0,'Total entry body mass including all 6 probes'],
  ['probeMass','Mass per penetrator (chute included)',3,7,.25,'kg',2,'Each drogue is included in this mass'],
  ['shieldD','Heat-shield diameter',.7,1.8,.01,'m',2,'70° blunt sphere-cone reference'],
  ['shieldCd','Heat-shield drag Cd',1,2,.05,'',2,'Constant aerodynamic coefficient (simplified)'],
  ['entrySpeed','Entry-interface speed',3000,4400,25,'m/s',0,'Speed at 125 km AGL after deorbit'],
  ['entryAngle','Entry flight-path angle',-19,-8,.25,'°',2,'Negative = descending below local horizon'],
  ['entryHeight','Entry-interface altitude',110000,150000,1000,'m',0,'Height above target local ground']
 ]],
 ['Atmosphere & terrain',[
  ['rho0','Local surface air density',.012,.045,.001,'kg/m³',3,'Deep Hellas example; seasonal variability'],
  ['scaleH','Atmosphere scale height',9000,13000,250,'m',0,'Exponential scale-height approximation']
 ]],
 ['Release & parachutes',[
  ['releaseAlt','First probe release AGL',4000,13000,250,'m',0,'Rev 4: 10 km baseline enables all 6 dry-rock cases within minimum 50 mm chute bound'],
  ['releaseGap','Time between probe releases',.5,5,.25,'s',2,'Sequencing of six independent probes'],
  ['deployDelay','Drogue deployment delay',.5,4,.25,'s',2,'Ballistic clearance from capsule'],
  ['cutAlt','Legacy cutaway altitude (retained mode ignores)',30,350,10,'m',0,'Used only when the attached-parachute option is turned off'],
  ['manualChute','Manual drogue diameter',.05,2.5,.01,'m',2,'Used on all six probes when manual mode is enabled'],
  ['chuteCd','Drogue drag Cd',.35,.85,.025,'',3,'Constant drag coefficient; inflation is instantaneous']
 ]],
 ['Penetration model',[
  ['probeD','Penetrator nose diameter',.025,.065,.001,'m',3,'Assumed frontal area normal to motion'],
  ['probeCd','Penetrator drag Cd',.2,.8,.025,'',3,'Applies during free flight and after cutaway'],
  ['depth','Target penetration',.5,2.5,.05,'m',2,'Along impact axis, not necessarily vertical'],
  ['eta','Rock strength coefficient η',.5,2,.05,'',2,'Effective strength multiplier (assumed)'],
  ['kd','Inertial resistance coefficient kᴅ',.1,1,.05,'',2,'Scales velocity-squared ground resistance']
 ]],
 ['Substrate strength & density',[
  ['iceStrength','Solid ice effective resistance',4,35,1,'MPa',0,'Uncalibrated impact-resistance proxy'],
  ['iceDensity','Solid ice bulk density',850,940,5,'kg/m³',0,'Test-material density'],
  ['dryStrength','Dry sandstone resistance',20,130,5,'MPa',0,'Model proxy, not measured at landing site'],
  ['dryDensity','Dry sandstone density',1800,2700,50,'kg/m³',0,'Scenario bulk density'],
  ['dampStrength','Damp sandstone resistance',10,110,5,'MPa',0,'Hypothetical terrestrial analog'],
  ['dampDensity','Damp sandstone density',1700,2600,50,'kg/m³',0,'Scenario bulk density']
 ]],
 ['Optimizer design constraints',[
  ['heatLimit','Peak heat-flux cap',8,25,.5,'W/cm²',1,'Illustrative thermal screen, NOT PICA certification'],
  ['peakGLimit','Capsule peak deceleration cap',3,12,.5,'g',1,'Relative to standard Earth gravity'],
  ['releaseSpeedLimit','First release-speed cap',120,250,5,'m/s',0,'Additional release stability screen']
 ]]
];
function fmt(v,d=1){return Number.isFinite(v)?v.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';}
function ms(v){return fmt(v,1)}
function ct(name,rows,open){let html=`<details class="control-section" ${open?'open':''}><summary>${name}</summary><div class="control-wrap">`;
 for(const [key,label,min,max,step,unit,dec,sub] of rows)html+=`<div class="control"><div class="control-top"><label for="v_${key}">${label}</label><output id="o_${key}">${fmt(p[key],dec)} ${unit}</output></div><input type="range" id="v_${key}" min="${min}" max="${max}" step="${step}" value="${p[key]}" data-p="${key}" aria-label="${label}"><div class="control-sub">${sub}</div></div>`;
 return html+'</div></details>';
}
$('params').innerHTML=controls.map(([name,rows],i)=>ct(name,rows,i===0||i===2)).join('');
function renderInputs(){for(const [,rows] of controls)for(const [key,,min,max,step,unit,dec] of rows){const el=$('v_'+key),out=$('o_'+key);if(el){el.value=p[key];out.textContent=`${fmt(p[key],dec)} ${unit}`;el.disabled=(key==='manualChute'&&p.chuteMode==='auto')||(key==='cutAlt'&&p.chuteAttached);}}$('materialSelect').value=p.material;$('attachedChute').checked=p.chuteAttached;[ ['autoMode','auto'],['manualMode','manual']].forEach(([id,m])=>$(id).classList.toggle('on',p.chuteMode===m));}
let rerenderTimer;
document.querySelectorAll('input[data-p]').forEach(el=>el.addEventListener('input',()=>{
 const key=el.dataset.p;p[key]=Number(el.value);const spec=controls.flatMap(x=>x[1]).find(x=>x[0]===key);
 $('o_'+key).textContent=`${fmt(p[key],spec[6])} ${spec[5]}`;
 clearTimeout(rerenderTimer);rerenderTimer=setTimeout(update,90);
}));
$('materialSelect').addEventListener('change',e=>{p.material=e.target.value;update();});
$('attachedChute').addEventListener('change',e=>{p.chuteAttached=e.target.checked;renderInputs();update();});
for(const [id,mode] of [['autoMode','auto'],['manualMode','manual']])$(id).addEventListener('click',()=>{p.chuteMode=mode;renderInputs();update();});
$('resetBtn').addEventListener('click',()=>{Object.assign(p,DEFAULTS);renderInputs();update();toast('Reference settings restored');});
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3600);}
$('optimizeBtn').addEventListener('click',()=>{
 const t=shieldTrade(p),candidate=t.find(x=>x.peakHeat<=p.heatLimit&&x.peakG<=p.peakGLimit&&x.releaseV<=p.releaseSpeedLimit);
 if(!candidate){toast('No shield from 0.70–1.80 m meets all current screening caps');return;}
 p.shieldD=candidate.D;renderInputs();update();toast(`Smallest screened shield: ${candidate.D.toFixed(2)} m`);
});
$('showWarnings').addEventListener('click',()=>{
 openModal({title:'Feasibility risks & model limits',type:'warning',t:now,desc:run.warnings.join(' ')});
});
const makeDownload=(name,text,mime)=>{const a=document.createElement('a'),blob=new Blob([text],{type:mime}),url=URL.createObjectURL(blob);a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('exportConfigBtn').addEventListener('click',()=>makeDownload('Freya_parameters.json',JSON.stringify({revision:'4.0',date:'2026-10-25',parameters:p},null,2),'application/json'));
$('csvBtn').addEventListener('click',()=>{
 const cols=['material','probe','release_t_s','release_h_m','release_speed_ms','drogue_d_m','open_h_m','open_q_pa','chute_attached','impact_chute_load_N','maximum_line_load_N','cut_h_m','impact_t_s','impact_speed_ms','impact_angle_deg','penetration_m','peak_Earth_g','feasible'];
 const lines=[cols.join(',')];for(const [mat,item] of Object.entries(run.all)){for(const x of item.probes){lines.push([mat,x.index,x.t&&x.index?run.entry.releases[x.index-1].t:'',x.index?run.entry.releases[x.index-1].h:'',x.index?run.entry.releases[x.index-1].v:'',x.chuteD,x.open?.h,x.open?.q,x.chuteAttached,x.impactChuteForce,x.chuteForce,x.cut?.h,x.t,x.v,x.angle,x.depth,x.peakImpactG,x.fitFeasible].map(v=>v??'').join(','));}}
 makeDownload('Freya_6_probe_cases.csv',lines.join('\r\n'),'text/csv');
});
function kpi(label,value,unit,foot,high=false){return `<div class="kpi ${high?'highlight':''}"><span>${label}</span><b>${value}<small>${unit}</small></b><footer>${foot}</footer></div>`;}
const safe=(n,f=1)=>Number.isFinite(n)?fmt(n,f):'—';
function fillCards(){const e=run.entry,first=run.selected.probes[0];$('kpis').innerHTML=[
 kpi('ENTRY SHIELD',fmt(p.shieldD,2),'m Ø',`${fmt(e.beta,1)} kg/m² ballistic β`,true),
 kpi('PEAK ENTRY G',fmt(e.peakG.v,1),'gₑ',`${fmt(e.peakG.h/1000,1)} km AGL`),
 kpi('PEAK HEAT FLUX',fmt(e.peakHeat.v,1),'W/cm²',`Proxy • ${fmt(e.peakHeat.h/1000,1)} km AGL`),
 kpi('RELEASE 01',fmt(e.releaseTime,1),'s',`${fmt(e.releaseSpeed,0)} m/s capsule speed`),
 kpi('TARGET BURIAL',first&&Number.isFinite(first.depth)?fmt(first.depth,2):'—','m',`Six × ${fmt(p.probeMass,1)} kg probes`)
 ].join('');
 $('requiredSpeed').innerHTML=`${fmt(run.selected.requiredSpeed,1)}<span>m/s</span>`;
 $('materialTag').textContent=MATERIALS[p.material].name.toUpperCase();
 $('chuteSize').textContent=first&&Number.isFinite(first.chuteD)?fmt(first.chuteD,3)+' m':'—';
 $('impactG').textContent=first&&Number.isFinite(first.peakImpactG)?fmt(first.peakImpactG,0)+' g':'—';
 $('chuteOpen').textContent=first?.open?fmt(first.open.h/1000,2)+' km':'—';
 $('impactAngle').textContent=first&&Number.isFinite(first.angle)?fmt(first.angle,1)+'°':'—';
 $('ringText').textContent=first&&Number.isFinite(first.depth)?fmt(first.depth,2):'—';
 const ratio=Math.max(0,Math.min(1,(first?.depth||0)/p.depth));$('ringCircle').style.strokeDashoffset=String(264*(1-ratio));
 $('materialNote').textContent=p.material==='damp'?'Damp sandstone is a hypothetical analog. Sustained liquid-water saturation at a Mars surface is not established.':'Computed impact loads are model values, not test-derived survivability limits.';
 $('notice').style.borderColor=run.warnings.length>1?'#806545':'#3b6355';
}
function table(){const probes=run.selected.probes;$('probeRows').innerHTML=probes.map((x,i)=>{
 const rel=run.entry.releases[i],good=x.feasible&&x.fitFeasible;
 return `<tr data-probe="${i}"><td><strong>F-${String(i+1).padStart(2,'0')}</strong></td><td>T + ${fmt(rel.t,1)} s</td><td>${fmt(rel.h,0)} m</td><td>${safe(x.chuteD,3)} m</td><td>${safe(x.v,1)}</td><td>${safe(x.depth,2)} m</td><td>${safe(x.peakImpactG,0)} g</td><td class="${good?'status-ok':'status-bad'}">${good?'● MODEL FIT':'⚠ LIMIT'}</td></tr>`;
 }).join('');$('probeRows').querySelectorAll('tr').forEach(tr=>tr.addEventListener('click',()=>openModal({type:'probe',index:Number(tr.dataset.probe),title:`Probe F-${String(Number(tr.dataset.probe)+1).padStart(2,'0')} · complete descent`})));
}
function bars(){const v=Object.entries(run.all),max=Math.max(...v.map(([,x])=>x.requiredSpeed))*1.06;
 $('materialBars').innerHTML=v.map(([k,x])=>`<div class="bar-head"><span>${MATERIALS[k].name}</span><b style="color:${MATERIALS[k].color}">${fmt(x.requiredSpeed,1)} m/s</b></div><div class="bar-track"><div class="bar-fill" style="width:${Math.min(100,x.requiredSpeed/max*100)}%;background:${MATERIALS[k].color}"></div></div>`).join('');}
function pointsToPath(data,getX,getY,dim){return data.map((v,i)=>`${i?'L':'M'}${getX(v).toFixed(1)},${getY(v).toFixed(1)}`).join(' ');}
function graph(title,data,xKey,yKey,units='',color='#68d5df',width=680,height=225,focusX=null){
 const a=data.filter(d=>Number.isFinite(d[xKey])&&Number.isFinite(d[yKey]));if(!a.length)return '<p>No plot data</p>';
 let minX=Math.min(...a.map(x=>x[xKey])),maxX=Math.max(...a.map(x=>x[xKey])),minY=Math.min(...a.map(x=>x[yKey])),maxY=Math.max(...a.map(x=>x[yKey]));
 if(Math.abs(maxY-minY)<1e-8){minY-=1;maxY+=1;}const pad={l:50,r:14,t:32,b:28},w=width-pad.l-pad.r,h=height-pad.t-pad.b;
 const X=x=>pad.l+(x-minX)/(maxX-minX||1)*w,Y=y=>pad.t+(maxY-y)/(maxY-minY)*h;
 const path=pointsToPath(a,x=>X(x[xKey]),x=>Y(x[yKey]));
 let grid='';for(let i=0;i<=4;i++){const y=pad.t+h*i/4,v=maxY-(maxY-minY)*i/4;grid+=`<path d="M${pad.l} ${y}H${pad.l+w}" stroke="#2b4557" stroke-dasharray="3 5"/><text x="${pad.l-8}" y="${y+4}" text-anchor="end" class="axis-label">${fmt(v,Math.abs(maxY-minY)>20?0:1)}</text>`;}
 for(let i=0;i<=4;i++){const x=pad.l+w*i/4,v=minX+(maxX-minX)*i/4;grid+=`<text x="${x}" y="${height-7}" text-anchor="middle" class="axis-label">${fmt(v, maxX-minX<2?2:0)}</text>`;}
 const marker=focusX===null?'':`<path d="M${X(Math.max(minX,Math.min(maxX,focusX)))} ${pad.t}V${pad.t+h}" stroke="#eca878" stroke-width="1.5" stroke-dasharray="4 4"/>`;
 return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}"><text x="${pad.l}" y="17" class="chart-title">${title.toUpperCase()} · ${units}</text>${grid}<path d="${path}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round"/>${marker}</svg>`;
}
function charts(){const e=run.entry.series,pts=e.filter((x,i)=>i%5===0||i===e.length-1),data=pts.map(x=>({t:x.t,v:x.v}));$('velocityChart').innerHTML=graph('CAPSULE SPEED',data,'t','v','m/s vs time','#6fd8e3',620,230,now);
 trade=shieldTrade(p);const c=trade.map(x=>({D:x.D,v:x.peakHeat}));$('tradeChart').innerHTML=graph('PEAK HEAT FLUX VS SHIELD DIAMETER',c,'D','v','W/cm²','#eeb88b',750,250,p.shieldD);
 const candidate=trade.find(x=>x.peakHeat<=p.heatLimit&&x.peakG<=p.peakGLimit&&x.releaseV<=p.releaseSpeedLimit);
 $('tradeStatus').textContent=candidate?`Feasible screening minimum ≈ ${fmt(candidate.D,2)} m`:'No shield meets current design caps';$('tradeStatus').style.color=candidate?'#9ee2b1':'#f5af86';$('shieldTradeReadout').textContent=fmt(p.shieldD,2)+' m';
}
$('openVelocity').addEventListener('click',()=>openModal({type:'chart',title:'Atmospheric velocity profile',metric:'v'}));
$('tradeDetail').addEventListener('click',()=>openModal({type:'trade',title:'Parametric heat-shield trade study'}));
const interpol=(arr,time)=>{
 if(!arr?.length)return null;
 if(time<arr[0].t)return null;
 if(time>=arr[arr.length-1].t)return arr[arr.length-1];
 let lo=0,hi=arr.length-1;while(hi-lo>1){const mid=(lo+hi)>>1;if(arr[mid].t<time)lo=mid;else hi=mid;}
 const a=arr[lo],b=arr[hi],f=(time-a.t)/(b.t-a.t);
 const z={};for(const k of Object.keys(a)){z[k]=typeof a[k]==='number'&&typeof b[k]==='number'?a[k]+(b[k]-a[k])*f:a[k];}return z;
};
const altY=h=>{const marks=[[125000,100],[60000,182],[20000,270],[5000,345],[0,416]];
 if(h>=125000)return 100;if(h<=0)return 416;
 for(let i=0;i<marks.length-1;i++)if(h<=marks[i][0]&&h>=marks[i+1][0]){
  const [a,ya]=marks[i],[b,yb]=marks[i+1];return ya+(yb-ya)*(a-h)/(a-b);
 }return 416;
};
function makePath(){const e=run.entry.series,rel=run.entry.releases,tt=rel[0].t;
 const x=s=>80+505*Math.min(s.t,tt)/tt+(s.t>tt?32*(s.t-tt)/p.releaseGap:0);
 const pts=e.filter((v,i)=>i%6===0||i===e.length-1);$('pathlayer').innerHTML=`<path d="${pts.map((v,i)=>`${i?'L':'M'}${x(v).toFixed(1)},${altY(v.h).toFixed(1)}`).join(' ')}" stroke="#adc9d5" stroke-width="2.8" stroke-dasharray="7 6" fill="none" opacity=".4"/>`+
 run.selected.probes.map((probe,i)=>{const startX=585+i*32,xi=72+i*12,r=rel[i];if(!probe.series)return '';
 const path=probe.series.filter((x,j)=>j%5===0||j===probe.series.length-1).map((q,j,arr)=>`${j?'L':'M'}${(startX+(q.t-r.t)/(probe.t-r.t)*xi).toFixed(1)},${altY(q.h).toFixed(1)}`).join(' ');
 return `<path d="${path}" stroke="#60d0de" stroke-width="1.6" fill="none" opacity=".40" stroke-dasharray="4 5"/>`;}).join('');
 const rect=$('flightSvg').getBoundingClientRect();
}
function animationFrame(){if(!run)return;
 const e=run.entry,rel=e.releases,first=rel[0],state=interpol(e.series,now),probe=run.selected.probes;
 $('clockText').textContent=`T + ${fmt(now,1)} s`;
 let phase='Entry interface';if(now>e.peakHeat.t)phase='Atmospheric deceleration';if(now>=first.t)phase='Six-probe dispensing';if(now>rel.at(-1).t)phase='Chute descent';if(probe[0]?.cut&&now>=probe[0].cut.t)phase='Terminal ballistic phase';if(now>=probe[0]?.t)phase='Ground penetration';
 $('phaseName').textContent=phase;
 const cur=now<=e.series.at(-1).t?state:null;
 $('altitudeText').textContent=cur?`${fmt(cur.h/1000,1)} km AGL`:'0 km / probes descending';$('velocityText').textContent=cur?`${fmt(cur.v,0)} m/s`:'independent tracks';
 let vehicles='';if(cur){let x=80+505*Math.min(now,first.t)/first.t+(now>first.t?32*(now-first.t)/p.releaseGap:0),y=altY(cur.h);
 vehicles+=`<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(104)"><path d="M-14 5 Q0 -21 14 5L7 13L-7 13Z" fill="#d9e6e7" stroke="#72c9d3" stroke-width="1.2"/><path d="M-13 5Q0 12 13 5" fill="none" stroke="#eeac7c" stroke-width="3"/></g>`;
 }
 $('vehiclelayer').innerHTML=vehicles;
 $('probelayer').innerHTML=probe.map((q,i)=>{
  const r=rel[i];if(now<r.t||!q.series)return '';
  const z=interpol(q.series,now);if(!z)return '';
  const prog=Math.max(0,Math.min(1,(now-r.t)/(q.t-r.t)));
  const x=585+i*32+prog*(72+i*12),y=altY(z.h);
  let html=`<g><circle cx="${x}" cy="${y}" r="3.8" fill="#9deafa" stroke="#07202d" stroke-width="1.4"/><path d="M${x} ${y}l0 12" stroke="#b9f5f4" stroke-width="2"/>`;
  if(now>=q.open?.t&&now<(q.cut?.t??q.t))html+=`<path d="M${x-12} ${y-10}Q${x} ${y-29} ${x+12} ${y-10}Z" fill="${MATERIALS[p.material].color}" stroke="#baf7fa" stroke-width="1" opacity=".9"/><path d="M${x-12} ${y-10}L${x} ${y}L${x+12} ${y-10}" stroke="#bdf3f4" fill="none" stroke-width=".7"/>`;
  if(now>=q.t)html+=`<circle cx="${x}" cy="415" r="7" fill="${MATERIALS[p.material].color}" opacity=".55"/>`;
  return html+`<text x="${x+9}" y="${y+14}" font-size="10" fill="#c5f5f4" font-family="monospace">${i+1}</text></g>`;
 }).join('');
 $('timeline').value=String(now);
}
function events(){const e=run.entry,probes=run.selected.probes;
 const eventList=[{title:'Entry interface',t:0,type:'entry'},{title:'Peak heating',t:e.peakHeat.t,type:'heat'},{title:'Peak g-load',t:e.peakG.t,type:'g'},{title:'Peak q-dynamic',t:e.peakQ.t,type:'q'},
 ...e.releases.map((r,i)=>({title:`Release F-${String(i+1).padStart(2,'0')}`,t:r.t,type:'release',index:i})),
 {title:'Drogue 01 open',t:probes[0]?.open?.t,type:'open',index:0},{title:'Drogue 01 cut',t:probes[0]?.cut?.t,type:'cut',index:0},{title:'Probe 01 impact',t:probes[0]?.t,type:'impact',index:0}].filter(x=>Number.isFinite(x.t));
 $('events').innerHTML=eventList.map((x,i)=>`<button class="event-pill" data-event="${i}"><span class="num">${String(i+1).padStart(2,'0')} / T+${fmt(x.t,1)} S</span><b>${x.title}</b><small>INSPECT DATA ↗</small></button>`).join('');
 $('events').querySelectorAll('button').forEach(x=>x.addEventListener('click',()=>{const ev=eventList[Number(x.dataset.event)];now=ev.t;animationFrame();openModal(ev);}));
}
const modal=$('eventModal');$('closeModal').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close();});
function openModal(event){const e=run.entry,sel=run.selected.probes,mat=MATERIALS[p.material];
 $('modalEyebrow').textContent=event.type==='warning'?'ENGINEERING LIMITATIONS':'MISSION RESEARCH // EVENT ANALYSIS';
 $('modalTitle').textContent=event.title||'Engineering detail';let plot='',metrics=[],description=event.desc||'';
 function metric(k,v){metrics.push(`<div><span>${k}</span><b>${v}</b></div>`);}
 if(event.type==='trade'){
  plot=graph('HEATING / DIAMETER',trade.map(x=>({x:x.D,y:x.peakHeat})),'x','y','W/cm²','#ebaf85',720,260,p.shieldD);
  metric('SHIELD DIAMETER',`${fmt(p.shieldD,2)} m`);metric('CAPSULE PEAK G',`${fmt(e.peakG.v,2)} g`);metric('HEAT FLUX',`${fmt(e.peakHeat.v,2)} W/cm²`);
  description='Grid evaluation uses 0.10 m shield increments; the smallest diameter satisfying the three configurable engineering screening caps is selected by Optimize. This is not a validated thermal/structural optimization.';
 }else if(event.type==='warning'){
  plot=graph('RELEASE SPEED',e.series.filter((_,i)=>i%10===0).map(x=>({t:x.t,v:x.v})),'t','v','m/s','#eaac84',720,250);
  metric('MASS LEFT AFTER RELEASES',`${fmt(p.totalMass-p.probeCount*p.probeMass,1)} kg`);metric('HEAT',`${fmt(e.peakHeat.v,1)} W/cm²`);metric('ENTRY PEAK LOAD',`${fmt(e.peakG.v,1)} g`);
 }else if(event.type==='probe'||['release','open','cut','impact'].includes(event.type)){
  const i=event.index||0,q=sel[i],r=e.releases[i];if(!q?.series)return;
  plot=graph(`PROBE ${i+1} DESCENT SPEED`,q.series.map(x=>({t:x.t,v:x.speed})),'t','v','m/s',mat.color,720,240,event.t??q.t)+graph(`PROBE ${i+1} ALTITUDE`,q.series.map(x=>({t:x.t,h:x.h/1000})),'t','h','km AGL','#e6af83',720,220,event.t??q.t);
  metric('RELEASE AGL',`${fmt(r.h,0)} m`);metric('DROGUE DIAMETER',`${fmt(q.chuteD,3)} m`);metric('OPENING PRESSURE',`${fmt(q.open?.q,0)} Pa`);
  metric('IMPACT SPEED',`${fmt(q.v,1)} m/s`);metric('PENETRATION',`${fmt(q.depth,2)} m`);metric('INITIAL IMPACT G',`${fmt(q.peakImpactG,0)} g`);metric('CHUTE AT IMPACT',q.chuteAttached?'ATTACHED':'RELEASED');metric('IMPACT RISER LOAD',`${fmt(q.impactChuteForce,1)} N`);
  description='Probe state is integrated in 2-D with free flight, an instantaneously deployed constant-Cd drogue, no cutaway when retention is enabled; the chute remains attached during touchdown. The static-drag idealization ignores canopy collapse and riser snatch. Impact g comes from assumed resistive ground dynamics, not an instrumentation survival test.';
 }else{
  const t=event.t||0;let data=e.series.filter((_,i)=>i%5===0).map(x=>({t:x.t,v:x.v}));
  if(event.type==='heat')data=e.series.filter((_,i)=>i%5===0).map(x=>({t:x.t,v:1.898e-4*Math.sqrt(atmosphere(x.h,p)/(p.shieldD*.25))*x.v**3/1e4}));
  if(event.type==='q')data=e.series.filter((_,i)=>i%5===0).map(x=>({t:x.t,v:.5*atmosphere(x.h,p)*x.v*x.v}));
  if(event.type==='g')data=e.series.filter((_,i)=>i%5===0).map(x=>({t:x.t,v:.5*atmosphere(x.h,p)*x.v*x.v*p.shieldCd*Math.PI*p.shieldD**2/(4*p.totalMass*9.80665)}));
  plot=graph(event.title,data,'t','v',event.type==='heat'?'W/cm²':event.type==='g'?'Earth-g':event.type==='q'?'Pa':'m/s','#68d5df',720,260,t);
  const s=interpol(e.series,t)||e.series[0];metric('EVENT TIME',`${fmt(t,1)} s`);metric('CAPSULE SPEED',`${fmt(s.v,1)} m/s`);metric('ALTITUDE AGL',`${fmt(s.h/1000,2)} km`);
  description='Nonlifting blunt-body point-mass entry in an exponential Mars atmosphere. Heating uses a low-fidelity stagnation correlation and does not include ablation, radiation, rarefaction, shock-layer chemistry or 6-DOF flight.';
 }
 $('modalChart').innerHTML=plot;$('modalMetrics').innerHTML=metrics.join('');$('modalDescription').textContent=description;modal.showModal();
}
function update(){
 try{run=simulateMission(p);fillCards();table();bars();charts();makePath();events();renderEngineering();const times=run.selected.probes.filter(q=>Number.isFinite(q.t)).map(q=>q.t);$('timeline').max=String(Math.ceil(Math.max(run.entry.releaseTime+20,...times)+5));$('timeMax').textContent=`LAST IMPACT / ${fmt(Math.max(...times),0)} S`;now=Math.min(now,Number($('timeline').max));animationFrame();}
 catch(e){console.error(e);toast(`Invalid trajectory inputs: ${e.message}`);playing=false;$('playBtn').textContent='▶';}
}
$('playBtn').addEventListener('click',()=>{playing=!playing;$('playBtn').textContent=playing?'❚❚':'▶';if(now>=Number($('timeline').max))now=0;lastFrame=null;});
$('timeline').addEventListener('input',e=>{now=Number(e.target.value);animationFrame();});
function tick(t){if(lastFrame!==null&&playing&&run){now=Math.min(Number($('timeline').max),now+(t-lastFrame)/1000*Number($('playSpeed').value));animationFrame();if(now>=Number($('timeline').max)){playing=false;$('playBtn').textContent='▶';}}lastFrame=t;requestAnimationFrame(tick);}requestAnimationFrame(tick);

// ---- REVISION 3 ENGINEERING EXTENSION: ORBIT, SHOCK, TPS, DATA & RISKS ----
const orbitP={...ORBIT_DEFAULTS};let currentTable='entry',electronicsMass=.15;
const orbitSpecs=[
 ['orbitAltKm','Circular parking orbit altitude',180,900,10,'km',0],
 ['periapsisKm','Target periapsis altitude',-100,100,5,'km',0],
 ['thrustN','Retrograde thrust',5,1000,5,'N',0],
 ['ispS','Specific impulse',150,330,5,'s',0],
 ['burnMassKg','Propelled bus mass (not 45 kg capsule)',45,1000,5,'kg',0],
 ['entryInterfaceKm','Entry interface above datum',110,140,5,'km',0]
];
const heatRate=s=>1.898e-4*Math.sqrt(atmosphere(s.h,p)/(p.shieldD*.25))*s.v**3/1e4;
function setupEngineering(){
 $('orbitControls').innerHTML=orbitSpecs.map(([key,label,min,max,step,unit,d])=>`<div class="orbit-control"><label for="orb_${key}">${label}<output id="orbOut_${key}">${fmt(orbitP[key],d)} ${unit}</output></label><input type="range" id="orb_${key}" min="${min}" max="${max}" step="${step}" value="${orbitP[key]}"></div>`).join('');
 orbitSpecs.forEach(([key,,min,max,step,unit,d])=>{$('orb_'+key).addEventListener('input',e=>{orbitP[key]=Number(e.target.value);$('orbOut_'+key).textContent=`${fmt(orbitP[key],d)} ${unit}`;renderEngineering();});});
 $('applyOrbit').addEventListener('click',()=>{try{const o=deorbit(orbitP);p.entrySpeed=o.entrySpeed;p.entryAngle=o.entryAngleDeg;renderInputs();update();$('orbitCouplingNote').textContent=`Orbit-derived entry applied: ${fmt(o.entryAngleDeg,2)}° at ${fmt(o.entrySpeed,0)} m/s. Mean-datum to local-AGL difference (~8 km) is omitted.`;toast('Orbit state applied to atmosphere simulator. Check the geometry caveat.');}catch(e){toast(e.message);}});
 $('restoreEntry').addEventListener('click',()=>{p.entrySpeed=DEFAULTS.entrySpeed;p.entryAngle=DEFAULTS.entryAngle;renderInputs();update();$('orbitCouplingNote').textContent='Restored independent -13° reference case.';});
 $('dataTabs').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{currentTable=b.dataset.table;drawEngineeringTable();$('dataTabs').querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===b));}));
 $('exportTables').addEventListener('click',()=>{const all=['entry','shield','probes','orbit'].flatMap(name=>getEngineeringRows(name).rows.map(a=>[name,...a]));const heads=['dataset',...Array.from({length:Math.max(...all.map(a=>a.length-1))},(_,i)=>'value_'+(i+1))];makeDownload('Freya_all_table_data.csv',[heads.join(','),...all.map(a=>a.join(','))].join('\r\n'),'text/csv');});
 $('picaThickness').addEventListener('input',e=>{TPS.tpsThicknessMm=+e.target.value;$('picaThicknessOut').textContent=TPS.tpsThicknessMm+' mm';renderEngineering();});
 $('backingMass').addEventListener('input',e=>{TPS.backingMassKg=+e.target.value;$('backingMassOut').textContent=fmt(TPS.backingMassKg,2)+' kg';renderEngineering();});
 $('electronicsMass').addEventListener('input',e=>{electronicsMass=+e.target.value;$('electronicsMassOut').textContent=fmt(electronicsMass,2)+' kg';renderEngineering();});
}
function getEngineeringRows(name){
 if(name==='entry'){const ar=run.entry.series,rows=ar.filter((x,i)=>i%Math.max(1,Math.floor(ar.length/28))===0||i===ar.length-1).map(x=>[fmt(x.t,2),fmt(x.h/1000,2),fmt(x.v,1),fmt(x.gamma*180/Math.PI,2),fmt(.5*atmosphere(x.h,p)*x.v*x.v,1),fmt(heatRate(x),3)]);return {head:['T + s','AGL km','Speed m/s','FPA °','Dynamic q Pa','Heating W/cm²'],rows,summary:`${ar.length} RK4 time steps; ${rows.length} representative chart-supporting samples displayed. Full-resolution data are provided in the project CSV.`};}
 if(name==='shield'){return {head:['Shield Ø m','Peak heating W/cm²','Entry peak Earth-g','Release speed m/s'],rows:trade.map(x=>[fmt(x.D,2),fmt(x.peakHeat,3),fmt(x.peakG,3),fmt(x.releaseV,1)]),summary:'All evaluated 0.10 m diameter grid points; constant Cd and convective heating correlation.'};}
 if(name==='probes'){return {head:['Substrate','Probe','Release T + s','Release AGL m','Chute Ø m','Impact m/s','Depth m','Initial Earth-g','Fit','Riser load N'],rows:Object.entries(run.all).flatMap(([k,v])=>v.probes.map(q=>[MATERIALS[k].name,q.index,fmt(run.entry.releases[q.index-1].t,2),fmt(run.entry.releases[q.index-1].h,1),fmt(q.chuteD,3),fmt(q.v,2),fmt(q.depth,2),fmt(q.peakImpactG,0),q.fitFeasible?'YES':'NO',fmt(q.impactChuteForce,1)])),summary:'18 material–probe cases at current controls, retained canopies by default. Fit status and angles must be checked; the rock law is unvalidated.'};}
 if(name==='orbit'){return {head:['Periapsis km','Deorbit Δv m/s','Interface speed m/s','FPA °','Coast min','Propellant kg','Burn seconds'],rows:orbitTrade(orbitP).map(x=>[fmt(x.periapsisKm,0),fmt(x.deltaV,2),fmt(x.entrySpeed,1),fmt(x.entryAngleDeg,2),fmt(x.coastSeconds/60,2),fmt(x.propellantKg,3),fmt(x.durationS,1)]),summary:'Two-body impulsive geometry; fixed thrust/Isp and maneuvered spacecraft mass. Ellipse continues below target periapsis where negative heights are shown.'};}
 throw Error('Unknown table');
}
function drawEngineeringTable(){if(!run)return;const d=getEngineeringRows(currentTable);$('dataTableSummary').textContent=d.summary;$('engineeringHead').innerHTML='<tr>'+d.head.map(x=>`<th>${x}</th>`).join('')+'</tr>';$('engineeringRows').innerHTML=d.rows.map(row=>'<tr>'+row.map(x=>`<td>${x}</td>`).join('')+'</tr>').join('');}
function renderEngineering(){if(!run)return;
 let o;try{o=deorbit(orbitP);}catch(e){$('orbitSummary').textContent=e.message;return;}
 $('orbitSummary').innerHTML=[['CIRCULAR SPEED',o.circularSpeed,'m/s',0],['RETROGRADE ΔV',o.deltaV,'m/s',1],['BURN DURATION',o.durationS,'seconds',1],['PROPELLANT',o.propellantKg,'kg',2],['ENTRY FPA',o.entryAngleDeg,'degrees',2]].map(([label,x,unit,d])=>`<div class="orbit-stat"><span>${label}</span><strong>${fmt(x,d)}</strong><small>${unit}</small></div>`).join('');
 const hist=burnHistory(o),orb=orbitTrade(orbitP);$('burnChart').innerHTML=graph('THRUST COMMAND VS TIME',hist,'t','thrust','newtons','#5ad8de',630,235)+graph('CUMULATIVE DELTA-V',hist,'t','dv','m/s','#e7b080',630,220);
 $('orbitChart').innerHTML=graph('DEORBIT DELTA-V VS PERIAPSIS ALTITUDE',orb,'periapsisKm','deltaV','m/s','#78d7e0',630,235,orbitP.periapsisKm)+`<div class="note-strong">Orbit-to-entry coast ≈ ${fmt(o.coastSeconds/60,1)} min · Entry speed ${fmt(o.entrySpeed,1)} m/s · Burn ${fmt(o.burnFraction*100,1)}% of parking-orbit period. ${o.warning}</div>`;
 const t=thermalAssessment(run.entry,p,TPS);$('thermalStats').innerHTML=[['PEAK HEAT FLUX',`${fmt(t.fluxWcm2,2)} W/cm²`],['STAGNATION HEAT LOAD',`${fmt(t.heatLoadMJm2,2)} MJ/m²`],['TPS FACE AREA',`${fmt(t.shieldAreaM2,2)} m²`],['PICA ALLOCATION',`${fmt(t.ablatorMassKg,2)} kg`],['TPS + BACKING',`${fmt(t.shieldSystemMassKg,2)} kg`],['NON-PROBE MASS ALLOCATION',`${fmt(p.totalMass-p.probeCount*p.probeMass,2)} kg`],['AEROSHELL TRANSFER', `${fmt(p.probeCount*(5-p.probeMass),2)} kg vs 5 kg probes`]].map(([l,v])=>`<div><span>${l}</span><b>${v}</b></div>`).join('');
 const sh=payloadShock(run,electronicsMass),ch=sh[p.material];$('shockStats').innerHTML=[['SELECTED MATERIAL',MATERIALS[p.material].name],['INITIAL IMPACT LOAD',fmt(ch.peakG,0)+' g'],['ELECTRONICS INERTIAL FORCE',fmt(ch.forceN,0)+' N'],['MODEL IMPACT DURATION',fmt(ch.impactDurationMs,1)+' ms'],['PROBE IMPACT ENERGY',fmt(ch.energyJ/1000,1)+' kJ'],['DS2 BATTERY TEST', '45,000 g (heritage)']].map(([l,v])=>`<div><span>${l}</span><b>${v}</b></div>`).join('');
 const blockers=RISK_REGISTER.filter(x=>x.blocker).length; $('blockerCount').textContent=`${blockers} UNRESOLVED BLOCKERS`; $('riskKpis').innerHTML=[['MISSION BLOCKERS',blockers],['CRITICAL / ≥20',RISK_REGISTER.filter(x=>x.score>=20).length],['HIGH / 15–19',RISK_REGISTER.filter(x=>x.score>=15&&x.score<20).length]].map(([l,v])=>`<div class="risk-stat"><span>${l}</span><b>${v}</b></div>`).join('');
 $('riskRows').innerHTML=[...RISK_REGISTER].sort((a,b)=>b.score-a.score).map(x=>`<tr data-risk="${x.id}"><td>${x.id}</td><td><strong>${x.name}</strong></td><td>${x.category}</td><td>${x.likelihood}</td><td>${x.impact}</td><td>${x.score}</td><td class="priority-${x.priority.toLowerCase()}">${x.priority}</td><td>${x.blocker?'BLOCKER':'Open'}</td></tr>`).join('');
 $('riskRows').querySelectorAll('tr').forEach(row=>row.addEventListener('click',()=>{const r=RISK_REGISTER.find(x=>x.id===row.dataset.risk);$('modalEyebrow').textContent='RISK REVIEW / MITIGATION GATE';$('modalTitle').textContent=`${r.id} · ${r.name}`;$('modalChart').innerHTML='<div class="note-strong">'+r.mitigation+'</div>';$('modalMetrics').innerHTML=[['LIKELIHOOD',r.likelihood+'/5'],['SEVERITY',r.impact+'/5'],['SCORE',r.score],['STATUS',r.blocker?'MISSION BLOCKER':'OPEN']].map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('');$('modalDescription').textContent='Provisional programmatic risk score; no statistically calibrated probability. Close-out requires engineering test evidence and design-review approval.';modal.showModal();}));
 const aeroshellTransfer=p.probeCount*(5-p.probeMass);const left=p.totalMass-p.probeCount*p.probeMass;const lines=[['Penetrators incl. chutes',p.probeCount*p.probeMass,'6 compact probes, each 4 kg by default'],['PICA + backing',t.shieldSystemMassKg,'Illustrative 15 mm PICA plus backing, NOT thermally sized'],['Aeroshell transfer vs 5 kg probes',aeroshellTransfer,'6 × (5 kg − active probe mass); negative values indicate lost aeroshell allocation'],['Separation / dispenser',3,'Optimistic mechanical allowance'],['Parent avionics / power',2,'Optimistic allowance'],['Harness / wiring',1,'Integration allowance'],['Assembly / interfaces',1,'Integration allowance']];const allocated=lines.reduce((a,r)=>a+r[1],0);lines.push(['UNALLOCATED CONTINGENCY',p.totalMass-allocated,'Low reserve can remain a mission blocker']);$('massRows').innerHTML=lines.map(x=>`<tr><td>${x[0]}</td><td>${fmt(x[1],2)} kg</td><td>${x[2]}</td></tr>`).join('');const componentRows=PENETRATOR_ALLOCATION.map(x=>[x.element,x.massKg,x.basis]);
 $('probeMassRows').innerHTML=componentRows.map(x=>`<tr><td>${x[0]}</td><td>${fmt(x[1],2)} kg</td><td>${x[2]}</td></tr>`).join('');
 const budgetExact=Math.abs(p.probeMass-4)<.0001&&p.probeCount===6&&Math.abs(p.totalMass-45)<.0001;
 $('allocationNote').textContent=budgetExact?'BASELINE VALID: Fixed 4.00 kg per-probe allocation. 1.00 science / 0.50 canopy+antenna / 0.50 power+controller / 2.00 body+potting. All subsystems share the same 4.00 kg.':'PARAMETRIC CASE ONLY: the displayed detailed 4.00 kg allocation applies only to six 4.00 kg penetrators in a 45.00 kg entry mass. Re-budget subsystems before treating this scenario as physically realizable.';
 $('allocationNote').className='risk-intro'+(budgetExact?'':' note-strong');
 $('ppGateRows').innerHTML=PLANETARY_PROTECTION_GATES.map(g=>`<tr><td><b>${g.id}</b></td><td>${g.name}</td><td>${g.criterion}</td><td class="priority-critical">${g.state}</td></tr>`).join('');
 $('ppClassification').textContent='Category IVa / IVb / IVc remains UNDETERMINED: instrument goals and ice access require authority classification.';
 $('ppStatus').textContent='NOT QUALIFIED: No validated biological endpoint, Dmin/Dmax dose map, or cell/avionics tolerance data.';
 drawEngineeringTable();
}
renderInputs();
setupEngineering();
// Fixed, reproducible starfield. No data dependency or randomness.
$('starfield').innerHTML=Array.from({length:48},(_,i)=>{const x=(i*137+59)%940,y=(i*67+23)%385;return `<circle cx="${x}" cy="${y}" r="${i%9===0?1.5:.65}" fill="#b7d3e5" opacity="${.22+(i%5)*.13}"/>`;}).join('');
update();
