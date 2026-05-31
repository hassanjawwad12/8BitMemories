/** Tetris — a tetromino (4 box-shadow cells) falls in steps and locks, then resets. */
export function Tetris() {
  return (
    <div className="micro micro--tetris" aria-hidden="true">
      <span className="t-floor" />
      <span className="t-piece" />
    </div>
  );
}
