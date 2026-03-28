import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4100/api", // e.g. "http://localhost:5000"
  withCredentials: true, // ✅ ensures cookies are sent/received
});

export default api;
