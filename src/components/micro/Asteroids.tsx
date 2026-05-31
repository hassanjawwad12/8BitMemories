/** Asteroids — a vector ship rotates; a rock drifts across and splits in two. */
export function Asteroids() {
  return (
    <div className="micro micro--asteroids" aria-hidden="true">
      <span className="as-ship" />
      <span className="as-rock" />
      <span className="as-frag as-frag--a" />
      <span className="as-frag as-frag--b" />
    </div>
  );
}
