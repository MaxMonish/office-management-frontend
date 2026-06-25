import React, { useEffect, useState } from "react";
import {ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosConfig";
import {getImageUrl} from '../../utils/imageHelper';
import PageLoader from "../../components/Common/PageLoader";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981"];

const renderCountLabel = ({cx, cy, midAngle, innerRadius, outerRadius, value}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
    <text x = {x} y = {y} fill = "white" textAnchor = "middle" dominantBaseline = "central" fontSize = "16" fontWeight = "700">
        {value}
    </text>
    );
};

function HRTaskPage(){
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showEmployees, setShowEmployees] = useState(false);
    const [form, setForm] = useState({
        assignedTo: "",
        title: "",
        description: "",
        dueDate: ""
    });
    
    const fetchTasks = async() => {
        try{
            const res = await axiosInstance.get("/tasks/all");
            setTasks(res.data);
        }catch(err){
            console.error(err);
        }
    };
    
    const fetchEmployees = async() => {
        try{
            const res = await axiosInstance.get("/employees");
            const employeeUsers = Array.isArray(res.data) ? res.data.filter((user) => user.role === "Employee") : [];
            setEmployees(employeeUsers);
        }catch(err){
            console.error(err);
        }
    };
    
    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(!form.assignedTo || !form.title || !form.description || !form.dueDate) {
            alert("All fields are required");
            return;
        }
        
        try{
            await axiosInstance.post("/tasks", form);
            alert("Task Assigned Successfully");
            setForm({
                assignedTo: "",
                title: "",
                description: "",
                dueDate: ""
            });
            fetchTasks();
        }catch(err){
            alert(err.response?.data?.message || "Error assigning task");
        }
    };
    
    const selectedEmployee = employees.find((emp) => emp._id === form.assignedTo);
    
    const taskStats = [{
        name: "Pending",
        value: tasks.filter((task) => task.status === "Pending").length
    },{
        name: "In Progress",
        value: tasks.filter((task) => task.status === "In Progress").length
    },{
        name: "Completed",
        value: tasks.filter((task) => task.status === "Completed").length
    }
];

return(
<MainLayout>
    <h1>Task Management</h1>
    <div className = "task-chart-legend">
        <div className = "legend-card pending">
            <h4>Pending</h4>
            <span>{taskStats[0].value}</span>
        </div>
        <div className = "legend-card progress">
            <h4>In Progress</h4>
            <span>{taskStats[1].value}</span>
        </div>
        <div className = "legend-card completed">
            <h4>Completed</h4>
            <span>{taskStats[2].value}</span>
        </div>
    </div>
    
    <div className = "form-card">
        <h3>Assign Task</h3>
        <form onSubmit = {handleSubmit}>
            <label style = {{ display: "block", marginBottom: "10px", fontWeight: "600" }}>
                Select Employee
            </label>
            
            <div className = "employee-dropdown-container">
                <div className = "employee-dropdown-header" onClick = {() => setShowEmployees(!showEmployees)}>
                    {selectedEmployee ? (
                        <div className = "selected-employee">
                            <img src = {getImageUrl(selectedEmployee.profileImage)} alt = {selectedEmployee.name} className = "employee-avatar"/>
                        <div>
                            <div className = "employee-name">{selectedEmployee.name}</div>
                            <div className = "employee-email">{selectedEmployee.email}</div>
                            </div>
                            </div>
                            ) : (
                            <span>Select Employee</span>
                            )}
                            <span>{showEmployees ? "▲" : "▼"}</span>
                        </div>
                        
                        {showEmployees && (
              <div className = "employee-dropdown-menu">
                {employees.map((emp) => (
                    <div key = {emp._id} className = "employee-dropdown-item" onClick = {() => {setForm({ ...form, assignedTo: emp._id }); setShowEmployees(false);}}>
                        <img src = {getImageUrl(emp.profileImage)} alt = {emp.name} className = "employee-avatar"/>
                        <div>
                            <div className = "employee-name">{emp.name}</div>
                            <div className = "employee-email">{emp.email}</div>
                        </div>
                    </div>
                ))}
            </div>
        )}
        </div>
        
        <input type = "text" placeholder = "Task Title" value = {form.title} onChange = {(e) => setForm({ ...form, title: e.target.value })}/>
        
        <input type = "text" placeholder = "Description" value = {form.description} onChange = {(e) => setForm({ ...form, description: e.target.value })}/>

          <input type = "date" value = {form.dueDate} onChange = {(e) => setForm({ ...form, dueDate: e.target.value })}/>
          
          <button type = "submit">Assign Task</button>
          
          </form>
          
          </div>
          
          <div className = "table-card">
            <h3>All Tasks</h3>
            <table>
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due Date</th>
                    </tr>
                </thead>
                
                <tbody>
                    {tasks.map((task) => (
                        <tr key = {task._id}>
                            <td>{task.assignedTo?.name}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>
                                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className = "chart-card">
            <h3>Task Statistics</h3>
            <ResponsiveContainer width = "100%" height = {350}>
                <PieChart>
                    <Pie data = {taskStats} dataKey = "value" nameKey = "name" cx = "50%" cy = "50%" innerRadius = {90} outerRadius = {140} paddingAngle = {5} label = {renderCountLabel}>
                        {taskStats.map((entry, index) => (
                            <Cell key = {index} fill = {COLORS[index % COLORS.length]} />
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

export default HRTaskPage;