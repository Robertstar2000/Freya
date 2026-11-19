# FREYA Revision 4 reassessment website specification

Date: 26 October 2026

Status: implemented engineering screen; mission baseline unselected.

## Shared model

src/trade.js defines geometry, mass, thermal attenuation, power, impact and orbital examples. data/reassessment.json holds matching snapshots and source register.

## Required behavior

One kilogram science mass is fixed. Geometry, fill fractions, battery, cable and contingency are adjustable. Reject invalid geometry and fractions. Distinguish nominal hardware, mass contingency and complete budget. Separate forebody and surface hardware.

Expose scheduled-wall and matched-wall comparisons, packaging sensitivities, power closure, sampling-depth science boundaries, delivery alternatives, contamination options, risks, requirements and constraints.

No fitted depth or flight-success claim. No automatic sterilization or biological-detection approval. Keep the old solver archived.

## Equations

Vcavity=(msci/rhosci+Vother)/(1-fpot-ffree). L=Vcavity/(pi*d*d/4). Steel includes annular tube, hollow hemisphere, rear cap and joints. Potting is fpot*Vcavity*rhopot. Contingency multiplies all nominal hardware.

## Files and validation

Run node --test test/reassessment.test.mjs then node scripts/build.mjs and node scripts/bundle_standalone.mjs. Report generation uses the same exported model. Downloads must resolve and be updated together.

## Sources

1. Spacek, J.; Alpern, H.; Dineen, T.; Petkowski, J. J.; Rizzo, G.; Benner, S. A.; Lui, M.; Cockell, C.; Eubanks, M.; Schulze-Makuch, D.; Temby, C.; Richburg, M. (2026). IMPRESS: A Planetary Penetrator Network for Astrobiology, Prospecting, and Exploration of Mars. Astrobiology 26(9), 688–699. DOI 10.1177/15311074261471218. Attached published paper inspected.
https://doi.org/10.1177/15311074261471218

2. Spohn, T.; Müller, N.; Knollenberg, J.; Grott, M.; Golombek, M. P.; Plesa, A.-C.; Bickel, V. T.; Morgan, P.; Krause, C.; Breuer, D.; Smrekar, S.; Banerdt, W. B. (2024). Mars Soil Temperature and Thermal Properties From InSight HP3 Data. Geophysical Research Letters 51(18), e2024GL108600. DOI 10.1029/2024GL108600. Published paper and DLR record inspected.
https://elib.dlr.de/210686/

3. Clifford, S. M.; Lasue, J.; Heggy, E.; Boisson, J.; McGovern, P.; Max, M. D. (2010). Depth of the Martian cryosphere: Revised estimates and implications for the existence and detection of subpermafrost groundwater. Journal of Geophysical Research 115, E07001. DOI 10.1029/2009JE003462. Publisher article inspected.
https://doi.org/10.1029/2009JE003462

4. Stroud, R. H., et al.; Exotech Systems, Inc. (April 1972). Contamination Control by Use of Ethylene Oxide: Technology Summary, Task 12. NASA-CR-126034; TR72-11; contract NASw-2062. NASA NTRS 19720013398. Historical report inspected; it is not a current approved FREYA process.
https://ntrs.nasa.gov/api/citations/19720013398/downloads/19720013398.pdf

5. Spacek, J.; Abraham, C. A.; Benner, S. A. (15 September 2026). The case for extant life on Mars: A Technical Reanalysis of the Viking Carbon Assimilation–Pyrolytic Release Experiment. The Primordial Scoop. Page identifies manuscript as a preprint submitted to Astrobiology. Interpretation remains contested, not a confirmed life detection.
https://primordialscoop.org/2026/09/15/capyr/

6. NASA TechPort project 184149. Reviewer-supplied project record. Retrieved page required JavaScript and supplied no project details; no maturity or performance claim is based on this record.
https://techport.nasa.gov/projects/184149

7. Sandvik Osprey. Osprey 4340 and Osprey 434 low-alloy steel datasheet, updated 14 September 2023. Wrought density 7.85 g/cm3 and conductivity 44.5 W/m K used for screening. Powder data and room-temperature strength are not qualification of a machined cold-impact chassis.
https://www.metalpowder.sandvik/en/products/metal-powder-alloys/low-alloy-steel/osprey-4340/?html-to-pdf=true

8. Epoxy Technology Inc., Meridian Adhesives Group (February 2021). EPO-TEK 301-2 Technical Data Sheet, Rev XVIII. Component specific gravities 1.15 and 0.95; 100:35 mass ratio. These imply about 1.09 g/cm3 before cure if volumes add. Model rounds to 1.10 g/cm3. Resin selection, cured density, shrinkage, assay compatibility and cryogenic impact response remain open.
https://products.meridianadhesives.com/storage/downloads/uennuicaaxt1bodtipkbpydtg0u8qs33/301-2.pdf

9. GomSpace. NanoCom AX100 product page, accessed 26 October 2026. Bare transceiver 24.5 g, 65 by 40 by 6.5 mm; operating range -30 to +85 C. Supports only a mass analogy; the 100 g FREYA packaged allocation is an engineering estimate. Hardware is not selected or qualified for penetrator shock.
https://gomspace.com/product/nanocom-ax100/

10. NASA (30 August 2022). NASA-STD-8719.27, Implementing Planetary Protection Requirements for Space Flight. Active baseline, change 0, as shown by NASA standards page accessed 26 October 2026. Mission authority determines applicable requirements and classification.
https://standards.nasa.gov/standard/NASA/NASA-STD-871927

11. NASA Planetary Protection Handbook, NTRS 20240016475. Inherited Revision 4 reference. Retrieval returned access error in this reassessment; detailed requirements were not inferred from unread text.
https://ntrs.nasa.gov/citations/20240016475

12. User-supplied FREYA expert review recorded 26 October 2026 in FREYA_Expert_Review_Addendum_2026-10-26.txt. Reviewer identity not explicitly supplied. Corrections, proposals and missing evidence are separated in this reassessment.
https://chatgpt.com/library?file_id=libfile_e9082a2bf0f08191bc9dac61d937194b&account_id=personal

13. Spacek, J., and coauthors (2026). Supplementary Information for IMPRESS: A Planetary Penetrator Network for Astrobiology, Prospecting, and Exploration of Mars. Tables S1–S3, 15 pages. DOI 10.1177/15311074261471218. Publisher supplement inspected through indexed PDF. Saved PDF is the freely available author-hosted supplementary tables revised 9 July 2026; byte identity with publisher file is not asserted. Author copy: https://impressmars.com/files/preprints/impress-preprint-supplementary-tables-s1-s2-s3-2026-07-09.pdf
https://journals.sagepub.com/doi/suppl/10.1177/15311074261471218/suppl_file/sj-pdf-1-asb-10.1177_15311074261471218.pdf

## Two kilogram reverse design
The 50 mm reference-sized case uses a 210 mm barrel and a 345 cm3 practical cavity. Standard hardware cannot close at 2 kg even with zero science. Reduced hardware uses a 0.15 kg battery, 2 m tether and smaller surface/deployment allocations. Maximum science is the lesser of 2/(1+contingency) minus non-science mass and the payload envelope capacity. At default density 2 kg/L the ceiling is 0.3085 kg, not a scientifically validated minimum. Compare energy, size, carrier mass and impact using nominal forebody mass.

## Supplement
Reference 13 identifies the publisher supplement and the saved author-hosted copy. Its instrument volume and readiness data inform the science packaging limits; version identity is not asserted.
