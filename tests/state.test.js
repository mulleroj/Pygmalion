import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, applyDecision, recordChallengeAnswer, ensureChallengeOptionOrders, isChallengeAnswerCorrect, markChallengeEntered, markChapterComplete, resetChapter, loadState, setScene, canAdvanceScene, getSceneAdvanceBlock } from '../src/state.js';
import { SCENES } from '../src/content.js';

test('D01 and D02 signal changes are idempotent on replay', () => {
  let state = createInitialState();
  state = applyDecision(state, 'D01', 'd01_name_damage');
  state = applyDecision(state, 'D01', 'd01_ask_help');
  assert.equal(state.independence, 1);
  assert.equal(state.confidence, 0);
  assert.equal(state.decisions.D01, 'd01_name_damage');

  state = applyDecision(state, 'D02', 'd02_direct_question');
  state = applyDecision(state, 'D02', 'd02_direct_question');
  assert.equal(state.confidence, 1);
  assert.deepEqual(state.applied_events, ['ch01_d01_resolution', 'ch01_d02_response']);
});

test('D03 stores one open motivation without a signal increment', () => {
  let state = createInitialState();
  state = applyDecision(state, 'D03', 'independence');
  assert.equal(state.origin_motivation, 'independence');
  assert.equal(state.confidence, 0);
  assert.equal(state.pronunciation, 0);
  assert.equal(state.independence, 0);
  assert.equal(state.applied_events.length, 1);
});

test('LC01 and LC02 completion are retryable but never change development signals', () => {
  let state = createInitialState();
  state = recordChallengeAnswer(state, 'LC01', 'lc01_01', 'excuse', 'apology');
  state = recordChallengeAnswer(state, 'LC01', 'lc01_01', 'apology', 'apology');
  state = recordChallengeAnswer(state, 'LC01', 'lc01_02', 'excuse', 'excuse');
  state = recordChallengeAnswer(state, 'LC01', 'lc01_03', 'intention to repair', 'intention to repair');
  assert.equal(state.challenges.lc01.completed, true);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], [0, 0, 0]);

  state = markChallengeEntered(state, 'LC02');
  assert.equal(state.ear_test_intro_seen, true);
  for (const sample of ['lc02_sample_01', 'lc02_sample_02', 'lc02_sample_03']) {
    state = recordChallengeAnswer(state, 'LC02', sample, 'not-a-canonical-option', 'canonical-correct-option');
  }
  assert.equal(state.challenges.lc02.completed, false);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], [0, 0, 0]);
});

test('scene 2 continue action advances to scene 3 only after D01 and LC01 are complete', () => {
  const scene02 = SCENES.find((scene) => scene.id === 'ch01_s02');
  let state = setScene(createInitialState(), 'ch01_s02');
  for (const [sampleId, answer] of [['lc01_01', 'apology'], ['lc01_02', 'excuse'], ['lc01_03', 'intention to repair']]) {
    state = recordChallengeAnswer(state, 'LC01', sampleId, answer, answer);
  }

  assert.equal(canAdvanceScene(state, scene02), false);
  assert.equal(getSceneAdvanceBlock(state, scene02), 'Choose a response to continue.');

  state = applyDecision(state, 'D01', 'd01_ask_help');
  assert.equal(canAdvanceScene(state, scene02), true);
  state = setScene(state, SCENES[scene02.number].id);
  assert.equal(state.scene, 'ch01_s03');
});

test('listening answers use stable option IDs instead of positions', () => {
  assert.equal(isChallengeAnswerCorrect('lc02_s01_worker_request', 'lc02_s01_worker_request'), true);
  assert.equal(isChallengeAnswerCorrect('0', 'lc02_s01_worker_request'), false);
  assert.equal(isChallengeAnswerCorrect('lc02_s01_formal_question', 'lc02_s01_worker_request'), false);

  let state = createInitialState();
  state = ensureChallengeOptionOrders(state, 'LC02', [{
    key: 'lc02_sample_01',
    optionIds: ['lc02_s01_worker_request', 'lc02_s01_formal_question', 'lc02_s01_urgent_command']
  }], () => 0);
  state = recordChallengeAnswer(state, 'LC02', 'lc02_sample_01', 'lc02_s01_worker_request', 'lc02_s01_worker_request');
  assert.equal(state.challenges.lc02.answers.lc02_sample_01.correct, true);
});

test('shuffle preserves every option exactly once and stays stable across replay, retry, and refresh', () => {
  const lc01Groups = [{ key: 'shared', optionIds: ['apology', 'excuse', 'intention to repair'] }];
  const lc02Groups = [
    { key: 'lc02_sample_01', optionIds: ['lc02_s01_worker_request', 'lc02_s01_formal_question', 'lc02_s01_urgent_command'] },
    { key: 'lc02_sample_02', optionIds: ['lc02_s02_formal_information', 'lc02_s02_familiar_instruction', 'lc02_s02_apology_repair'] },
    { key: 'lc02_sample_03', optionIds: ['lc02_s03_familiar_instruction', 'lc02_s03_worker_request', 'lc02_s03_formal_question'] }
  ];
  let state = createInitialState();
  state = ensureChallengeOptionOrders(state, 'LC01', lc01Groups, () => 0);
  state = ensureChallengeOptionOrders(state, 'LC02', lc02Groups, () => 0.5);

  for (const [challengeId, groups] of [['LC01', lc01Groups], ['LC02', lc02Groups]]) {
    for (const group of groups) {
      const order = state.challenges[challengeId.toLowerCase()].optionOrders[group.key];
      assert.deepEqual([...order].sort(), [...group.optionIds].sort());
      assert.equal(new Set(order).size, group.optionIds.length);
    }
  }

  const ordersBefore = structuredClone({ lc01: state.challenges.lc01.optionOrders, lc02: state.challenges.lc02.optionOrders });
  const afterReplay = ensureChallengeOptionOrders(state, 'LC02', lc02Groups, () => 0.99);
  assert.deepEqual({ lc01: afterReplay.challenges.lc01.optionOrders, lc02: afterReplay.challenges.lc02.optionOrders }, ordersBefore);

  const afterRetry = recordChallengeAnswer(afterReplay, 'LC02', 'lc02_sample_01', 'lc02_s01_urgent_command', 'lc02_s01_worker_request');
  assert.deepEqual(afterRetry.challenges.lc02.optionOrders, ordersBefore.lc02);

  const restored = loadState({ getItem: () => JSON.stringify(afterRetry) });
  const afterRefresh = ensureChallengeOptionOrders(restored, 'LC02', lc02Groups, () => 0.99);
  assert.deepEqual(afterRefresh.challenges.lc02.optionOrders, ordersBefore.lc02);

  const correctPositions = lc02Groups.map((group) => {
    const correctId = {
      lc02_sample_01: 'lc02_s01_worker_request',
      lc02_sample_02: 'lc02_s02_familiar_instruction',
      lc02_sample_03: 'lc02_s03_formal_question'
    }[group.key];
    return ordersBefore.lc02[group.key].indexOf(correctId);
  });
  assert.notDeepEqual(correctPositions, [0, 1, 2]);
});

test('chapter completion and conscious reset preserve only the sound preference', () => {
  let state = createInitialState();
  state.soundEnabled = false;
  state = markChapterComplete(state);
  assert.equal(state.completed, true);
  const reset = resetChapter(state);
  assert.equal(reset.completed, false);
  assert.equal(reset.scene, 'ch01_s01');
  assert.equal(reset.soundEnabled, false);
});
