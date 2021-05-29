import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getInterview, getAppointmentsForDay, getInterviewersForDay} from "./helpers/selectors";


export default function Application(props) {
 

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
   

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


  return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      console.log("working")
      setState({
        ...state,
        appointments
      });

    })

  };


  function deleteInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


  return axios.delete(`/api/appointments/${id}`, {interview}).then(() => {
      setState({
        ...state,
        appointments
      });

    })
  };
  


  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((
      [{data:days}, {data:appointments}, {data:interviewers}]
    ) => setState(prev => ({ ...prev, days, appointments, interviewers})))
  }, []);




  const schedule = getAppointmentsForDay(state, state.day).map(appointment => {

    return (
      <Appointment
      key = {appointment.id}
      id = {appointment.id}
      {...appointment}
      interview = {getInterview(state, appointment.interview)}
      interviewers = {getInterviewersForDay(state, state.day)}
      bookInterview = {bookInterview}
      deleteInterview = {deleteInterview}
      />
    )
  })


  
  return (
    <main className="layout">
      <section className="sidebar">
        {<img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
          }
        <hr className="sidebar__separator sidebar--centered" 
        /> 
        
        {<nav>
          <DayList 
          days={state.days} 
          day={state.day}
          setDay={setDay}
         />
        </nav>}     
        
        {<nav className="sidebar__menu"></nav>} 
        
        {<img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
         />
        }
      </section>

      
      <section className="schedule">
        {schedule}
        <Appointment 
        key="last" 
        time="5pm" />
      
      </section>
    </main>
  );
}