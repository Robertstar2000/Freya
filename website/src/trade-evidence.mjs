// Each criterion is a signed margin against the user's approved limit or an evidence gate.
// Supply positive margins for passing evidence, negative margins for shortfalls.
export const CLOSURE_CRITERIA = {
  'TBD-00':['Original deck revision and checksum matched','Slide-by-slide phase reconciliation','Science selection and approval'],
  'TBD-01':['Mechanical and load envelope','Electrical envelope','Separation clearance','Command and interface acceptance'],
  'TBD-02':['Entry corridor','Attitude and angular-rate limits','CG and dynamic damping','Dispersed 6-DOF verification'],
  'TBD-03':['Structural loads and factors','Opening and shock loads','Dispersed release clearance','Representative separation or impact test'],
  'TBD-04':['Worst post-impact link margin','Relay compatibility and service','Delivery and recovery test','Measured antenna and receiver performance'],
  'TBD-05':['Accessible depth or recovered quantity','Impact survival','Representative material coverage','Independent sample provenance'],
  'TBD-06':['Leakage margin','Carryover and contamination margin','Channel isolation and recovery','Selected conditions and controls'],
  'TBD-07':['Derated energy and reserve','Peak current','Required duration and duty cycle','Measured load profile and heaters'],
  'TBD-08':['Measurement accuracy','Sample interval','Latency and freshness','Calibration and invalid-data handling'],
  'TBD-09':['Efficiency and response calibration','Detection and quantification limits','Blank/interferent rejection','Blind controls and replicates'],
  'TBD-10':['Impact and reset qualification','Committed records recovered','Interrupted-record loss allowance','Corruption distinguished from valid data'],
  'TBD-11':['Bulk and surface limits','Recession and bondline margin','Sample and detector thermal limits','Material and test qualification'],
  'TBD-12':['Certified impulse and uncertainty','Selected thrust curve and loads','Specific impulse and delivered delta-v','Accepted propulsion integration'],
  'TBD-13':['Proof/burst pressure envelope','Regulation and leakage margin','Temperature envelope','Usable gas after all three maneuvers'],
  'TBD-14':['Fault coverage','Timeout and safe state','Independent barriers','Hardware-in-the-loop outcomes'],
  'TBD-15':['Nose and shoulder drawing compliance','Backshell and cover fit','Manufacturing tolerance stack','Geometry and aerodynamic correlation'],
  'TBD-16':['TPS continuity','Structural and thrust load path','Mass and CG','Separation and extraction clearance'],
  'TBD-17':['Unique processor and event authority','Power ownership','State and time handover','Interface test evidence'],
  'TBD-18':['Altitude, velocity and pressure gates','Attitude and validity gates','Cadence and collision margins','Dispersed descent and deployment test'],
  'TBD-19':['Worst-case volume','Sustained write throughput','Packet overhead and blackout','Storage ownership and retention'],
  'TBD-20':['Drift and synchronization margin','Ordering uncertainty','Reset and rollover handling','Clock discontinuity test'],
};
export const REQUIREMENT_STUDIES = {
  'FR-MIS-001':'mission','FR-MIS-003':'mission','FR-MIS-004':'mass','FR-MIS-005':'TBD-05',
  'FR-MIS-006':'mission','FR-MIS-007':'TBD-17','FR-MIS-010':'energy','FR-MIS-011':'TBD-14',
  'FR-PRB-SW-001':'TBD-10','FR-PRB-SW-002':'TBD-14','FR-PRB-SW-003':'energy','FR-PRB-SW-004':'TBD-05',
  'FR-PRB-SW-005':'TBD-06','FR-PRB-SW-006':'TBD-09','FR-PRB-SW-007':'TBD-09','FR-PRB-SW-008':'TBD-10','FR-PRB-SW-009':'relay',
  'FR-REM-HW-002':'TBD-17','FR-REM-HW-009':'TBD-17','FR-REM-SW-001':'TBD-14','FR-REM-SW-005':'propulsion',
  'FR-REM-SW-006':'shield','FR-REM-SW-008':'gas','FR-REM-SW-009':'TBD-17',
  'FR-CAP-HW-004':'TBD-18','FR-CAP-SW-001':'TBD-17','FR-CAP-SW-002':'shield','FR-CAP-SW-003':'mission',
  'FR-CAP-SW-005':'TBD-18','FR-CAP-SW-006':'mission','FR-CAP-SW-007':'storage','FR-CAP-SW-009':'TBD-14',
  'FR-CAR-HW-002':'TBD-18','FR-CAR-HW-005':'storage','FR-CAR-HW-008':'TBD-17','FR-CAR-SW-001':'TBD-10',
  'FR-CAR-SW-004':'TBD-14','FR-CAR-SW-005':'TBD-10','FR-CAR-SW-006':'relay','FR-CAR-SW-007':'storage',
  'FR-SYS-001':'mass','FR-SYS-002':'mass','FR-SYS-009':'TBD-17','FR-SYS-010':'TBD-14',
  'FR-SYS-012':'TBD-10','FR-SYS-013':'TBD-14','FR-SYS-014':'mission','FR-BIO-008':'TBD-09',
};

export function requirementStudies(requirement) {
  return requirement.closure.length ? requirement.closure : [REQUIREMENT_STUDIES[requirement.id]];
}

export function compareEvidence(rows, criterionCount) {
  return rows.map(row=>{
    const complete=Boolean(row.name.trim() && row.reference.trim() && row.objective.trim() &&
      Number.isFinite(Number(row.objective)) && row.margins.length===criterionCount &&
      row.margins.every(value=>value.trim() && Number.isFinite(Number(value))));
    return {...row, complete, passes:complete && row.margins.every(value=>Number(value)>=0)};
  }).sort((a,b)=>Number(b.passes)-Number(a.passes) || Number(b.complete)-Number(a.complete) ||
    (a.passes && b.passes ? Number(a.objective)-Number(b.objective) : 0));
}

export function searchEvidence(rows, criterionCount, start, step, iterations) {
  if (!Number.isFinite(start) || !Number.isFinite(step) || step<=0 || !Number.isInteger(iterations) || iterations<1 || iterations>30)
    throw Error('Enter a finite start, positive step and 1–30 iterations.');
  const measured=compareEvidence(rows,criterionCount).filter(row=>row.coordinate?.trim() && Number.isFinite(Number(row.coordinate)));
  if (new Set(measured.map(row=>Number(row.coordinate))).size!==measured.length)
    throw Error('Use unique variable values for the sampled candidates in this sweep.');
  let current=measured.find(row=>Number(row.coordinate)===start && row.passes);
  if (!current) throw Error('The start must have a sampled candidate that passes every entered gate.');
  const baseline=current, history=[];
  for (let i=0;i<iterations;i++){
    const position=Number(current.coordinate);
    const next=measured.find(row=>row.passes && Math.abs(Number(row.coordinate)-position)>1e-9 &&
      Math.abs(Number(row.coordinate)-position)<=step+1e-9 && Number(row.objective)<Number(current.objective));
    if (!next) break;
    current=next;
    history.push(current);
  }
  return {baseline,current,history};
}
