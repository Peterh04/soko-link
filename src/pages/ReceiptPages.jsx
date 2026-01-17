import "../styles/receiptPage.css";
import { jsPDF } from "jspdf";
import BackIcon from "../assets/icons/back.svg?react";
import barCode from "../assets/barcode.gif";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ReceiptPage({ receipt, vendorId }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [userCommented, setUserCommented] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [review, setReview] = useState({
    content: "",
    score: 0,
  });
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${receipt.productId}`
        );
        setProduct({
          title: data.product.title,
          price: data.product.price,
          image: data.product.images[0],
        });
      } catch (error) {
        console.error(
          "Failed to fetch the product",
          error.response?.data || error.message
        );
      }
    };

    getProduct();
  }, []);

  function formatDateTimeLocal(isoString) {
    const date = new Date(isoString);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = months[date.getMonth()]; // local month
    const day = date.getDate(); // local day
    const year = date.getFullYear(); // local year

    let hours = date.getHours(); // local hours
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // convert 24h to 12h

    return `${month} ${day}, ${year}, ${hours}:${minutes}${ampm}`;
  }

  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Sokolink Receipt", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text(`Invoice ID: ${receipt.id}`, 20, 40);
    doc.text(`Transaction ID: ${receipt.transactionID}`, 20, 50);
    doc.text(`Product: ${product?.title}`, 20, 60);
    doc.text(`Amount Paid: KES ${receipt.amount}`, 20, 70);
    doc.text(`Payment Method: M-Pesa`, 20, 80);
    doc.text(`Time: ${formatDateTimeLocal(receipt.createdAt)}`, 20, 90);

    doc.save(`receipt-${receipt.id}.pdf`);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const hasUserCommented = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/invoices/${receipt.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data.invoice.product);
        setUserCommented(data.invoice.product.alreadyReviewed);
      } catch (error) {
        console.error(
          `Failed to fetch user commented status`,
          error.response?.data || error.message
        );
      }
    };

    hasUserCommented();
  }, [receipt.id]);

  const handleReviewSubmission = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comment`,
        {
          content: review.content,
          images: 2,
          vendorId: receipt.vendorId ? receipt.vendorId : vendorId,
          rating: review.score,
          productId: receipt.productId,
          invoiceId: Number(receipt.id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Submitted Review", data);
      setUserCommented(true);
      setIsReviewModalOpen(false);
    } catch (error) {
      console.error(
        "Failed to submit review",
        error.response?.data || error.message
      );
    }
  };

  return (
    <main aria-label="Receipt Page" className="receipt-page">
      <div
        aria-label="receipt page header"
        className="receipt-page-header-container"
      >
        <div className="receipt-page-header">
          <div className="icon-container" onClick={() => navigate(-1)}>
            <BackIcon className="fa" />
          </div>
          <h3>Detail Payment</h3>
        </div>
      </div>

      <div className="receipt-container">
        <section aria-label="receipt" className="receipt">
          <div className="receipt-item">
            <div className="item-details">
              <div className="item-image-container">
                <img
                  src={product?.image}
                  alt="Purchased Item"
                  className="item-image"
                />
              </div>
              <div className="item-details-meta">
                <div className="item-name">{product?.title}</div>
                <div className="item-price">
                  ksh <span>{product?.price}</span>
                </div>
              </div>
            </div>

            <div className="transaction-details">
              <div className="transaction-detail-container">
                <div>Status</div>
                <div className="transaction-status">Completed</div>
              </div>
              <div className="transaction-detail-container">
                <div>Transaction ID</div>
                <div>#{receipt.transactionID}</div>
              </div>
              <div className="transaction-detail-container">
                <div>Name</div>
                <div>{product?.title}</div>
              </div>
              <div className="transaction-detail-container">
                <div>Payment Method</div>
                <div>M-Pesa</div>
              </div>

              <div className="transaction-detail-container">
                <div>Time</div>
                <div>{formatDateTimeLocal(receipt.createdAt)}</div>
              </div>
            </div>
            <div className="fee-details">
              <div className="fee-detail-container">
                <div>Total Amount</div>
                <div>
                  ksh <span>{receipt.amount}</span>
                </div>
              </div>
              <div className="bar-code-container">
                <img src={barCode} alt="bar code" />
              </div>
            </div>
          </div>
        </section>
      </div>
      {!userCommented && (
        <button
          onClick={() => {
            setIsReviewModalOpen(true);
          }}
          className="reviewBtn"
        >
          Write a review
        </button>
      )}
      <button onClick={downloadReceipt} className="downloadReceiptBtn">
        Download E-receipt
      </button>

      <form
        aria-label="review modal"
        className={`review-modal ${isReviewModalOpen ? "open" : ""}`}
        onSubmit={handleReviewSubmission}
      >
        <h4>Overall and rating</h4>
        <button
          aria-label="close btn"
          className="closeBtn"
          onClick={() => {
            setIsReviewModalOpen(false);
          }}
        >
          X
        </button>

        <div aria-label="review iputs" className="review-inputs">
          <label htmlFor="overall-review">Overall</label>
          <textarea
            name="overall-review"
            id="overall-review"
            maxLength={100}
            placeholder="What is your opinion of the product or the vendor?"
            required
            onChange={(e) => setReview({ ...review, content: e.target.value })}
          ></textarea>
        </div>
        <div aria-label="review iputs" className="review-inputs">
          <label htmlFor="rating-review">Review score</label>
          <div className="review-scores">
            {[1, 2, 3, 4, 5].map((score) => (
              <div
                className={`review-score ${
                  review.score === score ? "active" : ""
                }`}
                key={score}
                onClick={() => setReview((prev) => ({ ...prev, score }))}
              >
                {score}
              </div>
            ))}
          </div>
        </div>
        <button>Add Review</button>
      </form>
    </main>
  );
}
