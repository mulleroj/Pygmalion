# Chapter I Audio Plan – The Flower Girl

Supporting audio plan derived from the canonical player-facing script. The Chapter I production set is generated, local, and technically verified; human listening approval is recorded per asset below.

## Book-first contract

`BOOK FIRST → AUDIO ENHANCED`

Canonical audio chain: `BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE`.

- `docs/chapters/ch01/SCRIPT.md` is the primary story content. Its narration and dialogue must remain readable and sufficient to complete Chapter I with sound disabled.
- Ordinary story dialogue may receive an `OPTIONAL STORY VOICE` recording. Audio adds personality, pronunciation support, or atmosphere; it does not replace the visible story text.
- Only explicit listening challenges, currently `LC01` and `LC02`, may make listening pedagogically necessary. Their challenge rules determine transcript availability; a story text line is not automatically an accessibility transcript.
- Atmosphere and SFX are optional enhancement and never carry critical information required for story progress.
- Canonical ambience behavior (autoplay, continuity, crossfade, ducking, sound control, persistence, loop quality, and accessibility) is defined in [`docs/AUDIO_AND_AMBIENCE_SPEC.md`](../../AUDIO_AND_AMBIENCE_SPEC.md).

## Chapter I contextual ambience map

| Scene | Ambience ID | Behavior |
|---|---|---|
| `ch01_s01` | `covent_garden_rain_market` | Start after first conscious story interaction; low rain, distant market, footsteps, and muted crowd. |
| `ch01_s02` | `covent_garden_rain_market` | Continue without restart; play `flowers_fall` once over the ambience. Pronounced ducking during LC01. |
| `ch01_s03` | `covent_garden_rain_market` | Continue the same rain/market ambience without a gap. |
| `ch01_s04` | `covent_garden_rain_market` | Continue the same ambience; pronounced ducking during LC02 for speech intelligibility. |
| `ch01_s05` | `covent_garden_evening_light_rain` | Short gentle crossfade to weaker rain, distant market, and calmer shop/street ambience. Crossfade duration is not locked. |

These IDs are canonical design identifiers and map to the local runtime files documented below.

## Production rules

- Chapter I uses Eliza Voice Arc Stage 0d – Raw / Hysterical Cockney; the canonical reference and exact rules are in [docs/audio/ELIZA_VOICE_ARC.md](../../audio/ELIZA_VOICE_ARC.md).
- Eliza uses `Eliza - young_cockney`, voice ID `124kaYCknTDsnwUFdWl9`, model `eleven_v3`.
- Eliza BEFORE delivery: young, lively, defensive, quick, with strong Cockney delivery.
- Higgins canonical voice is `Kelvin - Calm Young British Male`, voice ID `JlptfLxaUpd8pZcw9dKd`, model `eleven_v3`.
- A05 and A06 now use the canonical Kelvin Higgins voice; A06 human listening status remains `HUMAN QA PENDING`.
- Pickering uses `George - Warm, Captivating Storyteller`, voice ID `JBFqnCBsd6RMkjVDRZzb`, model `eleven_v3`.
- Freddy uses `Ned - Casual, Young British Male, General Southern Accent`, voice ID `fNYuJl2dBlX9V7NxmjnV`, model `eleven_v3`.
- LC02 production casting is assigned: `LC02-01` uses voice ID `vBRU4ztAu1MfP8arDoB3` for a polite work request; `LC02-02` uses `Hugo` / `WAppqUXeqDqXjNTaQxG9` for an informal market instruction; `LC02-03` uses `Ruby` / `Q6HPFg7bazU61NeyrvBp` for a formal information request. The previously considered Ali is not canonical and is not a production voice.
- Every pedagogically important audio item has a visible transcript and replay.
- Audio moment and audio file are not one-to-one. LC01 has three files and LC02 has three files.
- Technical status for every item below is `GENERATED / LOCAL / TECHNICALLY VERIFIED`.
- Human listening status is tracked per item: A04, A05, and A06 are `HUMAN QA APPROVED`; the remaining unreviewed items remain `HUMAN QA PENDING`.

## VOICE and story audio

### A01 – Rain and market bed

- Asset ID: `AM01`
- Scene: `ch01_s01`
- Category: `AMBIENCE`
- Audio role: `ATMOSPHERE / SFX`
- Ambience ID: `covent_garden_rain_market`
- Continuity group: `ch01_s01`–`ch01_s04`; do not restart at ordinary scene transitions
- Speaker: none
- Text/transcript: No speech. Rain on paving, covered market movement, distant calls, footsteps.
- Delivery direction: Keep the portico readable; rain must support, not cover, dialogue.
- Voice ID: not applicable
- Expected path: `assets/audio/ambience/covent-garden-rain-market-001.mp3`
- Replay required: no
- Transcript required: no speech transcript; provide a content label in the manifest
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A02 – Eliza sales pitch

- Asset ID: `AM02`
- Scene: `ch01_s01`
- Category: `VOICE`
- Audio role: `OPTIONAL STORY VOICE`
- Speaker: Eliza
- Text/transcript: “Flowers, sir? Fresh ones! Ain't no sense standin' there in the rain. Go on. A flower'll make the room look kinder. Two for a penny, they are. I'll pick you the bright ones.”
- Delivery direction: Quick, bright, practical, and alert. Sales energy, not a comic caricature.
- Voice ID: `124kaYCknTDsnwUFdWl9` (`Eliza - young_cockney`); model `eleven_v3`
- Expected path: `assets/audio/characters/eliza/eliza_ch01_scene01_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Verified duration: `~11.26 s`
- Verified file size: `197020 B`
- Content verification: clean MP3 containing canonical Eliza dialogue only; no spoken direction
- Human listening status: `HUMAN QA PENDING`

### A03 – Freddy’s apology

- Asset ID: `AM03`
- Scene: `ch01_s02`
- Category: `VOICE`
- Audio role: `OPTIONAL STORY VOICE`
- Speaker: Freddy
- Text/transcript: “Oh! I'm sorry. I didn't see the basket. I can pay for the damaged ones.”
- Delivery direction: Embarrassed and sincere, with rain and crowd movement behind him. Do not make him cruel or foolish.
- Voice ID: `fNYuJl2dBlX9V7NxmjnV` (`Ned - Casual, Young British Male, General Southern Accent`); model `eleven_v3`
- Expected path: `assets/audio/characters/freddy/freddy_ch01_scene02_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A04 – Eliza signature line

- Asset ID: `AM06`
- Scene: `ch01_s03`
- Category: `VOICE`
- Audio role: `OPTIONAL STORY VOICE`
- Speaker: Eliza
- Text/transcript: “I ain't done nothing wrong. I'm a good girl, I am.”
- Delivery direction: Canonical BEFORE moment: young, lively, defensive, quick, with clear emotional vulnerability conveyed through performance. The TTS prompt contains dialogue only; preserve wording exactly.
- Voice ID: `124kaYCknTDsnwUFdWl9` (`Eliza - young_cockney`); model `eleven_v3`
- Expected path: `assets/audio/characters/eliza/eliza_ch01_scene03_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Verified replacement: `CLEAN REPLACEMENT INSTALLED — STT VERIFIED; dialogue only; no spoken direction or extra words`
- Verified duration: `~2.72 s`
- Verified file size: `61601 B`
- Canonical status: `APPROVED / CANONICAL`
- Human listening status: `HUMAN QA APPROVED`

### A05 – Higgins observation

- Asset ID: `AM05`
- Scene: `ch01_s03`
- Category: `VOICE`
- Audio role: `OPTIONAL STORY VOICE`
- Speaker: Higgins
- Text/transcript: “Your speech carries a local pattern. I can hear where a person has learned to live. I can hear several things at once. It's interesting.” / “Perhaps I could. That's fair. I'm Henry Higgins.”
- Delivery direction: Fascinated and self-assured, precise, occasionally insensitive; never a cartoon villain.
- Voice ID: `JlptfLxaUpd8pZcw9dKd` (`Kelvin - Calm Young British Male`); model `eleven_v3`
- Expected path: `assets/audio/characters/higgins/higgins_ch01_scene03_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Duration / size: `~12.00 s` / `209977 B`
- Canonical status: `APPROVED / CANONICAL`
- Human listening status: `HUMAN QA APPROVED`

The approved Kelvin QA bytes were installed into the canonical A05 and A06 paths. Temporary A/B assets were removed after hash verification.

### A06 – Pickering and Higgins response

- Asset ID: `AM08A`
- Scene: `ch01_s04`
- Category: `VOICE`
- Audio role: `OPTIONAL STORY VOICE`
- Speaker: Higgins
- Text/transcript: “Listen to who is speaking, where they are, and what they want. A voice gives clues, but it doesn't tell you everything. Yes. That's why you ask.”
- Delivery direction: Demonstrative and thoughtful; Higgins is beginning to acknowledge the limit of inference.
- Voice ID: `JlptfLxaUpd8pZcw9dKd` (`Kelvin - Calm Young British Male`); model `eleven_v3`
- Expected path: `assets/audio/characters/higgins/higgins_ch01_scene04_001.mp3`
- Verified duration: `~9.92 s` (measured 9.9788 s)
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Canonical status: `APPROVED / CANONICAL`
- Human listening status: `HUMAN QA APPROVED`

### A07 – Pickering reaction

- Asset ID: `AM08B`
- Scene: `ch01_s04`
- Category: `VOICE`
- Audio role: `OPTIONAL STORY VOICE`
- Speaker: Pickering
- Text/transcript: “And the clues can be wrong.” / “What do you think, Eliza?”
- Delivery direction: Calm, observant, respectful. He offers a different way of listening without becoming a lecturer.
- Voice ID: `JBFqnCBsd6RMkjVDRZzb` (`George - Warm, Captivating Storyteller`); model `eleven_v3`
- Expected path: `assets/audio/characters/pickering/pickering_ch01_scene04_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A08 – Eliza closing reflection

- Asset ID: `AM09`
- Scene: `ch01_s05`
- Category: `VOICE`
- Audio role: `OPTIONAL STORY VOICE`
- Speaker: Eliza
- Text/transcript: “People hear how I talk before they see what I can do. Maybe if I could talk another way, it'd open a door or two. Wouldn't make me worth more. Just give me another way to make 'em listen.”
- Delivery direction: Thoughtful but still grounded and practical; no sudden “transformed” voice.
- Voice ID: `124kaYCknTDsnwUFdWl9` (`Eliza - young_cockney`); model `eleven_v3`
- Expected path: `assets/audio/characters/eliza/eliza_ch01_scene05_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Verified duration: `~11.83 s`
- Verified file size: `206215 B`
- Content verification: clean MP3 containing canonical Eliza dialogue only; no spoken direction
- Human listening status: `HUMAN QA PENDING`

## LC01 listening files

All three items belong to `AM04`. They should be short, clearly separated, and replayable individually.

Audio role: `LISTENING CHALLENGE`. These samples are the pedagogically necessary listening layer for LC01; the challenge remains explicitly identified as listening work.

### A09 – LC01 apology

- Asset ID: `LC01-01`
- Scene: `ch01_s02`
- Category: `LISTENING`
- Audio role: `LISTENING CHALLENGE`
- Speaker: Freddy
- Text/transcript: “I'm sorry. I wasn't looking where I was going.”
- Delivery direction: Clear acceptance of responsibility; natural embarrassment.
- Voice ID: `fNYuJl2dBlX9V7NxmjnV` (`Ned - Casual, Young British Male, General Southern Accent`); model `eleven_v3`
- Expected path: `assets/audio/listening/ch01_lc01_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A10 – LC01 excuse

- Asset ID: `LC01-02`
- Scene: `ch01_s02`
- Category: `LISTENING`
- Audio role: `LISTENING CHALLENGE`
- Speaker: Freddy
- Text/transcript: “It was the rain. Anyone could've slipped.”
- Delivery direction: Defensive explanation; do not overplay guilt or dishonesty.
- Voice ID: `fNYuJl2dBlX9V7NxmjnV` (`Ned - Casual, Young British Male, General Southern Accent`); model `eleven_v3`
- Expected path: `assets/audio/listening/ch01_lc01_002.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A11 – LC01 intention to repair

- Asset ID: `LC01-03`
- Scene: `ch01_s02`
- Category: `LISTENING`
- Audio role: `LISTENING CHALLENGE`
- Speaker: Freddy
- Text/transcript: “I'll pick these up and pay for the damaged ones.”
- Delivery direction: Concrete and willing; make the future action easy to hear.
- Voice ID: `fNYuJl2dBlX9V7NxmjnV` (`Ned - Casual, Young British Male, General Southern Accent`); model `eleven_v3`
- Expected path: `assets/audio/listening/ch01_lc01_003.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

## LC02 listening files

All three items belong to `AM07`. Use distinct supporting voices only after casting; do not assign ad hoc voice IDs. The samples must differ by register and context, not by “smart” versus “not smart” performance.

Audio role: `LISTENING CHALLENGE`. These samples are the pedagogically necessary listening layer for LC02; ordinary story dialogue around them remains readable in `SCRIPT.md`.

### A12 – LC02 polite work request

- Asset ID: `LC02-01`
- Scene: `ch01_s04`
- Category: `LISTENING`
- Audio role: `LISTENING CHALLENGE`
- Speaker: supporting speaker 01
- Text/transcript: “Could you wait by the door, please? I need both hands.”
- Delivery direction: Polite, cooperative, busy task in progress.
- Voice ID: `vBRU4ztAu1MfP8arDoB3`
- Voice name: `not provided in the production casting brief`
- Expected path: `assets/audio/listening/ch01_lc02_001.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A13 – LC02 informal market instruction

- Asset ID: `LC02-02`
- Scene: `ch01_s04`
- Category: `LISTENING`
- Audio role: `LISTENING CHALLENGE`
- Speaker: supporting speaker 02
- Text/transcript: “Oi, Sam, hold the cart! I'm coming through.”
- Delivery direction: Familiar, urgent, efficient; not aggressive for its own sake.
- Voice ID: `WAppqUXeqDqXjNTaQxG9` (`Hugo`)
- Expected path: `assets/audio/listening/ch01_lc02_002.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A14 – LC02 formal information request

- Asset ID: `LC02-03`
- Scene: `ch01_s04`
- Category: `LISTENING`
- Audio role: `LISTENING CHALLENGE`
- Speaker: supporting speaker 03
- Text/transcript: “Good evening. May I ask whether the meeting has started?”
- Delivery direction: Formal, careful, polite request for information; avoid sounding unnatural.
- Voice ID: `Q6HPFg7bazU61NeyrvBp` (`Ruby`)
- Expected path: `assets/audio/listening/ch01_lc02_003.mp3`
- Replay required: yes
- Transcript required: yes
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

## SFX and closing ambience

### A15 – Fallen flowers

- Asset ID: `AM04-SFX`
- Scene: `ch01_s02`
- Category: `SFX`
- Audio role: `ATMOSPHERE / SFX`
- SFX ID: `flowers_fall`
- Layering: one-shot over the current `covent_garden_rain_market` ambience; do not restart the ambience
- Runtime mix: source gain `1.0` (0 dB); ambience ducks to `0.42` of its baseline (approximately -7.5 dB) for the one-shot, then restores when it ends.
- Speaker: none
- Text/transcript: No speech. Basket bump, stems and flowers hitting wet paving, brief crowd reaction.
- Delivery direction: Short and readable; do not make Freddy’s accident slapstick.
- Voice ID: not applicable
- Expected path: `assets/audio/sfx/flowers-fall-001.mp3`
- Replay required: no
- Transcript required: no speech transcript; provide a content label in the manifest
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

### A16 – Evening Covent Garden bed

- Asset ID: `AM10`
- Scene: `ch01_s05`
- Category: `AMBIENCE`
- Audio role: `ATMOSPHERE / SFX`
- Ambience ID: `covent_garden_evening_light_rain`
- Transition: short gentle crossfade from `covent_garden_rain_market`; exact duration not locked
- Speaker: none
- Text/transcript: No speech. Light evening market, receding rain, shop door, distant footsteps.
- Delivery direction: A small sense of possibility; keep the transition grounded, not sentimental.
- Voice ID: not applicable
- Expected path: `assets/audio/ambience/covent-garden-evening-001.mp3`
- Replay required: no
- Transcript required: no speech transcript; provide a content label in the manifest
- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: `HUMAN QA PENDING`

## Production totals and QA gate

- Finalized local audio files: **16**.
- Eliza files using the canonical voice: **3** (`A02`, `A04`, `A08`; any future alternate takes must keep the same voice ID).
- Story voice files: **7**, all `OPTIONAL STORY VOICE`.
- Listening challenge files: **6**, `LC01` and `LC02`.
- Higgins files: **2**, both canonical Kelvin (`JlptfLxaUpd8pZcw9dKd`); A05 and A06 are `HUMAN QA APPROVED` with continuity confirmed.
- Pickering files: **1**, canonical voice ID `JBFqnCBsd6RMkjVDRZzb`.
- Freddy files: **4** including LC01, canonical voice ID `fNYuJl2dBlX9V7NxmjnV`.
- Supporting listening voices: **3**, production-assigned for LC02 (`vBRU4ztAu1MfP8arDoB3`, `WAppqUXeqDqXjNTaQxG9`, `Q6HPFg7bazU61NeyrvBp`).
- SFX/ambience files: **3** (`A01`, `A15`, `A16`), no speaker casting.
- Audio approval is recorded per asset after human listening review confirms recording, transcript, clarity, replay, local ownership, and scene fit. A04, A05, and A06 are approved; the remaining assets retain their listed statuses.
