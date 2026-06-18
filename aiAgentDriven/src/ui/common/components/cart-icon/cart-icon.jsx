import "./cart-icon.css";

export function CartIcon({ count }) {
  return <span className="cart-icon">Cart: {count}</span>;
}
