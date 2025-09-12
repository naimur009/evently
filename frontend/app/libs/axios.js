import axios from "axios";

const api = axios.create({
  baseURL: "https://evently-backend-0m94.onrender.com",
  withCredentials: true, // if you need cookies/session
});

export default api;
