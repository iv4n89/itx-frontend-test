import { useState, useEffect } from "react";
import { CartContext } from "./cart-context";
import { addToCart as addToCartApi } from "@/core/itx-store/itx-store-repository";

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(
    () => Number(localStorage.getItem("cart-count")) || 0
  );

  useEffect(() => {
    localStorage.setItem("cart-count", String(cartCount));
  }, [cartCount]);

  async function addToCart(id, colorCode, storageCode) {
    const { count } = await addToCartApi({ id, colorCode, storageCode });
    setCartCount(count);
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
