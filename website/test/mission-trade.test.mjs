import test from 'node:test';import assert from 'node:assert/strict';
import {impactEstimate,SOIL_DEFAULTS,missionTelemetry,reviewMissionTime} from '../src/mission-telemetry.mjs';
import {runFlight,MARS} from '../src/flight-model.mjs';
import {DEFAULTS,CONFIGS,presentationEvents,timelineState} from '../src/revision51-model.mjs';
import {missionScene,entryDisplayPose,ENTRY_DISPLAY_PATH} from '../src/presentation-scenes.mjs';
const c={...DEFAULTS,...CONFIGS.A},f=runFlight('A',c);
test('penetration model reproduces constant-force work and stopping identities',()=>{
 const r=impactEstimate(100,2,'sand',{sandCd:0}),force=Math.PI*.05**2/4*.2e6;
 assert.ok(Math.abs(r.depth-2*100**2/(2*force))<1e-10);
 assert.ok(Math.abs(r.stopSec-2*100/force)<1e-10);
 assert.ok(Math.abs(r.peakG-force/2/MARS.g0)<1e-10);
 const tilted=impactEstimate(100,2,'sand',{sandCd:0,impactTiltDeg:60});assert.ok(Math.abs(tilted.depth/r.depth-.25)<1e-10);
 assert.equal(impactEstimate(0,2,'sand').depth,0);assert.throws(()=>impactEstimate(10,0,'sand'));
});
test('Poncelet screen closes work and monotonically responds to velocity and material resistance',()=>{
 for(const material of ['sand','soil','sandstone']){let prior=0;for(const v of [10,50,100,200]){const r=impactEstimate(v,2,material);assert.ok(r.depth>prior);prior=r.depth;assert.ok(r.peakG>=r.meanG);const a=r.resistanceN,b=r.inertialKgPerM;assert.ok(Math.abs(Math.expm1(2*b*r.depth/2)-b*v*v/a)<1e-8);}}
 assert.ok(impactEstimate(85,2,'sand').depth>impactEstimate(85,2,'soil').depth);assert.ok(impactEstimate(85,2,'soil').depth>impactEstimate(85,2,'sandstone').depth);
});
test('review time is monotonic and live telemetry follows actual releases and ground arrival',()=>{
 const events=presentationEvents(c.count);let prior=-1;for(const e of events)for(const q of [0,.5,.999999]){const t=reviewMissionTime(f,events,timelineState(events,e.start+e.duration*q));assert.ok(t>=prior-1e-6,e.id);prior=t;}
 const release=f.descent.probes[0].rows[0].t;assert.equal(missionTelemetry(f,f.times.descentStart+release-.001,c).probe.status,'stowed');
 const mid=missionTelemetry(f,f.times.descentStart+release+10,c);assert.equal(mid.probe.status,'descending');assert.ok(mid.probe.alt>0);assert.ok(mid.probe.v>0);
 const end=missionTelemetry(f,f.times.missionFlightEnd+1,c);assert.equal(end.probe.status,'landed');assert.equal(end.probe.v,0);assert.equal(end.probe.alt,0);assert.equal(missionTelemetry(f,f.times.missionFlightEnd,c).carrier.status,'landed');assert.ok(end.probe.impactV>0);
 const entry=missionTelemetry(f,f.times.entryStart+f.entry.duration*.4,c);assert.ok(entry.capsule.centerC>0);assert.ok(entry.capsule.loadG>0);assert.equal(missionTelemetry(null,0,c),null);
});
test('requested flips outside entry remain intact; entry has a geometry-derived attitude',()=>{
 const events=presentationEvents(c.count);for(let i=0;i<17;i++){const e=events[i],svg=missionScene({state:timelineState(events,e.start+e.duration/2),c,events});
 assert.equal(/scale\(1 -1\) rotate/.test(svg),i>=8&&!(i>=9&&i<=11),`capsule step ${i+1}`);
 assert.equal(/translate\(0 (420|480)\) scale\(1 -1\)/.test(svg),i===8,`path step ${i+1}`);
 }
});

test('entry curve descends from space toward Mars with shield normal tangent and shield plane perpendicular',()=>{
 const events=presentationEvents(c.count);let lastY=-Infinity;
 for(let n=0;n<=100;n++){const p=entryDisplayPose(n/100),rad=p.angle*Math.PI/180,speed=Math.hypot(p.dx,p.dy);
  assert.ok(p.y>lastY);lastY=p.y;assert.ok(p.dx>0&&p.dy>0);
  const normal=[-Math.sin(rad),Math.cos(rad)],plane=[Math.cos(rad),Math.sin(rad)];
  assert.ok(Math.abs((normal[0]*p.dx+normal[1]*p.dy)/speed-1)<1e-12);
  assert.ok(Math.abs((plane[0]*p.dx+plane[1]*p.dy)/speed)<1e-12);
  assert.ok(normal[0]*(550-p.x)+normal[1]*(1060-p.y)>0,'shield faces toward Mars');
 }
 for(const i of [9,10,11]){const e=events[i];for(const q of [0,.5,.999]){const svg=missionScene({state:timelineState(events,e.start+e.duration*q),c,events});assert.ok(svg.includes('data-entry-capsule="true"'));assert.ok(svg.includes('d="'+ENTRY_DISPLAY_PATH+'"'));assert.ok(!svg.includes('scale(1 -1)'));}}
});
