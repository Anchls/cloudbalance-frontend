// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginSuccess } from "../redux/Action";
// import { login } from "../services/authService"; // Assuming login function exists for actual authentication
// import "./Login.css"; // Assuming you have a CSS file for styling
// import logo from "../Pages/imh.png"; // Adjust the path to your logo

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     // Validation to ensure both fields are filled
//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     // Simulating a login API response (you can replace this with actual API call)
//     if (email === "test@example.com" && password === "123456") {
//       const token = "fake-jwt-token"; // Replace with actual token from API response
//       const role = "admin"; // Replace with actual role from API response

//       // Dispatching loginSuccess action
//       dispatch(loginSuccess(token, role));
//       toast.success("Login successful!");

//       // Redirect to dashboard
//       navigate("/dashboard");

//       // Setting session expiration (logout after 15 minutes)
//       setTimeout(() => {
//         dispatch({ type: "LOGOUT" });
//         toast.info("Session expired!");
//         navigate("/login");
//       }, 15 * 60 * 1000); // 15 minutes session timeout
//     } else {
//       toast.error("Invalid credentials");
//     }
//   };

//   return (
//     <>
//       <div className="login-container">
//         <img src={logo} alt="CloudKeeper Logo" className="logo" />
//         <form onSubmit={handleLogin}>
//           <label htmlFor="username">Email</label>
//           <input
//             id="username"
//             type="text"
//             placeholder="Username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <label htmlFor="Password">Password</label>
//           <input
//             id="Password"
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <button type="submit">Login</button>
//         </form>
//       </div>

//       <div className="login-footer">
//         <span className="footerRight">
//           Have Questions? <a href="/privacy-policy">Talk to our team</a>
//         </span>
//         <span>CloudKeeper 2023 | All Rights Reserved</span>
//       </div>
//     </>
//   );
// };

// export default Login;
