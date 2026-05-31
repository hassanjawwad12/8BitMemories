"use client";

import { BootScreen } from "@/components/boot/BootScreen";
import { CRTOverlay } from "@/components/boot/CRTOverlay";
import { LiveRegion } from "@/components/a11y/LiveRegion";
import { MicroGallery } from "@/components/micro/MicroGallery";

/**
 * Shell — boots the haunted OS, lays the CRT atmosphere over everything, and
 * wires the screen-reader live region. Currently shows the Phase-2 micro-anim
 * contact sheet; Phase 3 swaps in the real lobby, wings, and exhibit windows.
 */
export function Museum() {
  return (
    <>
      <BootScreen />
      <main className="desktop" data-wing="coin-op">
        <MicroGallery />
      </main>
      <CRTOverlay />
      <LiveRegion />
    </>
  );
}
