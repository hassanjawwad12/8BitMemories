"use client";

import "./museum.css";
import "./chrome/chrome.css";

import { useEffect, useState } from "react";

import { LiveRegion } from "@/components/a11y/LiveRegion";
import { AttractMode } from "@/components/AttractMode";
import { BootScreen } from "@/components/boot/BootScreen";
import { CRTOverlay } from "@/components/boot/CRTOverlay";
import { About } from "@/components/chrome/About";
import { GuestBook } from "@/components/chrome/GuestBook";
import { MenuBar } from "@/components/chrome/MenuBar";
import { Taskbar } from "@/components/chrome/Taskbar";
import { WingsRail } from "@/components/chrome/WingsRail";
import { Lobby } from "@/components/Lobby";
import { WindowsLayer } from "@/components/WindowsLayer";
import { useKonami } from "@/hooks/useKonami";
import { playUiSound } from "@/lib/audio/play";
import { SECRET_LABELS } from "@/lib/secrets";
import { announce } from "@/store/useAnnouncer";
import { useMuseumStore } from "@/store/useMuseumStore";

const SECRET_TOAST_MS = 2600;
const GLITCH_MS = 1500;

/**
 * The museum shell. Layers, bottom to top: boot splash → neutral OS chrome
 * (menu bar, wings rail, taskbar) → the wing-themed desktop floor → floating
 * exhibit windows → modals (guest book / about) → secret toast + Konami glitch →
 * CRT atmosphere → a11y live region. Also hydrates durable prefs, drives the
 * Konami unlock, and centrally reveals every granted secret.
 */
export function Museum() {
  const activeWing = useMuseumStore((s) => s.activeWing);
  const hydratePrefs = useMuseumStore((s) => s.hydratePrefs);
  const grantSecret = useMuseumStore((s) => s.grantSecret);
  const lastSecret = useMuseumStore((s) => s.lastSecret);
  const clearLastSecret = useMuseumStore((s) => s.clearLastSecret);

  const [showGuestBook, setShowGuestBook] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [glitch, setGlitch] = useState(false);

  // Pull durable prefs (sound/attract) from localStorage after mount.
  useEffect(() => {
    hydratePrefs();
  }, [hydratePrefs]);

  // Konami code → secret + a brief CRT colour-glitch.
  useKonami(() => {
    grantSecret("konami");
    setGlitch(true);
    window.setTimeout(() => setGlitch(false), GLITCH_MS);
  });

  // Central reveal for any granted secret: announce + coin + toast, then clear.
  useEffect(() => {
    if (!lastSecret) return;
    const label = SECRET_LABELS[lastSecret];
    announce(`Secret found — ${label}`);
    if (useMuseumStore.getState().soundOn) playUiSound("coin");
    setToast(label);
    const t = setTimeout(() => {
      setToast(null);
      clearLastSecret();
    }, SECRET_TOAST_MS);
    return () => clearTimeout(t);
  }, [lastSecret, clearLastSecret]);

  return (
    <>
      <BootScreen />

      <MenuBar
        onOpenGuestBook={() => setShowGuestBook(true)}
        onOpenAbout={() => setShowAbout(true)}
      />
      <WingsRail />

      <main className="desktop" data-wing={activeWing}>
        <Lobby />
      </main>

      <WindowsLayer />
      <Taskbar />

      {showGuestBook && <GuestBook onClose={() => setShowGuestBook(false)} />}
      {showAbout && <About onClose={() => setShowAbout(false)} />}

      {toast && (
        <div className="secret-toast" role="status">
          <span className="secret-toast-star" aria-hidden="true">
            ★
          </span>
          {toast}
        </div>
      )}
      {glitch && <div className="crt-glitch" aria-hidden="true" />}

      <AttractMode />
      <CRTOverlay />
      <LiveRegion />
    </>
  );
}
