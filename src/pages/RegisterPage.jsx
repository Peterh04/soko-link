import "../styles/RegisterPage.css";
import googleIcon from "../assets/icons/google.svg";
import appleIcon from "../assets/icons/apple.svg";
import user from "../assets/icons/user.svg";
import mail from "../assets/icons/mail.svg";
import view from "../assets/icons/view.svg";
import hide from "../assets/icons/hide.svg";
import padlock from "../assets/icons/padlock.svg";
import usePasswordVisiblity from "../hooks/usePasswordVisibility";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { isPasswordVisible, handlePasswordVisibility } =
    usePasswordVisiblity();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = form;

    if (confirmPassword !== password) {
      setPasswordMismatch(true);
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:5001/api/users/register",
          { name, email, password }
        );

        navigate("/login/email");
      } catch (error) {
        console.error(
          "Registration error",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <main aria-label="Register-page" className="register-page">
      <section aria-label="register section" className="register-section">
        <form
          role="form"
          aria-label="register-form form"
          className="register-form"
        >
          <div className="form-control">
            <label htmlFor="user-name">Enter your name</label>
            <div className="input-wrapper">
              <img src={user} className="fa" alt="mail"></img>
              <input
                type="text"
                id="user-name"
                name="userName"
                required={true}
                autoComplete="off"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>
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
            <div className={`input-wrapper ${passwordMismatch ? "error" : ""}`}>
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

          <div className="form-control">
            <label htmlFor="re-entry-password">Re-enter your password</label>
            <div className={`input-wrapper ${passwordMismatch ? "error" : ""}`}>
              <img src={padlock} alt="padlock" className="fa"></img>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="re-entry-password"
                name="userPassword"
                required={true}
                autoComplete="off"
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
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
          <button onClick={handleForm}>Sign up</button>
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
          You do have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </section>
    </main>
  );
}
