import React from "react";
import axios from "axios";
import axiosInstance from "./axiosConfig";

export const loginApi = async(data) => {
    try{
        const res = await axiosInstance.post("/auth/login", data);
        return res.data;
    }catch(err){
        throw err.response?.data || err.message;
    }
};

export const registerApi = async(data) => {
    try{
        const res = await axiosInstance.post("/auth/register", data);
        return res.data;
    }catch(err){
        throw err.response?.data || err.message;
    }
};

export const getProfileApi = async() => {
    try{
        const res = await axiosInstance.get("/auth/me");
        return res.data;
    }catch(err){
        throw err.response?.data || err.message;
    }
};