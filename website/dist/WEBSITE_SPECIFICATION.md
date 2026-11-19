# FREYA Revision 5.1 website specification

Release 5.1. Governing source FDS-001 Revision 0.9, 10 November 2026. Existing FREYA Site, URL and audience retained.

## Authority and complete content

The full source text, 11 tables and 14 placed illustrations appear in rev09-source.html. Original unmodified DOCX remains linked through Library. All 91 requirement identifiers are preserved in data/revision51/requirements.json, including distinct GNC-001 and GNC-01 families. Ten integration issues and treatments appear in data/revision51/integration_register.json.

A: one 20 kg wet precursor, three complete 2 kg probes, late 2028. B: two 50 kg wet vehicles, seven complete 2 kg probes each, 2031; further 20 kg shared host allowance assumed. Reference aeroshell 800 mm diameter and 600 mm height. Probe 200 mm length, 50 mm body, 75 mm shoulder.

Early source sections retain four wheels and solid propulsion, while later sections propose six-jet control and hybrid propulsion. Show open trades, no silent flight selection. The old 4 kg probe allocation and deeper sampling targets are historical. Separate Aeolus reference material is excluded.

## Interactions

A/B selection; start/pause/step/reset/speed; scripted carrier and probe scene; normalized synthetic altitude trend; six jet indicators; nine core cumulative status bits, B drops 4–7 appended at bits 9–12; event log and nominal 60-second synthetic transmit attempts. No confirmed reception or operational trajectory is inferred.

Editable mass, geometry, orbit, vacuum periapsis, delta-v allowance, density, Cd, canopies, suspended mass, RF, gas attitude and surface-energy inputs. Restore defaults and download JSON. Search/filter all source requirements. Full report DOCX/PDF, source view, data and historical studies remain available.

## Formula boundary

src/revision51-model.mjs contains circular-to-elliptical vacuum sizing, m delta-v momentum equivalent, constant-density terminal speed, free-space RF loss/link margin, ideal symmetric slew, gas consumption F t/(Isp g0), and duty-cycle energy. No validated finite-burn targeting, CFD/ablation, 6-DOF, inflation, impact/fracture, biological-reduction or mission-success model is included. A-only inertia and gas settings do not qualify B. PCM suspended mass must be defined by phase.

## Validation and artifacts

npm test covers mass arithmetic, orbit and descent examples, RF range scaling, attitude and energy calculations, telemetry identity, complete requirement identifiers, unsupported domains and document links. npm run build packages current source and all companion assets. Browser checks include playback, stepping, configuration reset, filtering, editable results and responsive overflow.

Report images may be optimized while retaining all placed source content. Original source identity is preserved. Historical 45 kg/six-probe calculators and integrated report are labeled historical. scripts/bundle-revision51.mjs emits a self-contained operations application that needs no network for its controls and calculations; companion document links still require adjacent files or account access.

## Presentation mission-phase extension

The ten-slide FREYA_Pitch_Expanded_Science_Three_Categories.pptx supplies phase order, read without modification. Slide 7 steps 01–07 govern the walkthrough: rideshare, orient, deorbit and module jettison, passive entry, carrier extraction, individual probe release, and probe delivery. Slides 3–4 supply two separate proposed science workflows. Data buffering, assumed orbiter relay and onward Earth return conclude the review. Phase navigation, previous/next event, playback scrubber and variable-speed continuous interpolation are supported.

src/presentation-scenes.mjs renders a distinct vector scene for every phase. presentationEvents() and timelineState() define deterministic stage timing and seeking. Timing is compressed review playback, not a propagated trajectory or laboratory incubation clock. A has 46 events; B has 66. Science events never set additional carrier-status bits. The carrier's nine-bit core and B thirteen-bit extension remain valid through mission completion.

The slide 4 sealed-gas/trap concept and slide 3 incubation/extraction concept remain separate alternatives. No detector counts, biology result, actual dosing or live hardware command is generated. The phase update does not adopt presentation-only mass/diameter changes or any restricted Aeolus source material. Slides 1–2 and 9–10 are context rather than flight phases. data/revision51/presentation_phase_map.json records the mapping and both complete event sequences.

The phase test suite verifies ordering, every probe's full lifecycle, telemetry invariants, continuous seeking, science separation, scene validity and navigation. Existing engineering tests remain unchanged.

## Revision 5.1 simulation calculation supplement — 15 November 2026

The calculated-flight panel implements attitude-jet separation, 3–20 orbit opportunity search, 90-degree rest-to-rest alignment with the heat shield facing the trajectory, full A fixed-impulse burn, sized B hybrid-alternative burn, module discard, passive entry, two-location heat-shield temperatures and independent overlapping carrier/probe descents. Physical flight playback and the presentation review have separate clocks. Equal physical phase playback intervals compress real time; every displayed mission timestamp comes from calculated durations.

`src/flight-model.mjs` is the calculation source; `src/flight-ui.mjs` renders the physical sequence, A/B gas and engine comparisons, center/shoulder and altitude/velocity plots, all-step paginated telemetry, and complete JSON / all-descent CSV exports. Rev09 masses, geometry, orbit and canopy controls feed the selected case. Additional flight controls are separately labeled. Comparisons use the selected trade case and the other configuration's source defaults.

Authoritative simulation documentation is integrated into the amended requirements specification and matching report/source view: sections 3.1, 4.1, 7B.1.1, 7B.5.1, 8.1.1, 8.2.1, 8.3.1, 8.4.1, 9.1 and 11.1. Shared text and citations are archived in `data/revision51/simulation_spec_sections.json` and `simulation_sources.json`. Baseline A/B JSON stores the complete default calculation outputs. Eight SIM software requirements supplement the unchanged 91 original Rev09 requirements.

Assumed A reference: 100 N, 1,280 N s, Isp 225 s, 12.8 s full burn; no selected motor or qualified thrust curve. B nominal sizing assumes Isp 250 s, 12.8 s burn, O/F 4. Gas tank: separate N2, 1 L, 200 bar, 293 K, 20 bar minimum, ideal gas. Both separation and alignment include a 20% pulse allowance. B inertia 3.75 kg m² is explicitly assumed. No station-keeping fuel is credited. Default zero leakage; optional leakage affects the gas budget only.

The entry solver is a spherical zero-lift deterministic proxy with an exponential atmosphere. Temperature is a generic nonablating two-node energy-balance estimate, not a qualified SLA-561V/PICA model. Shoulder flow and local-radius correction are assumed. Actual orbital epoch, dispersions, CFD, ablative response, Mach/q canopy limits, opening loads, terrain, winds, attitude stability and impact survival remain unverified. A fixed reference impulse fails the 25% delta-v planning allowance, which is flagged. Target search reports a miss rather than assuming every target is reachable.

Verification: `npm test` runs the 16 original active Rev09/presentation tests plus seven physics tests. Physics checks cover independent identities, mass/mixture closure, target bounds, unreachable latitude, thermal equilibrium, release inheritance, ground interpolation and time-step refinement. Archived historical test suites target prior HTML releases and are excluded from the active suite. Browser QA covers A/B switching, physical main-engine orientation and timing, descent entity selection, pagination, plots and source links.

Capsule display correction: delivery steps 2–7 use a 180-degree capsule orientation offset. Attached cold jets and main-engine hardware rotate with the capsule; stage 1 and carrier/probe parachute attitudes remain unchanged. Velocity arrows follow the displayed shield-forward direction. Calculated flight inputs and outputs are unchanged.

Walkthrough event 10 (entry interface) and event 11 (heat-shield heating): capsule and its attached heating effect receive a further 90° counterclockwise display offset; the entry trace follows that view. Event 12 and the other events retain their existing orientations.


## Live review trades and thirteen-position status panel — 16 November 2026

The animation slider is immediately below its scene. Walkthrough steps 9–11 receive an up/down capsule-and-path flip; steps 12–17 receive an up/down capsule-only flip. Prior orientation offsets remain. All 13 labeled bit positions are displayed. Source A preserves its nine-bit packet and marks B-only positions N/A; source B has thirteen transmitted bits. Status is simulated, latched review confirmation.

`src/mission-telemetry.mjs` maps review time monotonically to calculated mission time and derives capsule proper acceleration, center/shoulder surface temperatures, simultaneous carrier/probe altitude, speed and chute drag load. Capsule trajectory ends at discard. Grounded objects retain a separate impact speed. `src/mission-trade-ui.mjs` renders the live panel, selector for each probe, all-probe table, three material impact cases and speed-sweep plots. Seventy-plus range inputs have numeric companions. Flight input changes recompute and refresh the main review; invalid solutions clear live values.

Impact screening solves F=a+bv² analytically. Contact area uses the Rev09 50 mm main body; 200 mm length flags depth extrapolation. Soft sand, hard soil and sandstone resistance/density/inertial coefficients are assumptions, with sliders and independent reset. Additional obliquity multiplies vertical input speed by cosθ; horizontal energy is excluded. No fracture, crush, survival or qualified Mars site model is claimed. Full equations, input values and NASA/USGS and Sandia references are recorded in website specification section 8.4.2, `rev09-source.html`, `simulation_spec_sections.json` and `simulation_sources.json`. Existing downloadable report/Word documents are not revised by this UI-only increment.

Validation now runs 27 tests including impact work/stopping identities, velocity and resistance trends, zero-speed and invalid domains, monotonic physical review clock, release/ground transitions, changing entry load/temperature, and exact step-specific up/down transform bounds.


## Entry display correction — steps 10–12

Supersedes the earlier entry-only flips and fixed rotation offsets. A single continuous quadratic curve runs from space at (150,95) to the Mars limb at (625,420), control point (600,105). Steps 10, 11 and 12 traverse successive portions of this schematic path. The capsule position is on the curve; its heat-shield outward normal follows the local forward tangent. The shield plane is perpendicular to that tangent and faces into descent toward Mars. Heating graphics rotate with the shield. Arrowheads show direction toward Mars. The curve is a presentation schematic, not a plotted orbital solution; physical calculations remain unchanged.


## Calculation inspection for every input and telemetry readout

`src/calculation-catalog.mjs` registers explicit formula families and dependencies for all 72 mission, flight and soil input cards, both playback sliders, all live mission cards, engineering and flight result cards, thirteen status positions and six schematic jet indicators. Telemetry table values and physical-flight readout panels are also inspectable. `src/calculation-inspector.mjs` uses a native modal dialog to show equations, assumed constants, current input values and origins, implementation/source links, calculated intermediate state and an expandable complete scenario snapshot. Table inspections retain their selected row values; A/B comparison cells use their own configuration inputs and solution.

Click or tap a slider card, label, numeric box or its Calculation button to inspect it. A slider-track click opens the inspector after the input recomputes; dragging remains available without opening a modal. Numeric keyboard entry remains available after closing the inspector or through Tab focus. Telemetry cards and cells support Enter/Space. Opening pauses both playbacks so inspection values remain stable. Native dialog focus containment, Escape, close button and backdrop dismissal are supported. Reopening always reads a fresh snapshot; the modal never changes a physical assumption.

The catalogue distinguishes the constant-density terminal-speed screen from propagated chute descent, single-jet engineering screening from paired-jet flight gas sizing, script-latched status from sensed telemetry, and schematic timing from physical time. Height remains a packaging input without a volume/drag/inertia solver. Effective resistance/material properties remain uncalibrated. The delivered offline HTML includes the same inspector with no runtime dependency. Existing downloadable Word/PDF reports are unchanged by this UI increment.


## Requirement evidence assessment

All 91 original Rev09 requirements retain their identifiers, text and original verification statements. A separate `requirement_evidence.json` assessment maps each to simulation support (numerical support, partial, shortfall or not demonstrated), flight-demonstrated analogous elements, full primary citations, remaining verification and an explicit false FREYA-compliance flag. Source inputs and schematic animation are not independent evidence; stable entry attitude, geometry inspection, sensor covariance and hardware qualification remain unverified. The four Deep Space 2 references are flagged unsuccessful, never successful penetrator heritage.

The baseline review has 34 requirements with numerical/partial simulation support, 43 with analogous flight heritage, two with the same A motor margin shortfall, and zero fully verified FREYA requirements. Categories overlap; a combined filter is provided. Marks refer to fixed reviewed default A/B cases, not arbitrary slider trades. The assumed A burn gives 64.9884 m/s against a 75.3408 m/s planning demand. B nominal sizing is not proof of reserved installed motor capacity.

`scripts/build-requirement-evidence.mjs` reruns the models, records 17 explicit checks (16 passing numerical subchecks and one expected margin shortfall), baseline inputs and model SHA-256 fingerprints, and generates the self-contained source data module, full HTML register and CSV. The source/model checks are reproducible; their passing criteria are subchecks, not full requirement acceptance. A regression log and check-generator source are downloadable. New tests enforce 91-item coverage, valid references, non-inheritance of qualification, proper overlapping filter counts, preserved source identity and reproducible baseline outcomes. The offline simulator includes the same evidence assessment/filter. Existing Word/PDF reports are unchanged in this website-only increment.
