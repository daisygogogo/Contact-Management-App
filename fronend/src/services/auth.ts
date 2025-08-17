import { api } from './api';
import { LoginFormData, RegisterFormData, AuthResponse } from '../types';

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async getMe(): Promise<any> {
    const response = await api.get('/user/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
