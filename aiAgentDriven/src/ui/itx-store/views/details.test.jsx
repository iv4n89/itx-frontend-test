import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import { DetailsView } from "./details";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  addToCart: vi.fn(),
}));

vi.mock("@/ui/itx-store/hooks/use-product-details/use-product-details", () => ({
  useProductDetails: vi.fn(),
}));

import { useProductDetails } from "@/ui/itx-store/hooks/use-product-details/use-product-details";

const product = {
  id: "ABC123",
  brand: "Apple",
  model: "iPhone 14",
  price: "999",
  imgUrl: "https://example.com/img.jpg",
  options: {
    colors: [{ code: 1, name: "Black" }],
    storages: [{ code: 10, name: "128GB" }],
  },
};

function renderDetails() {
  return render(
    <CartProvider>
      <MemoryRouter initialEntries={["/product/ABC123"]}>
        <Routes>
          <Route path="/product/:id" element={<DetailsView />} />
        </Routes>
      </MemoryRouter>
    </CartProvider>
  );
}

describe("DetailsView", () => {
  it("renders nothing while loading", () => {
    // given
    useProductDetails.mockReturnValue({ product: undefined, isLoading: true });

    // when
    const { container } = renderDetails();

    // then
    expect(container.firstChild).toBeNull();
  });

  it("renders the product details when loaded", () => {
    // given
    useProductDetails.mockReturnValue({ product, isLoading: false });

    // when
    renderDetails();

    // then
    expect(screen.getByText("iPhone 14")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", product.imgUrl);
  });

  it("renders the back link", () => {
    // given
    useProductDetails.mockReturnValue({ product, isLoading: false });

    // when
    renderDetails();

    // then
    expect(screen.getByRole("link", { name: /volver al listado/i })).toBeInTheDocument();
  });

  it("updates the document title with the product name", () => {
    // given
    useProductDetails.mockReturnValue({ product, isLoading: false });

    // when
    renderDetails();

    // then
    expect(document.title).toBe("Apple iPhone 14");
  });
});
