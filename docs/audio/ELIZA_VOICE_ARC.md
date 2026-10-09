# Eliza Voice Arc

Status: APPROVED / CANONICAL

Schválený šestikapitolový hlasový vývoj Elizy pro celý projekt Pygmalion. Tento dokument je konkrétní kanonickou autoritou pro voice-stage Chapters I–VI a zpřesňuje obecné BEFORE / DURING / AFTER v Audio & Voice Bible; ostatní pravidla castingu zůstávají platná.

Accent ≠ intelligence. Síla akcentu ani společenský registr neurčují inteligenci nebo lidskou hodnotu Elizy. Označení Hysterical popisuje rozrušený herecký projev referenční generace, nikoli Cockney nebo Elizinu hodnotu.

## Základní pravidlo

Po celou dobu se používá pouze jeden jediný hlas:

- Voice: `Eliza - young_cockney`
- Voice ID: `124kaYCknTDsnwUFdWl9`
- model: `eleven_v3`

Hlasová identita Elizy se nikdy nemění.

Vývoj vzniká pouze změnou:
- síly Cockney akcentu,
- artikulace,
- tempa,
- rytmu,
- emocionální kontroly,
- míry vědomého hlídání výslovnosti.

Nepoužívat jiné source voices ani Voice Changer jako součást kanonického produkčního workflow.

## Schválený voice arc

### Chapter I – Raw / Hysterical Cockney

Nejsilnější a nejvýraznější Cockney fáze.

Charakter:
- velmi silný Cockney,
- prudká emocionalita,
- impulzivnost,
- rychlejší a nepravidelnější rytmus,
- výrazné dropped sounds,
- Eliza může při rozrušení téměř „vybuchovat“,
- má působit jako syrová pouliční řeč, nikoli jako karikatura.

Schválená referenční generace:

- Generation ID: `2hB9GgCNor2KNbSMC5FG`
- ElevenLabs node: `DAwP9Qf1B7jroH6No3S0`
- Reference prompt:
  `OI! I WAN' people t' 'EAR wot I MEAN! Not wot THEY expect!`

Toto je finální Stage 0d – Hysterical Cockney.

Starší Stage 0 / 0b / 0c nejsou kanonické reference.

### Chapter II – Controlled Cockney

Cockney zůstává jasně slyšitelný, ale Eliza už dokáže zpomalit a vědomě formulovat myšlenku.

Charakter:
- stále výrazný Cockney,
- menší hysteričnost,
- větší kontrola tempa,
- silná osobnost zůstává,
- první známky vědomé práce s řečí.

Reference:

- Generation ID: `1r537Q9CHjrRyXk353DY`
- Reference prompt:
  `I wan' people to 'ear what I mean, not what they expect.`

### Chapter III – Conscious Training

Výslovnost se stává vědomě kontrolovanou.

Charakter:
- Eliza začíná hlídat výslovnost,
- artikulace je přesnější,
- tempo může být místy lehce nepřirozeně opatrné,
- má být slyšet, že se učí,
- Cockney není pryč, ale začíná ustupovat.

Reference:

- Generation ID: `HO08Dcr5Fe43jEbtr7W9`
- Reference prompt:
  `I want people to HEAR what I mean... not what they expect.`

### Chapter IV – Emerging New Speech

Nový způsob řeči začíná být přirozenější.

Charakter:
- výrazně čistší výslovnost,
- lepší rytmus a kontrola,
- již nepůsobí jako pouhé cvičení,
- v emocích nebo stresu se mohou některé původní Cockney rysy vracet,
- stále musí být jednoznačně slyšet stejná Eliza.

Reference:

- Generation ID: `gh9c3XbM2tj6JRGWnqQa`
- Reference prompt:
  `I want people to hear what I MEAN — not what they expect.`

### Chapter V – Polished Performance

Eliza dokáže podat velmi kultivovaný společenský výkon.

Charakter:
- nejvíce uhlídaná výslovnost,
- vysoká přesnost,
- společensky kultivovaný projev,
- může být cítit, že část projevu stále vědomě kontroluje,
- nesmí znít jako jiná herečka ani jako kopie Higginsovy řeči.

Reference:

- Generation ID: `Hzz93cKqXZxuJQiseL9f`
- Reference prompt:
  `I want people to hear what I mean. Not what they expect.`

### Chapter VI – Natural Own Voice

Finální Eliza nemá být „nejdokonalejší“, ale nejpřirozenější.

Charakter:
- čistá a jistá výslovnost,
- přirozený rytmus,
- uvolněnost,
- sebejistota,
- žádné přehnané vědomé hlídání řeči,
- její původní hlasová barva a osobnost zůstávají,
- výsledkem není Higginsův výrobek, ale Eliza, která má větší jazykový repertoár a sama si volí způsob řeči.

Reference:

- Generation ID: `xMa7ZTV9fhp1Q6Bv5E5E`
- Reference prompt:
  `I want people to hear what I mean, not what they expect.`

## Dramaturgický princip

Voice arc nesmí být interpretován jako:

`wrong speech → correct speech`

ale jako:

`raw Cockney → controlled Cockney → conscious learning → transitional speech → polished performance → natural own voice`

Eliza získává nový jazykový repertoár, ale neztrácí identitu.

Chapter VI proto nemá znít ještě formálněji než Chapter V.

Chapter V může být nejvíce „performance controlled“.

Chapter VI má být nejpřirozenější.

## Produkční pravidla

1. Při generování nové Eliziny repliky vždy nejprve určit kapitolu a použít odpovídající voice-stage jako referenci.

2. Vždy používat:
   `Eliza - young_cockney`
   Voice ID `124kaYCknTDsnwUFdWl9`.

3. Nepoužívat jiný hlas pro „lepší RP“ nebo jinou fázi vývoje.

4. Nepoužívat Voice Changer jako produkční metodu voice arcu.

5. TTS prompt má standardně obsahovat pouze text, který má být skutečně vysloven.

6. Výraznější Cockney lze podle potřeby řídit player-facing / spoken orthography, interpunkcí a rytmem, ale nesmí se změnit význam dialogu.

7. Hlasový vývoj musí být slyšitelný mezi kapitolami, nikoli nutně mezi každou jednotlivou scénou.

8. Emoce mají stále přednost před mechanickým dodržováním voice-stage. Pod silným stresem může i pozdější Eliza krátce sklouznout k některým starším řečovým rysům.

9. Již lidsky schválené audio se nesmí automaticky regenerovat pouze proto, že byl Voice Arc formalizován.

10. Existující audio měnit pouze tehdy, pokud při lidském poslechu vznikne jasný nesoulad s voice-stage dané kapitoly.

## Human QA

Lidský poslech je konečná autorita.

Před přijetím nové Eliziny repliky kontrolovat:

- Je to stále jednoznačně stejná Eliza?
- Odpovídá míra Cockney / kontroly aktuální kapitole?
- Zní emoce přirozeně?
- Nezní pozdější Eliza příliš RP, aristokraticky nebo jako jiná osoba?
- Neztrácí se její původní hlasová barva?
- Je Chapter VI přirozenější než Chapter V?

## ElevenLabs reference flows

Experimentální flow se Stage 0 variantami:
`https://elevenlabs.io/app/flows/5hs3zn1y751bILZUMVLp`

Čistý Chapter II–VI canonical reference flow:
`https://elevenlabs.io/app/flows/rHz8KNV1WP5HISiJuMlV`

Starší experimenty s jinými source voices / Voice Changer nejsou součástí kanonického voice arcu.
