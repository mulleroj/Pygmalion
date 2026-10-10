import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { SAVE_KEY } from '../src/progress.js';
import { SCENES as CH01 } from '../src/content.js';
import { CH02_SCENE_01, CH02_SCENE_02, CH02_SCENE_03, CH02_SCENE_04, CH02_SCENE_05 } from '../src/ch02-content.js';
import { CH03_SCENE_01, CH03_SCENE_02, CH03_SCENE_03, CH03_SCENE_04, CH03_SCENE_05, CH03_SCENE_06 } from '../src/ch03-content.js';
import { CH04_SCENE_01, CH04_SCENE_02, CH04_SCENE_03, CH04_SCENE_04, CH04_SCENE_05 } from '../src/ch04-content.js';
import { CH05_SCENE_01, CH05_SCENE_02, CH05_SCENE_03, CH05_SCENE_04, CH05_SCENE_05 } from '../src/ch05-content.js';
import { CH06_SCENE_03, CH06_SCENE_04 } from '../src/ch06-content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function serve() {
  const server = http.createServer(async (req, res) => {
    const rel = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
    const file = path.resolve(root, rel);
    if (!file.startsWith(`${root}${path.sep}`)) return res.writeHead(403).end();
    const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.mp3': 'audio/mpeg' };
    try { res.writeHead(200, { 'content-type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(await fs.readFile(file)); } catch { res.writeHead(404).end(); }
  });
  return new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` })); });
}
const selector = (action, data = {}) => `[data-action="${action}"]${Object.entries(data).map(([k, v]) => `[data-${k}="${v}"]`).join('')}`;
async function click(page, action, data = {}) {
  const target = page.locator(selector(action, data)).first();
  assert.equal(await target.count(), 1, `rendered control: ${selector(action, data)}`);
  assert.equal(await target.isEnabled(), true, `enabled control: ${selector(action, data)}`);
  await target.click();
}
async function scene(page, id) { await page.waitForFunction((id) => location.hash === `#${id}`, id); }
async function saved(page) { return page.evaluate((key) => JSON.parse(localStorage.getItem(key)), SAVE_KEY); }
async function start(page, url, chapter) {
  await page.goto(`${url}/#story-map`);
  assert.equal(await page.locator('.chapter-card').count(), 6);
  await click(page, 'open-chapter', { chapter });
  await scene(page, `${chapter}_s01`);
}
async function next(page, id) { await click(page, 'next-scene'); await scene(page, id); }
async function fixture(t, width) {
  const { server, url } = await serve(); let browser; let context;
  t.after(async () => { await context?.close(); await browser?.close(); await new Promise((resolve) => server.close(resolve)); });
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 960 } }); const page = await context.newPage(); const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`console: ${m.text()}`); });
  return { page, url, consoleErrors };
}
async function chooseFirstDecision(page, sceneData) {
  if (sceneData.decision) await click(page, 'choose-decision', { decision: sceneData.decision.id, option: sceneData.decision.choices[0].id });
}
async function completeChapterOne(page) {
  await click(page, 'choose-tone', { tone: CH01[0].openingTones[0].id });
  await next(page, 'ch01_s02');
  await chooseFirstDecision(page, CH01[1]);
  for (const sample of (await import('../src/content.js')).LISTENING.lc01) await click(page, 'answer-lc01', { sample: sample.id, answer: sample.answer });
  await next(page, 'ch01_s03'); await chooseFirstDecision(page, CH01[2]);
  await next(page, 'ch01_s04');
  for (const sample of (await import('../src/content.js')).LISTENING.lc02) await click(page, 'answer-lc02', { sample: sample.id, answer: sample.answer });
  await next(page, 'ch01_s05'); await chooseFirstDecision(page, CH01[4]);
}
async function completeChapterTwo(page, { verifyStoryMapIsReadOnly = false } = {}) {
  await chooseFirstDecision(page, CH02_SCENE_01);
  await click(page, 'answer-lc03', { answer: CH02_SCENE_01.challenge.answer });
  await next(page, 'ch02_s02');
  for (const sample of CH02_SCENE_02.challenge.samples) await click(page, 'answer-lc04', { sample: sample.id, answer: sample.answer });
  await next(page, 'ch02_s03');
  await click(page, 'respond-s03', { option: CH02_SCENE_03.response.choices[0].id });
  await next(page, 'ch02_s04');
  await click(page, 'complete-s04'); await scene(page, 'ch02_s05');
  await chooseFirstDecision(page, CH02_SCENE_05);
  if (verifyStoryMapIsReadOnly) {
    const beforeMap = await saved(page);
    await click(page, 'open-story-map'); await page.locator('#story-map-root').waitFor({ state: 'visible' });
    const afterMap = await saved(page);
    assert.equal(afterMap.completionRecords.ch02, false, 'Story Map navigation does not complete Chapter II');
    assert.equal(afterMap.chapters.ch02.events.includes('ch02_complete'), false);
    assert.deepEqual(afterMap.chapters.ch02.decisions, beforeMap.chapters.ch02.decisions);
    const chapterTwoCard = page.locator('.chapter-card').filter({ has: page.locator('h2', { hasText: 'The Bargain' }) });
    assert.equal(await chapterTwoCard.locator('.chapter-status').innerText(), 'In progress');
    await click(page, 'resume-chapter', { chapter: 'ch02' }); await scene(page, 'ch02_s05');
    assert.equal((await saved(page)).completionRecords.ch02, false, 'resume alone does not complete the chapter');
  }
  await click(page, 'enter-ch03'); await scene(page, 'ch03_s01');
}
async function completeChapterThree(page) {
  await chooseFirstDecision(page, CH03_SCENE_01);
  const retrySample = CH03_SCENE_01.challenge.samples[0];
  const incorrect = retrySample.options.find(({ id }) => id !== retrySample.answer).id;
  await click(page, 'answer-lc05', { sample: retrySample.id, answer: incorrect });
  assert.equal((await saved(page)).chapters.ch03.challenges.lc05.answers[retrySample.id].correct, false, 'incorrect answer is recorded for retry');
  await click(page, 'answer-lc05', { sample: retrySample.id, answer: retrySample.answer });
  for (const sample of CH03_SCENE_01.challenge.samples.slice(1)) await click(page, 'answer-lc05', { sample: sample.id, answer: sample.answer });
  await next(page, 'ch03_s02');
  await click(page, 'lc06-cannot-hear');
  for (const sample of CH03_SCENE_02.challenge.samples) {
    await click(page, 'select-lc06', { sample: sample.id, kind: 'word', answer: sample.word });
    await click(page, 'select-lc06', { sample: sample.id, kind: 'meaning', answer: sample.meaning });
    await click(page, 'submit-lc06', { sample: sample.id });
  }
  await next(page, 'ch03_s03');
  for (const sample of CH03_SCENE_03.challenge.samples) await click(page, 'answer-lc07', { sample: sample.id, answer: sample.answer });
  await next(page, 'ch03_s04'); await chooseFirstDecision(page, CH03_SCENE_04);
  for (const sample of CH03_SCENE_04.challenge.samples) await click(page, 'answer-lc08', { sample: sample.id, answer: sample.answer });
  await next(page, 'ch03_s05');
  for (const sample of CH03_SCENE_05.challenge.samples) await click(page, 'answer-lc09', { sample: sample.id, answer: sample.answer });
  await next(page, 'ch03_s06');
  await click(page, 'lc10-cannot-hear', { sample: CH03_SCENE_06.challenge.samples[0].id });
  for (const sample of CH03_SCENE_06.challenge.samples) await click(page, 'answer-lc10', { sample: sample.id, answer: sample.answer });
  await click(page, 'next-scene');
}
async function completeChapterFour(page) {
  await chooseFirstDecision(page, CH04_SCENE_01); await next(page, 'ch04_s02');
  for (const sample of CH04_SCENE_02.challenge.samples) await click(page, 'answer-lc11', { sample: sample.id, answer: sample.answer });
  await click(page, 'choose-lc11-reply', { option: CH04_SCENE_02.application.choices[0].id });
  const beforeTeacher = await saved(page);
  await click(page, 'open-teacher'); await click(page, 'close-teacher');
  assert.equal(new URL(page.url()).hash, '#ch04_s02', 'Teacher Mode does not advance the scene');
  assert.deepEqual(await saved(page), beforeTeacher, 'Teacher Mode is read-only');
  await click(page, 'play-challenge', { src: CH04_SCENE_02.challenge.samples[0].src });
  assert.equal(new URL(page.url()).hash, '#ch04_s02', 'optional challenge audio does not advance the scene');
  await next(page, 'ch04_s03');
  for (const item of CH04_SCENE_03.challenge.items) await click(page, 'answer-lc12', { item: item.id, answer: item.answer });
  await chooseFirstDecision(page, CH04_SCENE_03);
  await next(page, 'ch04_s04');
  await click(page, 'choose-s04-reflection', { focus: CH04_SCENE_04.reflection.choices[0].id });
  await next(page, 'ch04_s05'); await click(page, 'next-scene');
}
async function completeChapterFive(page) {
  await click(page, 'choose-decision', { decision: 'D10', option: CH05_SCENE_01.decision.choices[0].id });
  await next(page, 'ch05_s02');
  for (const sample of CH05_SCENE_02.challenge.samples) for (const dimension of CH05_SCENE_02.challenge.dimensions) {
    const item = `${sample.id}_${dimension.id}`; await click(page, 'answer-lc13', { item, answer: sample.answer[dimension.id] });
  }
  await next(page, 'ch05_s03'); await click(page, 'choose-decision', { decision: 'D11', option: 'd11_private_conversation' });
  await next(page, 'ch05_s04'); await click(page, 'choose-future-style', { option: CH05_SCENE_04.questionStyle.choices[0].id });
  const branch = CH05_SCENE_04.branches.d11_private_conversation;
  await click(page, 'answer-lc14', { item: branch.itemId, answer: branch.answer }); await next(page, 'ch05_s05');
  await click(page, 'choose-decision', { decision: 'NEXT_CONTACT', option: CH05_SCENE_05.decision.choices[0].id });
  await click(page, 'next-scene');
  assert.equal((await saved(page)).chapters.ch05.events.filter((event) => event === 'ch05_s05_complete').length, 1);
  await click(page, 'continue-next-chapter'); await scene(page, 'ch06_s01');
}
async function completeChapterSix(page) {
  await next(page, 'ch06_s02'); await next(page, 'ch06_s03');
  const direction = CH06_SCENE_03.decision.choices[0]; await click(page, 'choose-ch06-direction', { option: direction.id });
  for (const sample of CH06_SCENE_03.challenge.samples) await click(page, 'answer-lc15', { item: sample.id, answer: sample.answer });
  await next(page, 'ch06_s04'); await click(page, 'choose-ch06-statement-shape', { option: CH06_SCENE_04.statement.shapes[0].id });
  await click(page, 'deliver-ch06-statement'); await next(page, 'ch06_s05'); await click(page, 'finish-ch06');
  await page.locator('.book-complete').waitFor({ state: 'visible' });
}
async function checkCompletion(page, chapter, finalEvent) {
  const progress = await saved(page);
  assert.equal(progress.completionRecords[chapter], true, `${chapter} completion record`);
  assert.equal(progress.chapters[chapter].events.filter((event) => event === finalEvent).length, 1, `${finalEvent} recorded once`);
  return progress;
}

for (const [chapter, run, lastScene, event] of [
  ['ch01', completeChapterOne, 'ch01_s05', 'ch01_d03_origin_motivation'],
  ['ch02', (page) => completeChapterTwo(page, { verifyStoryMapIsReadOnly: true }), 'ch02_s05', 'ch02_complete'],
  ['ch03', completeChapterThree, 'ch03_s06', 'ch03_s06_complete'],
  ['ch04', completeChapterFour, 'ch04_s05', 'ch04_s05_complete']
]) test(`Phase 2 independent Chapter ${chapter.slice(-1)} complete playthrough at 390 and 1440 px`, { timeout: 240_000 }, async (t) => {
  for (const width of [390, 1440]) {
    const { page, url, consoleErrors } = await fixture(t, width);
    await start(page, url, chapter); await run(page);
    await scene(page, chapter === 'ch01' ? 'ch01_s05' : chapter === 'ch02' ? 'ch03_s01' : chapter === 'ch03' ? 'ch03_s06' : 'ch04_s05');
    const progress = event ? await checkCompletion(page, chapter, event) : await saved(page);
    if (chapter === 'ch01') assert.equal(progress.completionRecords.ch01, true, 'Chapter I ending marks the chapter complete');
    for (const otherChapter of ['ch01','ch02','ch03','ch04','ch05','ch06'].filter((id) => id !== chapter)) {
      assert.equal(progress.completionRecords[otherChapter], false, `${otherChapter} remains Not started in the independent profile`);
    }
    assert.equal(progress.chapters[chapter].scene, lastScene);
    await click(page, 'open-story-map'); await page.locator('#story-map-root').waitFor({ state: 'visible' });
    const title = { ch01: 'The Flower Girl', ch02: 'The Bargain', ch03: 'The Lessons', ch04: 'The First Test' }[chapter];
    const card = page.locator('.chapter-card').filter({ has: page.locator('h2', { hasText: title }) });
    assert.equal(await card.locator('.chapter-status').innerText(), 'Completed', `${title} is shown Completed in Story Map`);
    await page.reload();
    const restored = await saved(page);
    assert.equal(restored.completionRecords[chapter], true);
    if (event) assert.equal(restored.chapters[chapter].events.filter((e) => e === event).length, 1);
    for (const otherChapter of ['ch01','ch02','ch03','ch04','ch05','ch06'].filter((id) => id !== chapter)) assert.equal(restored.completionRecords[otherChapter], false);
    await click(page, 'revisit-chapter', { chapter }); await scene(page, lastScene);
    const revisited = await saved(page);
    assert.equal(revisited.chapters[chapter].events.filter((e) => e === event).length, 1, 'revisiting does not duplicate the final decision/completion event');
    assert.equal(revisited.completionRecords[chapter], true);
    assert.deepEqual(revisited.chapters[chapter].decisions, restored.chapters[chapter].decisions, 'decisions survive refresh and revisit');
    assert.deepEqual(revisited.chapters[chapter].challenges, restored.chapters[chapter].challenges, 'challenge answers survive refresh and revisit');
    assert.deepEqual(revisited.chapters[chapter].signals, restored.chapters[chapter].signals, 'signals do not change on revisit');
    assert.deepEqual(consoleErrors, []);
  }
});

test('Phase 2 sequential reading completes Chapters I–VI through rendered controls without seeding', { timeout: 360_000 }, async (t) => {
  const { page, url, consoleErrors } = await fixture(t, 1440);
  await start(page, url, 'ch01'); await completeChapterOne(page);
  await click(page, 'continue-next-chapter'); await scene(page, 'ch02_s01'); await completeChapterTwo(page);
  await scene(page, 'ch03_s01'); await completeChapterThree(page);
  await click(page, 'continue-next-chapter'); await scene(page, 'ch04_s01'); await completeChapterFour(page);
  await click(page, 'continue-next-chapter'); await scene(page, 'ch05_s01'); await completeChapterFive(page);
  await completeChapterSix(page);
  const progress = await saved(page);
  for (const chapter of ['ch01','ch02','ch03','ch04','ch05','ch06']) assert.equal(progress.completionRecords[chapter], true, `${chapter} complete in sequential run`);
  assert.equal(new Set(Object.values(progress.chapters).flatMap((c) => c.events)).size, Object.values(progress.chapters).flatMap((c) => c.events).length, 'no duplicate applied events');
  assert.deepEqual(consoleErrors, []);
});
