// // src/routes/PrivateRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" />; // Create an Access Denied page
//   }

//   return children;
// };

// export default PrivateRoute;
