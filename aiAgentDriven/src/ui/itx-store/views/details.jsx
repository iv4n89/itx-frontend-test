import { useParams } from "react-router";
import { useProductDetails } from "@/ui/itx-store/hooks/use-product-details/use-product-details";
import { useProductActions } from "@/ui/itx-store/hooks/use-product-actions/use-product-actions";
import { useDocumentTitle } from "@/ui/common/hooks/use-document-title/use-document-title";
import { DetailsLayout } from "@/ui/itx-store/components/details-layout/details-layout";

function DetailsContent({ product }) {
  const actions = useProductActions(product);

  return (
    <DetailsLayout
      product={product}
      selectedColor={actions.selectedColor}
      selectedStorage={actions.selectedStorage}
      onColorSelect={actions.handleColorSelect}
      onStorageSelect={actions.handleStorageSelect}
      onAddToCart={actions.handleAddToCart}
    />
  );
}

export function DetailsView() {
  const { id } = useParams();
  const { product, isLoading } = useProductDetails(id);

  useDocumentTitle(product ? `${product.brand} ${product.model}` : "ITX Store");

  if (isLoading || !product) return null;

  return <DetailsContent product={product} />;
}
