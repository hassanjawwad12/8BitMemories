"use client";

import { ModalWindow } from "@/components/chrome/ModalWindow";
import { EXHIBITS } from "@/data/exhibits";
import { WINGS } from "@/data/wings";

/**
 * About / colophon — the honest framing: a personal, educational showcase built
 * with no animation or UI libraries, all media local. Also notes the copyright /
 * fair-use stance for the game footage and facts.
 */
export function About({ onClose }: { onClose: () => void }) {
  return (
    <ModalWindow title="About — 8BitMemories" onClose={onClose} className="modal-about">
      <h3 className="about-logo brand-name">8BitMemories</h3>
      <p className="about-tag">the games we grew up on</p>

      <p>
        A <strong>view-only</strong> museum of the retro-gaming world that boots like
        a haunted OS. Browse {EXHIBITS.length} exhibits across {WINGS.length} wings —
        each with a placard and a <strong>live, game-specific micro-animation</strong>{" "}
        built from raw CSS (no GIF, no animation library).
      </p>

      <dl className="about-specs">
        <div>
          <dt>Built with</dt>
          <dd>Next.js · React · TypeScript · Zustand · zod</dd>
        </div>
        <div>
          <dt>Animation</dt>
          <dd>Hand-written CSS — transform / opacity / clip-path only</dd>
        </div>
        <div>
          <dt>Media</dt>
          <dd>100% local, no fetch, no API keys, no tracking</dd>
        </div>
      </dl>

      <p className="about-note">
        Game titles, footage references, and facts are the property of their
        respective owners. This is a non-commercial, educational fan showcase; loops
        are short and editorial, and credit is given where known.
      </p>
    </ModalWindow>
  );
}
