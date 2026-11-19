import {defaults} from './trade-studies-model.mjs?v=45af70b8d000';
import {SOIL_DEFAULTS} from './mission-telemetry.mjs?v=45af70b8d000';

const mission=key=>['configuration',key,'#mission-inputs','Mission settings'];
const flight=key=>['flightOptions',key,'#flight-analysis','Flight settings'];
const entry=key=>['entry',key,'#entry-design-trades','CG and TPS settings'];
const soil=key=>['soil',key,'#penetration-study','Penetration settings'];
const burn=key=>['burn',key,'#flight-analysis','Calculated flight output'];

const SOURCES={
  mission:{extraction:flight('extractionAltM'),release:flight('releaseAltM'),cadence:flight('releaseCadenceSec'),
    minOrbits:flight('minOrbits'),maxOrbits:flight('maxOrbits'),latitude:flight('targetLatDeg'),
    longitude:flight('targetLonDeg'),carrierDiameter:mission('pcmChuteM')},
  shield:{nose:flight('noseRadiusM'),shoulder:flight('shoulderRadiusM'),thickness:[...flight('tpsThicknessM'),1000],
    cg:entry('cgPosition'),hypersonic:entry('npHyp'),supersonic:entry('npSup'),transonic:entry('npTrans'),
    sigma:entry('npSigma'),margin:entry('cgMargin'),fluxFactor:entry('tpsFactor'),soak:entry('tpsSoak'),
    surfaceLimit:entry('tpsSurfaceLimit'),bulkLimit:entry('tpsBulkLimit'),residualFlux:entry('tpsResidual')},
  chute:{diameter:mission('probeChuteM'),delay:flight('probeDelaySec'),release:flight('releaseAltM'),
    cadence:flight('releaseCadenceSec'),resistance:soil('soilResistanceMPa')},
  mass:{propellant:burn('propellant'),gas:['gas','initialKg','#flight-analysis','Calculated flight output']},
  relay:{watts:mission('rfW'),distance:mission('rangeKm'),frequency:mission('frequencyMHz'),
    sensitivity:mission('receiverDbm'),efficiency:mission('paEfficiency'),
    gain:['configuration',c=>c.txGain+c.rxGain-c.lossDb,'#engineering','Transmit gain + receive gain − RF implementation loss']},
  propulsion:{impulse:flight('AimpulseNs'),thrust:flight('AthrustN'),burnSec:flight('BburnSec'),
    isp:key=>flight(key==='A'?'Aisp':'Bisp')},
  gas:{volume:flight('tankLitres'),pressure:flight('tankBar'),regulator:flight('tankMinBar'),temperature:flight('tankKelvin')},
  storage:{capacity:mission('bufferMB')},
};

export const ENTRY_IDS=['cgPosition','npHyp','npSup','npTrans','npSigma','cgMargin','tpsFactor',
  'tpsSoak','tpsResidual','tpsSurfaceLimit','tpsBulkLimit'];

export function linkedTradeInputs(study, key, baseline, live) {
  const config=baseline.configurations[key];
  const active=live?.key===key && Number.isFinite(live.configuration?.wetKg);
  const context={
    key,massLimitKg:config.mission.wetKg,configuration:{...config.mission,...(active?live.configuration:{})},
    carrierDryA:config.flight.carrierDryA,
    flightOptions:{...config.flight,...(active?live.flightOptions:{})},
    soil:{...SOIL_DEFAULTS,...live?.soil},
  };
  const data={...context,entry:live?.entry,burn:active?live.burn:{},gas:active?live.gas:{}};
  const values=defaults(study,key);
  const provenance={};
  for(const [field,definition] of Object.entries(study.inputs)){
    const mapping=SOURCES[study.id]?.[field];
    if(!mapping){
      provenance[field]={label:'Study assumption'};
      continue;
    }
    const [group,source,href,label,multiplier=1]=typeof mapping==='function'?mapping(key):mapping;
    const dataset=data[group]??{};
    const value=(typeof source==='function'?source(dataset):dataset[source])*multiplier;
    if(!Number.isFinite(value)){
      provenance[field]={label:'Study assumption · source value unavailable',href};
      continue;
    }
    if(value<definition.min||value>definition.max){
      provenance[field]={label:'Linked value outside study bounds',href,linkedValue:value};
      continue;
    }
    values[field]=value;
    const shared=group==='entry'||(group==='soil'&&live?.soil);
    const origin=shared||active?'Current site':'Rev 10 or site default';
    provenance[field]={label:origin+' · '+label,href,linkedValue:value};
  }
  return {context,values,provenance,active};
}
