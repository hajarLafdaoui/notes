import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import pen from '../assets/images/pen.png';
import trash from '../assets/images/trash.png';
import add from '../assets/images/add.png';

const List = ({ searchQuery }) => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const colors = ["#ffc2d1", "#e7c6ff", "#a3b18a", "#d4a373", "#c9ada7", "#9a8c98", "#ffe5d9"];

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredNotes(notes);
    }
  }, [searchQuery, notes]);

  const getList = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("https://notes.devlop.tech/api/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      // You can show an error message to the user if needed
    }
  };
  

  const startEditing = (note) => {
    setNoteToEdit(note);
    setShowCreate(true);
  };

  const deleteNote = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`https://notes.devlop.tech/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(notes.filter(note => note.id !== id));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div>
      {showCreate ? (
        <Create setShowCreate={setShowCreate} refreshList={getList} noteToEdit={noteToEdit} />
      ) : (
        <>
          <h1 className='mainHeader'>My Notes</h1>

          <div className="add createNote" onClick={() => {
            setNoteToEdit(null);
            setShowCreate(true);
          }}>
            <img src={add} alt="Add Icon" />
            <p>Create New</p>
          </div>

          <div className='card-container'>
            {filteredNotes.map((note, index) => (
              <div key={note.id} className='card'>
                <div className='header-card'>
                  <div className='sub-header'>
                    <div className="point" style={{ backgroundColor: colors[index % colors.length] }}></div>
                    <p className="title">{note.title}</p>
                  </div>

                  <div className='icons-container'>
                    <img className='icons' src={pen} alt="" onClick={() => startEditing(note)} />
                    <img className='icons' src={trash} alt="" onClick={() => deleteNote(note.id)} />
                  </div>
                </div>
                <div className='body-card'>
                  <p>{note.content}</p>
                </div>
                <p className='footer-card' style={{ backgroundColor: colors[index % colors.length] }}>
                  {formatDate(note.date)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
