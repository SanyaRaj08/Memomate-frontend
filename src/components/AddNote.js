import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import "./notes.css";
const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [notes, setNotes] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const onchange = (e) => {
    setNotes({ ...notes, [e.target.name]: e.target.value });
  };
  const handleclick = (e) => {
    e.preventDefault();
    addNote(notes.title, notes.content, notes.tags);
    setNotes({
      title: "",
      content: "",
      tags: "",
    });
    props.showAlert("Added Successfully", "success");
  };
  return (
    <div>
      <div className="container-fluid add-form">
        <div className=" my-3">
          <h2>Type ur note</h2>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={notes.title}
              onChange={onchange}
              minLength={5}
              required
            />
            <label htmlFor="exampleInputPassword1" className="form-label">
              Content
            </label>
            <textarea
              className="content-section form-control"
              id="content"
              name="content"
              value={notes.content}
              onChange={onchange}
              minLength={5}
              required
              rows={4}
            />

            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              onChange={onchange}
              value={notes.tags}
              minLength={3}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark" onClick={handleclick}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
