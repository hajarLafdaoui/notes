import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';
import Login from './components/login.jsx';
import List from './components/List.jsx';
import Navbar from './components/navbar.jsx';
import Create from './components/Create.jsx'; 

// Import Axios Setup to apply global configurations
import './components/axiosSetup'; 

function App() {
  const [isConected, setIsConected] = useState(false); 
  const [view, setView] = useState('allNotes');
  const [searchQuery, setSearchQuery] = useState(""); 

  return (
    <>
      {!isConected ? (
        <Login setIsConected={setIsConected} />
      ) : (
        <>
          <Navbar setView={setView} setSearchQuery={setSearchQuery} setIsConected={setIsConected} />
          {view === 'allNotes' && <List searchQuery={searchQuery} />}
          {view === 'create' && <Create />} 
        </>
      )}
    </>
  );
}

export default App;
