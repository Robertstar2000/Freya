import {requirementRoute,applyRequirementRoute} from './requirement-navigation.mjs?v=45af70b8d000';
import {blockById,blockRequirements,lensForBlock} from './architecture-links.mjs?v=45af70b8d000';
import {CALCULATIONS} from './calculation-catalog.mjs?v=45af70b8d000';
const esc=x=>String(x??'Not specified').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const initialWorkspaceHash=hash=>hash&&hash!=='#'?hash:'#screen-mission';
export function screenForTarget(id,ownerDocument=document){
 if(requirementRoute(id))return 'screen-evidence';
 if(id.startsWith('block-'))return 'screen-systems';
 if(/^(study-[a-z]+|TBD-\d{2}|FR-[A-Z]{3}(?:-[A-Z]{2})?-\d{3})$/.test(id))return 'screen-trades';
 const element=ownerDocument.getElementById(id);
 return element?.closest('.workspace-screen')?.id??'screen-mission';
}
export function blockDetailMarkup(block,snapshot,requirements=[]){
 const lens=lensForBlock(block),spaces={m:snapshot.inputs??{},f:snapshot.flight?.options??{},s:snapshot.soil??{}},rows=[];
 for(const ns of ['m','f','s'])for(const key of lens[ns]??[])rows.push(`<tr><th><code>${ns}.${esc(key)}</code></th><td>${esc(spaces[ns][key])}</td></tr>`);
 const related=blockRequirements(block,requirements);
 return `<p class="block-context">${esc(block.vehicle)} / ${esc(block.kind)} · Block ${block.index} · Current configuration ${esc(snapshot.configuration)} · snapshot at opening</p><ul>${block.lines.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><p class="notice">${esc(lens.note)}</p>${rows.length?`<h3>Related current inputs</h3><div class="table-scroll"><table><thead><tr><th>Variable (units in symbol)</th><th>Current value</th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`:'<p>No dedicated numerical component model or measured component dataset has been supplied for this block.</p>'}${lens.groups.map(g=>{const c=CALCULATIONS[g];return `<details open><summary>${esc(c.title)}</summary><pre class="calc-formula">${esc(c.formula)}</pre><p>${esc(c.constants)}</p><p>${esc(c.notes)}</p><a href="src/${c.source}" target="_blank" rel="noopener">Calculation implementation ↗</a></details>`;}).join('')}<h3>Current allocated requirement</h3><p><a href="current-requirements.html#FR-${({probe:'PRB',retro:'REM',capsule:'CAP',carrier:'CAR'})[block.id.split('-')[0]]}-${block.kind==='Hardware'?'HW':'SW'}-${String(block.index).padStart(3,'0')}" target="_blank" rel="noopener">Current specification · allocated function and acceptance criteria ↗</a></p><h3>Archived source requirements and supporting data</h3>${related.map(r=>`<p><a href="requirement-evidence.html#${r.id}" target="_blank" rel="noopener">${esc(r.id)} · source and evidence ↗</a><br>${esc(r.text)}</p>`).join('')||'<p>No matching source requirement identified by the provisional functional cross-reference.</p>'}<p>${lens.bio.map(id=>`<a href="science-review.html#${id}" target="_blank" rel="noopener">${id} ↗</a>`).join(' · ')}</p><p><a href="block-data.html#${block.id}" target="_blank" rel="noopener">Permanent block data page ↗</a> · <a href="assets/architecture/architecture-data.json" download>Architecture block / interface data ↓</a></p><p class="muted">Requirement links are provisional functional cross-references, not approved requirement allocations. Missing measurements and component specifications remain unverified.</p>`;
}
export function initWorkspace(getSnapshot,pause){
 const root=document.getElementById('workspaceSidebar');if(!root)return;
 const screens=[...document.querySelectorAll('.workspace-screen')];
 const dialog=document.createElement('dialog');dialog.id='blockDialog';dialog.setAttribute('aria-labelledby','blockTitle');dialog.innerHTML='<div class="calc-header"><div><p class="eyebrow">Architecture / linked data</p><h2 id="blockTitle"></h2></div><button type="button" id="blockClose">Close ×</button></div><div id="blockBody"></div>';document.body.append(dialog);
 let requirements=[],returnFocus=null;
 fetch('data/revision51/requirements.json').then(r=>{if(!r.ok)throw Error('Source requirements unavailable');return r.json();}).then(r=>{requirements=r;if(dialog.open)openBlock(location.hash.slice(7));}).catch(()=>{});
 function openBlock(id){const b=blockById(id);if(!b)return;pause?.();if(!dialog.open)returnFocus=document.activeElement;document.getElementById('blockTitle').textContent=b.title;document.getElementById('blockBody').innerHTML=blockDetailMarkup(b,getSnapshot(),requirements);if(!dialog.open)dialog.showModal();dialog.scrollTop=0;document.getElementById('blockClose').focus();}
 function chooseDiagram(id){for(const card of document.querySelectorAll('.architecture-card'))card.hidden=card.id!==id;for(const button of document.querySelectorAll('[data-diagram-select]')){const active=button.dataset.diagramSelect===id;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}}
 function highlightSubsection(id){for(const link of root.querySelectorAll('[data-subsection-link]')){const active=link.hash==='#'+id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
 function route(scroll=true){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{id='screen-mission';}const selected=screenForTarget(id),reqRoute=requirementRoute(id);if(reqRoute)applyRequirementRoute(reqRoute);for(const s of screens)s.hidden=s.id!==selected;
 for(const a of root.querySelectorAll('[data-screen-link]')){const active=a.hash==='#'+selected&&!reqRoute;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');}
 for(const group of root.querySelectorAll('[data-sidebar-group]'))group.classList.toggle('section-active',group.dataset.sidebarGroup===selected&&!reqRoute);highlightSubsection(id);
 const reqNav=document.getElementById('requirementsNav');reqNav.classList.toggle('section-active',Boolean(reqRoute));for(const link of reqNav.querySelectorAll('[data-requirement-nav],[data-requirements-link]')){const active=link.hasAttribute('data-requirements-link')?Boolean(reqRoute):link.hash==='#'+id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current',link.hasAttribute('data-requirements-link')?'page':'location');else link.removeAttribute('aria-current');}
 document.getElementById('workspaceTitle').textContent=reqRoute?'Requirements':document.getElementById(selected).dataset.title;
 root.classList.remove('mobile-open');document.getElementById('sidebarToggle').setAttribute('aria-expanded','false');
 if(id.startsWith('block-')){const block=blockById(id.slice(6));if(block){chooseDiagram(block.diagram);highlightSubsection('systems-'+block.kind.toLowerCase());}openBlock(id.slice(6));}else{if(dialog.open)dialog.close();const target=document.getElementById(id);if(target?.classList.contains('architecture-card'))chooseDiagram(id);if(id==='systems-hardware'||id==='systems-software'){const current=document.querySelector('.architecture-card:not([hidden])');chooseDiagram((current?.id??'probe-hardware').replace(/-(hardware|software)$/,'-'+id.slice(8)));}const details=target?.closest('details');if(details)details.open=true;if(scroll)(target??document.getElementById(selected)).scrollIntoView({block:'start'});}
 document.title='FREYA · '+(reqRoute?'Requirements':document.getElementById(selected).dataset.title);
 }
 document.getElementById('sidebarToggle').onclick=()=>{const expanded=root.classList.toggle('mobile-open');document.getElementById('sidebarToggle').setAttribute('aria-expanded',String(expanded));};
 document.addEventListener('click',e=>{const select=e.target.closest?.('[data-diagram-select]');if(select){chooseDiagram(select.dataset.diagramSelect);highlightSubsection('systems-'+(select.dataset.diagramSelect.endsWith('-software')?'software':'hardware'));return;}const sectionLink=e.target.closest?.('[data-screen-link],[data-subsection-link],[data-requirement-nav],[data-requirements-link]');if(sectionLink&&sectionLink.hash===location.hash){e.preventDefault();route();return;}const link=e.target.closest?.('a[data-block]');if(link){e.preventDefault();const hash='#block-'+link.dataset.block;if(location.hash===hash)route(false);else location.hash=hash;}});
 document.getElementById('blockClose').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus();});
 const requestedHash=location.hash;if(initialWorkspaceHash(requestedHash)!==requestedHash)history.replaceState(null,'',initialWorkspaceHash(requestedHash));
 window.addEventListener('hashchange',()=>route());
 window.addEventListener('freya:trade-studies-ready',()=>{
  const target=document.getElementById(location.hash.slice(1));
  if(target?.closest('#screen-trades')&&target.matches('.model, details'))route();
 });
 route(Boolean(requestedHash));
}
