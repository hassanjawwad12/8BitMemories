import type { GameExhibit } from "@/data/schema";

/**
 * The museum placard — the read-only info card beside each exhibit's screen:
 * title/year, ★ rating, blurb, the developer/platform/genre line, "did you
 * know" facts, and a fake spec-sheet (the Dunbar ratings-window nod). All text,
 * no dangerouslySetInnerHTML — the manifest is the trusted, static source.
 */
function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="placard-stars" aria-label={`Rated ${full} out of 5`}>
      <span aria-hidden="true">{"★".repeat(full)}</span>
      <span aria-hidden="true" className="placard-stars-empty">
        {"★".repeat(5 - full)}
      </span>
    </span>
  );
}

export function Placard({ exhibit }: { exhibit: GameExhibit }) {
  return (
    <div className="placard">
      <header className="placard-head">
        <h3 className="placard-title">
          {exhibit.title} <span className="placard-year">{exhibit.year}</span>
        </h3>
        {exhibit.rating !== undefined && <Stars rating={exhibit.rating} />}
      </header>

      <p className="placard-blurb">{exhibit.blurb}</p>

      <dl className="placard-meta">
        <div>
          <dt>Developer</dt>
          <dd>{exhibit.developer}</dd>
        </div>
        <div>
          <dt>Platform</dt>
          <dd>{exhibit.platform}</dd>
        </div>
        <div>
          <dt>Genre</dt>
          <dd>{exhibit.genre}</dd>
        </div>
      </dl>

      <div className="placard-facts">
        <h4>Did you know</h4>
        <ul>
          {exhibit.facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>

      {exhibit.specs && exhibit.specs.length > 0 && (
        <dl className="placard-specs">
          {exhibit.specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
