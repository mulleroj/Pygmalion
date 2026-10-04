# Chapter IV Audio Plan

Status: S01 AM34 and S02 AM35/AM36, Teacher Mode cultural-reference audio and canonical ambience are integrated and approved as documented below. S03 AM37/AM38 are integrated as documented. S04 AM39 and side-corridor ambience production contracts are canonically locked; S04 voice and corridor ambience assets remain unproduced.

## Shared rules

Book-first: every spoken line remains visible. Each voice sample needs an accessible transcript. Any future `creative_generate_speech.prompt` contains only the exact spoken text; performance direction stays in separate metadata. Use the existing AudioManager, story voice controls, ducking and lifecycle; do not create another audio system. Audio never autoplays on scene entry. Teacher preview does not start audio.

## S01 — The Invitation

| Moment | Speaker / category | Plan |
| --- | --- | --- |
| `AM34` | Eliza / optional story voice | Exact text: “I want to know what they mean, not only how I should answer.” File: `assets/audio/characters/eliza/eliza_ch04_scene01_001.mp3`; matching transcript; voice ID `124kaYCknTDsnwUFdWl9`. Integrated and approved. Performance intent: Emerging New Speech; deliberate and more controlled, still recognisably Eliza; not polished Chapter V delivery. |
| `AM34` | Higgins / optional story voice | Exact text: “Sensible. We shall prepare the words, not the whole evening.” File: `assets/audio/characters/higgins/higgins_ch04_scene01_001.mp3`; matching transcript; voice ID `JlptfLxaUpd8pZcw9dKd`. Integrated and approved. Performance intent: restrained, precise and practical; not sentimental. |

Pickering is visible text-only. No challenge audio is used in S01. S01 reuses `ch03_lesson_room` ambience.

## S02 — Names and Weather

### AM35 — LC11 listening samples

Three short, clearly differentiated social turns; present one at a time. `visible text = transcript = spoken text` for every sample.

| Sample | Exact spoken text | Canonical local file | Function |
| --- | --- | --- | --- |
| 1 · `lc11_sample_01` | Clarice — Hostess · “Miss Doolittle, have you been in London long?” | `assets/audio/listening/ch04_lc11_sample_01.mp3` | Opening · generation `UpaVXHP9hLlhqfORlnK3` · HUMAN APPROVED |
| 2 · `lc11_sample_02` | Paul M — Guest · “I see. And what do you think of the weather today?” | `assets/audio/listening/ch04_lc11_sample_02.mp3` | Continuing · generation `uu0U0PzHxaSfVADcTn75` · HUMAN APPROVED |
| 3 · `lc11_sample_03` | Clarice — Hostess · “Well, it was lovely speaking with you.” | `assets/audio/listening/ch04_lc11_sample_03.mp3` | Closing · generation `kkAQBj3swNTpEYoaKC3Q` · HUMAN APPROVED |

These are LC11 challenge audio, not story voice. Replay uses the existing challenge playback path; transcript/support follows each sample's first attempt. LC11 scoring and state contract lives in `STATE_AND_BRANCHING.md`.

### AM36 — Eliza story voice

Canonical Eliza voice ID: `124kaYCknTDsnwUFdWl9`. Three optional foreground lines, user-triggered through the existing story voice UX. Keep visible dialogue, transcript and spoken text identical. Maintain her established voice identity with more natural rhythm, increased confidence and less self-conscious articulation than Chapter III; allow a little Cockney return under mild social pressure. Avoid polished “perfect lady” delivery. The files are the final HUMAN APPROVED generations:

| Turn | Exact spoken text | Canonical local file |
| --- | --- | --- |
| 1 | “It rained on the way here, but today the sky is clearing.” | `assets/audio/characters/eliza/eliza_ch04_scene02_001.mp3` · generation `DvdnVuQlFQjCkmPr40fu` · HUMAN APPROVED |
| 2 | “It was a short walk. I noticed a little bookshop near the square.” | `assets/audio/characters/eliza/eliza_ch04_scene02_002.mp3` · generation `YnLHFVdTFxu1n3Y0pl4g` · HUMAN APPROVED |
| 3 | “I do. I like hearing how different people tell a story.” | `assets/audio/characters/eliza/eliza_ch04_scene02_003.mp3` · generation `T5waq2l96RQJwf2NW1KN` · HUMAN APPROVED |

The `/eɪ/` observation in “rained”, “way” and “today” is part of AM36 turn 1, not LC11. Pickering has no S02 foreground voice. Higgins is not an active speaker in S02.

### Teacher Mode cultural reference — separate from AM35/AM36

This optional reference is teacher-facing context only; it is not part of the learner story, LC11, AM35 or AM36. Explicit activation from the Cultural / Literary Context note in Teacher Mode may use the existing foreground audio path, with no second audio system. It is read-only: no challenge, scene progression, learner-state write or learner-progress requirement. Provide the transcript alongside the control.

| Reference audio ID | Exact spoken text | Canonical local file | Speaker / casting | Delivery |
| --- | --- | --- | --- | --- |
| `teacher_ref_my_fair_lady_rain_in_spain` | “The rain in Spain stays mainly in the plain.” | `assets/audio/characters/narrator/ch04_teacher_reference_rain_in_spain_001.mp3` | Paul M — neutral British narrator | Generation `A2vA6PGvssv3snWNkpym` · HUMAN APPROVED. Natural spoken British English, instructional/reference delivery; no singing, melody or theatrical imitation of a specific performance. |

## Ambience and optional diegetic cue

S02 uses one ambience identity, `ch04_social_tea_room`, with two HUMAN APPROVED companion variants. Loop A is `assets/audio/ambience/ch04_social_tea_room_ambient.mp3`, generation `wRL15MbLQwNR2xSdgvdU`; Loop B is `assets/audio/ambience/ch04_social_tea_room_ambient_b.mp3`, generation `nYJBCMLA3JjtHqlPdG8Q` (ElevenLabs Asset Library ID `29NI5K2Zd2ujmt4hrF7Y`). Each is approximately 12.07 seconds. Decoded stereo PCM RMS at 44.1 kHz measured Loop A at −33.36 dBFS and Loop B at −62.53 dBFS; Loop B receives a measured +29.17 dB runtime gain (linear `28.7268`) through its per-source Web Audio gain node. Runtime alternates deterministically `A → B → A → B` with a 1.0 second equal-power crossfade; S02→S03 retains the same players and sequence. AM35 and AM36 use existing AudioManager ducking across both players and restore the running ambience without restarting it. Sound Off pauses both variants; Sound On resumes the current variant and any in-progress crossfade. Crossfade gently from `ch03_lesson_room` on S01→S02. The room contains restrained drawing-room room tone, a low social murmur and occasional unobtrusive porcelain texture. No music and no separate teacup SFX are needed.

An optional single cup-set-down cue may use `assets/audio/sfx/sfx_teacups_001.mp3` only if the ambience does not already convey the moment. If used, play once for one authored diegetic moment; never trigger on render, replay or refresh. This optional cue does not block the scene if omitted.

## S03 — The Wrong Answer

### AM37 — Story voice

Two separate, user-triggered foreground clips. Visible text, transcript and spoken text match 1:1. No autoplay.

| Speaker | Exact spoken text | Planned local file | Voice / delivery |
| --- | --- | --- | --- |
| Guest (same Guest as S02) | London seems to have decided we needed more rain. | `assets/audio/characters/guest/guest_ch04_scene03_001.mp3` | Planned reuse: Paul M · `zp695rEBCwfZ3GYNJOHx`; natural British social speech, lightly humorous, understated and friendly, never sarcastic toward Eliza. |
| Eliza | I don't think London can decide anything. It is a city, not a person. | `assets/audio/characters/eliza/eliza_ch04_scene03_001.mp3` | Canonical Eliza voice `124kaYCknTDsnwUFdWl9`; Emerging New Speech, clean controlled pronunciation, sincere, slightly formal and literal, no comedy performance or exaggerated Cockney. |

Technical status (2026-10-04): the two approved MP3 previews are integrated at the canonical paths with the approved generation and voice IDs. Learner-visible transcripts match the spoken text 1:1. Playback remains explicit; no autoplay.

### AM38 — Listening / context cue

| Planned local file | Content | Rules |
| --- | --- | --- |
| `assets/audio/listening/ch04_lc12_reaction_001.mp3` | Approximately 3–5 seconds: brief social pause, one or two restrained polite chuckles, slight uncertain group murmur, return toward tea-room room tone. No intelligible dialogue is required. | Contextual support only; must not sound like a crowd laughing at Eliza. Provide a written context description alongside playback; critical pedagogical information is also conveyed in readable text. Replay follows LC12 support rules. |

The approved AM38 MP3 preview is integrated at the canonical path. The previously listed `assets/audio/sfx/sfx_room_reaction_001.mp3` is redundant and superseded by AM38; it is not a separate required asset.

### S03 ambience and mix

Continue the S02 ambience identity `ch04_social_tea_room` and its current alternating A/B source lifecycle through S02→S03. Do not start another ambience identity or restart/reset the running variant. AM37 foreground speech uses standard ducking. AM38 may use stronger temporary ducking; restore the same running tea-room ambience afterward. Use the existing AudioManager and lifecycle.

## S04 — After the Laughter

### AM39 — Corridor dialogue

AM39 is a sequence of separate, user-triggered foreground clips. Keep visible text, transcript and spoken text identical. No autoplay on scene entry. All clips use standard ambience duck/restore through the existing AudioManager.

| Order | Speaker | Exact spoken text | Planned local file | Canonical voice / performance |
| --- | --- | --- | --- | --- |
| 1 | Pickering | You spoke clearly, Eliza. The difficulty was not the words. | `assets/audio/characters/pickering/pickering_ch04_scene04_001.mp3` | George, `JBFqnCBsd6RMkjVDRZzb`; warm, calm, observant and nonjudgmental. |
| 2 | Mrs Pearce | People often say one thing and mean something more. That takes time to learn. | `assets/audio/characters/mrs-pearce/mrs-pearce_ch04_scene04_001.mp3` | Sally Ford, `kBag1HOZlaVBH7ICPE8x`; mature British, practical, grounded, warm but unsentimental. |
| 3 | Eliza | Then I must learn the people as well as the language. | `assets/audio/characters/eliza/eliza_ch04_scene04_001.mp3` | Canonical Eliza, `124kaYCknTDsnwUFdWl9`; Emerging New Speech, calm and deliberate. |
| 4 | Higgins | Exactly. Tonight is useful because it shows us what still needs work. | `assets/audio/characters/higgins/higgins_ch04_scene04_001.mp3` | Kelvin, `JlptfLxaUpd8pZcw9dKd`; analytical, matter-of-fact, emotionally blind, not villainous. |
| 5 | Eliza | It shows you what still needs work. | `assets/audio/characters/eliza/eliza_ch04_scene04_002.mp3` | Canonical Eliza, `124kaYCknTDsnwUFdWl9`; calm and deliberate. |
| 6 | Higgins | It is a test, Eliza. | `assets/audio/characters/higgins/higgins_ch04_scene04_002.mp3` | Kelvin, `JlptfLxaUpd8pZcw9dKd`; brief, matter-of-fact, without melodrama. |
| 7 | Eliza | Then I should have a say in what the test is for. | `assets/audio/characters/eliza/eliza_ch04_scene04_003.mp3` | Canonical Eliza, `124kaYCknTDsnwUFdWl9`; calm and deliberate, not shouted. |

The narrator's exact location line is visible story text; no narrator voice asset is specified for S04. All seven dialogue lines above are the complete AM39 foreground sequence. The three selectable reflection lines in `STATE_AND_BRANCHING.md` are written responses and are not additional AM39 clips. Do not embellish or voice additional lines.

Mrs Pearce's canonical voice is Sally Ford, Voice ID `kBag1HOZlaVBH7ICPE8x`, as recorded in the project audio voice bible; no voice ID needs to be invented or deferred.

### S04 corridor ambience

S04 introduces the new logical ambience identity `ch04_side_corridor`, planned file `assets/audio/ambience/ch04_side_corridor_ambient.mp3` (not yet produced). Plan a seamless loop of approximately 15–20 seconds: quiet interior corridor, soft building room tone, distant muffled tea-room social murmur behind a door, and at most very subtle occasional movement. No intelligible speech, music, clock emphasis, rhythmic porcelain, dramatic footsteps loop or conspicuous repeated event.

At S04 entry crossfade from the currently running `ch04_social_tea_room` to `ch04_side_corridor` over approximately 1.5 seconds. The existing tea-room A/B sequence may finish or continue naturally until that crossfade begins; do not restart Loop A. Once corridor ambience takes over, stop tea-room ambience using the existing AudioManager lifecycle. S04 is a side-corridor location, not a tea-room visual or ambience hold.

The earlier tentative AM40 hallway/distant-guests SFX plan is superseded by this continuous corridor ambience. Do not produce or plan `assets/audio/sfx/sfx_hallway_001.mp3`; do not reuse S03 AM38 laughter/reaction in S04. Distant social presence belongs in the corridor ambience. There is no separate S04 AM40 one-shot.
