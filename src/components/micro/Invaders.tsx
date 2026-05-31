/** Space Invaders — a fleet shuffles L↔R and steps down; legs flip via clip-path. */
export function Invaders() {
  return (
    <div className="micro micro--invaders" aria-hidden="true">
      <div className="inv-fleet">
        <span className="invader" />
        <span className="invader" />
        <span className="invader" />
        <span className="invader" />
      </div>
      <span className="inv-base" />
      <span className="inv-shot" />
    </div>
  );
}
