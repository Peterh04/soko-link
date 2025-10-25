import "../styles/signInPage.css";
import googleIcon from "../assets/icons/google.svg";
import appleIcon from "../assets/icons/apple.svg";

export default function SignInPage() {
  return (
    <main aria-label="SignInPage" className="signIn-page">
      <div className="logo-container">
        <img src="/src/assets/light_logo.png" alt="soko-link_logo" />
      </div>
      <div className="bottom-section">
        <h1>
          Shop Smarter, Faster with{" "}
          <span className="signIn-span">SokoLink</span>
        </h1>

        <div className="sign-in-options">
          <button className="sign-in-option google">
            <img src={googleIcon} className="icon" alt="" />
            Sign in with Google
          </button>

          <button className="sign-in-option apple">
            <img src={appleIcon} className="icon" alt="" />
            Sign in with Apple
          </button>

          <p className="divider-text">or </p>

          <button className="sign-in-option email">Sign in with Email</button>

          <button className="sign-in-option guest">Continue as Guest</button>
        </div>
      </div>
    </main>
  );
}
