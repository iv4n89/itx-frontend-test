import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { DetailsLayout } from "./details-layout";

const product = {
  id: "1",
  brand: "Apple",
  model: "iPhone 14",
  price: "999",
  imgUrl: "https://example.com/img.jpg",
  options: {
    colors: [{ code: 1, name: "Black" }],
    storages: [{ code: 10, name: "128GB" }],
  },
};

function renderLayout() {
  return render(
    <MemoryRouter>
      <DetailsLayout
        product={product}
        selectedColor={1} selectedStorage={10}
        onColorSelect={() => {}} onStorageSelect={() => {}} onAddToCart={() => {}}
      />
    </MemoryRouter>
  );
}

describe("DetailsLayout", () => {
  it("renders the product image", () => {
    // given / when
    renderLayout();

    // then
    expect(screen.getByRole("img")).toHaveAttribute("src", product.imgUrl);
  });

  it("renders a link back to the product list", () => {
    // given / when
    renderLayout();

    // then
    expect(screen.getByRole("link", { name: /volver al listado/i })).toHaveAttribute("href", "/");
  });

  it("renders the product specs", () => {
    // given / when
    renderLayout();

    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
  });

  it("renders the color and storage selectors", () => {
    // given / when
    renderLayout();

    // then
    expect(screen.getByText("Black")).toBeInTheDocument();
    expect(screen.getByText("128GB")).toBeInTheDocument();
  });
});
