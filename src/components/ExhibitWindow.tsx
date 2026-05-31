"use client";

import "./window.css";

import { useCallback, useRef } from "react";
import type { CSSProperties, KeyboardEvent } from "react";

import { GifScreen } from "@/components/GifScreen";
import { Placard } from "@/components/Placard";
import { getMicroAnim } from "@/components/micro/registry";
import { EXHIBIT_BY_SLUG } from "@/data/exhibits";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useWindowDrag } from "@/hooks/useWindowDrag";
import { announce } from "@/store/useAnnouncer";
import { useMuseumStore } from "@/store/useMuseumStore";
import { playUiSound } from "@/lib/audio/play";

/**
 * A draggable Win98-style exhibit window. The title bar is the drag handle (the
 * kit's `useWindowDrag` writes the position straight to the element's --x/--y in
 * rAF, committing to the store on release). It is a focus-trapped `role="dialog"`
 * while focused, closes on Esc or the × button, and raises to the top on any
 * pointer-down. The live micro-anim appears twice: a tiny instance in the title
 * bar chrome, and the large one as the CRT screen.
 */
export function ExhibitWindow({ slug }: { slug: string }) {
  const exhibit = EXHIBIT_BY_SLUG.get(slug);

  const winRef = useRef<HTMLElement>(null);
  const win = useMuseumStore((s) => s.windows[slug]);
  const isFocused = useMuseumStore((s) => s.focused === slug);
  const focusExhibit = useMuseumStore((s) => s.focusExhibit);
  const moveExhibit = useMuseumStore((s) => s.moveExhibit);
  const closeExhibit = useMuseumStore((s) => s.closeExhibit);
  const soundOn = useMuseumStore((s) => s.soundOn);

  const handleClose = useCallback(() => {
    closeExhibit(slug);
    if (exhibit) announce(`Closed ${exhibit.title}`);
    if (useMuseumStore.getState().soundOn) playUiSound("trash");
  }, [closeExhibit, slug, exhibit]);

  const onTitlePointerDown = useWindowDrag({
    targetRef: winRef,
    getStart: () => useMuseumStore.getState().positionOf(slug),
    onStart: () => focusExhibit(slug),
    onCommit: (pos) => moveExhibit(slug, pos),
  });

  useFocusTrap(winRef, isFocused);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleClose();
      }
    },
    [handleClose],
  );

  // A window for a slug not in the manifest can't happen via the UI, but guard.
  if (!exhibit || !win) return null;

  const TitleAnim = getMicroAnim(exhibit.micro);

  return (
    <article
      ref={winRef}
      className={`exhibit-window${isFocused ? " is-focused" : ""}`}
      data-wing={exhibit.wing}
      role="dialog"
      aria-modal="false"
      aria-labelledby={`win-${slug}-title`}
      tabIndex={-1}
      style={
        {
          "--x": `${win.x}px`,
          "--y": `${win.y}px`,
          zIndex: win.z,
        } as CSSProperties
      }
      onPointerDown={() => focusExhibit(slug)}
      onKeyDown={onKeyDown}
    >
      <header className="win-titlebar" onPointerDown={onTitlePointerDown}>
        <span className="win-icon" aria-hidden="true">
          <TitleAnim />
        </span>
        <h2 id={`win-${slug}-title`} className="win-title">
          {exhibit.title}
        </h2>
        <button
          type="button"
          className="win-close"
          // Stop the drag handler (and its pointer capture) from swallowing the
          // click — otherwise the title bar captures the pointer and × never fires.
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleClose}
          aria-label={`Close ${exhibit.title}`}
        >
          ×
        </button>
      </header>

      <div className="win-body">
        <GifScreen exhibit={exhibit} />
        <Placard exhibit={exhibit} />
      </div>

      <footer className="win-status">
        <span>{exhibit.developer}</span>
        <span>
          {exhibit.year} · {exhibit.platform}
        </span>
      </footer>
    </article>
  );
}
