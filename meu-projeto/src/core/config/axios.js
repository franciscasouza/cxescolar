// Centralized Axios Configuration
import axios from 'axios';
import StorageService from '../utils/storage';

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = StorageService.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Unauthorized - logout user
        StorageService.clear();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createAxiosInstance(import.meta.env.VITE_API_URL);
