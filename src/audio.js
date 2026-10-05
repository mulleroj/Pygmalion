import { ambienceForScene } from './content.js';

const AMBIENCE_FILES = {
  covent_garden_rain_market: './assets/audio/ambience/covent-garden-rain-market-001.mp3',
  covent_garden_evening_light_rain: './assets/audio/ambience/covent-garden-evening-001.mp3',
  higgins_house_morning_entry: './assets/audio/ambience/higgins_house_morning_entry.mp3',
  higgins_house_interior: './assets/audio/ambience/higgins_house_interior.mp3',
  ch03_lesson_room: './assets/audio/ambience/ch03_higgins_house_lesson_ambient.mp3',
  ch04_social_tea_room: './assets/audio/ambience/ch04_social_tea_room_ambient.mp3',
  gramophone_distant: './assets/audio/ambience/gramophone_distant.mp3',
  ch04_side_corridor: './assets/audio/ambience/ch04_side_corridor_ambient.mp3',
  ch04_evening_walk: './assets/audio/ambience/ch04_evening_walk_ambient.mp3',
  ch05_exhibition_hall: './assets/audio/ambience/ch05_borough_exhibition_ambient.mp3'
};
export const CH04_CORRIDOR_CROSSFADE_MS = 1500;
export const CH04_TEA_ROOM_VARIANTS = Object.freeze([
  { src: AMBIENCE_FILES.ch04_social_tea_room, gain: 1 },
  { src: './assets/audio/ambience/ch04_social_tea_room_ambient_b.mp3', gain: 28.726753282769735 }
].map(Object.freeze));
const CH04_TEA_ROOM_CROSSFADE_MS = 1000;

const S04_CLOCK_MIX = { gain: 0.08, ambienceDuck: 1 };
export const SFX_MIX = {
  flowers_fall: { gain: 1, ambienceDuck: 0.42 },
  ch02_quarter_hour_gong: S04_CLOCK_MIX,
  ch02_ambient_clock: S04_CLOCK_MIX
};
export const S04_AMBIENT_CLOCK_INTERVALS = [15000, 27000, 33000];
const S04_CLOCK_SRC = './assets/audio/sfx/ch02_quarter_hour_gong.mp3';
export const S04_GONG_PAUSE_MS = 400;
export const S04_GONG_BREATH_MS = 250;

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
    audioContextFactory = () => {
      const Context = globalThis.AudioContext ?? globalThis.webkitAudioContext;
      return typeof Context === 'function' ? new Context() : null;
    }, fadeMs = 700, duckFadeMs = 160, soundFadeMs = 180 } = {}) {
    this.onStatus = onStatus;
    this.createAudio = createAudio;
    this.audioContextFactory = audioContextFactory;
    this.audioContext = null;
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
    this.ambienceVariants = null;
    this.ambienceVariantIndex = 0;
    this.ambienceVariantFade = null;
    this.ambienceVariantTimer = null;
    this.ambienceTransition = null;
    this.ambienceTransitionRequested = false;
    this.ambienceDuck = 1;
    this.ambienceDuckTransition = null;
    this.ambienceVolume = this.mix.ambience;
    this.contextual = null;
    this.contextualId = null;
    this.contextualVolume = this.mix.contextual;
    this.foreground = null;
    this.activeDucks = new Map();
    this.contextualDucks = new Map();
    this.playedOneShots = new Set();
    this.oneShots = new Map();
    this.storyCueTimer = null;
    this.storyCue = null;
    this.ambientClockTimer = null;
    this.ambientClockIndex = 0;
    this.sceneAudioReadOnly = false;
    this.loopStarts = new Map();
    this.fades = new Map();
    this.retiringLoops = new Set();
    this.lastError = null;
  }

  unlock() {
    this.unlocked = true;
    if (!this.audioContext) {
      try { this.audioContext = this.audioContextFactory(); }
      catch (error) { this.lastError = error; }
    }
    if (this.audioContext?.state === 'suspended') this.audioContext.resume()?.catch?.((error) => { this.lastError = error; });
  }

  connectAmbienceGain(element, gain) {
    if (!this.audioContext?.createMediaElementSource || !this.audioContext?.createGain) return false;
    try {
      const source = this.audioContext.createMediaElementSource(element);
      const gainNode = this.audioContext.createGain();
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      gainNode.gain.value = gain;
      element.__ambienceGainNode = gainNode;
      return true;
    } catch (error) {
      this.lastError = error;
      this.onStatus({ type: 'unavailable', kind: 'ambience' });
      return false;
    }
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
    this.stopAmbientClock();
    // Native media may already be audible before its play() promise settles.
    if (cue && (cue.started || !cue.element.paused)) this.finishGramophoneCue(cue);
    this.stopForeground();
    this.stopOneShots();
    const ambiencePlayers = this.ambienceTransition ? [this.ambienceTransition.from, this.ambienceTransition.to]
      : this.ambienceVariants?.players ?? [this.ambience];
    if (this.ambienceVariantTimer !== null) {
      globalThis.clearInterval(this.ambienceVariantTimer);
      this.ambienceVariantTimer = null;
    }
    if (this.ambienceVariantFade) {
      const fade = this.ambienceVariantFade;
      fade.pausedProgress = Math.min(1, (Date.now() - fade.startedAt) / CH04_TEA_ROOM_CROSSFADE_MS);
      globalThis.clearInterval(fade.timer);
      fade.timer = null;
    }
    if (this.ambienceTransition) {
      const fade = this.ambienceTransition;
      fade.pausedProgress = Math.min(1, (Date.now() - fade.startedAt) / (fade.durationMs || CH04_CORRIDOR_CROSSFADE_MS));
      globalThis.clearInterval(fade.timer);
      fade.timer = null;
    }
    return Promise.all([...ambiencePlayers, this.contextual, ...this.retiringLoops].filter(Boolean).map((element) =>
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
    this.stopAmbienceVariantLifecycle();
    if (this.ambienceTransition) {
      globalThis.clearInterval(this.ambienceTransition.timer);
      this.retireLoop(this.ambienceTransition.from, immediate);
      this.ambienceTransition = null;
    }
    for (const slot of ['ambience', 'contextual']) {
      this.retireLoop(this[slot], immediate);
      this[slot] = null;
      this[slot + 'Id'] = null;
      this[slot + 'Source'] = null;
    }
    this.lastError = null;
  }

  stopAmbienceVariantLifecycle() {
    const variants = this.ambienceVariants;
    if (this.ambienceVariantTimer !== null) globalThis.clearInterval(this.ambienceVariantTimer);
    this.ambienceVariantTimer = null;
    if (this.ambienceVariantFade) {
      globalThis.clearInterval(this.ambienceVariantFade.timer);
      this.ambienceVariantFade = null;
    }
    if (variants) {
      variants.players.forEach((player, index) => {
        player.removeEventListener('timeupdate', variants.check);
        player.removeEventListener('ended', variants.check);
        if (index !== this.ambienceVariantIndex) this.retireLoop(player, true);
      });
    }
    this.ambienceVariants = null;
    this.ambienceVariantIndex = 0;
  }

  leaveScene() {
    this.stopAmbientClock();
    this.playedOneShots.delete('ch02_quarter_hour_gong');
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
    const targetDuck = this.getAmbienceDuckAmount();
    if (this.ambienceTransition) {
      const currentDuck = this.getAmbienceDuckLevel();
      this.ambienceDuckTransition = { from: currentDuck, to: targetDuck, startedAt: Date.now() };
      this.updateCorridorTransition(this.ambienceTransition);
    } else if (this.ambienceVariants) {
      const fade = this.ambienceVariantFade;
      if (fade) {
        const currentDuck = this.getAmbienceDuckLevel();
        this.ambienceDuckTransition = { from: currentDuck, to: targetDuck, startedAt: Date.now() };
        this.updateAmbienceVariantFade(fade);
      }
      else {
        this.ambienceDuck = targetDuck;
        this.ambienceDuckTransition = null;
        const player = this.ambienceVariants.players[this.ambienceVariantIndex];
        this.fadeVolume(player, this.enabled ? this.ambienceVolume * this.ambienceDuck : 0, this.duckFadeMs);
      }
    } else this.fadeVolume(this.ambience, this.enabled ? this.ambienceVolume * targetDuck : 0, this.duckFadeMs);
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

  getAmbienceDuckLevel() {
    const transition = this.ambienceDuckTransition;
    if (!transition) return this.ambienceDuck;
    const progress = this.duckFadeMs > 0
      ? Math.min(1, (Date.now() - transition.startedAt) / this.duckFadeMs) : 1;
    this.ambienceDuck = transition.from + (transition.to - transition.from) * progress;
    if (progress >= 1) this.ambienceDuckTransition = null;
    return this.ambienceDuck;
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

  async ensureTeaRoomAmbience() {
    let variants = this.ambienceVariants;
    if (!this.enabled || !this.unlocked) return { id: 'ch04_social_tea_room', restarted: false, blocked: false };
    if (!variants) {
      const previous = this.ambience;
      const players = CH04_TEA_ROOM_VARIANTS.map(({ src }) => this.makeAudio(src, 'ambience'));
      if (players.some((player) => !player)) {
        players.filter(Boolean).forEach((player) => this.retireLoop(player, true));
        return { id: 'ch04_social_tea_room', restarted: false, blocked: true };
      }
      variants = { players, check: null };
      variants.check = () => this.checkAmbienceVariantTransition();
      this.ambienceVariants = variants;
      this.ambienceVariantIndex = 0;
      players.forEach((player, index) => {
        player.loop = false;
        player.volume = 0;
        this.connectAmbienceGain(player, CH04_TEA_ROOM_VARIANTS[index].gain);
        if (index !== 0) player.pause();
        player.addEventListener('timeupdate', variants.check);
        player.addEventListener('ended', variants.check);
      });
      this.ambience = players[0];
      this.ambienceId = 'ch04_social_tea_room';
      this.ambienceSource = CH04_TEA_ROOM_VARIANTS[0].src;
      if (previous && previous !== players[0] && previous !== players[1]) this.retireLoop(previous);
    }
    if (this.ambienceVariantFade) {
      const fade = this.ambienceVariantFade;
      const players = await Promise.all([fade.from, fade.to].map((player) => this.startLoop(player, 'ambience')));
      if (players.some((played) => !played) || this.ambienceVariants !== variants || !this.enabled) return { id: 'ch04_social_tea_room', restarted: false, blocked: true };
      fade.startedAt = Date.now() - (fade.pausedProgress ?? 0) * CH04_TEA_ROOM_CROSSFADE_MS;
      fade.timer = globalThis.setInterval(() => this.updateAmbienceVariantFade(fade), 20);
      this.updateAmbienceVariantFade(fade);
    }
    const active = variants.players[this.ambienceVariantIndex];
    const played = await this.startLoop(active, 'ambience');
    if (!played || this.ambienceVariants !== variants || !this.enabled) return { id: 'ch04_social_tea_room', restarted: false, blocked: !played };
    if (!this.ambienceVariantFade) {
      this.fadeVolume(active, this.ambienceVolume * this.ambienceDuck, this.fadeMs);
    }
    if (!this.ambienceVariantTimer) {
      this.ambienceVariantTimer = globalThis.setInterval(() => this.checkAmbienceVariantTransition(), 40);
    }
    return { id: 'ch04_social_tea_room', restarted: false, blocked: false };
  }

  checkAmbienceVariantTransition() {
    const variants = this.ambienceVariants;
    if (!variants || !this.enabled || !this.unlocked || this.ambienceVariantFade || this.ambienceTransitionRequested) return;
    const active = variants.players[this.ambienceVariantIndex];
    if (active.paused || !Number.isFinite(active.duration) || active.duration <= 0) return;
    if (active.duration - active.currentTime <= CH04_TEA_ROOM_CROSSFADE_MS / 1000) this.beginAmbienceVariantTransition();
  }

  async beginAmbienceVariantTransition() {
    const variants = this.ambienceVariants;
    if (!variants || this.ambienceVariantFade || !this.enabled || !this.unlocked || this.ambienceTransitionRequested) return false;
    const fromIndex = this.ambienceVariantIndex;
    const toIndex = (fromIndex + 1) % variants.players.length;
    const from = variants.players[fromIndex], to = variants.players[toIndex];
    this.cancelFade(from);
    this.cancelFade(to);
    to.currentTime = 0;
    to.volume = 0;
    const played = await this.startLoop(to, 'ambience');
    if (!played || this.ambienceVariants !== variants || !this.enabled || this.ambienceVariantFade) {
      to.pause();
      return false;
    }
    const fade = { from, to, fromIndex, toIndex, startedAt: Date.now(), timer: null };
    this.ambienceVariantFade = fade;
    fade.timer = globalThis.setInterval(() => this.updateAmbienceVariantFade(fade), 20);
    this.updateAmbienceVariantFade(fade);
    return true;
  }

  updateAmbienceVariantFade(fade) {
    if (!fade || this.ambienceVariantFade !== fade) return;
    const progress = Math.min(1, (Date.now() - fade.startedAt) / CH04_TEA_ROOM_CROSSFADE_MS);
    const base = this.enabled ? this.ambienceVolume * this.getAmbienceDuckLevel() : 0;
    // Equal-power curves keep the bed present while independent room recordings overlap.
    fade.from.volume = base * Math.cos(progress * Math.PI / 2);
    fade.to.volume = base * Math.sin(progress * Math.PI / 2);
    if (progress < 1) return;
    globalThis.clearInterval(fade.timer);
    fade.from.pause();
    fade.from.volume = 0;
    fade.to.volume = base;
    this.ambienceVariantIndex = fade.toIndex;
    this.ambience = fade.to;
    this.ambienceSource = CH04_TEA_ROOM_VARIANTS[fade.toIndex].src;
    this.ambienceVariantFade = null;
  }

  async ensureAmbience(sceneId, contextual = null) {
    if (sceneId !== this.sceneId) {
      this.stopAmbientClock();
      this.playedOneShots.delete('ch02_quarter_hour_gong');
      this.finishGramophoneCue();
      this.gramophoneCue = null;
      this.stopForeground();
      this.stopOneShots();
    }
    this.sceneId = sceneId;
    this.contextualSpec = contextual;
    // S01 begins from approved interior levels; Chapter III human mix QA is pending.
    this.mix = sceneId?.startsWith('ch02_') || ['ch03_s01', 'ch03_s02', 'ch03_s03', 'ch03_s04', 'ch03_s05', 'ch04_s01', 'ch04_s02', 'ch04_s03', 'ch04_s04', 'ch04_s05', 'ch05_s01', 'ch05_s02', 'ch05_s03'].includes(sceneId) ? CH02_AUDIO_MIX : CH01_AUDIO_MIX;
    this.ambienceVolume = this.mix.ambience;
    this.contextualVolume = this.mix.contextual;
    const id = sceneId ? ambienceForScene(sceneId) : null;
    if (contextual?.id !== 'gramophone_distant') this.finishGramophoneCue();
    const results = await Promise.all([
      id === 'ch04_side_corridor' ? this.ensureCorridorAmbience()
        : id === 'ch04_evening_walk' ? this.ensureEveningWalkAmbience()
        : id === 'ch04_social_tea_room'
        ? this.ensureTeaRoomAmbience()
        : (this.ambienceVariants && this.stopAmbienceVariantLifecycle(), this.ensureLoop('ambience', id, AMBIENCE_FILES[id])),
      contextual?.id === 'gramophone_distant'
        ? this.ensureGramophoneCue(contextual)
        : this.ensureLoop('contextual', contextual?.id, contextual?.src)
    ]);
    this.startAmbientClock();
    return results[0];
  }

  async ensureCorridorAmbience() {
    const src = AMBIENCE_FILES.ch04_side_corridor;
    if (!this.enabled || !this.unlocked) return { id: 'ch04_side_corridor', restarted: false, blocked: false };
    if (this.ambienceTransition) {
      const fade = this.ambienceTransition;
      if (fade.timer !== null) return { id: 'ch04_side_corridor', restarted: false, blocked: false };
      this.cancelFade(fade.from); this.cancelFade(fade.to);
      const played = await Promise.all([fade.from, fade.to].map((player) => this.startLoop(player, 'ambience')));
      if (played.some((value) => !value) || !this.enabled || this.ambienceTransition !== fade) return { id: 'ch04_side_corridor', restarted: false, blocked: true };
      fade.startedAt = Date.now() - (fade.pausedProgress || 0) * CH04_CORRIDOR_CROSSFADE_MS;
      fade.timer = globalThis.setInterval(() => this.updateCorridorTransition(fade), 20);
      this.updateCorridorTransition(fade);
      return { id: 'ch04_side_corridor', restarted: false, blocked: false };
    }
    if (this.ambienceId === 'ch04_side_corridor' && this.ambience) {
      const played = await this.startLoop(this.ambience, 'ambience');
      if (played) this.fadeVolume(this.ambience, this.ambienceVolume * this.getAmbienceDuckAmount(), this.fadeMs);
      return { id: 'ch04_side_corridor', restarted: false, blocked: !played };
    }
    const variants = this.ambienceVariants;
    if (this.ambienceTransitionRequested) return { id: 'ch04_side_corridor', restarted: false, blocked: false };
    if (!variants || this.ambienceId !== 'ch04_social_tea_room') return this.ensureLoop('ambience', 'ch04_side_corridor', src);
    this.ambienceTransitionRequested = true;
    if (this.ambienceVariantFade?.timer === null) await this.ensureTeaRoomAmbience();
    // Let any in-progress tea-room A/B handoff finish so the corridor fades from one stable bed.
    if (this.ambienceVariantFade) {
      await new Promise((resolve) => {
        const wait = globalThis.setInterval(() => {
          if (!this.ambienceVariantFade || !this.enabled || this.sceneId !== 'ch04_s04') { globalThis.clearInterval(wait); resolve(); }
        }, 20);
      });
      if (!this.enabled || this.sceneId !== 'ch04_s04') { this.ambienceTransitionRequested = false; return { id: 'ch04_side_corridor', restarted: false, blocked: false }; }
    }
    const from = this.ambienceVariants?.players[this.ambienceVariantIndex];
    if (!from || from.paused) { this.ambienceTransitionRequested = false; return this.ensureLoop('ambience', 'ch04_side_corridor', src); }
    const to = this.makeAudio(src, 'ambience');
    if (!to) { this.ambienceTransitionRequested = false; return { id: 'ch04_side_corridor', restarted: false, blocked: true }; }
    to.loop = true; to.volume = 0;
    const played = await this.startLoop(to, 'ambience');
    if (!played || !this.enabled || this.sceneId !== 'ch04_s04') { to.pause(); this.ambienceTransitionRequested = false; return { id: 'ch04_side_corridor', restarted: false, blocked: !played }; }
    this.cancelFade(from); this.cancelFade(to);
    this.stopAmbienceVariantLifecycle();
    this.ambience = to; this.ambienceId = 'ch04_side_corridor'; this.ambienceSource = src;
    const fade = { from, to, startedAt: Date.now(), pausedProgress: 0, timer: null };
    this.ambienceTransition = fade;
    this.ambienceTransitionRequested = false;
    fade.timer = globalThis.setInterval(() => this.updateCorridorTransition(fade), 20);
    this.updateCorridorTransition(fade);
    this.onStatus({ type: 'ambience', id: 'ch04_side_corridor' });
    return { id: 'ch04_side_corridor', restarted: false, blocked: false };
  }

  updateCorridorTransition(fade) {
    if (this.ambienceTransition !== fade) return;
    const progress = Math.min(1, (Date.now() - fade.startedAt) / (fade.durationMs || CH04_CORRIDOR_CROSSFADE_MS));
    const base = this.enabled ? this.ambienceVolume * this.getAmbienceDuckLevel() : 0;
    fade.from.volume = base * Math.cos(progress * Math.PI / 2);
    fade.to.volume = base * Math.sin(progress * Math.PI / 2);
    if (progress < 1) return;
    globalThis.clearInterval(fade.timer);
    fade.from.pause(); fade.from.volume = 0; fade.to.volume = base;
    this.ambienceTransition = null;
  }

  async ensureEveningWalkAmbience() {
    const id = 'ch04_evening_walk';
    const src = AMBIENCE_FILES[id];
    if (!this.enabled || !this.unlocked) return { id, restarted: false, blocked: false };
    if (this.ambienceTransition && this.ambienceId === id) {
      const fade = this.ambienceTransition;
      if (fade.timer !== null) return { id, restarted: false, blocked: false };
      this.cancelFade(fade.from); this.cancelFade(fade.to);
      const played = await Promise.all([fade.from, fade.to].map((player) => this.startLoop(player, 'ambience')));
      if (played.some((value) => !value) || !this.enabled || this.ambienceTransition !== fade) return { id, restarted: false, blocked: true };
      fade.startedAt = Date.now() - (fade.pausedProgress || 0) * (fade.durationMs || CH04_CORRIDOR_CROSSFADE_MS);
      fade.timer = globalThis.setInterval(() => this.updateCorridorTransition(fade), 20);
      this.updateCorridorTransition(fade);
      return { id, restarted: false, blocked: false };
    }
    if (this.ambienceId === id && this.ambience) {
      const played = await this.startLoop(this.ambience, 'ambience');
      if (played) this.fadeVolume(this.ambience, this.ambienceVolume * this.getAmbienceDuckAmount(), this.fadeMs);
      return { id, restarted: false, blocked: !played };
    }
    if (this.ambienceTransitionRequested) return { id, restarted: false, blocked: false };
    this.ambienceTransitionRequested = true;
    if (this.ambienceTransition) {
      const previousFade = this.ambienceTransition;
      if (previousFade.timer === null) {
        this.cancelFade(previousFade.from); this.cancelFade(previousFade.to);
        const resumed = await Promise.all([previousFade.from, previousFade.to].map((player) => this.startLoop(player, 'ambience')));
        if (resumed.some((value) => !value) || !this.enabled || this.ambienceTransition !== previousFade) {
          this.ambienceTransitionRequested = false;
          return { id, restarted: false, blocked: true };
        }
        previousFade.startedAt = Date.now() - (previousFade.pausedProgress || 0) * (previousFade.durationMs || CH04_CORRIDOR_CROSSFADE_MS);
        previousFade.timer = globalThis.setInterval(() => this.updateCorridorTransition(previousFade), 20);
      }
      await new Promise((resolve) => {
        const wait = globalThis.setInterval(() => {
          if (!this.ambienceTransition || !this.enabled || this.sceneId !== 'ch04_s05') { globalThis.clearInterval(wait); resolve(); }
        }, 20);
      });
      if (!this.enabled || this.sceneId !== 'ch04_s05') { this.ambienceTransitionRequested = false; return { id, restarted: false, blocked: false }; }
    }
    const from = this.ambience;
    if (this.ambienceId !== 'ch04_side_corridor' || !from || from.paused) {
      this.ambienceTransitionRequested = false;
      return this.ensureLoop('ambience', id, src);
    }
    const to = this.makeAudio(src, 'ambience');
    if (!to) { this.ambienceTransitionRequested = false; return { id, restarted: false, blocked: true }; }
    to.loop = true; to.volume = 0;
    const played = await this.startLoop(to, 'ambience');
    if (!played || !this.enabled || this.sceneId !== 'ch04_s05') { to.pause(); this.ambienceTransitionRequested = false; return { id, restarted: false, blocked: !played }; }
    this.cancelFade(from); this.cancelFade(to);
    this.ambience = to; this.ambienceId = id; this.ambienceSource = src;
    const fade = { from, to, durationMs: CH04_CORRIDOR_CROSSFADE_MS, startedAt: Date.now(), pausedProgress: 0, timer: null };
    this.ambienceTransition = fade;
    this.ambienceTransitionRequested = false;
    fade.timer = globalThis.setInterval(() => this.updateCorridorTransition(fade), 20);
    this.updateCorridorTransition(fade);
    this.onStatus({ type: 'ambience', id });
    return { id, restarted: false, blocked: false };
  }

  stopAmbientClock() {
    globalThis.clearTimeout(this.ambientClockTimer);
    this.ambientClockTimer = null;
    this.ambientClockIndex = 0;
  }

  setSceneAudioReadOnly(readOnly) {
    if (this.sceneAudioReadOnly === Boolean(readOnly)) return;
    this.sceneAudioReadOnly = Boolean(readOnly);
    if (this.sceneAudioReadOnly) {
      this.stopAmbientClock();
      this.cancelStoryCue();
      this.stopOneShots();
    } else this.startAmbientClock();
  }

  startAmbientClock() {
    if (this.ambientClockTimer !== null || this.sceneId !== 'ch02_s04' || this.sceneAudioReadOnly || !this.enabled || !this.unlocked || !this.ambience || this.ambience.paused) return;
    const index = this.ambientClockIndex++;
    const delay = index === 0 ? S04_AMBIENT_CLOCK_INTERVALS[0] : S04_AMBIENT_CLOCK_INTERVALS[1 + (index - 1) % 2];
    this.ambientClockTimer = globalThis.setTimeout(() => {
      this.ambientClockTimer = null;
      if (this.sceneId !== 'ch02_s04' || this.sceneAudioReadOnly || !this.enabled || !this.ambience || this.ambience.paused) return;
      // Skip collisions; never queue a backlog or spend the independent story cue.
      if (!this.foreground && !this.storyCue && this.oneShots.size === 0) this.playOneShot('ch02_ambient_clock', S04_CLOCK_SRC, null, { repeatable: true });
      this.startAmbientClock();
    }, delay);
  }

  cancelStoryCue() {
    globalThis.clearTimeout(this.storyCueTimer);
    this.storyCueTimer = null;
    this.storyCue = null;
    if (this.foreground) this.foreground.afterVoice = null;
  }

  scheduleStoryCue(cue) {
    if (!cue || cue.sceneId !== this.sceneId || !this.enabled || !this.unlocked || this.playedOneShots.has(cue.id)) return;
    this.storyCue = cue;
    this.storyCueTimer = globalThis.setTimeout(() => {
      this.storyCueTimer = null;
      if (this.storyCue === cue && cue.sceneId === this.sceneId && this.enabled && !this.foreground) {
        this.playOneShot(cue.id, cue.src, () => this.scheduleCueReply(cue));
      }
    }, S04_GONG_PAUSE_MS);
  }

  scheduleCueReply(cue) {
    if (this.storyCue !== cue || !cue.nextVoice || cue.sceneId !== this.sceneId || !this.enabled) return;
    this.storyCueTimer = globalThis.setTimeout(() => {
      this.storyCueTimer = null;
      if (this.storyCue !== cue || cue.sceneId !== this.sceneId || !this.enabled || this.foreground) return;
      this.storyCue = null;
      this.playVoice(cue.nextVoice.src);
    }, S04_GONG_BREATH_MS);
  }

  stopForeground({ restore = true } = {}) {
    this.cancelStoryCue();
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

  async playOneShot(id, src, afterEnded = null, { repeatable = false } = {}) {
    if (!this.enabled || !this.unlocked || this.foreground || (!repeatable && !isOneShotAvailable(this.playedOneShots, id))) return false;
    const sound = this.makeAudio(src, 'sfx');
    if (!sound) return false;
    if (!repeatable) this.playedOneShots.add(id);
    sound.loop = false;
    sound.volume = SFX_MIX[id]?.gain ?? 1;
    const mix = SFX_MIX[id];
    const duckCategory = 'sfx:' + id;
    const release = (failed = false) => {
      if (!this.oneShots.has(sound)) return;
      this.oneShots.delete(sound);
      sound.removeEventListener('ended', ended);
      sound.removeEventListener('error', error);
      if (failed) {
        this.playedOneShots.delete(id);
        if (this.storyCue?.id === id) this.cancelStoryCue();
      }
      this.unduck(duckCategory);
    };
    const ended = () => {
      if (!this.oneShots.has(sound)) return;
      release();
      afterEnded?.();
    };
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

  async playForeground(src, kind, afterVoice = null) {
    if (!this.enabled || !this.unlocked) return null;
    const element = this.makeAudio(src, kind);
    if (!element) return null;
    this.stopForeground({ restore: false });
    this.stopOneShots();
    const owner = { element, kind, afterVoice };
    const release = (completed = false) => {
      if (this.foreground !== owner) return; // Late events cannot release a newer clip's duck.
      owner.detach();
      this.foreground = null;
      this.unduck('foreground');
      if (completed) this.scheduleStoryCue(owner.afterVoice);
    };
    const ended = () => release(true);
    const error = () => release();
    owner.detach = () => {
      element.removeEventListener('ended', ended);
      element.removeEventListener('error', error);
    };
    this.foreground = owner;
    const challenge = kind === 'challenge';
    this.duck('foreground', challenge ? this.mix.challengeDuck : this.mix.storyDuck,
      challenge ? this.mix.challengeContextualDuck : this.mix.storyContextualDuck);
    element.addEventListener('ended', ended);
    element.addEventListener('error', error);
    const played = await this.safePlay(element, kind);
    if (this.foreground !== owner || !this.enabled) element.pause();
    else if (!played) release();
    return element;
  }

  playVoice(src, afterVoice = null, afterCueId = null) {
    // An explicit reply during the running sequence waits for the clock's full decay.
    if (afterCueId && (this.foreground?.afterVoice?.id === afterCueId || this.storyCue?.id === afterCueId)) return Promise.resolve(null);
    return this.playForeground(src, 'voice', afterVoice);
  }

  playChallenge(src) {
    return this.playForeground(src, 'challenge');
  }

  dispose() {
    this.stopAmbientClock();
    this.stopForeground({ restore: false });
    this.stopOneShots();
    this.stopAmbience({ immediate: true });
    for (const element of this.retiringLoops) element.pause();
    this.retiringLoops.clear();
    for (const element of [...this.fades.keys()]) this.cancelFade(element);
    if (this.audioContext && this.audioContext.state !== 'closed') this.audioContext.close?.();
  }
}

export { AMBIENCE_FILES };
