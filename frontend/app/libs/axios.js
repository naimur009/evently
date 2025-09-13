import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // backend URL from .env.local
  withCredentials: true, // send cookies/session
});

export default api;
