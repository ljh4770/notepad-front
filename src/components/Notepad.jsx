import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNotes, createNote, deleteNote } from "../api/notesApi";
import { logout } from "../api/authApi";
import "./styles/Notepad.css";

function Notepad() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  // const userEmail = localStorage.getItem("userEmail");

  // Fetch notes on mount
  useEffect(() => {{
     fetchNotes().then((data) => {
      setNotes(data);
      console.log(data);
    }); 
     
    }
  }, []);

  const handleAddNote = () => {
    if (!noteInput.title || !noteInput.content) {
      alert("Both title and content are required!");
      return;
    }
    createNote(noteInput).then((newNote) => {
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setNoteInput({ title: "", content: "" });
    });
  };

  const handleDeleteNote = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if (!confirmed) return;
  
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      alert("Note deleted successfully.");
    } catch (error) {
      console.error(`Failed to delete note with id ${id}:`, error);
      alert("Failed to delete the note. Please try again.");
    }
  };
  

  const handleLogout = async () => {
    try {
      await logout(); // 로그아웃 API 호출
      navigate("/"); // 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="notepad">
      <div className="header">
        <h1>Notepad</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="note-input">
        <input
          type="text"
          placeholder="Title"
          value={noteInput.title}
          onChange={(e) => setNoteInput({ ...noteInput, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={noteInput.content}
          onChange={(e) =>
            setNoteInput({ ...noteInput, content: e.target.value })
          }
        ></textarea>
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notepad;
