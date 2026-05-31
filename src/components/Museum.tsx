"use client";

import { BootScreen } from "@/components/boot/BootScreen";
import { CRTOverlay } from "@/components/boot/CRTOverlay";
import { LiveRegion } from "@/components/a11y/LiveRegion";

/**
 * Phase-0 shell — boots the haunted OS, lays the CRT atmosphere over everything,
 * and wires the screen-reader live region. The lobby, wings, exhibit windows,
 * and OS furniture are layered in across later phases.
 */
export function Museum() {
  return (
    <>
      <BootScreen />
      <main className="desktop" data-wing="coin-op">
        <h1 className="holo-text" style={{ padding: "2rem" }}>
          8BitMemories
        </h1>
      </main>
      <CRTOverlay />
      <LiveRegion />
    </>
  );
}
