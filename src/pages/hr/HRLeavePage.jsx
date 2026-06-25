import React, {useEffect, useState} from "react";
import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosConfig";
import PageLoader from "../../components/Common/PageLoader";

function HRLeavePage(){
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaves = async() => {
        setLoading(true);
        try{
            const res = await axiosInstance.get("/leaves/all");
            setLeaves(res.data);
        }catch(err){
            console.error("Fetch Error:", err);
        }finally{
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchLeaves();
    }, []);

    const updateStatus = async(id, status) => {
        try{
            const res = await axiosInstance.put(`/leaves/${id}/status`, { status });
            
            console.log("UPDATED SUCCESS:", res.data);
            alert(`Leave ${status} successfully`);
            
            fetchLeaves(); 
        }catch(err){
            console.error("UPDATE ERROR:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to update status");
        }
    };

    const leaveStats = [
        { name: "Pending", value: leaves.filter(l => l.status === "Pending").length },
        { name: "Approved", value: leaves.filter(l => l.status === "Approved").length },
        { name: "Rejected", value: leaves.filter(l => l.status === "Rejected").length }
    ];

    const COLORS = ["#f59e0b", "#22c55e", "#ef4444"];

    return(
    <MainLayout>
        <h1>Leave Request Management</h1>
        <div className = "task-chart-legend">
            {leaveStats.map((stat, index) => (
                <div key = {stat.name} className = {`legend-card ${stat.name.toLowerCase()}`}>
                    <h4>{stat.name}</h4>
                    <span>{stat.value}</span>
                </div>
            ))}
        </div>
        
        <div className = "table-card">
            {loading ? (
                <p>Loading leaves...</p>
            ) : (
            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave) => (
                        <tr key = {leave._id}>
                            <td>{leave.user?.name || "Unknown"}</td>
                            <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
                            <td>{new Date(leave.toDate).toLocaleDateString()}</td>
                            <td>{leave.reason}</td>
                            <td>
                                <span className = {`status-badge ${leave.status.toLowerCase()}`}>
                                    {leave.status}
                                </span>
                            </td>
                            
                            <td>
                                <select className = {`leave-status-select ${leave.status.toLowerCase()}`}  value = {leave.status} onChange = {(e) => updateStatus(leave._id, e.target.value)}>
                                    <option value = "Pending">🟡 Pending</option>
                                    <option value = "Approved">🟢 Approved</option>
                                    <option value = "Rejected">🔴 Rejected</option>
                                </select>
                            </td>
                        </tr>
                        ))
                    ) : (
                    <tr><td colSpan = "6">No leave requests found.</td></tr>
                    )}
                </tbody>
            </table>
        )}
        </div>
        
        <div className = "chart-card">
            <h3>Leave Request Statistics</h3>
            <ResponsiveContainer width = "100%" height = {300}>
                <PieChart>
                    <Pie data = {leaveStats} cx = "50%" cy = "50%" innerRadius = {60} outerRadius = {100} paddingAngle = {5} dataKey = "value">
                        {leaveStats.map((entry, index) => (
                            <Cell key = {`cell-${index}`} fill = {COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </MainLayout>
    );
}

export default HRLeavePage;