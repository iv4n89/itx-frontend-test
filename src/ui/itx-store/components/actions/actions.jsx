import { Spinner } from "@/ui/common/components/spinner/spinner";
import { useProductActions } from "../../hooks/use-product-actions/use-product-actions";
import "./actions.css";

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
              key={storage.code}
              className={`product_actions__option ${
                selectedStorage === storage.code
                  ? "product_actions__option--selected"
                  : ""
              }`}
              onClick={() => handleStorageSelect(storage.code)}
              title={storage.name}
            >
              {storage.name}
            </button>
          ))}
        </div>
      </div>

      <div className="product_actions__section">
        <h3 className="product_actions__title">Colores</h3>
        <div className="product_actions__colors">
          {colors.map((color) => (
            <button
              key={color.code}
              className={`product_actions__option ${
                selectedColor === color.code
                  ? "product_actions__option--selected"
                  : ""
              }`}
              onClick={() => handleColorSet(color)}
              title={color.name}
            >
              {color.name}
            </button>
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
