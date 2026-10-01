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

S02–S06 remain [scene-map](../../SCENE_MAP.md) placeholders: LC06 minimal pairs; LC07 word stress; D07/LC08 intonation; LC09 feedback; LC10 transfer. Their practice/state/event details are not locked here. practice_preference may support later narrative and Chapter VI synthesis; no new downstream branching is invented.
