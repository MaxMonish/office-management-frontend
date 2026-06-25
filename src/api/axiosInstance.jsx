import React from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://office-management-backend-7kur.onrender.com",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
