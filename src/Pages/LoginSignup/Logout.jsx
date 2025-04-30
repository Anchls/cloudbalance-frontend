// src/Pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHandleLogout from "../LoginSignup/Logout.jsx";


const Logout = () => {
  const logout = useHandleLogout();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); 
    navigate("/login");
  }, [logout, navigate]);

  return null; 
};

export default Logout;
