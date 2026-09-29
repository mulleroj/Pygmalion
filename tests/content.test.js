import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENES, DECISION_COUNT, CHALLENGE_COUNT, STORY_VOICE_COUNT, AUDIO_FILES, VISUAL_FILES, LISTENING } from '../src/content.js';

test('Chapter I contains exactly the five canonical scenes in order', () => {
  assert.deepEqual(SCENES.map((scene) => scene.id), ['ch01_s01', 'ch01_s02', 'ch01_s03', 'ch01_s04', 'ch01_s05']);
  assert.equal(SCENES.length, 5);
  assert.equal(SCENES.filter((scene) => scene.decision).length, DECISION_COUNT);
  assert.equal(SCENES.filter((scene) => scene.challenge).length, CHALLENGE_COUNT);
});

test('canonical story copy and challenge answer keys remain intact', () => {
  const script = SCENES.flatMap((scene) => [...scene.narration, ...scene.dialogue.flatMap((line) => line)]).join(' ');
  assert.match(script, /I ain't done nothing wrong\. I'm a good girl, I am\./);
  assert.deepEqual(LISTENING.lc01.map((sample) => sample.answer), ['apology', 'excuse', 'intention to repair']);
  assert.deepEqual(LISTENING.lc02.map((sample) => sample.answer), ['lc02_s01_worker_request', 'lc02_s02_familiar_instruction', 'lc02_s03_formal_question']);
});

test('the vertical slice references seven optional story voices and sixteen local audio files', () => {
  assert.equal(STORY_VOICE_COUNT, 7);
  assert.equal(AUDIO_FILES.length, 16);
  assert.equal(VISUAL_FILES.length, 15);
});

test('student-facing choice labels do not expose internal IDs', () => {
  for (const scene of SCENES) {
    for (const item of scene.decision?.choices || []) {
      assert.doesNotMatch(`${item.title} ${item.text}`, /ch01_|d0[1-3]_|LC0[12]/);
    }
  }
});
