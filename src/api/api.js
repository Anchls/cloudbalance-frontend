// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const logoutUser = async (token) => {
  await axios.post(
    'http://localhost:8080/api/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};



export const fetchRDSData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/rds'); // Adjust URL as needed
    return response.data;
  } catch (error) {
    console.error("Failed to fetch RDS data", error);
    return [];
  }
};

export const fetchEC2Data = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/ec2'); // Adjust URL as needed
    return response.data;
  } catch (error) {
    console.error("Failed to fetch RDS data", error);
    return [];
  }
};
export const fetchASGData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/asg'); // Adjust URL as needed
    return response.data;
  } catch (error) {
    console.error("Failed to fetch RDS data", error);
    return [];
  }
};