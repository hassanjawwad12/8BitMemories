/** Minesweeper — tiles flip open in sequence while the smiley cycles its mood. */
export function Minesweeper() {
  return (
    <div className="micro micro--minesweeper" aria-hidden="true">
      <span className="ms-smiley" />
      <div className="ms-grid">
        <span className="ms-tile" />
        <span className="ms-tile" />
        <span className="ms-tile" />
        <span className="ms-tile" />
        <span className="ms-tile" />
        <span className="ms-tile" />
        <span className="ms-tile" />
        <span className="ms-tile" />
        <span className="ms-tile" />
      </div>
    </div>
  );
}
