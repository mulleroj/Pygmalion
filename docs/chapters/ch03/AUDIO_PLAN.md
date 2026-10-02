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

[Scene-map](../../SCENE_MAP.md) placeholders only: S02 AM23–24 minimal pairs/voice; S03 AM25–26 word stress/Mrs Pearce; S04 AM27–28 intonation/Eliza; S05 AM29–30 correction/rain; S06 AM31–32 customer order/Eliza. No later production text, sample casting, mix or lifecycle is locked.

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
