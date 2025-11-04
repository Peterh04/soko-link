import { useEffect, useRef } from "react";
import "../styles/chatPage.css";

import BackIcon from "../assets/icons/back.svg?react";
import PhoneIcon from "../assets/icons/phone.svg?react";
import MennuIcon from "../assets/icons/menu.svg?react";
import SendIcon from "../assets/icons/send.svg?react";

export default function ChatPage() {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!window.visualViewport) return;

    const viewport = window.visualViewport;
    const footer = footerRef.current;

    const originalTransform = "translateY(0px)";

    const adjustFooter = () => {
      const offset = window.innerHeight - viewport.height - viewport.offsetTop;

      if (offset > 0) {
        footer.style.transform = `translateY(-${offset}px)`;
      } else {
        footer.style.transform = originalTransform;
      }
    };

    viewport.addEventListener("resize", adjustFooter);
    viewport.addEventListener("scroll", adjustFooter);

    return () => {
      viewport.removeEventListener("resize", adjustFooter);
      viewport.removeEventListener("scroll", adjustFooter);
    };
  }, []);

  return (
    <main aria-label="chat page" className="chat-page">
      <header aria-label="product pager header" className="chat-page-header">
        <div className="chat-page-header-left">
          <BackIcon className="fa" />
          <div className="vender-profile">
            <div className="vendor-image-container">
              <img
                src="https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1022"
                alt=""
                className="vendor-img"
              />
            </div>
            <h5 className="vendor-name">Jenny Doe</h5>
          </div>
        </div>
        <div className="chat-page-header-right">
          <div className="contact-menu">
            <button
              onClick={() => {
                window.location.href = "tel:+1234567890";
              }}
            >
              <PhoneIcon className="fa" />
            </button>

            <button>
              <MennuIcon className="fa" />
            </button>
          </div>
        </div>
      </header>

      <section aria-label="chat screen" className="chat-section">
        {/* messages go here */}
      </section>

      <footer ref={footerRef} className="send-message-container">
        <div className="input-container">
          <input type="text" placeholder="Write your message here" />
        </div>
        <button>
          <SendIcon className="fa" />
        </button>
      </footer>
    </main>
  );
}
