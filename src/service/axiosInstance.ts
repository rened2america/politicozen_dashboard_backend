import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create({
  baseURL: "https://politicozen-backend.onrender.com/api/1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Replace this with our own backend base URL
axiosClient.defaults.baseURL =
  "https://politicozen-backend.onrender.com/api/1/";

export default axiosClient;
