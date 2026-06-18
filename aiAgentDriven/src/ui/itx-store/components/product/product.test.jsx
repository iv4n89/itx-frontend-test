import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Product } from "./product";

const product = {
  id: "1",
  brand: "Apple",
  model: "iPhone 14",
  price: "999",
  options: {
    colors: [{ code: 1, name: "Black" }, { code: 2, name: "White" }],
    storages: [{ code: 10, name: "128GB" }],
  },
};

describe("Product", () => {
  it("renders the product specs", () => {
    // given / when
    render(
      <Product
        product={product}
        selectedColor={1} selectedStorage={10}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
  });

  it("renders the color and storage selectors", () => {
    // given / when
    render(
      <Product
        product={product}
        selectedColor={null} selectedStorage={null}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("Black")).toBeInTheDocument();
    expect(screen.getByText("White")).toBeInTheDocument();
    expect(screen.getByText("128GB")).toBeInTheDocument();
  });

  it("renders the add to cart button", () => {
    // given / when
    render(
      <Product
        product={product}
        selectedColor={1} selectedStorage={10}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    );

    // then
    expect(screen.getByText("Añadir al carrito")).toBeInTheDocument();
  });
});
