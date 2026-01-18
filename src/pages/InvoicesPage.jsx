import { useNavigate } from "react-router-dom";
import "../styles/invoicesPage.css";
import BackIcon from "../assets/icons/back.svg?react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function InvoicesPage({ setReceipt }) {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const getUserInvoices = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/invoices/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const sortedInvoices = data.invoices.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setInvoices(sortedInvoices);
      } catch (error) {
        console.error(
          "Failed to fetch invoices",
          error.response?.data || error.message,
        );
      }
    };
    getUserInvoices();
  }, []);

  const navigate = useNavigate();

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
  return (
    <main aria-label="invoices page" className="invoices-page">
      <header
        aria-label="invoices page header"
        className="invoices-page-header"
      >
        <button className="back-btn" onClick={() => navigate("/profile")}>
          <BackIcon className="fa" />
        </button>

        <h3>Invoices</h3>
      </header>

      <section aria-label="invoices section" className="invoices-section">
        {invoices.map((invoice) => (
          <div
            aria-label="invoice"
            className="invoice"
            key={invoice.id}
            onClick={() => {
              setReceipt(invoice);
              navigate(`/payment/success/${invoice.id}`);
            }}
          >
            <h4>Transaction ID: {invoice.transactionID}</h4>
            <h4>Status : Paid</h4>
            <h4>Date : {formatDateTimeLocal(invoice.createdAt)}</h4>
          </div>
        ))}
      </section>
    </main>
  );
}
