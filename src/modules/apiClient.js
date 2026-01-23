import axios from "axios";
import { getAccessToken, setAccessToken } from "./accessTokenModule";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function refreshAccessToken() {
  try {
    const response = await api.post("/api/users/token/refresh");

    const token = response.data?.token;
    if (!token) return null;

    setAccessToken(token);
    return token;
  } catch (error) {
    return null;
  }
}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
