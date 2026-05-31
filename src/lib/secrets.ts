/**
 * The six hidden secrets ("SECRETS x/6", the band5051 nod). Each is granted once
 * per session. Some are wired in the store (deterministic, testable), some from
 * components (Konami code, clicking the pixel heart, idling into attract mode).
 */
export const SECRET_IDS = [
  "konami", // enter the Konami code
  "heart", // click the pixel heart in the menu bar
  "explorer", // visit all three wings
  "collector", // open five different exhibits
  "toaster", // open the Flying Toasters exhibit
  "night-owl", // let the museum drift into attract mode
] as const;

export type SecretId = (typeof SECRET_IDS)[number];

export const SECRET_COUNT = SECRET_IDS.length;

/** Human-readable reveal text, announced + flashed when a secret is found. */
export const SECRET_LABELS: Readonly<Record<SecretId, string>> = {
  konami: "KONAMI CODE — 30 lives granted",
  heart: "MADE WITH LOVE",
  explorer: "FLOOR PLAN COMPLETE — all wings visited",
  collector: "CURATOR — five exhibits opened",
  toaster: "FLYING TOASTERS — they're coming for your screen",
  "night-owl": "ATTRACT MODE — the museum dreams when you rest",
};

/** The canonical Konami sequence (KeyboardEvent.key values). */
export const KONAMI_SEQUENCE: readonly string[] = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
