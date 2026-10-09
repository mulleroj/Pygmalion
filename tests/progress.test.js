import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPTERS, SAVE_KEY, SAVE_VERSION, composeState, getChapterCheckpoint, loadReaderProgress, migrateLegacySave, persistReaderProgress, selectChapter } from '../src/progress.js';
import { createInitialState, STORAGE_KEY, setScene } from '../src/state.js';

function memoryStorage(values = {}) {
  const data = new Map(Object.entries(values));
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), data };
}

test('each chapter opens independently and keeps its own scene, answers, signals, and completion status', () => {
  let envelope = loadReaderProgress(memoryStorage()).envelope;
  const savedChallenges = {};
  for (const chapter of CHAPTERS) {
    const opened = selectChapter(envelope, chapter.id);
    assert.equal(opened.state.scene, chapter.entry);
    assert.equal(opened.envelope.lastActiveBookmark.chapter, chapter.id);
    const challengeId = chapter.challenges[0];
    const challenge = { answers: { sample: { answer: `${chapter.id}-saved`, correct: true } }, completed: false, attempts: 1 };
    const chapterState = { ...opened.state, scene: chapter.scenes.at(-1), confidence: chapter.id === 'ch05' ? 4 : 0, challenges: { ...opened.state.challenges, [challengeId]: challenge } };
    envelope = opened.envelope;
    const saved = persistReaderProgress(envelope, chapterState);
    assert.equal(getChapterCheckpoint(saved, chapter.id).scene, chapter.scenes.at(-1));
    assert.equal(getChapterCheckpoint(saved, chapter.id).state.challenges[challengeId].answers.sample.answer, `${chapter.id}-saved`);
    assert.equal(saved.completionRecords[chapter.id], false);
    savedChallenges[chapter.id] = challengeId;
    envelope = saved;
  }
  assert.equal(composeState(envelope, 'ch05').confidence, 4);
  assert.equal(composeState(envelope, 'ch06').confidence, 0);
  for (const chapter of CHAPTERS) {
    assert.equal(selectChapter(envelope, chapter.id).state.challenges[savedChallenges[chapter.id]].answers.sample.answer, `${chapter.id}-saved`);
  }
});
test('legacy v1 migration preserves earned progress and invents no earlier chapter completion events', () => {
  const legacy = { ...createInitialState(), started: true, scene: 'ch05_s02', reception_register_plan: 'd10_plain_and_clear', challenges: { lc13: { answers: { a: 'correct' }, attempts: { a: 1 }, completed: false } }, applied_events: ['ch01_s02_complete', 'ch05_s01_complete'], confidence: 2, pronunciation: 3, independence: 1 };
  const envelope = migrateLegacySave(legacy);
  assert.equal(envelope.schemaVersion, SAVE_VERSION);
  assert.equal(envelope.activeChapter, 'ch05');
  assert.equal(envelope.chapters.ch05.state.reception_register_plan, 'd10_plain_and_clear');
  assert.equal(envelope.chapters.ch05.scene, 'ch05_s02');
  assert.equal(envelope.chapters.ch05.challenges.lc13.answers.a, 'correct');
  assert.equal(envelope.chapters.ch01.events.includes('ch01_s02_complete'), true);
  assert.equal(envelope.chapters.ch02.events.some((event) => event.endsWith('_complete')), false);
  assert.equal(envelope.completionRecords.ch01, false);
  assert.equal(envelope.completionRecords.ch05, false);
});

test('loading migrates without deleting the existing key; refresh restores active bookmark and checkpoints', () => {
  const legacy = { ...createInitialState(), started: true, scene: 'ch05_s03', decisions: { D10: 'd10_plain_and_clear' }, applied_events: ['ch05_s01_complete'] };
  const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify(legacy) });
  const loaded = loadReaderProgress(storage);
  assert.equal(loaded.migrated, true);
  assert.ok(storage.getItem(STORAGE_KEY));
  assert.ok(storage.getItem(SAVE_KEY));
  assert.equal(loadReaderProgress(storage).state.scene, 'ch05_s03');
  const resumed = selectChapter(loaded.envelope, 'ch05');
  assert.equal(resumed.state.scene, 'ch05_s03');
  const restored = persistReaderProgress(resumed.envelope, setScene(resumed.state, 'ch05_s04'), {}, storage);
  assert.equal(restored.lastActiveBookmark.scene, 'ch05_s04');
  assert.equal(loadReaderProgress(storage).state.scene, 'ch05_s04');
});
