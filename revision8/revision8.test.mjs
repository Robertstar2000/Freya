import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('index.html','utf8');
const model=html.slice(html.indexOf('const MODEL ='),html.indexOf('const state ='));
const compute=html.slice(html.indexOf('function computeCurrent()'),html.indexOf('function stateAt('));
function calculate(overrides={}) {
  const context=vm.createContext({overrides});
  return vm.runInContext(model+'\nconst state=Object.fromEntries(MODEL.groups.flatMap(g=>g.controls.map(c=>[c[0],c[5]])));Object.assign(state,overrides);\n'+compute+'\ncomputeCurrent()',context);
}
test('default model produces finite telemetry and expected allocation',()=>{
  const c=calculate();for(const [key,value] of Object.entries(c))assert.ok(Number.isFinite(value),key);
  assert.equal(c.probeClosure,0);assert.equal(c.carrierAllowance,21);
  assert.equal(c.usableWh,77);assert.ok(Math.abs(c.powerHours-77/15)<1e-10);
});
test('doubling relay distance costs 6.02 dB',()=>assert.ok(Math.abs(calculate({relayRange:2000}).linkMargin-calculate().linkMargin+20*Math.log10(2))<1e-10));
test('one probe has no between-probe spread',()=>assert.equal(calculate({probeCount:1}).totalSpread,0));
test('increased science mass updates power and mass closure',()=>{
  const a=calculate(),b=calculate({scienceMass:1.5});assert.ok(b.powerHours<a.powerHours);assert.equal(b.probeClosure,-.5);
});
test('all numeric control endpoints remain finite',()=>{
  const c=vm.runInNewContext(model+';MODEL.groups.flatMap(g=>g.controls)');
  for(const entry of c){if(entry[2]==='select')continue;for(const endpoint of [entry[3],entry[4]])for(const [key,value] of Object.entries(calculate({[entry[0]]:endpoint})))assert.ok(Number.isFinite(value),entry[0]+':'+key);}
});
test('report links resolve and release zoom controls remain present',()=>{
  for(const name of ['FREYA_Engineering_Study_Revision_8_Fully_Integrated.pdf','FREYA_Engineering_Study_Revision_8_Fully_Integrated.docx']){assert.ok(html.includes('href="'+name+'"'));assert.ok(fs.existsSync(name));}
  for(const id of ['camAuto','camWide','camClose','jumpRelease','mPhase','mPen','mSciMass','mSpread'])assert.ok(html.includes('id="'+id+'"'));
});
