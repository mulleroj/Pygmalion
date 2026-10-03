import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CH03_SCENE_01, CH03_SCENE_02, CH03_S02_TEACHER_SECTIONS } from '../src/ch03-content.js';
import { ambienceForScene } from '../src/content.js';
import {
  createInitialState, setScene, getSceneAdvanceBlock, recordLc06Attempt,
  recordLc06UnableToHear, markLc06SupportUsed, completeScene, loadState
} from '../src/state.js';

const scene = CH03_SCENE_02;
const ready = () => ({ ...setScene(createInitialState(), scene.id), ch03_s01_complete: true,
  applied_events: ['ch03_s01_complete'] });
const submit = (state, sampleId, word, meaning) => recordLc06Attempt(state, sampleId, word, meaning);

test('S02 exists after S01 and uses only its locked story, stage, title and visual assets', () => {
  assert.equal(scene.id, 'ch03_s02');
  assert.equal(scene.title, 'The Listening Room');
  assert.equal(scene.visualStage, 'in_training');
  assert.equal(scene.nextScene, 'ch03_s03');
  assert.equal(scene.eliza.src, CH03_SCENE_01.eliza.src);
  assert.equal(scene.supporting[0].src, CH03_SCENE_01.supporting[0].src);
  assert.equal(scene.background.src, CH03_SCENE_01.background.src);
  assert.equal(scene.voice.length, 4);
  assert.ok(scene.voice.every(({ src, generationId, voiceId, inline }) => src && generationId && voiceId && inline));
  assert.deepEqual(scene.voice.map(({ src }) => src), [
    './assets/audio/characters/higgins/higgins_ch03_scene02_001.mp3',
    './assets/audio/characters/eliza/eliza_ch03_scene02_001.mp3',
    './assets/audio/characters/eliza/eliza_ch03_scene02_002.mp3',
    './assets/audio/characters/higgins/higgins_ch03_scene02_002.mp3'
  ]);
  assert.deepEqual(scene.challenge.samples.map(({ src }) => src), [
    './assets/audio/challenges/ch03/lc06_three_flowers.mp3',
    './assets/audio/challenges/ch03/lc06_free_flowers.mp3'
  ]);
  const doc = fs.readFileSync(new URL('../docs/chapters/ch03/SCRIPT.md', import.meta.url), 'utf8');
  for (const beat of [...scene.storyBeats, ...scene.reflection]) assert.ok(doc.includes(beat.text), beat.text);
  assert.ok(doc.includes(scene.challenge.intro));
  assert.ok(doc.includes(scene.transition));
  assert.equal(ambienceForScene('ch03_s02'), 'ch03_lesson_room');
});

test('LC06 sample IDs, scripts, answer IDs, labels and keys match the locked contract', () => {
  assert.deepEqual(scene.challenge.samples.map(({ id, script, word, meaning }) => [id, script, word, meaning]), [
    ['lc06_sample_01', "I'd like three flowers.", 'lc06_word_three', 'lc06_meaning_three_flowers'],
    ['lc06_sample_02', "I'd like free flowers.", 'lc06_word_free', 'lc06_meaning_no_payment']
  ]);
  assert.deepEqual(scene.challenge.wordOptions, [{ id: 'lc06_word_three', label: 'three' }, { id: 'lc06_word_free', label: 'free' }]);
  assert.deepEqual(scene.challenge.meaningOptions, [
    { id: 'lc06_meaning_three_flowers', label: 'The customer wants three flowers.' },
    { id: 'lc06_meaning_no_payment', label: 'The customer wants flowers without paying.' }
  ]);
  assert.equal(CH03_S02_TEACHER_SECTIONS.length, 12);
  assert.match(CH03_S02_TEACHER_SECTIONS[2][1], /\/θ\/.*\/f\/.*three.*free/);
  assert.match(CH03_S02_TEACHER_SECTIONS[7][1], /pronunciation \+1.*no increment/);
  assert.match(CH03_S02_TEACHER_SECTIONS[10][1], /UNAIDED LISTENING.*supported practice.*read-only/i);
});

test('six S02 clips map one-to-one to approved generations and contain valid local MP3 bytes', () => {
  const all = [...scene.voice, ...scene.challenge.samples];
  assert.equal(all.length, 6);
  assert.equal(new Set(all.map(({ src }) => src)).size, 6);
  assert.equal(new Set(all.map(({ generationId }) => generationId)).size, 6);
  for (const item of all) {
    const file = item.src.replace(/^\.\//, '');
    const bytes = fs.readFileSync(new URL(`../${file}`, import.meta.url));
    assert.ok(bytes.length > 1000, file);
    assert.equal(bytes.toString('ascii', 0, 3), 'ID3', file);
    assert.equal(item.voiceId, item.id.startsWith('lc06_sample') || item.id.includes('higgins')
      ? 'JlptfLxaUpd8pZcw9dKd' : '124kaYCknTDsnwUFdWl9');
  }
  assert.deepEqual(scene.voice.map(({ transcript }) => transcript), [
    'This time, listen before you try to say the word.',
    'I know what my mouth is doing. My ears need a turn now.',
    'A small sound, but a different order. I can listen again before I answer.',
    'Good. Hear the difference first. Then practise saying it.'
  ]);
});

test('S02 is gated by S01 completion and explicit LC06 is required before continuing', () => {
  const locked = setScene(createInitialState(), scene.id);
  assert.match(getSceneAdvanceBlock(locked, scene), /Complete Chapter III Scene 01/);
  const opened = ready();
  assert.match(getSceneAdvanceBlock(opened, scene), /Complete the listening challenge/);
  assert.equal(completeScene(opened, scene), opened);
});

test('unaided first success applies the LC06 event and pronunciation once; correct subanswers stay frozen', () => {
  let state = ready();
  state = submit(state, 'lc06_sample_01', 'lc06_word_free', 'lc06_meaning_three_flowers');
  assert.equal(state.challenges.lc06.firstAttempt, true);
  assert.equal(state.challenges.lc06.attempts, 1);
  assert.equal(state.challenges.lc06.answers.lc06_sample_01.meaning.correct, true);
  assert.equal(state.pronunciation, 0);
  state = submit(state, 'lc06_sample_02', 'lc06_word_free', 'lc06_meaning_no_payment');
  assert.equal(state.challenges.lc06.completed, false);
  state = submit(state, 'lc06_sample_01', 'lc06_word_three', 'lc06_meaning_no_payment');
  assert.equal(state.challenges.lc06.answers.lc06_sample_01.meaning.answer, 'lc06_meaning_three_flowers');
  assert.equal(state.challenges.lc06.answers.lc06_sample_01.word.correct, true);
  assert.equal(state.challenges.lc06.completed, true);
  assert.equal(state.pronunciation, 1);
  assert.equal(state.applied_events.filter((id) => id === 'ch03_lc06_completed').length, 1);
  assert.equal(submit(state, 'lc06_sample_01', 'lc06_word_free', 'lc06_meaning_no_payment'), state);
  assert.equal(state.pronunciation, 1);
  const restored = loadState({ getItem: () => JSON.stringify(state) });
  assert.equal(submit(restored, 'lc06_sample_02', 'lc06_word_three', 'lc06_meaning_three_flowers'), restored);
  assert.equal(restored.pronunciation, 1);
});

test('opening supported practice cancels eligibility but still permits completion without penalty', () => {
  let state = ready();
  state = submit(state, 'lc06_sample_01', 'lc06_word_three', 'lc06_meaning_three_flowers');
  state = markLc06SupportUsed(state);
  assert.equal(state.challenges.lc06.supportUsed, true);
  state = submit(state, 'lc06_sample_02', 'lc06_word_free', 'lc06_meaning_no_payment');
  assert.equal(state.challenges.lc06.completed, true);
  assert.equal(state.pronunciation, 0);
  assert.ok(state.applied_events.includes('ch03_lc06_completed'));
});

test('the unable-to-hear route records an unresolved first attempt and opens supported completion', () => {
  let state = ready();
  state = recordLc06UnableToHear(state);
  assert.equal(state.challenges.lc06.firstAttempt, true);
  assert.equal(state.challenges.lc06.attempts, 1);
  assert.equal(state.challenges.lc06.completed, false);
  const unchanged = recordLc06UnableToHear(state);
  assert.equal(unchanged, state);
  state = markLc06SupportUsed(state);
  state = submit(state, 'lc06_sample_01', 'lc06_word_three', 'lc06_meaning_three_flowers');
  state = submit(state, 'lc06_sample_02', 'lc06_word_free', 'lc06_meaning_no_payment');
  assert.equal(state.challenges.lc06.completed, true);
  assert.equal(state.pronunciation, 0);
});

test('S02 Continue is explicit, idempotent and records no signal or chapter completion', () => {
  let state = ready();
  state = submit(state, 'lc06_sample_01', 'lc06_word_three', 'lc06_meaning_three_flowers');
  state = submit(state, 'lc06_sample_02', 'lc06_word_free', 'lc06_meaning_no_payment');
  const before = state.pronunciation;
  state = completeScene(state, scene);
  assert.ok(state.applied_events.includes('ch03_s02_complete'));
  assert.equal(state.applied_events.filter((id) => id === 'ch03_s02_complete').length, 1);
  assert.equal(state.pronunciation, before);
  assert.equal(state.completed, false);
  assert.equal(completeScene(state, scene), state);
  assert.equal(state.minimal_pair_seen, undefined);
  assert.equal(loadState({ getItem: () => JSON.stringify(state) }).challenges.lc06.supportUsed, false);
});

test('S02 UI plays approved files, hides transcripts until support and keeps preview read-only', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; });
  const nodes = new Map(), events = {};
  let saved = JSON.stringify(ready()), writes = 0;
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  globalThis.window = { location: { hash: '#ch03_s02', pathname: '/' }, history: { state: { scene: 'ch03_s02' }, pushState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(fn) { fn(); }, addEventListener() {} };
  globalThis.localStorage = { getItem() { return saved; }, setItem(_key, value) { saved = value; writes++; } };
  const { render } = await import('../src/app.js?ch03-s02-ui');
  const click = (action, data = {}) => events.click({ isTrusted: false, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  render();
  const html = node('#app').innerHTML;
  assert.match(html, /The Listening Room/);
  assert.match(html, /What word did you hear\?/);
  assert.match(html, /What does the customer mean\?/);
  assert.match(html, /First attempt: UNAIDED LISTENING/);
  assert.match(html, /data-action="play-voice" data-src="\.\/assets\/audio\/characters\/higgins\/higgins_ch03_scene02_001\.mp3"/);
  assert.match(html, /data-action="play-voice" data-src="\.\/assets\/audio\/characters\/eliza\/eliza_ch03_scene02_001\.mp3"/);
  assert.match(html, /data-action="play-challenge" data-src="\.\/assets\/audio\/challenges\/ch03\/lc06_three_flowers\.mp3" data-sample="lc06_sample_01"/);
  assert.match(html, /data-action="play-challenge" data-src="\.\/assets\/audio\/challenges\/ch03\/lc06_free_flowers\.mp3" data-sample="lc06_sample_02"/);
  assert.match(html, /I cannot hear this recording/);
  assert.doesNotMatch(html, /Spoken text:/);
  assert.doesNotMatch(html, /lc06-transcript|Spoken text:/);
  assert.match(html, /type="radio"/);
  const rendered = saved, renderWrites = writes;
  render();
  assert.equal(saved, rendered);
  assert.equal(writes, renderWrites);
  const initial = saved, count = writes;
  await click('play-challenge', { src: scene.challenge.samples[0].src, sample: scene.challenge.samples[0].id });
  await click('play-voice', { src: scene.voice[0].src });
  assert.equal(saved, initial, 'explicit replay cannot mutate progress');
  assert.equal(writes, count);
  await click('open-teacher');
  assert.equal((node('#teacher-content').innerHTML.match(/class="teacher-section"/g) || []).length, 12);
  assert.match(node('#teacher-context').textContent, /The Listening Room.*LC06.*previewMode=false/);
  await click('teacher-preview');
  await click('submit-lc06', { sample: 'lc06_sample_01' });
  await click('open-lc06-support');
  assert.equal(saved, initial);
  assert.equal(writes, count);
  await click('return-student');
  await click('lc06-cannot-hear');
  assert.match(node('#app').innerHTML, /Supported practice/);
  assert.match(node('#app').innerHTML, /I&#39;d like three flowers\./);
  assert.equal(JSON.parse(saved).challenges.lc06.supportUsed, true);
  const answers = [
    ['lc06_sample_01', 'lc06_word_three', 'lc06_meaning_three_flowers'],
    ['lc06_sample_02', 'lc06_word_free', 'lc06_meaning_no_payment']
  ];
  for (const [sample, word, meaning] of answers) {
    await click('select-lc06', { sample, kind: 'word', answer: word });
    await click('select-lc06', { sample, kind: 'meaning', answer: meaning });
    await click('submit-lc06', { sample });
  }
  assert.equal(JSON.parse(saved).challenges.lc06.completed, true);
  assert.equal(JSON.parse(saved).pronunciation, 0);
  await click('next-scene');
  assert.ok(JSON.parse(saved).applied_events.includes('ch03_s02_complete'));
  assert.equal(JSON.parse(saved).scene, 'ch03_s03');
  assert.equal(window.location.hash, '#ch03_s03');
  assert.match(node('#app').innerHTML, /Finding the Main Stress/);
  assert.match(node('#app').innerHTML, /Replay recording 1/);
  assert.match(node('#app').innerHTML, /lc07_customer\.mp3/);
  assert.doesNotMatch(node('#app').innerHTML, /The Flower Girl|The Bargain/);
});
