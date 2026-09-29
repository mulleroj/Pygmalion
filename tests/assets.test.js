import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AUDIO_FILES, VISUAL_FILES } from '../src/content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
