import axios from "axios";

const API = axios.create({
  baseURL: "https://portfolio-blog-website-5m1i.onrender.com",
});

// Add JWT automatically to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;