import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { CH03_SCENE_04, CH03_SCENE_05, CH03_S05_TEACHER_SECTIONS } from '../src/ch03-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import {
  completeScene, createInitialState, getSceneAdvanceBlock, markLc09SupportUsed, recordLc09Answer, setScene
} from '../src/state.js';

const ready = () => ({
  ...setScene(createInitialState(), 'ch03_s05'),
  started: true,
  applied_events: ['ch03_s01_complete', 'ch03_s02_complete', 'ch03_lc07_completed', 'ch03_s03_complete', 'ch03_lc08_completed', 'ch03_s04_complete']
});
const answer = (state, index, answerId) => recordLc09Answer(state, CH03_SCENE_05.challenge.samples[index].id, answerId);
const correctIds = ['lc09_pause_01', 'lc09_pause_02', 'lc09_pause_03'];

test('S05 registers exact canonical story, book-first LC09, reuse visuals, and twelve Teacher sections', () => {
  assert.equal(CH03_SCENE_05.id, 'ch03_s05');
  assert.equal(CH03_SCENE_05.visualStage, 'in_training');
  assert.equal(CH03_SCENE_05.nextScene, 'ch03_s06');
  assert.deepEqual(CH03_SCENE_05.background, CH03_SCENE_04.background);
  assert.deepEqual(CH03_SCENE_05.plate, CH03_SCENE_04.plate);
  assert.equal(CH03_SCENE_05.eliza.src, CH03_SCENE_04.eliza.src);
  assert.deepEqual(CH03_SCENE_05.supporting, CH03_SCENE_04.supporting);
  assert.equal(CH03_SCENE_05.voice.length, 5);
  assert.ok(CH03_SCENE_05.voice.every(({ src, generationId, voiceId, inline }) => src && generationId && voiceId && inline));
  assert.deepEqual(CH03_SCENE_05.voice.map(({ transcript }) => transcript), [
    "I did it well earlier. Why can't I do it now?",
    'You are tired. More force will not help.',
    'I can finish this page… before we stop.',
    'Good. Slower is not worse. It gives you room to hear yourself.',
    'I can get it back.'
  ]);
  assert.equal(CH03_SCENE_05.decision, undefined);
  assert.equal(CH03_SCENE_05.challenge.id, 'LC09');
  assert.equal(CH03_SCENE_05.challenge.intro, 'Choose the best place to pause so the sentence is easier to say.');
  assert.equal(CH03_SCENE_05.challenge.incorrectFeedback, 'Not quite. Try again, or use Supported Practice.');
  assert.equal(CH03_SCENE_05.challenge.supportedPracticePrompt, 'Listen for the place where the sentence can breathe.');
  assert.equal(CH03_SCENE_05.challenge.supportExplanation, 'Pause here. Say the first part, then continue with the second.');
  assert.deepEqual(CH03_SCENE_05.storyBeats.map(({ text }) => text), [
    'A few days later, the lesson has gone on too long. Eliza is tired.',
    'Try the sentence once more: ‘I can finish this page before we stop.’',
    'I can finish this page before we stop.',
    'You rushed the last part. Begin again.',
    "I did it well earlier. Why can't I do it now?",
    'You are tired. More force will not help.',
    'Then I need a moment. Let me start again.',
    'Good. Slower is not worse. It gives you room to hear yourself.',
    'I can finish this page… before we stop.',
    'Yes. Give each part its time.'
  ]);
  assert.deepEqual(CH03_SCENE_05.reflection.map(({ text }) => text), [
    'I can get it back.',
    'She has not made the sentence perfect. She has found a way back into it.'
  ]);
  assert.equal(CH03_S05_TEACHER_SECTIONS.length, 12);
  assert.match(CH03_S05_TEACHER_SECTIONS[6][1], /No main D-numbered decision in S05\./);
  assert.match(CH03_S05_TEACHER_SECTIONS[7][1], /When the lesson ends \| I will rest\./);
  assert.match(CH03_S05_TEACHER_SECTIONS[7][1], /If I slow my pace \| I can hear each word\./);
  assert.match(CH03_S05_TEACHER_SECTIONS[7][1], /I know the words \| but I need a moment\./);
  assert.match(CH03_S05_TEACHER_SECTIONS[10][1], /read-only/);
  assert.equal(ambienceForScene('ch03_s05'), 'ch03_lesson_room');
  assert.equal(isContinuousAmbienceTransition('ch03_s04', 'ch03_s05'), true);
});

test('LC09 has the exact three items, options, stable correct IDs, and approved audio references', () => {
  const samples = CH03_SCENE_05.challenge.samples;
  assert.deepEqual(samples.map(({ id, sentence, answer, answerAfter, key, options }) => ({ id, sentence, answer, answerAfter, key, options })), [
    { id: 'lc09_sample_01', sentence: 'When the lesson ends I will rest.', answer: 'lc09_pause_01', answerAfter: 'ends', key: 'When the lesson ends | I will rest.', options: ['lc09_01_after_when', 'lc09_01_after_the', 'lc09_01_after_lesson', 'lc09_pause_01', 'lc09_01_after_i', 'lc09_01_after_will'] },
    { id: 'lc09_sample_02', sentence: 'If I slow my pace I can hear each word.', answer: 'lc09_pause_02', answerAfter: 'pace', key: 'If I slow my pace | I can hear each word.', options: ['lc09_02_after_if', 'lc09_02_after_first_i', 'lc09_02_after_slow', 'lc09_02_after_my', 'lc09_pause_02', 'lc09_02_after_second_i', 'lc09_02_after_can', 'lc09_02_after_hear', 'lc09_02_after_each'] },
    { id: 'lc09_sample_03', sentence: 'I know the words but I need a moment.', answer: 'lc09_pause_03', answerAfter: 'words', key: 'I know the words | but I need a moment.', options: ['lc09_03_after_first_i', 'lc09_03_after_know', 'lc09_03_after_the', 'lc09_pause_03', 'lc09_03_after_but', 'lc09_03_after_second_i', 'lc09_03_after_need', 'lc09_03_after_a'] }
  ]);
  assert.deepEqual(samples.map(({ src, generationId, voiceId, transcript }) => ({ src, generationId, voiceId, transcript })), [
    { src: './assets/audio/challenges/ch03/lc09_lesson_ends.mp3', generationId: 'Ue2V0w0Q5yGEu2Dy17Dn', voiceId: 'JlptfLxaUpd8pZcw9dKd', transcript: 'When the lesson ends I will rest.' },
    { src: './assets/audio/challenges/ch03/lc09_slow_my_pace.mp3', generationId: '4intscAdWnqpAyJDfieA', voiceId: 'JlptfLxaUpd8pZcw9dKd', transcript: 'If I slow my pace I can hear each word.' },
    { src: './assets/audio/challenges/ch03/lc09_need_a_moment.mp3', generationId: 'zQcI8ajUgqVAh7DnWD7k', voiceId: 'JlptfLxaUpd8pZcw9dKd', transcript: 'I know the words but I need a moment.' }
  ]);
  for (const item of [...CH03_SCENE_05.voice, ...samples]) {
    const file = item.src.replace(/^\.\//, '');
    const bytes = fs.readFileSync(new URL(`../${file}`, import.meta.url));
    assert.ok(bytes.length > 1000, file);
    assert.equal(bytes.toString('ascii', 0, 3), 'ID3', file);
  }
});

test('all eight S05 files are the approved byte-preserved MPEG assets at their mapped durations', () => {
  const expected = [
    ['assets/audio/characters/eliza/eliza_ch03_scene05_001.mp3', 64399, 2.93, '442DFF31966396ED1BCC7F0C00C5478A780419F14E01E5495C57DDB950362AC2'],
    ['assets/audio/characters/higgins/higgins_ch03_scene05_001.mp3', 57712, 2.51, '296662A9DE00D72B607B61D4D1E0CA3EFBD9C7E15C68A262659A034168DFADEA'],
    ['assets/audio/characters/eliza/eliza_ch03_scene05_002.mp3', 68161, 3.16, '547E4A6AB3AE9DE16CDF0A1D515C38E1C13570CF556CA089A8D68E8A3332A90D'],
    ['assets/audio/characters/higgins/higgins_ch03_scene05_002.mp3', 88641, 4.44, '986E152B634162948450FFAD4277AAA024FA3193A3A455AB106171EC4AD576A4'],
    ['assets/audio/characters/eliza/eliza_ch03_scene05_003.mp3', 35978, 1.15, '4C161E21D0CE14251CCE4CB37BD7374B09280AC2CDFA2077813154F20A85F4C5'],
    ['assets/audio/challenges/ch03/lc09_lesson_ends.mp3', 53950, 2.27, 'FAF67ECC1D94D4DBA43DA883E9390FC3196BA695E95DF599E817D93AA2E0DCB8'],
    ['assets/audio/challenges/ch03/lc09_slow_my_pace.mp3', 66907, 3.08, '04469466F976C27BEA11AF193E6EEA0EA33A68AB84ECB83F16CEF7D15476B620'],
    ['assets/audio/challenges/ch03/lc09_need_a_moment.mp3', 56458, 2.43, '31763CFCA4B00DAC0C7393D081BC1E9B56BB99C35E095ED256E002FFDD73040B']
  ];
  const bitrateKbps = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
  for (const [relativePath, expectedBytes, expectedDuration, sha256] of expected) {
    const bytes = fs.readFileSync(new URL(`../${relativePath}`, import.meta.url));
    assert.equal(bytes.length, expectedBytes, relativePath);
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex').toUpperCase(), sha256, relativePath);
    assert.equal(bytes.toString('ascii', 0, 3), 'ID3', relativePath);
    let offset = 10 + (((bytes[6] & 0x7f) << 21) | ((bytes[7] & 0x7f) << 14) | ((bytes[8] & 0x7f) << 7) | (bytes[9] & 0x7f)) + ((bytes[5] & 0x10) ? 10 : 0);
    let frames = 0;
    while (offset + 4 <= bytes.length) {
      assert.equal(bytes[offset], 0xff, `${relativePath}: sync @${offset}`);
      const header = bytes.readUInt32BE(offset);
      assert.equal((header >>> 19) & 0x3, 3, relativePath);
      assert.equal((header >>> 17) & 0x3, 1, relativePath);
      const bitrateIndex = (header >>> 12) & 0xf, sampleRateIndex = (header >>> 10) & 0x3, padding = (header >>> 9) & 1;
      assert.equal(sampleRateIndex, 0, relativePath);
      assert.ok(bitrateIndex > 0 && bitrateIndex < 15, relativePath);
      offset += Math.floor(144 * bitrateKbps[bitrateIndex] * 1000 / 44100) + padding;
      frames++;
    }
    assert.equal(offset, bytes.length, `${relativePath}: no truncated frame or trailing payload`);
    assert.ok(Math.abs(frames * 1152 / 44100 - expectedDuration) < 0.05, relativePath);
  }
});

test('LC09 retries wrong answers, preserves correct answers, rewards unaided completion once, and completes only on Continue', () => {
  let state = ready();
  assert.ok(getSceneAdvanceBlock(state, CH03_SCENE_05), 'challenge completion is required before Continue');
  assert.equal(completeScene(state, CH03_SCENE_05), state, 'opening the scene cannot complete it');
  assert.equal(answer(state, 0, 'unknown-answer'), state);
  state = answer(state, 0, 'lc09_01_after_when');
  state = answer(state, 0, correctIds[0]);
  assert.equal(state.challenges.lc09.answers.lc09_sample_01.correct, true);
  assert.equal(answer(state, 0, 'lc09_01_after_when'), state, 'correct item stays frozen');
  state = answer(state, 1, correctIds[1]);
  state = answer(state, 2, correctIds[2]);
  assert.equal(state.challenges.lc09.completed, true);
  assert.equal(state.pronunciation, 1);
  assert.equal(state.confidence, 0);
  assert.deepEqual(state.challenges.lc09.supportSamples, []);
  assert.equal(state.applied_events.filter((event) => event === 'ch03_lc09_completed').length, 1);
  assert.equal(state.applied_events.includes('ch03_s05_complete'), false);
  assert.equal(getSceneAdvanceBlock(state, CH03_SCENE_05), '');
  const completed = completeScene(state, CH03_SCENE_05);
  assert.ok(completed.applied_events.includes('ch03_s05_complete'));
  assert.equal(completeScene(completed, CH03_SCENE_05), completed, 'scene completion event is idempotent');
  assert.equal(completed.confidence, 0);
  for (const forbidden of ['fatigue_seen', 'bad_day_seen', 'pace_controlled', 'repair_learned', 'lesson_pace_reset']) assert.equal(forbidden in completed, false);
});

test('opening support reveals only its item and removes the reward without blocking completion', () => {
  let state = answer(ready(), 0, 'lc09_01_after_when');
  state = markLc09SupportUsed(state, 'lc09_sample_01');
  assert.equal(state.challenges.lc09.supportUsed, true);
  assert.deepEqual(state.challenges.lc09.supportSamples, ['lc09_sample_01']);
  assert.equal(markLc09SupportUsed(state, 'lc09_sample_01'), state);
  state = answer(state, 0, correctIds[0]);
  state = answer(state, 1, correctIds[1]);
  state = answer(state, 2, correctIds[2]);
  assert.equal(state.challenges.lc09.completed, true);
  assert.equal(state.pronunciation, 0);
  assert.equal(state.confidence, 0);
  assert.equal(state.applied_events.filter((event) => event === 'ch03_lc09_completed').length, 1);
});

test('S05 renders approved story and LC09 replay without answer leakage; playback and Teacher preview are read-only', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage', 'Audio'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; });
  const nodes = new Map(), events = {};
  class FakeAudio {
    constructor(src) { this.src = src; this.paused = true; this.volume = 1; this.muted = false; this.listeners = new Map(); }
    play() { this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
    addEventListener(name, fn) { this.listeners.set(name, fn); }
    removeEventListener(name) { this.listeners.delete(name); }
  }
  let saved = JSON.stringify(ready()), writes = 0;
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  globalThis.Audio = FakeAudio;
  globalThis.window = { location: { hash: '#ch03_s05', pathname: '/' }, history: { state: { scene: 'ch03_s05' }, pushState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(fn) { fn(); }, addEventListener() {} };
  globalThis.localStorage = { getItem() { return saved; }, setItem(_key, value) { saved = value; writes++; } };
  const { render } = await import('../src/app.js?ch03-s05-ui');
  const click = (action, data = {}) => events.click({ isTrusted: false, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  render();
  let html = node('#app').innerHTML;
  assert.match(html, /The Bad Day/);
  assert.match(html, /Choose the best place to pause so the sentence is easier to say\./);
  const lc09 = html.slice(html.indexOf('<section class="challenge-block lc09-block"'), html.indexOf('</section>', html.indexOf('<section class="challenge-block lc09-block"')) + 10);
  for (const sentence of ['When the lesson ends I will rest.', 'If I slow my pace I can hear each word.', 'I know the words but I need a moment.']) assert.ok(lc09.includes(sentence));
  assert.equal((lc09.match(/class="lc09-split-point"/g) || []).length, 23);
  assert.doesNotMatch(lc09, /\||\.\.\.|,/);
  assert.equal((html.match(/data-action="play-voice"/g) || []).length, 4);
  assert.equal((html.match(/data-action="play-challenge"/g) || []).length, 3);
  assert.match(html, /Replay sentence 1/);
  assert.match(html, /Replay sentence 2/);
  assert.match(html, /Replay sentence 3/);
  const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.lc09-split-point:hover:not\(:disabled\) \{ border-color: rgba\(124, 63, 77, \.2\); background: rgba\(255, 252, 247, \.38\); color: inherit; \}/);
  assert.match(css, /\.lc09-split-point:focus-visible/);

  await click('open-teacher');
  assert.equal((node('#teacher-content').innerHTML.match(/class="teacher-section"/g) || []).length, 12);
  assert.match(node('#teacher-content').innerHTML, /No main D-numbered decision in S05/);
  const beforePreview = saved, beforeWrites = writes;
  await click('play-challenge', { src: CH03_SCENE_05.challenge.samples[0].src, sample: 'lc09_sample_01' });
  await click('play-voice', { src: CH03_SCENE_05.voice[0].src });
  assert.equal(saved, beforePreview, 'audio replay cannot mutate progress');
  assert.equal(writes, beforeWrites);
  await click('teacher-preview');
  await click('answer-lc09', { sample: 'lc09_sample_01', answer: 'lc09_pause_01' });
  await click('open-lc09-support', { sample: 'lc09_sample_01' });
  assert.equal(saved, beforePreview);
  assert.equal(writes, beforeWrites);
  await click('return-student');

  await click('answer-lc09', { sample: 'lc09_sample_01', answer: 'lc09_01_after_when' });
  html = node('#app').innerHTML;
  assert.match(html, /Not quite\. Try again, or use Supported Practice\./);
  assert.match(html, /Listen for the place where the sentence can breathe\./);
  assert.doesNotMatch(html, /Pause here\. Say the first part/);
  await click('open-lc09-support', { sample: 'lc09_sample_01' });
  html = node('#app').innerHTML;
  assert.match(html, /Pause here\. Say the first part, then continue with the second\./);
  assert.match(html, /When the lesson ends \| I will rest\./);
  assert.doesNotMatch(html, /If I slow my pace \|/);
  assert.doesNotMatch(html, /I know the words \|/);
});
