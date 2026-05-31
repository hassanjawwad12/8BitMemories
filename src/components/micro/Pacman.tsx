/** Pac-Man — chomps across a dot row (clip-path mouth + translate); a ghost trails. */
export function Pacman() {
  return (
    <div className="micro micro--pacman" aria-hidden="true">
      <span className="pac-dots" />
      <span className="pac-ghost" />
      <span className="pac" />
    </div>
  );
}
