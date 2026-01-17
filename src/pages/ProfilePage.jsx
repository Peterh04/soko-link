import "../styles/profilePage.css";

import PenIcon from "../assets/icons/pen.svg?react";
import TickIcon from "../assets/icons/tick.svg?react";
import CameraIcon from "../assets/icons/camera.svg?react";
import LikeIcon from "../assets/icons/like.svg?react";
import InvoiceIcon from "../assets/icons/invoice.svg?react";
import ShieldIIcon from "../assets/icons/shield.svg?react";
import LogoutIcon from "../assets/icons/logout.svg?react";
import PhoneIcon from "../assets/icons/phone.svg?react";
import FowardIcon from "../assets/icons/foward.svg?react";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ setIsLoginModalOpen }) {
  const { user, logOut, setUser, loading } = useAuth();
  const [isEdited, setIsEdited] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    profileImage: "",
  });

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);

    if (form.profileImage) {
      formData.append("profileImage", form.profileImage);
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data.user);
      setIsEdited(false);
    } catch (error) {
      console.error("Failed to update", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (loading) return;

    if (!user || user === "Guest") {
      setIsLoginModalOpen(true);
      return;
    }
  }, [user, loading, setIsLoginModalOpen]);
  return (
    <main aria-label="profile page" className="profile-page">
      <header aria-label="profile page header" className="profile-page-header">
        <h3>Profile</h3>
      </header>
      <section aria-label="profile details" className="profile-details">
        <div className="user-profile">
          <div className="user-image-container">
            <img
              src={
                user?.profileImage ||
                "https://images.unsplash.com/photo-1597393922738-085ea04b5a07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1022"
              }
              alt=""
              className="user-img"
            />
          </div>

          <form className="user-meta" aria-label="user meta form">
            <div className="input-container">
              <input
                id="user-name"
                aria-label="user name"
                placeholder={user?.name || ""}
                onChange={(e) => {
                  setIsEdited(true);
                  setForm({ ...form, name: e.target.value });
                }}
              ></input>
              <label htmlFor="user-name">
                <PenIcon className="fa" />
              </label>
            </div>
            <div className="input-container">
              <input
                id="user-email"
                aria-label="user email"
                placeholder={user?.email || ""}
                onChange={(e) => {
                  setIsEdited(true);
                  setForm({ ...form, email: e.target.value });
                }}
              ></input>
              <label htmlFor="user-email">
                <PenIcon className="fa" />
              </label>
            </div>
            <div className="input-container user-img-container">
              <input
                type="file"
                id="imageUpload"
                name="profileImage"
                accept="image/*"
                onChange={(e) => {
                  setIsEdited(true);
                  setForm({ ...form, profileImage: e.target.files[0] });
                }}
              ></input>
              <label htmlFor="imageUpload">
                <CameraIcon className="fa" />
              </label>
            </div>
          </form>
        </div>
      </section>

      <section aria-label="general settings" className="general-settings">
        <h4>General</h4>
        <div className="link-card" onClick={() => navigate("/wishlist")}>
          <div className="link-content">
            <div className="icon-container">
              <LikeIcon className="fa" />
            </div>
            Wishlist
          </div>
          <FowardIcon className="fa" />
        </div>

        <div className="link-card" onClick={() => navigate("/invoices")}>
          <div className="link-content">
            <div className="icon-container">
              <InvoiceIcon className="fa" />
            </div>
            Invoices
          </div>
          <FowardIcon className="fa" />
        </div>

        <div
          className="link-card"
          onClick={() => navigate("/profile/security")}
        >
          <div className="link-content">
            <div className="icon-container">
              <ShieldIIcon className="fa" />
            </div>
            Security
          </div>
          <FowardIcon className="fa" />
        </div>

        <div className="link-card">
          <div className="link-content">
            <div className="icon-container">
              <PhoneIcon className="fa" />
            </div>
            Contact Us
          </div>
          <FowardIcon className="fa" />
        </div>

        <div className="link-card" onClick={logOut}>
          <div className="link-content logout">
            <div className="icon-container logout">
              <LogoutIcon className="fa" />
            </div>
            Logout
          </div>
          <FowardIcon className="fa logoutIcon" />
        </div>
      </section>

      {isEdited && <button onClick={handleForm}>Save</button>}
      <NavBar />
    </main>
  );
}
