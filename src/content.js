export const ASSET_ROOT = './assets/';

const image = (path, alt) => ({ src: `${ASSET_ROOT}${path}`, alt });
const audio = (path, transcript, label) => ({ src: `${ASSET_ROOT}${path}`, transcript, label });

export const STORY_VOICE = {
  s01: audio('audio/characters/eliza/eliza_ch01_scene01_001.mp3', "Flowers, sir? Fresh ones! Ain't no sense standin' there in the rain. Go on. A flower'll make the room look kinder. Two for a penny, they are. I'll pick you the bright ones.", 'Play Eliza’s sales pitch'),
  s02: audio('audio/characters/freddy/freddy_ch01_scene02_001.mp3', "Oh! I'm sorry. I didn't see the basket. I can pay for the damaged ones.", 'Play Freddy’s apology'),
  s03h: audio('audio/characters/higgins/higgins_ch01_scene03_001.mp3', "Your speech carries a local pattern. I can hear where a person has learned to live. I can hear several things at once. It's interesting. Perhaps I could. That's fair. I'm Henry Higgins.", 'Play Higgins’s observation'),
  s03e: audio('audio/characters/eliza/eliza_ch01_scene03_001.mp3', "I ain't done nothing wrong. I'm a good girl, I am.", 'Play Eliza’s signature line'),
  s04h: audio('audio/characters/higgins/higgins_ch01_scene04_001.mp3', "Listen to who is speaking, where they are, and what they want. A voice gives clues, but it doesn't tell you everything. Yes. That's why you ask.", 'Play Higgins’s listening guidance'),
  s04p: audio('audio/characters/pickering/pickering_ch01_scene04_001.mp3', "And the clues can be wrong. What do you think, Eliza?", 'Play Pickering’s response'),
  s05: audio('audio/characters/eliza/eliza_ch01_scene05_001.mp3', "People hear how I talk before they see what I can do. Maybe if I could talk another way, it'd open a door or two. Wouldn't make me worth more. Just give me another way to make 'em listen.", 'Play Eliza’s reflection')
};

export const LISTENING = {
  lc01: [
    { id: 'lc01_01', src: `${ASSET_ROOT}audio/listening/ch01_lc01_001.mp3`, transcript: "I'm sorry. I wasn't looking where I was going.", answer: 'apology', prompt: 'The speaker accepts responsibility.' },
    { id: 'lc01_02', src: `${ASSET_ROOT}audio/listening/ch01_lc01_002.mp3`, transcript: "It was the rain. Anyone could've slipped.", answer: 'excuse', prompt: 'The speaker explains the situation.' },
    { id: 'lc01_03', src: `${ASSET_ROOT}audio/listening/ch01_lc01_003.mp3`, transcript: "I'll pick these up and pay for the damaged ones.", answer: 'intention to repair', prompt: 'The speaker promises a concrete action.' }
  ],
  lc02: [
    {
      id: 'lc02_sample_01', src: `${ASSET_ROOT}audio/listening/ch01_lc02_001.mp3`, transcript: 'Could you wait by the door, please? I need both hands.', answer: 'lc02_s01_worker_request',
      options: [
        ['lc02_s01_worker_request', 'A worker asks someone nearby to wait while she carries something.'],
        ['lc02_s01_formal_question', 'A speaker asks a stranger whether a meeting has started.'],
        ['lc02_s01_urgent_command', 'A market worker orders a stranger to move away.']
      ]
    },
    {
      id: 'lc02_sample_02', src: `${ASSET_ROOT}audio/listening/ch01_lc02_002.mp3`, transcript: "Oi, Sam, hold the cart! I'm coming through.", answer: 'lc02_s02_familiar_instruction',
      options: [
        ['lc02_s02_formal_information', 'A speaker politely asks a stranger about a meeting.'],
        ['lc02_s02_familiar_instruction', 'A familiar co-worker gives a quick instruction in a busy market.'],
        ['lc02_s02_apology_repair', 'A speaker apologises to a customer and offers to pay.']
      ]
    },
    {
      id: 'lc02_sample_03', src: `${ASSET_ROOT}audio/listening/ch01_lc02_003.mp3`, transcript: 'Good evening. May I ask whether the meeting has started?', answer: 'lc02_s03_formal_question',
      options: [
        ['lc02_s03_familiar_instruction', 'A friend gives an urgent instruction beside a market cart.'],
        ['lc02_s03_worker_request', 'A worker asks someone to wait while she carries something.'],
        ['lc02_s03_formal_question', 'A speaker politely asks an unfamiliar person for information.']
      ]
    }
  ]
};

const canonical = (path, alt) => image(path, alt);
const runtimeCutout = (path, alt) => image(path, alt);

export const VISUALS = {
  master: canonical('images/characters/eliza/eliza_flower-girl_master.webp', 'Eliza in her canonical Flower Girl stage, with expressive eyes, slightly wavy dark-blond hair, practical Edwardian clothing, and a flower basket.'),
  alert: runtimeCutout('images/characters/eliza/runtime/eliza_flower-girl_alert_cutout.png', 'Eliza looks alert and lively across the market, with one hand near her flower basket.'),
  defiant: runtimeCutout('images/characters/eliza/runtime/eliza_flower-girl_defiant_cutout.png', 'Eliza faces Freddy with a proud, direct, protective expression beside the fallen flowers.'),
  guarded: runtimeCutout('images/characters/eliza/runtime/eliza_flower-girl_guarded_cutout.png', 'Eliza watches Higgins’s notebook with a guarded, observant expression.'),
  listening: runtimeCutout('images/characters/eliza/runtime/eliza_flower-girl_listening_cutout.png', 'Eliza turns toward a listening sample with a concentrated, attentive gaze.'),
  thoughtful: runtimeCutout('images/characters/eliza/runtime/eliza_flower-girl_thoughtful_cutout.png', 'Eliza looks toward a flower-shop window, reflective and purposeful.'),
  higgins: runtimeCutout('images/characters/higgins/runtime/higgins_master_cutout.png', 'Henry Higgins, an intelligent Edwardian gentleman holding his notebook.'),
  pickering: runtimeCutout('images/characters/pickering/runtime/pickering_master_cutout.png', 'Colonel Pickering, a mature and respectful British gentleman under the portico.'),
  freddy: runtimeCutout('images/characters/freddy/runtime/freddy_master_cutout.png', 'Freddy, a young British gentleman with a sincere and apologetic presence.'),
  rainWide: canonical('images/locations/ch01/covent-garden-rain-wide.webp', 'Covent Garden market in rain, with wet paving, market movement, and a portico edge.'),
  portico: canonical('images/locations/ch01/portico-rain.webp', 'A sheltered portico with visible rain beyond, suitable for the market encounter.'),
  shop: canonical('images/locations/ch01/flower-shop-window-dusk.webp', 'A warm, grounded flower-shop window at dusk in Covent Garden.'),
  basket: canonical('images/props/ch01/flower-basket.webp', 'A practical woven basket filled with flowers.'),
  fallen: runtimeCutout('images/props/ch01/runtime/fallen-flowers-wet_cutout.png', 'Damaged stems, petals, wrapping paper, and an overturned basket after the market accident.'),
  notebook: canonical('images/props/ch01/higgins-notebook.webp', 'A research notebook with observations about speech.')
};

const choice = (id, title, text) => ({ id, title, text });

export const SCENES = [
  {
    id: 'ch01_s01', number: 1, title: 'Under the Portico', kicker: 'The Flower Girl',
    background: VISUALS.rainWide, plate: VISUALS.portico, eliza: VISUALS.alert, props: [], supporting: [],
    narration: ['Rain turns the paving stones bright. Under the portico, people wait, hurry, and try not to get wet. Eliza keeps her basket close and watches every possible customer.'],
    dialogue: [
      ['Eliza', "Flowers, sir? Fresh ones! Ain't no sense standin' there in the rain."],
      ['Eliza', "Go on. A flower'll make the room look kinder."],
      ['Eliza', "Two for a penny, they are. I'll pick you the bright ones."],
      ['Passer-by', 'Not today, girl. I have no time.'],
      ['Eliza', "Then have one little flower. Won't slow you down."],
      ['Passer-by', "You're quick with an answer."],
      ['Eliza', "Got to be quick, ain't I? Rain don't wait, and neither do customers."]
    ],
    voice: [STORY_VOICE.s01],
    openingTones: [
      choice('bright', 'Bright', 'A flower for your coat, sir? Make the walk less grey, it will.'),
      choice('practical', 'Practical', 'Penny a flower. Quick as that.'),
      choice('defensive', 'Defensive', "You looked at 'em. Don't go saying they ain't worth seeing.")
    ],
    transition: 'Freddy hurries under the portico. The crowd shifts. Eliza lifts her basket — and a shoulder catches it.'
  },
  {
    id: 'ch01_s02', number: 2, title: 'The Fallen Flowers', kicker: 'A moment under pressure',
    background: VISUALS.rainWide, plate: VISUALS.portico, eliza: VISUALS.defiant, props: [VISUALS.fallen], supporting: [VISUALS.freddy],
    narration: ['Freddy stops too late. Flowers fall across the wet stones. A few petals stick to the mud. Eliza moves first: she protects the flowers, then looks up at him.'],
    dialogue: [['Freddy', "Oh! I'm sorry. I didn't see the basket."], ['Eliza', "The rain ain't gonna pick 'em up for me."], ['Freddy', 'I can pay for the damaged ones.'], ['Eliza', "Then mind where you're going next time."]],
    voice: [STORY_VOICE.s02],
    decision: { id: 'D01', prompt: "Freddy is waiting. Choose Eliza's next reply.", choices: [
      choice('d01_ask_help', 'Ask for help', 'Give us a hand, will you? Clean ones go back in the basket.'),
      choice('d01_name_damage', 'Name the damage', "You knocked 'em down. Look at the stems. I can't sell 'em like that."),
      choice('d01_accept_and_work', 'Accept the apology and return to work', "All right, you're sorry. I'll get 'em up and get back to work.")
    ]},
    consequence: {
      d01_ask_help: 'Freddy kneels and helps sort the flowers. Eliza keeps the exchange focused on repair.',
      d01_name_damage: 'Freddy looks at the broken stems and offers payment. Eliza makes the cost visible before she moves on.',
      d01_accept_and_work: 'Freddy steps aside while Eliza restores the basket. She protects the next sale by ending the delay quickly.'
    },
    challenge: { id: 'LC01', title: 'Apology, excuse, intention', kind: 'lc01', intro: 'Freddy is trying to explain what happened. Listen for whether he accepts responsibility, gives an explanation, or promises an action.' },
    sfx: { id: 'flowers_fall', src: `${ASSET_ROOT}audio/sfx/flowers-fall-001.mp3`, label: 'Play the fallen flowers sound' },
    transition: 'The last clean flowers are back in the basket. A man nearby has not been watching the flowers. He has been writing.'
  },
  {
    id: 'ch01_s03', number: 3, title: 'The Notebook', kicker: 'Who gets to be observed?',
    background: VISUALS.rainWide, plate: VISUALS.portico, eliza: VISUALS.guarded, props: [VISUALS.notebook], supporting: [VISUALS.higgins, VISUALS.freddy, VISUALS.pickering],
    narration: ['Higgins closes his notebook halfway, as if that makes the watching less obvious. It does not. Eliza sees the pencil, the wet page, and the line of marks beside her words.'],
    dialogue: [
      ['Higgins', 'Your speech carries a local pattern. I can hear where a person has learned to live.'],
      ['Eliza', "Can you hear when someone's trying to sell flowers in the rain, can you?"],
      ['Higgins', "I can hear several things at once. It's interesting."],
      ['Eliza', "I ain't no pattern on your page."],
      ['Higgins', "No. But your voice tells me something. That's why I wrote it down."],
      ['Eliza', "I ain't done nothing wrong. I'm a good girl, I am."],
      ['Freddy', 'Sir, perhaps you could ask before you write.'],
      ['Higgins', "Perhaps I could. That's fair. I'm Henry Higgins."],
      ['Pickering', "Good evening. I'm Pickering. What are you writing?"],
      ['Higgins', "I'm studying how people speak across the city."],
      ['Pickering', 'Have you asked her?']
    ],
    voice: [STORY_VOICE.s03h, STORY_VOICE.s03e],
    decision: { id: 'D02', prompt: 'Higgins has written about your speech without asking. What does Eliza do?', choices: [
      choice('d02_direct_question', 'Ask directly', "Why d'you want to write down the way I talk?"),
      choice('d02_request_explanation', 'Request an explanation', "What d'you want to learn off me? Tell me straight."),
      choice('d02_reject_and_return', 'Reject the observation', "Write what you like. I've got flowers to sell, and I'm getting back to 'em.")
    ]},
    consequence: {
      d02_direct_question: 'Higgins answers the question and admits that his notes are not permission.',
      d02_request_explanation: 'Higgins explains that he is comparing speech patterns, while Pickering asks him to explain without turning Eliza into an object.',
      d02_reject_and_return: 'Eliza turns back to her basket. Higgins stops writing for the moment.'
    },
    transition: 'The rain makes a soft wall around the portico. Higgins looks at the notebook. Pickering looks at the people.'
  },
  {
    id: 'ch01_s04', number: 4, title: "Higgins' Ear", kicker: 'Listen for context, not intelligence',
    background: VISUALS.rainWide, plate: VISUALS.portico, eliza: VISUALS.listening, props: [], supporting: [VISUALS.higgins, VISUALS.pickering],
    narration: ['Higgins turns the notebook so Pickering can see it. Three brief voices rise above the rain. The task is not to rank the speakers. It is to hear what each person is trying to do in a particular situation.'],
    dialogue: [['Higgins', "Listen to who is speaking, where they are, and what they want. A voice gives clues, but it doesn't tell you everything."], ['Pickering', 'And the clues can be wrong.'], ['Higgins', "Yes. Context matters. So does asking."], ['Pickering', 'What do you think, Eliza?'], ['Eliza', 'I reckon people hear what they expect to hear.'], ['Higgins', "Perhaps. That's worth writing down."]],
    voice: [STORY_VOICE.s04h, STORY_VOICE.s04p],
    challenge: { id: 'LC02', title: "First Higgins' Ear listening challenge", kind: 'lc02', intro: 'Listen to each sample. Choose the best description of the situation and intention. Do not choose an answer about intelligence or a “correct” accent.' },
    transition: 'The rain thins. Across the street, warm light appears in a flower-shop window.'
  },
  {
    id: 'ch01_s05', number: 5, title: 'A Window of Possibility', kicker: 'A reason to keep going',
    background: VISUALS.shop, plate: VISUALS.shop, eliza: VISUALS.thoughtful, props: [], supporting: [],
    narration: ['The rain has softened to a mist. Eliza stands before a flower-shop window. Inside, the flowers are arranged for people who have time to choose. She studies the door, the counter, and the language written on the small sign.'],
    dialogue: [['Eliza', "Look at that window. Them flowers ain't hiding from nobody."], ['Eliza', "People hear how I talk before they see what I can do."], ['Eliza', "Maybe if I could talk another way, it'd open a door or two. Wouldn't make me worth more. Just give me another way to make 'em listen."], ['Freddy', 'What would you do if the door opened?'], ['Eliza', "I'd make my own mind up what to say before I walked through."]],
    voice: [STORY_VOICE.s05],
    decision: { id: 'D03', prompt: 'Why does Eliza want more ways to speak? Choose the motivation that feels true at the end of Chapter I.', choices: [
      choice('opportunity', 'Opportunity', 'I want to speak in a way that gets me better work and a proper chance.'),
      choice('respect', 'Respect', "I want 'em to hear me before they decide what I am."),
      choice('learning', 'Learning', 'I want to learn how they talk, then choose what suits me.'),
      choice('independence', 'Independence', 'I want more ways to speak so nobody gets to choose my future but me.')
    ]},
    consequence: {},
    chapterEnd: ["Tomorrow, I'll find that door myself. If they're going to teach me, they'll hear what I'm asking for first.", 'The flower-shop lights stay on as Covent Garden grows dark. Eliza leaves the window with a plan—and a question about the price of being heard.']
  }
];

export const TEACHER_SECTIONS = [
  ['Chapter Overview', 'Eliza sells flowers in rainy Covent Garden and meets Freddy, Higgins, and Pickering. The chapter is about access and agency, not correction of a person.'],
  ['Learning Goals', 'Recognise apology, excuse, and intention to repair; make or understand direct and polite requests; use context and purpose; distinguish accent, dialect, and register; name a personal motivation.'],
  ['Language Focus', "Vocabulary: flower, basket, rain, market, apology, excuse, repair, opportunity, respect. Functional language: Give us a hand, will you? Why d'you…? Tell me straight. I've got… I'll… Eliza uses features of informal working-class London English in her Flower Girl stage. These forms are part of character, identity, register and dialect. They must not be presented as evidence of lower intelligence."],
  ['Listening Focus', 'Listen for responsibility, explanation, promised action, relationship, setting, and purpose. A speech pattern may give a clue, but an inference can be incomplete or wrong.'],
  ['Key Vocabulary', 'flower · basket · drop · stem · rain · market · apology · excuse · repair · listen · register · context · intention · opportunity · respect · learning · independence'],
  ['Cultural / Literary Context', 'This is an original educational adaptation inspired primarily by George Bernard Shaw’s public-domain play Pygmalion. Discuss markets, work, class, access to education, and the difference between describing a language feature and judging a person.'],
  ['Decisions – Teacher Notes', 'D01, D02, and D03 are all open, legitimate choices. D01 and D02 record local narrative strategies; D03 records origin_motivation. None is a moral or intelligence ranking.'],
  ['Challenge Key', 'LC01: apology = responsibility, excuse = explanation, intention to repair = concrete action. LC02: listen for action, relationship, setting, and purpose. Answer keys are kept here, outside student play.'],
  ['Discussion Questions', 'Why do people make quick judgments from the way someone speaks? Can a direct request still be polite? How is hearing a dialect different from judging a person? What could each motivation mean for Eliza?'],
  ['Sensitive Framing', 'Accent ≠ intelligence. Cockney is not broken or unintelligent English. Standard pronunciation is not a measure of human value. Prefer different register, clear in this context, and another way to be heard.'],
  ['Suggested Classroom Use', 'Use the sales pitch, D01, one or all LC01 items, LC02 in groups of three, and D03 as a private or shared reflection. Approximate timing: 20–30 minutes gameplay plus 10 minutes discussion.'],
  ['Scene Navigation', 'Under the Portico · The Fallen Flowers (D01, LC01) · The Notebook (D02) · Higgins’ Ear (LC02) · A Window of Possibility (D03). Teacher preview and replay are read-only.']
];

export const SCENE_BY_ID = Object.fromEntries(SCENES.map((scene) => [scene.id, scene]));
export const DECISION_COUNT = 3;
export const CHALLENGE_COUNT = 2;
export const STORY_VOICE_COUNT = 7;
export const AUDIO_FILES = [
  'audio/ambience/covent-garden-rain-market-001.mp3',
  'audio/ambience/covent-garden-evening-001.mp3',
  'audio/sfx/flowers-fall-001.mp3',
  'audio/characters/eliza/eliza_ch01_scene01_001.mp3',
  'audio/characters/freddy/freddy_ch01_scene02_001.mp3',
  'audio/characters/eliza/eliza_ch01_scene03_001.mp3',
  'audio/characters/higgins/higgins_ch01_scene03_001.mp3',
  'audio/characters/higgins/higgins_ch01_scene04_001.mp3',
  'audio/characters/pickering/pickering_ch01_scene04_001.mp3',
  'audio/characters/eliza/eliza_ch01_scene05_001.mp3',
  'audio/listening/ch01_lc01_001.mp3',
  'audio/listening/ch01_lc01_002.mp3',
  'audio/listening/ch01_lc01_003.mp3',
  'audio/listening/ch01_lc02_001.mp3',
  'audio/listening/ch01_lc02_002.mp3',
  'audio/listening/ch01_lc02_003.mp3'
];

export const VISUAL_FILES = Object.values(VISUALS).map((asset) => asset.src.replace(/^\.\/assets\//, ''));

export function ambienceForScene(sceneId) {
  if (['ch03_s01', 'ch03_s02', 'ch03_s03', 'ch03_s04'].includes(sceneId)) return 'ch03_lesson_room';
  if (sceneId.startsWith('ch03_')) return null; // Later Chapter III ambience is not specified.
  if (sceneId === 'ch02_s01') return 'higgins_house_morning_entry';
  if (['ch02_s02', 'ch02_s03', 'ch02_s04', 'ch02_s05'].includes(sceneId)) return 'higgins_house_interior';
  if (sceneId.startsWith('ch02_')) return null;
  return sceneId === 'ch01_s05' ? 'covent_garden_evening_light_rain' : 'covent_garden_rain_market';
}

export function isContinuousAmbienceTransition(fromSceneId, toSceneId) {
  const rainScenes = new Set(['ch01_s01', 'ch01_s02', 'ch01_s03', 'ch01_s04']);
  const interiorScenes = new Set(['ch02_s02', 'ch02_s03', 'ch02_s04', 'ch02_s05']);
  const lessonScenes = new Set(['ch03_s01', 'ch03_s02', 'ch03_s03', 'ch03_s04']);
  return (rainScenes.has(fromSceneId) && rainScenes.has(toSceneId))
    || (interiorScenes.has(fromSceneId) && interiorScenes.has(toSceneId))
    || (lessonScenes.has(fromSceneId) && lessonScenes.has(toSceneId));
}
