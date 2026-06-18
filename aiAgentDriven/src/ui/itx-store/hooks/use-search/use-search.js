import { useState } from "react";
import { filterProducts } from "@/core/itx-store/itx-store-service";

export function useSearch(products) {
  const [query, setQuery] = useState("");

  return { query, setQuery, filteredProducts: filterProducts(products, query) };
}
