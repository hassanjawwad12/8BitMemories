import { type GameExhibit, validateExhibits } from "./schema";

/**
 * THE MANIFEST — the single source of truth for the whole museum. The UI is
 * entirely derived from this array: add a game = one entry here (+ pick a `micro`
 * that exists in the registry), no component changes. Footage of commercial games
 * is copyrighted; this is a personal, educational showcase — facts are editorial,
 * loops (when added) stay short, and credit is given where known.
 */

const RAW_EXHIBITS: readonly GameExhibit[] = [
  /* ===== WING 1 — THE COIN-OP FLOOR ('71–'84) ============================= */
  {
    slug: "pong",
    title: "Pong",
    year: 1972,
    developer: "Atari",
    platform: "Arcade",
    genre: "Sports / Paddle",
    wing: "coin-op",
    micro: "pong",
    rating: 5,
    blurb:
      "The one that started the coin drop. Two paddles, one square ball, and a nation suddenly very interested in table tennis.",
    facts: [
      "The first cabinet was tested in Andy Capp's Tavern — it broke down because the coin box overflowed with quarters.",
      "Allan Alcorn built it as a training exercise; Nolan Bushnell never expected to ship it.",
      "There is no '0' — the score starts at, and the ball serves toward, the loser.",
    ],
    specs: [
      { label: "CPU", value: "None — discrete TTL logic" },
      { label: "Display", value: "B/W CRT, ~15 kHz" },
      { label: "Players", value: "1–2" },
      { label: "Cabinet", value: "Upright, coin-op" },
    ],
  },
  {
    slug: "space-invaders",
    title: "Space Invaders",
    year: 1978,
    developer: "Taito",
    platform: "Arcade",
    genre: "Fixed shooter",
    wing: "coin-op",
    micro: "invaders",
    rating: 5,
    blurb:
      "A descending wall of aliens that speeds up as you thin it out — the original difficulty curve, born from a CPU that simply ran faster with fewer sprites.",
    facts: [
      "The 'tension' speed-up was a hardware accident: fewer invaders meant less to draw, so the game sped up. They kept it.",
      "It allegedly caused a 100-yen coin shortage in Japan.",
      "Tomohiro Nishikado built much of the custom hardware himself because off-the-shelf parts weren't fast enough.",
    ],
    specs: [
      { label: "CPU", value: "Intel 8080 @ 2 MHz" },
      { label: "Sound", value: "Analog + SN76477" },
      { label: "Aliens", value: "55 per wave" },
      { label: "Score cap", value: "9990 (rolls over)" },
    ],
  },
  {
    slug: "asteroids",
    title: "Asteroids",
    year: 1979,
    developer: "Atari",
    platform: "Arcade",
    genre: "Multidirectional shooter",
    wing: "coin-op",
    micro: "asteroids",
    rating: 5,
    blurb:
      "Crisp white vector lines, momentum you can never quite cancel, and the dread of that one rock drifting toward you in the dark.",
    facts: [
      "Rendered on a vector monitor — no pixels, just glowing lines drawn by a moving electron beam.",
      "A scoring exploit let players park and farm UFOs forever; Atari left it in.",
      "The hyperspace button could save you — or drop you straight onto a rock.",
    ],
    specs: [
      { label: "CPU", value: "MOS 6502 @ 1.5 MHz" },
      { label: "Display", value: "XY vector (Quadrascan)" },
      { label: "Lives", value: "3–5 (dip-switch)" },
      { label: "Thrust", value: "Newtonian, no brakes" },
    ],
  },
  {
    slug: "pac-man",
    title: "Pac-Man",
    year: 1980,
    developer: "Namco",
    platform: "Arcade",
    genre: "Maze",
    wing: "coin-op",
    micro: "pacman",
    rating: 5,
    blurb:
      "A pizza missing a slice, four ghosts with actual personalities, and the maze chase that put games on lunchboxes.",
    facts: [
      "Each ghost has distinct AI: Blinky chases, Pinky ambushes, Inky is erratic, Clyde wanders.",
      "Toru Iwatani says the design came from a pizza with a slice removed.",
      "Level 256 famously corrupts — an 8-bit counter overflow splits the screen into garbage.",
    ],
    specs: [
      { label: "CPU", value: "Zilog Z80 @ 3.07 MHz" },
      { label: "Dots", value: "240 + 4 power pellets" },
      { label: "Ghosts", value: "Blinky · Pinky · Inky · Clyde" },
      { label: "Kill screen", value: "Level 256" },
    ],
  },
  {
    slug: "donkey-kong",
    title: "Donkey Kong",
    year: 1981,
    developer: "Nintendo",
    platform: "Arcade",
    genre: "Platformer",
    wing: "coin-op",
    micro: "mario-coin",
    rating: 5,
    blurb:
      "Barrels, girders, and a carpenter named Jumpman climbing to rescue a lady from an ape. You may know the carpenter as Mario.",
    facts: [
      "Designed by a young Shigeru Miyamoto; 'Jumpman' was renamed Mario after a landlord, Mario Segale.",
      "It rescued Nintendo from a warehouse of unsold Radar Scope cabinets.",
      "The kill screen at level 22 ends Donkey Kong runs to this day.",
    ],
    specs: [
      { label: "CPU", value: "Zilog Z80 @ 3 MHz" },
      { label: "Stages", value: "4 (Ramps · Rivets · …)" },
      { label: "Hero", value: "Jumpman → Mario" },
      { label: "Kill screen", value: "Level 22" },
    ],
  },
  {
    slug: "galaga",
    title: "Galaga",
    year: 1981,
    developer: "Namco",
    platform: "Arcade",
    genre: "Fixed shooter",
    wing: "coin-op",
    micro: "invaders",
    rating: 4,
    blurb:
      "Invaders that dive-bomb in swooping arcs — and the high-risk gamble of letting one capture your ship to double your firepower.",
    facts: [
      "Let the boss Galaga tractor-beam your fighter, then rescue it for dual guns.",
      "A famous bug: shoot nothing for ~15 minutes on stage one and the enemies stop firing entirely.",
      "The dive patterns were a leap past Space Invaders' flat shuffle.",
    ],
    specs: [
      { label: "CPU", value: "3× Z80" },
      { label: "Trick", value: "Dual-fighter capture" },
      { label: "Bonus", value: "Challenging Stages" },
      { label: "Max ships", value: "2 (captured)" },
    ],
  },
  {
    slug: "frogger",
    title: "Frogger",
    year: 1981,
    developer: "Konami",
    platform: "Arcade",
    genre: "Action",
    wing: "coin-op",
    micro: "frogger",
    rating: 4,
    blurb:
      "Cross a lethal road, then a worse river, one hop at a time. The logs are safe; the water is not; the timer is merciless.",
    facts: [
      "The river is the twist: the water kills you, so you must ride the logs and turtles.",
      "Distributed in North America by Sega/Gremlin under license from Konami.",
      "Immortalized by a 1998 sitcom traffic-crossing gag decades later.",
    ],
    specs: [
      { label: "CPU", value: "Z80 + M6809" },
      { label: "Lanes", value: "5 road · 5 river" },
      { label: "Homes", value: "5 to fill" },
      { label: "Hazard", value: "Water = instant death" },
    ],
  },

  /* ===== WING 2 — THE LIVING ROOM ('83–'95) ============================== */
  {
    slug: "super-mario-bros",
    title: "Super Mario Bros.",
    year: 1985,
    developer: "Nintendo",
    platform: "NES",
    genre: "Platformer",
    wing: "living-room",
    micro: "mario-coin",
    rating: 5,
    blurb:
      "The cartridge that sold the console. Run right, jump good, grab the flag — the grammar of the entire platformer genre in one mushroom kingdom.",
    facts: [
      "The bushes and the clouds are the same sprite, just recolored.",
      "World 1-1 is a silent tutorial: the first Goomba teaches you to jump or die.",
      "A minus-world warp glitch (-1) became one of gaming's most famous bugs.",
    ],
    specs: [
      { label: "Platform", value: "Nintendo Entertainment System" },
      { label: "Worlds", value: "8 × 4 levels" },
      { label: "Size", value: "40 KB cartridge" },
      { label: "Warps", value: "Pipes + the minus world" },
    ],
  },
  {
    slug: "the-legend-of-zelda",
    title: "The Legend of Zelda",
    year: 1986,
    developer: "Nintendo",
    platform: "NES",
    genre: "Action-adventure",
    wing: "living-room",
    micro: "_attract",
    rating: 5,
    blurb:
      "A gold cartridge that let you wander. No level select, no hand-holding — just a sword in a cave and the words 'IT'S DANGEROUS TO GO ALONE.'",
    facts: [
      "The famous gold cartridge included a battery to save progress — a rarity in 1986.",
      "It shipped with the very first battery-backed save in a console game in the West.",
      "Second Quest remixes the entire overworld for players who beat it.",
    ],
    specs: [
      { label: "Platform", value: "NES (gold cart)" },
      { label: "Save", value: "Battery-backed RAM" },
      { label: "Dungeons", value: "9 (+ Second Quest)" },
      { label: "Opening line", value: "Take this." },
    ],
  },
  {
    slug: "mega-man-2",
    title: "Mega Man 2",
    year: 1988,
    developer: "Capcom",
    platform: "NES",
    genre: "Platformer",
    wing: "living-room",
    micro: "_attract",
    rating: 5,
    blurb:
      "Pick a robot master, beat it, steal its weapon, repeat — a non-linear difficulty puzzle wrapped in some of the best chiptune ever pressed to a cart.",
    facts: [
      "Made largely by a passionate team on overtime after the first game underperformed.",
      "Dr. Wily Stage 1's theme is one of the most covered video-game tracks in history.",
      "Added an 'E-Tank' energy reserve — a small mercy in a brutal game.",
    ],
    specs: [
      { label: "Platform", value: "NES" },
      { label: "Robot Masters", value: "8" },
      { label: "Difficulty", value: "Normal / Difficult (JP)" },
      { label: "Item", value: "E-Tank introduced" },
    ],
  },
  {
    slug: "tetris-game-boy",
    title: "Tetris",
    year: 1989,
    developer: "Nintendo / Bullet-Proof Software",
    platform: "Game Boy",
    genre: "Puzzle",
    wing: "living-room",
    micro: "tetris",
    rating: 5,
    blurb:
      "Alexey Pajitnov's falling blocks, bundled with the Game Boy and beamed into every commute, classroom, and waiting room on Earth.",
    facts: [
      "Bundling it with the Game Boy is widely credited with selling the handheld to adults.",
      "Originally written by Alexey Pajitnov at the Soviet Academy of Sciences in 1984.",
      "Type-A music is a rendition of the Russian folk tune 'Korobeiniki.'",
    ],
    specs: [
      { label: "Platform", value: "Nintendo Game Boy" },
      { label: "Pieces", value: "7 tetrominoes" },
      { label: "Music", value: "Korobeiniki (Type-A)" },
      { label: "Goal", value: "Clear lines, forever" },
    ],
  },
  {
    slug: "sonic-the-hedgehog",
    title: "Sonic the Hedgehog",
    year: 1991,
    developer: "Sega",
    platform: "Genesis / Mega Drive",
    genre: "Platformer",
    wing: "living-room",
    micro: "sonic-ring",
    rating: 5,
    blurb:
      "Sega's blast-processing answer to Mario: loop-de-loops, spring-loaded momentum, and a blue hedgehog who taps his foot if you idle too long.",
    facts: [
      "Rings are your health bar — get hit and they scatter everywhere for a panicked grab.",
      "Leave Sonic standing and he taps his foot, then folds his arms impatiently.",
      "The mascot replaced an earlier design: a rabbit, and even an Eggman in pajamas.",
    ],
    specs: [
      { label: "Platform", value: "Sega Genesis / Mega Drive" },
      { label: "Health", value: "Rings (≥1 = survive)" },
      { label: "Zones", value: "6 (× 3 acts)" },
      { label: "Idle", value: "Foot-tap @ ~3s" },
    ],
  },
  {
    slug: "street-fighter-ii",
    title: "Street Fighter II",
    year: 1991,
    developer: "Capcom",
    platform: "Arcade / SNES",
    genre: "Fighting",
    wing: "living-room",
    micro: "_attract",
    rating: 5,
    blurb:
      "Eight world warriors, six buttons, and the special-move motions ↓↘→ that a generation memorized with their thumbs.",
    facts: [
      "It effectively created the modern competitive fighting-game scene.",
      "Combos were discovered by players before designers fully intended them.",
      "Endless 'Champion / Turbo / Hyper' revisions kept it in arcades for years.",
    ],
    specs: [
      { label: "Hardware", value: "Capcom CPS-1" },
      { label: "Roster", value: "8 (+4 bosses)" },
      { label: "Inputs", value: "6 buttons" },
      { label: "Hadouken", value: "↓ ↘ → + punch" },
    ],
  },
  {
    slug: "snake-nokia",
    title: "Snake",
    year: 1997,
    developer: "Nokia",
    platform: "Nokia (mobile)",
    genre: "Arcade",
    wing: "living-room",
    micro: "snake",
    rating: 4,
    blurb:
      "Preloaded onto the indestructible Nokia 6110 and a billion phones after — the first game most people ever carried in a pocket.",
    facts: [
      "Based on a concept dating to the 1976 arcade game Blockade.",
      "Taneli Armanto adapted it for Nokia, making it the world's most-played game by sheer install base.",
      "The whole challenge: your own growing tail is the only thing that can kill you.",
    ],
    specs: [
      { label: "Platform", value: "Nokia 6110 et al." },
      { label: "Display", value: "Monochrome LCD" },
      { label: "Enemy", value: "Yourself" },
      { label: "Install base", value: "~1 billion phones" },
    ],
  },

  /* ===== WING 3 — THE TERMINAL ('85–'01) ================================= */
  {
    slug: "the-oregon-trail",
    title: "The Oregon Trail",
    year: 1985,
    developer: "MECC",
    platform: "DOS / Apple II",
    genre: "Educational / Sim",
    wing: "terminal",
    micro: "_attract",
    rating: 4,
    blurb:
      "Ford the river, ration the food, and watch your wagon party perish of dysentery — the school-computer classic that taught a generation about death.",
    facts: [
      "'You have died of dysentery' is one of the most quoted lines in gaming.",
      "First written in 1971 by three student teachers; MECC's 1985 release made it iconic.",
      "Hunting often netted 2,000 lbs of meat you could carry almost none of.",
    ],
    specs: [
      { label: "Platform", value: "Apple II / MS-DOS" },
      { label: "Origin", value: "Classroom, 1971" },
      { label: "Cause of death", value: "Dysentery (usually)" },
      { label: "Trail", value: "Independence → Oregon" },
    ],
  },
  {
    slug: "minesweeper",
    title: "Minesweeper",
    year: 1990,
    developer: "Microsoft",
    platform: "Windows",
    genre: "Puzzle",
    wing: "terminal",
    micro: "minesweeper",
    rating: 4,
    blurb:
      "Bundled with Windows, played on every office PC, and secretly a lesson in probability disguised as a grid of tiny grey tiles.",
    facts: [
      "Shipped in the Microsoft Entertainment Pack, then with Windows 3.1 itself.",
      "The smiley resets the board — and dons sunglasses when you win.",
      "Right-click to flag; first click is always safe in most versions.",
    ],
    specs: [
      { label: "Platform", value: "Microsoft Windows" },
      { label: "Grids", value: "Beginner / Inter. / Expert" },
      { label: "Reset", value: "Click the smiley" },
      { label: "Win face", value: "😎" },
    ],
  },
  {
    slug: "skifree",
    title: "SkiFree",
    year: 1991,
    developer: "Chris Pirih",
    platform: "Windows",
    genre: "Action",
    wing: "terminal",
    micro: "_attract",
    rating: 4,
    blurb:
      "Ski down an endless slope — until the moment everyone remembers: the Abominable Snow Monster appears and eats you, and you cannot outrun it.",
    facts: [
      "The yeti was added partly to give the endless slope a definite, terrifying end.",
      "Pressing 'F' speeds you up — which only delays the inevitable munching.",
      "Distributed in the Microsoft Entertainment Pack alongside other classics.",
    ],
    specs: [
      { label: "Platform", value: "Windows (16-bit)" },
      { label: "Modes", value: "Slalom · Tree · Freestyle" },
      { label: "Boss", value: "The Abominable Snow Monster" },
      { label: "Escape", value: "There is none" },
    ],
  },
  {
    slug: "wolfenstein-3d",
    title: "Wolfenstein 3D",
    year: 1992,
    developer: "id Software",
    platform: "DOS",
    genre: "First-person shooter",
    wing: "terminal",
    micro: "_attract",
    rating: 5,
    blurb:
      "id's raycasting breakthrough that put you behind the gun in a 3D corridor — the grandfather of the entire FPS genre, shareware and all.",
    facts: [
      "John Carmack's raycasting engine faked 3D fast enough to run on a 286.",
      "The shareware model — give away episode one — became id's signature.",
      "Push on every wall: secret rooms full of treasure are everywhere.",
    ],
    specs: [
      { label: "Engine", value: "id raycaster" },
      { label: "Platform", value: "MS-DOS" },
      { label: "Distribution", value: "Shareware (Ep. 1 free)" },
      { label: "Secrets", value: "Push the walls" },
    ],
  },
  {
    slug: "doom",
    title: "DOOM",
    year: 1993,
    developer: "id Software",
    platform: "DOS",
    genre: "First-person shooter",
    wing: "terminal",
    micro: "doom-face",
    rating: 5,
    blurb:
      "Demons, a shotgun, and a HUD face that grimaces as your health drops. It defined deathmatch, modding, and the rule that everything must eventually run DOOM.",
    facts: [
      "Doomguy's HUD face turns to look toward incoming damage and grins when you grab a weapon.",
      "WAD files made user modding mainstream and seeded a modding culture that never stopped.",
      "It has since been ported to printers, calculators, pregnancy tests, and more.",
    ],
    specs: [
      { label: "Engine", value: "id Tech 1" },
      { label: "Platform", value: "MS-DOS" },
      { label: "Mods", value: "WAD files" },
      { label: "HUD", value: "Reactive Doomguy face" },
    ],
  },
  {
    slug: "flying-toasters",
    title: "After Dark: Flying Toasters",
    year: 1989,
    developer: "Berkeley Systems",
    platform: "Mac / PC",
    genre: "Screensaver",
    wing: "terminal",
    micro: "_attract",
    rating: 3,
    blurb:
      "Not a game — a screensaver so iconic it earns a placard anyway. Winged toasters and toast flapping endlessly across a black void of CRT phosphor.",
    facts: [
      "The flapping toasters became the unofficial mascot of early-'90s desktop culture.",
      "A lawsuit over the winged-toaster imagery referenced a Jefferson Airplane album cover.",
      "Its job was literally to prevent screen burn-in on always-on CRTs.",
    ],
    specs: [
      { label: "Software", value: "After Dark" },
      { label: "Platform", value: "Mac OS / Windows" },
      { label: "Purpose", value: "Prevent CRT burn-in" },
      { label: "Cast", value: "Toasters + toast" },
    ],
  },
];

/**
 * Dev-only integrity gate: parse the manifest through zod and assert slug
 * uniqueness at module load. In production this is skipped (the data is static
 * and already validated in CI / dev), so it costs nothing at runtime.
 */
export const EXHIBITS: readonly GameExhibit[] =
  process.env.NODE_ENV === "production"
    ? RAW_EXHIBITS
    : validateExhibits(RAW_EXHIBITS);

/** O(1) lookup by slug — used by routes, deep links, and the attract cycler. */
export const EXHIBIT_BY_SLUG: ReadonlyMap<string, GameExhibit> = new Map(
  EXHIBITS.map((exhibit) => [exhibit.slug, exhibit]),
);

/** Exhibits grouped by wing, preserving manifest order within each wing. */
export function exhibitsByWing(wing: GameExhibit["wing"]): readonly GameExhibit[] {
  return EXHIBITS.filter((exhibit) => exhibit.wing === wing);
}
