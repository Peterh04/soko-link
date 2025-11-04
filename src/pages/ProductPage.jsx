import "../styles/productPage.css";
import LikeIcon from "../assets/icons/like.svg?react";
import BackIcon from "../assets/icons/back.svg?react";
import ProductCarousel from "../components/ProductCarousel";
import locationIcon from "../assets/icons/location.svg";
import ChatIcon from "../assets/icons/chat.svg?react";
import PhoneIcon from "../assets/icons/phone.svg?react";
import storeIcon from "../assets/icons/store.svg";
import ClockIcon from "../assets/icons/clock.svg?react";
import InvoiceIcon from "../assets/icons/invoice.svg?react";
import FeedbackContainer from "../components/FeedbackContainer";

import { useState } from "react";

export default function ProductPage() {
  const [text, setText] =
    useState(`It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.`);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isStoreExpanded, setIsStoreExpanded] = useState(false);

  const handleStoreExpansion = () => {
    setIsStoreExpanded((cond) => !cond);
  };

  const MAX_WORDS = 30;

  const words = text.trim().split(/\s+/);
  const isLongText = words.length > MAX_WORDS;

  const displayText = isExpanded
    ? text
    : words.slice(0, MAX_WORDS).join(" ") + (isLongText ? "..." : "");

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

      <ProductCarousel />

      <div className="product-details-column">
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

        <section aria-label="product Information" className="product-info">
          <h2>Product Details</h2>
          <p>
            {displayText}{" "}
            {isLongText && (
              <span onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Show less" : "Read more"}
              </span>
            )}
          </p>
        </section>

        <section aria-label="store Information" className="store-info">
          <div
            className={`store-container ${isStoreExpanded ? "expanded" : ""}`}
          >
            <div className="store-header">
              <div className="store-header-title">
                <img src={storeIcon} alt="" className="fa" />
                <h4>Store Address</h4>
              </div>

              {!isStoreExpanded && (
                <span onClick={handleStoreExpansion}>Show ⌄</span>
              )}
            </div>

            {isStoreExpanded && (
              <>
                <div className="product-meta">
                  <p className="prod-location">
                    <img src={locationIcon} alt="map" className="fa" />
                    Nairobi{" "}
                  </p>
                  <p>Nairobi Central</p>
                </div>

                <p className="prod-specific-location">
                  Bebabeba trade centre shop no D18 grounnd floor along tom
                  mboya street
                </p>

                <div className="store-timelines">
                  <ClockIcon className="fa" />
                  <span className="store-status">Open now</span>
                  <p className="store-days">Mon - Sat</p>
                  <p className="store-hours">08:00 - 18:00</p>
                </div>

                <span className="hide-span" onClick={handleStoreExpansion}>
                  Hide ^
                </span>
              </>
            )}
          </div>
        </section>

        <section
          aria-label="vendor history Information"
          className="vendor-history-info"
        >
          <div className="vendor-history-container">
            <div className="section-header">
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

              <p>View all ads(42)</p>
            </div>

            <div className="feedback-section">
              <div className="section-header">
                <h4>Feedback about vendor</h4>
                <p>view all(10)</p>
              </div>
              <div className="feedback-showcase">
                <FeedbackContainer />
                <FeedbackContainer />
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="price-container">
          <p>Total Price</p>
          <p>
            KSh<span>15,000</span>
          </p>
        </div>

        <button>
          <InvoiceIcon className="fa" />
          Request Invoice
        </button>
      </footer>
    </main>
  );
}
