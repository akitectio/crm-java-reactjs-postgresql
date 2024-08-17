
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const noAuthPaths = ['/api/auth/login'];


// Optional: add an interceptor to inject the authorization token in requests
axiosInstance.interceptors.request.use(
  (config) => {
    const requiresAuth = !noAuthPaths.some((path) => config.url.includes(path));
    const token = localStorage.getItem('token');
    console.log("token",token)
    if (token && requiresAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
