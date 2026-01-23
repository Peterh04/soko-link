import "../styles/EmailSignIn.css";
import axios from "axios";
import googleIcon from "../assets/icons/google.svg";
import appleIcon from "../assets/icons/apple.svg";
import mail from "../assets/icons/mail.svg";
import view from "../assets/icons/view.svg";
import hide from "../assets/icons/hide.svg";
import padlock from "../assets/icons/padlock.svg";
import usePasswordVisiblity from "../hooks/usePasswordVisibility";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AlertBox from "../components/AlertBox";
import { useAlert } from "../context/AlertContext";
import { setAccessToken } from "../modules/accessTokenModule";
export default function EmailSignIn() {
  const { setUser } = useAuth();
  const { alert, setAlert, showAlert, hideAlert } = useAlert();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { isPasswordVisible, handlePasswordVisibility } =
    usePasswordVisiblity();

  const handleForm = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password },
      );

      setAccessToken(data.token);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.error("Login Error");
      showAlert("invalid email or password", "error");
    }
  };

  return (
    <main aria-label="EmailSignIn-page" className="emailSignIn-page">
      <div className="logo-container">
        <img src="/src/assets/light_logo.png" alt="soko-link_logo" />
      </div>

      <AlertBox
        message={alert.message}
        visible={alert.visible}
        type={alert.type}
        onClose={() => hideAlert()}
      />
      <section aria-label="Sign-in section" className="sign-in-section">
        <form role="form" aria-label="login-form form" className="login-form ">
          <div className="form-control">
            <label htmlFor="user-email">Enter your email</label>
            <div className="input-wrapper">
              <img src={mail} className="fa" alt="mail"></img>
              <input
                type="email"
                id="user-email"
                name="userEmail"
                required={true}
                autoComplete="off"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="user-password">Enter your password</label>
            <div className="input-wrapper">
              <img src={padlock} alt="padlock" className="fa"></img>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="user-password"
                name="userPassword"
                required={true}
                autoComplete="off"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          </div>
          <button type="button" onClick={handleForm}>
            Login
          </button>
        </form>
        <p className="divider-text">or </p>
        <div className="sign-in-options">
          <button className="sign-in-option google">
            <img src={googleIcon} className="icon" alt="" />
            Sign in with Google
          </button>

          <button className="sign-in-option apple">
            <img src={appleIcon} className="icon" alt="" />
            Sign in with Apple
          </button>
        </div>

        <p>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </section>
    </main>
  );
}
