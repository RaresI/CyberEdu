import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for browser
const getBaseURL = () => {
  // If we're in the browser, use localhost:8080
  if (typeof window !== 'undefined') {
    return 'http://localhost:8080/api';
  }
  // Server-side rendering (not used in standalone mode, but just in case)
  return process.env.API_GATEWAY_URL 
    ? `${process.env.API_GATEWAY_URL}/api`
    : 'http://api-gateway:8080/api';
};

export const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    if (userData.token) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
