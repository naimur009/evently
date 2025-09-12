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
export const decodeToken = (token)=>{
    try {
        const data = jwt.verify(token, config.JWT_KEY)
        return data
    } catch (error) {
        return null;
    }
}