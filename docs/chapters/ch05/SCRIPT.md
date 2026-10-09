# Chapter V Script — The Reception

Status: content locked for planning; documentation only. Runtime, audio and artwork are not implemented by this lock. Chapter V continues from the explicit Chapter IV boundary and ends at Chapter VI.

## Shared direction

This is a public event Eliza takes part in through her own work with the flower growers. It is not an examination of whether she can imitate a social class. Her learned registers are tools she chooses; none is a better identity. Keep the language concise and approximately B1. No player-facing choice receives moral praise or blame.

The chapter contains five scenes. The hall is reused for S01–S03. S04 is one quiet side room for every branch. S05 is outside on the hall steps. All branches remain convergent and Chapter VI remains unresolved.

## S01 — The Borough Exhibition Evening

**Location:** Lambeth Public Rooms, main exhibition hall.

**Narration:** Warm lamps light the exhibition hall. Flower growers stand beside their displays. Eliza has a place in the programme, and the organiser comes to speak with her.

**Organiser:** “Miss Doolittle, the growers are ready. Would you like to begin?”

**Narration:** Eliza looks at the organiser, a patron near the display, and one of the flower workers. She considers how she wants to speak with each person.

### D10 — Reception Register Plan

Prompt: **How would you like to begin with the people here?**

The three options and their exact text are in STATE_AND_BRANCHING.md. All are equally valid. The choice records a strategy only; it does not change the reception outcome or award a signal.

**Eliza:** “Yes. And please introduce them by name. The work is theirs.”

**Higgins:** “Keep it simple. Speak as we practised.”

**Eliza:** “I shall speak as the room requires.”

**Pickering:** “The growers have done careful work.”

**Narration:** The organiser turns towards the guests. Eliza has not been introduced as anyone's experiment. The room begins to fill, and several conversations start at once.

**Transition:** Explicit Continue after D10 is saved; proceed to S02.

## S02 — Listening Under Pressure

**Location:** the same exhibition hall, now busier.

**Narration:** A few conversations overlap near the flower tables. Eliza can hear a request from the organiser, a question from a guest, and a practical question from a fellow worker. The words and the situation both matter.

### LC13 — Social Inference

Play three short samples one at a time. The exact spoken lines are:

1. **Organiser:** “Miss Doolittle, could you introduce the growers when the chairman arrives?”
2. **Patron / guest:** “A remarkable display. Which of these varieties are grown locally?”
3. **Flower-worker colleague:** “Eliza, have you seen the labels for our table?”

For each sample, the learner matches the speaker relationship, purpose and suitable level of formality. The transcript and context support follow each sample's first attempt; replay remains available. See STATE_AND_BRANCHING.md and TEACHER_CONTENT.md for the complete interaction and key.

**Narration:** When she is ready, Eliza chooses whose request to answer first.

### Local first-response choice

Prompt: **Who should Eliza answer first?**

- The organiser — “Of course. I can introduce them when he arrives.”
- The guest — “The growers can tell you which varieties are local.”
- Her colleague — “I will look with you.”

This is a temporary scene choice. It is not saved, has no answer key, signal, reward or later branch. Each response returns to the same scene.

**Eliza, optional common story voice:** “I will listen, then choose who needs an answer first.”

**Narration:** The short exchanges continue. Eliza follows the meaning and the person, not a rule that one accent carries more authority.

**Transition:** Explicit Continue after LC13 is complete; proceed to S03. The local first-response choice is not a gate.

## S03 — The Display and the Question

**Location:** the main flower display.

**Narration:** The guests have enjoyed the exhibition. One visitor turns to Higgins and Pickering while Eliza stands beside the growers' work.

**Patron / guest:** “Professor Higgins, Colonel Pickering — you must be proud. What a transformation.”

**Higgins:** “The result speaks for the method.”

**Pickering:** “Eliza has worked very hard.”

**Patron / guest:** “It was a remarkable evening for you both.”

**Narration:** Pickering gives Eliza credit for her work, but the conversation continues to focus on the two men. Eliza knows what she contributed and decides how she wants to answer.

**Eliza, optional common story voice:** “I know what I contributed.”

### D11 — Credit Response

Prompt: **How would Eliza like to respond?**

The three text-only responses are listed in STATE_AND_BRANCHING.md. They are all legitimate strategies. They do not award signals or change the worth of the player's choice.

**Transition:** Explicit Continue after D11 is saved; proceed to S04. The response determines the S04 companion and dialogue variant, and is retained as read-only Chapter VI context.

## S04 — What Happens to Me Now?

**Location:** one quiet side room off the exhibition hall. The hall remains faintly audible beyond the door. No balcony variant is used.

The companion is derived from the saved D11 choice; no separate companion field is written:

- D11 private conversation → Pickering.
- Either other D11 response → Mrs Pearce.

### Pickering variant

**Pickering:** “You wanted to speak privately.”

**Eliza:** “Yes. I know what I can do now. I don't know what happens to me next.”

**Pickering:** “That should not be decided without you. I have sometimes spoken about your work instead of asking what you wanted.”

**Eliza:** “I need to decide what I want to ask.”
**Pickering:** “There are several possibilities. Some will depend on money and introductions.”

### Mrs Pearce variant

**Mrs Pearce:** “You've gone quiet.”

**Eliza:** “I am thinking about tomorrow.”

**Mrs Pearce:** “Then tomorrow is worth planning. Start with what you want, not with what they expect.”

**Eliza:** “I need a little time to put it in order.”
**Mrs Pearce:** “Work is one matter. Where you'll live is another.”

Mrs Pearce stays practical. Pickering is honest but imperfect. Neither character answers Eliza's life question for her.

### Future question style

Prompt: **How would Eliza like to put her question?** These are personal expression choices, not scored decisions. The exact selectable lines are:

| Stable value | Visible line |
| --- | --- |
| direct | “What happens to me when this is over?” |
| indirect | “Have you thought about what I might do when this is over?” |
| plan_focused | “If I want work of my own after this, what should I arrange first?” |

### LC14 — Questioning for Purpose

The challenge uses the companion-specific context and checks whether a question asks for the information needed now. It does not evaluate the future-question style choice.

- **Pickering context:** “There are several possibilities. Some will depend on money and introductions.”
- **Mrs Pearce context:** “Work is one matter. Where you'll live is another.”

Use the branch-specific answer sets and key in STATE_AND_BRANCHING.md. Many phrasings can work in real life; the key identifies a contextual fit in this scene.

**Transition:** Explicit Continue after a future-question style is saved and LC14 is complete; proceed to S05.

## S05 — Leaving the Hall

**Location:** the front steps of Lambeth Public Rooms at night.

**Narration:** The hall becomes quieter behind Eliza. The evening has gone well, but it has not decided what she should do next.

**Higgins:** “Well, Eliza? Are you coming?”

Eliza does not automatically follow him.

**Eliza:** “I know enough now to ask what comes next.”

### Next contact

Prompt: **Whom would Eliza like to contact first after tonight?** The three text-only options are in STATE_AND_BRANCHING.md. They shape Chapter VI entry context only; every ending remains available.

**Transition:** Explicit Continue after a contact is saved records Chapter V completion, applies the one unconditional Independence increment, and moves to ch06_s01. The scene does not resolve Eliza's future.
