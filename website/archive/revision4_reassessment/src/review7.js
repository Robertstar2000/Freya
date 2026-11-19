import {design} from './trade.js';
export function entry(dv=61.55673249575966,mass=45,altKm=250,interfaceKm=125,isp=225){
 if(![dv,mass,altKm,interfaceKm,isp].every(Number.isFinite)||dv<0||mass<=0||altKm<=interfaceKm||interfaceKm<0||isp<=0)throw Error('Invalid entry inputs');
 const mu=4.282837e13,R=3389500,ra=R+altKm*1000,r=R+interfaceKm*1000,vc=Math.sqrt(mu/ra),vt=vc-dv;
 if(vt<=0)throw Error('Burn exceeds circular velocity');
 const energy=vt*vt/2-mu/ra,h=ra*vt,v2=2*(energy+mu/r),tangent=h/r,radial2=v2-tangent*tangent;
 if(radial2<0)throw Error('Orbit does not reach entry interface');
 return {dv,velocity:Math.sqrt(v2),angle:-Math.atan2(Math.sqrt(radial2),tangent)*180/Math.PI,propellant:mass*(-Math.expm1(-dv/(9.80665*isp)))};
}
export function structural(D=70,t=2.5,p={}){
 const x=design(D,t,p),r=D/2000,ri=x.innerMm/2000,L=x.barrelMm/1000,I=Math.PI/4*(r**4-ri**4),column=L+r;
 const critical=Math.PI**2*205e9*I/column**2,force=x.forebody*10000;
 const tube=x.ledger[1][1],collarL=.020,cfrp=1580*Math.PI*(r*r-ri*ri)*Math.max(0,L-collarL),collar=7850*Math.PI*(r*r-(r-2*t/1000)**2)*collarL;
 const hybridSteel=x.steel-tube,hybridStructure=hybridSteel+cfrp+collar,saved=x.steel-hybridStructure,hybridFore=x.forebody-saved;
 const soilResistance=Math.log(.5/r)/(2*Math.PI*.039*L),steelResistance=Math.log(r/ri)/(2*Math.PI*44.5*L),cfrpResistance=Math.log(r/ri)/(2*Math.PI*.8*L);
 return {...x,critical,averageMargin:critical/force,threeMargin:critical/(3*force),sideLoss:50/soilResistance,hybridStructure,saved,hybridFore,hybridBudget:(x.nominal-saved)*1.25,depthRatio:(hybridFore/x.forebody)**.7,steelQ:50/(soilResistance+steelResistance),hybridQ:50/(soilResistance+cfrpResistance),collarIntrusionL:Math.PI*(ri*ri-(r-2*t/1000)**2)*collarL*1000};
}
export function sampling(axial=.75,offset=.25,tilt=0,disturbed=0){if(![axial,offset,tilt,disturbed].every(Number.isFinite)||axial<0||offset<0||offset>axial||tilt<0||tilt>=90||disturbed<0)throw Error('Invalid sample geometry');const c=Math.cos(tilt*Math.PI/180);return {depth:(axial-offset)*c-disturbed,requiredAxial:offset+(.5+disturbed)/c};}
export function closure(count=6,probe=5.487671392003963,fraction=.326,limit=45){if(!Number.isInteger(count)||count<1||probe<=0||fraction<0||fraction>=1||limit<=0)throw Error('Invalid carrier inputs');const required=count*probe/(1-fraction);return {required,closes:required<=limit,maxFraction:1-count*probe/limit};}
export function link(rangeKm=1000,rate=8000,powerW=1){if(rangeKm<=0||rate<=0||powerW<=0)throw Error('Invalid link inputs');const frequency=401.6e6,c=299792458,loss=20*Math.log10(4*Math.PI*rangeKm*1000*frequency/c),received=10*Math.log10(powerW)-3+3-6-loss,n0=-228.6+10*Math.log10(806),ebn0=received-n0-10*Math.log10(rate);return {loss,ebn0,margin:ebn0-6};}
