import fs from 'node:fs';
import {DEFAULTS,simulateMission,shieldTrade,atmosphere} from '../src/physics.js';
import {ORBIT_DEFAULTS,deorbit,orbitTrade,burnHistory,thermalAssessment,payloadShock,TPS,RISK_REGISTER} from '../src/engineering.js';
const out=new URL('../data/',import.meta.url);fs.mkdirSync(out,{recursive:true});
const p={...DEFAULTS},m=simulateMission(p),o=deorbit(ORBIT_DEFAULTS);
const q=x=>.5*atmosphere(x.h,p)*x.v*x.v;
const heat=x=>1.898e-4*Math.sqrt(atmosphere(x.h,p)/(p.shieldD*.25))*x.v**3/1e4;
function csv(name,cols,rows){const esc=x=>x===undefined||x===null?'': typeof x==='number'?Number.isFinite(x)?String(x):'':/[",\r\n]/.test(String(x))?'"'+String(x).replaceAll('"','""')+'"':String(x);fs.writeFileSync(new URL(name,out),[cols.join(','),...rows.map(r=>cols.map(c=>esc(r[c])).join(','))].join('\r\n'));}
csv('entry_trajectory.csv',['t_s','altitude_agl_m','speed_ms','fpa_deg','rho_kgm3','dynamic_q_pa','decel_g','stagnation_heat_Wcm2'],m.entry.series.map(x=>({t_s:x.t,altitude_agl_m:x.h,speed_ms:x.v,fpa_deg:x.gamma*180/Math.PI,rho_kgm3:atmosphere(x.h,p),dynamic_q_pa:q(x),decel_g:q(x)*p.shieldCd*Math.PI*p.shieldD**2/(4*p.totalMass*9.80665),stagnation_heat_Wcm2:heat(x)})));
csv('heat_shield_trade.csv',['diameter_m','peak_heat_Wcm2','peak_deceleration_g','release_speed_ms'],shieldTrade(p).map(x=>({diameter_m:x.D,peak_heat_Wcm2:x.peakHeat,peak_deceleration_g:x.peakG,release_speed_ms:x.releaseV})));
csv('penetrator_cases_18.csv',['material','probe','release_t_s','release_agl_m','release_speed_ms','chute_d_m','open_agl_m','open_pressure_pa','cut_agl_m','impact_t_s','impact_speed_ms','impact_angle_deg','penetration_m','initial_impact_g','ideal_fit'],Object.entries(m.all).flatMap(([mat,v])=>v.probes.map((x,i)=>({material:mat,probe:i+1,release_t_s:m.entry.releases[i].t,release_agl_m:m.entry.releases[i].h,release_speed_ms:m.entry.releases[i].v,chute_d_m:x.chuteD,open_agl_m:x.open?.h,open_pressure_pa:x.open?.q,cut_agl_m:x.cut?.h,impact_t_s:x.t,impact_speed_ms:x.v,impact_angle_deg:x.angle,penetration_m:x.depth,initial_impact_g:x.peakImpactG,ideal_fit:x.fitFeasible}))));
csv('orbital_trade.csv',['orbit_alt_km','periapsis_alt_km','delta_v_ms','entry_speed_ms','entry_fpa_deg','coast_to_EI_s','burn_mass_kg','thrust_N','Isp_s','propellant_kg','burn_duration_s','period_s'],orbitTrade(ORBIT_DEFAULTS).map(x=>({orbit_alt_km:x.orbitAltKm,periapsis_alt_km:x.periapsisKm,delta_v_ms:x.deltaV,entry_speed_ms:x.entrySpeed,entry_fpa_deg:x.entryAngleDeg,coast_to_EI_s:x.coastSeconds,burn_mass_kg:x.burnMassKg,thrust_N:x.thrustN,Isp_s:x.ispS,propellant_kg:x.propellantKg,burn_duration_s:x.durationS,period_s:x.periodS})));
csv('thrust_time.csv',['t_s','thrust_N','acceleration_ms2','cumulative_delta_v_ms','remaining_mass_kg'],burnHistory(o,250).map(x=>({t_s:x.t,thrust_N:x.thrust,acceleration_ms2:x.accel,cumulative_delta_v_ms:x.dv,remaining_mass_kg:x.remaining})));
csv('risk_register.csv',['id','risk','discipline','likelihood_1to5','severity_1to5','risk_score','priority','is_blocker','mitigation'],RISK_REGISTER.map(x=>({id:x.id,risk:x.name,discipline:x.category,likelihood_1to5:x.likelihood,severity_1to5:x.impact,risk_score:x.score,priority:x.priority,is_blocker:x.blocker,mitigation:x.mitigation})));
const sh=payloadShock(m),t=thermalAssessment(m.entry,p,TPS);
const summary={timestamp:'2026-10-25',status:'Conceptual. Does not establish flight safety.',assumptions:{...p,orbit:ORBIT_DEFAULTS,TPS},baseline:{entry:{peakG:m.entry.peakG,peakQ:m.entry.peakQ,peakHeat:m.entry.peakHeat,heatLoadMJm2:t.heatLoadMJm2,releaseTimeS:m.entry.releaseTime,releaseSpeedMS:m.entry.releaseSpeed},orbit:o,tps:t,shock:sh,riskCount:RISK_REGISTER.length,blockerCount:RISK_REGISTER.filter(x=>x.blocker).length},references:[
 {id:'N1',title:'NASA Mars fact sheet',url:'https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html'},
 {id:'N2',title:'NASA PICA MSL/Mars 2020 TPS material response',url:'https://ntrs.nasa.gov/citations/20210024735'},
 {id:'N3',title:'NASA Mars and Titan TPS design envelopes',url:'https://ntrs.nasa.gov/api/citations/20205006951/downloads/Mars%20Titan%20TPS%20Whitepaper%20Draft%20final.pdf'},
 {id:'N4',title:'NASA DS2 shock test results',url:'https://www.jpl.nasa.gov/news/mars-penetrators-successfully-complete-crucial-subsystem-test/'},
 {id:'N5',title:'NASA DS2 penetration and shock expected',url:'https://www.jpl.nasa.gov/nmp/ds2/mission/events.html'},
 {id:'N6',title:'NASA PICA heritage',url:'https://science.nasa.gov/science-research/science-enabling-technology/technology-highlights/protecting-future-planetary-missions-from-extreme-heat/'},
 {id:'N7',title:'NASA Mars 2020 thermal protection sizing',url:'https://ntrs.nasa.gov/citations/20220009403'},
 {id:'N8',title:'NASA heat shield measurements at Mars 2020',url:'https://www.jpl.nasa.gov/news/sensors-collect-crucial-nasa-data-on-mars-environment-with-perseverance-landing/'},
 {id:'N9',title:'Mars 2020 aerothermal measurements',url:'https://doi.org/10.2514/1.A35783'}]};
fs.writeFileSync(new URL('model_summary.json',out),JSON.stringify(summary,null,2));
console.log('Exported Freya tables',m.entry.series.length,'entry samples',RISK_REGISTER.length,'risks',RISK_REGISTER.filter(x=>x.blocker).length,'blockers.');
