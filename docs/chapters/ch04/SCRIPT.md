# Chapter IV — The First Test

Status: `CH04 S01 and S02 canon locked and implemented; S03 story and interaction specification locked in pre-production; S03 runtime and assets not implemented or produced`.

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

LC11 has three samples, presented one at a time. For each, classify the conversational function as opening, continuing or closing. The stable sample IDs, answer IDs and key are specified in `STATE_AND_BRANCHING.md`. Do not display sample transcript before that sample's first attempt. After a first attempt, learners may explicitly request replay or transcript/support; support carries no penalty. Replay remains available. Each correct sample is retained; an incorrect response can be tried again. No score or development signal is awarded by the challenge.

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
