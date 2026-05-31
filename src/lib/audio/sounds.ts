/**
 * Synthesized 8-bit UI sounds (reused from ZINEOS + museum additions) — pure
 * parameter specs, no Web Audio here so they can be unit-tested. The engine turns
 * each spec into an oscillator + gain envelope. All frequencies/gains are > 0 so
 * exponential ramps stay valid.
 */

export type SoundName =
  | "click"
  | "stamp"
  | "trash"
  | "snap"
  | "coin"
  | "power"
  | "flip";

export interface SoundSpec {
  readonly type: OscillatorType;
  readonly freqStart: number; // Hz
  readonly freqEnd: number; // Hz (pitch sweep target)
  readonly duration: number; // seconds
  readonly gain: number; // peak amplitude (0–1)
}

export const SOUND_SPECS: Record<SoundName, SoundSpec> = {
  // Soft tactile tick for chrome buttons.
  click: {
    type: "square",
    freqStart: 880,
    freqEnd: 640,
    duration: 0.05,
    gain: 0.04,
  },
  // Punchy "stamp" when an exhibit window lands open.
  stamp: {
    type: "triangle",
    freqStart: 320,
    freqEnd: 90,
    duration: 0.12,
    gain: 0.09,
  },
  // Descending sweep on close/dismiss.
  trash: {
    type: "sawtooth",
    freqStart: 360,
    freqEnd: 70,
    duration: 0.18,
    gain: 0.06,
  },
  // Tiny high blip for a snap/select.
  snap: {
    type: "square",
    freqStart: 1320,
    freqEnd: 1320,
    duration: 0.03,
    gain: 0.05,
  },
  // Rising "coin" blip (the Mario-grab nod) — INSERT COIN / reward.
  coin: {
    type: "square",
    freqStart: 988,
    freqEnd: 1319,
    duration: 0.12,
    gain: 0.06,
  },
  // CRT power-on whoosh — pair with the .crt-power-on flash on exhibit open.
  power: {
    type: "triangle",
    freqStart: 120,
    freqEnd: 900,
    duration: 0.25,
    gain: 0.05,
  },
  // Crisp page/tile flip for wing switches.
  flip: {
    type: "square",
    freqStart: 1200,
    freqEnd: 700,
    duration: 0.04,
    gain: 0.04,
  },
};
