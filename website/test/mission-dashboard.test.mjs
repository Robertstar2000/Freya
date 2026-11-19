import {presentationEvents,reviewMissionTime} from '../src/mission-review.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {CONFIGS,DEFAULTS,timelineState} from '../src/revision51-model.mjs';
import {runFlight} from '../src/flight-sampling.mjs';
import {missionTelemetry} from '../src/mission-telemetry.mjs';
import {INITIAL_ORBIT_KM,INITIAL_FLIGHT_OPTIONS} from '../src/mission-settings.mjs';
import {dashboardSeries,dashboardChart,initDashboard,renderDashboard} from '../src/mission-dashboard.mjs';
test('400 km K-class initial trade completes both flight solutions and drives dashboard through every review event',()=>{
 const nodes=new Map();const get=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',value:'',addEventListener(){},append(child){this.child=child;},setAttribute(key,value){this[key]=value;},click(){this.clicked=true;},dispatchEvent(){this.dispatched=true;}});return nodes.get(id);};
 globalThis.document={getElementById:get};initDashboard();assert.equal(get('mdAnimation').child,get('scene'));
 for(const config of ['A','B']){
 const c={...DEFAULTS,...CONFIGS[config],orbitKm:INITIAL_ORBIT_KM};const f=runFlight(config,c,INITIAL_FLIGHT_OPTIONS);
 assert.equal(c.orbitKm,400);assert.ok(f.times);if(config==='A'){assert.equal(f.burn.impulse,2000);assert.equal(f.burn.duration,20);}
 const rows=dashboardSeries(f);assert.equal(rows[0].alt,400);assert.ok(rows.at(-1).alt===0);assert.ok(rows.every(x=>Number.isFinite(x.t)&&Number.isFinite(x.alt)));
 const events=presentationEvents(c.count,'gas-trap');
 for(const event of events){const state=timelineState(events,event.start),time=reviewMissionTime(f,events,state),telemetry=missionTelemetry(f,time,c);renderDashboard({flight:f,telemetry,state,config,inputs:c,playing:false,speed:'5'});assert.ok(!get('mdTrajectory').innerHTML.includes('NaN'));assert.ok(get('mdProbes').innerHTML.includes('PROBE '+c.count));assert.equal(get('mdScrub').value,state.time);}
 }
 get('mdConfig').onchange({target:{value:'B'}});assert.equal(get('config').value,'B');assert.ok(get('config').dispatched);
 get('mdScrub').oninput({target:{value:'42'}});assert.equal(get('scrub').value,'42');assert.ok(get('scrub').dispatched);
 const partial=runFlight('A',{...DEFAULTS,...CONFIGS.A,orbitKm:400});assert.ok(dashboardSeries(partial).length);assert.match(dashboardChart([],'alt'),/No complete flight solution/);
 delete globalThis.document;
});

test('K-class propulsion replacement preserves wet mass and scales every other allocation equally',async()=>{
 const {precursorMassPlan}=await import('../src/precursor-mass.mjs');
 const p=precursorMassPlan(20,INITIAL_FLIGHT_OPTIONS);
 assert.ok(Math.abs(p.nitrogenKg-.1)<1e-12);
 assert.ok(Math.abs(p.propulsionKg-2.5064144115359364)<1e-10);
 assert.ok(Math.abs(p.allocations.reduce((a,b)=>a+b.kg,0)-20)<1e-12);
 for(const row of p.allocations.filter(r=>r.name!=='Deorbit propulsion'))assert.ok(Math.abs(row.kg/row.sourceKg-p.scale)<1e-12);
 const c={...DEFAULTS,...CONFIGS.A,orbitKm:INITIAL_ORBIT_KM,probeKg:p.probeTotalKg/CONFIGS.A.count};
 const f=runFlight('A',c,{...INITIAL_FLIGHT_OPTIONS,carrierDryA:p.carrierDryKg});
 assert.ok(f.times);assert.ok(Math.abs(f.burn.propellant-p.propellantKg)<1e-10);assert.equal(f.descent.initialMass,p.carrierDryKg+p.probeTotalKg);
 const larger=precursorMassPlan(20,{...INITIAL_FLIGHT_OPTIONS,AimpulseNs:2500});assert.ok(larger.scale<p.scale);
 const heavier=precursorMassPlan(20,{...INITIAL_FLIGHT_OPTIONS,moduleDryA:2});assert.ok(heavier.probeTotalKg<p.probeTotalKg);
 assert.throws(()=>precursorMassPlan(1,INITIAL_FLIGHT_OPTIONS),/exceeds/);
});

test('deployment includes a visible dashboard shell and versioned startup before JavaScript runs',async()=>{
 const fs=await import('node:fs');const html=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 assert.match(html,/<section id="missionDashboard"[\s\S]*?id="mdStatus"/);
 assert.match(html,/Open live Mission Control dashboard/);
 assert.match(html,/src="src\/mission-start\.mjs\?v=[a-f0-9]+"/);
 const entry=fs.readFileSync(new URL('../dist/src/mission-start.mjs',import.meta.url),'utf8');
 assert.match(entry,/import\('\.\/revision51-app\.mjs\?v=[a-f0-9]+'\)/);
 assert.match(entry,/Live telemetry could not start/);
});

test('orbital console uses finite model paths and embeds current thermal and propulsion panels',async()=>{
 const {orbitPath,trajectoryConsole,gasInstrument}=await import('../src/console-instruments.mjs');
 const {heatShieldInstrument,firingInstrument}=await import('../src/thermal-propulsion-instruments.mjs');
 const c={...DEFAULTS,...CONFIGS.A,orbitKm:400};const f=runFlight('A',c,INITIAL_FLIGHT_OPTIONS),points=orbitPath(f);
 assert.ok(points.length>100);assert.ok(points.every(p=>[p.t,p.alt,p.theta].every(Number.isFinite)));
 const r=missionTelemetry(f,f.times.descentStart+100,c);
 for(const svg of [trajectoryConsole(f,r,c,points),heatShieldInstrument(f,r.time),firingInstrument(f,r.time),gasInstrument(f,r.time)]){assert.match(svg,/<svg/);assert.ok(!svg.includes('NaN'));}
 const fs=await import('node:fs');const html=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 assert.ok(html.indexOf('id="missionDashboard"')<html.indexOf('id="labOverview"'));
 for(const id of ['mdTrajectory','mdThermal','mdFiring','mdGas','mdAnimation'])assert.match(html,new RegExp('id="'+id+'"[^>]*><svg'));
});

test('trajectory marker interpolates between samples and agrees with live descent telemetry',async()=>{
 const {orbitPath,trajectoryPosition}=await import('../src/console-instruments.mjs');
 for(const key of ['A','B']){
 const c={...DEFAULTS,...CONFIGS[key],orbitKm:400};const f=runFlight(key,c,INITIAL_FLIGHT_OPTIONS),points=orbitPath(f);
 // Halfway through a stored entry interval must not snap to either endpoint.
 const i=Math.floor(f.entry.rows.length/3),a=f.entry.rows[i],b=f.entry.rows[i+1],time=f.times.entryStart+(a.t+b.t)/2;
 const r=missionTelemetry(f,time,c),p=trajectoryPosition(f,r,points);
 assert.ok(Math.abs(p.alt-r.capsule.alt/1000)<1e-10);
 assert.ok(p.theta>Math.min(a.theta,b.theta)&&p.theta<Math.max(a.theta,b.theta));
 // At 60 display frames within one physics step, position changes continuously.
 const rows=f.descent.rows,j=Math.floor(rows.length/3),start=rows[j].t,end=rows[j+1].t,positions=[];
 for(let frame=0;frame<=60;frame++){
 const t=f.times.descentStart+start+(end-start)*frame/60,live=missionTelemetry(f,t,c),pose=trajectoryPosition(f,live,points);
 assert.ok(Math.abs(pose.alt-live.carrier.alt/1000)<1e-12);
 assert.ok(Math.abs(pose.theta-(f.entry.last.theta+live.carrier.x/3389500))<1e-12);
 positions.push(pose.alt);
 }
 assert.ok(new Set(positions).size>55,'descent must move between stored physics samples');
 const landing=missionTelemetry(f,f.times.carrierLanding,c),landPose=trajectoryPosition(f,landing,points);assert.equal(landPose.alt,0);
 const after=trajectoryPosition(f,missionTelemetry(f,f.times.missionFlightEnd+100,c),points);assert.equal(after.alt,0);
 // Reverse scrubbing and paused redraws use the requested physical time exactly.
 const mid=missionTelemetry(f,f.times.descentStart+(start+end)/2,c);assert.deepEqual(trajectoryPosition(f,mid,points),trajectoryPosition(f,mid,points));
 assert.equal(trajectoryPosition(f,missionTelemetry(f,0,c),points).alt,400);
 }
});

test('adjacent playback Start controls route to the correct simulation clock',async()=>{
 const {playbackStartTarget}=await import('../src/calculation-inspector.mjs');
 assert.equal(playbackStartTarget('mdScrub'),'play');assert.equal(playbackStartTarget('scrub'),'play');assert.equal(playbackStartTarget('flightScrub'),'flightPlay');
});

test('lower-right entry animation follows live altitude and carrier reaches the displayed ground',async()=>{
 const {missionScene}=await import('../src/presentation-scenes.mjs');
 const c={...DEFAULTS,...CONFIGS.A,orbitKm:400};const f=runFlight('A',c,INITIAL_FLIGHT_OPTIONS),events=presentationEvents(c.count,'gas-trap');
 const event=events.find(e=>e.group==='entry'),state=timelineState(events,event.start+event.duration/2);
 const sceneAt=alt=>missionScene({state:{...state,telemetry:{capsule:{alt}}},c,events,flight:f});
 const high=sceneAt(120000),low=sceneAt(15000);assert.notEqual(high,low);assert.match(high,/data-altitude-m="120000"/);assert.match(low,/data-altitude-m="15000"/);
 const delivery=events.find(e=>e.group==='delivery'),landingState=timelineState(events,delivery.start);
 landingState.telemetry=missionTelemetry(f,f.times.carrierLanding,c);
 const landed=missionScene({state:landingState,c,events,flight:f});assert.match(landed,/translate\(455 433\) scale\(0.6\)/);
});

test('main playback traverses the entire coast without a 400-to-125 km teleport',()=>{
 for(const key of ['A','B']){
 const c={...DEFAULTS,...CONFIGS[key],orbitKm:400},f=runFlight(key,c,INITIAL_FLIGHT_OPTIONS),events=presentationEvents(c.count);
 const coast=events.find(e=>e.id==='coast-to-entry'),jettison=events.find(e=>e.id==='module-jettison'),entry=events.find(e=>e.id==='entry-interface');
 assert.equal(jettison.end,coast.start);assert.equal(coast.end,entry.start);assert.equal(coast.duration,60);
 const sample=clock=>{const state=timelineState(events,clock),time=reviewMissionTime(f,events,state);return {time,alt:missionTelemetry(f,time,c).capsule.alt};};
 assert.equal(sample(coast.start).time,f.times.moduleDetached);assert.equal(sample(entry.start).time,f.times.entryStart);
 for(const boundary of [coast.start,entry.start]){const before=sample(boundary-1e-7),after=sample(boundary);assert.ok(after.time>=before.time);assert.ok(Math.abs(after.alt-before.alt)<.1,'altitude must remain continuous at coast boundaries');}
 const altitudes=[];let maxStep=0;
 // Actual 60 Hz playback at the default 5x setting.
 for(let clock=coast.start;clock<entry.start;clock+=5/60){const {alt}=sample(clock);if(altitudes.length)maxStep=Math.max(maxStep,Math.abs(alt-altitudes.at(-1)));altitudes.push(alt);}
 assert.ok(altitudes.some(h=>h>290000&&h<310000),'must display 300 km');assert.ok(altitudes.some(h=>h>190000&&h<210000),'must display 200 km');assert.ok(maxStep<2000,'frame step must be far below the skipped 275 km');
 assert.ok(sample(coast.start).alt>390000);assert.ok(Math.abs(sample(entry.start).alt-125000)<1);
 }
});

test('heat shield instrument interpolates computed temperatures and holds final values after discard',async()=>{
 const {thermalState,heatShieldInstrument}=await import('../src/thermal-propulsion-instruments.mjs');
 for(const key of ['A','B']){
 const c={...DEFAULTS,...CONFIGS[key],orbitKm:400},f=runFlight(key,c,INITIAL_FLIGHT_OPTIONS);
 assert.equal(thermalState(f,0).mode,'PRE-ENTRY');
 const i=Math.floor(f.entry.rows.length*.4),a=f.entry.rows[i],b=f.entry.rows[i+1],time=f.times.entryStart+(a.t+b.t)/2;
 const thermal=thermalState(f,time),live=missionTelemetry(f,time,c);
 assert.ok(Math.abs(thermal.centerC-live.capsule.centerC)<1e-10);assert.ok(Math.abs(thermal.shoulderC-live.capsule.shoulderC)<1e-10);
 assert.equal(thermal.mode,'LIVE ENTRY');assert.match(heatShieldInstrument(f,time),new RegExp(thermal.centerC.toFixed(1).replace('.','\\.')+' °C'));
 const end=thermalState(f,f.times.missionFlightEnd+100);assert.equal(end.mode,'LAST AT DISCARD');assert.equal(end.centerC,f.entry.rows.at(-1).centerC);
 assert.match(heatShieldInstrument(null),/No entry solution/);
 }
});

test('firing panel follows physical separation, slew reversal, ignition and burn cutoff',async()=>{
 const {firingState,firingInstrument}=await import('../src/thermal-propulsion-instruments.mjs');
 for(const key of ['A','B']){
 const c={...DEFAULTS,...CONFIGS[key],orbitKm:400},f=runFlight(key,c,INITIAL_FLIGHT_OPTIONS),g=f.gas,t=f.times;
 assert.deepEqual(firingState(f,g.sepSec/2).jets,[true,true,false,false,false,false]);
 assert.deepEqual(firingState(f,t.alignStart+g.slewSec/4).jets,[false,false,true,true,false,false]);
 assert.deepEqual(firingState(f,t.alignStart+g.slewSec*3/4).jets,[false,false,false,false,true,true]);
 assert.ok(firingState(f,g.sepSec+1).jets.every(v=>!v));
 assert.equal(firingState(f,t.burnStart-1e-6).on,false);assert.equal(firingState(f,t.burnStart).mode,'IGNITION');
 const burning=firingState(f,t.burnStart+f.burn.duration/2);assert.equal(burning.thrustN,f.burn.thrustN);assert.ok(burning.propellantUsed>0);assert.ok(Math.abs(burning.burnTime-f.burn.duration/2)<1e-9);
 assert.match(firingInstrument(f,t.burnStart+1),/data-engine-flame="true"/);
 const end=firingState(f,t.burnEnd);assert.equal(end.on,false);assert.equal(end.thrustN,0);assert.equal(end.burnTime,f.burn.duration);assert.equal(end.propellantUsed,f.burn.propellant);
 assert.ok(!firingInstrument(f,t.burnEnd).includes('data-engine-flame'));
 assert.equal(firingState(f,t.moduleDetached).mode,'MODULE DETACHED');
 }
});
