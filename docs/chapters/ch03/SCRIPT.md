# Chapter III Script — The Lessons

Status: S01 and S02 canon locked; S03 PRE-PRODUCTION CANON LOCKED. This document remains the dialogue and story canon; S03 runtime and approved audio assets are implemented separately.

Authorities: [scene map](../../SCENE_MAP.md), [voice arc](../../audio/ELIZA_VOICE_ARC.md), project story/visual/audio/language bibles. Companion contracts: [state](STATE_AND_BRANCHING.md), [audio](AUDIO_PLAN.md), [visuals](VISUAL_PLAN.md), [Teacher](TEACHER_CONTENT.md). Original adaptation; no musical dialogue, songs or staging.

## ch03_s01 — The Mouth Is a Muscle

First week of lessons, morning, Higgins's study used as a lesson room. Eliza is now visually In Training. Higgins and Eliza are the main figures; Pickering observes and Mrs Pearce briefly enters. Read / Story → D06 → consequence → LC05 → reflection → explicit completion → ch03_s02. Everything below remains visible without optional story voice.

### Opening

Morning light falls across the desk. Eliza puts the lesson schedule beside a small mirror. She has chosen to be here. Now she wants to know what the work will feel like.

Insert exactly one narration callback, selected by inherited request_strategy; no mutation:

| Value | Canonical narration |
|---|---|
| direct | She asked for lessons plainly. This morning, she is ready to ask plain questions too. |
| polite | She chose a polite request at the door. Inside the lesson room, she still expects a clear answer. |
| boundary | She asked for lessons with a clear boundary. That boundary belongs in the lesson room too. |
| missing, null or unknown | Eliza has come for lessons of her own choosing. She can ask how they will work. |

Do not infer motivation_shift or overwrite origin_motivation, confirmed_motivation or any Chapter II field.

Eliza: “I know why I'm here. Show me what my mouth needs to do.”

Higgins: “We will try one sound. Listen to the beginning of ‘thin’. Then watch my mouth.”

He points to the mirror, not to Eliza's clothes or manner.

Higgins: “For /θ/, bring the tip of your tongue lightly to your front teeth. Let the air flow. For /f/, your upper teeth meet your lower lip. Try ‘thin’ slowly.”

Eliza: “Thin... I'm watching my tongue. It feels strange, but I can try it.”

Pickering: “You can take your time. Ask for the kind of help you need.”

Mrs Pearce leaves a sheet beside the mirror.

Mrs Pearce: “And if an explanation is not clear, ask for another one.”

Eliza: “Another sound to choose from. Still my words.”

The book explains in ordinary text: /θ/ uses tongue and front teeth; /f/ uses lower lip and upper teeth. Both let air flow. This lesson practises a sound choice, not the value of a speaker. Cockney-like /f/ is not a personal failing and is not universal to all Cockney speakers.

### D06 — Practice Preference

Prompt: “How does Eliza want to practise first?” No correct answer.

| Stable option ID | Saved value | Visible Eliza choice |
|---|---|---|
| d06_slow_repeat | slow_repeat | “Let me try it slowly a few times.” |
| d06_visual_model | visual_model | “Show me where my tongue and lips go.” |
| d06_own_words | own_words | “Let me try it in words I'd use.” |

Consequences, selected once and freely reviewable:

- slow_repeat — Higgins: “Take a breath between tries. Keep the air moving.” Eliza gives the sound a little more time.
- visual_model — Higgins: “Look in the mirror. Tongue at the front teeth for /θ/; lower lip at the upper teeth for /f/.” Eliza checks the movement before trying again.
- own_words — Higgins: “Choose a short sentence. Keep its meaning, and try the sound.” Eliza: “Three flowers, please.” The words belong to a situation she knows.

All paths converge. No strategy skips or changes the canonical LC05 key. Audio is selective; these branch replies remain text-only in this S01 plan.

### LC05 — A Sound and a Movement

Instruction: “Listen to each sound, or open its transcript. Choose which part of the mouth makes it. Then choose the next step for trying /θ/ in ‘thin’. You can replay and try again.”

Two sound-awareness items and one next-step item; exact IDs, text and feedback are locked in STATE_AND_BRANCHING.md and repeated in Teacher content. This is a listening/articulation-awareness challenge, not microphone recording or automated assessment of the learner's own speech. A silent, transcript-supported route remains available. Transcripts identify the sounds and describe production; they contain no answer ID, correct-choice badge or preselected response. A learner opening support before answering may reasonably find it helpful; access is never penalised.

After successful completion:

Eliza: “I can feel the difference now. I want to try it in a sentence.”

Pickering: “A new movement, and a choice about when to use it.”

Eliza closes the mirror for a moment. One sound has not changed who she is. It has given her something else to notice.

### Completion and transition

After D06 and LC05 completion, an explicit student Continue action records ch03_s01_complete once. Visible transition: “Later that afternoon, the lesson moves from the mirror to listening. Two similar sounds can change what a customer means.” Canonical destination: ch03_s02. In an S01-only future checkpoint, show the saved completion and review with the next scene unavailable; never navigate to a missing S02. S02 is not implemented here.

## Architecture guardrails

Future S01 MUST reuse the existing story renderer, renderDecision, state/event store, AudioManager, challenge infrastructure, Teacher Mode dialog, replay/preview safety and responsive image-layer system. Extend shared chapter metadata, guards and sample handling where currently hard-coded to I–II. No Chapter III AudioManager, state store, second Teacher Mode, parallel decision system or chapter-specific save.

## Later Chapter III – NOT YET LOCKED

S03 was subsequently locked below. S04 A Sentence Has Shape (D07, LC08, sentence stress/intonation) is specified below. S05 The Bad Day (LC09, supportive feedback) and S06 A Small Victory (LC10, real-interaction transfer) → ch04_s01 remain unlocked.



## ch03_s02 — The Listening Room — PRE-PRODUCTION CANON LOCKED

Documentation only; NOT IMPLEMENTED / NOT GENERATED. Human-reviewed flow and dialogue, three/free decision and access/reward rules are locked. S01 remains unchanged. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. No main decision in S02.

### Exact story flow and player-facing copy


Opening narration: “That afternoon, the mirror rests beside the desk. Higgins prepares two short recordings. Eliza looks at the order cards. Pickering waits beside the table.”

Higgins: “This time, listen before you try to say the word.”

Eliza: “I know what my mouth is doing. My ears need a turn now.”

Higgins: “Two words can sound almost the same. One small sound can change an order.”

Pickering: “Take your time. You can hear each recording again.”

Eliza: “Then let me hear it twice. I want to know what the customer means.”

Narration: “The cards show two possible meanings. Eliza must listen to find which one the customer wants.”

LC06 instruction: “Listen to each recording. Choose the word you hear, then choose what it means for the order. Replay as often as you need.”

Before first attempt: “Try listening first. After your first attempt, text support will be available.” After first attempt: “Supported practice: open the spoken text if you need it. You can still complete the scene.”

Post-challenge narration: “Eliza sets the two cards apart. She pauses before answering.”

Eliza: “A small sound, but a different order. I can listen again before I answer.”

Higgins: “Good. Hear the difference first. Then practise saying it.”

Pickering: “And when you are not sure, ask the customer.”

Transition: “The next day, the lesson turns to the strongest syllable in a word. A customer must be able to recognise the word Eliza means.”

Explicit button label: “Continue”. Only explicit student Continue after the locked LC06 completion contract records ch03_s02_complete and advances to ch03_s03. If S03 runtime is unavailable, stay on completed S02 with review and a clear unavailable-scene boundary. No Chapter III completion claim.


### LC06 locked contextual scripts

| Stable sample ID | Exact spoken script / transcript | Word | Meaning |
|---|---|---|---|
| lc06_sample_01 | I'd like three flowers. | three /θriː/ | The customer wants three flowers. |
| lc06_sample_02 | I'd like free flowers. | free /friː/ | The customer wants flowers without paying. |

These are natural customer requests, not promises that the seller gives away flowers. Same carrier, different initial sound /θ/ versus /f/; /r/ and /iː/ remain shared. No extra coaching, target explanation or extra spoken words. Before listening use only “Recording 1” / “Recording 2”; story and cards must not identify which target belongs to which recording. Both alternatives can be taught equally, never sample-to-answer mapping. The previous candidate sets are superseded, not canon.

First attempt is UNAIDED LISTENING without transcript. After that attempt supported practice becomes available; opening target-revealing support makes completion supported, without blocking story progress or deducting signals. Exact key/state contract is in STATE_AND_BRANCHING.md.

## ch03_s03 — Finding the Main Stress — PRE-PRODUCTION CANON LOCKED

S03 follows S02 in Higgins's study. Eliza moves from individual sounds to the shape inside one multisyllabic word. The goal is word stress only; sentence stress, intonation and whole-sentence rhythm remain for S04. No main narrative decision. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. Five approved story voice moments and the three LC07 word recordings are integrated; their exact transcripts, asset metadata and Human Audio Mix QA = PASS are in [AUDIO_PLAN.md](AUDIO_PLAN.md).

Eliza expects to control every sound equally. Higgins invites her to listen for the part that stands out. She discovers for herself that one syllable comes forward while the others recede. The discovery belongs to Eliza; Higgins remains collaborative and does not claim a triumph.

**Opening**

Higgins: “A word has a shape. One syllable usually carries more weight than the others.”

Eliza: “So I needn't fight with every bit of it at once?”

Higgins: “No. Listen for the part that stands out.”

Eliza: “Then say it again. I'll listen for the strongest bit.”

**Before LC07**

Higgins: “Do not count the letters. Listen to the sound of the whole word.”

Eliza: “Right. I want to hear where it leans.”

**After LC07**

Eliza: “I can hear it now. One part comes forward and the rest follow it.”

Higgins: “Exactly. Find the stress first, and the word becomes easier to shape.”

No extra Higgins praise or triumph line. This is conscious learning, not correction of Eliza's identity or accent.

LC07 instruction: “Listen to each word. Choose the syllable that carries the main stress. You can replay each recording.” Each sample contains only its target word. Use neutral divisions (`cus | to | mer`, `ex | pen | sive`, `de | liv | er | y`) with identical initial styling. Do not show capitalized stress notation or any visual answer cue before response. No slowed audio. Exact IDs and reward contract are in [STATE_AND_BRANCHING.md](STATE_AND_BRANCHING.md).

The first submitted attempt is unaided. Normal-speed replay is allowed. After an incorrect attempt, offer optional Supported Practice with written syllable divisions, replay and the neutral cue “Listen for the syllable that sounds strongest.” Once target-revealing support is opened, unaided reward eligibility is permanently lost. Support carries no penalty; supported completion remains available. Preserve correct responses during retry where shared challenge handling supports it.

After LC07 completes by either route, show Eliza's discovery and Higgins's response. Only explicit student **Continue** records `ch03_s03_complete` once, with no signal increment, and advances to `ch03_s04 – A Sentence Has Shape`. No render, replay, audio ending, refresh or Teacher preview can complete it. The progression is individual sounds → stress within a word → stress and intonation across a sentence. D07 is specified in S04 below.

## ch03_s04 — A Sentence Has Shape — S04 PRE-PRODUCTION CANON LOCKED; RUNTIME AUDIO INTEGRATED

The approved S04 story canon remains locked and unchanged. Its BOOK-FIRST runtime and the twelve individually human-approved audio takes are integrated; full S04 Human Audio Mix QA = PASS (see AUDIO_PLAN.md). S04 follows S03 in Higgins's study. S03 remains word stress only; S04 teaches sentence stress and how changing the prominent word can change a sentence's meaning or implication. It does not revisit or alter the S03 word-stress key. BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE. Keep the original adaptation, B1-readable dialogue, and Eliza's agency; accent is never framed as intelligence.

**Opening**

Higgins: “You found the shape inside a word. Now listen for the shape of a whole sentence.”

Eliza: “You mean some words matter more than the others?”

Higgins: “Some carry more of the message. Let those words come forward.”

Eliza: “And the little ones can stop fighting for attention.”

**Demonstration**

Narration: “Eliza tries the sentence carefully, giving each word much the same weight.”

Higgins: “Listen: She ordered the blue hat.”

Higgins: “Now listen again: She ordered the BLUE hat.”

Eliza: “The second one sounds as if the colour matters.”

Higgins: “Exactly. Stress can tell the listener what matters most.”

The demonstration sentence is deliberately different from every LC08 target, so the story example cannot give away an objective answer before the learner responds.

**D07 — A way into the rhythm**

Prompt: “The sentence still feels awkward. What would Eliza like to try next?” The student makes one low-risk learning-strategy choice; no answer is better, no phonetic key changes, and the choice does not affect LC08 scoring or signals.

| Option ID | Student-facing option | Brief follow-up |
|---|---|---|
| d07_repeat_slowly | Ask Higgins to repeat it slowly | Eliza: “Would you say that slowly once more?” Higgins: “Listen to how the strong word carries the point.” |
| d07_hear_naturally | Hear it naturally again | Eliza: “Let me hear it naturally once more.” Higgins: “Of course. Notice where the message comes forward.” |
| d07_try_first | Try it herself first | Eliza: “Let me try it myself first.” Higgins: “Go ahead. Let the important word come forward.” |

The choice is recorded once in the shared `decisions` ledger as D07 with its stable option ID. It changes no persistent learning flag, signal, skill, LC08 answer, reward eligibility or route. The short follow-up is flavor/support copy only. D07 appears after Higgins's demonstration and before LC08: the example first establishes the learning idea, then Eliza chooses how to approach practice.

**Before LC08**

Eliza: “So the sentence changes shape when the important word changes.”

Higgins: “Yes. Listen for the word that carries the meaning.”

LC08 instruction: “Listen to each sentence. Choose the word that carries the strongest part of its meaning. You can replay each recording.” Before a response, all target words and answer controls look neutral and equally prominent. Do not capitalize, bold, colour, underline, badge or otherwise mark the focus word. The demonstration above must not reuse an LC08 sentence.

**After LC08**

Eliza: “I can hear the sentence moving now. It isn't flat.”

Higgins: “Good. Do not force every word. Let the sentence carry you.”

Only the first unaided completion earns the LC08 reward described in STATE_AND_BRANCHING.md. Supported completion remains valid progress without reward or penalty.

**Reflection and transition**

Narration: “A few days later, when she is tired, Eliza will need to find the shape again.” S04 gives her a useful listening strategy; S05 tests it during a frustrating lesson without treating a difficult day as failure.

After LC08 completion, explicit student **Continue** records `ch03_s04_complete` once, adds no skill, and advances to `ch03_s05 – The Bad Day`. Render, replay, audio ending, refresh, D07 selection and Teacher preview cannot complete the scene.
