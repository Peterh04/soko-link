import usePasswordVisiblity from "../hooks/usePasswordVisibility";
import "../styles/securityPage.css";
import BackIcon from "../assets/icons/back.svg?react";
import padlock from "../assets/icons/padlock.svg";
import view from "../assets/icons/view.svg";
import hide from "../assets/icons/hide.svg";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

export default function SecurityPage() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { logOut } = useAuth();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const { isPasswordVisible, handlePasswordVisibility } =
    usePasswordVisiblity();

  const handlePasswordForm = async (e) => {
    const token = localStorage.getItem("accessToken");
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/update/password`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      showAlert("Successfully updated your password", "success", 1500);
      logOut();
    } catch (error) {
      showAlert("Failed to update your password", "error");
      console.error(
        "Failed to update user Password",
        error.response?.data || error.message,
      );
    }
  };
  return (
    <main aria-label="security page" className="security-page">
      <header
        aria-label="security page header"
        className="security-page-header"
      >
        <button className="back-btn" onClick={() => navigate("/profile")}>
          <BackIcon className="fa" />
        </button>

        <h3>Change Password</h3>
      </header>
      <form className="user-meta-form" aria-label="user meta form">
        <div className="input-wrapper">
          <img src={padlock} alt="padlock" className="fa"></img>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="user-old-password"
            name="userPassword"
            required={true}
            autoComplete="off"
            placeholder="Enter old password"
            onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
          />
          <button
            className="btn-password-toggle"
            onClick={handlePasswordVisibility}
          >
            {isPasswordVisible ? (
              <img className="fa eye" alt="view" src={view}></img>
            ) : (
              <img className="fa eye" alt="hide" src={hide}></img>
            )}
          </button>
        </div>

        <div className="input-wrapper">
          <img src={padlock} alt="padlock" className="fa"></img>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="user-new-password"
            name="userPassword"
            required={true}
            autoComplete="off"
            placeholder="Enter new password"
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
          <button
            className="btn-password-toggle"
            onClick={handlePasswordVisibility}
          >
            {isPasswordVisible ? (
              <img className="fa eye" alt="view" src={view}></img>
            ) : (
              <img className="fa eye" alt="hide" src={hide}></img>
            )}
          </button>
        </div>

        <button type="submit" onClick={handlePasswordForm}>
          Change Password
        </button>
      </form>
    </main>
  );
}
