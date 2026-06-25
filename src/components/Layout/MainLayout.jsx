import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import PageLoader from "../../components/Common/PageLoader";

function MainLayout({children}){
    return(
    <div className = "layout">
        <Sidebar />
        <div className = "main">
            <Navbar />
            <div className = "content">{children}</div>
        </div>
    </div>
    );
}

export default MainLayout;