import { getProductDetails } from "@/core/itx-store/itx-store-service";
import { QUERIES } from "../../consts/queries";
import { useQuery } from "@tanstack/react-query";

const queryKey = QUERIES.PRODUCT_DETAILS;

export const useProductDetails = (productId) => {
  const query = useQuery({
    queryKey: [queryKey, productId],
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return query;
};
