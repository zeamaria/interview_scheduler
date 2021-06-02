import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

function updateSpots(status) {
  const daySpots = state.day

  state.days.forEach((day) => {
    if (day.name === daySpots && status === "book") {
      day.spots = day.spots - 1;
    }
    else if (day.name === daySpots && status === "cancel") {
      day.spots = day.spots + 1;
    }
  })
}


 function bookInterview(id, interview) {

  if (!state.appointments[id].interview) {
    updateSpots("book");
  }
 
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
.then(res => {
  setState({
    ...state,
    appointments
  })
})

};

function cancelInterview(id) {
  const appointment = {
    ...state.appointments
  };
  updateSpots("cancel");
  appointment[id].interview = null;
  return axios.delete(`/api/appointments/${id}`)
  .then(res => {
    setState({
      ...state,
      appointment
    })
  })
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