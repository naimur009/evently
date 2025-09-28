import jwt from "jsonwebtoken";
import config from "../config/config.js";


// encode jwt 
export const encodeToken = (email, user_id, role)=>{
    const key = config.JWT_KEY;
    
    const expire = {
        expiresIn: config.JWT_EXPIRED
    };
    const payload = {
        email: email,
        user_id: user_id,
        role: role
    }

    return jwt.sign(payload, key, expire);
}


// decode jwt token
export const decodeToken = (token) => {
    try {
        if (!token || typeof token !== 'string') {
            return null;
        }
        
        // Remove Bearer prefix if present
        const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
        
        if (!cleanToken || !config.JWT_KEY) {
            return null;
        }
        
        const data = jwt.verify(cleanToken, config.JWT_KEY);
        
        // Validate required fields
        if (!data.user_id || !data.email) {
            return null;
        }
        
        return data;
    } catch (error) {
        // Log error in development only
        if (process.env.NODE_ENV === 'development') {
            console.error('JWT decode error:', error.message);
        }
        return null;
    }
}