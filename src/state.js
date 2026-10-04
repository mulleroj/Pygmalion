import { CH03_SCENE_01, CH03_SCENE_02, CH03_SCENE_03, CH03_SCENE_04, CH03_SCENE_05, CH03_SCENE_06 } from './ch03-content.js';
export const STORAGE_KEY = 'pygmalion.chapter1.progress.v1';

export function createInitialState() {
  return {
    version: 1,
    started: false,
    scene: 'ch01_s01',
    completed: false,
    opening_tone: null,
    freddy_first_impression: null,
    higgins_first_impression: null,
    ear_test_intro_seen: false,
    origin_motivation: null,
    request_strategy: null,
    ch02_lc03_attempts: 0,
    ch02_lc03_completed: false,
    experiment_framing_heard: false,
    boundary_questioned: false,
    lesson_terms_understood: false,
    confirmed_motivation: null,
    motivation_shift: false,
    motivation_nuance: null,
    ch02_complete: false,
    ch02_lc04_attempts: 0,
    ch02_lc04_completed: false,
    lc04_presentation_order: null,
    practice_preference: null,
    ch03_lc05_attempts: 0,
    ch03_lc05_completed: false,
    ch03_s01_complete: false,
    confidence: 0,
    pronunciation: 0,
    independence: 0,
    applied_events: [],
    decisions: {},
    challenges: {
      lc01: { answers: {}, completed: false, optionOrders: {} },
      lc02: { answers: {}, completed: false, optionOrders: {} },
      lc04: { answers: {}, completed: false, optionOrders: {} },
      lc05: { answers: {}, completed: false, optionOrders: {} },
      lc06: { answers: {}, completed: false, optionOrders: {}, attempts: 0, firstAttempt: false, supportUsed: false },
      lc07: { answers: {}, completed: false, attempts: 0, firstAttempt: false, supportUsed: false },
      lc08: { answers: {}, completed: false, attempts: 0, firstAttempt: false, supportUsed: false },
      lc09: { answers: {}, completed: false, attempts: 0, firstAttempt: false, supportUsed: false, supportSamples: [] },
      lc10: { answers: {}, completed: false, attempts: 0, firstAttempt: false, supportUsed: false, supportSamples: [] }
    },
    soundEnabled: true
  };
}

function mergeState(raw) {
  const initial = createInitialState();
  if (!raw || typeof raw !== 'object') return initial;
  return {
    ...initial,
    ...raw,
    applied_events: Array.isArray(raw.applied_events) ? raw.applied_events : [],
    decisions: raw.decisions && typeof raw.decisions === 'object' ? raw.decisions : {},
    challenges: {
      ...initial.challenges,
      ...(raw.challenges || {}),
      lc01: { ...initial.challenges.lc01, ...((raw.challenges || {}).lc01 || {}) },
      lc02: { ...initial.challenges.lc02, ...((raw.challenges || {}).lc02 || {}) },
      lc04: { ...initial.challenges.lc04, ...((raw.challenges || {}).lc04 || {}) },
      lc05: { ...initial.challenges.lc05, ...((raw.challenges || {}).lc05 || {}) },
      lc06: { ...initial.challenges.lc06, ...((raw.challenges || {}).lc06 || {}) },
      lc07: { ...initial.challenges.lc07, ...((raw.challenges || {}).lc07 || {}) },
      lc08: { ...initial.challenges.lc08, ...((raw.challenges || {}).lc08 || {}) },
      lc09: { ...initial.challenges.lc09, ...((raw.challenges || {}).lc09 || {}) },
      lc10: { ...initial.challenges.lc10, ...((raw.challenges || {}).lc10 || {}) }
    }
  };
}

export function loadState(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    return raw ? mergeState(JSON.parse(raw)) : createInitialState();
  } catch {
    return createInitialState();
  }
}

export function saveState(state, storage = globalThis.localStorage) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // A blocked or full local store must never stop the story.
  }
  return state;
}

export function startChapter(state) {
  return { ...state, started: true, scene: state.scene || 'ch01_s01' };
}

export function resetChapter(state) {
  const fresh = createInitialState();
  return { ...fresh, soundEnabled: state.soundEnabled };
}

export function setScene(state, scene) {
  return { ...state, started: true, scene };
}

export function recordOpeningTone(state, tone) {
  return { ...state, opening_tone: tone };
}

export function applyDecision(state, decisionId, optionId) {
  if (decisionId === 'D07') {
    const allowed = CH03_SCENE_04.decision.choices.some(({ id }) => id === optionId);
    const eventId = 'ch03_d07_practice_strategy';
    if (state.scene !== 'ch03_s04' || !state.applied_events.includes('ch03_s03_complete') || !allowed ||
        state.decisions.D07 || state.applied_events.includes(eventId)) return state;
    return { ...state, decisions: { ...state.decisions, D07: optionId },
      applied_events: [...state.applied_events, eventId] };
  }
  if (decisionId === 'D06') {
    const contract = { d06_slow_repeat: ['slow_repeat', 'pronunciation'], d06_visual_model: ['visual_model', 'confidence'], d06_own_words: ['own_words', 'independence'] }[optionId];
    const eventId = 'ch03_d06_practice_preference';
    if (state.scene !== 'ch03_s01' || !contract || state.practice_preference || state.decisions.D06 || state.applied_events.includes(eventId)) return state;
    return { ...state, practice_preference: contract[0], [contract[1]]: state[contract[1]] + 1,
      decisions: { ...state.decisions, D06: optionId }, applied_events: [...state.applied_events, eventId] };
  }
  if (decisionId === 'D05') {
    const motivation = { d05_opportunity: 'opportunity', d05_respect: 'respect', d05_learning: 'learning', d05_independence: 'independence' }[optionId];
    const eventId = 'ch02_d05_confirmed_motivation';
    if (state.scene !== 'ch02_s05' || !motivation || state.confirmed_motivation || state.decisions.D05 || state.applied_events.includes(eventId)) return state;
    return { ...state, confirmed_motivation: motivation,
      decisions: { ...state.decisions, D05: optionId }, applied_events: [...state.applied_events, eventId] };
  }
  const eventByDecision = { D01: 'ch01_d01_resolution', D02: 'ch01_d02_response', D03: 'ch01_d03_origin_motivation', D04: 'ch02_d04_request_strategy' };
  const eventId = eventByDecision[decisionId];
  if (!eventId || state.decisions[decisionId]) return state;
  const requestStrategies = {
    d04_direct_request: 'direct',
    d04_polite_request: 'polite',
    d04_request_with_boundary: 'boundary'
  };
  if (decisionId === 'D04' && !requestStrategies[optionId]) return state;

  const next = {
    ...state,
    decisions: { ...state.decisions, [decisionId]: optionId },
    applied_events: state.applied_events.includes(eventId) ? state.applied_events : [...state.applied_events, eventId]
  };

  if (decisionId === 'D01') {
    next.freddy_first_impression = ({
      d01_ask_help: 'asks_for_repair',
      d01_name_damage: 'direct_boundary',
      d01_accept_and_work: 'practical_recovery'
    })[optionId] || null;
    if (optionId !== 'd01_name_damage') next.confidence += 1;
    else next.independence += 1;
  }
  if (decisionId === 'D02') {
    next.higgins_first_impression = ({
      d02_direct_question: 'challenged_directly',
      d02_request_explanation: 'seeks_accountability',
      d02_reject_and_return: 'refused_objectification'
    })[optionId] || null;
    if (optionId === 'd02_direct_question') next.confidence += 1;
    if (optionId === 'd02_reject_and_return') next.independence += 1;
  }
  if (decisionId === 'D03') next.origin_motivation = optionId;
  if (decisionId === 'D04') next.request_strategy = requestStrategies[optionId];
  return next;
}

export function recordLc03Answer(state, optionId) {
  const options = new Set(['lc03_clear_polite_request', 'lc03_unclear_request', 'lc03_submissive_request']);
  if (!state.decisions.D04 || state.ch02_lc03_completed || !options.has(optionId)) return state;
  const completed = optionId === 'lc03_clear_polite_request';
  return {
    ...state,
    ch02_lc03_attempts: state.ch02_lc03_attempts + 1,
    ch02_lc03_completed: completed,
    applied_events: completed && !state.applied_events.includes('ch02_lc03_completed')
      ? [...state.applied_events, 'ch02_lc03_completed']
      : state.applied_events
  };
}

export function recordS03Response(state, optionId) {
  if (state.scene !== 'ch02_s03' || optionId !== 's03_ask_for_clarification') return state;
  const eventId = 'ch02_s03_boundary_questioned';
  if (state.boundary_questioned && state.applied_events.includes(eventId)) return state;
  return {
    ...state,
    boundary_questioned: true,
    applied_events: state.applied_events.includes(eventId) ? state.applied_events : [...state.applied_events, eventId]
  };
}

const LC04_ANSWER_BY_SAMPLE = {
  lc04_sample_offer: 'lc04_offer',
  lc04_sample_evaluation: 'lc04_evaluation',
  lc04_sample_condition: 'lc04_condition'
};

export function recordLc04Answer(state, sampleId, answerId) {
  const correctAnswer = LC04_ANSWER_BY_SAMPLE[sampleId];
  const challenge = state.challenges.lc04;
  if (!correctAnswer || !Object.values(LC04_ANSWER_BY_SAMPLE).includes(answerId) ||
      state.ch02_lc04_completed || challenge.answers[sampleId]?.correct) return state;

  const answers = { ...challenge.answers, [sampleId]: { answer: answerId, correct: answerId === correctAnswer } };
  const completed = Object.entries(LC04_ANSWER_BY_SAMPLE).every(([id, expected]) => answers[id]?.answer === expected);
  return {
    ...state,
    experiment_framing_heard: completed || state.experiment_framing_heard,
    ch02_lc04_attempts: state.ch02_lc04_attempts + 1,
    ch02_lc04_completed: completed,
    applied_events: completed && !state.applied_events.includes('ch02_lc04_completed')
      ? [...state.applied_events, 'ch02_lc04_completed']
      : state.applied_events,
    challenges: { ...state.challenges, lc04: { ...challenge, answers, completed } }
  };
}

export function recordChallengeAnswer(state, challengeId, sampleId, answer, canonicalAnswerId) {
  const key = challengeId.toLowerCase();
  if (!state.challenges[key]) return state;
  const challenge = state.challenges[key];
  const answers = { ...challenge.answers, [sampleId]: { answer, correct: isChallengeAnswerCorrect(answer, canonicalAnswerId) } };
  const sampleCount = key === 'lc01' ? 3 : 3;
  const completed = Object.values(answers).filter((item) => item.correct).length >= sampleCount;
  const next = {
    ...state,
    challenges: { ...state.challenges, [key]: { ...challenge, answers, completed } }
  };
  if (key === 'lc02' && !state.ear_test_intro_seen) next.ear_test_intro_seen = true;
  return next;
}

export function isChallengeAnswerCorrect(answer, canonicalAnswerId) {
  return typeof answer === 'string' && typeof canonicalAnswerId === 'string' && answer === canonicalAnswerId;
}

function shuffleOptionIds(optionIds, random = Math.random) {
  const shuffled = [...optionIds];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomValue = Math.max(0, Math.min(0.999999999, Number(random()) || 0));
    const swapIndex = Math.floor(randomValue * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function isExactOptionPermutation(order, canonicalOptionIds) {
  if (!Array.isArray(order) || order.length !== canonicalOptionIds.length) return false;
  const canonical = new Set(canonicalOptionIds);
  return new Set(order).size === canonicalOptionIds.length && order.every((optionId) => canonical.has(optionId));
}

export function ensureChallengeOptionOrders(state, challengeId, optionGroups, random = Math.random) {
  const key = challengeId.toLowerCase();
  const challenge = state.challenges[key];
  if (!challenge || !Array.isArray(optionGroups)) return state;

  const currentOrders = challenge.optionOrders && typeof challenge.optionOrders === 'object' ? challenge.optionOrders : {};
  const optionOrders = { ...currentOrders };
  let changed = false;

  for (const group of optionGroups) {
    if (!group?.key || !Array.isArray(group.optionIds)) continue;
    if (isExactOptionPermutation(optionOrders[group.key], group.optionIds)) continue;
    optionOrders[group.key] = shuffleOptionIds(group.optionIds, random);
    changed = true;
  }

  if (!changed) return state;
  return {
    ...state,
    challenges: {
      ...state.challenges,
      [key]: { ...challenge, optionOrders }
    }
  };
}

export function ensureChallengePresentationOrder(state, challengeId, sampleIds, random = Math.random) {
  if (challengeId !== 'LC04' || !Array.isArray(sampleIds)) return state;
  if (isExactOptionPermutation(state.lc04_presentation_order, sampleIds)) return state;
  return { ...state, lc04_presentation_order: shuffleOptionIds(sampleIds, random) };
}

export function markChallengeEntered(state, challengeId) {
  if (challengeId !== 'LC02' || state.ear_test_intro_seen) return state;
  return { ...state, ear_test_intro_seen: true };
}

export function isChallengeComplete(state, challengeId) {
  return Boolean(state.challenges[challengeId.toLowerCase()]?.completed);
}

export function getSceneAdvanceBlock(state, scene) {
  if (scene.id === 'ch03_s02' && !state.ch03_s01_complete) return 'Complete Chapter III Scene 01 before opening The Listening Room.';
  if (scene.id === 'ch03_s03' && !state.applied_events.includes('ch03_s02_complete')) return 'Complete Chapter III Scene 02 before opening Finding the Main Stress.';
  if (scene.id === 'ch03_s04' && !state.applied_events.includes('ch03_s03_complete')) return 'Complete Chapter III Scene 03 before opening A Sentence Has Shape.';
  if (scene.id === 'ch03_s05' && !state.applied_events.includes('ch03_s04_complete')) return 'Complete Chapter III Scene 04 before opening The Bad Day.';
  if (scene.id === 'ch03_s06' && !state.applied_events.includes('ch03_s05_complete')) return 'Complete Chapter III Scene 05 before opening A Small Victory.';
  if (scene.id === 'ch01_s01' && !state.opening_tone) return 'Choose a first response before continuing.';
  if (scene.decision && !state.decisions[scene.decision.id]) return 'Choose a response to continue.';
  if (scene.id === 'ch02_s01') return state.ch02_lc03_completed ? '' : 'Complete the reading challenge to continue.';
  if (scene.id === 'ch02_s02') return state.ch02_lc04_completed ? '' : 'Complete the language challenge to continue.';
  if (scene.challenge && !isChallengeComplete(state, scene.challenge.id)) return 'Complete the listening challenge to continue.';
  return '';
}

export function canAdvanceScene(state, scene) {
  return !getSceneAdvanceBlock(state, scene);
}

export function markChapterComplete(state) {
  return { ...state, completed: true, scene: 'ch01_s05' };
}

export function setSoundPreference(state, enabled) {
  return { ...state, soundEnabled: Boolean(enabled) };
}

export function completeS04Terms(state) {
  if (state.scene !== 'ch02_s04') return state;
  const eventId = 'ch02_s04_terms_understood';
  if (state.lesson_terms_understood && state.applied_events.includes(eventId)) return state;
  return { ...state, lesson_terms_understood: true,
    applied_events: state.applied_events.includes(eventId) ? state.applied_events : [...state.applied_events, eventId] };
}

export function completeChapterTwo(state) {
  if (state.scene !== 'ch02_s05' || !state.confirmed_motivation || !state.applied_events.includes('ch02_d05_confirmed_motivation')) return state;
  if (state.ch02_complete && state.applied_events.includes('ch02_complete')) return state;
  return { ...state, ch02_complete: true,
    applied_events: state.applied_events.includes('ch02_complete') ? state.applied_events : [...state.applied_events, 'ch02_complete'] };
}

// The same challenge record and stable event store own attempts and completion.
export function recordLc05Answer(state, sampleId, answerId) {
  const sample = CH03_SCENE_01.challenge.samples.find(({ id }) => id === sampleId);
  const challenge = state.challenges.lc05;
  const eventId = 'ch03_lc05_completed';
  if (state.scene !== 'ch03_s01' || !state.decisions.D06 || !sample || !sample.options.some(({ id }) => id === answerId) ||
      state.ch03_lc05_completed || challenge.completed || state.applied_events.includes(eventId) || challenge.answers[sampleId]?.correct) return state;
  const answers = { ...challenge.answers, [sampleId]: { answer: answerId, correct: answerId === sample.answer } };
  const completed = CH03_SCENE_01.challenge.samples.every(({ id, answer }) => answers[id]?.answer === answer);
  return { ...state, ch03_lc05_attempts: state.ch03_lc05_attempts + 1, ch03_lc05_completed: completed,
    pronunciation: state.pronunciation + (completed ? 1 : 0),
    applied_events: completed ? [...state.applied_events, eventId] : state.applied_events,
    challenges: { ...state.challenges, lc05: { ...challenge, answers, completed } } };
}

export function completeScene(state, scene) {
  if (state.scene !== scene.id || getSceneAdvanceBlock(state, scene)) return state;
  if (scene.id === 'ch03_s01') {
    if (!state.ch03_lc05_completed || state.ch03_s01_complete || state.applied_events.includes('ch03_s01_complete')) return state;
    return { ...state, ch03_s01_complete: true, applied_events: [...state.applied_events, 'ch03_s01_complete'] };
  }
  if (scene.id === 'ch03_s02') {
    const eventId = 'ch03_s02_complete';
    if (!state.challenges.lc06.completed || state.applied_events.includes(eventId)) return state;
    return { ...state, applied_events: [...state.applied_events, eventId] };
  }
  if (scene.id === 'ch03_s03') {
    const eventId = 'ch03_s03_complete';
    if (!state.challenges.lc07.completed || state.applied_events.includes(eventId)) return state;
    return { ...state, applied_events: [...state.applied_events, eventId] };
  }
  if (scene.id === 'ch03_s04') {
    const eventId = 'ch03_s04_complete';
    if (!state.decisions.D07 || !state.challenges.lc08.completed || state.applied_events.includes(eventId)) return state;
    return { ...state, applied_events: [...state.applied_events, eventId] };
  }
  if (scene.id === 'ch03_s05') {
    const eventId = 'ch03_s05_complete';
    if (!state.challenges.lc09.completed || state.applied_events.includes(eventId)) return state;
    return { ...state, applied_events: [...state.applied_events, eventId] };
  }
  if (scene.id === 'ch03_s06') {
    const eventId = 'ch03_s06_complete';
    if (!state.challenges.lc10.completed || state.applied_events.includes(eventId)) return state;
    return { ...state, applied_events: [...state.applied_events, eventId] };
  }
  return state;
}

export function recordLc06Attempt(state, sampleId, wordAnswer, meaningAnswer) {
  const sample = CH03_SCENE_02.challenge.samples.find(({ id }) => id === sampleId);
  const wordIds = CH03_SCENE_02.challenge.wordOptions.map(({ id }) => id);
  const meaningIds = CH03_SCENE_02.challenge.meaningOptions.map(({ id }) => id);
  const challenge = state.challenges.lc06;
  if (state.scene !== 'ch03_s02' || !state.ch03_s01_complete || !sample || challenge.completed ||
      !wordIds.includes(wordAnswer) || !meaningIds.includes(meaningAnswer) ||
      state.applied_events.includes('ch03_lc06_completed')) return state;
  const current = challenge.answers[sampleId] || {};
  const word = current.word?.correct ? current.word : { answer: wordAnswer, correct: wordAnswer === sample.word };
  const meaning = current.meaning?.correct ? current.meaning : { answer: meaningAnswer, correct: meaningAnswer === sample.meaning };
  const answers = { ...challenge.answers, [sampleId]: { word, meaning } };
  const completed = CH03_SCENE_02.challenge.samples.every(({ id }) => answers[id]?.word?.correct && answers[id]?.meaning?.correct);
  const eventId = 'ch03_lc06_completed';
  const wasCompleted = challenge.completed || state.applied_events.includes(eventId);
  return {
    ...state,
    pronunciation: state.pronunciation + (completed && !wasCompleted && !challenge.supportUsed ? 1 : 0),
    applied_events: completed && !wasCompleted ? [...state.applied_events, eventId] : state.applied_events,
    challenges: { ...state.challenges, lc06: { ...challenge, answers, completed, attempts: (challenge.attempts || 0) + 1, firstAttempt: true } }
  };
}

export function recordLc06UnableToHear(state) {
  const challenge = state.challenges.lc06;
  if (state.scene !== 'ch03_s02' || !state.ch03_s01_complete || challenge.completed || challenge.firstAttempt) return state;
  return { ...state, challenges: { ...state.challenges, lc06: { ...challenge, firstAttempt: true, attempts: (challenge.attempts || 0) + 1 } } };
}

export function markLc06SupportUsed(state) {
  const challenge = state.challenges.lc06;
  if (state.scene !== 'ch03_s02' || !challenge.firstAttempt || challenge.completed || challenge.supportUsed) return state;
  return { ...state, challenges: { ...state.challenges, lc06: { ...challenge, supportUsed: true } } };
}

export function recordLc07Answer(state, sampleId, answerId) {
  const sample = CH03_SCENE_03.challenge.samples.find(({ id }) => id === sampleId);
  const challenge = state.challenges.lc07;
  if (state.scene !== 'ch03_s03' || !state.applied_events.includes('ch03_s02_complete') || !sample ||
      !sample.options.includes(answerId) || challenge.completed || state.applied_events.includes('ch03_lc07_completed') ||
      challenge.answers[sampleId]?.correct) return state;

  const correct = answerId === sample.answer;
  const answers = { ...challenge.answers, [sampleId]: { answer: answerId, correct } };
  const completed = CH03_SCENE_03.challenge.samples.every(({ id }) => answers[id]?.correct);
  const completionEvent = 'ch03_lc07_completed';
  const firstCompletion = completed && !challenge.completed && !state.applied_events.includes(completionEvent);
  return {
    ...state,
    pronunciation: state.pronunciation + (firstCompletion && !challenge.supportUsed ? 1 : 0),
    applied_events: firstCompletion ? [...state.applied_events, completionEvent] : state.applied_events,
    challenges: {
      ...state.challenges,
      lc07: { ...challenge, answers, completed, attempts: (challenge.attempts || 0) + 1, firstAttempt: true }
    }
  };
}

export function markLc07SupportUsed(state) {
  const challenge = state.challenges.lc07;
  if (state.scene !== 'ch03_s03' || !challenge.firstAttempt || challenge.completed || challenge.supportUsed) return state;
  return { ...state, challenges: { ...state.challenges, lc07: { ...challenge, supportUsed: true } } };
}

export function recordLc08Answer(state, sampleId, answerId) {
  const sample = CH03_SCENE_04.challenge.samples.find(({ id }) => id === sampleId);
  const challenge = state.challenges.lc08;
  if (state.scene !== 'ch03_s04' || !state.applied_events.includes('ch03_s03_complete') || !state.decisions.D07 ||
      !sample || !sample.options.includes(answerId) || challenge.completed || state.applied_events.includes('ch03_lc08_completed') ||
      challenge.answers[sampleId]?.correct) return state;

  const answers = { ...challenge.answers, [sampleId]: { answer: answerId, correct: answerId === sample.answer } };
  const completed = CH03_SCENE_04.challenge.samples.every(({ id }) => answers[id]?.correct);
  const eventId = 'ch03_lc08_completed';
  const firstCompletion = completed && !challenge.completed && !state.applied_events.includes(eventId);
  return {
    ...state,
    pronunciation: state.pronunciation + (firstCompletion && !challenge.supportUsed ? 1 : 0),
    applied_events: firstCompletion ? [...state.applied_events, eventId] : state.applied_events,
    challenges: { ...state.challenges, lc08: { ...challenge, answers, completed,
      attempts: (challenge.attempts || 0) + 1, firstAttempt: true } }
  };
}

export function markLc08SupportUsed(state) {
  const challenge = state.challenges.lc08;
  if (state.scene !== 'ch03_s04' || !challenge.firstAttempt || challenge.completed || challenge.supportUsed) return state;
  return { ...state, challenges: { ...state.challenges, lc08: { ...challenge, supportUsed: true } } };
}

export function recordLc09Answer(state, sampleId, answerId) {
  const sample = CH03_SCENE_05.challenge.samples.find(({ id }) => id === sampleId);
  const challenge = state.challenges.lc09;
  const eventId = 'ch03_lc09_completed';
  if (state.scene !== 'ch03_s05' || !state.applied_events.includes('ch03_s04_complete') || !sample ||
      !sample.options.includes(answerId) || challenge.completed || state.applied_events.includes(eventId) ||
      challenge.answers[sampleId]?.correct) return state;

  const answers = { ...challenge.answers, [sampleId]: { answer: answerId, correct: answerId === sample.answer } };
  const completed = CH03_SCENE_05.challenge.samples.every(({ id }) => answers[id]?.correct);
  const firstCompletion = completed && !challenge.completed && !state.applied_events.includes(eventId);
  return {
    ...state,
    pronunciation: state.pronunciation + (firstCompletion && !challenge.supportUsed ? 1 : 0),
    applied_events: firstCompletion ? [...state.applied_events, eventId] : state.applied_events,
    challenges: { ...state.challenges, lc09: { ...challenge, answers, completed, attempts: (challenge.attempts || 0) + 1, firstAttempt: true } }
  };
}

export function markLc09SupportUsed(state, sampleId) {
  const sample = CH03_SCENE_05.challenge.samples.find(({ id }) => id === sampleId);
  const challenge = state.challenges.lc09;
  if (state.scene !== 'ch03_s05' || !challenge.firstAttempt || challenge.completed || !sample ||
      challenge.answers[sampleId]?.correct || challenge.supportSamples.includes(sampleId)) return state;
  return {
    ...state,
    challenges: { ...state.challenges, lc09: {
      ...challenge, supportUsed: true, supportSamples: [...challenge.supportSamples, sampleId]
    } }
  };
}

export function recordLc10Answer(state, sampleId, answerId) {
  const sample = CH03_SCENE_06.challenge.samples.find(({ id }) => id === sampleId);
  const challenge = state.challenges.lc10;
  const eventId = 'ch03_lc10_completed';
  if (state.scene !== 'ch03_s06' || !state.applied_events.includes('ch03_s05_complete') || !sample ||
      !sample.options.some(({ id }) => id === answerId) || challenge.completed ||
      state.applied_events.includes(eventId) || challenge.answers[sampleId]?.correct) return state;

  const answers = { ...challenge.answers, [sampleId]: { answer: answerId, correct: answerId === sample.answer } };
  const completed = CH03_SCENE_06.challenge.samples.every(({ id }) => answers[id]?.correct);
  const firstCompletion = completed && !challenge.completed && !state.applied_events.includes(eventId);
  return {
    ...state,
    pronunciation: state.pronunciation + (firstCompletion && !challenge.supportUsed ? 1 : 0),
    applied_events: firstCompletion ? [...state.applied_events, eventId] : state.applied_events,
    challenges: { ...state.challenges, lc10: { ...challenge, answers, completed, attempts: (challenge.attempts || 0) + 1, firstAttempt: true } }
  };
}

export function markLc10SupportUsed(state, sampleId) {
  const sample = CH03_SCENE_06.challenge.samples.find(({ id }) => id === sampleId);
  const challenge = state.challenges.lc10;
  if (state.scene !== 'ch03_s06' || !challenge.firstAttempt || challenge.completed || !sample ||
      challenge.answers[sampleId]?.correct || challenge.answers[sampleId]?.answer === undefined ||
      challenge.supportSamples.includes(sampleId)) return state;
  return {
    ...state,
    challenges: { ...state.challenges, lc10: {
      ...challenge, supportUsed: true, supportSamples: [...challenge.supportSamples, sampleId]
    } }
  };
}
