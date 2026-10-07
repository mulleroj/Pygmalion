import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createInitialState, applyDecision, recordLc15Answer, markLc15NoAudioUsed, completeScene, getSceneAdvanceBlock, saveState, loadState, STORAGE_KEY } from '../src/state.js';
import { CH06_SCENE_03, CH06_S03_TEACHER_SECTIONS } from '../src/ch06-content.js';

const ready = () => ({ ...createInitialState(), started: true, ch05_complete: true, scene: 'ch06_s03', chapter6_direction: undefined, applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch06_s02_complete'] });

test('S03 D12 and LC15 match the locked script exactly and introduce no audio paths', async () => {
  const script = await readFile(new URL('../docs/chapters/ch06/SCRIPT.md', import.meta.url), 'utf8');
  assert.equal(CH06_SCENE_03.decision.prompt, 'Which possibility would you like Eliza to follow?');
  for (const choice of CH06_SCENE_03.decision.choices) assert.ok(script.includes(choice.text));
  assert.deepEqual(CH06_SCENE_03.challenge.samples.map(({ id }) => id), ['lc15_sample_public', 'lc15_sample_colleague', 'lc15_sample_private']);
  for (const sample of CH06_SCENE_03.challenge.samples) {
    assert.ok(script.includes(sample.transcript));
    assert.ok(script.includes(sample.accessiblePrompt));
  }
  assert.deepEqual(CH06_SCENE_03.voice, []);
  assert.equal(JSON.stringify(CH06_SCENE_03).includes('assets/audio'), false);
});

test('D12 requires S02, commits once, and keeps each direction equally available without signal effects', () => {
  const initial = ready();
  const blocked = { ...initial, applied_events: [] };
  assert.strictEqual(applyDecision(blocked, 'D12', 'd12_social_success'), blocked);
  let state = applyDecision(initial, 'D12', 'd12_integrated_identity');
  assert.equal(state.chapter6_direction, 'integrated_identity');
  assert.ok(state.applied_events.includes('ch06_d12_recorded'));
  assert.strictEqual(applyDecision(state, 'D12', 'd12_social_success'), state);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], [0, 0, 0]);
});

test('LC15 retries, no-audio context and completion persist without signals or a fabricated response', () => {
  let state = applyDecision(ready(), 'D12', 'd12_social_success');
  const firstId = 'lc15_sample_public';
  state = markLc15NoAudioUsed(state, firstId);
  assert.deepEqual(state.challenges.lc15.noAudioItems, [firstId]);
  assert.equal(state.challenges.lc15.answers[firstId], undefined);
  state = recordLc15Answer(state, firstId, 'lc15_private_adviser');
  assert.equal(state.challenges.lc15.answers[firstId].correct, false);
  state = recordLc15Answer(state, firstId, 'lc15_public_organiser');
  assert.equal(state.challenges.lc15.answers[firstId].correct, true);
  for (const sample of CH06_SCENE_03.challenge.samples.slice(1)) state = recordLc15Answer(state, sample.id, sample.answer);
  assert.equal(state.challenges.lc15.completed, true);
  assert.equal(state.applied_events.filter((event) => event === 'ch06_lc15_completed').length, 1);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], [0, 0, 0]);
  const storage = { value: null, setItem(key, value) { assert.equal(key, STORAGE_KEY); this.value = value; }, getItem(key) { assert.equal(key, STORAGE_KEY); return this.value; } };
  saveState(state, storage);
  assert.deepEqual(loadState(storage).challenges.lc15, state.challenges.lc15);
});

test('S03 entry and explicit completion guards require both D12 and LC15; Teacher key remains contextual', () => {
  const initial = ready();
  assert.match(getSceneAdvanceBlock({ ...initial, applied_events: [] }, CH06_SCENE_03), /Complete Chapter VI Scene 02/);
  assert.match(getSceneAdvanceBlock(initial, CH06_SCENE_03), /Choose a direction/);
  assert.strictEqual(completeScene(initial, CH06_SCENE_03), initial);
  const chosen = applyDecision(initial, 'D12', 'd12_independent_voice');
  assert.match(getSceneAdvanceBlock(chosen, CH06_SCENE_03), /Complete all three LC15/);
  assert.equal(CH06_S03_TEACHER_SECTIONS.some(([heading]) => heading === 'LC15 contextual key'), true);
  let completed = chosen;
  for (const sample of CH06_SCENE_03.challenge.samples) completed = recordLc15Answer(completed, sample.id, sample.answer);
  const advanced = completeScene(completed, CH06_SCENE_03);
  assert.equal(advanced.applied_events.filter((event) => event === 'ch06_s03_complete').length, 1);
  assert.strictEqual(completeScene(advanced, CH06_SCENE_03), advanced, 'S03 completion cannot repeat');
  assert.deepEqual([advanced.pronunciation, advanced.confidence, advanced.independence], [0, 0, 0]);
});
