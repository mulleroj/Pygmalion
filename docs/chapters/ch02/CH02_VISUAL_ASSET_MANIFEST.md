# Chapter II Visual Asset Manifest — Environments

Five locally supplied, human-approved environment images form four Chapter II scene plates and one supporting reserve. This manifest records the approved sources and their technical presentation derivatives; it does not assign characters or implement Chapter II runtime.

## Canonical location inventory

The original imports were named as below in `assets/images/locations/ch02/`. Their byte-identical, readable PNG copies are preserved in `source/`. The four primary plates have uncropped WebP derivatives at the Chapter I location runtime level. The kitchen remains source-only because it has no Chapter II scene assignment.

| Asset ID | Original import filename | Canonical source | Runtime plate | Scene use | Status | Alt description |
|---|---|---|---|---|---|---|
| `LOC-CH02-HIGGINS-HOUSE-EXTERIOR` | `ch02_higgins-house-exterior.png` | `assets/images/locations/ch02/source/ch02_higgins-house-exterior.png` | `assets/images/locations/ch02/ch02_higgins-house-exterior.webp` | `ch02_s01` | source `APPROVED / CANONICAL`; WebP `TECHNICALLY VERIFIED` | Morning view of Higgins's Edwardian townhouse entrance, stone steps, iron railings and cobbled pavement, without people. |
| `LOC-CH02-HIGGINS-STUDY` | `ch02_higgins-study.png` | `assets/images/locations/ch02/source/ch02_higgins-study.png` | `assets/images/locations/ch02/ch02_higgins-study.webp` | `ch02_s02` and `ch02_s04`, exact same plate | source `APPROVED / CANONICAL`; WebP `TECHNICALLY VERIFIED` | Edwardian study with a book-filled wall, work desk, fireplace and scholarly objects, without people. |
| `LOC-CH02-HIGGINS-HOUSE-HALLWAY` | `ch02_higgins-house-hallway.png` | `assets/images/locations/ch02/source/ch02_higgins-house-hallway.png` | `assets/images/locations/ch02/ch02_higgins-house-hallway.webp` | `ch02_s03` | source `APPROVED / CANONICAL`; WebP `TECHNICALLY VERIFIED` | Edwardian hall with a staircase, red runner and an open view into the kitchen, without people. |
| `LOC-CH02-LESSON-ROOM-THRESHOLD` | `ch02_lesson-room-threshold.png` | `assets/images/locations/ch02/source/ch02_lesson-room-threshold.png` | `assets/images/locations/ch02/ch02_lesson-room-threshold.webp` | `ch02_s05` | source `APPROVED / CANONICAL`; WebP `TECHNICALLY VERIFIED` | View through a doorway into an Edwardian lesson room with desks, books and a blackboard, without people. |
| `LOC-CH02-KITCHEN-SUPPORTING` | `ch02_kitchen-supporting.png` | `assets/images/locations/ch02/source/ch02_kitchen-supporting.png` | — | Supporting reserve only; no Chapter II scene | `APPROVED / SUPPORTING` | Edwardian kitchen with a worktable, range, copper pans and a doorway toward the stair hall, without people. |

## Source integrity and derivative checks

All five source PNGs decode at 1672 × 941 pixels (approximately 16:9). The source copies matched the original imports byte for byte by SHA-256 before the duplicate imports were removed. The four WebP plates decode at the same 1672 × 941 pixels. They were encoded at high quality without resizing or cropping. The original PNGs are the visual authority; WebP files are presentation derivatives.

| Asset ID | Canonical PNG size | Original/canonical SHA-256 | WebP size |
|---|---:|---|---:|
| `LOC-CH02-HIGGINS-HOUSE-EXTERIOR` | 2,967,322 B | `7302B8445B9D4B09ABFE76129AB2EB8F28B94B6D793641C8E30C57F9DEACE81E` | 509,810 B |
| `LOC-CH02-HIGGINS-STUDY` | 2,488,367 B | `E23F64E6059C5F24361E8F746AEE5BE27133A7563C1D13B76418EE7E5E69B17A` | 343,306 B |
| `LOC-CH02-HIGGINS-HOUSE-HALLWAY` | 2,442,707 B | `EE46F43E238B691E383AD343B007B7D938EAAB8A91007EBF6E1934FB9FB7CBC9` | 357,632 B |
| `LOC-CH02-LESSON-ROOM-THRESHOLD` | 2,330,920 B | `8D8D78A7532B6997406E0B4BDD03BF5F710079D091C7BF1108C735CAD429A919` | 323,570 B |
| `LOC-CH02-KITCHEN-SUPPORTING` | 2,513,700 B | `8C5EB8A98E3B18F4E3D78931E172B74DD12123FE66697BA6B3E127A100726B0D` | — |

## Visual and composition QA

- The five images have coherent Edwardian architecture, woodwork and warm daylight. The hall and kitchen show a consistent staircase/doorway connection. No people or obvious modern objects were observed.
- The study's foreground desk is visually dominant. A future four-character composition needs blocking that keeps the desk, books and fireplace readable; no composite is approved here.
- The full-width threshold image shows the doorway, but Chapter I's centered `object-fit: cover` treatment would remove much of both side doorframes in a tall viewport. Preserve the full source and verify a doorway-preserving responsive crop or layout when Chapter II runtime composition is designed.
- Tiny lettering on the threshold room's wall map is not reliably legible. It is environmental texture only and must not carry story or learning information.
- No source was cropped, recolored or regenerated. No characters, speech bubbles, UI or separate prop tiles were added.

## Import cleanup

The five original PNG import copies at `assets/images/locations/ch02/*.png` were removed only after the `source/` copies passed byte-length, decode/dimension and SHA-256 checks. Their content remains recoverable from the canonical `source/` copies. The four WebP runtime plates remain alongside `source/` as in Chapter I.
