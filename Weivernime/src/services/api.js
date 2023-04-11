import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    config.headers.Authorization = `Bearer ${user?.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
