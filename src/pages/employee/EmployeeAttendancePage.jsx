import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosConfig";
import AttendanceMiniCalendar from "../../components/Attendance/AttendanceMiniCalendar";
import {AttendancePieChart} from "../../components/Attendance/AttendanceCharts";
import PageLoader from "../../components/Common/PageLoader";

function EmployeeAttendancePage(){
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("monthly");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async() => {
    try{
      const res = await axiosInstance.get("/attendance/my");
      setAttendance(Array.isArray(res.data) ? res.data : []);
    }catch(err){
      console.error(err);
    }
  };

  const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const endOfWeek = (date) => {
    const start = startOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
  };

  const changePeriod = (direction) => {
    const newDate = new Date(selectedDate);
    if(view === "weekly"){
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    }else if(view === "monthly"){
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }else{
      newDate.setFullYear(newDate.getFullYear() + (direction === "next" ? 1 : -1));
    }
    setSelectedDate(newDate);
  };

  const filteredAttendance = attendance.filter((item) => {
    const attendanceDate = new Date(item.attendanceDate || item.date);

    if(view === "weekly"){
      const weekStart = startOfWeek(selectedDate);
      const weekEnd = endOfWeek(selectedDate);
      weekStart.setHours(0, 0, 0, 0);
      weekEnd.setHours(23, 59, 59, 999);
      return attendanceDate >= weekStart && attendanceDate <= weekEnd;
    }

    if(view === "monthly"){
      return(
        attendanceDate.getMonth() === selectedDate.getMonth() &&
        attendanceDate.getFullYear() === selectedDate.getFullYear()
      );
    }

    if(view === "yearly"){
      return attendanceDate.getFullYear() === selectedDate.getFullYear();
    }

    return true;
  });

  const present = filteredAttendance.filter((a) => a.status?.toLowerCase() === "present").length;
  const absent = filteredAttendance.filter((a) => a.status?.toLowerCase() === "absent").length;
  const leave = filteredAttendance.filter((a) => a.status?.toLowerCase() === "leave").length;
  const total = present + absent + leave;

  const chartData = [{
    name: total > 0 ? `Present (${((present / total) * 100).toFixed(1)}%)` : "Present",
    value: present,
  },{
    name: total > 0 ? `Absent (${((absent / total) * 100).toFixed(1)}%)` : "Absent",
    value: absent,
  },{
    name: total > 0 ? `Leave (${((leave / total) * 100).toFixed(1)}%)` : "Leave",
    value: leave,
  },
];

const getChartTitle = () => {
  if(view === "weekly"){
    return `Week of ${startOfWeek(selectedDate).toLocaleDateString()}`;
  }
  if(view === "monthly"){
    return selectedDate.toLocaleString("default", { month: "long", year: "numeric" });
  }
  if(view === "yearly"){
    return selectedDate.getFullYear();
  }
  return "";
};

return(
<MainLayout>
  <h1>Attendance Analytics</h1>
  <div className = "attendance-navigation">
    <button onClick = {() => changePeriod("prev")}>←</button>
    
    <div className = "attendance-filter-group">
      <button className = {view === "weekly" ? "active" : ""} onClick = {() => setView("weekly")}>
        Weekly
      </button>
      
      <button className = {view === "monthly" ? "active" : ""} onClick = {() => setView("monthly")}>
        Monthly
      </button>
      
      <button className = {view === "yearly" ? "active" : ""}  onClick = {() => setView("yearly")}>
        Yearly
      </button>
      
    </div>
    
    <span className = "attendance-period-title">{getChartTitle()}</span>
        <button onClick = {() => changePeriod("next")}>→</button>
        </div>
        
        <div className = "attendance-stats">
          <div className = "attendance-card">
            <div className = "card-top green"></div>
            <h3>Present</h3>
            <h1>{present}</h1>
          </div>
          
          <div className = "attendance-card">
            <div className = "card-top red"></div>
            <h3>Absent</h3>
            <h1>{absent}</h1>
          </div>
          
          <div className = "attendance-card">
            <div className = "card-top yellow"></div>
            <h3>Leave</h3>
            <h1>{leave}</h1>
          </div>
        </div>
        
        <div className = "attendance-chart-card">
          <h2>{getChartTitle()}</h2>
          <AttendancePieChart key = {`${view}-${selectedDate}`} data = {chartData} />
        </div>
        
        <AttendanceMiniCalendar attendanceData = {attendance} selectedDate = {selectedDate} setSelectedDate = {setSelectedDate}/>
      </MainLayout>
      );
    }
    
    export default EmployeeAttendancePage;