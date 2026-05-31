/** Pong — the ball bounces between two tracking paddles. Pure transform. */
export function Pong() {
  return (
    <div className="micro micro--pong" aria-hidden="true">
      <span className="pong-net" />
      <span className="pong-paddle pong-paddle--l" />
      <span className="pong-paddle pong-paddle--r" />
      <span className="pong-ball" />
    </div>
  );
}
