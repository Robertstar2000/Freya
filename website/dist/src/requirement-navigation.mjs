export const REQUIREMENT_NAVIGATION=[
 {id:'requirements',label:'All source requirements',family:'',evidence:''},
 {id:'requirements-MIS',label:'Mission · MIS',family:'MIS',evidence:''},
 {id:'requirements-STR',label:'Structure · STR',family:'STR',evidence:''},
 {id:'requirements-GNC',label:'Guidance & control · GNC',family:'GNC',evidence:''},
 {id:'requirements-EDL',label:'Entry & descent · EDL',family:'EDL',evidence:''},
 {id:'requirements-PCM',label:'Carrier & deployment · PCM',family:'PCM',evidence:''},
 {id:'requirements-PRB',label:'Probe · PRB',family:'PRB',evidence:''},
 {id:'requirements-SYS',label:'Systems · SYS',family:'SYS',evidence:''},
 {id:'requirements-COM',label:'Communications · COM',family:'COM',evidence:''},
 {id:'requirements-DER',label:'Derived · DER',family:'DER',evidence:''},
 {id:'requirements-shortfalls',label:'Baseline shortfalls',family:'',evidence:'shortfall'},
 {id:'requirements-simulation',label:'Simulation support',family:'',evidence:'simulation'},
 {id:'requirements-flight',label:'Flight heritage references',family:'',evidence:'flight'}
];
export function requirementRoute(id){return REQUIREMENT_NAVIGATION.find(x=>x.id===id)??null;}
export function applyRequirementRoute(route,ownerDocument=document){
 if(!route)return false;
 const family=ownerDocument.getElementById('reqFamily'),evidence=ownerDocument.getElementById('reqEvidence'),search=ownerDocument.getElementById('reqSearch');
 if(!family||!evidence||!search)return false;
 family.value=route.family;evidence.value=route.evidence;search.value='';
 family.dispatchEvent(new Event('change',{bubbles:true}));return true;
}
