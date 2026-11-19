const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// One continuous, schematic space-to-Mars curve; its derivative sets the shield normal.
export const ENTRY_DISPLAY_PATH='M150 95 Q600 105 625 420';
export function entryDisplayPose(u){u=Math.max(0,Math.min(1,u));const a=1-u;
 const x=a*a*150+2*a*u*600+u*u*625,y=a*a*95+2*a*u*105+u*u*420;
 const dx=2*a*450+2*u*25,dy=2*a*10+2*u*315;
 return {x,y,dx,dy,angle:Math.atan2(dy,dx)*180/Math.PI-90};
}
export function missionScene({state,c,events,flight}){
 const e=state.event,group=e.group,t=state.time,f=state.fraction;
 const flipCapsule=['module-jettison','cover-release','carrier-chute','carrier-extraction','aeroshell-discard','carrier-telemetry'].includes(e.id),flipPath=e.id==='module-jettison';
 const flipAround=(x,y,shape)=>`<g data-flip-axis="up-down" transform="translate(0 ${2*y}) scale(1 -1)">${shape}</g>`;
 const progress=id=>{const a=events.find(x=>x.id===id);return a?Math.max(0,Math.min(1,(t-a.start)/a.duration)):0;};
 const done=id=>progress(id)>=1;
 // Apply the requested display rotation only to capsule hardware in delivery steps 2–7.
 const capsuleRotation=(['orient','deorbit','entry','extraction','release','delivery'].includes(group)?180:0);
 const defs=`<defs><linearGradient id="metal"><stop stop-color="#637b93"/><stop offset=".45" stop-color="#f0f5fc"/><stop offset="1" stop-color="#728ba8"/></linearGradient><radialGradient id="mars"><stop stop-color="#d08754"/><stop offset="1" stop-color="#68392e"/></radialGradient><radialGradient id="heat"><stop stop-color="#fff1a0"/><stop offset=".45" stop-color="#ff6b36"/><stop offset="1" stop-color="#ff5426" stop-opacity="0"/></radialGradient><linearGradient id="ground" x2="0" y2="1"><stop stop-color="#a26b4b"/><stop offset="1" stop-color="#432e2c"/></linearGradient></defs>`;
 const stars=Array.from({length:34},(_,i)=>`<circle cx="${(i*163+29)%900}" cy="${(i*71+19)%390}" r="${i%3===0?1.6:.8}" fill="#c4d9ef" opacity=".55"/>`).join('');
 const ground=`<path d="M0 470 Q120 448 280 470 T600 465 T900 470 V600 H0Z" fill="url(#ground)"/><path d="M0 471 Q200 460 400 474 T900 470" fill="none" stroke="#c59062" stroke-width="3"/>`;
 const canopy=(x,y,scale,open=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><path d="M${-65*open} 0 Q0 ${-65*open} ${65*open} 0 Q0 22 ${-65*open} 0" fill="#e3e6d2" stroke="#8ba89e" stroke-width="2"/><path d="M${-65*open} 0 L0 90 L${65*open} 0 M0 ${-32*open} V90" fill="none" stroke="#b9d8ce" stroke-width="1.8"/></g>`;
 const module=(x,y,rot=0,flame=false)=>`<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-22" y="-8" width="44" height="60" rx="8" fill="url(#metal)"/><circle cx="-13" cy="12" r="7" fill="#d6bd77"/><circle cx="13" cy="12" r="7" fill="#d6bd77"/><path d="M-10 50 L-15 68 H15 L10 50Z" fill="#6a6a78"/>${flame?'<path d="M-12 68 Q0 155 12 68" fill="#ffb456"/><path d="M-6 68 Q0 126 6 68" fill="#fff3b6"/>':''}</g>`;
 const capsule=(x,y,scale=1,rot=0,withModule=true,heat=false,coverPresent=true,entryAngle=null)=>`<g ${entryAngle!==null?`data-entry-capsule="true" data-altitude-m="${state.telemetry?.capsule.alt??''}"`:''} transform="translate(${x} ${y}) scale(1 ${entryAngle===null&&flipCapsule?-1:1}) rotate(${entryAngle??(rot+capsuleRotation)}) scale(${scale})">${heat?'<ellipse cy="64" rx="160" ry="74" fill="url(#heat)"/>':''}<path d="M-110 45 L-72 -48 Q0 -80 72 -48 L110 45Z" fill="url(#metal)" stroke="#b7cce0" stroke-width="2"/><ellipse cy="-48" rx="72" ry="12" fill="${coverPresent?'#d4c5ad':'#152a3b'}"/><ellipse cy="45" rx="110" ry="24" fill="${heat?'#ff9c5d':'#c39a73'}"/><path d="M-110 45 L0 85.036726 L110 45" fill="#714936"/>${withModule?module(0,90,0,e.id==='retro-burn'):''}${withModule&&['cold-gas-slew','heat-shield-slew'].includes(e.id)?'<path data-cold-jets="paired" d="M-30 100 L-75 115 L-30 110 M30 100 L75 85 L30 90" fill="#72dfca"/>':''}<path d="M-57 -30 V30 M57 -30 V30" stroke="#7790a9" stroke-width="2"/></g>`;
 const carrier=(x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cy="45" rx="78" ry="16" fill="#52657a"/><path d="M-75 -30 H75 V40 H-75Z" fill="#202f43" stroke="#9cb6ca" stroke-width="3"/>${Array.from({length:c.count},(_,i)=>`<rect x="${-60+i*120/Math.max(1,c.count-1)-5}" y="-22" width="10" height="55" rx="4" fill="url(#metal)"/>`).join('')}<rect x="-20" y="-58" width="40" height="24" rx="4" fill="#82c2aa"/></g>`;
 const probe=(x,y,i,chute=true,impact=false,online=false)=>`<g transform="translate(${x} ${y})">${chute?canopy(0,-90,.44):''}<rect x="-8" y="-10" width="16" height="40" rx="3" fill="url(#metal)"/><path d="M-8 30 L0 48 L8 30Z" fill="#d4dfe9"/>${impact?'<path d="M-28 0 Q0 -35 28 0" fill="none" stroke="#d9a67a" stroke-width="3" stroke-dasharray="4 5"/>':''}${online?'<path d="M0 -10 V-40 M-17 -42 Q0 -60 17 -42 M-25 -49 Q0 -77 25 -49" fill="none" stroke="#72dfca" stroke-width="2"/>':''}<text y="66" text-anchor="middle" fill="#daebfc" font-size="13">P${i}</text></g>`;
 let scene='';
 if(e.id==='coast-to-entry'){
  const alt=state.telemetry?.capsule.alt,top=c.orbitKm*1000,q=Number.isFinite(alt)?Math.max(0,Math.min(1,(top-alt)/Math.max(1,top-125000))):f;
  scene+=`<circle cx="680" cy="720" r="340" fill="url(#mars)"/><path d="M140 140 Q480 145 660 380" stroke="#85b7d7" stroke-width="3" stroke-dasharray="8 8" fill="none"/>`;
  scene+=capsule(180+420*q,150+180*q*q,.65,90,false);
  scene+=`<text x="35" y="50" fill="#cce2f1" font-size="22">Passive coast to atmospheric entry</text><text x="35" y="95" fill="#72dfca" font-size="20">Altitude ${Number.isFinite(alt)?(alt/1000).toFixed(1):'—'} km · time compressed</text><text x="35" y="520" fill="#b5cadb" font-size="16">Engine off · expendable module detached · calculated trajectory</text>`;
 }else if(['rideshare','orient','deorbit'].includes(group)){
  scene+=`<circle cx="760" cy="205" r="125" fill="url(#mars)"/><ellipse cx="760" cy="205" rx="185" ry="65" fill="none" stroke="#567b8c" stroke-dasharray="6 8"/>`;
  if(group==='rideshare'){
   const sep=progress('host-separation');scene+=`<g transform="translate(200 225) rotate(-15)"><rect x="-80" y="-55" width="160" height="150" rx="25" fill="url(#metal)"/><path d="M-60 95 L-75 130 H75 L60 95Z" fill="#4a5267"/><text x="0" y="165" text-anchor="middle" fill="#bed3e8" font-size="18">Host second stage</text></g>`;
   scene+=capsule(220+sep*260,145-sep*25,.60,0,true);if(e.id==='host-separation'&&sep<1)scene+=`<path d="M${230+sep*260} ${215-sep*25} l-15 45 l25 -38 M${210+sep*260} ${215-sep*25} l-15 45 l25 -38" fill="#72dfca"/><text x="45" y="390" fill="#72dfca">Paired attitude jets provide separation translation</text>`;scene+=`<text x="${230+sep*245}" y="${62-sep*4}" fill="#72dfca" font-size="17">FREYA capsule ${sep?'separating':'stowed'}</text>`;
  }else{
   const slew=progress('cold-gas-slew'),j=progress('module-jettison'),rotation=slew*90+progress('heat-shield-slew')*(flight?.options?.heatSlewDeg??180);scene+=capsule(410,210,.95,rotation,j<=0);
   if(group==='orient'&&e.id==='cold-gas-slew')scene+=`<text x="300" y="400" fill="#96e9d5" font-size="18">Cold-gas attitude acquisition</text>`;
   if(j>0){const discardedModule=module(410+j*180,295+j*110,j*70+capsuleRotation);scene+=flipPath?flipAround(410,210,discardedModule):discardedModule;scene+=`<text x="510" y="470" fill="#ffcd82" font-size="17">External module discarded</text>`;}
   scene+=`<path transform="${flipPath?'translate(0 420) scale(1 -1)':''}" d="M100 110 H300" stroke="#85b7d7" stroke-width="3" marker-end="url(#arrow)"/><text x="100" y="90" fill="#bed3e8" font-size="17">${group==='deorbit'?'Velocity → · shield forward · ← retro thrust':'Camera / MEMS attitude gate'}</text>`;
  }
 }else if(group==='entry'){
  const entryEvents=events.filter(a=>a.group==='entry'),start=entryEvents[0].start,end=entryEvents.at(-1).end;
  const cap=state.telemetry?.capsule,top=flight?.entry?.rows[0]?.alt??125000,bottom=flight?.options?.extractionAltM??10000;
  const u=Number.isFinite(cap?.alt)?(top-cap.alt)/Math.max(1,top-bottom):(t-start)/(end-start);
  const pose=entryDisplayPose(.08+.78*Math.max(0,Math.min(1,u)));
  scene+=`<defs><marker id="entryDirection" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9Z" fill="#ffbc79"/></marker></defs><circle cx="550" cy="1060" r="620" fill="url(#mars)"/><circle cx="550" cy="1060" r="650" fill="none" stroke="#8ab2c8" stroke-width="22" opacity=".25"/><path data-entry-path="space-to-mars" d="${ENTRY_DISPLAY_PATH}" fill="none" stroke="#ffbc79" stroke-width="4" stroke-dasharray="9 7" marker-end="url(#entryDirection)"/><text x="45" y="55" fill="#c3d9eb" font-size="18">Space · incoming trajectory</text><text x="705" y="525" fill="#ffcd82" font-size="25">Mars</text>`;
  const heat=e.id==='entry-heating'||e.id==='entry-deceleration';scene+=capsule(pose.x,pose.y,.65,0,false,heat,true,pose.angle);
  scene+=`<rect x="20" y="390" width="410" height="148" rx="12" fill="#081522" opacity=".9"/><text x="35" y="419" fill="#ffcd82" font-size="20">${e.id==='entry-interface'?'Atmospheric interface':e.id==='entry-heating'?'Forebody heating':'Passive aerodynamic deceleration'}</text><text x="35" y="450" fill="#c3d9eb" font-size="16">Shield faces along descent toward Mars</text><text x="35" y="477" fill="#c3d9eb" font-size="16">Shield plane perpendicular to local flight path</text><text x="35" y="509" fill="#c3d9eb" font-size="15">External control module absent</text>`;
 }else if(group==='extraction'){
  const cover=progress('cover-release'),ch=progress('carrier-chute'),ex=progress('carrier-extraction'),discard=progress('aeroshell-discard');
  scene+=ground;scene+=capsule(450+discard*190,320+discard*160,.85,discard*45,false,false,cover<=0);
  if(cover>0)scene+=`<ellipse cx="${450-cover*180}" cy="${265-cover*140}" rx="62" ry="10" fill="#d9d2bf" transform="rotate(${-cover*28} ${450-cover*180} ${265-cover*140})"/>`;
  if(ch>0)scene+=canopy(450,80,.95,ch);if(ex>0)scene+=carrier(450,260-ex*90,.75);
  scene+=`<text x="35" y="54" fill="#72dfca" font-size="20">${e.id==='cover-release'?'Cover clears the extraction path':e.id==='carrier-chute'?'Carrier canopy inflates':e.id==='carrier-extraction'?'Parachute extracts loaded carrier':e.id==='aeroshell-discard'?'Aeroshell separates and falls away':'Independent carrier telemetry'}</text>`;
 }else if(['release','delivery'].includes(group)){
  const live=state.telemetry,carrierY=live?.carrier.alt!=null?170+Math.max(0,Math.min(1,1-live.carrier.alt/(flight?.options?.extractionAltM??10000)))*263:170;scene+=ground;if(live?.carrier.status!=='landed')scene+=canopy(455,carrierY-100,.75);scene+=carrier(455,carrierY,.6);
  for(let i=1;i<=c.count;i++){
   const released=progress(`probe-${i}-release`),ch=progress(`probe-${i}-chute`),imp=progress(`probe-${i}-impact`),desc=progress(`probe-${i}-descent`),on=done(`probe-${i}-online`);
   const pr=live?.probes.find(p=>p.id===i);if(pr?pr.status==='stowed':released<=0)continue;const x=70+(i-1)*740/Math.max(1,c.count-1),y=pr?422-Math.min(1,pr.alt/(flight?.options?.releaseAltM??5000))*232:190+released*120+desc*100+imp*67;
   scene+=probe(x,y,i,pr?pr.status==='descending'&&pr.chute>.05:ch>0,pr?pr.status==='landed':imp>0,on);
  }
  scene+=`<text x="30" y="34" fill="#cce2f1" font-size="18">${group==='release'?'Individual release and smaller canopy deployment':'Stabilization → impact → instrument activation'}</text><text x="30" y="555" fill="#ffcd82" font-size="15">Penetration shown schematically; no measured depth or survival probability</text>`;
 }else if(group==='science'){
  scene+=ground;const stage=e.scienceStage;scene+=`<rect x="80" y="100" width="740" height="330" rx="20" fill="#11263b" stroke="#3a5e74"/><text x="110" y="137" fill="#c9e8e0" font-size="19">${e.protocol==='extract'?'Incubation / extraction concept':'Sealed gas / trap assay concept'}</text>`;
  const labels=e.protocol==='extract'?['Soil + controls','Labeled reactant','Extract fractions','Scintillator / SiPM']:['Soil + controls','Separate gas channels','Water / CO₂ traps','Detector balance'];
  for(let i=0;i<4;i++){const x=120+i*185;scene+=`<rect x="${x}" y="195" width="125" height="130" rx="15" fill="${i===[ 'sample','dose','trap','detect'].indexOf(stage)?'#216151':'#294059'}" stroke="#8db5c2"/><ellipse cx="${x+62}" cy="198" rx="52" ry="14" fill="#7d98ad"/><text x="${x+62}" y="357" text-anchor="middle" fill="#d1e3ef" font-size="14">${labels[i]}</text>${i<3?`<path d="M${x+132} 260 H${x+174}" stroke="#72dfca" stroke-width="3"/>`:''}`;}
  scene+=`<text x="110" y="392" fill="#ffcd82" font-size="16">Proposed protocol; readout is illustrative, no experimental counts generated</text><text x="110" y="455" fill="#cae0ee" font-size="17">${stage==='controls'?'Controls and abiotic alternatives determine interpretation':stage==='incubate'?'Incubation is compressed for this review playback':'Test and control channels remain separate'}</text>`;
 }else{
  scene+=`<circle cx="170" cy="390" r="130" fill="url(#mars)"/><circle cx="760" cy="170" r="65" fill="#4276a2"/><path d="M720 150 Q760 95 795 155 L780 178 L755 160 L737 185Z" fill="#73a98c"/>`;
  scene+=`<g transform="translate(385 195)"><rect x="-22" y="-20" width="44" height="40" fill="url(#metal)"/><path d="M-24 -15 H-85 V15 H-24 M24 -15 H85 V15 H24" fill="#294c7e" stroke="#89a9cf"/><path d="M0 20 L20 55 L-20 55Z" fill="#b8cfda"/></g><path d="M215 325 Q280 240 360 210 M410 190 Q560 100 695 150" fill="none" stroke="#72dfca" stroke-width="3" stroke-dasharray="${10+Math.floor(t*3)%10} 12"/><rect x="75" y="345" width="34" height="38" fill="#b3d0dc"/><path d="M92 345 V300" stroke="#b3d0dc" stroke-width="3"/><text x="50" y="560" fill="#c1d9ee" font-size="19">Probe / carrier buffer → assumed Mars relay → Earth</text><text x="620" y="275" fill="#c1d9ee" font-size="18">Earth</text><text x="310" y="115" fill="#c1d9ee" font-size="18">Assumed relay orbiter</text>`;
 }
 return `${defs}<rect width="900" height="600" rx="14" fill="#081522"/>${stars}${scene}<text x="25" y="585" fill="#8aa9c0" font-size="12">Presentation walkthrough · not a flight trajectory or laboratory experiment</text>`;
}
