import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import {
  applyDecision, completeScene, createInitialState, saveState, setScene, STORAGE_KEY
} from '../src/state.js';
import { composeState, SAVE_KEY } from '../src/progress.js';
import { CH05_SCENE_01, CH05_SCENE_02 } from '../src/ch05-content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const correctAnswers = [
  ['lc13_organiser_relationship', 'lc13_professional_organiser_to_participant'],
  ['lc13_organiser_purpose', 'lc13_coordination_request'],
  ['lc13_organiser_formality', 'lc13_polite_professional'],
  ['lc13_patron_relationship', 'lc13_distant_guest_to_eliza'],
  ['lc13_patron_purpose', 'lc13_compliment_and_information_request'],
  ['lc13_patron_formality', 'lc13_polite_relatively_formal'],
  ['lc13_colleague_relationship', 'lc13_peer_colleague'],
  ['lc13_colleague_purpose', 'lc13_practical_request'],
  ['lc13_colleague_formality', 'lc13_informal_familiar']
];

function validS02Checkpoint() {
  let state = { ...createInitialState(), applied_events: ['ch04_s05_complete'] };
  state = setScene(state, CH05_SCENE_01.id);
  state = applyDecision(state, 'D10', 'd10_keep_core_voice');
  state = completeScene(state, CH05_SCENE_01);
  return setScene(state, CH05_SCENE_02.id);
}

function startStaticServer() {
  const mimeTypes = {
    '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
    '.mp3': 'audio/mpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp'
  };
  const server = http.createServer(async (request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    const filePath = path.resolve(root, relative);
    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    try {
      const body = await fs.readFile(filePath);
      response.writeHead(200, { 'content-type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
      response.end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      server.removeListener('error', reject);
      resolve({ server, url: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

async function savedState(page) {
  const envelope = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), SAVE_KEY);
  return composeState(envelope, 'ch05');
}

async function buttonViewportState(button) {
  return button.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      height: innerHeight,
      focused: document.activeElement === element,
      inViewport: rect.bottom > 0 && rect.top < innerHeight
    };
  });
}

test('Chromium: LC13 completion remains discoverable through reload and advances once at 390/768/1440 px', { timeout: 120_000 }, async (t) => {
  const { server, url } = await startStaticServer();
  let browser;
  t.after(async () => {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  });
  browser = await chromium.launch({ headless: true });

  for (const [width, height] of [[390, 844], [430, 932], [768, 1024], [1440, 960]]) {
    const context = await browser.newContext({ viewport: { width, height } });
    const checkpoint = JSON.stringify(validS02Checkpoint());
    await context.addInitScript(`if (!localStorage.getItem(${JSON.stringify(STORAGE_KEY)})) localStorage.setItem(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(checkpoint)});`);
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.goto(`${url}/#ch05_s02`);
    assert.match(await page.locator('#scene-title').innerText(), /Listening Under Pressure/);
    assert.equal(await page.locator('[data-action="next-scene"]').count(), 0, 'Continue is absent before all nine correct answers');

    if (width === 390) {
      await page.getByRole('button', { name: 'Turn sound off' }).click();
      assert.equal((await savedState(page)).soundEnabled, false);
      await page.goto(`${url}/#ch05_s03`);
      await page.waitForFunction(() => location.hash === '#ch05_s02');
      assert.equal(new URL(page.url()).hash, '#ch05_s02', 'the S03 hash guard returns to incomplete S02');
      assert.equal((await savedState(page)).applied_events.includes('ch05_s02_complete'), false, JSON.stringify((await savedState(page)).applied_events));
    }

    if (width === 768) {
      for (const label of ['The organiser', 'The guest', 'Her colleague']) {
        const response = page.getByRole('button', { name: label, exact: true });
        await response.click();
        assert.equal(await response.getAttribute('aria-pressed'), 'true');
        const afterChoice = await savedState(page);
        assert.equal(afterChoice.scene, 'ch05_s02');
        assert.equal(afterChoice.challenges.lc13.completed, false, 'the local response does not complete or gate LC13');
        assert.equal(afterChoice.applied_events.includes('ch05_s02_complete'), false);
      }
    }
    if (width === 1440) {
      const response = page.getByRole('button', { name: 'Her colleague', exact: true });
      await response.click();
      assert.equal(await response.getAttribute('aria-pressed'), 'true');
    }

    if (width === 390) {
      await page.getByRole('button', { name: 'Open text support for Organiser' }).click();
      assert.equal(await page.getByText(/Miss Doolittle, could you introduce the growers/).isVisible(), true, 'transcript support is available before an answer');
      await page.locator('[data-action="answer-lc13"][data-item="lc13_organiser_relationship"][data-answer="lc13_peer_colleague"]').click();
      assert.match(await page.getByRole('status').first().innerText(), /may fit a different exchange/i);
      await page.locator('[data-action="answer-lc13"][data-item="lc13_organiser_relationship"][data-answer="lc13_professional_organiser_to_participant"]').click();
      const partial = await savedState(page);
      assert.equal(partial.challenges.lc13.answers.lc13_organiser_relationship.attempts, 2);
      assert.deepEqual(partial.challenges.lc13.supportSamples, ['lc13_organiser']);
      await page.reload();
      const restoredPartial = await savedState(page);
      assert.equal(restoredPartial.challenges.lc13.answers.lc13_organiser_relationship.correct, true, 'partial progress survives reload');
      assert.deepEqual(restoredPartial.challenges.lc13.supportSamples, ['lc13_organiser']);
    }

    const firstUnanswered = width === 390 ? correctAnswers.slice(1) : correctAnswers;
    for (const [itemId, answerId] of firstUnanswered) {
      await page.locator(`[data-action="answer-lc13"][data-item="${itemId}"][data-answer="${answerId}"]`).click();
    }
    const completed = await savedState(page);
    assert.equal(completed.challenges.lc13.completed, true);
    assert.equal(Object.values(completed.challenges.lc13.answers).filter((answer) => answer.correct).length, 9);
    assert.equal(completed.applied_events.filter((event) => event === 'ch05_lc13_completed').length, 1);
    assert.equal(completed.applied_events.filter((event) => event === 'ch05_s02_complete').length, 0, 'LC13 completion does not itself complete S02');
    assert.equal(completed.confidence, 0);
    assert.equal(completed.pronunciation, 0);
    assert.equal(completed.independence, 0);

    const continueButton = page.getByRole('button', { name: 'Continue to the next scene' });
    assert.equal(await continueButton.count(), 1);
    assert.equal(await continueButton.isVisible(), true);
    assert.equal(await continueButton.isEnabled(), true);
    assert.equal(await page.locator('.challenge-complete + button[data-action="next-scene"]').count(), 1, 'Continue sits beside the completion message, before the long review list');
    let visibleState = await buttonViewportState(continueButton);
    assert.equal(visibleState.focused, true, `${width}px: final answer focuses Continue`);
    assert.equal(visibleState.inViewport, true, `${width}px: final answer scrolls Continue into view`);

    if (width === 390) {
      await page.reload();
      const completedBeforeContinue = await savedState(page);
      assert.equal(completedBeforeContinue.challenges.lc13.completed, true);
      assert.equal(completedBeforeContinue.applied_events.filter((event) => event === 'ch05_lc13_completed').length, 1);
      assert.equal(completedBeforeContinue.applied_events.filter((event) => event === 'ch05_s02_complete').length, 0);
      visibleState = await buttonViewportState(continueButton);
      assert.equal(visibleState.focused, true, 'restored completion focuses Continue');
      assert.equal(visibleState.inViewport, true, 'restored completion scrolls Continue into view');

      const beforeTeacher = await savedState(page);
      await page.getByRole('button', { name: 'Teacher Mode' }).click();
      await page.getByRole('button', { name: 'Open / replay this scene (read-only preview)' }).click();
      assert.match(await page.locator('#story-root').innerText(), /Teacher preview · read-only/);
      assert.deepEqual(await savedState(page), beforeTeacher, 'Teacher preview leaves the restored save untouched');
      await page.getByRole('button', { name: 'Return to student scene' }).click();
      assert.deepEqual(await savedState(page), beforeTeacher);
    }

    await continueButton.click();
    assert.equal(new URL(page.url()).hash, '#ch05_s03');
    assert.match(await page.locator('#scene-title').innerText(), /The Display and the Question/);
    let transitioned = await savedState(page);
    assert.equal(transitioned.applied_events.filter((event) => event === 'ch05_s02_complete').length, 1);
    await page.reload();
    assert.match(await page.locator('#scene-title').innerText(), /The Display and the Question/);
    transitioned = await savedState(page);
    assert.equal(transitioned.scene, 'ch05_s03');
    assert.equal(transitioned.applied_events.filter((event) => event === 'ch05_s02_complete').length, 1, 'S02 completion stays write-once after refresh');

    if (width === 390) {
      await page.goBack();
      await page.waitForFunction(() => location.hash === '#ch05_s02');
      assert.equal((await savedState(page)).applied_events.filter((event) => event === 'ch05_s02_complete').length, 1);
      await page.goForward();
      await page.waitForFunction(() => location.hash === '#ch05_s03');
      await page.getByRole('link', { name: 'Pygmalion home' }).click();
      await page.getByRole('button', { name: 'CONTINUE READING' }).click();
      assert.equal(new URL(page.url()).hash, '#ch05_s03', 'Continue Reading restores S03 from the saved checkpoint');
    }

    assert.deepEqual(pageErrors, [], `${width}px browser page errors`);
    await context.close();
  }
});
