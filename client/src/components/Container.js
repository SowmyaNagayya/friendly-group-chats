import {BrowserRouter as Router, Routes,  Route} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import Creategroup from './pages/Creategroup';
import Dashboard from './pages/Dashboard';
import Groupchat from './pages/Groupchat';
import Updategroup from './pages/Updategroup';
import Auth from '../utils/auth';
import {useState} from 'react';

export default function Container() {
  const [currentPage, setCurrentPage] = useState('');

  const renderPage = () => {
    if (Auth.loggedIn()) {
      return <Dashboard />;
    }
    else return <Login />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div id="main-container">
          <Header currentPage={currentPage} handlePageChange={handlePageChange} />
            {renderPage()}
          <Router>
            <Routes>
              <Route exact path="/group/:id" element={<Groupchat />} />
              <Route exact path="/newgroup" element={<Creategroup />} />
              <Route exact path="/editgroup/:id" element={<Updategroup />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </div>
    );
  }