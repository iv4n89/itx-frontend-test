import { ItxStoreRepository } from "./itx-store-repository";

export const getProductList = async () => {
  return await ItxStoreRepository.getProductList();
};
