import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import {ApiError} from '@/types/common';
import { notificationService } from './notification';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    const { internalCode, message, path, statusCode } = error?.response?.data;
    const apiError = new ApiError({ code: internalCode, message, path, errorCode: statusCode });
    
    notificationService.handleError(apiError);
    
    return Promise.reject(apiError);
  }
);
