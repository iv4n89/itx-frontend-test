import { Link } from "react-router";
import "./breadcrumb.css";

export function BreadCrumb({ items }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={item.label} className="breadcrumb__item">
            {index > 0 && <span className="breadcrumb__separator">{">"}</span>}
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
