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
    confidence: 0,
    pronunciation: 0,
    independence: 0,
    applied_events: [],
    decisions: {},
    challenges: {
      lc01: { answers: {}, completed: false, optionOrders: {} },
      lc02: { answers: {}, completed: false, optionOrders: {} }
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
      lc02: { ...initial.challenges.lc02, ...((raw.challenges || {}).lc02 || {}) }
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

export function markChallengeEntered(state, challengeId) {
  if (challengeId !== 'LC02' || state.ear_test_intro_seen) return state;
  return { ...state, ear_test_intro_seen: true };
}

export function isChallengeComplete(state, challengeId) {
  return Boolean(state.challenges[challengeId.toLowerCase()]?.completed);
}

export function getSceneAdvanceBlock(state, scene) {
  if (scene.id === 'ch01_s01' && !state.opening_tone) return 'Choose a first response before continuing.';
  if (scene.decision && !state.decisions[scene.decision.id]) return 'Choose a response to continue.';
  if (scene.id === 'ch02_s01') return state.ch02_lc03_completed ? '' : 'Complete the reading challenge to continue.';
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
