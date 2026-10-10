import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createInitialState, setScene, STORAGE_KEY } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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
      response.writeHead(200, { 'content-type': mimeTypes[path.extname(filePath)] || 'application/octet-stream' });
      response.end(await fs.readFile(filePath));
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

test('Chromium: CH05 S05 uses full visible silhouettes, compact shared caption and read-only Teacher Mode at 390/430/480/768/1440 px', { timeout: 120_000 }, async (t) => {
  const { server, url } = await startStaticServer();
  let browser;
  const screenshotDir = process.env.PYGMALION_QA_SCREENSHOT_DIR || path.join(os.tmpdir(), 'pygmalion-ch05-s05-visual-preview');
  await fs.mkdir(screenshotDir, { recursive: true });
  t.after(async () => {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  });
  browser = await chromium.launch({ headless: true });

  const fixture = {
    ...createInitialState(),
    applied_events: ['ch05_s04_complete'],
    origin_motivation: 'independence',
    reception_register_plan: 'd10_keep_core_voice',
    credit_response: 'd11_private_conversation',
    future_question_style: 'plan_focused',
    independence: 2
  };
  const checkpoint = JSON.stringify(setScene(fixture, 'ch05_s05'));

  for (const [width, height] of [[390, 844], [430, 932], [480, 960], [768, 1024], [1440, 960]]) {
    const context = await browser.newContext({ viewport: { width, height } });
    await context.addInitScript(`localStorage.setItem(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(checkpoint)});`);
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') pageErrors.push(message.text()); });
    await page.goto(`${url}/#ch05_s05`);
    await page.locator('.storybook-art.ch05-front-steps .art-eliza img').waitFor({ state: 'visible' });
    await page.locator('.storybook-art.ch05-front-steps .supporting-character').waitFor({ state: 'visible' });
    await page.locator('.storybook-art.ch05-front-steps figcaption').waitFor({ state: 'visible' });
    await page.locator('.storybook-art.ch05-front-steps img').evaluateAll((images) => Promise.all(images.map((image) => image.decode())));

    const layout = await page.locator('.storybook-art.ch05-front-steps').evaluate((art) => {
      const artRect = art.getBoundingClientRect();
      const caption = art.querySelector('figcaption');
      const captionRect = caption.getBoundingClientRect();
      const captionStyle = getComputedStyle(caption);
      const pseudoStyle = getComputedStyle(art, '::after');
      const characters = [...art.querySelectorAll('.art-eliza img, .supporting-character')].map((image) => {
        const rect = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let minX = canvas.width, minY = canvas.height, maxX = -1, maxY = -1;
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 0; x < canvas.width; x++) {
            if (pixels[(y * canvas.width + x) * 4 + 3] > 8) {
              minX = Math.min(minX, x); minY = Math.min(minY, y);
              maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
            }
          }
        }
        const scaleX = rect.width / image.naturalWidth;
        const scaleY = rect.height / image.naturalHeight;
        const silhouette = {
          left: rect.left + minX * scaleX, right: rect.left + (maxX + 1) * scaleX,
          top: rect.top + minY * scaleY, bottom: rect.top + (maxY + 1) * scaleY
        };
        return {
          kind: image.classList.contains('supporting-character') ? 'higgins' : 'eliza',
          src: new URL(image.getAttribute('src'), location.href).pathname,
          cssLeft: style.left, cssHeight: parseFloat(style.height),
          renderedSilhouetteHeight: silhouette.bottom - silhouette.top,
          silhouette, visible: rect.width > 0 && rect.height > 0 && silhouette.bottom > artRect.top && silhouette.top < artRect.bottom,
          insideArt: silhouette.left >= artRect.left - 1 && silhouette.right <= artRect.right + 1 && silhouette.top >= artRect.top - 1 && silhouette.bottom <= artRect.bottom + 1,
          silhouetteCaptionOverlap: silhouette.left < captionRect.right && silhouette.right > captionRect.left && silhouette.top < captionRect.bottom && silhouette.bottom > captionRect.top
        };
      });
      return {
        art: { left: artRect.left, right: artRect.right, top: artRect.top, bottom: artRect.bottom, width: artRect.width, height: artRect.height },
        caption: {
          left: captionRect.left, right: captionRect.right, top: captionRect.top, bottom: captionRect.bottom,
          width: captionRect.width, height: captionRect.height, position: captionStyle.position,
          rightStyle: captionStyle.right, bottomStyle: captionStyle.bottom, backgroundColor: captionStyle.backgroundColor,
          text: caption.textContent.trim()
        },
        pseudoDisplay: pseudoStyle.display,
        characters,
        clippedControls: [...document.querySelectorAll('button, a')].filter((control) => {
          const rect = control.getBoundingClientRect();
          return rect.width > 0 && (rect.left < -1 || rect.right > innerWidth + 1);
        }).length,
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: innerWidth
      };
    });

    const mobile = width <= 599;
    assert.match(await page.locator('h1').innerText(), /Leaving the Hall/);
    assert.match(layout.caption.text, /Chapter V\s*·\s*Leaving the Hall/);
    assert.equal(layout.caption.position, 'absolute', `${width}px caption remains attached to the art panel`);
    assert.equal(layout.caption.bottomStyle, mobile ? '8px' : '16px', `${width}px caption stays at the shared bottom-right position`);
    assert.equal(layout.caption.rightStyle, mobile ? '8px' : '16px', `${width}px caption stays at the shared bottom-right position`);
    assert.ok(layout.caption.width < layout.art.width * 0.65, `${width}px caption background remains compact: ${layout.caption.width}/${layout.art.width}`);
    assert.ok(layout.caption.height <= 36, `${width}px caption has natural compact height`);
    assert.equal(layout.caption.backgroundColor, 'rgba(39, 35, 40, 0.48)', `${width}px only the compact caption carries its translucent background`);
    assert.equal(layout.characters.length, 2, `${width}px scene renders only Eliza and Higgins`);
    assert.match(layout.characters.find(({ kind }) => kind === 'eliza').src, /eliza_her-own-voice_thoughtful_cutout\.png$/);
    assert.match(layout.characters.find(({ kind }) => kind === 'higgins').src, /higgins_master_cutout\.png$/);
    const eliza = layout.characters.find(({ kind }) => kind === 'eliza');
    const higgins = layout.characters.find(({ kind }) => kind === 'higgins');
    assert.ok(Math.abs(eliza.cssHeight - layout.art.height * 0.82) <= 1, `${width}px Eliza keeps the prominent 82% height`);
    assert.ok(Math.abs(higgins.cssHeight - layout.art.height * 0.78) <= 1, `${width}px Higgins uses the final 78% height`);
    assert.ok(higgins.renderedSilhouetteHeight / eliza.renderedSilhouetteHeight >= 0.7, `${width}px visible Higgins silhouette remains proportionate to Eliza`);
    for (const character of layout.characters) {
      assert.equal(character.visible, true, `${width}px visible silhouette exists`);
      assert.equal(character.insideArt, true, `${width}px full visible silhouette stays inside artwork`);
      assert.equal(character.silhouetteCaptionOverlap, false, `${width}px caption does not cover ${character.kind}'s visible silhouette: ${JSON.stringify({ art: layout.art, caption: layout.caption, silhouette: character.silhouette })}`);
    }
    assert.equal(layout.scrollWidth, layout.viewportWidth, `${width}px has no horizontal overflow`);
    assert.equal(layout.clippedControls, 0, `${width}px controls remain inside the viewport`);
    if ([390, 768, 1440].includes(width)) {
      await page.screenshot({ path: path.join(screenshotDir, `ch05-s05-${width}.png`), fullPage: true });
    }

    if (width === 390) {
      const beforeTeacher = await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).sort().map((key) => [key, localStorage.getItem(key)]))));
      await page.locator('[data-action="open-teacher"]').click();
      assert.match(await page.locator('#teacher-content').innerText(), /read-only/i);
      assert.match(await page.locator('#teacher-content').innerText(), /does not select a contact/i);
      await page.locator('[data-action="teacher-preview"]').click();
      const afterTeacher = await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.keys(localStorage).sort().map((key) => [key, localStorage.getItem(key)]))));
      assert.equal(afterTeacher, beforeTeacher, 'S05 Teacher Mode and its preview leave stored progress unchanged');
    }
    assert.deepEqual(pageErrors, [], `${width}px has no browser console errors`);
    await context.close();
  }
});
