import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});


// Request Interceptor (Attach Token)
axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// Response Interceptor (Global Error Handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    let message = "Something went wrong";

    if (error.response) {
      // API responded with error
      message = error.response.data?.message || error.response.data?.error;
    } 
    else if (error.request) {
      // Request sent but no response
      message = "No response from server";
    } 
    else {
      // Other error
      message = error.message;
    }
    
    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;