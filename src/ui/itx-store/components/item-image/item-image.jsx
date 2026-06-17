import "./item-image.css";

export const ItemImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="item_image__image" />;
};
