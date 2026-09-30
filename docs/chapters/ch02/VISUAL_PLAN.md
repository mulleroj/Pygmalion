# Chapter II Visual Plan – The Bargain

Pre-production visual plan for the Chapter II content lock. The approved environment sources and four technical scene-plate derivatives are now ingested; no character composite or Chapter II runtime change is part of this pass.

## Visual direction

Chapter II uses the Chapter I composition standard:

scene plate + transparent character(s) + integrated props

The page should read as one illustrated storybook composition. Do not use character cards, rectangular character photographs, or rectangular prop photo tiles.

Eliza remains the same canonical Flower Girl identity. Chapter II shows agency, attention, and a gradual move toward In Training; it does not show a sudden makeover or a poor girl → proper lady transformation.

## Shared continuity rules

- Reuse the approved Eliza Flower Girl face, hair, age, proportions, and clothing base.
- Reuse the approved Higgins and Pickering identity masters.
- Mrs Pearce uses the approved canonical master and four approved expression variants listed below.
- Canonical source PNGs remain the identity authority; transparent runtime derivatives are presentation-only and must not alter the character identity.
- Keep the composition to two or three primary focal points.
- Background figures and supporting characters must not visually encode intelligence or moral worth.

## Canonical Chapter II environment plates

Follow the Chapter I location pattern: approved PNG originals in `assets/images/locations/ch02/source/`, uncropped WebP presentation plates in `assets/images/locations/ch02/`. The four primary environment sources are `APPROVED / CANONICAL` and their WebP derivatives are `TECHNICALLY VERIFIED`. The fifth source is `APPROVED / SUPPORTING` and has no Chapter II runtime plate. See `CH02_VISUAL_ASSET_MANIFEST.md` for original filenames, dimensions, byte sizes, hashes, accessibility descriptions and import cleanup.

| Asset ID | Canonical source PNG | Technical WebP plate | Scene use |
|---|---|---|---|
| `LOC-CH02-HIGGINS-HOUSE-EXTERIOR` | `assets/images/locations/ch02/source/ch02_higgins-house-exterior.png` | `assets/images/locations/ch02/ch02_higgins-house-exterior.webp` | `ch02_s01` |
| `LOC-CH02-HIGGINS-STUDY` | `assets/images/locations/ch02/source/ch02_higgins-study.png` | `assets/images/locations/ch02/ch02_higgins-study.webp` | `ch02_s02` and `ch02_s04` — exact same plate |
| `LOC-CH02-HIGGINS-HOUSE-HALLWAY` | `assets/images/locations/ch02/source/ch02_higgins-house-hallway.png` | `assets/images/locations/ch02/ch02_higgins-house-hallway.webp` | `ch02_s03` |
| `LOC-CH02-LESSON-ROOM-THRESHOLD` | `assets/images/locations/ch02/source/ch02_lesson-room-threshold.png` | `assets/images/locations/ch02/ch02_lesson-room-threshold.webp` | `ch02_s05` |
| `LOC-CH02-KITCHEN-SUPPORTING` | `assets/images/locations/ch02/source/ch02_kitchen-supporting.png` | — | reserve only; no additional Chapter II scene |

The scene plate is the environmental base layer under transparent characters and integrated props. It must not be displayed as a framed image, card, inset or decorative thumbnail. The approximate placement areas below refer to the full 1672 × 941 source frame and require a separate responsive crop check during later composition.

## Mrs Pearce canonical visual asset set

All five source assets represent the same mature Edwardian Mrs Pearce. The master and expression variants are `APPROVED / CANONICAL`; the runtime derivatives are `TECHNICALLY VERIFIED` transparent presentation derivatives. No additional Mrs Pearce expression variants are required for Chapter II.

| Asset ID | Variant | Source path | Runtime derivative | Status | Alt text |
|---|---|---|---|---|---|
| `MRS-FG-MASTER` | master | `assets/images/characters/mrs-pearce/source/mrs-pearce_master.png` | `assets/images/characters/mrs-pearce/runtime/mrs-pearce_master_cutout.png` | source `APPROVED / CANONICAL`; derivative `TECHNICALLY VERIFIED` | Mrs Pearce, a mature Edwardian housekeeper with a calm, firm expression. |
| `MRS-FG-PRACTICAL-QUESTIONING` | practical-questioning | `assets/images/characters/mrs-pearce/source/mrs-pearce_practical-questioning.png` | `assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png` | source `APPROVED / CANONICAL`; derivative `TECHNICALLY VERIFIED` | Mrs Pearce, a mature Edwardian housekeeper, gestures with a calm, practical questioning expression. |
| `MRS-FG-OBSERVANT-SUPPORT` | observant-support | `assets/images/characters/mrs-pearce/source/mrs-pearce_observant-support.png` | `assets/images/characters/mrs-pearce/runtime/mrs-pearce_observant-support_cutout.png` | source `APPROVED / CANONICAL`; derivative `TECHNICALLY VERIFIED` | Mrs Pearce, a mature Edwardian housekeeper, watches attentively with a calm, supportive expression. |
| `MRS-FG-FAIRNESS-MONITORING` | fairness-monitoring | `assets/images/characters/mrs-pearce/source/mrs-pearce_fairness-monitoring.png` | `assets/images/characters/mrs-pearce/runtime/mrs-pearce_fairness-monitoring_cutout.png` | source `APPROVED / CANONICAL`; derivative `TECHNICALLY VERIFIED` | Mrs Pearce, a mature Edwardian housekeeper, observes the terms with a calm, measured expression. |
| `MRS-FG-QUIET-APPROVAL` | quiet-approval | `assets/images/characters/mrs-pearce/source/mrs-pearce_quiet-approval.png` | `assets/images/characters/mrs-pearce/runtime/mrs-pearce_quiet-approval_cutout.png` | source `APPROVED / CANONICAL`; derivative `TECHNICALLY VERIFIED` | Mrs Pearce, a mature Edwardian housekeeper, offers quiet approval with a gentle, composed expression. |

## ch02_s01 – The Door She Chooses

- Location/background: `LOC-CH02-HIGGINS-HOUSE-EXTERIOR` (`assets/images/locations/ch02/ch02_higgins-house-exterior.webp`); Edwardian townhouse entrance in clear morning light, with steps and readable black door.
- Primary character: Eliza, determined and slightly nervous, still clearly Flower Girl.
- Secondary character: Mrs Pearce framed by the doorway; Higgins only a distant partial presence.
- Mrs Pearce asset: `MRS-FG-PRACTICAL-QUESTIONING` (`practical-questioning`).
- Props: door knocker, Eliza's flower basket (already part of her canonical cutout), simple entry table.
- Hierarchy: Eliza → doorway → Mrs Pearce.
- Composition: Eliza occupies the readable foreground; the doorway represents access without becoming a magical threshold.
- Provisional placement on the full plate: Eliza on lower-left pavement (about 30–48% of frame width), Mrs Pearce beside the steps/entrance (about 55–68%). Preserve the black door and its upper surround; confirm both figures fit the later tall viewport crop.

## ch02_s02 – Terms on the Table

- Location/background: `LOC-CH02-HIGGINS-STUDY` (`assets/images/locations/ch02/ch02_higgins-study.webp`); Higgins's book-filled workroom with one integrated desk, fireplace and soft indoor daylight. This exact plate is reused in `ch02_s04`.
- Primary characters: Eliza first, Higgins second.
- Secondary characters: Pickering and Mrs Pearce partly in the background or at the edge of the composition.
- Mrs Pearce asset: `MRS-FG-OBSERVANT-SUPPORT` (`observant-support`).
- Props: papers, notebook, cup, early terms sheet.
- Hierarchy: Eliza → terms table → Higgins; Pickering and Mrs Pearce support the conversation without equal visual weight.
- Expression/state: Eliza guarded but engaged; Higgins analytical; Pickering observant; Mrs Pearce practical.

The four characters must not form four equal portrait panels. Use blocking and depth to make Eliza's position in the negotiation legible.

Provisional placement on the full plate: Eliza near the left side of the desk (about 20–38% of frame width), Higgins behind or to the right of it (about 62–78%); Pickering and Mrs Pearce remain smaller supporting figures in depth. The desk already occupies much of the foreground, so four-person blocking needs particular care in a tall crop; keep the shelves and fireplace legible.

## ch02_s03 – Mrs Pearce's Questions

- Location/background: `LOC-CH02-HIGGINS-HOUSE-HALLWAY` (`assets/images/locations/ch02/ch02_higgins-house-hallway.webp`); warm Edwardian hall with staircase and an open view toward the kitchen/service area. The separate kitchen image is supporting reserve only, not this scene's main plate.
- Primary characters: Mrs Pearce and Eliza.
- Secondary character: Higgins may appear only at the doorway as a partial support figure.
- Props: schedule, cup, chair, household table.
- Hierarchy: Mrs Pearce and Eliza → written schedule → doorway.
- Expression/state: Mrs Pearce firm and humane; Eliza attentive and increasingly direct.
- Mrs Pearce asset: `MRS-FG-PRACTICAL-QUESTIONING` (`practical-questioning`), reused from `ch02_s01`.
- Provisional placement on the full plate: Eliza on the lower hall floor left of centre (about 30–45% of frame width), Mrs Pearce nearer the kitchen-side doorway (about 52–68%). Keep both the stair depth and part of the kitchen opening readable; a centered tall crop may reduce the latter.

## ch02_s04 – The Price of a Lesson

- Location/background: reuse the exact `LOC-CH02-HIGGINS-STUDY` plate (`assets/images/locations/ch02/ch02_higgins-study.webp`) from `ch02_s02`. A later composition may use a different crop or focal arrangement, but no second study background is needed.
- Primary characters: Eliza, the visible agreement/terms, Higgins.
- Secondary characters: Pickering and Mrs Pearce as quiet support at the edge.
- Props: coins, pen, terms card, clock, phonetic notes.
- Hierarchy: Eliza → agreement/terms → Higgins.
- Expression/state: Eliza boundary-setting; Higgins focused; Pickering supportive; Mrs Pearce monitoring practical fairness.
- Mrs Pearce asset: `MRS-FG-FAIRNESS-MONITORING` (`fairness-monitoring`).

The agreement is an integrated prop within the scene, not a separate prop photograph.

Provisional placement: reserve the central desk and terms area for the visible agreement; place Eliza and Higgins on opposite sides and keep Pickering and Mrs Pearce secondary. Use the same underlying study pixels as `ch02_s02`.

## ch02_s05 – Why I Am Here

- Location/background: `LOC-CH02-LESSON-ROOM-THRESHOLD` (`assets/images/locations/ch02/ch02_lesson-room-threshold.webp`); view through an open doorway into the lesson room in warm afternoon light.
- Primary character: Eliza at the threshold, thoughtful and purposeful.
- Secondary characters: Higgins, Pickering, and Mrs Pearce behind her or softened by depth.
- Props: open door, visible lesson materials, folded schedule.
- Hierarchy: Eliza → open threshold → lesson room.
- Expression/state: still Flower Girl identity with a controlled, early-training posture.
- Mrs Pearce asset: `MRS-FG-QUIET-APPROVAL` (`quiet-approval`).
- Provisional placement on the full plate: Eliza in the lower centre-left foreground (about 30–48% of frame width), with Mrs Pearce and/or Higgins smaller behind or to the right (about 58–75%). Do not hide the doorway. Its side jambs are near the outer edges of the wide source and would be lost in a centered tall `object-fit: cover` crop; preserve a readable threshold when the responsive composition is built.

The actual In Training stage change belongs to the transition into ch03_s01; scene 5 only foreshadows it.

## Supporting kitchen and environment QA

`LOC-CH02-KITCHEN-SUPPORTING` is a human-approved source-only reserve for visual continuity, Teacher Mode or a later composition. It is not assigned to `ch02_s03` as a replacement plate and creates no additional Chapter II scene.

The exterior, study, hallway, threshold and kitchen share period materials and warm natural light. The staircase, runner and doorway visible from the kitchen and hallway are consistent. No people, obvious modern objects or major perspective failures were observed. Small wall-map lettering in the threshold plate is not reliably legible and must not carry story or learning information. The environment continuity check passes; final cutout blocking and responsive crop safety remain to be checked when Chapter II composition is authorized.

## Mrs Pearce visual continuity

The imported set is the approved canonical identity lock. Every variant retains the same face, approximate age, hair, Edwardian clothing, proportions, and body shape. The runtime derivatives remove only the neutral source background and retain the original canvas size; they are intended for transparent storybook compositing and are not new character generations.

Visual QA completed on light and dark neutral backgrounds: hair and lace edges retained, hands and apron retained, and no intentional crop or resize. Chapter II background plates are now available, but a composed interior scene has not yet been built or approved.

## Asset planning backlog

- Eliza expression variants for determined, guarded, attentive, boundary-setting, and purposeful states;
- integrated door, schedule, terms, coins, pen, clock, and household props.

No additional Mrs Pearce artwork is required for the Chapter II vertical slice.

All future artwork must be original, locally owned, accessible through alternative descriptions, and free of copied film likenesses or My Fair Lady staging.
