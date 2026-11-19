Validation 26 October 2026

14 analytical and regression tests passed. Shared-model snapshots agree with report generation. The report was rendered and all pages visually reviewed. Desktop browser checks exercised standard/reduced inverse budgets, diameter changes, delivery-scenario boundaries, and the risk register. App console review found only browser-extension metadata errors. Mobile CSS is supplied; mobile device testing was not available.

Engineering estimates do not validate materials, shock survival, microbial reduction, assay performance or flight trajectories.

## Mission control dashboard and selected starting trade

The main Site now includes a reference-inspired mission control display synchronized to walkthrough state, physical telemetry, configuration, time compression and review scrubbing. The selected initial trade is 400 km for A and B. A uses a generic K-class 2,000 N·s impulse at an assumed constant 100 N (20 seconds), retaining the assumed 225 s Isp. This is an analytical motor assumption, not a selected or qualified commercial motor. Original Rev09 defaults and requirement evidence remain archived unchanged.

Both selected initial flight solutions reach carrier extraction and ground descent. Target miss warnings remain; A also misses the selected 25% delta-v allowance. Dashboard tests cover every review event in A and B, control forwarding, plot data and incomplete-solution handling. Full regression tests and static build pass. Visual browser QA was unavailable because the required cua_repl.js interface was absent in this environment.

### K-class mass redistribution

At 20 kg wet mass, the current assumed propulsion package is 2.636399 kg: 1.500000 kg dry module, 0.906414 kg propellant (2,000 N·s / 225 s / g₀), and 0.229984 kg initial nitrogen. The remaining source allocations multiply by 0.9922057792, a 0.779422% reduction, including reserve. Three probes share 5.953235 kg (1.984412 kg each); the assumed retained carrier dry mass scales from 3 kg to 2.976617 kg. Motor dry mass is editable; motor, tank and wet-mass changes recalculate the distribution and flight. Probe mass is derived from the A allocation and probe count. B allocations are unchanged. Tests verify total mass closure, common scale factor, response to motor changes, and the revised complete flight solution.

## Dashboard visibility and nitrogen load correction

The deployed HTML and script contents matched the prior release during investigation; a DOM startup check initialized its chart successfully, so the reported missing dashboard could not be reproduced. The production build now pre-renders its entire dashboard shell, includes a prominent header launch link, versions the module graph and styles as a release, and shows dynamic-import errors beside the dashboard. Built-output DOM initialization and regressions pass. Browser visual QA remains unavailable.

The requested nitrogen gas load is exactly 0.250 kg. At the retained 200 bar and 293 K this requires 1.08703 L in the ideal-gas model. The resulting precursor propulsion allocation is 2.656414 kg. Other allocations scale by 0.991062034 to preserve 20 kg wet mass; each of three probes is 1.982124 kg. This supersedes the previous initial 0.229984 kg gas-load figures. Tank hardware mass is unchanged.

## Reference-style console and lower-right mission animation

The previous release used altitude/time charts and stacked panels on mobile, which did not reproduce the requested reference composition. The page now opens with the console before the engineering introduction. A Mars limb and computed trajectory replace the main Cartesian chart, with angular extent fitted to the display and radial altitude exaggerated (labeled in the graphic). Burn coordinates, coast angular momentum integration, entry angles and carrier downrange data drive the path. The lower display contains circular parking/post-burn orbit, probe-altitude and nitrogen-inventory instruments. Readouts retain model units and data; no unrelated Earth/Hermes/MAV trajectories are invented.

Three instruments remain in one row on mobile; Expand instruments provides a larger horizontally scrollable view. The existing mission scene node moves into a separate lower-right animation panel and retains the shared playback and phase timeline. The first console frame, including actual initial trajectory, instruments and scene preview, is rendered into the published HTML. Regression tests check the finite computed path, all three instruments, animation-node relocation, initial markup and full mission-event synchronization. DOM startup checks pass. The orbital SVG was exported through Inkscape and visually inspected. Mobile browser visual QA was unavailable; no browser screenshot is claimed.

## Continuous descent tracking and adjacent Start controls

The trajectory marker previously selected the last stored row at or before the review time, creating steps while telemetry itself interpolated continuously. It now interpolates altitude and angle at the same physical time; after aeroshell discard it uses live carrier altitude and downrange directly. The coast-to-entry endpoint is included to avoid a sample-gap discontinuity. The label identifies the transition from capsule flight to carrier descent. Lower-right entry pose uses live calculated altitude when available; the landed carrier is aligned with the schematic ground and its canopy is removed at landing.

Tests sample 60 display positions inside a single descent physics interval for both configurations, compare exact live altitude/downrange, check entry interpolation and grounded states, and preserve deterministic paused/seek positions. Additional Start buttons sit immediately beside Playback calculation on the main/dashboard and physical-flight sliders, routing to the matching existing playback action. The dashboard slider's calculation explanation now correctly identifies the main review clock. Full regression/build and built-page DOM startup/control checks pass. Mobile browser visual QA remains unavailable.

## Full burn-to-entry coast playback

The primary review jumped from module separation (burn cutoff + 5 physical seconds) to atmospheric entry, skipping approximately 33–39 minutes of computed coast for the current initial A/B trades. The current review now inserts a dedicated Coast to atmospheric entry segment between those events, spanning the entire physical interval in 60 review seconds (12 wall-clock seconds at 5x). It drives the same mission clock, telemetry, orbit marker and lower-right coast animation. Event-specific display rotations use event IDs rather than fixed indices so the inserted segment does not change other hardware poses. Archived source presentation/evidence remains unchanged.

The current flight-sampling adapter also appends the coast interface endpoint, which the propagator's ten-second sample cadence omitted. Its altitude uses the entry solver's interface datum to remove the sub-meter numerical radius mismatch at the handoff. Existing physical propagation is unchanged. Tests cover both configurations at the actual default 5x / 60 Hz sampling, require intermediate 300 and 200 km altitudes, bound each frame's altitude change, and check sub-0.1 m continuity at coast boundaries. Regression tests, build and built-page startup/Start-control checks pass. Mobile browser visual QA remains unavailable.

## Live heat shield and propulsion firing instruments

Telemetry / Orbit is replaced by a heat-shield surface-temperature chart. Center and shoulder curves come directly from entry rows; the current values and markers interpolate at the shared mission time. Unreached portions of the calculated curve are faint. Before entry, initial temperatures are displayed. After aeroshell discard, the final computed values are held and explicitly labeled LAST AT DISCARD; no unmodeled post-discard cooling is invented.

Telemetry / Delivery is replaced by a cold-gas/main-engine firing schematic. Separation, slew acceleration, slew braking, ignition, burn and cutoff derive from the same flight timing used by propagation. Six displayed jet channels are a schematic assignment of the model's paired-jet maneuvers; no individual valve pulse history exists in this model. Main engine thrust is the calculated constant thrust during its complete burn, zero after cutoff. The existing nitrogen inventory panel remains.

Both instruments are pre-rendered in the initial HTML and update during playback and scrubbing. Regression tests cover current thermal interpolation against mission telemetry, post-discard value holding, each jet-pair interval, ignition, elapsed burn, cutoff and detachment for A and B. Full regressions, build and built-page startup/Start control checks pass. Exported SVG panels were visually inspected. Mobile browser visual QA remains unavailable.
