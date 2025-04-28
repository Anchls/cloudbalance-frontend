// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import logo from '../../assets/imh.png'; 
import { loginSuccess } from "../../redux/Action";
import { useDispatch } from "react-redux";
// import {login} from "../../api/api"
// import login
import {login} from "../../services/authService";

// import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const res = await login({ email, password });
      const { token, role } = res;

      dispatch(loginSuccess({token, role}));
      toast.success("Login successful!");
      
      navigate("/dashboard");
  
      setTimeout(() => {
        dispatch({ type: "LOGOUT" });
        toast.info("Session expired!");
        navigate("/login");
      }, 15 * 60 * 1000);
      
    } 
    catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };
  
  return (
    <>
      <div className="login-container">
        <img
          src={logo}
          alt="CloudKeeper Logo"
          className="logo"
        />
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Email</label>
          <input
          id="username"
            type="text"
            placeholder="Username "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="Password">Password</label>

          <input
          id= "Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
      <div className="login-footer">
        <span className="footerRight">
          Have Questions ?<a href="/privacy-policy">Talk to our team</a>{" "}
        </span>

        <span className="footerLeft">CloudKeeper 2023| All Rights Resurved</span>
      </div>
    </>
  );
};

export default Login;
