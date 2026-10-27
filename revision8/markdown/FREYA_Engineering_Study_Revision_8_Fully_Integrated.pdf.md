# FREYA_Engineering_Study_Revision_8_Fully_Integrated.pdf

Text access copy. Original retains figures and layout.

FREYA
Mars Life-Detection Penetrator Mission —
Revision 8
Fully integrated engineering research edition | 27 October 2026 | Concept study, not flight-qualified




Abstract
This report consolidates the available FREYA technical research into one subject-organized engineering study. Unlike the previous
Revision 8 compilation, preceding reports do not appear as serial annexes. The underlying text, calculations and citations are
regrouped by topic with original-source page traceability. Six nominal 4 kg probes and a 45 kg entry system remain targets, not a
closed hardware design. The proposed science inlet depth is 0.50 m below the original surface; with 0.25 m tip-to-inlet offset, the
idealized vertical nose travel is 0.75 m before tilt or disturbed-zone corrections. Steel and steel–CFRP candidate mass estimates of
5.488 kg and 4.473 kg do not achieve the 4 kg target. Hard-sandstone penetration, structural survival, power, communications and
planetary-protection qualification remain open.




Current design and interpretation rules
    Current science requirement: 0.50 m effective inlet depth. The 0.75 m nose travel is only the ideal vertical reference; it is not a
     verified rock-penetration performance claim.
    Mass target: six nominal 4 kg penetrators plus a nominal 21 kg entry carrier within 45 kg. A 4 kg probe was not demonstrated
     by the candidate geometries.
    Target material: dry, strongly cemented sandstone is a qualification case. The 100–150 MPa UCS range is not a calibrated
     dynamic penetration resistance.
    Whole-assembly irradiation is a proposed planetary-protection process, not an established sterilization qualification.
     Biological, material and electronic compatibility need evidence.
    Historical 1.5 m auto-fitted parachute results are archived model scenarios and must not be interpreted as validated Mars
     lander sizing.
    External sources and mathematical outputs retain their original confidence level; reviewed arithmetic is not independent
     flight qualification.




Contents
1. Mission architecture and technical baseline

2. Life detection and science sampling

3. Penetrator geometry, structure and mass closure

4. Atmospheric entry, orbital delivery and deorbit

5. Penetration mechanics and impact qualification

6. Parachutes, stability and communication

7. Aeroshell and thermal protection

8. Electronics, batteries, heat and survivability

9. Planetary protection and sterilization

10. Requirements, constraints and trade studies

11. Risk register and qualification blockers

12. Assumptions, equations and calculation traceability
13. References and source provenance

14. Historical design cases and superseded assumptions

Each original-source page is attributed inline as [Source Rev7 PDF page N]. Original historical section labels are retained as
evidence but no historical report is attached wholesale.
1. Mission architecture and technical baseline
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 16
N2 NASA. NASA Says Farewell to MAVEN Mars Mission Hosts Media Call Today. 3 June 2026. Accessed 26 October 2026. Confirms
end of mission and loss of relay function. https://www.nasa.gov/news-release/nasa-says-farewell-to-maven-mars-mission-hosts-
media-call-today/ N3 NASA NODIS. NPR 8715.24 Planetary Protection Provisions for Robotic Extraterrestrial Missions. Effective 24
September 2021. Current displayed expiration 22 September 2032. Accessed 26 October 2026.
https://nodis3.gsfc.nasa.gov/displayDir.cfm?c=8715&s=24&t=NPR N4 NASA Technical Standards System. NASA-STD-8719.27
Implementing Planetary Protection Requirements for Space Flight. Baseline 30 August 2022 change 0 ACTIVE. Accessed 26 October
2026. https://standards.nasa.gov/standard/NASA/NASA-STD-871927 N5 NASA Science Mars Rosa. NASA Begins Implementation for
ESAs Rosalind Franklin Mission to Mars. 16 April 2026. Launch opportunities no earlier than late 2028; this is not a FREYA flight
commitment. https://science.nasa.g ov/blogs/mars-rosa/2026/04/16/nasa-begins-implementation-for-esas-rosalind-franklin-mission-
to-mars/ N6 Young C W. Penetration Equations. SAND97-2426. Sandia National Laboratories October 1997. DOI

10.2172/562498. Primary report identity confirmed from report title and UNT metadata; full report retrieval failed in this
integration. The detailed scaling is carried from R6, not newly validated against a Mars dataset.
https://digital.library.unt.edu/ark:/67531/metadc697639/ N7 NASA Office of Safety and Mission Assurance. Category IVa Mars
Planetary Protection Primer Now Available. 22 October 2026. Planning aid only; mission category is not assigned here.
https://sma.nasa.gov/news/articles/new sitem/2026/10/22/category-iva-mars-planetary-protection-primer-now-available N8 NASA
TechPort project 184149. Reviewer-supplied URL. Access returned a JavaScript-only shell with no project details. Not evidence for a
Stone Aerospace award. https://techport.nasa.gov/projects/184149 Additional inspected primary sources: the supplied Spacek et al
2026 published IMPRESS paper, Astrobiology 26(9) 688-699 DOI 10.1177/15311074261471218, and the author-hosted Supplementary
Information revised 9 July 2026. See R6[1] and R6[13] for full authors and publication URLs. Both published-paper attachments
have identical bytes. Author supplement is not asserted byte-identical to the publisher supplement. All 54 original Revision 6
reference records, the predecessor sources, their access limitations and the full

study-supplement references are preserved in the annexes. Only the specific current checks above upgrade a source status. Unread
primary sources and generic supplier analogs remain open verification work. Appendix R7 E Artifact preservation and release
checks All inspected project files are identified in FREYA_Revision_7_Source_Manifest.json by exact path, byte length and SHA256.
Files with identical text but different PDF bytes are both retained; only exact byte duplicates are labeled as such. The earlier
superseded carbon assessment is inventoried for provenance and is not reinstated as current authority. The companion evidence
package preserves original reports, source paper and supplement, peer-review packet, model files and website specifications.
Archived simulation results retain their original warnings. The live website exposes the updated penetration and material studies,
the integrated report, and original report annexes through that report. The full private source-paper copy is not required to read
the public website. Executed release checks are recorded in FREYA_Revision_7_Validation.json in the evidence package.

[Source Rev7 PDF page 16; section classification: Mission architecture and technical baseline]

Source evidence — Rev7 master page 157
The attached paper confirms a 50 mm outer diameter, 1.5 mm steel wall, 345 cm3 payload capacity, and about 2 kg total Mars-
ready mass: approximately 1 kg forebody and 1 kg aftbody [1]. Its abstract describes emplacement at 0.2-1 m. These are IMPRESS
reference values, not validated FREYA performance predictions. The reviewer describes 50 mm as a compromise between small
size and thermal outflow and flags difficulty maintaining a narrower steel body above ambient temperature. This motivates a
thermal analysis; it is not a calculated FREYA heater requirement. 3. Review numbering The supplied review skips item 3. No
missing technical item has been invented. 4. Experiments, replication, and power Six probes, a 1 kg science allocation, and a
combined 0.5 kg battery/heater/controller allocation have not been established as mission requirements. Treat these as prior study
assumptions pending reassessment. Define the experiment suite, controls, replication, acquisition method, operating
temperatures, and duration first. Derive probe count and science mass from those choices. Then size energy storage, heating,
electronics,

communications, and margins from a time-resolved operating plan. Account for potential long incubation times and avoid
assuming that brief warming produces detectable metabolism. 5. Delivery architecture A 450 kg parent spacecraft in a 250 km
circular Mars orbit is one possible scenario, not a selected delivery architecture. Its deorbit, entry, and heating results must remain
scoped to their original assumptions. They cannot be transferred automatically to direct interplanetary arrival or other rideshare
opportunities. Compare candidate delivery opportunities and derive separate entry conditions, release requirements, protection,
and performance estimates for each before selecting a baseline. 6. Contamination control Stringent contamination control is
required. Irradiation of the entire assembled probe is not a selected mandatory treatment. Select a process compatible with
instruments, materials, and sensitive biological measurements. The review proposes final assembly in a glove box containing a
bactericidal gas component and cites historical NASA material concerning ethylene oxide [4]. Record this as a candidate process,
not an approved sterilization

protocol. Establish and verify microbial reduction, process coverage, material compatibility, residual contamination, assay
interference, blanks, and preservation of measurement validity. This addendum supplies no operational fumigation procedure or
validated treatment conditions. 7. Overall recommendation and reassessment gate The reviewer recommends redoing the study
from the established science and engineering requirements under expert guidance. AI-generated estimates should remain
traceable assumptions until verified. Before rebuilding the FREYA optimization study: - Establish the science hypothesis,
measurable outcomes, detection limits, and controls. - Select sampling strategy and environmental assumptions with science
review. - Use the published IMPRESS architecture as the initial reference; document every deviation. - Derive experiment count,
probe count, mass, power, and operating duration.

[Source Rev7 PDF page 157; section classification: Mission architecture and technical baseline]
2. Life detection and science sampling
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 3
Reading order and precedence Read the new integration and audit material first, then the intact Revision 6 annex. The Revision 5
annex preserves its original 92 assumptions, 16 table derivations and five figure derivations. The sampling-depth and material-
study annexes remain explicit rather than disappearing into a summary. No silent overwrite of conflicting assumptions is made.
Revision 6 supplies an expanded trade space; the depth and material supplements supply an additional 4 kg / 0.75 m qualification
scenario. Earlier 1.5 m examples and constant-resistance predictions are retained as historical calculations, not current calibrated
penetration predictions. Reference namespaces prevent collisions: R6[n] means Section 18 of the Revision 6 annex; V5[n] means
the predecessor bibliography; N1-N8 below identify newly checked records. The original source status labels travel with each
annex. Verified arithmetic never upgrades an estimated input to a measured fact. All annexes retain original page numbers and
labels. PDF bookmarks identify each volume. The master contents list gives physical starting pages. Differences in repeated source
versions are tracked by exact byte hashes in the evidence package, including files with the same title.

Evidence reconciliation and decisions The sampling study selects a 0.50 m inlet depth from a trade informed by ESA subsurface
sampling, and derives a 0.75 m nose travel from a 0.25 m tip-to-port offset. ESA specifies a rover drill capable of reaching 2 m; it
does not validate a 0.50 m life-detection threshold [N1]. The selected FREYA depth is a proposed engineering test objective. The
updated material study proposes dry strongly cemented sandstone with 100-150 MPa UCS, speeds 100-250 m/s and 10,000/20,000 g
peak sensitivities. These are qualification scenarios. UCS is not a calibrated dynamic penetration resistance. Target density,
bedding, moisture, temperature, strain-rate response and fracture must be measured. The original expert addendum is now
available and inspected. This resolves Revision 6 decision D-08 only as to availability of the text; the reviewer remains unnamed.
Its science and process suggestions remain proposals. Its absolute statement about solid-state biochemistry is preserved in its
original context, not adopted as a universal claim about hypothetical life. The NASA SBIR proposal with Stone Aerospace totaling
$250,000 is retained as a user-reported project

funding/proposal item. No proposal file, award number, work breakdown or verified award record was found among the
inspected artifacts. TechPort 184149 exposes no readable project detail here [N8]. Do not report an award or completed work from
this statement.

[Source Rev7 PDF page 3; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 4
R7T01 Case Inputs kept Disposition Historical delivery 6 x 5 kg; 45 kg; 1.5 m Archive and diagnostic boundary Earlier 4 kg target 1
kg science; 0.5 kg power; 0.5 kg chute/antenna 2 kg structure/potting allowance not closed Revision 6 example 70/2.5; 25% mass
margin

5.488 kg; worked example Revised sampling case 0.75 m tip travel; 0.25 m offset 0.50 m inlet only at zero tilt/disturbance Hybrid
example Steel nose and cap; CFRP barrel; collar 4.473 kg; unqualified joint and fit Derivation R7T01. Transcribe each case from its
labeled source. Keep mass definitions and geometry conventions separate. Compare the ledger sum with the target; no probability
or performance equivalence is inferred. Penetration and effective sampling depth The penetration study and the updated material
comparison are both incorporated in full later in this report. The active website permits the 0.75 m stopping-distance scenario
while keeping depth achievement unproven. It distinguishes whole-probe 4 kg impact arithmetic from the nominal forebody mass
that actually penetrates in the

split architecture. For axial nose travel s, tip-to-inlet offset o, tilt theta from vertical and an excluded disturbed-layer allowance c,
effective vertical inlet depth is z=(s-o) cos(theta)-c. To reach 0.50 m, s_required=o+(0.50+c)/cos(theta). This assumes a straight
penetrator and planar original surface. Crater geometry and the disturbed zone require measurement, not a fixed universal
correction. At zero disturbance and zero tilt, 0.75-0.25=0.50 m. With a 0.05 m excluded layer, even vertical travel must reach 0.80
m. At 30 degrees, 0.75 m axial travel leaves only 0.383 m effective depth for that allowance. These are geometric sensitivities, not
crater predictions. At 4 kg, 150 m/s and an assumed 0.75 m stopping distance, energy is 45 kJ, average deceleration 1,529.6 Earth g
and mean force 60 kN. Peak shock and local science-mount stress remain unknown. The 100-250 m/s velocity table in the material
annex is preserved; none of its rows solves sandstone penetration. Revision 6 retains Young/Sandia relative scaling x proportional
to (m/A)^0.7 (v-30.5), holding target, nose and mass correction equal. The primary report is C W Young, Penetration Equations,
SAND97-2426 (1997), DOI
10.2172/562498 [N6]. It is empirical terrestrial heritage; a Mars target calibration is still absent. It cannot validate the hard-
sandstone requirement. Restoring equal sectional density with ballast cancels the mass saving only within the same-area, same-
speed comparison; changing nose, speed or geometry reopens the trade.

[Source Rev7 PDF page 4; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 24
PART B BASIS, ASSUMPTIONS AND DATA JUSTIFICATION 3 Mission context and study basis 3.1 What the study supports, and how
objectives trace to requirements FREYA is a penetrator-class probe concept carrying a 1.000 kg science package into the Martian
shallow subsurface, with a buried forebody, a tether and a surface aftbody carrying the radio. It follows the IMPRESS architecture,
which emplaces instruments 0.2–1 m below the surface and operates probes as a network [1]. This study supports a feasibility
decision and early mission planning. It does not select a flight design. PEER REVIEW · MODERATE PR-29 Revision 4 listed
requirements but did not trace them to objectives. The table below is a proposed trace for the science team to confirm; it does not
constitute science-team approval. Objective (proposed) Measurement that would show it Hardware implied Requirement IDs

O1 Test whether shallow regolith contains metabolically active or recoverable life Time-resolved response of treated sample
versus untreated, blank and reagent controls; independent discriminants; abiotic alternative stated in advance Sampler, warmed
chamber, assay instrument, battery, thermal isolation

SCI02, SCI03, SCI05, SCI06, PWR01, THERM01 O2 Characterize habitability context at the sample Temperature versus depth,
humidity or water-activity proxy, salts, pressure Temperature string, humidity sensor, conductivity or chemistry sensor SCI04,
THERM01 O3 Provide replication and spatial context

Same measurements at several nodes, with heterogeneity estimated Multiple probes, relay data return SCI05, COM01, COM02,
EDL01 O4 Optional geophysical and atmospheric context Seismic, pressure and temperature time series (supplement class
instruments [13]) Small sensors within the 1 kg or an added allocation SCI01, SYS02

O5 Survive emplacement and communicate Post-impact function and link closure Forebody, tether, aftbody, radio, drogue
MECH01–MECH05, COM01–COM03, EDL02, EDL03 3.2 Heritage and reference designs ADDED PR-24 A comparison with flown and
studied penetrators places FREYA in context. FREYA is heavier and denser than the published references, which is consistent with
its 1 kg science allocation but means that scaling from heritage is an extrapolation. Design Geometry

Mass Impact or depth Notes and source DS2 forebody (flown, 1999) 35 mm × 105.6 mm 0.670 kg forebody; 2.4 kg probe; 3.572 kg
with 1.165 kg aeroshell [20] About 190 m/s design; 0.6 m predicted penetration [19] Designed for 30,000 g (forebody) and 80,000 g
(aftbody) [18]. Two Li/SOCl2

cells, 600 mAh each. Mission lost; the review board found no single most probable cause; plausible modes included impact damage,
antenna orientation and the UHF link [17]. IMPRESS reference (concept) 50 mm OD, 1.5 mm wall, 210 mm cylinder, 345 cm³ cavity
About 2 kg forebody plus aftbody (Mars- ready target) [1]

Emplaces 0.2–1 m [1] Parameters carried from Rev 4, which inspected the paper; the full text was not accessible to this review (X).
ESA-study micro- penetrator (2005) Forebody 5 cm (A = 0.002 m²) Forebody 2.7 kg (3.2 with margin); aftbody 5.6 kg (6.7 with
margin) [21] 150 m/s; Young depth 0.76–

1.36 m for S = 5–9 [21] Closest mass analog to FREYA's forebody. Aftbody scope not verified (search excerpt only). Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 8

[Source Rev7 PDF page 24; section classification: Life detection and science sampling]




Historical source visual from original Rev7 PDF page 24, image ID 67
Historical source visual from original Rev7 PDF page 24, image ID 69

Source evidence — Rev7 master page 33
Figure 4. Weighted scores of the six candidates under five weight sets. Basis: reviewed model; weights are reviewer judgments
(§5.5 table). Scores are screening aids, not measurements. Reading the result. • 60/2 and 70/2.5 are robust. 60/2 ranks first or second
in four sets and third in the packaging-driven set; 70/2.5 ranks second or third throughout. Neither falls below third. • 50/1.5 wins
only when mass dominates, and it has the smallest margin against buckling among the survivors (4.4 at 3× load). It stays as the
heritage comparator, not as a primary. • 80/3 wins only when bore dominates, and is the heaviest (5.73 kg) with the lowest
sectional density (739 kg/m²). • 50/2 is dominated: it is heavier than 50/1.5 and longer than 60/2 with no offsetting benefit in the
model.

• 35/1.5 fails the hard screens and ranks last in every set. NOTE Caveats. Min–max normalization exaggerates small differences
between close candidates. Wall schedules differ by design, so 60/2 versus 70/2.5 is partly a wall comparison. Weights are
judgments. The criteria exclude cost, schedule, readiness, survivability test results and science performance. A matched-wall
comparison is available in Appendix A. 5.6 Boundary case: the 2 kg reverse budget Revision 4 asked how much science fits if the
whole probe must stay within 2.000 kg. This is an inverse mass and volume calculation. It yields a maximum allocation, not a
validated minimum life-detection instrument. Non-science item Standard kg Reduced kg Steel chassis 0.617

0.557 Potting 0.095 0.095 Battery 0.450 0.150 Heaters, controller and memory 0.120 0.060 Forebody harness and seals 0.080 0.040

Sample acquisition hardware 0.150 0.050 Transceiver and mounting 0.100 0.050 Antenna radiator 0.060 0.025 Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 17

[Source Rev7 PDF page 33; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 34
Non-science item Standard kg Reduced kg Cable or tether 0.050 0.020 Cable spool and strain relief 0.060 0.025 Surface aftbody
structure 0.200 0.080 Drogue risers and separation

0.250 0.100 Total non-science 2.232 (2.790 with 25 %) 1.252 PEER REVIEW · MINOR PR-30 Two clarifications. (1) The chassis falls
from 0.617 to 0.557 kg only because the joints allowance is halved (0.120 → 0.060 kg); tube, nose and cap are identical at 50 mm, 1.5
mm and a 210 mm barrel. (2) The published cavity is 345 cm³, whereas a 47 mm bore × 210 mm barrel is 364 cm³; the 5 %
difference is internal features, and the model correctly uses 345 cm³ for science volume and 210 mm for chassis mass. At the
standard allowances no positive science mass closes the 2 kg limit (2.232 kg nominal, 2.790 kg with contingency, before any
science). The reduced case changes the ancillary allocations as shown; these changes require development and test and are not
free savings. With 25 % contingency the mass limit is 2/1.25 − 1.252 = 0.348 kg; the volume limit is (0.345 × 0.65 − 0.070) × 2.0 =
0.3085 kg. Volume controls: about 308 g. At 1 kg/L the volume limit falls to 154 g; at 3 kg/L the mass

limit of 348 g controls. Factor Reduced reference case One kilogram science case Science mass 0.3085 kg 1.000 kg Diameter and
wall 50 mm / 1.5 mm 70 mm / 2.5 mm Practical cavity 0.345 L 0.954 L
Forebody envelope 260 mm 347 mm Chassis including joints 0.557 kg 1.608 kg Complete nominal 1.561 kg 4.390 kg Budget with 25
% 1.951 kg 5.488 kg Battery and usable energy

0.150 kg / 22.5 Wh 0.450 kg / 67.5 Wh Runtime at 1.5 W after 5 Wh 11.7 hours 41.7 hours Forebody nominal mass 1.211 kg 3.520 kg
Energy at 100 m/s 6,054 J 17,601 J Forebody mass per frontal area 617 kg/m²

915 kg/m² Six probes at budget mass 11.71 kg 32.93 kg Keeping the 70 mm / 2.5 mm concept and the standard allowances but
cutting science to 0.3085 kg gives a 0.422 L cavity, a 187 mm envelope and a 3.607 kg budget, still above 2 kg. The reduced-
reference case therefore saves mass through both smaller science and geometry and lower subsystem scope. At the same impact
speed and stopping distance, average g is unchanged by mass; force and kinetic energy scale with forebody mass, and a smaller
body does not automatically penetrate deeper (Section 10). 5.7 What the supplement implies for payload selection The supplement
[13] separates heritage, candidate instruments and astrobiology concepts. Its readiness labels are not FREYA qualification. DS2 is
listed at 2.4 kg and 190 m/s with no post-impact response, so it is not successful Mars survival heritage. Supplement datum [13]

Implication for this trade Humidity sensor 45 g and 124 cm³ About 80 % of the reduced 0.154 L science envelope. Also 0.36 kg/L,
which is the single data point behind PR-31. Radiometer 25 g plus 56 g processor Include processor mass; avoid counting shared
control twice (ledger reconciliation, §5.2). Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills,
26 October 2026 Page 18

[Source Rev7 PDF page 34; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 38
This becomes a new decision, D-09, and a new requirement, MECH06 (qualify the steel-to-composite joint for impact and cold if a
composite body is pursued), and a new risk, R35 (composite body delaminates or the joint fails under impact). They are folded into
Sections 14 and 15 where those lists appear in full. PART D FEASIBILITY SCREENS BY SUBSYSTEM These sections bound the trade
in Part C. Each ends with what a planner can rely on and what remains open. All added calculations are screens with stated
assumptions (Section 4). 6 Science and sampling strategy 6.1 Where to sample: shallow skin versus buried sensing Revision 4
withdrew 1.5 m as a biological sampling requirement and made the diurnally heated shallow skin a priority trade. The reviewed
numbers support the geometry of that move. With α = 3.63×10⁻⁸ m²/s the diurnal skin depth is 3.2 cm; about 5 % of the surface
amplitude remains at 10 cm and 0.2 % at 20 cm. InSight measured only 5.3–6.7 K of diurnal variation at 10– 20 cm [2], which is
consistent with a surface swing of order 100 K (the surface swing was not verified here). At 1.5 m, 14–18 % of the seasonal
amplitude remains across the one-sigma range of α, not zero. Thermal stability at depth does not imply

biological accessibility or liquid water; warmth, humidity and water activity must overlap under local pressure and salt
composition, and a daily freeze–thaw cycle must not be presumed. PEER REVIEW · MODERATE PR-06 α = 3.63×10⁻⁸ m²/s is the
measured annual-variation diffusivity for the top ≈40 cm at InSight (±0.53×10⁻⁸), not an "illustrative" value [2]. Applying it to 1.5 m
is an extrapolation, and layered or ice-cemented ground can differ greatly (§7.1). PEER REVIEW · MODERATE PR-08 The 218 K
equatorial and 154 K polar mean surface temperatures attributed to Clifford et al. [3] are widely quoted, but that paper concerns
cryosphere depth at kilometer scale and this review could not confirm the values in its text. For shallow soil the InSight
measurement, 217.5 K at 10–20 cm [2], is the better datum and agrees with 218 K. Figure 5. Fraction of surface thermal amplitude
remaining with depth, homogeneous half-space. Basis: δ = sqrt(αP/π); α = (3.63 ± 0.53)×10⁻⁸ m²/s from [2]. Replaces Rev 4 Figure 1,
which used the same value without the uncertainty band. Sampling option Science value Engineering consequence

Reviewer note Shallow skin, roughly 0–3 cm Material influenced by the daily thermal wave Surface scoop or inlet; dust exposure;
biological contamination and radiation effects Matches the 3.2 cm diurnal skin depth. Mass allowance 0.150 kg is not a
demonstrated sampler. Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026
Page 22

[Source Rev7 PDF page 38; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 39
Sampling option Science value Engineering consequence Reviewer note Buried forebody sensing, roughly 0.2–1 m Compare
protected material and physical properties Impact mixing; port access; no automatic transfer of shallow sample Matches IMPRESS
emplacement depth [1]. Controlled warmed

microchamber Test response versus untreated controls Thermal isolation, seals, repeated measurements, power and chemical
perturbation Drives volume and power (§7.3, §8) and may raise Special Region questions (§12). If shallow material must reach a
buried instrument, a transport tube, pump or conveyor must be designed and weighed; the 0.150 kg allowance cannot be assumed
to cover it. A colocated surface assay or split package is an alternative architecture. The 1 kg total science mass stays fixed across
locations. 6.2 Metabolic timescales, and what the energy ledger can observe
Revision 4 recorded potentially months-long metabolic recovery after prolonged freezing but cited no experiment. Published
laboratory work supplies the timescales. Temperature Observation Source Implication for FREYA +5 °C Minimum doubling time of
permafrost bacteria about 1 day (¹⁴C-acetate incorporation into lipids) [35] A warmed chamber near +5 °C could show growth
within days, if viable organisms are present. −10 °C

Minimum doubling time about 20 days [35] Even a mildly warmed chamber needs weeks. −15 °C Growth and division
demonstrated in Planococcus halocryophilus Or1; incubations ran 130 days at −15 °C; metabolic activity to −25 °C in frozen
permafrost microcosms [37] Months-long time series are the norm in the literature. −20 °C Minimum doubling time about 160
days; stationary phase reached after 200–350 days

[35] Delayed-recovery tests need 100 days or more. About −40 °C Roughly 10 turnovers of cellular carbon per billion years in ice;
no evidence of a minimum temperature for metabolism [36] Survival-class rates; not measurable by a short assay. −55.7 °C (217.5
K) Mean soil temperature at 10–20 cm, InSight [2] Unwarmed, in-place metabolism is far below any laboratory detection limit.

PEER REVIEW · MAJOR PR-05 The energy ledger supports about 1.7 days at 1.5 W (Section 8), while the cited organisms need weeks
to months at the temperatures at which they were measured. The architecture as sized can only (a) take brief environmental and
chemical measurements, or (b) run a short, insulated, warmed assay in which a fast response (hours to days) is the target. It cannot
test delayed recovery from freezing. The study must state which question FREYA answers (decision D-02). Heating can alter the
environment and chemistry even if it enables a response, so a warmed assay measures the sample under perturbation, not
unperturbed in-situ biology. The plan must compare prompt and delayed measurements and report a detection limit for each
duration. 6.3 Interpreting evidence, and the Viking lesson The Spacek–Abraham–Benner reanalysis of the Viking carbon-
assimilation experiment [5] motivates controlled follow-up of the chemistry; it does not establish extant life. It contests a widely
held view that oxidant chemistry explains the Viking results: Phoenix found about 0.5 % perchlorate in Martian soil [39],
laboratory work shows that heating organics with perchlorate can produce the Viking gas chromatograph signals [39], and a
recent NASA technical paper argues that the perchlorate model explains all nine Viking observations it lists [40]. Levin and Straat
maintain a biological reading of the

Labeled Release results [38]. PEER REVIEW · MODERATE PR-21 [1], [5] and [13] come from one author group, and [5] is a preprint
on the lead author's own site. They are useful for the concept, but they should not be the only evidence for the science case.
Independent standards-of- evidence work is added: the Biosignatures Standards of Evidence community report [41]. A pyrolysis
step in the presence of Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026
Page 23

[Source Rev7 PDF page 39; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 40
perchlorate is exactly the confounding condition that the Viking GC-MS result illustrates, so any assay that heats sample must carry
perchlorate-spiked blanks. Before any experiment is selected, define collection quantity, capture efficiency, thermal history,
chemical additions, detection limits and time series. Include unamended material, a treated control appropriate to the assay,
hardware and reagent blanks, calibration checks and independent biological or chemical discriminants. State in advance what an
abiotic alternative predicts. Replication must separate technical repeatability from spatial heterogeneity; six nodes is a scenario,
not a justified sample size. PEER REVIEW · MODERATE PR-22 The expert addendum [12] is a link to a private library and TechPort
record [6] returned no content. The change from 1.5 m to shallow-skin sampling rests on [12]. This review verified that the physics
supports the change (§6.1) but could not read the addendum itself or identify its author. Please supply the text and the reviewer's
name (Section 17). 7 Thermal environment and biological operating modes 7.1 Half-space attenuation Thermal skin depth δ =
sqrt(αP/π) and amplitude fraction exp(−z/δ) for a homogeneous half-space; P is one sol (88,775 s) or

one Martian year (668.6 sols). Diffusivity α Year skin depth m Remnant at 1.5 m Sol skin depth cm Remnant at 10 cm Class
3.10×10⁻⁸ (−1σ) [2] 0.77 14 % 3.0 3.4 % S

3.63×10⁻⁸ [2] 0.83 16 % 3.2 4.4 % S 4.16×10⁻⁸ (+1σ) [2] 0.89 18 % 3.4 5.4 % S 1.0×10⁻⁷ (illustrative)

1.37 34 % 5.3 15 % E 1.0×10⁻⁶ (illustrative ice-rich) 4.35 71 % 16.8 55 % E The two illustrative rows show why 1.5 m is not
universally seasonally isothermal and why layering and ice change the answer; they are not site data.

PEER REVIEW · MODERATE PR-07 k = 0.039 W/m K comes from Grott et al. 2021 [14], an active-heating measurement at 0.03–0.37
m depth in fine sand with about 60 % porosity, not from [2]. It correlates with atmospheric pressure [15], and Phoenix soil
conducted more than twice as well [14]. InSight is a low-conductivity case, not a bound. 7.2 Radial heat loss from the barrel Screen:
Q = 2π k L ΔT / ln(r_far / r_body), far-field radius 0.5 m. It excludes ends, axial bridges, transients, phase change and contact
resistance. The loss scales linearly with soil conductivity, so a site-independent design must be checked across the plausible range.
Soil conductivity k, W/m K 70 mm barrel (287 mm) IMPRESS-size barrel (210 mm, 50 mm) Comment 0.02
0.68 W 0.44 W Below InSight; plausible for very fine, dry dust. 0.039 (InSight [14]) 1.32 W 0.86 W Rev 4 case. 0.085 2.89 W 1.87 W
About twice InSight, the Phoenix class [14]. 0.3 10.2 W

6.6 W Cemented or gravelly ground (illustrative, E). 2.0 67.9 W 44.0 W Solid water ice order of magnitude (physical constant, not
site data). Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 24

[Source Rev7 PDF page 40; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 69
Appendix C Change record This revision is Revision 6. The 4-to-5 reassessment and the 5-to-6 consolidation are both recorded
here. The last column gives the disposition as of Revision 6. Revision 4 assumption or content Revision 4 reassessment Revision 5–6
disposition 35 mm and fixed 4 kg probe Geometry-derived trade; no fixed total mass Confirmed; 35/1.5 now rejected on a buckling
screen (PR-16) 1.5 m desired biological sample depth Open science trade; shallow skin priority Physics supports shallow priority
(§6.1); source [12] unreadable

(PR-22) Six probes Adjustable scenario Closure condition and probe-count matrix (§11.3, §13.2) 1 kg science plus 0.5 kg power 1 kg
retained; power sized by duration Mode-based energy ledger and chemistry sensitivity (§8) Parachute-integrated antenna Separate
aftbody antenna and tether Radio and relay compatibility added (§9) Mandatory whole-probe irradiation Compatible process trade
Framework, categories and Special Region screen added (§12)

450 kg bus in 250 km orbit Optional delivery calculation Entry state and stack-only deorbit added (§11.1) Auto-fit canopy to 1.5 m
Withdrawn pending calibration Relative penetration scaling and drogue sizing added (§10.3, §11.2) Private website claim Existing
site is public Unchanged Flat 25 % contingency Retained Alternatives shown; component-level policy proposed (D-07)

Science density 2.0 kg/L; ancillary 0.120 L Retained as assumptions Challenged and sensitivity added (PR-31, PR-32) PP01–PP05 used
for gates and requirements Retained Gates renamed PPG01–PPG05 (PR-03) Unnumbered preface and §1–§13 Retained Restructured
into Parts A–F with explicit trade method (PR-02) Single steel structural architecture (implicit)

Not addressed Rev 6: steel-head/composite-body trade added (§5.9, D-09, MECH06, R35) Fixed-sounding geometry and ledger
Treated as assumptions Rev 6: all sizes, masses, allowances and architecture declared trade variables; ledger labelled illustrative
Document navigation None Rev 6: table of contents and Revision 6 change summary added End of report. Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 53

[Source Rev7 PDF page 69; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 70
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 1 FREYA Science and
Penetrator Engineering Study Revision 5 comprehensive reassessment with peer review appendix Prepared for Robert J Mills •
26 October 2026 Preliminary engineering trade study with expert review inputs. No hardware configuration is flight qualified.
Abstract This report replaces the previous Revision 4 technical narrative. It retains a 1.000 kg science package as the current user-
directed assumption and rebuilds probe mass from geometry and explicit subsystem allowances. Equal-volume candidates span
35–80 mm diameter and about 5.01–5.73 kg budgeted complete-probe mass, with the 35 mm case at 5.54 kg. A 70 mm screening
candidate is 347 mm long, 4.39 kg nominal and 5.49 kg including 25 percent mass contingency. A 60 mm alternative is slightly
lighter but longer. Neither is a selected flight design. The architecture starts with a buried forebody, tether and surface aftbody.
Sampling the diurnally heated shallow skin is a

priority science trade; 1.5 m burial is no longer treated as the biological sampling requirement. Probe count, assay suite,
incubation duration, operating temperature, delivery opportunity and contamination-reduction process remain unselected. Long
heated assays can dominate battery mass and invalidate the short-duration ledger. The website exposes these dependencies and
the same numerical model used here. Interactive FREYA website https://freya-revision-4.abuzzpixie66.chatgpt.site The existing
public website audience is retained. All calculations distinguish literature values, user assumptions and engineering estimates.
Supporting specifications, requirements, constraints, data inventory and model boundaries are included in the appendices.

[Source Rev7 PDF page 70; section classification: Life detection and science sampling]
Historical source visual from original Rev7 PDF page 70, image ID 323




Historical source visual from original Rev7 PDF page 70, image ID 325

Source evidence — Rev7 master page 71
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 2 Two kilogram reverse
budget and science comparison The current direction also asks how much science can be carried if the entire probe must remain
within 2.000 kg. This is an inverse mass and volume calculation. A minimum scientifically useful mass cannot be established
without an experiment suite. The reduced package below is a maximum allowable science allocation within a proposed lighter
configuration, not a validated minimum life-detection instrument. With the standard subsystem allowances and a reference-sized
50 mm steel chassis, non-science hardware alone is 2.232 kg nominal and 2.790 kg with 25 percent contingency. Therefore no
positive science mass closes the 2 kg limit under those same factors, even with no contingency. Removing the science package
alone is insufficient. A separate reduced-scope case retains the 50 mm diameter, 1.5 mm wall, 210 mm barrel and 345 cm3 practical
cavity. The modeled forebody envelope is 260 mm including nose, cap and integration allowance; it is not claimed to reproduce
every detail of the published hardware. The reduced case explicitly changes the ancillary allocations shown next. These changes

require development and testing and are not free savings. Table T01 Standard and reduced non science mass allowances Non
science item Standard kg Reduced kg Steel chassis 0.617 0.557 Potting 0.095 0.095 Battery 0.450

0.150 Heaters controller and memory 0.120 0.060 Forebody harness and seals 0.080 0.040 Sample acquisition hardware 0.150 0.050
Transceiver and mounting 0.100 0.050

Antenna radiator 0.060 0.025 Cable or tether 0.050 0.020 Cable spool and strain relief 0.060 0.025 Surface aftbody structure 0.200
0.080 Drogue risers and separation

0.250 0.100 Reduced non-science hardware is 1.252 kg. With a 25 percent contingency policy, available nominal science mass is
2/1.25 - 1.252 = 0.348 kg. The same cavity at 25 percent potting, 10 percent reserved space and 0.070 L ancillary volume permits
(0.345 × 0.65 - 0.070) × 2.0 = 0.3085 kg science. The controlling allocation is therefore about 308 g, limited by volume.

[Source Rev7 PDF page 71; section classification: Life detection and science sampling]
Source evidence — Rev7 master page 72
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 3 Reduced science and
one kilogram consequences The reduced case totals 1.561 kg nominal and 1.951 kg with contingency, leaving 0.049 kg below the 2
kg ceiling. Its 0.150 kg battery offers 22.5 usable Wh under the same 150 Wh/kg assumption. Reducing payload density to 1 kg/L
cuts science capacity to approximately 154 g; at 3 kg/L the mass limit of 348 g becomes controlling. These are conditional ceilings,
not guaranteed instrument capability. Table T02 Reduced science and one kilogram comparison Factor Reduced reference case
One kilogram science case Science mass 0.3085 kg

1.000 kg Diameter and wall 50 mm / 1.5 mm 70 mm / 2.5 mm Practical cavity 0.345 L 0.954 L Forebody envelope 260 mm 347 mm
Chassis including joints 0.557 kg 1.608 kg

Potting 0.095 kg 0.262 kg Complete nominal 1.561 kg 4.390 kg Budget with 25 percent 1.951 kg 5.488 kg Battery / usable energy 0.150
kg / 22.5 Wh 0.450 kg / 67.5 Wh Runtime at 1.5 W after 5 Wh

11.7 hours 41.7 hours Forebody nominal mass 1.211 kg 3.520 kg Energy at 100 m/s 6054 J 17601 J Forebody mass per frontal area
617 kg/m2 915 kg/m2 Six probes at budget mass 11.71 kg

32.93 kg Plus historical 21 kg carrier 32.71 kg 53.93 kg At the same impact speed and stopping distance, average g is unchanged by
mass; force and kinetic energy scale with forebody mass. Actual penetration depth can change because frontal area, slenderness,
strength and speed change together. A smaller body does not automatically penetrate deeper. Radio and antenna capability also
decline only if their reduced allocations can be realized. The 2 m tether at 10 g/m and smaller spool require separate deployment
verification. To separate payload effects from hardware reductions, keep the 70 mm / 2.5 mm concept and all standard subsystem
allowances but reduce science from 1 kg to 0.3085 kg. Re-sized cavity is 0.422 L, envelope 187 mm and budget 3.607 kg. It still
exceeds 2 kg. Thus the reduced-reference case saves mass through both smaller science/geometry and lower subsystem scope.
Keeping the original large shell without shortening saves only the removed science mass before contingency. Science
consequences cannot be inferred from grams alone. A compact sensor may characterize temperature, water activity

or selected chemistry; a full metabolic assay with blanks, sampling, reagents, incubation and independent discriminants may need
much more. Obtain supplier concept designs for the approximately 0.31 kg envelope and the 1 kg envelope, then compare
detection limits, controls, replication, sample quantities and operating duration. Do not assert equal scientific capability.

[Source Rev7 PDF page 72; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 75
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 6 2 Science
interpretation and sampling strategy The expert review challenges the earlier assumption that reaching 1.5 m improves the chance
of detecting active biology. Thermal stability does not imply biological accessibility or liquid water. Shallow sampling is attractive
because the surface cycle can warm material, but warmth, relative humidity and water activity must overlap under the local
pressure and salt composition. A daily freeze–thaw cycle must not be presumed. Clifford et al. [3] give mean annual surface
temperatures of approximately 218 K at the equator and 154 K at the poles, about -55 C and -119 C. These broad climate estimates
are not a site-specific subsurface profile. Temperature is a major limitation on known metabolism; a frozen bulk sample does not
rule out every interfacial film or unknown biochemical mechanism. Both thermal and chemical conditions require measurement.
The supplied review notes potentially months-long metabolic recovery after prolonged freezing. No specific revival- experiment
reference was provided, so a universal recovery time is not asserted. The operating plan must compare prompt

measurements with delayed responses and report detection limits for each duration. Heating can alter the environment and
chemistry even if it enables a measurable response. Table T05 Sampling strategy options Sampling option Science value
Engineering consequence Shallow skin roughly 0–3 cm Observe material influenced by the daily thermal wave Surface scoop or
inlet; dust exposure; biological contamination and radiation effects Buried forebody sensing roughly 0.2–1 m Compare protected
material and physical

properties Impact mixing; port access; no automatic shallow sample transfer Controlled warmed microchamber Test response
versus untreated controls Thermal isolation, seals, repeated measurements, power and chemical perturbation Preserve shallow-
skin access through a surface acquisition head as a candidate. This report includes a 0.150 kg mechanism allowance, not a
demonstrated sampler. If shallow material must reach a buried instrument, a transport tube, pump or mechanical conveyor must
be designed and weighed; the current allowance cannot be assumed to cover a long sample- transfer system. A colocated surface
assay or split science package is another trade. The 1 kg total science mass remains fixed across locations.

The Spacek, Abraham and Benner CAPyR reanalysis [5] is identified by its host page as a submitted preprint. It motivates
controlled follow-up of Viking carbon-fixation chemistry; it does not establish extant Martian life. A CAPyR replica with
radiolabels, gas management, high-temperature pyrolysis and detection has not been shown to fit within the 1 kg package.
[Source Rev7 PDF page 75; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 76
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 7 3 Thermal
environment and biological operating modes A homogeneous half-space screen uses thermal skin depth δ = sqrt(α P / π) and
amplitude fraction exp(-z/δ). At α = 3.63 × 10^-8 m2/s, the calculated skin depths are 0.032 m for a sol and 0.828 m for a Martian
year. At 1.5 m about 16 percent of the seasonal amplitude remains; the daily term is negligible. These calculations explain why 1.5
m is not universally seasonally isothermal. Layering and ice can change the result [2]. Figure F01 Calculated attenuation for an
illustrative low-diffusivity homogeneous regolith Spohn et al. [2] measured a representative subsurface mean near 217.5 K at
InSight and thermal conductivity near 0.039 W/m K. These measurements ground the dry-soil example, not all Mars terrain. A
conductive steel shell can spread heat while also coupling the sample and electronics to the soil. The optimum diameter cannot be
selected from thermal surface area alone. Distinguish three modes: cold survival and brief environmental measurements;
insulated warm electronics with a minimally

altered sample; and an intentionally warmed assay chamber. The preferred temperature is assay-dependent. A buried body is not
a guaranteed warm incubator, and a hot sample is not a measurement of unperturbed in situ biology. A simple cylindrical radial-
loss screen is Q = 2π k L ΔT / ln(rfar/rbody), with a chosen far-field radius of 0.5 m. It excludes ends, axial bridges, transients, phase
changes and contact resistance. For the 70 mm barrel, k = 0.039 W/m K and ΔT = 50 K give about 1.3 W of side loss. Higher
conductivity can raise this substantially. Use this only to identify the need for a correlated thermal model.

[Source Rev7 PDF page 76; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 93
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 24 Appendix C Change
record and artifact inventory Table T16 Revision 4 assumptions and Revision 5 disposition Previous Revision 4 assumption
Reassessment disposition 35 mm and fixed 4 kg probe Geometry-derived trade; no fixed total mass 1.5 m desired biological sample
depth Open science trade; shallow skin priority for evaluation Six probes Adjustable mission scenario pending replication design 1
kg science plus 0.5 kg power

1 kg science retained; power sized by duration, with explicit brief- mode allowance Retained parachute integrated antenna
Separate aftbody antenna and tether reference; drogue and separation unselected Mandatory whole-probe irradiation Compatible
process trade; gas assembly proposal retained 450 kg bus in 250 km orbit Optional delivery calculation only Auto-fit canopy to 1.5
m Withdrawn from active predictions pending calibration Private website claim Existing site is public; audience retained

Supporting artifacts: Freya_Engineering_Study_Revision_5.docx and its PDF are the revised report.
FREYA_Peer_Review_Revision_5.zip supplies the assumption register, calculation data, original model, independent reproducer
and evidence manifest. Revision 4 website and source files are retained as the numerical baseline; this report adds human-review
documentation and stable table and figure IDs. The supplied IMPRESS PDF and saved expert-review addendum remain separate
source artifacts. This report incorporates their technical implications rather than reproducing the full copyrighted paper. The
earlier Revision 4 report is preserved by file version history. The prior numerical solver source is archived for traceability and is
not an active qualified prediction tool. No flight-ready design, biological finding, mission-authority approval, supplier quotation or
delivered hardware is asserted. The immediate engineering decision is to obtain the science package envelope and thermal
operating profile, then close the 60–70 mm candidates with measured components and tests.

[Source Rev7 PDF page 93; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 95
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 26 Appendix E Complete
assumption register Read each record as four compact audit steps: identify the input; identify its source and status; reproduce the
calculation or acknowledge an uncalculated choice; determine the evidence needed to accept it. Engineering allowances have no
external data source unless explicitly stated. Values in the body are rounded only after calculation. Science scope A001 Science
mass 1. Input: 1.000 kg (User constraint). 2. Basis: [12] plus current user instruction retaining 1 kg 3. Logic: Fix mass of experiment
instruments, chambers and experiment-specific reagents; keep shared platform hardware separate. 4. Review: Obtain instrument
BOM and eliminate shared-electronics double counting.

A002 Science envelope density 1. Input: 2.0 kg/L; sensitivity 1–3 kg/L (Engineering judgment). 2. Basis: No external measurement;
model DEFAULT_TRADE.scienceDensity 3. Logic: Assume package bulk density, including voids; divide mass by density to estimate
envelope, not solid-material volume. 4. Review: Replace with instrument CAD; density is not a material constant. A003 Science
envelope 1. Input: 0.500 L for 1 kg (Calculated). 2. Basis: Science mass and envelope-density entries 3. Logic: Compute Vscience =
1.000/2.0 = 0.500 L. 4. Review: Check package width and height independently of volume. A004 Ancillary forebody envelope 1.
Input: 0.120 L standard (Engineering judgment).

2. Basis: No selected battery or CAD; model ancillaryL 3. Logic: Reserve an internal envelope for battery, controls and harness
before potting/free fractions are applied. 4. Review: Aggressive allocation; demonstrate actual cell and insulation fit. Battery mass
changes do not automatically update this volume. A005 Potting volume fraction 1. Input: 0.25 of total cavity (Engineering
judgment). 2. Basis: No manufacturing fill study; model potFraction 3. Logic: Allocate potting as a fraction of total cylindrical cavity,
not as 25% of payload volume. 4. Review: Verify complete fill, ports, interfaces and excluded cavities using CAD.

[Source Rev7 PDF page 95; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 103
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 34 A050 Science mass
ceiling from mass 1. Input: 0.347770 kg reduced at 25% margin (Calculated). 2. Basis: 2 kg ceiling and reduced non-science mass 3.
Logic: Subtract 1.252230 from 1.600; preserve negative result for standard case as failure. 4. Review: No assertion about minimum
useful science or instrument performance. A051 Science mass ceiling from volume 1. Input: 0.308500 kg reduced at 2 kg/L
(Calculated). 2. Basis: Cavity, fractions and reduced ancillary envelope 3. Logic: Compute (0.345×0.65 - 0.070) L ×2 kg/L. 4. Review:
154.25 cm3 is a shared science envelope, not arbitrary space for each sensor. A052 Binding inverse limit

1. Input: Lesser of mass and volume ceilings, clamped at zero (Calculated decision rule). 2. Basis: twoKg function 3. Logic: Use
max(0,min(mass ceiling,volume ceiling)); separately test non-science mass closure. 4. Review: Zero allocation does not mean a
scientifically valid mission. A053 Reduced case budget and headroom 1. Input: 1.950912 kg budget; 0.049088 kg to ceiling
(Calculated). 2. Basis: Reduced nominal 1.560730 kg and 25% margin 3. Logic: Multiply nominal by 1.25; subtract from 2.000 kg. 4.
Review: Headroom is in addition to included growth allowance; no physical ballast or power credit. A054 Payload-only reduction
case 1. Input: 0.3085 kg science in resized 70/2.5 standard hardware (Controlled sensitivity). 2. Basis: design function with
scienceKg changed only 3. Logic: Keep density, potting, ancillary envelope and platform masses fixed; recompute cavity, length and
shell.

4. Review: Gives 3.606564 kg budget; this separates payload change from reduced subsystem scope. A055 Inverse density
sensitivity 1. Input: 1 or 3 kg/L alternatives (Scenario assumption). 2. Basis: No science CAD; volume-ceiling expression 3. Logic:
Change only science bulk density; at 1 kg/L volume allows 0.15425 kg; at 3 kg/L mass cap controls near 0.34777 kg. 4. Review: Not
equal science capability, a lower bound or a confidence interval.

[Source Rev7 PDF page 103; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 104
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 35 Thermal and
biological environment A056 Thermal diffusivity 1. Input: 3.63×10^-8 m2/s (Site analog). 2. Basis: [2] published paper page 6,
seasonal-wave result 3. Logic: Adopt measured low-conductivity-site analog for a homogeneous calculation. 4. Review: Reported
observational uncertainty and layering are not propagated into a mission confidence interval. A057 Thermal forcing periods 1.
Input: 88775 s daily; 59355072 s seasonal (Rounded physical constants). 2. Basis: [14] length of day and 686.980-day orbital period 3.
Logic: Use 24.6597×3600≈88775 s and 686.980×86400=59355072 s. 4. Review: Solar day differs from sidereal rotation; seasonal
forcing is simplified.

A058 Half-space attenuation model 1. Input: δ=sqrt(αP/π); amplitude fraction exp(-z/δ) (Analytical idealization). 2. Basis: [2]
thermal-wave equation; classical linear conduction 3. Logic: Compute separate daily/seasonal skin depths; evaluate fractions at
chosen depth. 4. Review: Assumes homogeneous, constant-property, linear periodic boundary forcing; no phase-change or layer
model. A059 Thermal depth range 1. Input: 0–1.50 m at 0.01 m increments (Plot scenario choice). 2. Basis: Figure F01 generating
code 3. Logic: Evaluate 151 depths; retain raw data before plotting. 4. Review: 1.5 m is the comparison endpoint, not an adopted
sample depth. A060 Thermal plot presentation 1. Input: Log axis 10^-5–1; daily plot floor 10^-12 (Display choice). 2. Basis: Figure
F01 plotting code

3. Logic: Clip only displayed daily values at 10^-12; retain raw fractions in CSV; set axis lower bound 10^-5. 4. Review:
Disappearance below plot floor means attenuation, not exactly zero temperature variation. A061 Regolith conductivity 1. Input:
0.039 W/m K dry-site analog (Literature analog). 2. Basis: [2] page 6 cites measured conductivity; [1] section 3.2 discusses it 3. Logic:
Use only in the illustrative radial-loss calculation, not all target materials. 4. Review: Ice, rock, compaction, contact resistance and
temperature can change heat loss.

[Source Rev7 PDF page 104; section classification: Life detection and science sampling]
Source evidence — Rev7 master page 105
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 36 A062 Background
mean temperatures 1. Input: 217.5 K at InSight; broad 218–154 K equator to poles (Literature context). 2. Basis: [2] abstract/results
and [3] section 2.2 3. Logic: Convert to Celsius by subtracting 273.15; distinguish site measurement from broad climate model. 4.
Review: Do not infer liquid water, biology or a site-specific 1.5 m temperature. A063 Radial heat-loss geometry 1. Input: Steady
concentric cylinder; rfar=.5 m; ΔT=50 K (Engineering scenario). 2. Basis: No site-specific thermal boundary; body section 3 3. Logic:
Use k=.039 and standard 70 mm barrel length in Q=2πkLΔT/ln(rfar/rbody). 4. Review: About 1.324 W side loss; omits ends, transient
heating, axial bridges and phase change. A064 Shallow sampling interval

1. Input: Roughly 0–3 cm (Science trade choice). 2. Basis: Reviewer proposal [12] plus daily thermal skin depth calculation 3. Logic:
Select an interval comparable with modeled daily skin depth; evaluate collection alternatives. 4. Review: Not a universal biological
optimum or proof of daily freeze–thaw. A065 Recovery and operating mode 1. Input: Cold, warm-electronics and warmed-assay
modes; duration unselected (Open science assumption). 2. Basis: Reviewer input [12]; no cited universal revival study 3. Logic:
Separate environmental sensing from intentionally warmed experiments; test incubation response over time. 4. Review: Months-
long recovery is not adopted as a measured FREYA requirement. A066 Biological interpretation 1. Input: No confirmed life
detection or validated minimum science mass (Evidence boundary). 2. Basis: [5] submitted preprint status; [13] payload concepts;
reviewer input 3. Logic: Separate signal, abiotic alternatives and biological inference; require controls.

4. Review: Payload grams cannot establish detection limits, replication or biological specificity. Power and impact A067 Usable
specific energy 1. Input: 150 Wh/kg integrated battery (Engineering judgment). 2. Basis: No selected battery datasheet or derating
test 3. Logic: Treat cold, age, enclosure and conversion derating as already included once. 4. Review: Do not apply a second hidden
derating or claim vendor-backed usable energy.

[Source Rev7 PDF page 105; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 111
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 42 Reproduction check:
Humidity example occupies about 80.4% of reduced science volume; radiometer plus listed processor mass is 81 g. Review limit:
No summed feasible suite, detection limit or full package CAD is established. Author-hosted supplement has its own version label.
T04 Equal volume diameter and mass trade Inputs: A012, A007, A023, A024, A025, A028, A043, A042 Sources: [1] one reference
geometry; [7], [8] material analogs; remaining schedule and allowances are model assumptions. 1. For each D/t pair convert mm to
m; compute d=D-2t. 2. Use V=.9538461538 L and compute barrel length V×.001/(πd²/4). 3. Calculate tube, nose, cap and joints; add
resin, 1 kg science and 1.520 kg other hardware. 4. Compute overall envelope and 25% contingency; round the displayed columns
only after calculation.

Reproduction check: 70/2.5 row: length 347.449620 mm; steel 1.607829421 kg; nominal 4.390137114 kg; budget 5.487671392 kg.
Review limit: Candidate wall thicknesses are not verified equal-strength designs; nominal mass does not establish survival. T05
Sampling strategy options Inputs: A064, A009, A065, A066 Sources: [12] review proposal; [1] architecture; [2] thermal context; [5]
interpretation. 1. Identify science objective for shallow, protected or intentionally warmed material. 2. Separate collection depth
from the forebody burial depth. 3. List acquisition, transport, thermal and contamination consequences. 4. Treat all three rows as
alternatives pending experiment and site selection. Reproduction check: No numerical optimization or probability is calculated for
this qualitative table. Review limit: The 0–3 cm and .2–1 m ranges are comparison context; no daily liquid-water cycle is assumed.
T06 Complete nominal mass ledger and contingency

Inputs: A043, A044, A041, A042 Sources: T04 geometry; [7], [8] analogs; standard component allocations in Appendix E. 1. Use the
70 mm/2.5 mm design only. 2. List all 16 hardware lines, keeping calculated tube, nose, cap, joints and potting separate. 3. Sum
location-tagged forebody rows; separately sum sampler and aftbody rows. 4. Nominal=sum(all rows); contingency=.25×nominal;
budget=nominal+contingency. Reproduction check: Forebody 3.520137114 kg + surface .870 kg = 4.390137114 kg nominal;
contingency 1.097534278 kg. Review limit: No installed location assigned to margin. Subsystem exclusions and volume fit require
independent audit. T07 Slenderness and frontal area trade Inputs: A020, A041, A012, A089 Sources: T04 model; ordinal assessments
are author engineering judgment.

[Source Rev7 PDF page 111; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 113
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 44 1. Continue the same
proposed register from MECH03 through VER01. 2. Cover sampling access, shock, power, thermal, communication, delivery,
protection and reproducibility. 3. Attach evidence-based verification methods; count 11 further rows. Reproduction check: T10+T11
contain 22 unique requirement IDs. Review limit: Verification methods are future work; their presence does not establish that
checks passed physically. T12 Design constraints and model boundaries Inputs: A087, A002, A004, A005, A006, A090 Sources:
Appendix E input choices and explicit exclusions; C01–C12 in baseline snapshot. 1. Transcribe numerical scenario boundaries and
unselected decisions. 2. Separate user science mass, packaging choices, mass accounting and model exclusions. 3. Keep each
boundary ID unique and link it to a checkable assumption or model limitation.

Reproduction check: Twelve constraints; no performance computation. Review limit: These are study boundaries, not all possible
flight or science constraints. T13 Open risks part one Inputs: A088, A066, A041, A042 Sources: Engineering review of science,
packaging, impact and communications gaps; R01–R11. 1. Identify a credible failure or misleading-result mechanism. 2. Map to the
relevant requirement and state closure evidence. 3. Keep the issue open until evidence exists; omit unsupported likelihood
numbers. Reproduction check: Eleven risks in this part. Review limit: Qualitative judgment; not an exhaustive reliability or failure-
mode assessment. T14 Open risks part two Inputs: A088, A085, A083, A077, A090 Sources: Engineering review of deployment,
delivery, thermal, contamination and model-use gaps; R12–R22.

1. Continue the risk register using the same schema. 2. Specify tests or analyses needed for closure, rather than a numerical
probability. 3. Combine with T13; check 22 unique IDs and consistent open state. Reproduction check: Eleven further risks; 22 total
open issues. Review limit: No joint-probability model or risk-ranking calculation. T15 Baseline input and provenance summary
Inputs: A001, A002, A004, A005, A006, A021, A027, A029, A067, A037, A042 Sources: [7], [8] analog densities; user science mass;
other inputs are explicit judgments. 1. Extract standard defaults from the frozen model and model boundary. 2. Present common
units; distinguish input from derived mass and reference data.

[Source Rev7 PDF page 113; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 120
FREYA | Revision 5 | Engineering study - preliminary Page 1 FREYA REVISION 5 Science sampling depth justification and 0.75 m
penetration requirement | 26 October 2026 Decision: Specify a minimum 0.75 m nose-tip penetration in the defined hard, dry
sandstone qualification target, to place a sampling inlet assumed to be 0.25 m behind the tip at least 0.50 m below the original
surface. This is a mission design requirement, not yet a demonstrated capability. 1. Why choose 0.50 m for science sampling?
Scientific rationale. The Martian surface is exposed to ultraviolet radiation, oxidizing chemistry, and penetrating ionizing
radiation. Burial reduces direct UV exposure and generally improves prospects for preservation of organic material. ESA identifies
subsurface samples as important for this reason and has designed Rosalind Franklin to collect samples as deep as 2 m [1,2]. ESA
also describes vertical surveys at 0.50 m intervals from the surface to 2 m [1]. Therefore, 0.50 m is a scientifically defensible entry
point for a depth-resolved

subsurface investigation, not a proven optimum or threshold for life detection. Why not demand 2 m? The 4 kg impact penetrator
has much tighter structural, mass, and survivability constraints than a rover drill. Requiring 0.50 m sample depth trades reduced
radiation shielding against higher probability of engineering feasibility and six distributed sampling opportunities. The benefit
must be verified through site selection and instrument detection limits. Limitations. Cosmic rays penetrate well below 0.50 m;
radiation damage depends on exposure age, overburden history, mineral matrix, and target molecule. Pavlov et al. show serious
degradation risks even in shallow rock [3]. A 0.50 m sample cannot be described as radiation-safe, sterile, or likely to contain life.
Dry hard sandstone is an engineering worst case, not necessarily the most promising astrobiology target; hydrated, fine-grained
sedimentary strata or ice-bearing deposits may offer better preservation. 2. Geometry and depth definition Required depth at inlet
= nose-tip depth - axial tip-to-inlet offset, for near-vertical penetration and an unobstructed inlet. With 0.75 m tip depth and 0.25 m
offset: 0.75 - 0.25 = 0.50 m. If the offset grows, tip-depth

requirement must grow by the same amount. Penetrator tilt, surface cratering, and disturbed material must be accounted for in
qualification. Geometry / metric Rev 5 requirement Minimum nose-tip depth 0.75 m Assumed tip-to-sampling-inlet offset 0.25 m (to
be verified in CAD) Minimum effective sampling depth 0.50 m beneath pre-impact undisturbed surface Depth verification
Independent tip-depth and inlet-depth measurement in test target 3. Vehicle and structural assumptions

[Source Rev7 PDF page 120; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 122
FREYA | Revision 5 | Engineering study - preliminary Page 3 Verification plan: (1) define a reproducible sandstone target using
measured density, UCS, porosity, moisture and bedding; (2) establish tip-to-inlet geometry and tolerances; (3) simulate impact and
fragmentation with a calibrated dynamic model; (4) conduct instrumented velocity sweeps; (5) section or image targets to verify
inlet depth and disturbed zone; (6) demonstrate sampling and analytical integrity after shock; (7) repeat for statistically
meaningful reliability. No guaranteed penetration or sampling claim is justified before these tests. 6. References and evidence
boundaries [1] European Space Agency, "ExoMars Rosalind Franklin (RFM) - Exploration Science."
https://explorationscience.esa.int/project/exomars-rosalind-franklin-rfm/ (2 m drill; 0.50 m vertical-survey sampling increments).
[2] European Space Agency, "ExoMars rover." https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/
Exploration/ExoMars/ExoMars_rover (subsurface radiation/organic preservation rationale).

[3] Pavlov, A. A. et al. (2012), "Degradation of the organic molecules in the shallow subsurface of Mars due to irradiation by cosmic
rays," Geophysical Research Letters, DOI: 10.1029/2012GL052166. https://doi.org/10.1029/2012GL052166 [4] NASA Astrobiology,
"Exobiology on Mars (ExoMars) Rover." https://astrobiology.nasa.gov/missions/rosalind-franklin/ (2 m drilling and subsurface
organic analysis context). Assumption provenance: 0.50 m sampling depth is a FREYA mission trade selection informed by ESA
sampling intervals, not a measured universal detection threshold. 0.25 m inlet offset, 0.75 m nose depth, sandstone UCS envelope,
150 m/s reference speed, and g-load design cases are FREYA engineering assumptions requiring verification; none are claimed as
ESA or NASA specifications.

[Source Rev7 PDF page 122; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 123
FREYA Revision 5 Steel vs. Carbon-Fiber Structural Trade — Updated to 0.75 m Penetration Baseline 26 October 2026 | Preliminary
engineering trade study | Not a qualified impact design Decision: Retain hardened/tempered alloy steel for the impact nose and
primary compression load path. Consider CFRP only in secondary/rear components pending dynamic tests. The governing mission
requirement is at least 0.75 m nose penetration to position the sampling inlet at least 0.50 m below the original surface. 1.
Controlling requirements Parameter Revision 5 assumption Vehicle 45 kg entry vehicle; six penetrators Penetrator

4.0 kg maximum each Mass allocation 1.0 kg science; 0.5 kg power/control; 0.5 kg parachute/antenna; 2.0 kg
nose/chassis/support/potting Geometry 0.75 m nose depth; sampling inlet 0.25 m behind tip; 0.50 m sample depth Worst-case
qualification target Dry, strongly cemented sandstone; proposed UCS 100–150 MPa Velocity cases 100–250 m/s; 150 m/s illustrative
reference, not validated Shock sensitivities 10,000 g peak reference; 20,000 g structural sensitivity, neither demonstrated

2. Why the 0.50 m science depth matters A 0.50 m inlet depth is a scientifically useful shallow-subsurface target: burial blocks
direct ultraviolet radiation and may improve organic preservation. ESA's Rosalind Franklin rover plans subsurface sampling down
to 2 m, including depth-resolved sampling. However, cosmic-ray damage extends below 0.50 m; this is not an established optimum
for life detection. The 0.75 m nose depth is a geometric consequence of the assumed 0.25 m tip-to-inlet offset, not an independent
science threshold. Tilt, crater formation and disturbed material must be checked. 3. Material screening (illustrative, not design
allowables) Metric Alloy steel CFRP laminate Density 7,800–7,850 kg/m³ 1,500–1,650 kg/m³

Axial compression ~1,000–2,000 MPa (grade and heat-treatment dependent) ~600–1,500 MPa (layup dependent) Transverse
compression Near-isotropic bulk response Often ~100–300 MPa, highly variable Primary risk Yielding, buckling, fracture, nose
wear Delamination, matrix crushing, fiber microbuckling, impact damage

[Source Rev7 PDF page 123; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 125
Preferred baseline: hardened steel ogive/conical nose, steel primary structural load path, protected sampling inlet 0.25 m behind
tip, and isolated/potted 1 kg science module. The 2 kg nose/chassis/potting allocation is a hard budget, not yet shown feasible.
Optimize diameter, nose profile, wall thickness and mass distribution together; neither material strength alone nor the 150 m/s
example proves 0.75 m penetration. 7. Verification and peer-review logic 1) Characterize sandstone density, UCS, porosity, bedding,
moisture, fracture behavior and temperature. 2) Lock CAD nose-to-inlet offset and impact alignment tolerance. 3) Select specific
steel grade and CFRP laminate/ply schedule with temperature- and strain-rate-relevant data. 4) Model penetration and transient
structural response with calibrated rock fracture/contact physics. 5) Conduct instrumented impact velocity sweeps. 6) Verify nose
depth and actual undisturbed inlet depth independently. 7) Test sample provenance, contamination control, science electronics
and inlet actuation after impact. 8) Repeat tests for statistical reliability. 8. Sources and evidence status [1] FREYA Revision 5 —
Science Sampling Depth Justification and 0.75 m Penetration Requirement (project

baseline, 26 Oct 2026). [2] ESA, ExoMars Rosalind Franklin mission science and subsurface drill descriptions (0–2 m science
context). [3] ASTM E9, compression testing of metallic materials; ASTM D6641/D6641M, composite compression; ASTM
D7136/D7137, impact damage and compression-after-impact. [4] ASM Handbook Vol. 1 (steel properties); supplier-specific
composite datasheets (laminate properties); NASA Mars penetrator/Deep Space 2 literature (historical impact context). Evidence
boundary: Numerical strength ranges are preliminary screening values, not certified material allowables. The 100–150 MPa
sandstone, 10,000/20,000 g shocks, and 0.75 m achievement are proposed requirements/sensitivities, not validated performance.

[Source Rev7 PDF page 125; section classification: Life detection and science sampling]
Source evidence — Rev7 master page 148
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Figure 8. Nominal resistance with atmospheric density
perturbation and fixed first-probe drogue. The fitted 1.5 m depth is not robust to density errors. Ice depth (m): density and material
resistance cross-sweep Atmos density multiplier Resistance x0.5 Resistance x1.0 Resistance x1.5 0.7 3.57 2.06 1.45 1.0

2.69 1.50 1.04 1.3 2.18 1.19 0.82 Damp depth (m): density and material resistance cross-sweep Atmos density multiplier Resistance
x0.5 Resistance x1.0 Resistance x1.5 0.7

2.92 1.88 1.41 1.0 2.41 1.50 1.10 1.3 2.05 1.24 0.90 Dry depth (m): density and material resistance cross-sweep Atmos density
multiplier

Resistance x0.5 Resistance x1.0 Resistance x1.5 0.7 2.74 1.76 1.31 1.0 2.39 1.50 1.10 1.3 2.17

1.33 0.97 A flight-scale uncertainty analysis must jointly sample density versus height (Mars-GRAM or better), speed and flight-path
dispersions, Cd/Mach, inflation delay and opening shock, penetration calibration and depth uncertainty, 6-DOF attitude, site slope
and obstacle probability. Optimizing a design point to match the same forward equation cannot substitute for independent
verification.

[Source Rev7 PDF page 148; section classification: Life detection and science sampling]




Historical source visual from original Rev7 PDF page 148, image ID 751

Source evidence — Rev7 master page 156
Complete expert review addendum FREYA PROJECT — EXPERT REVIEW AND BASELINE REASSESSMENT Recorded: 26 October
2026 Status: Saved review input and proposed corrective actions; not an approved mission baseline. Purpose Preserve the
technical review supplied by Bob and its sources as a FREYA project artifact. This addendum is associated with
Freya_Engineering_Study_Revision_4.docx and the Revision 4 website/specification artifacts. It does not itself modify those artifacts
or claim that a new engineering study has been completed. Evidence and attribution The review below records the supplied expert
assessment. The identity of the reviewer was not explicitly provided. The attached IMPRESS paper was checked locally for its
architecture, dimensions, and mass. Other linked references are retained as supplied; their contents were not independently
verified for this archival addendum. Scientific proposals and numerical assumptions remain subject to expert review and
experimental validation.

1. Sampling depth and biological activity The supplied review states that the proposed 1.5 m depth is below the diurnal warming
layer. Seasonal warming is substantially reduced in low-conductivity regolith, but 1.5 m is not universally seasonally isothermal
[2]. Expected annual-mean temperatures are approximately -55 C near the equator to -120 C near the poles [3]. These are
contextual estimates, not a selected FREYA site thermal model. The reviewer questions the interpretation of Carol Stoker's talk and
argues that low temperature may constrain metabolism more severely than relative moisture. The review states that biochemistry
cannot occur in solid state. This statement is preserved as the reviewer's scientific position, not adopted here as a universal result
for hypothetical alien biology. Heating a sample could change its biological response. The reviewer notes that revival experiments
involving bacteria frozen for hundreds of thousands of years can require months for metabolism to ramp up and careful
treatment. No specific revival-study citation was supplied. The suggested connection to Mars's last high-obliquity warm period
remains an interpretation requiring supporting evidence.

Proposed alternative: investigate the diurnally heated shallow skin, comparable in sampling context to Viking, where daily
thermal cycling may increase relative moisture. Daily freeze-thaw, liquid-water availability, and biological activity must be tested
against site-specific pressure, temperature, salts, and water activity; they are not established mission conditions. Required next
decision: choose the science objective and compare shallow-skin and subsurface sampling using a site-specific thermal and
moisture model. Do not retain 1.5 m as a mandatory biological sampling depth without justification. Distinguish penetrator
emplacement depth from the depth of material actually sampled. 2. Penetrator architecture The review contrasts the study's
assumed 35 mm diameter, 4 kg probe with the published IMPRESS reference: 50 mm forebody outer diameter and about 2 kg total
probe mass. Preserve the buried forebody, tether, and surface aftbody as the reference architecture. Changes require explicit
justification and revised mass, volume, thermal, structural, impact, and deployment estimates.

[Source Rev7 PDF page 156; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 158
- Compare delivery scenarios using scenario-specific boundary conditions. - Validate a contamination-control process compatible
with the assays. - Recalculate coupled thermal, structural, penetration, entry, energy, and communications performance with
uncertainties. - Update the report, requirement and constraint registers, simulator defaults, and website together after expert
review. Disposition of earlier assumptions 1.5 m sampling depth: reopen; shallow-skin sampling is a proposed alternative. 35 mm /
4 kg probe: reopen; compare against the 50 mm / approximately 2 kg IMPRESS reference. Six probes: unselected study assumption.
1 kg science allocation: unselected study assumption. 0.5 kg battery/heater/controller allocation: unselected study assumption. 450
kg parent / 250 km circular Mars orbit: candidate delivery scenario only.

Whole-probe irradiation: unselected treatment option. Ethylene-oxide-compatible glove-box assembly: reviewer proposal
requiring validation. Source register [1] Spacek, J.; Alpern, H.; Dineen, T.; Petkowski, J. J.; Rizzo, G.; Benner, S. A.; Lui, M.; Cockell, C.;
Eubanks, M.; Schulze-Makuch, D.; Temby, C.; Richburg, M. (2026). IMPRESS: A Planetary Penetrator Network for Astrobiology,
Prospecting, and Exploration of Mars. Astrobiology, 26(9), 688-699. DOI: 10.1177/15311074261471218.
https://doi.org/10.1177/15311074261471218 Attached source: 2026, Spacek, AStrobiology - published version MR-ASTJ260081(1).pdf.
Existing saved attachment ID: libfile_e9726c8ab3588191bb6c554410bcd505. [2] DOI supplied for seasonal subsurface thermal
behavior: https://doi.org/10.1029/2024GL108600 . Bibliographic metadata and detailed applicability pending verification. [3] DOI
supplied for Mars annual-mean temperatures: https://doi.org/10.1029/2009JE003462 . Bibliographic metadata and detailed
applicability pending verification.

[4] NASA NTRS document supplied for historical ethylene oxide treatment:
https://ntrs.nasa.gov/api/citations/19720013398/downloads/19720013398.pdf . Document title, authors, and applicability pending
verification. [5] Additional project/science context supplied by reviewer: https://primordialscoop.org/2026/09/15/capyr/ . Content
pending verification. [6] NASA TechPort project supplied by reviewer: https://techport.nasa.gov/projects/184149 . Project details
pending verification. Record boundary

[Source Rev7 PDF page 158; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 160
Retained website specification # FREYA Revision 4 reassessment website specification Date: 26 October 2026 Status: implemented
engineering screen; mission baseline unselected. ## Shared model src/trade.js defines geometry, mass, thermal attenuation, power,
impact and orbital examples. data/reassessment.json holds matching snapshots and source register. ## Required behavior One
kilogram science mass is fixed. Geometry, fill fractions, battery, cable and contingency are adjustable. Reject invalid geometry and
fractions. Distinguish nominal hardware, mass contingency and complete budget. Separate forebody and surface hardware.
Expose scheduled-wall and matched-wall comparisons, packaging sensitivities, power closure, sampling-depth science boundaries,
delivery alternatives, contamination options, risks, requirements and constraints.

No fitted depth or flight-success claim. No automatic sterilization or biological-detection approval. Keep the old solver archived. ##
Equations Vcavity=(msci/rhosci+Vother)/(1-fpot-ffree). L=Vcavity/(pi*d*d/4). Steel includes annular tube, hollow hemisphere, rear
cap and joints. Potting is fpot*Vcavity*rhopot. Contingency multiplies all nominal hardware. ## Files and validation Run node --test
test/reassessment.test.mjs then node scripts/build.mjs and node scripts/bundle_standalone.mjs. Report generation uses the same
exported model. Downloads must resolve and be updated together. ## Sources 1. Spacek, J.; Alpern, H.; Dineen, T.; Petkowski, J. J.;
Rizzo, G.; Benner, S. A.; Lui, M.; Cockell, C.; Eubanks, M.; Schulze-Makuch, D.; Temby, C.; Richburg, M. (2026). IMPRESS: A Planetary
Penetrator Network for Astrobiology, Prospecting, and Exploration of Mars. Astrobiology 26(9), 688–699. DOI
10.1177/15311074261471218. Attached published paper inspected.

https://doi.org/10.1177/15311074261471218 2. Spohn, T.; Müller, N.; Knollenberg, J.; Grott, M.; Golombek, M. P.; Plesa, A.-C.; Bickel, V.
T.; Morgan, P.; Krause, C.; Breuer, D.; Smrekar, S.; Banerdt, W. B. (2024). Mars Soil Temperature and Thermal Properties From
InSight HP3 Data. Geophysical Research Letters 51(18), e2024GL108600. DOI 10.1029/2024GL108600. Published paper and DLR
record inspected. https://elib.dlr.de/210686/ 3. Clifford, S. M.; Lasue, J.; Heggy, E.; Boisson, J.; McGovern, P.; Max, M. D. (2010). Depth
of the Martian cryosphere: Revised estimates and implications for the existence and detection of subpermafrost groundwater.
Journal of Geophysical Research 115, E07001. DOI 10.1029/2009JE003462. Publisher article inspected.
https://doi.org/10.1029/2009JE003462

[Source Rev7 PDF page 160; section classification: Life detection and science sampling]

Source evidence — Rev7 master page 162
supplementary tables revised 9 July 2026; byte identity with publisher file is not asserted. Author copy:
https://impressmars.com/files/preprints/impress-preprint-supplementary-tables-s1-s2-s3-2026-07-09.pdf
https://journals.sagepub.com/doi/suppl/10.1177/15311074261471218/suppl_file/sj-pdf-1-asb-10.1177_1531107426 1471218.pdf ## Two
kilogram reverse design The 50 mm reference-sized case uses a 210 mm barrel and a 345 cm3 practical cavity. Standard hardware
cannot close at 2 kg even with zero science. Reduced hardware uses a 0.15 kg battery, 2 m tether and smaller surface/deployment
allocations. Maximum science is the lesser of 2/(1+contingency) minus non-science mass and the payload envelope capacity. At
default density 2 kg/L the ceiling is 0.3085 kg, not a scientifically validated minimum. Compare energy, size, carrier mass and
impact using nominal forebody mass. ## Supplement Reference 13 identifies the publisher supplement and the saved author-
hosted copy. Its instrument volume and readiness data inform the science packaging limits; version identity is not asserted.

[Source Rev7 PDF page 162; section classification: Life detection and science sampling]
3. Penetrator geometry, structure and mass closure
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 2
FREYA Engineering Study Revision 7 Integrated report and website reconciliation. Prepared for Robert J Mills. 26 October 2026.
Preliminary concept study for human engineering review. This release integrates the complete 53-page Revision 6 artifact, the
earlier Revision 5 peer-review report, the sampling-depth and penetration justification, the updated steel-versus-carbon-fiber
study, the expert addendum, the original entry studies, the model data and the website. Original project report pages are
preserved in full as labeled annexes. Source PDFs and code are preserved in the companion evidence package. The main
conclusion is that no complete flight configuration closes all science, packaging, energy, impact, delivery, communications and
planetary-protection gates. The 1 kg science mass, 4 kg target, six probes and 45 kg entry stack are retained as requested trade
cases. They are not jointly demonstrated requirements. The 70 mm / 2.5 mm example budgets 5.488 kg; its hybrid structural
counterpart budgets 4.473 kg before resolving its collar and joint packaging. Neither meets 4 kg. Website and report: https://freya-
revision-4.abuzzpixie66.chatgpt.site . The website retains the existing calculators

and adds Revision 7 reconciliation, penetration geometry, structural comparison, entry state, relay screen, report download and
the full Revision 6 reference text. This is an AI-assisted integration and arithmetic review. Revision 6 attributes its own prior
review to Claude. Neither that attribution nor the checks in this release constitutes qualified independent human peer approval.

[Source Rev7 PDF page 2; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 5
R7T02 Tilt deg Effective inlet m Required axial travel m 0.450 0.800 0.433 0.819 0.383 0.885 0.304 1.028 Derivation R7T02. Set s=0.75
m, o=0.25 m and c=0.05 m as explicit scenarios. Convert degrees to radians. Evaluate cosine, then

z=(s-o)cos(theta)-c and s_required=o+0.55/cos(theta). No target property enters this geometric table. Carbon fiber versus steel
architecture The updated 0.75 m material study recommends tempered alloy steel for the nose and primary compression load
path; CFRP remains an option for rear or secondary structure pending tests. Revision 6 extends that proposal into a
steel-head/CFRP-barrel comparison. Both positions are retained. The numerical hybrid screen below does not supersede the
conservative steel test article recommendation. The reproduced hybrid replaces the final 20 mm of composite barrel with a steel
collar whose radial wall is twice the nominal wall. It retains the steel nose, cap and 0.120 kg joint allowance. Density is 1,580 kg/m3
for CFRP and 7,850 kg/m3 for steel. These geometry and material assumptions reproduce the Revision 6 structural masses to
printed precision. The collar intrudes into the nominal bore by about 0.00982 L for 70/2.5. Therefore equal cavity fit is not
automatic. CAD must show the collar location, loss of usable volume, adhesive and fastener volumes, load transfer and cold
mismatch. The current mass table is the reproduced screen before that packaging correction.

The 70 mm hybrid reduces nominal forebody mass from 3.520 to 2.708 kg. Relative penetration scaling is (2.708/3.520)^0.7=0.832, a
16.8% reduction under the stated equal-factor model. The sectional-density reduction itself is 23.1%, not 17%. Revision 6 section 5.9
uses 17% in one prose statement about sectional density; its table and exponent distinguish the two quantities correctly. A generic
40-60% residual compressive-strength reduction is not a design allowable for an unspecified laminate. Select grade, resin, layup,
fiber direction, joint, temperature and impact damage state. Measure cold compression-after-impact and joint response. Static
Euler margins do not address local crushing, delamination, fracture, bending, nose erosion, seals or electronic shock.

[Source Rev7 PDF page 5; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 6
R7T03 D / wall mm Steel structure kg Hybrid structure kg Budget steel / hybrid kg Depth ratio 50/1.5 1.227 0.501 5.012 / 4.105 0.832
60/2 1.422

0.636 5.255 / 4.273 0.828 70/2.5 1.608 0.796 5.488 / 4.473 0.832 Derivation R7T03. Use unchanged cavity geometry. Replace barrel
material over L-0.020 m with CFRP. Insert steel annular collar over 0.020 m with inner radius r-2t. Sum nose, rear cap, joints,
composite tube and collar. Subtract saved structural mass from forebody and nominal probe ledger. Apply 25% total margin.
Depth ratio=(hybridFore/steelFore)^0.7. Intrusion is pi[(r-t)^2-(r-2t)^2]*0.020 m3. No laminate strength allowable is assumed.
Packaging thermal and power closure

The full IMPRESS paper is now locally available. Section 3.1, printed page 691, identifies a 50 mm OD, 1.5 mm wall and 210 mm
cylinder. It describes 345 cm3 internal capacity, including 40 cm3 for core telemetry, battery and power regulation, leaving 305
cm3 theoretical science volume. The test article substitutes epoxy for science. The approximately 2 kg Mars-ready probe is a
proposed platform, not evidence that the FREYA 1 kg assay suite fits. The paper describes planned tests at 115 m/s and up to 5,200
g; those future-tense passages are not test results. Its 10,000 g accelerometer rating is a sensor range, not a certified whole-probe
survival rating. The article attributes development support to NASA TechLeap and CHiwi; that is distinct from the user-reported
Stone Aerospace SBIR proposal. The 0.3085 kg reduced payload ceiling is a FREYA inverse budget. It combines 0.345 L practical
cavity, 25% potting, 10% free space, 0.070 L ancillary volume and 2 kg/L science density. It is not the published IMPRESS science
mass. The supplementary 45 g / 124 cm3 humidity sensor occupies about 80.4% of this reduced envelope. S1 is mission heritage, S2
instrument candidates, S3 broader astrobiology concepts; these tables do not supply a jointly qualified suite.

All 16 nominal hardware lines remain in the live mass ledger. The standard 0.120 L ancillary envelope remains an optimistic
legacy input, visibly labeled. A 0.45 kg D-cell analogy requires about 0.243 L before controllers and insulation. Integer cells,
chemistry, rate, packaging and impact protection must replace the fractional-cell analogy. At 70/2.5, changing science density to 1
kg/L and ancillary volume to 0.35 L gives 7.634 kg and 686 mm. This is a stress scenario, not a probabilistic bound. Battery mass
changes do not automatically allocate volume; the site warns about that uncoupled input. For radial series conduction,
Rsoil=ln(r_far/r_outer)/(2 pi k_soil L), Rshell=ln(r_outer/r_inner)/(2 pi k_shell L), and Q=DeltaT/(Rsoil+Rshell). With ksoil=0.039 W/m
K, rfar=0.5 m and DeltaT=50 K, the 70 mm steel case loses 1.32436 W and the CFRP case 1.32259 W through the barrel-only path.
Shell conductivity changes by roughly 56 times, but total loss changes only about 0.13% in this soil-limited scenario. Endcaps,
tether, radiation, contact, transient effects and insulation are excluded. Electrical energy closure is E=sum(P_i times duty_i times
duration)+startup, with battery mass E/(usable Wh/kg). The legacy 1.5 W and 5 Wh startup assumptions give 41.7 h with 0.45 kg at
150 Wh/kg, or 185 Wh / 1.233 kg for

120 h. The warmed 130 Wh profile in Revision 6 is a different assumed duty cycle, not interchangeable with 185 Wh. Avoid double-
counting heater loss already included in an average electrical load. No biological response duration is guaranteed.

[Source Rev7 PDF page 6; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 11
Appendix R7 B Pages 17 to 18 Inverse 2 kg budget Use 50/1.5, L=.210 m and .345 L practical cavity; sum reduced and standard
hardware separately. Maximum science=min(2/(1+c)-nonScience,[(.345*.65)-Va]*rhoScience), floored at zero. Report failure if
nonScience alone exceeds budget. Not a minimum scientific suite. Table regions covered: R6P17T01 Non-science item | Standard
kg | Reduced kg; R6P18T01 Non-science item | Standard kg | Reduced kg; R6P18T02 Factor | Reduced reference case | One
kilogram science case; R6P18T03 Supplement datum [13] | Implication for this trade Appendix R7 B Pages 19 to 21 Steel and
composite comparison Use R7T03 steps; retain steel nose/cap/joints; replace 20 mm tube segment with double-wall steel collar; use
1580 kg/m3 composite over remaining length. Compare forebody m/A, depth ratio exponent .7, and 60 GPa composite Euler screen.
Check collar intrusion. Material allowable and damage knockdown remain unqualified. Table regions covered: R6P19T01
Supplement datum [13] | Implication for this trade; R6P19T02 Candidate | Decision | Rationale | Reopen if; R6P19T03 Property |
Value used | Basis and class; R6P20T01 Property | Value

used | Basis and class; R6P20T02 Geometry | Steel struct. kg | Hybrid struct. kg | Structure saved | Steel fore kg | Hybrid fore kg |
m/A steel; R6P21T01 Concern | Why it matters for a penetrator | Source; R6P21T02 Decision | Recommendation | Reopen if
Appendix R7 B Pages 22 to 23 Science thermal attenuation and biological analogs For thermal depth use delta=sqrt(alpha*P/pi) and
fraction exp(-z/delta). Biological rates are transcribed organism-specific observations; do not extrapolate to hypothetical Mars
biology or a universal detection limit. Table regions covered: R6P22T01 Sampling option | Science value | Engineering
consequence | Reviewer note; R6P23T01 Sampling option | Science value | Engineering consequence | Reviewer note; R6P23T02
Temperature | Observation | Source | Implication for FREYA Appendix R7 B Pages 24 to 25 Thermal operating modes Barrel-only
side loss uses radial soil resistance. Insulation and warm-up use the stated geometry, k, mass, heat capacity and DeltaT
assumptions. Add relevant paths; separate power from energy. Correct shell-versus-soil

inference with series resistance in this release. Table regions covered: R6P24T01 Difuf sivity α | Year skin depth m | Remnant at
1.5 m | Sol skin depth cm | Remnant at 10 cm | Class; R6P24T02 Soil conductivity k, W/m K | 70 mm barrel (287 mm) | IMPRESS-
size barrel (210 mm, 50 mm) | Comment; R6P25T01 Radial insulation thickness | Loss at k = 0.015 | Loss at k = 0.005 | Energy over
5 days at k = 0.005; R6P25T02 Mode | Thermal state | Power implication | Planetary-protectoi n note Appendix R7 B Pages 26 to 27
Power duty cycle Energy=mean power*hours+startup. Runtime=(batteryMass*usableWhPerKg-startup)/meanPower. For the 130
Wh profile sum each printed time-duty row. Do not substitute the 1.5 W continuous profile without recomputing. Table regions
covered: R6P26T01 Mode | Thermal state | Power implication | Planetary-protectoi n note; R6P26T02 Runtime from 0.450 kg batet
ry, hours (days) | 0.1 W | 0.25 W | 0.5 W | 1.0 W | 1.5 W; R6P26T03 Battery mass for

[Source Rev7 PDF page 11; section classification: Penetrator geometry, structure and mass closure]
Source evidence — Rev7 master page 17
FREYA Engineering Study Revision 6 — consolidated peer-reviewed edition Prepared for Robert J Mills • 26 October 2026 •
Supersedes Revision 5 PEER REVIEW · MAJOR Everything here is a trade variable. All dimensions, wall thicknesses, masses, the
subsystem allowances, the forebody and aftbody split and the structural architecture are open to the trade study. The 70 mm / 2.5
mm ledger is a worked example of the model, not a baseline, and each allowance in it is itself subject to trade. Peer-review findings
that flag an unsupported value (for example the science density and ancillary volume) mean that the input is not yet bounded, not
that a particular replacement number is required. NOTE Status. Preliminary engineering trade study. No hardware configuration
is flight qualified. The peer review in this revision was performed by Claude (an AI assistant): an independent recalculation, source
check and consistency review. It is intended to make the work of human reviewers faster and better targeted. It does not replace
review by qualified structures, thermal, power, communications, planetary-protection and astrobiology experts. How to read this
revision

Revision 4 is preserved in substance. Its numbers were independently recomputed and, with one rounding correction, they hold.
What changed is (a) every claim is now annotated with the result of the review, (b) the assumptions, data justification and sources
are expanded so a human can trace each number to its origin, (c) the trade study is restructured into a single decision path with
explicit criteria, and (d) feasibility screens and mission-planning material were added where Revision 4 left gaps that matter for
planning. Mark Meaning PEER REVIEW · MAJOR A finding that changes a decision, invalidates a stated claim, or exposes an
internal inconsistency. PEER REVIEW · MODERATE Needs correction, qualification or additional evidence, but does not by itself
change the shortlist. PEER REVIEW · MINOR

Editorial, rounding or presentation. VERIFIED Independently reproduced from stated inputs, or confirmed against a located
source. ADDED New analysis or content added during the peer-review cycle (Revisions 5–6); not present in Revision 4. Evidence
classes used throughout: S sourced (value taken from a cited source), D derived (calculated from other values), E engineering
estimate (assumption with no source), U user-directed (given by the customer), X unverified (could not be checked in this review).
Identifiers: PR-nn peer-review finding, D-nn decision, A-nn assumption, R-nn risk, [n] reference in Section 18. Part Sections
Purpose A

1 Executive summary • 2 Peer review What the study concludes, what must be decided, and what the review found. B 3 Mission
context and study basis • 4 Assumptions and data justification Why the study exists, heritage comparisons, figures of merit, and
every assumption with its source and sensitivity. C 5 Trade study One decision path: options, model, results, sensitivity, screens,
ranking, decision record, 2 kg boundary case. D 6 Science • 7 Thermal • 8 Power • 9

Communications • 10 Structure and impact • 11 Entry and delivery • 12 Planetary protection Subsystem feasibility screens that
bound the trade. E 13 Mission planning • 14 Requirements • 15 Risks • 16 Next steps • 17 Open questions What planners can use
now: opportunities, scenarios, gates, requirements, risks and sequencing. Preliminary. No hardware configuration is flight
qualified. Prepared for Robert J Mills, 26 October 2026 Page 1

[Source Rev7 PDF page 17; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 28
ID Assumption and value Clas s Justification and source If wrong Retire by A-29 Planetary-protection category X Not assumed.
Assigned by the mission authority [10] [31][34]. See §12. Sets bioburden endpoints and

process. D-01 A-30 Special Region screen: T ≥ 255 K and aw > 0.60, with conservative −28 °C and aw ≥ 0.5 carried by NASA and
NASEM S SR-SAG2 as summarized in [33]; NASEM and NASA OPP slides [32]. A warmed assay may trigger Category IVc questions.
G0

A-31 Replication X Six nodes is a scenario. No power analysis exists. Statistical power unknown. G1 PART C TRADE STUDY 5 Trade
study PEER REVIEW · MAJOR PR-02 Revision 4 spread the trade over an unnumbered preface and Sections 1 and 4–7 and never
stated its criteria. This section replaces them with one decision path: question, options, model, results, sensitivity, screens, ranking,
decision record, and the 2 kg boundary case. 5.1 Question, options and method Question. With the science mass fixed at 1 kg, which
outer diameter and wall schedule should be carried into CAD and impact

testing, and what does that choice imply for mass, length, penetration, heat loss and delivery? Options. Six equal-volume
geometries (35/1.5, 50/1.5, 50/2, 60/2, 70/2.5 and 80/3, outer diameter mm / wall mm) plus the 2 kg reduced-scope boundary case
(§5.6). Method. (1) Fix the cavity volume from science volume plus ancillary volume. (2) Size the steel chassis, potting and the
ledger. (3) Compute the seven figures of merit. (4) Apply hard screens. (5) Rank survivors under five weight sets to test robustness.
(6) Record the decision and the conditions that would reopen it. 5.2 Mass and volume model, and an illustrative ledger Equations
are unchanged from Revision 4 and were reproduced independently. D is outer diameter, t wall thickness, d = D − 2t, L the
cylindrical barrel length. Vcavity = (V_science + V_ancillary) / (1 − f_potting − f_reserved) = (0.500 + 0.120) / (1 − 0.25 − 0.10) =
0.954 L L = Vcavity / (π d² / 4)   m_tube = ρ_steel π (D² − d²) L / 4 m_nose = ρ_steel (2π/3) [(D/2)³ − (d/2)³]     m_cap = ρ_steel π
D² (0.005) / 4

m_steel = m_tube + m_nose + m_cap + 0.120 kg         m_potting = ρ_epoxy × 0.25 × Vcavity L_envelope = L + D/2 + 0.005 m + 0.020 m
Budget = Nominal × (1 + contingency) Hardware Location Nominal kg Class Basis Science package Forebody 1.000 U Customer
direction (A-01) Steel tube

Forebody 1.196 D 70 mm, 2.5 mm wall, 287 mm barrel Steel hemispherical nose Forebody 0.141 D Hollow, constant wall Steel rear
cap 5 mm Forebody 0.151 D

Full-diameter cap Steel joints and cage Forebody 0.120 E Allowance (A-09) Potting Forebody 0.262 D/S 1.10 kg/L × 25 % × 0.954 L
(A-10) Battery Forebody

0.450 E Short-duration allowance (A-12) Heaters, controller and memory Forebody 0.120 E Allowance Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 12

[Source Rev7 PDF page 28; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 30
Figure 1. Equal-volume forebody envelopes compared with the DS2 forebody and the IMPRESS reference envelope. Basis: reviewed
model; DS2 geometry from [20]; IMPRESS envelope modeled in Rev 4 (260 mm), not measured. Figure 2. Complete probe budget
mass by diameter and scheduled wall thickness. Basis: reviewed model. Replaces Rev 4 Figure 3, whose legend overlapped the bars
(PR-25). 5.4 Sensitivity One-at-a-time sensitivity on the 70/2.5 case shows which inputs matter. The ranges are scenario envelopes,
not confidence intervals. Science mass is fixed by the customer but is shown because it is the largest lever. Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 14

[Source Rev7 PDF page 30; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 35
Supplement datum [13] Implication for this trade Microseismometer 12 cm³ example Small volume does not establish integrated
mass. Larger metabolic packages and complex organic analysis Do not presume a complete assay fits either allocation. Obtain
supplier concept designs and compare detection limits, controls, replication and duration. The supplement is held as an author-
hosted copy revised 9 July 2026. The publisher PDF was read through indexed retrieval, and its direct download returned HTTP
403, so version identity is not asserted. 5.8 Decision record Candidate Decision Rationale

Reopen if 35/1.5 Reject Fails S1–S3: Euler margin 0.87 / 0.29; envelope 1,229 mm; L/D 35. Highest sectional density (3,701 kg/m²)
does not offset this. Instrument is needle-like and FEA with soil support shows margin of 3 or more. 50/1.5 Carry as comparator
Lightest (5.012 kg); closest to published geometry; 600 mm long; Euler margin 4.4 at 3× load. Package is long and thin, or mass

dominates. 50/2 Hold Dominated by 50/1.5 on mass and by 60/2 on mass and length. FEA shows 1.5 mm wall is inadequate. 60/2
Carry (primary) Top three in all weight sets; 5.255 kg; 442 mm; margin 18 at 3× load; sectional density 1,179 kg/m². Package needs a
bore above 56 mm. 70/2.5 Carry (primary)

Rank 2–3 throughout; 5.488 kg; 347 mm; bore 65 mm; lowest slenderness among the primaries. Penetration depth is insufficient at
feasible speed (sectional density 915 kg/m²). 80/3 Hold Wins only when bore dominates; heaviest (5.728 kg); lowest sectional
density. CAD shows a bore above 65 mm is required. VERIFIED This is the same shortlist as Revision 4 (60–70 mm for packaging,
50 mm as comparator, 35 mm rejected), now supported by explicit screens and robust ranking. It remains conditional on D-04: if
the science package is less dense than about 1.5 kg/L, the 70 mm envelope exceeds 425 mm and every absolute number in this
section moves.

5.9 Structural-architecture option: steel head with composite body ADDED This comparison was added at the requester's direction.
It is a materials-and-architecture trade for the forebody, run on the same shortlist geometries. Like everything else in this study the
result is a screen, not a selection: the composite properties, the joint design and the collar mass are assumptions (Section 4), and
only a coupled structural, thermal and impact analysis with coupon and drop-test data can decide the question. Two forebody
architectures are compared. The unibody steel chassis is the Revision 4 baseline: one hardened low-alloy steel body forms the
nose, barrel and rear cap, so there is no structural joint in the load path. The steel head with composite body keeps a steel
penetration nose, a steel rear cap and a steel collar at the nose-to-barrel joint, and replaces the cylindrical barrel with a carbon-
fibre-reinforced polymer (CFRP) tube. The idea is to remove parasitic structural mass from the barrel, which carries much of the
steel in the unibody, while keeping dense steel where impact loads and penetration performance are concentrated, at the nose.
Assumptions for the composite case Property
Value used Basis and class CFRP laminate density 1,580 kg/m³ Typical quasi-isotropic laminate [49] (S) Effective (quasi-isotropic)
modulus 60 GPa Between unidirectional E₁₁ ≈ 131 GPa and transverse ≈ 8 GPa [49]; used for the buckling screen (E) Through-wall
thermal conductivity 0.8 W/m·K Perpendicular-to-fibre value ≈ 0.8 W/m·K; parallel ≈ 7 W/m·K [50]; steel is 44.5 W/m·K [7] (S)

Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 19

[Source Rev7 PDF page 35; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 36
Property Value used Basis and class Barrel geometry Same OD, bore and length as the steel case Drop-in swap so the payload cavity
is unchanged (E) Steel collar at the nose joint 20 mm long, double wall, at the nose-to-barrel interface, plus the existing 0.120 kg
joint allowance Load-transfer and bearing ring; mass estimate only (E)

Compressive strength knock-down after impact Not modelled; flagged qualitatively Reported 40–60 % loss of compressive residual
strength after impact [51][52] (S) Mass, sectional density and buckling Geometry Steel struct. kg Hybrid struct. kg Structure saved
Steel fore kg

Hybrid fore kg m/A steel / hybrid Penetratio n Euler 3× steel / hybrid Budget steel / hybrid kg 50/1.5 1.227

0.501 0.726 (59 %) 3.139 2.414 1599 / 1229 −17 % 4 / 2 5.01 / 4.10 60/2.0 1.422 0.636 0.786 (55 %) 3.334

2.548 1179 / 901 −17 % 18 / 8 5.26 / 4.27 70/2.5 1.608 0.796 0.812 (50 %) 3.520 2.708 915 / 704 −17 %

56 / 24 5.49 / 4.47 "Structure" is nose plus barrel plus cap plus joint hardware (and collar for the hybrid); it excludes potting,
battery, science and electronics. "Penetration" is the ratio of hybrid to steel sectional density raised to the 0.7 power, the exponent
in the Young/Sandia scaling (Section 10.3). Budget is the complete probe at 25 % contingency. The composite barrel governs the
Euler column, so its margin uses the 60 GPa modulus. Figure 12. Steel unibody versus steel-head/CFRP-body: structural mass (left)
and sectional density (right) for the shortlist geometries. Basis: reviewed model with the composite assumptions above. The dashed
line on the right marks the unibody sectional density a composite body would need ballast to reach. What the numbers say • The
composite body saves real structural mass: 0.73 kg at 50/1.5, 0.79 kg at 60/2 and 0.81 kg at 70/2.5, which is 50–59 % of the structural
mass and about 0.9–1.0 kg off the complete probe budget. The 70/2.5 budget falls from 5.49 kg to about 4.47 kg.

• But the steel head dominates the hybrid: the steel nose, cap and collar are 62–72 % of the hybrid's structural mass, so the
composite only lightens the barrel, and the heavier and wider the bore, the larger the steel fraction. • Sectional density falls by
about 17 %, because the forebody is lighter over the same frontal area. In the Young/Sandia scaling that is roughly a 17 % loss of
penetration depth at a given speed (Section 10.3). For a kinetic penetrator, lightening the body works directly against its purpose.
Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 20

[Source Rev7 PDF page 36; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 67
Claim in this report Value Class Source and status DS2 design shock loads 30,000 g forebody; 80,000 g aftbody S [18] (excerpt) DS2
aeroshell fraction 1.165 / 3.572 = 32.6 % S [20] (secondary)

Cell-level specific energy, Li/SOCl2 and Li/CFx 421; 730–741 Wh/kg S [23] (partial) D-size Li/SOCl2 cell size and mass 54 cm³; 100 g
S/D [24] (verified) AX100 mass, size, temperature range 24.5 g; 65 × 40 × 6.5 mm; −30 to +85 °C S [9] (verified)

Electra transmit power and noise figure 5 W; 4.9 dB S [28] (verified) Proximity-1 UHF frequencies 401.585625 / 437.1 MHz S [29]
(verified) Relay orbiters and data volumes Four orbiters; MAVEN ended 3 Jun S [26] (verified) Microbial doubling times at low
temperature

1 d (5 °C); 20 d (−10 °C); 160 d (−20 °C) S [35] (verified) Planetary-protection category limits 3×10⁵ spores; 300/m²; 30 spores S [31]
(partial) Special Region thresholds 255 K and aw > 0.60; conservative 245 K and 0.5 S [32], [33] (partial)

Wrought 4340 strength and toughness range Yield 740 → 1,125 MPa while Charpy 42 → 9 J (U to Z) S [45] (verified) Euler margins;
side loss; link margin; terminal speed; entry state Sections 5.3, 7, 9, 11 D Reviewer calculations from the inputs above Contingency
policies and component mix 25 %, 30 %, 23.0 %

E Policy examples; mix is reviewer assumption Appendix A Model inputs and reproducibility Parameter Value Provenance
Science mass 1.000 kg User instruction (U) Science envelope density 2.0 kg/L Packaging assumption; challenged (PR-31)

Other internal envelope 0.120 L Aggressive allowance; challenged (PR-32) Potting / reserved volume 25 % / 10 % Packaging
assumptions Potting density 1.10 kg/L Rounded resin analog [8] Steel density 7,850 kg/m³ Material analog [7][45] Nose / rear cap
Hollow hemisphere / 5 mm Geometry assumptions Steel joints and cage 0.120 kg Allowance Battery; usable energy 0.450 kg; 150
Wh/kg Brief-mode assumption; derated screening assumption Cable 5 m at 10 g/m Custom tether allowance Contingency 25 % of all
nominal mass

Preliminary growth allowance Contingency is not installed ballast and does not enlarge the modeled cavity. If growth adds
hardware or battery volume, recompute geometry as well as mass. Sensitivity bands are scenario envelopes, not confidence
intervals; low and high values must not be presented as statistical bounds. Rev 4 scenario example for 70/2.5, recomputed. Low
packaging demand (3 kg/L, 20 % potting, 10 % free): cavity 0.648 L, envelope 255 mm, nominal 3.886 kg, budget 4.858 kg. High
demand (1 kg/L, 30 % potting, 10 % free): cavity 1.867 L, envelope Preliminary. No hardware configuration is flight qualified.
Prepared for Robert J Mills, 26 October 2026 Page 51

[Source Rev7 PDF page 67; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 68
623 mm, nominal 5.889 kg, budget 7.361 kg. Matched 2 mm wall: 50 mm 624 mm and 5.494 kg; 60 mm 442 mm and 5.255 kg; 70 mm
339 mm and 5.128 kg. Core model (Python, as used for the review) import math RS, RE = 7850.0, 1100.0                      # steel and
potting density, kg/m3 def design(D, t, sci=1.0, rho_sci=2.0, anc=0.120, pot=0.25, res=0.10, batt=0.450, cont=0.25, heater=0.120,
harn=0.080, samp=0.150, xcvr=0.100, ant=0.060, cable=0.050, spool=0.060, aft=0.200, drogue=0.250, joints=0.120): d = D - 2*t V =
(sci/rho_sci + anc) / (1 - pot - res)        # litres L = (V/1000) / (math.pi*d**2/4)               # barrel length, m tube =
RS*math.pi*(D**2 - d**2)*L/4 nose = RS*(2*math.pi/3)*((D/2)**3 - (d/2)**3)

cap = RS*math.pi*D**2*0.005/4 steel = tube + nose + cap + joints epoxy = RE*pot*V/1000 fore = sci + steel + epoxy + batt + heater +
harn aftb = samp + xcvr + ant + cable + spool + aft + drogue nom = fore + aftb; env = L + D/2 + 0.005 + 0.020 return dict(V=V, L=L,
steel=steel, fore=fore, nom=nom, tot=nom*(1+cont), env=env) Other screening formulas Side loss: Q = 2 pi k L dT / ln(r_far /
r_body)      (r_far = 0.5 m, dT = 50 K) Euler:    P_cr = pi^2 E I / L_col^2, I = pi (D^4 - d^4)/64, L_col = barrel + D/2, E = 205 GPa
Impact:     a = v^2 / (2 s); F_avg = m_fore a (100 m/s, 0.5 m) Link:      EbN0 = EIRP + Gr - FSPL - L - (k + 10 log Tsys) - 10 log R; FSPL =
20 log10(4 pi

d / lambda) Entry:       H = r v; v_EI = sqrt(2(E + mu/r_EI)); cos(gamma) = H / (r_EI v_EI) Drogue:     v_t = sqrt(2 m g / (rho Cd A))
Closure:    M_entry = N m_probe / (1 - f) A script that reproduces every number in Sections 2.2, 5, 7–11 accompanies this report
(FREYA_Rev5_review_calcs.py). Appendix B Website specification and artifact inventory (carried from Revision 4) Revision 4
describes a browser-local engineering workspace built on the same model (src/trade.js), with a custom geometry designer, six
scheduled-wall alternatives, mass ledger, packaging sensitivity, thermal and battery calculators, impact screen, orbital example,
requirements, constraints, risks and a source register; exports in JSON and CSV; and acceptance checks for mass arithmetic, cavity
algebra, matched-wall sensitivity, fraction validation, contingency scaling, thermal attenuation, battery closure, orbital arithmetic,
impact energy, export schemas and mobile layout. The site and its source were not audited in this review (PR-26). The report
equations were re-implemented independently and agree with every printed value.

Suggested website updates arising from this review: add the conductivity sweep and insulation screen (§7), the duration– power
map (§8), the Euler screen and weight-set ranking (§5), the entry-state table and closure condition (§11), the link- margin table (§9),
and a visible evidence-class and source-status field on every input. Supporting artifacts named in Revision 4:
Freya_Engineering_Study_Revision_4.docx, FREYA_Website_Specification_Revision_4.md, Freya_Sites_Standalone_Revision_4.html,
Freya_ChatGPT_Sites_Project_Revision_4.zip, FREYA_Penetrator_Trade_Revision_4.csv and FREYA_Trade_Study_Revision_4.json.
This revision adds FREYA_Rev5_review_calcs.py. No flight-ready design, biological finding, mission-authority approval, supplier
quotation or delivered hardware is asserted. Preliminary. No hardware configuration is flight qualified. Prepared for Robert J
Mills, 26 October 2026 Page 52

[Source Rev7 PDF page 68; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 77
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 8 4 Architecture and
physical packaging The published IMPRESS architecture [1] provides the reference: 50 mm outer diameter, 1.5 mm wall, a 210 mm
longitudinal cylinder, a 345 cm3 internal cavity and approximately 2 kg for a Mars-ready forebody plus aftbody. Its field-test article
and future Mars-ready configuration are distinct. Planned development and test statements in the paper are not treated here as
completed flight qualification. FREYA departs from that reference because the requested science mass has no supplied CAD
volume. The baseline assumes science-envelope bulk density 2.0 kg/L, hence 0.500 L for 1 kg. Add 0.120 L for tightly packaged
battery, controls and internal harness. Potting occupies 25 percent of total cavity and reserved integration space occupies 10
percent. Therefore Vcavity = (0.500 + 0.120) / (1 - 0.25 - 0.10) = 0.954 L. The 0.120 L ancillary envelope is aggressive: a 0.450 kg
battery and its support can consume much of it. It is not derived from a selected cell design. The dense science package could also
be too wide for the chosen bore. CAD must establish cross-

sections, connector access, pressure boundaries, reagent containers, thermal insulation and manufacturability. Cylindrical volume
closure is necessary but insufficient. Figure F02 Equal-volume forebody envelopes compared with the reference cylinder length
For science density 1.0, 2.0 and 3.0 kg/L, cavity demand becomes approximately 1.723, 0.954 and 0.697 L respectively. A 70 mm
body with 2.5 mm wall then has total envelope lengths about 579, 347 and 270 mm. This sensitivity is larger than many component
mass adjustments. The website exposes density, internal allowance and fill fraction.

[Source Rev7 PDF page 77; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 78
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 9 5 Steel chassis and
potting mass model Candidate material is hardened and tempered 4340-class low-alloy steel. Density 7850 kg/m3 is used [7]. The
trade does not specify a final hardness or heat-treatment cycle. Maximizing hardness can sacrifice toughness. Procurement
condition, cold- temperature fracture, weld or threaded-joint strength, corrosion control and assay contamination must govern the
final choice. Let D be outer diameter, t wall thickness, d = D - 2t and L the cylindrical barrel length. The hemispherical nose is
hollow with constant radial wall thickness. Its cavity is deliberately not credited as usable payload volume. A 5 mm full-diameter
rear cap and 0.120 kg of joints, fasteners and cage are included. Twenty additional axial millimeters provide a geometric
integration allowance without extra usable volume. L = Vcavity / (π d² / 4) mtube = ρsteel π (D² - d²) L / 4

mnose = ρsteel (2π/3) [(D/2)³ - (d/2)³] mcap = ρsteel π D² (0.005 m) / 4 msteel = mtube + mnose + mcap + 0.120 kg mepoxy = ρepoxy ×
0.25 × Vcavity Lenvelope = L + D/2 + 0.005 m + 0.020 m Potting density is assumed to be 1.10 kg/L. The EPO-TEK 301-2 component
densities and mix ratio [8] give a pre-cure mixture estimate near 1.09 kg/L. This is an analog, not selection of that resin or a cured
density measurement. The resulting potting mass is 0.262 kg. Low shrinkage, gas release, coefficient mismatch, sample chemistry,
sterilant uptake and cold shock response require dedicated tests. The model gives the 70 mm steel assembly 1.608 kg, including
tube, nose, cap and joints. This replaces the previous undifferentiated 2 kg structure-and-potting bucket. Nose geometry can
change penetration and mass; a solid nose, ogive, thicker tip or internal ribs must be added explicitly rather than treated as free
reinforcement. At equal volume and a common 2 mm wall, calculated complete budget masses at 50, 60 and 70 mm are
approximately 5.49,

5.26 and 5.14 kg. The scheduled-wall 70 mm case is heavier because it uses 2.5 mm walls. This prevents attributing every mass
difference to diameter alone. The interactive custom design permits matched-wall comparisons.

[Source Rev7 PDF page 78; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 79
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 10 6 Complete probe
mass ledger Table T06 Complete nominal mass ledger and contingency Hardware Location Nominal kg Science package Forebody
1.000 Steel tube Forebody 1.196

Steel hemispherical nose Forebody 0.141 Steel rear cap 5 mm Forebody 0.151 Steel joints and cage Forebody 0.120 Potting
Forebody 0.262 Battery

Forebody 0.450 Heaters controller and memory Forebody 0.120 Forebody harness and seals Forebody 0.080 Sample acquisition
hardware Surface head 0.150 Transceiver and mounting Aftbody

0.100 Antenna radiator Aftbody 0.060 Cable or tether Aftbody 0.050 Cable spool and strain relief Aftbody 0.060 Surface aftbody
structure Aftbody 0.200

Drogue risers and separation Aftbody 0.250 Nominal hardware All 4.390 Mass contingency 25 percent Unallocated 1.098 Complete
probe budget All 5.488 The 1 kg science package includes the experiment instruments and experiment-specific reagents and
chambers; their

existence and fit are not yet demonstrated. Common radio, general controller, heater, battery and deployment hardware are
separate. If the science vendor includes these functions, reconcile the ledger to remove duplicates. The cable allowance is 5 m × 10
g/m = 0.050 kg, plus 0.060 kg spool and strain relief. This is a custom design estimate, not a purchased cable specification. It must
cover conductor, insulation and strength-member allocation. Electrical loss, bend radius, low-temperature payout and transient
tension remain open. A heavier RF cable or longer tether changes the budget directly. The preferred reference has the transceiver
and exposed antenna on the surface aftbody, with a power/data tether to the forebody. If the radio is instead buried, the tether
becomes an RF feed and attenuation, connectors, impedance and bend radius must be re-sized. A surface antenna is not the same
component as the cable spool, and neither is assumed to be integrated into parachute fabric.

[Source Rev7 PDF page 79; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 80
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 11 7 Weight and
diameter trade results Figure F03 Complete probe mass by diameter and scheduled wall thickness Table T07 Slenderness and
frontal area trade Design L over D Forebody kg Mass per area kg/m2 Assessment 35/1.5 35.1 3.56

Very slender 50/1.5 12.0 3.14 Long thin reference derivative 50/2 12.5 3.53 Long stronger-wall screen 60/2 7.4 3.33

Lower-mass shortlist 70/2.5 5.0 3.52 Compact shortlist 80/3 3.6 3.71 Wider heavier option The 60 mm / 2 mm case is 0.19 kg lighter
nominal than 70 mm / 2.5 mm, but its envelope is about 95 mm longer. The 70 mm bore allows larger component cross-sections
and lowers slenderness; it also increases frontal area and can reduce penetration at otherwise equal conditions. The 80 mm option
buys a shorter barrel at increased steel and frontal-area cost. None dominates every objective.

The 50 mm / 1.5 mm case is the lightest of these scheduled-wall concepts. Its enlarged length is about 600 mm rather than the
reference 210 mm cylinder, and its stiffness and impact response are unknown. It should remain a test comparator rather than
being declared infeasible solely by this screen. Instrument geometry and cold impact testing may change the shortlist.
Recommendation: obtain the actual 1 kg science CAD envelope, then compare 50, 60 and 70 mm at equivalent structural safety
margins. Use 60–70 mm for preliminary packaging work. Do not freeze a numerical optimum before specifying the assay, sampler,
battery duration and mechanical verification criteria.

[Source Rev7 PDF page 80; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 86
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 17 Table T12 Design
constraints and model boundaries ID Study constraint or boundary C01 Science mass fixed at 1 kg for this trade; science volume is
unknown C02 Baseline packaging assumes 0.500 L science envelope and 0.120 L other forebody hardware C03 Potting occupies 25
percent and reserved space 10 percent of cavity volume

C04 Steel density 7850 kg/m3; hemisphere and cap mass retained; no hidden structural allocation C05 Cable allocation assumes 5 m
at 10 g/m; spool and strain relief are additional C06 Battery allocation 0.450 kg is a short-duration case, not a mission requirement
C07 No flight survival probability or qualified wall thickness follows from this trade C08

No mandatory 1.5 m sample depth, six-probe count or 450 kg delivery bus C09 No selected assembled-probe irradiation or ethylene
oxide procedure C10 Low-conductivity dry soil assumptions cannot represent ice or competent rock C11 Contingency covers mass
growth; it cannot replace missing power or experiment subsystems C12 Existing public website audience is retained; no private-
access claim is made

[Source Rev7 PDF page 86; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 91
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 22 Appendix A Model
inputs and reproducibility Table T15 Baseline input and provenance summary Parameter Value Provenance Science mass 1.000 kg
Current user instruction Science envelope density 2.0 kg/L Packaging assumption

Other internal envelope 0.120 L Aggressive allowance Potting / free volume 25% / 10% Packaging assumptions Potting density 1.10
kg/L Rounded resin analog [8] Steel density 7850 kg/m3 Material analog [7] Nose / rear cap

Hollow hemisphere / 5 mm Geometry assumptions Steel joints and cage 0.120 kg Allowance Battery 0.450 kg Brief mode
assumption Usable battery energy 150 Wh/kg Derated screening assumption Cable 5 m at 10 g/m

Custom tether allowance Contingency 25% of all nominal mass Preliminary growth allowance Contingency is not installed ballast
and does not enlarge the modeled cavity. If growth adds hardware or battery volume, recompute geometry as well as mass.
Sensitivity bands are scenario envelopes, not confidence intervals. Low and high values must not be marketed as statistical
bounds. Scenario example for 70 mm: low packaging demand uses science density 3 kg/L, 20% potting and 10% free space; high
demand uses 1 kg/L, 30% potting and 10% free. Recalculate the cavity, barrel, chassis and potting for each case. The website
implements this uncertainty comparison together with adjustable contingency and battery duration. It does not resolve component
CAD or survival.

[Source Rev7 PDF page 91; section classification: Penetrator geometry, structure and mass closure]
Source evidence — Rev7 master page 92
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 23 Appendix B Website
specification The rebuilt website is a browser-local engineering workspace using the same src/trade.js model exported to this
report. It provides a custom geometry designer, six scheduled-wall alternatives, mass ledger, packaging sensitivity, thermal-wave
and battery calculators, impact screen, orbital example, requirements, constraints, open risks and source register. A schematic
forebody/tether/aftbody animation explains sequence without claiming a flight trajectory. Controls include science density,
internal hardware volume, potting and reserved fractions, steel wall and diameter, cable length and linear mass, battery mass,
usable specific energy and contingency. Geometry changes update the explicit geometry model; increasing battery mass does not
automatically increase its ancillary volume. The reviewer must revise that volume separately. Power closure and mass closure are
separate. Science mass is fixed at 1 kg in the main controls. The website distinguishes reference facts from estimates. Six probes
and a 45 kg capsule are adjustable scenario comparisons only. It displays the remaining carrier budget and comparison against the
inherited 21 kg placeholder. Direct arrival produces

a separate-input-required message instead of reusing orbital numbers. Radiation and gas treatment remain unselected options. A
model calculation never marks a contamination gate closed. Exports include current custom design and ledger as JSON, the trade
table as CSV, the full report and the source specification. Tables support narrow screens through local scrolling. All controls have
labels. No API key, login or external data service is needed for calculations. Website access remains at the existing public address.
Acceptance checks: mass arithmetic; cavity algebra; matched-wall sensitivity; science volume and fraction validation; zero cable
mass at zero length; contingency scaling; thermal attenuation; battery duration and energy closure; orbital arithmetic; impact
energy and g; export schemas; required downloads and source links; mobile browser layout and interaction review where preview
infrastructure is available.

[Source Rev7 PDF page 92; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 97
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 28 A012 Diameter and
wall schedule 1. Input: 35/1.5; 50/1.5; 50/2; 60/2; 70/2.5; 80/3 mm (Engineering judgment). 2. Basis: trade function; only 50/1.5 comes
from [1] 3. Logic: Select six screening geometries; hold payload volume equal and compute barrel length. 4. Review: Different walls
confound diameter-only effects; compare common walls before optimization. A013 Round bore 1. Input: d = D - 2t (Geometry
idealization). 2. Basis: Concentric circular tube model; no CAD 3. Logic: Subtract radial wall twice; use unobstructed bore area
πd²/4. 4. Review: Ribs, threads, sleeves and port bosses reduce usable area. A014 Barrel length

1. Input: V divided by bore area (Calculated). 2. Basis: Cavity algebra and round-bore entries 3. Logic: Convert liters to m3; L =
V/(πd²/4); no nose cavity is counted as payload. 4. Review: Check local cross-sections and manufacturability. A015 Nose shape 1.
Input: Hollow hemisphere with same radial wall (Geometry idealization). 2. Basis: [1] describes blunt hemispherical reference;
thickness extrapolation is this model 3. Logic: Compute hemisphere shell as outer hemisphere volume minus inner hemisphere
volume. 4. Review: Not a solid tip or qualified penetrating geometry. A016 Rear cap 1. Input: 5 mm full-diameter steel disc
(Engineering judgment). 2. Basis: No closure drawing; design function cap term 3. Logic: Use cap volume πD²h/4 with h = 0.005 m;
no bolt holes are deducted.

4. Review: Cap overlap, threads and joining strength require detailed design. A017 Integration length 1. Input: 20 mm additional
axial allowance (Engineering judgment). 2. Basis: No interface drawing; model envelope expression 3. Logic: Add 0.020 m after
barrel, nose axial radius and 5 mm rear cap. 4. Review: Allowance is geometrical; no separately calculated mass is added for it.
Confirm existing joints allocation covers its hardware.

[Source Rev7 PDF page 97; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 98
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 29 A018 Nose volume
credit 1. Input: Zero usable payload credit (Conservative packaging convention). 2. Basis: design function; not a measured volume
3. Logic: Size the cylindrical barrel for the full computed cavity; retain hollow nose mass separately. 4. Review: Can overestimate
required length; detailed CAD may recover usable space. A019 Overall envelope 1. Input: L + D/2 + 0.005 + 0.020 m (Calculated). 2.
Basis: Barrel, nose, cap and integration-length entries 3. Logic: Sum modeled axial lengths; multiply by 1000 for mm. 4. Review: An
envelope proxy, not the complete deployed forebody and aftbody system length. A020 Slenderness

1. Input: Overall envelope divided by outer diameter (Calculated indicator). 2. Basis: Table T07; geometry entries 3. Logic: Compute
length/D using common units; retain diameter and wall identifiers. 4. Review: Not Euler buckling analysis, dynamic stability or a
failure threshold. A021 Steel material and density 1. Input: 4340-class candidate; 7850 kg/m3 (Material analog). 2. Basis: [7]
wrought-material physical properties, PDF page 5 3. Logic: Use stated density for geometry-to-mass conversion; do not use powder
packing density. 4. Review: Hardened condition, procurement form and low-temperature toughness are unselected. A022 Steel
conductivity 1. Input: 44.5 W/m K reference value (Material analog). 2. Basis: [7] physical properties, PDF page 5 3. Logic: Record a
conductivity analog; it is not used to size heater power in the numerical trade.

4. Review: Do not equate room-temperature value with the full temperature-dependent chassis response. A023 Steel tube mass 1.
Input: ρπ(D²-d²)L/4 (Calculated). 2. Basis: Tube geometry and steel density 3. Logic: Compute annular area, multiply by length,
multiply by density. 4. Review: No cutouts or local reinforcements; revise with actual CAD. A024 Steel nose mass 1. Input: ρ(2π/3)
(r³-ri³) (Calculated). 2. Basis: Hollow hemisphere and density 3. Logic: Subtract two hemisphere volumes; use r=D/2 and ri=d/2. 4.
Review: Local wall schedule and tip wear may alter mass.

[Source Rev7 PDF page 98; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 99
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 30 A025 Steel cap mass 1.
Input: ρπD²×0.005/4 (Calculated). 2. Basis: Rear-cap and density entries 3. Logic: Multiply full disc volume by density. 4. Review: No
hole deduction; joint mass remains separate. A026 Steel joints and cage 1. Input: 0.120 kg standard; 0.060 kg reduced (Engineering
judgment). 2. Basis: No fastening or cage BOM; design and twoKg functions 3. Logic: Add explicit fixed allowance to calculated tube,
nose and cap. 4. Review: Reduction is a scope assumption, not a demonstrated 60 g saving. A027 Resin density

1. Input: 1.10 kg/L screening value (Rounded material analog). 2. Basis: [8] page 1, component densities and 100:35 mass mix 3.
Logic: Compute 135/(100/1.15 + 35/0.95) = 1.09048 kg/L before cure; round to 1.10. 4. Review: Assumes additive component volumes;
cured density, fillers and shrinkage need measurement. A028 Potting mass 1. Input: 0.262308 kg standard (Calculated). 2. Basis:
Resin density, fill fraction and cavity entries 3. Logic: Multiply 0.953846 L × 0.25 × 1.10 kg/L. 4. Review: Not an impact-survival
guarantee; no potting of sample paths presumed. Hardware allowances A029 Battery mass 1. Input: 0.450 kg standard; 0.150 kg
reduced (Engineering judgment). 2. Basis: No selected cell or module datasheet

3. Logic: Reserve battery mass for a short operating mode; test energy separately. 4. Review: No guaranteed usable energy, impact
safety, cold performance or volume closure. A030 Heaters controller and memory 1. Input: 0.120 kg standard; 0.060 kg reduced
(Engineering judgment). 2. Basis: No circuit or heater BOM 3. Logic: Add one combined common-electronics allowance; count
experiment-specific electronics within science. 4. Review: Verify harness interfaces, power conditioning and thermal-control
functions are covered.

[Source Rev7 PDF page 99; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 102
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 33 A044 Forebody and
surface totals 1. Input: 3.520137 kg and 0.870 kg standard 70 mm case (Accounting calculation). 2. Basis: Location tags in T06 3.
Logic: Sum buried rows separately; total = forebody + all surface rows. 4. Review: Contingency has no assigned physical location
and is excluded from impact mass. A045 Complete 2 kg ceiling 1. Input: 2.000 kg including contingency (User constraint interpreted
conservatively). 2. Basis: User request to retain the 2 kg design; reverse-budget policy 3. Logic: Set nominal allowable mass to
2/(1+c); at c=.25, nominal cap is 1.600 kg. 4. Review: Published 2 kg reference does not specify this contingency interpretation; no-
margin comparison is separate. A046 Inverse fixed geometry

1. Input: 210 mm barrel and 0.345 L practical cavity (Reference-based model). 2. Basis: [1] section 3.1; twoKg function 3. Logic: Use
actual cylinder length for steel mass and independently stated practical volume for science capacity. 4. Review: Ideal 47 mm
bore×210 mm is about 0.364 L; 0.019 L difference represents practical-space discrepancy, not a reconstructed detailed drawing.
A047 Inverse ancillary volume 1. Input: 0.120 L standard; 0.070 L reduced (Engineering judgment). 2. Basis: No component CAD;
twoKg function 3. Logic: Subtract ancillary envelope after allocating 25% potting and 10% reserved volume. 4. Review: Reduced 70
cm3 must contain battery, electronics and harness; demonstrate with CAD. A048 Standard inverse non-science mass 1. Input:
2.232230 kg nominal (Calculated). 2. Basis: Reference geometry plus standard hardware rows

3. Logic: Calculate 0.617355 kg steel + 0.094875 kg potting + 1.520 kg hardware. 4. Review: Exceeds 2 kg even with no science or
margin; do not label zero science as feasible. A049 Reduced inverse non-science mass 1. Input: 1.252230 kg nominal (Calculated). 2.
Basis: Reference geometry plus reduced hardware rows 3. Logic: Calculate 0.557355 kg steel + 0.094875 kg potting + 0.600 kg
hardware. 4. Review: All reduced hardware allocations are unvalidated scope changes.

[Source Rev7 PDF page 102; section classification: Penetrator geometry, structure and mass closure]
Source evidence — Rev7 master page 110
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 41 Appendix F Table
construction and calculation trails Each ID below points to the exact caption added in the body. Steps document actual
computational or editorial construction. A qualitative table has decision logic and provenance, but no invented numerical
calculation. T01 Standard and reduced non science mass allowances Inputs: A010, A026, A029, A030, A031, A032, A034, A035, A036,
A037, A038, A039, A040 Sources: [1] geometry; [7] density; [8] resin analogy; [9] bare radio only; all package allowances are this
study judgments. 1. Use D=.050 m, d=.047 m and barrel L=.210 m for both columns. 2. Calculate tube, hollow hemisphere and 5 mm
cap masses; add .120 or .060 kg joints. Obtain .617354683 or .557354683 kg steel. 3. Compute potting from practical volume: .345 L ×
.25 ×1.10 = .094875 kg. 4. Transcribe each explicit hardware allowance. Standard other hardware sums to 1.520 kg; reduced sums to
.600 kg.

5. Compare columns line by line; do not claim equal performance. Sum with chassis and potting to obtain non-science masses.
Reproduction check: Standard 2.232229683 kg; reduced 1.252229683 kg before science and contingency. Review limit: No
component selection validates the reductions; geometry and practical volume are separate reference inputs. T02 Reduced science
and one kilogram comparison Inputs: A052, A045, A053, A054, A075, A071, A077 Sources: T01 plus geometry model; [7], [8] material
analogs; no scientific performance source. 1. Find reduced mass ceiling 2/1.25 - 1.252229683 = .347770317 kg. 2. Find volume ceiling
(.345×.65 - .070)×2 = .3085 kg; take the lesser. 3. Add science to T01; nominal=1.560729683 and budget=nominal×1.25. For the 1 kg
column use 70/2.5 model output. 4. Use the modeled envelope and location sums. Compute Wh=.15×150 or .45×150;
runtime=(Wh-5)/1.5. 5. Compute impact energy=.5×forebody×100²; sectional mass=forebody/(πD²/4). 6. Compute six-probe
total=6×budget, and illustrative entry total=that+21.

Reproduction check: Reduced budget 1.950912104 kg; 1 kg-science budget 5.487671392 kg. Impact energies 6053.648 J and
17600.686 J. Review limit: The 260 mm reduced envelope and 347.450 mm larger envelope use different geometry and hardware
scope. This is not a payload-mass-only comparison. T03 Supplementary payload data and packaging implications Inputs: A091,
A051, A066 Sources: [13] S2 radiometer, humidity and microseismometer rows; S3 larger payload concepts. 1. Transcribe
instrument figures without treating them as a selected instrument list. 2. Convert reduced science volume to 154.25 cm3; humidity
fraction=124/154.25 = .8038898. 3. Add the radiometer and its processor only if both functions are required and not already
counted. 4. Retain instrument readiness versus complete penetrator qualification as distinct categories.

[Source Rev7 PDF page 110; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 118
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 49 Unsupported values
remain unsupported No external source is assigned to the platform component allowances, 2 kg/L instrument bulk density, 25%
potting, 10% volume reserve, 25% mass growth policy, 150 usable Wh/kg, 1.5 W mean load or 5 Wh startup allowance. The register
names their origin as judgment or scenario. Citing a nearby product or paper cannot substitute for sizing or a measurement of
those values. Appendix I Independent checks and reviewer disposition Calculation order 1. Freeze inputs and units before running
the model. 2. Compute volume, geometry, steel and potting masses. Sum nominal hardware and location totals. Apply contingency
once. 3. Solve the 2 kg case using independent mass and volume constraints. Keep closure failure separate from a zero science
allocation. 4. Compute energy, shock, thermal and orbital examples independently. Do not use a chart to create its own validating
input. 5. Compare full-precision results and then reproduce displayed rounding. Record any changed input before interpreting a
different

result. Worked check for standard 70 mm case 1. Science envelope=1/2=.500 L; cavity=(.500+.120)/.65=.9538461538 L. 2. Inner
diameter=.070-2×.0025=.065 m; barrel=.0009538461538/(π×.065²/4)=.2874496196 m. 3. Steel tube=1.1962585344 kg; hollow
nose=.1405191852 kg; cap=.1510517018 kg; joints=.120 kg. Steel sum=1.6078294213 kg. 4.
Potting=.9538461538×.25×1.10=.2623076923 kg. 5. Nominal=1+1.6078294213+.2623076923+1.520=4.3901371136 kg. 6.
Budget=nominal×1.25=5.4876713920 kg. Forebody=nominal-.870=3.5201371136 kg. Worked checks for narrative calculations 1.
Radial side loss: use 2π×.039×.2874496196×50/ln(.5/.035)=1.32438853 W. Boundary radius and temperature difference are scenario
assumptions. 2. Orbital example: ra=3,639,500 m; rp=3,389,500 m; a=3,514,500 m. Vis-viva gives Δv=61.55673250 m/s.
Propellant=12.38058023 kg; burn=273.17703842 s; period=6666.17454586 s.

3. Carrier example: 6×5.487671392+21=53.92602835 kg. At 45 kg, remaining carrier=12.07397165 kg. 4. Payload-only reduction:
science=.3085 kg; cavity=.4219230769 L; envelope=187.15009382 mm; standard-platform budget=3.6065639870 kg. 5. Mixed resin
analogy: total mass/total additive component volume=135/(100/1.15+35/.95)=1.09048059 kg/L. The model rounds to 1.10 before
using it. Independent reproduction result The supplied Python implementation uses standard-library equations independent of the
original JavaScript functions. It matched 106 stored scalar checks within relative or absolute tolerance 10^-11. Checks cover six
geometries, standard and reduced inverse cases, and orbital outputs. Plot CSVs are regenerated from the stated formulas. Passing
these checks confirms arithmetic consistency, not hardware feasibility or scientific validity. Review packet inventory
assumptions.csv and assumptions.json contain the complete register. derivations.json contains every table and figure recipe.
table_cells.csv preserves all displayed table cells. baseline_snapshot.json is the original unrounded numerical snapshot. trade.js is

the baseline JavaScript model. reproduce.py is the independent standard-library implementation. F01 through F05 CSVs supply

[Source Rev7 PDF page 118; section classification: Penetrator geometry, structure and mass closure]

Source evidence — Rev7 master page 143
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified 4. Thermal-protection requirements versus available
technologies NASA successfully used phenolic-impregnated carbon ablator (PICA) on Mars Science Laboratory and Mars 2020
forebodies, with SLA-561V on the backshell and Acusil-II in specific secondary locations. That is strong material-family heritage. It
is not a qualification of Freya geometry, a selected 15 mm depth, attachment adhesive, tile size, internal temperature, recession, or
cone structural support. NASA reports underscore that CO2 radiative heating and backshell heating must also be evaluated [2-4].
Candidate / role Relevant evidence Freya assessment PICA forebody Mars 2020/MSL flown and thermal-response characterized [2-
4]

Most credible reference material; requires transient thermal sizing, recession and arcjet verification SLA-561V backshell Mars
2020/MSL backshell heritage [2,3] Candidate for lower-heat regions only after backshell CFD/temperature study Acusil-II localized
Mars 2020 parachute-cone use [2,3] Not a substitute for the forward stagnation heat shield Unqualified custom coating / 3D-printed
shield No Freya-relevant flight evidence provided Not baseline until arcjet tests, material characterization and

structural proof With 1.10 m diameter, assumed 70-degree cone planform, 1.09 area allowance and 240 kg/m³ density, a 15 mm
assumed forebody layer weighs 3.97 kg. Add 3.50 kg assumed backing structure for 7.47 kg total. These masses are geometric
estimates, not thermal survival predictions. Figure 6. PICA-layer thickness and mass trade. The 15 mm nominal choice is an
unsized input; a physically qualified thickness can only follow transient thermal-response analysis. TPS thickness (mm) PICA mass
@240 (kg) Shield+backing @240 (kg) Shield+backing @270 (kg) 2.65 6.15 6.48

3.97 7.47 7.96 5.29 8.79 9.45 6.61 10.11 10.94 7.94 11.44 12.43 The thermal design gate must calculate total convective + radiative
heating distributions around the nose and backshell,

temperature-dependent conductivity/pyrolysis/char, surface recession, adhesive/bondline histories, peak internal component
temperatures, insulation edge cases, manufacturing gaps, and dispersions. Verification requires material

[Source Rev7 PDF page 143; section classification: Penetrator geometry, structure and mass closure]




Historical source visual from original Rev7 PDF page 143, image ID 739
4. Atmospheric entry, orbital delivery and deorbit
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 7
R7T04 70/2.5 scenario Length mm Budget kg Legacy packaging 347.4 5.488 1 kg/L and 0.35 L ancillary 685.9 7.634 Derivation R7T04.
Hold science mass, wall, potting and all hardware allowances fixed. Solve V=(m/rho+Vancillary)/(1-fpot-ffree). Size annular barrel
from its bore area. Sum tube, hemisphere, cap, joints, resin, science and platform hardware. Apply 25% margin only after the
nominal sum. Delivery and communications integration

All previous entry, TPS, heat-shield, release, parachute, electronics and risk content is retained in the earlier-report annexes and
the archived original website. The old trajectory values depend on an exponential atmosphere and simplified planar dynamics.
They are useful scenario records, not a selected shield diameter, TPS thickness, release altitude or flight corridor. At 250 km
circular orbit, the 61.557 m/s impulse reaches a 125 km entry interface at 3.4909 km/s and -2.038 degrees. This does not generate
the historical -13 degree steep case. The separate 45 kg stack needs 1.238 kg ideal propellant at 225 s Isp; tank, thruster, dry stage,
reserves and finite burn effects are excluded. Whether 45 kg includes this propellant must be declared before closure. For probe
budget M and non-probe entry fraction f, required mass is N*M/(1-f). The 32.6% DS2 aeroshell fraction is a historical analogy only.
Five 5.488 kg probes imply 40.710 kg, leaving 4.290 kg within 45 kg; dispenser, kick stage and other common hardware are not
proven to fit in that allowance. Six require 48.852 kg at the same fraction. The user-requested six-probe case remains visible. At
401.6 MHz, 1 W, 8 kbps and 1,000 km slant range, the stated antenna, loss and noise assumptions give about

+4.0 dB margin above a 6 dB required Eb/N0. This is a return-link arithmetic example. Proximity-1 compatibility, coding,
implementation loss, occultation, terrain, Doppler, antenna orientation, data volume and relay scheduling require separate
validation. A generic AX100 mass analog is not an approved relay radio. NASA confirmed MAVEN ended in June 2026 [N2]. Future
FREYA relay service requires an agreement; current rover service does not establish spare capacity. NASA reports the Rosalind
Franklin launch opportunity as no earlier than late 2028 [N5]; that is not an available FREYA ride. The Revision 6 December 2028
rideshare scenario remains uncommitted.

[Source Rev7 PDF page 7; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 8
R7T05 Impulse m/s Entry speed km/s Entry angle deg 45 kg propellant kg 50.00 3.502 -1.617 1.008 61.56 3.491 -2.038 1.238

100.00 3.454 -3.063 1.994 150.00 3.406 -4.055 2.957 300.00 3.261 -6.288 5.721 500.00

3.070 -8.695 9.124 889.00 2.701 -13.005 14.923 Derivation R7T05. Use mu=4.282837e13 m3/s2, R=3389500 m and circular
ra=R+250000 m. Burn tangentially: vt=sqrt(mu/ra)-dv. Compute specific orbital energy vt^2/2-mu/ra and h=ra*vt. At r=R+125000 m
compute total speed from energy, tangential speed h/r and inward radial speed. Entry angle=atan2(-vr,vt_entry). Propellant=45*(1-
exp(-dv/(g0*225))). No drag is integrated before the interface. Planetary protection requirements and open risks New source check:
NASA NODIS currently displays NPR 8715.24 with expiration 22 September 2032 [N3]. This corrects the obsolete September 2026
expiry shown in Revision 6 section 12.1. NASA-STD-8719.27 is listed

ACTIVE, baseline dated 30 August 2022 [N4]. Mission classification, governing authority, process selection, verification and
recontamination controls remain open. NASA published a Category IVa Mars primer on 22 October 2026 [N7]. It is a planning aid
for IVa missions, not authority to label a life-detection or warmed-assay concept IVa. The mission authority must determine
applicable categorization. Historical ethylene oxide, irradiation and glove-box concepts remain candidates requiring compatibility,
residue and assay-interference validation. All original requirement IDs and risk entries remain in the annexes and searchable
evidence. R6[n] standards and biological claims retain their individual verification status. Unsupported mineral strength, laminate
strength, biological recovery times, sample acquisition mass and schedule optimism are not made reliable by combining
documents. Added integration gates: G7-01 reconcile 4 kg target with full split-body BOM and margin; G7-02 freeze the science
hypothesis and detection limit; G7-03 close battery and insulation volume; G7-04 demonstrate the effective inlet depth in the
chosen target; G7-05 qualify steel grade or hybrid joint at cold oblique impact; G7-06 assign a real

delivery state and mass boundary; G7-07 secure relay and protocol interfaces; G7-08 receive planetary-protection approval; G7-09
obtain the SBIR proposal/award evidence; G7-10 release a measured CAD and instrumented-test package. Neither a rank, a static
Euler margin, heritage flight, material strength range, nor an arithmetic PASS is an estimated probability of mission success.
Preserve all test failures and assumptions as the program advances.

[Source Rev7 PDF page 8; section classification: Atmospheric entry, orbital delivery and deorbit]
Source evidence — Rev7 master page 12
30 days, kg | 0.1 W | 0.25 W | 0.5 W | 1.5 W; R6P27T01 Load | Energy | Basis Appendix R7 B Pages 28 to 28 Relay and link Read
each dated service record; no capacity allocation inferred. FSPL=20log10(4pi R f/c); C/N0=Pr-(-228.6+10log10(Tsys)); Eb/N0=C/N0-
10log10(rate); margin subtracts required 6 dB. Use 401.6 MHz for return-link example. Table regions covered: R6P28T01 Orbiter |
Altitude | Passes per day (used) | Average relay data Feb–May 2026; R6P28T02 Slant range | 1 W, 8 kbps | 1 W, 32 kbps | 1 W, 128
kbps | 5 W, 8 kbps | 5 W, 32 kbps | 5 W, 128 kbps Appendix R7 B Pages 29 to 30 Impact and relative penetration
Energy=.5*m_fore*v^2; a=v^2/(2s); force=m_fore*a; Earth g=a/9.80665. Relative depth=(SD/1600)^.7*(v-30.5)/(150-30.5) times the
0.76-1.36 m reference. Source target, nose and K assumptions remain unvalidated. Table regions covered: R6P29T01 Average
deceleration, Earth g | 0.25 m | 0.5 m | 1.0 m | Comment; R6P30T01 Forebody | Sect. density kg/m² | Depth at 100 m/s, S = 5–9 |
Depth at 150 m/s, S = 5–9

Appendix R7 B Pages 31 to 33 Entry drogue and carrier Entry follows R7T05. Terminal speed=sqrt(2mg/(rho*Cd*pi*Dchute^2/4));
invert for diameter. Carrier=N*M/(1-f), using probe budget mass. None of these equations models inflation, TPS, entry stability or
dispenser mass. Table regions covered: R6P31T01 ∆v m/s | Entry angle | Entry speed km/s | Propellant, 450 kg parent | Propellant,
45 kg stack; R6P32T01 Drogue diameter | Terminal speed, ρ = 0.010 | ρ = 0.016 | ρ = 0.022 | Drogue for 100 m/s; R6P33T01 Probes |
Probe mass kg | f = 25 % | f = 32.6 % (DS2 aeroshell) | f = 38.9 % (21 kg) | f = 50 %; R6P33T02 Document | Role | Status noted in this
review Appendix R7 B Pages 34 to 37 Protection and mission planning Read each standard or opportunity at its cited date; keep
category assignments and access approvals OPEN. Cost and schedule are estimates unless backed by a proposal. Apply the NPR
date correction and unavailable-SBIR boundary. Table regions covered: R6P34T01 Document | Role | Status noted in this review;
R6P34T02 Category | Bioburden requirement | What it means for FREYA; R6P34T03 Gate | Name | Required evidence | State |
Related req.;

R6P35T01 Process option | Status | Compatbi ility questoi ns to answer with evidence; R6P35T02 Opportunity | What is reported |
Implication for FREYA; R6P35T03 Probes | Probe mass kg | Entry mass kg (f 32.6 %) | Within 45 kg | Kick-stage propellant kg |
Conservatvi e en; R6P36T01 Probes | Probe mass kg | Entry mass kg (f 32.6 %) | Within 45 kg | Kick-stage propellant kg |
Conservatvi e en; R6P36T02 Gate | Target | Exit criteria | Closes or bounds; R6P36T03 Option | Scope | Planning judgment;
R6P37T01 Rank | Uncertainty | Why it comes frist | Cheapest retirement; R6P37T02 If this becomes true | Then; R6P37T03 Step |
Duratoi n or timing | Notes (not verified by simulatoi n) Appendix R7 B Pages 38 to 41 Requirements risks and next steps Keep
stable IDs; trace each to science/engineering evidence; proposed verification is future work. No risk probability or gate closure is
inferred from a listed mitigation.

[Source Rev7 PDF page 12; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 19
PART A DECISION SUMMARY AND PEER REVIEW 1 Executive summary 1.1 Bottom line • The mass and volume model is sound.
An independent re-implementation reproduced all six candidate masses, the 70 mm ledger, the 2 kg reverse budget, the battery
table, the orbit numbers and the thermal numbers to the printed precision. One rounding slip was corrected (5.14 → 5.13 kg,
PR-01). • Diameter mostly trades length, strength, penetration and heat loss, not mass. At 1 kg of science and equal cavity volume
the complete probe budget is 5.01–5.73 kg across 35–80 mm. The shortlist from Revision 4 stands, now derived rather than
asserted: 35/1.5 is rejected on a buckling screen (Euler margin 0.87 at average load); 60/2 and 70/2.5 are the primary candidates
(top three in all five weighting sets); 50/1.5 is kept as the heritage comparator. •

The largest uncertainty is packaging, not structure. Two unsourced inputs dominate length and mass: science bulk density (2.0 kg/L
assumed; the only supplement datum is 0.36 kg/L) and ancillary volume (0.120 L assumed; the battery cells alone need 0.243 L).
Together they could move the 70 mm case from 347 mm and 5.49 kg to about 686 mm and 7.63 kg (PR-31, PR-32). • The largest
feasibility gap is energy–thermal–science compatibility. The 70 mm barrel loses 1.3 W to the soil at ΔT = 50 K, nearly all of the 1.5 W
profile that gives the 41.7 h runtime. Measured microbial doubling times near −10 to −20 °C are 20–160 days. The baseline battery
supports brief sensing or a short, insulated, warmed assay, not delayed-recovery biology (PR-04, PR-05). • Delivery is quantified.
From a 250 km orbit, 61.6 m/s gives an entry angle near −2.0° at 3.49 km/s; −13° needs about 889 m/s. Only the entry stack needs
deorbit propulsion (1.24 kg for 45 kg versus 12.4 kg for the 450 kg parent). Six probes do not close in 45 kg unless non-probe mass is
at most 26.8 % of entry mass; at the DS2 aeroshell fraction (32.6

%) five probes close (PR-13, PR-14). • Communications can close at UHF, but the radio and the relay network are open items. An
illustrative budget shows about +4 dB margin at 8 kbps and 1 W to a relay orbiter at 1,000 km. The AX100 analog is not a
Proximity-1 radio, and MAVEN has ended (PR-10, PR-11). • Schedule is the planning constraint. A December 2028 launch is about 26
months away. A life-detection payload with planetary-protection validation is not credible on that timeline; a reduced pathfinder
might be (planning judgment, Section 13). 1.2 Decisions requested ID Decision Recommendation
Needed before D-01 Mission class: pathfinder (no life detection) or life-detection Decide first. It sets the planetary-protection
category and process, the instrument set, the schedule and the battery. Section 12. Any instrument or process selection D-02
Operating mode and duration Choose among (a) brief sensing at about 1.5 W for up to about 42 h, (b) insulated, warmed assay for
up to about 5 days (≈0.5–

0.9 kg battery), (c) long incubation of 30 days or more (needs ≤0.25 W average). Recommend (b) with a stated hypothesis and time
series. Sections 6–8. Battery and thermal design D-03 Geometry carried into CAD and drop test Carry 60/2 and 70/2.5; keep 50/1.5 as
comparator; reject 35/1.5; hold 50/2 and 80/3. Section 5.8. Gate G1 D-04 Science package definition Obtain supplier concept designs
and measured bulk density for

the ≈0.31 kg and 1 kg envelopes. If density is below 1.5 kg/L, reopen D-03. Gate G0 D-05 Delivery architecture and probe count
Orbit-delivered entry stack with its own kick stage, up to five probes in 45 kg; confirm the carrier enters Mars orbit. Section 11 and
13. Carrier selection Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 3

[Source Rev7 PDF page 19; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 27
ID Assumption and value Clas s Justification and source If wrong Retire by A-15 Soil diffusivity 3.63×10⁻⁸ m²/s S (3.63 ± 0.53)×10⁻⁸
m²/s for the 40 cm range from the annual variation; (3.93 ± 0.39)×10⁻⁸ for the upper 10 cm from the diurnal variation [2].

Extended to 1.5 m by extrapolation. α = 10⁻⁷ (illustrative cemented ground): 1.5 m remnant 34 %. Site data A-16 Soil conductivity
0.039 W/m K S 0.039 ± 0.002 over 0.03–0.37 m at InSight [14]; varies with atmospheric pressure [15]; Phoenix more than twice as
high [14]. k = 0.085: 2.9 W. 0.3: 10 W. 2.0: 68 W (70 mm barrel). Site data

A-17 ΔT 50 K; far-field radius 0.5 m E Arbitrary screening choices. Far-field 0.1 / 0.2 / 1 / 2 m: 3.35 / 2.02 / 1.05 / 0.87 W. Thermal
model A-18 Mean soil temperature 217.5 K S 10–20 cm depth, InSight; 5.3–6.7 K variation over a sol, 13.3 K over the seasons [2].

Site specific. Site data 4.4 Communications, entry and delivery ID Assumption and value Clas s Justification and source If wrong
Retire by A-19 Transceiver 0.100 kg packaged E

Bare AX100 is 24.5 g, 65 × 40 × 6.5 mm [9]. Not a Proximity-1 radio (PR-10). A different radio changes mass, power and interface. G1
A-20 Link budget inputs: 1 W transmit, −3 dBi whip, +3 dBi orbiter antenna, 6 dB polarization and orientation loss, Tsys 806 K,
required Eb/N0 6 dB E

AX100 30 dBm output [9]. Electra receive noise figure 4.9 dB [28] with an assumed 200 K antenna temperature. MER UHF monopole
nominal gain 0 dB, RHCP [29]. The orbiter gain, losses and threshold are assumptions. ±3 dB moves margins by ±3 dB. Link analysis
A-21 μ = 4.282837×10¹³ m³/s², R = 3,389.5 km S NASA Mars Fact Sheet [16]. Negligible.

— A-22 Example parent 450 kg, 250 km circular orbit, Isp 225 s, 100 N E Optional example, not a selected carrier. MRO relay
altitude 255–320 km and TGO 400 km for context [26]. Δv scales with orbit; propellant scales with Isp and mass. Carrier selection
A-23

Impact 100 m/s, stopping distance 0.5 m E Illustration. DS2 was designed for about 190 m/s [19]; IMPRESS emplacement 0.2–1 m [1].
Average g scales with v² and 1/s. EDL model A-24 Air density 0.016 kg/m³ (0.010– 0.022), drogue Cd 0.6, g 3.71 m/s² S/E Surface
density 0.016 ± 0.006 kg/m³ [16]. Cd and the

range are estimates. Terminal speed scales as ρ^−½. EDL model A-25 21 kg carrier placeholder X Historical, not re-sized. At the DS2
aeroshell fraction, six probes imply 15.9 kg of aeroshell alone [20]. See §11. Carrier design A-26

Entry interface 125 km E Conventional. Using 120 km changes the entry angle by less than 0.01°. Negligible. — 4.5 Margin, science
and planetary protection ID Assumption and value Clas s Justification and source If wrong

Retire by A-27 Contingency 25 % of all nominal mass E Policy choice. AIAA S-120 assigns growth allowance per component by
maturity [42]; LUVOIR used 30 % [42]. 30 %: 5.707 kg. Component-level (illustrative): 5.400 kg. Next ledger A-28 Shallow skin 0–3
cm; buried

sensing 0.2–1 m S/D Diurnal skin depth 3.2 cm derived from [2]; IMPRESS emplacement 0.2–1 m [1]. Changes sampler design. G0
Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 11

[Source Rev7 PDF page 27; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 44
Orbiter Altitude Passes per day (used) Average relay data Feb–May 2026 Mars Odyssey (2001) 385–450 km 2–4 (0–1) 107.3 Mb/day
Mars Express (2003, ESA) 298–10,107 km 1–3 (0) Backup orbiter Mars Reconnaissance Orbiter (2005)
255–320 km 2–4 (1–3) 850.6 Mb/day ExoMars Trace Gas Orbiter (2016, ESA) 400 km 2–4 (2–4) 2,228.1 Mb/day MAVEN (2013) — —
Mission ended 3 June 2026 Source: NASA Mars Relay Network page, updated 5 June 2026 [26]. These are rover-service volumes, not
spare capacity; use of any orbiter

by FREYA needs an agreement. NASA issued a Mars Telecommunications Network request for proposal on 14 May 2026 with an
operational target of 2030 or earlier [26]. JPL's August 2026 report recommends UHF for the next relay orbiter, partly because UHF
is best for low- power users [27]. PEER REVIEW · MODERATE PR-11 Rev 4 treated relay availability as a generic risk (R11). The
network is thinning, aging and, for new users, uncommitted. A 2022 health assessment reported only ESA's TGO expected to
remain viable to about 2030 [47], so relay planning is now a schedule and agreements item as much as a link-budget item. 9.2
Protocol and radio Mars relay orbiters use CCSDS Proximity-1 [30] at UHF: return links near 401.585625 MHz and forward links
near 437.1 MHz for Odyssey and the Mars Exploration Rovers [29]; the Electra radio is frequency-agile over 390–405 and 435–450
MHz, supports BPSK, QPSK and Manchester modulation with rate-1/2 convolutional coding, transmits 5 W (or 7 W), has a receive
noise figure of 4.9 dB (3.9 dB), and supports 1–1,024 kbps [28][29]. PEER REVIEW · MODERATE PR-10 The NanoCom AX100 used as
the mass analog is a CubeSat transceiver with FSK, MSK, GFSK and GMSK modulation at 0.1–115.2 kbps, UHF-low 395–405 MHz, 30
dBm output, 24.5 g, and a −30 to +85 °C rating [9]. It is not a

Proximity-1 radio. The mass analogy is fine; interoperability with relay orbiters, and survival of the surface aftbody at Martian
night temperatures without heater power, are not demonstrated. The DS2 review board listed antenna orientation, UHF link
compatibility and radio survival of impact among its plausible causes of loss [17]. 9.3 Illustrative link budget Return link from a
surface whip to an orbiter overflight. Assumptions (A-20): surface antenna −3 dBi; orbiter +3 dBi; 6 dB combined polarization and
orientation loss; system noise temperature 806 K; required Eb/N0 6 dB for coded operation including implementation loss. Free-
space loss at 401.6 MHz is 136.6 dB at 400 km, 144.5 dB at 1,000 km and 148.0 dB at 1,500 km. For a 400 km orbit the slant range is
400 km at zenith, 702 km at 30° elevation and 1,031 km at 15°. Slant range 1 W, 8 kbps 1 W, 32 kbps 1 W, 128 kbps 5 W, 8 kbps

5 W, 32 kbps 5 W, 128 kbps 400 km +11.9 +5.9 −0.1 +18.9 +12.9 +6.9 1000 km +4.0 −2.0 −8.1

+11.0 +5.0 −1.1 1500 km +0.5 −5.6 −11.6 +7.4 +1.4 −4.6 Link margin in dB above the 6 dB threshold. Green: 3 dB or more; amber: 0–
3 dB; red: negative. Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page
28

[Source Rev7 PDF page 44; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 47
Reading: at the Revision 4 reference of 100 m/s a 70 mm FREYA forebody reaches roughly 0.3–0.5 m in soil like the calibration case,
which is at the shallow end of IMPRESS's stated 0.2–1 m [1]; about 150 m/s would be needed to approach 1 m. Because S for
Martian regolith is not established and depth scales linearly with S (Gao et al. note S of 10 or more for loose soil [21]), these are
ratios for ranking and for setting a speed requirement, not predictions. They also show that a heavier, narrower body is not
automatically better: 35/1.5 penetrates deepest and fails the buckling screen. NOTE Young's equations are empirical, derived from
Earth penetration tests, and secondary reports state that they require projectile mass above about 2 kg [22]. FREYA's 3.5 kg
forebody is inside that range; DS2 and the IMPRESS reference are not. Mars gravity, atmospheric pressure and regolith structure
are outside the data. Treat every depth here as indicative only (R30). 11 Entry, descent and delivery 11.1 Orbital example,
completed For the example circular 250 km orbit and an impulsive retrograde maneuver, μ = 4.282837×10¹³ m³/s² and R = 3,389.5
km [16] give Δv = 61.56 m/s to a zero-altitude periapsis; at 450 kg, Isp 225 s and 100 N, ideal propellant is 12.38 kg and burn time
273 s (verified). The half-orbit coast to periapsis is about 55.6 minutes. These are impulsive, two-body numbers; finite-burn

targeting and release are not simulated. PEER REVIEW · MODERATE PR-13 Revision 4 said the old −13° steep entry must not be
presented as the result of this orbit maneuver but supplied no entry state. The entry state at a 125 km interface is below. A −13°
entry needs about 889 m/s from this orbit, which would cost 149 kg of propellant for a 450 kg parent and would reduce entry speed
to 2.70 km/s. Also, nothing requires the whole parent to deorbit: only the entry stack (taken as 45 kg here) needs the burn, and it
needs 1.24 kg at the same Isp for 61.6 m/s. Δv m/s Entry angle Entry speed km/s Propellant, 450 kg parent Propellant, 45 kg stack
-1.62° 3.50

10.1 kg 1.01 kg 61.6 -2.04° 3.49 12.4 kg 1.24 kg -3.06° 3.45 19.9 kg 1.99 kg -4.05° 3.41

29.6 kg 2.96 kg -6.29° 3.26 57.2 kg 5.72 kg -8.69° 3.07 91.2 kg 9.12 kg -13.01° 2.70 149.2 kg

14.92 kg Entry interface 125 km; Isp 225 s; ideal rocket equation; kick-stage dry mass excluded. The entry angle at 120 km differs by
less than 0.01°. Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 31

[Source Rev7 PDF page 47; section classification: Atmospheric entry, orbital delivery and deorbit]
Source evidence — Rev7 master page 48
Figure 10. Entry flight-path angle versus retrograde Δv from a 250 km circular orbit. Basis: two-body conic from a circular orbit;
impulsive burn. The 61.6 m/s and 889 m/s points are marked. A shallow entry at about 3.5 km/s is much slower than a direct
hyperbolic arrival (roughly 5.5–7.5 km/s for recent landers; general knowledge, not verified here), which lowers heating but
lengthens the deceleration and makes the outcome sensitive to dispersions. Entry heating, aerodynamics and thermal-protection
thickness remain open (R14). The entry from orbit also assumes the carrier enters Mars orbit. PEER REVIEW · MODERATE PR-34
NASA's December 2028 SR-1 Freedom, the opportunity named in the IMPRESS preprint materials [44], is described as carrying
SkyFall to Mars; reports say it has not yet been decided whether the spacecraft will fly by or enter orbit after delivery [43]. A flyby
carrier implies direct entry: a different boundary condition (EDL01), faster entry and a heavier heat shield. 11.2 Drogue and
terminal speed Revision 4 allotted 0.250 kg to drogue, risers and separation with no sizing basis. For a 4.39 kg probe, drag
coefficient 0.6 and Mars gravity 3.71 m/s², terminal speed is v = sqrt(2mg/(ρ Cd A)). Surface density is 0.016 ± 0.006 kg/m³ [16]; it is
lower at high

elevation. Drogue diameter Terminal speed, ρ = 0.010 ρ = 0.016 ρ = 0.022 Drogue for 100 m/s 0.50 m 166 m/s 131 m/s 112 m/s 0.75 m
111 m/s 88 m/s

75 m/s 1.00 m 83 m/s 66 m/s 56 m/s 1.50 m 55 m/s 44 m/s 37 m/s Diameter needed for target speed (ρ = 0.016; range 0.010– 0.022) 60
m/s: 1.10 m (0.93–1.39)

80 m/s: 0.82 m (0.70–1.04) 100 m/s: 0.66 m (0.56–0.83) 150 m/s: 0.44 m (0.37–0.55) A drogue of about 0.7 m reaches 100 m/s in typical
density and fits a 0.250 kg allowance plausibly; the problem is not mass but stability, deployment at the right altitude and speed,
separation from the forebody, and nose-first orientation (EDL02, EDL03). None of these are modeled. Terminal speed is attained
only if deployment altitude allows. 11.3 Carrier closure Entry mass for N probes of 5.488 kg budget mass is N × 5.488 / (1 − f), where
f is the fraction of entry mass that is not probe (aeroshell, thermal protection, dispenser, separation, kick stage). DS2's aeroshell
was 1.165 kg of a 3.572 kg probe-plus- Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26
October 2026 Page 32

[Source Rev7 PDF page 48; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 51
Process option Status Compatibility questions to answer with evidence Controlled (glove-box) assembly with component treatment
Proposed in Rev 4; not selected Barrier integrity; treatment compatibility of each component; witness monitoring (PPG05). Gas
process, ethylene oxide candidate Record only. The 1972 report [4] discusses effectiveness and material compatibility; it does not
establish complete fumigation of FREYA or

modern acceptance Residues or reaction products that bias the assay; access to sealed and potted cavities; verification on flight-
representative geometry. Vapor hydrogen peroxide and dry-heat microbial reduction Used on NASA projects according to NASA
OPP presentations [34] Battery, potting and electronics temperature limits; penetration into sealed volumes. Not assessed here.
Radiation where compatible No longer mandatory for the assembled probe Dose effects on batteries, electronics, polymers and
assay

reagents. Neither a successful assembly step nor absence of growth in a single blank establishes compliance. A model calculation
never marks a contamination gate closed. PART E MISSION PLANNING, REQUIREMENTS AND RISKS 13 Mission planning
implications ADDED PR-28 Revision 4 had no schedule, readiness or delivery-opportunity view. This section converts the trade
into planning inputs. Schedule statements are planning judgments with stated assumptions, not commitments. 13.1 Delivery
opportunities Opportunity What is reported Implication for FREYA December 2028 transfer window NASA targets launch of SR-1
Freedom, a

nuclear-electric spacecraft, in December 2028, carrying the SkyFall helicopter entry vehicle [43]. IMPRESS materials say swarms
could ride as a secondary payload on this mission [44]. The spacecraft's fate after delivering SkyFall (flyby or orbit) has not been
decided [43]. ESA's Rosalind Franklin rover is also reported for 2028 on a US commercial launcher (secondary source). About 26
months from now. Needs a host agreement, a planetary- protection route, and either orbital release (Section 11) or direct entry.
Press reports are secondary sources and should be checked against NASA releases. Early 2031 window (assumed)

Mars launch windows recur about every 26 months (synodic period about 780 days). Date not verified in this review. The realistic
target for a life-detection configuration (Section 13.3). Dedicated or commercial rideshare No specific offer identified Not
assessable. Entry mass, volume and delivery orbit are the interface parameters to specify. 13.2 Scenario matrix for probe count
Probe count is a scenario, not a design (A-05). The table combines the reviewed mass budget, the DS2 aeroshell fraction, the kick-
stage propellant for 61.6 m/s and the relay load. "Conservative" uses the 7.63 kg probe of Section 5.4. Probes
Probe mass kg Entry mass kg (f 32.6 %) Within 45 kg Kick-stage propellant kg Conservative entry kg Within 45 kg 5.5 8.1 Yes 0.22
11.3 Yes

11.0 16.3 Yes 0.45 22.7 Yes 16.5 24.4 Yes 0.67 34.0 Yes Preliminary. No hardware configuration is flight qualified. Prepared for
Robert J Mills, 26 October 2026

Page 35

[Source Rev7 PDF page 51; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 52
Probes Probe mass kg Entry mass kg (f 32.6 %) Within 45 kg Kick-stage propellant kg Conservative entry kg Within 45 kg 22.0 32.6
Yes 0.90 45.3

No 27.4 40.7 Yes 1.12 56.6 No 32.9 48.9 No 1.34 68.0 No

Entry mass excludes dispenser, cruise-stage mounting and kick-stage dry mass. Relay load scales with the number of probes: with
2–4 passes per day per orbiter [26] each probe needs its own scheduled overflights, and six probes at 8 kbps would return on the
order of 3 Mbit per probe per pass. 13.3 Development gates and schedule options Gates are decision points with exit criteria. The
dates assume work starts now and that flight hardware must be delivered to the carrier about six months before launch
(assumption, E). Gate Target Exit criteria Closes or bounds G0 Q4 2026 – Q1 2027 Mission class chosen (D-01); operating mode and
hypothesis

stated (D-02); supplier concept designs and measured bulk density for the 0.31 kg and 1 kg envelopes (D-04); planetary- protection
authority and route identified; expert addendum supplied (D-08). A-01, A-02, A-03, A-29; R01, R04, R16, R27, R31 G1 Q2 2027
Packaging CAD and coupled thermal model for 60/2 and 70/2.5 (and 50/1.5); battery chemistry and radio chosen (D- 06); carrier and
entry mode selected (D-05); component-level mass ledger (D-07). A-12 to A-19; R03, R19, R25, R32

G2 H2 2027 Coupon tests: steel heat treatment toughness at cold; potting thermal cycling and shock; battery cold-shock capacity.
Instrumented drop tests of mass-simulant forebodies into analog targets. A-07, A-08, A-10; R05–R08, R29 G3 H1 2028 Full-scale
impact tests with flight-like internals; tether and drogue deployment tests; planetary-protection process validation on
representative assemblies; link test with a Proximity-1 radio.

R09, R10, R12, R15, R30 G4 Mid 2028 (delivery) Integrated acceptance; documentation; planetary-protection records; hardware
delivered to the carrier. R14, R20, R22 Option Scope Planning judgment 1 2028 pathfinder About 2 kg class, IMPRESS-like probe;
environmental and geophysical sensors; no life detection (IVa-like, subject to authority); one to several probes.

Demonstrates impact, tether, antenna, relay link, thermal behavior. About 20 months from today to delivery. Aggressive but
conceivable only if funded and hosted now. Retires R05–R10, R12, R17, R29, R30 and gives flight data for Option 2. 2 2031 science
mission Life-detection payload at the 0.31–1 kg level; Mode B or C; planetary-protection validation; up to five probes. Allows G0–G4
without compression and uses the new relay constellation planned for 2030. Preferred for the 1 kg science case. 3 2028 full science

The Revision 4 concept on the December 2028 window. Not credible: science package, assay validation, cold-impact qualification
and planetary-protection validation cannot all be completed in the time. Do not plan on it without schedule evidence. Preliminary.
No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 36

[Source Rev7 PDF page 52; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 82
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 13 9 Entry descent
impact and delivery boundaries Orbital delivery, direct interplanetary arrival and other rideshare opportunities require distinct
boundary conditions. The previous 450 kg parent in a 250 km circular orbit is retained only as an optional orbital example. It is not
a selected carrier. A 5–7 month cruise does not uniquely specify Mars arrival velocity or entry angle. For the example circular orbit
and an impulsive retrograde maneuver to a zero-altitude periapsis, μ = 4.282837 × 10^13 m3/s2 and Mars radius 3389.5 km give Δv
= 61.56 m/s. At 450 kg initial mass, Isp 225 s and thrust 100 N, ideal propellant is 12.38 kg and ideal burn time 273 s. This is an
impulsive screen; actual finite-burn targeting and release operations are not simulated. Equations: a = (ra + rp)/2; vc = sqrt(μ/ra);
vb = sqrt[μ(2/ra - 1/a)]; Δv = vc - vb; mprop = m0[1 - exp(-Δv/g0 Isp)]; tburn = mprop g0 Isp / thrust. Direct arrival requires a new
trajectory and a new heating assessment. The old -13 degree steep entry must not be presented as the result of this orbit maneuver.

Figure F05 Average stopping deceleration for chosen speeds and stopping distances The impact screen uses E = mforebody v²/2,
average a = v²/(2s), average force = mforebody a and characteristic stopping time 2s/v. At 100 m/s and 0.5 m stopping distance the
average is about 1020 Earth g. Peak component loads can be much larger. This does not predict penetration depth from material
type or qualify hardware. The old auto-fit of parachute size to a desired 1.5 m depth is withdrawn from the active interface. Its
uncalibrated sandstone and ice coefficients did not validate penetration success. Preserve its source in the archive for audit.
Reintroduce a coupled entry/penetration solver only after acquiring an aerodynamic database, calibrated target resistance and a
qualified separation sequence. TPS thickness and six-probe release timing remain open.

[Source Rev7 PDF page 82; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 107
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 38 A075 Impact mass
and average pulse 1. Input: Nominal forebody only; constant-deceleration proxy (Dynamic idealization). 2. Basis: Location ledger;
E=.5mv², F=m v²/(2s), pulse=2s/v 3. Logic: Exclude decoupled aftbody and uninstalled contingency; compute energy and average
force. 4. Review: Peak shock, local resonance and tether coupling require tests; average g is mass independent. Carrier and
delivery A076 Probe count 1. Input: Six for comparison only (Inherited scenario). 2. Basis: Earlier project study, not an
experimental-design result 3. Logic: Multiply one probe budget by six for carrier arithmetic. 4. Review: No statistical justification
for sample count or independence.

A077 Entry and carrier masses 1. Input: 45 kg total; 21 kg carrier placeholder (Inherited scenario). 2. Basis: Earlier Revision 4
ledger; not new design sizing 3. Logic: Remaining carrier=45-N×probe budget; required entry=21+N×probe budget. 4. Review: Old
carrier includes inherited growth allowances; new TPS and dispenser sizing are missing. A078 Orbital parent mass 1. Input: 450 kg
(Inherited scenario). 2. Basis: Earlier study assumption, orbit function 3. Logic: Use only as initial maneuvered mass in propellant
equation. 4. Review: Not part of the entry-probe budget or a selected bus. A079 Orbital geometry 1. Input: 250 km circular orbit;
zero-datum periapsis (Scenario idealization). 2. Basis: Earlier study; orbit function

3. Logic: Set ra=R+250000 m, rp=R and a=(ra+rp)/2. 4. Review: Spherical mean-radius datum, not terrain altitude; zero periapsis is
not a safe targeting specification. A080 Mars mean radius 1. Input: 3389500 m (Physical reference). 2. Basis: [14] volumetric mean
radius; corroborated by JPL physical parameters 3. Logic: Convert 3389.5 km to meters. 4. Review: Mean sphere ignores equatorial
radius, topography and gravity harmonics.

[Source Rev7 PDF page 107; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 108
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 39 A081 Mars
gravitational parameter 1. Input: 4.282837×10^13 m3/s2 retained (Rounded inherited physical constant). 2. Basis: JPL [15] lists
Mars-system GM 42828.375816 km3/s2 3. Logic: Retain inherited rounded value for reproduction; convert km3 to m3 by 10^9 for
cross-check. 4. Review: JPL system GM differs by 1.36×10^-7 relative and includes satellites; not exact Mars-only provenance at
every digit. A082 Thruster performance 1. Input: 100 N thrust and 225 s Isp (Engineering scenario). 2. Basis: No thruster part or test
data; orbit function defaults 3. Logic: Use ideal rocket equation and constant thrust mass-flow relation. 4. Review: No startup,
pointing, settling, burn inefficiency or propellant-system mass model.

A083 Orbit dynamics 1. Input: Two-body, impulsive retrograde maneuver (Analytical idealization). 2. Basis: Vis-viva and ideal
rocket equations implemented in orbit function 3. Logic: Compute circular and transfer speeds, Δv, propellant, burn duration and
circular-orbit period. 4. Review: A 273 s burn is finite; no targeting accuracy or entry-heating validation follows. A084 Other
delivery and cruise 1. Input: Direct/rideshare unselected; 5–7 month cruise context (Boundary condition not established). 2. Basis:
User study context and reviewer [12] 3. Logic: Require independent arrival state and entry/thermal analyses for each option. 4.
Review: Cruise duration alone does not determine Mars arrival speed or flight-path angle. Contamination and review A085
Treatment process 1. Input: Irradiation unselected; gas glove box and ethylene oxide candidate (Open engineering proposal).

2. Basis: [12] reviewer; historical [4] introduction and limitations 3. Logic: Compare microbial endpoint, access, residues, materials
and assay interference before selection. 4. Review: Historical effectiveness is not complete FREYA sterilization; no treatment
parameters are prescribed. A086 Planetary protection gates 1. Input: Five gates OPEN; category unselected (Evidence-status
judgment). 2. Basis: [10] framework; no mission-authority concurrence supplied 3. Logic: Require classification, process,
coverage/residues, function and recontamination evidence. 4. Review: Not a claim of current compliance; [11] was not retrieved
and cannot close any gate.

[Source Rev7 PDF page 108; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 126
FREYA | Preliminary concept screening | October 2026 FREYA Mars atmospheric entry and six-penetrator subsurface
emplacement: preliminary parametric optimization and feasibility assessment Concept study | Revision 1.0 | 25 October 2026 |
Models and calculations documented; not a validated flight design ABSTRACT A 45 kg entry capsule carrying six independent 5 kg
probes is analyzed for a low-elevation Martian landing region. A numerical 2-D point-mass entry calculation, sequential mass-
decrement release model, segmented parachute dynamics, and parametric Poncelet-type penetration energy model were coupled
to determine a plausible screening baseline. An approximately 1.10 m 70-degree blunt sphere-cone releases the first probe at 8.0
km local altitude and the others at 2 s intervals. For a 35 mm reference probe diameter and a 100 m chute cutaway, the model
requires nominal impact speeds of 89 m/s in ice, 180 m/s in damp sandstone and 239 m/s in dry sandstone. Different parachute
diameters are required for the six release positions and for each target. The

calculated target depth is 1.5 m by construction; it is not a measured or qualified prediction. The dominant unresolved problems
are ground resistance calibration, high-g instrument survival, penetrator attitude, entry thermal-protection mass and target
classification. Result status: deterministic feasibility screen. The recommended parameters are an optimization starting point, not
a demonstrated robust, flight-safe design. 1. Mission definition, coordinate convention and exclusions Assume a 5-7 month Earth-
Mars cruise. The 45 kg mass is defined as the complete atmospheric entry unit after separation from an independent Mars
spacecraft; its propulsion for Mars orbit insertion, spacecraft communications relay, and trajectory control before separation are
not counted in the 45 kg. A longer/shorter interplanetary cruise does not fix the entry speed: capture-orbit geometry and deorbit
maneuver do. The site is within 1 km vertically of the deepest known Martian topography (~-8.2 km MOLA-equivalent datum in
Badwater crater, Hellas). Heights in the numerical integration are above the local ground, not above the MOLA reference areoid.
[1-3] The specified entry interface, 125 km above local ground at 3,450 m/s and -13 degrees flight-path angle,

corresponds (under an unperturbed two-body approximation) to an osculating ellipse with apoapsis ~822 km above mean Mars
radius and subsurface periapsis ~-731 km. A circular orbit at that apoapsis would require a retrograde maneuver of roughly 384
m/s to generate this illustrative entry state. This is a dedicated deorbit estimate, not Mars orbit-insertion delta-v; actual ground
track/altitudes change with the site and gravity field. [1] Parameter Nominal Status Total atmospheric entry mass 45.0 kg Required
input Penetrators 6 x 5.0 kg = 30 kg Required input; chute within 5 kg

Residual shell, TPS, electronics 15.0 kg Mass cap, allocation unverified Heat-shield shape 70-degree blunt sphere-cone Assumed
NASA heritage [4] Heat-shield diameter / nose radius 1.10 m / 0.275 m Selected concept / 0.25D assumption

[Source Rev7 PDF page 126; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 137
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified FREYA Mars atmospheric entry, six-penetrator
emplacement, deorbit thrust trades and subsystem survival Integrated engineering study | Revision 2.0 | 25 October 2026
Deterministic, first-order design study. No results constitute flight qualification, site-specific atmospheric forecasts, or a validated
1.5 m penetration guarantee. Abstract Freya is a proposed 45 kg Mars atmospheric entry vehicle carrying six separately deployed 5
kg penetrators. This revision integrates the original entry and ground-penetration model with an idealized 250 km circular-orbit
deorbit trade, finite thrust/time and propellant calculations for a separate 450 kg orbiting carrier, thermal-protection screening,
impact electronics and battery shock assessments, a 16-item risk register, and numeric tables behind every principal chart. Three
substrate classes are assessed: solid ice, dry sandstone and a hypothetical damp sandstone analog.

The steep entry reference uses 3.450 km/s at -13 degrees; a 250 km circular-orbit deorbit to mean-radius periapsis gives about 61.56
m/s impulsive delta-v and a shallow -2.04-degree interface direction at 125 km. These states are not equivalent. The two
atmospheric paths are separately simulated using the same simplified atmosphere. Surface effects, inflation transients, 6-DOF
stability, true thermal response, and rock fracture are excluded. Designed penetration depth is exactly 1.5 m by construction of the
assumed model, not experimentally demonstrated. Top-line metric Steep entry (legacy) Shallow orbit-linked screen Nominal
interface velocity (m/s) 3,450.0 3,490.9 Interface path angle (deg) -13.00

-2.04 First release time (s) 252.2 712.9 First release speed (m/s) 155.6 157.9 Peak convective heating (W/cm²) 14.25 6.67 Integrated
convective dose (MJ/m²) 9.58 20.60

Peak modeled deceleration (Earth g) 5.03 1.81 Decision status: PROCEED TO EXPERIMENTS, NOT TO A FLIGHT DESIGN FREEZE. 10
risk-register items are currently flagged as blockers. The 45 kg mass budget is not closed. 1. Scope, geometry and input provenance
Freya assumes a five-to-seven-month Earth-Mars cruise and a prior Mars-orbit insertion by an independent spacecraft. The 45 kg
mass applies only to the separated atmospheric-entry vehicle. The 450 kg mass used in the deorbit calculation is a carrier-
spacecraft scenario assumption, not part of the Freya entry mass. If Freya itself must provide propulsion, its 45 kg allocation and
burn times must be completely recomputed. The selected lowland surface is assumed approximately 7.7 km below the Mars mean-
radius datum; actual site elevation and geophysical latitude remain to be selected.

[Source Rev7 PDF page 137; section classification: Atmospheric entry, orbital delivery and deorbit]
Source evidence — Rev7 master page 138
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Quantity Assumption/value Status & provenance Mars
gravitational parameter 4.282837 x 10^13 m³/s² NASA Mars Fact Sheet [1], rounded Mean Mars radius 3,389.5 km NASA Mars Fact
Sheet [1] Mars reference atmosphere rho = 0.025 exp(-h/11,000) kg/m³ Assumed dense lowland screening atmosphere; NOT

Mars-GRAM Freya entry mass 45.0 kg, 6 x 5.0 kg penetrators Mission requirement Blunt cone diameter and Cd 1.10 m, Cd = 1.50
Assumed; not aerodynamic flight data Entry interface 125 km (datum conventions differ) Nominal; coordinate mismatch
addressed in limits Probe diameter 35 mm, mass 5 kg Concept geometry; no structural design

Opening and cutaway 1.5 s delay; 100 m AGL Assumed; inflation physics neglected Target resistance: ice / damp / dry 12 / 40 / 70
MPa Effective dynamic strengths assigned for scenario sweep; NOT measured Dynamic resistance factor kd = 0.50, eta = 1.00
Calibratable model assumptions TPS thickness / density 15 mm / 240 kg/m³ Illustrative PICA class mass allocation; NOT sized

Carrier mass / Isp 450 kg / 225 s Illustrative separate deorbit propulsion case All gravity accelerations labeled "g" are divided by
standard Earth gravity g0 = 9.80665 m/s²; Mars local gravity is approximately 3.711 m/s² in the descent model. Numerical results
are calculated from the accompanying JavaScript source and CSV exports. External references substantiate environmental
parameters and technology heritage, not the chosen hardware dimensions. 2. Deorbit: orbit geometry, thrust and duration 2.1
Nominal orbit and analytic state transfer The orbit profile is an illustrative 250 km circular orbit, not a historical Mars spacecraft
orbit. The carrier burns retrograde to put its new osculating periapsis at the mean planetary radius. A 125 km radius-based entry
interface is used to evaluate the approaching osculating ellipse. The periapsis choice is merely a geometric target; atmospheric
interactions invalidate the vacuum orbit before the formal periapsis is reached.

r_a = R_Mars + h_orbit ; r_p = R_Mars + h_peri ; a = (r_a + r_p) / 2 v_c = sqrt(mu / r_a) ; v_burn = sqrt(mu (2/r_a - 1/a)) ; Delta-v = v_c -
v_burn v_EI = sqrt(mu (2/r_EI - 1/a)) ; gamma_EI = -acos(r_a v_burn / (r_EI v_EI)) t_coast = (E - e sin(E) - pi)/sqrt(mu/a^3), with E
selected on descending ellipse. For h_orbit = 250 km and h_peri = 0 km: circular speed = 3430.4 m/s; burn-end speed = 3368.8 m/s;
impulse = 61.56 m/s; vacuum time from post-burn apoapsis to the 125 km crossing = 27.0 min. These are impulsive two-body
figures.

[Source Rev7 PDF page 138; section classification: Atmospheric entry, orbital delivery and deorbit]

Source evidence — Rev7 master page 139
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Figure 1. Vacuum deorbit impulse sensitivity to selected
periapsis, holding apoapsis/circular-orbit altitude at 250 km. Target periapsis (km) Delta-v (m/s) EI speed (m/s) EI FPA (deg) Coast to
EI (min) -50 74.54 3,478.3 -2.43 24.0 -25

68.02 3,484.6 -2.24 25.3 61.56 3,490.9 -2.04 27.0 55.15 3,497.1 -1.82 28.9 48.81

3,503.2 -1.57 31.4 42.52 3,509.3 -1.28 34.7 36.28 3,515.3 -0.90 39.7 2.2 Thrust-versus-time with finite mass expenditure For a constant-
thrust engine with vacuum specific impulse Isp, c = g0 Isp, mass-flow = T/c and mass drops during firing.

The usual ideal rocket equation determines the required propellant. The resulting burn duration is an analytic propulsion
calculation, NOT a finite-burn orbit propagator: burn direction, gravity losses, pointing and apsis shift are excluded. m_prop = m0
[1 - exp(-Delta-v/(g0 Isp))] ; m_dot = T/(g0 Isp) ; t_burn = m_prop/m_dot a(t) = T / [m0 - m_dot t] ; Delta-v(t) = g0 Isp ln[m0/(m0 - m_dot
t)] At 450 kg initial carrier mass, 225 s Isp and 100 N thrust: 12.38 kg propellant and 273.2 s (4.55 min) ideal burn; acceleration
increases from 0.222 to 0.229 m/s². The modeled burn is 4.1% of orbital period, so navigation must propagate continuous thrust.

[Source Rev7 PDF page 139; section classification: Atmospheric entry, orbital delivery and deorbit]
Historical source visual from original Rev7 PDF page 139, image ID 725

Source evidence — Rev7 master page 140
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Figure 2. Duration changes with thrust for the same
nominal impulsive delta-v. At the 10 N case, burn duration is ~41% of the starting orbit period and an impulsive orbit
interpretation is especially poor. Thrust (N) Burn (min) Propellant (kg) Orbit fraction (%) Initial accel (m/s²) 45.53 12.38 41.0 0.022
18.21

12.38 16.4 0.056 9.11 12.38 8.2 0.111 4.55 12.38 4.1 0.222 1.82 12.38

1.6 0.556 0.91 12.38 0.8 1.111 Figure 3. Constant-thrust ideal-rocket 100 N reference case: cumulative delta-v and mass-reduction-
driven acceleration. Burn t (s) Cumulative delta-v (m/s) Acceleration (m/s²) Carrier mass (kg) 0.0 0.00

0.2222 450.00 34.1 7.60 0.2230 448.45 68.3 15.23 0.2238 446.90

[Source Rev7 PDF page 140; section classification: Atmospheric entry, orbital delivery and deorbit]




Historical source visual from original Rev7 PDF page 140, image ID 729




Historical source visual from original Rev7 PDF page 140, image ID 730

Source evidence — Rev7 master page 141
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Burn t (s) Cumulative delta-v (m/s) Acceleration (m/s²)
Carrier mass (kg) 102.4 22.88 0.2245 445.36 136.6 30.56 0.2253 443.81

170.7 38.27 0.2261 442.26 204.9 46.01 0.2269 440.71 239.0 53.77 0.2277 439.17 273.2

61.56 0.2285 437.62 Blocking discrepancy: the trajectory used in the original Freya entry study (gamma = -13 degrees) is not
produced by the low-impulse 250 km circular-orbit deorbit state (about -2 degrees). No coupled six-degree-of-freedom
trajectory/targeting solution exists yet. 3. Entry trajectory and heat-shield aerodynamic performance The atmospheric calculations
use a planar point mass in an exponential atmosphere with zero aerodynamic lift, no winds, simplified drag, spherical gravity and
a blunt-body empirical stagnation correlation. The two entry cases are separately integrated; neither is a Mars-GRAM, CFD, 6-DOF,
or flight-navigation prediction. The more shallow trajectory generates about twice the modeled integrated convective energy
despite its smaller peak flux. rho(h) = rho0 exp(-h/H) ; q_dynamic = rho v^2 / 2 ; D = (1/2) rho v^2 Cd A dh/dt = v sin(gamma) ; dv/dt
= -D/m - g sin(gamma)

dgamma/dt = [v/(R+h) - g/v] cos(gamma) ; A = pi D_shield^2 / 4 q_dot_conv = k sqrt(rho/R_n) v^3 ; k = 1.898 x 10^-4 (SI coefficient
assumed), R_n = 0.25 D_shield. Q_conv = integral q_dot_conv dt ; peak drag g = max(D/(m g0)). Figure 4. Entry altitude evolution: a
low-orbit-derived, shallow entry stays aloft much longer than the legacy steep state. Both use the same simplified local atmosphere.
Case Peak heat (W/cm²) Integrated load (MJ/m²) Peak drag (g) First release

(s) Release speed (m/s) Steep Rev1 reference 14.25 9.58 5.03 252.2 155.6

[Source Rev7 PDF page 141; section classification: Atmospheric entry, orbital delivery and deorbit]




Historical source visual from original Rev7 PDF page 141, image ID 733

Source evidence — Rev7 master page 142
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Case Peak heat (W/cm²) Integrated load (MJ/m²) Peak drag
(g) First release (s) Release speed (m/s) 250 km deorbit, shallow

6.67 20.60 1.81 712.9 157.9 3.1 Heat shield diameter variation (fixed steep-entry case) Figure 5. Atmospheric braking and convective
heating change with diameter; curve is calculated with an assumed fixed Cd, not a measured ballistic coefficient. Shield D (m) Peak
heat (W/cm²) Peak g Release V (m/s) 0.70

28.30 5.06 319.2 0.80 23.10 5.05 243.4 0.90 19.32 5.04 200.6 1.00 16.46

5.04 174.1 1.10 14.25 5.03 155.6 1.20 12.48 5.03 141.2 1.30 11.06 5.02

129.2 1.40 9.88 5.02 118.9 1.50 8.90 5.01 110.0 1.60 8.07 5.01 102.2

1.70 7.36 5.01 95.4 1.80 6.75 5.00 89.4

[Source Rev7 PDF page 142; section classification: Atmospheric entry, orbital delivery and deorbit]




Historical source visual from original Rev7 PDF page 142, image ID 736
Source evidence — Rev7 master page 146
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified 5.3 Six-probe output table: orbit-derived shallow entry The
following changes entry interface speed and flight-path angle to the orbital trade result and re-runs the same atmospheric and
penetrator equations. The orbit altitude origin and entry-model altitude origin still differ by the assumed site offset, so this is not
yet a fully coherent navigation trajectory. Material Probe Release time (s) Drogue D (m) Impact V (m/s) Angle (deg) Depth (m) ice

712.9 0.728 89.0 1.30 1.500 ice 714.9 0.728 89.0 1.32 1.500 ice 716.9

0.728 89.0 1.34 1.500 ice 718.9 0.728 89.0 1.33 1.500 ice 720.9 0.728

89.0 1.30 1.500 ice 722.9 0.728 89.0 1.25 1.500 dry 712.9 0.218 239.5

8.61 1.500 dry 714.9 0.209 239.5 8.30 1.500 dry 716.9 0.197 239.5 7.94

1.500 dry 718.9 0.182 239.5 7.54 1.500 dry 720.9 0.161 239.5 7.09 1.500

dry 722.9 0.132 239.5 6.55 1.500 damp 712.9 0.363 179.6 6.91 1.500 damp

714.9 0.360 179.6 6.69 1.500 damp 716.9 0.356 179.6 6.43 1.500 damp 718.9

0.350 179.6 6.13 1.500 damp 720.9 0.344 179.6 5.77 1.500 damp 722.9 0.335

179.6 5.34 1.500 5.4 Penetration curve numerical samples (same equations as chart) Impact speed (m/s) Ice depth (m) Damp
sandstone depth (m) Dry sandstone depth (m) 1.24 0.38 0.23 1.53 0.48

0.28 2.49 0.79 0.48 4.57 1.51 0.96 6.59 2.24 1.50 8.44 2.94 2.05

[Source Rev7 PDF page 146; section classification: Atmospheric entry, orbital delivery and deorbit]
5. Penetration mechanics and impact qualification
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 37
• Restoring penetration with ballast gives back the entire saving. Adding mass to match the unibody sectional density needs 0.73–
0.81 kg of ballast, which is exactly the structural mass saved (both are mass in the same body), so the net mass benefit is zero if
penetration depth must be preserved. • Buckling is not the discriminator. Even at the 60 GPa composite modulus the Euler margin
at three times the average impact load is 2 (50/1.5), 8 (60/2) and 24 (70/2.5); the fatter tubes keep comfortable column-stability
margin. • The composite body is a far better thermal isolator: through-wall conductivity falls from 44.5 to about 0.8 W/m·K, roughly
fifty-fold, so it conducts much less heat from warm internal hardware into the structure and out to the soil. This does not change
the soil-limited side-loss screen of Section 7.2, which is set by the regolith, but it reduces parasitic conduction through the shell and
helps a warmed mode (PR-04). Where the composite case is weak

The mass model cannot see the reasons a penetrator is usually metal. These are qualitative but decisive. Concern Why it matters
for a penetrator Source Impact damage tolerance A single impact can cut the compressive residual strength of a CFRP laminate by
40–60 %; the weak directions are interlaminar shear and through-thickness tension, exactly the stresses a decelerating buried body
sees. DS2 designed its metal forebody for 30,000 g. [51][52]; [18] The steel-to-composite joint Bonded or bolted metal-to-CFRP joints
fail by delamination under shock; drilling holes cuts fibres and concentrates stress. Fibre-metal laminates, metal

doublers or 3D-printed penetrative anchors are used to carry impact through the interface, and add mass and process complexity.
This is the hardest part of the hybrid and the collar mass here is only an allowance. [53][54] Cold plus impact Mars-night
temperatures (soil near 217.5 K [2]) embrittle the matrix and the steel-composite coefficient-of-thermal-expansion mismatch
stresses the joint before impact even begins. No cold-impact data for this joint exists. [2]; general Planetary protection Resin
outgassing and the compatibility of a cured laminate with dry-heat microbial reduction, vapour hydrogen peroxide or ethylene
oxide must be shown; sealed laminate volumes are hard to sterilise and to verify (Section 12).

[10][34] Heritage, cost and inspection Flown Mars penetrators (DS2) are metal; the 2005 study penetrator is metal [21]. A composite
body needs non-destructive inspection for delamination and has no penetrator flight heritage. [20][21] Reading the trade NOTE
The honest summary is that the hybrid is attractive only if penetration depth has margin to spare, if the joint can be qualified for
impact, and if parasitic structural mass is the binding constraint. If penetration depth is the binding constraint, the composite body
buys nothing once ballast is added, and it adds the joint, cold-impact, sterilisation and inspection risks that the unibody avoids. A
middle path is worth noting: the steel head's share of mass (62–72 %) shows that most of the penetrator wants to be metal
regardless. A fibre-metal-laminate barrel, a thin steel liner inside a composite overwrap, keeps metal continuity through the

joint and recovers some impact tolerance at part of the mass saving; it is not modelled here. The composite body also pairs
naturally with a buried-radio architecture only if the tube is not an RF screen, which a carbon laminate largely is, so a composite
body reinforces the Revision 4 choice to keep the antenna on the surface aftbody (Section 9). Decision Recommendation Reopen if
Forebody structural architecture Carry unibody steel as the baseline for the 60/2 and 70/2.5 candidates into CAD and drop testing.
Carry the steel- head/CFRP-body hybrid, and the fibre-metal-laminate variant, as a parallel mass-reduction study, not as the
baseline.

Drop tests show the joint survives impact at the design load and cold, and penetration depth has margin, or structural mass
becomes the binding constraint on carrier closure (Section 11.3). Preliminary. No hardware configuration is flight qualified.
Prepared for Robert J Mills, 26 October 2026 Page 21

[Source Rev7 PDF page 37; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 45
Figure 8. Illustrative UHF return-link margin versus slant range for two transmit powers and three data rates. Basis: Friis free-
space loss with the assumptions in A-20. Not a certified link analysis. Reading the result. A 1 W AX100-class radio closes 8 kbps with
about 4 dB of margin out to 1,000 km, and has almost none at 1,500 km; 32 kbps needs 5 W at long range. A six minute pass moves
2.9, 11.5 or 46.1 Mbit at 8, 32 or 128 kbps; a pass above 15° elevation at 400 km lasts up to about 10 minutes (about 8 minutes at 300
km). That is ample for environmental time series and spectra and not for imagery. Because Doppler, orbiter pointing, ground
reflections and the antenna lying on its side (a DS2 candidate failure [17]) are not modeled, a margin of 3 dB or more at the
minimum elevation should be a requirement (COM03), not a hope. 10 Structure, impact and penetration 10.1 Impact energy and
average deceleration E = m_fore v²/2; average a = v²/2s; average force = m_fore a; characteristic stopping time 2s/v. At 100 m/s and
0.5 m the average is about 1,020 g and the 70 mm forebody carries 17.6 kJ. Peak component loads can be much larger. This screen
does not predict penetration depth or qualify hardware.

Average deceleration, Earth g 0.25 m 0.5 m 1.0 m Comment 50 m/s 75 m/s 1,147 100 m/s 2,039 1,020 Rev 4 reference 150 m/s

4,589 2,294 1,147 200 m/s 8,158 4,079 2,039 DS2 about 190 m/s PEER REVIEW · MODERATE PR-15 Average deceleration is not a
design load. DS2 was designed for 30,000 g on the forebody and 80,000 g on the aftbody, with up to 30,000 g between them [18]. Its
mean deceleration over a 0.6 m penetration at 190 m/s is only about 3,070 g, so its design load was about ten times the mean. A
FREYA component specification should be derived from instrumented drop tests (MECH04), not from v²/2s. Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026

Page 29

[Source Rev7 PDF page 45; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 46
Figure 9. Average deceleration for chosen speeds and stopping distances, with the DS2 average marked. Basis: a = v²/2s. DS2 point
from 190 m/s and 0.6 m [19]; design load from [18]. 10.2 Structural screen The mass model has no structural check. The Euler
screen in Section 5.3 gives each candidate a column-buckling margin against the average axial impact load. It converts the
rejection of 35/1.5 into a reproducible result (PR-16). It does not account for soil lateral support, which helps, nor for bending from
oblique impact, local wall buckling, nose design, joint strength or cold embrittlement, which hurt. DS2 expected an angle of attack
below 12° [20]; FREYA has no dispersion analysis. The structural question is therefore reduced, not closed: finite-element analysis
and cold oblique impact tests (R05, R06) remain the gating evidence, and hardness, toughness and joint design must be chosen
together (MECH01). 10.3 Penetration scaling (indicative) PEER REVIEW · MODERATE PR-17 Revision 4 withdrew its penetration
solver because its sandstone and ice coefficients were uncalibrated, and offered nothing in its place. Sectional density (forebody
mass over frontal area) is the leading discriminator in the empirical Young/Sandia equations: for impact speed v of 61 m/s or more,
depth x = 0.000018 S N K (m/A)^0.7 (v − 30.5) in SI

units, where S is a soil penetrability number, N a nose coefficient and K a mass-scaling factor [22]. This review does not evaluate S,
N or K. It scales relative to a published calibration point instead. Calibration point: a 2005 ESA-study penetrator forebody of 3.2 kg
and 2.0×10⁻³ m² (sectional density 1,600 kg/m²) at 150 m/s was predicted to penetrate 0.76–1.36 m for S = 5–9 [21]. Scaling by
(SD/1,600)^0.7 × (v − 30.5)/(150 − 30.5), with nose and mass-scaling factors held equal, gives the following ranges. Forebody Sect.
density kg/m² Depth at 100 m/s, S = 5–9 Depth at 150 m/s, S = 5–9 35/1.5 3,701 0.79–1.42 m 1.36–2.45 m

50/1.5 (equal volume) 1,599 0.44–0.79 m 0.76–1.36 m 50/1.5 (2 kg reduced case) 0.23–0.41 m 0.39–0.70 m 60/2 1,179 0.36–0.64 m 0.61–
1.10 m 70/2.5 0.30–0.54 m

0.51–0.92 m 80/3 0.26–0.46 m 0.44–0.79 m DS2 forebody (reference) 0.25–0.44 m 0.42–0.76 m Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 30

[Source Rev7 PDF page 46; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 56
Risk Issue Closure evidence Reviewer note Gate R04 Science envelope does not fit Obtain CAD and measure package bulk density
Raised: density and ancillary volume unsourced (PR-31, PR-32). G0 R05

Narrow chassis buckles or bends Cold oblique impact tests and finite element analysis 35 mm fails Euler screen; others pass at
average load (§5.3). G2 R06 Hard steel fractures in cold impact Toughness and heat-treatment qualification Strength–toughness
data in [45]; no cold data. G2

R07 Potting cracks or contaminates assay Thermal cycling, shock and chemical blanks Analog resin only (PR-27). G2 R08 Battery
failure after impact Cold shock capacity and safety testing DS2 reviewers listed battery failure on impact as plausible [17]. G2

R09 Tether snags or severs Dynamic payout and penetration demonstration G3 R10 Antenna remains buried or misoriented
Surface emplacement and RF tests DS2 candidate failure: lands on its side [17]. G3 R11 Relay link or access unavailable

Selected service agreement and pass- based link budget MAVEN ended; four aging orbiters; new network by about 2030 (PR-11). G1
R12 Drogue or separation fails Rarefied-atmosphere deployment tests Sizing in §11.2. G3 R13 Entry scenario transferred incorrectly

Independent trajectory review Entry state from orbit now tabulated (§11.1). G1 R14 Heat shield undersized CFD, thermal response,
margins and arcjet evidence Orbit entry about 3.5 km/s; direct entry differs. G3 R15 Treatment damages measurements Residue
and compatibility validation
G3 R16 Recontamination during assembly Barrier and witness verification G3 R17 Local geology prevents emplacement Site analog
impact matrix and targeting review Penetration scaling is relative only (§10.3). G3

R18 Heated probe changes habitat Coupled soil and sample thermal model and untreated reference Link to R27. G2 R19 Incomplete
hardware allowances Vendor BOM and measured assembly Aftbody 0.87 kg versus 5.6 kg in a 2005 study (scope unverified). G1
R20

Carrier mass no longer closes Re-size capsule, dispenser and TPS Closure condition f ≤ 26.8 % for six probes (§11.3). G1 R21
Insufficient replication Power analysis with spatial heterogeneity G1 R22 Model used as flight qualification Independent expert
review and

documented model limits This review is by an AI and is not that independent review. G4 R23 (new) Energy and duration cannot
test the science hypothesis (delayed recovery) State hypothesis; demonstrate detectable response within the energy ledger PR-05;
timescales 20–160 days [35]. G0

R24 (new) Soil heat loss exceeds available power Thermal model across k = 0.02–2 W/m K; insulation design PR-04; 1.32 W at k
0.039. G1 R25 (new) Radio and relay protocol mismatch Interoperability test; Proximity-1 radio selected PR-10.

G3 R26 (new) Relay network degrades before arrival Service agreement; backup relay on carrier PR-11. G1 Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 40

[Source Rev7 PDF page 56; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 66
# Citation Used for Status What was confirmed, and link [52] US patent 11,207,867, bio-inspired CFRP laminate (background); De
Moura & Marques, as cited therein. Compressive residual strength after impact Secondary Compressive residual strength reduced
up to 60 % by in-service

impact. https://image- ppubs.uspto.gov/dirsearch- public/print/downloadPdf/112078 [53] Performance of Hybrid Reinforced
Composite Substrates in Adhesively Bonded Joints Under Varied Loading Rates. Materials (MDPI), PMC11859037. Metal-composite
joint failure Verified CFRP-only single-lap joints fail by delamination; metal (fibre-metal- laminate) reinforcement shifts failure to
cohesive and raises

impact failure load and energy absorption. https://www.ncbi.nlm.nih.gov/pm c/articles/PMC11859037/ [54] Zhao, K., et al. (2024).
Low-velocity impact damage and optimization of metal and CFRP through-thickness reinforcement connection structures. Cailiao
Gongcheng. Through-thickness reinforced metal-CFRP joint Secondary A co-cured metal "synapse" (penetrative anchor) joint raised

impact absorption 216 % over bolted joints and suppressed delamination. https://doaj.org/article/4a380244
7b2a461da3d0669e3a129eb0 NOTE Where a number in this report is described as "general knowledge" (typical direct-entry speeds
of 5.5–7.5 km/s; the roughly 26-month Mars launch-window cadence), it was not checked against a source in this review and
appears in the text with that flag. 18.3 Recommended additions (not opened in this review) Source Why a human reviewer should
obtain it NASA SP-6105, NASA Systems Engineering Handbook Margin, maturity and review-gate conventions for Section 13.

MMPDS (or MIL-HDBK-5) data for 4340 Qualified design allowables and low-temperature behavior for MECH01. ASTM E595 and
NASA-STD-8739.1 Outgassing screening and workmanship for potting and polymeric assemblies (PR-27). ISO 11135 (ethylene oxide
sterilization) and NASA- HDBK-6022 Process validation and legacy microbial-examination practice (§12). Neveu et al. (2018), The
Ladder of Life Detection, Astrobiology 18(11) Structured evidence ladder for SCI02 and SCI05. Mars Climate Database (or
equivalent) Site-specific density, pressure and temperature to replace single-value atmosphere inputs (A-24). 18.4 Source-to-claim
map

Claim in this report Value Class Source and status Emplacement depth of IMPRESS probes 0.2–1 m S [1] abstract (verified) Mean
soil temperature at 10–20 cm, InSight 217.5 K S [2] (verified) Soil thermal diffusivity (annual, 40 cm)

(3.63 ± 0.53)×10⁻⁸ m²/s S [2] (verified) Soil thermal conductivity 0.039 ± 0.002 W/m K S [14] (verified) Mars μ and radius
4.282837×10¹³ m³/s²; 3,389.5 km S [16] (verified) Surface atmospheric density 0.016 ± 0.006 kg/m³

S [16] (verified) DS2 probe mass, impact speed, depth 2.4 kg; ≈ 190 m/s; ≤ 0.6 m S [19] (verified) Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 50

[Source Rev7 PDF page 66; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 73
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 4 Supplementary
evidence and payload selection The supplied supplement [13], Tables S1–S3, distinguishes heritage, candidate instruments and
astrobiology concepts. Its readiness labels do not constitute FREYA qualification. DS2 is listed at 2.4 kg and 190 m/s, with no post-
impact response; this is not successful Mars survival heritage. Small instruments are classified at up to 305 cm3, not a guaranteed
mass. Table T03 Supplementary payload data and packaging implications Supplement datum Implication for this trade Humidity
sensor 45 g and 124 cm3 About 80% of the reduced science envelope before other instruments Radiometer 25 g plus 56 g processor
Include processor mass; avoid counting shared control twice

Microseismometer 12 cm3 example Small volume does not establish full integrated mass Larger metabolic packages and complex
organic analysis Do not presume complete assay fits either allocation The resulting engineering inference is that 0.31 kg capacity is
only a packaging ceiling. Vendor designs must establish a useful suite. Keep detection-method maturity separate from impact
readiness, and evaluate chemistry controls as well as mass. The source is saved separately as an author-hosted copy; the publisher
PDF was read through indexed retrieval, but its direct download returned 403. Version identity is not asserted.

[Source Rev7 PDF page 73; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 74
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 5 1 Findings and
decision basis Carry 60 mm and 70 mm candidates into CAD and impact testing. The 50 mm reference remains essential for
comparison; its 1.5 mm wall is a published geometry, not evidence that a much longer 1 kg science configuration survives Mars
impact. Reject the 35 mm candidate as the preferred packaging path under the current 0.5 L science-envelope assumption because
it becomes exceptionally slender. Table T04 Equal volume diameter and mass trade Candidate Length mm Steel kg Nominal kg
With 25% kg

35 mm / 1.5 mm wall 1.648 4.431 5.538 50 mm / 1.5 mm wall 1.227 4.009 5.012 50 mm / 2 mm wall 1.613 4.395 5.494 60 mm / 2 mm
wall

1.422 4.204 5.255 70 mm / 2.5 mm wall 1.608 4.390 5.488 80 mm / 3 mm wall 1.800 4.582 5.728 These are comparable concepts at
equal cylindrical cavity volume, not equal fixed length. Cavity volume is 0.954 L. Wall schedules differ intentionally to screen
plausible geometry; a same-wall comparison is available in the website. Hardness,

cold fracture toughness, local stresses, penetrator stability and instrument clearances are not solved by the mass model. The 70
mm concept contains 3.520 kg nominal forebody hardware and 0.870 kg of surface-head/aftbody hardware. Its mass contingency is
1.098 kg. Use nominal forebody mass for impact-energy examples, because surface hardware is intended to decouple; add aftbody
coupling only when a measured separation sequence establishes it. Six budgeted 70 mm probes consume 32.93 kg. Retaining the
inherited 21 kg carrier placeholder yields 53.93 kg entry mass. At 45 kg total only 12.07 kg remains for carrier/TPS/dispenser. The
previous carrier ledger therefore does not close. The 21 kg figure is historical, not a re-sized carrier design.

[Source Rev7 PDF page 74; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 121
FREYA | Revision 5 | Engineering study - preliminary Page 2 Parameter Baseline / status FREYA entry vehicle 45 kg; six
penetrators Penetrator mass 4.0 kg maximum Science package 1.0 kg allocation Batteries, heaters, controller 0.5 kg allocation
Parachute and antenna

0.5 kg allocation Nose, chassis, structural supports, potting 2.0 kg remaining allocation Qualification material Dry, strongly
cemented sandstone; proposed UCS 100-150 MPa Impact study envelope 100-250 m/s; 150 m/s illustrative reference Shock cases
10,000 g nominal peak design sensitivity; 20,000 g structural sensitivity; unvalidated 4. Illustrative impact kinematics For 4.0 kg
stopping over 0.75 m, constant-average-deceleration kinematics give a = v²/(2d), kinetic energy E = 0.5mv², and mean force F = ma.
These values do not predict penetration into sandstone and are not peak

shock estimates. Velocity Energy Average decel. Mean force 100 m/s 20.0 kJ 680 g 26.7 kN 125 m/s 31.2 kJ 1,062 g 41.7 kN

150 m/s 45.0 kJ 1,530 g 60.0 kN 175 m/s 61.2 kJ 2,082 g 81.7 kN 200 m/s 80.0 kJ 2,719 g 106.7 kN 225 m/s

101.2 kJ 3,442 g 135.0 kN 250 m/s 125.0 kJ 4,249 g 166.7 kN 5. Qualification and science success criteria PEN-001: Demonstrate at
least 0.75 m nose penetration in the specified hard sandstone across bedding orientations and representative thermal conditions.
SCI-001: Demonstrate sampling or in-situ measurement at least 0.50 m below the original, undisturbed surface. SCI-002:
Demonstrate sample provenance and contamination control; an inlet at depth alone is insufficient. STR-001: Measure peak shock
and verify survival of science instruments, mounts, seals, and sampling mechanism. VAL-001: Calibrate penetration and dynamic

structural models against instrumented tests. SYS-001: Stay within the 4 kg penetrator budget.

[Source Rev7 PDF page 121; section classification: Penetration mechanics and impact qualification]
Source evidence — Rev7 master page 124
4. Updated impact kinematics at 0.75 m stopping distance For 4 kg: E = 0.5mv²; average deceleration a = v²/(2 × 0.75 m); mean force
F = ma. These are conditional calculations assuming the penetrator stops over exactly 0.75 m. They do not predict actual depth in
sandstone or peak shock. Velocity Energy Average decel. Mean force 100 m/s 20.0 kJ 680 g 26.7 kN 125 m/s

31.25 kJ 1,062 g 41.7 kN 150 m/s 45.0 kJ 1,529 g 60.0 kN 175 m/s 61.25 kJ 2,082 g 81.7 kN 200 m/s 80.0 kJ

2,719 g 106.7 kN 225 m/s 101.25 kJ 3,441 g 135.0 kN 250 m/s 125.0 kJ 4,249 g 166.7 kN 5. Shock load and section sensitivity At 10,000
g, a 4 kg penetrator corresponds to 392.3 kN vehicle-level inertial force; the 1 kg science package alone corresponds to 98.1 kN. At
20,000 g those values double. These loads are not necessarily carried through every

chassis cross-section. Solid circular diameter Nominal stress at 10,000 g Nominal stress at 20,000 g 20 mm 1,249 MPa 2,497 MPa 25
mm 799 MPa 1,598 MPa 30 mm 555 MPa 1,110 MPa

35 mm 408 MPa 816 MPa 40 mm 312 MPa 624 MPa The solid-section model is an upper-bound load-path illustration, not a chassis
stress solution. Real shells are hollow, may carry only part of the total mass, and require bending, local contact, stress-wave, and
joint analysis. 6. Architecture trade and recommendation Candidate Benefit Principal limitation All-steel nose/chassis

Robust impact contact and ductile load transfer Mass; high transmitted shock All-CFRP nose/chassis High axial specific strength;
low mass Nose erosion, off-axis failure, delamination Steel nose and primary spine + CFRP rear Possible mass saving with steel
carrying nose loads Joint and thermal mismatch; shock

interface validation

[Source Rev7 PDF page 124; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 127
FREYA | Preliminary concept screening | October 2026 Parameter Nominal Status Entry velocity / angle 3,450 m/s / -13 deg
Assumed osculating entry state Target site Hellas deep lowland; local h=0 Topography data [2] Surface air density / scale height
0.025 kg/m3 / 11.0 km Lowland illustration; high uncertainty [1,3]

Probe diameter / target burial depth 0.035 m / 1.50 m Geometry assumption / requirement Not included: trajectory-dispersed
landing ellipse, detailed flight mechanics of a 5-7 month transfer, supersonic/turbulent CFD, transient structural/TPS heating,
parachute dynamics and inflation testing, rock fracture, shrapnel or ejecta, or buried UHF link feasibility. These omissions affect
program feasibility. 2. Grounded source data and material model assumptions NASA lists mean Martian gravity of ~3.7 m/s2,
representative density ~0.016 +/- 0.006 kg/m3, and atmospheric scale height ~11 km [1]. Deep Hellas elevations have greater surface
pressure; because density changes seasonally and geographically the lowland reference density 0.025 kg/m3 is a scenario
assumption, not a climate lookup for a specific landing sol. The 70-degree sphere-cone heritage and parachute dynamic pressure
limits are drawn from NASA flight data [4,5]. Material

Nominal effective resistance Density Interpretation Cold solid ice 12 MPa 920 kg/m3 Uncalibrated effective nose resistance; ice
rate/T effects significant Dry sandstone 70 MPa 2,300 kg/m3 Within published 25-100 MPa sandstone UCS

envelope [6] Damp sandstone 40 MPa 2,200 kg/m3 Hypothetical wet weak rock; not guaranteed stable at Mars surface [6,7]
CRITICAL: These values are effective dynamic axial penetration resistance proxies borrowed in scale from compressive-strength
literature, not proven equal to unconfined compressive strength (UCS). Nose geometry, porosity, cracking, grain size, moisture,
temperature, strain rate, overburden and lateral confinement can change resistance by multiples. The fixed 0.5 inertial-drag factor
is also assumed, not fitted to Mars tests. Since Mars soils may be loose regolith above intact bedrock, no assertion is made that a
probe consistently hits a uniform 1.5 m solid target. 3. Coupled dynamics and governing equations

3.1 Atmospheric entry, 2-D point-mass trajectory rho(h) = rho0 * exp(-h/H); g(h) = g0 * [R / (R+h)]² A_shield = pi * D_shield² / 4; beta =
m / (Cd_shield * A_shield); q_dyn = 0.5 * rho * V² dh/dt = V sin(gamma); dV/dt = -q_dyn*Cd_shield*A_shield/m - g sin(gamma)
d(gamma)/dt = [V/(R+h) - g/V] cos(gamma); dx/dt = V cos(gamma) R/(R+h)

[Source Rev7 PDF page 127; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 128
FREYA | Preliminary concept screening | October 2026 Here gamma is signed below local horizontal, R=3,389,500 m,
Cd_shield=1.50 and the entry body is assumed perfectly trimmed, nonlifting and axisymmetric. An adaptive SciPy Runge-Kutta
solver propagates the capsule; once each 5 kg penetrator leaves, mass decreases for the subsequent two-second segment. Cd is held
constant with Mach, which is a material limitation. [1,4] 3.2 First-order aerothermal screening qdot_stag = k_M * sqrt(rho/R_n) * V³;
k_M = 1.898e-4 (SI screening value); R_n = 0.25*D_shield Q_stag = integral qdot_stag dt; load_g,entry = q_dyn*Cd*A/(m*9.80665) The
coefficient comes from a published Mars trajectory-model reference [8] and is used as a proxy, not a TPS certification correlation.
NASA reports more advanced Mars-specific convective/radiative heating correlations with finite prediction error [9]. Radiation,
rarefied flow, turbulent transition, pyrolysis and back-shell heating are not modeled. In particular, the simplistic peak heat
threshold discussed in Section 6 is an engineering screen, not a tested PICA limit.

3.3 Independent penetrator with drogue and cutaway A_p = pi*d_p²/4; A_ch = pi*d_ch²/4; F_drag = 0.5*rho*V²*(Cd_probe*A_p +
Cd_ch*A_ch) d(vx)/dt = -(F_drag/(m V))*vx; d(vz)/dt = -g -(F_drag/(m V))*vz Each released penetrator free-flies for 1.5 s to clear the
capsule, opens a parachute with Cd_ch=0.55 (a NASA-tested approximate disk-gap-band value [10]), descends toward 100 m AGL,
then cuts away the drogue; the final 100 m is ballistic with probe Cd=0.45. Dynamic pressure at opening, and residual horizontal
impact speed, are calculated. The opening itself is treated as instantaneous drag area, not a realistic transient inflation response or
stable deployment simulation. 3.4 Penetration and shock model F_resist(v) = eta*A_p*Y_eff + k_d*rho_target*A_p*v² ; eta=1.0 ;
k_d=0.50 dV/dt = g - F_resist(V)/m ; m*V*dV/dx = m*g - F_resist(V) Let F0 = eta*A_p*Y_eff and K = k_d*rho_target*A_p. Then
penetration L = (m/(2K))*ln[1 + K*Vimpact²/(F0-m*g)]. Vrequired(L) = sqrt{[(F0-m*g)/K]*[exp(2*K*L/m)-1]}

a_initial,gE = [F0 + K*Vimpact² - m*g]/(m*9.80665); a_average,gE = Vimpact²/(2*L*9.80665) The calculated initial resistance is the
maximum in this velocity-dependent model, but not a real shock peak: rock rupture produces spikes, and an oblique impact can
change peak deceleration significantly. All “g” values in the output refer to Earth standard g. The 1.5 m length is along the
penetrator axis; vertical depth is L*cos(impact obliquity). The model neglects probe breakup and stratification.

[Source Rev7 PDF page 128; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 130
FREYA | Preliminary concept screening | October 2026 Shield D (m) Beta (kg/m2) V at 8 km (m/s) Peak heat (W/cm2) 1.10 31.6
155.6 14.2 1.20 26.5 141.2 12.5

1.30 22.6 129.2 11.1 1.50 17.0 110.0 8.9 5. Target-specific impact physics and nominal 1.5 m requirement Substrate Required V (m/s)
Kinetic energy (kJ) Initial load (Earth g)

Mean load (Earth g) Solid ice 89.0 19.8 Dry sandstone 239.5 143.3 Damp sandstone 179.6 80.6 The three impact speeds are roots of
the nominal resistance equation. Consequently, attaining 1.5 m is an algebraic design condition; it is not an experimental
performance claim. For dry sandstone the initial acceleration exceeds 2,600 g even before accounting for fracture impulses,
making ruggedized structures, sealed batteries and

electronics packaging mandatory. NASA DS2 targeted ~180 m/s and lower depths in frozen/loose soils, and the deployed mission
never returned a successful probe signal. [11,12] Figure 3. Predicted penetration depths for the three uniform homogeneous
material assumptions. Colored circles mark the analytic 1.5 m targets.

[Source Rev7 PDF page 130; section classification: Penetration mechanics and impact qualification]




Historical source visual from original Rev7 PDF page 130, image ID 668

Source evidence — Rev7 master page 131
FREYA | Preliminary concept screening | October 2026 6. Event schedule for six sequential 5 kg probes The table below shows
separation states for the capsule whose retained mass drops from 45 to 40, 35, 30, 25, 20 and then 15 kg. Events use an 8 km first
release trigger and exactly 2 s separation spacing; no active booster is installed on the penetrators. Probe Entry time (s) Separation
AGL (m) Speed (m/s) Flight-path angle 252.2 155.6 -69.8 deg

254.2 152.2 -70.8 deg 256.2 147.7 -71.7 deg 258.2 141.9 -72.6 deg 260.2 134.6 -73.5 deg 262.2

125.4 -74.4 deg 6.1 Drogue sizing and free-fall outcome Solid ice Probe Chute diam. (m) Impact (m/s) Impact tilt (deg) Release-to-
impact (s) Max steady chute load (N) 0.728

89.0 1.4 75.1 36.4 0.728 89.0 1.5 72.8 35.9 0.728 89.0 1.5 70.7

34.7 0.728 89.0 1.5 68.7 33.0 0.728 89.0 1.4 67.1 30.5 0.727 89.0

1.4 65.8 27.2

[Source Rev7 PDF page 131; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 132
FREYA | Preliminary concept screening | October 2026 Dry sandstone Probe Chute diam. (m) Impact (m/s) Impact tilt (deg)
Release-to-impact (s) Max steady chute load (N) 0.215 239.5 9.7

40.3 14.0 0.206 239.5 9.3 39.2 12.9 0.195 239.5 8.9 38.2 11.5 0.180

239.5 8.5 37.4 9.8 0.160 239.5 8.0 36.8 7.8 0.132 239.5 7.4 36.5

5.3 Damp sandstone Probe Chute diam. (m) Impact (m/s) Impact tilt (deg) Release-to-impact (s) Max steady chute load (N) 0.361
179.6 7.7

46.2 22.0 0.358 179.5 7.5 44.9 21.6 0.354 179.6 7.2 43.8 21.1 0.349

179.6 6.9 42.8 20.5 0.343 179.6 6.5 42.1 19.8 0.334 179.6 6.0 41.6

18.8 Figure 4. Each material needs its own nominal chute family, and the later dry-rock probes require progressively smaller drag
areas.

[Source Rev7 PDF page 132; section classification: Penetration mechanics and impact qualification]




Historical source visual from original Rev7 PDF page 132, image ID 674

Source evidence — Rev7 master page 133
FREYA | Preliminary concept screening | October 2026 All individual parachute openings are below approximately 250 Pa
dynamic pressure in the baseline. The opening Mach number is subsonic in this lowland first-order atmosphere model, but line
stretch, porosity, aerodynamic interaction with the capsule, cloth packaging and inflation-load factors are not validated at these
unusually small dimensions. The parachute is discarded at 100 m to prevent it interfering with ground penetration; this requires
reliable altitude measurement and cutoff. Figure 5. Peak/initial shock in the homogeneous penetration model for each 5 kg probe.
Loads far exceed entry loads (~5 g). 7. Sensitivity, uncertainty and robustness Holding each nominal parachute diameter fixed
while changing only the atmosphere produces material depth changes. A ±30% surface-density envelope is an exploration range
rather than a formal Mars-GRAM probability distribution. Penetration resistance itself is also varied ±50% independent of
atmospheric variation. Substrate rho -30%

Nominal rho +30% Y -50% Y +50% Solid ice 2.06 1.50 1.19 2.69 1.04 Dry sandstone 1.76 1.50
1.33 2.39 1.10 Damp sandstone 1.88 1.50 1.24 2.41 1.10

[Source Rev7 PDF page 133; section classification: Penetration mechanics and impact qualification]




Historical source visual from original Rev7 PDF page 133, image ID 678

Source evidence — Rev7 master page 135
FREYA | Preliminary concept screening | October 2026 9. Major event risk register and tests needed Phase Primary failure
mechanism Verification gate Capture/deorbit Wrong periapsis, entry angle and corridor Three-body/nav Monte Carlo; Δv fuel
budget Hypersonic entry TPS burnout; spin/trim instability Mars CFD, arc-jet ablation, heat-structure FEM Shield/separation Five-
kg releases re-trim parent unpredictably

6-DOF separation CFD and multibody drop tests Drogue deployment Small canopy does not inflate or tangles Wind-tunnel/low-
pressure deployment, inflation tests Low-altitude cutoff Bad altimetry, drift, insufficient clearance Radar/lidar validation;
pyrotechnic mechanical redundancy Penetration Hard layers, ricochet, overpenetration, breakage Full-speed cryogenic ice/rock
gun tests Post-impact data

Buried RF attenuation, power loss, crushed sensors Communications relay/repeater experiment The highest-value immediate
experiment is a gas-gun impact series with instrumented, geometrically representative 5 kg prototypes into solid ice at -60 C and
colder, several dry sandstones and moisture-conditioned sandstone. Measure depth, max g, pulse duration, incident angle, fracture
and sensor survival across 80-350 m/s. Fit eta, k_d and strength distributions using the data; only then rerun the optimizer. The
“damp sandstone” case should be identified as a hypothetical analog until a site with physically credible moisture conditions is
identified. 10. Recommended development baseline and engineering decisions Candidate baseline: D_shield=1.10 m, nose radius
~0.275 m, Cd_shield=1.5, 45 kg initial mass, first release 8.0 km AGL, cadence 2 s, 1.5 s free-fly before drogue deployment, 100 m
cutoff, 35 mm diameter probes. At lowland rho0=0.025 kg/m3, probe 1 drogue diameter is ~0.73 m ice, ~0.36 m damp sandstone, or
~0.215 m dry sandstone. The complete six-probe sets appear in Section 6. The release scheme delivers model impact tilts below 10
degrees at nominal conditions; material resistance and real aerodynamic stability are still unknown.

These are three alternative mission configurations, not one mission automatically able to distinguish materials. Site mapping,
discriminating instruments, programmable drag or separate probe populations are needed if six probes must penetrate different
substrates during the same entry. The preferred development sequence is: characterize soil, calibrate penetration, prove
survivability and telemetry, establish low-pressure drogue stability, close the 45 kg mass budget, then optimize thermal shield and
targeting in a higher-fidelity Monte Carlo. 11. Reproducibility and numerical checks The separately delivered Python model and
JSON result tables contain solver settings, all constants and the six release and penetration outputs. Numerical integration uses
SciPy solve_ivp with sub-second maximum steps and relative tolerance ~10^-6 to 10^-7. Parachute diameters are solved by a scalar
root finder to meet the analytically inverted nominal depth requirement. Analytical penetration curves are monotonically
increasing with speed and the model conserves mass when probe stages separate. These are code consistency tests, not
independent validation. Sanity checks: the complete capsule ballistic coefficient is about 31.6 kg/m2; the peak aerodynamic entry
load is ~5 Earth g; the lowest nominal penetration resistance gives the lowest desired impact speed; nominal release state

magnitudes decrease as capsule mass is shed; and all 18 computed open-loop impact conditions are within 0.01 m of the algebraic
target in the implementation. This exact agreement reflects optimizer calibration against the same

[Source Rev7 PDF page 135; section classification: Penetration mechanics and impact qualification]
Source evidence — Rev7 master page 144
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified coupon testing, dedicated arcjet and shock tests, and
aeroshell structural dynamics; catalog material maximum heat flux alone cannot establish a safe thickness. 4.1 Candidate mass
budget: cannot close to acceptable margin Mass allocation kg Qualification Six 5 kg complete penetrators 30.00 Requirement
(includes each probe drogue) PICA 15 mm + assumed backing 7.47 Unverified thermal and structural sizing

Backshell + six-device dispenser 3.00 Assumed optimistic Parent avionics, power and communications 2.00 Assumed optimistic
Wiring, harness, mechanical integration 1.00 Assumed optimistic Test/assembly and other allocation 1.00 Assumed optimistic Mass
contingency (remainder)

0.53 Only ~1% of total mass; inadequate Mass-closure blocker: present 45 kg concept lacks meaningful growth allowance and
excludes dedicated onboard deorbit propulsion. A mature subsystem bill of materials plus uncertainty reserve is mandatory. 5.
Probe release, parachute sizing and rock/ice penetration After first separation at 8 km AGL, six 5 kg probes are released in 2 s
intervals and capsule mass steps down after each ejection. Each probe experiences 1.5 s free flight, then a simple quadratic-drag
drogue, and releases the drogue at 100 m AGL for ballistic impact. The optimizer adjusts each chute diameter until the same
assumed resistance equation produces a 1.5 m penetration depth. The model omits canopy inflation, Mach effects, elastic shock,
tether entanglement, spin and touchdown geometry. F_resist = F0 + K v^2 ; F0 = eta A_p Y_eff ; K = kd rho_target A_p ; A_p = pi
d_probe^2 / 4. L = (m / 2K) ln[1 + K v_impact^2 / (F0 - m g_Mars)].

v_required = sqrt[(F0 - m g_Mars)/K * (exp(2 K L/m) - 1)]. g_initial = (F0 + K v_impact^2 - m g_Mars)/(m g0) ; g_average =
v_impact^2/(2 L g0). The effective dynamic strengths are deliberately selected screening parameters: ice 12 MPa, damp sandstone
40 MPa and dry sandstone 70 MPa. A damp sandstone environment on contemporary Mars is only a hypothetical laboratory
analog; it should not be interpreted as a mapped liquid-water site. 5.1 Calculated target speeds and impact shock Substrate
Required V (m/s) Kinetic E (kJ) Initial shock (g) Avg shock (g) Pulse proxy (ms) Ice

89.0 19.8 33.7 Damp 179.6 80.6 1,480 1,096 16.7 Dry 239.5 143.3 2,667

1,949 12.5

[Source Rev7 PDF page 144; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 145
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Figure 7. Initial rigid-body g for model-fitted impact speeds.
Local shock peaks at components may differ significantly from the rigid-body calculation. 5.2 Six-probe output table: original steep
reference Material Probe Release AGL (m) Drogue D (m) Impact V (m/s) Depth (m) Shock (g) ice 8,000

0.728 89.0 1.500 ice 7,710 0.728 89.0 1.500 ice 7,426 0.728 89.0 1.500

ice 7,151 0.728 89.0 1.500 ice 6,887 0.728 89.0 1.500 ice 6,637 0.727

89.0 1.500 dry 8,000 0.215 239.5 1.500 2,667 dry 7,710 0.206 239.5 1.500

2,667 dry 7,426 0.195 239.5 1.500 2,667 dry 7,151 0.180 239.5 1.500 2,667

dry 6,887 0.160 239.5 1.500 2,667 dry 6,637 0.132 239.5 1.500 2,667 damp

8,000 0.361 179.6 1.500 1,480 damp 7,710 0.358 179.6 1.500 1,480 damp 7,426

0.354 179.6 1.500 1,480 damp 7,151 0.349 179.6 1.500 1,480 damp 6,887 0.343

179.6 1.500 1,480 damp 6,637 0.334 179.6 1.500 1,480

[Source Rev7 PDF page 145; section classification: Penetration mechanics and impact qualification]
Historical source visual from original Rev7 PDF page 145, image ID 744

Source evidence — Rev7 master page 150
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Required mitigations and acceptance evidence ID Required
action before risk closure R01 Instrumented cold ice/rock impact trials spanning geometry, obliquity and fracture; fit dynamic
force law. R02 Demonstrate >=1.5 m in representative competent sandstone; consider drilling or lower burial depth. R03 6-DOF
aero/spin testing, spin stabilization or fins; validate angle and tumble envelope. R04 Mach-q deployment map, inflation loads,
subscale low-density testing and opening shock. R05

Propagate finite burn + J2 + atmospheric dispersions; tie orbit and entry states with navigation covariance. R06 CFD and radiative
aeroheating, FIAT/PATO thermal response, bondline/temp/soak margin and arcjet tests. R07 Qualification shock spectra and pulse
width; potting, staking, encapsulated die, strain relief and functional re-test. R08 Custom-cased primary cells, current-limited
harness, shock+thermal testing and isolation after impact. R09 Detailed TPS/structure/dispenser/chutes/power budgets with growth
margin; charge propulsion to proper stage. R10 Test UHF attenuation through wet/dry/ice strata; use surface antenna/aftbody
linked by impact-rated tether. R11 Coupled six-body dispersions and actuator energy/timing with 6-DOF wake interaction.

R12 High-resolution terrain maps and prior orbital spectroscopy; model rocks, layers, regolith and ice. R13 Time-varying
mass/CG/inertia and aerodynamic stability through all six separations. R14 Mars planetary-protection classification, microbial-
reduction and material compatibility plan. R15 Storage, battery activation and heater budgeting over 5–7 month cruise and
descent. R16 Thermomechanical bondline stress, ply/tile joints and heat-shield release qualification. Blocking verification gates The
10 currently flagged design blockers are: validated penetration force law (R01); 1.5 m into competent sandstone without structural
failure (R02); impact attitude (R03); real drogue opening envelope (R04); finite-burn targeting (R05);

TPS thermal qualification (R06); instrument survival (R07); battery system survival and thermal operation (R08); 45 kg mass
closure (R09); and buried communications link (R10).

[Source Rev7 PDF page 150; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 153
FREYA • Concept feasibility screening • Not flight qualified FREYA | Mars penetrator delivery architecture Preliminary parametric
feasibility paper • 25 October 2026 • Revision 0.1 Six 5 kg penetrators in a 45 kg conical entry package; hypothesized 1.5 m target
penetration in ice and sandstone. Screening model only, not a flight design or validated geotechnical prediction. Abstract We
examine Mars atmospheric entry, drag deceleration, six-probe deployment, drogue stabilization and high-speed penetration. A
two-dimensional ballistic entry model and a separate vertical penetrator model expose the dependence on atmospheric density,
ballistic coefficient, drogue configuration and target resistance. The entry and probe trajectories are deliberately NOT joined
unless a feasible velocity/orientation handoff is demonstrated. A constant-resistance energy balance is used for first-pass
penetration sensitivity; its target pressures are exploratory parameters, not measurements of specified Martian rock. Mission
assumptions and missing requirements Quantity

Reference case / status Arrival Earth–Mars transfer 5–7 months (trajectory dependent); Mars arrival hyperbolic excess velocity
NOT specified. Mars orbit Illustrative low Mars orbit: circular at 250 km above reference radius, speed 3.43 km/s; release must
involve deorbi Entry velocity / angle 5.5 km/s, -14 degrees flight-path angle at 125 km above MOLA areoid; a distinct atmospheric-
entry architecture fro Entry vehicle 45 kg total; 1.5 m reference projected heat-shield diameter; assumed drag coefficient 1.5; no
thermal/TPS sizing ye Payload 6 x 5 kg = 30 kg; remaining 15 kg must cover shield/TPS, support, deployment, avionics, batteries,
parachutes and Site Hellas lowlands screening, -7.7 km MOLA elevation; vary local terrain +0 to +1 km. Coordinate-specific MOLA
and

Atmosphere Density 0.016 kg/m3 at zero datum, exponential scale height 11 km, gravity 3.711 m/s2; clear idealization of variab
Penetrator 5 kg; 45 mm frontal diameter; CD = 0.75; vertical release at 8 km AGL and 150 m/s down is a hypothetical handoff
Drogue Nominal 0.12 m projected diameter, CD = 0.7; opens 6 km AGL, jettisons 2 km AGL; modeling instantaneous trans Target
Constant effective resistance: solid ice 8 MPa; dry sandstone 25 MPa; damp sandstone 16 MPa. All three illustrativ Numerical
results: disjoint models Metric Preliminary estimate 45 kg entry peak drag 14.7 Earth g, at 47.1 km AGL, t = 64 s

Entry maximum dynamic pressure 2.44 kPa Entry speed at 8 km AGL 95 m/s at t=255 s; check velocity and direction before probe
release Unpowered 45 kg impact speed 64 m/s in this trajectory (no safe lander recovery) Independent 5 kg descent impact 271.3
m/s after 38 s, from assumed 8 km AGL vertical handoff Average penetration shock at 1.5 m 2,502 Earth g; peak shock may be
substantially higher Penetration sensitivity (unvalidated constant-resistance law)

[Source Rev7 PDF page 153; section classification: Penetration mechanics and impact qualification]

Source evidence — Rev7 master page 154
FREYA • Concept feasibility screening • Not flight qualified Target R (MPa) Speed for 1.5 m Predicted depth at baseline speed Solid
ice (illustrative) 87 m/s 14.49 m Dry sandstone (illustrative) 154 m/s 4.63 m Damp sandstone (illustrative) 124 m/s

7.24 m Interpretation: A single fixed speed cannot guarantee 1.5 m in different target lithologies. The nominal drogue schedule
may miss required speeds. Strong/heterogeneous rock, frozen fissures, impact obliquity, tip blunting and fragmentation can
dominate. These results must not be presented as actual penetration performance. Equations and modeling approach Altitude z
referenced to MOLA areoid, AGL h = z - z_site. Gravity g = 3.711 m/s2 (constant over this preliminary entry model); density rho(z) =
rho_0 exp(-z/H). Dynamic pressure q = 0.5 rho V^2; drag D = q C_D A; ballistic coefficient beta = m/(C_D A); A_shield = pi D_shield^2 /
4. Entry model: dz/dt = v_z, dx/dt = v_x, dv_z/dt = -g -(D/m)(v_z/V), dv_x/dt = -(D/m)(v_x/V), V = sqrt(v_x^2+v_z^2). This is flat-planet
planar screening; does not include rotational atmosphere, Mars curvature, lift, winds, real gas, ablation, or heating. Probe model:
dh/dt = -v, dv/dt = g - rho C_D A_eff v|v|/(2m), with projected area and C_D switched at drogue opening and jettison. Nominal
terminal speed V_t = sqrt(2mg/(rho C_D A)). Penetration: m V_i^2/2 + mg d = R_eff A_tip d; so depth d = (m V_i^2/2)/(R_eff A_tip -
mg), and required speed V_req = sqrt(2 d (R_eff A_tip - mg)/m). Average kinematic deceleration (not peak) a = V_i^2/(2d); Earth g
units a/9.80665. If denominator <= 0 the model is invalid for finite stopping.

Approximate parachute opening force F ~ 0.5 rho V^2 C_D A times a transient inflation amplification factor, which is unknown
here. Thermal TPS cannot be dimensioned from projected diameter alone: heat flux, integrated heating, flight regime, nose radius,
material performance and margin are essential. Quasi-static material resistance is not equivalent to high-strain-rate impact
resistance. Architecture risks and next engineering gates 1. Orbit-to-entry deorbit delta-v, orbital plane, entry corridor and
atmospheric-relative speed need trajectory design. 2. Orbiter release geometry cannot be equated with ballistic atmospheric entry.
3. A 45 kg single aeroshell containing six 5 kg probes has only 15 kg non-probe mass; quantify integrated separation, TPS, heat
shield, drogue, communications, power and structural systems. 4. Determine how each probe is oriented and how six impact
footprints are spaced; quantify minimum separation and collision risk. 5. Specify whether drogue is attached until impact,
discarded, or used solely for stabilization; model inflation shock and jettison reliability. 6. Shock-hardening to thousands of g,
anchoring, survivable antenna/relay, burial depth telemetry and power at Martian temperatures require separate designs. 7.
Model penetrator failure/buckling and 3D obliquity under realistic ice/sandstone strain-rate tests. 8. Couple aeroshell aerothermal
CFD or correlations, mass loss, and probabilistic winds/terrain with end-to-end 6-DOF Monte Carlo. Optimization statement and
decision

Recommended objective: maximize minimum probability of achieving 1.5 m across specified site lithologies, subject to total mass
<=45 kg, peak structural/thermal/chute loads, 6 successful release events, survivable electronics, footprint spacing and impact-
angle limits. There is no defensible global optimum without calibrated target resistance, exact entry state, actual drogue behavior,
and 6-DOF aerodynamics. Default dashboard values are an illustrative reference configuration, NOT an optimum. Source basis and
traceability [1] NASA Mars fact sheet. https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html [2] NASA Mars atmosphere
equations. https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/mars-atmosphere-equation-metric/ [3] NASA Mars-GRAM /
MOLA model user guide. https://ntrs.nasa.gov/api/citations/20210023957/downloads/Mars-GRAM%20User%20Guide.pdf [4] NASA
Mars 2020 landing overview. https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/mission/ [5] NASA DS2 mission
entry/impact. https://www.jpl.nasa.gov/nmp/ds2/mission/events.html [6] NASA DS2 microprobe architecture.
https://ntrs.nasa.gov/citations/20000056603

[Source Rev7 PDF page 154; section classification: Penetration mechanics and impact qualification]
6. Parachutes, stability and communication
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 20
ID Decision Recommendation Needed before D-06 Radio and relay Select a Proximity-1-compatible UHF radio, or confirm the
carrier relays. Open dialogue with relay operators. Section 9. Gate G1 D-07 Margin policy Adopt component-level growth allowance
with 30 % as the concept default. Section 5.4.

Next ledger issue D-08 Evidence base Provide the expert addendum text and reviewer name; treat [5] as a motivating hypothesis;
add independent sources. Section 6, 18. Science requirements freeze D-09 Forebody structural architecture Carry unibody steel as
the baseline; carry the steel-head/composite-body hybrid and a fibre-metal-laminate variant as a parallel mass-reduction study.
Section 5.9. Gate G1

1.3 Headline numbers Quantity Revision 4 Revision 5 Basis 70/2.5 complete budget mass (25 % contingency) 5.488 kg 5.488 kg
Verified (D) 70/2.5 forebody envelope length 347 mm 347 mm

Verified (D) Same, conservative packaging (1.0 kg/L, 0.35 L ancillary) Not shown 686 mm; 7.63 kg Added (D) Budget at 30 %
contingency / component-level (illustrative) 25 % only 5.707 kg / 5.400 kg Added (D, E) Barrel side heat loss, 70 mm, k 0.039, ΔT 50 K
1.3 W

1.32 W (88 % of 1.5 W profile) Verified; context added Battery runtime at 1.5 W (150 Wh/kg → 400 Wh/kg) 41.7 h 41.7 h → 116.7 h
Added (D, S) Entry from 250 km circular orbit at Δv 61.6 m/s Δv only −2.0° at 3.49 km/s Added (D) Probes within 45 kg at DS2
aeroshell fraction

Six do not close Five close (40.7 kg) Added (D, S) Euler buckling margin, 35/1.5 at average load Not computed 0.87 (fails) Added (D,
E) UHF link margin, 1 W, 8 kbps, 1,000 km Not computed ≈ +4 dB (illustrative) Added (D, E) 2 Peer review 2.1 Scope, method and
limits

Reviewer and date. Claude (AI assistant), 26 October 2026, at the request of R. J. Mills. • Read Revision 4 end to end, including
appendices and references. • Re-implemented the mass and volume model from the equations and inputs printed in Revision 4
(Sections 5–6, Appendix A) and compared every published number. • Independently recomputed the thermal, power, orbital and
impact numbers. • Traced each cited source and searched for primary sources on 26 October 2026; statuses are in Section 18. •
Checked internal consistency of identifiers, units, cross-references and figures. •

Added screening analyses where a gap affected mission planning (Sections 5.5, 7–11, 13). NOTE Limits of this review. The FREYA
website and its source code were not audited. The IMPRESS full text (restricted access), its supplementary tables, the 2005
penetrator study and the expert addendum [12] were not opened in full; some sources were Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 4

[Source Rev7 PDF page 20; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 22
ID Severity Rev 4 location Finding Disposition in Rev 5 PR-06 Moderat e §3 α = 3.63×10⁻⁸ m²/s is called "illustrative". It is the
measured annual- variation diffusivity of the top ≈40 cm at InSight (±0.53×10⁻⁸) [2]. Extending it to 1.5 m is an extrapolation.
Sourced; ±1σ band in Fig. 5; 1.5 m

remnant 14–18 %. PR-07 Moderat e §3 k = 0.039 W/m K comes from Grott et al. 2021 [14] (0.03–0.37 m, fine sand, about 60 %
porosity), not from [2]. It varies with atmospheric pressure [15] and is more than twice as high at Phoenix [14]. [14], [15] added; k
sensitivity (§7). PR-08 Moderat e §2, [3]

Clifford et al. [3] addresses cryosphere depth (km scale). The 218 K / 154 K surface values are widely quoted but could not be
confirmed in the paper text. For shallow soil the InSight datum (217.5 K at 10–20 cm) is better. Flagged partially verified; [2] is
primary. PR-09 Moderat e §5, [7] [7] is a powder datasheet. Wrought 4340 data quantify the strength– toughness trade: from
condition U to Z the minimum yield rises 740 → 1,125 MPa while the minimum Charpy energy falls 42 → 9 J [45]. Temper
embrittlement is reported near 350 °C tempering [46]. No cold toughness

evidence. [45], [46] added; A-06; MECH01 kept. PR-10 Moderat e §8, [9] AX100 is a CubeSat FSK/GMSK radio (0.1–115.2 kbps; UHF-L
395–405 MHz; rated −30 to +85 °C) [9]. Mars relay orbiters use CCSDS Proximity-1; Electra supports BPSK, QPSK, Manchester [28]
[30]. The mass analogy stands; interoperability and cold-soak survival do not follow. §9; COM02; THERM02; R25. PR-11
Moderat e R11, §8 Relay availability is a generic risk. MAVEN was declared ended on 3 June 2026; four orbiters remain (ODY, MEX,
MRO, TGO). NASA issued a Mars Telecommunications Network RFP on 14 May 2026 targeting operations no later than 2030 [26].
Relay table and link budget (§9); R26. PR-12 Moderat e §6, SYS03

A flat 25 % contingency is below the 30 % commonly used at concept stage under AIAA S-120 practice [42]. Allocation should be per
component by maturity. An illustrative mix gives 23.0 %. §5.4; SYS04; D-07. PR-13 Moderat e §9 The orbit example gives Δv but no
entry state. 61.6 m/s gives −2.0° at 3.49 km/s (125 km entry interface). −13° needs about 889 m/s (149 kg for the 450 kg parent). The
entry stack alone needs 1.24 kg. §11 table and Fig. 10. PR-14

Moderat e §1 "Does not close" is right but incomplete. Closure needs a non-probe fraction of at most 26.8 % for six probes at 45 kg.
DS2 aeroshell was 32.6 % of probe-plus-aeroshell mass [20]; five probes close (40.7 kg), six do not. §11 closure table and Fig. 11;
D-05. PR-15 Moderat e §9 Average g (1,020 g) is not a design load. DS2 forebody was designed for 30,000 g and aftbody 80,000 g [18],
although mean deceleration over 0.6 m

at 190 m/s is about 3,070 g (design ≈ 10× mean). Fig. 9; MECH04; R29. PR-16 Major §5–§7 No structural check exists, so "35 mm is
too slender" is a judgment. A pin- ended Euler screen at the 100 m/s, 0.5 m average load gives margin 0.87 for 35/1.5 versus 13–428
for the others (0.29 versus 4.4–143 at 3× load). Crude, but quantitative. §5.3, §5.5; MECH05; 35 mm rejected on evidence. PR-17
Moderat

e §9 Penetration prediction was withdrawn with no first-order replacement. Sectional density is the lead discriminator in
Young/Sandia scaling, (m/A)^0.7 [22]. 70/2.5 is 915 kg/m² versus 696 (DS2 forebody) and 1,600 (2005 study forebody) [21]. Relative
scaling (§10), marked indicative; R30. PR-18 Moderat e §6 The 0.250 kg drogue, riser and separation allowance has no sizing basis.
For

4.39 kg and Cd 0.6, 100 m/s needs about 0.66 m diameter (0.56–0.83 m across 0.022–0.010 kg/m³) [16]. §11 table; EDL03. PR-19
Moderat e §8 150 Wh/kg is conservative against cell-level 421 Wh/kg (Li/SOCl2) and 730 Wh/kg (Li/CFx) at 20 °C [23], but Li/CFx
discharge collapses near −40 °C [23]. Even 400 Wh/kg gives only 116.7 h at 1.5 W. Chemistry matrix (§8); A-12. Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 6

[Source Rev7 PDF page 22; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 29
Hardware Location Nominal kg Class Basis Forebody harness and seals Forebody 0.080 E Allowance Sample acquisition hardware
Surface head 0.150

E Mechanism allowance; not a demonstrated sampler Transceiver and mounting Aftbody 0.100 E Analog: AX100 24.5 g bare [9]
Antenna radiator Aftbody 0.060 E Allowance Cable or tether

Aftbody 0.050 E 5 m × 10 g/m Cable spool and strain relief Aftbody 0.060 E Allowance Surface aftbody structure Aftbody 0.200 E

Allowance Drogue, risers and separation Aftbody 0.250 E No sizing basis yet (PR-18) Nominal hardware (forebody 3.520, surface
head and aftbody 0.870) 4.390 Verified Mass contingency 25 % Unallocated 1.098

E Flat policy (A-27) Complete probe budget 5.488 Verified PEER REVIEW · MINOR PR-01 At a common 2 mm wall, equal-volume
budgets for 50, 60 and 70 mm are 5.494, 5.255 and 5.128 kg. Revision 4 printed 5.14 kg for the 70 mm case; the correct rounding is
5.13 kg. The scheduled-wall 70/2.5 case (5.488 kg) is heavier because its wall is 2.5 mm, as Revision 4 explained. VERIFIED The
ledger sum, the forebody and aftbody split, the 1.098 kg contingency and all six candidate masses were reproduced exactly. 5.3
Candidate results Candidate Bore

mm Length mm L/D Nominal kg Budget kg Fore kg m/A kg/m² Side loss W Euler margin avg / 3×

Hard screen 35/1.5 35.1 4.431 5.538 3.56 4.33 0.87 / 0.3 Fails buckling 50/1.5 12.0 4.009 5.012

3.14 2.25 13.12 / 4.4 Passes; confirm by FEA 50/2.0 12.5 4.395 5.494 3.53 2.35 13.92 / 4.6 Passes; confirm by FEA 60/2.0

7.4 4.204 5.255 3.33 1.69 53.47 / 17.8 Passes 70/2.5 5.0 4.390 5.488 3.52 1.32

167.14 / 55.7 Passes 80/3.0 3.6 4.582 5.728 3.71 1.08 428.37 / 142.8 Passes Equal 0.954 L cavity for every row. Wall schedules differ by
design. Side loss is barrel-only at k = 0.039 W/m K, ΔT = 50 K, far-field radius 0.5 m. Euler margin is the pin-ended critical load of
barrel plus nose (E = 205 GPa) over the average axial force of forebody mass × v²/2s at 100 m/s and 0.5 m; "3×" applies a peak factor
of three.

PEER REVIEW · MAJOR PR-16 The 35/1.5 case buckles in this screen: critical load 31 kN against an average axial load of 35.6 kN
(margin 0.87; 0.29 at 3× load). Every other candidate has margin 13 or more at the average load. The screen is crude: it is static,
pinned at both ends, and ignores lateral support from soil, bending from oblique impact and local wall buckling. It does, however,
convert "too slender" from an opinion into a reproducible result. Preliminary. No hardware configuration is flight qualified.
Prepared for Robert J Mills, 26 October 2026 Page 13

[Source Rev7 PDF page 29; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 32
Policy Growth kg Budget kg Effective % Component-level, illustrative (science 30, steel 15, potting 15, battery 20, electronics and
harness 30, sampler 35, radio 20, antenna 30, cable 20, spool 35, aftbody 35, drogue 35) 1.010 5.400 23.0 5.5 Hard screens and robust
ranking Screen Rule

Basis Result S1 Euler margin at average impact load at least 1 Necessary for column stability (E) 35/1.5 fails (0.87) S2 Euler margin
at 3× average load at least 3 Peak load allowance; DS2 design was about 10× mean [18] 35/1.5 fails (0.29); others pass S3 Forebody
envelope at most 700 mm

Illustrative stowage limit; no capsule design exists (E) 35/1.5 fails (1,229 mm) Survivors are then scored on the other figures of
merit. Each metric is normalized across the six candidates (best = 1, worst = 0); the buckling score saturates, rising from 0 at
margin 1 to 1 at margin 10, so that excess margin is not rewarded. Five weight sets test whether the answer depends on who sets
the priorities. Criterion weight Balanced Mass-driven Structure and penetration Packaging and science

Equal weights Budget mass 20 % 40 % 10 % 10 % 14 % Buckling margin 15 % 10 % 25 % 10 % 14 %

Sectional density 15 % 10 % 30 % 5 % 14 % Bore diameter 10 % 5 % 5 % 35 % 14 % Envelope length

10 % 10 % 10 % 15 % 14 % Side heat loss 15 % 10 % 10 % 15 % 14 % Closeness to 50 mm reference 15 %

15 % 10 % 10 % 14 % Candidate Balanced Mass-driven Structure and penetration Packaging and science Equal weights Rank range

35/1.5 0.28 (6) 0.28 (6) 0.38 (6) 0.13 (6) 0.25 (6) 6–6 50/1.5 0.65 (2) 0.77 (1) 0.53 (3) 0.57 (4) 0.62 (3)

1–4 50/2.0 0.52 (4) 0.50 (4) 0.48 (5) 0.50 (5) 0.52 (5) 4–5 60/2.0 0.67 (1) 0.67 (2) 0.62 (1) 0.69 (3)

0.67 (1) 1–3 70/2.5 0.59 (3) 0.52 (3) 0.56 (2) 0.72 (2) 0.62 (2) 2–3 80/3.0 0.50 (5) 0.35 (5) 0.50 (4)

0.75 (1) 0.57 (4) 1–5 Weighted score 0–1 with rank in parentheses. Ties are shown with the same rank. Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 16

[Source Rev7 PDF page 32; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 53
13.4 What to buy down first Rank Uncertainty Why it comes first Cheapest retirement Science package definition, density and
operating mode (A-01, A-02, D-02) Sets cavity volume, length, battery and thermal design; moves every number in Part C. Supplier
concept designs and a written hypothesis; no hardware. Carrier, entry mode and relay (D-05, D-06) Sets entry speed, thermal
protection, mass

closure and link. Host-mission discussions; relay operator inquiry; Proximity-1 radio survey. Planetary-protection category and
process (D-01, PP01–PP04) Sets the process, schedule and, for Mode C, possibly the category. Early consultation with the mission
authority; process compatibility screens. Thermal isolation versus soil conductivity (PR-04) Decides whether a warmed mode is
feasible at all. Coupled thermal model with k from 0.02 to

2 W/m K. Impact survivability of structure, potting, battery, radio (R05–R08) No design is credible without drop-test evidence.
Instrumented drops of mass simulants; coupon tests. 13.5 Triggers that would change the plan If this becomes true Then Measured
science bulk density below 1.5 kg/L, or ancillary volume above 0.25 L 70 mm length exceeds 408–425 mm and mass rises by 0.4–0.5
kg; reopen D-03

and re-run Section 5 and Section 11 closure. Thermal model shows side loss above about 1 W in plausible soils for a warmed mode
Mode C is not feasible at 0.450 kg; choose Mode A or B, or a larger battery. Carrier will not enter Mars orbit Direct entry: new EDL
study; Section 11 entry numbers do not apply. Relay operator cannot support the chosen radio Select a Proximity-1 radio or host a
relay on the carrier. Cold impact tests show the steel is brittle at Mars night temperatures Change material or heat treatment; mass
and wall schedule change. Planetary-protection authority rules Mode C a Special Region access Category IVc requirements apply;
the warmed assay may need redesign or cancellation.

13.6 Illustrative operations sequence Step Duration or timing Notes (not verified by simulation) Release and deorbit burn Δv 61.6
m/s at periapsis-lowering Kick stage on the entry stack, not the parent (Section 11). Coast to entry About 55.6 min for a 250 km orbit
(half period) Parent can remain in orbit as a relay if it carries a UHF radio. Entry and drogue deployment
Entry near 3.5 km/s at about −2° Thermal protection and deployment altitude open (R12, R14). Impact, penetration, tether payout
Seconds Instrumented acceleration record is the first data product (MECH04). Aftbody antenna deployment and link acquisition
First overflight; 2–4 orbiter passes per day [26] Receiver windows scheduled from predicted passes (PWR02). Measurement
sequence

Mode A about 42 h; Mode B or C up to 5 days Set by D-02 and the battery. Data return 3–46 Mbit per 6 min pass at 8–128 kbps
Margin per Section 9. Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page
37

[Source Rev7 PDF page 53; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 55
ID Proposed requirement Verification COM03 (new) Close the return link with at least 3 dB margin at the minimum usable
elevation Link budget with measured antenna pattern EDL01 Analyze each delivery scenario with its own entry boundary
conditions Trajectory dispersions and aerodynamic database EDL02 Qualify drogue inflation stability and forebody–aftbody
separation Mars-relevant deployment tests EDL03 (new)

Define the impact-speed envelope and show the drogue delivers it across the density range Terminal-speed analysis and drop tests
PP01 Obtain applicable planetary-protection classification and endpoints Mission authority concurrence PP02 Validate a
compatible reduction process with residues and assay blanks Microbial reduction and materials compatibility evidence PP03
Maintain barriers and cleanliness after treatment Integration controls and witness monitoring

PP04 (new) Record maximum temperature, humidity and time above Special Region thresholds for every wetted or humid volume
Thermal and humidity analysis; authority review VER01 Keep data provenance, model version and assumptions with every result
Shared model tests and exported scenario record VER02 (new) Maintain the source register with verification status Section 18
reviewed at each gate ID Study constraint or boundary C01

Science mass fixed at 1 kg for this trade; science volume is unknown C02 Baseline packaging assumes 0.500 L science envelope and
0.120 L other forebody hardware (both challenged in PR-31, PR-32) C03 Potting occupies 25 % and reserved space 10 % of cavity
volume C04 Steel density 7,850 kg/m³; hemisphere and cap mass retained; no hidden structural allocation C05 Cable allocation
assumes 5 m at 10 g/m; spool and strain relief are additional C06 Battery allocation 0.450 kg is a short-duration case, not a mission
requirement C07 No flight survival probability or qualified wall thickness follows from this trade

C08 No mandatory 1.5 m sample depth, six-probe count or 450 kg delivery bus C09 No selected assembled-probe irradiation or
ethylene oxide procedure C10 Low-conductivity dry soil assumptions cannot represent ice or competent rock C11 Contingency
covers mass growth; it cannot replace missing power or experiment subsystems C12 Existing public website audience is retained;
no private-access claim is made C13 (new) All penetration, link, structural and thermal results in Rev 5 are screens, not
predictions; none qualifies hardware 15 Risk register and closure plan

All risks remain open, and no unsupported likelihood or success percentage is assigned. R01–R22 are carried from Revision 4 with
a reviewer note where the review changes the picture; R23–R34 are new. The last column gives the gate by which evidence should
exist. Risk Issue Closure evidence Reviewer note Gate R01 Sample misses relevant biology Compare shallow and buried samples in
analog trials Skin depth 3.2 cm supports shallow sampling

(§6.1). G3 R02 False biological signal Blinded abiotic controls and multiple independent measurements Include perchlorate-spiked
blanks for heated steps (§6.3). G3 R03 Incubation exceeds energy Demonstrate time series at credible sample conditions

Quantified in §8; see R23. G1 Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October
2026 Page 39

[Source Rev7 PDF page 55; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 62
# Citation Used for Status What was confirmed, and link [26] NASA Science. Mars Relay Network (updated 5 Jun 2026). Relay
network status and data volumes Verified Four orbiters; MAVEN ended 3 Jun 2026; table of passes and data volumes; rates up to 2
Mbps. The

14 May 2026 Mars Telecommunications Network RFP and the 2030 target come from a secondary report (macmyths.com); verify
with NASA. https://science.nasa.gov/mars/ma rs-relay-network/ [27] JPL IPN Progress Report 42-246 (15 Aug 2026).
Recommendation for the Next-Generation Mars Relay Orbiter. UHF recommendation Partial
Excerpt: UHF recommended for backward compatibility and low- power users. https://ipnpr.jpl.nasa.gov/progres s_report/42-
246/42-246A.pdf [28] JPL (17 Dec 2009). Electra Mars Proximity-Link Communications and Navigation Payload Description. Electra
parameters Verified Transmit 5 W (7 W); receive noise figure 4.9 dB (3.9 dB); modulation Manchester, NRZ-L, BPSK, QPSK;

rate-1/2 coding; Proximity-1. https://discovery.larc.nasa.gov/PD F_FILES/29Electra_Description.pdf [29] Communications for the
Planet Mars: Past, Present, and Future (arXiv:2211.14245); and the MER UHF instrument catalog entry (NASA PDS). Frequencies
and rates; surface antenna Verified Return 401.585625 MHz; forward 437.1 MHz; Electra 390–405 and 435–450 MHz, 1–1,024 kbps;
MER

UHF monopole, nominal 0 dB, RHCP. https://arxiv.org/pdf/2211.14245 [30] CCSDS Proximity-1 Space Link Protocol (CCSDS 211.0-B);
ISO 21460:2015 (physical layer). Relay protocol Not re- opened Existence of the ISO standard confirmed; standards not opened.
https://committee.iso.org/standar d/67092.html

[47] NASA Mars Exploration Program. Mars Relay Network health assessment slide (Ianson). Relay asset viability Partial Excerpt:
July 2022 assessment, only ESA's TGO expected viable to about 2030 (text truncated). https://science.nasa.gov/wp-
content/uploads/2024/01/07- mep-marsfuture-ianson- tagged.pdf [48]

NTNU CubeSat radio survey table (wiki). AX100 receive and transmit power Secondary Secondary compilation: TX 4–10 W, RX 0.4–
2.81 W. Not verified against the datasheet. https://ntnu.no/wiki/x/OowpBw Planetary protection Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 46

[Source Rev7 PDF page 62; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 100
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 31 A031 Forebody
harness and seals 1. Input: 0.080 kg standard; 0.040 kg reduced (Engineering judgment). 2. Basis: No connector/seal design 3. Logic:
Add wiring, seals and internal interfaces outside science and steel. 4. Review: Check battery safety and sample-chamber sealing
boundaries for missing items. A032 Surface sample acquisition 1. Input: 0.150 kg standard; 0.050 kg reduced (Engineering
judgment). 2. Basis: No selected collection mechanism 3. Logic: Keep surface acquisition hardware separate from the buried
science allocation. 4. Review: Neither allowance proves shallow-to-buried sample transport or sterile acquisition. A033 Radio bare-
board analogy

1. Input: 24.5 g; 65 by 40 by 6.5 mm (Manufacturer reference). 2. Basis: [9] dimensions and mass section 3. Logic: Use bare-board
data only to establish a scale for integration allowances. 4. Review: Does not establish protocol, link closure, cold operation or
shock survival. A034 Packaged transceiver 1. Input: 0.100 kg standard; 0.050 kg reduced (Engineering judgment informed by
analog). 2. Basis: [9] supports bare-board mass only; no package BOM 3. Logic: Add a packaged allocation above the cited 24.5 g
bare board. 4. Review: Extra 75.5 g or 25.5 g is unverified integration allowance, not vendor data. A035 Antenna radiator 1. Input:
0.060 kg standard; 0.025 kg reduced (Engineering judgment). 2. Basis: No antenna design or RF specification 3. Logic: Add radiator
mass separately from radio, feed/tether and spool.

4. Review: Antenna pattern, gain, orientation and deployment remain open. A036 Tether length 1. Input: 5 m standard; 2 m
reduced (Engineering judgment). 2. Basis: No separation kinematics or burial geometry 3. Logic: Choose screening lengths and
multiply by linear mass. 4. Review: Length must cover separation, burial, routing, slack and strain relief. A037 Tether linear mass
1. Input: 10 g/m (Engineering judgment). 2. Basis: No cable part number or supplier drawing 3. Logic: Multiply length by 0.010 kg/m
to give 0.050 or 0.020 kg. 4. Review: Data/power tether is not automatically a low-loss RF cable; verify strength, conductor and
insulation.

[Source Rev7 PDF page 100; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 101
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 32 A038 Spool and strain
relief 1. Input: 0.060 kg standard; 0.025 kg reduced (Engineering judgment). 2. Basis: No spool or payout design 3. Logic: Add
hardware independent of cable mass. 4. Review: Check core, flanges, deployment friction, minimum bend radius and line snatch.
A039 Surface aftbody structure 1. Input: 0.200 kg standard; 0.080 kg reduced (Engineering judgment). 2. Basis: No enclosure CAD 3.
Logic: Add an above-surface enclosure/interface allocation outside steel forebody. 4. Review: No separate quantified aftbody
insulation or thermal reserve; verify those functions. A040 Drogue risers and separation

1. Input: 0.250 kg standard; 0.100 kg reduced (Engineering judgment). 2. Basis: No qualified canopy area or release hardware 3.
Logic: Include one deployment assembly allowance; antenna is separate. 4. Review: Reduced mass cannot be treated as preserved
drag or separation performance. A041 Hardware locations 1. Input: Science and battery buried; sampler and relay at surface
(Accounting and deployment assumption). 2. Basis: Study ledger, informed by [1] architecture 3. Logic: Sum forebody-tagged rows
for nominal impact mass; remaining rows form surface hardware. 4. Review: Requires decoupling before peak impact; no dynamic
proof is provided. Mass margin and inverse budget A042 Mass contingency 1. Input: 25% of every nominal hardware line
(Engineering judgment). 2. Basis: No approved program growth policy

3. Logic: Sum nominal mass first; margin = 0.25×nominal; budget = 1.25×nominal. 4. Review: Not installed ballast, a probability
bound, energy reserve or volume growth. A043 Nominal mass sum 1. Input: Science + steel + resin + hardware (Accounting
calculation). 2. Basis: T06, design function 3. Logic: Sum unrounded values once; standard other hardware totals 1.520 kg. 4.
Review: Table display rounding may cause 0.001–0.003 kg residuals when summed by eye.

[Source Rev7 PDF page 101; section classification: Parachutes, stability and communication]

Source evidence — Rev7 master page 134
FREYA | Preliminary concept screening | October 2026 Figure 6. First-probe depth dispersion from density alone, without
adaptive retuning. Real substrate uncertainty adds much larger uncertainty. Inference: a single “exact 1.5 m” setting is not robust.
At a minimum, Freya requires (a) site characterization or material-sensing estimates, (b) trajectory state measurements and
adaptive parachute timing/drag, (c) a depth tolerance or overpenetration accommodation, and (d) independent risk estimates for
layered terrain and off-axis strikes. Design-to-1.5-m must mean at least 1.5 m with a statistically specified confidence, not an
equality in one deterministic model. 8. Mass allocation and implementation feasibility System group Concept allowance (kg)
Evidence Six packaged probes, including all six drogues

30.0 Requirement; packaging unverified Forward heat-shield TPS 4.0 Unverified materials & ablation sizing Heat-shield substrate
and load path 4.0 Unverified shell structure Backshell, dispenser, separation devices 3.0 Unverified six-release reliability Guidance,
batteries, sensors, radio 2.0

Minimal allowance; link budget absent Harness, seals, power switching 1.0 Unverified Mass reserve 1.0 2.2% of 45 kg; inadequate
for mature design Grand total 45.0 No allocated deorbit propulsion The 15 kg unallocated-to-probes envelope is unusually tight.
NASA Mars 2020 used a mature 70-degree sphere-cone and specialized TPS, but its mass/area scaling cannot be assumed to work
linearly at Freya size [4]. The design

cannot be declared feasible until a detailed component bill of materials, TPS ablation calculation, aeroelastic buckling estimate,
parachute deployment packaging, and subsystem test masses fit with a credible design margin (often ≥15-25% for early design,
subject to program policy). The illustrated 1.0 kg reserve is explicitly not adequate.

[Source Rev7 PDF page 134; section classification: Parachutes, stability and communication]




Historical source visual from original Rev7 PDF page 134, image ID 682
7. Aeroshell and thermal protection
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 49
aeroshell, f = 32.6 % [20]; the inherited 21 kg placeholder for six probes implies f = 38.9 %; closure at 45 kg for six probes needs f ≤
26.8 %. Probes Probe mass kg f = 25 % f = 32.6 % (DS2 aeroshell) f = 38.9 % (21 kg) f = 50 % 5.49 7.3 kg 8.1 kg 9.0 kg

11.0 kg 10.98 14.6 kg 16.3 kg 18.0 kg 22.0 kg 16.46 22.0 kg 24.4 kg 26.9 kg 32.9 kg 21.95 29.3 kg

32.6 kg 35.9 kg 43.9 kg 27.44 36.6 kg 40.7 kg 44.9 kg 54.9 kg 32.93 43.9 kg 48.9 kg 53.9 kg 65.9 kg

Green: within 45 kg. Heritage fraction covers one aeroshell per probe only; dispenser, cruise-stage mounting and a kick stage are
extra. Figure 11. Entry-mass closure versus probe count and non-probe mass fraction. Basis: N × 5.488 kg / (1 − f). The 45 kg line is
a scenario, not a constraint on any identified carrier. PEER REVIEW · MODERATE PR-14 Revision 4 correctly found that six probes
plus the 21 kg placeholder total 53.93 kg and leave 12.07 kg of a 45 kg scenario. The closure condition shows what must be true: six
probes need non-probe mass of at most 26.8 %, below DS2's 32.6 %. At the DS2 fraction, five probes close at 40.7 kg with 4.3 kg to
spare for a dispenser. In the conservative packaging case of Section 5.4 (7.63 kg per probe) even four probes at the DS2 fraction
need 45.3 kg. 12 Planetary protection and contamination control 12.1 Framework Document Role Status noted in this review
COSPAR Policy on Planetary Protection

[31] International categories and bioburden limits for Mars landers Category definitions confirmed through NASEM and ECSS
summaries; check the current edition. NPR 8715.24, Planetary Protection Provisions for Robotic Extraterrestrial Missions [34]
NASA procedural requirements; replaced NPR 8020.12D Effective 24 Sep 2021 with listed expiration 24 Sep 2026; an update was
announced as coming in March 2026. Current status to be verified. Not cited in Rev 4.

Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 33

[Source Rev7 PDF page 49; section classification: Aeroshell and thermal protection]

Source evidence — Rev7 master page 59
# Citation Used for Status What was confirmed, and link [3] Clifford, S. M.; Lasue, J.; Heggy, E.; Boisson, J.; McGovern, P.; Max, M. D.
(2010). Depth of the Martian cryosphere: Revised estimates and implications for the existence and detection of subpermafrost
groundwater. J. Geophys. Res. Planets 115, E07001. DOI 10.1029/2009JE003462. Broad climate context Partial

Paper exists; cryosphere depth at kilometer scale. The 218 K / 154 K surface values were not found in the text read (PR-08).
https://hal- insu.archives-ouvertes.fr/insu- [4] Stroud, R. H., et al.; Exotech Systems, Inc. (April 1972). Contamination Control by Use
of Ethylene Oxide: Technology Summary, Task 12. NASA-CR-126034; NTRS 19720013398. Historical gas-process discussion Not re-
opened

Not re-opened. Historical; not a current approved process. https://ntrs.nasa.gov/api/citations /19720013398/downloads/19720
013398.pdf [5] Spacek, J.; Abraham, C. A.; Benner, S. A. (15 Sep 2026). The case for extant life on Mars: A Technical Reanalysis of the
Viking Carbon Assimilation–Pyrolytic Release Experiment. The Primordial Scoop (preprint submitted to Astrobiology). Motivating
hypothesis only Not re- opened

Not re-opened. Hosted on the lead author's own site, which also hosts earlier IMPRESS posts. Interpretation contested (PR-21).
https://primordialscoop.org/2026 /09/15/capyr/ [6] NASA TechPort project 184149 (reviewer-supplied). None; no claim rests on it Not
verified Could not be resolved by this review either; the tool could not fetch the page and searches

returned no project record. https://techport.nasa.gov/project s/184149 [7] Sandvik Osprey. Osprey 4340 and Osprey 434 low-alloy
steel datasheet (14 Sep 2023). Density 7.85 g/cm³; conductivity 44.5 W/m K Not re- opened Not re-opened. Powder- metallurgy data;
superseded for wrought properties by [45].

https://www.metalpowder.sandvi k/en/products/metal-powder- alloys/low-alloy-steel/osprey- 4340/ [8] Epoxy Technology Inc.,
Meridian Adhesives Group (Feb 2021). EPO- TEK 301-2 Technical Data Sheet, Rev XVIII. Potting density analog Not re- opened
Arithmetic verified: 100:35 mix of specific gravities 1.15 and 0.95 gives 1.0905 g/cm³. Datasheet not

re-opened. https://products.meridianadhesiv es.com/storage/downloads/uenn uicaaxt1bodtipkbpydtg0u8qs33/3 01-2.pdf [9]
GomSpace. NanoCom AX100 datasheet v3.3 (12 Aug 2016) and product flyer. Radio mass analog; modulation; power Verified Mass
24.5 g; 65 × 40 × 6.5 mm; −30 to +85 °C (a 2015
presentation lists −40 to +60 °C); FSK/MSK/GFSK/GMSK; 0.1–115.2 kbps; 30 dBm at >45 % PAE; UHF- low 395–405 MHz.
https://gomspace.com/UserFiles/ Subsystems/datasheet/gs-ds- nanocom-ax100-33.pdf [10] NASA (30 Aug 2022). NASA-STD-8719.27,
Implementing Planetary Protection Requirements for Space Flight. Planetary-protection technical framework Verified

Baseline approved 2022-08-30; active; complements NPR 8715.24. https://standards.nasa.gov/standa rd/NASA/NASA-STD-871927
Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 43

[Source Rev7 PDF page 59; section classification: Aeroshell and thermal protection]

Source evidence — Rev7 master page 63
# Citation Used for Status What was confirmed, and link [31] COSPAR Policy on Planetary Protection, Mars Category IV, as
tabulated in NASEM (2020), Assessment of the Report of NASA's Planetary Protection Independent Review Board, App. E (NAP
25773); and an ECSS summary (2022). Category definitions Partial IVa: ≤ 3×10⁵ spores and ≤ 300

spores/m²; IVb adds ≤ 30 spores or subsystem route; IVc for Special Regions. The COSPAR policy itself was not opened.
https://nap.nationalacademies.or g/read/25773/chapter/73.xhtml [32] NASEM (2021). Evaluation of Bioburden Requirements for
Mars Missions (NAP 26336), as presented in NASA OPP slides. Special Region margin Partial Adopts −28 °C (245 K) with a margin to
255 K; aw ≥ 0.5

conservative. https://www.nationalacademies.o rg/cdn/materials/a1f3901a-881f- 4927-91dc-ea92d094d8d3 [33] SR-SAG2 (Rummel et
al. 2014, Astrobiology 14) as summarized in NASEM (2018), Review and Assessment of Planetary Protection Policy Development
Processes (NAP 25172), App. B; and NRC text on Category IVc (nap.nationalacademies.org/read/11937). Special Region thresholds
Partial T ≥ 255 K and aw > 0.60; wording that IVc covers places where the

spacecraft could cause liquid water. https://nap.nationalacademies.or g/read/25172/chapter/11 ; https://nap.nationalacademies.or
g/read/11937/chapter/9 [34] NASA NPR 8715.24 (effective 24 Sep 2021; listed expiration 24 Sep 2026); NASA OPP updates (Mar 2026);
NASA OPP "Not One Size Fits All" (2023). Procedural requirement; process examples Partial

Dates confirmed from NODIS and OPP slides; an update was "coming soon" in March 2026; slides cite VHP and dry-heat microbial
reduction as project examples. Current status unverified. https://nodis3.gsfc.nasa.gov/npg_ img/N_PR_8715_0024_/N_PR_87
15_0024_.pdf ; https://ntrs.nasa.gov/api/citations /20230012610/downloads/CCMP P

%20Benardini_NotOneSize_20230 818_V2.pdf Science and evidence standards # Citation Used for Status What was confirmed, and
link [35] Rivkina, E. M.; Friedmann, E. I.; McKay, C. P.; Gilichinsky, D. A. (2000). Metabolic activity of permafrost bacteria below the
freezing point. Appl. Environ. Microbiol. 66(8), 3230–3233. Doubling times versus

temperature Verified Minimum doubling about 1 d (5 °C), 20 d (−10 °C), 160 d ( −20 °C); activity monitored to day 550.
https://ntrs.nasa.gov/citations/20 [36] Price, P. B.; Sowers, T. (2004). Temperature dependence of metabolic rates for microbial
growth, maintenance, and survival. PNAS 101(13), 4631–4636. DOI 10.1073/pnas.0400522101. Rates at very low temperature
Verified ≈ 10 turnovers of cellular carbon

per billion years at −40 °C; no evidence of a minimum temperature. https://pmc.ncbi.nlm.nih.gov/artic les/PMC384798 Preliminary.
No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 47

[Source Rev7 PDF page 63; section classification: Aeroshell and thermal protection]

Source evidence — Rev7 master page 64
# Citation Used for Status What was confirmed, and link [37] Mykytczuk, N. C. S., et al. (2013). Bacterial growth at −15 °C; molecular
insights from the permafrost bacterium Planococcus halocryophilus Or1. ISME J 7, 1211–1226. DOI 10.1038/ismej.2013.8. Subzero
growth Verified Growth at −15 °C; activity at −25

°C; −15 °C incubations of 130 days. https://pmc.ncbi.nlm.nih.gov/artic les/PMC3660685 [38] Levin, G. V.; Straat, P. A. (2016). The case
for extant life on Mars and its possible detection by the Viking Labeled Release experiment. Astrobiology 16(10), 798–810.
Biological reading of Viking LR Secondary Citation and argument confirmed through a Phys.org report; paper not opened.
https://phys.org/news/2016-10-

year-old-viking-life-mars.html [39] Hecht, M. H., et al. (2009). Science 325, 64–67; Navarro-González, R., et al. (2010). J. Geophys. Res.
Planets 115, E12010. Perchlorate; Viking reanalysis Secondary Citations confirmed through secondary abstracts; Phoenix
perchlorate about 0.5 % (via [40]). https://eana-net.eu/conferences/ EANA2024/abstract_show.php? id=106 [40]

NASA NTRS 20250000980. Viking Revisited (perchlorate model; reported as an Icarus paper by McKay and coauthors). Consensus
counter-argument Partial Excerpt: perchlorate can explain all nine listed Viking observations; does not prove absence of life.
https://ntrs.nasa.gov/api/citations /20250000980/downloads/20250 000980-Viking%20Revisited %20Rev1%20Final.docx [41]
Community Report from the Biosignatures Standards of Evidence

Workshop (2022). arXiv:2210.14293. Evidence standards Partial Excerpt: Viking LR as a case study in biosignature assessment.
https://arxiv.org/pdf/2210.14293 Margin policy, delivery opportunities and materials # Citation Used for Status What was
confirmed, and link [42]

AIAA S-120-2006, Mass Properties Control for Space Systems; LUVOIR Final Report §12.3.3.1 (arXiv:1912.06219); NASA MSFC
presentation on S-120 and ISO 22010 (NTRS 20130014265). Growth allowance practice Secondary LUVOIR adopts 30 % MGA from
the AIAA standard; S-120 assigns allowance by maturity category (estimated, calculated, actual). The standard itself was not
opened. https://arxiv.org/pdf/1912.06219 ; https://ntrs.nasa.gov/citations/20

[43] Press reports on NASA SR-1 Freedom and SkyFall: Payload (payloadspace.com), Interesting Engineering, Space.com via AIAA
(16 Oct 2026). December 2028 opportunity Secondary Launch targeted December 2028; SkyFall released in Mars orbit per one
report; post-delivery fate undecided. Verify with NASA releases. https://payloadspace.com/? p=30736 ;

https://interestingengineering.co m/space/nasa-nuclear-powered- mars-mission Preliminary. No hardware configuration is flight
qualified. Prepared for Robert J Mills, 26 October 2026 Page 48

[Source Rev7 PDF page 64; section classification: Aeroshell and thermal protection]

Source evidence — Rev7 master page 65
# Citation Used for Status What was confirmed, and link [44] Leonard David, Inside Outer Space, on IMPRESS; astrobiology.com
summary (31 Jul 2026). IMPRESS delivery intent Secondary Secondary payload on the 2028 SR-1 Freedom/SkyFall mission; about
$40,000 per probe claimed.

https://www.leonarddavid.com/? p=48968 ; https://astrobiology.com/2026/07 /31/impress-a-planetary- penetrator-network-for-
astrobiology-prospecting-and- exploration-of-mars/ [45] voestalpine High Performance Metals. AISI 4340 datasheet (2026 v2).
Wrought 4340 properties Verified Quench-and-temper conditions T–

Z: minimum yield 665 MPa (T) to 1,125 MPa (Z); minimum Charpy 42 J (U, V) down to 9 J (Z). https://www.voestalpine.com/hig
hperformancemetals/australia/ap p/uploads/sites/265/2024/08/ Datasheet-4340-2026-v2.pdf [46] Lee, Y. G.; Moon, I. G.; Choi, C. S.
(1982). J. Korean Inst. Metals 20(11), 1000–1007. Temper embrittlement Verified Abstract: Charpy trough at 350 °C

tempering. https://kjmm.org/kjmm/ArticleDe tail/RD_R/440368 Composite structural architecture (Section 5.9) # Citation Used for
Status What was confirmed, and link [49] Quasi-isotropic CFRP laminate properties as compiled from an Altair materials thread
and MDPI Materials 12(18):3011 (2019); unidirectional values from Maeda & Morioka (OMU repository).

Composite density, modulus, strength Secondary Density ≈ 1.58–1.60 g/cm³; unidirectional E₁₁ ≈ 131 GPa, transverse ≈ 8.2 GPa;
compressive strength in fibre direction ≈ 1,400 MPa; interlaminar shear ≈ 40–90 MPa. https://community.altair.com/disc
ussion/13637/i-want-to-know- material-property-of-cfrp [50]

NASA NTRS 20130013393, thermal response of composite laminates (flash heating). Composite thermal conductivity Verified
Through-thickness (perpendicular to fibres) ≈ 0.8 W/m·K; parallel ≈ 7 W/m·K; density 1,600 kg/m³; specific heat 1,200 J/kg·K.
https://ntrs.nasa.gov/api/citations /20130013393/downloads/20130 013393.pdf [51] Alzeanidi, N. (Cranfield). Analysis of the effect of
impact damage on

the repairability of CFRP composite laminates. Impact strength knock-down Partial Impact can reduce undamaged laminate
strength by about 40–60 %. https://dspace.lib.cranfield.ac.uk/i tems/370e0d66-e75f-4772-a5c2- e5097a7e0e4a/full Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 49

[Source Rev7 PDF page 65; section classification: Aeroshell and thermal protection]

Source evidence — Rev7 master page 136
FREYA | Preliminary concept screening | October 2026 model and must not be interpreted as validated accuracy. 12. References
and provenance [1] NASA NSSDC. Mars Fact Sheet. https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html [2] Coles, Tanaka
& Christensen (2019). The Atlas of Mars: Hellas (MC-28). https://www.cambridge.org/core/books/abs/atlas-of-mars/hellas-
mc28/7C889FFB9CA823D14B7C3EA51EC76C34 [3] NASA Glenn. Mars Atmosphere Equation (Metric).
https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/mars-atmosphere-equation-metric/ [4] Parcero et al. (2022), NASA Ames.
Planetary Mission Entry Vehicles Quick Reference Guide 4.0. https://ntrs.nasa.gov/citations/20220010761 [5] NASA NTRS. MSL
Supersonic Parachute Qualification. https://ntrs.nasa.gov/citations/20150011941 [6] Hunt (2008). Sandstone, Geology Today; dry/wet
UCS tabulations. https://onlinelibrary.wiley.com/doi/10.1111/j.1365-2451.2008.00649.x
[7] NCBI/Research literature (2021). Effect of water on sandstone fracture toughness and friction.
https://doi.org/10.1016/j.ijrmms.2021.104916 [8] Georgia Tech (2026). Mars entry trajectory study / Mars Sutton-Graves SI
coefficient. https://repository.gatech.edu/bitstreams/3566fcee-6c6f-40c9-be24-ff188bfb39c8/download [9] West and Brandis (2020).
Updated Stagnation-Point Aeroheating Correlations for Mars Entry. https://ntrs.nasa.gov/citations/20200003079 [10] NASA
Technical Reports Server. Performance of 19.7 m Disk-Gap-Band Parachute. https://ntrs.nasa.gov/search.jsp?R=20070030997 [11]
JPL. Deep Space 2 Mission Events. https://www.jpl.nasa.gov/nmp/ds2/mission/events.html [12] NASA Science. Mars Polar Lander /
Deep Space 2 mission outcome. https://science.nasa.gov/mission/mars-polar-lander-deep-space-2/ [13] Lorenz et al. (2000).
Penetration tests on DS2 Mars microprobes. https://www.sciencedirect.com/science/article/pii/S0032063300000167

[14] NASA Glenn. Mars overview: gravity, descent, atmosphere. https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/mars/
[15] Sutton and Graves (1971). General stagnation-point heating equation. https://ntrs.nasa.gov/search.jsp?R=19720003329 Scientific
independence note: all entry trajectories, six-probe timing rows and impact results in this report were computed for this study, not
extracted from published mission results. Citations substantiate environmental constants, precedents and sensitivity context, not
the selected Freya hardware sizing.

[Source Rev7 PDF page 136; section classification: Aeroshell and thermal protection]

Source evidence — Rev7 master page 152
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified Numerical data files delivered with the report Chart / study
output Machine-readable CSV file Entry trajectories entry_steep_revision2.csv; entry_shallow_revision2.csv Entry case comparison
entry_case_comparison.csv Orbital/periapsis trade orbital_trade.csv Thrust-time curves thrust_trade.csv; thrust_time.csv;
burn_milestones.csv Heat-shield vs braking/heating

heat_shield_trade.csv TPS thickness and mass tps_mass_trade.csv Penetration curves penetration_curves_table.csv Steep six-probe
results penetrator_cases_18.csv Shallow six-probe results penetrators_shallow_18.csv Atmosphere vs substrate
atmosphere_resistance_sensitivity.csv Shock and component forces electronics_shock.csv

Risk priority/mitigation risk_register.csv Scientific references: public source versus model-generated calculations [1] NASA NSSDC,
Mars Fact Sheet. https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html [2] NASA Ames, Mars 2020 TPS and PICA heritage.
https://www.nasa.gov/ames/ames-contributions-to-mars-2020-mission/ [3] NASA NTRS, Development and Sizing of the Mars 2020
Thermal Protection System (2022). https://ntrs.nasa.gov/citations/20220009403 [4] NASA Science, PICA-D and PICA capability
sustainment (2022). https://science.nasa.gov/science-research/science-enabling-technology /technology-highlights/protecting-future-
planetary-missions-from-extreme-heat/ [5] NASA JPL, Mars Penetrators Successfully Complete Crucial Subsystem Test.
https://www.jpl.nasa.gov/news/mars-penetrators-successfully-complete-crucial-subsystem-test/ [6] NASA Science, Mars Polar
Lander / Deep Space 2 mission outcome. https://science.nasa.gov/mission/mars-polar-lander-deep-space-2/ [7] NASA JPL, Deep
Space 2 Mission Events and planned shock/environment. https://www.jpl.nasa.gov/nmp/ds2/mission/events.html

[8] NASA JPL, Mars 2020 entry vehicle and PICA heat shield. https://www.jpl.nasa.gov/news/press_kits/mars_2020/landing/mission/
spacecraft/getting_to_mars/ [9] NASA NTRS, Sizing and Margins of Mars 2020 Acusil-II TPS.
https://ntrs.nasa.gov/archive/nasa/casi.ntrs.nasa.gov/20180006860.pdf [10] Haynes et al., Thermomechanical Impact of
Polyurethane Potting on Gun Launched Electronics (2013). https://doi.org/10.1155/2013/148362 Provenance note: none of the
quantitative Freya trajectory, thermal, deorbit, parachute, or target penetration results were measured by NASA or supported by a
vendor-specific qualification test. They are original first-order simulations whose source code and datasets are included in the
companion site archive. References are cited for parameters and technology precedents only. End of integrated Revision 2
scientific study.

[Source Rev7 PDF page 152; section classification: Aeroshell and thermal protection]

Source evidence — Rev7 master page 161
4. Stroud, R. H., et al.; Exotech Systems, Inc. (April 1972). Contamination Control by Use of Ethylene Oxide: Technology Summary,
Task 12. NASA-CR-126034; TR72-11; contract NASw-2062. NASA NTRS 19720013398. Historical report inspected; it is not a current
approved FREYA process. https://ntrs.nasa.gov/api/citations/19720013398/downloads/19720013398.pdf 5. Spacek, J.; Abraham, C. A.;
Benner, S. A. (15 September 2026). The case for extant life on Mars: A Technical Reanalysis of the Viking Carbon Assimilation–
Pyrolytic Release Experiment. The Primordial Scoop. Page identifies manuscript as a preprint submitted to Astrobiology.
Interpretation remains contested, not a confirmed life detection. https://primordialscoop.org/2026/09/15/capyr/ 6. NASA TechPort
project 184149. Reviewer-supplied project record. Retrieved page required JavaScript and supplied no project details; no maturity
or performance claim is based on this record. https://techport.nasa.gov/projects/184149 7. Sandvik Osprey. Osprey 4340 and Osprey
434 low-alloy steel datasheet, updated 14 September 2023. Wrought density 7.85 g/cm3 and conductivity 44.5 W/m K used for
screening. Powder data and room-temperature strength
are not qualification of a machined cold-impact chassis. https://www.metalpowder.sandvik/en/products/metal-powder-alloys/low-
alloy-steel/osprey-4340/?html-to-pdf=true 8. Epoxy Technology Inc., Meridian Adhesives Group (February 2021). EPO-TEK 301-2
Technical Data Sheet, Rev XVIII. Component specific gravities 1.15 and 0.95; 100:35 mass ratio. These imply about 1.09 g/cm3 before
cure if volumes add. Model rounds to 1.10 g/cm3. Resin selection, cured density, shrinkage, assay compatibility and cryogenic
impact response remain open.
https://products.meridianadhesives.com/storage/downloads/uennuicaaxt1bodtipkbpydtg0u8qs33/301-2.pdf 9. GomSpace. NanoCom
AX100 product page, accessed 26 October 2026. Bare transceiver 24.5 g, 65 by 40 by 6.5 mm; operating range -30 to +85 C. Supports
only a mass analogy; the 100 g FREYA packaged allocation is an engineering estimate. Hardware is not selected or qualified for
penetrator shock. https://gomspace.com/product/nanocom-ax100/ 10. NASA (30 August 2022). NASA-STD-8719.27, Implementing
Planetary Protection Requirements for Space Flight. Active baseline, change 0, as shown by NASA standards page accessed 26
October 2026. Mission authority

determines applicable requirements and classification. https://standards.nasa.gov/standard/NASA/NASA-STD-871927 11. NASA
Planetary Protection Handbook, NTRS 20240016475. Inherited Revision 4 reference. Retrieval returned access error in this
reassessment; detailed requirements were not inferred from unread text. https://ntrs.nasa.gov/citations/20240016475 12. User-
supplied FREYA expert review recorded 26 October 2026 in FREYA_Expert_Review_Addendum_2026-10-26.txt. Reviewer identity
not explicitly supplied. Corrections, proposals and missing evidence are separated in this reassessment.
https://chatgpt.com/library?file_id=libfile_e9082a2bf0f08191bc9dac61d937194b&account_id=personal 13. Spacek, J., and coauthors
(2026). Supplementary Information for IMPRESS: A Planetary Penetrator Network for Astrobiology, Prospecting, and Exploration
of Mars. Tables S1–S3, 15 pages. DOI 10.1177/15311074261471218. Publisher supplement inspected through indexed PDF. Saved
PDF is the freely available author-hosted

[Source Rev7 PDF page 161; section classification: Aeroshell and thermal protection]
8. Electronics, batteries, heat and survivability
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 26
ID Assumption and value Clas s Justification and source If wrong Retire by A-02 Science bulk density 2.0 kg/L (0.500 L for 1 kg) E No
CAD. Mid-range of Rev 4's 1–3 kg/L sensitivity. The only supplement datum, humidity sensor 45 g in

124 cm³, is 0.36 kg/L [13]. An integrated package with reagents and vials may be denser; 2.0 is not conservative (PR-31). 1.0 kg/L:
579 mm, +1.47 kg. 0.5 kg/L: 1,043 mm, 9.9 kg. 3.0 kg/L: 270 mm, −0.49 kg. G0, G1 A-03 Ancillary internal volume 0.120 L (battery,
controller, heater, harness) E Rev 4 calls it aggressive. A D-size Li/SOCl2 cell is 33.4

× 61.6 mm = 54 cm³ and 100 g [24]; 0.450 kg is 4.5 cells ≈ 0.243 L before electronics (PR-32). 0.25 L: 408 mm. 0.35 L: 454 mm, +0.68
kg (70/2.5). G1 A-04 Potting 25 %, reserved space 10 % of cavity E No source. Potting provides shock isolation and sealing; the
fractions are engineering choices. Potting 20 / 30 %: −0.19 / +0.22 kg. Reserved 5 / 15 %: −0.13 /

+0.15 kg. G1 A-05 Six probes; 45 kg entry mass U/E No replication design supports six. Treated as a scenario only. See §11 closure
table. G0 4.2 Structure and materials ID Assumption and value Clas

s Justification and source If wrong Retire by A-06 4340-class steel, density 7,850 kg/m³ S Density 7.85 g/cm³ for the powder alloy [7]
and wrought datasheet [45]. Reliable. Negligible. — A-07

Hardened 4340 survives cold impact E / X Not established. From condition U to Z the wrought datasheet minimum yield rises 740 →
1,125 MPa while minimum Charpy falls 42 → 9 J [45]; temper embrittlement near 350 °C tempering [46]. No Mars-night toughness
data located. Brittle fracture voids the structure (R06). G2 A-08 Wall schedule 1.5 / 2 / 2.5 / 3

mm for 50 / 60 / 70 / 80 mm E Chosen to screen plausible geometries; the IMPRESS reference wall is 1.5 mm [1]. No structural
analysis. ±0.5 mm wall ≈ ±0.37 kg at 70 mm. G2 A-09 Hollow hemispherical nose, 5 mm cap, joints and cage 0.120 kg E Geometry
choices. A solid or thick ogive nose raises

mass and changes the Young nose coefficient. Joints 0.06 / 0.20 kg: −0.07 / +0.10 kg. G1 A-10 Potting density 1.10 kg/L S/E EPO-TEK
301-2: 100:35 by mass; specific gravities 1.15 and 0.95 give 1.0905 kg/L [8]. An analog only; cured density and cryogenic shock
behavior untested (PR-27). ±5 % ≈ ±0.013 kg. G2

A-11 Young's modulus 205 GPa for the Euler screen E Typical for steel; not temperature corrected. Margins scale linearly. G2 4.3
Power and thermal ID Assumption and value Clas s Justification and source

If wrong Retire by A-12 Battery 0.450 kg U/E Short-duration allowance, not a requirement (C06). 30 days at 1.5 W needs 7.2 kg. G1
A-13 Usable specific energy 150 Wh/kg at battery level E Conservative screening value. Cell level at 20 °C, 50

mA: Li/SOCl2 421 Wh/kg, Li/CFx 730–741 Wh/kg [23]. Li/CFx discharge fails near −40 °C [23]. DS2 used a modified Li/SOCl2 for cold
operation [19] [25]. 250 Wh/kg: 71.7 h. 400 Wh/kg: 116.7 h at 1.5 W. G1 A-14 Average load 1.5 W plus 5 Wh start-up E No load budget
behind it. Barrel side loss alone is 1.3 W (PR-04). Radio listening and heater power are

not included (PR-33). A warmed 5-day assay needs about 130 Wh (§8). G1 Preliminary. No hardware configuration is flight
qualified. Prepared for Robert J Mills, 26 October 2026 Page 10

[Source Rev7 PDF page 26; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 41
Figure 6. Radial side loss versus soil conductivity for two barrel sizes at ΔT = 50 K. Basis: reviewed model. Far-field radius
sensitivity at k = 0.039: 0.1 m → 3.35 W; 0.2 m → 2.02 W; 1 m → 1.05 W; 2 m → 0.87 W. PEER REVIEW · MAJOR PR-04 At k = 0.039
W/m K and ΔT = 50 K, the 70 mm barrel loses 1.32 W to the soil. That is 88 % of the 1.5 W profile used for the 41.7 h runtime, and 55
Wh of the 62.5 Wh that remains after start-up. The runtime is therefore valid only for a body that is not held warm. In a conductive
soil the loss exceeds the entire battery within hours. Any warmed mode must be thermally isolated inside the bore, and that
isolation consumes volume that the 0.120 L ancillary allowance (A-03) does not provide. 7.3 Insulation screen for a warmed assay
chamber To illustrate the burden, take a cylindrical chamber of 25 mm diameter and 100 mm length (49 cm³) held at +10 °C inside
the bore, against soil at 217.5 K (ΔT ≈ 66 K). Radial insulation between the chamber and the 65 mm bore can be at most about 20
mm thick. The two conductivities are assumptions: 0.015 W/m K for a silica aerogel class material and 0.005 W/m K for a vacuum-
assisted one (E, not sourced). Radial insulation thickness

Loss at k = 0.015 Loss at k = 0.005 Energy over 5 days at k = 0.005 5 mm 1.85 W 0.62 W 74 Wh 10 mm 1.06 W 0.35 W 42 Wh 20 mm
0.65 W
0.22 W 26 Wh Radial loss only; end losses, penetrations for sample access and sensors, and heater inefficiency add to it. Holding a
chamber warm costs roughly 0.2–0.7 W even with the best insulation that fits, which is why the duration–power map (Section 8)
matters. 7.4 Operating modes Mode Thermal state Power implication Planetary-protection note A Cold survival and brief
measurement Body tracks soil; electronics survive on low heat

or cold qualification Fits 1.5 W for about 42 h with 0.450 kg battery (A-12) No warmed volume; consistent with surface-contact
classification B Insulated warm electronics, sample minimally altered Electronics bay isolated and held near −20 to 0 °C; sample at
soil temperature About 0.3–0.7 W continuous; 5 days ≈ 60–130 Wh (§8) Warm bay is dry hardware, not

sample Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 25

[Source Rev7 PDF page 41; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 42
Mode Thermal state Power implication Planetary-protection note C Intentionally warmed assay chamber Chamber held at assay
temperature (for example +5 to +20 °C), thermally isolated from the soil Hold power 0.2–0.7 W plus heater peaks; 5 days ≈ 130 Wh
May meet Special Region temperature and water-activity

conditions (§12.3) A buried body is not a guaranteed warm incubator, and a hot sample is not a measurement of unperturbed
biology. The conductive steel shell (44.5 W/m K [7]) spreads heat to the soil and couples the sample and electronics to it; impact
compaction and heating of the surrounding soil change contact resistance in ways no model here captures. Requirement THERM01
(separate thermal nodes for shell, soil, sample and electronics) stays open. 8 Power, heating and energy closure The 0.450 kg
battery allowance provides 67.5 usable Wh at the assumed 150 Wh/kg, which is a battery-level screening value that already folds in
cold, aging, packaging and conversion derating; it is not a vendor guarantee. The modeled battery closes only a brief measurement
mode: 41.7 h at 1.5 W after a 5 Wh start-up. Five days at the same profile needs 1.233 kg; 30 days needs 7.233 kg; 90 days needs
21.633 kg. Rev 4 results were reproduced exactly. 8.1 Chemistry sensitivity PEER REVIEW · MODERATE PR-19 Cell-level specific
energy at 20 °C and 50 mA is 421 Wh/kg for Li/SOCl2 (Saft LSH 20 D cell) and 730–741 Wh/kg for Li/CFx [23]. Li/CFx is attractive but
a JPL survey reports that it failed to discharge at all at −40 °C, with 640

Wh/kg at 0 °C [23]. DS2 flew a modified Li/SOCl2 cell chosen for low-temperature and impact tolerance [19][25]. So 150 Wh/kg at
battery level is conservative, but the chemistry choice depends on the cold case, which is the case that matters on Mars. Runtime
from 0.450 kg battery, hours (days) 0.1 W 0.25 W 0.5 W 1.0 W 1.5 W 150 Wh/kg (Rev 4) 625 (26.0 d) 250 (10.4 d) 125 (5.2 d)

62.5 (2.6 d) 41.7 (1.7 d) 250 Wh/kg 1,075 (44.8 d) 430 (17.9 d) 215 (9.0 d) 107.5 (4.5 d) 71.7 (3.0 d) 400 Wh/kg 1,750 (72.9 d) 700 (29.2 d)
350 (14.6 d) 175 (7.3 d)

116.7 (4.9 d) Runtime = (0.450 × specific energy − 5 Wh) / average power. Battery mass for 30 days, kg 0.1 W 0.25 W 0.5 W 1.5 W 150
Wh/kg 0.51 1.23 2.43 7.23 250 Wh/kg

0.31 0.74 1.46 4.34 400 Wh/kg 0.19 0.46 0.91 2.71 No chemistry in this range makes a 30-day run at 1.5 W close; a 30-day run is
feasible only at about 0.25 W average or less, which excludes any sustained warming. Solar recharge or a radically lower duty
cycle would be a new architecture with its own surface-area, storage and dust budget. Preliminary. No hardware configuration is
flight qualified. Prepared for Robert J Mills, 26 October 2026

Page 26

[Source Rev7 PDF page 42; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 43
Figure 7. Battery mass versus operating duration for four average-power cases. Basis: reviewed model at 150 Wh/kg. Replaces Rev
4 Figure 4, which showed one profile. 8.2 A mode-based ledger (illustrative) To show the scale of a warmed assay, take Mode B or C
for 5 days with the numbers from Section 7.3 and assumed electronics and communications loads. These are engineering
estimates, not measured values. Load Energy Basis Start-up and checkout 5 Wh Rev 4 allowance (A-14) Chamber hold, 0.7 W × 120
h 84 Wh

Upper end of §7.3 (A, E) Electronics, 0.3 W × 120 h 36 Wh Assumed (E) Communications, 10 passes × 0.5 Wh 5 Wh 5 W RF class, 6
min pass (§9) Total 130 Wh 0.87 kg at 150 Wh/kg; 0.52 kg at 250; 0.33 kg at 400 PEER REVIEW · MODERATE PR-33 The Revision 4
profile has no line for the radio. A receiver that listens continuously draws on the order of 0.4 W (a secondary compilation [48] lists
0.4–2.8 W receive and 4–10 W transmit for the AX100, not verified against its datasheet), which would be 16.7 Wh over 41.7 h.
Transmitting at 1–5 W RF with the 45 % power-added efficiency in the AX100

flyer [9] costs 0.22–1.1 Wh per 6 minute pass. Receive windows should be scheduled from predicted overflights (requirement
PWR02), and a radio rated only to −30 °C [9] needs heater power on the surface aftbody. Decision implication. A Mode B or C 5-day
assay needs a battery of roughly 0.5–0.9 kg, up to about twice the 0.450 kg allowance, plus the insulation volume it implies. That is
within the range of the packaging uncertainty in Section 5.4, not beyond it, but it must be decided before the cavity is sized. 9
Communications and relay 9.1 Relay network status Direct-to-Earth transmission is not assumed. Surface assets use UHF proximity
links to Mars orbiters. NASA reports that the Mars Relay Network now has four orbiters; MAVEN was declared ended on 3 June
2026 after silence since 6 December 2025 [26]. Preliminary. No hardware configuration is flight qualified. Prepared for Robert J
Mills, 26 October 2026 Page 27

[Source Rev7 PDF page 43; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 57
Risk Issue Closure evidence Reviewer note Gate R27 (new) Warmed assay triggers Special Region or Category IVc questions
Authority determination; PP04 record PR-20. G0 R28 (new) Schedule does not support the

chosen launch window Gate plan with exit criteria; host agreement PR-28; Section 13.3. G0 R29 (new) Shock loads underestimated
(peak much larger than average) Instrumented drop tests; load spectra DS2 design load about 10× mean [18]. G2 R30 (new)
Penetration depth outside the

useful range Analog target tests; speed and drogue requirement About 0.3–0.5 m at 100 m/s (relative scaling, §10.3). G3 R31 (new)
Evidence base is narrow (one author group, preprint, unread addendum) Independent sources; addendum text; reviewer named
PR-21, PR-22.

G0 R32 (new) Aftbody allowance incomplete Bottom-up aftbody design See R19. G1 R33 (new) Planetary-protection policy
instrument status uncertain Confirm current NPR 8715.24 and COSPAR edition Listed expiration 24 Sep 2026 (PR-20). G0

R34 (new) Carrier does not enter Mars orbit Carrier trajectory and decision from host PR-34. G1 R35 (new) Composite body
delaminates or the steel-to-composite joint fails under impact or cold Joint coupon and drop tests; NDE; fibre-metal-laminate
fallback New with the §5.9 architecture trade (D-09).

G2 16 Recommended next steps Sequence the work by dependency. Update the mass ledger whenever a choice changes, and
review the coupled configuration before calling anything a mission baseline. Step Action Output Unlocks Resolve D-01, D-02 and
D-08; supply the expert addendum text and reviewer name Mission class, mode and hypothesis; evidence base Every other step

Obtain supplier concept designs and measured density for the 0.31 kg and 1 kg envelopes (D-04) Package envelope, mass, power
and operating profile Cavity sizing; battery; thermal Select carrier, entry mode, probe count and relay (D-05, D-06) Interface
conditions; link requirements EDL design; mass closure Open the planetary-protection dialogue and confirm the compliance route
Category and endpoints Process selection; schedule

Build the coupled thermal and energy model for the three modes Mode feasibility; battery mass D-02 confirmation; PWR01,
THERM01 Packaging CAD for 60/2, 70/2.5 and 50/1.5; component-level ledger; repeat Section 5 Revised ranking and decision record
Gate G1 Coupons and instrumented drop tests; tether and drogue tests Survivability evidence Gates G2, G3 Independent human
review by structures,

thermal, power, communications, planetary- protection and astrobiology experts Reviewed baseline Gate G4 Preliminary. No
hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 41

[Source Rev7 PDF page 57; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 61
# Citation Used for Status What was confirmed, and link [18] NASA NTRS 20000056603. Mars microprobe system description. DS2
design loads Partial Excerpt: forebody deceleration 30,000 g; aftbody peak shock 80,000 g; Li/SOCl2 batteries.
https://ntrs.nasa.gov/api/citations

/20000056603/downloads/20000 056603.pdf [19] Smrekar, S., et al. (1999). Deep Space 2: The Mars Microprobe Mission (Caltech
Authors record). DS2 mass, speed, depth Verified Abstract: 2.4 kg each; about 190 m/s; penetrate up to 0.6 m.
https://resolver.caltech.edu/Calte chAUTHORS:20140416- [20] Gunter's Space Page. DS2 (Deep Space 2, Mars Microprobes).

DS2 masses and geometry Secondary Secondary: probe 3.572 kg; aeroshell 1.165 kg; forebody 0.670 kg, 35 mm × 105.6 mm; impact
160–200 m/s, angle of attack below 12°. Verify against JPL. https://space.skyrocket.de/doc_s dat/ds-2.htm [21] Gao, Y.; Ellery, A.;
Jaddou, M.; Vincent, J.; Eckersley, S. (2005). A Novel Penetration System for in situ Astrobiological Studies. Int. J. Adv. Robotic Syst.
2(4). DOI 10.5772/5779.
Mass budget; Young calibration Partial Search excerpt only (publisher blocked fetch): forebody 2.7 kg (3.2 with margin), aftbody
5.6 kg (6.7), 150 m/s, depth 0.76–1.36 m for S = 5–9. https://doi.org/10.5772/5779 [22] Young, C. W. (1997). Penetration Equations.
Sandia report SAND97- 2426. Penetration scaling Partial

Report confirmed via OSTI. The SI form was read in two secondary sources: an NC State thesis and Atlantis Press ICISMME 2015.
https://www.osti.gov/biblio/5624 98 ; https://www.atlantis- press.com/article/21027.pdf Power, communications and delivery #
Citation Used for Status What was confirmed, and link

[23] Brandon, E. (JPL). High Specific Energy Primary Batteries for NASA Missions (NASA SMD, 2023); and US patent 11,831,044,
Heat- augmented primary battery (background). Cell-level specific energy; cold failure of Li/CFx Partial Li/SOCl2 (Saft LSH 20) 421
Wh/kg; Li/SO2 420; Li/CFx 730–741 Wh/kg at 20 °C, 50 mA. Patent background: Li/CFx 640 Wh/kg at 0 °C, no discharge at −40 °C.
https://smd-cms.nasa.gov/wp-

content/uploads/2023/11/brando n-jpl-licfx-primary-batteries.pdf [24] Saft. LSH 20 HTS datasheet (July 2010), D-size Li-SOCl2 cell.
Cell size and mass Verified 33.4 mm × 61.6 mm, about 100 g, −60 to +85 °C. https://www.enix- power-solutions.com/wp-
content/uploads/2021/10/LSH20- HTS.pdf [25] Distributed Instruments for Planetary Surface Science: Scientific

Opportunities and Technology Feasibility. arXiv:2407.01757. Primary battery context Partial Excerpt: Li/CFx above 700 Wh/kg
without flight heritage; a modified Li/SOCl2 was developed for DS-2. https://arxiv.org/pdf/2407.01757 Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 45

[Source Rev7 PDF page 61; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 81
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 12 8 Power heating and
communications The 0.450 kg battery allowance provides 67.5 usable Wh at an assumed integrated usable specific energy of 150
Wh/kg. This assumed value already represents cold, aging, packaging and conversion derating at a screening level; it is not a
vendor guarantee. Recalculate against selected chemistry, storage history, operating temperature, peak currents and impact
damage. Figure F04 Battery requirement versus assay duration under one illustrative power profile Table T08 Duration energy
and required battery mass Operating duration Energy at 1.5 W plus 5 Wh Battery at 150 Wh/kg 24 hours

41.0 Wh 0.273 kg 120 hours 185.0 Wh 1.233 kg 30 days 1085.0 Wh 7.233 kg 90 days 3245.0 Wh 21.633 kg The modeled battery closes
only a brief measurement mode: about 41.7 hours at 1.5 W after a 5 Wh startup allowance. Five- day incubation already requires
1.23 kg of battery under this profile; 90 days requires 21.63 kg. These values exclude

additional chamber heating peaks. Solar recharge or a radically lower duty cycle would constitute a new architecture with its own
surface area, storage and dust budget. The 0.100 kg packaged transceiver estimate is larger than the 24.5 g bare AX100 analog [9] to
allow support and interfaces. Its 65 mm board length and 40 mm width also show why mass alone cannot prove bore fit. Keeping it
in the aftbody avoids forcing this board into a narrow tube. Antenna deployment, relay availability, frequency authorization and
RF compatibility remain unresolved; direct-to-Earth transmission is not assumed.

[Source Rev7 PDF page 81; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 106
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 37 A068 Mean operating
power 1. Input: 1.5 W constant illustrative load (Scenario assumption). 2. Basis: No time-resolved experiment profile 3. Logic:
Multiply average power by operating hours; consider it total average load, not heater power alone. 4. Review: Heater, radio and
sample peaks are not resolved; 1.324 W side loss would consume most of this load. A069 Startup and extra energy 1. Input: 5 Wh
(Engineering judgment). 2. Basis: No startup waveform or warm-up heat capacity 3. Logic: Add a single lumped energy term before
dividing by usable Wh/kg. 4. Review: Does not prove warming of sample, steel or surrounding regolith is covered. A070 Operating
durations

1. Input: 24, 120, 720, 2160 hours (Scenario choices). 2. Basis: 1, 5, 30 and 90 Earth days in F04/T08 3. Logic: Multiply days by 24;
evaluate required energy and battery mass independently for each. 4. Review: Earth-day scenarios, not sols or an approved
incubation schedule. A071 Battery energy closure 1. Input: Euse=mbat×150; Eneed=1.5h+5 (Calculated screen). 2. Basis: Battery
mass, usable energy and operating profile entries 3. Logic: Compare Eneed≤Euse; required mass = Eneed/150; runtime = max(0,
(Euse-5)/1.5). 4. Review: Extra battery mass changes volume and structure; chart alone is not a resized probe design. A072 Impact-
speed grid 1. Input: 40,60,80,100,120,160,200 m/s (Scenario choice). 2. Basis: F05 code; 100 m/s comparison in T02 3. Logic: Evaluate
kinematics at chosen speeds; do not derive them from current entry or chute models.
4. Review: No current coupled descent prediction supports these speeds. A073 Stopping-distance cases 1. Input: 0.2,0.5,1.0 m;
comparison .5 m (Scenario choice). 2. Basis: F05 code and T02 illustration 3. Logic: Choose independent stopping distances;
compute average deceleration v²/(2s). 4. Review: Stopping distance is not predicted penetration depth or a target-strength
calibration. A074 Standard gravity conversion 1. Input: g0=9.80665 m/s2 (Defined unit convention). 2. Basis: [16] acceleration
conversion table 3. Logic: Divide m/s2 by g0 for Earth-g units; use same g0 in rocket equation. 4. Review: Not local Mars surface
gravity.

[Source Rev7 PDF page 106; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 112
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 43 1. Reuse the six
unrounded T04 geometries and mass locations. 2. Compute L/D using overall envelope length and outer diameter in common units.
3. Compute frontal area πD²/4; divide nominal forebody mass by this area. 4. Assign brief qualitative descriptions based on length,
mass and unverified construction. Reproduction check: 70/2.5 gives L/D=4.963566 and sectional mass 914.689342 kg/m2. Review
limit: Sectional mass is not a ballistic coefficient, penetration solution or equal-strength performance measure. T08 Duration
energy and required battery mass Inputs: A068, A069, A070, A067, A071 Sources: All load, startup, battery and duration inputs are
stated engineering scenarios; no selected battery data. 1. Convert 1,5,30,90 Earth days to 24,120,720,2160 h. 2. For each row use
E=1.5 h+5 Wh.

3. Required battery mass=E/150 Wh/kg. 4. Compare with the separate .450 kg study battery, without modifying geometry
automatically. Reproduction check: At 120 h E=185 Wh and battery=1.233333 kg; at 2160 h E=3245 Wh and battery=21.633333 kg.
Review limit: No time-resolved thermal/electrical profile; battery growth requires structural and volume redesign. T09
Contamination process evidence gates Inputs: A085, A086 Sources: [10] requirements framework; [4] historical limitations; [12]
gas-process proposal. 1. Separate authority classification, process, coverage/residues, functional acceptance and recontamination.
2. For each gate identify required evidence and ask whether approved evidence has been provided. 3. Set OPEN when no
acceptance evidence is present. Reproduction check: Five OPEN gates; no microbial-reduction arithmetic or compliance
percentage. Review limit: Process candidates do not select operating conditions or establish sterilization. T10 Proposed
requirements part one

Inputs: A087, A001, A066, A009, A042 Sources: [12] review plus explicit model boundary; relevant source [1] for architecture. 1.
Translate science, accounting and mechanical gaps into proposed obligations. 2. Assign stable IDs SCI01–SCI06, SYS01–SYS03 and
MECH01–MECH02. 3. Attach a verification method to every row; count 11 rows. Reproduction check: Requirements are proposed
statements, not calculated measurements or signed approvals. Review limit: No empirical basis for numerical payload volume or
wall safety is supplied by the requirements themselves. T11 Proposed requirements part two Inputs: A087, A071, A085, A086, A083
Sources: [10] framework and subsystem evidence gaps; explicit study synthesis.

[Source Rev7 PDF page 112; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 116
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 47 F04 Battery mass
versus duration Inputs: A068, A069, A070, A067, A071 Sources: T08 scenario assumptions; no vendor performance data. 1. Generate
Earth-day duration categories 1,5,30,90. 2. Compute hours=days×24; E=1.5×hours+5 Wh. 3. Compute battery=E/150 Wh/kg; plot four
mass bars. 4. Overlay .450 kg allocated battery as a comparison line. Reproduction check: Bars .273333,1.233333,7.233333,21.633333
kg; allocated battery line is .450 kg. Review limit: No battery sizing feedback into structure or packaging; constant mean power
hides load peaks. Exact data file: F04_energy_plot.csv F05 Average stopping deceleration versus speed

Inputs: A072, A073, A074, A075 Sources: Kinematic identities; [16] gravity conversion. Speeds and distances are scenarios. 1.
Generate seven impact speeds 40 through 200 m/s as listed. 2. For s=.2,.5,1.0 m compute average a=v²/(2s). 3. Convert a to Earth g by
division by 9.80665. 4. Plot one curve per stopping distance. Mass does not enter this ordinate. Reproduction check: At v=100 m/s,
s=.5 m, average=1019.716213 Earth g; this differs from unknown peak component shock. Review limit: No target-strength law,
actual depth prediction, parachute solution or instrument survivability is calculated. Exact data file: F05_shock_plot.csv

[Source Rev7 PDF page 116; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 147
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified 6. Encapsulated avionics and battery survival The
computed rigid-body initial decelerations are approximately 307 g (ice), 1,480 g (damp analog), and 2,667 g (dry sandstone).
Average decelerations are lower. These are not complete shock-response spectra; real component shock includes deceleration
spikes, axial and transverse loading, and board/package resonances. The average pulse proxy t ~ 2 L/V spans roughly 12.5-33.7
milliseconds in this model, but it is not an experimentally determined pulse width. NASA JPL reported that a Deep Space 2
experimental drill survived an approximately 20,000 g test and specially cased lithium-thionyl-chloride batteries survived an
approximately 45,000 g test [5]. DS2 microprobes did not return data from Mars [6]. Those tests show that well-engineered
individual components can withstand high shock; they do not guarantee an assembled Freya probe can survive and function.
Material 150 g module inertial force (N)

250 g battery pack inertial force (N) Impact energy (kJ) Shock pulse proxy (ms) Ice 19.8 33.7 Damp 2,178 3,629 80.6 16.7

Dry 3,923 6,539 143.3 12.5 Electronics requirements: use board-level finite-element shock analysis, small-form-factor components
mounted along the acceleration vector, mechanically fixed connectors, wire strain relief, vibration/shock-graded crystal/clock
choices, robust memory integrity checks and powered functional validation after impact. Evaluate potting versus stress transfer:
encapsulant selection must address modulus, glass-transition temperature, coefficient of thermal expansion, vacuum and cold
soak—not just hardness. Battery requirements: do not specify or claim qualification of any cell chemistry from bulk g-force alone.
Evaluate primary cells or impact-rated packaged cells for containment, electrode delamination, internal shorts, thermal behavior,
state-of-charge, temperature, passivation, launch handling and post-shock available energy. Test current limiting,

fusing, isolation switches and the entire battery-and-cable assembly in the target cryogenic environment. System-level acceptance
test: shock pulse time history and shock-response spectrum at critical electronic elements, live current monitoring, pre- and post-
impact capacity/impedance and RF tests, thermal-vacuum cycling, 6-axis orientation envelope, and multiple hardware lots. A
buried antenna requires a tether to a surface aftbody or a separately validated underground RF link. 7. Atmospheric and substrate
uncertainty Open-loop control is not robust. The table below holds each material’s first-probe nominal parachute size fixed while
atmospheric density changes and resistance strength is separately scaled. All numbers are model outputs rather than measured
confidence intervals. Atmospheric density multipliers +/-30% and effective resistance multipliers +/-50% are parameter stress tests.

[Source Rev7 PDF page 147; section classification: Electronics, batteries, heat and survivability]

Source evidence — Rev7 master page 151
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified 9. Recommended verification sequence and no-go criteria
Stage Purpose Evidence required for transition A. Substrate & mission definition Define accessible surface geology and depth
tolerance Chosen site geology, mission science objective, credible stratigraphy and 1.5 m tolerance B. Cryogenic gas-gun tests Fit
penetration law and fracture/angle

effects Instrumented 5 kg geometries in ice and dry rock over 80-350 m/s; retained electronics C. Shock-qualified probe prototype
Verify battery + electronics + antennas Multi-axis measured shock spectra and powered post-impact operation D. Aerodynamics &
deployment Demonstrate stable release and drogue inflation Mach-q-altitude mapping, recontact analysis, multiple-probe

separation tests E. Coupled orbiter-to-ground simulation Close deorbit and entry corridor Continuous burn, J2, atmosphere
dispersions, 6-DOF Monte Carlo and target geolocation F. TPS and mass verification Size protective shell, adhesives and thermal
mass Flight-condition CFD/arcjet plus thermal response and fully audited 45 kg design with margin

G. System demo Verify end-to-end concept Representative entry deployment and impact test with functional data relay
Recommended project gate: prioritize substrate impacts, probe g-survival and telecommunication proof before optimization of
heat-shield thickness or detailed drogue procurement. 10. Limitations, reproducibility and data sources The orbit and descent
models presently do not use one consistent geodetic datum: the deorbit model uses radius relative to mean Mars radius, whereas
atmospheric density and the landing location use a local AGL simplification; local surface offset is approximately -7.7 km. A future
version must use a site geoid/areoid model and properly mapped MOLA heights throughout orbit, atmosphere, topography and
penetrator trajectories. The shallow and steep profiles are alternative screens, not independently validated candidates. The body is
a zero-lift axisymmetric proxy with fixed drag coefficient; radiative heating, turbulent transition, TPS

recession, wind shear, canopy inflation forces, material failure, fragment breakup, carrier navigation errors, deployment
collisions, battery chemistry, antenna attenuation and planetary protection constraints are not solved. Results are deterministic
and can overstate accuracy by several orders relative to engineering confidence. Nominal penetration equality (1.500 m) is
obtained by inverse fitting; the physics of rock failure must be independently calibrated.

[Source Rev7 PDF page 151; section classification: Electronics, batteries, heat and survivability]
9. Planetary protection and sterilization
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 50
Document Role Status noted in this review NASA-STD-8719.27, Implementing Planetary Protection Requirements for Space Flight
[10] Technical requirements and standard spore assay Baseline approved 30 Aug 2022; active (verified). NASA Planetary Protection
Handbook, NASA-HDBK-20240016475 [11] Guidance and best practice; companion to the NPR and the standard Rev 4 reference
[11] resolves to this handbook,

effective 24 Jan 2025; it replaced NASA-HDBK- 6022. NASEM, Evaluation of Bioburden Requirements for Mars Missions (2021) [32]
Advisory; Special Region temperature margin Adopts −28 °C (245 K) with a margin to 255 K. PEER REVIEW · MODERATE PR-20 Rev
4 cited the standard but not the procedural requirement, the categories or the Special Region definition. For a non-NASA mission,
the route to compliance (host mission, launch provider, national authority) must be identified; this review did not research that
route and flags it as an open question (Section 17). 12.2 Categories for Mars landers Category Bioburden requirement

What it means for FREYA IVa Lander not designed to search for Martian life: at most 3×10⁵ spores on the system surface and an
average of at most 300 spores per m² [31] The likely class for a non-life-detection pathfinder (D-01). IVb IVa plus the entire landed
system at 30 spores or fewer, or the subsystems that acquire, deliver and analyze life-detection samples sterilized to that level, with
recontamination prevention [31] A life-detection FREYA lands here. Rev 4's dropping of mandatory whole-assembly irradiation is
consistent with the subsystem route, which then needs a validated, compatible treatment and barrier.

IVc Accessing a Special Region: system at 30 spores or fewer, or subsystems in contact sterilized and protected [31] Possible if a
warmed assay is judged to create Special Region conditions (§12.3). 12.3 Special Region screening and the warmed assay A Special
Region is a region within which terrestrial organisms are likely to replicate, or which is interpreted to have a high potential for
extant Martian life. The working thresholds are a temperature of at least 255 K (−18 °C) and a water activity above 0.60 (the SR-
SAG2 findings as summarized in [33]); NASA and NASEM carry the more conservative −28 °C (245 K) and 0.5 [32]. The shallow soil
at InSight averages 217.5 K [2], well below the threshold, but thin brine films can occur there [2]. A warmed assay chamber at +5 to
+20 °C would exceed the temperature threshold; whether it also exceeds the water-activity threshold depends on sample humidity
and salts, and whether the mission authority treats a spacecraft-created warm, wet volume as a Special Region is the authority's
decision. NRC language describes Category IVc missions as those going to a place

where liquid water is present or where the presence of the spacecraft could cause it to be present [33]. Design response: record the
maximum temperature, humidity and time above threshold for every wetted or humid volume (PP04), and ask the mission
authority early whether Mode C triggers IVc (decision D-01). 12.4 Gates (renamed) and process options PEER REVIEW · MAJOR
PR-03 In Revision 4 the identifiers PP01–PP03 appear in both the gate table and the requirements with different meanings. The
gates are renamed PPG01–PPG05 below; PP01–PP03 now refer only to requirements (Section 14). Gate Name Required evidence
State Related req. PPG01 Classification

Mission authority assigns applicable requirements and sample and site restrictions OPEN PP01 PPG02 Process selection Organism
endpoints and instrument and material compatibility OPEN PP02 PPG03 Coverage and residues Representative assemblies,
inaccessible spaces and assay interference OPEN

PP02 PPG04 Functional acceptance Post-treatment calibration, battery, tether, impact and thermal tests OPEN PP02 PPG05
Recontamination control Barriers, witnesses, integration and transport records OPEN PP03 Preliminary. No hardware
configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 34

[Source Rev7 PDF page 50; section classification: Planetary protection and sterilization]

Source evidence — Rev7 master page 83
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 14 10 Contamination
control and experiment validation Whole-assembly irradiation is no longer mandatory. The proposed glove-box assembly with a
bactericidal gas component, including ethylene oxide as a candidate, is recorded as a process trade. It has not been selected or
approved. The historical NASA report [4] discusses effectiveness and material compatibility limitations; it does not establish
complete fumigation of FREYA or modern mission acceptance. Evaluate controlled assembly plus compatible component
treatment, a validated gas process, radiation where compatible, and other authority-accepted methods against the assay. Ethylene
oxide residues or reaction products can bias a biological measurement. Sealed cavities and potting can restrict process access;
process verification must use flight-representative geometry. Neither a successful assembly step nor absence of growth in a single
blank establishes compliance. Table T09 Contamination process evidence gates Gate
Required evidence State PP01 Classification Mission authority assigns applicable requirements and sample/site restrictions OPEN
PP02 Process selection Organism endpoints and instrument/material compatibility OPEN PP03 Coverage and residues
Representative assemblies, inaccessible spaces and assay interference

OPEN PP04 Functional acceptance Post-treatment calibration, battery, tether, impact and thermal tests OPEN PP05
Recontamination control Barriers, witnesses, integration and transport records OPEN NASA-STD-8719.27 [10] provides the verified
requirements framework. The specific Mars category and detailed numerical cleanliness endpoints need mission-authority
determination. Heating a habitat or sample may affect that assessment. Do not assume a category solely from the probe depth. The
inherited handbook reference [11] is retained transparently, but unread passages are not used as evidence.

Before selecting an experiment, define collection quantity, capture efficiency, thermal history, chemical additions, detection limits
and time series. Include unamended material, a treated control appropriate to the assay, hardware and reagent blanks, calibration
checks and independent biological or chemical discriminants. Specify what an abiotic alternative would predict. Replication must
account for technical repeatability and spatial heterogeneity; six nodes are a scenario, not a justified sample size.

[Source Rev7 PDF page 83; section classification: Planetary protection and sterilization]
10. Requirements, constraints and trade studies
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 54
14 Requirements and constraints The requirements are proposed engineering obligations for this reassessment, not science-team
or mission-authority approval. Revision 4 items are retained with their IDs. New items are marked "New" and arise from the peer
review. PP01– PP03 refer only to requirements; the gates are PPG01–PPG05 (PR-03). ID Proposed requirement Verification SCI01
Retain 1.000 kg science mass as a user-directed trade assumption Weigh instrument assembly; record included electronics,
reagents and interfaces SCI02 Define measured signal, detection limit and abiotic alternatives before

instrument freeze Science review and assay validation with blinded analogs SCI03 Separate sample depth from forebody burial
depth Acquisition drawings and sample provenance demonstration SCI04 Compare shallow skin with buried sensing without
assuming liquid water Site pressure, temperature, salt and water-activity model SCI05 Allocate blanks, treated controls, reagent
controls and replication

Statistical analysis and contamination budget SCI06 Define incubation temperature and duration including delayed recovery Time-
series analog experiments; no assumed rapid revival; energy closure per §8 SCI07 (new) State the hypothesis and operating mode
(A, B or C) that the energy ledger supports Decision record D-02 SYS01 Maintain forebody, tether and surface aftbody reference
architecture Interface control drawing and deployment test SYS02

Close nominal mass and volume before adding contingency Measured bill of materials and CAD envelope SYS03 Apply 25 %
preliminary mass contingency in this study Ledger audit; replace with project-approved growth policy SYS04 (new) Carry growth
allowance per component by maturity, with 30 % as the concept default Ledger audit against AIAA S-120 practice [42] MECH01
Verify steel heat treatment, toughness and joining at operating temperature Coupons, NDE, cold impact tests and structural

analysis MECH02 Keep a physical tether path and release without damaging science hardware Full-speed deployment and pull
tests MECH03 Prevent potting from blocking sampling ports and optical or fluid paths Manufacturing drawing and flow or optical
tests MECH04 Qualify instrument shock response using local acceleration histories Instrumented drop tests and post-impact
calibration MECH05 (new) Show buckling and bending margin for the selected geometry under oblique impact

Finite-element analysis and cold oblique impact tests MECH06 (new) If a composite body is pursued, qualify the steel-to-composite
joint for impact shock and cold Coupon and drop tests of the joint at Mars-night temperature; NDE for delamination PWR01 Close
energy for every operating mode with cold, aging and conversion losses Time-resolved power model and battery characterization
PWR02 (new) Schedule receiver windows from predicted overflights and include listening and transmit energy

Power model with pass schedule THERM01 Model shell, soil, sample and electronics as separate thermal nodes Vacuum cold-
chamber correlation and transient thermal analysis THERM02 (new) Keep aftbody electronics within their qualified range
through the Martian night Cold-soak test; heater power in the ledger COM01 Transmit through an exposed antenna via a verified
tether interface Link budget and end-to-end post-impact demonstration COM02 (new)

Use a radio that interoperates with the selected relay (Proximity-1 for NASA and ESA orbiters) Interoperability test with the relay
operator Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 38

[Source Rev7 PDF page 54; section classification: Requirements, constraints and trade studies]

Source evidence — Rev7 master page 84
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 15 11 Requirements and
design constraints The requirements below are proposed engineering obligations for this reassessment. They do not constitute
science-team or mission-authority approval. Verification methods make the remaining work explicit. Table T10 Proposed
requirements part one ID Proposed requirement Verification SCI01 Retain 1.000 kg science mass as a user- directed trade
assumption Weigh instrument assembly; record included

electronics, reagents and interfaces SCI02 Define measured signal, detection limit and abiotic alternatives before instrument freeze
Science review and assay validation with blinded analogs SCI03 Separate sample depth from forebody burial depth Acquisition
drawings and sample provenance demonstration SCI04 Compare shallow skin with buried sensing

without assuming liquid water Site pressure temperature salt and water- activity model SCI05 Allocate blanks, treated controls,
reagent controls and replication Statistical analysis and contamination budget SCI06 Define incubation temperature and duration
including delayed recovery Time series analog experiments; no assumed rapid revival SYS01
Maintain forebody tether and surface aftbody reference architecture Interface control drawing and deployment test SYS02 Close
nominal mass and volume before adding contingency Measured bill of materials and CAD envelope SYS03 Apply 25 percent
preliminary mass contingency in this study Ledger audit; replace with project-approved growth policy later

MECH01 Verify steel heat treatment toughness and joining at operating temperature Coupons, NDE, cold impact tests and
structural analysis MECH02 Keep a physical tether path and release without damaging science hardware Full-speed deployment
and pull tests

[Source Rev7 PDF page 84; section classification: Requirements, constraints and trade studies]

Source evidence — Rev7 master page 85
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 16 11 Requirements and
design constraints continued Table T11 Proposed requirements part two ID Proposed requirement Verification MECH03 Prevent
potting from blocking sampling ports and optical or fluid paths Manufacturing drawing and flow or optical tests MECH04

Qualify instrument shock response using local acceleration histories Instrumented drop tests and post-impact calibration PWR01
Close energy for every operating mode with cold aging and conversion losses Time-resolved power model and battery
characterization THERM01 Model shell soil sample and electronics as separate thermal nodes Vacuum cold-chamber correlation
and

transient thermal analysis COM01 Transmit through an exposed antenna via a verified tether interface Link budget and end-to-end
post-impact demonstration EDL01 Analyze each delivery scenario with its own entry boundary conditions Trajectory dispersions
and aerodynamic database EDL02 Qualify drogue inflation stability and forebody

aftbody separation Mars-relevant deployment tests PP01 Obtain applicable planetary-protection classification and endpoints
Mission authority concurrence PP02 Validate a compatible reduction process with residues and assay blanks Microbial reduction
and materials compatibility evidence PP03 Maintain barriers and cleanliness after

treatment Integration controls and witness monitoring VER01 Keep data provenance model version and assumptions with every
result Shared model tests and exported scenario record

[Source Rev7 PDF page 85; section classification: Requirements, constraints and trade studies]

Source evidence — Rev7 master page 109
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 40 A087 Proposed
requirements and constraints 1. Input: 22 requirements and 12 study boundaries (Study synthesis). 2. Basis: requirements and
constraints arrays; reviewer and model boundary logic 3. Logic: Translate assumptions into verification obligations; preserve row
IDs. 4. Review: Count is administrative; no requirements-board approval is claimed. A088 Risk register 1. Input: 22 unscored open
risks (Engineering judgment). 2. Basis: risks array; subsystem and evidence-gap review 3. Logic: Identify failure cause, affected
requirement and closure evidence for every row. 4. Review: Not an exhaustive FMEA, likelihood distribution or success
probability. A089 Screening recommendation

1. Input: Carry 50 mm comparator and 60–70 mm shortlist (Conditional engineering judgment). 2. Basis: T04/T07 geometry and
mass; no weighted utility model 3. Logic: Compare length, mass, bore, frontal area and unresolved structural performance. 4.
Review: Not a proved optimum or an equal-strength comparison. A090 Evidence reuse and confidence 1. Input: No fitted depth,
flight-success percentage or sterilization success result (Model limitation). 2. Basis: [1], [13], prior solver archive and current
equations 3. Logic: Keep heritage and literature separate from proposed FREYA calculations. 4. Review: Unit tests validate
arithmetic and implementation, not physical assumptions. A091 Supplement mass and volume transfer 1. Input: Selected S1–S3
examples retained as source data (Literature synthesis). 2. Basis: [13] S1 DS2 row; S2 radiometer, humidity and microseismometer
rows; S3 concepts 3. Logic: Use cited values as examples; humidity fraction=.124/.15425 ≈80.4%.

4. Review: Examples are not a qualified selected suite; method maturity differs from impact readiness. A092 Rounding and units 1.
Input: SI internally; tabulated mm, L, kg, Wh and Earth g (Presentation convention). 2. Basis: Model code and current report 3.
Logic: Use 1 L=10^-3 m3, 1 cm3=10^-3 L; calculate unrounded then format. 4. Review: Do not recompute from rounded cells and
interpret the residue as new hardware mass.

[Source Rev7 PDF page 109; section classification: Requirements, constraints and trade studies]
11. Risk register and qualification blockers
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 87
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 18 12 Risk register and
closure plan All 22 risks remain open. No unsupported likelihood or success percentage is assigned. Each row identifies evidence
needed to retire or bound the risk. Prior numerical risk scores are not carried forward as measured probabilities. Table T13 Open
risks part one Risk Issue Closure evidence R01 Sample misses relevant biology Compare shallow and buried samples in analog
trials

R02 False biological signal Blinded abiotic controls and multiple independent measurements R03 Incubation exceeds energy
Demonstrate time series at credible sample conditions R04 Science envelope does not fit Obtain CAD and measure package bulk
density R05

Narrow chassis buckles or bends Cold oblique impact tests and finite element analysis R06 Hard steel fractures in cold impact
Toughness and heat-treatment qualification R07 Potting cracks or contaminates assay Thermal cycling, shock and chemical blanks
R08 Battery failure after impact Cold shock capacity and safety testing R09

Tether snags or severs Dynamic payout and penetration demonstration R10 Antenna remains buried or misoriented Surface
emplacement and RF tests R11 Relay link or access unavailable Selected service agreement and pass-based link budget

[Source Rev7 PDF page 87; section classification: Risk register and qualification blockers]

Source evidence — Rev7 master page 88
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 19 12 Risk register and
closure plan continued Table T14 Open risks part two Risk Issue Closure evidence R12 Drogue or separation fails Rarefied-
atmosphere deployment tests R13 Entry scenario transferred incorrectly Independent trajectory review

R14 Heat shield undersized CFD, thermal response, margins and arcjet evidence R15 Treatment damages measurements Residue
and compatibility validation R16 Recontamination during assembly Barrier and witness verification R17 Local geology prevents
emplacement Site analog impact matrix and targeting

review R18 Heated probe changes habitat Coupled soil/sample thermal model and untreated reference R19 Incomplete hardware
allowances Vendor BOM and measured assembly R20 Carrier mass no longer closes Re-size capsule dispenser and TPS R21
Insufficient replication

Power analysis with spatial heterogeneity R22 Model used as flight qualification Independent expert review and documented
model limits Sequence the next work by dependency: science objectives and sample handling; instrument CAD and operating
profile; revised packaging and energy closure; material and thermal coupons; instrumented drop and tether tests; delivery and
TPS design; complete contamination-control validation. Update the mass ledger whenever a choice changes. Review the coupled
configuration before calling it a mission baseline.

[Source Rev7 PDF page 88; section classification: Risk register and qualification blockers]

Source evidence — Rev7 master page 149
FREYA | Engineering Study Rev 2.0 | Concept screening / unqualified 8. Risk register and release blockers Risk scores are ordinal
concepts: likelihood 1-5 multiplied by consequence 1-5, with critical >=20, high 15-19 and medium below 15. Scores are expert-
screening ranks, not calculated accident probabilities. "Blocker" means essential verification must be completed before design
freeze, not that physics proves the mission impossible. ID Risk / discipline L C Score Priority Blocke r

R01 Penetration-model validation / Subsurface CRITICAL YES R02 Sandstone depth without breakup / Subsurface CRITICAL YES
R03 Probe attitude at impact / EDL CRITICAL YES R04

Drogue deployment envelope / EDL CRITICAL YES R05 Deorbit targeting & guidance / Orbit CRITICAL YES R06 Thermal-protection
sizing / TPS HIGH YES R07 Penetrator instrument survival / Avionics

CRITICAL YES R08 Battery impact and cold operation / Power CRITICAL YES R09 45 kg mass closure / System CRITICAL YES R10
Buried communications link / Comms HIGH

YES R11 Release separation collisions / EDL HIGH No R12 Site surface heterogeneity / Geology CRITICAL No R13 Dynamic stability
after releases / EDL HIGH No
R14 Planetary protection & cleaning / Mission MEDIUM No R15 Power after cold cruise / Power MEDIUM No R16 Thermal
structural interface / TPS MEDIUM No

[Source Rev7 PDF page 149; section classification: Risk register and qualification blockers]
12. Assumptions, equations and calculation traceability
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 9
Appendix R7 A Reproduction and model boundaries The retained Revision 5 reproducer passes 106 scalar checks. A separate
Python calculation in this release is compared against the website JavaScript for geometry, mass, Euler load, heat loss, entry state,
propellant, sampling geometry, carrier closure, hybrid mass and return-link margin. Results are stored in
FREYA_Revision_7_Calculations.json. These checks verify arithmetic from stated inputs only. This release records 134 additional
Python-versus-JavaScript scalar comparisons. The report tables are generated from the same frozen JSON snapshot. The source
package contains the reproducer, original peer-review files, code, hashes and exact retained source documents. Each table R7T01-
R7T05 prints a derivation immediately below it. Every new input is a scenario assumption unless its source is explicit: geometry
comes from the stated case; 205 GPa, CFRP 60 GPa, density, thermal properties and collar design are carried from R6 with their
original status. Sample tilt 0/15/30/45 degrees and disturbed allowance 0.05 m are newly introduced sensitivity choices, not
measured Mars distributions. The models are not coupled end-to-end. Changing battery mass does not resize its envelope;
changing material

does not establish joint fit; changing mass does not automatically compute chute deployment dynamics or actual penetration. The
website presents such cross-check failures rather than reporting a global optimum. Appendix R7 B Complete table and figure
derivation coverage The following register identifies each detected multi-column table region in Revision 6 by original page and
table number on that page, preserving headers and exact cell data in revision6_table_cells.json. Some tables continue across pages;
callout boxes are excluded where detected. The text and full original PDF remain the authority if extraction splits a region. For a
source-comparison or requirements table: (1) identify its source or linked assumption ID; (2) transcribe the attributed statement,
without turning a requirement into a measurement; (3) keep the source status; (4) retain the stated caveat; (5) require the
proposed evidence before closing its gate. Qualitative tables have no numeric calculation to reproduce. For computed tables:
follow the named calculation family below. Inputs with no measurement or selected hardware remain engineering estimates.
Where the current packet lacks a source-specific experimental dataset or a

calculation script, status is carried forward pending qualified review. Full preservation is not proof of correctness. The predecessor
appendix supplies 92 individual assumption records and per-table/per-figure instructions. All are retained intact. Revision 6 A-01
through A-31 must be cited as R6:A-01 etc; predecessor A001 etc retain the V5 namespace. This prevents merging two unrelated
assumption IDs. Appendix R7 B Pages 1 to 4 Decision and provenance records Transcribe each decision, class and original input;
compare to R7T01 conflict ledger. No approval or measured performance inferred. Table regions covered: R6P01T01 Mark |
Meaning; R6P01T02 Part | Sections | Purpose; R6P02T01 Part | Sections | Purpose; R6P03T01 ID | Decision | Recommendation |
Needed before; R6P04T01 ID | Decision | Recommendation | Needed before; R6P04T02 Quantity | Revision 4 | Revision 5 | Basis

[Source Rev7 PDF page 9; section classification: Assumptions, equations and calculation traceability]

Source evidence — Rev7 master page 14
screens. Experimental validity and qualified hardware acceptance remain open. Appendix R7 C F03 One-at-a-time sensitivity
Revision 6 original page 15. Calculation steps: Change only the stated input at each endpoint. Recompute cavity, tube, potting and
margin. These endpoint ranges are engineering scenarios. Sources: original figure basis, R6 Section 18 and the linked assumptions
on original pages 9-12; original verification status applies. Numeric identity is reproduced for the core geometry, Euler, heat,
energy, entry, carrier and hybrid screens. Experimental validity and qualified hardware acceptance remain open. Appendix R7 C
F04 Weighted candidate ranking Revision 6 original page 17. Calculation steps: Use original seven criteria, min-max normalization,
saturated buckling metric and the five printed weight sets. Apply hard screens. Check ties using unrounded scores. A weight is a
preference, not a source datum. Sources: original figure basis, R6 Section 18 and the linked assumptions on original pages 9-12;
original verification status applies. Numeric identity is reproduced for the core geometry, Euler, heat, energy, entry, carrier and
hybrid

screens. Experimental validity and qualified hardware acceptance remain open. Appendix R7 C F05 Thermal amplitude versus
depth Revision 6 original page 22. Calculation steps: For each depth and alpha endpoint 3.63 plus/minus .53 times 1e-8, compute
sqrt(alpha*P/pi), then exp(-z/delta) for sol and Mars year. Homogeneous half-space only. Sources: original figure basis, R6 Section
18 and the linked assumptions on original pages 9-12; original verification status applies. Numeric identity is reproduced for the
core geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity and qualified hardware acceptance
remain open. Appendix R7 C F06 Side heat loss versus geometry Revision 6 original page 24. Calculation steps: For each barrel use
2pi*.039*L*50/ln(.5/r). Ends, interfaces and transient soil are omitted. New series-shell check bounds the claimed material benefit.
Sources: original figure basis, R6 Section 18 and the linked assumptions on original pages 9-12; original verification status applies.
Numeric identity is reproduced for the core geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity
and qualified hardware acceptance remain open.

Appendix R7 C F07 Battery energy by duration Revision 6 original page 26. Calculation steps: Convert Earth days to hours;
E=1.5*h+5 Wh; divide by each specified usable Wh/kg. The 130 Wh mode table is a separate duty-cycle scenario. Sources: original
figure basis, R6 Section 18 and the linked assumptions on original pages 9-12; original verification status applies. Numeric identity
is reproduced for the core geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity and qualified
hardware acceptance remain open.

[Source Rev7 PDF page 14; section classification: Assumptions, equations and calculation traceability]

Source evidence — Rev7 master page 15
Appendix R7 C F08 UHF link margin Revision 6 original page 29. Calculation steps: Vary slant range; calculate free-space loss,
received dBW, noise spectral density, Eb/N0 and excess above 6 dB. Repeat for 1/5 W and 8/32/128 kbps. Sources: original figure
basis, R6 Section 18 and the linked assumptions on original pages 9-12; original verification status applies. Numeric identity is
reproduced for the core geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity and qualified
hardware acceptance remain open. Appendix R7 C F09 Average impact g Revision 6 original page 30. Calculation steps: For each
speed and assumed stop distance compute v^2/(2s*9.80665). DS2 mean is a comparison; design peak is separate. Sources: original
figure basis, R6 Section 18 and the linked assumptions on original pages 9-12; original verification status applies. Numeric identity
is reproduced for the core geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity and qualified
hardware acceptance remain open. Appendix R7 C F10 Entry angle versus impulse

Revision 6 original page 32. Calculation steps: Use conserved specific energy and angular momentum after tangential impulse,
evaluate radial and tangential velocity at 125 km interface. R7T05 gives explicit steps. Sources: original figure basis, R6 Section 18
and the linked assumptions on original pages 9-12; original verification status applies. Numeric identity is reproduced for the core
geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity and qualified hardware acceptance remain
open. Appendix R7 C F11 Carrier closure Revision 6 original page 33. Calculation steps: For counts 1-6 plot N*5.487671392/(1-f) at
the printed fractions; compare with 45 kg. Extra common systems are not magically included in the DS2 fraction. Sources: original
figure basis, R6 Section 18 and the linked assumptions on original pages 9-12; original verification status applies. Numeric identity
is reproduced for the core geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity and qualified
hardware acceptance remain open. Appendix R7 C F12 Hybrid structure and sectional density Revision 6 original page 20.
Calculation steps: Follow R7T03; compute structure mass for steel and hybrid and

forebody mass / frontal area. Use .7 exponent for indicative penetration ratio. Flag reduced bore at collar and unqualified joints.
Sources: original figure basis, R6 Section 18 and the linked assumptions on original pages 9-12; original verification status applies.
Numeric identity is reproduced for the core geometry, Euler, heat, energy, entry, carrier and hybrid screens. Experimental validity
and qualified hardware acceptance remain open. Appendix R7 D Sources checked for this integration N1 European Space Agency.
ExoMars rover. Mission description, accessed 26 October 2026. Two-metre drill and subsurface preservation rationale.
https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/Exploration/ExoMars/ExoMars_rover

[Source Rev7 PDF page 15; section classification: Assumptions, equations and calculation traceability]

Source evidence — Rev7 master page 21
read only as abstracts or search excerpts, as marked in Section 18. An AI reviewer can miss errors. Every added analysis here is a
screening calculation with stated assumptions, not a prediction. 2.2 What was verified Item Revision 4 value Independent result
Status Six candidate masses (35–80 mm) 5.538, 5.012, 5.494, 5.255, 5.488, 5.728 kg Identical to 3 decimals Verified 70/2.5 ledger and
split

Fore 3.520; aft 0.870; nominal 4.390; total 5.488 kg Identical Verified Cavity volume and density sensitivity 0.954 L; 1.723 / 0.954 /
0.697 L; 579 / 347 / 270 mm Identical Verified 2 kg standard and reduced budgets 2.232 / 2.790; 1.252; 0.348; 0.3085 kg; 1.561 / 1.951
kg Identical

Verified Science-only reduction on 70/2.5 0.422 L; 187 mm; 3.607 kg Identical Verified Battery table 41.0 / 185.0 / 1,085 / 3,245 Wh;
41.7 h Identical Verified Thermal skin depth and 1.5 m remnant 0.032 m; 0.828 m; 16 % 0.0320 m; 0.8281 m; 16.3 % Verified

Radial side loss, 70 mm ≈ 1.3 W 1.32 W Verified Orbit example 61.56 m/s; 12.38 kg; 273 s 61.56 m/s; 12.38 kg; 273.2 s Verified Impact
energy and average g 6,054 J; 17,601 J; 1,020 g Identical Verified Carrier arithmetic

32.93; 53.93; 12.07 kg Identical Verified Potting density from EPO-TEK 301-2 ≈ 1.09 g/cm³ 1.0905 (100/1.15 + 35/0.95 volumes)
Verified Matched-wall 2 mm budgets (50 / 60 / 70 mm) 5.49 / 5.26 / 5.14 kg 5.494 / 5.255 / 5.128 kg Minor 2.3 Findings
Thirty-four findings are recorded: seven major, twenty-two moderate and five minor. Each is addressed in the section named in
the last column. Callouts appear in the text where a finding changes how a passage should be read. ID Severity Rev 4 location
Finding Disposition in Rev 5 PR-01 Minor §5 matched wall At a common 2 mm wall the 70 mm budget is 5.128 kg; Rev 4 prints 5.14
kg. Corrected to 5.13 kg (§5.2). PR-02

Major Whole document The trade is spread over an unnumbered preface, §1 and §4–§7. Criteria, weights and screens are never
stated, so the 60–70 mm shortlist is asserted rather than derived. Findings precede the model that produces them. Restructured
into Parts A–F; explicit figures of merit, hard screens, five weight sets and a decision record (§5). PR-03 Major §10 gates, §11

requirements Identifiers PP01–PP03 are used twice with different meanings (gate "Coverage and residues" versus requirement
"Maintain barriers"). Traceability is ambiguous. Gates renamed PPG01–PPG05; crosswalk in §12 and §14. PR-04 Major §3, §8 Side
loss of the 70 mm barrel (1.3 W at k 0.039 W/m K, ΔT 50 K) is 88 % of the 1.5 W profile behind the 41.7 h runtime. Holding that ΔT
for 41.7 h costs 55 Wh of the 62.5 Wh available. k is site dependent (Phoenix more than 2×), so loss can reach 2.9 W or more. The
runtime is valid only for an unwarmed

body. Mode table, k sensitivity and insulation screen (§7); power modes (§8); D-02; R24. PR-05 Major §2, §8 Rev 4 allows months-
long recovery but sizes energy for 1.7 days. Measured doubling times are about 20 d at −10 °C and about 160 d at −20 °C [35]; 130-
day incubations were used at −15 °C [37]. The architecture cannot test delayed recovery. Timescale table (§6); duration– power
map (§8); D-02; R23.

Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 5

[Source Rev7 PDF page 21; section classification: Assumptions, equations and calculation traceability]

Source evidence — Rev7 master page 31
Figure 3. One-at-a-time sensitivity of complete budget mass, 70/2.5 case. Basis: reviewed model; ranges are engineering scenarios
(§4). The two packaging inputs that Revision 4 did not source dominate length. The next tables show them alone and together.
PEER REVIEW · MAJOR PR-31 Science bulk density of 2.0 kg/L is unsourced. The only supplement datum implies 0.36 kg/L for a
humidity sensor [13]. Rev 4's sensitivity range stopped at 1 kg/L. A package that is partly reagent vials and sample chambers could
sit anywhere from 0.5 to 2 kg/L; the study cannot say until a supplier concept exists. PEER REVIEW · MAJOR PR-32 The 0.120 L
ancillary allowance is less than half the cell volume alone. A D-size Li/SOCl2 cell is 54 cm³ and 100 g [24]; 0.450 kg of them is 4.5
cells, about 0.243 L, before the controller, heater, harness and thermal isolation. 70/2.5 case Cavity L Length mm Nominal kg
Budget kg

Length / D Baseline: 2.0 kg/L, 0.12 L 0.954 4.390 5.488 5.0 Density 1.5 kg/L 1.210 4.782 5.978 6.1 Density 1.0 kg/L 1.723

5.566 6.958 8.3 Density 0.5 kg/L 3.262 1,043 7.920 9.900 14.9 Ancillary 0.25 L 1.154 4.696 5.870

5.8 Ancillary 0.35 L 1.308 4.931 6.164 6.5 Conservative: 1.0 kg/L and 0.35 L 2.077 6.107 7.634 9.8 Same, 60/2 2.077

5.817 7.272 15.0 Same, 80/3 2.077 6.379 7.974 6.8 In the conservative case, six probes at 7.63 kg weigh 45.8 kg before any carrier
hardware, which does not fit the 45 kg scenario at all. The shortlist ordering survives (shorter bodies carry more mass), but the
absolute numbers move enough to change delivery planning. The decision D-04 is therefore a gating item, not a refinement.
Contingency alternatives PEER REVIEW · MODERATE PR-12 A flat 25 % is below the 30 % often used at concept stage under AIAA
S-120 practice [42]. Growth

allowance should be assigned per component by design maturity. The mix below is illustrative: the percentages are the reviewer's
assumptions, not values from the standard. Policy Growth kg Budget kg Effective % Flat 25 % (Revision 4) 1.098 5.488 25.0 Flat 30 %
(concept-stage example) 1.317 5.707

30.0 Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 15

[Source Rev7 PDF page 31; section classification: Assumptions, equations and calculation traceability]

Source evidence — Rev7 master page 94
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 25 Appendix D Human
peer review and reproducibility Purpose: make every stated design assumption and every displayed table or figure traceable to an
input, a source or an explicitly unsupported judgment. The compact steps below are intended to be read beside the body, not as
substitute technical approval. The numerical baseline is unchanged; this appendix documents its basis and exposes unresolved
evidence. Coverage: 92 assumption records; 16 original tables T01–T16; five displayed figures F01–F05. Register IDs are stable
within Revision 5. Narrative calculations not plotted, including heat loss, orbital transfer and the 2 kg inverse budget, also have
reproduction notes. No new chart or data table is introduced by this appendix. How to review the record 1. Start at a table or figure
ID; read its recipe in Appendix F or G. 2. Use the listed assumption IDs to find values and evidence class in Appendix E. Sources [1]–
[13] are in section 13; [14]–[16]

are listed in Appendix H. 3. Recompute with unrounded inputs. Use the included independent Python file and plot CSVs; compare
output to the frozen baseline snapshot. 4. Challenge evidence quality separately from arithmetic. A number chosen by engineering
judgment has no external sizing calculation unless one is explicitly identified. 5. Record your disposition, reason, supporting
evidence and changed inputs. Suggested dispositions are accept for screening, revise, evidence required or reject. No reviewer
signature or approval has been fabricated. Meaning of the evidence classes Literature or manufacturer reference: a quoted input
or architecture is recorded with its original context. Material analog: data describe a different article, condition or application.
User constraint: a requested assumption, not a physical finding. Engineering judgment: an explicit allowance or scenario with no
measured validation. Calculated: arithmetic conditional on those inputs. Open: the value or decision is not established. High
priority review issues

The 0.120 L standard ancillary envelope and the reduced 0.070 L envelope lack CAD closure. Battery energy and geometry are not
automatically coupled. Hardware mass reductions in the 2 kg case have no vendor BOM. Different wall schedules are not equal-
strength designs. The thermal screen is site-specific and idealized. Assay capability and minimum useful payload are unselected.
These weaknesses are retained transparently rather than hidden by correct arithmetic. The 0.3085 kg science ceiling and 5.487671
kg complete-probe estimate reproduce, but neither result establishes an integrated, useful or survivable instrument. The minimum
scientific package remains a separate science-design problem.

[Source Rev7 PDF page 94; section classification: Assumptions, equations and calculation traceability]
13. References and source provenance
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 10
Appendix R7 B Pages 5 to 7 Peer review findings Locate each PR ID, source, calculation and severity; apply the current correction
register. Review findings are assertions to test, not signed expert closure. Table regions covered: R6P05T01 Item | Revision 4 value
| Independent result | Status; R6P05T02 ID | Severity | Rev 4 location | Finding | Disposition in Rev 5; R6P06T01 ID | Severity |
Rev 4 location | Finding | Disposition in Rev 5; R6P07T01 ID | Severity | Rev 4 location | Finding | Disposition in Rev 5 Appendix
R7 B Pages 8 to 11 Heritage figures of merit and assumptions Read each source value or E/U/X class. Use geometric mass, power,
thermal, orbital or link family below only for explicitly derived cells. Preserve source status and sensitivity. Table regions covered:
R6P08T01 Objective (proposed) | Measurement that would show it | Hardware implied | Requirement IDs; R6P08T02 Design |
Geometry | Mass | Impact or depth | Notes and source; R6P09T01 Design | Geometry | Mass | Impact or depth | Notes and source;
R6P09T02 ID | Figure of merit | Direction | Why it matters and how it is computed here; R6P09T03 ID | Assumptoi n and value |
Clas s | Justfi ication and source | If wrong |

Retrie by; R6P10T01 ID | Assumptoi n and value | Clas s | Justfi ication and source | If wrong | Retrie by; R6P10T02 ID | Assumptoi
n and value | Clas s | Justfi ication and source | If wrong | Retrie by; R6P10T03 ID | Assumptoi n and value | Clas s | Justfi ication
and source | If wrong | Retrie by; R6P11T01 ID | Assumptoi n and value | Clas s | Justfi ication and source | If wrong | Retrie by;
R6P11T02 ID | Assumptoi n and value | Clas s | Justfi ication and source | If wrong | Retrie by; R6P11T03 ID | Assumptoi n and
value | Clas s | Justfi ication and source | If wrong | Retrie by Appendix R7 B Pages 12 to 13 Geometry ledger and structural
candidates Convert mm to m; V=(m/rho+Va)/(1-fp-fr); L=V/A_bore; sum annular barrel, hemisphere, cap, joints and potting plus all
hardware. Sum locations then margin. Euler=pi^2 E I/(L+r)^2; divide by m_fore*v^2/(2s), and by 3 times that load.
Heat=2pi*k*L*DeltaT/ln(rfar/r). Table regions covered: R6P12T01 ID | Assumptoi n and value | Clas s | Justfi ication and source | If
wrong | Retrie by; R6P12T02 Hardware | Locatoi n | Nominal kg | Class | Basis; R6P13T01 Hardware | Locatoi n | Nominal kg |
Class | Basis; R6P13T02 Candidate | Bore mm | Length mm | L/D | Nominal kg | Budget kg | Fore kg | m/A kg/m² |

Side loss W | Euler mar Appendix R7 B Pages 14 to 16 Sensitivity and ranking Recompute one input at a time; retain all other
inputs. For ranking normalize the seven metrics across the original six candidates, apply the printed weights and saturation, and
enforce the stated hard screens. Weights and stowage limits are judgment. Ranking does not establish actual penetration or
feasibility. Table regions covered: R6P15T01 70/2.5 case | Cavity L | Length mm | Nominal kg | Budget kg | Length / D; R6P15T02
Policy | Growth kg | Budget kg | Effectvi e %; R6P16T01 Policy | Growth kg | Budget kg | Effectvi e %; R6P16T02 Screen | Rule |
Basis | Result; R6P16T03 Criterion weight | Balanced | Mass-driven | Structure and penetration | Packaging and science | Equal
weights; R6P16T04 Candidate | Balanced | Mass-driven | Structure and penetration | Packaging and science | Equal weights |
Rank

[Source Rev7 PDF page 10; section classification: References and source provenance]

Source evidence — Rev7 master page 13
Table regions covered: R6P38T01 ID | Proposed requirement | Verification; R6P39T01 ID | Proposed requirement | Verification;
R6P39T02 ID | Study constraint or boundary; R6P39T03 Risk | Issue | Closure evidence | Reviewer note | Gate; R6P40T01 Risk |
Issue | Closure evidence | Reviewer note | Gate; R6P41T01 Risk | Issue | Closure evidence | Reviewer note | Gate; R6P41T02 Step
| Action | Output | Unlocks Appendix R7 B Pages 42 to 50 Bibliography and source verification Retain full citation, URL, source
role and verification status. Locally available IMPRESS paper, supplement and expert text are now inspected; other source statuses
remain as carried unless N1-N8 explicitly update them. Table regions covered: R6P42T01 # | Citatoi n | Used for | Status | What
was confirmed, and link; R6P43T01 # | Citatoi n | Used for | Status | What was confirmed, and link; R6P44T01 # | Citatoi n | Used
for | Status | What was confirmed, and link; R6P44T02 # | Citatoi n | Used for | Status | What was confirmed, and link; R6P44T03
# | Citatoi n | Used for | Status | What was confirmed, and link; R6P45T01 # | Citatoi n | Used for | Status | What was confirmed,
and link; R6P45T02 # | Citatoi n | Used for | Status | What was confirmed, and link; R6P46T01 # | Citatoi n | Used for | Status |
What was confirmed, and link; R6P47T01 # | Citatoi n | Used for | Status | What was

confirmed, and link; R6P47T02 # | Citatoi n | Used for | Status | What was confirmed, and link; R6P48T01 # | Citatoi n | Used for |
Status | What was confirmed, and link; R6P48T02 # | Citatoi n | Used for | Status | What was confirmed, and link; R6P49T01 # |
Citatoi n | Used for | Status | What was confirmed, and link; R6P49T02 # | Citatoi n | Used for | Status | What was confirmed, and
link; R6P50T01 # | Citatoi n | Used for | Status | What was confirmed, and link; R6P50T02 Source | Why a human reviewer should
obtain it; R6P50T03 Claim in this report | Value | Class | Source and status Appendix R7 B Pages 51 to 53 Reproduction website and
change record Use preserved input vector and source identities. Reproduce calculations from exact units. This integration updates
the website; the original note that code was not audited remains historical. No hidden design approval. Table regions covered:
R6P51T01 Claim in this report | Value | Class | Source and status; R6P51T02 Parameter | Value | Provenance; R6P53T01 Revision 4
assumptoi n or content | Revision 4 reassessment | Revision 5–6 disposition

Appendix R7 C F01 Envelope comparison Revision 6 original page 14. Calculation steps: Compute cavity and barrel by geometry
family; add nose radius, 5 mm cap and 20 mm interface. Plot equal-scale outlines; heritage envelopes are reference drawings, not
measured FREYA flight hardware. Sources: original figure basis, R6 Section 18 and the linked assumptions on original pages 9-12;
original verification status applies. Numeric identity is reproduced for the core geometry, Euler, heat, energy, entry, carrier and
hybrid screens. Experimental validity and qualified hardware acceptance remain open. Appendix R7 C F02 Probe budget mass
Revision 6 original page 14. Calculation steps: Sum all ledger rows for each scheduled wall; multiply nominal by 1.25; plot kg
without treating error-free arithmetic as uncertainty-free mass. Sources: original figure basis, R6 Section 18 and the linked
assumptions on original pages 9-12; original verification status applies. Numeric identity is reproduced for the core geometry,
Euler, heat, energy, entry, carrier and hybrid

[Source Rev7 PDF page 13; section classification: References and source provenance]

Source evidence — Rev7 master page 18
Part Sections Purpose F 18 References and provenance • Appendices A–C Every source with its verification status; model inputs;
change record. What is new in Revision 6 Revision 6 is a consolidated release. It does not overturn Revision 5; it packages the full
peer-review cycle into one coherent, navigable document and adds the structural-architecture trade requested after Revision 5. •
Consolidated the Revision 5 peer review, the expanded assumptions and sources, the restructured trade study and the mission-
planning material into a single release, with the revision labels reconciled.

• Added the forebody structural-architecture trade, steel head with composite body versus unibody steel (Section 5.9), with
decision D-09, requirement MECH06, risk R35 and references [49]–[54]. • Reframed every dimension, mass, allowance, the forebody
and aftbody split and the structural architecture as explicit trade variables; the 70 mm / 2.5 mm ledger is labelled a worked
example, not a baseline. • Added this table of contents and a Revision 5–6 line in the change record (Appendix C). • Unchanged: all
verified calculations, findings and sources from Revision 5 carry forward intact. Contents Part A — Decision summary and peer
review 1 Executive summary...........................................................................................................................................................................................3

2 Peer review........................................................................................................................................................................................................4 Part B —
Basis, assumptions and data justification 3 Mission context and study
basis.....................................................................................................................................................................8 4 Assumptions and data
justification................................................................................................................................................................9 Part C — Trade study 5 Trade
study......................................................................................................................................................................................................12 5.9 Structural-
architecture option: steel head with composite body.........................................................................................................19 Part D — Feasibility
screens by subsystem 6 Science and sampling
strategy......................................................................................................................................................................22 7 Thermal environment and
biological operating modes............................................................................................................................24 8 Power, heating and energy
closure..............................................................................................................................................................26 9 Communications and
relay............................................................................................................................................................................27 10 Structure, impact and
penetration.............................................................................................................................................................29

11 Entry, descent and delivery.........................................................................................................................................................................31 12
Planetary protection and contamination control.....................................................................................................................................33 Part E —
Mission planning, requirements and risks 13 Mission planning
implications....................................................................................................................................................................35 14 Requirements and
constraints....................................................................................................................................................................38 15 Risk register and closure
plan.....................................................................................................................................................................39 16 Recommended next
steps...........................................................................................................................................................................41 17 Open questions for the
requester..............................................................................................................................................................42 Part F — Sources, reproducibility
and change record 18 References and
provenance........................................................................................................................................................................42 Appendix A Model inputs
and reproducibility...............................................................................................................................................51 Appendix B Website
specification and artifact inventory............................................................................................................................52 Appendix C Change
record...............................................................................................................................................................................53

Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 2

[Source Rev7 PDF page 18; section classification: References and source provenance]
Source evidence — Rev7 master page 23
ID Severity Rev 4 location Finding Disposition in Rev 5 PR-20 Moderat e §10, [10], [11] Framework incomplete: Category
IVa/IVb/IVc, Special Region thresholds and NPR 8715.24 (listed expiry 24 Sep 2026, status to verify) are not stated. [11] resolves to
NASA-HDBK-20240016475. A warmed assay may itself raise Special Region questions.

§12; PP04; R27. PR-21 Moderat e §2, [1][5][13] [1], [5] and [13] share a lead author group; [5] is a preprint on the author's site and
contests a consensus (perchlorate chemistry explains Viking GC-MS and LR results [39][40]). Independent evidence-standard
sources were absent. [38]–[41] added; [5] reclassified; D- 08. PR-22 Moderat

e §2, [6], [12] [12] is a link to a private library and [6] returned no content. The change from 1.5 m to shallow-skin sampling rests on
[12], which this review could not read. Reviewer identity unknown. Marked X (§18); request text and name (§17). PR-23 Minor [3]
Journal title is "Journal of Geophysical Research: Planets". Corrected. PR-24

Moderat e §4 No comparison with flown or studied penetrators. 5.49 kg is 2.3× DS2 (2.4 kg) and about 2.7× the IMPRESS reference
(about 2 kg); 1 kg science is 3.2× the 0.31 kg the IMPRESS cavity supports. Aftbody 0.87 kg versus 5.6 kg in a 2005 study (scope
unverified). Heritage table (§3.2); R32. PR-25 Minor Fig. 3 Legend overlapped the bars. All figures regenerated.

PR-26 Minor App. B The website and its source could not be audited. The equations were re- implemented independently and agree
with the report. Noted; publish code and tests with the report. PR-27 Moderat e §5, [8] EPO-TEK 301-2 is only a density analog;
fitness as cryogenic shock potting is unestablished. Workmanship and outgassing standards (NASA-STD-8739.1,

ASTM E595) are not referenced. A-09; recommended reading (§18). PR-28 Moderat e Whole document No schedule or readiness
view. The December 2028 transfer window is about 26 months away. §13 gates and options. PR-29 Moderat e

§11 No traceability from objective to measurement to requirement. §3.1 table. PR-30 Minor Reduced case Cavity 345 cm³
(published) versus 364 cm³ geometric (47 mm bore × 210 mm). Chassis 0.617 → 0.557 kg is solely joints 0.120 → 0.060 kg. Neither is
stated. §5.6 clarified. PR-31 Major §4

Science bulk density 2.0 kg/L is unsourced and optimistic: the only supplement datum (humidity sensor, 45 g in 124 cm³) is 0.36
kg/L, and the 1–3 kg/L sensitivity range excludes it. At 0.5 kg/L the 70 mm envelope is about 1.04 m and budget 9.9 kg. §5.4; A-02;
D-04; R04. PR-32 Major §4 The 0.120 L ancillary volume is under half the volume of the cells alone: 0.450 kg of D-size Li/SOCl2 (100
g, 54 cm³ each) is 4.5 cells, about 0.243 L, before controller, heater and harness. At 0.35 L the 70/2.5 grows from 347 to 454 mm
(+0.68 kg). §5.4; A-03.

PR-33 Moderat e §8 Power ledger omits radio listening (receive class about 0.4 W, 16.7 Wh over 41.7 h if always on; secondary
source), transmit (0.2–1.1 Wh per 6 min pass) and heater power for a −30 °C-rated radio. §8, §9; PWR02. PR-34 Moderat e §9
Delivery is assumed from a circular orbit. NASA's December 2028 SR-1

Freedom has not decided between flyby and orbit after delivering SkyFall [43]. A flyby carrier implies direct entry: higher speed,
heavier thermal protection. §13; D-05; R34. Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills,
26 October 2026 Page 7

[Source Rev7 PDF page 23; section classification: References and source provenance]

Source evidence — Rev7 master page 25
Design Geometry Mass Impact or depth Notes and source FREYA 70/2.5 (this study) 70 mm OD, 2.5 mm wall, 347 mm Forebody
3.520 kg; aftbody 0.870 kg; nominal 4.390; budget 5.488 kg 100 m/s reference; 0.5 m

stopping distance (illustration) Sectional density 915 kg/m² versus DS2 696 and ESA study 1,600. Three observations follow.
FREYA's 5.49 kg budget is 2.3 times the DS2 probe and about 2.7 times the IMPRESS target. Its 3.52 kg forebody exceeds the roughly
2 kg lower bound that is reported for the Young/Sandia mass-scaling validity [22], whereas DS2 and the IMPRESS reference are
below it. Its 0.870 kg aftbody is about one sixth of the 5.6 kg aftbody in the 2005 study, whose scope may include descent hardware;
this is why R19 and R32 stay open. 3.3 Figures of merit for the trade ID Figure of merit Direction Why it matters and how it is
computed here FOM-

Complete probe budget mass, kg Lower Drives entry mass, carrier closure and cost. Computed from the ledger with 25 %
contingency (§5.2). FOM- Euler buckling margin at 3× average axial load Higher, saturating at Slender bodies fail by column
buckling. Pin-ended Euler load of the barrel plus nose over the average impact force (§5.3). Margin below 1 fails. FOM- Sectional
density m/A, kg/m²

Higher First-order discriminator for penetration in Young/Sandia scaling [22]. Forebody mass over frontal area. FOM- Bore
diameter, mm Higher Instrument cross-section and connector access. Package CAD is not available, so this is a proxy. FOM-
Forebody envelope length, mm Lower Stowage in the entry stack, handling and tether geometry. FOM-
Barrel side heat loss, W Lower Conductive-limit loss to the soil at ΔT = 50 K (§7). Proxy for thermal-isolation burden. FOM- Distance
from the 50 mm reference, mm Lower Development risk. Published geometry is 50 mm [1]; the only flown design is 35 mm [20].
Not scored because no defensible model exists: cost, schedule, readiness level, survival probability and science performance.
Section 13 treats schedule separately. 4 Assumptions and data justification

ADDED Revision 4 separated literature values, user assumptions and engineering estimates in a closing paragraph. This section
lists every assumption, its evidence class, the justification and source, what happens if it is wrong, and when it can be retired, so
that a human reviewer can challenge each one in turn. Numbers in the "if wrong" column were computed with the reviewed
model. 4.1 Science and packaging ID Assumption and value Clas s Justification and source If wrong Retire by A-01

Science mass 1.000 kg U Customer direction. No instrument suite exists. The supplement lists individual instruments of tens of
grams (humidity sensor 45 g) [13], not an integrated life-detection suite. ±0.5 kg moves the 70/2.5 budget by ±1.36 kg and length by
±116 mm. G0 Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 9

[Source Rev7 PDF page 25; section classification: References and source provenance]

Source evidence — Rev7 master page 58
17 Open questions for the requester • Who wrote the expert addendum [12], and can you attach its text? The shallow-sampling
change rests on it and this review could not read it. • Is the target a life-detection mission or a pathfinder (D-01)? The answer
changes the planetary-protection category, the payload and the schedule. • Which question should the 1 kg package answer:
prompt chemistry, a short warmed assay, or delayed recovery (D- 02)? Only the first two fit the current energy ledger. • Which
carrier and window are in view? The December 2028 and early 2031 options lead to different delivery modes and schedules.

• Is the IMPRESS full text available to share? Its geometry (50 mm, 1.5 mm, 210 mm, 345 cm³, about 2 kg) is carried from Revision 4
and was not re-verified here. • Is the mission NASA-hosted or commercial? The route to planetary-protection compliance depends
on the answer. • May the website's model source and tests be shared? Publishing them would let a reviewer confirm that the site
and the report agree. PART F SOURCES, REPRODUCIBILITY AND CHANGE RECORD 18 References and provenance Access date for
web sources: 26 October 2026. Status key. Verified: the cited facts were found in the source or its abstract. Partial: the source exists
but only part was read, or a specific value could not be confirmed. Secondary: reported by a source other than the originator. Not
re-opened: carried from Revision 4 without re-reading. Not verified: could not be reached or

resolved. Reference numbers [1]–[13] are unchanged from Revision 4; [14]–[48] are new. 18.1 Sources carried from Revision 4 #
Citation Used for Status What was confirmed, and link [1] Spacek, J.; Alpern, H.; Dineen, T.; Petkowski, J. J.; Rizzo, G.; Benner, S. A.;
Lui, M.; Cockell, C.; Eubanks, M.; Schulze-Makuch, D.; Temby, C.; Richburg, M. (2026). IMPRESS: A Planetary Penetrator Network for
Astrobiology, Prospecting, and Exploration of Mars. Astrobiology 26(9), 688–699. DOI 10.1177/15311074261471218.

Architecture; 0.2–1 m emplacement; 50 mm reference geometry Partial Abstract and landing page confirmed (first published 23 Jul
2026; instruments emplaced 0.2– 1 m; swarms of penetrators as network nodes). Full text restricted; geometry (50 mm, 1.5 mm, 210
mm, 345 cm³, ≈2 kg) carried from Rev 4. https://doi.org/10.1177/1531107

[2] Spohn, T.; Müller, N.; Knollenberg, J.; Grott, M.; Golombek, M. P.; Plesa, A.-C.; Bickel, V. T.; Morgan, P.; Krause, C.; Breuer, D.;
Smrekar, S.; Banerdt, W. B. (2024). Mars Soil Temperature and Thermal Properties From InSight HP3 Data. Geophys. Res. Lett.
51(18), e2024GL108600. DOI 10.1029/2024GL108600. Soil temperature; diffusivity; shallow thermal wave Verified Abstract: 217.5 K
average at 10– 20 cm; 5.3–6.7 K diurnal, 13.3 K seasonal; diffusivity (3.93 ± 0.39)×10⁻⁸ (upper 10 cm) and

(3.63 ± 0.53)×10⁻⁸ m²/s (40 cm); brine deliquescence possible. https://boris-portal.unibe.ch/enti ties/publication/30148514-4356- 4636-
8e3b-c5b64ee3e809 Preliminary. No hardware configuration is flight qualified. Prepared for Robert J Mills, 26 October 2026 Page
42

[Source Rev7 PDF page 58; section classification: References and source provenance]

Source evidence — Rev7 master page 60
# Citation Used for Status What was confirmed, and link [11] NASA Planetary Protection Handbook, NASA-HDBK-20240016475
(NTRS 20240016475). Guidance Partial Resolved: effective 24 Jan 2025, companion to NPR 8715.24 and NASA-STD-8719.27, replaces

NASA-HDBK-6022 (NASA OPP). Full text not opened. https://ntrs.nasa.gov/citations/20 [12] User-supplied FREYA expert review, 26
Oct 2026 (FREYA_Expert_Review_Addendum_2026-10-26.txt). Basis of the sampling-depth change Not verified A private library
link; not accessible. Reviewer identity unknown (PR-22). [13]

Spacek, J., and coauthors (2026). Supplementary Information for IMPRESS, Tables S1–S3. Instrument sizes; DS2 entry Not re-
opened Not re-opened. Version identity with the publisher file is not asserted. https://impressmars.com/files/pr eprints/impress-
preprint- supplementary-tables-s1-s2-s3- 2026-07-09.pdf 18.2 Sources added in Revision 5
Thermal and environment # Citation Used for Status What was confirmed, and link [14] Grott, M.; Spohn, T.; Knollenberg, J.; et al.
(2021). Thermal conductivity of the martian soil at the InSight landing site from HP3 active heating experiments. J. Geophys. Res.
Planets 126(7), e2021JE006861. Soil conductivity; porosity Verified

0.039 ± 0.002 W/m K over 0.03– 0.37 m; about 60 % porosity; fine sand; more than twice as conductive at Phoenix.
https://elib.dlr.de/141828 [15] Grott, M., et al. (2023). Seasonal variations of soil thermal conductivity at the InSight landing site.
Geophys. Res. Lett. 50(7), e2023GL102975. Pressure dependence of k Verified k correlates strongly with atmospheric pressure over
0.03–

0.37 m. https://researchportal.ip- paris.fr/en/publications/seasonal- variations-of-soil-thermal- conductivity-at-the-insight-l/ [16]
NASA NSSDC. Mars Fact Sheet. μ, radius, density, gravity Verified GM 0.042828×10⁶ km³/s²; mean radius 3,389.5 km; surface
pressure 6.36 mb mean; density ≈ 0.016 ± 0.006 kg/m³. https://nssdc.gsfc.nasa.gov/planet

ary/factsheet/marsfact.html Heritage penetrators and impact # Citation Used for Status What was confirmed, and link [17] JPL
Special Review Board (22 Mar 2000). Report on the Loss of Mars Polar Lander and Deep Space 2 Missions, JPL D-18709. DS2 failure
modes Partial Excerpts: plausible modes include

impact electronic or battery failure, ionization breakdown, UHF link failure, probes landing on their sides. No single most probable
cause. https://www.cs.washington.edu/h omes/leveson/accidents/mpl_rep ort_1.pdf Preliminary. No hardware configuration is
flight qualified. Prepared for Robert J Mills, 26 October 2026 Page 44

[Source Rev7 PDF page 60; section classification: References and source provenance]

Source evidence — Rev7 master page 89
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 20 13 References and
provenance [1] Spacek, J.; Alpern, H.; Dineen, T.; Petkowski, J. J.; Rizzo, G.; Benner, S. A.; Lui, M.; Cockell, C.; Eubanks, M.; Schulze-
Makuch, D.; Temby, C.; Richburg, M. (2026). IMPRESS: A Planetary Penetrator Network for Astrobiology, Prospecting, and
Exploration of Mars. Astrobiology 26(9), 688–699. DOI 10.1177/15311074261471218. Attached published paper inspected.
https://doi.org/10.1177/15311074261471218 [2] Spohn, T.; Müller, N.; Knollenberg, J.; Grott, M.; Golombek, M. P.; Plesa, A.-C.; Bickel,
V. T.; Morgan, P.; Krause, C.; Breuer, D.; Smrekar, S.; Banerdt, W. B. (2024). Mars Soil Temperature and Thermal Properties From
InSight HP3 Data. Geophysical Research Letters 51(18), e2024GL108600. DOI 10.1029/2024GL108600. Published paper and DLR
record inspected. https://elib.dlr.de/210686/ [3] Clifford, S. M.; Lasue, J.; Heggy, E.; Boisson, J.; McGovern, P.; Max, M. D. (2010). Depth
of the Martian cryosphere: Revised estimates and implications for the existence and detection of subpermafrost groundwater.
Journal of Geophysical Research

115, E07001. DOI 10.1029/2009JE003462. Publisher article inspected. https://doi.org/10.1029/2009JE003462 [4] Stroud, R. H., et al.;
Exotech Systems, Inc. (April 1972). Contamination Control by Use of Ethylene Oxide: Technology Summary, Task 12. NASA-
CR-126034; TR72-11; contract NASw-2062. NASA NTRS 19720013398. Historical report inspected; it is not a current approved FREYA
process. https://ntrs.nasa.gov/api/citations/19720013398/downloads/19720013398.pdf [5] Spacek, J.; Abraham, C. A.; Benner, S. A. (15
September 2026). The case for extant life on Mars: A Technical Reanalysis of the Viking Carbon Assimilation–Pyrolytic Release
Experiment. The Primordial Scoop. Page identifies manuscript as a preprint submitted to Astrobiology. Interpretation remains
contested, not a confirmed life detection. https://primordialscoop.org/2026/09/15/capyr/ [6] NASA TechPort project 184149.
Reviewer-supplied project record. Retrieved page required JavaScript and supplied no project details; no maturity or performance
claim is based on this record. https://techport.nasa.gov/projects/184149

[Source Rev7 PDF page 89; section classification: References and source provenance]

Source evidence — Rev7 master page 90
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 21 13 References and
provenance continued [7] Sandvik Osprey. Osprey 4340 and Osprey 434 low-alloy steel datasheet, updated 14 September 2023.
Wrought density 7.85 g/cm3 and conductivity 44.5 W/m K used for screening. Powder data and room-temperature strength are not
qualification of a machined cold-impact chassis. https://www.metalpowder.sandvik/en/products/metal-powder-alloys/low-alloy-
steel/osprey-4340/?html-to-pdf=true [8] Epoxy Technology Inc., Meridian Adhesives Group (February 2021). EPO-TEK 301-2
Technical Data Sheet, Rev XVIII. Component specific gravities 1.15 and 0.95; 100:35 mass ratio. These imply about 1.09 g/cm3 before
cure if volumes add. Model rounds to 1.10 g/cm3. Resin selection, cured density, shrinkage, assay compatibility and cryogenic
impact response remain open.
https://products.meridianadhesives.com/storage/downloads/uennuicaaxt1bodtipkbpydtg0u8qs33/301-2.pdf [9] GomSpace.
NanoCom AX100 product page, accessed 26 October 2026. Bare transceiver 24.5 g, 65 by 40 by 6.5 mm;
operating range -30 to +85 C. Supports only a mass analogy; the 100 g FREYA packaged allocation is an engineering estimate.
Hardware is not selected or qualified for penetrator shock. https://gomspace.com/product/nanocom-ax100/ [10] NASA (30 August
2022). NASA-STD-8719.27, Implementing Planetary Protection Requirements for Space Flight. Active baseline, change 0, as shown
by NASA standards page accessed 26 October 2026. Mission authority determines applicable requirements and classification.
https://standards.nasa.gov/standard/NASA/NASA-STD-871927 [11] NASA Planetary Protection Handbook, NTRS 20240016475.
Inherited Revision 4 reference. Retrieval returned access error in this reassessment; detailed requirements were not inferred from
unread text. https://ntrs.nasa.gov/citations/20240016475 [12] User-supplied FREYA expert review recorded 26 October 2026 in
FREYA_Expert_Review_Addendum_2026-10-26.txt. Reviewer identity not explicitly supplied. Corrections, proposals and missing
evidence are separated in this reassessment. https://chatgpt.com/library?
file_id=libfile_e9082a2bf0f08191bc9dac61d937194b&account_id=personal

[13] Spacek, J., and coauthors (2026). Supplementary Information for IMPRESS: A Planetary Penetrator Network for Astrobiology,
Prospecting, and Exploration of Mars. Tables S1–S3, 15 pages. DOI 10.1177/15311074261471218. Publisher supplement inspected
through indexed PDF. Saved PDF is the freely available author-hosted supplementary tables revised 9 July 2026; byte identity with
publisher file is not asserted. Author copy: https://impressmars.com/files/preprints/impress- preprint-supplementary-tables-s1-s2-
s3-2026-07-09.pdf https://journals.sagepub.com/doi/suppl/10.1177/15311074261471218/suppl_file/sj-pdf-1-
asb-10.1177_15311074261471218.pdf Material densities and the radio bare-board mass are sourced analogs. Subsystem allocations,
payload density, potting fraction, wall schedule, usable battery specific energy, cable linear mass and contingency are engineering
assumptions. This separation is preserved in the downloadable data and website. Access date for web sources: 26 October 2026.

[Source Rev7 PDF page 90; section classification: References and source provenance]

Source evidence — Rev7 master page 96
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 27 A006 Reserved
volume fraction 1. Input: 0.10 of total cavity (Engineering judgment). 2. Basis: No tolerance stack; model freeFraction 3. Logic:
Reserve unfilled integration and clearance volume separately from potting. 4. Review: Allocate thermal insulation, connectors and
tolerances explicitly. A007 Cavity algebra 1. Input: 0.953846 L standard (Calculated). 2. Basis: Previous six entries; design function
3. Logic: Solve V(1 - 0.25 - 0.10) = 0.500 + 0.120; obtain V = 0.620/0.650. 4. Review: Reject fractions summing to 1 or more; no nose-
volume credit. A008 Science payload boundary

1. Input: Platform controller and radio excluded from 1 kg (Accounting convention). 2. Basis: Current study ledger; user mass
instruction 3. Logic: Count experiment-only equipment inside science; count shared functions once elsewhere. 4. Review: Vendor
scope must distinguish instrument support from platform support. Geometry A009 Reference architecture 1. Input: Buried
forebody plus tether plus surface aftbody (Literature reference). 2. Basis: [1] sections 3 and 4 and figures 3–4 3. Logic: Use the
published division as the starting interface architecture; separate mass locations. 4. Review: This is architecture heritage, not
proven FREYA deployment. A010 Reference dimensions 1. Input: 50 mm outside; 1.5 mm wall; 210 mm cylinder (Literature
reference). 2. Basis: [1] section 3.1, printed page 691

3. Logic: Transcribe dimensions; convert millimeters to meters for mass formulas. 4. Review: The 210 mm value is cylinder length,
not total envelope. A011 Reference cavity and mass 1. Input: 345 cm3 practical cavity; about 2 kg Mars-ready total (Literature
reference). 2. Basis: [1] section 3.1 and section 4.1, printed pages 691 and 693 3. Logic: Use 0.345 L for the inverse case; distinguish
planned Mars-ready assembly from test article. 4. Review: Do not infer that published total includes the present science suite or
contingency.

[Source Rev7 PDF page 96; section classification: References and source provenance]

Source evidence — Rev7 master page 115
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 46 Appendix G Figure
construction and calculation trails F01 Thermal amplitude versus depth Inputs: A056, A057, A058, A059, A060 Sources: [2]
diffusivity and method; [14] periods; depth grid and plotting limits are author choices. 1. Generate z=0,.01,…,1.50 m. 2. Use
α=3.63e-8 and periods 88775 and 59355072 s; compute δ=sqrt(αP/π). 3. For each depth compute exp(-z/δ) separately for daily and
seasonal forcing. 4. Retain raw daily values in CSV; only plot max(raw,1e-12). Use a logarithmic y axis between 1e-5 and 1. 5. Plot
fractions, not temperatures or biological activity. Reproduction check: δdaily≈.032027 m; δseasonal≈.828147 m; at 1.5 m seasonal
fraction≈.16345. Use exact CSV values rather than these rounded checks.

Review limit: No amplitude, phase, layer, ice or uncertainty propagation. Below-axis daily values are not physical zero. Exact data
file: F01_thermal_plot.csv F02 Forebody envelope versus diameter and wall Inputs: A012, A007, A014, A019, A010 Sources: T04
model; [1] 210 mm reference cylinder. 1. Compute six equal-cavity geometries exactly as T04. 2. Use lengthMm from the model as
bar heights in schedule order. 3. Overlay the 210 mm reference line, explicitly labeled cylinder length. 4. Label the x axis with
diameter/wall and state cavity volume. Reproduction check: Bars in mm: 1228.510,599.785,623.948,442.269,347.450,286.781. Review
limit: Reference line is cylinder length; bars include nose, cap and integration allowance. It is context, not a like-for- like total-
envelope comparison. Exact data file: F02_F03_geometry_mass_plot.csv

F03 Complete probe mass with contingency Inputs: A043, A042, A012 Sources: T04 and T06 computational inputs; density analogs
[7], [8]. 1. Use the same six geometries and all standard hardware allowances. 2. For every candidate compute nominal hardware
sum and margin=.25×nominal. 3. Draw nominal mass as first bar segment and contingency stacked above. 4. Total bar height
equals budget mass; do not add contingency again to the data. Reproduction check: 70/2.5
height=4.390137114+1.097534278=5.487671392 kg. Review limit: Scheduled walls vary. Shown mass margins are not confidence
intervals or installed hardware. Exact data file: F02_F03_geometry_mass_plot.csv

[Source Rev7 PDF page 115; section classification: References and source provenance]

Source evidence — Rev7 master page 117
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 48 Appendix H Source
acquisition and evidence limits Sources [1]–[13] retain their complete citations in section 13. Source locators in Appendix E specify
the relevant section, table, page or manufacturer heading when verified. A URL alone is not proof that a study assumption is
supported. The following source roles make that distinction explicit. [1] Attached published IMPRESS paper; section 3.1 supplies
reference geometry and cavity. Section 4.1 supplies approximate Mars- ready mass. Proposed development is not a completed
qualification record. [2] Published InSight thermal paper and DLR record inspected in the prior analysis. Seasonal diffusivity,
conductivity context and conduction method are used as a site analog; original measurement uncertainties are not silently treated
as FREYA margins. [3] Publisher article section 2.2 provides broad mean-temperature context. It does not supply a selected FREYA
site profile. [4] Historical NASA ethylene oxide report inspected previously. It supports process discussion and limitations, not an
approved modern FREYA procedure.

[5] Author-hosted CAPyR reanalysis page identifies a submitted preprint. Its interpretation is not a confirmed life detection or an
instrument mass specification. [6] TechPort project link retained. Its details were not sufficiently retrieved for engineering
validation in the original study; no numerical model input is justified by it. [7] Manufacturer steel data supply density and a
conductivity analog. No cold-impact safety factor or final heat treatment has been derived from that page. [8] Manufacturer resin
component data supply the mixture-density analogy. The rounded mixed density is calculated; cured density and suitability are
not measured. [9] Manufacturer bare-radio specifications support an integration scale only. They do not validate the 100 g or 50 g
packaged allocations. [10] NASA standard provides a requirements framework. Mission-specific endpoints and compliance
approvals were not supplied. [11] Inherited handbook citation had an access error. It remains an unverified reference and is not
used to validate a numerical assumption.

[12] User-supplied expert review and subsequent user instructions are requirements context. The reviewer identity and a specific
long-frozen-bacteria revival paper were not provided. [13] Publisher supplement was read through indexed PDF retrieval. Saved
bytes are the author-hosted July 9 copy. The review packet records both links; exact publisher/author byte identity is not
established. Additional references for constant verification [14] NASA NSSDC. Mars Fact Sheet. Bulk parameters and orbital
parameters; accessed 26 October 2026. Mean radius 3389.5 km, day 24.6597 h and sidereal year 686.980 Earth days.
https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html?level=1 [15] NASA JPL Solar System Dynamics. Astrodynamic
Parameters. DE440 planetary-mass table; accessed 26 October 2026. Mars- system GM is 42828.375816 km3/s2. This cross-check
does not provide exact provenance for the older rounded Mars-only constant. https://ssd.jpl.nasa.gov/astro_par.html [16] NIST.
Guide to the SI, Special Publication 811, Appendix B.9, Acceleration. Standard free-fall acceleration conversion is 9.80665 m/s2;
accessed 26 October 2026.

https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9

[Source Rev7 PDF page 117; section classification: References and source provenance]

Source evidence — Rev7 master page 129
FREYA | Preliminary concept screening | October 2026 Figure 1. Simulated nonlifting capsule flight before the six sequential
separations. Release occurs at 8 km local AGL. 4. Reference solution: capsule entry and entry shield A 1.10 m shield has reference
area 0.950 m2 and ballistic coefficient 31.6 kg/m2 for the intact capsule. It reaches 8 km at t=252.2 s at 155.6 m/s. The predicted peak
aerodynamic deceleration before the first release is 5.03 Earth g; peak dynamic pressure is 1558 Pa; stagnation heat flux proxy is
14.2 W/cm2; and integrated stagnation load proxy is 958 J/cm2. The peak heating occurs near 52 km AGL. Figure 2. Parametric
shield size study. The 1.10 m reference keeps nominal heating below an illustrative 15 W/cm2 study cap without carrying a larger
shell; the cap is not a flight qualification criterion. Shield D (m) Beta (kg/m2) V at 8 km (m/s) Peak heat (W/cm2)

0.85 52.9 219.2 21.1 1.00 38.2 174.1 16.5
[Source Rev7 PDF page 129; section classification: References and source provenance]




Historical source visual from original Rev7 PDF page 129, image ID 662




Historical source visual from original Rev7 PDF page 129, image ID 664

Source evidence — Rev7 master page 155
FREYA • Concept feasibility screening • Not flight qualified [7] Gertsch et al. 2006 frozen regolith testing.
https://scholarsmine.mst.edu/geosci_geo_peteng_facwork/252/ [8] NASA parachute qualification.
https://ntrs.nasa.gov/citations/20150011941 Provenance note: Numerical baseline is generated by Python SciPy solve_ivp (RK45),
with tolerance 1e-7 and time step <=0.4 s entry / <=0.2 s probe. Illustrative resistance values and 150 m/s handoff are analyst
hypotheses. No published source validates them for a specified Mars site.

[Source Rev7 PDF page 155; section classification: References and source provenance]
14. Historical design cases and superseded assumptions
Integrated source material and derivations. Historical cases are source-attributed, not promoted to current
qualified results.

Source evidence — Rev7 master page 1
FREYA Revision 7 Master Report Integrated engineering record and complete retained project report annexes. Prepared for Robert
J Mills. 26 October 2026. The integration volume explains conflicts and current interpretations. Annexes retain original titles, page
labels, calculations, citations and warnings. Historical numbers remain historical; no flight configuration is qualified. 2 to 16
Revision 7 integration and derivation appendix (15 pages) 17 to 69 Revision 6 complete consolidated study (53 pages) 70 to 119
Revision 5 complete report and peer review appendix (50 pages) 120 to 122 Sampling depth and penetration study (3 pages) 123 to
125 Updated carbon fiber versus steel study (3 pages) 126 to 136 Earlier original optimization and entry analysis (11 pages) 137 to
152 Revision 2 entry TPS and shock study (16 pages) 153 to 155 Preliminary study historical assumptions (3 pages)

156 to 162 Expert review and full predecessor website specification (7 pages)

[Source Rev7 PDF page 1; section classification: Historical design cases and superseded assumptions]

Source evidence — Rev7 master page 114
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 45 3. Cross-check against
T06 and Appendix E; do not introduce another independent default set. Reproduction check: Twelve summary rows; authoritative
unrounded computational inputs remain in the review packet. Review limit: A short summary cannot validate its assumptions; the
detailed register governs provenance. T16 Revision 4 assumptions and Revision 5 disposition Inputs: A009, A066, A045, A090, A085
Sources: Earlier Revision 4 study and reviewer corrections [12]. 1. Identify an earlier selected-looking assumption. 2. Compare it
with current evidence and user directions. 3. Record whether it is reopened, retained as a scenario or withdrawn. Reproduction
check: Nine disposition rows; no new physics calculation. Review limit: Revision labels distinguish document versions; website
remains the earlier numerical companion until

separately updated.

[Source Rev7 PDF page 114; section classification: Historical design cases and superseded assumptions]

Source evidence — Rev7 master page 119
FREYA / SCIENCE AND PENETRATOR ENGINEERING Revision 5 | 26 October 2026 | Preliminary • 50 exact graph values,
including values outside the visible log-axis range. verification_results.json lists scalar checks. source_manifest.json contains
SHA256 hashes and evidence roles. README.txt gives the execution command and remaining evidence gaps. Suggested reviewer
record For each assumption, table or figure, record: ID; reviewer and discipline; date; disposition; calculation or evidence
examined; discrepancy; proposed replacement input; downstream IDs affected; closure evidence and owner. Approval should
identify its scope, such as acceptable for preliminary screening, rather than implying flight qualification. No reviewer names,
signatures or acceptance decisions are inserted in this document. Revision 5 audit boundary Revision 5 corrects the report label
and adds captions, traceability, source-status disclosures and independent reproduction evidence. The 23-page predecessor is not
the length of this expanded report. Numerical design assumptions remain the prior

baseline. The website retains its Revision 4 name and baseline calculations; this appendix is a report deliverable and does not
imply that the website has been republished with these review records.

[Source Rev7 PDF page 119; section classification: Historical design cases and superseded assumptions]

Source evidence — Rev7 master page 159
This artifact preserves the supplied corrections and actionable dispositions. It neither asserts expert approval nor replaces the
Revision 4 report, website, or requirements. The attached paper remains a separate saved source artifact.

[Source Rev7 PDF page 159; section classification: Historical design cases and superseded assumptions]
Revision 8 integration and completeness controls
Source control: Every one of the 162 Revision 7 source pages was assigned to one topical chapter, with a source-page label.
Graphics are selective reproductions only; charts not embedded in the DOCX may be inspected in the companion searchable
original evidence PDF. The full source PDF is retained in an evidence folder, but is not presented as an annex to this report. Some
tables extracted from PDF are linearized; numeric tables should be reproduced from associated machine-readable datasets when
available.

Known evidence gaps: original Stone Aerospace SBIR proposal and award confirmation not independently available; specific
IMPRESS supplementary file provenance not completely verified; full finite-element impact, 6-DOF stability, heating and radiation
sterilization qualification testing absent. The 4 kg mass and dry sandstone depth remain open decision gates.

Integration ledger: Mission architecture and technical baseline: 2 source pages; Life detection and science sampling: 30 source
pages; Penetrator geometry, structure and mass closure: 25 source pages; Atmospheric entry, orbital delivery and deorbit: 21
source pages; Penetration mechanics and impact qualification: 21 source pages; Parachutes, stability and communication: 10
source pages; Aeroshell and thermal protection: 8 source pages; Electronics, batteries, heat and survivability: 12 source pages;
Planetary protection and sterilization: 2 source pages; Requirements, constraints and trade studies: 4 source pages; Risk register
and qualification blockers: 3 source pages; Assumptions, equations and calculation traceability: 6 source pages; References and
source provenance: 14 source pages; Historical design cases and superseded assumptions: 4 source pages
