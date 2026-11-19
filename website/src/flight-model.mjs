// Preliminary deterministic Mars flight model. SI units internally.
export const MARS={mu:4.2828e13,radius:3389500,rotation:2*Math.PI/88642.6848,g0:9.80665};
export const FLIGHT_DEFAULTS={minOrbits:3,maxOrbits:20,inclinationDeg:30,initialLongitudeDeg:0,targetLatDeg:0,targetLonDeg:0,targetToleranceKm:100,initialArgumentDeg:0,jetN:.1,jetIsp:65,separationJets:2,separationDv:.2,separationClearanceM:20,slewDeg:90,heatSlewDeg:180,inertiaA:1.5,inertiaB:3.75,leverM:.25,gasMarginPct:20,tankLitres:1,tankBar:200,tankMinBar:20,tankKelvin:293,leakPctDay:0,AthrustN:100,AimpulseNs:1280,Aisp:225,BburnSec:12.8,Bisp:250,BoxidizerFuel:4,propReservePct:25,moduleDryA:1.5,moduleDryB:3,extractionAltM:10000,releaseAltM:5000,releaseCadenceSec:2,carrierDryA:3,carrierDryB:8,probeDelaySec:1.5,inflateSec:2,windMps:0,rho0:.015,scaleHeightM:11000,sampleStep:.5,entryStep:.25,entryCd:1.5,tpsDensity:250,tpsCp:1200,tpsK:.15,tpsThicknessM:.015,surfaceLayerM:.002,emissivity:.85,initialTempK:210,noseRadiusM:.2,shoulderRadiusM:.07,shoulderFlowFactor:.45};
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x)),rad=x=>x*Math.PI/180,deg=x=>x*180/Math.PI;
export const wrapDegrees=x=>((x+180)%360+360)%360-180;
export function rk4(state,dt,derivative){const a=derivative(state),b=derivative(state.map((x,i)=>x+a[i]*dt/2)),c=derivative(state.map((x,i)=>x+b[i]*dt/2)),d=derivative(state.map((x,i)=>x+c[i]*dt));return state.map((x,i)=>x+dt*(a[i]+2*b[i]+2*c[i]+d[i])/6);}
export function rocketPropellant(mass,dv,isp){if(!(mass>0&&dv>=0&&isp>0))throw Error('Invalid rocket sizing inputs');return mass*(1-Math.exp(-dv/(isp*MARS.g0)));}
export function gasBudget(wetKg,options){const o={...FLIGHT_DEFAULTS,...options},Rnitrogen=296.8;
 const initialKg=o.tankBar*1e5*(o.tankLitres/1000)/(Rnitrogen*o.tankKelvin),minimumKg=o.tankMinBar*1e5*(o.tankLitres/1000)/(Rnitrogen*o.tankKelvin);
 const sepThrust=o.separationJets*o.jetN,sepSec=wetKg*o.separationDv/sepThrust,sepDistance=.5*o.separationDv*sepSec,coastSec=Math.max(0,(o.separationClearanceM-sepDistance)/o.separationDv);
 const inertia=o.inertia,torque=2*o.jetN*o.leverM,alpha=torque/inertia,slewSec=2*Math.sqrt(rad(o.slewDeg)/alpha),factor=1+o.gasMarginPct/100;
 const heatSlewSec=2*Math.sqrt(rad(o.heatSlewDeg)/alpha),heatSlewKg=2*o.jetN*heatSlewSec/(o.jetIsp*MARS.g0)*factor;
 const sepKg=wetKg*o.separationDv/(o.jetIsp*MARS.g0)*factor,slewKg=(2*o.jetN*slewSec)/(o.jetIsp*MARS.g0)*factor;
 return {initialKg,minimumKg,usableKg:initialKg-minimumKg,sepThrust,sepSec,sepDistance,coastSec,clearanceSec:sepSec+coastSec,torque,alpha,slewSec,sepKg,slewKg,heatSlewSec,heatSlewKg,preBurnKg:sepKg+slewKg,totalManeuverKg:sepKg+slewKg+heatSlewKg,maneuvers:[{id:"separation",name:"Second-stage separation translation",gasKg:sepKg,durationSec:sepSec},{id:"retro-alignment",name:"Retroburn alignment",angleDeg:o.slewDeg,gasKg:slewKg,durationSec:slewSec},{id:"heat-alignment",name:"Heat-shield entry alignment",angleDeg:o.heatSlewDeg,gasKg:heatSlewKg,durationSec:heatSlewSec}],pressureForMass:kg=>kg*Rnitrogen*o.tankKelvin/(o.tankLitres/1000)/1e5};}
export function integrateBurn({orbitKm,wetKg,thrustN,burnSec,isp,step=.05,gravity=true}){
 const r0=MARS.radius+orbitKm*1000,vc=Math.sqrt(MARS.mu/r0);let s=[r0,0,0,vc,wetKg],t=0;const flow=thrustN/(isp*MARS.g0),rows=[];
 if(!(thrustN>0&&burnSec>0&&flow*burnSec<wetKg))throw Error('Motor propellant exceeds available wet mass');
 const deriv=a=>{const [x,y,vx,vy,m]=a,r=Math.hypot(x,y),v=Math.hypot(vx,vy),g=gravity?-MARS.mu/r**3:0;return [vx,vy,g*x-thrustN/m*vx/v,g*y-thrustN/m*vy/v,-flow];};
 const row=()=>({t,x:s[0],y:s[1],alt:sliceRadius(s)-MARS.radius,vx:s[2],vy:s[3],v:Math.hypot(s[2],s[3]),mass:s[4],thrust:thrustN,propellant:wetKg-s[4]});
 rows.push(row());while(t<burnSec-1e-9){const dt=Math.min(step,burnSec-t);s=rk4(s,dt,deriv);t+=dt;rows.push(row());}
 const radius=sliceRadius(s),v=Math.hypot(s[2],s[3]),h=s[0]*s[3]-s[1]*s[2],energy=v*v/2-MARS.mu/radius,a=-MARS.mu/(2*energy),ecc=Math.sqrt(Math.max(0,1+2*energy*h*h/MARS.mu**2));
 return {rows,state:s,duration:burnSec,thrustN,isp,propellant:wetKg-s[4],idealDv:isp*MARS.g0*Math.log(wetKg/s[4]),initialV:vc,finalV:v,periapsisKm:(a*(1-ecc)-MARS.radius)/1000,impulse:thrustN*burnSec};
}
function sliceRadius(s){return Math.hypot(s[0],s[1]);}
export function coastToInterface(burn,{step=1,interfaceAlt=125000,moduleJettisonSec=5}={}){
 let s=burn.state.slice(),t=0;const rows=[{t,alt:sliceRadius(s)-MARS.radius,v:Math.hypot(s[2],s[3])}],target=MARS.radius+interfaceAlt;
 if(burn.periapsisKm*1000>interfaceAlt)return {reached:false,rows,duration:0};
 const deriv=a=>{const r=sliceRadius(a),g=-MARS.mu/r**3;return [a[2],a[3],g*a[0],g*a[1],0];};
 while(t<15000){const prev=s;s=rk4(s,step,deriv);t+=step;const r=sliceRadius(s),vr=(s[0]*s[2]+s[1]*s[3])/r;
  if(r<=target&&vr<0){const q=clamp((sliceRadius(prev)-target)/(sliceRadius(prev)-r),0,1);s=s.map((v,i)=>prev[i]+q*(v-prev[i]));t-=step*(1-q);const rr=sliceRadius(s);return {reached:true,rows,state:s,duration:t,theta:Math.atan2(s[1],s[0]),vr:(s[0]*s[2]+s[1]*s[3])/rr,vt:(s[0]*s[3]-s[1]*s[2])/rr,entryV:Math.hypot(s[2],s[3]),flightPathDeg:deg(Math.atan2((s[0]*s[2]+s[1]*s[3])/rr,(s[0]*s[3]-s[1]*s[2])/rr))};}
  if(Math.round(t)%10===0)rows.push({t,alt:r-MARS.radius,v:Math.hypot(s[2],s[3])});
 }
 return {reached:false,rows,duration:t};
}
export function temperatureStep(temp,q,dt,o){let [surface,bulk]=temp;const cs=o.tpsDensity*o.tpsCp*o.surfaceLayerM,cb=o.tpsDensity*o.tpsCp*(o.tpsThicknessM-o.surfaceLayerM),conductance=o.tpsK/(o.tpsThicknessM/2),sigma=5.670374419e-8;const steps=Math.ceil(dt/.025),h=dt/steps;
 for(let i=0;i<steps;i++){const conduction=conductance*(surface-bulk),radLoss=o.emissivity*sigma*(surface**4-o.initialTempK**4);surface+=h*(q-radLoss-conduction)/cs;bulk+=h*conduction/cb;}
 return [surface,bulk];
}
export function integrateEntry(coast,entryMass,diameterM,options){const o={...FLIGHT_DEFAULTS,...options};let s=[MARS.radius+125000,coast.theta,coast.vr,coast.vt],t=0;const area=Math.PI*diameterM**2/4,cd=o.entryCd,corotate=MARS.rotation*Math.cos(rad(o.inclinationDeg));let center=[o.initialTempK,o.initialTempK],shoulder=center.slice(),rows=[];
 const values=a=>{const alt=a[0]-MARS.radius,rho=o.rho0*Math.exp(-Math.max(0,alt)/o.scaleHeightM),relT=a[3]-corotate*a[0],vAir=Math.hypot(a[2],relT),drag=.5*rho*vAir*vAir*cd*area/entryMass,q=1.9027e-4*Math.sqrt(rho/o.noseRadiusM)*vAir**3;return {alt,rho,relT,vAir,drag,q};};
 const deriv=a=>{const v=values(a),r=a[0],vr=a[2],vt=a[3];return [vr,vt/r,vt*vt/r-MARS.mu/r**2-v.drag*vr/Math.max(1e-6,v.vAir),-vr*vt/r-v.drag*v.relT/Math.max(1e-6,v.vAir)];};
 const sample=()=>{const a=values(s);return {t,alt:a.alt,v:Math.hypot(s[2],s[3]),airV:a.vAir,vr:s[2],vt:s[3],theta:s[1],rho:a.rho,qCenter:a.q,qShoulder:a.q*o.shoulderFlowFactor*Math.sqrt(o.noseRadiusM/o.shoulderRadiusM),centerC:center[0]-273.15,shoulderC:shoulder[0]-273.15,centerBackC:center[1]-273.15,shoulderBackC:shoulder[1]-273.15,dynamicPressure:.5*a.rho*a.vAir*a.vAir};};
 rows.push(sample());let reached=false;
 while(t<4000){const dt=o.entryStep,prev=s;s=rk4(s,dt,deriv);let actual=dt;if(s[0]<=MARS.radius+o.extractionAltM){const f=clamp((prev[0]-MARS.radius-o.extractionAltM)/(prev[0]-s[0]),0,1);s=s.map((v,i)=>prev[i]+f*(v-prev[i]));actual*=f;reached=true;}
  const heat=values(s);center=temperatureStep(center,heat.q,actual,o);shoulder=temperatureStep(shoulder,heat.q*o.shoulderFlowFactor*Math.sqrt(o.noseRadiusM/o.shoulderRadiusM),actual,o);t+=actual;rows.push(sample());if(reached||s[0]>MARS.radius+180000)break;
 }
 return {rows,duration:t,reached,last:rows.at(-1),peakCenterC:Math.max(...rows.map(r=>r.centerC)),peakShoulderC:Math.max(...rows.map(r=>r.shoulderC)),peakQ:Math.max(...rows.map(r=>r.qCenter))};
}
function lowAltitudeDerivative(mass,areaCd,o){return s=>{const [x,h,vx,vy]=s,rho=o.rho0*Math.exp(-Math.max(0,h)/o.scaleHeightM),rx=vx-o.windMps,v=Math.hypot(rx,vy),k=.5*rho*v*areaCd/mass,g=MARS.mu/(MARS.radius+Math.max(0,h))**2;return [vx,vy,-k*rx,-g-k*vy];};}
function descentRow(t,s,mass,chute=1){return {t,x:s[0],alt:Math.max(0,s[1]),vx:s[2],vy:s[3],v:Math.hypot(s[2],s[3]),verticalSpeed:-s[3],mass,chute};}
export function integrateCarrier({entryLast,count,probeKg,chuteM,probeChuteM,carrierDryKg,options}){
 const o={...FLIGHT_DEFAULTS,...options};let s=[0,o.extractionAltM,entryLast.vt-MARS.rotation*(MARS.radius+o.extractionAltM)*Math.cos(rad(o.inclinationDeg)),entryLast.vr],t=0,remaining=count,nextRelease=null,releaseTime=null;const releases=[],rows=[];const bodyCdA=.4*.12;
 rows.push(descentRow(0,s,carrierDryKg+remaining*probeKg,0));
 while(t<4000&&s[1]>0){let dt=Math.min(.25,o.sampleStep);if(nextRelease!==null)dt=Math.min(dt,Math.max(.000001,nextRelease-t));const prev=s,prevT=t;
  const chute=clamp((t-1)/o.inflateSec,0,1),mass=carrierDryKg+remaining*probeKg,areaCd=bodyCdA+o.cd*Math.PI*chuteM*chuteM/4*chute;s=rk4(s,dt,lowAltitudeDerivative(mass,areaCd,o));t+=dt;
  if(releaseTime===null&&s[1]<=o.releaseAltM){const f=clamp((prev[1]-o.releaseAltM)/(prev[1]-s[1]),0,1);s=s.map((v,i)=>prev[i]+f*(v-prev[i]));t=prevT+f*dt;releaseTime=t;nextRelease=t;}
  if(remaining>0&&nextRelease!==null&&t>=nextRelease-1e-6&&s[1]>0){const id=count-remaining+1;releases.push({id,t,state:s.slice(),mass:probeKg});remaining--;nextRelease=remaining>0?t+o.releaseCadenceSec:null;}
  if(s[1]<=0){const f=clamp(prev[1]/(prev[1]-s[1]),0,1);s=s.map((v,i)=>prev[i]+f*(v-prev[i]));t=prevT+dt*f;s[1]=0;}
  rows.push(descentRow(t,s,carrierDryKg+remaining*probeKg,chute));
 }
 const probes=releases.map(release=>integrateProbe({release,probeKg,chuteM:probeChuteM,options:o}));
 return {rows,releases,probes,duration:t,unreleased:remaining,initialMass:carrierDryKg+count*probeKg,finalMass:carrierDryKg+remaining*probeKg};
}
export function integrateProbe({release,probeKg,chuteM,options}){const o={...FLIGHT_DEFAULTS,...options};let s=release.state.slice(),t=release.t;const rows=[descentRow(t,s,probeKg,0)];
 while(t-release.t<2000&&s[1]>0){const dt=Math.min(.25,o.sampleStep),prev=s,pt=t,chute=clamp((t-release.t-o.probeDelaySec)/o.inflateSec,0,1),areaCd=.45*Math.PI*.05**2/4+o.cd*Math.PI*chuteM**2/4*chute;s=rk4(s,dt,lowAltitudeDerivative(probeKg,areaCd,o));t+=dt;
  if(s[1]<=0){const f=clamp(prev[1]/(prev[1]-s[1]),0,1);s=s.map((v,i)=>prev[i]+f*(v-prev[i]));t=pt+dt*f;s[1]=0;}
  rows.push(descentRow(t,s,probeKg,chute));
 }
 return {id:release.id,releaseT:release.t,rows,impactT:t,duration:t-release.t,impactV:rows.at(-1).v,impactAngleDeg:deg(Math.atan2(Math.abs(rows.at(-1).vx),Math.abs(rows.at(-1).vy)))};
}
export function searchGroundTarget({orbitKm,coastAngle,flightSeconds,options}){const o={...FLIGHT_DEFAULTS,...options},period=2*Math.PI*Math.sqrt((MARS.radius+orbitKm*1000)**3/MARS.mu),incl=rad(o.inclinationDeg),u0=rad(o.initialArgumentDeg),lon0=rad(o.initialLongitudeDeg),targetLat=rad(o.targetLatDeg),targetLon=rad(o.targetLonDeg);const candidates=[];let best=null;
 const score=row=>row.missKm+(o.targetWaitPenaltyKmPerHour??0)*row.waitSec/3600;
 function better(a,b){
  if(!b)return true;
  const aMet=a.missKm<=o.targetToleranceKm,bMet=b.missKm<=o.targetToleranceKm;
  if(o.targetWaitPenaltyKmPerHour!==undefined&&aMet!==bMet)return aMet;
  return score(a)<score(b);
 }
 for(let orbit=o.minOrbits;orbit<=o.maxOrbits;orbit++){
  let orbitBest=null;const samples=orbit===o.maxOrbits?1:720;
  for(let k=0;k<samples;k++){const fraction=k/720,wait=(orbit+fraction)*period,u=u0+fraction*2*Math.PI+coastAngle,lat=Math.asin(Math.sin(incl)*Math.sin(u)),lon=lon0+Math.atan2(Math.cos(incl)*Math.sin(u),Math.cos(u))-MARS.rotation*(wait+flightSeconds);const cos=clamp(Math.sin(lat)*Math.sin(targetLat)+Math.cos(lat)*Math.cos(targetLat)*Math.cos(lon-targetLon),-1,1),miss=MARS.radius*Math.acos(cos)/1000;const row={orbit,orbitsElapsed:orbit+fraction,waitSec:wait,landingLat:deg(lat),landingLon:wrapDegrees(deg(lon)),missKm:miss,burnArgumentDeg:wrapDegrees(deg(u0+fraction*2*Math.PI))};if(better(row,orbitBest))orbitBest=row;}
  candidates.push(orbitBest);if(better(orbitBest,best))best=orbitBest;
 }
 const latitudeReachable=Math.abs(o.targetLatDeg)<=Math.min(Math.abs(o.inclinationDeg),180-Math.abs(o.inclinationDeg));
 return {period,candidates,best,matched:latitudeReachable&&best.missKm<=o.targetToleranceKm,latitudeReachable};
}
export function interpolateRows(rows,t){if(!rows?.length)return null;if(t<=rows[0].t)return {...rows[0]};if(t>=rows.at(-1).t)return {...rows.at(-1)};let lo=0,hi=rows.length-1;while(hi-lo>1){const mid=(lo+hi)>>1;if(rows[mid].t<=t)lo=mid;else hi=mid;}const a=rows[lo],b=rows[hi],f=(t-a.t)/(b.t-a.t),out={};for(const key of Object.keys(a))out[key]=typeof a[key]==='number'&&typeof b[key]==='number'?a[key]+f*(b[key]-a[key]):a[key];out.t=t;return out;}
export function runFlight(configKey,configuration,options={}){
 if(!['A','B'].includes(configKey))throw Error('Unknown flight configuration');
 for(const [key,value] of Object.entries({...configuration,...options}))if(typeof value==='number'&&!Number.isFinite(value))throw Error('Non-finite flight input: '+key);
 const o={...FLIGHT_DEFAULTS,...options};
 if(!(configuration.wetKg>0&&configuration.probeKg>0&&Number.isInteger(configuration.count)&&configuration.count>=1&&configuration.count<=7&&configuration.count*configuration.probeKg<configuration.wetKg&&configuration.diameterM>0&&configuration.pcmChuteM>0&&configuration.probeChuteM>0&&configuration.orbitKm>=150&&configuration.periapsisKm>0&&configuration.periapsisKm<configuration.orbitKm))throw Error('Invalid flight mass, geometry or orbit');
 for(const key of ['sampleStep','entryStep','inflateSec','rho0','scaleHeightM','tankLitres','tankKelvin','jetIsp','leverM','Aisp','Bisp','AthrustN','AimpulseNs','BburnSec','noseRadiusM','shoulderRadiusM','tpsDensity','tpsCp','tpsK','inertiaA','inertiaB','separationDv','separationJets','releaseCadenceSec'])if(!(o[key]>0))throw Error('Flight input must be positive: '+key);
 if(!(o.slewDeg>=0&&o.heatSlewDeg>=0))throw Error('Alignment angles must be nonnegative');
 if(!(Number.isInteger(o.minOrbits)&&Number.isInteger(o.maxOrbits)))throw Error('Orbit bounds must be whole numbers');o.cd=configuration.cd??.75;o.inertia=configKey==='A'?o.inertiaA:o.inertiaB;const c=configuration,ra=MARS.radius+c.orbitKm*1000,rp=MARS.radius+c.periapsisKm*1000,a=(ra+rp)/2,vc=Math.sqrt(MARS.mu/ra),requiredDv=vc-Math.sqrt(MARS.mu*(2/ra-1/a));
 if(!(o.minOrbits>=3&&o.maxOrbits<=20&&o.maxOrbits>=o.minOrbits&&o.releaseAltM<o.extractionAltM&&o.releaseAltM>0&&o.tpsThicknessM>o.surfaceLayerM&&o.tankBar>o.tankMinBar&&o.jetN>0))throw Error('Check orbit window, release heights, tank pressure and TPS layers');
 const gas=gasBudget(c.wetKg,o),isp=configKey==='A'?o.Aisp:o.Bisp,burnMass=c.wetKg-gas.preBurnKg,nominalProp=rocketPropellant(burnMass,requiredDv,isp),reserveProp=rocketPropellant(burnMass,requiredDv*(1+o.propReservePct/100),isp),thrust=configKey==='A'?o.AthrustN:nominalProp*isp*MARS.g0/o.BburnSec,duration=configKey==='A'?o.AimpulseNs/o.AthrustN:o.BburnSec;
 const burn=integrateBurn({orbitKm:c.orbitKm,wetKg:burnMass,thrustN:thrust,burnSec:duration,isp});const coast=coastToInterface(burn);const preliminaryGas=gas.totalManeuverKg;
 const moduleDry=configKey==='A'?o.moduleDryA:o.moduleDryB,entryMass=burn.state[4]-gas.heatSlewKg-moduleDry-Math.max(0,gas.initialKg-preliminaryGas);if(!(moduleDry>=0&&entryMass>0))throw Error('Module and stored gas exceed remaining vehicle mass');const out={configuration:configKey,options:o,gas,burn,coast,requiredDv,nominalProp,reserveProp,propReserve:reserveProp-nominalProp,BfuelKg:configKey==='B'?burn.propellant/(1+o.BoxidizerFuel):null,BoxidizerKg:configKey==='B'?burn.propellant*o.BoxidizerFuel/(1+o.BoxidizerFuel):null,entryMass,moduleDry,warnings:[]};
 if(!coast.reached){out.warnings.push('Fixed motor does not intersect the assumed 125 km entry interface.');return out;}
 const entry=integrateEntry(coast,entryMass,c.diameterM,o);out.entry=entry;if(!entry.reached){out.warnings.push('Entry does not reach the selected carrier extraction altitude.');return out;}
 const carrierDry=configKey==='A'?o.carrierDryA:o.carrierDryB;if(carrierDry+c.count*c.probeKg>entryMass)throw Error('Carrier and probe mass exceed remaining entry mass');
 const descent=integrateCarrier({entryLast:entry.last,count:c.count,probeKg:c.probeKg,chuteM:c.pcmChuteM,probeChuteM:c.probeChuteM,carrierDryKg:carrierDry,options:o});out.descent=descent;
 const firstImpact=descent.probes[0]?.rows.at(-1),flightSeconds=duration+coast.duration+entry.duration+(firstImpact?.t??descent.duration),extraAngle=(firstImpact?.x??0)/MARS.radius;
 const target=searchGroundTarget({orbitKm:c.orbitKm,coastAngle:entry.last.theta+extraAngle,flightSeconds,options:o});out.target=target;
 const leakage=gas.initialKg*(1-Math.exp(-o.leakPctDay/100*target.best.waitSec/86400));gas.leakageKg=leakage;gas.remainingKg=gas.initialKg-gas.totalManeuverKg-leakage;gas.remainingBar=gas.pressureForMass(Math.max(0,gas.remainingKg));gas.reserveKg=gas.remainingKg-gas.minimumKg;
 const burnStart=target.best.waitSec,alignStart=burnStart-gas.slewSec-5,entryStart=burnStart+duration+coast.duration,descentStart=entryStart+entry.duration;out.times={separationStart:0,separationEnd:gas.clearanceSec,alignStart,burnStart,burnEnd:burnStart+duration,heatAlignStart:burnStart+duration,heatAlignEnd:burnStart+duration+gas.heatSlewSec,moduleDetached:burnStart+duration+gas.heatSlewSec+5,entryStart,descentStart,carrierLanding:descentStart+descent.duration,lastProbeImpact:descentStart+Math.max(...descent.probes.map(x=>x.impactT)),missionFlightEnd:descentStart+Math.max(descent.duration,...descent.probes.map(x=>x.impactT))};
 if(out.times.moduleDetached>=entryStart)throw Error('Insufficient coast time for heat-shield alignment and module jettison before entry');
 if(!target.matched)out.warnings.push('No sampled 3–20-orbit candidate meets the target tolerance; closest candidate is displayed.');if(gas.reserveKg<0)out.warnings.push('Cold-gas tank falls below its minimum regulated pressure.');if(configKey==='A'&&burn.idealDv<requiredDv*(1+o.propReservePct/100))out.warnings.push('Delivered A impulse does not meet the selected delta-v planning allowance; nominal entry may still be possible.');if(descent.unreleased)out.warnings.push(`${descent.unreleased} probe(s) not released before carrier landing.`);
 return out;
}

export function gasUsage(f,time=0){
 if(!f?.gas||!f?.times)return null;
 const g=f.gas,t=f.times,ramp=(start,seconds)=>seconds>0?clamp((time-start)/seconds,0,1):0;
 const separationKg=g.sepKg*ramp(0,g.sepSec),retroAlignmentKg=g.slewKg*ramp(t.alignStart,g.slewSec),heatAlignmentKg=g.heatSlewKg*ramp(t.heatAlignStart,g.heatSlewSec),leakageKg=(g.leakageKg??0)*clamp(time/Math.max(1,t.burnStart),0,1);
 const consumedKg=separationKg+retroAlignmentKg+heatAlignmentKg+leakageKg,remainingKg=g.initialKg-consumedKg;
 return {separationKg,retroAlignmentKg,heatAlignmentKg,leakageKg,consumedKg,remainingKg,pressureBar:g.pressureForMass(Math.max(0,remainingKg))};
}
