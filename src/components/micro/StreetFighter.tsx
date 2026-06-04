/** Street Fighter II — two pixel fighters trade blows, each landing a hit and recoiling. */
export function StreetFighter() {
  return (
    <div className="micro micro--street-fighter" aria-hidden="true">
      <span className="sf-fighter sf-fighter--p1" />
      <span className="sf-fighter sf-fighter--p2" />
      <span className="sf-hit" />
    </div>
  );
}
