import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ItemsGrid } from "./items-grid";

const items = [
  { id: "1", brand: "Apple", model: "iPhone 15", imgUrl: "", price: 999 },
  { id: "2", brand: "Samsung", model: "Galaxy S24", imgUrl: "", price: 899 },
];

const renderGrid = (props) =>
  render(
    <MemoryRouter>
      <ItemsGrid {...props} />
    </MemoryRouter>,
  );

describe("ItemsGrid", () => {
  it("shows 16 skeleton placeholders while loading", () => {
    // given ~ data is still being fetched
    // when
    const { container } = renderGrid({ isLoading: true });
    // then
    expect(container.querySelectorAll(".skeleton")).toHaveLength(16);
  });

  it("renders one card per item when not loading", () => {
    // given ~ two products available
    // when
    renderGrid({ items, isLoading: false });
    // then
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("renders each item's brand", () => {
    // given ~ two products with different brands
    // when
    renderGrid({ items, isLoading: false });
    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });

  it("renders an empty grid when items is an empty array", () => {
    // given ~ no products available
    // when
    renderGrid({ items: [], isLoading: false });
    // then
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
