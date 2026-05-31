/** DOOM HUD face — eyes dart, the mouth cycles idle → hurt → grin, damage flashes red. */
export function DoomFace() {
  return (
    <div className="micro micro--doom-face" aria-hidden="true">
      <span className="df-face">
        <span className="df-eyes" />
        <span className="df-mouth" />
        <span className="df-hurt" />
      </span>
    </div>
  );
}
