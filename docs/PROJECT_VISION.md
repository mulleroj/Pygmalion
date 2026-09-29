# Project Vision

## Účel

`Pygmalion Adventure` je vzdělávací interactive illustrated storybook / story adventure v angličtině, inspirovaný především hrou *Pygmalion* George Bernarda Shawa. Je to vlastní adaptace s vlastními dialogy, grafikou a podpůrným audiem. Nejde o kopii scénáře ani o adaptaci muzikálu *My Fair Lady*.

Projekt je především digitální kniha s ilustracemi, scénami, dialogy, rozhodnutími a jazykovými výzvami. Audio rozšiřuje osobnost postav, výslovnost a atmosféru; není základní nosič příběhu.

## Publikum a zkušenost

- studenti střední školy;
- angličtina přibližně A2+/B1;
- krátké a dobře čitelné dialogy;
- celý příběh čitelný a dokončitelný se zvukem vypnutým;
- možnost podpůrné audio kdykoli přehrát znovu;
- Teacher Mode s jazykovým a kulturním kontextem;
- volby s legitimními různými důsledky, nikoli jednoduché rozdělení na správné a špatné.

Základní vzdělávací myšlenka je: `Accent ≠ intelligence.` Přízvuk není měřítkem inteligence. Eliza se neučí proto, aby se z „špatně mluvící“ ženy stala „správně mluvící“. Získává schopnost vědomě měnit jazykový registr a pohybovat se mezi různými sociálními prostředími, aniž by ztratila vlastní hlas.

## Canonical experience model

`BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE`

Třetí princip je `CONTEXTUAL AMBIENCE`: ambientní zvuk je jemná scénická vrstva, která podporuje čtení a mění se podle prostředí, ale nikdy nenahrazuje text ani není nutná pro pochopení příběhu. Canonical kontrakt je v [`AUDIO_AND_AMBIENCE_SPEC.md`](AUDIO_AND_AMBIENCE_SPEC.md).

Pygmalion Adventure není audio-first listening application. Hráč musí být schopen číst, pochopit, rozhodovat se, pokračovat mezi scénami a dokončit Chapter I bez zvuku. Každá běžná story replika a narration zůstává player-facing textem v knize; audio může tutéž repliku doplnit, ale nenahrazuje ji.

Primární činnost je:

`read → understand → choose`

Každá scéna může podle potřeby spojit chapter title, scene title, ilustraci, narration, character dialogue, player decision, language challenge, consequence a transition. Obraz a text tvoří jednu storybook page / scene composition.

## Audio role

Audio se používá ve třech oddělených režimech:

1. **Story voice** – vybrané repliky mohou dodat osobnost, výslovnost a tempo. Jsou vždy `OPTIONAL STORY VOICE` a jejich player-facing text zůstává viditelný.
2. **Listening challenge** – explicitně označené `LCxx` sample mohou být pedagogicky zásadní. Challenge určuje pravidla pro transcript a accessibility; běžný story text se tím nemění na audio-only obsah.
3. **Atmosphere / SFX** – déšť, tržiště, kroky a podobné zvuky jsou doplňkové a nikdy nenesou kritickou informaci potřebnou pro postup.

## Herní princip

Hlavní storybook smyčka je:

`Read / Story → Decision or Challenge → Consequence → Transition`

Příběh představí situaci v čitelném textu a ilustraci. Rozhodnutí nebo explicitní challenge dá hráči příležitost jednat, vnímat rozdíl v registru, výslovnosti či významu. Důsledek ovlivní další scénu, Eliziny dovednosti nebo její vztah k vlastní identitě. Audio se připojuje k příslušné části jako podpůrná interakce.

## Technická vize

- statický nebo velmi lehký web;
- žádná runtime AI;
- předgenerované lokální obrázky jako primární vizuální storytelling;
- předgenerované audio jako podpůrná vrstva;
- žádné povinné přihlášení;
- mobile responsive;
- keyboard accessible;
- respektování `prefers-reduced-motion`;
- replay audio a transkript ke každému pedagogicky důležitému audiu;
- Teacher Mode;
- automatické testování příběhového větvení;
- lokální ukládání progressu;
- žádná kritická informace pouze barvou nebo zvukem;
- player-facing text musí zůstat čitelný bez audia.

## Stav

Projekt je ve fázi `PRE-PRODUCTION`. Nyní se buduje znalostní základna, story architektura a plán assetů. UI, aplikace a runtime implementace přijdou až po samostatném schválení.
