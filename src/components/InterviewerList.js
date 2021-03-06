import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
 let interviewerDetails = [];
  interviewerDetails = props.interviewers.map(interviewer => {
    return (
    <InterviewerListItem
      id={interviewer.id}
      key={interviewer.id}
      name={interviewer.name }
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />)
  })


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerDetails}</ul>
    </section> 
    );


};
