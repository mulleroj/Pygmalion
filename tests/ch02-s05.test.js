import test from 'node:test';
import { SAVE_KEY, savedProgress, readSavedProgress } from './progress-test-helpers.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { AudioManager } from '../src/audio.js';
import { CH02_SCENE_05 as scene, CH02_SCENE_05_TEACHER_SECTIONS as teacher } from '../src/ch02-content.js';
import { createInitialState, setScene, applyDecision, recordLc03Answer, recordLc04Answer, completeS04Terms, completeChapterTwo, loadState } from '../src/state.js';

function validChapterTwoBeforeD05() {
  let state = setScene(createInitialState(), 'ch02_s01');
  state = applyDecision(state, 'D04', 'd04_request_with_boundary');
  state = recordLc03Answer(state, 'lc03_clear_polite_request');
  state = setScene(state, 'ch02_s02');
  for (const [sample, answer] of [['lc04_sample_offer', 'lc04_offer'], ['lc04_sample_evaluation', 'lc04_evaluation'], ['lc04_sample_condition', 'lc04_condition']]) {
    state = recordLc04Answer(state, sample, answer);
  }
  state = setScene(state, 'ch02_s03');
  state = setScene(state, 'ch02_s04');
  state = completeS04Terms(state);
  return setScene(state, 'ch02_s05');
}

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
    const initial = { ...validChapterTwoBeforeD05(), request_strategy: 'boundary', lesson_terms_understood: true,
      motivation_shift: true, motivation_nuance: { prior: 'respect' }, boundary_questioned: true,
      origin_motivation: 'd03_respect', confidence: 3, pronunciation: 2, independence: 4 };
    assert.equal(completeChapterTwo(initial), initial);
    const chosen = applyDecision(initial, 'D05', 'd05_' + motivation);
    assert.deepEqual(chosen, { ...initial, confirmed_motivation: motivation, decisions: { ...initial.decisions, D05: 'd05_' + motivation }, applied_events: [...initial.applied_events, 'ch02_d05_confirmed_motivation'] });
    const complete = completeChapterTwo(chosen);
    assert.equal(scene.voice.find(voice => voice.transcript === scene.ending[0].text).src, './assets/audio/characters/eliza/eliza_ch02_scene05_001.mp3');
    assert.deepEqual(complete, { ...chosen, ch02_complete: true, applied_events: [...chosen.applied_events, 'ch02_complete'] });
    assert.equal(completeChapterTwo(complete), complete);
    assert.equal(applyDecision(complete, 'D05', 'd05_learning'), complete);
    const refreshed = loadState({ getItem: () => JSON.stringify(complete) });
    assert.deepEqual(refreshed, complete);
    assert.equal(applyDecision(refreshed, 'D05', 'd05_respect'), refreshed);
    assert.equal(completeChapterTwo(refreshed), refreshed);
    const missingCompletionEvent = { ...refreshed, ch02_complete: false, applied_events: refreshed.applied_events.filter((id) => id !== 'ch02_complete') };
    const recovered = completeChapterTwo(missingCompletionEvent);
    assert.equal(recovered.ch02_complete, true, 'a saved D05 and all prior required events repair only the missing completion event');
    assert.equal(recovered.applied_events.filter((id) => id === 'ch02_complete').length, 1);
    assert.equal(recovered.confidence, refreshed.confidence);
    assert.equal(recovered.pronunciation, refreshed.pronunciation);
    assert.equal(recovered.independence, refreshed.independence);
  }
  const initial = createInitialState();
  assert.equal(applyDecision(initial, 'D05', 'd05_opportunity'), initial);
  const entered = setScene(initial, scene.id);
  assert.equal(applyDecision(entered, 'D05', 'invalid'), entered);
  const skippedChallenges = { ...validChapterTwoBeforeD05(), ch02_lc04_completed: false,
    applied_events: validChapterTwoBeforeD05().applied_events.filter((id) => id !== 'ch02_lc04_completed') };
  const prematureChoice = applyDecision(skippedChallenges, 'D05', 'd05_respect');
  assert.equal(completeChapterTwo(prematureChoice), prematureChoice, 'D05 alone cannot complete Chapter II when LC04 is incomplete');
  const legacy = loadState({ getItem: () => JSON.stringify({ scene: scene.id }) });
  assert.equal(legacy.confirmed_motivation, null);
  assert.equal(legacy.ch02_complete, false);
});

test('Chapter III hash entry blocks incomplete Chapter II and repairs only a proven saved D05 completion', async (t) => {
  const originals = Object.fromEntries(['document', 'window', 'localStorage'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) { if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; } });
  const mount = async (savedState, hash, importKey) => {
    let saved = savedProgress(savedState);
    const nodes = new Map(), events = {}, scrollCalls = [], focusCalls = [], scrollRoot = { scrollTop: 0, scrollTo(options) { this.scrollTop = options.top; } };
    const node = (key) => {
      if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus(options) { focusCalls.push({ key, options }); }, scrollIntoView(options) { scrollCalls.push({ key, options }); }, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
      return nodes.get(key);
    };
    globalThis.document = { querySelector: node, scrollingElement: scrollRoot, addEventListener(name, fn) { events[name] = fn; } };
    globalThis.window = { location: { hash, pathname: '/' }, history: { state: { scene: savedState.scene }, scrollRestoration: 'auto', pushState(value, unused, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(value, unused, url) { this.pushState(value, unused, url); } }, setTimeout(fn) { fn(); }, requestAnimationFrame(fn) { fn(); return 1; }, addEventListener() {} };
    globalThis.localStorage = { getItem() { return saved; }, setItem(key, value) { saved = value; } };
    const runtime = await import(`../src/app.js?ch02-transition-${importKey}`);
    return { runtime, events, node, scrollCalls, focusCalls, scrollRoot, getSaved: () => readSavedProgress(saved), click(action) { events.click({ isTrusted: false, target: { closest() { return { dataset: { action }, focus() {} }; } } }); } };
  };

  const skipped = validChapterTwoBeforeD05();
  skipped.ch02_lc04_completed = false;
  skipped.applied_events = skipped.applied_events.filter((id) => id !== 'ch02_lc04_completed');
  const premature = applyDecision(skipped, 'D05', 'd05_respect');
  const blocked = await mount(premature, '#ch03_s01', 'incomplete');
  assert.equal(window.location.hash, '#ch02_s05');
  assert.equal(blocked.node('#app').innerHTML.includes('The Mouth Is a Muscle'), false);
  assert.equal(blocked.node('#app').innerHTML.includes('data-action="enter-ch03"'), false);
  assert.equal(blocked.getSaved().ch02_complete, false);
  assert.equal(blocked.getSaved().applied_events.includes('ch02_complete'), false);

  const withChoice = applyDecision(validChapterTwoBeforeD05(), 'D05', 'd05_learning');
  const olderSave = { ...completeChapterTwo(withChoice), ch02_complete: false,
    applied_events: completeChapterTwo(withChoice).applied_events.filter((id) => id !== 'ch02_complete') };
  const restored = await mount(olderSave, '#ch03_s01', 'legacy-save');
  assert.equal(window.location.hash, '#ch02_s05', 'a saved D05 choice returns to the final Chapter II scene for explicit recovery');
  assert.equal(restored.getSaved().ch02_complete, false, 'restore itself does not create the completion event');
  assert.equal(restored.getSaved().applied_events.filter((id) => id === 'ch02_complete').length, 0);
  const continueMarkup = restored.node('#app').innerHTML.match(/<button class="secondary-button"[^>]*data-action="enter-ch03"[^>]*>/)?.[0];
  assert.ok(continueMarkup, 'restored D05 save offers an enabled semantic button');
  assert.equal(restored.scrollCalls.at(-1).key, '[data-action="enter-ch03"]', 'restoration brings Continue into view once');
  assert.deepEqual(restored.scrollCalls.at(-1).options, { block: 'center', behavior: 'instant' });
  assert.equal(restored.getSaved().confirmed_motivation, 'learning');
  assert.equal(restored.getSaved().decisions.D05, 'd05_learning');
  const scrollCountBeforeTeacher = restored.scrollCalls.length;
  restored.scrollRoot.scrollTop = 860;
  restored.click('open-teacher'); restored.click('teacher-preview');
  assert.deepEqual(restored.scrollCalls.length, scrollCountBeforeTeacher, 'Teacher preview does not move the restored viewport');
  assert.equal(restored.scrollRoot.scrollTop, 860, 'Teacher preview preserves the current scroll offset');
  assert.ok(restored.focusCalls.some(({ key, options }) => key === '#story-root' && options?.preventScroll), 'Teacher preview focus preserves scroll position');
  restored.click('return-student');
  assert.equal(restored.scrollCalls.length, scrollCountBeforeTeacher, 'returning from preview does not move the viewport');
  assert.equal(restored.scrollRoot.scrollTop, 860, 'returning from Teacher preview preserves the current scroll offset');
  const signalsBeforeContinue = ['pronunciation', 'confidence', 'independence'].map((signal) => restored.getSaved()[signal]);
  assert.equal(restored.getSaved().ch02_complete, false, 'Teacher interactions do not complete the chapter');
  restored.click('enter-ch03');
  const entered = restored.getSaved();
  assert.equal(window.location.hash, '#ch03_s01');
  assert.equal(entered.scene, 'ch03_s01');
  assert.equal(entered.ch02_complete, true);
  assert.equal(entered.applied_events.filter((id) => id === 'ch02_complete').length, 1);
  assert.equal(entered.confirmed_motivation, 'learning');
  assert.deepEqual(['pronunciation', 'confidence', 'independence'].map((signal) => entered[signal]), signalsBeforeContinue);
  assert.equal(restored.node('#app').innerHTML.includes('The Mouth Is a Muscle'), true);
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
  const actionScrolls = [];
  t.mock.method(AudioManager.prototype, 'playVoice', async src => { requests.push(src); });
  for (const motivation of ['opportunity', 'respect', 'learning', 'independence']) {
    let saved = savedProgress(validChapterTwoBeforeD05());
    let writes = 0;
    const nodes = new Map();
    const node = key => {
      if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView(options) { actionScrolls.push({ key, options }); }, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
      return nodes.get(key);
    };
    const events = {};
    globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
    globalThis.window = { location: { hash: '#ch02_s05', pathname: '/' }, history: { state: { scene: scene.id }, scrollRestoration: 'auto', pushState(value, unused, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(value, unused, url) { this.pushState(value, unused, url); } }, setTimeout(fn) { fn(); }, addEventListener() {} };
    globalThis.localStorage = { getItem() { return saved; }, setItem(key, value) { saved = value; writes++; } };
    const { render } = await import('../src/app.js?s05-am19c=' + motivation);
    const click = (action, data = {}) => events.click({ isTrusted: false, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
    assert.doesNotMatch(node('#app').innerHTML, /data-action="play-voice"/);
    await click('choose-decision', { decision: 'D05', option: 'd05_' + motivation });
    assert.equal(readSavedProgress(saved).confirmed_motivation, motivation);
    assert.equal(readSavedProgress(saved).ch02_complete, false, 'choosing D05 does not complete the chapter before Continue');
    assert.equal(readSavedProgress(saved).applied_events.filter(id => id === 'ch02_complete').length, 0);
    assert.equal(actionScrolls.at(-1).options.block, 'center', 'the newly available chapter action is brought into view');
    assert.equal(node('#app').innerHTML.includes('data-action="enter-ch03"'), true);
    assert.equal((node('#app').innerHTML.match(/data-action="play-voice"/g) || []).length, 1);
    assert.match(node('#app').innerHTML, /eliza_ch02_scene05_001\.mp3/);
    const done = saved, doneWrites = writes;
    await click('play-voice', { src: scene.voice[0].src });
    await click('play-voice', { src: scene.voice[0].src });
    await click('open-teacher'); await click('teacher-preview');
    assert.doesNotMatch(node('#app').innerHTML, /data-action="enter-ch03"/, 'Teacher preview cannot expose progression');
    assert.match(node('#app').innerHTML, /data-action="return-student"/);
    await click('return-student');
    await click('play-voice', { src: scene.voice[0].src }); render();
    assert.equal(saved, done);
    assert.equal(writes, doneWrites);
    assert.equal(requests.at(-1), scene.voice[0].src);
    assert.equal(readSavedProgress(saved).applied_events.filter(id => id === 'ch02_complete').length, 0, 'replays and Teacher preview do not record completion before Continue');
    const signals = ['pronunciation', 'confidence', 'independence'].map((signal) => readSavedProgress(saved)[signal]);
    await click('enter-ch03');
    const entered = readSavedProgress(saved);
    assert.equal(entered.applied_events.filter(id => id === 'ch02_complete').length, 1);
    assert.equal(window.location.hash, '#ch03_s01');
    assert.equal(entered.scene, 'ch03_s01');
    assert.equal(entered.applied_events.filter(id => id === 'ch02_complete').length, 1);
    assert.deepEqual(['pronunciation', 'confidence', 'independence'].map((signal) => entered[signal]), signals);
    assert.match(node('#app').innerHTML, /The Mouth Is a Muscle/);
  }
});
