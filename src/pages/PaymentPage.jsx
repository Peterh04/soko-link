import "../styles/paymentPage.css";

import BackIcon from "../assets/icons/back.svg?react";
import mpesaIcon from "../assets/icons/mpesa.svg";
import cardIcon from "../assets/icons/debit-card.svg";
import { useState } from "react";

export default function PaymentPage() {
  const [selectedId, setSelectedId] = useState();
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

          {selectedId == 1 && (
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
            <img src={cardIcon} alt="mpesa" className="fa" />
          </div>
          <h4>Bank</h4>

          {selectedId == 2 && (
            <div className="checkmark">
              <span className="tick"></span>
            </div>
          )}
        </div>
      </section>

      <section aria-label="payment details modal section" class="modal-section">
        {(selectedId === 1 || selectedId === 2) && (
          <div className="payment-modal">
            <h3>{selectedId == 1 ? "Mpesa Payment" : "Bank Payment"}</h3>
            <form>
              {selectedId === 1 && (
                <input
                  type="number"
                  name="user-number"
                  id="user-number"
                  placeholder="Please Enter your number"
                  required
                />
              )}

              {selectedId === 2 && (
                <>
                  <input
                    type="number"
                    name="user-card-number"
                    id="user-card--number"
                    placeholder="Please Enter your Card Number"
                    required
                  />
                  <div className="short-number-details">
                    <div className="form-group">
                      <label htmlFor="user-cvv-number">CVV:</label>
                      <input
                        type="number"
                        name="user-cvv-number"
                        id="user-cvv-number"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="user-card-expiry">Expiry:</label>
                      <input
                        type="number"
                        name="user-card-expiry"
                        id="user-card-expiry"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button>Proceed to Payment</button>
            </form>

            <img
              src={selectedId === 1 ? mpesaIcon : cardIcon}
              className="fa"
            ></img>
          </div>
        )}
      </section>
    </main>
  );
}
