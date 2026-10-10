import test from 'node:test';
import { SAVE_KEY, savedProgress, readSavedProgress } from './progress-test-helpers.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { CH03_SCENE_06, CH03_S06_TEACHER_SECTIONS } from '../src/ch03-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import {
  completeScene, createInitialState, getSceneAdvanceBlock, loadState, markLc10SupportUsed, recordLc10Answer,
  recordLc10NoAudio, saveState, setScene
} from '../src/state.js';

const ready = () => ({
  ...setScene(createInitialState(), 'ch03_s06'),
  started: true,
  applied_events: ['ch03_s01_complete', 'ch03_s02_complete', 'ch03_s03_complete', 'ch03_s04_complete', 'ch03_s05_complete']
});
const answer = (state, index, answerId) => recordLc10Answer(state, CH03_SCENE_06.challenge.samples[index].id, answerId);
const correctIds = ['lc10_01_three', 'lc10_02_green', 'lc10_03_after_door'];

test('S06 registers exact twelve-line BOOK FIRST story, transition, reused visuals, and twelve Teacher sections', () => {
  assert.equal(CH03_SCENE_06.id, 'ch03_s06');
  assert.equal(CH03_SCENE_06.title, 'A Small Victory');
  assert.equal(CH03_SCENE_06.chapter, 'III');
  assert.equal(CH03_SCENE_06.visualStage, 'in_training');
  assert.equal(CH03_SCENE_06.nextScene, 'ch04_s01');
  assert.equal(CH03_SCENE_06.decision, undefined);
  assert.equal(CH03_SCENE_06.choices, undefined, 'S06 adds no microchoice');
  assert.equal(CH03_SCENE_06.storyBeats.length + CH03_SCENE_06.reflection.length, 12);
  assert.equal(CH03_SCENE_06.background.src, './assets/images/locations/ch02/ch02_higgins-study.webp');
  assert.equal(CH03_SCENE_06.eliza.src, './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png');
  assert.equal(CH03_SCENE_06.supporting[0].src, './assets/images/characters/higgins/runtime/higgins_master_cutout.png');
  assert.deepEqual(CH03_SCENE_06.voice.map(({ id, transcript }) => [id, transcript]), [
    ['AM31', 'That came too quickly. Let me try again.'], ['AM32', 'You heard it before I spoke.']
  ]);
  assert.deepEqual(CH03_SCENE_06.storyBeats.map(({ speaker, text }) => [speaker || 'Narration', text]), [
    ['Narration', 'The lesson is nearly over. Mrs Pearce is in the next room.'],
    ['Higgins', 'Would you ask Mrs Pearce to bring the blue book, please?'],
    ['Eliza', 'Mrs Pearce, could you bring the blue book—'],
    ['Narration', 'Eliza hears the rush in her own words and stops.'],
    ['Eliza', 'That came too quickly. Let me try again.'],
    ['Eliza', 'Mrs Pearce, could you bring the blue book, please?'],
    ['Mrs Pearce', 'Of course, Miss Eliza.'],
    ['Eliza', 'Thank you.'],
    ['Higgins', 'You heard it before I spoke.'],
    ['Eliza', 'I did.']
  ]);
  assert.deepEqual(CH03_SCENE_06.reflection.map(({ speaker, text }) => [speaker || 'Narration', text]), [
    ['Eliza', 'I can hear it myself.'], ['Narration', 'The lesson is over. The learning is not.']
  ]);
  assert.equal(CH03_S06_TEACHER_SECTIONS.length, 12);
  assert.match(CH03_S06_TEACHER_SECTIONS[6][1], /no D-numbered decision/);
  assert.match(CH03_S06_TEACHER_SECTIONS[5][1], /Chapter III Conscious Training/);
  assert.match(CH03_S06_TEACHER_SECTIONS[5][1], /first movement toward Chapter IV Emerging New Speech/);
  assert.match(CH03_S06_TEACHER_SECTIONS[10][1], /Teacher preview and replay must not alter student state/);
  assert.match(CH03_S06_TEACHER_SECTIONS[11][1], /ch04_s01 – The Invitation/);
  assert.equal(ambienceForScene('ch03_s06'), 'ch03_lesson_room');
  assert.equal(isContinuousAmbienceTransition('ch03_s05', 'ch03_s06'), true);
});

test('LC10 uses exact instruction, three sample IDs, options, answer mapping, and audio metadata', () => {
  const challenge = CH03_SCENE_06.challenge;
  assert.equal(challenge.id, 'LC10');
  assert.equal(challenge.intro, "Listen to Eliza's first try and her repair. Choose the message she settles on.");
  assert.equal(challenge.incorrectFeedback, 'Not quite. Listen for what Eliza changes, then try again or open Supported Practice.');
  assert.equal(challenge.supportedPracticePrompt, 'Listen once more. What does Eliza mean to say?');
  assert.deepEqual(challenge.samples.map(({ accessiblePrompt }) => accessiblePrompt), [
    "Mrs Pearce has set aside one book for each of the lesson's three sections. Eliza is asking for the set, not asking that it cost nothing.",
    'Higgins offers two books. Eliza wants the one whose cover matches fresh leaves, not both books.',
    'Mrs Pearce asks about the parcel. Eliza wants it left at the entrance, once the lesson has ended.'
  ]);
  assert.deepEqual(challenge.samples.map(({ id, transcript, answer, options, support, src, generationId, voiceId }) => ({ id, transcript, answer, options, support, src, generationId, voiceId })), [
    { id: 'lc10_sample_01', transcript: 'Free books—no, three books, please.', answer: 'lc10_01_three', options: [
      { id: 'lc10_01_three', label: 'She wants three books.' }, { id: 'lc10_01_free', label: 'She wants books at no cost.' }, { id: 'lc10_01_flowers', label: 'She wants three flowers.' }
    ], support: 'She means three books, not free books.', src: './assets/audio/challenges/ch03/lc10_three_books.mp3', generationId: 'v2gdewakrrLYUO3Psmcx', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'lc10_sample_02', transcript: 'The blue book—no, the green one, please.', answer: 'lc10_02_green', options: [
      { id: 'lc10_02_green', label: 'She wants the green book.' }, { id: 'lc10_02_blue', label: 'She wants the blue book.' }, { id: 'lc10_02_either', label: 'She would like either book.' }
    ], support: 'She means the green book, not the blue one.', src: './assets/audio/challenges/ch03/lc10_green_book.mp3', generationId: 'WIWxgxtTfjK0d2b23h6f', voiceId: '124kaYCknTDsnwUFdWl9' },
    { id: 'lc10_sample_03', transcript: 'Leave it by the door—no, after the lesson, please leave the parcel by the door.', answer: 'lc10_03_after_door', options: [
      { id: 'lc10_03_after_door', label: 'Leave the parcel by the door after the lesson.' }, { id: 'lc10_03_before_door', label: 'Leave the parcel by the door before the lesson.' }, { id: 'lc10_03_during_table', label: 'Leave the parcel on the table during the lesson.' }
    ], support: 'She wants the parcel left by the door after the lesson.', src: './assets/audio/challenges/ch03/lc10_after_lesson.mp3', generationId: '6a8SiHtyM6HZzOZ9f9sk', voiceId: '124kaYCknTDsnwUFdWl9' }
  ]);
});

test('LC10 retry, support reveal, supported completion and unaided reward are idempotent', () => {
  let state = ready();
  assert.equal(getSceneAdvanceBlock(state, CH03_SCENE_06), 'Complete the listening challenge to continue.');
  assert.equal(completeScene(state, CH03_SCENE_06), state, 'scene render cannot complete S06');
  assert.equal(answer(state, 0, 'unknown'), state);
  state = answer(state, 0, 'lc10_01_free');
  assert.equal(state.challenges.lc10.firstAttempt, true);
  assert.equal(state.challenges.lc10.answers.lc10_sample_01.correct, false);
  assert.equal(state.challenges.lc10.completed, false);
  state = answer(state, 0, correctIds[0]);
  assert.equal(state.challenges.lc10.answers.lc10_sample_01.correct, true);
  assert.equal(answer(state, 0, 'lc10_01_free'), state, 'solved item stays frozen');
  state = answer(state, 1, correctIds[1]);
  state = answer(state, 2, correctIds[2]);
  assert.equal(state.challenges.lc10.completed, true);
  assert.equal(answer(state, 2, 'lc10_03_after_door'), state, 'completed challenge cannot be replay-rewarded');
  assert.equal(state.pronunciation, 1);
  assert.equal(state.confidence, 0);
  assert.equal(state.independence, 0);
  assert.equal(state.applied_events.filter((event) => event === 'ch03_lc10_completed').length, 1);
  assert.equal(state.applied_events.includes('ch03_s06_complete'), false);
  assert.equal(getSceneAdvanceBlock(state, CH03_SCENE_06), '');
  const continued = completeScene(state, CH03_SCENE_06);
  assert.equal(continued.applied_events.filter((event) => event === 'ch03_s06_complete').length, 1);
  assert.equal(completeScene(continued, CH03_SCENE_06), continued, 'Continue completion event is idempotent');
  assert.equal(continued.pronunciation, 1);
  assert.equal(continued.confidence, 0);
  assert.equal(continued.independence, 0);
  assert.equal('lesson_progress_snapshot' in continued, false);
  for (const forbidden of ['self_correction_seen', 'victory_seen', 'chapter3_mastered', 'speech_transformed', 'eliza_fixed']) assert.equal(forbidden in continued, false);
});

test('opening LC10 support after an incorrect answer reveals only its sample and permanently removes reward', () => {
  let state = answer(ready(), 0, 'lc10_01_free');
  state = markLc10SupportUsed(state, 'lc10_sample_02');
  assert.equal(state.challenges.lc10.supportUsed, false, 'support cannot open before an incorrect response on that item');
  state = markLc10SupportUsed(state, 'lc10_sample_01');
  assert.equal(state.challenges.lc10.supportUsed, true);
  assert.deepEqual(state.challenges.lc10.supportSamples, ['lc10_sample_01']);
  assert.equal(markLc10SupportUsed(state, 'lc10_sample_01'), state);
  state = answer(state, 0, correctIds[0]);
  state = answer(state, 1, correctIds[1]);
  state = answer(state, 2, correctIds[2]);
  assert.equal(state.challenges.lc10.completed, true);
  assert.equal(state.pronunciation, 0);
  assert.equal(state.confidence, 0);
  assert.equal(state.independence, 0);
  assert.equal(state.applied_events.filter((event) => event === 'ch03_lc10_completed').length, 1);
});

test('LC10 no-audio alternative records an unresolved supported attempt and completes with identical state semantics', () => {
  let state = ready();
  const baseline = [state.pronunciation, state.confidence, state.independence];
  const storage = new Map();
  for (const [index, sample] of CH03_SCENE_06.challenge.samples.entries()) {
    const before = state;
    state = recordLc10NoAudio(state, sample.id);
    assert.notEqual(state, before, `${sample.id} opens the no-audio route`);
    assert.equal(state.challenges.lc10.answers[sample.id], undefined, 'no answer or correctness is fabricated');
    assert.equal(state.challenges.lc10.attempts, index * 2 + 1);
    assert.equal(state.challenges.lc10.firstAttempt, true);
    assert.equal(state.challenges.lc10.supportUsed, true);
    assert.deepEqual(state.challenges.lc10.noAudioSamples, CH03_SCENE_06.challenge.samples.slice(0, index + 1).map(({ id }) => id));
    assert.equal(recordLc10NoAudio(state, sample.id), state, 'the unresolved attempt cannot be repeated to farm state');
    saveState(state, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
    state = loadState({ getItem: (key) => storage.get(key) });
    state = answer(state, index, correctIds[index]);
  }
  assert.equal(state.challenges.lc10.completed, true);
  assert.equal(state.applied_events.filter((event) => event === 'ch03_lc10_completed').length, 1);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], baseline, 'supported route has no reward or penalty');
  assert.equal(getSceneAdvanceBlock(state, CH03_SCENE_06), '');
  const continued = completeScene(state, CH03_SCENE_06);
  assert.equal(continued.applied_events.filter((event) => event === 'ch03_s06_complete').length, 1);
  assert.equal(recordLc10NoAudio(continued, 'lc10_sample_01'), continued);
});

test('S06 audio metadata matches approved assets and all five files exist', () => {
  const story = [
    ['AM31', 'That came too quickly. Let me try again.', './assets/audio/characters/eliza/eliza_ch03_scene06_001.mp3', 'QqV9Q0ILukD0XTk9tsj6', '124kaYCknTDsnwUFdWl9'],
    ['AM32', 'You heard it before I spoke.', './assets/audio/characters/higgins/higgins_ch03_scene06_001.mp3', 'YNOGrtkTR0htvWu6hfSu', 'JlptfLxaUpd8pZcw9dKd']
  ];
  assert.deepEqual(CH03_SCENE_06.voice.map(({ id, transcript, src, generationId, voiceId }) => [id, transcript, src, generationId, voiceId]), story);
  assert.deepEqual(CH03_SCENE_06.voice.map(({ transcript }) => CH03_SCENE_06.storyBeats.some(({ text }) => text === transcript)), [true, true]);
  const samples = [
    ['lc10_sample_01', 'Free books—no, three books, please.', './assets/audio/challenges/ch03/lc10_three_books.mp3', 'v2gdewakrrLYUO3Psmcx', '124kaYCknTDsnwUFdWl9'],
    ['lc10_sample_02', 'The blue book—no, the green one, please.', './assets/audio/challenges/ch03/lc10_green_book.mp3', 'WIWxgxtTfjK0d2b23h6f', '124kaYCknTDsnwUFdWl9'],
    ['lc10_sample_03', 'Leave it by the door—no, after the lesson, please leave the parcel by the door.', './assets/audio/challenges/ch03/lc10_after_lesson.mp3', '6a8SiHtyM6HZzOZ9f9sk', '124kaYCknTDsnwUFdWl9']
  ];
  assert.deepEqual(CH03_SCENE_06.challenge.samples.map(({ id, transcript, src, generationId, voiceId }) => [id, transcript, src, generationId, voiceId]), samples);
  for (const [, , src] of [...story, ...samples]) {
    const bytes = fs.readFileSync(new URL(`..${src.slice(1)}`, import.meta.url));
    assert.ok(bytes.length > 1000, `${src} exists`);
    assert.equal(bytes.subarray(0, 3).toString('ascii'), 'ID3', `${src} retains its MP3 ID3 header`);
  }
  assert.equal(CH03_SCENE_06.voice.some(({ transcript }) => /Mrs Pearce/.test(transcript)), false);
});

test('S06 UI hides all transcripts initially, uses neutral controls, and Teacher Mode is read-only', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage', 'Audio'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; });
  const nodes = new Map(), events = {};
  class FakeAudio {
    constructor(src) { this.src = src; this.paused = true; this.volume = 1; this.muted = false; this.listeners = new Map(); FakeAudio.instances.push(this); }
    play() { this.paused = false; FakeAudio.played.push(this.src); return Promise.resolve(); }
    pause() { this.paused = true; }
    addEventListener(name, fn) { this.listeners.set(name, fn); }
    removeEventListener(name) { this.listeners.delete(name); }
  }
  FakeAudio.instances = [];
  FakeAudio.played = [];
  let saved = savedProgress(ready()), writes = 0;
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  globalThis.Audio = FakeAudio;
  globalThis.window = { location: { hash: '#ch03_s06', pathname: '/' }, history: { state: { scene: 'ch03_s06' }, pushState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(fn) { fn(); }, addEventListener() {} };
  globalThis.localStorage = { getItem() { return saved; }, setItem(_key, value) { saved = value; writes++; } };
  const { render } = await import('../src/app.js?ch03-s06-ui');
  const click = (action, data = {}) => events.click({ isTrusted: action === 'play-challenge' || action === 'play-voice', target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  render();
  let html = node('#app').innerHTML;
  assert.match(html, /A Small Victory/);
  assert.match(html, /LC10/);
  assert.equal((html.match(/data-action="answer-lc10"/g) || []).length, 9);
  assert.equal((html.match(/aria-pressed="false"/g) || []).length, 9);
  assert.doesNotMatch(html, /class="answer-button lc10-answer selected"|aria-pressed="true"/);
  assert.equal((html.match(/aria-label="Replay sample \d"/g) || []).length, 3);
  assert.equal((html.match(/data-action="play-challenge"/g) || []).length, 3);
  assert.equal((html.match(/data-action="lc10-cannot-hear"/g) || []).length, 3, 'no-audio alternative is discoverable for every unresolved item');
  assert.doesNotMatch(html, /Text alternative:|Mrs Pearce has set aside one book/);
  assert.doesNotMatch(html, /Mrs Pearce (?:is )?counting three books|Mrs Pearce counts three books/i, 'learner UI must not show sample-1 situation text');
  assert.doesNotMatch(html, /Free books—no, three books, please\.|The blue book—no, the green one, please\.|Leave it by the door—no, after the lesson/);
  assert.doesNotMatch(html, /I can hear it myself\.|The lesson is over\. The learning is not\./);
  for (const item of [...CH03_SCENE_06.voice, ...CH03_SCENE_06.challenge.samples]) assert.ok(html.includes(`data-src="${item.src}"`), item.src);
  const answerMarkup = [...html.matchAll(/<button class="answer-button lc10-answer[^>]*>[\s\S]*?<\/button>/g)].map(([button]) => button);
  assert.equal(answerMarkup.length, 9);
  assert.equal(answerMarkup.every((button) => !/<(?:strong|b|em|i)\b|aria-pressed="true"|class="[^"]*selected/.test(button)), true);
  assert.doesNotMatch(html, /LC10 complete|data-action="next-scene"/, 'Continue is unavailable before LC10 is complete');
  const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.lc10-answer\.answer-button:hover, \.lc10-answer\.answer-button\.selected \{ color: #55484d; background: #fffaf3; border-color: rgba\(124, 63, 77, \.18\); \}/);
  assert.match(css, /\.lc10-answer\.answer-button:focus-visible \{ outline: 3px solid #e1ae59; outline-offset: 3px; \}/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  const runtime = fs.readFileSync(new URL('../src/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(runtime, /speechSynthesis|SpeechSynthesis/);
  assert.match(runtime, /scene\.id === 'ch03_s06'[\s\S]*?audioManager\.mix = CH02_AUDIO_MIX/);

  const beforeReplayState = saved, beforeReplayWrites = writes;
  await click('play-challenge', { sample: 'lc10_sample_01', src: CH03_SCENE_06.challenge.samples[0].src });
  assert.ok(FakeAudio.played.includes(CH03_SCENE_06.challenge.samples[0].src), 'Replay plays its mapped LC10 asset');
  assert.equal(saved, beforeReplayState, 'audio replay leaves all LC10 state unchanged');
  assert.equal(writes, beforeReplayWrites, 'audio replay does not persist state');
  await click('toggle-sound');
  const soundOffPlayCount = FakeAudio.played.length;
  await click('play-challenge', { sample: 'lc10_sample_02', src: CH03_SCENE_06.challenge.samples[1].src });
  assert.equal(FakeAudio.played.length, soundOffPlayCount, 'Sound Off prevents foreground playback');
  await click('lc10-cannot-hear', { sample: 'lc10_sample_02' });
  html = node('#app').innerHTML;
  assert.match(html, /Text alternative:<\/strong> Higgins offers two books/);
  assert.equal((html.match(/data-action="lc10-cannot-hear"/g) || []).length, 2, 'only the used sample hides its no-audio trigger');
  assert.doesNotMatch(html, /The blue book—no, the green one, please\.|She means the green book, not the blue one\./, 'accessible input does not disclose the recording transcript or answer explanation');
  assert.doesNotMatch(html, /aria-pressed="true"/);
  let afterNoAudio = readSavedProgress(saved);
  assert.equal(afterNoAudio.challenges.lc10.answers.lc10_sample_02, undefined, 'no-audio route records no fabricated answer');
  assert.deepEqual(afterNoAudio.challenges.lc10.noAudioSamples, ['lc10_sample_02']);
  assert.equal(afterNoAudio.challenges.lc10.supportUsed, true);
  await click('toggle-sound');
  await click('play-voice', { src: CH03_SCENE_06.voice[0].src });
  assert.ok(FakeAudio.played.includes(CH03_SCENE_06.voice[0].src), 'Sound On restores story playback');
  assert.equal(FakeAudio.instances.filter(({ src }) => src === CH03_SCENE_06.challenge.samples[0].src).length, 1);
  assert.equal(FakeAudio.instances.find(({ src }) => src === CH03_SCENE_06.challenge.samples[0].src).paused, true, 'new foreground playback stops the previous clip');

  await click('open-teacher');
  const beforePreview = saved, beforeWrites = writes;
  assert.equal((node('#teacher-content').innerHTML.match(/class="teacher-section"/g) || []).length, 12);
  assert.match(node('#teacher-content').innerHTML, /no D-numbered decision/);
  assert.match(node('#teacher-content').innerHTML, /Mrs Pearce remains text-only|next room/i);
  await click('teacher-preview');
  await click('answer-lc10', { sample: 'lc10_sample_01', answer: 'lc10_01_three' });
  await click('open-lc10-support', { sample: 'lc10_sample_01' });
  assert.equal(saved, beforePreview);
  assert.equal(writes, beforeWrites);
  await click('return-student');
  await click('answer-lc10', { sample: 'lc10_sample_01', answer: 'lc10_01_free' });
  html = node('#app').innerHTML;
  assert.match(html, /Not quite\. Listen for what Eliza changes, then try again or open Supported Practice\./);
  assert.match(html, /Listen once more\. What does Eliza mean to say\?/);
  assert.doesNotMatch(html, /Spoken text:.*Free books—no, three books, please\./);
  await click('open-lc10-support', { sample: 'lc10_sample_01' });
  html = node('#app').innerHTML;
  assert.match(html, /Spoken text: “Free books—no, three books, please\.”/);
  assert.match(html, /She means three books, not free books\./);
  assert.doesNotMatch(html, /The blue book—no, the green one/);
  await click('answer-lc10', { sample: 'lc10_sample_01', answer: correctIds[0] });
  await click('answer-lc10', { sample: 'lc10_sample_02', answer: correctIds[1] });
  html = node('#app').innerHTML;
  assert.doesNotMatch(html, /I can hear it myself\.|The lesson is over\. The learning is not\./);
  await click('answer-lc10', { sample: 'lc10_sample_03', answer: correctIds[2] });
  html = node('#app').innerHTML;
  assert.match(html, /I can hear it myself\./);
  assert.match(html, /The lesson is over\. The learning is not\./);
  assert.match(html, /data-action="next-scene"/);
  let finalState = readSavedProgress(saved);
  assert.equal(finalState.pronunciation, 0, 'opened target-revealing support cancels reward');
  assert.equal(finalState.challenges.lc10.completed, true);
  assert.equal(finalState.applied_events.filter((event) => event === 'ch03_lc10_completed').length, 1);
  await click('next-scene');
  html = node('#app').innerHTML;
  finalState = readSavedProgress(saved);
  assert.equal(window.location.hash, '#ch03_s06', 'Chapter III keeps its own completed checkpoint until the reader chooses the next chapter');
  assert.equal(finalState.scene, 'ch03_s06');
  assert.equal(finalState.applied_events.filter((event) => event === 'ch03_s06_complete').length, 1);
  assert.match(html, /Continue to Chapter IV/);
  await click('continue-next-chapter');
  finalState = readSavedProgress(saved);
  assert.equal(window.location.hash, '#ch04_s01');
  assert.equal(finalState.scene, 'ch04_s01');
  assert.match(node('#app').innerHTML, /The Invitation/);
  assert.equal(FakeAudio.instances.filter((audio) => !audio.src.includes('ch03_higgins_house_lesson_ambient.mp3')).every((audio) => audio.paused), true, 'scene transition cleans up all foreground and one-shot audio');
  assert.equal(FakeAudio.instances.some((audio) => audio.src.includes('ch03_higgins_house_lesson_ambient.mp3') && !audio.paused), true, 'Chapter IV reuses the Chapter III lesson-room ambience loop');
});

test('scene entry requires S05 completion and Mrs Pearce remains off-screen and text-only', () => {
  const blocked = getSceneAdvanceBlock({ ...ready(), applied_events: ['ch03_s04_complete'] }, CH03_SCENE_06);
  assert.equal(blocked, 'Complete Chapter III Scene 05 before opening A Small Victory.');
  assert.equal(CH03_SCENE_06.supporting.some(({ alt, src }) => /pearce/i.test(`${alt} ${src}`)), false);
  assert.equal(CH03_SCENE_06.voice.some(({ transcript }) => /Mrs Pearce/.test(transcript)), false);
});

test('S06 audio canon maps two story lines and three LC10 samples to five local assets', () => {
  const expectedStory = [
    ['AM31', 'That came too quickly. Let me try again.', './assets/audio/characters/eliza/eliza_ch03_scene06_001.mp3', 'QqV9Q0ILukD0XTk9tsj6', '124kaYCknTDsnwUFdWl9'],
    ['AM32', 'You heard it before I spoke.', './assets/audio/characters/higgins/higgins_ch03_scene06_001.mp3', 'YNOGrtkTR0htvWu6hfSu', 'JlptfLxaUpd8pZcw9dKd']
  ];
  assert.deepEqual(CH03_SCENE_06.voice.map(({ id, transcript, src, generationId, voiceId }) => [id, transcript, src, generationId, voiceId]), expectedStory);
  assert.deepEqual(CH03_SCENE_06.voice.map(({ transcript }) => CH03_SCENE_06.storyBeats.some(({ text }) => text === transcript)), [true, true]);
  const expectedSamples = [
    ['lc10_sample_01', 'Free books—no, three books, please.', './assets/audio/challenges/ch03/lc10_three_books.mp3', 'v2gdewakrrLYUO3Psmcx', '124kaYCknTDsnwUFdWl9'],
    ['lc10_sample_02', 'The blue book—no, the green one, please.', './assets/audio/challenges/ch03/lc10_green_book.mp3', 'WIWxgxtTfjK0d2b23h6f', '124kaYCknTDsnwUFdWl9'],
    ['lc10_sample_03', 'Leave it by the door—no, after the lesson, please leave the parcel by the door.', './assets/audio/challenges/ch03/lc10_after_lesson.mp3', '6a8SiHtyM6HZzOZ9f9sk', '124kaYCknTDsnwUFdWl9']
  ];
  assert.deepEqual(CH03_SCENE_06.challenge.samples.map(({ id, transcript, src, generationId, voiceId }) => [id, transcript, src, generationId, voiceId]), expectedSamples);
  for (const [, , src] of [...expectedStory, ...expectedSamples]) {
    const bytes = fs.readFileSync(new URL(`..${src.slice(1)}`, import.meta.url));
    assert.ok(bytes.length > 1000, `${src} exists`);
    assert.equal(bytes.subarray(0, 3).toString('ascii'), 'ID3', `${src} has its approved MP3 ID3 header`);
  }
  assert.equal(CH03_SCENE_06.storyBeats.some(({ speaker, text }) => speaker === 'Mrs Pearce' && /Of course, Miss Eliza\./.test(text)), true);
  assert.equal(CH03_SCENE_06.voice.some(({ transcript }) => /Mrs Pearce|Miss Eliza/.test(transcript)), false);
});
