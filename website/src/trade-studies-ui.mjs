import {STUDIES} from './trade-studies-model.mjs';
import {MODEL_CALCULATIONS,MODELED_SEARCH,EVIDENCE_CALCULATIONS} from './trade-calculations.mjs';
import {linkedTradeInputs,ENTRY_IDS} from './trade-inputs.mjs';
import {getFlightInspection} from './flight-ui.mjs';
import {getSoilInputs} from './mission-trade-ui.mjs';
import {screenForTarget} from './workspace-ui.mjs';
import {CLOSURE_CRITERIA, compareEvidence, requirementStudies, searchEvidence} from './trade-evidence.mjs';

const byId=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const number=value=>value.toLocaleString(undefined,{maximumSignificantDigits:7});
const table=(headers,rows)=>'<div class="table-wrap"><table><thead><tr>'+headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join('')+
  '</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(value=>'<td>'+esc(value)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
const models=new Map(STUDIES.map(study=>[study.id,study]));
const storageKey='freya-rev10-trade-evidence-v1';
let records={};
let specification, baseline, closures;
let activeOptimizer=null,optimizerInputs;
try {records=JSON.parse(localStorage.getItem(storageKey)??'{}')??{};} catch {}

function store(key,value) {
  records[key]=value;
  try {localStorage.setItem(storageKey,JSON.stringify(records));return true;}
  catch {return false;}
}

const numeric=(label,attributes)=>'<label>'+esc(label)+'<input type="number" '+attributes+'></label>';
const entries=(study,linked,values=linked.values)=>Object.entries(study.inputs).map(([key,field])=>{
  const data=linked.provenance[key];
  const source=data.href?`<a href="${data.href}">${esc(data.label)}</a>`:esc(data.label);
  const value=data.linkedValue===undefined?'':' · '+number(data.linkedValue);
  return '<div>'+numeric(field.label+(study.vary.includes(key)?' · varied':''),`name="${key}" min="${field.min}" max="${field.max}" step="any" value="${values[key]}" required`)+
    `<small class="input-source">${source}${value}</small></div>`;
}).join('');
const numericValues=(root,study)=>Object.fromEntries(Object.keys(study.inputs).map(key=>[key,root.querySelector(`[name="${key}"]`).valueAsNumber]));
const configOptions='<option value="A">A · 2028 precursor</option><option value="B">B · 2031 science vehicle</option>';
const workspaceConfiguration=()=>byId('config')?.value==='B'?'B':'A';

function loadLinkedInputs(study,key){
  const snapshot=getFlightInspection();
  const entry=Object.fromEntries(ENTRY_IDS.map(id=>[id,byId(id)?.valueAsNumber]));
  return linkedTradeInputs(study,key,baseline,{
    key:workspaceConfiguration(),configuration:snapshot.inputs,flightOptions:snapshot.options,
    soil:getSoilInputs(),entry,burn:snapshot.result?.burn,gas:snapshot.result?.gas,
  });
}

function sourceContext(study,linked){
  const source=linked.active?'Snapshot of the active workspace':'Rev 10 baseline plus shared lab settings';
  const {configuration:c,flightOptions:options,soil}=linked.context;
  let rows=[];
  if(['mission','shield','chute','propulsion'].includes(study.id)){
    rows=[
      ['Reference orbit (km)',c.orbitKm],['Vehicle wet mass (kg)',c.wetKg],['Number of probes',c.count],
      ['Probe mass (kg)',c.probeKg],['Aeroshell diameter (m)',c.diameterM],['Parachute drag coefficient',c.cd],
      ['Atmosphere density (kg/m³)',options.rho0],['Atmosphere scale height (m)',options.scaleHeightM],
      ['Wind (m/s)',options.windMps],
    ];
  }
  if(study.id==='chute')rows.push(['Effective probe diameter (m)',soil.impactDiameterM],
    ['Hard-soil density (kg/m³)',soil.soilDensity],['Hard-soil inertial coefficient',soil.soilCd],
    ['Additional impact obliquity (°)',soil.impactTiltDeg]);
  if(study.id==='shield')rows.push(['TPS density (kg/m³)',options.tpsDensity],
    ['TPS heat capacity (J/kg K)',options.tpsCp],['TPS conductivity (W/m K)',options.tpsK],
    ['TPS emissivity',options.emissivity]);
  if(study.id==='energy')rows.push(['Surface operation goal (h)',c.operationHours]);
  if(study.id==='mass')rows.push(['Rev 10 wet-mass ceiling (kg)',linked.context.massLimitKg],
    ['Number of probes',c.count],['Probe mass (kg)',c.probeKg]);
  return `<p>${source} · configuration ${linked.context.key}. Reload to use newer workspace inputs.</p>`+
    (rows.length?`<details><summary>View linked model inputs</summary>${table(['Input','Value'],rows.map(([label,value])=>[label,number(value)]))}</details>`:'');
}

function workerRequest(payload,onComplete) {
  const worker=new Worker(new URL('./trade-studies-worker.mjs',import.meta.url),{type:'module'});
  worker.onmessage=({data})=>{worker.terminate();onComplete(data);};
  worker.onerror=()=>{worker.terminate();onComplete({error:'The model worker could not run.'});};
  worker.postMessage(payload);
  return worker;
}

function results(result) {
  return '<p class="'+(result.feasible?'pass':'fail')+'">'+
    (result.feasible?'Meets entered screening gates':'One or more screening gates missed')+' · score '+number(result.score)+'</p>'+
    table(['Metric','Result'],result.metrics.map(([label,value])=>[label,number(value)]))+
    table(['Screening gate','Signed margin','Outcome'],result.checks.map(([label,value])=>[label,number(value),value>=0?'Meets':'Shortfall']))+
    (result.phases?.length?table(['Phase or event','Seconds since host separation','Altitude (km)'],
      result.phases.map(([label,time,alt])=>[label,number(time),number(alt/1000)])):'');
}

function showCalculations(id,form) {
  const study=models.get(id);
  const item=closures.get(id);
  const dialog=byId('tradeCalculationDialog');
  byId('tradeCalculationTitle').textContent=study?.title??`${id} · ${item.title}`;
  const model=MODEL_CALCULATIONS[id];
  const steps=model?[...model.steps,MODELED_SEARCH]:EVIDENCE_CALCULATIONS;
  const calculations=steps.map(([title,formula,comment])=>
    `<div class="trade-calculation"><h3>${esc(title)}</h3><pre>${esc(formula)}</pre><p>${esc(comment)}</p></div>`).join('');
  const inputDetails=study?`<details><summary>Current study inputs and search steps</summary>${table(
    ['Input','Current value','Base search step'],
    Object.entries(study.inputs).map(([key,field])=>[
      field.label,form.elements.namedItem(key)?.value??'',
      study.vary.includes(key)?number(field.step):'Fixed during search',
    ]),
  )}</details>`:
    `<h3>Criteria for ${id}</h3><ul>${CLOSURE_CRITERIA[id].map(criterion=>`<li>${esc(criterion)}</li>`).join('')}</ul>`;
  const sources=model?[
    ['Trade objective and optimizer implementation','src/trade-studies-model.mjs'],
    ...(model.sources??[]),
  ]:[['Candidate ranking and sample search implementation','src/trade-evidence.mjs'],
    ['Rev 10 evidence requirement','current-requirements.html#'+id]];
  byId('tradeCalculationBody').innerHTML=calculations+inputDetails+
    `<h3>Calculation sources</h3><ul>${sources.map(([label,href])=>
      `<li><a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a></li>`).join('')}</ul>`;
  dialog.showModal();
  dialog.scrollTop=0;
}

function openOptimizer(id,key,values,linked) {
  if (activeOptimizer) stopOptimization();
  byId('optStudy').value=id;
  if(key) byId('optConfig').value=key;
  renderOptimizer(values,linked);
  location.hash='optimizer';
  byId('optStudy').focus({preventScroll:true});
}

function renderModels() {
  for (const study of STUDIES) {
    const article=document.createElement('article');
    article.className='model';
    article.id='study-'+study.id;
    article.innerHTML=`<h3>${esc(study.title)}</h3><p>${esc(study.description)}</p>
      <p>${study.closure.map(id=>`<a href="#${id}">${id}</a>`).join(' · ')}</p>
      <div class="actions"><a href="${esc(study.link.replace(/^index\.html(?=#)/,''))}">Related lab function</a>
      <button type="button" class="secondary" data-calculations aria-haspopup="dialog">Calculations</button></div>
      <details><summary>Screen a candidate</summary><form>
      <div class="fields"><label>Configuration<select name="configuration">${configOptions}</select></label></div>
      <div data-context></div><div class="fields" data-inputs></div>
      <div class="actions"><button>Evaluate candidate</button><button class="secondary" type="button" data-reload>Reload linked inputs</button><button class="secondary" type="button" data-opt>Open in optimizer</button></div>
      </form><div role="status"></div><div class="model-result"></div></details>`;
    const form=article.querySelector('form'), run=form.querySelector('button'), status=article.querySelector('[role=status]');
    article.querySelector('[data-calculations]').onclick=()=>showCalculations(study.id,form);
    let linked;
    const loadDefaults=()=>{
      linked=loadLinkedInputs(study,form.elements.configuration.value);
      form.querySelector('[data-inputs]').innerHTML=entries(study,linked);
      form.querySelector('[data-context]').innerHTML=sourceContext(study,linked);
      status.textContent='';
      article.querySelector('.model-result').replaceChildren();
    };
    form.elements.configuration.value=workspaceConfiguration();
    form.elements.configuration.onchange=loadDefaults;
    form.querySelector('[data-reload]').onclick=loadDefaults;
    loadDefaults();
    form.onsubmit=event=>{
      event.preventDefault();
      form.elements.configuration.disabled=true;
      form.querySelector('[data-reload]').disabled=true;
      run.disabled=true;
      status.textContent='Evaluating…';
      article.querySelector('.model-result').replaceChildren();
      workerRequest({id:study.id,context:linked.context,values:numericValues(form,study)},({result,error})=>{
        run.disabled=false;
        form.elements.configuration.disabled=false;
        form.querySelector('[data-reload]').disabled=false;
        status.textContent=error??'Candidate evaluated.';
        if(result) article.querySelector('.model-result').innerHTML=results(result);
      });
    };
    form.querySelector('[data-opt]').onclick=()=>{
      if(form.reportValidity()) openOptimizer(study.id,form.elements.configuration.value,numericValues(form,study),linked);
    };
    byId('models').append(article);
  }
}

const labelInput=(label,field,value,mode='text')=>`<label>${esc(label)}<input type="${mode}" ${mode==='number'?'step="any"':''} data-field="${field}" value="${esc(value)}"></label>`;
const candidateNames={
  'TBD-06':['Recorded sealed gas/trap concept','Benner incubation and extraction concept','2028 oxidant chemistry alternative'],
  'TBD-09':['onsemi MICROFC-60035-SMT','onsemi MICROFC-30035','Broadcom AFBR-S4N44C013','Eikonal Optics SIPM-01'],
  'TBD-16':['Top bridge mount','Heat-shield mount'],
};
const newRow=(count,name='')=>({name,coordinate:'',reference:'',objective:'',margins:Array(count).fill('')});
const closureRows=(id,key)=>records[key+'-'+id]??[];

function renderClosures() {
  for (const item of specification.closures) {
    const criteria=CLOSURE_CRITERIA[item.id];
    const section=document.createElement('details');
    section.id=item.id;
    section.innerHTML=`<summary>${item.id} · ${esc(item.title)}</summary>
      <p>${esc(item.proposedOwner)} · Open</p><p>${esc(item.closureEvidence)}</p>
      <p><a href="current-requirements.html#${item.id}">Rev 10 closure entry</a></p>
      <p>${STUDIES.filter(s=>s.closure.includes(item.id)).map(s=>`<a href="#study-${s.id}">${esc(s.title)}</a>`).join(' · ')}${item.id==='TBD-16'?'<a href="#mount-trade">Mounting priority sensitivity and thrust alignment</a>':''}</p>
      <label>Configuration<select data-config>${configOptions}</select></label>
      <div data-candidates></div>
      <div class="actions"><button type="button" class="secondary" data-add>Add candidate</button>
      <button type="button" data-compare>Save and compare</button>
      <button type="button" class="secondary" data-calculations aria-haspopup="dialog">Calculations</button><button type="button" class="secondary" data-opt>Open in optimizer</button></div>
      <p role="status"></p><div data-ranking></div>`;
    const key=()=>section.querySelector('[data-config]').value;
    const candidates=section.querySelector('[data-candidates]');
    const status=section.querySelector('[role=status]');
    const ranking=section.querySelector('[data-ranking]');
    function insert(row){
      const fieldset=document.createElement('fieldset');
      fieldset.innerHTML=`<legend>Candidate</legend><div class="fields">
        ${labelInput('Candidate name','name',row.name)}
        ${labelInput('Evidence reference or test identifier','reference',row.reference)}
        ${labelInput('Objective value (lower is better)','objective',row.objective,'number')}
        ${labelInput('Sampled variable value for optimizer (optional)','coordinate',row.coordinate,'number')}
        ${criteria.map((label,i)=>labelInput(label,'margin'+i,row.margins[i],'number')).join('')}
        </div><button class="secondary" type="button">Remove candidate</button>`;
      fieldset.querySelector('button').onclick=()=>{fieldset.remove();save();};
      candidates.append(fieldset);
    }
    function read(){
      return [...candidates.querySelectorAll('fieldset')].map(row=>{
        const field=name=>row.querySelector(`[data-field="${name}"]`).value;
        return {name:field('name'),reference:field('reference'),coordinate:field('coordinate'),objective:field('objective'),
          margins:criteria.map((_,i)=>field('margin'+i))};
      });
    }
    function save(){
      const rows=read();
      const persisted=store(key()+'-'+item.id,rows);
      status.textContent=persisted?'Candidate comparison saved in this browser.':'Candidate comparison available for this session.';
      ranking.innerHTML=rows.length?table(['Candidate','Screening result','Objective','Evidence reference'],compareEvidence(rows,criteria.length).map(row=>[
        row.name,row.passes?'Meets entered gates':row.complete?'Gate shortfall':'Incomplete',row.objective,row.reference])):'';
    }
    function load(){
      candidates.replaceChildren();
      status.textContent='';
      ranking.replaceChildren();
      const rows=closureRows(item.id,key());
      (rows.length?rows:(candidateNames[item.id]??['','']).map(name=>newRow(criteria.length,name))).forEach(insert);
    }
    section.querySelector('[data-config]').value=workspaceConfiguration();
    section.querySelector('[data-config]').onchange=load;
    candidates.oninput=()=>{status.textContent='Unsaved candidate edits.';ranking.replaceChildren();};
    section.querySelector('[data-add]').onclick=()=>{insert(newRow(criteria.length));candidates.lastElementChild.querySelector('input').focus();};
    section.querySelector('[data-compare]').onclick=save;
    section.querySelector('[data-calculations]').onclick=()=>showCalculations(item.id);
    section.querySelector('[data-opt]').onclick=()=>{save();openOptimizer(item.id,key());};
    load();
    byId('closures').append(section);
  }
}

function renderRequirements() {
  const list=byId('tradeRequirements'),filter=byId('requirementsFilter');
  for (const requirement of specification.requirements){
    const detail=document.createElement('details');
    detail.id=requirement.id;
    const links=requirementStudies(requirement).map(id=>`<a href="#${models.has(id)?'study-':''}${id}">${esc(models.get(id)?.title??id+' · '+closures.get(id).title)}</a>`);
    detail.innerHTML=`<summary>${requirement.id} · ${esc(requirement.subsystem)}</summary>
      <p>${esc(requirement.text)}</p><p><strong>Acceptance criteria</strong> ${esc(requirement.acceptance)}</p>
      <p>${esc(requirement.verification)} · ${esc(requirement.applies)} · Verification open</p>
      <p>${links.join(' · ')}</p><p><a href="current-requirements.html#${requirement.id}">Specification and allocation</a>${requirement.architectureBlock?` · <a href="block-data.html#${esc(requirement.architectureBlock)}">Block calculations and interfaces</a>`:''}</p>
      <form><div class="fields"><label>Review outcome<select name="outcome"><option>Evidence pending</option><option>Ready for review</option><option>Shortfall identified</option></select></label>
        <label>Evidence reference<input name="reference" placeholder="Analysis, inspection or test reference"></label>
        <label>Observed result and remaining gap<textarea name="notes" rows="2"></textarea></label></div>
      <button>Save evidence record</button><p role="status"></p></form>`;
    const form=detail.querySelector('form');
    const key=()=>byId('requirementConfig').value+'-'+requirement.id;
    const load=()=>{
      const entry=records[key()]??{};
      form.elements.outcome.value=entry.outcome??'Evidence pending';
      form.elements.reference.value=entry.reference??'';
      form.elements.notes.value=entry.notes??'';
      form.querySelector('[role=status]').textContent='';
    };
    form.onsubmit=event=>{
      event.preventDefault();
      const persisted=store(key(),Object.fromEntries(new FormData(form)));
      form.querySelector('[role=status]').textContent=persisted?'Evidence record saved in this browser.':'Evidence record available for this session.';
    };
    byId('requirementConfig').addEventListener('change',load);
    load();
    list.append(detail);
  }
  function apply(){
    const query=filter.value.trim().toLowerCase();
    let count=0;
    specification.requirements.forEach(requirement=>{
      const detail=byId(requirement.id);
      detail.hidden=![requirement.id,requirement.group,requirement.subsystem,requirement.text].join(' ').toLowerCase().includes(query);
      if(!detail.hidden) count++;
    });
    byId('requirementCount').textContent=`${count} of ${specification.requirements.length} requirements`;
  }
  filter.oninput=apply;
  apply();
}

function renderOptimizer(values,linked) {
  const id=byId('optStudy').value, study=models.get(id);
  byId('optStatus').textContent='';
  byId('optResult').replaceChildren();
  optimizerInputs=study?(linked??loadLinkedInputs(study,byId('optConfig').value)):null;
  byId('optFields').innerHTML=study?
    `<label>Step multiplier<select id="optMultiplier">${[1,2,3,4,5].map(n=>`<option>${n}</option>`).join('')}</select></label>
     <details open><summary>Starting inputs and screening assumptions</summary><p>${esc(study.description)}</p>
     ${sourceContext(study,optimizerInputs)}<button class="secondary" type="button" id="reloadOptInputs">Reload linked inputs</button>
     <p>Step sizes per iteration · ${study.vary.map(key=>esc(study.inputs[key].label)+' '+number(study.inputs[key].step)).join(' · ')}</p>
     <div class="fields">${entries(study,optimizerInputs,values)}</div></details>`:
    `<p>Save sampled candidates with a common numeric design variable in <a href="#${id}">${esc(closures.get(id).title)}</a>. Use equivalent measurement conditions and the same objective and gates for each candidate.</p>
    <div class="fields">${numeric('Starting sampled value','id="sampleStart" step="any" required')}${numeric('Maximum variable change per iteration','id="sampleStep" step="any" required')}</div>`;
  if(study) byId('reloadOptInputs').onclick=()=>renderOptimizer();
}

function setRunning(running) {
  for(const element of byId('optForm').querySelectorAll('input,select,#optRun,#reloadOptInputs')) element.disabled=running;
  byId('optStop').hidden=!running;
}

function stopOptimization() {
  activeOptimizer?.terminate();
  activeOptimizer=null;
  setRunning(false);
  byId('optStatus').textContent='Search stopped.';
}

function runOptimization(event) {
  event.preventDefault();
  const id=byId('optStudy').value, study=models.get(id), key=byId('optConfig').value;
  const iterations=byId('optIterations').valueAsNumber, status=byId('optStatus'), output=byId('optResult');
  output.replaceChildren();
  if (!study) {
    try {
      const {baseline:initial,current,history}=searchEvidence(closureRows(id,key),CLOSURE_CRITERIA[id].length,
        byId('sampleStart').valueAsNumber,byId('sampleStep').valueAsNumber,iterations);
      status.textContent=history.length?`Found ${history.length} improving sampled step(s).`:'No improving nearby sampled candidate.';
      output.innerHTML=table(['Step','Candidate','Variable value','Objective','Evidence reference'],
        [initial,...history].map((row,index)=>[index,row.name,row.coordinate,row.objective,row.reference]));
      byId('sampleStart').value=current.coordinate;
    } catch (error) { status.textContent=error.message; }
    return;
  }
  const values=numericValues(byId('optFields'),study);
  const multiplier=Number(byId('optMultiplier').value);
  status.textContent='Evaluating bounded perturbations…';
  setRunning(true);
  activeOptimizer=workerRequest({id,context:optimizerInputs.context,values,iterations,multiplier},({result,error})=>{
    activeOptimizer=null;
    setRunning(false);
    if(error){status.textContent=error;return;}
    const {baseline:initial,best,history,attempts}=result;
    if(!best){status.textContent='No valid trajectory or model point was found. Review the starting inputs and bounds.';return;}
    status.textContent=`${attempts} evaluations · ${history.length} improving step(s) · ${best.feasible?'Screening gates met':'Shortfalls remain'}`;
    const fieldRows=study.vary.map(field=>[study.inputs[field].label,number(values[field]),number(result.values[field])]);
    output.innerHTML=table(['Design variable','Start','Best'],fieldRows)+
      table(['Accepted step','Score','Screening gates'],[...(initial?[[0,number(initial.score),initial.feasible?'Met':'Shortfall']]:[]),
        ...history.map(step=>[step.iteration,number(step.result.score),step.result.feasible?'Met':'Shortfall'])])+results(best);
    if(history.length){
      const apply=document.createElement('button');
      apply.type='button';
      apply.textContent='Use best inputs for next run';
      apply.onclick=()=>{
        for(const [field,value] of Object.entries(result.values)) byId('optFields').querySelector(`[name="${field}"]`).value=value;
        apply.disabled=true;
        status.textContent='Best inputs copied to the optimizer.';
      };
      output.append(apply);
    }
  });
}

function followHash() {
  const target=byId(location.hash.slice(1));
  if(!target?.closest('#screen-trades')) return;
  if(target.classList.contains('model')){
    target.querySelector('details').open=true;
    return;
  }
  if(target.tagName!=='DETAILS') return;
  if(target.hidden){
    byId('requirementsFilter').value='';
    byId('requirementsFilter').oninput();
  }
  target.open=true;
  if(!target.closest('#screen-trades').hidden) target.scrollIntoView({block:'start'});
}

async function loadJson(path) {
  const response=await fetch(path);
  if(!response.ok) throw Error('Could not load '+path);
  return response.json();
}

async function start() {
  [specification,baseline]=await Promise.all([
    loadJson('data/requirements/current-specification.json'),loadJson('data/requirements/default-baseline.json'),
  ]);
  closures=new Map(specification.closures.map(item=>[item.id,item]));
  byId('requirementConfig').value=workspaceConfiguration();
  byId('optConfig').value=workspaceConfiguration();
  renderModels();
  renderClosures();
  renderRequirements();
  byId('optStudy').innerHTML='<optgroup label="Modeled studies">'+STUDIES.map(s=>`<option value="${s.id}">${esc(s.title)}</option>`).join('')+'</optgroup>'+
    '<optgroup label="Evidence-backed closure studies">'+specification.closures.map(s=>`<option value="${s.id}">${s.id} · ${esc(s.title)}</option>`).join('')+'</optgroup>';
  byId('optStudy').onchange=()=>renderOptimizer();
  byId('optConfig').onchange=()=>renderOptimizer();
  byId('optForm').onsubmit=runOptimization;
  byId('optCalculations').onclick=()=>showCalculations(byId('optStudy').value,byId('optForm'));
  byId('optStop').onclick=stopOptimization;
  renderOptimizer();
  addEventListener('hashchange',followHash);
  followHash();
  window.dispatchEvent(new Event('freya:trade-studies-ready'));
}

function startOnTradeRoute() {
  if(screenForTarget(location.hash.slice(1))!=='screen-trades') return;
  window.removeEventListener('hashchange',startOnTradeRoute);
  byId('optRun').disabled=true;
  start().then(()=>{byId('optRun').disabled=false;}).catch(error=>{
    byId('loadStatus').textContent='The trade lab could not start. '+error.message;
  });
}

window.addEventListener('hashchange',startOnTradeRoute);
startOnTradeRoute();
