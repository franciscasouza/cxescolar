import axios from "axios";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7165/api//api/", // Garante que usa a URL do .env
  timeout: 10000,
});

// Interceptador para adicionar o token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador para tratar respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
