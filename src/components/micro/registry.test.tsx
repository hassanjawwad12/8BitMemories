import { render } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { getMicroAnim, MICRO_REGISTRY } from "@/components/micro/registry";
import { MICRO_ANIM_IDS, type MicroAnimId } from "@/data/schema";

/**
 * The registry must stay exhaustive (every schema id has a component, and no
 * extras), and every component must mount cleanly as a decorative, aria-hidden
 * stage. Reduced-motion poses are CSS-only, so they're verified visually in
 * Playwright — here we just assert the markup contract.
 */
describe("micro-animation registry", () => {
  it("has exactly one component per schema id", () => {
    const registryKeys = Object.keys(MICRO_REGISTRY).sort();
    const schemaIds = [...MICRO_ANIM_IDS].sort();
    expect(registryKeys).toEqual(schemaIds);
  });

  it("resolves a component for every id via getMicroAnim", () => {
    for (const id of MICRO_ANIM_IDS) {
      expect(typeof getMicroAnim(id)).toBe("function");
    }
  });

  it("falls back to a component for an unknown id", () => {
    expect(typeof getMicroAnim("not-a-real-id" as MicroAnimId)).toBe("function");
  });

  it.each([...MICRO_ANIM_IDS])("mounts %s as an aria-hidden .micro stage", (id) => {
    const Anim = getMicroAnim(id as MicroAnimId);
    const { container, unmount } = render(createElement(Anim));
    const stage = container.querySelector(".micro");
    expect(stage).not.toBeNull();
    expect(stage).toHaveAttribute("aria-hidden", "true");
    // The fallback id "_attract" renders as the class "micro--attract".
    expect(stage).toHaveClass(`micro--${id.replace(/^_/, "")}`);
    unmount();
  });
});
