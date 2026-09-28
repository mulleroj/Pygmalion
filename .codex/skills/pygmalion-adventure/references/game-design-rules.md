# Game Design Rules

## Smyčka

Každá hlavní sekvence následuje vzor:

`Story → Decision → Listen → Language Challenge → Consequence → Story`

Volby mají být čitelné, důsledky smysluplné a různé výsledky legitimní. Vyhýbej se hidden morality systému, ve kterém je jediná cesta označena jako správná.

## Hodnoty

Používej `Pronunciation`, `Confidence` a `Independence` jako propojené vývojové signály, nikoli jako jednoduché good/bad body. Výsledek může změnit přístup, dialog, registr nebo Elizino rozhodnutí.

## Development signal state rules

- Hodnoty jsou interní development signals, ne známky. Standardní hráčské rozhraní je nemá zobrazovat jako numerické skóre.
- Každý state-changing event má stabilní event ID a započítá se nejvýše jednou.
- Replay audia, opakování language challenge ani opakované načtení scény nesmí přidat stejný increment znovu.
- Chyba v language challenge nesnižuje morální hodnotu Elizy ani hráče.
- Rozdílný počet příležitostí pro hodnoty nesmí automaticky zvýhodnit nebo zablokovat ending.
- Thresholdy pro „výhru“ ani minimální skóre pro ending se v této fázi nezavádějí.

### Current scene-map balance audit

V mapě `docs/SCENE_MAP.md` je v této verzi přibližně 12 potenciálních příležitostí pro `Pronunciation`, 19 pro `Confidence` a 11 pro `Independence`. To je strukturálně nevyvážené pro budoucí raw-threshold systém; čísla nejsou skóre a nesmí se tak použít. Před případným threshold designem je nutné buď vyvážit event opportunities, nebo použít normalizovanou/qualitative synthesis. Ending directions zatím nesmí být na těchto počtech závislé.

## Přístupnost a technický základ

- statický nebo velmi lehký web;
- žádný runtime AI;
- žádné povinné přihlášení;
- lokální předgenerované assety;
- mobile responsive;
- ovládání klávesnicí;
- podpora `prefers-reduced-motion`;
- replay audio a viditelný transkript;
- Teacher Mode;
- lokální ukládání progressu;
- žádná kritická informace pouze barvou nebo zvukem.

## Teacher Mode contract

- Teacher Mode je povinná contextual support vrstva pro všech šest kapitol, nikoli samostatná druhá aplikace.
- Vstup je vpravo v hlavní hlavičce na desktopu; na mobilu zůstává dostupný bez horizontálního overflow, s keyboard/touch access a accessible label.
- Context vždy zná aktuální kapitolu, scénu a případný challenge. Chapter-level struktura je canonical v `docs/TEACHER_MODE_SPEC.md`.
- Otevření Teacher Mode ani teacher preview/replay nesmí měnit student progress, state-changing eventy, development signals ani ending state.
- Answer keys patří do Teacher Mode a nesmí se odhalit během běžné studentské hry. Otevřené register/identity choices nemají answer key.
- Progress summary je popisný; `Pronunciation`, `Confidence` a `Independence` se nesmí zobrazovat jako známky nebo psychologický profil.

Příběhové větvení má být testovatelné automaticky. Datový model a scény mají zůstat čitelné a oddělené od prezentační vrstvy.

## Kontinuita

Schválenou charakterovou, hlasovou nebo herní kontinuitu neměň bez explicitního požadavku. Každé nové zásadní rozhodnutí nejprve zapiš do příslušné bible.
