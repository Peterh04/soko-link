import HomeIcon from "../assets/icons/home.svg?react";
import LikeIcon from "../assets/icons/like.svg?react";
import CartIcon from "../assets/icons/cart.svg?react";
import ChatIcon from "../assets/icons/chat.svg?react";
import UserIcon from "../assets/icons/user1.svg?react";

import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-link selected">
          <HomeIcon className="fa homeIcon" />
          <p>Home</p>
        </li>
        <li className="nav-link" onClick={() => navigate("/wishlist")}>
          <LikeIcon className="fa" />
          <p>Wishlist</p>
        </li>
        <li className="nav-link">
          <CartIcon className="fa" />
          <p>Sell</p>
        </li>
        <li className="nav-link" onClick={() => navigate("/chats")}>
          <ChatIcon className="fa" />
          <p>Chats</p>
        </li>
        <li className="nav-link" onClick={() => navigate("/profile")}>
          <UserIcon className="fa" />
          <p>Profile</p>
        </li>
      </ul>
    </nav>
  );
}
