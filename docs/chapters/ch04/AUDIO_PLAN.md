# Chapter IV Audio Plan

Status: S01 AM34 and S02 AM35/AM36, Teacher Mode cultural-reference audio and canonical ambience are integrated and approved as documented below. S03 AM37/AM38 production plan is canonically locked; S03 audio and transcripts have not been generated.

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

S02 uses ambience identity `ch04_social_tea_room`, file `assets/audio/ambience/ch04_social_tea_room_ambient.mp3`, generation `wRL15MbLQwNR2xSdgvdU` (final HUMAN APPROVED generation, approximately 12 seconds). It contains restrained drawing-room room tone, a low social murmur and occasional unobtrusive porcelain texture. No music and no separate teacup SFX are needed. Crossfade gently from `ch03_lesson_room` on S01→S02. AM35 and AM36 use existing AudioManager ducking; restore the still-running ambience without restarting its loop. Sound Off follows the existing foreground/ambience lifecycle.

An optional single cup-set-down cue may use `assets/audio/sfx/sfx_teacups_001.mp3` only if the ambience does not already convey the moment. If used, play once for one authored diegetic moment; never trigger on render, replay or refresh. This optional cue does not block the scene if omitted.

## S03 — The Wrong Answer

### AM37 — Story voice

Two separate, user-triggered foreground clips. Visible text, transcript and spoken text match 1:1. No autoplay.

| Speaker | Exact spoken text | Planned local file | Voice / delivery |
| --- | --- | --- | --- |
| Guest (same Guest as S02) | London seems to have decided we needed more rain. | `assets/audio/characters/guest/guest_ch04_scene03_001.mp3` | Planned reuse: Paul M · `zp695rEBCwfZ3GYNJOHx`; natural British social speech, lightly humorous, understated and friendly, never sarcastic toward Eliza. |
| Eliza | I don't think London can decide anything. It is a city, not a person. | `assets/audio/characters/eliza/eliza_ch04_scene03_001.mp3` | Canonical Eliza voice `124kaYCknTDsnwUFdWl9`; Emerging New Speech, clean controlled pronunciation, sincere, slightly formal and literal, no comedy performance or exaggerated Cockney. |

These are planned assets; neither S03 file nor transcript is produced by this documentation lock.

### AM38 — Listening / context cue

| Planned local file | Content | Rules |
| --- | --- | --- |
| `assets/audio/listening/ch04_lc12_reaction_001.mp3` | Approximately 3–5 seconds: brief social pause, one or two restrained polite chuckles, slight uncertain group murmur, return toward tea-room room tone. No intelligible dialogue is required. | Contextual support only; must not sound like a crowd laughing at Eliza. Provide a written context description alongside playback; critical pedagogical information is also conveyed in readable text. Replay follows LC12 support rules. |

The previously listed `assets/audio/sfx/sfx_room_reaction_001.mp3` is redundant and superseded by AM38; it is not a separate required asset.

### S03 ambience and mix

Continue the S02 ambience identity `ch04_social_tea_room` using `assets/audio/ambience/ch04_social_tea_room_ambient.mp3`. The S02→S03 transition remains in the same location: do not start another ambience identity or restart the running loop unnecessarily. AM37 foreground speech uses standard ducking. AM38 may use stronger temporary ducking; restore the same running tea-room ambience afterward. Use the existing AudioManager and lifecycle.
