# Chapter IV Teacher Content

Status: S01 implemented; preview is read-only. S02 teacher content locked for pre-production; runtime preview is not implemented.

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

The three samples and stable answer IDs are documented in `STATE_AND_BRANCHING.md`: sample 1 opens, sample 2 continues, sample 3 closes. Before a sample's first attempt, do not expose its transcript or answer. After that attempt, the learner may explicitly request replay and transcript/support. Support is accessible and carries no penalty. Correct answers persist; an incorrect answer may be tried again. LC11 adds no Pronunciation, Confidence, Independence or score.

## 6. Decisions and signals

D08 remains the saved S01 preparation choice; it does not gate S02 or influence LC11. Following LC11, an optional local reply lets Eliza continue the conversation. Either reply is valid, both converge, and either may apply `Confidence +1` once. It is not a major decision and does not alter later branches. No pronunciation reward is attached to weather vocabulary or challenge performance.

## 7. Cultural / Literary Context

Small talk in an Edwardian social setting can be a useful ritual and can also express class expectations. The scene examines those conventions without endorsing them. Cockney is not defective, upper-class speech is not morally better, and accent is not intelligence.

### Cultural note — later musical adaptation *My Fair Lady*

The later musical adaptation *My Fair Lady* made Eliza's phonetic training famous through the line “The rain in Spain stays mainly in the plain.” This is a brief cultural reference to the later musical, not text from Shaw's original play *Pygmalion*. Our game uses original dialogue: “It rained on the way here, but today the sky is clearing.” Teachers may use the two examples to notice the English diphthong `/eɪ/`; the quoted reference is teacher-facing context, not learner-facing story dialogue, and it is separate from LC11 and AM36.

An optional, explicit Teacher Mode audio control may play the reference line as speech only. Use the existing foreground audio infrastructure; do not sing, use a melody, imitate a specific performance, or use Eliza's canonical story voice. The reference preview is read-only: it does not write learner state, trigger a challenge, advance a scene, or count toward learner progress. Audio ID, path and casting status are in `AUDIO_PLAN.md`.

## 8. Sensitive Framing

Do not present social conventions as proof of a person's worth. A missed cue is a learnable communication moment, not evidence of low intelligence. Eliza expands her repertoire without losing her voice; clearer speech does not require a “perfect lady” performance.

## 9. Suggested Classroom Use

Ask learners to identify what each speaker's turn invites, then role-play opening, continuing and closing a brief exchange. Discuss why one may stop asking questions after a closing signal. Replay with transcript support after an attempt. Compare Eliza's Chapter III and IV delivery for rhythm and confidence while listening for continuity of voice identity.

## 10. Scene Navigation

Chapter III ends with Eliza: “I can hear it myself.” and narration: “The lesson is over. The learning is not.” After D08 and explicit Continue, S01 records `ch04_s01_complete` once and moves to S02. After all three LC11 samples are correct, explicit Continue is unlocked; it records `ch04_s02_complete` once and moves to S03. LC11, replay, optional reply and Teacher preview never navigate automatically.

## 11. Teacher Preview Contract

Preview may display S02 story content, goals, challenge instructions and teacher notes. Opening or rendering preview must not play AM35/AM36, start ambience, or write answers, attempts, support use, completion events, application choice, development signals or scene progression into learner state. Audio requires an explicit learner playback action in student mode.
