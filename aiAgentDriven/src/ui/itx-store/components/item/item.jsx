import { Link } from "react-router";
import "./item.css";

export function Item({ id, brand, model, price, imgUrl }) {
  return (
    <Link to={`/product/${id}`} className="item">
      <img src={imgUrl} alt={`${brand} ${model}`} className="item__image" />
      <div className="item__info">
        <span className="item__brand">{brand}</span>
        <span className="item__model">{model}</span>
        <span className="item__price">{price}</span>
      </div>
    </Link>
  );
}
