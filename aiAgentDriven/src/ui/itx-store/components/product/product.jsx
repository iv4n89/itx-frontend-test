import { ProductSpecs } from "@/ui/itx-store/components/product-specs/product-specs";
import { Actions } from "@/ui/itx-store/components/actions/actions";

export function Product({
  product,
  selectedColor,
  selectedStorage,
  onColorSelect,
  onStorageSelect,
  onAddToCart,
}) {
  return (
    <div>
      <ProductSpecs data={product} />
      <Actions
        colors={product.options.colors}
        storages={product.options.storages}
        selectedColor={selectedColor}
        selectedStorage={selectedStorage}
        onColorSelect={onColorSelect}
        onStorageSelect={onStorageSelect}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
