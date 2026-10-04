# Chapter IV State and Branching

Status: `S01 and S02 implemented against locked canon; S02 Human Visual QA PASS at 1280x800; approved audio playback/integration QA PASS`.

## Shared state

Inherit the shared save, decision ledger, challenge state and event ledger. `visualStage` remains scene metadata, not persistent Eliza state. Do not introduce a new top-level field for Chapter IV.

## S01 — The Invitation

S01 introduces no language challenge and no top-level flags.

### D08 contract

Stable decision ID: `D08`. Persist only the selected stable option ID in the existing `decisions.D08` ledger entry. Append `ch04_d08_recorded` exactly once. The existing persisted decision ledger restores the choice after refresh. Do not create a separate legacy strategy field or any other parallel/top-level D08 state. No signal change, challenge reward, score loss, ending gate, or hidden moral judgement is attached.

| Option ID | Stored value | Character meaning |
| --- | --- | --- |
| `d08_practise_greeting` | `d08_practise_greeting` | Practise a simple greeting. |
| `d08_plan_message` | `d08_plan_message` | Think about what she wants to say. |
| `d08_listen_first` | `d08_listen_first` | Listen first and observe. |

All options are valid and converge to S02. A prior D08 record is read-only; replay, render, refresh and Teacher preview do not append another event or mutate the choice. D08 is not an S02 gate and does not affect LC11.

### Completion and transition

Only after D08 is recorded and the learner explicitly selects Continue, append `ch04_s01_complete` once and navigate to `ch04_s02`. Continue adds no development signal. Rendering, replay, audio completion, refresh, or Teacher preview cannot complete or navigate the scene.

## S02 — Names and Weather

### LC11 identity and samples

Stable challenge ID: `LC11`; persistent state belongs under `challenges.lc11`. Use three ordered sample IDs and answer IDs:

| Sample ID | Spoken sample | Answer IDs (option order may vary uniformly) | Correct category |
| --- | --- | --- | --- |
| `lc11_sample_01` | Miss Doolittle, have you been in London long? | `lc11_01_opening`, `lc11_01_continuing`, `lc11_01_closing` | `lc11_01_opening` — opening |
| `lc11_sample_02` | I see. And what do you think of the weather today? | `lc11_02_opening`, `lc11_02_continuing`, `lc11_02_closing` | `lc11_02_continuing` — continuing |
| `lc11_sample_03` | Well, it was lovely speaking with you. | `lc11_03_opening`, `lc11_03_continuing`, `lc11_03_closing` | `lc11_03_closing` — closing |

Prompt each sample with the same neutral categories: `Opening the conversation`, `Continuing the conversation`, `Closing the conversation`. Do not highlight, preselect or otherwise reveal the key.

### Persistence and completion

Store per-sample answers under `challenges.lc11.answers` using the stable sample IDs. Keep challenge progress/completion, attempt count, first-attempt and support/replay metadata inside `challenges.lc11`, following the existing challenge-state pattern. A possible concrete shape is `{ answers: {}, completed: false, attempts: 0, firstAttempt: false, supportUsed: false, supportSamples: [], applicationChoice: null }`; do not create a new top-level field. Preserve attempts and answers through refresh. Correct samples stay correct; incorrect samples can be retried. Replay is allowed and never counts as another attempt or reward.

Do not reveal a sample's transcript before its own first attempt. After that attempt, expose explicit replay and transcript/support controls for that sample. A learner who cannot hear the sample may request support without being forced to guess; support incurs no penalty and does not change development signals. Record `ch04_lc11_complete` once, only when all three samples have the correct stable answer IDs. Refresh, replay, preview and rerender must not duplicate the event.

LC11 itself changes none of Pronunciation, Confidence, Independence or score. No mastery value is inferred from replay, attempt count or support use.

### Optional application reply

After LC11, show an optional, non-gated microchoice responding to the guest's question, “What sort of story would you choose for a reading?” Both choices are valid and converge:

| Stable local choice ID | Visible reply | Effect |
| --- | --- | --- |
| `s02_followup_curiosity` | I like a story with a surprise in it. What do you enjoy? | If selected, apply `Confidence +1` once. |
| `s02_share_interest` | Something with a lively character. I like hearing what other readers notice. | If selected, apply `Confidence +1` once. |

Store the choice in `challenges.lc11.applicationChoice` (or equivalent existing nested scene state), with an idempotent event `ch04_s02_confidence_increased` so replay and refresh cannot apply the signal twice. No other signal changes. The response must not be required for completion, must not create a major decision ID, and must not change later story branches. A player can explicitly Continue without choosing either reply.

### S02 completion and transition

Once LC11 is complete, unlock explicit Continue. The optional reply does not gate it. Selecting Continue records `ch04_s02_complete` once and navigates to `ch04_s03`. LC11 completion, selecting a reply, rendering, replay, refresh, audio completion and Teacher preview never navigate automatically. D08 is preserved but does not gate S02 or S03.

## S02 visual metadata

`visualStage = in_training`; voice-stage is **Emerging New Speech**. Keep the same Eliza identity, with more natural rhythm, greater confidence and less self-conscious articulation than Chapter III. Under mild pressure her Cockney features may return; this is not failure. Higgins is not a required S02 speaker. Pickering remains supportive and text-only. Teacher preview is read-only for answers, attempts, support, completion, application choice, signals and progression.
