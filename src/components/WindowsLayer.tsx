"use client";

import { useShallow } from "zustand/shallow";

import { ExhibitWindow } from "@/components/ExhibitWindow";
import { selectOpenSlugs, useMuseumStore } from "@/store/useMuseumStore";

/**
 * The floating-windows layer — renders one <ExhibitWindow> per open slug above
 * the lobby. The layer itself is pointer-transparent (so the lobby stays
 * interactive between windows); each window re-enables pointer events. Stacking
 * is driven by each window's stored z, not DOM order.
 */
export function WindowsLayer() {
  // useShallow: selectOpenSlugs derives a new array each call, so we compare it
  // shallowly to keep the snapshot referentially stable (avoids an infinite loop).
  const openSlugs = useMuseumStore(useShallow(selectOpenSlugs));
  return (
    <div className="windows">
      {openSlugs.map((slug) => (
        <ExhibitWindow key={slug} slug={slug} />
      ))}
    </div>
  );
}
