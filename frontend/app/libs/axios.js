import axios from "axios";

const api = axios.create({
  baseURL: "https://evently-backend-0r9f.onrender.com 
  withCredentials: true, // if you need cookies/session
});

export default api;
