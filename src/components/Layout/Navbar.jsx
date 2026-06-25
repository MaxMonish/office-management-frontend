import React from "react";
import {useEffect, useState, useContext} from "react";

import socket from "../../socket";
import {AuthContext} from "../../context/AuthContext";
import PageLoader from "../../components/Common/PageLoader";

function Navbar(){
  const {user} = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("🔌 Navbar mounted");
    
    if(!user?._id){
      console.log("❌ No user found");
      return;
    }

    if(!socket.connected){
      console.log("🔄 Connecting socket...");
      socket.connect();
    }

    const handleConnect = () => {
      console.log("✅ SOCKET CONNECTED:", socket.id);

      socket.emit("join", user._id);
      
      console.log("✅ USER JOINED:", user._id);
    };

    const handleNotification = (data) => {
      console.log("🔔 NOTIFICATION RECEIVED:", data);
      setNotifications((prev) => [data, ...prev]);
    };
    
    socket.on("connect", handleConnect);
    
    socket.on("notification", handleNotification);

    if(socket.connected){
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      
      socket.off("notification", handleNotification); 
    };
  }, [user]);

  return(
  <nav className = "navbar">
    <h2>Smart Company</h2>
    <div className = "notification-container">
      <button onClick = {() =>
            setOpen((prev) => !prev)
          }
          className = "bell">
            🔔
            {notifications.length > 0 && (
              <span className = "badge">
                {notifications.length}
              </span>
            )}
          </button>
          
          {open && (
            <div className = "dropdown">
              {notifications.length === 0 ? (
                <p>No Notifications</p>
              ) : (
                notifications.map((n, i) => (
                <div key = {i} className = "notification-item">
                  <strong>
                    {n.title}
                  </strong>
                  
                  <p>
                    {n.message}
                  </p>
                  
                  <small>
                    {new Date(n.time).toLocaleTimeString()}
                  </small>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </nav>
    );
  }
  
  export default Navbar;