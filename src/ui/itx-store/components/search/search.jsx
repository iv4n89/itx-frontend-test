import './search.css';

export const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search__container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por marca o modelo"
        className="search__input"
      />
    </div>
  );
};
