import "../styles/resultsPage.css";
import BackIcon from "../assets/icons/back.svg?react";
import SearchIcon from "../assets/icons/lol.svg?react";
import FilterIconn from "../assets/icons/filter.svg?react";
import { useState } from "react";
import ReactSlider from "react-slider";
import ProductPreview from "../components/ProductPreview";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResultsPage({
  searchTerm,
  searchProducts,
  setSearchProducts,
  setSearchTerm,
}) {
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState("");
  const [value, setValue] = useState([0, 500000]);
  const [isModalExpanded, setIsModalExpanded] = useState(false);
  const [filterValues, setFilteredValues] = useState({
    lowPrice: 0,
    highPrice: 0,
    rating: 0,
    sortBy: "",
  });

  const handleTyping = (e) => {
    const text = e.target.value;
    setMessage(text);
    setIsTyping(text.length > 0);
  };

  const clearTyping = () => {
    setMessage("");
    setIsTyping(false);
  };

  // Helper to format numbers with commas
  const formatPrice = (num) => {
    return num.toLocaleString();
  };

  // Create tick marks dynamically based on min, max, and step
  const min = 0;
  const max = 500000;
  const step = 10000;
  const ticks = [];
  for (let i = min; i <= max; i += step) {
    const percent = ((i - min) / (max - min)) * 100;
    ticks.push({ value: i, percent });
  }

  const handleModalExpansion = () => {
    setIsModalExpanded((cond) => !cond);
  };

  const priceString = (price) => Number(price).toLocaleString();

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/search/${searchTerm}`
      );
      const filteredProducts = data.filteredProducts.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        location: product.location,
        price: product.price,
        images: product.images,
        createdAt: product.createdAt,
        vendorId: product.vendorId,
      }));
      setSearchProducts(filteredProducts);

      navigate(`/products/search/${searchTerm}`);
    } catch (error) {
      console.error(
        "Failed to search products",
        error.response?.data || error.message
      );
    }
  };

  const handleApplyFilters = async () => {
    try {
      const params = new URLSearchParams();

      if (filterValues.lowPrice)
        params.append("minPrice", filterValues.lowPrice);
      if (filterValues.highPrice)
        params.append("maxPrice", filterValues.highPrice);
      if (filterValues.rating) params.append("rating", filterValues.rating);
      if (filterValues.sortBy) params.append("sort", filterValues.sortBy);

      const url = `${
        import.meta.env.VITE_API_URL
      }/api/products/search/${searchTerm}?${params.toString()}`;

      const { data } = await axios.get(url);

      const filteredProducts = data.filteredProducts.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        location: product.location,
        price: product.price,
        images: product.images,
        createdAt: product.createdAt,
        vendorId: product.vendorId,
      }));

      setSearchProducts(filteredProducts);
      setIsModalExpanded(false);
    } catch (error) {
      console.error(
        "Failed to fetch filtered products",
        error.response?.data || error.message
      );
    }
  };

  return (
    <main aria-label="results page" className="results-page">
      <header aria-label="resultsPage header" className="resultsPage-header">
        <button className="backBtn" onClick={() => navigate(-1)}>
          <BackIcon />
        </button>
        <div className="search-bar">
          <SearchIcon className="fa" onClick={handleSearch} />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          {isTyping && (
            <button className="clearBtn" onClick={clearTyping}>
              x
            </button>
          )}
        </div>
        <button className="filterBtn" onClick={() => setIsModalExpanded(true)}>
          <FilterIconn />
        </button>
      </header>

      <h4>Results for "{searchTerm}"</h4>

      <section aria-label="seatch results" className="results-section">
        <ul className="results-list">
          {searchProducts.map((product) => (
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

      {isModalExpanded && (
        <div className="filter-modal" aria-label="filter modal">
          <header className="filter-modal-header">
            <h3>Filter</h3>
            <button
              className="closeBtn"
              onClick={() => setIsModalExpanded(false)}
            >
              x
            </button>
          </header>

          <section aria-label="filter-price" className="filter-price">
            <h3>Price Range</h3>
            <ReactSlider
              className="slider"
              thumbClassName="thumb"
              trackClassName="track"
              value={value}
              onChange={setValue}
              min={0}
              max={500000}
              step={500}
              pearling
              minDistance={500}
            />

            <div className="slider-values">
              <p>KSh {formatPrice(value[0])}</p>{" "}
              <p>KSh {formatPrice(value[1])}</p>
            </div>

            <div
              aria-label="filter price inputs"
              className="filter-price-inputs"
            >
              <input
                className="low-price-input"
                placeholder="Low price"
                type="number"
                onChange={(e) =>
                  setFilteredValues({
                    ...filterValues,
                    lowPrice: e.target.value,
                  })
                }
              ></input>
              <input
                className="high-price-input"
                placeholder="High price"
                type="number"
                onChange={(e) =>
                  setFilteredValues({
                    ...filterValues,
                    highPrice: e.target.value,
                  })
                }
              ></input>
            </div>
          </section>

          <section aria-label="sort products" className="sort-products">
            <h3>Sort by</h3>
            <div aria-label="sort options" className="sort-options">
              <div
                className="option"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    sortBy: "recent",
                  })
                }
              >
                Most Recent
              </div>

              <div
                className="option"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    sortBy: "popular",
                  })
                }
              >
                Popular
              </div>

              <div
                className="option"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    sortBy: "lowPrice",
                  })
                }
              >
                Low Price
              </div>

              <div
                className="option"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    sortBy: "highPrice",
                  })
                }
              >
                High Price
              </div>
            </div>
          </section>

          <section
            aria-label="filter rate products"
            className="filter-rate-products"
          >
            <h3>Rating</h3>
            <div aria-label="rate filter" className="rates">
              <div className="rate">☆ All</div>

              <div
                className="rate"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    rating: 5,
                  })
                }
              >
                ☆ 5
              </div>

              <div
                className="rate"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    rating: 4,
                  })
                }
              >
                ☆ 4
              </div>

              <div
                className="rate"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    rating: 3,
                  })
                }
              >
                ☆ 3
              </div>

              <div
                className="rate"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    rating: 2,
                  })
                }
              >
                ☆ 2
              </div>

              <div
                className="rate"
                onClick={() =>
                  setFilteredValues({
                    ...filterValues,
                    rating: 1,
                  })
                }
              >
                ☆ 1
              </div>
            </div>
          </section>

          <footer
            aria-label="filter modal footer"
            className="filter-modal-footer"
          >
            <button className="resetBtn">Reset</button>
            <button onClick={handleApplyFilters}>Apply</button>
          </footer>
        </div>
      )}
    </main>
  );
}
