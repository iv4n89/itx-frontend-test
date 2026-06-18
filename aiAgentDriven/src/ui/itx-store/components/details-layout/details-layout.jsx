import { Link } from "react-router";
import { ItemImage } from "@/ui/itx-store/components/item-image/item-image";
import { Product } from "@/ui/itx-store/components/product/product";
import "./details-layout.css";

export function DetailsLayout({
  product,
  selectedColor,
  selectedStorage,
  onColorSelect,
  onStorageSelect,
  onAddToCart,
}) {
  return (
    <div className="details-layout">
      <Link to="/" className="details-layout__back">
        Volver al listado
      </Link>
      <div className="details-layout__content">
        <ItemImage
          imgUrl={product.imgUrl}
          alt={`${product.brand} ${product.model}`}
        />
        <Product
          product={product}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
          onColorSelect={onColorSelect}
          onStorageSelect={onStorageSelect}
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  );
}
