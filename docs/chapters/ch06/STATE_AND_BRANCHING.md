# Chapter VI State and Branching

Status: human-reviewed state contract, locked for future S01 implementation. Reuse the existing shared save, stable decision/challenge records, and applied-event ledger. Do not add a parallel save schema, a signal score, or an aggregate final state.

## Shared invariants and entry

- Chapter VI begins only after the existing `ch05_s05_complete` boundary.
- Read-only history may include `origin_motivation`, `confirmed_motivation`, `motivation_shift`, `practice_preference`, `decisions.D08`, `decisions.D09`, `Pronunciation`, `Confidence`, `Independence`, `reception_register_plan`, `credit_response`, `future_question_style`, and `next_contact`.
- Missing historical values never block entry, remove an option or select a direction. History may affect a small amount of contextual wording and descriptive summary only.
- All three directions are always visible and equally legitimate. No signal, previous answer, accent, register, pronunciation performance, answer speed or retry count selects/ranks them.
- Player-facing prose is book-first and complete with sound off. Audio replay and Teacher Mode are read-only.
- Every state-changing event has a stable ID and is guarded by the existing applied-event ledger. Explicit Continue is the only scene transition action.

## Persistent Chapter VI choices

| Key | Allowed values | Written by | Rule |
|---|---|---|---|
| `chapter6_direction` | `social_success`, `independent_voice`, `integrated_identity` | D12 in `ch06_s03` | One committed value; revisits show it and do not silently overwrite it. |
| `final_statement_shape` | `declaration`, `reflection`, `commitment` | shape choice in `ch06_s04` | One committed value; it controls rhetoric only, never the direction. |
| `ch06_complete` | boolean, initially absent/false | Finish in `ch06_s05` | True only after explicit Finish. |

No `ending_score`, `best_ending`, `good_ending`, `bad_ending`, `companion_ending`, `ending_direction`, `final_state` aggregate, final numeric snapshot or persistent mirror is introduced. Existing shared `Pronunciation`, `Confidence`, `Independence`, decision history and challenge state remain their own authorities.

## Scene transitions and event contract

| Scene / action | Stable event or guard | State effect | Transition |
|---|---|---|---|
| Enter S01 after Chapter V | Existing `ch05_s05_complete` guard | Read optional history only | `ch06_s01` |
| S01 Continue | `ch06_s01_complete` once | No choice/signal mutation | `ch06_s02` |
| S02 Continue | `ch06_s02_complete` once | Replay is read-only | `ch06_s03` |
| Commit D12 | `ch06_d12_recorded` once | Store `chapter6_direction` using one stable option ID | Remain S03 |
| Complete LC15 | `ch06_lc15_completed` once | Mark `challenges.lc15.completed`; no signal change | Remain S03 |
| S03 Continue | `ch06_s03_complete` once | Requires saved D12 and completed LC15 | `ch06_s04` |
| Render composed statement | — | No state effect and no reward | Remain S04 |
| Explicitly confirm/deliver composed statement | `ch06_final_statement_delivered` in the existing applied-event ledger | After explicit delivery, add `Confidence +1` exactly once, unconditionally across all shapes; the event is the idempotent guard | Remain S04; then explicit Continue may proceed to S05 |
| S04 Continue | `ch06_s04_complete` once; requires `ch06_final_statement_delivered` | No further signal change | `ch06_s05` |
| Finish S05 | `ch06_complete` plus completion-recorded guard/event `ch06_completion_recorded` once | Set `ch06_complete = true`; no signal change | Final book-complete screen |

Completion-recorded event/guard is needed so that save restore, replay, reload, Back/Forward, duplicate input and Teacher Mode cannot repeat completion effects or routing. It uses the existing event ledger, consistently with Chapters IV/V; do not create a second completion framework.

S04 timing: render the composed statement without reward. Only the player's explicit confirm/deliver action records `ch06_final_statement_delivered` and awards `Confidence +1` once. Rendering, replay, reload, Teacher Mode, Back/Forward, duplicate delivery input and viewport changes do not award it. The event ledger is the stable idempotent guard. The reward is unconditional across declaration, reflection and commitment; shape remains rhetorical, not score-bearing.

## D12 — direction decision

Prompt and exact texts are canonical in `SCRIPT.md`. Stable option IDs and values:

| Option ID | Stored value | Meaning |
|---|---|---|
| `d12_social_success` | `social_success` | Learner-facing label: **PUBLIC PARTICIPATION**. Eliza actively participates in public, professional or community life using her linguistic repertoire on her own terms. It implies no higher status, “proper lady” identity, social superiority or best ending. |
| `d12_independent_voice` | `independent_voice` | Prioritise economic and personal independence: work, money, housing and decisions of her own. Equally legitimate and unranked. |
| `d12_integrated_identity` | `integrated_identity` | Keep and deliberately use more than one register and social identity. Not refusal of progress or “going back.” |

D12 has no answer key, reward, signal effect or “best” route. The first saved direction is immutable during ordinary navigation. A future intentional reset would need its own explicit contract; ordinary revisiting is not a reset.

## LC15 — objective contextual challenge

LC15 has exactly three samples and three stable answer options. Save answers under `challenges.lc15.answers` by item ID, not presentation order. Correct items persist. Each item can be retried without limit or penalty. Incorrect feedback points to contextual evidence; support, replay and text alternative are always penalty-free. Completion requires all three correct answers and adds no `Pronunciation` or other signal.

| Item ID | Intended context | Correct option ID |
|---|---|---|
| `lc15_sample_public` | Public meeting; Eliza addresses chair and requests time to present an idea to the group | `lc15_public_organiser` |
| `lc15_sample_colleague` | Familiar colleague; shared practical task and proposed time | `lc15_familiar_colleague` |
| `lc15_sample_private` | Trusted adviser; private advice about a first step | `lc15_private_adviser` |

Stable options for each item:

- `lc15_public_organiser`: “A meeting organiser; she wants permission to present a proposal to the group.”
- `lc15_familiar_colleague`: “A colleague she knows; she wants to arrange a shared practical task.”
- `lc15_private_adviser`: “A trusted adviser; she wants private advice on how to begin.”

Correctness comes from address, pronouns, purpose and situational details. Formality is not the key and no register is scored. The accessible no-audio panel preserves the same contextual evidence in paraphrase without showing a transcript that directly states the answer. It does not reveal the answer label; learners still infer the matching option. The exact three panels and script are in `SCRIPT.md`. Once the sample is solved, transcript can be revealed without exposing an active answer. No-audio completion is equivalent and penalty-free.

## Statement and closure

`final_statement_shape` controls only the on-screen rhetorical lead-in (`declaration`, `reflection`, `commitment`) and stays independent of `chapter6_direction`. The composed statement is displayed first; explicit delivery records `ch06_final_statement_delivered` and grants `Confidence +1` exactly once. S05 branch text then converges on the identical final Eliza line, “I have more ways to speak, and the choice is mine.” If voiced, this is one reusable recording across all directions. No 3×3 voice matrix.

S05 summary derives prose independently from history; no synthetic aggregate is persisted. Missing fields are omitted or described neutrally. Development signals may inform qualitative wording but never display as numeric quality scores.

Replay map is read-only: starting motivation, one learning/recovery moment, Chapter V reception/credit, and final statement when available. Replay does not rerun rewards, mutate choices, overwrite state, alter `ch06_complete`, or alter `ch06_final_statement_delivered`; it cannot mutate signals, challenge answers, completion or history.

## Later runtime implementation checklist

- [ ] entry guards
- [ ] save migration / missing historical values
- [ ] D12 persistence
- [ ] LC15 retry/support
- [ ] LC15 no-audio fallback
- [ ] `final_statement_shape` persistence
- [ ] S04 Confidence once-only
- [ ] `ch06_complete` once-only
- [ ] replay read-only
- [ ] Teacher Mode read-only
- [ ] restore/reload
- [ ] Back/Forward
- [ ] Sound Off/On
- [ ] branch audio isolation
- [ ] responsive 390/768/1440
- [ ] final summary
- [ ] accessibility
