import test from 'node:test';
import assert from 'node:assert/strict';
import { ambienceForScene, isContinuousAmbienceTransition } from '../src/content.js';
import { isOneShotAvailable, shouldRestartAmbience } from '../src/audio.js';

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
