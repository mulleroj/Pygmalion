import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH05_SCENE_01, CH05_S01_TEACHER_SECTIONS } from '../src/ch05-content.js';
import { ambienceForScene } from '../src/content.js';
import { AudioManager, AMBIENCE_FILES, CH02_AUDIO_MIX } from '../src/audio.js';
import { applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, saveState, setScene } from '../src/state.js';

const ids = ['d10_tailor_by_role', 'd10_listen_then_adjust', 'd10_keep_core_voice'];
const ready = () => ({ ...setScene(createInitialState(), CH05_SCENE_01.id), applied_events: ['ch04_s05_complete'] });
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

class FakeAudio {
  constructor(src) { this.src = src; this.volume = 1; this.paused = true; this.muted = false; this.listeners = new Map(); this.playCalls = 0; }
  async play() { this.playCalls++; this.paused = false; }
  pause() { this.paused = true; }
  addEventListener(name, callback) { if (!this.listeners.has(name)) this.listeners.set(name, new Set()); this.listeners.get(name).add(callback); }
  removeEventListener(name, callback) { this.listeners.get(name)?.delete(callback); }
  emit(name) { if (name === 'ended' || name === 'error') this.paused = true; for (const callback of [...(this.listeners.get(name) || [])]) callback(); }
}

test('S01 has locked identity, setting and canonical script beats', () => {
  assert.deepEqual([CH05_SCENE_01.id, CH05_SCENE_01.title, CH05_SCENE_01.chapter, CH05_SCENE_01.chapterTitle, CH05_SCENE_01.location], [
    'ch05_s01', 'The Borough Exhibition Evening', 'V', 'The Reception', 'Lambeth Public Rooms — main exhibition hall'
  ]);
  assert.deepEqual(CH05_SCENE_01.storyBeats.map(({ type, speaker, text }) => type === 'd10Decision' ? ['Decision', 'D10'] : [speaker || 'Narration', text]), [
    ['Narration', 'Warm lamps light the exhibition hall. Flower growers stand beside their displays. Eliza has a place in the programme, and the organiser comes to speak with her.'],
    ['Organiser', 'Miss Doolittle, the growers are ready. Would you like to begin?'],
    ['Narration', 'Eliza looks at the organiser, a patron near the display, and one of the flower workers. She considers how she wants to speak with each person.'],
    ['Decision', 'D10'],
    ['Eliza', 'Yes. And please introduce them by name. The work is theirs.'],
    ['Higgins', 'Keep it simple. Speak as we practised.'],
    ['Eliza', 'I shall speak as the room requires.'],
    ['Pickering', 'The growers have done careful work.'],
    ['Narration', 'The organiser turns towards the guests. Eliza has not been introduced as anyone’s experiment. The room begins to fill, and several conversations start at once.']
  ]);
});

test('D10 is an open three-option decision with stable values and no scoring or reward', () => {
  assert.equal(CH05_SCENE_01.decision.id, 'D10');
  assert.equal(CH05_SCENE_01.decision.prompt, 'How would you like to begin with the people here?');
  assert.deepEqual(CH05_SCENE_01.decision.choices.map(({ id }) => id), ids);
  assert.equal(CH05_SCENE_01.decision.neutralChoice, true);
  assert.equal(CH05_SCENE_01.decision.hideResult, true);
  for (const id of ids) {
    let state = ready();
    assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_01), 'Choose a register plan before continuing.');
    state = applyDecision(state, 'D10', id);
    assert.equal(state.reception_register_plan, id);
    assert.deepEqual(state.decisions, {});
    assert.equal(state.applied_events.filter((event) => event === 'ch05_d10_recorded').length, 1);
    assert.equal(state.confidence, 0); assert.equal(state.pronunciation, 0); assert.equal(state.independence, 0);
    assert.equal(applyDecision(state, 'D10', ids.find((other) => other !== id)), state);
    assert.equal(applyDecision({ ...state, scene: 'ch04_s05' }, 'D10', id).reception_register_plan, id);
    assert.equal(completeScene(state, CH05_SCENE_01).applied_events.filter((event) => event === 'ch05_s01_complete').length, 1);
  }
});

test('S01 is directly playable without Chapter IV history and retains its local D10 requirement', () => {
  const blocked = setScene(createInitialState(), CH05_SCENE_01.id);
  assert.equal(getSceneAdvanceBlock(blocked, CH05_SCENE_01), 'Choose a register plan before continuing.');
  assert.notEqual(applyDecision(blocked, 'D10', ids[0]), blocked);
  const state = applyDecision(ready(), 'D10', ids[1]);
  const values = new Map();
  saveState(state, { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) });
  const restored = loadState({ getItem: (key) => values.get(key) });
  assert.equal(restored.reception_register_plan, ids[1]);
  assert.equal(restored.applied_events.filter((event) => event === 'ch05_d10_recorded').length, 1);
});

test('explicit S01 completion is write-once and routes only to the unimplemented S02 boundary', () => {
  const selected = applyDecision(ready(), 'D10', ids[2]);
  const done = completeScene(selected, CH05_SCENE_01);
  assert.equal(done.applied_events.filter((event) => event === 'ch05_s01_complete').length, 1);
  assert.equal(completeScene(done, CH05_SCENE_01), done);
  assert.equal(CH05_SCENE_01.nextScene, 'ch05_s02');
  assert.equal(done.independence, selected.independence);
});

test('S01 uses the canonical exhibition background and its runtime image is valid', () => {
  const expected = './assets/images/locations/ch05/ch05_exhibition_hall.webp';
  assert.equal(CH05_SCENE_01.background.src, expected);
  assert.equal(CH05_SCENE_01.plate.src, expected);
  assert.match(CH05_SCENE_01.background.alt, /flower exhibition in lambeth public rooms/i);
  const image = fs.readFileSync(path.join(root, expected.slice(2)));
  assert.equal(image.toString('ascii', 0, 4), 'RIFF');
  assert.equal(image.toString('ascii', 8, 12), 'WEBP');
  assert.ok(image.length > 1000);
});

test('S01 layers full-body Higgins left and full-body Pickering right in the exhibition composition', () => {
  assert.equal(CH05_SCENE_01.composition, 'ch05-exhibition-hall-opening');
  assert.deepEqual(CH05_SCENE_01.supporting.map(({ src, placement }) => ({ src, placement })), [
    { src: './assets/images/characters/higgins/runtime/higgins_master_cutout.png', placement: 'higgins' },
    { src: './assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png', placement: 'pickering' }
  ]);
  for (const asset of [
    'assets/images/characters/pickering/pickering_full-body_master.webp',
    'assets/images/characters/pickering/source/pickering_full-body_master.png',
    'assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png'
  ]) assert.ok(fs.statSync(path.join(root, asset)).size > 0, `${asset} exists and is non-empty`);

  const runtime = fs.readFileSync(path.join(root, 'assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png'));
  assert.equal(runtime.toString('ascii', 1, 4), 'PNG');
  assert.equal(runtime.readUInt32BE(16), 1086);
  assert.equal(runtime.readUInt32BE(20), 1448);
  assert.equal(runtime[25], 6, 'runtime cutout keeps its RGBA alpha channel');

  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  assert.match(css, /\.ch05-exhibition-hall-opening \.support-higgins\s*\{\s*left:\s*20%;\s*bottom:\s*5%;\s*height:\s*72%;/);
  assert.match(css, /\.ch05-exhibition-hall-opening \.support-pickering\s*\{\s*left:\s*80%;\s*bottom:\s*5%;\s*height:\s*74%;/);
  assert.match(css, /\.ch05-exhibition-hall-opening \.art-eliza img\s*\{[^}]*height:\s*86%;/);
  assert.match(css, /\.ch05-exhibition-hall-opening \.supporting-character\s*\{[^}]*object-fit:\s*contain/);
});

test('S01 Teacher Mode explains open register choice and remains read-only; visual fallback is inactive', () => {
  assert.match(CH05_S01_TEACHER_SECTIONS.flat().join(' '), /code-switching/i);
  assert.match(CH05_S01_TEACHER_SECTIONS.flat().join(' '), /Accent is not intelligence/);
  assert.match(CH05_S01_TEACHER_SECTIONS.flat().join(' '), /no single correct answer/i);
  assert.equal(CH05_SCENE_01.visualFallback, false);
  assert.equal(CH05_SCENE_01.background.src.endsWith('ch05_exhibition_hall.webp'), true);
  assert.equal(CH05_SCENE_01.eliza.src, './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png');
});

test('S01 AM43 is the sole inline Organiser replay with approved provenance and valid audio', () => {
  const voice = CH05_SCENE_01.voice;
  assert.equal(voice.length, 1);
  assert.deepEqual(voice[0], {
    id: 'AM43', speaker: 'Organiser',
    src: './assets/audio/characters/supporting/organizer_ch05_scene01_001.mp3',
    transcript: 'Miss Doolittle, the growers are ready. Would you like to begin?',
    inline: true, label: 'Replay organiser',
    generationId: 'wBtfcWtx0WTT4DxtPnKR', assetId: '30yI9UQNQKzklOXBU7OC',
    voice: 'Cass — Warm and Energetic British Woman', voiceId: 'ITRml9f5K7moz24wRnmV',
    transcriptVerified: 'PASS', humanApproved: true
  });
  const organiserLines = CH05_SCENE_01.storyBeats.filter(({ type, speaker, text }) => type === 'dialogue' && speaker === 'Organiser' && text === voice[0].transcript);
  assert.equal(organiserLines.length, 1);
  assert.equal(CH05_SCENE_01.storyBeats.filter(({ type, speaker }) => type === 'dialogue' && speaker !== 'Organiser').length > 0, true);
  assert.ok(fs.statSync(path.join(root, voice[0].src.slice(2))).size > 0);
  assert.match(fs.readFileSync(path.join(root, 'src/app.js'), 'utf8'), /voice\.inline && voice\.transcript === beat\.text/);
  assert.match(fs.readFileSync(path.join(root, 'src/app.js'), 'utf8'), /audioManager\.playVoice\(target\.dataset\.src/);
});

test('S01 AM43 and AM44 MP3s are complete MPEG-1 Layer III streams at 44.1 kHz', () => {
  const assets = [
    { src: CH05_SCENE_01.voice[0].src, duration: 3.76, tolerance: 0.12 },
    { src: AMBIENCE_FILES.ch05_exhibition_hall, duration: 24, tolerance: 0.12 },
    { src: AMBIENCE_FILES.ch05_side_room, duration: 24, tolerance: 0.12 }
  ];
  for (const asset of assets) {
    const bytes = fs.readFileSync(path.join(root, asset.src.slice(2)));
    let offset = 0, frames = 0;
    if (bytes.subarray(0, 3).toString('ascii') === 'ID3') {
      const tagSize = ((bytes[6] & 127) << 21) | ((bytes[7] & 127) << 14) | ((bytes[8] & 127) << 7) | (bytes[9] & 127);
      offset = 10 + tagSize + ((bytes[5] & 16) ? 10 : 0);
    }
    while (offset + 4 <= bytes.length) {
      assert.equal(bytes[offset], 255); assert.equal(bytes[offset + 1] & 224, 224);
      const header = bytes.readUInt32BE(offset);
      const bitrateIndex = (header >>> 12) & 15, sampleRateIndex = (header >>> 10) & 3;
      assert.equal((header >>> 19) & 3, 3); assert.equal((header >>> 17) & 3, 1);
      assert.equal(sampleRateIndex, 0); assert.ok(bitrateIndex > 0 && bitrateIndex < 15);
      const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
      offset += Math.floor(144 * bitrates[bitrateIndex] * 1000 / 44100) + ((header >>> 9) & 1);
      frames++;
    }
    assert.equal(offset, bytes.length, `${asset.src} has no truncated/trailing bytes`);
    assert.ok(Math.abs(frames * 1152 / 44100 - asset.duration) < asset.tolerance, asset.src);
  }
  const plan = fs.readFileSync(path.join(root, 'docs/chapters/ch05/AUDIO_PLAN.md'), 'utf8');
  for (const provenance of [
    'Generation ID `wBtfcWtx0WTT4DxtPnKR`', 'Asset Library ID `30yI9UQNQKzklOXBU7OC`', 'Transcript verified: PASS',
    'Generation ID `fzwkpWhCMP5dH2NfNmHu`', 'Asset Library ID `jC6RVeriDcd3ed2pan3j`', 'Duration: 24 s; loop: true; human approved: yes',
    'Derived locally from approved AM44', '1.8 kHz low-pass filter', '9 dB attenuation', 'Human listening approval: yes'
  ]) assert.ok(plan.includes(provenance), `AUDIO_PLAN includes ${provenance}`);
});

test('S01 uses one AM44 loop after gesture; Sound Off/On and AM43 duck/restore follow AudioManager', async (t) => {
  const elements = [];
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0, soundFadeMs: 0,
    createAudio: (src) => { const audio = new FakeAudio(src); elements.push(audio); return audio; } });
  t.after(() => manager.dispose());
  assert.equal(ambienceForScene('ch05_s01'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s02'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s03'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s04'), 'ch05_side_room');
  assert.equal(ambienceForScene('ch05_s05'), 'ch04_evening_walk');
  assert.equal(AMBIENCE_FILES.ch05_exhibition_hall, './assets/audio/ambience/ch05_borough_exhibition_ambient.mp3');
  assert.equal(AMBIENCE_FILES.ch05_side_room, './assets/audio/ambience/ch05_lambeth_side_room_ambient.mp3');
  assert.equal(AMBIENCE_FILES.ch04_evening_walk, './assets/audio/ambience/ch04_evening_walk_ambient.mp3');
  assert.equal(ambienceForScene('ch01_s01'), 'covent_garden_rain_market');
  assert.equal(ambienceForScene('ch04_s05'), 'ch04_evening_walk');
  await manager.ensureAmbience('ch05_s01');
  assert.equal(elements.length, 0, 'scene render does not autoplay audio before a user gesture');
  manager.unlock();
  await manager.ensureAmbience('ch05_s01');
  const hall = manager.ambience;
  assert.equal(hall.src, AMBIENCE_FILES.ch05_exhibition_hall);
  assert.equal(hall.loop, true);
  assert.equal(hall.volume, CH02_AUDIO_MIX.ambience);
  assert.equal(manager.mix, CH02_AUDIO_MIX);
  await manager.ensureAmbience('ch05_s01');
  assert.equal(manager.ambience, hall);
  assert.equal(elements.filter((audio) => audio === hall && !audio.paused).length, 1);
  const organiserVoice = await manager.playVoice(CH05_SCENE_01.voice[0].src);
  assert.equal(organiserVoice.src, CH05_SCENE_01.voice[0].src);
  assert.equal(hall.volume, CH02_AUDIO_MIX.ambience * CH02_AUDIO_MIX.storyDuck);
  organiserVoice.emit('ended');
  assert.equal(hall.volume, CH02_AUDIO_MIX.ambience);
  await manager.setEnabled(false);
  assert.equal(hall.paused, true);
  await manager.setEnabled(true);
  assert.equal(manager.ambience, hall);
  assert.equal(hall.paused, false);
  assert.equal(elements.filter((audio) => !audio.paused && audio.loop).length, 1);
});

test('S01 entry retires Chapter IV evening-walk loop and starts only the Chapter V hall loop', async (t) => {
  const elements = [];
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0,
    createAudio: (src) => { const audio = new FakeAudio(src); elements.push(audio); return audio; } });
  t.after(() => manager.dispose());
  manager.unlock();
  await manager.ensureAmbience('ch04_s05');
  const eveningWalk = manager.ambience;
  assert.equal(eveningWalk.src, AMBIENCE_FILES.ch04_evening_walk);
  await manager.ensureAmbience('ch05_s01');
  assert.equal(eveningWalk.paused, true);
  assert.equal(manager.ambience.src, AMBIENCE_FILES.ch05_exhibition_hall);
  assert.equal(elements.filter((audio) => !audio.paused && audio.loop).length, 1);
  const hall = manager.ambience;
  await manager.ensureAmbience('ch05_s04');
  assert.equal(ambienceForScene('ch05_s01'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s02'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s03'), 'ch05_exhibition_hall');
  assert.equal(manager.ambience.src, AMBIENCE_FILES.ch05_side_room);
  assert.equal(manager.ambience.loop, true);
  assert.equal(manager.ambience.volume, CH02_AUDIO_MIX.ambience);
  assert.equal(manager.mix, CH02_AUDIO_MIX);
  assert.notEqual(manager.ambience, hall);
  assert.equal(elements.filter((audio) => !audio.paused && audio.loop).length, 1);
});
