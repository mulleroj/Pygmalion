import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH05_SCENE_05, CH05_S05_TEACHER_SECTIONS } from '../src/ch05-content.js';
import { applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, saveState, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const contacts = ['higgins_directly', 'pickering_first', 'mrs_pearce_first'];
const ready = (state = createInitialState()) => setScene({
  ...state,
  applied_events: [...state.applied_events, 'ch05_s04_complete'],
  origin_motivation: 'independence',
  reception_register_plan: 'd10_keep_core_voice',
  credit_response: 'd11_private_conversation',
  future_question_style: 'plan_focused',
  independence: 2
}, CH05_SCENE_05.id);

test('S05 content follows the locked scene text, uses the S04 guard and canonical contact choices', () => {
  assert.deepEqual([CH05_SCENE_05.id, CH05_SCENE_05.title, CH05_SCENE_05.location, CH05_SCENE_05.nextScene], ['ch05_s05', 'Leaving the Hall', 'Front steps of Lambeth Public Rooms at night', 'ch06_s01']);
  assert.deepEqual(CH05_SCENE_05.storyBeats.map(({ text }) => text), [
    'The hall becomes quieter behind Eliza. The evening has gone well, but it has not decided what she should do next.',
    'Well, Eliza? Are you coming?',
    'Eliza does not automatically follow him.',
    'I know enough now to ask what comes next.'
  ]);
  assert.deepEqual(CH05_SCENE_05.decision.choices.map(({ id }) => id), contacts);
  assert.deepEqual(CH05_SCENE_05.decision.choices.map(({ title }) => title), [
    'I want to speak with Higgins directly.', 'I want to speak with Pickering first.', 'I want to ask Mrs Pearce for practical support first.'
  ]);
  assert.equal(CH05_SCENE_05.voice.length, 0);
  assert.match(getSceneAdvanceBlock(setScene(createInitialState(), CH05_SCENE_05.id), CH05_SCENE_05), /Complete Chapter V Scene 04/);
  assert.match(app, /hashScene === 'ch05_s05' && !state\.applied_events\.includes\('ch05_s04_complete'\)/);
  assert.doesNotMatch(CH05_SCENE_05.storyBeats.map(({ text }) => text).join(' '), /not implemented/i);
});

test('next_contact is single-write, persists through reload and carries earlier Chapter V fields unchanged', () => {
  for (const contact of contacts) {
    const initial = ready();
    const selected = applyDecision(initial, 'NEXT_CONTACT', contact);
    assert.equal(selected.next_contact, contact);
    assert.deepEqual(selected.applied_events.filter((event) => event === 'ch05_next_contact_recorded'), ['ch05_next_contact_recorded']);
    assert.equal(applyDecision(selected, 'NEXT_CONTACT', contacts.find((candidate) => candidate !== contact)), selected);
    assert.deepEqual([
      selected.origin_motivation, selected.reception_register_plan, selected.credit_response, selected.future_question_style
    ], ['independence', 'd10_keep_core_voice', 'd11_private_conversation', 'plan_focused']);
    assert.equal(selected.confidence, initial.confidence);
    assert.equal(selected.pronunciation, initial.pronunciation);
    assert.equal(selected.independence, initial.independence);
    const storage = new Map();
    saveState(selected, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
    const restored = loadState({ getItem: (key) => storage.get(key) });
    assert.equal(restored.next_contact, contact);
    assert.ok(restored.applied_events.includes('ch05_next_contact_recorded'));
  }
});

test('explicit Continue completes Chapter V and grants Independence +1 exactly once across revisit and reload', () => {
  let state = applyDecision(ready(), 'NEXT_CONTACT', 'higgins_directly');
  assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_05), '');
  const complete = completeScene(state, CH05_SCENE_05);
  assert.equal(complete.ch05_complete, true);
  assert.equal(complete.independence, 3);
  assert.deepEqual(complete.applied_events.filter((event) => event === 'ch05_s05_complete'), ['ch05_s05_complete']);
  assert.equal(completeScene(complete, CH05_SCENE_05), complete);
  const storage = new Map();
  saveState(complete, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
  state = setScene(loadState({ getItem: (key) => storage.get(key) }), CH05_SCENE_05.id);
  assert.equal(state.next_contact, 'higgins_directly');
  assert.equal(state.independence, 3);
  assert.equal(completeScene(state, CH05_SCENE_05), state);
  const backForwardReplay = setScene(setScene(state, 'ch05_s04'), CH05_SCENE_05.id);
  assert.equal(completeScene(backForwardReplay, CH05_SCENE_05).independence, 3);
  assert.equal(backForwardReplay.origin_motivation, 'independence');
  assert.equal(backForwardReplay.reception_register_plan, 'd10_keep_core_voice');
  assert.equal(backForwardReplay.credit_response, 'd11_private_conversation');
  assert.equal(backForwardReplay.future_question_style, 'plan_focused');
  assert.equal(backForwardReplay.next_contact, 'higgins_directly');
  assert.equal(Object.hasOwn(backForwardReplay, 'ending'), false);
});

test('S05 Teacher Mode is registered as read-only and the Chapter VI boundary is explicit', () => {
  const teacher = CH05_S05_TEACHER_SECTIONS.map(([, text]) => text).join(' ');
  assert.match(teacher, /Read-only/i);
  assert.match(teacher, /does not select a contact/i);
  assert.match(app, /scene\?\.id === 'ch05_s05' \? CH05_S05_TEACHER_SECTIONS/);
  assert.match(app, /Chapter V complete/);
  assert.match(app, /Chapter VI, Her Own Voice, is not yet implemented in this runtime/);
  assert.match(app, /target\.dataset\.decision === 'NEXT_CONTACT' && \(currentScene\(\)\.id !== 'ch05_s05' \|\| studentReadOnly\(\)\)/);
});
