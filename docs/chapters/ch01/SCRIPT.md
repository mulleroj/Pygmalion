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

**ELIZA:** Come on, do not hide behind the rain. A flower makes a room look kinder.

**ELIZA:** Two flowers for a penny. I will choose the brighter ones for you.

**PASSER-BY:** Not today, girl. I have no time.

**ELIZA:** Then take one small flower. It will not slow you down.

**PASSER-BY:** You are quick with an answer.

**ELIZA:** I have to be. The rain does not wait, and neither do customers.

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

**FREDDY:** Oh! I am sorry. I did not see the basket.

**ELIZA:** The rain is not going to pick them up for me.

**FREDDY:** I can pay for the damaged ones.

**ELIZA:** Then look before you move next time.

### D01 – Eliza’s response

**PROMPT:** Freddy is waiting. Choose Eliza’s next reply.

1. `d01_ask_help` — **Ask for help:** “Could you help me gather them, please? The clean ones go in the basket.”
2. `d01_name_damage` — **Name the damage:** “You knocked them down. Look at the stems. I cannot sell them like this.”
3. `d01_accept_and_work` — **Accept the apology and return to work:** “All right. You are sorry. I will pick them up and get back to work.”

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

> “I am sorry. I was not looking where I was going.”

**Answer:** `apology`

**LC01-AUDIO-02**

> “It was the rain. Anyone could have slipped.”

**Answer:** `excuse`

**LC01-AUDIO-03**

> “I will pick these up and pay for the damaged ones.”

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

**ELIZA:** Can you hear when a person is trying to sell flowers in the rain?

**HIGGINS:** I can hear several things at once. The pattern is interesting.

**ELIZA:** I am not a pattern on your page.

**HIGGINS:** No. You are a speaker. That is why the example is useful.

**ELIZA:** I ain't done nothing wrong. I'm a good girl, I am.

The line is an emotional defence, not a pronunciation model. Eliza is demanding to be treated as a person while others discuss her speech.

**FREDDY:** Mr Higgins, perhaps you could ask before you write.

**HIGGINS:** Perhaps I could. That is a fair point.

Pickering arrives beneath the portico.

**PICKERING:** Good evening. I heard a voice worth listening to, not merely a sound to classify.

**HIGGINS:** I am studying how speech travels through a city.

**PICKERING:** Then study the speaker as well.

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

**HIGGINS:** Listen for relationship, place, and purpose. A voice gives clues. It does not give a complete truth about a person.

**PICKERING:** And the clues can be wrong.

**HIGGINS:** Yes. Context matters. So does asking.

### LC02 – First Higgins' Ear listening challenge

**PROMPT:** Listen to each sample. Choose the best description of the situation and intention. Do not choose an answer about intelligence or a “correct” accent.

#### Sample 1 – `lc02_sample_01`

> “Could you wait by the door, please? I need both hands.”

**Best answer:** A worker is making a polite request to someone nearby during a busy task. The intention is cooperation, not authority.

**Why:** *Could you… please?* signals a polite request. The context explains why waiting is useful.

**Teacher Mode note:** A polite form suggests a chosen register in this moment. It does not prove that the speaker is kinder, smarter, or higher in status.

#### Sample 2 – `lc02_sample_02`

> “Oi, Sam, hold the cart! I am coming through.”

**Best answer:** A familiar speaker gives an urgent informal instruction to a colleague or friend in a busy market.

**Why:** The name, short command, and urgency point to a familiar relationship and a practical need.

**Teacher Mode note:** Informal wording can be efficient and cooperative. It is not evidence of low ability or low intelligence.

#### Sample 3 – `lc02_sample_03`

> “Good evening. May I ask whether the meeting has started?”

**Best answer:** A speaker addresses an unfamiliar person or a formal setting and politely asks for information.

**Why:** The greeting and *May I ask…?* create a more formal register. The purpose is information, not performance.

**Teacher Mode note:** Formality depends on audience, setting, relationship, and purpose. Accent and dialect remain different concepts from register.

**FEEDBACK – success:** You used context, relationship, and intention. You did not turn a speech pattern into a judgement about the speaker.

**FEEDBACK – retry:** Replay the sample and read the transcript. Look for who is speaking to whom, where they are, and what action the speaker wants.

**REPLAY / TRANSCRIPT CUE:** Each sample has its own replay control and visible transcript. Replay never adds `Pronunciation` again.

### Immediate consequence

If the player identifies the intended situation in all three samples, `Pronunciation +1` is recorded once as an attention/listening signal. A wrong answer has no morality penalty and no negative development change.

**PICKERING:** You can hear a pattern and still ask a question.

**HIGGINS:** That may be the more useful skill.

### Transition

The rain thins. Across the street, warm light appears in a flower-shop window.

`ch01_s04 → ch01_s05`

## ch01_s05 – A Window of Possibility

### Stage direction and narration

The rain has softened to a mist. Eliza stands before a flower-shop window. Inside, the flowers are arranged for people who have time to choose. She studies the door, the counter, and the language written on the small sign.

**ELIZA:** Look at that window. The flowers are not hiding from anyone.

**ELIZA:** People hear the way I speak before they see what I can do.

**ELIZA:** Maybe another register could open a door. It would not make me worth more. It would give me another way to be heard.

**FREDDY:** What would you do if the door opened?

**ELIZA:** I would decide for myself what to say when I walked through it.

### D03 – Origin motivation

**PROMPT:** Why does Eliza want more ways to speak? Choose the motivation that feels true at the end of Chapter I.

1. `opportunity` — **Opportunity:** “I want language that helps me reach better work and more chances.”
2. `respect` — **Respect:** “I want people to listen to me before they decide what I am.”
3. `learning` — **Learning:** “I want to learn how speech works and choose what I use.”
4. `independence` — **Independence:** “I want more ways to speak so no one else can choose my future for me.”

No motivation is correct, best, or more mature than another. Changing motivation later is also allowed; this choice records the starting point of Eliza’s journey.

### Immediate consequence

Save `origin_motivation` with exactly one of: `opportunity`, `respect`, `learning`, `independence`. Do not add an automatic development-signal ranking.

### Chapter-end text

**ELIZA:** Tomorrow, I will find the door myself. If they want to teach me, they will have to hear what I am asking for.

**NARRATION:** The flower-shop lights stay on as Covent Garden grows dark. Eliza leaves the window with a plan—and a question about the price of being heard.

**CHAPTER I END / HOOK:** In Chapter II, Eliza will choose whether to seek lessons, what she will ask for, and what conditions she will accept.

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
