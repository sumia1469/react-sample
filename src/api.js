import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // Node.js 서버 URL
});

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);