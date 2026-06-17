import { Link, useLocation } from "react-router";
import "./breadcrumb.css";

export const BreadCrumb = () => {
  const location = useLocation();

  const getBreadcrumbText = () => {
    if (location.pathname.startsWith("/product/")) return "Detalle de producto";
    return "Inicio";
  };

  const isHome = location.pathname === "/";

  return (
    <nav
      className={`header__breadcrumbs ${isHome ? "header__breadcrumbs--hidden" : ""}`}
    >
      <Link to="/" className="header__breadcrumb_link">
        {">"} {getBreadcrumbText()}{" "}
      </Link>
    </nav>
  );
};
