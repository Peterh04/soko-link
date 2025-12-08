import "../styles/productPage.css";
import LikeIcon from "../assets/icons/like.svg?react";
import FillLikeIcon from "../assets/icons/filledLike.svg?react";
import BackIcon from "../assets/icons/back.svg?react";
import ProductCarousel from "../components/ProductCarousel";
import locationIcon from "../assets/icons/location.svg";
import DeleteIcon from "../assets/icons/delete.svg?react";
import ChatIcon from "../assets/icons/chat.svg?react";
import PhoneIcon from "../assets/icons/phone.svg?react";
import storeIcon from "../assets/icons/store.svg";
import ClockIcon from "../assets/icons/clock.svg?react";
import InvoiceIcon from "../assets/icons/invoice.svg?react";
import FeedbackContainer from "../components/FeedbackContainer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Oval } from "react-loader-spinner";

export default function ProductPage({ setBuyerId, setVendorId }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [text, setText] =
    useState(`It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here', making it
            look like readable English.`);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isStoreExpanded, setIsStoreExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleStoreExpansion = () => {
    setIsStoreExpanded((cond) => !cond);
  };

  console.log("Product ID from URL:", id);

  const MAX_WORDS = 30;

  const words = text.trim().split(/\s+/);
  const isLongText = words.length > MAX_WORDS;

  const displayText = isExpanded
    ? text
    : words.slice(0, MAX_WORDS).join(" ") + (isLongText ? "..." : "");

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/api/products/${id}`
        );
        const filteredProduct = {
          id: data.product.id,
          title: data.product.title,
          price: data.product.price,
          images: data.product.images,
          location: data.product.location,
          description: data.product.description,
          createdAt: data.product.createdAt,
          vendorId: data.product.vendorId,
        };
        setProduct(filteredProduct);
        setVendorId(filteredProduct.vendorId);
        setBuyerId(user.id);
        setText(filteredProduct.description);
        setIsLoading(false);
        console.log(filteredProduct);
      } catch (error) {
        console.error(
          "Failed to fetch product",
          error.response?.data || error.message
        );
      }
    };
    fetchProduct();
  }, [id]);

  //fetchComment
  useEffect(() => {
    if (!product.vendorId) return;

    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/api/comment/${product.vendorId}`
        );
        const filteredComments = data.comments.map((comment) => ({
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          rating: comment.rating,
          images: comment.images,
          buyer: comment.buyer,
        }));
        setComments(filteredComments);
        console.log(filteredComments);
      } catch (error) {
        console.error(
          "Failed to fetch comments",
          error.response?.data || error.message
        );
      }
    };

    fetchComments();
  }, [product.vendorId]);

  useEffect(() => {
    const isLiked = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          "http://localhost:5001/api/user/userWishlist/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Succesfully fetched the wishlist", data.wishliist);
        const liked = data.wishliist.some(
          (item) => item.Product && item.Product.id === product.id
        );
        setIsLiked(liked);
        console.log(`Already ${liked}`);
      } catch (error) {
        console.error(
          "Failed to fetch wishlist",
          error.response?.data || error.message
        );
      }
    };

    isLiked();
  }, [product.id]);

  const priceString = (price) => Number(price).toLocaleString();

  const getDays = (creationDateString) => {
    const creationDate = new Date(creationDateString);
    const currentDate = new Date();
    const diffMs = currentDate - creationDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return Math.floor(diffDays);
  };

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleLiking = async () => {
    const token = localStorage.getItem("accessToken");
    const productId = product.id;

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/user/userWishlist/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Added product to cartlist");
      setIsLiked(true);
    } catch (error) {
      console.error(
        "Failed to add to wishlist",
        error.response?.data || error.message
      );
    }
  };

  const handleUnliking = async () => {
    const token = localStorage.getItem("accessToken");
    const productId = product.id;
    try {
      const { data } = await axios.delete(
        "http://localhost:5001/api/user/userWishlist/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productId },
        }
      );
      console.log("Removed Product from wishlist");
      setIsLiked(false);
    } catch (error) {
      console.error(
        "Failed to remove product from wishlist",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");
    const productId = product.id;
    try {
      const { data } = await axios.delete(
        "http://localhost:5001/api/products/vendor/deleteProduct",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          data: { productId },
        }
      );
      console.log("Succesfully deleted product");
    } catch (error) {
      console.error(
        "Failed to delete product",
        error.response?.data || error.message
      );
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Oval height={60} width={60} visible={true} />
      </div>
    );
  }

  return (
    <main aria-label="Product Page" className="product-page">
      <header aria-label="product pager header" className="product-page-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <BackIcon className="fa" />
        </button>
        <h3>Product Details</h3>

        {isLiked ? (
          <button className="unlike" onClick={handleUnliking}>
            <FillLikeIcon className="fa" />
          </button>
        ) : (
          <button className="like" onClick={handleLiking}>
            <LikeIcon className="fa" />
          </button>
        )}

        {product?.vendorId == user.id && (
          <button
            className="back-btn"
            onClick={() => {
              handleDelete();
              navigate("/");
            }}
          >
            <DeleteIcon className="fa" />
          </button>
        )}
      </header>

      <ProductCarousel images={product.images || []} />

      <div className="product-details-column">
        <section aria-label="Product Overview" className="product-overview">
          <div className="product-meta">
            <img src={locationIcon} className="fa"></img>
            <p>
              {product.location}
              <span>,</span>
            </p>
            <p>
              <span>{getDays(product.createdAt)}</span>{" "}
              {getDays(product.createdAt) === 1 ? "day ago" : "days ago"}
            </p>
          </div>

          <h3>{product.title}</h3>
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
            <button onClick={() => navigate("/connect")}>
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
                <p>view all({comments.length})</p>
              </div>
              <div className="feedback-showcase">
                {comments.slice(0, 2).map((comment) => (
                  <FeedbackContainer
                    key={comment.id}
                    name={comment.buyer.name}
                    comment={comment.content}
                    date={getDate(comment.createdAt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="price-container">
          <p>Total Price</p>
          <p>
            KSh<span>{priceString(product.price)}</span>
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
