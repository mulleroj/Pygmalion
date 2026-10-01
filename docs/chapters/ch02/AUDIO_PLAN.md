# Chapter II Audio Plan – The Bargain

Audio plan for the Chapter II content lock, with the first controlled s01/s02 local audio ingest. No new audio was generated for this ingest.

## Book-first contract

BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE

- SCRIPT.md is the primary story content.
- Every OPTIONAL STORY VOICE line below must match a visible player-facing line in SCRIPT.md exactly, including wording and punctuation.
- No story voice may add a sentence, paraphrase, hidden narrative fact, or performance direction to the spoken text.
- Delivery direction is metadata only.
- LC04 samples are challenge content and may have audio text that is separately shown as the challenge transcript.
- SFX and ambience are optional and never carry critical story information.

## Canonical casting

- Eliza in Chapter II uses Voice Arc Stage 1 – Controlled Cockney; the canonical voice remains `Eliza - young_cockney`. Full rules and references are in [docs/audio/ELIZA_VOICE_ARC.md](../../audio/ELIZA_VOICE_ARC.md).
- Eliza: Eliza - young_cockney, 124kaYCknTDsnwUFdWl9, eleven_v3.
- Higgins: Kelvin - Calm Young British Male, JlptfLxaUpd8pZcw9dKd, eleven_v3.
- Pickering: George - Warm, Captivating Storyteller, JBFqnCBsd6RMkjVDRZzb, eleven_v3.
- Mrs Pearce: Sally Ford, Voice ID `kBag1HOZlaVBH7ICPE8x`, model `eleven_v3`, status `APPROVED / CANONICAL`.

## Story voice moments

| Asset ID | Scene | Speaker | Exact spoken text | Voice / ID | Delivery note | Expected path |
|---|---|---|---|---|---|---|
| AM11 | ch02_s01 | Eliza | Good morning. I've come to see Mr Higgins. I want lessons. | Eliza / 124kaYCknTDsnwUFdWl9 | determined, nervous, direct | assets/audio/characters/eliza/eliza_ch02_scene01_001.mp3 |
| AM13 | ch02_s01 | Higgins | You have crossed the city for a change of speech? | Higgins / JlptfLxaUpd8pZcw9dKd | precise, fascinated, socially unaware | assets/audio/characters/higgins/higgins_ch02_scene01_001.mp3 |
| AM14A | ch02_s02 | Pickering | A lesson should help her choose, not simply measure her. | Pickering / JBFqnCBsd6RMkjVDRZzb | calm, respectful | assets/audio/characters/pickering/pickering_ch02_scene02_001.mp3 |
| AM15 | ch02_s03 | Mrs Pearce | Before we begin, we must know the hours, the cost, and what you need. | Sally Ford / kBag1HOZlaVBH7ICPE8x | practical, firm, humane | assets/audio/characters/mrs-pearce/mrs-pearce_ch02_scene03_001.mp3 |
| AM16 | ch02_s03 | Eliza | I'm paying for lessons. I'm not giving up my say in them. | Eliza / 124kaYCknTDsnwUFdWl9 | controlled boundary, still recognisably Flower Girl | assets/audio/characters/eliza/eliza_ch02_scene03_001.mp3 |
| AM17 | ch02_s04 | Higgins | Three mornings each week. Practice between lessons. A fixed fee. | Higgins / JlptfLxaUpd8pZcw9dKd | precise, formal, not cruel | assets/audio/characters/higgins/higgins_ch02_scene04_001.mp3 |
| AM19 | ch02_s05 | Eliza | I am here to learn more ways to speak. I will choose what those ways are for. | Eliza / 124kaYCknTDsnwUFdWl9 | purposeful, controlled, no sudden transformation | assets/audio/characters/eliza/eliza_ch02_scene05_001.mp3 |

AM16 is retained because its visible line has a genuine narrative function: Eliza states the boundary that makes the agreement meaningful. It is not a voice-only addition.

## AM14 – LC04 listening challenge group

These are explicit challenge content, not ordinary story voice. Each sample needs a visible transcript, replay, and stable IDs.

| Sample asset ID | Sample ID | Exact spoken text | Speaker / voice | Correct answer ID | Expected path |
|---|---|---|---|---|---|
| LC04-01 | lc04_sample_offer | I can give you three lessons each week, and I can show you how to practise. | Higgins / JlptfLxaUpd8pZcw9dKd | lc04_offer | assets/audio/listening/ch02_lc04_001.mp3 |
| LC04-02 | lc04_sample_evaluation | You listen carefully. That is a useful beginning, but your question needs a clearer ending. | Pickering / JBFqnCBsd6RMkjVDRZzb | lc04_evaluation | assets/audio/listening/ch02_lc04_002.mp3 |
| LC04-03 | lc04_sample_condition | If you stay for lessons, you must keep the agreed hours. | Sally Ford / kBag1HOZlaVBH7ICPE8x | lc04_condition | assets/audio/listening/ch02_lc04_003.mp3 |

The sample presentation order is shuffled once and persisted by sample and option ID. Replay, retry, and refresh preserve the order while the challenge state exists. The answer key never depends on presentation position.

## Local ingest and listening-QA status

The following seven exact recordings were downloaded from user-supplied signed URLs and decoded successfully in Chromium. Signed URLs are temporary download credentials and are not stored in this document or runtime code. Byte sizes are the unchanged downloaded originals; no MP3 processing or replacement takes were used.

| Role / version | Generation ID | Exact runtime path | Bytes | Decoded duration | Human status |
|---|---|---|---:|---:|---|
| London street v2 | C1rCLdEUIbZ3xXVLU0H5 | assets/audio/ambience/higgins_house_morning_entry.mp3 | 337872 | 20 s | HUMAN APPROVED |
| Higgins house interior v3 | EH1q5BoFNyVXdakm2n9W | assets/audio/ambience/higgins_house_interior.mp3 | 337872 | 20 s | HUMAN APPROVED |
| Gramophone v2 | Uwm2nCQV7qMWC0ehARIn | assets/audio/ambience/gramophone_distant.mp3 | 594033 | 24 s | HUMAN APPROVED |
| AM14A — Pickering / George | oHftES1aedfWtbVGZDT4 | assets/audio/characters/pickering/pickering_ch02_scene02_001.mp3 | 69124 | 3.20 s | HUMAN APPROVED IN MIX |
| LC04-01 — Higgins / Kelvin | E1mR4yeC9N8haFAY8pkk | assets/audio/listening/ch02_lc04_001.mp3 | 84589 | 4.16 s | HUMAN APPROVED IN MIX |
| LC04-02 — Pickering / George | cd7lgnOX0Ip3qLkVcN3F | assets/audio/listening/ch02_lc04_002.mp3 | 148537 | 8.16 s | HUMAN APPROVED IN MIX |
| LC04-03 — Mrs Pearce / Sally Ford | vFooVSERnMiVDGJjLxu7 | assets/audio/listening/ch02_lc04_003.mp3 | 85843 | 4.24 s | HUMAN APPROVED IN MIX |

Technical status: `LOCAL / TECHNICALLY VERIFIED`. Human listening QA approved all seven recordings in the actual running scene mix: `CH02_S02 AUDIO MIX: HUMAN APPROVED`. The four voice clips are `HUMAN APPROVED IN MIX`; the three ambience recordings remain `HUMAN APPROVED`. AM16 is integrated and HUMAN APPROVED IN MIX as recorded below. AM15 is integrated and HUMAN APPROVED IN MIX as recorded below. Other planned Chapter II voices and AM12/AM18 remain unavailable and unwired. Canonical voice IDs/model remain as listed above (`eleven_v3`); gramophone v2 uses `eleven_music_v2`.

## AM16 — s03 human-approved integration

Status: `HUMAN APPROVED IN MIX`.

- Exact generation: `RpXMVLeYjASKqUTvd9UB`; session: `LBaYFyugkKbGgd4xo04c`; flow: `5T7OLpSpdbXViBKlfqkh`.
- Voice: `Eliza - young_cockney` / `124kaYCknTDsnwUFdWl9`; model: `eleven_v3`.
- Local original: `assets/audio/characters/eliza/eliza_ch02_scene03_001.mp3`; HTTP 200, 70378 bytes, Chromium decoded duration `3.28 s`.
- Locked transcript: “I'm paying for lessons. I'm not giving up my say in them.” Explicit Play appears only beside this Eliza line; no autoplay or story-state writes.
- Existing interior mix: base `0.10`, story duck `× 0.28`, restore without restarting the loop. No s03 gramophone or contextual SFX.
- AM15 is integrated separately below. The earlier Mrs Pearce audition is not substituted.

Human listening QA approved this exact AM16 take in the s03 runtime mix: interior base `0.10`, story duck `× 0.28`, effective ambience `0.028`, and correct restore to `0.10`. The seven s02 approvals above remain unchanged.

## AM15 — Mrs Pearce human-approved runtime mix

Status: `HUMAN APPROVED IN MIX`.

- Exact generation: `e2FSZ2n7LLv4lHiZG1bN`; session: `mPsraS9EByJwT5PxnyQG`; flow: `bMbCRS4zjlTxEn3jVIWU`.
- Canonical voice: `Sally Ford` / `kBag1HOZlaVBH7ICPE8x`; model: `eleven_v3`.
- Original local file: `assets/audio/characters/mrs-pearce/mrs-pearce_ch02_scene03_001.mp3`; HTTP 200, 111338 bytes. Chromium decoded duration: `5.84 s`.
- Locked transcript: “Before we begin, we must know the hours, the cost, and what you need.” Explicit Play only beside this Mrs Pearce line; presentation-only, no autoplay or story-state writes.
- Existing story mix: interior `0.10`, duck `× 0.28` to `0.028`, restore to `0.10` on the same loop. AM15 and AM16 share foreground ownership. No new SFX, gramophone or ambience.
- Scene status: `CH02_S03 AUDIO: HUMAN APPROVED`. Human listening QA approved the exact AM15 and AM16 takes in the runtime mix above. Both are `HUMAN APPROVED IN MIX`.

## Human-approved runtime mix

- Base ambience volume: `0.10`; story voice duck: `× 0.28` (effective `0.028`); LC04 duck: `× 0.08` (effective `0.008`).
- Contextual gramophone volume: `0.012`; story voice duck: `× 0.10` (effective `0.0012`); LC04 volume: `0`. Human listening QA approved this quieter mix value.
- Speech source gain: `1`; no automatic story voice or LC04 playback.
- Scene-entry fade / base crossfade: `700 ms`; duck / restore ramp: `160 ms`; Sound-off loop fade target duration: `180 ms`.
- Gramophone is a finite diegetic cue in s02, not a continuous loop, soundtrack, or third design-level base ambience group. Play once after valid unlock during each actual scene visit, with the existing `700 ms` entry fade; start a linear `3000 ms` fade-out after `18000 ms` of successful playback and stop at `21000 ms`. Use volume and ducking only: no destructive MP3 edits, low-pass filter, or new Web Audio subsystem.
- Re-renders, voice/LC04 restores, and Sound off/on never restart a consumed gramophone cue. Sound off stops an active cue; leaving the scene resets its eligibility for a later visit. Refresh/deep-link requires a fresh valid audio gesture. Playback eligibility/timing lives only in AudioManager memory, never persistent story state/localStorage. Ducking composes with the finite fade envelope and cannot cancel its expiry.
- Keep the same interior loop instance/time position through future s02–s05 transitions; contextual layers can fade independently. Later scenes remain unimplemented.
- Browser unlock is session-only and requires a conscious user gesture. Blocked playback retries the same loop after a later gesture; missing audio never blocks story/challenge completion.
- Foreground speech has a single owner. A new explicit voice/sample request stops the previous clip; only the current owner can restore ducking on still-active layers. Sound off stops speech, SFX, and the gramophone cue and fades/stops base loops; Sound on resumes scene base loops only, not speech or a consumed gramophone cue.
- Human listening QA approved the ambience/gramophone levels, gramophone timing, story-voice ducking, and LC04 duck/mute behavior above. Gramophone remains a one-shot contextual cue per scene visit, never an infinite soundtrack.

## Casting approval evidence

Sally Ford was human listening QA approved as the canonical Mrs Pearce voice using the audition line:

“Before we begin, we must know the hours, the cost, and what you need.”

The audition MP3 is not a final runtime asset unless it exactly corresponds to one of the final planned audio assets above. No final Mrs Pearce audio is generated in this pass.

## SFX

| Asset ID | Scene | Content | Expected path |
|---|---|---|---|
| AM12 | ch02_s01 | Door opening, hallway steps, and the acoustic change from street to house. No speech. | assets/audio/sfx/house-entry-001.mp3 |
| AM18 | ch02_s04 | Coins placed on the table, pen on paper, and a distant clock. No speech. | assets/audio/sfx/lesson-terms-001.mp3 |

SFX remains subtle and may be split into local one-shot files during production if that improves control. It must not be required for scene comprehension.

## Contextual ambience

Use two design-level ambience groups only. AM20 is the Chapter II interior ambience moment:

| Scenes | Ambience ID | Behavior |
|---|---|---|
| ch02_s01 | higgins_house_morning_entry | Short exterior / entry bed. Start after conscious interaction and crossfade gently when Eliza enters. |
| ch02_s02–ch02_s05 | higgins_house_interior | Very quiet indoor room tone. Continue across ordinary scene transitions without unnecessary restart. |

Interior context comes primarily from the visible story and subtle SFX: doors, steps, paper, pen, coins, distant clock, and only an occasional household sound when it serves the scene.

The ingested interior v3 contains mechanical clock ticks, fireplace crackle, and occasional wood creak without a hum/drone. The approved gramophone v2 is the clean original 24 s instrumental Edwardian parlour source, treated as a quiet sound from another room in s02 by the runtime mix only.

## Accessibility and production gate

- Story text remains complete with sound disabled.
- Every story voice and LC04 sample has visible text/transcript.
- Replay is available for story voice and LC04 samples.
- Ambient is optional and never blocks progress.
- TTS text contains dialogue only; delivery notes stay in this document.
- The content lock itself generates no audio. The local ingest above records the supplied human approvals, including final listening approval of the s02 voices and mix.
