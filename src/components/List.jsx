import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';
import pen from '../assets/images/pen.png';
import trash from '../assets/images/trash.png';


const List = () => {
    const [notes, setNotes] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);

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

    }

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
                        {notes.map((note) => (
                            <div key={note.id} className='card'>
                                <div className='header-card'>
                                    <p className='categorie'>Categorie</p>
                                    <div className='icons-container'>
                                        <img className='icons' src={pen} alt=""  onClick={() => startEditing(note)}/> 
                                        <img className='icons' src={trash} alt=""  onClick={() => deleteNote(note.id)}/>
                                    </div>
                                </div>
                                <div className='body-card'>
                                    <p>{note.title}</p>
                                    <p>{note.content}</p>
                                </div>
                                <div className='footer-card'>
                                    <p>Date</p>
                                </div>
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
