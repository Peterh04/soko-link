import "../styles/paymentPage.css";

import BackIcon from "../assets/icons/back.svg?react";
import mpesaIcon from "../assets/icons/mpesa.svg";
import cardIcon from "../assets/icons/debit-card.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

export default function PaymentPage({ setReceipt }) {
  const [selectedId, setSelectedId] = useState();
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [initiatePayment, setInitiatePayment] = useState(false);
  const [confirmedPaymet, setCofirmedPaymet] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedId === 1) {
      // M-Pesa payment
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/mpesa/stkpush`,
          {
            phone: phone,
            amount: invoice?.amount,
            invoiceId: invoice?.id,
          }
        );

        alert("Check your phone to complete the payment!");
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Failed to initiate payment");
      }
    }

    if (selectedId === 2) {
      alert("Card payment integration goes here");
    }
  };

  useEffect(() => {
    const getInvoice = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/invoices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInvoice(data.invoice);
        setPhone(data.invoice.phone);
      } catch (error) {
        console.error("Failed to fetch", error.response?.data || error.message);
      }
    };

    getInvoice();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const intervalId = setInterval(async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/invoices/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.invoice.status === "paid") {
          setReceipt(data.invoice);
          setCofirmedPaymet(true);
          clearInterval(intervalId);

          navigate(`/paymennt/success/${id}`);
        }
      } catch (error) {
        console.error("Failed to fetch", error.response?.data || error.message);
      }
    }, 4000);

    return () => clearInterval(intervalId);
  }, [id, navigate]);

  return (
    <main aria-label="payment page" className="payment-page">
      <header className="payment-page-header">
        <BackIcon className="fa" />
        <h3>Payment Method</h3>
      </header>

      <section aria-label="payment methods" className="payment-methods">
        <div
          className={`payment-method ${selectedId === 1 ? "selected" : ""}`}
          onClick={() => setSelectedId(1)}
        >
          <div className="logo-container">
            <img src={mpesaIcon} alt="mpesa" className="fa" />
          </div>
          <h4>M-Pesa</h4>
          {selectedId === 1 && (
            <div className="checkmark">
              <span className="tick"></span>
            </div>
          )}
        </div>
        <div
          className={`payment-method ${selectedId === 2 ? "selected" : ""}`}
          onClick={() => setSelectedId(2)}
        >
          <div className="logo-container">
            <img src={cardIcon} alt="bank" className="fa" />
          </div>
          <h4>Bank</h4>
          {selectedId === 2 && (
            <div className="checkmark">
              <span className="tick"></span>
            </div>
          )}
        </div>
      </section>

      <section
        aria-label="payment details modal section"
        className="modal-section"
      >
        {(selectedId === 1 || selectedId === 2) && (
          <div className="payment-modal">
            <h3>{selectedId === 1 ? "Mpesa Payment" : "Bank Payment"}</h3>
            <form onSubmit={handleSubmit}>
              {selectedId === 1 && (
                <input
                  type="number"
                  name="user-number"
                  id="user-number"
                  placeholder="Please Enter your number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              )}

              {selectedId === 2 && (
                <>
                  <input
                    type="number"
                    name="user-card-number"
                    placeholder="Card Number"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className="short-number-details">
                    <div className="form-group">
                      <label htmlFor="user-cvv-number">CVV:</label>
                      <input
                        type="number"
                        name="user-cvv-number"
                        id="user-cvv-number"
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="user-card-expiry">Expiry:</label>
                      <input
                        type="number"
                        name="user-card-expiry"
                        id="user-card-expiry"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                onClick={() => {
                  setInitiatePayment(true);
                }}
              >
                {initiatePayment ? (
                  <ThreeDots height={10} width={60} />
                ) : (
                  "  Proceed to Payment"
                )}
              </button>
            </form>

            <img src={selectedId === 1 ? mpesaIcon : cardIcon} className="fa" />
          </div>
        )}
      </section>
    </main>
  );
}
