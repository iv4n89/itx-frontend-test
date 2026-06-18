import { Skeleton } from "@/ui/common/components/skeleton/skeleton";
import "./details-layout.css";
import { ItemImage } from "../item-image/item-image";
import { Product } from "../product/product";
import { Actions } from "../actions/actions";

export const DetailsLayout = ({ product, isLoading }) => {
  if (isLoading) {
    return (
      <div className="details_layout__container">
        <div className="details_layout__image">
          <Skeleton width="100%" height={400} borderRadius={12} />
        </div>
        <div className="details_layout__content">
          <Skeleton width="100%" height={550} borderRadius={12} />
          <Skeleton
            width="100%"
            height={400}
            borderRadius={12}
            style={{
              marginTop: 20,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="details_layout__container">
      <div className="details_layout__image">
        <ItemImage
          src={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
        />
      </div>
      <div className="details_layout__content">
        <Product data={product} />
        <Actions productId={product.id} options={product.options} />
      </div>
    </div>
  );
};
