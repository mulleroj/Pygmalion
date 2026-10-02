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

Only [SCENE_MAP.md](../../SCENE_MAP.md) / [TEACHER_MODE_SPEC.md](../../TEACHER_MODE_SPEC.md) intent: S02 minimal pairs; S03 word stress; S04 sentence stress/intonation; S05 supportive feedback; S06 transfer/self-correction. Later scene-specific copy and item keys are not locked by this document.



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

ch03_s01 → ch03_s02 story → LC06 (unaided or supported completion) → reflection → explicit Continue, ch03_s02_complete once without increment → ch03_s03 Finding the Main Stress. If S03 absent, retain completion/review and show unavailable-scene boundary, not Chapter III completion. Shared save/event/challenge/Teacher/AudioManager architecture only; no persistent minimal_pair_seen or parallel S02 engine.
