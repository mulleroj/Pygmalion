# Chapter III Audio Plan

Status: S01 CONTENT LOCKED; AM21 + lesson-room runtime mix HUMAN APPROVED. Approved AM21 story takes are Human Audio QA PASS and integrated as optional explicit-play story controls. LC05 sample paths remain PLANNED / NOT GENERATED / NOT INTEGRATED. Lesson-room ambience reuses existing approved interior bytes; runtime mix = Human Audio Mix QA PASS. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. Audio moment != audio file.

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

Ambience ID ch03_lesson_room; runtime reuse path assets/audio/ambience/higgins_house_interior.mp3. The previously planned ch03_lesson_room_001.mp3 is not created: no duplicate is needed. Quiet indoor air with restrained room/fireplace texture consistent with the reused study plate; no rain bed, intelligible voices or soundtrack music. Continuous seamless loop, separate from AM22. AM21/AM22 IDs are preserved; this ambience is scene metadata, not an invented AM23.

- On student transition from Chapter II, crossfade the house interior into this explicit layer after a conscious gesture and only with Sound enabled. No fallback to Chapter I rain. Missing media yields silence without blocking the book.
- Maintain track position through S01 rerenders and challenge/replay. Later S02 continuity is NOT YET LOCKED; do not infer a new restart or shared group before its specification.
- Duck during optional story voice; stronger duck during LC05; smoothly restore without restarting. Current S01 gains/durations/mix below = Human Audio Mix QA PASS. LC05 audio remains PENDING / NOT IMPLEMENTED.
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

Ambience reuse audit: the approved Chapter II interior v3 (EH1q5BoFNyVXdakm2n9W) contains mechanical clock ticks, fireplace crackle and occasional wood creak without hum/drone, per the Chapter II production record. This matches the reused study/first lesson context. ch03_lesson_room maps to the same unchanged higgins_house_interior.mp3 bytes. The gramophone is a separate file/cue and is not mapped into S01; no additional scheduled clock strikes are used. Embedded ticking = approved in current mix; Human Audio Mix QA PASS. Keep it unchanged.

AM22 = PENDING HUMAN-GENERATED/APPROVED ASSET. Inventory contains no approved gentle pencil/paper/lesson-handling sound; flowers-fall and the quarter-hour gong are unsuitable substitutes and remain unwired. LC05 audio = PENDING / NOT IMPLEMENTED; objective samples remain unavailable; the transcript-supported route is retained.

Existing interior mix values are reused without adjustment: ambience 0.10; story duck ×0.28 to 0.028; restore 160 ms; ambience crossfade 700 ms; Sound Off fade 180 ms. Native story voice stays dry at gain 1 with normal rate/pitch and no EQ/reverb/spatialisation. Existing AudioManager foreground ownership, replay, Sound Off/On and scene-exit lifecycle are reused. Runtime mix = Human Audio Mix QA PASS, explicitly approved with both AM21 takes and embedded ticking.

Technical ingestion: Higgins 226695 bytes, MPEG-1 Layer III mono 44100 Hz, frame duration 13.113 s (approximately 13.04 s audible); SHA-256 76f8ca8c8396f15f33631a769edb242e34033ebe5f0068137805a19756c7013e. Eliza A 95874 bytes, same format, frame duration 4.937 s (approximately 4.88 s audible); SHA-256 78e3ea6ff328c63d80c6d4c8f2736cd027cfdf3bbaa464f4f8b7ee8595c17232. MPEG frame scan reaches EOF with no truncated frames; Browser decode PASS: duration 13.04 s / 4.88 s, readyState 4, no media error. Signed download URLs are not stored in project documentation.

Human Audio Mix QA: open ch03_s01; confirm silence before gesture, play Higgins then Eliza, replay/interrupt each, judge speech clarity and embedded ticking at the reused room level, toggle Sound Off/On (no automatic speech replay), open/exit read-only Teacher preview and confirm no progress change. Verify duck/restore and no rain, gramophone, gong or AM22. Isolated takes = PASS; final S01 mix = Human Audio Mix QA PASS (including embedded ticking).
