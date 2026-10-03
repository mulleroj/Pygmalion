# Chapter III State and Branching

Status: S01 PRE-PRODUCTION CONTENT LOCK FOR HUMAN REVIEW; specification only. [SCRIPT.md](SCRIPT.md) owns visible story; this document owns S01 IDs, effects and persistence. The user's S01 brief refines the broad scene map; no existing files or runtime are changed.

## Inheritance and visual stage

Preserve the entire Chapter I–II save: origin_motivation, confirmed_motivation, request_strategy, lesson_terms_understood, motivation_shift, motivation_nuance, ch02_complete, signals, decisions, challenges and applied_events. Chapter II S05 currently leaves motivation_shift unchanged: do not derive a new mutation from differing motivations. The callback reads request_strategy (direct/polite/boundary; neutral fallback for any other value), changes only narration and never gates entry.

For every ch03_* scene, scene metadata specifies visualStage = "in_training". Do not add persistent eliza_stage or a visual-stage migration. This explicitly refines the older Chapter II wording about keeping eliza_stage Flower Girl: it is a presentation phase, not a new save field.

Future shared-save defaults: practice_preference = null; ch03_lc05_attempts = 0; ch03_lc05_completed = false; ch03_s01_complete = false; challenges.lc05 = { answers: {}, completed: false, optionOrders: {} }. Reuse the existing storage key and merge/default strategy; do not rename or split the save. Answers are keyed by stable item IDs, never display positions. These are proposed future fields, not implemented fields.

## D06 contract

Decision ID D06; event ch03_d06_practice_preference. Accept only an explicit student choice in ch03_s01, outside Teacher/preview, before D06 has been recorded. Apply decision, field, event and one signal atomically; if decision or event already exists, no replay mutation.

| Option ID | practice_preference | Development signal |
|---|---|---|
| d06_slow_repeat | slow_repeat | pronunciation +1 |
| d06_visual_model | visual_model | confidence +1 |
| d06_own_words | own_words | independence +1 |

Signals use the existing lowercase runtime fields. All choices are legitimate. Asking for a visible model represents learner agency, not weakness. No answer key, penalty, ending gate or separate route. Exact choice/consequence copy is in SCRIPT.md.

## LC05 contract

Challenge ID LC05; challenge record challenges.lc05. D06 precedes student challenge submission. Each explicit valid student submission increments ch03_lc05_attempts; replay, transcript opening, render, refresh and Teacher preview never do. Correct answers remain accepted while unresolved items can be retried. Wrong answers change only attempt/answer metadata and feedback; no negative signal. After completion all submissions are read-only. Invalid item/answer IDs and out-of-scene submissions have no effect.

| Stable item/sample ID | Content | Allowed answer IDs | Canonical correct answer |
|---|---|---|---|
| lc05_sample_theta | /θ/, then “thin” /θɪn/ | lc05_tongue_teeth, lc05_lip_teeth | lc05_tongue_teeth |
| lc05_sample_f | /f/, then “fin” /fɪn/ | lc05_tongue_teeth, lc05_lip_teeth | lc05_lip_teeth |
| lc05_step_theta | Text: “Your upper teeth are touching your lower lip. You want to try /θ/ in ‘thin’. What is your next step?” No extra audio file. | lc05_step_tongue_air, lc05_step_keep_lip, lc05_step_stop_air | lc05_step_tongue_air |

Visible labels: lc05_tongue_teeth = “Tongue tip and front teeth”; lc05_lip_teeth = “Lower lip and upper teeth”; lc05_step_tongue_air = “Move the tongue tip lightly to the front teeth and let air flow”; lc05_step_keep_lip = “Keep the lower lip against the upper teeth”; lc05_step_stop_air = “Close the mouth and stop the air”.

Feedback after submission:

- theta correct: “Yes. /θ/ uses the tongue tip and front teeth. The air keeps flowing.” Incorrect: “Try again. Listen or open the transcript, and notice what touches the teeth.”
- f correct: “Yes. /f/ uses the lower lip and upper teeth. This is a different movement.” Incorrect: “Try again. Compare the lower lip with the tongue tip. Replay or use the transcript.”
- step correct: “Yes. Release the lower lip, bring the tongue tip lightly to the front teeth, and let air flow.” Incorrect: “That keeps /f/ or stops the air. For this /θ/ practice, try a light tongue-to-teeth contact with flowing air.”

Completion requires all three canonical answers, independent of item/option display order. Save ch03_lc05_completed = true and challenges.lc05.completed = true with event ch03_lc05_completed once. That same stable event owns the sole LC05 pronunciation +1; there is no separate unguarded reward event. Atomically guard with applied_events and completion metadata. Retry cannot farm increments.

slow_repeat can produce pronunciation +2 over the scene: +1 for D06 strategy, +1 for LC05 demonstrated awareness. These are two distinct events, not a duplicate increment. Other D06 choices give their own signal plus the single LC05 pronunciation +1. Confidence and Independence cannot be earned by submitting LC05.

## Scene completion

Event ch03_s01_complete records ch03_s01_complete = true once, without a signal increment, only on explicit student Continue in S01 after D06 and LC05 are complete. Render, entry, audio ending, Teacher opening, preview, replay and refresh cannot complete it. Canonical next scene ch03_s02; an S01-only checkpoint stays on completed S01 with review if S02 is absent. Do not mark Chapter III complete or invent a Chapter III completion event.

## Replay / preview / shared architecture

Teacher preview uses an isolated context and MUST NOT save decisions, attempts, answers, option orders, signals or events into student progress. Closing restores student scene/context. Reuse existing story renderer, renderDecision, state/event store, AudioManager, challenge infrastructure, Teacher dialog, replay/preview safety and responsive image layers. Existing scene-specific preview flags and LC sample-count assumptions must be extended through shared contracts, not copied into a parallel engine. No Chapter III AudioManager/state store/Teacher Mode/decision system/save key.

## Later Chapter III – NOT YET LOCKED

S03 / LC07 and S04 / D07 / LC08 are specified below. S05–S06 remain [scene-map](../../SCENE_MAP.md) intent only: LC09 feedback; LC10 transfer. practice_preference may support later narrative and Chapter VI synthesis; no new downstream branching is invented.



## ch03_s02 / LC06 — PRE-PRODUCTION CANON LOCKED

Documentation only; NOT IMPLEMENTED. Human decisions refine the broad scene map for S02. Inherit shared save and all prior signals/decisions; visualStage = in_training is scene metadata. No Dxx decision, new motivation or confidence/independence increment.

### Stable IDs, exact labels and key

Challenge LC06; items lc06_sample_01 / lc06_sample_02. Each explicit item submission contains a word answer and meaning answer. No automatic selection or answer-by-position.

| Answer ID | Exact visible label |
|---|---|
| lc06_word_three | three |
| lc06_word_free | free |
| lc06_meaning_three_flowers | The customer wants three flowers. |
| lc06_meaning_no_payment | The customer wants flowers without paying. |

| Sample ID | Exact script | Word key | Meaning key |
|---|---|---|---|
| lc06_sample_01 | I'd like three flowers. | lc06_word_three | lc06_meaning_three_flowers |
| lc06_sample_02 | I'd like free flowers. | lc06_word_free | lc06_meaning_no_payment |

All four checks are required for completion. Correct subanswers stay accepted during retry; only wrong/unresolved subanswers may change. Feedback after submission: word correct “Yes. That is the word in the recording.”; retry “Listen again. Compare the sound at the beginning of the word.” Meaning correct “Yes. That meaning matches the word you heard.”; retry “Think about the number of flowers and whether the customer wants to pay.” After an item's submission its explanation may disclose: sample_01 “Three tells us the number of flowers. It begins with /θ/.”; sample_02 “Free means without payment. It begins with /f/.” Such target-revealing feedback/transcript counts as support if used before overall completion; reward eligibility must not survive answer revelation.

### Unaided / supported contract and minimum shared metadata

First valid student attempt must be UNAIDED LISTENING: no transcript or target-specific explanation before it. An attempt is an explicit submitted response, not playback/render/refresh. After first attempt offer Supported practice; do not automatically open its transcript. Unlimited normal-speed replay remains unaided. Switching to support is explicit and irreversible for this challenge attempt history, including after refresh. Merely making support available does not disqualify a learner who has not opened it. Generic feedback does not reveal the answer; target-specific explanation is opt-in support until completion.

For a student unable to hear (including Sound Off or unavailable media), an explicit “I cannot hear this recording” response may record the initial unresolved attempt without forced guessing or fake correctness, then expose supported practice. It never rewards or completes by itself. This is the accessible application of the locked first-attempt gate, not an assessment of hearing ability.

Keep metadata inside shared challenges.lc06, not new top-level fields: answers, completed, optionOrders, attempt count/first-attempt marker and monotonic supportUsed (default false). The support marker is necessary to preserve unaided reward eligibility across refresh; it is not a new identity/long-term narrative field. The exact shared record encoding may reuse existing answer/attempt metadata, but its semantics are locked. No persistent minimal_pair_seen; derive any local session presentation need from challenge runtime state.

First all-correct completion atomically sets challenges.lc06.completed and appends ch03_lc06_completed once. If supportUsed=false, apply pronunciation +1 in that SAME event; if true, complete with no increment. No separate unguarded reward, no negative penalty, no later supported-to-unaided reward upgrade or farmable replay. An unaided learner may retry with generic feedback without opening support and still earn the single reward. Completion becomes read-only; post-completion transcript cannot remove an already earned reward.

## ch03_s03 / LC07 — PRE-PRODUCTION CANON LOCKED

Documentation only; NOT IMPLEMENTED. No D-numbered decision and no persistent `word_stress_seen` or equivalent. `visualStage = in_training` remains scene metadata. Reuse shared challenge state, event ledger, replay, preview and rendering architecture.

Challenge key `challenges.lc07`; exactly three samples and one syllable answer per sample:

| Sample ID | Word | Neutral syllable divisions | Answer ID | Correct syllable |
|---|---|---|---|---:|
| lc07_sample_01 | customer | cus / to / mer | lc07_stress_customer_1 | 1 |
| lc07_sample_02 | expensive | ex / pen / sive | lc07_stress_expensive_2 | 2 |
| lc07_sample_03 | delivery | de / liv / er / y | lc07_stress_delivery_2 | 2 |

Canonical stress is **CUS-to-mer**, **ex-PEN-sive**, **de-LIV-er-y**. Capitalization is instructional answer-key notation only and must not appear as an initial student cue. Syllables are initially visually identical; no answer-revealing typography or labels.

First explicit submission is UNAIDED LISTENING. Replay at normal speed is unrestricted and read-only. After an incorrect attempt, offer optional Supported Practice; opening target-revealing support irreversibly marks `supportUsed` in shared `challenges.lc07` (default false) and cancels reward eligibility, including after reload. Mere availability and replay do not cancel eligibility. Support can show divisions and replay with “Listen for the syllable that sounds strongest.” Once opened, it may mark/explain stress. Support never penalizes or blocks completion. Preserve correct responses during retry where compatible with shared challenge handling; unresolved answers can be retried.

On completion, set `challenges.lc07.completed` and append `ch03_lc07_completed` once. Only completion with `supportUsed = false` applies `Pronunciation +1`, exactly once, in that same idempotent event. Supported completion has no increment and no penalty; there is no later reward upgrade. No other signal changes. Replay never mutates answers, eligibility, progress or completion. Teacher preview is read-only and uses isolated/ephemeral challenge state.

`ch03_s03_complete` is appended only after LC07 completion and explicit student Continue. It is idempotent, adds no signal and is the sole scene transition event. No duplicate top-level completion field is introduced; common challenge state and event ledger remain authoritative. Destination is `ch03_s04`; no S04 decision or state is changed here.

ch03_s02_complete records explicit student Continue only after either completion route; no signal increment, idempotent, destination ch03_s03. Event presence is scene-completion authority; no duplicate top-level completion field required. If S03 runtime is unavailable, stay on completed S02 with review. No Chapter III completion event.

Validate scene/student context/item/allowed IDs; invalid or stale/out-of-scene input does nothing. Replay, Sound toggle, audio ending, render, refresh and Teacher preview cannot submit answers, increment attempts, save support eligibility, reward or complete. Persist stable option orders through retry/refresh. Teacher preview uses ephemeral orders/answers/support and never writes student state/events/signals. Reuse shared save/default merge, state/event helpers, LC rendering and AudioManager; extend shared guards rather than clone engines.

## ch03_s04 / D07 / LC08 — S04 PRE-PRODUCTION CANON LOCKED; RUNTIME INTEGRATED

S04 runtime and its approved audio assets are integrated; individual Human Audio QA = PASS and full S04 Human Audio Mix QA = PASS (asset/audio details in AUDIO_PLAN.md). `visualStage = in_training` is scene metadata. S04 teaches sentence stress / intonation, following S03 word stress. No persistent `sentence_stress_seen` or equivalent field, no new top-level save field, no signal change from D07, and no D07 change to LC08 keys or reward eligibility.

### D07 — low-risk learning-strategy choice

Accept one explicit student selection in S04 and record it once in the shared `decisions.D07` ledger with the selected stable option ID. No development signal, skill reward, penalty, completion gate, alternate route, persistent learning flag or modification of pronunciation/answer keys. Replay, render, refresh and Teacher preview are read-only. The optional brief follow-up is story flavor/support only.

| Stable option ID | Strategy |
|---|---|
| d07_repeat_slowly | Ask Higgins to repeat it slowly |
| d07_hear_naturally | Hear it naturally again |
| d07_try_first | Try it herself first |

Place D07 after the Higgins demonstration and before LC08. The demonstration introduces the principle before Eliza chooses how to approach practice; each choice then rejoins the same challenge and canon.

### LC08 — sentence-stress listening challenge

Challenge ID `LC08`; challenge record `challenges.lc08`. Three natural sentence recordings, each with one focus-word selection. Samples are played in normal speed and may be replayed without limit. Replay, Sound Off, audio failure, rendering and preview do not mutate state.

| Sample ID | Exact spoken sentence | Answer ID | Correct focus word |
|---|---|---|---|
| lc08_sample_01 | I wanted the red flowers. | lc08_focus_red | red |
| lc08_sample_02 | She bought three tickets. | lc08_focus_three | three |
| lc08_sample_03 | We meet on Monday. | lc08_focus_monday | Monday |

The recording gives the focus word natural sentence prominence without exaggerated stress, extra coaching or added words. Neutral visible sentences and controls are identical in style before the first response; do not capitalize, bold, colour, underline, badge, preselect or otherwise visually disclose the focus word. Higgins's story demonstration uses a different sentence and cannot disclose any LC08 key. Canonical correct answers are `lc08_sample_01` → `lc08_focus_red`, `lc08_sample_02` → `lc08_focus_three`, and `lc08_sample_03` → `lc08_focus_monday`.

Before first response, provide no target-revealing support. After an incorrect attempt, offer optional Supported Practice with the neutral cue: “Listen for the word that carries the strongest part of the message.” If opened, support may replay the sample and then reveal its focus word. Support use is monotonic and permanently cancels unaided reward eligibility for LC08; mere availability and normal replay do not. Correct sample answers remain accepted during retry; retry only unresolved/wrong items. Support has no penalty and does not block completion.

First all-correct completion sets `challenges.lc08.completed` and appends `ch03_lc08_completed` once. If target-revealing support has not been opened, that same idempotent event applies `Pronunciation +1` exactly once. Supported completion applies no reward and no penalty; no later reward upgrade. No other signals change. Completion becomes read-only. Keep answer, attempts, order and monotonic support metadata inside shared `challenges.lc08`; no parallel state system or persistent narrative flag.

`ch03_s04_complete` is recorded exactly once only after D07 is resolved, LC08 is complete and the student explicitly activates **Continue**. It gives no skill increment. The only destination is `ch03_s05`. Render, replay, audio completion, refresh and Teacher preview cannot complete or navigate the scene. Teacher preview uses isolated/ephemeral state and cannot mutate the learner's decisions, attempts, answers, support, reward, progress, signals or events.

## ch03_s05 / LC09 — S05 PRE-PRODUCTION CANON LOCKED

S05 adds no phonology system. Its focus is managing variable performance under fatigue: regulate pace, use meaningful chunks, rebuild a sentence and repair an attempt. `visualStage = in_training` remains scene metadata. No D-numbered decision exists in canonical `SCENE_MAP.md`; no decision or persistent learning field is added. The authored pause/reset beat is narrative copy only. No Confidence or other increment attaches to asking for a pause.

### LC09 — pace, chunking and repair

Use the existing objective challenge pattern with `challenges.lc09`. Exactly three short, visible B1 sentences, all presented without pause punctuation. For each item, the learner chooses one internal boundary between words; items are answered separately and a correct split is preserved. One unique boundary is keyed for each item:

| Sample ID | Exact sentence shown | Answer ID | Correct boundary |
|---|---|---|---|
| lc09_sample_01 | When the lesson ends I will rest. | lc09_pause_01 | after “ends” |
| lc09_sample_02 | If I slow my pace I can hear each word. | lc09_pause_02 | after “pace” |
| lc09_sample_03 | I know the words but I need a moment. | lc09_pause_03 | after “words” |

The intended chunks respectively mark a dependent clause before its main clause, a conditional clause before its result, and a contrast before its second clause. Do not add comma, ellipsis, line break, extra spacing, capitalization or typography that reveals the answer. Before response, every possible internal boundary/control is equally neutral, including focus and hover; no preselection, colour, bolding or icons. The screen-reader instruction names only the task, not the key. The same sentence is heard/read as a whole before the boundary choice. After a correct split, preserve it and let the learner hear/read the full sentence again divided at their chosen boundary; an optional second repair choice may use the same neutral-to-revealed rule, but is not required by this canon.

Exact learner-facing copy:

- Challenge instruction: “Choose the best place to pause so the sentence is easier to say.”
- Incorrect feedback: “Not quite. Try again, or use Supported Practice.”
- Supported Practice prompt: “Listen for the place where the sentence can breathe.”
- Target-revealing support text, only after explicit opening: “Pause here. Say the first part, then continue with the second.”

Only after the learner explicitly opens target-revealing Supported Practice, show the target divider and sentence below. The divider is absent from every unaided state:

- `lc09_sample_01`: `When the lesson ends | I will rest.`
- `lc09_sample_02`: `If I slow my pace | I can hear each word.`
- `lc09_sample_03`: `I know the words | but I need a moment.`

First explicit submission is unaided. Replay is normal-speed and read-only. After an incorrect attempt, offer optional Supported Practice with the neutral cue: “Listen for the place where the sentence can breathe.” If opened, support may divide the target sentence, explain the clause boundary in simple language and allow retry. Opening target-revealing support before successful unaided completion permanently sets monotonic support usage and removes reward eligibility. Mere availability, neutral cue and replay do not. Correct items remain fixed on retry. Support never penalizes or blocks completion.

On all-correct completion, set `challenges.lc09.completed` and append `ch03_lc09_completed` exactly once. If target-revealing support has not been opened, that same idempotent event applies `Pronunciation +1` once. Supported completion gives no increment and no penalty; no later reward upgrade. Keep answers, attempts and support metadata in shared challenge state; reuse the event ledger. Replay, refresh, render and Teacher preview never mutate answers, eligibility, support, reward, completion or narrative decisions. Teacher preview is read-only and isolated.

`ch03_s05_complete` is recorded once only after LC09 completion and explicit student **Continue**; it gives no increment and advances only to `ch03_s06`. No D-numbered decision gate. No duplicate top-level completion field or new persistent fatigue/pace/repair flags.
