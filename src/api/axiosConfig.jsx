import React from "react";
import axios from "axios";

const axiosInstance = axios.create({baseURL: "https://office-management-backend-7kur.onrender.com"});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token){
        config.headers=config.headers || {};
        config.headers.Authorization=`Bearer ${token}`;
    }

    return config;
},
(error) => Promise.reject(error));

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorData=error.response?.data || {
            message: "Network Error"
        };

        return Promise.reject(errorData);
    }
);

export default axiosInstance;
