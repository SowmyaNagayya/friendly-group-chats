import React, { useState } from 'react';
import {BrowserRouter as Router, Routes,  Route} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import Creategroup from './pages/Creategroup';
import Dashboard from './pages/Dashboard';
import Groupchat from './pages/Groupchat';
import Updategroup from './pages/Updategroup';
import { Switch } from 'react-router';

export default function Container() {
    const [currentPage, setCurrentPage] = useState('Login');
  
    // const renderPage = () => {
    //   if (currentPage === 'Login') {
    //     return <Login />;
    //   }
    //   if (currentPage === 'Signup') {
    //     return <Signup />;
    //   }
    //   if (currentPage === 'Creategroup') {
    //     return <Creategroup />;
    //   }
    //   if (currentPage === 'Dashboard') {
    //     return <Dashboard />
    //   }
    //   if (currentPage === 'Groupchat') {
    //     return <Groupchat />
    //   }
    //   if (currentPage === 'Updategroup') {
    //     return <Updategroup />
    //   }
    // };
  
    // const handlePageChange = (page) => setCurrentPage(page);
  
    return (
      <Router>
        <div id="main-container">
          {/* <Header currentPage={currentPage} handlePageChange={handlePageChange} /> */}
          <Routes>
            <>
          <Route path="/Signup" element={ <Signup />} /> 
          <Route path="/" element={ <Login />} />
          
          </>
          {/* <Route path="/Signup" component={<Signup />}/>  */}
            {/* <Route path="/" component={Login}/> <Route path="/Login" component={Login}/> */}
          </Routes>
          {/* {renderPage()} */}
        </div>
      </Router>
    );
  }