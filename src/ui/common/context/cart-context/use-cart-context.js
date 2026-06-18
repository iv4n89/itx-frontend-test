import { CartContext } from "./cart-context";
import React from "react";

/**
 * @returns {{
 *  cart: Object[],
 *  addToCart: (item: Object) => void,
 *  itemCount: number
 * }}
 */
export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
