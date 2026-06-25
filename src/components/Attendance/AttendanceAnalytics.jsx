import React from "react";

import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend} from "recharts";

import PageLoader from "../../components/Common/PageLoader";

function AttendanceAnalytics({summary, weeklyData, monthlyData, yearlyData}){
    const pieData = [{
        name: "Present",
        value: summary.present
    },{
        name: "Absent",
        value: summary.absent
    },{
        name: "Leave",
        value: summary.leave
    }];
    
    return(
    
    <div>
        <div className = "attendance-stats">
            <div className = "attendance-card present">
                <h4>Present</h4>
                <span>{summary.present}</span>
            </div>
            
            <div className = "attendance-card absent">
                <h4>Absent</h4>
                <span>{summary.absent}</span>
            </div>
            
            <div className = "attendance-card leave">
                <h4>Leave</h4>
                <span>{summary.leave}</span>
            </div>    
        </div>
        
        <div className = "chart-grid">
            <div className = "chart-card">
                <h3>Attendance Overview</h3>
                <ResponsiveContainer width = "100%" height = {300}>
                    <PieChart>
                        <Pie data = {pieData} dataKey = "value" nameKey = "name" cx = "50%" cy = "50%" innerRadius = {90} outerRadius = {140} paddingAngle = {5} label = {({ value }) => value}>
                            <Cell fill = "#22c55e" />
                            <Cell fill = "#ef4444" />
                            <Cell fill = "#eab308" />
                        </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
    );
}

export default AttendanceAnalytics;