import { beforeEach, describe, expect, it } from "vitest";

import { DEFAULT_WING } from "@/data/wings";
import { useMuseumStore } from "@/store/useMuseumStore";

/** Reset the data fields before each test (actions are preserved by merge). */
function resetStore() {
  useMuseumStore.setState({
    windows: {},
    focused: null,
    topZ: 0,
    activeWing: DEFAULT_WING,
    soundOn: true,
    attractOn: false,
  });
}

const s = () => useMuseumStore.getState();

beforeEach(resetStore);

describe("window lifecycle", () => {
  it("opens a window, focuses it, and bumps z", () => {
    s().openExhibit("pong");
    expect(s().windows.pong).toBeDefined();
    expect(s().focused).toBe("pong");
    expect(s().windows.pong!.z).toBe(1);
  });

  it("does not mutate the previous windows map (immutable update)", () => {
    const before = s().windows;
    s().openExhibit("pong");
    expect(s().windows).not.toBe(before);
    expect(before).toEqual({});
  });

  it("re-opening a window raises it without moving it", () => {
    s().openExhibit("pong");
    s().moveExhibit("pong", { x: 400, y: 250 });
    s().openExhibit("invaders");
    s().openExhibit("pong"); // re-focus
    expect(s().focused).toBe("pong");
    expect(s().windows.pong).toMatchObject({ x: 400, y: 250 });
    expect(s().windows.pong!.z).toBe(s().topZ);
  });

  it("focusExhibit raises an existing window to the top", () => {
    s().openExhibit("pong");
    s().openExhibit("invaders");
    expect(s().focused).toBe("invaders");
    s().focusExhibit("pong");
    expect(s().focused).toBe("pong");
    expect(s().windows.pong!.z).toBeGreaterThan(s().windows.invaders!.z);
  });

  it("closing the focused window re-focuses the next top-most", () => {
    s().openExhibit("pong");
    s().openExhibit("invaders");
    s().closeExhibit("invaders");
    expect(s().windows.invaders).toBeUndefined();
    expect(s().focused).toBe("pong");
  });

  it("closing a non-focused window keeps the current focus", () => {
    s().openExhibit("pong");
    s().openExhibit("invaders"); // invaders is focused
    s().closeExhibit("pong"); // close the un-focused one
    expect(s().focused).toBe("invaders");
    expect(s().windows.pong).toBeUndefined();
  });

  it("closing the last window clears focus", () => {
    s().openExhibit("pong");
    s().closeExhibit("pong");
    expect(s().focused).toBeNull();
    expect(Object.keys(s().windows)).toHaveLength(0);
  });

  it("positionOf returns the stored position", () => {
    s().openExhibit("pong");
    s().moveExhibit("pong", { x: 12, y: 34 });
    expect(s().positionOf("pong")).toEqual({ x: 12, y: 34 });
  });
});

describe("wings", () => {
  it("setWing changes the active wing", () => {
    s().setWing("terminal");
    expect(s().activeWing).toBe("terminal");
  });

  it("setWing to the current wing is a no-op", () => {
    const before = s().activeWing;
    s().setWing(before);
    expect(s().activeWing).toBe(before);
  });
});

describe("preferences", () => {
  it("toggleSound flips and persists", () => {
    expect(s().soundOn).toBe(true);
    s().toggleSound();
    expect(s().soundOn).toBe(false);
    expect(window.localStorage.getItem("8bm-sound")).toBe("0");
  });

  it("toggleAttract flips from its default-off state and persists", () => {
    expect(s().attractOn).toBe(false);
    s().toggleAttract();
    expect(s().attractOn).toBe(true);
    expect(window.localStorage.getItem("8bm-attract")).toBe("1");
  });

  it("hydratePrefs reads persisted prefs from storage", () => {
    window.localStorage.setItem("8bm-sound", "0");
    window.localStorage.setItem("8bm-attract", "1");
    s().hydratePrefs();
    expect(s().soundOn).toBe(false);
    expect(s().attractOn).toBe(true);
  });
});
