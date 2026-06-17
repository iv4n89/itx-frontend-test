import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Item } from "./item";

const defaultProps = {
  id: "abc123",
  imageSrc: "https://example.com/phone.jpg",
  brand: "Apple",
  model: "iPhone 15",
  price: 999,
};

const renderItem = (props = {}) =>
  render(
    <MemoryRouter>
      <Item {...defaultProps} {...props} />
    </MemoryRouter>,
  );

describe("Item", () => {
  it("renders the brand and model", () => {
    // given ~ a product with brand and model
    // when
    renderItem();
    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
  });

  it("renders the price", () => {
    // given ~ a product with a price
    // when
    renderItem({ price: 799 });
    // then
    expect(screen.getByText("799€")).toBeInTheDocument();
  });

  it("shows a dash when price is not provided", () => {
    // given ~ a product without price
    // when
    renderItem({ price: undefined });
    // then
    expect(screen.getByText("- €")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    // given ~ a product with a known id
    // when
    renderItem({ id: "abc123" });
    // then
    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/abc123");
  });
});
