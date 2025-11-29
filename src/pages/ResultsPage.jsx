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
        `http://localhost:5001/api/products/search/${searchTerm}`
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
      console.log(data);

      navigate(`/products/search/${searchTerm}`);
    } catch (error) {
      console.error(
        "Failed to search products",
        error.response?.data || error.message
      );
    }
  };
  return (
    <main aria-label="results page" className="results-page">
      <header aria-label="resultsPage header" className="resultsPage-header">
        <button className="backBtn">
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
              ></input>
              <input
                className="high-price-input"
                placeholder="High price"
                type="number"
              ></input>
            </div>
          </section>

          <section aria-label="sort products" className="sort-products">
            <h3>Sort by</h3>
            <div aria-label="sort options" className="sort-options">
              <div className="option">Most Recent</div>

              <div className="option">Popular</div>

              <div className="option">Low Price</div>

              <div className="option">High Price</div>
            </div>
          </section>

          <section
            aria-label="filter rate products"
            className="filter-rate-products"
          >
            <h3>Rating</h3>
            <div aria-label="rate filter" className="rates">
              <div className="rate">☆ All</div>

              <div className="rate">☆ 5</div>

              <div className="rate">☆ 4</div>

              <div className="rate">☆ 3</div>

              <div className="rate">☆ 2</div>

              <div className="rate">☆ 1</div>
            </div>
          </section>

          <footer
            aria-label="filter modal footer"
            className="filter-modal-footer"
          >
            <button className="resetBtn">Reset</button>
            <button>Apply</button>
          </footer>
        </div>
      )}
    </main>
  );
}
