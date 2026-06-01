# 8BitMemories

> **The games we grew up on** — a view-only, haunted-OS museum of the retro-gaming world.

8BitMemories boots like an old operating system and lets you wander three themed
wings of classic games. Every exhibit has a placard (year, developer, platform,
fun facts, a fake spec-sheet, a star rating) and its signature detail: a **live,
hand-built micro-animation unique to that game** — Pac-Man chomps, a Hadouken
flies, the Triforce assembles — rendered in pure CSS, not a GIF.

It's a **museum, not a game**: you boot, browse, open and drag windows around the
desktop, switch wings, and toggle sound. You never edit anything.

---

## Highlights

- **A per-game micro-animation engine** — every animation is bespoke, hand-written
  CSS (`transform` / `opacity` / `clip-path` only). No GIFs, no GSAP, no Framer
  Motion — and it doubles as the exhibit's live CRT "screen."
- **Manifest-driven** — one typed, zod-validated data file (`src/data/exhibits.ts`)
  describes every exhibit; the entire UI is derived from it. Adding a game is one
  entry plus a micro-animation id.
- **A real OS desktop** — boot splash, CRT scanline/grain atmosphere, draggable
  Win98-style windows, a menu bar, a left wings rail, and a taskbar.
- **Native View Transitions** — switching wings plays a channel-change "static +
  vertical-roll" wipe; opening an exhibit flashes a CRT power-on. Zero bundle cost.
- **Attract mode** — optional arcade-style idle demo that auto-cycles exhibits.
- **Accessible + reduced-motion aware** — keyboard-navigable, focus-trapped
  dialogs, a screen-reader live region, and every animation freezes to a static
  "hero pose" under `prefers-reduced-motion`.
- **Self-contained & private** — all content is local, no fetch, no API keys, no
  tracking; a tight `img/media/connect 'self'` CSP holds trivially.

---

## The collection

Three wings, ~20 exhibits.

### 🕹️ The Coin-Op Floor — _arcade, 1971–1984_

| Game | Year | Developer | Platform |
|------|------|-----------|----------|
| Pong | 1972 | Atari | Arcade |
| Space Invaders | 1978 | Taito | Arcade |
| Asteroids | 1979 | Atari | Arcade |
| Pac-Man | 1980 | Namco | Arcade |
| Donkey Kong | 1981 | Nintendo | Arcade |
| Galaga | 1981 | Namco | Arcade |
| Frogger | 1981 | Konami | Arcade |

### 📺 The Living Room — _8/16-bit consoles, 1983–1995_

| Game | Year | Developer | Platform |
|------|------|-----------|----------|
| Super Mario Bros. | 1985 | Nintendo | NES |
| The Legend of Zelda | 1986 | Nintendo | NES |
| Mega Man 2 | 1988 | Capcom | NES |
| Tetris | 1989 | Nintendo / Bullet-Proof Software | Game Boy |
| Sonic the Hedgehog | 1991 | Sega | Genesis / Mega Drive |
| Street Fighter II | 1991 | Capcom | Arcade / SNES |
| Snake | 1997 | Nokia | Nokia (mobile) |

### 💾 The Terminal — _DOS / PC / Y2K, 1985–2001_

| Game | Year | Developer | Platform |
|------|------|-----------|----------|
| The Oregon Trail | 1985 | MECC | DOS / Apple II |
| Flying Toasters (After Dark) | 1989 | Berkeley Systems | Mac / PC |
| Minesweeper | 1990 | Microsoft | Windows |
| SkiFree | 1991 | Chris Pirih | Windows |
| Wolfenstein 3D | 1992 | id Software | DOS |
| DOOM | 1993 | id Software | DOS |

---

## Tech stack

| Concern | Choice |
|---------|--------|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript (strict) |
| State | Zustand |
| Validation | zod (manifest integrity, dev-time) |
| Styling | Plain CSS + design tokens (no Tailwind, no UI kit) |
| Animation | Hand-written CSS — no animation library |
| Transitions | Native View Transitions API + CSS keyframes |
| Audio | A tiny Web Audio engine (synthesized blips, no files) |
| Tests | Vitest + React Testing Library |

No animation, UI, or drag libraries. Dependencies: `next`, `react`, `react-dom`,
`zustand`, `zod`.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm test           # run the Vitest suite
npm run coverage   # tests + coverage report (logic layer gated at 80%)
```

---

## How to use it

- **Browse** — cabinet tiles on the floor show each game's live micro-animation.
- **Open an exhibit** — click a tile (or focus it and press Enter) to open a
  draggable window with the CRT screen + placard.
- **Drag / stack / close** — drag a window by its title bar; click to bring it to
  front; close with the × button or **Esc**.
- **Switch wings** — use the left rail; the floor retints and a channel-wipe plays.
- **Menu bar** — visit counter, About, an **Attract** toggle (off by default; when
  on, the museum auto-cycles exhibits after ~30s idle, like an arcade demo — any
  input stops it), and a sound toggle.

---

## Project structure

```
src/
  app/            layout, page (the lobby IS /), globals.css
  data/           exhibits.ts (the manifest), wings.ts, schema.ts (zod)
  components/
    Museum.tsx        the shell
    Lobby.tsx         the active wing's cabinet grid
    CabinetTile.tsx   a game tile (live preview + label)
    ExhibitWindow.tsx draggable Win98 window
    GifScreen.tsx     the CRT screen (renders the live micro-anim)
    Placard.tsx       title / facts / specs / rating
    AttractMode.tsx   idle auto-cycler
    chrome/           MenuBar, WingsRail, Taskbar, VisitCounter, About, ModalWindow
    micro/            registry.ts + one component per game animation + micro.css
    boot/  a11y/  ui/ boot splash, CRT overlay, live region, button
  hooks/          useWindowDrag, useFocusTrap, useReducedMotion, useIdle
  lib/            audio engine, prefs (localStorage), viewTransition helper
  store/          useMuseumStore (windows, wing, prefs), useAnnouncer
  styles/         tokens.css, atmosphere.css, sr-only.css
  theme/          coin-op.css, living-room.css, terminal.css (per-wing palettes)
```

---

## Accessibility & performance

- Keyboard-navigable tiles and rail; focus-trapped `role="dialog"` windows that
  return focus on close; an `aria-live` region narrates actions.
- Full `prefers-reduced-motion` support — micro-animations freeze to a static
  pose, attract mode + CRT flicker stop, and wing/exhibit swaps become instant.
- Only the focused window's screen animates; background windows freeze. Media is
  local and budgeted; explicit dimensions avoid layout shift.

---

## Credits & license

Game titles, footage references, and facts are the property of their respective
owners. This is a **non-commercial, educational fan showcase** — facts are
editorial and credit is given where known. Built as a love letter to the games we
grew up on.
