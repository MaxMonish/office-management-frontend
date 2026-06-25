import React, {useState} from "react";
import {Link} from "react-router-dom";

function HomePage(){
    const [position,setPosition] = useState({
        x: 50,
        y: 50
    });
    
    const handleMouseMove = (e) => {
        const x = (e.clientX/window.innerWidth)*100;
        
        const y = (e.clientY/window.innerHeight)*100;
        
        setPosition({x, y});
    };
    
    return(
    <div className = "home-page" onMouseMove = {handleMouseMove} style = {{
        "--x":`${position.x}%`,
        "--y":`${position.y}%`
    }}>
        
        <div className = "home-overlay">
            
            <div className = "home-card">
                <div className = "home-icon">🏢</div>
                <h1>Office Management System</h1>
                <p>Manage Employees, Tasks, Attendance, Leave Requests, Chat and Notifications in one platform.</p>
                <div className = "home-buttons">
                    
                    <Link to = "/login">
                    <button className = "home-login-btn">Login</button>
                    </Link>
                    
                    <Link to = "/register">
                    <button className = "home-register-btn">Register</button>
                    </Link>
                </div>
                
            </div>
        </div>
    </div>
    );
}

export default HomePage;