import { useEffect, useRef, useState } from "react";
import "../styles/chatPage.css";

import BackIcon from "../assets/icons/back.svg?react";
import PhoneIcon from "../assets/icons/phone.svg?react";
import MennuIcon from "../assets/icons/menu.svg?react";
import SendIcon from "../assets/icons/send.svg?react";
import VoiceIcon from "../assets/icons/voice.svg?react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import api from "../modules/apiClient";
import { getAccessToken } from "../modules/accessTokenModule";

const socket = io(import.meta.env.VITE_API_URL);

export default function ChatPage() {
  const { user } = useAuth();
  const footerRef = useRef(null);

  const { buyerId, vendorId } = useParams();
  const bId = Number(buyerId);
  const vId = Number(vendorId);

  const roomId =
    bId && vId ? (bId < vId ? `${bId}-${vId}` : `${vId}-${bId}`) : null;

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [ismodalOptionOpen, setIsModalOptionOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userInvoiceDetails, setUserInvoiceDetails] = useState({
    number: "",
    amount: 0,
    productId: "",
  });
  const [products, setProducts] = useState([]);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [receiver, setReceiver] = useState(null);

  const isTexting = messageInput.trim().length > 0;

  useEffect(() => {
    if (!window.visualViewport) return;
    const viewport = window.visualViewport;
    const footer = footerRef.current;
    if (!footer) return;

    const originalTransform = "translateY(0px)";
    const adjustFooter = () => {
      const offset = window.innerHeight - viewport.height - viewport.offsetTop;
      footer.style.transform =
        offset > 0 ? `translateY(-${offset}px)` : originalTransform;
    };

    viewport.addEventListener("resize", adjustFooter);
    viewport.addEventListener("scroll", adjustFooter);
    return () => {
      viewport.removeEventListener("resize", adjustFooter);
      viewport.removeEventListener("scroll", adjustFooter);
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/api/messages/${roomId}`);
        setMessages(data.messages || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch messages", error);
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (getAccessToken() === null) return;

    const getProducts = async () => {
      try {
        const { data } = await api.get(`/api/products/vendor/getProducts`);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to get vendor products", error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (!user || !bId || !vId) return;

    const receiverId = user.id === bId ? vId : bId;

    const getReceiverDetails = async () => {
      try {
        const { data } = await api.get(
          `/api/messages/receiver?receiverId=${receiverId}`,
        );
        setReceiver(data.receiver);
      } catch (error) {
        console.error("Failed to fetch receiver", error);
      }
    };

    getReceiverDetails();
  }, [user, bId, vId]);

  useEffect(() => {
    const chatSection = document.querySelector(".chat-section");
    if (chatSection) chatSection.scrollTop = chatSection.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    if (!messageInput.trim() || !user || !roomId) return;

    const receiverId = user.id === bId ? vId : bId;

    const msgData = {
      roomId,
      content: messageInput,
      createdAt: new Date(),
      senderId: user.id,
      receiverId,
      type: "normal",
    };

    socket.emit("sendMessage", msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessageInput("");
  };

  const generateInvoice = async () => {
    if (!user) return;

    const actualBuyerId = user.id === bId ? vId : bId;

    try {
      const { data } = await api.post(`/api/invoices/create`, {
        buyerId: actualBuyerId,
        productId: userInvoiceDetails.productId,
        phone: userInvoiceDetails.number,
        amount: userInvoiceDetails.amount,
      });
      socket.emit("sendMessage", {
        senderId: user.id,
        receiverId: actualBuyerId,
        content: `invoice:${data.invoice.id}`,
        type: "invoice",
      });
    } catch (error) {
      console.error("Failed to create invoice", error);
    }
  };

  if (isLoading || !user || !roomId) {
    return (
      <div className="loading-container">
        <Oval height={60} width={60} visible={true} />
      </div>
    );
  }

  return (
    <main className="chat-page">
      <header className="chat-page-header">
        <div className="chat-page-header-left">
          <div onClick={() => navigate(-1)} className="btn">
            <BackIcon className="fa" />
          </div>
          <div className="vender-profile">
            <div className="vendor-image-container">
              <img
                src={
                  receiver?.profileImage ||
                  "https://images.unsplash.com/photo-1597393922738-085ea04b5a07?auto=format&fit=crop&q=80"
                }
                alt=""
                className="vendor-img"
              />
            </div>
            <h5 className="vendor-name">{receiver?.name || "Vendor"}</h5>
          </div>
        </div>
        <div className="chat-page-header-right">
          <button onClick={() => (window.location.href = "tel:+123456789")}>
            <PhoneIcon className="fa" />
          </button>
          <button onClick={() => setIsModalOptionOpen((prev) => !prev)}>
            <MennuIcon className="fa" />
          </button>
        </div>
      </header>
      <section className="chat-section">
        {messages?.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.senderId === user.id ? "self" : "other"
            }`}
          >
            {msg.type === "normal" ? (
              <>
                <div className="message-content">{msg.content}</div>
                <span className="time">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </>
            ) : (
              <div className="invoice-message">
                {(() => {
                  const invoiceId = msg.content.includes(":")
                    ? msg.content.split(":")[1]
                    : msg.content.replace(/\D/g, "");
                  return (
                    <>
                      <p>Invoice #{invoiceId}</p>
                      <button
                        onClick={() =>
                          navigate(`/payment/${Number(invoiceId)}`)
                        }
                      >
                        Proceed to Payment
                      </button>
                      <span className="time">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </section>
      <div
        className={`option-modal ${ismodalOptionOpen ? "open" : ""}`}
        aria-label="option modal"
      >
        <ul className="option-list" aria-label="option list">
          <li
            className="option"
            aria-label="option"
            onClick={() => setIsInvoiceModalOpen(true)}
          >
            Generate Invoice
          </li>
          <li className="option">Settings</li>
        </ul>
      </div>
      {isInvoiceModalOpen && (
        <div className="invoice-modal" aria-label="invoice modal">
          <h3>Invoice</h3>
          <button onClick={() => setIsInvoiceModalOpen(false)}>X</button>
          <form>
            <input
              type="text"
              name="user-number"
              id="user-number"
              placeholder="Please Enter number"
              required
              onChange={(e) =>
                setUserInvoiceDetails({
                  ...userInvoiceDetails,
                  number: e.target.value,
                })
              }
            />
            <input
              type="number"
              name="invoice-amount"
              id="invoice-amount"
              placeholder="Please Enter amount"
              required
              onChange={(e) =>
                setUserInvoiceDetails({
                  ...userInvoiceDetails,
                  amount: e.target.value,
                })
              }
            />
            <div className="form-group">
              <label
                htmlFor="products-selection"
                aria-label="products selection"
              >
                Choose Product:
              </label>
              <select
                id="products-selection"
                required
                onChange={(e) =>
                  setUserInvoiceDetails({
                    ...userInvoiceDetails,
                    productId: Number(e.target.value),
                  })
                }
              >
                <option value="">-- Select Product --</option>
                {products.map((product) => (
                  <option
                    value={product.id}
                    className="product"
                    aria-label="product"
                    key={product.id}
                  >
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                generateInvoice();
                setIsInvoiceModalOpen(false);
              }}
            >
              Generate Invoice
            </button>
          </form>
        </div>
      )}
      <div className="scroll-spacer"></div>
      <footer ref={footerRef} className="send-message-container">
        <div className="input-container">
          <input
            type="text"
            value={messageInput}
            placeholder="Write your message here"
            onChange={(e) => setMessageInput(e.target.value)}
          />
        </div>
        {!isTexting ? (
          <button>
            <VoiceIcon className="fa" />
          </button>
        ) : (
          <button onClick={sendMessage}>
            <SendIcon className="fa" />
          </button>
        )}
      </footer>
    </main>
  );
}
