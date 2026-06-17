import { ItxStoreRepository } from "./itx-store-repository";

export const getProductList = async () => {
  return await ItxStoreRepository.getProductList();
};

export const getProductDetails = async (productId) => {
  return await ItxStoreRepository.getProductDetails(productId);
};

export const addToCart = async ({ id, colorCode, storageCode }) => {
  return await ItxStoreRepository.addToCart({ id, colorCode, storageCode });
};
