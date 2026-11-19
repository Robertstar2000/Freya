import test from 'node:test';import assert from 'node:assert/strict';
import {DEFAULTS,simulateMission,simulateEntry,targetVelocity,penetration,fitChute,simulateProbe,shieldTrade} from '../src/physics.js';
let cached;
test('Rev 3 capsule entry 45 kg retained and release is 10 km',()=>{
 cached=simulateMission({...DEFAULTS});const e=cached.entry;
 assert.ok(Math.abs(e.releaseTime-238.88625)<1.0,e.releaseTime);
 assert.ok(Math.abs(e.releaseSpeed-173.1)<2,e.releaseSpeed);
 assert.ok(Math.abs(e.peakG.v-5.0316)<.1,e.peakG.v);
 assert.ok(Math.abs(e.peakQ.v-1557.67)<30,e.peakQ.v);
 assert.ok(Math.abs(e.peakHeat.v-14.2454)<.25,e.peakHeat.v);
 assert.equal(e.releases.length,6);
});
test('Penetration model reproduces nominal material speed targets',()=>{
 for(const [k,ref] of [['ice',101.272],['dry',280.502],['damp',209.865]]){
  const v=targetVelocity(DEFAULTS,k);assert.ok(Math.abs(v-ref)<2,`${k}: ${v}`);
  assert.ok(Math.abs(penetration(DEFAULTS,k,v).depth-1.5)<1e-8);
 }
});
test('All 18 automatic chutes hit 1.5 m algebraic target',()=>{
 const m=cached||simulateMission({...DEFAULTS});
 for(const [key,v] of Object.entries(m.all)){assert.equal(v.probes.length,6);
  for(const probe of v.probes){assert.ok(probe.feasible,`${key} ${probe.index}`);assert.ok(probe.fitFeasible,`${key} ${probe.index}`);assert.ok(Math.abs(probe.depth-1.5)<.012,`${key} ${probe.index} ${probe.depth}`);}
 }
 assert.ok(Math.abs(m.all.ice.probes[0].chuteD-.552)<.03);
 assert.ok(Math.abs(m.all.dry.probes[0].chuteD-.147)<.03);
 assert.ok(Math.abs(m.all.damp.probes[0].chuteD-.273)<.03);
});
test('Release mass decreases sequentially by 4 kg',()=>{
 const e=simulateEntry(DEFAULTS);assert.deepEqual(e.releases.map(x=>x.massBefore),[45,41,37,33,29,25]);
 for(let i=1;i<6;i++)assert.ok(e.releases[i].h<e.releases[i-1].h);
});
test('Manual chute and denser atmosphere change results',()=>{
 const a=simulateMission({...DEFAULTS,chuteMode:'manual',manualChute:.5});
 const b=simulateMission({...DEFAULTS,chuteMode:'manual',manualChute:.5,rho0:.033});
 assert.ok(a.selected.probes[0].depth>b.selected.probes[0].depth);
 assert.ok(a.selected.probes.every(x=>x.chuteD===.5));
});
test('Invalid mass is not silently modeled',()=>{
 assert.throws(()=>simulateMission({...DEFAULTS,totalMass:24}),/mass/i);
});

test('Retained chute remains deployed at impact for all probes',()=>{
 const m=cached||simulateMission(DEFAULTS);for(const v of Object.values(m.all))for(const q of v.probes){assert.equal(q.cut,null);assert.equal(q.chuteAttached,true);assert.ok(q.impactChuteForce>0);assert.ok(q.chuteD>=.05);assert.ok(q.angle<15);}
});
test('8 km legacy release cannot fit later dry rock probes when chute retained',()=>{
 const m=simulateMission({...DEFAULTS,releaseAlt:8000});assert.ok(m.all.dry.probes.filter(x=>x.fitFeasible).length<6);
});
test('Optional cutaway mode is numerically distinct',()=>{
 const r=simulateMission({...DEFAULTS,chuteAttached:false,chuteMode:'manual',manualChute:.4});
 assert.ok(r.selected.probes.every(q=>q.cut&&q.chuteAttached===false));
});
