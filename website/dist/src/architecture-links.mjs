import {ARCHITECTURE_DIAGRAMS} from './architecture-data.mjs?v=373144b22b36';
// Lenses link conceptual blocks to implemented screens, never invent component values.
export const BLOCK_LENSES={
 sample:{groups:['impact'],m:['probeKg'],s:['impactDiameterM','probeLengthM'],family:'PRB',pattern:'sampl|penetrat',bio:['BIO-P01','BIO-P05','BIO-08']},
 science:{groups:['energy'],m:['operationHours','averageW','energyWh'],family:'PRB|SYS',pattern:'scien|sampl|experiment|operat',bio:['BIO-P02','BIO-P03','BIO-P04']},
 detector:{groups:[],m:[],family:'PRB|SYS',pattern:'scien|payload',bio:['BIO-P06','BIO-05','BIO-07']},
 energy:{groups:['energy'],m:['energyWh','averageW','operationHours'],family:'PRB|SYS',pattern:'power|energ|batter',bio:['BIO-P04','BIO-P10']},
 thermal:{groups:['thermal'],f:['initialTempK','tpsK','tpsThicknessM'],family:'STR|EDL|PRB',pattern:'thermal|heat|temperat',bio:['BIO-03','BIO-13']},
 data:{groups:['rf','status'],m:['bufferMB','frequencyMHz','rangeKm','rfW','dutySec'],family:'SYS|COM',pattern:'data|telemetr|transmit|status|stor',bio:['BIO-P09']},
 gnc:{groups:['gas','target'],m:['inertia','jetN','leverM'],f:['slewDeg','heatSlewDeg','jetIsp'],family:'GNC',pattern:'attitude|navig|confiden|control',bio:[]},
 gas:{groups:['gas','tank'],m:['jetN','leverM','inertia'],f:['tankLitres','tankBar','tankMinBar','jetIsp','slewDeg','heatSlewDeg'],family:'GNC',pattern:'gas|thrust|attitude',bio:[]},
 engine:{groups:['engine','orbit'],m:['wetKg','orbitKm','periapsisKm'],f:['AthrustN','AimpulseNs','Aisp','BburnSec','Bisp'],family:'GNC|EDL',pattern:'deorbit|burn|ignit|propul',bio:[]},
 safety:{groups:['jets','status'],m:['count'],family:'GNC|PCM|EDL',pattern:'inhibit|safe|confirm|abort',bio:[]},
 mass:{groups:['mass'],m:['wetKg','probeKg','count','diameterM','heightM'],f:['moduleDryA','moduleDryB','carrierDryA','carrierDryB'],family:'STR|PCM|PRB',pattern:'mass|fit|load|clearance|struct',bio:['BIO-P10']},
 entry:{groups:['entry','thermal'],m:['rho','diameterM'],f:['entryCd','extractionAltM','noseRadiusM','shoulderRadiusM'],family:'EDL|STR',pattern:'entry|shield|heat|decel',bio:[]},
 descent:{groups:['descent'],m:['count','probeKg','pcmChuteM','probeChuteM','cd','rho'],f:['extractionAltM','releaseAltM','releaseCadenceSec'],family:'PCM|EDL',pattern:'release|chute|extract|deploy|carrier',bio:[]},
 status:{groups:['status'],m:['count','vehicles'],family:'COM|PCM|GNC|SYS',pattern:'status|confirm|bit|event|fault',bio:['BIO-P09']}
};
const mapping={
 'probe-hardware':['sample','science','energy','science','detector','data','descent','thermal','data'],
 'probe-software':['status','safety','energy','sample','science','detector','detector','data','data'],
 'retro-hardware':['gnc','gnc','engine','gas','gas','safety','energy','mass','status'],
 'retro-software':['safety','gas','gnc','gas','engine','gas','safety','gas','status'],
 'capsule-hardware':['entry','entry','mass','safety','entry','descent','mass','status','descent'],
 'capsule-software':['status','entry','entry','safety','safety','descent','status','mass','status'],
 'carrier-hardware':['mass','descent','descent','descent','status','data','energy','data','descent'],
 'carrier-software':['status','descent','descent','status','status','data','energy','data','status']};
export const ARCHITECTURE_BLOCKS=ARCHITECTURE_DIAGRAMS.flatMap(d=>d.nodes.map((n,i)=>({id:`${d.id}-${String(i+1).padStart(2,'0')}`,diagram:d.id,vehicle:d.vehicle,kind:d.kind,index:i+1,...n,lens:mapping[d.id][i]})));
export function blockById(id){return ARCHITECTURE_BLOCKS.find(x=>x.id===id);}
export function blockRequirements(block,requirements){const lens=lensForBlock(block);return requirements.filter(r=>new RegExp('^('+lens.family+')-').test(r.id)&&new RegExp(lens.pattern,'i').test(r.text)).slice(0,3);}
export function lensForBlock(block){
 const lens=BLOCK_LENSES[block.lens];
 if(block.vehicle==='Probe'&&block.lens==='descent')return {...lens,m:['probeKg','probeChuteM','rho','cd'],f:['probeDelaySec','inflateSec'],family:'PRB|EDL',pattern:'chute|parachute|stabili',bio:['BIO-P10'],note:'Independent probe drogue canopy and attachment structure. Opening loads, clearance and post-impact geometry require verification.'};
 if(block.vehicle==='Probe'&&block.lens==='thermal')return {...lens,groups:[],m:[],f:[],note:'No specimen or detector thermal solver exists. Entry heat-shield temperatures must not be substituted for this enclosure.'};
 if(block.vehicle!=='Probe'&&block.lens==='energy')return {...lens,groups:block.vehicle==='Carrier'?['rf']:[],m:block.vehicle==='Carrier'?['rfW','paEfficiency','dutySec','periodSec']:[],note:'A dedicated subsystem battery and peak-power allocation is not defined. Probe energy defaults are not this subsystem’s battery specification.'};
 return {...lens,note:'Current trade inputs below are model references, not measured component specifications. This functional allocation remains proposed.'};
}
