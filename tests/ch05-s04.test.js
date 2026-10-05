import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH05_SCENE_04, CH05_S04_TEACHER_SECTIONS } from '../src/ch05-content.js';
import { ambienceForScene } from '../src/content.js';
import { applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, markLc14SupportUsed, recordLc14Answer, saveState, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const enterS04 = (credit) => setScene({ ...createInitialState(), credit_response: credit, applied_events: ['ch05_s03_complete'] }, 'ch05_s04');

test('S04 has canonical identity, approved character art and pending voice audio', () => {
  assert.deepEqual([CH05_SCENE_04.id, CH05_SCENE_04.number, CH05_SCENE_04.title, CH05_SCENE_04.chapter], ['ch05_s04', 4, 'What Happens to Me Now?', 'V']);
  assert.equal(CH05_SCENE_04.location, 'Quiet side room off the exhibition hall');
  assert.equal(CH05_SCENE_04.visualFallback, false);
  assert.equal(CH05_SCENE_04.background.src, './assets/images/locations/ch05/ch05_lambeth_public_rooms_side_room.webp');
  assert.deepEqual(CH05_SCENE_04.plate, CH05_SCENE_04.background);
  assert.equal(CH05_SCENE_04.composition, 'ch05-side-room');
  assert.equal(CH05_SCENE_04.eliza.src, './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png');
  const sourcePath = path.join(root, 'assets/images/characters/eliza/source/eliza_her-own-voice_thoughtful.png');
  const masterPath = path.join(root, 'assets/images/characters/eliza/eliza_her-own-voice_thoughtful.webp');
  const runtimePath = path.join(root, CH05_SCENE_04.eliza.src.slice(2));
  const source = fs.readFileSync(sourcePath);
  const runtime = fs.readFileSync(runtimePath);
  const master = fs.readFileSync(masterPath);
  for (const png of [source, runtime]) {
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1086, 1448]);
    assert.equal(png[25], 6, 'runtime and source PNGs retain alpha');
  }
  assert.deepEqual(runtime, source);
  assert.equal(master.toString('ascii', 8, 12), 'WEBP');
  assert.equal(master.toString('ascii', 12, 16), 'VP8L');
  assert.equal(1 + master[21] + ((master[22] & 0x3f) << 8), 1086);
  assert.equal(1 + (master[22] >> 6) + (master[23] << 2) + ((master[24] & 0x0f) << 10), 1448);
  const branches = [
    ['d11_private_conversation', './assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png'],
    ['d11_accept_for_now', './assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png'],
    ['d11_redirect_publicly', './assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png']
  ];
  for (const [credit, companionSrc] of branches) {
    const runtimeScene = { ...CH05_SCENE_04, ...CH05_SCENE_04.branches[credit] };
    assert.equal(runtimeScene.eliza.src, CH05_SCENE_04.eliza.src);
    assert.equal(runtimeScene.supporting.length, 1);
    assert.equal(runtimeScene.supporting[0].src, companionSrc);
    assert.equal(fs.statSync(path.join(root, companionSrc.slice(2))).size > 0, true);
  }
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  assert.match(css, /\.ch05-side-room \.art-eliza img, \.ch05-side-room \.supporting-character\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.ch05-side-room \.art-eliza img\s*\{\s*left:\s*25%/);
  assert.match(css, /\.ch05-side-room \.supporting-character\s*\{\s*left:\s*75%/);
  assert.match(css, /\.ch05-side-room \.art-background img\s*\{\s*object-position:\s*82% center/);
  assert.match(app, /baseScene\.id === 'ch05_s04'[\s\S]*?\.\.\.baseScene\.branches\[state\.credit_response\]/);
  const imagePath = path.join(root, CH05_SCENE_04.background.src.slice(2));
  const image = fs.readFileSync(imagePath);
  assert.equal(image.toString('ascii', 0, 4), 'RIFF');
  assert.equal(image.toString('ascii', 8, 12), 'WEBP');
  assert.equal(image.toString('ascii', 12, 16), 'VP8L');
  const width = 1 + image[21] + ((image[22] & 0x3f) << 8);
  const height = 1 + ((image[24] & 0x0f) << 10) + (image[23] << 2) + ((image[22] & 0xc0) << 6);
  assert.deepEqual([width, height], [1672, 941]);
  assert.equal(width / height, 1672 / 941);
  assert.equal(CH05_SCENE_04.audioPending, true);
  assert.deepEqual(CH05_SCENE_04.voice, []);
  assert.equal(ambienceForScene('ch05_s04'), 'ch05_side_room');
  assert.equal(ambienceForScene('ch05_s01'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s02'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s03'), 'ch05_exhibition_hall');
  assert.match(app, /scene\.eliza\?\.src \? `<div class="art-layer art-eliza">/);
  assert.match(app, /\[CH05_SCENE_04\.id\]: CH05_SCENE_04/);
  assert.match(app, /hashScene === 'ch05_s04' && !state\.applied_events\.includes\('ch05_s03_complete'\)/);
  assert.equal(getSceneAdvanceBlock(setScene(createInitialState(), 'ch05_s04'), CH05_SCENE_04), 'Complete Chapter V Scene 03 before opening What Happens to Me Now?');
});

test('companion and LC14 context derive from all D11 values without a companion mirror', () => {
  const cases = [
    ['d11_private_conversation', 'Pickering', 'lc14_pickering_question_fit', 'lc14_pickering_clarify_introductions'],
    ['d11_accept_for_now', 'Mrs Pearce', 'lc14_mrs_pearce_question_fit', 'lc14_pearce_prioritise'],
    ['d11_redirect_publicly', 'Mrs Pearce', 'lc14_mrs_pearce_question_fit', 'lc14_pearce_prioritise']
  ];
  for (const [credit, companion, item, answer] of cases) {
    const initial = enterS04(credit);
    const branch = credit === 'd11_private_conversation' ? CH05_SCENE_04.branches.d11_private_conversation : CH05_SCENE_04.branches.d11_accept_for_now;
    assert.equal(branch.companion, companion);
    assert.equal(branch.itemId, item);
    assert.equal(branch.answer, answer);
    assert.equal(Object.hasOwn(initial, 's04_companion'), false);
    assert.equal(recordLc14Answer(initial, item, answer).challenges.lc14.completed, true);
  }
});

test('future question style accepts and persists each canonical personal value once', () => {
  for (const value of ['direct', 'indirect', 'plan_focused']) {
    const initial = enterS04('d11_private_conversation');
    const selected = applyDecision(initial, 'FUTURE_QUESTION_STYLE', value);
    assert.equal(selected.future_question_style, value);
    assert.equal(selected.applied_events.filter((event) => event === 'ch05_future_question_style_recorded').length, 1);
    assert.equal(applyDecision(selected, 'FUTURE_QUESTION_STYLE', 'direct'), selected);
    const storage = { value: '', setItem(_key, value) { this.value = value; }, getItem() { return this.value; } };
    saveState(selected, storage);
    assert.equal(loadState(storage).future_question_style, value);
  }
});

test('LC14 support and retry persist without rewards; Continue completes once only after style and LC14', () => {
  const item = 'lc14_pickering_question_fit';
  let state = enterS04('d11_private_conversation');
  state = markLc14SupportUsed(state, item);
  assert.deepEqual(state.challenges.lc14.supportItems, [item]);
  state = recordLc14Answer(state, item, 'lc14_pickering_ask_programme');
  assert.equal(state.challenges.lc14.answers[item].correct, false);
  state = recordLc14Answer(state, item, 'lc14_pickering_clarify_introductions');
  assert.equal(state.challenges.lc14.completed, true);
  assert.equal(state.confidence, 0); assert.equal(state.pronunciation, 0); assert.equal(state.independence, 0);
  assert.match(getSceneAdvanceBlock(state, CH05_SCENE_04), /Choose how Eliza/);
  state = applyDecision(state, 'FUTURE_QUESTION_STYLE', 'indirect');
  assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_04), '');
  state = completeScene(state, CH05_SCENE_04);
  assert.equal(state.applied_events.filter((event) => event === 'ch05_s04_complete').length, 1);
  assert.equal(completeScene(state, CH05_SCENE_04), state);
  assert.equal(state.confidence, 0); assert.equal(state.pronunciation, 0); assert.equal(state.independence, 0);
});

test('Teacher preview is read-only and S05 remains a boundary', () => {
  const teacher = CH05_S04_TEACHER_SECTIONS.flat().join(' ');
  assert.match(teacher, /read-only/i);
  assert.match(teacher, /direct, indirect or plan-focused/i);
  assert.match(app, /scene\?\.id === 'ch05_s04' \? CH05_S04_TEACHER_SECTIONS/);
  assert.match(app, /Teacher preview · read-only\. No LC14, future question style or progression changes\./);
  assert.match(app, /Leaving the Hall is not implemented in this runtime\./);
  assert.match(app, /scene\.id === 'ch05_s04'[\s\S]*?data-action="next-scene"/);
});
