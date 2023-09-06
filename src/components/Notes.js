import React from "react";
import NoteSection from "./NoteSection";


function Notes(props) {
  const {showAlert}=props;
  return (
    <div className="note-page">
      <NoteSection showAlert={props.showAlert} />
    </div>
  );
}

export default Notes;
