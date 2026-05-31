import { getMicroAnim } from "@/components/micro/registry";
import type { GameExhibit } from "@/data/schema";

/**
 * The exhibit "screen" inside its CRT bezel. The signature move: instead of a
 * fetched GIF, it renders the game's LIVE micro-animation, scaled up to fill the
 * screen (the manifest's optional `media` can override this later with a local
 * loop). A one-shot `.crt-power-on` flash plays on mount (gated by reduced motion
 * in atmosphere.css). The animation is decorative (aria-hidden inside the
 * component); the screen carries an accessible label from the placard.
 */
export function GifScreen({ exhibit }: { exhibit: GameExhibit }) {
  const Anim = getMicroAnim(exhibit.micro);
  return (
    <div className="crt-screen" role="img" aria-label={`${exhibit.title} — gameplay`}>
      <div className="crt-screen-inner crt-power-on">
        <Anim />
      </div>
      <div className="crt-screen-glare" aria-hidden="true" />
    </div>
  );
}
