import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import one from '../assets/imh.png';
import '../styles/Header.scss';
const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
const dispatch= useDispatch();

  useEffect(() => {
    // Example: assuming user info is stored in localStorage
    const userData = JSON.parse(localStorage.getItem('root'));
    if (userData && userData.UserName) {
      setUserName(userData.UserName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   
        //  setTimeout(() => {
           dispatch({ type: "LOGOUT" });
           localStorage.removeItem("token");
           localStorage.removeItem("role");
           toast.info("logged out!");
           navigate("/login");
        //  }, 15 * 60 * 1000);
         
    } catch (error) {
      
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4 text-xl font-bold">
      <div className="top-navbar flex justify-between items-center">
        <div className="left-section flex items-center gap-4">
          <div className="logo"><img src={one} alt="" /></div>
          <div className="module-title">Module Lens</div>
        </div>

        <div className="right-section flex items-center gap-4">
          <span className="welcome-text">Welcome, {userName || 'User'}</span>
          <div className="profile-icon bg-white text-blue-600 rounded-full px-3 py-1 font-bold">
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <button
            className="logout-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
