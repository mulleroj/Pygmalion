# Chapter III Teacher Content — S01

Status: S01 PRE-PRODUCTION CONTENT LOCK FOR HUMAN REVIEW. Twelve-section content specification, not an implemented Teacher panel. Use [SCRIPT.md](SCRIPT.md), [STATE_AND_BRANCHING.md](STATE_AND_BRANCHING.md), [AUDIO_PLAN.md](AUDIO_PLAN.md) and [VISUAL_PLAN.md](VISUAL_PLAN.md) together.

## 1. Chapter Overview

The Lessons begins with The Mouth Is a Muscle, ch03_s01. Eliza enters her first practical lesson with her own purpose. Learning one mouth movement expands her choices; it does not repair her identity. Later chapter content remains unlocked.

## 2. Learning Goals

Notice the physical difference between /θ/ and /f/, associate a sound with a mouth movement, choose the next articulation step, request suitable support and distinguish a learner preference from an objectively checked skill answer.

## 3. Language Focus

Articulation awareness: /θ/ uses the tongue tip at the front teeth with flowing air; /f/ uses lower lip and upper teeth with flowing air. The contrast is thin /θɪn/ vs fin /fɪn/. Functional language: “Show me…”, “Let me try…”, asking for another explanation. No microphone or machine judgement of students' pronunciation.

Pedagogical reference for the dental sound: [British Council — Problems with ‘th’ words](https://africa.teachingenglish.org.uk/classroom/pronunciation/th-words). The lesson uses a light tongue-to-front-teeth contact; do not demand exaggerated protrusion, biting or force.

## 4. Listening Focus

LC05 asks what produces each heard sound and how to move from lower-lip contact to tongue-tip contact for /θ/. Higgins provides both neutral samples; the sound change, not a different voice or emotional status, is the evidence. Eliza's optional story attempt is separate. Conscious Training means audible attention, more precise articulation and sometimes cautious tempo while Cockney and her voice identity remain recognisable.

## 5. Key Vocabulary

sound, tongue, lip, teeth, air, slowly, mirror, thin, fin, try, repeat. Explain fin briefly as a fish's body part so the example is comprehensible at A2+/B1.

## 6. Cultural / Literary Context

This is an original educational adaptation of Pygmalion, not a musical lesson or song. Cockney-like /f/ for /θ/ is the selected contrast; it is not a universal description of all Cockney speakers. Accent ≠ intelligence. Repertoire and intelligibility are situational tools, not measures of worth.

## 7. Decisions – Teacher Notes

D06 is open choice — no answer key. d06_slow_repeat stores slow_repeat and pronunciation +1; d06_visual_model stores visual_model and confidence +1; d06_own_words stores own_words and independence +1. Event ch03_d06_practice_preference applies once. Asking to see a model expresses agency. The three routes converge; none is superior or an ending gate. request_strategy callback recalls direct/polite/boundary with neutral fallback and no mutation. In Training derives from scene metadata, not persistent eliza_stage.

## 8. Challenge Key

| Item ID | Correct answer ID | Explanation / typical confusion |
|---|---|---|
| lc05_sample_theta | lc05_tongue_teeth | /θ/ uses tongue tip/front teeth. Do not confuse it with lower-lip contact. |
| lc05_sample_f | lc05_lip_teeth | /f/ uses lower lip/upper teeth. Both sounds allow air flow, so airflow alone does not distinguish them. |
| lc05_step_theta | lc05_step_tongue_air | Release lower lip, bring tongue tip lightly to front teeth and let air flow. Keeping the lip retains /f/; stopping air does not practise the target fricative. |

Exact visible answer labels and per-item feedback are locked in STATE_AND_BRANCHING.md. Three correct items complete LC05. Event ch03_lc05_completed owns the single pronunciation +1. A wrong attempt changes no development signal. If D06 slow_repeat already added +1, the eventual scene total is pronunciation +2 from two different events: strategy and objective awareness. This is intentional, not duplicate scoring. Teacher keys stay outside ordinary student display; explain each answer after that item's submission.

## 9. Discussion Questions

- What changes when you use your tongue rather than your lip?
- What kind of help makes a new movement clearer for you?
- Can someone choose another sound without becoming another person?
- How can an instructor correct a sound respectfully?

## 10. Sensitive Framing

Never call Eliza's accent a personal error, lack of intelligence or inferior identity. Avoid imitation for humour and “Higgins fixes Eliza”. Students may try privately, listen, read support or observe; no public performance is required. The objective answer is about this sound target; D06 remains an equally valid preference. Internal signals are descriptive development metadata, not student grades or a psychological profile.

## 11. Suggested Classroom Use

Read the scene first; compare the two samples or their transcripts; optionally use a mirror and discuss D06 preferences. Replay is unrestricted. Transcript descriptions are available on demand before attempts, with no automatically selected answer/key. A silent route uses those descriptions and the next-step text; it has the same completion contract and no access penalty. Keyboard controls must reach playback, transcript disclosure, choices, retry and Continue with visible focus; labels cannot rely on colour. Static mouth reference and full text support reduced motion. Sound Off never hides the story or support.

Teacher context must include chapter/scene/challenge and previewMode. Teacher preview is isolated: no decisions, answers, attempts, option orders, signals, applied_events or saves change. No auto-unlock, AM22 trigger or completion on opening/closing. Explicit preview audio may play without gameplay mutation and is cleaned up on exit. Restore student focus/context.

## 12. Scene Navigation

ch03_s01 — The Mouth Is a Muscle → D06 → LC05 → reflection → explicit student Continue (ch03_s01_complete, no signal) → canonical ch03_s02. With S02 unavailable, retain completion/review and explain the checkpoint boundary rather than route to a missing scene. No Chapter III completion is claimed.

Future implementation MUST reuse the existing story renderer, renderDecision, state/event store, AudioManager, challenge infrastructure, Teacher Mode dialog, replay/preview safety and responsive image-layer system. Extend shared hard-coded I–II context/guard handling; no Chapter III AudioManager, state store, second Teacher Mode, parallel decision system or isolated chapter save.

## Later Chapter III – NOT YET LOCKED

S03 word stress and S04 sentence stress / intonation are specified below. S05 supportive feedback and S06 transfer/self-correction remain unlocked.



## ch03_s02 — TEACHER CONTENT — PRE-PRODUCTION CANON LOCKED

Documentation only; NOT IMPLEMENTED. Twelve-section S02 contract; S01 unchanged.

### 1. Chapter Overview

The Listening Room follows S01 that afternoon. S01 production/articulation awareness /θ/ versus /f/ becomes S02 perception/listening discrimination in a flower order; Eliza remains active and recognisably herself.

### 2. Learning Goals

Hear three versus free, identify the word and confirm order meaning. Listening precedes further conscious production in this lesson sequence; no universal ban on practising speech first is implied.

### 3. Language Focus

three /θriː/ versus free /friː/: initial /θ/ and /f/ differ, shared /r/ and /iː/ remain. Exact scripts: “I'd like three flowers.” / “I'd like free flowers.” Three specifies quantity; free requests no payment. Teach both meanings equally without mapping recordings to answers.

### 4. Listening Focus

LC06 is an objective listening check with two same-speaker Higgins samples. Choose heard word and corresponding meaning. Visible story/optional story voices never reveal sample assignment or replace listening. Eliza stays Conscious Training, not polished speech.

### 5. Key Vocabulary

three, free, flowers, customer, order, pay, recording, replay, meaning. Free here means without payment, not independent or available time.

### 6. Cultural / Literary Context

Original Pygmalion educational adaptation, no musical dialogue/song/staging. Accent ≠ intelligence; expanding perception/repertoire does not fix an inferior identity.

### 7. Decisions – Teacher Notes

No new main decision. Unlimited replay is support, not a scored branch. No slowed playback or rate/pitch manipulation. Preserve S01 practice_preference and all inherited state.

### 8. Challenge Key

lc06_sample_01: lc06_word_three + lc06_meaning_three_flowers; lc06_sample_02: lc06_word_free + lc06_meaning_no_payment. Exact labels/key/feedback in STATE_AND_BRANCHING.md. All four checks complete LC06. ch03_lc06_completed applies once: pronunciation +1 only if completed without target-revealing support; supported completion has no increment and no penalty. Correct subanswers freeze; unresolved subanswers retry. No additional reward on replay/refresh, no later reward upgrade.

### 9. Discussion Questions

“What changes between three and free?” “How would you check whether flowers cost money?” “When does replay help?” “How can a seller ask for clarification respectfully?”

### 10. Sensitive Framing

No accent-shaming, comic imitation or mandatory public production/microphone. Supported practice is an accessible learning route, not failure or a negative score. Clearly distinguish objective unaided listening evidence from supported text practice.

### 11. Suggested Classroom Use

First attempt UNAIDED LISTENING; transcript unavailable beforehand. After the initial explicit attempt offer Supported practice, not automatic transcript disclosure. A learner unable to hear can explicitly record an unresolved “I cannot hear this recording” attempt without guessing, then access support. Text support permits challenge completion and story continuation; no pronunciation reward. Generic feedback/replay can remain unaided; opening transcript or target-specific explanation before completion irreversibly marks support use across refresh. After completion text support cannot remove an earned reward. Keyboard/focus reaches Play/replay, support, word/meaning choices, Submit/retry and Continue. Text labels/status/feedback never rely on colour; restore focus, respect reduced motion. Sound Off keeps story readable and supported route available after the first-attempt gate. Preview context includes Chapter III/ch03_s02/LC06/previewMode; use ephemeral answers/orders/support. No student saves, attempts, signals or events; no auto-unlock/auto-speech; clean foreground on exit and restore context/focus.

### 12. Scene Navigation

ch03_s01 → ch03_s02 story → LC06 (unaided or supported completion) → reflection → explicit Continue, ch03_s02_complete once without increment → ch03_s03 Finding the Main Stress. If S03 runtime is unavailable, retain completion/review and show unavailable-scene boundary, not Chapter III completion. Shared save/event/challenge/Teacher/AudioManager architecture only; no persistent minimal_pair_seen or parallel S02 engine.

## ch03_s03 — TEACHER CONTENT — PRE-PRODUCTION CANON LOCKED

Canon and teaching guidance; use the established 12-section Teacher Mode structure. Teacher preview is read-only: it never writes answers, support usage, progress, signals, completion or events. Runtime assets and their QA state are tracked in AUDIO_PLAN.md.

### 1. Chapter Overview

The Lessons continues in Higgins's study. S03 moves from hearing individual sounds (S01–S02) to hearing the main stress inside one word. Eliza discovers the word's shape herself.

### 2. Learning Goals

Identify which syllable carries the main stress in familiar multisyllabic words. Listen to the whole word rather than count letters. This builds awareness and repertoire; it is not accent erasure.

### 3. Language Focus

Word stress is the prominence of one syllable within a word. Teach only word stress here. Sentence stress, intonation, attitude and whole-sentence rhythm belong to S04. Key: **CUS-to-mer** (customer, syllable 1), **ex-PEN-sive** (expensive, syllable 2), **de-LIV-er-y** (delivery, syllable 2). Capitalization is answer-key notation, never an initial student cue.

### 4. Listening Focus

LC07 plays each complete target word in a separate canonical Higgins/Kelvin recording. Learners select its main-stressed syllable. Listen to the word as a whole and notice which syllable stands out; do not infer stress from spelling or sentence context. Replay is unlimited at normal speed. No slowed audio or speech synthesis fallback. The visible word and syllable controls remain available as a transcript if audio cannot be played. Individual recordings and the complete S03 mix passed Human Audio QA; status details are in AUDIO_PLAN.md.

### 5. Key Vocabulary

word, syllable, stress, strongest, customer, expensive, delivery. Here, “stress” means prominence inside a word, not worry or pressure.

### 6. Cultural / Literary Context

This is an original educational adaptation. Accent ≠ intelligence. A speaker's familiar accent or social identity is not defective; conscious stress awareness adds choices and can support intelligibility.

### 7. Decisions – Teacher Notes

No D-numbered main narrative decision in S03. D07 remains in S04. No Confidence/Independence reward and no signal increment on scene completion.

### 8. Challenge Key

`challenges.lc07`: `lc07_sample_01` customer → `lc07_stress_customer_1` (1); `lc07_sample_02` expensive → `lc07_stress_expensive_2` (2); `lc07_sample_03` delivery → `lc07_stress_delivery_2` (2). `ch03_lc07_completed` grants Pronunciation +1 once only for completion without opening target-revealing support. Supported completion gives no increment and no penalty. See STATE_AND_BRANCHING.md for the full contract.

### 9. Discussion Questions

“Which syllable stood out to you?” “Did hearing the whole word help more than looking at its spelling?” “How is stress inside a word different from emphasis across a sentence?”

### 10. Sensitive Framing

Do not describe a social accent as wrong, unintelligent or something Eliza must lose. Correctness here means identifying the conventional main stress of the target word, not judging the speaker or learner. Support is a valid learning route, not failure.

### 11. Suggested Classroom Use

Let learners make an unaided first attempt with all syllables styled identically. Unlimited normal-speed replay is available. After an incorrect attempt, offer optional Supported Practice; opening target-revealing support permanently removes reward eligibility for this challenge but allows completion with no penalty. Do not display answer notation before response. Preserve correct answers on retry. Ensure keyboard/touch operation, visible focus and text status independent of colour; visible word/syllables remain available when audio is unavailable. Teacher preview/replay is read-only.

### 12. Scene Navigation

ch03_s03 story → LC07 unaided or supported completion → Eliza's discovery → explicit Continue (`ch03_s03_complete`, no signal increment) → ch03_s04 `A Sentence Has Shape`. Bridge: individual sounds → word stress → sentence stress/intonation. S04's D07 and LC08 are not changed by S03.

## ch03_s04 — TEACHER CONTENT — S04 PRE-PRODUCTION CANON LOCKED

Canon and teaching guidance; use the established 12-section Teacher Mode structure. Teacher preview is read-only: it does not write D07, answers, attempts, support usage, progress, signals, rewards, completion or events. S04 runtime and all twelve approved individual audio takes are integrated; full Human Audio Mix QA = PASS (see AUDIO_PLAN.md).

### 1. Chapter Overview

S04, “A Sentence Has Shape,” continues the lesson in Higgins's study. Eliza is at the Conscious Training stage. After S03's word stress, she listens for the word that carries the strongest part of a sentence's message. A change in prominence can shift what a listener understands as important. S04 prepares her to draw on this technique when tired and frustrated in S05.

### 2. Learning Goals

Identify the prominent focus word in a short spoken sentence; notice how sentence stress can foreground meaning; distinguish sentence stress/intonation (S04) from stress within a word (S03). Learners may listen, replay or use text support. This is awareness and communicative choice, not accent erasure.

### 3. Language Focus

S03 = word stress: prominence within a word. S04 = sentence stress / intonation: prominence across a sentence and how it shapes the message. Do not turn S04 into an evaluation of accent, personality or intelligence. Natural prominence is clear but not exaggerated.

### 4. Listening Focus

LC08 contains three individually approved Higgins/Kelvin sentence recordings: “I wanted the red flowers.” (focus red), “She bought three tickets.” (focus three), and “We meet on Monday.” (focus Monday). Listen for the word carrying the strongest part of the message, not a mechanically loud syllable. Normal-speed replay is unlimited and read-only. Visible text and Supported Practice keep the activity accessible without sound. Story demonstration uses “She ordered the blue hat,” which is not an LC08 target and cannot reveal its answer key. Human Audio Mix QA for S04 = PASS.

### 5. Key Vocabulary

sentence, message, focus, prominent, stress, intonation, meaning, replay. Explain that sentence stress concerns which word stands out in a message; S03 stress concerns which syllable stands out inside a word.

### 6. Cultural / Literary Context

Original educational adaptation; no copied musical dialogue, lyrics or staging. Preserve “Accent ≠ intelligence.” Eliza gains another listening and speaking choice; her existing voice and identity are not corrected or replaced.

### 7. Decisions – Teacher Notes

D07 is a low-risk learning-strategy choice: ask Higgins to repeat slowly (`d07_repeat_slowly`), hear it naturally again (`d07_hear_naturally`), or try it herself first (`d07_try_first`). Each is valid and rejoins the same LC08 challenge. The choice is recorded in the common decision ledger only; it adds no signal/skill, creates no persistent pedagogical flag and does not change an answer or route. Its placement after the demonstration first establishes the concept, then lets Eliza choose how to practise.

### 8. Challenge Key

`challenges.lc08`: `lc08_sample_01` → `lc08_focus_red` (red); `lc08_sample_02` → `lc08_focus_three` (three); `lc08_sample_03` → `lc08_focus_monday` (Monday). These three objective recordings are integrated; individual Human Audio QA = PASS. Initial controls/text remain visually neutral. `ch03_lc08_completed` applies Pronunciation +1 once only when completed without opening target-revealing support. Supported completion gives no reward and no penalty. Support use cancels reward eligibility; replay does not. Full contract is in STATE_AND_BRANCHING.md.

### 9. Discussion Questions

“Which word carried the strongest part of the message?” “What changed when the focus changed?” “How is that different from stress inside a word?” “When might you ask someone to repeat something naturally or slowly?”

### 10. Sensitive Framing

Do not describe an accent or social register as unintelligent, inferior or a defect. Sentence stress gives speakers choices for making meaning clear; learners can use the text and supported route without public performance or microphone recording. Support is not failure.

### 11. Suggested Classroom Use

Allow a normal-speed unaided first attempt and unlimited replay. After an incorrect attempt, offer the neutral cue “Listen for the word that carries the strongest part of the message.” Opening support may disclose that focus and permanently cancels the one-time unaided reward eligibility, but never penalizes or blocks completion. Retain correct sample responses through retry. Use visible text for learners who cannot hear or whose recording is unavailable. Keep answer reveals out of pre-response formatting and story examples. No required learner voice recording or automated speech judgment.

### 12. Scene Navigation

S04 story demonstration → D07 strategy choice → LC08 unaided or supported completion → reflection that prepares Eliza for a difficult day → explicit student Continue (`ch03_s04_complete`, no skill increment) → `ch03_s05 – The Bad Day`. D07 selection, replay, render, audio ending, refresh and Teacher preview do not complete the scene. S03 remains word stress only; S04 is sentence stress / intonation. S05–S06 content remains unlocked.

## ch03_s05 — TEACHER CONTENT — S05 PRE-PRODUCTION CANON LOCKED

Documentation only; NOT IMPLEMENTED. Teacher preview is read-only and uses the established 12-section structure.

### 1. Chapter Overview

S05, “The Bad Day,” follows S04 in Higgins's study a few days later. The lesson runs long; tiredness and frustration make Eliza rush a familiar sentence. She pauses, slows down, divides it into useful small parts, tries again and recovers. S06, “A Small Victory,” transfers the skill to a natural interaction.

### 2. Learning Goals

Notice performance can vary; regulate pace without treating slower speech as failure; divide a sentence into manageable parts, rebuild it and make a repair. Previous learning remains available even when access to it temporarily feels harder.

### 3. Language Focus

No new phonology. Practise pace, a pause at a meaningful clause boundary, and self-repair. Learner-facing language: “small parts,” “pause,” “try again,” “give the sentence room.” Slower speech gives the speaker time to hear their own words; it is not inherently better or worse.

### 4. Listening Focus

LC09 uses three whole-sentence recordings. Learners select the natural boundary between clauses, then hear/read the sentence again with that split. Keep the whole sentence and replay available. Exact audio transcripts and speaker plan are in AUDIO_PLAN.md. No audio-only critical information.

### 5. Key Vocabulary

pace, pause, sentence, part, rest, moment, again, ends, slow down, hear. Explain “pace” as how fast someone speaks.

### 6. Cultural / Literary Context

Original adaptation. Do not copy musical dialogue or staging. Eliza is tired, not lazy or incapable; Cockney or another social register is never evidence of intelligence. Fatigue is a condition to manage, not evidence that learning failed. Higgins stays precise and demanding without bullying.

### 7. Decisions – Teacher Notes

No main D-numbered decision in S05. “Let me start again” is fixed story dialogue, not a learner choice. The scene-map's earlier D-less account is authoritative; no D08 or local pace decision is introduced. There is no Confidence increment for asking for a pause.

### 8. Challenge Key

`challenges.lc09`: `lc09_sample_01` → `lc09_pause_01` (after “ends”); `lc09_sample_02` → `lc09_pause_02` (after “pace”); `lc09_sample_03` → `lc09_pause_03` (after “words”). These clause boundaries make each intended split uniquely defensible. The exact unaided instruction is “Choose the best place to pause so the sentence is easier to say.” The exact incorrect feedback is “Not quite. Try again, or use Supported Practice.” The exact Supported Practice prompt is “Listen for the place where the sentence can breathe.” Only after explicit support opening, show “Pause here. Say the first part, then continue with the second.” and its keyed sentence split, as listed in STATE_AND_BRANCHING.md. Initial punctuation/spacing/styling does not reveal any answer. Unaided completion event `ch03_lc09_completed` grants Pronunciation +1 once. Target-revealing support permanently removes reward eligibility; supported completion receives no reward or penalty. Replay and preview do not mutate state.

### 9. Discussion Questions

- What changed when Eliza stopped and tried again?
- How can a pause help a long sentence?
- Does one difficult attempt erase what you learned earlier?
- What could Higgins say that is both clear and respectful?

### 10. Sensitive Framing

Never equate fatigue, a rushed attempt or an accent with low ability or poor character. Eliza keeps agency and identity. Avoid public performance pressure; no learner recording or speech scoring. Support is a learning route, not punishment. A temporary drop in performance does not mean previous learning disappeared.

### 11. Suggested Classroom Use

Read the scene before challenge work. Invite private reflection on when a pause helps; do not require personal disclosure. Try chunking the three neutral sentences, then discuss how support changes access. Keep answer keys in Teacher Mode. Teacher preview/replay never changes learner answers, support, rewards, events or completion.

### 12. Scene Navigation

S05 story → LC09 unaided or supported completion → Eliza: “I can get it back.” → explicit Continue (`ch03_s05_complete`, no increment) → `ch03_s06 – A Small Victory`. No main decision gate. S06 supplies the transfer; S05's modest recovery is not a giant breakthrough.
