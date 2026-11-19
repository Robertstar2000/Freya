import {temperatureStep} from './flight-model.mjs?v=45af70b8d000';
export function cgScreen({diameterM,cgD,neutralPointsD,sigmaD,marginD}){
 if(![diameterM,cgD,sigmaD,marginD,...neutralPointsD].every(Number.isFinite)||diameterM<=0||cgD<0||sigmaD<0||marginD<0||neutralPointsD.length!==3)throw new RangeError('Invalid CG assumptions');
 const limitingNeutralD=Math.min(...neutralPointsD)-3*sigmaD,maxCgD=limitingNeutralD-marginD;
 return {limitingNeutralD,maxCgD,maxCgM:maxCgD*diameterM,cgM:cgD*diameterM,nominalMarginsD:neutralPointsD.map(x=>x-cgD),lowerMarginD:limitingNeutralD-cgD,meets:maxCgD>=cgD};
}
export function thermalReplay(rows,options,thicknessM,{fluxFactor=1,soakSec=300,residualFlux=0}={}){
 if(!rows?.length||!Number.isFinite(thicknessM)||thicknessM<=options.surfaceLayerM||!Number.isFinite(fluxFactor)||fluxFactor<0||!Number.isFinite(soakSec)||soakSec<0||!Number.isFinite(residualFlux)||residualFlux<0)throw new RangeError('Invalid thermal study inputs');
 const o={...options,tpsThicknessM:thicknessM};let center=[o.initialTempK,o.initialTempK],shoulder=center.slice();let surfaceC=o.initialTempK-273.15,bulkC=surfaceC,heatLoadCenter=0,heatLoadShoulder=0;const trace=[{t:0,surfaceC,bulkC}];
 function step(dt,qc,qs,t){center=temperatureStep(center,qc,dt,o);shoulder=temperatureStep(shoulder,qs,dt,o);if(![...center,...shoulder].every(v=>Number.isFinite(v)&&v>0))throw Error('Thermal integration outside numerical range');const s=Math.max(center[0],shoulder[0])-273.15,b=Math.max(center[1],shoulder[1])-273.15;surfaceC=Math.max(surfaceC,s);bulkC=Math.max(bulkC,b);trace.push({t,surfaceC:s,bulkC:b});}
 for(let i=1;i<rows.length;i++){const dt=rows[i].t-rows[i-1].t;if(!(dt>0)||![rows[i].qCenter,rows[i].qShoulder].every(x=>Number.isFinite(x)&&x>=0))throw Error('Invalid heat-flux history');const qc=rows[i].qCenter*fluxFactor,qs=rows[i].qShoulder*fluxFactor;step(dt,qc,qs,rows[i].t);heatLoadCenter+=qc*dt;heatLoadShoulder+=qs*dt;}
 const end=rows.at(-1).t;for(let t=0;t<soakSec;){const dt=Math.min(1,soakSec-t);t+=dt;step(dt,residualFlux,residualFlux,end+t);}
 return {thicknessM,surfaceC,bulkC,heatLoadCenter,heatLoadShoulder,trace};
}
export function thicknessSweep(rows,options,settings){
 const candidates=[];for(let mm=5;mm<=80;mm+=5){if(mm/1000<=options.surfaceLayerM)continue;const r=thermalReplay(rows,options,mm/1000,settings);candidates.push({thicknessM:r.thicknessM,surfaceC:r.surfaceC,bulkC:r.bulkC,meets:r.surfaceC<=settings.surfaceLimitC&&r.bulkC<=settings.bulkLimitC});}
 return {candidates,first:candidates.find(x=>x.meets)??null};
}
