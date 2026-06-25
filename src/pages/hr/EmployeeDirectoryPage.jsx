import React, {useEffect, useState} from "react";

import axiosInstance from "../../api/axiosConfig";

import MainLayout from "../../components/Layout/MainLayout";

import {useNavigate} from "react-router-dom";

import PageLoader from "../../components/Common/PageLoader";

function EmployeeDirectoryPage(){
  
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  const fetchEmployees = async() => {
    try{
      const res = await axiosInstance.get("/employees");
      setEmployees(res.data);
    
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return(
  <MainLayout>
    <h1>Employee Directory</h1>
    <div className = "employee-list">
      {employees.map((emp) => (
        <div key = {emp._id} className = "employee-item" onClick = {() => navigate(`/hr/employees/${emp._id}`)}>
          <img src = {
            emp.profileImage?.startsWith("http")
            ? emp.profileImage
            : `http://localhost:5000/${emp.profileImage}`
          }
          alt = {emp.name}
          className = "employee-avatar"
          />
          
          <div>
            <h3>{emp.name}</h3>
            <p>{emp.email}</p>
          </div>
        </div>
      ))}
      
    </div>
    
  </MainLayout>
  );
}

export default EmployeeDirectoryPage;