# Chapter I State and Branching

Canonical state contract for implementation of the Chapter I vertical slice. This document does not implement an engine.

## State principles

- Canonical scene sequence: `ch01_s01 → ch01_s02 → ch01_s03 → ch01_s04 → ch01_s05 → ch02_s01`.
- All major choice IDs are stable: `D01`, `D02`, `D03`.
- A state-changing event is counted at most once. Replay, challenge retry, audio replay, and reloading a scene must not farm signals.
- `Pronunciation`, `Confidence`, and `Independence` are internal development signals. They are not grades, morality scores, or student-facing numeric statistics.
- A challenge error never reduces Eliza’s value or the player’s moral standing.
- No threshold, win score, or ending lock is introduced in Chapter I.

## Initial Chapter I state

The engine may initialise these fields when Chapter I starts:

```text
chapter = "ch01"
scene = "ch01_s01"
eliza_stage = "Flower Girl"
opening_tone = null
freddy_first_impression = null
higgins_first_impression = null
ear_test_intro_seen = false
origin_motivation = null
Pronunciation = internal development signal, initial value defined by engine
Confidence = internal development signal, initial value defined by engine
Independence = internal development signal, initial value defined by engine
applied_events = []
```

The initial numeric values are an engine concern and are not specified by this content pass. Chapter I only specifies the possible event deltas and idempotency rules below.

## D01 – The Fallen Flowers

### Options and saved local data

| Option ID | Player-facing option | Saved local data |
| --- | --- | --- |
| `d01_ask_help` | “Could you help me gather them, please? The clean ones go in the basket.” | `freddy_first_impression = "asks_for_repair"` |
| `d01_name_damage` | “You knocked them down. Look at the stems. I cannot sell them like this.” | `freddy_first_impression = "direct_boundary"` |
| `d01_accept_and_work` | “All right. You are sorry. I will pick them up and get back to work.” | `freddy_first_impression = "practical_recovery"` |

### Event and development signal

- Stable event ID: `ch01_d01_resolution`.
- `d01_ask_help`: `Confidence +1` once.
- `d01_name_damage`: `Independence +1` once.
- `d01_accept_and_work`: `Confidence +1` once.
- No option changes `Pronunciation`.
- No option is correct, best, or morally superior.

### Immediate consequence

- `d01_ask_help`: Freddy helps sort the flowers; the exchange stays focused on repair.
- `d01_name_damage`: Freddy sees the broken stems and offers payment; Eliza makes the cost visible.
- `d01_accept_and_work`: Freddy steps aside; Eliza restores the basket and protects the next sale.

### Does it return later?

The exact option does not return as a new decision in Chapter I. `freddy_first_impression` may be read by later chapters for a brief relationship nuance. The signal increment is applied once even if the player revisits the scene.

## D02 – The Notebook

### Options and saved local data

| Option ID | Player-facing option | Saved local data |
| --- | --- | --- |
| `d02_direct_question` | “Why are you writing down the way I speak?” | `higgins_first_impression = "challenged_directly"` |
| `d02_request_explanation` | “What are you trying to learn from me? Tell me plainly.” | `higgins_first_impression = "seeks_accountability"` |
| `d02_reject_and_return` | “Write what you like. I have flowers to sell, and I am going back to them.” | `higgins_first_impression = "refused_objectification"` |

### Event and development signal

- Stable event ID: `ch01_d02_response`.
- `d02_direct_question`: `Confidence +1` once.
- `d02_request_explanation`: no development-signal change.
- `d02_reject_and_return`: `Independence +1` once.
- No option changes `Pronunciation`.
- No option changes Eliza’s canonical stage; she remains `Flower Girl`.

### Immediate consequence

- Direct question makes Higgins answer for the act of writing; he admits that observation is not permission.
- Request for explanation makes Higgins describe his study while Pickering presses him to explain without objectifying Eliza.
- Rejection ends the observation for the moment; Eliza returns attention to her work.

### Does it return later?

The exact option does not return as a new decision in Chapter I. `higgins_first_impression` may affect later wording or relationship nuance. The middle option intentionally has no signal increment: development signals are not reward points, and `seeks_accountability` can carry a later narrative consequence. Any signal increment from the other two options is idempotent and cannot be farmed by replay.

## D03 – A Window of Possibility

### Options and saved local data

| Option ID | Player-facing option | Saved long-term data |
| --- | --- | --- |
| `opportunity` | “I want language that helps me reach better work and more chances.” | `origin_motivation = "opportunity"` |
| `respect` | “I want people to listen to me before they decide what I am.” | `origin_motivation = "respect"` |
| `learning` | “I want to learn how speech works and choose what I use.” | `origin_motivation = "learning"` |
| `independence` | “I want more ways to speak so no one else can choose my future for me.” | `origin_motivation = "independence"` |

### Event and development signal

- Stable event ID: `ch01_d03_origin_motivation`.
- Save exactly one `origin_motivation` value.
- No automatic `Pronunciation`, `Confidence`, or `Independence` increment.
- Do not rank the four motivations or infer a stronger/weaker identity from them.

### Immediate consequence

The chosen motivation changes the final reflection cue and becomes the starting point for Chapter II. The chapter-end hook remains the same: Eliza will seek lessons and negotiate what she will accept.

### Does it return later?

Yes. `origin_motivation` returns in Chapter VI as historical context. A later `confirmed_motivation` or `motivation_shift` is allowed and does not invalidate this original choice. D03 may be edited only through an explicit later story decision, not by replaying Chapter I.

## Challenge state

### LC01

- Stable challenge ID: `ch01_lc01`.
- Stores completion/attempt metadata only if the engine needs it; answer selection does not change a development signal.
- Correct categories: `apology`, `excuse`, `intention_to_repair`.
- Retry and replay are read-only with respect to `Pronunciation`, `Confidence`, and `Independence`.

### LC02

- Stable challenge ID: `ch01_lc02`.
- Stores `ear_test_intro_seen = true` when the challenge is first entered.
- Stores completion and attempt metadata only; LC02 does not change `Pronunciation`, `Confidence`, or `Independence`.
- Stable sample and option IDs are:

| Sample ID | Option IDs | Correct option |
| --- | --- | --- |
| `lc02_sample_01` | `lc02_s01_worker_request`, `lc02_s01_formal_question`, `lc02_s01_urgent_command` | `lc02_s01_worker_request` |
| `lc02_sample_02` | `lc02_s02_formal_information`, `lc02_s02_familiar_instruction`, `lc02_s02_apology_repair` | `lc02_s02_familiar_instruction` |
| `lc02_sample_03` | `lc02_s03_familiar_instruction`, `lc02_s03_worker_request`, `lc02_s03_formal_question` | `lc02_s03_formal_question` |

- Each sample has exactly one best answer and two contextual distractors.
- A retry after a wrong answer may complete the challenge, but repeated success, replay, or transcript opening changes no development signal.
- Incorrect answers create no morality penalty and no negative signal.

## Opening tone and non-state-changing traces

`opening_tone` may store `bright`, `practical`, or `defensive` for local scene flavour. It is not a major decision, does not alter development signals, and does not return as a scored value.

## Replay and idempotency contract

The implementation must guard every applied event by stable event ID:

```text
if event_id not in applied_events:
    apply the event delta and/or durable write
    add event_id to applied_events
else:
    do not apply it again
```

The guard applies to:

- D01, D02, D03;
- LC02 completion/attempt metadata only;
- audio replay;
- transcript opening;
- challenge retry;
- scene reload;
- Teacher Mode preview and replay.

Teacher Mode is read-only: it must not change student choices, event history, development signals, or `origin_motivation`.

## Branching summary

```text
ch01_s01
  → ch01_s02
      D01: d01_ask_help | d01_name_damage | d01_accept_and_work
  → ch01_s03
      D02: d02_direct_question | d02_request_explanation | d02_reject_and_return
  → ch01_s04
      LC02: three context/register samples; metadata only
  → ch01_s05
      D03: opportunity | respect | learning | independence
  → ch02_s01
```

All paths remain valid Chapter I paths. No branch is blocked by a low internal signal, and no student-facing UI should expose development values as numeric scores.
