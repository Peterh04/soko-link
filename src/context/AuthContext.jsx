import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5001/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data.user);
      } catch (error) {
        console.error(
          "Failed to fetch user",
          error.response?.data || error.message
        );
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
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
