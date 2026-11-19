import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DEFAULTS, simulateMission} from '../src/physics.js';
import {ORBIT_DEFAULTS,deorbit,burnHistory,orbitTrade,thermalAssessment,RISK_REGISTER,PENETRATOR_ALLOCATION,PLANETARY_PROTECTION_GATES} from '../src/engineering.js';

test('250 km orbital trade matches Revision 3 inherited orbital parameters',()=>{
 const o=deorbit();
 assert.ok(Math.abs(o.deltaV-61.5567)<.02);
 assert.ok(Math.abs(o.entryAngleDeg-(-2.0383))<.02);
 assert.ok(Math.abs(o.coastSeconds-1617.24)<2);
 assert.ok(Math.abs(o.propellantKg-12.3806)<.02);
 assert.ok(Math.abs(o.durationS-273.177)<1);
});
test('Ideal rocket burn is finite, mass decreases, cumulative impulse increases',()=>{
 const o=deorbit(); const h=burnHistory(o,80);
 assert.equal(h.length,81);
 assert.ok(Math.abs(h[0].dv)<1e-12);
 for(let i=1;i<h.length;i++){
  assert.ok(h[i].t>h[i-1].t);
  assert.ok(h[i].remaining<h[i-1].remaining);
  assert.ok(h[i].dv>h[i-1].dv);
  assert.ok(h[i].accel>h[i-1].accel);
 }
 assert.ok(Math.abs(h.at(-1).dv-o.deltaV)<.00001);
});
test('Thrust changes burn duration but not ideal Isp propellant cost',()=>{
 const low=deorbit({...ORBIT_DEFAULTS,thrustN:25});
 const high=deorbit({...ORBIT_DEFAULTS,thrustN:250});
 assert.ok(Math.abs(low.propellantKg-high.propellantKg)<1e-10);
 assert.ok(Math.abs(low.durationS/high.durationS-10)<1e-10);
 assert.equal(orbitTrade().length,7);
});
test('Shallow deorbit path is distinct and has higher integrated heat dose',()=>{
 const o=deorbit(),steep=simulateMission({...DEFAULTS}),shallow=simulateMission({...DEFAULTS,entrySpeed:o.entrySpeed,entryAngle:o.entryAngleDeg});
 assert.ok(shallow.entry.releaseTime>steep.entry.releaseTime*2);
 assert.ok(shallow.entry.peakHeat.v<steep.entry.peakHeat.v);
 assert.ok(shallow.entry.heatLoad>steep.entry.heatLoad);
 for(const mat of ['ice','dry','damp'])assert.equal(shallow.all[mat].probes.length,6);
});
test('Illustrative TPS mass and all registered mission blockers',()=>{
 const m=simulateMission({...DEFAULTS}); const t=thermalAssessment(m.entry);
 assert.ok(Math.abs(t.ablatorMassKg-3.9684)<.02);
 assert.ok(Math.abs(t.shieldSystemMassKg-7.4684)<.02);
 assert.equal(RISK_REGISTER.length,22);
 assert.equal(RISK_REGISTER.filter(r=>r.blocker).length,17);
});
test('Report data exports have 18 probe scenarios per atmospheric profile',()=>{
 const rows=fs.readFileSync(new URL('../data/penetrator_cases_revision4.csv',import.meta.url),'utf8').trim().split('\n').slice(1);
 for(const profile of ['Rev4 steep 4kg attached','Rev4 orbit shallow 4kg attached']){
  const scenarios=rows.filter(row=>row.startsWith(profile+','));
  assert.equal(scenarios.length,18);
  for(const material of ['ice','dry','damp']) assert.equal(scenarios.filter(row=>row.split(',')[1]===material).length,6);
 }
});

test('Revision 4 science, canopy+antenna, power and structure budget closes at 4kg',()=>{
 assert.deepEqual(PENETRATOR_ALLOCATION.map(x=>x.massKg),[1,.5,.5,2]);
 assert.equal(PENETRATOR_ALLOCATION.reduce((sum,x)=>sum+x.massKg,0),4);
 assert.equal(PLANETARY_PROTECTION_GATES.length,5);
 assert.ok(PLANETARY_PROTECTION_GATES.every(x=>x.state==='OPEN'));
});
test('Web dashboard includes the complete Rev 4 budget, PP gates and docx',()=>{
 const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
 const app=fs.readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
 for(const id of ['probeMassRows','ppGateRows','allocationNote','ppStatus','ppClassification'])assert.match(html,new RegExp(`id="${id}"`));
 assert.match(html,/Freya_Engineering_Study_Revision_4\.docx/);
 assert.match(app,/PENETRATOR_ALLOCATION\.map/);
});

test('Revision 4 CSV and JSON agree with published 4 kg and open PP gates',()=>{
 const model=JSON.parse(fs.readFileSync(new URL('../data/model_summary_revision4.json',import.meta.url),'utf8'));
 assert.equal(model.revision,'4.0');
 assert.equal(model.baseline.totalMass,45);
 assert.equal(model.baseline.probeMass,4);
 assert.equal(model.baseline.probeCount,6);
 assert.equal(model.baseline.releaseAlt,10000);
 assert.equal(model.baseline.chuteAttached,true);
 assert.equal(model.risks,22);
 assert.equal(model.blockers,17);
 const riskcsv=fs.readFileSync(new URL('../data/risk_register_revision4.csv',import.meta.url),'utf8').trim().split('\n');
 assert.equal(riskcsv.length-1,22);
 const ppcsv=fs.readFileSync(new URL('../data/planetary_protection_gates_revision4.csv',import.meta.url),'utf8').trim().split('\n');
 assert.equal(ppcsv.length-1,5);
 assert.ok(ppcsv.slice(1).every(line=>line.endsWith(',OPEN')));
});

test('Revision 4 report and website specification are packaged and linked',()=>{
 const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
 for(const fn of ['Freya_Engineering_Study_Revision_4.docx','FREYA_Website_Specification_Revision_4.md']){
  assert.ok(fs.statSync(new URL('../'+fn,import.meta.url)).size>2000);
  assert.ok(html.includes(fn));
 }
});
