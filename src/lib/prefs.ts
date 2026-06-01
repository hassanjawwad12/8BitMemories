/**
 * Tiny localStorage helpers for the two durable preferences (sound + attract).
 * All access is guarded for SSR and wrapped in try/catch — a blocked or full
 * storage must never break the museum. The visit counter manages its own key
 * (see VisitCounter).
 */
const SOUND_KEY = "8bm-sound";
const ATTRACT_KEY = "8bm-attract";

function readBool(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : raw === "1";
  } catch {
    return fallback;
  }
}

function writeBool(key: string, value: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // storage unavailable (private mode / quota) — preference is best-effort.
  }
}

export const prefs = {
  getSound: () => readBool(SOUND_KEY, true),
  setSound: (on: boolean) => writeBool(SOUND_KEY, on),
  getAttract: () => readBool(ATTRACT_KEY, false),
  setAttract: (on: boolean) => writeBool(ATTRACT_KEY, on),
};
