"use client";

/**
 * Fixed, non-interactive CRT atmosphere (reused from ZINEOS): scanlines + grain
 * + vignette, with a faint flicker (disabled under reduced motion via CSS).
 * Capped opacity keeps it as texture, not interference. Requires atmosphere.css.
 */
export function CRTOverlay() {
  return (
    <div className="crt" aria-hidden="true">
      <div className="crt-scanlines" />
      <div className="crt-grain" />
      <div className="crt-vignette" />
    </div>
  );
}
