import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH04_SCENE_02, CH04_SCENE_03, CH04_S03_TEACHER_SECTIONS } from '../src/ch04-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { CH04_TEA_ROOM_VARIANTS, AudioManager } from '../src/audio.js';
import { applyDecision, canAdvanceScene, completeScene, createInitialState, getSceneAdvanceBlock, loadState, markLc12SupportUsed, recordLc12Answer, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ready = () => ({ ...setScene(createInitialState(), 'ch04_s03'), applied_events: ['ch03_s06_complete', 'ch04_s01_complete', 'ch04_s02_complete'], confidence: 2, independence: 3, pronunciation: 4 });
const eventCount = (state, id) => state.applied_events.filter((event) => event === id).length;

test('S03 scene registration, exact approved dialogue/audio, items, options and D09 values are locked', () => {
  assert.equal(CH04_SCENE_03.id, 'ch04_s03');
  assert.equal(CH04_SCENE_03.title, 'The Wrong Answer');
  assert.equal(CH04_SCENE_03.voiceStage, 'Emerging New Speech');
  assert.equal(CH04_SCENE_03.background.src, CH04_SCENE_02.background.src);
  assert.deepEqual(CH04_SCENE_03.voice.map(({ transcript, generationId, assetId, voiceId }) => [transcript, generationId, assetId, voiceId]), [
    ['London seems to have decided we needed more rain.', 'YHt4dBWN4fYiTe75qQ1S', 'ZDChgbYTwdQ4EaN9TcFn', 'zp695rEBCwfZ3GYNJOHx'],
    ["I don't think London can decide anything. It is a city, not a person.", 'TiXtDJwsylxMdRYK2hbJ', 'UMu4qIp9n8yLJwPmGQcQ', '124kaYCknTDsnwUFdWl9']
  ]);
  assert.deepEqual(CH04_SCENE_03.challenge.items.map(({ id }) => id), ['lc12_literal_meaning', 'lc12_implied_meaning']);
  assert.deepEqual(CH04_SCENE_03.challenge.items.map(({ options }) => options.map(({ id }) => id)), [
    ['literal_city_decided', 'literal_rainy_weather', 'literal_leave_london'],
    ['implied_city_controls_weather', 'implied_rain_joke', 'implied_weather_question']
  ]);
  assert.deepEqual(CH04_SCENE_03.challenge.items.map(({ answer }) => answer), ['literal_city_decided', 'implied_rain_joke']);
  assert.deepEqual(CH04_SCENE_03.decision.choices.map(({ id }) => id), ['rephrase', 'acknowledge_literal', 'wait_for_cue']);
  assert.equal(CH04_SCENE_03.reaction.generationId, 'cQoJZhP5BeIge3rFK0FH');
  assert.equal(CH04_SCENE_03.reaction.assetId, '11fEHELi8y1QyyfpzgyI');
  assert.equal(CH04_SCENE_03.reaction.src, './assets/audio/listening/ch04_lc12_reaction_001.mp3');
});

test('S03 requires completed S02 and a direct entry cannot answer LC12', () => {
  const blocked = setScene(createInitialState(), 'ch04_s03');
  assert.equal(canAdvanceScene(blocked, CH04_SCENE_03), false);
  assert.match(getSceneAdvanceBlock(blocked, CH04_SCENE_03), /Complete Chapter IV Scene 02/);
  assert.equal(recordLc12Answer(blocked, 'lc12_literal_meaning', 'literal_city_decided'), blocked);
  const validEntry = ready();
  assert.equal(recordLc12Answer(validEntry, 'lc12_implied_meaning', 'implied_rain_joke'), validEntry);
});

test('LC12 items are sequential, unaided first, retryable, persistent, and have no rewards', () => {
  let state = ready();
  const before = [state.confidence, state.independence, state.pronunciation];
  const item1 = 'lc12_literal_meaning';
  const item2 = 'lc12_implied_meaning';
  assert.equal(recordLc12Answer(state, item2, 'implied_rain_joke'), state, 'item 2 remains locked until item 1 is correct');
  state = recordLc12Answer(state, item1, 'literal_rainy_weather');
  assert.equal(state.challenges.lc12.answers[item1].correct, false);
  assert.equal(state.challenges.lc12.answers[item1].attempts, 1);
  const supported = markLc12SupportUsed(state, item1);
  assert.deepEqual(supported.challenges.lc12.supportItems, [item1]);
  assert.equal(markLc12SupportUsed(supported, item1), supported);
  state = recordLc12Answer(supported, item1, 'literal_city_decided');
  assert.equal(state.challenges.lc12.answers[item1].correct, true);
  state = recordLc12Answer(state, item2, 'implied_city_controls_weather');
  assert.equal(state.challenges.lc12.answers[item2].correct, false);
  state = recordLc12Answer(state, item2, 'implied_rain_joke');
  assert.equal(state.challenges.lc12.completed, true);
  assert.equal(eventCount(state, 'ch04_lc12_complete'), 1);
  assert.deepEqual([state.confidence, state.independence, state.pronunciation], before);
  const reloaded = loadState({ getItem: () => JSON.stringify(state) });
  assert.deepEqual(reloaded.challenges.lc12, state.challenges.lc12);
  assert.equal(recordLc12Answer(state, item2, 'implied_rain_joke'), state);
});

test('AM37/AM38 replay mappings are explicit and A/B ambience stays continuous across S02 and S03', async () => {
  for (const asset of [...CH04_SCENE_03.voice, CH04_SCENE_03.reaction]) {
    const full = path.join(root, asset.src.replace(/^\.\//, ''));
    const data = fs.readFileSync(full);
    assert.ok(data.length > 0);
    assert.equal(data.subarray(0, 3).toString(), 'ID3');
    assert.ok(data.includes(Buffer.from([0xff, 0xfb])) || data.includes(Buffer.from([0xff, 0xf3])));
  }
  assert.equal(ambienceForScene('ch04_s03'), 'ch04_social_tea_room');
  assert.equal(isContinuousAmbienceTransition('ch04_s02', 'ch04_s03'), true);
  assert.deepEqual(CH04_TEA_ROOM_VARIANTS.map(({ src }) => src), ['./assets/audio/ambience/ch04_social_tea_room_ambient.mp3', './assets/audio/ambience/ch04_social_tea_room_ambient_b.mp3']);
  const manager = Object.create(AudioManager.prototype);
  assert.equal(typeof manager.applyAmbienceDuck, 'function');
});

test('D09 is available only after LC12, has no reward or duplicate field, and completion gates S04 boundary', () => {
  let state = ready();
  state = recordLc12Answer(state, 'lc12_literal_meaning', 'literal_city_decided');
  state = recordLc12Answer(state, 'lc12_implied_meaning', 'implied_rain_joke');
  const before = [state.confidence, state.independence, state.pronunciation];
  for (const id of ['rephrase', 'acknowledge_literal', 'wait_for_cue']) {
    const choice = applyDecision(state, 'D09', id);
    assert.equal(choice.decisions.D09, id);
    assert.equal(eventCount(choice, 'ch04_d09_recorded'), 1);
    assert.deepEqual([choice.confidence, choice.independence, choice.pronunciation], before);
    assert.equal(Object.hasOwn(choice, 'recovery_style'), false);
    assert.equal(applyDecision(choice, 'D09', id), choice);
  }
  const beforeChallenge = ready();
  assert.equal(applyDecision(beforeChallenge, 'D09', 'rephrase'), beforeChallenge);
  assert.equal(canAdvanceScene(state, CH04_SCENE_03), false);
  state = applyDecision(state, 'D09', 'rephrase');
  assert.equal(canAdvanceScene(state, CH04_SCENE_03), true);
  const completed = completeScene(state, CH04_SCENE_03);
  assert.equal(eventCount(completed, 'ch04_s03_complete'), 1);
  assert.equal(completeScene(completed, CH04_SCENE_03), completed);
  assert.equal(CH04_SCENE_03.nextScene, 'ch04_s04');
});

test('Teacher content keeps preview read-only and states the pragmatic and equity contract', () => {
  const joined = CH04_S03_TEACHER_SECTIONS.flat().join(' ');
  assert.match(joined, /Correct pronunciation does not automatically mean correct pragmatic interpretation\./);
  assert.match(joined, /Accent ≠ intelligence/);
  assert.match(joined, /read-only/i);
  assert.match(joined, /does not autoplay/i);
});

test('runtime registers S03 actions, preserves tea-room continuity, and hands S04 to its corridor scene', () => {
  const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  assert.match(app, /scene\.id !== CH06_SCENE_03\.id\) body \+= renderDecision\(scene\);/, 'scene-specific decisions stay in their canonical story positions');
  assert.match(app, /\[CH04_SCENE_03\.id\]: CH04_SCENE_03/);
  assert.match(app, /data-action="answer-lc12"/);
  assert.match(app, /data-action="open-lc12-support"/);
  assert.match(app, /audioManager\.playChallenge\(target\.dataset\.src\)/);
  assert.match(app, /audioManager\.playVoice\(target\.dataset\.src/);
  assert.match(app, /CH04_SCENE_03\.nextScene/);
  assert.match(app, /hashScene === 'ch04_s04'/);
  assert.match(app, /\[CH04_SCENE_04\.id\]: CH04_SCENE_04/);
  const s02Continue = app.match(/if \(scene\.id === 'ch04_s02'\) \{[\s\S]*?\n  \}/)?.[0] || '';
  assert.doesNotMatch(s02Continue, /audioManager\.leaveScene\(\)/, 'S02→S03 keeps the A/B room loop alive');
  assert.match(app, /currentScene\(\)\.id === 'ch04_s03' && studentReadOnly\(\)/);
  const s03Continue = app.match(/if \(scene\.id === 'ch04_s03'\) \{[\s\S]*?\n  \}/)?.[0] || '';
  assert.doesNotMatch(s03Continue, /audioManager\.leaveScene\(\)/, 'S03→S04 crossfades from the same tea-room bed');
});
