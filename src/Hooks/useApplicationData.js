import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

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
  setState({
    ...state,
    appointments
  });

return axios.put(`/api/appointments/${id}`, {interview})
.then(res => console.log(res))

};

function cancelInterview(id) {
  const appointment = {
    ...state.appointments
  };
  appointment[id].interview = null;
  return axios.delete(`/api/appointments/${id}`)
  .then(res => console.log(res))
}

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

return {state, setDay, bookInterview, cancelInterview}

}