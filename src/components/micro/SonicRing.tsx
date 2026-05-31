/** Sonic ring — a gold ring spins (rotateY); beside it, Sonic taps his foot. */
export function SonicRing() {
  return (
    <div className="micro micro--sonic-ring" aria-hidden="true">
      <span className="sr-ring" />
      <span className="sr-sonic">
        <span className="sr-foot" />
      </span>
    </div>
  );
}
