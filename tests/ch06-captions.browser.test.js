import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createInitialState, STORAGE_KEY } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const titles = {
  ch06_s01: 'Chapter VI · The Morning After',
  ch06_s02: 'Chapter VI · The Question in the Mirror',
  ch06_s03: 'Chapter VI · Three Ways Forward',
  ch06_s04: 'Chapter VI · Her Own Statement',
  ch06_s05: 'Chapter VI · The Voice She Chooses'
};
const routes = [
  ...[
    ['higgins_directly', 'higgins'], ['pickering_first', 'pickering'],
    ['mrs_pearce_first', 'mrs-pearce'], [undefined, 'neutral']
  ].map(([next_contact, variant]) => ({ scene: 'ch06_s01', variant, state: {
    started: true, ch05_complete: true, next_contact,
    applied_events: ['ch05_s05_complete']
  }})),
  ...['ch06_s02', 'ch06_s03', 'ch06_s04'].map((scene, i) => ({ scene, variant: scene, state: {
    started: true, ch05_complete: true,
    chapter6_direction: 'integrated_identity', origin_motivation: 'learning',
    reception_register_plan: 'd10_listen_then_adjust', credit_response: 'd11_accept_for_now',
    future_question_style: 'direct', next_contact: 'pickering_first',
    challenges: { ...createInitialState().challenges, lc15: { answers: {}, completed: true, attempts: 3, firstAttempt: true, noAudioItems: [] } },
    applied_events: ['ch05_s05_complete', 'ch06_s01_complete', ...(i > 0 ? ['ch06_s02_complete', 'ch06_d12_recorded', 'ch06_lc15_completed'] : []), ...(i > 1 ? ['ch06_s03_complete'] : [])]
  }})),
  ...['social_success', 'independent_voice', 'integrated_identity'].map((chapter6_direction) => ({
    scene: 'ch06_s05', variant: chapter6_direction, state: {
      started: true, ch05_complete: true, chapter6_direction, final_statement_shape: 'declaration',
      origin_motivation: 'learning', confirmed_motivation: 'opportunity', practice_preference: 'own_words',
      reception_register_plan: 'd10_listen_then_adjust', credit_response: 'd11_accept_for_now',
      future_question_style: 'direct', next_contact: 'pickering_first', confidence: 4, pronunciation: 7, independence: 3,
      applied_events: ['ch05_s05_complete', 'ch06_s01_complete', 'ch06_s02_complete', 'ch06_d12_recorded', 'ch06_lc15_completed', 'ch06_s03_complete', 'ch06_final_statement_shape_recorded', 'ch06_final_statement_delivered', 'ch06_s04_complete']
    }
  }))
];

async function startServer() {
  const types = { '.css': 'text/css', '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.webp': 'image/webp', '.mp3': 'audio/mpeg' };
  const server = http.createServer(async (req, res) => {
    const file = path.resolve(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html'));
    if (file !== root && !file.startsWith(root + path.sep)) return res.writeHead(403).end();
    try { res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' }); res.end(await fs.readFile(file)); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

test('Chapter VI captions render once, correctly anchored and compact across all scene routes and requested viewports', { timeout: 180_000 }, async (t) => {
  const { server, url } = await startServer();
  let browser;
  t.after(async () => { await browser?.close(); await new Promise((resolve) => server.close(resolve)); });
  browser = await chromium.launch({ headless: true });
  const reviewDir = path.join(root, 'qa', 'ch06-caption-review');
  await fs.mkdir(reviewDir, { recursive: true });
  const review = [];
  for (const width of [390, 430, 768, 1440]) {
    for (const route of routes) {
      const state = { ...createInitialState(), ...route.state, scene: route.scene };
      const context = await browser.newContext({ viewport: { width, height: width < 600 ? 900 : 1000 } });
      await context.addInitScript(([key, value]) => localStorage.setItem(key, JSON.stringify(value)), [STORAGE_KEY, state]);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      await page.goto(`${url}/#${route.scene}`);
      const savedBefore = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
      const caption = page.locator('.storybook-art figcaption');
      await caption.waitFor({ state: 'visible' });
      const layout = await page.locator('.storybook-art').evaluate((art) => {
        const c = art.querySelector('figcaption');
        const a = art.getBoundingClientRect();
        const r = c.getBoundingClientRect();
        const s = getComputedStyle(c);
        const eliza = art.querySelector('.art-eliza img')?.getBoundingClientRect();
        const companions = [...art.querySelectorAll('.supporting-character')].map((x) => x.getBoundingClientRect());
        return { text: c.textContent.trim(), count: art.querySelectorAll('figcaption').length,
          art: { left: a.left, right: a.right, top: a.top, bottom: a.bottom, width: a.width, height: a.height },
          caption: { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height,
            position: s.position, cssRight: s.right, cssBottom: s.bottom, bg: s.backgroundColor },
          eliza: eliza && { left: eliza.left, right: eliza.right, top: eliza.top, bottom: eliza.bottom },
          companions: companions.map((b) => ({ left: b.left, right: b.right, top: b.top, bottom: b.bottom })),
          scrollWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth };
      });
      const gap = width < 600 ? 8 : 16;
      assert.equal(layout.count, 1, `${route.scene}/${route.variant}/${width}: exactly one caption`);
      assert.equal(layout.text, titles[route.scene], `${route.scene}/${route.variant}/${width}: exact caption text`);
      assert.equal(layout.caption.position, 'absolute');
      assert.equal(layout.caption.cssRight, `${gap}px`);
      assert.equal(layout.caption.cssBottom, `${gap}px`);
      assert.ok(Math.abs(layout.art.right - layout.caption.right - gap) <= 1, 'caption right offset matches shared rule');
      assert.ok(Math.abs(layout.art.bottom - layout.caption.bottom - gap) <= 1, 'caption bottom offset matches shared rule');
      assert.ok(layout.caption.width < layout.art.width * 0.8, 'caption background remains compact');
      assert.ok(layout.caption.height < 36, 'caption stays at natural text height');
      assert.equal(layout.caption.bg, 'rgba(39, 35, 40, 0.48)');
      assert.equal(layout.scrollWidth, layout.viewportWidth, 'no horizontal overflow');
      assert.equal(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), savedBefore, 'rendering does not change reader progress or decisions');
      assert.equal(await page.locator('audio').count(), 0, 'scene render does not start audio');
      if (route.scene === 'ch06_s01' && route.variant === 'neutral' && width === 390) {
        await page.locator('[data-action="open-teacher"]').click();
        assert.equal(await page.locator('#teacher-dialog').evaluate((dialog) => dialog.open), true, 'Teacher Mode opens');
        assert.match(await page.locator('#teacher-content').innerText(), /read-only/i, 'Teacher preview communicates its read-only state');
        assert.equal(await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY), savedBefore, 'Teacher Mode leaves reader progress unchanged');
        await page.locator('[data-action="close-teacher"]').click();
      }
      assert.deepEqual(errors, [], `${route.scene}/${route.variant}/${width}: no console errors`);
      if ([390, 1440].includes(width)) {
        const name = `${route.scene}-${route.variant}-${width}.png`;
        const filepath = path.join(reviewDir, name);
        await page.screenshot({ path: filepath, fullPage: true });
        review.push({ scene: route.scene, variant: route.variant, width, file: name, text: layout.text });
      }
      await context.close();
    }
  }
  const cards = review.map(({ scene, variant, width, file, text }) => `<article><h2>${scene} · ${variant} · ${width}px</h2><p>${text}</p><img src="${file}" alt="${text}, ${variant}, ${width}px"></article>`).join('\n');
  await fs.writeFile(path.join(reviewDir, 'index.html'), `<!doctype html><meta charset="utf-8"><title>Chapter VI caption review</title><style>body{font:16px system-ui;background:#ece9e2;margin:24px;color:#282328}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:20px}article{background:white;padding:12px;border-radius:8px}img{display:block;width:100%;height:auto}h2{font-size:1rem;margin:.2rem 0}</style><h1>Chapter VI caption visual review</h1><p>Caption screenshots at 390px mobile and 1440px desktop. Full viewport checks also ran at 430px and 768px.</p><main>${cards}</main>`, 'utf8');
});
