# Audio & Voice Bible

## Canonical Eliza voice

V ElevenLabs je schválený hlas:

- jméno: `Eliza - young_cockney`
- Voice ID: `124kaYCknTDsnwUFdWl9`
- testovaný model: `eleven_v3`
- schválený počáteční charakter: `young, lively, defensive, quick, strong Cockney delivery`

Voice ID je canonical Eliza voice. Neměň jej bez explicitního pokynu.

## Canonical main-character voice cast

Všechny čtyři hlavní hlasy byly v ElevenLabs úspěšně otestovány přes model
`eleven_v3` a uživatelsky schváleny jako `APPROVED / CANONICAL`.

### Eliza Doolittle

- voice name: `Eliza - young_cockney`
- Voice ID: `124kaYCknTDsnwUFdWl9`
- model: `eleven_v3`
- Chapter I delivery: `young, lively, defensive, quick, strong Cockney delivery`
- status: `APPROVED / CANONICAL`

### Henry Higgins

- voice name: `Severin - Powerful & Commanding`
- Voice ID: `ib8aaABAPZQpTo6hx8Jr`
- model: `eleven_v3`
- character delivery: refined British; intelligent; self-assured; precise; authoritative; occasionally insensitive; never cartoonishly villainous
- status: `APPROVED / CANONICAL`

### Colonel Pickering

- voice name: `George - Warm, Captivating Storyteller`
- Voice ID: `JBFqnCBsd6RMkjVDRZzb`
- model: `eleven_v3`
- character delivery: warm; calm; observant; respectful; mature British gentleman; contrasts with Higgins through warmth rather than weakness
- status: `APPROVED / CANONICAL`

### Freddy

- voice name: `Ned - Casual, Young British Male, General Southern Accent`
- Voice ID: `fNYuJl2dBlX9V7NxmjnV`
- model: `eleven_v3`
- character delivery: young British male; friendly; sincere; natural; slightly embarrassed when appropriate; conversational rather than narrator-like
- status: `APPROVED / CANONICAL`

## Voice locking rules

- Canonical voice IDs hlavních postav se nesmí měnit bez explicitního pokynu uživatelky.
- Budoucí generace stejné postavy musí používat stejný voice ID.
- Změny emocí, tempa nebo registru se řeší přes delivery direction, nikoli výměnou hlasu.
- U Elizy musí BEFORE, DURING a AFTER zachovat stejnou hlasovou identitu.

## Casting evidence

- Higgins / Severin: ElevenLabs test úspěšně proveden přes `eleven_v3`; uživatelsky schváleno.
- Pickering / George: ElevenLabs test úspěšně proveden přes `eleven_v3`; uživatelsky schváleno.
- Freddy / Ned: ElevenLabs test úspěšně proveden přes `eleven_v3`; uživatelsky schváleno.

## Hlasová kontinuita

### BEFORE

- výraznější Cockney;
- rychlejší tempo;
- živost a emotivnost;
- obranná energie.

### DURING

- stále rozpoznatelný Cockney základ;
- kontrolovanější tempo;
- vědomější artikulace;
- občasná nejistota.

### AFTER

- stejná hlasová identita;
- pečlivější artikulace;
- klidnější tempo;
- kultivovanější společenský registr;
- nesmí působit jako jiná herečka.

První test Eliza BEFORE byl uživatelsky schválen jako finální základ pro Eliza BEFORE. Nové nahrávky musí zachovat identitu hlasu a měnit pouze způsob projevu podle vývojové fáze.

## Produkční pravidla

- audio je předgenerované a lokální;
- každé pedagogicky důležité audio má přepis;
- audio musí mít možnost replay;
- soubory používají convention z `docs/ASSET_PLAN.md`;
- před schválením se kontroluje srozumitelnost, délka, návaznost na scénu a bezpečné licenční vlastnictví;
- zvuk nesmí být jediným nosičem kritické informace.
