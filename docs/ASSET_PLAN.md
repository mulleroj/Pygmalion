# Asset Plan

## Principy

Assety jsou předgenerované, vlastní a uložené lokálně. V bootstrap fázi se pouze připravují adresáře a naming convention; negeneruje se žádné finální audio ani artwork.

## Adresářová struktura

```text
assets/
├── images/
│   ├── covers/
│   │   └── pygmalion-book-cover-b2.png
│   ├── characters/
│   │   └── eliza/
│   └── locations/
└── audio/
    ├── characters/
    │   ├── eliza/
    │   ├── higgins/
    │   ├── pickering/
    │   ├── mrs-pearce/
    │   ├── freddy/
    │   ├── narrator/
    │   └── supporting/
    ├── listening/
    ├── pronunciation/
    ├── sfx/
    └── ambience/
```

## Naming convention

### Audio

Scénové character audio používá:

`{speaker}_ch{chapter}_scene{scene}_{take}.mp3`

Příklad: `eliza_ch01_scene02_001.mp3`

Platí: `audio moment != audio file`. Jeden audio moment může obsahovat více stop, speakerů, replay variant nebo jazykových ukázek; manifest a scéna proto nesmí předpokládat vztah 1:1.

Doporučené doplňky:

- lowercase ASCII a pomlčky pouze tam, kde jsou součástí významového názvu;
- kapitoly a scény vždy dvoumístně (`ch01`, `scene02`);
- pořadí take vždy třímístně;
- přepis ukládat vedle audia pod stejným základem, například `eliza_ch01_scene02_001.txt` nebo v budoucím datovém manifestu;
- voice a režijní metadata udržovat v textové evidenci, ne pouze v názvu souboru.

### Character visuals

`eliza_{stage}_{descriptor}.webp`

Příklady:

- `eliza_flower-girl_defiant.webp`
- `eliza_training_focused.webp`
- `eliza_after_confident.webp`

Všechny varianty musí zachovat rozpoznatelnou stejnou osobu podle `.codex/skills/pygmalion-adventure/references/visual-bible-eliza.md`.

## Audio architecture

Scene map používá více mluvčích než původní bootstrap adresáře. Plánovaná struktura proto odděluje character voices od didaktických a zvukových kategorií:

- `assets/audio/characters/eliza/`
- `assets/audio/characters/higgins/`
- `assets/audio/characters/pickering/`
- `assets/audio/characters/mrs-pearce/`
- `assets/audio/characters/freddy/`
- `assets/audio/characters/narrator/`
- `assets/audio/characters/supporting/`
- `assets/audio/listening/`
- `assets/audio/pronunciation/`
- `assets/audio/sfx/`
- `assets/audio/ambience/`

Adresáře jsou plánovací cílová struktura; v této fázi se nevytvářejí finální audio soubory ani aplikační manifest/JSON.

Budoucí textový audio manifest bude pro každý asset nebo variantu evidovat:

- asset ID;
- scene ID;
- speaker;
- canonical voice ID, pokud existuje;
- text/transcript;
- delivery direction;
- file path;
- accessibility transcript;
- approval status.

Manifest může odkazovat na více souborů v rámci jednoho audio momentu.

## Počáteční asset backlog

### Book cover

- Runtime cover artwork: `assets/images/covers/pygmalion-book-cover-b2.png` (1024 × 1536 PNG).
- Generation ID: `exec-e5e5478e-dd36-4699-844c-baee0a8273a8`.
- Imported from the approved B2 candidate at `C:/Users/mulle/.codex/generated_images/01a11d3b-fdaa-7060-af80-0258c2035830/exec-e5e5478e-dd36-4699-844c-baee0a8273a8.png`; copied without image edits or re-encoding.
- Direction: full-book Edwardian floral emblem with the approved Flower Girl Eliza identity. Candidate B2 is approved for this opening-flow implementation; this record does not imply final artwork approval.
- The cover is decorative artwork with descriptive alternative text. It does not replace the canonical Flower Girl master or any chapter scene artwork.

### Characters – Eliza

- Flower Girl: defiant, alert, spontaneous, listening;
- In Training: focused, uncertain, practicing;
- Her Own Voice: confident, independent, conflicted;
- případné expression varianty musí měnit výraz a držení těla, ne základní identitu.

### Locations

- Covent Garden v dešti;
- portico / místo úkrytu;
- květinářství nebo jeho okolí;
- pozdější tréninkový prostor;
- recepce.

### Audio

- Eliza: BEFORE, DURING a AFTER projevy podle audio bible;
- Higgins: první poslechové instrukce a ukázky registru;
- Pickering: dialogové a kulturně kontextové repliky;
- Mrs Pearce, Freddy a supporting: selektivní dialogové momenty podle scene map;
- narrator: krátké přechody a případné Teacher Mode vysvětlivky;
- listening: `Higgins' Ear`, social inference a replay ukázky;
- pronunciation: phonetics, minimal pairs, word stress, sentence stress a intonation;
- SFX: déšť, ulice, dveře, mince, květiny a jemné přechodové zvuky bez závislosti na zvuku jako jediném nosiči informace;
- ambience: Covent Garden, Higginsův dům, Lambeth Public Rooms, večerní ulice a závěrečné větve.

Každý pedagogicky důležitý audio asset potřebuje přepis a jasné ovládání replay. Před schválením kontrolovat hlasovou kontinuitu, srozumitelnost, délku, licenci/původ a vazbu na konkrétní scénu.

## Scene-map derived planning totals

`docs/SCENE_MAP.md` plánuje 31 hlavních scén, 60 prioritních audio momentů a 15 language/listening challenges. Audio backlog proto počítá s krátkými, selektivně namluvenými momenty `VOICE`, `LISTENING`, `PRONUNCIATION`, `SFX` a `AMBIENCE`, nikoli s namluvením každé věty.

Character visuals zůstávají ve třech canonical fázích (`Flower Girl`, `In Training`, `Her Own Voice`) s variantami výrazu a držení těla. Pro Chapter V je potřeba vlastní prostředí `Lambeth Public Rooms` a pro Chapter VI tři větevní varianty prostředí; žádná z nich nemá kopírovat scénografii `My Fair Lady`.
