"use client";

import "./boot.css";

import { useEffect, useState } from "react";

/**
 * The boot sequence — the money-shot first impression (reused from ZINEOS,
 * reskinned for 8BitMemories). Shows once per tab session (so reloads don't nag),
 * is click/key-skippable, and is fully bypassed under reduced motion. The mount
 * decision reads sessionStorage + matchMedia, which only exist on the client, so
 * the server always renders nothing.
 *
 * Customize via props: copy + storage key are not hardcoded.
 */

const BOOT_DURATION_MS = 3200; // matches the CSS sequence + fade-out
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const DEFAULT_POST_LINES = [
  "8BITMEMORIES BIOS v8.16.93  — (C) HAUNTED SYSTEMS",
  "Memory test ............ 640K OK",
  "Detecting CRT phosphor ......... WARM",
  "Mounting /dev/roms .............. OK",
  "Loading exhibit manager ......... OK",
];

type Phase = "pending" | "showing" | "done";

interface BootScreenProps {
  logo?: string;
  tagline?: string;
  postLines?: readonly string[];
  sessionKey?: string;
}

export function BootScreen({
  logo = "8BitMemories",
  tagline = "the games we grew up on",
  postLines = DEFAULT_POST_LINES,
  sessionKey = "8bitmemories-booted",
}: BootScreenProps) {
  const [phase, setPhase] = useState<Phase>("pending");

  useEffect(() => {
    const booted = sessionStorage.getItem(sessionKey) === "1";
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    sessionStorage.setItem(sessionKey, "1");

    if (booted || reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only first-paint decision
      setPhase("done");
      return;
    }
    setPhase("showing");
    const timer = setTimeout(() => setPhase("done"), BOOT_DURATION_MS);
    return () => clearTimeout(timer);
  }, [sessionKey]);

  if (phase !== "showing") return null;

  return (
    <div
      className="boot"
      role="status"
      aria-label={`Booting ${logo}`}
      onClick={() => setPhase("done")}
      onKeyDown={() => setPhase("done")}
      tabIndex={-1}
    >
      <div className="boot-inner">
        <pre className="boot-post">{postLines.join("\n")}</pre>
        <h1 className="boot-logo holo-text">{logo}</h1>
        <p className="boot-tag">{tagline}</p>
        <div className="boot-bar" aria-hidden="true">
          <span />
        </div>
        <p className="boot-hint">click to enter</p>
      </div>
    </div>
  );
}
