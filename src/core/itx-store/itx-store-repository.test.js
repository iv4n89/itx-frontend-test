import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchData } from "../common/fetch";
import { ItxStoreRepository } from "./itx-store-repository";

vi.mock("../common/fetch", () => ({
  fetchData: vi.fn(),
}));

describe("ItxStoreRepository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("getProductList", () => {
    it("returns the product list", async () => {
      // given
      const products = [{ id: "1", brand: "Apple", model: "iPhone" }];
      fetchData.mockResolvedValue(products);

      // when
      const result = await ItxStoreRepository.getProductList();

      // then
      expect(result).toEqual(products);
    });

    it("calls fetchData with GET /api/product", async () => {
      // given
      fetchData.mockResolvedValue([]);

      // when
      await ItxStoreRepository.getProductList();

      // then
      expect(fetchData).toHaveBeenCalledWith({ url: "/api/product", method: "GET" });
    });

    it("rethrows the error when fetchData fails", async () => {
      // given
      const error = new Error("Network error");
      fetchData.mockRejectedValue(error);

      // when
      const call = ItxStoreRepository.getProductList();

      // then
      await expect(call).rejects.toThrow("Network error");
    });
  });

  describe("getProductDetails", () => {
    it("returns the product details", async () => {
      // given
      const product = { id: "1", brand: "Apple", model: "iPhone", price: 999 };
      fetchData.mockResolvedValue(product);

      // when
      const result = await ItxStoreRepository.getProductDetails("1");

      // then
      expect(result).toEqual(product);
    });

    it("calls fetchData with GET /api/product/:id", async () => {
      // given
      const productId = "ABC123";
      fetchData.mockResolvedValue({});

      // when
      await ItxStoreRepository.getProductDetails(productId);

      // then
      expect(fetchData).toHaveBeenCalledWith({
        url: `/api/product/${productId}`,
        method: "GET",
      });
    });

    it("rethrows the error when fetchData fails", async () => {
      // given
      const error = new Error("Not found");
      fetchData.mockRejectedValue(error);

      // when
      const call = ItxStoreRepository.getProductDetails("999");

      // then
      await expect(call).rejects.toThrow("Not found");
    });
  });

  describe("addToCart", () => {
    it("returns the result from fetchData", async () => {
      // given
      const cartResult = { count: 3 };
      fetchData.mockResolvedValue(cartResult);

      // when
      const result = await ItxStoreRepository.addToCart({
        id: "1",
        colorCode: "black",
        storageCode: "128GB",
      });

      // then
      expect(result).toEqual(cartResult);
    });

    it("calls fetchData with POST /api/cart and the correct body", async () => {
      // given
      fetchData.mockResolvedValue({});
      const cartParams = { id: "1", colorCode: "black", storageCode: "128GB" };

      // when
      await ItxStoreRepository.addToCart(cartParams);

      // then
      expect(fetchData).toHaveBeenCalledWith({
        url: "/api/cart",
        method: "POST",
        body: { id: "1", colorCode: "black", storageCode: "128GB" },
      });
    });

    it("rethrows the error when fetchData fails", async () => {
      // given
      const error = new Error("Cart error");
      fetchData.mockRejectedValue(error);

      // when
      const call = ItxStoreRepository.addToCart({
        id: "1",
        colorCode: "black",
        storageCode: "128GB",
      });

      // then
      await expect(call).rejects.toThrow("Cart error");
    });
  });
});
