import HomeIcon from "../assets/icons/home.svg?react";
import LikeIcon from "../assets/icons/like.svg?react";
import CartIcon from "../assets/icons/cart.svg?react";
import ChatIcon from "../assets/icons/chat.svg?react";
import UserIcon from "../assets/icons/user1.svg?react";

import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <HomeIcon className="fa" />
            <p>Home</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <LikeIcon className="fa" />
            <p>Wishlist</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/sell"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <CartIcon className="fa" />
            <p>Sell</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/chats"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <ChatIcon className="fa" />
            <p>Chats</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <UserIcon className="fa" />
            <p>Profile</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
