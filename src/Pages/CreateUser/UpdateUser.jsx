import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/updateUser.css';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: ''
  });

  const role = localStorage.getItem("role"); 

  useEffect(() => {
    if (role !== "ADMIN") {
      alert("Access Denied: Only Admin can access this page.");
      navigate("/login"); // or redirect to dashboard
    } else {
      fetchUser();
    }
  },[]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (err) {
      console.error('Failed to fetch user data', err);
    }
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('User updated successfully!');
      navigate('/user-management');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update user');
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input name="id" value={userData.id || ''} onChange={handleChange} readOnly />

        <label>Username:</label>
        <input name="username" value={userData.username} onChange={handleChange} required />

        <label>Email:</label>
        <input name="email" type="email" value={userData.email} onChange={handleChange} required />

        <label>Role:</label>
        <select name="role" value={userData.role} onChange={handleChange} required>
          <option value="ADMIN">ADMIN</option>
          <option value="CUSTOMER">CUSTOMER</option>
          <option value="READ_ONLY">READ_ONLY</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
