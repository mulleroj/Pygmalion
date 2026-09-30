import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH02_SCENE_01, CH02_SCENE_02, CH02_TEACHER_SECTIONS, CH02_SCENE_02_TEACHER_SECTIONS } from '../src/ch02-content.js';
import { CH02_SCENE_03, CH02_SCENE_03_TEACHER_SECTIONS } from '../src/ch02-content.js';
import { SCENES, ambienceForScene } from '../src/content.js';
import { AudioManager, AMBIENCE_FILES } from '../src/audio.js';
import { createHash } from 'node:crypto';
import { createInitialState, applyDecision, recordLc03Answer, recordLc04Answer, ensureChallengeOptionOrders, ensureChallengePresentationOrder, loadState, setScene, canAdvanceScene, getSceneAdvanceBlock } from '../src/state.js';

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
  assert.match(app, /audioManager\.ensureAmbience\(currentSceneId, scene\.contextual \|\| null\)/);
});

test('entering Chapter II retires Chapter I rain and starts only the approved house ambience', async (t) => {
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0,
    createAudio: (src) => ({ src, volume: 0, paused: true,
      play() { this.paused = false; return Promise.resolve(); },
      pause() { this.paused = true; } }) });
  t.after(() => manager.dispose());
  manager.unlock();
  let paused = 0;
  manager.ambience = { pause: () => { paused += 1; } };
  manager.ambienceId = 'covent_garden_evening_light_rain';
  assert.equal(ambienceForScene('ch01_s01'), 'covent_garden_rain_market');
  assert.equal(ambienceForScene('ch01_s05'), 'covent_garden_evening_light_rain');
  assert.equal(ambienceForScene('ch02_s01'), 'higgins_house_morning_entry');
  assert.equal(ambienceForScene('ch02_s02'), 'higgins_house_interior');
  assert.deepEqual(await manager.ensureAmbience('ch02_s02'), { id: 'higgins_house_interior', restarted: true, blocked: false });
  assert.equal(paused, 1);
  assert.equal(manager.ambience.src, './assets/audio/ambience/higgins_house_interior.mp3');
  assert.equal(manager.ambienceId, 'higgins_house_interior');
  assert.deepEqual(CH02_SCENE_01.voice, []);
  assert.equal(CH02_SCENE_02.voice.length, 1);
});

test('scene two uses the approved study plate and four existing transparent characters', () => {
  assert.equal(CH02_SCENE_02.id, 'ch02_s02');
  assert.equal(CH02_SCENE_02.background.src, './assets/images/locations/ch02/ch02_higgins-study.webp');
  assert.equal(CH02_SCENE_02.plate.src, CH02_SCENE_02.background.src);
  assert.equal(CH02_SCENE_02.eliza.src, './assets/images/characters/eliza/runtime/eliza_flower-girl_guarded_cutout.png');
  assert.deepEqual(CH02_SCENE_02.supporting.map(({ placement }) => placement), ['pickering', 'higgins', 'mrs-pearce']);
  assert.deepEqual(CH02_SCENE_02.supporting.map(({ src }) => src), [
    './assets/images/characters/pickering/runtime/pickering_master_cutout.png',
    './assets/images/characters/higgins/runtime/higgins_master_cutout.png',
    './assets/images/characters/mrs-pearce/runtime/mrs-pearce_observant-support_cutout.png'
  ]);
  assert.deepEqual(CH02_SCENE_02.props, []);
  for (const asset of [CH02_SCENE_02.background, CH02_SCENE_02.eliza, ...CH02_SCENE_02.supporting]) {
    assert.ok(fs.statSync(path.join(root, asset.src)).size > 0, `missing or empty ${asset.src}`);
  }
  for (const asset of [CH02_SCENE_02.eliza, ...CH02_SCENE_02.supporting]) {
    assert.equal(fs.readFileSync(path.join(root, asset.src)).readUInt8(25), 6, `${asset.src} must be RGBA`);
  }
});

test('scene two preserves locked story and LC04 text with the exact human-approved local clips', () => {
  const script = read('docs/chapters/ch02/SCRIPT.md').split('## ch02_s02 – Terms on the Table')[1].split('## ch02_s03')[0];
  const audioPlan = read('docs/chapters/ch02/AUDIO_PLAN.md');
  for (const beat of CH02_SCENE_02.storyBeats) assert.ok(script.includes(beat.text), `script parity: ${beat.text}`);
  for (const item of [CH02_SCENE_02.challenge.intro, CH02_SCENE_02.challenge.prompt, CH02_SCENE_02.challenge.success, CH02_SCENE_02.challenge.retry, CH02_SCENE_02.transition]) {
    assert.ok(script.includes(item), `script parity: ${item}`);
  }
  assert.deepEqual(CH02_SCENE_02.challenge.samples.map(({ id }) => id), ['lc04_sample_offer', 'lc04_sample_evaluation', 'lc04_sample_condition']);
  assert.deepEqual(CH02_SCENE_02.challenge.options.map(({ id }) => id), ['lc04_offer', 'lc04_evaluation', 'lc04_condition']);
  for (const sample of CH02_SCENE_02.challenge.samples) {
    assert.ok(script.includes(sample.transcript));
    assert.ok(audioPlan.includes(sample.transcript));
    assert.ok(fs.statSync(path.join(root, sample.src)).size > 0);
  }
  assert.ok(audioPlan.includes(CH02_SCENE_02.storyBeats.find((beat) => beat.speaker === 'Pickering').text));
  assert.deepEqual(CH02_SCENE_02.voice.map(({ id, src, transcript }) => ({ id, src, transcript })), [{
    id: 'AM14A', src: './assets/audio/characters/pickering/pickering_ch02_scene02_001.mp3',
    transcript: CH02_SCENE_02.storyBeats.find((beat) => beat.speaker === 'Pickering').text
  }]);
  assert.deepEqual(CH02_SCENE_02.challenge.samples.map(({ id, src, speaker }) => [id, src, speaker]), [
    ['lc04_sample_offer', './assets/audio/listening/ch02_lc04_001.mp3', 'Higgins'],
    ['lc04_sample_evaluation', './assets/audio/listening/ch02_lc04_002.mp3', 'Pickering'],
    ['lc04_sample_condition', './assets/audio/listening/ch02_lc04_003.mp3', 'Mrs Pearce']
  ]);
  for (const filename of ['src/ch02-content.js', 'src/audio.js', 'src/content.js', 'src/app.js', 'docs/chapters/ch02/AUDIO_PLAN.md']) {
    assert.doesNotMatch(read(filename), /X-Goog-Signature|storage\.googleapis\.com|https?:\/\/.*elevenlabs/i);
  }
});

test('seven exact ingested Chapter II MP3s have provenance, nonempty MPEG content, and no duplicate bytes', () => {
  const assets = [
    ['C1rCLdEUIbZ3xXVLU0H5', 'assets/audio/ambience/higgins_house_morning_entry.mp3', 337872],
    ['EH1q5BoFNyVXdakm2n9W', 'assets/audio/ambience/higgins_house_interior.mp3', 337872],
    ['Uwm2nCQV7qMWC0ehARIn', 'assets/audio/ambience/gramophone_distant.mp3', 594033],
    ['oHftES1aedfWtbVGZDT4', 'assets/audio/characters/pickering/pickering_ch02_scene02_001.mp3', 69124],
    ['E1mR4yeC9N8haFAY8pkk', 'assets/audio/listening/ch02_lc04_001.mp3', 84589],
    ['cd7lgnOX0Ip3qLkVcN3F', 'assets/audio/listening/ch02_lc04_002.mp3', 148537],
    ['vFooVSERnMiVDGJjLxu7', 'assets/audio/listening/ch02_lc04_003.mp3', 85843]
  ];
  const plan = read('docs/chapters/ch02/AUDIO_PLAN.md');
  const hashes = new Set();
  for (const [id, filename, bytes] of assets) {
    const mp3 = fs.readFileSync(path.join(root, filename));
    assert.equal(mp3.length, bytes);
    assert.ok(mp3.subarray(0, 3).toString() === 'ID3' || (mp3[0] === 0xff && (mp3[1] & 0xe0) === 0xe0), `MP3 signature: ${filename}`);
    assert.ok(plan.includes(`| ${id} | ${filename} | ${bytes} |`), `provenance: ${id}`);
    hashes.add(createHash('sha256').update(mp3).digest('hex'));
  }
  assert.equal(hashes.size, 7);
  assert.equal(CH02_SCENE_02.contextual.id, 'gramophone_distant');
  assert.equal(CH02_SCENE_02.contextual.src, AMBIENCE_FILES.gramophone_distant);
  assert.equal(CH02_SCENE_01.contextual, undefined);
  assert.equal(CH02_SCENE_01.sfx, undefined);
  assert.equal(CH02_SCENE_02.sfx, undefined);
  assert.equal((plan.match(/\| HUMAN APPROVED IN MIX \|/g) || []).length, 4);
  assert.doesNotMatch(plan, /PROVISIONALLY HUMAN APPROVED/);
});

test('LC04 audio belongs to stable sample IDs independently of persisted shuffle and replay', () => {
  const samples = CH02_SCENE_02.challenge.samples;
  const initial = setScene(createInitialState(), 'ch02_s02');
  const state = ensureChallengePresentationOrder(initial, 'LC04', samples.map(({ id }) => id), () => 0);
  const before = JSON.stringify(state);
  const byId = Object.fromEntries(samples.map((sample) => [sample.id, sample]));
  assert.notDeepEqual(state.lc04_presentation_order, samples.map(({ id }) => id));
  for (const id of state.lc04_presentation_order) assert.equal(byId[id].src, samples.find((sample) => sample.id === id).src);
  assert.equal(JSON.stringify(state), before);
  const app = read('src/app.js');
  assert.match(app, /const sample = samples\[sampleId\]/);
  assert.match(app, /if \(action === 'play-challenge'\) await audioManager\.playChallenge\(target\.dataset\.src\)/);
  assert.doesNotMatch(read('src/audio.js'), /from ['"].*state|recordLc04Answer|saveState/);
});

test('LC04 order, retry, completion, replay and refresh preserve state and signal safety', () => {
  const sampleIds = CH02_SCENE_02.challenge.samples.map(({ id }) => id);
  const answerIds = CH02_SCENE_02.challenge.options.map(({ id }) => id);
  let state = setScene(createInitialState(), CH02_SCENE_02.id);
  assert.equal(getSceneAdvanceBlock(state, CH02_SCENE_02), 'Complete the language challenge to continue.');
  state = ensureChallengePresentationOrder(state, 'LC04', sampleIds, () => 0);
  state = ensureChallengeOptionOrders(state, 'LC04', [{ key: 'shared', optionIds: answerIds }], () => 0.5);
  const presentation = [...state.lc04_presentation_order];
  const answers = [...state.challenges.lc04.optionOrders.shared];
  assert.deepEqual([...presentation].sort(), [...sampleIds].sort());
  assert.deepEqual([...answers].sort(), [...answerIds].sort());
  assert.equal(ensureChallengePresentationOrder(state, 'LC04', sampleIds, () => 0.99), state);
  assert.equal(ensureChallengeOptionOrders(state, 'LC04', [{ key: 'shared', optionIds: answerIds }], () => 0.99), state);

  state = recordLc04Answer(state, 'lc04_sample_offer', 'lc04_condition');
  assert.equal(state.ch02_lc04_attempts, 1);
  assert.equal(state.ch02_lc04_completed, false);
  assert.equal(state.experiment_framing_heard, false);
  state = recordLc04Answer(state, 'lc04_sample_offer', 'lc04_offer');
  state = recordLc04Answer(state, 'lc04_sample_evaluation', 'lc04_evaluation');
  state = recordLc04Answer(state, 'lc04_sample_condition', 'lc04_condition');
  assert.equal(state.ch02_lc04_attempts, 4);
  assert.equal(state.ch02_lc04_completed, true);
  assert.equal(state.experiment_framing_heard, true);
  assert.equal(state.challenges.lc04.completed, true);
  assert.deepEqual(state.applied_events, ['ch02_lc04_completed']);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], [0, 0, 0]);
  assert.equal(canAdvanceScene(state, CH02_SCENE_02), true);
  assert.deepEqual(state.lc04_presentation_order, presentation);
  assert.deepEqual(state.challenges.lc04.optionOrders.shared, answers);
  assert.equal(recordLc04Answer(state, 'lc04_sample_offer', 'lc04_offer'), state);
  assert.equal(recordLc04Answer(state, 'invalid-sample', 'lc04_offer'), state);
  const refreshed = loadState({ getItem: () => JSON.stringify(state) });
  assert.deepEqual(refreshed, state);
  assert.equal(ensureChallengePresentationOrder(refreshed, 'LC04', sampleIds, () => 0.99), refreshed);
  assert.equal(recordLc04Answer(refreshed, 'lc04_sample_condition', 'lc04_offer'), refreshed);
});

test('scene two Teacher Mode keeps the chapter structure and LC04 key separate from play', () => {
  assert.equal(CH02_SCENE_02_TEACHER_SECTIONS.length, 12);
  assert.match(CH02_SCENE_02_TEACHER_SECTIONS.find(([heading]) => heading === 'Challenge Key')[1], /lc04_sample_offer → lc04_offer/);
  const app = read('src/app.js');
  const teacherFunctions = app.split('function openTeacher(trigger) {')[1].split("document.addEventListener('click'")[0];
  assert.doesNotMatch(teacherFunctions, /save\(|applyDecision\(|recordLc04Answer\(|setScene\(/);
  assert.match(teacherFunctions, /CH02_SCENE_02_TEACHER_SECTIONS/);
  assert.match(app, /scene\.id === 'ch02_s02'\) \{/);
});

test('s03 uses only canonical hallway characters and exact locked story and response IDs', () => {
  const scene = CH02_SCENE_03;
  const script = read('docs/chapters/ch02/SCRIPT.md').split('## ch02_s03 – Mrs Pearce\'s Questions')[1].split('## ch02_s04')[0];
  assert.equal(scene.background.src, './assets/images/locations/ch02/ch02_higgins-house-hallway.webp');
  assert.equal(scene.plate.src, scene.background.src);
  assert.equal(scene.eliza.src, './assets/images/characters/eliza/runtime/eliza_flower-girl_listening_cutout.png');
  assert.deepEqual(scene.supporting.map(({ src }) => src), [
    './assets/images/characters/higgins/runtime/higgins_master_cutout.png',
    './assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png'
  ]);
  for (const asset of [scene.background, scene.eliza, ...scene.supporting]) assert.ok(fs.statSync(path.join(root, asset.src)).size > 0);
  assert.equal(scene.storyBeats.length, 9);
  for (const beat of scene.storyBeats) assert.ok(script.includes(beat.text));
  assert.deepEqual(scene.response.choices.map(({ id }) => id), ['s03_ask_for_clarification', 's03_confirm_understanding']);
  for (const option of scene.response.choices) { assert.ok(script.includes(option.id)); assert.ok(script.includes(option.text)); }
  assert.deepEqual(scene.voice.map(({ id, src, transcript, inline }) => ({ id, src, transcript, inline })), [{
    id: 'AM16', src: './assets/audio/characters/eliza/eliza_ch02_scene03_001.mp3',
    transcript: scene.storyBeats[8].text, inline: true
  }]);
  const mp3 = fs.readFileSync(path.join(root, scene.voice[0].src));
  assert.equal(mp3.length, 70378);
  assert.ok(mp3.subarray(0, 3).toString() === 'ID3' || (mp3[0] === 0xff && (mp3[1] & 0xe0) === 0xe0));
  assert.equal(scene.contextual, undefined);
  assert.equal(scene.sfx, undefined);
  assert.equal(scene.challenge, undefined);
  assert.equal(scene.decision, undefined);
});

test('s03 Teacher content is scene-aware with no scored answer key or mutation handler', () => {
  assert.equal(CH02_SCENE_03_TEACHER_SECTIONS.length, 12);
  const content = CH02_SCENE_03_TEACHER_SECTIONS.map(([, text]) => text).join(' ');
  assert.match(content, /Could you explain/);
  assert.match(content, /power imbalance/);
  assert.match(content, /Both optional responses are legitimate/);
  assert.match(content, /no answer key/);
  const teacher = read('src/app.js').split('function openTeacher(trigger) {')[1].split("document.addEventListener('click'")[0];
  assert.doesNotMatch(teacher, /save\(|recordS03Response\(|setScene\(/);
});

test('s03 transition preserves interior time and ends the s02 gramophone', async (t) => {
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0, createAudio: (src) => ({
    src, currentTime: 0, volume: 0, paused: true, addEventListener() {}, removeEventListener() {},
    play() { this.paused = false; return Promise.resolve(); }, pause() { this.paused = true; }
  }) });
  t.after(() => manager.dispose());
  manager.unlock();
  await manager.ensureAmbience(CH02_SCENE_02.id, CH02_SCENE_02.contextual);
  const loop = manager.ambience, gramophone = manager.contextual;
  loop.currentTime = 7;
  await manager.ensureAmbience(CH02_SCENE_03.id, CH02_SCENE_03.contextual);
  assert.equal(manager.ambience, loop);
  assert.equal(loop.currentTime, 7);
  assert.equal(loop.paused, false);
  assert.equal(gramophone.paused, true);
  assert.equal(manager.contextual, null);
});

test('runtime clicks gate LC04, enter s03, stop safely and keep render/history/Teacher read-only', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; } });
  let saved = JSON.stringify(setScene(createInitialState(), 'ch02_s02'));
  const nodes = new Map();
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  const events = {};
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  const historyEvents = {};
  globalThis.window = {
    location: { hash: '#ch02_s02', pathname: '/' },
    history: { state: { scene: 'ch02_s02' }, pushState(value, unused, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(value, unused, url) { this.pushState(value, unused, url); } },
    setTimeout(fn) { fn(); }, addEventListener(name, fn) { historyEvents[name] = fn; }
  };
  globalThis.localStorage = { getItem() { return saved; }, setItem(key, value) { saved = value; } };
  const { render, moveNext } = await import('../src/app.js');
  const click = (action, data = {}) => events.click({ isTrusted: false, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  assert.doesNotMatch(node('#app').innerHTML, /Continue to Mrs Pearce/);
  moveNext(); assert.equal(JSON.parse(saved).scene, 'ch02_s02');
  for (const [sample, answer] of [['lc04_sample_offer', 'lc04_offer'], ['lc04_sample_evaluation', 'lc04_evaluation'], ['lc04_sample_condition', 'lc04_condition']]) await click('answer-lc04', { sample, answer });
  assert.match(node('#app').innerHTML, /Continue to Mrs Pearce/);
  const completed = JSON.parse(saved);
  await click('next-scene');
  assert.deepEqual(JSON.parse(saved), { ...completed, scene: 'ch02_s03' });
  assert.match(node('#app').innerHTML, /This response is optional/);
  assert.doesNotMatch(node('#app').innerHTML, /data-action="next-scene"|pickering_master|ch02_s04|mrs-pearce_ch02_scene03_001/);
  assert.equal((node('#app').innerHTML.match(/data-action="play-voice"/g) || []).length, 1);
  const finalLine = node('#app').innerHTML.split('data-line="8"')[1].split('class="scene-response"')[0];
  assert.match(finalLine, /I&#39;m paying for lessons/);
  assert.match(finalLine, /eliza_ch02_scene03_001\.mp3/);
  const before = saved;
  await click('play-voice', { src: CH02_SCENE_03.voice[0].src });
  assert.equal(saved, before);
  moveNext(); render(); await click('open-teacher'); await click('teacher-preview');
  assert.equal(saved, before);
  await click('respond-s03', { option: 's03_confirm_understanding' });
  assert.equal(saved, before);
  assert.match(node('#app').innerHTML, /Mrs Pearce continues toward/);
  await click('respond-s03', { option: 's03_ask_for_clarification' });
  const asked = saved;
  assert.equal(JSON.parse(saved).boundary_questioned, true);
  await click('respond-s03', { option: 's03_ask_for_clarification' });
  await click('respond-s03', { option: 's03_confirm_understanding' });
  render(); historyEvents.popstate(); historyEvents.hashchange();
  await click('open-teacher'); await click('teacher-preview'); await click('review-scene');
  assert.equal(saved, asked);
  assert.equal(JSON.parse(saved).applied_events.filter((id) => id === 'ch02_s03_boundary_questioned').length, 1);
  assert.deepEqual(loadState({ getItem: () => saved }), JSON.parse(asked));
  assert.equal(JSON.parse(saved).scene, 'ch02_s03');
});
