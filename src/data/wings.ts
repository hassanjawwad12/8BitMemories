import type { WingId } from "./schema";

/**
 * Wing metadata — the three "rooms" of the museum. The OS chrome never changes;
 * each wing only retints the loud layer via its `[data-wing]` theme (see
 * src/theme/*.css). Order here is the order they appear in the WingsRail.
 */
export interface Wing {
  readonly id: WingId;
  readonly label: string;
  readonly era: string;
  readonly tagline: string;
  /** A one-line description shown in the rail / status bar. */
  readonly blurb: string;
}

export const WINGS: readonly Wing[] = [
  {
    id: "coin-op",
    label: "The Coin-Op Floor",
    era: "1971–1984",
    tagline: "INSERT COIN",
    blurb: "The arcade golden age — quarters, marquees, and attract-mode glow.",
  },
  {
    id: "living-room",
    label: "The Living Room",
    era: "1983–1995",
    tagline: "NOW YOU'RE PLAYING WITH POWER",
    blurb: "8- and 16-bit consoles on the CRT, controllers tangled in the carpet.",
  },
  {
    id: "terminal",
    label: "The Terminal",
    era: "1985–2001",
    tagline: "EST. 1999",
    blurb: "DOS, the PC, screensavers, and the first hum of the early net.",
  },
] as const;

export const DEFAULT_WING: WingId = "coin-op";

/** Map of id → wing, for O(1) lookup from a slug's `wing` field. */
export const WING_BY_ID: Readonly<Record<WingId, Wing>> = Object.freeze(
  Object.fromEntries(WINGS.map((wing) => [wing.id, wing])) as Record<
    WingId,
    Wing
  >,
);
