# Chapter VI Visual Plan

Status: S01–S03 visuals approved and integrated; S04–S05 remain planned. Preserve canonical Eliza identity and approved stage `Her Own Voice`; use approved Higgins, Pickering and Mrs Pearce art where needed. Do not create unnecessary character variants. Chapter VI's visual change is agency, framing and environment, not a makeover or a new “proper” identity.

## S01 — The Morning After (approved visual)

- Approved background: Candidate B, generated as `exec-496f8c96-01f6-42d8-806b-f6bad7e6b096` (1672 × 941 px).
- Canonical runtime asset: `assets/images/locations/ch06/ch06_morning_after_room.webp`, converted from the approved PNG to WebP at quality 92 with dimensions unchanged.
- Preserve the cool morning window light, table and letters, adjoining workroom doorway and visible floor. The scene uses the same background in every route; the generated plate contains no people.
- Reuse Eliza `assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png`; Higgins `assets/images/characters/higgins/runtime/higgins_master_cutout.png`; Pickering `assets/images/characters/pickering/runtime/pickering_full-body_master_cutout.png`; and Mrs Pearce `assets/images/characters/mrs-pearce/runtime/mrs-pearce_practical-questioning_cutout.png`. Character binaries are referenced in place, not duplicated.
- `next_contact` selects only the first-contact composition: Eliza at the right with Higgins, Pickering or Mrs Pearce at the left. Eliza uses the larger scale; Higgins remains secondary. Missing or unknown `next_contact` uses the same plate with Eliza alone at left-of-centre; it adds no companion and does not change story state.
- The art panel stays at 1672:941 on wide layouts. At widths up to 1023 px the story spread stacks; up to 599 px the room uses a 1.35 crop biased slightly toward the adjoining workroom, with companions moved inward and both figures scaled to fit. The neutral route remains a deliberate solo composition. Verify future art or crop changes against the letters, doorway, full-body feet and dialogue controls.

## S02 — The Question in the Mirror (approved visual)

- Approved background: Candidate B, generation `exec-9ee725cf-3161-4082-af45-be320192be59` (1672 × 941 px). Source: `C:/Users/mulle/.codex/generated_images/01a11300-5dc6-70d0-b6c8-a07a03fe2205/exec-9ee725cf-3161-4082-af45-be320192be59.png`.
- Canonical runtime asset: `assets/images/locations/ch06/ch06_question_in_mirror_room.webp`, converted from the approved PNG to WebP at quality 92 with dimensions unchanged.
- The approved empty room has a plain wall mirror and small table on the left, a window near centre-left, and open floor on the right. Its reflection contains only the empty room. Preserve the image without cropping at wide sizes.
- Reuse Eliza `assets/images/characters/eliza/runtime/eliza_her-own-voice_thoughtful_cutout.png` once. Place her right-of-centre, at approximately 69% of the art width, grounded on the floor and oriented left toward the mirror; CSS flips only the displayed cutout to match that orientation. Keep clear lateral distance from the mirror. Do not add a reflected Eliza, a second figure, a before/after composition or a transformation cue.
- At widths up to 1023 px the story spread stacks. At widths up to 599 px use the 1.35 art crop with a left bias (`object-position: 25% center`) so the mirror remains visible while Eliza stays on the right. Check both the mirror and Eliza together at mobile widths; replay cards remain in the text column below the art.

## S03 — Three Ways Forward (approved visual)

- Approved visual: Candidate A, generation `exec-cd81fea9-cec2-441e-ae35-93bb74562fa7` (1672 × 941 px); source: `C:/Users/mulle/.codex/generated_images/01a11724-393f-7312-b82e-530415b5e3b7/exec-cd81fea9-cec2-441e-ae35-93bb74562fa7.png`.
- Canonical runtime asset: `assets/images/locations/ch06/ch06_three_ways_forward_room.webp`, converted from the approved PNG to WebP at quality 92 with dimensions and composition unchanged.
- Reuse the approved Eliza `Her Own Voice / thoughtful` cutout at approximately 68% of the art width. Eliza is the only character; ground her on the visible floor and retain the table, window and open doorway around her.
- The S01 room intentionally returns here: S01 possibilities arrive from outside; S02 is private self-reflection; S03 brings Eliza back to practical life so she can make the choice herself. Eliza-only framing, S03 content and D12/LC15 distinguish the moment without altering the room plate.
- Keep D12's three directions equally legitimate. The window and doorway are ordinary architecture, with no route coding, arrows, highlighted props or lighting hierarchy. The background contains no LC15 contextual clues for a public meeting, colleague/community or private adviser.
- D12 cards retain their opaque readable backgrounds. The art and story controls remain in separate columns on wide screens and stack on smaller screens; Eliza cannot cover the D12 heading, cards, feedback, LC15 controls or no-audio support.
- At widths up to 1023 px the story spread stacks. At widths up to 599 px use a scene-specific 1.35 crop centered near `48%`, move Eliza inward to about 58% and reduce her to 78% art height. Check Eliza, doorway/window context, full-body visibility and controls at 390, 430, 480, 768 and 1440 px; avoid horizontal overflow and effective clipping.

| Scene | Composition / environment | Character and prop needs |
|---|---|---|
| S01 — The Morning After | One Wimpole Street morning room adjoining the workroom; quiet light and one table | Reuse Eliza `Her Own Voice`, reflective expression; letters, notes, invitations, pencil. First-contact companion art can be reused. |
| S02 — The Question in the Mirror | Approved quiet private room; plain wall mirror at left, window near centre-left, open space at right; mirror supports self-recognition, not beauty framing | Reuse the same Eliza thoughtful cutout once at right-of-centre, facing the mirror; no reflected person, duplicate or transformation image. |
| S03 — Three Ways Forward | Approved S01 morning-room echo with ordinary London view and adjoining workroom; no choice-coded props or visual ranking | Same approved Eliza thoughtful cutout alone at about 68%; no companion or LC15 context character. |
| S04 — Her Own Statement | One composition selected by `chapter6_direction`: modest meeting room, independent work space, or shared community room | Reuse Eliza master; at most three background compositions. Rhetorical shape does not create a new illustration. |
| S05 PUBLIC PARTICIPATION (`social_success`) | Modest public/professional/community room where Eliza participates and directs a practical exchange | Eliza in existing approved clothing/art where possible; meeting table, notes, flowers or organiser's programme. Higgins must not dominate foreground. |
| S05 independent_voice | Modest work area with clear practical agency | Flowers, ledger, keys, paid-work letter and housing note; avoid luxury symbols that equate independence with wealth. |
| S05 integrated_identity | Connected community room/doorway between meeting and flower-work space | Flowers plus meeting notes; show movement between contexts without depicting poverty as authentic and cultivated speech as false. |

Prefer S01/S03 background reuse and one canonical Eliza master across the chapter. Visual branch differences should come mainly from setting and props. All crucial information remains in text, never color alone. Use readable contrast and responsive crops later; no implementation in this draft.
