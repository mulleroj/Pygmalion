const cutout = (src, alt, placement) => ({ src, alt, placement });

export const CH05_SCENE_01 = {
  id: 'ch05_s01', number: 1, chapter: 'V', chapterTitle: 'The Reception', sceneCount: 5,
  title: 'The Borough Exhibition Evening', kicker: 'Chapter V · The Reception',
  location: 'Lambeth Public Rooms — main exhibition hall', visualStage: 'her_own_voice', voiceStage: 'Her Own Voice',
  composition: 'ch05-exhibition-hall', visualFallback: false,
  background: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  plate: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  eliza: { src: '', alt: '' },
  supporting: [
    cutout('./assets/images/characters/higgins/runtime/higgins_master_cutout.png', 'Henry Higgins stands among the guests.', 'higgins'),
    cutout('./assets/images/characters/pickering/runtime/pickering_master_cutout.png', 'Colonel Pickering stands near the flower display.', 'pickering')
  ], props: [], voice: [{
    id: 'AM43', speaker: 'Organiser',
    src: './assets/audio/characters/supporting/organizer_ch05_scene01_001.mp3',
    transcript: 'Miss Doolittle, the growers are ready. Would you like to begin?',
    inline: true, label: 'Replay organiser',
    generationId: 'wBtfcWtx0WTT4DxtPnKR', assetId: '30yI9UQNQKzklOXBU7OC',
    voice: 'Cass — Warm and Energetic British Woman', voiceId: 'ITRml9f5K7moz24wRnmV',
    transcriptVerified: 'PASS', humanApproved: true
  }],
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

const lc13RelationshipOptions = [
  { id: 'lc13_professional_organiser_to_participant', label: 'Professional organiser → participant' },
  { id: 'lc13_distant_guest_to_eliza', label: 'Socially distant guest → Eliza' },
  { id: 'lc13_peer_colleague', label: 'Peer / fellow flower worker' }
];
const lc13PurposeOptions = [
  { id: 'lc13_coordination_request', label: 'Coordinate an introduction' },
  { id: 'lc13_compliment_and_information_request', label: 'Compliment the display and ask for local information' },
  { id: 'lc13_practical_request', label: 'Practical request about table labels' }
];
const lc13FormalityOptions = [
  { id: 'lc13_polite_professional', label: 'Polite professional' },
  { id: 'lc13_polite_relatively_formal', label: 'Polite / relatively formal' },
  { id: 'lc13_informal_familiar', label: 'Informal / familiar' }
];

export const CH05_SCENE_02 = {
  id: 'ch05_s02', number: 2, chapter: 'V', chapterTitle: 'The Reception', sceneCount: 5,
  title: 'Listening Under Pressure', kicker: 'Chapter V · The Reception',
  location: 'Lambeth Public Rooms — exhibition hall', visualStage: 'her_own_voice', voiceStage: 'Her Own Voice',
  composition: 'ch05-exhibition-hall', visualFallback: false,
  background: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  plate: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  eliza: { src: '', alt: '' }, supporting: [], props: [], voice: [],
  storyBeats: [
    { type: 'narration', text: 'A few conversations overlap near the flower tables. Eliza can hear a request from the organiser, a question from a guest, and a practical question from a fellow worker. The words and the situation both matter.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I will listen, then choose who needs an answer first.' },
    { type: 'narration', text: 'When she is ready, Eliza chooses whose request to answer first.' }
  ],
  localFirstResponse: {
    prompt: 'Who should Eliza answer first?',
    choices: [
      { id: 'organiser', label: 'The organiser', text: 'Of course. I can introduce them when he arrives.' },
      { id: 'guest', label: 'The guest', text: 'The growers can tell you which varieties are local.' },
      { id: 'colleague', label: 'Her colleague', text: 'I will look with you.' }
    ],
    followUp: 'The short exchanges continue. Eliza follows the meaning and the person, not a rule that one accent carries more authority.'
  },
  challenge: {
    id: 'LC13', kind: 'lc13', title: 'Social Inference',
    intro: 'Read each exchange, then identify the relationship, purpose and formality that fit its context. These are clues about this situation, not a judgement of anyone’s voice or worth.',
    supportLabel: 'Open text support',
    dimensions: [
      { id: 'relationship', label: 'Who is speaking to Eliza?', options: lc13RelationshipOptions },
      { id: 'purpose', label: 'What is the speaker doing?', options: lc13PurposeOptions },
      { id: 'formality', label: 'What register fits this exchange?', options: lc13FormalityOptions }
    ],
    samples: [
      { id: 'lc13_organiser', speaker: 'Organiser', transcript: 'Miss Doolittle, could you introduce the growers when the chairman arrives?', src: './assets/audio/listening/ch05_lc13_sample_01.mp3', generationId: 'JhY1BQPVinsEFM2fiC16', assetId: 'h22q8i8YFxqLA7VQEeWI', voice: 'Cass', voiceId: 'ITRml9f5K7moz24wRnmV', humanApproved: true, transcriptVerified: 'PASS', answer: {
        relationship: 'lc13_professional_organiser_to_participant', purpose: 'lc13_coordination_request', formality: 'lc13_polite_professional'
      }, context: 'A professional organiser is coordinating a future introduction with a participant in the programme.' },
      { id: 'lc13_patron', speaker: 'Patron / guest', transcript: 'A remarkable display. Which of these varieties are grown locally?', src: './assets/audio/listening/ch05_lc13_sample_02.mp3', generationId: 'Az8yexdf4ShuuXlfK6Sf', assetId: 'do8fZE9x9HFvwTtqOmhV', voice: 'Ruby Fawcett', voiceId: 'Q6HPFg7bazU61NeyrvBp', humanApproved: true, transcriptVerified: 'PASS', answer: {
        relationship: 'lc13_distant_guest_to_eliza', purpose: 'lc13_compliment_and_information_request', formality: 'lc13_polite_relatively_formal'
      }, context: 'A socially distant guest compliments the display and asks Eliza for local information.' },
      { id: 'lc13_colleague', speaker: 'Flower-worker colleague', transcript: 'Eliza, have you seen the labels for our table?', src: './assets/audio/listening/ch05_lc13_sample_03.mp3', generationId: 'tiPnYGA7SWDK0h9RTrw6', assetId: '0lpUjbOMjBkwLmdY7htB', voice: 'Hugo', voiceId: 'WAppqUXeqDqXjNTaQxG9', humanApproved: true, transcriptVerified: 'PASS', answer: {
        relationship: 'lc13_peer_colleague', purpose: 'lc13_practical_request', formality: 'lc13_informal_familiar'
      }, context: 'A fellow flower worker asks Eliza a practical question about their table labels.' }
    ],
    incorrectFeedback: 'That choice may fit a different exchange. Consider who is speaking, what they want, and the situation; you can try again or open the text support.',
    completionText: 'LC13 complete. You used relationship, purpose and context to interpret all three exchanges. No development signal changed.'
  },
  nextScene: 'ch05_s03'
};

export const CH05_S01_TEACHER_SECTIONS = [
  ['Scene focus', 'Register is a deliberate communication choice. Different contexts may call for different language, and code-switching is part of a communicative repertoire.'],
  ['Sensitive framing', 'Register is not personal worth. Accent is not intelligence. Do not describe one voice as inherently better or more correct.'],
  ['D10 — Reception Register Plan', 'D10 asks how Eliza would like to begin with different people in the room. Tailoring by role, listening then adjusting, and keeping a core voice while adapting greetings, politeness and detail are all valid. There is no single correct answer, answer key, score or reward.'],
  ['Teacher preview contract', 'Read-only preview. No autoplay, state writes, decision changes, rewards, completion events or progression.']
];

export const CH05_S02_TEACHER_SECTIONS = [
  ['Scene focus', 'Eliza hears several requests during the exhibition. LC13 asks learners to infer relationship, purpose and formality from each exchange and its context.'],
  ['Learning goals', 'Infer who is speaking to Eliza, what the person wants, and how the relationship and situation shape a suitable register.'],
  ['Language focus', 'Notice professional coordination, a compliment followed by an information request, and a practical peer request. Context-dependent register is a communicative resource.'],
  ['Listening focus', 'Inference is contextual and can remain uncertain. Consider wording, relationship and situation together; politeness and status do not prove intelligence or truth.'],
  ['Key vocabulary', 'organiser · participant · guest · display · variety · locally grown · colleague · labels · introduction'],
  ['Cultural / literary context', 'This is an original public exhibition scene in Lambeth Public Rooms. A socially distant guest, professional organiser and fellow worker have different relationships to Eliza without representing different human worth.'],
  ['Decision notes', 'The first-responder choice is temporary, has no answer key, does not persist and does not gate LC13 or Continue. All three replies return to the same scene.'],
  ['LC13 answer key', 'Organiser: professional organiser → participant; coordinate an introduction; polite professional. Patron / guest: socially distant guest → Eliza; compliment plus local-information request; polite / relatively formal. Flower-worker colleague: peer / colleague; practical request about table labels; informal / familiar. This assesses contextual inference, not identity.'],
  ['Support and retry', 'Each exchange has an explicit text-support control. Support is available before an attempt; incorrect answers can be retried. Neither support nor retry carries a penalty. LC13 changes no development signal.'],
  ['Discussion questions', 'Which clues tell you what the speaker needs? How does the relationship shape the exchange? Can a polite request use more than one register?'],
  ['Sensitive framing', 'Accent ≠ intelligence. Register ≠ personal worth. Do not label formal speech as smarter or familiar speech as worse. The challenge evaluates inference in context, not a person or identity.'],
  ['Teacher preview contract', 'Read-only. Preview does not open support, write LC13 answers, change the local response, award signals, complete the challenge or advance the scene.'],
  ['Scene navigation', 'Listening Under Pressure · LC13 social inference · temporary first-responder choice · explicit Continue to the not-yet-implemented S03 boundary.']
];
