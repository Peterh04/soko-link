import { useNavigate } from "react-router-dom";
import "../styles/loginRequiredModal.css";
import { useEffect, useState } from "react";

export default function LoginRequired({
  isLoginModalOpen,
  onClose,
  message,
  setIsLoginModalOpen,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoginModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        aria-label="login required modal"
        className={`login-required-modal ${isLoginModalOpen ? "open" : ""}`}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Sign in to {message}</p>
        <button
          type="button"
          className="modal-close"
          aria-label="close dialog"
          onClick={onClose}
        >
          X
        </button>
        <div
          onClick={() => {
            setIsLoginModalOpen(false);
            navigate("/login");
          }}
        >
          Log in to your account to continue
        </div>
        <p>
          Don&apos;t have an account?{" "}
          <span
            className="register-link"
            onClick={() => {
              setIsLoginModalOpen(false);
              navigate("/register");
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
