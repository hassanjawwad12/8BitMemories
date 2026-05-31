/** Snake — a segmented body crawls the rectangular frame; the apple blinks. */
export function Snake() {
  return (
    <div className="micro micro--snake" aria-hidden="true">
      <span className="s-apple" />
      <span className="s-seg" />
      <span className="s-seg" />
      <span className="s-seg" />
      <span className="s-seg" />
      <span className="s-seg" />
      <span className="s-seg" />
    </div>
  );
}
