import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountManager from './AccountManager';
import CustomButton from '../../Components/common/CustomButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/adduser.css';

const UpdateUserForm = ({ onUpdateSuccess }) => {
  const { userId } = useParams();
  const token = useSelector(state => state.token);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    role: ''
  });

  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // for button disable
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // To track form submission

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { username, role, assignedAccounts } = response.data;

        setFormData({ username, role });
        setSelectedAccounts(assignedAccounts || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user details:', err);
        toast.error('Failed to fetch user details.', {
          autoClose: 2000, // Show for 2 seconds
        });
        setLoading(false);
      }
    };

    if (token && userId) {
      fetchUserDetails();
    }
  }, [token, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear the error for the specific field
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'This field is required';
    if (!formData.role.trim()) newErrors.role = 'This field is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Set form submission state

    if (!validateForm()) {
      return;
    }

    const payload = {
      username: formData.username,
      role: formData.role,
      assignAccountIds: formData.role === 'CUSTOMER' ? selectedAccounts.map(acc => acc.accountId) : []
    };

    try {
      setSubmitting(true);

      await axios.put(`http://localhost:8080/api/users/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('User updated successfully!', {
        autoClose: 2000, // Show for 2 seconds
      });

      if (onUpdateSuccess) onUpdateSuccess();

      // ✅ Redirect to dashboard after successful update
      navigate('/dashboard'); // <-- Redirect to dashboard page
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update user.', {
        autoClose: 2000, // Show for 2 seconds
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <ToastContainer /> {/* Toast Notification Component */}

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
                />
                {isSubmitted && errors.username && <span className="error-text">{errors.username}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Select Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
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
              <CustomButton type="submit" disabled={submitting}>
                {submitting ? 'Updating...' : 'Update User'}
              </CustomButton>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateUserForm;
