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

export const CH06_S02_BOUNDARY = {
  id: 'ch06_s02', number: 2, chapter: 'VI', chapterTitle: 'Her Own Voice', sceneCount: 5,
  title: 'The Question in the Mirror', kicker: 'Chapter VI · Her Own Voice',
  voice: []
};
