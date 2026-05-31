"use client";

import { useAnnouncer } from "@/store/useAnnouncer";

/**
 * Visually-hidden polite live region (reused from ZINEOS). Keying on `nth`
 * forces React to re-render (and screen readers to re-announce) even when the
 * same message repeats. Requires the `.sr-only` utility (sr-only.css).
 */
export function LiveRegion() {
  const message = useAnnouncer((s) => s.message);
  const nth = useAnnouncer((s) => s.nth);

  return (
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
      <span key={nth}>{message}</span>
    </div>
  );
}
