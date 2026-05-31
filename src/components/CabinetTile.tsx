"use client";

import { getMicroAnim } from "@/components/micro/registry";
import type { GameExhibit } from "@/data/schema";
import { announce } from "@/store/useAnnouncer";
import { useMuseumStore } from "@/store/useMuseumStore";
import { playUiSound } from "@/lib/audio/play";

/**
 * A cabinet tile on the lobby floor: the game's live micro-anim preview behind a
 * beveled marquee label. Clicking (or Enter) opens its exhibit window; hovering
 * narrates the placard blurb into the status bar for sighted + SR users. The tile
 * is a real <button>, so it is keyboard-focusable and Enter/Space-activatable for
 * free.
 */
export function CabinetTile({ exhibit }: { exhibit: GameExhibit }) {
  const Anim = getMicroAnim(exhibit.micro);
  const openExhibit = useMuseumStore((s) => s.openExhibit);
  const soundOn = useMuseumStore((s) => s.soundOn);

  const handleOpen = () => {
    openExhibit(exhibit.slug);
    announce(`Opened ${exhibit.title}`);
    if (soundOn) playUiSound("power");
  };

  const handleHover = () => {
    announce(`${exhibit.title} — ${exhibit.blurb}`);
    if (soundOn) playUiSound("click");
  };

  return (
    <button
      type="button"
      className="cabinet"
      onClick={handleOpen}
      onMouseEnter={handleHover}
      aria-label={`Open ${exhibit.title} (${exhibit.year}, ${exhibit.platform})`}
    >
      <span className="cabinet-screen">
        <Anim />
      </span>
      <span className="cabinet-marquee">
        <span className="cabinet-title">{exhibit.title}</span>
        <span className="cabinet-sub">
          {exhibit.year} · {exhibit.platform}
        </span>
      </span>
    </button>
  );
}
