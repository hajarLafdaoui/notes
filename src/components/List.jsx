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
    fetchNotes();
  }, []);

  useEffect(() => {
    filterNotes();
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    try {
    // This will automatically use the base URL, so it becomes: https://notes.devlop.tech/api/notes
      const response = await axios.get('/notes');
      setNotes(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]); // Set to empty array to avoid map error
    }
  };

  const filterNotes = () => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(lowerCaseQuery)));
    } else {
      setFilteredNotes(notes);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
    setShowCreate(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleCreateNew = () => {
    setNoteToEdit(null);
    setShowCreate(true);
  };

  return (
    <div className='mainListContainer'>
      {showCreate ? (
        <Create setShowCreate={setShowCreate} refreshList={fetchNotes} noteToEdit={noteToEdit} />
      ) : (
        <>
        
          <h1 className='mainHeader'>My Notes</h1>

          <div className="add createNote" onClick={handleCreateNew}>
            <img src={add} alt="Add Icon" />
            <p>Create New</p>
          </div>

          <div className='card-container'>
            {filteredNotes && filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <div key={note.id} className='card'>
                  <div className='header-card'>
                    <div className='sub-header'>
                      <div className="point" style={{ backgroundColor: colors[index % colors.length] }}></div>
                      <p className="title">{note.title}</p>
                    </div>

                    <div className='icons-container'>
                      <img
                        className='icons'
                        src={pen}
                        alt="Edit"
                        onClick={() => handleEdit(note)}
                      />
                      <img
                        className='icons'
                        src={trash}
                        alt="Delete"
                        onClick={() => handleDelete(note.id)}
                      />
                    </div>
                  </div>
                  <div className='body-card'>
                    <p>{note.content}</p>
                  </div>
                  <p className='footer-card' style={{ backgroundColor: colors[index % colors.length] }}>
                    {formatDate(note.date)}
                  </p>
                </div>
              ))
            ) : (
              <p>No notes found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
