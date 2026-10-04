# Scene Map

Tento dokument je canonical detailní mapa všech šesti kapitol. Určuje stabilní identifikátory scén, uzly rozhodnutí, jazykové výzvy, dlouhodobě ukládané hodnoty a minimální assetové potřeby. Není to finální dialogový scénář.

Scénově specifické Teacher Mode poznámky zůstávají u jednotlivých scén. Jednotnou chapter-level strukturu, contextualitu, answer keys a progress-safe replay definuje [`TEACHER_MODE_SPEC.md`](TEACHER_MODE_SPEC.md).

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
- Thresholdy pro „výhru“ ani minimální skóre pro ending zatím neexistují; Chapter VI používá Ending Synthesis Matrix níže.

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
- **Možné hodnotové změny:** unaided dokončení LC10 přidá `Pronunciation +1` právě jednou přes `ch03_lc10_completed`. Podporované dokončení nemá odměnu ani penalizaci. Confidence a Independence se nemění.
- **Uložení:** pouze obvyklý `challenges.lc10` a event ledger; žádný `lesson_progress_snapshot`, Chapter III mastery event ani nové top-level pole.
- **Audio momenty:** AM31 Elizina sebeoprava; AM32 Higginsovo stručné rozpoznání; AM33 tři LC10 ukázky. Pouze plán, žádné generace.
- **Challenge:** LC10 – ve třech krátkých praktických příkladech poslechnout první pokus a Elizinu opravu a vybrat zprávu, kterou nakonec zamýšlí sdělit. Přenos dříve naučených strategií, nikoli obecný gramatický test.
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

- **Lokace:** večerní ulice mezi společenskou místností a domovem.
- **Čas / atmosféra:** noc po prvním testu; chlad, doznívající hlasy, prostor pro vlastní myšlenky.
- **Postavy:** Eliza, případně Pickering v krátkém rozloučení.
- **Děj:** Eliza si uvědomí, že může zvolit, kdy chce být pečlivá a kdy spontánní. Výsledek testu není „prošla/neprošla“, ale nový datový bod pro její vlastní strategii.
- **Hlavní účel:** uzavřít první test a připravit veřejnější Chapter V.
- **Rozhodnutí hráče:** žádné hlavní; volitelná replay reflexe.
- **Možné hodnotové změny:** uložená volba `decisions.D08` může zabarvit pozdější Elizinu reflexi; žádný signal increment.
- **Uložení:** používá se stávající decision ledger `decisions.D08`; žádné samostatné pole strategie ani známkování.
- **Audio momenty:** `AM41 VOICE` Elizina krátká sebereflexe; `AM42 AMBIENCE` noční ulice a kroky.
- **Challenge:** žádná; kapitola vrcholí interpretací zkušenosti.
- **Teacher Mode:** code-switching as repertoire, not disguise.
- **Vizuální assety:** noční ulice, Eliza `In Training / self-aware`, světla domu.
- **Audio assety:** `eliza_ch04_scene05_001.mp3`, `ambience_evening_walk_001.mp3` a přepis.
- **Návaznost:** `ch05_s01`.

## Chapter V – The Reception

**Dramatic arc:** Eliza vstupuje do vlastní, nově vytvořené společenské události. Pod tlakem poslouchá, přepíná registr a zjišťuje, že Higgins a Pickering začínají její úspěch vyprávět jako svůj experimentální výsledek.

**Audio profile:** `VOICE` organizátorka, hosté, Eliza, Higgins a Pickering; `LISTENING` social inference under pressure; `PRONUNCIATION` srozumitelnost v ruchu a code-switching; `SFX` public rooms, schody a městská doprava; `AMBIENCE` vlastní veřejná výstava a noční odchod.

### ch05_s01 – The Borough Exhibition Evening

- **Lokace:** Lambeth Public Rooms; vlastní veřejná večerní událost s výstavou květinářů, krátkými představeními a občanským programem.
- **Čas / atmosféra:** podvečer; světla, program, více skupin posluchačů a tlak veřejnosti.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce, organizátorka, květináři, hosté.
- **Děj:** Eliza není vystavena jako Higginsův experiment; má uvést část programu a představit práci květinářů. Událost není ples ani mechanická kopie známé muzikálové scény.
- **Hlavní účel:** připravit veřejnou zkoušku s více adresáty a legitimními registry.
- **Rozhodnutí hráče:** `D10` – zvolit plán code-switchingu pro organizátorku, patrona a kolegyni z květinářství.
- **Možné hodnotové změny:** `Pronunciation +1` za vědomou artikulaci, `Confidence +1` za vstup do skupiny, `Independence +1` za vlastní pořadí a obsah.
- **Uložení:** `long-term: ano`; uloží se `reception_register_plan`.
- **Audio momenty:** `AM43 VOICE` organizátorka vysvětluje program; `AM44 AMBIENCE` public rooms, květiny a více překrývajících se hlasů.
- **Challenge:** žádná; hráč nastavuje strategii pro následující poslech.
- **Teacher Mode:** formal register, audience, switching without erasing identity.
- **Vizuální assety:** Eliza `Her Own Voice / prepared` jako již dosažená vizuální fáze, nikoli hotový osobní vývoj; vlastní public rooms, květinová výstava.
- **Audio assety:** `organizer_ch05_scene01_001.mp3`, `ambience_borough-exhibition_001.mp3` a přepisy.
- **Návaznost:** `ch05_s02`.

### ch05_s02 – Listening Under Pressure

- **Lokace:** hlavní sál a okraj výstavy.
- **Čas / atmosféra:** událost vrcholí; několik současných rozhovorů, hudba pouze jako vzdálený neidentifikující podkres.
- **Postavy:** Eliza, patron, květinářka, organizátorka, Pickering.
- **Děj:** Eliza musí z krátkých hlasových signálů vyčíst vztah, účel a míru formálnosti. Poslech probíhá pod tlakem, ale kritická informace je vždy dostupná i textově.
- **Hlavní účel:** spojit listening, social inference a code-switching v reálném tempu.
- **Rozhodnutí hráče:** žádné hlavní; hráč volí, koho osloví jako prvního.
- **Možné hodnotové změny:** `Confidence +1` při vhodném vstupu; `Pronunciation +1` při udržení srozumitelnosti v ruchu.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM45 LISTENING` tři překrývající se krátké sociální signály; `AM46 VOICE` Eliza přepne registr podle adresáta.
- **Challenge:** `LC13` – social inference: určit vztah, účel a vhodný vstup z hlasu, textu a kontextu.
- **Teacher Mode:** inference is probabilistic; politeness, status and uncertainty.
- **Vizuální assety:** několik skupin hostů, textové štítky vztahů, Eliza `Her Own Voice / attentive`.
- **Audio assety:** `host_ch05_scene02_001.mp3`, `eliza_ch05_scene02_001.mp3`, `listening_reception_mix_001.mp3` a přepisy.
- **Návaznost:** `ch05_s03`.

### ch05_s03 – The Display and the Question

- **Lokace:** u hlavní květinové expozice.
- **Čas / atmosféra:** pozdější večer; hosté reagují pozitivně, ale Higgins a Pickering shrnují výsledek před ostatními.
- **Postavy:** Eliza, Higgins, Pickering, organizátorka, hosté.
- **Děj:** Higgins a Pickering začnou Elizin úspěch popisovat především jako potvrzení svého experimentu. Eliza slyší rozdíl mezi tím, co dokázala, a tím, jak je její výkon přivlastňován.
- **Hlavní účel:** otevřít otázku, kdo smí definovat význam jejího úspěchu.
- **Rozhodnutí hráče:** `D11` – přijmout jejich framing jako dočasnou strategii, veřejně přesměrovat uznání k vlastní práci a kolegům, nebo si vyžádat soukromý rozhovor.
- **Možné hodnotové změny:** `Independence +1` při přesměrování, `Confidence +1` při veřejném vstupu, žádná penalizace při strategickém odkladu.
- **Uložení:** `long-term: ano`; uloží se `credit_response`.
- **Audio momenty:** `AM47 VOICE` Higgins a Pickering mluví o výsledku; `AM48 VOICE` Eliza formuluje vlastní nárok na úspěch.
- **Challenge:** žádná samostatná; rozhodnutí je sociální a jazykové.
- **Teacher Mode:** passive vs active voice, claiming credit, collective achievement.
- **Vizuální assety:** květinová expozice, Eliza `Her Own Voice / controlled`, Higgins a Pickering v centru pozornosti.
- **Audio assety:** `higgins_ch05_scene03_001.mp3`, `pickering_ch05_scene03_001.mp3`, `eliza_ch05_scene03_001.mp3` a přepisy.
- **Návaznost:** `ch05_s04`.

### ch05_s04 – What Happens to Me Now?

- **Lokace:** tichý balkon nebo boční místnost Lambeth Public Rooms.
- **Čas / atmosféra:** noc; zvuk události je za dveřmi, otázka se poprvé vysloví naplno.
- **Postavy:** Eliza, Pickering nebo Mrs Pearce podle předchozí volby.
- **Děj:** Eliza se ptá: `What happens to me now?` Nejde o žádost o záchranu, ale o otázku vlastnictví budoucnosti. Druhá postava může nabídnout cestu, ne odpověď místo ní.
- **Hlavní účel:** převést veřejný úspěch do osobní a dlouhodobé otázky.
- **Rozhodnutí hráče:** žádné hlavní; hráč volí, zda otázku položí přímo, nepřímo, nebo ji rozšíří o konkrétní plán.
- **Možné hodnotové změny:** `Confidence +1` při přímé otázce; `Independence +1` při pojmenování vlastního plánu.
- **Uložení:** `long-term: ano` jako `future_question_style`.
- **Audio momenty:** `AM49 VOICE` Elizina otázka; `AM50 AMBIENCE` utlumená sálová ozvěna a ticho po ní.
- **Challenge:** `LC14` – formulate a difficult question using directness, politeness and implied meaning podle adresáta.
- **Teacher Mode:** future questions, agency language, asking for options rather than permission.
- **Vizuální assety:** balkon, město v noci, Eliza `Her Own Voice / uncertain but upright`.
- **Audio assety:** `eliza_ch05_scene04_001.mp3`, `ambience_civic-room_night_001.mp3` a přepis.
- **Návaznost:** `ch05_s05`.

### ch05_s05 – Leaving the Hall

- **Lokace:** schody před Lambeth Public Rooms.
- **Čas / atmosféra:** pozdní noc; hosté odcházejí, město se zklidňuje.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce podle větvení.
- **Děj:** Eliza odchází z události s úspěchem, který není konečnou odpovědí. Původní motivace z Chapter I se střetne s novou možností volby.
- **Hlavní účel:** připravit poslední kapitolu a zachovat několik legitimních cest vpřed.
- **Rozhodnutí hráče:** žádné hlavní; závěrečná lokální volba, komu Eliza napíše, koho navštíví nebo s kým naváže kontakt jako první.
- **Možné hodnotové změny:** uloží se `next_contact`; hodnoty beze změny.
- **Uložení:** `long-term: ano` jako vstup do Chapter VI.
- **Audio momenty:** `AM51 VOICE` krátké rozloučení; `AM52 SFX` schody, kočár nebo městská doprava bez melodické citace.
- **Challenge:** žádná; kapitola vrcholí otevřenou otázkou.
- **Teacher Mode:** reflecting on success, options and uncertainty.
- **Vizuální assety:** schody Lambeth Public Rooms, Eliza `Her Own Voice / composed`, městská noc.
- **Audio assety:** `eliza_ch05_scene05_001.mp3`, `sfx_lambeth-public-rooms_exit_001.mp3` a přepisy.
- **Návaznost:** `ch06_s01`; načte `origin_motivation`, `reception_register_plan` a `credit_response`.

## Chapter VI – Her Own Voice

**Dramatic arc:** Eliza musí rozhodnout, kdo bude určovat její další podobu. Tři výsledné směry nejsou známky ani tresty; jsou to kvalitativně odlišné způsoby, jak spojit dovednost, sebejistotu, původní motivaci a vlastní agency.

**Audio profile:** `VOICE` Elizina vlastní statement a větevní nabídky; `LISTENING` replay BEFORE/DURING/AFTER a volba adresáta; `PRONUNCIATION` vědomá práce s finálním registrem; `SFX` zrcadlo, dopisy a pracovní prostor; `AMBIENCE` ráno, veřejný prostor a závěrečný klid.

### ch06_s01 – The Morning After

- **Lokace:** Elizin pokoj nebo květinářská dílna.
- **Čas / atmosféra:** ráno po recepci; klid po veřejném tlaku, dopisy a nabídky na stole.
- **Postavy:** Eliza, Mrs Pearce nebo kolegyně z květinářství podle uložených voleb.
- **Děj:** Eliza čte různé možnosti: společenské pozvání, placenou práci s jazykem, nebo příležitost spojit výuku s květinářskou komunitou. Žádná možnost není automaticky nejlepší.
- **Hlavní účel:** zviditelnit důsledky všech tří hodnot a původní motivace.
- **Rozhodnutí hráče:** žádné hlavní; hráč si prohlédne nabídky v libovolném pořadí.
- **Možné hodnotové změny:** žádné; načtou se `Pronunciation`, `Confidence`, `Independence` a `origin_motivation`.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM53 VOICE` čtení krátkých nabídek; `AM54 AMBIENCE` ranní ulice a dílna.
- **Challenge:** žádná; scéna rekapituluje uložené důsledky.
- **Teacher Mode:** reading offers, comparing tone and agency in written language.
- **Vizuální assety:** Eliza `Her Own Voice / reflective`, dopisy, nástroje květinářství, ranní světlo.
- **Audio assety:** `narrator_ch06_scene01_001.mp3`, `ambience_morning_workroom_001.mp3` a přepisy nabídek.
- **Návaznost:** `ch06_s02`.

### ch06_s02 – The Question in the Mirror

- **Lokace:** pokoj s jednoduchým zrcadlem a pracovním stolem.
- **Čas / atmosféra:** dopoledne; soukromý prostor pro přímou otázku.
- **Postavy:** Eliza, její odraz, případně krátká vzpomínková hlasová stopa Higgins/Pickering.
- **Děj:** Eliza si položí hlavní otázku hry: `Who gets to decide who Eliza becomes?` Přehraje si vlastní starší registry a rozhodne, které si ponechá jako nástroje.
- **Hlavní účel:** připravit volbu jako vědomé rozhodnutí, ne jako výpočet správného ending score.
- **Rozhodnutí hráče:** žádné nové hlavní; hráč porovná dřívější `register` stopy a zvolí, co chce ještě slyšet.
- **Možné hodnotové změny:** žádné; replay podporuje interpretaci vlastního vývoje.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM55 LISTENING` krátké replay stopy BEFORE/DURING/AFTER; `AM56 VOICE` Eliza vlastní otázku formuluje v klidném tempu.
- **Challenge:** žádná; přístupnost vyžaduje textový přepis každé replay stopy.
- **Teacher Mode:** identity, register repertoire, reflection without self-erasure.
- **Vizuální assety:** zrcadlo, tři jemné expression varianty stejné Elizy, dopisy z předchozí scény.
- **Audio assety:** `eliza_ch06_scene02_001.mp3`, replay odkazy na schválené Eliza BEFORE/DURING/AFTER stopy a přepisy.
- **Návaznost:** `ch06_s03`.

### ch06_s03 – Three Ways Forward

- **Lokace:** pracovní stůl a otevřené dveře do ulice.
- **Čas / atmosféra:** pozdní dopoledne; rozhodnutí je klidné, konkrétní a bez soudcovského komentáře.
- **Postavy:** Eliza; v jednotlivých variantách se mohou objevit Higgins, Pickering, Mrs Pearce nebo kolegyně.
- **Děj:** Hráč učiní finální volbu ve světle uložených hodnot a původní motivace. Systém nabídne tři kvalitativní směry: `Social Success`, `Independent Voice`, `Integrated Identity`. Žádný není good/neutral/bad.
- **Hlavní účel:** vyřešit otázku agency a převést dlouhodobé důsledky do odlišné budoucnosti.
- **Rozhodnutí hráče:** `D12` – zvolit cestu, která nejlépe odpovídá Elizině vlastnímu záměru; hodnoty pouze obohacují kontext a dostupné formulace.
- **Možné hodnotové změny:** žádné bodové vítězství; uloží se `ending_direction` a finální snapshot všech tří hodnot.
- **Uložení:** `long-term: ano`.
- **Výstupní směry:** `Social Success` – Eliza vstoupí do veřejného světa a používá registry strategicky, aniž by přijala cizí vlastnictví svého úspěchu; `Independent Voice` – vybuduje vlastní práci a rozhoduje, kdy a proč registr mění; `Integrated Identity` – propojí květinářskou komunitu, výuku a společenské dovednosti do vlastní cesty.
- **Audio momenty:** `AM57 VOICE` tři krátké varianty nabídky budoucnosti; `AM58 LISTENING` rozdílné registry každé větve, všechny se stejnou Elizinou hlasovou identitou.
- **Challenge:** `LC15` – integrated register challenge: vybrat způsob projevu pro tři adresáty a vysvětlit vlastní volbu.
- **Teacher Mode:** code-switching, identity and agency; žádná větev není odměna za „správný“ přízvuk.
- **Vizuální assety:** Eliza `Her Own Voice` ve třech výrazových/outfitových variantách respektujících visual bible; tři pracovní prostředí.
- **Audio assety:** `eliza_ch06_scene03_social-success_001.mp3`, `eliza_ch06_scene03_independent-voice_001.mp3`, `eliza_ch06_scene03_integrated-identity_001.mp3` a přepisy.
- **Návaznost:** všechny větve vedou do `ch06_s04` s parametrem `ending_direction`.

### Ending Synthesis Matrix

`D12` nikdy nepoužívá jediný práh ani mechanické pořadí dobrý/špatný. Všechny tři směry zůstávají dostupné; uložená historie pouze mění formulaci, delivery, vedlejší reakce, vizuální variantu, epilog a Teacher Mode summary.

| Historie / stav | Použití při syntéze | Co nesmí způsobit |
| --- | --- | --- |
| `origin_motivation` | Historický výchozí důvod; zabarví jazyk nabídky a vzpomínkovou formulaci. | Nesmí předurčit ending ani zablokovat změnu. |
| `confirmed_motivation` / `motivation_shift` | Aktuální vlastní pojmenování cíle; při rozdílu vznikne dramatická varianta formulace. | Změna motivace není chyba ani ztráta hodnoty. |
| `practice_preference` | Ovlivní, jak Eliza popíše cestu učení a jakou podporu přijme. | Nesmí být skrytým testem poslušnosti. |
| `intonation_strategy` | Určí míru jistoty, otázkovosti a vědomého postoje ve finálním projevu. | Nesmí zaměnit intonaci za morální sebejistotu. |
| `decisions.D08` | Uložená přípravná volba může zabarvit Elizinu reflexi sociální zkušenosti. | Nesmí odstranit žádnou možnost ani změnit signal či hodnotit volbu. |
| `decisions.D09` | Uložená recovery preference může později zabarvit formulaci reflexe. | Žádný styl opravy není lepší; volba nesmí snižovat lidskou hodnotu Elizy. |
| `reception_register_plan` | Vybere adresáty a přirozenější code-switching ve finálním statementu. | Nesmí označit jeden registr za jediný správný. |
| `credit_response` | Ovlivní, zda vedlejší postavy v epilogu uznají Elizinu práci, kolektiv nebo vlastní experiment. | Strategický odklad nesmí být trest. |
| `Pronunciation` | Dodá míru artikulační jistoty a dostupné varianty formulace. | Číselný stav nesmí sám blokovat směr. |
| `Confidence` | Dodá míru přímého vstupu, pauzy a podpory od vedlejších postav. | Vyšší počet příležitostí nesmí vytvořit vítězný ending. |
| `Independence` | Dodá míru vlastního rámování budoucnosti a přesměrování uznání. | Nízký stav nesmí uzamknout agency. |
| `ending_direction` | Explicitní finální volba `Social Success`, `Independent Voice` nebo `Integrated Identity`. | Nesmí být přejmenována na good/neutral/bad. |

| Směr | Formulace a delivery | Vedlejší postavy / vizuál | Epilog a Teacher Mode |
| --- | --- | --- | --- |
| `Social Success` | Eliza volí sebejistý veřejný registr, ale může ponechat vlastní spontánní obrat. | Publikum a organizátorka reagují na její autorství; `Her Own Voice` je veřejně otevřená, ne „hotová“. | Epilog sleduje veřejnou práci, přepis zdůrazní strategickou volbu registru. |
| `Independent Voice` | Eliza používá přímější, vlastním cílem řízený projev a sama volí míru formálnosti. | Higgins/Pickering ustupují z centra; vizuál zdůrazní vlastní pracovní prostor a hranice. | Epilog sleduje vlastní projekt; Teacher Mode zdůrazní agency a requests/boundaries. |
| `Integrated Identity` | Eliza vědomě kombinuje registry podle vztahu a situace bez rozštěpení na „starou“ a „novou“ osobu. | Květinářská komunita a učební svět se propojí; vizuál ukáže stejnou Elizu v několika prostředích. | Epilog sleduje sdílenou práci a repertoár; Teacher Mode shrne code-switching bez hierarchie přízvuků. |

### ch06_s04 – Her Own Statement

- **Lokace:** veřejný nebo komunitní prostor podle finální větve.
- **Čas / atmosféra:** pozdější den; Eliza mluví k vybranému publiku z vlastní pozice.
- **Postavy:** Eliza, adresáti z finální větve, případně Higgins/Pickering pouze jako posluchači.
- **Děj:** Eliza vytvoří krátké vlastní představení své práce a záměru. Nejde o závěrečnou zkoušku z přízvuku, ale o situaci, kde volí obsah, registr i míru sdílení.
- **Hlavní účel:** ukázat agency v praxi a uzavřít jazykový oblouk bez vymazání původu.
- **Rozhodnutí hráče:** žádné nové hlavní; hráč zvolí, zda začne cílem, zkušeností, nebo nabídkou pro publikum.
- **Možné hodnotové změny:** `Confidence +1` jako lokální uzavření; finální hodnoty zůstávají interpretací cesty.
- **Uložení:** `long-term: ano` jako `final_statement_shape`.
- **Audio momenty:** `AM59 VOICE` finální Elizin vlastní statement; `AM60 AMBIENCE` reakce publika podle větve bez hodnotícího komentáře.
- **Challenge:** žádná nová; `LC15` se projeví v dokončené větě.
- **Teacher Mode:** audience, register choice, self-presentation and ownership.
- **Vizuální assety:** větevní prostředí, Eliza `Her Own Voice / assured`, posluchači.
- **Audio assety:** tři varianty `eliza_ch06_scene04_*.mp3`, `ambience_final-audience_*.mp3` a přepisy.
- **Návaznost:** `ch06_s05`.

### ch06_s05 – The Voice She Chooses

- **Lokace:** závěrečné místo zvolené větví.
- **Čas / atmosféra:** klid po statementu; prostor pro krátkou doznívající epizodu.
- **Postavy:** Eliza, jedna blízká postava nebo kolektiv podle větve.
- **Děj:** Hra zobrazí, že Eliza má více registrů a může je používat vědomě. Závěr potvrzuje její vlastní agency, ne definitivní „dokonalost“.
- **Hlavní účel:** uzavřít příběh a připravit progress summary pro hráče a Teacher Mode.
- **Rozhodnutí hráče:** žádné; možnost replay vybraných scén a otevření summary.
- **Možné hodnotové změny:** žádné další; uloží se final state.
- **Uložení:** `long-term: ano`; `final_state` obsahuje motivaci, tři hodnoty, rozhodnutí a ending direction.
- **Audio momenty:** replay posledního `AM59` a volitelná tichá `AM60` ambience podle větve.
- **Challenge:** žádná.
- **Teacher Mode:** shrnutí jazykových strategií a kulturního kontextu bez morálního žebříčku.
- **Vizuální assety:** finální canonical Eliza `Her Own Voice`, větevní pozadí a jednoduchý progress summary.
- **Audio assety:** finální branch ambience, replay odkazy, přepisy a accessibility labels.
- **Návaznost:** konec hry; `replay` může otevřít mapu scén bez změny uloženého finálního stavu.

## Implementační souhrn

- **Kapitoly:** 6.
- **Hlavní scény:** 31; Chapter III má šest scén, ostatních pět kapitol po pěti scénách.
- **Hlavní decisions:** 12 (`D01`–`D12`).
- **Language challenges:** 15 (`LC01`–`LC15`).
- **Plánované audio moments:** 60 (`AM01`–`AM60`), vždy s kategorií `VOICE`, `LISTENING`, `PRONUNCIATION`, `SFX` nebo `AMBIENCE`.
- **Canonical visual stages:** 3 (`Flower Girl`, `In Training`, `Her Own Voice`).
- **Ukládané dlouhodobé osy:** `origin_motivation`, `confirmed_motivation`, případný `motivation_shift` / `motivation_nuance`, významné strategie a rozhodnutí, tři hodnoty a `ending_direction`.

## Scope guard

Mapa neurčuje finální dialogy, implementaci story enginu, UI ani konkrétní audio soubory. Všechny budoucí assety musí respektovat visual bible, audio voice bible, jazyková pravidla a copyright boundaries.
