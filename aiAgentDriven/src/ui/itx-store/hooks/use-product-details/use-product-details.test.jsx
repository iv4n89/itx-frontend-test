import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useProductDetails } from "./use-product-details";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  fetchProduct: vi.fn(),
}));

import { fetchProduct } from "@/core/itx-store/itx-store-repository";

function wrapper({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe("useProductDetails", () => {
  it("returns isLoading true while the query is pending", () => {
    // given
    fetchProduct.mockReturnValue(new Promise(() => {}));

    // when
    const { result } = renderHook(() => useProductDetails("ABC123"), { wrapper });

    // then
    expect(result.current.isLoading).toBe(true);
  });

  it("returns the product when the query succeeds", async () => {
    // given
    const product = { id: "ABC123", brand: "Apple", model: "iPhone 14" };
    fetchProduct.mockResolvedValue(product);

    // when
    const { result } = renderHook(() => useProductDetails("ABC123"), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // then
    expect(result.current.product).toEqual(product);
  });

  it("calls fetchProduct with the given id", async () => {
    // given
    fetchProduct.mockResolvedValue({});

    // when
    renderHook(() => useProductDetails("XYZ999"), { wrapper });
    await waitFor(() => expect(fetchProduct).toHaveBeenCalledWith("XYZ999"));
  });
});
