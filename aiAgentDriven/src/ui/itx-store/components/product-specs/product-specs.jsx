import "./product-specs.css";

const SPEC_FIELDS = [
  { key: "brand", label: "Marca" },
  { key: "model", label: "Modelo" },
  { key: "price", label: "Precio" },
  { key: "cpu", label: "CPU" },
  { key: "ram", label: "RAM" },
  { key: "os", label: "SO" },
  { key: "displayResolution", label: "Resolución" },
  { key: "battery", label: "Batería" },
  { key: "primaryCamera", label: "Cámara principal" },
  { key: "secondaryCmera", label: "Cámara secundaria" },
  { key: "dimentions", label: "Dimensiones" },
  { key: "weight", label: "Peso" },
];

function formatValue(key, value) {
  return key === "weight" ? `${value}g` : value;
}

export function ProductSpecs({ data }) {
  return (
    <ul className="product-specs">
      {SPEC_FIELDS.filter(({ key }) => data[key]).map(({ key, label }) => (
        <li key={key} className="product-specs__item">
          <span className="product-specs__label">{label}:</span>
          <span className="product-specs__value">{formatValue(key, data[key])}</span>
        </li>
      ))}
    </ul>
  );
}
