import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createInitialState, STORAGE_KEY } from '../src/state.js';
import { CH06_SCENE_01 } from '../src/ch06-content.js';
import { AudioManager } from '../src/audio.js';

async function mount(t, savedState, hash = '') {
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
  globalThis.window = { location: { hash, pathname: '/' }, history: { state: null, pushState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(value, _title, url) { this.state = value; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(handler) { handler(); }, addEventListener() {} };
  globalThis.localStorage = { getItem(key) { assert.equal(key, STORAGE_KEY); return saved; }, setItem(key, value) { assert.equal(key, STORAGE_KEY); saved = value; } };
  const methods = ['ensureAmbience', 'setEnabled', 'leaveScene', 'setSceneAudioReadOnly'];
  const audio = Object.fromEntries(methods.map((name) => [name, AudioManager.prototype[name]]));
  for (const name of methods) AudioManager.prototype[name] = () => {};
  t.after(() => { for (const [name, method] of Object.entries(audio)) AudioManager.prototype[name] = method; });
  const app = await import(`../src/app.js?ch06-s01=${Date.now()}-${Math.random()}`);
  return { app, handlers, node, state: () => JSON.parse(saved), location: window.location };
}

const eligible = (extra = {}) => ({ ...createInitialState(), started: true, ch05_complete: true, scene: 'ch06_s01', applied_events: ['ch05_s05_complete'], ...extra });

test('S01 content matches locked script and routes only the first conversation', async () => {
  const script = await readFile(new URL('../docs/chapters/ch06/SCRIPT.md', import.meta.url), 'utf8');
  const flat = (beats) => beats.map(({ speaker, text }) => `${speaker ? `${speaker}: ` : ''}${text}`).join('\n');
  const shared = CH06_SCENE_01.storyBeats.filter(({ type }) => type !== 'contactRoute');
  for (const beat of [...shared, ...Object.values(CH06_SCENE_01.contactRoutes).flat()]) assert.ok(script.includes(beat.text), `locked script includes: ${beat.text}`);
  assert.equal(CH06_SCENE_01.id, 'ch06_s01');
  assert.deepEqual(CH06_SCENE_01.voice, []);
  assert.equal(CH06_SCENE_01.nextScene, 'ch06_s02');
  assert.equal(flat(shared).includes('Higgins'), false);
  assert.match(script, /absent or unknown values use the neutral shared opening/);
  assert.equal(CH06_SCENE_01.storyBeats.filter(({ type }) => type === 'contactRoute').length, 1);
  assert.equal(Object.keys(CH06_SCENE_01.contactRoutes).length, 3);
});

test('approved S01 background and existing character assets use the canonical visual references', async () => {
  const background = 'assets/images/locations/ch06/ch06_morning_after_room.webp';
  const assets = [background,
    'assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png',
    'assets/images/characters/higgins/runtime/higgins_master_cutout.png',
    'assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png',
    'assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png'];
  for (const asset of assets) assert.ok((await stat(new URL(`../${asset}`, import.meta.url))).size > 0, `${asset} exists`);
  assert.equal(CH06_SCENE_01.background.src, `./${background}`);
  assert.equal(CH06_SCENE_01.plate.src, CH06_SCENE_01.background.src);
  assert.equal(CH06_SCENE_01.eliza.src, `./${assets[1]}`);
  assert.equal(CH06_SCENE_01.visualRoutes.higgins_directly.supporting[0].src, `./${assets[2]}`);
  assert.equal(CH06_SCENE_01.visualRoutes.pickering_first.supporting[0].src, `./${assets[3]}`);
  assert.equal(CH06_SCENE_01.visualRoutes.mrs_pearce_first.supporting[0].src, `./${assets[4]}`);
  assert.deepEqual(CH06_SCENE_01.visualRoutes.neutral.supporting, []);
  assert.equal(CH06_SCENE_01.visualFallback, false);
});

test('valid S01 restore renders all visual routes with shared story convergence and no progress mutation', async (t) => {
  const routes = [
    ['higgins_directly', 'Higgins', 'higgins'],
    ['pickering_first', 'Pickering', 'pickering'],
    ['mrs_pearce_first', 'Mrs Pearce', 'mrs-pearce'],
    [null, null, null]
  ];
  for (const [route, speaker, companion] of routes) {
    const before = eligible({ next_contact: route });
    const mounted = await mount(t, before, '#ch06_s01');
    const html = mounted.node('#app').innerHTML;
    assert.match(html, /The Morning After/);
    assert.match(html, /The first conversation ends without choosing for Eliza/);
    assert.match(html, /I know what is possible\. I need to decide what I want\./);
    assert.match(html, new RegExp(`ch06-morning-after-${companion || 'neutral'}`));
    assert.match(html, /ch06_morning_after_room\.webp/);
    assert.match(html, /eliza_her-own-voice_thoughtful_cutout\.png/);
    if (companion) assert.match(html, new RegExp(`${companion.replace('-', '\\-')}_.*cutout\\.png`));
    if (speaker) assert.match(html, new RegExp(`class="dialogue-line ${speaker.toLowerCase().replace(' ', '-')}"`));
    else assert.doesNotMatch(html, /class="dialogue-line (higgins|pickering|mrs-pearce)"/);
    if (!companion) assert.doesNotMatch(html, /(?:higgins_master|pickering_full-body|mrs-pearce_practical-questioning)_cutout\.png/);
    assert.match(html, /type="button" data-action="next-scene"/);
    assert.doesNotMatch(html, /data-src=|<audio|Play audio/);
    assert.deepEqual(mounted.state(), before);
  }
});

test('S01 visual CSS defines scene-specific tablet/mobile layout without changing global overflow protection', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.ch06-morning-after-spread \{ grid-template-columns: minmax\(0, 1\.04fr\) minmax\(0, \.96fr\)/);
  assert.match(css, /@media \(max-width: 1023px\)[\s\S]*?\.ch06-morning-after-spread \{ grid-template-columns: minmax\(0, 1fr\); \}/);
  assert.match(css, /@media \(max-width: 599px\)[\s\S]*?\.ch06-morning-after\.storybook-art \{ min-height: 0; height: auto; aspect-ratio: 1\.35; \}/);
  assert.match(css, /\.ch06-morning-after-neutral \.art-eliza img \{ left: 40%;/);
  assert.match(css, /overflow: hidden/);
});

test('legacy save without next_contact or optional history stays eligible and uses the neutral opening', async (t) => {
  const before = eligible();
  for (const key of ['next_contact', 'origin_motivation', 'confirmed_motivation', 'motivation_shift', 'reception_register_plan', 'credit_response', 'future_question_style']) delete before[key];
  const mounted = await mount(t, before, '#ch06_s01');
  const html = mounted.node('#app').innerHTML;
  assert.match(html, /The Morning After/);
  assert.match(html, /I know what is possible\. I need to decide what I want\./);
  assert.doesNotMatch(html, /class="dialogue-line (higgins|pickering|mrs-pearce)"/);
  assert.equal(mounted.state().ch05_complete, true);
  assert.deepEqual(mounted.state().applied_events, before.applied_events);
});

test('ineligible direct hash falls back without fabricating Chapter V completion or progress', async (t) => {
  const before = { ...createInitialState(), started: true, scene: 'ch05_s03', applied_events: ['ch05_s01_complete'] };
  const mounted = await mount(t, before, '#ch06_s01');
  assert.doesNotMatch(mounted.node('#app').innerHTML, /The Morning After/);
  assert.equal(mounted.state().ch05_complete, false);
  assert.deepEqual(mounted.state().applied_events, before.applied_events);
  assert.equal(mounted.state().scene, 'ch05_s02');
  assert.equal(mounted.location.hash, '#ch05_s02');
});

test('Continue records the single completion event, preserves signals, and stops at S02 boundary', async (t) => {
  const before = eligible({ next_contact: 'pickering_first', confidence: 2, pronunciation: 3, independence: 1 });
  const mounted = await mount(t, before, '#ch06_s01');
  mounted.app.moveNext();
  const after = mounted.state();
  assert.equal(after.applied_events.filter((event) => event === 'ch06_s01_complete').length, 1);
  assert.deepEqual([after.confidence, after.pronunciation, after.independence], [2, 3, 1]);
  assert.equal(after.scene, 'ch06_s02');
  assert.equal(mounted.location.hash, '#ch06_s02');
  assert.match(mounted.node('#app').innerHTML, /The Question in the Mirror is not available yet/);
  assert.doesNotMatch(JSON.stringify(after), /D12|chapter6_direction|final_statement_shape|ch06_final_statement_delivered|ch06_complete/);
  const target = { dataset: { action: 'review-ch06-s01' }, closest() { return this; } };
  await mounted.handlers.click({ target, isTrusted: false, preventDefault() {} });
  mounted.app.moveNext();
  assert.equal(mounted.state().applied_events.filter((event) => event === 'ch06_s01_complete').length, 1);
  assert.equal(mounted.state().scene, 'ch06_s02');
});

test('Teacher Mode and read-only preview do not mutate S01 state', async (t) => {
  const before = eligible({ next_contact: 'mrs_pearce_first' });
  const mounted = await mount(t, before, '#ch06_s01');
  const click = mounted.handlers.click;
  const invoke = async (action) => { const target = { dataset: { action }, closest() { return this; }, focus() {} }; await click({ target, isTrusted: false, preventDefault() {} }); };
  await invoke('open-teacher');
  assert.match(mounted.node('#teacher-content').innerHTML, /opportunity, paid work and community work/i);
  assert.match(mounted.node('#teacher-content').innerHTML, /contextual and read-only/i);
  await invoke('teacher-preview');
  mounted.app.moveNext();
  assert.deepEqual(mounted.state(), before);
});
