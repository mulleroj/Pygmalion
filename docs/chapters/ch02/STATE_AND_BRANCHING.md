# Chapter II State and Branching

Content-locked state contract for Chapter II. This document does not implement a story engine.

## State principles

- Canonical sequence: ch02_s01 → ch02_s02 → ch02_s03 → ch02_s04 → ch02_s05 → ch03_s01.
- Major decisions are exactly D04 and D05.
- Challenges are exactly LC03 and LC04.
- Chapter II adds no automatic Pronunciation, Confidence, or Independence increment.
- Directness, politeness, and boundary-setting are communication strategies, not a hierarchy of ability.
- A challenge error never reduces Eliza's value or the player's moral standing.
- Replay, retry, transcript opening, Teacher Mode preview, and scene reload are read-only.
- All state-changing events use stable event IDs and apply at most once.

## State inherited from Chapter I

    origin_motivation = opportunity | respect | learning | independence | null
    Pronunciation = existing Chapter I development signal
    Confidence = existing Chapter I development signal
    Independence = existing Chapter I development signal
    eliza_stage = "Flower Girl"
    applied_events = existing event list

Chapter II never changes the three development signals automatically.

## Persistent Chapter II state

    request_strategy = direct | polite | boundary | null
    lesson_terms_understood = false
    confirmed_motivation = opportunity | respect | learning | independence | null
    motivation_shift = false
    motivation_nuance = optional structured note | null

motivation_nuance is optional narrative metadata. It must not create a new branch or an unbounded state space.

## Chapter-local state

    experiment_framing_heard = false
    boundary_questioned = false
    ch02_lc03_attempts = 0
    ch02_lc03_completed = false
    ch02_lc04_attempts = 0
    ch02_lc04_completed = false
    lc04_presentation_order = null

The LC04 presentation order is created once and persisted while challenge state exists. It is keyed by stable sample and answer IDs, never by position.

## D04 – Request strategy

### Stable options

| Option ID | Saved value |
|---|---|
| d04_direct_request | request_strategy = direct |
| d04_polite_request | request_strategy = polite |
| d04_request_with_boundary | request_strategy = boundary |

Stable event ID: ch02_d04_request_strategy.

D04 changes only request_strategy. It does not change any development signal and has no answer key.

The callback available to Chapter III is narrative nuance: how Higgins and Eliza begin the first lesson. It must not turn one strategy into a better ending path.

## LC03 – Clear request, polite form

Stable challenge ID: ch02_lc03.

| Option ID | Meaning |
|---|---|
| lc03_clear_polite_request | correct; purpose remains clear and a polite form is added |
| lc03_unclear_request | distractor; request becomes vague |
| lc03_submissive_request | distractor; speaker gives up the purpose and boundary |

Stable event ID: ch02_lc03_completed.

LC03 is a reading / language-noticing challenge. Success writes completion metadata only. Retry, replay, transcript opening, and refresh do not add a signal or change option meaning.

## LC04 – Offer, evaluation, or condition

Stable challenge ID: ch02_lc04.

| Sample ID | Correct answer ID |
|---|---|
| lc04_sample_offer | lc04_offer |
| lc04_sample_evaluation | lc04_evaluation |
| lc04_sample_condition | lc04_condition |

Stable event ID: ch02_lc04_completed.

Completion writes only ch02_lc04_completed = true and attempt metadata. There is no Confidence reward for correctness. The transcript is available, and the answer key is never position-dependent.

## ch02_s03 clarification response

| Option ID | Effect |
|---|---|
| s03_ask_for_clarification | sets boundary_questioned = true |
| s03_confirm_understanding | no persistent change |

Stable event ID: ch02_s03_boundary_questioned.

The event is local, idempotent, and has no development-signal change. It changes only Mrs Pearce's immediate explanatory response.

## ch02_s04 terms

Stable event ID: ch02_s04_terms_understood.

When the visible terms card has been read and the story moves forward, set lesson_terms_understood = true. This is not a scored comprehension test and has no answer key.

## D05 – Confirmed motivation

### Stable options

| Option ID | Saved value |
|---|---|
| d05_opportunity | confirmed_motivation = opportunity |
| d05_respect | confirmed_motivation = respect |
| d05_learning | confirmed_motivation = learning |
| d05_independence | confirmed_motivation = independence |

Stable event ID: ch02_d05_confirmed_motivation.

If confirmed_motivation differs from origin_motivation, set motivation_shift = true. Do not overwrite origin_motivation. Do not add a consistency bonus or penalty.

## Chapter completion

Stable event ID: ch02_complete.

At completion:

- preserve all Chapter I values unchanged;
- persist request_strategy;
- persist lesson_terms_understood;
- persist confirmed_motivation and any motivation_shift;
- keep eliza_stage = "Flower Girl" until entry into ch03_s01;
- derive a gradual visual transition toward In Training without adding a new branch.

## Mrs Pearce character / casting brief

### Character identity

- Approximate age: late 40s to early 60s.
- Role: household manager and practical authority in Higgins's home.
- Personality: practical, firm, humane, observant, and socially perceptive.
- Social presence: she understands household rules and social consequences; she speaks to Eliza as a person, not as a specimen.
- Narrative function: turns abstract lessons into concrete questions about time, money, consent, rest, and treatment.

### Visual requirements

- Original Edwardian working-household clothing with clean, durable fabrics.
- Upright, capable posture; no caricatured servant costume.
- Face and body language should communicate experience and attention rather than comic severity.
- Clearly distinct from Eliza's youth and Flower Girl energy.
- Clearly distinct from Pickering's gentlemanly reserve.
- Expression range: practical questioning, patient explanation, guarded concern, dry amusement without mockery, and quiet approval.
- She must not look like a copied film or stage performer, a comic housekeeper stereotype, or a powerless background figure.

### Voice / casting requirements

- Voice name: Sally Ford.
- Voice ID: kBag1HOZlaVBH7ICPE8x.
- Model: eleven_v3.
- Canonical status: APPROVED / CANONICAL.
- Voice qualities: clear, grounded, warm but firm, mature, socially perceptive, and easy to understand at A2+/B1.
- Accent/register: natural British register with restrained period colouring; avoid exaggerated upper-class performance and avoid exaggerated comic dialect.
- She must not sound like Higgins, Pickering, or Eliza.
- She must not sound cruel, childish, flirtatious, theatrical, or like a comic servant stereotype.

Human listening QA approved the voice using this audition line:

“Before we begin, we must know the hours, the cost, and what you need.”

The audition MP3 is not a final runtime asset unless it exactly corresponds to a planned final audio asset. No final Mrs Pearce audio is generated in this content-lock pass.

The canonical Mrs Pearce voice and visual foundation are recorded in the project audio/visual references and Chapter II plans. This pass does not generate final Mrs Pearce runtime audio.

## Branching summary

    ch02_s01
      → D04: d04_direct_request | d04_polite_request | d04_request_with_boundary
      → LC03: stable reading challenge
    ch02_s02
      → LC04: offer | evaluation | condition
    ch02_s03
      → optional clarification response
    ch02_s04
      → visible terms card, no scored quiz
    ch02_s05
      → D05: opportunity | respect | learning | independence
      → ch03_s01

All Chapter II paths remain valid and converge on Chapter III. No low or high development signal can block continuation or determine a moral outcome.
