"use client";

import { WINGS } from "@/data/wings";
import { playUiSound } from "@/lib/audio/play";
import { runTransition } from "@/lib/viewTransition";
import { announce } from "@/store/useAnnouncer";
import { useMuseumStore } from "@/store/useMuseumStore";
import type { WingId } from "@/data/schema";

/**
 * The left wings rail — the keyboard-navigable spine for switching floors. A
 * switch reties the whole floor palette inside a native View Transition tagged
 * "wing" (the channel-change static + vertical-roll wipe lives in chrome.css),
 * with a flip SFX. Reduced motion makes the swap instant (handled in the helper).
 */
export function WingsRail() {
  const activeWing = useMuseumStore((s) => s.activeWing);
  const setWing = useMuseumStore((s) => s.setWing);

  const switchTo = (id: WingId, label: string) => {
    if (id === activeWing) return;
    if (useMuseumStore.getState().soundOn) playUiSound("flip");
    runTransition(() => setWing(id), "wing");
    announce(`Switched to ${label}`);
  };

  return (
    <nav className="rail" aria-label="Wings">
      <span className="rail-head">WINGS</span>
      <ul className="rail-list">
        {WINGS.map((wing) => {
          const isActive = wing.id === activeWing;
          return (
            <li key={wing.id}>
              <button
                type="button"
                className={`rail-btn${isActive ? " is-active" : ""}`}
                data-wing={wing.id}
                aria-current={isActive ? "true" : undefined}
                onClick={() => switchTo(wing.id, wing.label)}
              >
                <span className="rail-dot" aria-hidden="true" />
                <span className="rail-text">
                  <span className="rail-label">{wing.label}</span>
                  <span className="rail-era">{wing.era}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <span className="rail-foot">MADE WITH ♥</span>
    </nav>
  );
}
