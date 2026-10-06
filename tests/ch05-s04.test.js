import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CH05_SCENE_04, CH05_SCENE_05, CH05_S04_TEACHER_SECTIONS } from '../src/ch05-content.js';
import { ambienceForScene } from '../src/content.js';
import { AMBIENCE_FILES } from '../src/audio.js';
import { applyDecision, completeScene, createInitialState, getSceneAdvanceBlock, loadState, markLc14SupportUsed, recordLc14Answer, saveState, setScene } from '../src/state.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
const enterS04 = (credit) => setScene({ ...createInitialState(), credit_response: credit, applied_events: ['ch05_s03_complete'] }, 'ch05_s04');

function mp3Mpeg1Layer3Duration(bytes) {
  const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
  let offset = 0, frames = 0;
  if (bytes.subarray(0, 3).toString('ascii') === 'ID3') {
    const size = ((bytes[6] & 127) << 21) | ((bytes[7] & 127) << 14) | ((bytes[8] & 127) << 7) | (bytes[9] & 127);
    offset = 10 + size + ((bytes[5] & 16) ? 10 : 0);
  }
  while (offset + 4 <= bytes.length) {
    assert.equal(bytes[offset], 255, `bad MPEG frame sync at byte ${offset}`);
    assert.equal(bytes[offset + 1] & 224, 224, `bad MPEG frame sync at byte ${offset}`);
    const header = bytes.readUInt32BE(offset);
    const version = (header >>> 19) & 3, layer = (header >>> 17) & 3;
    const bitrateIndex = (header >>> 12) & 15, sampleRateIndex = (header >>> 10) & 3;
    assert.equal(version, 3, 'expected MPEG-1');
    assert.equal(layer, 1, 'expected Layer III');
    assert.equal(sampleRateIndex, 0, 'expected 44.1 kHz');
    assert.ok(bitrateIndex > 0 && bitrateIndex < 15, 'expected valid bitrate');
    offset += Math.floor(144 * bitrates[bitrateIndex] * 1000 / 44100) + ((header >>> 9) & 1);
    assert.ok(offset <= bytes.length, 'no truncated final MPEG frame');
    frames++;
  }
  assert.equal(offset, bytes.length, 'MP3 ends on a complete frame');
  return frames * 1152 / 44100;
}

test('S04 has canonical identity, approved character art and its canonical side-room audio', () => {
  assert.deepEqual([CH05_SCENE_04.id, CH05_SCENE_04.number, CH05_SCENE_04.title, CH05_SCENE_04.chapter], ['ch05_s04', 4, 'What Happens to Me Now?', 'V']);
  assert.equal(CH05_SCENE_04.location, 'Quiet side room off the exhibition hall');
  assert.equal(CH05_SCENE_04.visualFallback, false);
  assert.equal(CH05_SCENE_04.background.src, './assets/images/locations/ch05/ch05_lambeth_public_rooms_side_room.webp');
  assert.deepEqual(CH05_SCENE_04.plate, CH05_SCENE_04.background);
  assert.equal(CH05_SCENE_04.composition, 'ch05-side-room');
  assert.equal(CH05_SCENE_04.eliza.src, './assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png');
  const sourcePath = path.join(root, 'assets/images/characters/eliza/source/eliza_her-own-voice_thoughtful.png');
  const masterPath = path.join(root, 'assets/images/characters/eliza/eliza_her-own-voice_thoughtful.webp');
  const runtimePath = path.join(root, CH05_SCENE_04.eliza.src.slice(2));
  const source = fs.readFileSync(sourcePath);
  const runtime = fs.readFileSync(runtimePath);
  const master = fs.readFileSync(masterPath);
  for (const png of [source, runtime]) {
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1086, 1448]);
    assert.equal(png[25], 6, 'runtime and source PNGs retain alpha');
  }
  assert.deepEqual(runtime, source);
  assert.equal(master.toString('ascii', 8, 12), 'WEBP');
  assert.equal(master.toString('ascii', 12, 16), 'VP8L');
  assert.equal(1 + master[21] + ((master[22] & 0x3f) << 8), 1086);
  assert.equal(1 + (master[22] >> 6) + (master[23] << 2) + ((master[24] & 0x0f) << 10), 1448);
  const branches = [
    ['d11_private_conversation', './assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png'],
    ['d11_accept_for_now', './assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png'],
    ['d11_redirect_publicly', './assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png']
  ];
  for (const [credit, companionSrc] of branches) {
    const runtimeScene = { ...CH05_SCENE_04, ...CH05_SCENE_04.branches[credit] };
    assert.equal(runtimeScene.eliza.src, CH05_SCENE_04.eliza.src);
    assert.equal(runtimeScene.supporting.length, 1);
    assert.equal(runtimeScene.supporting[0].src, companionSrc);
    assert.equal(fs.statSync(path.join(root, companionSrc.slice(2))).size > 0, true);
  }
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  assert.match(css, /\.ch05-side-room \.art-eliza img, \.ch05-side-room \.supporting-character\s*\{[^}]*object-fit:\s*contain/);
  assert.match(css, /\.ch05-side-room \.art-eliza img\s*\{\s*left:\s*25%/);
  assert.match(css, /\.ch05-side-room \.supporting-character\s*\{\s*left:\s*75%/);
  assert.match(css, /\.ch05-side-room \.art-background img\s*\{\s*object-position:\s*82% center/);
  assert.match(app, /baseScene\.id === 'ch05_s04'[\s\S]*?\.\.\.baseScene\.branches\[state\.credit_response\]/);
  const imagePath = path.join(root, CH05_SCENE_04.background.src.slice(2));
  const image = fs.readFileSync(imagePath);
  assert.equal(image.toString('ascii', 0, 4), 'RIFF');
  assert.equal(image.toString('ascii', 8, 12), 'WEBP');
  assert.equal(image.toString('ascii', 12, 16), 'VP8L');
  const width = 1 + image[21] + ((image[22] & 0x3f) << 8);
  const height = 1 + ((image[24] & 0x0f) << 10) + (image[23] << 2) + ((image[22] & 0xc0) << 6);
  assert.deepEqual([width, height], [1672, 941]);
  assert.equal(width / height, 1672 / 941);
  assert.deepEqual(CH05_SCENE_04.voice, []);
  assert.equal(Object.hasOwn(CH05_SCENE_04, 'audioPending'), false);
  assert.equal(ambienceForScene('ch05_s04'), 'ch05_side_room');
  assert.equal(ambienceForScene('ch05_s01'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s02'), 'ch05_exhibition_hall');
  assert.equal(ambienceForScene('ch05_s03'), 'ch05_exhibition_hall');
  assert.match(app, /scene\.eliza\?\.src \? `<div class="art-layer art-eliza">/);
  assert.match(app, /\[CH05_SCENE_04\.id\]: CH05_SCENE_04/);
  assert.match(app, /hashScene === 'ch05_s04' && !state\.applied_events\.includes\('ch05_s03_complete'\)/);
  assert.equal(getSceneAdvanceBlock(setScene(createInitialState(), 'ch05_s04'), CH05_SCENE_04), 'Complete Chapter V Scene 03 before opening What Happens to Me Now?');
});

test('AM49 maps all ten approved clips to exact SCRIPT dialogue in isolated branch order', () => {
  const expected = {
    d11_private_conversation: [
      ['You wanted to speak privately.', './assets/audio/characters/pickering/pickering_ch05_scene04_pickering_001.mp3', 'foRUcXu2Pow0Di90CnMW', '3QqV3bDmMDnb0QVvVHVi'],
      ["Yes. I know what I can do now. I don't know what happens to me next.", './assets/audio/characters/eliza/eliza_ch05_scene04_pickering_001.mp3', '6KyoTbyyWfFmCSMWgAaZ', 'pBkXHZHfDiXuws8DFSsq'],
      ['That should not be decided without you. I have sometimes spoken about your work instead of asking what you wanted.', './assets/audio/characters/pickering/pickering_ch05_scene04_001.mp3', 'DpagLQ84tlf8c5SEUdlU', 'AZAODqekAGLZnzAo00H6'],
      ['I need to decide what I want to ask.', './assets/audio/characters/eliza/eliza_ch05_scene04_001.mp3', 'XrIS9FoGBavEkKbA0LeZ', 'hMWBLNdwhiofcyIRV1If'],
      ['There are several possibilities. Some will depend on money and introductions.', './assets/audio/characters/pickering/pickering_ch05_scene04_lc14_001.mp3', 'ENtLCogsmkzhoNv0oiZU', 'V15G15pgNM09YoHcRmey']
    ],
    d11_accept_for_now: [
      ["You've gone quiet.", './assets/audio/characters/mrs-pearce/mrs-pearce_ch05_scene04_001.mp3', 'CHRaX2IjO77856ZOTw20', 'vPMhgp2ef3J0J8l2IHuN'],
      ['I am thinking about tomorrow.', './assets/audio/characters/eliza/eliza_ch05_scene04_002.mp3', 'ttlurPbdJhRieRfMK1sB', 'lDyUARm5j8jxH57EV8xi'],
      ['Then tomorrow is worth planning. Start with what you want, not with what they expect.', './assets/audio/characters/mrs-pearce/mrs-pearce_ch05_scene04_002.mp3', 'tLifN1JsPDXJRTT6YStj', 'FUmAu3ajCx3xoS8ptd7d'],
      ['I need a little time to put it in order.', './assets/audio/characters/eliza/eliza_ch05_scene04_mrs-pearce_ordering_001.mp3', 'rlkxV3kgUSqF6msPDyul', 'BzvUZKI8z0sAiGOgjoff'],
      ["Work is one matter. Where you'll live is another.", './assets/audio/characters/mrs-pearce/mrs-pearce_ch05_scene04_lc14_001.mp3', '17a2SZKSGR5kFeaoIOdV', 'ZOwuQXjV9qSze912vZKN']
    ]
  };
  const runtimeFiles = [];
  for (const [credit, lines] of Object.entries(expected)) {
    const branch = CH05_SCENE_04.branches[credit];
    assert.equal(branch.voice.length, 5);
    assert.equal(branch.voice.every(({ inline }) => inline), true);
    assert.equal(branch.voice.every(({ transcriptVerified, humanApproved }) => transcriptVerified === 'PASS' && humanApproved === true), true);
    assert.deepEqual(branch.voice.map(({ transcript, src, generationId, assetId }) => [transcript, src, generationId, assetId]), lines);
    assert.deepEqual(branch.storyBeats.filter(({ type }) => type === 'dialogue').map(({ text }) => text), lines.map(([text]) => text));
    if (credit === 'd11_accept_for_now') {
      assert.ok(branch.storyBeats.findIndex(({ text }) => text === 'I need a little time to put it in order.') > branch.storyBeats.findIndex(({ text }) => text === 'Then tomorrow is worth planning. Start with what you want, not with what they expect.'));
      assert.ok(branch.storyBeats.findIndex(({ text }) => text === 'I need a little time to put it in order.') < branch.storyBeats.findIndex(({ text }) => text === "Work is one matter. Where you'll live is another."));
    }
    for (const voice of branch.voice) {
      const absolute = path.join(root, voice.src.slice(2));
      assert.ok(fs.statSync(absolute).size > 0, `${voice.src} exists and is non-empty`);
      runtimeFiles.push(absolute);
      const duration = mp3Mpeg1Layer3Duration(fs.readFileSync(absolute));
      assert.ok(duration > 0.5 && duration < 10, `${voice.transcript} has plausible duration ${duration}`);
    }
  }
  assert.equal(new Set(runtimeFiles).size, 10);
  assert.equal(CH05_SCENE_04.branches.d11_redirect_publicly, CH05_SCENE_04.branches.d11_accept_for_now);
  assert.equal(CH05_SCENE_04.branches.d11_private_conversation.voice.some(({ src }) => src.includes('/mrs-pearce/')), false);
  assert.equal(CH05_SCENE_04.branches.d11_accept_for_now.voice.some(({ src }) => src.includes('/pickering/')), false);
  assert.equal(CH05_SCENE_04.branches.d11_private_conversation.voice.some(({ transcript }) => transcript === 'I am thinking about tomorrow.' || transcript === 'I need a little time to put it in order.'), false);
  assert.equal(CH05_SCENE_04.branches.d11_accept_for_now.voice.some(({ transcript }) => transcript === 'I need to decide what I want to ask.' || transcript.includes('I know what I can do now')), false);
  assert.match(app, /voice\.inline && voice\.transcript === beat\.text/);
  assert.match(app, /scene\.voice\.filter\(\(voice\) => voice\.inline && voice\.transcript === beat\.text\)\.map\(\(voice\) => renderAudioControl\(voice\)\)/);
  const ambience = path.join(root, AMBIENCE_FILES.ch05_side_room.slice(2));
  const ambienceBytes = fs.readFileSync(ambience);
  assert.ok(ambienceBytes.length > 0, 'AM50 exists');
  assert.ok(Math.abs(mp3Mpeg1Layer3Duration(ambienceBytes) - 24) < 0.1);
});

test('S04 replay controls stay user-triggered, accessible, and use the existing foreground AudioManager', () => {
  assert.match(app, /function renderAudioControl\(item, kind = 'voice'\)/);
  assert.match(app, /type="button" data-action="\$\{action\}"/);
  assert.match(app, /aria-label="\$\{escapeHtml\(item\.ariaLabel \|\| item\.label \|\| 'Replay audio'\)\}"/);
  assert.match(app, /audioManager\.playVoice\(target\.dataset\.src/);
  assert.doesNotMatch(app, /renderCh05S04\([\s\S]{0,900}?audioManager\.playVoice/);
});

test('companion and LC14 context derive from all D11 values without a companion mirror', () => {
  const cases = [
    ['d11_private_conversation', 'Pickering', 'lc14_pickering_question_fit', 'lc14_pickering_clarify_introductions'],
    ['d11_accept_for_now', 'Mrs Pearce', 'lc14_mrs_pearce_question_fit', 'lc14_pearce_prioritise'],
    ['d11_redirect_publicly', 'Mrs Pearce', 'lc14_mrs_pearce_question_fit', 'lc14_pearce_prioritise']
  ];
  for (const [credit, companion, item, answer] of cases) {
    const initial = enterS04(credit);
    const branch = credit === 'd11_private_conversation' ? CH05_SCENE_04.branches.d11_private_conversation : CH05_SCENE_04.branches.d11_accept_for_now;
    assert.equal(branch.companion, companion);
    assert.equal(branch.itemId, item);
    assert.equal(branch.answer, answer);
    assert.equal(Object.hasOwn(initial, 's04_companion'), false);
    assert.equal(recordLc14Answer(initial, item, answer).challenges.lc14.completed, true);
  }
});

test('future question style accepts and persists each canonical personal value once', () => {
  for (const value of ['direct', 'indirect', 'plan_focused']) {
    const initial = enterS04('d11_private_conversation');
    const selected = applyDecision(initial, 'FUTURE_QUESTION_STYLE', value);
    assert.equal(selected.future_question_style, value);
    assert.equal(selected.applied_events.filter((event) => event === 'ch05_future_question_style_recorded').length, 1);
    assert.equal(applyDecision(selected, 'FUTURE_QUESTION_STYLE', 'direct'), selected);
    const storage = { value: '', setItem(_key, value) { this.value = value; }, getItem() { return this.value; } };
    saveState(selected, storage);
    assert.equal(loadState(storage).future_question_style, value);
  }
});

test('LC14 support and retry persist without rewards; Continue completes once only after style and LC14', () => {
  const item = 'lc14_pickering_question_fit';
  let state = enterS04('d11_private_conversation');
  state = markLc14SupportUsed(state, item);
  assert.deepEqual(state.challenges.lc14.supportItems, [item]);
  state = recordLc14Answer(state, item, 'lc14_pickering_ask_programme');
  assert.equal(state.challenges.lc14.answers[item].correct, false);
  state = recordLc14Answer(state, item, 'lc14_pickering_clarify_introductions');
  assert.equal(state.challenges.lc14.completed, true);
  assert.equal(state.confidence, 0); assert.equal(state.pronunciation, 0); assert.equal(state.independence, 0);
  assert.match(getSceneAdvanceBlock(state, CH05_SCENE_04), /Choose how Eliza/);
  state = applyDecision(state, 'FUTURE_QUESTION_STYLE', 'indirect');
  assert.equal(getSceneAdvanceBlock(state, CH05_SCENE_04), '');
  state = completeScene(state, CH05_SCENE_04);
  assert.equal(state.applied_events.filter((event) => event === 'ch05_s04_complete').length, 1);
  assert.equal(completeScene(state, CH05_SCENE_04), state);
  assert.equal(state.confidence, 0); assert.equal(state.pronunciation, 0); assert.equal(state.independence, 0);
});

test('Teacher preview is read-only and S05 is the next implemented Chapter V scene', () => {
  const teacher = CH05_S04_TEACHER_SECTIONS.flat().join(' ');
  assert.match(teacher, /read-only/i);
  assert.match(teacher, /direct, indirect or plan-focused/i);
  assert.match(app, /scene\?\.id === 'ch05_s04' \? CH05_S04_TEACHER_SECTIONS/);
  assert.match(app, /Teacher preview · read-only\. No LC14, future question style or progression changes\./);
  assert.equal(CH05_SCENE_04.nextScene, CH05_SCENE_05.id);
  assert.match(app, /Leaving the Hall is complete and your progress is saved locally\./);
  assert.match(app, /scene\.id === 'ch05_s04'[\s\S]*?data-action="next-scene"/);
});
