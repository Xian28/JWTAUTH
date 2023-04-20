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
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    })
    setUser({});
    navigate('/');
  }

  useEffect(() => {
    async function checkRefreshToken() {
      const result = await(await fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        }
      })).json();
      setUser({
        accesstoken: result.accesstoken,
      });
      setLoading(false);
    }
    checkRefreshToken();
  }, []);

  if(loading) return <div>Loading...</div>

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
        <Navigation logOutCallback={logOutCallback}/>
        <Router id="router">
          <Login path="login" />
          <Register path="register" />
          <Protected path="protected" />
          <Content path="/" />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
