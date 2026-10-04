import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH04_SCENE_03, CH04_SCENE_04, CH04_S04_TEACHER_SECTIONS } from '../src/ch04-content.js';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { AudioManager, CH04_CORRIDOR_CROSSFADE_MS } from '../src/audio.js';
import { canAdvanceScene, completeScene, createInitialState, getSceneAdvanceBlock, loadState, recordS04Reflection, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ready = () => ({ ...setScene(createInitialState(), 'ch04_s04'), applied_events: ['ch04_s03_complete'], confidence: 2, independence: 3, pronunciation: 4 });
const count = (state, id) => state.applied_events.filter((entry) => entry === id).length;

function inspectMp3(file) {
  const bytes = fs.readFileSync(file);
  assert.ok(bytes.length > 0);
  assert.notEqual(bytes.subarray(0, 3).toString(), '<ht');
  let offset = bytes.subarray(0, 3).toString() === 'ID3' ? 10 + ((bytes[6] & 127) << 21) + ((bytes[7] & 127) << 14) + ((bytes[8] & 127) << 7) + (bytes[9] & 127) : 0;
  let frames = 0, duration = 0;
  while (offset + 4 <= bytes.length) {
    const header = bytes.readUInt32BE(offset);
    assert.equal(header >>> 21, 0x7ff, `bad MPEG sync at ${offset}`);
    const version = (header >>> 19) & 3, layer = (header >>> 17) & 3;
    assert.equal(version, 3, 'expected MPEG-1'); assert.equal(layer, 1, 'expected Layer III');
    const bitrateIndex = (header >>> 12) & 15, sampleIndex = (header >>> 10) & 3;
    const bitrates = [0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,0];
    const rates = [44100,48000,32000,0];
    const bitrate = bitrates[bitrateIndex], sampleRate = rates[sampleIndex];
    assert.ok(bitrate && sampleRate, 'valid bitrate/sample rate'); assert.equal(sampleRate, 44100);
    const padding = (header >>> 9) & 1, frameBytes = Math.floor(144000 * bitrate / sampleRate) + padding;
    assert.ok(offset + frameBytes <= bytes.length, `incomplete frame at ${offset}`);
    offset += frameBytes; frames++; duration += 1152 / sampleRate;
  }
  assert.equal(offset, bytes.length, 'no trailing partial data'); assert.ok(frames > 20);
  return { bytes: bytes.length, frames, duration };
}

test('S04 is registered with locked story lines, visible transcripts, canonical approved voices, and no challenge', () => {
  assert.equal(CH04_SCENE_04.id, 'ch04_s04'); assert.equal(CH04_SCENE_04.nextScene, 'ch04_s05');
  assert.equal(CH04_SCENE_04.voiceStage, 'Emerging New Speech'); assert.equal(CH04_SCENE_04.challenge, undefined);
  assert.equal(CH04_SCENE_04.storyBeats[0].text, 'A few minutes later, the corridor is quieter. The voices from the tea room are muffled behind the door.');
  assert.deepEqual(CH04_SCENE_04.storyBeats.filter(({ speaker }) => speaker).map(({ speaker,text }) => [speaker,text]), [
    ['Pickering','You spoke clearly, Eliza. The difficulty was not the words.'],
    ['Mrs Pearce','People often say one thing and mean something more. That takes time to learn.'],
    ['Eliza','Then I must learn the people as well as the language.'],
    ['Higgins','Exactly. Tonight is useful because it shows us what still needs work.'],
    ['Eliza','It shows you what still needs work.'],
    ['Higgins','It is a test, Eliza.'],
    ['Eliza','Then I should have a say in what the test is for.']
  ]);
  assert.deepEqual(CH04_SCENE_04.voice.map(({ transcript }) => transcript), CH04_SCENE_04.storyBeats.filter(({ speaker }) => speaker).map(({ text }) => text));
  assert.deepEqual(CH04_SCENE_04.voice.map(({ generationId, assetId }) => [generationId, assetId]), [
    ['ZNsgEsjAmdm9TmOJR4OR','JfV4RseG9a5GZAZ034iY'], ['0LuiuJqkbexw11VzmhZD','sAYmTLMdBlDm7ivz9ZVk'],
    ['4R37vYV1NwpvO5V7diXs','OmOEpEuboSezj5Vlgttm'], ['Iqxe4dpiQuDh0ZsebHct','3T3mfCVqEkYbnuIeliXJ'],
    ['fOe45TP0PgR3Z2yuGI3J','0DiNCvJrha1ZNtpWaH5Y'], ['MEeL5AyD5tMNidQLXTTk','skLkAddQhQ0U4cdeq1PN'],
    ['DFjggg9jDr1aJGh5vIq2','75T0W0JVAdd5y3ef8C5p']
  ]);
  assert.deepEqual(CH04_SCENE_04.voice.map(({ voiceId }) => voiceId), ['JBFqnCBsd6RMkjVDRZzb','kBag1HOZlaVBH7ICPE8x','124kaYCknTDsnwUFdWl9','JlptfLxaUpd8pZcw9dKd','124kaYCknTDsnwUFdWl9','JlptfLxaUpd8pZcw9dKd','124kaYCknTDsnwUFdWl9']);
  assert.equal(CH04_SCENE_03.nextScene, 'ch04_s04');
  assert.deepEqual(CH04_SCENE_04.reflection.choices.map(({ id }) => id), ['language','audience','feeling']);
  assert.match(CH04_SCENE_04.reflection.prompt, /What should Eliza carry forward/);
  assert.equal(CH04_SCENE_04.background.src, './assets/images/locations/ch04/ch04_side_corridor.webp');
  assert.equal(ambienceForScene('ch04_s04'), 'ch04_side_corridor');
  assert.equal(isContinuousAmbienceTransition('ch04_s03','ch04_s04'), false);
});

test('S04 requires S03 and reflection; writes one stable non-graded value and completes explicitly once', () => {
  const blocked = setScene(createInitialState(), 'ch04_s04');
  assert.equal(canAdvanceScene(blocked, CH04_SCENE_04), false);
  assert.match(getSceneAdvanceBlock(blocked, CH04_SCENE_04), /Complete Chapter IV Scene 03/);
  assert.equal(recordS04Reflection(blocked, 'language'), blocked);
  let state = ready();
  const signals = [state.confidence,state.independence,state.pronunciation];
  assert.equal(canAdvanceScene(state, CH04_SCENE_04), false);
  assert.equal(recordS04Reflection(state, 'bogus'), state);
  state = recordS04Reflection(state, 'audience');
  assert.equal(state.reflections.ch04_s04_focus, 'audience');
  assert.equal(count(state, 'ch04_s04_reflection_recorded'), 1);
  assert.equal(recordS04Reflection(state, 'feeling'), state);
  assert.equal(state.reflection_focus, undefined);
  assert.deepEqual([state.confidence,state.independence,state.pronunciation], signals);
  assert.equal(canAdvanceScene(state, CH04_SCENE_04), true);
  const restored = loadState({ getItem: () => JSON.stringify(state) });
  assert.equal(restored.reflections.ch04_s04_focus, 'audience');
  const complete = completeScene(state, CH04_SCENE_04);
  assert.equal(count(complete, 'ch04_s04_complete'), 1);
  assert.equal(completeScene(complete, CH04_SCENE_04), complete);
  assert.equal(count(complete, 'ch04_s04_reflection_recorded'), 1);
  assert.deepEqual([complete.confidence,complete.independence,complete.pronunciation], signals);
});

test('approved corridor art and all eight audio files are local, complete and decodable MPEG frame sequences', () => {
  const image = fs.readFileSync(path.join(root, 'assets/images/locations/ch04/ch04_side_corridor.webp'));
  assert.equal(image.subarray(0,4).toString(), 'RIFF'); assert.equal(image.subarray(8,12).toString(), 'WEBP');
  const audio = [...CH04_SCENE_04.voice.map(({ src }) => src), './assets/audio/ambience/ch04_side_corridor_ambient.mp3'];
  assert.equal(audio.length, 8);
  const metadata = audio.map((src) => inspectMp3(path.join(root, src.replace(/^\.\//,''))));
  const expectedDurations = [7.36,5.84,9.36,8.32,2.08,1.60,2.56,18.0];
  metadata.forEach(({ duration }, index) => assert.ok(Math.abs(duration - expectedDurations[index]) <= 0.12, `${audio[index]} duration ${duration.toFixed(3)}s`));
  for (const asset of CH04_SCENE_04.voice) assert.ok(asset.transcript && asset.src.includes('/characters/'));
});

test('corridor ambience waits for a conscious unlock and the reflection Continue exists only after selection', async (t) => {
  const elements=[]; const manager=new AudioManager({createAudio:(src)=>{const audio=new FakeAudio(src);elements.push(audio);return audio;}});
  t.after(()=>manager.dispose()); await manager.ensureAmbience('ch04_s04'); assert.equal(elements.length,0);
  const app=fs.readFileSync(path.join(root,'src/app.js'),'utf8');
  const reflection=app.match(/function renderS04Reflection\(scene\) \{[\s\S]*?\n\}/)?.[0] || '';
  assert.match(reflection,/selected && !scenePreview/); assert.match(reflection,/data-action="next-scene"/);
  assert.match(app,/scene\.id !== 'ch04_s04' && !scene\.challenge/,'generic Continue cannot duplicate the reflection-gated button');
  assert.match(app,/if \(action === 'choose-s04-reflection'.*?recordS04Reflection/s);
  assert.doesNotMatch(reflection,/correct|incorrect|best|wrong|weak/i);
});

class FakeAudio {
  constructor(src) { this.src=src; this.volume=1; this.paused=true; this.muted=false; this.listeners=new Map(); this.duration=30; this.currentTime=0; this.playCalls=0; }
  async play() { this.paused=false; this.playCalls++; }
  pause() { this.paused=true; }
  addEventListener(type, fn) { if(!this.listeners.has(type)) this.listeners.set(type,new Set()); this.listeners.get(type).add(fn); }
  removeEventListener(type, fn) { this.listeners.get(type)?.delete(fn); }
}

test('S03→S04 keeps the active tea-room loop position and crossfades to corridor for 1.5 s with speech ducking', async (t) => {
  const elements=[]; const manager=new AudioManager({ fadeMs:0,duckFadeMs:0,soundFadeMs:0, createAudio:(src)=>{const audio=new FakeAudio(src);elements.push(audio);return audio;} });
  t.after(()=>manager.dispose()); manager.unlock(); await manager.ensureAmbience('ch04_s03');
  const tea=manager.ambience; tea.currentTime=12.5;
  await manager.ensureAmbience('ch04_s04');
  const corridor=manager.ambience;
  assert.equal(tea.currentTime,12.5); assert.equal(tea.paused,false); assert.equal(corridor.paused,false);
  assert.equal(manager.ambienceTransition.from,tea); assert.equal(manager.ambienceTransition.to,corridor);
  assert.equal(CH04_CORRIDOR_CROSSFADE_MS,1500);
  assert.equal(tea.playCalls,1, 'the currently playing Loop A instance is not restarted');
  manager.duck('voice',0.78); assert.ok(tea.volume < manager.ambienceVolume); assert.ok(corridor.volume < manager.ambienceVolume);
  await manager.setEnabled(false); assert.equal(tea.paused,true); assert.equal(corridor.paused,true);
  await manager.setEnabled(true); await manager.ensureAmbience('ch04_s04');
  assert.equal(manager.ambienceTransition.from,tea); assert.equal(manager.ambienceTransition.to,corridor);
  assert.equal(corridor.playCalls,2);
});

test('corridor transition retires only the old active tea bed and duck restores on the corridor loop', async (t) => {
  const elements=[]; const manager=new AudioManager({ fadeMs:0,duckFadeMs:0,soundFadeMs:0, createAudio:(src)=>{const audio=new FakeAudio(src);elements.push(audio);return audio;} });
  t.after(()=>manager.dispose()); manager.unlock(); await manager.ensureAmbience('ch04_s03');
  const tea=manager.ambience; const inactive=manager.ambienceVariants.players[1];
  await manager.ensureAmbience('ch04_s04'); const corridor=manager.ambience;
  manager.duck('voice',0.78);
  await new Promise((resolve)=>setTimeout(resolve,CH04_CORRIDOR_CROSSFADE_MS+80));
  assert.equal(manager.ambienceTransition,null); assert.equal(tea.paused,true); assert.equal(inactive.paused,true);
  assert.equal(corridor.paused,false); assert.equal(corridor.loop,true);
  assert.ok(Math.abs(corridor.volume-manager.ambienceVolume*0.78)<0.002);
  manager.unduck('voice'); assert.equal(corridor.volume,manager.ambienceVolume);
  manager.leaveScene(); await new Promise((resolve)=>setTimeout(resolve,0)); assert.equal(corridor.paused,true);
});

test('Sound Off during a tea-room A/B fade resumes that handoff before the corridor fade', async (t) => {
  const elements=[]; const manager=new AudioManager({ fadeMs:0,duckFadeMs:0,soundFadeMs:0, createAudio:(src)=>{const audio=new FakeAudio(src);elements.push(audio);return audio;} });
  t.after(()=>manager.dispose()); manager.unlock(); await manager.ensureAmbience('ch04_s03');
  const loopA=manager.ambience; loopA.currentTime=12.5; await manager.beginAmbienceVariantTransition();
  const entering=manager.ensureAmbience('ch04_s04');
  await manager.setEnabled(false); await entering;
  assert.equal(manager.ambienceTransition,null);
  await manager.setEnabled(true);
  assert.equal(manager.ambienceId,'ch04_side_corridor');
  assert.equal(manager.ambienceTransition.from,elements.find(({src})=>src.endsWith('_b.mp3')));
  assert.equal(loopA.currentTime,12.5,'the tea-room A position is preserved across the sound toggle');
});

test('Teacher preview and the S05 boundary stay read-only and runtime does not leave the tea-room on S03 completion', () => {
  const app=fs.readFileSync(path.join(root,'src/app.js'),'utf8');
  assert.match(app,/\[CH04_SCENE_04\.id\]: CH04_SCENE_04/);
  assert.match(app,/choose-s04-reflection/); assert.match(app,/CH04_S04_TEACHER_SECTIONS/);
  assert.match(app,/currentScene\(\)\.id === 'ch04_s04' && studentReadOnly\(\)/);
  assert.match(app,/hashScene === 'ch04_s05'/);
  const s03=app.match(/if \(scene\.id === 'ch04_s03'\) \{[\s\S]*?\n  \}/)?.[0] || '';
  assert.doesNotMatch(s03,/audioManager\.leaveScene\(\)/);
  assert.match(app,/\['ch04_s02', 'ch04_s03', 'ch04_s04'\]\.includes\(scene\.id\) && scenePreview/);
  const teacher=CH04_S04_TEACHER_SECTIONS.flat().join(' ');
  assert.match(teacher,/Read-only/); assert.match(teacher,/does not autoplay/i);
});
