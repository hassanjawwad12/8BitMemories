/** Frogger — a frog hops lane-to-lane in steps while two logs scroll past. */
export function Frogger() {
  return (
    <div className="micro micro--frogger" aria-hidden="true">
      <span className="fr-log fr-log--a" />
      <span className="fr-log fr-log--b" />
      <span className="fr-frog" />
    </div>
  );
}
