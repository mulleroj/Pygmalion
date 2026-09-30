import {
  SCENES,
  SCENE_BY_ID,
  LISTENING,
  TEACHER_SECTIONS,
  ambienceForScene,
  isContinuousAmbienceTransition
} from './content.js';
import { CH02_SCENE_01, CH02_SCENE_02, CH02_TEACHER_SECTIONS, CH02_SCENE_02_TEACHER_SECTIONS } from './ch02-content.js';
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
const RUNTIME_SCENES = { ...SCENE_BY_ID, [CH02_SCENE_01.id]: CH02_SCENE_01, [CH02_SCENE_02.id]: CH02_SCENE_02 };
let state = loadState();
let lastTeacherTrigger = null;
let previousScene = null;
let lastLc03Answer = null;
const LC01_OPTIONS = ['apology', 'excuse', 'intention to repair'];
const audioManager = new AudioManager({
  onStatus: (status) => {
    if (status.type === 'blocked') {
      announce('Sound could not start automatically. The story continues; use the Sound control or a replay button when ready.');
    }
  }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
}

function announce(message) {
  liveRegion.textContent = '';
  window.setTimeout(() => { liveRegion.textContent = message; }, 20);
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
    <button class="audio-button" type="button" data-action="${action}" data-src="${escapeHtml(item.src)}" aria-label="${escapeHtml(item.label || 'Replay audio')}"><span aria-hidden="true">▶</span> ${escapeHtml(item.label || 'Replay audio')}</button>
    ${transcript}
  </div>`;
}

function renderSfxControl(item) {
  return `<div class="audio-cue sfx-cue"><button class="audio-button" type="button" data-action="play-sfx" data-src="${escapeHtml(item.src)}" aria-label="${escapeHtml(item.label)}"><span aria-hidden="true">▶</span> Replay the fallen flowers sound</button><span class="sfx-note">SFX · one short basket-and-flowers sound</span></div>`;
}

function renderArt(scene) {
  const chapterTwo = scene.id.startsWith('ch02_');
  const support = scene.supporting.map((asset) => `<img class="supporting-character${asset.placement ? ` support-${escapeHtml(asset.placement)}` : ''}" src="${asset.src}" alt="${escapeHtml(asset.alt)}" loading="lazy">`).join('');
  const props = scene.props.map((asset) => `<img class="scene-prop" src="${asset.src}" alt="${escapeHtml(asset.alt)}" loading="lazy">`).join('');
  const plate = scene.plate.src === scene.background.src ? '' : `<div class="art-plate"><img src="${scene.plate.src}" alt="${escapeHtml(scene.plate.alt)}" loading="lazy"></div>`;
  return `<figure class="storybook-art ${scene.id === 'ch02_s01' ? 'ch02-exterior' : ''} ${scene.composition || ''}">
    <div class="art-background"><img src="${scene.background.src}" alt="${escapeHtml(scene.background.alt)}"></div>
    ${plate}
    <div class="art-layer art-support">${support}</div>
    <div class="art-layer art-eliza"><img src="${scene.eliza.src}" alt="${escapeHtml(scene.eliza.alt)}" loading="lazy"></div>
    <div class="art-layer art-props">${props}</div>
    <figcaption>Chapter ${chapterTwo ? 'II' : 'I'} · ${escapeHtml(scene.title)}</figcaption>
  </figure>`;
}

function renderDialogue(scene) {
  return scene.dialogue.map(([speaker, text], index) => `<div class="dialogue-line ${speaker.toLowerCase().replace(/[^a-z]+/g, '-')}" data-line="${index}"><span class="speaker">${escapeHtml(speaker)}</span><p>${escapeHtml(text)}</p></div>`).join('');
}

function renderStoryBeats(scene) {
  return `<div class="story-beats" aria-label="Story narration and dialogue">${scene.storyBeats.map((beat, index) => beat.type === 'narration'
    ? `<p class="narrative-beat">${escapeHtml(beat.text)}</p>`
    : `<div class="dialogue-line ${beat.speaker.toLowerCase().replace(/[^a-z]+/g, '-')}" data-line="${index}"><span class="speaker">${escapeHtml(beat.speaker)}</span><p>${escapeHtml(beat.text)}</p></div>`).join('')}</div>`;
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
    <div class="choice-grid">${decision.choices.map((item) => `<button class="choice-button ${selected === item.id ? 'selected' : ''}" type="button" data-action="choose-decision" data-decision="${decision.id}" data-option="${item.id}" ${selected ? 'disabled' : ''}><strong>${escapeHtml(item.title)}</strong><span>“${escapeHtml(item.text)}”</span></button>`).join('')}</div>
    ${decision.id === 'D04' ? '<p class="read-only-note">No option is correct, best, or more intelligent. Each is a legitimate communication strategy.</p>' : ''}
    ${selected ? `<div class="choice-feedback"><strong>Your choice stays with the scene.</strong><p>${escapeHtml(scene.consequence?.[selected] || 'Eliza moves forward on her own terms.')}</p></div>` : ''}
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

function renderLc04(scene) {
  const challenge = state.challenges.lc04;
  const samples = Object.fromEntries(scene.challenge.samples.map((sample) => [sample.id, sample]));
  const sampleOrder = state.lc04_presentation_order || scene.challenge.samples.map(({ id }) => id);
  const optionOrder = challenge.optionOrders.shared || scene.challenge.options.map(({ id }) => id);
  return `<section class="challenge-block" aria-labelledby="lc04-title">
    <div class="challenge-heading"><div><p class="eyebrow">Listening challenge · LC04</p><h2 id="lc04-title">${escapeHtml(scene.challenge.title)}</h2></div><span class="challenge-badge">Read transcript · decide</span></div>
    <p>${escapeHtml(scene.challenge.intro)}</p>
    <p>${escapeHtml(scene.challenge.prompt)}</p>
    <p class="read-only-note">Audio awaits human approval. The visible transcripts let you complete this challenge without sound.</p>
    <div class="sample-list">${sampleOrder.map((sampleId, index) => {
      const sample = samples[sampleId];
      const result = challenge.answers[sampleId];
      return `<article class="sample-card ${result?.correct ? 'correct' : ''}" aria-labelledby="lc04-sample-${index}">
        <div class="sample-top"><h3 id="lc04-sample-${index}">Sample ${index + 1}</h3>${sample.src ? renderAudioControl({ ...sample, label: `Replay sample ${index + 1}` }, 'challenge') : ''}</div>
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
  const voiceMarkup = scene.voice.map((item) => renderAudioControl(item)).join('');
  const sfxMarkup = scene.sfx ? renderSfxControl(scene.sfx) : '';
  let body = '';
  if (scene.id === 'ch01_s01') body += renderOpeningTone(scene);
  body += renderDecision(scene);
  if (scene.id === 'ch02_s01' && decisionSelected) body += renderLc03(scene);
  if (scene.id === 'ch01_s02') body += renderLc01(scene);
  if (scene.id === 'ch01_s04') body += renderLc02(scene);
  if (scene.id === 'ch01_s05') body += renderEnd(scene);
  if (!chapterTwo && scene.id !== 'ch01_s05' && !scene.challenge && decisionSelected && challengeComplete && scene.id !== 'ch01_s01') {
    body += `<button class="secondary-button next-button" type="button" data-action="next-scene">Continue the story <span aria-hidden="true">→</span></button>`;
  }
  if (scene.id === 'ch01_s03' && decisionSelected) body += `<p class="read-only-note">The exchange is saved as a story detail. Replaying it will not apply the response again.</p>`;
  const transitionMarkup = scene.transition && scene.id !== 'ch01_s05' && (!chapterTwo || challengeComplete)
    ? `<p class="transition-line">${escapeHtml(scene.transition)}</p>` : '';

  return `<main class="story-page ${chapterTwo ? 'ch02-story' : ''}" id="story-root" tabindex="-1" aria-labelledby="scene-title">
    <div class="story-progress"><span>Chapter ${chapterTwo ? 'II · The Bargain' : 'I · The Flower Girl'}</span><span>Scene ${sceneIndex} of 5</span></div>
    <div class="storybook-spread ${scene.composition ? `${scene.composition}-spread` : ''}">
      ${renderArt(scene)}
      <article class="story-copy">
        <p class="eyebrow">${escapeHtml(scene.kicker)}</p>
        <h1 id="scene-title">${escapeHtml(scene.title)}</h1>
        ${chapterTwo ? renderStoryBeats(scene) : `<div class="narrative">${scene.narration.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div><div class="dialogue-block" aria-label="Story dialogue">${renderDialogue(scene)}</div>`}
        ${voiceMarkup ? `<div class="story-voices" aria-label="Optional story voice">${voiceMarkup}</div>` : ''}
        ${scene.id === 'ch02_s01' ? '<p class="read-only-note">Story audio for this scene is not yet available. All dialogue and the reading challenge work without sound.</p>' : ''}
        ${scene.id === 'ch02_s02' ? '<p class="read-only-note">Optional story voice is awaiting human approval. The story is complete in text.</p>' : ''}
        ${sfxMarkup ? `<div class="story-voices" aria-label="Optional sound effect">${sfxMarkup}</div>` : ''}
        ${body}
        ${scene.id !== 'ch02_s02' ? transitionMarkup : ''}
      </article>
      ${scene.id === 'ch02_s02' ? `<div class="ch02-study-activity">${renderLc04(scene)}${transitionMarkup}${challengeComplete ? '<p class="end-note">Mrs Pearce’s questions are next. That Chapter II scene is not playable yet; your progress is saved.</p>' : ''}</div>` : ''}
    </div>
  </main>`;
}

function render() {
  const hashScene = window.location.hash.replace(/^#/, '');
  if (hashScene && RUNTIME_SCENES[hashScene] && !state.started) {
    state = startChapter(state);
    state = setScene(state, hashScene);
    save();
  }
  if (!hashScene && (!state.started || window.history.state?.scene === null)) {
    if (!state.started && window.history.state?.scene !== null) setLocation(null, true);
    audioManager.stopAmbience();
    renderCover();
  }
  else {
    const scene = RUNTIME_SCENES[hashScene] || currentScene();
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
    audioManager.setEnabled(state.soundEnabled);
    if (scene.id === 'ch02_s01' || scene.id === 'ch02_s02') audioManager.stopAmbience();
    else audioManager.ensureAmbience(currentSceneId);
    previousScene = currentSceneId;
  }
}

function moveNext() {
  const scene = currentScene();
  const advanceBlock = getSceneAdvanceBlock(state, scene);
  if (advanceBlock) return announce(advanceBlock);
  if (scene.id === 'ch02_s01') {
    state = setScene(state, CH02_SCENE_02.id);
    save(); setLocation(CH02_SCENE_02.id); render(); announce('Chapter II, Terms on the Table.');
    return;
  }
  if (scene.id === 'ch02_s02') return announce('Mrs Pearce’s Questions is not playable yet. Your progress is saved.');
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
  announce(`Chapter ${sceneId.startsWith('ch02') ? 'II' : 'I'}, ${RUNTIME_SCENES[sceneId].title}.`);
}

function openTeacher(trigger) {
  lastTeacherTrigger = trigger;
  const scene = document.querySelector('#story-root') ? currentScene() : null;
  const chapterTwo = scene?.id?.startsWith('ch02_');
  teacherContext.textContent = scene ? `Chapter ${chapterTwo ? 'II' : 'I'} · ${scene.title}${scene.challenge ? ` · ${scene.challenge.title}` : ''}` : 'Chapter I · Cover';
  const sections = scene?.id === 'ch02_s02' ? CH02_SCENE_02_TEACHER_SECTIONS : chapterTwo ? CH02_TEACHER_SECTIONS : TEACHER_SECTIONS;
  teacherContent.innerHTML = `${sections.map(([heading, content]) => `<section class="teacher-section"><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(content)}</p></section>`).join('')}
    ${scene ? `<button class="secondary-button teacher-preview" type="button" data-action="teacher-preview">Open / replay this scene (read-only preview)</button>` : ''}`;
  if (typeof teacherDialog.showModal === 'function') teacherDialog.showModal();
  else teacherDialog.setAttribute('open', '');
  teacherDialog.querySelector('[data-action="close-teacher"]')?.focus();
}

function closeTeacher() {
  if (teacherDialog.open) teacherDialog.close();
  else teacherDialog.removeAttribute('open');
  lastTeacherTrigger?.focus();
}

document.addEventListener('click', async (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;
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
  if (action === 'go-cover') { event.preventDefault(); setLocation(null); render(); }
  if (action === 'open-teacher') openTeacher(target);
  if (action === 'close-teacher') closeTeacher();
  if (action === 'next-scene') moveNext();
  if (action === 'choose-tone') {
    state = recordOpeningTone(state, target.dataset.tone);
    save(); render(); announce('Opening tone saved for this scene.');
  }
  if (action === 'choose-decision') {
    state = applyDecision(state, target.dataset.decision, target.dataset.option);
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
  if (action === 'play-voice') await audioManager.playVoice(target.dataset.src);
  if (action === 'play-challenge') await audioManager.playChallenge(target.dataset.src);
  if (action === 'play-sfx') await audioManager.playOneShot('flowers_fall', target.dataset.src);
  if (action === 'teacher-preview') {
    closeTeacher();
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
