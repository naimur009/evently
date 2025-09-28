// Token management utilities for Vercel deployment
"use client"

// Check if we're running in a browser environment
const isBrowser = typeof window !== 'undefined';

export const tokenManager = {
  // Get token from multiple sources
  getToken: () => {
    if (!isBrowser) return null;
    
    try {
      // First try cookies
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => 
        cookie.trim().startsWith('Token=')
      );
      
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        if (token && token !== 'undefined' && token !== 'null') {
          return token;
        }
      }
      
      // Fallback to localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
        return storedToken;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Set token in both cookie and localStorage
  setToken: (token) => {
    if (!isBrowser || !token) return false;
    
    try {
      // Set secure cookie
      const cookieOptions = [
        `Token=${token}`,
        'path=/',
        `max-age=${7 * 24 * 60 * 60}`, // 7 days
        'SameSite=Lax'
      ];
      
      // Add Secure flag in production
      if (window.location.protocol === 'https:') {
        cookieOptions.push('Secure');
      }
      
      document.cookie = cookieOptions.join('; ');
      
      // Also set in localStorage as backup
      localStorage.setItem('token', token);
      
      return true;
    } catch (error) {
      console.error('Error setting token:', error);
      return false;
    }
  },

  // Remove token from all sources
  removeToken: () => {
    if (!isBrowser) return;
    
    try {
      // Remove from cookie
      document.cookie = 'Token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax';
      
      // Remove from localStorage
      localStorage.removeItem('token');
      
      // Clear any other token-related data
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // Check if token exists and is valid format
  hasValidToken: () => {
    const token = tokenManager.getToken();
    
    if (!token) return false;
    
    try {
      // Basic JWT format validation
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Try to decode the payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      
      // Check if token is expired
      if (payload.exp && payload.exp < Date.now() / 1000) {
        tokenManager.removeToken(); // Clean up expired token
        return false;
      }
      
      return true;
    } catch (error) {
      tokenManager.removeToken(); // Clean up invalid token
      return false;
    }
  },

  // Get user info from token
  getUserInfo: () => {
    const token = tokenManager.getToken();
    
    if (!token) return null;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const payload = JSON.parse(atob(parts[1]));
      
      return {
        email: payload.email,
        user_id: payload.user_id,
        role: payload.role,
        exp: payload.exp
      };
    } catch (error) {
      console.error('Error getting user info from token:', error);
      return null;
    }
  }
};

export default tokenManager;