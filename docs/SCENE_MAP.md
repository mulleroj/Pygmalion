# Scene Map

Tento dokument je canonical detailní mapa všech šesti kapitol. Určuje stabilní identifikátory scén, uzly rozhodnutí, jazykové výzvy, dlouhodobě ukládané hodnoty a minimální assetové potřeby. Není to finální dialogový scénář.

Scénově specifické Teacher Mode poznámky zůstávají u jednotlivých scén. Jednotnou chapter-level strukturu, contextualitu, answer keys a progress-safe replay definuje [`TEACHER_MODE_SPEC.md`](TEACHER_MODE_SPEC.md).

### Story Map a nezávislý progress

Všech šest kapitol lze otevřít přímo ze Story Map. Story Map ukládá samostatný checkpoint pro každou kapitolu; `RESUME CHAPTER` obnovuje checkpoint dané kapitoly a `CONTINUE READING` obnovuje naposledy aktivní scénu. Hranice scén a všechny místní volby, výzvy i explicitní Continue zůstávají zachované. Dokončení pozdější kapitoly nevytváří události dokončení dřívějších kapitol. Save envelope, migraci v1 a hash guardy popisuje [`PROGRESS_NAVIGATION_ARCHITECTURE.md`](PROGRESS_NAVIGATION_ARCHITECTURE.md).

## Map conventions

- Hlavní storybook smyčka: `Read / Story → Decision or Challenge → Consequence → Transition`.
- Audio momenty jsou podpůrná metadata. `VOICE` je optional story voice, `SFX` a `AMBIENCE` jsou doplňkové; pouze explicitní `LCxx` listening challenge může vyžadovat poslech.
- Hodnoty `Pronunciation`, `Confidence` a `Independence` jsou vývojové signály, nikoli good/bad nebo morality scores.
- `Dxx` označuje hlavní rozhodnutí; `LCxx` jazykovou nebo poslechovou výzvu; `AMxx` plánovaný audio moment.
- `long-term: ano` znamená, že se volba nebo významný výsledek ukládá do progressu. `long-term: ne` označuje lokální důsledek nebo scénovou stopu.
- Nové dialogy jsou pracovní záměr, pokud konkrétní scene contract výslovně neoznačuje přesný text jako locked. Signature line z Chapter I zůstává jediný pevný text mimo scénové locky.
- Eliza používá pouze canonical vizuální fáze `Flower Girl`, `In Training` a `Her Own Voice`.

## State rules

- `Pronunciation`, `Confidence` a `Independence` jsou interní development signals, ne známky; standardní hráčské rozhraní je nezobrazuje jako numerické skóre.
- Každý state-changing event má stabilní event ID a může přidat změnu nejvýše jednou. Replay, opakování challenge ani opakované načtení scény nesmí stejný increment farmit.
- Chyba v language challenge nesnižuje morální hodnotu Elizy ani hráče.
- Rozdílný počet příležitostí pro jednotlivé hodnoty nesmí sám o sobě odemknout nebo zablokovat ending.
- Thresholdy pro „výhru“ ani minimální skóre pro ending neexistují; Chapter VI ukládá výhradně explicitní `chapter6_direction` a shrnuje ostatní historii popisně.

## Visual continuity across Chapters V–VI

Chapter V může používat `Her Own Voice` jako již dosaženou vizuální fázi pro veřejné vystoupení, nikoli jako tvrzení, že Elizin osobní vývoj skončil. Chapter VI používá tutéž rozpoznatelnou Elizu a završuje její agency a identity synthesis; výraz, outfit a prostředí mohou reagovat na větev, ale nemění canonical osobu.

## Chapter I – The Flower Girl

**Dramatic arc:** Eliza se v dešti brání okamžitému společenskému soudu, poprvé slyší, že řeč může otevírat nebo zavírat příležitosti, a sama pojmenuje důvod, proč chce hledat další možnosti.

**Audio profile:** `VOICE` Eliza, Higgins, Pickering a Freddy; `LISTENING` první `Higgins' Ear`; `PRONUNCIATION` popis slyšených rysů bez hodnocení člověka; `SFX` déšť, tržiště, květiny; `AMBIENCE` Covent Garden a večerní ulice.

### ch01_s01 – Under the Portico

- **Lokace:** Covent Garden, portico u tržiště.
- **Čas / atmosféra:** pozdní deštivé odpoledne; mokrá dlažba, spěch, hluk a krátké úkryty před deštěm.
- **Postavy:** Eliza, kolemjdoucí, prodavači, vzdáleně Freddy.
- **Děj:** Eliza nabízí květiny a snaží se udržet zákazníky navzdory počasí. Hráč nejprve pozná její energii, obchodní instinkt a sociální tlak bez vysvětlování jejího přízvuku jako chyby.
- **Hlavní účel:** představit Elizu jako aktivní protagonistku a nastavit svět, ve kterém registr ovlivňuje přístup k lidem, nikoli lidskou hodnotu.
- **Rozhodnutí hráče:** žádné hlavní; hráč si volí první reakční tón v krátké scénové odpovědi.
- **Možné hodnotové změny:** lokální stopa `opening_tone`; hodnoty bez změny.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM01 SFX` déšť, tržiště a kroky; `AM02 VOICE` Elizin krátký prodejní pitch.
- **Challenge:** žádná; scénový poslech připravuje pozdější rozlišení hlasů.
- **Teacher Mode:** rozdíl mezi pracovním prodejním jazykem, zdvořilostí a společenským statusem.
- **Vizuální assety:** Eliza `Flower Girl / alert`, deštivý Covent Garden, portico, košík s květinami.
- **Audio assety:** `eliza_ch01_scene01_001.mp3`, `sfx_rain_market_001.mp3` a přepisy.
- **Návaznost:** `ch01_s02`.

### ch01_s02 – The Fallen Flowers

- **Lokace:** stejný portico a okraj tržiště.
- **Čas / atmosféra:** déšť zesílí; krátký chaos kolemjdoucích.
- **Postavy:** Eliza, Freddy, kolemjdoucí.
- **Děj:** Freddy nechtěně shodí Eliziny květiny. Eliza musí chránit zboží, důstojnost i možnost prodeje, aniž by scéna označila její přímou řeč za nevychovanou podstatu.
- **Hlavní účel:** ukázat, že přímý jazyk může být legitimní strategie pod tlakem.
- **Rozhodnutí hráče:** `D01` – zvolit reakci: požádat Freddyho o pomoc, důrazně pojmenovat škodu, nebo přijmout omluvu a rychle obnovit prodej.
- **Možné hodnotové změny:** žádná cesta není morálně správná; podle volby krátkodobě `Confidence +1`, `Independence +1` nebo `Confidence +1` při zachování obchodního cíle.
- **Uložení:** `long-term: ne`; uloží se pouze `freddy_first_impression`.
- **Audio momenty:** `AM03 VOICE` Freddyho omluva a ruch kolem; `AM04 LISTENING` rozdíl mezi omluvou a výmluvou.
- **Challenge:** `LC01` – hráč přiřadí intenci ke krátkým omluvám a zvolí odpověď, která zachová Elizinu důstojnost.
- **Teacher Mode:** direct vs polite request; přímý registr není důkaz nižší inteligence.
- **Vizuální assety:** Eliza `Flower Girl / defiant`, rozsypané květiny, Freddyho pozice u portica.
- **Audio assety:** `freddy_ch01_scene02_001.mp3`, `eliza_ch01_scene02_001.mp3`, `sfx_flowers_fall_001.mp3` a přepisy.
- **Návaznost:** `ch01_s03`.

### ch01_s03 – The Notebook

- **Lokace:** pod portikem, u mokré hrany tržiště.
- **Čas / atmosféra:** déšť pokračuje, ale dav se na chvíli zpomalí.
- **Postavy:** Eliza, Higgins, Freddy, Pickering na příchodu.
- **Děj:** Higgins si zapisuje Elizinu řeč a předvádí, že podle mluvy slyší původ a sociální zkušenost. Eliza zjistí, že je pozorována jako objekt. Vlastním dialogovým kontextem pronese signature line: `I ain't done nothing wrong. I'm a good girl, I am.` Pickering vstoupí jako jiný typ posluchače.
- **Hlavní účel:** představit Higginsův experimentální pohled a zároveň dát Elize okamžitou agency v obraně sebe sama.
- **Rozhodnutí hráče:** `D02` – rozhodnout, zda Higginsovi položit přímou otázku, vyžádat si vysvětlení, nebo jeho zápis odmítnout a vrátit se k prodeji.
- **Možné hodnotové změny:** `Confidence +1` při přímém dotazu, `Independence +1` při odmítnutí; žádná volba nesnižuje Elizinu hodnotu.
- **Uložení:** `long-term: ne`; uloží se `higgins_first_impression`.
- **Audio momenty:** `AM05 VOICE` Higginsův popis a zápis; `AM06 VOICE` Elizina signature line, která má být skutečně namluvená canonical BEFORE delivery.
- **Challenge:** žádná samostatná výzva; poslech rozlišuje popis řeči od soudu o člověku.
- **Teacher Mode:** `ain't` a sociální registr popsat bez stigmatizace; rozdíl mezi phonetic observation a moral judgment.
- **Vizuální assety:** Eliza `Flower Girl / guarded`, Higginsův zápisník, Pickering na příchodu.
- **Audio assety:** `higgins_ch01_scene03_001.mp3`, `eliza_ch01_scene03_001.mp3`, přepis signature line.
- **Návaznost:** `ch01_s04`.

### ch01_s04 – Higgins' Ear

- **Lokace:** okraj portica, kde déšť vytváří akustickou clonu.
- **Čas / atmosféra:** podvečer; svět se zúží na hlasy, kroky a déšť.
- **Postavy:** Higgins, Pickering, Eliza, Freddy v pozadí.
- **Děj:** Higgins předloží Pickeringovi několik krátkých ukázek řeči a vysvětlí, co v nich slyší. Hráč sleduje, jak lze slyšet registr, intonaci a sociální kontext bez tvrzení, že jeden přízvuk je lepší.
- **Hlavní účel:** zavést `Higgins' Ear` jako opakovanou herní formu.
- **Rozhodnutí hráče:** žádné hlavní; hráč volí pořadí poslechových stop.
- **Možné hodnotové změny:** žádné; `LC02` testuje contextual listening, register, pragmatics a intention. Při chybě nevzniká morality penalty.
- **Uložení:** `long-term: ne`; uloží se `ear_test_intro_seen`.
- **Audio momenty:** `AM07 LISTENING` tři krátké stylizované ukázky registru; `AM08 VOICE` Pickeringova reakce a Higginsovo vysvětlení.
- **Challenge:** `LC02` – určit vztah, situaci nebo míru formálnosti z hlasu a kontextu, ne „inteligenci“ mluvčího.
- **Teacher Mode:** accent, dialect, register, intonation; upozornění, že inference může být omylná.
- **Vizuální assety:** detail zápisníku, tři malé speaker cue panely, Eliza poslouchající.
- **Audio assety:** `higgins_ch01_scene04_001.mp3`, `pickering_ch01_scene04_001.mp3`, tři lokální listening sample soubory a transkripty.
- **Návaznost:** `ch01_s05`.

### ch01_s05 – A Window of Possibility

- **Lokace:** před květinářstvím / výlohou na okraji Covent Garden.
- **Čas / atmosféra:** déšť polevuje; světla obchodů se odrážejí v dlažbě.
- **Postavy:** Eliza, případně Freddy v dálce, kolemjdoucí.
- **Děj:** Eliza se dívá na květinářství a spojuje jazyk se společenskými příležitostmi. Nechce být „opravená“; chce rozšířit možnosti, které má při jednání s lidmi.
- **Hlavní účel:** uzavřít kapitolu jasnou vlastní motivací.
- **Rozhodnutí hráče:** `D03` – zvolit hlavní motivaci: `Opportunity`, `Respect`, `Learning` nebo `Independence`.
- **Možné hodnotové změny:** zvolená motivace se zapíše jako `origin_motivation`; počáteční hodnoty bez automatického žebříčku.
- **Uložení:** `long-term: ano`; motivace se vrací v Chapter VI.
- **Audio momenty:** `AM09 VOICE` Elizina krátká reflexe; `AM10 AMBIENCE` déšť ustupující do večerního tržiště.
- **Challenge:** žádná; rozhodnutí je významové a vztahuje se k předchozímu poslechu.
- **Teacher Mode:** language as access and choice; rozdíl mezi rozšířením repertoáru a vymazáním původu.
- **Vizuální assety:** výloha květinářství, Eliza `Flower Girl / thoughtful`, mokrá večerní ulice.
- **Audio assety:** `eliza_ch01_scene05_001.mp3`, `ambience_covent-garden_evening_001.mp3` a přepis.
- **Návaznost:** `ch02_s01`; uloží se `origin_motivation`.

## Chapter II – The Bargain

**Dramatic arc:** Eliza sama vstoupí do Higginsova domu, formuluje požadavek, vyjedná hranice a na konci znovu vlastními slovy potvrdí, proč do výuky vstupuje.

**Audio profile:** `VOICE` žádosti, podmínky a motivace; `LISTENING` implied meaning v jednání; `PRONUNCIATION` vědomé přepnutí direct/polite registru; `SFX` dveře, mince, pero a hodiny; `AMBIENCE` ulice, dům a první učebna.

### ch02_s01 – The Door She Chooses

- **Lokace:** vchod do Higginsova domu.
- **Čas / atmosféra:** následující ráno; chlad, jasnější světlo, nervozita před cizí domácností.
- **Postavy:** Eliza, Higgins, Mrs Pearce.
- **Děj:** Eliza přijde sama a chce si zaplatit lekce. Návštěva není Higginsův nábor; iniciativa vychází od ní.
- **Hlavní účel:** zavést Elizinu vyjednávací agency a rozdíl mezi cílem a registrem žádosti.
- **Rozhodnutí hráče:** `D04` – formulovat první žádost jako přímou, zdvořilou nebo zdvořilou s jasnou podmínkou.
- **Možné hodnotové změny:** žádné; D04 ukládá pouze `request_strategy`. Directness, politeness a boundary-setting jsou rovnocenné komunikační strategie.
- **Uložení:** `long-term: ano`; uloží se `request_strategy`.
- **Audio momenty:** `AM11 VOICE` Elizina žádost; `AM12 SFX` dveře a kroky; `AM13 VOICE` Higginsova přesná viditelná replika.
- **Challenge:** `LC03` – převést přímý požadavek do zdvořilé formy bez ztráty významu.
- **Teacher Mode:** requests, polite forms, directness vs rudeness.
- **Vizuální assety:** Eliza `Flower Girl / determined`, vstup domu, Mrs Pearce u dveří.
- **Audio assety:** `eliza_ch02_scene01_001.mp3`, `higgins_ch02_scene01_001.mp3`, `house-entry-001.mp3` a přepisy.
- **Návaznost:** `ch02_s02`.

### ch02_s02 – Terms on the Table

- **Lokace:** Higginsova pracovní místnost.
- **Čas / atmosféra:** dopoledne; stůl s papíry, nástroji a šálky, napětí mezi domácností a laboratoří.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce.
- **Děj:** Higgins mluví o lekcích jako o experimentu, zatímco Pickering upozorňuje na člověka a Mrs Pearce na praktické důsledky. Eliza slyší, že její peníze a práce mají společenskou hodnotu.
- **Hlavní účel:** ukázat konflikt mezi Higginsovou fascinací a Eliziným vlastním cílem.
- **Rozhodnutí hráče:** žádné hlavní; v LC04 hráč rozlišuje nabídku, hodnocení a podmínku podle účelu repliky.
- **Možné hodnotové změny:** žádné; LC04 ukládá pouze completion a attempt metadata, bez Confidence reward.
- **Uložení:** `long-term: ne`; uloží se `experiment_framing_heard`.
- **Audio momenty:** `AM14A VOICE` Pickeringova přesná viditelná replika; `AM14 LISTENING` tři stabilní LC04 sample.
- **Challenge:** `LC04` – rozlišit, zda replika vyjadřuje nabídku, hodnocení, nebo podmínku.
- **Teacher Mode:** formal / informal register a implied meaning v institucionálním rozhovoru.
- **Vizuální assety:** pracovní stůl, zápisníky, Eliza mezi třemi různými postoji dospělých.
- **Audio assety:** `pickering_ch02_scene02_001.mp3`, `ch02_lc04_001.mp3`, `ch02_lc04_002.mp3`, `ch02_lc04_003.mp3` a přepisy.
- **Návaznost:** `ch02_s03`.

### ch02_s03 – Mrs Pearce's Questions

- **Lokace:** kuchyňská část domu a přilehlá chodba.
- **Čas / atmosféra:** pozdní dopoledne; praktičtější, klidnější prostor mimo Higginsův stůl.
- **Postavy:** Eliza, Mrs Pearce, krátce Higgins.
- **Děj:** Mrs Pearce se ptá na čas, peníze, oblečení, únavu a zacházení. Je lidskou autoritou, která neidealizuje ani nezlehčuje rizika výuky.
- **Hlavní účel:** dát Elize prostor pojmenovat hranice před uzavřením dohody.
- **Rozhodnutí hráče:** žádné hlavní; volitelná mikroodpověď určuje, zda Eliza požádá o další vysvětlení.
- **Možné hodnotové změny:** žádné; volitelná mikroodpověď může nastavit pouze lokální `boundary_questioned`.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM15 VOICE` Mrs Pearce klade praktické otázky; `AM16 VOICE` Eliza odpovídá vlastním tempem, bez Higginsovy opravy.
- **Challenge:** žádná nová; předchozí `LC03` se odráží v přirozené žádosti o upřesnění.
- **Teacher Mode:** asking for clarification, consent and boundaries.
- **Vizuální assety:** Mrs Pearce `practical authority`, kuchyň, Eliza mezi dveřmi a stolem.
- **Audio assety:** `mrs-pearce_ch02_scene03_001.mp3`, `eliza_ch02_scene03_001.mp3` a přepisy.
- **Návaznost:** `ch02_s04`.

### ch02_s04 – The Price of a Lesson

- **Lokace:** Higginsova místnost.
- **Čas / atmosféra:** poledne; formální stůl, mince a rozvrh vedle fonetických poznámek.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce.
- **Děj:** Dohoda se převádí do konkrétního času, ceny a očekávání. Higgins chce měřit pokrok; Eliza trvá na tom, že platící studentka není pouze materiál.
- **Hlavní účel:** spojit peníze, společenskou hodnotu a herní ukládání podmínek.
- **Rozhodnutí hráče:** žádné hlavní; krátká kontrola porozumění podmínkám.
- **Možné hodnotové změny:** žádná automatická změna; uloží se `lesson_terms_understood`.
- **Uložení:** `long-term: ano` jako podmínky, nikoli jako morální skóre.
- **Audio momenty:** `AM17 VOICE` Higginsův rozvrh a podmínky; `AM18 SFX` mince, pero a hodiny.
- **Challenge:** žádná; učební obsah je vložený do vyjednávání.
- **Teacher Mode:** money, social value, formal agreement vocabulary.
- **Vizuální assety:** mince, rozvrh, fonetické pomůcky, Eliza stojící u stolu.
- **Audio assety:** `higgins_ch02_scene04_001.mp3`, `lesson-terms-001.mp3` a přepis podmínek.
- **Návaznost:** `ch02_s05`.

### ch02_s05 – Why I Am Here

- **Lokace:** chodba před pracovnou, později práh učebny.
- **Čas / atmosféra:** odpoledne; první klid po vyjednávání, směs očekávání a obav.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce.
- **Děj:** Eliza musí před začátkem lekcí jasně říct, proč vstupuje do výuky. Její odpověď může původní motivaci z Chapter I potvrdit, zpřesnit nebo změnit; nesmí ji nahradit Higginsovým cílem.
- **Hlavní účel:** uzavřít kapitolu explicitním vstupním závazkem.
- **Rozhodnutí hráče:** `D05` – potvrdit hlavní důvod: `Opportunity`, `Respect`, `Learning` nebo `Independence`, s možností krátkého vlastního upřesnění.
- **Možné hodnotové změny:** žádný increment za konzistenci ani za změnu motivace. `origin_motivation` zůstává historický údaj; aktuální volba se zapíše jako `confirmed_motivation`. Book-first checkpoint S05 (2026-10-01) zachovává `motivation_shift` a `motivation_nuance` beze změny a zapisuje pouze stabilní event `ch02_d05_confirmed_motivation`.
- **Uložení:** `long-term: ano`; uloží se historická motivace, potvrzená motivace a případný posun bez good/bad hodnocení.
- **Audio momenty:** `AM19 VOICE` Elizino jasné prohlášení cíle; `AM20 AMBIENCE` dům přechází do rytmu prvního vyučování.
- **Challenge:** žádná samostatná; volba je příběhový jazykový akt.
- **Teacher Mode:** explaining purpose, future forms and register of self-advocacy.
- **Vizuální assety:** práh učebny, Eliza přechodně mezi `Flower Girl` a prvními prvky `In Training`.
- **Audio assety:** `eliza_ch02_scene05_001.mp3`, `ambience_higgins_house_lesson_001.mp3` a přepis.
- **Návaznost:** `ch03_s01`; uloží se `confirmed_motivation`.

## Chapter III – The Lessons

**Dramatic arc:** Výuka se stává konkrétní řadou situací. Každá technika pomáhá Elize řešit okamžitý problém, ale také odhaluje napětí mezi kontrolou zvuku, sebevědomím a vlastním způsobem vyjádření.

**Audio profile:** `VOICE` Eliza, Higgins, Mrs Pearce a Pickering; `LISTENING` minimal pairs a transfer do situace; `PRONUNCIATION` phonetics, word stress, sentence stress a intonation; `SFX` učební pomůcky a obchod; `AMBIENCE` lekce, déšť a ranní stánek.

### ch03_s01 – The Mouth Is a Muscle

- **Lokace:** Higginsova učebna.
- **Čas / atmosféra:** první týden výuky, ráno; soustředění, opakování, lehká frustrace.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce v krátkém vstupu.
- **Děj:** Higgins vysvětluje místo tvoření hlásek a Eliza zkouší nový pohyb úst. Úkol vzniká z její potřeby být srozumitelná zákazníkovi, ne z příkazu odstranit původ.
- **Hlavní účel:** zavést phonetics jako nástroj volby a pozornosti.
- **Rozhodnutí hráče:** `D06` – zvolit strategii učení: pomalé opakování, požádat o vizuální příklad, nebo vlastní slova zasadit do nového zvuku.
- **Možné hodnotové změny:** `Pronunciation +1` při vědomém opakování, `Confidence +1` při žádosti o další vysvětlení, `Independence +1` při zachování vlastního významu.
- **Uložení:** `long-term: ano`; uloží se `practice_preference`.
- **Audio momenty:** `AM21 PRONUNCIATION` Higginsův model hlásky a Elizin pokus; `AM22 SFX` tužka, papír a drobné pohyby učebny.
- **Challenge:** `LC05` – phonetics: rozpoznat místo tvoření a zvolit další artikulační krok.
- **Teacher Mode:** mouth position, sound awareness, supportive correction.
- **Vizuální assety:** Eliza `In Training / focused`, jednoduché fonetické kartičky, zrcátko.
- **Audio assety:** `higgins_ch03_scene01_001.mp3`, `eliza_ch03_scene01_001.mp3`, phonetic sample a přepisy.
- **Návaznost:** `ch03_s02`.

### ch03_s02 – The Listening Room

- **Lokace:** učebna s fonografem nebo jednoduchým přehrávacím zařízením.
- **Čas / atmosféra:** odpoledne; opakované přehrávání, napětí mezi slyšením a okamžitou odpovědí.
- **Postavy:** Eliza, Higgins, Pickering.
- **Děj:** Eliza porovnává dvě podobné hlásky v krátkých slovech, která se vztahují k objednávce květin. Higgins' Ear je zde o pozornosti, ne o odhalení „lepšího“ člověka.
- **Hlavní účel:** převést listening do dramatické situace, v níž špatné rozlišení mění význam objednávky.
- **Rozhodnutí hráče:** žádné hlavní; hráč si může zvolit replay nebo zpomalit ukázku.
- **Možné hodnotové změny:** `Pronunciation +1` za rozlišení po opakovaném poslechu; chyba nemá morality dopad.
- **Uložení:** `long-term: ne`; uloží se `minimal_pair_seen`.
- **Audio momenty:** `AM23 LISTENING` dvě kontrastní ukázky; `AM24 VOICE` Eliza ověří význam vlastními slovy.
- **Challenge:** `LC06` – minimal pairs; vybrat slyšený rozdíl a potvrdit význam v kontextu.
- **Teacher Mode:** minimal pairs, replay, transcript as support.
- **Vizuální assety:** přehrávač, kartičky objednávky, Eliza `In Training / listening`.
- **Audio assety:** `higgins_ch03_scene02_001.mp3`, `eliza_ch03_scene02_001.mp3`, `listening_minimal-pairs_001.mp3` a přepisy.
- **Návaznost:** `ch03_s03`.

### ch03_s03 – Finding the Main Stress

- **Lokace:** učebna a krátká simulace stánku s květinami.
- **Čas / atmosféra:** další den; živější tempo, první malý úspěch a nové chyby.
- **Postavy:** Eliza, Higgins, Mrs Pearce jako zákaznice.
- **Děj:** Eliza hledá hlavní přízvuk ve víceslabičných slovech z praktické objednávky. Word stress podporuje srozumitelnost, rozpoznání slabik a správné umístění hlavního přízvuku; významový kontrast se použije jen tam, kde skutečně jazykově dává smysl.
- **Hlavní účel:** ukázat, že správný word stress pomáhá posluchači rozpoznat slovo. Změny významového fokusu, postoje a míry jistoty patří primárně do `ch03_s04` se sentence stress a intonation.
- **Rozhodnutí hráče:** žádné hlavní; volba pořadí důrazu mění lokální výsledek scénky.
- **Možné hodnotové změny:** `Pronunciation +1` při správném umístění hlavního přízvuku; žádný samostatný Confidence increment za word stress.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM25 PRONUNCIATION` word-stress kontrasty; `AM26 VOICE` Mrs Pearce reaguje jako zákaznice.
- **Challenge:** `LC07` – rozpoznat slabiky a zvolit hlavní přízvuk ve víceslabičném slově; významový kontrast pouze u jazykově platného páru.
- **Teacher Mode:** word stress, syllables, intelligibility; rozdíl mezi word stress a sentence stress.
- **Vizuální assety:** improvizovaný květinový stánek, kartičky slov, Eliza `In Training / practicing`.
- **Audio assety:** `mrs-pearce_ch03_scene03_001.mp3`, `eliza_ch03_scene03_001.mp3`, `pronunciation_word-stress_001.mp3` a přepis.
- **Návaznost:** `ch03_s04`.

### ch03_s04 – A Sentence Has Shape

- **Lokace:** Higginsova pracovna / učebna.
- **Čas / atmosféra:** po S03; soustředěný nácvik větného přízvuku a intonace.
- **Postavy:** Eliza a Higgins.
- **Děj:** Eliza přechází od přízvuku uvnitř slova k tomu, jak významové slovo vystupuje ve větě. Demonstrace `She ordered the blue hat.` → `She ordered the BLUE hat.` ukazuje změnu důrazu, aniž prozrazuje odpovědi LC08.
- **Hlavní účel:** naučit vnímat větný přízvuk / základní intonaci jako vodítko k tomu, která část sdělení je důležitá. „Some carry more of the message“ je užitečné zjednodušení pro žáka, nikoli absolutní pravidlo o každém slově.
- **Rozhodnutí hráče:** `D07` – „The sentence still feels awkward. What would Eliza like to try next?“ Možnosti `d07_repeat_slowly`, `d07_hear_naturally`, `d07_try_first`; každá se vrací ke stejnému LC08. Žádná nemění odpovědi, Pronunciation, postup ani odměnu.
- **Možné hodnotové změny:** D07 žádné. Unaided dokončení LC08 přidá `Pronunciation +1` právě jednou přes `ch03_lc08_completed`; podporované dokončení bez odměny i penalizace.
- **Uložení:** D07 se jednou zaznamená do sdíleného `decisions` ledgeru. Žádný nový persistentní učební příznak.
- **Audio momenty:** AM27 tvoří tři plánované věty LC08; AM28 tvoří devět vybraných příběhových okamžiků. Vše zůstává `PLANNED — NOT GENERATED`; znovu použít kanonickou `ch03_lesson_room` ambience.
- **Challenge:** `challenges.lc08` – `lc08_sample_01` „I wanted the red flowers.“ → `lc08_focus_red` (`red`); `lc08_sample_02` „She bought three tickets.“ → `lc08_focus_three` (`three`); `lc08_sample_03` „We meet on Monday.“ → `lc08_focus_monday` (`Monday`). Před odpovědí žádný vizuální hint.
- **Teacher Mode:** sentence stress / základní intonace; strategie D07; klíč LC08 a přístupná podporovaná cesta.
- **Vizuální assety:** znovu použít schválenou pracovnu a stávající knižní kompozici; cílová slova i ovládací prvky jsou před odpovědí neutrální.
- **Návaznost:** po vyřešení D07, dokončení LC08 a výslovném Continue zaznamenat `ch03_s04_complete` a přejít do `ch03_s05`.

### ch03_s05 – The Bad Day

- **Status:** S05 PRE-PRODUCTION CANON LOCKED.
- **Lokace:** Higginsova pracovna / učebna, znovu použít existující prostředí.
- **Čas / atmosféra:** několik dní po S04; lekce trvá příliš dlouho, Eliza je unavená a frustrovaná.
- **Postavy:** Eliza a Higgins.
- **Děj:** Eliza u známé věty spěchá a ztrácí rovnoměrné tempo. Protože ji dříve zvládla, rozzlobí ji kolísání výkonu. Higgins pojmenuje technický problém, ale scénu nepromění v ponížení. Eliza zastaví pokus, zpomalí, rozdělí větu na smysluplné části, zkusí ji znovu a obnoví řeč. Úspěch je zotavení, ne bezchybný výkon: „I can get it back.“
- **Hlavní účel:** udržet řeč pod únavou, regulovat tempo, chunkovat a opravit pokus. Únava je stav k řízení, ne důkaz selhání učení. S05 nepřidává fonologický systém.
- **Rozhodnutí hráče:** žádné hlavní D-numbered rozhodnutí. Pauza a reset jsou pevný story beat; žádná D-volba se nevytváří.
- **Možné hodnotové změny:** unaided dokončení LC09 přidá `Pronunciation +1` právě jednou přes `ch03_lc09_completed`; podpora bez odměny i penalizace. Pauza nedává Confidence increment.
- **Uložení:** dlouhodobě žádné; challenge state zůstává v `challenges.lc09`, completion v event ledgeru. Žádná nová fatigue/pace/repair pole.
- **Audio momenty:** AM29 vybrané story voice okamžiky únavy, řízeného resetu a zotavení; AM30 pokračující existující `ch03_lesson_room` ambience, bez nového souboru.
- **Challenge:** `challenges.lc09` – learner instruction „Choose the best place to pause so the sentence is easier to say.“ Před odpovědí jsou všechny split body neutrální; svislý oddělovač a vysvětlení se zobrazí pouze po výslovném otevření target-revealing Supported Practice. Přesné položky, texty podpory a reward pravidla jsou v `docs/chapters/ch03/STATE_AND_BRANCHING.md`.
- **Teacher Mode:** únava a kolísání výkonu, tempo vs. přesnost, chunking, self-repair a citlivé rámování.
- **Vizuální assety:** použít schválenou pracovnu, Eliza `In Training` training cutout a stávající Higginsův cutout; tišší kompozice a více negativního prostoru, bez nového artworku či tmavého filtru.
- **Audio assety:** tři plánované LC09 věty hlasem Higgins/Kelvin a vybrané Eliza/Higgins story voice repliky; pouze plán, NOT GENERATED. Pokračovat s existující canonical 90s ambience.
- **Návaznost:** až po LC09 a výslovném Continue zaznamenat `ch03_s05_complete` a přejít do `ch03_s06 – A Small Victory`.

### ch03_s06 – A Small Victory

- **Status:** S06 PRE-PRODUCTION CANON LOCKED.
- **Lokace:** Higginsova pracovna / učebna; běžný konec lekce, ne veřejný test.
- **Čas / atmosféra:** lekce končí; kompozice působí o něco otevřeněji a klidněji než S05, bez triumfálního efektu.
- **Postavy:** Eliza, Higgins a Mrs Pearce v sousední místnosti.
- **Děj:** Při prosté žádosti se Eliza sama zarazí, všimne si, že spěchala, a řekne větu znovu. Higgins pojmenuje pouze to, že se slyšela sama. Jde o první malý přenos a sebeopravu, nikoli o dokonalou řeč nebo dokončenou proměnu.
- **Hlavní účel:** integrovat dříve procvičené poslouchání, srozumitelnou artikulaci, významový důraz, tempo a opravu v jedné běžné interakci. Nepřidávat nový fonologický cíl.
- **Rozhodnutí hráče:** žádné hlavní D-numbered rozhodnutí v S06. Replay a otevření podpory jsou ovládací akce, ne rozhodnutí ani samostatné score volby.
- **Možné hodnotové změny:** dokončení LC10 bez přepnutí na podporu přidá `Pronunciation +1` právě jednou přes `ch03_lc10_completed`. Dokončení s transcript podporou nebo textovou alternativou nemá odměnu ani penalizaci. Confidence a Independence se nemění.
- **Uložení:** pouze obvyklý `challenges.lc10` a event ledger; žádný `lesson_progress_snapshot`, Chapter III mastery event ani nové top-level pole.
- **Audio momenty:** AM31 Elizina sebeoprava; AM32 Higginsovo stručné rozpoznání; AM33 tři LC10 ukázky. Pouze plán, žádné generace.
- **Challenge:** LC10 – ve třech krátkých praktických příkladech poslechnout první pokus a Elizinu opravu a vybrat zprávu, kterou nakonec zamýšlí sdělit. Při nedostupném zvuku lze pro jednotlivý vzorek zaznamenat nevyřešený „I cannot hear this recording“ pokus a výslovně přepnout na textovou situační alternativu; správnou zprávu musí hráč stále zvolit. Alternativa neukazuje doslovný přepis ani automatickou odpověď a její dokončení je podporované bez odměny i penalizace. Výchozí audio cesta zůstává nezměněna. Přenos dříve naučených strategií, nikoli obecný gramatický test.
- **Teacher Mode:** 12 sekcí s transfer cílem, klíčem LC10, podporou a odměnou, citlivým rámováním a cestou do Chapter IV.
- **Vizuální assety:** znovu použít schválenou pracovnu, Eliza `In Training / Conscious Training` a existující Higginsův cutout; více prostoru, žádná nová póza nebo triumfální efekt.
- **Audio assety:** Eliza `124kaYCknTDsnwUFdWl9`; Higgins `JlptfLxaUpd8pZcw9dKd`. LC10 potřebuje nejvýše tři Eliza ukázky s texty a přepisy; AM31–33 jsou pouze plánované.
- **Návaznost:** po LC10 a výslovném Continue zaznamenat `ch03_s06_complete` bez dalšího incrementu a přejít do `ch04_s01 – The Invitation`.

## Chapter IV – The First Test

**Dramatic arc:** Eliza moves from controlled training toward using speech in real social situations. Chapter IV opens with preparation for an invitation, then tests listening, pacing, intelligibility and repair in small steps. Eliza's voice-stage is **Emerging New Speech**: the same canonical voice and Cockney identity, with more conscious control; not polished Chapter V performance. Social expectations are examined, not endorsed.

**Audio profile:** `VOICE` small talk, humor a recovery; `LISTENING` turn-taking a implied meaning; `PRONUNCIATION` stabilní artikulace pod tlakem; `SFX` šálky a kroky; `AMBIENCE` čajové setkání, boční chodba a noční cesta.

### ch04_s01 – The Invitation

- **Lokace:** Higginsova pracovna.
- **Čas / atmosféra:** podvečer; krátký klid před novou zkušeností, pozvání na sousedské čtení a čaj.
- **Postavy:** Eliza, Higgins, Pickering. Mrs Pearce není přítomna; hostitelka zůstává mimo scénu.
- **Děj:** Eliza dostane pozvání, při kterém může později poznat hosty. Zatím nevystupuje před publikem. Higgins to bere jako praktický experiment a chce nacvičit přesný pozdrav; Pickering připomíná, že posluchače je třeba také vnímat. Eliza si uvědomí rozdíl mezi cvičením v pracovně a skutečným rozhovorem.
- **Hlavní účel:** převést pozornost od kontrolovaného tréninku k blížícímu se sociálnímu použití řeči, aniž se S01 stane hlavním testem.
- **Rozhodnutí hráče:** `D08`, prompt “Where should Eliza begin?”: `d08_practise_greeting` — “Practise a simple greeting.”; `d08_plan_message` — “Think about what she wants to say.”; `d08_listen_first` — “Listen first and observe.” Žádná volba není správná či nesprávná; všechny jsou nepunitive a sbíhají se do stejného pokračování S01. Bez branch-specific flavour textu.
- **Možné hodnotové změny:** žádné. D08 nepřidává ani neodečítá `Pronunciation`, `Confidence` či `Independence`.
- **Uložení:** zvolený stabilní option ID pouze v existujícím `decisions.D08`; event `ch04_d08_recorded` se aplikuje právě jednou. Rozhodnutí se obnoví po refreshi přes existující persisted decision ledger; žádný nový top-level field.
- **Audio moment:** `AM34` – dvě volitelné story voice repliky Higginse a Elizy. AM33 zůstává přiřazen třem LC10 ukázkám v S06. AM34 je integrováno a má Human Audio approval PASS; ambience S01 reuse `ch03_lesson_room`. S01 Human Visual QA = PASS.
- **Challenge:** žádná. `LC11` zůstává v S02.
- **Teacher Mode:** přenos z lekce do sociálního prostředí; příprava, naslouchání a volba; accent ≠ intelligence.
- **Vizuální assety:** znovu použít Higginsovu pracovnu a existující postavy. Klasifikace pozvánky: A — žádný vizuální prop není vyžadován; dialog a narace stačí. BOOK FIRST zůstává srozumitelný bez viditelné karty. Eliza zůstává rozpoznatelně stejná; změna se projeví pouze klidnější kompozicí, mírně jistějším držením těla, pokud je podpořeno schváleným assetem, a menším napětím pracovního tréninku.
- **Audio assety:** plánovat pouze krátké story voice repliky Elizy/Higginse s viditelným textem a přepisy; přesné mapování je v `docs/chapters/ch04/AUDIO_PLAN.md`.
- **Dokončení:** po explicitním Continue jednou zaznamenat `ch04_s01_complete`; bez signálu či mastery bonusu.
- **Návaznost:** až po explicitním Continue `ch04_s02 – Names and Weather`; žádný automatický přechod.

### ch04_s02 – Names and Weather

- **Lokace:** nová malá viktoriánská společenská drawing-room / tea-room, vizuálně odlišná od Higginsovy pracovny.
- **Čas / atmosféra:** první část setkání; klidný společenský ruch, čaj a počasí jako nenucené small-talk téma.
- **Postavy:** Eliza, Hostess, jeden či více Guest podle kompozice, Pickering. Higgins není aktivní mluvčí.
- **Děj:** Hostess Elizu představí a rozhovor začne jménem, počasím a cestou. Eliza přirozeněji vede krátký small talk a drží čistší výslovnost. Po story beats hráč v LC11 poslouchá tři odlišné conversational signals a určí, zda tah rozhovor otevírá, pokračuje v něm, nebo jej uzavírá. Poté je dostupná krátká lokální aplikační mikrovolba; žádná volba nevětví hlavní story spine.
- **Hlavní účel:** ukázat první skutečné použití řeči při společenském setkání, opening / continuing / closing signal a mírný tlak bez karikatury „perfect lady“.
- **Originální `/eɪ/` moment:** Eliza říká přesně `It rained on the way here, but today the sky is clearing.` Teacher Mode může upozornit na `/eɪ/` v `rained`, `way`, `today`. Nejde o LC11 sample ani answer content. Nepoužívá se student-facing řetězec `rain / Spain / plain` ani jeho rytmická parafráze.
- **Rozhodnutí hráče:** bez major decision ID. Po LC11 může hráč zvolit jednu ze dvou stejně platných krátkých společenských odpovědí, které nechají rozhovoru prostor; obě se sbíhají do stejného pokračování. D08 zůstává uložené, není gate a nemění obtížnost ani výsledek LC11.
- **Možné hodnotové změny:** LC11 sama nemění žádný development signal. Volitelná lokální aplikační odpověď může jednou přidat `Confidence +1` za vhodné pokračování; žádná `Pronunciation` změna se nepřidává.
- **Uložení:** challenge v existujícím `challenges.lc11` tvaru a event ledgeru. Všechny tři samples musí být správně klasifikovány pro LC11 completion; `ch04_lc11_complete` se zaznamená jednou. Volba aplikační odpovědi zůstává lokální pro S02, bez nového top-level pole.
- **Audio momenty:** `AM35 LISTENING` = tři LC11 host/guest samples; `AM36 VOICE` = tři Eliziny story turns. AM35 voice casting je production casting pending; nevymýšlet canonical voice ID. AM36 používá canonical Eliza voice `124kaYCknTDsnwUFdWl9`; visible text = spoken text 1:1.
- **Challenge:** `LC11` – tři stabilní samples: opening, continuing, closing. Replay je povolen. Transcript není viditelný před prvním pokusem; explicitně vyžádaná support/transcript možnost je dostupná poté, bez penalizace. LC11 nepřidává `Pronunciation`, `Confidence` ani `Independence`.
- **Teacher Mode:** phatic language, turn-taking, weather talk, proč další otázka po jasném closing signal nemusí být vhodná; `/eɪ/` je vedlejší observation. Teacher preview je read-only.
- **Vizuální assety:** required nová location ilustrace společenské tea-room s čajovým stolem, místy k sezení a negativním prostorem pro runtime characters. Reuse Eliza `In Training / attentive` approved varianty, pokud kompozice funguje, a Pickering master. Hostess/guests mohou být sekundární background participants; nové hlavní character cutouts nejsou automaticky required. Samostatné jmenovky jsou optional.
- **Audio assety:** `assets/audio/listening/ch04_lc11_sample_01.mp3`, `_02.mp3`, `_03.mp3`; `assets/audio/characters/eliza/eliza_ch04_scene02_001.mp3`, `_002.mp3`, `_003.mp3`; ambience `assets/audio/ambience/ch04_social_tea_room_ambient.mp3`. Volitelný `assets/audio/sfx/sfx_teacups_001.mp3` je nejvýše jeden jednorázový diegetický cue.
- **Ambience:** `ch04_social_tea_room`, tlumený společenský murmur a jemný room tone, bez hudby a náhodných efektů. Při přechodu `ch03_lesson_room` → `ch04_social_tea_room` použít jemný crossfade. AM35 a AM36 duckují přes existující AudioManager; po skončení se ambience vrací bez restartu.
- **Dokončení a návaznost:** až po LC11 completion se zpřístupní explicitní Continue; challenge ani mikrovolba scénu automaticky nepřepínají. Po Continue jednou zaznamenat `ch04_s02_complete` a přejít do `ch04_s03 – The Wrong Answer`.

### ch04_s03 – The Wrong Answer

- **Lokace a vstup:** stejný social tea room jako S02; S03 je dostupná po `ch04_s02_complete`. D08 ani případná S02 `Confidence +1` nemění její obsah nebo dostupnost.
- **Postavy:** Eliza, Guest (stejný Guest jako v S02), další hosté, Higgins a Pickering. Aktivní mluvčí AM37 jsou Guest a Eliza.
- **Canonical story beat (original adaptation dialogue):** Guest: “London seems to have decided we needed more rain.” Eliza: “I don't think London can decide anything. It is a city, not a person.” Eliza větu vysloví čistě, kontrolovaně a gramaticky správně; její doslovná interpretace personifikace je pragmatický/inferenční nesoulad, nikoli výslovnostní chyba ani známka inteligence. Následuje krátká pauza, zdrženlivá společenská reakce, jeden či několik jemných zdvořilých chuckles a krátký neurčitý murmur; bez hlasitého výsměchu.
- **Účel:** rozlišit doslovný a naznačený význam v hravé společenské poznámce a dát hráči volbu opravy bez sebeznehodnocení.
- **Challenge:** `LC12` má přesně dva po sobě jdoucí interpretační úkoly: `lc12_literal_meaning` a `lc12_implied_meaning`. Ověřuje porozumění, nikoli volbu sociálně „nejlepší“ opravy. Stabilní možnosti, klíč, podpora, replay a completion jsou v `docs/chapters/ch04/STATE_AND_BRANCHING.md`.
- **Rozhodnutí:** po dokončení LC12 se zobrazí `D09`, osobní preference recovery bez answer key. Stabilní volba se uloží výhradně do `decisions.D09`; hodnoty jsou `rephrase`, `acknowledge_literal`, `wait_for_cue`. Všechny možnosti konvergují.
- **Hodnoty a uložení:** S03 nemění Confidence, Independence, Pronunciation ani score. D09 se zapíše jednou jako `decisions.D09` a event `ch04_d09_recorded`; žádný paralelní `recovery_style` field se nevytváří. LC12 jednou zaznamená `ch04_lc12_complete` a nepřiděluje odměny.
- **Audio:** `AM37 STORY VOICE` obsahuje dvě oddělené story voice repliky s viditelným textem shodným 1:1 se spoken text. Guest používá plánované reuse hlasu Paul M (`zp695rEBCwfZ3GYNJOHx`); Eliza používá `124kaYCknTDsnwUFdWl9`. `AM38 LISTENING / CONTEXT CUE` je přibližně 3–5s neřečová sociální reakce na `assets/audio/listening/ch04_lc12_reaction_001.mp3`, bez nutnosti srozumitelné řeči. Samostatné `assets/audio/sfx/sfx_room_reaction_001.mp3` je redundantní a nahrazené AM38.
- **Ambience:** pokračovat v `ch04_social_tea_room` bez zbytečného restartu; AM37 standardní ducking, AM38 případně výraznější dočasný ducking, poté obnovit běžící ambience.
- **Vizuály:** reuse tea-room background, Eliza `eliza_training_focused_cutout.png`, Higgins a Pickering runtime cutouty. Nový Eliza surprised asset ani Hostess/Guest foreground cutouty nejsou potřeba.
- **Teacher Mode:** literal vs implied meaning, pragmatická oprava, absence jediného správného recovery stylu a equity framing `Accent ≠ intelligence`; preview zůstává read-only.
- **Dokončení:** Continue se odemkne až po `ch04_lc12_complete` a `ch04_d09_recorded`. Pouze explicitní Continue jednou zapíše `ch04_s03_complete` a přejde do `ch04_s04`.

### ch04_s04 – After the Laughter

- **Lokace a přechod:** `side corridor`, několik minut po S03; není to bezprostřední pokračování u hostů ani tea-room visual hold. Gathering zůstává za zavřenými či přivřenými dveřmi a je slyšet pouze vzdáleně. Přechod ambience: `ch04_social_tea_room → ch04_side_corridor`.
- **Postavy:** Eliza, Pickering, Mrs Pearce a Higgins krátce; všichni čtyři promluví. Higgins je krátký vstup, nikoli dominantní speaker.
- **Hlavní účel:** posunout otázku z “What did Eliza misunderstand?” na “Who decides what successful communication means?” a dát Elize větší agency. S03 bylo pragmatic inference mismatch, nikoli pronunciation failure. Platí `Accent ≠ intelligence` a `social polish ≠ personal worth`.
- **Canonical story spine:** tišší chodba; Pickering oddělí clarity od nedorozumění; Mrs Pearce rozliší vyslovená slova a implied meaning; Eliza pojmenuje, že se učí lidi i jazyk; Higgins označí večer za užitečný test; Eliza zpochybní vlastnictví rámce experimentu; hráč zvolí Elizin reflection focus; volba se sbíhá; následuje explicit Continue, completion a přechod do S05.
- **Přesný locked dialog:** Narrator: `A few minutes later, the corridor is quieter. The voices from the tea room are muffled behind the door.` Pickering: `You spoke clearly, Eliza. The difficulty was not the words.` Mrs Pearce: `People often say one thing and mean something more. That takes time to learn.` Eliza: `Then I must learn the people as well as the language.` Higgins: `Exactly. Tonight is useful because it shows us what still needs work.` Eliza: `It shows you what still needs work.` Higgins: `It is a test, Eliza.` Eliza: `Then I should have a say in what the test is for.`
- **Character framing:** Eliza zůstává ve voice-stage `Emerging New Speech`; bez Cockney relapse a bez perfect-lady hlasu. Závěrečná replika je klidná a rozvážná, agency beat bez revolučního vyvrcholení. Higgins je analytický a věcný, emočně slepý, nikoli úmyslně krutý. Pickering je podpůrný a nehodnotící. Mrs Pearce je praktická a sociálně vnímavá, bez patronizace.
- **Reflexe:** required, non-graded volba `language`, `audience` nebo `feeling`; přesné visible lines a state contract jsou v `docs/chapters/ch04/STATE_AND_BRANCHING.md`. Všechny možnosti jsou legitimní a konvergují.
- **Hodnoty a uložení:** volba se zapíše pouze do `reflections.ch04_s04_focus`; jednou se přidá `ch04_s04_reflection_recorded`. Bez `reflection_focus` duplicitního pole. S04 dává Confidence +0, Independence +0, Pronunciation +0; žádný score či skrytý reward. D09 ani předchozí Confidence S04 nemění.
- **Challenge:** žádná; žádné LC13, answer key, correctness, retries ani score.
- **Audio:** `AM39 VOICE` obsahuje všech sedm voiced dialogue lines podle `docs/chapters/ch04/AUDIO_PLAN.md`; visible text = transcript = spoken text, explicit playback, standard duck/restore. Narrator line je visible text bez plánovaného voice souboru. Předchozí AM40 hallway/distant-guests SFX je superseded; samostatný SFX ani S03 AM38 replay se neplánují. Nová ambience identity `ch04_side_corridor` má plánovaný soubor `assets/audio/ambience/ch04_side_corridor_ambient.mp3`; při vstupu crossfade přibližně 1.5 s z aktuálně běžící tea-room A/B, bez restartu Loop A.
- **Vizuály:** povinný nový background `assets/images/locations/ch04/ch04_side_corridor.webp` (zatím nevyroben). Reuse stávajících Eliza/Pickering/Higgins/Mrs Pearce runtime cutoutů dle `VISUAL_PLAN.md`; žádná nová póza. Eliza centrálně vpředu, podpůrná dvojice vedle ní, Higgins mírně oddělen; bez hosta a čajového stolku.
- **Teacher Mode:** rozlišení language accuracy a pragmatics, reflexe kdo určuje úspěšnou komunikaci, equity notes `Accent ≠ intelligence` a kulturní variabilita společenských konvencí. Preview zůstává read-only.
- **Adaptace:** přesný dialog je `ORIGINAL PROJECT ADAPTATION`, inspirovaný tematickou situací Shawova public-domain *Pygmalion*, ale není citací Shawa. Žádné znění z *My Fair Lady*, lyrics ani distinctive musical dialogue; S04 kulturní poznámka o muzikálu není vyžadována.
- **Dokončení:** vstup vyžaduje `ch04_s03_complete`. Continue se odemkne po `ch04_s04_reflection_recorded`; explicitní Continue zapíše `ch04_s04_complete` právě jednou a přejde do `ch04_s05`. Žádný auto-transition.

### ch04_s05 – The Walk Home

- **Status:** DOCUMENTATION-ONLY CANON LOCK; runtime placeholder title `The Reception` is known to be wrong. Correct it during later S05 implementation; runtime is unchanged by this lock.
- **Lokace a čas:** `evening street`, krátce po S04, cestou domů. Eliza jde sama. Pickering, Higgins ani Mrs Pearce se neobjevují; žádná farewell scene.
- **Role a účel:** poslední scéna Chapter IV uzavírá Elizin první společenský test jako `prepare → perform → misunderstand → reflect → choose`. Test není pass/fail, známka ani verdikt o inteligenci či identitě. Eliza si sama vybírá, co využije dál: `code-switching as repertoire, not disguise`. Pokračuje její agency ze S04; není vrácena do role Higginsova experimentu.
- **Canonical story spine:** narrator establishes the quiet evening street; Eliza reflects on careful speech; contrasts careful and spontaneous speech; read-only D08 memory echo; reframes the evening as information, not pass/fail; states the strategy belongs to her; explicit Continue; `ch04_s05_complete`; transition to `ch05_s01`. No challenge, new decision, reflection state, acknowledgement or auto-transition.
- **Přesný locked dialog (ORIGINAL PROJECT ADAPTATION):** Narrator: `Later, on the walk home, the street is quiet enough for Eliza to hear her own thoughts.` Eliza: `I can speak carefully when I need to.` Eliza: `And I can speak more freely when I choose.` Eliza: `That is not pretending. It is knowing what I can do.` Eliza: `Tonight was not a pass or fail.` Eliza: `It showed me what I can practise — and what I can choose.` Eliza: `The choice is mine.` Viditelný dialog a spoken dialogue jsou 1:1. Nepřidávat ani nezdobit; závěrečná replika je klidná a usazená.
- **D08 memory echo:** pouze kompaktní read-only karta mezi Eliza 3 a Eliza 4 s titulkem `Your first plan`. Mapování: `d08_practise_greeting` → `Practise the greeting first.`; `d08_plan_message` → `Plan what you want to say.`; `d08_listen_first` → `Listen before answering.`. Pod kartou nehlasový text: `That was one useful strategy. Tonight gave Eliza more information to work with.` Při chybějícím D08 kartu vynechat; bez fallback state. Karta nedělá větvení, gate ani změnu rewardu.
- **State a dokončení:** vstup vyžaduje pouze `ch04_s04_complete`. `reflections.ch04_s04_focus` S05 nijak neovlivňuje. Bez nových `decisions.*`, `reflections.*` či choice eventů. Confidence +0, Independence +0, Pronunciation +0; bez skóre, skrytého rewardu či development incrementu. Po příběhové sekvenci explicitní `Continue` zapíše `ch04_s05_complete` právě jednou a přejde do `ch05_s01`; completion je idempotentní.
- **Challenge:** žádná. Nevytvářet LC13, quiz, answer key, retry, score ani correctness semantics.
- **Audio:** AM41 = šest samostatných Eliza reflection clips dle `AUDIO_PLAN.md`; canonical voice `124kaYCknTDsnwUFdWl9`, Emerging New Speech, standard foreground duck/restore, žádný autoplay ani narration audio. AM42 je souvislá nová ambience `ch04_evening_walk`, plánovaný soubor `assets/audio/ambience/ch04_evening_walk_ambient.mp3`; nepřebírat neschválené `covent-garden-evening-001.mp3`. Při vstupu crossfade `ch04_side_corridor → ch04_evening_walk` přibližně 1.5 s, bez mezilehlého ticha/restartu. AM42 nahrazuje dřívější představu noční ulice a kroků jako odděleného SFX; žádný samostatný footsteps one-shot.
- **Vizuály:** jediný nový asset je `assets/images/locations/ch04/ch04_evening_walk.webp`, tichá dobově odpovídající londýnská ulice bez moderních vozidel/značení a bez nutnosti slavné památky; prostor pro Elizu. Eliza je jediná postava, použít `assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png`; bez nové pózy, dalších postav či rekvizit.
- **Teacher Mode:** read-only cíle, jazykové/pragmatické a identity body, equity framing a diskusní otázky jsou v chapter Teacher obsahu; preview nic nepřehrává, nezapisuje a neposouvá.
- **Adaptace:** přesné S05 dialogy jsou vlastní `ORIGINAL PROJECT ADAPTATION`, tematicky inspirovaná public-domain Shawovým *Pygmalion*; nic není citováno ze Shawa ani převzato z *My Fair Lady*. S05 nepotřebuje kulturní poznámku o muzikálu.
- **QA poznámka:** závěrečný Chapter IV clean-state walkthrough S01→S02→S03→S04→S05 zůstává otevřeným QA dluhem. Vestavěný úplný reset začíná Chapter I; nepřidávat dev fixture, seed ani debug bypass a neobcházet state guards.

## Chapter V – The Reception

**Status:** Chapter V content lock is in docs/chapters/ch05/. This map remains the chapter-spine summary; the chapter documents define exact dialogue, state, audio, visuals and Teacher Mode. Documentation only; no Chapter V runtime or assets are implemented.

**Dramatic arc:** Eliza vstupuje do vlastní, nově vytvořené společenské události. Pod tlakem poslouchá, přepíná registr a zjišťuje, že Higgins a Pickering začínají její úspěch vyprávět jako svůj experimentální výsledek.

**Core principle:** Chapter V is not a class-imitation test. Language learning is not identity replacement; accent is not intelligence. Code-switching is repertoire and agency. D10, D11, future_question_style and next_contact are open choices without moral ranking.

**Audio profile:** `VOICE` organizer, guests, Eliza, Higgins and Pickering; `LISTENING` LC13 social inference and LC14 questioning for purpose; `AMBIENCE` one exhibition hall bed S01–S03, quiet side room S04 and exterior steps S05; `SFX` one optional restrained departure cue. No modern PA/electronic sound or modern traffic.

Chapter-level scene, state, audio, visual and Teacher Mode contracts: docs/chapters/ch05/.

### ch05_s01 – The Borough Exhibition Evening

- **Lokace:** main exhibition hall at Lambeth Public Rooms; the same environment is reused in S02–S03.
- **Čas / atmosféra:** podvečer; světla, program, více skupin posluchačů a tlak veřejnosti.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce, organizátorka, květináři, hosté.
- **Děj:** Eliza is introduced through her own role and the growers' work, not as Higgins's experiment. The event is not a ball or a recreation of a known musical scene.
- **Hlavní účel:** připravit veřejnou zkoušku s více adresáty a legitimními registry.
- **Rozhodnutí hráče:** `D10` – zvolit plán code-switchingu pro organizátorku, patrona a kolegyni z květinářství.
- **Možné hodnotové změny:** žádné za výběr D10.
- **Uložení:** D10 zapisuje pouze `reception_register_plan`; event `ch05_d10_recorded`. Explicit Continue zapisuje `ch05_s01_complete`.
- **Audio momenty:** `AM43 VOICE` organizátorka vysvětluje program; `AM44 AMBIENCE` public rooms, květiny a více překrývajících se hlasů.
- **Challenge:** žádná; hráč nastavuje strategii pro následující poslech.
- **Teacher Mode:** formal register, audience, switching without erasing identity.
- **Vizuální assety:** Eliza at the `Her Own Voice` visual stage, without implying her personal development is finished; own public rooms and flower exhibition. Stage artwork is a future production dependency noted in the visual plan.
- **Audio assety:** `organizer_ch05_scene01_001.mp3`, `ch05_borough_exhibition_ambient.mp3` a přepisy.
- **Návaznost:** `ch05_s02`.

### ch05_s02 – Listening Under Pressure

- **Lokace:** hlavní sál a okraj výstavy.
- **Čas / atmosféra:** událost vrcholí; několik současných rozhovorů; AM44 remains restrained indoor crowd/footstep ambience without added music.
- **Postavy:** Eliza, patron, květinářka, organizátorka, Pickering.
- **Děj:** Eliza musí z krátkých hlasových signálů vyčíst vztah, účel a míru formálnosti. Poslech probíhá pod tlakem, ale kritická informace je vždy dostupná i textově.
- **Hlavní účel:** spojit listening, social inference a code-switching v reálném tempu.
- **Rozhodnutí hráče:** žádné hlavní; hráč volí, koho osloví jako prvního.
- **Možné hodnotové změny:** žádné za LC13 ani lokální první odpověď.
- **Uložení:** odpovědi pouze v `challenges.lc13`; první odpověď je dočasná a bez zápisu.
- **Audio momenty:** `AM45 LISTENING` tři překrývající se krátké sociální signály; `AM46 VOICE` Eliza přepne registr podle adresáta.
- **Challenge:** `LC13` – social inference: určit vztah, účel a vhodný vstup z hlasu, textu a kontextu.
- **Teacher Mode:** inference is probabilistic; politeness, status and uncertainty.
- **Vizuální assety:** několik skupin hostů, textové štítky vztahů, Eliza `Her Own Voice / attentive`.
- **Audio assety:** tři `ch05_lc13_sample_0*.mp3`, `eliza_ch05_scene02_001.mp3` a přepisy.
- **Návaznost:** `ch05_s03`.

### ch05_s03 – The Display and the Question

- **Lokace:** u hlavní květinové expozice.
- **Čas / atmosféra:** pozdější večer; hosté reagují pozitivně, ale Higgins a Pickering shrnují výsledek před ostatními.
- **Postavy:** Eliza, Higgins, Pickering, organizátorka, hosté.
- **Děj:** A guest credits the two men. Higgins accepts the framing; Pickering partially corrects it by acknowledging Eliza's work without fully challenging the social frame. Eliza hears the difference between her work and others' account of it.
- **Hlavní účel:** otevřít otázku, kdo smí definovat význam jejího úspěchu.
- **Rozhodnutí hráče:** `D11` – strategic postponement, public redirection or a private conversation. All are valid and unrated.
- **Možné hodnotové změny:** žádné za volbu D11.
- **Uložení:** D11 zapisuje pouze `credit_response`; event `ch05_d11_recorded`. Explicit Continue zapisuje `ch05_s03_complete`.
- **Audio momenty:** `AM47 VOICE` Higgins a Pickering mluví o výsledku; `AM48 VOICE` Eliza formuluje vlastní nárok na úspěch.
- **Challenge:** žádná samostatná; rozhodnutí je sociální a jazykové.
- **Teacher Mode:** passive vs active voice, claiming credit, collective achievement.
- **Vizuální assety:** květinová expozice, Eliza `Her Own Voice / controlled`, Higgins a Pickering v centru pozornosti.
- **Audio assety:** `higgins_ch05_scene03_001.mp3`, `pickering_ch05_scene03_001.mp3`, `eliza_ch05_scene03_001.mp3` a přepisy.
- **Návaznost:** `ch05_s04`.

### ch05_s04 – What Happens to Me Now?

- **Lokace:** one quiet side room off the exhibition hall; no balcony variant. The exhibition remains faintly audible outside.
- **Čas / atmosféra:** noc; zvuk události je za dveřmi, otázka se poprvé vysloví naplno.
- **Postavy:** Eliza plus Pickering after `d11_private_conversation`; otherwise Mrs Pearce.
- **Děj:** Eliza se ptá: `What happens to me now?` Nejde o žádost o záchranu, ale o otázku vlastnictví budoucnosti. Druhá postava může nabídnout cestu, ne odpověď místo ní.
- **Hlavní účel:** převést veřejný úspěch do osobní a dlouhodobé otázky.
- **Rozhodnutí hráče:** personal expression choice `future_question_style`: direct, indirect or plan-focused. It is not scored.
- **Možné hodnotové změny:** žádné za question style ani LC14.
- **Uložení:** `future_question_style` plus challenge state in `challenges.lc14`; events `ch05_future_question_style_recorded`, `ch05_lc14_completed`. Explicit Continue writes `ch05_s04_complete`.
- **Audio momenty:** `AM49 VOICE / LC14 LISTENING` branch dialogue and contextual sample; `AM50 AMBIENCE` quiet side room.
- **Challenge:** `LC14` – choose a question fitting the companion's stated information need. The key is contextual, not a hierarchy of directness or formality.
- **Teacher Mode:** future questions, agency language, asking for options rather than permission.
- **Vizuální assety:** shared side room; Eliza `Her Own Voice / thoughtful`; companion chosen from D11.
- **Audio assety:** branch dialogue and LC14 transcripts; `ch05_lambeth_side_room_ambient.mp3`.
- **Návaznost:** `ch05_s05`.

### ch05_s05 – Leaving the Hall

- **Lokace:** schody před Lambeth Public Rooms.
- **Čas / atmosféra:** pozdní noc; hosté odcházejí, město se zklidňuje.
- **Postavy:** Eliza; Higgins may ask whether she is coming, but she does not automatically follow him. Contact intention is a separate local choice.
- **Děj:** Eliza odchází z události s úspěchem, který není konečnou odpovědí. Původní motivace z Chapter I se střetne s novou možností volby.
- **Hlavní účel:** připravit poslední kapitolu a zachovat několik legitimních cest vpřed.
- **Rozhodnutí hráče:** žádné hlavní; závěrečná lokální volba, komu Eliza napíše, koho navštíví nebo s kým naváže kontakt jako první.
- **Možné hodnotové změny:** explicit S05 completion grants Independence +1 once, unconditionally. Choice of `next_contact` grants nothing.
- **Uložení:** `long-term: ano` jako vstup do Chapter VI.
- **Audio momenty:** `AM51 VOICE` Eliza's open closing statement; `AM52 AMBIENCE + SFX` restrained night loop and optional one-shot. No modern vehicles or traffic bed.
- **Challenge:** žádná; kapitola vrcholí otevřenou otázkou.
- **Teacher Mode:** reflecting on success, options and uncertainty.
- **Vizuální assety:** schody Lambeth Public Rooms, Eliza `Her Own Voice / composed`, městská noc.
- **Audio assety:** `eliza_ch05_scene05_001.mp3`, `ch05_lambeth_steps_night_ambient.mp3`, optional `sfx_lambeth_public_rooms_exit_001.mp3` and transcripts.
- **Návaznost:** explicit Continue after `next_contact` writes `ch05_s05_complete` and moves to `ch06_s01`. Chapter VI may read `origin_motivation`, `reception_register_plan`, `credit_response`, `future_question_style` and `next_contact`. No value makes an ending unavailable.

Exact scene text, options, answer keys and asset contracts are in docs/chapters/ch05/.

## Chapter VI – Her Own Voice

**Dramatic arc:** Chapter VI uzavírá Elizinu agency arc. Naučené jazykové nástroje rozšiřují její repertoár a nenahrazují identitu. Cockney není méněcenné já, kultivovaná řeč není nadřazené já a registr je volba. Všechny tři směry jsou stejně legitimní; žádná historie ani signál je neuzamyká nebo neřadí.

**Audio profile:** `AM53–AM60` cover optional companion/story voice, quiet ambience, reused reflective clips, three objective `LC15` samples and one shared final Eliza take reused across all directions. Audio does not replace text; no challenge is graded for accent. Details and asset status are in `docs/chapters/ch06/AUDIO_PLAN.md`.

### ch06_s01 – The Morning After

- **Lokace:** jedna ranní místnost přilehlá k Higginsově pracovně ve Wimpole Street.
- **Čas / atmosféra:** ráno po recepci; klidný interiér, dopisy, poznámky a pozvání na stole.
- **Postavy:** Eliza; první kontakt Higgins, Pickering nebo Mrs Pearce podle `next_contact`.
- **Děj:** Eliza prohlíží veřejnou/společenskou příležitost, placenou práci a možnost společné práce s pěstiteli. Není na Higginsově rozhodnutí závislá. Postavy reagují charakterově, všechny trasy se sbíhají a nenabízejí lepší informaci ani odměnu.
- **Rozhodnutí / challenge:** žádné.
- **Hodnoty a uložení:** žádné změny; historické hodnoty pouze lehce barví formulaci. Chybějící historie neblokuje scénu.
- **Audio / vizuál:** `AM53` optional kontakt/story voice; `AM54` optional ranní ambience. Jedna ranní místnost, Eliza `Her Own Voice`, dopisy a poznámky.
- **Teacher Mode:** agency po vzdělávání; příležitost versus závislost; kdo definuje úspěch.
- **Návaznost:** explicit Continue → `ch06_s02`.

### ch06_s02 – The Question in the Mirror

- **Lokace:** klidná soukromá místnost s jednoduchým zrcadlem.
- **Děj:** Eliza reflektuje několik smysluplných ozvěn své cesty, nikoli celý save recap. Dochází k tomu, že další způsob řeči první nesmazal. Volitelný replay je read-only.
- **Rozhodnutí / challenge / hodnoty:** žádné; žádná změna stavu.
- **Audio / vizuál:** `AM55` reuse schválených dřívějších Eliza clips; `AM56` optional jedna reflexivní replika. Zrcadlo slouží sebepoznání, ne kráse či „stávání se dámou“.
- **Teacher Mode:** code-switching, register, identita, předsudky k přízvuku, jazykový repertoár.
- **Návaznost:** explicit Continue → `ch06_s03`.

### ch06_s03 – Three Ways Forward

- **Lokace:** ranní místnost a stůl s nabídkami.
- **Děj:** D12 nabídne tři osobní směry bez hodnocení; historie žádný směr nepředvybere. LC15 ověří pragmatický kontext, nikoli správnou identitu nebo registr.
- **D12:** přesné texty a stabilní ID jsou v `docs/chapters/ch06/SCRIPT.md`; hodnoty `social_success`, `independent_voice`, `integrated_identity` se ukládají do `chapter6_direction`.
- **LC15:** přesně tři vzorky; žák určí pravděpodobného adresáta a účel z kontextových vodítek. Objektivní klíč vychází z oslovení, záměru a situace; prestiž není vodítko. Odpovědi mají stabilní ID a opakovatelné pokusy bez penalizace. No-audio textová alternativa zachová vodítka bez raw transcriptu, který by prozradil odpověď. LC15 nepřidává `Pronunciation`.
- **Hodnoty / uložení:** jediné nové směrové rozhodnutí D12; žádný score, ending threshold ani snapshot. D12 se po zápisu tiše nepřepisuje.
- **Audio / vizuál:** `AM57–AM58`; tři LC15 sample takes, textové opory, jeden stůl se třemi stejně neutrálními pozvánkami.
- **Teacher Mode:** D12 nemá answer key; LC15 má objektivní kontextový klíč.
- **Návaznost:** po uloženém D12, dokončení LC15 a explicit Continue → `ch06_s04`.

### ch06_s04 – Her Own Statement

- **Lokace:** jeden jednoduchý prostor vybraný směrem z D12.
- **Děj:** Eliza volí rétorický tvar svého výroku: `declaration`, `reflection` nebo `commitment`. Tvar nemění `chapter6_direction`; text se skládá z opakovaně použitelných textových částí.
- **Hodnoty / uložení:** uložit `final_statement_shape`; vykreslení složeného statementu reward nepřidává. Po explicitním potvrzení/doručení zapsat `ch06_final_statement_delivered` a udělit `Confidence +1` jednou a bezpodmínečně. Tvar volby reward nemění.
- **Audio / vizuál:** žádný nový take pro composed statement; sdílená závěrečná věta patří do S05.
- **Teacher Mode:** účel rétoriky a sebepojmenování; tvar nemá answer key.
- **Návaznost:** explicit Continue → `ch06_s05`.

### ch06_s05 – The Voice She Chooses

- **Lokace / větve:** public/community prostor pro PUBLIC PARTICIPATION (`social_success`); skromné pracoviště s květinami, ledgerem, klíči a dopisem pro `independent_voice`; propojený komunitní prostor pro `integrated_identity`. Žádná větev není „nejlepší“; chudoba se neromantizuje a kultivovaná řeč není falešná.
- **Děj:** reflexivní uzavření a popisné shrnutí z nezávisle uložené historie; žádný numeric grade, ending rank ani další rozhodnutí.
- **Závěrečná věta:** společná pro všechny směry: “I have more ways to speak, and the choice is mine.”
- **Konvergence:** všechny tři branch presentation se sbíhají na stejné závěrečné větě a poté následuje popisné shrnutí.
- **Hodnoty / uložení:** Finish po explicitní akci uloží `ch06_complete` a idempotentní completion event/guard `ch06_completion_recorded`; nepřidává žádný signal.
- **Replay:** read-only vybrané momenty motivace, učení/recovery, Chapter V recepce/kreditu a S04 statementu.
- **Audio / vizuál:** `AM59` jeden sdílený Eliza take pro všechny tři směry a `AM60` reuse nebo jedna sdílená tichá ambience; existující Eliza master, větví se především prostředí a rekvizity.
- **Teacher Mode:** popisné shrnutí, agency, ekonomická nezávislost, pragmatická kompetence bez pořadí.
- **Návaznost:** explicit Finish → finální book-complete screen; žádný Chapter VII.

### Chapter VI history use

`origin_motivation`, `confirmed_motivation`, `motivation_shift`, `practice_preference`, `decisions.D08`, `decisions.D09`, `Pronunciation`, `Confidence`, `Independence`, `reception_register_plan`, `credit_response`, `future_question_style` and `next_contact` are optional read-only context. They may shape concise reflective wording and summary clauses. Missing values are omitted or described neutrally. No historical field selects a direction, changes its availability or ranks it. Detailed event and save contract is in `docs/chapters/ch06/STATE_AND_BRANCHING.md`.

## Implementační souhrn

- **Kapitoly:** 6.
- **Hlavní scény:** 31; Chapter III má šest scén, ostatních pět kapitol po pěti scénách.
- **Hlavní decisions:** 12 (`D01`–`D12`).
- **Language challenges:** 15 (`LC01`–`LC15`).
- **Plánované audio moments:** 60 (`AM01`–`AM60`), vždy s kategorií `VOICE`, `LISTENING`, `PRONUNCIATION`, `SFX` nebo `AMBIENCE`.
- **Canonical visual stages:** 3 (`Flower Girl`, `In Training`, `Her Own Voice`).
- **Ukládané dlouhodobé osy:** `origin_motivation`, `confirmed_motivation`, případný `motivation_shift` / `motivation_nuance`, významné strategie a rozhodnutí, tři development signals, `chapter6_direction`, `final_statement_shape` a `ch06_complete` podle vlastních kontraktů. Nepersistuje se aggregate `final_state`.

## Scope guard

Mapa neurčuje finální dialogy, implementaci story enginu, UI ani konkrétní audio soubory. Všechny budoucí assety musí respektovat visual bible, audio voice bible, jazyková pravidla a copyright boundaries.
