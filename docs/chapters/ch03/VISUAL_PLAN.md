# Chapter III Visual Plan

Status: S01 PRE-PRODUCTION CONTENT LOCK; In Training source master Human Visual QA PASS. Two user-supplied source images are available; no presentation derivatives, runtime cutouts or runtime composition are created in this inventory pass. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. [SCRIPT.md](SCRIPT.md) owns story; the existing Eliza visual bible owns identity.

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
- ELZ-TR-FOCUSED, required S01: source/eliza_training_focused.png, presentation eliza_training_focused.webp, transparent runtime/eliza_training_focused_cutout.png in that same character root. Focused runtime cutout = NOT YET CREATED; focused source/presentation also remain uncreated. Focused learner with a natural hand near the mirror, not a frozen mouth caricature.
- ELZ-TR-PRACTICING, optional only if focused cannot carry the activity: matching source/presentation/runtime filenames using practicing. No second face identity.

Alt intent for the future focused variant: “Eliza in practical indoor lesson clothes, concentrating on a small mirror while practising a sound.” All future derivatives must preserve the approved canonical source identity and natural edges. Master human approval is complete; future focused/practicing artwork and composition approval remain pending.

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

Reuse the story renderer, renderDecision, state/event store, AudioManager, challenge infrastructure, existing Teacher Mode dialog, replay/preview safety and responsive image layers. No Chapter III AudioManager/state store/Teacher/decision system/isolated save. Master Human Visual QA and Flower Girl identity continuity are approved. Open production gates: focused creation/approval, optional practicing need, integrated mirror/card/diagram treatment, foreground masking and exact viewport QA. These do not reopen the locked story/identity brief.

## Later Chapter III – NOT YET LOCKED

Only [scene-map](../../SCENE_MAP.md) intent: S02 player/order cards/listening; S03 simulated flower stall/practicing; S04 hallway/controlled; S05 lesson room/frustrated; S06 shop or stall/encouraged. Later location choice, poses, paths and compositions remain unlocked.
