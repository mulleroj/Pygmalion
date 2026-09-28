# Chapter I Teacher Content – The Flower Girl

This file is teacher-only contextual support. It must not appear in normal student play mode. It follows the 12-part structure in `docs/TEACHER_MODE_SPEC.md`.

## 1. Chapter Overview

Eliza sells flowers in rainy Covent Garden and meets Freddy, Higgins, and Pickering. Higgins treats her speech as evidence about place and social experience; Eliza challenges the idea that a voice can be separated from its speaker. The first `Higgins' Ear` activity asks learners to identify register, relationship, context, and intention. The chapter ends when Eliza chooses an `origin_motivation` for seeking more ways to speak.

The chapter is about access and agency, not correction of a person. Eliza remains in the `Flower Girl` stage: young, lively, practical, proud, defensive when needed, and fully capable of making decisions.

## 2. Learning Goals

By the end of the chapter, learners should be able to:

- recognise apology, excuse, and intention to repair in short speech;
- make or understand a direct and a polite request;
- use context, relationship, and purpose to interpret a short utterance;
- notice that accent, dialect, and register are different concepts;
- explain that a register choice can affect access without changing human worth;
- name a personal motivation: `Opportunity`, `Respect`, `Learning`, or `Independence`.

## 3. Language Focus

- Vocabulary: `flower`, `basket`, `drop`, `stem`, `rain`, `market`, `apology`, `excuse`, `help`, `listen`, `opportunity`, `respect`.
- Functional language: `Could you help me…?`, `I cannot…`, `I am sorry…`, `I will…`, `Why are you…?`, `Tell me plainly.`
- Register: direct, polite, defensive, informal, and formal.
- Pragmatics: apology versus excuse; request versus instruction; intention versus explanation.
- Grammar and form: `Could you… please?`, `May I ask…?`, present explanation, and future intention with `will`.
- Pronunciation/listening: intonation and purpose in an apology or request; careful listening without ranking accents.

## 4. Listening Focus

Learners listen for:

1. whether a speaker accepts responsibility, gives an excuse, or promises repair (`LC01`);
2. who is speaking to whom, where they are, and what action the speaker wants (`LC02`);
3. how formality and familiarity are expressed without treating them as intelligence;
4. how transcript and context support listening when the accent is unfamiliar.

The key classroom message is: `Accent ≠ intelligence.` A speech pattern may give a clue about context, identity, or experience, but an inference can be incomplete or wrong.

## 5. Key Vocabulary

`flower`, `basket`, `drop`, `stem`, `rain`, `market`, `penny`, `apology`, `excuse`, `repair`, `help`, `listen`, `pattern`, `register`, `context`, `intention`, `opportunity`, `respect`, `learning`, `independence`.

Suggested support: show the words `responsibility`, `reason`, and `action` beside the three LC01 categories. Do not require learners to memorise the word `register` before they can understand the examples.

## 6. Cultural / Literary Context

The chapter is an original educational adaptation inspired primarily by George Bernard Shaw’s public-domain play *Pygmalion*. It is set in an imagined Edwardian London context, with Covent Garden as a busy market space where work, money, class, and public attention meet.

Teachers may briefly discuss:

- Covent Garden as a place of markets, movement, and public interaction;
- how social class can affect access to work and education;
- why people may judge a speaker from accent or register;
- the difference between describing a language feature and judging a person.

Do not use dialogue, songs, screenplay wording, film likenesses, costumes, or visual staging from *My Fair Lady*. The chapter’s scenes and dialogue are original.

## 7. Decisions – Teacher Notes

### D01 – The Fallen Flowers

Options:

- `d01_ask_help`: asks Freddy to help gather the flowers; local impression `asks_for_repair`; `Confidence +1` once.
- `d01_name_damage`: names the damage clearly; local impression `direct_boundary`; `Independence +1` once.
- `d01_accept_and_work`: accepts the apology and returns to selling; local impression `practical_recovery`; `Confidence +1` once.

All three are legitimate strategies. Do not frame directness as bad manners or acceptance as submission. The choice is local in Chapter I and does not become a moral label.

### D02 – The Notebook

Options:

- `d02_direct_question`: asks why Higgins is writing; `Confidence +1` once.
- `d02_request_explanation`: requests a plain explanation; no development-signal change.
- `d02_reject_and_return`: rejects the observation and returns to work; `Independence +1` once.

All three protect a different need: answer, accountability, or control of time. The local field `higgins_first_impression` records the narrative trace only. The middle option is intentionally not an omitted reward: development signals are not reward points, and `seeks_accountability` can create a later narrative consequence.

### D03 – Origin motivation

`origin_motivation` stores one of `opportunity`, `respect`, `learning`, or `independence`. This is an open motivation choice with no answer key and no ranking. It may be revisited in later chapters; a later change is not inconsistency or failure.

## 8. Challenge Key

### LC01 – Apology, excuse, intention

- Sample 1: `“I am sorry. I was not looking where I was going.”` → `apology`.
- Sample 2: `“It was the rain. Anyone could have slipped.”` → `excuse`.
- Sample 3: `“I will pick these up and pay for the damaged ones.”` → `intention to repair`.

The objective is to identify speech purpose in context. A common error is to treat the word `sorry` as a complete answer without considering responsibility or action. Replay and transcript are always available; replay does not reward or penalise.

### LC02 – Higgins' Ear

- `lc02_sample_01` transcript: `“Could you wait by the door, please? I need both hands.”`
  - `lc02_s01_worker_request` — A worker asks someone nearby to wait while she carries something. **Correct.**
  - `lc02_s01_formal_question` — A speaker asks a stranger whether a meeting has started.
  - `lc02_s01_urgent_command` — A market worker orders a stranger to move away.
  - Explanation: `Could you… please?` is a polite request, and the busy task explains why waiting is useful.
- `lc02_sample_02` transcript: `“Oi, Sam, hold the cart! I'm coming through.”`
  - `lc02_s02_formal_information` — A speaker politely asks a stranger about a meeting.
  - `lc02_s02_familiar_instruction` — A familiar co-worker gives a quick instruction in a busy market. **Correct.**
  - `lc02_s02_apology_repair` — A speaker apologises to a customer and offers to pay.
  - Explanation: the name, short command, and market setting point to a familiar working relationship and a practical need.
- `lc02_sample_03` transcript: `“Good evening. May I ask whether the meeting has started?”`
  - `lc02_s03_familiar_instruction` — A friend gives an urgent instruction beside a market cart.
  - `lc02_s03_worker_request` — A worker asks someone to wait while she carries something.
  - `lc02_s03_formal_question` — A speaker politely asks an unfamiliar person for information. **Correct.**
  - Explanation: the greeting and `May I ask…?` create a formal request for information.

Retry support should ask the learner to listen for action, relationship, setting, and purpose. LC02 stores completion/attempt metadata and `ear_test_intro_seen = true`; it never changes `Pronunciation`, `Confidence`, or `Independence`. A wrong answer has no morality penalty.

## 9. Discussion Questions

- Why do people make quick judgments from the way someone speaks?
- Can a direct request still be polite? Give an example from D01.
- How is hearing a dialect different from judging a person?
- What could `Opportunity`, `Respect`, `Learning`, or `Independence` mean for Eliza?

Optional extension: ask learners to rewrite one LC01 line with the same intention but a different register. The meaning should remain clear; no version is a “better person” version.

## 10. Sensitive Framing

Use this exact principle throughout the chapter:

> `Accent ≠ intelligence.`

Cockney is not presented as broken, comic, or unintelligent English. Standard pronunciation is not a measure of human value. Social prejudice belongs to the world and to the characters’ assumptions; it is not the game’s hidden rule for judging Eliza.

Avoid language such as `bad English → good English`, `poor girl → proper lady`, or `smart accent`. Prefer `different register`, `clear in this context`, `a useful clue`, and `another way to be heard`.

## 11. Suggested Classroom Use

Suggested sequence:

1. Play `ch01_s01` and ask learners to underline the purpose of Eliza’s sales pitch.
2. Use D01 as a short pair discussion: each learner defends a different legitimate response.
3. Replay one or all LC01 items with the transcript visible; ask what responsibility or action is present.
4. Use LC02 in groups of three: speaker, listener, and context observer.
5. End with D03 as a private or shared reflection. Learners may explain their motivation, but sharing is optional.

Approximate timing: `20–30 minutes gameplay + 10 minutes discussion`. Teacher preview and replay are read-only and must not change student progress, choices, or development signals.

## 12. Scene Navigation

| Scene ID | Scene title | Decisions | Challenges | Language focus | Audio moments |
| --- | --- | --- | --- | --- | --- |
| `ch01_s01` | Under the Portico | — | — | sales pitch, first impression | `AM01–AM02` |
| `ch01_s02` | The Fallen Flowers | `D01` | `LC01` | apology, excuse, direct/polite request | `AM03–AM04` |
| `ch01_s03` | The Notebook | `D02` | — | self-defence, observation versus judgment | `AM05–AM06` |
| `ch01_s04` | Higgins' Ear | — | `LC02` | register, relationship, context, intention | `AM07–AM08` |
| `ch01_s05` | A Window of Possibility | `D03` | — | motivation, access, agency | `AM09–AM10` |

### Teacher-only progress reminder

The end-of-chapter description may mention selected strategies, completed challenges, and `origin_motivation`. It must not display `Pronunciation`, `Confidence`, or `Independence` as a grade, percentage, ranking, or psychological profile. Students must not see this file or the challenge answer key in ordinary play mode.
