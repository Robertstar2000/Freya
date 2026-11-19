import {MARS,interpolateRows,gasUsage} from './flight-model.mjs';
export const SOIL_DEFAULTS={impactDiameterM:.05,probeLengthM:.2,impactTiltDeg:0,sandResistanceMPa:.2,sandDensity:1600,sandCd:.8,soilResistanceMPa:3,soilDensity:2000,soilCd:1,sandstoneResistanceMPa:25,sandstoneDensity:2300,sandstoneCd:1.2};
export const SOIL_CASES=[{id:'sand',name:'Soft sand',color:'#ffcd82'},{id:'soil',name:'Hard soil',color:'#72dfca'},{id:'sandstone',name:'Sandstone',color:'#ccafff'}];
// Poncelet screen: F(v)=a+b*v². R is effective bearing resistance, not UCS.
export function impactEstimate(speed,mass,material,options={}){const o={...SOIL_DEFAULTS,...options},area=Math.PI*o.impactDiameterM**2/4,v=Math.max(0,speed)*Math.max(0,Math.cos(o.impactTiltDeg*Math.PI/180)),R=o[material+'ResistanceMPa']*1e6,rho=o[material+'Density'],cd=o[material+'Cd'];
 if(!(mass>0&&area>0&&R>0&&rho>0&&cd>=0))throw Error('Impact inputs must have positive mass, diameter, bearing resistance and density.');
 const a=area*R,b=.5*rho*cd*area,depth=v===0?0:b>0?mass/(2*b)*Math.log1p(b*v*v/a):mass*v*v/(2*a),peakG=v===0?0:(a+b*v*v)/(mass*MARS.g0),meanG=depth>0?v*v/(2*depth*MARS.g0):0,stopSec=v===0?0:b>0?mass/Math.sqrt(a*b)*Math.atan(v*Math.sqrt(b/a)):mass*v/a;
 return {material,speed:v,depth,peakG,meanG,stopSec,energyJ:.5*mass*v*v,area,resistanceN:a,inertialKgPerM:b,beyondLength:depth>o.probeLengthM};}
export function reviewMissionTime(f,events,state){if(!f?.times)return null;const e=state.event,t=f.times,g=f.gas,first=f.descent.releases[0]?.t??0,last=f.descent.releases.at(-1)?.t??first;
 if(e.group==='rideshare')return e.id==='host-separation'?state.fraction*t.separationEnd:0;
 if(e.group==='orient'){if(e.id==='cold-gas-slew')return t.alignStart+state.fraction*g.slewSec;if(e.id==='attitude-confirmed')return t.alignStart+g.slewSec+state.fraction*2;return t.burnStart-3+state.fraction*3;}
 if(e.group==='deorbit'){if(e.id==='retro-burn')return t.burnStart+state.fraction*f.burn.duration;if(e.id==='burn-confirmed')return t.burnEnd+state.fraction*2;return t.burnEnd+2+state.fraction*3;}
 const group=events.filter(x=>x.group===e.group),start=group[0].start,end=group.at(-1).end,q=(state.time-start)/Math.max(1,end-start),releaseEnd=t.descentStart+last+f.options.probeDelaySec+f.options.inflateSec;
 if(e.group==='entry')return t.entryStart+q*f.entry.duration;
 if(e.group==='extraction')return t.descentStart+q*Math.min(5,first);
 if(e.group==='release')return t.descentStart+Math.min(5,first)+q*(releaseEnd-t.descentStart-Math.min(5,first));
 if(e.group==='delivery')return releaseEnd+q*(t.missionFlightEnd-releaseEnd);
 return t.missionFlightEnd;}
function descentSample(rows,t){if(t<rows[0].t)return {status:'stowed',alt:null,v:null,loadG:null};const landed=t>=rows.at(-1).t-1e-6,r=landed?{...rows.at(-1)}:interpolateRows(rows,t);return {...r,status:landed?'landed':'descending',impactV:landed?r.v:null,v:landed?0:r.v};}
export function missionTelemetry(f,time,c,probeId=1){if(!f?.times||time===null)return null;const t=f.times,o=f.options,probe=f.descent.probes.find(p=>p.id===Number(probeId))??f.descent.probes[0];let capsule={status:'orbit',alt:c.orbitKm*1000,v:f.burn.initialV,loadG:0,centerC:o.initialTempK-273.15,shoulderC:o.initialTempK-273.15,mass:c.wetKg};
 if(time< f.gas.sepSec)capsule.loadG=f.gas.sepThrust/c.wetKg/MARS.g0;
 if(time>=t.burnStart&&time<t.burnEnd){const b=interpolateRows(f.burn.rows,time-t.burnStart);capsule={...capsule,...b,status:'burn',loadG:f.burn.thrustN/b.mass/MARS.g0};}
 else if(time>=t.burnEnd&&time<t.entryStart){const b=interpolateRows(f.coast.rows,time-t.burnEnd);capsule={...capsule,...b,status:'coasting',loadG:0,mass:time>=t.moduleDetached?f.entryMass:f.burn.state[4]-gasUsage(f,time).heatAlignmentKg};}
 else if(time>=t.entryStart){const e=interpolateRows(f.entry.rows,time-t.entryStart);capsule={...capsule,...e,status:time>=t.descentStart?'discarded':'entry',mass:f.entryMass,loadG:e.dynamicPressure*(o.entryCd??1.5)*Math.PI*c.diameterM**2/4/f.entryMass/MARS.g0};if(time>=t.descentStart)capsule={...capsule,alt:null,v:null,loadG:null};}
 const dt=time-t.descentStart,carrier=descentSample(f.descent.rows,dt),p=probe?descentSample(probe.rows,dt):{status:'stowed',alt:null,v:null};
 if(carrier.status==='descending'){const rho=o.rho0*Math.exp(-carrier.alt/o.scaleHeightM),vAir=Math.hypot(carrier.vx-o.windMps,carrier.vy),cdA=.4*.12+o.cd*Math.PI*c.pcmChuteM**2/4*carrier.chute;carrier.loadG=.5*rho*vAir*vAir*cdA/carrier.mass/MARS.g0;}
 if(p.status==='descending'){const rho=o.rho0*Math.exp(-p.alt/o.scaleHeightM),vAir=Math.hypot(p.vx-o.windMps,p.vy),cdA=.45*Math.PI*.05**2/4+o.cd*Math.PI*c.probeChuteM**2/4*p.chute;p.loadG=.5*rho*vAir*vAir*cdA/c.probeKg/MARS.g0;}
 return {time,capsule,carrier,probe:{...p,id:probe?.id??1,predictedImpactV:probe?.impactV??null},probes:f.descent.probes.map(pr=>({id:pr.id,...descentSample(pr.rows,dt)})),entryPeakG:Math.max(...f.entry.rows.map(r=>r.dynamicPressure*(o.entryCd??1.5)*Math.PI*c.diameterM**2/4/f.entryMass/MARS.g0))};}
