import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SCENES } from '../src/content.js';

const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const app = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');

test('CH01 S04 uses the approved three-character cutouts with a scene-specific composition', () => {
  const scene = SCENES.find(({ id }) => id === 'ch01_s04');
  assert.equal(scene.composition, 'ch01-higgins-ear');
  assert.deepEqual(scene.supporting.map(({ placement }) => placement), ['higgins', 'pickering']);
  assert.deepEqual(scene.supporting.map(({ src }) => src), [
    './assets/images/characters/higgins/runtime/higgins_master_cutout.png',
    './assets/images/characters/pickering/runtime/pickering_master_cutout.png'
  ]);
  assert.equal(scene.eliza.src, './assets/images/characters/eliza/runtime/eliza_flower-girl_listening_cutout.png');
  assert.match(css, /\.ch01-higgins-ear \.support-higgins \{ left: 26\.8%; bottom: 3%; height: 60%;/);
  assert.match(css, /\.ch01-higgins-ear \.support-pickering \{ left: 72\.8%; bottom: 3%; height: 59%;/);
  assert.match(css, /\.ch01-higgins-ear \.art-eliza img \{ left: 50%; bottom: 0; height: 78%;/);
  assert.match(css, /@media \(max-width: 560px\)[\s\S]*?\.ch01-higgins-ear \.support-higgins \{[^}]*height: 54%;[\s\S]*?\.ch01-higgins-ear \.support-pickering \{[^}]*height: 52%;/);
  assert.match(app, /scene\.supporting \|\| \[\]\)\.map\(\(asset\) => `<img class="supporting-character\$\{asset\.placement \? ` support-/);
});

test('scene scroll waits until after render, uses the document scroll root, and disables browser restoration', () => {
  assert.match(app, /window\.history\.scrollRestoration = 'manual'/);
  assert.match(app, /function scrollSceneToTop\(sceneId\)[\s\S]*?window\.requestAnimationFrame\(scroll\)/);
  assert.match(app, /document\.scrollingElement;[\s\S]*?scrollRoot\.scrollTo\(\{ top: 0, left: 0, behavior: 'instant' \}\)/);
  assert.match(app, /if \(scenePreview \|\| currentScene\(\)\.id !== sceneId\) return/);
  assert.match(app, /if \(\(!previousScene \|\| previousScene !== currentSceneId\) && !scenePreview\) scrollSceneToTop\(currentSceneId\)/);
});
