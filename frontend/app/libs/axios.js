import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000', // backend URL with fallback
  withCredentials: true, // send cookies/session
  timeout: 10000, // 10 second timeout
});
console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling and token management
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    
    // Handle 401 Unauthorized errors (token expired/invalid)
    if (error.response?.status === 401) {
      // Clear invalid tokens
      if (typeof window !== 'undefined') {
        const { tokenManager } = await import('./tokenManager');
        tokenManager.removeToken();
        
        // If we're not already on login page, redirect there
        if (!window.location.pathname.includes('/log-in')) {
          window.location.href = '/log-in';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Token utility functions
export const getToken = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    // Try to get from cookies first
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('Token='));
    
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
    
    // Fallback to localStorage
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Set in both cookie and localStorage for redundancy
    document.cookie = `Token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = () => {
  if (typeof window === 'undefined') return;
  
  try {
    // Remove from both cookie and localStorage
    document.cookie = 'Token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export default api;
