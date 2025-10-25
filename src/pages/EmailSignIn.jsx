import "../styles/EmailSignIn.css";
import googleIcon from "../assets/icons/google.svg";
import appleIcon from "../assets/icons/apple.svg";
import mail from "../assets/icons/mail.svg";
import view from "../assets/icons/view.svg";
import hide from "../assets/icons/hide.svg";
import padlock from "../assets/icons/padlock.svg";
import usePasswordVisiblity from "../hooks/usePasswordVisibility";

export default function EmailSignIn() {
  const { isPasswordVisible, handlePasswordVisibility } =
    usePasswordVisiblity();
  return (
    <main aria-label="EmailSignIn-page" className="emailSignIn-page">
      <div className="logo-container">
        <img src="/src/assets/light_logo.png" alt="soko-link_logo" />
      </div>
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
          <button>Login</button>
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
          Don't have an account? <span>Register</span>
        </p>
      </section>
    </main>
  );
}
