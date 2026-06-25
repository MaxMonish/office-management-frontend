import React from "react";
import PageLoader from "../../components/Common/PageLoader";

function AttendanceStats({present, absent, leave}){
  return(
  <div className = "attendance-stats">
    <div className = "attendance-card present">
      <h3>Present</h3>
      <h1>{present}</h1>
    </div>
    
    <div className = "attendance-card absent">
      <h3>Absent</h3>
      <h1>{absent}</h1>
    </div>
    
    <div className = "attendance-card leave">
      <h3>Leave</h3>
      <h1>{leave}</h1>
    </div>
  </div>
  );
}

export default AttendanceStats;