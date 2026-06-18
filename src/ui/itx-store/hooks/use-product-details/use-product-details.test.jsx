import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getProductDetails } from "@/core/itx-store/itx-store-service";
import { useProductDetails } from "./use-product-details";

vi.mock("@/core/itx-store/itx-store-service", () => ({
  getProductDetails: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useProductDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts in loading state when a productId is provided", () => {
    // given ~ request is in flight
    getProductDetails.mockImplementation(() => new Promise(() => {}));

    // when
    const { result } = renderHook(() => useProductDetails("1"), {
      wrapper: createWrapper(),
    });

    // then
    expect(result.current.isLoading).toBe(true);
  });

  it("returns the product data when the query resolves", async () => {
    // given ~ service returns product details
    const product = { id: "1", brand: "Apple", model: "iPhone 15" };
    getProductDetails.mockResolvedValue(product);

    // when
    const { result } = renderHook(() => useProductDetails("1"), {
      wrapper: createWrapper(),
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // then
    expect(result.current.data).toEqual(product);
  });

  it("does not fetch when productId is not provided", () => {
    // given ~ no productId
    // when
    const { result } = renderHook(() => useProductDetails(undefined), {
      wrapper: createWrapper(),
    });

    // then
    expect(result.current.isLoading).toBe(false);
    expect(getProductDetails).not.toHaveBeenCalled();
  });
});
