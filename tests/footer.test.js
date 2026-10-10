import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('the exact human-in-the-loop footer is a single semantic site element outside the app', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const footerMatches = [...html.matchAll(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gi)];

  assert.equal(footerMatches.length, 1, 'the document contains exactly one footer');
  assert.match(footerMatches[0][1], /^\s*AI \+ 👤 \| HUMAN IN THE LOOP\s*$/);
  assert.ok(html.indexOf(footerMatches[0][0]) > html.indexOf('<div id="app"'), 'the footer follows the app container');
  assert.ok(html.indexOf(footerMatches[0][0]) < html.indexOf('<div id="live-region"'), 'the footer remains outside the app and before utility regions');
});

test('the footer stays in normal flow and the app fills short viewports above it', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

  assert.match(css, /body\s*\{[^}]*display:\s*flex;[^}]*flex-direction:\s*column;/);
  assert.match(css, /\.app-shell\s*\{[^}]*flex:\s*1 0 auto;[^}]*min-height:\s*0;/);
  assert.match(css, /\.site-footer\s*\{[^}]*border-top:\s*1px solid var\(--line\);[^}]*text-align:\s*center;/);
  assert.doesNotMatch(css, /\.site-footer\s*\{[^}]*position:\s*(?:fixed|sticky)/);
});
