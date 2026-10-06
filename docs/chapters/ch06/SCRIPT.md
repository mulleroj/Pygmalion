# Chapter VI Script — Her Own Voice

Status: human-reviewed story canon, locked for future S01 implementation. Documentation only. All dialogue and scenes below are original project material. The chapter concludes Eliza's agency arc: learning new linguistic tools expands her repertoire; it does not replace her identity. Cockney is not a lesser self, cultivated speech is not a superior self, and Higgins does not own the result.

The five-scene arc is quiet and convergent until D12. The learner selects one of three equally legitimate personal directions in S03, completes an objective contextual listening challenge in that same scene, chooses a rhetorical shape in S04, and sees a descriptive closure and summary in S05. No prior answer or signal gates a direction. Only explicit Continue advances a scene.

## S01 — The Morning After

**Location:** one morning room adjoining Higgins's workroom at Wimpole Street. A table holds letters, notes and invitations. Keep the room quiet and the camera at Eliza's level; she is reviewing possibilities, not waiting to be assigned a future.

**Narration:** Morning light reaches the papers on the table. One letter asks Eliza to speak at a public meeting. Another offers paid work. A note asks whether she might help a group of flower growers plan a small evening class. Eliza sets the letters side by side.

**Eliza:** “Three different invitations. None of them tells me what I must do.”

The first conversation follows `next_contact`; absent or unknown values use the neutral shared opening and do not block progress.

### Higgins first (`next_contact = higgins_directly`)

**Higgins:** “The public invitation would show what the lessons can achieve.”
**Eliza:** “The lessons gave me tools. I shall decide what I use them for.”
**Higgins:** “Quite. The next experiment is yours, then.”

### Pickering first (`next_contact = pickering_first`)

**Pickering:** “I thought the public invitation might interest you. But I should ask: what interests you?”
**Eliza:** “Thank you for asking. I want to consider all three before I answer.”
**Pickering:** “You should have had that question sooner.”

### Mrs Pearce first (`next_contact = mrs_pearce_first`)

**Mrs Pearce:** “Before you answer any invitation, ask about the pay, the hours and where you would stay.”
**Eliza:** “I mean to. And I shall decide which questions matter to me.”
**Mrs Pearce:** “Good. Your wishes belong on the list too.”

### Convergent close

**Narration:** The first conversation ends without choosing for Eliza. Public work, paid independence and shared work with the growers remain on the table. The letters offer different conditions, not different measures of her worth.

**Eliza:** “I know what is possible. I need to decide what I want.”

Historical wording may lightly echo `origin_motivation`, motivation history, `credit_response` or `future_question_style`. Do not recap multiple past choices or imply that the first contact gave better advice. No decision or challenge occurs. **Continue → S02.**

## S02 — The Question in the Mirror

**Location:** a quiet private dressing space with a plain mirror and a small table. The mirror is for self-recognition, not beauty or becoming a “lady.” A letter or small object may recall an earlier scene without explaining the whole story.

**Narration:** Eliza stands before the mirror. For a moment she remembers the quick voice she used at the flower stall, the careful phrases she practised, and the voice she chose at the exhibition. Each belonged to a moment in her life.

**Eliza:** “I learned another way to speak. I did not lose the first.”

Offer an optional, read-only replay shelf with up to three relevant moments selected from available history: the initial motivation, a learning strategy or recovery moment, and one Chapter V reception or credit moment. Do not show an exhaustive timeline. If history is missing, omit that replay; never block or fabricate it. Transcript and text are available alongside every replay. Replay cannot alter saved choices or signals.

**Eliza:** “A voice can change with the room. The person choosing it is still me.”

No decision, listening challenge or reward. **Continue → S03.**

## S03 — Three Ways Forward

**Location:** the same morning room and table, now with the three invitations visible. No route is framed as an ending label or a test result before the choice. Eliza introduces the possibilities in her own words.

**Eliza:** “I could take my place in public work. I could build a life with work and decisions of my own. Or I could carry what I have learned between the people and places that matter to me.”

### D12 — exact learner-facing choice

Prompt: **“Which possibility would you like Eliza to follow?”** The option IDs are stable and the exact text is:

| Stable option ID | Stored `chapter6_direction` | Exact learner-facing text |
|---|---|---|
| `d12_social_success` | `social_success` | “I want to take an active place in public life and use my new skills on my own terms.” |
| `d12_independent_voice` | `independent_voice` | “I want to build a life with work, money and decisions that are my own.” |
| `d12_integrated_identity` | `integrated_identity` | “I want to keep more than one way of speaking and move between the worlds I choose.” |

No option has an answer key, signal effect, reward, rank or prerequisite. The first committed value is durable; revisiting D12 displays the saved selection and cannot silently overwrite it. A deliberate future reset, if ever designed, needs an explicit separate product contract. Previous history may alter one short reflection line only; all three choices remain present and equally clear.

**Eliza after selection:** “That is the direction I choose. It does not have to explain every part of me.”

Continue to LC15 after a saved D12 choice. If the challenge is already complete on revisit, show its completion state and preserve answers. D12 selection itself has no reward.

### LC15 — Pragmatic fit: same intention, three contexts

**Purpose:** identify the likely addressee and communicative purpose from situational and linguistic cues. The underlying intention across all samples is to get help moving a plan for the flower growers forward. Samples use original lines and distinct delivery/context; none is a test of which identity Eliza should choose.

Instructions: **“Listen to each short message. Who is Eliza speaking to, and what does she want to do?”** For each sample select one of three context cards. The correct inference is about the situation; no accent or formality is ranked.

**Sample 1 — public meeting. Eliza:** “Chair, may I explain how our growers could organise the market list?” Delivery: measured, projected, with a direct form of address. **Correct:** `lc15_public_organiser` — “A meeting organiser; she wants permission to present a proposal to the group.”

**Sample 2 — familiar colleague. Eliza:** “Mina, could we sort the market list together after lunch?” Delivery: familiar name, collaborative “we,” practical timing. **Correct:** `lc15_familiar_colleague` — “A colleague she knows; she wants to arrange a shared practical task.”

**Sample 3 — private conversation. Eliza:** “Mrs Pearce, could I speak with you alone about the growers’ market plan and how I might begin?” Delivery: named trusted addressee and private request for advice. **Correct:** `lc15_private_adviser` — “A trusted adviser; she wants private advice on how to begin.”

Use these same three answer options for every item. Distractors are plausible context mismatches, not worse speech:

| Stable answer ID | Option text |
|---|---|
| `lc15_public_organiser` | “A meeting organiser; she wants permission to present a proposal to the group.” |
| `lc15_familiar_colleague` | “A colleague she knows; she wants to arrange a shared practical task.” |
| `lc15_private_adviser` | “A trusted adviser; she wants private advice on how to begin.” |

| Stable item ID | Correct answer |
|---|---|
| `lc15_sample_public` | `lc15_public_organiser` |
| `lc15_sample_colleague` | `lc15_familiar_colleague` |
| `lc15_sample_private` | `lc15_private_adviser` |

On an incorrect answer, give neutral feedback that names a missed clue (address term and group-facing proposal; first name, “we” and “after lunch”; or the private request for advice about the growers’ plan), allow replay or the equivalent text alternative, and let the learner retry without limit or penalty. Reveal the contextual explanation after a correct answer or a support request. Persist each answer by item ID; completed items remain correct. Complete LC15 when all three are correct. It grants no `Pronunciation`, `Confidence` or `Independence` change.

**Accessible no-audio alternative:** for each sample provide a “Read the situation clues instead” panel with contextual evidence, paraphrased rather than transcribed: (1) “The chair has opened the floor. Eliza is standing where the group can hear her and refers to an idea she could explain.”; (2) “Eliza and another person are sorting the growers' papers. She uses the person's first name, speaks about doing it together and mentions a time.”; (3) “The room is quiet and only Eliza and Mrs Pearce are present. Eliza asks for a private moment and says she would like guidance on a first step.” These are contextual evidence, not answer labels or transcripts. The learner still selects among the three context cards. Using the panel carries no penalty. Standard transcript remains available after the item is solved or when it no longer reveals a pending answer.

After D12 is saved and LC15 is complete, **explicit Continue → S04**.

## S04 — Her Own Statement

**Location:** one simple statement space shaped by the chosen direction: the public meeting room, Eliza's modest work space, or a shared community room connecting her worlds. Keep the composition focused on Eliza; any companion listens without evaluating her.

**Narration:** Eliza looks at the words she might use. The direction is already hers. Now she chooses how to say it.

### Rhetorical shape — exact learner-facing choices

Prompt: **“How would you like Eliza to express her choice?”**

| Stable option ID | Stored `final_statement_shape` | Exact learner-facing text |
|---|---|---|
| `final_statement_declaration` | `declaration` | “Say clearly what I choose.” |
| `final_statement_reflection` | `reflection` | “Reflect on what I have learned about myself.” |
| `final_statement_commitment` | `commitment` | “Name what I will do next.” |

These are rhetorical preferences, not another ending decision. Each shape is combined with the saved `chapter6_direction` as brief on-screen text. The nine combinations can be assembled from a small set of text clauses. No shape is “stronger,” more confident or more correct.

**Direction text clauses:**

- `social_success`: “I choose to take an active place in public work, using the skills I have learned on my own terms.”
- `independent_voice`: “I choose to build a life with work and decisions that I can call my own.”
- `integrated_identity`: “I choose to carry my different ways of speaking with me, and use each by choice.”

**Shape lead-ins** (shown as text before the direction clause):

- `declaration`: “This is what I choose.”
- `reflection`: “I have learned that…”
- `commitment`: “My next step is…”

Store `final_statement_shape` once as `ch06_final_statement_shape_recorded`. Rendering the composed statement has no state effect. Only after the player explicitly confirms/delivers the displayed statement, record the stable event `ch06_final_statement_delivered` in the existing applied-event ledger and grant `Confidence +1` once under that event guard, then allow Continue toward S05. Delivery grants the same reward for all three shapes and all prior history. Render, replay, reload, Teacher Mode, Back/Forward and viewport changes do not award it. Changing view or continuing after the delivery event cannot repeat the reward.

The shared final Eliza line occurs in S05 after the branch presentations converge. It is identical for all three directions; see AUDIO_PLAN for the single reusable take.

No new challenge. Once delivery is recorded, **explicit Continue → S05.**

## S05 — The Voice She Chooses

S05 is reflective closure, not a challenge or another decision. Present the saved direction with its branch-specific story text, then converge all three directions on the canonical shared final Eliza line, followed by the descriptive summary.

### PUBLIC PARTICIPATION (`social_success`)

**Environment:** modest public, professional or community room. Eliza is an active participant: she introduces a speaker, organises a discussion or negotiates a practical proposal. The room responds to her contribution, not to a performance owned by Higgins. Her chosen register fits the audience without implying assimilation.

### INDEPENDENT VOICE (`independent_voice`)

**Environment:** a modest work space with flowers, a ledger, keys and a letter about paid work or housing. Emphasise income, boundaries, practical choices and self-direction. Work is not a lesser future than public recognition.

### INTEGRATED IDENTITY (`integrated_identity`)

**Environment:** a shared community room or a doorway between adjoining work and meeting spaces. Eliza carries several parts of her life forward deliberately; this is movement between contexts, not a return to poverty. Cultivated speech is not false, and Cockney is not a costume.

### Canonical shared final Eliza line

All three directions converge on the identical final line: “I have more ways to speak, and the choice is mine.” This is the final shared statement of the project. It never varies by direction or ending quality.

### Descriptive summary

Present a prose “My story” summary with five headings, deriving each sentence independently from saved history:

- **Where I started:** `origin_motivation`, with `confirmed_motivation` / `motivation_shift` where available. Describe a change as development, not failure.
- **How I learned:** `practice_preference` and one meaningful earlier learning/recovery choice, if present.
- **How I handled other people:** D08/D09 and Chapter V (`reception_register_plan`, `credit_response`, `future_question_style`, `next_contact`) where present. Avoid listing every answer.
- **What I chose next:** `chapter6_direction`, using Public Participation for `social_success` and descriptive language for the other directions.
- **How I chose to say it:** `final_statement_shape`.

Missing values produce a short neutral sentence or omit that clause; never infer or invent history. `Pronunciation`, `Confidence`, and `Independence` may inform optional qualitative wording such as “I practised adapting my speech,” “I spoke for myself,” or “I made practical choices,” but never appear as numbers, grades, a quality label or a ranking. The current Chapter VI reward (`Confidence +1`) must not make the summary claim a superior ending.

Provide read-only replay links for a small selected set: starting motivation, a learning/recovery moment, Chapter V reception/credit response, and the S04 statement. Replays show available transcript and do not change choices, signals, completion or history. A “Finish” action is explicit and idempotently completes Chapter VI and routes to the final book-complete screen; there is no Chapter VII.

**Teacher Mode:** see `TEACHER_CONTENT.md`; it remains read-only, non-scoring and non-mutating.

Read-only replay explicitly does not rerun rewards, mutate choices, overwrite state, alter `ch06_complete`, or alter the `ch06_final_statement_delivered` event.
