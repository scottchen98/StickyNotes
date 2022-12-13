import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000").then((response) => {
      setNotes(response.data);
    });
  }, []);

  function addNote(title, content) {
    const newNote = {
      title: title,
      content: content,
    };

    // By default, Axios serializes JavaScript objects to JSON, which will then be appended to the outgoing POST request
    Axios.post("http://localhost:3000", newNote).then((response) => {
      setNotes(response.data);
    });
  }

  function deleteNote(id) {
    Axios.post("http://localhost:3000/delete", { _id: id }).then((response) => {
      setNotes(response.data);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
