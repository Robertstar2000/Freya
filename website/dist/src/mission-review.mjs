import {presentationEvents as sourceEvents} from './revision51-model.mjs?v=45af70b8d000';
import {reviewMissionTime as sourceMissionTime} from './mission-telemetry.mjs?v=45af70b8d000';
// Current review includes the physical coast omitted by the archived presentation timing.
export function presentationEvents(count,protocol='gas-trap'){
 const events=sourceEvents(count,protocol);
 events.splice(events.findIndex(e=>e.id==='module-jettison'),0,{id:'heat-shield-slew',group:'deorbit',label:'Cold-gas heat-shield entry alignment',duration:10,detail:'After main-engine cutoff, use a separate paired-jet rest-to-rest slew to align the heat shield for entry. Keep the cold-gas module attached until alignment is complete; then jettison it.'});
 const index=events.findIndex(e=>e.id==='module-jettison')+1;
 events.splice(index,0,{id:'coast-to-entry',group:'deorbit',label:'Coast to atmospheric entry',duration:60,detail:'Follow the calculated passive coast from motor-module separation to the 125 km atmospheric interface. Physical flight time is compressed for review; intermediate altitudes are computed.'});
 let time=0;return events.map(e=>{const event={...e,start:time,end:time+e.duration};time=event.end;return event;});
}
export function reviewMissionTime(f,events,state){
 if(!f?.times)return null;
 if(state.event.id==='heat-shield-slew')return f.times.heatAlignStart+state.fraction*f.gas.heatSlewSec;
 if(state.event.id==='burn-confirmed')return f.times.burnEnd;
 if(state.event.id==='module-jettison')return f.times.heatAlignEnd+state.fraction*(f.times.moduleDetached-f.times.heatAlignEnd);
 if(state.event.id==='coast-to-entry')return f.times.moduleDetached+state.fraction*(f.times.entryStart-f.times.moduleDetached);
 return sourceMissionTime(f,events,state);
}
