import { jwtDecode } from "jwt-decode";

export const decode = (token)=>{
    try {
        if (!token || token === 'undefined' || token === 'null') {
            return null;
        }
        return jwtDecode(token);
    } catch (error) {
        console.error('Token decode error:', error);
        return null;
    }
}