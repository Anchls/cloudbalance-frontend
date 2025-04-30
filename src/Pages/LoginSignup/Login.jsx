import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from '../../assets/imh.png'; 
import { loginSuccess } from "../../redux/Action";
import { login } from "../../services/authService";
import { showToast } from "../../Components/common/Toast/CommonToast";
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
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

      dispatch(loginSuccess({ token, role }));

      showToast("Success", "Login successful!", "success"); // ✅ Success toast
      navigate("/dashboard");

      setTimeout(() => {
        dispatch({ type: "LOGOUT" });
        showToast("Info", "Session expired! Please log in again.", "info"); // ✅ Info toast
        navigate("/login");
      }, 15 * 60 * 1000);

    } catch (error) {
      showToast("Error", "Invalid credentials. Please try again.", "error"); // ✅ Error toast
    }
  };

  return (
    <>
      <div className="login-container">
        <img src={logo} alt="CloudKeeper Logo" className="logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Email</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="Password">Password</label>
          <input
            id="Password"
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
          Have Questions? <a href="/privacy-policy">Talk to our team</a>
        </span>
        <span className="footerLeft">
          CloudKeeper 2023 | All Rights Reserved
        </span>
      </div>
    </>
  );
};

export default Login;
