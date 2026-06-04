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
      <div className="rail-footer">
        <span className="rail-foot">MADE WITH ♥</span>
        <a
          className="rail-credit"
          href="https://github.com/hassanjawwad12"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hassan Jawwad on GitHub"
        >
          <svg
            className="rail-credit-icon"
            viewBox="0 0 16 16"
            width="14"
            height="14"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
            />
          </svg>
          <span>HASSAN JAWWAD</span>
        </a>
      </div>
    </nav>
  );
}
