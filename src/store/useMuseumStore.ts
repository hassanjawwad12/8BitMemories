import { create } from "zustand";

import type { WingId } from "@/data/schema";
import { DEFAULT_WING } from "@/data/wings";
import { prefs } from "@/lib/prefs";

/**
 * The museum's client state (Zustand). View-only: we track open exhibit windows,
 * the active wing, and the sound/attract preferences — never any user-authored
 * content. Window positions are intentionally NOT persisted (the desktop is fresh
 * each visit); only `soundOn` and `attractOn` are durable (localStorage, via
 * lib/prefs).
 *
 * Updates are immutable — every action returns new objects, never mutating the
 * existing maps (see the coding-style rules).
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

  readonly activeWing: WingId;
  readonly soundOn: boolean;
  readonly attractOn: boolean;

  readonly openExhibit: (slug: string) => void;
  readonly closeExhibit: (slug: string) => void;
  readonly focusExhibit: (slug: string) => void;
  readonly moveExhibit: (slug: string, pos: WinPos) => void;
  readonly positionOf: (slug: string) => WinPos;

  readonly setWing: (wing: WingId) => void;
  readonly toggleSound: () => void;
  readonly toggleAttract: () => void;
  /** Hydrate durable prefs from localStorage after mount (avoids SSR mismatch). */
  readonly hydratePrefs: () => void;
}

const CASCADE_STEP = 30;
const CASCADE_WRAP = 6;
// Floor-relative: the windows layer is already inset past the rail + bars
// (see .windows in museum.css), so this is just a small offset into the floor.
const CASCADE_ORIGIN: WinPos = { x: 28, y: 24 };

export const useMuseumStore = create<MuseumState>((set, get) => ({
  windows: {},
  focused: null,
  topZ: 0,

  activeWing: DEFAULT_WING,
  soundOn: true,
  attractOn: false,

  openExhibit: (slug) =>
    set((state) => {
      const z = state.topZ + 1;
      const existing = state.windows[slug];

      // Already open → raise + focus (keep its position).
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
      const topmost = Object.values(next).reduce<OpenWindow | null>(
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
        windows: { ...state.windows, [slug]: { ...existing, x: pos.x, y: pos.y } },
      };
    }),

  positionOf: (slug) => {
    const w = get().windows[slug];
    return w ? { x: w.x, y: w.y } : CASCADE_ORIGIN;
  },

  setWing: (wing) =>
    set((state) => (state.activeWing === wing ? state : { activeWing: wing })),

  toggleSound: () =>
    set((state) => {
      const soundOn = !state.soundOn;
      prefs.setSound(soundOn);
      return { soundOn };
    }),

  toggleAttract: () =>
    set((state) => {
      const attractOn = !state.attractOn;
      prefs.setAttract(attractOn);
      return { attractOn };
    }),

  hydratePrefs: () => set({ soundOn: prefs.getSound(), attractOn: prefs.getAttract() }),
}));

/** Stable selector for the list of open slugs (order is irrelevant — z drives stacking). */
export const selectOpenSlugs = (state: MuseumState): readonly string[] =>
  Object.keys(state.windows);
