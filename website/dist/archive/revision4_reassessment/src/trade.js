// FREYA Revision 4 reassessment, SI internally; engineering estimates, not qualified hardware.
export const DEFAULT_TRADE={scienceKg:1,scienceDensity:2,ancillaryL:.12,potFraction:.25,freeFraction:.10,potDensity:1.10,steelDensity:7850,wallMm:2.5,cableM:5,cableGm:10,contingency:.25,batteryKg:.45,usableWhKg:150};
export function design(diameterMm,wallMm,p={}){
 p={...DEFAULT_TRADE,...p};
 if(!(diameterMm>2*wallMm&&wallMm>0&&p.scienceDensity>0&&p.potFraction>=0&&p.freeFraction>=0&&p.potFraction+p.freeFraction<1&&p.contingency>=0))throw Error('Invalid geometry or allocation fractions');
 const D=diameterMm/1000,t=wallMm/1000,d=D-2*t,r=D/2,ri=d/2;
 const cavityL=(p.scienceKg/p.scienceDensity+p.ancillaryL)/(1-p.potFraction-p.freeFraction),L=cavityL/1000/(Math.PI*d*d/4);
 const tube=p.steelDensity*Math.PI/4*(D*D-d*d)*L;
 const nose=p.steelDensity*2*Math.PI/3*(r**3-ri**3);
 const cap=p.steelDensity*Math.PI*D*D/4*.005;
 const joints=.12,steel=tube+nose+cap+joints,pot=cavityL*p.potFraction*p.potDensity;
 const ledger=[['Science package',p.scienceKg,'Forebody','User assumption'],['Steel tube',tube,'Forebody','Calculated geometry'],['Steel hemispherical nose',nose,'Forebody','Calculated geometry'],['Steel rear cap 5 mm',cap,'Forebody','Calculated geometry'],['Steel joints and cage',joints,'Forebody','Engineering allowance'],['Potting',pot,'Forebody','Calculated fill volume'],['Battery',p.batteryKg,'Forebody','Short mission allowance'],['Heaters controller and memory',.12,'Forebody','Engineering allowance'],['Forebody harness and seals',.08,'Forebody','Engineering allowance'],['Sample acquisition hardware',.15,'Surface head','Unselected method allowance'],['Transceiver and mounting',.10,'Aftbody','Engineering allowance'],['Antenna radiator',.06,'Aftbody','Engineering allowance'],['Cable or tether',p.cableM*p.cableGm/1000,'Aftbody','Length times linear mass'],['Cable spool and strain relief',.06,'Aftbody','Engineering allowance'],['Surface aftbody structure',.20,'Aftbody','Engineering allowance'],['Drogue risers and separation',.25,'Aftbody','Unselected deployment allowance']];
 const nominal=ledger.reduce((s,x)=>s+x[1],0),margin=nominal*p.contingency,forebody=ledger.filter(x=>x[2]==='Forebody').reduce((s,x)=>s+x[1],0),aftbody=nominal-forebody;
 return {diameterMm,wallMm,innerMm:d*1000,cavityL,barrelMm:L*1000,lengthMm:(L+r+.005+.020)*1000,slenderness:(L+r+.025)/D,steel,pot,nominal,margin,total:nominal+margin,forebody,aftbody,area:Math.PI*D*D/4,sectional:forebody/(Math.PI*D*D/4),surface:Math.PI*D*L+2*Math.PI*r*r+Math.PI*r*r,ledger,energyWh:p.batteryKg*p.usableWhKg};
}
export function trade(p={}){return [[35,1.5],[50,1.5],[50,2],[60,2],[70,2.5],[80,3]].map(([d,t])=>design(d,t,p));}
export function thermal(depth,alpha=3.63e-8){if(depth<0||alpha<=0)throw Error('Invalid thermal inputs');const diurnal=Math.sqrt(alpha*88775/Math.PI),seasonal=Math.sqrt(alpha*59355072/Math.PI);return {diurnal,seasonal,dailyRemaining:Math.exp(-depth/diurnal),seasonalRemaining:Math.exp(-depth/seasonal)};}
export function power(mass=.45,specific=150,watts=1.5,hours=24,extraWh=5){const usable=mass*specific,need=watts*hours+extraWh;return {usable,need,batteryRequired:need/specific,runtime:Math.max(0,(usable-extraWh)/watts),closure:usable>=need};}
export function impact(mass,v,stop){if(mass<=0||v<0||stop<=0)throw Error('Invalid impact inputs');return {energy:.5*mass*v*v,avgG:v*v/(2*stop*9.80665),avgForce:mass*v*v/(2*stop),pulse:2*stop/Math.max(v,1e-10)};}
export function orbit(parent=450,altKm=250,periKm=0,isp=225,thrust=100){const mu=4.282837e13,R=3389500,ra=R+altKm*1000,rp=R+periKm*1000,a=(ra+rp)/2,vc=Math.sqrt(mu/ra),vb=Math.sqrt(mu*(2/ra-1/a)),dv=vc-vb,prop=parent*(1-Math.exp(-dv/(9.80665*isp))),burn=prop*9.80665*isp/thrust;return {dv,prop,burn,period:2*Math.PI*Math.sqrt(ra**3/mu)};}
export function twoKg(profile='standard',contingency=.25){
 // Preserve published 50 mm / 1.5 mm / 210 mm barrel and 345 cm3 practical cavity.
 // Practical cavity is specified independently; end/interface losses reduce ideal bore volume.
 const D=.050,d=.047,L=.210,r=.025,ri=.0235,rho=7850,lean=profile==='reduced';
 const joints=lean?.06:.12,steel=rho*(Math.PI/4*(D*D-d*d)*L+2*Math.PI/3*(r**3-ri**3)+Math.PI*D*D/4*.005)+joints;
 const ledger=[['Steel chassis',steel,'Forebody'],['Potting',.345*.25*1.10,'Forebody'],['Battery',lean?.15:.45,'Forebody'],['Heaters controller and memory',lean?.06:.12,'Forebody'],['Forebody harness and seals',lean?.04:.08,'Forebody'],['Sample acquisition hardware',lean?.05:.15,'Surface head'],['Transceiver and mounting',lean?.05:.10,'Aftbody'],['Antenna radiator',lean?.025:.06,'Aftbody'],['Cable or tether',lean?.02:.05,'Aftbody'],['Cable spool and strain relief',lean?.025:.06,'Aftbody'],['Surface aftbody structure',lean?.08:.20,'Aftbody'],['Drogue risers and separation',lean?.10:.25,'Aftbody']];
 const nonScience=ledger.reduce((s,x)=>s+x[1],0),rawMassAllowance=2/(1+contingency)-nonScience,ancillaryL=lean?.070:.120,volumeAllowance=Math.max(0,(.345*(1-.25-.10)-ancillaryL)*2),science=Math.max(0,Math.min(rawMassAllowance,volumeAllowance)),nominal=nonScience+science,forebody=ledger.filter(x=>x[2]==='Forebody').reduce((s,x)=>s+x[1],science),total=nominal*(1+contingency);
 return {profile,contingency,steel,nonScience,rawMassAllowance,volumeAllowance,science,nominal,total,forebody,aftbody:nominal-forebody,energyWh:(lean?.15:.45)*150,lengthMm:260,diameterMm:50,area:Math.PI*D*D/4,closure:rawMassAllowance>=0,ledger:[['Science package',science,'Forebody'],...ledger]};
}
