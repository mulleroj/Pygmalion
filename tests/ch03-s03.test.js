import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CH03_SCENE_02, CH03_SCENE_03, CH03_S03_TEACHER_SECTIONS } from '../src/ch03-content.js';
import {
  createInitialState, setScene, loadState, recordLc07Answer, markLc07SupportUsed,
  completeScene, getSceneAdvanceBlock
} from '../src/state.js';

const ready = () => ({
  ...setScene(createInitialState(), 'ch03_s03'),
  ch03_s01_complete: true,
  applied_events: ['ch03_s01_complete', 'ch03_s02_complete']
});
const targets = CH03_SCENE_03.challenge.samples;

test('S03 is registered with exact locked story, visual stage, assets, no decision and three LC07 samples', () => {
  assert.equal(CH03_SCENE_03.id, 'ch03_s03');
  assert.equal(CH03_SCENE_03.number, 3);
  assert.equal(CH03_SCENE_03.visualStage, 'in_training');
  assert.equal(CH03_SCENE_03.nextScene, 'ch03_s04');
  assert.equal(CH03_SCENE_03.decision, undefined);
  assert.deepEqual(CH03_SCENE_03.voice, []);
  assert.deepEqual(CH03_SCENE_03.background, CH03_SCENE_02.background);
  assert.deepEqual(CH03_SCENE_03.eliza, CH03_SCENE_02.eliza);
  assert.deepEqual(CH03_SCENE_03.supporting, CH03_SCENE_02.supporting);
  assert.deepEqual(targets.map(({ id, word, syllables, answer }) => [id, word, syllables, answer]), [
    ['lc07_sample_01', 'customer', ['cus', 'to', 'mer'], 'lc07_stress_customer_1'],
    ['lc07_sample_02', 'expensive', ['ex', 'pen', 'sive'], 'lc07_stress_expensive_2'],
    ['lc07_sample_03', 'delivery', ['de', 'liv', 'er', 'y'], 'lc07_stress_delivery_2']
  ]);
  const allDialogue = [...CH03_SCENE_03.storyBeats, ...CH03_SCENE_03.reflection].map(({ text }) => text);
  assert.deepEqual(allDialogue, [
    'A word has a shape. One syllable usually carries more weight than the others.',
    "So I needn't fight with every bit of it at once?",
    'No. Listen for the part that stands out.',
    "Then say it again. I'll listen for the strongest bit.",
    'Do not count the letters. Listen to the sound of the whole word.',
    'Right. I want to hear where it leans.',
    'I can hear it now. One part comes forward and the rest follow it.',
    'Exactly. Find the stress first, and the word becomes easier to shape.'
  ]);
  assert.equal(CH03_S03_TEACHER_SECTIONS.length, 12);
  assert.match(CH03_S03_TEACHER_SECTIONS[7][1], /CUS-to-mer.*ex-PEN-sive.*de-LIV-er-y/s);
});

test('old saves default LC07 safely without introducing word_stress_seen', () => {
  const state = loadState({ getItem: () => JSON.stringify({ scene: 'ch03_s03', challenges: { lc06: { completed: true } } }) });
  assert.deepEqual(state.challenges.lc07, { answers: {}, completed: false, attempts: 0, firstAttempt: false, supportUsed: false });
  assert.equal(state.word_stress_seen, undefined);
  assert.equal(state.challenges.word_stress_seen, undefined);
});

test('S03 is gated by S02 completion and has no D-numbered decision', () => {
  assert.match(getSceneAdvanceBlock(setScene(createInitialState(), 'ch03_s03'), CH03_SCENE_03), /Complete Chapter III Scene 02/);
  assert.equal(getSceneAdvanceBlock(ready(), CH03_SCENE_03), 'Complete the listening challenge to continue.');
});

test('unaided completion applies Pronunciation +1 once, freezes correct answers, and leaves scene completion to Continue', () => {
  let state = ready();
  state = recordLc07Answer(state, 'lc07_sample_01', 'lc07_stress_customer_1');
  assert.equal(state.challenges.lc07.answers.lc07_sample_01.correct, true);
  assert.equal(recordLc07Answer(state, 'lc07_sample_01', 'lc07_stress_customer_2'), state, 'correct responses remain frozen');
  state = recordLc07Answer(state, 'lc07_sample_02', 'lc07_stress_expensive_2');
  state = recordLc07Answer(state, 'lc07_sample_03', 'lc07_stress_delivery_2');
  assert.equal(state.challenges.lc07.completed, true);
  assert.equal(state.pronunciation, 1);
  assert.equal(state.applied_events.filter((id) => id === 'ch03_lc07_completed').length, 1);
  assert.equal(state.applied_events.includes('ch03_s03_complete'), false);
  assert.equal(recordLc07Answer(state, 'lc07_sample_02', 'lc07_stress_expensive_1'), state, 'replay/submission after completion is read-only');
  assert.equal(state.pronunciation, 1);
  state = completeScene(state, CH03_SCENE_03);
  assert.ok(state.applied_events.includes('ch03_s03_complete'));
  assert.equal(state.pronunciation, 1);
  assert.equal(completeScene(state, CH03_SCENE_03), state, 'completion is idempotent');
});

test('incorrect answers can be retried; opening target-revealing support cancels reward without penalty', () => {
  let state = ready();
  assert.equal(markLc07SupportUsed(state), state, 'support cannot open before an attempt');
  state = recordLc07Answer(state, 'lc07_sample_01', 'lc07_stress_customer_1');
  state = recordLc07Answer(state, 'lc07_sample_02', 'lc07_stress_expensive_1');
  assert.equal(state.challenges.lc07.answers.lc07_sample_01.correct, true);
  assert.equal(state.challenges.lc07.answers.lc07_sample_02.correct, false);
  state = markLc07SupportUsed(state);
  assert.equal(state.challenges.lc07.supportUsed, true);
  const refreshed = loadState({ getItem: () => JSON.stringify(state) });
  assert.equal(refreshed.challenges.lc07.supportUsed, true);
  state = recordLc07Answer(refreshed, 'lc07_sample_02', 'lc07_stress_expensive_2');
  state = recordLc07Answer(state, 'lc07_sample_03', 'lc07_stress_delivery_2');
  assert.equal(state.challenges.lc07.completed, true);
  assert.equal(state.pronunciation, 0);
  assert.ok(state.applied_events.includes('ch03_lc07_completed'));
  assert.equal(markLc07SupportUsed(state), state);
});

test('LC07 renders book-first with no answer leak, no audio/TTS, and a read-only 12-section Teacher preview', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; });
  const nodes = new Map(), events = {};
  let saved = JSON.stringify(ready()), writes = 0;
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  globalThis.window = { location: { hash: '#ch03_s03', pathname: '/' }, history: { state: { scene: 'ch03_s03' }, pushState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(fn) { fn(); }, addEventListener() {} };
  globalThis.localStorage = { getItem() { return saved; }, setItem(_key, value) { saved = value; writes++; } };
  const { render } = await import('../src/app.js?ch03-s03-ui');
  const click = (action, data = {}) => events.click({ isTrusted: false, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  render();
  const html = node('#app').innerHTML;
  assert.match(html, /Finding the Main Stress/);
  assert.match(html, /A word has a shape\. One syllable usually carries more weight than the others\./);
  assert.match(html, /Choose the syllable that carries the main stress/);
  assert.match(html, /cus.*to.*mer/);
  assert.match(html, /ex.*pen.*sive/);
  assert.match(html, /de.*liv.*er.*y/);
  assert.doesNotMatch(html, /CUS-to-mer|ex-PEN-sive|de-LIV-er-y/);
  assert.doesNotMatch(html, /data-action="play-(?:voice|challenge)"|speechSynthesis/);
  assert.match(html, /LC07 audio is not available in this runtime/);
  const beforeRender = saved, beforeWrites = writes;
  render();
  assert.equal(saved, beforeRender);
  assert.equal(writes, beforeWrites);

  await click('open-teacher');
  assert.equal((node('#teacher-content').innerHTML.match(/class="teacher-section"/g) || []).length, 12);
  assert.match(node('#teacher-content').innerHTML, /CUS-to-mer.*ex-PEN-sive.*de-LIV-er-y/s);
  assert.match(node('#teacher-content').innerHTML, /sentence stress and intonation belong to S04/i);
  await click('teacher-preview');
  await click('answer-lc07', { sample: 'lc07_sample_01', answer: 'lc07_stress_customer_1' });
  await click('open-lc07-support');
  assert.equal(saved, beforeRender, 'Teacher preview cannot mutate answers, support or reward');
  assert.equal(writes, beforeWrites);
  await click('return-student');

  await click('answer-lc07', { sample: 'lc07_sample_01', answer: 'lc07_stress_customer_2' });
  assert.equal(JSON.parse(saved).challenges.lc07.answers.lc07_sample_01.correct, false);
  assert.match(node('#app').innerHTML, /data-action="open-lc07-support"/);
  assert.doesNotMatch(node('#app').innerHTML, /CUS-to-mer/);
  await click('open-lc07-support');
  assert.equal(JSON.parse(saved).challenges.lc07.supportUsed, true);
  assert.match(node('#app').innerHTML, /CUS-to-mer.*ex-PEN-sive.*de-LIV-er-y/s);
  for (const [sample, answer] of [
    ['lc07_sample_01', 'lc07_stress_customer_1'],
    ['lc07_sample_02', 'lc07_stress_expensive_2'],
    ['lc07_sample_03', 'lc07_stress_delivery_2']
  ]) await click('answer-lc07', { sample, answer });
  assert.equal(JSON.parse(saved).challenges.lc07.completed, true);
  assert.equal(JSON.parse(saved).pronunciation, 0);
  assert.equal(JSON.parse(saved).applied_events.includes('ch03_s03_complete'), false);
  await click('next-scene');
  assert.ok(JSON.parse(saved).applied_events.includes('ch03_s03_complete'));
  assert.equal(JSON.parse(saved).scene, 'ch03_s03');
  assert.match(node('#app').innerHTML, /sentence lesson is not available in this runtime yet/i);

  const appSource = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(appSource, /speechSynthesis/);
});
