// Authentication Service
import { api } from '../config/axios';
import StorageService from '../utils/storage';

class AuthService {
  static async login(credentials) {
    try {
      const response = await api.post('/login', credentials);
      const { token, user } = response.data;
      
      StorageService.setItem('token', token);
      StorageService.setItem('user', user);
      
      return user;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  static logout() {
    StorageService.clear();
    window.location.href = '/login';
  }

  static getCurrentUser() {
    return StorageService.getItem('user');
  }

  static isAuthenticated() {
    return !!StorageService.getItem('token');
  }
}

export default AuthService;
