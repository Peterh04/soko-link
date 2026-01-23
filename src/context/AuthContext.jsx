import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api, { refreshAccessToken } from "../modules/apiClient";
import { setAccessToken } from "../modules/accessTokenModule";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeUser = async () => {
      console.log("[Auth] Initializing user...");

      try {
        console.log("[Auth] Calling refresh token endpoint...");
        const newToken = await refreshAccessToken();

        if (newToken) {
          console.log("[Auth] Received new access token:", newToken);
          setAccessToken(newToken);

          console.log("[Auth] Fetching user with new access token...");
          const { data } = await api.get("/api/user/me");
          console.log("[Auth] Fetched user:", data.user);
          setUser(data.user);
        } else {
          console.log("[Auth] No valid refresh token, setting user as Guest");
          setUser("Guest");
        }
      } catch (err) {
        console.error("[Auth] Failed to initialize user:", err);
        setUser(null);
      } finally {
        setLoading(false);
        console.log("[Auth] Initialization complete, loading set to false");
      }
    };

    initializeUser();
  }, []);

  const logOut = useCallback(async () => {
    try {
      await api.post("/api/logout");
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
