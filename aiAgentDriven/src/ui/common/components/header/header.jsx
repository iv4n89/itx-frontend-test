import { Link, useLocation } from "react-router";
import { BreadCrumb } from "@/ui/common/components/breadcrumb/breadcrumb";
import { CartIcon } from "@/ui/common/components/cart-icon/cart-icon";
import { useCart } from "@/ui/common/context/cart-context/use-cart";
import "./header.css";

function breadcrumbItemsFor(pathname) {
  if (pathname === "/") return [{ label: "Inicio", to: null }];
  return [
    { label: "Inicio", to: "/" },
    { label: "Detalle producto", to: null },
  ];
}

export function Header() {
  const { pathname } = useLocation();
  const { cartCount } = useCart();

  return (
    <header className="header">
      <Link to="/" className="header__title">
        ITX Store
      </Link>
      <BreadCrumb items={breadcrumbItemsFor(pathname)} />
      <CartIcon count={cartCount} />
    </header>
  );
}
