import { CabinetTile } from "@/components/CabinetTile";
import { exhibitsByWing } from "@/data/exhibits";
import { WINGS } from "@/data/wings";

/**
 * The lobby floor — a wall of cabinet tiles grouped by wing, derived entirely
 * from the manifest. Each wing `<section>` carries its `data-wing`, so the tiles
 * (and their micro-anims) pick up that wing's loud palette while the OS chrome
 * around them stays neutral — the two-layer rule in one component.
 */
export function Lobby() {
  return (
    <div className="lobby">
      {WINGS.map((wing) => {
        const exhibits = exhibitsByWing(wing.id);
        const headingId = `wing-${wing.id}-heading`;
        return (
          <section
            key={wing.id}
            className="wing"
            data-wing={wing.id}
            aria-labelledby={headingId}
          >
            <header className="wing-head">
              <div className="wing-head-row">
                <h2 id={headingId} className="wing-title">
                  {wing.label}
                </h2>
                <span className="wing-era">{wing.era}</span>
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
      })}
    </div>
  );
}
