import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH05_SCENE_01, CH05_SCENE_02, CH05_SCENE_03, CH05_S03_TEACHER_SECTIONS, ch05S04CompanionFor } from '../src/ch05-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, saveState, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appSource = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const ids = ['d11_accept_for_now', 'd11_redirect_publicly', 'd11_private_conversation'];
const lines = [
  'Thank you. I would rather speak about the flowers tonight.',
  'I learned a great deal, but this evening belongs to the growers — and I made my own choices too.',
  'Thank you. I would like to speak about that later, in private.'
];
const readyS03 = () => ({
  ...setScene(createInitialState(), CH05_SCENE_03.id),
  applied_events: ['ch04_s05_complete', 'ch05_s01_complete', 'ch05_s02_complete']
});

test('S03 keeps canonical scene identity, credit dialogue, hall visual and D11 text-only', () => {
  assert.deepEqual([CH05_SCENE_03.id, CH05_SCENE_03.number, CH05_SCENE_03.title, CH05_SCENE_03.chapter, CH05_SCENE_03.chapterTitle], [
    'ch05_s03', 3, 'The Display and the Question', 'V', 'The Reception'
  ]);
  assert.equal(CH05_SCENE_03.location, 'Lambeth Public Rooms — main flower display');
  assert.deepEqual(CH05_SCENE_03.storyBeats.filter(({ type }) => type === 'dialogue').map(({ speaker, text }) => [speaker, text]), [
    ['Patron / guest', 'Professor Higgins, Colonel Pickering — you must be proud. What a transformation.'],
    ['Higgins', 'The result speaks for the method.'],
    ['Pickering', 'Eliza has worked very hard.'],
    ['Patron / guest', 'It was a remarkable evening for you both.'],
    ['Eliza', 'I know what I contributed.']
  ]);
  assert.equal(CH05_SCENE_03.background.src, CH05_SCENE_01.background.src);
  assert.equal(CH05_SCENE_03.background.src, CH05_SCENE_02.background.src);
  assert.equal(CH05_SCENE_03.plate.src, CH05_SCENE_03.background.src);
  assert.equal(CH05_SCENE_03.visualFallback, false);
  assert.deepEqual(CH05_SCENE_03.voice.map(({ speaker, transcript, src, inline, generationId, assetId, voiceId, transcriptVerified, humanApproved }) => ({
    speaker, transcript, src, inline, generationId, assetId, voiceId, transcriptVerified, humanApproved
  })), [
    { speaker: 'Patron / guest', transcript: 'Professor Higgins, Colonel Pickering — you must be proud. What a transformation.', src: './assets/audio/characters/supporting/guest_ch05_scene03_001.mp3', inline: true, generationId: 'hSPlHv3PVWSIERvfWefM', assetId: 'ADJhxP7zMtg5vj6jPHCn', voiceId: 'Q6HPFg7bazU61NeyrvBp', transcriptVerified: 'PASS', humanApproved: true },
    { speaker: 'Higgins', transcript: 'The result speaks for the method.', src: './assets/audio/characters/higgins/higgins_ch05_scene03_001.mp3', inline: true, generationId: 'TvXuEHqKk5tSv3lGKOAB', assetId: 'w0SsT6e6zYt48rD5cluh', voiceId: 'JlptfLxaUpd8pZcw9dKd', transcriptVerified: 'PASS', humanApproved: true },
    { speaker: 'Pickering', transcript: 'Eliza has worked very hard.', src: './assets/audio/characters/pickering/pickering_ch05_scene03_001.mp3', inline: true, generationId: 'QNDE4DW5FWZ4Pim19QOc', assetId: 'KfaMb6yBtOo1umTgbICr', voiceId: 'JBFqnCBsd6RMkjVDRZzb', transcriptVerified: 'PASS', humanApproved: true }
  ]);
  assert.equal(CH05_SCENE_03.voice.some(({ transcript }) => transcript === 'I know what I contributed.'), false, 'AM48 stays unproduced');
  assert.ok(CH05_SCENE_03.decision.choices.every(({ text }) => !CH05_SCENE_03.voice.some(({ transcript }) => transcript === text)), 'D11 choices remain text-only');
  assert.deepEqual(CH05_SCENE_03.storyBeats.filter(({ type }) => type === 'dialogue').filter(({ speaker }) => ['Patron / guest', 'Higgins', 'Pickering'].includes(speaker)).slice(0, 3).map(({ text }) => text), CH05_SCENE_03.voice.map(({ transcript }) => transcript), 'each AM47 voice maps only to its exact canonical line');
  for (const voice of CH05_SCENE_03.voice) {
    const file = path.join(root, voice.src.slice(2));
    assert.ok(fs.statSync(file).size > 0, `${voice.src} exists and is non-empty`);
  }
  assert.match(appSource, /scene\.voice\.filter\(\(voice\) => voice\.inline && voice\.transcript === beat\.text\)\.map\(\(voice\) => renderAudioControl\(voice\)\)/, 'each inline replay control is bound to its exact dialogue line');
  const audioPlan = fs.readFileSync(path.join(root, 'docs/chapters/ch05/AUDIO_PLAN.md'), 'utf8');
  for (const provenance of ['Generation ID | Asset ID', 'hSPlHv3PVWSIERvfWefM', 'ADJhxP7zMtg5vj6jPHCn', 'TvXuEHqKk5tSv3lGKOAB', 'w0SsT6e6zYt48rD5cluh', 'QNDE4DW5FWZ4Pim19QOc', 'KfaMb6yBtOo1umTgbICr', 'Production status:** Optional; not generated.']) assert.ok(audioPlan.includes(provenance));
  const image = fs.readFileSync(path.join(root, CH05_SCENE_03.background.src.slice(2)));
  assert.equal(image.toString('ascii', 0, 4), 'RIFF');
  assert.equal(image.toString('ascii', 8, 12), 'WEBP');
  assert.match(appSource, /\[CH05_SCENE_03\.id\]: CH05_SCENE_03/);
  assert.match(appSource, /\[CH05_SCENE_04\.id\]: CH05_SCENE_04/);
});

test('S03 route and D11 writes require the completed S02 event', () => {
  const state = { ...setScene(createInitialState(), CH05_SCENE_03.id), applied_events: [] };
  assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_03), 'Complete Chapter V Scene 02 before opening The Display and the Question.');
  assert.equal(applyDecision(state, 'D11', ids[0]), state);
  assert.match(appSource, /hashScene === 'ch05_s03' && !state\.applied_events\.includes\('ch05_s02_complete'\)/);
  assert.match(appSource, /const safeScene = state\.applied_events\.includes\('ch05_s01_complete'\) \? CH05_SCENE_02\.id : CH05_SCENE_01\.id/);
});

test('D11 stores only the canonical credit_response, is persistent/idempotent, and derives S04 companion', () => {
  assert.equal(CH05_SCENE_03.decision.id, 'D11');
  assert.equal(CH05_SCENE_03.decision.prompt, 'How would Eliza like to respond?');
  assert.deepEqual(CH05_SCENE_03.decision.choices.map(({ id, text }) => [id, text]), ids.map((id, index) => [id, lines[index]]));
  assert.equal(CH05_SCENE_03.decision.neutralChoice, true);
  assert.equal(CH05_SCENE_03.decision.hideResult, true);
  assert.equal(CH05_SCENE_03.decision.labelOnly, undefined);
  for (const [index, id] of ids.entries()) {
    const initial = readyS03();
    assert.match(getSceneAdvanceBlock(initial, CH05_SCENE_03), /Choose a response to continue/);
    const selected = applyDecision(initial, 'D11', id);
    assert.equal(selected.credit_response, id);
    assert.deepEqual(selected.applied_events.filter((event) => event === 'ch05_d11_recorded'), ['ch05_d11_recorded']);
    assert.equal(applyDecision(selected, 'D11', ids[(index + 1) % ids.length]), selected, 'a second selection cannot overwrite the canonical value');
    assert.equal(selected.confidence, initial.confidence);
    assert.equal(selected.pronunciation, initial.pronunciation);
    assert.equal(selected.independence, initial.independence);
    assert.equal(Object.hasOwn(selected, 's04_companion'), false);
    assert.equal(ch05S04CompanionFor(id), index === 2 ? 'Pickering' : 'Mrs Pearce');
    const storage = new Map();
    saveState(selected, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
    const restored = loadState({ getItem: (key) => storage.get(key) });
    assert.equal(restored.credit_response, id);
    assert.ok(restored.applied_events.includes('ch05_d11_recorded'));
    assert.equal(completeScene(restored, CH05_SCENE_03).applied_events.filter((event) => event === 'ch05_s03_complete').length, 1);
    const complete = completeScene(restored, CH05_SCENE_03);
    assert.equal(completeScene(complete, CH05_SCENE_03), complete);
    assert.equal(complete.applied_events.filter((event) => event === 'ch05_s03_complete').length, 1);
    assert.equal(complete.confidence, initial.confidence);
    assert.equal(complete.pronunciation, initial.pronunciation);
    assert.equal(complete.independence, initial.independence);
  }
});

test('D11 requires explicit Continue, completes once, preserves state through Back/Forward and stops at S04 boundary', () => {
  let state = applyDecision(readyS03(), 'D11', 'd11_private_conversation');
  assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_03), '');
  const complete = completeScene(state, CH05_SCENE_03);
  assert.ok(complete.applied_events.includes('ch05_s03_complete'));
  const atS04Boundary = setScene(complete, CH05_SCENE_03.nextScene);
  assert.equal(atS04Boundary.scene, 'ch05_s04');
  assert.equal(atS04Boundary.credit_response, 'd11_private_conversation');
  const storage = new Map();
  saveState(atS04Boundary, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
  state = setScene(loadState({ getItem: (key) => storage.get(key) }), CH05_SCENE_03.id);
  assert.equal(state.credit_response, 'd11_private_conversation');
  assert.ok(state.applied_events.includes('ch05_s03_complete'));
  assert.equal(completeScene(state, CH05_SCENE_03), state, 'revisiting cannot write the completion twice');
  const forward = setScene(state, CH05_SCENE_03.nextScene);
  assert.equal(forward.scene, 'ch05_s04');
  assert.match(appSource, /scene\.id === 'ch05_s03'[\s\S]*?data-action="next-scene"/);
  assert.match(appSource, /setScene\(next, CH05_SCENE_03\.nextScene\); save\(\); setLocation\(CH05_SCENE_03\.nextScene\); render\(\)/);
  assert.match(appSource, /hashScene === 'ch05_s04' && !state\.applied_events\.includes\('ch05_s03_complete'\)/);
  assert.match(appSource, /setScene\(next, CH05_SCENE_03\.nextScene\); save\(\); setLocation\(CH05_SCENE_03\.nextScene\); render\(\)/);
});

test('S03 reuses AM44 continuously and Teacher Mode remains read-only', () => {
  assert.equal(ambienceForScene('ch05_s01'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s02'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s03'), 'ch05_exhibition_hall');
  assert.equal(isContinuousAmbienceTransition('ch05_s02', 'ch05_s03'), true);
  assert.equal(CH05_SCENE_03.voice.length, 3);
  const teacher = CH05_S03_TEACHER_SECTIONS.flat().join(' ');
  for (const phrase of ['credit and authorship', 'Receiving help', 'Social framing', 'postpone', 'publicly', 'privately', 'no single morally correct answer', 'privacy is not weakness', 'postponement is not failure']) {
    assert.match(teacher, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
  assert.match(appSource, /scene\?\.id === 'ch05_s03' \? CH05_S03_TEACHER_SECTIONS/);
  assert.match(appSource, /scene\.id === 'ch05_s03'[\s\S]*?Teacher preview · read-only\. D11 selection and progression are inactive\./);
  assert.match(appSource, /target\.dataset\.decision === 'D11' && \(currentScene\(\)\.id !== 'ch05_s03' \|\| studentReadOnly\(\)\)/);
  assert.match(teacher, /preview does not select D11, write credit_response, change development signals, record completion, play audio or advance/i);
});
