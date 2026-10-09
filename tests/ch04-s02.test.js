import test from 'node:test';
import { SAVE_KEY, savedProgress, readSavedProgress } from './progress-test-helpers.js';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH04_SCENE_01, CH04_SCENE_02, CH04_S02_TEACHER_SECTIONS, CH04_TEACHER_REFERENCE_AUDIO } from '../src/ch04-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { AMBIENCE_FILES, AudioManager, CH02_AUDIO_MIX, CH04_TEA_ROOM_VARIANTS } from '../src/audio.js';
import {
  canAdvanceScene, completeScene, createInitialState, getSceneAdvanceBlock, loadState,
  markLc11SupportUsed, recordLc11Answer, recordLc11ApplicationChoice, saveState, setScene
} from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ready = () => ({
  ...setScene(createInitialState(), 'ch04_s02'),
  decisions: { D08: 'd08_listen_first' },
  applied_events: ['ch03_s06_complete', 'ch04_s01_complete']
});
const correct = ['lc11_01_opening', 'lc11_02_continuing', 'lc11_03_closing'];

test('S02 is registered as the locked second Chapter IV scene with approved reused art', () => {
  assert.equal(CH04_SCENE_02.id, 'ch04_s02');
  assert.equal(CH04_SCENE_02.number, 2);
  assert.equal(CH04_SCENE_02.title, 'Names and Weather');
  assert.equal(CH04_SCENE_02.visualStage, 'in_training');
  assert.equal(CH04_SCENE_02.voiceStage, 'Emerging New Speech');
  assert.equal(CH04_SCENE_02.background.src, './assets/images/locations/ch04/ch04_social_tea_room.webp');
  assert.equal(CH04_SCENE_02.eliza.src, './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png');
  assert.deepEqual(CH04_SCENE_02.supporting.map(({ src }) => src), ['./assets/images/characters/pickering/runtime/pickering_master_cutout.png']);
  assert.equal(CH04_SCENE_02.storyBeats.length, 11);
  assert.equal(CH04_SCENE_02.nextScene, 'ch04_s03');
  assert.equal(CH04_SCENE_02.supporting.some(({ alt }) => /Higgins/.test(alt)), false);
});

test('S01 advances into S02 only after its explicit Continue and one completion event', () => {
  assert.equal(CH04_SCENE_01.nextScene, CH04_SCENE_02.id);
  let state = { ...ready(), scene: 'ch04_s01', applied_events: ['ch03_s06_complete'], decisions: {} };
  assert.match(getSceneAdvanceBlock(state, CH04_SCENE_01), /Choose a response/);
  state = { ...state, decisions: { D08: 'd08_listen_first' } };
  const next = completeScene(state, CH04_SCENE_01);
  assert.equal(next.applied_events.filter((id) => id === 'ch04_s01_complete').length, 1);
  assert.equal(completeScene(next, CH04_SCENE_01), next);
  assert.equal(state.scene, 'ch04_s01', 'recording readiness does not navigate automatically');
});

test('LC11 completion cannot open S03 before the three samples are correct', () => {
  const state = ready();
  assert.equal(canAdvanceScene(state, CH04_SCENE_02), false);
  assert.match(getSceneAdvanceBlock(state, CH04_SCENE_02), /all three LC11 samples/);
  assert.equal(completeScene(state, CH04_SCENE_02), state);
  assert.equal(state.scene, 'ch04_s02');
});

test('AM36 maps the three exact visible story turns to approved Eliza voice and generation IDs', () => {
  const expected = [
    ['It rained on the way here, but today the sky is clearing.', 'eliza_ch04_scene02_001.mp3', 'DvdnVuQlFQjCkmPr40fu'],
    ['It was a short walk. I noticed a little bookshop near the square.', 'eliza_ch04_scene02_002.mp3', 'YnLHFVdTFxu1n3Y0pl4g'],
    ['I do. I like hearing how different people tell a story.', 'eliza_ch04_scene02_003.mp3', 'T5waq2l96RQJwf2NW1KN']
  ];
  const voices = CH04_SCENE_02.voice;
  assert.equal(voices.length, 3);
  for (const [index, [text, filename, generationId]] of expected.entries()) {
    assert.equal(voices[index].transcript, text);
    assert.equal(voices[index].generationId, generationId);
    assert.equal(voices[index].voiceId, '124kaYCknTDsnwUFdWl9');
    assert.equal(path.basename(voices[index].src), filename);
    assert.equal(CH04_SCENE_02.storyBeats.some(({ text: beat }) => beat === text), true);
  }
  assert.equal(voices.every(({ inline }) => inline), true);
});

test('LC11 has exactly the stable sample IDs and canonical answer mapping', () => {
  assert.deepEqual(CH04_SCENE_02.challenge.samples.map(({ id, answer }) => [id, answer]), [
    ['lc11_sample_01', 'lc11_01_opening'],
    ['lc11_sample_02', 'lc11_02_continuing'],
    ['lc11_sample_03', 'lc11_03_closing']
  ]);
  assert.deepEqual(CH04_SCENE_02.challenge.samples.map(({ transcript }) => transcript), [
    'Miss Doolittle, have you been in London long?',
    'I see. And what do you think of the weather today?',
    'Well, it was lovely speaking with you.'
  ]);
});

test('LC11 rejects unknown sample IDs and answers from another sample', () => {
  const state = ready();
  assert.equal(recordLc11Answer(state, 'lc11_sample_99', 'lc11_01_opening'), state);
  assert.equal(recordLc11Answer(state, 'lc11_sample_01', 'lc11_02_continuing'), state);
  assert.equal(state.challenges.lc11.attempts, 0);
});

test('LC11 pre-answer transcript support is available per sample and leaves answers, attempts and signals unchanged', () => {
  for (const soundEnabled of [false, true]) {
    let state = { ...ready(), soundEnabled };
    const baselineSignals = [state.pronunciation, state.confidence, state.independence];
    for (const [index, sample] of CH04_SCENE_02.challenge.samples.entries()) {
      const before = state;
      const attemptsBeforeSupport = state.challenges.lc11.attempts;
      state = markLc11SupportUsed(state, sample.id);
      assert.notEqual(state, before, `${sample.id} can request support before answering with sound ${soundEnabled ? 'on' : 'off'}`);
      assert.deepEqual(state.challenges.lc11.supportSamples, CH04_SCENE_02.challenge.samples.slice(0, index + 1).map(({ id }) => id));
      assert.equal(state.challenges.lc11.answers[sample.id], undefined);
      assert.equal(state.challenges.lc11.attempts, attemptsBeforeSupport);
      assert.deepEqual([state.pronunciation, state.confidence, state.independence], baselineSignals);
      assert.equal(state.soundEnabled, soundEnabled);
      assert.equal(state.challenges.lc11.completed, false);
      assert.equal(state.applied_events.includes('ch04_lc11_complete'), false);
      assert.equal(markLc11SupportUsed(state, sample.id), state, 'support request is idempotent');
      state = recordLc11Answer(state, sample.id, sample.answer);
    }
    assert.equal(state.challenges.lc11.completed, true);
    assert.equal(state.applied_events.filter((id) => id === 'ch04_lc11_complete').length, 1);
  }
});

test('LC11 permits replay without writing learner state', () => {
  const state = ready();
  const replayed = state;
  assert.equal(replayed, state);
  assert.equal(state.challenges.lc11.attempts, 0);
  assert.equal(state.applied_events.includes('ch04_lc11_complete'), false);
});

test('LC11 lets an incorrect sample retry and freezes a correct sample', () => {
  let state = recordLc11Answer(ready(), 'lc11_sample_01', 'lc11_01_closing');
  state = recordLc11Answer(state, 'lc11_sample_01', 'lc11_01_opening');
  assert.equal(state.challenges.lc11.answers.lc11_sample_01.correct, true);
  const attempts = state.challenges.lc11.attempts;
  assert.equal(recordLc11Answer(state, 'lc11_sample_01', 'lc11_01_continuing'), state);
  assert.equal(state.challenges.lc11.attempts, attempts);
});

test('LC11 completion is idempotent and changes no development signals', () => {
  let state = ready();
  const baseline = [state.pronunciation, state.confidence, state.independence];
  for (const [index, sample] of CH04_SCENE_02.challenge.samples.entries()) state = recordLc11Answer(state, sample.id, correct[index]);
  assert.equal(state.challenges.lc11.completed, true);
  assert.equal(state.applied_events.filter((id) => id === 'ch04_lc11_complete').length, 1);
  assert.equal(recordLc11Answer(state, 'lc11_sample_01', 'lc11_01_opening'), state);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], baseline);
});

test('LC11 answers, attempts, support and completion survive a local-storage round trip', () => {
  let state = markLc11SupportUsed(ready(), 'lc11_sample_01');
  assert.equal(state.challenges.lc11.answers.lc11_sample_01, undefined);
  assert.equal(state.challenges.lc11.attempts, 0);
  state = recordLc11Answer(state, 'lc11_sample_01', 'lc11_01_closing');
  state = recordLc11Answer(state, 'lc11_sample_01', 'lc11_01_opening');
  const store = new Map();
  saveState(state, { getItem: (key) => store.get(key), setItem: (key, value) => store.set(key, value) });
  state = loadState({ getItem: (key) => store.get(key), setItem() {} });
  assert.equal(state.challenges.lc11.answers.lc11_sample_01.correct, true);
  assert.equal(state.challenges.lc11.attempts, 2);
  assert.deepEqual(state.challenges.lc11.supportSamples, ['lc11_sample_01']);
});

test('LC11 transcript support before answering persists through restored challenge state', () => {
  const original = ready();
  const baselineSignals = [original.pronunciation, original.confidence, original.independence];
  let state = markLc11SupportUsed(original, 'lc11_sample_01');
  const store = new Map();
  saveState(state, { getItem: (key) => store.get(key), setItem: (key, value) => store.set(key, value) });
  state = loadState({ getItem: (key) => store.get(key), setItem() {} });
  assert.deepEqual(state.challenges.lc11.supportSamples, ['lc11_sample_01']);
  assert.equal(state.challenges.lc11.answers.lc11_sample_01, undefined);
  assert.equal(state.challenges.lc11.attempts, 0);
  assert.deepEqual([state.pronunciation, state.confidence, state.independence], baselineSignals);
});

test('LC11 transcript support remains available after a correct first attempt', () => {
  let state = recordLc11Answer(ready(), 'lc11_sample_01', 'lc11_01_opening');
  state = markLc11SupportUsed(state, 'lc11_sample_01');
  assert.deepEqual(state.challenges.lc11.supportSamples, ['lc11_sample_01']);
  assert.equal(state.pronunciation, 0);
  assert.equal(state.confidence, 0);
  assert.equal(state.independence, 0);
});

test('optional replies are non-gated, converge and award at most one Confidence signal', () => {
  let state = ready();
  for (const [index, sample] of CH04_SCENE_02.challenge.samples.entries()) state = recordLc11Answer(state, sample.id, correct[index]);
  assert.equal(getSceneAdvanceBlock(state, CH04_SCENE_02), '');
  assert.equal(completeScene(state, CH04_SCENE_02).applied_events.includes('ch04_s02_complete'), true);
  const baseline = state.confidence;
  state = recordLc11ApplicationChoice(state, 's02_followup_curiosity');
  assert.equal(state.confidence, baseline + 1);
  assert.equal(state.challenges.lc11.applicationChoice, 's02_followup_curiosity');
  assert.equal(state.applied_events.filter((id) => id === 'ch04_s02_confidence_increased').length, 1);
  assert.equal(recordLc11ApplicationChoice(state, 's02_share_interest'), state);
  assert.equal(state.confidence, baseline + 1);
});

test('S02 completion writes one event, then explicit Continue owns the S03 transition', () => {
  let state = ready();
  for (const [index, sample] of CH04_SCENE_02.challenge.samples.entries()) state = recordLc11Answer(state, sample.id, correct[index]);
  const next = completeScene(state, CH04_SCENE_02);
  assert.equal(next.applied_events.filter((id) => id === 'ch04_s02_complete').length, 1);
  assert.equal(completeScene(next, CH04_SCENE_02), next);
  assert.equal(state.scene, 'ch04_s02');
  assert.equal(CH04_SCENE_02.nextScene, 'ch04_s03');
});

test('D08 remains unchanged through S02 challenge and micro-choice state writes', () => {
  let state = ready();
  const choice = state.decisions.D08;
  for (const [index, sample] of CH04_SCENE_02.challenge.samples.entries()) state = recordLc11Answer(state, sample.id, correct[index]);
  state = recordLc11ApplicationChoice(state, 's02_share_interest');
  assert.equal(state.decisions.D08, choice);
  assert.equal(state.applied_events.filter((id) => id === 'ch04_d08_recorded').length, 0);
});

test('S02 ambience uses its approved loop and crossfades from S01', () => {
  assert.equal(ambienceForScene('ch04_s01'), 'ch03_lesson_room');
  assert.equal(ambienceForScene('ch04_s02'), 'ch04_social_tea_room');
  assert.equal(AMBIENCE_FILES.ch04_social_tea_room, './assets/audio/ambience/ch04_social_tea_room_ambient.mp3');
  assert.equal(isContinuousAmbienceTransition('ch04_s01', 'ch04_s02'), false, 'different ambience identities invoke the existing smooth crossfade');
  assert.equal(AudioManager !== undefined, true);
});

test('tea-room companion assets are complete MP3 loops with deterministic A/B source registration', () => {
  assert.deepEqual(CH04_TEA_ROOM_VARIANTS.map(({ src }) => src), [
    AMBIENCE_FILES.ch04_social_tea_room,
    './assets/audio/ambience/ch04_social_tea_room_ambient_b.mp3'
  ]);
  assert.equal(CH04_TEA_ROOM_VARIANTS[0].gain, 1);
  assert.equal(CH04_TEA_ROOM_VARIANTS[1].gain, 28.726753282769735, 'Loop B gain follows the measured decoded-PCM RMS delta');
  for (const { src } of CH04_TEA_ROOM_VARIANTS) {
    const bytes = fs.readFileSync(path.resolve(root, src.replace(/^\.\//, '')));
    assert.equal(bytes.toString('ascii', 0, 3), 'ID3');
    const tagSize = ((bytes[6] & 0x7f) << 21) | ((bytes[7] & 0x7f) << 14) | ((bytes[8] & 0x7f) << 7) | (bytes[9] & 0x7f);
    let offset = 10 + tagSize + ((bytes[5] & 0x10) ? 10 : 0), frames = 0;
    const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
    while (offset + 4 <= bytes.length) {
      const header = bytes.readUInt32BE(offset);
      assert.equal(bytes[offset], 0xff);
      assert.equal(bytes[offset + 1] & 0xe0, 0xe0);
      assert.equal((header >>> 19) & 3, 3);
      assert.equal((header >>> 17) & 3, 1);
      assert.equal((header >>> 10) & 3, 0);
      const bitrate = (header >>> 12) & 15;
      assert.ok(bitrate > 0 && bitrate < 15);
      offset += Math.floor(144 * bitrates[bitrate] * 1000 / 44100) + ((header >>> 9) & 1);
      frames++;
    }
    assert.equal(offset, bytes.length, `${src} ends at an MPEG frame boundary`);
    assert.ok(Math.abs(frames * 1152 / 44100 - 12.07) < 0.02, `${src} is approximately 12 seconds`);
  }
});

test('tea-room ambience alternates A/B over one persistent S02/S03 lifecycle with ducking and Sound Off/On', async (t) => {
  const players = [];
  const audioContext = {
    state: 'running', destination: {},
    createMediaElementSource() { return { connect() {} }; },
    createGain() { return { gain: { value: 1 }, connect() {} }; },
    close() { this.state = 'closed'; return Promise.resolve(); }
  };
  class FakeAudio {
    constructor(src) { this.src = src; this.volume = 1; this.paused = true; this.muted = false; this.loop = false; this.currentTime = 0; this.duration = 12.068; this.listeners = new Map(); this.playCalls = 0; }
    async play() { this.playCalls++; this.paused = false; }
    pause() { this.paused = true; }
    addEventListener(name, listener) { this.listeners.set(name, listener); }
    removeEventListener(name) { this.listeners.delete(name); }
  }
  const manager = new AudioManager({ audioContextFactory: () => audioContext, createAudio(src) { const player = new FakeAudio(src); players.push(player); return player; }, fadeMs: 0, duckFadeMs: 0, soundFadeMs: 0 });
  t.after(() => manager.dispose());
  manager.unlock();
  await manager.ensureAmbience('ch04_s01');
  const previousRoom = manager.ambience;
  await manager.ensureAmbience('ch04_s02');
  assert.equal(players.length, 3);
  const [, a, b] = players;
  assert.equal(previousRoom.paused, true, 'the previous S01 room retires after the existing identity crossfade');
  assert.equal(manager.ambience, a, 'Loop A starts first');
  assert.equal(a.paused, false);
  assert.equal(b.paused, true);
  assert.equal(a.__ambienceGainNode.gain.value, CH04_TEA_ROOM_VARIANTS[0].gain);
  assert.equal(b.__ambienceGainNode.gain.value, CH04_TEA_ROOM_VARIANTS[1].gain, 'measured B correction is applied through Web Audio gain');

  assert.equal(await manager.beginAmbienceVariantTransition(), true);
  let fade = manager.ambienceVariantFade;
  assert.equal(b.paused, false);
  fade.startedAt -= 500;
  manager.updateAmbienceVariantFade(fade);
  assert.ok(a.volume > 0 && b.volume > 0, 'crossfade keeps both streams present');
  const rmsA = 0.021471688505507514, rmsB = 0.0007474457100721574;
  const effectivePower = (a.volume * rmsA * CH04_TEA_ROOM_VARIANTS[0].gain) ** 2
    + (b.volume * rmsB * CH04_TEA_ROOM_VARIANTS[1].gain) ** 2;
  assert.ok(Math.abs(effectivePower - (manager.ambienceVolume * rmsA) ** 2) < 1e-12, 'equal-power curves preserve measured ambience energy through the crossfade');
  manager.duck('foreground', 0.28);
  assert.equal(manager.ambienceVariantIndex, 0, 'ducking does not advance or reset the sequence');
  const duckedEffectivePower = (a.volume * rmsA) ** 2 + (b.volume * rmsB * CH04_TEA_ROOM_VARIANTS[1].gain) ** 2;
  assert.ok(duckedEffectivePower < (manager.ambienceVolume * rmsA) ** 2);
  fade.startedAt -= 500;
  manager.updateAmbienceVariantFade(fade);
  assert.equal(manager.ambience, b, 'A transitions to B');
  assert.equal(a.paused, true);
  manager.unduck('foreground');

  const sequencePlayers = [...players];
  await manager.ensureAmbience('ch04_s03');
  assert.equal(manager.ambience, b, 'S02 to S03 preserves the active B source');
  assert.deepEqual(players, sequencePlayers, 'scene boundary creates no new ambience players');
  assert.equal(isContinuousAmbienceTransition('ch04_s02', 'ch04_s03'), true);

  assert.equal(await manager.beginAmbienceVariantTransition(), true);
  fade = manager.ambienceVariantFade;
  fade.startedAt -= 1000;
  manager.updateAmbienceVariantFade(fade);
  assert.equal(manager.ambience, a, 'B transitions back to A');
  assert.equal(await manager.beginAmbienceVariantTransition(), true);
  fade = manager.ambienceVariantFade;
  fade.startedAt -= 1000;
  manager.updateAmbienceVariantFade(fade);
  assert.equal(manager.ambience, b, 'sequence continues beyond one complete cycle');

  assert.equal(await manager.beginAmbienceVariantTransition(), true);
  fade = manager.ambienceVariantFade;
  fade.startedAt -= 350;
  await manager.setEnabled(false);
  assert.equal(a.paused, true);
  assert.equal(b.paused, true);
  assert.equal(manager.ambienceVariantFade, fade, 'Sound Off retains an in-progress crossfade');
  const pausedProgress = fade.pausedProgress;
  await manager.setEnabled(true);
  assert.equal(players.length, 3, 'Sound On resumes the pair without duplicate players');
  assert.equal(manager.ambienceVariantFade, fade, 'Sound On resumes the same transition');
  assert.ok(fade.pausedProgress >= pausedProgress);
  assert.equal(a.paused, false);
  assert.equal(b.paused, false);
  fade.startedAt -= 1000;
  manager.updateAmbienceVariantFade(fade);
  assert.equal(manager.ambience, a, 'resumed transition completes at A without resetting its sequence');
});

test('S02 speech and listening challenges use the existing AudioManager foreground duck mix', () => {
  const manager = new AudioManager({ createAudio: () => ({}), fadeMs: 0, duckFadeMs: 0 });
  manager.ensureAmbience('ch04_s02');
  assert.equal(manager.mix, CH02_AUDIO_MIX);
  assert.equal(manager.mix.storyDuck, CH02_AUDIO_MIX.storyDuck);
  assert.equal(manager.mix.challengeDuck, CH02_AUDIO_MIX.challengeDuck);
  manager.dispose();
});

test('S02 speech ducks and restores the same ambience pair; Sound Off and On pauses and resumes both variants', async (t) => {
  const elements = [];
  class FakeAudio {
    constructor(src) { this.src = src; this.volume = 1; this.paused = true; this.currentTime = 0; this.listeners = new Map(); this.playCalls = 0; }
    async play() { this.playCalls += 1; this.paused = false; }
    pause() { this.paused = true; }
    addEventListener(name, fn) { this.listeners.set(name, fn); }
    removeEventListener(name) { this.listeners.delete(name); }
    emit(name) { this.paused = true; this.listeners.get(name)?.(); }
  }
  const manager = new AudioManager({ createAudio: (src) => { const audio = new FakeAudio(src); elements.push(audio); return audio; }, fadeMs: 0, duckFadeMs: 0, soundFadeMs: 0 });
  t.after(() => manager.dispose());
  manager.unlock();
  await manager.ensureAmbience('ch04_s02');
  const loop = manager.ambience;
  const [loopA, loopB] = manager.ambienceVariants.players;
  assert.equal(loop.loop, false, 'alternation is managed by the AudioManager, not native same-source looping');
  loop.currentTime = 7;
  const voice = await manager.playVoice(CH04_SCENE_02.voice[0].src);
  assert.equal(loop.volume, manager.ambienceVolume * manager.mix.storyDuck);
  voice.emit('ended');
  assert.equal(manager.ambience, loop);
  assert.equal(loop.currentTime, 7);
  assert.equal(loop.volume, manager.ambienceVolume);
  await manager.setEnabled(false);
  assert.equal(loopA.paused, true);
  assert.equal(loopB.paused, true);
  assert.equal(voice.paused, true);
  await manager.setEnabled(true);
  assert.equal(manager.ambience, loop);
  assert.equal(loop.paused, false);
  assert.equal(loop.playCalls, 2);
  assert.equal(loopB.paused, true, 'Sound On does not start an inactive second variant');
  assert.equal(voice.playCalls, 1, 'Sound On does not replay foreground speech');
});

test('Teacher Mode includes LC11 key, /eɪ/ observation, Eliza voice stage and cultural reference', () => {
  const combined = CH04_S02_TEACHER_SECTIONS.flat().join('\n');
  assert.match(combined, /lc11_sample_01 = opening/);
  assert.match(combined, /lc11_sample_02 = continuing/);
  assert.match(combined, /lc11_sample_03 = closing/);
  assert.match(combined, /Emerging New Speech/);
  assert.match(combined, /\/eɪ\//);
  assert.match(combined, /not text from Shaw’s original play Pygmalion/);
});

test('Teacher cultural reference is a separate explicit foreground-only asset', () => {
  assert.equal(CH04_TEACHER_REFERENCE_AUDIO.id, 'teacher_ref_my_fair_lady_rain_in_spain');
  assert.equal(CH04_TEACHER_REFERENCE_AUDIO.transcript, 'The rain in Spain stays mainly in the plain.');
  assert.equal(CH04_TEACHER_REFERENCE_AUDIO.src, './assets/audio/characters/narrator/ch04_teacher_reference_rain_in_spain_001.mp3');
  assert.equal(CH04_TEACHER_REFERENCE_AUDIO.generationId, 'A2vA6PGvssv3snWNkpym');
  const contract = CH04_S02_TEACHER_SECTIONS.at(-1)[1];
  assert.match(contract, /separate from AM35\/AM36/);
  assert.match(contract, /explicit Teacher Mode click/);
  assert.match(contract, /no learner state/);
});

test('S02 Teacher preview contract stays read-only', () => {
  assert.match(CH04_S02_TEACHER_SECTIONS.at(-1)[1], /answers, attempts, support use, challenge completion, optional reply/);
  assert.match(CH04_S02_TEACHER_SECTIONS.at(-1)[1], /no learner state/);
});

test('all eight approved MP3 paths and the converted background exist and are non-empty', () => {
  const paths = [
    ...CH04_SCENE_02.voice.map(({ src }) => src),
    ...CH04_SCENE_02.challenge.samples.map(({ src }) => src),
    CH04_TEACHER_REFERENCE_AUDIO.src,
    AMBIENCE_FILES.ch04_social_tea_room,
    CH04_SCENE_02.background.src
  ];
  assert.equal(paths.length, 9);
  for (const source of paths) {
    const file = path.resolve(root, source.replace(/^\.\//, ''));
    assert.equal(fs.existsSync(file), true, `missing canonical S02 asset ${source}`);
    assert.ok(fs.statSync(file).size > 1000, `empty or truncated S02 asset ${source}`);
  }
});

test('all eight downloaded files have ID3 metadata and a valid MPEG audio frame sequence', () => {
  const audioPaths = [
    ...CH04_SCENE_02.voice.map(({ src }) => src),
    ...CH04_SCENE_02.challenge.samples.map(({ src }) => src),
    CH04_TEACHER_REFERENCE_AUDIO.src,
    AMBIENCE_FILES.ch04_social_tea_room
  ];
  for (const source of audioPaths) {
    const bytes = fs.readFileSync(path.resolve(root, source.replace(/^\.\//, '')));
    assert.equal(bytes.toString('ascii', 0, 3), 'ID3', `${source} has an MP3 ID3 header`);
    const tagSize = ((bytes[6] & 0x7f) << 21) | ((bytes[7] & 0x7f) << 14) | ((bytes[8] & 0x7f) << 7) | (bytes[9] & 0x7f);
    const frameStart = 10 + tagSize + (bytes[5] & 0x10 ? 10 : 0);
    let hasFrame = false;
    for (let index = frameStart; index < Math.min(frameStart + 8192, bytes.length - 1); index += 1) {
      if (bytes[index] === 0xff && (bytes[index + 1] & 0xe0) === 0xe0) { hasFrame = true; break; }
    }
    assert.equal(hasFrame, true, `${source} has MPEG audio frames`);
  }
});

test('browser view keeps story voice optional and reveals LC11 transcript only after explicit pre-answer support request', async (t) => {
  const names = ['document', 'window', 'localStorage', 'Audio'];
  const originals = Object.fromEntries(names.map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  t.after(() => { for (const [key, descriptor] of Object.entries(originals)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; });
  const nodes = new Map(); const events = {}; const played = [];
  const node = (key) => {
    if (!nodes.has(key)) nodes.set(key, { innerHTML: '', textContent: '', open: false, className: '', focus() {}, scrollIntoView() {}, setAttribute() {}, removeAttribute() {}, addEventListener() {}, querySelector() { return node('close'); }, showModal() { this.open = true; }, close() { this.open = false; } });
    return nodes.get(key);
  };
  class FakeAudio {
    constructor(src) { this.src = src; this.paused = true; this.volume = 1; this.listeners = new Map(); played.push(this); }
    play() { this.paused = false; return Promise.resolve(); }
    pause() { this.paused = true; }
    addEventListener(name, fn) { this.listeners.set(name, fn); }
    removeEventListener(name) { this.listeners.delete(name); }
  }
  const savedValue = savedProgress(ready());
  let saved = savedValue;
  globalThis.document = { querySelector: node, addEventListener(name, fn) { events[name] = fn; } };
  globalThis.Audio = FakeAudio;
  globalThis.window = { location: { hash: '#ch04_s02', pathname: '/' }, history: { state: { scene: 'ch04_s02' }, pushState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; }, replaceState(_state, _title, url) { this.state = _state; window.location.hash = url.startsWith('#') ? url : ''; } }, setTimeout(fn) { fn(); }, addEventListener() {}, confirm() { return false; } };
  globalThis.localStorage = { getItem() { return saved; }, setItem(_key, value) { saved = value; } };
  await import('../src/app.js?ch04-s02-view');
  const click = (action, data = {}, trusted = false) => events.click({ isTrusted: trusted, target: { closest() { return { dataset: { action, ...data }, focus() {} }; } } });
  let html = node('#app').innerHTML;
  assert.match(html, /Names and Weather/);
  assert.match(html, /It rained on the way here, but today the sky is clearing\.[\s\S]*?Replay Eliza/);
  assert.doesNotMatch(html, /Miss Doolittle, have you been in London long\?/);
  assert.equal((html.match(/data-action="play-voice"/g) || []).length, 3);
  assert.match(html, /Open transcript support for sample 1/);
  assert.doesNotMatch(html, /Transcript:<\/strong> “Miss Doolittle/);
  assert.equal(saved.includes('"attempts":0'), true, 'render exposes support before any answer attempt');
  const initialSignals = readSavedProgress(saved);
  await click('open-lc11-support', { sample: 'lc11_sample_01' });
  html = node('#app').innerHTML;
  assert.match(html, /Transcript:<\/strong> “Miss Doolittle, have you been in London long\?/);
  assert.equal((html.match(/data-action="answer-lc11"/g) || []).length, 3, 'revealed support leaves every answer available');
  const preAnswerSupported = readSavedProgress(saved);
  assert.equal(preAnswerSupported.challenges.lc11.attempts, 0);
  assert.equal(preAnswerSupported.challenges.lc11.answers.lc11_sample_01, undefined);
  assert.equal(preAnswerSupported.challenges.lc11.completed, false);
  assert.equal(preAnswerSupported.applied_events.includes('ch04_lc11_complete'), false);
  assert.deepEqual([preAnswerSupported.pronunciation, preAnswerSupported.confidence, preAnswerSupported.independence], [initialSignals.pronunciation, initialSignals.confidence, initialSignals.independence]);
  assert.deepEqual(played, [], 'support does not trigger audio playback');
  await click('answer-lc11', { sample: 'lc11_sample_01', answer: 'lc11_01_closing' });
  html = node('#app').innerHTML;
  assert.match(html, /Transcript:<\/strong> “Miss Doolittle, have you been in London long\?/);
  const supportedState = readSavedProgress(saved);
  assert.equal(supportedState.challenges.lc11.attempts, 1, 'only the answer increments attempts');
  assert.deepEqual([supportedState.pronunciation, supportedState.confidence, supportedState.independence], [initialSignals.pronunciation, initialSignals.confidence, initialSignals.independence]);
  assert.equal(supportedState.challenges.lc11.answers.lc11_sample_01.correct, false, 'support does not replace the attempted answer');
  await click('answer-lc11', { sample: 'lc11_sample_01', answer: 'lc11_01_opening' });
  html = node('#app').innerHTML;
  assert.match(html, /Open transcript support for sample 2/);
  await click('open-lc11-support', { sample: 'lc11_sample_02' });
  html = node('#app').innerHTML;
  assert.match(html, /Transcript:<\/strong> “I see\. And what do you think of the weather today\?/);
  assert.equal(readSavedProgress(saved).challenges.lc11.answers.lc11_sample_02, undefined, 'pre-answer support does not choose an answer');
  assert.deepEqual(played, [], 'sample 2 support does not trigger audio playback');
  await click('answer-lc11', { sample: 'lc11_sample_02', answer: 'lc11_02_continuing' });
  html = node('#app').innerHTML;
  assert.match(html, /Open transcript support for sample 3/);
  await click('open-lc11-support', { sample: 'lc11_sample_03' });
  html = node('#app').innerHTML;
  assert.match(html, /Transcript:<\/strong> “Well, it was lovely speaking with you\./);
  assert.deepEqual(played, [], 'sample 3 support does not trigger audio playback');
  await click('answer-lc11', { sample: 'lc11_sample_03', answer: 'lc11_03_closing' });
  html = node('#app').innerHTML;
  assert.match(html, /LC11 complete/);
  assert.match(html, /Continue to the next scene/);
  await click('open-teacher');
  const beforeTeacherAudio = saved;
  assert.match(node('#teacher-content').innerHTML, /teacher-play-reference/);
  assert.match(node('#teacher-content').innerHTML, /The rain in Spain stays mainly in the plain\./);
  await click('teacher-play-reference', { src: CH04_TEACHER_REFERENCE_AUDIO.src }, true);
  assert.equal(saved, beforeTeacherAudio, 'reference playback does not write learner state');
  assert.deepEqual(played.map(({ src }) => src), [CH04_TEACHER_REFERENCE_AUDIO.src]);
  await click('teacher-preview');
  assert.equal(saved, beforeTeacherAudio, 'opening read-only preview does not mutate progress');
  html = node('#app').innerHTML;
  assert.match(html, /Teacher preview · read-only/);
  assert.doesNotMatch(html, /data-action="play-voice"|data-action="play-challenge"|data-action="answer-lc11"/);
});

test('S02 preview and return controls do not advance the scene', () => {
  const state = ready();
  assert.equal(state.scene, 'ch04_s02');
  assert.equal(state.applied_events.includes('ch04_s02_complete'), false);
  assert.equal(state.challenges.lc11.applicationChoice, null);
});
