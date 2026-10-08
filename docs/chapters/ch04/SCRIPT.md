# Chapter IV — The First Test

Status: `CH04 S01–S04 canon locked; S04 runtime and human-approved local assets implemented in the Chapter IV vertical slice`.

## S01 — The Invitation

Location: Higgins's study, early evening. Pickering brings Eliza an invitation to a small neighbourhood reading and tea. The invitation offers a future chance to meet people; the gathering itself is not staged in this scene. This is an original adaptation scene, not dialogue from *My Fair Lady*.

### Canonical visible scene

1. **Narration:** The lesson is over. The learning is not.
2. **Pickering:** A card came for you, Miss Doolittle. You are invited to a small reading and tea on Friday.
3. **Eliza:** For me? Will I have to speak in front of everyone?
4. **Pickering:** You may meet a few people. There is no speech planned.
5. **Higgins:** A greeting is enough to begin. We can prepare one.
6. **Eliza:** I can practise it here. But people do not wait like a lesson does.
7. **Higgins:** Then listen first. A conversation is an experiment, too.
8. **Pickering:** And you may take your time. You are going as yourself.
9. **Eliza:** I want to know what they mean, not only how I should answer.
10. **Higgins:** Sensible. We shall prepare the words, not the whole evening.
11. **Eliza:** Should I practise a greeting, think about what I want to say, or listen first?
12. **Narration:** The invitation rests on the desk. Friday is still ahead.
13. **Eliza:** All right. Let me choose where to begin.

### D08 — A way to prepare

- **Prompt:** Where should Eliza begin?
- `d08_practise_greeting` — Practise a simple greeting.
- `d08_plan_message` — Think about what she wants to say.
- `d08_listen_first` — Listen first and observe.

There is no immediate branch-specific flavour/result text. All choices are non-punitive, carry no hidden judgement, and converge on the same S01 continuation. No choice is correct or incorrect, and none changes Pronunciation, Confidence or Independence. The invitation is accepted as the shared story premise; D08 does not determine whether Eliza is socially ready.

### Scene end

After the learner records D08 and explicitly chooses Continue, record `ch04_s01_complete` once and move to `ch04_s02 – Names and Weather`. No challenge, score change, or automatic readiness flag is attached.

## S02 — Names and Weather

Location: a modest Victorian drawing-room prepared for tea, early evening. The room has a tea table and places to sit; it feels distinct from Higgins's study. Pickering attends as a supportive guest. Higgins is not an active speaker. Hostess and Guest are speaker labels, not named new characters. Keep the social pressure mild and the turns brief. All text below is original.

### Canonical story flow

1. **Narration:** A soft murmur fills the drawing-room. The guests have settled near a table set for tea.
2. **Hostess:** You must be Miss Doolittle. I am glad you could come.
3. **Eliza:** Thank you for inviting me. It is a lovely room.
4. **Hostess:** I hope the weather did not make the journey difficult.
5. **Eliza (AM36-01):** It rained on the way here, but today the sky is clearing.
6. **Guest:** Was it a long walk?
7. **Eliza (AM36-02):** It was a short walk. I noticed a little bookshop near the square.
8. **Guest:** Do you often find time to read?
9. **Eliza (AM36-03):** I do. I like hearing how different people tell a story.
10. **Pickering:** Then this evening should offer plenty to listen to.
11. **Guest:** What sort of story would you choose for a reading?

Eliza's weather sentence is an original story line. Its `/eɪ/` sound in “rained”, “way” and “today” is a secondary listening observation, not an LC11 sample. Do not use “rain / Spain / plain” as learner-facing copy or add a rhythmic paraphrase. AM36 visible text and transcript match the spoken line exactly.

### LC11 — Reading the conversational turn

LC11 has three samples, presented one at a time. For each, classify the conversational function as opening, continuing or closing. The stable sample IDs, answer IDs and key are specified in `STATE_AND_BRANCHING.md`. For every sample, learners may explicitly request transcript support before their first attempt; the canonical transcript stays hidden until requested. No guess or playback attempt is required to access support. Support is available with Sound On and Sound Off and has no penalty or reward. Replay remains available. Each correct sample is retained; an incorrect response can be tried again. No score or development signal is awarded by the challenge.

After LC11, the player may choose one of the two equally valid local follow-up replies specified in `STATE_AND_BRANCHING.md`, or continue without choosing. This application choice is optional, does not branch the story, and cannot block Continue.

### Scene end

Once all three LC11 samples are correctly classified, record `ch04_lc11_complete` once and unlock explicit Continue. LC11 completion does not navigate automatically. Continue is available after LC11 whether or not the optional follow-up was chosen; it records `ch04_s02_complete` once and moves to `ch04_s03 – The Wrong Answer`.

## S03 — The Wrong Answer

Location: the same social tea room, among the guests. The scene is a continuation of the conversation; D08 and any optional S02 Confidence increase do not change S03 content or availability.

### Canonical story flow

1. **Guest (AM37):** London seems to have decided we needed more rain.
2. **Eliza (AM37):** I don't think London can decide anything. It is a city, not a person.
3. A brief pause follows, then a restrained social reaction: one or several polite chuckles and a short uncertain murmur. There is no loud mockery.
4. The learner completes LC12, which checks literal and implied meaning separately.
5. After LC12 completion, D09 lets the learner choose Eliza's recovery style. All options are legitimate and converge.

The dialogue is original project adaptation text. Eliza's English is grammatical, and her pronunciation is clean and controlled. She takes a playful personification literally; the mismatch is pragmatic/inferential, not a pronunciation failure, a sign of lower intelligence, or a joke about Cockney. Keep the social discomfort gentle.

### LC12 and D09

LC12 comprehension is separate from D09's personal recovery preference. Its two ordered items, stable answer IDs, answer key, support/replay and completion contract are specified in `STATE_AND_BRANCHING.md`. LC12 does not evaluate which recovery style is socially best. Once both items are correct, record `ch04_lc12_complete` exactly once; this alone does not advance the scene.

After LC12, show D09 with the three options specified in `STATE_AND_BRANCHING.md`. Persist the selected value in `decisions.D09`, record `ch04_d09_recorded` exactly once, and award no development points. D09 does not advance the scene automatically.

### Scene end

Unlock explicit Continue only when both `ch04_lc12_complete` and `ch04_d09_recorded` exist. Continue records `ch04_s03_complete` once and moves to `ch04_s04`. Rendering, replay, refresh, audio completion and Teacher preview never complete or navigate the scene.

## S04 — After the Laughter

Location: the side corridor, several minutes after S03. The tea-room gathering remains behind a closed or partly closed door and is heard only at a distance. S04 is a new acoustic and visual location, not a tea-room hold.

### Canonical story flow

All dialogue below is original project adaptation, not quoted from Shaw or *My Fair Lady*. The scene moves from “What did Eliza misunderstand?” to “Who decides what successful communication means?” Her S03 difficulty was pragmatic inference, not pronunciation. Keep her voice at **Emerging New Speech**: calm and deliberate, with no Cockney relapse, aristocratic imitation or angry climax.

1. **Narrator:** A few minutes later, the corridor is quieter. The voices from the tea room are muffled behind the door.
2. **Pickering:** You spoke clearly, Eliza. The difficulty was not the words.
3. **Mrs Pearce:** People often say one thing and mean something more. That takes time to learn.
4. **Eliza:** Then I must learn the people as well as the language.
5. **Higgins:** Exactly. Tonight is useful because it shows us what still needs work.
6. **Eliza:** It shows you what still needs work.
7. **Higgins:** It is a test, Eliza.
8. **Eliza:** Then I should have a say in what the test is for.
9. The learner selects Eliza's required, non-graded reflection focus: language, audience or feeling. Each option has its exact visible Eliza line in `STATE_AND_BRANCHING.md`; these are selectable written responses, not additional AM39 voice clips. All options converge.

Eliza's final line is a calm agency beat, not a rebellion climax. Higgins is analytical and matter-of-fact, emotionally blind rather than intentionally cruel; his brief appearance does not make him the dominant speaker. Pickering is supportive and nonjudgmental. Mrs Pearce is practical and perceptive, distinguishing words from implied meaning without patronising Eliza. Do not imply that accent signals intelligence or social polish determines personal worth.

### Scene end

Require `ch04_s04_reflection_recorded` before enabling explicit Continue. Continue records `ch04_s04_complete` exactly once and transitions to `ch04_s05`; no automatic transition. There is no challenge, score, development increment or hidden reward. Teacher preview remains read-only.

## S05 — The Walk Home

Status: documentation-only canon lock. `ch04_s05` is the final scene of Chapter IV. Location: a quiet evening street, shortly after S04, on Eliza's walk home. Eliza walks alone; Pickering, Higgins and Mrs Pearce do not appear. There is no farewell scene.

The dialogue below is **ORIGINAL PROJECT ADAPTATION**. It is thematically inspired by Shaw's public-domain *Pygmalion*, is not quoted from Shaw, and uses no wording, lyrics or distinctive treatment from *My Fair Lady*. Visible dialogue equals spoken dialogue 1:1. Do not embellish.

### Canonical story flow

1. **Narrator:** Later, on the walk home, the street is quiet enough for Eliza to hear her own thoughts.
2. **Eliza:** I can speak carefully when I need to.
3. **Eliza:** And I can speak more freely when I choose.
4. **Eliza:** That is not pretending. It is knowing what I can do.
5. Show the compact, read-only D08 memory echo described below, between Eliza 3 and Eliza 4. Its supporting text is not dialogue and has no audio.
6. **Eliza:** Tonight was not a pass or fail.
7. **Eliza:** It showed me what I can practise — and what I can choose.
8. **Eliza:** The choice is mine.
9. Show explicit Continue; record completion and transition as specified in `STATE_AND_BRANCHING.md`.

Eliza's final line is calm, self-aware and settled, not triumphant or confrontational. Her voice remains **Emerging New Speech**: reflective and increasingly self-directed, not aristocratic, exaggerated Cockney or ashamed of spontaneous speech. Careful speech is an available skill, not a superior identity. Preserve `Accent ≠ intelligence`.

### D08 memory echo

Label: **Your first plan**. Read the existing `decisions.D08` option and display exactly one corresponding line: `d08_practise_greeting` → “Practise the greeting first.”; `d08_plan_message` → “Plan what you want to say.”; `d08_listen_first` → “Listen before answering.” Under it show: “That was one useful strategy. Tonight gave Eliza more information to work with.” This support text is not spoken dialogue. The card is display-only; it does not branch dialogue, create state, gate completion, change rewards or require acknowledgement. If D08 is unexpectedly missing, omit the card; do not write fallback state.

S05 has no challenge and no new decision, reflection write or choice event. `reflections.ch04_s04_focus` remains local to S04 and does not affect this scene. The experience is information, not pass/fail, a grade or a verdict on identity or intelligence.
