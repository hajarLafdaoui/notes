import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';

import Login from './components/login.jsx';
import List from './components/List.jsx';
import Navbar from './components/navbar.jsx';

function App() {
  const [isConected, setIsConected] = useState(false); // Track login state
  const [view, setView] = useState(''); // Manage view state
  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state

  return (
    <>
      {/* Conditional rendering for Login or Navbar + List/Create */}
      {!isConected ? (
        <Login setIsConected={setIsConected} />
      ) : (
        <>
          <Navbar setIsConected={setIsConected} setView={setView} setSearchQuery={setSearchQuery} /> 
          {/* Pass setSearchQuery to Navbar */}
          
          {/* Conditional rendering of List or Create component based on view state */}
          {view === 'allNotes' && <List searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        </>
      )}
    </>
  );
}

export default App;
