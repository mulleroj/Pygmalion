import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, applyDecision, recordChallengeAnswer, markChallengeEntered, markChapterComplete, resetChapter } from '../src/state.js';

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
  state = recordChallengeAnswer(state, 'LC01', 'lc01_01', 'excuse', false);
  state = recordChallengeAnswer(state, 'LC01', 'lc01_01', 'apology', true);
  state = recordChallengeAnswer(state, 'LC01', 'lc01_02', 'excuse', true);
  state = recordChallengeAnswer(state, 'LC01', 'lc01_03', 'intention to repair', true);
  assert.equal(state.challenges.lc01.completed, true);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], [0, 0, 0]);

  state = markChallengeEntered(state, 'LC02');
  assert.equal(state.ear_test_intro_seen, true);
  for (const sample of ['lc02_sample_01', 'lc02_sample_02', 'lc02_sample_03']) {
    state = recordChallengeAnswer(state, 'LC02', sample, 'wrong', false);
  }
  assert.equal(state.challenges.lc02.completed, false);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], [0, 0, 0]);
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
