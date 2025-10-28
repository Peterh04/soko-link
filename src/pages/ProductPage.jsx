import "../styles/productPage.css";
import LikeIcon from "../assets/icons/like.svg?react";
import BackIcon from "../assets/icons/back.svg?react";
import ProductCarousel from "../components/ProductCarousel";
import locationIcon from "../assets/icons/location.svg";
import ChatIcon from "../assets/icons/chat.svg?react";
import PhoneIcon from "../assets/icons/phone.svg?react";

export default function ProductPage() {
  return (
    <main aria-label="Product Page" className="product-page">
      <header aria-label="product pager header" className="product-page-header">
        <button className="back-btn">
          <BackIcon className="fa" />
        </button>
        <h3>Product Details</h3>
        <button>
          <LikeIcon className="fa" />
        </button>
      </header>

      <section
        aria-label="product images preview"
        className="product-images-preview"
      >
        <ProductCarousel />
      </section>

      <section aria-label="Product Overview" className="product-overview">
        <div className="product-meta">
          <img src={locationIcon} className="fa"></img>
          <p>
            Ngara, Nairobi<span>,</span>
          </p>
          <p>
            <span>1</span> day ago
          </p>
        </div>

        <h3>Three seater sofa</h3>
      </section>

      <section aria-label="Vendor Information" className="vendor-info">
        <div className="vender-profile">
          <div className="vendor-image-container">
            <img
              src="https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1022"
              alt=""
              className="vendor-img"
            />
          </div>
          <h5 className="vendor-name">Jenny Doe</h5>
        </div>
        <div className="vender-contact">
          <button>
            <ChatIcon className="fa" />
          </button>
          <button
            onClick={() => {
              window.location.href = "tel:+1234567890";
            }}
          >
            <PhoneIcon className="fa" />
          </button>
        </div>
      </section>
    </main>
  );
}
