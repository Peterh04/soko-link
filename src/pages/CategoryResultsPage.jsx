import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/icons/back.svg?react";
import ProductPreview from "../components/ProductPreview";

const CategoryResultsPage = ({ filteredCategoryProducts }) => {
  const navigate = useNavigate();

  const priceString = (price) => Number(price).toLocaleString();
  return (
    <main aria-label="results page" className="results-page">
      <header aria-label="resultsPage header" className="resultsPage-header">
        <button className="backBtn" onClick={() => navigate(-1)}>
          <BackIcon className="fa" />
        </button>
        <h2>Electonics</h2>
      </header>

      <section aria-label="seatch results" className="results-section">
        {filteredCategoryProducts !== null ? (
          <ul className="results-list">
            {filteredCategoryProducts.map((product) => (
              <ProductPreview
                key={product.id}
                id={product.id}
                name={product.title}
                price={priceString(product.price)}
                location={product.location}
                image={product.images[0]}
              />
            ))}
          </ul>
        ) : (
          <p>No products found</p>
        )}
      </section>
    </main>
  );
};

export default CategoryResultsPage;
