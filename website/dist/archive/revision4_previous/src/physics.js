// FREYA research-grade screening model (NOT flight-qualified), SI units.
// Revision 3: 4 kg probes, retained chutes, 45 kg unchanged entry mass.
export const G_MARS=3.711, G_E=9.80665, R_MARS=3389500, RHO_SCALE_DEFAULT=11000;
export const MATERIALS = {
  ice:  {name:'Solid ice', strength:12e6, density:920, color:'#50d4ec'},
  dry:  {name:'Dry sandstone', strength:70e6, density:2300, color:'#eead70'},
  damp: {name:'Damp sandstone', strength:40e6, density:2200, color:'#b7a2f4'}
};
export const DEFAULTS={totalMass:45,probeCount:6,probeMass:4,shieldD:1.1,shieldCd:1.5,
  entrySpeed:3450,entryAngle:-13,entryHeight:125000,rho0:.025,scaleH:11000,
  releaseAlt:10000,releaseGap:2,deployDelay:1.5,chuteAttached:true,cutAlt:100,
  probeD:.035,probeCd:.45,chuteCd:.55,depth:1.5,kd:.5,eta:1,
  material:'ice',chuteMode:'auto',manualChute:.7,heatLimit:15,peakGLimit:8,releaseSpeedLimit:185,
  iceStrength:12,dryStrength:70,dampStrength:40,iceDensity:920,dryDensity:2300,dampDensity:2200
};
const pi=Math.PI, clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
export function atmosphere(h,p){return p.rho0*Math.exp(-Math.max(0,h)/p.scaleH);}
export function materialOf(p,key){const info=MATERIALS[key];return {...info,strength:p[key+'Strength']*1e6,density:p[key+'Density']};}
export function targetVelocity(p,key){
 const mat=materialOf(p,key), A=pi*p.probeD*p.probeD/4, F=p.eta*mat.strength*A, K=p.kd*mat.density*A;
 const head=F-p.probeMass*G_MARS;
 if(head<=0)return NaN;
 if(K<1e-14)return Math.sqrt(2*head*p.depth/p.probeMass);
 const e=2*K*p.depth/p.probeMass;
 return e>700?Infinity:Math.sqrt(head/K*Math.expm1(e));
}
export function penetration(p,key,v){
 const mat=materialOf(p,key),A=pi*p.probeD**2/4,F=p.eta*mat.strength*A,K=p.kd*mat.density*A, head=F-p.probeMass*G_MARS;
 if(head<=0)return {depth:Infinity,peakG:0,avgG:0};
 const L=K<1e-14?p.probeMass*v*v/(2*head):p.probeMass/(2*K)*Math.log1p(K*v*v/head);
 return {depth:L,peakG:(F+K*v*v-p.probeMass*G_MARS)/(p.probeMass*G_E),avgG:v*v/(2*Math.max(L,1e-9)*G_E)};
}
function add(a,b,f=1){return a.map((x,i)=>x+f*b[i]);}
function rk4(f,t,y,dt){const k1=f(t,y),k2=f(t+dt/2,add(y,k1,dt/2)),k3=f(t+dt/2,add(y,k2,dt/2)),k4=f(t+dt,add(y,k3,dt));return y.map((v,i)=>v+dt*(k1[i]+2*k2[i]+2*k3[i]+k4[i])/6);}
function stateRec(t,y){return {t,h:y[0],v:y[1],gamma:y[2],x:y[3]};}
function capsuleDynamics(p,m){const a=pi*p.shieldD**2/4;return (t,y)=>{
 const [h,v,gamma]=y, rv=R_MARS/(R_MARS+Math.max(h,0)),g=G_MARS*rv*rv;
 const drag=.5*atmosphere(h,p)*v*v*p.shieldCd*a/m;
 return [v*Math.sin(gamma),-drag-g*Math.sin(gamma),(v/(R_MARS+Math.max(h,0))-g/Math.max(v,1))*Math.cos(gamma),v*Math.cos(gamma)*rv];
};}
export function simulateEntry(p){
 const dt=.24;let t=0, y=[p.entryHeight,p.entrySpeed,p.entryAngle*pi/180,0],m=p.totalMass;
 let series=[stateRec(t,y)], releases=[],peakG={v:-1},peakQ={v:-1},peakHeat={v:-1},heatLoad=0;
 const cdA=p.shieldCd*pi*p.shieldD*p.shieldD/4, rn=p.shieldD*.25;
 function sample(t,y,m){
  const rho=atmosphere(y[0],p), q=.5*rho*y[1]**2,acc=q*cdA/m/G_E,heat=1.898e-4*Math.sqrt(rho/rn)*y[1]**3/1e4;
  if(acc>peakG.v)peakG={v:acc,t,h:y[0]};if(q>peakQ.v)peakQ={v:q,t,h:y[0]};if(heat>peakHeat.v)peakHeat={v:heat,t,h:y[0]};
  return heat;
 }
 let oldHeat=sample(0,y,m);
 for(let n=0;n<12000 && y[0]>p.releaseAlt;n++){
  const f=capsuleDynamics(p,m),ny=rk4(f,t,y,dt);
  let frac=1;
  if(ny[0]<p.releaseAlt)frac=clamp((y[0]-p.releaseAlt)/(y[0]-ny[0]),0,1);
  const step=dt*frac;const zn=frac===1?ny:rk4(f,t,y,step);
  const h2=sample(t+step,zn,m);heatLoad+=(oldHeat+h2)*step/2;oldHeat=h2;
  y=zn;t+=step;series.push(stateRec(t,y));
  if(frac<1)break;
 }
 if(y[0]>p.releaseAlt+2)throw Error('Capsule never reaches release altitude. Check trajectory.');
 for(let i=0;i<p.probeCount;i++){
  releases.push({...stateRec(t,y),index:i+1,massBefore:m});
  if(i<p.probeCount-1){
   m-=p.probeMass;const f=capsuleDynamics(p,m),steps=Math.max(1,Math.ceil(p.releaseGap/.12));
   for(let j=0;j<steps;j++){const sz=p.releaseGap/steps;y=rk4(f,t,y,sz);t+=sz;series.push(stateRec(t,y));}
  }
 }
 return {series,releases,peakG,peakQ,peakHeat,heatLoad,releaseSpeed:releases[0].v,
  beta:p.totalMass/cdA, releaseTime:releases[0].t};
}
function probeDyn(p,ch){const A=(p.probeCd*pi*p.probeD*p.probeD/4)+(ch>0?p.chuteCd*pi*ch*ch/4:0);return (t,y)=>{
 const [h,vx,vz]=y,speed=Math.hypot(vx,vz),q=.5*atmosphere(h,p)*speed*speed,
 f=q*A/(p.probeMass*Math.max(speed,.001));return [vz,-f*vx,-G_MARS-f*vz,vx];
};}
export function simulateProbe(p,release,chuteD,collect=false){
 let t=release.t, y=[release.h,release.v*Math.cos(release.gamma),release.v*Math.sin(release.gamma),0],
 series=collect?[{t,h:y[0],speed:Math.hypot(y[1],y[2]),x:y[3],phase:'free'}]:null;
 let deployed=null,cutaway=null,forceMax=0;
 function stepTo(limit,dt,ch,phase,stopOnAlt){
  const fun=probeDyn(p,ch);
  for(let j=0;j<8000;j++){
   if(stopOnAlt!==undefined && y[0]<=stopOnAlt)return true;
   const nx=rk4(fun,t,y,dt);let fac=1;
   if(stopOnAlt!==undefined && nx[0]<stopOnAlt)fac=clamp((y[0]-stopOnAlt)/(y[0]-nx[0]),0,1);
   const d=dt*fac; const ny=fac===1?nx:rk4(fun,t,y,d);
   y=ny;t+=d;
   if(ch>0){const speed=Math.hypot(y[1],y[2]), f=.5*atmosphere(y[0],p)*speed*speed*p.chuteCd*pi*ch*ch/4;forceMax=Math.max(forceMax,f);}
   if(collect && (j%3===0 || fac<1))series.push({t,h:y[0],speed:Math.hypot(y[1],y[2]),x:y[3],phase});
   if(fac<1)return true;
   if(limit!==undefined && t>=limit-1e-7)return true;
   if(t>1800)return false;
  }
  return false;
 }
 if(!stepTo(t+p.deployDelay,Math.min(.15,Math.max(.02,p.deployDelay/12)),0,'free'))return null;
 if(y[0]<=p.cutAlt)return null;
 deployed={t,h:y[0],speed:Math.hypot(y[1],y[2]),q:.5*atmosphere(y[0],p)*Math.hypot(y[1],y[2])**2};
 if(p.chuteAttached){
  if(!stepTo(undefined,.20,chuteD,'chute',0))return null;
 } else {
  if(!stepTo(undefined,.20,chuteD,'chute',p.cutAlt))return null;
  cutaway={t,h:y[0],speed:Math.hypot(y[1],y[2])};
  if(!stepTo(undefined,.12,0,'ballistic',0))return null;
 }
 const v=Math.hypot(y[1],y[2]),impactAngle=Math.atan2(Math.abs(y[1]),Math.abs(y[2]))*180/pi;
 const rhoImpact=atmosphere(0,p), qImpact=.5*rhoImpact*v*v;
 const impactChuteForce=p.chuteAttached?qImpact*p.chuteCd*pi*chuteD*chuteD/4:0;
 return {t,h:y[0],v,x:y[3],angle:impactAngle,open:deployed,cut:cutaway,chuteAttached:p.chuteAttached,impactChuteForce,impactDynamicPressure:qImpact,chuteForce:forceMax,chuteD,descentTime:t-release.t,series};
}
export function fitChute(p,release,vTarget){
 const lo=.05,hi=2.5,small=simulateProbe(p,release,lo),large=simulateProbe(p,release,hi);
 if(!small||!large)return {diameter:NaN,feasible:false,result:null,reason:'No valid descent'};
 if(small.v<vTarget)return {diameter:lo,feasible:false,result:small,reason:'Target impact requires smaller parachute or delayed opening'};
 if(large.v>vTarget)return {diameter:hi,feasible:false,result:large,reason:'Target impact requires larger parachute'};
 let left=lo,right=hi,result=null;
 for(let i=0;i<18;i++){
  let mid=(left+right)/2,sim=simulateProbe(p,release,mid);
  if(!sim)break;
  result=sim;
  if(sim.v>vTarget)left=mid;else right=mid;
 }
 const diameter=(left+right)/2;
 return {diameter,feasible:true,result:simulateProbe(p,release,diameter,true),reason:''};
}
export function simulateMission(p){
 const warnings=[];
 if(p.totalMass<=p.probeCount*p.probeMass)throw Error('Entry mass must exceed total probe mass.');
 if(p.releaseAlt>=p.entryHeight)throw Error('Release altitude must be below entry interface.');
 const entry=simulateEntry(p), all={};
 for(let key of Object.keys(MATERIALS)){
  const req=targetVelocity(p,key);
  if(!Number.isFinite(req)) {warnings.push(`${MATERIALS[key].name}: penetration model invalid`);continue;}
  all[key]={requiredSpeed:req,probes:entry.releases.map(r=>{
   const fit=p.chuteMode==='auto'?fitChute(p,r,req):{diameter:p.manualChute,feasible:true,result:simulateProbe(p,r,p.manualChute,true)};
   if(!fit.result)return {...r,feasible:false};
   const pen=penetration(p,key,fit.result.v);
   return {...r,...fit.result,fitFeasible:fit.feasible,feasible:fit.feasible,depth:pen.depth,peakImpactG:pen.peakG,avgImpactG:pen.avgG,reason:fit.reason||''};
  })};
 }
 if(entry.peakHeat.v>p.heatLimit)warnings.push('Estimated peak heating exceeds the illustrative study cap.');
 if(entry.peakG.v>p.peakGLimit)warnings.push('Estimated capsule deceleration exceeds the chosen design cap.');
 if(p.totalMass-p.probeCount*p.probeMass<21)warnings.push('Non-probe mass allocation below the 21 kg Rev 3 design reference.');
 if(p.chuteAttached)warnings.push('Retained parachutes: canopy collapse/ground contact, wake and riser interference at impact are not modeled.');
 if(p.releaseAlt<3500)warnings.push('Low release altitude reduces sequencing and chute-inflation margin.');
 const selected=all[p.material];
 if(selected){
  if(selected.probes.some(r=>!r.feasible||!r.fitFeasible))warnings.push('One or more parachute targets are unreachable inside the sizing bounds.');
  if(selected.probes.some(r=>r.angle>15))warnings.push('One or more penetrators exceed 15 degrees from vertical; axial penetration calculations are not valid at those orientations.');
  if(selected.probes.some(r=>r.peakImpactG>2000))warnings.push('One or more probes exceed 2,000 Earth-g in the idealized impact model.');
 }
 warnings.push('Parachute inflation, trim/stability, heating, material strength and instrument survivability remain unverified.');
 return {p,entry,all,selected,warnings};
}
export function shieldTrade(p){
 const a=[];for(let d=.7;d<=1.801;d+=.1){try{const r=simulateEntry({...p,shieldD:d});a.push({D:+d.toFixed(2),peakHeat:r.peakHeat.v,peakG:r.peakG.v,releaseV:r.releaseSpeed});}catch{}}
 return a;
}
