import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Step1 from "./Pages/IAMRoleWizard/Step1";
import Step2 from "./Pages/IAMRoleWizard/Step2";
import Step3 from "./Pages/IAMRoleWizard/Step3";
import ThankYou from "./Pages/IAMRoleWizard/ThankYou";
import OnboardingLayout from "./Pages/IAMRoleWizard/OnboardingLayout";
import DashboardLayout from "./layout/DashboardLayout";
import AddUserForm from "./Pages/CreateUser/AddUserForm";
import UpdateUserForm from "./Pages/CreateUser/UpdateUser";
import UserManagement from "./Pages/Dasboard/UserManagement";
import AwsService from "./Components/AwsComponents/AwsService";
import IAMRoleWizard from "./Pages/IAMRoleWizard/IAMRolewizard";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/LoginSignup/Login";
import { useSelector } from "react-redux";
import RDSTable from "./Components/AwsComponents/RDSTable";
import EC2Tab from "./Components/AwsComponents/EC2Tabs";
import ASGTable from "./Components/AwsComponents/ASGTable";
import CostExplorer from "../src/Components/cost_explorer/CostExplorer";

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
          {/* <Route path="cost-explorer" element={<>Cost Explorer</>} /> */}

          <Route path="aws-services" element={<AwsService />} />
          <Route path="onboarding" element={<IAMRoleWizard />} />
          <Route path="add-user" element={<AddUserForm />} />
          <Route path="cost-explorer" element={<CostExplorer />} />
          <Route path="update-user/:userId" element={<UpdateUserForm />} />
        </Route>

        {/* <Route path="/Aws" element={<AwsService />}>
          <Route path="rds" element={<RDSTable />} />
          <Route path="ec2" element={<EC2Tab />} />
          <Route path="asg" element={<ASGTable />} />
        </Route> */}
        {/* <Route path="/onboarding" element={<OnboardingLayout />}>
          <Route path="step1" element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
          <Route path="thank-you" element={<ThankYou />} />
        </Route> */}
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} />
    </Router>
  );
}

export default App;
