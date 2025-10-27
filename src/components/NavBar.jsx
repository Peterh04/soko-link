import HomeIcon from "../assets/icons/home.svg?react";
import LikeIcon from "../assets/icons/like.svg?react";
import CartIcon from "../assets/icons/cart.svg?react";
import ChatIcon from "../assets/icons/chat.svg?react";
import UserIcon from "../assets/icons/user1.svg?react";

import "../styles/navbar.css";

export default function NavBar() {
  return (
    <nav>
      <ul className="nav-links">
        <li className="nav-link selected">
          <HomeIcon className="fa" />
          <p>Home</p>
        </li>
        <li className="nav-link">
          <LikeIcon className="fa" />
          <p>Wishlist</p>
        </li>
        <li className="nav-link">
          <CartIcon className="fa" />
          <p>Cart</p>
        </li>
        <li className="nav-link">
          <ChatIcon className="fa" />
          <p>Chat</p>
        </li>
        <li className="nav-link">
          <UserIcon className="fa" />
          <p>Profile</p>
        </li>
      </ul>
    </nav>
  );
}
