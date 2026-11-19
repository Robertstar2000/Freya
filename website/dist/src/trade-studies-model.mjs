import {FLIGHT_DEFAULTS, interpolateRows, gasBudget} from './flight-model.mjs?v=373144b22b36';
import {runFlight} from './flight-sampling.mjs?v=373144b22b36';
import {precursorMassPlan} from './precursor-mass.mjs?v=373144b22b36';
import {cgScreen, thermalReplay} from './entry-design-model.mjs?v=373144b22b36';
import {impactEstimate} from './mission-telemetry.mjs?v=373144b22b36';
import {INITIAL_FLIGHT_OPTIONS} from './mission-settings.mjs?v=373144b22b36';

const input = (label, value, min, max, step) => ({label, value, min, max, step});
const extraction = input('Extraction altitude (m)', 10000, 6000, 20000, 100);
const release = input('First release altitude (m)', 5000, 500, 9000, 100);
const cadence = input('Release cadence (s)', 2, .5, 20, .25);
const diameter = input('Probe chute diameter (m)', .5, .1, 2, .01);
const delay = input('Probe chute opening delay (s)', 1.5, 0, 10, .25);
const extractionQ = input('Extraction dynamic pressure ceiling (Pa)', 600, 1, 5000, 10);
const coast = input('Minimum jettison-to-entry time (s)', 30, 0, 600, 5);
const targetSpeed = input('Target vertical impact speed (m/s)', 75, 10, 200, 1);
const shock = input('Illustrative peak shock ceiling (g₀)', 1500, 10, 30000, 10);
const nose = input('Nose radius (m)', .2, .05, .5, .005);
const shoulder = input('Shoulder radius (m)', .07, .025, .2, .005);
const thickness = input('TPS thickness (mm)', 15, 5, 85, 1);
const cg = input('CG from nose (x/D)', .15, 0, 2, .005);
const timeWeight = input('Time penalty per hour (km equivalent)', 2, 0, 100, 1);
const objective = (score, metrics, checks = [], phases = []) => ({
  score, metrics, checks, phases,
  feasible: checks.every(([, margin]) => Number.isFinite(margin) && margin >= 0),
});

function flight(ctx, x) {
  const {key, configuration} = ctx;
  const options = {...FLIGHT_DEFAULTS,...INITIAL_FLIGHT_OPTIONS,
    targetToleranceKm:configuration.targetRadiusKm, carrierDryA:ctx.carrierDryA, ...ctx.flightOptions};
  const overrides={
    extraction:'extractionAltM',release:'releaseAltM',cadence:'releaseCadenceSec',delay:'probeDelaySec',
    minOrbits:'minOrbits',maxOrbits:'maxOrbits',latitude:'targetLatDeg',longitude:'targetLonDeg',
    timeWeight:'targetWaitPenaltyKmPerHour',nose:'noseRadiusM',shoulder:'shoulderRadiusM',
  };
  for(const [field,option] of Object.entries(overrides)) if(x[field]!==undefined) options[option]=x[field];
  if(x.thickness!==undefined) options.tpsThicknessM=x.thickness/1000;
  if (x.impulse !== undefined) {
    options.AimpulseNs = x.impulse;
    options.Aisp = x.isp;
    options.Bisp = x.isp;
    options.AthrustN = x.thrust;
    options.BburnSec = x.burnSec;
  }
  let probeKg=configuration.probeKg;
  if(key==='A'&&x.impulse!==undefined){
    const plan=precursorMassPlan(configuration.wetKg,options);
    options.carrierDryA=plan.carrierDryKg;
    probeKg=plan.probeTotalKg/configuration.count;
  }
  const result = runFlight(key, {...configuration, probeKg, probeChuteM: x.diameter ?? configuration.probeChuteM,
    pcmChuteM: x.carrierDiameter ?? configuration.pcmChuteM}, options);
  if (!result.times || result.descent.unreleased || result.descent.probes.some(p => p.rows.at(-1).alt > 0))
    throw Error(result.warnings[0] ?? 'The trajectory did not deliver every probe.');
  return result;
}

function mission(ctx, x) {
  const f = flight(ctx, x);
  const t = f.times;
  const hours = t.lastProbeImpact / 3600;
  const events = [
    ['Host separation', 0, ctx.configuration.orbitKm * 1000],
    ['Start burn alignment', t.alignStart, ctx.configuration.orbitKm * 1000],
    ['Retroburn start', t.burnStart, f.burn.rows[0].alt],
    ['Retroburn end / start entry alignment', t.burnEnd, f.burn.rows.at(-1).alt],
    ['Entry alignment complete', t.heatAlignEnd, interpolateRows(f.coast.rows, t.heatAlignEnd - t.burnEnd).alt],
    ['Module jettison', t.moduleDetached, interpolateRows(f.coast.rows, t.moduleDetached - t.burnEnd).alt],
    ['Entry interface', t.entryStart, f.entry.rows[0].alt],
    ['Carrier extraction / aeroshell discard', t.descentStart, f.entry.last.alt],
    ...f.descent.releases.map(r => ['Release probe ' + r.id, t.descentStart + r.t, r.state[1]]),
    ...f.descent.probes.map(p => ['Probe ' + p.id + ' impact', t.descentStart + p.impactT, 0]),
    ['Carrier touchdown', t.carrierLanding, 0],
  ].sort((a, b) => a[1] - b[1]);
  const miss = f.target.best.missKm;
  return objective(miss + x.timeWeight * hours,
    [['Target miss (km)', miss], ['Time to final probe impact (h)', hours], ['Extraction speed (m/s)', f.entry.last.airV],
      ['Extraction dynamic pressure (Pa)', f.entry.last.dynamicPressure]],
    [['Target tolerance margin (km)', f.options.targetToleranceKm - miss],
      ['Extraction pressure margin (Pa)', x.extractionQ - f.entry.last.dynamicPressure],
      ['Jettison time margin (s)', t.entryStart - t.moduleDetached - x.coast],
      ['Cold-gas reserve (kg)', f.gas.reserveKg]], events);
}

function shield(ctx, x) {
  if (x.nose > ctx.configuration.diameterM / 2 || x.shoulder >= x.nose)
    throw Error('Use a nose radius within the entry diameter envelope and a shoulder radius smaller than the nose.');
  const f = flight(ctx, x);
  const thermal = thermalReplay(f.entry.rows, f.options, x.thickness / 1000, {fluxFactor:x.fluxFactor,soakSec:x.soak,residualFlux:x.residualFlux*1000});
  const stability = cgScreen({diameterM: ctx.configuration.diameterM, cgD: x.cg,
    neutralPointsD: [x.hypersonic, x.supersonic, x.transonic], sigmaD: x.sigma, marginD: x.margin});
  const staticMargin = stability.lowerMarginD - x.margin;
  const bulkMargin = x.bulkLimit - thermal.bulkC;
  const surfaceMargin = x.surfaceLimit - thermal.surfaceC;
  const tpsMass = Math.PI * (ctx.configuration.diameterM / 2) ** 2 * x.thickness / 1000 * f.options.tpsDensity;
  return objective(-(Math.min(staticMargin / .1, bulkMargin / 100, surfaceMargin / 500)) + x.massWeight * tpsMass,
    [['Lower static margin (D)', stability.lowerMarginD], ['Peak surface temperature (°C)', thermal.surfaceC],
      ['Peak bulk temperature (°C)', thermal.bulkC], ['Projected-area TPS mass proxy (kg)', tpsMass],
      ['Peak center heat flux (W/m²)', f.entry.peakQ]],
    [['Static margin surplus (D)', staticMargin], ['Bulk temperature margin (°C)', bulkMargin],
      ['Surface temperature margin (°C)', surfaceMargin], ['TPS allocation margin (kg)', x.tpsBudget - tpsMass]]);
}

function chute(ctx, x) {
  const f = flight(ctx, x);
  const outcomes = f.descent.probes.map(p => {
    const vertical = Math.abs(p.rows.at(-1).vy);
    const impact = impactEstimate(vertical, ctx.configuration.probeKg, 'soil', {...ctx.soil,soilResistanceMPa:x.resistance});
    const areaCd = f.options.cd * Math.PI * x.diameter ** 2 / 4;
    const canopyForce = Math.max(...p.rows.map(r => .5 * f.options.rho0 * Math.exp(-r.alt / f.options.scaleHeightM)
      * ((r.vx - f.options.windMps) ** 2 + r.vy ** 2) * areaCd * r.chute));
    return {vertical, impact, canopyForce, tilt: p.impactAngleDeg};
  });
  const worst = Math.max(...outcomes.map(r => Math.abs(r.vertical - x.targetSpeed)));
  const peak = Math.max(...outcomes.map(r => r.impact.peakG));
  const minDepth = Math.min(...outcomes.map(r => r.impact.depth));
  const maxDepth = Math.max(...outcomes.map(r => r.impact.depth));
  const maxForce = Math.max(...outcomes.map(r => r.canopyForce));
  const maxTilt = Math.max(...outcomes.map(r => r.tilt));
  return objective(worst, [['Worst speed error (m/s)', worst], ['Minimum modeled nose depth (m)', minDepth],
    ['Maximum modeled nose depth (m)', maxDepth], ['Peak modeled shock (g₀)', peak],
    ['Peak modeled canopy drag (N)', maxForce], ...outcomes.map((r, i) => ['Probe ' + (i + 1) + ' vertical impact speed (m/s)', r.vertical])],
  [['Peak shock margin (g₀)', x.shock - peak], ['Canopy drag margin (N)', x.force - maxForce],
    ['Impact angle margin (°)', x.tilt - maxTilt], ['Minimum modeled nose depth margin (m)', minDepth - x.minDepth],
    ['Maximum modeled nose depth margin (m)', x.maxDepth - maxDepth]]);
}

const thermalInputs = {
  nose, shoulder, thickness, cg,
  hypersonic: input('Assumed hypersonic neutral point (x/D)', .35, 0, 2, .01),
  supersonic: input('Assumed supersonic neutral point (x/D)', .31, 0, 2, .01),
  transonic: input('Assumed transonic neutral point (x/D)', .27, 0, 2, .01),
  sigma: input('Neutral point / CG uncertainty (1σ/D)', .01, 0, .5, .001),
  margin: input('Required static margin (D)', .05, 0, .5, .005),
  fluxFactor: input('Heating uncertainty multiplier', 1.5, .1, 5, .1),
  soak: input('Post-entry soak duration (s)',300,0,3600,10),
  residualFlux: input('Residual heat flux during soak (kW/m²)',0,0,1000,.1),
  bulkLimit: input('Illustrative bulk limit (°C)', 120, -100, 1000, 5),
  surfaceLimit: input('Illustrative surface limit (°C)', 1500, 0, 4000, 25),
  tpsBudget: input('Illustrative TPS mass budget (kg)', 5, .2, 20, .1),
  massWeight: input('Score penalty per kg of TPS', .05, 0, 2, .01),
};
export const STUDIES = [
  {id:'mission', title:'Mission phase timing and altitude', closure:['TBD-01','TBD-02','TBD-03','TBD-12','TBD-18'],
    link:'index.html#flight-analysis', description:'Minimize target miss plus elapsed-time penalty. The default reference orbit is 400 km. Linked site inputs can change the starting orbit. The model uses a 125 km entry interface. Burn timing comes from an orbit-window search. Extraction and probe-release gates are design variables. The schedule starts at host separation and ends with ground delivery.',
    inputs:{extraction, release, cadence, minOrbits:input('Earliest burn orbit',3,3,20,1), maxOrbits:input('Latest burn orbit',20,3,20,1),
      latitude:input('Target latitude (°)',0,-90,90,.1), longitude:input('Target longitude (°)',0,-180,180,.1),
      carrierDiameter:input('Carrier parachute diameter (m)',1.5,.5,5,.02),extractionQ, coast, timeWeight}, vary:['extraction','release','cadence','carrierDiameter','minOrbits','maxOrbits'], evaluate:mission},
  {id:'shield', title:'Heat-shield shape, stability and survival', closure:['TBD-02','TBD-11','TBD-15'],
    link:'index.html#entry-design-trades', description:'Screen changes in nose radius, shoulder radius, thickness and CG against heating, soak and an assumed static stability envelope. Neutral points are supplied separately and held fixed during the sweep. Geometry-specific aerodynamic data, damping, ablation and dispersed 6-DOF are still required.',
    inputs:thermalInputs, vary:['nose','shoulder','thickness','cg'], evaluate:shield},
  {id:'chute', title:'Probe chute, penetration velocity and impact', closure:['TBD-03','TBD-05','TBD-18'],
    link:'index.html#impactControls', description:'Minimize the largest vertical-speed error across all probes while screening canopy drag, impact angle, shock and modeled nose depth. Canopy drag is a quasi-steady proxy; the Poncelet screen uses a single editable bearing resistance. Nose depth and accessible sample depth are distinct measurements.',
    inputs:{diameter,delay,release,cadence,targetSpeed,shock,force:input('Illustrative canopy force ceiling (N)',500,5,5000,10),
      tilt:input('Impact angle ceiling (°)',15,0,90,1),resistance:input('Effective bearing resistance (MPa)',3,.05,150,.1),
      minDepth:input('Minimum modeled nose depth (m)',.02,0,.2,.005),maxDepth:input('Maximum modeled nose depth (m)',.2,.01,.6,.005)},
    vary:['diameter','delay','release','cadence'],evaluate:chute},
  {id:'mass',title:'Vehicle wet-mass and uncertainty ledger',closure:[],link:'index.html#engineering',
    description:'Check the wet-mass margin per vehicle using the fixed A or B probe allocation and separate dry, propulsion and retained gas entries. Optimize only tradeable structure mass while protecting the entered minimum. Replace illustrative allocations with weighed values.',
    inputs:{structure:input('Structure and mechanisms (kg)',4,.1,30,.05),minimum:input('Minimum allowed structure (kg)',3,.1,30,.05),
      dry:input('Other dry hardware (kg)',6,0,50,.1),propellant:input('Retro propellant (kg)',.91,0,15,.01),
      gas:input('Loaded nitrogen (kg)',.1,0,1,.01), reserve:input('Mass uncertainty allowance (kg)',1,0,10,.05)},
    vary:['structure'],evaluate:(ctx,x)=>{
      const c=ctx.configuration,wet=c.count*c.probeKg+x.structure+x.dry+x.propellant+x.gas;
      return objective(wet,[['Vehicle count',c.vehicles],['Total deployed probes',c.vehicles*c.count],['Estimated wet mass per vehicle (kg)',wet],
        ['Estimated mission wet mass (kg)',wet*c.vehicles]],[['Mass margin after uncertainty (kg)',(ctx.massLimitKg??c.wetKg)-wet-x.reserve],
        ['Minimum structure allowance (kg)',x.structure-x.minimum]]);
    }},
  {id:'relay',title:'RF link and relay volume',closure:['TBD-04','TBD-19'],link:'index.html#engineering',
    description:'Minimize RF energy for a contact while screening received power margin and delivered volume. Use measured receiver, antenna, loss and contact values when available.',
    inputs:{ watts:input('RF output (W)',10,.1,50,.25),seconds:input('Transmit seconds in contact',60,1,900,5),
      contact:input('Available contact (s)',120,1,1200,5),rate:input('Net data rate (bit/s)',1200,1,1000000,10),
      bits:input('Required data (kbit)',50,0,100000,1),distance:input('Slant range (km)',400,1,10000,10),
      frequency:input('Frequency (MHz)',400,1,10000,1),gain:input('Net gains minus losses (dB)',0,-80,80,1),
      sensitivity:input('Receiver threshold (dBm)',-120,-180,-30,1),minimum:input('Required fade margin (dB)',3,0,30,1),
      efficiency:input('PA efficiency',.4,.05,1,.01)},
    vary:['watts','seconds'], evaluate:(_,x)=>{
      const margin=10*Math.log10(1000*x.watts)+x.gain-32.44-20*Math.log10(x.frequency*x.distance)-x.sensitivity;
      const volume=x.seconds*x.rate/1000, wh=x.watts*x.seconds/x.efficiency/3600;
      return objective(wh,[['Link margin (dB)',margin],['Contact volume (kbit)',volume],['RF energy (Wh)',wh]],
        [['Fade margin surplus (dB)',margin-x.minimum],['Contact time margin (s)',x.contact-x.seconds],['Data margin (kbit)',volume-x.bits]]);
    }},
  {id:'energy',title:'Energy, duty cycle and operating duration',closure:['TBD-07'],link:'index.html#engineering',
    description:'Minimize installed battery capacity while protecting reserve and required active hours. Run the model separately for the probe, carrier and retro module using their respective loads.',
    inputs:{ battery:input('Installed battery (Wh)',20,1,400,.5), active:input('Active fraction',.25,.01,1,.01),
      baseline:input('Continuous power (W)',.2,0,50,.05), load:input('Additional active power (W)',.4,0,100,.1),
      heater:input('Average heater power (W)',.05,0,100,.05), peak:input('Measured peak current (A)',2,0,80,.1),
      rated:input('Available peak current (A)',3,.1,80,.1), derate:input('Usable capacity fraction',.8,.1,1,.01),
      reserve:input('Return reserve (Wh)',3,0,100,.5), minimum:input('Required active hours',4,0,150,.25)},
    vary:['battery','active'],evaluate:(ctx,x)=>{
      const hours=ctx.configuration.operationHours,draw=hours*(x.baseline+x.heater+x.active*x.load);
      return objective(x.battery,[['Hours scheduled',hours],['Energy consumed (Wh)',draw],['Active time (h)',hours*x.active]],
        [['Energy margin after reserve (Wh)',x.battery*x.derate-draw-x.reserve],
          ['Peak current margin (A)',x.rated-x.peak],['Active time margin (h)',hours*x.active-x.minimum]]);
    }},
  {id:'propulsion',title:'Retroburn sizing and motor sensitivity',closure:['TBD-12','TBD-03'],link:'index.html#flight-analysis',
    description:'Minimize modeled propellant with entry and coast gates. A varies the fixed-impulse motor screen; B varies the modeled required-Δv burn duration. Use certified thrust curves for candidate comparison.',
    inputs:{impulse:input('A total impulse (N·s)',2000,100,5000,20), thrust:input('A mean thrust (N)',100,10,1000,2),
      burnSec:input('B burn duration (s)',12.8,1,120,.2), isp:input('Assumed motor Isp (s)',225,100,400,5),
      acceleration:input('Thrust acceleration ceiling (m/s²)',15,1,50,.5),coast},
    vary:['impulse','thrust','burnSec','isp'],evaluate:(ctx,x)=>{
      const f=flight(ctx,x);
      const load=f.burn.thrustN/f.burn.rows.at(-1).mass;
      return objective(f.burn.propellant,[['Propellant (kg)',f.burn.propellant],['Delivered impulse (N·s)',f.burn.impulse],
        ['Thrust acceleration (m/s²)',load],['Post-burn periapsis (km)',f.burn.periapsisKm]],
        [['Acceleration margin (m/s²)',x.acceleration-load],['Jettison time margin (s)',f.times.entryStart-f.times.moduleDetached-x.coast]]);
    }},
  {id:'gas',title:'Cold-gas tank and regulator envelope',closure:['TBD-13','TBD-02'],link:'index.html#flight-analysis',
    description:'Minimize ideal-gas loaded mass over the three modeled maneuvers. Enter worst-case operating conditions and regulator limits. Vessel strength and real-gas behavior require separate evidence.',
    inputs:{volume:input('Tank volume (L)',INITIAL_FLIGHT_OPTIONS.tankLitres,.1,10,.01),
      pressure:input('Initial pressure (bar)',200,25,400,2), regulator:input('Minimum regulated pressure (bar)',20,1,150,1),
      temperature:input('Gas temperature (K)',293,180,360,1),loss:input('Pre-maneuver leakage (%)',1,0,50,1),
      ceiling:input('Allowed pressure (bar)',200,30,300,1),minimum:input('Additional reserve (g)',5,0,100,1)},
    vary:['volume','pressure'],evaluate:(ctx,x)=>{
      const gas=gasBudget(ctx.configuration.wetKg,{...ctx.flightOptions,tankLitres:x.volume,tankBar:x.pressure,tankKelvin:x.temperature,
        tankMinBar:x.regulator,inertia:ctx.configuration.inertia??(ctx.key==='A'?FLIGHT_DEFAULTS.inertiaA:FLIGHT_DEFAULTS.inertiaB)});
      const remaining=1000*(gas.usableKg-gas.totalManeuverKg-gas.initialKg*x.loss/100);
      return objective(gas.initialKg,[['Loaded nitrogen (g)',1000*gas.initialKg],['Three maneuver draw (g)',1000*gas.totalManeuverKg],
        ['Usable gas remaining (g)',remaining]], [['Pressure margin (bar)',x.ceiling-x.pressure],['Reserve surplus (g)',remaining-x.minimum]]);
    }},
  {id:'storage',title:'Data capacity and blackout buffering',closure:['TBD-19','TBD-10','TBD-04'],link:'index.html#documents',
    description:'Minimize peak modeled storage occupancy while preserving science sampling and journal throughput for an uninterrupted blackout. Use measured record production and write throughput.',
    inputs:{rate:input('Record rate (Hz)',10,.1,1000,.1),minimum:input('Required sample rate (Hz)',8,.1,1000,.1),
      bytes:input('Payload bytes per record',256,1,100000,1),overhead:input('Journal overhead per record (bytes)',32,0,10000,1),
      hours:input('Uninterrupted blackout (h)',24,0,150,1),capacity:input('Usable storage (MB)',64,1,2000,1),
      throughput:input('Qualified write rate (kB/s)',100,1,50000,1)},
    vary:['rate'],evaluate:(_,x)=>{
      const rate=x.rate*(x.bytes+x.overhead),volume=rate*x.hours*3600/1e6;
      return objective(volume,[['Required storage (MB)',volume],['Write rate (kB/s)',rate/1000]],
        [['Capacity margin (MB)',x.capacity-volume],['Write margin (kB/s)',x.throughput-rate/1000],['Sample-rate surplus (Hz)',x.rate-x.minimum]]);
    }},
  {id:'science',title:'Science package and detector count budget',closure:['TBD-00','TBD-06','TBD-07','TBD-09'],
    link:'science-review.html',
    description:'Screen the count-time budget for a single calibrated signal channel versus a matched blank. The score minimizes total detector time. Enter net signal and background rates from measured references. This independent Poisson screen assumes equal sample and blank exposure and does not establish isotope specificity, validated detection limits or biological attribution.',
    inputs:{seconds:input('Live time per sample and blank (s)',600,10,7200,10),
      repeats:input('Sample and blank replicate pairs',3,1,30,1), signal:input('Net expected count rate (counts/s)',.08,0,1000,.01),
      background:input('Blank count rate (counts/s)',.15,0,1000,.01),
      threshold:input('Required screening signal-to-noise ratio',3,1,15,.1),
      maxTime:input('Available detector time (min)',180,1,1440,1), power:input('Readout power (W)',.2,.01,30,.01),
      energy:input('Detector energy budget (Wh)',.5,.01,100,.01)},
    vary:['seconds','repeats'],evaluate:(_,x)=>{
      const exposure=x.seconds*x.repeats,minutes=2*exposure/60,energy=x.power*minutes/60;
      const noise=Math.sqrt((x.signal+2*x.background)*exposure);
      const snr=noise ? x.signal*exposure/noise : 0;
      return objective(minutes,[['Expected excess counts',x.signal*exposure],['Screening signal-to-noise ratio',snr],['Detector energy (Wh)',energy]],
        [['Signal-to-noise surplus',snr-x.threshold],['Time margin (min)',x.maxTime-minutes],['Energy margin (Wh)',x.energy-energy]]);
    }},
  {id:'clock',title:'Clock drift, sync and ordering',closure:['TBD-20','TBD-08'],link:'index.html#systems-software',
    description:'Maximize synchronization interval while bounding two independent clocks with worst-case opposing drift and timestamp error. Reset and rollover behavior require fault injection.',
    inputs:{interval:input('Resync interval (s)',60,1,3600,1),ppm:input('Per-clock drift bound (ppm)',20,0,1000,1),
      error:input('Per-clock synchronization error (ms)',2,0,1000,.1), limit:input('Ordering uncertainty limit (ms)',10,0,5000,.5)},
    vary:['interval'],evaluate:(_,x)=>{
      const skew=2*(x.error+x.ppm*x.interval/1000);
      return objective(-x.interval,[['Pairwise ordering uncertainty (ms)',skew],['Resync interval (s)',x.interval]],
        [['Uncertainty margin (ms)',x.limit-skew]]);
    }},
];

export const defaults = (study, key='A') => ({
  ...Object.fromEntries(Object.entries(study.inputs).map(([name, field])=>[name,field.value])),
  ...(key==='B' ? {
    ...(study.id==='mission'?{carrierDiameter:2}:{}),
    ...(study.id==='propulsion'?{isp:250}:{}),
    ...(study.id==='storage'?{capacity:256}:{}),
    ...(study.id==='mass'?{structure:11,minimum:9,dry:17,propellant:2}:{}),
  } : {}),
});

export function evaluateStudy(study, context, values) {
  for (const [key, field] of Object.entries(study.inputs)) {
    const value=values[key];
    if (!Number.isFinite(value) || value < field.min || value > field.max) throw Error('Check ' + field.label + '.');
  }
  for(const key of ['minOrbits','maxOrbits','repeats']) if(key in study.inputs && !Number.isInteger(values[key]))
    throw Error(study.inputs[key].label+' must be a whole number.');
  const result=study.evaluate(context,values);
  if (![result.score,...result.metrics.map(([,v])=>v),...result.checks.map(([,v])=>v)].every(Number.isFinite))
    throw Error('Model returned a non-finite result.');
  return result;
}

export function improve(study, context, values, iterations, multiplier) {
  if (!Number.isInteger(iterations) || iterations < 1 || iterations > 30 || ![1,2,3,4,5].includes(multiplier))
    throw Error('Use 1–30 iterations and a step multiplier of 1–5.');
  let current={...values};
  let attempts=0;
  const evaluate = candidate => {
    attempts++;
    try {return evaluateStudy(study,context,candidate);}
    catch {return null;}
  };
  const severity=result=>result?.checks.reduce((sum,[,margin])=>sum+(margin<0?Math.log1p(-margin):0),0)??Infinity;
  const better=(a,b)=>a && (severity(a)<severity(b)-1e-9 ||
    (Math.abs(severity(a)-severity(b))<=1e-9 && a.score < b.score-1e-9));
  const baseline=evaluate(current);
  let best=baseline;
  const history=[];
  for (let iteration=1; iteration<=iterations; iteration++) {
    let winner=current, winning=best;
    for (const key of study.vary) {
      const {min,max,step}=study.inputs[key];
      for (const direction of [-1,1]) {
        const value=Number(Math.max(min,Math.min(max,current[key]+direction*step*multiplier)).toFixed(9));
        if (value===current[key]) continue;
        const candidate={...current,[key]:value};
        const result=evaluate(candidate);
        if (better(result,winning)) {winner=candidate; winning=result;}
      }
    }
    if (winner===current) break;
    current=winner;
    best=winning;
    history.push({iteration,values:current,result:best});
  }
  return {values:current,baseline,best,history,attempts};
}
