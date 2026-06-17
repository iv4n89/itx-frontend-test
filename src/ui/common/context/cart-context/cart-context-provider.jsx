import React from "react";
import { CartContext } from "./cart-context";

const CART_STORAGE_KEY = "itx-store-cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  React.useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const itemCount = cart.length;

  const value = {
    cart,
    itemCount,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
