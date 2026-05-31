/** Mario coin — a ? block bumps, a coin spins up in a parabola, a sparkle pops. */
export function MarioCoin() {
  return (
    <div className="micro micro--mario-coin" aria-hidden="true">
      <span className="mc-block" />
      <span className="mc-coin" />
      <span className="mc-spark" />
    </div>
  );
}
