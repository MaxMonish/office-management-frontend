import React from "react";
import {useEffect, useState} from "react";
import {getNotifications} from "../../api/notificationApi";
import socket from "../../socket";
import PageLoader from "../../components/Common/PageLoader";

function NotificationBell(){
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        const fetchNotifications = async() => {
            const data = await getNotifications();
            setNotifications(Array.isArray(data) ? data : []);
        };
        fetchNotifications();
    }, []);
    
    useEffect(() => {
        const handler = (data) => {
            setNotifications((prev) => [
                {_id: Date.now(), message: data?.message || "New notification"},
                ...prev
            ]);
        };
        
        socket.on("notification", handler);

        return () => socket.off("notification", handler);
    }, []);
    
    return(
    <div className = "notification-bell">
        {notifications.length > 0 && (
            <span className = "badge">{notifications.length}</span>
        )}

        <div className = "notification-dropdown">
            {notifications.map((n) => (
            <div key = {n._id}>
                {n.message}
            </div>
            ))}
        </div>
    </div>
    );
}

export default NotificationBell;