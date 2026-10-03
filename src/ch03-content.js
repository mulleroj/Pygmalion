// Locked Chapter III scene content; new objective audio is intentionally not bundled here.
export const CH03_SCENE_01 = {
  "id": "ch03_s01",
  "number": 1,
  "chapter": "III",
  "chapterTitle": "The Lessons",
  "sceneCount": 6,
  "title": "The Mouth Is a Muscle",
  "kicker": "The first practical lesson",
  "visualStage": "in_training",
  "composition": "ch03-lesson",
  "background": {
    "src": "./assets/images/locations/ch02/ch02_higgins-study.webp",
    "alt": "Morning light in Higgins’s study, with a desk, books and fireplace."
  },
  "plate": {
    "src": "./assets/images/locations/ch02/ch02_higgins-study.webp",
    "alt": "Morning light in Higgins’s study, with a desk, books and fireplace."
  },
  "eliza": {
    "src": "./assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png",
    "alt": "Eliza in practical indoor lesson clothes looks attentively to one side, with one hand lightly near her chin."
  },
  "supporting": [
    {
      "src": "./assets/images/characters/higgins/runtime/higgins_master_cutout.png",
      "alt": "Higgins supports the lesson from behind the desk.",
      "placement": "higgins"
    }
  ],
  "props": [],
  "voice": [
  {
    "id": "AM21-HIGGINS-MODEL",
    "src": "./assets/audio/characters/higgins/higgins_ch03_scene01_001.mp3",
    "transcript": "For /θ/, bring the tip of your tongue lightly to your front teeth. Let the air flow. For /f/, your upper teeth meet your lower lip. Try ‘thin’ slowly.",
    "label": "Play Higgins’s explanation",
    "inline": true,
    "generationId": "tkmSbcYFwIZyebvZrlSL",
    "voiceId": "JlptfLxaUpd8pZcw9dKd"
  },
  {
    "id": "AM21-ELIZA-ATTEMPT",
    "src": "./assets/audio/characters/eliza/eliza_ch03_scene01_001.mp3",
    "transcript": "Thin... I'm watching my tongue. It feels strange, but I can try it.",
    "label": "Play Eliza’s attempt",
    "inline": true,
    "generationId": "v2j1QzbgqYj86XuXDK6j",
    "voiceId": "124kaYCknTDsnwUFdWl9"
  }
],
  "storyBeats": [
    {
      "type": "narration",
      "text": "Morning light falls across the desk. Eliza puts the lesson schedule beside a small mirror. She has chosen to be here. Now she wants to know what the work will feel like."
    },
    {
      "type": "callback"
    },
    {
      "type": "dialogue",
      "speaker": "Eliza",
      "text": "I know why I'm here. Show me what my mouth needs to do."
    },
    {
      "type": "dialogue",
      "speaker": "Higgins",
      "text": "We will try one sound. Listen to the beginning of ‘thin’. Then watch my mouth."
    },
    {
      "type": "narration",
      "text": "He points to the mirror, not to Eliza's clothes or manner."
    },
    {
      "type": "dialogue",
      "speaker": "Higgins",
      "text": "For /θ/, bring the tip of your tongue lightly to your front teeth. Let the air flow. For /f/, your upper teeth meet your lower lip. Try ‘thin’ slowly."
    },
    {
      "type": "dialogue",
      "speaker": "Eliza",
      "text": "Thin... I'm watching my tongue. It feels strange, but I can try it."
    },
    {
      "type": "dialogue",
      "speaker": "Pickering",
      "text": "You can take your time. Ask for the kind of help you need."
    },
    {
      "type": "narration",
      "text": "Mrs Pearce leaves a sheet beside the mirror."
    },
    {
      "type": "dialogue",
      "speaker": "Mrs Pearce",
      "text": "And if an explanation is not clear, ask for another one."
    },
    {
      "type": "dialogue",
      "speaker": "Eliza",
      "text": "Another sound to choose from. Still my words."
    }
  ],
  "explanation": "/θ/ uses tongue and front teeth; /f/ uses lower lip and upper teeth. Both let air flow. This lesson practises a sound choice, not the value of a speaker. Cockney-like /f/ is not a personal failing and is not universal to all Cockney speakers.",
  "decision": {
    "id": "D06",
    "prompt": "How does Eliza want to practise first?",
    "choices": [
      {
        "id": "d06_slow_repeat",
        "title": "Slow repetition",
        "text": "Let me try it slowly a few times."
      },
      {
        "id": "d06_visual_model",
        "title": "A visual model",
        "text": "Show me where my tongue and lips go."
      },
      {
        "id": "d06_own_words",
        "title": "Her own words",
        "text": "Let me try it in words I'd use."
      }
    ]
  },
  "consequenceBeats": {
    "d06_slow_repeat": [
      {
        "type": "dialogue",
        "speaker": "Higgins",
        "text": "Take a breath between tries. Keep the air moving."
      },
      {
        "type": "narration",
        "text": "Eliza gives the sound a little more time."
      }
    ],
    "d06_visual_model": [
      {
        "type": "dialogue",
        "speaker": "Higgins",
        "text": "Look in the mirror. Tongue at the front teeth for /θ/; lower lip at the upper teeth for /f/."
      },
      {
        "type": "narration",
        "text": "Eliza checks the movement before trying again."
      }
    ],
    "d06_own_words": [
      {
        "type": "dialogue",
        "speaker": "Higgins",
        "text": "Choose a short sentence. Keep its meaning, and try the sound."
      },
      {
        "type": "dialogue",
        "speaker": "Eliza",
        "text": "Three flowers, please."
      },
      {
        "type": "narration",
        "text": "The words belong to a situation she knows."
      }
    ]
  },
  "challenge": {
    "id": "LC05",
    "kind": "articulation",
    "title": "A Sound and a Movement",
    "intro": "Listen to each sound, or open its transcript. Choose which part of the mouth makes it. Then choose the next step for trying /θ/ in ‘thin’. You can replay and try again.",
    "samples": [
      {
        "id": "lc05_sample_theta",
        "title": "thin /θɪn/",
        "transcript": "/θ/, then thin /θɪn/. The tongue tip meets the front teeth lightly; air flows.",
        "options": [
          {
            "id": "lc05_tongue_teeth",
            "label": "Tongue tip and front teeth"
          },
          {
            "id": "lc05_lip_teeth",
            "label": "Lower lip and upper teeth"
          }
        ],
        "answer": "lc05_tongue_teeth",
        "success": "Yes. /θ/ uses the tongue tip and front teeth. The air keeps flowing.",
        "retry": "Try again. Listen or open the transcript, and notice what touches the teeth."
      },
      {
        "id": "lc05_sample_f",
        "title": "fin /fɪn/",
        "transcript": "/f/, then fin /fɪn/. The lower lip meets the upper teeth; air flows.",
        "options": [
          {
            "id": "lc05_tongue_teeth",
            "label": "Tongue tip and front teeth"
          },
          {
            "id": "lc05_lip_teeth",
            "label": "Lower lip and upper teeth"
          }
        ],
        "answer": "lc05_lip_teeth",
        "success": "Yes. /f/ uses the lower lip and upper teeth. This is a different movement.",
        "retry": "Try again. Compare the lower lip with the tongue tip. Replay or use the transcript."
      },
      {
        "id": "lc05_step_theta",
        "title": "The next movement",
        "prompt": "Your upper teeth are touching your lower lip. You want to try /θ/ in ‘thin’. What is your next step?",
        "options": [
          {
            "id": "lc05_step_tongue_air",
            "label": "Move the tongue tip lightly to the front teeth and let air flow"
          },
          {
            "id": "lc05_step_keep_lip",
            "label": "Keep the lower lip against the upper teeth"
          },
          {
            "id": "lc05_step_stop_air",
            "label": "Close the mouth and stop the air"
          }
        ],
        "answer": "lc05_step_tongue_air",
        "success": "Yes. Release the lower lip, bring the tongue tip lightly to the front teeth, and let air flow.",
        "retry": "That keeps /f/ or stops the air. For this /θ/ practice, try a light tongue-to-teeth contact with flowing air."
      }
    ]
  },
  "reflection": [
    {
      "type": "dialogue",
      "speaker": "Eliza",
      "text": "I can feel the difference now. I want to try it in a sentence."
    },
    {
      "type": "dialogue",
      "speaker": "Pickering",
      "text": "A new movement, and a choice about when to use it."
    },
    {
      "type": "narration",
      "text": "Eliza closes the mirror for a moment. One sound has not changed who she is. It has given her something else to notice."
    }
  ],
  "transition": "Later that afternoon, the lesson moves from the mirror to listening. Two similar sounds can change what a customer means.",
  "nextScene": "ch03_s02"
};

// Chapter III S02 content follows the human-locked script and approved audio.
export const CH03_SCENE_02 = {
  id: 'ch03_s02', number: 2, chapter: 'III', chapterTitle: 'The Lessons', sceneCount: 6,
  title: 'The Listening Room', kicker: 'A lesson in hearing meaning', visualStage: 'in_training', composition: 'ch03-listening-room',
  background: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  plate: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  eliza: { src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png', alt: 'Eliza in practical indoor lesson clothes listens with a focused expression.' },
  supporting: [{ src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', alt: 'Higgins supports the lesson from behind the desk.', placement: 'higgins' }], props: [],
  voice: [
    { id: 'ch03_s02_higgins_opener', src: './assets/audio/characters/higgins/higgins_ch03_scene02_001.mp3', transcript: 'This time, listen before you try to say the word.', label: 'Replay Higgins', inline: true, generationId: '8x3VLpQ9nssFmsuQEkXw', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'ch03_s02_eliza_pre', src: './assets/audio/characters/eliza/eliza_ch03_scene02_001.mp3', transcript: 'I know what my mouth is doing. My ears need a turn now.', label: 'Replay Eliza', inline: true, generationId: '9mmmNoy0Fac8ttetRAU2', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'ch03_s02_eliza_post', src: './assets/audio/characters/eliza/eliza_ch03_scene02_002.mp3', transcript: 'A small sound, but a different order. I can listen again before I answer.', label: 'Replay Eliza', inline: true, generationId: 'xyGZEj9fgKJt3weuMtOn', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'ch03_s02_higgins_post', src: './assets/audio/characters/higgins/higgins_ch03_scene02_002.mp3', transcript: 'Good. Hear the difference first. Then practise saying it.', label: 'Replay Higgins', inline: true, generationId: 'ocaEKLQL5ZAkvoFgQgGy', voiceId: 'JlptfLxaUpd8pZcw9dKd' }
  ],
  storyBeats: [
    { type: 'narration', text: 'That afternoon, the mirror rests beside the desk. Higgins prepares two short recordings. Eliza looks at the order cards. Pickering waits beside the table.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'This time, listen before you try to say the word.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I know what my mouth is doing. My ears need a turn now.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Two words can sound almost the same. One small sound can change an order.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'Take your time. You can hear each recording again.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Then let me hear it twice. I want to know what the customer means.' },
    { type: 'narration', text: 'The cards show two possible meanings. Eliza must listen to find which one the customer wants.' }
  ],
  challenge: {
    id: 'LC06', kind: 'minimal-pair', title: 'Three or free?',
    intro: 'Listen to each recording. Choose the word you hear, then choose what it means for the order. Replay as often as you need.',
    samples: [
      { id: 'lc06_sample_01', script: "I'd like three flowers.", transcript: "I'd like three flowers.", src: './assets/audio/challenges/ch03/lc06_three_flowers.mp3', generationId: 'iauJFoB7TrehOtQmc4WT', voiceId: 'JlptfLxaUpd8pZcw9dKd', word: 'lc06_word_three', meaning: 'lc06_meaning_three_flowers' },
      { id: 'lc06_sample_02', script: "I'd like free flowers.", transcript: "I'd like free flowers.", src: './assets/audio/challenges/ch03/lc06_free_flowers.mp3', generationId: 'ZaQgHrqqFMqvxz8pqIlQ', voiceId: 'JlptfLxaUpd8pZcw9dKd', word: 'lc06_word_free', meaning: 'lc06_meaning_no_payment' }
    ],
    wordOptions: [{ id: 'lc06_word_three', label: 'three' }, { id: 'lc06_word_free', label: 'free' }],
    meaningOptions: [{ id: 'lc06_meaning_three_flowers', label: 'The customer wants three flowers.' }, { id: 'lc06_meaning_no_payment', label: 'The customer wants flowers without paying.' }]
  },
  reflection: [
    { type: 'narration', text: 'Eliza sets the two cards apart. She pauses before answering.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'A small sound, but a different order. I can listen again before I answer.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Good. Hear the difference first. Then practise saying it.' },
    { type: 'dialogue', speaker: 'Pickering', text: 'And when you are not sure, ask the customer.' }
  ],
  transition: 'The next day, the lesson turns to the strongest syllable in a word. A customer must be able to recognise the word Eliza means.',
  nextScene: 'ch03_s03'
};

export const CH03_SCENE_03 = {
  id: 'ch03_s03', number: 3, chapter: 'III', chapterTitle: 'The Lessons', sceneCount: 6,
  title: 'Finding the Main Stress', kicker: 'A lesson in the shape of a word', visualStage: 'in_training', composition: 'ch03-stress-lesson',
  background: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  plate: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  eliza: { src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png', alt: 'Eliza in practical indoor lesson clothes listens with a focused expression.' },
  supporting: [{ src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', alt: 'Higgins supports the lesson from behind the desk.', placement: 'higgins' }],
  props: [], voice: [
    { id: 'AM26-S03-HIGGINS-OPEN', src: './assets/audio/characters/higgins/higgins_ch03_scene03_001.mp3', transcript: 'A word has a shape. One syllable usually carries more weight than the others.', label: 'Replay Higgins', inline: true, generationId: 'ek6PpoRvjbVRlONnoBjj', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'AM26-S03-ELIZA-OPEN', src: './assets/audio/characters/eliza/eliza_ch03_scene03_001.mp3', transcript: "So I needn't fight with every bit of it at once?", label: 'Replay Eliza', inline: true, generationId: 'hll8CZetNoio50SXnmtS', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM26-S03-ELIZA-PRE-LC07', src: './assets/audio/characters/eliza/eliza_ch03_scene03_002.mp3', transcript: 'Right. I want to hear where it leans.', label: 'Replay Eliza', inline: true, generationId: 'N57mhxwhlDU8rYNipGte', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM26-S03-ELIZA-POST-LC07', src: './assets/audio/characters/eliza/eliza_ch03_scene03_003.mp3', transcript: 'I can hear it now. One part comes forward and the rest follow it.', label: 'Replay Eliza', inline: true, generationId: 'mZNKT6kgjbnFEmgrfuUG', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM26-S03-HIGGINS-POST-LC07', src: './assets/audio/characters/higgins/higgins_ch03_scene03_002.mp3', transcript: 'Exactly. Find the stress first, and the word becomes easier to shape.', label: 'Replay Higgins', inline: true, generationId: 'pv4mhkS6TNRu6fQ6CBYY', voiceId: 'JlptfLxaUpd8pZcw9dKd' }
  ],
  storyBeats: [
    { type: 'dialogue', speaker: 'Higgins', text: 'A word has a shape. One syllable usually carries more weight than the others.' },
    { type: 'dialogue', speaker: 'Eliza', text: "So I needn't fight with every bit of it at once?" },
    { type: 'dialogue', speaker: 'Higgins', text: 'No. Listen for the part that stands out.' },
    { type: 'dialogue', speaker: 'Eliza', text: "Then say it again. I'll listen for the strongest bit." },
    { type: 'dialogue', speaker: 'Higgins', text: 'Do not count the letters. Listen to the sound of the whole word.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Right. I want to hear where it leans.' }
  ],
  challenge: {
    id: 'LC07', kind: 'word-stress', title: 'Finding the Main Stress',
    intro: 'Listen to each word. Choose the syllable that carries the main stress. You can replay each recording.',
    samples: [
      { id: 'lc07_sample_01', word: 'customer', transcript: 'customer', src: './assets/audio/challenges/ch03/lc07_customer.mp3', generationId: 'MCDlKDcFalPe2MdZKfOe', voiceId: 'JlptfLxaUpd8pZcw9dKd', syllables: ['cus', 'to', 'mer'], options: ['lc07_stress_customer_1', 'lc07_stress_customer_2', 'lc07_stress_customer_3'], answer: 'lc07_stress_customer_1' },
      { id: 'lc07_sample_02', word: 'expensive', transcript: 'expensive', src: './assets/audio/challenges/ch03/lc07_expensive.mp3', generationId: 'SrzFkD5thsvpOL5GKbPQ', voiceId: 'JlptfLxaUpd8pZcw9dKd', syllables: ['ex', 'pen', 'sive'], options: ['lc07_stress_expensive_1', 'lc07_stress_expensive_2', 'lc07_stress_expensive_3'], answer: 'lc07_stress_expensive_2' },
      { id: 'lc07_sample_03', word: 'delivery', transcript: 'delivery', src: './assets/audio/challenges/ch03/lc07_delivery.mp3', generationId: 'ViuvcuZerKyJhXcAD3EV', voiceId: 'JlptfLxaUpd8pZcw9dKd', syllables: ['de', 'liv', 'er', 'y'], options: ['lc07_stress_delivery_1', 'lc07_stress_delivery_2', 'lc07_stress_delivery_3', 'lc07_stress_delivery_4'], answer: 'lc07_stress_delivery_2' }
    ]
  },
  reflection: [
    { type: 'dialogue', speaker: 'Eliza', text: 'I can hear it now. One part comes forward and the rest follow it.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Exactly. Find the stress first, and the word becomes easier to shape.' }
  ],
  transition: "The next lesson turns from a word's shape to the shape of a sentence.",
  nextScene: 'ch03_s04'
};

export const CH03_SCENE_04 = {
  id: 'ch03_s04', number: 4, chapter: 'III', chapterTitle: 'The Lessons', sceneCount: 6,
  title: 'A Sentence Has Shape', kicker: 'A lesson in the shape of a sentence', visualStage: 'in_training', composition: 'ch03-sentence-lesson',
  background: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  plate: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  eliza: { src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png', alt: 'Eliza in practical indoor lesson clothes listens with a focused expression.' },
  supporting: [{ src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', alt: 'Higgins supports the lesson from behind the desk.', placement: 'higgins' }],
  props: [], voice: [
    { id: 'AM28-S04-HIGGINS-OPEN', src: './assets/audio/characters/higgins/higgins_ch03_scene04_001.mp3', transcript: 'You found the shape inside a word. Now listen for the shape of a whole sentence.', label: 'Replay Higgins', inline: true, generationId: 'PBbwBKYlbZRuMegfVqEP', sessionId: 'gxJlUO0R5LC3EdkhHP34', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'AM28-S04-ELIZA-OPEN', src: './assets/audio/characters/eliza/eliza_ch03_scene04_001.mp3', transcript: 'You mean some words matter more than the others?', label: 'Replay Eliza', inline: true, generationId: 'ZdlcCnZPrpNr1lz8nSUO', sessionId: 'ptzxunLuFoV4mMBRKu77', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM28-S04-HIGGINS-EXPLANATION', src: './assets/audio/characters/higgins/higgins_ch03_scene04_002.mp3', transcript: 'Some carry more of the message. Let those words come forward.', label: 'Replay Higgins', inline: true, generationId: '0FJ09RPTm1W0R1kPTJhP', sessionId: 'ih7iKF5jn9rUQPrGCqWR', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'AM28-S04-DEMO-NEUTRAL', src: './assets/audio/characters/higgins/higgins_ch03_scene04_003.mp3', transcript: 'Listen: She ordered the blue hat.', label: 'Replay Higgins · neutral version', inline: true, generationId: 'KE0lRpfOof5MdSx74qNM', sessionId: 'Ym52m34PnOXqe36MQMyQ', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'AM28-S04-DEMO-BLUE', src: './assets/audio/characters/higgins/higgins_ch03_scene04_004.mp3', transcript: 'Now listen again: She ordered the BLUE hat.', spokenTranscript: 'Now listen again: She ordered the blue hat.', label: 'Replay Higgins · focused version', inline: true, generationId: 'dpYaIOc4SEVClkQlHkhw', sessionId: 'NMB1OLbUaMJHRx67DM2T', voiceId: 'JlptfLxaUpd8pZcw9dKd' },
    { id: 'AM28-S04-ELIZA-RECOGNITION', src: './assets/audio/characters/eliza/eliza_ch03_scene04_002.mp3', transcript: 'The second one sounds as if the colour matters.', label: 'Replay Eliza', inline: true, generationId: 'mck5x5LYcN6cMpLY4djT', sessionId: 'uIJFmb79IUNoCgNsjyrY', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM28-S04-ELIZA-PRE-LC08', src: './assets/audio/characters/eliza/eliza_ch03_scene04_003.mp3', transcript: 'So the sentence changes shape when the important word changes.', label: 'Replay Eliza', inline: true, generationId: 'wdrnBeViGCh7IfmUxlXh', sessionId: 'iKRSpCrxgTa1Mmk8qAc2', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM28-S04-ELIZA-POST-LC08', src: './assets/audio/characters/eliza/eliza_ch03_scene04_004.mp3', transcript: "I can hear the sentence moving now. It isn't flat.", label: 'Replay Eliza', inline: true, generationId: '4XJXdtY6BQ8LBJQGfWk5', sessionId: 'SWQBloHZYNp7rtI73vCx', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'AM28-S04-HIGGINS-POST-LC08', src: './assets/audio/characters/higgins/higgins_ch03_scene04_005.mp3', transcript: 'Good. Do not force every word. Let the sentence carry you.', label: 'Replay Higgins', inline: true, generationId: 'xXOLtnVKTYudAqtgzMtD', sessionId: 'MYhIy7YXHFeQP44hVzAn', voiceId: 'JlptfLxaUpd8pZcw9dKd' }
  ],
  storyBeats: [
    { type: 'dialogue', speaker: 'Higgins', text: 'You found the shape inside a word. Now listen for the shape of a whole sentence.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'You mean some words matter more than the others?' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Some carry more of the message. Let those words come forward.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'And the little ones can stop fighting for attention.' },
    { type: 'narration', text: 'Eliza tries the sentence carefully, giving each word much the same weight.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Listen: She ordered the blue hat.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Now listen again: She ordered the BLUE hat.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'The second one sounds as if the colour matters.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Exactly. Stress can tell the listener what matters most.' }
  ],
  decision: {
    id: 'D07', prompt: 'The sentence still feels awkward. What would Eliza like to try next?',
    choices: [
      { id: 'd07_repeat_slowly', title: 'Ask Higgins to repeat it slowly', text: 'Would you say that slowly once more?' },
      { id: 'd07_hear_naturally', title: 'Hear it naturally again', text: 'Let me hear it naturally once more.' },
      { id: 'd07_try_first', title: 'Try it herself first', text: 'Let me try it myself first.' }
    ]
  },
  consequenceBeats: {
    d07_repeat_slowly: [
      { type: 'dialogue', speaker: 'Eliza', text: 'Would you say that slowly once more?' },
      { type: 'dialogue', speaker: 'Higgins', text: 'Listen to how the strong word carries the point.' }
    ],
    d07_hear_naturally: [
      { type: 'dialogue', speaker: 'Eliza', text: 'Let me hear it naturally once more.' },
      { type: 'dialogue', speaker: 'Higgins', text: 'Of course. Notice where the message comes forward.' }
    ],
    d07_try_first: [
      { type: 'dialogue', speaker: 'Eliza', text: 'Let me try it myself first.' },
      { type: 'dialogue', speaker: 'Higgins', text: 'Go ahead. Let the important word come forward.' }
    ]
  },
  preChallengeBeats: [
    { type: 'dialogue', speaker: 'Eliza', text: 'So the sentence changes shape when the important word changes.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Yes. Listen for the word that carries the meaning.' }
  ],
  challenge: {
    id: 'LC08', kind: 'sentence-stress', title: 'Sentence Has Shape',
    intro: 'Listen to each sentence. Choose the word that carries the strongest part of its meaning. Replay each recording as often as you need.',
    samples: [
      { id: 'lc08_sample_01', sentence: 'I wanted the red flowers.', transcript: 'I wanted the red flowers.', src: './assets/audio/challenges/ch03/lc08_red_flowers.mp3', generationId: 'C75v8nwMAi4LDv77a5E5', sessionId: 'GkehTeUVnboWV04JyzQC', voiceId: 'JlptfLxaUpd8pZcw9dKd', options: ['lc08_focus_i', 'lc08_focus_wanted', 'lc08_focus_the', 'lc08_focus_red', 'lc08_focus_flowers'], answer: 'lc08_focus_red', focusWord: 'red' },
      { id: 'lc08_sample_02', sentence: 'She bought three tickets.', transcript: 'She bought three tickets.', src: './assets/audio/challenges/ch03/lc08_three_tickets.mp3', generationId: 'g4qwP6RN6myY2TROQ7AI', sessionId: 'tQypZOjV4VNvKioCeWlM', voiceId: 'JlptfLxaUpd8pZcw9dKd', options: ['lc08_focus_she', 'lc08_focus_bought', 'lc08_focus_three', 'lc08_focus_tickets'], answer: 'lc08_focus_three', focusWord: 'three' },
      { id: 'lc08_sample_03', sentence: 'We meet on Monday.', transcript: 'We meet on Monday.', src: './assets/audio/challenges/ch03/lc08_monday.mp3', generationId: 'gZQbWcFFvjSXBQ57rUJ4', sessionId: 'mu0bYV6AkT7fX4QlRRH8', voiceId: 'JlptfLxaUpd8pZcw9dKd', options: ['lc08_focus_we', 'lc08_focus_meet', 'lc08_focus_on', 'lc08_focus_monday'], answer: 'lc08_focus_monday', focusWord: 'Monday' }
    ]
  },
  reflection: [
    { type: 'dialogue', speaker: 'Eliza', text: "I can hear the sentence moving now. It isn't flat." },
    { type: 'dialogue', speaker: 'Higgins', text: 'Good. Do not force every word. Let the sentence carry you.' },
    { type: 'narration', text: 'A few days later, when she is tired, Eliza will need to find the shape again.' }
  ],
  transition: 'Eliza has a listening strategy to carry into her next lesson.', nextScene: 'ch03_s05'
};

export const CH03_SCENE_05 = {
  id: 'ch03_s05', number: 5, chapter: 'III', chapterTitle: 'The Lessons', sceneCount: 6,
  title: 'The Bad Day', kicker: 'A lesson in pace and repair', visualStage: 'in_training', composition: 'ch03-bad-day',
  background: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  plate: { src: './assets/images/locations/ch02/ch02_higgins-study.webp', alt: 'Higgins’s study, with a desk, books and fireplace.' },
  eliza: { src: './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png', alt: 'Eliza in practical indoor lesson clothes takes a moment during a lesson.' },
  supporting: [{ src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', alt: 'Higgins supports the lesson from behind the desk.', placement: 'higgins' }],
  props: [], voice: [],
  storyBeats: [
    { type: 'narration', text: 'A few days later, the lesson has gone on too long. Eliza is tired.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Try the sentence once more: ‘I can finish this page before we stop.’' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I can finish this page before we stop.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'You rushed the last part. Begin again.' },
    { type: 'dialogue', speaker: 'Eliza', text: "I did it well earlier. Why can't I do it now?" },
    { type: 'dialogue', speaker: 'Higgins', text: 'You are tired. More force will not help.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'Then I need a moment. Let me start again.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Good. Slower is not worse. It gives you room to hear yourself.' },
    { type: 'dialogue', speaker: 'Eliza', text: 'I can finish this page… before we stop.' },
    { type: 'dialogue', speaker: 'Higgins', text: 'Yes. Give each part its time.' }
  ],
  reflection: [
    { type: 'dialogue', speaker: 'Eliza', text: 'I can get it back.' },
    { type: 'narration', text: 'She has not made the sentence perfect. She has found a way back into it.' }
  ],
  challenge: {
    id: 'LC09', kind: 'pace-chunking', title: 'Give the Sentence Room',
    intro: 'Choose the best place to pause so the sentence is easier to say.',
    incorrectFeedback: 'Not quite. Try again, or use Supported Practice.',
    supportedPracticePrompt: 'Listen for the place where the sentence can breathe.',
    supportExplanation: 'Pause here. Say the first part, then continue with the second.',
    samples: [
      { id: 'lc09_sample_01', sentence: 'When the lesson ends I will rest.', options: ['lc09_01_after_when', 'lc09_01_after_the', 'lc09_01_after_lesson', 'lc09_pause_01', 'lc09_01_after_i', 'lc09_01_after_will'], afterLabels: ['When', 'the', 'lesson', 'ends', 'I', 'will'], answer: 'lc09_pause_01', answerAfter: 'ends', key: 'When the lesson ends | I will rest.' },
      { id: 'lc09_sample_02', sentence: 'If I slow my pace I can hear each word.', options: ['lc09_02_after_if', 'lc09_02_after_first_i', 'lc09_02_after_slow', 'lc09_02_after_my', 'lc09_pause_02', 'lc09_02_after_second_i', 'lc09_02_after_can', 'lc09_02_after_hear', 'lc09_02_after_each'], afterLabels: ['If', 'first I', 'slow', 'my', 'pace', 'second I', 'can', 'hear', 'each'], answer: 'lc09_pause_02', answerAfter: 'pace', key: 'If I slow my pace | I can hear each word.' },
      { id: 'lc09_sample_03', sentence: 'I know the words but I need a moment.', options: ['lc09_03_after_first_i', 'lc09_03_after_know', 'lc09_03_after_the', 'lc09_pause_03', 'lc09_03_after_but', 'lc09_03_after_second_i', 'lc09_03_after_need', 'lc09_03_after_a'], afterLabels: ['first I', 'know', 'the', 'words', 'but', 'second I', 'need', 'a'], answer: 'lc09_pause_03', answerAfter: 'words', key: 'I know the words | but I need a moment.' }
    ]
  },
  transition: 'Eliza can recover a sentence when she gives it room.', nextScene: 'ch03_s06'
};

export const CH03_S05_TEACHER_SECTIONS = [
  ['Chapter Overview', 'S05, The Bad Day, follows S04 in Higgins’s study. The lesson runs long and Eliza is tired. She rushes a familiar sentence, pauses, slows down, divides it into manageable parts, and recovers.'],
  ['Learning Goals', 'Notice that performance can vary; regulate pace; divide a sentence into manageable chunks; repair and try again. A temporary performance drop does not erase learning.'],
  ['Language Focus', 'No new phonology. Practise pacing, a pause at a meaningful clause boundary, and self-repair. Slowing down can give the speaker room to hear the sentence.'],
  ['Listening Focus', 'LC09 is a text-based pause and chunking activity in this runtime. There are no S05 story or objective recordings and no browser text-to-speech.'],
  ['Key Vocabulary', 'pace, pause, sentence, part, rest, moment, again, slow down, hear.'],
  ['Cultural / Literary Context', 'This is an original educational adaptation. Fatigue is a condition to manage, not evidence that learning failed. Cockney or any social register is not evidence of low intelligence.'],
  ['Decisions – Teacher Notes', 'No main D-numbered decision in S05. There is no D08 and no hidden decision-like branch.'],
  ['Challenge Key', 'LC09: lc09_sample_01 → lc09_pause_01 (after ends): “When the lesson ends | I will rest.”; lc09_sample_02 → lc09_pause_02 (after pace): “If I slow my pace | I can hear each word.”; lc09_sample_03 → lc09_pause_03 (after words): “I know the words | but I need a moment.” Unaided completion adds Pronunciation +1 once through ch03_lc09_completed. Opening target-revealing support first cancels reward eligibility. Supported completion has no reward or penalty.'],
  ['Discussion Questions', 'What can change when someone is tired? How can a pause help a long sentence? Does one difficult attempt erase earlier learning? What might a respectful correction sound like?'],
  ['Sensitive Framing', 'Eliza is tired, not lazy, weak or incapable. Do not blame Cockney or frame fatigue as failure. Support is a valid route and never a penalty.'],
  ['Suggested Classroom Use', 'Read the scene first. Try each sentence silently or aloud; no recording is required. After an incorrect answer, offer Supported Practice. Teacher preview is read-only and does not alter LC09, reward eligibility, Pronunciation, events or progression. Eliza remains at Chapter III – Conscious Training.'],
  ['Scene Navigation', 'S05 story → LC09 unaided or supported completion → Eliza’s modest recovery → explicit Continue (ch03_s05_complete, no increment) → ch03_s06, A Small Victory. The S06 story/runtime remains unavailable in this checkpoint.']
];

export const CH03_S04_TEACHER_SECTIONS = [
  ['Chapter Overview', "S04, A Sentence Has Shape, continues Eliza's Conscious Training in Higgins's study. After S03's word stress, she notices how sentence focus gives another choice for carrying a message."],
  ['Learning Goals', 'Identify a focus word in a short sentence, notice relative prominence across a sentence, and hear that natural speech moves rather than staying mechanically flat.'],
  ['Language Focus', 'S03 word stress is prominence inside one word. S04 sentence stress is relative prominence across a sentence. Basic intonation gives speech movement. “Some carry more of the message” is a useful learner simplification, not an absolute rule.'],
  ['Listening Focus', 'The nine selected story voice moments and three LC08 objective recordings are locally integrated and have individual Human Audio QA PASS. The complete S04 ambience/story/challenge mix has Human Audio Mix QA PASS. Visible text remains primary; no browser speech synthesis is used.'],
  ['Key Vocabulary', 'sentence, message, focus, prominent, stress, intonation, meaning, replay.'],
  ['Cultural / Literary Context', 'This is original educational adaptation. Accent ≠ intelligence. Language practice expands control and choice; it does not erase Eliza’s identity.'],
  ['Decisions – Teacher Notes', 'D07 is a non-punitive learning-strategy choice: ask for a slow repeat (d07_repeat_slowly), hear it naturally again (d07_hear_naturally), or try it first (d07_try_first). Each rejoins LC08; none is wrong or changes Pronunciation.'],
  ['Challenge Key', 'LC08: lc08_sample_01 → lc08_focus_red (red); lc08_sample_02 → lc08_focus_three (three); lc08_sample_03 → lc08_focus_monday (Monday). The integrated recordings carry these intended focus words. Before a response, all word controls are neutral. Unaided completion adds Pronunciation +1 once through ch03_lc08_completed. Opening support cancels that reward; supported completion carries no reward or penalty.'],
  ['Discussion Questions', 'Which word would you bring forward? How does the meaning change when focus changes? How is sentence stress different from stress inside a word?'],
  ['Sensitive Framing', 'Do not treat a dialect or accent as evidence of intelligence. Avoid “correcting” Eliza’s identity. Support is a valid choice and never a failure.'],
  ['Suggested Classroom Use', 'Read the story first. Learners may listen to each normal-speed LC08 recording, replay it freely, or use Supported Practice after an incorrect response. The visible sentence remains available throughout. No student voice recording or automated speech judgement.'],
  ['Scene Navigation', 'Story demonstration → D07 strategy choice → LC08 unaided or supported completion → reflection → explicit Continue (ch03_s04_complete, no signal) toward ch03_s05. Teacher preview is read-only.']
];

export const CH03_S03_TEACHER_SECTIONS = [
  ['Chapter Overview', "The Lessons continues in Higgins's study. S03 moves from hearing individual sounds to hearing the main stress inside one word. Eliza discovers the word's shape herself."],
  ['Learning Goals', 'Identify the syllable carrying main stress in customer, expensive and delivery. Listen for prominence inside the whole word. This is awareness and repertoire expansion, not accent erasure.'],
  ['Language Focus', 'Word stress is the prominence of one syllable within a word. S03 teaches word stress only. Sentence stress and intonation belong to S04. Correct forms: CUS-to-mer, ex-PEN-sive, de-LIV-er-y.'],
  ['Listening Focus', 'LC07 asks which syllable carries the main stress. This runtime has no LC07 recording or speech synthesis; the book-first preview presents neutral written syllables. The learner selects a syllable without an initial answer cue.'],
  ['Key Vocabulary', 'word, syllable, stress, strongest, customer, expensive, delivery. Here stress means prominence inside a word, not worry or pressure.'],
  ['Cultural / Literary Context', "This is an original educational adaptation. Accent ≠ intelligence. A speaker's familiar accent or social identity is not defective; stress awareness adds choices and can support intelligibility."],
  ['Decisions – Teacher Notes', 'S03 has no D-numbered main narrative decision. D07 remains in S04. No main decision is introduced here.'],
  ['Challenge Key', 'lc07_sample_01 customer → lc07_stress_customer_1 (syllable 1): CUS-to-mer. lc07_sample_02 expensive → lc07_stress_expensive_2 (syllable 2): ex-PEN-sive. lc07_sample_03 delivery → lc07_stress_delivery_2 (syllable 2): de-LIV-er-y. Unaided completion grants Pronunciation +1 once; opening target-revealing support first cancels eligibility. Supported completion has no reward and no penalty.'],
  ['Discussion Questions', 'Which syllable stands out in each word? Did listening to or saying the whole word help? How is stress inside a word different from emphasis across a sentence?'],
  ['Sensitive Framing', "Do not describe a social accent as wrong or unintelligent. Correctness here identifies conventional word stress, not the worth or identity of a speaker. Supported practice is a valid route, not failure."],
  ['Suggested Classroom Use', 'All syllables begin identically. This no-audio runtime preview remains usable as a visible word-stress activity and never invokes browser speech. After an incorrect attempt, offer Supported Practice with the neutral instruction “Listen for the syllable that sounds strongest.” Explicit target-revealing support marks the challenge supported. Correct answers remain fixed on retries. Teacher preview does not mutate student state.'],
  ['Scene Navigation', 'S03 story → LC07 → Eliza’s discovery → explicit Continue (ch03_s03_complete, no signal) → S04 A Sentence Has Shape. S03 teaches word stress; S04 introduces sentence stress and intonation. D07 remains in S04.']
];

export const CH03_TEACHER_SECTIONS = [
  [
    "Chapter Overview",
    "The Lessons begins with The Mouth Is a Muscle, ch03_s01. Eliza enters her first practical lesson with her own purpose. Learning one mouth movement expands her choices; it does not repair her identity. Later chapter content remains unlocked."
  ],
  [
    "Learning Goals",
    "Notice the physical difference between /θ/ and /f/, associate a sound with a mouth movement, choose the next articulation step, request suitable support and distinguish a learner preference from an objectively checked skill answer."
  ],
  [
    "Language Focus",
    "Articulation awareness: /θ/ uses the tongue tip at the front teeth with flowing air; /f/ uses lower lip and upper teeth with flowing air. The contrast is thin /θɪn/ vs fin /fɪn/. Functional language: “Show me…”, “Let me try…”, asking for another explanation. No microphone or machine judgement of students' pronunciation.\n\nPedagogical reference for the dental sound: [British Council — Problems with ‘th’ words](https://africa.teachingenglish.org.uk/classroom/pronunciation/th-words). The lesson uses a light tongue-to-front-teeth contact; do not demand exaggerated protrusion, biting or force."
  ],
  [
    "Listening Focus",
    "LC05 asks what produces each heard sound and how to move from lower-lip contact to tongue-tip contact for /θ/. Higgins provides both neutral samples; the sound change, not a different voice or emotional status, is the evidence. Eliza's optional story attempt is separate. Conscious Training means audible attention, more precise articulation and sometimes cautious tempo while Cockney and her voice identity remain recognisable."
  ],
  [
    "Key Vocabulary",
    "sound, tongue, lip, teeth, air, slowly, mirror, thin, fin, try, repeat. Explain fin briefly as a fish's body part so the example is comprehensible at A2+/B1."
  ],
  [
    "Cultural / Literary Context",
    "This is an original educational adaptation of Pygmalion, not a musical lesson or song. Cockney-like /f/ for /θ/ is the selected contrast; it is not a universal description of all Cockney speakers. Accent ≠ intelligence. Repertoire and intelligibility are situational tools, not measures of worth."
  ],
  [
    "Decisions – Teacher Notes",
    "D06 is open choice — no answer key. d06_slow_repeat stores slow_repeat and pronunciation +1; d06_visual_model stores visual_model and confidence +1; d06_own_words stores own_words and independence +1. Event ch03_d06_practice_preference applies once. Asking to see a model expresses agency. The three routes converge; none is superior or an ending gate. request_strategy callback recalls direct/polite/boundary with neutral fallback and no mutation. In Training derives from scene metadata, not persistent eliza_stage."
  ],
  [
    "Challenge Key",
    "| Item ID | Correct answer ID | Explanation / typical confusion |\n|---|---|---|\n| lc05_sample_theta | lc05_tongue_teeth | /θ/ uses tongue tip/front teeth. Do not confuse it with lower-lip contact. |\n| lc05_sample_f | lc05_lip_teeth | /f/ uses lower lip/upper teeth. Both sounds allow air flow, so airflow alone does not distinguish them. |\n| lc05_step_theta | lc05_step_tongue_air | Release lower lip, bring tongue tip lightly to front teeth and let air flow. Keeping the lip retains /f/; stopping air does not practise the target fricative. |\n\nExact visible answer labels and per-item feedback are locked in STATE_AND_BRANCHING.md. Three correct items complete LC05. Event ch03_lc05_completed owns the single pronunciation +1. A wrong attempt changes no development signal. If D06 slow_repeat already added +1, the eventual scene total is pronunciation +2 from two different events: strategy and objective awareness. This is intentional, not duplicate scoring. Teacher keys stay outside ordinary student display; explain each answer after that item's submission."
  ],
  [
    "Discussion Questions",
    "- What changes when you use your tongue rather than your lip?\n- What kind of help makes a new movement clearer for you?\n- Can someone choose another sound without becoming another person?\n- How can an instructor correct a sound respectfully?"
  ],
  [
    "Sensitive Framing",
    "Never call Eliza's accent a personal error, lack of intelligence or inferior identity. Avoid imitation for humour and “Higgins fixes Eliza”. Students may try privately, listen, read support or observe; no public performance is required. The objective answer is about this sound target; D06 remains an equally valid preference. Internal signals are descriptive development metadata, not student grades or a psychological profile."
  ],
  [
    "Suggested Classroom Use",
    "Read the scene first; compare the two samples or their transcripts; optionally use a mirror and discuss D06 preferences. Replay is unrestricted. Transcript descriptions are available on demand before attempts, with no automatically selected answer/key. A silent route uses those descriptions and the next-step text; it has the same completion contract and no access penalty. Keyboard controls must reach playback, transcript disclosure, choices, retry and Continue with visible focus; labels cannot rely on colour. Static mouth reference and full text support reduced motion. Sound Off never hides the story or support.\n\nTeacher context must include chapter/scene/challenge and previewMode. Teacher preview is isolated: no decisions, answers, attempts, option orders, signals, applied_events or saves change. No auto-unlock, AM22 trigger or completion on opening/closing. Explicit preview audio may play without gameplay mutation and is cleaned up on exit. Restore student focus/context."
  ],
  [
    "Scene Navigation",
    "ch03_s01 — The Mouth Is a Muscle → D06 → LC05 → reflection → explicit student Continue (ch03_s01_complete, no signal) → canonical ch03_s02. With S02 unavailable, retain completion/review and explain the checkpoint boundary rather than route to a missing scene. No Chapter III completion is claimed.\n\nFuture implementation MUST reuse the existing story renderer, renderDecision, state/event store, AudioManager, challenge infrastructure, Teacher Mode dialog, replay/preview safety and responsive image-layer system. Extend shared hard-coded I–II context/guard handling; no Chapter III AudioManager, state store, second Teacher Mode, parallel decision system or isolated chapter save."
  ]
];

export const CH03_S02_TEACHER_SECTIONS = [
  ['Chapter Overview', 'The Listening Room follows S01 that afternoon. S01 production/articulation awareness /θ/ versus /f/ becomes S02 perception/listening discrimination in a flower order; Eliza remains active and recognisably herself.'],
  ['Learning Goals', 'Hear three versus free, identify the word and confirm order meaning. Listening precedes further conscious production in this lesson sequence; no universal ban on practising speech first is implied.'],
  ['Language Focus', "three /θriː/ versus free /friː/: initial /θ/ and /f/ differ, shared /r/ and /iː/ remain. Exact scripts: “I'd like three flowers.” / “I'd like free flowers.” Three specifies quantity; free requests no payment. Teach both meanings equally without mapping recordings to answers."],
  ['Listening Focus', 'LC06 is an objective listening check with two same-speaker Higgins samples. Choose heard word and corresponding meaning. Visible story/optional story voices never reveal sample assignment or replace listening. Eliza stays Conscious Training, not polished speech.'],
  ['Key Vocabulary', 'three, free, flowers, customer, order, pay, recording, replay, meaning. Free here means without payment, not independent or available time.'],
  ['Cultural / Literary Context', 'Original Pygmalion educational adaptation, no musical dialogue/song/staging. Accent ≠ intelligence; expanding perception/repertoire does not fix an inferior identity.'],
  ['Decisions – Teacher Notes', 'No new main decision. Unlimited replay is support, not a scored branch. No slowed playback or rate/pitch manipulation. Preserve S01 practice_preference and all inherited state.'],
  ['Challenge Key', 'lc06_sample_01: lc06_word_three + lc06_meaning_three_flowers; lc06_sample_02: lc06_word_free + lc06_meaning_no_payment. All four checks complete LC06. ch03_lc06_completed applies once: pronunciation +1 only if completed without target-revealing support; supported completion has no increment and no penalty. Correct subanswers freeze; unresolved subanswers retry.'],
  ['Discussion Questions', 'What changes between three and free? How would you check whether flowers cost money? When does replay help? How can a seller ask for clarification respectfully?'],
  ['Sensitive Framing', 'No accent-shaming, comic imitation or mandatory public production/microphone. Supported practice is an accessible learning route, not failure or a negative score. Clearly distinguish objective unaided listening evidence from supported text practice.'],
  ['Suggested Classroom Use', 'First attempt UNAIDED LISTENING; transcript unavailable beforehand. After the initial explicit attempt offer Supported practice, not automatic transcript disclosure. A learner unable to hear can explicitly record an unresolved “I cannot hear this recording” attempt without guessing, then access support. Text support permits completion and story continuation; no pronunciation reward. Opening transcript or target-specific explanation before completion irreversibly marks support use. Keyboard/focus reaches replay, support, choices, Submit/retry and Continue. Text never relies on colour. Preview is ephemeral and read-only.'],
  ['Scene Navigation', 'ch03_s01 → ch03_s02 story → LC06 unaided or supported completion → reflection → explicit Continue, ch03_s02_complete once without increment → ch03_s03 Finding the Main Stress. If S03 is absent, retain completion/review and show the unavailable-scene boundary.']
];
const callbacks = {
  "direct": "She asked for lessons plainly. This morning, she is ready to ask plain questions too.",
  "polite": "She chose a polite request at the door. Inside the lesson room, she still expects a clear answer.",
  "boundary": "She asked for lessons with a clear boundary. That boundary belongs in the lesson room too.",
  "neutral": "Eliza has come for lessons of her own choosing. She can ask how they will work."
};
export function chapterThreeCallback(strategy) { return callbacks[strategy] || callbacks.neutral; }
