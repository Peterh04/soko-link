import axios from "axios";
import { getAccessToken, setAccessToken } from "./accessTokenModule";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function refreshAccessToken() {
  try {
    const { data } = await api.post(
      "/api/users/token/refresh",
      {},
      { withCredentials: true },
    );
    console.log("refresh success", data.token);
    return data.token;
  } catch (err) {
    console.log("refresh failed", err);
    return null;
  }
}

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();
      if (!newToken) {
        return Promise.reject(new Error("Session expired, please login again"));
      }

      setAccessToken(newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
