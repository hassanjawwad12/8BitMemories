import { z } from "zod";

/**
 * The museum's contract. Every exhibit, wing, and micro-animation id is described
 * here as a zod schema; the typed manifest in `exhibits.ts` is validated against
 * it at module load in development (see `validateExhibits`). Types are inferred
 * from the schemas so there is exactly one source of truth.
 */

/* === Wings ================================================================= */

export const WING_IDS = ["coin-op", "living-room", "terminal"] as const;
export const wingIdSchema = z.enum(WING_IDS);
export type WingId = (typeof WING_IDS)[number];

/* === Micro-animations ====================================================== */
/* Must stay in sync with the registry in components/micro/registry.ts.        */

export const MICRO_ANIM_IDS = [
  "pong",
  "invaders",
  "pacman",
  "tetris",
  "snake",
  "mario-coin",
  "sonic-ring",
  "asteroids",
  "doom-face",
  "minesweeper",
  "frogger",
  "zelda",
  "mega-man",
  "street-fighter",
  "_attract",
] as const;
export const microAnimIdSchema = z.enum(MICRO_ANIM_IDS);
export type MicroAnimId = (typeof MICRO_ANIM_IDS)[number];

/* === Exhibit ============================================================== */

/**
 * Optional looping media. The signature exhibit "screen" renders the LIVE
 * micro-animation (not a fetched GIF), so media is optional — a manifest entry
 * can opt into a local /public loop later without any component change. When
 * present, dims are explicit so there is no CLS.
 */
export const mediaSchema = z
  .object({
    src: z.string().min(1),
    poster: z.string().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })
  .readonly();

export const specSchema = z
  .object({
    label: z.string().min(1),
    value: z.string().min(1),
  })
  .readonly();

export const exhibitSchema = z
  .object({
    /** url + asset key; lowercase kebab so it is filesystem- and route-safe. */
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
    title: z.string().min(1),
    year: z.number().int().min(1958).max(2005),
    developer: z.string().min(1),
    platform: z.string().min(1),
    genre: z.string().min(1),
    wing: wingIdSchema,
    media: mediaSchema.optional(),
    blurb: z.string().min(1),
    facts: z.array(z.string().min(1)).min(1),
    specs: z.array(specSchema).optional(),
    rating: z.number().min(1).max(5).optional(),
    micro: microAnimIdSchema,
  })
  .readonly();

export type GameExhibit = z.infer<typeof exhibitSchema>;

export const exhibitsSchema = z.array(exhibitSchema);

/**
 * Parse + integrity-check the manifest. Beyond the per-field schema this enforces
 * the cross-cutting invariant that every `slug` is unique. Returns the validated,
 * frozen list; throws (loudly, in dev) if anything is malformed.
 */
export function validateExhibits(input: unknown): readonly GameExhibit[] {
  const exhibits = exhibitsSchema.parse(input);

  const seen = new Set<string>();
  for (const exhibit of exhibits) {
    if (seen.has(exhibit.slug)) {
      throw new Error(`Duplicate exhibit slug: "${exhibit.slug}"`);
    }
    seen.add(exhibit.slug);
  }

  return exhibits;
}
