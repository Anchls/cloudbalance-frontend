import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/adduser.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountManager from './AccountManager';

const AddUserForm = ({ onUserAdded }) => {
  const navigate = useNavigate();
  const token = useSelector(state => state.token);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError("No token found. Please log in again.");
      return;
    }

    const payload = {
      ...formData,
      accountIds: formData.role === 'CUSTOMER' ? selectedAccounts.map(acc => acc.id) : []
    };

    try {
      const response = await axios.post('http://localhost:8080/api/users/users/create-with-accounts', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('User added successfully!');
      setFormData({
        username: '',
        email: '',
        password: '',
        role: ''
      });
      setSelectedAccounts([]);
      if (onUserAdded) onUserAdded();

    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user!');
    }
  };

  return (
    <div>
      <main className="main-content">
        <div className="add-user-container">
          <h2>Add New User</h2>
          <form onSubmit={handleSubmit} className="add-user-form">
            <div className="form-row">
              <div className="form-group">
                <label>User Name *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter user Name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email ID *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Email ID"
                />
              </div>

              <div className="form-group">
                <label>Select Roles *</label>
                <select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="CUSTOMER">Customer</option>
                  <option value="READ_ONLY">Read Only</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter Password"
              />
            </div>

            {/* Show Orphan Account Selector Only if Role is Customer */}
            {formData.role === "CUSTOMER" && (
              <AccountManager
                selectedAccounts={selectedAccounts}
                setSelectedAccounts={setSelectedAccounts}
              />
            )}

            <div className="form-actions">
              <button type="submit">Save User</button>
            </div>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      </main>
    </div>
  );
};

export default AddUserForm;
