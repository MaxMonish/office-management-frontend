import React from "react";

import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import PageLoader from "../../components/Common/PageLoader";

function AttendanceMiniCalendar({
  attendanceData = [],
  selectedDate,
  setSelectedDate
}){
  
  const getStatus = (date) => {
    const formattedDate = new Date(date)
    .toISOString()
    .split("T")[0];

    const found = attendanceData.find((item) => {
      const itemDate = new Date(item.attendanceDate || item.date)
      .toISOString()
      .split("T")[0];
      
      return itemDate === formattedDate;
    });
    
    return found?.status || "NotMarked";
  };

  const tileClassName = ({date, view}) => {
    if (view !== "month") return "";
    
    const today = new Date();
    
    today.setHours(0,0,0,0);
    
    const currentDate = new Date(date);
    
    currentDate.setHours(0,0,0,0);
    
    if(currentDate > today){
      return "future-day";
    }
    
    const status = getStatus(date)
    .toLowerCase()
    .trim();
    
    switch(status){
      case "present":
        return "present-day";
        
        case "absent":
          return "absent-day";
          
          case "leave":
            return "leave-day";
            
            default:
              return "notmarked-day";
            }
          };
          
          return(
          <Calendar value={selectedDate} onChange={(date) => {
            setSelectedDate(date);
          }}
          tileClassName={tileClassName}
          />
        );
      }
      
      export default AttendanceMiniCalendar;