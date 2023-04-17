import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';

import Navigation from './components/Navigation';
import Content from './components/Content';
import Login from './components/Login';
import Protected from './components/Protected';
import Register from './components/Register';

export const UserContext = React.createContext([])

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true)

  const logOutCallback = async () => {

  }

  useEffect(() => {
    
  }, []);
  

  return (
    <div className="App">
      App
    </div>
  );
}

export default App;
