/**
 * Generic fallback — a DVD-style bouncing logo over a tiny starfield, with a
 * blinking PRESS START. Used by exhibits without a bespoke micro-animation.
 */
export function Attract() {
  return (
    <div className="micro micro--attract" aria-hidden="true">
      <span className="at-star" />
      <span className="at-star" />
      <span className="at-star" />
      <span className="at-logo" />
      <span className="at-text">PRESS START</span>
    </div>
  );
}
