import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/api'; // Import the logoutUser method from api.js

const useHandleLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); 

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      alert('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return handleLogout;
};

export default useHandleLogout;
