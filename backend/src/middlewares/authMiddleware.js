import { decodeToken } from "../utils/tokenHelper.js";

export const authVerification = (req, res, next) => {
    try {
        // Try multiple token sources
        let token = req.cookies.Token || 
                   req.headers.authorization?.replace('Bearer ', '') ||
                   req.headers.Authorization?.replace('Bearer ', '') ||
                   req.body.token;
        
        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized: Token missing"
            });
        }
        
        const decode = decodeToken(token);
        
        if (!decode) {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized: Invalid or expired token"
            });
        }
        
        const { email, user_id, role } = decode;
        
        // Validate required fields
        if (!email || !user_id) {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized: Invalid token payload"
            });
        }
        
            req.headers.email = email;
            req.headers.user_id = user_id;
            req.headers.role = role;
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(500).json({
            status: "error",
            message: "Internal server error during authentication"
        });
    }
} 