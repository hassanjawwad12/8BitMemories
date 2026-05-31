import { create } from "zustand";

/**
 * The museum's client state (Zustand). View-only: we track which exhibit windows
 * are open, where they sit, their stacking order, and the sound preference — but
 * never any user-authored content. Window positions are intentionally NOT
 * persisted (the desktop is fresh each visit); only `soundOn` is durable.
 *
 * Updates are immutable — every action returns new objects, never mutating the
 * existing window map (see the coding-style rules).
 */

export interface WinPos {
  readonly x: number;
  readonly y: number;
}

export interface OpenWindow extends WinPos {
  readonly slug: string;
  readonly z: number;
}

interface MuseumState {
  readonly windows: Readonly<Record<string, OpenWindow>>;
  readonly focused: string | null;
  readonly topZ: number;
  readonly soundOn: boolean;

  readonly openExhibit: (slug: string) => void;
  readonly closeExhibit: (slug: string) => void;
  readonly focusExhibit: (slug: string) => void;
  readonly moveExhibit: (slug: string, pos: WinPos) => void;
  readonly positionOf: (slug: string) => WinPos;
  readonly toggleSound: () => void;
}

/** New windows cascade down-right so they don't stack exactly on top. */
const CASCADE_STEP = 30;
const CASCADE_WRAP = 6;
const CASCADE_ORIGIN: WinPos = { x: 132, y: 96 };

export const useMuseumStore = create<MuseumState>((set, get) => ({
  windows: {},
  focused: null,
  topZ: 0,
  soundOn: true,

  openExhibit: (slug) =>
    set((state) => {
      const z = state.topZ + 1;
      const existing = state.windows[slug];

      // Already open → just raise + focus it (don't reset its position).
      if (existing) {
        return {
          focused: slug,
          topZ: z,
          windows: { ...state.windows, [slug]: { ...existing, z } },
        };
      }

      const step = Object.keys(state.windows).length % CASCADE_WRAP;
      const opened: OpenWindow = {
        slug,
        x: CASCADE_ORIGIN.x + step * CASCADE_STEP,
        y: CASCADE_ORIGIN.y + step * CASCADE_STEP,
        z,
      };
      return {
        focused: slug,
        topZ: z,
        windows: { ...state.windows, [slug]: opened },
      };
    }),

  closeExhibit: (slug) =>
    set((state) => {
      if (!state.windows[slug]) return state;
      const next = { ...state.windows };
      delete next[slug];
      // Focus the remaining top-most window, if any.
      const remaining = Object.values(next);
      const topmost = remaining.reduce<OpenWindow | null>(
        (top, w) => (top === null || w.z > top.z ? w : top),
        null,
      );
      return {
        windows: next,
        focused: state.focused === slug ? (topmost?.slug ?? null) : state.focused,
      };
    }),

  focusExhibit: (slug) =>
    set((state) => {
      const existing = state.windows[slug];
      if (!existing) return state;
      if (state.focused === slug && existing.z === state.topZ) return state;
      const z = state.topZ + 1;
      return {
        focused: slug,
        topZ: z,
        windows: { ...state.windows, [slug]: { ...existing, z } },
      };
    }),

  moveExhibit: (slug, pos) =>
    set((state) => {
      const existing = state.windows[slug];
      if (!existing) return state;
      return {
        windows: {
          ...state.windows,
          [slug]: { ...existing, x: pos.x, y: pos.y },
        },
      };
    }),

  positionOf: (slug) => {
    const w = get().windows[slug];
    return w ? { x: w.x, y: w.y } : CASCADE_ORIGIN;
  },

  toggleSound: () => set((state) => ({ soundOn: !state.soundOn })),
}));

/** Stable selector for the list of open slugs (order is irrelevant — z drives stacking). */
export const selectOpenSlugs = (state: MuseumState): readonly string[] =>
  Object.keys(state.windows);
