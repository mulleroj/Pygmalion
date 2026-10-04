# Chapter IV State and Branching

Status: `CH04 S01 PRE-PRODUCTION CANON READY FOR HUMAN REVIEW` — specification only.

## S01 — The Invitation

Inherit the shared save, decision ledger, challenge state and event ledger. S01 has no language challenge and introduces no top-level flags. `visualStage` remains scene metadata, not persistent Eliza state.

### D08 contract

Stable decision ID: `D08`. Persist only the selected stable option ID in the existing `decisions.D08` ledger entry. Append `ch04_d08_recorded` exactly once. The existing persisted decision ledger restores the choice after refresh. Do not create a separate legacy strategy field or any other parallel/top-level D08 state. No signal change, challenge reward, score loss, ending gate, or hidden moral judgement is attached.

| Option ID | Stored value | Character meaning |
| --- | --- | --- |
| `d08_practise_greeting` | `d08_practise_greeting` | Practise a simple greeting. |
| `d08_plan_message` | `d08_plan_message` | Think about what she wants to say. |
| `d08_listen_first` | `d08_listen_first` | Listen first and observe. |

All options are valid and converge to S02. A prior D08 record is read-only; replay, render, refresh and Teacher preview do not append another event or mutate the choice. There is no LC11 in S01; LC11 remains in S02.

### Completion and transition

Only after D08 is recorded and the learner explicitly selects Continue, append `ch04_s01_complete` once and navigate to `ch04_s02`. Continue adds no development signal. Rendering, replay, audio completion, refresh, answer entry (none in S01), or Teacher preview cannot complete or navigate the scene. Do not create `invitation_seen`, `eliza_ready`, `socially_ready`, `speech_transformed`, `class_passed`, `chapter4_started`, a mastery snapshot, or any other new top-level flag.
