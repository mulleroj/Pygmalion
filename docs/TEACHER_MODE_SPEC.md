# Teacher Mode Specification

## Status and authority

Tento dokument je canonical specifikace Teacher Mode pro všech šest kapitol projektu `pygmalion-adventure`. Je dokumentačním kontraktem pro budoucí UI a story engine; v této fázi neobsahuje implementaci headeru, panelu, routingu, replay ani progress UI.

Teacher Mode navazuje na UX princip známý z předchozí vzdělávací adventure `Dorian Gray Adventure`: učitel má konzistentní, stále dostupný kontextový vstup v rámci stejné hry. Nekopíruje jeho kód ani vizuální identitu.

Základní princip:

`student plays → teacher opens contextual support from the same chapter`

## 1. Shared UX contract

### Vstupní místo

- Pracovní label: `Teacher Mode` nebo kratší `Teacher`; finální label zůstává otevřený.
- Desktop: ovládací prvek je v pravé části hlavní hlavičky a má jednotné umístění napříč všemi story routes.
- Mobil: zůstává stále dostupný bez horizontálního overflow; přípustný je kratší label nebo ikona s accessible label.
- Teacher control je vizuálně čitelný, ale méně dominantní než hlavní herní rozhodnutí.
- Nesmí být schovaný hluboko v hamburger menu, pokud to není nutné při extrémně malé šířce.
- Přístup je oddělený od běžných hráčských choices a samotné otevření nemění story state.

### Kontext

Teacher Mode vždy zná:

- aktuální kapitolu;
- aktuální scénu;
- případný aktuální challenge;
- zda učitel pouze čte kontext, nebo žádá bezpečný preview/replay.

Minimální budoucí kontextový kontrakt je `chapterId`, `sceneId`, volitelný `challengeId` a `previewMode`. Otevření během Chapter III proto zobrazí primárně Chapter III, nikoli obecný obsah projektu.

### Přístupnost

Budoucí UI musí podporovat:

- keyboard access;
- viditelný focus;
- Escape pro zavření dialogu/panelu, pokud je použit;
- návrat focusu na Teacher control;
- screen-reader label;
- scrollovatelný dlouhý obsah;
- žádnou kritickou informaci pouze barvou;
- přístup k transcriptům audio ukázek.

### Progress safety

- Otevření Teacher Mode je read-only vůči studentovu progressu.
- `Open / Replay Scene` je budoucí preview funkce; replay musí běžet v izolovaném preview režimu a nesmí zapisovat `Dxx`, `LCxx`, development signals ani ending state.
- Učitel může číst odpovědi a metodické poznámky, ale běžná hra je studentovi nesmí odhalovat.
- Zavření Teacher Mode obnoví předchozí fokus a story context bez přepočtu stavu.

## 2. Shared chapter section structure

Každá kapitola používá stejnou strukturu níže. Obsah se váže k aktuální kapitole a může se zúžit na konkrétní scénu nebo challenge.

1. `Chapter Overview`
2. `Learning Goals`
3. `Language Focus`
4. `Listening Focus`
5. `Key Vocabulary`
6. `Cultural / Literary Context`
7. `Decisions – Teacher Notes`
8. `Challenge Key`
9. `Discussion Questions`
10. `Sensitive Framing`
11. `Suggested Classroom Use`
12. `Scene Navigation`

Answer key existuje pouze u objektivně vyhodnotitelných listening/pronunciation úloh. U register, identity a motivation choices je uvedeno `open choice – no answer key`.

## 3. Development and progress view

Teacher Mode může na konci kapitoly nebo hry zobrazit popisnou rekapitulaci:

- zvolené strategie;
- absolvované challenges;
- použité registry;
- původní a potvrzenou motivaci;
- důležitá rozhodnutí a jejich narativní projevy.

`Pronunciation`, `Confidence` a `Independence` jsou interní development signals. Teacher Mode je nesmí zobrazovat jako známku, numerické skóre, percentage ranking nebo psychologický profil, například `Pronunciation 72 % – weak`.

Konceptuální development view:

`Flower Girl → In Training → Her Own Voice`

Význam:

`repertoire expands → confidence grows → choices become more deliberate`

Nikdy nepoužívat rámec `bad English → good English` ani `poor girl → proper lady`. Vizuální varianty musí respektovat visual bible a ve všech fázích zobrazovat stejnou Elizu.

## 4. Chapter I – The Flower Girl

### 1. Chapter Overview

Eliza prodává květiny v deštivém Covent Garden, setká se s Freddym, Higginsem a Pickeringem a poprvé slyší, že lidé čtou z řeči společenský původ. Dramatickým účelem je založit její agency a otázku, zda může jazyk rozšířit její příležitosti. V jejím vývoji vzniká historická `origin_motivation`.

### 2. Learning Goals

- rozlišit základní intention a social context v krátkém poslechu;
- reagovat na omluvu nebo škodu přímou i zdvořilou žádostí;
- poznat, že registr a přízvuk nejsou měřítkem inteligence;
- pojmenovat vlastní motivaci: `Opportunity`, `Respect`, `Learning`, `Independence`.

### 3. Language Focus

- vocabulary: flowers, market, rain, basket, money, apology;
- functional language: asking for help, accepting or questioning an apology;
- register: direct, polite, defensive;
- pronunciation/listening: intonation of apology and request, první `Higgins' Ear`;
- discourse: first impression and social inference.

### 4. Listening Focus

Žák má rozeznat apology vs excuse, přímý požadavek, míru formálnosti a intenci krátké repliky. Higginsův poslech ukazuje, že hearing an accent není judging a person. Platí `Accent ≠ intelligence.`

### 5. Key Vocabulary

`flower`, `basket`, `drop`, `apology`, `help`, `listen`, `guess`, `opportunity`, `respect`.

### 6. Cultural / Literary Context

Příběh je vlastní vzdělávací adaptace inspirovaná hrou *Pygmalion* George Bernarda Shawa. Teacher Mode může stručně vysvětlit Edwardian London, Covent Garden, sociální třídu a vztah jazyka k zaměstnání. Nesmí přebírat dialogy, písně, scénář ani vizuální identitu `My Fair Lady`.

### 7. Decisions – Teacher Notes

- `D01` zkoumá, zda Eliza při škodě požádá o pomoc, pojmenuje problém nebo rychle obnoví obchod. Všechny možnosti jsou legitimní; mohou změnit lokální `Confidence`/`Independence` stopu.
- `D02` zkoumá, jak reaguje na Higginsovo pozorování: otázkou, žádostí o vysvětlení nebo odmítnutím. Později se může projevit v `higgins_first_impression`.
- `D03` ukládá `origin_motivation`. Nejde o správnou odpověď ani o počáteční ranking.

### 8. Challenge Key

- `LC01`: správná interpretace je rozlišit omluvu od výmluvy podle intence a kontextu; běžná chyba je hodnotit pouze jednotlivé slovo bez tónu.
- `LC02`: správné řešení je identifikovat situaci, vztah nebo formálnost z dostupných hlasových a textových signálů. Nelze správně odpovídat „inteligence mluvčího“; to není jazyková kategorie.

Signature line je vlastní adaptovaný moment, ne obecný answer key. Teacher Mode ji může použít k diskusi o sebeobraně a registru, nikoli jako model „správné“ angličtiny.

### 9. Discussion Questions

- Why do people make quick judgments from the way someone speaks?
- Can a direct request still be polite?
- What can `Opportunity`, `Respect`, `Learning` and `Independence` mean for Eliza?
- Stronger group: How is hearing a dialect different from judging a person?

### 10. Sensitive Framing

Cockney není známka nižší inteligence. Standard pronunciation není měřítkem hodnoty člověka. Sociální předsudek je téma světa a postav, ne pravidlo, podle kterého hra hodnotí Elizu.

### 11. Suggested Classroom Use

Samostatná hra nebo práce ve dvojici: přibližně `20–30 min gameplay + 10 min discussion`. Učitel může společně přehrát `LC01` nebo `LC02` s transcript support a poté nechat žáky obhájit různé legitimní reakce.

### 12. Scene Navigation

| Scene ID | Scene title | Decisions | Challenges | Language focus | Audio moments |
| --- | --- | --- | --- | --- | --- |
| `ch01_s01` | Under the Portico | — | — | sales pitch, first impression | `AM01–AM02` |
| `ch01_s02` | The Fallen Flowers | `D01` | `LC01` | apology, direct/polite request | `AM03–AM04` |
| `ch01_s03` | The Notebook | `D02` | — | self-defence, observation vs judgment | `AM05–AM06` |
| `ch01_s04` | Higgins' Ear | — | `LC02` | register, social inference | `AM07–AM08` |
| `ch01_s05` | A Window of Possibility | `D03` | — | motivation and opportunity | `AM09–AM10` |

## 5. Chapter II – The Bargain

### 1. Chapter Overview

Eliza sama přijde k Higginsovi, chce si zaplatit lekce a vyjedná podmínky. Dramatickým účelem je ukázat peníze, jazyk a hranice jako součást sociální hodnoty. Její motivace se může potvrdit, zpřesnit nebo změnit; `origin_motivation` zůstává historická.

### 2. Learning Goals

- formulovat request s jasným cílem;
- rozlišit direct, polite a polite-with-boundary forms;
- požádat o clarification;
- rozpoznat nabídku, podmínku a hodnocení v rozhovoru;
- vysvětlit, proč změna motivace není chyba.

### 3. Language Focus

- vocabulary: lesson, price, terms, pay, condition, schedule, respect;
- functional language: `I would like…`, `Could you explain…`, `I need…`, boundary statements;
- grammar: question forms, polite modals, reasons and future intention;
- register: formal/informal requests, directness and negotiation;
- pronunciation: srozumitelnost requestu, ne „oprava“ identity.

### 4. Listening Focus

Žák má rozpoznat, zda mluvčí nabízí, hodnotí nebo stanovuje podmínku, a kdy je žádost skutečně zdvořilá. Učitel připomene, že hearing a formal register neznamená judging a person.

### 5. Key Vocabulary

`lesson`, `price`, `pay`, `term`, `condition`, `explain`, `agree`, `boundary`, `purpose`.

### 6. Cultural / Literary Context

Poznámky mohou propojit Edwardian employment, peníze, gender expectations a přístup ke vzdělání. Higginsův experiment je v této adaptaci záměrně vyvažován Pickeringem a Mrs Pearce. Nejde o kopírování konkrétní scény z `My Fair Lady`.

### 7. Decisions – Teacher Notes

- `D04` zkoumá, jak Eliza žádá o lekce. Všechny tři strategie mohou být účinné; mění `request_strategy` a případné narativní nuance.
- `D05` zapisuje `confirmed_motivation`. V book-first checkpointu S05 (2026-10-01) zachovává `motivation_shift` i `motivation_nuance` beze změny; zapisuje perspektivu, nikoli dosažený výkon. Neexistuje consistency bonus ani penalty.

### 8. Challenge Key

- `LC03`: správné řešení zachová stejný účel žádosti a přidá zdvořilý form; běžná chyba je zaměnit polite za nejasné nebo podřízené.
- `LC04`: správné řešení určí speech act jako offer, evaluation nebo condition podle kontextu; běžná chyba je číst každou autoritativní repliku jako nabídku.

`D04` a `D05` jsou otevřené identity/motivation choices a nemají answer key.

### 9. Discussion Questions

- Can direct language still be polite?
- What makes a request clear?
- Why should Eliza be able to change her reason for learning?
- Stronger group: When does a condition become unfair?

### 10. Sensitive Framing

Zaplatit si výuku je Elizina iniciativa, ne odměna za to, že přijala cizí normu. Formal language může pomoci v konkrétní situaci, ale nemění hodnotu jejího původního hlasu.

### 11. Suggested Classroom Use

Práce ve dvojicích: jeden žák hraje request, druhý adresáta; poté krátký replay `LC03`/`LC04` a diskuse. Orientačně `25 min gameplay + 10–15 min role-play/discussion`.

### 12. Scene Navigation

| Scene ID | Scene title | Decisions | Challenges | Language focus | Audio moments |
| --- | --- | --- | --- | --- | --- |
| `ch02_s01` | The Door She Chooses | `D04` | `LC03` | requests, polite forms | `AM11–AM12` |
| `ch02_s02` | Terms on the Table | — | `LC04` | offer, condition, evaluation | `AM13–AM14` |
| `ch02_s03` | Mrs Pearce's Questions | — | — | clarification, boundaries | `AM15–AM16` |
| `ch02_s04` | The Price of a Lesson | — | — | money, agreement | `AM17–AM18` |
| `ch02_s05` | Why I Am Here | `D05` | — | purpose, self-advocacy | `AM19–AM20` |

## 6. Chapter III – The Lessons

### 1. Chapter Overview

Nejvýraznější jazyková kapitola propojuje phonetics, listening, minimal pairs, word stress, sentence stress, intonation, frustraci a pokrok. Dramatickým účelem je ukázat, že technická dovednost pomáhá v situaci, ale nevyčerpává Elizinu identitu.

### 2. Learning Goals

- vnímat místo tvoření hlásek;
- rozlišit minimal pair v kontextu;
- najít hlavní přízvuk ve víceslabičném slově;
- oddělit word stress od sentence stress;
- použít intonation pro otázku, nabídku, výzvu nebo obranu;
- přijmout a vyžádat si supportive feedback;
- použít dovednost mimo izolované cvičení.

### 3. Language Focus

- vocabulary: sound, mouth, tongue, stress, syllable, repeat, meaning, clear;
- pronunciation: phonetics, minimal pairs, word stress, sentence stress, intonation;
- functional language: asking for another example, slowing down, self-correction;
- register: careful vs spontaneous delivery;
- discourse: repair and feedback.

### 4. Listening Focus

Žák má rozeznat konkrétní zvukový rozdíl, hlavní přízvuk ve slově, větný důraz a intonační záměr. Teacher Mode musí výslovně oddělit `word stress` jako vlastnost slova od `sentence stress` a `intonation` jako práce s významovým fokusem, postojem a mírou jistoty.

### 5. Key Vocabulary

`sound`, `syllable`, `stress`, `clear`, `repeat`, `slow down`, `meaning`, `question`, `answer`, `correct`.

### 6. Cultural / Literary Context

Teacher Mode může krátce vysvětlit, že fonetické učení souvisí s přístupem k příležitostem, ale technická norma není morální norma. Jazyková práce je vlastní pedagogická interpretace, nikoli kopie výukového mechanismu z muzikálu.

### 7. Decisions – Teacher Notes

- `D06` zkoumá practice preference: opakování, vizuální příklad nebo vlastní slova. Změní způsob podpory, ne hodnotu osoby.
- `D07` zkoumá volbu pečlivého, spontánního nebo smíšeného projevu. Učitel nemá označovat jednu strategii za nejlepší; později se projeví v `intonation_strategy`.

### 8. Challenge Key

- `LC05`: správně určit relevantní místo tvoření a další artikulační krok; běžná chyba je soustředit se na grafický tvar místo zvuku.
- `LC06`: správně rozlišit slyšený kontrast minimal pair a potvrdit význam v kontextu; replay není další odměna.
- `LC07`: správně najít lexikální hlavní stress ve víceslabičném slově; významový kontrast se uznává jen u jazykově platného páru. Word stress sám nemění postoj ani jistotu.
- `LC08`: objektivní část určí, zda intonation odpovídá zamýšlenému speech act; otevřená volba stylu nemá jedinou správnou odpověď.
- `LC09`: správně rozpoznat supportive correction vs insult podle slov, tónu a kontextu.
- `LC10`: správně přenést několik naučených znaků do objednávky tak, aby byla srozumitelná; přesný osobní registr zůstává otevřený.

### 9. Discussion Questions

- What is the difference between word stress and sentence stress?
- How can a teacher correct a sound without judging a person?
- Is asking for a slower explanation a sign of weakness?
- Stronger group: When does careful speech help, and when can spontaneity help more?

### 10. Sensitive Framing

Word stress, sentence stress a intonation jsou nástroje srozumitelnosti a významu. Nejsou důkazem, že původní Cockney je vadný. Self-correction má být podporou, nikoli trestem.

### 11. Suggested Classroom Use

Společný poslech s replay a transcript support, poté práce ve dvojicích na jedné situaci. Orientačně `25–35 min gameplay + 10–15 min guided practice`; učitel může vybrat jednu challenge, neprocházet všechny izolovaně.

### 12. Scene Navigation

| Scene ID | Scene title | Decisions | Challenges | Language focus | Audio moments |
| --- | --- | --- | --- | --- | --- |
| `ch03_s01` | The Mouth Is a Muscle | `D06` | `LC05` | phonetics, feedback | `AM21–AM22` |
| `ch03_s02` | The Listening Room | — | `LC06` | minimal pairs | `AM23–AM24` |
| `ch03_s03` | Finding the Main Stress | — | `LC07` | word stress, syllables | `AM25–AM26` |
| `ch03_s04` | A Sentence Has Shape | `D07` | `LC08` | sentence stress, intonation | `AM27–AM28` |
| `ch03_s05` | The Bad Day | — | `LC09` | supportive feedback, repair | `AM29–AM30` |
| `ch03_s06` | A Small Victory | — | `LC10` | transfer to real interaction | `AM31–AM32` |

## 7. Chapter IV – The First Test

### 1. Chapter Overview

Eliza použije nově naučený způsob řeči v malém společenském setkání. Zjistí, že perfektní pronunciation nestačí, pokud nerozumí turn-taking, implied meaning nebo účelu situace. Kapitola rozšiřuje její repertoár, ne opravuje její osobnost.

### 2. Learning Goals

- zahájit, držet a ukončit small talk;
- rozeznat literal meaning a intended meaning;
- použít social repair po nedorozumění;
- spojit pronunciation s audience awareness;
- vnímat, že communicative competence je širší než výslovnost.

### 3. Language Focus

- vocabulary: weather, name, guest, joke, quiet, answer, explain;
- functional language: follow-up question, polite closing, repair and clarification;
- register: small talk, careful vs spontaneous;
- discourse: turn-taking, implied meaning, humor;
- pronunciation: srozumitelnost pod mírným tlakem.

### 4. Listening Focus

Žák má slyšet, zda host rozhovor otevírá, drží nebo ukončuje, a kdy je věta literal joke nebo social signal. Teacher Mode rozlišuje hearing intonation od judging personality.

### 5. Key Vocabulary

`weather`, `pleased`, `perhaps`, `really`, `I see`, `excuse me`, `what do you mean?`, `just a joke`.

### 6. Cultural / Literary Context

Small talk v Edwardian social setting může fungovat jako bezpečný rituál, ale zároveň ukazuje přístup k moci a příslušnosti. Chyba v sociální inference není důkaz hlouposti.

### 7. Decisions – Teacher Notes

- `D08` zkoumá plán prvního testu: pečlivý registr, přepínání podle adresáta nebo spontánní začátek. Uloží `first_test_strategy`.
- `D09` zkoumá social repair po doslovné odpovědi. Všechny varianty jsou legitimní; uloží `recovery_style` a mohou ovlivnit pozdější formulaci.

### 8. Challenge Key

- `LC11`: správně určit, zda signál small talk otevírá, drží nebo ukončuje turn; běžná chyba je položit další otázku po jasném closing signal.
- `LC12`: správně odlišit literal content od implied joke/meaning v kontextu; vlastní styl opravy nemá answer key.

### 9. Discussion Questions

- When do you change the way you speak?
- Can a perfect pronunciation still cause a misunderstanding?
- What can you say after a joke you do not understand?
- Stronger group: Is social repair more important than avoiding every mistake?

### 10. Sensitive Framing

Pronunciation není complete communicative competence. Sociální konvence mohou být nespravedlivé nebo nejasné; hra testuje strategii a porozumění, ne hodnotu člověka.

### 11. Suggested Classroom Use

Práce ve dvojicích s role-play small talku, potom společný replay `LC12`. Orientačně `20–30 min gameplay + 10 min social repair practice`.

### 12. Scene Navigation

| Scene ID | Scene title | Decisions | Challenges | Language focus | Audio moments |
| --- | --- | --- | --- | --- | --- |
| `ch04_s01` | The Invitation | `D08` | — | greeting register, audience | `AM33–AM34` |
| `ch04_s02` | Names and Weather | — | `LC11` | small talk, turn-taking | `AM35–AM36` |
| `ch04_s03` | The Wrong Answer | `D09` | `LC12` | literal/implied meaning, repair | `AM37–AM38` |
| `ch04_s04` | After the Laughter | — | — | reflection, feedback | `AM39–AM40` |
| `ch04_s05` | The Walk Home | — | — | register repertoire | `AM41–AM42` |

## 8. Chapter V – The Reception

### 1. Chapter Overview

Eliza vystoupí na vlastní veřejné události v `Lambeth Public Rooms`, kde se potkají květináři, organizátorka, patroni a více skupin posluchačů. Dramatickým účelem je tlak veřejnosti, code-switching a otázka, kdo si přivlastní její úspěch.

### 2. Learning Goals

- volit formal register podle adresáta;
- poslouchat více sociálních signálů pod tlakem;
- přepnout registr bez vymazání identity;
- formulovat nárok na vlastní práci a kredit;
- položit otázku o budoucnosti.

### 3. Language Focus

- vocabulary: exhibition, audience, programme, credit, work, public, opportunity;
- functional language: introductions, claiming credit, asking about next steps;
- register: formal public speech, colleague talk, strategic code-switching;
- discourse: social inference, audience awareness, active/passive framing;
- pronunciation: srozumitelnost v ruchu.

### 4. Listening Focus

Žák má slyšet vztah a účel mluvčích, míru formálnosti a rozdíl mezi uznáním Eliziny práce a přivlastněním experimentu. Teacher Mode připomíná, že code-switching je dovednost a hearing a formal register není judging a person.

### 5. Key Vocabulary

`exhibition`, `audience`, `programme`, `welcome`, `credit`, `success`, `work`, `future`, `contact`.

### 6. Cultural / Literary Context

Událost je vlastní fiktivní adaptace, nikoli mechanická obdoba plesu z `My Fair Lady`. Poznámky mohou otevřít language and power, veřejnou práci, social class a gender expectations v Edwardian London.

### 7. Decisions – Teacher Notes

- `D10` zkoumá plán registru pro organizátorku, patrona a kolegyni. Uloží `reception_register_plan`.
- `D11` zkoumá reakci na Higginsovo a Pickeringovo přivlastnění kreditu. Uloží `credit_response`; strategický odklad není špatná volba.

### 8. Challenge Key

- `LC13`: správně určit vztah, účel a vhodný vstup z hlasu, textu a situace. Běžná chyba je zaměnit hlasovou autoritu za pravdivost nebo inteligenci.
- `LC14`: objektivní část ověřuje, zda otázka obsahuje jasný účel a vhodnou míru zdvořilosti; konkrétní přímá/nepřímá formulace je otevřená.

### 9. Discussion Questions

- Who should receive credit for Eliza's success?
- When can changing register be useful?
- How does an audience change the way we speak?
- Stronger group: Can strategic silence be a form of agency?

### 10. Sensitive Framing

Formální registr není vyšší lidská hodnota. Elizin veřejný úspěch nesmí být vyprávěn pouze jako Higginsův experiment. Společenské předsudky jsou předmět kritické diskuse, ne hidden morality systému.

### 11. Suggested Classroom Use

Společný poslech jedné skupiny hostů, práce ve trojicích s různými adresáty a následná diskuse o kreditu. Orientačně `25–35 min gameplay + 10–15 min discussion`.

### 12. Scene Navigation

| Scene ID | Scene title | Decisions | Challenges | Language focus | Audio moments |
| --- | --- | --- | --- | --- | --- |
| `ch05_s01` | The Borough Exhibition Evening | `D10` | — | formal register, audience | `AM43–AM44` |
| `ch05_s02` | Listening Under Pressure | — | `LC13` | social inference, code-switching | `AM45–AM46` |
| `ch05_s03` | The Display and the Question | `D11` | — | claiming credit, active voice | `AM47–AM48` |
| `ch05_s04` | What Happens to Me Now? | — | `LC14` | future question, agency | `AM49–AM50` |
| `ch05_s05` | Leaving the Hall | — | — | options and uncertainty | `AM51–AM52` |

## 9. Chapter VI – Her Own Voice

### 1. Chapter Overview

Eliza po veřejné zkoušce řeší, kdo bude rozhodovat o její další podobě. Chapter VI syntetizuje historii hry a nabídne tři legitimní směry: `Social Success`, `Independent Voice`, `Integrated Identity`. Dramatickým výsledkem je agency a identita, ne známka z výslovnosti.

### 2. Learning Goals

- mluvit o vlastní identitě a budoucnosti;
- volit register podle publika bez sebeznehodnocení;
- shrnout jazykovou strategii a její účel;
- reflektovat původní a potvrzenou motivaci;
- chápat code-switching jako rozšířený repertoár.

### 3. Language Focus

- vocabulary: choice, future, work, identity, voice, community, decide;
- functional language: self-presentation, future plans, boundaries, reflection;
- register: public statement, personal statement, community language;
- discourse: agency, ownership, integrated identity;
- pronunciation: vědomá delivery, ne soutěž o „správný“ přízvuk.

### 4. Listening Focus

Žák při replay rozlišuje změnu tempa, jistoty a registru při zachování stejné hlasové identity. Učitel pomáhá oddělit hearing delivery od judging a person; `Accent ≠ intelligence` zůstává základní princip.

### 5. Key Vocabulary

`choice`, `voice`, `identity`, `future`, `decide`, `community`, `own`, `together`, `different`.

### 6. Cultural / Literary Context

Teacher Mode může spojit accent and identity, employment and opportunity, gender expectations a language and power. Finální směry jsou vlastní adaptace; žádný nekopíruje ending nebo vizuální identitu `My Fair Lady`.

### 7. Decisions – Teacher Notes

- `D12` je explicitní volba směru, nikoli výpočet vítězného skóre. Všechny tři directions zůstávají dostupné.
- `origin_motivation`, `confirmed_motivation`/`motivation_shift`, practice preference, intonation, first-test strategy, recovery, reception plan a credit response mění formulaci, delivery, vedlejší reakce, vizuál, epilog a Teacher summary.
- Nízký interní development signal nesmí směr zablokovat. Teacher Mode nesmí řadit směry od nejlepšího po nejhorší.

### 8. Challenge Key

- `LC15` je integrovaná register/identity choice. Objektivně lze ověřit, zda žák zvolil vhodný adresát, účel a srozumitelný obsah; neexistuje jediný správný osobní registr ani answer key pro identitu.

### 9. Discussion Questions

- Who gets to decide who Eliza becomes?
- Does changing your accent change who you are?
- What is the difference between performing a role and choosing a register?
- Stronger group: How can one person keep several ways of speaking without becoming dishonest?

### 10. Sensitive Framing

Nezobrazovat `bad English → good English` ani `poor girl → proper lady`. Vizuální oblouk `Flower Girl → In Training → Her Own Voice` znamená rozšíření repertoáru, rostoucí sebejistotu a uvážlivější volby. Všechny tři ending directions jsou legitimní.

### 11. Suggested Classroom Use

Samostatná nebo skupinová rekapitulace: žáci porovnají různé ending directions a obhájí jejich jazykovou strategii bez známkování identity. Orientačně `20–30 min gameplay/replay + 15 min reflection`.

### 12. Scene Navigation

| Scene ID | Scene title | Decisions | Challenges | Language focus | Audio moments |
| --- | --- | --- | --- | --- | --- |
| `ch06_s01` | The Morning After | — | — | reading offers, agency | `AM53–AM54` |
| `ch06_s02` | The Question in the Mirror | — | — | reflection, register repertoire | `AM55–AM56` |
| `ch06_s03` | Three Ways Forward | `D12` | `LC15` | integrated register, identity | `AM57–AM58` |
| `ch06_s04` | Her Own Statement | — | — | self-presentation, audience | `AM59–AM60` |
| `ch06_s05` | The Voice She Chooses | — | — | summary and replay | replay of `AM59–AM60` |

## 5. Future implementation checklist

Budoucí UI/story engine musí ověřit:

- Teacher control vpravo v desktop headeru a dostupný na mobile bez overflow;
- stejnou strukturu pro všech šest kapitol;
- chapter/scene/challenge contextuality;
- oddělení teacher answer keys od student gameplay;
- preview replay bez zápisu do student progressu;
- focus management, Escape, transcripty a keyboard/touch access;
- popisný progress summary bez numeric ranking;
- bezpečné rozlišení student save state a učitelova preview state.

Tato specifikace neimplementuje header, Teacher button, modal, drawer, routing, replay ani progress UI.
