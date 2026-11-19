import {aeroshellHeight} from './aeroshell-geometry.mjs?v=45af70b8d000';
import {heatShieldInstrument,firingInstrument} from './thermal-propulsion-instruments.mjs?v=45af70b8d000';
import {presentationEvents} from './mission-review.mjs?v=45af70b8d000';
import {missionScene} from './presentation-scenes.mjs?v=45af70b8d000';
import {runFlight} from './flight-sampling.mjs?v=45af70b8d000';
import {timelineState,DEFAULTS,CONFIGS} from './revision51-model.mjs?v=45af70b8d000';
import {INITIAL_ORBIT_KM,INITIAL_FLIGHT_OPTIONS} from './mission-settings.mjs?v=45af70b8d000';
import {precursorMassPlan} from './precursor-mass.mjs?v=45af70b8d000';
import {missionTelemetry} from './mission-telemetry.mjs?v=45af70b8d000';
import {trajectoryConsole,gasInstrument} from './console-instruments.mjs?v=45af70b8d000';
// A complete first frame is built into the HTML; mobile users see the console before JS.
export function initialConsole(){
 const mass=precursorMassPlan(20,INITIAL_FLIGHT_OPTIONS);
 const inputs={...DEFAULTS,...CONFIGS.A,heightM:aeroshellHeight(CONFIGS.A.diameterM),orbitKm:INITIAL_ORBIT_KM,probeKg:mass.probeTotalKg/3};
 const f=runFlight('A',inputs,{...INITIAL_FLIGHT_OPTIONS,carrierDryA:mass.carrierDryKg});
 const r=missionTelemetry(f,0,inputs);
 const metrics=[['INITIAL ORBIT','400','km'],['ACTIVE ALTITUDE','400','km'],['ACTIVE VELOCITY',f.burn.initialV.toFixed(1),'m/s'],['PROPER ACCELERATION',r.capsule.loadG.toFixed(2),'g₀'],['DELIVERED Δv',f.burn.idealDv.toFixed(1),'m/s'],['WET MASS','20','kg'],['N₂ INITIAL',(f.gas.initialKg*1000).toFixed(0),'g'],['MOTOR IMPULSE',f.burn.impulse.toFixed(0),'N·s']];
 const events=presentationEvents(inputs.count,'gas-trap'),state=timelineState(events,0);
 return {mdAnimation:'<svg viewBox="0 0 900 600" role="img" aria-label="Initial mission phase preview">'+missionScene({state,c:inputs,events,flight:f})+'</svg>',mdTrajectory:trajectoryConsole(f,r,inputs),mdThermal:heatShieldInstrument(f,0),mdFiring:firingInstrument(f,0),mdGas:gasInstrument(f,0),mdReadouts:metrics.map(([label,v,unit])=>`<div class="md-metric"><span>${label}</span><b>${v} <small>${unit}</small></b></div>`).join('')};
}
