"use client";

import { CabinetTile } from "@/components/CabinetTile";
import { exhibitsByWing } from "@/data/exhibits";
import { WING_BY_ID } from "@/data/wings";
import { useMuseumStore } from "@/store/useMuseumStore";

/**
 * The lobby floor — shows the active wing's cabinet tiles, derived from the
 * manifest. The wing palette is applied by the desktop's `data-wing` (set in
 * Museum), so switching wings reties everything beneath the View Transition while
 * the OS chrome stays neutral (the two-layer rule).
 */
export function Lobby() {
  const activeWing = useMuseumStore((s) => s.activeWing);
  const wing = WING_BY_ID[activeWing];
  const exhibits = exhibitsByWing(activeWing);
  const headingId = `wing-${activeWing}-heading`;

  return (
    <section className="wing" aria-labelledby={headingId}>
      <header className="wing-head">
        <div className="wing-head-row">
          <h2 id={headingId} className="wing-title">
            {wing.label}
          </h2>
          <span className="wing-era">{wing.era}</span>
          <span className="wing-tagline">{wing.tagline}</span>
        </div>
        <p className="wing-blurb">{wing.blurb}</p>
      </header>
      <div className="wing-grid">
        {exhibits.map((exhibit) => (
          <CabinetTile key={exhibit.slug} exhibit={exhibit} />
        ))}
      </div>
    </section>
  );
}
