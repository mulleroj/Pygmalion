import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH05_SCENE_01, CH05_SCENE_02, CH05_S02_TEACHER_SECTIONS } from '../src/ch05-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { AMBIENCE_FILES } from '../src/audio.js';
import {
  applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, markLc13SupportUsed,
  recordLc13Answer, saveState, setScene
} from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appSource = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const setupS02 = () => {
  let state = { ...createInitialState(), applied_events: ['ch04_s05_complete'] };
  state = setScene(state, CH05_SCENE_01.id);
  state = applyDecision(state, 'D10', 'd10_keep_core_voice');
  state = completeScene(state, CH05_SCENE_01);
  assert.ok(state.applied_events.includes('ch05_s01_complete'));
  return setScene(state, CH05_SCENE_02.id);
};
const expectedKeys = [
  ['lc13_professional_organiser_to_participant', 'lc13_coordination_request', 'lc13_polite_professional'],
  ['lc13_distant_guest_to_eliza', 'lc13_compliment_and_information_request', 'lc13_polite_relatively_formal'],
  ['lc13_peer_colleague', 'lc13_practical_request', 'lc13_informal_familiar']
];

test('S02 is registered with canonical identity, Chapter V setting and shared hall background', () => {
  assert.deepEqual([CH05_SCENE_02.id, CH05_SCENE_02.number, CH05_SCENE_02.title, CH05_SCENE_02.chapter, CH05_SCENE_02.chapterTitle], [
    'ch05_s02', 2, 'Listening Under Pressure', 'V', 'The Reception'
  ]);
  assert.equal(CH05_SCENE_02.location, 'Lambeth Public Rooms — exhibition hall');
  assert.equal(CH05_SCENE_02.background.src, CH05_SCENE_01.background.src);
  assert.equal(CH05_SCENE_02.background.src, './assets/images/locations/ch05/ch05_exhibition_hall.webp');
  const image = fs.readFileSync(path.join(root, CH05_SCENE_02.background.src.slice(2)));
  assert.equal(image.toString('ascii', 0, 4), 'RIFF');
  assert.equal(image.toString('ascii', 8, 12), 'WEBP');
  assert.match(appSource, /\[CH05_SCENE_02\.id\]: CH05_SCENE_02/);
  assert.equal(CH05_SCENE_02.nextScene, 'ch05_s03');
  assert.doesNotMatch(appSource, /\[CH05_SCENE_03\.id\]/);
});

test('S02 requires ch05_s01_complete and direct answer/support writes are guarded', () => {
  const sceneOnly = setScene(createInitialState(), CH05_SCENE_02.id);
  assert.match(getSceneAdvanceBlock(sceneOnly, CH05_SCENE_02), /Complete Chapter V Scene 01/);
  assert.equal(recordLc13Answer(sceneOnly, 'lc13_organiser_relationship', expectedKeys[0][0]), sceneOnly);
  assert.equal(markLc13SupportUsed(sceneOnly, 'lc13_organiser'), sceneOnly);
  const routed = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  assert.match(routed, /hashScene === 'ch05_s02' && !state\.applied_events\.includes\('ch05_s01_complete'\)/);
  assert.match(routed, /setLocation\(CH05_SCENE_01\.id, true\);\s*hashScene = CH05_SCENE_01\.id;/);
});

test('S02 first-responder options match the locked text and stay temporary, neutral and non-gating', () => {
  const { prompt, choices } = CH05_SCENE_02.localFirstResponse;
  assert.equal(prompt, 'Who should Eliza answer first?');
  assert.deepEqual(choices.map(({ label, text }) => [label, text]), [
    ['The organiser', 'Of course. I can introduce them when he arrives.'],
    ['The guest', 'The growers can tell you which varieties are local.'],
    ['Her colleague', 'I will look with you.']
  ]);
  assert.doesNotMatch(JSON.stringify(createInitialState()), /firstResponder|first_response/);
  assert.match(appSource, /ch05S02FirstResponder = selected\.id;\s*render\(\);/);
  assert.doesNotMatch(appSource.match(/if \(action === 'choose-s02-first-response'[\s\S]*?\n  \}/)?.[0] || '', /save\(\)|applyDecision|confidence|pronunciation|independence/);
  assert.match(CH05_SCENE_02.localFirstResponse.followUp, /not a rule that one accent carries more authority/i);
});

test('LC13 has three canonical text-first samples and the exact relationship, purpose and formality key', () => {
  const challenge = CH05_SCENE_02.challenge;
  assert.equal(challenge.id, 'LC13');
  assert.deepEqual(challenge.dimensions.map(({ id }) => id), ['relationship', 'purpose', 'formality']);
  assert.deepEqual(challenge.samples.map(({ id, transcript }) => [id, transcript]), [
    ['lc13_organiser', 'Miss Doolittle, could you introduce the growers when the chairman arrives?'],
    ['lc13_patron', 'A remarkable display. Which of these varieties are grown locally?'],
    ['lc13_colleague', 'Eliza, have you seen the labels for our table?']
  ]);
  challenge.samples.forEach((sample, index) => {
    assert.deepEqual(Object.values(sample.answer), expectedKeys[index]);
    for (const dimension of challenge.dimensions) assert.ok(dimension.options.some(({ id }) => id === sample.answer[dimension.id]));
    assert.equal(sample.src, undefined, 'unproduced LC13 audio has no runtime URL');
  });
  assert.deepEqual(ambienceForScene('ch05_s01'), ambienceForScene('ch05_s02'));
  assert.equal(ambienceForScene('ch05_s02'), 'ch05_exhibition_hall');
  assert.equal(isContinuousAmbienceTransition('ch05_s01', 'ch05_s02'), true);
  assert.equal(AMBIENCE_FILES.ch05_exhibition_hall, './assets/audio/ambience/ch05_borough_exhibition_ambient.mp3');
  assert.equal(CH05_SCENE_02.voice.length, 0);
  assert.equal(fs.statSync(path.join(root, AMBIENCE_FILES.ch05_exhibition_hall.slice(2))).size > 0, true);
});

test('LC13 support is explicit and retryable answers restore from existing shared state without rewards', () => {
  let state = setupS02();
  const itemId = 'lc13_organiser_relationship';
  const wrongId = CH05_SCENE_02.challenge.dimensions[0].options.find(({ id }) => id !== expectedKeys[0][0]).id;
  state = recordLc13Answer(state, itemId, wrongId);
  assert.equal(state.challenges.lc13.answers[itemId].correct, false);
  assert.equal(state.challenges.lc13.answers[itemId].attempts, 1);
  state = markLc13SupportUsed(state, 'lc13_organiser');
  assert.deepEqual(state.challenges.lc13.supportSamples, ['lc13_organiser']);
  const storage = new Map();
  saveState(state, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
  state = loadState({ getItem: (key) => storage.get(key) });
  assert.equal(state.scene, 'ch05_s02');
  assert.equal(state.challenges.lc13.answers[itemId].attempts, 1);
  assert.deepEqual(state.challenges.lc13.supportSamples, ['lc13_organiser']);
  state = recordLc13Answer(state, itemId, expectedKeys[0][0]);
  assert.equal(state.challenges.lc13.answers[itemId].correct, true);
  assert.equal(state.challenges.lc13.answers[itemId].attempts, 2);
  assert.equal(state.confidence, 0);
  assert.equal(state.pronunciation, 0);
  assert.equal(state.independence, 0);
  assert.equal(state.applied_events.includes('ch05_lc13_completed'), false);
});

test('all nine LC13 answers complete once; explicit Continue saves S02 once and keeps S03 as a boundary', () => {
  let state = setupS02();
  for (const [index, sample] of CH05_SCENE_02.challenge.samples.entries()) {
    for (const [dimensionIndex, dimension] of CH05_SCENE_02.challenge.dimensions.entries()) {
      state = recordLc13Answer(state, `${sample.id}_${dimension.id}`, expectedKeys[index][dimensionIndex]);
    }
  }
  assert.equal(state.challenges.lc13.completed, true);
  assert.equal(state.challenges.lc13.attempts, 9);
  assert.equal(state.applied_events.filter((event) => event === 'ch05_lc13_completed').length, 1);
  assert.equal(state.applied_events.includes('ch05_s02_complete'), false, 'challenge completion is separate from scene Continue');
  const blockedWithoutChallenge = getSceneAdvanceBlock(setupS02(), CH05_SCENE_02);
  assert.equal(blockedWithoutChallenge, 'Complete the listening challenge to continue.');
  const completed = completeScene(state, CH05_SCENE_02);
  assert.equal(completed.applied_events.filter((event) => event === 'ch05_s02_complete').length, 1);
  assert.equal(completeScene(completed, CH05_SCENE_02), completed);
  assert.equal(completed.confidence, 0); assert.equal(completed.pronunciation, 0); assert.equal(completed.independence, 0);
  let navigated = setScene(completed, CH05_SCENE_02.nextScene);
  assert.equal(navigated.scene, 'ch05_s03');
  const storage = new Map();
  saveState(navigated, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
  navigated = loadState({ getItem: (key) => storage.get(key) });
  navigated = setScene(navigated, CH05_SCENE_02.id); // browser Back restores the saved S02 checkpoint
  assert.equal(navigated.challenges.lc13.completed, true);
  assert.equal(completeScene(navigated, CH05_SCENE_02), navigated, 'revisiting and continuing cannot duplicate the event');
  navigated = setScene(navigated, CH05_SCENE_02.nextScene); // browser Forward restores the S03 boundary
  assert.equal(navigated.applied_events.filter((event) => event === 'ch05_s02_complete').length, 1);
  assert.match(appSource, /hashScene === 'ch05_s03' && state\.applied_events\.includes\('ch05_s02_complete'\)/);
  assert.match(appSource, /Listening Under Pressure is complete\. The next Chapter V scene is not implemented/);
});

test('S02 Continue is explicit and Teacher preview remains read-only with scene-specific guidance', () => {
  assert.match(appSource, /scene\.id === 'ch05_s02' && state\.challenges\.lc13\.completed[\s\S]*?data-action="next-scene"/);
  assert.match(appSource, /scene\?\.id === 'ch05_s02' \? CH05_S02_TEACHER_SECTIONS/);
  assert.match(appSource, /currentScene\(\)\.id === 'ch05_s02' && studentReadOnly\(\)[\s\S]*?answer-lc13[\s\S]*?choose-s02-first-response/);
  assert.match(appSource, /LC13 answers, support and completion are inactive\./);
  const teacher = CH05_S02_TEACHER_SECTIONS.flat().join(' ');
  for (const phrase of ['relationship', 'purpose', 'formality', 'context-dependent', 'Accent ≠ intelligence', 'Register ≠ personal worth', 'not identity']) {
    assert.match(teacher, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
  assert.match(teacher, /preview does not .*write LC13 answers/i);
});
