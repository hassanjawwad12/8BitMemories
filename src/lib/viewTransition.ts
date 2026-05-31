import { flushSync } from "react-dom";

/**
 * Run a React state update inside a native View Transition (0 bundle,
 * progressively enhanced). `flushSync` forces React to commit synchronously so
 * the browser captures the "after" snapshot. Falls back to a plain update when
 * the API is missing or the user prefers reduced motion. An optional `kind` tags
 * <html> so CSS can theme that specific transition (e.g. the wing channel-wipe).
 */
type StartViewTransition = (callback: () => void) => unknown;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function runTransition(update: () => void, kind?: string): void {
  const doc = typeof document !== "undefined" ? document : null;
  const start = (doc as unknown as { startViewTransition?: StartViewTransition })
    ?.startViewTransition;

  if (!doc || typeof start !== "function" || prefersReducedMotion()) {
    update();
    return;
  }

  if (kind) doc.documentElement.dataset.transition = kind;
  const transition = start.call(doc, () => flushSync(update)) as {
    finished?: Promise<unknown>;
  };
  transition.finished?.finally(() => {
    if (kind) delete doc.documentElement.dataset.transition;
  });
}
