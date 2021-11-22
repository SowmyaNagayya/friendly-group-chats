import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import Creategroup from './components/pages/Creategroup';
import Dashboard from './components/pages/Dashboard';
import Groupchat from './components/pages/Groupchat';
import Updategroup from './components/pages/Updategroup';

export default function Container() {
    const [currentPage, setCurrentPage] = useState('Login');
  
    const renderPage = () => {
      if (currentPage === 'Login') {
        return <Login />;
      }
      if (currentPage === 'Signup') {
        return <Signup />;
      }
      if (currentPage === 'Creategroup') {
        return <Creategroup />;
      }
      if (currentPage === 'Dashboard') {
        return <Dashboard />
      }
      if (currentPage === 'Groupchat') {
        return <Groupchat />
      }
      if (currentPage === 'Updategroup') {
        return <Updategroup />
      }
    };
  
    const handlePageChange = (page) => setCurrentPage(page);
  
    return (
      <>
        <div id="main-container">
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
          {renderPage()}
        </div>
      </>
    );
  }