import test from 'node:test';
import { SAVE_KEY, savedProgress, readSavedProgress } from './progress-test-helpers.js';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createInitialState, finishChapterSix, loadState, STORAGE_KEY } from '../src/state.js';
import { CH06_SCENE_03, CH06_SCENE_04, CH06_SCENE_05, CH06_S05_TEACHER_SECTIONS, CH06_S05_VISUALS, CH06_S05_VISUAL_FALLBACK } from '../src/ch06-content.js';
import { resolveCh06Replay, resolveCh06Summary } from '../src/ch06-summary.js';

async function mount(t, savedState, hash = `#${savedState.scene}`) {
  const keys = ['document', 'window', 'localStorage', 'Audio'];
  const originals = Object.fromEntries(keys.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) descriptor ? Object.defineProperty(globalThis, key, descriptor) : delete globalThis[key]; });
  let saved = savedProgress(savedState);
  const nodes = new Map();
  const handlers = {};
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, {
      innerHTML: '', textContent: '', open: false, focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {},
      querySelector() { return node('teacher-close'); }, showModal() { this.open = true; }, close() { this.open = false; }
    });
    return nodes.get(key);
  };
  globalThis.document = { querySelector: node, addEventListener(name, handler) { handlers[name] = handler; } };
  globalThis.window = {
    location: { hash, pathname: '/' },
    history: {
      state: null,
      pushState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; },
      replaceState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }
    },
    setTimeout(handler) { handler(); },
    addEventListener(name, handler) { handlers[name] = handler; }
  };
  globalThis.localStorage = {
    getItem(key) { assert.equal(key, SAVE_KEY); return saved; },
    setItem(key, value) { assert.equal(key, SAVE_KEY); saved = value; }
  };
  const app = await import(`../src/app.js?ch06-s05=${Date.now()}-${Math.random()}`);
  return {
    app, handlers, node,
    state: () => readSavedProgress(saved),
    hash: () => window.location.hash,
    async navigate(nextHash) { window.location.hash = nextHash; await handlers.hashchange(); },
    async click(action, dataset = {}, isTrusted = false) {
      const target = { dataset: { action, ...dataset }, closest() { return this; }, focus() {} };
      await handlers.click({ target, isTrusted, preventDefault() {} });
    }
  };
}

class FakeAudio {
  constructor(src) { this.src = src; this.paused = true; this.volume = 1; this.muted = false; this.listeners = new Map(); this.playCalls = 0; }
  addEventListener(name, fn) { this.listeners.set(name, fn); }
  removeEventListener(name) { this.listeners.delete(name); }
  async play() { this.playCalls++; this.paused = false; }
  pause() { this.paused = true; }
}

function restoreAudioAfterTest(t) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'Audio');
  t.after(() => descriptor ? Object.defineProperty(globalThis, 'Audio', descriptor) : delete globalThis.Audio);
}

function s05Ready(direction = 'social_success', shape = 'declaration') {
  const state = createInitialState();
  return {
    ...state,
    started: true,
    ch05_complete: true,
    scene: CH06_SCENE_05.id,
    chapter6_direction: direction,
    final_statement_shape: shape,
    origin_motivation: 'learning',
    confirmed_motivation: 'opportunity',
    practice_preference: 'own_words',
    reception_register_plan: 'd10_listen_then_adjust',
    credit_response: 'd11_accept_for_now',
    future_question_style: 'direct',
    next_contact: 'pickering_first',
    applied_events: [
      'ch05_s05_complete', 'ch06_s01_complete', 'ch06_s02_complete', 'ch06_d12_recorded',
      'ch06_lc15_completed', 'ch06_s03_complete', 'ch06_final_statement_shape_recorded',
      'ch06_final_statement_delivered', 'ch06_s04_complete'
    ],
    confidence: 4,
    pronunciation: 7,
    independence: 3
  };
}

const finalLine = 'I have more ways to speak, and the choice is mine.';

test('S05 entry requires S04 completion and falls back without fabricating completion', async (t) => {
  const invalid = { ...s05Ready(), applied_events: ['ch05_s05_complete', 'ch06_s03_complete'] };
  const mounted = await mount(t, invalid);
  assert.equal(mounted.hash(), '#ch06_s04');
  assert.equal(mounted.state().scene, 'ch06_s04');
  assert.equal(Boolean(mounted.state().ch06_complete), false);
  assert.equal(mounted.state().applied_events.includes('ch06_completion_recorded'), false);
  assert.deepEqual([mounted.state().pronunciation, mounted.state().confidence, mounted.state().independence], [7, 4, 3]);
  assert.doesNotMatch(mounted.node('#app').innerHTML, /BOOK COMPLETE/);
});

test('valid S05 renders final line and all summary categories without changing saved progress', async (t) => {
  const before = s05Ready();
  const mounted = await mount(t, before);
  const html = mounted.node('#app').innerHTML;
  assert.match(html, /The Voice She Chooses/);
  assert.equal((html.match(new RegExp(finalLine, 'g')) || []).length, 1);
  for (const heading of CH06_SCENE_05.summaryHeadings) assert.equal((html.match(new RegExp(heading, 'g')) || []).length, 1);
  assert.match(html, /data-action="finish-ch06"[^>]*>Finish<\/button>/);
  assert.match(html, /data-action="play-voice" data-src="\.\/assets\/audio\/characters\/eliza\/eliza_ch06_scene05_001\.mp3" aria-label="Play Eliza’s final line"/);
  assert.doesNotMatch(html, /<audio\b[^>]*autoplay|Chapter VII|ending_score|final_state/);
  assert.deepEqual(mounted.state(), before, 'rendering S05 does not write completion, history or signals');
});

test('AM59 maps one exact approved asset and transcript across all 9 direction × shape combinations', async (t) => {
  const expectedPath = './assets/audio/characters/eliza/eliza_ch06_scene05_001.mp3';
  assert.equal(CH06_SCENE_05.voice.length, 1, 'there is exactly one shared take');
  assert.deepEqual(CH06_SCENE_05.voice[0], { id: 'AM59', src: expectedPath, transcript: finalLine, inline: true });
  assert.ok((await stat(new URL(`../${expectedPath.slice(2)}`, import.meta.url))).size > 0);
  for (const { value: direction } of CH06_SCENE_03.decision.choices) {
    for (const { value: shape } of CH06_SCENE_04.statement.shapes) {
      const mounted = await mount(t, s05Ready(direction, shape));
      const html = mounted.node('#app').innerHTML;
      assert.equal((html.match(/<figcaption>/g) || []).length, 1, `${direction}/${shape} renders one caption`);
      assert.match(html, /<figcaption>Chapter VI · The Voice She Chooses<\/figcaption>/);
      assert.equal((html.match(/data-action="play-voice"/g) || []).length, 1, `${direction}/${shape} has one replay control`);
      assert.equal((html.match(new RegExp(expectedPath.replaceAll('.', '\\.'), 'g')) || []).length, 1, `${direction}/${shape} maps only the same AM59 asset`);
      assert.equal((html.match(new RegExp(finalLine, 'g')) || []).length, 1, `${direction}/${shape} keeps one visible transcript`);
      assert.deepEqual(mounted.state(), s05Ready(direction, shape));
    }
  }
});

test('AM59 is user-triggered, uses one shared foreground instance, and Sound Off never replays it', async (t) => {
  restoreAudioAfterTest(t);
  const created = [];
  globalThis.Audio = class extends FakeAudio { constructor(src) { super(src); created.push(this); } };
  const before = s05Ready('independent_voice', 'commitment');
  const mounted = await mount(t, before);
  assert.equal(created.length, 0, 'render does not autoplay or create an audio element');
  const path = CH06_SCENE_05.voice[0].src;
  await mounted.click('play-voice', { src: path }, true);
  assert.equal(created.length, 1);
  assert.equal(created[0].src, path);
  assert.equal(created[0].paused, false);
  assert.deepEqual(mounted.state(), before, 'playback changes no choices, events, signals, rewards or completion');
  await mounted.click('play-voice', { src: path }, true);
  assert.equal(created.length, 2, 'replay creates only the replacement foreground take');
  assert.equal(created[0].paused, true, 'the prior foreground instance is stopped');
  assert.equal(created[1].paused, false);
  const afterReplay = mounted.state();
  assert.equal(afterReplay.chapter6_direction, before.chapter6_direction);
  assert.equal(afterReplay.final_statement_shape, before.final_statement_shape);
  assert.deepEqual([afterReplay.pronunciation, afterReplay.confidence, afterReplay.independence], [before.pronunciation, before.confidence, before.independence]);
  await mounted.click('toggle-sound', {}, true);
  assert.equal(created[1].paused, true, 'Sound Off stops active AM59');
  assert.equal(mounted.state().soundEnabled, false);
  await mounted.click('toggle-sound', {}, true);
  assert.equal(created[1].playCalls, 1, 'Sound On does not restart interrupted speech');
  assert.deepEqual([mounted.state().chapter6_direction, mounted.state().final_statement_shape, mounted.state().confidence], [before.chapter6_direction, before.final_statement_shape, before.confidence]);
});

test('S05 Finish remains available with sound off or after AM59 playback failure', async (t) => {
  restoreAudioAfterTest(t);
  const before = { ...s05Ready(), soundEnabled: false };
  const mounted = await mount(t, before);
  await mounted.click('play-voice', { src: CH06_SCENE_05.voice[0].src }, true);
  assert.equal(mounted.state().ch06_complete, undefined, 'attempting optional speech does not complete the story');
  await mounted.click('finish-ch06');
  assert.equal(mounted.hash(), '#book-complete');
  assert.equal(mounted.state().ch06_complete, true, 'Finish works with sound off');

  globalThis.Audio = class extends FakeAudio { async play() { this.playCalls++; throw new Error('simulated unavailable audio'); } };
  const failed = await mount(t, s05Ready());
  await failed.click('play-voice', { src: CH06_SCENE_05.voice[0].src }, true);
  await failed.click('finish-ch06');
  assert.equal(failed.hash(), '#book-complete', 'playback failure cannot block Finish');
  assert.equal(failed.state().ch06_complete, true);
});

test('S05 selects the exact approved background from chapter6_direction only', async (t) => {
  const expected = {
    social_success: './assets/images/locations/ch06/ch06_final_public_participation.webp',
    independent_voice: './assets/images/locations/ch06/ch06_final_independent_voice.webp',
    integrated_identity: './assets/images/locations/ch06/ch06_final_integrated_identity.webp'
  };
  for (const [direction, background] of Object.entries(expected)) {
    assert.equal(CH06_S05_VISUALS[direction].background.src, background);
    assert.equal((await stat(new URL(`../${background.slice(2)}`, import.meta.url))).size > 0, true);
    for (const shape of CH06_SCENE_04.statement.shapes.map(({ value }) => value)) {
      const mounted = await mount(t, s05Ready(direction, shape));
      const html = mounted.node('#app').innerHTML;
      const renderedBackground = html.match(/class="art-background"><img src="([^"]+)"/)?.[1];
      assert.equal(renderedBackground, background, `${direction}/${shape} uses its direction asset`);
      assert.equal((html.match(/class="art-layer art-eliza"/g) || []).length, 1, `${direction}/${shape} renders one Eliza layer`);
      assert.ok(html.includes(`src="${CH06_SCENE_03.eliza.src}"`), 'the approved thoughtful Eliza cutout is reused');
      assert.doesNotMatch(html, /class="supporting-character/);
      assert.ok(html.includes(CH06_S05_VISUALS[direction].compositionVariant), `${direction} has a responsive composition class`);
      assert.deepEqual(mounted.state(), s05Ready(direction, shape), `${direction}/${shape} visual rendering is read-only`);
    }
  }
});

test('missing or unknown S05 direction uses the neutral S04 plate without inventing a branch', async (t) => {
  for (const direction of [undefined, 'unrecognised_direction']) {
    const before = { ...s05Ready(), chapter6_direction: direction };
    const mounted = await mount(t, before);
    const html = mounted.node('#app').innerHTML;
    const renderedBackground = html.match(/class="art-background"><img src="([^"]+)"/)?.[1];
    assert.equal(CH06_S05_VISUAL_FALLBACK.background.src, CH06_SCENE_04.background.src);
    assert.equal(renderedBackground, CH06_SCENE_04.background.src);
    assert.doesNotMatch(html, /class="ch06-s05-direction"/);
    const restored = loadState({ getItem: () => JSON.stringify(before) });
    assert.equal(restored.chapter6_direction, undefined);
    assert.equal(Object.hasOwn(restored, 'chapter6_direction'), false, 'no missing/unknown direction is restored as a branch');
    assert.equal(Boolean(mounted.state().ch06_complete), false);
  }
});

test('S05 responsive composition classes share styles without pixel-specific rules', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.ch06-the-voice-she-chooses\.public-participation \.art-background img/);
  assert.match(css, /\.ch06-the-voice-she-chooses\.independent-voice \.art-background img/);
  assert.match(css, /\.ch06-the-voice-she-chooses\.integrated-identity \.art-eliza img/);
  assert.match(css, /@media \(max-width: 599px\)/);
  assert.doesNotMatch(css, /@media\s*\(\s*width\s*:\s*(390|430|480|768|1440)px\s*\)/);
});

test('all 3 directions × 3 statement shapes render the exact same shared final line', async (t) => {
  for (const { value: direction } of CH06_SCENE_03.decision.choices) {
    for (const { value: shape } of CH06_SCENE_04.statement.shapes) {
      const mounted = await mount(t, s05Ready(direction, shape));
      const html = mounted.node('#app').innerHTML;
      assert.equal((html.match(new RegExp(finalLine, 'g')) || []).length, 1, `${direction}/${shape}`);
      assert.equal((html.match(/class="ch06-s05-direction"/g) || []).length, 1);
      assert.doesNotMatch(html, /better ending|worse ending|best ending|bad ending|good ending/i);
      assert.deepEqual(mounted.state(), s05Ready(direction, shape));
    }
  }
});

test('summary uses canonical labels, only mapped history, and exactly the five locked headings', () => {
  const state = s05Ready('integrated_identity', 'reflection');
  state.applied_events.push('ch03_s05_complete');
  state.decisions = { D08: 'd08_listen_first', D09: 'wait_for_cue' };
  const before = structuredClone(state);
  const summary = resolveCh06Summary(state);
  assert.deepEqual(summary.map(({ heading }) => heading), CH06_SCENE_05.summaryHeadings);
  assert.match(summary[0].text, /developed from Learning to Opportunity/);
  assert.match(summary[1].text, /her own words/i);
  assert.match(summary[1].text, /I can get it back\./);
  assert.match(summary[2].text, /Accept for now/);
  assert.match(summary[2].text, /What happens to me when this is over\?/);
  assert.match(summary[3].text, /INTEGRATED IDENTITY/);
  assert.match(summary[4].text, /Reflect on what I have learned about myself\./);
  assert.doesNotMatch(summary.map(({ text }) => text).join(' '), /\b[0-9]+\b|score|grade|rank|best ending|final_state/i);
  assert.deepEqual(state, before, 'summary rendering is read-only');
});

test('missing history uses neutral copy and does not invent choices or replay moments', () => {
  const state = { ...createInitialState(), scene: CH06_SCENE_05.id };
  const before = structuredClone(state);
  const summary = resolveCh06Summary(state);
  assert.deepEqual(summary.map(({ heading }) => heading), CH06_SCENE_05.summaryHeadings);
  assert.ok(summary.every(({ text }) => text === 'No saved choice is recorded for this part of the story.'));
  assert.deepEqual(resolveCh06Replay(state), []);
  assert.deepEqual(state, before);
});

test('Finish writes ch06_complete and its guard once without changing signals or history', () => {
  const before = s05Ready();
  const complete = finishChapterSix(before);
  assert.equal(complete.ch06_complete, true);
  assert.deepEqual(complete.applied_events.filter((event) => event === 'ch06_completion_recorded'), ['ch06_completion_recorded']);
  assert.deepEqual([complete.pronunciation, complete.confidence, complete.independence], [7, 4, 3]);
  for (const key of ['chapter6_direction', 'final_statement_shape', 'origin_motivation', 'confirmed_motivation', 'motivation_shift', 'practice_preference', 'reception_register_plan', 'credit_response', 'future_question_style', 'next_contact', 'decisions']) {
    assert.equal(complete[key], before[key], `${key} remains unchanged`);
  }
  assert.ok(complete.applied_events.includes('ch06_final_statement_delivered'));
  assert.strictEqual(finishChapterSix(complete), complete, 'repeated Finish is idempotent');
  const restored = loadState({ getItem: () => JSON.stringify(complete) });
  assert.equal(restored.ch06_complete, true);
  assert.equal(restored.applied_events.filter((event) => event === 'ch06_completion_recorded').length, 1);
  const forged = loadState({ getItem: () => JSON.stringify({ ...before, ch06_complete: true }) });
  assert.equal(Boolean(forged.ch06_complete), false, 'a restored flag without both locked events is not treated as complete');
});

test('explicit Finish records Chapter VI completion; reload and revisit remain read-only', async (t) => {
  const before = { ...s05Ready(), soundEnabled: false };
  const mounted = await mount(t, before);
  await mounted.click('finish-ch06');
  const completed = mounted.state();
  assert.equal(mounted.hash(), '#book-complete');
  assert.match(mounted.node('#app').innerHTML, /<h1 id="book-complete-title">CHAPTER VI COMPLETE<\/h1>/);
  assert.equal(completed.ch06_complete, true);
  assert.deepEqual(completed.applied_events.filter((event) => event === 'ch06_completion_recorded'), ['ch06_completion_recorded']);
  assert.deepEqual([completed.pronunciation, completed.confidence, completed.independence], [7, 4, 3]);
  assert.doesNotMatch(mounted.node('#app').innerHTML, /Chapter VII|restart|Start again/i);

  const reloaded = await mount(t, completed, '#book-complete');
  assert.match(reloaded.node('#app').innerHTML, /CHAPTER VI COMPLETE/);
  assert.deepEqual(reloaded.state(), completed);
  await reloaded.navigate('#ch06_s05');
  assert.match(reloaded.node('#app').innerHTML, /The Voice She Chooses/);
  assert.doesNotMatch(reloaded.node('#app').innerHTML, /data-action="finish-ch06"/);
  assert.match(reloaded.node('#app').innerHTML, /href="#book-complete"/);
  assert.deepEqual(reloaded.state(), completed);
});

test('S05 Teacher Mode has locked content and its preview cannot Finish or mutate state', async (t) => {
  restoreAudioAfterTest(t);
  const created = [];
  globalThis.Audio = class extends FakeAudio { constructor(src) { super(src); created.push(this); } };
  assert.ok(CH06_S05_TEACHER_SECTIONS.some(([, text]) => /read-only/i.test(text)));
  for (const direction of Object.keys(CH06_S05_VISUALS)) {
    const before = s05Ready(direction, 'commitment');
    const mounted = await mount(t, before);
    await mounted.click('open-teacher');
    assert.match(mounted.node('#teacher-content').innerHTML, /There is no single correct future for Eliza/);
    await mounted.click('teacher-preview');
    const html = mounted.node('#app').innerHTML;
    assert.match(html, /Teacher preview · read-only/);
    assert.match(html, new RegExp(CH06_S05_VISUALS[direction].background.src.replaceAll('.', '\\.' )));
    assert.doesNotMatch(html, /data-action="finish-ch06"/);
    assert.match(html, /data-action="play-voice"[^>]*disabled/);
    await mounted.click('play-voice', { src: CH06_SCENE_05.voice[0].src }, true);
    assert.equal(created.length, 0, 'Teacher preview cannot start AM59');
    assert.deepEqual(mounted.state(), before, `${direction} Teacher Mode remains read-only`);
  }
});
