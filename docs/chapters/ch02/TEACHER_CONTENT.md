# Chapter II Teacher Content – The Bargain

Teacher-only contextual support for Chapter II. It must not appear in ordinary student play mode. It follows the 12-part structure in docs/TEACHER_MODE_SPEC.md.

## 1. Chapter Overview

Eliza arrives at Higgins's house by her own choice and asks to pay for lessons. She practises the difference between a clear request and a polite form, listens for offer, evaluation, and condition, and names the boundaries that make an agreement meaningful. The chapter ends with confirmed_motivation, which may confirm or change origin_motivation from Chapter I.

The chapter is about agency, communication strategy, money, and boundaries. It is not about replacing a supposedly inferior accent with a superior one.

## 2. Learning Goals

Learners should be able to:

- formulate a clear request;
- add a polite form without losing the purpose of a request;
- distinguish directness, politeness, and boundary-setting as different strategies;
- identify an offer, an evaluation, and a condition in context;
- ask for clarification about a practical agreement;
- explain why changing a learning motivation is not a failure;
- recognise that formal register is a situational tool, not a measure of intelligence.

## 3. Language Focus

- Vocabulary: lesson, price, pay, term, condition, explain, agree, boundary, purpose, practice.
- Functional language: I want…, Could you tell me…?, I would like…, I need to know…, Could you explain…?, If…, you must….
- Grammar: polite questions, modals, reasons, conditions, and future intention.
- Register: direct, polite, formal, and boundary-setting.
- Pragmatics: request, offer, evaluation, condition, clarification, and agreement.
- Framing: a register choice can affect access in a situation without changing a person's value.

## 4. Listening Focus

LC04 asks learners to identify the purpose of a sentence:

- an offer gives or promises something;
- an evaluation describes a quality or result;
- a condition states what must happen for an agreement to continue.

The answer key uses stable option IDs, never presentation position. Replay, retry, transcript opening, and refresh must preserve the persisted presentation order.

LC03 is a reading / language-noticing activity. It does not claim that polite English is better English. It asks whether the learner can preserve meaning while deliberately choosing another register.

## 5. Key Vocabulary

lesson, price, pay, term, condition, explain, agree, boundary, purpose, practice, clear, request, offer, evaluation.

Suggested support words:

- purpose = what a speaker wants to do;
- condition = what must happen;
- evaluation = what someone says about quality or result.

## 6. Cultural / Literary Context

Teacher Mode may discuss:

- access to paid education and employment in an imagined Edwardian London;
- how money can create both opportunity and power imbalance;
- why a learner should be able to ask about terms, time, and treatment;
- the difference between describing a language feature and judging a person;
- how social expectations can make one register more useful in one situation without making it more valuable in every situation.

This is an original educational adaptation. It must not borrow dialogue, song text, staging, costume design, or visual identity from My Fair Lady.

## 7. Decisions – Teacher Notes

### D04 – Request strategy

Stable options:

- d04_direct_request
- d04_polite_request
- d04_request_with_boundary

All three are legitimate. The choice stores only request_strategy. It does not add Confidence, Pronunciation, or Independence.

Teaching point: directness, politeness, and boundary-setting are different communication strategies, not levels in a hierarchy.

### D05 – Confirmed motivation

Stable options:

- d05_opportunity
- d05_respect
- d05_learning
- d05_independence

The choice stores confirmed_motivation. A difference from origin_motivation creates motivation_shift; it is not a consistency penalty.

Both D04 and D05 are open identity or strategy choices. They have no answer key.

## 8. Challenge Key

### LC03 – Clear request, polite form

Correct option: lc03_clear_polite_request.

The correct answer preserves the purpose of the request and adds a clear polite form. The distractors either make the request unclear or surrender the speaker's purpose. The explanation must not use “better English” language.

### LC04 – Offer, evaluation, or condition

| Sample ID | Correct answer ID | Speech act |
|---|---|---|
| lc04_sample_offer | lc04_offer | offer |
| lc04_sample_evaluation | lc04_evaluation | evaluation |
| lc04_sample_condition | lc04_condition | condition |

Completion stores only ch02_lc04_completed and attempt metadata. There is no Confidence reward for correctness.

Common errors:

- treating every authoritative sentence as a condition;
- confusing an evaluation with an offer because both mention a result;
- reading politeness as evidence of intelligence.

## 9. Discussion Questions

- Can a direct request still be respectful? Give an example.
- What is the difference between a polite form and a vague form?
- Why might someone state a boundary before agreeing to a lesson?
- Who has power when one person sets the terms of an agreement?
- Can a person change their reason for learning without failing?
- How is hearing a register different from judging a person?

## 10. Sensitive Framing

Use this principle throughout the chapter:

> Accent ≠ intelligence.

Do not describe Cockney as broken, comic, lazy, or unintelligent. Do not describe formal register as a higher human state. Do not frame Eliza's payment for lessons as a reward for accepting another person's definition of her.

Prefer:

- another register for this situation;
- clear in this context;
- a useful communication choice;
- a boundary;
- a different way to be heard.

## 11. Suggested Classroom Use

Suggested sequence:

1. Read ch02_s01 and compare the three D04 strategies without ranking them.
2. Complete LC03 and ask learners to identify what meaning stayed the same.
3. Use LC04 with transcript support and sort the three speech acts.
4. Role-play the terms conversation: learner, teacher, and observer.
5. Discuss whether a change in motivation is a contradiction or a clarification.

Approximate timing: 25 minutes gameplay + 10–15 minutes role-play or discussion.

Teacher preview and replay are read-only. They must not modify student choices, challenge state, or any development signal.

## 12. Scene Navigation

| Scene ID | Scene title | Decision | Challenge | Language focus | Audio |
|---|---|---|---|---|---|
| ch02_s01 | The Door She Chooses | D04 | LC03 | requests, polite forms, boundaries | AM11–AM13 |
| ch02_s02 | Terms on the Table | — | LC04 | offer, evaluation, condition | AM14A–AM14 |
| ch02_s03 | Mrs Pearce's Questions | — | — | clarification, boundaries | AM15–AM16 |
| ch02_s04 | The Price of a Lesson | — | — | money, agreement | AM17–AM18 |
| ch02_s05 | Why I Am Here | D05 | — | purpose, self-advocacy | AM19–AM20 |

### Teacher-only progress reminder

The end-of-chapter summary may mention request_strategy, completed challenges, origin_motivation, and confirmed_motivation. It must not show Pronunciation, Confidence, or Independence as a grade, percentage, ranking, or psychological profile.
