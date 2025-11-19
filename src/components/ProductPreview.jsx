import "../styles/productPreview.css";

import sofaPreview from "../assets/sofaPreview.jpeg";
import { useNavigate } from "react-router-dom";

export default function ProductPreview({
  name = "Three seater for sale",
  price = "40,000",
  location = "Ngara, Nairobi",
  condition = "Brand New",
  image = sofaPreview,
}) {
  const navigate = useNavigate();

  return (
    <div className="product-preview" onClick={() => navigate("/product")}>
      <div className="product-preview-img-container">
        <img src={image} alt={name} className="prod-image" />
      </div>
      <div className="product-info">
        <div className="price">Ksh {price}</div>
        <h3 className="prod-name">{name}</h3>
        <div className="product-meta">
          <p className="prod-location">{location}</p>
          <p className="prod-condition">{condition}</p>
        </div>
      </div>
    </div>
  );
}
