import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountManager from './AccountManager';
import '../../styles/adduser.css';

const UpdateUserForm = ({ onUpdateSuccess }) => {
  const {userId} = useParams();
  const token = useSelector(state => state.token);
  const [formData, setFormData] = useState({
    username: '',
    role: ''
  });

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(userId);
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response);
        const { username, role, assignedAccounts
        } = response.data;

        setFormData({ username, role });
        setSelectedAccounts(assignedAccounts
          || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError('update user');
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchUserDetails();
    }
  }, [token, userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear accounts if role is changed
    if (e.target.name === 'role' && e.target.value !== 'CUSTOMER') {
      setSelectedAccounts([]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const payload = {
      username: formData.username,
      role: formData.role,
      assignAccountIds: formData.role === 'CUSTOMER' ? selectedAccounts.map(acc => acc.accountId) : []
    };

    try {
      await axios.put(`http://localhost:8080/api/users/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccess('User updated successfully!');
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (err) {
      console.error('Update failed:', err);
      setError('failed to update use.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <main className="main-content">
        <div className="add-user-container">
          <h2>Update User</h2>
          <form onSubmit={handleUpdate} className="add-user-form">
            <div className="form-row">
              <div className="form-group">
                <label>User Name *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Select Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
                <option value="READ_ONLY">Read Only</option>
              </select>
            </div>

            {formData.role === 'CUSTOMER' && (
              <AccountManager
                selectedAccounts={selectedAccounts}
                setSelectedAccounts={setSelectedAccounts}
              />
            )}

            <div className="form-actions">
              <button type="submit">Update User</button>
            </div>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      </main>
    </div>
  );
};

export default UpdateUserForm;
