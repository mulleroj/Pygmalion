import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { SAVE_KEY, SAVE_VERSION } from '../src/progress.js';
import { STORAGE_KEY, createInitialState } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chapters = [
  ['ch01', 'The Flower Girl', 'ch01_s01'], ['ch02', 'The Bargain', 'ch02_s01'], ['ch03', 'The Lessons', 'ch03_s01'],
  ['ch04', 'The First Test', 'ch04_s01'], ['ch05', 'The Reception', 'ch05_s01'], ['ch06', 'Her Own Voice', 'ch06_s01']
];

function serve() {
  const server = http.createServer(async (req, res) => {
    const rel = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
    const file = path.resolve(root, rel);
    if (!file.startsWith(`${root}${path.sep}`)) return res.writeHead(403).end();
    const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.mp3': 'audio/mpeg' };
    try { res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); res.end(await fs.readFile(file)); } catch { res.writeHead(404).end(); }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject); server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}

test('Chromium: all six Story Map entries, separate resume checkpoints, and last-active restore at 390/768/1440 px', { timeout: 120_000 }, async (t) => {
  const { server, url } = await serve();
  const browser = await chromium.launch({ headless: true });
  t.after(async () => { await browser.close(); await new Promise((resolve) => server.close(resolve)); });
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 920 } });
    const errors = []; page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${url}/#story-map`);
    assert.equal(await page.locator('.chapter-card').count(), 6);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Story Map has no horizontal overflow at ${width}px`);
    for (const [id, title, entry] of chapters) {
      await page.locator(`[data-action="open-chapter"][data-chapter="${id}"]`).click();
      assert.equal(new URL(page.url()).hash, `#${entry}`);
      assert.match(await page.locator('.story-progress').innerText(), new RegExp(title, 'i'));
      const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), SAVE_KEY);
      assert.equal(saved.schemaVersion, SAVE_VERSION);
      assert.equal(saved.activeChapter, id);
      assert.equal(saved.chapters[id].scene, entry);
      assert.equal(saved.completionRecords[id], false, 'opening an entry does not fabricate completion');
      await page.goto(`${url}/#story-map`);
      assert.equal(await page.locator('.chapter-card').count(), 6);
      await page.locator(`[data-action="resume-chapter"][data-chapter="${id}"]`).click();
      assert.equal(new URL(page.url()).hash, `#${entry}`);
      await page.goto(`${url}/#story-map`);
    }
    const chapterSixResume = page.locator('[data-action="resume-chapter"][data-chapter="ch06"]');
    await chapterSixResume.focus();
    assert.equal(await chapterSixResume.evaluate((element) => document.activeElement === element), true);
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#ch06_s01', 'chapter cards activate from the keyboard');
    await page.goto(`${url}/#story-map`);
    const continueButton = page.getByRole('button', { name: 'CONTINUE READING' });
    await continueButton.click();
    assert.equal(new URL(page.url()).hash, '#ch06_s01');
    await page.reload();
    assert.equal(new URL(page.url()).hash, '#ch06_s01');
    assert.deepEqual(errors, []);
    await page.close();
  }
});

test('Chromium: legacy reader data migrates once without deleting the old key or inventing previous chapter completion', { timeout: 60_000 }, async (t) => {
  const { server, url } = await serve();
  const browser = await chromium.launch({ headless: true });
  t.after(async () => { await browser.close(); await new Promise((resolve) => server.close(resolve)); });
  const page = await browser.newPage({ viewport: { width: 768, height: 920 } });
  const legacy = { ...createInitialState(), started: true, scene: 'ch05_s02', reception_register_plan: 'd10_keep_core_voice', applied_events: ['ch05_s01_complete'], challenges: { ...createInitialState().challenges, lc13: { ...createInitialState().challenges.lc13, answers: { lc13_organiser_relationship: { answer: 'lc13_professional_organiser_to_participant', correct: true } }, attempts: 1 } } };
  await page.addInitScript(([key, value]) => localStorage.setItem(key, JSON.stringify(value)), [STORAGE_KEY, legacy]);
  await page.goto(`${url}/#ch05_s02`);
  assert.match(await page.locator('#scene-title').innerText(), /Listening Under Pressure/);
  const migrated = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), SAVE_KEY);
  assert.equal(await page.evaluate((key) => Boolean(localStorage.getItem(key)), STORAGE_KEY), true);
  assert.equal(migrated.activeChapter, 'ch05');
  assert.equal(migrated.chapters.ch05.challenges.lc13.answers.lc13_organiser_relationship.correct, true);
  assert.equal(migrated.completionRecords.ch01, false);
  assert.equal(migrated.completionRecords.ch04, false);
  await page.reload();
  assert.equal(new URL(page.url()).hash, '#ch05_s02');
});
