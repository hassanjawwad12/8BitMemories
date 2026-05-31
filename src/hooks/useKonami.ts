"use client";

import { useEffect, useRef } from "react";

import { KONAMI_SEQUENCE } from "@/lib/secrets";

/**
 * Fires `onUnlock` once the Konami sequence is entered. Tracks progress in a ref
 * (no re-renders); a wrong key resets to the longest matching prefix so you don't
 * have to start over from a single fumble. Keys are compared case-insensitively.
 */
export function useKonami(onUnlock: () => void): void {
  const indexRef = useRef(0);
  const cbRef = useRef(onUnlock);
  cbRef.current = onUnlock;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_SEQUENCE[indexRef.current];

      if (key === expected) {
        indexRef.current += 1;
        if (indexRef.current === KONAMI_SEQUENCE.length) {
          indexRef.current = 0;
          cbRef.current();
        }
      } else {
        // Restart, but honor this key if it matches the first step.
        indexRef.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
