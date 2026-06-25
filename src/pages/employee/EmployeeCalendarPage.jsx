import React from "react";
import {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import CompanyCalendar from "../../components/Calendar/CompanyCalendar";
import axiosInstance from "../../api/axiosConfig";
import PageLoader from "../../components/Common/PageLoader";

function EmployeeCalendarPage(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async() => {
      try{
        const res = await axiosInstance.get("/calendar");

        const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.data) ? res.data.data : [];
        
        const formatted = data.map((event) => {
          if(!event?.eventDate || isNaN(Date.parse(event.eventDate))){
            return null;
          }
          
          const date = new Date(event.eventDate);
          
          if(event.time){
            const [hours, minutes] = event.time.split(":");
            
            date.setHours(Number(hours));
            date.setMinutes(Number(minutes));
            date.setSeconds(0);
          }
          
          return{
            title: `${event?.title || "No Title"} ` + `(${event?.time || "No Time"})`,
            start: date,
            end: date,
            
            description: event?.description || "",
            
            visibility: event?.visibility || "All"
          };
        }).filter(Boolean);
        
        if(isMounted){
          setEvents(formatted);
        }
      }catch(err){
        console.error("Error fetching calendar events:", err);
      }finally{
        if (isMounted) setLoading(false);
      }
    };
    
    fetchEvents();
    
    return() => {
      isMounted=false;
    };
  }, []);

  return(
  <MainLayout>
    <h1>Company Calendar</h1>
    {loading ? (
      <PageLoader />
    ) : events.length === 0 ? (
    <p>No events available.</p>
  ) : (
  <CompanyCalendar events={events} />
  )}
  </MainLayout>
  );
}

export default EmployeeCalendarPage;