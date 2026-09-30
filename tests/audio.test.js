import test from 'node:test';
import assert from 'node:assert/strict';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { AudioManager, isOneShotAvailable, shouldRestartAmbience, SFX_MIX, STORY_VOICE_AMBIENCE_DUCK, CH02_AUDIO_MIX, AMBIENCE_FILES, GRAMOPHONE_CUE_TIMING } from '../src/audio.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('ambience mapping keeps one rain track continuous through scenes one to four', () => {
  assert.equal(ambienceForScene('ch01_s01'), 'covent_garden_rain_market');
  assert.equal(ambienceForScene('ch01_s02'), 'covent_garden_rain_market');
  assert.equal(ambienceForScene('ch01_s03'), 'covent_garden_rain_market');
  assert.equal(ambienceForScene('ch01_s04'), 'covent_garden_rain_market');
  assert.equal(ambienceForScene('ch01_s05'), 'covent_garden_evening_light_rain');
  assert.equal(isContinuousAmbienceTransition('ch01_s01', 'ch01_s02'), true);
  assert.equal(isContinuousAmbienceTransition('ch01_s03', 'ch01_s04'), true);
  assert.equal(isContinuousAmbienceTransition('ch01_s04', 'ch01_s05'), false);
});

test('ambience only changes track at the scene-five environment change', () => {
  assert.equal(shouldRestartAmbience('ch01_s01', 'ch01_s02'), false);
  assert.equal(shouldRestartAmbience('ch01_s02', 'ch01_s03'), false);
  assert.equal(shouldRestartAmbience('ch01_s03', 'ch01_s04'), false);
  assert.equal(shouldRestartAmbience('ch01_s04', 'ch01_s05'), true);
});

test('flowers fall is guarded as a one-shot', () => {
  const played = new Set();
  assert.equal(isOneShotAvailable(played, 'flowers_fall'), true);
  played.add('flowers_fall');
  assert.equal(isOneShotAvailable(played, 'flowers_fall'), false);
});

test('flowers fall uses full source gain and briefly ducks the rain bed', () => {
  assert.equal(SFX_MIX.flowers_fall.gain, 1);
  assert.equal(SFX_MIX.flowers_fall.ambienceDuck, 0.42);
  assert.ok(SFX_MIX.flowers_fall.ambienceDuck < 1);
});

test('flowers fall is triggered only by the s01 to s02 transition, not by scene render', () => {
  const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  assert.doesNotMatch(app, /if \(scene\.sfx\) audioManager\.playOneShot\(scene\.sfx\.id, scene\.sfx\.src\)/);
  assert.match(app, /scene\.id === 'ch01_s01' && next\.id === 'ch01_s02' && next\.sfx/);
});

test('story voice keeps more outdoor ambience than listening challenges', () => {
  assert.equal(STORY_VOICE_AMBIENCE_DUCK, 0.78);
  assert.equal(SFX_MIX.flowers_fall.ambienceDuck, 0.42);
  assert.ok(STORY_VOICE_AMBIENCE_DUCK > SFX_MIX.flowers_fall.ambienceDuck);
});

test('story voice ducking restores the rain level without restarting ambience', () => {
  const manager = new AudioManager({ duckFadeMs: 0 });
  const ambience = { volume: manager.ambienceVolume };
  manager.ambience = ambience;
  manager.duck('voice', STORY_VOICE_AMBIENCE_DUCK);
  assert.equal(ambience.volume, manager.ambienceVolume * STORY_VOICE_AMBIENCE_DUCK);
  manager.unduck('voice');
  assert.equal(ambience.volume, manager.ambienceVolume);
  assert.equal(manager.ambience, ambience);
});

class FakeAudio {
  constructor(src) {
    this.src = src;
    this.volume = 1;
    this.muted = false;
    this.paused = true;
    this.playCalls = 0;
    this.pauseCalls = 0;
    this.listeners = new Map();
  }
  async play() {
    this.playCalls += 1;
    if (this.failure) throw this.failure;
    if (this.pending) await this.pending;
    this.paused = false;
  }
  pause() { this.paused = true; this.pauseCalls += 1; }
  addEventListener(name, callback) {
    if (!this.listeners.has(name)) this.listeners.set(name, new Set());
    this.listeners.get(name).add(callback);
  }
  removeEventListener(name, callback) { this.listeners.get(name)?.delete(callback); }
  emit(name) {
    if (name === 'ended' || name === 'error') this.paused = true;
    for (const callback of [...(this.listeners.get(name) || [])]) callback();
  }
}

function audioHarness(t, options = {}) {
  const elements = [];
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0, soundFadeMs: 0,
    createAudio: (src) => { const element = new FakeAudio(src); elements.push(element); return element; },
    ...options });
  t.after(() => manager.dispose());
  return { manager, elements };
}

const gramophoneSpec = { id: 'gramophone_distant', src: AMBIENCE_FILES.gramophone_distant };

test('AM16 explicit replay owns speech and restores the same s03 interior; Sound on never replays it', async (t) => {
  const { manager, elements } = audioHarness(t);
  const src = './assets/audio/characters/eliza/eliza_ch02_scene03_001.mp3';
  await manager.ensureAmbience('ch02_s03');
  assert.equal(elements.length, 0);
  manager.unlock();
  await manager.ensureAmbience('ch02_s03');
  const base = manager.ambience;
  base.currentTime = 7;
  const first = await manager.playVoice(src);
  assert.equal(base.volume, 0.10 * 0.28);
  const second = await manager.playVoice(src);
  assert.equal(first.paused, true);
  assert.equal(second.paused, false);
  first.emit('ended');
  assert.equal(base.volume, 0.10 * 0.28);
  second.emit('ended');
  assert.equal(base.volume, 0.10);
  assert.equal(manager.ambience, base);
  assert.equal(base.currentTime, 7);
  assert.equal(base.playCalls, 1);
  const third = await manager.playVoice(src);
  await manager.setEnabled(false);
  assert.equal(third.paused, true);
  await manager.setEnabled(true);
  await manager.ensureAmbience('ch02_s03');
  assert.equal(third.playCalls, 1);
  assert.equal(third.paused, true);
  assert.equal(manager.contextual, null);
  assert.equal(elements.filter((item) => item.src === src).length, 3);
});

test('gramophone is a quiet non-looping cue: fade starts at 18s and stops at 21s per visit', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  assert.deepEqual(GRAMOPHONE_CUE_TIMING, { fadeOutAfterMs: 18000, fadeOutMs: 3000 });
  const { manager, elements } = audioHarness(t);
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  t.mock.timers.tick(60000);
  assert.equal(elements.length, 0); // Deep-link without gesture never consumes the cue.
  manager.unlock();
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const gramophone = manager.contextual;
  const base = manager.ambience;
  assert.equal(gramophone.loop, false);
  assert.equal(gramophone.volume, 0.012);
  assert.equal(base.loop, true);
  assert.equal(base.volume, 0.10);
  t.mock.timers.tick(18000);
  assert.equal(gramophone.volume, 0.012);
  t.mock.timers.tick(1500);
  assert.equal(gramophone.volume, 0.006);
  t.mock.timers.tick(1500);
  assert.equal(gramophone.paused, true);
  assert.equal(gramophone.volume, 0);
  assert.equal(manager.contextual, null);
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  t.mock.timers.tick(60000);
  assert.equal(elements.length, 2);
  assert.equal(gramophone.playCalls, 1);
  assert.equal(base.playCalls, 1);
  assert.equal(base.paused, false);
});

test('gramophone duck/restore cannot cancel its finite fade envelope or restart an expired cue', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  const { manager, elements } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const gramophone = manager.contextual;
  t.mock.timers.tick(19000);
  const voice = await manager.playVoice('test:AM14A');
  assert.ok(Math.abs(gramophone.volume - 0.012 * (2 / 3) * 0.10) < 1e-10);
  voice.emit('ended');
  assert.ok(Math.abs(gramophone.volume - 0.012 * (2 / 3)) < 1e-10);
  const sample = await manager.playChallenge('test:LC04');
  assert.equal(gramophone.volume, 0);
  t.mock.timers.tick(2000);
  sample.emit('ended');
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  assert.equal(manager.contextual, null);
  assert.equal(gramophone.playCalls, 1);
  assert.equal(gramophone.paused, true);
  assert.equal(manager.ambience.volume, 0.10);
  await manager.playVoice('test:after-expiry');
  assert.equal(elements.filter(({ src }) => src === gramophoneSpec.src).length, 1);
});

test('Sound off/on consumes only the active gramophone cue and never resumes it within that visit', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  const { manager, elements } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const gramophone = manager.contextual;
  await manager.setEnabled(false);
  assert.equal(gramophone.paused, true);
  assert.equal(gramophone.muted, true);
  await manager.setEnabled(true);
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  t.mock.timers.tick(25000);
  assert.equal(manager.contextual, null);
  assert.equal(gramophone.playCalls, 1);
  assert.equal(elements.length, 2);
  assert.equal(manager.ambience.paused, false);
});

test('Sound off consumes an already-playing gramophone even before its play promise settles', async (t) => {
  let resume;
  const gate = new Promise((resolve) => { resume = resolve; });
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    const element = new FakeAudio(src);
    if (src === gramophoneSpec.src) element.play = () => {
      element.playCalls += 1; element.paused = false; return gate;
    };
    elements.push(element); return element;
  } });
  manager.unlock();
  const entering = manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const gramophone = manager.contextual;
  assert.equal(manager.gramophoneCue.started, false);
  assert.equal(gramophone.paused, false);
  await manager.setEnabled(false);
  await manager.setEnabled(true);
  resume();
  await entering;
  assert.equal(gramophone.playCalls, 1);
  assert.equal(gramophone.paused, true);
  assert.equal(manager.contextual, null);
  assert.equal(elements.length, 2);
});

test('actually leaving s02 resets the cue while the continuous interior loop keeps its position', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  const { manager, elements } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const original = manager.contextual;
  const lateEnded = [...original.listeners.get('ended')][0];
  const base = manager.ambience;
  await manager.ensureAmbience('ch02_s03');
  assert.equal(original.paused, true);
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const returned = manager.contextual;
  assert.notEqual(returned, original);
  assert.equal(returned.loop, false);
  assert.equal(returned.playCalls, 1);
  lateEnded();
  assert.equal(manager.contextual, returned);
  assert.equal(returned.paused, false);
  assert.equal(manager.ambience, base);
  assert.equal(base.playCalls, 1);
  assert.equal(elements.length, 3);
  manager.leaveScene();
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  assert.notEqual(manager.contextual, returned);
});

test('blocked gramophone retries the same instance and starts its duration clock only after playback', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    const element = new FakeAudio(src);
    if (src === gramophoneSpec.src) element.failure = Object.assign(new Error('QA blocked'), { name: 'NotAllowedError' });
    elements.push(element); return element;
  } });
  manager.unlock();
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const gramophone = manager.contextual;
  t.mock.timers.tick(30000);
  assert.equal(manager.gramophoneCue.started, false);
  gramophone.failure = null;
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  assert.equal(manager.contextual, gramophone);
  assert.equal(elements.length, 2);
  assert.equal(gramophone.playCalls, 2);
  t.mock.timers.tick(18000);
  assert.equal(gramophone.volume, 0.012);
  t.mock.timers.tick(3000);
  assert.equal(gramophone.paused, true);
});

test('concurrent entry calls share one gramophone playback and pending playback cannot outlive a visit', async (t) => {
  let resume;
  const gate = new Promise((resolve) => { resume = resolve; });
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    const element = new FakeAudio(src);
    if (src === gramophoneSpec.src) element.pending = gate;
    elements.push(element); return element;
  } });
  manager.unlock();
  const first = manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const second = manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const gramophone = manager.contextual;
  assert.equal(gramophone.playCalls, 1);
  await manager.ensureAmbience('ch02_s03');
  resume();
  await Promise.all([first, second]);
  assert.equal(gramophone.paused, true);
  assert.equal(gramophone.muted, true);
  assert.equal(manager.contextual, null);
  assert.equal(elements.length, 2);
});

test('natural gramophone ending or load error releases the cue without automatic replay', async (t) => {
  const { manager, elements } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  const gramophone = manager.contextual;
  gramophone.emit('ended');
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  assert.equal(manager.contextual, null);
  assert.equal(elements.length, 2);
  await manager.ensureAmbience('ch02_s03');
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  manager.contextual.emit('error');
  await manager.ensureAmbience('ch02_s02', gramophoneSpec);
  assert.equal(manager.contextual, null);
  assert.equal(elements.length, 3);
});

test('Chapter II uses approved street/interior mapping and prepares uninterrupted s02-s05 continuity', () => {
  assert.equal(ambienceForScene('ch02_s01'), 'higgins_house_morning_entry');
  for (const id of ['ch02_s02', 'ch02_s03', 'ch02_s04', 'ch02_s05']) assert.equal(ambienceForScene(id), 'higgins_house_interior');
  assert.equal(shouldRestartAmbience('ch02_s01', 'ch02_s02'), true);
  assert.equal(shouldRestartAmbience('ch02_s02', 'ch02_s03'), false);
  assert.equal(isContinuousAmbienceTransition('ch02_s02', 'ch02_s05'), true);
  assert.equal(isContinuousAmbienceTransition('ch02_s01', 'ch02_s02'), false);
  assert.equal(ambienceForScene('ch02_unknown'), null);
  assert.equal(AMBIENCE_FILES.higgins_house_morning_entry, './assets/audio/ambience/higgins_house_morning_entry.mp3');
  assert.equal(AMBIENCE_FILES.higgins_house_interior, './assets/audio/ambience/higgins_house_interior.mp3');
});

test('Chapter II story/sample mix ducks both layers and restores without restarting the interior', async (t) => {
  assert.deepEqual(CH02_AUDIO_MIX, { ambience: 0.10, contextual: 0.012, storyDuck: 0.28,
    storyContextualDuck: 0.10, challengeDuck: 0.08, challengeContextualDuck: 0 });
  const { manager, elements } = audioHarness(t);
  const context = { id: 'gramophone_distant', src: AMBIENCE_FILES.gramophone_distant };
  manager.unlock();
  await manager.ensureAmbience('ch02_s02', context);
  assert.equal(elements.length, 2); // Scene entry never creates or plays speech.
  const base = manager.ambience;
  const contextual = manager.contextual;
  const voice = await manager.playVoice('test:AM14A');
  assert.equal(base.volume, 0.10 * 0.28);
  assert.equal(contextual.volume, 0.012 * 0.10);
  const sample = await manager.playChallenge('test:LC04');
  assert.equal(voice.paused, true);
  assert.equal(base.volume, 0.10 * 0.08);
  assert.equal(contextual.volume, 0);
  sample.emit('ended');
  assert.equal(base.volume, 0.10);
  assert.equal(contextual.volume, 0.012);
  await manager.ensureAmbience('ch02_s03');
  await manager.ensureAmbience('ch02_s04');
  await manager.ensureAmbience('ch02_s05');
  assert.equal(manager.ambience, base);
  assert.equal(base.playCalls, 1);
  assert.equal(base.pauseCalls, 0);
  assert.equal(contextual.paused, true);
});

test('missing Chapter II loops and samples fail safely without Chapter I rain fallback', async (t) => {
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    const element = new FakeAudio(src); element.failure = new Error('QA 404'); elements.push(element); return element;
  } });
  manager.unlock();
  assert.equal((await manager.ensureAmbience('ch02_s02', { id: 'gramophone_distant', src: AMBIENCE_FILES.gramophone_distant })).blocked, true);
  await manager.playChallenge('./assets/audio/listening/ch02_lc04_001.mp3');
  assert.equal(manager.foreground, null);
  assert.equal(manager.activeDucks.size, 0);
  assert.ok(elements.every(({ src }) => !src.includes('covent-garden')));
});

test('a fresh or refreshed session requires a conscious gesture, not a saved sound preference', async (t) => {
  const { manager, elements } = audioHarness(t);
  await manager.setEnabled(true);
  await manager.ensureAmbience('ch01_s01');
  assert.equal(await manager.playVoice('test:voice'), null);
  assert.equal(await manager.playChallenge('test:sample'), null);
  assert.equal(await manager.playOneShot('flowers_fall', 'test:sfx'), false);
  assert.equal(elements.length, 0);
  manager.unlock();
  await manager.ensureAmbience('ch01_s01');
  assert.equal(elements.length, 1);
  assert.equal(elements[0].playCalls, 1);
});

test('blocked autoplay recovers on the same loop instance after a later gesture', async (t) => {
  const statuses = [];
  const { manager, elements } = audioHarness(t, {
    onStatus: (status) => statuses.push(status),
    createAudio: (src) => {
      const element = new FakeAudio(src);
      element.failure = Object.assign(new Error('Gesture required'), { name: 'NotAllowedError' });
      elements.push(element);
      return element;
    }
  });
  manager.unlock();
  assert.equal((await manager.ensureAmbience('ch01_s01')).blocked, true);
  const loop = elements[0];
  assert.equal(statuses.at(-1).type, 'blocked');
  loop.failure = null;
  manager.unlock();
  assert.equal((await manager.ensureAmbience('ch01_s01')).blocked, false);
  assert.equal(elements.length, 1);
  assert.equal(loop.playCalls, 2);
  assert.equal(loop.paused, false);
});

test('Sound off during pending loop play prevents a late audible restart', async (t) => {
  let resume;
  const gate = new Promise((resolve) => { resume = resolve; });
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    const loop = new FakeAudio(src); loop.pending = gate; elements.push(loop); return loop;
  } });
  manager.unlock();
  const request = manager.ensureAmbience('ch01_s01');
  await manager.setEnabled(false);
  resume();
  await request;
  assert.equal(elements[0].paused, true);
  assert.equal(elements[0].muted, true);
  assert.equal(elements[0].volume, 0);
});

test('same base loop stays continuous across scenes and independent contextual changes', async (t) => {
  const { manager, elements } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch01_s01');
  const base = manager.ambience;
  await manager.ensureAmbience('ch01_s02', { id: 'test-context', src: 'test:context' });
  const contextual = manager.contextual;
  await manager.ensureAmbience('ch01_s03');
  assert.equal(manager.ambience, base);
  assert.equal(base.playCalls, 1);
  assert.equal(base.pauseCalls, 0);
  assert.equal(contextual.paused, true);
  assert.equal(manager.contextual, null);
  assert.equal(elements.length, 2);
});

test('concurrent ensure calls share one in-flight loop play', async (t) => {
  let resume;
  const gate = new Promise((resolve) => { resume = resolve; });
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    const loop = new FakeAudio(src); loop.pending = gate; elements.push(loop); return loop;
  } });
  manager.unlock();
  const first = manager.ensureAmbience('ch01_s01');
  const second = manager.ensureAmbience('ch01_s01');
  assert.equal(elements.length, 1);
  assert.equal(elements[0].playCalls, 1);
  resume();
  await Promise.all([first, second]);
});

test('new foreground owns ducking and late events cannot restore under a newer sample', async (t) => {
  const { manager } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch01_s01', { id: 'test-context', src: 'test:context' });
  const voice = await manager.playVoice('test:voice');
  const lateEnded = [...voice.listeners.get('ended')][0];
  assert.equal(manager.ambience.volume, 0.18 * 0.78);
  const sample = await manager.playChallenge('test:sample');
  assert.equal(voice.paused, true);
  assert.equal(voice.muted, true);
  assert.equal(manager.foreground.element, sample);
  assert.equal(manager.ambience.volume, 0.18 * 0.32);
  assert.equal(manager.contextual.volume, 0);
  lateEnded();
  assert.equal(manager.ambience.volume, 0.18 * 0.32);
  sample.emit('ended');
  assert.equal(manager.foreground, null);
  assert.equal(manager.ambience.volume, 0.18);
  assert.equal(manager.contextual.volume, 0.025);
});

test('late resolution of replaced foreground play cannot leak audible speech', async (t) => {
  let resume;
  const gate = new Promise((resolve) => { resume = resolve; });
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    const clip = new FakeAudio(src);
    if (src === 'test:old') clip.pending = gate;
    elements.push(clip); return clip;
  } });
  manager.unlock();
  const oldRequest = manager.playVoice('test:old');
  const sample = await manager.playChallenge('test:new');
  resume();
  const old = await oldRequest;
  assert.equal(old.paused, true);
  assert.equal(old.muted, true);
  assert.equal(manager.foreground.element, sample);
  assert.equal(sample.paused, false);
});

test('Sound off stops speech and both loops; on resumes loops only without duplicates', async (t) => {
  const { manager, elements } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch01_s01', { id: 'test-context', src: 'test:context' });
  const voice = await manager.playVoice('test:voice');
  await manager.setEnabled(false);
  for (const element of elements) {
    assert.equal(element.paused, true);
    assert.equal(element.muted, true);
  }
  await manager.setEnabled(true);
  await manager.ensureAmbience('ch01_s01', manager.contextualSpec);
  assert.equal(elements.length, 3);
  assert.equal(voice.paused, true);
  assert.equal(voice.playCalls, 1);
  assert.equal(manager.ambience.paused, false);
  assert.equal(manager.contextual.paused, false);
});

test('Sound off also stops one-shot SFX and foreground takes priority over SFX', async (t) => {
  const { manager, elements } = audioHarness(t);
  manager.unlock();
  await manager.playOneShot('flowers_fall', 'test:sfx');
  const sfx = elements[0];
  await manager.setEnabled(false);
  assert.equal(sfx.paused, true);
  assert.equal(sfx.muted, true);
  assert.equal(manager.oneShots.size, 0);
  await manager.setEnabled(true);
  await manager.playVoice('test:voice');
  assert.equal(await manager.playOneShot('other-sfx', 'test:sfx'), false);
});

test('missing speech safely releases its duck and failed SFX can be retried', async (t) => {
  const { manager } = audioHarness(t, { createAudio: (src) => {
    const element = new FakeAudio(src);
    if (src.startsWith('test:missing')) element.failure = new Error('Missing audio');
    return element;
  } });
  manager.unlock();
  await manager.ensureAmbience('ch01_s01');
  await manager.playChallenge('test:missing-sample');
  assert.equal(manager.foreground, null);
  assert.equal(manager.ambience.volume, 0.18);
  assert.equal(await manager.playOneShot('flowers_fall', 'test:missing-sfx'), false);
  assert.equal(await manager.playOneShot('flowers_fall', 'test:available-sfx'), true);
});

test('construction failure never leaves the previous scene loop running', async (t) => {
  const { manager, elements } = audioHarness(t, { createAudio: (src) => {
    if (src.includes('evening')) throw new Error('Unavailable audio');
    const element = new FakeAudio(src); elements.push(element); return element;
  } });
  manager.unlock();
  await manager.ensureAmbience('ch01_s01');
  assert.equal((await manager.ensureAmbience('ch01_s05')).blocked, true);
  assert.equal(elements[0].paused, true);
  assert.equal(manager.ambience, null);
});

test('crossfade and ducking use one cancellable volume ramp per element', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  const { manager } = audioHarness(t, { fadeMs: 100, duckFadeMs: 40 });
  manager.unlock();
  await manager.ensureAmbience('ch01_s01');
  t.mock.timers.tick(100);
  const outgoing = manager.ambience;
  await manager.ensureAmbience('ch01_s05');
  const incoming = manager.ambience;
  t.mock.timers.tick(40);
  assert.ok(outgoing.volume > 0 && outgoing.volume < 0.18);
  assert.ok(incoming.volume > 0 && incoming.volume < 0.18);
  await manager.playChallenge('test:sample');
  assert.equal(manager.fades.size, 2);
  t.mock.timers.tick(100);
  await Promise.resolve();
  assert.equal(outgoing.paused, true);
  assert.equal(incoming.volume, 0.18 * 0.32);
  assert.equal(manager.fades.size, 0);
});

test('rapid Sound off/on cancels the fade-out without pausing the resumed loop', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  const { manager, elements } = audioHarness(t, { fadeMs: 100, duckFadeMs: 40, soundFadeMs: 40 });
  manager.unlock();
  await manager.ensureAmbience('ch01_s01');
  t.mock.timers.tick(100);
  const off = manager.setEnabled(false);
  t.mock.timers.tick(20);
  await manager.setEnabled(true);
  t.mock.timers.tick(100);
  await off;
  assert.equal(elements.length, 1);
  assert.equal(elements[0].paused, false);
  assert.equal(elements[0].muted, false);
  assert.equal(elements[0].volume, 0.18);
  assert.equal(elements[0].playCalls, 1);
});

test('Teacher controls and read-only review are not audio-unlock gestures', () => {
  const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  const unlockActions = app.split('const AUDIO_UNLOCK_ACTIONS = new Set([')[1].split(']);')[0];
  assert.doesNotMatch(unlockActions, /open-teacher|close-teacher|teacher-preview|review-scene/);
  assert.match(app, /event\.isTrusted && AUDIO_UNLOCK_ACTIONS\.has\(action\)/);
  assert.doesNotMatch(fs.readFileSync(path.join(root, 'src/audio.js'), 'utf8'), /setTimeout\(/);
});
