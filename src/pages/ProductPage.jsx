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

import { useAuth } from "../context/AuthContext";
import { Oval } from "react-loader-spinner";
import { io } from "socket.io-client";
import { useAlert } from "../context/AlertContext";
import api from "../modules/apiClient";

const socket = io(import.meta.env.VITE_API_URL);

export default function ProductPage({
  setBuyerId,
  setVendorId,
  setMessages,
  vendorReviews,
  setVendorReviews,
  setIsLoginModalOpen,
}) {
  const { user, loading } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
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
  const [isLoading, setIsLoading] = useState(true);
  const [vendor, setVendor] = useState({});

  const roomId =
    user && product.vendorId
      ? user.id < product.vendorId
        ? `${user.id}-${product.vendorId}`
        : `${product.vendorId}-${user.id}`
      : null;

  const handleStoreExpansion = () => {
    setIsStoreExpanded((cond) => !cond);
  };

  const MAX_WORDS = 30;

  const words = text.trim().split(/\s+/);
  const isLongText = words.length > MAX_WORDS;

  const displayText = isExpanded
    ? text
    : words.slice(0, MAX_WORDS).join(" ") + (isLongText ? "..." : "");

  // Fetch product
  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/api/products/${id}`);
        const filteredProduct = {
          id: data.product.id,
          title: data.product.title,
          price: data.product.price,
          images: data.product.images,
          vendor_phone: data.product.vendor_phone,
          location: data.product.location,
          description: data.product.description,
          createdAt: data.product.createdAt,
          vendorId: data.product.vendorId,
        };
        setProduct(filteredProduct);
        setVendor(data.product.vendor);
        setVendorId(filteredProduct.vendorId);
        setBuyerId(user.id);
        setText(filteredProduct.description);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Failed to fetch product",
          error.response?.data || error.message,
        );
      }
    };
    fetchProduct();
  }, [id, user, loading]);

  //fetchComment
  useEffect(() => {
    if (!product.vendorId) return;

    const fetchComments = async () => {
      try {
        const { data } = await api.get(`/api/comment/${product.vendorId}`);
        const filteredComments = data.comments.map((comment) => ({
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          rating: comment.rating,
          images: comment.images,
          buyer: comment.buyer,
        }));
        setVendorReviews(filteredComments);
      } catch (error) {
        console.error(
          "Failed to fetch comments",
          error.response?.data || error.message,
        );
      }
    };

    fetchComments();
  }, [product.vendorId]);

  useEffect(() => {
    const isLiked = async () => {
      try {
        const { data } = await api.get("/api/user/userWishlist/");
        const liked = data.wishliist.some(
          (item) => item.Product && item.Product.id === product.id,
        );
        setIsLiked(liked);
      } catch (error) {
        console.error(
          "Failed to fetch wishlist",
          error.response?.data || error.message,
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
    if (loading) return;

    if (!user || user === "Guest") {
      setIsLoginModalOpen(true);
      return;
    }
    const productId = product.id;

    try {
      const { data } = await api.post("/api/user/userWishlist/add", {
        productId,
      });

      setIsLiked(true);
    } catch (error) {
      console.error(
        "Failed to add to wishlist",
        error.response?.data || error.message,
      );
    }
  };

  const handleUnliking = async () => {
    const productId = product.id;
    try {
      const { data } = await api.delete("/api/user/userWishlist/remove", {
        data: { productId },
      });
      setIsLiked(false);
    } catch (error) {
      console.error(
        "Failed to remove product from wishlist",
        error.response?.data || error.message,
      );
    }
  };

  const handleDelete = async () => {
    const productId = product.id;
    try {
      const { data } = await api.delete("/api/products/vendor/deleteProduct", {
        data: { productId },
      });
      showAlert("Successfully deleted the product", "success", 1500);
    } catch (error) {
      showAlert("Failed to delete the product", "error");
      console.error(
        "Failed to delete product",
        error.response?.data || error.message,
      );
    }
  };

  if (loading || isLoading) {
    return (
      <div className="loading-container">
        <Oval height={60} width={60} visible={true} />
      </div>
    );
  }

  const requestInvoice = () => {
    if (!user || user === "Guest") {
      setIsLoginModalOpen(true);
      return;
    }
    const receiverId = product.vendorId;
    const senderId = user.id;

    const roomId =
      senderId < receiverId
        ? `${senderId}-${receiverId}`
        : `${receiverId}-${senderId}`;

    const msgData = {
      roomId,
      content: `Hello, please could you send me the invoice of ${
        product.title
      } priced at ${priceString(product.price)}KSh`,
      createdAt: new Date(),
      senderId,
      receiverId,
      type: "normal",
    };

    socket.emit("sendMessage", msgData);

    setMessages((prev) => [...prev, msgData]);
  };

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

        {user && product?.vendorId === user.id && (
          <button
            className="delete-btn"
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
            <p>{product.location}</p>
            <p className="days">
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
                src={
                  vendor.profileImage
                    ? vendor?.profileImage
                    : "https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1022"
                }
                alt={vendor?.name}
                className="vendor-img"
              />
            </div>
            <h5 className="vendor-name">{vendor?.name}</h5>
          </div>
          <div className="vender-contact">
            <button
              onClick={() => {
                if (!user || user === "Guest") {
                  setIsLoginModalOpen(true);
                  return;
                }

                navigate(`/connect/${user.id}/${product.vendorId}`);
              }}
            >
              <ChatIcon className="fa" />
            </button>
            <button
              onClick={() => {
                if (!user || user === "Guest") {
                  setIsLoginModalOpen(true);
                  return;
                }

                window.location.href = `tel:+${product.vendor_phone}`;
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
                    src={vendor.profileImage}
                    alt={vendor.name}
                    className="vendor-img"
                  />
                </div>
                <h5 className="vendor-name">{vendor.name}</h5>
              </div>

              <div onClick={() => navigate("/products")}>
                View all ads({vendor.totalProducts})
              </div>
            </div>

            <div className="feedback-section">
              <div className="section-header">
                <h4>Feedback about vendor</h4>
                <div onClick={() => navigate("/reviews")}>
                  view all({vendorReviews.length})
                </div>
              </div>
              <div className="feedback-showcase">
                {vendorReviews.slice(0, 2).map((comment) => (
                  <FeedbackContainer
                    key={comment.id}
                    name={comment.buyer.name}
                    comment={comment.content}
                    profileImage={comment.buyer.profileImage}
                    date={getDate(comment.createdAt)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="scroll-spacer"></div>

      <footer>
        <div className="price-container">
          <p>Total Price</p>
          <p>
            KSh<span>{priceString(product.price)}</span>
          </p>
        </div>

        <button
          onClick={() => {
            socket.emit("joinRoom", { roomId });
            requestInvoice();
            navigate(`/connect/${user.id}/${product.vendorId}`);
          }}
        >
          <InvoiceIcon className="fa" />
          Request Invoice
        </button>
      </footer>
    </main>
  );
}
