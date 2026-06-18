import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/core/itx-store/itx-store-repository";

export function useListProducts() {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { products, isLoading, isError };
}
