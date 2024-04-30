import './App.css';
import CreateTicket from './Components/CreateTicket';
import Login from './Components/Login';
import Ragistration from './Components/Ragistration';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import TicketList from './Components/TicketList';
import UserPage from './Pages/UserPage';
import { Context } from './Context/AuthContext';
import { useState } from 'react';
import AdminPage from './Pages/AdminPage';
import TechSupport from './Pages/TechSupport';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    console.log("Logout");
    localStorage.clear()
    setIsLoggedIn(false)
  };

  const userData=JSON.parse(localStorage.getItem("userData"))

  return (
    <>
     <Context.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <BrowserRouter>
        <nav className="navbar flex justify-end space-x-2">
          <ul className="navbar-nav flex space-x-4 mr-8">
          
            <li className="nav-item">
              <Link to="/">
              <button className="nav-link" onClick={handleLogout}>Logout</button>
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
        {!isLoggedIn ? (
              <Route path="/" element={<Login />} />
            ) : (
              <>
                {userData && userData.role === "user" ? (
                  <Navigate to="/adminpage" />
                ) : userData && userData.role === "admin" ? (
                  <Navigate to="/adminpage" />
                ) : (
                  <Navigate to="/adminpage" />
                )}
              </>
            )}

            <Route path="/register" element={<Ragistration />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/createticket" element={<CreateTicket />} />
            <Route path="/ticketlist" element={<TicketList />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/techsupportpage" element={<TechSupport />} />

          
        </Routes>
      </BrowserRouter>
      </Context.Provider>
    </>
  );
}

export default App;
