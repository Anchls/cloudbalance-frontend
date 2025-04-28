import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountManager from './AccountManager';
import CustomButton from '../../Components/common/CustomButton';
import '../../styles/adduser.css';

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
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Remove error of the field when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'This field is required';
    if (!formData.email) newErrors.email = 'This field is required';
    if (!formData.password) newErrors.password = 'This field is required';
    if (!formData.role) newErrors.role = 'This field is required';

    setErrors(newErrors);

    // Agar newErrors empty hai tabhi true
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    if (!validateForm()) {
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
      setErrors({});

      if (onUserAdded) onUserAdded();

      // ✅ Redirect to dashboard after success
      navigate('/dashboard');  // <-- Redirect to dashboard page
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user!');
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
      <main className="main-content">
        <div className="add-user-container">
          <form onSubmit={handleSubmit} className="add-user-form">
            <div className="form-row">
              <div className="form-group">
                <label>User Name *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter user Name"
                />
                {errors.username && <p className="error">{errors.username}</p>}
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
                  placeholder="Enter Email ID"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Select Roles *</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="">Select Role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="CUSTOMER">Customer</option>
                  <option value="READ_ONLY">Read Only</option>
                </select>
                {errors.role && <p className="error">{errors.role}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {formData.role === "CUSTOMER" && (
              <AccountManager
                selectedAccounts={selectedAccounts}
                setSelectedAccounts={setSelectedAccounts}
              />
            )}

            <div className="form-actions">
              <CustomButton type="submit">Save User</CustomButton>
            </div>

            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddUserForm;
