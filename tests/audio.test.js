import test from 'node:test';
import assert from 'node:assert/strict';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { AudioManager, isOneShotAvailable, shouldRestartAmbience, SFX_MIX, STORY_VOICE_AMBIENCE_DUCK, CH02_AUDIO_MIX, AMBIENCE_FILES, GRAMOPHONE_CUE_TIMING } from '../src/audio.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH03_SCENE_03 } from '../src/ch03-content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function mp3Mpeg1Layer3Duration(bytes) {
  const bitrateKbps = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
  let offset = 0, frames = 0;
  if (bytes.subarray(0, 3).toString('ascii') === 'ID3') {
    const size = ((bytes[6] & 0x7f) << 21) | ((bytes[7] & 0x7f) << 14) | ((bytes[8] & 0x7f) << 7) | (bytes[9] & 0x7f);
    offset = 10 + size + ((bytes[5] & 0x10) ? 10 : 0);
  }
  while (offset + 4 <= bytes.length) {
    assert.equal(bytes[offset], 0xff, `bad MPEG frame sync at byte ${offset}`);
    assert.equal(bytes[offset + 1] & 0xe0, 0xe0, `bad MPEG frame sync at byte ${offset}`);
    const header = bytes.readUInt32BE(offset);
    const version = (header >>> 19) & 0x3, layer = (header >>> 17) & 0x3;
    const bitrateIndex = (header >>> 12) & 0xf, sampleRateIndex = (header >>> 10) & 0x3;
    const padding = (header >>> 9) & 0x1;
    assert.equal(version, 3, 'expected MPEG-1');
    assert.equal(layer, 1, 'expected Layer III');
    assert.equal(sampleRateIndex, 0, 'expected 44.1 kHz');
    assert.ok(bitrateIndex > 0 && bitrateIndex < 15, 'expected valid bitrate');
    offset += Math.floor(144 * bitrateKbps[bitrateIndex] * 1000 / 44100) + padding;
    frames++;
  }
  assert.equal(offset, bytes.length, 'MP3 ends on a complete frame');
  return frames * 1152 / 44100;
}

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

test('AM15 and AM16 replace each other in both directions without stale restores or loop restarts', async (t) => {
  const { manager, elements } = audioHarness(t);
  const pearce = './assets/audio/characters/mrs-pearce/mrs-pearce_ch02_scene03_001.mp3';
  const eliza = './assets/audio/characters/eliza/eliza_ch02_scene03_001.mp3';
  await manager.ensureAmbience('ch02_s03');
  assert.equal(elements.length, 0);
  manager.unlock();
  await manager.ensureAmbience('ch02_s03');
  const base = manager.ambience;
  base.currentTime = 9;
  let previous;
  for (const src of [pearce, eliza, pearce, pearce, eliza]) {
    const current = await manager.playVoice(src);
    if (previous) { assert.equal(previous.paused, true); previous.emit('ended'); previous.emit('error'); }
    assert.equal(current.paused, false);
    assert.equal(base.volume, 0.10 * 0.28);
    assert.equal(elements.filter((audio) => audio !== base && !audio.paused).length, 1);
    previous = current;
  }
  previous.emit('ended');
  assert.equal(base.volume, 0.10);
  assert.equal(manager.ambience, base);
  assert.equal(base.currentTime, 9);
  assert.equal(base.playCalls, 1);
  for (const src of [pearce, eliza]) {
    const voice = await manager.playVoice(src);
    await manager.setEnabled(false);
    assert.equal(voice.paused, true);
    await manager.setEnabled(true);
    await manager.ensureAmbience('ch02_s03');
    assert.equal(voice.paused, true);
    assert.equal(voice.playCalls, 1);
  }
  assert.equal(manager.contextual, null);
});

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

test('AM17 uses the Chapter II story mix, restores interior and replays the same asset after sound on', async (t) => {
  t.mock.timers.enable({ apis: ['Date', 'setInterval'] });
  const { CH02_SCENE_04 } = await import('../src/ch02-content.js');
  const { manager } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch02_s03');
  const base = manager.ambience;
  base.currentTime = 8;
  await manager.ensureAmbience('ch02_s04', CH02_SCENE_04.contextual);
  const gramophone = manager.contextual;
  assert.equal(manager.ambience, base);
  assert.equal(gramophone.src, AMBIENCE_FILES.gramophone_distant);
  assert.equal(gramophone.loop, false);
  assert.equal(gramophone.volume, 0.012);
  const src = CH02_SCENE_04.voice[0].src;
  const voice = await manager.playVoice(src);
  assert.equal(voice.src, src);
  assert.equal(base.volume, 0.10 * 0.28);
  assert.equal(gramophone.volume, 0.012 * 0.10);
  voice.emit('ended');
  assert.equal(base.volume, 0.10);
  assert.equal(gramophone.volume, 0.012);
  const replay = await manager.playVoice(src);
  assert.equal(replay.src, src);
  await manager.setEnabled(false);
  assert.equal(replay.paused, true);
  assert.equal(await manager.playVoice(src), null);
  await manager.setEnabled(true);
  assert.equal(manager.foreground, null);
  assert.equal(manager.ambience, base);
  assert.equal(base.currentTime, 8);
  assert.equal(base.volume, 0.10);
  assert.equal((await manager.playVoice(src)).src, src);
  assert.equal(gramophone.playCalls, 1);
  assert.equal(gramophone.paused, true);
  await manager.ensureAmbience('ch02_s03');
  await manager.ensureAmbience('ch02_s04', CH02_SCENE_04.contextual);
  assert.notEqual(manager.contextual, gramophone);
  assert.equal(manager.ambience, base);
  const newCue = manager.contextual;
  t.mock.timers.tick(21000);
  assert.equal(newCue.paused, true);
  await manager.ensureAmbience('ch02_s04', CH02_SCENE_04.contextual);
  assert.equal(newCue.playCalls, 1);
});

test('AM19C shares the dry story mix, replays safely and never inherits s04 cues', async (t) => {
  const { CH02_SCENE_04, CH02_SCENE_05 } = await import('../src/ch02-content.js');
  const { manager } = audioHarness(t);
  manager.unlock();
  await manager.ensureAmbience('ch02_s04', CH02_SCENE_04.contextual);
  const base = manager.ambience;
  base.currentTime = 9;
  await manager.ensureAmbience('ch02_s05');
  assert.equal(manager.ambience, base);
  assert.equal(manager.contextual, null);
  const src = CH02_SCENE_05.voice[0].src;
  const voice = await manager.playVoice(src);
  assert.equal(voice.src, src);
  assert.equal(voice.volume, 1);
  assert.equal(base.volume, 0.10 * 0.28);
  voice.emit('ended');
  assert.equal(base.volume, 0.10);
  const replay = await manager.playVoice(src);
  assert.equal(replay.src, src);
  await manager.setEnabled(false);
  assert.equal(replay.paused, true);
  assert.equal(await manager.playVoice(src), null);
  await manager.setEnabled(true);
  assert.equal(manager.foreground, null);
  assert.equal(manager.ambience, base);
  assert.equal(base.currentTime, 9);
  assert.equal((await manager.playVoice(src)).src, src);
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
});

test('S01, S02 and S03 use only the canonical Chapter III lesson room loop', async t => {
  assert.equal(ambienceForScene('ch03_s01'), 'ch03_lesson_room');
  assert.equal(ambienceForScene('ch03_s02'), 'ch03_lesson_room');
  assert.equal(ambienceForScene('ch03_s03'), 'ch03_lesson_room');
  assert.equal(AMBIENCE_FILES.ch03_lesson_room, './assets/audio/ambience/ch03_higgins_house_lesson_ambient.mp3');
  assert.notEqual(AMBIENCE_FILES.ch03_lesson_room, AMBIENCE_FILES.higgins_house_interior);
  assert.notEqual(AMBIENCE_FILES.ch03_lesson_room, AMBIENCE_FILES.covent_garden_rain_market);
  assert.notEqual(AMBIENCE_FILES.ch03_lesson_room, AMBIENCE_FILES.higgins_house_morning_entry);
  const ambienceBytes = fs.readFileSync(path.join(root, AMBIENCE_FILES.ch03_lesson_room.replace(/^\.\/assets\//, 'assets/')));
  assert.ok(ambienceBytes.length > 0);
  assert.equal(ambienceBytes[0], 0xff);
  assert.equal(ambienceBytes[1] & 0xe0, 0xe0, 'canonical ambience is MPEG audio');
  assert.ok(Math.abs(mp3Mpeg1Layer3Duration(ambienceBytes) - 90) < 0.02, 'canonical MP3 is approximately 90 seconds');
  const audioPlan = fs.readFileSync(path.join(root, 'docs/chapters/ch03/AUDIO_PLAN.md'), 'utf8');
  for (const id of ['oK9a1Fn1rIx3FJaKGrZe', 'PAMtEPBJW8W6rXjDlIOt', 'DAu9YHLbdGHvniFmc5U3', 'PoGjrRKkp2HPztzVO5C9']) assert.ok(audioPlan.includes(id), id);
  assert.match(audioPlan, /01:04/);
  const { manager, elements } = audioHarness(t);
  await manager.ensureAmbience('ch03_s01');
  assert.equal(elements.length, 0, 'saved preference alone cannot unlock audio');
  manager.unlock(); await manager.ensureAmbience('ch03_s01');
  const loop = manager.ambience;
  assert.equal(loop.src, AMBIENCE_FILES.ch03_lesson_room);
  assert.equal(loop.volume, 0.10); assert.equal(manager.mix, CH02_AUDIO_MIX);
  assert.equal(manager.contextual, null); assert.equal(manager.gramophoneCue, null);
  assert.equal(manager.ambientClockTimer, null);
  await manager.ensureAmbience('ch03_s01'); assert.equal(manager.ambience, loop);
  assert.equal(loop.playCalls, 1); assert.ok(elements.every(e => !/rain|gramophone/.test(e.src)));
});

test('all eight approved S03 MP3 assets match their integrated paths, byte sizes and MPEG frame durations', () => {
  const assets = [
    ...CH03_SCENE_03.voice.map(({ src, generationId, transcript }) => ({ src, generationId, transcript })),
    ...CH03_SCENE_03.challenge.samples.map(({ src, generationId, transcript }) => ({ src, generationId, transcript }))
  ];
  const expected = [
    ['ek6PpoRvjbVRlONnoBjj', 109121], ['hll8CZetNoio50SXnmtS', 56458],
    ['N57mhxwhlDU8rYNipGte', 52696], ['mZNKT6kgjbnFEmgrfuUG', 76938],
    ['pv4mhkS6TNRu6fQ6CBYY', 89894], ['MCDlKDcFalPe2MdZKfOe', 55204],
    ['SrzFkD5thsvpOL5GKbPQ', 42665], ['ViuvcuZerKyJhXcAD3EV', 45173]
  ];
  const durations = [5.68, 2.40, 2.16, 3.68, 4.48, 2.32, 1.52, 1.68];
  assert.equal(assets.length, 8);
  for (let i = 0; i < assets.length; i++) {
    assert.equal(assets[i].generationId, expected[i][0], 'exact approved generation is mapped');
    assert.ok(assets[i].transcript, 'each recording has visible transcript text');
    const file = path.join(root, assets[i].src.replace(/^\.\/assets\//, 'assets/'));
    const bytes = fs.readFileSync(file);
    assert.equal(bytes.length, expected[i][1], assets[i].src);
    assert.ok(Math.abs(mp3Mpeg1Layer3Duration(bytes) - durations[i]) < 0.12, assets[i].src);
  }
});

test('S03 voice and challenge replay share the foreground duck, interrupt and leave lifecycle', async t => {
  const { manager } = audioHarness(t);
  manager.unlock(); await manager.ensureAmbience('ch03_s03');
  const ambience = manager.ambience;
  const voice = await manager.playVoice(CH03_SCENE_03.voice[0].src);
  assert.equal(ambience.volume, 0.10 * 0.28);
  const sample = await manager.playChallenge(CH03_SCENE_03.challenge.samples[0].src);
  assert.equal(voice.paused, true);
  assert.equal(ambience.volume, 0.008);
  sample.emit('ended');
  assert.equal(ambience.volume, 0.10);
  const replay = await manager.playVoice(CH03_SCENE_03.voice[0].src);
  await manager.setEnabled(false);
  assert.equal(replay.paused, true);
  manager.leaveScene();
  assert.equal(manager.foreground, null);
  assert.equal(manager.ambience, null);
});

test('S02 continues the same lesson room loop and applies the approved LC06 duck', async t => {
  assert.equal(ambienceForScene('ch03_s02'), 'ch03_lesson_room');
  assert.equal(isContinuousAmbienceTransition('ch03_s01', 'ch03_s02'), true);
  assert.equal(isContinuousAmbienceTransition('ch03_s02', 'ch03_s03'), true);
  const { manager, elements } = audioHarness(t);
  manager.unlock(); await manager.ensureAmbience('ch03_s01');
  const loop = manager.ambience;
  await manager.ensureAmbience('ch03_s02');
  assert.equal(manager.ambience, loop);
  assert.equal(loop.playCalls, 1);
  assert.equal(manager.mix, CH02_AUDIO_MIX);
  const sample = await manager.playChallenge('./assets/audio/challenges/ch03/lc06_three_flowers.mp3');
  assert.equal(loop.volume, 0.008, 'approved LC06 ambience gain');
  assert.equal(sample.volume, 1);
  sample.emit('ended');
  assert.equal(loop.volume, 0.10);
  assert.equal(manager.ambience, loop);
  await manager.ensureAmbience('ch03_s03');
  assert.equal(manager.ambience, loop, 'S03 continues the same canonical lesson room bed');
  assert.equal(loop.playCalls, 1);
  assert.equal(manager.mix, CH02_AUDIO_MIX);
  assert.equal(ambienceForScene('ch03_s03'), 'ch03_lesson_room');
  assert.ok(elements.every(e => !/rain|gramophone|gong/.test(e.src)));
});

test('S01 story voice duck/replay ownership restores the same interior and Sound On resumes only ambience', async t => {
  const { manager } = audioHarness(t); manager.unlock(); await manager.ensureAmbience('ch03_s01');
  const loop=manager.ambience;
  const higgins=await manager.playVoice('./assets/audio/characters/higgins/higgins_ch03_scene01_001.mp3');
  assert.equal(higgins.volume,1); assert.equal(loop.volume,0.10 * 0.28);
  const eliza=await manager.playVoice('./assets/audio/characters/eliza/eliza_ch03_scene01_001.mp3');
  assert.equal(higgins.paused,true); higgins.emit('ended'); assert.equal(loop.volume,0.10 * 0.28);
  eliza.emit('ended'); assert.equal(loop.volume,0.10); assert.equal(manager.ambience,loop);
  const replay=await manager.playVoice('./assets/audio/characters/eliza/eliza_ch03_scene01_001.mp3');
  await manager.setEnabled(false); assert.equal(replay.paused,true); assert.equal(loop.paused,true); assert.equal(loop.volume,0);
  await manager.setEnabled(true); assert.equal(loop.paused,false); assert.equal(replay.playCalls,1);
  assert.equal(manager.foreground,null); assert.equal(loop.volume,0.10);
});

test('leaving Chapter III stops foreground and retires the explicit lesson loop without activating fallback', async t => {
  const { manager, elements }=audioHarness(t); manager.unlock(); await manager.ensureAmbience('ch03_s01');
  const loop=manager.ambience; const speech=await manager.playVoice('./assets/audio/characters/higgins/higgins_ch03_scene01_001.mp3');
  await manager.ensureAmbience('ch03_s02'); assert.equal(loop.paused,false); assert.equal(speech.paused,true);
  assert.equal(manager.ambience,loop); assert.equal(manager.foreground,null);
  assert.ok(elements.every(e=>!e.src.includes('rain')));
  manager.leaveScene();
  assert.equal(manager.foreground,null); assert.equal(manager.ambience,null);
});
