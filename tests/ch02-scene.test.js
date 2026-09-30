import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH02_SCENE_01, CH02_TEACHER_SECTIONS } from '../src/ch02-content.js';
import { SCENES } from '../src/content.js';
import { AudioManager } from '../src/audio.js';
import { createInitialState, applyDecision, recordLc03Answer, loadState, setScene, canAdvanceScene, getSceneAdvanceBlock } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

test('Chapter II pilot uses exactly the approved exterior and two existing cutouts', () => {
  assert.equal(CH02_SCENE_01.id, 'ch02_s01');
  assert.equal(CH02_SCENE_01.background.src, './assets/images/locations/ch02/ch02_higgins-house-exterior.webp');
  assert.equal(CH02_SCENE_01.plate.src, CH02_SCENE_01.background.src);
  assert.equal(CH02_SCENE_01.eliza.src, './assets/images/characters/eliza/runtime/eliza_flower-girl_thoughtful_cutout.png');
  assert.deepEqual(CH02_SCENE_01.supporting.map((asset) => asset.src), ['./assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png']);
  assert.deepEqual(CH02_SCENE_01.props, []);
  assert.deepEqual(CH02_SCENE_01.voice, []);
  assert.deepEqual(SCENES.map((scene) => scene.id), ['ch01_s01', 'ch01_s02', 'ch01_s03', 'ch01_s04', 'ch01_s05']);
  for (const asset of [CH02_SCENE_01.background, CH02_SCENE_01.eliza, ...CH02_SCENE_01.supporting]) {
    assert.ok(fs.statSync(path.join(root, asset.src)).size > 0, `missing or empty ${asset.src}`);
  }
  for (const asset of [CH02_SCENE_01.eliza, ...CH02_SCENE_01.supporting]) {
    const png = fs.readFileSync(path.join(root, asset.src));
    assert.equal(png.readUInt8(25), 6, `${asset.src} must be RGBA`);
  }
});

test('pilot story, voice lines, D04 and LC03 preserve locked script text and stable IDs', () => {
  const script = read('docs/chapters/ch02/SCRIPT.md').split('## ch02_s01 – The Door She Chooses')[1].split('## ch02_s02')[0];
  const audioPlan = read('docs/chapters/ch02/AUDIO_PLAN.md');
  for (const beat of CH02_SCENE_01.storyBeats) assert.ok(script.includes(beat.text), `script parity: ${beat.text}`);
  for (const option of CH02_SCENE_01.decision.choices) {
    assert.ok(script.includes(option.id));
    assert.ok(script.includes(option.text));
  }
  for (const option of CH02_SCENE_01.challenge.options) {
    assert.ok(script.includes(option.id));
    assert.ok(script.includes(option.text));
  }
  assert.deepEqual(CH02_SCENE_01.decision.choices.map(({ id }) => id), ['d04_direct_request', 'd04_polite_request', 'd04_request_with_boundary']);
  assert.deepEqual(CH02_SCENE_01.challenge.options.map(({ id }) => id), ['lc03_clear_polite_request', 'lc03_unclear_request', 'lc03_submissive_request']);
  assert.equal(CH02_SCENE_01.challenge.answer, 'lc03_clear_polite_request');
  for (const line of [
    "Good morning. I've come to see Mr Higgins. I want lessons.",
    'You have crossed the city for a change of speech?'
  ]) {
    assert.ok(audioPlan.includes(line));
    assert.ok(CH02_SCENE_01.storyBeats.some((beat) => beat.type === 'dialogue' && beat.text === line));
  }
});

test('D04 stores only request strategy and one event for each stable option', () => {
  for (const [option, strategy] of [
    ['d04_direct_request', 'direct'],
    ['d04_polite_request', 'polite'],
    ['d04_request_with_boundary', 'boundary']
  ]) {
    const initial = createInitialState();
    const chosen = applyDecision(initial, 'D04', option);
    assert.equal(chosen.request_strategy, strategy);
    assert.equal(chosen.decisions.D04, option);
    assert.deepEqual(chosen.applied_events, ['ch02_d04_request_strategy']);
    assert.deepEqual([chosen.confidence, chosen.pronunciation, chosen.independence], [0, 0, 0]);
    assert.equal(applyDecision(chosen, 'D04', 'd04_direct_request'), chosen);
    assert.deepEqual(loadState({ getItem: () => JSON.stringify(chosen) }).applied_events, chosen.applied_events);
    assert.equal(initial.request_strategy, null);
  }
  const initial = createInitialState();
  assert.equal(applyDecision(initial, 'D04', 'not-an-option'), initial);
});

test('LC03 retry, completion, replay and refresh preserve signals and event idempotency', () => {
  let state = setScene(createInitialState(), CH02_SCENE_01.id);
  assert.equal(getSceneAdvanceBlock(state, CH02_SCENE_01), 'Choose a response to continue.');
  assert.equal(recordLc03Answer(state, 'lc03_clear_polite_request'), state);
  state = applyDecision(state, 'D04', 'd04_request_with_boundary');
  assert.equal(getSceneAdvanceBlock(state, CH02_SCENE_01), 'Complete the reading challenge to continue.');
  state = recordLc03Answer(state, 'lc03_unclear_request');
  assert.equal(state.ch02_lc03_attempts, 1);
  assert.equal(state.ch02_lc03_completed, false);
  assert.deepEqual(state.applied_events, ['ch02_d04_request_strategy']);
  state = recordLc03Answer(state, 'lc03_clear_polite_request');
  assert.equal(state.ch02_lc03_attempts, 2);
  assert.equal(state.ch02_lc03_completed, true);
  assert.deepEqual(state.applied_events, ['ch02_d04_request_strategy', 'ch02_lc03_completed']);
  assert.deepEqual([state.confidence, state.pronunciation, state.independence], [0, 0, 0]);
  assert.equal(canAdvanceScene(state, CH02_SCENE_01), true);
  assert.equal(recordLc03Answer(state, 'lc03_clear_polite_request'), state);
  const refreshed = loadState({ getItem: () => JSON.stringify(state) });
  assert.deepEqual(refreshed, state);
  assert.equal(recordLc03Answer(refreshed, 'lc03_submissive_request'), refreshed);
});

test('Teacher Mode has the twelve contextual sections and remains a read-only pilot view', () => {
  assert.equal(CH02_TEACHER_SECTIONS.length, 12);
  assert.match(CH02_TEACHER_SECTIONS.find(([heading]) => heading === 'Sensitive Framing')[1], /Accent ≠ intelligence/);
  assert.match(CH02_TEACHER_SECTIONS.find(([heading]) => heading === 'Challenge Key')[1], /lc03_clear_polite_request/);
  const app = read('src/app.js');
  const teacherFunctions = app.split('function openTeacher(trigger) {')[1].split("document.addEventListener('click'")[0];
  assert.doesNotMatch(teacherFunctions, /save\(|applyDecision\(|recordLc03Answer\(|setScene\(/);
  assert.match(teacherFunctions, /CH02_TEACHER_SECTIONS/);
  assert.match(app, /if \(scene\.id === 'ch02_s01'\) audioManager\.stopAmbience\(\)/);
});

test('entering the silent pilot stops Chapter I ambience without creating replacement audio', () => {
  const manager = new AudioManager();
  let paused = 0;
  manager.ambience = { pause: () => { paused += 1; } };
  manager.ambienceId = 'covent_garden_evening_light_rain';
  manager.stopAmbience();
  assert.equal(paused, 1);
  assert.equal(manager.ambience, null);
  assert.equal(manager.ambienceId, null);
  assert.deepEqual(CH02_SCENE_01.voice, []);
});
