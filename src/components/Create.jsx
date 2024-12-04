import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Create = ({ setShowCreate, refreshList, noteToEdit }) => {
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [content, setContent] = useState(noteToEdit?.content || '');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Simple fetching logic for users
  useEffect(() => {
    axios.get('/users')
      .then(response => {
        console.log('Users fetched:', response);
        setUsers(response); // Directly set the fetched users
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleSaveNote = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage('Title and content are required!');
      return;
    }

    const endpoint = noteToEdit ? `/notes/${noteToEdit.id}` : '/notes';
    const method = noteToEdit ? 'PUT' : 'POST';

    setLoading(true);
    try {
      await axios({
        method,
        url: endpoint,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { 
          title, 
          content,
          shared_with: selectedUsers.map(user => user.value), 
        },
      });
      

      setMessage(noteToEdit ? 'Note updated successfully!' : 'Note created successfully!');
      refreshList();
      setShowCreate(false);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessage('Failed to save note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page">
        <div className="form">
          <h1>{noteToEdit ? 'Edit Note' : 'Create Note'}</h1>
          <form className="login-form" onSubmit={handleSaveNote}>
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

            <Select
              isMulti
              options={users.map(user => ({
                value: user.id,
                label: `${user.first_name} ${user.last_name}`,
              }))}
              value={selectedUsers}
              onChange={setSelectedUsers}
              placeholder="Share with..."
            />

            <div className="createUpdate">
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : noteToEdit ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowCreate(false)}>
                Cancel
              </button>
            </div>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Create;
