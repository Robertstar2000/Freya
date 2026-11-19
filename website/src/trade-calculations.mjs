// Annotated equations for the functions in trade-studies-model.mjs and trade-evidence.mjs.
export const MODEL_CALCULATIONS = {
  mission: {
    steps: [
      ['Propagate the flight', 'Circular orbit speed = √(μ / r)\nAtmosphere density ρ = ρ₀ exp(−altitude / H)\nDynamic pressure q = ½ ρ V_air²',
        'The solver propagates retroburn, coast, entry and descent in sequence. The descending entry interface is 125 km. Extraction and first release are altitude crossings; subsequent releases are spaced by the entered cadence. Each probe starts from the carrier state at its release.'],
      ['Choose a burn opportunity', 'Orbital period = 2π √(r³ / μ)\nMiss distance = Mars radius × great-circle central angle\nBurn selection score = miss distance + time weight × wait hours',
        'Mars rotation shifts the projected arrival longitude. The orbit search prefers opportunities within target tolerance and then minimizes the burn selection score. The targeting calculation uses the first probe’s impact state.'],
      ['Compare mission candidates', 'Score = miss distance (km) + time weight × hours to final probe impact\nMargins = tolerance − miss; pressure ceiling − q at extraction;\n          entry time − jettison time − required interval; gas reserve',
        'The study minimizes this score. A trajectory must yield a complete delivery before the score can be evaluated.'],
    ],
    sources: [['Flight propagation and ground targeting','src/flight-model.mjs']],
  },
  shield: {
    steps: [
      ['Static stability margin', 'Lower static margin = min(neutral points) − 3σ − CG\nStatic surplus = lower static margin − required static margin',
        'Neutral points, uncertainty and CG are expressed as fractions of aeroshell diameter. The minimum spans the three entered regimes. Geometry-specific neutral points are held fixed during the sweep.'],
      ['Heat flux and thermal response', 'q_center = 1.9027 × 10⁻⁴ √(ρ / nose radius) × V_air³\nq_shoulder = q_center × shoulder flow factor × √(nose radius / shoulder radius)\nConduction = [k / (thickness / 2)] × (T_surface − T_bulk)\nRadiation = εσ_SB (T_surface⁴ − T_initial⁴)\ndT_surface/dt = (q_in − radiation − conduction) / C_surface\ndT_bulk/dt = conduction / C_bulk',
        'Both locations use heat capacities per area equal to material density × specific heat × layer thickness. The replay scales entry heating by the entered factor and applies residual flux during soak. Peak temperatures cover both locations throughout the replay.'],
      ['Rank designs and check limits', 'TPS mass proxy = π(D/2)² × thickness × material density\nThermal margins = entered limits − respective peak temperatures\nMass margin = TPS allocation − TPS mass proxy\nScore = −min(static surplus / 0.1, bulk margin / 100, surface margin / 500)\n        + mass weight × TPS mass proxy',
        'The calculation uses metres for TPS thickness and projected area for mass. The score rewards the smallest normalized stability or temperature margin while penalizing mass. This is a static, nonablating model.'],
    ],
    sources: [['Entry stability and thermal replay','src/entry-design-model.mjs'],['Heat-flux and temperature solver','src/flight-model.mjs']],
  },
  chute: {
    steps: [
      ['Calculate descent and opening loads', 'Canopy drag = ½ ρ[(Vₓ − wind)² + Vᵧ²] × C_d × πD²/4 × inflation fraction\nVertical impact speed = |Vᵧ at touchdown|\nImpact angle = atan2(|Vₓ|, |Vᵧ|)',
        'The canopy inflates linearly after the deployment delay. The reported canopy drag is the largest simulated instantaneous drag from the canopy, excluding body drag. Impact angle is reported in degrees.'],
      ['Estimate penetration and shock', 'Poncelet force = a + b v²\na = impact area × effective bearing resistance\nb = ½ × soil density × soil coefficient × impact area\nDepth = m/(2b) × ln(1 + b v²/a), or m v²/(2a) when b = 0\nPeak shock = (a + b v²)/(m g₀) for v > 0',
        'The hard-soil screen uses vertical touchdown speed scaled by the nonnegative cosine of the additional impact obliquity. At zero effective speed, depth and shock are zero. Modelled nose depth is a different quantity from accessible sample depth.'],
      ['Compare all probe outcomes', 'Score = max across probes of |vertical impact speed − target speed|\nUpper margins = ceilings − maxima for shock, canopy drag, angle and depth\nLower depth margin = minimum predicted depth − required minimum',
        'The score and gate margins use the worst probe outcomes independently, so different probes can control different limits.'],
    ],
    sources: [['Descent and touch-down equations','src/flight-model.mjs'],['Poncelet impact estimate','src/mission-telemetry.mjs']],
  },
  mass: {
    steps: [
      ['Build the ledger', 'Wet mass per vehicle = probe count × probe mass + structure + other dry mass\n                       + retro propellant + loaded nitrogen\nMission wet mass = vehicle count × wet mass per vehicle\nTotal deployed probes = vehicle count × probes per vehicle',
        'The ledger uses the configuration’s probe mass and count. Enter dry hardware separately from the propulsion consumables to avoid double counting.'],
      ['Reserve and structure checks', 'Score = wet mass per vehicle\nMass margin = configuration ceiling − wet mass per vehicle − uncertainty allowance\nStructure margin = entered structure mass − minimum structure mass',
        'The optimizer varies structure mass while accounting for the uncertainty reserve in the ceiling check.'],
    ],
  },
  relay: {
    steps: [
      ['Compute the link margin', 'Free-space loss = 32.44 + 20 log₁₀(f_MHz × range_km)\nReceived power (dBm) = 10 log₁₀(1000 × RF watts) + net gain − free-space loss\nLink margin = received power − receiver threshold',
        'Net gain incorporates transmit gain, receive gain and implementation loss. The frequency and range units are part of the free-space loss constant.'],
      ['Compute contact volume and energy', 'Volume (kbit) = transmit seconds × net bit rate / 1000\nScore = energy (Wh) = RF watts × transmit seconds / (amplifier efficiency × 3600)\nMargins = link margin − required fade margin; contact − transmit duration;\n          delivered volume − required volume',
        'Use a measured net rate to reflect overhead and coding. Energy covers the RF power amplifier calculation.'],
    ],
  },
  energy: {
    steps: [
      ['Calculate battery draw', 'Mean power = continuous power + heater power + active fraction × additional active power\nEnergy used = scheduled hours × mean power\nUsable battery = installed capacity × usable capacity fraction\nActive time = scheduled hours × active fraction',
        'Scheduled hours come from the selected configuration. The additional load is incremental above continuous and heater loads.'],
      ['Compare battery choices', 'Score = installed battery capacity\nMargins = usable battery − energy used − return reserve;\n          available − peak current; active time − required active time',
        'Peak current is checked independently from the average power used in the energy calculation.'],
    ],
  },
  propulsion: {
    steps: [
      ['Size the burn', 'A burn duration = entered total impulse / entered mean thrust\nB ideal Δv = circular speed − transfer-orbit speed at apoapsis\nB sized propellant = burn-start mass × [1 − exp(−Δv / (Isp g₀))]\nB mean thrust = sized propellant × Isp g₀ / entered B duration',
        'A uses an entered constant-thrust motor and recalculates its proportional probe and carrier allocation at each candidate. B sizes thrust from the nominal transfer.'],
      ['Integrate and compare', 'Flow rate = thrust / (Isp g₀)\nScore = modeled propellant used = flow rate × burn duration\nDelivered impulse = thrust × burn duration\nEnd-of-burn thrust acceleration = thrust / final vehicle mass\nMargins = acceleration ceiling − end-of-burn thrust acceleration;\n          entry time − jettison time − required interval',
        'The flight solution integrates the finite retroburn and computes periapsis from the final state. A candidate must also reach entry and complete delivery to receive a score.'],
    ],
    sources: [['Finite-burn solver','src/flight-model.mjs'],['Precursor mass allocation','src/precursor-mass.mjs']],
  },
  gas: {
    steps: [
      ['Size the stored and regulated gas', 'm = P V / (R_N₂ T), with R_N₂ = 296.8 J/(kg·K)\nUsable mass = m at initial pressure − m at minimum regulated pressure',
        'The calculation converts bar to pascals and litres to cubic metres. It uses the same entered temperature for both pressure states.'],
      ['Budget translation and both slews', 'Separation mass = vehicle mass × separation Δv × pulse allowance / (Isp g₀)\nPaired-jet torque = 2 × jet thrust × lever arm\nSlew time = 2 √(slew angle in radians / angular acceleration)\nSlew mass = 2 × jet thrust × slew time × pulse allowance / (Isp g₀)',
        'Angular acceleration is torque divided by inertia. The pulse allowance multiplies modeled consumption by 1 plus the entered percentage divided by 100. The draw includes separation, retroburn alignment and heat-shield alignment.'],
      ['Compare tank settings', 'Remaining gas (g) = 1000 × [usable mass − maneuver draw − initial mass × leak fraction]\nScore = initial loaded mass (kg)\nMargins = allowed pressure − initial pressure; remaining gas − additional reserve',
        'A vessel proof or burst rating must come from separate evidence.'],
    ],
    sources: [['Cold-gas budget implementation','src/flight-model.mjs']],
  },
  storage: {
    steps: [
      ['Calculate production and occupancy', 'Write rate (bytes/s) = record rate × (payload bytes + journal overhead bytes)\nScore = peak volume (MB) = write rate × blackout hours × 3600 / 10⁶',
        'The calculation assumes a constant production rate and an uninterrupted blackout. MB and kB are decimal units.'],
      ['Screen storage and write capacity', 'Margins = usable capacity − peak volume;\n          qualified write rate − generated write rate / 1000;\n          record rate − minimum sample rate',
        'The optimizer varies record rate while preserving sample-rate and throughput requirements.'],
    ],
  },
  science: {
    steps: [
      ['Calculate expected counts and noise', 'Exposure per group (s) = live time per sample × number of sample/blank pairs\nExpected excess counts = net signal rate × exposure\nNoise = √[(net signal rate + 2 × blank rate) × exposure]\nSignal-to-noise ratio = expected excess counts / noise',
        'The sample and matched blank have equal exposure, and the count model treats them as independent Poisson measurements. The implementation reports a zero ratio when expected noise is zero.'],
      ['Screen time and energy', 'Score = total detector time (min) = 2 × exposure / 60\nReadout energy (Wh) = readout watts × total detector time / 60\nMargins = ratio − required ratio; time available − time used;\n          detector energy budget − readout energy',
        'The count budget is a screening estimate for a calibrated channel. Scientific decision limits still require measured blanks, controls and detector response.'],
    ],
  },
  clock: {
    steps: [
      ['Bound worst-case timing error', 'One-clock drift (ms) = drift (ppm) × resync interval (s) / 1000\nPairwise ordering uncertainty = 2 × (sync error + one-clock drift)\nMargin = ordering uncertainty limit − pairwise ordering uncertainty\nScore = −resync interval',
        'Two clocks can drift in opposite directions. The negative score lets the minimizer select a longer resynchronization interval while enforcing the uncertainty limit.'],
    ],
  },
};

export const MODELED_SEARCH = [
  'Local search',
  'Candidate input = clamp(current input ± field step × step multiplier, minimum, maximum)\nShortfall = Σ ln(1 + |margin|) over negative margins',
  'Each iteration tries both directions for one variable at a time and leaves the other inputs fixed. Invalid evaluations are skipped. The search first favors a lower shortfall, then a lower objective score when shortfalls tie. It stops when no tested change improves the result or the iteration limit is reached.',
];

export const EVIDENCE_CALCULATIONS = [
  ['Validate the candidate', 'Complete = named candidate + evidence reference + finite objective + one finite margin per criterion\nPass = complete and every signed margin ≥ 0',
    'Enter margins against a common limit. Use measured minus minimum for lower bounds, maximum minus measured for upper bounds, or 0 and −1 for met and unmet evidence gates. Keep units consistent across candidates.'],
  ['Rank candidates', 'Passing candidates first → complete candidates with shortfalls → incomplete candidates\nOrder passing candidates by objective, lowest first.',
    'The lab compares your supplied measurements or review results. Each criterion below needs its own signed margin.'],
  ['Search measured samples', 'Eligible next sample: passing, with 0 < |sample − current| ≤ step limit,\n                      and objective(sample) < objective(current)',
    'Start from a passing sampled value and use unique coordinates. At each step the search picks the eligible sample with the lowest objective and stops when no such sample exists or the iteration limit is reached. It uses the entered samples directly.'],
];
