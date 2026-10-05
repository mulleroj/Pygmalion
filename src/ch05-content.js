const cutout = (src, alt, placement) => ({ src, alt, placement });

export const CH05_SCENE_01 = {
  id: 'ch05_s01', number: 1, chapter: 'V', chapterTitle: 'The Reception', sceneCount: 5,
  title: 'The Borough Exhibition Evening', kicker: 'Chapter V · The Reception',
  location: 'Lambeth Public Rooms — main exhibition hall', visualStage: 'her_own_voice', voiceStage: 'Her Own Voice',
  composition: 'ch05-exhibition-hall', visualFallback: true,
  background: { src: '', alt: '' }, plate: { src: '', alt: '' },
  eliza: { src: '', alt: '' },
  supporting: [
    cutout('./assets/images/characters/higgins/runtime/higgins_master_cutout.png', 'Henry Higgins stands among the guests.', 'higgins'),
    cutout('./assets/images/characters/pickering/runtime/pickering_master_cutout.png', 'Colonel Pickering stands near the flower display.', 'pickering')
  ], props: [], voice: [],
  storyBeats: [
    { type: 'narration', text: 'Warm lamps light the exhibition hall. Flower growers stand beside their displays. Eliza has a place in the programme, and the organiser comes to speak with her.' },
    { type: 'dialogue', speaker: 'Organiser', text: 'Miss Doolittle, the growers are ready. Would you like to begin?' },
    { type: 'narration', text: 'Eliza looks at the organiser, a patron near the display, and one of the flower workers. She considers how she wants to speak with each person.' },
    { type: 'd10Decision' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Yes. And please introduce them by name. The work is theirs.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Keep it simple. Speak as we practised.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I shall speak as the room requires.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'The growers have done careful work.' },
    { type: 'narration', text: 'The organiser turns towards the guests. Eliza has not been introduced as anyone’s experiment. The room begins to fill, and several conversations start at once.' }
  ],
  decision: {
    id: 'D10', prompt: 'How would you like to begin with the people here?',
    labelOnly: true, neutralChoice: true, hideResult: true, pressedState: true,
    choices: [
      { id: 'd10_tailor_by_role', title: 'I will use a more formal register with the organiser and patron, and speak more naturally with a fellow flower worker.' },
      { id: 'd10_listen_then_adjust', title: 'I will begin carefully and adjust after I hear how each person speaks to me.' },
      { id: 'd10_keep_core_voice', title: 'I will keep my core voice with everyone, changing only greetings, politeness and detail.' }
    ]
  },
  nextScene: 'ch05_s02'
};

export const CH05_S01_TEACHER_SECTIONS = [
  ['Scene focus', 'Register is a deliberate communication choice. Different contexts may call for different language, and code-switching is part of a communicative repertoire.'],
  ['Sensitive framing', 'Register is not personal worth. Accent is not intelligence. Do not describe one voice as inherently better or more correct.'],
  ['D10 — Reception Register Plan', 'D10 asks how Eliza would like to begin with different people in the room. Tailoring by role, listening then adjusting, and keeping a core voice while adapting greetings, politeness and detail are all valid. There is no single correct answer, answer key, score or reward.'],
  ['Teacher preview contract', 'Read-only preview. No autoplay, state writes, decision changes, rewards, completion events or progression.']
];
