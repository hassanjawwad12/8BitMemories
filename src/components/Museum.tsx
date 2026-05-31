"use client";

import "./museum.css";

import { LiveRegion } from "@/components/a11y/LiveRegion";
import { BootScreen } from "@/components/boot/BootScreen";
import { CRTOverlay } from "@/components/boot/CRTOverlay";
import { Lobby } from "@/components/Lobby";
import { WindowsLayer } from "@/components/WindowsLayer";

/**
 * The museum shell. Layers, bottom to top: the boot splash → the desktop (the
 * scrollable lobby of cabinet tiles) → the floating exhibit windows → the CRT
 * atmosphere → the a11y live region. The OS chrome (menu bar, taskbar, guest
 * book, visit counter) and wing transitions are layered in during Phase 4.
 */
export function Museum() {
  return (
    <>
      <BootScreen />
      <main className="desktop">
        <Lobby />
      </main>
      <WindowsLayer />
      <CRTOverlay />
      <LiveRegion />
    </>
  );
}
