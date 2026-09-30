import { ambienceForScene } from './content.js';

const AMBIENCE_FILES = {
  covent_garden_rain_market: './assets/audio/ambience/covent-garden-rain-market-001.mp3',
  covent_garden_evening_light_rain: './assets/audio/ambience/covent-garden-evening-001.mp3',
  higgins_house_morning_entry: './assets/audio/ambience/higgins_house_morning_entry.mp3',
  higgins_house_interior: './assets/audio/ambience/higgins_house_interior.mp3',
  gramophone_distant: './assets/audio/ambience/gramophone_distant.mp3'
};

export const SFX_MIX = {
  flowers_fall: { gain: 1, ambienceDuck: 0.42 }
};

export const STORY_VOICE_AMBIENCE_DUCK = 0.78;
// Chapter II mix human-approved in the runtime scene.
export const CH02_AUDIO_MIX = {
  ambience: 0.10, contextual: 0.012,
  storyDuck: 0.28, storyContextualDuck: 0.10,
  challengeDuck: 0.08, challengeContextualDuck: 0
};
export const GRAMOPHONE_CUE_TIMING = { fadeOutAfterMs: 18000, fadeOutMs: 3000 };
const CH01_AUDIO_MIX = {
  ambience: 0.18, contextual: 0.025,
  storyDuck: STORY_VOICE_AMBIENCE_DUCK, storyContextualDuck: 0.10,
  challengeDuck: 0.32, challengeContextualDuck: 0
};

export function shouldRestartAmbience(previousScene, nextScene) {
  return ambienceForScene(previousScene) !== ambienceForScene(nextScene);
}

export function isOneShotAvailable(played, oneShotId) {
  return !played.has(oneShotId);
}

export class AudioManager {
  constructor({ onStatus = () => {}, createAudio = (src) => new Audio(src),
    fadeMs = 700, duckFadeMs = 160, soundFadeMs = 180 } = {}) {
    this.onStatus = onStatus;
    this.createAudio = createAudio;
    this.fadeMs = fadeMs;
    this.duckFadeMs = duckFadeMs;
    this.soundFadeMs = soundFadeMs;
    this.enabled = true;
    this.unlocked = false; // Session-only; a saved sound preference is not a browser gesture.
    this.sceneId = null;
    this.contextualSpec = null;
    this.gramophoneCue = null; // Audio-only, once per actual scene visit; never persisted.
    this.mix = CH01_AUDIO_MIX;
    this.ambience = null;
    this.ambienceId = null;
    this.ambienceVolume = this.mix.ambience;
    this.contextual = null;
    this.contextualId = null;
    this.contextualVolume = this.mix.contextual;
    this.foreground = null;
    this.activeDucks = new Map();
    this.contextualDucks = new Map();
    this.playedOneShots = new Set();
    this.oneShots = new Map();
    this.loopStarts = new Map();
    this.fades = new Map();
    this.retiringLoops = new Set();
    this.lastError = null;
  }

  unlock() {
    this.unlocked = true;
  }

  setEnabled(enabled) {
    const changed = this.enabled !== Boolean(enabled);
    this.enabled = Boolean(enabled);
    this.onStatus({ type: 'sound', enabled: this.enabled });
    if (!changed) return Promise.resolve();
    if (this.enabled) {
      return this.unlocked && this.sceneId
        ? this.ensureAmbience(this.sceneId, this.contextualSpec) : Promise.resolve();
    }
    const cue = this.gramophoneCue;
    // Native media may already be audible before its play() promise settles.
    if (cue && (cue.started || !cue.element.paused)) this.finishGramophoneCue(cue);
    this.stopForeground();
    this.stopOneShots();
    return Promise.all([this.ambience, this.contextual, ...this.retiringLoops].filter(Boolean).map((element) =>
      this.fadeVolume(element, 0, this.soundFadeMs).then((finished) => {
        if (finished && !this.enabled) {
          element.muted = true;
          element.pause();
          this.retiringLoops.delete(element);
        }
      })));
  }

  cancelFade(element) {
    const fade = this.fades.get(element);
    if (!fade) return;
    globalThis.clearInterval(fade.timer);
    this.fades.delete(element);
    fade.resolve(false);
  }

  fadeVolume(element, target, duration) {
    if (!element) return Promise.resolve(false);
    target = Math.max(0, Math.min(1, target));
    const existing = this.fades.get(element);
    if (existing?.target === target) return existing.promise;
    this.cancelFade(element);
    if (duration <= 0 || element.volume === target) {
      element.volume = target;
      return Promise.resolve(true);
    }
    const initial = element.volume;
    const started = Date.now();
    const fade = { target };
    fade.promise = new Promise((resolve) => {
      fade.resolve = resolve;
      fade.timer = globalThis.setInterval(() => {
        const progress = Math.min(1, (Date.now() - started) / duration);
        element.volume = initial + (target - initial) * progress;
        if (progress >= 1) {
          globalThis.clearInterval(fade.timer);
          this.fades.delete(element);
          resolve(true);
        }
      }, 20);
    });
    this.fades.set(element, fade);
    return fade.promise;
  }

  retireLoop(element, immediate = false) {
    if (!element) return;
    this.retiringLoops.add(element);
    this.fadeVolume(element, 0, immediate ? 0 : this.fadeMs).then((finished) => {
      if (!finished) return;
      element.pause();
      this.retiringLoops.delete(element);
    });
  }

  stopAmbience({ immediate = false } = {}) {
    this.finishGramophoneCue();
    this.gramophoneCue = null;
    for (const slot of ['ambience', 'contextual']) {
      this.retireLoop(this[slot], immediate);
      this[slot] = null;
      this[slot + 'Id'] = null;
      this[slot + 'Source'] = null;
    }
    this.lastError = null;
  }

  leaveScene() {
    this.sceneId = null;
    this.contextualSpec = null;
    this.stopForeground();
    this.stopOneShots();
    this.stopAmbience();
  }

  duck(category, amount = 0.58, contextualAmount = amount) {
    this.activeDucks.set(category, amount);
    this.contextualDucks.set(category, contextualAmount);
    this.applyAmbienceDuck();
  }

  unduck(category) {
    this.activeDucks.delete(category);
    this.contextualDucks.delete(category);
    this.applyAmbienceDuck();
  }

  getAmbienceDuckAmount() {
    return this.activeDucks.size ? Math.min(...this.activeDucks.values()) : 1;
  }

  getContextualDuckAmount() {
    return this.contextualDucks.size ? Math.min(...this.contextualDucks.values()) : 1;
  }

  applyAmbienceDuck() {
    this.fadeVolume(this.ambience, this.enabled ? this.ambienceVolume * this.getAmbienceDuckAmount() : 0, this.duckFadeMs);
    const cue = this.gramophoneCue;
    if (cue && !cue.finished && this.contextual === cue.element) {
      this.updateGramophoneVolume(cue);
      const target = this.getContextualDuckAmount();
      if (target !== cue.duckTarget) {
        cue.duckFrom = cue.duck;
        cue.duckTarget = target;
        cue.duckAt = Date.now();
        this.updateGramophoneVolume(cue);
      }
    } else {
      this.fadeVolume(this.contextual, this.enabled ? this.contextualVolume * this.getContextualDuckAmount() : 0, this.duckFadeMs);
    }
  }

  finishGramophoneCue(cue = this.gramophoneCue) {
    if (!cue || cue !== this.gramophoneCue || cue.finished) return;
    cue.finished = true;
    globalThis.clearInterval(cue.timer);
    cue.element.removeEventListener('ended', cue.finish);
    cue.element.removeEventListener('error', cue.finish);
    cue.element.volume = 0;
    cue.element.muted = true;
    cue.element.pause();
    if (this.contextual === cue.element) {
      this.contextual = null;
      this.contextualId = null;
      this.contextualSource = null;
    }
  }

  updateGramophoneVolume(cue) {
    if (!cue.started || cue.finished) return;
    const now = Date.now();
    const elapsed = now - cue.startedAt;
    const { fadeOutAfterMs, fadeOutMs } = GRAMOPHONE_CUE_TIMING;
    if (elapsed >= fadeOutAfterMs + fadeOutMs) return this.finishGramophoneCue(cue);
    const entry = this.fadeMs > 0 ? Math.min(1, elapsed / this.fadeMs) : 1;
    const exit = Math.min(1, (fadeOutAfterMs + fadeOutMs - elapsed) / fadeOutMs);
    const duckProgress = this.duckFadeMs > 0 ? Math.min(1, (now - cue.duckAt) / this.duckFadeMs) : 1;
    cue.duck = duckProgress >= 1 ? cue.duckTarget : cue.duckFrom + (cue.duckTarget - cue.duckFrom) * duckProgress;
    // One clock owns both the finite envelope and ducking: restores cannot cancel fade-out.
    cue.element.volume = this.enabled ? this.contextualVolume * entry * exit * cue.duck : 0;
  }

  async ensureGramophoneCue(spec) {
    let cue = this.gramophoneCue;
    if (cue?.finished || cue?.started || !this.enabled || !this.unlocked) return;
    if (!cue) {
      const element = this.makeAudio(spec.src, 'contextual');
      if (!element) return;
      this.retireLoop(this.contextual);
      element.loop = false;
      element.volume = 0;
      const duck = this.getContextualDuckAmount();
      cue = { element, started: false, finished: false, duck, duckFrom: duck, duckTarget: duck, duckAt: Date.now() };
      cue.finish = () => this.finishGramophoneCue(cue);
      this.gramophoneCue = cue;
      this.contextual = element;
      this.contextualId = spec.id;
      this.contextualSource = spec.src;
      element.addEventListener('ended', cue.finish);
      element.addEventListener('error', cue.finish);
    }
    const played = await this.startLoop(cue.element, 'contextual');
    if (cue !== this.gramophoneCue || cue.finished || !this.enabled) return cue.element.pause();
    if (played && !cue.started) {
      cue.started = true;
      cue.startedAt = Date.now();
      cue.timer = globalThis.setInterval(() => this.updateGramophoneVolume(cue), 20);
      this.updateGramophoneVolume(cue);
    }
  }

  makeAudio(src, kind) {
    if (typeof src !== 'string' || !src) return null;
    try {
      const element = this.createAudio(src);
      element.preload = 'auto';
      return element;
    } catch (error) {
      this.lastError = error;
      this.onStatus({ type: 'unavailable', kind });
      return null;
    }
  }

  async safePlay(element, kind) {
    if (!element || !this.enabled || !this.unlocked) return false;
    try {
      await element.play();
      this.lastError = null;
      return true;
    } catch (error) {
      this.lastError = error;
      this.onStatus({ type: error?.name === 'NotAllowedError' ? 'blocked' : 'unavailable', kind });
      return false;
    }
  }

  startLoop(element, kind) {
    if (!this.enabled || !this.unlocked) return Promise.resolve(false);
    element.muted = false;
    if (this.loopStarts.has(element)) return this.loopStarts.get(element);
    if (!element.paused) return Promise.resolve(true);
    const pending = this.safePlay(element, kind).finally(() => this.loopStarts.delete(element));
    this.loopStarts.set(element, pending);
    return pending;
  }

  async ensureLoop(slot, id, src) {
    const previous = this[slot];
    if (!id || !src) {
      this.retireLoop(previous);
      this[slot] = null;
      this[slot + 'Id'] = null;
      this[slot + 'Source'] = null;
      return { id: null, restarted: false, blocked: false };
    }
    const same = previous && this[slot + 'Id'] === id && this[slot + 'Source'] === src;
    if (!this.enabled || !this.unlocked) {
      if (!same) {
        this.retireLoop(previous);
        this[slot] = null;
        this[slot + 'Id'] = null;
        this[slot + 'Source'] = null;
      }
      return { id, restarted: false, blocked: false };
    }
    const next = same ? previous : this.makeAudio(src, slot);
    if (!next) {
      this.retireLoop(previous);
      this[slot] = null;
      this[slot + 'Id'] = null;
      this[slot + 'Source'] = null;
      return { id, restarted: false, blocked: true };
    }
    if (!same) {
      next.loop = true;
      next.volume = 0;
      this[slot] = next;
      this[slot + 'Id'] = id;
      this[slot + 'Source'] = src;
      this.retireLoop(previous);
    }
    const played = await this.startLoop(next, slot);
    if (this[slot] !== next || !this.enabled) {
      next.pause();
      return { id, restarted: false, blocked: !played };
    }
    if (played) {
      const duck = slot === 'ambience' ? this.getAmbienceDuckAmount() : this.getContextualDuckAmount();
      this.fadeVolume(next, this[slot + 'Volume'] * duck, this.fadeMs);
      this.onStatus({ type: slot, id });
    }
    return { id, restarted: Boolean(previous && !same), blocked: !played };
  }

  async ensureAmbience(sceneId, contextual = null) {
    if (sceneId !== this.sceneId) {
      this.finishGramophoneCue();
      this.gramophoneCue = null;
      this.stopForeground();
      this.stopOneShots();
    }
    this.sceneId = sceneId;
    this.contextualSpec = contextual;
    this.mix = sceneId?.startsWith('ch02_') ? CH02_AUDIO_MIX : CH01_AUDIO_MIX;
    this.ambienceVolume = this.mix.ambience;
    this.contextualVolume = this.mix.contextual;
    const id = sceneId ? ambienceForScene(sceneId) : null;
    if (contextual?.id !== 'gramophone_distant') this.finishGramophoneCue();
    const results = await Promise.all([
      this.ensureLoop('ambience', id, AMBIENCE_FILES[id]),
      contextual?.id === 'gramophone_distant'
        ? this.ensureGramophoneCue(contextual)
        : this.ensureLoop('contextual', contextual?.id, contextual?.src)
    ]);
    return results[0];
  }

  stopForeground({ restore = true } = {}) {
    const owner = this.foreground;
    if (owner) {
      owner.detach();
      owner.element.muted = true;
      owner.element.pause();
      this.foreground = null;
    }
    this.activeDucks.delete('foreground');
    this.contextualDucks.delete('foreground');
    if (restore) this.applyAmbienceDuck();
  }

  stopOneShots() {
    for (const [element, release] of [...this.oneShots]) {
      element.muted = true;
      element.pause();
      release();
    }
  }

  async playOneShot(id, src) {
    if (!this.enabled || !this.unlocked || this.foreground || !isOneShotAvailable(this.playedOneShots, id)) return false;
    const sound = this.makeAudio(src, 'sfx');
    if (!sound) return false;
    this.playedOneShots.add(id);
    sound.volume = SFX_MIX[id]?.gain ?? 1;
    const mix = SFX_MIX[id];
    const duckCategory = 'sfx:' + id;
    const release = (failed = false) => {
      if (!this.oneShots.has(sound)) return;
      this.oneShots.delete(sound);
      sound.removeEventListener('ended', ended);
      sound.removeEventListener('error', error);
      if (failed) this.playedOneShots.delete(id);
      this.unduck(duckCategory);
    };
    const ended = () => release();
    const error = () => release(true);
    this.oneShots.set(sound, release);
    if (mix?.ambienceDuck < 1) this.duck(duckCategory, mix.ambienceDuck, 0.10);
    sound.addEventListener('ended', ended);
    sound.addEventListener('error', error);
    const played = await this.safePlay(sound, 'sfx');
    if (!played) release(true);
    if (!this.oneShots.has(sound) || !this.enabled) sound.pause();
    return played;
  }

  async playForeground(src, kind) {
    if (!this.enabled || !this.unlocked) return null;
    const element = this.makeAudio(src, kind);
    if (!element) return null;
    this.stopForeground({ restore: false });
    this.stopOneShots();
    const owner = { element, kind };
    const release = () => {
      if (this.foreground !== owner) return; // Late events cannot release a newer clip's duck.
      owner.detach();
      this.foreground = null;
      this.unduck('foreground');
    };
    owner.detach = () => {
      element.removeEventListener('ended', release);
      element.removeEventListener('error', release);
    };
    this.foreground = owner;
    const challenge = kind === 'challenge';
    this.duck('foreground', challenge ? this.mix.challengeDuck : this.mix.storyDuck,
      challenge ? this.mix.challengeContextualDuck : this.mix.storyContextualDuck);
    element.addEventListener('ended', release);
    element.addEventListener('error', release);
    const played = await this.safePlay(element, kind);
    if (this.foreground !== owner || !this.enabled) element.pause();
    else if (!played) release();
    return element;
  }

  playVoice(src) {
    return this.playForeground(src, 'voice');
  }

  playChallenge(src) {
    return this.playForeground(src, 'challenge');
  }

  dispose() {
    this.stopForeground({ restore: false });
    this.stopOneShots();
    this.stopAmbience({ immediate: true });
    for (const element of this.retiringLoops) element.pause();
    this.retiringLoops.clear();
    for (const element of [...this.fades.keys()]) this.cancelFade(element);
  }
}

export { AMBIENCE_FILES };
