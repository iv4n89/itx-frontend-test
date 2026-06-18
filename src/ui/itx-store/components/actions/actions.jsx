import { Spinner } from "@/ui/common/components/spinner/spinner";
import { useProductActions } from "../../hooks/use-product-actions/use-product-actions";

export const Actions = ({ productId, options }) => {
  const {
    colors,
    handleAddToCart,
    handleColorSet,
    handleStorageSelect,
    isAddToCartDisabled,
    selectedColor,
    selectedStorage,
    storages,
    isFetching,
  } = useProductActions(productId, options);

  return (
    <div className="product_actions__container">
      <div className="product_actions__section">
        <h3 className="product_actions__title">Capacidad</h3>
        <div className="product_actions__options">
          {storages.map((storage) => (
            <button
              key={storage}
              className={`product_actions__option ${
                selectedStorage === storage
                  ? "product_actions__option--selected"
                  : ""
              }`}
              onClick={() => handleStorageSelect(storage)}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      <div className="product_actions__section">
        <h3 className="product_actions__title">Colores</h3>
        <div className="product_actions__colors">
          {colors.map((color) => (
            <button
              key={color}
              className={`product_actions__color ${
                selectedColor === color
                  ? "product_actions__color--selected"
                  : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={() => handleColorSet(color)}
              title={color}
            />
          ))}
        </div>
      </div>

      <button
        className="product_actions__add_to_cart_button"
        onClick={handleAddToCart}
        disabled={isAddToCartDisabled}
      >
        {isFetching ? (
          <Spinner size="large" color="white" />
        ) : (
          "Agregar al carro"
        )}
      </button>
    </div>
  );
};
