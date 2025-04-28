// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

//  Logout user
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const fetchCloudAccounts = async () => {
  try {
    const response = await api.get('/account/all');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cloud accounts:', error);
    return [];
  }
};


export const fetchEC2Data = async (roleArn) => {
  try {
    const response = await api.get('/ec2/instances', {
      params: { roleArn },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch EC2 data:', error);
    return [];
  }
};

export const fetchRDSData = async (roleArn) => {
  try {
    const response = await api.get('/rds/instances' ,{
        params: { roleArn },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch RDS data:', error);
    return [];
  }
};

export const fetchASGData = async (roleArn) => {
  try {
    const response = await api.get('/asg/instances',{
      params: { roleArn },
  });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ASG data:', error);
    return [];
  }
};


const API_BASE = 'http://localhost:8080/api/snowflake'; 
export const getGroupByColumns = async () => {
  const response = await axios.get(`${API_BASE}/group`);
  return response.data.GroupBy;
};

export const getFiltersForGroup = async (accountId, filterRequest) => {
  const response = await axios.post(`${API_BASE}/${accountId}/filter`, filterRequest);
  return response.data;
};

export const getGroupedCosts = async (accountId, costRequest) => {
  const response = await axios.post(`${API_BASE}/${accountId}`, costRequest);
  return response.data;
};
