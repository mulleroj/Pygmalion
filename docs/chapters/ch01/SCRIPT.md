# Chapter I – The Flower Girl

Canonical player-facing script for the Chapter I vertical slice.

- Level: A2+/B1
- Canonical stage: `Flower Girl`
- Scenes: exactly five (`ch01_s01`–`ch01_s05`)
- Canonical Eliza voice: `Eliza - young_cockney` (`124kaYCknTDsnwUFdWl9`, `eleven_v3`)
- All dialogue in this file is newly written for this adaptation, except the approved signature line.
- Teacher notes, answer keys and internal state are not shown in normal play mode.

## ch01_s01 – Under the Portico

### Stage direction and narration

Rain turns the paving stones bright. Under the portico, people wait, hurry, and try not to get wet. Eliza keeps her basket close and watches every possible customer.

**ELIZA:** Flowers, sir? Fresh flowers for a wet day!

**ELIZA:** Come on, don't hide behind the rain. A flower makes a room look kinder.

**ELIZA:** Two flowers for a penny. I'll choose the brighter ones for you.

**PASSER-BY:** Not today, girl. I have no time.

**ELIZA:** Then take one small flower. It won't slow you down.

**PASSER-BY:** You're quick with an answer.

**ELIZA:** I have to be. The rain doesn't wait, and neither do customers.

### Opening tone response

This is a local scene response, not a major decision. No development signal changes and nothing is saved for later.

**PROMPT:** A customer looks away. What does Eliza say?

1. **Bright:** “A flower for your coat, sir? It will make the walk less grey.”
2. **Practical:** “One penny, one flower. You can decide quickly.”
3. **Defensive:** “You looked at them, so do not pretend they are not worth seeing.”

**CONSEQUENCE:** The customer reacts to the chosen tone, but Eliza remains in control of her pitch. The local trace `opening_tone` is recorded only for scene flavour.

### Transition

Freddy hurries under the portico. The crowd shifts. Eliza lifts her basket—and a shoulder catches it.

`ch01_s01 → ch01_s02`

## ch01_s02 – The Fallen Flowers

### Stage direction and narration

Freddy stops too late. Flowers fall across the wet stones. A few petals stick to the mud. Eliza moves first: she protects the flowers, then looks up at him.

**FREDDY:** Oh! I'm sorry. I didn't see the basket.

**ELIZA:** The rain won't pick them up for me.

**FREDDY:** I can pay for the damaged ones.

**ELIZA:** Then look before you move next time.

### D01 – Eliza’s response

**PROMPT:** Freddy is waiting. Choose Eliza’s next reply.

1. `d01_ask_help` — **Ask for help:** “Could you help me gather them? The clean ones go in the basket.”
2. `d01_name_damage` — **Name the damage:** “You knocked them down. Look at the stems. I can't sell them like this.”
3. `d01_accept_and_work` — **Accept the apology and return to work:** “All right. You're sorry. I'll pick them up and get back to work.”

No option is correct or best. Each is a plausible Eliza response under pressure.

### Immediate consequence

- `d01_ask_help`: Freddy kneels and helps sort the flowers. Eliza keeps the exchange focused on repair.
- `d01_name_damage`: Freddy looks at the broken stems and offers payment. Eliza makes the cost visible before she moves on.
- `d01_accept_and_work`: Freddy steps aside while Eliza restores the basket. She protects the next sale by ending the delay quickly.

The local value `freddy_first_impression` is set to `asks_for_repair`, `direct_boundary`, or `practical_recovery`. The selected event may be applied once only.

### LC01 – Apology, excuse, intention

**STORY CONTEXT:** Freddy is trying to explain what happened. Eliza needs to hear whether he is taking responsibility and what he plans to do.

**PROMPT:** Listen to each short line. Choose the speaker’s main intention: `apology`, `excuse`, or `intention to repair`.

**LC01-AUDIO-01**

> “I'm sorry. I wasn't looking where I was going.”

**Answer:** `apology`

**LC01-AUDIO-02**

> “It was the rain. Anyone could've slipped.”

**Answer:** `excuse`

**LC01-AUDIO-03**

> “I'll pick these up and pay for the damaged ones.”

**Answer:** `intention to repair`

**FEEDBACK – success:** You listened for the purpose of each line. An apology accepts responsibility; an excuse gives a reason without necessarily accepting responsibility; an intention to repair points to an action.

**FEEDBACK – retry:** Listen again and ask: Is the speaker accepting responsibility, explaining the situation, or promising an action? The word *sorry* alone does not tell you everything.

**REPLAY / TRANSCRIPT CUE:** `Replay LC01` replays one item at a time and keeps its transcript visible. Replay does not change any state or add a development signal.

### Transition

The last clean flowers are back in the basket. A man nearby has not been watching the flowers. He has been writing.

`ch01_s02 → ch01_s03`

## ch01_s03 – The Notebook

### Stage direction and narration

Higgins closes his notebook halfway, as if that makes the watching less obvious. It does not. Eliza sees the pencil, the wet page, and the line of marks beside her words.

**HIGGINS:** Your speech carries a local pattern. I can hear where a person has learned to live.

**ELIZA:** Can you hear when someone's trying to sell flowers in the rain?

**HIGGINS:** I can hear several things at once. It's interesting.

**ELIZA:** I'm not a pattern on your page.

**HIGGINS:** No. But your voice tells me something. That's why I wrote it down.

**ELIZA:** I ain't done nothing wrong. I'm a good girl, I am.

The line is an emotional defence, not a pronunciation model. Eliza is demanding to be treated as a person while others discuss her speech.

**FREDDY:** Sir, perhaps you could ask before you write.

**HIGGINS:** Perhaps I could. That's fair. I'm Henry Higgins.

Pickering arrives beneath the portico.

**PICKERING:** Good evening. I'm Pickering. What are you writing?

**HIGGINS:** I'm studying how people speak across the city.

**PICKERING:** Have you asked her?

### D02 – Eliza’s response to observation

**PROMPT:** Higgins has written about your speech without asking. What does Eliza do?

1. `d02_direct_question` — **Ask directly:** “Why are you writing down the way I speak?”
2. `d02_request_explanation` — **Request an explanation:** “What are you trying to learn from me? Tell me plainly.”
3. `d02_reject_and_return` — **Reject the observation:** “Write what you like. I have flowers to sell, and I am going back to them.”

No option is correct or best. Each protects a different immediate need: a direct answer, a clear explanation, or control of Eliza’s time.

### Immediate consequence

- `d02_direct_question`: Higgins answers the question and admits that his notes are not permission. `higgins_first_impression` becomes `challenged_directly`; `Confidence +1` once.
- `d02_request_explanation`: Higgins explains that he is comparing speech patterns, while Pickering asks him to explain without turning Eliza into an object. `higgins_first_impression` becomes `seeks_accountability`; no development signal changes.
- `d02_reject_and_return`: Eliza turns back to her basket. Higgins stops writing for the moment. `higgins_first_impression` becomes `refused_objectification`; `Independence +1` once.

### Replay / transcript cue

`Replay D02 dialogue` replays the selected exchange with the transcript visible. Replay is read-only and cannot apply the D02 event again.

### Transition

The rain makes a soft wall around the portico. Higgins looks at the notebook. Pickering looks at the people.

`ch01_s03 → ch01_s04`

## ch01_s04 – Higgins' Ear

### Stage direction and narration

Higgins turns the notebook so Pickering can see it. Three brief voices rise above the rain. The task is not to rank the speakers. It is to hear what each person is trying to do in a particular situation.

**HIGGINS:** Listen to who is speaking, where they are, and what they want. A voice gives clues, but it doesn't tell you everything.

**PICKERING:** And the clues can be wrong.

**HIGGINS:** Yes. Context matters. So does asking.

### LC02 – First Higgins' Ear listening challenge

**PROMPT:** Listen to each sample. Choose the best description of the situation and intention. Do not choose an answer about intelligence or a “correct” accent.

#### Sample 1 – `lc02_sample_01`

> “Could you wait by the door, please? I need both hands.”

**OPTIONS:**

1. `lc02_s01_worker_request` — A worker asks someone nearby to wait while she carries something.
2. `lc02_s01_formal_question` — A speaker asks a stranger whether a meeting has started.
3. `lc02_s01_urgent_command` — A market worker orders a stranger to move away.

**IMPLEMENTATION ANSWER KEY (not shown in play mode):** `lc02_s01_worker_request`

**FEEDBACK – correct:** Good. The speaker makes a polite request because both hands are busy.

**FEEDBACK – retry:** Listen for the action. Is the speaker asking someone to wait, asking for information, or ordering someone away?

#### Sample 2 – `lc02_sample_02`

> “Oi, Sam, hold the cart! I'm coming through.”

**OPTIONS:**

1. `lc02_s02_formal_information` — A speaker politely asks a stranger about a meeting.
2. `lc02_s02_familiar_instruction` — A familiar co-worker gives a quick instruction in a busy market.
3. `lc02_s02_apology_repair` — A speaker apologises to a customer and offers to pay.

**IMPLEMENTATION ANSWER KEY (not shown in play mode):** `lc02_s02_familiar_instruction`

**FEEDBACK – correct:** Good. The name, short command, and busy market point to a familiar working relationship.

**FEEDBACK – retry:** Listen for the relationship and the place. Is this a formal question, a familiar market instruction, or an apology?

#### Sample 3 – `lc02_sample_03`

> “Good evening. May I ask whether the meeting has started?”

**OPTIONS:**

1. `lc02_s03_familiar_instruction` — A friend gives an urgent instruction beside a market cart.
2. `lc02_s03_worker_request` — A worker asks someone to wait while she carries something.
3. `lc02_s03_formal_question` — A speaker politely asks an unfamiliar person for information.

**IMPLEMENTATION ANSWER KEY (not shown in play mode):** `lc02_s03_formal_question`

**FEEDBACK – correct:** Good. The greeting and *May I ask…?* make this a polite request for information.

**FEEDBACK – retry:** Listen for the purpose. Is the speaker giving an urgent instruction, asking for help with a task, or asking for information?

**FEEDBACK – success:** You used context, relationship, formality, and intention. You did not turn a speech pattern into a judgement about the speaker.

**FEEDBACK – retry:** Replay the sample and read the transcript. Look for who is speaking to whom, where they are, and what action the speaker wants.

**REPLAY / TRANSCRIPT CUE:** Each sample has its own replay control and visible transcript. Replay and retry do not change any development signal.

### Immediate consequence

If the player identifies the intended situation in all three samples, LC02 stores completion metadata and `ear_test_intro_seen = true`. A wrong answer has no morality penalty and no development-signal change.

**PICKERING:** What do you think, Eliza?

**ELIZA:** I think people hear what they expect to hear.

**HIGGINS:** Perhaps. That's worth writing down.

### Transition

The rain thins. Across the street, warm light appears in a flower-shop window.

`ch01_s04 → ch01_s05`

## ch01_s05 – A Window of Possibility

### Stage direction and narration

The rain has softened to a mist. Eliza stands before a flower-shop window. Inside, the flowers are arranged for people who have time to choose. She studies the door, the counter, and the language written on the small sign.

**ELIZA:** Look at that window. The flowers aren't hiding from anyone.

**ELIZA:** People hear the way I speak before they see what I can do.

**ELIZA:** Maybe speaking another way could open a door. It wouldn't make me worth more. It would give me another way to be heard.

**FREDDY:** What would you do if the door opened?

**ELIZA:** I'd decide for myself what to say when I walked through it.

### D03 – Origin motivation

**PROMPT:** Why does Eliza want more ways to speak? Choose the motivation that feels true at the end of Chapter I.

1. `opportunity` — **Opportunity:** “I want to speak in a way that can lead to better work and more chances.”
2. `respect` — **Respect:** “I want people to listen to me before they decide what I am.”
3. `learning` — **Learning:** “I want to learn how people speak and choose what I use.”
4. `independence` — **Independence:** “I want more ways to speak so no one else can choose my future for me.”

No motivation is correct, best, or more mature than another. Changing motivation later is also allowed; this choice records the starting point of Eliza’s journey.

### Immediate consequence

Save `origin_motivation` with exactly one of: `opportunity`, `respect`, `learning`, `independence`. Do not add an automatic development-signal ranking.

### Chapter-end text

**ELIZA:** Tomorrow, I'll find the door myself. If they want to teach me, they'll have to hear what I'm asking for.

**NARRATION:** The flower-shop lights stay on as Covent Garden grows dark. Eliza leaves the window with a plan—and a question about the price of being heard.

**CHAPTER I END / HOOK:** In Chapter II, Eliza will go and ask for lessons. She will have to say what she wants and set her own terms.

`ch01_s05 → ch02_s01`

## Chapter I content checks

- Canonical scenes: exactly 5.
- Major decisions: `D01`, `D02`, `D03`.
- Language challenges: `LC01`, `LC02`.
- Signature line preserved exactly: `I ain't done nothing wrong. I'm a good girl, I am.`
- Player-facing English is short, contextual, and intended for A2+/B1.
- No choice is presented as a moral or intelligence ranking.
- Every challenge has replay and visible transcript support.
- No engine, UI, HTML, CSS, JavaScript, TypeScript, image, audio, or deploy configuration is created here.
