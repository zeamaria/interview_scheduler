import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }};
  
  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}

      {/* <Form></Form> */}
    </article>
  );
}
