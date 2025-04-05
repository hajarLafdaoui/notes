import React from 'react';
import trash from '../assets/images/trash.png'; // Make sure to import your trash icon

const DeletedNotes = ({ deletedNotes, onDelete }) => {
    return (
      <div className="mainListContainer">
        <h3 className="mainHeader">Recently Deleted Notes</h3>
        
        <div className="card-container">
          {deletedNotes && deletedNotes.length > 0 ? (
            deletedNotes.map((note, index) => (
              <div key={index} className="card">
                <div className="header-card">
                  <div className="sub-header">
                    <p className="title">{note.title}</p>
                  </div>
                  <div className="icons-container">
                    <img
                      className="icons"
                      src={trash}
                      alt="Delete Permanently"
                      onClick={() => onDelete(note.id)}
                      title="Delete permanently"
                    />
                  </div>
                </div>
                <div className="body-card">
                  <p>{note.content}</p>
                </div>
                <p className="footer-card">
                  Deleted on: {new Date(note.deletedAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No recently deleted notes.</p>
          )}
        </div>
      </div>
    );
};

export default DeletedNotes;