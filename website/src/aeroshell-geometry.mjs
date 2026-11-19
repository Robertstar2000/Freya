// NASA heritage is the forebody cone half-angle, measured from the axis.
export const AEROSHELL_HALF_ANGLE_DEG=70;
export const AEROSHELL_SIDE_DEG=90-AEROSHELL_HALF_ANGLE_DEG;
export const AEROSHELL_OPENING_RATIO=72/110;
export function forebodyRise(diameterM){
 if(!Number.isFinite(diameterM)||diameterM<=0)throw new RangeError('Aeroshell diameter must be positive');
 return diameterM/2*Math.tan(AEROSHELL_SIDE_DEG*Math.PI/180);
}
export function aeroshellHeight(diameterM){return .75*diameterM+forebodyRise(diameterM);}
export const INITIAL_AEROSHELL_HEIGHT_M=aeroshellHeight(.8);
