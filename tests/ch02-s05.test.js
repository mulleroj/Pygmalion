import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { AudioManager } from '../src/audio.js';
import { CH02_SCENE_05 as scene, CH02_SCENE_05_TEACHER_SECTIONS as teacher } from '../src/ch02-content.js';
import { createInitialState, setScene, applyDecision, completeChapterTwo, loadState } from '../src/state.js';

test('s05 locked book-first story, four motivation texts and ending', () => {
  assert.equal(scene.id, 'ch02_s05');
  assert.equal(scene.title, 'Why I Am Here');
  assert.deepEqual(scene.storyBeats.map(({ text }) => text), [
    'The hallway is quiet again. The first lesson can begin, but Eliza stops at the threshold.',
    'Before I begin, I want to say why I came.', 'Then say it in your own way.'
  ]);
  assert.deepEqual(scene.decision.choices.map(({ text }) => text), [
    'I want work where people listen to what I can do.',
    'I want to be heard before people decide what I am.',
    'I want to understand these forms and choose when they help.',
    'I want skills I can use without handing over my future.'
  ]);
  assert.deepEqual(scene.ending.map(({ text }) => text), [
    'I am here to learn more ways to speak. I will choose what those ways are for.',
    'The door to the lesson room stays open. Eliza enters with a plan, a question, and terms she has helped to name.'
  ]);
  assert.equal(scene.voice.length, 1);
  assert.equal(scene.voice[0].id, 'AM19C');
  assert.equal(scene.voice[0].src, './assets/audio/characters/eliza/eliza_ch02_scene05_001.mp3');
  assert.equal(scene.voice[0].inline, true);
  assert.equal(scene.voice[0].transcript, scene.ending[0].text);
  assert.ok(!JSON.stringify(scene).includes('[controlled]'));
  assert.ok(!JSON.stringify(scene).includes('[self possessed]'));
  assert.ok(!JSON.stringify(scene).includes("'ere"));
  assert.ok(!JSON.stringify(scene).includes("t' learn"));
  for (const key of ['contextual', 'sfx', 'challenge']) assert.equal(scene[key], undefined);
  for (const asset of [scene.background, scene.eliza, ...scene.supporting]) assert.ok(fs.statSync(new URL('../' + asset.src, import.meta.url)).size > 0);
});

test('each D05 value and completion writes once, preserves inherited state and survives refresh', () => {
  for (const motivation of ['opportunity', 'respect', 'learning', 'independence']) {
    const initial = { ...setScene(createInitialState(), scene.id), request_strategy: 'boundary', lesson_terms_understood: true,
      motivation_shift: true, motivation_nuance: { prior: 'respect' }, boundary_questioned: true,
      origin_motivation: 'd03_respect', confidence: 3, pronunciation: 2, independence: 4 };
    assert.equal(completeChapterTwo(initial), initial);
    const chosen = applyDecision(initial, 'D05', 'd05_' + motivation);
    assert.deepEqual(chosen, { ...initial, confirmed_motivation: motivation, decisions: { D05: 'd05_' + motivation }, applied_events: ['ch02_d05_confirmed_motivation'] });
    const complete = completeChapterTwo(chosen);
    assert.equal(scene.voice.find(voice => voice.transcript === scene.ending[0].text).src, './assets/audio/characters/eliza/eliza_ch02_scene05_001.mp3');
    assert.deepEqual(complete, { ...chosen, ch02_complete: true, applied_events: ['ch02_d05_confirmed_motivation', 'ch02_complete'] });
    assert.equal(completeChapterTwo(complete), complete);
    assert.equal(applyDecision(complete, 'D05', 'd05_learning'), complete);
    const refreshed = loadState({ getItem: () => JSON.stringify(complete) });
    assert.deepEqual(refreshed, complete);
    assert.equal(applyDecision(refreshed, 'D05', 'd05_respect'), refreshed);
    assert.equal(completeChapterTwo(refreshed), refreshed);
  }
  const initial = createInitialState();
  assert.equal(applyDecision(initial, 'D05', 'd05_opportunity'), initial);
  const entered = setScene(initial, scene.id);
  assert.equal(applyDecision(entered, 'D05', 'invalid'), entered);
  const legacy = loadState({ getItem: () => JSON.stringify({ scene: scene.id }) });
  assert.equal(legacy.confirmed_motivation, null);
  assert.equal(legacy.ch02_complete, false);
});

test('s05 Teacher follows twelve-section structure and explains perspective without assessment', () => {
  assert.equal(teacher.length, 12);
  const text = teacher.map(([, content]) => content).join(' ');
  for (const phrase of ['all four options preserve agency', 'perspective, not achievement', 'No correct answer', 'Self-definition and consent', 'read-only']) assert.ok(text.includes(phrase));
});

test('s05 composition keeps flexible columns, mobile Eliza priority and touch-size choices', () => {
  const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8').split('/* Scene five:')[1];
  assert.match(css, /grid-template-columns: minmax\(0, 1\.5fr\) minmax\(0, 1fr\)/);
  assert.match(css, /\.choice-button[^}]*min-height: 48px; overflow-wrap: anywhere/);
  assert.match(css, /max-width: 1100px[^}]*grid-template-columns: 1fr/);
  assert.match(css, /\.support-pickering \{ display: none; \}/);
  assert.doesNotMatch(css, /\.art-eliza[^}]*display: none/);
});

test('s05 decorative foreground and inherited character layers cannot receive pointer events', () => {
  const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.art-layer\s*\{[^}]*pointer-events:\s*none\s*;/);
  const sceneCss = css.split('/* Scene five:')[1];
  assert.match(sceneCss, /\.ch02-threshold \.art-support::after\s*\{[^}]*pointer-events:\s*none\s*;/);
  assert.doesNotMatch(sceneCss, /pointer-events:\s*(auto|all|initial|revert)/);
  assert.doesNotMatch(sceneCss, /(?:choice-button|audio-button|text-button)[^{]*\{[^}]*pointer-events:\s*none/);
});

test('AM19C local original has the approved generation fingerprint', () => {
  const bytes = fs.readFileSync(new URL('../assets/audio/characters/eliza/eliza_ch02_scene05_001.mp3', import.meta.url));
  assert.equal(bytes.length, 89604);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), '6830d59edf7a7aa07fa96ca245ac22ee6a84d6501b9949e8c0c9a95e7dff2149');
});

test('all four runtime D05 paths expose only the common AM19C ending; replay and Teacher preview preserve events', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; } });
  const requests = [];
  t.mock.method(AudioManager.prototype, 'playVoice', async src => { requests.push(src); });
  for (const motivation of ['opportunity', 'respect', 'learning', 'independence']) {
    let saved = JSON.stringify(setScene(createInitialState(), scene.id));
    let writes = 0;
    const nodes = new Map();
    const node = key => {
      if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
      return nodes.get(key);
    };
    const events = {};
    globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
    globalThis.window = { location: { hash: '#ch02_s05', pathname: '/' }, history: { state: { scene: scene.id } }, setTimeout(fn) { fn(); }, addEventListener() {} };
    globalThis.localStorage = { getItem() { return saved; }, setItem(key, value) { saved = value; writes++; } };
    const { render } = await import('../src/app.js?s05-am19c=' + motivation);
    const click = (action, data = {}) => events.click({ isTrusted: false, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
    assert.doesNotMatch(node('#app').innerHTML, /data-action="play-voice"/);
    await click('choose-decision', { decision: 'D05', option: 'd05_' + motivation });
    assert.equal(JSON.parse(saved).confirmed_motivation, motivation);
    assert.equal((node('#app').innerHTML.match(/data-action="play-voice"/g) || []).length, 1);
    assert.match(node('#app').innerHTML, /eliza_ch02_scene05_001\.mp3/);
    const done = saved, doneWrites = writes;
    await click('play-voice', { src: scene.voice[0].src });
    await click('play-voice', { src: scene.voice[0].src });
    await click('open-teacher'); await click('teacher-preview');
    await click('play-voice', { src: scene.voice[0].src }); render();
    assert.equal(saved, done);
    assert.equal(writes, doneWrites);
    assert.equal(requests.at(-1), scene.voice[0].src);
    assert.equal(JSON.parse(saved).applied_events.filter(id => id === 'ch02_complete').length, 1);
  }
});
