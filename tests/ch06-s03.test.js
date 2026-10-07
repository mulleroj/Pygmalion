import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createInitialState, applyDecision, recordLc15Answer, markLc15NoAudioUsed, completeScene, getSceneAdvanceBlock, saveState, loadState, STORAGE_KEY } from '../src/state.js';
import { CH06_SCENE_03, CH06_S03_TEACHER_SECTIONS } from '../src/ch06-content.js';
import { AudioManager } from '../src/audio.js';

async function mount(t, savedState) {
  const keys = ['document', 'window', 'localStorage'];
  const originals = Object.fromEntries(keys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key]; });
  let saved = JSON.stringify(savedState);
  const nodes = new Map();
  const handlers = {};
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('teacher-close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, handler) { handlers[name] = handler; } };
  globalThis.window = { location: { hash: '#ch06_s03', pathname: '/' }, history: { state: null, pushState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(handler) { handler(); }, addEventListener(name, handler) { handlers[name] = handler; } };
  globalThis.localStorage = { getItem(key) { assert.equal(key, STORAGE_KEY); return saved; }, setItem(key, value) { assert.equal(key, STORAGE_KEY); saved = value; } };
  const methods = ['ensureAmbience', 'setEnabled', 'leaveScene', 'setSceneAudioReadOnly', 'playVoice'];
  const originalsAudio = Object.fromEntries(methods.map((name) => [name, AudioManager.prototype[name]]));
  for (const name of methods) AudioManager.prototype[name] = name === 'ensureAmbience' ? () => Promise.resolve() : () => {};
  t.after(() => { for (const [name, method] of Object.entries(originalsAudio)) if (method) AudioManager.prototype[name] = method; });
  const app = await import(`../src/app.js?ch06-s03=${Date.now()}-${Math.random()}`);
  return { app, handlers, node, state: () => JSON.parse(saved) };
}

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

test('approved S03 visual renders the canonical room and exactly one existing Eliza cutout without changing state', async (t) => {
  const backgroundPath = 'assets/images/locations/ch06/ch06_three_ways_forward_room.webp';
  const elizaPath = 'assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png';
  assert.ok((await stat(new URL(`../${backgroundPath}`, import.meta.url))).size > 0);
  assert.ok((await stat(new URL(`../${elizaPath}`, import.meta.url))).size > 0);
  assert.equal(CH06_SCENE_03.background.src, `./${backgroundPath}`);
  assert.equal(CH06_SCENE_03.plate.src, CH06_SCENE_03.background.src);
  assert.equal(CH06_SCENE_03.eliza.src, `./${elizaPath}`);
  assert.equal(CH06_SCENE_03.visualFallback, false);
  assert.equal(CH06_SCENE_03.composition, 'ch06-three-ways-forward');
  assert.deepEqual(CH06_SCENE_03.supporting, []);
  assert.deepEqual(CH06_SCENE_03.props, []);
  const before = { ...ready(), started: true, ch05_complete: true, scene: 'ch06_s03', applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch06_s02_complete'] };
  delete before.chapter6_direction;
  const mounted = await mount(t, before);
  const html = mounted.node('#app').innerHTML;
  assert.match(html, /class="storybook-art\s+ch06-three-ways-forward/);
  assert.equal((html.match(/eliza_her-own-voice_thoughtful_cutout\.png/g) || []).length, 1);
  assert.equal((html.match(/ch06_three_ways_forward_room\.webp/g) || []).length, 1);
  assert.equal((html.match(/class="supporting-character/g) || []).length, 0);
  assert.equal((html.match(/data-option="d12_(?:social_success|independent_voice|integrated_identity)"/g) || []).length, 3);
  assert.deepEqual(mounted.state(), before, 'visual rendering leaves direction, LC15 and signals unchanged');
});

test('S03 Teacher preview keeps the approved visual read-only and renders LC15 controls below it', async (t) => {
  const before = { ...ready(), started: true, ch05_complete: true, scene: 'ch06_s03', chapter6_direction: 'independent_voice', applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch06_s02_complete', 'ch06_d12_recorded'] };
  const mounted = await mount(t, before);
  const invoke = async (action) => { const target = { dataset: { action }, closest() { return this; }, focus() {} }; await mounted.handlers.click({ target, isTrusted: false, preventDefault() {} }); };
  assert.match(mounted.node('#app').innerHTML, /id="lc15-title"/);
  assert.match(mounted.node('#app').innerHTML, /Read the situation clues instead/);
  await invoke('open-teacher');
  await invoke('teacher-preview');
  const html = mounted.node('#app').innerHTML;
  assert.match(html, /Teacher preview · read-only/);
  assert.match(html, /ch06_three_ways_forward_room\.webp/);
  assert.match(html, /id="lc15-title"/);
  assert.match(html, /data-action="answer-lc15"[^>]*disabled/);
  mounted.app.moveNext();
  assert.deepEqual(mounted.state(), before, 'Teacher preview cannot commit D12, LC15 or progression');
});

test('S03 responsive composition stacks without clipping and keeps D12 cards opaque', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.ch06-three-ways-forward-spread \{[^}]*grid-template-columns: minmax\(0, 1\.04fr\) minmax\(0, \.96fr\)/);
  assert.match(css, /@media \(max-width: 1023px\)[\s\S]*?\.ch06-three-ways-forward-spread \{ grid-template-columns: minmax\(0, 1fr\); \}/);
  assert.match(css, /\.ch06-three-ways-forward \.art-eliza img \{[^}]*left: 68%;[^}]*height: 86%;/);
  assert.match(css, /@media \(max-width: 599px\)[\s\S]*?\.ch06-three-ways-forward \.art-background img \{ object-fit: cover; object-position: 48% center; \}/);
  assert.match(css, /\.ch06-three-ways-forward \.art-eliza img \{ left: 58%; bottom: 1%; height: 78%; \}/);
  assert.match(css, /\.ch06-three-ways-forward-spread \.neutral-choice \.choice-button \{ background: #fffaf3; \}/);
});
