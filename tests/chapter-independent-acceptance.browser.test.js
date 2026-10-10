import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { SAVE_KEY } from '../src/progress.js';
import { LISTENING } from '../src/content.js';
import { CH02_SCENE_01, CH02_SCENE_02 } from '../src/ch02-content.js';
import { CH03_SCENE_01 } from '../src/ch03-content.js';
import { CH05_SCENE_02, CH05_SCENE_04 } from '../src/ch05-content.js';
import { CH06_SCENE_03, CH06_SCENE_04 } from '../src/ch06-content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function serve() {
  const server = http.createServer(async (req, res) => {
    const rel = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
    const file = path.resolve(root, rel);
    if (!file.startsWith(`${root}${path.sep}`)) return res.writeHead(403).end();
    const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.mp3': 'audio/mpeg' };
    try { res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); res.end(await fs.readFile(file)); }
    catch { res.writeHead(404).end(); }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}

const selector = (action, data = {}) => `[data-action="${action}"]${Object.entries(data).map(([key, value]) => `[data-${key}="${value}"]`).join('')}`;
async function click(page, action, data = {}) {
  const button = page.locator(selector(action, data)).first();
  assert.equal(await button.count(), 1, `expected rendered control ${selector(action, data)}`);
  assert.equal(await button.isEnabled(), true, `expected enabled control ${selector(action, data)}`);
  await button.click();
}
async function scene(page, id, visited) {
  await page.waitForFunction((expected) => location.hash === `#${expected}`, id);
  visited.push(id);
  assert.equal(new URL(page.url()).hash, `#${id}`);
}
async function saved(page) { return page.evaluate((key) => JSON.parse(localStorage.getItem(key)), SAVE_KEY); }
async function start(page, url, chapter) {
  await page.goto(`${url}/#story-map`);
  assert.equal(await page.locator('.chapter-card').count(), 6);
  await click(page, 'open-chapter', { chapter });
  await scene(page, `${chapter}_s01`, []);
}
async function returnToMap(page) { await click(page, 'open-story-map'); await page.locator('#story-map-root').waitFor({ state: 'visible' }); }
async function openFromMap(page, action, chapter) { await click(page, action, { chapter }); }
async function advance(page) { await click(page, 'next-scene'); }

async function finishChapterFive(page, visited, { fresh = false } = {}) {
  if (new URL(page.url()).hash === '#ch05_s01') {
    if (fresh) await scene(page, 'ch05_s01', visited);
    await click(page, 'choose-decision', { decision: 'D10' });
    await advance(page); await scene(page, 'ch05_s02', visited);
  } else {
    assert.equal(new URL(page.url()).hash, '#ch05_s02', 'Chapter V continuation starts from the saved S02 checkpoint');
    await scene(page, 'ch05_s02', visited);
  }
  if (await page.locator(selector('choose-s02-first-response', { responder: 'organiser' })).count()) {
    await click(page, 'choose-s02-first-response', { responder: 'organiser' });
  }
  for (const sample of CH05_SCENE_02.challenge.samples) {
    for (const dimension of CH05_SCENE_02.challenge.dimensions) {
      const item = `${sample.id}_${dimension.id}`;
      const stored = (await saved(page)).chapters.ch05.challenges.lc13.answers[item];
      if (!stored?.correct) await click(page, 'answer-lc13', { item, answer: sample.answer[dimension.id] });
    }
  }
  let progress = await saved(page);
  assert.equal(progress.chapters.ch05.challenges.lc13.completed, true, 'all nine LC13 responses completed through visible buttons');
  assert.equal(Object.keys(progress.chapters.ch05.challenges.lc13.answers).length, 9, 'the three exchanges each have three saved answers');
  assert.equal(progress.chapters.ch05.events.filter((event) => event === 'ch05_lc13_completed').length, 1);
  await click(page, 'next-scene'); await scene(page, 'ch05_s03', visited);
  await click(page, 'choose-decision', { decision: 'D11', option: 'd11_private_conversation' });
  await advance(page); await scene(page, 'ch05_s04', visited);
  await click(page, 'choose-future-style', { option: 'plan_focused' });
  const branch = CH05_SCENE_04.branches.d11_private_conversation;
  await click(page, 'answer-lc14', { item: branch.itemId, answer: branch.answer });
  progress = await saved(page);
  assert.equal(progress.chapters.ch05.challenges.lc14.completed, true, 'LC14 completed through its rendered answer control');
  await advance(page); await scene(page, 'ch05_s05', visited);
  await click(page, 'choose-decision', { decision: 'NEXT_CONTACT', option: 'higgins_directly' });
  await advance(page);
  progress = await saved(page);
  assert.equal(progress.completionRecords.ch05, true, 'Chapter V completion is derived from the real ending action');
  assert.equal(progress.chapters.ch05.events.filter((event) => event === 'ch05_s05_complete').length, 1);
}

async function finishChapterSix(page, url, directionId, visited) {
  await start(page, url, 'ch06');
  await scene(page, 'ch06_s01', visited);
  await advance(page); await scene(page, 'ch06_s02', visited);
  await advance(page); await scene(page, 'ch06_s03', visited);
  const direction = CH06_SCENE_03.decision.choices.find(({ id }) => id === directionId);
  await click(page, 'choose-ch06-direction', { option: directionId });
  for (const sample of CH06_SCENE_03.challenge.samples) await click(page, 'answer-lc15', { item: sample.id, answer: sample.answer });
  let progress = await saved(page);
  assert.equal(progress.chapters.ch06.challenges.lc15.completed, true);
  assert.equal(progress.chapters.ch06.state.chapter6_direction, direction.value);
  await advance(page); await scene(page, 'ch06_s04', visited);
  await click(page, 'choose-ch06-statement-shape', { option: CH06_SCENE_04.statement.shapes[0].id });
  await click(page, 'deliver-ch06-statement');
  progress = await saved(page);
  assert.equal(progress.chapters.ch06.events.filter((event) => event === 'ch06_final_statement_delivered').length, 1);
  assert.equal(progress.chapters.ch06.signals.confidence, 1);
  await advance(page); await scene(page, 'ch06_s05', visited);
  await click(page, 'finish-ch06');
  await page.locator('.book-complete').waitFor({ state: 'visible' });
  progress = await saved(page);
  assert.equal(progress.completionRecords.ch06, true);
  assert.equal(progress.chapters.ch06.events.filter((event) => event === 'ch06_completion_recorded').length, 1);
}

async function fixture(t, viewport, label) {
  const { server, url } = await serve();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: viewport, height: viewport === 390 ? 844 : 960 } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`console: ${message.text()}`); });
  t.after(async () => { await context.close(); await browser.close(); await new Promise((resolve) => server.close(resolve)); });
  return { page, url, consoleErrors, label };
}

async function screenshotOnFailure(page, label, width, operation) {
  try { await operation(); }
  catch (error) {
    await fs.mkdir(path.join(root, 'test-results'), { recursive: true });
    await page.screenshot({ path: path.join(root, 'test-results', `${label}-${width}-failure.png`), fullPage: true });
    throw error;
  }
}

test('Chromium acceptance A: complete Chapter V independently at 390 and 1440 px, restore without duplicate reward', { timeout: 240_000 }, async (t) => {
  for (const width of [390, 1440]) {
    const { page, url, consoleErrors } = await fixture(t, width, 'chapter-v');
    await screenshotOnFailure(page, 'chapter-v', width, async () => {
      const visited = [];
      await start(page, url, 'ch05'); await scene(page, 'ch05_s01', visited);
      await finishChapterFive(page, visited);
      const final = await saved(page);
      assert.deepEqual(final.chapters.ch05.events.filter((event) => /complete/.test(event)).sort(), [...new Set(final.chapters.ch05.events.filter((event) => /complete/.test(event)))].sort());
      assert.equal(final.chapters.ch05.signals.independence, 1);
      assert.deepEqual(final.completionRecords, { ch01: false, ch02: false, ch03: false, ch04: false, ch05: true, ch06: false });
      await returnToMap(page);
      assert.equal(await page.locator('.chapter-card').filter({ hasText: 'The Reception' }).locator('.chapter-status').innerText(), 'Completed');
      await page.reload();
      assert.equal(await page.locator('.chapter-card').filter({ hasText: 'The Reception' }).locator('.chapter-status').innerText(), 'Completed');
      await click(page, 'revisit-chapter', { chapter: 'ch05' });
      await scene(page, 'ch05_s05', visited);
      const restored = await saved(page);
      assert.equal(restored.chapters.ch05.events.filter((event) => event === 'ch05_s05_complete').length, 1);
      assert.equal(restored.chapters.ch05.events.filter((event) => event === 'ch05_lc13_completed').length, 1);
      assert.equal(restored.chapters.ch05.signals.independence, 1);
      assert.deepEqual(visited, ['ch05_s01', 'ch05_s02', 'ch05_s03', 'ch05_s04', 'ch05_s05', 'ch05_s05']);
      assert.deepEqual(consoleErrors, []);
    });
  }
});

test('Chromium acceptance B: complete Chapter VI from a fresh profile for each D12 direction at 390 and 1440 px', { timeout: 360_000 }, async (t) => {
  for (const width of [390, 1440]) for (const choice of CH06_SCENE_03.decision.choices) {
    const { page, url, consoleErrors } = await fixture(t, width, `chapter-vi-${choice.id}`);
    await screenshotOnFailure(page, `chapter-vi-${choice.id}`, width, async () => {
      const visited = [];
      await finishChapterSix(page, url, choice.id, visited);
      let progress = await saved(page);
      assert.deepEqual(progress.completionRecords, { ch01: false, ch02: false, ch03: false, ch04: false, ch05: false, ch06: true });
      assert.deepEqual(visited, ['ch06_s01', 'ch06_s02', 'ch06_s03', 'ch06_s04', 'ch06_s05']);
      await click(page, 'open-story-map');
      assert.equal(await page.locator('.chapter-card').filter({ hasText: 'Her Own Voice' }).locator('.chapter-status').innerText(), 'Completed');
      for (const chapter of ['ch01', 'ch02', 'ch03', 'ch04', 'ch05']) assert.equal(progress.chapters[chapter].visited, false, `${chapter} remains Not started`);
      await page.reload();
      await click(page, 'revisit-chapter', { chapter: 'ch06' });
      await scene(page, 'ch06_s05', visited);
      progress = await saved(page);
      assert.equal(progress.chapters.ch06.events.filter((event) => event === 'ch06_completion_recorded').length, 1);
      assert.equal(progress.chapters.ch06.events.filter((event) => event === 'ch06_final_statement_delivered').length, 1);
      assert.equal(progress.chapters.ch06.signals.confidence, 1);
      assert.deepEqual(consoleErrors, []);
    });
  }
});

test('Chromium acceptance C: Chapter V, III and VI checkpoints remain isolated through switching and reload at 390 and 1440 px', { timeout: 240_000 }, async (t) => {
  for (const width of [390, 1440]) {
    const { page, url, consoleErrors } = await fixture(t, width, 'cross-chapter');
    await screenshotOnFailure(page, 'cross-chapter', width, async () => {
      const visited = [];
      await start(page, url, 'ch05'); await scene(page, 'ch05_s01', visited);
      await click(page, 'choose-decision', { decision: 'D10' }); await advance(page); await scene(page, 'ch05_s02', visited);
      const first = CH05_SCENE_02.challenge.samples[0];
      const rel = `${first.id}_relationship`;
      await click(page, 'answer-lc13', { item: rel, answer: first.answer.relationship });
      const partialV = await saved(page);
      assert.equal(partialV.chapters.ch05.challenges.lc13.answers[rel].correct, true);
      assert.equal(partialV.chapters.ch05.challenges.lc13.completed, false);

      await returnToMap(page); await openFromMap(page, 'open-chapter', 'ch03'); await scene(page, 'ch03_s01', visited);
      await click(page, 'choose-decision', { decision: 'D06' });
      const sample = CH03_SCENE_01.challenge.samples[0];
      await click(page, 'answer-lc05', { sample: sample.id, answer: sample.answer });
      const partialIII = await saved(page);
      assert.equal(partialIII.chapters.ch03.decisions.D06 !== undefined, true);
      assert.equal(partialIII.chapters.ch03.challenges.lc05.answers[sample.id].correct, true);
      assert.equal(partialIII.chapters.ch03.events.some((event) => /complete/.test(event)), false);

      await returnToMap(page); await openFromMap(page, 'resume-chapter', 'ch05'); await scene(page, 'ch05_s02', visited);
      let restored = await saved(page);
      assert.deepEqual(restored.chapters.ch05.challenges.lc13.answers[rel], partialV.chapters.ch05.challenges.lc13.answers[rel]);
      await finishChapterFive(page, visited);
      const completeV = await saved(page);
      assert.equal(completeV.chapters.ch05.events.filter((event) => event === 'ch05_s05_complete').length, 1);
      assert.equal(completeV.chapters.ch05.signals.independence, 1);

      await returnToMap(page); await openFromMap(page, 'open-chapter', 'ch06'); await scene(page, 'ch06_s01', visited);
      await advance(page); await scene(page, 'ch06_s02', visited);
      await returnToMap(page); await openFromMap(page, 'resume-chapter', 'ch03'); await scene(page, 'ch03_s01', visited);
      restored = await saved(page);
      assert.equal(restored.chapters.ch03.decisions.D06, partialIII.chapters.ch03.decisions.D06);
      assert.deepEqual(restored.chapters.ch03.challenges.lc05.answers[sample.id], partialIII.chapters.ch03.challenges.lc05.answers[sample.id]);
      assert.equal(restored.chapters.ch03.signals.pronunciation, partialIII.chapters.ch03.signals.pronunciation);
      assert.equal(restored.chapters.ch03.events.some((event) => /complete/.test(event)), false);
      assert.equal(restored.completionRecords.ch01, false);
      assert.equal(restored.completionRecords.ch03, false);
      assert.equal(restored.completionRecords.ch05, true);
      assert.equal(restored.completionRecords.ch06, false);
      const beforeReload = structuredClone(restored);
      await page.reload();
      restored = await saved(page);
      assert.equal(restored.activeChapter, 'ch03');
      assert.equal(restored.activeScene, 'ch03_s01');
      assert.deepEqual(restored.chapters.ch05, beforeReload.chapters.ch05);
      assert.deepEqual(restored.chapters.ch03, beforeReload.chapters.ch03);
      assert.equal(restored.chapters.ch06.scene, 'ch06_s02');
      await returnToMap(page);
      assert.equal(await page.locator('.last-active-reading').innerText(), 'Chapter III — The Lessons\nScene 1 — The Mouth Is a Muscle');
      await click(page, 'continue-reading');
      await scene(page, 'ch03_s01', visited);
      assert.equal((await saved(page)).activeChapter, 'ch03');
      assert.deepEqual(consoleErrors, []);
    });
  }
});
