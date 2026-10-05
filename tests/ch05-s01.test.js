import test from 'node:test';
import assert from 'node:assert/strict';
import { CH05_SCENE_01, CH05_S01_TEACHER_SECTIONS } from '../src/ch05-content.js';
import { ambienceForScene } from '../src/content.js';
import { applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, saveState, setScene } from '../src/state.js';

const ids = ['d10_tailor_by_role', 'd10_listen_then_adjust', 'd10_keep_core_voice'];
const ready = () => ({ ...setScene(createInitialState(), CH05_SCENE_01.id), applied_events: ['ch04_s05_complete'] });

test('S01 has locked identity, setting and canonical script beats', () => {
  assert.deepEqual([CH05_SCENE_01.id, CH05_SCENE_01.title, CH05_SCENE_01.chapter, CH05_SCENE_01.chapterTitle, CH05_SCENE_01.location], [
    'ch05_s01', 'The Borough Exhibition Evening', 'V', 'The Reception', 'Lambeth Public Rooms — main exhibition hall'
  ]);
  assert.deepEqual(CH05_SCENE_01.storyBeats.map(({ type, speaker, text }) => type === 'd10Decision' ? ['Decision', 'D10'] : [speaker || 'Narration', text]), [
    ['Narration', 'Warm lamps light the exhibition hall. Flower growers stand beside their displays. Eliza has a place in the programme, and the organiser comes to speak with her.'],
    ['Organiser', 'Miss Doolittle, the growers are ready. Would you like to begin?'],
    ['Narration', 'Eliza looks at the organiser, a patron near the display, and one of the flower workers. She considers how she wants to speak with each person.'],
    ['Decision', 'D10'],
    ['Eliza', 'Yes. And please introduce them by name. The work is theirs.'],
    ['Higgins', 'Keep it simple. Speak as we practised.'],
    ['Eliza', 'I shall speak as the room requires.'],
    ['Pickering', 'The growers have done careful work.'],
    ['Narration', 'The organiser turns towards the guests. Eliza has not been introduced as anyone’s experiment. The room begins to fill, and several conversations start at once.']
  ]);
});

test('D10 is an open three-option decision with stable values and no scoring or reward', () => {
  assert.equal(CH05_SCENE_01.decision.id, 'D10');
  assert.equal(CH05_SCENE_01.decision.prompt, 'How would you like to begin with the people here?');
  assert.deepEqual(CH05_SCENE_01.decision.choices.map(({ id }) => id), ids);
  assert.equal(CH05_SCENE_01.decision.neutralChoice, true);
  assert.equal(CH05_SCENE_01.decision.hideResult, true);
  for (const id of ids) {
    let state = ready();
    assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_01), 'Choose a register plan before continuing.');
    state = applyDecision(state, 'D10', id);
    assert.equal(state.reception_register_plan, id);
    assert.deepEqual(state.decisions, {});
    assert.equal(state.applied_events.filter((event) => event === 'ch05_d10_recorded').length, 1);
    assert.equal(state.confidence, 0); assert.equal(state.pronunciation, 0); assert.equal(state.independence, 0);
    assert.equal(applyDecision(state, 'D10', ids.find((other) => other !== id)), state);
    assert.equal(applyDecision({ ...state, scene: 'ch04_s05' }, 'D10', id).reception_register_plan, id);
    assert.equal(completeScene(state, CH05_SCENE_01).applied_events.filter((event) => event === 'ch05_s01_complete').length, 1);
  }
});

test('S01 entry requires Chapter IV completion; selected value survives local restore', () => {
  const blocked = setScene(createInitialState(), CH05_SCENE_01.id);
  assert.match(getSceneAdvanceBlock(blocked, CH05_SCENE_01), /Complete Chapter IV Scene 05/);
  assert.equal(applyDecision(blocked, 'D10', ids[0]), blocked);
  const state = applyDecision(ready(), 'D10', ids[1]);
  const values = new Map();
  saveState(state, { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) });
  const restored = loadState({ getItem: (key) => values.get(key) });
  assert.equal(restored.reception_register_plan, ids[1]);
  assert.equal(restored.applied_events.filter((event) => event === 'ch05_d10_recorded').length, 1);
});

test('explicit S01 completion is write-once and routes only to the unimplemented S02 boundary', () => {
  const selected = applyDecision(ready(), 'D10', ids[2]);
  const done = completeScene(selected, CH05_SCENE_01);
  assert.equal(done.applied_events.filter((event) => event === 'ch05_s01_complete').length, 1);
  assert.equal(completeScene(done, CH05_SCENE_01), done);
  assert.equal(CH05_SCENE_01.nextScene, 'ch05_s02');
  assert.equal(done.independence, selected.independence);
});

test('S01 Teacher Mode explains open register choice and remains read-only; visual/audio media are absent safely', () => {
  assert.match(CH05_S01_TEACHER_SECTIONS.flat().join(' '), /code-switching/i);
  assert.match(CH05_S01_TEACHER_SECTIONS.flat().join(' '), /Accent is not intelligence/);
  assert.match(CH05_S01_TEACHER_SECTIONS.flat().join(' '), /no single correct answer/i);
  assert.equal(CH05_SCENE_01.voice.length, 0);
  assert.equal(ambienceForScene('ch05_s01'), null);
  assert.equal(CH05_SCENE_01.visualFallback, true);
  assert.equal(CH05_SCENE_01.background.src, '');
  assert.equal(CH05_SCENE_01.eliza.src, '');
});
