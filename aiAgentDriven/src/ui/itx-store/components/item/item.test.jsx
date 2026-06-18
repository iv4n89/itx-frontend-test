import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Item } from "./item";

const product = {
  id: "ABC123",
  brand: "Apple",
  model: "iPhone 14",
  price: "999",
  imgUrl: "https://example.com/image.jpg",
};

describe("Item", () => {
  it("renders the product image", () => {
    // given / when
    render(<MemoryRouter><Item {...product} /></MemoryRouter>);

    // then
    expect(screen.getByRole("img")).toHaveAttribute("src", product.imgUrl);
  });

  it("renders the brand", () => {
    // given / when
    render(<MemoryRouter><Item {...product} /></MemoryRouter>);

    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("renders the model", () => {
    // given / when
    render(<MemoryRouter><Item {...product} /></MemoryRouter>);

    // then
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
  });

  it("renders the price", () => {
    // given / when
    render(<MemoryRouter><Item {...product} /></MemoryRouter>);

    // then
    expect(screen.getByText("999")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    // given / when
    render(<MemoryRouter><Item {...product} /></MemoryRouter>);

    // then
    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/ABC123");
  });
});
