import { Link } from "react-router";
import "./item.css";
import { ItemImage } from "../item-image/item-image";

export const Item = ({ id, imageSrc, brand, model, price }) => {
  return (
    <Link to={`/product/${id}`} className="item__card">
      <div className="item__image_container">
        <ItemImage src={imageSrc} alt={`${brand} ${model}`} />
      </div>
      <div className="item__content">
        <h3 className="item__brand">{brand}</h3>
        <p className="item__model">{model}</p>
        <p className="item_price">{price || "- "}€</p>
      </div>
    </Link>
  );
};
