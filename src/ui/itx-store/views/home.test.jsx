import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { getProductList } from "@/core/itx-store/itx-store-service";
import { HomePage } from "./home";

vi.mock("@/core/itx-store/itx-store-service", () => ({
  getProductList: vi.fn(),
}));

const renderHome = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe("HomePage", () => {
  it("shows skeleton placeholders while the products are loading", () => {
    // given ~ request is in flight
    getProductList.mockImplementation(() => new Promise(() => {}));

    // when
    const { container } = renderHome();

    // then
    expect(container.querySelectorAll(".skeleton").length).toBeGreaterThan(0);
  });

  it("shows the product list after loading", async () => {
    // given ~ service returns two products
    const products = [
      { id: "1", brand: "Apple", model: "iPhone 15", imgUrl: "", price: 999 },
      { id: "2", brand: "Samsung", model: "Galaxy S24", imgUrl: "", price: 899 },
    ];
    getProductList.mockResolvedValue(products);

    // when
    renderHome();
    await waitFor(() => expect(screen.getByText("Apple")).toBeInTheDocument());

    // then
    expect(screen.getByText("Samsung")).toBeInTheDocument();
  });
});
