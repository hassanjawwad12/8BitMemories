import type { ComponentType } from "react";

import type { MicroAnimId } from "@/data/schema";

import { Asteroids } from "./Asteroids";
import { Attract } from "./Attract";
import { DoomFace } from "./DoomFace";
import { Frogger } from "./Frogger";
import { Invaders } from "./Invaders";
import { MarioCoin } from "./MarioCoin";
import { MegaMan } from "./MegaMan";
import { Minesweeper } from "./Minesweeper";
import { Pacman } from "./Pacman";
import { Pong } from "./Pong";
import { Snake } from "./Snake";
import { SonicRing } from "./SonicRing";
import { StreetFighter } from "./StreetFighter";
import { Tetris } from "./Tetris";
import { Zelda } from "./Zelda";

/**
 * The micro-animation registry — maps a `MicroAnimId` from the manifest to its
 * tiny hand-built CSS component. The `Record<MicroAnimId, …>` type guarantees at
 * compile time that every id in the schema has a component (and vice-versa), so
 * the manifest and the engine can never drift apart. `_attract` is the generic
 * fallback for exhibits without bespoke motion.
 */
export const MICRO_REGISTRY: Readonly<Record<MicroAnimId, ComponentType>> = {
  pong: Pong,
  invaders: Invaders,
  pacman: Pacman,
  tetris: Tetris,
  snake: Snake,
  "mario-coin": MarioCoin,
  "sonic-ring": SonicRing,
  asteroids: Asteroids,
  "doom-face": DoomFace,
  minesweeper: Minesweeper,
  frogger: Frogger,
  zelda: Zelda,
  "mega-man": MegaMan,
  "street-fighter": StreetFighter,
  _attract: Attract,
};

/** Resolve a micro-animation component by id (falls back to the attract loop). */
export function getMicroAnim(id: MicroAnimId): ComponentType {
  return MICRO_REGISTRY[id] ?? Attract;
}
