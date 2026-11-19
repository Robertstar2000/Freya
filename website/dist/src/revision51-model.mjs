export const CONFIGS={A:{name:'Late 2028 precursor',vehicles:1,count:3,wetKg:20,probeKg:2,diameterM:.8,heightM:.6,pcmChuteM:1.5,probeChuteM:.5,operationHours:24,bufferMB:64,targetRadiusKm:100},B:{name:'2031 science mission',vehicles:2,count:7,wetKg:50,probeKg:2,diameterM:.8,heightM:.6,pcmChuteM:2,probeChuteM:.5,operationHours:72,bufferMB:256,targetRadiusKm:50}};
export const ALLOCATIONS=[['Probes',6,14],['Aeroshell and cover',3,7],['TPS and insulation',2,5],['PCM and restraints',1.5,4],['Parachutes and deployment',1.2,3.5],['Deorbit propulsion',2.5,7],['GNC avionics and power',1.7,4],['Communications and harness',.7,1.5],['Integration and uncertainty reserve',1.4,4]];
export const DEFAULTS={orbitKm:300,periapsisKm:50,marginPct:25,rho:.015,cd:.75,frequencyMHz:400,rangeKm:400,rfW:10,txGain:0,rxGain:6,lossDb:6,receiverDbm:-120,dutySec:1,periodSec:60,paEfficiency:.4,inertia:1.5,jetN:.1,leverM:.25,ispSec:65,jetSeconds:60,averageW:.2,energyWh:20};
export function calculate(p){
 for(const [key,value] of Object.entries(p))if(typeof value==='number'&&!Number.isFinite(value))throw Error('Non-finite input: '+key);
 if(!(Number.isInteger(p.count)&&p.count<=7&&p.count*p.probeKg<p.wetKg&&p.frequencyMHz>0&&p.paEfficiency>0&&p.paEfficiency<=1&&p.dutySec>=0&&p.dutySec<=p.periodSec&&p.averageW>=0&&p.energyWh>=0&&p.operationHours>0&&p.marginPct>=0))throw Error('Check probe mass closure, count, RF duty cycle, efficiency and energy inputs');
 const mu=42828e9,R=3389.5e3,ra=R+p.orbitKm*1000,rp=R+p.periapsisKm*1000,a=(ra+rp)/2;
 if(!(ra>=rp&&rp>R&&p.wetKg>0&&p.probeKg>0&&p.count>=1&&p.rho>0&&p.cd>0&&p.probeChuteM>0&&p.pcmChuteM>0&&p.diameterM>0&&p.rangeKm>0&&p.rfW>0&&p.periodSec>0&&p.inertia>0&&p.jetN>0&&p.leverM>0&&p.ispSec>0))throw Error('Input outside supported screening domain');
 const circular=Math.sqrt(mu/ra),burn=Math.sqrt(mu*(2/ra-1/a)),dv=circular-burn,designDv=dv*(1+p.marginPct/100),area=Math.PI*p.diameterM**2/4;
 const terminal=(m,d)=>Math.sqrt(2*m*3.71/(p.rho*p.cd*Math.PI*d*d/4));
 const fspl=32.44+20*Math.log10(p.frequencyMHz)+20*Math.log10(p.rangeKm),rx=10*Math.log10(p.rfW*1000)+p.txGain+p.rxGain-fspl-p.lossDb;
 const torque=p.jetN*p.leverM,alpha=torque/p.inertia;
 return {circular,dv,designDv,impulseEquivalent:p.wetKg*designDv,probeTotal:p.count*p.probeKg,nonProbe:p.wetKg-p.count*p.probeKg,missionWet:p.vehicles*p.wetKg,area,beta:p.wetKg/(1.5*area),probeTerminal:terminal(p.probeKg,p.probeChuteM),pcmTerminal:terminal(p.suspendedKg??p.wetKg,p.pcmChuteM),fspl,rx,linkMargin:rx-p.receiverDbm,txDc:p.rfW/p.paEfficiency,txWhHour:(p.rfW/p.paEfficiency)*p.dutySec/p.periodSec,torque,alpha,slew90:2*Math.sqrt((Math.PI/2)/alpha),gasKg:p.jetN*p.jetSeconds/(p.ispSec*9.80665),scienceEnergy:p.averageW*p.operationHours,energyRemaining:p.energyWh-p.averageW*p.operationHours,exampleGuidanceWh:10+2+.8+.05+(25/3600)*120};
}
export function missionEvents(count){
 const out=[{label:'Health check',bit:0,phase:'Initialization'},{label:'Aeroshell detached',bit:1,phase:'Host separation'},{label:'Attitude established',bit:2,phase:'Attitude acquisition'},{label:'Reentry burn confirmed',bit:3,phase:'Deorbit'},{label:'Probe carrier ejected',bit:4,phase:'Entry and carrier extraction'}];
 for(let i=1;i<=count;i++)out.push({label:`Probe ${i} drop confirmed`,bit:i<=3?i+4:i+5,phase:'Probe release',probe:i});
 out.push({label:'Probe carrier on surface',bit:8,phase:'Surface operations'});return out;
}
export function statusBits(events,completed,count){const bits=Array(count>3?count+6:9).fill(0);for(const e of events.slice(0,completed))if(Number.isInteger(e.bit)&&e.bit>=0&&e.bit<bits.length)bits[e.bit]=1;return bits;}

export const PRESENTATION_PHASES=[
 {id:'rideshare',title:'01 Rideshare',source:'Presentation slide 7 · step 01',description:'Show FREYA carried by the host second stage, then capsule separation. Cold-gas hardware remains on the detachable reentry module.'},
 {id:'orient',title:'02 Orient',source:'Presentation slide 7 · step 02',description:'Acquire the burn attitude with optical/MEMS estimation and cold-gas control, then start vehicle telemetry.'},
 {id:'deorbit',title:'03 Deorbit',source:'Presentation slide 7 · step 03',description:'Perform the retrograde burn, confirm its completion and detach the expendable reentry module.'},
 {id:'entry',title:'04 Entry',source:'Presentation slide 7 · step 04',description:'The heat shield, aerodynamic shape and low center of gravity support passive entry and deceleration. Do not credit cold-gas control after module jettison.'},
 {id:'extraction',title:'05 Carrier extraction',source:'Presentation slide 7 · step 05',description:'Remove the cover, deploy the carrier parachute, extract the carrier and discard the aeroshell. Begin the independent carrier telemetry sequence.'},
 {id:'release',title:'06 Probe release',source:'Presentation slide 7 · step 06',description:'Descend to the release gate. Release every probe individually, deploying its own smaller parachute for descent and stabilization.'},
 {id:'delivery',title:'07 Probe delivery',source:'Presentation slide 7 · step 07',description:'Show nose-first impact and schematic emplacement for every probe. Activate instruments and telemetry using the antenna integrated with retained parachute shrouds.'},
 {id:'science',title:'08 Science operations',source:'Presentation slides 3–4 · proposed experiments',description:'Acquire soil, run blanks and controls, apply the selected proposed protocol, and inspect detector readout and interpretation. The two source protocols remain alternatives.'},
 {id:'return',title:'09 Data return',source:'Presentation slide 7 · probe telemetry; Rev09 SYS-001 and COM-01–05',description:'Buffer science and engineering records, repeat the carrier status word, and illustrate an assumed orbiter relay and onward return to Earth.'}
];
export const SCIENCE_PROTOCOLS={
 'gas-trap':{name:'Slide 4 · sealed gas and trap assay',source:'Presentation slide 4 embedded workflow',sample:'0.25 cm³ per vessel; proposed 2–5 cm source depth',conditions:'No water added; sealed and dark at −10 to 0 °C for 1–5 sols',steps:[
  ['sample','Soil into test and control vessels','Illustrate acquiring soil from the proposed 2–5 cm source zone and loading 0.25 cm³ into each vessel. This does not demonstrate sample acquisition.'],
  ['blank','Seal vessels and read blanks','Show no-soil controls and baseline counts, O₂ and pressure before dosing; keep controls distinct from the test vessel.'],
  ['dose','Add labeled gas','Illustrate separate ³H₂ and ¹⁴CO test channels and a defined time-zero count. No physical dosing or radioactive hardware is controlled.'],
  ['incubate','Incubation and continuous counts','Show a compressed incubation review segment: no water added, dark, −10 to 0 °C, 1–5 sols proposed. Playback seconds are not incubation time.'],
  ['trap','Gas and product trap readout','Show gas counting and transfer to cold-water/CO₂ trap detectors. Counts are detector responses; retained activity needs blank, efficiency and recovery calibration. Counts do not identify a molecule or prove biology.'],
  ['retained','Check retained-label balance','Illustrate the accounting question for label absent from gas and traps. Leaks and sorption remain alternative explanations; extraction would be needed to identify larger products.'],
  ['controls','Compare controls and qualify interpretation','Show test/control comparison and valid non-detection checks. A difference can motivate further investigation; it does not establish life.']
 ]},
 'extract':{name:'Slide 3 · incubation and extraction concept',source:'Presentation slide 3 proposed labeled-gas experiment',sample:'Approximately 1 g soil; sample provenance and controls required',conditions:'Near Mars ambient pressure; proposed 0–5 °C incubation',steps:[
  ['sample','Acquire soil and prepare controls','Illustrate approximately 1 g soil alongside heat-treated, no-soil and known-microbe control concepts. These are proposed validation steps.'],
  ['blank','Record blanks and baseline','Record baseline detector and environmental observations and keep controls separate from the unmodified test sample.'],
  ['dose','Introduce proposed labeled reactants','Illustrate candidate ¹⁴CO₂, ¹⁴CO, ³H₂ or ³H₂O channels. These are alternative experimental inputs, not a selected flight recipe.'],
  ['incubate','Incubate under proposed conditions','Illustrate near-ambient-pressure incubation at 0–5 °C. Do not merge this temperature or water assumption into the slide 4 gas/trap concept.'],
  ['extract','Flush gas and examine extracts','Illustrate excess-gas removal, carbonate-control acidification and water-soluble versus oil-soluble extraction concepts. Hardware and sample transfer remain unverified.'],
  ['detect','Scintillation and SiPM readout','Show detector acquisition for retained label in separate fractions, with sensitivity and interference still requiring laboratory validation.'],
  ['controls','Compare fractions and controls','Compare test/control and hydrophobic/hydrophilic behavior. Abiotic incorporation, chemical interference and contamination must be considered before any biological interpretation.']
 ]}
};
export function presentationEvents(count,protocol='gas-trap'){
 if(!Number.isInteger(count)||count<1||count>14)throw Error('Unsupported probe count');
 const science=SCIENCE_PROTOCOLS[protocol];if(!science)throw Error('Unknown science protocol');
 const events=[];let elapsed=0;
 const add=(id,group,label,duration,detail,extras={})=>{events.push({id,group,phase:PRESENTATION_PHASES.find(p=>p.id===group).title,label,duration,start:elapsed,end:elapsed+duration,detail,...extras});elapsed+=duration;};
 add('health','rideshare','Vehicle health check',3,'Review initialization and confirm the demonstrated avionics self-test.',{bit:0});
 add('host-carried','rideshare','Rideshare on host second stage',7,'The presentation names a Terran R rideshare; host and delivery agreement remain proposed.');
 add('host-separation','rideshare','Capsule separates from second stage',7,'Show physical separation while the expendable module remains attached.',{bit:1});
 add('cold-gas-slew','orient','Cold-gas burn-attitude acquisition',10,'Animate proposed cold-gas torque while the external module is attached.');
 add('attitude-confirmed','orient','Burn attitude confirmed',4,'Demonstration confidence gate for optical/MEMS attitude estimation.',{bit:2});
 add('vehicle-telemetry','orient','Vehicle telemetry begins',4,'Show a vehicle status transmission attempt; no receiver acknowledgement is modeled.');
 add('retro-burn','deorbit','Retrograde burn',10,'Animate the retrograde propulsion burn. Display timing is illustrative.');
 add('burn-confirmed','deorbit','Reentry burn confirmed',3,'Distinguish confirmed burn evidence from an ignition command.',{bit:3});
 add('module-jettison','deorbit','Expendable reentry module detaches',6,'Separate the external motor/control hardware before passive atmospheric entry.');
 add('entry-interface','entry','Atmospheric entry interface',7,'The capsule enters heat-shield forward; trajectory is schematic.');
 add('entry-heating','entry','Heat-shield heating',10,'Show thermal glow on the forebody; no heat-flux prediction is implied.');
 add('entry-deceleration','entry','Passive aerodynamic deceleration',8,'Aerodynamic shape and mass distribution support passive entry; no cold-gas jet credit.');
 add('cover-release','extraction','Top cover ejected',5,'Move the removable cover clear of the carrier extraction path.');
 add('carrier-chute','extraction','Carrier parachute deploys',7,'Open the larger carrier canopy; dimensions remain the Rev09 A/B assumptions.');
 add('carrier-extraction','extraction','Parachute extracts the carrier',7,'Separate the loaded probe carrier from the aeroshell.',{bit:4});
 add('aeroshell-discard','extraction','Aeroshell falls away',5,'Show the spent aeroshell on a separate path clear of carrier and probes.');
 add('carrier-telemetry','extraction','Carrier telemetry begins',4,'The detached carrier uses independent energy, antenna and transferred event history.');
 add('release-gate','release','Carrier reaches release gate',5,'An approved altitude/condition gate is required; playback does not compute that altitude.');
 for(let i=1;i<=count;i++){
  add(`probe-${i}-release`,'release',`Probe ${i} released`,4,'Release one probe independently, with positive carrier clearance.',{bit:i<=3?i+4:i+5,probe:i,kind:'release'});
  add(`probe-${i}-chute`,'release',`Probe ${i} parachute opens`,4,'Deploy the smaller individual canopy; it remains associated with its antenna/shrouds.',{probe:i,kind:'chute'});
 }
 for(let i=1;i<=count;i++){
  add(`probe-${i}-descent`,'delivery',`Probe ${i} stabilizes nose first`,4,'Illustrate descent and stabilization before impact; gyro/drogue effectiveness is not qualified.',{probe:i,kind:'descent'});
  add(`probe-${i}-impact`,'delivery',`Probe ${i} impacts and emplaces`,4,'Show schematic penetration, with no numerical depth or survival claim.',{probe:i,kind:'impact'});
  add(`probe-${i}-online`,'delivery',`Probe ${i} science and telemetry activate`,3,'Activate the science sequence and retained-shroud antenna link in this demonstration.',{probe:i,kind:'online'});
 }
 add('carrier-landing','delivery','Carrier reaches the surface',4,'Review carrier landing confirmation and latched history.',{bit:8});
 for(const [stage,label,detail] of science.steps)add('science-'+stage,'science',label,stage==='incubate'?12:6,detail,{scienceStage:stage,protocol});
 add('data-buffer','return','Buffer science and engineering data',5,'Store per-probe identifiers, measurement records and confirmation history.');
 add('carrier-repeat','return','Repeat carrier status telemetry',4,'Repeat the cumulative carrier word when power and geometry permit; packet overhead is additional.');
 add('orbiter-relay','return','UHF relay to an assumed Mars orbiter',7,'Show a conceptual orbiter link; access, compatibility and actual reception remain unverified.');
 add('earth-return','return','Relay records onward to Earth',7,'Illustrate onward data return without claiming a demonstrated Earth link or latency.');
 add('mission-complete','return','Mission walkthrough complete',3,'All presentation delivery phases and the selected science workflow have been reviewed.');
 return events;
}
export function timelineState(events,time){
 const total=events.at(-1)?.end??0,t=Math.max(0,Math.min(total,Number.isFinite(time)?time:0));
 const completed=events.filter(e=>e.end<=t).length,index=Math.min(completed,events.length-1),event=events[index];
 return {time:t,total,completed,index,event,fraction:event?Math.max(0,Math.min(1,(t-event.start)/event.duration)):0,done:t>=total};
}
