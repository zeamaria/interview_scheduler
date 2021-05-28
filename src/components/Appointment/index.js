import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";
import { useVisualMode } from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const CONFIRM = "CONFIRM";
  const Confirm = "Confirm"
  const SAVING = "SAVING";
  const DELETE = "DELETE"
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE"
  const cancel = function () {
    transition(EMPTY);
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition("ERROR_SAVE", true));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function deleteApp(){
    transition(DELETING);
    props.deleteInterview(props.id, transition, EMPTY, ERROR_DELETE)
  }


  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={cancel}
        />
      )}

      {mode === SAVING && <Status message="Saving..." />}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === DELETING && <Status message="Deleting..." />}
      
      {mode === CONFIRM && (
        <Confirm
          onDelete={deleteApp}
          onCancel={back}
          message={"Are you sure you would like to delete?"}
        />
      )} 

    </article>
  );
}
