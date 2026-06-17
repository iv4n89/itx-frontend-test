import { describe, it, expect, vi, beforeEach } from "vitest";
import { ItxStoreRepository } from "./itx-store-repository";
import { getProductList, getProductDetails, addToCart } from "./itx-store-service";

vi.mock("./itx-store-repository", () => ({
  ItxStoreRepository: {
    getProductList: vi.fn(),
    getProductDetails: vi.fn(),
    addToCart: vi.fn(),
  },
}));

describe("itx-store-service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getProductList", () => {
    it("returns the product list from the repository", async () => {
      // given
      const products = [{ id: "1", brand: "Apple" }];
      ItxStoreRepository.getProductList.mockResolvedValue(products);

      // when
      const result = await getProductList();

      // then
      expect(result).toEqual(products);
    });

    it("delegates to ItxStoreRepository.getProductList", async () => {
      // given
      ItxStoreRepository.getProductList.mockResolvedValue([]);

      // when
      await getProductList();

      // then
      expect(ItxStoreRepository.getProductList).toHaveBeenCalledOnce();
    });
  });

  describe("getProductDetails", () => {
    it("returns the product details from the repository", async () => {
      // given
      const product = { id: "1", brand: "Apple", model: "iPhone" };
      ItxStoreRepository.getProductDetails.mockResolvedValue(product);

      // when
      const result = await getProductDetails("1");

      // then
      expect(result).toEqual(product);
    });

    it("passes the productId to the repository", async () => {
      // given
      const productId = "ABC123";
      ItxStoreRepository.getProductDetails.mockResolvedValue({});

      // when
      await getProductDetails(productId);

      // then
      expect(ItxStoreRepository.getProductDetails).toHaveBeenCalledWith(productId);
    });
  });

  describe("addToCart", () => {
    it("returns the cart result from the repository", async () => {
      // given
      const cartResult = { count: 1 };
      ItxStoreRepository.addToCart.mockResolvedValue(cartResult);

      // when
      const result = await addToCart({ id: "1", colorCode: "black", storageCode: "128GB" });

      // then
      expect(result).toEqual(cartResult);
    });

    it("passes only id, colorCode and storageCode to the repository", async () => {
      // given
      ItxStoreRepository.addToCart.mockResolvedValue({});

      // when
      await addToCart({ id: "1", colorCode: "black", storageCode: "128GB", extra: "ignored" });

      // then
      expect(ItxStoreRepository.addToCart).toHaveBeenCalledWith({
        id: "1",
        colorCode: "black",
        storageCode: "128GB",
      });
    });
  });
});
