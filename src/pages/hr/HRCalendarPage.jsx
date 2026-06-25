import React from "react";
import {useEffect, useState} from "react";
import MainLayout from "../../components/Layout/MainLayout";
import CompanyCalendar from "../../components/Calendar/CompanyCalendar";
import axiosInstance from "../../api/axiosConfig";
import PageLoader from "../../components/Common/PageLoader";

function HRCalendarPage(){
  const [events, setEvents] = useState([]);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    visibility: "All"
  });

  const fetchEvents = async() => {
    try{
      const res = await axiosInstance.get("/calendar");
      
      const formatted = Array.isArray(res.data) ? res.data.map((event) => {
        
        const date = new Date(event.eventDate);
        if(event.time){
          const [hours, minutes] = event.time.split(":");
          
          date.setHours(hours);
          date.setMinutes(minutes);
          date.setSeconds(0);
        }
        
        return{
          title: `${event.title} (${event.time})`,
          start: date,
          end: date,
        };
      })
      : [];
      
      console.log("EVENT DATA:", res.data);
      setEvents(formatted);
    
    }catch(err){
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try{
      await axiosInstance.post("/calendar", {
        title: form.title,
        description: form.description,
        eventDate: form.date,
        time: form.time,
        visibility: form.visibility
      });
      
      alert("Event Added");
      
      setForm({
        title: "",
        description: "",
        date: "",
        time: "",
        visibility: "All"
      });

      fetchEvents();
    }catch(err){
      console.log("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Error adding event");
    }
  };

  return(
  <MainLayout>
    <h1>Company Calendar</h1>
    <div className = "form-card">
      <form onSubmit = {handleSubmit}>
        <input type = "text" placeholder = "Event Title" value = {form.title} required onChange = {(e) => setForm({...form, title: e.target.value})}/>
        
        <input type = "text" placeholder = "Description" value = {form.description} onChange = {(e) => setForm({...form, description: e.target.value})}/>
        
        <input type = "date" value = {form.date} required onChange = {(e) => setForm({...form, date: e.target.value})}/>
        
        <input type = "time" value = {form.time} required onChange = {(e) => setForm({...form, time: e.target.value})}/>
        
        <select value = {form.visibility} onChange = {(e) => setForm({...form, visibility: e.target.value})}>
          
          <option value = "All">All</option>
          <option value = "HR">HR Only</option>
          <option value = "Employee">Employee Only</option>
        </select>
        
        <button type = "submit">
          Add Event
        </button>
        
      </form>
      
    </div>
    
  <CompanyCalendar events = {events} />
  
  </MainLayout>
  );
}

export default HRCalendarPage;