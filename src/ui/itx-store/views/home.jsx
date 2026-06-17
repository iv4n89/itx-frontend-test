import { ItemsGrid } from "../components/items-grid/items-grid";
import { Search } from "../components/search/search";
import { useListProducts } from "../hooks/use-list-products/use-list-products";
import { useSearch } from "../hooks/use-search/use-search";

export const HomePage = () => {
  const { data, isLoading } = useListProducts();
  const { searchTerm, setSearchTerm, filteredData } = useSearch(data);

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ItemsGrid items={filteredData} isLoading={isLoading} />
    </>
  );
};
