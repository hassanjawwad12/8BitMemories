"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether the user has been idle for `timeoutMs`. Any pointer, key, wheel,
 * or touch activity resets the timer (and clears idle). Used to drive attract
 * mode. `enabled=false` disarms it entirely (e.g. reduced motion / attract off),
 * resetting idle to false.
 */
export function useIdle(timeoutMs: number, enabled: boolean): boolean {
  const [idle, setIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled) {
      setIdle(false);
      return;
    }

    const arm = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIdle(true), timeoutMs);
    };

    const onActivity = () => {
      setIdle(false);
      arm();
    };

    const events: readonly string[] = [
      "pointerdown",
      "pointermove",
      "keydown",
      "wheel",
      "touchstart",
    ];
    for (const evt of events) {
      window.addEventListener(evt, onActivity, { passive: true });
    }
    arm();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      for (const evt of events) window.removeEventListener(evt, onActivity);
    };
  }, [timeoutMs, enabled]);

  return idle;
}
