"use client";

import { useEffect, useState } from "react";

/**
 * The VISITS odometer (the studiodunbar nod). Increments once per browser session
 * (sessionStorage guard) and persists the running total in localStorage. Renders
 * a zero-padded 7-digit count; until the client effect runs it shows zeros, so
 * server and client first paint agree (no hydration mismatch).
 */
const TOTAL_KEY = "8bm-visits";
const SESSION_KEY = "8bm-counted";
const PAD = 7;

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const prev = Number.parseInt(localStorage.getItem(TOTAL_KEY) ?? "0", 10) || 0;
      let next = prev;
      if (!sessionStorage.getItem(SESSION_KEY)) {
        next = prev + 1;
        localStorage.setItem(TOTAL_KEY, String(next));
        sessionStorage.setItem(SESSION_KEY, "1");
      }
      setCount(next);
    } catch {
      setCount(1);
    }
  }, []);

  const display = (count ?? 0).toString().padStart(PAD, "0");

  return (
    <span className="visits" title="Visits to the museum">
      <span className="visits-label">VISITS</span>
      <span className="visits-num" aria-label={`${count ?? 0} visits`}>
        {display}
      </span>
    </span>
  );
}
