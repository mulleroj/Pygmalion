# Pygmalion Adventure

**Stav: `LOCAL CHAPTER I VERTICAL SLICE`**

Vzdělávací anglická story adventure pro studenty střední školy na úrovni přibližně A2+/B1. Jde o vlastní adaptaci inspirovanou především hrou *Pygmalion* George Bernarda Shawa. Projekt rozvíjí příběh Elizy prostřednictvím jazyka, hlasu, společenského registru a identity.

Hlavní smyčka:

`Story → Decision → Listen → Language Challenge → Consequence → Story`

Hra bude statická nebo velmi lehká, bez runtime AI. Audio, obrázky a další assety budou předgenerované a uložené lokálně. Součástí návrhu je Teacher Mode, přehrávání a přepis pedagogicky důležitého audia, responzivita, ovládání klávesnicí, `prefers-reduced-motion` a lokální ukládání progressu.

## Dokumentace

- [`AGENTS.md`](AGENTS.md) – pracovní pravidla a release hranice
- [`docs/PROJECT_VISION.md`](docs/PROJECT_VISION.md) – účel, publikum a technická filozofie
- [`docs/STORY_ARCHITECTURE.md`](docs/STORY_ARCHITECTURE.md) – šest kapitol, hodnoty a herní smyčka
- [`docs/SCENE_MAP.md`](docs/SCENE_MAP.md) – detailní canonical mapa scén, rozhodnutí, výzev a assetů
- [`docs/TEACHER_MODE_SPEC.md`](docs/TEACHER_MODE_SPEC.md) – chapter-level Teacher Mode, answer keys, navigace a progress-safe preview
- [`docs/ASSET_PLAN.md`](docs/ASSET_PLAN.md) – počáteční plán obrázků, audia a naming convention

## Projektové bible

- [`visual-bible-eliza.md`](.codex/skills/pygmalion-adventure/references/visual-bible-eliza.md) – Elizina vizuální kontinuita a tři vývojové fáze
- [`story-bible.md`](.codex/skills/pygmalion-adventure/references/story-bible.md) – příběhový základ, Chapter I a Elizina motivace
- [`audio-voice-bible.md`](.codex/skills/pygmalion-adventure/references/audio-voice-bible.md) – canonical hlas Elizy a hlasová kontinuita
- [`game-design-rules.md`](.codex/skills/pygmalion-adventure/references/game-design-rules.md) – herní pravidla a technické principy
- [`language-learning-rules.md`](.codex/skills/pygmalion-adventure/references/language-learning-rules.md) – pravidla jazykového učení a Teacher Mode
- [`copyright-boundaries.md`](.codex/skills/pygmalion-adventure/references/copyright-boundaries.md) – hranice vlastní adaptace

## Aktuální rozsah

Lokální vertical slice obsahuje `Cover → Open the Book → Chapter I → všech 5 scén → ending Chapter I`. Chapter II není součástí runtime a projekt se v tomto checkpointu nedeployuje.

## Implementace

Frontend používá vanilla HTML, CSS a ES modules bez bundleru nebo frameworku. To drží statický Netlify deploy jednoduchý a dovoluje, aby canonical příběhová data, state a audio management zůstaly oddělené a testovatelné. Neexistuje backend ani runtime AI.

- `index.html` – shell aplikace, header, Cover a Teacher dialog
- `styles.css` – storybook layout, responsive behavior, focus states a reduced-motion pravidla
- `src/content.js` – canonical Chapter I scény, copy, decisions, challenges a asset map
- `src/state.js` – lokální progress, idempotentní eventy a save/restore
- `src/audio.js` – centrální ambience, voice, challenge, SFX, ducking a autoplay-safe playback
- `src/app.js` – accessible rendering, hash navigation, Teacher Mode a orchestrace story flow
- `tests/` – content, branching, audio contract a local asset existence tests

Spuštění lokální QA serveru:

```text
python -m http.server 4173
```

Poté otevři `http://localhost:4173/`. Testy se spouštějí příkazem `npm test`.

Audio status: A04, A05, and A06 are `APPROVED / CANONICAL`; remaining unreviewed audio stays `HUMAN QA PENDING`. Technická existence souborů je kontrolována automaticky. Produkční deploy není součástí tohoto checkpointu.
