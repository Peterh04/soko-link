import "../styles/productsPage.css";

import BackIcon from "../assets/icons/back.svg?react";
import ProductPreview from "../components/ProductPreview";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductsPage({ vendorId }) {
  const navigate = useNavigate();
  const [vendorProducts, setVendorProducts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const getVedorsProducts = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/api/products/vendor/${vendorId}/getProducts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVendorProducts(data.products);
        console.log(data);
      } catch (error) {
        console.error(
          "Failed to fetch vendor's products",
          error.response?.data || error.message
        );
      }
    };

    getVedorsProducts();
  }, [vendorId]);

  const priceString = (price) => Number(price).toLocaleString();
  return (
    <main aria-label="Products preview page" className="products-page">
      <header
        className="products-page-header"
        aria-label="products page header"
      >
        <button onClick={() => navigate(-1)}>
          <BackIcon className="fa" />
        </button>
        <h3>All Products</h3>
      </header>
      <section aria-label="products section" className="products-section">
        <ul aria-label="products-list" className="products-list">
          {vendorProducts.map((product) => (
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
      </section>
    </main>
  );
}
