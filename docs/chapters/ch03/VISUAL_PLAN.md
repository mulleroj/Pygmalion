# Chapter III Visual Plan

Status: S01 PRE-PRODUCTION CONTENT LOCK; In Training source master Human Visual QA PASS. Master and coat sources are available; focused source and byte-identical runtime cutout are created and technically approved. Focused Human Visual QA PASS; approved for Chapter III S01 runtime use. S01 book-first runtime composition has passed Human Visual QA. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. [SCRIPT.md](SCRIPT.md) owns story; the existing Eliza visual bible owns identity.

## Scene-derived stage

For all ch03_* scene metadata: visualStage = "in_training". No persistent eliza_stage, additional save store or migration for this presentation choice. Chapter II threshold foreshadows the phase; S01 begins actual training.

## Eliza — In Training canonical master brief

Identity authority: assets/images/characters/eliza/eliza_flower-girl_master.webp and its source PNG. Preserve exact recognisable face, hair colour/texture, age, proportions and lively expression. Practical, simply fitted indoor lesson clothing with modest Edwardian layers; recognisable unchanged hair, only naturally arranged for work. No glamour transformation, aristocratic pose, Chapter V polished clothing or copied musical/film likeness. Concentration coexists with old spontaneity; no sudden personality change.

## Approved source inventory and reference hierarchy

Both supplied files passed PNG integrity verification and full decode on 2026-10-01. Both are RGBA with alpha range 0–255. Filenames are normalised; SHA-256 before and after rename matches for each file. The supplied images remain byte-for-byte unchanged; no crop, resize, re-encode or conversion is performed.

| Role | Actual available source path | Dimensions | Status |
|---|---|---|---|
| ELZ-TR-MASTER | `assets/images/characters/eliza/source/eliza_training_master.png` | 1112 × 1415 | CANONICAL Chapter III In Training identity, body and wardrobe reference; Human Visual QA PASS; identity continuity with Flower Girl master approved by human review |
| Supporting coat reference | `assets/images/characters/eliza/source/eliza_training_coat_reference.png` | 1055 × 1491 | APPROVED / SUPPORTING wardrobe and pose reference for later Chapter III composition |

Canonical filenames are now `eliza_training_master.png` and `eliza_training_coat_reference.png` in the source directory. Both paths exist; naming normalisation changed no image bytes.

The canonical In Training master always takes precedence for facial identity, hair identity, age, body proportions and general In Training appearance. The coat image may support outdoor, hallway or transition composition, a cooler/rainy scene, or a future pose derivation. It must never independently redefine Eliza's identity or replace the canonical master. These uses do not lock any later scene or require a new asset now.

Presentation / pose backlog:

- ELZ-TR-MASTER: approved source assets/images/characters/eliza/source/eliza_training_master.png; presentation assets/images/characters/eliza/eliza_training_master.webp is NOT YET CREATED.
- ELZ-TR-FOCUSED, required S01: source `assets/images/characters/eliza/source/eliza_training_focused_cutout.png`; runtime `assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png`. Focused cutout = CREATED / TECHNICALLY APPROVED / APPROVED FOR CHAPTER III S01 RUNTIME USE. Human Visual QA PASS; approved for Chapter III S01 runtime use. No WebP is created or required by this ingestion step.
- ELZ-TR-PRACTICING, optional only if focused cannot carry the activity: matching source/presentation/runtime filenames using practicing. No second face identity.

Focused asset alt intent: “Eliza in practical indoor lesson clothes looks attentively to one side, with one hand lightly near her chin.” The supplied variant is accepted as derived from canonical `eliza_training_master.png` for visual continuity: same identity, hair, apparent age, body proportions and In Training outfit; only expression, gaze and learner-focus pose differ. No props, hat, coat or polished styling. Master human approval is complete; focused final scene composition Human Visual QA PASS; approved for Chapter III S01 runtime use.

Focused technical QA on 2026-10-01: PNG RGBA, 1024 × 1536, alpha range 0–254; integrity verification and full decode PASS. Light and dark composites in `qa/ch03/` show natural fine hair edges without the previous continuous brown studio halo; shoulders and clothing edges are usable. Full body, hands and both boots are present, without obvious gross anatomy defects. Original import was renamed without re-encoding and copied byte-for-byte to runtime. Source/runtime SHA-256: `3bb0ecc0744f76c765d46289a8eab36c18c4bbd3be0f3f07e4d3f086013dcb76`. This records technical visual inspection, not final human composition approval. The exact untracked rejected .png.png source candidate was removed during S01 implementation; it is not assigned to runtime.

## Location reuse after visual inspection

Inspected locally on 2026-10-01: assets/images/locations/ch02/ch02_higgins-study.webp, LOC-CH02-HIGGINS-STUDY, 1672 × 941. Morning window light, books, fireplace and substantial desk fit Higgins's lesson room/study. Reuse the exact approved plate; no new background required for S01. Desk and foreground chair occupy large central/lower regions: a character cannot simply be pasted over them without believable occlusion. Small book lettering is decorative only.

## Composition brief

Hierarchy: Eliza learner focus → integrated mirror/card → Higgins supporting instructor. Eliza near the window-side work area, Higgins across the desk toward its right/back edge. Pickering may remain smaller in depth; Mrs Pearce's brief entrance is readable in text and need not force a fourth focal figure. Reuse existing approved supporting masters/cutouts, with natural scale, eye-lines and floor/contact shadows.

Preserve source plate pixels. Position figures on visible floor planes or behind the desk with a presentation-only foreground occlusion mask where needed. Do not cover the desk with transparent torsos or float feet over furniture. If existing instructor cutout pose cannot fit, revise blocking before requesting another pose; no new instructor identity.

Mirror and phonetic card belong on/near the desk with appropriate perspective. A labelled mouth-position reference can sit beside the readable activity as a learning diagram, not a rectangular prop photo. Show tongue/front teeth vs lower lip/upper teeth with readable text labels and accessible description. The diagram is not an animation requirement and never the only source of the explanation. Props/diagram assets are PLANNED, not available.

- Desktop (1024 px and wider): broad plate, Eliza dominant window-side, Higgins secondary, mirror/card preserved; adjacent/below readable story and activity. Verify desk occlusion and natural feet/scale in the actual composition.
- Tablet (600–1023 px): retain both main figures and the prop using a scene-specific crop; reduce optional background figures before shrinking Eliza or teaching labels.
- Mobile (below 600 px, including 390 px QA): Eliza and lesson context take priority, Higgins can become a partial supporting presence. Use a deliberate focal crop or full-width shorter plate when a tall crop would lose support; diagram/instructions remain full-width readable below art. No floating cutouts, horizontally clipped labels or obstructed choices.
- These are planned composition breakpoints, not claims of existing QA. Keep existing responsive image-layer system, decorative pointer-events behaviour, keyboard/touch access and reduced-motion rules. Decorative art layers are not clickable controls.

Without sound, mirror, text and labels make the lesson understandable; no critical meaning depends on colour or moving mouth frames. Final composition/crop checks require the future In Training assets.

## Architecture guardrails and remaining gates

Reuse the story renderer, renderDecision, state/event store, AudioManager, challenge infrastructure, existing Teacher Mode dialog, replay/preview safety and responsive image layers. No Chapter III AudioManager/state store/Teacher/decision system/isolated save. Master Human Visual QA and Flower Girl identity continuity are approved; focused source/runtime cutout creation and technical QA are complete. S01 composition, mouth-position reference, foreground masking and responsive layout have passed Human Visual QA. Optional practicing need remains a future consideration. These do not reopen the locked story/identity brief.

## Later Chapter III – NOT YET LOCKED

S03 uses the Higgins study/lesson room specified below. S04 and S05 reuse the study/lesson room as specified below. S06 A Small Victory is PRE-PRODUCTION CANON LOCKED below and reuses this setting; later Chapter III poses, paths and compositions remain unlocked.

## S01 book-first runtime composition checkpoint

S01 reuses the approved Chapter II study plate and canonical Higgins runtime cutout with the focused Eliza runtime PNG. Eliza is the main full-body learner on the window-side floor; Higgins supports from behind the desk with a presentation-only foreground mask. The mouth-position reference is accessible text beside the activity; no new image or audio is created. D06 and transcript-supported LC05 use the existing renderer, state, challenge and Teacher dialog. Chapter III ambience is explicitly silent in this checkpoint pending later audio integration. Human Visual QA PASS; approved for Chapter III S01 runtime use.

Technical responsive QA: 1440 × 1000, 1024 × 900 and 390 × 844 inspected in the local browser. Full-body Eliza, supporting desk-occluded Higgins, readable activity, clickable D06/LC05 and no horizontal overflow confirmed. Art layers retain pointer-events: none. Screenshots remain untracked in qa/ch03/. The technical QA is now followed by Human Visual QA PASS for S01 composition and the focused asset.



## ch03_s02 — VISUALS — PRE-PRODUCTION CANON LOCKED

Documentation only; NOT IMPLEMENTED. visualStage = in_training. Reuse approved assets without editing pixels:

- assets/images/locations/ch02/ch02_higgins-study.webp.
- assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png.
- assets/images/characters/higgins/runtime/higgins_master_cutout.png.
- Accessible text/order-card UI and existing responsive book composition/desk occlusion.

Existing study plate approved for initial S02 composition; final lighting/time-of-day impression remains subject to Human Visual QA.

New character visual asset: NOT REQUIRED. Eliza remains learner focus, Higgins supporting instructor; Pickering presence is readable in story text. Canonical training master remains identity/body/wardrobe authority; no coat/polished styling. No new phonograph image: scene-map playback device can use shared accessible audio controls. BOTH word/meaning alternatives appear equally; sample titles never disclose which target was spoken. No colour-coded correct card or decorative clue.

Reuse pointer-events:none art, floor/contact/desk-mask conventions, static reduced-motion rendering and responsive book flow. Keyboard/focus can reach replay/support/choices/Submit/Continue independently of art. No horizontal overflow. Do not generate a new plate merely for afternoon; review time-of-day impression during actual S02 Human Visual QA.

## ch03_s03 — VISUALS — PRE-PRODUCTION CANON LOCKED

Documentation only; NOT IMPLEMENTED. `visualStage = in_training`, derived from scene metadata. BOOK FIRST and reuse the approved Chapter III environment and character system:

- Approved Higgins study/lesson-room plate: `assets/images/locations/ch02/ch02_higgins-study.webp`.
- Approved Eliza training focus: `assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png`.
- Reuse Higgins cutout `assets/images/characters/higgins/runtime/higgins_master_cutout.png` where composition needs him.

No new character asset is required absent a genuine visual blocker. Eliza remains the learner focus; preserve approved face and training stage. Integrate a small word/syllable practice element into the existing book/challenge page area, not an LMS worksheet. All syllables begin with identical styling; no visual answer clue before response. After target-revealing support opens, visual stress marking/explanation is allowed. Reuse responsive book composition, desk occlusion and art-layer conventions. Keyboard/touch access to replay, choices, support, submit/retry and Continue stays independent of decorative art. Keep desktop/mobile responsive, avoid horizontal overflow and respect reduced motion. Do not touch Chapter I/II visual regressions in this task.

## ch03_s04 — VISUALS — S04 PRE-PRODUCTION CANON LOCKED; RUNTIME VISUAL QA PASS

The approved visual implementation is in place; Human Visual QA = PASS as confirmed by the human reviewer. No visual changes are included in this audio integration. `visualStage = in_training`, derived from scene metadata. Preserve the book-first Chapter III composition and reuse the approved study plate, Eliza focused training cutout, Higgins cutout, desk occlusion and existing responsive image-layer system. No new character, location, illustration, diagram or visual asset is required.

The scene stays in Higgins's study/lesson room. Keep Eliza as the learner focus and Higgins as the supporting instructor. Show the two demonstration sentences as readable story text integrated into the book composition; this is not a worksheet or LMS panel. Keep D07 as a compact story choice in the same established narrative presentation. LC08's three readable sentence samples and focus-word controls belong within the existing book/challenge composition, visually integrated with the chapter's established design.

Before each answer, all target words and controls have identical neutral styling: no capitalization, bold, size, colour, underline, icon, background, selection or other focus cue. The Higgins demonstration uses a sentence absent from LC08 targets. After target-revealing support opens, the interface may identify the focus word clearly in text as well as visually; do not rely on colour alone. Supported Practice should read as a continuation of the book activity, not a new LMS panel. Correct/incorrect feedback, retained correct answers, retry and explicit Continue must be understandable and keyboard/touch accessible.

Reuse the approved plate `assets/images/locations/ch02/ch02_higgins-study.webp`, Eliza cutout `assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png` and, where composition needs him, Higgins cutout `assets/images/characters/higgins/runtime/higgins_master_cutout.png`. Keep scene-specific blocking and styling within S04; do not change global positioning/z-index, Chapter I/II CSS, or S01–S03 composition. Preserve desk occlusion, natural contact with the floor/furniture, reduced-motion behavior, pointer-events on decorative art, visible keyboard focus, and no horizontal overflow across desktop, tablet and mobile. Existing implementation and reported visual QA status are recorded above.

## ch03_s05 — VISUALS — S05 PRE-PRODUCTION CANON LOCKED

BOOK FIRST; `visualStage = in_training`. Reuse the approved Higgins study/lesson-room plate, approved Eliza training cutout and Higgins cutout where composition needs him. No Mrs Pearce appearance or new character asset is required. Create a quieter S05-scoped composition through pacing and negative space: Eliza may sit or appear lower only if an existing approved asset supports that pose; otherwise retain the approved cutout without fabricating posture. A subtly tense/tired impression may come from spacing and scene-specific blocking, never a dramatic dark filter or a new “sad Eliza” asset. Keep the book readable and Eliza the active learner focus.

Show each LC09 sentence and its selectable word boundaries in the existing book/challenge composition, not a waveform, draggable timeline, complex editor or LMS panel. Before response every split point, control and focus/hover state is neutral and identical; no comma, spacing, line break, colour, bold, icon or preselection reveals the key. The exact target divider is absent from every unaided state and appears only after the learner explicitly opens target-revealing Supported Practice. After it opens, show the keyed split and the exact plain-language explanation in SCRIPT.md. Preserve responsive flow, keyboard/touch access, visible focus, reduced-motion behavior and no horizontal overflow. Scope any later styling to S05; do not touch Chapter I/II regressions or alter shared architecture.

## ch03_s06 — VISUALS — S06 PRE-PRODUCTION CANON LOCKED

BOOK FIRST; `visualStage = in_training` remains scene metadata. Keep S06 in the approved Higgins study/lesson room and reuse the existing plate, Eliza focused training cutout and Higgins cutout. Mrs Pearce is established by visible dialogue from the next room; no new person, character art or victory pose is needed.

Differentiate the scene gently from S05 through a slightly more open composition and calmer spacing. Eliza remains the learner focus and the same person in Chapter III Conscious Training. Do not switch to a Chapter IV outfit/voice-stage, create a polished transformation, add glow/confetti/achievement imagery, or treat her accent as a flaw. Her success is the agency to notice and repair a line herself.

Keep the practical exchange, LC10 situations, visible choices, replay and any explicitly opened support in the familiar storybook flow. Before response, no transcript, punctuation, typography or visual marker reveals LC10's repaired message. After target-revealing support, show the relevant text plainly, not by colour alone. Maintain the existing responsive image layers, desk occlusion, keyboard/touch access, visible focus, reduced-motion behavior and no horizontal overflow. No new visual asset or system is planned.
