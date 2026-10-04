import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CH03_SCENE_06 } from '../src/ch03-content.js';
import { CH04_SCENE_01, CH04_S01_TEACHER_SECTIONS } from '../src/ch04-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import {
  applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, saveState, setScene
} from '../src/state.js';

const ready = () => ({ ...setScene(createInitialState(), 'ch04_s01'), started: true, applied_events: ['ch03_s06_complete'] });
const options = ['d08_practise_greeting', 'd08_plan_message', 'd08_listen_first'];

test('S01 has canonical identity, stages, reused scene assets and no bespoke prop', () => {
  assert.equal(CH04_SCENE_01.id, 'ch04_s01');
  assert.equal(CH04_SCENE_01.title, 'The Invitation');
  assert.equal(CH04_SCENE_01.chapter, 'IV');
  assert.equal(CH04_SCENE_01.visualStage, 'in_training');
  assert.equal(CH04_SCENE_01.voiceStage, 'Emerging New Speech');
  assert.equal(CH04_SCENE_01.background.src, './assets/images/locations/ch02/ch02_higgins-study.webp');
  assert.equal(CH04_SCENE_01.eliza.src, './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png');
  assert.equal(CH04_SCENE_01.supporting[0].src, './assets/images/characters/pickering/runtime/pickering_master_cutout.png');
  assert.equal(CH04_SCENE_01.supporting[1].src, './assets/images/characters/higgins/runtime/higgins_master_cutout.png');
  assert.deepEqual(CH04_SCENE_01.props, []);
  assert.deepEqual(CH04_SCENE_01.voice.map(({ id, src, transcript, label, inline, generationId, voiceId }) =>
    ({ id, src, transcript, label, inline, generationId, voiceId })), [
    {
      id: 'AM34-HIGGINS',
      src: './assets/audio/characters/higgins/higgins_ch04_scene01_001.mp3',
      transcript: 'Sensible. We shall prepare the words, not the whole evening.',
      label: 'Replay Higgins', inline: true,
      generationId: 'BkxpJUWvNKNKFbxn4HnI', voiceId: 'JlptfLxaUpd8pZcw9dKd'
    },
    {
      id: 'AM34-ELIZA',
      src: './assets/audio/characters/eliza/eliza_ch04_scene01_001.mp3',
      transcript: 'I want to know what they mean, not only how I should answer.',
      label: 'Replay Eliza', inline: true,
      generationId: 'GNCSWbwXOiHiwxtWbQYY', voiceId: '124kaYCknTDsnwUFdWl9'
    }
  ]);
  for (const voice of CH04_SCENE_01.voice) {
    const path = new URL(`../${voice.src.replace(/^\.\//, '')}`, import.meta.url);
    const audio = fs.readFileSync(path);
    assert.ok(audio.length > 1000, `${voice.src} should contain audio data`);
    assert.equal(audio.toString('ascii', 0, 3), 'ID3', `${voice.src} should have an MP3 ID3 header`);
    const tagSize = ((audio[6] & 0x7f) << 21) | ((audio[7] & 0x7f) << 14) | ((audio[8] & 0x7f) << 7) | (audio[9] & 0x7f);
    const frameStart = 10 + tagSize + (audio[5] & 0x10 ? 10 : 0);
    let hasMpegFrame = false;
    for (let i = frameStart; i < Math.min(frameStart + 4096, audio.length - 1); i += 1) {
      if (audio[i] === 0xff && (audio[i + 1] & 0xe0) === 0xe0) { hasMpegFrame = true; break; }
    }
    assert.ok(hasMpegFrame, `${voice.src} should contain an MPEG audio frame`);
    assert.ok(CH04_SCENE_01.storyBeats.some(({ text }) => text === voice.transcript), `${voice.id} transcript must match visible story text exactly`);
  }
  assert.equal(CH04_SCENE_01.voice.length, 2, 'Pickering remains text-only and no challenge audio is added');
  assert.equal(CH04_SCENE_01.nextScene, 'ch04_s02');
});

test('S01 retains all thirteen canonical learner-visible story lines in order', () => {
  assert.deepEqual(CH04_SCENE_01.storyBeats.map(({ speaker, text }) => [speaker || 'Narration', text]), [
    ['Narration', 'The lesson is over. The learning is not.'],
    ['Pickering', 'A card came for you, Miss Doolittle. You are invited to a small reading and tea on Friday.'],
    ['Eliza', 'For me? Will I have to speak in front of everyone?'],
    ['Pickering', 'You may meet a few people. There is no speech planned.'],
    ['Higgins', 'A greeting is enough to begin. We can prepare one.'],
    ['Eliza', 'I can practise it here. But people do not wait like a lesson does.'],
    ['Higgins', 'Then listen first. A conversation is an experiment, too.'],
    ['Pickering', 'And you may take your time. You are going as yourself.'],
    ['Eliza', 'I want to know what they mean, not only how I should answer.'],
    ['Higgins', 'Sensible. We shall prepare the words, not the whole evening.'],
    ['Eliza', 'Should I practise a greeting, think about what I want to say, or listen first?'],
    ['Narration', 'The invitation rests on the desk. Friday is still ahead.'],
    ['Eliza', 'All right. Let me choose where to begin.']
  ]);
});

test('D08 has exact neutral labels, no flavour, no answer and no challenge', () => {
  assert.equal(CH04_SCENE_01.decision.id, 'D08');
  assert.equal(CH04_SCENE_01.decision.prompt, 'Where should Eliza begin?');
  assert.deepEqual(CH04_SCENE_01.decision.choices.map(({ id, title }) => [id, title]), [
    [options[0], 'Practise a simple greeting.'], [options[1], 'Think about what she wants to say.'], [options[2], 'Listen first and observe.']
  ]);
  assert.equal(CH04_SCENE_01.decision.neutralChoice, true);
  assert.equal(CH04_SCENE_01.decision.labelOnly, true);
  assert.equal(CH04_SCENE_01.decision.hideResult, true);
  assert.equal(CH04_SCENE_01.consequence, undefined);
  assert.equal(CH04_SCENE_01.challenge, undefined);
  const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.neutral-choice \.choice-button \{ grid-template-columns: 1fr; \}/);
});

test('D08 blocks completion until one choice and records a single stable event without score changes', () => {
  for (const option of options) {
    let state = ready();
    const beforeScores = [state.pronunciation, state.confidence, state.independence];
    assert.match(getSceneAdvanceBlock(state, CH04_SCENE_01), /Choose a response/);
    assert.equal(completeScene(state, CH04_SCENE_01), state);
    assert.equal(applyDecision(state, 'D08', 'unknown'), state);
    state = applyDecision(state, 'D08', option);
    assert.equal(state.decisions.D08, option);
    assert.equal(state.applied_events.filter((id) => id === 'ch04_d08_recorded').length, 1);
    assert.deepEqual([state.pronunciation, state.confidence, state.independence], beforeScores);
    assert.equal(applyDecision(state, 'D08', options.find((item) => item !== option)), state);
    const completed = completeScene(state, CH04_SCENE_01);
    assert.equal(completed.applied_events.filter((id) => id === 'ch04_s01_complete').length, 1);
    assert.equal(completeScene(completed, CH04_SCENE_01), completed);
    assert.equal(completed.pronunciation, beforeScores[0]);
  }
});

test('S01 cannot be completed or selected before Chapter III S06 completion', () => {
  const blocked = { ...ready(), applied_events: [] };
  assert.equal(getSceneAdvanceBlock(blocked, CH04_SCENE_01), 'Complete Chapter III Scene 06 before opening The Invitation.');
  assert.equal(applyDecision(blocked, 'D08', options[0]), blocked);
  assert.equal(completeScene(blocked, CH04_SCENE_01), blocked);
});

test('D08 uses only decisions.D08 and survives local storage round trip', () => {
  let state = applyDecision(ready(), 'D08', options[0]);
  const values = new Map();
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
  saveState(state, storage);
  state = loadState(storage);
  assert.equal(state.decisions.D08, options[0]);
  assert.equal(state.first_test_strategy, undefined);
  assert.equal(state.applied_events.includes('ch04_d08_recorded'), true);
});

test('all D08 options converge to S02 only through explicit Continue; ambience remains continuous', () => {
  assert.equal(CH03_SCENE_06.nextScene, 'ch04_s01');
  assert.equal(ambienceForScene('ch04_s01'), 'ch03_lesson_room');
  assert.equal(isContinuousAmbienceTransition('ch03_s06', 'ch04_s01'), true);
  assert.equal(CH04_SCENE_01.nextScene, 'ch04_s02');
  for (const option of options) {
    const state = applyDecision(ready(), 'D08', option);
    assert.equal(getSceneAdvanceBlock(state, CH04_SCENE_01), '');
    assert.equal(state.scene, 'ch04_s01', 'choosing an option does not auto-transition');
    assert.equal(state.applied_events.includes('ch04_s01_complete'), false);
  }
});

test('S01 Teacher Mode has twelve read-only content sections and keeps LC11 in S02', () => {
  assert.equal(CH04_S01_TEACHER_SECTIONS.length, 12);
  assert.match(CH04_S01_TEACHER_SECTIONS[3][1], /LC11 belongs to S02/);
  assert.match(CH04_S01_TEACHER_SECTIONS[9][1], /Emerging New Speech/);
  assert.match(CH04_S01_TEACHER_SECTIONS[9][1], /in_training/);
  assert.match(CH04_S01_TEACHER_SECTIONS[10][1], /read-only/);
  assert.match(CH04_S01_TEACHER_SECTIONS[11][1], /ch04_s01_complete/);
  assert.match(CH04_S01_TEACHER_SECTIONS[11][1], /explicit Continue/);
});

test('S01 UI presents neutral D08 controls, read-only Teacher preview, then explicit Continue', async (t) => {
  const names = ['document', 'window', 'localStorage', 'Audio'];
  const originals = Object.fromEntries(names.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; });
  const nodes = new Map(), events = {};
  class FakeAudio {
    constructor(src) { this.src = src; this.paused = true; this.volume = 1; this.muted = false; this.listeners = new Map(); }
    play() { this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
    addEventListener(name, fn) { this.listeners.set(name, fn); }
    removeEventListener(name) { this.listeners.delete(name); }
  }
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  let saved = JSON.stringify({ ...ready(), soundEnabled: false }), writes = 0;
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  globalThis.Audio = FakeAudio;
  globalThis.window = { location: { hash: '#ch04_s01', pathname: '/' }, history: { state: { scene: 'ch04_s01' }, pushState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(fn) { fn(); }, addEventListener() {} };
  globalThis.localStorage = { getItem() { return saved; }, setItem(_key, value) { saved = value; writes++; } };
  const { render } = await import('../src/app.js?ch04-s01-ui');
  const click = (action, data = {}) => events.click({ isTrusted: false, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  render();
  let html = node('#app').innerHTML;
  assert.match(html, /Where should Eliza begin\?/);
  assert.equal((html.match(/data-decision="D08"/g) || []).length, 3);
  assert.equal((html.match(/aria-pressed="false"/g) || []).length, 3);
  assert.equal((html.match(/data-action="play-voice"/g) || []).length, 2);
  assert.doesNotMatch(html, /data-action="next-scene"|LC11|choice-feedback/);
  assert.match(html, /I want to know what they mean, not only how I should answer\.[\s\S]*?Replay Eliza[\s\S]*?Sensible\. We shall prepare the words, not the whole evening\.[\s\S]*?Replay Higgins/);
  assert.equal(node('#story-root').className, undefined);
  await click('open-teacher');
  assert.equal((node('#teacher-content').innerHTML.match(/class="teacher-section"/g) || []).length, 12);
  const beforePreview = saved, beforeWrites = writes;
  await click('teacher-preview');
  html = node('#app').innerHTML;
  assert.match(html, /Teacher preview · read-only/);
  assert.match(html, /Return to student scene/);
  assert.equal((html.match(/data-action="play-voice"/g) || []).length, 2, 'Teacher preview exposes replay controls without triggering playback');
  await click('choose-decision', { decision: 'D08', option: options[0] });
  await click('next-scene');
  assert.equal(saved, beforePreview);
  assert.equal(writes, beforeWrites);
  await click('return-student');
  html = node('#app').innerHTML;
  assert.doesNotMatch(html, /Teacher preview · read-only/);
  await click('choose-decision', { decision: 'D08', option: options[2] });
  html = node('#app').innerHTML;
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /data-action="next-scene"/);
  assert.doesNotMatch(html, /choice-feedback|correct|incorrect|first_test_strategy/);
  await click('next-scene');
  assert.equal(window.location.hash, '#ch04_s02');
  assert.equal(JSON.parse(saved).scene, 'ch04_s02');
  assert.equal(JSON.parse(saved).applied_events.filter((id) => id === 'ch04_s01_complete').length, 1);
  assert.match(node('#app').innerHTML, /Names and Weather/);
});
