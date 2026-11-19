import {impactEstimate} from './mission-telemetry.mjs';
// Independent lognormal inputs; current controls are medians, not fitted measurements.
export const DEPTH_UNCERTAINTY={method:'First-order propagation in log(depth), then exp(log(depth) ± 3 sigma_log_depth)',sigma:3,oneSigmaFactors:{bearingResistance:1.35,density:1.10,inertialCoefficient:1.25,mass:1.05,diameter:1.03},interpretation:'Approximate central 99.73% interval only under the assumed independent lognormal inputs and local log-linear response. Not measured scatter, a confidence interval, a worst-case bound or a validated Mars prediction.',scope:'Conditional on the x-axis downward speed, selected obliquity and Poncelet model. Trajectory, model discrepancy, layering, shape change, fracture and survival uncertainty are excluded. A zero inertial coefficient remains exactly zero.'};
export function depthUncertainty(speed,mass,material,options={}){
 const nominal=impactEstimate(speed,mass,material,options);
 if(nominal.depth===0)return {nominal:0,lower:0,upper:0,sigmaLogDepth:0};
 const u=nominal.inertialKgPerM*nominal.speed**2/nominal.resistanceN;
 const w=u<1e-8?1-u/2:u/((1+u)*Math.log1p(u));
 const f=DEPTH_UNCERTAINTY.oneSigmaFactors;
 // z=m/(2b) log(1+b v²/a); a=A R, b=0.5 rho Cd A.
 const sigmaLogDepth=Math.hypot(Math.log(f.mass),2*Math.log(f.diameter),w*Math.log(f.bearingResistance),(1-w)*Math.log(f.density),(1-w)*Math.log(f.inertialCoefficient));
 return {nominal:nominal.depth,lower:nominal.depth*Math.exp(-3*sigmaLogDepth),upper:nominal.depth*Math.exp(3*sigmaLogDepth),sigmaLogDepth};
}
export function depthUncertaintyExplanation(){return '<p><strong>Shading: assumed 3σ depth interval.</strong> Solid lines are nominal depths. Independent lognormal inputs use the current controls as medians. Assumed 1σ multiplicative factors: bearing resistance ×/÷1.35; material density ×/÷1.10; inertial coefficient ×/÷1.25; probe mass ×/÷1.05; effective diameter ×/÷1.03. These are analyst-selected screening allowances, not Spacek test statistics.</p><p>For z=m/(2b) ln(1+bv²/a), let u=bv²/a and w=u/[(1+u)ln(1+u)] (w=1 when b=0). Propagate independent log uncertainties: σ²(log z)=σ²(log m)+4σ²(log D)+w²σ²(log R)+(1−w)²[σ²(log ρ)+σ²(log Cd)]. Bounds=z exp(±3σ(log z)). The output is asymmetric in metres and remains positive; it is not arithmetic mean ±3 standard deviations. Approximate 99.73% coverage requires the lognormal and local linearization assumptions. Speed and obliquity are fixed at each plotted point; trajectory errors and model discrepancy are excluded. Bands extending beyond the selected probe length remain model extrapolations, not demonstrated burial. No penetration or survival qualification is implied.</p>';}
