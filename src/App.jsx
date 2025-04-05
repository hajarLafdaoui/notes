import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';
import Login from './components/login.jsx';
import List from './components/List.jsx';
import Navbar from './components/navbar.jsx';
import Create from './components/Create.jsx'; 
import DeletedNotes from './components/DeletedNotes.jsx'; // Add this import
import './components/axiosSetup'; 
import UpdatePassword from './components/UpdatePassword.jsx';

function App() {
  const [isConected, setIsConected] = useState(false);
  const [view, setView] = useState('allNotes');
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedNotes, setDeletedNotes] = useState([]);

  return (
    <>
      {!isConected ? (
        <Login setIsConected={setIsConected} />
      ) : (
        <>
          <Navbar setView={setView} setSearchQuery={setSearchQuery} setIsConected={setIsConected} />
          {view === 'allNotes' && (
            <List 
              searchQuery={searchQuery} 
              deletedNotes={deletedNotes}
              setDeletedNotes={setDeletedNotes}
            />
          )}
          {view === 'create' && <Create />}
          {view === 'updatePassword' && <UpdatePassword />}
          {view === 'deleted-notes' && (
            <DeletedNotes deletedNotes={deletedNotes} />
          )}
        </>
      )}
    </>
  );
}

export default App;