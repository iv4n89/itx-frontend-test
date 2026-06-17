import { Skeleton } from "@/ui/common/components/skeleton/skeleton";
import "./items-grid.css";
import { Item } from "../item/item";

export const ItemsGrid = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="items_grid">
        {Array.from({ length: 16 }).map((_, index) => (
          <Skeleton key={index} borderRadius={12} width="100%" height={450} />
        ))}
      </div>
    );
  }

  return (
    <div className="items_grid">
      {items?.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          imageSrc={item.imgUrl}
          brand={item.brand}
          model={item.model}
          price={item.price}
        />
      ))}
    </div>
  );
};
