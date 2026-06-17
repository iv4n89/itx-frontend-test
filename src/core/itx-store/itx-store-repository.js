import { fetchData } from "../common/fetch";

export const ItxStoreRepository = {
  async getProductList() {
    try {
      const url = "/api/product";
      const method = "GET";

      const response = await fetchData({ url, method });
      return response;
    } catch (error) {
      console.error("Error fetching product list: ", error);
      throw error;
    }
  },
  async getProductDetails(productId) {
    try {
      const url = `/api/product/${productId}`;
      const method = "GET";

      const response = await fetchData({ url, method });
      return response;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  },
  async addToCart({ id, colorCode, storageCode }) {
    try {
      const url = "/api/cart";
      const method = "POST";
      const body = { id, colorCode, storageCode };
      const response = await fetchData({ url, method, body });
      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },
};
