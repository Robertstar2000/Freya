import fs from 'node:fs';
import {DEFAULTS,simulateEntry,atmosphere,penetration} from '../src/physics.js';
import {ORBIT_DEFAULTS,deorbit,burnHistory,thermalAssessment,RISK_REGISTER} from '../src/engineering.js';
const out = new URL('../data/',import.meta.url);fs.mkdirSync(out,{recursive:true});
const orbit=deorbit(ORBIT_DEFAULTS), p={...DEFAULTS};
const cases = [
 {label:'Steep Rev1 reference', entrySpeed:3450,entryAngle:-13},
 {label:'250 km deorbit, shallow',entrySpeed:orbit.entrySpeed,entryAngle:orbit.entryAngleDeg}
];
const side=[];
const csv=(name,cols,rows)=>{const esc=v=>typeof v==='number'?String(v):JSON.stringify(v??'');fs.writeFileSync(new URL(name,out),[cols.join(','),...rows.map(r=>cols.map(c=>esc(r[c])).join(','))].join('\n'))};
for (const item of cases) {
 const entry=simulateEntry({...p,entrySpeed:item.entrySpeed,entryAngle:item.entryAngle});
 side.push({case:item.label,entrySpeed:item.entrySpeed,entryAngle:item.entryAngle,releaseSpeed:entry.releaseSpeed,releaseTime:entry.releaseTime,peakHeat:entry.peakHeat.v,heatLoadMJm2:entry.heatLoad/100,peakG:entry.peakG.v,peakQ:entry.peakQ.v});
 const rows=entry.series.map(x=>({scenario:item.label,t_s:x.t,altitude_agl_m:x.h,speed_ms:x.v,heat_flux_Wcm2:1.898e-4*Math.sqrt(atmosphere(x.h,p)/(.25*p.shieldD))*x.v**3/1e4}));
 csv(item.label.startsWith('Steep')?'entry_steep_revision2.csv':'entry_shallow_revision2.csv', ['scenario','t_s','altitude_agl_m','speed_ms','heat_flux_Wcm2'],rows);
}
csv('entry_case_comparison.csv',['case','entrySpeed','entryAngle','releaseSpeed','releaseTime','peakHeat','heatLoadMJm2','peakG','peakQ'],side);
const trows=[];
for (const T of [10,25,50,100,250,500]){
 const o=deorbit({...ORBIT_DEFAULTS,thrustN:T});trows.push({thrust_N:T,burn_s:o.durationS,burn_min:o.durationS/60,deltaV_ms:o.deltaV,propellant_kg:o.propellantKg,finite_burn_orbit_percent:o.burnFraction*100,initial_acceleration_ms2:o.accelStart});
}
csv('thrust_trade.csv',['thrust_N','burn_s','burn_min','deltaV_ms','propellant_kg','finite_burn_orbit_percent','initial_acceleration_ms2'],trows);
const shock=[['ice',89.00225701918184,306.57946496386506],['damp',179.5534478534205,1480.3369058732521],['dry',239.45661115204166,2666.994874703425]]
 .map(([material,v,g])=>({material,impact_speed_ms:v,peak_g:g,mean_deceleration_g:v*v/(2*p.depth*9.80665),pulse_ms_proxy:2*p.depth/v*1000,force_150g_N:.15*g*9.80665,force_250g_N:.25*g*9.80665,kinetic_energy_kJ:.5*5*v*v/1000}));
csv('electronics_shock.csv',['material','impact_speed_ms','peak_g','mean_deceleration_g','pulse_ms_proxy','force_150g_N','force_250g_N','kinetic_energy_kJ'],shock);
const speed=[50,80,90,120,150,180,200,240,260,300];const depth=[];
for(const v of speed)for(const material of ['ice','damp','dry']){const s=penetration(p,material,v);depth.push({impact_speed_ms:v,material,penetration_depth_m:s.depth,initial_impact_g:s.peakG});}
csv('penetration_curves_table.csv',['impact_speed_ms','material','penetration_depth_m','initial_impact_g'],depth);
const thick=[];
for(const mm of [10,15,20,25,30])for(const rho of [240,270]){const s=thermalAssessment(simulateEntry(p),p,{tpsThicknessMm:mm,picaDensity:rho,backingMassKg:3.5,referenceAreaFactor:1.09});thick.push({thickness_mm:mm,PICA_density_kgm3:rho,projected_area_m2:s.shieldAreaM2,PICA_mass_kg:s.ablatorMassKg,shield_plus_backing_kg:s.shieldSystemMassKg});}
csv('tps_mass_trade.csv',['thickness_mm','PICA_density_kgm3','projected_area_m2','PICA_mass_kg','shield_plus_backing_kg'],thick);
console.log('Revision 2 exports',JSON.stringify({cases:side,shock,thrust:trows.find(x=>x.thrust_N===100)},null,2));
