export const CH06_SCENE_01 = {
  id: 'ch06_s01',
  number: 1,
  chapter: 'VI',
  chapterTitle: 'Her Own Voice',
  sceneCount: 5,
  title: 'The Morning After',
  kicker: 'Chapter VI · Her Own Voice',
  location: 'Wimpole Street morning room',
  visualFallback: false,
  composition: 'ch06-morning-after',
  background: {
    src: './assets/images/locations/ch06/ch06_morning_after_room.webp',
    alt: 'A quiet Edwardian morning room with letters on a table and an open doorway into the adjoining workroom.'
  },
  plate: {
    src: './assets/images/locations/ch06/ch06_morning_after_room.webp',
    alt: 'A quiet Edwardian morning room with letters on a table and an open doorway into the adjoining workroom.'
  },
  eliza: {
    src: './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png',
    alt: 'Eliza, thoughtful and composed in her own voice.'
  },
  supporting: [],
  props: [],
  visualRoutes: {
    higgins_directly: {
      compositionVariant: 'ch06-morning-after-higgins',
      supporting: [{ src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', alt: 'Henry Higgins stands to the left, listening to Eliza.', placement: 'higgins' }]
    },
    pickering_first: {
      compositionVariant: 'ch06-morning-after-pickering',
      supporting: [{ src: './assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png', alt: 'Colonel Pickering stands to the left, listening to Eliza.', placement: 'pickering' }]
    },
    mrs_pearce_first: {
      compositionVariant: 'ch06-morning-after-mrs-pearce',
      supporting: [{ src: './assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png', alt: 'Mrs Pearce stands to the left, speaking practically with Eliza.', placement: 'mrs-pearce' }]
    },
    neutral: { compositionVariant: 'ch06-morning-after-neutral', supporting: [] }
  },
  voice: [],
  storyBeats: [
    { type: 'narration', text: 'Morning light reaches the papers on the table. One letter asks Eliza to speak at a public meeting. Another offers paid work. A note asks whether she might help a group of flower growers plan a small evening class. Eliza sets the letters side by side.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Three different invitations. None of them tells me what I must do.' },
    { type: 'contactRoute' },
    { type: 'narration', text: 'The first conversation ends without choosing for Eliza. Public work, paid independence and shared work with the growers remain on the table. The letters offer different conditions, not different measures of her worth.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I know what is possible. I need to decide what I want.' }
  ],
  contactRoutes: {
    higgins_directly: [
      { speaker: 'Higgins', text: 'The public invitation would show what the lessons can achieve.' },
      { speaker: 'Eliza', text: 'The lessons gave me tools. I shall decide what I use them for.' },
      { speaker: 'Higgins', text: 'Quite. The next experiment is yours, then.' }
    ],
    pickering_first: [
      { speaker: 'Pickering', text: 'I thought the public invitation might interest you. But I should ask: what interests you?' },
      { speaker: 'Eliza', text: 'Thank you for asking. I want to consider all three before I answer.' },
      { speaker: 'Pickering', text: 'You should have had that question sooner.' }
    ],
    mrs_pearce_first: [
      { speaker: 'Mrs Pearce', text: 'Before you answer any invitation, ask about the pay, the hours and where you would stay.' },
      { speaker: 'Eliza', text: 'I mean to. And I shall decide which questions matter to me.' },
      { speaker: 'Mrs Pearce', text: 'Good. Your wishes belong on the list too.' }
    ]
  },
  nextScene: 'ch06_s02'
};

export const CH06_S01_TEACHER_SECTIONS = [
  ['Scene focus', 'Eliza reviews practical possibilities after the reception; she is considering what she wants, not waiting for Higgins to assign her a future.'],
  ['Learning goals', 'Compare opportunity, paid work and community work while noticing the practical conditions that make each possibility available.'],
  ['Discussion questions', 'Who gets to define success? What information about pay, hours, housing and support might Eliza need before deciding?'],
  ['Sensitive framing', 'Accent ≠ intelligence. Public participation, independent work and shared community work are possibilities, not a ranking. No contact route owns Eliza’s achievement or gives her better information.'],
  ['Scene navigation', 'next_contact changes only who speaks first. All three conversations converge on the same scene text. S01 has no decision, challenge, reward or signal change; only explicit student Continue completes it.'],
  ['Teacher preview contract', 'Contextual and read-only. Preview does not complete S01, alter next_contact or development signals, save progress, or advance the scene.']
];

export const CH06_SCENE_02 = {
  id: 'ch06_s02', number: 2, chapter: 'VI', chapterTitle: 'Her Own Voice', sceneCount: 5,
  title: 'The Question in the Mirror', kicker: 'Chapter VI · Her Own Voice',
  location: 'A quiet private dressing space', composition: 'ch06-question-mirror', visualFallback: false,
  background: {
    src: './assets/images/locations/ch06/ch06_question_in_mirror_room.webp',
    alt: 'A quiet Edwardian room with a wall mirror and small table on the left, a window near the centre, and open floor on the right.'
  },
  plate: {
    src: './assets/images/locations/ch06/ch06_question_in_mirror_room.webp',
    alt: 'A quiet Edwardian room with a wall mirror and small table on the left, a window near the centre, and open floor on the right.'
  },
  eliza: {
    src: './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png',
    alt: 'Eliza, thoughtful and composed, standing apart from the mirror.'
  },
  supporting: [], props: [], voice: [],
  storyBeats: [
    { type: 'narration', text: 'Eliza stands before the mirror. For a moment she remembers the quick voice she used at the flower stall, the careful phrases she practised, and the voice she chose at the exhibition. Each belonged to a moment in her life.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I learned another way to speak. I did not lose the first.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'A voice can change with the room. The person choosing it is still me.' }
  ],
  nextScene: 'ch06_s03'
};

export const CH06_S02_REPLAY_MOMENTS = [
  {
    id: 'ch06-s02-initial-motivation', history: (state) => Boolean(state.origin_motivation),
    category: 'An early reason', label: 'Eliza’s reflection at the flower-shop window',
    transcript: "People hear how I talk before they see what I can do. Maybe if I could talk another way, it'd open a door or two. Wouldn't make me worth more. Just give me another way to make 'em listen."
  },
  {
    id: 'ch06-s02-learning-recovery', history: (state) => state.applied_events.includes('ch03_s05_complete'),
    category: 'A learning moment', label: 'Eliza finding her place again during practice',
    src: './assets/audio/characters/eliza/eliza_ch03_scene05_003.mp3',
    transcript: 'I can get it back.'
  },
  {
    id: 'ch06-s02-reception-credit', history: (state) => Boolean(state.credit_response),
    category: 'A Chapter V reception moment', label: 'Eliza names her contribution',
    transcript: 'I know what I contributed.'
  }
];

export const CH06_S02_TEACHER_SECTIONS = [
  ['Scene focus', 'Self-recognition, code-switching, register, identity and accent prejudice. More than one voice can belong to one person. Optional earlier-scene replay is read-only; there is no identity quiz or answer key.'],
  ['Teacher preview contract', 'Teacher Mode is read-only and non-scoring. Replays do not change saved choices, signals or completion. No register is presented as more authentic, and no identity is ranked.']
];

export const CH06_SCENE_03 = {
  id: 'ch06_s03', number: 3, chapter: 'VI', chapterTitle: 'Her Own Voice', sceneCount: 5,
  title: 'Three Ways Forward', kicker: 'Chapter VI · Her Own Voice',
  location: 'Wimpole Street morning room', composition: 'ch06-three-ways-forward', visualFallback: false, voice: [],
  background: {
    src: './assets/images/locations/ch06/ch06_three_ways_forward_room.webp',
    alt: 'A quiet Edwardian morning room with a table, ordinary London rooftops beyond the window, an open doorway into the workroom and clear floor.'
  },
  plate: {
    src: './assets/images/locations/ch06/ch06_three_ways_forward_room.webp',
    alt: 'A quiet Edwardian morning room with a table, ordinary London rooftops beyond the window, an open doorway into the workroom and clear floor.'
  },
  eliza: {
    src: './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png',
    alt: 'Eliza, thoughtful and composed in her own voice.'
  },
  supporting: [], props: [],
  storyBeats: [
    { type: 'dialogue', speaker: 'Eliza', text: 'I could take my place in public work. I could build a life with work and decisions of my own. Or I could carry what I have learned between the people and places that matter to me.' }
  ],
  decision: {
    id: 'D12', prompt: 'Which possibility would you like Eliza to follow?',
    choices: [
      { id: 'd12_social_success', value: 'social_success', label: 'PUBLIC PARTICIPATION', text: 'I want to take an active place in public life and use my new skills on my own terms.' },
      { id: 'd12_independent_voice', value: 'independent_voice', label: 'INDEPENDENT VOICE', text: 'I want to build a life with work, money and decisions that are my own.' },
      { id: 'd12_integrated_identity', value: 'integrated_identity', label: 'INTEGRATED IDENTITY', text: 'I want to keep more than one way of speaking and move between the worlds I choose.' }
    ]
  },
  challenge: {
    id: 'LC15', title: 'Pragmatic fit: same intention, three contexts',
    intro: 'Listen to each short message. Who is Eliza speaking to, and what does she want to do?',
    options: [
      { id: 'lc15_public_organiser', label: 'A meeting organiser; she wants permission to present a proposal to the group.' },
      { id: 'lc15_familiar_colleague', label: 'A colleague she knows; she wants to arrange a shared practical task.' },
      { id: 'lc15_private_adviser', label: 'A trusted adviser; she wants private advice on how to begin.' }
    ],
    samples: [
      { id: 'lc15_sample_public', src: './assets/audio/listening/ch06_lc15_sample_01.mp3', answer: 'lc15_public_organiser', transcript: 'Chair, may I explain how our growers could organise the market list?', accessiblePrompt: 'The chair has opened the floor. Eliza is standing where the group can hear her and refers to an idea she could explain.', incorrectFeedback: 'Notice the direct address to the chair and the proposal for the group.' },
      { id: 'lc15_sample_colleague', src: './assets/audio/listening/ch06_lc15_sample_02.mp3', answer: 'lc15_familiar_colleague', transcript: 'Mina, could we sort the market list together after lunch?', accessiblePrompt: "Eliza and another person are sorting the growers' papers. She uses the person's first name, speaks about doing it together and mentions a time.", incorrectFeedback: 'Notice the first name, the shared “we” and the proposed time.' },
      { id: 'lc15_sample_private', src: './assets/audio/listening/ch06_lc15_sample_03.mp3', answer: 'lc15_private_adviser', transcript: 'Mrs Pearce, could I speak with you alone about the growers’ market plan and how I might begin?', accessiblePrompt: 'The room is quiet and only Eliza and Mrs Pearce are present. Eliza asks for a private moment and says she would like guidance on a first step.', incorrectFeedback: 'Notice the private request for advice about the growers’ plan.' }
    ]
  }, nextScene: 'ch06_s04'
};

export const CH06_S03_BOUNDARY = CH06_SCENE_03;

export const CH06_S03_TEACHER_SECTIONS = [
  ['Scene focus', 'D12 is a personal direction with no answer key. The three choices are equally legitimate and have no reward, rank, prerequisite or signal effect. LC15 checks likely addressee and communicative purpose from contextual evidence; accent and prestige are not evidence.'],
  ['LC15 contextual key', 'Public meeting: lc15_sample_public → lc15_public_organiser, a meeting organiser and permission to present a proposal. Familiar colleague: lc15_sample_colleague → lc15_familiar_colleague, arrange a shared practical task. Private conversation: lc15_sample_private → lc15_private_adviser, private advice on how to begin.'],
  ['Teacher preview contract', 'Teacher Mode is read-only. It does not record D12, LC15 answers, support use, completion, signals or progression.']
];
