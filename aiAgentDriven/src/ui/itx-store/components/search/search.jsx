import "./search.css";

export function Search({ value, onSearch }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Buscar por marca o modelo..."
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
