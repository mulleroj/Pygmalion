import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
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

test('Chromium: CH05 S04 caption stays compact at the shared bottom-right position at 390/430/480/768/1440 px', { timeout: 120_000 }, async (t) => {
  const { server, url } = await startStaticServer();
  let browser;
  t.after(async () => {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  });
  browser = await chromium.launch({ headless: true });

  const initial = {
    ...createInitialState(),
    credit_response: 'd11_accept_for_now',
    applied_events: ['ch05_s03_complete']
  };
  const checkpoint = JSON.stringify(setScene(initial, 'ch05_s04'));

  for (const [width, height] of [[390, 844], [430, 932], [480, 960], [768, 1024], [1440, 960]]) {
    const context = await browser.newContext({ viewport: { width, height } });
    await context.addInitScript(`localStorage.setItem(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(checkpoint)});`);
    const page = await context.newPage();
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') pageErrors.push(message.text()); });
    await page.goto(`${url}/#ch05_s04`);
    await page.locator('.storybook-art .art-eliza img').waitFor({ state: 'visible' });
    await page.locator('.storybook-art .supporting-character').waitFor({ state: 'visible' });
    await page.locator('.storybook-art figcaption').waitFor({ state: 'visible' });

    const layout = await page.locator('.storybook-art').evaluate((art) => {
      const caption = art.querySelector('figcaption');
      const captionRect = caption.getBoundingClientRect();
      const artRect = art.getBoundingClientRect();
      const captionStyle = getComputedStyle(caption);
      const pseudoStyle = getComputedStyle(art, '::after');
      const characters = [...art.querySelectorAll('.art-eliza img, .supporting-character')].map((image) => {
        const rect = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        return {
          kind: image.classList.contains('supporting-character') ? 'support' : 'eliza',
          src: new URL(image.getAttribute('src'), location.href).pathname,
          left: style.left,
          width: parseFloat(style.width),
          height: parseFloat(style.height),
          zIndex: style.zIndex,
          visible: style.display !== 'none' && rect.bottom > artRect.top && rect.top < artRect.bottom,
          insideArt: rect.left >= artRect.left - 1 && rect.right <= artRect.right + 1 && rect.bottom <= artRect.bottom + 1
        };
      });
      return {
        art: { left: artRect.left, right: artRect.right, top: artRect.top, bottom: artRect.bottom, width: artRect.width, height: artRect.height },
        caption: {
          left: captionRect.left, right: captionRect.right, top: captionRect.top, bottom: captionRect.bottom,
          width: captionRect.width, height: captionRect.height,
          position: captionStyle.position, rightStyle: captionStyle.right,
          bottomStyle: captionStyle.bottom, backgroundColor: captionStyle.backgroundColor,
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
    assert.match(await page.locator('.storybook-art figcaption').innerText(), /Chapter V\s*·\s*What Happens to Me Now\?/);
    assert.equal(layout.caption.position, 'absolute', `${width}px caption remains attached to the art panel`);
    assert.equal(layout.caption.bottomStyle, mobile ? '8px' : '16px', `${width}px caption uses shared bottom spacing`);
    assert.equal(layout.caption.rightStyle, mobile ? '8px' : '16px', `${width}px caption uses shared right spacing`);
    assert.ok(Math.abs(layout.art.bottom - layout.caption.bottom - (mobile ? 8 : 16)) <= 1, `${width}px caption is anchored to the art's bottom-right edge`);
    assert.ok(Math.abs(layout.art.right - layout.caption.right - (mobile ? 8 : 16)) <= 1, `${width}px caption is anchored to the art's bottom-right edge`);
    assert.ok(layout.caption.left >= layout.art.left && layout.caption.top >= layout.art.top, `${width}px caption stays inside the art panel`);
    assert.ok(layout.caption.height <= 36, `${width}px caption keeps its natural content height: ${layout.caption.height}px`);
    assert.ok(layout.caption.width < layout.art.width * 0.8, `${width}px caption background stays limited to its text: ${layout.caption.width}/${layout.art.width}`);
    assert.equal(layout.caption.backgroundColor, 'rgba(39, 35, 40, 0.48)', `${width}px only the compact caption element carries the shared translucent background`);
    assert.equal(layout.pseudoDisplay, 'none', `${width}px S04 storybook overlay remains disabled`);
    assert.equal(layout.characters.length, 2);
    assert.match(layout.characters.find((character) => character.kind === 'eliza').src, /eliza_her-own-voice_thoughtful_cutout\.png$/);
    assert.match(layout.characters.find((character) => character.kind === 'support').src, /mrs-pearce_practical-questioning_cutout\.png$/);
    for (const character of layout.characters) {
      assert.equal(character.visible, true, `${width}px character remains visible`);
      assert.equal(character.insideArt, true, `${width}px character remains inside the art panel`);
      assert.ok(Math.abs(character.width - layout.art.width * 0.48) <= 1, `${width}px character keeps the approved 48% width`);
      assert.ok(Math.abs(character.height - layout.art.height * 0.68) <= 1, `${width}px character keeps the approved 68% height`);
    }
    assert.equal(layout.scrollWidth, layout.viewportWidth, `${width}px has no horizontal overflow`);
    assert.equal(layout.clippedControls, 0, `${width}px controls remain inside the viewport`);
    assert.deepEqual(pageErrors, [], `${width}px has no browser console errors`);
    await context.close();
  }
});
