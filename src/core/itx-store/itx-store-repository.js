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
};
