import test from 'node:test';
import { SAVE_KEY, savedProgress, readSavedProgress } from './progress-test-helpers.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CH03_SCENE_03, CH03_SCENE_04, CH03_S04_TEACHER_SECTIONS } from '../src/ch03-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import {
  applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, markLc08SupportUsed,
  recordLc08Answer, setScene
} from '../src/state.js';

const ready = () => ({
  ...setScene(createInitialState(), 'ch03_s04'),
  applied_events: ['ch03_s01_complete', 'ch03_s02_complete', 'ch03_lc07_completed', 'ch03_s03_complete']
});
const chooseD07 = (state, option = 'd07_repeat_slowly') => applyDecision(state, 'D07', option);
const answer = (state, index, option) => recordLc08Answer(state, CH03_SCENE_04.challenge.samples[index].id, option);

test('S04 canon has the exact story, ordered demonstration, D07 and LC08 audio mappings', () => {
  assert.equal(CH03_SCENE_04.id, 'ch03_s04');
  assert.equal(CH03_SCENE_04.visualStage, 'in_training');
  assert.equal(CH03_SCENE_04.nextScene, 'ch03_s05');
  assert.equal(CH03_SCENE_04.voice.length, 9);
  assert.deepEqual(CH03_SCENE_03.background, CH03_SCENE_04.background);
  assert.deepEqual(CH03_SCENE_03.eliza, CH03_SCENE_04.eliza);
  assert.deepEqual(CH03_SCENE_03.supporting, CH03_SCENE_04.supporting);
  assert.deepEqual(CH03_SCENE_04.storyBeats.map(({ text }) => text), [
    'You found the shape inside a word. Now listen for the shape of a whole sentence.',
    'You mean some words matter more than the others?',
    'Some carry more of the message. Let those words come forward.',
    'And the little ones can stop fighting for attention.',
    'Eliza tries the sentence carefully, giving each word much the same weight.',
    'Listen: She ordered the blue hat.',
    'Now listen again: She ordered the BLUE hat.',
    'The second one sounds as if the colour matters.',
    'Exactly. Stress can tell the listener what matters most.'
  ]);
  assert.equal(CH03_SCENE_04.decision.prompt, 'The sentence still feels awkward. What would Eliza like to try next?');
  assert.deepEqual(CH03_SCENE_04.decision.choices.map(({ id }) => id), ['d07_repeat_slowly', 'd07_hear_naturally', 'd07_try_first']);
  assert.deepEqual(CH03_SCENE_04.challenge.samples.map(({ id, sentence, answer, focusWord, src }) => [id, sentence, answer, focusWord, src]), [
    ['lc08_sample_01', 'I wanted the red flowers.', 'lc08_focus_red', 'red', './assets/audio/challenges/ch03/lc08_red_flowers.mp3'],
    ['lc08_sample_02', 'She bought three tickets.', 'lc08_focus_three', 'three', './assets/audio/challenges/ch03/lc08_three_tickets.mp3'],
    ['lc08_sample_03', 'We meet on Monday.', 'lc08_focus_monday', 'Monday', './assets/audio/challenges/ch03/lc08_monday.mp3']
  ]);
  const demo = CH03_SCENE_04.voice.filter(({ id }) => id.includes('DEMO'));
  assert.deepEqual(demo.map(({ id, transcript, spokenTranscript }) => [id, transcript, spokenTranscript]), [
    ['AM28-S04-DEMO-NEUTRAL', 'Listen: She ordered the blue hat.', undefined],
    ['AM28-S04-DEMO-BLUE', 'Now listen again: She ordered the BLUE hat.', 'Now listen again: She ordered the blue hat.']
  ]);
  assert.equal(CH03_SCENE_04.voice.filter(({ src }) => src.includes('pickering')).length, 0);
  assert.equal(new Set(CH03_SCENE_04.voice.map(({ generationId }) => generationId)).size, 9);
  assert.equal(new Set(CH03_SCENE_04.challenge.samples.map(({ generationId }) => generationId)).size, 3);
  assert.equal(CH03_S04_TEACHER_SECTIONS.length, 12);
  assert.equal(ambienceForScene('ch03_s04'), 'ch03_lesson_room');
  assert.equal(isContinuousAmbienceTransition('ch03_s03', 'ch03_s04'), true);
  assert.doesNotMatch(fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8'), /speechSynthesis/);
});

test('the twelve exact S04 assets are nonempty complete MPEG-1 Layer III files at the approved paths and durations', () => {
  const expected = [
    ['assets/audio/characters/higgins/higgins_ch03_scene04_001.mp3', 'PBbwBKYlbZRuMegfVqEP', 102851, 5.355],
    ['assets/audio/characters/eliza/eliza_ch03_scene04_001.mp3', 'ZdlcCnZPrpNr1lz8nSUO', 56458, 2.456],
    ['assets/audio/characters/higgins/higgins_ch03_scene04_002.mp3', '0FJ09RPTm1W0R1kPTJhP', 93656, 4.780],
    ['assets/audio/characters/higgins/higgins_ch03_scene04_003.mp3', 'KE0lRpfOof5MdSx74qNM', 63145, 2.873],
    ['assets/audio/characters/higgins/higgins_ch03_scene04_004.mp3', 'dpYaIOc4SEVClkQlHkhw', 87387, 4.389],
    ['assets/audio/characters/eliza/eliza_ch03_scene04_002.mp3', 'mck5x5LYcN6cMpLY4djT', 55204, 2.377],
    ['assets/audio/characters/eliza/eliza_ch03_scene04_003.mp3', 'wdrnBeViGCh7IfmUxlXh', 74430, 3.579],
    ['assets/audio/characters/eliza/eliza_ch03_scene04_004.mp3', '4XJXdtY6BQ8LBJQGfWk5', 73176, 3.500],
    ['assets/audio/characters/higgins/higgins_ch03_scene04_005.mp3', 'xXOLtnVKTYudAqtgzMtD', 82371, 4.075],
    ['assets/audio/challenges/ch03/lc08_red_flowers.mp3', 'C75v8nwMAi4LDv77a5E5', 45173, 1.750],
    ['assets/audio/challenges/ch03/lc08_three_tickets.mp3', 'g4qwP6RN6myY2TROQ7AI', 50188, 2.064],
    ['assets/audio/challenges/ch03/lc08_monday.mp3', 'gZQbWcFFvjSXBQ57rUJ4', 38485, 1.332]
  ];
  const bitrateKbps = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
  const mapped = new Map([
    ...CH03_SCENE_04.voice.map(({ src, generationId }) => [src.replace(/^\.\/assets\//, 'assets/'), generationId]),
    ...CH03_SCENE_04.challenge.samples.map(({ src, generationId }) => [src.replace(/^\.\/assets\//, 'assets/'), generationId])
  ]);
  for (const [relativePath, generationId, expectedBytes, expectedDuration] of expected) {
    const file = new URL(`../${relativePath}`, import.meta.url);
    const bytes = fs.readFileSync(file);
    assert.equal(mapped.get(relativePath), generationId, relativePath);
    assert.ok(bytes.length > 0);
    assert.equal(bytes.length, expectedBytes, relativePath);
    assert.doesNotMatch(bytes.subarray(0, 256).toString('latin1'), /<html|<\?xml|access denied|error/i, relativePath);
    assert.equal(bytes.toString('ascii', 0, 3), 'ID3', relativePath);
    let offset = 10 + (((bytes[6] & 0x7f) << 21) | ((bytes[7] & 0x7f) << 14) | ((bytes[8] & 0x7f) << 7) | (bytes[9] & 0x7f)) + ((bytes[5] & 0x10) ? 10 : 0);
    let frames = 0;
    while (offset + 4 <= bytes.length) {
      assert.equal(bytes[offset], 0xff, `${relativePath}: sync @${offset}`);
      assert.equal(bytes[offset + 1] & 0xe0, 0xe0, `${relativePath}: sync @${offset}`);
      const header = bytes.readUInt32BE(offset);
      const version = (header >>> 19) & 0x3, layer = (header >>> 17) & 0x3;
      const bitrateIndex = (header >>> 12) & 0xf, sampleRateIndex = (header >>> 10) & 0x3, padding = (header >>> 9) & 1;
      assert.equal(version, 3, relativePath);
      assert.equal(layer, 1, relativePath);
      assert.equal(sampleRateIndex, 0, relativePath);
      assert.ok(bitrateIndex > 0 && bitrateIndex < 15, relativePath);
      offset += Math.floor(144 * bitrateKbps[bitrateIndex] * 1000 / 44100) + padding;
      frames++;
    }
    assert.equal(offset, bytes.length, `${relativePath}: no truncated frame or trailing payload`);
    assert.ok(Math.abs(frames * 1152 / 44100 - expectedDuration) < 0.001, relativePath);
  }
});

test('D07 accepts only the three canonical strategies, records once and changes no learning signal', () => {
  for (const option of ['d07_repeat_slowly', 'd07_hear_naturally', 'd07_try_first']) {
    const initial = ready();
    const next = chooseD07(initial, option);
    assert.equal(next.decisions.D07, option);
    assert.equal(next.pronunciation, initial.pronunciation);
    assert.equal(next.confidence, initial.confidence);
    assert.equal(next.independence, initial.independence);
    assert.deepEqual(next.challenges.lc08, initial.challenges.lc08);
    assert.equal(next.applied_events.filter((id) => id === 'ch03_d07_practice_strategy').length, 1);
    assert.equal(chooseD07(next, 'd07_try_first'), next);
  }
  const invalid = ready();
  assert.equal(chooseD07(invalid, 'not-an-option'), invalid);
  assert.match(getSceneAdvanceBlock(ready(), CH03_SCENE_04), /Choose a response/);
});

test('LC08 validates answers, freezes correct items and rewards unaided completion exactly once', () => {
  let state = chooseD07(ready());
  assert.equal(recordLc08Answer(state, 'lc08_sample_01', 'unknown'), state);
  state = answer(state, 0, 'lc08_focus_flowers');
  assert.equal(state.challenges.lc08.answers.lc08_sample_01.correct, false);
  state = answer(state, 0, 'lc08_focus_red');
  assert.equal(state.challenges.lc08.answers.lc08_sample_01.correct, true);
  assert.equal(answer(state, 0, 'lc08_focus_flowers'), state, 'correct items cannot be changed on retry');
  state = answer(state, 1, 'lc08_focus_three');
  state = answer(state, 2, 'lc08_focus_monday');
  assert.equal(state.challenges.lc08.completed, true);
  assert.equal(state.pronunciation, 1);
  assert.equal(state.applied_events.filter((id) => id === 'ch03_lc08_completed').length, 1);
  assert.equal(answer(state, 1, 'lc08_focus_bought'), state, 'completed challenge is read-only');
  assert.equal(state.pronunciation, 1);
});

test('opening Supported Practice after an attempt permanently removes the reward without penalty', () => {
  let state = chooseD07(ready());
  state = answer(state, 0, 'lc08_focus_flowers');
  state = markLc08SupportUsed(state);
  assert.equal(state.challenges.lc08.supportUsed, true);
  assert.equal(markLc08SupportUsed(state), state);
  state = answer(state, 0, 'lc08_focus_red');
  state = answer(state, 1, 'lc08_focus_three');
  state = answer(state, 2, 'lc08_focus_monday');
  assert.equal(state.challenges.lc08.completed, true);
  assert.equal(state.pronunciation, 0);
  assert.ok(state.applied_events.includes('ch03_lc08_completed'));
  assert.equal(state.applied_events.filter((id) => id === 'ch03_lc08_completed').length, 1);
});

test('S04 needs D07, LC08 and explicit Continue before recording completion', () => {
  let state = ready();
  assert.equal(completeScene(state, CH03_SCENE_04), state);
  state = chooseD07(state, 'd07_try_first');
  assert.match(getSceneAdvanceBlock(state, CH03_SCENE_04), /Complete the listening challenge/);
  assert.equal(completeScene(state, CH03_SCENE_04), state);
  state = answer(state, 0, 'lc08_focus_red');
  state = answer(state, 1, 'lc08_focus_three');
  state = answer(state, 2, 'lc08_focus_monday');
  assert.equal(state.applied_events.includes('ch03_s04_complete'), false);
  state = completeScene(state, CH03_SCENE_04);
  assert.ok(state.applied_events.includes('ch03_s04_complete'));
  assert.equal(state.pronunciation, 1);
  assert.equal(completeScene(state, CH03_SCENE_04), state);
});

test('S04 UI keeps neutral answer labels, replay state-neutral, Teacher read-only and S05 safe', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage', 'Audio'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; });
  const nodes = new Map(), events = {}, audioInstances = [];
  class FakeAudio {
    constructor(src) { this.src = src; this.paused = true; this.volume = 1; this.muted = false; this.listeners = new Map(); audioInstances.push(this); }
    play() { this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
    addEventListener(name, fn) { this.listeners.set(name, fn); }
    removeEventListener(name) { this.listeners.delete(name); }
  }
  let saved = savedProgress(ready()), writes = 0;
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  globalThis.Audio = FakeAudio;
  globalThis.window = { location: { hash: '#ch03_s04', pathname: '/' }, history: { state: { scene: 'ch03_s04' }, pushState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(fn) { fn(); }, addEventListener() {} };
  globalThis.localStorage = { getItem() { return saved; }, setItem(_key, value) { saved = value; writes++; } };
  const { render } = await import('../src/app.js?ch03-s04-ui');
  const click = (action, data = {}) => events.click({ isTrusted: action === 'play-voice' || action === 'play-challenge', target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  render();
  let html = node('#app').innerHTML;
  assert.match(html, /A Sentence Has Shape/);
  assert.match(html, /She ordered the BLUE hat\./);
  assert.match(html, /lc08_sample_01/);
  assert.equal((html.match(/data-action="play-voice"/g) || []).length, 6);
  assert.equal((html.match(/data-action="play-challenge"/g) || []).length, 3);
  assert.match(html, /aria-label="Replay sentence 1"/);
  const challengeLabels = [...html.matchAll(/<button[^>]*data-action="play-challenge"[^>]*aria-label="([^"]+)"[^>]*>/g)].map(([, label]) => label).join(' ');
  assert.doesNotMatch(challengeLabels, /(?:red|three|Monday)/i);
  assert.doesNotMatch(html, /revealed|selected/);
  assert.equal((html.match(/class="lc08-word"/g) || []).length, 13);
  const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.lc08-word:hover \{ background: transparent; color: inherit; text-decoration: none; \}/);
  const initial = saved, initialWrites = writes;

  await click('play-voice', { src: CH03_SCENE_04.voice[0].src });
  assert.equal(saved, initial, 'story replay does not write progress or D07');
  await click('play-challenge', { src: CH03_SCENE_04.challenge.samples[0].src, sample: 'lc08_sample_01' });
  assert.equal(saved, initial, 'objective replay does not write answers or reward state');
  assert.ok(audioInstances.some(({ src, paused }) => src === CH03_SCENE_04.voice[0].src && paused), 'new foreground audio interrupts the prior story take');

  await click('choose-decision', { decision: 'D07', option: 'd07_hear_naturally' });
  assert.equal(readSavedProgress(saved).decisions.D07, 'd07_hear_naturally');
  assert.match(node('#app').innerHTML, /Notice where the message comes forward/);
  await click('answer-lc08', { sample: 'lc08_sample_01', answer: 'lc08_focus_flowers' });
  assert.match(node('#app').innerHTML, /data-action="open-lc08-support"/);
  await click('open-lc08-support');
  assert.equal(readSavedProgress(saved).challenges.lc08.supportUsed, true);
  assert.match(node('#app').innerHTML, /I wanted the red flowers\. — red/);

  await click('open-teacher');
  assert.equal((node('#teacher-content').innerHTML.match(/class="teacher-section"/g) || []).length, 12);
  assert.match(node('#teacher-content').innerHTML, /S03 word stress.*S04 sentence stress/s);
  assert.match(node('#teacher-content').innerHTML, /lc08_sample_01.*lc08_focus_red.*red/s);
  await click('teacher-preview');
  const beforePreviewAction = saved, beforePreviewWrites = writes;
  await click('answer-lc08', { sample: 'lc08_sample_02', answer: 'lc08_focus_three' });
  await click('choose-decision', { decision: 'D07', option: 'd07_try_first' });
  assert.equal(saved, beforePreviewAction);
  assert.equal(writes, beforePreviewWrites);
  await click('return-student');
  assert.equal(initial === saved, false);
  assert.equal(initialWrites < writes, true);

  for (const [sample, answerId] of [['lc08_sample_01', 'lc08_focus_red'], ['lc08_sample_02', 'lc08_focus_three'], ['lc08_sample_03', 'lc08_focus_monday']]) {
    await click('answer-lc08', { sample, answer: answerId });
  }
  assert.equal(readSavedProgress(saved).challenges.lc08.completed, true);
  assert.equal(readSavedProgress(saved).pronunciation, 0);
  assert.equal(readSavedProgress(saved).applied_events.includes('ch03_s04_complete'), false);
  await click('next-scene');
  assert.ok(readSavedProgress(saved).applied_events.includes('ch03_s04_complete'));
  assert.equal(readSavedProgress(saved).scene, 'ch03_s05');
  assert.match(node('#app').innerHTML, /The Bad Day/);
  assert.match(node('#app').innerHTML, /data-action="answer-lc09"/);
});
