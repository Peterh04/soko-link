import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/chatsPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { useAuth } from "../context/AuthContext";

export default function ChatsPage({
  setBuyerId,
  setVendorId,
  setSender,
  setReceiver,
  setIsLoginModalOpen,
}) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoadig] = useState(true);

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user || user === "Guest") {
      setIsLoginModalOpen(true);
      return;
    }
  }, [user, loading, setIsLoginModalOpen]);

  useEffect(() => {
    const getMessages = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/messages/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setMessages(data.messages);

        setIsLoadig(false);
      } catch (error) {
        console.error(
          "Failed to fetch messages",
          error.response?.data || error.message,
        );
      }
    };

    getMessages();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Oval height={60} width={60} visible={true} />
      </div>
    );
  }
  return (
    <main aria-label="chats page" className="chats-page">
      <header className="chat-page-header">
        <h3>Chats</h3>
      </header>
      <div className="chats-section">
        {messages.map((msg) => {
          const isSender = msg.sender.id === user.id;
          const chatPartner = isSender ? msg.receiver : msg.sender;

          return (
            <div
              className="chat-container"
              key={msg.id}
              onClick={() => {
                setBuyerId(isSender ? msg.sender.id : msg.receiver.id);
                setVendorId(isSender ? msg.receiver.id : msg.sender.id);
                navigate("/connect");
              }}
            >
              <div className="vender-profile">
                <div className="vendor-image-container">
                  <img
                    src={
                      chatPartner?.profileImage ||
                      "https://images.unsplash.com/photo-1597393922738-085ea04b5a07"
                    }
                    alt={chatPartner?.name}
                  />
                </div>
                <h5 className="vendor-name">{chatPartner?.name}</h5>
              </div>
            </div>
          );
        })}
      </div>
      <NavBar />
    </main>
  );
}
