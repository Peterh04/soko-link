import { useEffect, useRef, useState } from "react";
import "../styles/chatPage.css";

import BackIcon from "../assets/icons/back.svg?react";
import PhoneIcon from "../assets/icons/phone.svg?react";
import MennuIcon from "../assets/icons/menu.svg?react";
import SendIcon from "../assets/icons/send.svg?react";
import VoiceIcon from "../assets/icons/voice.svg?react";
import { io } from "socket.io-client";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Oval } from "react-loader-spinner";

const socket = io("http://localhost:5001");

export default function ChatPage({ buyerId, vendorId }) {
  const { user } = useAuth();
  const footerRef = useRef(null);

  const roomId = `${buyerId}-${vendorId}`;

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoadig] = useState(true);

  const isTexting = messageInput.trim().length > 0;

  // Adjust footer for mobile keyboard
  useEffect(() => {
    if (!window.visualViewport) return;

    const viewport = window.visualViewport;
    const footer = footerRef.current;
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

  // Join room + receive messages
  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await axios.get(
          `http://localhost:5001/api/messages/${roomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(data.messages);
        console.log(data.messages);
        setIsLoadig(false);
      } catch (error) {
        console.error(
          "Failed to fetch the messages",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const msgData = {
      roomId,
      content: messageInput,
      createdAt: new Date(),
      senderId: user.id,
      receiverId: vendorId,
    };

    socket.emit("sendMessage", msgData);

    // Add to UI immediately
    setMessages((prev) => [...prev, msgData]);

    setMessageInput("");
  };

  if (isLoading) {
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
          <BackIcon className="fa" />
          <div className="vender-profile">
            <div className="vendor-image-container">
              <img
                src="https://images.unsplash.com/photo-1597393922738-085ea04b5a07?auto=format&fit=crop&q=80"
                alt=""
                className="vendor-img"
              />
            </div>
            <h5 className="vendor-name">Jenny Doe</h5>
          </div>
        </div>

        <div className="chat-page-header-right">
          <button onClick={() => (window.location.href = "tel:+123456789")}>
            <PhoneIcon className="fa" />
          </button>
          <button>
            <MennuIcon className="fa" />
          </button>
        </div>
      </header>

      <section className="chat-section">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.senderId === user.id ? "self" : "other"
            }`}
          >
            <div className="message-content">{msg.content}</div>
            <span className="time">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </section>

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
