# Chapter III Script — The Lessons

Status: S01 PRE-PRODUCTION CONTENT LOCK FOR HUMAN REVIEW. No Chapter III runtime or assets exist as a result of this document. This S01 specification implements the user's documentation brief; later scenes retain only the approved scene-map intent.

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

Canonical placeholders only; see [SCENE_MAP.md](../../SCENE_MAP.md): ch03_s02 The Listening Room (LC06, minimal pairs); ch03_s03 Finding the Main Stress (LC07, word stress); ch03_s04 A Sentence Has Shape (D07, LC08, sentence stress/intonation); ch03_s05 The Bad Day (LC09, supportive feedback); ch03_s06 A Small Victory (LC10, real-interaction transfer) → ch04_s01. No final later-scene dialogue, samples, event IDs or asset lock is added.
