// Chapter II pilot content is kept separate from the five locked Chapter I scenes.
// Text and stable IDs follow docs/chapters/ch02/SCRIPT.md.
const image = (path, alt) => ({ src: `./assets/${path}`, alt });
const choice = (id, title, text) => ({ id, title, text });

export const CH02_SCENE_01 = {
  id: 'ch02_s01', number: 1, title: 'The Door She Chooses', kicker: 'The Bargain',
  background: image('images/locations/ch02/ch02_higgins-house-exterior.webp', 'An Edwardian townhouse in morning light, with stone steps leading to a black entrance door.'),
  plate: image('images/locations/ch02/ch02_higgins-house-exterior.webp', 'The black entrance door of Higgins’s Edwardian house.'),
  eliza: image('images/characters/eliza/runtime/eliza_flower-girl_thoughtful_cutout.png', 'Eliza stands outside Higgins’s house, purposeful but slightly nervous, still dressed as a Flower Girl.'),
  supporting: [image('images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png', 'Mrs Pearce stands beside the entrance with a calm, practical questioning expression.')],
  props: [],
  storyBeats: [
    { type: 'narration', text: "By morning, Eliza has made up her mind. Higgins's house is quieter than the market, but the question feels louder: what will she ask for, and what will she refuse?" },
    { type: 'narration', text: 'Eliza stands at the entrance with her flower basket. She has come without an invitation.' },
    { type: 'dialogue', speaker: 'Eliza', text: "Good morning. I've come to see Mr Higgins. I want lessons." },
    { type: 'dialogue', speaker: 'Mrs Pearce', text: 'Do you have an appointment?' },
    { type: 'dialogue', speaker: 'Eliza', text: "No, ma'am. I have money for the first lesson, and I know what I want." },
    { type: 'narration', text: 'Higgins appears at the end of the hall.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'You have crossed the city for a change of speech?' },
    { type: 'dialogue', speaker: 'Eliza', text: 'For more than that. I want people to hear what I mean.' }
  ],
  voice: [], // Planned Chapter II takes are not runtime assets yet.
  decision: {
    id: 'D04', prompt: 'Higgins is waiting for a clear request. Choose how Eliza asks.',
    choices: [
      choice('d04_direct_request', 'Direct request', 'I want lessons. How much do you charge?'),
      choice('d04_polite_request', 'Polite request', 'Could you tell me what a lesson costs, please?'),
      choice('d04_request_with_boundary', 'Request with a boundary', 'I would like lessons, but I need to know the price and what you expect from me.')
    ]
  },
  consequence: {
    d04_direct_request: 'Higgins answers immediately; Eliza keeps control of the purpose of the visit.',
    d04_polite_request: 'Mrs Pearce acknowledges the clear request; Eliza has deliberately chosen a more formal register.',
    d04_request_with_boundary: 'Mrs Pearce invites Eliza inside; the terms are named before the lesson is discussed.'
  },
  challenge: {
    id: 'LC03', kind: 'lc03', title: 'Clear request, polite form',
    prompt: 'Eliza wants to keep the same meaning: “I want lessons. Tell me the price.” Which sentence adds a polite form without losing the clear request?',
    options: [
      choice('lc03_clear_polite_request', '', 'Could you tell me the price of the lessons, please? I would like to begin.'),
      choice('lc03_unclear_request', '', 'Perhaps lessons could happen, if it is not too much trouble.'),
      choice('lc03_submissive_request', '', 'I do not mind what you decide. Anything will do.')
    ],
    answer: 'lc03_clear_polite_request'
  },
  transition: 'Mrs Pearce opens the inner door. Eliza steps over the threshold without waiting to be invited twice.'
};

export const CH02_SCENE_02 = {
  id: 'ch02_s02', number: 2, title: 'Terms on the Table', kicker: 'The Bargain',
  composition: 'ch02-study',
  background: image('images/locations/ch02/ch02_higgins-study.webp', "Higgins's Edwardian study, with a work desk, bookshelves, a window and a fireplace."),
  plate: image('images/locations/ch02/ch02_higgins-study.webp', "The desk in Higgins's book-filled study."),
  eliza: image('images/characters/eliza/runtime/eliza_flower-girl_guarded_cutout.png', 'Eliza stands at the left of the desk with her flower basket, guarded but engaged.'),
  supporting: [
    { ...image('images/characters/pickering/runtime/pickering_master_cutout.png', 'Pickering watches Eliza attentively from behind the desk.'), placement: 'pickering' },
    { ...image('images/characters/higgins/runtime/higgins_master_cutout.png', 'Higgins stands near the desk with his notebook, considering the lessons.'), placement: 'higgins' },
    { ...image('images/characters/mrs-pearce/runtime/mrs-pearce_observant-support_cutout.png', 'Mrs Pearce watches the conversation with calm, practical attention.'), placement: 'mrs-pearce' }
  ],
  props: [], // Papers and writing materials are already integrated into the approved study plate.
  storyBeats: [
    { type: 'narration', text: 'Higgins places papers on the table as if the lesson has already begun. Pickering watches Eliza, not only the notes. Mrs Pearce watches the room.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'I can measure the work, compare the results, and plan the exercises.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'You can measure a sentence. You cannot measure what I want it for.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'A lesson should help her choose, not simply measure her.' },
    { type: 'dialogue', speaker: 'Mrs Pearce', text: 'And it should describe a household, not only a laboratory.' }
  ],
  voice: [{
    id: 'AM14A', src: './assets/audio/characters/pickering/pickering_ch02_scene02_001.mp3',
    transcript: 'A lesson should help her choose, not simply measure her.',
    label: 'Play Pickering’s response'
  }], // Human approved in mix; speech is explicit-play only.
  contextual: { id: 'gramophone_distant', src: './assets/audio/ambience/gramophone_distant.mp3' },
  challenge: {
    id: 'LC04', kind: 'lc04', title: 'Offer, evaluation, or condition',
    intro: 'The people around the table use different kinds of statements. Listen for what each speaker is doing in the conversation.',
    prompt: 'Listen to each sample. Choose whether the speaker is making an offer, giving an evaluation, or stating a condition.',
    options: [
      { id: 'lc04_offer', label: 'Offer' },
      { id: 'lc04_evaluation', label: 'Evaluation' },
      { id: 'lc04_condition', label: 'Condition' }
    ],
    samples: [
      { id: 'lc04_sample_offer', speaker: 'Higgins', src: './assets/audio/listening/ch02_lc04_001.mp3', transcript: 'I can give you three lessons each week, and I can show you how to practise.', answer: 'lc04_offer' },
      { id: 'lc04_sample_evaluation', speaker: 'Pickering', src: './assets/audio/listening/ch02_lc04_002.mp3', transcript: 'You listen carefully. That is a useful beginning, but your question needs a clearer ending.', answer: 'lc04_evaluation' },
      { id: 'lc04_sample_condition', speaker: 'Mrs Pearce', src: './assets/audio/listening/ch02_lc04_003.mp3', transcript: 'If you stay for lessons, you must keep the agreed hours.', answer: 'lc04_condition' }
    ],
    success: 'An offer gives or promises something. An evaluation describes a quality or result. A condition says what must happen for an agreement to continue.',
    retry: 'Listen for the purpose of the sentence. Is the speaker offering something, judging a result, or setting a requirement?'
  },
  transition: 'Mrs Pearce gestures toward the kitchen. “There are practical questions before there is an agreement.”'
};

export const CH02_SCENE_03 = {
  id: 'ch02_s03', number: 3, title: "Mrs Pearce's Questions", kicker: 'The Bargain',
  composition: 'ch02-hallway',
  background: image('images/locations/ch02/ch02_higgins-house-hallway.webp', 'A warm Edwardian hallway with stairs and an open doorway into the kitchen.'),
  plate: image('images/locations/ch02/ch02_higgins-house-hallway.webp', 'The hallway beside the kitchen doorway.'),
  eliza: image('images/characters/eliza/runtime/eliza_flower-girl_listening_cutout.png', 'Eliza listens actively and names her boundaries, still dressed as a Flower Girl.'),
  supporting: [
    { ...image('images/characters/higgins/runtime/higgins_master_cutout.png', 'Higgins stands further back with his notebook.'), placement: 'higgins' },
    { ...image('images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png', 'Mrs Pearce leads the practical conversation with an open questioning gesture.'), placement: 'mrs-pearce' }
  ],
  props: [],
  voice: [{
    id: 'AM15', src: './assets/audio/characters/mrs-pearce/mrs-pearce_ch02_scene03_001.mp3',
    transcript: 'Before we begin, we must know the hours, the cost, and what you need.',
    label: 'Play Mrs Pearce’s practical question', inline: true
  }, {
    id: 'AM16', src: './assets/audio/characters/eliza/eliza_ch02_scene03_001.mp3',
    transcript: "I'm paying for lessons. I'm not giving up my say in them.",
    label: 'Play Eliza’s boundary statement', inline: true
  }], // Exact supplied takes. AM15 and AM16 human approved in mix. Explicit play only.
  storyBeats: [
    { type: 'narration', text: "Away from Higgins's notes, the questions become ordinary and serious: time, money, clothes, rest, and what happens when a lesson becomes too much." },
    { type: 'dialogue', speaker: 'Mrs Pearce', text: 'Before we begin, we must know the hours, the cost, and what you need.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Mornings are possible. Late evenings are not.' },
    { type: 'dialogue', speaker: 'Mrs Pearce', text: 'And if you do not understand an instruction?' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I will ask. I will not pretend.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'You make a long list.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'It is shorter than being misunderstood.' },
    { type: 'dialogue', speaker: 'Mrs Pearce', text: 'Good. A boundary is easier to keep when it is spoken.' },
    { type: 'dialogue', speaker: 'Eliza', text: "I'm paying for lessons. I'm not giving up my say in them." }
  ],
  response: {
    prompt: 'Would you like to ask for clarification? This response is optional.',
    choices: [
      choice('s03_ask_for_clarification', 'Ask for clarification', 'Could you explain what happens if I miss a lesson?'),
      choice('s03_confirm_understanding', 'Confirm understanding', 'I understand the question. We can discuss the details at the table.')
    ],
    consequences: {
      s03_ask_for_clarification: 'Mrs Pearce will explain the practical terms before an agreement is made.',
      s03_confirm_understanding: 'Mrs Pearce continues toward the discussion of the terms.'
    }
  },
  transition: "The practical questions are written down beside Higgins's notes."
};

export const CH02_TEACHER_SECTIONS = [
  ['Chapter Overview', 'Eliza arrives at Higgins\'s house by her own choice and asks to pay for lessons. The chapter is about agency, communication strategy, money, and boundaries. It is not about replacing a supposedly inferior accent with a superior one.'],
  ['Learning Goals', 'Formulate a clear request; add a polite form without losing the purpose of a request; distinguish directness, politeness, and boundary-setting as different strategies.'],
  ['Language Focus', 'Functional language: I want…, Could you tell me…?, I would like…, I need to know…. Register: direct, polite, formal, and boundary-setting. A register choice can affect access in a situation without changing a person\'s value.'],
  ['Listening Focus', 'LC03 is a reading / language-noticing activity. It does not claim that polite English is better English. Audio is optional.'],
  ['Key Vocabulary', 'lesson, price, pay, term, condition, explain, agree, boundary, purpose, practice, clear, request.'],
  ['Cultural / Literary Context', 'Discuss access to paid education and employment in an imagined Edwardian London, and how money can create both opportunity and power imbalance. This is an original educational adaptation.'],
  ['Decisions – Teacher Notes', 'D04: d04_direct_request, d04_polite_request, d04_request_with_boundary. All three are legitimate. The choice stores only request_strategy and adds no development signal.'],
  ['Challenge Key', 'LC03: lc03_clear_polite_request. The correct answer preserves the purpose of the request and adds a clear polite form. The distractors make the request unclear or surrender its purpose.'],
  ['Discussion Questions', 'Can a direct request still be respectful? What is the difference between a polite form and a vague form? Why might someone state a boundary before agreeing to a lesson?'],
  ['Sensitive Framing', 'Accent ≠ intelligence. Do not describe Cockney as broken, comic, lazy, or unintelligent. Formal register is a situational tool, not a higher human state.'],
  ['Suggested Classroom Use', 'Read ch02_s01 and compare the three D04 strategies without ranking them. Complete LC03 and ask learners to identify what meaning stayed the same. Teacher preview and replay are read-only.'],
  ['Scene Navigation', 'ch02_s01 · The Door She Chooses · D04 · LC03. ch02_s02 is playable after LC03; later Chapter II scenes remain planned.']
];

const CH02_S02_TEACHER_OVERRIDES = {
  'Learning Goals': 'Identify an offer, an evaluation, and a condition in context; ask for clarification about practical lesson terms. These are speech acts, not rankings of speakers.',
  'Listening Focus': 'LC04 asks what each sentence does: an offer gives or promises something; an evaluation describes a quality or result; a condition states what must happen. The transcript supports every sample; audio is human-approved in the scene mix.',
  'Decisions – Teacher Notes': 'There is no major decision in ch02_s02. D04 was saved in the previous scene; LC04 records attempts and completion without a development-signal change.',
  'Challenge Key': 'LC04: lc04_sample_offer → lc04_offer; lc04_sample_evaluation → lc04_evaluation; lc04_sample_condition → lc04_condition. Completion stores ch02_lc04_completed, experiment_framing_heard, and attempt metadata, with no Confidence reward.',
  'Discussion Questions': 'What is each speaker trying to do with their statement? How does Eliza distinguish a measurable exercise from her own purpose? Which practical terms would you ask about before agreeing to lessons?',
  'Suggested Classroom Use': 'Use LC04 with the visible transcripts to sort the three speech acts, then discuss whose purpose each statement serves. Teacher preview and replay are read-only.',
  'Scene Navigation': 'ch02_s02 · Terms on the Table · LC04. ch02_s03 is planned but not playable in this pilot.'
};

export const CH02_SCENE_02_TEACHER_SECTIONS = CH02_TEACHER_SECTIONS.map(([heading, content]) => [heading, CH02_S02_TEACHER_OVERRIDES[heading] || content]);

const CH02_S03_TEACHER_OVERRIDES = {
  'Learning Goals': 'Ask for clarification about practical terms; name boundaries and recognise learner agency within an unequal agreement.',
  'Language Focus': 'Could you explain…? expresses a request for clarification. I will ask. I will not pretend. names a boundary without aggression. Discuss hours, cost, rest and understanding.',
  'Listening Focus': 'This scene is book-first. Eliza’s boundary statement has optional story voice, human approved in the scene mix. Mrs Pearce’s practical question has optional story voice, human approved in the scene mix. All meaning is present in the visible dialogue; there is no listening task.',
  'Decisions – Teacher Notes': 'Both optional responses are legitimate. Asking for clarification records that Eliza asked a boundary question; confirming understanding adds no persistent outcome. Neither changes development signals.',
  'Challenge Key': 'There is no answer key and no scored challenge. The optional response is a conversational choice.',
  'Discussion Questions': 'Why can it be difficult to ask an authority for clarification? How does payment affect the power imbalance? How does Mrs Pearce support Eliza without deciding for her?',
  'Cultural / Literary Context': 'Paid education can create opportunity and a power imbalance. Mrs Pearce is a practical, calm and supportive authority who helps make the terms understandable.',
  'Suggested Classroom Use': 'Read the conversation, then practise Could you explain…? with practical terms. Compare both responses without ranking them. Preview and review are read-only.',
  'Scene Navigation': "Mrs Pearce's Questions · clarification and boundaries. Continue to The Price of a Lesson; the clarification choice is optional."
};
export const CH02_SCENE_03_TEACHER_SECTIONS = CH02_TEACHER_SECTIONS.map(([heading, content]) => [heading, CH02_S03_TEACHER_OVERRIDES[heading] || content]);

export const CH02_SCENE_04 = {
  id: 'ch02_s04', number: 4, title: 'The Price of a Lesson', kicker: 'The Bargain',
  composition: 'ch02-agreement',
  background: image('images/locations/ch02/ch02_higgins-study.webp', 'An Edwardian study with a writing desk, papers, books and a fireplace.'),
  plate: image('images/locations/ch02/ch02_higgins-study.webp', 'The desk where the lesson agreement is made.'),
  eliza: image('images/characters/eliza/runtime/eliza_flower-girl_thoughtful_cutout.png', 'Eliza stands firmly beside the desk, focused on Higgins and the lesson agreement.'),
  supporting: [
    { ...image('images/characters/higgins/runtime/higgins_master_cutout.png', 'Higgins writes the practical lesson terms beside the desk.'), placement: 'higgins' },
    { ...image('images/characters/pickering/runtime/pickering_master_cutout.png', 'Pickering supports the fair agreement from behind the desk.'), placement: 'pickering' },
    { ...image('images/characters/mrs-pearce/runtime/mrs-pearce_fairness-monitoring_cutout.png', 'Mrs Pearce calmly monitors fairness and mutual understanding.'), placement: 'mrs-pearce' }
  ],
  props: [],
  voice: [{
    id: 'AM17', src: './assets/audio/characters/higgins/higgins_ch02_scene04_001.mp3',
    transcript: 'Three mornings each week. Practice between lessons. A fixed fee.',
    label: 'Play Higgins’s lesson terms', inline: true,
    afterVoice: { id: 'ch02_quarter_hour_gong', sceneId: 'ch02_s04', src: './assets/audio/sfx/ch02_quarter_hour_gong.mp3',
      nextVoice: { src: './assets/audio/characters/eliza/eliza_ch02_scene04_001.mp3' } }
  }, {
    id: 's04_eliza', src: './assets/audio/characters/eliza/eliza_ch02_scene04_001.mp3',
    transcript: 'And what do I receive for it?', label: 'Play Eliza’s question', inline: true,
    afterCueId: 'ch02_quarter_hour_gong'
  }], // Human QA PASS for sources and combined rhythm. Explicit Higgins Play starts the sequence.
  contextual: { id: 'gramophone_distant', src: './assets/audio/ambience/gramophone_distant.mp3' },
  storyBeats: [
    { type: 'narration', text: 'At the table, the agreement becomes concrete. Coins, a pen, and a weekly schedule sit beside the phonetic notes.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Three mornings each week. Practice between lessons. A fixed fee.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'And what do I receive for it?' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Instruction, exercises, and a way to make your speech clearer.' },
    { type: 'dialogue', speaker: 'Eliza', text: "Then write this too: clearer doesn't mean it stops being mine." },
    { type: 'dialogue', speaker: 'Pickering', text: 'That is a fair term.' },
    { type: 'dialogue', speaker: 'Mrs Pearce', text: 'A fair agreement needs both sides to understand it.' },
    { type: 'narration', text: 'The written terms remain visible in the story. This is not a hidden comprehension test.' }
  ],
  terms: [
    'Three lessons each week.', 'Practice between lessons.', 'A fixed fee.',
    "The purpose of the lessons must remain Eliza's to define.", 'Questions and clarification are allowed.'
  ],
  transition: 'Eliza places the money on the table. The agreement is not perfect, but it is spoken aloud.'
};

const CH02_S04_TEACHER_OVERRIDES = {
  'Learning Goals': 'Understand a transparent agreement, terms and conditions, and learner agency. Both sides must understand the terms.',
  'Language Focus': "Discuss lessons, practice, fee, purpose and clarification. Clearer speech does not mean loss of identity: Eliza retains ownership of her learning and voice.",
  'Listening Focus': 'This scene is book-first. There is no story voice or listening task in this checkpoint. All meaning remains visible with sound off.',
  'Cultural / Literary Context': 'Money can create opportunity and a power imbalance. A transparent agreement protects the learner’s right to ask questions and define the purpose of learning.',
  'Decisions – Teacher Notes': 'The terms card is informational. Only explicit student continuation records understanding; entry, replay and preview do not. No development signals change.',
  'Challenge Key': 'There is no answer key, quiz or scored challenge. The terms card is not a test.',
  'Discussion Questions': 'What does each side promise? Why does Eliza protect her own voice? How can both sides check that they understand without testing or ranking the learner?',
  'Suggested Classroom Use': 'Read the agreement, then role-play learner, teacher and supportive witness. Discuss the right to ask questions. Teacher preview remains read-only.',
  'Scene Navigation': 'The Price of a Lesson · transparent terms and ownership of learning. The next scene is not playable yet.'
};
export const CH02_SCENE_04_TEACHER_SECTIONS = CH02_TEACHER_SECTIONS.map(([heading, content]) => [heading, CH02_S04_TEACHER_OVERRIDES[heading] || content]);

export const CH02_SCENE_05 = {
  id: 'ch02_s05', number: 5, title: 'Why I Am Here', kicker: 'The Bargain', composition: 'ch02-threshold',
  background: image('images/locations/ch02/ch02_lesson-room-threshold.webp', 'An open doorway from the hallway into an Edwardian lesson room with books, desks and a blackboard.'),
  plate: image('images/locations/ch02/ch02_lesson-room-threshold.webp', 'The open doorway to the lesson room.'),
  eliza: image('images/characters/eliza/runtime/eliza_flower-girl_thoughtful_cutout.png', 'Eliza pauses deliberately at the threshold, thoughtful and composed, to name her own purpose.'),
  supporting: [{ ...image('images/characters/pickering/runtime/pickering_master_cutout.png', 'Pickering listens attentively as a supportive witness while Eliza speaks.'), placement: 'pickering' }],
  props: [],
  voice: [{
    id: 'AM19C', src: './assets/audio/characters/eliza/eliza_ch02_scene05_001.mp3',
    transcript: 'I am here to learn more ways to speak. I will choose what those ways are for.',
    label: 'Play Eliza’s purpose statement', inline: true
  }], // Exact approved source take; common D05 ending only, explicit playback.
  storyBeats: [
    { type: 'narration', text: 'The hallway is quiet again. The first lesson can begin, but Eliza stops at the threshold.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Before I begin, I want to say why I came.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'Then say it in your own way.' }
  ],
  decision: { id: 'D05', prompt: 'What is Eliza choosing to learn for?', choices: [
    choice('d05_opportunity', 'Opportunity', 'I want work where people listen to what I can do.'),
    choice('d05_respect', 'Respect', 'I want to be heard before people decide what I am.'),
    choice('d05_learning', 'Learning', 'I want to understand these forms and choose when they help.'),
    choice('d05_independence', 'Independence', 'I want skills I can use without handing over my future.')
  ] },
  ending: [
    { type: 'dialogue', speaker: 'Eliza', text: 'I am here to learn more ways to speak. I will choose what those ways are for.' },
    { type: 'narration', text: 'The door to the lesson room stays open. Eliza enters with a plan, a question, and terms she has helped to name.' }
  ]
};

const CH02_S05_TEACHER_OVERRIDES = {
  'Learning Goals': 'Name a purpose for learning and practise self-advocacy. The learner/player chooses the nuance of Eliza’s motivation; all four options preserve agency.',
  'Language Focus': 'I want… expresses purpose. I will choose… expresses ownership of future choices. Learning more forms gives Eliza tools she can choose when to use.',
  'Listening Focus': 'Book-first scene with optional story voice for Eliza’s final purpose statement. The AM19C source take is human approved; listening QA in the scene mix is pending. There is no listening task. All dialogue and the ending remain visible in the story.',
  'Cultural / Literary Context': 'Eliza defines her own goal before entering the lesson room. Pickering supports her right to speak; he does not choose her purpose.',
  'Decisions – Teacher Notes': 'D05 records confirmed_motivation once through ch02_d05_confirmed_motivation. All four options are legitimate. The choice records perspective, not achievement; no development signals change. Earlier Chapter II state remains intact.',
  'Challenge Key': 'No correct answer, score or assessment. D05 is self-definition, not a quiz. All choices converge on the same Chapter II ending.',
  'Discussion Questions': 'Why does Eliza stop before entering? How can a supportive witness make room for someone’s own voice? What makes learning a choice rather than a surrender of control?',
  'Sensitive Framing': 'Accent ≠ intelligence. Opportunity, respect, learning and independence are equally legitimate motivations. Self-definition and consent close Chapter II.',
  'Suggested Classroom Use': 'Read each motivation without ranking it. Discuss purpose and consent, then read the shared ending. Teacher Mode, preview and review are read-only.',
  'Scene Navigation': 'Why I Am Here · D05 · Chapter II ending. After the choice, review this scene. Chapter III is not available in this checkpoint.'
};
export const CH02_SCENE_05_TEACHER_SECTIONS = CH02_TEACHER_SECTIONS.map(([heading, content]) => [heading, CH02_S05_TEACHER_OVERRIDES[heading] || content]);
