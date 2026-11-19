// User-selected starting trade; archived Rev09 evidence retains its source baseline.
export const INITIAL_ORBIT_KM=400;
// Generic K-class impulse assumption (1,280 < I <= 2,560 N·s), not a selected motor.
export const INITIAL_NITROGEN_KG=.1;
// Ideal N₂ at 200 bar and 293 K; choose volume to hold the requested gas load.
export const INITIAL_FLIGHT_OPTIONS={AthrustN:100,AimpulseNs:2000,tankBar:200,tankKelvin:293,tankLitres:INITIAL_NITROGEN_KG*296.8*293/(200*1e5)*1000};
