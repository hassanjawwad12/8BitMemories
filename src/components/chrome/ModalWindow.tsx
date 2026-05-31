"use client";

import { useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";

import { useFocusTrap } from "@/hooks/useFocusTrap";

/**
 * A centered, focus-trapped OS dialog used for the Guest Book and About windows.
 * Reuses the .win-titlebar/.win-close chrome from window.css. Closes on Esc or a
 * scrim click. Not draggable — these are read-only info panels, not exhibits.
 */
interface ModalWindowProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function ModalWindow({ title, onClose, children, className }: ModalWindowProps) {
  const ref = useRef<HTMLElement>(null);
  useFocusTrap(ref, true);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="modal-scrim"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        ref={ref}
        className={`modal-window${className ? ` ${className}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onKeyDown={onKeyDown}
      >
        <header className="win-titlebar">
          <h2 className="win-title">{title}</h2>
          <button
            type="button"
            className="win-close"
            onClick={onClose}
            aria-label={`Close ${title}`}
          >
            ×
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
}
