import fs from 'node:fs';
import {SIDEBAR_SECTIONS} from '../src/sidebar-data.mjs';
import {REQUIREMENT_NAVIGATION} from '../src/requirement-navigation.mjs';
const requirements=JSON.parse(fs.readFileSync('data/revision51/requirements.json'));
const review=JSON.parse(fs.readFileSync('data/revision51/requirement_evidence.json'));
const count=r=>r.family?requirements.filter(x=>x.id.startsWith(r.family+'-')).length:r.evidence==='shortfall'?review.counts.simulationShortfall:r.evidence==='simulation'?review.counts.simulationSupport:r.evidence==='flight'?review.counts.flightHeritage:requirements.length;
const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const requirementNav=`<div class="sidebar-group requirements-nav" id="requirementsNav"><a data-requirements-link href="#requirements"><span class="sidebar-number">RQ</span><span><b>Requirements</b><small>Current spec + ${requirements.length} archived</small></span><span class="sidebar-chevron">↗</span></a><div class="sidebar-subsections requirements-subsections" aria-label="Requirement families and evidence"><a href="current-requirements.html"><span>Current specification · Rev 10</span></a><a href="#trace"><span>Rev 10 trade traceability</span></a><a href="current-requirements.html#spec-mission"><span>Mission requirements</span></a><a href="current-requirements.html#spec-capsule"><span>Capsule · hardware & software</span></a><a href="current-requirements.html#spec-probe"><span>Probe · hardware & software</span></a><a href="current-requirements.html#spec-carrier"><span>Carrier · hardware & software</span></a><a href="current-requirements.html#spec-reentry-module"><span>Reentry module · hardware & software</span></a>${REQUIREMENT_NAVIGATION.map(r=>`<a data-requirement-nav href="#${r.id}"><span>${esc(r.label)}</span><small>${count(r)}</small></a>`).join('')}</div></div>`;
const nav='<nav id="workspaceContents" aria-labelledby="workspaceContentsTitle"><h2 id="workspaceContentsTitle" class="sidebar-contents-title">Table of contents</h2>'+SIDEBAR_SECTIONS.map((s,i)=>(s.id==='screen-evidence'?requirementNav:'')+`<div class="sidebar-group" data-sidebar-group="${s.id}"><a data-screen-link href="#${s.id}"><span class="sidebar-number">0${i+1}</span><span><b>${s.title}</b><small>${s.description}</small></span><span class="sidebar-chevron">↗</span></a><div class="sidebar-subsections" aria-label="${s.title} subsections">${s.subsections.map(([label,id])=>`<a data-subsection-link data-parent-screen="${s.id}" href="#${id}">${esc(label)}</a>`).join('')}</div></div>`).join('')+'</nav>';
let h=fs.readFileSync('index.html','utf8');
h=h.replace(/(<aside id="workspaceSidebar"[\s\S]*?)<nav (?:aria-label="Main sections"|id="workspaceContents")[^>]*>[\s\S]*?<\/nav>/,(_,prefix)=>prefix+nav);
const markers=REQUIREMENT_NAVIGATION.filter(r=>r.id!=='requirements').map(r=>`<span class="subsection-anchor" id="${r.id}" aria-hidden="true"></span>`).join('');
if(h.includes('<!-- REQUIREMENT-NAV:START -->'))h=h.replace(/<!-- REQUIREMENT-NAV:START -->[\s\S]*?<!-- REQUIREMENT-NAV:END -->/,'<!-- REQUIREMENT-NAV:START -->'+markers+'<!-- REQUIREMENT-NAV:END -->');
else h=h.replace(/(<section id="requirements"[^>]*>)/,'$1<!-- REQUIREMENT-NAV:START -->'+markers+'<!-- REQUIREMENT-NAV:END -->');
const tradeSection=fs.readFileSync('src/trade-studies-section.html','utf8').trim();
h=h.replace(/<!-- TRADE-STUDIES:START -->[\s\S]*?<!-- TRADE-STUDIES:END -->/,
  ()=>'<!-- TRADE-STUDIES:START -->'+tradeSection+'<!-- TRADE-STUDIES:END -->');
fs.writeFileSync('index.html',h);
console.log('Built workspace sections plus dedicated Requirements navigation with 13 filters');
