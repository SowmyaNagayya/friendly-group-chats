import {BrowserRouter as Router, Routes,  Route} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Header from './Header';
import Creategroup from './pages/Creategroup';
import Dashboard from './pages/Dashboard';
import Groupchat from './pages/Groupchat';
import Updategroup from './pages/Updategroup';
import Auth from '../utils/auth';

export default function Container() {

  const renderPage = () => {
    if (Auth.loggedIn()) {
      return <Dashboard />;
    } else return;
  } 

    return (
        <div id="main-container">
          <Header />
            {renderPage()}
          <Router>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path="/group/:id" element={<Groupchat />} />
              <Route exact path="/newgroup" element={<Creategroup />} />
              <Route exact path="/editgroup/:id" element={<Updategroup />} />
            </Routes>
          </Router>
        </div>
    );
  }