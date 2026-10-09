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
  voice: [
    {
      id: 'AM34-HIGGINS',
      src: './assets/audio/characters/higgins/higgins_ch04_scene01_001.mp3',
      transcript: 'Sensible. We shall prepare the words, not the whole evening.',
      label: 'Replay Higgins',
      inline: true,
      generationId: 'BkxpJUWvNKNKFbxn4HnI',
      voiceId: 'JlptfLxaUpd8pZcw9dKd'
    },
    {
      id: 'AM34-ELIZA',
      src: './assets/audio/characters/eliza/eliza_ch04_scene01_001.mp3',
      transcript: 'I want to know what they mean, not only how I should answer.',
      label: 'Replay Eliza',
      inline: true,
      generationId: 'GNCSWbwXOiHiwxtWbQYY',
      voiceId: '124kaYCknTDsnwUFdWl9'
    }
  ],
  nextScene: 'ch04_s02'
};

const CH04_TEA_ROOM = './assets/images/locations/ch04/ch04_social_tea_room.webp';
const CH04_SIDE_CORRIDOR = './assets/images/locations/ch04/ch04_side_corridor.webp';

const LC11_CATEGORIES = [
  { category: 'opening', label: 'Opening the conversation' },
  { category: 'continuing', label: 'Continuing the conversation' },
  { category: 'closing', label: 'Closing the conversation' }
];

export const CH04_SCENE_02 = {
  id: 'ch04_s02',
  number: 2,
  chapter: 'IV',
  chapterTitle: 'The First Test',
  sceneCount: 5,
  title: 'Names and Weather',
  kicker: 'Chapter IV · The First Test',
  location: 'A modest Victorian drawing-room prepared for tea, early evening',
  visualStage: 'in_training',
  voiceStage: 'Emerging New Speech',
  composition: 'ch04-social-tea-room',
  background: { src: CH04_TEA_ROOM, alt: 'A Victorian drawing-room at evening, with a tea table, chairs, fireplace and open space for the guests.' },
  plate: { src: CH04_TEA_ROOM, alt: 'A Victorian drawing-room at evening, with a tea table, chairs, fireplace and open space for the guests.' },
  eliza: {
    src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png',
    alt: 'Eliza in her In Training stage, listening attentively in the drawing-room.'
  },
  supporting: [
    { src: './assets/images/characters/pickering/runtime/pickering_master_cutout.png', alt: 'Colonel Pickering attends as a supportive guest.', placement: 'pickering' }
  ],
  props: [],
  storyBeats: [
    { type: 'narration', text: 'A soft murmur fills the drawing-room. The guests have settled near a table set for tea.' },
    { type: 'dialogue', speaker: 'Hostess', text: 'You must be Miss Doolittle. I am glad you could come.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Thank you for inviting me. It is a lovely room.' },
    { type: 'dialogue', speaker: 'Hostess', text: 'I hope the weather did not make the journey difficult.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'It rained on the way here, but today the sky is clearing.' },
    { type: 'dialogue', speaker: 'Guest', text: 'Was it a long walk?' },
    { type: 'dialogue', speaker: 'Eliza', text: 'It was a short walk. I noticed a little bookshop near the square.' },
    { type: 'dialogue', speaker: 'Guest', text: 'Do you often find time to read?' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I do. I like hearing how different people tell a story.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'Then this evening should offer plenty to listen to.' },
    { type: 'dialogue', speaker: 'Guest', text: 'What sort of story would you choose for a reading?' }
  ],
  voice: [
    { id: 'AM36-001', src: './assets/audio/characters/eliza/eliza_ch04_scene02_001.mp3', transcript: 'It rained on the way here, but today the sky is clearing.', label: 'Replay Eliza', inline: true, generationId: 'DvdnVuQlFQjCkmPr40fu', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM36-002', src: './assets/audio/characters/eliza/eliza_ch04_scene02_002.mp3', transcript: 'It was a short walk. I noticed a little bookshop near the square.', label: 'Replay Eliza', inline: true, generationId: 'YnLHFVdTFxu1n3Y0pl4g', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM36-003', src: './assets/audio/characters/eliza/eliza_ch04_scene02_003.mp3', transcript: 'I do. I like hearing how different people tell a story.', label: 'Replay Eliza', inline: true, generationId: 'T5waq2l96RQJwf2NW1KN', voiceId: '124kaYCknTDsnwUFdWl9' }
  ],
  challenge: {
    id: 'LC11',
    title: 'Reading the conversational turn',
    kind: 'lc11',
    intro: 'Listen to each short turn and decide what it does in the conversation.',
    prompt: 'Is the speaker opening the conversation, continuing it, or closing it?',
    options: LC11_CATEGORIES,
    samples: [
      { id: 'lc11_sample_01', speaker: 'Clarice — Hostess', src: './assets/audio/listening/ch04_lc11_sample_01.mp3', transcript: 'Miss Doolittle, have you been in London long?', answer: 'lc11_01_opening', answerLabel: 'opening', generationId: 'UpaVXHP9hLlhqfORlnK3' },
      { id: 'lc11_sample_02', speaker: 'Paul M — Guest', src: './assets/audio/listening/ch04_lc11_sample_02.mp3', transcript: 'I see. And what do you think of the weather today?', answer: 'lc11_02_continuing', answerLabel: 'continuing', generationId: 'uu0U0PzHxaSfVADcTn75' },
      { id: 'lc11_sample_03', speaker: 'Clarice — Hostess', src: './assets/audio/listening/ch04_lc11_sample_03.mp3', transcript: 'Well, it was lovely speaking with you.', answer: 'lc11_03_closing', answerLabel: 'closing', generationId: 'kkAQBj3swNTpEYoaKC3Q' }
    ]
  },
  application: {
    prompt: 'What sort of story would you choose for a reading?',
    choices: [
      { id: 's02_followup_curiosity', text: 'I like a story with a surprise in it. What do you enjoy?' },
      { id: 's02_share_interest', text: 'Something with a lively character. I like hearing what other readers notice.' }
    ]
  },
  nextScene: 'ch04_s03'
};

export const CH04_SCENE_03 = {
  id: 'ch04_s03', number: 3, chapter: 'IV', chapterTitle: 'The First Test', title: 'The Wrong Answer',
  kicker: 'Chapter IV · The First Test', sceneCount: 5, location: CH04_SCENE_02.location,
  visualStage: 'in_training', voiceStage: 'Emerging New Speech', composition: CH04_SCENE_02.composition,
  background: CH04_SCENE_02.background, plate: CH04_SCENE_02.plate,
  eliza: { ...CH04_SCENE_02.eliza, alt: 'Eliza in her In Training stage, listening and responding in the drawing-room.' },
  supporting: [
    ...CH04_SCENE_02.supporting,
    { src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', alt: 'Professor Higgins observes the exchange from the drawing-room.', placement: 'higgins' }
  ], props: [],
  storyBeats: [
    { type: 'narration', text: 'The conversation turns to the weather. Eliza hears the words clearly and answers their literal meaning.' },
    { type: 'dialogue', speaker: 'Guest', text: 'London seems to have decided we needed more rain.' },
    { type: 'dialogue', speaker: 'Eliza', text: "I don't think London can decide anything. It is a city, not a person." },
    { type: 'narration', text: 'A brief pause follows. A few polite chuckles and an uncertain murmur pass around the room.' }
  ],
  voice: [
    { id: 'AM37-GUEST', src: './assets/audio/characters/guest/guest_ch04_scene03_001.mp3', transcript: 'London seems to have decided we needed more rain.', label: 'Replay Guest', inline: true, generationId: 'YHt4dBWN4fYiTe75qQ1S', assetId: 'ZDChgbYTwdQ4EaN9TcFn', voiceId: 'zp695rEBCwfZ3GYNJOHx' },
    { id: 'AM37-ELIZA', src: './assets/audio/characters/eliza/eliza_ch04_scene03_001.mp3', transcript: "I don't think London can decide anything. It is a city, not a person.", label: 'Replay Eliza', inline: true, generationId: 'TiXtDJwsylxMdRYK2hbJ', assetId: 'UMu4qIp9n8yLJwPmGQcQ', voiceId: '124kaYCknTDsnwUFdWl9' }
  ],
  reaction: { id: 'AM38', src: './assets/audio/listening/ch04_lc12_reaction_001.mp3', label: 'Replay the room reaction', description: 'There is a short pause, followed by restrained polite chuckles and an uncertain murmur.', generationId: 'cQoJZhP5BeIge3rFK0FH', assetId: '11fEHELi8y1QyyfpzgyI' },
  challenge: {
    id: 'LC12', title: 'Literal meaning and implied meaning', kind: 'lc12',
    intro: 'Distinguish literal meaning from implied meaning in a playful social remark.',
    items: [
      { id: 'lc12_literal_meaning', prompt: "Taken literally, what does the Guest's sentence say?", answer: 'literal_city_decided', options: [
        { id: 'literal_city_decided', label: 'London made a decision about the rain.' },
        { id: 'literal_rainy_weather', label: 'London has many rainy days.' },
        { id: 'literal_leave_london', label: 'The Guest wants to leave London.' }
      ] },
      { id: 'lc12_implied_meaning', prompt: 'What does the Guest actually mean?', answer: 'implied_rain_joke', options: [
        { id: 'implied_city_controls_weather', label: 'The city controls the weather.' },
        { id: 'implied_rain_joke', label: 'It has been raining a lot, and the Guest is joking about it.' },
        { id: 'implied_weather_question', label: 'The Guest wants Eliza to explain the weather.' }
      ] }
    ]
  },
  decision: { id: 'D09', prompt: 'How might Eliza respond now?', choices: [
    { id: 'rephrase', text: 'Oh — I see. You meant that London has been very rainy.' },
    { id: 'acknowledge_literal', text: 'I took that rather literally, didn’t I?' },
    { id: 'wait_for_cue', text: 'Perhaps I should listen before I answer.' }
  ] },
  nextScene: 'ch04_s04'
};

export const CH04_SCENE_04 = {
  id: 'ch04_s04', number: 4, chapter: 'IV', chapterTitle: 'The First Test', title: 'After the Laughter',
  kicker: 'Chapter IV · The First Test', sceneCount: 5,
  location: 'A side corridor, several minutes after the tea-room exchange',
  visualStage: 'in_training', voiceStage: 'Emerging New Speech', composition: 'ch04-side-corridor',
  background: { src: CH04_SIDE_CORRIDOR, alt: 'A quiet Victorian side corridor. An open doorway at the far end shows the tea-room gathering at a distance.' },
  plate: { src: CH04_SIDE_CORRIDOR, alt: 'A quiet Victorian side corridor. An open doorway at the far end shows the tea-room gathering at a distance.' },
  eliza: {
    src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png',
    alt: 'Eliza stands at the centre of the corridor, calm and thoughtful.'
  },
  supporting: [
    { src: './assets/images/characters/pickering/runtime/pickering_master_cutout.png', alt: 'Colonel Pickering stands supportively near Eliza.', placement: 'pickering' },
    { src: './assets/images/characters/mrs-pearce/runtime/mrs-pearce_observant-support_cutout.png', alt: 'Mrs Pearce listens with practical warmth.', placement: 'mrs-pearce' },
    { src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', alt: 'Professor Higgins stands slightly apart from the others.', placement: 'higgins' }
  ],
  props: [],
  storyBeats: [
    { type: 'narration', text: 'A few minutes later, the corridor is quieter. The voices from the tea room are muffled behind the door.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'You spoke clearly, Eliza. The difficulty was not the words.' },
    { type: 'dialogue', speaker: 'Mrs Pearce', text: 'People often say one thing and mean something more. That takes time to learn.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Then I must learn the people as well as the language.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Exactly. Tonight is useful because it shows us what still needs work.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'It shows you what still needs work.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'It is a test, Eliza.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Then I should have a say in what the test is for.' }
  ],
  voice: [
    { id: 'AM39-PICKERING', src: './assets/audio/characters/pickering/pickering_ch04_scene04_001.mp3', transcript: 'You spoke clearly, Eliza. The difficulty was not the words.', label: 'Replay Pickering', inline: true, generationId: 'NofB5eBMpGss0bMVeVvX', assetId: 'ArBs5EKl9tzFuHXypIF6', voiceId: 'JBFqnCBsd6RMkjVDRZzb' },
    { id: 'AM39-MRS-PEARCE', src: './assets/audio/characters/mrs-pearce/mrs-pearce_ch04_scene04_001.mp3', transcript: 'People often say one thing and mean something more. That takes time to learn.', label: 'Replay Mrs Pearce', inline: true, generationId: 'zseinCqRQ0NZGSfMY7vE', assetId: 'R5oJ5H7g7GPGKSfMYbtu', voiceId: 'kBag1HOZlaVBH7ICPE8x' },
    { id: 'AM39-ELIZA-01', src: './assets/audio/characters/eliza/eliza_ch04_scene04_001.mp3', transcript: 'Then I must learn the people as well as the language.', label: 'Replay Eliza', inline: true, generationId: 'O8bHX0DauH16MaEKOCUy', assetId: 'QMaQ8OGWLSQILvmmqSGh', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM39-HIGGINS-01', src: './assets/audio/characters/higgins/higgins_ch04_scene04_001.mp3', transcript: 'Exactly. Tonight is useful because it shows us what still needs work.', label: 'Replay Higgins', inline: true, generationId: 'PKM3uGSV9QvDQ4YrxYf7', assetId: 'v6QLqqFmWystm1mRspJs', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'AM39-ELIZA-02', src: './assets/audio/characters/eliza/eliza_ch04_scene04_002.mp3', transcript: 'It shows you what still needs work.', label: 'Replay Eliza', inline: true, generationId: 'v9nTSF0nlmatORVu496N', assetId: 'USOUmFinP4JiFcFRT8gp', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM39-HIGGINS-02', src: './assets/audio/characters/higgins/higgins_ch04_scene04_002.mp3', transcript: 'It is a test, Eliza.', label: 'Replay Higgins', inline: true, generationId: 'HhIROAnFyHOGMhBWMbri', assetId: 'xPmBwqAr0hSbytx8OhV0', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'AM39-ELIZA-03', src: './assets/audio/characters/eliza/eliza_ch04_scene04_003.mp3', transcript: 'Then I should have a say in what the test is for.', label: 'Replay Eliza', inline: true, generationId: 'I8UBaR6Y7hxtYGj71Tjj', assetId: 'zoU7RrKUyS1UiNctZroK', voiceId: '124kaYCknTDsnwUFdWl9' }
  ],
  reflection: {
    prompt: 'What should Eliza carry forward from this moment?',
    choices: [
      { id: 'language', text: 'I need to listen for meaning, not only words.' },
      { id: 'audience', text: 'I need to watch how people react before I answer.' },
      { id: 'feeling', text: 'I need to say when something makes me uncomfortable.' }
    ]
  },
  nextScene: 'ch04_s05'
};

const CH04_EVENING_WALK = './assets/images/locations/ch04/ch04_evening_walk.webp';

export const CH04_SCENE_05 = {
  id: 'ch04_s05',
  number: 5,
  chapter: 'IV',
  chapterTitle: 'The First Test',
  sceneCount: 5,
  title: 'The Walk Home',
  kicker: 'Chapter IV · The First Test',
  location: 'A quiet London street, later that evening',
  visualStage: 'in_training',
  voiceStage: 'Emerging New Speech',
  composition: 'ch04-evening-walk',
  background: { src: CH04_EVENING_WALK, alt: 'A quiet Edwardian London street at evening, with wet cobbles and warm lamplight.' },
  plate: { src: CH04_EVENING_WALK, alt: 'A quiet Edwardian London street at evening, with wet cobbles and warm lamplight.' },
  eliza: {
    src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png',
    alt: 'Eliza stands alone, reflective and thoughtful.'
  },
  supporting: [],
  props: [],
  storyBeats: [
    { type: 'narration', text: 'Later, on the walk home, the street is quiet enough for Eliza to hear her own thoughts.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I can speak carefully when I need to.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'And I can speak more freely when I choose.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'That is not pretending. It is knowing what I can do.' },
    { type: 'd08Echo' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Tonight was not a pass or fail.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'It showed me what I can practise — and what I can choose.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'The choice is mine.' }
  ],
  voice: [
    { id: 'AM41-ELIZA-01', src: './assets/audio/characters/eliza/eliza_ch04_scene05_001.mp3', transcript: 'I can speak carefully when I need to.', label: 'Replay Eliza', inline: true, generationId: 'JzVdYPWbMuofm2uzcAg4', assetId: 'cwkmV8lRLLRUrsgHn56U', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM41-ELIZA-02', src: './assets/audio/characters/eliza/eliza_ch04_scene05_002.mp3', transcript: 'And I can speak more freely when I choose.', label: 'Replay Eliza', inline: true, generationId: 'ySuauVLG2ahSBKU7hoJb', assetId: 'V4PnXdcJpLBa7Q6YaWgS', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM41-ELIZA-03', src: './assets/audio/characters/eliza/eliza_ch04_scene05_003.mp3', transcript: 'That is not pretending. It is knowing what I can do.', label: 'Replay Eliza', inline: true, generationId: '5MqaYvC8271hjGqW2eW1', assetId: '2GlFLIXJUe22PAEUufGl', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM41-ELIZA-04', src: './assets/audio/characters/eliza/eliza_ch04_scene05_004.mp3', transcript: 'Tonight was not a pass or fail.', label: 'Replay Eliza', inline: true, generationId: 'fpWZcCwH3l780d60v7AV', assetId: 'uZUeKCO8UyXIxbfIvehI', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM41-ELIZA-05', src: './assets/audio/characters/eliza/eliza_ch04_scene05_005.mp3', transcript: 'It showed me what I can practise — and what I can choose.', label: 'Replay Eliza', inline: true, generationId: '7M8JXeT8JFQzjzuKUpyr', assetId: 'EqU3EA2t1KfCTFLz2gBN', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM41-ELIZA-06', src: './assets/audio/characters/eliza/eliza_ch04_scene05_006.mp3', transcript: 'The choice is mine.', label: 'Replay Eliza', inline: true, generationId: '7b76Rzd9SLzxL2tf7IS7', assetId: 'MbUcsgibVnM1TMqxiJG9', voiceId: '124kaYCknTDsnwUFdWl9' }
  ],
  nextScene: 'ch05_s01'
};

export const CH04_S05_TEACHER_SECTIONS = [
  ['Objective', 'Students understand code-switching as a communicative repertoire: speakers can adjust how they speak for context without changing who they are.'],
  ['Key Point', 'A speaker can choose between more careful and more spontaneous speech depending on context. Changing register is not the same as pretending to be a different person.'],
  ['Story Point', 'Eliza begins to treat speech choices as tools she controls rather than rules imposed on her. Careful speech is an available skill, not a superior identity.'],
  ['Equity Notes', 'Accent ≠ intelligence. No single accent or register is appropriate for every context. Successful communication does not require giving up linguistic identity.'],
  ['Discussion Questions', 'When do you change the way you speak, and does that change who you are? Is adapting your speech a skill, a disguise, or can it be both in different situations?'],
  ['Teacher Preview Contract', 'Read-only preview. No autoplay, state writes, completion or progression. The existing D08 choice may be shown only when already present; no default is created.']
];

export const CH04_TEACHER_REFERENCE_AUDIO = {
  id: 'teacher_ref_my_fair_lady_rain_in_spain',
  src: './assets/audio/characters/narrator/ch04_teacher_reference_rain_in_spain_001.mp3',
  transcript: 'The rain in Spain stays mainly in the plain.',
  generationId: 'A2vA6PGvssv3snWNkpym',
  voice: 'Paul M — neutral British narrator'
};

export const CH04_S02_TEACHER_SECTIONS = [
  ['Chapter Overview', 'S02 moves Eliza from lesson-room preparation into a small tea gathering. Her voice-stage is Emerging New Speech, with a more natural rhythm and growing confidence while preserving the same voice identity.'],
  ['Learning Goals', 'Recognise opening, continuing and closing conversational turns; practise small talk about weather, a journey and reading; notice how a closing signal shapes turn-taking.'],
  ['Language Focus', 'Phatic language and short small-talk turns. The social function of a question depends on where it occurs in the exchange.'],
  ['Listening Focus', 'LC11 asks learners to classify one turn at a time as opening, continuing or closing. A missed cue is a learnable communication moment, not an intelligence test.'],
  ['Key Vocabulary', 'weather · journey · guest · reading · answer · story · opening · continuing · closing'],
  ['Cultural / Literary Context', 'Small talk in an Edwardian social setting can express both welcome and class expectations. Accent ≠ intelligence. The later musical adaptation My Fair Lady made Eliza’s phonetic training famous through “The rain in Spain stays mainly in the plain.” This short quote is a reference to the later musical, not text from Shaw’s original play Pygmalion. Our story uses original dialogue, including “It rained on the way here, but today the sky is clearing.” Teachers may compare them to notice the English diphthong /eɪ/. The quote is teacher-facing context only, separate from learner dialogue, LC11 and AM36.'],
  ['Decisions – Teacher Notes', 'The optional post-challenge reply has two equally valid forms, converges immediately and can add Confidence +1 once. It is not a major decision, does not branch later story and does not gate Continue. D08 is preserved and has no S02 effect.'],
  ['Challenge Key', 'lc11_sample_01 = opening; lc11_sample_02 = continuing; lc11_sample_03 = closing. Keep each sample’s transcript hidden until the learner has made an attempt on that sample; then transcript/support and replay are available without penalty. LC11 awards no development signal.'],
  ['Discussion Questions', 'How can you tell that a conversation is beginning, continuing or ending? When might a follow-up question be welcome? What does Eliza choose to notice about the journey and reading?'],
  ['Sensitive Framing', 'Cockney is not defective, upper-class speech is not morally better, and accent is not intelligence. Eliza expands her repertoire without losing her voice.'],
  ['Suggested Classroom Use', 'Classify each turn, then role-play a short exchange that ends with a clear polite closing. Optionally compare the two `/eɪ/` examples as pronunciation observations, never as a required LC11 skill.'],
  ['Scene Navigation', 'S01 opens S02 only after explicit Continue. After all LC11 samples are correct, explicit Continue records ch04_s02_complete once and moves to ch04_s03. The optional reply, replay, Teacher preview and audio completion never navigate automatically.'],
  ['Teacher Preview Contract', 'Teacher preview is read-only for answers, attempts, support use, challenge completion, optional reply, development signals and scene progression. The cultural reference audio is separate from AM35/AM36; it plays only after an explicit Teacher Mode click through the existing foreground audio path. It writes no learner state and triggers no challenge or progression.']
];

export const CH04_S03_TEACHER_SECTIONS = [
  ['Chapter Overview', 'S03 shows a pragmatic misunderstanding after successful pronunciation. Eliza takes a playful remark literally; the story does not frame the moment as an accent problem.'],
  ['Learning Goals', 'Distinguish literal meaning from implied meaning and notice how a speaker can repair a misunderstanding.'],
  ['Key Point', 'Correct pronunciation does not automatically mean correct pragmatic interpretation.'],
  ['Challenge Key', 'LC12 literal: London made a decision about the rain. LC12 implied: It has been raining a lot, and the Guest is joking about it. AM38 is contextual support and is not the sole source of the answer.'],
  ['D09 and equity framing', 'There is no single correct recovery style. rephrase, acknowledge_literal and wait_for_cue are all socially plausible, with different interpersonal tones. Accent ≠ intelligence.'],
  ['Teacher Preview Contract', 'Preview is read-only. It does not autoplay, start ambience, write answers or attempts, use support, award signals, complete challenges or scenes, save decisions, or progress the learner.']
];

export const CH04_S04_TEACHER_SECTIONS = [
  ['Objective', 'Students distinguish language accuracy from pragmatic understanding and reflect on who controls feedback and communication goals.'],
  ['Key language point', 'Clear pronunciation does not guarantee shared meaning. Successful communication also depends on context, audience and implied meaning.'],
  ['Story point', 'Eliza begins to question not only how she speaks, but who decides what her progress is for.'],
  ['Reflection', 'language, audience and feeling are three legitimate reflection focuses. There is no correct answer.'],
  ['Equity', 'Accent ≠ intelligence. Social conventions are learned and culturally variable; misunderstanding them is not evidence of lower ability.'],
  ['Discussion', 'Who should decide what counts as successful communication? Can feedback be useful without becoming a judgment about the person?'],
  ['Teacher Preview Contract', 'Read-only. Preview does not autoplay, write state or reflection, award rewards, complete the scene or progress the learner.']
];

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
