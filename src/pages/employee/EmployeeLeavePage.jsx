import React, {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import axiosInstance from "../../api/axiosConfig";
import PageLoader from "../../components/Common/PageLoader";

function EmployeeLeavePage(){
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        fromDate: "",
        toDate: "",
        reason: ""
    });
    
    const fetchLeaves = async() => {
        setLoading(true);
        try{
            const res = await axiosInstance.get("/leaves/my");
            setLeaves(Array.isArray(res.data) ? res.data : res.data?.data || []);
        }catch(err){
            console.error(err);
        }finally{
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchLeaves();
    }, []);
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(!form.fromDate || !form.toDate || !form.reason){
            return alert("Please fill all fields");
        }
        
        const payload = {
            fromDate: new Date(form.fromDate + "T12:00:00"),
            toDate: new Date(form.toDate + "T12:00:00"),
            reason: form.reason
        };
        
        try{
            await axiosInstance.post("/leaves", payload);
            alert("Leave Applied Successfully");
            setForm({
                fromDate: "",
                toDate: "",
                reason: ""
            });
            fetchLeaves();
        }catch(err){
            console.error("ERROR:", err.response?.data);
            alert(err.response?.data?.message || "Error Applying Leave");
        }
    };
    
    return(
    <MainLayout>
      <h1>Apply Leave</h1>

      <div className = "form-card">
        <form onSubmit = {handleSubmit}>
          <input
            type = "date"
            placeholder = "From Date"
            min = {new Date().toISOString().split("T")[0]}
            value = {form.fromDate || ""}
            onChange = {(e) => setForm({ ...form, fromDate: e.target.value })}
          />

          <input
            type = "date"
            placeholder = "To Date"
            min = {new Date().toISOString().split("T")[0]}
            value = {form.toDate || ""}
            onChange = {(e) => setForm({ ...form, toDate: e.target.value })}
          />

          <input
            type = "text"
            placeholder = "Reason"
            value = {form.reason || ""}
            onChange = {(e) => setForm({ ...form, reason: e.target.value })}
          />

          <button type = "submit">Apply</button>
        </form>
      </div>

      <div className = "table-card">
        <h3>My Leave Requests</h3>

        {loading ? (
          <PageLoader />
        ) : leaves.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key = {leave._id}>
                  <td>
                    {leave.fromDate
                      ? new Date(leave.fromDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    {leave.toDate
                      ? new Date(leave.toDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>{leave.reason}</td>
                  <td>
                    <span className = {`leave-status-badge ${leave.status.toLowerCase()}`}>
                      {leave.status === "Pending" && "🟡"}
                      {leave.status === "Approved" && "🟢"}
                      {leave.status === "Rejected" && "🔴"}
                      {" "}
                      {leave.status}
                    </span>
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

export default EmployeeLeavePage;