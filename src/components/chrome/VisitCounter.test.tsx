import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VisitCounter } from "@/components/chrome/VisitCounter";

describe("VisitCounter", () => {
  it("increments the persisted total once and renders it zero-padded", async () => {
    render(<VisitCounter />);
    await waitFor(() =>
      expect(window.localStorage.getItem("8bm-visits")).toBe("1"),
    );
    expect(await screen.findByText("0000001")).toBeInTheDocument();
  });

  it("does not double-count within the same browser session", async () => {
    const first = render(<VisitCounter />);
    await waitFor(() =>
      expect(window.localStorage.getItem("8bm-visits")).toBe("1"),
    );
    first.unmount();

    render(<VisitCounter />);
    // The session guard means a second mount must NOT bump the total.
    await waitFor(() =>
      expect(window.localStorage.getItem("8bm-visits")).toBe("1"),
    );
  });
});
