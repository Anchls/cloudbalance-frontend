import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../styles/Dashboard.css';
import update from '../../assets/update.png';

const UserManagement = ({ role }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const state = useSelector(state => state);
  // console.log(state);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/users/all', {
        headers: {
          Authorization: `Bearer ${state?.token}`,
          "Content-Type":"Applications/json"
        },
      });
      setUsers(response.data.content);
    } catch (error) {
      console.error(error);
      setError('Failed to load users!');
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
  
  <h1>Users</h1>
      <main className="mainn-content">
        
        <div className="user-header">
          <button className="add-user" onClick={() => navigate('/dashboard/add-user')}>
            + Add User
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>UserName</th>
                <th>Email</th>
                <th>Role</th>
                <th>Last Login</th>
                <th>Account Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td>
                      <button
                        className="update-button"
                        onClick={() => navigate(`/dashboard/update-user/${user.id}`)}
                      >
                        <img src= {update} alt='update'/>
                    
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            className="pagination-button"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* <footer className="footer">
          © 2025 CloudBalance | All rights reserved.
        </footer> */}
      </main>
    </div>
  );
};

export default UserManagement;
