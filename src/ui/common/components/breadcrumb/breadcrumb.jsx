import { Link, useLocation } from "react-router";
import "./breadcrumb.css";
import React from "react";

export const BreadCrumb = () => {
  const location = useLocation();

  const getBreadcrumbItems = () => {
    const breadcrumbItems = [];
    const pathSegments = location.pathname.split("/").filter(Boolean);

    breadcrumbItems.push({ text: "Inicio", path: "/" });

    if (pathSegments[0] === "product" && pathSegments[1]) {
      breadcrumbItems.push({
        text: "Detalles producto",
        path: `/product/${pathSegments[1]}`,
      });
    }

    return breadcrumbItems;
  };

  const isHome = location.pathname === "/";

  return (
    <nav
      className={`header__breadcrumbs ${isHome ? "header__breadcrumbs--hidden" : ""}`}
    >
      {getBreadcrumbItems().map((segment, index, array) => (
        <React.Fragment key={segment.path}>
          <Link to={segment.path} className="header__breadcrumb_link">
            {segment.text}
          </Link>
          <span>{index < array.length - 1 && " > "}</span>
        </React.Fragment>
      ))}
    </nav>
  );
};
