from pathlib import Path
import json,html,csv,re
from docx import Document
from docx.shared import Pt
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,PageBreak
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
R=Path('.');B=json.loads((R/'data/requirements/default-baseline.json').read_text());req=[]
E=html.escape

def add(id,group,subsystem,text,accept,source,parents=None,block=None,applies='A and B',closure=None):
 req.append(dict(id=id,group=group,subsystem=subsystem,applies=applies,text=text,acceptance=accept,verification='Inspection + analysis + test' if 'software' not in subsystem.lower() else 'Review + software-in-the-loop + hardware-in-the-loop test',source=source,parentIds=parents or [],architectureBlock=block,status='Proposed requirement; verification open',closure=closure or sorted(set(re.findall(r'TBD-\d{2}',text+' '+accept)))))

mission=[
('Mission configurations','The mission shall support configuration A as one late-2028 precursor vehicle with three probes, and configuration B as two 2031 science vehicles with seven probes per vehicle.','Configuration inspection shall show 3 A probes or 14 B probes across two independent B vehicles; launch dates remain planning targets.'),
('Host and deployment','The mission shall define and verify a host upper-stage mechanical, electrical, deployment-envelope and release-command interface before flight integration.','Approved interface control document and host acceptance test; host-specific limits shall close TBD-01.'),
('Reference orbit','Mission trajectory planning shall use a 400 km circular Mars-orbit initial reference for both default configurations and explicitly record off-default orbit trades.','Default capture shall report 400 km; mission analysis shall replace the reference with a host-provided state and covariance before release.'),
('Wet mass','The mission shall close the wet-mass budget at or below 20 kg per A vehicle and 50 kg per B vehicle, counting propulsion, nitrogen, all retained vehicles and reserves once.','Weighed flight configuration plus approved uncertainty shall meet the configuration limit; current proportional budgets are allocations, not weigh-test evidence.'),
('Science delivery','The mission shall deliver independently operable probes and preserve sample location, acquisition depth, acquisition time and environmental provenance for each returned science record.','End-to-end deployment, acquisition and record-recovery test shall retain all required provenance fields for each functioning probe.'),
('Sequence','The mission shall execute separation, attitude acquisition, retroburn, heat-shield alignment, module jettison, passive entry, cover release, carrier extraction, probe release, science acquisition and data return in a gated sequence.','State-transition tests shall show the specified delivery order including pre-entry alignment and module release interlocks; no downstream event shall bypass its required gate.'),
('Independent operation','Each B vehicle and each released probe shall retain independent identity, mission state and failure reporting.','Fault injection into one vehicle or probe shall not falsify another vehicle or probe confirmation record.'),
('Entry readiness','The mission shall establish an entry corridor, accepted attitude/rate envelope and verified module separation before authorizing entry readiness.','Six-degree-of-freedom dispersed trajectory and separation analysis shall close TBD-02 and TBD-03; animation orientation is not evidence.'),
('Relay access','The mission shall obtain an approved orbiter relay service and RF interface before claiming a supported Earth-return path.','Relay-provider acceptance and end-to-end protocol test shall close TBD-04; a link-budget screen alone shall not constitute access approval.'),
('Science time','The mission shall budget 24 hours of probe operations for A and 72 hours for B as the current design goals.','Measured power and selected assay schedule shall demonstrate the applicable duration or trigger a controlled requirement change; the proposed 1–5-sol assay duration remains an unresolved conflict.'),
('Verification closure','The mission shall close all applicable flight requirements and departures before committing a vehicle to flight.','Verification matrix shall contain approved evidence and disposition for each applicable requirement; software model passes alone shall not close hardware verification.'),
('Presentation configuration','The mission shall record the exact pitch filename, revision, slide numbering and checksum used for requirements allocation.','Verify the presentation configuration record against the approved phase allocation and close TBD-00.')]
for i,(sub,text,acc) in enumerate(mission,1):add(f'FR-MIS-{i:03}', 'Mission',sub,text,acc,'Current defaults; Rev09 mission family; recorded pitch phase map',closure=['TBD-00'] if i==12 else [])

# Each of the 72 infographic blocks receives an allocated, verifiable requirement.
blocks={
'probe-hardware':[
('The probe sample-acquisition subsystem shall deliver a traceable sample to the selected chamber without equating nose penetration with accessible sample depth.','Measure recovered sample mass and intake depth after representative impacts; close TBD-05.'),
('The probe chamber and fluid subsystem shall isolate test, blank and control channels and contain the selected gases, liquids and reagents.','Leak, cross-contamination and recovery tests under the selected pressure/temperature envelope; close TBD-06.'),
('The probe power subsystem shall provide regulated rails and peak-current capability through impact, acquisition, incubation, extraction and data return.','Load-profile test shall include heater, valves, SiPM bias and RF peaks plus an approved data-return reserve; close TBD-07.'),
('The probe environment-sensing subsystem shall record sample and detector temperatures, chamber pressure and hydration history with validity flags.','Calibrated sensor tests shall retain measured values, time and validity at the approved sample rate; close TBD-08.'),
('The probe detector subsystem shall measure scintillation signals with calibrated background, live time, temperature and bias dependence.','Calibration shall establish efficiency, saturation, dead time and isotope-response behavior for the selected geometry; close TBD-09.'),
('The probe controller and storage subsystem shall retain raw science and health records across the specified impact, reset and power-interruption environments.','Impact and power-cycle tests shall recover committed records with identity, integrity checks and reset cause; close TBD-10.'),
('The probe shall include an independent drogue chute and a structural load path from canopy attachments to the impact-resistant probe body.','Opening-load, clearance and impact tests shall meet TBD-03; canopy reference diameter is 0.5 m, subject to qualification.'),
('The probe thermal enclosure shall maintain the sample and detector within separately specified operating limits throughout the selected experiment.','Transient thermal-vacuum and experiment tests shall demonstrate each limit including heater energy; close TBD-07 and TBD-11.'),
('The probe shall provide a self-contained antenna structure and RF feed that permit independent buffered science downlink after release and impact.','Post-impact RF tests in representative burial and antenna orientations shall demonstrate TBD-04; no connecting tether is allocated.')],
'probe-software':[
('Probe boot software shall record probe identity, firmware version, calibration identity, reset cause and a monotonic record-time origin.','Cold boot and reset tests shall populate each field and reject invalid configuration.'),
('Probe health software shall inhibit experiment actuation when configured energy, containment or required-sensor validity gates are unsatisfied.','Inject each invalid gate and verify actuation is inhibited and the reason logged.'),
('Probe power-management software shall schedule the selected assay within the measured energy budget while preserving the allocated data-return reserve.','Worst-case task-load tests shall produce a stop, pause or rejected schedule before the configured reserve is consumed.'),
('Probe registry software shall associate every sample, control and extracted fraction with source channel, acquisition time, mass and processing history.','Trace test shall recover the association for every generated record, including rejected samples.'),
('Probe assay software shall implement an explicit, reset-safe state machine for preparation, baseline, incubation, extraction and measurement.','Exercise valid transitions, illegal transitions, interruption and recovery without duplicate irreversible dosing.'),
('Probe acquisition software shall store raw counts or spectra together with sensor validity, live time, detector bias and detector temperature.','Known-signal tests shall recover raw data and acquisition metadata without treating invalid intervals as zero signal.'),
('Probe reduction software shall apply only identified calibration, blank and recovery corrections and retain their versions and uncertainties.','Reference datasets shall reproduce approved calculations; missing or ill-conditioned calibration shall result in qualified outputs, not an isotope estimate.'),
('Probe storage software shall maintain a checksum-protected, reset-safe science journal and preserve raw records when derived products change.','Interrupted-write and bit-corruption tests shall distinguish committed, incomplete and corrupt records.'),
('Probe communication software shall identify and sequence science packets, queue unsent records and distinguish transmission attempts from confirmed delivery.','Loss, duplicate and out-of-order packet tests shall recover identity and sequence without falsely confirming reception.')],
'retro-hardware':[
('The reentry module propulsion subsystem shall provide the configuration-specific retroburn with a thrust load path to the primary vehicle structure.','A reference is 100 N for 20 s and 2,000 N s at assumed Isp 225 s; B uses a 250 s Isp hybrid sizing model with 12.8 s burn. Selected motor curves and structural loads shall close TBD-12.'),
('The reentry module six-jet cold-gas subsystem shall retain separate gas allocations for upper-stage separation, retroburn alignment and heat-shield entry alignment.','Gas-accounting test shall show all three withdrawals, leakage and minimum-pressure reserve once, with no gas credited after jettison. Initial screening uses 0.1 N per jet, 0.25 m lever arm and 65 s Isp; qualify the selected jet geometry and performance under TBD-02 and TBD-13.'),
('The reentry module shall provide a pressure vessel, regulator and plumbing compatible with 0.100 kg initial nitrogen at the reference 200 bar and 293 K.','Pressure-system design and tests shall establish the operating and qualification envelopes under TBD-13; the ideal-gas storage volume is a reference, not a tank drawing.'),
('The reentry module attitude sensors shall supply a validity-qualified estimate of orientation and angular rate for each controlled maneuver.','Sensor and estimator tests under the accepted environment shall meet TBD-02; simulated perfect attitude is not evidence.'),
('The reentry module controller shall command propulsion and paired jets through independently inhibited actuator interfaces.','Hardware-in-the-loop tests shall demonstrate valid commands, inhibits, sensor fault responses and independent hardware ignition barriers.'),
('The reentry module power subsystem shall support propulsion control, sensing, actuators and handover through confirmed jettison.','Worst-case electrical load and disconnect testing shall maintain required functions until handover completes; close TBD-07.'),
('The reentry module mechanical interface shall release all mechanical and electrical connections without damaging the retained capsule or extraction path.','Dispersed separation analysis and representative release tests shall demonstrate positive clearance and disconnected harnesses; close TBD-03.'),
('The reentry module status interface shall transfer measured burn, attitude, gas and release information to the retained mission avionics before loss of connection.','Handover test shall recover records with validity and confirmation source; command issuance shall not substitute for measured confirmation.'),
('The reentry module structure and isolation subsystem shall transfer thrust loads while limiting plume, motor heat and contamination effects on the capsule and bioscience payload.','Structural, plume, thermal-soak and contamination analysis/test shall close TBD-03, TBD-06, TBD-11 and TBD-12.')],
'retro-software':[
('Reentry-module initialization software shall load the correct A/B configuration and validate sensor, actuator, clock and power readiness.','Wrong-configuration and invalid-sensor tests shall inhibit maneuver arming.'),
('Reentry-module separation software shall perform the upper-stage clearance maneuver and verify the configured release conditions.','Test the 0.2 m/s reference separation impulse and 20 m clearance assumption with independent sensing criteria under TBD-03.'),
('Reentry-module estimator software shall update and quality-flag attitude and rate estimates used by maneuver control.','Known-motion and sensor-failure tests shall show bounded estimate errors or rejected maneuver readiness under TBD-02.'),
('Reentry-module attitude software shall execute the retroburn-alignment maneuver within its accepted pointing and rate limits.','Evaluate the current 90-degree reference slew, saturation and gas demand in hardware-in-the-loop tests; close TBD-02.'),
('Reentry-module burn software shall authorize, time and monitor the burn only after valid attitude, time and hardware-enable gates.','Gate-failure and interrupted-burn tests shall show inhibited ignition or defined fault response; delivered impulse requires motor evidence.'),
('Reentry-module entry-alignment software shall orient the heat shield for entry before module release.','Evaluate the current 180-degree reference slew and completion evidence; a changed mount shall require re-derived signed attitudes and gas budgets.'),
('Reentry-module fault software shall distinguish sensor invalidity, actuator nonresponse, incomplete burn and incomplete release and execute approved responses.','Fault injection shall exercise each state without generating false completion bits; close TBD-14 for approved responses.'),
('Reentry-module resource software shall account for separation, retroburn alignment and entry alignment gas independently and flag a reserve deficit.','Reference-vector tests shall close nitrogen mass and pressure accounting including leakage and minimum regulator pressure.'),
('Reentry-module handover software shall commit confirmed mission state before jettison and remove authority over absent actuators after separation.','Disconnect tests shall preserve retained event history and reject post-jettison module actuator commands.')],
'capsule-hardware':[
('The capsule forebody shall use a 70-degree sphere-cone half-angle measured from the symmetry axis, equivalent to 20 degrees from the heat-shield plane.','CAD inspection shall verify the angle convention at a 0.8 m reference base diameter; nose/shoulder blend geometry and tolerances shall close TBD-15. The 0.745588 m total envelope is provisional packaging geometry.'),
('The capsule sensing subsystem shall provide validity-qualified entry acceleration and thermal records to the retained avionics.','Calibrated environmental sensor tests shall meet TBD-08 and preserve measurements through extraction handover.'),
('The capsule restraint subsystem shall retain the loaded carrier during launch, burn and entry until commanded extraction.','Structural and release tests shall demonstrate the approved load envelope and release margin under TBD-03.'),
('The capsule top-cover mechanism shall provide independent release inhibits and positive cover-clear evidence.','Latch, timeout, partial-release and obstructed-path tests shall prevent unconfirmed cover clearance from enabling extraction.'),
('The capsule mass distribution and aerodynamic configuration shall meet approved static and dynamic stability criteria over the complete entry envelope.','Obtain Mach/angle-dependent coefficients, damping, as-built CG/inertia and dispersed six-degree-of-freedom results; close TBD-02. The website 0.19D illustrative bound is not a flight CG limit.'),
('The capsule extraction-chute interface shall transfer opening loads and extract the loaded carrier through a demonstrated clear path.','Representative extraction tests shall verify opening loads, cover clearance and carrier separation under TBD-03.'),
('The capsule retro attachment shall connect to a verified structural load path and leave a qualified retained entry surface after module release.','Demonstrate structure, thermal continuity and separation for the selected mount; top-side bridge preference remains an unselected trade under TBD-16.'),
('The capsule power and event interface shall maintain event continuity across retro release and carrier extraction without duplicated avionics mass credit.','Interface test shall verify time, state and power continuity with execution ownership closed under TBD-17.'),
('The capsule discard configuration shall clear the extracted carrier and released probes without crediting further capsule control or telemetry.','Dispersed discard-clearance study and representative separation test shall close TBD-03.')],
'capsule-software':[
('Capsule handover software shall accept retro status only with source identity, validity, time continuity and module-detached evidence.','Test lost, corrupt and inconsistent handover records and verify readiness remains unconfirmed.'),
('Capsule monitoring software shall time-tag available acceleration and thermal measurements and their validity throughout entry.','Replay calibrated and failed-sensor data and verify records remain distinguishable from estimated values.'),
('Capsule phase-estimation software shall determine deployment readiness from approved physical sensor/state gates.','Replay dispersed trajectories and sensor faults; animation progress or compressed review time shall never trigger deployment.'),
('Capsule deployment software shall inhibit cover and extraction actuation outside the approved deployment envelope or without required readiness gates.','Boundary and fault tests shall exercise each gate and independent hardware barrier; close TBD-18.'),
('Capsule cover-release software shall command release, await measured clearance and execute an approved timeout response.','Partial-release and no-response tests shall not advance extraction state without required confirmation.'),
('Capsule extraction software shall command carrier extraction only after cover clearance and shall record carrier-separation confirmation.','Test nominal and failed extraction without conflicting actuation or false separation bits.'),
('Capsule diagnostic software shall preserve command, measurement, confirmation and fault histories for transfer to the retained carrier.','Disconnect and reset tests shall retain all committed upstream events and source identities.'),
('Capsule software allocation shall identify the processor, power source and authority for each entry and extraction function.','Architecture review shall close TBD-17; no dedicated capsule computer shall be assumed without an explicit mass/power allocation.'),
('Capsule end-of-service software shall mark capsule discard and cease credit for further capsule measurements or actuator availability.','Replay shall show carrier/probe independence after discard and no post-discard capsule telemetry claims.')],
'carrier-hardware':[
('The carrier frame shall accommodate three A probe bays or seven B probe bays with restraints and accessible release paths.','Fit and mass-property inspection plus load test shall meet TBD-03; reference retained dry masses are the derived A allocation and 8 kg for B.'),
('Each carrier probe-release mechanism shall have a defined actuation and positive release-sensing path.','Release tests shall distinguish commanded, partial, failed and completed drops and prevent adjacent probe contact.'),
('The carrier parachute and risers shall support extraction and descent of the loaded carrier in the approved envelope.','Opening-load and descent tests shall qualify the 1.5 m A / 2.0 m B reference canopy diameters or control a design change; close TBD-03.'),
('The carrier shall estimate release altitude and descent state with validity sufficient for the selected release sequence.','Sensor and estimator tests shall demonstrate TBD-08 and TBD-18; the 5 km release reference shall not imply a qualified threshold.'),
('The carrier avionics shall retain upstream event history and independently latched probe-drop confirmations through descent and reset.','Reset and interrupted-write tests shall preserve committed confirmations without clearing cumulative history.'),
('The carrier radio and antenna subsystem shall transmit identifiable cumulative mission status independently of probe science transmissions.','RF and framing tests shall verify source identity, status mapping and TBD-04 relay compatibility.'),
('The carrier power subsystem shall supply descent, release actuation, recording and repeated status transmissions with reserve.','Measured load-profile test shall close TBD-07; probe battery allocations shall not be substituted for carrier energy.'),
('The carrier harness and separation interfaces shall disconnect safely from the capsule and each released probe while preserving required state.','Representative disconnect tests shall demonstrate no retained hazardous connections and correct post-release power/data ownership.'),
('The carrier terminal-state hardware shall support the approved end-of-descent behavior without assuming impact survival.','Ground/contact and terminal-load analysis shall close TBD-03 and TBD-14; simulation ground arrival alone shall not close hardware survival.')],
'carrier-software':[
('Carrier initialization software shall restore transferred mission history, configuration and vehicle identity before independent descent.','Handover and reset tests shall recover valid state and reject invalid or mismatched configuration.'),
('Carrier descent software shall estimate altitude and release readiness with explicit sensor validity.','Dispersed descent and invalid-sensor tests shall inhibit drops outside the approved envelope under TBD-18.'),
('Carrier release scheduling software shall release probes in the approved order and separation cadence.','Evaluate the default 5 km release altitude and 2 s cadence with collision/dispersion testing; close TBD-03 and TBD-18.'),
('Carrier actuation software shall command each selected probe bay and await measured release or execute the approved fault response.','Stuck, partial and duplicate-command tests shall not create a false drop confirmation.'),
('Carrier event software shall latch the core mission confirmations and each applicable probe-drop event without clearing prior confirmations.','Packet mapping tests shall reproduce 9 A core bits and the 13-position B map while marking unused A positions not applicable.'),
('Carrier telemetry software shall frame the cumulative status with identity, time, integrity and sequence information.','Decode reference packets and corrupted packets; payload bits shall be distinguished from packet overhead.'),
('Carrier resource software shall schedule release and repeated status transmissions within the carrier energy and storage budget.','Worst-case queue and energy tests shall preserve safety-critical records and configured reserve.'),
('Carrier fault-management software shall retain diagnostic evidence for failed release, sensor invalidity, memory faults and lost communications.','Fault injection shall demonstrate approved transitions under TBD-14 without inventing completed mission events.'),
('Carrier terminal-state software shall stop or safe actuators according to the approved ground/contact or end-of-service criteria.','Test ground/contact, timeout and sensor-fault cases with no uncommanded late releases; close TBD-14.')]
}
# Align every allocated requirement with the exact infographic block ordering.
retro=blocks['retro-hardware']
blocks['retro-hardware']=[retro[3],retro[4],retro[0],retro[2],retro[1],('The reentry module shall provide independent ignition and jettison inhibits with release-state sensing.','Hardware barrier and fault-injection tests shall prevent premature ignition or jettison and close TBD-14.'),retro[5],(retro[6][0],retro[6][1]+' Verify thrust load transfer, motor heat isolation and plume/contamination clearance under TBD-11 and TBD-12.'),retro[7]]
blocks['retro-software'][2]=('Reentry-module navigation and planning software shall estimate the vehicle state and identify an approved retroburn opportunity from mission navigation and target data.','Known-state and invalid-navigation tests shall distinguish a valid target opportunity from the website nearest-candidate screen; attitude/target tolerances and flight navigation authority shall close TBD-02.')
blocks['carrier-hardware'][8]=('The carrier probe interfaces shall permit each released probe to continue power, sensing, science control, storage and communications independently.','Representative release/disconnect tests shall verify no required carrier power or command dependence after release; probe impact survival remains separate under TBD-03.')
car=blocks['carrier-software']
blocks['carrier-software'][3]=car[4]
blocks['carrier-software'][4]=('Carrier confirmation software shall retain time-tagged command, sensed-drop and fault evidence for each probe bay.','Reset, stuck-actuator and duplicate-command tests shall preserve prior confirmations and distinguish failed or unknown release from a measured drop.')
blocks['carrier-software'][7]=('Carrier contact-policy software shall buffer status through relay blackout and retry only within the approved access and energy policy.','Loss-of-contact, restored-contact and low-energy tests shall preserve queued records without claiming reception; close TBD-04 and TBD-07.')
blocks['carrier-software'][8]=('Carrier surface-status software shall manage repeated status reporting and actuator safing if the carrier remains operational after descent.','Ground/contact, timeout and energy-depletion tests shall verify the approved terminal policy under TBD-14; neither carrier survival nor surface RF coverage is assumed.')

for diagram in B['architecture']:
 group=diagram['vehicle'];group='Reentry module' if group=='Retro module' or diagram['id'].startswith('retro-') else group
 code={'Probe':'PRB','Capsule':'CAP','Carrier':'CAR','Reentry module':'REM'}[group]
 for i,(text,acc) in enumerate(blocks[diagram['id']],1):
  block=next(x for x in B['blocks'] if x['diagram']==diagram['id'] and x['index']==i)
  kind='SW' if diagram['kind']=='Software' else 'HW'
  add(f'FR-{code}-{kind}-{i:03}',group,diagram['kind']+' / '+block['title'],text,acc,'Architecture '+block['id']+'; '+', '.join(block['sourceRequirementIds']),['FR-MIS-006'],block['id'])

system=[
('Mass ledger','The system mass ledger shall distinguish wet mass, consumed propellant, gas withdrawals, jettisoned mass and retained entry mass at each mission boundary.','Mass-conservation review and test vectors shall balance each boundary without duplicated propulsion or carrier mass.'),
('Mass allocation','The A mass ledger shall derive probe and carrier allocations from the current propulsion replacement and proportional non-propulsion scaling formula.','At default settings verify 0.906414 kg motor propellant, 0.100 kg nitrogen, 1.5 kg assumed motor/module dry mass, 1.999267 kg per probe and 2.998900 kg retained carrier dry allocation.'),
('RF baseline','The reference link budget shall explicitly identify the 400 MHz, 400 km, 10 W RF, 0 dBi transmitter gain, 6 dBi receiver gain, 6 dB losses and −120 dBm receiver-threshold assumptions.','Reproduce link calculations in SI/dB units; antenna deployment and orbiter access require independent evidence under TBD-04.'),
('Energy baseline','The probe power budget shall distinguish the 20 Wh usable-energy assumption, 0.2 W average-load assumption and 1 s transmission burst per 60 s from validated science load measurements.','Measured experiment and communication profile shall close TBD-07; a mean-load arithmetic endurance estimate shall not establish assay readiness.'),
('Memory allocation','The carrier data architecture shall allocate the reference 64 MB A and 256 MB B buffers explicitly to packet and science storage owners.','Worst-case data-volume and write-rate test shall close TBD-19; source buffer values are not automatically installed probe memory.'),
('Thermal protection','The capsule TPS design shall meet selected material, bondline and residual-thickness criteria under a dispersed heating/pressure history through the relevant exposure and soak interval.','Material-response/ablation analysis and arc-jet testing shall close TBD-11; the 15 mm flight-model input and 60 mm illustrative sweep result shall not constitute a released thickness.'),
('Penetration evidence','The penetration design shall distinguish predicted nose depth, accessible sample depth and post-impact instrument operation.','Instrumented material tests correlated to a site/material envelope shall close TBD-05; uncalibrated Poncelet results and three-sigma shading shall not be treated as measured scatter.'),
('Interface ownership','Each mechanical, power, data and command boundary among reentry module, capsule, carrier and probe shall have one accountable owner and an interface control record.','For every architecture edge, identify units, connector/release state, time origin, ownership and fault behavior; close TBD-17.'),
('Software configuration','Flight software shall use versioned configuration and calibration records with range checks and explicit A/B applicability.','Invalid, stale or cross-configuration records shall be rejected or safely qualified; test each irreversible-actuation gate.'),
('Command versus evidence','Flight software shall represent commanded, measured, estimated, inferred, unknown and failed states distinctly.','Fault tests shall never turn a transmitted command or animation event into measured release, burn or science confirmation.'),
('Time and reset','Flight software shall maintain consistent event time and reset provenance across all retained vehicle handovers.','Clock discontinuity, rollover and reset tests shall preserve event ordering or mark uncertainty under TBD-20.'),
('Data integrity','Mission data products shall preserve raw values, units, source vehicle, configuration, time, calibration version and quality flags.','End-to-end known-record tests shall verify transport integrity and prevent silent replacement of missing measurements with zero.'),
('Software assurance','Flight software releases shall have reviewed requirements traceability, unit/integration testing, hardware-in-the-loop testing and controlled release records.','Every implemented safety or science-critical requirement shall link to its test and software build; unresolved anomalies require disposition.'),
('Simulation provenance','Engineering analyses shall record inputs, units, source revision, solver version, assumptions and validity limits for each output.','Reproduce the default website cases and exports from the source fingerprint; model comparisons shall distinguish numerical agreement from physical validation.'),
('Fault closure','The integrated system shall define safe/abort responses to failed separation, incomplete burn, missed deployment gates, power deficit and data corruption.','An approved fault tree and hardware-in-the-loop campaign shall close TBD-14; timeout duration and fallback behavior shall not be improvised at flight time.')]
for i,(sub,text,acc) in enumerate(system,1):add(f'FR-SYS-{i:03}','System assurance',sub,text,acc,'Website defaults, calculation model and architecture interfaces',['FR-MIS-011'])

bio=[
('Selected experiment','The science design shall select an explicitly identified experiment suite and preserve unselected pitch science categories as alternatives.','Reconcile the selected gas/trap, destructive or in-situ method to the original pitch slides 3–4 and close TBD-00 and TBD-06.'),
('Controls','The selected assay shall include time-zero, reagent/no-soil, matrix, killed and recovery controls capable of distinguishing specified abiotic alternatives.','Blinded terrestrial and simulant campaigns shall quantify false detections and recovery under TBD-09; retained radiolabel alone shall not constitute life detection.'),
('Water state','The experiment shall record temperature, pressure, salinity/hydration history and relevant water-activity conditions.','Demonstrate the accepted condition envelope under TBD-06 and TBD-08; no universal Martian water-activity threshold is assumed.'),
('Tracer accounting','The radiotracer experiment shall account for initial and recovered isotope activity in gas, liquid, solid and loss fractions.','Calibrated recovery and isotope-exchange controls shall close TBD-09; unlabeled nutrients and exchangeable tritium shall be identified.'),
('Isotope discrimination','Any tritium/carbon-14 separation claim shall use a calibrated, identifiable response matrix and propagate its uncertainty.','Mixed-isotope and matrix tests shall demonstrate efficiency and cross-talk limits under TBD-09; photon-burst size alone is not sufficient.'),
('Detection limits','The science measurement plan shall predeclare blank thresholds, detection/quantification limits, replicate counts and false-positive/false-negative decision criteria.','Blind controls and spiked samples shall meet TBD-09 before a detection-performance claim.'),
('Energy-duration closure','The selected science workflow shall reconcile incubation duration, detector/valve/heater loads and data-return reserve to its vehicle resource budgets.','A 1–5-sol concept shall not be credited within a 24-hour A goal without a revised tested schedule or changed allocation; close TBD-07.'),
('Interpretation','The probe shall return measurements and qualified analysis products rather than an unqualified autonomous life/no-life verdict.','Review packet schema and classification logic; negative measurements shall retain environmental and sensitivity limitations.'),
('Containment and contamination','The payload shall define containment, cleanliness and carryover limits for all selected reagents and sample-contacting materials.','Contamination budget, compatibility and cross-channel tests shall close TBD-06 before experiment integration.'),
('Alternative chemistry','Any oxidant-screen experiment shall identify the product/selectivity controls needed to distinguish molecular oxygen, peroxide and superoxide interpretations.','Interferent and positive/negative-control tests shall close TBD-09; a nonspecific color or fluorescence change shall not uniquely identify a species.')]
for i,(sub,text,acc) in enumerate(bio,1):add(f'FR-BIO-{i:03}','Science payload',sub,text,acc,'Benner supplied outline 2026-11-12; scientific review; recorded pitch slides 3–4',['FR-MIS-005'])

# Consolidate supported pitch details into the governing main-body requirements.
# The appendix retains source wording, provenance and reconciliation decisions.
merged={
'FR-MIS-002':('The mission shall define and verify a host upper-stage mechanical, electrical, deployment-envelope and release-command interface before flight integration. Host selection shall remain provisional until interface and delivery agreements are approved.','Approved interface control document and host acceptance test shall close TBD-01; the host agreement shall identify the selected interface and delivery conditions.'),
'FR-PRB-HW-001':('The probe sample-acquisition subsystem shall deliver a traceable sample to the selected experiment chamber and distinguish nose penetration, accessible source depth, recovered volume and recovered mass. If the sealed gas/trap option is selected, the design shall demonstrate the proposed 2–5 cm accessible source zone and 0.25 cubic centimetres per vessel; if the extraction option is selected, it shall demonstrate approximately 1 g recovered soil with an approved tolerance.','Measure source depth, volume, mass and recovery after representative impacts for the selected option; close TBD-05 and TBD-06. Do not equate nose depth with accessible source depth or convert volume to mass without measured density.'),
'FR-PRB-HW-009':('The probe shall provide a self-contained antenna structure and RF feed that permit independent buffered science downlink after release and impact. The antenna and drogue shall be independent, with no connecting tether.','Post-impact RF tests in representative burial, canopy and antenna orientations shall demonstrate TBD-04 without relying on an unselected shroud-supported antenna geometry.'),
'FR-BIO-001':('The science design shall select and configuration-control its experiment suite before assay integration. The sealed gas/trap assay and incubation/extraction assay shall remain separate alternatives with independently defined conditions.','Record the selected workflow, sample quantity, channels, fluids, controls and detector method under TBD-00 and TBD-06.'),
'FR-BIO-003':('The selected experiment shall measure and record temperature, pressure, hydration history and relevant water-activity conditions. If the sealed gas/trap option is selected, the controlled reference procedure shall specify no added water, sealed and dark incubation at -10 to 0 degrees C for 1–5 sols. If the incubation/extraction option is selected, it shall specify near-Mars-ambient pressure and proposed 0–5 degrees C incubation, with fluid additions identified by process step.','Validate the selected condition envelope, tolerance and sensor capability under TBD-06 and TBD-08. Qualification shall document the selected condition envelope and method-specific limits.'),
'FR-BIO-007':('The selected science workflow shall reconcile sample handling, incubation duration, detector, valve and heater loads and data-return reserve to the vehicle resource budget before selection. A 1–5-sol gas/trap procedure shall not be credited within the 24-hour A or 72-hour B operation goals unless an approved revised procedure or resource allocation demonstrates closure.','Test the selected end-to-end schedule and measured energy profile under TBD-07; record any changed incubation endpoint and its scientific validity. Do not substitute compressed playback duration for physical assay duration.'),
'FR-SYS-014':('Engineering analyses shall record inputs, units, source revision, solver version, assumptions and validity limits for each output. Mission software and verification shall use physical time and approved event gates rather than animation or compressed presentation-event durations.','Reproduce website defaults and exports from the source fingerprint; test time/event mappings and distinguish numerical agreement, illustrative playback and physical validation.')
}
for q in req:
 if q['id'] in merged:
  q['text'],q['acceptance']=merged[q['id']]
  q['source']+='; see Appendix A for the phase and science-workflow allocation'
  q['closure']=sorted(set(re.findall(r'TBD-\d{2}',q['text']+' '+q['acceptance'])))

closures=[
('TBD-00','Presentation configuration and selected science suite','Project / science lead','Approve the configuration manifest, slide-to-requirement allocation and selected science workflow.'),
('TBD-01','Host interface envelope','Mission interfaces','Approved ICD, loads, deployment envelope, electrical and commanding limits.'),
('TBD-02','Entry attitude, CG and dynamic stability','GNC / aerodynamics','Mach-dependent coefficients, damping, CG/inertia tolerances, pointing/rate/corridor limits and dispersed 6-DOF validation.'),
('TBD-03','Structural, opening, impact and separation loads','Structures / mechanisms','Approved loads, factors, clearances, separation dispersion and shock environments.'),
('TBD-04','RF / orbiter service','Communications','Approved relay compatibility, antenna pattern, coding, packet service, access and measured receiver performance.'),
('TBD-05','Sampling and penetration','Probe / science','Site/material envelope, accessible sample depth/mass and validated impact acquisition/survival.'),
('TBD-06','Selected assay and containment','Science / fluidics','Chosen channels, reagents, pressure/temperature envelope, leakage/carryover and contamination limits.'),
('TBD-07','Energy and operating duration','Power / science','Measured peak/average profiles, battery derating, heater budget and data-return reserve for each vehicle.'),
('TBD-08','Sensors','Avionics','Accuracy, rate, calibration, latency and validity criteria for each sensing function.'),
('TBD-09','Detector and scientific decision limits','Science instrumentation','Efficiency, response matrix, blanks, LOD/LOQ, replicates, interferents and false-detection criteria.'),
('TBD-10','Impact/reset data retention','Probe avionics','Qualified impact spectrum, memory integrity and permitted interrupted-record loss.'),
('TBD-11','Thermal design','TPS / thermal / science','Selected materials, ablation/recession, bondline/sample/detector limits, soak and test qualification.'),
('TBD-12','Selected retro propulsion','Propulsion','Motor/engine identity, certified thrust curve, total impulse, Isp and uncertainty; current values are assumptions.'),
('TBD-13','Pressure system','Propulsion / pressure systems','Pressure, temperature, proof/burst, regulator, leakage and usable-gas envelope.'),
('TBD-14','Fault response','Systems / software','Approved inhibit/abort/safe-state paths and timeout values for each failure.'),
('TBD-15','Released geometry','Mechanical / aerodynamics','Nose radius, shoulder blend, backshell/cover envelope and manufacturing tolerances.'),
('TBD-16','Retro mounting selection','Structures / TPS / GNC','Top bridge versus heat-shield mount selected by closed loads, TPS continuity, clearance and mass trades.'),
('TBD-17','Function and interface ownership','Systems avionics','Processor, power and event authority at every handover and architecture edge.'),
('TBD-18','Deployment envelope','EDL / GNC','Approved altitude/speed/pressure/attitude gates, cadence, descent dispersions and collision margins.'),
('TBD-19','Data capacity','Data handling','Measured volumes/rates, packet overhead, storage ownership and retention priorities.'),
('TBD-20','Time system','Avionics / software','Clock accuracy, synchronization, reset behavior and allowable ordering uncertainty.')]
sourceIds={x['id'] for x in B['sourceRequirements']}
# Complete source-preservation ledger; do not relabel old review marks as current qualification.
sourceMap=[]
for s in B['sourceRequirements']:
 linked=[q['id'] for q in req if s['id'] in q['source']]
 if not linked:
  families={'MIS':['Mission'],'STR':['Capsule','Carrier'],'GNC':['Reentry module'],'EDL':['Capsule','Carrier'],'PCM':['Carrier'],'PRB':['Probe'],'COM':['System assurance'],'SYS':['System assurance'],'DER':['System assurance']}
  linked=[q['id'] for q in req if q['group'] in families.get(s['id'].split('-')[0],['System assurance'])]
 change='Retained source; reallocated by current requirements. Exact text and old evidence remain archived; no automatic qualification transfer.'
 if s['id']=='MIS-001':change='Updated A mass treatment: source says three 2.00 kg probes; current design allocation derives 1.999266924 kg per probe. Flight mass remains to be measured.'
 if '300 km' in s['text']:change='Current reference orbit is 400 km; source 300 km statement is historical.'
 sourceMap.append(dict(sourceId=s['id'],sourceText=s['text'],currentRequirementIds=linked,disposition=change))
conflicts=[
('Orbit','Archived 300 km initial orbit becomes current 400 km reference.','FR-MIS-003'),
('Precursor impulse','Archived 1,280 N s baseline becomes current 2,000 N s A assumption.','FR-REM-HW-003'),
('Probe mass','Source A 2.00 kg becomes 1.999266924 kg derived allocation; B retains 2.00 kg source input.','FR-SYS-002'),
('Geometry','70 degrees means NASA forebody half-angle from the axis; 0.745588 m envelope is a packaging assumption, not NASA dimensions.','FR-CAP-HW-001'),
('Retro mount','Website preference for top structural bridge does not select it; current illustration remains bottom-mounted.','TBD-16'),
('CG','0.19D maximum is an illustrative static screen; no approved safe CG or dynamic damping envelope.','TBD-02'),
('TPS thickness','15 mm is a live model assumption; 60 mm is first sampled candidate under illustrative 1.5x heating/300 s soak/temperature limits, not a flight requirement.','TBD-11'),
('Science duration','1–5-sol gas/trap incubation is not closed against A 24-hour and B 72-hour goals.','FR-BIO-007'),
('Probe architecture','Independent drogue and antenna structure; no connecting tether allocated.','FR-PRB-HW-007'),
('Software','Eight diagrams describe functional allocation; no flight firmware or dedicated capsule processor selected.','TBD-17')]
D=dict(revision=B['revision'],date=B['date'],status='Working requirements draft; verification open',scope='Mission, capsule, probe, carrier, reentry module, their hardware subsystems, software, interfaces and science functions',authority='Working design requirements based on current website defaults and user instructions; no formal approval inferred. Original 91 source requirements remain archived. Current allocation governs this draft where differences are listed.',baseline='data/requirements/default-baseline.json',requirements=req,closures=[dict(id=a,title=b,proposedOwner=c,closureEvidence=d,status='Open') for a,b,c,d in closures],conflicts=[dict(topic=a,disposition=b,reference=c) for a,b,c in conflicts],sourceCrosswalk=sourceMap,edition='Consolidated main body with retained appendices')
phaseAllocations={
'rideshare':['FR-MIS-002','FR-REM-SW-001','FR-REM-SW-002'],
'orient':['FR-REM-HW-001','FR-REM-SW-003','FR-REM-SW-004'],
'deorbit':['FR-REM-HW-003','FR-REM-SW-005','FR-REM-SW-006','FR-REM-SW-009'],
'entry':['FR-CAP-HW-001','FR-CAP-HW-005','FR-CAP-SW-001','FR-CAP-SW-002','FR-SYS-006'],
'extraction':['FR-CAP-HW-004','FR-CAP-HW-006','FR-CAP-SW-004','FR-CAP-SW-005','FR-CAP-SW-006'],
'release':['FR-CAR-HW-002','FR-CAR-SW-002','FR-CAR-SW-003','FR-CAR-SW-005','FR-PRB-HW-007'],
'delivery':['FR-PRB-HW-001','FR-PRB-HW-006','FR-PRB-HW-009','FR-SYS-007'],
'science':['FR-MIS-005','FR-PRB-SW-004','FR-PRB-SW-005','FR-BIO-001','FR-BIO-002','FR-BIO-007'],
'return':['FR-MIS-009','FR-PRB-SW-008','FR-PRB-SW-009','FR-CAR-SW-006','FR-CAR-SW-008','FR-SYS-012']}
pitchNotes=[
'Recorded slide 4 gas/trap option: 0.25 cubic centimetres per vessel, proposed 2–5 cm source depth, no added water, sealed/dark incubation at -10 to 0 degrees C for 1–5 sols. These are option parameters, not the selected flight assay.',
'Recorded slide 3 extraction option: approximately 1 g soil, near-Mars-ambient pressure and proposed 0–5 degrees C incubation, followed by flushing/extraction and scintillation/SiPM readout. It is not interchangeable with the slide 4 workflow.',
'The 0.25 cubic centimetre sample cannot be converted to 1 g without a measured density. Accessible 2–5 cm sampling depth is an acquisition target, not the predicted probe nose depth.',
'The supplied Benner outline is a separate attributed science source. Its extraction alternatives, added fluids and detector controls must be traded explicitly against the sealed no-added-water option. Do not merge incompatible conditions into one untested procedure.',
'The recorded delivery phase describes an antenna integrated with retained parachute shrouds. Later user direction specifies an independent antenna structure and drogue with no connecting tether. The current requirement is FR-PRB-HW-009; shroud support is not assumed.',
'The recorded pitch names a proposed Terran R rideshare. Host selection, trajectory delivery, separation interface and launch agreement are not confirmed; FR-MIS-002 and TBD-01 control the interface.',
'The old phase-map scope says Rev09 mass and geometry unchanged. Current user-approved direction supersedes that extraction scope for the 400 km orbit, 2,000 N s A impulse and NASA-angle convention; current values come from the executable default snapshot.',
'Playback event durations are compressed review intervals, not physical maneuver, assay or communication durations. Physical limits and time budgets derive from the flight model and measured hardware requirements.'
]
D['pitchReconciliation']={'source':B['presentation']['sourceFile'],'sourceSlideCount':B['presentation']['slideCount'],'scope':'Delivery phase and science-option allocation','phaseTrace':[dict(id=x['id'],title=x['title'],source=x['source'],recordedDescription=x['description'],currentRequirementIds=phaseAllocations[x['id']]) for x in B['presentation']['phases']],'scienceAlternatives':B['presentation']['scienceProtocols'],'differencesAndLimits':pitchNotes}

A=B['configurations']['A'];C=B['configurations']['B'];baseRows=[
('Mission vehicles / probes per vehicle','1 / 3','2 / 7','Current configuration'),('Vehicle wet-mass ceiling','20 kg','50 kg','Design allocation'),('Initial circular orbit','400 km','400 km','Current initial reference'),('Vacuum periapsis proxy','50 km','50 km','Screening assumption, not entry corridor'),('Aeroshell base diameter','0.800 m','0.800 m','Reference geometry'),('Forebody cone half-angle','70 degrees from axis','70 degrees from axis','User-selected NASA convention'),('Provisional total envelope',f"{A['mission']['heightM']:.6f} m",f"{C['mission']['heightM']:.6f} m",'0.75D backshell + (D/2)tan20; CAD open'),('Complete probe allocation',f"{A['mission']['probeKg']:.9f} kg",'2.000000000 kg','A derived; B source assumption'),('Carrier retained dry mass',f"{A['flight']['carrierDryA']:.9f} kg",'8.000 kg','A derived; B flight-model assumption'),('Carrier canopy / probe canopy','1.5 / 0.5 m','2.0 / 0.5 m','Opening and descent qualification open'),('Operation goal','24 h','72 h','Science/power closure open'),('Initial nitrogen','0.100 kg','0.100 kg','Ideal-gas reference: 200 bar, 293 K'),('Three gas maneuvers','0.2 m/s separation; 90 / 180 degree slews','Same reference sequence','Angles/inertia require GNC validation'),('Retro thrust / duration','100 N / 20 s','Sized thrust / 12.8 s','Motor or engine not selected'),('Retro impulse / Isp','2,000 N s / 225 s','Sized impulse / 250 s','Generic propulsion assumptions'),('Entry interface / extraction','125 km / 10 km','125 km / 10 km','Model boundary and editable gate'),('Probe release / cadence','5 km / 2 s','5 km / 2 s','Unqualified deployment reference'),('TPS model thickness / material','15 mm; generic constants','15 mm; generic constants','rho 250 kg/m3, Cp 1200 J/(kg K), k 0.15 W/(m K)'),('UHF / range / peak RF','400 MHz / 400 km / 10 W','Same','Receiver -120 dBm assumption; access open'),('Probe usable energy / mean load','20 Wh / 0.2 W','Same','Assumptions; heaters/assay not closed'),('Transmit duty / source buffer','1 s per 60 s / 64 MB','1 s per 60 s / 256 MB','Storage ownership and overhead open')]
abstract = (
 'FREYA is a Mars surface-science mission that delivers independent penetrator probes from orbit. '
 'The late-2028 precursor concept uses one 20 kg vehicle with three probes. The 2031 concept uses two '
 '50 kg vehicles with seven probes each. From a 400 km circular reference orbit, each retro module separates '
 'from the host, targets and executes a deorbit maneuver, aligns the heat shield, and jettisons before entry. '
 'The capsule protects the carrier during passive entry. The carrier is extracted under parachute, releases '
 'probes one at a time, and reports deployment status independently. Each probe descends under its own drogue, '
 'acquires a traceable sample after impact, and queues science and health records for relay through a Mars orbiter. '
 'The science package evaluates candidate assays and controls for interpretable measurements in the Martian near-surface environment.'
)
elements = [
 ('Aeroshell', 'The aeroshell is the entry capsule assembly of forebody heat shield, backshell, restraints and top cover. '
  'It supports passive drag deceleration and protects the stowed carrier until extraction. The reference is a 0.800 m diameter '
  'sphere-cone with a 70° half-angle. The shell and cover are discarded as the carrier begins independent descent.'),
 ('Retro module', 'The detachable reentry module contains retro propulsion, nitrogen attitude and separation jets, '
  'guidance, power and release hardware. It performs the retroburn and establishes heat-shield-forward attitude before '
  'transferring state to the retained avionics and separating before the 125 km reference entry interface.'),
 ('Carrier', 'The carrier holds the probe bays, sequencing hardware, parachute, avionics, and independent power and status radio. '
  'It is extracted at a 10 km reference altitude, then releases probes sequentially beginning at a 5 km reference and a 2 s '
  'nominal cadence. The reference canopies are 1.5 m on A and 2.0 m on B.'),
 ('Probe', 'Each approximately 2 kg probe has a 0.50 m drogue, impact-resistant body, sample intake, science chamber, '
  'sensors, storage, and separate antenna and battery. It records sampling location, time, depth and environmental conditions, '
  'and transmits buffered records during relay contacts. Nominal surface-operation goals are 24 h on A and 72 h on B.'),
]
notice = ('This working draft separates proposed requirements and acceptance criteria from assumed solutions. '
          'The solution paragraphs and numerical values support concept sizing, trade studies and test planning. '
          'Verification remains open. Exercise each assumption against the applicable closure evidence before adopting a flight value.')
provenance = [
 'The governing register combines the current FREYA vehicle and software allocations with Rev09 source requirements and the phase allocation below.',
 'The executable configuration snapshot and source hashes are recorded in data/requirements/default-baseline.json. The canonical exported register is data/requirements/current-specification.json.',
 'Presentation artifact: '+D['pitchReconciliation']['source']+'. The phase map uses '+str(D['pitchReconciliation']['sourceSlideCount'])+' numbered slides. Slide 7 describes delivery order and slides 3–4 describe science alternatives.',
 'Assumed solutions in this edition use model references where applicable and engineering planning values where selection or test data is still open. The source ledger preserves earlier evidence without transferring qualification.',
]
solutions = {}
for line in (R/'data/requirements/assumed-solutions.tsv').read_text().splitlines():
 id, paragraph = line.split('\t',1)
 if id in solutions or not re.search(r'\d',paragraph):
  raise ValueError('Invalid or duplicate assumed solution for '+id)
 solutions[id] = paragraph
if solutions.keys() != {q['id'] for q in req}:
 raise ValueError('Assumed solution IDs must match the current requirements exactly.')
for q in req:
 q['assumedSolution'] = solutions[q['id']]
D.update(abstract=abstract,elements=[dict(name=name,description=description) for name,description in elements],
         authority=notice,edition='Requirements and assumed solutions',provenance=provenance)

def group_anchor(group):
 return 'spec-'+group.lower().replace(' ','-')

groups=list(dict.fromkeys(q['group'] for q in req))
contents=[
 ('mission-abstract','Mission abstract'),('mission-elements','Mission elements'),
 ('configuration-baseline','Default A/B configuration'),
 *[(group_anchor(group),group) for group in groups],
 ('open-items','Closure register'),
 ('pitch-reconciliation','Appendix A · Provenance and phase allocation'),
 ('source-crosswalk','Appendix B · Archived source crosswalk'),
]
D['contents']=[dict(anchor=anchor,title=title) for anchor,title in contents]
(R/'data/requirements/current-specification.json').write_text(json.dumps(D,indent=2,ensure_ascii=False)+'\n')
with (R/'data/requirements/verification-matrix.csv').open('w',newline='') as f:
 w=csv.writer(f,lineterminator='\n')
 w.writerow(['ID','Allocation','Subsystem','Applies','Requirement','Acceptance','Verification','Source','Parents','Block','Status','Assumed solution'])
 for q in req:
  w.writerow([q['id'],q['group'],q['subsystem'],q['applies'],q['text'],q['acceptance'],q['verification'],
              q['source'],';'.join(q['parentIds']),q['architectureBlock'] or '',q['status'],q['assumedSolution']])

def section(anchor, title, body):
 return f'<section id="{anchor}"><h2>{E(title)}</h2>{body}</section>'

def p(text):
 return '<p>'+E(text)+'</p>'

def trace(q):
 return 'Source: '+q['source']+' | Parents: '+(', '.join(q['parentIds']) or 'Mission-level need')

def links(ids):
 return ', '.join(f'<a href="#{id}">{id}</a>' for id in ids)

head='''<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>FREYA Requirements Specification · Rev 10</title><link rel="stylesheet" href="src/workspace.css">
<style>
main{max-width:1100px;margin:auto;padding:2rem}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #38536a;padding:.6rem;text-align:left}
article{margin:1rem 0;padding:1rem;border:1px solid #38536a;border-radius:10px}p{line-height:1.6}a{color:#72dfca}
.current-req[hidden]{display:none}.spec-filters{display:flex;flex-wrap:wrap;gap:1rem}.spec-filters input,.spec-filters select{padding:.6rem;max-width:100%}
.spec-contents ol{columns:2;column-gap:2rem;padding-left:1.5rem}.spec-contents li{break-inside:avoid;margin-bottom:.3rem}
.spec-solution{padding:.75rem 1rem;border-left:3px solid #72dfca;background:#122b38}@media(max-width:650px){.spec-contents ol{columns:1}}
</style>'''
nav='<nav class="spec-contents" aria-label="Specification table of contents"><h2>Table of contents</h2><ol>'+''.join(f'<li><a href="#{anchor}">{E(title)}</a></li>' for anchor,title in contents)+'</ol></nav>'
sections=[
 section('mission-abstract','Mission abstract',p(abstract)),
 section('mission-elements','Mission elements',''.join('<h3>'+E(name)+'</h3>'+p(description) for name,description in elements)),
 section('configuration-baseline','Default A/B configuration',p(notice)+
 '<div class="mount-table"><table><thead><tr><th>Parameter</th><th>A</th><th>B</th><th>Meaning / limitation</th></tr></thead><tbody>'+
 ''.join('<tr>'+''.join('<td>'+E(x)+'</td>' for x in row)+'</tr>' for row in baseRows)+'</tbody></table></div>'),
]
downloads='<p><a href="documents/FREYA_Requirements_Specification_Rev10.docx">Word specification</a> · <a href="documents/FREYA_Requirements_Specification_Rev10.pdf">PDF specification</a> · <a href="data/requirements/current-specification.json">Requirements JSON</a> · <a href="data/requirements/verification-matrix.csv">Verification matrix CSV</a></p>'
filters='<div class="spec-filters"><label>Find requirement <input id="specSearch" type="search" placeholder="ID, subsystem or keyword"></label><label>Allocation <select id="specGroup"><option value="">All allocations</option>'+''.join('<option>'+g+'</option>' for g in groups)+'</select></label></div><p id="specCount" aria-live="polite">'+str(len(req))+' requirements</p>'
sections.append(downloads+filters)
for group in groups:
 cards=[]
 for q in [q for q in req if q['group']==group]:
  id=q['id']
  block=q['architectureBlock']
  blockLink=f'<a href="index.html#block-{E(block)}">Open interactive block data</a> · ' if block else ''
  cards.append(f'<article class="req current-req" id="{id}" data-group="{E(group)}"><h3>{id} · {E(q["subsystem"])}</h3>'
    f'<p><strong>{E(q["text"])}</strong></p><p><b>Acceptance</b> {E(q["acceptance"])}</p>'
    f'<p><b>Method</b> {E(q["verification"])} · <b>Applies</b> {E(q["applies"])} · <b>Status</b> Verification open</p>'
    f'<p class="spec-solution"><b>Assumed solution.</b> {E(q["assumedSolution"])}</p>'
    f'<p>{blockLink}<a href="./#{id}">Trade studies and evidence record</a> · '
    f'<a href="#trace-{id}">Source and allocation trace</a></p></article>')
 sections.append(section(group_anchor(group),group,''.join(cards)))
sections.append(section('open-items','Closure register',p('Owners are proposed disciplines. Approve quantitative acceptance limits before verification closure.')+
 ''.join(f'<article id="{a}"><h3>{a} · {E(b)}</h3>{p(c+" · Open")}{p(d)}<p><a href="./#{a}">Open closure trade</a></p></article>' for a,b,c,d in closures)))
sections.append(section('pitch-reconciliation','Appendix A · Provenance and phase allocation',
 ''.join(map(p,provenance))+'<p><a href="data/requirements/default-baseline.json">Download executable baseline and source hashes</a></p>'+
 '<h3>Source changes and unresolved conflicts</h3>'+''.join(p(a+' — '+b+' ['+c+']') for a,b,c in conflicts)+
 '<h3>Phase allocation</h3>'+''.join('<article><h4>'+E(x['title'])+'</h4>'+p(x['source'])+
 p(x['recordedDescription'])+'<p>Allocated requirements '+links(x['currentRequirementIds'])+'</p></article>' for x in D['pitchReconciliation']['phaseTrace'])+
 ''.join(map(p,pitchNotes))+'<h3>Requirement provenance</h3>'+
 ''.join(f'<p id="trace-{q["id"]}">{links([q["id"]])} · {E(trace(q))}</p>' for q in req)))
sections.append(section('source-crosswalk','Appendix B · Archived source crosswalk',
 p('This ledger preserves all 91 source identifiers and their current allocations.')+
 ''.join('<details><summary>'+E(x['sourceId'])+' · '+E(x['disposition'])+'</summary>'+p(x['sourceText'])+
 '<p>Current allocation '+links(x['currentRequirementIds'])+'</p></details>' for x in sourceMap)))
js="""<script>const search=document.getElementById('specSearch'),group=document.getElementById('specGroup'),cards=[...document.querySelectorAll('.current-req')];function filter(){let count=0;for(const card of cards){card.hidden=Boolean((group.value&&card.dataset.group!==group.value)||!card.textContent.toLowerCase().includes(search.value.toLowerCase()));if(!card.hidden)count++;}document.getElementById('specCount').textContent=count+' of '+cards.length+' requirements';}search.oninput=filter;group.onchange=filter;window.addEventListener('hashchange',()=>{const target=document.getElementById(location.hash.slice(1));if(target?.matches('.current-req[hidden]')){search.value='';group.value='';filter();target.scrollIntoView();}});</script>"""
(R/'current-requirements.html').write_text('<!doctype html><html lang="en"><head>'+head+'</head><body><main><div class="eyebrow">FR-RS-010 · 19 November 2026 · working draft</div><h1>FREYA Requirements Specification</h1>'+nav+''.join(sections)+js+'</main></body></html>')

# Word links use stable bookmarks so the contents work without field updates.
def word_anchor(anchor):
 return anchor.replace('-','_')

def word_link(paragraph, anchor, title):
 link=OxmlElement('w:hyperlink')
 link.set(qn('w:anchor'),word_anchor(anchor))
 run=OxmlElement('w:r')
 props=OxmlElement('w:rPr')
 style=OxmlElement('w:rStyle')
 style.set(qn('w:val'),'Hyperlink')
 props.append(style)
 value=OxmlElement('w:t')
 value.text=title
 run.extend([props,value])
 link.append(run)
 paragraph._p.append(link)

doc=Document()
doc.sections[0].header.paragraphs[0].text='FREYA · FR-RS-010 · WORKING DRAFT · 19 November 2026'
doc.styles['Normal'].font.size=Pt(10)
doc.add_heading('FREYA Requirements Specification',0)
doc.add_paragraph('Revision 10 · 19 November 2026 · Working draft')
doc.add_heading('Table of contents',1)
for anchor,title in contents:
 word_link(doc.add_paragraph(),anchor,title)
doc.add_page_break()
bookmark_id=0

def word_heading(title,anchor):
 global bookmark_id
 bookmark_id+=1
 heading=doc.add_heading(title,1)
 start=OxmlElement('w:bookmarkStart')
 start.set(qn('w:id'),str(bookmark_id))
 start.set(qn('w:name'),word_anchor(anchor))
 end=OxmlElement('w:bookmarkEnd')
 end.set(qn('w:id'),str(bookmark_id))
 heading._p.insert(1,start)
 heading._p.append(end)

def word_solution(text):
 paragraph=doc.add_paragraph()
 paragraph.add_run('Assumed solution. ').bold=True
 paragraph.add_run(text)

word_heading('Mission abstract','mission-abstract')
doc.add_paragraph(abstract)
word_heading('Mission elements','mission-elements')
for name,description in elements:
 doc.add_heading(name,2)
 doc.add_paragraph(description)
word_heading('Default A/B configuration','configuration-baseline')
doc.add_paragraph(notice)
t=doc.add_table(rows=1,cols=4)
t.style='Light Shading Accent 1'
for cells, row in [(t.rows[0].cells,('Parameter','A','B','Meaning / limitation'))]+[(t.add_row().cells,row) for row in baseRows]:
 for cell,value in zip(cells,row):
  cell.text=value
for group in groups:
 word_heading(group,group_anchor(group))
 for q in [q for q in req if q['group']==group]:
  doc.add_heading(q['id']+' · '+q['subsystem'],2)
  doc.add_paragraph(q['text'])
  doc.add_paragraph('Acceptance: '+q['acceptance'])
  doc.add_paragraph('Verification: '+q['verification']+' | Applies: '+q['applies']+' | Status: Open')
  word_solution(q['assumedSolution'])
word_heading('Closure register','open-items')
for a,b,c,d in closures:
 doc.add_heading(a+' · '+b,2)
 doc.add_paragraph(c+' · Open. '+d)
word_heading('Appendix A · Provenance and phase allocation','pitch-reconciliation')
for text in provenance:
 doc.add_paragraph(text)
doc.add_heading('Source changes and unresolved conflicts',2)
for a,b,c in conflicts:
 doc.add_paragraph(a+' — '+b+' ['+c+']')
doc.add_heading('Phase allocation',2)
for x in D['pitchReconciliation']['phaseTrace']:
 doc.add_heading(x['title'],3)
 doc.add_paragraph(x['source']+'. '+x['recordedDescription'])
 doc.add_paragraph('Current allocation: '+', '.join(x['currentRequirementIds']))
for text in pitchNotes:
 doc.add_paragraph(text)
doc.add_heading('Requirement provenance',2)
for q in req:
 doc.add_paragraph(q['id']+' · '+trace(q))
word_heading('Appendix B · Archived source crosswalk','source-crosswalk')
for x in sourceMap:
 doc.add_paragraph(x['sourceId']+' · '+x['sourceText']+' '+x['disposition']+' Current allocation: '+', '.join(x['currentRequirementIds']))
doc.save(R/'documents/FREYA_Requirements_Specification_Rev10.docx')

styles=getSampleStyleSheet()
styles['BodyText'].fontSize=9
styles['BodyText'].leading=12
story=[]
def para(text,style='BodyText',prefix=''):
 story.append(Paragraph(prefix+E(text).replace('₀','<sub>0</sub>'),styles[style]))
 if style=='BodyText':
  story.append(Spacer(1,5))

def pdf_heading(anchor,title):
 heading=Paragraph(E(title),styles['Heading1'])
 heading.contents_anchor=anchor
 story.append(heading)

class SpecificationPdf(SimpleDocTemplate):
 def afterFlowable(self,flowable):
  anchor=getattr(flowable,'contents_anchor',None)
  if anchor:
   title=flowable.getPlainText()
   self.canv.bookmarkPage(anchor)
   self.canv.addOutlineEntry(title,anchor,level=0)
   self.notify('TOCEntry',(0,title,self.page,anchor))

para('FREYA Requirements Specification','Title')
para('FR-RS-010 · 19 November 2026 · Working draft')
para('Table of contents','Heading1')
toc=TableOfContents()
toc.levelStyles=[styles['Normal']]
story.extend([toc,PageBreak()])
pdf_heading('mission-abstract','Mission abstract')
para(abstract)
pdf_heading('mission-elements','Mission elements')
for name,description in elements:
 para(name,'Heading2')
 para(description)
pdf_heading('configuration-baseline','Default A/B configuration')
para(notice)
for row in baseRows:
 para(row[0]+' | A: '+row[1]+' | B: '+row[2]+' | '+row[3])
for group in groups:
 story.append(PageBreak())
 pdf_heading(group_anchor(group),group)
 for q in [q for q in req if q['group']==group]:
  para(q['id']+' · '+q['subsystem'],'Heading2')
  para(q['text'])
  para('Acceptance: '+q['acceptance'])
  para('Verification: '+q['verification']+' | Applies: '+q['applies']+' | Status: Open')
  para(q['assumedSolution'],prefix='<b>Assumed solution.</b> ')
story.append(PageBreak())
pdf_heading('open-items','Closure register')
for a,b,c,d in closures:
 para(a+' · '+b,'Heading2')
 para(c+' · Open. '+d)
story.append(PageBreak())
pdf_heading('pitch-reconciliation','Appendix A · Provenance and phase allocation')
for text in provenance:
 para(text)
para('Source changes and unresolved conflicts','Heading2')
for a,b,c in conflicts:
 para(a+' — '+b+' ['+c+']')
para('Phase allocation','Heading2')
for x in D['pitchReconciliation']['phaseTrace']:
 para(x['title'],'Heading3')
 para(x['source']+'. '+x['recordedDescription'])
 para('Current allocation: '+', '.join(x['currentRequirementIds']))
for text in pitchNotes:
 para(text)
para('Requirement provenance','Heading2')
for q in req:
 para(q['id']+' · '+trace(q))
story.append(PageBreak())
pdf_heading('source-crosswalk','Appendix B · Archived source crosswalk')
for x in sourceMap:
 para(x['sourceId']+' · '+x['sourceText']+' '+x['disposition']+' Current allocation: '+', '.join(x['currentRequirementIds']))

def footer(canvas,document):
 canvas.saveState()
 canvas.setFont('Helvetica',8)
 canvas.drawString(36,24,'FREYA FR-RS-010 · Working draft · 19 November 2026')
 canvas.drawRightString(575,24,str(document.page))
 canvas.restoreState()

SpecificationPdf(str(R/'documents/FREYA_Requirements_Specification_Rev10.pdf'),
 leftMargin=42,rightMargin=42,topMargin=42,bottomMargin=42).multiBuild(story,onFirstPage=footer,onLaterPages=footer)
print(f'Built {len(req)} requirements with assumed solutions, {len(sourceMap)} source dispositions, HTML / Word / PDF / JSON / CSV')
