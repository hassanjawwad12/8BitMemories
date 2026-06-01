import { afterEach, describe, expect, it, vi } from "vitest";

import { prefs } from "@/lib/prefs";

/**
 * prefs is a best-effort localStorage wrapper: blocked/full storage must degrade
 * to the fallback, never throw. These tests force the storage APIs to throw to
 * exercise the catch paths.
 */
describe("prefs", () => {
  afterEach(() => vi.restoreAllMocks());

  it("round-trips a boolean", () => {
    prefs.setSound(false);
    expect(prefs.getSound()).toBe(false);
    prefs.setSound(true);
    expect(prefs.getSound()).toBe(true);
  });

  it("returns the fallback when reading throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(prefs.getSound()).toBe(true); // sound defaults on
    expect(prefs.getAttract()).toBe(false); // attract defaults off
  });

  it("swallows write errors", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    expect(() => prefs.setSound(false)).not.toThrow();
    expect(() => prefs.setAttract(false)).not.toThrow();
  });
});
