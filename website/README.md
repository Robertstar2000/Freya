# FREYA Revision 5.1

FDS-001 Rev09 integration into FREYA report and interactive website. Run npm test, npm run build, npm run dev.

index.html is the current A/B engineering lab; rev09-source.html preserves full source content. src/revision51-model.mjs implements explicit preliminary formulas; src/revision51-app.mjs implements controls and scripted telemetry. data/revision51 contains 91 requirements and ten integration issues. documents contains the updated report and historical supporting evidence. revision8.html preserves the prior 3D simulator. The source's attitude, propulsion and mass-boundary conflicts remain explicit and open.

The full-mission update follows all seven delivery phases on slide 7 of the ten-slide overview deck and the proposed science alternatives on slides 3–4, then data return. Use Review phase to jump, Previous/Next event to step, or the scrubber and Start/Pause/speed controls. No presentation file was modified. The report is unchanged by this simulation-only update.

15 November 2026 simulation supplement: equations, assumptions and citations are integrated into Rev09 source sections 3.1, 4.1, 7B.1.1, 7B.5.1, 8.1.1–8.4.1, 9.1 and 11.1. Use npm test for the 23 current checks.
