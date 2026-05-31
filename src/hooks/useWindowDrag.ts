"use client";

import { useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";

/**
 * Generic, store-agnostic window drag — ADAPTED from ZINEOS's `usePointerDrag`
 * (which was coupled to the scene store). No react-rnd / interact.js / moveable.
 *
 * Attach the returned handler to a drag handle (e.g. a window title bar). During
 * the gesture the position is written DIRECTLY to the moved element's `--x`/`--y`
 * custom props in requestAnimationFrame (bypassing React); the committed position
 * is reported once on pointerup via `onCommit`. Give the moved element:
 *
 *   .exhibit-window { transform: translate(var(--x, 0px), var(--y, 0px)); }
 *
 * Usage:
 *   const winRef = useRef<HTMLDivElement>(null);
 *   const onDown = useWindowDrag({
 *     targetRef: winRef,
 *     getStart: () => store.posOf(id),
 *     onStart: () => store.focus(id),
 *     onCommit: (pos) => store.move(id, pos),
 *   });
 *   return <div ref={winRef} className="exhibit-window">
 *            <div className="titlebar" onPointerDown={onDown}>…</div>
 *          </div>;
 */

interface Point {
  x: number;
  y: number;
}

interface WindowDragOptions {
  /** The element to move. Defaults to the drag handle (event.currentTarget). */
  targetRef?: RefObject<HTMLElement | null>;
  /** Committed position at gesture start (window coords). */
  getStart: () => Point;
  /** Called on pointerdown — e.g. raise/focus the window. */
  onStart?: () => void;
  /** Called once on release with the final position (only if it actually moved). */
  onCommit: (pos: Point) => void;
}

interface DragState {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  curX: number;
  curY: number;
  rafId: number | null;
  handle: HTMLElement; // captures the pointer / fires events
  el: HTMLElement; // the moved element
  moved: boolean;
  onMove: (e: PointerEvent) => void;
  onUp: (e: PointerEvent) => void;
}

const MOVE_EPSILON = 0.5; // px; below this a gesture is a click, not a drag

export function useWindowDrag(opts: WindowDragOptions) {
  const { targetRef, getStart, onStart, onCommit } = opts;
  const drag = useRef<DragState | null>(null);

  const flush = useCallback(() => {
    const d = drag.current;
    if (!d) return;
    d.el.style.setProperty("--x", `${d.curX}px`);
    d.el.style.setProperty("--y", `${d.curY}px`);
    d.rafId = null;
  }, []);

  const teardown = useCallback(() => {
    const d = drag.current;
    if (!d) return;
    window.removeEventListener("pointermove", d.onMove);
    window.removeEventListener("pointerup", d.onUp);
    window.removeEventListener("pointercancel", d.onUp);
    if (d.rafId !== null) cancelAnimationFrame(d.rafId);
    d.el.style.willChange = "auto";
    try {
      d.handle.releasePointerCapture(d.pointerId);
    } catch {
      // capture may already be released (pointercancel) — ignore
    }
  }, []);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (e.button !== 0) return; // primary button only
      const handle = e.currentTarget;
      const el = targetRef?.current ?? handle;
      const start = getStart();
      onStart?.();

      const onMove = (ev: PointerEvent) => {
        const d = drag.current;
        if (!d || ev.pointerId !== d.pointerId) return;
        const dx = ev.clientX - d.startClientX;
        const dy = ev.clientY - d.startClientY;
        d.curX = d.startX + dx;
        d.curY = d.startY + dy;
        if (Math.abs(dx) > MOVE_EPSILON || Math.abs(dy) > MOVE_EPSILON) {
          d.moved = true;
        }
        // Coalesce multiple moves into one paint per frame.
        if (d.rafId === null) d.rafId = requestAnimationFrame(flush);
      };

      const onUp = (ev: PointerEvent) => {
        const d = drag.current;
        if (!d || ev.pointerId !== d.pointerId) return;
        const { curX, curY, moved } = d;
        teardown();
        drag.current = null;
        // Commit once, on release — never per frame.
        if (moved) onCommit({ x: curX, y: curY });
      };

      try {
        handle.setPointerCapture(e.pointerId);
      } catch {
        // happy-dom / unsupported — drag still works via window listeners
      }
      el.style.willChange = "transform";

      drag.current = {
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        startX: start.x,
        startY: start.y,
        curX: start.x,
        curY: start.y,
        rafId: null,
        handle,
        el,
        moved: false,
        onMove,
        onUp,
      };

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [targetRef, getStart, onStart, onCommit, flush, teardown],
  );

  // Tear down a gesture in flight if the element unmounts mid-drag.
  useEffect(() => {
    return () => {
      if (drag.current) {
        teardown();
        drag.current = null;
      }
    };
  }, [teardown]);

  return onPointerDown;
}
