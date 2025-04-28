import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import CustomButton from '../../Components/common/CustomButton';
import '../../styles/UserManagement.css';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    username: '',
    email: '',
    role: '',
    lastLogin: ''
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const usersPerPage = 7;
  const state = useSelector((state) => state);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/all', {
        headers: {
          Authorization: `Bearer ${state?.token}`,
          "Content-Type": "application/json",
        },
      });
      setUsers(response.data.content);
    } catch (error) {
      console.error(error);
      setError('Failed to load users!');
    }
  };

  const handleFilterChange = (e, column) => {
    setFilters({
      ...filters,
      [column]: e.target.value,
    });
  };

  const roleMap = {
    ADMIN: 'Admin',
    CUSTOMER: 'Customer',
    READ_ONLY: 'Read Only',
  };

  const formatRole = (role) => roleMap[role] || role;

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    formatRole(user.role).toLowerCase().includes(filters.role.toLowerCase()) &&
    (filters.lastLogin === '' ||
      (user.lastLogin && new Date(user.lastLogin).toLocaleString().toLowerCase().includes(filters.lastLogin.toLowerCase())))
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (_, value) => setCurrentPage(value);

  const handleFilterClick = (event, column) => {
    setAnchorEl(event.currentTarget);
    setActiveFilterColumn(column);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">User</h1>

      <div className="actions-container">
        <CustomButton onClick={() => navigate('/dashboard/add-user')} variant="contained">
          + Add User
        </CustomButton>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="user-management-box">
        <table className="user-table">
          <thead>
            <tr>
              {['username', 'email', 'role', 'lastLogin'].map((col) => (
                <th key={col}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                  <button className="filter-button" onClick={(e) => handleFilterClick(e, col)}>
                    <FilterListIcon />
                  </button>
                </th>
              ))}
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{formatRole(user.role)}</td>
                  <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/dashboard/update-user/${user.id}`)}
                    >
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-users">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(null, currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(null, currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {anchorEl && (
        <div className="filter-menu">
          <input
            type="text"
            value={filters[activeFilterColumn] || ''}
            onChange={(e) => handleFilterChange(e, activeFilterColumn)}
            placeholder={`Filter by ${activeFilterColumn}`}
          />
        </div>
      )}
    </div>
  );
};

export default UserManagement;
