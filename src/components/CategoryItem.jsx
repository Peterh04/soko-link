import "../styles/categoryItem.css";

export default function CategoryItem({ name, children }) {
  return (
    <li className="category-item">
      <div className="category-item-icon-container">{children}</div>
      <p>{name}</p>
    </li>
  );
}
