
export function getAppointmentsForDay(state, dayName) {
  const matchingDay = state.days.find(day => day.name === dayName);
  return matchingDay ? matchingDay.appointments.map(id => state.appointments[id]) : [];
}

export function getInterviewersForDay(state, dayName) {
  const matchingDay = state.days.find(day => day.name === dayName);
  return matchingDay ? matchingDay.interviewers.map(id => state.interviewers[id]) : [];
}

export function getInterview(state, interview){

  return (
    interview && {...interview, interviewer:state.interviewers[interview.interviewer]}
  );
}

