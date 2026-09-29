# Chapter I Audio Asset Manifest

Canonical production manifest for the 16 locally stored Chapter I audio assets.

## Production status

- Technical status: `GENERATED / LOCAL / TECHNICALLY VERIFIED`
- Human listening status: tracked per asset; A04, A05, and A06 are `HUMAN QA APPROVED`, and other unreviewed assets remain `HUMAN QA PENDING`.
- Runtime contract: `BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE`
- Story voices remain optional; only LC01 and LC02 are listening challenges.
- A02/AM02 and A08/AM09 now use verified clean MP3s containing canonical Eliza dialogue only; human listening status remains `HUMAN QA PENDING`.

## Category totals

| Category | Count |
|---|---:|
| `OPTIONAL STORY VOICE` | 7 |
| `LISTENING CHALLENGE` | 6 |
| `AMBIENCE` | 2 |
| `SFX` | 1 |
| **TOTAL** | **16** |

## Asset records

| Asset ID | Category | Audio role | Scene | Speaker | Voice name | Voice ID | Model | Canonical runtime path | Duration | File size | Transcript / content | Technical status | Human listening status |
|---|---|---|---|---|---|---|---|---|---:|---:|---|---|---|
| `AM02` | `OPTIONAL STORY VOICE` | Eliza sales pitch | `ch01_s01` | Eliza | `Eliza - young_cockney` | `124kaYCknTDsnwUFdWl9` | `eleven_v3` | `assets/audio/characters/eliza/eliza_ch01_scene01_001.mp3` | 11.26 s | 197020 B | “Flowers, sir? Fresh ones! Ain't no sense standin' there in the rain. Go on. A flower'll make the room look kinder. Two for a penny, they are. I'll pick you the bright ones.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `AM03` | `OPTIONAL STORY VOICE` | Freddy apology | `ch01_s02` | Freddy | `Ned - Casual, Young British Male, General Southern Accent` | `fNYuJl2dBlX9V7NxmjnV` | `eleven_v3` | `assets/audio/characters/freddy/freddy_ch01_scene02_001.mp3` | 5.172 s | 99635 B | “Oh! I'm sorry. I didn't see the basket. I can pay for the damaged ones.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `AM06` | `OPTIONAL STORY VOICE` | Eliza signature line | `ch01_s03` | Eliza | `Eliza - young_cockney` | `124kaYCknTDsnwUFdWl9` | `eleven_v3` | `assets/audio/characters/eliza/eliza_ch01_scene03_001.mp3` | 2.72 s | 61601 B | “I ain't done nothing wrong. I'm a good girl, I am.” — STT verified; dialogue only; no spoken direction or extra words | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA APPROVED` |
| `AM05` | `OPTIONAL STORY VOICE` | Higgins observation | `ch01_s03` | Higgins | `Kelvin - Calm Young British Male` | `JlptfLxaUpd8pZcw9dKd` | `eleven_v3` | `assets/audio/characters/higgins/higgins_ch01_scene03_001.mp3` | 12.00 s | 209977 B | “Your speech carries a local pattern. I can hear where a person has learned to live. I can hear several things at once. It's interesting.” / “Perhaps I could. That's fair. I'm Henry Higgins.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA APPROVED` |
| `AM08A` | `OPTIONAL STORY VOICE` | Pickering and Higgins response | `ch01_s04` | Higgins | `Kelvin - Calm Young British Male` | `JlptfLxaUpd8pZcw9dKd` | `eleven_v3` | `assets/audio/characters/higgins/higgins_ch01_scene04_001.mp3` | ~9.92 s (measured 9.9788 s) | 176540 B | “Listen to who is speaking, where they are, and what they want. A voice gives clues, but it doesn't tell you everything. Yes. That's why you ask.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED; CANONICAL` | `HUMAN QA APPROVED` |
| `AM08B` | `OPTIONAL STORY VOICE` | Pickering reaction | `ch01_s04` | Pickering | `George - Warm, Captivating Storyteller` | `JBFqnCBsd6RMkjVDRZzb` | `eleven_v3` | `assets/audio/characters/pickering/pickering_ch01_scene04_001.mp3` | 4.389 s | 87097 B | “And the clues can be wrong.” / “What do you think, Eliza?” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `AM09` | `OPTIONAL STORY VOICE` | Eliza closing reflection | `ch01_s05` | Eliza | `Eliza - young_cockney` | `124kaYCknTDsnwUFdWl9` | `eleven_v3` | `assets/audio/characters/eliza/eliza_ch01_scene05_001.mp3` | 11.83 s | 206215 B | “People hear how I talk before they see what I can do. Maybe if I could talk another way, it'd open a door or two. Wouldn't make me worth more. Just give me another way to make 'em listen.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `LC01-01` | `LISTENING CHALLENGE` | LC01 apology | `ch01_s02` | Freddy | `Ned - Casual, Young British Male, General Southern Accent` | `fNYuJl2dBlX9V7NxmjnV` | `eleven_v3` | `assets/audio/listening/ch01_lc01_001.mp3` | 4.467 s | 88351 B | “I'm sorry. I wasn't looking where I was going.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `LC01-02` | `LISTENING CHALLENGE` | LC01 excuse | `ch01_s02` | Freddy | `Ned - Casual, Young British Male, General Southern Accent` | `fNYuJl2dBlX9V7NxmjnV` | `eleven_v3` | `assets/audio/listening/ch01_lc01_002.mp3` | 2.952 s | 64109 B | “It was the rain. Anyone could've slipped.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `LC01-03` | `LISTENING CHALLENGE` | LC01 intention to repair | `ch01_s02` | Freddy | `Ned - Casual, Young British Male, General Southern Accent` | `fNYuJl2dBlX9V7NxmjnV` | `eleven_v3` | `assets/audio/listening/ch01_lc01_003.mp3` | 1.985 s | 48644 B | “I'll pick these up and pay for the damaged ones.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `LC02-01` | `LISTENING CHALLENGE` | LC02 polite work request | `ch01_s04` | supporting speaker 01 | `not provided in the production casting brief` | `vBRU4ztAu1MfP8arDoB3` | `not provided` | `assets/audio/listening/ch01_lc02_001.mp3` | 2.717 s | 60347 B | “Could you wait by the door, please? I need both hands.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `LC02-02` | `LISTENING CHALLENGE` | LC02 informal market instruction | `ch01_s04` | supporting speaker 02 | `Hugo` | `WAppqUXeqDqXjNTaQxG9` | `not provided` | `assets/audio/listening/ch01_lc02_002.mp3` | 5.433 s | 103815 B | “Oi, Sam, hold the cart! I'm coming through.” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `LC02-03` | `LISTENING CHALLENGE` | LC02 formal information request | `ch01_s04` | supporting speaker 03 | `Ruby` | `Q6HPFg7bazU61NeyrvBp` | `not provided` | `assets/audio/listening/ch01_lc02_003.mp3` | 3.187 s | 67871 B | “Good evening. May I ask whether the meeting has started?” | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `AM01` | `AMBIENCE` | Continuous contextual ambience | `ch01_s01`–`ch01_s04` | none | not applicable | not applicable | not applicable | `assets/audio/ambience/covent-garden-rain-market-001.mp3` | 30.067 s | 497951 B | `NO SPEECH` — rain on paving, covered market movement, distant calls, footsteps. | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `AM10` | `AMBIENCE` | Evening contextual ambience with crossfade | `ch01_s05` | none | not applicable | not applicable | not applicable | `assets/audio/ambience/covent-garden-evening-001.mp3` | 30.067 s | 497951 B | `NO SPEECH` — light evening market, receding rain, shop door, distant footsteps. | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |
| `AM04-SFX` | `SFX` | One-shot fallen flowers SFX | `ch01_s02` | none | not applicable | not applicable | not applicable | `assets/audio/sfx/flowers-fall-001.mp3` | 2.534 s | 57422 B | `NO SPEECH` — basket bump, stems and flowers hitting wet paving, brief crowd reaction. | `GENERATED / LOCAL / TECHNICALLY VERIFIED` | `HUMAN QA PENDING` |

## Ambience and SFX runtime mapping

- `covent_garden_rain_market` → `ch01_s01`–`ch01_s04` → `assets/audio/ambience/covent-garden-rain-market-001.mp3`; continuous ambience, not restarted during ordinary scene transitions.
- `covent_garden_evening_light_rain` → `ch01_s05` → `assets/audio/ambience/covent-garden-evening-001.mp3`; use a gentle crossfade from the previous ambience.
- `flowers_fall` → `ch01_s02` → `assets/audio/sfx/flowers-fall-001.mp3`; one-shot over the running rain ambience, without restarting it.

## Technical QA evidence

The local audit confirmed:

- 16/16 canonical MP3 files are present;
- every file is greater than 0 B;
- every file has valid MP3 frame structure;
- no XML/HTML error files are present;
- no `.download`, `.tmp`, or `.part` files are present;
- no accidental byte-identical duplicates are present;
- no unexpected MP3 files are present.

Technical verification is separate from subjective human listening QA. A04, A05, and A06 have explicit human approval, including confirmed Kelvin continuity between A05 and A06; the remaining unreviewed assets stay `HUMAN QA PENDING` until reviewed.

## QA cleanup

The human-approved Kelvin A05 and A06 bytes were installed into their canonical paths and hash-verified. Temporary Higgins A/B files were then removed. No temporary Higgins QA asset remains in `assets/audio/` or runtime routing.
