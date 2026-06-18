import { useState } from "react";
import { useCart } from "@/ui/common/context/cart-context/use-cart";

function singleOptionCode(options) {
  return options.length === 1 ? options[0].code : null;
}

export function useProductActions(product) {
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(
    () => singleOptionCode(product.options.colors)
  );
  const [selectedStorage, setSelectedStorage] = useState(
    () => singleOptionCode(product.options.storages)
  );

  function handleAddToCart() {
    addToCart(product.id, selectedColor, selectedStorage);
  }

  return {
    selectedColor,
    selectedStorage,
    handleColorSelect: setSelectedColor,
    handleStorageSelect: setSelectedStorage,
    handleAddToCart,
  };
}
