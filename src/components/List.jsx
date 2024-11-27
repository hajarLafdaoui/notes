import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create'; 

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

    const deleteNote = async (id) =>{
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
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note) => (
                                <tr key={note.id}>
                                    <td>{note.title}</td>
                                    <td>{note.content}</td>
                                    <td>
                                        <button onClick={() => startEditing(note)}>Edit</button>
                                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
