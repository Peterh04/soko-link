import TickCircle from "../components/TickCircle";
import "../styles/successPurchasePage.css";

export default function SuccessfulOrderPage() {
  return (
    <main aria-label="success purchase page" className="success-purchase-page">
      <div className="success-purchase-modal">
        <TickCircle />
        <h3>Order Succesful</h3>
        <p>Thank you for your purchase!</p>
        <button>View Order</button>
        <button className="style-btn">View E-receipt</button>
      </div>
    </main>
  );
}
