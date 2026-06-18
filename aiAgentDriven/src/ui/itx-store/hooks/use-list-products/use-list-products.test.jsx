import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useListProducts } from "./use-list-products";

vi.mock("@/core/itx-store/itx-store-repository", () => ({
  fetchProducts: vi.fn(),
}));

import { fetchProducts } from "@/core/itx-store/itx-store-repository";

function wrapper({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

describe("useListProducts", () => {
  it("returns isLoading true while the query is pending", () => {
    // given
    fetchProducts.mockReturnValue(new Promise(() => {}));

    // when
    const { result } = renderHook(() => useListProducts(), { wrapper });

    // then
    expect(result.current.isLoading).toBe(true);
  });

  it("returns the products when the query succeeds", async () => {
    // given
    const data = [{ id: "1", brand: "Apple", model: "iPhone 14", price: "999", imgUrl: "" }];
    fetchProducts.mockResolvedValue(data);

    // when
    const { result } = renderHook(() => useListProducts(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // then
    expect(result.current.products).toEqual(data);
  });

  it("returns an empty array as default before data arrives", () => {
    // given
    fetchProducts.mockReturnValue(new Promise(() => {}));

    // when
    const { result } = renderHook(() => useListProducts(), { wrapper });

    // then
    expect(result.current.products).toEqual([]);
  });
});
