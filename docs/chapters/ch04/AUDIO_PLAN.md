# Chapter IV Audio Plan

Status: S01 AM34 integrated; Human Audio approval PASS. S02 AM35/AM36 and ambience are planned only; no new S02 audio generated.

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

Three short, clearly differentiated social turns; present one at a time. Hostess/Guest production casting and voice IDs remain pending; do not invent canonical IDs. `visible text = transcript = spoken text` for every sample.

| Sample | Exact spoken text | Planned local file | Function |
| --- | --- | --- | --- |
| 1 | “Miss Doolittle, have you been in London long?” | `assets/audio/listening/ch04_lc11_sample_01.mp3` | Opening |
| 2 | “I see. And what do you think of the weather today?” | `assets/audio/listening/ch04_lc11_sample_02.mp3` | Continuing |
| 3 | “Well, it was lovely speaking with you.” | `assets/audio/listening/ch04_lc11_sample_03.mp3` | Closing |

These are LC11 challenge audio, not story voice. Replay uses the existing challenge playback path; transcript/support follows each sample's first attempt. LC11 scoring and state contract lives in `STATE_AND_BRANCHING.md`.

### AM36 — Eliza story voice

Canonical Eliza voice ID: `124kaYCknTDsnwUFdWl9`. Three optional foreground lines, user-triggered through the existing story voice UX. Keep visible dialogue, transcript and spoken text identical. Maintain her established voice identity with more natural rhythm, increased confidence and less self-conscious articulation than Chapter III; allow a little Cockney return under mild social pressure. Avoid polished “perfect lady” delivery. Generation IDs and files are pending; the planned filenames are:

| Turn | Exact spoken text | Planned local file |
| --- | --- | --- |
| 1 | “It rained on the way here, but today the sky is clearing.” | `assets/audio/characters/eliza/eliza_ch04_scene02_001.mp3` |
| 2 | “It was a short walk. I noticed a little bookshop near the square.” | `assets/audio/characters/eliza/eliza_ch04_scene02_002.mp3` |
| 3 | “I do. I like hearing how different people tell a story.” | `assets/audio/characters/eliza/eliza_ch04_scene02_003.mp3` |

The `/eɪ/` observation in “rained”, “way” and “today” is part of AM36 turn 1, not LC11. Pickering has no S02 foreground voice. Higgins is not an active speaker in S02.

### Teacher Mode cultural reference — separate from AM35/AM36

This optional reference is teacher-facing context only; it is not part of the learner story, LC11, AM35 or AM36. Explicit activation from the Cultural / Literary Context note in Teacher Mode may use the existing foreground audio path, with no second audio system. It is read-only: no challenge, scene progression, learner-state write or learner-progress requirement. Provide the transcript alongside the control.

| Reference audio ID | Exact spoken text | Planned local file | Speaker / casting | Delivery |
| --- | --- | --- | --- | --- |
| `teacher_ref_my_fair_lady_rain_in_spain` | “The rain in Spain stays mainly in the plain.” | `assets/audio/characters/narrator/ch04_teacher_reference_rain_in_spain_001.mp3` | Neutral British narrator; `CASTING PENDING – neutral British narrator` | Natural spoken British English, instructional/reference delivery; no singing, melody or theatrical imitation of a specific performance. One approved take only. |

## Ambience and optional diegetic cue

S02 introduces ambience identity `ch04_social_tea_room`, planned file `assets/audio/ambience/ch04_social_tea_room_ambient.mp3`: restrained drawing-room room tone, a low social murmur and only occasional unobtrusive porcelain texture. No music and no random SFX bed. Crossfade gently from `ch03_lesson_room` on S01→S02. AM35 and AM36 use existing AudioManager ducking; restore the still-running ambience without restarting its loop. Sound Off follows the existing foreground/ambience lifecycle.

An optional single cup-set-down cue may use `assets/audio/sfx/sfx_teacups_001.mp3` only if the ambience does not already convey the moment. If used, play once for one authored diegetic moment; never trigger on render, replay or refresh. This optional cue does not block the scene if omitted.
