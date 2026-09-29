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
    confidence: 0,
    pronunciation: 0,
    independence: 0,
    applied_events: [],
    decisions: {},
    challenges: {
      lc01: { answers: {}, completed: false },
      lc02: { answers: {}, completed: false }
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
  const eventByDecision = { D01: 'ch01_d01_resolution', D02: 'ch01_d02_response', D03: 'ch01_d03_origin_motivation' };
  const eventId = eventByDecision[decisionId];
  if (!eventId || state.decisions[decisionId]) return state;

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
  return next;
}

export function recordChallengeAnswer(state, challengeId, sampleId, answer, correct) {
  const key = challengeId.toLowerCase();
  if (!state.challenges[key]) return state;
  const challenge = state.challenges[key];
  const answers = { ...challenge.answers, [sampleId]: { answer, correct: Boolean(correct) } };
  const sampleCount = key === 'lc01' ? 3 : 3;
  const completed = Object.values(answers).filter((item) => item.correct).length >= sampleCount;
  const next = {
    ...state,
    challenges: { ...state.challenges, [key]: { ...challenge, answers, completed } }
  };
  if (key === 'lc02' && !state.ear_test_intro_seen) next.ear_test_intro_seen = true;
  return next;
}

export function markChallengeEntered(state, challengeId) {
  if (challengeId !== 'LC02' || state.ear_test_intro_seen) return state;
  return { ...state, ear_test_intro_seen: true };
}

export function isChallengeComplete(state, challengeId) {
  return Boolean(state.challenges[challengeId.toLowerCase()]?.completed);
}

export function markChapterComplete(state) {
  return { ...state, completed: true, scene: 'ch01_s05' };
}

export function setSoundPreference(state, enabled) {
  return { ...state, soundEnabled: Boolean(enabled) };
}
