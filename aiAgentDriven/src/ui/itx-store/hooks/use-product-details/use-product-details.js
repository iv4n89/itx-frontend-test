import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/core/itx-store/itx-store-repository";

export function useProductDetails(id) {
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  return { product, isLoading, isError };
}
