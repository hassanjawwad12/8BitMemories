/** Zelda — the Triforce assembles, each triangle glinting in sequence + a sparkle. */
export function Zelda() {
  return (
    <div className="micro micro--zelda" aria-hidden="true">
      <span className="zl-force">
        <span className="zl-tri zl-tri--top" />
        <span className="zl-tri zl-tri--left" />
        <span className="zl-tri zl-tri--right" />
      </span>
      <span className="zl-spark" />
    </div>
  );
}
