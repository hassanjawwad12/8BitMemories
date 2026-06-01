"use client";

import { exhibitsByWing } from "@/data/exhibits";
import { WING_BY_ID } from "@/data/wings";
import { useMuseumStore } from "@/store/useMuseumStore";

/**
 * Floor footer for the active wing — fills the space beneath the cabinet grid
 * with on-theme atmosphere: a scrolling marquee of the wing's game titles, a
 * blinking tagline, and an era FUN FACT. The marquee and tagline are decorative
 * (aria-hidden); the fun fact is real content. Motion is reduced-motion gated in
 * museum.css.
 */
export function WingFloor() {
  const activeWing = useMuseumStore((s) => s.activeWing);
  const wing = WING_BY_ID[activeWing];
  const titles = exhibitsByWing(activeWing).map((e) => e.title);
  // Duplicate the list so the marquee can loop seamlessly at translateX(-50%).
  const marquee = [...titles, ...titles];

  return (
    <div className="wing-floor">
      <div className="floor-ticker" aria-hidden="true">
        <div className="floor-ticker-track">
          {marquee.map((title, i) => (
            <span key={`${title}-${i}`} className="floor-ticker-item">
              {title}
              <i className="floor-sep">◆</i>
            </span>
          ))}
        </div>
      </div>

      <p className="floor-blink" aria-hidden="true">
        {wing.tagline}
        <span className="floor-cursor">▮</span>
      </p>

      <div className="floor-fact">
        <h3 className="floor-fact-head">Fun Fact</h3>
        <p className="floor-fact-body">{wing.funFact}</p>
      </div>
    </div>
  );
}
