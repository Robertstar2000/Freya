import {ALLOCATIONS} from './revision51-model.mjs?v=373144b22b36';
import {FLIGHT_DEFAULTS,MARS} from './flight-model.mjs?v=373144b22b36';
// Retain 20 kg (or the chosen wet mass), replace propulsion, scale all other allocations.
export function precursorMassPlan(wetKg=20,options={}){
 const o={...FLIGHT_DEFAULTS,...options};
 const propellantKg=o.AimpulseNs/(o.Aisp*MARS.g0);
 const nitrogenKg=o.tankBar*1e5*(o.tankLitres/1000)/(296.8*o.tankKelvin);
 const dryKg=o.moduleDryA,propulsionKg=dryKg+propellantKg+nitrogenKg;
 const scale=(wetKg-propulsionKg)/17.5;
 if(!(Number.isFinite(scale)&&scale>0))throw Error('Propulsion exceeds the available precursor wet mass. Increase wet mass or reduce motor / tank mass.');
 const allocations=ALLOCATIONS.map(([name,a])=>({name,sourceKg:a,kg:name==='Deorbit propulsion'?propulsionKg:a*scale}));
 return {wetKg,propellantKg,nitrogenKg,dryKg,propulsionKg,scale,allocations,probeTotalKg:6*scale,carrierDryKg:3*scale};
}
