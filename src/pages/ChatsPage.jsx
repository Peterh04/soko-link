import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/chatsPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

export default function ChatsPage({ setBuyerId, setVendorId }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoadig] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(
          "http://localhost:5001/api/messages/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(data.messages);
        console.log(data);
        setIsLoadig(false);
      } catch (error) {
        console.error(
          "Failed to fetch messages",
          error.response?.data || error.message
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
        {messages.map((msg) => (
          <div
            className="chat-container"
            onClick={() => {
              setBuyerId(msg.senderId);
              setVendorId(msg.receiverId);
              navigate("/connect");
            }}
          >
            <div className="vender-profile">
              <div className="vendor-image-container">
                <img
                  src={msg.sender.profileImage}
                  alt={`${msg.sender.name} image`}
                  className="vendor-img"
                />
              </div>
              <h5 className="vendor-name">{msg.sender.name}</h5>
            </div>
          </div>
        ))}
      </div>
      <NavBar />
    </main>
  );
}
