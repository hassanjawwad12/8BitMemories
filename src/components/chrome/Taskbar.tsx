"use client";

import { useEffect, useState } from "react";

import { useShallow } from "zustand/shallow";

import { EXHIBIT_BY_SLUG } from "@/data/exhibits";
import { playUiSound } from "@/lib/audio/play";
import { useAnnouncer } from "@/store/useAnnouncer";
import { selectOpenSlugs, useMuseumStore } from "@/store/useMuseumStore";

/** A clock that only renders a time after mount (avoids SSR hydration mismatch). */
function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="task-clock" title="Local time">
      {time ?? "--:--"}
    </span>
  );
}

/**
 * The bottom taskbar — Start-style brand, one button per open exhibit window
 * (click to raise/focus), a live status readout mirroring the announcer (so hover
 * narration is visible), and a clock. The status reuses the SR announcement, so
 * sighted and screen-reader users see the same running commentary.
 */
export function Taskbar() {
  const openSlugs = useMuseumStore(useShallow(selectOpenSlugs));
  const focused = useMuseumStore((s) => s.focused);
  const focusExhibit = useMuseumStore((s) => s.focusExhibit);
  const status = useAnnouncer((s) => s.message);

  const onTask = (slug: string) => {
    focusExhibit(slug);
    if (useMuseumStore.getState().soundOn) playUiSound("snap");
  };

  return (
    <footer className="taskbar">
      <span className="taskbar-start" aria-hidden="true">
        ▸ 8BM
      </span>

      <ul className="task-windows" aria-label="Open exhibits">
        {openSlugs.map((slug) => {
          const exhibit = EXHIBIT_BY_SLUG.get(slug);
          if (!exhibit) return null;
          return (
            <li key={slug}>
              <button
                type="button"
                className={`task-win${focused === slug ? " is-active" : ""}`}
                onClick={() => onTask(slug)}
              >
                {exhibit.title}
              </button>
            </li>
          );
        })}
      </ul>

      <span className="task-status">{status || "Ready."}</span>
      <Clock />
    </footer>
  );
}
