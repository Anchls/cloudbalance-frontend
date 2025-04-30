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



export const updateUser = (userId, userData) => api.put(`/users/${userId}`, userData);

export const getUserById = (userId) => api.get(`/users/${userId}`);

export const getRoles = () => api.get('/roles');


export const fetchGroupByOptions = async () => {
  const response = await api.get('snowflake/group');
  return response.data;
};


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
    const response = await api.get('/ec2/instances', { params: { roleArn } });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch EC2 data:', error);
    return [];
  }
};

export const fetchRDSData = async (roleArn) => {
  try {
    const response = await api.get('/rds/instances', { params: { roleArn } });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch RDS data:', error);
    return [];
  }
};

export const fetchASGData = async (roleArn) => {
  try {
    const response = await api.get('/asg/instances', { params: { roleArn } });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch ASG data:', error);
    return [];
  }
};


const SNOWFLAKE_API_BASE = '/snowflake';

export const getFiltersForGroup = async (accountId, filterRequest) => {
  try {
    const response = await api.post(`${SNOWFLAKE_API_BASE}/${accountId}/filter`, filterRequest);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch filters:', error);
    return [];
  }
};

export const getGroupedCosts = async (accountId, costRequest) => {
  try {
    const response = await api.post(`${SNOWFLAKE_API_BASE}/${accountId}`, costRequest);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch grouped costs:', error);
    return [];
  }
};



export const fetchGroupByColumns = async () => {
  try {
    const response = await fetch('/api/columns');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch group by columns:', error);
    return [];
  }
};

export const fetchDistinctValues = async (accountId) => {
  try {
    const response = await fetch(`/api/${accountId}/filter`, { method: 'POST' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch distinct values:', error);
    return [];
  }
};

export const fetchGroupedCostsFromStatic = async (accountId, request) => {
  try {
    const response = await fetch(`/api/${accountId}`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch grouped costs (static):', error);
    return [];
  }
};

