"use client";

import "./gallery.css";

import { MICRO_REGISTRY } from "./registry";
import type { MicroAnimId } from "@/data/schema";

/**
 * TEMPORARY (Phase 2) — a contact sheet of every registered micro-animation so
 * the engine can be eyeballed in the browser. Phase 3 replaces this with the
 * real manifest-driven Lobby of cabinet tiles. The registry order is preserved.
 */
const IDS = Object.keys(MICRO_REGISTRY) as MicroAnimId[];

export function MicroGallery() {
  return (
    <section className="gallery" aria-label="Micro-animation contact sheet">
      {IDS.map((id) => {
        const Anim = MICRO_REGISTRY[id];
        return (
          <figure key={id} className="gallery-cell">
            <div className="gallery-stage">
              <Anim />
            </div>
            <figcaption>{id}</figcaption>
          </figure>
        );
      })}
    </section>
  );
}
