export default function ProductPreview({
  name,
  price,
  location,
  condition,
  image,
}) {
  return (
    <div className="product-preview">
      <img src={image} alt={name} />
      <div className="product-info">
        <p className="price">Ksh{price}</p>
        <h3>{name}</h3>
        <div className="product-meta">
          <p className="prod-location">{location}</p>
          <p className="prod-condition">{condition}</p>
        </div>
      </div>
    </div>
  );
}
