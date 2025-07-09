import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: "http://localhost:3000/api",
    baseURL: "https://shopkart-yup9.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API error:", error?.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
