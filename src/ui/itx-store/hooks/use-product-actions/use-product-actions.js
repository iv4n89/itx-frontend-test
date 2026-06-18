import { addToCart } from "@/core/itx-store/itx-store-service";
import { useCart } from "@/ui/common/context/cart-context/use-cart-context";
import React from "react";

/**
 * @param {string} productId
 * @param {{storages: {code: number, name: string}[], colors: {code: number, name: string}[]}} options
 */
export const useProductActions = (productId, options) => {
  const [selectedStorage, setSelectedStorage] = React.useState(() => {
    if (options?.storages?.length === 1) {
      return options.storages[0].code;
    }
    return null;
  });

  const [selectedColor, setSelectedColor] = React.useState(() => {
    if (options?.colors?.length === 1) {
      return options.colors[0].code;
    }
  });

  const [isFetching, setIsFetching] = React.useState(false);
  const { addToCart: addToContextCart } = useCart();

  const storages = React.useMemo(
    () => options?.storages || [],
    [options?.storages],
  );
  const colors = React.useMemo(() => options?.colors || [], [options?.colors]);

  const isAddToCartDisabled = !selectedStorage || !selectedColor || isFetching;

  const handleStorageSelect = (storageCode) => {
    setSelectedStorage(storageCode);
  };

  const handleColorSet = (colorId) => {
    setSelectedColor(colorId);
  };

  const handleAddToCart = async () => {
    if (isAddToCartDisabled) return;

    try {
      setIsFetching(true);
      const response = await addToCart({
        id: productId,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      });

      if (response.count === 1) {
        addToContextCart({
          id: productId,
          colorCode: selectedColor,
          storageCode: selectedStorage,
        });
      }
    } finally {
      setIsFetching(false);
    }
  };

  return {
    selectedStorage,
    selectedColor,
    storages,
    colors,
    isAddToCartDisabled,
    handleStorageSelect,
    handleColorSet,
    handleAddToCart,
    isFetching,
  };
};
