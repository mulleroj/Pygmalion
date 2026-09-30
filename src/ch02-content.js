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
  ['Scene Navigation', 'ch02_s01 · The Door She Chooses · D04 · LC03. The remaining Chapter II scenes are planned but not playable in this pilot.']
];
