import { CH03_SCENE_01, CH03_SCENE_02, CH03_SCENE_03, CH03_SCENE_04, CH03_SCENE_05, CH03_TEACHER_SECTIONS, CH03_S02_TEACHER_SECTIONS, CH03_S03_TEACHER_SECTIONS, CH03_S04_TEACHER_SECTIONS, CH03_S05_TEACHER_SECTIONS, chapterThreeCallback } from './ch03-content.js';
import {
  SCENES,
  SCENE_BY_ID,
  LISTENING,
  TEACHER_SECTIONS,
  ambienceForScene,
  isContinuousAmbienceTransition
} from './content.js';
import { CH02_SCENE_01, CH02_SCENE_02, CH02_SCENE_03, CH02_TEACHER_SECTIONS, CH02_SCENE_02_TEACHER_SECTIONS, CH02_SCENE_03_TEACHER_SECTIONS, CH02_SCENE_04, CH02_SCENE_04_TEACHER_SECTIONS, CH02_SCENE_05, CH02_SCENE_05_TEACHER_SECTIONS } from './ch02-content.js';
import {
  loadState,
  saveState,
  startChapter,
  resetChapter,
  setScene,
  recordOpeningTone,
  applyDecision,
  recordLc03Answer,
  recordLc04Answer,
  recordLc05Answer,
  recordLc06Attempt,
  recordLc06UnableToHear,
  markLc06SupportUsed,
  recordLc07Answer,
  markLc07SupportUsed,
  recordLc08Answer,
  markLc08SupportUsed,
  recordLc09Answer,
  markLc09SupportUsed,
  completeScene,
  recordS03Response,
  completeS04Terms,
  completeChapterTwo,
  recordChallengeAnswer,
  ensureChallengeOptionOrders,
  ensureChallengePresentationOrder,
  markChallengeEntered,
  markChapterComplete,
  setSoundPreference,
  isChallengeComplete,
  getSceneAdvanceBlock,
  canAdvanceScene
} from './state.js';
import { AudioManager } from './audio.js';

const app = document.querySelector('#app');
const liveRegion = document.querySelector('#live-region');
const teacherDialog = document.querySelector('#teacher-dialog');
const teacherContent = document.querySelector('#teacher-content');
const teacherContext = document.querySelector('#teacher-context');
const RUNTIME_SCENES = { ...SCENE_BY_ID, [CH03_SCENE_01.id]: CH03_SCENE_01, [CH03_SCENE_02.id]: CH03_SCENE_02, [CH03_SCENE_03.id]: CH03_SCENE_03, [CH03_SCENE_04.id]: CH03_SCENE_04, [CH03_SCENE_05.id]: CH03_SCENE_05, [CH02_SCENE_01.id]: CH02_SCENE_01, [CH02_SCENE_02.id]: CH02_SCENE_02, [CH02_SCENE_03.id]: CH02_SCENE_03, [CH02_SCENE_04.id]: CH02_SCENE_04, [CH02_SCENE_05.id]: CH02_SCENE_05 };
let state = loadState();
let lastTeacherTrigger = null;
let previousScene = null;
let lastLc03Answer = null;
let lastS03Response = null;
let s04AudioPreview = false;
let s05Preview = false;
let scenePreview = false;
let lc06Draft = {};
let lc06SupportedOpen = false;
const chapterLabel = (scene) => scene.chapter || (scene.id.startsWith("ch02_") ? "II" : "I");
const studentReadOnly = () => teacherDialog.open || scenePreview;
const LC01_OPTIONS = ['apology', 'excuse', 'intention to repair'];
const AUDIO_UNLOCK_ACTIONS = new Set([
  'open-story', 'enter-ch02', 'next-scene', 'choose-tone', 'choose-decision',
  'answer-lc01', 'answer-lc02', 'answer-lc03', 'answer-lc04',
  'play-voice', 'play-challenge', 'play-sfx', 'toggle-sound'
]);
const audioManager = new AudioManager({
  onStatus: (status) => {
    if (status.type === 'blocked') {
      announce('Sound could not start automatically. The story continues; use the Sound control or a replay button when ready.');
    }
    if (status.type === 'unavailable') announce('This sound is unavailable. You can continue with the visible text.');
  }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function announce(message) {
  liveRegion.textContent = '';
  window.setTimeout(() => { liveRegion.textContent = message; }, 20);
}

function focusLc06Next() {
  const nextControl = document.querySelector('[data-action="select-lc06"]:not(:disabled)')
    || document.querySelector('[data-action="submit-lc06"]:not(:disabled)')
    || document.querySelector('[data-action="next-scene"]')
    || document.querySelector('[data-action="review-scene"]');
  nextControl?.focus();
}

function currentScene() {
  return RUNTIME_SCENES[state.scene] || SCENES[0];
}

function updateHeader() {
  const soundButton = document.querySelector('[data-action="toggle-sound"]');
  if (soundButton) {
    soundButton.textContent = `Sound: ${state.soundEnabled ? 'on' : 'off'}`;
    soundButton.setAttribute('aria-pressed', String(state.soundEnabled));
    soundButton.setAttribute('aria-label', state.soundEnabled ? 'Turn sound off' : 'Turn sound on');
  }
}

function save() {
  saveState(state);
  updateHeader();
}

function setLocation(sceneId = null, replace = false) {
  const url = sceneId ? `#${sceneId}` : window.location.pathname;
  const method = replace ? 'replaceState' : 'pushState';
  window.history[method]({ scene: sceneId }, '', url);
}

function renderCover() {
  app.innerHTML = `
    <main class="cover-page" aria-labelledby="cover-title">
      <div class="cover-art" aria-hidden="true">
        <div class="cover-glow"></div>
        <div class="cover-flowers">✦<span>❈</span>✧</div>
        <p class="cover-chapter">Chapter I</p>
        <p class="cover-name">The Flower Girl</p>
      </div>
      <section class="cover-copy">
        <p class="eyebrow">An interactive illustrated storybook</p>
        <h1 id="cover-title">Pygmalion</h1>
        <p class="cover-subtitle">A story about language, opportunity, and choosing your own voice.</p>
        <p class="cover-description">Rain gathers over Covent Garden. Eliza has flowers to sell, questions to ask, and a future she intends to choose for herself.</p>
        <button class="primary-button open-book" type="button" data-action="open-story">${state.started ? 'CONTINUE THE BOOK' : 'OPEN THE BOOK'}</button>
        ${state.started ? '<button class="text-button" type="button" data-action="restart-chapter">Start Chapter I again</button>' : ''}
        <p class="sound-note"><span aria-hidden="true">◌</span> Sound is optional. Your first click may unlock the rain ambience.</p>
      </section>
    </main>`;
  updateHeader();
}

function renderAudioControl(item, kind = 'voice') {
  const action = kind === 'voice' ? 'play-voice' : 'play-challenge';
  const transcript = kind === 'voice' ? `<details open class="transcript"><summary>Transcript</summary><p>${escapeHtml(item.transcript)}</p></details>` : '';
  return `<div class="audio-cue ${kind}-cue">
    <button class="audio-button" type="button" data-action="${action}" data-src="${escapeHtml(item.src)}" ${kind === 'challenge' && item.id ? `data-sample="${escapeHtml(item.id)}"` : ''} aria-label="${escapeHtml(item.ariaLabel || item.label || 'Replay audio')}"><span aria-hidden="true">▶</span> ${escapeHtml(item.label || 'Replay audio')}</button>
    ${transcript}
  </div>`;
}

function renderSfxControl(item) {
  return `<div class="audio-cue sfx-cue"><button class="audio-button" type="button" data-action="play-sfx" data-src="${escapeHtml(item.src)}" aria-label="${escapeHtml(item.label)}"><span aria-hidden="true">▶</span> Replay the fallen flowers sound</button><span class="sfx-note">SFX · one short basket-and-flowers sound</span></div>`;
}

function renderArt(scene) {
  const support = scene.supporting.map((asset) => `<img class="supporting-character${asset.placement ? ` support-${escapeHtml(asset.placement)}` : ''}" src="${asset.src}" alt="${escapeHtml(asset.alt)}" loading="lazy">`).join('');
  const props = scene.props.map((asset) => `<img class="scene-prop" src="${asset.src}" alt="${escapeHtml(asset.alt)}" loading="lazy">`).join('');
  const plate = scene.plate.src === scene.background.src ? '' : `<div class="art-plate"><img src="${scene.plate.src}" alt="${escapeHtml(scene.plate.alt)}" loading="lazy"></div>`;
  return `<figure class="storybook-art ${scene.id === 'ch02_s01' ? 'ch02-exterior' : ''} ${scene.composition || ''}">
    <div class="art-background"><img src="${scene.background.src}" alt="${escapeHtml(scene.background.alt)}"></div>
    ${plate}
    <div class="art-layer art-support">${support}</div>
    <div class="art-layer art-eliza"><img src="${scene.eliza.src}" alt="${escapeHtml(scene.eliza.alt)}" loading="lazy"></div>
    <div class="art-layer art-props">${props}</div>
    <figcaption>Chapter ${chapterLabel(scene)} · ${escapeHtml(scene.title)}</figcaption>
  </figure>`;
}

function renderDialogue(scene) {
  return scene.dialogue.map(([speaker, text], index) => `<div class="dialogue-line ${speaker.toLowerCase().replace(/[^a-z]+/g, '-')}" data-line="${index}"><span class="speaker">${escapeHtml(speaker)}</span><p>${escapeHtml(text)}</p></div>`).join('');
}

function renderStoryBeats(scene) {
  return `<div class="story-beats" aria-label="Story narration and dialogue">${scene.storyBeats.map((beat, index) => beat.type === 'narration' || beat.type === 'callback'
    ? `<p class="narrative-beat">${escapeHtml(beat.type === 'callback' ? chapterThreeCallback(state.request_strategy) : beat.text)}</p>`
    : `<div class="dialogue-line ${beat.speaker.toLowerCase().replace(/[^a-z]+/g, '-')}" data-line="${index}"><span class="speaker">${escapeHtml(beat.speaker)}</span>${scene.voice.some((voice) => voice.inline && voice.transcript === beat.text) ? `<div><p>${escapeHtml(beat.text)}</p>${scene.voice.filter((voice) => voice.inline && voice.transcript === beat.text).map((voice) => renderAudioControl(voice)).join('')}</div>` : `<p>${escapeHtml(beat.text)}</p>`}</div>`).join('')}</div>`;
}

function renderOpeningTone(scene) {
  const selected = state.opening_tone;
  return `<section class="choice-block local-choice" aria-labelledby="opening-tone-title">
    <p class="eyebrow">A small first response</p>
    <h2 id="opening-tone-title">A customer looks away. What does Eliza say?</h2>
    <div class="choice-grid">${scene.openingTones.map((item) => `<button class="choice-button ${selected === item.id ? 'selected' : ''}" type="button" data-action="choose-tone" data-tone="${item.id}" ${selected ? 'disabled' : ''}><strong>${escapeHtml(item.title)}</strong><span>“${escapeHtml(item.text)}”</span></button>`).join('')}</div>
    ${selected ? `<p class="choice-feedback">Eliza keeps control of her pitch. The moment changes its tone, not her worth.</p><button class="secondary-button next-button" type="button" data-action="next-scene">Continue to the fallen flowers <span aria-hidden="true">→</span></button>` : ''}
  </section>`;
}

function renderDecision(scene) {
  const decision = scene.decision;
  if (!decision) return '';
  const selected = state.decisions[decision.id];
  return `<section class="choice-block" aria-labelledby="${decision.id}-title">
    <p class="eyebrow">A choice in the story</p>
    <h2 id="${decision.id}-title">${escapeHtml(decision.prompt)}</h2>
    <div class="choice-grid">${decision.choices.map((item) => `<button class="choice-button ${selected === item.id ? 'selected' : ''}" type="button" data-action="choose-decision" data-decision="${decision.id}" data-option="${item.id}" ${selected || scenePreview || (decision.id === 'D05' && s05Preview) ? 'disabled' : ''}><strong>${escapeHtml(item.title)}</strong><span>“${escapeHtml(item.text)}”</span></button>`).join('')}</div>
    ${decision.id === 'D05' ? '<p class="read-only-note">Each motivation is legitimate. This choice names Eliza’s purpose; it is not a test.</p>' : ''}
    ${decision.id === 'D06' ? '<p class="read-only-note">Each practice preference is legitimate. There is no correct answer.</p>' : ''}
    ${decision.id === 'D04' ? '<p class="read-only-note">No option is correct, best, or more intelligent. Each is a legitimate communication strategy.</p>' : ''}
    ${selected ? `<div class="choice-feedback"><strong>Your choice stays with the scene.</strong><p>${scene.consequenceBeats ? renderStoryBeats({ ...scene, storyBeats: scene.consequenceBeats[selected] }) : escapeHtml(scene.consequence?.[selected] || 'Eliza moves forward on her own terms.')}</p></div>` : ''}
  </section>`;
}

function renderLc01(scene) {
  const challenge = state.challenges.lc01;
  const optionOrder = challenge.optionOrders.shared || LC01_OPTIONS;
  return `<section class="challenge-block" aria-labelledby="lc01-title">
    <div class="challenge-heading"><div><p class="eyebrow">Listening challenge</p><h2 id="lc01-title">${escapeHtml(scene.challenge.title)}</h2></div><span class="challenge-badge">Listen · replay · decide</span></div>
    <p>${escapeHtml(scene.challenge.intro)}</p>
    <div class="sample-list">${LISTENING.lc01.map((sample, index) => {
      const result = challenge.answers[sample.id];
      return `<article class="sample-card ${result?.correct ? 'correct' : ''}" aria-labelledby="lc01-sample-${index}">
        <div class="sample-top"><h3 id="lc01-sample-${index}">Sample ${index + 1}</h3>${renderAudioControl({ ...sample, label: `Replay sample ${index + 1}` }, 'challenge')}</div>
        <p class="sample-transcript">“${escapeHtml(sample.transcript)}”</p>
        <p class="sample-prompt">What is the speaker’s main intention?</p>
        <div class="answer-row">${optionOrder.map((option) => `<button class="answer-button ${result?.answer === option ? 'selected' : ''}" type="button" data-action="answer-lc01" data-sample="${sample.id}" data-answer="${option}">${escapeHtml(option)}</button>`).join('')}</div>
        ${result ? `<p class="answer-feedback ${result.correct ? 'success' : 'retry'}">${result.correct ? 'Good. You heard the purpose of the line.' : 'Listen again: responsibility, explanation, or a promised action?'}</p>` : ''}
      </article>`;
    }).join('')}</div>
    ${challenge.completed ? `<p class="challenge-complete">LC01 complete. Replay remains available and does not change your story state.</p>${canAdvanceScene(state, scene) ? '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue to the notebook <span aria-hidden="true">→</span></button>' : ''}` : ''}
  </section>`;
}

function renderLc02(scene) {
  const challenge = state.challenges.lc02;
  return `<section class="challenge-block" aria-labelledby="lc02-title">
    <div class="challenge-heading"><div><p class="eyebrow">Listening challenge</p><h2 id="lc02-title">${escapeHtml(scene.challenge.title)}</h2></div><span class="challenge-badge">Context · relationship · purpose</span></div>
    <p>${escapeHtml(scene.challenge.intro)}</p>
    <div class="sample-list">${LISTENING.lc02.map((sample, index) => {
      const result = challenge.answers[sample.id];
      return `<article class="sample-card ${result?.correct ? 'correct' : ''}" aria-labelledby="lc02-sample-${index}">
        <div class="sample-top"><h3 id="lc02-sample-${index}">Sample ${index + 1}</h3>${renderAudioControl({ ...sample, label: `Replay sample ${index + 1}` }, 'challenge')}</div>
        <p class="sample-transcript">“${escapeHtml(sample.transcript)}”</p>
        <div class="answer-stack">${(challenge.optionOrders[sample.id] || sample.options.map(([id]) => id)).map((id) => {
          const [, label] = sample.options.find(([optionId]) => optionId === id) || [];
          return `<button class="answer-button ${result?.answer === id ? 'selected' : ''}" type="button" data-action="answer-lc02" data-sample="${sample.id}" data-answer="${id}">${escapeHtml(label || id)}</button>`;
        }).join('')}</div>
        ${result ? `<p class="answer-feedback ${result.correct ? 'success' : 'retry'}">${result.correct ? 'Good. You used context, relationship, and intention.' : 'Listen again and look for the action, relationship, and setting.'}</p>` : ''}
      </article>`;
    }).join('')}</div>
    ${challenge.completed ? `<p class="challenge-complete">Higgins’ Ear complete. The challenge stores context, not a judgement about the speaker.</p>${canAdvanceScene(state, scene) ? '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue to the flower-shop window <span aria-hidden="true">→</span></button>' : ''}` : ''}
  </section>`;
}

function renderLc03(scene) {
  const completed = state.ch02_lc03_completed;
  return `<section class="challenge-block" aria-labelledby="lc03-title">
    <div class="challenge-heading"><div><p class="eyebrow">Reading challenge</p><h2 id="lc03-title">${escapeHtml(scene.challenge.title)}</h2></div><span class="challenge-badge">Read · notice · decide</span></div>
    <p>${escapeHtml(scene.challenge.prompt)}</p>
    <div class="answer-stack">${scene.challenge.options.map((option) => `<button class="answer-button" type="button" data-action="answer-lc03" data-answer="${option.id}" ${completed ? 'disabled' : ''}>“${escapeHtml(option.text)}”</button>`).join('')}</div>
    ${completed ? '<p class="answer-feedback success">The request keeps its purpose and adds a clear polite form.</p><p class="challenge-complete">LC03 complete. Reviewing this scene does not change your choices or development signals.</p><button class="text-button" type="button" data-action="review-scene">Review this scene</button><button class="secondary-button next-button" type="button" data-action="next-scene">Continue to the terms on the table <span aria-hidden="true">→</span></button>' : lastLc03Answer ? '<p class="answer-feedback retry" role="status">The purpose of the request needs to stay clear. Try another form.</p>' : ''}
  </section>`;
}

function renderSampleChallenge(scene) {
  if (scene.challenge.kind === 'articulation') {
    const challenge = state.challenges.lc05;
    return `<section class="challenge-block" aria-labelledby="lc05-title">
      <p class="eyebrow">Listening / articulation awareness · LC05</p><h2 id="lc05-title">${escapeHtml(scene.challenge.title)}</h2>
      <p>${escapeHtml(scene.challenge.intro)}</p><p class="read-only-note">Audio is not yet available. Open the transcripts to practise without sound.</p>
      <div class="sample-list">${scene.challenge.samples.map((sample) => {
        const result = challenge.answers[sample.id];
        return `<article class="sample-card ${result?.correct ? 'correct' : ''}"><h3>${escapeHtml(sample.title)}</h3>
          ${sample.transcript ? `<details class="transcript"><summary>Open transcript: ${escapeHtml(sample.title)}</summary><p>${escapeHtml(sample.transcript)}</p></details>` : `<p>${escapeHtml(sample.prompt)}</p>`}
          <div class="answer-stack">${(challenge.optionOrders[sample.id] || sample.options.map(({ id }) => id)).map((id) => {
            const option = sample.options.find((item) => item.id === id);
            return `<button class="answer-button ${result?.answer === id ? 'selected' : ''}" type="button" data-action="answer-lc05" data-sample="${sample.id}" data-answer="${id}" ${studentReadOnly() || result?.correct || challenge.completed ? 'disabled' : ''}>${escapeHtml(option.label)}</button>`;
          }).join('')}</div>${result ? `<p class="answer-feedback ${result.correct ? 'success' : 'retry'}" role="status">${escapeHtml(result.correct ? sample.success : sample.retry)}</p>` : ''}</article>`;
      }).join('')}</div>
      ${challenge.completed ? `<p class="challenge-complete">LC05 complete. Review does not change your progress.</p>${renderStoryBeats({ ...scene, storyBeats: scene.reflection })}<p class="transition-line">${escapeHtml(scene.transition)}</p>${state.ch03_s01_complete ? '<p class="end-note">S01 complete and saved. The next scene is not yet available. Review this scene.</p><button class="text-button" type="button" data-action="review-scene">Review this scene</button>' : `<button class="secondary-button next-button" type="button" data-action="next-scene" ${studentReadOnly() ? 'disabled' : ''}>Continue</button>`}` : ''}
    </section>`;
  }
  const challenge = state.challenges.lc04;
  const samples = Object.fromEntries(scene.challenge.samples.map((sample) => [sample.id, sample]));
  const sampleOrder = state.lc04_presentation_order || scene.challenge.samples.map(({ id }) => id);
  const optionOrder = challenge.optionOrders.shared || scene.challenge.options.map(({ id }) => id);
  return `<section class="challenge-block" aria-labelledby="lc04-title">
    <div class="challenge-heading"><div><p class="eyebrow">Listening challenge · LC04</p><h2 id="lc04-title">${escapeHtml(scene.challenge.title)}</h2></div><span class="challenge-badge">Listen · replay · decide</span></div>
    <p>${escapeHtml(scene.challenge.intro)}</p>
    <p>${escapeHtml(scene.challenge.prompt)}</p>
    <p class="read-only-note">Replay is optional. The visible transcripts let you complete this challenge without sound.</p>
    <div class="sample-list">${sampleOrder.map((sampleId, index) => {
      const sample = samples[sampleId];
      const result = challenge.answers[sampleId];
      return `<article class="sample-card ${result?.correct ? 'correct' : ''}" aria-labelledby="lc04-sample-${index}">
        <div class="sample-top"><h3 id="lc04-sample-${index}">Sample ${index + 1}</h3>${sample.src ? renderAudioControl({ ...sample, label: `Replay sample ${index + 1}`, ariaLabel: `Replay sample ${index + 1}: ${sample.speaker}` }, 'challenge') : ''}</div>
        <p class="sample-transcript"><span class="visually-hidden">Transcript: </span>“${escapeHtml(sample.transcript)}”</p>
        <div class="answer-row">${optionOrder.map((id) => {
          const option = scene.challenge.options.find((item) => item.id === id);
          return `<button class="answer-button ${result?.answer === id ? 'selected' : ''}" type="button" data-action="answer-lc04" data-sample="${sampleId}" data-answer="${id}" ${result?.correct ? 'disabled' : ''}>${escapeHtml(option.label)}</button>`;
        }).join('')}</div>
        ${result && !result.correct ? `<p class="answer-feedback retry" role="status">${escapeHtml(scene.challenge.retry)}</p>` : ''}
        ${result?.correct ? '<p class="answer-feedback success">Response recorded.</p>' : ''}
      </article>`;
    }).join('')}</div>
    ${state.ch02_lc04_completed ? `<p class="answer-feedback success">${escapeHtml(scene.challenge.success)}</p><p class="challenge-complete">LC04 complete. Review and refresh do not change your progress or development signals.</p><button class="text-button" type="button" data-action="review-scene">Review this scene</button>` : ''}
  </section>`;
}

function renderLc06(scene) {
  const challenge = state.challenges.lc06;
  const firstAttempt = challenge.firstAttempt;
  const complete = challenge.completed;
  const samples = scene.challenge.samples;
  const renderOptions = (sample, kind, options, saved) => {
    const draft = lc06Draft[sample.id]?.[kind];
    const selected = saved?.correct ? saved.answer : draft;
    return `<fieldset class="lc06-answer-group" aria-labelledby="${sample.id}-${kind}-label"><legend id="${sample.id}-${kind}-label">${kind === 'word' ? 'What word did you hear?' : 'What does the customer mean?'}</legend><div class="answer-stack">${options.map(({ id, label }) => `<label class="answer-button ${selected === id ? 'selected' : ''}"><input type="radio" name="${sample.id}-${kind}" value="${id}" data-action="select-lc06" data-sample="${sample.id}" data-kind="${kind}" data-answer="${id}" ${selected === id ? 'checked' : ''} ${studentReadOnly() || complete || saved?.correct || (!sample.src && !lc06SupportedOpen) ? 'disabled' : ''}><span>${escapeHtml(label)}</span></label>`).join('')}</div>${saved ? `<p class="answer-feedback ${saved.correct ? 'success' : 'retry'}" role="status">${saved.correct ? (kind === 'word' ? 'Yes. That is the word in the recording.' : 'Yes. That meaning matches the word you heard.') : (kind === 'word' ? 'Listen again. Compare the sound at the beginning of the word.' : 'Think about the number of flowers and whether the customer wants to pay.')}</p>` : ''}</fieldset>`;
  };
  const items = samples.map((sample, index) => {
    const result = challenge.answers[sample.id] || {};
    const draft = lc06Draft[sample.id] || {};
    const transcript = lc06SupportedOpen || complete;
    const canSubmit = (result.word?.correct || draft.word) && (result.meaning?.correct || draft.meaning) && !(result.word?.correct && result.meaning?.correct);
    return `<article class="lc06-sample-card" aria-labelledby="${sample.id}-title"><div class="lc06-sample-heading"><h3 id="${sample.id}-title">Recording ${index + 1}</h3></div>${renderAudioControl({ ...sample, label: `Replay recording ${index + 1}`, ariaLabel: `Replay recording ${index + 1}` }, 'challenge')}${renderOptions(sample, 'word', scene.challenge.wordOptions, result.word)}${renderOptions(sample, 'meaning', scene.challenge.meaningOptions, result.meaning)}${!complete ? `<button class="secondary-button" type="button" data-action="submit-lc06" data-sample="${sample.id}" ${studentReadOnly() || !canSubmit ? 'disabled' : ''}>Submit this recording</button>` : ''}${result.word || result.meaning ? `<p class="lc06-item-status" role="status">${result.word?.correct && result.meaning?.correct ? 'Both answers are correct. This recording is complete.' : 'Keep the correct answer and retry the unresolved answer.'}</p>` : ''}${transcript ? `<p class="lc06-transcript"><strong>Spoken text:</strong> “${escapeHtml(sample.transcript)}”</p>` : ''}</article>`;
  }).join('');
  const support = firstAttempt && !lc06SupportedOpen && !complete
    ? `<button class="text-button" type="button" data-action="open-lc06-support">Open supported practice</button>`
    : '';
  const unable = !firstAttempt && !complete
    ? '<button class="text-button" type="button" data-action="lc06-cannot-hear">I cannot hear this recording</button>'
    : '';
  const supportNote = lc06SupportedOpen
    ? `<p class="lc06-support-note" role="status">Text support is open. Practice can continue; the unaided pronunciation reward is no longer available for this challenge.</p>`
    : '';
  const completion = complete
    ? `<p class="challenge-complete" role="status">LC06 complete. ${challenge.supportUsed ? 'Supported practice completed this challenge.' : 'Unaided completion earned one pronunciation signal.'} Review does not change saved progress.</p>${renderStoryBeats({ ...scene, storyBeats: scene.reflection })}<p class="transition-line">${escapeHtml(scene.transition)}</p>${state.applied_events.includes('ch03_s02_complete') ? '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue to Finding the Main Stress</button>' : `<button class="secondary-button next-button" type="button" data-action="next-scene">Continue</button>`}`
    : '';
  return `<section class="challenge-block lc06-block" aria-labelledby="lc06-title"><p class="eyebrow">Unaided listening · LC06</p><h2 id="lc06-title">${escapeHtml(scene.challenge.title)}</h2><p>${escapeHtml(scene.challenge.intro)}</p><p class="lc06-attempt-note">${firstAttempt ? 'Your first attempt is recorded. Supported practice is available if useful.' : 'First attempt: UNAIDED LISTENING. Text support becomes available after this attempt.'}</p><p class="read-only-note">Listen before opening text support. If a recording cannot be played, you can record an unresolved first attempt; no guess is required.</p><div class="lc06-samples">${items}</div>${unable}${support}${supportNote}${completion}</section>`;
}

function renderLc07(scene) {
  const challenge = state.challenges.lc07;
  const completed = challenge.completed;
  const supportAvailable = !completed && challenge.firstAttempt && Object.values(challenge.answers).some(({ correct }) => !correct);
  const cards = scene.challenge.samples.map((sample, index) => {
    const saved = challenge.answers[sample.id];
    return `<article class="lc07-sample" aria-labelledby="${sample.id}-title">
      <h3 id="${sample.id}-title">Word ${index + 1}: <span class="lc07-word">${escapeHtml(sample.word)}</span></h3>
      ${renderAudioControl({ ...sample, label: `Replay recording ${index + 1}`, ariaLabel: `Replay recording ${index + 1}` }, 'challenge')}
      <div class="lc07-syllables" role="group" aria-label="Choose the main-stressed syllable in ${escapeHtml(sample.word)}">
        ${sample.syllables.map((syllable, syllableIndex) => {
          const answer = sample.options[syllableIndex];
          const selected = saved?.answer === answer;
          const supportAnswer = challenge.supportUsed && answer === sample.answer;
          return `<button class="lc07-syllable${selected ? ' selected' : ''}${supportAnswer ? ' revealed' : ''}" type="button" data-action="answer-lc07" data-sample="${sample.id}" data-answer="${answer}" aria-label="Syllable ${syllableIndex + 1}: ${escapeHtml(syllable)}" aria-pressed="${selected}" ${studentReadOnly() || completed || saved?.correct ? 'disabled' : ''}>${escapeHtml(syllable)}</button>`;
        }).join('<span class="lc07-divider" aria-hidden="true">|</span>')}
      </div>
      ${saved ? `<p class="lc07-feedback ${saved.correct ? 'success' : 'retry'}" role="status">${saved.correct ? 'That is right. This syllable carries the main stress.' : 'Try again. Listen for the syllable that sounds strongest.'}</p>` : ''}
    </article>`;
  }).join('');
  const support = supportAvailable && !challenge.supportUsed
    ? '<button class="text-button" type="button" data-action="open-lc07-support">Open Supported Practice</button>' : '';
  const supportNote = challenge.supportUsed
    ? `<div class="lc07-support-note" role="status"><p>Supported Practice is open. You can complete the challenge without a penalty; it no longer earns a pronunciation reward.</p><p>${escapeHtml(scene.challenge.samples.map((sample) => `${sample.word}: ${sample.syllables.map((syllable, index) => index === sample.syllables.findIndex((_, i) => sample.options[i] === sample.answer) ? syllable.toUpperCase() : syllable).join('-')}`).join(' · '))}</p><p>${escapeHtml('Listen for the syllable that sounds strongest.')}</p></div>` : '';
  const completion = completed
    ? `<p class="challenge-complete" role="status">LC07 complete. ${challenge.supportUsed ? 'Supported practice completed this challenge.' : 'Unaided completion earned one pronunciation signal.'} Review and replay do not change your saved progress.</p>${renderStoryBeats({ ...scene, storyBeats: scene.reflection })}<p class="transition-line">${escapeHtml(scene.transition)}</p>${state.applied_events.includes('ch03_s03_complete') ? '<p class="end-note">S03 is complete. The sentence lesson is not available in this runtime yet; this scene remains available for review.</p><button class="text-button" type="button" data-action="review-scene">Review this scene</button>' : '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue</button>'}` : '';
  return `<section class="challenge-block lc07-block" aria-labelledby="lc07-title"><p class="eyebrow">Word stress · LC07</p><h2 id="lc07-title">${escapeHtml(scene.challenge.title)}</h2><p>${escapeHtml(scene.challenge.intro)}</p><p class="lc07-audio-note">The spoken words are shown in text as well. Replay does not change your answers or progress.</p><p class="lc07-attempt-note">${challenge.firstAttempt ? 'Your first attempt is recorded. Keep working with any syllables that are not correct.' : 'Choose the syllable you think carries the main stress in each word.'}</p><div class="lc07-samples">${cards}</div>${support}${supportNote}${completion}</section>`;
}

function renderLc08(scene) {
  const challenge = state.challenges.lc08;
  const completed = challenge.completed;
  const supportAvailable = !completed && challenge.firstAttempt && Object.values(challenge.answers).some(({ correct }) => !correct);
  const cards = scene.challenge.samples.map((sample, index) => {
    const saved = challenge.answers[sample.id];
    const words = sample.sentence.match(/[A-Za-z]+|[^A-Za-z]+/g) || [];
    let wordIndex = 0;
    return `<article class="lc08-sample" aria-labelledby="${sample.id}-title">
      <div class="lc08-sample-heading"><h3 id="${sample.id}-title">Sentence ${index + 1}</h3>${renderAudioControl({ ...sample, label: `Replay sentence ${index + 1}`, ariaLabel: `Replay sentence ${index + 1}` }, 'challenge')}</div>
      <p class="lc08-sentence" aria-label="Choose a word to bring forward in: ${escapeHtml(sample.sentence)}">${words.map((part) => {
        if (!/^[A-Za-z]+$/.test(part)) return escapeHtml(part);
        const focusIndex = wordIndex++;
        const answer = sample.options[focusIndex];
        const selected = saved?.answer === answer;
        const revealed = challenge.supportUsed && answer === sample.answer;
        return `<button class="lc08-word${selected ? ' selected' : ''}${revealed ? ' revealed' : ''}" type="button" data-action="answer-lc08" data-sample="${sample.id}" data-answer="${answer}" aria-pressed="${selected}" ${studentReadOnly() || completed || saved?.correct ? 'disabled' : ''}>${escapeHtml(part)}</button>`;
      }).join('')}</p>
      ${saved ? `<p class="lc08-feedback ${saved.correct ? 'success' : 'retry'}" role="status">${saved.correct ? 'That is right. This word can carry the focus in this sentence.' : 'Try again. Which word would carry the strongest part of the message?'}</p>` : ''}
    </article>`;
  }).join('');
  const support = supportAvailable && !challenge.supportUsed
    ? '<button class="text-button" type="button" data-action="open-lc08-support">Open Supported Practice</button>' : '';
  const supportNote = challenge.supportUsed
    ? `<div class="lc08-support-note" role="status"><p>Supported Practice is open. You can finish without a penalty; this completion will not earn the pronunciation reward.</p><p>${escapeHtml(scene.challenge.samples.map(({ sentence, focusWord }) => `${sentence} — ${focusWord}`).join(' · '))}</p><p>Listen for the word that carries the strongest part of the message.</p></div>` : '';
  const completion = completed
    ? `<p class="challenge-complete" role="status">LC08 complete. ${challenge.supportUsed ? 'Supported completion has no reward or penalty.' : 'Unaided completion earned one pronunciation signal.'}</p>${renderStoryBeats({ ...scene, storyBeats: scene.reflection })}<p class="transition-line">${escapeHtml(scene.transition)}</p>${state.applied_events.includes('ch03_s04_complete') ? '<p class="end-note">S04 is complete. The next scene is not available in this runtime yet; this scene remains available for review.</p><button class="text-button" type="button" data-action="review-scene">Review this scene</button>' : '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue <span aria-hidden="true">→</span></button>'}` : '';
  return `<section class="challenge-block lc08-block" aria-labelledby="lc08-title"><p class="eyebrow">Sentence stress · LC08</p><h2 id="lc08-title">${escapeHtml(scene.challenge.title)}</h2><p>${escapeHtml(scene.challenge.intro)}</p><p class="lc08-audio-note">The sentence stays visible while you listen. Replay is unlimited and does not change your answers or progress. If a recording is unavailable, continue with the visible text and Supported Practice.</p><p class="lc08-attempt-note">${challenge.firstAttempt ? 'Your first attempt is recorded. Keep working with any words that are not correct.' : 'Choose the word you think carries the strongest part of each sentence.'}</p><div class="lc08-samples">${cards}</div>${support}${supportNote}${completion}</section>`;
}

function renderLc09(scene) {
  const challenge = state.challenges.lc09;
  const supportAvailable = !challenge.completed && challenge.firstAttempt && Object.values(challenge.answers).some(({ correct }) => !correct);
  const samples = scene.challenge.samples.map((sample, index) => {
    const saved = challenge.answers[sample.id];
    const supportOpen = challenge.supportSamples.includes(sample.id);
    const splitPoints = sample.options.map((pointId, pointIndex) => {
      const disabled = studentReadOnly() || challenge.completed || saved?.correct;
      return `<button class="lc09-split-point" type="button" data-action="answer-lc09" data-sample="${sample.id}" data-answer="${pointId}" aria-label="Choose a pause after ${escapeHtml(sample.afterLabels[pointIndex])}" ${disabled ? 'disabled' : ''}>${pointIndex + 1}</button>`;
    }).join('');
    const feedback = saved && !saved.correct ? `<p class="lc09-feedback retry" role="status">${escapeHtml(scene.challenge.incorrectFeedback)}</p>` : saved?.correct ? '<p class="lc09-feedback success" role="status">That pause works. Continue with the next sentence.</p>' : '';
    const support = supportAvailable && saved && !saved.correct && !supportOpen
      ? `<p class="lc09-support-prompt">${escapeHtml(scene.challenge.supportedPracticePrompt)}</p><p class="lc09-audio-note">No recording is available in this version. Read the sentence and notice where it can breathe.</p><button class="text-button" type="button" data-action="open-lc09-support" data-sample="${sample.id}">Open Supported Practice</button>` : '';
    const revealed = supportOpen
      ? `<div class="lc09-support-note" role="status"><p>${escapeHtml(scene.challenge.supportExplanation)}</p><p class="lc09-revealed-split">${escapeHtml(sample.key)}</p></div>` : '';
    return `<article class="lc09-sample" aria-labelledby="${sample.id}-title"><h3 id="${sample.id}-title">Sentence ${index + 1}</h3><p class="lc09-sentence">${escapeHtml(sample.sentence)}</p><div class="lc09-split-points" role="group" aria-label="Possible pause positions in sentence order">${splitPoints}</div>${feedback}${support}${revealed}</article>`;
  }).join('');
  const completion = challenge.completed
    ? `<p class="challenge-complete" role="status">LC09 complete. ${challenge.supportUsed ? 'Supported completion has no reward or penalty.' : 'Unaided completion earned Pronunciation +1.'}</p>${renderStoryBeats({ ...scene, storyBeats: scene.reflection })}${state.applied_events.includes('ch03_s05_complete') ? '<p class="end-note">The next scene, A Small Victory, is not available in this runtime yet. This scene remains available for review.</p><button class="text-button" type="button" data-action="review-scene">Review this scene</button>' : '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue <span aria-hidden="true">→</span></button>'}` : '';
  return `<section class="challenge-block lc09-block" aria-labelledby="lc09-title"><p class="eyebrow">Pace and repair · LC09</p><h2 id="lc09-title">${escapeHtml(scene.challenge.title)}</h2><p>${escapeHtml(scene.challenge.intro)}</p><p class="lc09-audio-note">This is a text-based pause and chunking activity. No recording is available in this version.</p><div class="lc09-samples">${samples}</div>${completion}</section>`;
}

function renderEnd(scene) {
  const selected = state.decisions.D03;
  if (!selected) return '';
  return `<section class="chapter-end" aria-labelledby="chapter-end-title">
    <p class="eyebrow">Chapter I complete</p>
    <h2 id="chapter-end-title">The door is still ahead. This time, Eliza chooses where to knock.</h2>
    ${scene.chapterEnd.map((line) => `<p class="end-line">${escapeHtml(line)}</p>`).join('')}
    <p class="end-note">Your Chapter I progress is saved locally. The first Chapter II scene is now ready to read.</p>
    <button class="secondary-button" type="button" data-action="enter-ch02">Continue to Chapter II <span aria-hidden="true">→</span></button>
    <button class="secondary-button" type="button" data-action="restart-chapter">Start Chapter I again</button>
  </section>`;
}

function renderScene(scene) {
  const chapterTwo = scene.id.startsWith('ch02_');
  const decisionSelected = scene.decision ? Boolean(state.decisions[scene.decision.id]) : true;
  const challengeComplete = scene.id === 'ch02_s01' ? state.ch02_lc03_completed : scene.id === 'ch02_s02' ? state.ch02_lc04_completed : scene.challenge ? isChallengeComplete(state, scene.challenge.id) : true;
  const sceneIndex = scene.number;
  const voiceMarkup = scene.voice.filter((item) => !item.inline).map((item) => renderAudioControl(item)).join('');
  const sfxMarkup = scene.sfx ? renderSfxControl(scene.sfx) : '';
  let body = '';
  if (scene.id === 'ch01_s01') body += renderOpeningTone(scene);
  body += renderDecision(scene);
  if (scene.id === 'ch02_s01' && decisionSelected) body += renderLc03(scene);
  if (scene.id === 'ch03_s01') {
    body = `<section class="learning-reference" aria-label="Mouth-position reference"><h2>A sound and a movement</h2><p>${escapeHtml(scene.explanation)}</p></section>` + body;
    if (scenePreview) body = '<p class="read-only-note" role="status">Teacher preview · read-only</p><button class="secondary-button" type="button" data-action="return-student">Return to student scene</button>' + body;
    if (decisionSelected) body += renderSampleChallenge(scene);
  }
  if (scene.id === 'ch03_s02') {
    if (scenePreview) body = '<p class="read-only-note" role="status">Teacher preview · read-only</p><button class="secondary-button" type="button" data-action="return-student">Return to student scene</button>';
    body += renderLc06(scene);
  }
  if (scene.id === 'ch03_s03') {
    if (scenePreview) body = '<p class="read-only-note" role="status">Teacher preview · read-only</p><button class="secondary-button" type="button" data-action="return-student">Return to student scene</button>';
    body += renderLc07(scene);
  }
  if (scene.id === 'ch03_s04') {
    if (scenePreview) body = '<p class="read-only-note" role="status">Teacher preview · read-only</p><button class="secondary-button" type="button" data-action="return-student">Return to student scene</button>';
    if (state.decisions.D07) body += renderStoryBeats({ ...scene, storyBeats: scene.preChallengeBeats });
    body += renderLc08(scene);
  }
  if (scene.id === 'ch03_s05') {
    if (scenePreview) body = '<p class="read-only-note" role="status">Teacher preview · read-only</p><button class="secondary-button" type="button" data-action="return-student">Return to student scene</button>';
    body += renderLc09(scene);
  }
  if (scene.id === 'ch01_s02') body += renderLc01(scene);
  if (scene.id === 'ch01_s04') body += renderLc02(scene);
  if (scene.id === 'ch01_s05') body += renderEnd(scene);
  if (scene.response) {
    body += `<section class="scene-response" aria-labelledby="response-title"><h2 id="response-title">A practical question</h2><p>${escapeHtml(scene.response.prompt)}</p><div class="answer-stack">${scene.response.choices.map((option) => `<button class="answer-button" type="button" data-action="respond-s03" data-option="${option.id}"><strong>${escapeHtml(option.title)}</strong><br>“${escapeHtml(option.text)}”</button>`).join('')}</div>${lastS03Response ? `<p class="answer-feedback" role="status">${escapeHtml(scene.response.consequences[lastS03Response])}</p>` : ''}</section>`;
  }
  if (scene.id === 'ch02_s03') body += '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue to the agreement <span aria-hidden="true">→</span></button>';
  if (scene.id === 'ch02_s05' && state.confirmed_motivation) body += `<section class="chapter-end" aria-labelledby="ch02-end-title"><h2 id="ch02-end-title">Chapter II complete</h2>${renderStoryBeats({ ...scene, storyBeats: scene.ending })}<p class="end-note">Your Chapter II progress is saved locally.</p><button class="text-button" type="button" data-action="review-scene">Review this scene</button><button class="secondary-button" type="button" data-action="enter-ch03">Continue to Chapter III</button></section>`;
  if (scene.terms) body += `<section class="terms-card" aria-labelledby="terms-title"><h2 id="terms-title">The lesson agreement</h2><ul>${scene.terms.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul></section><p class="transition-line">${escapeHtml(scene.transition)}</p>${state.lesson_terms_understood ? '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue to Why I Am Here <span aria-hidden="true">→</span></button>' : '<button class="secondary-button next-button" type="button" data-action="complete-s04">Continue <span aria-hidden="true">→</span></button>'}`;
  if (!chapterTwo && scene.id !== 'ch01_s05' && !scene.challenge && decisionSelected && challengeComplete && scene.id !== 'ch01_s01') {
    body += `<button class="secondary-button next-button" type="button" data-action="next-scene">Continue the story <span aria-hidden="true">→</span></button>`;
  }
  if (scene.id === 'ch01_s03' && decisionSelected) body += `<p class="read-only-note">The exchange is saved as a story detail. Replaying it will not apply the response again.</p>`;
  const transitionMarkup = scene.transition && scene.id !== 'ch03_s01' && scene.id !== 'ch03_s02' && scene.id !== 'ch03_s04' && scene.id !== 'ch03_s05' && !scene.terms && scene.id !== 'ch01_s05' && (!chapterTwo || challengeComplete)
    ? `<p class="transition-line">${escapeHtml(scene.transition)}</p>` : '';

  return `<main class="story-page ${chapterTwo ? 'ch02-story' : ''}" id="story-root" tabindex="-1" aria-labelledby="scene-title">
    <div class="story-progress"><span>Chapter ${scene.chapter ? `${scene.chapter} · ${scene.chapterTitle}` : chapterTwo ? 'II · The Bargain' : 'I · The Flower Girl'}</span><span>Scene ${sceneIndex} of ${scene.sceneCount || 5}</span></div>
    <div class="storybook-spread ${scene.composition ? `${scene.composition}-spread` : ''}">
      ${renderArt(scene)}
      <article class="story-copy">
        <p class="eyebrow">${escapeHtml(scene.kicker)}</p>
        <h1 id="scene-title">${escapeHtml(scene.title)}</h1>
        ${scene.storyBeats ? renderStoryBeats(scene) : `<div class="narrative">${scene.narration.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div><div class="dialogue-block" aria-label="Story dialogue">${renderDialogue(scene)}</div>`}
        ${voiceMarkup ? `<div class="story-voices" aria-label="${scene.id === 'ch03_s03' ? 'Story voice' : 'Optional story voice'}">${voiceMarkup}</div>` : ''}
        ${scene.id === 'ch02_s01' ? '<p class="read-only-note">Story audio for this scene is not yet available. All dialogue and the reading challenge work without sound.</p>' : ''}
        ${scene.id === 'ch02_s02' ? '<p class="read-only-note">Optional story voice supports the visible text. The story is complete without sound.</p>' : ''}
        ${sfxMarkup ? `<div class="story-voices" aria-label="Optional sound effect">${sfxMarkup}</div>` : ''}
        ${body}
        ${scene.id !== 'ch02_s02' ? transitionMarkup : ''}
      </article>
      ${scene.id === 'ch02_s02' ? `<div class="ch02-study-activity">${renderSampleChallenge(scene)}${transitionMarkup}${challengeComplete ? '<button class="secondary-button next-button" type="button" data-action="next-scene">Continue to Mrs Pearce’s questions <span aria-hidden="true">→</span></button>' : ''}</div>` : ''}
    </div>
  </main>`;
}

function render() {
  let hashScene = window.location.hash.replace(/^#/, '');
  if (hashScene === CH03_SCENE_02.id && !state.ch03_s01_complete) {
    setLocation(CH03_SCENE_01.id, true);
    hashScene = CH03_SCENE_01.id;
  }
  if (hashScene === CH03_SCENE_03.id && !state.applied_events.includes('ch03_s02_complete')) {
    const safeScene = state.ch03_s01_complete ? CH03_SCENE_02.id : CH03_SCENE_01.id;
    setLocation(safeScene, true);
    hashScene = safeScene;
  }
  if (hashScene === CH03_SCENE_04.id && !state.applied_events.includes('ch03_s03_complete')) {
    const safeScene = state.applied_events.includes('ch03_s02_complete') ? CH03_SCENE_03.id : state.ch03_s01_complete ? CH03_SCENE_02.id : CH03_SCENE_01.id;
    setLocation(safeScene, true);
    hashScene = safeScene;
  }
  if (hashScene === CH03_SCENE_05.id && !state.applied_events.includes('ch03_s04_complete')) {
    const safeScene = state.applied_events.includes('ch03_s03_complete') ? CH03_SCENE_04.id : state.applied_events.includes('ch03_s02_complete') ? CH03_SCENE_03.id : state.ch03_s01_complete ? CH03_SCENE_02.id : CH03_SCENE_01.id;
    setLocation(safeScene, true);
    hashScene = safeScene;
  }
  if (hashScene.startsWith('ch03_') && !RUNTIME_SCENES[hashScene]) {
    const safeScene = state.applied_events.includes('ch03_s03_complete') ? CH03_SCENE_04.id : state.applied_events.includes('ch03_s02_complete') ? CH03_SCENE_03.id : state.ch03_s01_complete ? CH03_SCENE_02.id : CH03_SCENE_01.id;
    setLocation(safeScene, true);
    hashScene = safeScene;
  }
  if (hashScene && RUNTIME_SCENES[hashScene] && !state.started) {
    state = startChapter(state);
    state = setScene(state, hashScene);
    save();
  }
  if (!hashScene && (!state.started || window.history.state?.scene === null)) {
    s04AudioPreview = false;
    scenePreview = false;
    if (!state.started && window.history.state?.scene !== null) setLocation(null, true);
    audioManager.leaveScene();
    renderCover();
  }
  else {
    const scene = RUNTIME_SCENES[hashScene] || currentScene();
    if (previousScene !== scene.id && scene.id === 'ch03_s02') audioManager.leaveScene();
    if (previousScene !== scene.id) { lastS03Response = null; s04AudioPreview = false; s05Preview = false; scenePreview = false; }
    if (state.scene !== scene.id) {
      state = setScene(state, scene.id);
      save();
    }
    if (scene.id === 'ch01_s02') {
      const nextState = ensureChallengeOptionOrders(state, 'LC01', [{ key: 'shared', optionIds: LC01_OPTIONS }]);
      if (nextState !== state) { state = nextState; save(); }
    }
    if (scene.id === 'ch01_s04') {
      const nextState = ensureChallengeOptionOrders(state, 'LC02', LISTENING.lc02.map((sample) => ({
        key: sample.id,
        optionIds: sample.options.map(([id]) => id)
      })));
      if (nextState !== state) { state = nextState; save(); }
    }
    if (scene.id === 'ch02_s02') {
      let nextState = ensureChallengePresentationOrder(state, 'LC04', scene.challenge.samples.map(({ id }) => id));
      nextState = ensureChallengeOptionOrders(nextState, 'LC04', [{ key: 'shared', optionIds: scene.challenge.options.map(({ id }) => id) }]);
      if (nextState !== state) { state = nextState; save(); }
    }
    app.innerHTML = renderScene(scene);
    updateHeader();
    document.querySelector('#story-root')?.focus({ preventScroll: true });
    const currentSceneId = scene.id;
    audioManager.setSceneAudioReadOnly(scene.id === 'ch02_s04' && (s04AudioPreview || teacherDialog.open));
    audioManager.setEnabled(state.soundEnabled);
    audioManager.ensureAmbience(currentSceneId, scene.contextual || null);
    previousScene = currentSceneId;
  }
}

function moveNext() {
  const scene = currentScene();
  if (scene.id.startsWith('ch03_') && studentReadOnly()) return;
  const advanceBlock = getSceneAdvanceBlock(state, scene);
  if (advanceBlock) return announce(advanceBlock);
  if (scene.id === 'ch03_s01') {
    const next = completeScene(state, scene);
    if (next !== state) { state = next; save(); }
    audioManager.leaveScene();
    state = setScene(state, CH03_SCENE_02.id); save(); setLocation(CH03_SCENE_02.id); render(); announce('S01 complete and saved. Chapter III, The Listening Room.'); return;
  }
  if (scene.id === 'ch03_s02') {
    const next = completeScene(state, scene);
    if (next !== state) { state = next; save(); }
    lc06Draft = {};
    audioManager.leaveScene();
    state = setScene(state, CH03_SCENE_03.id); save(); setLocation(CH03_SCENE_03.id); render(); announce('S02 complete and saved. Chapter III, Finding the Main Stress.'); return;
  }
  if (scene.id === 'ch03_s03') {
    const next = completeScene(state, scene);
    if (next !== state) { state = next; save(); }
    state = setScene(state, CH03_SCENE_04.id); save(); setLocation(CH03_SCENE_04.id); render();
    announce('S03 complete and saved. Chapter III, A Sentence Has Shape.'); return;
  }
  if (scene.id === 'ch03_s04') {
    const next = completeScene(state, scene);
    if (next !== state) { state = next; save(); }
    state = setScene(state, CH03_SCENE_05.id); save(); setLocation(CH03_SCENE_05.id); render(); announce('S04 complete and saved. Chapter III, The Bad Day.'); return;
  }
  if (scene.id === 'ch03_s05') {
    const next = completeScene(state, scene);
    if (next !== state) { state = next; save(); }
    render(); announce('S05 complete and saved. A Small Victory is not available in this runtime yet; this scene remains available for review.'); return;
  }
  if (scene.id === 'ch03_s04') {
    const next = completeScene(state, scene);
    if (next === state) return announce(advanceBlock);
    state = next; save(); render();
    announce('S04 complete and saved. The next scene is not available yet; this scene remains available for review.');
    document.querySelector('[data-action="review-scene"]')?.focus(); return;
  }
  if (scene.id.startsWith('ch03_')) return announce('The next scene is not available in this runtime checkpoint.');
  if (scene.id === 'ch02_s01') {
    state = setScene(state, CH02_SCENE_02.id);
    save(); setLocation(CH02_SCENE_02.id); render(); announce('Chapter II, Terms on the Table.');
    return;
  }
  if (scene.id === 'ch02_s02') {
    state = setScene(state, CH02_SCENE_03.id);
    save(); setLocation(CH02_SCENE_03.id); render(); announce('Chapter II, Mrs Pearce’s Questions.');
    return;
  }
  if (scene.id === 'ch02_s03') {
    state = setScene(state, CH02_SCENE_04.id);
    save(); setLocation(CH02_SCENE_04.id); render(); announce('Chapter II, The Price of a Lesson.');
    return;
  }
  if (scene.id === 'ch02_s04') {
    if (teacherDialog.open || s04AudioPreview) return;
    state = completeS04Terms(state);
    state = setScene(state, CH02_SCENE_05.id);
    save(); setLocation(CH02_SCENE_05.id); render(); announce('Chapter II, Why I Am Here.');
    return;
  }
  if (scene.id === 'ch02_s05') return announce('Chapter II is complete. Review this scene; your progress is saved.');
  if (scene.id.startsWith('ch02_')) return announce('The next scene is not playable yet. Your progress is saved.');
  const next = SCENES[scene.number];
  if (!next) {
    state = markChapterComplete(state);
    save();
    render();
    announce('Chapter I complete.');
    return;
  }
  state = setScene(state, next.id);
  save();
  setLocation(next.id);
  render();
  if (scene.id === 'ch01_s01' && next.id === 'ch01_s02' && next.sfx) {
    audioManager.playOneShot(next.sfx.id, next.sfx.src);
  }
}

function openStory() {
  state = startChapter(state);
  save();
  const sceneId = state.scene || 'ch01_s01';
  setLocation(sceneId);
  render();
  announce(`Chapter ${chapterLabel(RUNTIME_SCENES[sceneId])}, ${RUNTIME_SCENES[sceneId].title}.`);
}

// Shared Teacher content formatting for prose, lists and canonical item tables.
function renderTeacherText(content) {
  return content.split(/\n\n+/).map((block) => {
    const lines = block.split('\n');
    if (lines.every((line) => line.startsWith('|'))) {
      const rows = lines.filter((line) => !/^\|[-| ]+\|$/.test(line)).map((line) => line.slice(1, -1).split('|').map((cell) => cell.trim()));
      return `<div class="teacher-table"><table><thead><tr>${rows[0].map((cell) => `<th scope="col">${escapeHtml(cell)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    }
    if (lines.every((line) => line.startsWith('- '))) return `<ul>${lines.map((line) => `<li>${escapeHtml(line.slice(2))}</li>`).join('')}</ul>`;
    return `<p>${escapeHtml(block)}</p>`;
  }).join('');
}

function openTeacher(trigger) {
  if (currentScene().id.startsWith('ch03_')) audioManager.stopForeground();
  if (currentScene().id === 'ch02_s04') audioManager.setSceneAudioReadOnly(true);
  lastTeacherTrigger = trigger;
  const scene = document.querySelector('#story-root') ? currentScene() : null;
  const chapterTwo = scene?.id?.startsWith('ch02_');
  teacherContext.textContent = scene ? `Chapter ${chapterLabel(scene)} · ${scene.title}${scene.challenge ? ` · ${scene.id === 'ch03_s02' ? `${scene.challenge.id} · ` : ''}${scene.challenge.title}` : ''}${scene.id.startsWith('ch03_') ? ` · previewMode=${scenePreview}` : ''}` : 'Chapter I · Cover';
  const sections = scene?.id === 'ch03_s05' ? CH03_S05_TEACHER_SECTIONS : scene?.id === 'ch03_s04' ? CH03_S04_TEACHER_SECTIONS : scene?.id === 'ch03_s03' ? CH03_S03_TEACHER_SECTIONS : scene?.id === 'ch03_s02' ? CH03_S02_TEACHER_SECTIONS : scene?.id === 'ch03_s01' ? CH03_TEACHER_SECTIONS : scene?.id === 'ch02_s05' ? CH02_SCENE_05_TEACHER_SECTIONS : scene?.id === 'ch02_s04' ? CH02_SCENE_04_TEACHER_SECTIONS : scene?.id === 'ch02_s03' ? CH02_SCENE_03_TEACHER_SECTIONS : scene?.id === 'ch02_s02' ? CH02_SCENE_02_TEACHER_SECTIONS : chapterTwo ? CH02_TEACHER_SECTIONS : TEACHER_SECTIONS;
  teacherContent.innerHTML = `${sections.map(([heading, content]) => `<section class="teacher-section"><h3>${escapeHtml(heading)}</h3>${renderTeacherText(content)}</section>`).join('')}
    ${scene ? `<button class="secondary-button teacher-preview" type="button" data-action="teacher-preview">Open / replay this scene (read-only preview)</button>` : ''}`;
  if (typeof teacherDialog.showModal === 'function') teacherDialog.showModal();
  else teacherDialog.setAttribute('open', '');
  teacherDialog.querySelector('[data-action="close-teacher"]')?.focus();
}

function closeTeacher() {
  if (teacherDialog.open) teacherDialog.close();
  else teacherDialog.removeAttribute('open');
  lastTeacherTrigger?.focus();
  audioManager.setSceneAudioReadOnly(currentScene().id === 'ch02_s04' && s04AudioPreview);
}

function unlockS04Ambience(event) {
  if (!event.isTrusted || currentScene().id !== 'ch02_s04' || !document.querySelector('#story-root') || teacherDialog.open || s04AudioPreview) return;
  const action = event.target.closest?.('[data-action]')?.dataset.action;
  if (['open-teacher', 'close-teacher', 'teacher-preview', 'toggle-sound', 'go-cover'].includes(action)) return;
  if (event.type === 'keydown' && ['Shift', 'Control', 'Alt', 'Meta', 'Escape'].includes(event.key)) return;
  audioManager.unlock();
  audioManager.ensureAmbience('ch02_s04', CH02_SCENE_04.contextual);
}
document.addEventListener('pointerdown', unlockS04Ambience);
document.addEventListener('keydown', unlockS04Ambience);

document.addEventListener('click', async (event) => {
  unlockS04Ambience(event);
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
  if (currentScene().id.startsWith('ch03_') && studentReadOnly() &&
      ['toggle-sound', 'open-story', 'next-scene', 'choose-tone', 'choose-decision', 'answer-lc01', 'answer-lc02', 'answer-lc03', 'answer-lc04', 'answer-lc05', 'select-lc06', 'submit-lc06', 'open-lc06-support', 'lc06-cannot-hear', 'answer-lc07', 'open-lc07-support', 'answer-lc08', 'open-lc08-support', 'respond-s03', 'complete-s04', 'enter-ch02', 'enter-ch03', 'restart-chapter'].includes(action)) {
    announce('Teacher preview is read-only. Return to the student scene to change progress or preferences.'); return;
  }
  const audioGesture = event.isTrusted && AUDIO_UNLOCK_ACTIONS.has(action);
  if (audioGesture) audioManager.unlock();
  if (action === 'toggle-sound') {
    state = setSoundPreference(state, !state.soundEnabled);
    save();
    audioManager.setEnabled(state.soundEnabled);
    announce(state.soundEnabled ? 'Sound on.' : 'Sound off. The story remains complete without sound.');
  }
  if (action === 'open-story') openStory();
  if (action === 'enter-ch02') {
    state = setScene(state, CH02_SCENE_01.id);
    save(); setLocation(CH02_SCENE_01.id); render(); announce('Chapter II, The Door She Chooses.');
  }
  if (action === 'enter-ch03' && currentScene().id === 'ch02_s05' && state.ch02_complete && !teacherDialog.open && !s05Preview) {
    state = setScene(state, CH03_SCENE_01.id); save(); setLocation(CH03_SCENE_01.id); render(); announce('Chapter III, The Mouth Is a Muscle.');
  }
  if (action === 'go-cover') { event.preventDefault(); setLocation(null); render(); }
  if (action === 'open-teacher') openTeacher(target);
  if (action === 'close-teacher') closeTeacher();
  if (action === 'next-scene') moveNext();
  if (action === 'complete-s04' && currentScene().id === 'ch02_s04' && !teacherDialog.open && !s04AudioPreview) {
    moveNext();
  }
  if (action === 'respond-s03' && currentScene().id === 'ch02_s03' && CH02_SCENE_03.response.choices.some(({ id }) => id === target.dataset.option)) {
    const nextState = recordS03Response(state, target.dataset.option);
    if (nextState !== state) { state = nextState; save(); }
    lastS03Response = target.dataset.option;
    render(); announce(CH02_SCENE_03.response.consequences[lastS03Response]);
  }
  if (action === 'choose-tone') {
    state = recordOpeningTone(state, target.dataset.tone);
    save(); render(); announce('Opening tone saved for this scene.');
  }
  if (action === 'choose-decision') {
    if (target.dataset.decision === 'D06' && (currentScene().id !== 'ch03_s01' || studentReadOnly())) return;
    if (target.dataset.decision === 'D07' && (currentScene().id !== 'ch03_s04' || studentReadOnly())) return;
    if (target.dataset.decision === 'D05' && (currentScene().id !== 'ch02_s05' || teacherDialog.open || s05Preview)) return;
    const beforeChoice = state;
    state = applyDecision(state, target.dataset.decision, target.dataset.option);
    if (state === beforeChoice) return;
    if (target.dataset.decision === 'D06') state = ensureChallengeOptionOrders(state, 'LC05', CH03_SCENE_01.challenge.samples.map(({ id, options }) => ({ key: id, optionIds: options.map(({ id }) => id) })));
    if (target.dataset.decision === 'D05') state = completeChapterTwo(state);
    if (target.dataset.decision === 'D03') state = markChapterComplete(state);
    save(); render(); announce('Choice saved.');
  }
  if (action === 'answer-lc03') {
    const nextState = recordLc03Answer(state, target.dataset.answer);
    if (nextState !== state) {
      state = nextState;
      lastLc03Answer = state.ch02_lc03_completed ? null : target.dataset.answer;
      save(); render();
      announce(state.ch02_lc03_completed ? 'LC03 complete.' : 'Try another form that keeps the request clear.');
    }
  }
  if (action === 'return-student' && scenePreview) { audioManager.stopForeground(); scenePreview = false; render(); announce('Student scene restored.'); }
  if (action === 'answer-lc05' && currentScene().id === 'ch03_s01' && !studentReadOnly()) {
    const next = recordLc05Answer(state, target.dataset.sample, target.dataset.answer);
    if (next !== state) { state = next; save(); render(); announce(state.ch03_lc05_completed ? 'LC05 complete.' : 'Response recorded. You can retry unresolved items.'); }
  }
  if (action === 'select-lc06' && currentScene().id === 'ch03_s02' && !studentReadOnly()) {
    const { sample, kind, answer } = target.dataset;
    const challenge = state.challenges.lc06;
    const item = CH03_SCENE_02.challenge.samples.find(({ id }) => id === sample);
    const allowed = kind === 'word' ? CH03_SCENE_02.challenge.wordOptions : CH03_SCENE_02.challenge.meaningOptions;
    if (!item || (!item.src && !lc06SupportedOpen) || !allowed.some(({ id }) => id === answer) || challenge.completed || challenge.answers[sample]?.[kind]?.correct) return;
    lc06Draft = { ...lc06Draft, [sample]: { ...lc06Draft[sample], [kind]: answer } };
    render();
      document.querySelector(`[data-action="select-lc06"][data-sample="${sample}"][data-kind="${kind}"][data-answer="${answer}"]`)?.focus();
  }
  if (action === 'submit-lc06' && currentScene().id === 'ch03_s02' && !studentReadOnly()) {
    const sample = CH03_SCENE_02.challenge.samples.find(({ id }) => id === target.dataset.sample);
    const draft = lc06Draft[target.dataset.sample] || {};
    const savedAnswers = state.challenges.lc06.answers[target.dataset.sample] || {};
    const next = sample && (sample.src || lc06SupportedOpen) && recordLc06Attempt(state, sample.id, savedAnswers.word?.correct ? savedAnswers.word.answer : draft.word, savedAnswers.meaning?.correct ? savedAnswers.meaning.answer : draft.meaning);
    if (next && next !== state) {
      state = next; save(); delete lc06Draft[target.dataset.sample]; render(); announce(state.challenges.lc06.completed ? 'LC06 complete.' : 'Response recorded. Correct answers stay in place; retry any unresolved answer.');
      focusLc06Next();
    }
  }
  if (action === 'lc06-cannot-hear' && currentScene().id === 'ch03_s02' && !studentReadOnly()) {
    let next = recordLc06UnableToHear(state);
    if (next !== state) { state = next; next = markLc06SupportUsed(state); if (next !== state) state = next; lc06SupportedOpen = true; save(); render(); announce('No answer was recorded. Supported practice is open; continue when ready.'); focusLc06Next(); }
  }
  if (action === 'open-lc06-support' && currentScene().id === 'ch03_s02' && !studentReadOnly()) {
    const next = markLc06SupportUsed(state);
    if (next !== state) { state = next; save(); }
    lc06SupportedOpen = true; render(); announce('Text support is open. You can continue the challenge without a penalty.'); focusLc06Next();
  }
  if (action === 'answer-lc07' && currentScene().id === 'ch03_s03' && !studentReadOnly()) {
    const next = recordLc07Answer(state, target.dataset.sample, target.dataset.answer);
    if (next !== state) {
      state = next; save(); render();
      announce(state.challenges.lc07.completed ? 'LC07 complete.' : state.challenges.lc07.answers[target.dataset.sample]?.correct ? 'Correct. Continue with the remaining words.' : 'Try again or open Supported Practice.');
      document.querySelector(`[data-action="answer-lc07"][data-sample="${target.dataset.sample}"]:not(:disabled)`)?.focus();
    }
  }
  if (action === 'open-lc07-support' && currentScene().id === 'ch03_s03' && !studentReadOnly()) {
    const next = markLc07SupportUsed(state);
    if (next !== state) { state = next; save(); }
    render(); announce('Supported Practice is open. You can finish without a penalty.');
  }
  if (action === 'answer-lc08' && currentScene().id === 'ch03_s04' && !studentReadOnly()) {
    const next = recordLc08Answer(state, target.dataset.sample, target.dataset.answer);
    if (next !== state) {
      state = next; save(); render();
      announce(state.challenges.lc08.completed ? 'LC08 complete.' : state.challenges.lc08.answers[target.dataset.sample]?.correct ? 'That word carries the focus. Continue with the remaining sentences.' : 'Try again or open Supported Practice.');
      document.querySelector(`[data-action="answer-lc08"][data-sample="${target.dataset.sample}"]:not(:disabled)`)?.focus();
    }
  }
  if (action === 'open-lc08-support' && currentScene().id === 'ch03_s04' && !studentReadOnly()) {
    const next = markLc08SupportUsed(state);
    if (next !== state) { state = next; save(); }
    render(); announce('Supported Practice is open. You can finish without a penalty.');
  }
  if (action === 'answer-lc09' && currentScene().id === 'ch03_s05' && !studentReadOnly()) {
    const { sample, answer } = target.dataset;
    const next = recordLc09Answer(state, sample, answer);
    if (next !== state) {
      state = next; save(); render();
      const savedAnswer = state.challenges.lc09.answers[sample];
      announce(state.challenges.lc09.completed ? 'LC09 complete.' : savedAnswer?.correct ? 'That pause works. Continue with the next sentence.' : CH03_SCENE_05.challenge.incorrectFeedback);
      document.querySelector(`[data-action="answer-lc09"][data-sample="${sample}"]:not(:disabled)`)?.focus();
    }
  }
  if (action === 'open-lc09-support' && currentScene().id === 'ch03_s05' && !studentReadOnly()) {
    const next = markLc09SupportUsed(state, target.dataset.sample);
    if (next !== state) { state = next; save(); render(); }
    document.querySelector(`[data-action="answer-lc09"][data-sample="${target.dataset.sample}"]:not(:disabled)`)?.focus();
    announce('Supported Practice is open. You can complete the challenge without a penalty.');
  }
  if (action === 'answer-lc04') {
    const nextState = recordLc04Answer(state, target.dataset.sample, target.dataset.answer);
    if (nextState !== state) {
      state = nextState;
      save(); render();
      announce(state.ch02_lc04_completed ? 'LC04 complete.' : 'Response recorded. Continue with the remaining samples.');
    }
  }
  if (action === 'review-scene') {
    document.querySelector('#story-root')?.scrollIntoView({ block: 'start' });
    document.querySelector('#story-root')?.focus({ preventScroll: true });
    announce('Read-only scene review. Your choices and progress are unchanged.');
  }
  if (action === 'answer-lc01') {
    const sample = LISTENING.lc01.find((item) => item.id === target.dataset.sample);
    state = recordChallengeAnswer(state, 'LC01', target.dataset.sample, target.dataset.answer, sample.answer);
    save(); render();
  }
  if (action === 'answer-lc02') {
    const sample = LISTENING.lc02.find((item) => item.id === target.dataset.sample);
    state = recordChallengeAnswer(state, 'LC02', target.dataset.sample, target.dataset.answer, sample.answer);
    save(); render();
  }
  if (audioGesture && document.querySelector('#story-root')) {
    const scene = currentScene();
    audioManager.ensureAmbience(scene.id, scene.contextual || null);
  }
  if (action === 'play-voice' && !teacherDialog.open) {
    const voice = currentScene().voice.find(({ src }) => src === target.dataset.src);
    await audioManager.playVoice(target.dataset.src, s04AudioPreview ? null : voice?.afterVoice, voice?.afterCueId);
  }
  if (action === 'play-challenge') await audioManager.playChallenge(target.dataset.src);
  if (action === 'play-sfx') await audioManager.playOneShot('flowers_fall', target.dataset.src);
  if (action === 'teacher-preview') {
    scenePreview = currentScene().id.startsWith('ch03_');
    s05Preview = currentScene().id === 'ch02_s05';
    s04AudioPreview = currentScene().id === 'ch02_s04';
    closeTeacher();
    if (s05Preview || scenePreview) render();
    document.querySelector('#story-root')?.focus();
    announce('Read-only scene preview. Student progress was not changed.');
  }
  if (action === 'restart-chapter') {
    if (window.confirm('Start Chapter I again? This clears the saved Chapter I choices and challenge results.')) {
      state = resetChapter(state);
      save(); setLocation(null); render(); announce('Chapter I progress cleared.');
    }
  }
});

teacherDialog.addEventListener('cancel', (event) => { event.preventDefault(); closeTeacher(); });
window.addEventListener('popstate', () => render());
window.addEventListener('hashchange', () => render());
audioManager.setEnabled(state.soundEnabled);
render();

export { render, moveNext };
