import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import con_img from "./con-img.png";

const NoteSection = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      getNotes();
    } else {
      navigate("/Login");
    }
   
  }, [getNotes, navigate])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNotes] = useState({
    id: "",
    etitle: "",
    econtent: "",
    etags: "default",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({
      eid: currentNote._id,
      etitle: currentNote.title,
      econtent: currentNote.content,
      etags: currentNote.tags,
    });
  };

  const handleclick = (e) => {
    editNote(note.eid, note.etitle, note.econtent, note.etags);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
  };
  const onchange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
      </button>
      <div
        className="modal fade edit-box"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    content
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="econtent"
                    name="econtent"
                    value={note.econtent}
                    onChange={onchange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tags" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    name="etags"
                    value={note.etags}
                    onChange={onchange}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleclick}
                type="button"
                className="btn btn-dark"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-2 my-3">
      <div className="your-notes">
      <p > Your Notes</p>
      </div>
        <div className="row container">
          {notes.length === 0
            ?<div className="no">
            <img className="con-img" src={con_img} alt="" />
            <div className="no-notes">
            "OOPS!!....Not Added Anything Yet"
            </div> 
            </div> 
            : notes.map((note) => (
                <NoteItem
                  key={note._id}
                  updateNote={updateNote}
                  note={note}
                  showAlert={props.showAlert}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default NoteSection;
