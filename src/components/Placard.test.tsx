import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Placard } from "@/components/Placard";
import { EXHIBIT_BY_SLUG } from "@/data/exhibits";

const pong = EXHIBIT_BY_SLUG.get("pong")!;

describe("Placard", () => {
  it("renders the title and year", () => {
    render(<Placard exhibit={pong} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Pong");
    expect(screen.getByText(String(pong.year))).toBeInTheDocument();
  });

  it("renders every fact", () => {
    render(<Placard exhibit={pong} />);
    const facts = screen.getByRole("list");
    expect(within(facts).getAllByRole("listitem")).toHaveLength(pong.facts.length);
  });

  it("renders the developer/platform/genre metadata", () => {
    render(<Placard exhibit={pong} />);
    expect(screen.getByText(pong.developer)).toBeInTheDocument();
    expect(screen.getByText(pong.genre)).toBeInTheDocument();
  });

  it("exposes the rating to assistive tech", () => {
    render(<Placard exhibit={pong} />);
    expect(
      screen.getByLabelText(`Rated ${pong.rating} out of 5`),
    ).toBeInTheDocument();
  });
});
