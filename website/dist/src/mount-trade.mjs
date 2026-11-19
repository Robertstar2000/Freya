// Preference scores are explicit engineering judgments, not measured probabilities.
export const MOUNT_CRITERIA=[
 {id:'tps',name:'Continuous entry heat shield',weight:30,bottom:1,top:5,why:'Bottom attachment must avoid TPS penetrations or restore a flush, qualified hot face after release. A top mount keeps the forebody hot face clear; backshell heating still requires analysis.'},
 {id:'structure',name:'Direct thrust load path',weight:20,bottom:3,top:2,why:'Both need a structural ring tied to the primary frame. A removable top cover is not assumed to be load bearing; a bridge around the cover adds mass. A bottom interface still cannot transfer thrust through ablator alone.'},
 {id:'clearance',name:'Pre-entry separation clearance',weight:20,bottom:2,top:3,why:'Bottom hardware departs toward the future windward side and must clear before entry. A top mount can depart aft of the shield, but attitude changes and residual thrust can cause recontact in either option. Scores assume pre-entry jettison.'},
 {id:'deployment',name:'Cover / parachute extraction access',weight:15,bottom:5,top:2,why:'Bottom mounting leaves the top extraction path open. Top hardware, wiring and released fragments must clear the cover and parachute corridor before deployment.'},
 {id:'plume',name:'Plume and thermal isolation',weight:10,bottom:3,top:3,why:'Equal pending nozzle design. Either location needs an outward nozzle, verified plume clearance, motor heat soak isolation and science contamination control.'},
 {id:'integration',name:'Continuity with current FREYA concept',weight:5,bottom:5,top:2,why:'Current animation and three-maneuver gas budget place the module below the shield. A top mount needs revised retroburn and entry attitudes, software sequencing and integration tests.'}
];
export function mountScores(weights=MOUNT_CRITERIA.map(x=>x.weight)){
 if(weights.length!==MOUNT_CRITERIA.length||weights.some(w=>!Number.isFinite(w)||w<0))throw new RangeError('Weights must be nonnegative finite values');
 const total=weights.reduce((a,b)=>a+b,0);if(!total)return null;
 return {bottom:MOUNT_CRITERIA.reduce((s,c,i)=>s+weights[i]*c.bottom,0)/total,top:MOUNT_CRITERIA.reduce((s,c,i)=>s+weights[i]*c.top,0)/total,total};
}
export function mountAlignment(thrustN,offsetM,inertia,responseSec){
 if(![thrustN,offsetM,inertia,responseSec].every(Number.isFinite)||thrustN<0||offsetM<0||inertia<=0||responseSec<0)throw new RangeError('Invalid alignment assumptions');
 const torqueNm=thrustN*offsetM;
 return {torqueNm,angleDeg:.5*torqueNm/inertia*responseSec**2*180/Math.PI};
}
export function initMountTrade(){
 const root=document.getElementById('mount-trade');if(!root)return;
 root.querySelector('#mountCriteria').innerHTML=MOUNT_CRITERIA.map(c=>`<tr><th scope="row">${c.name}<p>${c.why}</p></th><td><input aria-label="${c.name} priority weight" type="number" min="0" max="100" step="1" value="${c.weight}" data-mount-weight></td><td>${c.bottom}</td><td>${c.top}</td></tr>`).join('');
 function update(){const weights=[...root.querySelectorAll('[data-mount-weight]')],values=weights.map(x=>Number(x.value));const target=root.querySelector('#mountResult');if(weights.some(x=>x.value===''||!x.checkValidity())){target.textContent='Enter weights from 0 to 100.';return;}const scores=mountScores(values);if(!scores){target.textContent='Set at least one priority above zero.';return;}const difference=scores.top-scores.bottom;target.textContent=`Bottom ${scores.bottom.toFixed(2)} / 5 · Top ${scores.top.toFixed(2)} / 5. ${Math.abs(difference)<1e-10?'Tie':difference>0?'Top ranks higher':'Bottom ranks higher'} under these judgment scores and priorities. This is a preference ranking, not flight qualification.`;
 const controls=['mountThrust','mountOffset','mountInertia','mountResponse'].map(id=>root.querySelector('#'+id));const output=root.querySelector('#mountAlignment');if(controls.some(x=>x.value===''||!x.checkValidity())){output.textContent='Enter valid alignment inputs.';return;}const [f,e,i,t]=controls.map(x=>Number(x.value)),a=mountAlignment(f,e/1000,i,t);output.textContent=`τ = F e = ${a.torqueNm.toFixed(3)} N·m; uncontrolled angular departure over ${t.toFixed(2)} s = ${a.angleDeg.toFixed(3)}°. The result applies equally to either mount for the same perpendicular thrust-line offset and inertia.`;
 }
 root.addEventListener('input',update);root.querySelector('#mountReset').onclick=()=>{root.querySelectorAll('[data-mount-weight]').forEach((x,i)=>x.value=MOUNT_CRITERIA[i].weight);update();};update();
}
