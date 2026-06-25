import React, {useEffect, useRef} from "react";

import mermaid from "mermaid";
import PageLoader from "../../components/Common/PageLoader";

function MermaidAttendanceChart({title, present = 0, absent = 0, leave = 0}){
  const containerRef = useRef(null);
  
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "default"
    });

    const safePresent = Number(present) || 0;

    const safeAbsent = Number(absent) || 0;

    const safeLeave = Number(leave) || 0;

    const total = safePresent + safeAbsent + safeLeave;
    
    const chartDefinition = total === 0
    
    ? `
    pie title No Attendance Data
    "No Data" : 1
    `
    
    : `
    pie title ${title}
    "Present" : ${safePresent}
    "Absent" : ${safeAbsent}
    "Leave" : ${safeLeave}
    `;

    const renderMermaid = async() => {
      try{
        const id = `mermaid-${Date.now()}`;

        const {svg} = await mermaid.render(id, chartDefinition);

        if(containerRef.current){
          containerRef.current.innerHTML = svg;
        }

      }catch(error){
        console.error("MERMAID ERROR:", error);
      }
    };
    
    renderMermaid();
  
  }, [title, present, absent, leave]);

  return(
  <div className = "mermaid-card">
    <div ref = {containerRef}></div>
  </div>
  );
}

export default MermaidAttendanceChart;