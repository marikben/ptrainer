import React, {useState, useEffect} from "react";
//import "./styles.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";


import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


export default function App() {
  const [appointments, setAppointments] =  useState([]);
  useEffect(() => fetchData(), []);

  const fetchData = () =>{
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(response => response.json())
    .then(data => setAppointments(data.content))
  
}

const events = appointments.map((appointment)=>{
  return {
    id: appointment.id,
    title: appointment.activity,
    start: new Date(appointment.date),
    //end: new Date(appointment.date),
    allDay: false
  }
})
  return (
    <div className="App">
      <FullCalendar
      
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={events}
        
      />
    </div>
  );
}
