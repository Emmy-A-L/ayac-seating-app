import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. "http://localhost:5000"
  withCredentials: true, // ✅ ensures cookies are sent/received
});

export default api;
