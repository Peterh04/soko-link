import usePasswordVisiblity from "../hooks/usePasswordVisibility";
import "../styles/securityPage.css";
import padlock from "../assets/icons/padlock.svg";
import view from "../assets/icons/view.svg";
import hide from "../assets/icons/hide.svg";

export default function SecurityPage() {
  const { isPasswordVisible, handlePasswordVisibility } =
    usePasswordVisiblity();
  return (
    <main aria-label="security page" className="security-page">
      <header
        aria-label="security page header"
        className="security-page-header"
      >
        <h3>Change Password</h3>
      </header>
      <form className="user-meta-form" aria-label="user meta form">
        <div className="input-wrapper">
          <img src={padlock} alt="padlock" className="fa"></img>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="user-password"
            name="userPassword"
            required={true}
            autoComplete="off"
            placeholder="Enter old password"
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
            id="user-password"
            name="userPassword"
            required={true}
            autoComplete="off"
            placeholder="Enter new password"
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

        <button type="submit">Change Password</button>
      </form>
    </main>
  );
}
