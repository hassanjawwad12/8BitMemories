import { describe, expect, it } from "vitest";

import {
  EXHIBITS,
  EXHIBIT_BY_SLUG,
  exhibitsByWing,
} from "@/data/exhibits";
import {
  MICRO_ANIM_IDS,
  WING_IDS,
  exhibitSchema,
  validateExhibits,
} from "@/data/schema";
import { WINGS } from "@/data/wings";

/**
 * Manifest integrity — the manifest is the product, so it gets the strictest
 * tests: it must parse, every slug must be unique, every micro/wing must be a
 * known id, and the derived lookups must stay in sync with the source array.
 */
describe("exhibit manifest", () => {
  it("passes zod validation at load (no throw)", () => {
    expect(() => validateExhibits(EXHIBITS)).not.toThrow();
  });

  it("has at least the planned ~20 exhibits", () => {
    expect(EXHIBITS.length).toBeGreaterThanOrEqual(20);
  });

  it("has unique slugs", () => {
    const slugs = EXHIBITS.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses only known wing ids", () => {
    for (const exhibit of EXHIBITS) {
      expect(WING_IDS).toContain(exhibit.wing);
    }
  });

  it("uses only known micro-animation ids", () => {
    for (const exhibit of EXHIBITS) {
      expect(MICRO_ANIM_IDS).toContain(exhibit.micro);
    }
  });

  it("keeps years within the retro era", () => {
    for (const exhibit of EXHIBITS) {
      expect(exhibit.year).toBeGreaterThanOrEqual(1958);
      expect(exhibit.year).toBeLessThanOrEqual(2005);
    }
  });

  it("gives every exhibit at least one fact", () => {
    for (const exhibit of EXHIBITS) {
      expect(exhibit.facts.length).toBeGreaterThan(0);
    }
  });

  it("rejects a malformed entry (bad slug)", () => {
    const bad = { ...EXHIBITS[0], slug: "Not A Slug" };
    expect(exhibitSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a duplicate slug via validateExhibits", () => {
    expect(() => validateExhibits([EXHIBITS[0], EXHIBITS[0]])).toThrow(/Duplicate/);
  });
});

describe("derived lookups", () => {
  it("EXHIBIT_BY_SLUG covers every exhibit exactly once", () => {
    expect(EXHIBIT_BY_SLUG.size).toBe(EXHIBITS.length);
    for (const exhibit of EXHIBITS) {
      expect(EXHIBIT_BY_SLUG.get(exhibit.slug)).toBe(exhibit);
    }
  });

  it("exhibitsByWing partitions the manifest", () => {
    const total = WINGS.reduce((sum, w) => sum + exhibitsByWing(w.id).length, 0);
    expect(total).toBe(EXHIBITS.length);
  });

  it("every wing has at least one exhibit", () => {
    for (const wing of WINGS) {
      expect(exhibitsByWing(wing.id).length).toBeGreaterThan(0);
    }
  });
});
