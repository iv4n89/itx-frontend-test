import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ItemsGrid } from "./items-grid";

const products = [
  { id: "1", brand: "Apple", model: "iPhone 14", price: "999", imgUrl: "" },
  { id: "2", brand: "Samsung", model: "Galaxy S22", price: "799", imgUrl: "" },
];

describe("ItemsGrid", () => {
  it("renders one item per product", () => {
    // given / when
    render(<MemoryRouter><ItemsGrid products={products} isLoading={false} /></MemoryRouter>);

    // then
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("renders skeleton placeholders while loading", () => {
    // given / when
    const { container } = render(
      <MemoryRouter><ItemsGrid products={[]} isLoading={true} /></MemoryRouter>
    );

    // then
    expect(container.querySelectorAll(".skeleton")).toHaveLength(8);
  });

  it("renders no items when the product list is empty and not loading", () => {
    // given / when
    render(<MemoryRouter><ItemsGrid products={[]} isLoading={false} /></MemoryRouter>);

    // then
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
