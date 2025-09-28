import { jwtDecode } from "jwt-decode";

export const decode = (token) => {
    try {
        // Handle various falsy values and edge cases
        if (!token || 
            token === 'undefined' || 
            token === 'null' || 
            token === 'false' || 
            token.trim() === '' ||
            token === 'Bearer' ||
            token === 'Bearer undefined') {
            return null;
        }
        
        // Remove Bearer prefix if present
        const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
        
        if (!cleanToken) {
            return null;
        }
        
        // Validate token format (basic JWT structure check)
        const parts = cleanToken.split('.');
        if (parts.length !== 3) {
            console.warn('Invalid JWT format');
            return null;
        }
        
        const decoded = jwtDecode(cleanToken);
        
        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
            console.warn('Token expired');
            return null;
        }
        
        return decoded;
    } catch (error) {
        console.error('Token decode error:', error.message);
        return null;
    }
}