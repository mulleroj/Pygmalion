import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCENES, STORY_VOICE, DECISION_COUNT, CHALLENGE_COUNT, STORY_VOICE_COUNT, AUDIO_FILES, VISUAL_FILES, LISTENING } from '../src/content.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readRepoFile = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');

test('Chapter I contains exactly the five canonical scenes in order', () => {
  assert.deepEqual(SCENES.map((scene) => scene.id), ['ch01_s01', 'ch01_s02', 'ch01_s03', 'ch01_s04', 'ch01_s05']);
  assert.equal(SCENES.length, 5);
  assert.equal(SCENES.filter((scene) => scene.decision).length, DECISION_COUNT);
  assert.equal(SCENES.filter((scene) => scene.challenge).length, CHALLENGE_COUNT);
});

test('canonical story copy and challenge answer keys remain intact', () => {
  const script = SCENES.flatMap((scene) => [...scene.narration, ...scene.dialogue.flatMap((line) => line)]).join(' ');
  assert.match(script, /I ain't done nothing wrong\. I'm a good girl, I am\./);
  assert.deepEqual(LISTENING.lc01.map((sample) => sample.answer), ['apology', 'excuse', 'intention to repair']);
  assert.deepEqual(LISTENING.lc02.map((sample) => sample.answer), ['lc02_s01_worker_request', 'lc02_s02_familiar_instruction', 'lc02_s03_formal_question']);
});

test('the Cockney text pass is present on all 28 canonical Eliza player-facing lines', () => {
  const playerCopy = SCENES.flatMap((scene) => [
    ...scene.dialogue.filter(([speaker]) => speaker === 'Eliza').map(([, line]) => line),
    ...(scene.openingTones || []).map((item) => item.text),
    ...(scene.decision?.choices || []).map((item) => item.text),
    ...(scene.chapterEnd || []).filter((line) => line.startsWith('Tomorrow'))
  ]).join('\n');
  const expected = [
    "Flowers, sir? Fresh ones! Ain't no sense standin' there in the rain.",
    "Go on. A flower'll make the room look kinder.",
    "Two for a penny, they are. I'll pick you the bright ones.",
    "Then have one little flower. Won't slow you down.",
    "Got to be quick, ain't I? Rain don't wait, and neither do customers.",
    'A flower for your coat, sir? Make the walk less grey, it will.',
    'Penny a flower. Quick as that.',
    "You looked at 'em. Don't go saying they ain't worth seeing.",
    "The rain ain't gonna pick 'em up for me.",
    "Then mind where you're going next time.",
    'Give us a hand, will you? Clean ones go back in the basket.',
    "You knocked 'em down. Look at the stems. I can't sell 'em like that.",
    "All right, you're sorry. I'll get 'em up and get back to work.",
    "Can you hear when someone's trying to sell flowers in the rain, can you?",
    "I ain't no pattern on your page.",
    "Why d'you want to write down the way I talk?",
    "What d'you want to learn off me? Tell me straight.",
    "Write what you like. I've got flowers to sell, and I'm getting back to 'em.",
    'I reckon people hear what they expect to hear.',
    "Look at that window. Them flowers ain't hiding from nobody.",
    'People hear how I talk before they see what I can do.',
    "Maybe if I could talk another way, it'd open a door or two. Wouldn't make me worth more. Just give me another way to make 'em listen.",
    "I'd make my own mind up what to say before I walked through.",
    'I want to speak in a way that gets me better work and a proper chance.',
    "I want 'em to hear me before they decide what I am.",
    'I want to learn how they talk, then choose what suits me.',
    'I want more ways to speak so nobody gets to choose my future but me.',
    "Tomorrow, I'll find that door myself. If they're going to teach me, they'll hear what I'm asking for first."
  ];
  assert.equal(expected.length, 28);
  for (const line of expected) assert.match(playerCopy, new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.equal(STORY_VOICE.s03e.transcript, "I ain't done nothing wrong. I'm a good girl, I am.");
});

test('canonical IDs and dialect framing survive the copy pass', () => {
  assert.deepEqual(SCENES.find((scene) => scene.id === 'ch01_s01').openingTones.map((item) => item.id), ['bright', 'practical', 'defensive']);
  assert.deepEqual(SCENES.find((scene) => scene.id === 'ch01_s02').decision.choices.map((item) => item.id), ['d01_ask_help', 'd01_name_damage', 'd01_accept_and_work']);
  assert.deepEqual(SCENES.find((scene) => scene.id === 'ch01_s03').decision.choices.map((item) => item.id), ['d02_direct_question', 'd02_request_explanation', 'd02_reject_and_return']);
  assert.deepEqual(SCENES.find((scene) => scene.id === 'ch01_s05').decision.choices.map((item) => item.id), ['opportunity', 'respect', 'learning', 'independence']);
  assert.match(readRepoFile('src/content.js'), /Accent ≠ intelligence/);
  assert.match(readRepoFile('docs/chapters/ch01/TEACHER_CONTENT.md'), /These forms are part of character, identity, register and dialect/);
});

test('Higgins\' Ear keeps the three-character hierarchy without a notebook inset', () => {
  const scene03 = SCENES.find((scene) => scene.id === 'ch01_s03');
  const scene04 = SCENES.find((scene) => scene.id === 'ch01_s04');
  assert.equal(scene03.props.some((asset) => asset.src.includes('higgins-notebook')), true);
  assert.deepEqual(scene04.props, []);
  assert.deepEqual(scene04.supporting.map((asset) => asset.src), [
    './assets/images/characters/higgins/runtime/higgins_master_cutout.png',
    './assets/images/characters/pickering/runtime/pickering_master_cutout.png'
  ]);
});

test('scene 3 Higgins uses the canonical Kelvin asset with no temporary QA routing', () => {
  assert.equal(STORY_VOICE.s03h.src, './assets/audio/characters/higgins/higgins_ch01_scene03_001.mp3');
  assert.equal(STORY_VOICE.s04h.src, './assets/audio/characters/higgins/higgins_ch01_scene04_001.mp3');
  assert.doesNotMatch(readRepoFile('src/content.js'), /_ab\.mp3/);
  const canonicalPath = path.join(repoRoot, 'assets', 'audio', 'characters', 'higgins', 'higgins_ch01_scene03_001.mp3');
  assert.ok(fs.statSync(canonicalPath).size > 0, 'canonical Kelvin A05 asset must be present and non-empty');
});

test('Higgins A05 and A06 use the canonical Kelvin voice', () => {
  const bible = readRepoFile('.codex/skills/pygmalion-adventure/references/audio-voice-bible.md');
  const audioPlan = readRepoFile('docs/chapters/ch01/AUDIO_PLAN.md');
  const manifest = readRepoFile('docs/chapters/ch01/CH01_AUDIO_ASSET_MANIFEST.md');
  assert.match(bible, /Kelvin - Calm Young British Male/);
  assert.match(bible, /JlptfLxaUpd8pZcw9dKd/);
  assert.match(audioPlan, /A06[\s\S]*?JlptfLxaUpd8pZcw9dKd/);
  assert.match(audioPlan, /A06[\s\S]*?HUMAN QA APPROVED/);
  assert.doesNotMatch(audioPlan, /A06[\s\S]*?Severin/);
  assert.match(manifest, /AM08A[\s\S]*?Kelvin - Calm Young British Male[\s\S]*?JlptfLxaUpd8pZcw9dKd/);
  assert.match(manifest, /AM08A[\s\S]*?HUMAN QA APPROVED/);
  assert.match(manifest, /`AM06`[^\n]*\| `HUMAN QA APPROVED` \|/);
});

test('old Eliza copy is absent from runtime and canonical text, with the signature preserved', () => {
  const canonicalText = [
    readRepoFile('src/content.js'),
    readRepoFile('docs/chapters/ch01/SCRIPT.md'),
    readRepoFile('docs/chapters/ch01/STATE_AND_BRANCHING.md')
  ].join('\n');
  for (const oldLine of [
    'Fresh flowers for a wet day!',
    "Come on, don't hide behind the rain.",
    'Two flowers for a penny.',
    'Then take one small flower.',
    "The rain won't pick them up for me.",
    'Then look before you move next time.',
    "I'm not a pattern on your page.",
    'Why are you writing down the way I speak?',
    'What are you trying to learn from me?',
    'The flowers aren\'t hiding from anyone.',
    'People hear the way I speak before they see what I can do.',
    'Maybe speaking another way could open a door.',
    "I'd decide for myself what to say when I walked through it.",
    'I think people hear what they expect to hear.'
  ]) assert.equal(canonicalText.includes(oldLine), false, `stale copy remains: ${oldLine}`);
  assert.equal((canonicalText.match(/I ain't done nothing wrong\. I'm a good girl, I am\./g) || []).length, 4);
});

test('clean replacement audio is current and A04 remains protected', () => {
  const audioPlan = readRepoFile('docs/chapters/ch01/AUDIO_PLAN.md');
  const manifest = readRepoFile('docs/chapters/ch01/CH01_AUDIO_ASSET_MANIFEST.md');
  assert.doesNotMatch(audioPlan, /REGENERATION REQUIRED — COCKNEY TEXT PASS/);
  assert.doesNotMatch(manifest, /REGENERATION REQUIRED — COCKNEY TEXT PASS/);
  assert.match(audioPlan.slice(audioPlan.indexOf('### A02'), audioPlan.indexOf('### A03')), /Verified duration: `~11\.26 s`/);
  assert.match(audioPlan.slice(audioPlan.indexOf('### A08'), audioPlan.indexOf('## LC01')), /Verified duration: `~11\.83 s`/);
  assert.match(manifest, /`AM02`[^\n]*\| 11\.26 s \| 197020 B \|/);
  assert.match(manifest, /`AM09`[^\n]*\| 11\.83 s \| 206215 B \|/);
  assert.match(audioPlan.slice(audioPlan.indexOf('### A04'), audioPlan.indexOf('### A05')), /CLEAN REPLACEMENT INSTALLED — STT VERIFIED/);
  assert.match(audioPlan.slice(audioPlan.indexOf('### A04'), audioPlan.indexOf('### A05')), /Verified duration: `~2\.72 s`/);
  assert.doesNotMatch(audioPlan.slice(audioPlan.indexOf('### A04'), audioPlan.indexOf('### A05')), /emotionally exposed/);
  assert.doesNotMatch(manifest.match(/`AM06`[^\n]*/)?.[0] || '', /REGENERATION REQUIRED/);
  assert.match(manifest, /`AM06`[^\n]*\| 2\.72 s \| 61601 B \|/);
});

test('the vertical slice references seven optional story voices and sixteen local audio files', () => {
  assert.equal(STORY_VOICE_COUNT, 7);
  assert.equal(AUDIO_FILES.length, 16);
  assert.equal(VISUAL_FILES.length, 15);
});

test('student-facing choice labels do not expose internal IDs', () => {
  for (const scene of SCENES) {
    for (const item of scene.decision?.choices || []) {
      assert.doesNotMatch(`${item.title} ${item.text}`, /ch01_|d0[1-3]_|LC0[12]/);
    }
  }
});
