import { ambienceForScene } from './content.js';

const AMBIENCE_FILES = {
  covent_garden_rain_market: './assets/audio/ambience/covent-garden-rain-market-001.mp3',
  covent_garden_evening_light_rain: './assets/audio/ambience/covent-garden-evening-001.mp3'
};

export const SFX_MIX = {
  flowers_fall: { gain: 1, ambienceDuck: 0.42 }
};

export const STORY_VOICE_AMBIENCE_DUCK = 0.78;

export function shouldRestartAmbience(previousScene, nextScene) {
  return ambienceForScene(previousScene) !== ambienceForScene(nextScene);
}

export function isOneShotAvailable(played, oneShotId) {
  return !played.has(oneShotId);
}

export class AudioManager {
  constructor({ onStatus = () => {} } = {}) {
    this.onStatus = onStatus;
    this.enabled = true;
    this.ambience = null;
    this.ambienceId = null;
    this.ambienceVolume = 0.18;
    this.activeDucks = new Map();
    this.playedOneShots = new Set();
    this.lastError = null;
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (this.ambience) this.ambience.muted = !this.enabled;
    this.onStatus({ type: 'sound', enabled: this.enabled });
  }

  stopAmbience() {
    if (this.ambience) this.ambience.pause();
    this.ambience = null;
    this.ambienceId = null;
    this.lastError = null;
  }

  duck(category, amount = 0.58) {
    this.activeDucks.set(category, amount);
    this.applyAmbienceDuck();
  }

  unduck(category) {
    this.activeDucks.delete(category);
    this.applyAmbienceDuck();
  }

  getAmbienceDuckAmount() {
    return this.activeDucks.size ? Math.min(...this.activeDucks.values()) : 1;
  }

  applyAmbienceDuck() {
    if (this.ambience) this.ambience.volume = this.ambienceVolume * this.getAmbienceDuckAmount();
  }

  async safePlay(element, kind) {
    if (!element || !this.enabled) return false;
    try {
      await element.play();
      this.lastError = null;
      return true;
    } catch (error) {
      this.lastError = error;
      this.onStatus({ type: 'blocked', kind });
      return false;
    }
  }

  async ensureAmbience(sceneId) {
    const id = ambienceForScene(sceneId);
    if (this.ambience && this.ambienceId === id) {
      this.ambience.muted = !this.enabled;
      return { id, restarted: false, blocked: Boolean(this.lastError) };
    }
    const previous = this.ambience;
    const next = new Audio(AMBIENCE_FILES[id]);
    next.loop = true;
    next.preload = 'auto';
    next.volume = 0;
    next.muted = !this.enabled;
    this.ambience = next;
    this.ambienceId = id;
    const previousVolume = previous?.volume || this.ambienceVolume;
    const played = await this.safePlay(next, 'ambience');
    if (played && previous) {
      const targetVolume = this.ambienceVolume * this.getAmbienceDuckAmount();
      const startedAt = Date.now();
      const fadeMs = 700;
      const fade = () => {
        const progress = Math.min(1, (Date.now() - startedAt) / fadeMs);
        previous.volume = previousVolume * (1 - progress);
        next.volume = targetVolume * progress;
        if (progress >= 1) {
          window.clearInterval(timer);
          previous.pause();
        }
      };
      const timer = window.setInterval(fade, 40);
      fade();
    } else {
      if (previous) previous.pause();
      next.volume = this.ambienceVolume * this.getAmbienceDuckAmount();
    }
    if (played) this.onStatus({ type: 'ambience', id });
    return { id, restarted: Boolean(previous), blocked: !played };
  }

  async playOneShot(id, src) {
    if (!isOneShotAvailable(this.playedOneShots, id)) return false;
    if (!this.enabled) return false;
    this.playedOneShots.add(id);
    const sound = new Audio(src);
    sound.preload = 'auto';
    sound.volume = SFX_MIX[id]?.gain ?? 1;
    const mix = SFX_MIX[id];
    const duckCategory = `sfx:${id}`;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      if (mix?.ambienceDuck < 1) this.unduck(duckCategory);
    };
    if (mix?.ambienceDuck < 1) this.duck(duckCategory, mix.ambienceDuck);
    sound.addEventListener('ended', release, { once: true });
    sound.addEventListener('error', release, { once: true });
    const played = await this.safePlay(sound, 'sfx');
    if (!played) release();
    return played;
  }

  async playVoice(src) {
    const voice = new Audio(src);
    voice.preload = 'auto';
    this.duck('voice', STORY_VOICE_AMBIENCE_DUCK);
    voice.addEventListener('ended', () => this.unduck('voice'), { once: true });
    const played = await this.safePlay(voice, 'voice');
    if (!played) this.unduck('voice');
    return voice;
  }

  async playChallenge(src) {
    const sample = new Audio(src);
    sample.preload = 'auto';
    this.duck('challenge', 0.32);
    sample.addEventListener('ended', () => this.unduck('challenge'), { once: true });
    const played = await this.safePlay(sample, 'challenge');
    if (!played) this.unduck('challenge');
    return sample;
  }
}

export { AMBIENCE_FILES };
