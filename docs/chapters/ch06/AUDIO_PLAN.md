# Chapter VI Audio Plan

Status: S01 reuses one already human-approved ambience; S02 audio audit is complete with one approved historical voice replay reused and all other S02 moments text-only. No new audio generated. S03–S05 remain design only. Chapter VI story canon is locked. The plan uses the existing range `AM53–AM60`; every spoken asset requires an accessible text counterpart. Story text remains complete with sound off. Do not create nine recordings for three directions by three rhetorical shapes.

| ID | Scene / moment | Plan | Status | Notes |
|---|---|---|---|---|
| `AM53` | S01 first-contact exchange | Reuse shared speech only if approved Chapter V takes naturally fit; otherwise short original lines for Higgins, Pickering and Mrs Pearce | OPTIONAL | Text is primary. `next_contact` selects contact; one matched take per companion only if audio adds value. No branch receives more useful information. |
| `AM54` | S01 morning room | Quiet morning/workroom ambience | OPTIONAL | Low-level, loopable, easy mute; no letter contents or plot clue conveyed only by sound. |
| `AM55` | S02 memory echoes | Reuse approved earlier Eliza story-voice clips | REUSE | Select at most three available BEFORE / DURING / AFTER moments with transcript. Never copy a clip into a new misleading context. |
| `AM56` | S02 reflection | One short original Eliza reflection, “I learned another way to speak. I did not lose the first.” | OPTIONAL | Same canonical Eliza voice identity and a natural Chapter VI delivery, more at ease than Chapter V rather than simply more formal. |
| `AM57` | S03 LC15 samples | Three original Eliza samples: public meeting, familiar colleague, private adviser | REQUIRED | These are the only challenge-critical recordings. Keep the underlying intention aligned; contextual clues audible and visible in the equivalent no-audio panels. Individual transcripts are stored for use after solving/support. |
| `AM58` | S03 response/feedback | No bespoke voice required; optional shared short neutral support cue | OPTIONAL | No audio-only correctness signal. Feedback text names contextual evidence. Do not voice answer labels as a hint before response. |
| `AM59` | S05 shared final Eliza line after branch convergence | One original Eliza recording: “I have more ways to speak, and the choice is mine.” Reuse the same take across all three directions and all statement shapes | REQUIRED | One required reusable take serves all three directions. Direction-specific story text remains on screen. Do not create three direction-specific closing takes unless a later implementation review proves them dramaturgically necessary. |
| `AM60` | S05 ending space | Reuse appropriate approved, non-identifying ambience if possible; otherwise one quiet shared bed | REUSE | Avoid three bespoke ambience tracks unless later production shows a clear need. Never encode quality or reward in ambience. |

## Required new Eliza lines

- Three LC15 samples (`AM57`), one per pragmatic context.
- One shared final Eliza line (`AM59`), reused across all three directions and all `final_statement_shape` values.

## S01 production record — AM53–AM54

### AM53 — optional first-contact companion speech; deliberately text-only

No S01 speech is marked REQUIRED. The script is book-first, and no Eliza line is required for audio. Narration and every Eliza response remain readable text. The three optional companion opening lines below were not generated: they do not add information beyond the visible dialogue, so route-specific voice would add cost without improving comprehension. No exact matching approved Chapter V recording was found.

| Route / speaker | Exact canonical candidate text | Canonical voice | Voice ID | Reuse | Decision / cost estimate |
|---|---|---|---|---|---|
| `higgins_directly` · Higgins | “The public invitation would show what the lessons can achieve.” | Kelvin | `JlptfLxaUpd8pZcw9dKd` | No exact approved take found | OPTIONAL; text-only. Estimate-only, one take: 61.99 credits (about $0.0113). No generation, no charge. |
| `pickering_first` · Pickering | “I thought the public invitation might interest you. But I should ask: what interests you?” | George | `JBFqnCBsd6RMkjVDRZzb` | No exact approved take found | OPTIONAL; text-only. Estimate-only, one take: 88.99 credits (about $0.0162). No generation, no charge. |
| `mrs_pearce_first` · Mrs Pearce | “Before you answer any invitation, ask about the pay, the hours and where you would stay.” | Sally Ford | `kBag1HOZlaVBH7ICPE8x` | No exact approved take found | OPTIONAL; text-only. Estimate-only, one take: 87.99 credits (about $0.0160). No generation, no charge. |

Neutral/missing `next_contact` has no companion line or invented audio. Since no S01 speech is required, there are no S01 replay buttons, foreground auto-play, or speech duck/restore events. Route isolation is maintained by the existing text-only contact route and empty `voice` list.

### AM54 — quiet Wimpole Street interior ambience; REUSE

| Field | Record |
|---|---|
| Role / status | Quiet morning/workroom interior bed; OPTIONAL in the canon, reused because the existing approved room tone fits naturally. |
| Runtime path | `assets/audio/ambience/higgins_house_interior.mp3` (existing, unchanged; 337,872 bytes, 20 s). |
| Provenance | Existing human-approved Chapter II ambience; Generation ID `EH1q5BoFNyVXdakm2n9W`. It was already approved as very quiet indoor room tone, with household clock/fireplace/wood-creak texture and no intelligible speech or music. |
| Asset Library ID | N/A; no ID is recorded in the project manifest, and the current ElevenLabs available-assets search returned no match. |
| Approval | HUMAN APPROVED in Chapter II; reused unchanged. No new generation and no generation cost. |
| Runtime behavior | `ch06_s01` maps to the existing interior ambience at the approved `0.10` base level. It waits for the normal conscious audio gesture, loops, stops on Sound Off, and resumes ambience only on Sound On. S02 remains unwired. |

No ambience transcript is required. No transcription or speech-recognition credits were used. S01 continues to work fully with sound off.

## S02 — AM55 historical replay / AM56 reflection — AUDIO AUDIT COMPLETE

S02 is reflective and book-first. The canon requires no new speech: AM56 is OPTIONAL, not REQUIRED. Keep both canonical Eliza reflections as readable story text and leave `CH06_SCENE_02.voice` empty. AM56 is deliberately text-only; its 57-character candidate would be approximately 57 TTS text credits if produced under character-based billing, but no generation was requested or needed (0 credits spent). Do not add acting notes or generate a take just to complete the scene.

AM55 permits up to three available historical moments. Keep the transcript cards selected from history, but expose an audio control only for a source whose approval is documented:

| S02 replay card | Source moment / scene | Exact visible transcript | Source runtime path | Approval and S02 treatment |
|---|---|---|---|---|
| An early reason | Chapter I `AM09`, `ch01_s05` | “People hear how I talk before they see what I can do. Maybe if I could talk another way, it'd open a door or two. Wouldn't make me worth more. Just give me another way to make 'em listen.” | `assets/audio/characters/eliza/eliza_ch01_scene05_001.mp3` | Existing file is technically verified, but the Chapter I asset manifest records `HUMAN QA PENDING`; it does not satisfy AM55's approved-source requirement. Do not map/play it from S02. Retain the transcript card only. The source clip remains owned by Chapter I and is not duplicated. |
| A learning moment | Chapter III `AM29-E3`, `ch03_s05` | “I can get it back.” | `assets/audio/characters/eliza/eliza_ch03_scene05_003.mp3` | Existing source is documented as Human Audio QA PASS and the local file is verified by the Chapter III test. Reuse this path directly from the S02 replay button; no copy. |
| A Chapter V reception moment | Chapter V `AM48`, `ch05_s03` | “I know what I contributed.” | None | AM48 is OPTIONAL and explicitly NOT GENERATED in the Chapter V plan. Retain the visible transcript card when `credit_response` exists; no audio control or invented substitute. |

All replay cards remain optional and read-only. Only an explicit replay button starts the available AM29-E3 clip. The shared `AudioManager` owns one foreground clip; Sound Off stops it, and Sound On restores ambience only without restarting interrupted speech. Replay and render write no choices, signals, events, rewards or completion. S02 has no dedicated or required ambience: `ambienceForScene('ch06_s02')` resolves to silence. Do not carry S01's room tone into this distinct private room or substitute reception, public-room or evening-exterior ambience. Silence is valid.

Accessibility decision: narration, both reflection lines and each historical moment's text remain visible with sound off. Replay is optional, no audio or ambience carries a clue, and explicit Continue remains available without sound. Estimated new speech required: zero; ElevenLabs spend: zero. No binary was copied or generated.

## Optional companion lines

S01 companion exchanges are optional story voice. If recorded, record only the chosen line set for each character and use visible dialogue text. No Chapter VI companion may claim ownership of Eliza's success. Existing Chapter V audio may be reused only where wording and performance exactly match; otherwise text-only is preferred over forcing a reuse.

## LC15 transcript and accessibility contract

Each LC15 sample needs a verified transcript, replay control, keyboard-accessible answer selection, and the equivalent contextual text alternative defined in `SCRIPT.md`. The paraphrase alternative must preserve the same difficulty and evidence without revealing the answer. Raw transcript is not the pre-answer fallback. No audio or support use carries a penalty. Verify transcript against final recording before asset approval.

## Ambience

One restrained S01 morning room ambience and optional quiet S05 shared ending ambience are sufficient. Silence is valid. Ambience never carries story-critical content and respects the existing global ambience and Sound Off/On contract.
