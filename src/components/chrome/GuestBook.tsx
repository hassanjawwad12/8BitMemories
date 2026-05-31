"use client";

import { ModalWindow } from "@/components/chrome/ModalWindow";
import { GUEST_ENTRIES } from "@/data/guestbook";

/**
 * The Guest Book — pre-seeded, read-only entries. No submission form by design
 * (preserves the view-only promise; removes the only input/XSS/CSRF vector). All
 * content is static text from the manifest, rendered as text.
 */
export function GuestBook({ onClose }: { onClose: () => void }) {
  return (
    <ModalWindow title="Guest Book" onClose={onClose} className="modal-guestbook">
      <p className="guestbook-intro">
        <span className="guestbook-heart" aria-hidden="true" /> Sign-ins are closed
        (it&apos;s a museum), but here&apos;s who dropped by:
      </p>
      <ul className="guestbook-list">
        {GUEST_ENTRIES.map((entry) => (
          <li key={`${entry.name}-${entry.date}`} className="guestbook-entry">
            <div className="guestbook-meta">
              <span className="guestbook-name">{entry.name}</span>
              <time className="guestbook-date">{entry.date}</time>
            </div>
            <p className="guestbook-msg">{entry.message}</p>
          </li>
        ))}
      </ul>
    </ModalWindow>
  );
}
