import api from "../api/api"; 

const API_URL = "/auth"; // baseURL already set in api.js

export const login = async (credentials) => {
  const response = await api.post(`${API_URL}/login`, credentials);
  console.log(response);
  return response.data;
};

export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role;
};

export const isAuthenticated = () => !!getToken();

export const logout = async () => {
  try {
    await api.post(`${API_URL}/logout`); 
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export const isAdmin = () => {
  const role = getRole();
  return role === "ADMIN";
};

export const isReadOnly = () => {
  const role = getRole();
  return role === "READ_ONLY";
};

export const isCustomer = () => {
  const role = getRole();
  return role === "CUSTOMER";
};
