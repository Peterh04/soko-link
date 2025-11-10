import "../styles/receiptPage.css";
import BackIcon from "../assets/icons/back.svg?react";
import barCode from "../assets/barcode.gif";
export default function ReceiptPage() {
  return (
    <main aria-label="Receipt Page" className="receipt-page">
      <div
        aria-label="receipt page header"
        className="receipt-page-header-container"
      >
        <div className="receipt-page-header">
          <div className="icon-container">
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
                  src="https://nobero.com/cdn/shop/files/WhatsAppImage2024-05-14at12.33.18PM_cb1370a5-db13-4212-b840-cc2377484f2a.jpg?v=1755606410"
                  alt="Purchased Item"
                  className="item-image"
                />
              </div>
              <div className="item-details-meta">
                <div className="item-name">T-shirt</div>
                <div className="item-price">
                  ksh <span>2000</span>
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
                <div>#TXN12345</div>
              </div>
              <div className="transaction-detail-container">
                <div>Name</div>
                <div>KFC Bucket</div>
              </div>
              <div className="transaction-detail-container">
                <div>Payment Method</div>
                <div>M-Pesa</div>
              </div>

              <div className="transaction-detail-container">
                <div>Time</div>
                <div>April 17, 2025, 9:00Am</div>
              </div>
            </div>
            <div className="fee-details">
              <div className="fee-detail-container">
                <div>Total Amount</div>
                <div>
                  ksh <span>2,000</span>
                </div>
              </div>
              <div className="bar-code-container">
                <img src={barCode} alt="bar code" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <button>Download E-receipt</button>
    </main>
  );
}
