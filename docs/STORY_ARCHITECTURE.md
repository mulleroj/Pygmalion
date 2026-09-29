# Story Architecture

Detailní scene map všech kapitol je canonical v [`SCENE_MAP.md`](SCENE_MAP.md). Tento dokument drží pouze stabilní top-level architekturu, hodnoty a schválený směr Chapter I; nezdvojuje jednotlivé scény.

Teacher Mode je povinná chapter-level contextual support vrstva pro všech šest kapitol. Jeho canonical kontrakt, jednotná struktura, budoucí header placement a progress-safe preview jsou v [`TEACHER_MODE_SPEC.md`](TEACHER_MODE_SPEC.md).

## Canonical presentation model

Pygmalion Adventure je `interactive illustrated storybook / story adventure`, nikoli audio-first listening application.

`BOOK FIRST → AUDIO ENHANCED → CONTEXTUAL AMBIENCE`

Třetí princip je `CONTEXTUAL AMBIENCE`: jemná, volitelná scénická vrstva pro průběh čtení. Ambient se mění podle prostředí, ale nenese kritický story obsah. Detailní chování je canonical v [`AUDIO_AND_AMBIENCE_SPEC.md`](AUDIO_AND_AMBIENCE_SPEC.md).

Každá scéna musí fungovat jako čitelná část digitální knihy. Hráč musí být schopen celý příběh číst, pochopit, rozhodovat se, pokračovat mezi scénami a dokončit kapitolu se zvukem vypnutým. Ilustrace a player-facing text jsou primární story presentation; audio je podpůrná vrstva.

## Hlavní herní smyčka

`Read / Story → Decision or Challenge → Consequence → Transition`

Každá významná sekvence má hráči nabídnout čitelný příběhový kontext, ilustraci, volbu nebo explicitní jazykovou challenge a důsledek. Listening je povinný pouze uvnitř explicitně označené listening challenge; běžný story dialog zůstává čitelný. Důsledky nemusí být trest; mohou změnit scénu, dostupnou možnost, Elizinu sebedůvěru nebo podobu jejího dalšího vývoje.

Story engine contract pro budoucí implementaci je:

`chapter → scene → illustration → readable narrative/dialogue → decision/challenge`

Audio se k těmto částem připojuje jako volitelná story voice, explicitní listening challenge nebo doplňková atmosphere/SFX vrstva.

## Hodnoty vývoje

Hra sleduje tři propojené hodnoty:

- `Pronunciation` – schopnost vědomě pracovat s výslovností a srozumitelností;
- `Confidence` – ochota mluvit, reagovat a vstupovat do situace;
- `Independence` – schopnost volit vlastní cestu a nenechat svou hodnotu definovat okolím.

Nejde o jednoduché good/bad statistiky. Jejich kombinace vytvářejí různé legitimní podoby Elizina vývoje a nemají redukovat její příběh na „opravu“ přízvuku.

Pravidla pro interní development signals, jednorázové eventy, replay a budoucí balance audit jsou canonical v [`game-design-rules.md`](../.codex/skills/pygmalion-adventure/references/game-design-rules.md). Detailní Ending Synthesis Matrix je v `SCENE_MAP.md`.

## Kapitoly

1. **The Flower Girl** – Covent Garden, déšť, lidé pod portikem; první setkání s Freddym, Higginsem a Pickeringem, první `Higgins' Ear` challenge a volba hlavní motivace.
2. **The Bargain** – rozhodnutí, jaké podmínky a příležitost Eliza skutečně přijme; důraz na její agenturu a hranice.
3. **The Lessons** – proces učení, opakování a chyb; rozdíl mezi technickou dovedností, společenským očekáváním a Eliziným vlastním rozhodnutím.
4. **The First Test** – první veřejná zkouška registru a poslechu, kde výsledek závisí na kombinaci dovednosti, sebejistoty a volby strategie.
5. **The Reception** – společenské prostředí, ve kterém je úspěch zvenčí lákavý, ale zároveň vzniká otázka, kdo Elizu definuje.
6. **Her Own Voice** – vyústění, v němž Eliza vědomě volí, jak bude mluvit a žít; možné legitimní směry jsou `Social Success`, `Independent Voice` a `Integrated Identity`.

Podrobná mapa používá pro Chapter VI tři kvalitativní směry: `Social Success`, `Independent Voice` a `Integrated Identity`. Nejde o good/neutral/bad pořadí; všechny větve zachovávají Elizinu agency.

## Chapter I – schválený směr

### Prostředí

Covent Garden za deště. Lidé se ukrývají pod portikem, zatímco Eliza prodává květiny.

### Zásadní beaty

- Eliza prodává květiny;
- setká se s Freddym;
- Higgins si zapisuje její řeč;
- Eliza pronese: `I ain't done nothing wrong. I'm a good girl, I am.`;
- objeví se Pickering;
- Higgins dokáže podle řeči určit původ lidí;
- hráč absolvuje první `Higgins' Ear` listening challenge;
- Eliza se dívá na květinářství a uvědomuje si souvislost jazyka a společenských příležitostí;
- hráč volí hlavní motivaci: `Opportunity`, `Respect`, `Learning` nebo `Independence`.

Cockney nesmí být prezentováno jako hloupá, vadná nebo morálně horší angličtina. Význam první kapitoly je v objevení vztahu mezi jazykem, přístupem k příležitostem a osobní volbou.

## Kontinuita postavy

Eliza je přibližně 19–22 let. Je inteligentní, temperamentní, pohotová, hrdá, někdy obranná, výrazně živá a nikdy pasivní nebo ubohá. Její sociální původ není morální ani intelektuální nedostatek.

Vývoj má směřovat od spontánní energie a sociálního omezení ke zručnosti, sebeuvědomění a schopnosti volit. Nejde o oblouk `ugly → beautiful`.
