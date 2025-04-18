// src/Pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHandleLogout from "../Utils/logout";

const Logout = () => {
  const logout = useHandleLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Perform logout logic
    navigate("/login");
  }, [logout, navigate]);

  return null; // No UI needed
};

export default Logout;
