import test from 'node:test';
import assert from 'node:assert/strict';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { AudioManager, isOneShotAvailable, shouldRestartAmbience, SFX_MIX, STORY_VOICE_AMBIENCE_DUCK } from '../src/audio.js';
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
  const manager = new AudioManager();
  const ambience = { volume: manager.ambienceVolume };
  manager.ambience = ambience;
  manager.duck('voice', STORY_VOICE_AMBIENCE_DUCK);
  assert.equal(ambience.volume, manager.ambienceVolume * STORY_VOICE_AMBIENCE_DUCK);
  manager.unduck('voice');
  assert.equal(ambience.volume, manager.ambienceVolume);
  assert.equal(manager.ambience, ambience);
});
