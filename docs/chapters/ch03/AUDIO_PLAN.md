# Chapter III Audio Plan

Status: S01 CONTENT LOCKED; `ch03_s01 Human Audio Mix QA = PASS` after recheck with the canonical Chapter III ambience. `ch03_s02 Human Audio Mix QA = PASS`; all six individual S02 recordings = Human Audio QA PASS. The 90-second Chapter III lesson-room ambience and its mix with story voices are canonical and human-approved. LC05 sample paths remain PLANNED / NOT GENERATED / NOT INTEGRATED. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. Audio moment != audio file.

## Voice and text authority

[SCRIPT.md](SCRIPT.md) supplies visible spoken copy. Eliza uses Chapter III Conscious Training: Eliza - young_cockney; voice 124kaYCknTDsnwUFdWl9; model eleven_v3; reference HO08Dcr5Fe43jEbtr7W9. More precise conscious articulation, locally cautious tempo, recognisable Cockney and same identity. No jump to Chapter IV natural delivery, Chapter V polished look/speech, new source voice or Voice Changer. Human listening QA remains required.

Higgins uses canonical Kelvin JlptfLxaUpd8pZcw9dKd, eleven_v3: precise, supportive, not mocking. He also supplies neutral didactic LC05 samples, separate from story recordings. Pickering and Mrs Pearce retain visible text-only contributions for this slice; no new voice files for them are required here.

## AM21 — PRONUNCIATION moment-to-file plan

| Asset ID / role | Planned local path | Exact spoken text / transcript |
|---|---|---|
| AM21-HIGGINS-MODEL, optional story voice | assets/audio/characters/higgins/higgins_ch03_scene01_001.mp3 | For /θ/, bring the tip of your tongue lightly to your front teeth. Let the air flow. For /f/, your upper teeth meet your lower lip. Try ‘thin’ slowly. |
| AM21-ELIZA-ATTEMPT, optional story voice | assets/audio/characters/eliza/eliza_ch03_scene01_001.mp3 | Thin... I'm watching my tongue. It feels strange, but I can try it. |
| lc05_sample_theta, explicit LC05 sample | assets/audio/pronunciation/ch03_lc05_theta_001.mp3 | /θ/ held briefly, pause, thin /θɪn/. Spoken material only; pronunciation symbols/directions are metadata, not words to vocalise. |
| lc05_sample_f, explicit LC05 sample | assets/audio/pronunciation/ch03_lc05_f_001.mp3 | /f/ held briefly, pause, fin /fɪn/. Same speaker, similar pace/level; no mocking or emotional contrast. |

The instructional phoneme notation must become the actual sound, never “slash theta slash”. Production must verify voiced content against the visible line before acceptance. Story performance is not reused as a shuffled sample or a completion trigger. The pair thin/fin isolates the initial /θ/–/f/ contrast; it is not a claim that every Cockney speaker uses /f/.

Planned sidecar transcripts use each MP3 stem + .txt, including story tracks. Accessible LC05 transcript text:

- theta: “/θ/, then thin /θɪn/. The tongue tip meets the front teeth lightly; air flows.”
- f: “/f/, then fin /fɪn/. The lower lip meets the upper teeth; air flows.”

Transcripts are available on request before/repeatedly during attempts, contain no answer IDs or preselected answer, and may be used with Sound Off. Feedback/key appears after submission or in Teacher Mode. No compulsory microphone, speech recognition or runtime service. Replay is unrestricted and changes no state. Exact IDs/key are in [STATE_AND_BRANCHING.md](STATE_AND_BRANCHING.md).

## AM22 — SFX

AM22-PENCIL-PAPER: assets/audio/sfx/ch03_pencil_paper_001.mp3. One short, gentle diegetic pencil/paper movement; no speech, music or pedagogical information. Description: “A pencil makes a short mark on paper in the lesson room.” Optional one-shot on explicit student entry into the practice activity after D06, once per actual scene visit. Render, refresh/restore, retry, replay, Sound On and Teacher preview do not trigger it; if unavailable or Sound Off, skip without later backlog. Re-entry on a new student scene visit may permit it again. No persistent gameplay event.

## S01 explicit ambience

Ambience ID ch03_lesson_room; canonical runtime path `assets/audio/ambience/ch03_higgins_house_lesson_ambient.mp3`. The 90-second seamless loop combines the existing study/clock, household, exterior-through-windows, and one distant gong source using the approved +27/+24/+5/−8 dB source gains. No Chapter I rain or Chapter II ambience fallback; no additional soundtrack music. It remains separate from AM22.

- On student transition from Chapter II, crossfade the house interior into this explicit layer after a conscious gesture and only with Sound enabled. No fallback to Chapter I rain. Missing media yields silence without blocking the book.
- Maintain track position through S01/S02 rerenders, scene transition, challenge/replay. Both scenes use the same ambience ID and continuous loop.
- Duck during optional story voice; stronger duck during LC05; smoothly restore without restarting. S01 ambience/voice mix after recheck = Human Audio Mix QA PASS. LC05 audio remains PENDING / NOT IMPLEMENTED.
- Scene exit stops speech, samples, one-shots and pending cues; loop retires/crossfades according to the next explicit scene mapping. Cover exit stops ambience. Stale promises/events cannot leak audio into a new scene.
- Sound Off stops foreground/SFX and silences/pauses the loop. Sound On resumes only the loop after user unlock, never consumed AM22 or prior speech/sample. A saved preference does not authorise browser autoplay.
- Teacher opening/preview is no unlock or automatic cue trigger. Preserve the live student loop where already active; explicit preview playback may duck it but owns no student state. Preview exit stops preview foreground and restores the prior student audio context; never starts AM22.

## Architecture and production gates

Reuse the existing story renderer, renderDecision, shared state/event store, AudioManager, challenge infrastructure, Teacher dialog, replay/preview safety and responsive image layers. Explicit scene mapping and mix metadata must replace the current unknown-chapter rain/mix fallback for S01. No Chapter III AudioManager, state store, second Teacher Mode, parallel decisions or isolated save. Production gates: local files, approved voice identity/delivery, spoken-text parity, transcripts, human listening/mix QA and lifecycle validation. AM21 story voices, lesson-room mix and lifecycle gates have passed; AM22 and LC05 audio remain pending.

## Later Chapter III – NOT YET LOCKED

S03 AM25–26, S04 AM27–28 and S05 AM29–30 are specified below. S06 AM31–33 is PRE-PRODUCTION CANON LOCKED below; its audio remains planned and NOT GENERATED. Existing Human Audio QA and mix statuses for S01–S05 remain unchanged.

## AM21 approved story voice integration checkpoint

User-approved Higgins generation tkmSbcYFwIZyebvZrlSL: Kelvin - Calm Young British Male, JlptfLxaUpd8pZcw9dKd, eleven_v3, Human Audio QA PASS. Exact target: assets/audio/characters/higgins/higgins_ch03_scene01_001.mp3.

User-approved Eliza A generation v2j1QzbgqYj86XuXDK6j: Eliza - young_cockney, 124kaYCknTDsnwUFdWl9, eleven_v3, Chapter III Conscious Training, Human Audio QA PASS. Exact target: assets/audio/characters/eliza/eliza_ch03_scene01_001.mp3. Eliza B XZr3GAQpa2LR9TPgosp1 is NOT SELECTED / SUPERSEDED AUDITION; never assign it to runtime.

Both original approved MP3s were downloaded directly from user-supplied generation master URLs (HTTP 200), without regeneration or re-encoding, and integrated beneath their exact dialogue beats. Replay is explicit, with visible transcripts, no auto-speech or gameplay events. Teacher preview remains read-only and its speech stops on exit or Teacher opening. No replacement take is authorised. Canonical visible text/transcripts above remain unchanged.

Ambience audit: the previous Chapter II interior reuse was replaced by the four-source Chapter III canonical ambience documented below. The distant gong occurs once in the ambience file; the separate Chapter II gramophone and clock cues are not mapped into Chapter III. Human listening confirms that the approved ambience and voices work acceptably together.

AM22 = PENDING HUMAN-GENERATED/APPROVED ASSET. Inventory contains no approved gentle pencil/paper/lesson-handling sound; flowers-fall and the quarter-hour gong are unsuitable substitutes and remain unwired. LC05 audio = PENDING / NOT IMPLEMENTED; objective samples remain unavailable; the transcript-supported route is retained.

Runtime levels: story ambience 0.10; story duck ×0.28 to 0.028; LC06 ambience 0.008 (challenge duck ×0.08). Restore 160 ms; ambience crossfade 700 ms; Sound Off fade 180 ms. Native story voice stays dry at gain 1 with normal rate/pitch and no EQ/reverb/spatialisation. Existing AudioManager foreground ownership, replay, Sound Off/On and scene-exit lifecycle are reused. Chapter III ambience and voice mix = Human Audio Mix QA PASS.

Technical ingestion: Higgins 226695 bytes, MPEG-1 Layer III mono 44100 Hz, frame duration 13.113 s (approximately 13.04 s audible); SHA-256 76f8ca8c8396f15f33631a769edb242e34033ebe5f0068137805a19756c7013e. Eliza A 95874 bytes, same format, frame duration 4.937 s (approximately 4.88 s audible); SHA-256 78e3ea6ff328c63d80c6d4c8f2736cd027cfdf3bbaa464f4f8b7ee8595c17232. MPEG frame scan reaches EOF with no truncated frames; Browser decode PASS: duration 13.04 s / 4.88 s, readyState 4, no media error. Signed download URLs are not stored in project documentation.

Human Audio Mix QA: the canonical 90-second Chapter III ambience recheck with S01 voices = PASS. Confirmed speech clarity, balanced ambience, Sound Off/On behavior, duck/restore and scene lifecycle. No Chapter I rain, Chapter II ambience or gramophone fallback.



## ch03_s02 — AM23 / story voice — PRE-PRODUCTION CANON LOCKED

Six exact takes generated from the approved ElevenLabs Flow production, all Human Audio QA PASS and integrated. `ch03_s02 Human Audio Mix QA = PASS` with the canonical Chapter III ambience and story voices. Contrast three /θriː/ versus free /friː/.

### AM23 — objective LC06 samples

| Sample ID | Runtime path | Generation ID | File size | Duration | Exact spoken script / transcript |
|---|---|---|---|---|---|
| lc06_sample_01 | assets/audio/challenges/ch03/lc06_three_flowers.mp3 | iauJFoB7TrehOtQmc4WT | 44,883 bytes | 1.68 s | I'd like three flowers. |
| lc06_sample_02 | assets/audio/challenges/ch03/lc06_free_flowers.mp3 | ZaQgHrqqFMqvxz8pqIlQ | 46,137 bytes | 1.76 s | I'd like free flowers. |

Canonical Higgins/Kelvin JlptfLxaUpd8pZcw9dKd, eleven_v3. Same speaker/carrier, natural neutral delivery, comparable level/rate/intonation; distinguish /θ/ vs /f/, not incidental production clues. No coaching, answer announcement, pronunciation explanation or extra spoken words. Normal-speed samples and unlimited replay only; no slowed take, playback-rate/pitch manipulation. Human A/B confirmed comparable rhythm, tempo and intonation; Human Audio QA PASS confirmed exact words, target phonemes and sample intelligibility. Runtime replay does not reveal an answer or change progress.

### Optional story voice continuity (separate files, AM24 story group)

| Role | Runtime path | Generation ID | File size | Duration | Exact spoken text / visible transcript |
|---|---|---|---|---|---|
| Higgins opener | assets/audio/characters/higgins/higgins_ch03_scene02_001.mp3 | 8x3VLpQ9nssFmsuQEkXw | 66,617 bytes | 3.04 s | This time, listen before you try to say the word. |
| Higgins post-challenge | assets/audio/characters/higgins/higgins_ch03_scene02_002.mp3 | ocaEKLQL5ZAkvoFgQgGy | 72,886 bytes | 3.44 s | Good. Hear the difference first. Then practise saying it. |
| Eliza pre-challenge | assets/audio/characters/eliza/eliza_ch03_scene02_001.mp3 | 9mmmNoy0Fac8ttetRAU2 | 79,155 bytes | 3.84 s | I know what my mouth is doing. My ears need a turn now. |
| Eliza post-challenge | assets/audio/characters/eliza/eliza_ch03_scene02_002.mp3 | xyGZEj9fgKJt3weuMtOn | 101,307 bytes | 5.20 s | A small sound, but a different order. I can listen again before I answer. |

AM23 remains objective listening only; AM24 is the story-voice group including the approved continuity lines, with separate files/controls from objective samples. No new AM number invented. All six isolated takes passed Human Audio QA. Higgins canonical Kelvin JlptfLxaUpd8pZcw9dKd, eleven_v3: analytical/supportive, not humiliating. Eliza canonical young_cockney 124kaYCknTDsnwUFdWl9, eleven_v3, Conscious Training (HO08Dcr5Fe43jEbtr7W9): same identity, recognisable Cockney, consciously careful articulation/tempo, not polished IV/V.

Pickering remains text-only; no Pickering file was generated. All story playback is explicit, with visible transcript, and never reused as an objective sample or completion trigger. Exactly one approved take is used per line; no alternates are integrated.

### Transcript and lifecycle contract

Standard titles “Recording 1” / “Recording 2”; no target-revealing title/alt/IPA/caption/key before first attempt. Both answer alternatives remain visible. First attempt UNAIDED LISTENING. After it, Supported practice can expose exact transcript; support does not block LC06/story completion but earns no pronunciation increment. Target-specific explanation before overall completion also marks support use; mere availability does not. After completion transcripts remain accessible without retroactively changing reward. STATE_AND_BRANCHING.md defines first-attempt and inaccessible-audio handling.

Unlimited normal-speed replay, generic retry feedback, explicit unresolved submissions only. Sound Off stops audio, preserves readable story, and offers the supported route after the initial unresolved attempt. Missing samples surface the existing unavailable audio status; no substitute story take or forced guessing. Teacher preview read-only, no unlock/auto-speech/save; explicit preview playback cleans up on exit. Sound On resumes loop only. Foreground ownership handles replay/interrupt/stale promises and scene leave. No speech synthesis fallback is used.

### Reused ambience / mix gates

Canonical Chapter III ambience: `ch03_lesson_room` → `assets/audio/ambience/ch03_higgins_house_lesson_ambient.mp3`, 89.992 s decoded MP3 duration (90 s target), 2,159,803 bytes, SHA-256 `DDF96D046967C4E025AA25E6083220CCD4015C47C2710D4D4755C61BCB9DB311`. It is one continuous room bed built from the four exact existing Flow generations below; the source MP3s are retained in temporary storage, not in the runtime asset folder.

| Layer | Source generation | Source bytes / SHA-256 | Final timeline and processing |
|---|---|---|---|
| Base study room and clock | `oK9a1Fn1rIx3FJaKGrZe` | 497,951 / `547EA0F05B4972D1949007EF830808A6C8CBB0BD00CE0DFBA29CB738838C0DE7` | Full timeline as three passes, each stretched by 0.33% and joined with 250 ms equal-power crossfades; a 250 ms circular seam spans the loop boundary. +27 dB source gain. |
| Distant household activity | `PAMtEPBJW8W6rXjDlIOt` | 497,951 / `0A633CDB5B3713C15D14942BB1F804F0E128FEB7B454D633AFFBC6CC9753609E` | Main source 00:00–00:30 placed at 00:10–00:40; distinct source trim 00:05–00:17 placed at 01:10–01:22. 700 ms fades; +24 dB source gain. |
| Exterior through windows | `DAu9YHLbdGHvniFmc5U3` | 497,951 / `347C2CBD2D29E4112F2318360E959FBDFB4F22782D4C231221AC6F1E03386E31` | Source 00:00–00:28 placed at 00:32–01:00, with 700 ms fades; +5 dB source gain. |
| Distant clock gong | `PoGjrRKkp2HPztzVO5C9` | 146,029 / `66FAAF4758373D79153013322D70ACAFCF3A2FEA1E0352685738EFEDFC09673C` | One source take starts at 01:04 and decays through 01:12. 150 ms fade-in, 800 ms fade-out; −8 dB source gain. It does not recur inside the 90-second file. |

Four-source input analysis (FFmpeg `volumedetect`, `astats`, and EBU R128): study/clock 30.04 s, RMS −67.8 dBFS, peak −54.9 dBFS, LRA 0.0 LU; household 30.04 s, RMS −61.9 dBFS, peak −29.0 dBFS, LRA 12.4 LU; exterior 30.04 s, RMS −43.8 dBFS, peak −29.6 dBFS, LRA 5.1 LU; gong 8.05 s, RMS −26.8 dBFS, peak −4.0 dBFS, LRA 25.6 LU. The earlier gains left the clock at −25.8 dBFS RMS, roughly 10–16 dB above the other layers' average levels; the quiet constant ticking therefore dominated the listening impression while sparse household transients, distant exterior, and gong sat much lower on average. The revised relative source gains are +27/+24/+5/−8 dB (clock/household/exterior/gong). The decoded MP3 is 89.992 s by MPEG frame count (90.00 s reported by FFmpeg), stereo 44.1 kHz, with −36.9 dBFS RMS, −5.3 dBFS sample and true peak, −38.2 LUFS integrated, 12.2 LU LRA, and no clipping (maximum sample −5.3 dBFS). Household and exterior remain measurable in their placed intervals: 00:10–00:40 RMS −36.0 dBFS and 00:32–01:00 RMS −36.2 dBFS. No limiter or normalization was applied; headroom is retained. Gain figures are source compensation for these particular generations, not approved runtime values.

Both `ch03_s01` and `ch03_s02` map to `ch03_lesson_room`; the AudioManager keeps the same loop instance across the scene boundary. Runtime story ambience gain is 0.10, story duck is 0.028, and LC06 ambience is 0.008. S01 recheck and S02 final ambience/voice mix are Human Audio Mix QA PASS; all six S02 recordings are Human Audio QA PASS. No Chapter I rain, Chapter II ambience, or gramophone fallback is part of this mapping.

LC06 ambience 0.008 (existing challenge duck ×0.08) is the human-approved runtime value. Replay, Sound Off, and scene cleanup use the existing AudioManager lifecycle; no new AudioManager/mix engine.

## ch03_s03 — AM25 / AM26 — RUNTIME AUDIO INTEGRATED — HUMAN AUDIO MIX QA PASS

BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. S03 reuses `ch03_lesson_room` → `assets/audio/ambience/ch03_higgins_house_lesson_ambient.mp3` through the established Chapter III ambience architecture; that ambience file and the existing S01/S02 mix values are unchanged. S03 uses the existing AudioManager foreground replay, duck/restore, Sound Off and scene-exit lifecycle. Audio playback is read-only and does not change challenge answers, support, rewards or scene completion. No browser speech synthesis fallback.

### AM25 — objective LC07 samples — individual Human Audio QA PASS

Three exact approved local objective recordings, each containing only the target word. Learners can replay at normal speed; the visible word/syllables provide the transcript and remain readable with Sound Off. The audio controls expose no additional transcript or answer key before the response. Audio failure leaves the challenge available from its visible text and never changes state.

| Sample ID | Runtime path | Exact spoken text / transcript | Speaker | Generation ID | Duration | Bytes | Human Audio QA |
|---|---|---|---|---|---:|---:|---|
| lc07_sample_01 | `assets/audio/challenges/ch03/lc07_customer.mp3` | customer | Higgins / Kelvin, canonical voice | `MCDlKDcFalPe2MdZKfOe` | 2.32 s | 55,204 | PASS |
| lc07_sample_02 | `assets/audio/challenges/ch03/lc07_expensive.mp3` | expensive | Higgins / Kelvin, canonical voice | `SrzFkD5thsvpOL5GKbPQ` | 1.52 s | 42,665 | PASS |
| lc07_sample_03 | `assets/audio/challenges/ch03/lc07_delivery.mp3` | delivery | Higgins / Kelvin, canonical voice | `ViuvcuZerKyJhXcAD3EV` | 1.68 s | 45,173 | PASS |

Natural British pronunciation, normal word stress, no exaggeration, extra words or coaching. Do not slow or pitch-shift. LC07 reward/support contract and answer IDs remain unchanged.

### AM26 — five story voice moments — individual Human Audio QA PASS

All five canonical story lines have exact approved runtime recordings. Text/transcript stays in the book; replay is learner-controlled. These are the only S03 story voice moments:

| Moment | Runtime path | Exact transcript | Generation ID | Duration | Bytes | Human Audio QA |
|---|---|---|---|---:|---:|---|
| Higgins opening | `assets/audio/characters/higgins/higgins_ch03_scene03_001.mp3` | A word has a shape. One syllable usually carries more weight than the others. | `ek6PpoRvjbVRlONnoBjj` | 5.68 s | 109,121 | PASS |
| Eliza opening | `assets/audio/characters/eliza/eliza_ch03_scene03_001.mp3` | So I needn't fight with every bit of it at once? | `hll8CZetNoio50SXnmtS` | 2.40 s | 56,458 | PASS |
| Eliza pre-LC07 | `assets/audio/characters/eliza/eliza_ch03_scene03_002.mp3` | Right. I want to hear where it leans. | `N57mhxwhlDU8rYNipGte` | 2.16 s | 52,696 | PASS |
| Eliza post-LC07 | `assets/audio/characters/eliza/eliza_ch03_scene03_003.mp3` | I can hear it now. One part comes forward and the rest follow it. | `mZNKT6kgjbnFEmgrfuUG` | 3.68 s | 76,938 | PASS |
| Higgins post-LC07 | `assets/audio/characters/higgins/higgins_ch03_scene03_002.mp3` | Exactly. Find the stress first, and the word becomes easier to shape. | `pv4mhkS6TNRu6fQ6CBYY` | 4.48 s | 89,894 | PASS |

Eliza uses canonical voice ID `124kaYCknTDsnwUFdWl9`, following the established Chapter III voice arc. Higgins uses canonical Kelvin `JlptfLxaUpd8pZcw9dKd`. Pickering has no S03 audio. No new ambience, AudioManager, mixer or lifecycle was added. Individual asset Human Audio QA = PASS; S03 Human Audio Mix QA = **PASS** after the complete scene mix was listened to and approved.

## ch03_s04 — AM27 / AM28 — RUNTIME AUDIO INTEGRATED — HUMAN AUDIO QA PASS / HUMAN AUDIO MIX QA PASS

S04 story voice and objective recordings use the approved exact existing ElevenLabs generations listed below; none were regenerated, substituted, normalized or re-encoded. Individual Human Audio QA = PASS for all twelve takes (human-confirmed). Human Audio Mix QA = PASS after the complete S04 ambience/story/challenge mix was listened to and approved. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. Reuse the unchanged canonical `ch03_lesson_room` ambience and shared AudioManager lifecycle; S01–S03 files and mix values are unchanged.

### AM27 — objective LC08 sentence samples — individual Human Audio QA PASS

Exactly three normal-speed objective recordings in canonical Higgins/Kelvin voice. Replay is unlimited and read-only. The exact visible sentence remains available beside each neutral `Replay sentence N` control; control labels do not disclose the target. If a file is unavailable, the shared audio status announces this and visible text/Supported Practice remain usable. No browser TTS, alternate take, slow mode, pitch change or transcript fallback audio.

| Sample ID | Runtime filename | Generation ID | Session ID | Exact transcript | Focus | Bytes | MPEG duration | Human Audio QA |
|---|---|---|---|---|---|---:|---:|---|
| `lc08_sample_01` | `assets/audio/challenges/ch03/lc08_red_flowers.mp3` | `C75v8nwMAi4LDv77a5E5` | `GkehTeUVnboWV04JyzQC` | I wanted the red flowers. | red | 45,173 | 1.750 s | PASS |
| `lc08_sample_02` | `assets/audio/challenges/ch03/lc08_three_tickets.mp3` | `g4qwP6RN6myY2TROQ7AI` | `tQypZOjV4VNvKioCeWlM` | She bought three tickets. | three | 50,188 | 2.064 s | PASS |
| `lc08_sample_03` | `assets/audio/challenges/ch03/lc08_monday.mp3` | `gZQbWcFFvjSXBQ57rUJ4` | `mu0bYV6AkT7fX4QlRRH8` | We meet on Monday. | Monday | 38,485 | 1.332 s | PASS |

### AM28 — selected S04 story voice moments — individual Human Audio QA PASS

Exactly nine approved story voice moments are integrated inline with the matching readable dialogue. Only the demonstration's visible focused form capitalizes `BLUE`; its spoken take says “blue” with the approved contrastive focus. The neutral and focused takes remain distinct and play in that order. No Pickering audio is used.

| Moment / order | Speaker | Runtime filename | Generation ID | Session ID | Exact visible transcript (spoken transcript) | Bytes | MPEG duration | Human Audio QA |
|---|---|---|---|---|---|---:|---:|---|
| S04 opening | Higgins / Kelvin | `assets/audio/characters/higgins/higgins_ch03_scene04_001.mp3` | `PBbwBKYlbZRuMegfVqEP` | `gxJlUO0R5LC3EdkhHP34` | You found the shape inside a word. Now listen for the shape of a whole sentence. | 102,851 | 5.355 s | PASS |
| Opening response | Eliza | `assets/audio/characters/eliza/eliza_ch03_scene04_001.mp3` | `ZdlcCnZPrpNr1lz8nSUO` | `ptzxunLuFoV4mMBRKu77` | You mean some words matter more than the others? | 56,458 | 2.456 s | PASS |
| Explanation | Higgins / Kelvin | `assets/audio/characters/higgins/higgins_ch03_scene04_002.mp3` | `0FJ09RPTm1W0R1kPTJhP` | `ih7iKF5jn9rUQPrGCqWR` | Some carry more of the message. Let those words come forward. | 93,656 | 4.780 s | PASS |
| Demonstration 1 — neutral | Higgins / Kelvin | `assets/audio/characters/higgins/higgins_ch03_scene04_003.mp3` | `KE0lRpfOof5MdSx74qNM` | `Ym52m34PnOXqe36MQMyQ` | Listen: She ordered the blue hat. | 63,145 | 2.873 s | PASS |
| Demonstration 2 — focus BLUE | Higgins / Kelvin | `assets/audio/characters/higgins/higgins_ch03_scene04_004.mp3` | `dpYaIOc4SEVClkQlHkhw` | `NMB1OLbUaMJHRx67DM2T` | Now listen again: She ordered the BLUE hat. (Now listen again: She ordered the blue hat.) | 87,387 | 4.389 s | PASS |
| Recognition | Eliza | `assets/audio/characters/eliza/eliza_ch03_scene04_002.mp3` | `mck5x5LYcN6cMpLY4djT` | `uIJFmb79IUNoCgNsjyrY` | The second one sounds as if the colour matters. | 55,204 | 2.377 s | PASS |
| Pre-LC08 | Eliza | `assets/audio/characters/eliza/eliza_ch03_scene04_003.mp3` | `wdrnBeViGCh7IfmUxlXh` | `iKRSpCrxgTa1Mmk8qAc2` | So the sentence changes shape when the important word changes. | 74,430 | 3.579 s | PASS |
| Post-LC08 | Eliza | `assets/audio/characters/eliza/eliza_ch03_scene04_004.mp3` | `4XJXdtY6BQ8LBJQGfWk5` | `SWQBloHZYNp7rtI73vCx` | I can hear the sentence moving now. It isn't flat. | 73,176 | 3.500 s | PASS |
| Post-LC08 | Higgins / Kelvin | `assets/audio/characters/higgins/higgins_ch03_scene04_005.mp3` | `xXOLtnVKTYudAqtgzMtD` | `MYhIy7YXHFeQP44hVzAn` | Good. Do not force every word. Let the sentence carry you. | 82,371 | 4.075 s | PASS |

Generation API duration values are respectively 5.28, 2.40, 4.72, 2.80, 4.32, 2.32, 3.52, 3.44, 4.00, 1.68, 2.00 and 1.28 seconds. The local byte-preserved MPEG frame scans report the slightly longer container durations in the tables above; all twelve assets are non-empty, MPEG-1 Layer III / 44.1 kHz and terminate on a complete frame.

### Shared playback and ambience contract

All twelve clips use the established foreground AudioManager: explicit learner replay; a newer replay stops the prior foreground take; Sound Off stops foreground; scene changes and Teacher opening clean it up; story voice uses the existing Chapter III story duck; LC08 uses the existing conservative challenge duck (`CH02_AUDIO_MIX`: ambience 0.10 × challengeDuck 0.08 = 0.008 while a sample plays, restored to 0.10 afterward). The unchanged canonical `ch03_lesson_room` loop is `assets/audio/ambience/ch03_higgins_house_lesson_ambient.mp3` (89.992 s, 2,159,803 bytes, SHA-256 `DDF96D046967C4E025AA25E6083220CCD4015C47C2710D4D4755C61BCB9DB311`). No new mixer, ambience file or fallback synthesis was added.

Playback/replay never writes D07, LC08 answers, attempts, support, rewards or scene completion. D07 remains a non-punitive strategy choice. LC08's unaided completion still grants Pronunciation +1 once via `ch03_lc08_completed`; target-revealing support permanently removes that eligibility and supported completion has no reward or penalty. `ch03_s04_complete` still requires D07, completed LC08 and explicit Continue. Teacher preview may explicitly replay clips but remains read-only. S01/S02 Human Audio Mix QA PASS and S03 Human Audio Mix QA PASS are preserved; S04 Human Audio Mix QA = **PASS**.

## ch03_s05 — S05 BOOK-FIRST AUDIO INTEGRATED; MIX QA PENDING

Reuse the continuous canonical `ch03_lesson_room` 90-second lesson-room ambience. Let it continue beneath the longer lesson; no rain layer, new ambience, new mixer or reset is needed. Keep the existing AudioManager, Chapter III story duck, LC challenge duck and replay/cleanup lifecycle. Sound and voice remain optional enhancements to the readable book. The eight approved files were generated earlier; this runtime integration generated no audio.

Exactly five approved story voice moments are integrated inline with their matching readable dialogue. Other lines remain visible text. Preserve Eliza's canonical voice `124kaYCknTDsnwUFdWl9`, stage `Chapter III – Conscious Training`; fatigue and recovery change pacing, breath and control, never voice identity. Higgins uses canonical Kelvin `JlptfLxaUpd8pZcw9dKd`, calm, precise and non-cruel. User-confirmed individual Human Audio QA is PASS for all eight files; S05 Human Audio Mix QA remains pending.

| Moment | Speaker / voice ID | Runtime file | Generation ID | Exact visible and spoken transcript | Bytes | MPEG duration |
|---|---|---|---|---|---:|---:|
| AM29-E1 | Eliza / `124kaYCknTDsnwUFdWl9` | `assets/audio/characters/eliza/eliza_ch03_scene05_001.mp3` | `w8z8OBbiGmpgCrqtiSMm` | I did it well earlier. Why can't I do it now? | 64,399 | 2.93 s |
| AM29-H1 | Higgins / `JlptfLxaUpd8pZcw9dKd` | `assets/audio/characters/higgins/higgins_ch03_scene05_001.mp3` | `AN4yTjMywuhpEck1ulIZ` | You are tired. More force will not help. | 57,712 | 2.51 s |
| AM29-E2 | Eliza / `124kaYCknTDsnwUFdWl9` | `assets/audio/characters/eliza/eliza_ch03_scene05_002.mp3` | `JDapm3gzeN7c7jkLNfkq` | I can finish this page… before we stop. | 68,161 | 3.16 s |
| AM29-H2 | Higgins / `JlptfLxaUpd8pZcw9dKd` | `assets/audio/characters/higgins/higgins_ch03_scene05_002.mp3` | `14kWaekUzJI8jRBgv1sa` | Good. Slower is not worse. It gives you room to hear yourself. | 88,641 | 4.44 s |
| AM29-E3 | Eliza / `124kaYCknTDsnwUFdWl9` | `assets/audio/characters/eliza/eliza_ch03_scene05_003.mp3` | `PiwJBtStdfX63oE6yPuW` | I can get it back. | 35,978 | 1.15 s |

LC09 objective audio uses exactly one whole-sentence recording for each keyed sample, default speaker Higgins/Kelvin. Replay is available beside the visible sentence; its neutral label does not disclose the answer or alter challenge state. No timeline, slow mode, browser TTS or answer-bearing take.

| Sample | Runtime file | Generation ID | Exact visible and spoken transcript | Bytes | MPEG duration |
|---|---|---|---|---:|---:|
| `lc09_sample_01` | `assets/audio/challenges/ch03/lc09_lesson_ends.mp3` | `Ue2V0w0Q5yGEu2Dy17Dn` | When the lesson ends I will rest. | 53,950 | 2.27 s |
| `lc09_sample_02` | `assets/audio/challenges/ch03/lc09_slow_my_pace.mp3` | `4intscAdWnqpAyJDfieA` | If I slow my pace I can hear each word. | 66,907 | 3.08 s |
| `lc09_sample_03` | `assets/audio/challenges/ch03/lc09_need_a_moment.mp3` | `zQcI8ajUgqVAh7DnWD7k` | I know the words but I need a moment. | 56,458 | 2.43 s |

All eight approved S05 assets use the established AudioManager: explicit learner replay; a newer foreground take stops the previous one; Sound Off, scene changes and Teacher opening clean it up. Story moments use the existing Chapter III story duck; LC09 uses the existing conservative challenge duck (`CH02_AUDIO_MIX`: ambience 0.10 × challengeDuck 0.08 = 0.008 while a sample plays, restored to 0.10 afterward). The continuous canonical `ch03_lesson_room` ambience is reused unchanged. S01–S04 mappings and mix values are unchanged. Audio replay does not mutate LC09 answers, attempts, support, rewards or scene completion. Individual Human Audio QA is PASS; Human Audio Mix QA is pending. No audio was generated as part of integration.

## ch03_s06 — S06 PRE-PRODUCTION CANON LOCKED; AUDIO PLANNED / NOT GENERATED

Reuse the continuous `ch03_lesson_room` ambience unchanged; no new ambience or SFX is required. Keep the existing AudioManager, Chapter III story/challenge duck and replay/cleanup lifecycle. Audio is optional; dialogue and challenge remain understandable as text. No audio is generated or integrated by this plan.

Eliza remains voice ID `124kaYCknTDsnwUFdWl9`, model `eleven_v3`, Chapter III – Conscious Training: recognisably Cockney, more deliberate than her earlier voice-stage, but not yet Chapter IV Emerging New Speech. Higgins remains Kelvin `JlptfLxaUpd8pZcw9dKd`, `eleven_v3`, precise and understated. No Pickering or Mrs Pearce recording is necessary.

### AM31–32 — optional story voice

| Moment | Speaker / voice ID | Planned file | Exact spoken text | Separate performance intent |
|---|---|---|---|---|
| AM31 | Eliza / `124kaYCknTDsnwUFdWl9` | `assets/audio/characters/eliza/eliza_ch03_scene06_001.mp3` | That came too quickly. Let me try again. | Brief self-noticing; calm, practical, no shame. Keep Chapter III identity and articulation. |
| AM32 | Higgins / `JlptfLxaUpd8pZcw9dKd` | `assets/audio/characters/higgins/higgins_ch03_scene06_001.mp3` | You heard it before I spoke. | Quiet recognition, matter-of-fact; no sentimental praise. |

### AM33 — LC10 objective samples

Use exactly one Eliza recording per sample, each containing the spoken first attempt and self-correction together. One clip per item avoids separate takes for the same sample. For future ElevenLabs `creative_generate_speech.prompt`, include ONLY the exact spoken text quoted below; do not put production instructions inside the speech prompt. Performance intent is metadata kept outside that text.

| Sample ID | Planned file | Voice ID | Exact spoken text / transcript | Separate performance intent |
|---|---|---|---|---|
| `lc10_sample_01` | `assets/audio/challenges/ch03/lc10_three_books.mp3` | `124kaYCknTDsnwUFdWl9` | Free books—no, three books, please. | First word tentative; self-correction clear and unforced. Do not exaggerate or mock the contrast. |
| `lc10_sample_02` | `assets/audio/challenges/ch03/lc10_green_book.mp3` | `124kaYCknTDsnwUFdWl9` | The blue book—no, the green one, please. | Natural contrast on the corrected colour; no overemphasis. |
| `lc10_sample_03` | `assets/audio/challenges/ch03/lc10_parcel.mp3` | `124kaYCknTDsnwUFdWl9` | Leave it by the door—no, after the lesson, please leave the parcel by the door. | First attempt is quick; the repair has a natural pause and clear chunks, not a lesson-performance voice. |

Replay reuses the same sample. Visible situation and choices remain available without sound; any transcript/reveal follows STATE_AND_BRANCHING.md and its support/reward contract. No browser TTS, student recording, alternate slow take or answer-bearing asset. Sound Off/On, foreground ownership, story/challenge duck and scene cleanup remain on the shared architecture. This is a plan only; no audio generation or runtime mapping exists yet.
