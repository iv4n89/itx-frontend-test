import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import { DetailsLayout } from "./details-layout";

const product = {
  id: "1",
  brand: "Apple",
  model: "iPhone 15",
  price: "999",
  imgUrl: "https://example.com/phone.jpg",
  colors: ["black", "white"],
  internalMemory: ["128GB", "256GB"],
};

const renderLayout = (props) =>
  render(
    <CartProvider>
      <DetailsLayout {...props} />
    </CartProvider>,
  );

describe("DetailsLayout", () => {
  it("shows skeleton placeholders while loading", () => {
    // given ~ product data is still being fetched
    // when
    const { container } = renderLayout({ isLoading: true });
    // then
    expect(container.querySelectorAll(".skeleton").length).toBeGreaterThan(0);
  });

  it("renders the product image when not loading", () => {
    // given ~ product data is available
    // when
    renderLayout({ product, isLoading: false });
    // then
    expect(screen.getByAltText("Apple iPhone 15")).toBeInTheDocument();
  });

  it("renders the product brand and model when not loading", () => {
    // given ~ product data is available
    // when
    renderLayout({ product, isLoading: false });
    // then
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
  });
});
