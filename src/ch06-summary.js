import { SCENE_BY_ID } from './content.js';
import { CH02_SCENE_05 } from './ch02-content.js';
import { CH03_SCENE_01 } from './ch03-content.js';
import { CH04_SCENE_01, CH04_SCENE_03 } from './ch04-content.js';
import { CH05_SCENE_01, CH05_SCENE_03, CH05_SCENE_04, CH05_SCENE_05 } from './ch05-content.js';
import { CH06_SCENE_02, CH06_SCENE_03, CH06_SCENE_04, CH06_SCENE_05, CH06_S02_REPLAY_MOMENTS } from './ch06-content.js';

const choice = (choices, value) => value == null ? null : choices?.find(({ id, value: storedValue }) => id === value || storedValue === value);
const choiceBySuffix = (choices, value) => value ? choices?.find(({ id }) => id.endsWith(`_${value}`)) : null;
const canonicalText = (item) => item?.title || item?.label || item?.text || null;
const neutral = 'No saved choice is recorded for this part of the story.';

export function resolveCh06Summary(state) {
  const origin = choice(SCENE_BY_ID.ch01_s05?.decision?.choices, state.origin_motivation);
  const confirmed = choiceBySuffix(CH02_SCENE_05.decision.choices, state.confirmed_motivation);
  const practice = choiceBySuffix(CH03_SCENE_01.decision.choices, state.practice_preference);
  const direction = choice(CH06_SCENE_03.decision.choices, state.chapter6_direction);
  const shape = choice(CH06_SCENE_04.statement.shapes, state.final_statement_shape);

  const start = origin && confirmed
    ? origin.title === confirmed.title
      ? `I began with ${origin.title}, and kept that purpose in view.`
      : `My motivation developed from ${origin.title} to ${confirmed.title}.`
    : origin
      ? `I began with ${origin.title}.`
      : confirmed
        ? `I later chose ${confirmed.title} as my motivation.`
        : null;

  const learning = [
    practice ? `I chose ${practice.title.toLowerCase()} as my practice preference.` : null,
    state.applied_events?.includes('ch03_s05_complete')
      ? `One learning moment I can revisit is: “${CH06_S02_REPLAY_MOMENTS[1].transcript}”`
      : null
  ].filter(Boolean).join(' ');

  const peopleChoices = [
    choice(CH05_SCENE_03.decision.choices, state.credit_response),
    choice(CH05_SCENE_04.questionStyle.choices, state.future_question_style),
    choice(CH05_SCENE_01.decision.choices, state.reception_register_plan),
    choice(CH05_SCENE_05.decision.choices, state.next_contact),
    choice(CH04_SCENE_03.decision.choices, state.decisions?.D09),
    choice(CH04_SCENE_01.decision.choices, state.decisions?.D08)
  ].filter(Boolean).slice(0, 2);
  const people = peopleChoices.length
    ? `I chose ${peopleChoices.map((item) => `“${canonicalText(item)}”`).join(' and ')}.`
    : null;

  const directionLabel = direction?.label;
  const directionText = direction?.text;
  const shapeText = shape?.text;

  return [
    { heading: CH06_SCENE_05.summaryHeadings[0], text: start || neutral },
    { heading: CH06_SCENE_05.summaryHeadings[1], text: learning || neutral },
    { heading: CH06_SCENE_05.summaryHeadings[2], text: people || neutral },
    { heading: CH06_SCENE_05.summaryHeadings[3], text: directionLabel && directionText ? `${directionLabel}: “${directionText}”` : neutral },
    { heading: CH06_SCENE_05.summaryHeadings[4], text: shapeText ? `I chose: “${shapeText}”` : neutral }
  ];
}

export function resolveCh06Replay(state) {
  const items = [];
  if (state.origin_motivation) {
    items.push({ label: CH06_S02_REPLAY_MOMENTS[0].label, transcript: CH06_S02_REPLAY_MOMENTS[0].transcript });
  }
  if (state.applied_events?.includes('ch03_s05_complete')) {
    items.push({ label: CH06_S02_REPLAY_MOMENTS[1].label, transcript: CH06_S02_REPLAY_MOMENTS[1].transcript });
  }
  if (state.credit_response) {
    const selected = choice(CH05_SCENE_03.decision.choices, state.credit_response);
    if (selected) items.push({ label: 'A Chapter V reception choice', transcript: canonicalText(selected) });
  }
  const selectedDirection = CH06_SCENE_04.statement.directions[state.chapter6_direction];
  const selectedShape = CH06_SCENE_04.statement.shapes.find(({ value }) => value === state.final_statement_shape);
  if (state.applied_events?.includes('ch06_final_statement_delivered') && selectedDirection && selectedShape) {
    items.push({
      label: 'Eliza’s delivered statement',
      transcript: `${selectedShape.leadIn} ${selectedDirection.text}`
    });
  }
  return items;
}
