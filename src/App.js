
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Link } from 'react-router-dom';
import Accounts from './components/Accounts.js';
import Contacts from './components/Contacts.js';
import Receipts from './components/Receipts.js';
import './App.css';

function App() {

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);
  const [getAccessToken, setGetAccessToken] = useState(0);

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get('access_token');
    const refreshToken = queryParams.get('refresh_token');
    const organizationId = queryParams.get('organization_id');
    const getAccessToken = 0;

    if (refreshToken && organizationId) {

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setOrganizationId(organizationId);
      setGetAccessToken(0);

      // Store tokens in local storage 
       localStorage.setItem('accessToken', accessToken);
       localStorage.setItem('refreshToken', refreshToken);     
       localStorage.setItem('organizationId', organizationId); 
       localStorage.setItem('getAccessToken', 0);      
      
    }
  }, []);


  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/api/auth/redirect';
  };

  const handleLogout = () => {   
    
    setAccessToken(null);
    setRefreshToken(null);
    setOrganizationId(null);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('organizationId');    
  };

  // access token
  const refreshAccessToken = () => {

    localStorage.setItem('getAccessToken', 1);
    }

  return (
    <div className="App">
    
      <Router>
        
        <nav className="Nav-div"> 
          <ul>
            {refreshToken ? (
              <>
                <li>
                  <button className='Logout-button' onClick={handleLogout}>Logout</button>
                </li>
                <li>
                  <Link to="/accounts">Accounts</Link>
                </li>
                <li>
                  <Link to="/contacts">Contacts</Link>
                </li>
                <li>
                  <Link to="/receipts">Receipts</Link>
                </li>
              </>
           ) : (
            <>      
              <button className='Login-button' onClick={handleLogin}>Zoho Login</button>
            </>
          )}
          
        </ul>
      </nav>      

      
      <Routes>
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/receipts" element={<Receipts />} />
      </Routes>
      
    </Router>

      
    </div>
  );
}

export default App;
