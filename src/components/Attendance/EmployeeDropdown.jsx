import React, {useState} from "react";
import PageLoader from "../../components/Common/PageLoader";

function EmployeeDropdown({
  employees,
  selectedEmployee,
  onSelect,
}){
  
  const [open, setOpen] = useState(false);
  
  return(
  <div className = "employee-selector">
    <div className = "employee-selector-header" onClick = {() => setOpen(!open)}>
      <span>
        {selectedEmployee ? selectedEmployee.name : "Select Employee"}
      </span>
      
      <span>
        {open ? "▲" : "▼"}
      </span>
    </div>
    
    {open && (
      <div className = "employee-dropdown-list">
        {employees.map((employee) => (
          <div key = {employee._id} className = "employee-option" onClick = {() => {
            onSelect(employee);
            setOpen(false);
          }}>
            
            <img src = {
              employee.profileImage || "/default-avatar.png"}
              alt={employee.name}
            />
            
            <div>
              
              <h4>{employee.name}</h4>
              <p>{employee.email}</p>
            </div>

          </div>
        ))}
      </div>
    )}
    
    {selectedEmployee && (
      <div className = "selected-employee-card">
        <img src = {selectedEmployee.profileImage || "/default-avatar.png"} alt={selectedEmployee.name} />
        <div>
          <h4>{selectedEmployee.name}</h4>
          <p>{selectedEmployee.email}</p>
        </div>
      </div>
    )}
    
  </div>
  );
}

export default EmployeeDropdown;