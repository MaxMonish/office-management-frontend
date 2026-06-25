import React, {useEffect, useState} from "react";
import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosConfig";
import PageLoader from "../../components/Common/PageLoader";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981"];

function EmployeeTaskPage(){
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyTasks = async() => {
        try{
            const res = await axiosInstance.get('/tasks/my');
            const data = Array.isArray(res.data) ? res.data : res.data?.tasks || [];
            setTasks(data);
        }catch(err){
            console.error("Fetch Error:", err);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyTasks();
    }, []);

    const updateTaskStatus = async(id, status) => {
        try{
            const res = await axiosInstance.put(`/tasks/${id}/status`, { status });
            
            setTasks(prev =>
                prev.map(task =>
                    task._id === id ? { ...task, status } : task
                )
            );
            
            alert("Task status updated to " + status);
        }catch(err){
            console.error("Update Error:", err);
            alert(err.response?.data?.message || "Failed to update task status");
        }
    };

    const taskStats = [
        {name: "Pending", value: tasks.filter(t => t.status === "Pending").length },
        {name: "In Progress", value: tasks.filter(t => t.status === "In Progress").length },
        {name: "Completed", value: tasks.filter(t => t.status === "Completed").length }
    ];

    return(
    <MainLayout>
        <h1>My Tasks</h1>
        
        <div className = "task-chart-legend">
            {taskStats.map((stat, idx) => (
                <div key = {idx} className = {`legend-card ${stat.name.toLowerCase().replace(" ", "-")}`}>
                    <h4>{stat.name}</h4>
                    <span>{stat.value}</span>
                </div>
            ))}
        </div>
        
        <div className = "table-card">
            {loading ? (
                <PageLoader />
            ) : tasks.length === 0 ? (
            <p>No tasks found.</p>
        ) : (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Update</th>
                </tr>
            </thead>
            
            <tbody>
                {tasks.map((task) => (
                    <tr key = {task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                            <span className = {`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                                {task.status}
                            </span>
                        </td>
                        
                        <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</td>
                        <td>
                            <select className = {`task-status-select ${task.status.toLowerCase().replace(/\s+/g, "-")}`}  value = {task.status}  onChange = {(e) => updateTaskStatus(task._id, e.target.value)}>
                            <option value = "Pending">🟡 Pending</option>
                            <option value = "In Progress">🔵 In Progress</option>
                            <option value = "Completed">🟢 Completed</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}
    
    </div>
    
    <div className = "chart-card" style = {{minHeight: "400px"}}>
        <h3>Task Statistics</h3>
        <ResponsiveContainer width = "100%" height = {350}>
            <PieChart>
                <Pie data = {taskStats} dataKey = "value" nameKey = "name" cx = "50%" cy = "50%" innerRadius = {70} outerRadius = {100} paddingAngle={5} label>
                    {taskStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        
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

export default EmployeeTaskPage;