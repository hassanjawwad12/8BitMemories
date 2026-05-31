"use client";

import { ExhibitWindow } from "@/components/ExhibitWindow";
import { selectOpenSlugs, useMuseumStore } from "@/store/useMuseumStore";

/**
 * The floating-windows layer — renders one <ExhibitWindow> per open slug above
 * the lobby. The layer itself is pointer-transparent (so the lobby stays
 * interactive between windows); each window re-enables pointer events. Stacking
 * is driven by each window's stored z, not DOM order.
 */
export function WindowsLayer() {
  const openSlugs = useMuseumStore(selectOpenSlugs);
  return (
    <div className="windows">
      {openSlugs.map((slug) => (
        <ExhibitWindow key={slug} slug={slug} />
      ))}
    </div>
  );
}
