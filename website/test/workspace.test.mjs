import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {ARCHITECTURE_DIAGRAMS} from '../src/architecture-data.mjs';
import {ARCHITECTURE_BLOCKS,blockById,lensForBlock,blockRequirements} from '../src/architecture-links.mjs';
import {blockDetailMarkup,screenForTarget} from '../src/workspace-ui.mjs';
import {DEFAULTS,CONFIGS} from '../src/revision51-model.mjs';import {FLIGHT_DEFAULTS} from '../src/flight-model.mjs';import {SOIL_DEFAULTS} from '../src/mission-telemetry.mjs';
const reqs=JSON.parse(fs.readFileSync('data/revision51/requirements.json'));
test('eight integrated infographics have 72 unique clickable blocks and complete source data pages',()=>{
 assert.equal(ARCHITECTURE_DIAGRAMS.length,8);assert.equal(ARCHITECTURE_BLOCKS.length,72);assert.equal(new Set(ARCHITECTURE_BLOCKS.map(b=>b.id)).size,72);
 const index=fs.readFileSync('index.html','utf8'),details=fs.readFileSync('block-data.html','utf8');
 for(const d of ARCHITECTURE_DIAGRAMS){assert.equal(d.nodes.length,9);assert.ok(index.includes('id="'+d.id+'"'));const svg=fs.readFileSync('assets/architecture/'+d.id+'.svg','utf8');assert.equal((svg.match(/data-block=/g)||[]).length,9);assert.ok(fs.statSync('assets/architecture/'+d.id+'.pdf').size>10000);}
 for(const b of ARCHITECTURE_BLOCKS){assert.equal(blockById(b.id),b);assert.ok(index.includes('data-block="'+b.id+'"'));assert.ok(details.includes('id="'+b.id+'"'));assert.ok(lensForBlock(b));for(const r of blockRequirements(b,reqs))assert.ok(details.includes('requirement-evidence.html#'+r.id));}
 assert.equal(blockById('missing'),undefined);
});
test('block inspector uses current snapshot and does not substitute probe energy for other vehicle batteries',()=>{
 const snapshot={configuration:'B',inputs:{...DEFAULTS,...CONFIGS.B,energyWh:87},soil:SOIL_DEFAULTS,flight:{options:FLIGHT_DEFAULTS}};
 for(const b of ARCHITECTURE_BLOCKS){const markup=blockDetailMarkup(b,snapshot,reqs);assert.ok(markup.includes('Current configuration B'));assert.ok(markup.includes('block-data.html#'+b.id));assert.ok(!markup.includes('<td>undefined</td>'));}
 const probe=blockDetailMarkup(blockById('probe-hardware-03'),snapshot,reqs);assert.match(probe,/<td>87<\/td>/);
 const retro=blockDetailMarkup(blockById('retro-hardware-07'),snapshot,reqs);assert.ok(!retro.includes('<td>87</td>'));assert.match(retro,/Probe energy defaults are not/);
 const localThermal=lensForBlock(blockById('probe-hardware-08'));assert.equal(localThermal.groups.length,0);assert.match(localThermal.note,/No specimen or detector thermal solver/);
});
test('workspace screens and legacy / block deep links resolve to the correct screen',()=>{
 const roots={missionDashboard:'screen-mission',operations:'screen-mission',engineering:'screen-engineering','flight-analysis':'screen-engineering',systems:'screen-systems','science-review':'screen-science',requirements:'screen-evidence'};
 const mock={getElementById:id=>roots[id]?{closest:()=>({id:roots[id]})}:null};
 for(const [id,screen]of Object.entries(roots))assert.equal(screenForTarget(id,mock),screen);
 assert.equal(screenForTarget('block-probe-hardware-01',mock),'screen-systems');assert.equal(screenForTarget('missing',mock),'screen-mission');
 const h=fs.readFileSync('index.html','utf8');assert.equal((h.match(/class="workspace-screen(?: |")/g)||[]).length,SIDEBAR_SECTIONS.length);assert.equal((h.match(/data-screen-link(?: |>)/g)||[]).length,SIDEBAR_SECTIONS.length);
});

import {SIDEBAR_SECTIONS} from '../src/sidebar-data.mjs';
import {initialWorkspaceHash} from '../src/workspace-ui.mjs';
test('Mission is the default, while direct diagram and subsection links remain usable',()=>{
 assert.equal(initialWorkspaceHash(''),'#screen-mission');assert.equal(initialWorkspaceHash('#'),'#screen-mission');
 assert.equal(initialWorkspaceHash('#block-probe-hardware-07'),'#block-probe-hardware-07');
 assert.equal(initialWorkspaceHash('#systems-software'),'#systems-software');
 const h=fs.readFileSync('index.html','utf8');
 assert.match(h,/<div id="screen-mission"[^>]*class="workspace-screen"[^>]*>/);
 assert.ok(!h.match(/<div id="screen-mission"[^>]*hidden/));
});
test('probe hardware includes an independent drogue and antenna structure, with no connecting tether',()=>{
 const d=ARCHITECTURE_DIAGRAMS.find(x=>x.id==='probe-hardware');
 assert.ok(!/tether/i.test(JSON.stringify(d)));
 assert.ok(d.nodes.some(x=>/drogue chute/i.test(x.title)));assert.ok(d.nodes.some(x=>/antenna structure/i.test(x.title)));
 const lens=lensForBlock(blockById('probe-hardware-07'));assert.ok(lens.m.includes('probeChuteM'));
 const svg=fs.readFileSync('assets/architecture/probe-hardware.svg','utf8');assert.ok(!/tether/i.test(svg));assert.match(svg,/Drogue chute/);assert.match(svg,/Antenna structure/);
});
test('sidebar sections expose all declared subsection anchors',()=>{

 const h=fs.readFileSync('index.html','utf8');
 assert.equal((h.match(/data-subsection-link(?: |>)/g)||[]).length,SIDEBAR_SECTIONS.flatMap(section=>section.subsections).length);
 for(const section of SIDEBAR_SECTIONS){assert.ok(section.subsections.length);for(const [label,id]of section.subsections){assert.ok(label);assert.ok(h.includes('id="'+id+'"'),id);assert.ok(h.includes('href="#'+id+'"'),id);}}
});

import {REQUIREMENT_NAVIGATION,requirementRoute,applyRequirementRoute} from '../src/requirement-navigation.mjs';
test('dedicated Requirements links resolve to Evidence and apply the exact family / evidence filter',()=>{
 const nodes={reqFamily:{value:'PRB',dispatchEvent(e){this.event=e.type;}},reqEvidence:{value:'flight'},reqSearch:{value:'old search'}};
 const doc={getElementById:id=>nodes[id]??null};
 assert.equal(REQUIREMENT_NAVIGATION.length,13);
 for(const route of REQUIREMENT_NAVIGATION){assert.equal(screenForTarget(route.id,doc),'screen-evidence');assert.equal(requirementRoute(route.id),route);assert.equal(applyRequirementRoute(route,doc),true);assert.equal(nodes.reqFamily.value,route.family);assert.equal(nodes.reqEvidence.value,route.evidence);assert.equal(nodes.reqSearch.value,'');assert.equal(nodes.reqFamily.event,'change');}
 assert.equal(requirementRoute('requirements-unknown'),null);assert.equal(applyRequirementRoute(null,doc),false);
 const h=fs.readFileSync('index.html','utf8');assert.ok(h.includes('data-requirements-link'));
 for(const route of REQUIREMENT_NAVIGATION){assert.ok(h.includes('href="#'+route.id+'"'));assert.ok(h.includes('id="'+route.id+'"'));}
 const families=REQUIREMENT_NAVIGATION.filter(x=>x.family).map(x=>x.family);assert.deepEqual(families,['MIS','STR','GNC','EDL','PCM','PRB','SYS','COM','DER']);
 for(const r of reqs)assert.ok(families.includes(r.id.split('-')[0]));
});

test('the trade lab, science package and final optimizer live in the main workspace',()=>{
 const h=fs.readFileSync('index.html','utf8');
 const panel=h.match(/<!-- TRADE-STUDIES:START -->([\s\S]*?)<!-- TRADE-STUDIES:END --><\/main>/)?.[1];
 assert.ok(panel);
 assert.match(panel,/id="screen-trades"/);
 assert.match(panel,/id="science-package"/);
 for(const [,id] of panel.matchAll(/\sid="([^"]+)"/g)){
  assert.equal([...h.matchAll(/\sid="([^"]+)"/g)].filter(([,actual])=>actual===id).length,1,id);
 }
 assert.match(panel,/<section id="optimizer"[\s\S]*?<\/section>\s*<\/div>$/);
 assert.match(h,/href="#screen-trades"/);
 const doc={getElementById:()=>null};
 for(const id of ['study-clock','study-mission','FR-BIO-010','FR-PRB-HW-001','TBD-18'])
  assert.equal(screenForTarget(id,doc),'screen-trades',id);
 const old=fs.readFileSync('trade-studies.html','utf8');
 assert.match(old,/href="\.\/#screen-trades"/);
 const spec=fs.readFileSync('current-requirements.html','utf8');
 assert.match(spec,/href="\.\/#FR-BIO-010"/);
 assert.match(spec,/href="\.\/#TBD-18"/);
});
