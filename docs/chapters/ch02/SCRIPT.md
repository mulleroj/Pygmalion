# Chapter II – The Bargain

Content-locked player-facing script for the Chapter II vertical slice.

- Level: A2+/B1
- Canonical stage: Flower Girl, with a gradual transition toward In Training
- Scenes: exactly five (ch02_s01–ch02_s05)
- Major decisions: D04, D05
- Language challenges: LC03, LC04
- Canonical story loop: Read / Story → Decision or Challenge → Consequence → Transition
- All dialogue below is newly written for this adaptation.
- Story narration and dialogue remain readable and sufficient with sound disabled.
- Every OPTIONAL STORY VOICE line must be reproduced exactly in AUDIO_PLAN.md.
- LC04 samples are challenge content and are listed separately from ordinary story voice.

## Chapter II arc

Eliza arrives at Higgins's house by her own choice. She asks for lessons, learns to distinguish a request from a condition or an evaluation, and names the boundaries that make the agreement meaningful. She ends the chapter by stating her purpose in her own words.

The chapter does not rank directness, politeness, boundary-setting, or motivation. A register is a tool for a situation, not proof of intelligence or human value.

## ch02_s01 – The Door She Chooses

### Stage direction and narration

By morning, Eliza has made up her mind. Higgins's house is quieter than the market, but the question feels louder: what will she ask for, and what will she refuse?

Eliza stands at the entrance with her flower basket. She has come without an invitation.

**ELIZA:** Good morning. I've come to see Mr Higgins. I want lessons.

**MRS PEARCE:** Do you have an appointment?

**ELIZA:** No, ma'am. I have money for the first lesson, and I know what I want.

Higgins appears at the end of the hall.

**HIGGINS:** You have crossed the city for a change of speech?

**ELIZA:** For more than that. I want people to hear what I mean.

### D04 – Request strategy

PROMPT: Higgins is waiting for a clear request. Choose how Eliza asks.

1. d04_direct_request — Direct request: “I want lessons. How much do you charge?”
2. d04_polite_request — Polite request: “Could you tell me what a lesson costs, please?”
3. d04_request_with_boundary — Request with a boundary: “I would like lessons, but I need to know the price and what you expect from me.”

No option is correct, best, or more intelligent. Each is a legitimate communication strategy.

### Immediate consequence

- d04_direct_request: Higgins answers immediately; Eliza keeps control of the purpose of the visit.
- d04_polite_request: Mrs Pearce acknowledges the clear request; Eliza has deliberately chosen a more formal register.
- d04_request_with_boundary: Mrs Pearce invites Eliza inside; the terms are named before the lesson is discussed.

The selected stable option ID is saved as request_strategy. Chapter II adds no development-signal increment for D04.

### LC03 – Clear request, polite form

LEARNING MODE: reading / language noticing. Audio is optional and is not required to complete the challenge.

PROMPT: Eliza wants to keep the same meaning: “I want lessons. Tell me the price.” Which sentence adds a polite form without losing the clear request?

1. lc03_clear_polite_request — “Could you tell me the price of the lessons, please? I would like to begin.”
2. lc03_unclear_request — “Perhaps lessons could happen, if it is not too much trouble.”
3. lc03_submissive_request — “I do not mind what you decide. Anything will do.”

ANSWER KEY: lc03_clear_polite_request

The target is conscious register choice, not “better English”. The successful answer keeps the purpose and adds a clear polite form. Retry and replay do not change state or option order.

### Transition

Mrs Pearce opens the inner door. Eliza steps over the threshold without waiting to be invited twice.

ch02_s01 → ch02_s02

## ch02_s02 – Terms on the Table

### Stage direction and narration

Higgins places papers on the table as if the lesson has already begun. Pickering watches Eliza, not only the notes. Mrs Pearce watches the room.

**HIGGINS:** I can measure the work, compare the results, and plan the exercises.

**ELIZA:** You can measure a sentence. You cannot measure what I want it for.

**PICKERING:** A lesson should help her choose, not simply measure her.

**MRS PEARCE:** And it should describe a household, not only a laboratory.

### LC04 – Offer, evaluation, or condition

STORY CONTEXT: The people around the table use different kinds of statements. Listen for what each speaker is doing in the conversation.

PROMPT: Listen to each sample. Choose whether the speaker is making an offer, giving an evaluation, or stating a condition.

Presentation order is shuffled once and persisted by stable sample and option IDs.

#### Sample lc04_sample_offer

“I can give you three lessons each week, and I can show you how to practise.”

Correct option: lc04_offer

#### Sample lc04_sample_evaluation

“You listen carefully. That is a useful beginning, but your question needs a clearer ending.”

Correct option: lc04_evaluation

#### Sample lc04_sample_condition

“If you stay for lessons, you must keep the agreed hours.”

Correct option: lc04_condition

FEEDBACK – success: An offer gives or promises something. An evaluation describes a quality or result. A condition says what must happen for an agreement to continue.

FEEDBACK – retry: Listen for the purpose of the sentence. Is the speaker offering something, judging a result, or setting a requirement?

The transcript is available with replay. Retry and replay never alter the order, and completion adds no development signal.

### Immediate consequence

experiment_framing_heard = true records that Eliza has heard the different perspectives around the table. ch02_lc04_completed is written once when the challenge is completed.

### Transition

Mrs Pearce gestures toward the kitchen. “There are practical questions before there is an agreement.”

ch02_s02 → ch02_s03

## ch02_s03 – Mrs Pearce's Questions

### Stage direction and narration

Away from Higgins's notes, the questions become ordinary and serious: time, money, clothes, rest, and what happens when a lesson becomes too much.

**MRS PEARCE:** Before we begin, we must know the hours, the cost, and what you need.

**ELIZA:** Mornings are possible. Late evenings are not.

**MRS PEARCE:** And if you do not understand an instruction?

**ELIZA:** I will ask. I will not pretend.

**HIGGINS:** You make a long list.

**ELIZA:** It is shorter than being misunderstood.

**MRS PEARCE:** Good. A boundary is easier to keep when it is spoken.

**ELIZA:** I'm paying for lessons. I'm not giving up my say in them.

### Optional clarification response

This is a small scene response, not a new major decision.

- s03_ask_for_clarification — “Could you explain what happens if I miss a lesson?”
- s03_confirm_understanding — “I understand the question. We can discuss the details at the table.”

Only s03_ask_for_clarification sets boundary_questioned = true through the stable event ch02_s03_boundary_questioned. Neither option changes a development signal or morality state.

### Immediate consequence

If Eliza asks for clarification, Mrs Pearce explains the practical consequence without embarrassment. If Eliza confirms understanding, Mrs Pearce continues to the terms. Both paths reach the same agreement scene.

### Transition

The practical questions are written down beside Higgins's notes.

ch02_s03 → ch02_s04

## ch02_s04 – The Price of a Lesson

### Stage direction and narration

At the table, the agreement becomes concrete. Coins, a pen, and a weekly schedule sit beside the phonetic notes.

**HIGGINS:** Three mornings each week. Practice between lessons. A fixed fee.

**ELIZA:** And what do I receive for it?

**HIGGINS:** Instruction, exercises, and a way to make your speech clearer.

**ELIZA:** Then write this too: clearer doesn't mean it stops being mine.

**PICKERING:** That is a fair term.

**MRS PEARCE:** A fair agreement needs both sides to understand it.

The written terms remain visible in the story. This is not a hidden comprehension test.

### Terms card

- Three lessons each week.
- Practice between lessons.
- A fixed fee.
- The purpose of the lessons must remain Eliza's to define.
- Questions and clarification are allowed.

lesson_terms_understood = true means that the visible terms have been read and accepted as the story moves forward. It is not an answer-key result.

### Transition

Eliza places the money on the table. The agreement is not perfect, but it is spoken aloud.

ch02_s04 → ch02_s05

## ch02_s05 – Why I Am Here

### Stage direction and narration

The hallway is quiet again. The first lesson can begin, but Eliza stops at the threshold.

**ELIZA:** Before I begin, I want to say why I came.

**PICKERING:** Then say it in your own way.

Eliza names the purpose that feels true now. It may be the same as her Chapter I motivation, or it may have changed.

### D05 – Confirmed motivation

PROMPT: What is Eliza choosing to learn for?

1. d05_opportunity — “I want work where people listen to what I can do.”
2. d05_respect — “I want to be heard before people decide what I am.”
3. d05_learning — “I want to understand these forms and choose when they help.”
4. d05_independence — “I want skills I can use without handing over my future.”

No option is more correct or more mature than another.

### Immediate consequence

The selected option is saved as confirmed_motivation. origin_motivation remains unchanged. In the Scene 05 book-first checkpoint, preserve motivation_shift and motivation_nuance unchanged; D05 records only confirmed_motivation and its stable event. A change of motivation is not failure or inconsistency.

### Chapter II ending

**ELIZA:** I am here to learn more ways to speak. I will choose what those ways are for.

**NARRATION:** The door to the lesson room stays open. Eliza enters with a plan, a question, and terms she has helped to name.

ch02_s05 → ch03_s01

## Content lock checks

- Canonical scenes: exactly 5.
- Major decisions: exactly D04, D05.
- Language challenges: exactly LC03, LC04.
- No Chapter II development-signal increment is applied by decisions, challenges, or the clarification response.
- Direct, polite, and boundary-setting requests remain equally legitimate.
- LC03 is a reading / language-noticing challenge.
- LC04 uses stable sample and answer IDs; replay, retry, and refresh preserve order.
- Story voice text is visible verbatim in this file and must match AUDIO_PLAN.md.
- No runtime, UI, generated audio, or generated visual is defined here.
