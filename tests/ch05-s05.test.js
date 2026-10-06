import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ambienceForScene } from '../src/content.js';
import { AMBIENCE_FILES, AudioManager, CH02_AUDIO_MIX, CH04_CORRIDOR_CROSSFADE_MS } from '../src/audio.js';
import { CH05_SCENE_01, CH05_SCENE_02, CH05_SCENE_03, CH05_SCENE_04, CH05_SCENE_05, CH05_S05_TEACHER_SECTIONS } from '../src/ch05-content.js';
import { applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, saveState, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const contacts = ['higgins_directly', 'pickering_first', 'mrs_pearce_first'];
const ready = (state = createInitialState()) => setScene({
  ...state,
  applied_events: [...state.applied_events, 'ch05_s04_complete'],
  origin_motivation: 'independence',
  reception_register_plan: 'd10_keep_core_voice',
  credit_response: 'd11_private_conversation',
  future_question_style: 'plan_focused',
  independence: 2
}, CH05_SCENE_05.id);

class FakeAudio {
  constructor(src) { this.src = src; this.volume = 1; this.paused = true; this.muted = false; this.loop = false; this.listeners = new Map(); this.currentTime = 0; this.duration = 30; this.playCalls = 0; }
  async play() { this.playCalls++; this.paused = false; }
  pause() { this.paused = true; }
  addEventListener(type, fn) { if (!this.listeners.has(type)) this.listeners.set(type, new Set()); this.listeners.get(type).add(fn); }
  removeEventListener(type, fn) { this.listeners.get(type)?.delete(fn); }
  emit(type) { if (type === 'ended' || type === 'error') this.paused = true; for (const fn of [...(this.listeners.get(type) || [])]) fn(); }
}

test('S05 uses the approved location and canonical Chapter V character cutouts without changing S01–S04', () => {
  const background = './assets/images/locations/ch05/ch05_lambeth_public_rooms_front_steps_night.webp';
  const eliza = './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png';
  const higgins = './assets/images/characters/higgins/runtime/higgins_master_cutout.png';
  const assetExists = (src) => fs.existsSync(path.join(root, src.replace(/^\.\//, '')));

  assert.ok(assetExists(background), 'canonical front-steps background exists');
  assert.ok(assetExists(eliza), 'canonical Her Own Voice Eliza cutout exists');
  assert.ok(assetExists(higgins), 'canonical Higgins cutout exists');
  assert.equal(CH05_SCENE_05.background.src, background);
  assert.equal(CH05_SCENE_05.plate.src, background);
  assert.equal(CH05_SCENE_05.composition, 'ch05-front-steps');
  assert.equal(CH05_SCENE_05.eliza.src, eliza);
  assert.deepEqual(CH05_SCENE_05.supporting.map(({ src }) => src), [higgins]);
  assert.notEqual(CH05_SCENE_05.background.src, CH05_SCENE_04.background.src, 'S05 must not fall back to the S04 side room');
  assert.match(styles, /\.ch05-front-steps \.art-eliza img \{ left: 29%; height: 64%; z-index: 2; \}/);
  assert.match(styles, /\.ch05-front-steps \.supporting-character \{ left: 71%; height: 51%; z-index: 1;/);
  assert.deepEqual(
    [CH05_SCENE_01, CH05_SCENE_02, CH05_SCENE_03, CH05_SCENE_04].map(({ background: image }) => image.src),
    [
      './assets/images/locations/ch05/ch05_exhibition_hall.webp',
      './assets/images/locations/ch05/ch05_exhibition_hall.webp',
      './assets/images/locations/ch05/ch05_exhibition_hall.webp',
      './assets/images/locations/ch05/ch05_lambeth_public_rooms_side_room.webp'
    ],
    'S01–S04 canonical backgrounds remain unchanged'
  );
});

test('S05 content follows the locked scene text, uses the S04 guard and canonical contact choices', () => {
  assert.deepEqual([CH05_SCENE_05.id, CH05_SCENE_05.title, CH05_SCENE_05.location, CH05_SCENE_05.nextScene], ['ch05_s05', 'Leaving the Hall', 'Front steps of Lambeth Public Rooms at night', 'ch06_s01']);
  assert.deepEqual(CH05_SCENE_05.storyBeats.map(({ text }) => text), [
    'The hall becomes quieter behind Eliza. The evening has gone well, but it has not decided what she should do next.',
    'Well, Eliza? Are you coming?',
    'Eliza does not automatically follow him.',
    'I know enough now to ask what comes next.'
  ]);
  assert.deepEqual(CH05_SCENE_05.decision.choices.map(({ id }) => id), contacts);
  assert.deepEqual(CH05_SCENE_05.decision.choices.map(({ title }) => title), [
    'I want to speak with Higgins directly.', 'I want to speak with Pickering first.', 'I want to ask Mrs Pearce for practical support first.'
  ]);
  assert.deepEqual(CH05_SCENE_05.voice.map(({ id, speaker, transcript, generationId, voiceId, model, duration, transcriptVerified, humanApproved }) => [id, speaker, transcript, generationId, voiceId, model, duration, transcriptVerified, humanApproved]), [[
    'AM51', 'Eliza', 'I know enough now to ask what comes next.', 'hYtu6jZth0CXAH3YmJhM', '124kaYCknTDsnwUFdWl9', 'eleven_v3', 2.24, 'PASS', true
  ]]);
  assert.equal(CH05_SCENE_05.voice[0].src, './assets/audio/characters/eliza/eliza_ch05_scene05_001.mp3');
  assert.ok(fs.statSync(path.join(root, CH05_SCENE_05.voice[0].src.slice(2))).size > 0);
  assert.ok(CH05_SCENE_05.voice[0].inline);
  assert.match(getSceneAdvanceBlock(setScene(createInitialState(), CH05_SCENE_05.id), CH05_SCENE_05), /Complete Chapter V Scene 04/);
  assert.match(app, /hashScene === 'ch05_s05' && !state\.applied_events\.includes\('ch05_s04_complete'\)/);
  assert.doesNotMatch(CH05_SCENE_05.storyBeats.map(({ text }) => text).join(' '), /not implemented/i);
});

test('S05 maps directly to the existing AM42 asset and intentionally omits optional AM52 SFX', () => {
  const source = AMBIENCE_FILES.ch04_evening_walk;
  const plan = fs.readFileSync(path.join(root, 'docs/chapters/ch05/AUDIO_PLAN.md'), 'utf8');
  const sha256 = (relativePath) => createHash('sha256').update(fs.readFileSync(path.join(root, relativePath))).digest('hex').toUpperCase();

  assert.equal(ambienceForScene('ch05_s01'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s02'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s03'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s04'), 'ch05_side_room');
  assert.equal(ambienceForScene('ch05_s05'), 'ch04_evening_walk');
  assert.equal(source, './assets/audio/ambience/ch04_evening_walk_ambient.mp3');
  assert.ok(fs.statSync(path.join(root, source.slice(2))).size > 0, 'the directly reused AM42 file exists');
  assert.equal(fs.existsSync(path.join(root, 'assets/audio/ambience/ch05_lambeth_steps_night_ambient.mp3')), false, 'no Chapter V duplicate ambience is required');
  assert.equal(CH05_SCENE_05.sfx, undefined, 'S05 does not map an optional physical exit cue');
  assert.doesNotMatch(plan, /assets\/audio\/sfx\/sfx_lambeth_public_rooms_exit_001\.mp3/);
  assert.match(plan, /AM52 optional one-shot intentionally omitted because no canonical physical departure event is specified/i);
  assert.match(plan, /no runtime file, Generation ID or Asset ID exists or is expected/i);
  assert.equal(sha256('assets/audio/ambience/ch04_evening_walk_ambient.mp3'), 'CF72B414460D046F73AC6EEFBFA8EB7D10553B65763FA75430FE711BBAF98A53');
  assert.equal(sha256('assets/audio/ambience/ch05_lambeth_side_room_ambient.mp3'), '0404A23F34E5CA90EC1C8A9A705418B62316DE5B1EA6E01FCAB0CA25F9417A81');
  assert.equal(sha256('assets/audio/characters/eliza/eliza_ch05_scene05_001.mp3'), 'F8978A101CEE737CD238E269699A322B1873E23C5E9F84646681806F1F9C303D');
  assert.equal(ambienceForScene('ch04_s04'), 'ch04_side_corridor');
  assert.equal(ambienceForScene('ch04_s05'), 'ch04_evening_walk');
  assert.match(app, /Chapter VI, Her Own Voice, is not yet implemented in this runtime/);
});

test('S04 AM50 equal-power crossfades to S05 AM42; AM51 ducks/restores it and Sound On does not replay interrupted speech', async (t) => {
  const elements = [];
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0, soundFadeMs: 0,
    createAudio: (src) => { const audio = new FakeAudio(src); elements.push(audio); return audio; } });
  t.after(() => manager.dispose());

  await manager.ensureAmbience('ch05_s04');
  assert.equal(elements.length, 0, 'rendering S04 does not autoplay ambience');
  manager.unlock();
  await manager.ensureAmbience('ch05_s04');
  const am50 = manager.ambience;
  assert.equal(am50.src, AMBIENCE_FILES.ch05_side_room);
  assert.equal(am50.loop, true);

  await manager.ensureAmbience('ch05_s05');
  const am42 = manager.ambience;
  assert.equal(am42.src, AMBIENCE_FILES.ch04_evening_walk);
  assert.equal(am42.loop, true, 'AM42 loops continuously in S05');
  assert.equal(manager.mix, CH02_AUDIO_MIX);
  assert.equal(manager.ambienceVolume, 0.10, 'the quiet Chapter II–V ambience convention applies');
  assert.equal(manager.ambienceTransition.from, am50);
  assert.equal(manager.ambienceTransition.to, am42);
  assert.equal(manager.ambienceTransition.durationMs, CH04_CORRIDOR_CROSSFADE_MS);
  assert.equal(CH04_CORRIDOR_CROSSFADE_MS, 1500);
  assert.equal(am50.paused, false);
  assert.equal(am42.paused, false);
  assert.equal(elements.filter(({ loop, paused }) => loop && !paused).length, 2, 'only the outgoing AM50 and incoming AM42 overlap during the crossfade');
  assert.equal(elements.some(({ src }) => src === CH05_SCENE_05.voice[0].src), false, 'AM51 is not created or played by scene render');

  const firstVoice = await manager.playVoice(CH05_SCENE_05.voice[0].src);
  assert.equal(firstVoice.playCalls, 1, 'AM51 starts only after its explicit replay action');
  assert.equal(manager.getAmbienceDuckAmount(), CH02_AUDIO_MIX.storyDuck);
  firstVoice.emit('ended');
  assert.equal(manager.getAmbienceDuckAmount(), 1, 'S05 ambience restores after AM51 ends');
  assert.equal(manager.ambienceTransition.from, am50);
  assert.equal(manager.ambienceTransition.to, am42);

  const interruptedVoice = await manager.playVoice(CH05_SCENE_05.voice[0].src);
  await manager.setEnabled(false);
  assert.equal(interruptedVoice.paused, true, 'Sound Off stops interrupted AM51');
  assert.equal(am50.paused, true, 'Sound Off stops the outgoing loop');
  assert.equal(am42.paused, true, 'Sound Off stops the incoming loop');
  await manager.setEnabled(true);
  assert.equal(interruptedVoice.playCalls, 1, 'Sound On does not replay AM51');
  assert.equal(interruptedVoice.paused, true);
  await new Promise((resolve) => setTimeout(resolve, CH04_CORRIDOR_CROSSFADE_MS + 80));
  assert.equal(manager.ambienceTransition, null);
  assert.equal(am50.paused, true, 'AM50 is retired after the crossfade and does not remain under S05');
  assert.equal(am42.paused, false);
  assert.equal(elements.filter(({ loop, paused }) => loop && !paused).length, 1);
});

test('next_contact is single-write, persists through reload and carries earlier Chapter V fields unchanged', () => {
  for (const contact of contacts) {
    const initial = ready();
    const selected = applyDecision(initial, 'NEXT_CONTACT', contact);
    assert.equal(selected.next_contact, contact);
    assert.deepEqual(selected.applied_events.filter((event) => event === 'ch05_next_contact_recorded'), ['ch05_next_contact_recorded']);
    assert.equal(applyDecision(selected, 'NEXT_CONTACT', contacts.find((candidate) => candidate !== contact)), selected);
    assert.deepEqual([
      selected.origin_motivation, selected.reception_register_plan, selected.credit_response, selected.future_question_style
    ], ['independence', 'd10_keep_core_voice', 'd11_private_conversation', 'plan_focused']);
    assert.equal(selected.confidence, initial.confidence);
    assert.equal(selected.pronunciation, initial.pronunciation);
    assert.equal(selected.independence, initial.independence);
    const storage = new Map();
    saveState(selected, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
    const restored = loadState({ getItem: (key) => storage.get(key) });
    assert.equal(restored.next_contact, contact);
    assert.ok(restored.applied_events.includes('ch05_next_contact_recorded'));
  }
});

test('explicit Continue completes Chapter V and grants Independence +1 exactly once across revisit and reload', () => {
  let state = applyDecision(ready(), 'NEXT_CONTACT', 'higgins_directly');
  assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_05), '');
  const complete = completeScene(state, CH05_SCENE_05);
  assert.equal(complete.ch05_complete, true);
  assert.equal(complete.independence, 3);
  assert.deepEqual(complete.applied_events.filter((event) => event === 'ch05_s05_complete'), ['ch05_s05_complete']);
  assert.equal(completeScene(complete, CH05_SCENE_05), complete);
  const storage = new Map();
  saveState(complete, { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) });
  state = setScene(loadState({ getItem: (key) => storage.get(key) }), CH05_SCENE_05.id);
  assert.equal(state.next_contact, 'higgins_directly');
  assert.equal(state.independence, 3);
  assert.equal(completeScene(state, CH05_SCENE_05), state);
  const backForwardReplay = setScene(setScene(state, 'ch05_s04'), CH05_SCENE_05.id);
  assert.equal(completeScene(backForwardReplay, CH05_SCENE_05).independence, 3);
  assert.equal(backForwardReplay.origin_motivation, 'independence');
  assert.equal(backForwardReplay.reception_register_plan, 'd10_keep_core_voice');
  assert.equal(backForwardReplay.credit_response, 'd11_private_conversation');
  assert.equal(backForwardReplay.future_question_style, 'plan_focused');
  assert.equal(backForwardReplay.next_contact, 'higgins_directly');
  assert.equal(Object.hasOwn(backForwardReplay, 'ending'), false);
});

test('S05 Teacher Mode is registered as read-only and the Chapter VI boundary is explicit', () => {
  const teacher = CH05_S05_TEACHER_SECTIONS.map(([, text]) => text).join(' ');
  assert.match(teacher, /Read-only/i);
  assert.match(teacher, /does not select a contact/i);
  assert.match(app, /scene\?\.id === 'ch05_s05' \? CH05_S05_TEACHER_SECTIONS/);
  assert.match(app, /Chapter V complete/);
  assert.match(app, /Chapter VI, Her Own Voice, is not yet implemented in this runtime/);
  assert.match(app, /target\.dataset\.decision === 'NEXT_CONTACT' && \(currentScene\(\)\.id !== 'ch05_s05' \|\| studentReadOnly\(\)\)/);
});
