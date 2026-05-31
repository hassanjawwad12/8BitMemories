"use client";

import { VisitCounter } from "@/components/chrome/VisitCounter";
import { playUiSound } from "@/lib/audio/play";
import { SECRET_COUNT } from "@/lib/secrets";
import { announce } from "@/store/useAnnouncer";
import { useMuseumStore } from "@/store/useMuseumStore";

/**
 * The top menu bar — the constant OS chrome. Holds the brand + a clickable pixel
 * heart (a secret), the VISITS odometer, the SECRETS tally, the Guest Book /
 * About launchers, and the attract + sound toggles. Stays neutral OS-blue
 * regardless of the active wing (the two-layer rule).
 */
interface MenuBarProps {
  onOpenGuestBook: () => void;
  onOpenAbout: () => void;
}

export function MenuBar({ onOpenGuestBook, onOpenAbout }: MenuBarProps) {
  const soundOn = useMuseumStore((s) => s.soundOn);
  const attractOn = useMuseumStore((s) => s.attractOn);
  const toggleSound = useMuseumStore((s) => s.toggleSound);
  const toggleAttract = useMuseumStore((s) => s.toggleAttract);
  const grantSecret = useMuseumStore((s) => s.grantSecret);
  const secretsCount = useMuseumStore((s) => s.secretsFound.length);

  const onHeart = () => grantSecret("heart"); // reveal handled centrally in Museum

  const onSound = () => {
    const turningOn = !soundOn;
    toggleSound();
    if (turningOn) playUiSound("click");
    announce(turningOn ? "Sound on" : "Sound off");
  };

  const onAttract = () => {
    toggleAttract();
    if (useMuseumStore.getState().soundOn) playUiSound("click");
  };

  return (
    <header className="menubar">
      <div className="menubar-brand">
        <button
          type="button"
          className="heart"
          onClick={onHeart}
          aria-label="A little pixel heart"
        />
        <span className="brand-name holo-text">8BitMemories</span>
        <span className="brand-tag">the games we grew up on</span>
      </div>

      <div className="menubar-meta">
        <VisitCounter />
        <span className="meta-chip" title="Secrets found">
          SECRETS {secretsCount}/{SECRET_COUNT}
        </span>
        <button type="button" className="meta-btn" onClick={onOpenGuestBook}>
          Guest&nbsp;Book
        </button>
        <button type="button" className="meta-btn" onClick={onOpenAbout}>
          About
        </button>
        <button
          type="button"
          className="meta-btn"
          aria-pressed={attractOn}
          onClick={onAttract}
          title="Auto-cycle exhibits when idle"
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
