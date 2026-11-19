import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {CALCULATIONS,INPUT_GROUPS,OUTPUT_GROUPS,inputGroup,outputGroup} from '../src/calculation-catalog.mjs';
import {inspectorHtml} from '../src/calculation-inspector.mjs';
import {DEFAULTS,CONFIGS} from '../src/revision51-model.mjs';import {FLIGHT_DEFAULTS} from '../src/flight-model.mjs';import {SOIL_DEFAULTS} from '../src/mission-telemetry.mjs';
test('every source-defined mission, flight and impact input has an explicit calculation',()=>{
 const app=fs.readFileSync('src/revision51-app.mjs','utf8'),flight=fs.readFileSync('src/flight-ui.mjs','utf8');
 const getKeys=s=>[...s.matchAll(/\['(\w+)','[^']*',/g)].map(m=>m[1]);
 const missionKeys=getKeys(app.slice(app.indexOf('const fields='),app.indexOf('function init()')));
 const flightKeys=getKeys(flight.slice(flight.indexOf('const flightFields='),flight.indexOf('const flightCard=')));
 assert.equal(missionKeys.length,25);assert.ok(flightKeys.length>=35);
 for(const [ns,keys]of [['m',missionKeys],['f',flightKeys],['s',Object.keys(SOIL_DEFAULTS)]])for(const k of keys)assert.ok(CALCULATIONS[inputGroup(ns,k)],ns+'.'+k);
 for(const [id,d]of Object.entries(CALCULATIONS)){assert.ok(d.formula.length>30,id);assert.ok(d.constants&&d.notes&&d.source,id);}
});
test('all declared variables resolve in A and B; dynamic probe labels have coverage',()=>{
 for(const config of ['A','B']){const namespaces={m:{...DEFAULTS,...CONFIGS[config],suspendedKg:CONFIGS[config].wetKg},f:FLIGHT_DEFAULTS,s:SOIL_DEFAULTS};for(const d of Object.values(CALCULATIONS))for(const path of d.inputs){const [ns,key]=path.split('.');assert.notEqual(namespaces[ns]?.[key],undefined,path);}}
 for(let i=1;i<=7;i++)for(const metric of ['speed','altitude'])assert.equal(outputGroup(`Probe ${i} chute · ${metric}`),'descent');
 for(const group of Object.values(OUTPUT_GROUPS))assert.ok(CALCULATIONS[group]);assert.equal(inputGroup('m','unregistered'),null);assert.equal(outputGroup('Unknown metric'),null);
});
test('modal snapshots reflect changed values, preserve zero, escape content and tolerate no solution',()=>{
 globalThis.document={querySelector:()=>null};const info={title:'Probe energy remaining',value:'15.2 Wh',groups:['energy']};
 const snapshot={configuration:'A',inputs:{...DEFAULTS,...CONFIGS.A},soil:SOIL_DEFAULTS,flight:{options:FLIGHT_DEFAULTS,result:null},review:null};
 const before=inspectorHtml(info,snapshot);assert.ok(before.includes('E_remaining = E_usable − E_load'));snapshot.inputs.energyWh=80;snapshot.inputs.averageW=0;
 const after=inspectorHtml(info,snapshot);assert.ok(after.includes('<td>80</td>'));assert.ok(after.includes('<td>0</td>'));assert.notEqual(before,after);
 info.value='<img src=x onerror=alert(1)>';assert.ok(inspectorHtml(info,snapshot).includes('&lt;img'));assert.ok(!inspectorHtml(info,snapshot).includes('<img'));
 assert.throws(()=>inspectorHtml({...info,groups:['missing']},snapshot));delete globalThis.document;
});
