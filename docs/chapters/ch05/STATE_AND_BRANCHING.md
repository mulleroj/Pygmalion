# Chapter V State and Branching

Status: content contract locked; documentation only. Reuse the shared save, decisions/challenges state and applied-event ledger. Do not create another save key, a parallel decision schema, or persistent mirrors of the choices below.

## Shared rules

- Store the four named Chapter V values in the existing shared save: reception_register_plan, credit_response, future_question_style and next_contact.
- Each saved choice has one stable value. Record its event once in applied_events. A later render, back/forward navigation, refresh, replay, Teacher preview or duplicate action must not rewrite the choice or repeat its effect.
- Challenge answers and progress live inside challenges.lc13 and challenges.lc14. Store answers by stable item ID, never by display order. Correct items persist; incorrect items can be retried.
- Teacher Mode is read-only. Its preview uses isolated/ephemeral choices, answer state and option order; it never writes student state, signals, events or progression.
- Completion events are the single authority for scene transitions. Only explicit student Continue advances a scene.
- Personal choice values do not change signals. LC13 and LC14 have no Confidence or Pronunciation reward: accessible support and correct answers must not become a proxy for the learner's worth. The only Chapter V signal change is the unconditional S05 Independence increment.

## Entry and Chapter IV boundary

Enter ch05_s01 only after the existing ch04_s05_complete event. Preserve all prior state, including origin_motivation, confirmed_motivation, D08, D09 and reflections.ch04_s04_focus. Chapter V does not rewrite any Chapter I–IV value. D08 and D09 remain read-only history; the S04 reflection remains local to Chapter IV.

## S01 — D10 Reception Register Plan

Stable decision ID: D10. Store the selected stable value only in reception_register_plan. Event: ch05_d10_recorded.

| Option ID / stored value | Player-facing text | Meaning |
| --- | --- | --- |
| d10_tailor_by_role | “I will use a more formal register with the organiser and patron, and speak more naturally with a fellow flower worker.” | Deliberate register differentiation. |
| d10_listen_then_adjust | “I will begin carefully and adjust after I hear how each person speaks to me.” | Responsive code-switching. |
| d10_keep_core_voice | “I will keep my core voice with everyone, changing only greetings, politeness and detail.” | Identity continuity with pragmatic adaptation. |

All options converge. No signal, reward, score, gate or character worth depends on the option. Explicit Continue after the first valid D10 selection appends ch05_s01_complete once and moves to ch05_s02.

## S02 — LC13 and the local response

The temporary first-responder choice is session/scene-local only. Do not persist it or add an event, development signal, reward, branch gate or hidden good/bad outcome. Its three response paths converge.

Stable challenge ID: LC13. State belongs in challenges.lc13. Three samples; each has a speaker/relationship, purpose and formality item. The visible choices in each dimension are the same three items listed here. Require all nine sample-dimension answers for completion.

### Samples and exact key

| Sample ID | Transcript | Relationship key | Purpose key | Formality key |
| --- | --- | --- | --- | --- |
| lc13_organiser | “Miss Doolittle, could you introduce the growers when the chairman arrives?” | lc13_professional_organiser_to_participant | lc13_coordination_request | lc13_polite_professional |
| lc13_patron | “A remarkable display. Which of these varieties are grown locally?” | lc13_distant_guest_to_eliza | lc13_compliment_and_information_request | lc13_polite_relatively_formal |
| lc13_colleague | “Eliza, have you seen the labels for our table?” | lc13_peer_colleague | lc13_practical_request | lc13_informal_familiar |

### Choice sets

- **Relationship:** professional organiser → participant; socially distant guest → Eliza; peer / fellow flower worker.
- **Purpose:** coordinate an introduction; compliment the display and ask for local information; practical request about table labels.
- **Formality:** polite professional; polite / relatively formal; informal / familiar.

These answer IDs map one-to-one to the key columns above. Samples may be presented in any order; item IDs, not positions, own the answer. Reveal each sample transcript/support only after that sample's first attempt or on an explicit accessible-support request. Support, replay and retries carry no penalty. On all-correct completion, set challenges.lc13.completed and append ch05_lc13_completed once. No development signal is awarded. Explicit Continue then appends ch05_s02_complete once and moves to ch05_s03.

Stable answer item IDs are:

- lc13_organiser_relationship, lc13_organiser_purpose, lc13_organiser_formality
- lc13_patron_relationship, lc13_patron_purpose, lc13_patron_formality
- lc13_colleague_relationship, lc13_colleague_purpose, lc13_colleague_formality

## S03 — D11 Credit Response

Stable decision ID: D11. Store the selected stable value only in credit_response. Event: ch05_d11_recorded.

| Option ID / stored value | Player-facing text | Meaning |
| --- | --- | --- |
| d11_accept_for_now | “Thank you. I would rather speak about the flowers tonight.” | Strategic postponement; not submission or failure. |
| d11_redirect_publicly | “I learned a great deal, but this evening belongs to the growers — and I made my own choices too.” | Publicly redirects credit; not the single best response. |
| d11_private_conversation | “Thank you. I would like to speak about that later, in private.” | Chooses privacy rather than public confrontation. |

All options are valid and give no reward or signal. Derive the S04 companion from credit_response; do not persist a second companion field:

| credit_response | S04 companion |
| --- | --- |
| d11_private_conversation | Pickering |
| d11_accept_for_now | Mrs Pearce |
| d11_redirect_publicly | Mrs Pearce |

Explicit Continue after D11 appends ch05_s03_complete once and moves to ch05_s04. Keep credit_response as read-only context for Chapter VI; do not reinterpret or overwrite it.

## S04 — Future Question Style and LC14

Use the one location locked for S04: quiet side room off the exhibition hall. The chosen companion is read from credit_response.

The expression selection is stored only as future_question_style. Stable values and exact lines:

| Value | Exact line |
| --- | --- |
| direct | “What happens to me when this is over?” |
| indirect | “Have you thought about what I might do when this is over?” |
| plan_focused | “If I want work of my own after this, what should I arrange first?” |

This choice is personal, not graded; no reward or signal. Event: ch05_future_question_style_recorded.

Stable challenge ID: LC14. State belongs in challenges.lc14. The learner hears the companion's context and chooses the question that matches the immediate information need. Every question is phrased as a reasonable request; distractors are off-purpose, not socially inferior.

### Pickering branch

Context transcript: “There are several possibilities. Some will depend on money and introductions.”

| Stable answer ID | Question | Key |
| --- | --- | --- |
| lc14_pickering_clarify_introductions | “Could you tell me which introductions would actually help?” | Correct contextual fit. |
| lc14_pickering_ask_programme | “Could you remind me what happened in the programme tonight?” | Does not ask for the practical information just mentioned. |
| lc14_pickering_ask_speech_opinion | “What did you think of the way I spoke this evening?” | Asks for an opinion, not clarification about possibilities. |

### Mrs Pearce branch

Context transcript: “Work is one matter. Where you'll live is another.”

| Stable answer ID | Question | Key |
| --- | --- | --- |
| lc14_pearce_prioritise | “Which should I sort out first, and what can I do myself?” | Correct contextual fit. |
| lc14_pearce_ask_flowers | “Which flowers did the guests like best?” | Does not help prioritise the two practical matters. |
| lc14_pearce_ask_general_expectation | “What do people usually expect someone like me to do?” | Broad social expectation, not a practical next step. |

Stable answer item IDs: lc14_pickering_question_fit and lc14_mrs_pearce_question_fit. Exactly one item is active, selected from credit_response; never create a second saved companion value.

Many real-world phrasings could work; the key describes fit to this stated context, not a universal hierarchy of speech. The direct/indirect/plan-focused choice is independent of LC14 correctness.

Reveal transcript/support after a first attempt or explicit support request; replay and retries have no penalty. On all-correct completion, set challenges.lc14.completed and append ch05_lc14_completed once. No Confidence or Pronunciation reward. With a future_question_style and completed LC14, explicit Continue appends ch05_s04_complete once and moves to ch05_s05.

## S05 — Next Contact and completion

Store the local Chapter V choice only in next_contact. Event: ch05_next_contact_recorded.

| Option ID / stored value | Player-facing text | Chapter VI context |
| --- | --- | --- |
| higgins_directly | “I want to speak with Higgins directly.” | Eliza intends to address the unresolved issue herself. |
| pickering_first | “I want to speak with Pickering first.” | Eliza chooses a conversation with Pickering before the next decision. |
| mrs_pearce_first | “I want to ask Mrs Pearce for practical support first.” | Eliza chooses practical support. |

No option is rewarded, removes a Chapter VI ending or changes the meaning of a prior choice. The value may shape Chapter VI entry/context only.

Only explicit student Continue after next_contact is saved appends ch05_s05_complete and moves to ch06_s01. That same idempotent completion event adds Independence +1 exactly once, unconditionally on all earlier choices. Do not add another reward event. Render, refresh, replay, Teacher preview and browser back/forward must not add a second increment or transition.

## State handoff to Chapter VI

Chapter VI may read these existing shared-save values as context: origin_motivation, reception_register_plan, credit_response, future_question_style and next_contact. D08 and D09 may remain available as read-only historical context under their existing contracts. Missing optional historical values do not block entry. No Chapter V choice makes any Chapter VI ending unavailable.
