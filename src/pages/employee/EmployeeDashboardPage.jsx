import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import Card from "../../components/Dashboard/Card";
import axiosInstance from "../../api/axiosConfig";
import EmployeeTaskDonut from "../../components/Dashboard/EmployeeTaskDonut";
import EmployeeWeeklyChart from "../../components/Dashboard/EmployeeWeeklyChart";
import PageLoader from "../../components/Common/PageLoader";

function EmployeeDashboardPage(){
    const [dashboard, setDashboard] = useState({
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
        todayEvents: [],
    });
    
    const [taskChart, setTaskChart] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [hasProductivity, setHasProductivity] = useState(false);
    
    useEffect(() => {
        fetchDashboard();
    }, []);
    
    const fetchDashboard = async() => {
        try{
            const res = await axiosInstance.get("/employee-dashboard");
            
            setDashboard({
                pendingTasks: res.data.pendingTasks,
                inProgressTasks: res.data.inProgressTasks,
                completedTasks: res.data.completedTasks,
                todayEvents: res.data.todayEvents,
            });
            
            setTaskChart(res.data.taskChart || []);
            setWeeklyData(res.data.weeklyData || []);
            setHasProductivity(res.data.hasProductivity || false);
        }catch(err){
            console.error(err);
        }
    };
    
    return(
    <MainLayout>
      <div className = "employee-dashboard">
        <h1>Employee Dashboard</h1>

        <div className = "employee-cards">
          <Card title = "In Progress" value = {dashboard.inProgressTasks} />
          <Card title = "Today's Events" value = {dashboard.todayEvents.length} />
          <Card title = "Pending Tasks" value = {dashboard.pendingTasks} />
          <Card title = "Completed Tasks" value = {dashboard.completedTasks} />
        </div>

        <div className = "employee-grid">
          <div className = "dashboard-section">
            <h3>Task Progress</h3>
            <EmployeeTaskDonut data = {taskChart} />
          </div>

          <div className = "dashboard-section">
            <h3>Weekly Productivity</h3>
            {hasProductivity ? (
              <EmployeeWeeklyChart data={weeklyData} />
            ) : (
              <div className = "empty-data">
                No productivity data available this week
              </div>
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
                  <span>🕒 {event.time}</span>
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

export default EmployeeDashboardPage;