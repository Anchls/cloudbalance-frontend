import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";import DashboardLayout from "./layout/DashboardLayout";
import UserForm from "./Pages/CreateUser/Form/UserForm";
import UserManagement from "./Pages/Dasboard/UserManagement";
import AwsService from "./Components/AwsComponents/AwsService";
import IAMRoleWizard from "./Pages/IAMRoleWizard/Index";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/LoginSignup/Login";
import { useSelector } from "react-redux";
import CostExplorer from "./Components/cost_explorer";

const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  return role ? children : <Navigate to="/login" />;
};

function App() {
  const role = useSelector((state) => state.role);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              role === "CUSTOMER" ? (
                <Navigate to="cost-explorer" />
              ) : (
                <Navigate to="users" />
              )
            }
          />
          <Route path="users" element={<UserManagement />} />
          <Route path="aws-services" element={<AwsService />} />
          <Route path="onboarding" element={<IAMRoleWizard />} />
          <Route path="add-user" element={<UserForm />} />
          <Route path="cost-explorer" element={<CostExplorer />} />
          <Route path="update-user/:userId" element={<UserForm />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;
