import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../../api/api';
import AccountManager from '../AccountManager';
import CustomButton from '../../../Components/common/Button/CustomButton';
import '../../../styles/adduser.css';

const UserForm = ({ onSuccess }) => {
  const { userId } = useParams();
  const token = useSelector(state => state.token);
  const navigate = useNavigate();
  const isUpdateMode = Boolean(userId);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isUpdateMode);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isUpdateMode && token) {
      fetchUserDetails();
    }
  }, [isUpdateMode, token]);

  const fetchUserDetails = async () => {
    try {
      const { data } = await api.get(`/users/${userId}`);
      const { username, role, assignedAccounts } = data;

      setFormData({ username, role, email: '', password: '' });
      setSelectedAccounts(assignedAccounts || []);
    } catch (err) {
      console.error('Fetch Error:', err);
      toast.error(err.response?.data?.message || 'Failed to fetch user details.', { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const requiredFields = ['username', 'role', ...(isUpdateMode ? [] : ['email', 'password'])];
    const newErrors = requiredFields.reduce((acc, field) => {
      if (!formData[field]?.trim()) acc[field] = 'This field is required';
      return acc;
    }, {});
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!validateForm()) return;

    const payload = {
      username: formData.username,
      role: formData.role,
      ...(isUpdateMode ? {} : { email: formData.email, password: formData.password }),
      accountIds: formData.role === 'CUSTOMER' ? selectedAccounts.map(acc => acc.accountId || acc.id) : []
    };

    try {
      setSubmitting(true);
      if (isUpdateMode) {
        await api.put(`/users/${userId}`, payload);
        toast.success('User updated successfully!', { autoClose: 2000 });
      } else {
        await api.post('/users/create-with-accounts', payload);
        toast.success('User added successfully!', { autoClose: 2000 });
      }
      if (onSuccess) onSuccess();
      navigate('/dashboard');
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error(err.response?.data?.message || 'Failed to submit form.', { autoClose: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <main className="main-content">
      <div className="add-user-container">
        <h2>{isUpdateMode ? 'Update User' : 'Add New User'}</h2>
        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-row">
            <div className="form-group">
              <label>User Name *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter user name"
              />
              {isSubmitted && errors.username && <span className="error-text">{errors.username}</span>}
            </div>
          </div>

          {!isUpdateMode && (
            <div className="form-row">
              <div className="form-group">
                <label>Email ID *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email ID"
                />
                {isSubmitted && errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                {isSubmitted && errors.password && <span className="error-text">{errors.password}</span>}
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Select Role *</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="ADMIN">Admin</option>
              <option value="CUSTOMER">Customer</option>
              <option value="READ_ONLY">Read Only</option>
            </select>
            {isSubmitted && errors.role && <span className="error-text">{errors.role}</span>}
          </div>

          {formData.role === 'CUSTOMER' && (
            <AccountManager
              selectedAccounts={selectedAccounts}
              setSelectedAccounts={setSelectedAccounts}
            />
          )}

          <div className="form-actions">
            <CustomButton
              type="submit"
              disabled={submitting}
            >
              {submitting ? (isUpdateMode ? 'Updating...' : 'Saving...') : (isUpdateMode ? 'Update User' : 'Save User')}
            </CustomButton>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UserForm;
