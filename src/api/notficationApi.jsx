import React from "react";
import axiosInstance from "./axiosConfig";
import PageLoader from "../../components/Common/PageLoader";

export const getNotifications = async() => {
    const res = await axiosInstance.get("/notifications");
    return res.data;
};

export const markNotificationRead = async(id) => {
    if (!id) throw new Error("Notification ID is required");
    
    const res = await axiosInstance.put(`/notifications/${id}/read`);
    return res.data;
};