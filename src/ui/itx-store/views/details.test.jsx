import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryRouter, RouterProvider } from "react-router";
import { CartProvider } from "@/ui/common/context/cart-context/cart-context-provider";
import { getProductDetails } from "@/core/itx-store/itx-store-service";
import { DetailsPage } from "./details";

vi.mock("@/core/itx-store/itx-store-service", () => ({
  getProductDetails: vi.fn(),
}));

const product = {
  id: "1",
  brand: "Apple",
  model: "iPhone 15",
  price: "999",
  imgUrl: "https://example.com/phone.jpg",
  colors: ["black", "white"],
  internalMemory: ["128GB", "256GB"],
};

const renderDetails = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const router = createMemoryRouter(
    [{ path: "/product/:id", Component: DetailsPage }],
    { initialEntries: ["/product/1"] },
  );
  return render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>,
  );
};

describe("DetailsPage", () => {
  it("shows skeleton placeholders while loading", () => {
    // given ~ request is in flight
    getProductDetails.mockImplementation(() => new Promise(() => {}));

    // when
    const { container } = renderDetails();

    // then
    expect(container.querySelectorAll(".skeleton").length).toBeGreaterThan(0);
  });

  it("shows the product brand and model after loading", async () => {
    // given ~ service returns product data
    getProductDetails.mockResolvedValue(product);

    // when
    renderDetails();
    await waitFor(() => expect(screen.getByText("Apple")).toBeInTheDocument());

    // then
    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
  });
});
