import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment/index";


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days")])
    .then(response => {
      console.log("response", response[0])
      setDays(response[0].data)
    } )
    .catch(error => console.error(error));
  }, [])


  const appointmentList = appointments.map((appointment) => {
    return (
      <Appointment 
      key={appointment.id} 
      {...appointment} />
    )
  });
  

  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
      
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
