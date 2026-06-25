import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosInstance";
import EmployeeDropdown from "../../components/Attendance/EmployeeDropdown";
import PageLoader from "../../components/common/PageLoader";

function HRAttendancePage(){
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [form, setForm] = useState({
    employeeId: "",
    status: "Present",
  });

  const fetchAttendance = async() => {
    setLoading(true);

    try{
      const res = await axiosInstance.get("/attendance/view");
      setAttendance(res.data);
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  const fetchEmployees = async() => {
    try{
      const res = await axiosInstance.get("/employees");
      
      setEmployees(Array.isArray(res.data) ? res.data : []);
    
    }catch(err){
      
      console.error("Employee fetch failed:", err);
    }
  };
  
  useEffect(() => {
    fetchAttendance();
    fetchEmployees();  
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      await axiosInstance.post("/attendance/mark", form);

      alert("Attendance Marked Successfully");

      setForm({employeeId: "", status: "Present"});
      
      fetchAttendance();
    }catch(err){
      alert(err.response?.data?.message || "Error marking attendance");
    }
  };

  return(
  <MainLayout>
    <h1>Attendance Management</h1>
    <div className = "form-card">
      <h3>Mark Attendance</h3>
      <form onSubmit = {handleSubmit}>
        <div className = "employee-dropdown-container">
          <label>Select Employee</label>
          <EmployeeDropdown employees = {employees} selectedEmployee = {selectedEmployee} onSelect = {(employee) => {setSelectedEmployee(employee);
          setForm({
            ...form,
            employeeId: employee._id
          });
        }}
        />
      </div>
      
      <select value = {form.status} onChange = {(e) => setForm({
        ...form,
        status: e.target.value,
      })
    }
    >
      <option value = "Present">
        Present
      </option>
      
      <option value = "Absent">
        Absent
      </option>
      
      <option value = "Leave">
        Leave
      </option>
      </select>
      
      <button type = "submit">
        Mark Attendance
      </button>
      </form>
      </div>
      
      <div className = "table-card">
        <h3>All Attendance Records</h3>
        {loading ? (
          <PageLoader />
        ) : (
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          
        <tbody>
          {attendance.map((item) => (
            <tr key = {item._id}>
              <td>
                {item.user?.name}
              </td>
              
              <td>{item.status}</td>
              
              <td>
                {new Date(
                  item.date
                  ).toLocaleDateString()}
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </MainLayout>
    );
  }
  
  export default HRAttendancePage;