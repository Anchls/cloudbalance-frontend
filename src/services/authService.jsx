// src/services/authService.js

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, 
    credentials
  );
  console.log(response);
  return response.data;
};

export const getToken = () => localStorage.getItem("token");

export const getRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role;
};

export const isAuthenticated = () => !!getToken();


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
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