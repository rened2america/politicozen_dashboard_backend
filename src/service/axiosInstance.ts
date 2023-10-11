import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create({
  baseURL: "https://politicozen-backend.onrender.com/api/1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      window.location.href = "/emailnotconfirm";
    }

    if (error.response.status === 401) {
      window.location.href = "/login";
    }
  }
);
export default axiosClient;
