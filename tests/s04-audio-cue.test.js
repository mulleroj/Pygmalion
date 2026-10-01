import test from 'node:test';
import assert from 'node:assert/strict';
import { AudioManager, S04_GONG_PAUSE_MS, S04_GONG_BREATH_MS } from '../src/audio.js';
import { CH02_SCENE_04 } from '../src/ch02-content.js';

const voice = CH02_SCENE_04.voice[0];

test('fresh S04 stays silent until unlock, then starts both beds without Higgins Play', async t => {
  const { manager, enter, elements, gongs } = harness(t);
  manager.unlocked = false;
  await enter(); t.mock.timers.tick(20000);
  assert.equal(elements.length, 0); assert.equal(manager.ambientClockTimer, null);
  manager.unlock(); await enter();
  assert.equal(manager.ambience.paused, false); assert.equal(manager.ambience.volume, 0.10);
  assert.equal(manager.contextual.paused, false); assert.equal(manager.contextual.loop, false);
  assert.equal(manager.contextual.volume, 0.012); assert.equal(manager.foreground, null);
  t.mock.timers.tick(14999); assert.equal(gongs().length, 0);
  t.mock.timers.tick(1); await Promise.resolve(); assert.equal(gongs().length, 1);
});

test('ambient clock uses 15s then 27s / 33s intervals without spending or triggering story speech', async t => {
  const { manager, enter, gongs, elements, play } = harness(t);
  await manager.ensureAmbience('ch02_s03'); const interior = manager.ambience;
  interior.currentTime = 9; await enter();
  assert.equal(manager.ambience, interior); assert.equal(interior.currentTime, 9);
  t.mock.timers.tick(15000); await Promise.resolve();
  assert.equal(gongs()[0].volume, 0.08); gongs()[0].emit('ended');
  await enter(); t.mock.timers.tick(26999); assert.equal(gongs().length, 1);
  t.mock.timers.tick(1); await Promise.resolve(); gongs()[1].emit('ended');
  t.mock.timers.tick(32999); assert.equal(gongs().length, 2);
  t.mock.timers.tick(1); await Promise.resolve(); gongs()[2].emit('ended');
  assert.equal(manager.playedOneShots.has(voice.afterVoice.id), false);
  assert.equal(elements.filter(e => e.src === CH02_SCENE_04.voice[1].src).length, 0);
  const higgins = await play(); higgins.emit('ended'); t.mock.timers.tick(400); await Promise.resolve();
  assert.equal(gongs().length, 4); assert.equal(manager.playedOneShots.has(voice.afterVoice.id), true);
});

for (const collision of ['voice', 'story-pause', 'story-clock', 'story-breath']) {
  test(`ambient strike skips ${collision} without backlog`, async t => {
    const { manager, enter, play, gongs } = harness(t); await enter();
    t.mock.timers.tick(14500); const higgins = await play();
    if (collision === 'story-pause') { t.mock.timers.tick(300); higgins.emit('ended'); }
    if (collision === 'story-clock' || collision === 'story-breath') {
      higgins.emit('ended'); t.mock.timers.tick(400); await Promise.resolve();
      if (collision === 'story-breath') gongs()[0].emit('ended');
    }
    t.mock.timers.tick(collision === 'voice' ? 500 : collision === 'story-pause' ? 200 : 100);
    assert.equal(gongs().length, ['story-clock', 'story-breath'].includes(collision) ? 1 : 0);
    assert.equal(manager.oneShots.size, collision === 'story-clock' ? 1 : 0);
    manager.stopForeground(); manager.stopOneShots();
    t.mock.timers.tick(26999); assert.equal(manager.oneShots.size > 0, false);
    t.mock.timers.tick(1); await Promise.resolve(); assert.equal(manager.oneShots.size > 0, true);
  });
}

test('ambient clock cleans up on Sound Off, scene exit and read-only mode; resume starts a fresh interval', async t => {
  const { manager, enter, gongs } = harness(t); await enter();
  t.mock.timers.tick(14000); await manager.setEnabled(false);
  assert.equal(manager.ambientClockTimer, null); t.mock.timers.tick(60000);
  await manager.setEnabled(true); t.mock.timers.tick(14999); assert.equal(gongs().length, 0);
  t.mock.timers.tick(1); await Promise.resolve(); assert.equal(gongs().length, 1);
  manager.setSceneAudioReadOnly(true); assert.equal(gongs()[0].paused, true);
  await enter(); t.mock.timers.tick(60000); assert.equal(gongs().length, 1);
  assert.equal(manager.ambientClockTimer, null);
  manager.setSceneAudioReadOnly(false); t.mock.timers.tick(14999); assert.equal(gongs().length, 1);
  await manager.ensureAmbience('ch02_s03'); assert.equal(manager.ambientClockTimer, null);
  t.mock.timers.tick(60000); assert.equal(gongs().length, 1);
  await enter(); t.mock.timers.tick(15000); await Promise.resolve(); assert.equal(gongs().length, 2);
  manager.leaveScene(); assert.equal(gongs()[1].paused, true); assert.equal(manager.ambientClockTimer, null);
  t.mock.timers.tick(60000); assert.equal(gongs().length, 2);
});
function harness(t) {
  t.mock.timers.enable({ apis: ['Date', 'setInterval', 'setTimeout'] });
  const elements = [];
  const manager = new AudioManager({ fadeMs: 0, duckFadeMs: 0, soundFadeMs: 0, createAudio(src) {
    const element = { src, volume: 1, currentTime: 0, paused: true, loop: false, listeners: new Map(),
      play() { this.paused = false; return Promise.resolve(); }, pause() { this.paused = true; },
      addEventListener(n, f) { this.listeners.set(n, f); }, removeEventListener(n) { this.listeners.delete(n); },
      emit(n) { if (n === 'ended') this.paused = true; this.listeners.get(n)?.(); }
    }; elements.push(element); return element;
  } });
  t.after(() => manager.dispose()); manager.unlock();
  const enter = () => manager.ensureAmbience('ch02_s04', CH02_SCENE_04.contextual);
  const play = () => manager.playVoice(voice.src, voice.afterVoice);
  const gongs = () => elements.filter(e => e.src === voice.afterVoice.src);
  return { manager, enter, play, gongs, elements };
}

test('S04 gong follows natural AM17F ending plus 400ms, is spent on replay/toggle, and resets only on a new visit', async t => {
  const { manager, enter, play, gongs } = harness(t);
  await manager.ensureAmbience('ch02_s03'); const interior = manager.ambience; interior.currentTime = 8;
  await enter(); await enter(); t.mock.timers.tick(2000);
  assert.equal(gongs().length, 0); // Render/preview never schedules a strike.
  assert.equal(manager.ambience, interior); assert.equal(interior.currentTime, 8);
  const higgins = await play(); t.mock.timers.tick(10000);
  assert.equal(gongs().length, 0); // Wall-clock passage cannot substitute for voice ended.
  higgins.emit('ended'); t.mock.timers.tick(S04_GONG_PAUSE_MS - 1);
  assert.equal(gongs().length, 0);
  t.mock.timers.tick(1); await Promise.resolve();
  assert.equal(gongs().length, 1); assert.equal(gongs()[0].paused, false);
  assert.equal(gongs()[0].loop, false); assert.equal(gongs()[0].volume, 0.08);
  assert.equal(interior.volume, 0.10);
  const replay = await play(); assert.equal(gongs()[0].paused, true);
  replay.emit('ended'); t.mock.timers.tick(1000); assert.equal(gongs().length, 1);
  await manager.setEnabled(false); await manager.setEnabled(true); await enter();
  t.mock.timers.tick(1000); assert.equal(gongs().length, 1);
  await manager.ensureAmbience('ch02_s03'); await enter();
  const next = await play(); next.emit('ended'); t.mock.timers.tick(400); await Promise.resolve();
  assert.equal(gongs().length, 2); assert.equal(manager.ambience, interior);
  await manager.ensureAmbience('ch02_s03'); assert.equal(gongs()[1].paused, true);
});

for (const interruption of ['replay', 'sound-off', 'scene-change', 'teacher', 'dispose']) {
  test(`pending S04 gong is cancelled by ${interruption}`, async t => {
    const { manager, enter, play, gongs } = harness(t); await enter();
    const higgins = await play(); higgins.emit('ended');
    if (interruption === 'replay') await play();
    if (interruption === 'sound-off') { await manager.setEnabled(false); await manager.setEnabled(true); }
    if (interruption === 'scene-change') await manager.ensureAmbience('ch02_s03');
    if (interruption === 'teacher') manager.cancelStoryCue();
    if (interruption === 'dispose') manager.dispose();
    t.mock.timers.tick(1000); assert.equal(gongs().length, 0);
  });
}

test('voice error, stopped speech and Teacher preview speech never trigger the gong', async t => {
  const { manager, enter, play, gongs } = harness(t); await enter();
  const failed = await play(); failed.emit('error'); t.mock.timers.tick(1000);
  const stopped = await play(); manager.stopForeground(); stopped.emit('ended'); t.mock.timers.tick(1000);
  const teacher = await play(); manager.cancelStoryCue(); teacher.emit('ended'); t.mock.timers.tick(1000);
  const preview = await manager.playVoice(voice.src); preview.emit('ended'); t.mock.timers.tick(1000);
  assert.equal(gongs().length, 0);
});

test('Eliza waits for full natural gong ending and 250ms, uses dry voice ducking and replays without a strike', async t => {
  const { manager, enter, play, gongs, elements } = harness(t); await enter();
  const eliza = CH02_SCENE_04.voice[1];
  const replies = () => elements.filter(e => e.src === eliza.src);
  const higgins = await play();
  assert.equal(await manager.playVoice(eliza.src, null, eliza.afterCueId), null);
  higgins.emit('ended'); t.mock.timers.tick(400); await Promise.resolve();
  assert.equal(await manager.playVoice(eliza.src, null, eliza.afterCueId), null);
  t.mock.timers.tick(4000); assert.equal(replies().length, 0); // Full source must end; no guessed duration.
  gongs()[0].emit('ended'); t.mock.timers.tick(S04_GONG_BREATH_MS - 1);
  assert.equal(replies().length, 0);
  t.mock.timers.tick(1); await Promise.resolve();
  assert.equal(replies().length, 1); assert.equal(replies()[0].paused, false);
  assert.equal(replies()[0].volume, 1); assert.equal(manager.ambience.volume, 0.028000000000000004);
  replies()[0].emit('ended'); assert.equal(manager.ambience.volume, 0.10);
  const replay = await manager.playVoice(eliza.src, null, eliza.afterCueId);
  assert.equal(replay.src, eliza.src); replay.emit('ended'); t.mock.timers.tick(1000);
  assert.equal(gongs().length, 1);
  await manager.setEnabled(false); assert.equal(await manager.playVoice(eliza.src), null);
  await manager.setEnabled(true); assert.equal(manager.foreground, null);
});

for (const stop of ['sound-off', 'scene-change', 'teacher']) {
  test(`Eliza follow-up is cancelled by ${stop} during gong decay or breathing space`, async t => {
    const { manager, enter, play, gongs, elements } = harness(t); await enter();
    const higgins = await play(); higgins.emit('ended'); t.mock.timers.tick(400); await Promise.resolve();
    gongs()[0].emit('ended');
    if (stop === 'sound-off') { await manager.setEnabled(false); await manager.setEnabled(true); }
    if (stop === 'scene-change') await manager.ensureAmbience('ch02_s03');
    if (stop === 'teacher') { manager.cancelStoryCue(); manager.stopOneShots(); }
    t.mock.timers.tick(1000);
    assert.equal(elements.filter(e => e.src === CH02_SCENE_04.voice[1].src).length, 0);
  });
}
