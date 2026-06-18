import "./item-image.css";

export function ItemImage({ imgUrl, alt }) {
  return (
    <div className="item-image">
      <img src={imgUrl} alt={alt} className="item-image__img" />
    </div>
  );
}
