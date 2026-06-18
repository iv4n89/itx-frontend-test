import { useListProducts } from "@/ui/itx-store/hooks/use-list-products/use-list-products";
import { useSearch } from "@/ui/itx-store/hooks/use-search/use-search";
import { useDocumentTitle } from "@/ui/common/hooks/use-document-title/use-document-title";
import { Search } from "@/ui/itx-store/components/search/search";
import { ItemsGrid } from "@/ui/itx-store/components/items-grid/items-grid";
import "./home.css";

export function HomeView() {
  const { products, isLoading } = useListProducts();
  const { query, setQuery, filteredProducts } = useSearch(products);

  useDocumentTitle("ITX Store");

  return (
    <div className="home">
      <div className="home__toolbar">
        <Search value={query} onSearch={setQuery} />
      </div>
      <ItemsGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
}
