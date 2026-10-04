const STUDY = './assets/images/locations/ch02/ch02_higgins-study.webp';

const cutout = (src, alt, placement) => ({ src, alt, placement });

export const CH04_SCENE_01 = {
  id: 'ch04_s01',
  number: 1,
  chapter: 'IV',
  chapterTitle: 'The First Test',
  sceneCount: 5,
  title: 'The Invitation',
  kicker: 'Chapter IV · The First Test',
  location: "Higgins's study, early evening",
  visualStage: 'in_training',
  voiceStage: 'Emerging New Speech',
  composition: 'ch02-study',
  background: { src: STUDY, alt: "Higgins's study, a quiet Edwardian room with a desk, books and fireplace." },
  plate: { src: STUDY, alt: "Higgins's study, a quiet Edwardian room with a desk, books and fireplace." },
  eliza: {
    src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png',
    alt: 'Eliza in practical indoor lesson clothes listens with a focused expression.'
  },
  supporting: [
    cutout('./assets/images/characters/pickering/runtime/pickering_master_cutout.png', 'Colonel Pickering stands with his hat in the study.', 'pickering'),
    cutout('./assets/images/characters/higgins/runtime/higgins_master_cutout.png', 'Henry Higgins listens from behind the desk.', 'higgins')
  ],
  props: [],
  storyBeats: [
    { type: 'narration', text: 'The lesson is over. The learning is not.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'A card came for you, Miss Doolittle. You are invited to a small reading and tea on Friday.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'For me? Will I have to speak in front of everyone?' },
    { type: 'dialogue', speaker: 'Pickering', text: 'You may meet a few people. There is no speech planned.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'A greeting is enough to begin. We can prepare one.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I can practise it here. But people do not wait like a lesson does.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Then listen first. A conversation is an experiment, too.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'And you may take your time. You are going as yourself.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I want to know what they mean, not only how I should answer.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Sensible. We shall prepare the words, not the whole evening.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Should I practise a greeting, think about what I want to say, or listen first?' },
    { type: 'narration', text: 'The invitation rests on the desk. Friday is still ahead.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'All right. Let me choose where to begin.' }
  ],
  decision: {
    id: 'D08',
    prompt: 'Where should Eliza begin?',
    labelOnly: true,
    neutralChoice: true,
    hideResult: true,
    pressedState: true,
    choices: [
      { id: 'd08_practise_greeting', title: 'Practise a simple greeting.' },
      { id: 'd08_plan_message', title: 'Think about what she wants to say.' },
      { id: 'd08_listen_first', title: 'Listen first and observe.' }
    ]
  },
  voice: [],
  nextScene: 'ch04_s02'
};

export const CH04_S01_TEACHER_SECTIONS = [
  ['Chapter Overview', 'Chapter IV moves Eliza from controlled practice toward communication in social situations. S01 establishes an invitation and preparation; the public interaction comes later. Her voice stage is Emerging New Speech: more conscious control and growing function outside the lesson room, not polished final performance.'],
  ['Learning Goals', 'Notice that speaking in a real interaction also requires listening and pacing. Choose a preparation approach without treating one as correct. Recognise that intelligibility and communicative choice do not require erasing identity.'],
  ['Language Focus', 'Short greetings, planning a message, and the difference between rehearsed practice and an unfolding conversation. No new pronunciation system is introduced.'],
  ['Listening Focus', 'Attend to what another person means and allow time to respond. S01 is preparation, not a listening challenge; LC11 belongs to S02.'],
  ['Key Vocabulary', 'invitation, reading, greeting, practise, conversation, listen, answer.'],
  ['Cultural / Literary Context', 'The invitation creates an opportunity in a society with class expectations. The story examines those expectations; it does not endorse upper-class speech as morally better or Cockney as defective.'],
  ['Decisions – Teacher Notes', 'D08 prompt: “Where should Eliza begin?” It is a non-punitive character/preparation choice stored only as the selected stable option ID in decisions.D08. No choice is correct or wrong, no score or development signal is attached, and there is no immediate branch-specific flavour/result text. All options converge. Labels: d08_practise_greeting — “Practise a simple greeting.”; d08_plan_message — “Think about what she wants to say.”; d08_listen_first — “Listen first and observe.”'],
  ['Challenge Key', 'No LC challenge, hidden pronunciation task, challenge score or challenge reward in S01; there is no answer key. LC11 begins in S02, Names and Weather, and concerns small-talk turn signals.'],
  ['Discussion Questions', 'How is practising in a quiet room different from speaking with someone new? What can listening first help Eliza notice? Can a speaker prepare and still choose their own words?'],
  ['Sensitive Framing', 'Class and accent pressures are examined, not endorsed. Upper-class speech is not morally better, and Cockney is not defective. Accent ≠ intelligence. Eliza develops greater control, choice and intelligibility, not erasure of identity. Her voice stage is Emerging New Speech; the separate visual stage remains in_training.'],
  ['Suggested Classroom Use', 'Read the scene, then let learners compare the three preparation approaches without ranking them. A brief pair activity can rehearse a greeting, plan a message, or listen to a partner before replying. Teacher preview is read-only and must not mutate learner state.'],
  ['Scene Navigation', 'Chapter III ends with “I can hear it myself.” and “The lesson is over. The learning is not.” After D08 and explicit Continue, S01 records ch04_s01_complete once without a signal increment and moves to ch04_s02 – Names and Weather. S01 has no challenge; LC11 remains in S02.']
];
