import axios from "axios";

const API_URL =
  import.meta.env.NODE_ENV === "production"
    ? import.meta.env.VITE_API_URL
    : import.meta.env.VITE_LOCAL_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  validateStatus: (status) => status >= 200 && status < 500,
});

const getToken = () => localStorage.getItem("token");

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// API methods
export const api = {
  // ✅ User Authentication
  login: (data) => axiosInstance.post("/auth/login", data),
  signup: (userData) => axiosInstance.post("/auth/signup", userData),

  // ✅ Admin Dashboard
  getAdminDashboard: () => axiosInstance.get("/admin/dashboard"),
  addUser: (data) => axiosInstance.post("/admin/users", data),
  addStore: (data) => axiosInstance.post("/admin/stores", data),
  getUsers: (filters) => axiosInstance.get("/admin/users", { params: filters }),
  getStores: (filters) =>
    axiosInstance.get("/admin/stores", { params: filters }),
  getUserDetails: (id) => axiosInstance.get(`/admin/users/${id}`),

  // ✅ Store Owner Dashboard
  getStoreRatings: () => axiosInstance.get("/store-owner/ratings"),
  getStoreAvgRating: () => axiosInstance.get("/store-owner/average-rating"),

  // ✅ User Functionality
  getUserStores: (filters) =>
    axiosInstance.get("/user/stores", { params: filters }),
  getStoreDetails: (id) => axiosInstance.get(`/user/stores/${id}`),
  submitRating: (data) => axiosInstance.post("/user/ratings", data),
  updatePassword: (data) => axiosInstance.put("/user/update-password", data),
};
