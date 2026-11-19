import {runFlight as propagate,MARS} from './flight-model.mjs?v=256072640f6f';
// Preserve the propagator's exact coast endpoint in the displayed sample table.
// The archived propagator stores intermediate coast rows every ten seconds.
export function runFlight(...args){
 const f=propagate(...args),coast=f.coast;
 if(!coast?.reached||!coast.state)return f;
 const [x,y,vx,vy]=coast.state;
 const endpoint={t:coast.duration,alt:f.entry?.rows[0]?.alt??Math.hypot(x,y)-MARS.radius,v:Math.hypot(vx,vy)};
 const rows=coast.rows.filter(row=>row.t<endpoint.t);
 return {...f,coast:{...coast,rows:[...rows,endpoint]}};
}
