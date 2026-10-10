# Story Map and independent chapter progress

## Architecture impact

The existing runtime stores one flat state under `pygmalion.chapter1.progress.v1`. Hash routes and `getSceneAdvanceBlock()` rely on completion events from the preceding chapter, so a linear story route also acts as the only supported way to create later chapter state. Removing those cross-chapter prerequisites alone would make progress ambiguous: selecting a chapter could overwrite the reader's only scene bookmark, and a flat signal/event ledger could not identify which chapter owned an unfinished challenge.

The feature therefore introduces a versioned save envelope while retaining the legacy key and the existing flat in-memory state API. The envelope stores one checkpoint per chapter, a separate active chapter and last-active bookmark, sound preference, and derived chapter completion records. Each checkpoint owns its scene, chapter fields, decisions, challenges, reflections where applicable, chapter events, development signals, and inherited context. Runtime adapters compose the selected checkpoint into the legacy state shape, so chapter rendering and existing challenge logic continue to use stable IDs.

Story Map selection creates or restores only the selected chapter checkpoint. Scene entry guards continue to enforce the full ordered progression inside that chapter. Completion gates at a chapter's actual entry no longer require an earlier chapter's completion; natural Continue between chapters remains available and does not create progress for chapters the reader never played. Continue Reading restores the last-active bookmark, while Resume Chapter restores the selected chapter's own checkpoint.

## Legacy migration

On load, a valid v2 envelope is normalized first. Otherwise, the existing v1 record is normalized and conservatively partitioned by scene ownership, stable event prefixes, known chapter decisions/challenges, and chapter-specific fields. The migration writes the new key and leaves the v1 key intact. It derives completion only from each chapter's actual final completion contract; it does not synthesize missing earlier chapter completion events.

Legacy v1 kept only cumulative development-signal totals. The migration retains those earned totals in each visited checkpoint because the old record cannot reveal when each increment occurred. It does not replay the reward ledger. Subsequent changes are checkpoint-local. Existing saved LC13 answers, support use, attempt counts, and completion events remain valid under their existing IDs.

## Navigation and safety rules

- All six Story Map cards are keyboard-operable buttons and can open a new chapter or resume/revisit its own checkpoint.
- A Story Map choice and Continue Reading update route state without fabricating scene completion.
- Hash navigation accepts the current active route, a validated saved checkpoint, or an internal history route; otherwise it returns to the saved bookmark/map.
- Existing intra-chapter prerequisites, challenge completion, decisions, support paths, Teacher Mode read-only behavior, and explicit Continue actions remain authoritative.
- Sound preference remains global to the reader; challenge/decision/progression data and completion events remain with their chapter.
- Chapter VI completion is chapter completion and does not imply completion of Chapters I–V.

## Verification implications

The regression surface includes migration from representative v1 states, per-chapter resume after switching, Story Map and Continue Reading restoration, no fabricated completion events, chapter-local guards, and the Chapter V Scene 02 hotfix flow. Existing audio and narrative assets are unchanged.
