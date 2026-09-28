# Pygmalion Adventure – pracovní pravidla

## Stav a rozsah

Projekt `pygmalion-adventure` je ve stavu `PRE-PRODUCTION`. Tato fáze buduje projektovou znalostní základnu, příběhovou architekturu a plán assetů. Webová aplikace, UI, runtime AI a aplikační kód zatím nejsou součástí rozsahu.

## Zdroj pravdy

- Vize projektu a cílová skupina: `docs/PROJECT_VISION.md`
- Příběhové kapitoly a herní smyčka: `docs/STORY_ARCHITECTURE.md`
- Detailní canonical scene map: `docs/SCENE_MAP.md`
- Plán lokálních assetů a naming convention: `docs/ASSET_PLAN.md`
- Stabilní rozhodnutí a pravidla: odpovídající soubor v `.codex/skills/pygmalion-adventure/references/`
- Pravidla práce s těmito materiály: `.codex/skills/pygmalion-adventure/SKILL.md`

Při rozporu mezi obecným popisem a schválenou bible používej konkrétnější a novější schválené rozhodnutí. Nové zásadní rozhodnutí nejprve zapiš do odpovídající bible a teprve potom jej používej v dalších materiálech.

## Povinné mantinely

- Vytvářej vlastní adaptaci, dialogy, grafiku a audio. Nekopíruj scénář, písně, dialogy ani vizuální identitu muzikálu `My Fair Lady`.
- Zachovej Elizinu charakterovou, vizuální, hlasovou a herní kontinuitu. Schválené kontinuity neměň bez explicitního požadavku.
- Hra nesmí označovat Cockney ani jiný sociální registr za důkaz nízké inteligence. Platí `Accent ≠ intelligence`.
- Nepřidávej runtime AI, povinné přihlášení, backend ani externí službu, pokud to nebude výslovně schváleno.
- Preferuj krátké, srozumitelné dialogy, přístupnost, lokální předgenerované assety a jasný Teacher Mode.
- Každý důležitý audio asset musí mít dostupný přepis; žádná kritická informace nesmí být pouze barvou nebo zvukem.

## Workflow

1. Před změnou načti `SKILL.md` a podle typu úkolu příslušné reference.
2. Zkontroluj, zda změna nenarušuje již schválenou kontinuitu nebo copyright hranice.
3. Zásadní rozhodnutí zaznamenej do odpovídající bible, ne pouze do kódu nebo poznámky.
4. U příběhu ověř větvení, hodnoty `Pronunciation`, `Confidence`, `Independence` a návaznost na jazykový cíl.
5. U assetů ověř naming convention, lokální uložení, přepis a přístupnost.
6. V této bootstrap fázi nevytvářej UI ani aplikační kód.

## Release hranice

Bez výslovného požadavku neprováděj commit, push, deploy ani publikaci. Před každým budoucím releasem odděleně ověř testy příběhového větvení, přístupnost, responzivitu, audio replay/transkripty a lokální ukládání progressu.
