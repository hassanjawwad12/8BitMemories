"use client";

import { VisitCounter } from "@/components/chrome/VisitCounter";
import { playUiSound } from "@/lib/audio/play";
import { announce } from "@/store/useAnnouncer";
import { useMuseumStore } from "@/store/useMuseumStore";

const ATTRACT_HINT =
  "Attract mode: when on, the museum auto-cycles through exhibits after ~30s " +
  "of no activity (like an arcade demo screen). Any input stops it.";

/**
 * The top menu bar — the constant OS chrome. Holds the brand + a decorative pixel
 * heart, the VISITS odometer, the About launcher, and the attract + sound
 * toggles. Stays neutral OS-blue regardless of the active wing (the two-layer
 * rule).
 */
interface MenuBarProps {
  onOpenAbout: () => void;
}

export function MenuBar({ onOpenAbout }: MenuBarProps) {
  const soundOn = useMuseumStore((s) => s.soundOn);
  const attractOn = useMuseumStore((s) => s.attractOn);
  const toggleSound = useMuseumStore((s) => s.toggleSound);
  const toggleAttract = useMuseumStore((s) => s.toggleAttract);

  const onSound = () => {
    const turningOn = !soundOn;
    toggleSound();
    if (turningOn) playUiSound("click");
    announce(turningOn ? "Sound on" : "Sound off");
  };

  const onAttract = () => {
    const turningOn = !attractOn;
    toggleAttract();
    if (useMuseumStore.getState().soundOn) playUiSound("click");
    announce(turningOn ? "Attract mode on" : "Attract mode off");
  };

  return (
    <header className="menubar">
      <div className="menubar-brand">
        <span className="heart" aria-hidden="true" />
        <span className="brand-name">8BitMemories</span>
        <span className="brand-tag">the games we grew up on</span>
      </div>

      <div className="menubar-meta">
        <VisitCounter />
        <button type="button" className="meta-btn" onClick={onOpenAbout}>
          About
        </button>
        <button
          type="button"
          className="meta-btn"
          aria-pressed={attractOn}
          onClick={onAttract}
          title={ATTRACT_HINT}
        >
          ATTRACT {attractOn ? "●" : "○"}
        </button>
        <button
          type="button"
          className="meta-btn meta-btn--icon"
          aria-pressed={soundOn}
          onClick={onSound}
          aria-label={soundOn ? "Mute sound" : "Unmute sound"}
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
      </div>
    </header>
  );
}
