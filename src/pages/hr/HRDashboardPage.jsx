import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosConfig";
import Card from "../../components/Dashboard/Card";
import {TaskBarChart} from "../../components/Dashboard/AnalyticsChart";
import PageLoader from "../../components/common/PageLoader";

function HRDashboardPage(){
  const [dashboard, setDashboard] = useState({
    employees: 0,
    pendingLeaves: 0,
    tasksInProgress: 0,
    todayEvents: [],
    pendingLeaveRequests: []
  });

  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async() => {
    try{
      const res = await axiosInstance.get("/dashboard/hr-stats");
      setDashboard({
        employees: res.data?.employees || 0,
        pendingLeaves: res.data?.pendingLeaves || 0,
        tasksInProgress: res.data?.tasksInProgress || 0,
        todayEvents: res.data?.todayEvents || [],
        pendingLeaveRequests: res.data?.pendingLeaveRequests || []
      });
      setTaskData(res.data?.taskData || []);
    }catch(err){
      console.error("Dashboard Error:", err);
    }finally{
      setLoading(false);
    }
  };

  if(loading){
    return(
    <MainLayout>
      <PageLoader />
    </MainLayout>
    );
  }
  
  return(
  <MainLayout>
    <div className = "hr-dashboard-page">
      <div className = "dashboard-header">
        <h1>HR Dashboard</h1>
        <p>Monitor employees, tasks, leave requests and events.</p>
      </div>
      
      <div className = "hr-dashboard-cards">
        <Card title = "Total Employees" value = {dashboard.employees} />
        <Card title = "Pending Leaves" value = {dashboard.pendingLeaves} />
        <Card title = "Tasks In Progress" value = {dashboard.tasksInProgress} />
        <Card title = "Today's Events" value = {dashboard.todayEvents.length} />
      </div>
      
      <div className = "hr-dashboard-grid">
        <div className = "dashboard-section">
          <h3>Task Status</h3>
          {taskData.length === 0 ? (
            <div className = "empty-data">No Task Data</div>
          ) : (
          <TaskBarChart data = {taskData} />
          )}
        </div>
        
        <div className = "dashboard-section">
          <h3>Pending Leave Requests</h3>
          {dashboard.pendingLeaveRequests.length === 0 ? (
            <div className = "empty-data">No Pending Leave Requests</div>
          ) : (
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
              </tr>
            </thead>
            
            <tbody>
              {dashboard.pendingLeaveRequests.map((leave) => (
                <tr key = {leave._id}>
                  <td>{leave.user?.name || "-"}</td>
                  <td>{leave.leaveType || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    
    <div className = "dashboard-section">
      <h3>Today's Events</h3>
      {dashboard.todayEvents.length === 0 ? (
        <div className = "empty-data">No Events Today</div>
      ) : (
        dashboard.todayEvents.map((event) => (
        <div key = {event._id} className = "event-card">
          <div className = "event-header">
            <h4>{event.title}</h4>
            <span className = "event-time">🕒 {event.time}</span>
          </div>
          <p>{event.description}</p>
        </div>
        ))
        )}
      </div>
    </div>
  </MainLayout>
  );
}

export default HRDashboardPage;