import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH04_SCENE_03, CH04_SCENE_04, CH04_SCENE_05, CH04_S05_TEACHER_SECTIONS } from '../src/ch04-content.js';
import { CH05_SCENE_01 } from '../src/ch05-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { AudioManager, CH04_CORRIDOR_CROSSFADE_MS } from '../src/audio.js';
import { canAdvanceScene, completeScene, createInitialState, getSceneAdvanceBlock, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const d08Lines = {
  d08_practise_greeting: 'Practise the greeting first.',
  d08_plan_message: 'Plan what you want to say.',
  d08_listen_first: 'Listen before answering.'
};

function inspectMp3(file) {
  const bytes = fs.readFileSync(file);
  assert.ok(bytes.length > 0);
  assert.notEqual(bytes.subarray(0, 5).toString(), '<html');
  assert.notEqual(bytes.subarray(0, 5).toString(), '<?xml');
  let offset = bytes.subarray(0, 3).toString() === 'ID3'
    ? 10 + ((bytes[6] & 127) << 21) + ((bytes[7] & 127) << 14) + ((bytes[8] & 127) << 7) + (bytes[9] & 127)
    : 0;
  let frames = 0, duration = 0;
  while (offset + 4 <= bytes.length) {
    const header = bytes.readUInt32BE(offset);
    assert.equal(header >>> 21, 0x7ff, `bad MPEG sync at ${offset}`);
    const version = (header >>> 19) & 3, layer = (header >>> 17) & 3;
    assert.equal(version, 3); assert.equal(layer, 1);
    const bitrates = [0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,0];
    const rates = [44100,48000,32000,0];
    const bitrate = bitrates[(header >>> 12) & 15], sampleRate = rates[(header >>> 10) & 3];
    assert.ok(bitrate && sampleRate); assert.equal(sampleRate, 44100);
    const frameBytes = Math.floor(144000 * bitrate / sampleRate) + ((header >>> 9) & 1);
    assert.ok(offset + frameBytes <= bytes.length, `incomplete MPEG frame at ${offset}`);
    offset += frameBytes; frames++; duration += 1152 / sampleRate;
  }
  assert.equal(offset, bytes.length, 'no trailing partial frame'); assert.ok(frames > 20);
  return { bytes: bytes.length, frames, duration };
}

test('S05 registration, canonical title, visual composition, exact story order, and six approved Eliza mappings', () => {
  assert.equal(CH04_SCENE_05.id, 'ch04_s05');
  assert.equal(CH04_SCENE_05.title, 'The Walk Home');
  assert.equal(CH04_SCENE_05.nextScene, 'ch05_s01');
  assert.equal(CH04_SCENE_05.voiceStage, 'Emerging New Speech');
  assert.equal(CH04_SCENE_05.background.src, './assets/images/locations/ch04/ch04_evening_walk.webp');
  assert.equal(CH04_SCENE_05.eliza.src, './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png');
  assert.deepEqual(CH04_SCENE_05.supporting, []); assert.deepEqual(CH04_SCENE_05.props, []);
  assert.equal(CH04_SCENE_05.challenge, undefined); assert.equal(CH04_SCENE_05.decision, undefined); assert.equal(CH04_SCENE_05.reflection, undefined);
  assert.deepEqual(CH04_SCENE_05.storyBeats.filter(({ type }) => type === 'narration').map(({ text }) => text), [
    'Later, on the walk home, the street is quiet enough for Eliza to hear her own thoughts.'
  ]);
  const dialogue = CH04_SCENE_05.storyBeats.filter(({ type }) => type === 'dialogue');
  assert.deepEqual(dialogue.map(({ speaker, text }) => [speaker, text]), [
    ['Eliza','I can speak carefully when I need to.'],
    ['Eliza','And I can speak more freely when I choose.'],
    ['Eliza','That is not pretending. It is knowing what I can do.'],
    ['Eliza','Tonight was not a pass or fail.'],
    ['Eliza','It showed me what I can practise — and what I can choose.'],
    ['Eliza','The choice is mine.']
  ]);
  assert.deepEqual(CH04_SCENE_05.voice.map(({ transcript }) => transcript), dialogue.map(({ text }) => text));
  assert.deepEqual(CH04_SCENE_05.voice.map(({ generationId, assetId }) => [generationId, assetId]), [
    ['JzVdYPWbMuofm2uzcAg4','cwkmV8lRLLRUrsgHn56U'], ['ySuauVLG2ahSBKU7hoJb','V4PnXdcJpLBa7Q6YaWgS'],
    ['5MqaYvC8271hjGqW2eW1','2GlFLIXJUe22PAEUufGl'], ['fpWZcCwH3l780d60v7AV','uZUeKCO8UyXIxbfIvehI'],
    ['7M8JXeT8JFQzjzuKUpyr','EqU3EA2t1KfCTFLz2gBN'], ['7b76Rzd9SLzxL2tf7IS7','MbUcsgibVnM1TMqxiJG9']
  ]);
  assert.ok(CH04_SCENE_05.voice.every(({ inline, voiceId }) => inline && voiceId === '124kaYCknTDsnwUFdWl9'));
  assert.ok(CH04_SCENE_05.voice.every(({ generationId }) => generationId !== 'BO32BXMObvpJz5BtUekn'));
  assert.equal(CH04_SCENE_05.storyBeats.findIndex(({ type }) => type === 'd08Echo'), 4);
});

test('D08 echo maps all existing choices read-only and safely omits missing state', () => {
  for (const [id, text] of Object.entries(d08Lines)) assert.equal(d08Lines[id], text);
  const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  assert.match(app, /type === 'd08Echo'[\s\S]*?state\.decisions\.D08/);
  for (const [id, text] of Object.entries(d08Lines)) assert.ok(app.includes(`${id}: '${text}'`));
  assert.match(app, /That was one useful strategy\. Tonight gave Eliza more information to work with\./);
  assert.match(app, /\? d08Text \?[^:]*: ''/);
  assert.match(app, /scene\?\.id === 'ch04_s05' && state\.decisions\.D08/);
  assert.doesNotMatch(app, /decisions\s*\.\s*D08\s*=|decisions:\s*\{[^}]*D08/);
  assert.match(app, /scene\.id === 'ch04_s05' && scenePreview/);
});

test('S05 entry, reflection isolation, reward neutrality, and explicit idempotent completion', () => {
  const blocked = setScene(createInitialState(), CH04_SCENE_05.id);
  assert.equal(canAdvanceScene(blocked, CH04_SCENE_05), false);
  assert.match(getSceneAdvanceBlock(blocked, CH04_SCENE_05), /Complete Chapter IV Scene 04/);
  const ready = {
    ...blocked,
    applied_events: ['ch04_s04_complete'],
    reflections: { ch04_s04_focus: 'audience' },
    confidence: 3, independence: 2, pronunciation: 5
  };
  const before = [ready.confidence, ready.independence, ready.pronunciation, ready.reflections.ch04_s04_focus];
  assert.equal(canAdvanceScene(ready, CH04_SCENE_05), true);
  const done = completeScene(ready, CH04_SCENE_05);
  assert.equal(done.applied_events.filter((event) => event === 'ch04_s05_complete').length, 1);
  assert.equal(completeScene(done, CH04_SCENE_05), done);
  assert.deepEqual([done.confidence, done.independence, done.pronunciation, done.reflections.ch04_s04_focus], before);
  assert.equal(CH04_SCENE_04.nextScene, CH04_SCENE_05.id);
  assert.equal(CH04_SCENE_03.nextScene, CH04_SCENE_04.id);
});

test('approved S05 background and all seven downloaded audio assets are present and complete MP3 frame sequences', () => {
  const image = fs.readFileSync(path.join(root, 'assets/images/locations/ch04/ch04_evening_walk.webp'));
  assert.equal(image.subarray(0, 4).toString(), 'RIFF'); assert.equal(image.subarray(8, 12).toString(), 'WEBP');
  const files = [
    ...CH04_SCENE_05.voice.map(({ src }) => src),
    './assets/audio/ambience/ch04_evening_walk_ambient.mp3'
  ];
  const expected = [1.92,2.16,2.96,1.92,3.28,1.12,22.0];
  const actual = files.map((file, index) => {
    const result = inspectMp3(path.join(root, file.replace(/^\.\//, '')));
    assert.ok(Math.abs(result.duration - expected[index]) <= 0.12, `${file}: ${result.duration.toFixed(3)}s`);
    return result;
  });
  assert.ok(actual.every(({ bytes }) => bytes > 0));
});

test('evening walk ambience crossfades from the running corridor without restarting it', async (t) => {
  class FakeAudio {
    constructor(src) { this.src = src; this.volume = 1; this.paused = true; this.muted = false; this.loop = false; this.listeners = new Map(); this.currentTime = 0; this.duration = 30; this.playCalls = 0; }
    async play() { this.paused = false; this.playCalls++; }
    pause() { this.paused = true; }
    addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, new Set()); this.listeners.get(type).add(fn); }
    removeEventListener(type, fn) { this.listeners.get(type)?.delete(fn); }
  }
  const elements = [];
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0, soundFadeMs: 0, createAudio: (src) => { const audio = new FakeAudio(src); elements.push(audio); return audio; } });
  t.after(() => manager.dispose());
  manager.unlock();
  await manager.ensureAmbience('ch04_s04');
  const corridor = manager.ambience;
  corridor.currentTime = 8.25;
  await manager.ensureAmbience('ch04_s05');
  const evening = manager.ambience;
  assert.equal(manager.ambienceTransition.from, corridor);
  assert.equal(manager.ambienceTransition.to, evening);
  assert.equal(manager.ambienceId, 'ch04_evening_walk');
  assert.equal(evening.loop, true, 'S05 evening-walk ambience loops continuously');
  assert.equal(corridor.currentTime, 8.25);
  assert.equal(corridor.playCalls, 1);
  assert.equal(CH04_CORRIDOR_CROSSFADE_MS, 1500);
  assert.equal(ambienceForScene('ch04_s05'), 'ch04_evening_walk');
  assert.equal(isContinuousAmbienceTransition('ch04_s04', 'ch04_s05'), false);
  manager.duck('story', 0.78);
  assert.ok(corridor.volume < manager.ambienceVolume);
  assert.ok(evening.volume < manager.ambienceVolume);
  await manager.setEnabled(false);
  assert.equal(corridor.paused, true); assert.equal(evening.paused, true);
  await manager.setEnabled(true);
  await manager.ensureAmbience('ch04_s05');
  assert.equal(manager.ambienceTransition.from, corridor);
  assert.equal(manager.ambienceTransition.to, evening);
  assert.equal(corridor.paused, false); assert.equal(evening.paused, false);
  await new Promise((resolve) => setTimeout(resolve, CH04_CORRIDOR_CROSSFADE_MS + 80));
  assert.equal(manager.ambienceTransition, null);
  assert.equal(corridor.paused, true); assert.equal(evening.paused, false);
  manager.unduck('story'); assert.equal(evening.volume, manager.ambienceVolume);
  assert.equal(elements.filter(({ src }) => src.endsWith('ch04_evening_walk_ambient.mp3')).length, 1);
});

test('S05 completion remains the guarded entry boundary for Chapter V S01', () => {
  const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
  assert.match(app, /\[CH04_SCENE_05\.id\]: CH04_SCENE_05/);
  assert.equal(getSceneAdvanceBlock(setScene(createInitialState(), CH05_SCENE_01.id), CH05_SCENE_01), 'Complete Chapter IV Scene 05 before opening The Borough Exhibition Evening.');
  assert.match(app, /hashScene === 'ch05_s01'[\s\S]*?ch04_s05_complete/);
  assert.match(app, /The Borough Exhibition Evening is complete\. The next Chapter V scene is not implemented/);
  assert.match(app, /scene\?\.id === 'ch04_s05' \? CH04_S05_TEACHER_SECTIONS/);
  assert.match(app, /scene\.id === 'ch04_s05' && !scenePreview/);
  assert.match(app, /CH05_SCENE_01/);
  assert.ok(CH04_S05_TEACHER_SECTIONS.some(([title, text]) => title === 'Teacher Preview Contract' && /no autoplay, state writes, completion or progression/i.test(text)));
});
