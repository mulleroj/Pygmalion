# Chapter IV State and Branching

Status: `CH04 S01–S04 locked; S04 state and branching contract implemented in the Chapter IV vertical slice`.

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

**Accessibility correction:** A learner must never be forced to guess because audio is unavailable or inaccessible. For every LC11 sample, expose an explicit transcript-support control before its first answer attempt, with the canonical transcript hidden until the learner requests it. Support may be requested at any time, without an incorrect answer or playback attempt; it is available equally with Sound On and Sound Off. Opening support does not select an answer, increment attempts, complete an item or the challenge, advance the scene, trigger playback, or change Pronunciation, Confidence, Independence or score. Support incurs no penalty. Teacher Mode remains read-only and never writes support state. This intentionally supersedes the former rule delaying transcript disclosure until after an attempt; it does not change LC11's learning objectives. Record `ch04_lc11_complete` once, only when all three samples have the correct stable answer IDs. Refresh, replay, preview and rerender must not duplicate the event.

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

## S03 — The Wrong Answer

### Entry and invariants

S03 is entered from S02 only after explicit Continue records `ch04_s02_complete`. Neither `decisions.D08` nor the optional S02 `Confidence +1` gates or changes S03 content. Do not add a top-level Chapter IV state field.

### LC12 identity and items

Stable challenge ID: `LC12`; persist its state under `challenges.lc12`, using the existing nested challenge-state pattern. It has exactly two sequential interpretation items based on the AM37 exchange and AM38 context cue. LC12 tests comprehension only; it does not grade the D09 recovery preference.

| Item ID | Prompt | Option ID | Option text | Key |
| --- | --- | --- | --- | --- |
| `lc12_literal_meaning` | Taken literally, what does the Guest's sentence say? | `literal_city_decided` | London made a decision about the rain. | Correct |
|  |  | `literal_rainy_weather` | London has many rainy days. |  |
|  |  | `literal_leave_london` | The Guest wants to leave London. |  |
| `lc12_implied_meaning` | What does the Guest actually mean? | `implied_city_controls_weather` | The city controls the weather. |  |
|  |  | `implied_rain_joke` | It has been raining a lot, and the Guest is joking about it. | Correct |
|  |  | `implied_weather_question` | The Guest wants Eliza to explain the weather. |  |

Present the items sequentially. Store answers and per-item progress under `challenges.lc12` with the stable item and option IDs. The first attempt on each item has no support shown. After its first submitted attempt, expose the written AM37 transcript and written context describing the AM38 social reaction. AM37 and AM38 may be replayed; replay and support have no penalty. Incorrect answers can be retried, correct answers persist across refresh, and answer/event writes are idempotent. AM38 is contextual support and never the only source of information needed for a correct answer.

Once both items are correct, record `ch04_lc12_complete` exactly once. LC12 changes no Confidence, Independence, Pronunciation or score; it has no hidden reward. Completion does not navigate automatically.

### D09 — Recovery style

Show D09 only after LC12 completes. Persist exactly one selected stable value in the existing `decisions.D09` ledger entry and record `ch04_d09_recorded` once. No separate `recovery_style` field or duplicate semantic copy is created.

| Stable value | Learner-facing text | Meaning |
| --- | --- | --- |
| `rephrase` | Oh — I see. You meant that London has been very rainy. | Carefully reformulate the implied meaning. |
| `acknowledge_literal` | I took that rather literally, didn't I? | Lightly acknowledge the misunderstanding. |
| `wait_for_cue` | Perhaps I should listen before I answer. | Pause and wait for another social cue. |

All three options are legitimate, have no answer key, and converge. Do not label any option correct, best, weak or wrong. D09 awards Confidence +0, Independence +0 and Pronunciation +0; it changes no score and creates no hidden reward. Persist the selected choice across refresh. Rerender and revisit must not rewrite the choice or duplicate its event.

### S03 completion and transition

Unlock explicit Continue only when both `ch04_lc12_complete` and `ch04_d09_recorded` are present. Selecting Continue records `ch04_s03_complete` exactly once and transitions to `ch04_s04`. LC12 completion, D09 selection, rendering, replay, refresh, audio completion and Teacher preview never navigate automatically. Completion is idempotent.

## S04 — After the Laughter

### Entry and invariants

S04 requires `ch04_s03_complete`. The inherited `ch04_lc12_complete`, `decisions.D09` and `ch04_d09_recorded` remain available, but none branches or gates S04. `rephrase`, `acknowledge_literal` and `wait_for_cue` do not produce dialogue variants. Previous Confidence values do not gate or alter S04. Do not create a top-level Chapter IV field for this scene.

### Required reflection choice

S04 has no language challenge, answer key, correctness state, retry, score or challenge ID. Its required, non-graded reflection is stored only at `reflections.ch04_s04_focus` with one stable value:

| Stable value | Visible Eliza line | Meaning |
| --- | --- | --- |
| `language` | I need to listen for meaning, not only words. | Focus on interpreting meaning. |
| `audience` | I need to watch how people react before I answer. | Focus on audience cues. |
| `feeling` | I need to say when something makes me uncomfortable. | Focus on naming a feeling. |

All choices are legitimate and converge. None is correct, best, weak or wrong. On the first valid selection, write `reflections.ch04_s04_focus` and append `ch04_s04_reflection_recorded` once. Repeated selection, render, refresh or replay must not rewrite the selected preference or duplicate the event. Do not create `reflection_focus` or an equivalent duplicate field.

The reflection choice does not affect S05 branching, score, Pronunciation, Confidence or Independence. S04 changes no development signal: Confidence +0, Independence +0, Pronunciation +0. It has no hidden reward.

### Completion and transition

Unlock explicit Continue only after `ch04_s04_reflection_recorded`. Explicit Continue appends `ch04_s04_complete` exactly once and transitions to `ch04_s05`. Reflection selection, rendering, replay, refresh, audio completion and Teacher preview never complete or navigate the scene. Completion is idempotent; no additional reward is attached. S05 is outside this contract.

Teacher preview may show the story, reflection options and this contract, but remains read-only: no autoplay, state writes, reflection selection, rewards, completion or progression.

## S05 — The Walk Home

### Entry and invariants

S05 is the final Chapter IV scene, canonical ID `ch04_s05`, title **The Walk Home**. Entry requires `ch04_s04_complete` only. Eliza is alone; no other active character appears. Neither `decisions.D08` nor `reflections.ch04_s04_focus` changes dialogue, branches, gates, or rewards. D08 is used only by the display-only memory echo. Do not add state fields or persist card acknowledgement.

### D08 memory echo

Between Eliza's third and fourth lines, optionally display a compact read-only card labelled `Your first plan`. Map the existing `decisions.D08` value exactly:

| Existing value | Display text |
| --- | --- |
| `d08_practise_greeting` | Practise the greeting first. |
| `d08_plan_message` | Plan what you want to say. |
| `d08_listen_first` | Listen before answering. |

Below it show `That was one useful strategy. Tonight gave Eliza more information to work with.` This is neutral supporting text, not dialogue and has no audio. If D08 is unexpectedly missing, omit the card; never write fallback state. It is not a gate, branch, reward input or acknowledgement event.

### No challenge, decision or reflection write

S05 has no challenge: do not create LC13, quiz, answer key, retry state, score or correctness semantics. Create no `decisions.*`, `reflections.*` or choice event. The D08 recap only renders existing state. S04's `reflections.ch04_s04_focus` remains local to S04 and has no S05 effect.

### Development signals

S05 awards Confidence +0, Independence +0 and Pronunciation +0. No score, hidden reward or development increment is attached to the reflection. Chapter IV retains only the already locked optional S02 Confidence increment.

### Completion and transition

After the complete story sequence, show explicit **Continue**. Only that action appends `ch04_s05_complete` once and transitions to `ch05_s01`. There is no auto-transition or additional gate; D08 and its recap are not required. Completion is idempotent. S05 Teacher preview is read-only and does not play audio, start ambience, write state or advance progression.
