import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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
      setLoading(true);

      try {
        const token = await refreshAccessToken();

        if (token) {
          setAccessToken(token);

          const { data } = await api.get("/api/user/me");
          setUser(data.user);
        } else {
          setUser(null); // Guest
        }
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const logOut = useCallback(async () => {
    try {
      await api.post("/api/users/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      setAccessToken(null);
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
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
