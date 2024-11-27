import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import pen from '../assets/images/pen.png';
import trash from '../assets/images/trash.png';
const List = () => {
    const [notes, setNotes] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);

    const colors = ["#ffc2d1", "#e7c6ff", "#a3b18a", "#d4a373", "#c9ada7","#9a8c98", "#ffe5d9"];


    useEffect(() => {
        getList();
    }, []);

    const getList = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("https://notes.devlop.tech/api/notes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes(response.data);
        } catch (error) {
            console.log(error);
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
                <Create
                    setShowCreate={setShowCreate}
                    refreshList={getList}
                    noteToEdit={noteToEdit}
                />
            ) : (
                <>
                    <h1>My Notes</h1>

                    <div className='card-container'>
                        {notes.map((note, index) => (
                            <div key={note.id} className='card'>
                                <div className='header-card'>
                                   <div className=' sub-header'>
                                   <div
                                        className="point"
                                        style={{ backgroundColor: colors[index % colors.length] }} // Assign a color from the array
                                    ></div>
                                    <p className="title">{note.title}</p> {/* Title in place of category */}
                                   </div>
                                    
                                    <div className='icons-container'>
                                        <img className='icons' src={pen} alt="" onClick={() => startEditing(note)} />
                                        <img className='icons' src={trash} alt="" onClick={() => deleteNote(note.id)} />
                                    </div>
                                </div>
                                <div className='body-card'>
                                    <p>{note.content}</p>
                                </div>
                                    <p className='footer-card' style={{ backgroundColor: colors[index % colors.length] }}>{formatDate(note.date)}</p>
                            </div>
                        ))}
                        </div>

                    <button
                        onClick={() => {
                            setNoteToEdit(null);
                            setShowCreate(true);
                        }}
                    >
                        Create A Note
                    </button>
                </>
            )}
        </div>
    );
};

export default List;
