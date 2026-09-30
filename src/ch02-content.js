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
