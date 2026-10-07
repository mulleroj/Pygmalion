import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, saveState, loadState, STORAGE_KEY, recordCh06FinalStatementShape, deliverCh06FinalStatement, completeScene, getSceneAdvanceBlock } from '../src/state.js';
import { CH06_SCENE_04, CH06_S04_TEACHER_SECTIONS } from '../src/ch06-content.js';

async function mount(t, savedState, hash = `#${savedState.scene}`) {
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
  globalThis.window = { location: { hash, pathname: '/' }, history: { state: null, pushState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(handler) { handler(); }, addEventListener(name, handler) { handlers[name] = handler; } };
  globalThis.localStorage = { getItem(key) { assert.equal(key, STORAGE_KEY); return saved; }, setItem(key, value) { assert.equal(key, STORAGE_KEY); saved = value; } };
  const app = await import(`../src/app.js?ch06-s04=${Date.now()}-${Math.random()}`);
  return { app, handlers, node, state: () => JSON.parse(saved), hash: () => window.location.hash, async navigate(hash) { window.location.hash = hash; await handlers.hashchange(); } };
}

function s04Ready(direction = 'social_success') {
  const state = createInitialState();
  return {
    ...state, started: true, ch05_complete: true, scene: 'ch06_s04', chapter6_direction: direction,
    origin_motivation: 'learning', reception_register_plan: 'd10_listen_then_adjust', credit_response: 'd11_accept_for_now',
    future_question_style: 'direct', next_contact: 'pickering_first',
    applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch06_s02_complete', 'ch06_d12_recorded', 'ch06_lc15_completed', 'ch06_s03_complete'],
    challenges: { ...state.challenges, lc15: { answers: {}, completed: true, attempts: 3, firstAttempt: true, noAudioItems: [] } }
  };
}

async function click(mounted, action, dataset = {}) {
  const target = { dataset: { action, ...dataset }, closest() { return this; }, focus() {} };
  await mounted.handlers.click({ target, isTrusted: false, preventDefault() {} });
}

test('S04 entry guard returns to S03 without fabricating statement state or Confidence', async (t) => {
  const invalid = { ...s04Ready(), applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch06_s02_complete'] };
  const mounted = await mount(t, invalid);
  assert.equal(mounted.hash(), '#ch06_s03');
  assert.equal(mounted.state().scene, 'ch06_s03');
  assert.equal(mounted.state().final_statement_shape, undefined);
  assert.equal(mounted.state().applied_events.includes('ch06_final_statement_delivered'), false);
  assert.equal(mounted.state().confidence, 0);
  assert.doesNotMatch(mounted.node('#app').innerHTML, /How would you like Eliza to express her choice\?/);
});

test('S04 renders canonical shape options and all three remain available for every D12 direction', async (t) => {
  const canonical = await import('../src/ch06-content.js');
  const script = await (await import('node:fs/promises')).readFile(new URL('../docs/chapters/ch06/SCRIPT.md', import.meta.url), 'utf8');
  for (const direction of Object.keys(CH06_SCENE_04.statement.directions)) {
    const before = s04Ready(direction);
    const mounted = await mount(t, before);
    const html = mounted.node('#app').innerHTML;
    assert.equal((html.match(/data-action="choose-ch06-statement-shape"/g) || []).length, 3, direction);
    assert.equal((html.match(/<button class="choice-button[^>]*type="button"/g) || []).length, 3, direction);
    assert.match(html, /How would you like Eliza to express her choice\?/);
    assert.ok(script.includes(CH06_SCENE_04.storyBeats[0].text));
    for (const shape of canonical.CH06_SCENE_04.statement.shapes) {
      assert.match(html, new RegExp(`data-option="${shape.id}"`));
      assert.ok(script.includes(shape.text));
      assert.ok(script.includes(shape.leadIn));
    }
    assert.ok(script.includes(CH06_SCENE_04.statement.directions[direction].text));
    assert.doesNotMatch(html, /data-action="deliver-ch06-statement"/);
    assert.deepEqual(mounted.state(), before, 'rendering has no state effect or reward');
  }
});

test('S04 shape is immutable, composes the exact direction clause and persists without a reward', async (t) => {
  for (const [direction, clause] of Object.entries(CH06_SCENE_04.statement.directions)) {
    const before = s04Ready(direction);
    const mounted = await mount(t, before);
    const beforeProtected = Object.fromEntries(['chapter6_direction', 'origin_motivation', 'reception_register_plan', 'credit_response', 'future_question_style', 'next_contact', 'pronunciation', 'independence'].map((key) => [key, before[key]]));
    const shape = CH06_SCENE_04.statement.shapes.find(({ value }) => value === 'reflection');
    await click(mounted, 'choose-ch06-statement-shape', { option: shape.id });
    const selected = mounted.state();
    assert.equal(selected.final_statement_shape, 'reflection');
    assert.ok(selected.applied_events.includes('ch06_final_statement_shape_recorded'));
    assert.equal(selected.confidence, 0, 'selecting a shape does not award Confidence');
    assert.deepEqual(Object.fromEntries(Object.keys(beforeProtected).map((key) => [key, selected[key]])), beforeProtected);
    assert.match(mounted.node('#app').innerHTML, new RegExp(clause.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(mounted.node('#app').innerHTML, /I have learned that…/);
    assert.match(mounted.node('#app').innerHTML, /data-action="deliver-ch06-statement"/);
    assert.doesNotMatch(mounted.node('#app').innerHTML, /data-action="next-scene"/);
    await mounted.navigate('#ch06_s03');
    assert.equal(mounted.state().confidence, 0, 'Back does not award Confidence');
    await mounted.navigate('#ch06_s04');
    assert.equal(mounted.state().final_statement_shape, 'reflection', 'Forward preserves the saved shape');
    assert.equal(mounted.state().confidence, 0, 'Forward does not award Confidence');
    const storage = { value: JSON.stringify(selected), getItem() { return this.value; } };
    assert.equal(loadState(storage).final_statement_shape, 'reflection');
    assert.strictEqual(recordCh06FinalStatementShape(selected, 'final_statement_commitment'), selected, 'saved shape cannot be overwritten');
  }
  for (const direction of Object.keys(CH06_SCENE_04.statement.directions)) {
    for (const shape of CH06_SCENE_04.statement.shapes) {
      let state = recordCh06FinalStatementShape(s04Ready(direction), shape.id);
      state = deliverCh06FinalStatement(state);
      assert.equal(state.confidence, 1, `${direction}/${shape.value} receives the same one-time delivery reward`);
      assert.equal(state.pronunciation, 0);
      assert.equal(state.independence, 0);
    }
  }
});

test('explicit delivery awards Confidence once, remains idempotent, and only then completes toward S05', async (t) => {
  const before = s04Ready('integrated_identity');
  let state = recordCh06FinalStatementShape(before, 'final_statement_commitment');
  assert.equal(state.confidence, 0);
  const mountState = { ...state };
  const mounted = await mount(t, mountState);
  assert.equal(mounted.state().confidence, 0, 'reload/render does not award Confidence');
  assert.match(mounted.node('#app').innerHTML, /My next step is…/);
  await click(mounted, 'deliver-ch06-statement');
  const delivered = mounted.state();
  assert.equal(delivered.confidence, 1);
  assert.ok(delivered.applied_events.includes('ch06_final_statement_delivered'));
  assert.equal(delivered.pronunciation, 0);
  assert.equal(delivered.independence, 0);
  assert.deepEqual(['chapter6_direction', 'origin_motivation', 'reception_register_plan', 'credit_response', 'future_question_style', 'next_contact'].map((key) => delivered[key]), ['integrated_identity', 'learning', 'd10_listen_then_adjust', 'd11_accept_for_now', 'direct', 'pickering_first']);
  assert.match(mounted.node('#app').innerHTML, /data-action="next-scene"/);
  assert.strictEqual(deliverCh06FinalStatement(delivered), delivered, 'duplicate delivery does not repeat reward');
  const reloaded = await mount(t, delivered);
  assert.equal(reloaded.state().confidence, 1);
  await click(reloaded, 'deliver-ch06-statement');
  assert.equal(reloaded.state().confidence, 1);
  await reloaded.navigate('#ch06_s03');
  await reloaded.navigate('#ch06_s04');
  assert.equal(reloaded.state().confidence, 1, 'Back/Forward revisit does not repeat the reward');
  assert.equal(reloaded.state().applied_events.filter((event) => event === 'ch06_final_statement_delivered').length, 1);
  const completion = completeScene(delivered, CH06_SCENE_04);
  assert.ok(completion.applied_events.includes('ch06_s04_complete'));
  assert.strictEqual(completeScene(completion, CH06_SCENE_04), completion, 'S04 completion is write-once');
  assert.equal(Boolean(completion.ch06_complete), false);
  assert.equal(completion.applied_events.includes('ch06_complete'), false);
  const blocker = getSceneAdvanceBlock(state, CH06_SCENE_04);
  assert.match(blocker, /Deliver Eliza’s statement/);
});

test('S04 Teacher Mode is contextual, read-only, and cannot shape, deliver, reward or complete', async (t) => {
  assert.ok(CH06_S04_TEACHER_SECTIONS.some(([heading]) => heading === 'Signal contract'));
  assert.ok(CH06_S04_TEACHER_SECTIONS.some(([heading]) => heading === 'Teacher preview contract'));
  const before = s04Ready();
  const mounted = await mount(t, before);
  await click(mounted, 'open-teacher');
  assert.match(mounted.node('#teacher-content').innerHTML, /rhetorical purpose|direction choice/);
  await click(mounted, 'teacher-preview');
  const html = mounted.node('#app').innerHTML;
  assert.match(html, /Teacher preview · read-only/);
  assert.match(html, /data-action="choose-ch06-statement-shape"[^>]*disabled/);
  assert.doesNotMatch(html, /data-action="deliver-ch06-statement"/);
  const target = { dataset: { action: 'choose-ch06-statement-shape', option: 'final_statement_declaration' }, closest() { return this; } };
  await mounted.handlers.click({ target, isTrusted: false, preventDefault() {} });
  await click(mounted, 'deliver-ch06-statement');
  mounted.app.moveNext();
  assert.deepEqual(mounted.state(), before);
  assert.equal(mounted.state().confidence, 0);
  assert.equal(mounted.state().applied_events.includes('ch06_s04_complete'), false);
  let delivered = recordCh06FinalStatementShape(s04Ready(), 'final_statement_declaration');
  delivered = deliverCh06FinalStatement(delivered);
  const deliveredTeacher = await mount(t, delivered);
  await click(deliveredTeacher, 'open-teacher');
  await click(deliveredTeacher, 'teacher-preview');
  assert.match(deliveredTeacher.node('#app').innerHTML, /data-action="next-scene"[^>]*disabled/);
  deliveredTeacher.app.moveNext();
  assert.deepEqual(deliveredTeacher.state(), delivered, 'Teacher preview cannot complete even after valid delivery');
});

test('S04 native controls retain keyboard focus styling and all essential content is text-only', async (t) => {
  const mounted = await mount(t, s04Ready());
  const html = mounted.node('#app').innerHTML;
  assert.match(html, /<button class="choice-button[^>]*type="button"/);
  assert.match(html, /How would you like Eliza to express her choice\?/);
  assert.doesNotMatch(html, /data-action="play-voice"|data-action="play-challenge"|<audio\b/);
  const css = await (await import('node:fs/promises')).readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /:focus-visible/);
});

test('S04 Continue routes only to the unimplemented S05 boundary after explicit delivery', async (t) => {
  let state = recordCh06FinalStatementShape(s04Ready(), 'final_statement_declaration');
  state = deliverCh06FinalStatement(state);
  const mounted = await mount(t, state);
  await click(mounted, 'next-scene');
  assert.equal(mounted.state().scene, 'ch06_s05');
  assert.ok(mounted.state().applied_events.includes('ch06_s04_complete'));
  assert.equal(mounted.state().applied_events.includes('ch06_complete'), false);
  assert.match(mounted.node('#app').innerHTML, /The Voice She Chooses/);
  assert.match(mounted.node('#app').innerHTML, /not implemented yet/);
  assert.doesNotMatch(mounted.node('#app').innerHTML, /I have more ways to speak, and the choice is mine\./);
});
