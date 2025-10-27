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

import sofaPreview from "../assets/sofaPreview.jpeg";
import NavBar from "../components/NavBar";

export default function HomePage() {
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
            <SearchIcon className="fa" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </header>

      <section aria-label="categories" className="category-section">
        <div className="section-header">
          <h3>Category</h3>

          <p>See All</p>
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
          <div className="product-preview">
            <div className="product-preview-img-container">
              <img src={sofaPreview} alt={name} className="prod-image" />
            </div>
            <div className="product-info">
              <p className="price">Ksh 40,000</p>
              <h3 className="prod-name">Three seater for sale</h3>
              <div className="product-meta">
                <p className="prod-location">Ngara, Nairobi</p>
                <p className="prod-condition">Brand new</p>
              </div>
            </div>
          </div>

          <div className="product-preview">
            <div className="product-preview-img-container">
              <img src={sofaPreview} alt={name} className="prod-image" />
            </div>
            <div className="product-info">
              <p className="price">Ksh 40,000</p>
              <h3 className="prod-name">Three seater for sale</h3>
              <div className="product-meta">
                <p className="prod-location">Ngara, Nairobi</p>
                <p className="prod-condition">Brand new</p>
              </div>
            </div>
          </div>

          <div className="product-preview">
            <div className="product-preview-img-container">
              <img src={sofaPreview} alt={name} className="prod-image" />
            </div>
            <div className="product-info">
              <p className="price">Ksh 40,000</p>
              <h3 className="prod-name">Three seater for sale</h3>
              <div className="product-meta">
                <p className="prod-location">Ngara, Nairobi</p>
                <p className="prod-condition">Brand new</p>
              </div>
            </div>
          </div>

          <div className="product-preview">
            <div className="product-preview-img-container">
              <img src={sofaPreview} alt={name} className="prod-image" />
            </div>
            <div className="product-info">
              <p className="price">Ksh 40,000</p>
              <h3 className="prod-name">Three seater for sale</h3>
              <div className="product-meta">
                <p className="prod-location">Ngara, Nairobi</p>
                <p className="prod-condition">Brand new</p>
              </div>
            </div>
          </div>
        </ul>
      </section>

      <NavBar />
    </main>
  );
}
