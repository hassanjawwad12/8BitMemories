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
    wingsVisited: [DEFAULT_WING],
    everOpened: [],
    soundOn: true,
    attractOn: true,
    secretsFound: [],
    lastSecret: null,
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

  it("visiting all three wings grants the explorer secret", () => {
    expect(s().secretsFound).not.toContain("explorer");
    s().setWing("living-room");
    s().setWing("terminal");
    expect(s().secretsFound).toContain("explorer");
    expect(s().lastSecret).toBe("explorer");
  });
});

describe("secrets", () => {
  it("opening five distinct exhibits grants the collector secret", () => {
    for (const slug of ["pong", "invaders", "pac-man", "asteroids", "galaga"]) {
      s().openExhibit(slug);
    }
    expect(s().secretsFound).toContain("collector");
  });

  it("opening Flying Toasters grants the toaster secret", () => {
    s().openExhibit("flying-toasters");
    expect(s().secretsFound).toContain("toaster");
  });

  it("grantSecret is idempotent and sets lastSecret", () => {
    s().grantSecret("konami");
    s().grantSecret("konami");
    expect(s().secretsFound.filter((x) => x === "konami")).toHaveLength(1);
    expect(s().lastSecret).toBe("konami");
    s().clearLastSecret();
    expect(s().lastSecret).toBeNull();
  });
});

describe("preferences", () => {
  it("toggleSound flips and persists", () => {
    expect(s().soundOn).toBe(true);
    s().toggleSound();
    expect(s().soundOn).toBe(false);
    expect(window.localStorage.getItem("8bm-sound")).toBe("0");
  });

  it("toggleAttract flips and persists", () => {
    s().toggleAttract();
    expect(s().attractOn).toBe(false);
    expect(window.localStorage.getItem("8bm-attract")).toBe("0");
  });

  it("hydratePrefs reads persisted prefs from storage", () => {
    window.localStorage.setItem("8bm-sound", "0");
    window.localStorage.setItem("8bm-attract", "0");
    s().hydratePrefs();
    expect(s().soundOn).toBe(false);
    expect(s().attractOn).toBe(false);
  });
});
