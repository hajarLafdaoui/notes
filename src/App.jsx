
import './App.css';
import Login from './components/login.jsx';
import List from './components/List.jsx'
import { useState } from 'react';


function App() {
  const [isConcted, setIsConected] = useState(false)
  return (
    <>
    {!isConcted?
    <Login  setIsConected= {setIsConected}/>
    :
    <List/>
    }
    </>
  )
}

export default App
