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

        const api = noteToEdit ? `/notes/${noteToEdit.id}` : '/api/notes';
        const method = noteToEdit ? 'PUT' : 'POST';

        try {
            // Use the global Axios instance that includes the token handling automatically
            const response = await axios({
                method,
                url: api,
                data: { title, content, shared_with: noteToEdit?.shared_with || [] },
            });

            setMessage(noteToEdit ? 'Note updated!' : 'Note created!');
            setTitle('');
            setContent('');
            refreshList();
            setShowCreate(false);
        } catch (error) {
            console.log('Error details:', error.response ? error.response.data : error.message);
            setMessage('Failed to save note. Please try again.');
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-page">
                <div className="form">
                    <h1>{noteToEdit ? 'Edit Note' : 'Create Note'}</h1>
                    <form
                        className="login-form"
                        onSubmit={createOrUpdateNote}
                    >
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className='createUpdate'>
                            <button type="submit">
                                {noteToEdit ? 'Update' : 'Create'}
                            </button>
                            <button type="button" onClick={() => setShowCreate(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Create;
