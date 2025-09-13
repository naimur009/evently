import { decodeToken } from "../utils/tokenHelper.js";

export const authVerification = (req, res, next) => {
    const token = req.cookies.Token;
    const decode = decodeToken(token);

    
    if (!decode) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized: Token missing || please log in"
        });
    }

    const { email, user_id, role } = decode;

    req.headers.email = email;
    req.headers.user_id = user_id;
    req.headers.role = role;

    next();
} 