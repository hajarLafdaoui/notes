import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ setShowCreate, refreshList, noteToEdit }) => {
    const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : ''); 
    const [content, setContent] = useState(noteToEdit ? noteToEdit.content : ''); 
    const [message, setMessage] = useState('');

    const createOrUpdateNote = async (e) => {
        e.preventDefault();
    
        if (!title || !content) {
            setMessage('Title and content are required!');
            return;
        }
    
        const api = noteToEdit 
            ? `https://notes.devlop.tech/api/notes/${noteToEdit.id}` 
            : 'https://notes.devlop.tech/api/notes';
        const method = noteToEdit ? 'PUT' : 'POST';
    
        try {
            await axios({
                method,
                url: api,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                data: { title, content, shared_with: noteToEdit?.shared_with || [] },
            });
    
            setMessage(noteToEdit ? 'Note updated!' : 'Note created!');
            setTitle('');
            setContent('');
            refreshList();
            setShowCreate(false);
        } catch (error) {
            setMessage('Failed to save note. Please try again.');
        }
    };
    
    
    return (
        <div>
            <h1>{noteToEdit ? 'Edit Note' : 'Create Note'}</h1>
            <form onSubmit={createOrUpdateNote}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <button type="submit">{noteToEdit ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShowCreate(false)}>
                    Cancel
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Create;
