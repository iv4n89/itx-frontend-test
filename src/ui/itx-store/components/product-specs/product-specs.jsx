export const ProductSpecs = ({ data }) => {
  return (
    <ul className="product_info__specs_list">
      {data.cpu && (
        <li>
          <strong>CPU: </strong>
          {data.cpu}
        </li>
      )}
      {data.ram && (
        <li>
          <strong>RAM: </strong>
          {data.ram}
        </li>
      )}
      {data.os && (
        <li>
          <strong>OS: </strong>
          {data.os}
        </li>
      )}
      {data.displayResolution && (
        <li>
          <strong>Pantalla: </strong>
          {data.displayResolution}
        </li>
      )}
      {data.battery && (
        <li>
          <strong>Batería: </strong>
          {data.battery}
        </li>
      )}
      {data.primaryCamera && (
        <li>
          <strong>Cámara: </strong>
          {data.primaryCamera}
        </li>
      )}
      {data.secondaryCmera && (
        <li>
          <strong>Cámara delantera: </strong>
          {data.secondaryCmera}
        </li>
      )}
      {data.dimentions && (
        <li>
          <strong>Dimensiones: </strong>
          {data.dimentions}
        </li>
      )}
      {data.weight && (
        <li>
          <strong>Peso: </strong>
          {data.weight}g
        </li>
      )}
    </ul>
  );
};
