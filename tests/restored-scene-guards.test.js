import test from 'node:test';
import { SAVE_KEY, savedProgress, readSavedProgress } from './progress-test-helpers.js';
import assert from 'node:assert/strict';
import { createInitialState, STORAGE_KEY } from '../src/state.js';
import { AudioManager } from '../src/audio.js';

async function restoreScene(t, savedState, hash = `#${savedState.scene}`) {
  const originals = Object.fromEntries(['document', 'window', 'localStorage'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => {
    for (const [key, descriptor] of Object.entries(originals)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });

  let saved = savedProgress(savedState);
  let writes = 0;
  const nodes = new Map();
  const events = {};
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, {
      innerHTML: '', textContent: '', open: false,
      focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {},
      querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; }
    });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, handler) { events[name] = handler; } };
  globalThis.window = {
    location: { hash, pathname: '/' },
    history: {
      state: null,
      pushState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; },
      replaceState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }
    },
    setTimeout(handler) { handler(); },
    addEventListener() {}
  };
  globalThis.localStorage = {
    getItem(key) { assert.equal(key, SAVE_KEY); return saved; },
    setItem(key, value) { assert.equal(key, SAVE_KEY); writes++; saved = value; }
  };

  const originalsAudio = Object.fromEntries(['ensureAmbience', 'setEnabled', 'leaveScene'].map((key) => [key, AudioManager.prototype[key]]));
  for (const key of Object.keys(originalsAudio)) AudioManager.prototype[key] = async () => {};
  t.after(() => { for (const [key, method] of Object.entries(originalsAudio)) AudioManager.prototype[key] = method; });

  const moduleId = `${Date.now()}-${Math.random()}`;
  const app = await import(`../src/app.js?restored-scene-test=${moduleId}`);
  const parsedState = () => readSavedProgress(saved);
  return { app, events, node, parsedState, location: window.location, history: window.history, writeCount: () => writes };
}

function unchangedProgress(before, after) {
  const { scene: _beforeScene, ...beforeProgress } = before;
  const { scene: _afterScene, ...afterProgress } = after;
  assert.deepEqual(afterProgress, beforeProgress);
}

test('restored inaccessible scenes reuse guarded routing, persist the fallback, and never fabricate progress', async (t) => {
  const ch04Blocked = { ...createInitialState(), started: true, scene: 'ch04_s05' };
  const ch04 = await restoreScene(t, ch04Blocked);
  assert.match(ch04.node('#app').innerHTML, /The Wrong Answer|After the Laughter/);
  assert.doesNotMatch(ch04.node('#app').innerHTML, /The Walk Home/);
  assert.equal(ch04.parsedState().scene, 'ch04_s04');
  assert.equal(ch04.location.hash, '#ch04_s04');
  unchangedProgress(ch04Blocked, ch04.parsedState());

  const ch04AllowedState = {
    ...createInitialState(), started: true, scene: 'ch04_s05',
    applied_events: ['ch03_s06_complete', 'ch04_s01_complete', 'ch04_s02_complete', 'ch04_s03_complete', 'ch04_s04_reflection_recorded', 'ch04_s04_complete']
  };
  const ch04Allowed = await restoreScene(t, ch04AllowedState);
  assert.match(ch04Allowed.node('#app').innerHTML, /The Walk Home/);
  assert.equal(ch04Allowed.parsedState().scene, 'ch04_s05');
  assert.deepEqual(ch04Allowed.parsedState().applied_events, ch04AllowedState.applied_events);

  const ch05BlockedState = { ...createInitialState(), started: true, scene: 'ch05_s05', credit_response: 'd11_accept_for_now' };
  const ch05Blocked = await restoreScene(t, ch05BlockedState);
  assert.match(ch05Blocked.node('#app').innerHTML, /<h1 id="scene-title">What Happens to Me Now\?<\/h1>/);
  assert.doesNotMatch(ch05Blocked.node('#app').innerHTML, /<h1 id="scene-title">Leaving the Hall<\/h1>/);
  assert.equal(ch05Blocked.parsedState().scene, 'ch05_s04');
  assert.equal(ch05Blocked.location.hash, '#ch05_s04');
  unchangedProgress(ch05BlockedState, ch05Blocked.parsedState());

  const ch05AllowedState = {
    ...createInitialState(), started: true, scene: 'ch05_s05',
    applied_events: ['ch03_s06_complete', 'ch04_s01_complete', 'ch04_s02_complete', 'ch04_s03_complete', 'ch04_s04_reflection_recorded', 'ch04_s04_complete', 'ch04_s05_complete', 'ch05_s01_complete', 'ch05_s02_complete', 'ch05_s03_complete', 'ch05_s04_complete']
  };
  const ch05Allowed = await restoreScene(t, ch05AllowedState);
  assert.match(ch05Allowed.node('#app').innerHTML, /<h1 id="scene-title">Leaving the Hall<\/h1>/);
  assert.equal(ch05Allowed.parsedState().scene, 'ch05_s05');
  assert.deepEqual(ch05Allowed.parsedState().applied_events, ch05AllowedState.applied_events);
});

test('hash navigation guards remain unchanged and do not mutate completion state', async (t) => {
  const state = { ...createInitialState(), started: true, scene: 'ch04_s05' };
  const app = await restoreScene(t, state, '#ch04_s05');
  assert.match(app.node('#app').innerHTML, /The Wrong Answer|After the Laughter/);
  assert.doesNotMatch(app.node('#app').innerHTML, /The Walk Home/);
  assert.equal(app.parsedState().scene, 'ch04_s04');
  unchangedProgress(state, app.parsedState());
});

test('Story Map derives chapter state from the save and Continue Reading restores the saved scene without writing progress', async (t) => {
  const savedState = { ...createInitialState(), started: true, scene: 'ch01_s03' };
  const cover = await restoreScene(t, savedState, '');
  assert.match(cover.node('#app').innerHTML, /CONTINUE READING/);
  assert.equal(cover.writeCount(), 0);
  const continueAction = (events) => events.click({
    isTrusted: false,
    target: { closest: (selector) => selector === '[data-action]' ? { dataset: { action: 'continue-reading' } } : null }
  });
  await continueAction(cover.events);
  assert.equal(cover.location.hash, '#ch01_s03');
  assert.equal(cover.writeCount(), 0);

  const map = await restoreScene(t, savedState, '#story-map');
  const markup = map.node('#app').innerHTML;
  assert.equal((markup.match(/class="chapter-card"/g) || []).length, 6);
  assert.match(markup, /The Flower Girl/);
  assert.match(markup, /In progress/);
  assert.match(markup, /Not started/);
  assert.equal((markup.match(/data-action="open-chapter"/g) || []).length, 5);
  assert.equal(map.writeCount(), 0);
  assert.equal(map.parsedState().scene, 'ch01_s03');

  await map.events.click({ isTrusted: false, target: { closest: (selector) => selector === '[data-action]' ? { dataset: { action: 'open-story-map' } } : null } });
  assert.equal(map.location.hash, '#story-map');
  assert.equal(map.writeCount(), 0);
  await continueAction(map.events);
  assert.equal(map.location.hash, '#ch01_s03');
  assert.equal(map.parsedState().scene, 'ch01_s03');
  assert.equal(map.writeCount(), 0);
});
