const cutout = (src, alt, placement) => ({ src, alt, placement });

export const CH05_SCENE_01 = {
  id: 'ch05_s01', number: 1, chapter: 'V', chapterTitle: 'The Reception', sceneCount: 5,
  title: 'The Borough Exhibition Evening', kicker: 'Chapter V · The Reception',
  location: 'Lambeth Public Rooms — main exhibition hall', visualStage: 'her_own_voice', voiceStage: 'Her Own Voice',
  composition: 'ch05-exhibition-hall-opening', visualFallback: false,
  background: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  plate: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  eliza: { src: '', alt: '' },
  supporting: [
    cutout('./assets/images/characters/higgins/runtime/higgins_master_cutout.png', 'Henry Higgins stands among the guests.', 'higgins'),
    cutout('./assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png', 'Colonel Pickering stands at the right of the flower display, holding his hat.', 'pickering')
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

export const CH05_SCENE_03 = {
  id: 'ch05_s03', number: 3, chapter: 'V', chapterTitle: 'The Reception', sceneCount: 5,
  title: 'The Display and the Question', kicker: 'Chapter V · The Reception',
  location: 'Lambeth Public Rooms — main flower display', visualStage: 'her_own_voice', voiceStage: 'Her Own Voice',
  composition: 'ch05-exhibition-hall', visualFallback: false,
  background: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  plate: { src: './assets/images/locations/ch05/ch05_exhibition_hall.webp', alt: 'Flower exhibition in Lambeth Public Rooms.' },
  eliza: { src: '', alt: '' }, supporting: [], props: [], voice: [
    {
      id: 'AM47', speaker: 'Patron / guest',
      src: './assets/audio/characters/supporting/guest_ch05_scene03_001.mp3',
      transcript: 'Professor Higgins, Colonel Pickering — you must be proud. What a transformation.',
      inline: true, label: 'Replay Patron / guest',
      generationId: 'hSPlHv3PVWSIERvfWefM', assetId: 'ADJhxP7zMtg5vj6jPHCn',
      voice: 'Ruby Fawcett', voiceId: 'Q6HPFg7bazU61NeyrvBp',
      transcriptVerified: 'PASS', humanApproved: true
    },
    {
      id: 'AM47', speaker: 'Higgins',
      src: './assets/audio/characters/higgins/higgins_ch05_scene03_001.mp3',
      transcript: 'The result speaks for the method.',
      inline: true, label: 'Replay Higgins',
      generationId: 'TvXuEHqKk5tSv3lGKOAB', assetId: 'w0SsT6e6zYt48rD5cluh',
      voice: 'Kelvin', voiceId: 'JlptfLxaUpd8pZcw9dKd',
      transcriptVerified: 'PASS', humanApproved: true
    },
    {
      id: 'AM47', speaker: 'Pickering',
      src: './assets/audio/characters/pickering/pickering_ch05_scene03_001.mp3',
      transcript: 'Eliza has worked very hard.',
      inline: true, label: 'Replay Pickering',
      generationId: 'QNDE4DW5FWZ4Pim19QOc', assetId: 'KfaMb6yBtOo1umTgbICr',
      voice: 'George', voiceId: 'JBFqnCBsd6RMkjVDRZzb',
      transcriptVerified: 'PASS', humanApproved: true
    }
  ],
  storyBeats: [
    { type: 'narration', text: 'The guests have enjoyed the exhibition. One visitor turns to Higgins and Pickering while Eliza stands beside the growers’ work.' },
    { type: 'dialogue', speaker: 'Patron / guest', text: 'Professor Higgins, Colonel Pickering — you must be proud. What a transformation.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'The result speaks for the method.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'Eliza has worked very hard.' },
    { type: 'dialogue', speaker: 'Patron / guest', text: 'It was a remarkable evening for you both.' },
    { type: 'narration', text: 'Pickering gives Eliza credit for her work, but the conversation continues to focus on the two men. Eliza knows what she contributed and decides how she wants to answer.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I know what I contributed.' }
  ],
  decision: {
    id: 'D11', prompt: 'How would Eliza like to respond?',
    neutralChoice: true, hideResult: true, pressedState: true,
    choices: [
      { id: 'd11_accept_for_now', title: 'Accept for now', text: 'Thank you. I would rather speak about the flowers tonight.' },
      { id: 'd11_redirect_publicly', title: 'Redirect publicly', text: 'I learned a great deal, but this evening belongs to the growers — and I made my own choices too.' },
      { id: 'd11_private_conversation', title: 'Speak privately later', text: 'Thank you. I would like to speak about that later, in private.' }
    ]
  },
  nextScene: 'ch05_s04'
};

export const CH05_SCENE_04 = {
  id: 'ch05_s04', number: 4, chapter: 'V', chapterTitle: 'The Reception', sceneCount: 5,
  title: 'What Happens to Me Now?', kicker: 'Chapter V · The Reception',
  location: 'Quiet side room off the exhibition hall', visualStage: 'her_own_voice', voiceStage: 'Her Own Voice',
  composition: 'ch05-side-room', visualFallback: false,
  background: { src: './assets/images/locations/ch05/ch05_lambeth_public_rooms_side_room.webp', alt: 'A quiet side room opening onto the flower exhibition hall.' },
  plate: { src: './assets/images/locations/ch05/ch05_lambeth_public_rooms_side_room.webp', alt: 'A quiet side room opening onto the flower exhibition hall.' },
  eliza: { src: './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png', alt: 'Eliza, thoughtful and composed in her own voice.' },
  supporting: [], props: [], voice: [], audioPending: true,
  nextScene: 'ch05_s05',
  branches: {
    d11_private_conversation: {
      companion: 'Pickering',
      supporting: [cutout('./assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png', 'Colonel Pickering stands opposite Eliza in the side room.', 'pickering')],
      storyBeats: [
        { type: 'dialogue', speaker: 'Pickering', text: 'You wanted to speak privately.' },
        { type: 'dialogue', speaker: 'Eliza', text: "Yes. I know what I can do now. I don't know what happens to me next." },
        { type: 'dialogue', speaker: 'Pickering', text: 'That should not be decided without you. I have sometimes spoken about your work instead of asking what you wanted.' },
        { type: 'dialogue', speaker: 'Eliza', text: 'I need to decide what I want to ask.' },
        { type: 'dialogue', speaker: 'Pickering', text: 'There are several possibilities. Some will depend on money and introductions.' }
      ], context: 'There are several possibilities. Some will depend on money and introductions.',
      itemId: 'lc14_pickering_question_fit', options: [
        { id: 'lc14_pickering_clarify_introductions', text: 'Could you tell me which introductions would actually help?' },
        { id: 'lc14_pickering_ask_programme', text: 'Could you remind me what happened in the programme tonight?' },
        { id: 'lc14_pickering_ask_speech_opinion', text: 'What did you think of the way I spoke this evening?' }
      ], answer: 'lc14_pickering_clarify_introductions'
    },
    d11_accept_for_now: {
      companion: 'Mrs Pearce',
      supporting: [cutout('./assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png', 'Mrs Pearce stands opposite Eliza in the side room.', 'mrs-pearce')],
      storyBeats: [
        { type: 'dialogue', speaker: 'Mrs Pearce', text: "You've gone quiet." },
        { type: 'dialogue', speaker: 'Eliza', text: 'I am thinking about tomorrow.' },
        { type: 'dialogue', speaker: 'Mrs Pearce', text: 'Then tomorrow is worth planning. Start with what you want, not with what they expect.' },
        { type: 'dialogue', speaker: 'Eliza', text: 'I need a little time to put it in order.' },
        { type: 'dialogue', speaker: 'Mrs Pearce', text: "Work is one matter. Where you'll live is another." }
      ], context: "Work is one matter. Where you'll live is another.",
      itemId: 'lc14_mrs_pearce_question_fit', options: [
        { id: 'lc14_pearce_prioritise', text: 'Which should I sort out first, and what can I do myself?' },
        { id: 'lc14_pearce_ask_flowers', text: 'Which flowers did the guests like best?' },
        { id: 'lc14_pearce_ask_general_expectation', text: 'What do people usually expect someone like me to do?' }
      ], answer: 'lc14_pearce_prioritise'
    },
    d11_redirect_publicly: null
  },
  questionStyle: { prompt: 'How would Eliza like to put her question?', choices: [
    { id: 'direct', text: 'What happens to me when this is over?' },
    { id: 'indirect', text: 'Have you thought about what I might do when this is over?' },
    { id: 'plan_focused', text: 'If I want work of my own after this, what should I arrange first?' }
  ] }
};
CH05_SCENE_04.branches.d11_redirect_publicly = CH05_SCENE_04.branches.d11_accept_for_now;

export const CH05_S04_TEACHER_SECTIONS = [
  ['Chapter overview', 'At the flower-growers’ exhibition, Eliza uses language skills she has developed while deciding how to use them. This scene asks what happens next without testing whether she can imitate a class.'],
  ['Learning goals', 'Ask for practical information about a future choice; recognise more than one legitimate next step; keep ownership of the decision with Eliza.'],
  ['Language focus', 'LC14 practises future questions and pragmatic fit. Directness and indirectness are communicative resources, not measures of intelligence or worth.'],
  ['Listening focus', 'LC14 asks for a question that fits a particular information need and listener. Many real phrasings may work; the authored key is contextual rather than a universal ranking.'],
  ['Key vocabulary', 'future · possibility · introduction · work · arrange · question · decide'],
  ['Cultural / literary context', 'This quiet side room is an original element of the adaptation. Discuss work, gender and class expectations without suggesting that a prestigious variety is more intelligent or morally superior.'],
  ['Decisions — Teacher notes', 'The companion is derived from D11: private conversation leads to Pickering; accepting for now or redirecting publicly leads to Mrs Pearce. future_question_style (direct, indirect or plan-focused) remains Eliza’s personal, ungraded choice.'],
  ['Challenge key · LC14', 'Pickering: “Could you tell me which introductions would actually help?” fits his point about money and introductions. Mrs Pearce: “Which should I sort out first, and what can I do myself?” fits the two practical matters she names. Other options ask about a different topic.'],
  ['Support and retry', 'The context transcript can be revealed on request. Incorrect responses can be retried without penalty. LC14 changes no Confidence or Pronunciation and the future style gives no signal or reward.'],
  ['Discussion questions', 'What practical information might help Eliza decide? Who should own that decision? How can a question be direct, indirect or plan-focused without defining the speaker?'],
  ['Sensitive framing', 'Accent ≠ intelligence. Direct is not rude or inferior; indirect is not automatically better or more educated; plan-focused is not objectively best. The companion can frame a question but cannot decide Eliza’s future.'],
  ['Suggested classroom use', 'Compare the Pickering and Mrs Pearce contexts. Identify the immediate information need, then discuss several ways to ask without ranking personal expression styles.'],
  ['Scene navigation', 'ch05_s04 — What Happens to Me Now? · future_question_style · branch-specific LC14 · explicit Continue to the not-yet-implemented ch05_s05 boundary.'],
  ['Teacher preview contract', 'Read-only. Preview uses no learner answer, future question style, completion, reward, progression or audio autoplay.']
];

export const CH05_S04_COMPANION_BY_CREDIT_RESPONSE = Object.freeze({
  d11_private_conversation: 'Pickering',
  d11_accept_for_now: 'Mrs Pearce',
  d11_redirect_publicly: 'Mrs Pearce'
});

export function ch05S04CompanionFor(creditResponse) {
  return CH05_S04_COMPANION_BY_CREDIT_RESPONSE[creditResponse] || null;
}

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

export const CH05_S03_TEACHER_SECTIONS = [
  ['Scene focus', 'The scene asks who receives credit when Eliza’s work is described in public. The guest directs praise toward the two men; Higgins accepts the result as evidence for his method; Pickering partly corrects the framing by recognising Eliza’s hard work.'],
  ['Credit and authorship', 'Receiving help, teaching or support does not mean losing ownership of one’s work. Social framing can assign credit to the person with the most status, even when another person did the work.'],
  ['D11 — Credit Response', 'Eliza may postpone the conversation, redirect credit publicly, or ask to speak privately later. Each is a legitimate strategy. D11 has no single morally correct answer; public response is not inherently braver, privacy is not weakness, and postponement is not failure.'],
  ['Sensitive framing', 'Higgins remains self-assured and focused on method, not a villain. Pickering’s respectful correction is partial and does not resolve the question for Eliza.'],
  ['Teacher preview contract', 'Read-only. Preview does not select D11, write credit_response, change development signals, record completion, play audio or advance the scene.']
];
