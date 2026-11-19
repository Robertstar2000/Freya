import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import {EVIDENCE_REVIEW as review}from'../src/requirement-evidence.mjs';import {requirementEvidenceMatches,requirementEvidenceMarkup}from'../src/requirement-evidence-ui.mjs';import{runFlight}from'../src/flight-model.mjs';
const requirements=JSON.parse(fs.readFileSync('data/revision51/requirements.json')),byId=Object.fromEntries(review.requirements.map(r=>[r.id,r]));
test('all 91 original requirements have distinct, complete evidence assessments and remain open',()=>{
 assert.equal(review.requirements.length,91);assert.equal(new Set(review.requirements.map(r=>r.id)).size,91);assert.deepEqual(review.requirements.map(r=>r.id),requirements.map(r=>r.id));
 for(const r of review.requirements){assert.equal(r.freyaVerified,false);assert.ok(r.simulation.scope.length>20);assert.ok(r.remaining.length>20);assert.ok(['supported','partial','shortfall','none'].includes(r.simulation.status));assert.ok(['partial','none','negative'].includes(r.heritage.status));}
 assert.notEqual(byId['GNC-001'],byId['GNC-01']);
});
test('every support mark links to a recorded check or a primary flight reference',()=>{
 for(const r of review.requirements){for(const id of r.simulation.checks)assert.ok(review.checks[id]);if(r.simulation.status!=='none')assert.ok(r.simulation.checks.length,r.id);
 if(r.heritage.status==='partial')assert.ok(r.heritage.sources.length);for(const id of r.heritage.sources){const source=review.sources[id];assert.ok(source.citation&&source.demonstrated&&source.accessed);assert.ok(new URL(source.url).hostname.endsWith('nasa.gov'));}}
 assert.ok(Object.values(review.checks).every(c=>c.actual&&c.criterion&&c.limits&&c.implementation));
});
test('assumed geometry, scripted stability, navigation truth and failed penetrators never become flight proof',()=>{
 for(const id of ['STR-001','STR-002','STR-003','STR-006','EDL-002','EDL-004','EDL-008','EDL-05','EDL-06','DER-001','DER-003','DER-004','DER-006','PRB-011'])assert.equal(byId[id].simulation.status,'none',id);
 assert.deepEqual(review.requirements.filter(r=>r.simulation.status==='shortfall').map(r=>r.id),['GNC-005','DER-002']);assert.equal(review.checks['S-A-MARGIN'].result,'shortfall');
 for(const r of review.requirements)if(r.heritage.sources.includes('H-DS2'))assert.equal(r.heritage.status,'negative');assert.equal(review.counts.fullyVerified,0);
});
test('evidence filters count overlapping categories correctly and search references and open gaps',()=>{
 const select=filter=>requirements.filter(r=>requirementEvidenceMatches(r,'',filter));assert.equal(select('simulation').length,review.counts.simulationSupport);assert.equal(select('flight').length,review.counts.flightHeritage);assert.equal(select('shortfall').length,2);assert.equal(select('negative').length,4);
 const union=new Set([...select('simulation'),...select('flight')].map(r=>r.id));assert.equal(select('both').length,select('simulation').length+select('flight').length-union.size);
 assert.ok(requirements.filter(r=>requirementEvidenceMatches(r,'Ingenuity')).length>=3);assert.ok(requirementEvidenceMarkup(requirements.find(r=>r.id==='GNC-005')).includes('S-A-MARGIN'));assert.ok(requirementEvidenceMarkup(requirements.find(r=>r.id==='GNC-002')).includes('https://science.nasa.gov/mission/kepler/'));
});
test('archived source fingerprints and baseline outcomes match the current unchanged calculation models',()=>{
 for(const [path,hash]of Object.entries(review.provenance.modelSha256))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex'),hash);
 const baselines=JSON.parse(fs.readFileSync('data/revision51/evidence/baseline_inputs.json'));
 for(const key of ['A','B']){const f=runFlight(key,baselines[key].inputs,baselines[key].options),record=review.checks['S-DELIVERY-'+key];assert.equal(record.result,'pass');assert.deepEqual(record.actual.probeImpactMps,f.descent.probes.map(p=>p.impactV));}
 assert.deepEqual(Object.values(review.checks).filter(c=>c.result!=='pass').map(c=>c.id),['S-A-MARGIN']);assert.deepEqual(JSON.parse(fs.readFileSync('data/revision51/requirement_evidence.json')),review);
});

test('offline bundle initializes evidence summary and filter as well as source UI',()=>{const offline=fs.readFileSync('FREYA_Operations_Simulator_Rev09.html','utf8');assert.equal((offline.match(/initRequirementEvidence\(filterRequirements\)/g)||[]).length,1);assert.ok(offline.includes('id="reqEvidence"'));assert.ok(offline.includes('S-A-MARGIN'));});
