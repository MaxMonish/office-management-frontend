import React from "react";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {FaUserTie, FaTasks, FaCalendarAlt, FaComments, FaSignOutAlt, FaHeadset, FaEnvelope} from "react-icons/fa";
import {MdEventAvailable} from "react-icons/md";
import {GiTakeMyMoney} from "react-icons/gi";
import {FaUserCircle, FaUsers} from "react-icons/fa";

function Sidebar(){
    const {user, logout} = useContext(AuthContext);

    const hrLinks = [
        {path: "/hr/dashboard", icon: <FaUserTie />, label: "Dashboard"},
        {path: "/hr/attendance", icon: <MdEventAvailable />, label: "Attendance"},
        {path: "/hr/tasks", icon: <FaTasks />, label: "Tasks"},
        {path: "/hr/leaves", icon: <GiTakeMyMoney />, label: "Leave Requests"},
        {path: "/hr/calendar", icon: <FaCalendarAlt />, label: "Calendar"},
        {path: "/hr/chat", icon: <FaComments />, label: "Chat"},
        {path: "/profile", icon: <FaUserCircle />, label: "My Profile"},
        {path: "/hr/employees", icon: <FaUsers />, label: "Employees"}
    ];

    const empLinks = [
        {path: "/employee/dashboard", icon: <FaUserTie />, label: "Dashboard"},
        {path: "/employee/attendance", icon: <MdEventAvailable />, label: "My Attendance"},
        {path: "/employee/tasks", icon: <FaTasks />, label: "My Tasks"},
        {path: "/employee/leaves", icon: <GiTakeMyMoney />, label: "Apply Leave"},
        {path: "/employee/calendar", icon: <FaCalendarAlt />, label: "Calendar"},
        {path: "/employee/chat", icon: <FaComments />, label: "Chat"},
        {path: "/profile", icon: <FaUserCircle />, label: "My Profile"}
    ];

    const links = user?.role === "HR" ? hrLinks : empLinks;

    return(
    <div className = "sidebar">
        <div className = "sidebar-top">
            <h2>Office</h2>
            <nav className = "sidebar-nav">
                {links.map((item) => (
                    <Link key = {item.path} to = {item.path} className = "sidebar-link">
                        {item.icon} <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
        
        <div className = "sidebar-bottom">
            <div className = "support-card">
                <h4><FaHeadset /> Support</h4>
                <p>monishbaskar01234@gmail.com</p>
                <p>Ph: +91-8807064734</p>
            </div>
            
            <button onClick = {logout} className = "logout-btn">
                <FaSignOutAlt /> Logout
            </button>
        </div>
    </div>
    );
}

export default Sidebar;