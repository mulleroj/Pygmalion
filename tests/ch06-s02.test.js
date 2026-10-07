import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createInitialState, STORAGE_KEY, completeScene, getSceneAdvanceBlock } from '../src/state.js';
import { CH06_SCENE_02, CH06_S02_REPLAY_MOMENTS, CH06_S02_TEACHER_SECTIONS, CH06_S03_BOUNDARY } from '../src/ch06-content.js';
import { AudioManager } from '../src/audio.js';

async function mount(t, savedState, hash = '#ch06_s02') {
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
  const methods = ['ensureAmbience', 'setEnabled', 'leaveScene', 'setSceneAudioReadOnly', 'playVoice'];
  const originalsAudio = Object.fromEntries(methods.map((name) => [name, AudioManager.prototype[name]]));
  const audioCalls = { ambience: [], voice: [] };
  for (const name of methods) AudioManager.prototype[name] = name === 'ensureAmbience'
    ? (sceneId) => { audioCalls.ambience.push(sceneId); return Promise.resolve(); }
    : name === 'playVoice' ? async (src) => { audioCalls.voice.push(src); }
      : () => {};
  t.after(() => { for (const [name, method] of Object.entries(originalsAudio)) if (method) AudioManager.prototype[name] = method; });
  const app = await import(`../src/app.js?ch06-s02=${Date.now()}-${Math.random()}`);
  return { app, audioCalls, handlers, node, state: () => JSON.parse(saved), location: window.location };
}

const ready = (extra = {}) => ({ ...createInitialState(), started: true, ch05_complete: true, scene: 'ch06_s02', applied_events: ['ch05_s05_complete', 'ch06_s01_complete'], ...extra });
const escapeHtml = (text) => String(text).replace(/[&<>\']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;' })[character]);

test('S02 matches locked script, provides text-first reflection and only optional available replays', async (t) => {
  const script = await readFile(new URL('../docs/chapters/ch06/SCRIPT.md', import.meta.url), 'utf8');
  for (const beat of CH06_SCENE_02.storyBeats) assert.ok(script.includes(beat.text), `locked script includes: ${beat.text}`);
  const before = ready({ origin_motivation: 'respect', applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch03_s05_complete'], credit_response: 'd11_redirect_publicly' });
  const mounted = await mount(t, before);
  const html = mounted.node('#app').innerHTML;
  assert.match(html, /The Question in the Mirror/);
  assert.match(html, /A quiet private dressing space/);
  assert.match(html, /I learned another way to speak\. I did not lose the first\./);
  assert.match(html, /A voice can change with the room\. The person choosing it is still me\./);
  assert.equal((html.match(/class="sample-card"/g) || []).length, 3);
  for (const moment of CH06_S02_REPLAY_MOMENTS) assert.ok(html.includes(escapeHtml(moment.transcript)));
  assert.match(html, /type="button" data-action="next-scene"/);
  assert.deepEqual(mounted.state(), before, 'rendering is state-neutral');
  assert.equal(CH06_SCENE_02.voice.length, 0, 'no required scene speech or challenge audio');
  assert.equal(CH06_S03_BOUNDARY.id, 'ch06_s03');
});

test('direct S02 request without S01 completion safely falls back and fabricates no progress', async (t) => {
  const before = { ...ready(), applied_events: ['ch05_s05_complete'] };
  assert.strictEqual(completeScene(before, CH06_SCENE_02), before, 'state reducer refuses S02 completion before S01');
  const mounted = await mount(t, before);
  assert.match(mounted.node('#app').innerHTML, /The Morning After/);
  assert.equal(mounted.state().scene, 'ch06_s01');
  assert.deepEqual(mounted.state().applied_events, before.applied_events);
  assert.equal(mounted.location.hash, '#ch06_s01');
});

test('S02 entry guard requires S01 completion; missing history remains completable', async (t) => {
  const before = ready();
  delete before.origin_motivation;
  delete before.practice_preference;
  delete before.credit_response;
  const mounted = await mount(t, before);
  assert.equal(getSceneAdvanceBlock({ ...before, applied_events: [] }, CH06_SCENE_02)?.includes('Complete Chapter VI Scene 01'), true);
  assert.match(mounted.node('#app').innerHTML, /I learned another way to speak/);
  assert.doesNotMatch(mounted.node('#app').innerHTML, /Earlier moments · optional replay/);
  mounted.app.moveNext();
  assert.equal(mounted.state().applied_events.filter((event) => event === 'ch06_s02_complete').length, 1);
  assert.equal(mounted.state().scene, 'ch06_s03');
});

test('historical combinations vary only the optional shelf and do not affect direction availability', async (t) => {
  const early = ready({ origin_motivation: 'opportunity' });
  const late = ready({ origin_motivation: 'learning', credit_response: 'd11_private_conversation', applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch03_s05_complete'] });
  const earlyMount = await mount(t, early);
  const lateMount = await mount(t, late);
  const earlyHtml = earlyMount.node('#app').innerHTML;
  const lateHtml = lateMount.node('#app').innerHTML;
  assert.equal((earlyHtml.match(/class="sample-card"/g) || []).length, 1);
  assert.equal((lateHtml.match(/class="sample-card"/g) || []).length, 3);
  assert.match(lateHtml, /A learning moment/);
  assert.match(lateHtml, /A Chapter V reception moment/);
  assert.equal(earlyMount.state().scene, 'ch06_s02');
  assert.equal(lateMount.state().scene, 'ch06_s02');
  assert.doesNotMatch(lateHtml, /Three Ways Forward is not available yet/);
  assert.deepEqual(earlyMount.state(), early);
  assert.deepEqual(lateMount.state(), late);
});

test('replay is read-only and exposes transcript text beside replay control', async (t) => {
  const before = ready({ origin_motivation: 'respect' });
  const mounted = await mount(t, before);
  const replay = CH06_S02_REPLAY_MOMENTS[0];
  assert.match(mounted.node('#app').innerHTML, new RegExp(`data-src="${replay.src.replaceAll('.', '\\.')}`));
  const target = { dataset: { action: 'play-voice', src: replay.src }, closest() { return this; } };
  await mounted.handlers.click({ target, isTrusted: false, preventDefault() {} });
  assert.deepEqual(mounted.audioCalls.voice, [replay.src]);
  assert.deepEqual(mounted.state(), before);
});

test('explicit Continue records S02 once, leaves signals alone, and stops at S03 boundary', async (t) => {
  const before = ready({ confidence: 2, pronunciation: 4, independence: 1 });
  const mounted = await mount(t, before);
  mounted.app.moveNext();
  const after = mounted.state();
  assert.equal(after.applied_events.filter((event) => event === 'ch06_s02_complete').length, 1);
  assert.deepEqual([after.confidence, after.pronunciation, after.independence], [2, 4, 1]);
  assert.equal(after.scene, 'ch06_s03');
  assert.match(mounted.node('#app').innerHTML, /Three Ways Forward is not available yet/);
  assert.doesNotMatch(JSON.stringify(after), /chapter6_direction|final_statement_shape|ch06_final_statement_delivered|ch06_complete|ch06_lc15_completed|ch06_d12_recorded/);
  mounted.location.hash = '#ch06_s02';
  mounted.handlers.hashchange();
  mounted.app.moveNext();
  assert.equal(mounted.state().applied_events.filter((event) => event === 'ch06_s02_complete').length, 1);
  assert.equal(mounted.state().scene, 'ch06_s03');
});

test('Teacher Mode uses locked S02 content and leaves progress unchanged', async (t) => {
  const before = ready({ origin_motivation: 'respect' });
  const mounted = await mount(t, before);
  const invoke = async (action) => { const target = { dataset: { action }, closest() { return this; }, focus() {} }; await mounted.handlers.click({ target, isTrusted: false, preventDefault() {} }); };
  await invoke('open-teacher');
  const teacherHtml = mounted.node('#teacher-content').innerHTML;
  for (const [heading, content] of CH06_S02_TEACHER_SECTIONS) {
    assert.ok(teacherHtml.includes(heading));
    assert.ok(teacherHtml.includes(content));
  }
  assert.match(teacherHtml, /no identity quiz or answer key/);
  await invoke('teacher-preview');
  assert.match(mounted.node('#app').innerHTML, /Teacher preview · read-only/);
  mounted.app.moveNext();
  assert.deepEqual(mounted.state(), before);
});

test('S02 rendered content and persisted state contain no identity-ranking contract', async (t) => {
  const mounted = await mount(t, ready({ origin_motivation: 'independence' }));
  const content = `${mounted.node('#app').innerHTML}\n${JSON.stringify(mounted.state())}`;
  assert.doesNotMatch(content, /real_voice|preferred_accent|true_identity|mirror_choice|identity_score|Which one is the real Eliza\?|old Eliza.*inferior|new Eliza.*authentic/i);
  assert.doesNotMatch(content, /chapter6_direction|final_statement_shape|ch06_final_statement_delivered|ch06_complete/);
});
