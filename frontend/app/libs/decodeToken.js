import { jwtDecode } from "jwt-decode";

export const decode = (token)=>{
    return jwtDecode(token);
}