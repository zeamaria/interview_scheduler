import React from "react";


export default function Status(props) {
  return (
      <main className="appointment__card appointment__card--status">
        <img
          className="appointment__status-image"
          src="images/status.png"
          alt="Loading"
        />
        <h1 onClick={props.saving} className="text--semi-bold">{props.message}</h1>
      </main>
    )
};