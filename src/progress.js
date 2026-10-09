import { createInitialState, normalizeState, STORAGE_KEY } from './state.js';

export const SAVE_KEY = 'pygmalion.reader.progress.v2';
export const SAVE_VERSION = 2;

export const CHAPTERS = [
  { id: 'ch01', numeral: 'I', title: 'The Flower Girl', entry: 'ch01_s01', scenes: ['ch01_s01', 'ch01_s02', 'ch01_s03', 'ch01_s04', 'ch01_s05'], fields: ['opening_tone', 'freddy_first_impression', 'higgins_first_impression', 'ear_test_intro_seen', 'origin_motivation', 'completed'], decisions: ['D01', 'D02', 'D03'], challenges: ['lc01', 'lc02'],
    completion: (state) => Boolean(state.completed) },
  { id: 'ch02', numeral: 'II', title: 'The Bargain', entry: 'ch02_s01', scenes: ['ch02_s01', 'ch02_s02', 'ch02_s03', 'ch02_s04', 'ch02_s05'], fields: ['request_strategy', 'ch02_lc03_attempts', 'ch02_lc03_completed', 'experiment_framing_heard', 'boundary_questioned', 'lesson_terms_understood', 'confirmed_motivation', 'motivation_shift', 'ch02_complete', 'ch02_lc04_attempts', 'ch02_lc04_completed', 'lc04_presentation_order'], decisions: ['D04', 'D05'], challenges: ['lc04'],
    completion: (state) => Boolean(state.ch02_complete && state.applied_events.includes('ch02_complete')) },
  { id: 'ch03', numeral: 'III', title: 'The Lessons', entry: 'ch03_s01', scenes: ['ch03_s01', 'ch03_s02', 'ch03_s03', 'ch03_s04', 'ch03_s05', 'ch03_s06'], fields: ['practice_preference', 'ch03_lc05_attempts', 'ch03_lc05_completed', 'ch03_s01_complete'], decisions: ['D06', 'D07'], challenges: ['lc05', 'lc06', 'lc07', 'lc08', 'lc09', 'lc10'],
    completion: (state) => state.applied_events.includes('ch03_s06_complete') },
  { id: 'ch04', numeral: 'IV', title: 'The First Test', entry: 'ch04_s01', scenes: ['ch04_s01', 'ch04_s02', 'ch04_s03', 'ch04_s04', 'ch04_s05'], fields: [], decisions: ['D08', 'D09'], challenges: ['lc11', 'lc12'],
    completion: (state) => state.applied_events.includes('ch04_s05_complete') },
  { id: 'ch05', numeral: 'V', title: 'The Reception', entry: 'ch05_s01', scenes: ['ch05_s01', 'ch05_s02', 'ch05_s03', 'ch05_s04', 'ch05_s05'], fields: ['reception_register_plan', 'credit_response', 'future_question_style', 'next_contact', 'ch05_complete'], decisions: [], challenges: ['lc13', 'lc14'],
    completion: (state) => Boolean(state.ch05_complete && state.applied_events.includes('ch05_s05_complete')) },
  { id: 'ch06', numeral: 'VI', title: 'Her Own Voice', entry: 'ch06_s01', scenes: ['ch06_s01', 'ch06_s02', 'ch06_s03', 'ch06_s04', 'ch06_s05'], fields: ['chapter6_direction', 'final_statement_shape', 'ch06_complete'], decisions: [], challenges: ['lc15'],
    completion: (state) => Boolean(state.ch06_complete && state.applied_events.includes('ch06_completion_recorded')) }
];

const clone = (value) => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
const validChapter = (id) => CHAPTERS.some((chapter) => chapter.id === id);
const chapterForScene = (scene) => CHAPTERS.find((chapter) => chapter.scenes.includes(scene));
const emptyEnvelope = () => ({
  schemaVersion: SAVE_VERSION,
  activeChapter: null,
  activeScene: null,
  lastActiveBookmark: null,
  eventOrder: [],
  soundEnabled: true,
  completionRecords: Object.fromEntries(CHAPTERS.map(({ id }) => [id, false])),
  chapters: Object.fromEntries(CHAPTERS.map(({ id, entry }) => [id, { visited: false, scene: entry, state: {}, signals: { confidence: 0, pronunciation: 0, independence: 0 }, events: [], inheritedContext: {} }]))
});

function ownerEvents(events, chapter) {
  return events.filter((event) => event.startsWith(`${chapter.id}_`));
}

function checkpointFromState(state, chapter, scene = state.scene) {
  const defaults = createInitialState();
  const chapterState = {};
  for (const field of chapter.fields) chapterState[field] = clone(state[field] ?? defaults[field]);
  const decisions = Object.fromEntries(chapter.decisions.filter((key) => state.decisions?.[key] !== undefined).map((key) => [key, clone(state.decisions[key])]));
  const challenges = Object.fromEntries(chapter.challenges.filter((key) => state.challenges?.[key] !== undefined).map((key) => [key, clone(state.challenges[key])]));
  const reflections = chapter.id === 'ch04' ? clone(state.reflections || defaults.reflections) : undefined;
  return {
    visited: true,
    scene: chapter.scenes.includes(scene) ? scene : chapter.entry,
    state: chapterState,
    decisions,
    challenges,
    ...(reflections ? { reflections } : {}),
    signals: { confidence: Number(state.confidence) || 0, pronunciation: Number(state.pronunciation) || 0, independence: Number(state.independence) || 0 },
    events: ownerEvents(Array.isArray(state.applied_events) ? state.applied_events : [], chapter)
  };
}

function reconstructScene(legacy, chapter) {
  if (chapterForScene(legacy.scene)?.id === chapter.id) return legacy.scene;
  const endIndex = chapter.scenes.findIndex((scene, index) => index < chapter.scenes.length - 1 && !legacy.applied_events.includes(`${chapter.id}_s${String(index + 1).padStart(2, '0')}_complete`));
  if (endIndex >= 0) {
    const previous = endIndex === 0 ? null : chapter.scenes[endIndex - 1];
    if (previous && legacy.applied_events.includes(`${chapter.id}_s${String(endIndex).padStart(2, '0')}_complete`)) return chapter.scenes[endIndex];
  }
  const lastComplete = chapter.scenes.findIndex((scene, index) => index === chapter.scenes.length - 1 && chapter.completion(legacy));
  if (lastComplete >= 0) return chapter.scenes[lastComplete];
  for (let index = chapter.scenes.length - 1; index >= 0; index -= 1) {
    if (legacy.applied_events.includes(`${chapter.id}_s${String(index + 1).padStart(2, '0')}_complete`)) return chapter.scenes[Math.min(index + 1, chapter.scenes.length - 1)];
  }
  return chapter.entry;
}

function hasLegacyChapterData(legacy, chapter) {
  if (chapterForScene(legacy.scene)?.id === chapter.id || ownerEvents(legacy.applied_events, chapter).length) return true;
  if (chapter.decisions.some((key) => legacy.decisions[key] !== undefined)) return true;
  if (chapter.challenges.some((key) => {
    const challenge = legacy.challenges[key];
    return challenge && (Object.keys(challenge.answers || {}).length || challenge.completed || challenge.attempts || challenge.firstAttempt || challenge.supportUsed);
  })) return true;
  return chapter.fields.some((field) => {
    const initial = createInitialState()[field];
    return legacy[field] !== initial && legacy[field] !== undefined;
  });
}

function migrateLegacy(legacy) {
  const envelope = emptyEnvelope();
  const active = chapterForScene(legacy.scene) || CHAPTERS[0];
  envelope.soundEnabled = Boolean(legacy.soundEnabled);
  for (const chapter of CHAPTERS) {
    if (!hasLegacyChapterData(legacy, chapter)) continue;
    const checkpoint = checkpointFromState(legacy, chapter, reconstructScene(legacy, chapter));
    // V1 tracked only cumulative signals. Retaining that total in visited checkpoints
    // preserves earned development signals without attempting to replay rewards.
    envelope.chapters[chapter.id] = checkpoint;
  }
  if (!envelope.chapters[active.id].visited) envelope.chapters[active.id] = checkpointFromState(legacy, active);
  envelope.activeChapter = active.id;
  envelope.activeScene = envelope.chapters[active.id].scene;
  envelope.eventOrder = [...legacy.applied_events];
  envelope.lastActiveBookmark = { chapter: active.id, scene: envelope.activeScene };
  envelope.completionRecords = Object.fromEntries(CHAPTERS.map((chapter) => [chapter.id, chapter.completion(composeState(envelope, chapter.id))]));
  return envelope;
}

export function migrateLegacySave(raw) {
  return migrateLegacy(normalizeState(raw));
}

export function normalizeEnvelope(raw) {
  if (!raw || raw.schemaVersion !== SAVE_VERSION || !raw.chapters || typeof raw.chapters !== 'object') return null;
  const envelope = emptyEnvelope();
  envelope.soundEnabled = raw.soundEnabled !== false;
  for (const chapter of CHAPTERS) {
    const saved = raw.chapters[chapter.id];
    if (!saved || typeof saved !== 'object') continue;
    const normalized = normalizeState({ ...createInitialState(), ...(saved.state || {}), decisions: saved.decisions || {}, challenges: saved.challenges || {}, reflections: saved.reflections || {}, confidence: saved.signals?.confidence, pronunciation: saved.signals?.pronunciation, independence: saved.signals?.independence, applied_events: saved.events || [], scene: saved.scene });
    const cp = checkpointFromState(normalized, chapter, saved.scene);
    cp.visited = Boolean(saved.visited && chapter.scenes.includes(saved.scene));
    cp.inheritedContext = saved.inheritedContext && typeof saved.inheritedContext === 'object' ? clone(saved.inheritedContext) : {};
    envelope.chapters[chapter.id] = cp;
  }
  const bookmark = raw.lastActiveBookmark;
  const bookmarkValid = bookmark && validChapter(bookmark.chapter) && envelope.chapters[bookmark.chapter].visited && envelope.chapters[bookmark.chapter].scene === bookmark.scene;
  envelope.activeChapter = validChapter(raw.activeChapter) && envelope.chapters[raw.activeChapter].visited ? raw.activeChapter : bookmarkValid ? bookmark.chapter : null;
  envelope.activeScene = envelope.activeChapter ? envelope.chapters[envelope.activeChapter].scene : null;
  const savedEventIds = new Set(CHAPTERS.flatMap(({ id }) => envelope.chapters[id].events));
  envelope.eventOrder = Array.isArray(raw.eventOrder) ? raw.eventOrder.filter((event) => typeof event === 'string' && savedEventIds.has(event)) : [];
  envelope.lastActiveBookmark = bookmarkValid ? { chapter: bookmark.chapter, scene: bookmark.scene } : envelope.activeChapter ? { chapter: envelope.activeChapter, scene: envelope.activeScene } : null;
  envelope.completionRecords = Object.fromEntries(CHAPTERS.map((chapter) => [chapter.id, chapter.completion(composeState(envelope, chapter.id))]));
  return envelope;
}

function historyContext(envelope, beforeChapter) {
  const index = CHAPTERS.findIndex(({ id }) => id === beforeChapter);
  const context = { decisions: {}, fields: {}, events: [] };
  for (const chapter of CHAPTERS.slice(0, index)) {
    const checkpoint = envelope.chapters[chapter.id];
    if (!checkpoint?.visited) continue;
    Object.assign(context.fields, checkpoint.state || {});
    Object.assign(context.decisions, checkpoint.decisions || {});
    context.events.push(...(checkpoint.events || []));
  }
  return context;
}

export function composeState(envelope, chapterId) {
  const chapter = CHAPTERS.find(({ id }) => id === chapterId);
  if (!chapter) return createInitialState();
  const state = createInitialState();
  const allEvents = [];
  for (const owner of CHAPTERS) {
    const checkpoint = envelope.chapters[owner.id];
    if (!checkpoint?.visited) continue;
    Object.assign(state, checkpoint.state || {});
    Object.assign(state.decisions, checkpoint.decisions || {});
    Object.assign(state.challenges, checkpoint.challenges || {});
    if (checkpoint.reflections) state.reflections = { ...state.reflections, ...checkpoint.reflections };
    allEvents.push(...(checkpoint.events || []));
  }
  const active = envelope.chapters[chapterId];
  if (active?.visited) {
    Object.assign(state, active.state || {});
    state.confidence = active.signals.confidence;
    state.pronunciation = active.signals.pronunciation;
    state.independence = active.signals.independence;
    state.scene = active.scene;
    state.started = true;
  } else {
    state.scene = chapter.entry;
    state.started = true;
  }
  state.applied_events = [...new Set([...(envelope.eventOrder || []), ...allEvents])];
  state.soundEnabled = envelope.soundEnabled;
  return normalizeState(state);
}

export function loadReaderProgress(storage = globalThis.localStorage) {
  const empty = emptyEnvelope();
  try {
    const versioned = storage?.getItem(SAVE_KEY);
    if (versioned) {
      const normalized = normalizeEnvelope(JSON.parse(versioned));
      if (normalized) return { envelope: normalized, state: normalized.activeChapter ? composeState(normalized, normalized.activeChapter) : createInitialState(), migrated: false };
    }
    const legacyText = storage?.getItem(STORAGE_KEY);
    if (!legacyText) return { envelope: empty, state: createInitialState(), migrated: false };
    const legacy = normalizeState(JSON.parse(legacyText));
    const envelope = migrateLegacy(legacy);
    storage?.setItem(SAVE_KEY, JSON.stringify(envelope));
    return { envelope, state: composeState(envelope, envelope.activeChapter), migrated: true };
  } catch {
    return { envelope: empty, state: createInitialState(), migrated: false };
  }
}

export function selectChapter(envelope, chapterId) {
  const chapter = CHAPTERS.find(({ id }) => id === chapterId);
  if (!chapter) return { envelope, state: createInitialState() };
  const next = clone(envelope);
  let checkpoint = next.chapters[chapter.id];
  if (!checkpoint.visited) {
    const previous = [...CHAPTERS.slice(0, CHAPTERS.indexOf(chapter))].reverse().find((candidate) => next.completionRecords[candidate.id]);
    const inherited = previous ? composeState(next, previous.id) : createInitialState();
    inherited.scene = chapter.entry;
    inherited.started = true;
    checkpoint = checkpointFromState(inherited, chapter, chapter.entry);
    checkpoint.inheritedContext = historyContext(next, chapter.id);
    next.chapters[chapter.id] = checkpoint;
  }
  next.activeChapter = chapter.id;
  next.activeScene = checkpoint.scene;
  next.lastActiveBookmark = { chapter: chapter.id, scene: checkpoint.scene };
  return { envelope: next, state: composeState(next, chapter.id) };
}

export function persistReaderProgress(envelope, state, { updateBookmark = true } = {}, storage = globalThis.localStorage) {
  const chapter = chapterForScene(state.scene);
  if (!chapter) return envelope;
  const next = clone(envelope);
  const checkpoint = checkpointFromState(state, chapter, state.scene);
  checkpoint.inheritedContext = next.chapters[chapter.id]?.inheritedContext || {};
  next.chapters[chapter.id] = checkpoint;
  next.eventOrder = [...new Set(state.applied_events || [])];
  next.activeChapter = chapter.id;
  next.activeScene = state.scene;
  next.soundEnabled = Boolean(state.soundEnabled);
  next.completionRecords = Object.fromEntries(CHAPTERS.map((entry) => [entry.id, entry.completion(composeState(next, entry.id))]));
  if (updateBookmark) next.lastActiveBookmark = { chapter: chapter.id, scene: state.scene };
  try { storage?.setItem(SAVE_KEY, JSON.stringify(next)); } catch { /* Storage failure must not interrupt reading. */ }
  return next;
}

export function getChapterCheckpoint(envelope, chapterId) {
  const chapter = CHAPTERS.find(({ id }) => id === chapterId);
  const checkpoint = envelope?.chapters?.[chapterId];
  if (!chapter || !checkpoint?.visited) return null;
  const state = composeState(envelope, chapterId);
  const complete = chapter.completion(state);
  return { scene: checkpoint.scene, complete, visited: true, state };
}

export function restoreBookmark(envelope) {
  const bookmark = envelope?.lastActiveBookmark;
  if (!bookmark || !validChapter(bookmark.chapter)) return null;
  const checkpoint = envelope.chapters[bookmark.chapter];
  if (!checkpoint?.visited || checkpoint.scene !== bookmark.scene) return null;
  return { envelope, state: composeState(envelope, bookmark.chapter) };
}
