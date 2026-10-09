# Chapter IV Teacher Content

Status: S01 and S02 implemented; S03–S05 Teacher Mode content is canonically locked in pre-production. Teacher Mode preview is read-only; S02 cultural-reference audio is explicitly teacher-triggered and does not write learner state.

## 1. Chapter Overview

Chapter IV moves Eliza from controlled practice toward communication in social situations. Her voice-stage is **Emerging New Speech**: more natural rhythm, greater confidence and less self-conscious articulation, while keeping her established identity. This is growing communicative choice, not polished final performance or identity erasure.

## 2. S01 Learning Goals

- Notice that speaking in a real interaction also requires listening and pacing.
- Choose a preparation approach without treating one as correct.
- Recognise that intelligibility and communicative choice do not require erasing identity.

S01 has no pronunciation challenge. D08 is a non-punitive preparation choice. Teacher preview shows the scene and choice content but does not mutate learner state.

## 3. S02 Learning Goals

- Recognise conversational opening, continuation and closing signals.
- Practise short B1 small-talk turns about names, weather, the journey and reading.
- Notice that a clear closing signal may make another follow-up question unsuitable.
- Observe `/eɪ/` in Eliza's original weather line as a secondary pronunciation detail, never as a judgement of her accent.
- Hear a more natural rhythm and greater confidence than in Chapter III, with less self-conscious articulation and the same voice identity. Mild pressure may bring back some Cockney features; that is normal variation, not failure.

## 4. Language and listening focus

LC11 asks learners to classify a conversational turn as opening, continuing or closing. It teaches phatic language and turn-taking: a question may invite a first exchange, a follow-up can keep it going, and a polite closing can signal that the exchange is complete. After a closing signal, another question may ignore the other speaker's cue. This is social inference under mild pressure, not an intelligence test.

Eliza's line “It rained on the way here, but today the sky is clearing.” contains `/eɪ/` in “rained”, “way” and “today”. Treat this as an optional listening observation, not a required LC11 skill or a caricatured `rain / Spain / plain` exercise.

## 5. LC11 Teacher Notes

The three samples and stable answer IDs are documented in `STATE_AND_BRANCHING.md`: sample 1 opens, sample 2 continues, sample 3 closes. For each sample, transcript support is available before the first attempt, while the canonical transcript stays hidden until the learner requests it. A learner need not guess or attempt playback to access support. It works with Sound On and Sound Off and carries no penalty or reward. Correct answers persist; an incorrect answer may be tried again. LC11 adds no Pronunciation, Confidence, Independence or score.

## 6. Decisions and signals

D08 remains the saved S01 preparation choice; it does not gate S02 or influence LC11. Following LC11, an optional local reply lets Eliza continue the conversation. Either reply is valid, both converge, and either may apply `Confidence +1` once. It is not a major decision and does not alter later branches. No pronunciation reward is attached to weather vocabulary or challenge performance.

## S03 Learning Goals and Teacher Notes

- Distinguish literal meaning from implied meaning in a playful social remark.
- Notice that grammatical, clearly pronounced speech can still miss an implied meaning; correct pronunciation does not automatically mean correct pragmatic interpretation.
- Explore pragmatic repair without ranking personal recovery styles.

### LC12 answer key

- Literal (`lc12_literal_meaning`): `literal_city_decided` — “London made a decision about the rain.”
- Implied (`lc12_implied_meaning`): `implied_rain_joke` — “It has been raining a lot, and the Guest is joking about it.”

LC12 checks these two interpretations only. It does not grade D09. After an item's first submitted attempt, transcript/context support becomes available; replay and support carry no penalty. See `STATE_AND_BRANCHING.md` for the complete item contract.

### D09 and equity framing

There is no single correct recovery style. `rephrase`, `acknowledge_literal` and `wait_for_cue` are all socially plausible strategies with different interpersonal tones. D09 is a recorded preference, not a scored answer; it adds no development signals or score.

Preserve `Accent ≠ intelligence`. Eliza's misunderstanding concerns social inference, not intellectual ability or accent quality. Her pronunciation is successful and her dialogue is original adaptation text.

## S04 Learning Goals and Teacher Notes

### Objective

Students distinguish language accuracy from pragmatic understanding and reflect on who controls feedback and communication goals.

### Key language and story points

Clear pronunciation does not guarantee shared meaning. Successful communication also depends on context, audience and implied meaning. Eliza begins to question not only how she speaks, but who decides what her progress is for.

S04 follows a pragmatic inference mismatch, not a pronunciation failure. Eliza's calm final line is an agency beat, not a rebellion climax. Higgins is matter-of-fact and emotionally blind, not intentionally cruel; Pickering and Mrs Pearce support Eliza without ranking her worth by social polish.

### Reflection choice

The required, non-graded reflection focuses on one of three legitimate areas: language, audience or feeling. There is no correct answer. The stable choices and exact visible lines are in `STATE_AND_BRANCHING.md`. The choice has no score, reward, Confidence, Independence or Pronunciation effect and does not branch S05.

### Equity framing and discussion

- `Accent ≠ intelligence.`
- Social conventions are learned and culturally variable; misunderstanding them is not evidence of lower ability.
- Primary discussion prompt: “Who should decide what counts as successful communication?”
- Optional secondary prompt: “Can feedback be useful without becoming a judgment about the person?”

S04 dialogue is original project adaptation inspired by the thematic situation in Shaw's public-domain *Pygmalion*; it is not quoted from Shaw. No wording is taken from *My Fair Lady*, no lyrics or distinctive musical dialogue are used, and no S04 cultural note about the musical is required.

## S05 Learning Goals and Teacher Notes

### Objective

Students understand code-switching as a communicative repertoire: speakers can adjust how they speak for context without changing who they are.

### Key language, pragmatics and story points

- A speaker can choose between more careful and more spontaneous speech depending on context.
- Changing register is not the same as pretending to be a different person.
- Eliza begins to treat speech choices as tools she controls rather than rules imposed on her.
- Careful speech is an available skill, not a superior identity; spontaneous speech is not failure.

### Equity framing and discussion

- `Accent ≠ intelligence.`
- No single accent or register is appropriate for every context.
- Successful communication does not require giving up linguistic identity.
- Primary prompt: “When do you change the way you speak, and does that change who you are?”
- Optional prompt: “Is adapting your speech a skill, a disguise, or can it be both in different situations?”

S05 has no challenge, graded outcome, new decision or reflection write. D08 may be previewed only as the read-only memory echo from existing learner state; never write D08 or substitute a default value. Teacher preview is read-only and does not autoplay, start ambience, write any state, complete the scene or advance progression.

## 7. Cultural / Literary Context

Small talk in an Edwardian social setting can be a useful ritual and can also express class expectations. The scene examines those conventions without endorsing them. Cockney is not defective, upper-class speech is not morally better, and accent is not intelligence.

### Cultural note — later musical adaptation *My Fair Lady*

The later musical adaptation *My Fair Lady* made Eliza's phonetic training famous through the line “The rain in Spain stays mainly in the plain.” This is a brief cultural reference to the later musical, not text from Shaw's original play *Pygmalion*. Our game uses original dialogue: “It rained on the way here, but today the sky is clearing.” Teachers may use the two examples to notice the English diphthong `/eɪ/`; the quoted reference is teacher-facing context, not learner-facing story dialogue, and it is separate from LC11 and AM36.

An optional, explicit Teacher Mode audio control may play the reference line as speech only. Use the existing foreground audio infrastructure; do not sing, use a melody, imitate a specific performance, or use Eliza's canonical story voice. The reference preview is read-only: it does not write learner state, trigger a challenge, advance a scene, or count toward learner progress. Audio ID, path and casting status are in `AUDIO_PLAN.md`.

## 8. Sensitive Framing

Do not present social conventions as proof of a person's worth. A missed cue is a learnable communication moment, not evidence of low intelligence. Eliza expands her repertoire without losing her voice; clearer speech does not require a “perfect lady” performance.

## 9. Suggested Classroom Use

Ask learners to identify what each speaker's turn invites, then role-play opening, continuing and closing a brief exchange. Discuss why one may stop asking questions after a closing signal. For S03, compare literal and implied meanings before discussing the different interpersonal tones of the three equally legitimate recovery strategies. Replay with transcript/context support after an attempt. Compare Eliza's Chapter III and IV delivery for rhythm and confidence while listening for continuity of voice identity.

## 10. Scene Navigation

Chapter III ends with Eliza: “I can hear it myself.” and narration: “The lesson is over. The learning is not.” After D08 and explicit Continue, S01 records `ch04_s01_complete` once and moves to S02. After all three LC11 samples are correct, explicit Continue is unlocked; it records `ch04_s02_complete` once and moves to S03. LC11, replay, optional reply and Teacher preview never navigate automatically.

In S03, explicit Continue is unlocked only after `ch04_lc12_complete` and `ch04_d09_recorded`. It records `ch04_s03_complete` once and moves to S04. LC12 completion, D09, replay, audio completion and Teacher preview never navigate automatically. S04 requires `ch04_s04_reflection_recorded`; explicit Continue records `ch04_s04_complete` once and moves to `ch04_s05`. Reflection selection, replay, audio completion and Teacher preview never navigate automatically. S05 requires only `ch04_s04_complete`; after the story sequence, explicit Continue records `ch04_s05_complete` once and moves to `ch05_s01`. D08 recap, replay and Teacher preview do not gate or auto-advance.

## 11. Teacher Preview Contract

Preview may display story content, goals, challenge instructions, answer keys, reflection options and teacher notes. Opening or rendering preview must not autoplay any audio or start ambience, or write answers, attempts, support use, completion events, decisions, reflection selection, development signals or scene progression into learner state. AM37/AM38 audio requires an explicit playback action in student mode. S04 Teacher preview does not play AM39 or select the reflection; it is read-only for `reflections.ch04_s04_focus`, `ch04_s04_reflection_recorded` and `ch04_s04_complete`. S05 preview displays D08 only from existing learner state and never writes a fallback/default or acknowledgement; it does not play AM41, start AM42, write state or progress.
