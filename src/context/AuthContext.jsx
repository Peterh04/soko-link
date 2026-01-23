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
      setLoading(true); // ensure loading is true on every refresh
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          setAccessToken(newToken); // memory storage
          const { data } = await api.get("/api/user/me", {
            withCredentials: true,
          });
          setUser(data.user);
        } else {
          setUser(null); // not Guest
        }
      } catch (err) {
        console.error("Failed to initialize user", err);
        setUser(null);
      } finally {
        setLoading(false); // only stop loading when done
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
