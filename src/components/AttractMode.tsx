"use client";

import { useEffect, useRef } from "react";

import { EXHIBITS } from "@/data/exhibits";
import { useIdle } from "@/hooks/useIdle";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMuseumStore } from "@/store/useMuseumStore";

/**
 * ATTRACT MODE — after ~30s of no input the museum auto-cycles exhibits like an
 * arcade attract screen: it switches to each game's wing and pops its window open,
 * one every few seconds. Any input cancels it (via useIdle) and the cycler tears
 * down its last window. Gated by the attract preference + reduced motion. Renders
 * nothing. Drives the store directly (no SFX — it's an ambient idle state).
 */
const IDLE_MS = 30_000;
const CYCLE_MS = 4_200;

export function AttractMode() {
  const attractOn = useMuseumStore((s) => s.attractOn);
  const reduced = useReducedMotion();
  const idle = useIdle(IDLE_MS, attractOn && !reduced);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!idle) return;

    let prevSlug: string | null = null;
    const store = useMuseumStore.getState;

    const tick = () => {
      const exhibit = EXHIBITS[indexRef.current % EXHIBITS.length]!;
      indexRef.current += 1;
      if (prevSlug && prevSlug !== exhibit.slug) store().closeExhibit(prevSlug);
      store().setWing(exhibit.wing);
      store().openExhibit(exhibit.slug);
      prevSlug = exhibit.slug;
    };

    tick();
    const interval = setInterval(tick, CYCLE_MS);
    return () => {
      clearInterval(interval);
      if (prevSlug) store().closeExhibit(prevSlug);
    };
  }, [idle]);

  return null;
}
