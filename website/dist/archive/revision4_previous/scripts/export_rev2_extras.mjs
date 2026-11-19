import fs from 'node:fs';
import {DEFAULTS, simulateMission, simulateProbe, penetration} from '../src/physics.js';
import {deorbit, burnHistory} from '../src/engineering.js';
const root = new URL('../data/', import.meta.url);
const dump=(fn,cols,arr)=>fs.writeFileSync(new URL(fn,root),[cols.join(','), ...arr.map(r=>cols.map(c=>{const v=r[c]??'';return typeof v==='string'?`"${v.replaceAll('"','""')}"`:v}).join(','))].join('\n')+'\n');
const p=DEFAULTS;
const orbit=deorbit();
const shallow=simulateMission({...p, entrySpeed:orbit.entrySpeed,entryAngle:orbit.entryAngleDeg});
const list=[];
for(let [mat,v] of Object.entries(shallow.all))for(const x of v.probes)list.push({material:mat,probe:x.index,release_s:shallow.entry.releases[x.index-1].t,release_km:shallow.entry.releases[x.index-1].h/1000,release_speed_ms:shallow.entry.releases[x.index-1].v,chute_d_m:x.chuteD,impact_ms:x.v,impact_angle_deg:x.angle,impact_g:x.peakImpactG,depth_m:x.depth,fit_feasible:x.fitFeasible});
dump('penetrators_shallow_18.csv',['material','probe','release_s','release_km','release_speed_ms','chute_d_m','impact_ms','impact_angle_deg','impact_g','depth_m','fit_feasible'],list);
const sen=[];
for(const material of ['ice','damp','dry']){
 const bs=simulateMission(p),baseline=bs.all[material].probes[0];
 for(const densityScale of [0.7,1.0,1.3]){
  const pp={...p,rho0:p.rho0*densityScale},ent=simulateMission(pp), result=simulateProbe(pp,ent.entry.releases[0],baseline.chuteD);
  for(const resistanceScale of [0.5,1,1.5]){
   const field=material+'Strength', p2={...pp,[field]:pp[field]*resistanceScale};
   const impact=result?.v||NaN,depth=penetration(p2,material,impact).depth;
   sen.push({material,densityScale,resistanceScale,fixed_chute_m:baseline.chuteD,impact_speed_ms:impact,predicted_depth_m:depth});
  }
 }
}
dump('atmosphere_resistance_sensitivity.csv',['material','densityScale','resistanceScale','fixed_chute_m','impact_speed_ms','predicted_depth_m'],sen);
let history=burnHistory(orbit,80).filter((_,i)=>i%10===0);
dump('burn_milestones.csv',['t','thrust','accel','dv','remaining'],history);
console.log('Generated shallow probe, sensitivity, burn milestone CSV');
