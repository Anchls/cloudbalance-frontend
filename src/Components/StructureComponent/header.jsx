import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import one from '../../assets/imh.png';
import '../../styles/Header.scss';
import CustomButton from '../common/CustomButton';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';  // Import user icon

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('root'));
    if (userData && userData.UserName) {
      setUserName(userData.UserName);
    }

    // Get role from localStorage
    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
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

      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.info("Logged out!");
      navigate("/login");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="top-navbar">
        <div className="left-section">
          <div className="logo">
            <img src={one} alt="Logo" />
          </div>
        </div>

        <div className="right-section">
          <div className="welcome-section">
            <span className="welcome-text">
              Welcome, {userName}
            </span>
            <div className="role-text">
              {userRole && `Role: ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}
            </div>
          </div>

          <div className="profile-icon">
            <FaUserCircle size={40} color="gray" /> {/* Profile icon with size and color */}
          </div>
          
          <CustomButton
            className="logout flex items-center gap-2"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={20} color="black" />
            Logout
          </CustomButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
