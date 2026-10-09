import { SAVE_KEY, composeState, migrateLegacySave } from '../src/progress.js';

export { SAVE_KEY, composeState, migrateLegacySave };

export function savedProgress(rawLegacyState) {
  return JSON.stringify(migrateLegacySave(rawLegacyState));
}

export function readSavedProgress(serialized) {
  const envelope = JSON.parse(serialized);
  return composeState(envelope, envelope.activeChapter);
}
