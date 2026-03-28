import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_BASE_URL = "http://localhost:4100/api";
console.log(`API: ${API_BASE_URL}`);

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
