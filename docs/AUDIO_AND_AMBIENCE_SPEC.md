# Audio & Ambience Specification

Canonical pre-production contract for audio support in `Pygmalion Adventure`.

No audio files, UI, player, autoplay implementation, or story engine are created by this document.

## Canonical principle

`BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE`

`Pygmalion Adventure` is an interactive illustrated storybook / story adventure. Ambient sound is a gentle contextual layer of the book: it supports atmosphere while reading, changes with the environment, and never replaces readable story content.

The complete story must remain readable, understandable, decision-complete, and finishable with sound disabled. Critical information must never exist only in ambience, SFX, or optional story voice.

## Audio categories

These categories remain separate and must not be implemented as one undifferentiated audio logic:

- `AMBIENCE` – a long-running scene layer such as rain, market movement, footsteps, or evening street texture.
- `SFX` – a short one-shot event sound such as `flowers_fall`.
- `OPTIONAL STORY VOICE` – a readable story line with optional voice performance. The player-facing text remains primary.
- `LISTENING CHALLENGE` – pedagogically meaningful audio content explicitly attached to an `LCxx` challenge.

`AMBIENCE` and `SFX` are never required to understand or progress through ordinary story content. Listening challenges may make listening pedagogically necessary only within their explicit challenge rules.

## Chapter I ambience map

| Scene | Ambience ID | Context | Continuity / transition | Ducking |
|---|---|---|---|---|
| `ch01_s01` – Under the Portico | `covent_garden_rain_market` | Rain, distant market, footsteps, muted crowd movement at very low level. | Start after the first conscious story interaction; establish the continuous Chapter I rain/market group. | Standard level while reading; duck for optional story voice. |
| `ch01_s02` – The Fallen Flowers | `covent_garden_rain_market` | Same environment as `ch01_s01`. | Continue the existing track position; do not restart the loop on the ordinary scene transition. Layer `flowers_fall` once over it. | Pronounced ducking during LC01; standard ducking for optional story voice. |
| `ch01_s03` – The Notebook | `covent_garden_rain_market` | Rain and market remain present behind the notebook scene. | Continue the same rain/market track without a gap or restart. | Standard ducking for optional story voice. |
| `ch01_s04` – Higgins' Ear | `covent_garden_rain_market` | Same portico environment while the listening task begins. | Continue the same track. Do not create a new loop for the challenge. | Pronounced ducking during LC02; speech intelligibility has priority. |
| `ch01_s05` – A Window of Possibility | `covent_garden_evening_light_rain` | Weaker rain, distant market, calmer evening street/shop texture, gradual grounding rather than sentimental music. | Short gentle crossfade from `covent_garden_rain_market`; exact duration is intentionally not locked yet. | Standard ducking for optional story voice. |

The Chapter I ambience IDs are design identifiers, not generated files. Their future file paths remain subject to the asset naming convention in `docs/ASSET_PLAN.md`.

## Continuous ambience

The transitions `ch01_s01 → ch01_s02 → ch01_s03 → ch01_s04` use one continuous rain/market ambience group:

- do not restart the track during an ordinary scene transition;
- preserve time position and perceived continuity;
- avoid audible gaps;
- keep scene changes in story presentation independent from audio success or failure.

When the environment changes from `covent_garden_rain_market` to `covent_garden_evening_light_rain`, use a short, gentle crossfade rather than an abrupt stop/start. The exact crossfade length is not locked in pre-production.

## Autoplay strategy

Future implementation must not depend on audible autoplay that the browser may block on first load.

- Wait for the first conscious user interaction, such as `OPEN THE BOOK` or entry into story mode.
- After that interaction, ambience may start automatically when entering a scene if sound is enabled.
- If the browser still blocks playback, the story continues normally without a blocking error.
- The player may activate ambience manually later.

No autoplay implementation is part of this pass.

## Ducking strategy

Ambient level must automatically reduce when either of the following begins:

- `OPTIONAL STORY VOICE` – standard ducking;
- `LISTENING CHALLENGE` – more pronounced ducking.

After speech or the challenge sample ends, ambience returns smoothly to its previous level. Speech intelligibility always has priority over ambience. Ducking must not pause or restart the ambient track.

## Sound control and persistence

Future UI must provide a simple global `Sound` control or equivalent with ambience on/off. Story voice and listening controls remain separately contextual. This UI is not implemented in the current pre-production pass.

The sound preference should persist for the current session and, where appropriate, through a local setting between visits. A reduced or disabled ambience preference must never disable story text, navigation, decisions, or challenge access.

## Default level and loop quality

Ambient sound is intentionally quieter than speech. The target is:

`feel that it is raining while reading`

not:

`hear the rain clearly`

Future ambience files must loop cleanly, have no audible start/end seam, avoid a loud repeating event every few seconds, contain no distracting speech, and remain comfortable during extended reading. Prefer longer natural loops over short repetitive loops. Avoid loud rain, unnecessary thunder, musical overstatement, and fatigue-inducing repetition.

## Accessibility and reduced sensory mode

Ambient sound is always optional. With sound disabled, the following remain complete:

- story text and narration;
- navigation between scenes;
- decisions and consequences;
- challenges according to their own accessibility rules.

Listening challenges are the deliberate sound-dependent exception, but their accessibility support remains defined by the Teacher Mode and audio specifications. Story text must not be mislabeled as an accessibility transcript; the story text is the primary book content.

Future architecture should allow a `Reduced sensory mode` or equivalent that disables ambience, limits motion, and keeps story and challenges functional. It does not need to be implemented in the Chapter I vertical slice.

## Canonical references

- Player-facing source: `docs/chapters/ch01/SCRIPT.md`
- Chapter I audio mapping: `docs/chapters/ch01/AUDIO_PLAN.md`
- Game and accessibility rules: `../.codex/skills/pygmalion-adventure/references/game-design-rules.md`
- Teacher Mode contract: `docs/TEACHER_MODE_SPEC.md`
