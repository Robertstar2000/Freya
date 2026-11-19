import {interpolateRows} from './flight-model.mjs?v=373144b22b36';
const n=(v,d=1)=>Number.isFinite(v)?v.toFixed(d):'—';
export function thermalState(f,time){
 if(!f?.entry||!f?.times)return null;
 const t=Math.max(0,Math.min(f.entry.duration,time-f.times.entryStart));
 return {...interpolateRows(f.entry.rows,t),t,mode:time<f.times.entryStart?'PRE-ENTRY':time>=f.times.descentStart?'LAST AT DISCARD':'LIVE ENTRY'};
}
export function heatShieldInstrument(f,time=0){
 const current=thermalState(f,time);
 if(!current)return '<svg viewBox="0 0 360 355" role="img" aria-label="Heat shield temperatures unavailable"><text x="20" y="100">No entry solution</text></svg>';
 const rows=f.entry.rows,lo=Math.floor(Math.min(...rows.map(r=>Math.min(r.centerC,r.shoulderC)))/100)*100,hi=Math.ceil(Math.max(...rows.map(r=>Math.max(r.centerC,r.shoulderC)))/100)*100+100;
 const x=t=>48+282*t/Math.max(1,f.entry.duration),y=v=>264-(v-lo)/(hi-lo)*139;
 const sample=rows.filter((_,i)=>i%Math.max(1,Math.floor(rows.length/220))===0||i===rows.length-1);
 const points=(data,key)=>data.map(r=>`${x(r.t)},${y(r[key])}`).join(' ');
 const elapsed=[...sample.filter(r=>r.t<current.t),current];let grid='';
 for(let i=0;i<=4;i++){const v=lo+(hi-lo)*i/4,yy=y(v),xx=48+282*i/4;grid+=`<path d="M48 ${yy}H330 M${xx} 125V264" stroke="#2b495b" stroke-width=".6"/><text x="41" y="${yy+4}" text-anchor="end" class="ti-axis">${n(v,0)}</text><text x="${xx}" y="285" text-anchor="middle" class="ti-axis">${n(f.entry.duration*i/4,0)}</text>`;}
 const curves=[['centerC','#ffb077'],['shoulderC','#83d7e5']].map(([key,color])=>`<polyline points="${points(sample,key)}" stroke="${color}" stroke-opacity=".22" stroke-dasharray="3 4" fill="none"/><polyline points="${points(elapsed,key)}" stroke="${color}" stroke-width="2" fill="none"/><circle cx="${x(current.t)}" cy="${y(current[key])}" r="4" fill="${color}" stroke="#fff"/>`).join('');
 return `<svg viewBox="0 0 360 355" role="img" aria-label="Heat shield center ${n(current.centerC)} degrees Celsius, shoulder ${n(current.shoulderC)} degrees Celsius, ${current.mode}"><title>Computed heat shield surface temperatures; future curve is faint, current values are marked</title><text x="20" y="25" class="ti-mode">${current.mode} / SURFACE ESTIMATE</text><text x="20" y="49" fill="#ffb077">CENTER</text><text x="20" y="82" class="ti-reading" style="fill:#ffb077">${n(current.centerC)} °C</text><text x="195" y="49" fill="#83d7e5">SHOULDER</text><text x="195" y="82" class="ti-reading" style="fill:#83d7e5">${n(current.shoulderC)} °C</text><text x="20" y="112" class="ti-axis">°C</text>${grid}${curves}<path d="M${x(current.t)} 125V264" stroke="#e3edf4" stroke-dasharray="3 4" stroke-opacity=".6"/><text x="330" y="307" text-anchor="end" class="ti-axis">SECONDS SINCE ENTRY</text><text x="20" y="333" class="ti-axis">t = ${n(current.t)} s · computed thermal model</text></svg>`;
}
export function firingState(f,time=0){
 if(!f?.times)return null;
 const g=f.gas,t=f.times,half=g.slewSec/2;
 const separation=time>=0&&time<g.sepSec;
 const accel=time>=t.alignStart&&time<t.alignStart+half;
 const decel=time>=t.alignStart+half&&time<t.alignStart+g.slewSec;
 const heatAccel=time>=t.heatAlignStart&&time<t.heatAlignStart+g.heatSlewSec/2,heatDecel=time>=t.heatAlignStart+g.heatSlewSec/2&&time<t.heatAlignEnd;
 const on=time>=t.burnStart&&time<t.burnEnd,detached=time>=t.moduleDetached;
 const burnTime=Math.max(0,Math.min(f.burn.duration,time-t.burnStart));
 return {jets:[separation,separation,accel||heatAccel,accel||heatAccel,decel||heatDecel,decel||heatDecel],separation,accel,decel,heatAccel,heatDecel,on,detached,burnTime,thrustN:on?f.burn.thrustN:0,propellantUsed:interpolateRows(f.burn.rows,burnTime).propellant,mode:detached?'MODULE DETACHED':on?(burnTime<Math.min(.5,f.burn.duration)?'IGNITION':'MAIN ENGINE BURN'):heatAccel?'ENTRY ALIGN ACCEL':heatDecel?'ENTRY ALIGN BRAKE':time>=t.burnEnd?'BURN COMPLETE':separation?'SEPARATION JETS':accel?'SLEW ACCELERATION':decel?'SLEW DECELERATION':'COAST / ENGINE OFF'};
}
export function firingInstrument(f,time=0){
 const s=firingState(f,time);if(!s)return '<svg viewBox="0 0 360 355" role="img" aria-label="Propulsion state unavailable"><text x="20" y="100">No flight solution</text></svg>';
 const jets=s.jets.map((active,i)=>{const x=i<3?65:295,y=83+(i%3)*32,dir=i<3?-1:1;return `<g data-jet="${i+1}" data-firing="${active}"><rect x="${x-8}" y="${y-5}" width="16" height="10" fill="${active?'#9ce8e8':'#183346'}" stroke="#63879a"/>${active?`<path d="M${x+dir*9} ${y-4}L${x+dir*31} ${y}L${x+dir*9} ${y+4}" fill="#8edddf"/>`:''}<text x="${x+dir*27}" y="${y-10}" text-anchor="middle" class="ti-axis">J${i+1}</text></g>`;}).join('');
 const stages=[['SEP',0,f.gas.sepSec,s.separation],['SLEW +',f.times.alignStart,f.gas.slewSec/2,s.accel],['SLEW −',f.times.alignStart+f.gas.slewSec/2,f.gas.slewSec/2,s.decel],['MAIN',f.times.burnStart,f.burn.duration,s.on],['ENTRY',f.times.heatAlignStart,f.gas.heatSlewSec,s.heatAccel||s.heatDecel]];
 const tracks=stages.map(([label,start,duration,active],i)=>{const yy=238+i*18,q=Math.max(0,Math.min(1,(time-start)/Math.max(1e-9,duration)));return `<text x="20" y="${yy+5}" class="ti-axis">${label}</text><path d="M85 ${yy}H274" stroke="#213d50" stroke-width="7"/><path d="M85 ${yy}H${85+189*q}" stroke="${i===3?'#e7a06d':'#70c1ce'}" stroke-width="7" opacity="${active?1:.5}"/><text x="336" y="${yy+5}" text-anchor="end" class="ti-axis">${n(duration,1)}s</text>`;}).join('');
 return `<svg viewBox="0 0 360 355" role="img" aria-label="Cold gas paired-jet firing pattern and main engine ignition and burn"><title>Computed maneuver timing with schematic jet assignment</title><text x="180" y="25" text-anchor="middle" class="ti-mode">${s.mode}</text><path d="M110 71Q180 40 250 71L275 142H85Z" fill="#233c50" stroke="#8dabbb"/><path d="M85 142L180 176.577172L275 142" stroke="#b5c9d1" fill="none"/><rect x="162" y="156" width="36" height="32" fill="${s.detached?'#0b1925':'#314d61'}" stroke="#779aaa"/><path d="M168 188L157 203H203L192 188Z" fill="#314d61" stroke="#91aab9"/>${s.on?'<path data-engine-flame="true" d="M159 204Q180 253 201 204" fill="#ffab5c"/><path d="M170 204L180 233L190 204" fill="#fff0bc"/>':''}${jets}<text x="180" y="109" text-anchor="middle" class="ti-reading">${n(s.thrustN,0)} N</text><text x="180" y="132" text-anchor="middle" class="ti-axis">MAIN ENGINE</text>${tracks}<text x="20" y="323" class="ti-axis">BURN ${n(s.burnTime)} / ${n(f.burn.duration)} s</text><text x="20" y="343" class="ti-axis">PAIRED-JET SCHEMATIC · IDEAL TIMING</text></svg>`;
}
