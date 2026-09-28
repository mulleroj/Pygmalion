# Scene Map

Tento dokument je canonical detailní mapa všech šesti kapitol. Určuje stabilní identifikátory scén, uzly rozhodnutí, jazykové výzvy, dlouhodobě ukládané hodnoty a minimální assetové potřeby. Není to finální dialogový scénář.

## Map conventions

- Hlavní smyčka: `Story → Decision → Listen → Language Challenge → Consequence → Story`.
- Hodnoty `Pronunciation`, `Confidence` a `Independence` jsou vývojové signály, nikoli good/bad nebo morality scores.
- `Dxx` označuje hlavní rozhodnutí; `LCxx` jazykovou nebo poslechovou výzvu; `AMxx` plánovaný audio moment.
- `long-term: ano` znamená, že se volba nebo významný výsledek ukládá do progressu. `long-term: ne` označuje lokální důsledek nebo scénovou stopu.
- Všechny nové dialogy jsou pouze pracovní záměr. Signature line z Chapter I je jediný zde uvedený pevný text.
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
- **Možné hodnotové změny:** při správném rozlišení `Pronunciation +1` jako dovednost pozornosti; při chybě žádný morality penalty.
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
- **Možné hodnotové změny:** `Confidence +1` při jasném požadavku; `Pronunciation +1` při vědomém přepnutí registru; `Independence +1` při pojmenování ceny a hranice.
- **Uložení:** `long-term: ano`; uloží se `request_strategy`.
- **Audio momenty:** `AM11 VOICE` Elizina žádost; `AM12 SFX` dveře, kroky a změna akustiky z ulice do domu.
- **Challenge:** `LC03` – převést přímý požadavek do zdvořilé formy bez ztráty významu.
- **Teacher Mode:** requests, polite forms, directness vs rudeness.
- **Vizuální assety:** Eliza `Flower Girl / determined`, vstup domu, Mrs Pearce u dveří.
- **Audio assety:** `eliza_ch02_scene01_001.mp3`, `sfx_house_door_001.mp3` a přepisy.
- **Návaznost:** `ch02_s02`.

### ch02_s02 – Terms on the Table

- **Lokace:** Higginsova pracovní místnost.
- **Čas / atmosféra:** dopoledne; stůl s papíry, nástroji a šálky, napětí mezi domácností a laboratoří.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce.
- **Děj:** Higgins mluví o lekcích jako o experimentu, zatímco Pickering upozorňuje na člověka a Mrs Pearce na praktické důsledky. Eliza slyší, že její peníze a práce mají společenskou hodnotu.
- **Hlavní účel:** ukázat konflikt mezi Higginsovou fascinací a Eliziným vlastním cílem.
- **Rozhodnutí hráče:** žádné hlavní; hráč přiřazuje, kdo je adresátem jednotlivých replik.
- **Možné hodnotové změny:** při přesném rozlišení implied meaning `Confidence +1`; bez morality penalty při chybě.
- **Uložení:** `long-term: ne`; uloží se `experiment_framing_heard`.
- **Audio momenty:** `AM13 VOICE` Higginsův experimentální framing; `AM14 LISTENING` Pickering a Mrs Pearce zpochybní jeho jednostrannost.
- **Challenge:** `LC04` – rozlišit, zda replika vyjadřuje nabídku, hodnocení, nebo skrytou podmínku.
- **Teacher Mode:** formal / informal register a implied meaning v institucionálním rozhovoru.
- **Vizuální assety:** pracovní stůl, zápisníky, Eliza mezi třemi různými postoji dospělých.
- **Audio assety:** `higgins_ch02_scene02_001.mp3`, `pickering_ch02_scene02_001.mp3`, `mrs-pearce_ch02_scene02_001.mp3` a přepisy.
- **Návaznost:** `ch02_s03`.

### ch02_s03 – Mrs Pearce's Questions

- **Lokace:** kuchyňská část domu a přilehlá chodba.
- **Čas / atmosféra:** pozdní dopoledne; praktičtější, klidnější prostor mimo Higginsův stůl.
- **Postavy:** Eliza, Mrs Pearce, krátce Higgins.
- **Děj:** Mrs Pearce se ptá na čas, peníze, oblečení, únavu a zacházení. Je lidskou autoritou, která neidealizuje ani nezlehčuje rizika výuky.
- **Hlavní účel:** dát Elize prostor pojmenovat hranice před uzavřením dohody.
- **Rozhodnutí hráče:** žádné hlavní; volitelná mikroodpověď určuje, zda Eliza požádá o další vysvětlení.
- **Možné hodnotové změny:** `Confidence +1` při vyžádání vysvětlení; lokální `boundary_questioned`.
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
- **Audio assety:** `higgins_ch02_scene04_001.mp3`, `sfx_coins_writing_clock_001.mp3` a přepis podmínek.
- **Návaznost:** `ch02_s05`.

### ch02_s05 – Why I Am Here

- **Lokace:** chodba před pracovnou, později práh učebny.
- **Čas / atmosféra:** odpoledne; první klid po vyjednávání, směs očekávání a obav.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce.
- **Děj:** Eliza musí před začátkem lekcí jasně říct, proč vstupuje do výuky. Její odpověď může původní motivaci z Chapter I potvrdit, zpřesnit nebo změnit; nesmí ji nahradit Higginsovým cílem.
- **Hlavní účel:** uzavřít kapitolu explicitním vstupním závazkem.
- **Rozhodnutí hráče:** `D05` – potvrdit hlavní důvod: `Opportunity`, `Respect`, `Learning` nebo `Independence`, s možností krátkého vlastního upřesnění.
- **Možné hodnotové změny:** žádný increment za konzistenci ani za změnu motivace. `origin_motivation` zůstává historický údaj; aktuální volba se zapíše jako `confirmed_motivation`, při odlišné volbě také `motivation_shift` a případně `motivation_nuance`.
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

- **Lokace:** učebna, později chodba domu.
- **Čas / atmosféra:** večer; únava, ale rostoucí kontrola a potřeba použít nový nástroj.
- **Postavy:** Eliza, Higgins, Pickering.
- **Děj:** Eliza pracuje se sentence stress a intonací. Higgins chce přesný tvar; Eliza zjišťuje, že stejná věta může znít jako otázka, nabídka, výzva nebo obrana.
- **Hlavní účel:** propojit intonaci s agenturou a významem, ne s dekorativním „správným přízvukem“.
- **Rozhodnutí hráče:** `D07` – zvolit, zda Eliza v klíčové replice použije pečlivý trénovaný tvar, spontánní tvar, nebo vědomou směs obou.
- **Možné hodnotové změny:** `Pronunciation +1` při kontrole intonace, `Confidence +1` při spontánní volbě, `Independence +1` při vědomé směsi.
- **Uložení:** `long-term: ano`; uloží se `intonation_strategy`.
- **Audio momenty:** `AM27 PRONUNCIATION` tři intonační varianty; `AM28 VOICE` Eliza stejný význam přeformuluje v odlišných registrech.
- **Challenge:** `LC08` – sentence stress a intonation; určit zamýšlený postoj a zvolit vhodný tvar.
- **Teacher Mode:** intonation, sentence stress, implied attitude.
- **Vizuální assety:** Eliza `In Training / controlled`, značky důrazu v textu, chodba jako prostor pro replay.
- **Audio assety:** `eliza_ch03_scene04_001.mp3`, `higgins_ch03_scene04_001.mp3`, `pronunciation_intonation_001.mp3` a přepisy.
- **Návaznost:** `ch03_s05`.

### ch03_s05 – The Bad Day

- **Lokace:** učebna po nepovedeném cvičení.
- **Čas / atmosféra:** deštivé odpoledne o několik dní později; únava a odpor k dalšímu opakování.
- **Postavy:** Eliza, Higgins, Mrs Pearce.
- **Děj:** Eliza se několikrát splete, Higgins opravuje příliš rychle a vzniká konflikt mezi technickou přesností a její důvěrou. Mrs Pearce pomůže rozlišit opravu zvuku od hodnocení člověka.
- **Hlavní účel:** ukázat frustraci jako legitimní část učení a dát hráči možnost vyjednat tempo.
- **Rozhodnutí hráče:** žádné hlavní; hráč volí replay, pauzu nebo žádost o jiný příklad.
- **Možné hodnotové změny:** `Confidence +1` při žádosti o pauzu; lokální `lesson_pace_reset`.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM29 VOICE` nesoulad Higginsovy opravy a Eliziny reakce; `AM30 AMBIENCE` déšť a ticho po neúspěšném pokusu.
- **Challenge:** `LC09` – listening for correction vs insult; hráč určí, která reakce podporuje učení.
- **Teacher Mode:** feedback language, repair, asking for a slower explanation.
- **Vizuální assety:** Eliza `In Training / frustrated`, zavřené učební pomůcky, Mrs Pearce u dveří.
- **Audio assety:** `eliza_ch03_scene05_001.mp3`, `higgins_ch03_scene05_001.mp3`, `ambience_rain_lesson_001.mp3` a přepisy.
- **Návaznost:** `ch03_s06`.

### ch03_s06 – A Small Victory

- **Lokace:** malý lokální obchod nebo květinový stánek při zkoušce s veřejností.
- **Čas / atmosféra:** jasné ráno; krátká, konkrétní příležitost použít naučené dovednosti.
- **Postavy:** Eliza, Mrs Pearce, zákazník, Higgins pozoruje z dálky.
- **Děj:** Eliza správně rozliší podobný výraz, použije důraz a sama opraví intonaci při objednávce. Úspěch není proměna osobnosti; je to důkaz, že má další nástroj.
- **Hlavní účel:** uzavřít kapitolu hmatatelným pokrokem a připravit první společenský test.
- **Rozhodnutí hráče:** žádné hlavní; volba, zda si Eliza vyžádá replay, uloží vlastní poznámku nebo pokračuje bez komentáře.
- **Možné hodnotové změny:** `Pronunciation +1`, `Confidence +1`; `Independence +1` při vlastní sebereflexi.
- **Uložení:** `long-term: ano` jako `lesson_progress_snapshot`, nikoli jako známka.
- **Audio momenty:** `AM31 LISTENING` zákazníkova krátká objednávka; `AM32 VOICE` Elizina úspěšná, ale stále osobitá odpověď.
- **Challenge:** `LC10` – integrovat phonetics, minimal pair, word stress a intonation v jedné dramatické objednávce.
- **Teacher Mode:** transfer from exercise to real interaction; self-correction.
- **Vizuální assety:** Eliza `In Training / encouraged`, květiny, zákazník, Higgins v pozadí.
- **Audio assety:** `customer_ch03_scene06_001.mp3`, `eliza_ch03_scene06_001.mp3`, `sfx_shop_morning_001.mp3` a přepisy.
- **Návaznost:** `ch04_s01`.

## Chapter IV – The First Test

**Dramatic arc:** Eliza poprvé použije nový způsob řeči v malé reálné společenské situaci. Zjistí, že perfektní výslovnost sama nestačí, když registr, obsah a společenská inference nejsou v souladu.

**Audio profile:** `VOICE` small talk, humor a recovery; `LISTENING` turn-taking a implied meaning; `PRONUNCIATION` stabilní artikulace pod tlakem; `SFX` šálky, místnost a kroky; `AMBIENCE` čajové setkání, chodba a noční cesta.

### ch04_s01 – The Invitation

- **Lokace:** přípravná místnost před malým sousedským čtením a čajem.
- **Čas / atmosféra:** podvečer; nervozita, šustění programu, hosté za dveřmi.
- **Postavy:** Eliza, Higgins, Pickering, Mrs Pearce, hostitelka.
- **Děj:** Eliza dostane první příležitost krátce pozdravit hosty. Higgins navrhuje naučený projev, Pickering upozorňuje na posluchače a Mrs Pearce na možnost zjednodušit situaci.
- **Hlavní účel:** připravit volbu mezi kontrolou a spontánností.
- **Rozhodnutí hráče:** `D08` – zvolit před testem strategii: držet se pečlivého registru, přepínat podle adresáta, nebo začít spontánně a upravovat se podle reakce.
- **Možné hodnotové změny:** `Pronunciation +1` při vědomé kontrole, `Confidence +1` při spontánním vstupu, `Independence +1` při vlastním plánu přepínání.
- **Uložení:** `long-term: ano`; uloží se `first_test_strategy`.
- **Audio momenty:** `AM33 VOICE` Higginsova rehearsal instrukce; `AM34 AMBIENCE` hosté a místnost za dveřmi.
- **Challenge:** žádná; volba je příprava herní strategie.
- **Teacher Mode:** greeting registers, audience awareness, code-switching as choice.
- **Vizuální assety:** Eliza `In Training / prepared`, malý program, dveře společenské místnosti.
- **Audio assety:** `higgins_ch04_scene01_001.mp3`, `ambience_first-test_room_001.mp3` a přepisy.
- **Návaznost:** `ch04_s02`.

### ch04_s02 – Names and Weather

- **Lokace:** společenská místnost s čajovým stolem.
- **Čas / atmosféra:** první část setkání; zdvořilý hluk, šálky, počasí jako small-talk téma.
- **Postavy:** Eliza, hostitelka, dva hosté, Pickering.
- **Děj:** Eliza vede small talk o jménech, počasí a cestě. Výslovnost drží, ale musí rozpoznat, kdy host chce pokračovat a kdy jen zdvořile ukončit výměnu.
- **Hlavní účel:** představit social conventions a listening under pressure v malé dávce.
- **Rozhodnutí hráče:** žádné hlavní; hráč volí pořadí odpovědí a možnost položit doplňující otázku.
- **Možné hodnotové změny:** `Confidence +1` za vhodné pokračování; `Pronunciation +1` za stabilní důraz.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM35 LISTENING` hosté používají zdvořilé ukončovací signály; `AM36 VOICE` Eliza ve třech malých talk turns.
- **Challenge:** `LC11` – určit, zda replika otevírá, drží, nebo ukončuje small talk.
- **Teacher Mode:** turn-taking, phatic language, weather talk.
- **Vizuální assety:** čajový stůl, jmenovky, Eliza `In Training / attentive`.
- **Audio assety:** `host_ch04_scene02_001.mp3`, `eliza_ch04_scene02_001.mp3`, `sfx_teacups_001.mp3` a přepisy.
- **Návaznost:** `ch04_s03`.

### ch04_s03 – The Wrong Answer

- **Lokace:** stejná místnost, u skupiny hostů.
- **Čas / atmosféra:** setkání se rozvíjí; jeden vtip a jedna doslovná odpověď vytvoří ticho.
- **Postavy:** Eliza, hosté, Higgins, Pickering.
- **Děj:** Eliza perfektně vysloví formálně naučenou větu, ale doslovně odpoví na implied joke. Humor vzniká z nesouladu formy a obsahu, ne z její hlouposti.
- **Hlavní účel:** dát hráči první kontrolu nad opravou společenského nesouladu.
- **Rozhodnutí hráče:** `D09` – zvolit recovery: pečlivě přeformulovat, přiznat doslovné pochopení s lehkostí, nebo chvíli mlčet a počkat na další signál.
- **Možné hodnotové změny:** `Confidence +1` při aktivní opravě, `Independence +1` při pojmenování vlastního významu, `Pronunciation +1` při kontrolované reformulaci.
- **Uložení:** `long-term: ano`; uloží se `recovery_style`.
- **Audio momenty:** `AM37 VOICE` vtip a Elizina doslovná odpověď; `AM38 LISTENING` ticho, smích a změna intonace skupiny.
- **Challenge:** `LC12` – literal meaning vs implied meaning; zvolit sociálně srozumitelnou opravu bez sebeznehodnocení.
- **Teacher Mode:** humor, implied meaning, repair strategies.
- **Vizuální assety:** hosté v malé skupině, Eliza `In Training / surprised`, Higgins sledující výsledek.
- **Audio assety:** `host_ch04_scene03_001.mp3`, `eliza_ch04_scene03_001.mp3`, `sfx_room_reaction_001.mp3` a přepisy.
- **Návaznost:** `ch04_s04`.

### ch04_s04 – After the Laughter

- **Lokace:** boční chodba společenské místnosti.
- **Čas / atmosféra:** několik minut po situaci; tlumenější zvuk, prostor pro nadechnutí.
- **Postavy:** Eliza, Pickering, Mrs Pearce, Higgins krátce.
- **Děj:** Eliza hodnotí, co se stalo. Pickering ji neposuzuje podle elegance; Mrs Pearce pomůže oddělit výslovnost od společenské inference. Higgins mluví o výsledku testu, což znovu otevře otázku vlastnictví úspěchu.
- **Hlavní účel:** převést chybu na reflexi a zachovat Elizinu agency.
- **Rozhodnutí hráče:** žádné hlavní; hráč vybere, zda si Eliza uloží poznámku o jazyce, publiku nebo vlastním pocitu.
- **Možné hodnotové změny:** lokální `reflection_focus`; při pojmenování vlastního pocitu `Confidence +1`.
- **Uložení:** `long-term: ne`.
- **Audio momenty:** `AM39 VOICE` Pickering a Mrs Pearce jako podpůrné hlasy; `AM40 SFX` tlumený chodník a vzdálený návrat hostů.
- **Challenge:** žádná nová; replay předchozí reakce je volitelná podpora.
- **Teacher Mode:** reflection language, separating feedback from identity.
- **Vizuální assety:** chodba, Eliza `In Training / reflective`, Higgins odděleně od skupiny.
- **Audio assety:** `pickering_ch04_scene04_001.mp3`, `mrs-pearce_ch04_scene04_001.mp3`, `sfx_hallway_001.mp3` a přepisy.
- **Návaznost:** `ch04_s05`.

### ch04_s05 – The Walk Home

- **Lokace:** večerní ulice mezi společenskou místností a domovem.
- **Čas / atmosféra:** noc po prvním testu; chlad, doznívající hlasy, prostor pro vlastní myšlenky.
- **Postavy:** Eliza, případně Pickering v krátkém rozloučení.
- **Děj:** Eliza si uvědomí, že může zvolit, kdy chce být pečlivá a kdy spontánní. Výsledek testu není „prošla/neprošla“, ale nový datový bod pro její vlastní strategii.
- **Hlavní účel:** uzavřít první test a připravit veřejnější Chapter V.
- **Rozhodnutí hráče:** žádné hlavní; volitelná replay reflexe.
- **Možné hodnotové změny:** podle `first_test_strategy` se uloží `register_flexibility`; hodnoty beze změny.
- **Uložení:** `long-term: ano` jako strategie, nikoli známka.
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
| `first_test_strategy` | Přidá variantu registru a přípravy v sociálním prostředí. | Nesmí odstranit spontánní možnost. |
| `recovery_style` | Změní reakci na dřívější nesoulad a podobu sebereflexe. | Chyba nesmí snížit lidskou hodnotu Elizy. |
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
