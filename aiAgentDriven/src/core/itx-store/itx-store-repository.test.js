import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/core/common/fetch", () => ({ apiFetch: vi.fn() }));

import { fetchProducts, fetchProduct, addToCart } from "./itx-store-repository";
import { apiFetch } from "@/core/common/fetch";

describe("itx-store-repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchProducts sends a GET request to /api/product", async () => {
    // given
    apiFetch.mockResolvedValue([]);

    // when
    await fetchProducts();

    // then
    expect(apiFetch).toHaveBeenCalledWith("/api/product");
  });

  it("fetchProduct sends a GET request to /api/product/:id", async () => {
    // given
    apiFetch.mockResolvedValue({});

    // when
    await fetchProduct("ABC123");

    // then
    expect(apiFetch).toHaveBeenCalledWith("/api/product/ABC123");
  });

  it("addToCart sends a POST request to /api/cart with the correct body", async () => {
    // given
    apiFetch.mockResolvedValue({ count: 1 });
    const payload = { id: "ABC123", colorCode: 1, storageCode: 2 };

    // when
    await addToCart(payload);

    // then
    expect(apiFetch).toHaveBeenCalledWith("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });

  it("addToCart returns the count from the API response", async () => {
    // given
    apiFetch.mockResolvedValue({ count: 3 });

    // when
    const result = await addToCart({ id: "1", colorCode: 1, storageCode: 2 });

    // then
    expect(result).toEqual({ count: 3 });
  });
});
