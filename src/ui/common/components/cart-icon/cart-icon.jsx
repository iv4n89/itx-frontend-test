import "./cart-icon.css";

export const CartIcon = ({ itemCount }) => {
  return (
    <div className="header__cart_container">
      {itemCount > 0 && (
        <div className="header__cart_number_items">{itemCount}</div>
      )}
      <img className="header__cart_icon" src="/cart.svg" alt="Cart icon" />
    </div>
  );
};
