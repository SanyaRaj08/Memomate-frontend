import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [
    
  ];
  const [notes, setNotes] = useState(initialNotes);
  
  //GET ALL NOTES
  const getNotes = async() => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      }
    });
   const json =await response.json();
   setNotes(json)
  };



  //ADD A NOTE
  const addNote = async(title, content, tags) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      },
      body: JSON.stringify({title,content,tags}),
    });
    const json = await response.json();
    console.log(json);
    const note = {
      _id: json._id,
      user: json.user,
      title: title,
      content: content,
      tags: tags,
      __v: 0,
    };
    setNotes([...notes, note]);
  };

  //DELETE A NOTE

  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      }
    });   
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    const json = await response.json();
    console.log(json);
    setNotes(newNotes);
  };

  //EDIT A NOTE
  const editNote = async (id, title, content, tags) => {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('authToken')
      },
      body: JSON.stringify({title,content,tags}),
    });
    const json = await response.json();
    console.log(json);
    let newNotes=JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].content = content;
        newNotes[index].tags = tags;
        break;
      }
      
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        getNotes,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
