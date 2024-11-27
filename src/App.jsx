import './App.css';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';

import Login from './components/login.jsx';
import List from './components/List.jsx';
import Navbar from './components/navbar.jsx';


function App() {
  const [isConcted, setIsConected] = useState(false);

  return (
    <>
      {/* Displaying FontAwesome Arrow Down icon */} 
      {/* <Navbar /> */}
      {/* Conditional rendering for Login or List components */}
      {!isConcted ?
       <Login setIsConected={setIsConected} /> 
       :
       <>
        <Navbar />
        <List />
       </>

      }
    </>
  );
}

export default App;
