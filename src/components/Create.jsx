import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ setShowCreate, refreshList, noteToEdit }) => {
    const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : ''); // Prefill title if editing
    const [content, setContent] = useState(noteToEdit ? noteToEdit.content : ''); // Prefill content if editing
    const [message, setMessage] = useState('');

    const createOrUpdateNote = async (e) => {
        e.preventDefault();
    
        if (!title || !content) {
            setMessage('Title and content are required!');
            return; // Stop further processing if fields are empty
        }
    
        const api = noteToEdit 
            ? `https://notes.devlop.tech/api/notes/${noteToEdit.id}` 
            : 'https://notes.devlop.tech/api/notes';
    
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.error('No token found in localStorage');
            setMessage('Authentication failed. Please login again.');
            return;
        }
    
        const sharedWith = noteToEdit ? noteToEdit.shared_with : []; // Default to empty array if not editing
    
        try {
            const method = noteToEdit ? 'PUT' : 'POST';
            const response = await axios({
                method: method,
                url: api,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: { 
                    title, 
                    content, 
                    shared_with: sharedWith,  // Add shared_with field to the request
                },
            });
    
            if (response.status === 200 || response.status === 201) {
                setMessage(noteToEdit ? 'Note updated successfully!' : 'Note created successfully!');
                setTitle('');
                setContent('');
                refreshList();
                setShowCreate(false);
            } else {
                setMessage(`Error: ${response.data.message || 'Failed to save note.'}`);
            }
        } catch (error) {
            console.error('Error details:', error.response || error);
    
            if (error.response) {
                setMessage(`API Error: ${error.response.data.message || 'Unable to save note.'}`);
            } else {
                setMessage('Network error: Unable to save note.');
            }
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
