import { Link } from "react-router";
import "./header.css";
import { BreadCrumb } from "../breadcrumb/breadcrumb";
import { CartIcon } from "../cart-icon/cart-icon";
import { useCart } from "../../context/cart-context/use-cart-context";

export const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="header__container">
      <div className="header__content">
        <div className="header__left">
          <Link className="header__logo_link" to="/">
            <img className="header__logo" src="/logo.png" alt="ITX logo" />
          </Link>
          <BreadCrumb />
        </div>
        <div className="header__right">
          <CartIcon itemCount={itemCount} />
        </div>
      </div>
    </header>
  );
};
