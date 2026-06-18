import { Item } from "@/ui/itx-store/components/item/item";
import { Skeleton } from "@/ui/common/components/skeleton/skeleton";
import "./items-grid.css";

const SKELETON_COUNT = 8;

export function ItemsGrid({ products, isLoading }) {
  if (isLoading) {
    return (
      <div className="items-grid">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <Skeleton key={i} className="items-grid__skeleton" />
        ))}
      </div>
    );
  }

  return (
    <div className="items-grid">
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </div>
  );
}
