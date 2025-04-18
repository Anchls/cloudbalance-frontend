import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Custom logout function as a hook
const useHandleLogout = () => {
  const navigate = useNavigate();

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
