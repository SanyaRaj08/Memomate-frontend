import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  
  const context = useContext(NoteContext);
  const {note,updateNote} = props;
  const {deleteNote} = context;
  
  return (
    <>
    
    <div className="note-item-cont col-md-6 col-lg-4 col-sm-12  ">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.content}</p>
          <p className="card-text">{note.tags}</p>
          <div className="TitleIcons">
            <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully","success");}}></i>
            <i className="far fa-edit mx-2"  onClick={()=>{updateNote(note)}}></i>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default NoteItem;
