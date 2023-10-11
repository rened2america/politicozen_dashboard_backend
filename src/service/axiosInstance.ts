import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create({
  baseURL: "https://politicozen-backend.onrender.com/api/1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosClient;
