# FREYA Mars Exploration Lab

Published release: Sites version 39 · 19 November 2026.

- [Live FREYA website](https://freya-revision-4.mifecoinc.chatgpt.site)
- [Current website source and published build](website/)
- [FREYA Requirements Specification Rev 10 (PDF)](website/documents/FREYA_Requirements_Specification_Rev10.pdf)
- [FREYA Requirements Specification Rev 10 (editable Word document)](website/documents/FREYA_Requirements_Specification_Rev10.docx)

The current website snapshot comes from Sites source commit `f2d0c2d369177d9f8796b207eaba7b5381a289f4`. Run `npm test` or `npm run dev` from `website/`. Serve `website/dist/` with a static HTTP server to view the published build. The lab includes trade studies, the Benner science package, requirements traceability, the optimizer, and annotated calculation dialogs.

## Revision 8 archive

[Archived Revision 8 simulator](https://freya-revision-4.abuzzpixie66.chatgpt.site)

[Revision 8 source, reports and original package](revision8/)

Revision 8 release: 3D-style mission visualization with automatic release zoom and numeric telemetry. PDF and editable Word reports are retained alongside searchable Markdown copies and SHA-256 checksums. The original imported package is preserved unchanged. The published HTML adds report links and retains access to the Revision 7 website and evidence reader.

This is a preliminary concept simulator. Mission timing and engineering screens are illustrative, not calibrated flight predictions or hardware qualification.

Validation: six Node checks pass, including numeric control bounds, link distance scaling, mass/power response, and report links. Browser verification confirms jump-to-release and automatic close-up.
