import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,CONFIGS,DEFAULTS} from '../src/revision51-model.mjs';
import {runFlight,searchGroundTarget,MARS} from '../src/flight-model.mjs';
import {precursorMassPlan} from '../src/precursor-mass.mjs';
import {INITIAL_FLIGHT_OPTIONS,INITIAL_ORBIT_KM} from '../src/mission-settings.mjs';
import {impactEstimate,missionTelemetry} from '../src/mission-telemetry.mjs';
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t,`${a} differs from ${b}`);
test('independent RF, terminal drag, energy and orbital identities',()=>{
 const p={...DEFAULTS,...CONFIGS.B,suspendedKg:22},r=calculate(p);
 const wavelength=299792458/(p.frequencyMHz*1e6),loss=20*Math.log10(4*Math.PI*p.rangeKm*1000/wavelength);
 near(r.fspl,loss,.01);near(r.txWhHour*3600,r.txDc*p.dutySec/p.periodSec*3600);
 near(.5*p.rho*p.cd*Math.PI*p.probeChuteM**2/4*r.probeTerminal**2,p.probeKg*3.71);
 near(r.energyRemaining+r.scienceEnergy,p.energyWh);
 near(r.circular**2*(MARS.radius+p.orbitKm*1000),MARS.mu,.01);
});
test('unreachable latitude cannot be accepted even under generous tolerance',()=>{
 const r=searchGroundTarget({orbitKm:400,coastAngle:0,flightSeconds:1000,options:{targetLatDeg:31,inclinationDeg:30,targetToleranceKm:10000}});
 assert.equal(r.latitudeReachable,false);assert.equal(r.matched,false);
});
test('current A mass allocation, flight jettison and staged probe masses close',()=>{
 const plan=precursorMassPlan(20,INITIAL_FLIGHT_OPTIONS),c={...DEFAULTS,...CONFIGS.A,orbitKm:INITIAL_ORBIT_KM,probeKg:plan.probeTotalKg/3};
 near(plan.allocations.reduce((s,r)=>s+r.kg,0),20);near(plan.propellantKg,INITIAL_FLIGHT_OPTIONS.AimpulseNs/(225*MARS.g0));
 const f=runFlight('A',c,{...INITIAL_FLIGHT_OPTIONS,carrierDryA:plan.carrierDryKg});
 near(f.entryMass+f.moduleDry+f.gas.initialKg+f.burn.propellant,c.wetKg);
 near(f.descent.initialMass-f.descent.finalMass,c.count*c.probeKg);
 const telemetry=missionTelemetry(f,f.times.missionFlightEnd+1,c);assert.equal(telemetry.carrier.v,0);
 for(const p of telemetry.probes){assert.equal(p.v,0);assert.ok(p.impactV>0);}
 const refined=runFlight('A',c,{...INITIAL_FLIGHT_OPTIONS,carrierDryA:plan.carrierDryKg,entryStep:.125,sampleStep:.125});
 near(f.entry.peakCenterC,refined.entry.peakCenterC,2);near(f.descent.probes[0].impactV,refined.descent.probes[0].impactV,.2);
});
test('Poncelet work and duration agree with numerical force integration',()=>{
 const r=impactEstimate(75,2,'soil'),steps=100000,dv=75/steps;let depth=0,time=0;
 for(let i=0;i<steps;i++){const v=(i+.5)*dv,F=r.resistanceN+r.inertialKgPerM*v*v;depth+=2*v/F*dv;time+=2/F*dv;}
 near(depth,r.depth,1e-8);near(time,r.stopSec,1e-8);
});
test('invalid trades fail before propagation instead of hanging or emitting NaN',()=>{
 const c={...DEFAULTS,...CONFIGS.A};
 for(const bad of [{count:1.5},{probeKg:20},{paEfficiency:0},{frequencyMHz:0},{dutySec:61},{rfW:NaN}])assert.throws(()=>calculate({...c,...bad}));
 for(const bad of [{entryStep:0},{sampleStep:0},{BburnSec:0},{minOrbits:3.5},{tankKelvin:NaN}])assert.throws(()=>runFlight('A',c,bad));
});

import {PENETRATION_EVIDENCE,penetrationEvidenceMarkup} from '../src/penetration-evidence.mjs';
import fs from 'node:fs';
test('Spacek reference data preserve source status and never masquerade as calibrated soil data',()=>{
 assert.equal(PENETRATION_EVIDENCE.calibration.applied,false);
 assert.deepEqual(PENETRATION_EVIDENCE.impress.depthM,[.2,1]);
 assert.equal(PENETRATION_EVIDENCE.impress.plannedImpactMps,115);
 assert.equal(PENETRATION_EVIDENCE.impress.testArticleKg,1);
 assert.deepEqual(PENETRATION_EVIDENCE.references.find(x=>x.id==='metnet').depthM,[.542,.542]);
 assert.match(PENETRATION_EVIDENCE.references.find(x=>x.id==='ds2').status,/no recovered Mars/);
 assert.deepEqual(JSON.parse(fs.readFileSync('data/revision51/penetration_evidence.json')),PENETRATION_EVIDENCE);
 const estimates=[{name:'Soft sand',depth:.123}];
 const html=penetrationEvidenceMarkup({massKg:2,speedMps:85,diameterM:.05,estimates});
 assert.match(html,/85.00 m\/s/);assert.match(html,/Soft sand 0.123 m/);assert.match(html,/not fitted/);
 assert.match(penetrationEvidenceMarkup(),/Release a probe/);
 assert.ok(fs.readFileSync('index.html','utf8').includes('id="penetrationEvidence"'));
});

import {depthUncertainty,DEPTH_UNCERTAINTY} from '../src/penetration-uncertainty.mjs';
import {SOIL_DEFAULTS} from '../src/mission-telemetry.mjs';
test('3 sigma depth propagation matches independent numerical log sensitivities',()=>{
 const factors=DEPTH_UNCERTAINTY.oneSigmaFactors;
 for(const material of ['sand','soil','sandstone'])for(const speed of [1,85,200]){
  const mass=2,base=impactEstimate(speed,mass,material,SOIL_DEFAULTS).depth,h=1e-5;
  const parameters=[['mass',factors.mass],['impactDiameterM',factors.diameter],[material+'ResistanceMPa',factors.bearingResistance],[material+'Density',factors.density],[material+'Cd',factors.inertialCoefficient]];
  let variance=0;
  for(const [key,factor] of parameters){
   const calc=direction=>impactEstimate(speed,key==='mass'?mass*Math.exp(direction*h):mass,material,key==='mass'?SOIL_DEFAULTS:{...SOIL_DEFAULTS,[key]:SOIL_DEFAULTS[key]*Math.exp(direction*h)}).depth;
   const derivative=(Math.log(calc(1))-Math.log(calc(-1)))/(2*h);
   variance+=(derivative*Math.log(factor))**2;
  }
  const band=depthUncertainty(speed,mass,material,SOIL_DEFAULTS);
  near(band.nominal,base);near(band.sigmaLogDepth,Math.sqrt(variance),1e-9);
  near(Math.log(band.upper/base),3*band.sigmaLogDepth);near(Math.log(base/band.lower),3*band.sigmaLogDepth);
  assert.ok(band.lower>0&&band.lower<base&&band.upper>base);
 }
 const zero=depthUncertainty(0,2,'sand');assert.deepEqual(zero,{nominal:0,lower:0,upper:0,sigmaLogDepth:0});
 const constant=depthUncertainty(85,2,'sand',{sandCd:0});
 near(constant.sigmaLogDepth,Math.hypot(Math.log(factors.mass),2*Math.log(factors.diameter),Math.log(factors.bearingResistance)));
});

import {gasUsage} from '../src/flight-model.mjs';
import {firingState} from '../src/thermal-propulsion-instruments.mjs';
import {presentationEvents as reviewEvents,reviewMissionTime as reviewTime} from '../src/mission-review.mjs';
import {timelineState} from '../src/revision51-model.mjs';
test('all three cold-gas maneuvers close mass, timing, live inventory and firing state',()=>{
 for(const key of ['A','B']){
  const c={...DEFAULTS,...CONFIGS[key],orbitKm:400},f=runFlight(key,c,INITIAL_FLIGHT_OPTIONS),g=f.gas,t=f.times;
  assert.equal(g.maneuvers.length,3);assert.ok(g.heatSlewKg>0);
  near(g.totalManeuverKg,g.sepKg+g.slewKg+g.heatSlewKg);
  near(f.burn.rows[0].mass,c.wetKg-g.sepKg-g.slewKg);
  near(g.torque/f.options.inertia*(g.heatSlewSec/2)**2,Math.PI);
  near(g.heatSlewKg,2*f.options.jetN*g.heatSlewSec/(f.options.jetIsp*MARS.g0)*(1+f.options.gasMarginPct/100));
  near(t.heatAlignStart,t.burnEnd);near(t.heatAlignEnd-t.heatAlignStart,g.heatSlewSec);
  near(t.moduleDetached-t.heatAlignEnd,5);assert.ok(t.moduleDetached<t.entryStart);
  near(gasUsage(f,t.burnStart).heatAlignmentKg,0);
  near(gasUsage(f,t.heatAlignStart+g.heatSlewSec/2).heatAlignmentKg,g.heatSlewKg/2);
  const end=gasUsage(f,t.moduleDetached),later=gasUsage(f,t.entryStart);
  near(end.consumedKg,g.totalManeuverKg+g.leakageKg);near(end.remainingKg,g.remainingKg);near(end.pressureBar,g.remainingBar);near(later.consumedKg,end.consumedKg);
  near(f.burn.state[4]-g.heatSlewKg-f.moduleDry-(g.initialKg-g.totalManeuverKg),f.entryMass);
  assert.ok(firingState(f,t.heatAlignStart+g.heatSlewSec/4).heatAccel);
  assert.ok(firingState(f,t.heatAlignStart+g.heatSlewSec*3/4).heatDecel);
  assert.ok(firingState(f,t.moduleDetached).jets.every(x=>!x));
  const events=reviewEvents(c.count),e=events.find(x=>x.id==='heat-shield-slew');
  assert.ok(e.end<=events.find(x=>x.id==='module-jettison').start);
  near(reviewTime(f,events,timelineState(events,e.start+e.duration/2)),t.heatAlignStart+g.heatSlewSec/2);
  const noTurn=runFlight(key,c,{...INITIAL_FLIGHT_OPTIONS,heatSlewDeg:0});
  near(noTurn.gas.heatSlewKg,0);near(noTurn.burn.rows[0].mass,f.burn.rows[0].mass);near(noTurn.entryMass,f.entryMass);
  near(g.remainingKg-noTurn.gas.remainingKg,-g.heatSlewKg);
 }
});

import {scienceResourceCheck,SCIENCE_REVIEW,MARS_SOL_SECONDS} from '../src/science-review.mjs';
test('bioscience review separates assay duration and resource arithmetic from unmeasured detection performance',()=>{
 const a=scienceResourceCheck({...DEFAULTS,...CONFIGS.A}),b=scienceResourceCheck({...DEFAULTS,...CONFIGS.B});
 near(a.solHours,88775.244/3600);assert.notEqual(MARS_SOL_SECONDS,2*Math.PI/MARS.rotation);
 assert.equal(a.coversOneSol,false);assert.equal(b.coversOneSol,true);assert.equal(b.coversFiveSols,false);
 near(a.screenLoadWh,4.8);near(b.screenLoadWh,14.4);near(b.screenRemainingWh,5.6);near(a.averagePowerCeilingW,20/24);
 assert.equal(a.lifeDetectionProbability,null);assert.equal(a.assayDetectionLimit,null);
 const extraction=scienceResourceCheck({...DEFAULTS,...CONFIGS.A},'extract');assert.equal(extraction.minimumHours,null);assert.equal(extraction.coversOneSol,null);
 assert.throws(()=>scienceResourceCheck({...DEFAULTS,...CONFIGS.A,energyWh:NaN}));
 assert.equal(SCIENCE_REVIEW.requirements.length,10);assert.equal(new Set(SCIENCE_REVIEW.requirements.map(x=>x[0])).size,10);
 assert.ok(fs.existsSync(SCIENCE_REVIEW.source.path));
 assert.ok(fs.readFileSync('index.html','utf8').includes('id="scienceReviewLive"'));
});
