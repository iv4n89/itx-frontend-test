import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getProductList } from "@/core/itx-store/itx-store-service";
import { useListProducts } from "./use-list-products";

vi.mock("@/core/itx-store/itx-store-service", () => ({
  getProductList: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useListProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in loading state", () => {
    // given ~ request is in flight
    getProductList.mockImplementation(() => new Promise(() => {}));

    // when
    const { result } = renderHook(() => useListProducts(), { wrapper: createWrapper() });

    // then
    expect(result.current.isLoading).toBe(true);
  });

  it("returns the product list when the query resolves", async () => {
    // given ~ service returns a list of products
    const products = [{ id: "1", brand: "Apple", model: "iPhone 15" }];
    getProductList.mockResolvedValue(products);

    // when
    const { result } = renderHook(() => useListProducts(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // then
    expect(result.current.data).toEqual(products);
  });
});
