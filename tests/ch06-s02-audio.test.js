import test from 'node:test';
import assert from 'node:assert/strict';
import { AudioManager } from '../src/audio.js';
import { CH06_S02_REPLAY_MOMENTS } from '../src/ch06-content.js';

class FakeAudio {
  constructor(src) { this.src = src; this.paused = true; this.volume = 1; this.muted = false; this.listeners = new Map(); this.playCalls = 0; }
  addEventListener(name, fn) { this.listeners.set(name, fn); }
  removeEventListener(name) { this.listeners.delete(name); }
  async play() { this.playCalls++; this.paused = false; }
  pause() { this.paused = true; }
}

test('active S02 replay is stopped by Sound Off and never restarted by Sound On', async () => {
  const created = [];
  const manager = new AudioManager({ createAudio: (src) => { const audio = new FakeAudio(src); created.push(audio); return audio; }, soundFadeMs: 0 });
  manager.unlock();
  await manager.ensureAmbience('ch06_s02');
  const src = CH06_S02_REPLAY_MOMENTS.find(({ id }) => id === 'ch06-s02-learning-recovery').src;
  await manager.playVoice(src);
  assert.equal(created.length, 1, 'no ambience or background speech is started for S02');
  const firstReplay = created[0];
  assert.equal(firstReplay.playCalls, 1);
  await manager.playVoice(src);
  const interrupted = created[1];
  assert.equal(firstReplay.paused, true, 'a replay replaces the previous foreground clip');
  assert.strictEqual(manager.foreground.element, interrupted);
  await manager.setEnabled(false);
  assert.equal(interrupted.paused, true);
  assert.equal(manager.foreground, null);
  await manager.setEnabled(true);
  assert.equal(interrupted.playCalls, 1, 'Sound On does not restart interrupted speech');
  assert.equal(created.length, 2, 'Sound On does not introduce ambience into silent S02');
  manager.dispose();
});
