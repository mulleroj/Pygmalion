// Locked Chapter III S01 content with approved optional AM21 takes; later scenes and LC05 audio remain unavailable.
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
const callbacks = {
  "direct": "She asked for lessons plainly. This morning, she is ready to ask plain questions too.",
  "polite": "She chose a polite request at the door. Inside the lesson room, she still expects a clear answer.",
  "boundary": "She asked for lessons with a clear boundary. That boundary belongs in the lesson room too.",
  "neutral": "Eliza has come for lessons of her own choosing. She can ask how they will work."
};
export function chapterThreeCallback(strategy) { return callbacks[strategy] || callbacks.neutral; }
