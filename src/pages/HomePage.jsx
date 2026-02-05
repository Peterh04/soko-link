import locationIcon from "../assets/icons/location.svg";
import arrowDownIcon from "../assets/icons/arrow_down.svg";
import bellIcon from "../assets/icons/bell.svg";
import shirtImage from "../assets/shirtImg.png";
import electronicsImg from "../assets/electronics.png";
import furnitureImg from "../assets/furniture.png";
import productsImg from "../assets/result.png";
import "../styles/homePage.css";
import SearchIcon from "../assets/icons/lol.svg?react";
import ClothIcon from "../assets/icons/cloth.svg?react";
import CategoryItem from "../components/CategoryItem";

import NavBar from "../components/NavBar";
import ProductPreview from "../components/ProductPreview";
import { useEffect, useMemo } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import api from "../modules/apiClient";

export default function HomePage({
  products,
  setProducts,
  searchTerm,
  setSearchTerm,
  setSearchProducts,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get(`/api/products`);
        const filteredProducts = data.products.map((product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          condition: product.condition,
          location: product.location,
          price: product.price,
          images: product.images,
          createdAt: product.createdAt,
          vendorId: product.vendorId,
        }));
        setProducts(filteredProducts);
      } catch (error) {
        console.error(
          "Failed to fetch products",
          error.response?.data || error.message,
        );
      }
    };

    fetchProducts();
  }, []);

  const firstTenProducts = useMemo(() => {
    return products.slice(0, 10);
  }, [products]);

  const priceString = (price) => Number(price).toLocaleString();

  const handleSearch = async () => {
    try {
      const { data } = await api.get(`/api/products/search/${searchTerm}`);
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
        error.response?.data || error.message,
      );
    }
  };

  return (
    <main aria-label="HomePage" className="home-page">
      <header aria-label="homepage header" className="homepage-header">
        <div className="header-top">
          <div aria-label="location" className="header-location">
            <p>Location</p>
            <div className="header-location-info">
              <img src={locationIcon} alt="location icon" className="fa" />
              <div className="user_selected_location">
                Ngara
                <img
                  src={arrowDownIcon}
                  alt="arrow down"
                  className="fa arrow"
                ></img>
              </div>
            </div>
          </div>
          <div className="header-notification">
            <button className="notification-btn">
              <img src={bellIcon} alt="bell icon" className="fa" />
            </button>
          </div>
        </div>
        <div className="header-bottom">
          <div className="search-bar">
            <SearchIcon className="fa" onClick={handleSearch} />
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
      </header>

      <section aria-label="categories" className="category-section">
        <div className="section-header">
          <h3>Category</h3>
          <div>See All</div>
        </div>

        <ul className="category-list">
          <CategoryItem name={"Fashion"}>
            <img src={shirtImage} className="category-image"></img>
          </CategoryItem>
          <CategoryItem name="Electronics">
            <img src={electronicsImg} className="category-image"></img>
          </CategoryItem>

          <CategoryItem name="Beauty ">
            <img src={productsImg} className="category-image"></img>
          </CategoryItem>

          <CategoryItem name="Furniture">
            <img src={furnitureImg} className="category-image"></img>
          </CategoryItem>
        </ul>
      </section>

      <section aria-label="Trending" className="trending-section">
        <div className="section-header">
          <h3>Trending</h3>
        </div>
        <ul className="trending-list">
          {firstTenProducts.map((product) => (
            <ProductPreview
              key={product.id}
              id={product.id}
              name={product.title}
              condition={product.condition}
              price={priceString(product.price)}
              location={product.location}
              image={product.images[0]}
            />
          ))}
        </ul>
      </section>

      <NavBar />
    </main>
  );
}
