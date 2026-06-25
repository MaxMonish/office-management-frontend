import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import MainLayout from "../../components/Layout/MainLayout";
import socket from "../../socket";
import PageLoader from "../../components/Common/PageLoader";

function EmployeeDetailsPage(){
  const {id} = useParams();
  const [employee, setEmployee] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showImage, setShowImage] = useState(false);

  const fetchEmployee = async() => {
    try{
      const res = await axiosInstance.get(`/employees/${id}`);
      setEmployee(res.data);
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);

  const isOnline = employee && onlineUsers.includes(employee._id);

  if(!employee){
    return(
    <MainLayout>
      <PageLoader />
      </MainLayout>
      );
    }
    
    const profileImageUrl = employee.profileImage?.startsWith("http") ? employee.profileImage : `http://localhost:5000/${employee.profileImage}`;
    
    return(
    <MainLayout>
      <h1>Employee Details</h1>

      <div className = "employee-details-card">
        {showImage && (
          <div className = "image-overlay" onClick={() => setShowImage(false)}>
            <div className = "image-popup" onClick={(e) => e.stopPropagation()}>
              <button className = "close-image-btn" onClick={() => setShowImage(false)}>
                ✖
              </button>
              <img
                src = {profileImageUrl}
                alt = {employee.name}
                className = "full-profile-image"
              />
            </div>
          </div>
        )}

        <img
          src = {profileImageUrl}
          alt = {employee.name}
          className = "employee-details-avatar"
          onClick = {() => setShowImage(true)}
          style = {{ cursor: "pointer" }}
        />

        <h2>{employee.name}</h2>
        <p>Employee ID : {employee._id}</p>
        <p>Email : {employee.email}</p>
        <p>Role : {employee.role}</p>
        <p>Joined : {new Date(employee.createdAt).toLocaleDateString()}</p>
        <p>
          Last Seen : {" "}
          {isOnline 
            ? "🟢 Online" 
            : employee.lastSeen 
              ? new Date(employee.lastSeen).toLocaleString() 
              : "Offline"}
        </p>
      </div>
    </MainLayout>
  );
}

export default EmployeeDetailsPage;