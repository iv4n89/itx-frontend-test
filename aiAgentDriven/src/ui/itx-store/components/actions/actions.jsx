import "./actions.css";

export function Actions({
  colors,
  storages,
  selectedColor,
  selectedStorage,
  onColorSelect,
  onStorageSelect,
  onAddToCart,
}) {
  return (
    <div className="actions">
      <div className="actions__group">
        {colors.map(({ code, name }) => (
          <button
            key={code}
            className={`actions__option${selectedColor === code ? " actions__option--selected" : ""}`}
            onClick={() => onColorSelect(code)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="actions__group">
        {storages.map(({ code, name }) => (
          <button
            key={code}
            className={`actions__option${selectedStorage === code ? " actions__option--selected" : ""}`}
            onClick={() => onStorageSelect(code)}
          >
            {name}
          </button>
        ))}
      </div>
      <button
        className="actions__add"
        onClick={onAddToCart}
        disabled={selectedColor === null || selectedStorage === null}
      >
        Añadir al carrito
      </button>
    </div>
  );
}
