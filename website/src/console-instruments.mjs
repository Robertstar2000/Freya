import {interpolateRows,gasUsage} from './flight-model.mjs';
const num=(v,d=1)=>Number.isFinite(v)?v.toFixed(d):'—';
const R=3389500;
const polar=(r,a,cx=180,cy=175)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
function frame(label,body){let ticks='';for(let i=0;i<72;i++){const a=i*Math.PI/36;const p=polar(i%6===0?139:144,a),q=polar(149,a);ticks+=`<path d="M${p}L${q}" stroke="#536d80" stroke-width="${i%6===0?1.5:.6}"/>`;}
 return `<svg viewBox="0 0 360 355" role="img" aria-label="${label}"><title>${label}</title><circle cx="180" cy="175" r="149" fill="none" stroke="#294858"/>${ticks}${body}<text x="20" y="333" class="ci-caption">${label}</text><path d="M20 340h45m-45-4v8m45-8v8" stroke="#89b1c5"/></svg>`;}
export function orbitInstrument(f,orbitKm=400){
 const rp=Math.max(R*.7,R+(f?.burn?.periapsisKm??50)*1000),ra=R+orbitKm*1000,a=(ra+rp)/2,e=(ra-rp)/(ra+rp),scale=116/ra;
 const cx=180-e*a*scale,rx=a*scale,ry=rx*Math.sqrt(1-e*e);
 return frame('PARKING / POST-BURN ORBIT',`<circle cx="180" cy="175" r="${R*scale}" fill="#091727" stroke="#547181"/><circle cx="180" cy="175" r="116" fill="none" stroke="#77a7be" stroke-dasharray="4 6"/><ellipse cx="${cx}" cy="175" rx="${rx}" ry="${ry}" fill="none" stroke="#d6e8ed" stroke-width="1.4"/><path d="M180 175L296 175" stroke="#547181"/><circle cx="296" cy="175" r="4" fill="#e9fbff"/><text x="166" y="180">MARS</text><text x="60" y="42">h₀ ${num(orbitKm,0)} km</text><text x="60" y="300">VACUUM hp ${num(f?.burn?.periapsisKm,0)} km</text>`);
}
export function descentInstrument(r,f){
 const max=f?.options?.extractionAltM??10000,probes=r?.probes??[],rings=[.35,.65,1].map(q=>`<circle cx="180" cy="175" r="${q*117}" fill="none" stroke="#436272" stroke-dasharray="${q===1?'0':'3 5'}"/>`).join('');
 const points=probes.map((p,i)=>{const a=-Math.PI/2+i*2*Math.PI/Math.max(3,probes.length),radius=Number.isFinite(p.alt)?Math.max(12,117*p.alt/max):117,[x,y]=polar(radius,a);return `<path d="M180 175L${x} ${y}" stroke="#355264"/><circle cx="${x}" cy="${y}" r="4" fill="${p.status==='landed'?'#d9f5ec':'#8ad9e7'}"/><text x="${x+8}" y="${y-7}">P${p.id}</text>`;}).join('');
 return frame('PROBE ALTITUDE / RELEASE',rings+points+`<circle cx="180" cy="175" r="6" fill="none" stroke="#fff"/><text x="65" y="44">OUTER ${num(max/1000,1)} km</text><text x="70" y="300">${probes.filter(p=>p.status==='landed').length} / ${probes.length} ON GROUND</text>`);
}
export function gasInstrument(f,time=0){
 const g=f?.gas,usage=gasUsage(f,time),used=usage?.consumedKg??0;
 const left=g?Math.max(0,g.initialKg-used):null,q=g?Math.max(0,Math.min(1,left/g.initialKg)):0,a=-Math.PI*.75+q*Math.PI*1.5,[x,y]=polar(110,a);
 const scale=Array.from({length:5},(_,i)=>{const fraction=i/4,angle=-Math.PI*.75+fraction*Math.PI*1.5,[tx,ty]=polar(127,angle),[ix,iy]=polar(115,angle),[lx,ly]=polar(99,angle);return `<path d="M${ix} ${iy}L${tx} ${ty}" stroke="#b8d9e8"/><text x="${lx}" y="${ly+4}" text-anchor="middle">${num(g?g.initialKg*1000*fraction:null,0)}</text>`;}).join('');
 return frame('N₂ INVENTORY / MODEL',`${scale}<circle cx="180" cy="175" r="115" fill="none" stroke="#436272"/><path d="M180 175L${x} ${y}" stroke="#d8edf4" stroke-width="2"/><circle cx="180" cy="175" r="7" fill="#071824" stroke="#b8d9e8"/><text x="180" y="218" text-anchor="middle" class="ci-value">${num(left===null?null:left*1000,1)} g</text><text x="180" y="240" text-anchor="middle">REMAINING GAS · SCALE g</text><text x="68" y="44">INITIAL ${num(g?.initialKg*1000,0)} g</text><text x="68" y="300">P ${num(g&&left!==null?g.pressureForMass(left):null,1)} bar</text>`);
}
export function orbitPath(f){
 if(!f?.burn)return [];
 const t=f.times??{burnStart:0,burnEnd:f.burn.duration,entryStart:f.burn.duration+(f.coast?.duration??0),descentStart:f.burn.duration+(f.coast?.duration??0)+(f.entry?.duration??0)};
 const points=f.burn.rows.map(b=>({t:t.burnStart+b.t,alt:b.alt/1000,theta:Math.atan2(b.y,b.x)}));
 const b=f.burn.rows.at(-1),h=b.x*b.vy-b.y*b.vx;let theta=Math.atan2(b.y,b.x),prev=f.coast?.rows[0];
 for(const c of f.coast?.rows??[]){if(prev){theta+=(c.t-prev.t)*h*.5*(1/(R+prev.alt)**2+1/(R+c.alt)**2);}points.push({t:t.burnEnd+c.t,alt:c.alt/1000,theta});prev=c;}
 if(f.coast?.reached)points.push({t:t.entryStart,alt:125,theta:f.coast.theta});
 for(const c of f.entry?.rows??[])points.push({t:t.entryStart+c.t,alt:c.alt/1000,theta:c.theta});
 for(const c of f.descent?.rows??[])points.push({t:t.descentStart+c.t,alt:c.alt/1000,theta:(f.entry?.last.theta??theta)+c.x/R});
 return points;
}
// Sample at the same continuous physical time as the telemetry, not the previous row.
export function trajectoryPosition(f,r,points=orbitPath(f)){
 if(!points.length)return null;
 const point=interpolateRows(points,r?.time??points[0].t);
 if(r?.capsule.status==='discarded'&&Number.isFinite(r.carrier.alt)&&Number.isFinite(r.carrier.x)){
  point.alt=r.carrier.alt/1000;point.theta=f.entry.last.theta+r.carrier.x/R;
 }else if(Number.isFinite(r?.capsule.alt))point.alt=r.capsule.alt/1000;
 return point;
}
export function trajectoryConsole(f,r,inputs={orbitKm:400},points=orbitPath(f)){
 const first=points[0],last=points.at(-1),span=Math.max(.05,(last?.theta??1)-(first?.theta??0)),mid=(first?.theta??0)+span/2;
 // Fit along-track angle to the display and exaggerate radial altitude; not a navigation map.
 const project=p=>{const a=(p.theta-mid)/span*.62,rad=1100+p.alt*.72;return [500+Math.sin(a)*rad,1510-Math.cos(a)*rad];};
 const stride=Math.max(1,Math.floor(points.length/650));const path=points.filter((_,i)=>i%stride===0||i===points.length-1).map(p=>project(p).join(',')).join(' ');
 const current=trajectoryPosition(f,r,points);
 const xy=current?project(current):[195,120],active=r?.capsule?.status==='discarded'?r?.carrier:r?.capsule;
 let grid='',ticks='';for(let x=35;x<990;x+=70)grid+=`<path d="M${x} 25V470"/>`;for(let y=25;y<490;y+=50)grid+=`<path d="M25 ${y}H975"/>`;
 for(let y=25;y<480;y+=10)ticks+=`<path d="M24 ${y}h${y%50===25?18:9}M976 ${y}h-${y%50===25?18:9}"/>`;
 for(let i=-7;i<=7;i++){const a=i*.075,rr=1160,p=[500+Math.sin(a)*rr,1510-Math.cos(a)*rr],q=[500+Math.sin(a)*(rr+22),1510-Math.cos(a)*(rr+22)];ticks+=`<path d="M${p}L${q}"/><text x="${q[0]}" y="${q[1]-9}" text-anchor="middle">${90+i*5}</text>`;}
 return `<svg viewBox="0 0 1000 490" role="img" aria-label="Mars orbital trajectory console with computed flight path and current position"><title>Mars flight trajectory · radial altitude exaggerated, along-track fitted</title><defs><linearGradient id="orbitBg" x2="0" y2="1"><stop stop-color="#082b40"/><stop offset="1" stop-color="#030812"/></linearGradient><clipPath id="orbitClip"><rect x="23" y="20" width="954" height="453"/></clipPath></defs><rect x="0" width="1000" height="490" fill="url(#orbitBg)"/><g stroke="#345565" stroke-width=".6" opacity=".55">${grid}</g><g clip-path="url(#orbitClip)"><circle cx="500" cy="1510" r="1100" fill="#060c16" stroke="#dfedf3" stroke-width="2"/><circle cx="500" cy="1510" r="${1100+inputs.orbitKm*.72}" fill="none" stroke="#81bed6" stroke-width="1.5" stroke-dasharray="8 8"/><circle cx="500" cy="1510" r="1190" fill="none" stroke="#7d94a6" stroke-dasharray="9 12"/><polyline points="${path}" fill="none" stroke="#d7e9f1" stroke-width="2"/><path d="M${xy[0]} ${xy[1]}V480" stroke="#ad2747" stroke-dasharray="4 7"/><circle cx="${xy[0]}" cy="${xy[1]}" r="19" fill="none" stroke="#e82748" stroke-width="2"/><circle cx="${xy[0]}" cy="${xy[1]}" r="11" fill="#06151d" stroke="#ff4c62"/><circle cx="${xy[0]}" cy="${xy[1]}" r="5" fill="#fff"/></g><g fill="none" stroke="#678394" stroke-width=".8">${ticks}</g><g class="ci-label"><text x="66" y="65">V = ${num(active?.v,1)} m/s</text><text x="66" y="88">h = ${num(active?.alt/1000,2)} km</text><text x="66" y="112">a = ${num(active?.loadG,2)} g₀</text><text x="750" y="52">FREYA / CONFIG ${inputs.count>3?'B':'A'}</text><text x="750" y="75">${r?.capsule.status==='discarded'?'CARRIER / DESCENT':'CAPSULE / FLIGHT'}</text><text x="750" y="98">h₀ ${num(inputs.orbitKm,0)} km</text><text x="610" y="295">125 km ENTRY INTERFACE</text><text x="370" y="450">MARS · R = 3389.5 km</text><text x="65" y="467">RADIAL ALTITUDE × EXAGGERATED / ALONG-TRACK FITTED</text></g></svg>`;
}
