import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AUDIO_FILES, VISUAL_FILES } from '../src/content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DERIVED_RUNTIME_VISUALS = [
  'images/characters/eliza/runtime/eliza_flower-girl_alert_cutout.png',
  'images/characters/eliza/runtime/eliza_flower-girl_defiant_cutout.png',
  'images/characters/eliza/runtime/eliza_flower-girl_guarded_cutout.png',
  'images/characters/eliza/runtime/eliza_flower-girl_listening_cutout.png',
  'images/characters/eliza/runtime/eliza_flower-girl_thoughtful_cutout.png',
  'images/characters/freddy/runtime/freddy_master_cutout.png',
  'images/characters/higgins/runtime/higgins_master_cutout.png',
  'images/characters/pickering/runtime/pickering_master_cutout.png',
  'images/characters/pickering/runtime/pickering_full-body_master_cutout.png',
  'images/props/ch01/runtime/fallen-flowers-wet_cutout.png'
];

test('all canonical Chapter I audio files exist and are non-empty', () => {
  for (const relative of AUDIO_FILES) {
    const filename = path.join(root, 'assets', relative.replace(/^audio[\\/]/, 'audio' + path.sep));
    assert.equal(fs.existsSync(filename), true, `missing audio: ${relative}`);
    assert.ok(fs.statSync(filename).size > 0, `empty audio: ${relative}`);
  }
});

test('all canonical visual files exist and are non-empty', () => {
  for (const relative of VISUAL_FILES) {
    const filename = path.join(root, 'assets', relative.replace(/^\.\/assets[\\/]/, ''));
    assert.equal(fs.existsSync(filename), true, `missing visual: ${relative}`);
    assert.ok(fs.statSync(filename).size > 0, `empty visual: ${relative}`);
  }
});

test('all derived runtime cutouts exist and are non-empty', () => {
  for (const relative of DERIVED_RUNTIME_VISUALS) {
    const filename = path.join(root, 'assets', relative);
    assert.equal(fs.existsSync(filename), true, `missing derived visual: ${relative}`);
    assert.ok(fs.statSync(filename).size > 0, `empty derived visual: ${relative}`);
  }
});
