// FREYA Revision 4 | Engineering extensions, preliminary analytic screening only.
// Geometry in mean Mars radius; atmosphere uses local AGL. This distinction is intentional.
import {DEFAULTS,G_E,R_MARS,simulateEntry} from './physics.js';
export const MU_MARS=4.282837e13;
export const ORBIT_DEFAULTS={orbitAltKm:250,periapsisKm:0,thrustN:100,ispS:225,burnMassKg:450,entryInterfaceKm:125};
export function deorbit(input={}){
 const p={...ORBIT_DEFAULTS,...input},ra=R_MARS+1000*p.orbitAltKm,rp=R_MARS+1000*p.periapsisKm,ri=R_MARS+1000*p.entryInterfaceKm;
 if(!(ra>ri&&ri>rp&&rp>0&&p.thrustN>0&&p.ispS>0&&p.burnMassKg>0))throw Error('Require orbit > entry interface > target periapsis; positive mass, thrust, Isp.');
 const a=(ra+rp)/2,e=(ra-rp)/(ra+rp),vc=Math.sqrt(MU_MARS/ra),vb=Math.sqrt(MU_MARS*(2/ra-1/a)),dv=vc-vb;
 const ve=Math.sqrt(MU_MARS*(2/ri-1/a)),angMom=ra*vb,cosg=Math.max(-1,Math.min(1,angMom/(ri*ve))),angleDeg=-Math.acos(cosg)*180/Math.PI;
 const c=(1-ri/a)/e,E=2*Math.PI-Math.acos(Math.max(-1,Math.min(1,c))),meanMotion=Math.sqrt(MU_MARS/a**3),coastSeconds=(E-e*Math.sin(E)-Math.PI)/meanMotion;
 const propellantKg=p.burnMassKg*(-Math.expm1(-dv/(G_E*p.ispS))),mdot=p.thrustN/(G_E*p.ispS),durationS=propellantKg/mdot;
 const periodS=2*Math.PI*Math.sqrt(ra**3/MU_MARS),accelStart=p.thrustN/p.burnMassKg,accelEnd=p.thrustN/(p.burnMassKg-propellantKg);
 const warning=durationS/periodS>0.05?'Finite burn exceeds 5% of orbit period; impulsive orbital state is not valid for targeting.':'Idealized impulsive-transfer orbit; finite-burn steering and Mars J2 not modeled.';
 return {...p,deltaV:dv,circularSpeed:vc,burnSpeed:vb,entrySpeed:ve,entryAngleDeg:angleDeg,coastSeconds,propellantKg,durationS,mdot,periodS,accelStart,accelEnd,burnFraction:durationS/periodS,warning};
}
export function burnHistory(o,points=80){return Array.from({length:points+1},(_,i)=>{const t=o.durationS*i/points,m=o.burnMassKg-o.mdot*t;return {t,thrust:o.thrustN,accel:o.thrustN/m,dv:G_E*o.ispS*Math.log(o.burnMassKg/m),remaining:m};});}
export function orbitTrade(p=ORBIT_DEFAULTS){return [-50,-25,0,25,50,75,100].filter(h=>h<p.entryInterfaceKm&&h<p.orbitAltKm).map(periapsisKm=>deorbit({...p,periapsisKm}));}
export const TPS={picaDensity:240,tpsThicknessMm:15, backingMassKg:3.5, referenceAreaFactor:1.09};
// User-directed fixed 4 kg penetrator budget. The 2 kg structural allowance includes all potting.
// Irradiation is a required verification process, NOT a massless qualification claim.
export const PENETRATOR_ALLOCATION=Object.freeze([
 {element:'Scientific payload',massKg:1.0,basis:'Complete science instruments, sensors, and internal instrument support'},
 {element:'Retained parachute + integrated antenna',massKg:.5,basis:'Canopy, risers, RF antenna and impact-compatible tether / feed'},
 {element:'Batteries, heaters + microcontroller',massKg:.5,basis:'Battery cells, battery protection, heaters, controller, memory, power/thermal interfaces'},
 {element:'Penetrating structure + protective potting',massKg:2.0,basis:'Nose, shell, shock cage, seal and protective potting/encapsulation'}
]);
export const PLANETARY_PROTECTION_GATES=Object.freeze([
 {id:'PP-1',name:'Mission classification',criterion:'Agency/authority concurrence: IVa or IVb/IVc depending life investigation and Special Region access',state:'OPEN'},
 {id:'PP-2',name:'Validated full-assembly irradiation',criterion:'Bioburden-reduction qualification based on target organisms and approved endpoint, not assumed 100% kill',state:'OPEN'},
 {id:'PP-3',name:'Worst-case internal dose mapping',criterion:'Minimum biological dose and maximum component dose measured throughout structural nose, potting and battery pack',state:'OPEN'},
 {id:'PP-4',name:'Post-irradiation acceptance',criterion:'Science calibration, memory, controller, cells, heater, canopy and potting survive irradiation + Mars cold + impact',state:'OPEN'},
 {id:'PP-5',name:'Cleanliness and contamination barriers',criterion:'Bioburden assays, barrier integrity, storage/transport and integration recontamination prevention',state:'OPEN'}
]);
export function thermalAssessment(entry,p=DEFAULTS,options=TPS){
 const shieldArea=Math.PI*(p.shieldD/2)**2 /Math.sin(70*Math.PI/180)*options.referenceAreaFactor;
 const ablatorMass=shieldArea*(options.tpsThicknessMm/1000)*options.picaDensity;
 return {fluxWcm2:entry.peakHeat.v,heatLoadMJm2:entry.heatLoad/100, // W/cm2 s *1e4/1e6 = /100
   timePeakS:entry.peakHeat.t,altPeakKm:entry.peakHeat.h/1000,ablatorMassKg:ablatorMass,shieldAreaM2:shieldArea,
   structuralMassKg:options.backingMassKg,shieldSystemMassKg:ablatorMass+options.backingMassKg,
   compatibleHeritage:entry.peakHeat.v<100, // 100 is NOT material qual; merely context vs NASA PICA ~100..2000
   caveat:'Peak-only heritage comparison. PICA depth, recession, heat soak, bondline temperature, char, transition, backshell and uncertainty need full transient sizing.'};
}
export function payloadShock(mission,electronicsMassKg=.15){const r={};for(const [key,m] of Object.entries(mission.all)){
 const x=m.probes[0];r[key]={impactSpeed:x?.v||NaN,peakG:x?.peakImpactG||NaN,forceN:x?.peakImpactG*G_E*electronicsMassKg||NaN,impactDurationMs:(2*mission.p.depth/(x?.v||1))*1000,energyJ:.5*mission.p.probeMass*(x?.v||0)**2};}
 return r;
}
export const RISK_REGISTER=[
 {id:'R01',name:'Penetration-model validation',category:'Subsurface',likelihood:5,impact:5,blocker:true,mitigation:'Instrumented cold ice/rock impact trials spanning geometry, obliquity and fracture; fit dynamic force law.'},
 {id:'R02',name:'Sandstone depth without breakup',category:'Subsurface',likelihood:4,impact:5,blocker:true,mitigation:'Demonstrate >=1.5 m in representative competent sandstone; consider drilling or lower burial depth.'},
 {id:'R03',name:'Probe attitude at impact',category:'EDL',likelihood:4,impact:5,blocker:true,mitigation:'6-DOF aero/spin testing, spin stabilization or fins; validate angle and tumble envelope.'},
 {id:'R04',name:'Drogue deployment envelope',category:'EDL',likelihood:4,impact:5,blocker:true,mitigation:'Mach-q deployment map, inflation loads, subscale low-density testing and opening shock.'},
 {id:'R05',name:'Deorbit targeting & guidance',category:'Orbit',likelihood:4,impact:5,blocker:true,mitigation:'Propagate finite burn + J2 + atmospheric dispersions; tie orbit and entry states with navigation covariance.'},
 {id:'R06',name:'Thermal-protection sizing',category:'TPS',likelihood:3,impact:5,blocker:true,mitigation:'CFD and radiative aeroheating, FIAT/PATO thermal response, bondline/temp/soak margin and arcjet tests.'},
 {id:'R07',name:'Penetrator instrument survival',category:'Avionics',likelihood:4,impact:5,blocker:true,mitigation:'Qualification shock spectra and pulse width; potting, staking, encapsulated die, strain relief and functional re-test.'},
 {id:'R08',name:'Battery impact and cold operation',category:'Power',likelihood:4,impact:5,blocker:true,mitigation:'Custom-cased primary cells, current-limited harness, shock+thermal testing and isolation after impact.'},
 {id:'R09',name:'45 kg mass closure',category:'System',likelihood:4,impact:5,blocker:true,mitigation:'Detailed TPS/structure/dispenser/chutes/power budgets with growth margin; charge propulsion to proper stage.'},
 {id:'R10',name:'Buried communications link',category:'Comms',likelihood:4,impact:4,blocker:true,mitigation:'Test UHF attenuation through wet/dry/ice strata; use surface antenna/aftbody linked by impact-rated tether.'},
 {id:'R11',name:'Release separation collisions',category:'EDL',likelihood:4,impact:4,blocker:false,mitigation:'Coupled six-body dispersions and actuator energy/timing with 6-DOF wake interaction.'},
 {id:'R12',name:'Site surface heterogeneity',category:'Geology',likelihood:5,impact:4,blocker:false,mitigation:'High-resolution terrain maps and prior orbital spectroscopy; model rocks, layers, regolith and ice.'},
 {id:'R13',name:'Dynamic stability after releases',category:'EDL',likelihood:4,impact:4,blocker:false,mitigation:'Time-varying mass/CG/inertia and aerodynamic stability through all six separations.'},
 {id:'R14',name:'Planetary protection classification',category:'Mission',likelihood:4,impact:5,blocker:true,mitigation:'Obtain formal Mars category and special-region/site concurrence before design freeze; define biological/organic contamination limits, assays and documentation.'},
 {id:'R15',name:'Power after cold cruise',category:'Power',likelihood:3,impact:4,blocker:false,mitigation:'Storage, battery activation and heater budgeting over 5–7 month cruise and descent.'},
 {id:'R16',name:'Thermal structural interface',category:'TPS',likelihood:3,impact:4,blocker:false,mitigation:'Thermomechanical bondline stress, ply/tile joints and heat-shield release qualification.'},
 {id:'R17',name:'Attached canopy on surface impact',category:'EDL',likelihood:5,impact:5,blocker:true,mitigation:'Impact with flight-representative attached inflated chute: quantify riser torque, canopy collapse, line snagging, line severance, impact attitude, and burial obstruction.'},
 {id:'R18',name:'Higher velocity at 4 kg',category:'Subsurface',likelihood:4,impact:5,blocker:true,mitigation:'Retest 4 kg flight-like shape at target speeds in cryogenic ice and competent sandstone; verify structural margins.'},
 {id:'R19',name:'Aeroshell mass transfer allocation',category:'System',likelihood:3,impact:5,blocker:true,mitigation:'Allocate all freed 6 kg to named carrier/TPS hardware; verify attached drogue/retention hardware inside each 4 kg probe mass and close growth allowance.'},
 {id:'R20',name:'Irradiation versus batteries and electronics',category:'Power',likelihood:4,impact:5,blocker:true,mitigation:'Qualify full-assembly processing dose tolerance for battery chemistry, controller TID, memory, sensor calibration, seals, adhesives and potting; functional cold/shock tests after exposure.'},
 {id:'R21',name:'Shielded embedded bioburden',category:'Planetary protection',likelihood:4,impact:5,blocker:true,mitigation:'Map minimum and maximum absorbed dose across dense tip, sealed cavities and potted PCB; assay encapsulated bioburden with representative witness/test articles.'},
 {id:'R22',name:'Recontamination after irradiation',category:'Planetary protection',likelihood:4,impact:5,blocker:true,mitigation:'Validate clean process handling, sterile barrier, storage, late-test controls, transport and deployment interface integration; document microbiological acceptance.'}
].map(r=>({...r,score:r.likelihood*r.impact,priority:r.likelihood*r.impact>=20?'CRITICAL':r.likelihood*r.impact>=15?'HIGH':'MEDIUM'}));
