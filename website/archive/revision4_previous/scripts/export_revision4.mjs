import fs from 'node:fs';
import {DEFAULTS,simulateMission,simulateEntry,simulateProbe,penetration,atmosphere,targetVelocity} from '../src/physics.js';
import {deorbit,ORBIT_DEFAULTS,thermalAssessment,TPS,RISK_REGISTER,PENETRATOR_ALLOCATION,PLANETARY_PROTECTION_GATES} from '../src/engineering.js';
const dir = new URL('../data/',import.meta.url);fs.mkdirSync(dir,{recursive:true});
const write=(file,cols,rows)=>{const value=v=>v==null?'':typeof v==='number'?Number.isFinite(v)?String(v):'':/[\r\n,\"]/.test(String(v))?'"'+String(v).replaceAll('"','""')+'"':String(v);fs.writeFileSync(new URL(file,dir),[cols.join(','),...rows.map(r=>cols.map(c=>value(r[c])).join(','))].join('\n')+'\n');};
const p={...DEFAULTS},o=deorbit(ORBIT_DEFAULTS),legacy={...p,probeMass:5,releaseAlt:8000,chuteAttached:false};
const cases=[['Legacy Rev 2 5kg cutaway',legacy],['Rev4 steep 4kg attached',p],['Rev4 orbit shallow 4kg attached',{...p,entrySpeed:o.entrySpeed,entryAngle:o.entryAngleDeg}]];
const entryC=[],shock=[],probes=[];
for(const [label,params] of cases){const m=simulateMission(params),t=thermalAssessment(m.entry,params,TPS),e=m.entry;
 entryC.push({case:label,entrySpeed:params.entrySpeed,entryAngle:params.entryAngle,releaseAlt:params.releaseAlt,releaseSpeed:e.releaseSpeed,releaseTime:e.releaseTime,peakHeat:e.peakHeat.v,heatLoadMJm2:t.heatLoadMJm2,peakG:e.peakG.v,peakQ:e.peakQ.v,nonProbeMassKg:params.totalMass-6*params.probeMass});
 if(!label.startsWith('Legacy')){
 const rows=e.series.map(x=>({t_s:x.t,altitude_agl_m:x.h,speed_ms:x.v,heat_flux_Wcm2:1.898e-4*Math.sqrt(atmosphere(x.h,params)/(.25*params.shieldD))*x.v**3/1e4}));
 write(label.includes('steep')?'entry_steep_revision4.csv':'entry_shallow_revision4.csv',['t_s','altitude_agl_m','speed_ms','heat_flux_Wcm2'],rows);
 }
 for(const [mat,z] of Object.entries(m.all))for(const x of z.probes){let r=e.releases[x.index-1];probes.push({case:label,material:mat,probe:x.index,release_t_s:r.t,release_agl_m:r.h,release_speed_ms:r.v,chute_attached:x.chuteAttached,chute_d_m:x.chuteD,deploy_alt_m:x.open?.h,deploy_dynamic_q_pa:x.open?.q,impact_t_s:x.t,impact_speed_ms:x.v,impact_angle_deg:x.angle,penetration_m:x.depth,initial_impact_g:x.peakImpactG,impact_energy_kJ:.5*params.probeMass*x.v*x.v/1000,impact_riser_load_N:x.impactChuteForce,max_chute_load_N:x.chuteForce,fit_feasible:x.fitFeasible});}
 if(label==='Rev4 steep 4kg attached'){for(const [mat,z] of Object.entries(m.all)){const x=z.probes[0];shock.push({material:mat,impact_speed_ms:x.v,initial_g:x.peakImpactG,average_g:x.avgImpactG,pulse_proxy_ms:2*p.depth/x.v*1000,force_150g_module_N:x.peakImpactG*9.80665*.15,force_250g_battery_N:x.peakImpactG*9.80665*.25,energy_kJ:.5*p.probeMass*x.v*x.v/1000,nominal_chute_m:x.chuteD});}}
}
write('entry_case_comparison_revision4.csv',['case','entrySpeed','entryAngle','releaseAlt','releaseSpeed','releaseTime','peakHeat','heatLoadMJm2','peakG','peakQ','nonProbeMassKg'],entryC);
write('penetrator_cases_revision4.csv',['case','material','probe','release_t_s','release_agl_m','release_speed_ms','chute_attached','chute_d_m','deploy_alt_m','deploy_dynamic_q_pa','impact_t_s','impact_speed_ms','impact_angle_deg','penetration_m','initial_impact_g','impact_energy_kJ','impact_riser_load_N','max_chute_load_N','fit_feasible'],probes);
write('electronics_shock_revision4.csv',['material','impact_speed_ms','initial_g','average_g','pulse_proxy_ms','force_150g_module_N','force_250g_battery_N','energy_kJ','nominal_chute_m'],shock);
const trade=[];for(const alt of [4000,6000,8000,8500,9000,9250,9500,9750,10000,10500,11000,12000])for(const gap of [.5,1,2,3]){let r=simulateMission({...p,releaseAlt:alt,releaseGap:gap});for(let [mat,z] of Object.entries(r.all))trade.push({release_alt_m:alt,gap_s:gap,material:mat,release_speed_ms:r.entry.releaseSpeed,feasible_probes:z.probes.filter(x=>x.fitFeasible).length,min_chute_m:Math.min(...z.probes.map(x=>x.chuteD)),max_chute_m:Math.max(...z.probes.map(x=>x.chuteD)),min_penetration_m:Math.min(...z.probes.map(x=>x.depth)),max_impact_angle_deg:Math.max(...z.probes.map(x=>x.angle))});}
write('attached_chute_release_trade.csv',['release_alt_m','gap_s','material','release_speed_ms','feasible_probes','min_chute_m','max_chute_m','min_penetration_m','max_impact_angle_deg'],trade);
const sens=[];for(const mat of ['ice','damp','dry']){const b=simulateMission(p).all[mat].probes[0];for(const rho of [.7,1,1.3]){let pp={...p,rho0:p.rho0*rho},entry=simulateEntry(pp);const fixed=simulateProbe(pp,entry.releases[0],b.chuteD);for(const y of [.5,1,1.5]){let pc={...pp,[mat+'Strength']:pp[mat+'Strength']*y},pr=penetration(pc,mat,fixed?.v??NaN);sens.push({material:mat,atmos_density_factor:rho,strength_factor:y,fixed_parachute_d_m:b.chuteD,impact_speed_ms:fixed?.v,depth_m:pr.depth,initial_impact_g:pr.peakG});}}}
write('attached_chute_sensitivity.csv',['material','atmos_density_factor','strength_factor','fixed_parachute_d_m','impact_speed_ms','depth_m','initial_impact_g'],sens);
const t=thermalAssessment(simulateEntry(p),p,TPS);
const mass=[['Six complete penetrators',6*p.probeMass,'6 x 4 kg with canopies, avionics, batteries, and rigging'],['PICA + backing (illustrative)',t.shieldSystemMassKg,'15 mm PICA plus 3.5 kg backing; not qualified'],['Transferred aeroshell structural/TPS reserve',6,'Design allocation of all recovered probe mass'],['Release dispenser/mechanisms',3,'Placeholder, optimistic'],['Parent avionics and power',2,'Placeholder, optimistic'],['Harness and wiring',1,'Placeholder'],['Assembly interfaces',1,'Placeholder']].map(([item,mass_kg,basis])=>({item,mass_kg,basis}));
mass.push({item:'Unallocated contingency',mass_kg:p.totalMass-mass.reduce((a,b)=>a+b.mass_kg,0),basis:'Very small; still requires formal mass closure'});
write('mass_budget_revision4.csv',['item','mass_kg','basis'],mass);
write('risk_register_revision4.csv',['id','name','category','likelihood','impact','score','priority','blocker','mitigation'],RISK_REGISTER);
const perProbe=PENETRATOR_ALLOCATION.map(x=>({element:x.element,mass_kg:x.massKg,basis:x.basis}));
write('probe_4kg_allocation_revision4.csv',['element','mass_kg','basis'],perProbe);
write('planetary_protection_gates_revision4.csv',['id','name','criterion','state'],PLANETARY_PROTECTION_GATES);
const desc={revision:'4.0',reference:'steep 125km 3450m/s -13deg (independent of 250km deorbit)',baseline:p,orbit:o,entryComparison:entryC,shock,mass,perProbe,risks:RISK_REGISTER.length,blockers:RISK_REGISTER.filter(x=>x.blocker).length};
fs.writeFileSync(new URL('model_summary_revision4.json',dir),JSON.stringify(desc,null,2));
console.log(JSON.stringify({releaseAltitudeM:p.releaseAlt,firstSpeeds:shock.map(x=>[x.material,x.impact_speed_ms]),dryAltTrade:trade.filter(x=>x.material==='dry'&&x.gap_s===2).map(x=>[x.release_alt_m,x.feasible_probes]),mass:mass.reduce((s,x)=>s+x.mass_kg,0),blockers:desc.blockers},null,2));
