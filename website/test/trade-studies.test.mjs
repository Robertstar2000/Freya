import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {STUDIES, defaults, evaluateStudy, improve} from '../src/trade-studies-model.mjs';
import {MODEL_CALCULATIONS,MODELED_SEARCH,EVIDENCE_CALCULATIONS} from '../src/trade-calculations.mjs';
import {linkedTradeInputs} from '../src/trade-inputs.mjs';
import {CLOSURE_CRITERIA, compareEvidence, requirementStudies, searchEvidence} from '../src/trade-evidence.mjs';

const spec=JSON.parse(readFileSync('data/requirements/current-specification.json'));
const baseline=JSON.parse(readFileSync('data/requirements/default-baseline.json'));
const context=key=>({key,configuration:baseline.configurations[key].mission,carrierDryA:baseline.configurations.A.flight.carrierDryA});

test('all current requirements and closure items have valid study routes',()=>{
  const closureIds=spec.closures.map(item=>item.id);
  assert.deepEqual(Object.keys(CLOSURE_CRITERIA).sort(),closureIds.sort());
  const routes=new Set([...closureIds,...STUDIES.map(study=>study.id)]);
  assert.equal(spec.requirements.length,109);
  for(const req of spec.requirements) {
    const studies=requirementStudies(req);
    assert.ok(studies.length && studies.every(id=>routes.has(id)),req.id);
  }
});

test('both configurations evaluate every modeled study and preserve fixed screening inputs during optimization',()=>{
  for(const key of ['A','B']) for(const study of STUDIES){
    const inputs=defaults(study,key);
    const result=evaluateStudy(study,context(key),inputs);
    assert.ok(result.metrics.length,study.id);
    const optimized=improve(study,context(key),inputs,2,1);
    assert.ok(optimized.best,study.id);
    if(result.feasible) assert.ok(optimized.best.feasible,study.id);
    for(const field of Object.keys(inputs).filter(field=>!study.vary.includes(field)))
      assert.equal(optimized.values[field],inputs[field],study.id);
    if(study.id==='mission'){
      assert.equal(result.phases.filter(([label])=>label.startsWith('Release probe')).length,context(key).configuration.count);
      assert.ok(result.phases.every((row,index)=>!index || row[1]>=result.phases[index-1][1]));
    }
  }
});

test('evidence search uses nearby passing samples and preserves incomplete evidence',()=>{
  const sample=(coordinate,objective,margin='1',reference='test report')=>({name:'Candidate '+coordinate,
    reference,coordinate:String(coordinate),objective:String(objective),margins:[margin]});
  const rows=[sample(1,8),sample(2,4),sample(3,0,'-1'),sample(4,2),sample(5,1,'1','')];
  assert.deepEqual(compareEvidence(rows,1).map(row=>row.coordinate),['4','2','1','3','5']);
  assert.equal(searchEvidence(rows,1,1,1,6).current.coordinate,'2');
  assert.equal(searchEvidence(rows,1,1,2,6).current.coordinate,'4');
  assert.throws(()=>searchEvidence(rows,1,5,1,6),/passes every entered gate/);
});

test('linked controls seed the study once and pass shared settings through the calculator',()=>{
  const a=baseline.configurations.A;
  const live={key:'A',configuration:{...a.mission,probeChuteM:.64},
    flightOptions:{...a.flight,releaseAltM:5400,tpsThicknessM:.023,targetToleranceKm:250},
    entry:{npSup:.41,tpsResidual:2},soil:{soilResistanceMPa:6,soilDensity:2300}};
  const study=id=>STUDIES.find(s=>s.id===id);
  const chute=linkedTradeInputs(study('chute'),'A',baseline,live);
  assert.equal(chute.values.diameter,.64);
  assert.equal(chute.values.release,5400);
  assert.equal(chute.values.resistance,6);
  assert.equal(chute.context.soil.soilDensity,2300);
  const shield=linkedTradeInputs(study('shield'),'A',baseline,live);
  assert.equal(shield.values.thickness,23);
  assert.equal(shield.values.supersonic,.41);
  assert.equal(shield.values.residualFlux,2);
  const aMission=linkedTradeInputs(study('mission'),'A',baseline,live);
  const result=evaluateStudy(study('mission'),aMission.context,aMission.values);
  const miss=result.metrics.find(([label])=>label==='Target miss (km)')[1];
  assert.equal(result.checks[0][1],250-miss);
  const b=linkedTradeInputs(study('chute'),'B',baseline,live);
  assert.equal(b.values.diameter,baseline.configurations.B.mission.probeChuteM);
  assert.equal(b.values.resistance,6);
  assert.ok(!b.active);
  assert.equal(linkedTradeInputs(study('science'),'A',baseline,live).provenance.signal.label,'Study assumption');
});

test('every modeled study has annotated calculations and the closure comparisons document all search stages',()=>{
  assert.deepEqual(Object.keys(MODEL_CALCULATIONS).sort(),STUDIES.map(study=>study.id).sort());
  for(const model of Object.values(MODEL_CALCULATIONS)){
    assert.ok(model.steps.length>0);
    for(const [title,formula,comment] of model.steps) assert.ok(title && formula && comment);
    for(const [,path] of model.sources??[]) assert.ok(readFileSync(path,'utf8').length>0);
  }
  assert.ok(MODELED_SEARCH[1].includes('Shortfall'));
  assert.equal(EVIDENCE_CALCULATIONS.length,3);
});
