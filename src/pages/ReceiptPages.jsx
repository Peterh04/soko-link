import "../styles/receiptPage.css";
import { jsPDF } from "jspdf";
import BackIcon from "../assets/icons/back.svg?react";
import barCode from "../assets/barcode.gif";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ReceiptPage({ receipt }) {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5001/api/products/${receipt.productId}`
        );
        setProduct({
          title: data.product.title,
          price: data.product.price,
          image: data.product.images[0],
        });
        console.log(receipt);
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
      <button onClick={downloadReceipt}>Download E-receipt</button>
    </main>
  );
}
