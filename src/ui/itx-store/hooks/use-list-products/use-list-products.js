import { useQuery } from "@tanstack/react-query";
import { QUERIES } from "../../consts/queries";
import { getProductList } from "@/core/itx-store/itx-store-service";

const queryKey = QUERIES.LIST_PRODUCT;

export const useListProducts = () => {
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return query;
};
