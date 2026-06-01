"use client";

import "./museum.css";
import "./chrome/chrome.css";

import { useEffect, useState } from "react";

import { LiveRegion } from "@/components/a11y/LiveRegion";
import { AttractMode } from "@/components/AttractMode";
import { BootScreen } from "@/components/boot/BootScreen";
import { CRTOverlay } from "@/components/boot/CRTOverlay";
import { About } from "@/components/chrome/About";
import { MenuBar } from "@/components/chrome/MenuBar";
import { Taskbar } from "@/components/chrome/Taskbar";
import { WingsRail } from "@/components/chrome/WingsRail";
import { Lobby } from "@/components/Lobby";
import { WindowsLayer } from "@/components/WindowsLayer";
import { useMuseumStore } from "@/store/useMuseumStore";

/**
 * The museum shell. Layers, bottom to top: boot splash → neutral OS chrome
 * (menu bar, wings rail, taskbar) → the wing-themed desktop floor → floating
 * exhibit windows → the About modal → CRT atmosphere → a11y live region. Also
 * hydrates durable prefs (sound / attract) after mount.
 */
export function Museum() {
  const activeWing = useMuseumStore((s) => s.activeWing);
  const hydratePrefs = useMuseumStore((s) => s.hydratePrefs);

  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    hydratePrefs();
  }, [hydratePrefs]);

  return (
    <>
      <BootScreen />

      <MenuBar onOpenAbout={() => setShowAbout(true)} />
      <WingsRail />

      <main className="desktop" data-wing={activeWing}>
        <Lobby />
      </main>

      <WindowsLayer />
      <Taskbar />

      {showAbout && <About onClose={() => setShowAbout(false)} />}

      <AttractMode />
      <CRTOverlay />
      <LiveRegion />
    </>
  );
}
